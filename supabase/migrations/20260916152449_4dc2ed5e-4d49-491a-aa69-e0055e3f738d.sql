CREATE OR REPLACE FUNCTION public.protect_recording_timestamps()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_at := now();
  ELSE
    -- A re-upload onto a row that retention had already stamped is BRAND NEW
    -- audio: it gets a fresh clock so the cleanup job cannot delete it again
    -- right away. Every other update keeps created_at frozen.
    IF OLD.audio_purged_at IS NOT NULL AND NEW.audio_purged_at IS NULL THEN
      NEW.created_at := now();
    ELSE
      NEW.created_at := OLD.created_at;
    END IF;
  END IF;
  RETURN NEW;
END;
$function$;

-- Repair: rows whose audio was re-uploaded after the purge stamp.
UPDATE public.recordings
SET audio_purged_at = NULL
WHERE audio_purged_at IS NOT NULL
  AND storage_path IS NOT NULL
  AND updated_at > audio_purged_at;