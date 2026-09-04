# Faster intro before Rep 1 — short teaching for BASIC, near-zero for higher levels

Layout-only change to the Step 0 intro screen in practice. No curriculum text, IDs, Rep 1–5 logic, recordings, progress, Test Ready, auth or sync are touched.

## What the learner sees

### BASIC (Basic Zero, Basic 1, Basic 2)

One compact card, then the button:

```text
DAY 3 OF 20 · WHAT COULD HAPPEN NEXT?
Hoy usarás MIGHT y COULD para hablar de posibilidades.   (lead, Spanish shown by default)

  He might move to another country.
  He could find a better job.
  He might move because he wants a new experience.        (max 3 examples)

TODAY: Talk about at least 3 possibilities.  · 75–90 sec (one goal line)

[ START REP 1 ]
```

- Lead explanation is visible (not hidden inside "Cómo funciona") because that is the 20–30 second teaching.
- Spanish (lead, goal, title) is shown when ES support is on, as today.
- No separate "Hoy respondes" question card, no goal chips, no image above the button.

### BASIC 3 / BASIC 4 (Simple Past, Mixed Tenses)

Same card, but only the first 2 examples visible and the lead shown in English with Spanish under the ES toggle (supportOnly). Still one goal line.

### EAGLES

Title + goal line + the day's Power Chunks as a single chip row (the "communication structure" reminder). No lead paragraph, no examples above the button.

### TIGERS / SHARKS

Title + goal line + framework chips (`day.focus` steps / cues) only.

### ADVANCED

Title + one goal line + START. Nothing else above the button.

### Below START REP 1 (all levels)

One collapsed **"Más ayuda / More help"** section containing whatever was removed from above: remaining examples, the lead (where hidden), the day question (formerly the separate banner), decorative scene image / story strip, focus/topic line. Today's Past Verbs (Verb Bank preview) stays below the button as it already is, unchanged.

Essential images: the intro keeps `sceneImage` above the button only for days where the picture is the task (`day.sceneImage` AND the module is BASIC AND the day's lines depend on it — i.e. Present Progressive scene days). Everything else moves into the help section.

## Technical details

- `src/lib/rep5-support.ts` → add `introTier(moduleId)` returning `"basic-low" | "basic-high" | "eagles" | "spontaneous" | "advanced"` (basic-zero / simple-future / simple-present = basic-low; past-stories / mixed-tenses = basic-high; reuse existing mapping for the rest). Rename nothing existing.
- `src/routes/practice.tsx` `IntroStep`:
  - Single navy card: DAY x OF y, title, lead (tier-dependent visibility), up to N examples (3 / 2 / 0), one goal line built from `intro.goal` (+ `goalSeconds` range if not already in the text), then `PrimaryButton`.
  - Remove `QuestionBanner`, `SceneImage` (except essential case), `GoalChips`, and the standalone first-example card from above the button.
  - EAGLES: render `<PowerChunks chunks={day.powerChunks} size="mini" />` inside the card; TIGERS/SHARKS: cue chips from `day.cues`.
  - After the button: `<CollapsibleHelp label="More help" labelEs="Más ayuda">` with remaining examples, lead when hidden, `QuestionBanner`, `SceneImage`/`StoryStrip`, focus · topic.
- `src/lib/i18n.tsx`: add `intro.today` ("HOY:" / "TODAY:") and `intro.moreHelp` labels.
- `TodaysPastVerbs` call site stays after `IntroStep` (already below the button).

## Verification

Phone viewport (390×844), ES support on and off: Basic Zero D1, Simple Present D2 (current route), Past Stories D3, Eagles D1, Tigers D1, Advanced D1 — START REP 1 within the first screen for BASIC, first screen with room to spare for higher levels; no duplicated question/goal; help section collapsed below; Verb Bank still present on Module 3. Typecheck + existing tests.
