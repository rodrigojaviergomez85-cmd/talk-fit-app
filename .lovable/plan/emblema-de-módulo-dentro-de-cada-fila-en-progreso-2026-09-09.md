# Emblema de módulo dentro de cada fila en Progreso

## What
Add the corresponding animal/module emblem inside every module row on the **Progreso** page’s “Tu camino” / “Your journey” list.

## Why
Learners asked to see the module mascot/emblem closer to the module status text (“SIGUIENTE”, “COMPLETO”, etc.) so the progress list feels more connected to the badges they are earning.

## Scope
- Only the progress page module list rows.
- No changes to module pages, home card, badge grid, behavior, progress logic, or data persistence.

## Implementation
1. In `src/routes/progress.tsx`, import `ModuleBadge` (already imported via `ModuleBadgeGrid`, but add a direct import).
2. In the `ModuleRow` component, render a `ModuleBadge` (size `sm`) inline with the `ModuleHeading`:
   - Locked modules keep the greyscaled/opacity style (`locked={status.locked}`).
   - Use the current app language for alt text (`es={es}`).
3. Keep the existing status pill and progress bar unchanged.
4. Ensure spacing uses the existing gap scale and does not shrink touch targets.

## Verification
- `npx tsc --noEmit`
- `npx vitest run`
- `npm run build`
- Browser/preview check on `/progress` to confirm emblems appear in every module row with correct locked/colour state.
