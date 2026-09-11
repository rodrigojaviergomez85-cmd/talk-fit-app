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
  _day_reset TIMESTAMPTZ := (date_trunc('day', _now AT TIME ZONE 'utc') + interval '1 day') AT TIME ZONE 'utc';
  _month_reset TIMESTAMPTZ := (date_trunc('month', _now AT TIME ZONE 'utc') + interval '1 month') AT TIME ZONE 'utc';
  _d INTEGER := 0;
  _m INTEGER := 0;
  _blocked TEXT := 'none';
BEGIN
  IF public.is_unlimited_test_user(_user_id) THEN
    RETURN QUERY SELECT true, true, 0, 0, _daily_limit, _monthly_limit, _day_reset, _month_reset, 'none'::text;
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
    _day_reset, _month_reset, _blocked;
END;
$$;

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
  _day_reset TIMESTAMPTZ := (date_trunc('day', _now AT TIME ZONE 'utc') + interval '1 day') AT TIME ZONE 'utc';
  _month_reset TIMESTAMPTZ := (date_trunc('month', _now AT TIME ZONE 'utc') + interval '1 month') AT TIME ZONE 'utc';
  _d INTEGER := 0;
  _m INTEGER := 0;
  _blocked TEXT := 'none';
BEGIN
  IF public.is_unlimited_test_user(_user_id) THEN
    RETURN QUERY SELECT true, true, 0, 0, _daily_limit, _monthly_limit, _day_reset, _month_reset, 'none'::text;
    RETURN;
  END IF;

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
    _day_reset, _month_reset, _blocked;
END;
$$;

REVOKE ALL ON FUNCTION public.consume_ai_coach_quota(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_ai_coach_quota(uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.consume_ai_coach_quota(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_ai_coach_quota(uuid) TO service_role;