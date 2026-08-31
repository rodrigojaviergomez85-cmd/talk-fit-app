# Fix Account bug + Home "Continue" + week navigation

Focused update: bugs, Home, navigation. No curriculum, practice, audio, recording, or sentence-counter changes.

## Part 1 — Account/Profile bug (confirmed)

In `src/routes/profile.tsx` the "Days completed" stat interpolates `CourseService.totalDays` without calling it, so React prints the function's source code:
`0 / totalDays(moduleId) { return CourseService.getModule(moduleId).days.length; }`

Fix: compute a real total across the three modules (`CourseService.modules().reduce(...)` = 60) and render `12 / 60`. Also guard every numeric stat so `NaN`/`undefined` never renders (fall back to 0 until progress loads).

Data scoping: progress already comes from local storage plus the signed-in user's own rows (`day_progress` is queried under the user's session with owner RLS). No auth changes. Add a defensive step: clear in-memory journey state on sign-out/user change so a previous session's numbers can't linger on screen.

## Part 2 — Home redesign around one action

New order on Home:
1. **Continue card** (dominant, top)
2. Quick metrics
3. Your journey (modules)

Continue card content, all dynamic from saved progress:
- `CONTINUE YOUR JOURNEY` (or `START YOUR JOURNEY` at zero progress)
- Module · Week · Day line, plus the day's title
- Today's goal chips from the day data (e.g. `30+ sec`, `5+ ideas`)
- Estimated practice time
- One big CTA linking to `/practice?module=...&day=...`

Next-practice logic (shared helper, computed once from the same loaded state): first module in order with incomplete days → its first incomplete day → its week. All three modules complete → `CURRENT JOURNEY COMPLETE ✓` with a link to review. Zero progress → Module 1, Week 1, Day 1.

Quick metrics row (objective only): streak, speaking minutes, days completed `x / 60`, total fluency reps. No scores of any kind.

Your journey: the three module cards in order, each showing days completed / total, a progress bar, and exactly one state badge — `COMPLETE ✓`, `CURRENT`, or `UP NEXT`. Only the current module gets emphasis. Cards keep linking to `/module/$moduleId`.

## Part 3 — Module page week navigation

In `src/routes/module.$moduleId.tsx`, replace the single "All 20 days" block with collapsible week sections:
- Header per week: `WEEK n`, week title, `3 / 5`, state badge.
- Current week expanded by default; completed and future weeks collapsed; any week can be opened manually.
- Existing `JourneyDayRow` cards are reused unchanged inside each week, with a clear `COMPLETE ✓ / CURRENT / UP NEXT` state and a single CTA on the current day.

Back links stay as they are: module → Home, practice → its module.

## Part 4 — Loading and error states

Home and module pages render a skeleton while progress loads instead of momentary zeros, and show `We couldn't load your progress. [TRY AGAIN]` if the cloud pull fails (local progress still renders when available). Progress is loaded once per page and passed down — no per-card refetching.

## Technical notes

- Files touched: `src/routes/profile.tsx`, `src/routes/index.tsx`, `src/routes/module.$moduleId.tsx`, plus a small addition to `src/services/journey-service.ts` for a `nextPractice(state)` helper and a `totalDaysAllModules()` in `src/services/course-service.ts`.
- New presentational component `src/components/fluency/ContinueCard.tsx` and a `WeekSection` block in the module route.
- Routes, route names, and deep links unchanged.
- Mobile-first: continue card above the fold at 393px, touch targets ≥44px.

## QA

Simulated states: brand-new user, mid Module 1, Module 1 complete, mid Module 3, everything complete, and refresh persistence; plus a browser check that no code-like text appears on Account.
