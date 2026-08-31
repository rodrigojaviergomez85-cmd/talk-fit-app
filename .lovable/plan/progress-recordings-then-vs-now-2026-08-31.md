# Progress + Recordings + Then vs Now

Focused update to two screens only: Progress and My Recordings. Curriculum, practice reps, Home, sentence counter and auth stay untouched.

## Progress page (new structure, top to bottom)

1. **YOUR PROGRESS** — 4 compact metric cards from real data: days completed (x / 60), fluency reps completed, speaking time in minutes, current streak.
2. **THIS WEEK** — compact strip: days practiced this week, reps this week, speaking minutes this week.
3. **CURRENT MODULE** — module name, days done / total with a progress bar, current week line (e.g. WEEK 3 · 2 / 5 days), and a CONTINUE PRACTICE button that reuses the exact same next-lesson logic Home uses.
4. **YOUR MODULES** — one card per module with count, progress bar and COMPLETE / CURRENT / UP NEXT badge; all remain tappable for review.
5. **YOUR SPEAKING** — first saved recording, latest saved recording, personal best (seconds + ideas). Each stat renders only when the underlying data exists.
6. **THEN VS NOW** — side-by-side earliest vs most recent saved Final Rep, each with module · day label, duration, idea count and a play/stop button. Fewer than two saved recordings shows a friendly "keep practicing" state; never compares a recording with itself and never shows sample data.
7. **SPEAKING OUTPUT OVER TIME** — one simple line/bar chart of Final Rep duration by practice date (recharts, already available). Hidden when there are fewer than 3 data points.
8. **SPEAKING HISTORY** — 3–5 most recent Final Reps with duration, ideas and play; VIEW ALL RECORDINGS links to /recordings.
9. **VIEW ALL DAYS** — collapsed by default. When opened, the existing 60-day detail appears grouped Module → Week → Days, with the current week expanded and all other weeks collapsed.

No AI/fluency/grammar/pronunciation scores anywhere. Only counts, seconds, ideas, dates.

## My Recordings page

- Header MY RECORDINGS with a one-line purpose subtitle.
- Filter row: ALL / MODULE 1 / MODULE 2 / MODULE 3, plus RECENT / OLDEST sort.
- Card per saved Final Rep: MODULE · WEEK · DAY, lesson title, date, duration (mm:ss), idea count, PLAY / STOP.
- Empty state: "YOUR VOICE JOURNEY STARTS HERE" with a START PRACTICE button pointing at the learner's current lesson.
- One Final Rep per completed day (existing storage shape already stores exactly one). No existing data is deleted or migrated.
- Initial page shows the most recent 20 cards with a LOAD MORE control.

## Playback

A single shared playback controller is used on both pages: pressing play on any card stops whatever is playing, no autoplay, play/stop only, large tap targets. Audio files are fetched only on first play — signed URLs are requested per recording at play time instead of resolving every recording when the page loads.

## Technical notes

- New helpers in `JourneyService` (pure, additive): weekly stats, first/latest/best recordings, recent records, chart series. `CourseService` gains a week-grouping helper for the day list.
- New components under `src/components/fluency/`: `ProgressMetrics`, `ModuleProgressCard`, `ThenVsNow`, `SpeakingHistoryList`, `RecordingCard`, plus a `useRecordingPlayback` hook that owns the single-audio rule and lazy signed-URL resolution.
- `src/routes/progress.tsx` and `src/routes/recordings.tsx` are rewritten to compose those pieces; existing day-detail markup is reused inside VIEW ALL DAYS.
- `JourneyService.pull()` stops pre-signing every recording URL; signing moves to play time. Storage stays private; existing per-user policies are unchanged.
- Guest data keeps using local storage; signed-in data keeps using the existing per-user cloud rows.

## QA

New user (all zeros, empty states), one recording (no self-comparison), several recordings (correct then/now), module complete (20 / 20 COMPLETE), refresh, sign out / sign in, long history responsiveness, and mobile layout at 393px.
