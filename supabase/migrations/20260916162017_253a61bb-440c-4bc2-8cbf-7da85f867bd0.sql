-- Count activity from the start of the competition week, not from the launch moment.
UPDATE public.league_settings
   SET launched_at = ('2026-09-14'::timestamp AT TIME ZONE 'America/El_Salvador'),
       updated_at = now()
 WHERE id = 'global';

-- Retroactive credit for work already completed during this week.
CREATE OR REPLACE FUNCTION public.league_backfill_rewards()
RETURNS int LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  inserted int := 0;
  n int;
BEGIN
  WITH slots(module_id, day, episode_id, min_scene) AS (
    VALUES ('basic-zero', 1, 'vale-first-day', 11),
           ('basic-zero', 2, 'vale-first-call', 10),
           ('basic-zero', 3, 'vale-who-is-he', 11),
           ('basic-zero', 4, 'vale-who-is-d', 10),
           ('basic-zero', 5, 'vale-support-team', 10)
  ), comp AS (
    SELECT c.*, (c.week_start::timestamp AT TIME ZONE 'America/El_Salvador') AS w_start,
           ((c.week_end + 1)::timestamp AT TIME ZONE 'America/El_Salvador') AS w_end
      FROM public.league_competitions c
     WHERE NOT c.closed
  ), story_rows AS (
    SELECT m.user_id, m.competition_id, 'story'::text AS activity_type, m.module_id,
           s.day::smallint AS day, s.episode_id AS activity_key, v.completed_at
      FROM public.league_memberships m
      JOIN comp c ON c.id = m.competition_id
      JOIN slots s ON s.module_id = m.module_id
                  AND s.day BETWEEN (m.curriculum_week - 1) * 5 + 1 AND m.curriculum_week * 5
      JOIN public.story_episode_views v ON v.user_id = m.user_id
                  AND v.episode_id = s.episode_id
                  AND v.completed_at IS NOT NULL
                  AND v.max_scene_index >= s.min_scene
     WHERE v.completed_at >= c.w_start AND v.completed_at < c.w_end
  ), practice_rows AS (
    SELECT m.user_id, m.competition_id, 'practice'::text AS activity_type, m.module_id,
           d.day, (m.module_id || ':day-' || d.day) AS activity_key, d.done_at AS completed_at
      FROM public.league_memberships m
      JOIN comp c ON c.id = m.competition_id
      JOIN LATERAL (
        SELECT gs.day::smallint AS day,
               COALESCE(
                 (SELECT min(pa.completed_at) FROM public.practice_attempts pa
                   WHERE pa.user_id = m.user_id AND pa.module_id = m.module_id
                     AND pa.day = gs.day AND pa.completed_at IS NOT NULL),
                 (SELECT min(dp.completed_at) FROM public.day_progress dp
                   WHERE dp.user_id = m.user_id AND dp.module_id = m.module_id AND dp.day = gs.day)
               ) AS done_at
          FROM generate_series((m.curriculum_week - 1) * 5 + 1, m.curriculum_week * 5) gs(day)
      ) d ON d.done_at IS NOT NULL
     WHERE d.done_at >= c.w_start AND d.done_at < c.w_end
  )
  INSERT INTO public.league_rewards
    (user_id, competition_id, activity_type, module_id, day, activity_key, points, completed_at)
  SELECT user_id, competition_id, activity_type, module_id, day, activity_key, 150, completed_at
    FROM (SELECT * FROM story_rows UNION ALL SELECT * FROM practice_rows) x
  ON CONFLICT (user_id, activity_type, module_id, day) DO NOTHING;

  GET DIAGNOSTICS n = ROW_COUNT;
  inserted := n;

  UPDATE public.league_memberships m
     SET points = COALESCE((SELECT sum(r.points) FROM public.league_rewards r
                             WHERE r.user_id = m.user_id AND r.competition_id = m.competition_id), 0),
         updated_at = now()
   WHERE EXISTS (SELECT 1 FROM public.league_competitions c WHERE c.id = m.competition_id AND NOT c.closed);

  RETURN inserted;
END;
$$;

REVOKE ALL ON FUNCTION public.league_backfill_rewards() FROM public;
REVOKE ALL ON FUNCTION public.league_backfill_rewards() FROM anon, authenticated;
GRANT EXECUTE ON FUNCTION public.league_backfill_rewards() TO service_role;

SELECT public.league_backfill_rewards();