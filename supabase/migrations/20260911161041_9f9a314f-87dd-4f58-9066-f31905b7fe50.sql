CREATE TABLE public.interview_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  simulator text NOT NULL CHECK (simulator IN ('b4','intermediate','advanced')),
  local_day_key text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(),
  first_recording_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE ON public.interview_attempts TO authenticated;
GRANT ALL ON public.interview_attempts TO service_role;

ALTER TABLE public.interview_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage their own interview attempts"
  ON public.interview_attempts FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE INDEX interview_attempts_user_day_idx
  ON public.interview_attempts (user_id, local_day_key);

CREATE TRIGGER interview_attempts_updated_at
  BEFORE UPDATE ON public.interview_attempts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.enforce_daily_interview_cap()
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

  IF TG_OP = 'UPDATE' AND OLD.first_recording_at IS NOT NULL THEN
    RETURN NEW;
  END IF;

  IF public.is_unlimited_test_user(NEW.user_id) THEN
    RETURN NEW;
  END IF;

  SELECT count(*) INTO _used
  FROM public.interview_attempts
  WHERE user_id = NEW.user_id
    AND local_day_key = NEW.local_day_key
    AND first_recording_at IS NOT NULL
    AND id <> NEW.id;

  IF _used >= 2 THEN
    RAISE EXCEPTION 'DAILY_INTERVIEW_CAP: max 2 interview simulations per local calendar day'
      USING ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER interview_attempts_daily_cap
  BEFORE INSERT OR UPDATE ON public.interview_attempts
  FOR EACH ROW EXECUTE FUNCTION public.enforce_daily_interview_cap();