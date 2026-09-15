# Plan: AI call log reconciliation fixes

## Goal
Fix two small defects left in the durable AI call log after the previous cost-reconciliation task:

1. Quota denials (`provider = 'none'`) are currently counted as `calls` and `failures` inside `prune_ai_call_log`'s detail aggregation. That is harmless in the UPDATE branch, but the INSERT branch that recreates a missing rollup row writes wrong numbers (e.g. 3 denials become `calls 3, failures 3, denials 0`).
2. Failed Groq correction rows with `audio_seconds IS NULL` were written with `billed_audio_seconds = 10`, while the TypeScript `billableAudioSeconds` returns `0` for null/0 audio on failure. This makes old and new failed rows disagree.

## What we will do

1. **Database migration** (one file)
   - `CREATE OR REPLACE` `public.prune_ai_call_log(_keep_days integer)` with the same overall logic, but change the detail aggregation:
     - `calls` → `count(*) FILTER (WHERE provider <> 'none')`
     - `failures` → `count(*) FILTER (WHERE NOT ok AND provider <> 'none')`
     - add `denials` → `count(*) FILTER (WHERE error_code = 'quota')`
   - In the INSERT branch that recreates a missing rollup row, replace the literal `0` for `denials` with `_rec.denials`.
   - In the UPDATE branch add `denials = greatest(r.denials, _rec.denials)` alongside the other `greatest(...)` updates.
   - Add a one-time data correction:
     - `UPDATE public.ai_call_log SET billed_audio_seconds = 0 WHERE ok = false AND audio_seconds IS NULL AND billed_audio_seconds = 10;`
     - For each affected `(day, endpoint, model)` group, subtract `10 seconds × row_count` from `public.ai_daily_rollup.billed_audio_seconds`, clamped at `0`. No `est_cost_usd` change because failed rows already cost `0`.

2. **Manual test update**
   - Extend `supabase/tests/log_ai_call_idempotency.sql` with a second verification block:
     - Insert 3 old quota-denial rows (created_at well before the prune cutoff, provider `'none'`, `error_code = 'quota'`).
     - Ensure no rollup row exists for that `(day, endpoint, model)`.
     - Call `public.prune_ai_call_log(1)` (or use a small keep-days value) so the rows are processed.
     - Assert the newly created `ai_daily_rollup` row has `calls = 0`, `failures = 0`, `denials = 3`.
     - Roll back.

3. **Verification**
   - Run `npx vitest run` and ensure all tests pass.
   - Run the updated manual SQL test in the SQL editor and confirm it reports success.

## What stays the same
- The `log_ai_call` function, prices, retry behavior, retention rules, and the `prune-ai-log` cron job.
- No changes to quotas, limits, routes, or learner-facing behavior.
