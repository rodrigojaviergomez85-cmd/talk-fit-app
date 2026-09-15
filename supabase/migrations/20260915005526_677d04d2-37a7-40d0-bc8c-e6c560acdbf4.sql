DROP FUNCTION IF EXISTS public.purge_day_final_candidates(integer, integer, integer);

CREATE FUNCTION public.purge_day_final_candidates(_limit integer, _final_retention_days integer, _module_last_day integer)
RETURNS TABLE(
  user_id uuid,
  module_id text,
  day smallint,
  which text,
  completed_at timestamptz,
  latest_recorded_at timestamptz,
  recording_path text,
  recording_purged_at timestamptz
)
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  WITH rows AS (
    -- The first completion's object: its clock is completed_at.
    SELECT dp.user_id, dp.module_id, dp.day, 'base'::text AS which,
           dp.completed_at, NULL::timestamptz AS latest_recorded_at,
           dp.recording_path, dp.recording_purged_at,
           dp.completed_at AS expires_from
    FROM public.day_progress dp
    WHERE dp.recording_purged_at IS NULL
      AND dp.recording_path IS NOT NULL
      AND public.owns_storage_path(dp.user_id, dp.recording_path)
      AND dp.day NOT IN (1, _module_last_day)
      AND dp.completed_at < now() - make_interval(days => _final_retention_days)

    UNION ALL

    -- A repeat's "-latest" object has its OWN clock: latest_recorded_at.
    SELECT dp.user_id, dp.module_id, dp.day, 'latest'::text AS which,
           dp.completed_at, dp.latest_recorded_at,
           regexp_replace(dp.recording_path, '\.([A-Za-z0-9]+)$', '-latest.\1'),
           dp.latest_purged_at,
           dp.latest_recorded_at
    FROM public.day_progress dp
    WHERE dp.latest_recorded_at IS NOT NULL
      AND dp.latest_purged_at IS NULL
      AND dp.recording_path IS NOT NULL
      AND public.owns_storage_path(dp.user_id, regexp_replace(dp.recording_path, '\.([A-Za-z0-9]+)$', '-latest.\1'))
      AND dp.day NOT IN (1, _module_last_day)
      AND dp.latest_recorded_at < now() - make_interval(days => _final_retention_days)
  )
  SELECT user_id, module_id, day, which, completed_at, latest_recorded_at, recording_path, recording_purged_at
  FROM rows
  ORDER BY expires_from ASC
  LIMIT greatest(_limit, 0)
$function$;

COMMENT ON FUNCTION public.purge_day_final_candidates(integer, integer, integer) IS
  'Expired journey final audio, one row per FILE. which = base (completed_at clock) or latest (latest_recorded_at clock). Day 1 and the module last day are never returned.';