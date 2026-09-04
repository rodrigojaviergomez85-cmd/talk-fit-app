# Simplify Module Day Screen — One Primary CTA

## Goal
Reduce visual competition on the module day screen so the learner sees exactly one dominant orange action: start/continue the Daily Practice. The optional Test Ready Sprint stays visible but is always secondary, and is only actionable after the day's 5 Fluency Reps are completed.

## What changes

### 1. One primary CTA on the current-day card
- `DailyPracticeCard` keeps the large solid-orange CTA at the top.
- Detect whether the current day has a saved, resumable practice session (`PracticeSessionService.load` + `isResumable`).
- Pass an `inProgress` prop to `DailyPracticeCard`.
- Button text:
  - Not started → `START DAY {n}` / `EMPEZAR DÍA {n}`
  - In progress → `CONTINUE DAY {n}` / `CONTINUAR DÍA {n}`
  - Completed → existing `PRACTICE DAY {n} AGAIN`

### 2. Remove duplicate START/CONTINUE in the weekly list
- In `module.$moduleId.tsx`, inside `WeekSection`, remove the large orange `Link` that appears under the current day row (lines ~323–331).
- Keep the `JourneyDayRow` visible and highlighted as `CURRENT`, but it should no longer duplicate the top action.

### 3. Test Ready Sprint becomes secondary
- `TestReadyCard` accepts a new `dayCompleted` prop computed from `JourneyService.isDayCompleted(state, moduleId, item.day)`.
- **Before the day is completed:**
  - Render as a muted/outlined card (no solid-orange).
  - Show informational copy: `DISPONIBLE DESPUÉS DE TU PRÁCTICA` / `AVAILABLE AFTER TODAY'S PRACTICE`.
  - No link / non-interactive or visually disabled.
- **After the day is completed:**
  - Render as a light secondary card with an outline or text button.
  - Primary action copy: `HACER TEST READY →` / `DO TEST READY →`.
  - If already completed: show `TEST READY COMPLETADO ✓` / `TEST READY COMPLETE ✓` and a secondary `REPETIR` / `REPEAT` action.
- Keep the sprint visible at all times so learners know the extra practice exists.

### 4. Visual priority enforcement
- Only `DailyPracticeCard` uses the large solid-orange CTA.
- Test Ready never uses the same button style before or after completion.
- No other orange CTAs compete on the module day screen.

## Files to edit
- `src/components/fluency/DailyPracticeCard.tsx` — add `inProgress` prop and conditional CTA text.
- `src/routes/module.$moduleId.tsx` — load current-day session, pass props, remove duplicate list CTA, update `TestReadyCard` usage.
- `src/lib/i18n.tsx` — add keys for `home.startDay`, `home.continueDay` (if not already present), and Test Ready states: `tr.availableAfter`, `tr.doTestReady`, `tr.completed`, `tr.repeatTestReady`.

## i18n keys to add
- `home.startDay` — `EMPEZAR DÍA` / `START DAY`
- `home.continueDay` — `CONTINUAR DÍA` / `CONTINUE DAY`
- `tr.availableAfter` — `DISPONIBLE DESPUÉS DE TU PRÁCTICA` / `AVAILABLE AFTER TODAY'S PRACTICE`
- `tr.doTestReady` — `HACER TEST READY` / `DO TEST READY`
- `tr.completed` — `TEST READY COMPLETADO ✓` / `TEST READY COMPLETE ✓`
- `tr.repeat` — `REPETIR` / `REPEAT`

## Verification
- [ ] Typecheck passes (`bunx tsgo --noEmit`).
- [ ] Existing tests pass.
- [ ] On a module page, only one large solid-orange CTA is visible before completing the current day.
- [ ] The current-day row inside the weekly list no longer has its own START/CONTINUE button.
- [ ] Test Ready card is visible but muted/disabled before the day's 5 reps are done.
- [ ] After completing the day, Test Ready shows a secondary outline/text action.
- [ ] Completed Test Ready shows "complete" plus a repeat option.
- [ ] Existing progress and Sprint completion data are unchanged.

## Out of scope (do not change)
- Test Ready curriculum, route, or completion data model.
- Daily Practice route, methodology, or recording logic.
- Progress logic, recordings, Final Rep, auth, sync.
- Any module, day, sprint, or content IDs.
