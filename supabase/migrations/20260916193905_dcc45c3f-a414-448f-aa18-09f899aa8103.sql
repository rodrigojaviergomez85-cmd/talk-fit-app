CREATE OR REPLACE FUNCTION public.league_can_observe(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
  SELECT public.is_unlimited_test_user(_user_id) OR public.has_role(_user_id, 'admin'::app_role)
$function$;

REVOKE ALL ON FUNCTION public.league_can_observe(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.league_can_observe(uuid) TO authenticated;

CREATE OR REPLACE FUNCTION public.league_summary_for_cohort(_module_id text, _curriculum_week integer)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  uid uuid := auth.uid();
  c public.league_competitions%ROWTYPE;
  my_points int;
  my_hidden boolean;
  my_rank int;
  participants int;
BEGIN
  IF uid IS NULL THEN RETURN jsonb_build_object('enrolled', false); END IF;

  SELECT * INTO c FROM public.league_competitions
   WHERE week_start = public.league_week_start()
     AND module_id = _module_id
     AND curriculum_week = _curriculum_week;
  IF c.id IS NULL THEN RETURN jsonb_build_object('enrolled', false); END IF;

  SELECT count(*) INTO participants FROM public.league_memberships WHERE competition_id = c.id;
  SELECT points, hidden INTO my_points, my_hidden FROM public.league_memberships
   WHERE competition_id = c.id AND user_id = uid;

  IF my_points IS NULL THEN
    IF NOT public.league_can_observe(uid) THEN RETURN jsonb_build_object('enrolled', false); END IF;
    RETURN jsonb_build_object(
      'enrolled', false, 'observer', true,
      'competitionId', c.id, 'moduleId', c.module_id, 'curriculumWeek', c.curriculum_week,
      'weekStart', c.week_start, 'weekEnd', c.week_end, 'closed', c.closed,
      'points', 0, 'hidden', false, 'rank', NULL, 'participants', participants,
      'rewards', '[]'::jsonb
    );
  END IF;

  SELECT rnk INTO my_rank FROM (
    SELECT user_id, dense_rank() OVER (ORDER BY points DESC) AS rnk
      FROM public.league_memberships WHERE competition_id = c.id
  ) r WHERE r.user_id = uid;

  RETURN jsonb_build_object(
    'enrolled', true, 'observer', false,
    'competitionId', c.id, 'moduleId', c.module_id, 'curriculumWeek', c.curriculum_week,
    'weekStart', c.week_start, 'weekEnd', c.week_end, 'closed', c.closed,
    'points', COALESCE(my_points, 0), 'hidden', COALESCE(my_hidden, false),
    'rank', my_rank, 'participants', participants,
    'rewards', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('activityType', activity_type, 'day', day, 'points', points)
                       ORDER BY day, activity_type)
        FROM public.league_rewards WHERE user_id = uid AND competition_id = c.id
    ), '[]'::jsonb)
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.league_board_preview(_competition_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  uid uuid := auth.uid();
  is_member boolean;
BEGIN
  IF uid IS NULL THEN RETURN jsonb_build_object('rows', '[]'::jsonb); END IF;
  is_member := EXISTS (SELECT 1 FROM public.league_memberships WHERE competition_id = _competition_id AND user_id = uid);
  IF NOT is_member AND NOT public.league_can_observe(uid) THEN
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
      SELECT v.* FROM visible v
       WHERE v.pos < 3
          OR EXISTS (SELECT 1 FROM me WHERE v.pos >= me.pos - 1 AND v.pos <= me.pos + 1)
    )
    SELECT jsonb_build_object(
      'myPosition', (SELECT pos FROM me),
      'rows', COALESCE((
        SELECT jsonb_agg(jsonb_build_object(
                 'rank', k.rnk, 'points', k.points, 'isMe', k.user_id = uid,
                 'avatar', p.avatar_id,
                 'photo', CASE WHEN p.avatar_status = 'approved' THEN p.avatar_photo_path ELSE NULL END,
                 'name', COALESCE(NULLIF(split_part(COALESCE(p.display_name, ''), ' ', 1), ''), 'Estudiante')
               ) ORDER BY k.pos)
          FROM picked k LEFT JOIN public.profiles p ON p.id = k.user_id
      ), '[]'::jsonb)
    )
  );
END;
$function$;

CREATE OR REPLACE FUNCTION public.league_board(_competition_id uuid, _offset integer DEFAULT 0, _limit integer DEFAULT 25)
RETURNS jsonb
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  uid uuid := auth.uid();
  lim int := LEAST(GREATEST(COALESCE(_limit, 25), 1), 100);
  off int := GREATEST(COALESCE(_offset, 0), 0);
  total int;
  is_member boolean;
BEGIN
  IF uid IS NULL THEN RETURN jsonb_build_object('rows', '[]'::jsonb); END IF;
  is_member := EXISTS (SELECT 1 FROM public.league_memberships WHERE competition_id = _competition_id AND user_id = uid);
  IF NOT is_member AND NOT public.league_can_observe(uid) THEN
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
      'offset', off, 'limit', lim,
      'rows', COALESCE((
        SELECT jsonb_agg(jsonb_build_object(
                 'rank', v.rnk, 'points', v.points, 'isMe', v.user_id = uid,
                 'avatar', p.avatar_id,
                 'photo', CASE WHEN p.avatar_status = 'approved' THEN p.avatar_photo_path ELSE NULL END,
                 'name', COALESCE(NULLIF(split_part(COALESCE(p.display_name, ''), ' ', 1), ''), 'Estudiante')
               ) ORDER BY v.pos)
          FROM visible v LEFT JOIN public.profiles p ON p.id = v.user_id
         WHERE v.pos >= off AND v.pos < off + lim
      ), '[]'::jsonb)
    )
  );
END;
$function$;