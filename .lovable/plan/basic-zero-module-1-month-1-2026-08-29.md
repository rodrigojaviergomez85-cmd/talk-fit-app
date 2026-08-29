# BASIC ZERO — Module 1 (Month 1)

Add a new first module, BASIC ZERO (4 weeks / 20 days / 5 reps per day), above the existing SIMPLE PRESENT 5-day journey. The Simple Present module keeps its content, screens and behavior; both modules run on the same practice engine, audio system, recorder, Take board and sentence counter.

## Learning path (Home)

```text
MODULE 1 · BASIC ZERO — MONTH 1
Introduce Yourself & Someone Else
4 Weeks · 20 Days · 5 Fluency Reps per day
[ START / CONTINUE BASIC ZERO ]
            ↓
MODULE 2 · SIMPLE PRESENT — 5-DAY FLUENCY JOURNEY
Routines · He/She · Don't/Doesn't · Do/Does
[ START / CONTINUE ]
```

Both modules are always open (days inside each module stay sequential). Basic Zero shows the 4 weeks with their titles and Day 1–20 rows in states COMPLETE / CURRENT / UP NEXT.

## Daily lesson (Basic Zero)

Short intro card (day objective, in English with small Spanish support), then exactly 5 reps:

- REP 1 OF 5 · JUST LISTEN — transcript hidden, LISTEN TO MODEL, then LISTEN AGAIN / NEXT.
- REP 2 OF 5 · LISTEN & COPY — one sentence at a time with natural chunks, listen / record / listen to me / try again / next, small ES option.
- REP 3 OF 5 · SPEAK WITH THE MODEL — full chunked transcript, only SLOW and NORMAL speed.
- REP 4 OF 5 · MAKE IT YOURS — visual cues (NAME, AGE, COUNTRY, CITY, COLOR, FOOD, HOBBIES, PERSONALITY) with optional spoken starters, no typing.
- REP 5 OF 5 · YOUR TURN — the existing five-card Take board: TAKE 1–3 required, TAKE 4–5 optional, play / stop / delete, waveform, USE AS FINAL, `3 REQUIRED REPS COMPLETE ✓`, TODAY'S GOAL 30+ sec · 5+ sentences, time and sentence indicators red under goal / green at goal, using the current sentence-count service. No grammar, pronunciation, scores or transcripts anywhere.

Each day is built on exactly 8 core sentences reused across Reps 1–4 and personalized in Reps 4–5. Spanish support is strongest in Reps 1–2 and reduced in Reps 3–5.

## Content — 20 days

- Week 1 · Tell Me About Yourself — Foundation (Days 1–5): 8 basic frames (name, age, country, city, color, food, hobbies, personality). Day 1 Carlos, Days 2–4 different people, Day 5 My Introduction Challenge.
- Week 2 · Tell Me About Yourself — Fluency (Days 6–10): the 8 connected frames with `and`, `because`, `also`, `in my free time`, `overall`. Day 10 final challenge (~8 sentences, 30–45 sec).
- Week 3 · Tell Me About Someone Else — Foundation (Days 11–15): the 8 `This is my… / His / Her…` frames — sister, brother, mother or father, friend, someone important.
- Week 4 · Tell Me About Someone Else — Fluency (Days 16–20): the 8 richer frames with connectors; Day 20 = final challenge with both parts (about yourself, then about someone else), minimal cues, same Take board and counter.

Every day has its own 8 English sentences with Spanish translations, speaking chunks, Rep 4 cues and starters, and a model example for the audio. No formal grammar teaching (no do/does, don't/doesn't, third-person rules).

## Completion

After Day 20: `BASIC ZERO COMPLETE ✓ — MONTH 1 · 20 DAYS COMPLETE`, what the learner can now do, total practice time, total reps, final recording duration and sentence count, and an EARLY vs FINAL recording comparison ("LISTEN TO YOUR PROGRESS"). Below it, an UP NEXT card opening the existing Simple Present module.

## Progress screen

Per module: days completed, current streak, total fluency reps, speaking minutes, and the list of final recordings (day, title, seconds, sentence count, PLAY). Objective data only.

## Technical notes

- `src/services/course-service.ts` becomes module-aware: a `LearningModule` type (`id`, `title`, `subtitle`, `months/weeks` metadata, `days`) and two modules — `basic-zero` (20 `CourseDay` entries grouped in 4 weeks) and `simple-present` (the current 5 days, unchanged). Basic Zero content lives in a new `src/services/basic-zero-course.ts` to keep files small.
- `CourseDay` gains optional `week`, `weekTitle`, and `hideTranscriptInRep1`; `DayRecord` gains optional `sentenceCount` and `moduleId`.
- `src/routes/practice.tsx` accepts a `module` search param (default `basic-zero`, existing `/practice?day=n` links keep working as Simple Present via an explicit `module=simple-present` link from Home). Rep 3 speed control is reduced to SLOW / NORMAL for Basic Zero days; the rest of the rep components are reused as-is.
- `src/services/journey-service.ts` stores progress per module (`days` keyed by `moduleId:day`, with per-module streak/reps/minutes derived), migrating the existing local key so current Simple Present progress is preserved. Cloud sync adds a `module_id` column to `day_progress` (default `simple-present`) plus a matching unique constraint, keeping current rows valid.
- Home, Progress, Recordings and the day-complete screen read the active module; the Simple Present screens keep their current copy.
- Visual language unchanged: navy / orange / white, rounded cards, large mic and touch targets, cards stacked on mobile and gridded on wider screens.

## Verification

Typecheck, `/practice?module=basic-zero&day=1` through all 5 reps in a mobile browser run (record a take, check time and sentence indicators, delete, select final, complete the day), plus a check that Simple Present Day 1 and existing saved progress still work.
