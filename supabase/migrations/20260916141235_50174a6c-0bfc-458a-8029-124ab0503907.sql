-- ============ Liga semanal ============

CREATE TABLE public.league_settings (
  id text PRIMARY KEY DEFAULT 'global',
  launched_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.league_settings TO authenticated;
GRANT ALL ON public.league_settings TO service_role;
ALTER TABLE public.league_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "league_settings readable" ON public.league_settings FOR SELECT TO authenticated USING (true);
INSERT INTO public.league_settings (id) VALUES ('global');

CREATE TABLE public.league_pilot_cohorts (
  module_id text NOT NULL,
  curriculum_week smallint NOT NULL,
  enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (module_id, curriculum_week)
);
GRANT SELECT ON public.league_pilot_cohorts TO authenticated;
GRANT ALL ON public.league_pilot_cohorts TO service_role;
ALTER TABLE public.league_pilot_cohorts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "league cohorts readable" ON public.league_pilot_cohorts FOR SELECT TO authenticated USING (true);
INSERT INTO public.league_pilot_cohorts (module_id, curriculum_week) VALUES ('basic-zero', 1);

CREATE TABLE public.league_competitions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week_start date NOT NULL,
  week_end date NOT NULL,
  module_id text NOT NULL,
  curriculum_week smallint NOT NULL,
  closed boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (week_start, module_id, curriculum_week)
);
GRANT SELECT ON public.league_competitions TO authenticated;
GRANT ALL ON public.league_competitions TO service_role;
ALTER TABLE public.league_competitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "league competitions readable" ON public.league_competitions FOR SELECT TO authenticated USING (true);

CREATE TABLE public.league_memberships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_id uuid NOT NULL REFERENCES public.league_competitions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  week_start date NOT NULL,
  module_id text NOT NULL,
  curriculum_week smallint NOT NULL,
  points integer NOT NULL DEFAULT 0,
  hidden boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (competition_id, user_id),
  UNIQUE (user_id, week_start)
);
GRANT SELECT ON public.league_memberships TO authenticated;
GRANT ALL ON public.league_memberships TO service_role;
ALTER TABLE public.league_memberships ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own membership readable" ON public.league_memberships FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE INDEX league_memberships_board_idx ON public.league_memberships (competition_id, points DESC, user_id);

CREATE TABLE public.league_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  competition_id uuid NOT NULL REFERENCES public.league_competitions(id) ON DELETE CASCADE,
  activity_type text NOT NULL CHECK (activity_type IN ('story', 'practice')),
  module_id text NOT NULL,
  day smallint NOT NULL,
  activity_key text NOT NULL,
  points integer NOT NULL,
  completed_at timestamptz NOT NULL,
  awarded_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, activity_type, module_id, day)
);
GRANT SELECT ON public.league_rewards TO authenticated;
GRANT ALL ON public.league_rewards TO service_role;
ALTER TABLE public.league_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own rewards readable" ON public.league_rewards FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE INDEX league_rewards_competition_idx ON public.league_rewards (competition_id, user_id);

-- Monday of the competition week, in the institutional timezone.
CREATE OR REPLACE FUNCTION public.league_week_start(_ts timestamptz DEFAULT now())
RETURNS date LANGUAGE sql STABLE SET search_path = public AS $$
  SELECT (date_trunc('week', (_ts AT TIME ZONE 'America/El_Salvador')))::date
$$;

-- Accounts that never compete (admins and internal unlimited accounts).
CREATE OR REPLACE FUNCTION public.league_is_excluded(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.is_unlimited_test_user(_user_id) OR public.has_role(_user_id, 'admin'::app_role)
$$;

-- Fixes the learner's competitive assignment for the current calendar week.
CREATE OR REPLACE FUNCTION public.league_ensure_membership(_module_id text, _curriculum_week int)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  ws date := public.league_week_start();
  comp_id uuid;
BEGIN
  IF uid IS NULL THEN RETURN NULL; END IF;
  IF public.league_is_excluded(uid) THEN RETURN NULL; END IF;

  SELECT competition_id INTO comp_id FROM public.league_memberships
   WHERE user_id = uid AND week_start = ws;
  IF comp_id IS NOT NULL THEN RETURN comp_id; END IF;

  IF NOT EXISTS (SELECT 1 FROM public.league_pilot_cohorts
                  WHERE module_id = _module_id AND curriculum_week = _curriculum_week AND enabled) THEN
    RETURN NULL;
  END IF;

  INSERT INTO public.league_competitions (week_start, week_end, module_id, curriculum_week)
  VALUES (ws, ws + 6, _module_id, _curriculum_week::smallint)
  ON CONFLICT (week_start, module_id, curriculum_week) DO UPDATE SET updated_at = now()
  RETURNING id INTO comp_id;

  INSERT INTO public.league_memberships (competition_id, user_id, week_start, module_id, curriculum_week)
  VALUES (comp_id, uid, ws, _module_id, _curriculum_week::smallint)
  ON CONFLICT (user_id, week_start) DO NOTHING;

  SELECT competition_id INTO comp_id FROM public.league_memberships
   WHERE user_id = uid AND week_start = ws;
  RETURN comp_id;
END;
$$;

-- Grants the 150 points of one activity, once, after verifying real completion.
CREATE OR REPLACE FUNCTION public.league_award(
  _activity_type text, _module_id text, _day int, _activity_key text, _min_scene_index int DEFAULT 0
) RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
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

  IF _activity_type = 'practice' THEN
    SELECT min(completed_at) INTO done_at FROM public.practice_attempts
     WHERE user_id = uid AND module_id = _module_id AND day = _day AND completed_at IS NOT NULL;
    IF done_at IS NULL THEN
      SELECT min(completed_at) INTO done_at FROM public.day_progress
       WHERE user_id = uid AND module_id = _module_id AND day = _day;
    END IF;
  ELSE
    SELECT completed_at INTO done_at FROM public.story_episode_views
     WHERE user_id = uid AND episode_id = _activity_key
       AND completed_at IS NOT NULL AND max_scene_index >= _min_scene_index;
  END IF;

  IF done_at IS NULL THEN RETURN jsonb_build_object('status', 'not_completed'); END IF;
  IF done_at < window_start OR done_at >= window_end THEN RETURN jsonb_build_object('status', 'outside_window'); END IF;

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

-- Learner's own card: assignment, points, rank and the week's rewards.
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
  IF comp_id IS NULL THEN RETURN jsonb_build_object('enrolled', false); END IF;

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

-- Public board page: rank, public name and points only. 25 rows per page.
CREATE OR REPLACE FUNCTION public.league_board(_competition_id uuid, _offset int DEFAULT 0, _limit int DEFAULT 25)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  lim int := LEAST(GREATEST(COALESCE(_limit, 25), 1), 100);
  off int := GREATEST(COALESCE(_offset, 0), 0);
  total int;
  listed int;
  my_row int;
BEGIN
  IF uid IS NULL THEN RETURN jsonb_build_object('rows', '[]'::jsonb); END IF;
  IF NOT EXISTS (SELECT 1 FROM public.league_memberships WHERE competition_id = _competition_id AND user_id = uid) THEN
    RETURN jsonb_build_object('rows', '[]'::jsonb, 'total', 0, 'listed', 0);
  END IF;

  SELECT count(*) INTO total FROM public.league_memberships WHERE competition_id = _competition_id;

  RETURN (
    WITH ranked AS (
      SELECT m.user_id, m.points, m.hidden,
             dense_rank() OVER (ORDER BY m.points DESC) AS rnk,
             row_number() OVER (ORDER BY m.points DESC, m.user_id) AS seq
        FROM public.league_memberships m
       WHERE m.competition_id = _competition_id
    ), visible AS (
      SELECT *, row_number() OVER (ORDER BY seq) - 1 AS pos
        FROM ranked WHERE NOT hidden OR user_id = uid
    )
    SELECT jsonb_build_object(
      'total', total,
      'listed', (SELECT count(*) FROM visible),
      'myPosition', (SELECT pos FROM visible WHERE user_id = uid),
      'offset', off,
      'limit', lim,
      'rows', COALESCE((
        SELECT jsonb_agg(jsonb_build_object(
                 'rank', v.rnk,
                 'points', v.points,
                 'isMe', v.user_id = uid,
                 'name', COALESCE(NULLIF(split_part(COALESCE(p.display_name, ''), ' ', 1), ''), 'Estudiante')
               ) ORDER BY v.pos)
          FROM visible v LEFT JOIN public.profiles p ON p.id = v.user_id
         WHERE v.pos >= off AND v.pos < off + lim
      ), '[]'::jsonb)
    )
  );
END;
$$;

-- Top 3 plus the learner and immediate neighbours, without duplicates.
CREATE OR REPLACE FUNCTION public.league_board_preview(_competition_id uuid)
RETURNS jsonb LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  my_pos int;
BEGIN
  IF uid IS NULL THEN RETURN jsonb_build_object('rows', '[]'::jsonb); END IF;
  IF NOT EXISTS (SELECT 1 FROM public.league_memberships WHERE competition_id = _competition_id AND user_id = uid) THEN
    RETURN jsonb_build_object('rows', '[]'::jsonb);
  END IF;

  RETURN (
    WITH ranked AS (
      SELECT m.user_id, m.points, m.hidden,
             dense_rank() OVER (ORDER BY m.points DESC) AS rnk,
             row_number() OVER (ORDER BY m.points DESC, m.user_id) AS seq
        FROM public.league_memberships m
       WHERE m.competition_id = _competition_id
    ), visible AS (
      SELECT *, row_number() OVER (ORDER BY seq) - 1 AS pos
        FROM ranked WHERE NOT hidden OR user_id = uid
    ), me AS (
      SELECT pos FROM visible WHERE user_id = uid
    ), picked AS (
      SELECT v.* FROM visible v, me
       WHERE v.pos < 3 OR (v.pos >= me.pos - 1 AND v.pos <= me.pos + 1)
    )
    SELECT jsonb_build_object(
      'myPosition', (SELECT pos FROM me),
      'rows', COALESCE((
        SELECT jsonb_agg(jsonb_build_object(
                 'rank', k.rnk,
                 'points', k.points,
                 'isMe', k.user_id = uid,
                 'name', COALESCE(NULLIF(split_part(COALESCE(p.display_name, ''), ' ', 1), ''), 'Estudiante')
               ) ORDER BY k.pos)
          FROM picked k LEFT JOIN public.profiles p ON p.id = k.user_id
      ), '[]'::jsonb)
    )
  );
END;
$$;

-- The only way a learner changes their own row: hide/show in the public board.
CREATE OR REPLACE FUNCTION public.league_set_hidden(_hidden boolean)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN RETURN false; END IF;
  UPDATE public.league_memberships SET hidden = COALESCE(_hidden, false), updated_at = now()
   WHERE user_id = uid AND week_start = public.league_week_start();
  RETURN true;
END;
$$;

REVOKE ALL ON FUNCTION public.league_award(text, text, int, text, int) FROM public;
REVOKE ALL ON FUNCTION public.league_ensure_membership(text, int) FROM public;
REVOKE ALL ON FUNCTION public.league_my_summary(text, int) FROM public;
REVOKE ALL ON FUNCTION public.league_board(uuid, int, int) FROM public;
REVOKE ALL ON FUNCTION public.league_board_preview(uuid) FROM public;
REVOKE ALL ON FUNCTION public.league_set_hidden(boolean) FROM public;
GRANT EXECUTE ON FUNCTION public.league_award(text, text, int, text, int) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.league_ensure_membership(text, int) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.league_my_summary(text, int) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.league_board(uuid, int, int) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.league_board_preview(uuid) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.league_set_hidden(boolean) TO authenticated, service_role;
GRANT EXECUTE ON FUNCTION public.league_week_start(timestamptz) TO authenticated, service_role;