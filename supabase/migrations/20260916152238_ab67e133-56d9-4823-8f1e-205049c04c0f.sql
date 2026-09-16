CREATE OR REPLACE FUNCTION public.protect_day_progress_timestamps()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _floor timestamptz;
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_at := now();
    _floor := NEW.created_at;
  ELSE
    NEW.created_at := OLD.created_at;
    -- The floor is the oldest real timestamp on the row. created_at was
    -- backfilled with now() when the column was added, so on legacy rows it is
    -- NEWER than completed_at; using it alone froze those rows forever.
    _floor := least(NEW.created_at, OLD.completed_at, OLD.latest_recorded_at);
  END IF;

  IF NEW.completed_at IS NOT NULL THEN
    IF NEW.completed_at > now() + interval '1 hour'
       OR NEW.completed_at < _floor - interval '1 hour' THEN
      RAISE EXCEPTION 'INVALID_COMPLETED_AT: % is outside the allowed window', NEW.completed_at
        USING ERRCODE = 'P0001';
    END IF;
  END IF;

  IF NEW.latest_recorded_at IS NOT NULL THEN
    IF NEW.latest_recorded_at > now() + interval '1 hour'
       OR NEW.latest_recorded_at < _floor - interval '1 hour' THEN
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

-- Repair the backfilled created_at values (trigger pins created_at, so disable it here).
ALTER TABLE public.day_progress DISABLE TRIGGER day_progress_protect_timestamps;

UPDATE public.day_progress
SET created_at = least(created_at, completed_at, latest_recorded_at)
WHERE created_at > least(completed_at, coalesce(latest_recorded_at, completed_at));

ALTER TABLE public.day_progress ENABLE TRIGGER day_progress_protect_timestamps;