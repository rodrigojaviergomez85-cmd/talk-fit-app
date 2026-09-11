REVOKE ALL ON FUNCTION public.is_pro_subscriber(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.plan_multiplier(uuid) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_daily_limit(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_monthly_limit(uuid, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_section_usage(uuid, text, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_ai_coach_quota(uuid) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.is_pro_subscriber(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.plan_multiplier(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_daily_limit(uuid, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_monthly_limit(uuid, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_section_usage(uuid, text, text) TO service_role;
GRANT EXECUTE ON FUNCTION public.get_ai_coach_quota(uuid) TO service_role;