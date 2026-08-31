# Backend, Privacy & Performance Hardening

No curriculum, UI, or learning-flow changes. Nothing is deleted.

## What is already correct (verified)

- Recordings bucket is private; playback already uses short-lived signed URLs generated only when the learner presses Play.
- Storage policies restrict read/write/update/delete to files under the learner's own user id folder; paths are `user_id/module-day.ext` with no personal data.
- `day_progress` and `profiles` have row level security scoped to the signed-in user, with correct grants; a unique index on (user, module, day) already makes day completion idempotent.
- Recordings page paginates (20 at a time) and loads metadata only; module and verb images already use lazy loading.
- No service-role key or secret is used in frontend code; speech processing stays in server routes.

So the main real gaps are in save reliability, audio size, and repeated data fetching.

## What will change

### 1. Final Rep save becomes reliable and visible
Today, when a practice finishes, the upload of the Final Rep is fired and any failure is silently swallowed — the learner sees "completed" even if the recording never reached the cloud.

- Add explicit save states on the day-complete flow: SAVING YOUR FINAL REP… → SAVED, or a recoverable error card ("We couldn't save your Final Rep yet. Your recording has not been removed. [TRY AGAIN]").
- The recorded blob is kept in memory until the upload result is confirmed, so retry always works in the same session.
- Local progress is still saved immediately (offline/guest behavior unchanged); only the cloud copy shows the pending/failed state.
- Errors are logged through the existing error reporting with technical detail; the learner only sees plain language.

### 2. Duplicate protection
- The finish/save action is disabled while in flight, so double taps cannot create two uploads or two completion writes.
- Cloud writes stay upsert-based on (user, module, day), so retries overwrite instead of duplicating.

### 3. Smaller speech-optimized recordings
- Set an explicit speech-appropriate bitrate (~32 kbps mono target) on the recorder while keeping the current format negotiation, so iPhone Safari, Android Chrome and desktop browsers all keep working exactly as today.
- No change to what the learner records or hears.

### 4. Fewer duplicate backend requests
- Cloud progress is pulled through one shared, short-lived cache instead of each page (Home, Progress, Recordings, Module) independently re-querying on mount.
- Totals keep being derived from that single loaded progress state and from the dynamic module catalog — no per-day queries, no hard-coded day count.

### 5. Take lifecycle (no deletion in this update)
Non-final Takes currently exist only in the browser session and are never uploaded, so there is nothing stored to clean up and no historical recording is at risk. Documented as-is; no destructive automation added.

## Technical notes

- Files touched: `src/services/journey-service.ts` (syncDay returns a result, shared pull cache), `src/routes/practice.tsx` and `src/components/fluency/DayCompleteScreen.tsx` (save state, retry, disabled-while-saving), `src/services/recording-service.ts` (bitrate), and the pages that call `JourneyService.pull()`.
- No schema migration is required; existing policies, indexes, and data stay untouched.
- Manual QA: two-account isolation check against storage and database directly, retry-on-failure path, double-tap save, and refresh-after-completion.
