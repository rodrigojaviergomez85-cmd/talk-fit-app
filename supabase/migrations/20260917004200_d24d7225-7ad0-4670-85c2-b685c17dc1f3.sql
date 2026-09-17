CREATE OR REPLACE FUNCTION public.league_switch_level(_module_id text, _curriculum_week integer)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  ws date := public.league_week_start();
  comp_id uuid;
BEGIN
  IF uid IS NULL THEN RETURN NULL; END IF;

  -- Leave every OPEN competition of the running week (points of that week are
  -- intentionally dropped); closed weeks stay untouched as history.
  DELETE FROM public.league_rewards r
   USING public.league_competitions c
   WHERE r.competition_id = c.id
     AND r.user_id = uid
     AND c.closed = false
     AND c.week_start = ws
     AND NOT (c.module_id = _module_id AND c.curriculum_week = _curriculum_week::smallint);

  DELETE FROM public.league_memberships m
   USING public.league_competitions c
   WHERE m.competition_id = c.id
     AND m.user_id = uid
     AND c.closed = false
     AND c.week_start = ws
     AND NOT (c.module_id = _module_id AND c.curriculum_week = _curriculum_week::smallint);

  comp_id := public.league_ensure_membership(_module_id, _curriculum_week);
  RETURN comp_id;
END;
$$;

REVOKE ALL ON FUNCTION public.league_switch_level(text, integer) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.league_switch_level(text, integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.league_switch_level(text, integer) TO service_role;