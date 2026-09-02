# Expand EAGLES from a 5-day pilot to a full 4-week / 20-day module

## What exists today (verified)

- One module with internal id `eagles-week-1` (in `course-service.ts`, `types.ts`, `preferences.ts`, `i18n.tsx`, `PlacementPicker.tsx`). Progress, sessions and recordings are keyed by `module_id + day number (1–5) + take_number`. Line/prompt/turn IDs use the `e1-…`…`e5-…` prefix.
- `eagles-week-1-course.ts` exports `EAGLES_WEEK_1_DAYS` (d1–d5) and `EAGLES_WEEK_1_WEEKS` (only week 1). `makeDay()` hard-codes `week: 1`.
- Module metadata says "Week 1 · 5 days", meta `["5 Days", "25 Fluency Reps", "5 Test Ready Sprints"]`, `pilot: true`.
- `CourseService.totalDays()` / `totalDaysAll()` are already dynamic (`days.length`), so Progress, Home, DayComplete and the module page will show `x / 20` automatically once days are added.
- Existing infra already supports everything the new days need: `rep2Chunks`, `powerChunks` (core + stretch), `rep5Turns` (fixed prewritten role-play turns played one at a time), `rep5Toolbox`, `rep5Audio`, `testReady` with types `repeat | quick-answers | build-sentence | listen-respond | speak-now`.
- Missing: a `story-retell` Test Ready type (needed for Day 10) and a module-completion screen (DayComplete only shows a self-assessment on the last day).

## Data safety (no ID changes)

- Keep module id `eagles-week-1`, `EAGLES_WEEK_1_DAYS` / `EAGLES_WEEK_1_WEEKS` export names, days 1–5 untouched byte-for-byte in content and IDs (`e1-*`…`e5-*`, `e4-turn*`, `e*-tr*`).
- New days are appended as day numbers 6–20 in the same module, with new ID prefixes `e6-*`…`e20-*`. No migration, no backfill, no storage path changes. A learner at Week 1 · Day 3 · Rep 4 stays exactly there; 3 completed days show `3 / 20`.
- `week` on each day becomes data-driven (`Math.ceil(day / 5)`) instead of the hard-coded `1`; Week 1 days still resolve to week 1.

## Module display (`course-service.ts`)

- `label: INTERMEDIO`, `title: EAGLES`, subtitle `ENGLISH FOR WORK & REAL CONVERSATION` (es: `INGLÉS PARA EL TRABAJO Y CONVERSACIÓN REAL`).
- `statusLine`: `4 semanas · 20 días`; `meta`: `["4 Weeks", "20 Days", "100 Fluency Reps", "Test Ready Sprints"]`; `extra`: 20 Test Ready Sprints; `cta`: `EMPEZAR EAGLES`. Highlights updated to Connect / Solve / Justify / Adapt outcomes.
- `weeks` array gets 4 entries (Week 1 title "Recommend, Advise & Sell" kept verbatim):
  - W2 UNDERSTAND, CLARIFY & SOLVE — SOLVE
  - W3 COMPARE, EXPLAIN & CHOOSE — JUSTIFY
  - W4 HANDLE, PERSUADE & CLOSE — ADAPT
- Keep `pilot: true` semantics only where it affects placement/"next module" logic; the visible "PILOTO" badge is removed since the module is now complete (nothing else about journey ordering changes). Placement copy for EAGLES in `i18n.tsx` updated to reflect 20 days.

## Content: 15 new days (`eagles-week-1-course.ts`, data only)

Every day follows the spec exactly: connected 8-line model (bilingual, `|` chunk markers), `rep2Chunks` = 4 chunks × 2 lines, 3–5 Rep 4 prompts with starters/cues, Rep 5 prompt + goal seconds + goal ideas, 2 core + 1 stretch power chunks (reusing the high-value set: because / however / overall / as a result / on the other hand / based on what you've told me / if I understand correctly / in that case / here's what I can do / the main reason is / one advantage is / from what I understand), and a separate Test Ready sprint. Support progression and Spanish instructions already come from the shared practice engine.

| Day | Title | Grammar / Job Ready | Rep 5 | Test Ready |
|---|---|---|---|---|
| 6 | Then & Now | Past + present progressive (film set split visual) | Compare yesterday vs now · 45–60s · 6–8 ideas | Repeat It (5 growing sentences) |
| 7 | Have You Ever…? | Present perfect (difficult experiences) | Difficult experience · 45–60s | Quick Answers (6) |
| 8 | What Have You Been Doing Lately? | Present perfect progressive | Preparing for a better job · 50–60s · 7–8 | Build the Sentence (5) |
| 9 | Solve the Problem — CS #1 | Past / PP / PPP · Acknowledge→Clarify→Solve→Confirm | Fixed 3-turn internet role play · 60–75s total | Listen & Respond |
| 10 | Solve a New Problem | Transfer: delayed package | Fixed 3-turn package role play · 60–90s · 8–10 | Story Retell (new type) |
| 11 | Before & Now | Used to | My life before vs now · 60s · 8 | Repeat It |
| 12 | Which One Is Better? | Short comparatives (bike vs car) | Compare two options & choose · 60s · 8 | Quick Answers |
| 13 | Compare Your Options | Long comparatives (home vs office) | Compare & explain decision · 60–75s | Build the Sentence |
| 14 | What's the Best Option? | Superlatives (3 job offers) | Decide and defend · 60–75s | Listen & Respond |
| 15 | What Makes a Great Employee? | Simple present review | Ideal employee · 60–90s · 8–10 | Speak Now (10s think) |
| 16 | My Future Career | going to / will (review) | Future career · 60–75s | Repeat It |
| 17 | What Have You Achieved? | Present perfect (already / yet / so far) | Achievements + goals · 60–75s | Quick Answers |
| 18 | What Have You Been Working Toward? | Present perfect progressive | Progress + next step · 60–75s | Build the Sentence |
| 19 | Handle an Upset Customer — CS #2 | Acknowledge→Summarize→Own→Solve→Confirm | Fixed 3 escalating turns (incl. cancel threat) · 60–90s | Listen & Respond |
| 20 | Consultative Sales Challenge — Sales #2 | Discover→Compare→Recommend→Handle objection→Close; Plan A/B/C cards | Fixed 4 turns · 75–90s · 10+ ideas | Speak Now (10s think, 60s) |

Role plays (Days 9, 10, 19, 20) use the existing `rep5Turns` mechanism: prewritten, played sequentially, future turns hidden until reached, no AI. Day 20 plan cards and Day 14 job-offer cards reuse the existing `storyPanels`/`sceneImage` visual slots. Rep 4/5 show power chunks only as small support chips (existing behavior).

## Visuals

Generate ~18 new adult, modern, professional images under `src/assets/eagles/` (film set split "yesterday 10:00 vs right now", difficult-experience cues, job-prep scene, internet-problem customer, delayed-package customer, before/now habits, bike vs car, home vs office, 3 job-offer cards, great-employee scene, future career, achievements, progress, upset customer, 3 internet plan cards). Used as speaking triggers, not decoration.

## Small engine additions (minimal)

1. **`story-retell` Test Ready type** — add to `TestReadyType` in `types.ts`; in `TestReadySprint.tsx` render like Listen & Respond (play a 25–35s passage once) followed by one 30–45s open recording with 4 cue chips (What happened? / What has the customer done? / What has the company done? / What should happen next?). Add its i18n labels.
2. **EAGLES module-complete screen** — in `DayCompleteScreen.tsx`, when `moduleId === "eagles-week-1"` and `moduleDone`, show the "EAGLES COMPLETE · INTERMEDIO · MES COMPLETADO ✓" block: 20 DÍAS / 100 FLUENCY REPS / TEST READY PRACTICE, the 7 "AHORA PUEDES PRACTICAR CÓMO" checkmarks, and "SIGUIENTE PASO: TIGERS · PRÓXIMAMENTE" (no B2 claim).
3. **ESCUCHA TU PROGRESO** — same screen: if the learner has a stored Rep 5 final take from their earliest EAGLES day and from Day 20 (via existing `CloudSync` recordings list), show two `AudioPlayer`s side by side (earliest vs Day 20). No scores, no percentages. Hidden if either is missing.
4. `makeDay()` reads week title/subtitle from the 4-entry weeks array by computed week.

## Out of scope (explicitly not touched)

Other modules' curricula, Rep methodology, Rep 2 chunking rules, Rep 4 max, AI grading/coach, generative customers, DB schema, storage paths, journey/placement logic.

## QA checklist

- Existing EAGLES learner: same module id, same day numbers, same recordings, Resume lands on the same Day/Rep; completed count shows `n / 20`.
- Module page shows exactly 4 week groups, 20 days, no duplicate Week 1.
- Spot-check Days 6, 12, 19: Rep 2 = 4 chunks; Rep 4 ≤ 5 prompts; 2 core + 1 stretch chunks.
- Days 9/10/19/20 role plays: turns appear one at a time, fixed text, no AI calls.
- Every day has a Test Ready sprint reachable from the module day row; Day 10 Story Retell records after the passage.
- Home/Progress totals update dynamically (total days = 120); Basic 0–4 unchanged.
