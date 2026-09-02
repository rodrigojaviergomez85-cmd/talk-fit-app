# 66-Day Habit Journey + Milestones + Badges

Incremental retention layer on top of the existing progress data. Curriculum, IDs, recordings, storage, auth, Resume Practice, Rep 1–5, Weekly/Module Moments and existing learner rows stay untouched.

## What exists today (verified)

- Every completed curriculum day is one `day_progress` row keyed `(user_id, module_id, day)` and upserted, so re-doing a day never creates a second row. The in-memory `JourneyState.days` map mirrors it; `completedCount(state)` already equals the number of unique completed days.
- `streakDays` is recomputed from real completion dates (`streakFrom`) on every cloud pull and updated in `completeDay`; it resets to 0 after a missed calendar day. This stays the CURRENT STREAK.
- `DayCompleteScreen` renders the fresh-completion celebration and already composes `WeekMoment`, `ModuleMoment` and `NextUp`; `practice.tsx` calls `completeDay` then `syncDay`.
- Home shows a streak stat; Progress shows the current module, a 4-stat grid and an all-days list. Practice requires an account, so every learner has cloud completion rows to derive from.
- EAGLES role-play days (`rep5Turns`): Day 4 and Day 20 (Sales), Days 9, 10, 19 (Customer Service). Test Ready sprints live in `test_ready_progress`.

## Two separate metrics

- **Habit days** = number of unique completed curriculum days (any module, placement-agnostic). Derived, never incremented by hand, so replaying a day or refreshing cannot inflate it. An existing learner with 24 rows shows 24 / 66 immediately (silent backfill, no retroactive celebrations).
- **Current streak** = existing `streakDays`, shown next to it and allowed to drop to 0 while habit days stay put.

## Part 1 — Habit engine (`src/lib/habit.ts`)

Pure helpers over `JourneyState`: `habitDays(state)`, `nextMilestone(count)`, `milestonesCrossed(before, after)`, `final6(count)` (60–65 → "N DÍAS MÁS"), `earnedBadges(state, testReadyCount)`, and the milestone/badge copy map (7, 20, 30, 40, 60, 66, 100 with title, message, badge label, emoji, ES/EN). Also `journeyComparison(state)` = first vs latest playable Final Rep, reusing the existing `Comparison` shape so `ComparisonPair` renders it unchanged.

## Part 2 — Achievement persistence (idempotent)

New table `achievements` (`user_id`, `achievement_id` text, `earned_at`, `celebrated_at` nullable; unique on user + achievement). `AchievementsService`:
- `sync(state, testReadyCount)` upserts every currently-earned badge with `ignoreDuplicates`, so backfill for existing learners is silent (rows created with `celebrated_at = now()`).
- `claimCelebration(ids)` is called only from the completion flow with the milestones crossed by *that* completion (before/after count): inserts with `celebrated_at = null`, then marks celebrated after render. A refresh never re-celebrates; a milestone unlocks once per learner.
- Test Ready count comes from one lightweight `count`-only query, run on Progress (not Home).

## Part 3 — Home habit card (`HabitCard`)

Compact card under the CONTINUE hero, never taller than it: "66-DAY ENGLISH HABIT · DÍA 18 / 66", progress bar, "🔥 RACHA ACTUAL: 7 DÍAS", one PRÓXIMO LOGRO line (only the next milestone + days remaining), and the Final-6 countdown line from day 60. At ≥66 it shows "66-DAY HABIT ✓" plus secondary "TOTAL: 78 DÍAS DE PRÁCTICA" — never 67 / 66. When streak is 0 and habit days > 0 the copy switches to recovery mode: "VUELVE HOY · Tu progreso sigue aquí" with the same day count; no loss language anywhere.

## Part 4 — Celebration in the completion flow

`DayCompleteScreen` receives the pre-completion habit count from `practice.tsx` (computed right before `completeDay`) and shows at most one new block, `HabitMilestone`, placed by priority: after `ModuleMoment` when a module finished, after `WeekMoment` when a week finished, otherwise right after the stats. Day 20 module + Day 20 habit therefore reads as one flow: module card → "NUEVO LOGRO 🏆 20 DAYS" strip → ESCUCHA TU CAMBIO → NEXT UP. Day 66 is the large variant: title, subtitle, objective metrics only (habit days, reps = days × 5, minutes, saved Final Reps, completed modules — each hidden when zero), ESCUCHA TU CAMINO with `ComparisonPair` (first vs latest, optional, never blocking), and the 66-day message. Day 100 reuses the large variant with FIRST vs LATEST. Animations reuse `animate-pop-check` with `motion-reduce` fallbacks; no confetti.

The streak stat tile becomes "Racha" + a small "Día N / 66" chip. When the streak had been broken before this completion (last completion older than yesterday), a small non-modal line "BIENVENIDO/A DE VUELTA · Sigamos desde donde quedaste" appears; no badge, no reward.

## Part 5 — Progress page

New section TU HÁBITO DE INGLÉS (count / 66, bar, streak, next milestone, Final-6 line) placed after the current-module block and clearly separate from COURSE PROGRESS (module denominators unchanged). Below it MIS LOGROS: unlocked badges first (habit + skill + one compact row per completed module, e.g. 🦅 EAGLES COMPLETE), then only the next 1–2 locked milestones with "32 / 40 DÍAS". No wall of locked badges.

Skill badges (completion-only, no scoring language): 💬 CONVERSATION READY (any role-play day done), 🤝 CUSTOMER SERVICE READY (EAGLES 9, 10, 19 done), 💼 SALES CHALLENGE (EAGLES 4 and 20 done), 🎧 TEST READY (5+ sprints).

## Out of scope

No notifications, cohorts, leaderboards, AI coach changes, or scientific habit claims. Copy uses "66-DAY HABIT MILESTONE / 66 días de práctica".

## Technical notes

- New: `src/lib/habit.ts`, `src/services/achievements-service.ts`, `src/components/fluency/HabitCard.tsx`, `HabitMilestone.tsx`, `BadgeGrid.tsx`.
- Edited: `DayCompleteScreen.tsx` (new prop `habitBefore`, milestone block, welcome-back line), `practice.tsx` (pass pre-completion count), `routes/index.tsx` (HabitCard), `routes/progress.tsx` (habit + badges sections), `i18n.tsx` (ES/EN strings). `journey-service.ts` gains only read helpers; `completeDay`, `syncDay`, streak logic and storage keys are not modified.
- Migration: `achievements` table with GRANTs to `authenticated` and `service_role`, RLS `auth.uid() = user_id`, unique index `(user_id, achievement_id)`, `updated_at` trigger. No changes to `day_progress`, `recordings`, storage or existing policies.
- Home cost: habit data derives from the `JourneyState` Home already loads — no extra queries. Achievement sync fires once per session after a successful pull.
- Offline: the celebration is computed from local state after `completeDay`, but the achievement row is written only after `syncDay` reports "saved"; on failure it retries with the existing save-retry button, so nothing is lost or falsely marked permanent.

## QA

First day → 1 / 66 and stable after refresh; replay same day stays at 1; day 7 unlocks STARTED STRONG once; streak break keeps 38 / 66 with streak 0 and recovery copy; return completes 39 / 66 with welcome-back line; module day 20 + habit day 20 renders one combined flow; existing learner with 24 rows shows 24 / 66 with no celebration chain; day 60 starts Final-6; day 66 large celebration with first-vs-latest; day 67 shows 66-DAY HABIT ✓ + total; EAGLES self-placement counts its first day as day 1; a before/after row-count check on `day_progress` and `recordings`.
