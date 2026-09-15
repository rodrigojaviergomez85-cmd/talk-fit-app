-- 1. Repeats get their own clock -------------------------------------------
ALTER TABLE public.day_progress
  ADD COLUMN IF NOT EXISTS latest_recorded_at timestamptz,
  ADD COLUMN IF NOT EXISTS latest_purged_at timestamptz;

COMMENT ON COLUMN public.day_progress.latest_recorded_at IS
  'When the "-latest" repeat recording was made. completed_at is the FIRST completion and never moves, so retention for a repeat must be counted from this column instead.';
COMMENT ON COLUMN public.day_progress.latest_purged_at IS
  'Stamped when the "-latest" object was deleted by the retention job.';

-- 2. Timestamp protection ----------------------------------------------------
CREATE OR REPLACE FUNCTION public.protect_day_progress_timestamps()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_at := now();
  ELSE
    NEW.created_at := OLD.created_at;
  END IF;

  IF NEW.completed_at IS NOT NULL THEN
    IF NEW.completed_at > now() + interval '1 hour'
       OR NEW.completed_at < NEW.created_at - interval '1 hour' THEN
      RAISE EXCEPTION 'INVALID_COMPLETED_AT: % is outside the allowed window', NEW.completed_at
        USING ERRCODE = 'P0001';
    END IF;
  END IF;

  IF NEW.latest_recorded_at IS NOT NULL THEN
    IF NEW.latest_recorded_at > now() + interval '1 hour'
       OR NEW.latest_recorded_at < NEW.created_at - interval '1 hour' THEN
      RAISE EXCEPTION 'INVALID_LATEST_RECORDED_AT: % is outside the allowed window', NEW.latest_recorded_at
        USING ERRCODE = 'P0001';
    END IF;
  END IF;

  IF TG_OP = 'UPDATE' AND OLD.latest_recorded_at IS NOT NULL THEN
    IF NEW.latest_recorded_at IS NULL OR NEW.latest_recorded_at < OLD.latest_recorded_at THEN
      RAISE EXCEPTION 'INVALID_LATEST_RECORDED_AT: it can only move forward'
        USING ERRCODE = 'P0001';
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;

-- 3. Purge candidates: one row per file, base and latest counted separately --
DROP FUNCTION IF EXISTS public.purge_day_final_candidates(integer, integer, integer);

CREATE FUNCTION public.purge_day_final_candidates(_limit integer, _final_retention_days integer, _module_last_day integer)
RETURNS TABLE(
  user_id uuid,
  module_id text,
  day smallint,
  which text,
  completed_at timestamptz,
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
           dp.completed_at, dp.recording_path, dp.recording_purged_at,
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
           dp.completed_at,
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
  SELECT user_id, module_id, day, which, completed_at, recording_path, recording_purged_at
  FROM rows
  ORDER BY expires_from ASC
  LIMIT greatest(_limit, 0)
$function$;

COMMENT ON FUNCTION public.purge_day_final_candidates(integer, integer, integer) IS
  'Expired journey final audio, one row per FILE. which = base (completed_at clock) or latest (latest_recorded_at clock). Day 1 and the module last day are never returned.';

-- 4. Admin health snapshot: retention is now 10 days -------------------------
CREATE OR REPLACE FUNCTION public.admin_health_snapshot()
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
declare
  _res jsonb;
  _max_conn int;
  _last_ok timestamptz;
  _last_run jsonb;
  _backlog int;
begin
  if not public.has_role(auth.uid(), 'admin') then
    raise exception 'Forbidden';
  end if;

  select coalesce(nullif(current_setting('max_connections', true), '')::int, 0) into _max_conn;

  select max(finished_at) into _last_ok
  from public.job_runs where job_name = 'purge-audio' and ok;

  select to_jsonb(j) into _last_run
  from (
    select started_at, finished_at, ok, deleted_files, marked_rows, error
    from public.job_runs
    where job_name = 'purge-audio'
    order by started_at desc
    limit 1
  ) j;

  select (
    (select count(*) from public.purge_candidates(50000, 48, 10, 20))
    + (select count(*) from public.purge_day_final_candidates(50000, 10, 20))
  )::int into _backlog;

  with ai_days as (
    select to_char(day, 'YYYY-MM-DD') as day_key,
           endpoint,
           model,
           sum(calls)::int as requests,
           coalesce(sum(est_cost_usd), 0) as est_cost_usd
    from public.ai_daily_rollup
    where day >= (now() AT TIME ZONE 'UTC')::date - 7
    group by 1, 2, 3
  ),
  rec_days as (
    select to_char(created_at, 'YYYY-MM-DD') as day_key,
           count(*)::int as files,
           round(coalesce(sum(duration_seconds), 0) * 3000 / 1048576.0, 1) as mb
    from public.recordings
    where created_at >= now() - interval '8 days'
    group by 1
  ),
  rec_totals as (
    select count(*)::int as files_total,
           round(coalesce(sum(duration_seconds), 0) * 3000 / 1048576.0, 1) as mb_total,
           count(*) filter (where audio_purged_at is not null)::int as purged_total
    from public.recordings
  ),
  active_days as (
    select local_day_key as day_key, count(distinct user_id)::int as users
    from public.practice_attempts
    where first_recording_at is not null
      and first_recording_at >= now() - interval '8 days'
    group by 1
  ),
  hours as (
    select to_char(date_trunc('hour', first_recording_at), 'YYYY-MM-DD HH24:00') as hour_key,
           count(*)::int as sessions
    from public.practice_attempts
    where first_recording_at >= now() - interval '24 hours'
    group by 1
  )
  select jsonb_build_object(
    'generated_at', now(),
    'ai', jsonb_build_object(
      'by_day', coalesce((select jsonb_agg(jsonb_build_object(
          'day_key', day_key, 'endpoint', endpoint, 'model', model,
          'requests', requests, 'est_cost_usd', est_cost_usd) order by day_key desc) from ai_days), '[]'::jsonb),
      'coach_today', (select count(*)::int from public.final_audio_coach_feedback
                       where created_at >= date_trunc('day', now()) and status <> 'pending')
    ),
    'storage', jsonb_build_object(
      'by_day', coalesce((select jsonb_agg(jsonb_build_object(
          'day_key', day_key, 'files', files, 'mb', mb) order by day_key desc) from rec_days), '[]'::jsonb),
      'files_total', (select files_total from rec_totals),
      'mb_total', (select mb_total from rec_totals),
      'purged_total', (select purged_total from rec_totals),
      'disk_gb', 500
    ),
    'purge', jsonb_build_object(
      'last_ok_at', _last_ok,
      'hours_since_ok', case when _last_ok is null then null
                             else round(extract(epoch from (now() - _last_ok)) / 3600.0, 1) end,
      'backlog_files', _backlog,
      'backlog_capped', (_backlog >= 100000),
      'last_run', coalesce(_last_run, 'null'::jsonb)
    ),
    'activity', jsonb_build_object(
      'by_day', coalesce((select jsonb_agg(jsonb_build_object(
          'day_key', day_key, 'users', users) order by day_key desc) from active_days), '[]'::jsonb),
      'by_hour', coalesce((select jsonb_agg(jsonb_build_object(
          'hour_key', hour_key, 'sessions', sessions) order by hour_key) from hours), '[]'::jsonb),
      'users_total', (select count(*)::int from auth.users)
    ),
    'database', jsonb_build_object(
      'size_gb', round((pg_database_size(current_database()) / 1073741824.0)::numeric, 2),
      'connections', (select count(*)::int from pg_stat_activity),
      'max_connections', _max_conn
    ),
    'thresholds', coalesce((select jsonb_agg(jsonb_build_object(
        'key', key, 'label', label, 'warn', warn, 'critical', critical, 'unit', unit, 'sort_order', sort_order)
        order by sort_order) from public.alert_thresholds), '[]'::jsonb)
  ) into _res;

  return _res;
end;
$function$;

-- 5. Coach Check counts, straight from the server ----------------------------
-- SECURITY INVOKER on purpose: it runs under the caller's own RLS, so it can
-- only ever see the caller's own rows.
CREATE OR REPLACE FUNCTION public.coach_check_day(_day_key text, _retention_days integer DEFAULT 10)
RETURNS jsonb
LANGUAGE sql
STABLE SECURITY INVOKER
SET search_path TO 'public'
AS $function$
  WITH day_rows AS (
    SELECT * FROM public.day_progress dp
    WHERE dp.local_day_key = _day_key
  ),
  audios AS (
    SELECT jsonb_build_object(
             'path', dp.recording_path,
             'kind', 'base',
             'recorded_at', dp.completed_at,
             'available_until', dp.completed_at + make_interval(days => _retention_days),
             'expired', (dp.recording_purged_at IS NOT NULL
                         OR dp.completed_at + make_interval(days => _retention_days) < now())
           ) AS entry,
           dp.completed_at AS sort_at
    FROM day_rows dp
    WHERE dp.recording_path IS NOT NULL

    UNION ALL

    SELECT jsonb_build_object(
             'path', regexp_replace(dp.recording_path, '\.([A-Za-z0-9]+)$', '-latest.\1'),
             'kind', 'latest',
             'recorded_at', dp.latest_recorded_at,
             'available_until', dp.latest_recorded_at + make_interval(days => _retention_days),
             'expired', (dp.latest_purged_at IS NOT NULL
                         OR dp.latest_recorded_at + make_interval(days => _retention_days) < now())
           ),
           dp.latest_recorded_at
    FROM day_rows dp
    WHERE dp.recording_path IS NOT NULL AND dp.latest_recorded_at IS NOT NULL
  )
  SELECT jsonb_build_object(
    'day_key', _day_key,
    'retention_days', _retention_days,
    -- Every repeat is its own practice_attempts row, so repeats count naturally.
    'practices', (SELECT count(*)::int FROM public.practice_attempts pa
                  WHERE pa.local_day_key = _day_key AND pa.completed_at IS NOT NULL),
    -- Counted regardless of audio_purged_at: rows are never deleted, only
    -- stamped. The unique key (user_id, module_id, day, take_number) makes a
    -- re-upload an UPSERT onto the same row, so this count cannot inflate.
    'recordings', (SELECT count(*)::int FROM public.recordings r
                   WHERE (r.created_at AT TIME ZONE 'America/El_Salvador')::date = _day_key::date),
    'audios', coalesce((SELECT jsonb_agg(entry ORDER BY sort_at) FROM audios), '[]'::jsonb)
  )
$function$;

COMMENT ON FUNCTION public.coach_check_day(text, integer) IS
  'Coach Check summary for one local day. SECURITY INVOKER, so RLS limits it to the caller''s own rows. Counts never shrink when audio is deleted.';

REVOKE ALL ON FUNCTION public.coach_check_day(text, integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.coach_check_day(text, integer) TO authenticated, service_role;