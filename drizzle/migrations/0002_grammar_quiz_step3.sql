CREATE TABLE public.grammar_quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id text NOT NULL,
  day smallint NOT NULL,
  total smallint NOT NULL DEFAULT 20,
  correct smallint NOT NULL DEFAULT 0,
  passed boolean NOT NULL DEFAULT false,
  answers jsonb NOT NULL DEFAULT '[]'::jsonb,
  completed_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.grammar_quiz_attempts TO authenticated;
GRANT ALL ON public.grammar_quiz_attempts TO service_role;

ALTER TABLE public.grammar_quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Own grammar attempts" ON public.grammar_quiz_attempts
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Insert own grammar attempts" ON public.grammar_quiz_attempts
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE INDEX grammar_quiz_attempts_user_day_idx
  ON public.grammar_quiz_attempts (user_id, module_id, day, passed, completed_at);

ALTER TABLE public.league_rewards DROP CONSTRAINT IF EXISTS league_rewards_activity_type_check;
ALTER TABLE public.league_rewards ADD CONSTRAINT league_rewards_activity_type_check
  CHECK (activity_type = ANY (ARRAY['story'::text, 'practice'::text, 'grammar'::text]));

CREATE OR REPLACE FUNCTION public.league_award(_activity_type text, _module_id text, _day integer, _activity_key text, _min_scene_index integer DEFAULT 0)
 RETURNS jsonb
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
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
  IF _activity_type NOT IN ('story', 'practice', 'grammar') THEN RETURN jsonb_build_object('status', 'invalid'); END IF;

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
     WHERE user_id = uid AND module_id = _module_id AND day = _day
       AND completed_at >= window_start AND completed_at < window_end;
    IF done_at IS NULL THEN
      SELECT min(completed_at) INTO done_at FROM public.day_progress
       WHERE user_id = uid AND module_id = _module_id AND day = _day
         AND completed_at >= window_start AND completed_at < window_end;
    END IF;
  ELSIF _activity_type = 'grammar' THEN
    SELECT min(completed_at) INTO done_at FROM public.grammar_quiz_attempts
     WHERE user_id = uid AND module_id = _module_id AND day = _day AND passed
       AND completed_at >= window_start AND completed_at < window_end;
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
$function$;