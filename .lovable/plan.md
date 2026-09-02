# Motivation + Progress Reflection System

Incremental retention update. Curriculum, rep methodology, IDs, storage paths, auth and saved progress stay untouched. Everything below reuses the existing saved Final Rep per completed day (`day_progress.recording_path`), never copies audio.

## What exists today (verified)

- One Final Rep per completed day, keyed `moduleId:day`, with `finalSeconds`, `sentenceCount`, `recordingPath`. Signed URLs are resolved lazily at play time through the shared playback store.
- `DayCompleteScreen` is only rendered right after a fresh completion in Practice. It already has a small "WEEK X COMPLETE" stats box and two ad-hoc module-complete cards (generic + EAGLES) that will be replaced by the new reusable moments.
- Every module defines `weeks` (4 x 5 days) and `CourseService.totalDays(moduleId)` is dynamic. EAGLES is flagged `pilot`, so `nextPractice` never auto-places it; that flag stays as is.
- Progress and Recordings pages already have Then vs Now (first vs latest) and a flat 20-per-page recordings list.

## Part 1 — Weekly moment: ESCUCHA TU SEMANA

Shown inside the day-complete flow when the day just finished completes its week (week day 1 vs week day 5 by position, never by calendar).

1. Header ESCUCHA TU SEMANA / "Compara cómo empezaste con cómo terminaste."
2. Two comparison cards: ASÍ EMPEZASTE · DÍA n and ASÍ TERMINASTE · DÍA n+4, each with duration (mm:ss) and idea count when stored. Stacked on mobile, side by side from 640px. No autoplay, no percentage.
3. Player: play / pause / restart with a thin progress line; starting one card pauses the other.
4. Reflection ¿QUÉ NOTAS DIFERENTE? — multi-select chips (Hablo más tiempo, Conecto más ideas, Tengo menos pausas, Uso más inglés, Me siento más seguro/a). Optional, skippable.
5. SEMANA COMPLETADA card with supportive copy, then PRÓXIMA SEMANA teaser (next week title + subtitle) and CTA. The existing CONTINUAR / TERMINAR DÍA button stays available at all times; listening is never required.

Missing recordings (cases A–D): each side renders independently. A missing side shows the neutral "no disponible" message; the celebration and CTA always render. If a signed URL fails, the card shows "No se pudo cargar" and nothing blocks.

## Part 2 — Module moment: ESCUCHA TU CAMBIO

Shown in the same flow when the finished day completes the module (first active day vs last active day of that module, computed from `CourseService.getDays`).

- Header with module emoji + display name (BASIC 4 COMPLETE, EAGLES COMPLETE) from `module.label/title`.
- Module-specific transformation line (one per module, Spanish + English) kept in a small copy map.
- Comparison cards DÍA 1 vs DÍA 20 using the same component as the weekly moment.
- Objective metrics only: days completed, Fluency Reps (days x 5), speaking minutes from stored `practiceSeconds`, saved Final Reps count. Any metric with no data is hidden.
- Reflection ¿QUÉ CAMBIO NOTAS MÁS? (module option set), optional.
- Short, reduced-motion-aware celebration (existing pop-check animation + subtle rise-in; no confetti).

## Part 3 — NEXT UP

Reusable section fed by a `NEXT_UP` copy map keyed by the module that comes next in display order (including EAGLES after BASIC 4). Shows level, name, emotional promise, 3–5 checkmarks and a CTA that links to `/module/$moduleId`. After EAGLES (no published successor) it shows TIGERS · PRÓXIMAMENTE with the "Mientras tanto…" subtitle and no CTA; SHARKS copy is included in the map for later. `UPCOMING_LEVELS` gains TIGERS (preview only, not routable, not counted).

## Part 4 — Recordings page reorganization

- Top: ESCUCHA TU PROGRESO with a quick first-vs-latest comparison (same component) and milestone chips: PRIMERA GRABACIÓN, each completed module's final day, MÁS RECIENTE — computed from the learner's actual data, hidden when absent.
- Body: grouped Module → Week with collapsible sections. Current/most recent module expanded, others collapsed; weeks collapsible; day cards render only when a week is open (metadata only, audio on demand).
- Each completed week header exposes ESCUCHA TU SEMANA (opens the weekly comparison in a sheet); each completed module header exposes ESCUCHA TU CAMBIO. Same components as the completion moments, always revisitable.
- Existing filter/sort chips are replaced by the grouping; LOAD MORE is no longer needed because sections are lazy.

## Part 5 — Progress page

Inside VER TODOS LOS DÍAS, completed week and module rows get the same COMPARAR shortcut. Nothing else on Progress changes.

## Reflection storage

New table `progress_moments` (user_id, module_id, week smallint nullable, comparison_type `week|module`, selected_reflections text[], comparison_completed_at, created_at/updated_at) with a unique index on (user_id, module_id, week, comparison_type). Saved via upsert from the authenticated browser client, so reopening a moment never duplicates rows. It never touches `day_progress`, so reps, minutes, streak and recording counts cannot inflate. Guests keep selections in memory only.

## Existing learners

Moments are triggered only by the Practice completion flow, so nobody is walked through old celebrations. Historical week/module comparisons are simply available from Recordings and Progress.

## Technical notes

- `src/lib/progress-moments.ts`: pure helpers `weekComparison(state, moduleId, week)`, `moduleComparison(state, moduleId)`, `milestones(state)`, `nextModuleAfter(moduleId)`, plus the copy maps (transformation lines, reflection options, NEXT UP). Designed so a future milestone (day 20/40/60/100) is just another pair of `DayRecord`s.
- `src/hooks/use-recording-playback.ts`: extend the shared store with pause, restart and a current-time/duration snapshot (existing play/stop callers keep working).
- New components under `src/components/fluency/`: `ComparisonPlayerCard`, `ComparisonPair`, `ReflectionChips`, `WeekMoment`, `ModuleMoment`, `NextUp`, `MomentSheet` (bottom sheet for revisits), `RecordingsGrouped`.
- `DayCompleteScreen.tsx`: replace the current week box and both module-complete cards with `WeekMoment` / `ModuleMoment` + `NextUp`; keep today's stats, save state, self-assessment and the final CTA.
- `src/routes/recordings.tsx` rewritten to compose the new sections; `src/routes/progress.tsx` gets the COMPARAR shortcuts.
- Migration: create `progress_moments` with GRANTs to authenticated/service_role, RLS `auth.uid() = user_id`, updated_at trigger. i18n strings added for ES/EN.
- Touch targets ≥ 44px, no horizontal scroll, `motion-reduce` variants on the celebration.

## QA

Fresh week completion (both reps / Day 1 missing / Day 5 missing / neither), continue without listening, reflection saved once after reopening three times, module completion BASIC 4 → EAGLES CTA, EAGLES → TIGERS coming soon, recordings grouping with 40+ records, first vs latest, mobile 393px and desktop, and a before/after query confirming `day_progress` and `recordings` rows are unchanged.
