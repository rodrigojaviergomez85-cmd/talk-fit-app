# One active module, sequential unlocking

Home becomes CURRENT MODULE → UP NEXT 🔒. Forward progress requires real completion; Advanced stops being cyclical. Nothing about practice, content, ids, recordings, habit, badges, auth or sync changes.

## What was confirmed in the code

- Home (`src/routes/index.tsx`) lists every module card plus a `ContinueCard`; nothing is ever locked (`JourneyService.moduleStatus` comment: "no module is ever locked").
- `nextModuleAfter()` (`src/lib/progress-moments.ts`) deliberately never returns an Advanced module as "next", and `course-index.ts` marks `advanced-1` as `family: "advanced", cyclePosition: 1` with meta "Cyclical Advanced Module". The placement text for Advanced also says "cyclical".
- Change Level (`src/routes/level.tsx` + `PlacementPicker showAllLevels`) lets a learner pick any module, including Advanced, with no prerequisite check.
- `/module/$moduleId` and `/practice?module=` open any valid module id.
- `ADVANCED 2` and `ADVANCED 3` do not exist (no ids, no content). `UPCOMING_LEVELS` is currently empty.
- The saved `currentModuleId` is only set by placement / Change Level; the "current" module on Home is already computed from real progress (`nextPractice`: saved module, then next incomplete module forward).

## 1. Progression rules (one shared helper)

Add a small `progression` helper next to `journey-service.ts`:

- **Ladder** = published modules in display order (Basic Zero → … → Sharks → Advanced 1) followed by two preview-only entries: `ADVANCED 2 — HANDLE & SELL`, `ADVANCED 3 — THINK FAST` (no ids, no days, never routable, never counted in totals).
- **`isUnlocked(state, moduleId)`** is true when any of these holds, using saved day records only:
  - it is the first module of the ladder;
  - the previous ladder module is complete (`moduleComplete`);
  - it is at or before the learner's saved `currentModuleId` (placement / level change) — existing learners keep where they are, nobody is moved backward;
  - it already has at least one completed day (existing records stay reachable).
  Preview entries (Advanced 2/3) are always locked.
- **`activeModule(state)`** = module of `nextPractice(state)` (unchanged logic). **`nextInLadder(state)`** = the ladder entry right after it (module or preview).
- Advanced is now strictly sequential: Sharks → A1 → A2 → A3. Remove `cyclePosition` and the "cyclical" wording (`course-index.ts` meta/comment, `i18n` placement line for Advanced). `nextModuleAfter()` returns the plain sequential next module; after Advanced 1 it returns the Advanced 2 preview (no CTA), so the existing module-completion celebration + NEXT UP card keep working.

## 2. Home

New layout (`src/routes/index.tsx`), keeping `HabitCard` and the four metric tiles exactly as they are:

1. **Current module card** (dominant, navy) — replaces `ContinueCard` + the module list:
   - level label · module title · short subtitle
   - `DAY 7 / 20` · `WEEK 2` (from `nextPractice` + the day outline)
   - progress bar (completed days / total)
   - primary CTA **CONTINUE PRACTICE** → `/practice?module=…&day=…` (keeps today's resume-to-rep behavior and the START DAY 1 wording for a fresh module)
   - small secondary link "See all days" → `/module/$moduleId`
2. `HabitCard` and metrics (unchanged).
3. **UP NEXT 🔒 card** (smaller, muted): label, title, subtitle, line "Unlock after completing TIGERS". Not a link. For Advanced 2/3 previews it also shows COMING SOON.
4. When the whole ladder is done: existing "journey complete" card stays; no UP NEXT.

Removed from Home: the "Your journey" list of all modules and the `UPCOMING_LEVELS` loop. Completed modules stay reachable in Progress (already lists modules) and via My Account → Change Level.

## 3. Guarding forward navigation

- `/module/$moduleId`: if locked, render a locked screen (module heading, lock, "Unlock after completing X", button back to the current module). No day list, no practice links.
- `/practice`: if `module` is locked, redirect to `/module/$moduleId` (which shows the locked screen). Sprints follow the same check.
- Progress page module rows: locked modules show a lock badge instead of UP NEXT; tapping still lands on the locked screen. No other Progress changes.

## 4. Change Level (My Account → My Level)

`PlacementPicker` (showAllLevels mode only; first-time onboarding unchanged):

- Basic and Intermedio modules remain selectable for correction/review.
- **GET HIRED** selectable only when unlocked per the rule above (Sharks complete, or the learner is already placed there / has progress there). Otherwise shown locked with "Unlock after completing SHARKS".
- **HANDLE & SELL** and **THINK FAST** appear as locked rows ("Unlock after completing GET HIRED / HANDLE & SELL"); never selectable — they have no module to open.
- Locked rows are not tappable; `CloudSync.changeLevel` also rejects a locked id as a safety net. Changing level never touches day records or recordings (existing behavior).

## Technical notes

- Files: `src/services/progression.ts` (new), `src/services/journey-service.ts` (use helper in `moduleStatus`, add `"locked"` status), `src/services/course-index.ts` (drop cyclical fields, add the two preview entries to `UPCOMING_LEVELS` with a `unlockAfter` id), `src/lib/progress-moments.ts` (`nextModuleAfter` sequential), `src/routes/index.tsx`, new `src/components/fluency/CurrentModuleCard.tsx` and `NextModuleLocked.tsx`, `src/routes/module.$moduleId.tsx`, `src/routes/practice.tsx`, `src/routes/sprint.tsx`, `src/routes/progress.tsx` (badge only), `src/components/fluency/PlacementPicker.tsx`, `src/routes/level.tsx`, `src/services/cloud-sync.ts` (guard), `src/lib/i18n.tsx` (new keys: `home.currentModule`, `home.upNext`, `home.unlockAfter`, `home.seeAllDays`, `status.locked`).
- No schema, id, recording-key, or progress-key changes. `ContinueCard.tsx` is retired from Home (file removed if unused elsewhere).
- Unit test for the helper: fresh learner, mid-Tigers learner, learner placed at Advanced 1 with no Sharks progress (stays unlocked), Advanced 2/3 always locked, Sharks complete unlocks A1.

## Verification

- Home shows one current-module card + at most one locked UP NEXT; habit card and metrics still render; no full module list.
- Advanced 1 Day-2 learner: Home shows GET HIRED as current, UP NEXT = HANDLE & SELL 🔒 (coming soon).
- Simulated Tigers-mid learner: `/module/sharks` and `/practice?module=sharks` show the locked screen; completing Tigers unlocks Sharks and Home rolls forward.
- Change Level: Advanced rows locked as specified; Basic/Intermedio still selectable; progress untouched after switching.
- Typecheck + existing tests pass; no "cycl" references remain in progression code.
