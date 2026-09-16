CREATE OR REPLACE FUNCTION public.league_my_competitions()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  uid uuid := auth.uid();
  result jsonb;
BEGIN
  IF uid IS NULL THEN RETURN '[]'::jsonb; END IF;

  SELECT COALESCE(jsonb_agg(row_to_json(x)::jsonb ORDER BY x.week_start DESC), '[]'::jsonb)
    INTO result
  FROM (
    SELECT
      c.id            AS "competitionId",
      c.module_id     AS "moduleId",
      c.curriculum_week AS "curriculumWeek",
      c.week_start    AS "weekStart",
      c.week_end      AS "weekEnd",
      c.closed        AS closed,
      (c.week_start = public.league_week_start()) AS "isCurrent",
      m.points        AS points,
      (SELECT count(*) FROM public.league_memberships mm WHERE mm.competition_id = c.id) AS participants,
      (SELECT rnk FROM (
         SELECT user_id, dense_rank() OVER (ORDER BY points DESC) AS rnk
           FROM public.league_memberships WHERE competition_id = c.id
       ) r WHERE r.user_id = uid) AS rank,
      c.week_start AS week_start
    FROM public.league_memberships m
    JOIN public.league_competitions c ON c.id = m.competition_id
    WHERE m.user_id = uid
  ) x;

  RETURN result;
END;
$function$;

CREATE OR REPLACE FUNCTION public.league_summary_by_competition(_competition_id uuid)
RETURNS jsonb
LANGUAGE plpgsql
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
  is_member boolean;
BEGIN
  IF uid IS NULL THEN RETURN jsonb_build_object('enrolled', false); END IF;

  SELECT * INTO c FROM public.league_competitions WHERE id = _competition_id;
  IF c.id IS NULL THEN RETURN jsonb_build_object('enrolled', false); END IF;

  SELECT points, hidden INTO my_points, my_hidden
    FROM public.league_memberships WHERE competition_id = c.id AND user_id = uid;
  is_member := my_points IS NOT NULL;

  IF NOT is_member AND NOT public.league_is_excluded(uid) THEN
    RETURN jsonb_build_object('enrolled', false);
  END IF;

  SELECT count(*) INTO participants FROM public.league_memberships WHERE competition_id = c.id;

  IF is_member THEN
    SELECT rnk INTO my_rank FROM (
      SELECT user_id, dense_rank() OVER (ORDER BY points DESC) AS rnk
        FROM public.league_memberships WHERE competition_id = c.id
    ) r WHERE r.user_id = uid;
  END IF;

  RETURN jsonb_build_object(
    'enrolled', is_member,
    'observer', NOT is_member,
    'competitionId', c.id,
    'moduleId', c.module_id,
    'curriculumWeek', c.curriculum_week,
    'weekStart', c.week_start,
    'weekEnd', c.week_end,
    'closed', c.closed OR (c.week_start <> public.league_week_start()),
    'points', COALESCE(my_points, 0),
    'hidden', COALESCE(my_hidden, false),
    'rank', my_rank,
    'participants', participants,
    'rewards', COALESCE((
      SELECT jsonb_agg(jsonb_build_object('activityType', activity_type, 'day', day, 'points', points)
                       ORDER BY day, activity_type)
        FROM public.league_rewards WHERE user_id = uid AND competition_id = c.id
    ), '[]'::jsonb)
  );
END;
$function$;

GRANT EXECUTE ON FUNCTION public.league_my_competitions() TO authenticated;
GRANT EXECUTE ON FUNCTION public.league_summary_by_competition(uuid) TO authenticated;