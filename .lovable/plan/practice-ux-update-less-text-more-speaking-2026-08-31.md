# Practice UX update: less text, more speaking

Only the practice flow changes. Curriculum, Home, Progress, Recordings, auth, Rep 5 take board and the sentence counter stay exactly as they are.

## 1. Shorter Day intro (Step 0)

The intro screen becomes a fast launch pad: day title, one goal line, one short example with a play button, optional image, and a single big CTA `START FLUENCY REPS`.

Everything longer (the lead paragraph, extra examples, the focus/topic explanation) moves inside a collapsed `HOW IT WORKS / CÓMO FUNCIONA` panel that is closed by default and never blocks the CTA.

No intro copy is rewritten — existing fields are just re-arranged and partly hidden.

## 2. One Spanish control instead of many ES buttons

- The toggle at the top of practice becomes a compact `ES SUPPORT · OFF / ON` pill in the header area, and its state is remembered between sessions.
- With ES SUPPORT off, the screen is English-dominant: no ES chips on instructions, labels, tips or goal lines.
- Individual `ES` taps stay only where they help comprehension: model sentences, Rep 4 questions/starters, Rep 5 main question, story captions. All small UI labels lose their ES button and instead show Spanish only when the global switch is on.

## 3. Progressive scaffolding by day of the week

A support level is derived from the day's position inside its week (day 1 = high … day 5 = minimal). No curriculum data changes.

- High (days 1–2): image + full model sentences + audio as today.
- Medium (day 3): sentences shown as chunks, text collapsed by default in Rep 3.
- Low (day 4): Rep 3/Rep 5 show cues and sentence starters first; full text behind `SHOW TEXT`.
- Minimal (day 5): only images and cue chips are visible by default in Reps 3–5; full text still reachable with one tap.

Days that already set `hideModelText` keep their stricter behavior.

## 4. Rep-by-rep clean up

- **Rep 1 (Listen):** picture + one large play button as the hero; instruction shrinks to one line; `SHOW TEXT` stays collapsed. Skip/Next behavior unchanged.
- **Rep 2 (Copy):** one sentence at a time with counter, image, `LISTEN`, `RECORD`, `LISTEN TO ME`, `NEXT`. Instruction reduced to a short line.
- **Rep 3 (Shadow):** visually distinct (dark shadowing card), speed buttons kept as-is, the sentence block collapses according to support level, one primary action `START SHADOWING`.
- **Rep 4 (Make it yours):** question + starter + cue chips first; the model text is not repeated. Visual choices (variant picker) surface here for days that have them.
- **Rep 5 (Your turn):** keeps the take board, thresholds and counter untouched. The screen keeps one prompt card (question + short tip + goal), the optional example audio, cue chips above the board, and drops duplicated goal/instruction lines.

## 5. Visual sequence for process and story days

A shared `VisualSequence` component renders ordered steps as large numbered cards (`FIRST / THEN / NEXT / AFTER THAT / FINALLY`), horizontally scrollable on mobile, with images when the day has them and cue-only cards when it doesn't. Module 3 story panels reuse it; no new images are generated.

## 6. Language polish

A focused pass over visible lesson copy in Modules 1–3 fixing only clearly unnatural phrasing and pronoun mismatches inside fixed-person lessons (he/his vs she/her). Objectives, grammar focus, sentence counts and difficulty stay the same.

## Technical notes

- New: `src/components/fluency/VisualSequence.tsx`, `src/components/fluency/CollapsibleHelp.tsx`, `src/lib/support-level.ts` (derives level from `day.day` / `day.week`).
- `TranslatableText` gains a `supportOnly` mode so a text can show Spanish under the global switch without rendering its own ES button; `SpanishToggle` becomes the compact ES SUPPORT pill with a persisted preference.
- `src/routes/practice.tsx` is restructured per rep (layout only) — recording, sentence-count, completion and navigation logic untouched.
- All images keep `loading="lazy"` and fixed width/height; no image regeneration at runtime.

## Verification

Typecheck plus a mobile Playwright pass through: Module 1 day 1 and day 5, a Module 2 process day, a present-progressive day, Module 3 simple past, past progressive and the storytelling day, each with ES SUPPORT off and on.
