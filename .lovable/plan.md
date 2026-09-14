# Audio cleanup job: independent budgets, real time budget, timeouts, overlap guard

Goal: make the automatic audio cleanup safe and predictable enough to run every hour, so the backlog shrinks instead of growing at 17,000 learners. Nothing changes about *what* gets deleted.

## A. Independent ceilings per queue

`runPurge` currently shares one 5,000-file counter across both queues, so a large backlog of practice takes can starve the journey-finals queue forever.

- Replace `maxFiles` with `maxTakes` (default 4000) and `maxFinals` (default 1000), each with its own counter.
- The finals loop always runs, even when the takes loop hit its ceiling.
- `PurgeResult.truncated` is replaced by `takesTruncated` and `finalsTruncated`.
- `DELETE_BATCH`, `TAKE_MIN_AGE_HOURS`, `FINAL_RETENTION_DAYS`, `MODULE_LAST_DAY` stay unchanged.
- The job-run record already stores the whole result, so it picks up both flags automatically. The admin Alerts screen does not currently read `truncated` from that detail, so nothing there needs to change; this is noted so the field rename is not assumed to have a consumer.

## B. Real time budget

- Default budget drops from 60,000 ms to 45,000 ms, with a comment explaining it must finish well inside the platform request timeout.
- `outOfBudget()` is checked in three places in both loops: before fetching a batch, before each storage delete, and before each database mark — including inside the per-row loop of the finals queue.
- On exhaustion mid-batch the run stops immediately and sets the matching truncated flag. Files already removed but not yet marked are retried next run; the existing code already treats a missing object as fine.

## C. Per-call timeout

- New helper `withTimeout(promise, ms, label)` in the same file races the call against a timer and rejects with a message starting with `TIMEOUT`.
- Every storage `remove`, every table `update`, and every `rpc` inside `runPurge` is wrapped with a 10,000 ms timeout.
- A timeout pushes the message into `errors`, leaves the row/batch unmarked, and continues like the existing error branches. A timeout on the candidates lookup ends that queue's loop.

## D. Overlap guard

In `src/routes/api/public/hooks/purge-audio.ts`, before inserting the run row, look for an existing `purge-audio` run with no `finished_at` started less than 30 minutes ago. If found, return `409` with `{ skipped: true, reason: "already running" }` and insert nothing. Crashed runs age out of the guard after 30 minutes.

## E. Schedule note

Add a header comment stating the intended schedule is hourly: roughly 30,000 expired take files arrive per day at 17,000 learners, which exceeds one daily run's ceiling; hourly runs give about 120,000 files of capacity per day. The schedule itself is changed in the Cloud panel after deploy.

## F. Explicitly unchanged

The SQL functions `purge_candidates`, `purge_day_final_candidates`, `purge_backlog`; retention rules and the day-1 / module-last-day milestone exemption; the in-memory classifier second check; job token authentication; the `job_runs` schema; bucket policies; all client-side code.

## G. Tests (`src/lib/storage-purge.test.ts`)

Using the injectable admin and clock:

- 4000 takes and 50 finals available: both loops run, finals processed.
- Takes ceiling hit: `finalsTruncated` is false and finals were still processed.
- Storage remove resolving after 12 s: reported as a `TIMEOUT` error, batch unmarked, run continues.
- Finals per-row loop with 400 ms per call: stops with `finalsTruncated` true, never exceeding the budget plus one call (fake clock).
- Route guard: an unfinished run from 5 minutes ago returns 409 and inserts nothing; one from 40 minutes ago does not block.

Then run the full test suite and typecheck.

## Success criteria

One run purges finals even with a takes backlog; no run exceeds its budget by more than a single call; a hung call costs at most 10 s and one batch; overlapping invocations never process the same rows; backlog trends down after the hourly switch.
