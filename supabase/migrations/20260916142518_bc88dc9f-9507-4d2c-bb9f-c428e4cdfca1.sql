CREATE OR REPLACE FUNCTION public.league_award(_activity_type text, _module_id text, _day integer, _activity_key text, _min_scene_index integer DEFAULT 0)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  uid uuid := auth.uid();
  m public.league_memberships%ROWTYPE;
  c public.league_competitions%ROWTYPE;
  window_start timestamptz;
  window_end timestamptz;
  done_at timestamptz;
  first_day int;
  last_day int;
  inserted int := 0;
BEGIN
  IF uid IS NULL THEN RETURN jsonb_build_object('status', 'unauthenticated'); END IF;
  IF _activity_type NOT IN ('story', 'practice') THEN RETURN jsonb_build_object('status', 'invalid'); END IF;

  SELECT * INTO m FROM public.league_memberships WHERE user_id = uid AND week_start = public.league_week_start();
  IF m.id IS NULL THEN RETURN jsonb_build_object('status', 'not_enrolled'); END IF;
  SELECT * INTO c FROM public.league_competitions WHERE id = m.competition_id;
  IF c.closed THEN RETURN jsonb_build_object('status', 'closed'); END IF;

  IF m.module_id <> _module_id THEN RETURN jsonb_build_object('status', 'other_module'); END IF;
  first_day := (m.curriculum_week - 1) * 5 + 1;
  last_day := m.curriculum_week * 5;
  IF _day < first_day OR _day > last_day THEN RETURN jsonb_build_object('status', 'out_of_week'); END IF;

  window_start := GREATEST(
    (c.week_start::timestamp AT TIME ZONE 'America/El_Salvador'),
    (SELECT launched_at FROM public.league_settings WHERE id = 'global')
  );
  window_end := ((c.week_end + 1)::timestamp AT TIME ZONE 'America/El_Salvador');

  -- Earliest VALID completion inside the competition window (catch-up friendly,
  -- and never pays for work finished before the league launched).
  IF _activity_type = 'practice' THEN
    SELECT min(completed_at) INTO done_at FROM public.practice_attempts
     WHERE user_id = uid AND module_id = _module_id AND day = _day
       AND completed_at >= window_start AND completed_at < window_end;
    IF done_at IS NULL THEN
      SELECT min(completed_at) INTO done_at FROM public.day_progress
       WHERE user_id = uid AND module_id = _module_id AND day = _day
         AND completed_at >= window_start AND completed_at < window_end;
    END IF;
  ELSE
    SELECT completed_at INTO done_at FROM public.story_episode_views
     WHERE user_id = uid AND episode_id = _activity_key
       AND completed_at IS NOT NULL AND max_scene_index >= _min_scene_index
       AND completed_at >= window_start AND completed_at < window_end;
  END IF;

  IF done_at IS NULL THEN RETURN jsonb_build_object('status', 'not_completed'); END IF;

  INSERT INTO public.league_rewards (user_id, competition_id, activity_type, module_id, day, activity_key, points, completed_at)
  VALUES (uid, m.competition_id, _activity_type, _module_id, _day, _activity_key, 150, done_at)
  ON CONFLICT (user_id, activity_type, module_id, day) DO NOTHING;
  GET DIAGNOSTICS inserted = ROW_COUNT;

  IF inserted = 1 THEN
    UPDATE public.league_memberships
       SET points = (SELECT COALESCE(sum(points), 0) FROM public.league_rewards
                      WHERE user_id = uid AND competition_id = m.competition_id),
           updated_at = now()
     WHERE id = m.id;
    RETURN jsonb_build_object('status', 'awarded', 'points', 150);
  END IF;

  RETURN jsonb_build_object('status', 'already_awarded', 'points', 0);
END;
$$;

REVOKE ALL ON FUNCTION public.league_award(text, text, integer, text, integer) FROM public, anon;
GRANT EXECUTE ON FUNCTION public.league_award(text, text, integer, text, integer) TO authenticated, service_role;