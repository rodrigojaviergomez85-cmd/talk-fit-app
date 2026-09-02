# Faster Daily Practice: Rep 2 in 4 chunks, Rep 4 capped at 5 WH questions

## Current state (verified)

- All 80 days keep 8 core model lines, except Simple Present Day 4 (16 lines: 8 question/answer pairs) and Day 5 (10 lines).
- Rep 2 today runs one listen → record → next cycle per line (8 cycles on a normal day).
- Rep 4 today shows every prompt: 8 prompts on all 60 days of Basic Zero, Past Stories and Simple Future; 4–8 on Simple Present. Many are yes/no or "What…" repeats rather than varied WH questions.
- Saved position stores `stage`, `subIndex`, `attempted[]`, `skipped[]` with item keys `r2:<lineId>` / `r4:<promptId>`.

## Part 1 — Rep 2: 8 sentences → 4 recording chunks

- Group the day's lines into chunks of 2 at runtime (no content rewrite). 8 lines → 4 chunks; 10 lines → 5 chunks.
- Q/A days (Simple Present Day 4): one chunk = 2 question+answer pairs (4 lines), still 4 chunks.
- Optional per-day override `rep2Chunks` in the day type for any future special lesson.
- New Rep 2 screen: `REP 2 DE 5 · COPY`, `CHUNK 1 DE 4`, both sentences in one card, ESCUCHAR (plays both sentences as one audio), GRABAR (limit raised 20s → 30s), then ESCUCHARME / REPETIR, and SIGUIENTE CHUNK.
- Gating unchanged: next chunk disabled until one recording; secondary link `SALTAR ESTE CHUNK` marks the chunk skipped.
- Rep 1, 3 and 5 untouched.

## Part 2 — Rep 4: 3–5 relevant WH questions per day

- Hand-curate the `prompts` list of every day in the four course files down to 3–5 WH questions chosen for that topic (WHERE / WHEN / WHO / WHAT / WHY / HOW / HOW OFTEN as natural), each with a short starter. Example, Simple Future Day 1 "Tonight": WHAT time are you going home? · WHAT are you going to eat? · WHO are you going to be with? · WHAT are you NOT going to do? · HOW is tonight going to be?
- Yes/no and duplicate "What…" prompts are merged or dropped; nothing is added as filler. Basic Zero Week 1 identity days keep their most useful 5 (name, from, live, favorites, describe yourself).
- Story-sequencing days (Past Stories Week 4) and challenge days keep their instructional purpose but are trimmed to max 5 prompts.
- Runtime safety cap: Rep 4 never shows more than 5 items even if a day still has more.
- UI tweaks only: show the WH word as the cue chip above the question (`WHERE?`, `WHO?`…), counter reads `PREGUNTA 1 DE 5`, labels ESCUCHARME / VOLVER A GRABAR / SIGUIENTE PREGUNTA. Scene image / keywords stay; no full model answer is shown. Gating + `SALTAR ESTA PREGUNTA` unchanged.

## Part 3 — Persistence and legacy sessions

- Rep 2 now persists chunk index in `subIndex` and chunk ids in `attempted` / `skipped` with a new key prefix `r2c:<firstLineId>`. Rep 4 keeps `r4:<promptId>`.
- No backend or schema change: same `practice_sessions` columns.
- Legacy detection on load: a session at stage 2 whose keys use the old `r2:` prefix (or whose `subIndex` exceeds the chunk count) is mapped: `chunkIndex = floor(oldSentenceIndex / 2)` (old index 5 → Chunk 3), and a chunk counts as attempted if any of its lines was attempted. Stage 4 sessions pointing past the new 5-item cap are clamped to the last question. Nothing is erased.
- Resume screen shows `REP 2 · CHUNK 3 DE 4` / `REP 4 · PREGUNTA 2 DE 5`.

## Part 4 — Lightweight rep timing (pilot analytics)

- Track wall-clock seconds per rep in the practice screen (`rep1…rep5`, plus total) and store them on the day record via one new nullable `rep_durations jsonb` column on `day_progress`. Existing `practice_seconds` (recorded audio) is preserved. Not shown to learners.

## Technical details

- `src/routes/practice.tsx`: `rep2Chunks(day)` helper; `Rep2Copy` takes a chunk; `subTotal`, `currentItemKey`, `ResumeScreen`, `countFor` use chunks; `rep4Items` slices to 5; legacy mapping applied where `resume` is restored; rep timers via `useRef` on stage change.
- `src/services/practice-session.ts`: `itemKey` gains `"2c"` variant; add `migrateLegacyRep2(session, day)` helper.
- `src/lib/types.ts`: optional `rep2Chunks?: string[][]` on `CourseDay`; `rep4Durations` on `DayRecord`.
- `src/lib/i18n.tsx`: new strings (chunk labels, skip chunk, repeat, re-record).
- Course files (`basic-zero-course.ts`, `simple-present-course.ts`, `past-stories-course.ts`, `simple-future-course.ts`): edit only `prompts` arrays (and `challenges` where >5). Lines, intros, Rep 5 prompts, model examples untouched.
- Migration: `ALTER TABLE public.day_progress ADD COLUMN rep_durations jsonb;` plus `journey-service`/`cloud-sync` write it when present.

## QA

1. Simple Future Day 1 Rep 2 shows 4 chunks of 2 sentences; next disabled until a recording; skip marks chunk.
2. Simple Present Day 4 shows 4 chunks of 2 Q/A pairs; Day 5 shows 5 chunks.
3. Every day's Rep 4 has 3–5 prompts (script check over all 80 days).
4. Exit at Chunk 3, reopen → resumes at Chunk 3.
5. Seed an old-style session (`stage 2, subIndex 5, r2:` keys) → resumes at Chunk 3 without loss.
6. Rep 1, 3, 5, final rep, sentence counter and Day Complete screen behave exactly as before.
