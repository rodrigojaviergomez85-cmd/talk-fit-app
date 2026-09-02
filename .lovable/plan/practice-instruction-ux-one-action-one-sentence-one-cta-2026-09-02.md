# Practice instruction UX: one action, one sentence, one CTA

Copy and visual-hierarchy-only update inside `src/routes/practice.tsx` (+ strings in `src/lib/i18n.tsx`). No logic, chunking, questions, gating, recording, sync, or curriculum changes.

## 1. Standard bilingual rep header

Upgrade the shared `Instruction` component into a rep header block:

- Action title (uppercase, largest text on screen): ESCUCHA / COPIA / SHADOWING / HAZLO TUYO / TU TURNO.
- One short instruction sentence (5–12 words) underneath.
- Language hierarchy driven by the existing `AppLangProvider`:
  - App language = Spanish → Spanish title + Spanish instruction are primary; English shown small as secondary support (only when it aids learning).
  - App language = English → English primary, Spanish via the existing ES SUPPORT system.
- New strings live in the i18n `DICT`; nothing hard-coded.

Standard copy (Spanish first / English second):

| Rep | Title | Instruction |
|-----|-------|-------------|
| 1 | ESCUCHA / LISTEN | Escucha el modelo. Todavía no hables. / Just listen. Don't speak yet. |
| 2 | COPIA / COPY | Escucha las 2 frases y grábalas juntas. / Listen to the 2 sentences, then record them together. |
| 3 | SHADOWING | Habla al mismo tiempo que el audio. / Speak at the same time as the audio. |
| 4 | HAZLO TUYO / MAKE IT YOURS | Responde con tu propia información. / Answer with your own information. |
| 5 | TU TURNO / YOUR TURN | Habla solo. Conecta 5 ideas o más. (goal sentence count comes from the day when it differs) / Speak alone. Connect 5+ ideas. |

## 2. Per-rep changes

- **Rep 1 (`Rep1Listen`):** replace the current two-variant Instruction with the standard header above the image; audio player stays the obvious primary action; `SHOW TEXT`, skip stay secondary. Remove the duplicate instruction variants.
- **Rep 2 (`Rep2Copy`):** standard header; keep the existing chunk counter, 2-sentence card, LISTEN → RECORD → LISTEN TO ME → NEXT CHUNK flow exactly. No copy beyond the one instruction sentence and the existing "record once to continue" helper. 4-chunk logic untouched.
- **Rep 3 (`Rep3Shadow`):** keep the navy shadowing card; inside it show title SHADOWING, the one-sentence instruction, and a tiny visual cue `🔊 AUDIO + 🗣️ TÚ · AL MISMO TIEMPO / AT THE SAME TIME` (one line, emoji + text). Speed buttons, text toggle, cues untouched.
- **Rep 4 (`Rep4MakeItYours`):** standard header; keep question counter, WH cue chip, question + starter card, hear-question ghost player, record/next flow. Max-5-question logic untouched. No full model answer shown.
- **Rep 5 (`Rep5FinalRep`):** add the standard header above the prompt card; goal chips (30+ sec / 5+ ideas, from the day's own goals) stay right under it. Prompt card, CollapsibleHelp, TakeBoard, completion logic untouched.

## 3. Deduplication audit

- Rep 3's "NEXT REP" button label switches to the existing i18n key `practice.nextRep` (currently hard-coded English).
- Remove redundant helper/paragraph text that repeats the main instruction; optional explanations stay only inside the existing `CollapsibleHelp` ("¿Necesitas ayuda?").
- Skip / translate / help controls keep their current secondary styling.

## 4. Explicitly skipped

- First-time-per-rep-type visual tutorial: skipped to avoid new architecture (allowed by the spec).
- No changes to Rep 2 chunking, Rep 4 question counts, gating, recording, resume, sync, auth, or curriculum.

## Verification

- Typecheck.
- Playwright mobile pass on one day per module: each rep shows the new title + one-sentence instruction with primary CTA visible without scrolling; toggle App Language ES↔EN and confirm Spanish is primary in ES mode and English mode renders correctly; confirm Rep 2 still has 4 chunks and Rep 4 still caps at 5 questions.
