CREATE OR REPLACE FUNCTION public.league_board_preview(_competition_id uuid)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
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
                 'avatar', p.avatar_id,
                 'photo', CASE WHEN p.avatar_status = 'approved' THEN p.avatar_photo_path ELSE NULL END,
                 'name', COALESCE(NULLIF(split_part(COALESCE(p.display_name, ''), ' ', 1), ''), 'Estudiante')
               ) ORDER BY k.pos)
          FROM picked k LEFT JOIN public.profiles p ON p.id = k.user_id
      ), '[]'::jsonb)
    )
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.league_board(_competition_id uuid, _offset integer DEFAULT 0, _limit integer DEFAULT 25)
RETURNS jsonb LANGUAGE plpgsql STABLE SECURITY DEFINER SET search_path = public AS $$
DECLARE
  uid uuid := auth.uid();
  lim int := LEAST(GREATEST(COALESCE(_limit, 25), 1), 100);
  off int := GREATEST(COALESCE(_offset, 0), 0);
  total int;
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
$$;