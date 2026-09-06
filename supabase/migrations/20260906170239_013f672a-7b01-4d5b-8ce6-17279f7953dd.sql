ALTER TABLE public.recordings ADD COLUMN IF NOT EXISTS source_turn_number smallint NULL;

CREATE TABLE public.final_audio_coach_feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_id text NOT NULL,
  day smallint NOT NULL,
  take_number smallint NOT NULL,
  source_turn_number smallint NULL,
  audio_sha256 text NOT NULL,
  rubric_sha256 text NOT NULL,
  coach_version text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending', 'ready', 'unclear', 'error')),
  task_completed boolean NULL,
  target_language text NULL CHECK (target_language IS NULL OR target_language IN ('good', 'developing')),
  organization text NULL CHECK (organization IS NULL OR organization IN ('good', 'developing')),
  strength_en text NULL,
  strength_es text NULL,
  next_step_en text NULL,
  next_step_es text NULL,
  transcript_word_count integer NULL,
  estimated_idea_count integer NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, audio_sha256, rubric_sha256, coach_version)
);
CREATE INDEX final_audio_coach_feedback_user_day_idx
  ON public.final_audio_coach_feedback (user_id, module_id, day);

GRANT SELECT ON public.final_audio_coach_feedback TO authenticated;
GRANT ALL ON public.final_audio_coach_feedback TO service_role;
ALTER TABLE public.final_audio_coach_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Learners read own coach feedback" ON public.final_audio_coach_feedback
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER final_audio_coach_feedback_updated_at BEFORE UPDATE ON public.final_audio_coach_feedback
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();