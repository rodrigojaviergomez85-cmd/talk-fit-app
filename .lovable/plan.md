# Spoken-Correction MVP — BASIC 1 · FUTURE, Day 1–2, Rep 2 only

## What the learner will see

Only in **BASIC 1 · FUTURE, Day 1 and Day 2, Rep 2**. After recording a chunk, a small feedback card appears under the recorder:

- **GOOD** — "GREAT JOB, CHAMPION!" with the existing NEXT button.
- **CORRECT** — "ALMOST!" / YOU SAID "…" / TRY "…" (one highlighted word or short phrase), plus LISTEN AGAIN (existing model audio), TRY AGAIN, and SKIP.
- **UNCERTAIN** — "I COULDN'T HEAR THAT CLEARLY." plus TRY AGAIN and SKIP.

Rules: never more than one correction; maximum 2 correction retries per chunk, then NEXT/SKIP is always available; SKIP is always visible; no scores or percentages. Spanish/English copy follows the existing app-language setting. Every other module, day, and Rep is untouched.

## Current state (verified)

- `/api/sentence-count` already has the auth → size/MIME validation → durable quota pattern using `verifyRequestUser` and `consumeQuota` (`consume_ai_quota` RPC). It will be reused as-is, not modified.
- `rep2Chunks(day)` / `rep2ChunkText(chunk)` in `src/lib/rep-structure.ts` are pure and already shared by Practice and the server-side audio inventory; `CourseService.loadModule("simple-future")` loads the real curriculum server-side.
- Future Day 1–2 chunks are two sentences each (e.g. "Tonight, I'm going to go home early. I'm going to eat dinner with my family."), so matching must handle 2-sentence targets and contractions like `I'm` / `It's`.
- `Rep2Copy` in `src/routes/practice.tsx` receives the `Recording` (with `blob`) via `onRecorded`; chunk id is `chunk.id`.
- **`GROQ_API_KEY` does not exist yet** — it must be added as a backend secret before the endpoint works.

## Steps

1. **Secret** — request `GROQ_API_KEY` via the secrets tool (server-only, never sent to the browser).

2. **Endpoint `src/routes/api/rep2-correction.ts`** (POST, multipart: `moduleId`, `day`, `chunkId`, `file`), in this order:
   1. `verifyRequestUser` → 401.
   2. Scope check: `moduleId === "simple-future"` and `day ∈ {1, 2}` → otherwise 403, before anything else.
   3. Audio validation copied from sentence-count: content-length precheck, >= 2 KB, <= 3 MB, MIME allowlist → 400/413/415.
   4. `consumeQuota(userId, "rep2-correction", 30, 3600)` → 429.
   5. Load curriculum with `CourseService.loadModule`, find the day, derive target with `rep2Chunks` + `rep2ChunkText`; unknown `chunkId` → 400.
   6. Groq `whisper-large-v3-turbo`, `language=en`, `prompt=<target text>`, `response_format=verbose_json` (gives segment `avg_logprob` / `no_speech_prob` for confidence).
   7. Local compare → if clear GOOD/CORRECT, return. If UNCERTAIN, one retry with `whisper-large-v3`, compare again; still uncertain → UNCERTAIN. Hard cap 2 STT calls.
   8. Response `{ status, transcript, target, focus?, retryRecommended }`. Audio is never stored. Provider errors → 502 (429/402/403 passed through), no LLM ever called.

3. **Matcher `src/lib/rep2-match.ts`** (pure TypeScript, unit-tested):
   - Normalize: lowercase, strip punctuation, collapse whitespace, unify apostrophes, expand contractions both ways (`I'm -> I am`, `I'll -> I will`, `it's -> it is`, `don't/won't/isn't/aren't`, etc.), digits <-> number words (`11 <-> eleven`).
   - Word-level diff (LCS alignment) -> list of ops: missing / extra / replaced / moved.
   - Decision: 0 ops (or only trivial diffs like fillers `uh/um`, leading "tonight" vs missing comma) -> **GOOD**. Exactly one op, or several ops where one clearly touches the practiced structure (`am / going / to / not / going to`) -> **CORRECT** with that single `focus`. Transcript empty, very short (< 40% of target words), low confidence (segment `avg_logprob < -0.7` or `no_speech_prob > 0.5`), or >= 60% of words differing with no dominant error -> **UNCERTAIN**. A totally different but confidently transcribed sentence -> **CORRECT** with the highest-value structure word as focus.
   - Focus priority: structure words of the day (`am`, `going`, `to`, `not`) > verbs > other content words.

4. **Client (`src/routes/practice.tsx`, `Rep2Copy` only)** — new `src/components/fluency/Rep2Feedback.tsx` card. Enabled only when `moduleId === "simple-future" && day.day <= 2` (flag in one place, e.g. `isRep2CorrectionEnabled(moduleId, day)` in `rep-structure.ts`). Flow: after `onComplete`, post the blob with the bearer token (same pattern as `countSentences`); show a brief "CHECKING…" state; render the outcome. TRY AGAIN re-opens the recorder (retry counter per chunk, max 2); LISTEN AGAIN reuses the existing `AudioPlayer` for the chunk. Any network/server failure silently falls back to today's behavior (no card). `attempted`/`markAttempted` semantics unchanged so progression and recordings behave exactly as now.

5. **i18n** — add ES/EN strings for the three states and buttons in `src/lib/i18n.tsx`.

6. **QA observability** — a single structured `console.info("[rep2-correction]", {...})` per request with: outcome, `usedFallback`, model(s), latency, and error class (401/403/429/provider). Counters kept in-memory per worker instance and printed in the same line (total, turboOnly, fallback, good/correct/uncertain). No tokens, no audio; transcript logged only as word count, not text.

7. **Tests** — `src/lib/rep2-match.test.ts` covering the 10 QA cases from the brief plus the 2-sentence Future chunks and contraction equivalence; endpoint smoke checks for 401, 403 (Day 3 / other module), 413, 415, 429, and a real spoken sample (synthesized via the existing TTS speech endpoint) hitting Groq.

## Not changed

Rep 1/3/4/5, Test Ready, `/api/sentence-count`, `/api/tts`, recordings/cloud sync, curriculum files, progression, 66-Day Habit, Coach Check, quota RPC/tables (new key `rep2-correction` reuses the existing `consume_ai_quota` mechanism — no migration).

## Technical notes

- Groq endpoint: `https://api.groq.com/openai/v1/audio/transcriptions` (OpenAI-compatible multipart). Header `Authorization: Bearer ${process.env["GROQ_API_KEY"]}` read inside the handler.
- The route is a TanStack file route (`src/routes/api/...`), same as the two existing API routes; `route-auth.server.ts` is loaded via dynamic import inside the handler.
- Confidence thresholds live as named constants in `rep2-match.ts` so QA can tune them without touching the endpoint.
