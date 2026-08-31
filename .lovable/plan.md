# BASIC 1 — SIMPLE FUTURE (New Module 4)

A fourth 4-week module added alongside the existing three. Purely additive: no existing module, day, recording, sync, gating or progress behaviour changes.

## What the learner gets

- New module card after PAST EXPERIENCES & STORIES: **BASIC 1 · SIMPLE FUTURE — Talk about plans, decisions and predictions · 4 Weeks · 20 Days · 5 Fluency Reps per Day**, with the same EMPEZAR / CONTINUAR logic as other modules.
- 20 daily practices, each with the existing Rep 1–5 flow (Listen → Copy → Shadow → Make it yours → Your turn), ~8 core model ideas per day, recycled across Reps 1–4.
- Grammar sequence: Week 1 GOING TO first person, Week 2 GOING TO third person (one consistent pronoun per day), Week 3 WILL/WON'T first + third person, Week 4 mixed GOING TO + WILL. Negatives are built into every week's model lines.
- Short week intros (plan / another person / decision-promise-prediction / the contrast card) using the existing intro step — no long grammar pages.

## Week and day map

- **Week 1 — MY FUTURE PLANS**: Tonight · Tomorrow · This Weekend · My Next Vacation · My Plans Challenge
- **Week 2 — THEIR FUTURE PLANS**: My Friend's Weekend (he) · My Mom's Tomorrow (she) · A Busy Person's Weekend · Two Different People (Maria / Carlos) · Their Plans Challenge
- **Week 3 — DECISIONS, PROMISES & PREDICTIONS**: I'll Do It · My Promises · My Predictions · His / Her Future · Will Challenge
- **Week 4 — FUTURE FLUENCY**: Plan or Decision? · My Weekend · Maria's Future · What's Going to Happen? · Future Fluency Challenge

Rep 5 goals: 30–45s / 5+ ideas most days; Week 3 Day 5 ~45s / 6+ ideas; Week 4 Day 5 45–60s / 8+ ideas (using the existing goalSeconds + goalSentences fields). Week 4 Day 5 hides the model text (existing `hideModelText` flag).

## Images

≈40 new adult-friendly, modern instructional images generated into `src/assets/module4/`:

- 20 day scenes (one coherent scene per day) used in Rep 1–3 as the shared visual context.
- ~20 keyword cue cards used in Rep 4 / Rep 5 (tonight, family, study, beach, airport, phone ringing, heavy bags, promise, storm clouds, suitcase, two-person compare, etc.), reused across days where the concept repeats.

Rep 4 shows image + keywords instead of full sentences; Rep 5 shows cues and the question only — no model speech.

## Technical notes

- `src/lib/types.ts`: add `"simple-future"` to `ModuleId`.
- New `src/services/simple-future-course.ts` exporting `SIMPLE_FUTURE_DAYS` and `SIMPLE_FUTURE_WEEKS`, following the `past-stories-course.ts` builder pattern (chunked model lines, prompts, cues, rep5Prompt, modelExample, sceneImage, variants).
- `src/services/course-service.ts`: register the module with `order: 4`, `label: "MODULE 4 · MONTH 4"`; `isModuleId()` accepts the new id. `totalDaysAll()` already sums dynamically, so curriculum totals update on their own.
- Practice, progress, recordings, verb bank, journey, resume, sentence counter, auth and sync code are untouched. `DEFAULT_MODULE` stays `basic-zero`, so existing learner placement is unaffected.
- Week 4 support card (PLAN → GOING TO / DECISION · PROMISE · PREDICTION → WILL) rendered through the existing `CollapsibleHelp` / cue rendering, not a new grammar screen.
- Learning content stays English; Spanish stays behind the existing AYUDA EN ESPAÑOL and ES · TRADUCIR controls.

## Verification

Walk Week 1–4 in the preview to confirm: no WILL in Weeks 1–2, WILL/WON'T targeted in Week 3, mixed forms in Week 4, negatives present each week, Rep 4 keyword-only, Rep 5 model hidden, module list order, and that existing modules and progress are unchanged.
