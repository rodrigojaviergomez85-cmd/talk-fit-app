# Show the day's question during Reps 1–3 and the Intro

## What changes for the learner

Today the question the model answers (`day.rep5Prompt`) first appears at Rep 5. A compact **question banner** will now appear:

- **Intro (stage 0)** — right under the DAY X / title / goal card, before START REP 1.
- **Rep 1, Rep 2, Rep 3** — directly below the rep header, above Power Chunks.

The banner (one or two lines, same visual language as the existing Rep 5 "ANSWER" card):

```text
 HOY RESPONDES:                      [RECLUTADOR]
 Tell me about a real experience…     (🔊 hear question)
 Cuéntame sobre una experiencia real…  ← via TranslatableText
```

- Label: `HOY RESPONDES:` / `TODAY YOU ANSWER:` (new i18n key `practice.todayYouAnswer`).
- Question text = `day.rep5Prompt.question`, Spanish = `questionEs` through the existing `TranslatableText` pattern (respects the Spanish-support toggle exactly like Rep 5).
- The existing small ghost `AudioPlayer` (`practice.hearQuestion`, `variant="ghost" size="sm"`, `voice={day.speakerVoice}`) — same as Rep 4.
- Role chip: when the day has `rep5Turns`, the first turn's `label` / `labelEs` (e.g. RECRUITER / RECLUTADOR, CUSTOMER / CLIENTE) is shown as a small pill, same wording the role play already uses. Days without turns show no chip.

Rep 4 and Rep 5 are untouched. Follow-up turns in `rep5Turns` remain hidden — only the label of the first turn is reused, never its text.

## Technical details

- **`src/routes/practice.tsx`**
  - New local component `QuestionBanner({ day })` (accent card, `p-4`, label row + question + ghost audio button). Reads `day.rep5Prompt` (already scenario-resolved by `CourseService.withScenario`, so TIGERS/SHARKS scenario days show the correct question).
  - Insert `<QuestionBanner day={day} />` in `IntroStep` (after the navy title card), `Rep1Listen`, `Rep2Copy`, `Rep3Shadow` (after `RepHeader`, before `PowerChunks`).
- **`src/lib/i18n.tsx`** — add `"practice.todayYouAnswer": ["HOY RESPONDES:", "TODAY YOU ANSWER:"]`.
- No changes to content files, types, ids, `hideModelText`, rep structure, recordings, auth, or sync.

## Verification

On `/practice?day=2&module=advanced-1` (phone viewport, 390×844): banner visible in Intro and Reps 1–3 with that day's question, Spanish translation toggles, question audio button plays, RECRUITER chip shown, and "LISTEN TO THE MODEL" still within the first screen. Also spot-check a Basic Zero day (no role chip) and a TIGERS scenario day. Typecheck + existing tests.
