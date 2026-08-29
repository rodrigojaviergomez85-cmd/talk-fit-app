ALTER TABLE public.day_progress
  ADD COLUMN IF NOT EXISTS module_id text NOT NULL DEFAULT 'simple-present',
  ADD COLUMN IF NOT EXISTS sentence_count integer;

ALTER TABLE public.day_progress DROP CONSTRAINT IF EXISTS day_progress_user_id_day_key;

CREATE UNIQUE INDEX IF NOT EXISTS day_progress_user_module_day_key
  ON public.day_progress (user_id, module_id, day);