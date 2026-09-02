# ADVANCED 1 — GET HIRED · Week 1 only (5 days)

Adds a new standalone module **ADVANCED 1 — GET HIRED** ("Tell your story. Answer anything. Get the job.") with only **Week 1 — TELL YOUR STORY & GET HIRED** built. Purely additive: no existing module, ID, recording, progress key, habit, badge, or learner position changes.

## What the learner sees

- **Home / Module card**: label AVANZADO · ADVANCED 1 · GET HIRED, promise line, and an honest status: "WEEK 1 AVAILABLE · 5 DAYS · 25 FLUENCY REPS · MORE WEEKS COMING SOON". The old "AVANZADO — PRÓXIMAMENTE" placeholder card is replaced by this card. Module page shows Week 1 only (no empty Weeks 2–4).
- **Access**: selectable from Account → "Cambiar mi nivel" (same path TIGERS/SHARKS use); hidden from first-time placement. No prerequisite: SHARKS completion still shows the ADVANCED "coming soon" next-up preview, it does **not** auto-route learners into Advanced 1. No A1 → A2 → A3 ordering rules anywhere.
- **Same 5-Rep engine**: Rep 1 Listen · Rep 2 Copy (4 chunks, 2 ideas each) · Rep 3 Shadowing · Rep 4 (max 5 deeper prompts) · Rep 5 Pressure Round with **hidden prewritten follow-ups** revealed only after the current answer is recorded. Advanced-specific Spanish-first rep instructions ("ESCUCHA — Escucha cómo se organiza la respuesta", "PIENSA Y RESPONDE", "PRESSURE ROUND — Responde sin memorizar", etc.).
- **Five days** exactly as specified: D1 Tell Me About Yourself (NOW → BACKGROUND → STRENGTH → GOAL; follow-up "…not on your résumé"), D2 Real Experience (SETTING → ACTION → PROBLEM → REACTION → RESULT; follow-up "What would you do differently…"), D3 Why Should We Hire You (CLAIM → EVIDENCE → VALUE; follow-up "Every candidate says they're responsible…"), D4 Greatest Weakness + Goals (WEAKNESS → ACTION → PROGRESS → NEXT STEP; 2 follow-ups), D5 Recruiter Pressure Round (5 Rounds / 8 recorded responses incl. crazy question with 5–10 s think time and the family-tour customer switch).
- **Response lengths**: each turn shows its own target (⚡ QUICK 15–30 s, 🎤 DEVELOP 30–60 s, 🔥 SUSTAIN 60–120 s total) instead of one fixed 90 s goal.
- **Power Chunks**: 2 core + 1 stretch per day, the exact chunks from the spec.
- **Test Ready (optional, non-blocking)**: D2 Listen & Repeat (5 progressively longer natural-speed sentences), D4 Describe the Scene (adult workplace image, 10 s prep, 45–60 s, cues WHO / WHERE / WHAT IS HAPPENING / WHAT MIGHT HAPPEN NEXT), D5 Mixed Sprint shown as "PRÁCTICA EXTRA". Nothing on D1/D3. No Interview Ready schedule copied.
- **Day 5 completion**: "🔥 WEEK 1 COMPLETE — TELL YOUR STORY & GET HIRED" with objective numbers only (5/5 rounds, X responses recorded, X min speaking from real take durations), then the existing ESCUCHA TU SEMANA moment (Day 1 vs Day 5 Final Rep, references only) and an optional self-reflection checklist with the five Spanish options from the spec. No scores, no AI, no coach.

## Technical details

**New files**
- `src/services/advanced-1-week-1-course.ts` — `ADVANCED_1_WEEK_1_DAYS` (5 `CourseDay`s, ids `a1-…` under module id `advanced-1`), `ADVANCED_1_WEEKS` (Week 1 only), built with the existing `makeDay` / `l` / `q` / `chunks4` helpers. Models are the connected texts from the spec; Rep 5 turns are fixed `RolePlayTurn[]`.
- `src/services/advanced-question-bank.ts` — small typed bank keyed by category (`tell_me_about_yourself`, `why_hire_you`, `weakness`, `behavioral_story`, `crazy_question`, `customer_service`, `future_goal`…) holding only the approved Week 1 questions; the day file references it. No rotation logic yet, no generation.
- `src/assets/advanced-1/scene-d01…d05.jpg` + `test-ready-scene.jpg` — 6 generated professional, adult scene images (recruiter interview, first day at work, team, planning, customer desk).

**Module registration (additive edits)**
- `src/lib/types.ts`: add `"advanced-1"` to `ModuleId`; `LearningModule` gets optional `family?: "advanced"`, `cyclePosition?: number`, `builtWeeks?: number` (card status), `repCopy?` override keys. `RolePlayTurn` gets optional `targetSeconds`, `cues`, `prepSeconds`, `round` ({ n, title, titleEs }), `toolbox`, `framework` (used for the CHOOSE → WHY → EXAMPLE → CLOSE mini-structure before Round 4). `TestReadySprint` gets optional `image`; `TestReadyItem` gets optional `kind` (per-item type for the Mixed Sprint). New `TestReadyType` `"describe-scene"`.
- `src/services/course-service.ts`: register module `advanced-1` (order 9, `hiddenFromPlacement: true`, `family: "advanced"`, `cyclePosition: 1`, `builtWeeks: 1`, days = Week 1 only); extend `isModuleId`; remove the `advanced` entry from `UPCOMING_LEVELS` (card replaced by the real module).
- `src/services/preferences.ts` `MODULE_IDS`, `src/components/fluency/PlacementPicker.tsx` key + `src/lib/i18n.tsx` `place.advanced-1` and Advanced rep-instruction strings.
- `src/lib/progress-moments.ts`: `NEXT_UP`, `MODULE_EMOJI` (🎯), `MODULE_COMPLETION` entries for `advanced-1`; `nextModuleAfter` skips `family === "advanced"` targets so SHARKS → ADVANCED preview stays as-is and Advanced 1 itself ends with no forced successor. `INTERMEDIATE_JOURNEY` / 60-day comparison untouched.
- `src/lib/habit.ts` `SKILL_DAYS`: `advanced-1: { rolePlay: [5], customerService: [5], sales: [] }` (existing badge architecture only; no new badge system). Habit day counting is generic — no change.

**Rep 5 engine (backwards-compatible)**
- `TakeBoard.tsx` / `practice.tsx`: when `turns.length > REQUIRED_TAKES`, slot count = `turns.length` and every turn is required (Day 5: 8 turns); otherwise current behavior (2–3 turns + retry slots) is unchanged for EAGLES/TIGERS/SHARKS. Turn cards render Round header, per-turn target, cue chips, optional toolbox, and an optional "PIENSA 10 s" countdown before the mic when `prepSeconds` is set. Follow-up text/audio stays hidden until the previous take exists (existing `showTurn` rule). Takes array sizing in the session service follows the turn count so resume works. Final Rep defaults to Turn 1 ("Tell me about yourself") on Day 5 so the weekly comparison is like-for-like; learner can still change it.
- `RepHeader` reads module `repCopy` overrides for Advanced titles/instructions.

**Test Ready**
- `TestReadySprint.tsx`: add `describe-scene` (image + think countdown + speak timer + cue chips, built on the Speak Now flow) and per-item `kind` so one sprint can mix Repeat / Short Answer / Sentence Build / Listen & Respond / Open Question. Progress keeps using `test_ready_progress` keyed by module + day.

**Completion / Recordings / Peer**
- `DayCompleteScreen` / `WeekMoment`: Advanced Week 1 copy + rounds/responses/minutes summary computed from saved takes; reflection uses the existing per-comparison reflection storage with an Advanced option list.
- Recordings page grouping is already Module → Week; new recordings appear under AVANZADO · ADVANCED 1 — GET HIRED · WEEK 1 — TELL YOUR STORY & GET HIRED. Privacy unchanged.
- Peer Motivation is not present in the codebase today; nothing to wire. When it exists it must key by `module_id + week_id` (`advanced-1` / week 1), never mixed with other modules.

**Verification**: typecheck; browser run of D1 (hidden follow-up), D4 (3 turns), D5 (8 turns across 5 rounds, sequential reveal, think time, customer switch, completion summary), Test Ready on D2/D4/D5 only, module card status, Account level picker shows Advanced 1, placement hides it, SHARKS completion still previews ADVANCED, existing modules' day counts/progress untouched, 393 px viewport with no horizontal overflow.
