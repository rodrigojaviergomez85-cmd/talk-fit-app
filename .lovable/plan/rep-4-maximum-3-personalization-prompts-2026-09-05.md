# Rep 4 — Maximum 3 Personalization Prompts

Make Rep 4 a short bridge between Rep 3 (shadowing) and Rep 5 (independent speaking): at most 3 prompts, one at a time, with a small celebration before Rep 5.

## What stays the same (already built)

Rep 4 already works mostly as requested — confirmed in `src/routes/practice.tsx`:

- One prompt visible at a time (never a stacked list of all questions)
- Progress shown as `PREGUNTA 1 DE N` / `QUESTION 1 OF N`
- Learner must record orally before continuing (mic, recording, upload, skip logic untouched)
- Sentence starters, translations, and the "hear the question" audio per prompt

## Changes

### 1. Cap at 3 prompts — `src/routes/practice.tsx`
- Change `REP4_MAX` from `5` to `3` (the existing comment updates too).
- `rep4Items()` already slices to the cap, keeping the first 3 in existing curriculum order — no curriculum data is deleted, and days with fewer than 3 prompts keep all of theirs.
- Progress automatically becomes 1/3, 2/3, 3/3 because it already reads `items.length`; the 4/5 and 5/5 states disappear.
- Completion/progress math (`countFor`, resume-position saving) already uses the capped list, so nothing else needs to change for progress to stay correct.

### 2. Completion moment after prompt 3 — `src/routes/practice.tsx`
- After the learner records the third (final) prompt, instead of a plain "NEXT REP" button show a short completion card:
  - **NICE JOB, CHAMPION 🔥** / "You made it yours." (Spanish-first, bilingual)
  - Primary button: **CONTINUE TO REP 5 →**
- Prompts 1 and 2 keep the normal "NEXT QUESTION →" button — no motivational copy between questions.
- The card replaces only the final forward button; advancing still uses the existing navigation.

### 3. Compact support — `src/routes/practice.tsx`
- Move the cues row and mini Power Chunks into a collapsed `CollapsibleHelp` ("Need a hand? / ¿Necesitas ayuda?") below the prompt card, so the question and the microphone stay visually dominant on every prompt. Support content itself is unchanged — same starters, chunks, cues, translations, one tap away.

### 4. Translations — `src/lib/i18n.tsx`
Add keys (Spanish / English):
- `rep4.done`: "¡BUEN TRABAJO, CAMPEÓN! 🔥" / "NICE JOB, CHAMPION! 🔥"
- `rep4.doneSub`: "Ya lo hiciste tuyo." / "You made it yours."
- `rep4.continueRep5`: "CONTINUAR AL REP 5" / "CONTINUE TO REP 5"
- `rep4.help`: "¿Necesitas ayuda?" / "Need a hand?"

## Out of scope (unchanged)

Rep 1, 2, 3, 5; curriculum data, module/day IDs; Final Rep; Test Ready; recordings outside Rep 4; auth, sync, storage, progress, habit.

## Verification

- Typecheck plus existing tests.
- Browser check on a day with 5 curriculum prompts (e.g. Simple Present) and a role-play day (SHARKS): confirm max 3 prompts, one at a time, 1/3 → 2/3 → 3/3 progress, recording still required, completion card after prompt 3, and a clean path into Rep 5.
