# Storage cleanup report (read-only) + purged-take safety

This task deletes nothing. It adds the schema column, a read-only report that shows which non-final takes *would* be purge candidates and why the rest are protected, an admin-only page to run it, and the UI rule that a purged take is simply not shown.

Current data (verified): 61 accounts, 233 recordings, 53 marked Final Rep, 53 `day_progress` rows with a `recording_path`, and 0 recordings older than 14 days — so the first report will show 0 candidates and non-zero exclusion counts, which is the expected proof that the guardrails work.

## Part 1 — Schema (additive, no rows touched)

One migration, two things:

- `public.recordings.audio_purged_at timestamptz NULL` — no default, no backfill.
- Admin role support, following the project's standard pattern: `app_role` enum (`admin`, `user`), `public.user_roles` table (user_id + role, unique), grants for `authenticated`/`service_role`, RLS with a "read your own role" policy only, and the `has_role(_user_id, _role)` security-definer function. No learner can insert roles (no insert/update policy).

After the migration, your account is granted `admin` with a one-off data change (I'll ask which email is yours if there's any doubt; there are 61 accounts). Nobody else gets the role.

## Part 2 — Read-only report (server function)

New `src/lib/storage-report.functions.ts`, `createServerFn` with `requireSupabaseAuth`:

1. Verify the caller through `context.supabase.rpc("has_role", { _user_id: userId, _role: "admin" })`; anyone else gets `Forbidden` and no data.
2. Only then load the service-role client inside the handler and run **SELECT-only** queries across all learners:
   - all `recordings` rows (id, user_id, module_id, day, take_number, is_final_rep, storage_path, created_at, audio_purged_at, duration_seconds, mime_type)
   - all `day_progress` rows (user_id, module_id, day, recording_path)
3. Classify every recording in a fixed order, first matching reason wins, and count each reason:
   1. `already purged` — `audio_purged_at IS NOT NULL`
   2. `final by is_final_rep`
   3. `final by day_progress.recording_path` — path appears in **any** `day_progress.recording_path` (set built from all rows, not only the same learner/day, so a mismatch can never slip through)
   4. `newer than 14 days`
   5. `day not completed` — no `day_progress` row for that learner + module_id + day
   6. otherwise → **candidate**
4. The classifier is a pure function exported from `src/lib/storage-report.ts` (no I/O) so the later deletion task must reuse the exact same guardrails, and it gets a unit test covering each exclusion, including the "is_final_rep = false but referenced by day_progress" case.

Estimated size: no byte column exists, so MB is estimated from `duration_seconds` at the app's capture bitrate (32 kbps → ~4 KB/s), labelled as an estimate.

Nothing in this function writes: no update, no delete, no storage call.

## Part 3 — Report output

```text
{
  generatedAt,
  candidates: { files, estimatedMb, learners, oldest, newest,
                byModule: [{ moduleId, files, estimatedMb }],
                samplePaths: [ ...20 ] },
  excluded: { alreadyPurged, finalByFlag, finalByDayProgress,
              newerThan14Days, dayNotCompleted },
  totals: { recordings, dayProgressWithPath, protectedByBoth }
}
```

`protectedByBoth` shows how many finals agree in both sources, and `finalByDayProgress` shows takes protected *only* by the second source of truth — the number you asked to see.

## Part 4 — Admin page

New route `src/routes/admin.storage-report.tsx` (`/admin/storage-report`), behind the existing `AuthGate`, not linked from any nav or Home. On load it calls a tiny `isAdmin` server function; non-admins see the app's normal 404 page. Admins get a "Run report" button and the report rendered in the app's existing card style: candidate summary, module breakdown table, exclusion counts, sample paths, plus a "Copy JSON" button. Spanish/English copy via `useT`.

## Part 5 — Playback safety (now, before deletion exists)

- `CloudSync.listTakes` (the only place non-final takes are listed) selects `audio_purged_at` and filters `audio_purged_at IS NULL`, so a purged take is never returned to any component — no player, no error, no placeholder. `TakeRow` gains `audioPurgedAt` for completeness.
- Recordings page and the first-vs-latest comparison read only `day_progress.recording_path` (Final Rep, never purged) — unchanged.
- `signedRecordingUrl` keeps returning `null` for a missing file — unchanged.

## Not in this task

No storage deletion, no row deletion/updates, no cron or scheduled job, no changes to recording/upload/practice/sync logic or Final Rep marking.

## Verification

- Migration applies; `recordings` rows unchanged (count and a checksum of `is_final_rep`/`storage_path` before vs after).
- Run the report as your account: 0 candidates today, exclusion counts sum to 233, `finalByFlag` = 53, and `finalByDayProgress` reported separately.
- Run as a non-admin learner session: `Forbidden`, and `/admin/storage-report` shows 404.
- Unit test for the classifier passes; typecheck passes.
- Recordings and Progress pages render exactly as before.

## Technical notes

- Files: migration; `src/lib/storage-report.ts` (pure classifier + types), `src/lib/storage-report.functions.ts` (admin-gated server functions), `src/lib/storage-report.test.ts`, `src/routes/admin.storage-report.tsx`, `src/services/cloud-sync.ts` (`listTakes` filter), `src/lib/i18n.tsx` (report labels).
- The service-role client is dynamically imported inside the handler after the role check, per the project's server-function rules; the bearer token is already attached by `attachSupabaseAuth` in `src/start.ts`.
