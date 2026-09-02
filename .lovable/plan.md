# Reorder the map, rename the levels, add self-placement — without moving anyone

## What I confirmed in the project

- Internal module IDs are `basic-zero`, `simple-present`, `past-stories`, `simple-future`, `mixed-tenses`, `eagles-week-1`. They are used as-is in progress keys (`moduleId:day`), `day_progress.module_id`, `practice_sessions`, and recording paths (`{user}/{moduleId}-day-{n}`). None of these change.
- Real data exists: 31 learners with completed days across five of the six modules, 59 with saved practice positions. Nothing in this plan rewrites those rows.
- Today the "current module" is not stored anywhere. `JourneyService.nextPractice()` picks the first incomplete non-pilot module by display `order`. That is exactly what would create retroactive prerequisites when Simple Future moves in front of Simple Present, so the current module must become a saved value.
- `user_preferences` currently has only language/support/onboarding columns. Placement fields do not exist yet.
- Onboarding is 3 intro screens + an AuthGate screen; Google sign-in returns to `window.location.origin`, so a pending choice must live in plain localStorage (not per-user scoped prefs) to survive the redirect.

## 1. Presentation metadata (course-service)

Add display-only fields to each existing module entry; IDs, days, weeks and content untouched:

| Internal ID (unchanged) | displayOrder | level (small orange caps) | displayTitle | Secondary |
|---|---|---|---|---|
| basic-zero | 1 | BASIC ZERO | INTRODUCE YOURSELF & SOMEONE ELSE | existing subtitle |
| simple-future | 2 | BASIC 1 | SIMPLE FUTURE | existing subtitle |
| simple-present | 3 | BASIC 2 | SIMPLE PRESENT | Routines · Habits · Actions happening now |
| past-stories | 4 | BASIC 3 | SIMPLE PAST | Past Experiences & Stories |
| mixed-tenses | 5 | BASIC 4 | MIXED TENSES & QUESTIONS | existing subtitle |
| eagles-week-1 | 6 | INTERMEDIO | EAGLES | Recommend, Advise & Sell + status "Semana 1 · 5 días" |

Plus a non-selectable, days-less preview entry `AVANZADO — PRÓXIMAMENTE` kept in a separate `UPCOMING_LEVELS` list (never a `ModuleId`, never in totals, never routable).

Remove the old `MODULE n · MONTH n` labels and the `BASIC 1 —` / `BASIC 4 —` prefixes baked into titles. One shared `ModuleHeading` component renders level / title / secondary consistently on Home, Module page, Progress, Recordings, Continue card, Day-complete screen, placement cards and the account level selector.

`totalDaysAll()` becomes the sum of days of all published modules (including EAGLES, so 105 today) and automatically grows when a module is added. Upcoming levels contribute 0.

## 2. Saved "current module" (backend + services)

Additive migration on `user_preferences` (nullable, no defaults that move anyone):
`current_module_id`, `initial_placement_module_id`, `placement_source`, `placement_selected_at`, `placement_changed_at`, `placement_change_count` (default 0). Existing RLS/grants already cover the table.

One-time backfill in the same migration for existing learners only: `current_module_id` = the module of their most recent activity (latest `day_progress.completed_at` or `practice_sessions.updated_at`). `initial_placement_module_id` stays NULL for them (they never self-placed).

`JourneyService.nextPractice()` becomes:
1. If a saved `current_module_id` exists → that module, its next uncompleted day (or the module's next incomplete day in display order once it is fully complete).
2. Else infer from most recent local activity (offline safety net), else `basic-zero`.
Display order is never used to decide where someone is.

Preferences gain matching local fields; `pushPreferences` / `pullPreferences` carry them.

## 3. Placement screen "¿DÓNDE EMPIEZAS?"

New reusable `PlacementPicker` component (large cards, in display order) with the seven options and the exact Spanish copy from the brief (EN versions for English UI). AVANZADO is rendered disabled; tapping it opens a small sheet: "MUY PRONTO — Por ahora te recomendamos comenzar en INTERMEDIO" with CTA "IR A INTERMEDIO" that selects EAGLES.

Onboarding becomes: 3 intro screens → placement → AuthGate (progress dots updated to 5). "Explorar sin cuenta" still works.

Pending selection stored in a single unscoped localStorage key (`pending_starting_module_id` + timestamp). It is not written to any account at that point.

After sign-in (`CloudSync.restoreAll`, after the existing restore):
- New learner = no `day_progress`, no `practice_sessions`, no `current_module_id`.
- New learner + pending → upsert `initial_placement_module_id = current_module_id = pending`, `placement_source = "self_selected"`, `placement_selected_at = now()`. Only after the upsert succeeds: clear the pending key and refresh local state. On failure the key is kept and the sync banner's retry re-runs it.
- Existing learner + pending → pending is discarded; their saved position wins. Existing learners are never shown the placement screen (onboarding redirect on Home already skips anyone with progress; it will also skip anyone with a saved `current_module_id`).

Home then shows the Continue card pointing to Day 1 of the chosen module ("BASIC 3 · SIMPLE PRESENT · DÍA 1 · EMPEZAR").

## 4. Module states (no new prerequisites)

Status per module card on Home / Progress:
- CURRENT: equals saved current module.
- COMPLETA: all days done.
- DISPONIBLE PARA REPASAR: earlier in display order than the current module and not complete.
- PRÓXIMO: later in display order.
- PRÓXIMAMENTE: Avanzado only, greyed, not a link.
No module is ever locked; all days stay open exactly as today.

## 5. Mi Cuenta

- New "CAMBIAR MI NIVEL" section → `/level` route reusing `PlacementPicker`. Selecting shows confirm "¿CAMBIAR TU NIVEL? Tu progreso y tus grabaciones anteriores se conservarán." with CAMBIAR NIVEL / CANCELAR. Confirm updates only `current_module_id`, `placement_changed_at`, `placement_change_count + 1`, then routes to that module's page. `initial_placement_module_id`, progress, recordings and sessions untouched.
- "REINICIAR MI VIAJE" keeps its current confirm + behaviour (clears day progress and positions, keeps audio); additionally clears `current_module_id` and sends the learner to the placement screen.

## 6. Progress page

Reorder to display order and new names. The dominant block becomes "TU MÓDULO ACTUAL" (e.g. INTERMEDIO · EAGLES · 0 / 5 días) followed by the forward journey; earlier untouched modules are grouped under "Disponibles para repasar". The all-curriculum "X / 105 días" stays as a secondary stat computed dynamically.

## Out of scope (unchanged)

Curriculum content, Reps 1–5, chunks, prompts, Power Chunks, Test Ready, TTS, sentence counter, recording upload, auth providers, practice route logic, week/day IDs.

## QA I will run before handing over

- Schema diff: `select distinct module_id from day_progress` before/after is identical; row counts of `day_progress`, `practice_sessions`, storage paths unchanged.
- Existing Simple Present, Simple Past and EAGLES learners (real rows) resolve to the same module/day/resume rep; Home CTA unchanged apart from labels.
- New learner flows (Basic 3, Intermedio) via email; Basic 4 via Google redirect: pending survives, backend row written, Home opens Day 1.
- Change level Basic 2 → Basic 4 keeps Basic 2 rows and recordings; no duplicates.
- Avanzado tap shows the "MUY PRONTO" sheet and changes nothing.
- Order 1–7 verified on Home, Progress, Placement, Account selector; total days = 105 and not hard-coded.
