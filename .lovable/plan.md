# Simplify navigation and remove duplicated info across Home, Progress and Recordings

Each tab answers one question: Home = do, Progress = see, Recordings = hear, Account = manage. This is a navigation + information-architecture change only; no curriculum, progress data, recordings, sync, auth, habit counting or unlock rules are touched.

## Current state (verified)

- Bottom nav has 5 tabs including PRACTICE (`BottomNav.tsx`).
- Home shows CurrentModuleCard, Show My Coach, HabitCard (already includes current streak), a 4-card stats grid (Streak / Speaking Time / Days Completed / Reps), and Up Next.
- Progress repeats a navy Current Module card with CONTINUE PRACTICE, the HabitCard, a 4-card stats grid (again incl. Streak), then This Week, module rows, speaking stats, Then vs Now audio, chart, 4 recent RecordingCards + "View all recordings", and a collapsible all-days list with "Hear your change / Hear your week" audio compare buttons.
- Recordings already owns First vs Latest, Milestones, grouped Final Reps and a Coach Check link.

## 1. Bottom navigation

- Remove the PRACTICE item from `BottomNav.tsx`; 4 items remain (Home, Progress, Recordings, Account), each `flex-1` so they stay evenly spaced.
- Keep the `/practice` route and every CTA that links to it (CurrentModuleCard, DailyPracticeCard, HabitCard recovery CTA, WeekMoment, onboarding, Recordings empty state).
- Leave the `nav.practice` translation key in place (harmless) or remove it if unused after the change.

## 2. Home (`src/routes/index.tsx`)

Final order:
1. CurrentModuleCard (module, day, week, progress bar, START / CONTINUE CTA)
2. SHOW MY COACH (secondary)
3. HabitCard (Day X / 66 + current streak, unchanged component)
4. Up Next locked module (when relevant)

- Delete the 4-card `Stat` grid and its `Stat` helper, unused icon imports, and the `completed` / `totalDays` calculations.
- Simplify the loading skeleton to match (card, button, habit card).

## 3. Progress (`src/routes/progress.tsx`)

Remove:
- The navy `CurrentModule` card and its CONTINUE PRACTICE CTA.
- The `HabitCard variant="progress"`.
- The Streak stat (already on Home HabitCard); the 4-card grid is replaced by a compact section below.
- `ThenVsNow`, the `OutputStat` First/Latest recording cards, the recent `RecordingCard` history, and the "View all recordings" CTA.
- The "HEAR YOUR CHANGE / HEAR YOUR WEEK" compare buttons and `MomentSheet` inside the all-days list (audio playback moves entirely to Recordings, which already offers these compares).

New hierarchy:
1. THIS WEEK — practice days, reps, minutes (existing section).
2. 66-DAY JOURNEY — a new compact row: `Día X / 66` with a thin progress bar and total unique practice days, using existing `habitDays` / `habitDisplay` from `@/lib/habit`. Not the large HabitCard, no streak duplicate.
3. TOTALS — Reps, Speaking minutes, Full curriculum X / Y (three compact stats, moved here from Home).
4. SPEAKING PROGRESS — existing `SpeakingChart`.
5. PERSONAL BESTS — Longest sample, Most ideas (existing `personalBests`, numbers only).
6. YOUR JOURNEY — existing forward module rows + earlier modules as Review.
7. BADGES — existing `BadgeGrid`.
8. Collapsible all-days list (kept, minus audio compare buttons).

Update Progress `head()` description wording only if needed to match.

## 4. Recordings (`src/routes/recordings.tsx`)

- Already structured as HEAR YOUR PROGRESS → First / Latest → Milestones → Your Final Reps → Coach Check. Keep it.
- Move the Coach Check link from the top to a secondary action at the bottom of the page so audio comes first.
- No stats, streak, habit card or curriculum totals added.

## 5. Translations (`src/lib/i18n.tsx`)

Add keys for new Progress section headers where none exist (e.g. `prog.journey66`, `prog.totals`, `prog.bests`, `prog.myJourney`) in ES/EN. Reuse existing `prog.*` and `home.*` keys otherwise.

## 6. Do not change

`/practice`, Rep 1–5 flow, curriculum, module/day IDs, Progression/unlock rules, Final Rep logic, recordings library, Coach Check, habit calendar counting, Test Ready, auth, sync, storage, learner data.

## Verification

- Bottom nav renders exactly 4 evenly spaced items; `/practice` still opens from Home CTA with the correct module/day.
- Home shows no stats grid and streak appears once (inside HabitCard).
- Progress shows no Current Module card, no HabitCard, no audio players/compare buttons; keeps week stats, chart, bests, journey, badges.
- Recordings unchanged in function, Coach Check still reachable from Recordings and Home.
- `bunx tsgo --noEmit` and existing Vitest suite pass; mobile browser screenshots of Home, Progress, Recordings.
