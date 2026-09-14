-- Ownership helper: a storage path always starts with the owner's user id.
-- IMMUTABLE and table-free so CHECK constraints may call it.
CREATE OR REPLACE FUNCTION public.owns_storage_path(_user_id uuid, _path text)
RETURNS boolean
LANGUAGE sql
IMMUTABLE
AS $$
  SELECT _path IS NOT NULL
     AND _user_id IS NOT NULL
     AND _path LIKE _user_id::text || '/%'
$$;

-- Fail loudly rather than silently accepting bad data.
DO $$
DECLARE _n integer;
BEGIN
  SELECT count(*) INTO _n FROM public.recordings r
   WHERE NOT public.owns_storage_path(r.user_id, r.storage_path)
      OR r.storage_path NOT LIKE r.user_id::text || '/' || r.module_id || '/' || r.day || '/take-' || r.take_number || '%';
  IF _n > 0 THEN
    RAISE EXCEPTION 'public.recordings has % row(s) whose storage_path does not belong to the row owner or to its module/day', _n;
  END IF;

  SELECT count(*) INTO _n FROM public.day_progress dp
   WHERE dp.recording_path IS NOT NULL
     AND (NOT public.owns_storage_path(dp.user_id, dp.recording_path)
          OR dp.recording_path NOT LIKE dp.user_id::text || '/' || dp.module_id || '-day-' || dp.day || '%');
  IF _n > 0 THEN
    RAISE EXCEPTION 'public.day_progress has % row(s) whose recording_path does not belong to the row owner or to its module/day', _n;
  END IF;
END $$;

ALTER TABLE public.recordings
  ADD CONSTRAINT recordings_storage_path_owner
  CHECK (public.owns_storage_path(user_id, storage_path));

ALTER TABLE public.recordings
  ADD CONSTRAINT recordings_storage_path_shape
  CHECK (storage_path LIKE user_id::text || '/' || module_id || '/' || day || '/take-' || take_number || '%');

ALTER TABLE public.day_progress
  ADD CONSTRAINT day_progress_recording_path_owner
  CHECK (recording_path IS NULL OR public.owns_storage_path(user_id, recording_path));

ALTER TABLE public.day_progress
  ADD CONSTRAINT day_progress_recording_path_shape
  CHECK (recording_path IS NULL
         OR recording_path LIKE user_id::text || '/' || module_id || '-day-' || day || '%');

-- Trustworthy timestamps -----------------------------------------------------
ALTER TABLE public.day_progress
  ADD COLUMN IF NOT EXISTS created_at timestamptz NOT NULL DEFAULT now();

CREATE OR REPLACE FUNCTION public.protect_day_progress_timestamps()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS day_progress_protect_timestamps ON public.day_progress;
CREATE TRIGGER day_progress_protect_timestamps
  BEFORE INSERT OR UPDATE ON public.day_progress
  FOR EACH ROW EXECUTE FUNCTION public.protect_day_progress_timestamps();

CREATE OR REPLACE FUNCTION public.protect_recording_timestamps()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_at := now();
  ELSE
    NEW.created_at := OLD.created_at;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS recordings_protect_timestamps ON public.recordings;
CREATE TRIGGER recordings_protect_timestamps
  BEFORE INSERT OR UPDATE ON public.recordings
  FOR EACH ROW EXECUTE FUNCTION public.protect_recording_timestamps();

REVOKE EXECUTE ON FUNCTION public.protect_day_progress_timestamps() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.protect_recording_timestamps() FROM PUBLIC, anon, authenticated;

-- Purge candidate functions: never surface a path that fails ownership -------
CREATE OR REPLACE FUNCTION public.purge_candidates(_limit integer, _take_min_age_hours integer, _final_retention_days integer, _module_last_day integer)
 RETURNS TABLE(id uuid, user_id uuid, module_id text, day smallint, take_number smallint, is_final_rep boolean, storage_path text, created_at timestamp with time zone, audio_purged_at timestamp with time zone, duration_seconds numeric, mime_type text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT r.id, r.user_id, r.module_id, r.day, r.take_number, r.is_final_rep,
         r.storage_path, r.created_at, r.audio_purged_at, r.duration_seconds, r.mime_type
  FROM public.recordings r
  WHERE r.audio_purged_at IS NULL
    AND public.owns_storage_path(r.user_id, r.storage_path)
    AND (
      CASE
        WHEN r.is_final_rep
          OR EXISTS (SELECT 1 FROM public.day_progress dp WHERE dp.recording_path = r.storage_path)
        THEN r.day NOT IN (1, _module_last_day)
             AND r.created_at < now() - make_interval(days => _final_retention_days)
        ELSE r.created_at < now() - make_interval(hours => _take_min_age_hours)
      END
    )
  ORDER BY r.created_at ASC
  LIMIT greatest(_limit, 0)
$function$;

CREATE OR REPLACE FUNCTION public.purge_day_final_candidates(_limit integer, _final_retention_days integer, _module_last_day integer)
 RETURNS TABLE(user_id uuid, module_id text, day smallint, completed_at timestamp with time zone, recording_path text, recording_purged_at timestamp with time zone)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
  SELECT dp.user_id, dp.module_id, dp.day, dp.completed_at, dp.recording_path, dp.recording_purged_at
  FROM public.day_progress dp
  WHERE dp.recording_purged_at IS NULL
    AND dp.recording_path IS NOT NULL
    AND public.owns_storage_path(dp.user_id, dp.recording_path)
    AND dp.day NOT IN (1, _module_last_day)
    AND dp.completed_at < now() - make_interval(days => _final_retention_days)
  ORDER BY dp.completed_at ASC
  LIMIT greatest(_limit, 0)
$function$;