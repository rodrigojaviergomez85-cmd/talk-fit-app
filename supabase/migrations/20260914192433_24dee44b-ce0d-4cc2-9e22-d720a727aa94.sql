-- Measurement context: public.purge_candidates final-lookup
-- Before index: evaluating 100 purge candidates against ~100,150 day_progress rows
-- performed an EXISTS subquery with a sequential scan, reading ~8 million rows
-- and taking ~3.8 seconds. With this partial index the same probe uses an
-- Index Only Scan and takes ~0.25 milliseconds.
CREATE INDEX IF NOT EXISTS day_progress_recording_path_idx
  ON public.day_progress (recording_path)
  WHERE recording_path IS NOT NULL;

ANALYZE public.day_progress;
