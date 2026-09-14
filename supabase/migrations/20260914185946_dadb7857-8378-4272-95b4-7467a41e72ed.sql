-- SECTION A: permissions
REVOKE DELETE ON public.practice_attempts FROM authenticated;
REVOKE DELETE ON public.interview_attempts FROM authenticated;

DROP POLICY IF EXISTS "Users manage own practice attempts" ON public.practice_attempts;
CREATE POLICY "Users view own practice attempts" ON public.practice_attempts
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users create own practice attempts" ON public.practice_attempts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own practice attempts" ON public.practice_attempts
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage their own interview attempts" ON public.interview_attempts;
CREATE POLICY "Users view own interview attempts" ON public.interview_attempts
  FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users create own interview attempts" ON public.interview_attempts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own interview attempts" ON public.interview_attempts
  FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- SECTION B: local_day_key format
DO $do$
BEGIN
  IF EXISTS (SELECT 1 FROM public.practice_attempts WHERE local_day_key !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$') THEN
    RAISE EXCEPTION 'practice_attempts has rows whose local_day_key is not YYYY-MM-DD; fix them before adding the constraint';
  END IF;
  IF EXISTS (SELECT 1 FROM public.interview_attempts WHERE local_day_key !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$') THEN
    RAISE EXCEPTION 'interview_attempts has rows whose local_day_key is not YYYY-MM-DD; fix them before adding the constraint';
  END IF;
END
$do$;

ALTER TABLE public.practice_attempts
  ADD CONSTRAINT practice_attempts_local_day_key_format
  CHECK (local_day_key ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$');
ALTER TABLE public.interview_attempts
  ADD CONSTRAINT interview_attempts_local_day_key_format
  CHECK (local_day_key ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$');

-- SECTION C: immutability
CREATE OR REPLACE FUNCTION public.protect_attempt_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'IMMUTABLE_ATTEMPT_FIELD user_id' USING ERRCODE = 'P0001';
  END IF;
  IF NEW.module_id IS DISTINCT FROM OLD.module_id THEN
    RAISE EXCEPTION 'IMMUTABLE_ATTEMPT_FIELD module_id' USING ERRCODE = 'P0001';
  END IF;
  IF NEW.day IS DISTINCT FROM OLD.day THEN
    RAISE EXCEPTION 'IMMUTABLE_ATTEMPT_FIELD day' USING ERRCODE = 'P0001';
  END IF;
  IF NEW.local_day_key IS DISTINCT FROM OLD.local_day_key THEN
    RAISE EXCEPTION 'IMMUTABLE_ATTEMPT_FIELD local_day_key' USING ERRCODE = 'P0001';
  END IF;
  IF OLD.first_recording_at IS NOT NULL
     AND NEW.first_recording_at IS DISTINCT FROM OLD.first_recording_at THEN
    RAISE EXCEPTION 'IMMUTABLE_ATTEMPT_FIELD first_recording_at' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.protect_interview_attempt_fields()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.user_id IS DISTINCT FROM OLD.user_id THEN
    RAISE EXCEPTION 'IMMUTABLE_ATTEMPT_FIELD user_id' USING ERRCODE = 'P0001';
  END IF;
  IF NEW.simulator IS DISTINCT FROM OLD.simulator THEN
    RAISE EXCEPTION 'IMMUTABLE_ATTEMPT_FIELD simulator' USING ERRCODE = 'P0001';
  END IF;
  IF NEW.local_day_key IS DISTINCT FROM OLD.local_day_key THEN
    RAISE EXCEPTION 'IMMUTABLE_ATTEMPT_FIELD local_day_key' USING ERRCODE = 'P0001';
  END IF;
  IF OLD.first_recording_at IS NOT NULL
     AND NEW.first_recording_at IS DISTINCT FROM OLD.first_recording_at THEN
    RAISE EXCEPTION 'IMMUTABLE_ATTEMPT_FIELD first_recording_at' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS practice_attempts_immutable ON public.practice_attempts;
CREATE TRIGGER practice_attempts_immutable
  BEFORE UPDATE ON public.practice_attempts
  FOR EACH ROW EXECUTE FUNCTION public.protect_attempt_fields();

DROP TRIGGER IF EXISTS interview_attempts_immutable ON public.interview_attempts;
CREATE TRIGGER interview_attempts_immutable
  BEFORE UPDATE ON public.interview_attempts
  FOR EACH ROW EXECUTE FUNCTION public.protect_interview_attempt_fields();

-- SECTION D: server date validation inside the existing cap triggers
CREATE OR REPLACE FUNCTION public.enforce_daily_practice_cap()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _used INTEGER;
  _cap INTEGER;
  _server_day DATE := (now() AT TIME ZONE 'UTC')::date;
BEGIN
  IF NEW.first_recording_at IS NULL THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' AND OLD.first_recording_at IS NOT NULL THEN
    RETURN NEW;
  END IF;

  -- Data integrity, not a quota: applies to everyone, internal accounts included.
  IF NEW.local_day_key::date < _server_day - 1 OR NEW.local_day_key::date > _server_day + 1 THEN
    RAISE EXCEPTION 'INVALID_LOCAL_DAY_KEY: % is not within one day of the server date', NEW.local_day_key
      USING ERRCODE = 'P0001';
  END IF;

  IF public.is_unlimited_test_user(NEW.user_id) THEN
    RETURN NEW;
  END IF;

  -- Only one transaction at a time may evaluate this user's day.
  PERFORM pg_advisory_xact_lock(hashtext('practice:' || NEW.user_id::text || ':' || coalesce(NEW.local_day_key, '')));

  _cap := coalesce(public.get_daily_limit(NEW.user_id, 'practice'), 5);

  SELECT count(*) INTO _used
  FROM public.practice_attempts
  WHERE user_id = NEW.user_id
    AND local_day_key = NEW.local_day_key
    AND first_recording_at IS NOT NULL
    AND id <> NEW.id;

  IF _used >= _cap THEN
    RAISE EXCEPTION 'DAILY_PRACTICE_CAP: max % practice sessions per local calendar day', _cap
      USING ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.enforce_daily_interview_cap()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _used INTEGER;
  _cap INTEGER;
  _server_day DATE := (now() AT TIME ZONE 'UTC')::date;
BEGIN
  IF NEW.first_recording_at IS NULL THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'UPDATE' AND OLD.first_recording_at IS NOT NULL THEN
    RETURN NEW;
  END IF;

  IF NEW.local_day_key::date < _server_day - 1 OR NEW.local_day_key::date > _server_day + 1 THEN
    RAISE EXCEPTION 'INVALID_LOCAL_DAY_KEY: % is not within one day of the server date', NEW.local_day_key
      USING ERRCODE = 'P0001';
  END IF;

  IF public.is_unlimited_test_user(NEW.user_id) THEN
    RETURN NEW;
  END IF;

  PERFORM pg_advisory_xact_lock(hashtext('interview:' || NEW.user_id::text || ':' || coalesce(NEW.local_day_key, '')));

  _cap := coalesce(public.get_daily_limit(NEW.user_id, 'interview'), 2);

  SELECT count(*) INTO _used
  FROM public.interview_attempts
  WHERE user_id = NEW.user_id
    AND local_day_key = NEW.local_day_key
    AND first_recording_at IS NOT NULL
    AND id <> NEW.id;

  IF _used >= _cap THEN
    RAISE EXCEPTION 'DAILY_INTERVIEW_CAP: max % interview simulations per local calendar day', _cap
      USING ERRCODE = 'P0001';
  END IF;

  RETURN NEW;
END;
$$;