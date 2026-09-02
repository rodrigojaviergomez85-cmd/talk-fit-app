# BASIC 4 — MIXED TENSES & QUESTIONS (New Module 5)

A fifth 4-week module added after BASIC 1 — SIMPLE FUTURE. Purely additive: no existing module, practice logic, gating, sync, auth, progress or recordings code changes.

## What the learner gets

- New module card: **BASIC 4 — MIXED TENSES & QUESTIONS · Habla del pasado, presente y futuro · 4 Weeks · 20 Days · 5 Fluency Reps per Day**, same EMPEZAR / CONTINUAR behaviour as the other modules.
- Module page header shows the Spanish promise and the five-line "En este módulo practicarás cómo…" checklist (hablar de lo que haces / contar lo que pasó / hablar de tus planes / hacer y responder preguntas / cambiar de tiempo al hablar) plus 4 SEMANAS · 20 DÍAS · 100 FLUENCY REPS.
- 20 daily practices using the existing Rep 1–5 flow with the current speed optimizations: 8 model lines per day → Rep 2 auto-groups into **4 chunks of 2 connected ideas** (each chunk pairs a tense switch, e.g. "I usually exercise in the morning. / Yesterday, I exercised in the afternoon."); Rep 4 holds **3–5 questions, never more**; Rep 5 hides the full model and asks one prompt.
- A recurring, simple visual timeline (PAST ← YESTERDAY · ● TODAY / EVERY DAY / RIGHT NOW · → TOMORROW / NEXT WEEK) used as the scene image on timeline days, plus YESTERDAY / TODAY / TOMORROW keyword cue cards in Rep 4/5. No grammar charts.
- **Fresh vocabulary rule: no repeated verbs.** Every core verb in this module must be NEW for the learner — not already drilled in Modules 1–4. Excluded (already covered): wake up, get up, get dressed, shower, make breakfast, eat, drink, go to work, work, answer emails, have a meeting, have lunch, talk, say, tell, think, meet, arrive, leave, buy, go home, walk, play, watch TV, do housework, help, come home, find, give, go to bed, visit, study, stay, call.

## Week and day map

- **Week 1 — YESTERDAY & TOMORROW (Past + Future)**: Yesterday, Today & Tomorrow (new verbs like cleaned, cooked, relaxed; travel, rest) · My Future Plans (going to + will review with new contexts: pick up, move, paint) · What I Did Yesterday (new regular -ed verbs: cleaned, cooked, painted, fixed, washed, invited, enjoyed, practiced) — learned by hear/copy/shadow, /t/ /d/ /ɪd/ note lives only in the collapsible help · An Interesting Day (new irregular verbs: drove, slept, wrote, read, swam, spent, forgot, lost) · Last Weekend & Next Weekend challenge.
- **Week 2 — EVERYDAY LIFE**: routines recast around new verbs (run, cook, clean, exercise, drive, practice) rather than work/study repeats; W2D4 Ana's-day audio rewritten with the fresh verbs.
- **Week 2 — EVERYDAY LIFE (Present + Past, future review)**: My Routine (I) · Someone Else's Routine (she, consistent) · What Was Happening? (one large office scene: Maria / Carlos / coworkers / manager, present vs past progressive) · Listen & Respond (Ana's day audio → 5 spoken comprehension questions) · Every Day, Yesterday & Tomorrow challenge.
- **Week 3 — ASK QUESTIONS**: I Was · I Am · I Will Be (to be across time, I + she, with negatives) · Yes / No Questions (answer = yes/no + one extra idea, modelled as Q/A lines) · WH Questions across time · Listen, Understand & Answer (mixed-tense audio → spoken answers) · Interview Challenge.
- **Week 4 — REAL CONVERSATION (transfer)**: My Life: Past, Present & Future · Someone Else's Story (Sofia: worked at a restaurant → works from home → going to study English → I think she'll find a better job) · Ask Me Anything (Sunday questions across tenses) · Real Conversation Challenge (meeting a new coworker, 5 conversational questions) · Mixed Tense Fluency Challenge.

Rep 5 targets (existing `goalSeconds` + `goalSentences` fields):
- Most days: 30–45 s / 5+ ideas.
- W1D1 ~45 s / 6+; W1D5, W2D5: 45–60 s / 8+; W3D5: ~60 s / 8+; W4D4: 45–60 s / 8+.
- **W4D5: 60+ s / 10+ ideas**, model text hidden (`hideModelText`), only YESTERDAY / TODAY / TOMORROW cue cards + "TELL ME ABOUT YOUR LIFE."

Listening days (W2D4, W3D4) are handled with the existing reps: Rep 1 plays the short story as the model audio, Rep 2/3 copy and shadow it, Rep 4 asks the 4–5 comprehension questions to be answered aloud, Rep 5 asks the learner to retell it and add their own version. No multiple-choice anywhere.

## Images

≈30 new images generated into `src/assets/module5/` (adult, modern, instructional):
- 1 shared timeline graphic (past ← today → future) reused on W1D1, W1D5, W2D5, W3D1, W4D1, W4D5.
- ~14 day scenes: weekend plans, regular-verb evening, downtown day, routine (I / she), large busy-office past-progressive scene, Ana at work, interview desk, new coworker at the office, Sofia's timeline strip (3 panels), Sunday scene.
- ~10 keyword cue cards: yesterday, today, tomorrow, every day, right now, next week, last weekend, next weekend, question mark / interview, work, family, gym, restaurant.
Rep 4 uses the questions plus small cue cards; Rep 5 uses cue cards and the prompt only.

## Technical notes

- `src/lib/types.ts`: add `"mixed-tenses"` to `ModuleId`.
- New `src/services/mixed-tenses-course.ts` exporting `MIXED_TENSES_DAYS` and `MIXED_TENSES_WEEKS`, using the same `makeDay` / `l()` / `p()` / `card()` builder pattern as `simple-future-course.ts` (chunked model lines, ≤5 prompts with WH cues and starters, cues, rep5Prompt, rep5Tips, sceneImage, storyPanels, goalSeconds, goalSentences, hideModelText). W3D2 uses `role: "q" | "a"` lines so Rep 2 groups Q/A pairs automatically.
- `src/services/course-service.ts`: register the module with `order: 5`, `label: "MODULE 5 · MONTH 5"`; `isModuleId()` accepts `"mixed-tenses"`. `totalDaysAll()` already sums dynamically, so Home / Account / Progress totals update on their own.
- Small additive field on `LearningModule`: optional `highlights?: { en: string; es: string }[]`; `src/routes/module.$moduleId.tsx` renders the checklist only when present (other modules unaffected).
- No starting-module selector exists in the app (onboarding always starts at the first module), so nothing to add there. `DEFAULT_MODULE` stays `basic-zero`; existing learner placement and records are untouched.
- Practice, progress, recordings, session resume, gating, sentence counter, sync, auth and i18n architecture: no changes. Learning content in English; Spanish only via existing AYUDA EN ESPAÑOL / ES · TRADUCIR.

## Verification

Walk the module in the preview: card and intro appear; W1 mixes past + future; W2 present + past with a large past-progressive scene; W3 yes/no and WH questions across tenses; W4 reads as conversation; every day shows 4 Rep 2 chunks and ≤5 Rep 4 questions; listening days require spoken answers; W4D5 shows 60 s / 10+ ideas with the model hidden; existing modules and completed-day counts unchanged; typecheck passes.
