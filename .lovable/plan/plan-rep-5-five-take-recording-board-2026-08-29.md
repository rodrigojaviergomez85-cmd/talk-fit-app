# Plan: Rep 5 — Five-take recording board

## Goal

Replace the current "record → review last take" screen in Rep 5 with a board that always shows five take slots (TAKE 1–5), keeps every recording playable, and lets the learner pick which take becomes the saved Final Rep.

## Current state

`Rep5FinalRep` in `src/routes/practice.tsx` shows a single recorder; after each take it swaps the screen for a review panel with only the latest recording and a "use this as my final rep" button. Previous takes are stored in `attempts` but never shown.

## New Rep 5 behavior

Header stays: `REP 5 OF 5 · YOUR TURN`, goal 35–45 seconds, message "Record it. Listen. Try again." (with Spanish).

Five stacked cards (grid on wide screens):

- TAKE 1, TAKE 2, TAKE 3 — required
- TAKE 4, TAKE 5 — subtle OPTIONAL tag

Card states:

- **Locked** (previous take not recorded): dimmed, label only.
- **Empty / active**: "Ready to record", large RECORD button, target 35–45 sec, live timer, 90 s hard cap.
- **Completed**: `TAKE n ✓`, duration in seconds, waveform bar, PLAY / STOP / DELETE, and `USE AS FINAL` (or `FINAL REP ✓` when selected). Only one card at a time can hold the final flag. Only one take plays at a time.

Deleting a take clears that slot so it can be re-recorded; later takes stay untouched.

## Progression and finishing

- After 3 required takes: banner `3 REQUIRED REPS COMPLETE ✓`.
- Final take defaults to the newest completed take but the learner can switch to any completed take.
- Bottom area: `FINAL REP SELECTED ✓` plus primary button `COMPLETE TODAY'S PRACTICE`; secondary `RECORD ANOTHER TAKE` while slot 4 or 5 is free. Cards stay visible until the learner completes the day.
- Completing calls the existing `finish()`: the chosen take is the final recording, take 1 remains the "first" recording for comparison, seconds and rep count come from the recorded takes.

## Not included

No transcription, grammar/pronunciation correction, scores, or AI feedback anywhere in Rep 5. Reps 0–4, the day intro, day completion screen, Home, Progress and Recordings are unchanged.

## Technical notes

- New `src/components/fluency/TakeBoard.tsx` holding the five slots, one shared `HTMLAudioElement` for playback, and a small CSS waveform.
- `Rep5FinalRep` in `src/routes/practice.tsx` becomes a thin wrapper around it; `attempts` state moves to a sparse `(Recording | null)[]` of length 5 so deletes are possible, with `finish()` adjusted accordingly.
- Reuse `VoiceRecorder` (targetSeconds, maxSeconds 90) inside the active card; styling uses existing tokens (navy/orange/white).

## Verification

Typecheck, `/practice?day=1` loads, and a mobile Playwright run recording takes 1–3, deleting one, re-recording, switching the final take, and completing the day.
