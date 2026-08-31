# Pilot Data Architecture: Accounts Required + Backend as Source of Truth

Scope: authentication gate, backend sync, local→cloud migration, Rep 5 audio storage, privacy. No curriculum, no practice methodology, no Home/Progress redesign.

## Verified current state

- `day_progress` exists with a unique index on (user_id, module_id, day) — day completion is already idempotent. The table currently has 0 rows, so no production data is at risk.
- `profiles` and `day_progress` both have row level security scoped to `auth.uid()`; the `recordings` bucket is private and playback uses short-lived signed URLs.
- Only ONE recording per day is stored today (the Final Rep). Rep 5 Takes 1–5 exist only in browser memory and are never uploaded.
- There is no backend table for: in-progress session position, individual Takes, Past Verb Bank discoveries, or learner preferences. All of these live only in localStorage.
- Practice can be started fully signed out; nothing intercepts it.
- Bug found: when pulling cloud progress, any module id other than `basic-zero` is treated as `simple-present`, so Module 3 (Past Experiences) completions come back attached to the wrong module.

## What will change

### 1. Accounts required for practice
- Onboarding (3 screens) stays exactly as is. After it, a new ACCOUNT GATE screen: GUARDA TU PROGRESO, with the benefits list, CONTINUAR CON GOOGLE (primary), CONTINUAR CON EMAIL, and YA TENGO CUENTA. No "continue as guest" path into practice.
- Any attempt to start or continue a Daily Practice while signed out is intercepted with INICIA SESIÓN PARA PRACTICAR and the same two sign-in buttons. Practice does not start.
- Browsing Home, module pages, onboarding and the account gate stays open. The existing Mi Cuenta sign-in is reused — no second auth system.
- Google sign-in is enabled/configured as part of this change so the first tap works.

### 2. Backend becomes the source of truth
- On sign-in and on app load, learner state is loaded from the backend first; local storage becomes a cache only.
- A stale local copy can no longer silently overwrite newer cloud state: writes are per-record upserts, and reads prefer the cloud record when both exist.
- Sync states in Spanish: SINCRONIZANDO TU PROGRESO…, TUS DATOS ESTÁN LISTOS ✓, and on failure NO PUDIMOS SINCRONIZAR TU PROGRESO / [REINTENTAR]. Never "guardado" before the backend confirms.

### 3. New backend tables (additive only, nothing dropped)
- `practice_sessions` — the current in-progress position: module, day, rep number, prompt index, completed and skipped prompt ids, started_at, updated_at, status. One active session per user/module/day.
- `recordings` — one row per Rep 5 Take: module, day, take_number, is_final_rep, duration_seconds, estimated_idea_count, storage_path, created_at. Unique per (user, module, day, take) so retries cannot duplicate; a partial unique rule guarantees a single Final Rep per day.
- `verb_progress` — discovered/practiced past verbs per learner (union merge).
- `user_preferences` — app language and Spanish Support, so settings follow the account.
- All four get row level security scoped to the signed-in owner plus the required grants. `day_progress` and `profiles` keep their existing policies.

### 4. Incremental saving
Progress is written when the rep changes, the prompt changes, a speaking attempt finishes, a prompt is skipped, a Take is recorded, the Final Rep is chosen, and when the day completes — not only at the end. Writes are debounced so this does not add network noise.

### 5. Rep 5 audio: all takes stored
- Every Take the learner records is uploaded to the private bucket at `user_id/module_id/day_id/<uuid>.<ext>` — no names or emails in paths.
- Upload failure keeps the audio in memory and shows NO PUDIMOS GUARDAR ESTA GRABACIÓN TODAVÍA / [REINTENTAR]; the Take is not marked as stored.
- Choosing a different Final Rep updates the existing flag instead of creating a second one.
- Storage policies restrict read/write/delete to the owner's own folder; nothing is deleted automatically during the pilot.

### 6. Legacy local data migration
- On the first successful login after this update, existing local progress is merged into the account: completed days as a union (no duplicates), recordings uploaded only if the account does not already have that day/take, verb discoveries as a union, and the in-progress session resolved by the most recent valid `updated_at`.
- Streak and totals are recalculated from actual completion dates and stored session/recording rows instead of adding two numbers together.
- The migration is idempotent and records a completion marker; local data is not cleared until the backend confirms success.

### 7. Logout hygiene
Sign-out clears the cached progress, session position, verb bank and recordings state for that account so the next person on the same device sees nothing of the previous learner.

### 8. Fixes required for correctness
- Correct the module id mapping on cloud read so Module 3 progress restores to Module 3.
- Cross-device restore surfaces CONTINUAR DONDE ME QUEDÉ · REP X · PROMPT Y from the backend session row, using the existing Resume UX.

## Verification before release

Automated where possible, and a browser pass for the rest: signed-out practice is blocked; email login and day completion persist across refresh; localStorage cleared then re-login restores days, position and recordings; mid-practice position restores from the backend; Takes 1–3 upload and remain playable; Final Rep selection persists; migration run twice creates no duplicates; a direct backend check that user A cannot read user B rows or audio; double-tap save creates one record.

Google sign-in must be confirmed by you in the live preview (it cannot be exercised from an automated session). Final report will list database/storage changes, auth flow changes, migration logic, policies verified, test results and a READY / NOT READY recommendation.

## Technical notes

- One migration adds the four tables with grants, RLS and storage policies; nothing existing is dropped or altered destructively.
- Sync goes through the existing service layer (`journey-service`, `practice-session`, `verb-bank`, `preferences`), each gaining a cloud-backed read/write path; UI components keep their current props and appearance.
