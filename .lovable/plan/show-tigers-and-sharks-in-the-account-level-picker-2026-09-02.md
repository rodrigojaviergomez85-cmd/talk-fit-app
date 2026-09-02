# Show TIGERS and SHARKS in the Account level picker

## Problem
In Account → "Cambiar mi nivel" (`/level`), the user cannot select INTERMEDIO — TIGERS or INTERMEDIO — SHARKS.

## Root cause (verified)
`src/services/course-service.ts` marks both modules with `hiddenFromPlacement: true` (TIGERS ~line 465, SHARKS ~line 494), and `PlacementPicker.tsx` filters them out:
```ts
const modules = CourseService.modules().filter((m) => !m.hiddenFromPlacement);
```
The `/level` route reuses `PlacementPicker`, so the filter hides them there too. Everything downstream already supports them: `preferences.ts` accepts `"tigers"` and `"sharks"` as valid module IDs, and `CloudSync.changeLevel()` validates via `isModuleId`, which includes both. No backend or data changes are needed.

## Changes
1. **`src/components/fluency/PlacementPicker.tsx`** — add an optional prop `showAllLevels?: boolean` (default `false`). When true, skip the `hiddenFromPlacement` filter and list every module in journey order. The disabled "AVANZADO — PRÓXIMAMENTE" preview stays as-is.
2. **`src/routes/level.tsx`** — pass `showAllLevels` to `PlacementPicker` so the Account change-level page shows BASIC ZERO → SIMPLE FUTURE → SIMPLE PRESENT → SIMPLE PAST → MIXED TENSES → EAGLES → TIGERS → SHARKS.
3. First-time onboarding keeps the current behavior (TIGERS/SHARKS hidden there) since the prop defaults to false — no change to new-user placement.

Existing `place.tigers` and `place.sharks` i18n strings already exist, so both cards get proper Spanish/English descriptions with no new copy needed.

## Out of scope
- No changes to module content, progress data, streaks, badges, or CloudSync logic.
- Selecting TIGERS/SHARKS only sets `current_module_id`; existing learner progress in other modules is untouched (same as changing to any other level today).

## Verification
- Typecheck passes.
- Browser check on `/level`: TIGERS and SHARKS cards appear, selecting SHARKS shows the confirm dialog, confirming updates the current level and Home routes into the SHARKS module.
- Onboarding placement still hides TIGERS/SHARKS.
