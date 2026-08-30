# Module 3 — Past Experiences & Stories

Add a third module below Basic Zero and Simple Present. Nothing in Modules 1 and 2 changes: same navigation, visual identity, audio, recording, progress, 5 Fluency Reps, Rep 5 take board, sentence counter, no correction of any kind.

## Structure

20 days, 4 weeks of 5 days, exactly 8 core model sentences per day, recycled across Reps 1–4.

- Week 1 — Simple Past: My Day Yesterday (morning, work, after work, was/were, challenge)
- Week 2 — Other People + Did / Didn't (mom, friend, negatives, Did questions, challenge)
- Week 3 — Past Progressive: What Was Happening? (home, office, park, when-something-happened, challenge)
- Week 4 — Storytelling: Little Red Riding Hood (characters, journey, the wolf, grandmother's house, tell the story)

All eight sentences you specified for Week 1 Days 1–4, Week 2 Days 1, 2 and 4, Week 3 Day 1 and Week 4 Day 1 are used verbatim. The remaining days get 8 sentences written in the same style and context you described.

## Visuals

Images are instructional, not decoration. Three kinds:

1. **Past verb cards** (Weeks 1–2): a new reusable `PastVerbCard` component showing the action image, PRESENT → PAST (WAKE UP → WOKE UP), a play button for the past form and the model sentence, plus optional ES support (despertarse → me desperté). No participles, no conjugation tables. Days show 4–6 cards in Reps 1 and 4.
2. **Negative contrast** (Week 2 Day 3): the same verb image rendered with a crossed-out / dimmed treatment next to the positive one — "She went to work." vs "She didn't go to work." — done in CSS over the existing image, so no extra artwork.
3. **Scenes and story panels**: one large scene per Week 3 day (home, office, park, split before/after for Day 4, a busy street with a sudden event for Day 5), and 8 consistent Little Red Riding Hood illustrations reused all through Week 4.

To keep the artwork consistent and the build reasonable, Weeks 1–2 draw from one shared library of about 24 action images (wake up, get up, shower, get dressed, eat, drink, leave, arrive, meeting, talk, email, help, lunch, finish, go home, watch TV, phone call, housework, go to bed, make breakfast, mall, buy, see a movie, come home) reused across days as the verbs recur — that is the same visual reappearing for the same action, which is what you asked for in Week 2. Week 3 adds 5 scenes, Week 4 adds 8 story panels, all generated in one consistent style.

## Rep 5 goals

Default stays 30+ seconds and 5+ sentences with the existing red/green rules, encouraging ~8 sentences. Week 4 Day 5 only raises the target to 45+ seconds and 8+ ideas; the take board reads the goal from the day instead of the current hardcoded constants, so Modules 1 and 2 behave exactly as today.

## Weeks and completion

Module 3 appears on Home and gets its own page at `/module/past-stories` with the four week groups and COMPLETE / CURRENT / UP NEXT day states, using the existing module page. Week completion panels show your outcome lines ("I CAN TALK ABOUT WHAT I DID YESTERDAY.", etc.) and the module completion screen lists the four weeks plus the six "You can now" capabilities, using only objective data (days, reps, minutes, recording durations, sentence counts).

## Technical notes

- New `src/services/past-stories-course.ts` with week metadata and the 20 days, built like `simple-present-course.ts`; register `past-stories` in `ModuleId` and the `MODULES` array in `course-service.ts`.
- Extend `CourseDay` with optional `verbCards` (image, present, past, sentence, ES) and allow per-day `goalSeconds` / `goalSentences`; `TakeBoard` takes both goals as props instead of module-wide constants.
- New `src/components/fluency/PastVerbCard.tsx`; `practice.tsx` renders verb cards in Reps 1 and 4 for days that have them, keeps the existing `SceneImage` for Week 3 and adds a story-strip layout for Week 4.
- Week 4 Day 5 shows only the story panels and sequencing cues (ONE DAY, THEN, WHILE, SUDDENLY, AFTER THAT, FINALLY) with model text hidden by default.
- Week 2 Day 4 keeps Rep 4 conversational: the app plays a question, the learner records an answer, plus an "ask a question using DID" recording — no correction.
- Images generated into `src/assets/module3/` and imported directly.
- `DayCompleteScreen` gains the Module 3 week/module outcome copy; journey/progress services need no schema change since they are already module-keyed.

## Verification

Typecheck, `/module/past-stories` and a sample of Module 3 practice days loading, and a mobile browser pass through Reps 1–5 of Week 1 Day 1 and Week 4 Day 5 (checking the 45s / 8-idea targets).
