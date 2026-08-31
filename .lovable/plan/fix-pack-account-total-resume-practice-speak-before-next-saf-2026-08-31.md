# Fix pack: account total, resume practice, speak-before-next, safe reset

Four focused fixes. No curriculum, Rep 5 board, Sentence Counter, Home/Progress/Recordings, or auth changes.

## 1. Days completed total

Current state, verified in the code: the Account page already renders `JourneyService.completedCount(state) || 0 / CourseService.totalDaysAll()`, and `totalDaysAll()` sums `days.length` over the module registry (20+20+20 = 60), so it is already dynamic and no longer prints function source. If the raw-code string still shows in the browser, it is a stale cached bundle.

Work here:
- Add a guard so every stat renders a finite number (`Number.isFinite(...) ? value : 0`) — never `NaN`, `undefined`, `null`, or an object/function.
- Confirm in the live preview that Account shows `x / 60`, and that adding a module to the registry would move the total automatically (no hard-coded 60 anywhere).

## 2. Resume an unfinished daily practice

New local service `src/services/practice-session.ts` storing one entry per learner scope + module + day:

- key: `fluency-reps:session:v1:<userIdOrGuest>:<moduleId>:<day>`
- value: `{ moduleId, day, week, stage (rep), subIndex, attempted: string[], skipped: string[], startedAt, updatedAt }`
- no audio, no blobs, no object URLs — position and item state only.

Practice page writes this entry on every meaningful change: rep change, prompt/sentence change, a recording completed, a prompt skipped. So an unexpected browser close still keeps the place.

On entering `/practice` with a saved, non-empty, non-completed session, show a resume screen before the steps:

```text
WELCOME BACK
You were practicing
REP 4 · PROMPT 6 OF 8
[ CONTINUE WHERE I LEFT OFF ]
  Start this day over
```

`Start this day over` asks to confirm ("Your progress inside this practice will be reset") and clears only that module+day session entry — completed days, module progress, other recordings, streak stay untouched.

Exit control (and the back arrow leaving practice) asks:

```text
EXIT PRACTICE?
Your progress today will be saved.
[ EXIT ]  [ KEEP PRACTICING ]
```

Position is saved before navigating away.

On day completion the session entry for that module+day is deleted, so a finished day never shows the resume prompt.

Copy follows the existing ES support toggle: English by default, Spanish strings when support is on (CONTINUAR DONDE ME QUEDÉ, EMPEZAR DE NUEVO, SALTAR ESTA FRASE, SALIR DE LA PRÁCTICA).

## 3. A speaking attempt before advancing

Rep 2 (each sentence) and Rep 4 (each active prompt/activity, whatever its type — question, visual prompt, starter, story panel):
- primary CTA (`NEXT SENTENCE` / `NEXT` / `NEXT REP`) stays disabled until one recording attempt exists for that item;
- the attempt is only required to exist — no length, quality, or scoring check;
- below the CTA, a small plain text link `SKIP THIS SENTENCE` / `SKIP THIS PROMPT` marks the item skipped and moves on. Visually secondary, never styled like Record/Next.

Rep 4 requirement is driven by the item id from the existing `rep4Items(day)` list, not by a fixed sentence count.

Rep 1 (listen) and Rep 3 (shadow) are untouched. Rep 5 board, takes, sentence counter and final selection untouched.

Attempted/skipped ids per rep are kept in the session entry so they survive a refresh.

## 4. Day summary and reset safety

Day complete screen gains one objective block above the existing stats:

```text
TODAY'S PRACTICE
REP 2   7 / 8 attempted · 1 skipped
REP 4   8 / 8 attempted · 0 skipped
FINAL REP   Completed ✓
```

Counts come from the session entry; no grading, no scores. Skipping never blocks day completion.

`RESET MY JOURNEY` on Account currently calls `JourneyService.reset()` on a single tap. It gets a destructive confirmation dialog listing what is erased (completed days, course progress, local practice history, streak) — recordings are only mentioned if the reset actually removes them. Cancel is the default focus; the destructive button is styled destructive. Reset only touches the current signed-in user or the current guest session.

## Technical notes

- New: `src/services/practice-session.ts`, plus small `ResumeScreen` / confirm-dialog blocks inside `src/routes/practice.tsx`.
- Edited: `src/routes/practice.tsx` (session persistence, gating, skip links, exit confirm), `src/components/fluency/DayCompleteScreen.tsx` (summary block), `src/routes/profile.tsx` (stat guards, reset confirmation).
- Untouched: course data files, TakeBoard, `/api/sentence-count`, Home, Progress, Recordings, auth.

## QA

Run the 12 listed scenarios in the mobile preview: account total, dynamic total, exit at Rep 4 prompt 6 and resume, refresh mid-session, start over scope, Rep 2 gating with and without a recording, Rep 2 skip, a non-sentence Rep 4 prompt, summary counts, reset confirmation with cancel, and a completed day not showing a resume prompt.
