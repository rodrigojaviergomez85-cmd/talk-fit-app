# Real AI cost tracking: durable call log, daily rollup, and admin screens on real dollars

Today the admin cost screens multiply request counts by guessed unit prices, and the underlying usage table is wiped after two days and stores no provider, model, units or cost. This work records the real units of every paid AI call and its estimated cost at the moment it happens, keeps a permanent daily summary, and points the cost center and spend alerts at those real numbers. Nothing changes for learners.

## What gets built

### 1. Two new database tables and two functions

- `ai_call_log` — one row per provider call, failure, or quota denial: who, which endpoint, provider, model, module/day, the units (audio seconds, input/output tokens, characters), success flag, error code, latency, and estimated cost in USD. Indexed by date, by user, by endpoint. No access for learners; server-only. Drill-down data, prunable to 90 days.
- `ai_daily_rollup` — one permanent row per UTC day, endpoint and model with calls, failures, denials, cache hits, summed units and summed cost. Never deleted.
- `bump_ai_rollup(...)` — single upsert that adds counters onto the day's row.
- `prune_ai_call_log(_keep_days)` — deletes old drill-down rows and returns the count. Not scheduled here; scheduled later in the Cloud panel like the audio purge.

Both tables: RLS on, no learner policies, privileges revoked from anon/authenticated, full access for the server role only. Both functions server-role only.

### 2. New module `src/lib/ai-call-log.server.ts`

Header comment explains the reasoning above.

- `PRICES` — a single price table in USD, each entry carrying the verification date 2026-09-14: Groq `whisper-large-v3-turbo` 0.04/audio-hour and `whisper-large-v3` 0.111/audio-hour; `google/gemini-3.7-flash` 0.75/1M in and 3.75/1M out (with a comment that Google announced 1.50 and 7.50 effective 2027-01-01 and these must be updated then); `google/gemini-3.1-flash-lite` 0.25/1M in and 1.50/1M out; `openai/gpt-4o-mini-tts` 0.60/1M input tokens plus 12.00/1M output audio tokens, plus `TTS_USD_PER_CHAR = 0.0000167` derived from ~0.015 USD per minute at ~900 characters per minute, marked as an estimate to tune.
- `estimateCostUsd(entry)` — pure. Returns 0 when the call failed or provider is `none`. Audio seconds / 3600 x hourly price for Whisper; tokens x per-million prices for the Gemini models; characters x `TTS_USD_PER_CHAR` for TTS. Unknown model returns 0 and warns once per process per model; never throws.
- `logAiCall(entry)` — fire-and-forget: never throws, never delays the response, swallows and logs its own failures. Uses the service-role client the same way `consumeQuota` does. Inserts one `ai_call_log` row unless it is a cache hit, and always calls `bump_ai_rollup` with calls 1 for real provider calls, failures 1 when not ok and provider is not `none`, denials 1 when the error code is `quota`, cache hits 1 for cache hits, plus units and cost.

### 3. Instrumented call sites

One row per provider call, written after the provider responds, with existing guard order untouched:

- `final-coach-providers.server.ts`: optional trailing `meta` ({ userId, moduleId?, day? }) on `transcribeFinalAudio` (audio seconds from Groq's verbose_json `duration`) and `coachChatJson` (tokens from `body.usage`). Callers without `meta` behave exactly as today; callers in `final-audio-coach.server.ts`, `api/final-audio-coach-retake.ts` and `api/sentence-count.ts` pass the ids they already hold.
- `api/rep2-correction.ts`: one row per attempt in the turbo-then-fallback flow, so a fallback writes two rows.
- `api/story-say-check.ts`: one row per transcription.
- `api/sentence-count.ts`: the ideas-counting chat call.
- `api/ai-coach.ts`: the chat call, with the HTTP status as error code on gateway failure; plus a denial row when the coach quota says no.
- TTS: the paid gateway speech fetch in `course-audio.server.ts` takes the same optional `meta`; `api/tts.ts` passes the learner's id, admin pregeneration passes the admin's id, and a cache hit logs `cacheHit: true` (rollup only, no per-call row).
- `consumeQuota` in `route-auth.server.ts`: when the quota RPC denies, log one denial with the quota key verbatim as the endpoint. This covers every route that uses it without per-route edits.

### 4. Admin screens on real data

- `admin_cost_center` recomputed from `ai_daily_rollup` (last 30 days and all time) per endpoint and model: calls, failures, denials, cache hits, units, real cost. Other parts of the function unchanged.
- `admin_health_snapshot`'s `ai.by_day` reads the rollup for the last 8 days and includes cost per day/endpoint/model.
- `admin-alerts.ts`: `aiCostForDay` sums real cost instead of multiplying counts by prices.
- `admin-cost-center.ts`: guessed AI unit prices removed; shows real cost per endpoint plus calls, denials and the TTS cache-hit rate. Storage estimate stays as is.
- A short bilingual note on the cost screen: data before this change is not available.

## Not touched

Guard order in any AI route; `consume_ai_quota`, `ai_usage_limits`, `consume_ai_coach_quota`, `section_limits`, `app_settings`, daily ceilings, the TTS allowlist and `tts_generation_log`; RLS on existing tables; any client file. No transcripts, prompts, message contents or learner speech are ever stored — units and metadata only. No log write sits inside a try block where a logging failure could surface as a learner error.

## Tests

`src/lib/ai-call-log.server.test.ts`: cost math for 90 s of Whisper turbo (0.001), 1000/200 tokens on gemini-3.7-flash (0.0015) and gemini-3.1-flash-lite (0.00055), 300 TTS characters; zero for failed calls, `none` provider and unknown models without throwing; `logAiCall` resolves when the insert or RPC rejects; cache hit bumps `cache_hits` with no row; denial bumps `denials`. Plus: denied `consumeQuota` logs exactly one quota entry and an allowed one logs none; `aiCostForDay` sums real cost. Then `npx vitest run` with the whole existing suite passing.
