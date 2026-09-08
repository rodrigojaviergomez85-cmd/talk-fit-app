ALTER TABLE public.final_audio_coach_retakes
  ADD COLUMN IF NOT EXISTS idea_count INTEGER;

ALTER TABLE public.final_audio_coach_retakes
  DROP CONSTRAINT IF EXISTS final_audio_coach_retakes_idea_count_nonnegative;

ALTER TABLE public.final_audio_coach_retakes
  ADD CONSTRAINT final_audio_coach_retakes_idea_count_nonnegative
  CHECK (idea_count IS NULL OR idea_count >= 0);