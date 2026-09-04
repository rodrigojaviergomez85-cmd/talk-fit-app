# 66-Day Habit: count unique calendar practice days

## Verified current state

- `habitDays()` returns `Object.keys(state.days).length` (curriculum days), and `practice.tsx` snapshots the same number as `habitBefore`. Home/Progress `HabitCard`, `BadgeGrid`, `earnedBadgeIds`, `milestonesCrossed`, `final6` and the Day Complete celebration all flow from it.
- Real data confirms the inflation: one learner shows 17 curriculum days across 3 calendar dates, another 14 across 4. Both hold a `habit-7` badge they did not earn under the calendar rule. No other habit badges exist yet.
- Every `day_progress` row already has `local_day_key` (0 missing), written from the device's local date at completion time. Coach Check and the streak use this same `YYYY-MM-DD` local-key strategy, so there is one timezone definition to reuse.
- Repeating a curriculum day keeps the original `dayKey` on the record and only rewrites `completed_at`, so the repeat date is currently stored nowhere. That is why a separate authoritative table is needed (Scenario D).
- The streak already dedupes by calendar key (`streakFrom` builds a Set of `dayKey`s), but it only sees original dates and `completeDay` skips the streak update on repeats.

## What changes

### 1. Backend: `habit_practice_days` (migration)

- Columns: `id`, `user_id`, `practice_date date`, `first_qualified_at`, `last_qualified_at`, `module_id`, `curriculum_day`, `created_at`, `updated_at`; `UNIQUE (user_id, practice_date)`; `updated_at` trigger.
- GRANTs to `authenticated` and `service_role`; RLS `auth.uid() = user_id` for read/insert/update, no delete. Same pattern as the other progress tables; nothing existing is loosened.
- One-time data backfill (separate from the schema change): one row per `(user_id, local_day_key)` from `day_progress`, with `min/max(completed_at)`. `day_progress` is not modified. The two unearned `habit-7` achievement rows are removed so the badge unlocks (and celebrates) properly when those learners genuinely reach 7 calendar days.

### 2. Local state and sync (`journey-service.ts`, `types.ts`)

- `JourneyState` gains `habitDates: string[]` (unique local keys) and `pendingHabitDates: string[]` (completed but not yet confirmed by the backend, for offline safety).
- `completeDay` always adds today's local key to both lists, even when the curriculum day already existed (repeat on a new date counts). Streak and `lastCompletedDate` are recomputed from the calendar-date set, so a repeat on a new date extends the streak while a second completion on the same date does not.
- `syncDay` upserts `pendingHabitDates` into `habit_practice_days` (`onConflict: user_id,practice_date`, updating only `last_qualified_at`) after the `day_progress` upsert; on success the keys leave the pending list. The date sent is the original local key, never the sync date (Scenario G). A failed sync keeps the keys pending and the existing retry button re-sends them.
- `fetchRemote` reads `habit_practice_days` and unions it with `day_progress.local_day_key` and any still-pending local keys, then sets `streakDays = streakFrom(habitDates)`.
- `completedCount()` and all curriculum-progress code stay untouched.

### 3. Habit helpers (`habit.ts`)

- `habitDays(state)` = `state.habitDates.length` (fallback to unique `dayKey`s of `state.days` for a state that predates the field).
- `wasOnBreak` reads the latest habit date instead of `lastCompletedDate`.
- `journeyMetrics.days` uses habit days; reps/minutes/final reps/modules keep their curriculum sources.
- `HABIT_EXPLANATION.what` and the habit badge detail copy use the requested ES/EN wording ("66 días diferentes… ese día cuenta una sola vez"). Skill badges unchanged.

### 4. Completion flow and Day Complete screen

- `practice.tsx` snapshots `habitBefore` with `habitDays(before)` (calendar count) instead of the curriculum count.
- `DayCompleteScreen` adds one line under the stats: "HOY CUENTA ✓ · 2 / 66 DÍAS" when the habit grew, or "HOY YA CONTABA ✓ · 2 / 66 DÍAS" when the date was already counted. Milestones, Final-6 and the streak chip already derive from the same count, so a same-day second completion never celebrates or increments.

### 5. UI consumers

`HabitCard` (Home + Progress), `BadgeGrid`, `HabitMilestone`, Progress streak stat: no logic changes beyond the new source; they are re-checked visually.

## Not changed

Curriculum, module order, day completion rules, Reps 1–5, recordings, Final Rep, Test Ready (still does not create habit days), module/day IDs, existing `day_progress` rows, progress percentages, auth, Coach Check, placement/progression.

## Technical notes

- Timezone: the app's existing local `YYYY-MM-DD` key (`JourneyService.dayKey` / `coach-check.toDayKey`) remains the single definition; the new table stores that key as a `date`. No UTC grouping anywhere.
- Idempotency: the unique constraint plus `ignoreDuplicates`-style upsert guarantees one row per date across refreshes, re-syncs, retries and devices.
- `achievements-service.sync` keeps its silent backfill; because badges now derive from calendar days, no new inflated rows can be created.

## Verification

- Unit tests (`src/lib/habit.test.ts`) for Scenarios A–F on pure state: 8 completions same date → 1; 8 + 8 next date → 16 curriculum / 2 habit / streak 2; repeat old day on new date → +1; repeat same date → +0; reopen → +0.
- Data check after backfill: the 17-day learner shows 3 / 66, the 14-day learner 4 / 66; unearned `habit-7` rows gone; `day_progress` row count unchanged before/after.
- Signed-in browser check of Home, Progress and a Day Complete screen showing "HOY CUENTA ✓" then "HOY YA CONTABA ✓" on a second completion the same day; typecheck and existing tests pass.
