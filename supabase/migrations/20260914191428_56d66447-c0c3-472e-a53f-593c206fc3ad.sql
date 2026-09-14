-- Daily ceilings for the three AI endpoints that only had an hourly limit.
-- Sizing rationale (deliberately 2-6x above maximum legitimate daily use):
--   rep2_correction: at most 5 Rep 2 chunks per curriculum day x 3 attempts = 15,
--     and the pacing cap allows 2 curriculum days per calendar day => 30 is the
--     honest ceiling; 60 leaves margin for retries and partial sessions.
--   sentence_count: runs about once per final take => 30 is generous.
--   tts_generate: counts cache misses only, which converge to zero once the
--     authored clips are cached => 60 covers a first-time learner comfortably.
--   storybook: story-say-check.ts already asks for this key and it does not
--     exist, so today it silently falls back to a hardcoded 30 and ignores both
--     the Pro multiplier and the admin screen.
INSERT INTO public.section_limits (section_key, label, free_limit, free_monthly_limit, sort_order, enabled)
VALUES
  ('rep2_correction', 'Correcciones del Paso 2 (COPIA)', 60, NULL, 6, true),
  ('sentence_count', 'Conteo de ideas del audio final', 30, NULL, 7, true),
  ('tts_generate', 'Voces nuevas generadas (cache miss)', 60, NULL, 8, true),
  ('storybook', 'Story speaking checks', 30, NULL, 9, true)
ON CONFLICT (section_key) DO NOTHING;

-- Report-only allowlist switch for TTS. Flipped by hand in the SQL editor once
-- tts_generation_log shows no legitimate learner text falls outside the set.
ALTER TABLE public.app_settings
  ADD COLUMN IF NOT EXISTS tts_allowlist_enforce boolean NOT NULL DEFAULT false;

-- Minimal generation log. Service role only: no anon/authenticated policy.
-- Never stores learner speech or transcripts; text_preview holds only text the
-- learner asked the app to read aloud, and only when it is outside the authored set.
CREATE TABLE IF NOT EXISTS public.tts_generation_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  user_id uuid NOT NULL,
  clip_key text NOT NULL,
  in_allowlist boolean NOT NULL,
  enforced boolean NOT NULL,
  characters integer NOT NULL,
  text_preview text
);

GRANT ALL ON public.tts_generation_log TO service_role;

ALTER TABLE public.tts_generation_log ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS tts_generation_log_created_at_idx
  ON public.tts_generation_log (created_at);
CREATE INDEX IF NOT EXISTS tts_generation_log_flagged_idx
  ON public.tts_generation_log (in_allowlist, created_at);