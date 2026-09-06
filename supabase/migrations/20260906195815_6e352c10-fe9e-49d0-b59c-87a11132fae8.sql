ALTER TABLE public.final_audio_coach_feedback
  ADD COLUMN IF NOT EXISTS answered_task text NULL CHECK (answered_task IS NULL OR answered_task IN ('yes','partly','no')),
  ADD COLUMN IF NOT EXISTS fluency_upgrade jsonb NULL;

CREATE TABLE public.final_audio_coach_retakes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  feedback_id uuid NOT NULL REFERENCES public.final_audio_coach_feedback(id) ON DELETE CASCADE,
  module_id text NOT NULL,
  day smallint NOT NULL,
  status text NOT NULL CHECK (status IN ('pending','ready','unclear','error')),
  audio_sha256 text NULL,
  result jsonb NULL,
  transcript_word_count integer NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (feedback_id)
);
CREATE INDEX final_audio_coach_retakes_user_day_idx ON public.final_audio_coach_retakes (user_id, module_id, day);

GRANT SELECT ON public.final_audio_coach_retakes TO authenticated;
GRANT ALL ON public.final_audio_coach_retakes TO service_role;
ALTER TABLE public.final_audio_coach_retakes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Learners read own coach retakes" ON public.final_audio_coach_retakes
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER final_audio_coach_retakes_updated_at BEFORE UPDATE ON public.final_audio_coach_retakes
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();