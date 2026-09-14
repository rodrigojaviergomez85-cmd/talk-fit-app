# Index for audio purge final-lookup

## What this does
Adds a single partial index on `public.day_progress.recording_path` so the audio purge can tell whether a recording is a "final take" without scanning the whole table. This fixes the slow query inside `public.purge_candidates` and keeps the admin health/backlog alert screen fast as `day_progress` grows.

## SQL change
One new migration containing only:
- A comment with the before/after measurement (8 M rows / 3.8 s → 0.25 ms)
- `CREATE INDEX IF NOT EXISTS day_progress_recording_path_idx ON public.day_progress (recording_path) WHERE recording_path IS NOT NULL;`
- `ANALYZE public.day_progress;`

No other function, table, index, or TypeScript file is modified.

## Verification
After applying, run the same probe query the admin alerts use:
```sql
EXPLAIN (ANALYZE, BUFFERS) SELECT * FROM public.purge_candidates(100, 48, 90, 20);
```
Confirm the plan uses `Index Only Scan` or `Index Scan` on `day_progress_recording_path_idx` and shows no sequential scan on `day_progress`. The resulting plan is saved to the task summary for the record.
