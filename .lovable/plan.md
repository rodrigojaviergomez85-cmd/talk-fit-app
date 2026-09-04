# Simplify Rep 5 — first audio above the fold

Make Rep 5 feel like a conversation: compact header → Turn 1 LISTEN → RECORD, with all support collapsed and no duplicate question/goal clutter. Layout-only change in `src/routes/practice.tsx` (the `Rep5Step` component).

## Changes (role-play days: `day.rep5Turns` exists)

1. **Compact header**: RepHeader label ("PRESSURE ROUND" / label) + day title + one goal line (`N turns · 75–90 sec total`, from `day.rep5Turns.length` and existing goal data). No big goal card.
2. **Hide the duplicate prompt card**: the large `rep5Prompt` question card (lines 1389–1396) renders only when `rep5Turns` is absent — the question already arrives as Turn 1 audio.
3. **Render `TakeBoard` immediately after the header** so Turn 1's LISTEN + RECORD buttons appear above the fold. Future turns stay hidden (existing pressure-round logic untouched).
4. **Consolidate support into the existing single `CollapsibleHelp`** ("¿Necesitas ayuda?"), moved below the TakeBoard, containing (when present): cues/skeleton (`CueRow`, `rep5Skeleton`), `PowerChunks`, `rep5Toolbox`, `rep5Tips`, model example audio/text. Remove the standalone toolbox card, the always-visible CueRow/PowerChunks above the board, and any duplicate goal UI (keep only the one-line goal in the header; drop `GoalChips` from Rep 5 since TakeBoard already tracks time live).
5. **Scene image / StoryStrip**: move inside the collapsible help for role-play days. Keep them visible above the response for non-role-play days where the image is essential (e.g. Describe the Scene).

## Non-role-play Rep 5 days (no `rep5Turns`)

Unchanged flow: `rep5Audio` model, scenario card, main `rep5Prompt` card, goal, record — with support already collapsed. Only verify nothing regresses.

## Do not change

- Curriculum content, turn order, audio text, recording/required-take logic, hidden-turn behavior, Final Rep selection, sentence counting, storage, progress, auth/sync, translations, IDs.
- `TakeBoard.tsx`, `PowerChunks.tsx`, `CollapsibleHelp.tsx` internals (reuse as-is where possible).

## Verify

- Typecheck + vitest.
- Browser check on Advanced 1 Day 2 (pressure round): Turn 1 LISTEN visible without scrolling at mobile viewport, no duplicate question card, one goal line, help collapsed with chunks/toolbox inside.
- Browser check on a non-role-play Rep 5 day (e.g. Basic Zero Day 1) still shows prompt + record.
