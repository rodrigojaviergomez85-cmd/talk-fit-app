ALTER TABLE public.final_audio_coach_feedback
  ADD COLUMN IF NOT EXISTS correction_needed boolean NULL,
  ADD COLUMN IF NOT EXISTS said text NULL,
  ADD COLUMN IF NOT EXISTS better_version text NULL,
  ADD COLUMN IF NOT EXISTS why_en text NULL,
  ADD COLUMN IF NOT EXISTS why_es text NULL,
  ADD COLUMN IF NOT EXISTS practice_phrase text NULL;