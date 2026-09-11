-- 1. Usage table (server-only)
CREATE TABLE public.ai_coach_usage (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  period_type TEXT NOT NULL CHECK (period_type IN ('day','month')),
  period_key TEXT NOT NULL,
  used INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, period_type, period_key)
);

GRANT ALL ON public.ai_coach_usage TO service_role;

ALTER TABLE public.ai_coach_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No direct client access to ai_coach_usage"
  ON public.ai_coach_usage FOR ALL TO authenticated, anon
  USING (false) WITH CHECK (false);

CREATE TRIGGER ai_coach_usage_updated_at
  BEFORE UPDATE ON public.ai_coach_usage
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- 2. Harden the shared internal-account check: verify against auth.users
--    (confirmed email) instead of the learner-editable public.profiles.email.
CREATE OR REPLACE FUNCTION public.is_unlimited_test_user(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM auth.users u
    WHERE u.id = _user_id
      AND u.email_confirmed_at IS NOT NULL
      AND lower(u.email) IN (
        'english4callcenters@gmail.com',
        'auxialeman@gmail.com',
        'leticiamgth@gmail.com'
      )
  );
$$;

-- 3. Read-only quota snapshot (no consumption)
CREATE OR REPLACE FUNCTION public.get_ai_coach_quota(_user_id uuid)
RETURNS TABLE(
  allowed boolean,
  unlimited boolean,
  daily_used integer,
  monthly_used integer,
  daily_limit integer,
  monthly_limit integer,
  day_reset_at timestamptz,
  month_reset_at timestamptz,
  blocked text
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _daily_limit CONSTANT INTEGER := 5;
  _monthly_limit CONSTANT INTEGER := 60;
  _now TIMESTAMPTZ := now();
  _day TEXT := to_char(_now AT TIME ZONE 'utc', 'YYYY-MM-DD');
  _month TEXT := to_char(_now AT TIME ZONE 'utc', 'YYYY-MM');
  _d INTEGER := 0;
  _m INTEGER := 0;
  _blocked TEXT := 'none';
BEGIN
  IF public.is_unlimited_test_user(_user_id) THEN
    RETURN QUERY SELECT true, true, 0, 0, _daily_limit, _monthly_limit,
      date_trunc('day', _now AT TIME ZONE 'utc') + interval '1 day',
      date_trunc('month', _now AT TIME ZONE 'utc') + interval '1 month',
      'none'::text;
    RETURN;
  END IF;

  SELECT coalesce(used, 0) INTO _d FROM public.ai_coach_usage
    WHERE user_id = _user_id AND period_type = 'day' AND period_key = _day;
  SELECT coalesce(used, 0) INTO _m FROM public.ai_coach_usage
    WHERE user_id = _user_id AND period_type = 'month' AND period_key = _month;
  _d := coalesce(_d, 0);
  _m := coalesce(_m, 0);

  IF _m >= _monthly_limit THEN _blocked := 'monthly';
  ELSIF _d >= _daily_limit THEN _blocked := 'daily';
  END IF;

  RETURN QUERY SELECT (_blocked = 'none'), false, _d, _m, _daily_limit, _monthly_limit,
    date_trunc('day', _now AT TIME ZONE 'utc') + interval '1 day',
    date_trunc('month', _now AT TIME ZONE 'utc') + interval '1 month',
    _blocked;
END;
$$;

-- 4. Atomic consume: locks both period rows, consumes neither when either is exhausted.
CREATE OR REPLACE FUNCTION public.consume_ai_coach_quota(_user_id uuid)
RETURNS TABLE(
  allowed boolean,
  unlimited boolean,
  daily_used integer,
  monthly_used integer,
  daily_limit integer,
  monthly_limit integer,
  day_reset_at timestamptz,
  month_reset_at timestamptz,
  blocked text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  _daily_limit CONSTANT INTEGER := 5;
  _monthly_limit CONSTANT INTEGER := 60;
  _now TIMESTAMPTZ := now();
  _day TEXT := to_char(_now AT TIME ZONE 'utc', 'YYYY-MM-DD');
  _month TEXT := to_char(_now AT TIME ZONE 'utc', 'YYYY-MM');
  _d INTEGER := 0;
  _m INTEGER := 0;
  _blocked TEXT := 'none';
BEGIN
  IF public.is_unlimited_test_user(_user_id) THEN
    RETURN QUERY SELECT true, true, 0, 0, _daily_limit, _monthly_limit,
      date_trunc('day', _now AT TIME ZONE 'utc') + interval '1 day',
      date_trunc('month', _now AT TIME ZONE 'utc') + interval '1 month',
      'none'::text;
    RETURN;
  END IF;

  -- Ensure both rows exist, then lock them in a deterministic order so that
  -- concurrent requests serialize on the same rows.
  INSERT INTO public.ai_coach_usage (user_id, period_type, period_key, used)
  VALUES (_user_id, 'month', _month, 0)
  ON CONFLICT (user_id, period_type, period_key) DO NOTHING;

  INSERT INTO public.ai_coach_usage (user_id, period_type, period_key, used)
  VALUES (_user_id, 'day', _day, 0)
  ON CONFLICT (user_id, period_type, period_key) DO NOTHING;

  SELECT used INTO _m FROM public.ai_coach_usage
    WHERE user_id = _user_id AND period_type = 'month' AND period_key = _month
    FOR UPDATE;

  SELECT used INTO _d FROM public.ai_coach_usage
    WHERE user_id = _user_id AND period_type = 'day' AND period_key = _day
    FOR UPDATE;

  _d := coalesce(_d, 0);
  _m := coalesce(_m, 0);

  IF _m >= _monthly_limit THEN
    _blocked := 'monthly';
  ELSIF _d >= _daily_limit THEN
    _blocked := 'daily';
  END IF;

  IF _blocked = 'none' THEN
    UPDATE public.ai_coach_usage SET used = used + 1
      WHERE user_id = _user_id AND period_type = 'month' AND period_key = _month
      RETURNING used INTO _m;
    UPDATE public.ai_coach_usage SET used = used + 1
      WHERE user_id = _user_id AND period_type = 'day' AND period_key = _day
      RETURNING used INTO _d;
  END IF;

  RETURN QUERY SELECT (_blocked = 'none'), false, _d, _m, _daily_limit, _monthly_limit,
    date_trunc('day', _now AT TIME ZONE 'utc') + interval '1 day',
    date_trunc('month', _now AT TIME ZONE 'utc') + interval '1 month',
    _blocked;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_ai_coach_quota(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_ai_coach_quota(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_ai_coach_quota(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_ai_coach_quota(uuid) TO service_role;