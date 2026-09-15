# Audio retention: 10 days, permanent first/last samples, honest Coach Check

Final recordings will be kept for 10 days instead of 90. The first day and the last day of each module stay forever as the before-and-after sample. A repeat recorded today stays playable for 10 days from today, even if that day was first completed long ago. Coach Check will show counts that come from the server and never shrink when audio is deleted.

## What changes for people using the app

- A final recording is playable for 10 days after it was made.
- Day 1 and Day 20 finals never disappear.
- Practice takes still disappear after 48 hours (unchanged).
- Coach Check, for any date, shows:
  - the date,
  - "N prácticas completadas" / "N practices completed",
  - "N grabaciones realizadas" / "N recordings made",
  - the players plus "Disponibles hasta el {fecha}" / "Available until {date}" when at least one audio is still alive,
  - "Los audios expiraron. Tu actividad sigue registrada." / "The audios expired. Your activity is still recorded." when all are gone,
  - the existing empty state when there was no practice that day.
- The seven-day history keeps its checkmarks; they come from practice records, not audio.

## Technical plan

### A. Retention constant
- `src/lib/storage-report.ts`: `FINAL_RETENTION_DAYS` 90 → 10, update the header comment and the "final within 90 days" rule text. `TAKE_MIN_AGE_HOURS` (48), `MODULE_LAST_DAY` (20) and the milestone rule unchanged.
- Fix the same stale 90 in the `src/lib/storage-purge.server.ts` header comment.
- Migration: `CREATE OR REPLACE admin_health_snapshot` with `purge_candidates(50000, 48, 10, 20)` and `purge_day_final_candidates(50000, 10, 20)`; nothing else in it changes.
- Sweep the repo for other retention-meaning literal 90s (SQL, TS, learner copy). Alert thresholds are not retention and stay.

### B. Repeats get their own clock
- Migration adds `day_progress.latest_recorded_at timestamptz` and `latest_purged_at timestamptz`.
- `src/services/journey-service.ts` `syncDay`: when `isRepeat` and a blob was uploaded, include `latest_recorded_at: new Date().toISOString()` in the upsert. First completions leave it null.
- Extend `protect_day_progress_timestamps`: `latest_recorded_at`, when present, must be ≤ now + 1h and ≥ `created_at` - 1h, else `INVALID_LATEST_RECORDED_AT` (P0001); on update it may only move forward.
- Rewrite `purge_day_final_candidates` to return a new `which text` column:
  - `base`: `recording_purged_at IS NULL` and `completed_at` older than retention,
  - `latest`: `latest_recorded_at IS NOT NULL AND latest_purged_at IS NULL` and `latest_recorded_at` older than retention.
  Both still exclude day 1 and the module's last day and keep the ownership check.
- `src/lib/storage-purge.server.ts` finals loop: delete only the single path the row names, stamp only `recording_purged_at` (base) or `latest_purged_at` (latest). Stop deriving the `-latest` path from the base path. All budgets, timeouts, batching, overlap guard and ownership checks stay exactly as they are.

### C. Coach Check counts from the server
- New SQL function `public.coach_check_day(_day_key text, _retention_days int)` → `jsonb`, `LANGUAGE sql STABLE SECURITY INVOKER`, granted to `authenticated`, so RLS limits it to the caller's own rows. Returns:
  - `practices`: completed `practice_attempts` rows with that `local_day_key` (repeats count naturally),
  - `recordings`: `recordings` rows whose `created_at` falls on that day in America/El_Salvador, counted regardless of `audio_purged_at`; a comment notes the `(user_id, module_id, day, take_number)` unique key makes re-uploads upserts, so the count cannot inflate,
  - `audios[]`: one entry per final for the day with `path`, `recorded_at`, `available_until` (recorded_at + retention), `expired` (purged stamp set or available_until in the past), `kind` (`base`/`latest`).
- `src/routes/coach-check.tsx` calls the RPC for the selected date and drives the three states; `src/components/fluency/coach/PracticeCard.tsx` takes the recordings count from the RPC instead of `takes.length`.
- New `coach.*` strings in `src/lib/i18n.tsx` for the recordings line, the available-until line and the expired line, following the existing key style.
- No transcripts, no storage paths, no other learner's data on screen.

### D. Untouched
48-hour take rule, milestone exemption, ownership constraints, purge batching/budgets/timeouts/overlap guard, the recordings table, all quotas, limits and AI routes, and `progress_moments`.

### E. Tests
- `src/lib/storage-purge.test.ts`: base older than 10 days with a `-latest` from yesterday deletes only the base and stamps only `recording_purged_at`; a latest older than 10 days on an already-purged base deletes only the `-latest` and stamps only `latest_purged_at`; day 1 and day 20 are never candidates for either kind.
- `supabase/tests/coach_check_day.sql`: throwaway learner with 2 attempts and 8 recordings on one day → practices 2, recordings 8; re-upserting one recording with the same take number keeps 8; stamping every audio purged keeps the counts and marks every audio `expired`; a second learner sees zeros; plus the `latest_recorded_at` trigger cases (backdated rejected, later accepted).
- New vitest for the Coach Check date card covering the three render states from an RPC payload.
- `npx vitest run` must pass end to end.
