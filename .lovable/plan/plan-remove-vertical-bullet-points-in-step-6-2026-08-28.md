# Plan: Remove vertical bullet points in Step 6

## Goal
Eliminate the vertical checklist/bullet list shown in Step 6 of the practice flow so the screen feels cleaner and less like a grammar exercise.

## What will change
- In `src/routes/practice.tsx`, inside the `RepSeries` component (Step 6), remove the rounded card that renders `lesson.checklist` as a vertical `<ul>` with empty checkboxes.
- Keep the horizontal cue chips (`CueRow`) and the Excel-style rep tracker (`RepSeriesRow`) intact.
- Keep the recorder, listen/delete actions, and navigation buttons unchanged.

## What will NOT change
- The checklist data in the lesson service remains available if needed later.
- No other steps or components are affected.

## Verification
- Run TypeScript typecheck.
- Open `/practice`, advance to Step 6, and confirm the vertical bullet list is gone while cues and the rep tracker remain visible.
