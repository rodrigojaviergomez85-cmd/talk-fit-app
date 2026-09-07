DROP TRIGGER IF EXISTS day_progress_completion_cap ON public.day_progress;
DROP FUNCTION IF EXISTS public.enforce_daily_completion_cap();

CREATE TABLE public.practice_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id text NOT NULL,
  day smallint NOT NULL,
  local_day_key text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  first_recording_at timestamptz,
  completed_at timestamptz,
  is_first_completion boolean NOT NULL DEFAULT false,
  speaking_seconds integer NOT NULL DEFAULT 0,
  sentence_count integer,
  recording_path text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.practice_attempts TO authenticated;
GRANT ALL ON public.practice_attempts TO service_role;

ALTER TABLE public.practice_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own practice attempts"
ON public.practice_attempts FOR ALL TO authenticated
USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX practice_attempts_user_day_idx
  ON public.practice_attempts (user_id, local_day_key);

CREATE TRIGGER practice_attempts_updated_at
BEFORE UPDATE ON public.practice_attempts
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- MAXIMUM 5 PRACTICE SESSIONS PER LOCAL CALENDAR DAY.
-- A slot is consumed when the learner makes the FIRST real recording of a
-- session, never by opening a lesson. Repeats of an already completed day
-- consume a slot exactly like a new day: the cap is about practice activity,
-- not curriculum progress. This trigger is the multi-device / security
-- boundary; the client mirror is UX only.
CREATE OR REPLACE FUNCTION public.enforce_daily_practice_cap()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _used INTEGER;
BEGIN
  IF NEW.first_recording_at IS NULL THEN
    RETURN NEW;
  END IF;

  -- Resuming / refreshing an already counted session never consumes another slot.
  IF TG_OP = 'UPDATE' AND OLD.first_recording_at IS NOT NULL THEN
    RETURN NEW;
  END IF;

  IF public.is_unlimited_test_user(NEW.user_id) THEN
    RETURN NEW;
  END IF;

  SELECT count(*) INTO _used
  FROM public.practice_attempts
  WHERE user_id = NEW.user_id
    AND local_day_key = NEW.local_day_key
    AND first_recording_at IS NOT NULL
    AND id <> NEW.id;

  IF _used >= 5 THEN
    RAISE EXCEPTION 'DAILY_PRACTICE_CAP: max 5 practice sessions per local calendar day'
      USING ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER practice_attempts_daily_cap
BEFORE INSERT OR UPDATE ON public.practice_attempts
FOR EACH ROW EXECUTE FUNCTION public.enforce_daily_practice_cap();