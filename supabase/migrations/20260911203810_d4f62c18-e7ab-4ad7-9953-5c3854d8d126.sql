-- 1. Admin helper -----------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_admin(p_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles ur WHERE ur.user_id = p_user_id AND ur.role = 'admin')
$$;

-- 2. Global settings ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.app_settings (
  id text PRIMARY KEY DEFAULT 'global',
  limits_enabled boolean NOT NULL DEFAULT true,
  billing_enabled boolean NOT NULL DEFAULT true,
  pro_multiplier integer NOT NULL DEFAULT 4 CHECK (pro_multiplier BETWEEN 1 AND 100),
  updated_by uuid,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT app_settings_single_row CHECK (id = 'global')
);
INSERT INTO public.app_settings (id) VALUES ('global') ON CONFLICT (id) DO NOTHING;

GRANT SELECT ON public.app_settings TO authenticated, anon;
GRANT UPDATE ON public.app_settings TO authenticated;
GRANT ALL ON public.app_settings TO service_role;
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "app_settings readable" ON public.app_settings FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "app_settings admin update" ON public.app_settings FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- 3. Per-section enable switch ----------------------------------------------
ALTER TABLE public.section_limits ADD COLUMN IF NOT EXISTS enabled boolean NOT NULL DEFAULT true;
GRANT UPDATE ON public.section_limits TO authenticated;
CREATE POLICY "section_limits admin update" ON public.section_limits FOR UPDATE TO authenticated
  USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

-- 4. Audit log ---------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.settings_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  changed_by uuid,
  changed_by_email text,
  scope text NOT NULL,
  field text NOT NULL,
  old_value text,
  new_value text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.settings_audit_log TO authenticated;
GRANT ALL ON public.settings_audit_log TO service_role;
ALTER TABLE public.settings_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_audit_log admin read" ON public.settings_audit_log FOR SELECT TO authenticated
  USING (public.is_admin(auth.uid()));

-- 5. Limits honour the switches ---------------------------------------------
CREATE OR REPLACE FUNCTION public.limits_enabled()
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT coalesce((SELECT limits_enabled FROM public.app_settings WHERE id = 'global'), true)
$$;

CREATE OR REPLACE FUNCTION public.plan_multiplier(_user_id uuid)
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT CASE
    WHEN public.is_pro_subscriber(_user_id)
      THEN coalesce((SELECT pro_multiplier FROM public.app_settings WHERE id = 'global'), 4)
    ELSE 1 END
$$;

-- 1e9 = "no practical cap" so every existing enforcement point stays untouched.
CREATE OR REPLACE FUNCTION public.get_daily_limit(p_user_id uuid, p_section_key text)
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT CASE
    WHEN NOT public.limits_enabled() THEN 1000000000
    WHEN NOT sl.enabled THEN 1000000000
    ELSE sl.free_limit * public.plan_multiplier(p_user_id)
  END
  FROM public.section_limits sl
  WHERE sl.section_key = p_section_key
$$;

CREATE OR REPLACE FUNCTION public.get_monthly_limit(p_user_id uuid, p_section_key text)
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT CASE
    WHEN NOT public.limits_enabled() THEN 1000000000
    WHEN NOT sl.enabled THEN 1000000000
    ELSE sl.free_monthly_limit * public.plan_multiplier(p_user_id)
  END
  FROM public.section_limits sl
  WHERE sl.section_key = p_section_key
$$;

CREATE OR REPLACE FUNCTION public.get_section_usage(_user_id uuid, _section_key text, _local_day_key text)
RETURNS TABLE(section_key text, label text, free_limit integer, day_limit integer, day_used integer, month_limit integer, month_used integer, is_pro boolean, unlimited boolean)
LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $function$
DECLARE
  _row public.section_limits%ROWTYPE;
  _pro BOOLEAN := public.is_pro_subscriber(_user_id);
  _unl BOOLEAN := public.is_unlimited_test_user(_user_id);
  _on BOOLEAN := public.limits_enabled();
  _mult INTEGER := public.plan_multiplier(_user_id);
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
    (_unl OR NOT _on OR NOT _row.enabled);
END;
$function$;

-- 6. Last-N-days usage history (real rows only, no synthetic data) -----------
CREATE OR REPLACE FUNCTION public.get_usage_history(_user_id uuid, _days integer DEFAULT 7)
RETURNS TABLE(day_key text, section_key text, used integer)
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  WITH span AS (SELECT to_char(d::date, 'YYYY-MM-DD') AS k
                FROM generate_series(now()::date - (greatest(_days,1) - 1), now()::date, interval '1 day') d)
  SELECT k, 'practice'::text, count(*)::int
    FROM span JOIN public.practice_attempts p
      ON p.local_day_key = span.k AND p.user_id = _user_id AND p.first_recording_at IS NOT NULL
   GROUP BY k
  UNION ALL
  SELECT k, 'interview'::text, count(*)::int
    FROM span JOIN public.interview_attempts i
      ON i.local_day_key = span.k AND i.user_id = _user_id AND i.first_recording_at IS NOT NULL
   GROUP BY k
  UNION ALL
  SELECT k, 'ai_coach'::text, a.used
    FROM span JOIN public.ai_coach_usage a
      ON a.period_key = span.k AND a.period_type = 'day' AND a.user_id = _user_id
  UNION ALL
  SELECT k,
         CASE WHEN u.endpoint = 'final-audio-coach' THEN 'final_coach' ELSE 'coach_retake' END,
         sum(u.request_count)::int
    FROM span JOIN public.ai_usage_limits u
      ON to_char(u.window_start, 'YYYY-MM-DD') = span.k AND u.user_id = _user_id
   WHERE u.endpoint IN ('final-audio-coach', 'final-audio-coach-retake')
   GROUP BY k, u.endpoint
$$;

-- 7. Seed the owner account as admin ----------------------------------------
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role FROM auth.users WHERE lower(email) = 'english4callcenters@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;