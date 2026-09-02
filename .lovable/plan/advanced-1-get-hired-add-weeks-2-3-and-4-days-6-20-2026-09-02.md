# ADVANCED 1 — GET HIRED · Add Weeks 2, 3 and 4 (Days 6–20)

Curriculum content extension only. Week 1 (Days 1–5, every `a1d1-*`…`a1d5-*` id, images, sprints, copy) stays byte-identical. Days 6–20 are appended to the same `advanced-1` module using the exact builders, turn helper, question bank and Rep 5 architecture Week 1 already uses. No engine, UI, auth, sync, progress, placement, habit, badge, Test Ready or other-module changes.

## What the learner gets

```text
ADVANCED 1 — GET HIRED (20 days)
  WEEK 1  Tell Your Story & Get Hired        Days 1–5   (unchanged)
  WEEK 2  Prove What You Can Do              Days 6–10  SITUATION → ACTION → RESULT → LESSON
  WEEK 3  Answer the Hard Questions          Days 11–15 calm, professional answers under pressure
  WEEK 4  Perform Under Job Pressure         Days 16–20 recruiter · behavioral · crazy · CS · sales · listening
```

Every day keeps the 5-Rep system: Rep 1 Listen (connected 8-line model, `hideModelText`), Rep 2 exactly 4 chunks of 2 lines (`chunks4`), Rep 3 Shadowing, Rep 4 max 5 prompts with framework cues, Rep 5 fixed prewritten `RolePlayTurn[]` with hidden follow-ups (revealed only after the previous take exists), per-turn `targetSeconds`, cues, and 2 core + 1 stretch Power Chunks. Natural professional American English, Spanish-first instructions (existing `ADVANCED_REP_COPY`). No AI, no generation, no scoring.

### Week 2 — Prove What You Can Do (support visible, cue chips on every turn)
- D6 Tell Me About a Challenge — Rep 5 60–75 s; hidden follow-up "What exactly did you do?" (cues force YOUR action).
- D7 Tell Me About a Mistake — MISTAKE → RESPONSIBILITY → ACTION → LESSON; model owns the mistake, never blames; follow-up "What would you do differently today?".
- D8 A Difficult Person — SITUATION → PROBLEM → RESPONSE → RESULT; follow-up "How did you keep the situation professional?".
- D9 A Time You Helped Someone — NEED → ACTION → RESULT → WHY IT MATTERED; follow-up "Why did your response matter?".
- D10 Behavioral Interview Round — 4 Rounds / 7 turns (challenge, mistake or difficult person, helping someone, pressure) each with one hidden follow-up from the fixed set ("What exactly did you do?", "What happened next?", "What was the result?", "What did you learn?"). Intro never lists the questions.

### Week 3 — Answer the Hard Questions (fewer cues, harder follow-ups)
- D11 Why Did You Leave? — FACT → POSITIVE FRAME → WHAT I WANT NEXT; Rep 4 prompts cover left / want to leave / little experience; follow-up "What are you looking for in your next job?".
- D12 Tell Me About a Failure — FAILURE → RESPONSIBILITY → CHANGE → RESULT; hidden challenge "How do I know you won't make the same mistake again?" with an EVIDENCE cue.
- D13 Why Do You Want to Work Here? — COMPANY → MATCH → VALUE → FUTURE; follow-up "What can you bring to our team?".
- D14 Salary, Schedule & Difficult Conditions — 4 quick recruiter turns (weekends, salary, schedule change, pressure); toolbox "I understand… However… What I can do is…"; no single memorized answer.
- D15 Difficult Recruiter Round — 5 Rounds / 7 turns: why this job → why should I believe you → a failure → what your supervisor would criticize → why shouldn't I hire you, with fixed follow-ups. Objective shown as STAY CALM → ANSWER → SUPPORT → KEEP TALKING.

### Week 4 — Perform Under Job Pressure (unpredictable, context switching, minimal cues)
- D16 Your Professional Story — PAST → PRESENT → FUTURE, 75–90 s; intro explicitly allows study / English journey / projects; follow-up "What was an important turning point for you?".
- D17 Competency Interview — uses the existing `rep5Scenarios` bank (same mechanism as TIGERS/SHARKS finals): 3 prewritten scenarios (solved a problem / learned quickly / worked under pressure), one is picked and persisted per learner on entering Rep 5, each with its own hidden follow-up. Intro shows only the category, never the question.
- D18 Unexpected Recruiter — 3 fixed crazy questions, each with `prepSeconds: 10` think time and the ANSWER → WHY → EXAMPLE → CLOSE `framework`; model shows building, not a perfect answer.
- D19 Role Switch — 5 turns: recruiter "Tell me why you're a strong candidate" → customer "I've called three times…" → "I don't want another apology. I want a solution." → recruiter "Sell me this phone." → one fixed objection ("It's too expensive."). Exposure only.
- D20 Final Job Pressure Simulation — 8 Rounds / 11 turns: intro · behavioral + "What exactly did you do?" · value + "Give me a real example." · area to improve · prewritten crazy question (10 s prep) · listen & respond (audio-only professional situation, no text until answered) · angry-customer switch + follow-up · three-year future. ≈5–7 min total speaking across turns (existing multi-turn slot behavior; no single long recording).

### Difficulty progression
Cue chips on every turn (W2) → cues only on first turn of each Round (W3) → cues only on switch/crazy turns, toolbox only on customer turns (W4). Rep 4 starters get shorter each week. Models never disappear.

### Test Ready (optional, non-blocking, existing types only)
About 3 per week reusing existing sprint kinds: D7 Listen & Repeat, D9 Listen & Respond (coworker asks for help), D10 Mixed; D12 Quick Answers, D14 Listen & Respond (recruiter conditions), D15 Mixed; D16 Describe the Scene, D18 Speak Now (crazy question, 5 s think), D20 Mixed. Nothing on other days.

### Module card / completion
- Card: status becomes "4 Weeks · 20 Days · 100 Fluency Reps"; "More Weeks Coming Soon" removed; sprint line updated to the real count; highlights extended with Weeks 2–4 skills.
- Day 20 now triggers the standard module completion moment (existing `MODULE_COMPLETION`/`NEXT_UP` copy for `advanced-1`, Day 1 vs Day 20 comparison), since the module is fully built. No successor is forced (Advanced is cyclical — existing `nextModuleAfter` rule unchanged).
- Week 2/3/4 completion uses the existing WeekMoment + `ADVANCED_WEEK_REFLECTIONS`.

## Technical details

**New file** `src/services/advanced-1-weeks-2-4-course.ts`
- Exports `ADVANCED_1_WEEKS_2_4_DAYS: CourseDay[]` (Days 6–20) built with the existing `advancedDay` helper imported from `advanced-1-course.ts` (it already stamps `repCopy`, `testReadyOptional`, week metadata) plus `l`, `q`, `chunks4`, `bankQuestion`.
- Ids: `a1d6-1…8`, `a1d6-p1…p5`, `a1d6-turn1…`, `a1d6-tr1…`, `a1d17-s1..s3` (scenarios) — new ids only.
- Imports 15 new scene images `src/assets/advanced-1/scene-d06.jpg … scene-d20.jpg` (generated: adult professional scenes — team problem, owning a mistake, tense customer, helping a coworker, panel interview, resignation talk, learning from failure, company research, schedule negotiation, tough interviewer, career timeline, competency panel, surprised candidate, headset switch, final simulation room).

**Edits (additive)**
- `advanced-1-course.ts`: only append Week 2–4 entries to `ADVANCED_1_WEEKS` (needed so `makeDay` stamps week titles) and export `advancedDay`/`turn`/`RECRUITER`/`CUSTOMER`/`QUICK` (already exported or made exported). Days 1–5 untouched.
- `advanced-question-bank.ts`: add the new recruiter/customer entries (challenge, mistake, difficult person, helped, pressure, left job, failure, why here, conditions ×4, believe you, criticize, why not hire, journey, competency ×3, crazy ×4, cs-calls, sell-phone, phone objection, improve, three-years, listen-situation). Existing entries unchanged.
- `course-service.ts`: `case "advanced-1"` loads both files in parallel and concatenates, same pattern as tigers/sharks.
- `scripts/gen-course-outline.ts`: include the new days; regenerate `course-outline.ts` (outline test enforces consistency).
- `course-index.ts`: `advanced-1` entry → `builtWeeks: 4`, updated `statusLine`, `meta`, `extra`, `highlights`.
- `habit.ts` `SKILL_DAYS["advanced-1"]`: rolePlay adds 6–20, `customerService: [5, 19, 20]`, `sales: [19]` (existing badge architecture only).
- `DayCompleteScreen.tsx`: no logic change; the Week-1-only "coming soon" panel stops rendering automatically once `builtWeeks` is 4. Copy left in place for safety.

**Not touched**: `types.ts`, practice engine, `TakeBoard`, `TestReadySprint`, auth, sync, recordings, placement, `i18n`, EAGLES/TIGERS/SHARKS/Basic files, router/routeTree.

**Verification**: `bun scripts/gen-course-outline.ts` + vitest (outline test, storage-report tests); typecheck; assert Days 1–5 objects are deep-equal before/after; every day 6–20 has 8 lines, 4 chunks, ≤5 prompts, Power Chunks; browser pass at 393 px on D6 (hidden follow-up), D10 (7 sequential turns), D15, D17 (scenario persisted across reload), D18 (10 s think), D19 (recruiter → customer → sales), D20 (11 turns, module completion moment), module card status, Recordings grouping under Weeks 2–4, and unchanged day counts for every other module.
