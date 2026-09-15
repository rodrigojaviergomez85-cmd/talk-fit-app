-- The ONLY definition of "today" for practice and interview caps.
-- The timezone is fixed on purpose: the product serves Central American and
-- Colombian learners; a one-hour shift at the day boundary for Colombia is
-- acceptable, a per-device day is not.
CREATE OR REPLACE FUNCTION public.practice_day_key()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT to_char(now() AT TIME ZONE 'America/El_Salvador', 'YYYY-MM-DD');
$$;

COMMENT ON FUNCTION public.practice_day_key() IS
  'Single source of truth for the practice/interview day. Fixed to America/El_Salvador on purpose: learners are in Central America and Colombia; a one-hour boundary shift for Colombia is acceptable, a per-device day is not.';

GRANT EXECUTE ON FUNCTION public.practice_day_key() TO authenticated, service_role;

-- Server overrides whatever local_day_key the client sent.
CREATE OR REPLACE FUNCTION public.assign_practice_day()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.local_day_key := public.practice_day_key();
  RETURN NEW;
END;
$$;

COMMENT ON FUNCTION public.assign_practice_day() IS
  'BEFORE INSERT on practice_attempts/interview_attempts. Trigger names start with "assign" so they sort before "daily_cap": Postgres fires BEFORE triggers on the same event in alphabetical order, so the cap always counts the server-assigned day.';

REVOKE EXECUTE ON FUNCTION public.assign_practice_day() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS practice_attempts_assign_day ON public.practice_attempts;
CREATE TRIGGER practice_attempts_assign_day
BEFORE INSERT ON public.practice_attempts
FOR EACH ROW EXECUTE FUNCTION public.assign_practice_day();

DROP TRIGGER IF EXISTS interview_attempts_assign_day ON public.interview_attempts;
CREATE TRIGGER interview_attempts_assign_day
BEFORE INSERT ON public.interview_attempts
FOR EACH ROW EXECUTE FUNCTION public.assign_practice_day();

-- Tolerance window removed: the key can no longer be wrong, the server wrote it.
CREATE OR REPLACE FUNCTION public.enforce_daily_practice_cap()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _used INTEGER;
  _cap INTEGER;
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
$function$;

CREATE OR REPLACE FUNCTION public.enforce_daily_interview_cap()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _used INTEGER;
  _cap INTEGER;
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
$function$;

-- _local_day_key is retained only so existing callers keep compiling; it is no
-- longer trusted. Practice and interview usage use public.practice_day_key().
CREATE OR REPLACE FUNCTION public.get_section_usage(_user_id uuid, _section_key text, _local_day_key text)
RETURNS TABLE(section_key text, label text, free_limit integer, day_limit integer, day_used integer, month_limit integer, month_used integer, is_pro boolean, unlimited boolean)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _row public.section_limits%ROWTYPE;
  _pro BOOLEAN := public.is_pro_subscriber(_user_id);
  _unl BOOLEAN := public.is_unlimited_test_user(_user_id);
  _on BOOLEAN := public.limits_enabled();
  _mult INTEGER := public.plan_multiplier(_user_id);
  _day_used INTEGER := 0;
  _month_used INTEGER := 0;
  _server_day TEXT := public.practice_day_key();
  _month_key TEXT := left(public.practice_day_key(), 7);
BEGIN
  SELECT * INTO _row FROM public.section_limits WHERE public.section_limits.section_key = _section_key;
  IF NOT FOUND THEN RETURN; END IF;

  IF _section_key = 'practice' THEN
    SELECT count(*) INTO _day_used FROM public.practice_attempts
      WHERE user_id = _user_id AND local_day_key = _server_day AND first_recording_at IS NOT NULL;
    SELECT count(*) INTO _month_used FROM public.practice_attempts
      WHERE user_id = _user_id AND left(local_day_key, 7) = _month_key AND first_recording_at IS NOT NULL;
  ELSIF _section_key = 'interview' THEN
    SELECT count(*) INTO _day_used FROM public.interview_attempts
      WHERE user_id = _user_id AND local_day_key = _server_day AND first_recording_at IS NOT NULL;
    SELECT count(*) INTO _month_used FROM public.interview_attempts
      WHERE user_id = _user_id AND left(local_day_key, 7) = _month_key AND first_recording_at IS NOT NULL;
  ELSIF _section_key = 'ai_coach' THEN
    SELECT coalesce(used, 0) INTO _day_used FROM public.ai_coach_usage
      WHERE user_id = _user_id AND period_type = 'day'
        AND period_key = to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM-DD');
    SELECT coalesce(used, 0) INTO _month_used FROM public.ai_coach_usage
      WHERE user_id = _user_id AND period_type = 'month'
        AND period_key = to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM');
  ELSIF _section_key IN ('final_coach', 'coach_retake') THEN
    SELECT coalesce(sum(request_count), 0) INTO _day_used FROM public.ai_usage_limits
      WHERE user_id = _user_id
        AND endpoint = CASE WHEN _section_key = 'final_coach' THEN 'final-audio-coach' ELSE 'final-audio-coach-retake' END
        AND window_start > now() - interval '24 hours';
    _month_used := _day_used;
  END IF;

  RETURN QUERY SELECT
    _row.section_key,
    _row.label,
    _row.free_limit,
    _row.free_limit * _mult,
    coalesce(_day_used, 0),
    _row.free_monthly_limit * _mult,
    coalesce(_month_used, 0),
    _pro,
    (_unl OR NOT _on OR NOT _row.enabled);
END;
$function$;