-- 1) Single source of truth for per-section limits
CREATE TABLE public.section_limits (
  section_key text PRIMARY KEY,
  label text NOT NULL,
  free_limit integer NOT NULL,
  free_monthly_limit integer,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.section_limits TO authenticated;
GRANT ALL ON public.section_limits TO service_role;

ALTER TABLE public.section_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read section limits"
  ON public.section_limits FOR SELECT TO authenticated USING (true);

CREATE TRIGGER section_limits_updated_at
  BEFORE UPDATE ON public.section_limits
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

INSERT INTO public.section_limits (section_key, label, free_limit, free_monthly_limit, sort_order) VALUES
  ('practice',     'Prácticas (módulos y Review)', 5, NULL, 1),
  ('interview',    'Interview Simulator',          2, NULL, 2),
  ('ai_coach',     'AI Coach (chat)',              5, 60,   3),
  ('final_coach',  'Coach de audio final',         5, NULL, 4),
  ('coach_retake', 'Retakes del coach',            5, NULL, 5);

-- 2) Pro detection + effective limits
CREATE OR REPLACE FUNCTION public.is_pro_subscriber(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.subscribers s
    WHERE s.user_id = _user_id
      AND s.subscribed = true
      AND coalesce(s.status, '') IN ('active', 'trialing')
  )
$$;

CREATE OR REPLACE FUNCTION public.plan_multiplier(_user_id uuid)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT CASE WHEN public.is_pro_subscriber(_user_id) THEN 4 ELSE 1 END
$$;

CREATE OR REPLACE FUNCTION public.get_daily_limit(p_user_id uuid, p_section_key text)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT sl.free_limit * public.plan_multiplier(p_user_id)
  FROM public.section_limits sl
  WHERE sl.section_key = p_section_key
$$;

CREATE OR REPLACE FUNCTION public.get_monthly_limit(p_user_id uuid, p_section_key text)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT sl.free_monthly_limit * public.plan_multiplier(p_user_id)
  FROM public.section_limits sl
  WHERE sl.section_key = p_section_key
$$;

GRANT EXECUTE ON FUNCTION public.is_pro_subscriber(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.plan_multiplier(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_daily_limit(uuid, text) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.get_monthly_limit(uuid, text) TO authenticated, service_role;

-- 3) Enforcement now reads the table instead of a hardcoded number
CREATE OR REPLACE FUNCTION public.enforce_daily_practice_cap()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
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

-- 4) AI Coach quotas read the table (daily + monthly, both multiplied for Pro)
CREATE OR REPLACE FUNCTION public.get_ai_coach_quota(_user_id uuid)
RETURNS TABLE(allowed boolean, unlimited boolean, daily_used integer, monthly_used integer,
              daily_limit integer, monthly_limit integer,
              day_reset_at timestamp with time zone, month_reset_at timestamp with time zone,
              blocked text)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _day_key TEXT := to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM-DD');
  _month_key TEXT := to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM');
  _day_reset TIMESTAMPTZ := ((date_trunc('day', now() AT TIME ZONE 'UTC') + interval '1 day') AT TIME ZONE 'UTC');
  _month_reset TIMESTAMPTZ := ((date_trunc('month', now() AT TIME ZONE 'UTC') + interval '1 month') AT TIME ZONE 'UTC');
  _daily_limit INTEGER := coalesce(public.get_daily_limit(_user_id, 'ai_coach'), 5);
  _monthly_limit INTEGER := coalesce(public.get_monthly_limit(_user_id, 'ai_coach'), 60);
  _d INTEGER := 0;
  _m INTEGER := 0;
  _blocked TEXT := 'none';
BEGIN
  IF public.is_unlimited_test_user(_user_id) THEN
    RETURN QUERY SELECT true, true, 0, 0, _daily_limit, _monthly_limit, _day_reset, _month_reset, 'none'::text;
    RETURN;
  END IF;

  SELECT coalesce(used, 0) INTO _d FROM public.ai_coach_usage
  WHERE user_id = _user_id AND period_type = 'day' AND period_key = _day_key;
  SELECT coalesce(used, 0) INTO _m FROM public.ai_coach_usage
  WHERE user_id = _user_id AND period_type = 'month' AND period_key = _month_key;

  _d := coalesce(_d, 0);
  _m := coalesce(_m, 0);

  IF _m >= _monthly_limit THEN _blocked := 'monthly';
  ELSIF _d >= _daily_limit THEN _blocked := 'daily';
  END IF;

  RETURN QUERY SELECT (_blocked = 'none'), false, _d, _m, _daily_limit, _monthly_limit, _day_reset, _month_reset, _blocked;
END;
$$;

CREATE OR REPLACE FUNCTION public.consume_ai_coach_quota(_user_id uuid)
RETURNS TABLE(allowed boolean, unlimited boolean, daily_used integer, monthly_used integer,
              daily_limit integer, monthly_limit integer,
              day_reset_at timestamp with time zone, month_reset_at timestamp with time zone,
              blocked text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _day_key TEXT := to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM-DD');
  _month_key TEXT := to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM');
  _day_reset TIMESTAMPTZ := ((date_trunc('day', now() AT TIME ZONE 'UTC') + interval '1 day') AT TIME ZONE 'UTC');
  _month_reset TIMESTAMPTZ := ((date_trunc('month', now() AT TIME ZONE 'UTC') + interval '1 month') AT TIME ZONE 'UTC');
  _daily_limit INTEGER := coalesce(public.get_daily_limit(_user_id, 'ai_coach'), 5);
  _monthly_limit INTEGER := coalesce(public.get_monthly_limit(_user_id, 'ai_coach'), 60);
  _d INTEGER := 0;
  _m INTEGER := 0;
  _blocked TEXT := 'none';
BEGIN
  IF public.is_unlimited_test_user(_user_id) THEN
    RETURN QUERY SELECT true, true, 0, 0, _daily_limit, _monthly_limit, _day_reset, _month_reset, 'none'::text;
    RETURN;
  END IF;

  INSERT INTO public.ai_coach_usage (user_id, period_type, period_key, used)
  VALUES (_user_id, 'day', _day_key, 0)
  ON CONFLICT (user_id, period_type, period_key) DO NOTHING;
  INSERT INTO public.ai_coach_usage (user_id, period_type, period_key, used)
  VALUES (_user_id, 'month', _month_key, 0)
  ON CONFLICT (user_id, period_type, period_key) DO NOTHING;

  -- Lock both counters in a stable order, then decide.
  SELECT used INTO _d FROM public.ai_coach_usage
  WHERE user_id = _user_id AND period_type = 'day' AND period_key = _day_key FOR UPDATE;
  SELECT used INTO _m FROM public.ai_coach_usage
  WHERE user_id = _user_id AND period_type = 'month' AND period_key = _month_key FOR UPDATE;

  _d := coalesce(_d, 0);
  _m := coalesce(_m, 0);

  IF _m >= _monthly_limit THEN
    _blocked := 'monthly';
  ELSIF _d >= _daily_limit THEN
    _blocked := 'daily';
  END IF;

  IF _blocked = 'none' THEN
    UPDATE public.ai_coach_usage SET used = used + 1, updated_at = now()
    WHERE user_id = _user_id AND period_type = 'day' AND period_key = _day_key
    RETURNING used INTO _d;
    UPDATE public.ai_coach_usage SET used = used + 1, updated_at = now()
    WHERE user_id = _user_id AND period_type = 'month' AND period_key = _month_key
    RETURNING used INTO _m;
  END IF;

  RETURN QUERY SELECT (_blocked = 'none'), false, _d, _m, _daily_limit, _monthly_limit, _day_reset, _month_reset, _blocked;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_ai_coach_quota(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_ai_coach_quota(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_ai_coach_quota(uuid) TO service_role, authenticated;

-- 5) Per-section usage snapshot (day + month) for the UI
CREATE OR REPLACE FUNCTION public.get_section_usage(_user_id uuid, _section_key text, _local_day_key text)
RETURNS TABLE(section_key text, label text, free_limit integer, day_limit integer,
              day_used integer, month_limit integer, month_used integer,
              is_pro boolean, unlimited boolean)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _row public.section_limits%ROWTYPE;
  _pro BOOLEAN := public.is_pro_subscriber(_user_id);
  _unl BOOLEAN := public.is_unlimited_test_user(_user_id);
  _mult INTEGER := CASE WHEN _pro THEN 4 ELSE 1 END;
  _day_used INTEGER := 0;
  _month_used INTEGER := 0;
  _month_key TEXT := left(coalesce(_local_day_key, to_char(now(), 'YYYY-MM-DD')), 7);
BEGIN
  SELECT * INTO _row FROM public.section_limits WHERE public.section_limits.section_key = _section_key;
  IF NOT FOUND THEN RETURN; END IF;

  IF _section_key = 'practice' THEN
    SELECT count(*) INTO _day_used FROM public.practice_attempts
      WHERE user_id = _user_id AND local_day_key = _local_day_key AND first_recording_at IS NOT NULL;
    SELECT count(*) INTO _month_used FROM public.practice_attempts
      WHERE user_id = _user_id AND left(local_day_key, 7) = _month_key AND first_recording_at IS NOT NULL;
  ELSIF _section_key = 'interview' THEN
    SELECT count(*) INTO _day_used FROM public.interview_attempts
      WHERE user_id = _user_id AND local_day_key = _local_day_key AND first_recording_at IS NOT NULL;
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
    _unl;
END;
$$;

GRANT EXECUTE ON FUNCTION public.get_section_usage(uuid, text, text) TO authenticated, service_role;