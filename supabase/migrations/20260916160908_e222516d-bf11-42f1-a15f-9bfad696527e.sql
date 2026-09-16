-- Bulk enrollment for an enabled pilot cohort: everyone with real progress in that module/week.
CREATE OR REPLACE FUNCTION public.league_backfill_cohort(_module_id text, _curriculum_week int)
RETURNS int LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  ws date := public.league_week_start();
  comp_id uuid;
  first_day int := (_curriculum_week - 1) * 5 + 1;
  last_day int := _curriculum_week * 5;
  inserted int := 0;
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.league_pilot_cohorts
                  WHERE module_id = _module_id AND curriculum_week = _curriculum_week AND enabled) THEN
    RETURN 0;
  END IF;

  INSERT INTO public.league_competitions (week_start, week_end, module_id, curriculum_week)
  VALUES (ws, ws + 6, _module_id, _curriculum_week::smallint)
  ON CONFLICT (week_start, module_id, curriculum_week) DO UPDATE SET updated_at = now()
  RETURNING id INTO comp_id;

  WITH candidates AS (
    SELECT DISTINCT dp.user_id
      FROM public.day_progress dp
     WHERE dp.module_id = _module_id
       AND dp.day BETWEEN first_day AND last_day
    UNION
    SELECT DISTINCT pa.user_id
      FROM public.practice_attempts pa
     WHERE pa.module_id = _module_id
       AND pa.day BETWEEN first_day AND last_day
  ), eligible AS (
    SELECT c.user_id FROM candidates c
     WHERE NOT public.league_is_excluded(c.user_id)
       AND NOT EXISTS (SELECT 1 FROM public.league_memberships m
                        WHERE m.user_id = c.user_id AND m.week_start = ws)
  )
  INSERT INTO public.league_memberships (competition_id, user_id, week_start, module_id, curriculum_week)
  SELECT comp_id, e.user_id, ws, _module_id, _curriculum_week::smallint FROM eligible e
  ON CONFLICT (user_id, week_start) DO NOTHING;

  GET DIAGNOSTICS inserted = ROW_COUNT;
  RETURN inserted;
END;
$$;

REVOKE ALL ON FUNCTION public.league_backfill_cohort(text, int) FROM public;
REVOKE ALL ON FUNCTION public.league_backfill_cohort(text, int) FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.league_backfill_cohort(text, int) TO service_role;

-- Observer payload: excluded accounts (admins / unlimited) see the real participant count.
CREATE OR REPLACE FUNCTION public.league_my_summary(_module_id text, _curriculum_week int)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  comp_id uuid;
  c public.league_competitions%ROWTYPE;
  my_points int;
  my_hidden boolean;
  my_rank int;
  participants int;
BEGIN
  IF uid IS NULL THEN RETURN jsonb_build_object('enrolled', false); END IF;
  comp_id := public.league_ensure_membership(_module_id, _curriculum_week);

  IF comp_id IS NULL THEN
    IF public.league_is_excluded(uid)
       AND EXISTS (SELECT 1 FROM public.league_pilot_cohorts
                    WHERE module_id = _module_id AND curriculum_week = _curriculum_week AND enabled) THEN
      SELECT * INTO c FROM public.league_competitions
       WHERE week_start = public.league_week_start()
         AND module_id = _module_id AND curriculum_week = _curriculum_week;
      IF c.id IS NULL THEN RETURN jsonb_build_object('enrolled', false, 'observer', true, 'participants', 0); END IF;
      SELECT count(*) INTO participants FROM public.league_memberships WHERE competition_id = c.id;
      RETURN jsonb_build_object(
        'enrolled', false,
        'observer', true,
        'competitionId', c.id,
        'moduleId', c.module_id,
        'curriculumWeek', c.curriculum_week,
        'weekStart', c.week_start,
        'weekEnd', c.week_end,
        'closed', c.closed,
        'points', 0,
        'hidden', false,
        'rank', NULL,
        'participants', participants,
        'rewards', '[]'::jsonb
      );
    END IF;
    RETURN jsonb_build_object('enrolled', false);
  END IF;

  SELECT * INTO c FROM public.league_competitions WHERE id = comp_id;
  SELECT points, hidden INTO my_points, my_hidden FROM public.league_memberships
   WHERE competition_id = comp_id AND user_id = uid;
  SELECT count(*) INTO participants FROM public.league_memberships WHERE competition_id = comp_id;
  SELECT rnk INTO my_rank FROM (
    SELECT user_id, dense_rank() OVER (ORDER BY points DESC) AS rnk
      FROM public.league_memberships WHERE competition_id = comp_id
  ) r WHERE r.user_id = uid;

  RETURN jsonb_build_object(
    'enrolled', true,
    'observer', false,
    'competitionId', comp_id,
    'moduleId', c.module_id,
    'curriculumWeek', c.curriculum_week,
    'weekStart', c.week_start,
    'weekEnd', c.week_end,
    'closed', c.closed,
    'points', COALESCE(my_points, 0),
    'hidden', COALESCE(my_hidden, false),
    'rank', my_rank,
    'participants', participants,
    'rewards', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('activityType', activity_type, 'day', day, 'points', points)
                       ORDER BY day, activity_type)
        FROM public.league_rewards WHERE user_id = uid AND competition_id = comp_id
    ), '[]'::jsonb)
  );
END;
$$;

-- Populate the currently enabled pilot cohorts for this week.
DO $$
DECLARE r record;
BEGIN
  FOR r IN SELECT module_id, curriculum_week FROM public.league_pilot_cohorts WHERE enabled LOOP
    PERFORM public.league_backfill_cohort(r.module_id, r.curriculum_week);
  END LOOP;
END $$;