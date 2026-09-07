REVOKE ALL ON FUNCTION public.enforce_daily_completion_cap() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.enforce_daily_completion_cap() FROM anon;
REVOKE ALL ON FUNCTION public.enforce_daily_completion_cap() FROM authenticated;
REVOKE ALL ON FUNCTION public.is_unlimited_test_user(UUID) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_unlimited_test_user(UUID) FROM anon;
REVOKE ALL ON FUNCTION public.is_unlimited_test_user(UUID) FROM authenticated;