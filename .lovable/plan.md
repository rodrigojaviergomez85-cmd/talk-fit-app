# Plan: Skip/Stop controls in Rep 1 (Listen)

## Goal
In Day 1 (and every day), Rep 1/5 must let the learner either stop the model audio or skip ahead to Rep 2 without waiting for the audio to finish.

## Current state
- `Rep1Listen` in `src/routes/practice.tsx` disables the bottom "NEXT REP" button until `heard` becomes `true` at `onEnd` of `AudioPlayer`.
- `AudioPlayer` already toggles play/pause, so tapping it while playing stops the audio.

## Changes
1. **Always enable the bottom action button** in `Rep1Listen`.
   - While the model audio has not finished: label shows **"SKIP"** / **"SALTAR"**.
   - After the audio finishes (`heard === true`): label shows **"NEXT REP"** / **"SIGUIENTE REP"**.
2. **Keep the existing AudioPlayer pause/stop behavior** — tapping the player button while it says "PLAYING…" stops playback.
3. **Safeguard**: if the user skips before `onEnd`, call `AudioService.stop()` from the skip handler so no audio continues into Rep 2.

## Files to edit
- `src/routes/practice.tsx` (Rep 1 section only)

## Verification
- Typecheck passes.
- `/practice?day=1` loads Rep 1.
- Bottom button is tappable before audio ends and advances to Rep 2.
- Audio stops when skipping.
- After audio finishes, button label changes to "NEXT REP".
