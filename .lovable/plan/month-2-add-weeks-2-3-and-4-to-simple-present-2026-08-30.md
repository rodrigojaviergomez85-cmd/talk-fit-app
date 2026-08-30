# Month 2 — Add Weeks 2, 3 and 4 to Simple Present

## Goal

Grow the Simple Present module from 5 days to 20 days (4 weeks), keeping Week 1 exactly as it is today and reusing the existing rep engine, audio, recorder, take board and sentence counter with no changes to their behavior.

## Structure after this change

```text
MODULE 2 · MONTH 2 — SIMPLE PRESENT
  WEEK 1  Simple Present Foundation            Days 1–5   (unchanged)
  WEEK 2  Different People, Different Routines Days 6–10  (new)
  WEEK 3  Explain a Process                    Days 11–15 (new)
  WEEK 4  Present Progressive — What's Happening?  Days 16–20 (new)
```

Every new day keeps the exact same 5 reps (Listen, Copy, Shadow, Make It Yours, Your Turn) and uses one shared set of exactly 8 core sentences across Reps 1–4. Rep 5 keeps the five take cards (1–3 required, 4–5 optional), duration, estimated sentence count, Play / Stop / Delete, the 30+ sec and 5+ sentence red/green indicators, and no grammar, pronunciation or transcript feedback.

## Content to add

### Week 2 — Different People, Different Routines
- Day 6 My Family Member's Routine (mom) — the 8 given sentences; Rep 4 lets the learner swap the person (Mom, Dad, Brother, Sister, Partner, Friend, Other) with the six he/she prompts; Rep 5: "Tell me about a family member's routine."
- Day 7 An Athlete's Routine (Cristiano, presented as an example inspired by a professional athlete, not a verified schedule) — the 8 given sentences, chunks emphasizing He wakes up / eats / trains / exercises / spends / doesn't stay up / takes care of / has; Rep 5: an athlete's routine.
- Day 8 A Superhero's Routine (Superman) — the 8 given sentences and their chunks; Rep 5: a superhero's routine.
- Day 9 A Singer's Routine (Shakira, same "inspired by" framing) — the 8 given sentences; Rep 5: a singer or performer's routine.
- Day 10 Week 2 Fluency Challenge — visual choice cards (Family member / Athlete / Superhero / Singer), a new 8-sentence model reusing Week 2 patterns (not a copy of Days 6–9), Rep 4 with cue-only support (WHO, MORNING, WORK/ACTIVITY, USUALLY, SOMETIMES, DOESN'T, BECAUSE, OVERALL) plus the "ask one question about this person" task with starters and no evaluation of the question.

### Week 3 — Explain a Process
Days 11–14 use the given 8 sentences for How to download an app, Make a pizza, Order food on a delivery app, Make a sandwich, with sequencing chunks First / Then / Next / After that / Finally. Day 15 is the Process Challenge with choice cards (Make coffee, Send a message, Make breakfast, Buy something online, Get ready for work/school), a new 8-sentence model and cue-only Rep 4.

### Week 4 — Present Progressive
Days 16–20: At the Park, At the Beach, At the Office, At Home, and a new unseen scene for the Day 20 challenge (busy city / airport / mall / plaza). Each day gets one generated instructional image stored in the project showing at least 5 (Day 20: 8) clearly separated actions, plus exactly 8 model sentences describing that image. Reps 1–3 show the image alongside the existing listen / copy / shadow flow; Rep 4 shows the image with "What is he/she doing?"-style questions and reduced text support; Rep 5 shows the image while the learner describes the scene.

## Screens

- Home: the Simple Present module now lists all 20 days grouped under the four week headings (the same week grouping Basic Zero already uses), with COMPLETE / CURRENT / UP NEXT states and its metadata updated to 4 Weeks · 20 Days.
- Week completion: after the 5th day of Weeks 2, 3 and 4, the day-complete screen adds a "WEEK n COMPLETE ✓" panel with the week title and objective numbers only (days completed, reps completed, speaking minutes, final recording duration, estimated sentence count).
- Month 2 completion: after Day 20, a screen listing the four completed weeks, the "YOU CAN NOW" capability list, and playback of the saved final recording from each week. No grammar or pronunciation claims anywhere.

## Technical notes

- New `src/services/simple-present-course.ts` holding Weeks 2–4 day data plus week titles; `course-service.ts` keeps Week 1 days as-is, tags them `week: 1`, appends the new days and exposes `weeks` for the module so Home's existing week grouping applies.
- `CourseDay` gains optional `sceneImage` (imported asset + alt text) and optional `variants` (the Week 2/3 challenge choice cards). Practice renders the image in Reps 1–5 when present and renders variant cards at the top of a challenge day; both are additive and invisible on days without them.
- Five images generated into `src/assets/` and imported as ES modules.
- Week/month completion rendering extends `DayCompleteScreen`; `JourneyService` gains small helpers for per-week completed counts and the per-week final recordings. No changes to recording, sentence-count, audio or take-board logic.

## Verification

Typecheck, `/practice?day=6..20&module=simple-present` load checks, and a mobile browser pass over one Week 2 day, one Week 3 day and one Week 4 image day including Rep 5 take recording and the week-complete screen.
