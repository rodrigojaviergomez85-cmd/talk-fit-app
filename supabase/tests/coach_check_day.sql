-- Coach Check counts come from the server and never move when audio is deleted.
-- Run as a superuser/service connection: creates throwaway learners and rolls back.
BEGIN;

INSERT INTO auth.users (id, email) VALUES
  ('11111111-1111-1111-1111-111111111111', 'coach-a@test.local'),
  ('22222222-2222-2222-2222-222222222222', 'coach-b@test.local');

-- Two practices and eight recordings on one local day.
INSERT INTO public.practice_attempts (user_id, module_id, day, local_day_key, started_at, completed_at)
SELECT '11111111-1111-1111-1111-111111111111', 'basic-zero', g, '2026-09-14', now(), now()
FROM generate_series(1, 2) g;

INSERT INTO public.recordings (user_id, module_id, day, take_number, is_final_rep, duration_seconds, storage_path)
SELECT '11111111-1111-1111-1111-111111111111', 'basic-zero', 5, g, false, 10,
       '11111111-1111-1111-1111-111111111111/basic-zero/5/take-' || g || '.webm'
FROM generate_series(1, 8) g;

SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

DO $$
DECLARE r jsonb := public.coach_check_day('2026-09-14');
BEGIN
  ASSERT (r->>'practices')::int = 2, 'expected 2 practices';
  ASSERT (r->>'recordings')::int = 8, 'expected 8 recordings';
END $$;

RESET role;

-- A repeated upload upserts onto the same (user, module, day, take) row,
-- so the count is stable by construction.
INSERT INTO public.recordings (user_id, module_id, day, take_number, is_final_rep, duration_seconds, storage_path)
VALUES ('11111111-1111-1111-1111-111111111111', 'basic-zero', 5, 3, false, 12,
        '11111111-1111-1111-1111-111111111111/basic-zero/5/take-3.webm')
ON CONFLICT (user_id, module_id, day, take_number) DO UPDATE SET duration_seconds = excluded.duration_seconds;

-- Deleting the audio only stamps the rows: counts must not move.
UPDATE public.recordings SET audio_purged_at = now()
WHERE user_id = '11111111-1111-1111-1111-111111111111';

SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub":"11111111-1111-1111-1111-111111111111","role":"authenticated"}';

DO $$
DECLARE r jsonb := public.coach_check_day('2026-09-14');
BEGIN
  ASSERT (r->>'practices')::int = 2, 'practices changed after purge';
  ASSERT (r->>'recordings')::int = 8, 'recordings changed after purge';
  ASSERT NOT EXISTS (
    SELECT 1 FROM jsonb_array_elements(r->'audios') a WHERE (a->>'expired')::boolean IS FALSE
  ), 'every audio must report expired';
END $$;

RESET role;

-- Another learner sees nothing of this day.
SET LOCAL role TO authenticated;
SET LOCAL request.jwt.claims TO '{"sub":"22222222-2222-2222-2222-222222222222","role":"authenticated"}';

DO $$
DECLARE r jsonb := public.coach_check_day('2026-09-14');
BEGIN
  ASSERT (r->>'practices')::int = 0, 'other learner must see 0 practices';
  ASSERT (r->>'recordings')::int = 0, 'other learner must see 0 recordings';
END $$;

RESET role;

-- protect_day_progress_timestamps: latest_recorded_at cannot be backdated
-- and can only move forward.
INSERT INTO public.day_progress (user_id, module_id, day, completed_at, final_seconds, practice_seconds, recordings_count, recording_path, latest_recorded_at)
VALUES ('11111111-1111-1111-1111-111111111111', 'basic-zero', 5, now(), 15, 60, 1,
        '11111111-1111-1111-1111-111111111111/basic-zero-day-5.webm', now());

DO $$
BEGIN
  BEGIN
    UPDATE public.day_progress SET latest_recorded_at = now() - interval '30 days'
    WHERE user_id = '11111111-1111-1111-1111-111111111111';
    RAISE EXCEPTION 'backdated latest_recorded_at should have been rejected';
  EXCEPTION WHEN sqlstate 'P0001' THEN
    NULL;
  END;
END $$;

UPDATE public.day_progress SET latest_recorded_at = now() + interval '1 minute'
WHERE user_id = '11111111-1111-1111-1111-111111111111';

ROLLBACK;
