CREATE TABLE IF NOT EXISTS public.league_story_slots (
  module_id text NOT NULL,
  day smallint NOT NULL,
  episode_id text NOT NULL,
  min_scene_index smallint NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (module_id, day)
);

GRANT ALL ON public.league_story_slots TO service_role;
ALTER TABLE public.league_story_slots ENABLE ROW LEVEL SECURITY;

INSERT INTO public.league_story_slots (module_id, day, episode_id, min_scene_index) VALUES
  ('basic-zero', 1, 'vale-first-day', 11),
  ('basic-zero', 2, 'vale-first-call', 10),
  ('basic-zero', 3, 'vale-who-is-he', 11),
  ('basic-zero', 4, 'vale-who-is-d', 10),
  ('basic-zero', 5, 'vale-support-team', 10),
  ('basic-zero', 6, 'vale-where-are-you-from', 10),
  ('basic-zero', 7, 'vale-favorite-color', 10),
  ('basic-zero', 8, 'vale-favorite-food', 10),
  ('basic-zero', 9, 'vale-hobbies', 10),
  ('basic-zero', 10, 'vale-complete-introduction', 10),
  ('basic-zero', 11, 'vale-meet-luis', 10),
  ('basic-zero', 12, 'vale-best-friend', 10),
  ('basic-zero', 13, 'vale-new-supervisor', 10),
  ('basic-zero', 14, 'vale-dylan-needs-help', 10),
  ('basic-zero', 15, 'vale-we-are-a-team', 10),
  ('basic-zero', 16, 'vale-luis-big-day', 10),
  ('basic-zero', 17, 'vale-good-news', 10),
  ('basic-zero', 18, 'vale-first-month', 10),
  ('basic-zero', 19, 'vale-celebration', 10),
  ('basic-zero', 20, 'vale-graduation', 10),
  ('simple-future', 1, 'vale-s2-ready', 10),
  ('simple-future', 2, 'vale-s2-tomorrow', 10),
  ('simple-future', 3, 'vale-s2-weekend', 10),
  ('simple-future', 4, 'vale-s2-bigger-dream', 10),
  ('simple-future', 5, 'vale-s2-my-voice', 10),
  ('simple-future', 6, 'vale-s2-mateo-weekend', 10),
  ('simple-future', 7, 'vale-s2-his-mom', 10),
  ('simple-future', 8, 'vale-s2-busiest', 10),
  ('simple-future', 9, 'vale-s2-two-plans', 10),
  ('simple-future', 10, 'vale-s2-their-plans', 10),
  ('simple-future', 11, 'vale-s2-instant-decision', 10),
  ('simple-future', 12, 'vale-s2-promise', 10),
  ('simple-future', 13, 'vale-s2-prediction', 10),
  ('simple-future', 14, 'vale-s2-their-future', 10),
  ('simple-future', 15, 'vale-s2-will-challenge', 10),
  ('simple-future', 16, 'vale-s2-plan-vs-decision', 10),
  ('simple-future', 17, 'vale-s2-weekend-changes', 10),
  ('simple-future', 18, 'vale-s2-camila-future', 10),
  ('simple-future', 19, 'vale-s2-visible-predictions', 10),
  ('simple-future', 20, 'vale-s2-final-fluency', 10),
  ('simple-present', 1, 'vale-s3-new-schedule', 10),
  ('simple-present', 2, 'vale-s3-kats-routine', 10),
  ('simple-present', 3, 'vale-s3-team-rules', 10),
  ('simple-present', 4, 'vale-s3-angry-customer', 10),
  ('simple-present', 5, 'vale-s3-team-challenge', 10),
  ('simple-present', 6, 'vale-s3-moms-routine', 10),
  ('simple-present', 7, 'vale-s3-mateo-trains', 10),
  ('simple-present', 8, 'vale-s3-neighborhood-hero', 10),
  ('simple-present', 9, 'vale-s3-ana-rehearses', 10),
  ('simple-present', 10, 'vale-s3-routine-challenge', 10),
  ('simple-present', 11, 'vale-s3-new-app', 10),
  ('simple-present', 12, 'vale-s3-pizza-day', 10),
  ('simple-present', 13, 'vale-s3-order-food', 10),
  ('simple-present', 14, 'vale-s3-mateos-sandwich', 10),
  ('simple-present', 15, 'vale-s3-process-challenge', 10),
  ('simple-present', 16, 'vale-s3-free-saturday', 10),
  ('simple-present', 17, 'vale-s3-beach-day', 10),
  ('simple-present', 18, 'vale-s3-office-now', 10),
  ('simple-present', 19, 'vale-s3-home-tonight', 10),
  ('simple-present', 20, 'vale-s3-first-class', 10),
  ('past-stories', 1, 'vale-s4-yesterday-morning', 10),
  ('past-stories', 2, 'vale-s4-work-yesterday', 10),
  ('past-stories', 3, 'vale-s4-after-work', 10),
  ('past-stories', 4, 'vale-s4-how-was-your-day', 10),
  ('past-stories', 5, 'vale-s4-yesterday-challenge', 10),
  ('past-stories', 6, 'vale-s4-first-saturday', 12),
  ('past-stories', 7, 'vale-s4-kats-day-off', 12),
  ('past-stories', 8, 'vale-s4-mateo-forgot', 12),
  ('past-stories', 9, 'vale-s4-luis-questions', 12),
  ('past-stories', 10, 'vale-s4-week2-challenge', 12),
  ('past-stories', 11, 'vale-s4-what-was-happening', 12),
  ('past-stories', 12, 'vale-s4-eight-last-night', 12),
  ('past-stories', 13, 'vale-s4-while-teaching', 12),
  ('past-stories', 14, 'vale-s4-interrupted-plan', 12),
  ('past-stories', 15, 'vale-s4-progressive-challenge', 12),
  ('past-stories', 16, 'vale-s4-once-upon-a-time', 12),
  ('past-stories', 17, 'vale-s4-forest-wolf', 12),
  ('past-stories', 18, 'vale-s4-red-riding-hood', 12),
  ('past-stories', 19, 'vale-s4-vale-story', 12),
  ('past-stories', 20, 'vale-s4-storyteller', 12),
  ('mixed-tenses', 1, 'vale-s5-first-students', 10),
  ('mixed-tenses', 2, 'vale-s5-tired-teacher', 10),
  ('mixed-tenses', 3, 'vale-s5-early-morning', 10),
  ('mixed-tenses', 4, 'vale-s5-win-tomorrow', 10),
  ('mixed-tenses', 5, 'vale-s5-healthy-snacks', 10),
  ('mixed-tenses', 6, 'vale-s5-mateo-runs', 10),
  ('mixed-tenses', 7, 'vale-s5-water-bottle', 10),
  ('mixed-tenses', 8, 'vale-s5-sleepy-student', 10),
  ('mixed-tenses', 9, 'vale-s5-real-lunch', 10),
  ('mixed-tenses', 10, 'vale-s5-mentor-book', 10),
  ('mixed-tenses', 11, 'vale-s5-ai-helper', 10),
  ('mixed-tenses', 12, 'vale-s5-missing-student', 10),
  ('mixed-tenses', 13, 'vale-s5-five-quiet-minutes', 10),
  ('mixed-tenses', 14, 'vale-s5-hard-month', 10),
  ('mixed-tenses', 15, 'vale-s5-knock-on-the-door', 10),
  ('mixed-tenses', 16, 'vale-s5-danis-interview', 10),
  ('mixed-tenses', 17, 'vale-s5-try-again', 10),
  ('mixed-tenses', 18, 'vale-s5-first-employee', 10),
  ('mixed-tenses', 19, 'vale-s5-the-company-call', 10),
  ('mixed-tenses', 20, 'vale-s5-the-promise', 10),
  ('eagles-week-1', 1, 'eagles-ep1-the-offer', 11),
  ('eagles-week-1', 2, 'eagles-ep2-the-proposal', 10),
  ('eagles-week-1', 3, 'eagles-ep3-the-competitor', 10),
  ('eagles-week-1', 4, 'eagles-ep4-the-objection', 10),
  ('eagles-week-1', 5, 'eagles-ep5-what-would-you-do', 10),
  ('eagles-week-1', 6, 'eagles-ep6-then-and-now', 10),
  ('eagles-week-1', 7, 'eagles-ep7-have-you-ever', 10),
  ('eagles-week-1', 8, 'eagles-ep8-how-long', 10),
  ('eagles-week-1', 9, 'eagles-ep9-the-complaint', 10),
  ('eagles-week-1', 10, 'eagles-ep10-two-hours', 10),
  ('eagles-week-1', 11, 'eagles-ep11-i-used-to', 10),
  ('eagles-week-1', 12, 'eagles-ep12-which-is-better', 10),
  ('eagles-week-1', 13, 'eagles-ep13-online-or-in-person', 10),
  ('eagles-week-1', 14, 'eagles-ep14-the-best-plan', 10),
  ('eagles-week-1', 15, 'eagles-ep15-a-great-teacher', 10),
  ('eagles-week-1', 16, 'eagles-ep16-another-country', 10),
  ('eagles-week-1', 17, 'eagles-ep17-so-far-so-good', 10),
  ('eagles-week-1', 18, 'eagles-ep18-danis-long-road', 10),
  ('eagles-week-1', 19, 'eagles-ep19-the-angry-director', 10),
  ('eagles-week-1', 20, 'eagles-ep20-the-contract', 10),
  ('tigers', 1, 'tigers-ep1-a-decision-i-made', 11),
  ('tigers', 2, 'tigers-ep2-what-could-happen', 11),
  ('tigers', 3, 'tigers-ep3-give-advice', 11),
  ('tigers', 4, 'tigers-ep4-what-needs-to-change', 11),
  ('tigers', 5, 'tigers-ep5-what-would-you-do', 11),
  ('tigers', 6, 'tigers-ep6-then-vs-now', 11),
  ('tigers', 7, 'tigers-ep7-your-experience', 11),
  ('tigers', 8, 'tigers-ep8-working-on', 11),
  ('tigers', 9, 'tigers-ep9-why-are-you-ready', 11),
  ('tigers', 10, 'tigers-ep10-interview-challenge', 11),
  ('tigers', 11, 'tigers-ep11-the-old-days', 11),
  ('tigers', 12, 'tigers-ep12-smaller-but-better', 11),
  ('tigers', 13, 'tigers-ep13-the-best-of-the-city', 11),
  ('tigers', 14, 'tigers-ep14-the-phone-never-stops', 11),
  ('tigers', 15, 'tigers-ep15-last-offer', 11),
  ('tigers', 16, 'tigers-ep16-what-we-have-achieved', 11),
  ('tigers', 17, 'tigers-ep17-the-visit', 11),
  ('tigers', 18, 'tigers-ep18-the-vote', 11),
  ('tigers', 19, 'tigers-ep19-new-leaders', 11),
  ('tigers', 20, 'tigers-ep20-defend-your-decision', 11),
  ('sharks', 1, 'sharks-ep1-tell-the-story', 11),
  ('sharks', 2, 'sharks-ep2-guatemala-seven-am', 11),
  ('sharks', 3, 'sharks-ep3-first-dollar-contract', 11),
  ('sharks', 4, 'sharks-ep4-three-offices-one-team', 11),
  ('sharks', 5, 'sharks-ep5-counter-offer', 11),
  ('sharks', 6, 'sharks-ep6-hiring-across-borders', 11),
  ('sharks', 7, 'sharks-ep7-quality-at-scale', 11),
  ('sharks', 8, 'sharks-ep8-vale-kids', 11),
  ('sharks', 9, 'sharks-ep9-mexico-call', 11),
  ('sharks', 10, 'sharks-ep10-partner-or-rival', 11),
  ('sharks', 11, 'sharks-ep11-what-went-wrong', 11),
  ('sharks', 12, 'sharks-ep12-say-it-in-numbers', 11),
  ('sharks', 13, 'sharks-ep13-the-hard-negotiation', 11),
  ('sharks', 14, 'sharks-ep14-losing-a-client', 11),
  ('sharks', 15, 'sharks-ep15-winning-it-back', 11),
  ('sharks', 16, 'sharks-ep16-a-team-in-three-countries', 11),
  ('sharks', 17, 'sharks-ep17-the-investor', 11),
  ('sharks', 18, 'sharks-ep18-say-no-with-respect', 11),
  ('sharks', 19, 'sharks-ep19-the-regional-deal', 11),
  ('sharks', 20, 'sharks-ep20-sharks-close-deals', 11),
  ('advanced-1', 1, 'advanced1-ep1-rules-of-the-game', 9),
  ('advanced-1', 2, 'advanced1-ep2-the-night-northline-almost-left', 9),
  ('advanced-1', 3, 'advanced1-ep3-why-us', 9),
  ('advanced-1', 4, 'advanced1-ep4-my-honest-weakness', 9),
  ('advanced-1', 5, 'advanced1-ep5-pressure-round', 9),
  ('advanced-1', 6, 'advanced1-ep6-a-heartbeat-for-the-proposal', 9),
  ('advanced-1', 7, 'advanced1-ep7-the-numbers-do-not-lie', 9),
  ('advanced-1', 8, 'advanced1-ep8-two-right-answers', 9),
  ('advanced-1', 9, 'advanced1-ep9-in-their-own-words', 9),
  ('advanced-1', 10, 'advanced1-ep10-the-behavioural-round', 9)
ON CONFLICT (module_id, day) DO UPDATE
  SET episode_id = EXCLUDED.episode_id, min_scene_index = EXCLUDED.min_scene_index;

INSERT INTO public.league_pilot_cohorts (module_id, curriculum_week, enabled) VALUES
  ('basic-zero', 1, true), ('basic-zero', 2, true), ('basic-zero', 3, true), ('basic-zero', 4, true),
  ('simple-future', 1, true), ('simple-future', 2, true), ('simple-future', 3, true), ('simple-future', 4, true),
  ('simple-present', 1, true), ('simple-present', 2, true), ('simple-present', 3, true), ('simple-present', 4, true),
  ('past-stories', 1, true), ('past-stories', 2, true), ('past-stories', 3, true), ('past-stories', 4, true),
  ('mixed-tenses', 1, true), ('mixed-tenses', 2, true), ('mixed-tenses', 3, true), ('mixed-tenses', 4, true),
  ('eagles-week-1', 1, true), ('eagles-week-1', 2, true), ('eagles-week-1', 3, true), ('eagles-week-1', 4, true),
  ('tigers', 1, true), ('tigers', 2, true), ('tigers', 3, true), ('tigers', 4, true),
  ('sharks', 1, true), ('sharks', 2, true), ('sharks', 3, true), ('sharks', 4, true),
  ('advanced-1', 1, true), ('advanced-1', 2, true), ('advanced-1', 3, true), ('advanced-1', 4, true),
  ('advanced-2', 1, true), ('advanced-2', 2, true), ('advanced-2', 3, true), ('advanced-2', 4, true),
  ('advanced-3', 1, true), ('advanced-3', 2, true), ('advanced-3', 3, true), ('advanced-3', 4, true)
ON CONFLICT (module_id, curriculum_week) DO UPDATE SET enabled = true;

CREATE OR REPLACE FUNCTION public.league_backfill_rewards()
RETURNS int LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  inserted int := 0;
  n int;
BEGIN
  WITH slots AS (
    SELECT module_id, day, episode_id, min_scene_index AS min_scene
      FROM public.league_story_slots
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