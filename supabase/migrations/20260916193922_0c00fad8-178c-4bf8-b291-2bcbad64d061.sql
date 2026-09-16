REVOKE ALL ON FUNCTION public.league_can_observe(uuid) FROM anon;
REVOKE ALL ON FUNCTION public.league_summary_for_cohort(text, integer) FROM anon;
GRANT EXECUTE ON FUNCTION public.league_can_observe(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.league_summary_for_cohort(text, integer) TO authenticated;