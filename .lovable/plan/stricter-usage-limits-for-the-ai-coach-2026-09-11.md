# Stricter usage limits for the AI Coach

Goal: keep the Coach cheap and predictable — short answers, real server-side limits per student, and internal accounts that can't be faked by editing a profile email.

## What changes for students

- Each student gets **5 questions per day** and **60 per month** (UTC calendar day/month, no roll-over).
- The Coach screen shows both counters as soon as it opens, without spending a question.
- Clear, separate messages for "daily limit reached" and "monthly limit reached", each showing when it resets in the student's local time.
- A temporary provider hiccup (busy/overloaded) is shown as "try again in a moment", never as "you used up your questions".
- Answers stay short: one brief explanation plus one or two examples.

## Technical changes

### Database (new migration)

- New table `public.ai_coach_usage` (one row per user per UTC day, plus a monthly counter row keyed by month) with RLS enabled and **no** insert/update/delete policies for `anon`/`authenticated`; only `service_role` gets grants.
- New security-definer RPC `consume_ai_coach_quota(_user_id uuid)`:
  - single atomic statement path (`INSERT ... ON CONFLICT DO UPDATE ... WHERE` guard) so two simultaneous tabs can never both pass the last slot;
  - checks month first, then day; if either is exhausted, **neither** counter is incremented;
  - returns `allowed`, `daily_used`, `monthly_used`, `daily_limit`, `monthly_limit`, `day_reset_at`, `month_reset_at`, `blocked` (`none` | `daily` | `monthly`);
  - unlimited internal accounts return `allowed = true` without consuming.
- New read-only RPC `get_ai_coach_quota(_user_id uuid)` returning the same shape without consuming.
- `EXECUTE` revoked from `anon`/`authenticated`, granted to `service_role` only.
- Rewrite `is_unlimited_test_user` to read `auth.users` (email + `email_confirmed_at is not null`) instead of `public.profiles.email`, keeping the same three internal accounts and the same signature, so the practice cap and AI quota callers keep working unchanged.

### API (`src/routes/api/ai-coach.ts`)

- Keep `google/gemini-3.1-flash-lite`, one text call, 600-char question cap, "under 120 words" instruction.
- Add a real generation cap in the request body (`max_tokens: 300`) plus the minimum reasoning setting the gateway accepts for this model; verified with a live gateway call, not just typechecked. No automatic continuation call when the answer is truncated.
- Auth → input validation → config check → **then** reserve the slot via `consume_ai_coach_quota`, before any provider call.
- No automatic refund on provider errors (conservative).
- New `GET` handler returning the current counters via `get_ai_coach_quota` (no model call, no consumption).
- Distinct error codes: `daily_limit`, `monthly_limit` (429 + reset timestamps) vs `provider_busy` (provider 429/5xx) vs `gateway`.

### UI (`src/routes/ai-coach.tsx` + i18n)

- Fetch counters on open; show "X of 5 today · Y of 60 this month" (bilingual), or "unlimited" for internal accounts.
- Separate daily/monthly limit panels with the reset moment rendered in local time, plus a refresh action that re-reads the counters without signing out.
- Provider-busy state keeps the input enabled.

## Verification

- DB-level concurrency test: two RPC calls fired in parallel against the real database with 4 daily uses already spent — exactly one may succeed.
- Boundary tests: 5th allowed / 6th blocked; 60th allowed / 61st blocked; exhausted month leaves the daily counter untouched; day and month rollover reset only their own period.
- Security test: editing `profiles.email` grants nothing; the three real internal accounts keep access.
- One live gateway request to confirm the output cap is accepted and respected.
- `npx tsgo --noEmit` and the existing test suite.

Out of scope (left for later, as requested): cost logging, dashboard, response cache, alternate providers, paid auto-retries. Practice, retakes, Test Ready and TTS limits stay exactly as they are.
