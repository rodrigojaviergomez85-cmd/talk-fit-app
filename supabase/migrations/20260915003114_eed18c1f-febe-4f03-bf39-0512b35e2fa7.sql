REVOKE ALL ON FUNCTION public.prune_ai_call_log(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.prune_ai_call_log(integer) TO service_role;