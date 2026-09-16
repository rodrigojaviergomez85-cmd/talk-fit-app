REVOKE EXECUTE ON FUNCTION public.league_award(text, text, int, text, int) FROM anon;
REVOKE EXECUTE ON FUNCTION public.league_ensure_membership(text, int) FROM anon;
REVOKE EXECUTE ON FUNCTION public.league_my_summary(text, int) FROM anon;
REVOKE EXECUTE ON FUNCTION public.league_board(uuid, int, int) FROM anon;
REVOKE EXECUTE ON FUNCTION public.league_board_preview(uuid) FROM anon;
REVOKE EXECUTE ON FUNCTION public.league_set_hidden(boolean) FROM anon;
REVOKE EXECUTE ON FUNCTION public.league_week_start(timestamptz) FROM anon;
REVOKE ALL ON FUNCTION public.league_is_excluded(uuid) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.league_is_excluded(uuid) TO service_role;