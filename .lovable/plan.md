# Split the course bundle: load only the module the student opens

## What is happening today

`src/services/course-service.ts` statically imports all 13 curriculum files (~720 KB of source, 160 days). It is also reached from the root of the app (`src/lib/auth.tsx` -> `journey-service` -> `course-service`), so every screen, including Home, ships the whole curriculum in the first download. Simple Present Week 1 (days 1-5) is even defined inline inside `course-service.ts` itself.

Screens that need the *full* day content (lines, prompts, images, role-play turns) are only three: the module page, Practice and Sprint. Everything else (Home, Progress, Recordings, Account, badges, habit, progress moments, journey math) only needs metadata: module id/label/title/order, day count, and per-day `week`, `topic`, `goalSentences`, `testReady`.

## What will change

### 1. Small static index (always loaded, ~20 KB)
- New `src/services/course-index.ts` containing:
  - The module cards (`MODULES` metadata exactly as today, minus `days`).
  - A compact per-day outline for every module: `day`, `week`, `topic`, `topicEs`, `focus`, `focusEs`, `estimatedMinutes`, `goalSeconds`, `goalSentences`, `testReady` (boolean), `testReadyOptional`.
- `CourseService` keeps its current synchronous API for metadata: `modules()`, `getModule()` (metadata + outline days), `displayIndex()`, `totalDays()`, `totalDaysAll()`, `getDays()` (outline), `getDay()` (outline), `isModuleId`, `DEFAULT_MODULE`. Home, Progress, Recordings, Account, PlacementPicker, BadgeGrid, ContinueCard, WeekMoment, habit, progress-moments and journey-service keep working unchanged and render instantly.
- A small unit test asserts every outline matches the full content (day numbers, weeks, topics, sprint flags) so the two can never drift.

### 2. Full content loaded on demand, cached for the session
- New `CourseContent` loader in `course-service.ts`:
  - `load(moduleId): Promise<LearningModule>` using a `switch` of `await import("./basic-zero-course")` etc. (one dynamic import per module; Eagles/Tigers/Sharks import their week-1 and weeks-2-4 files together).
  - In-memory `Map` cache plus in-flight promise dedupe, so revisiting a module (or going back to an earlier one) is instant and no module is ever fetched twice per session.
  - `peek(moduleId)` returns the cached module synchronously when available.
- Simple Present days 1-5 move out of `course-service.ts` into `simple-present-course.ts` (content byte-for-byte identical), so `course-service.ts` shrinks to the index + loader.
- `getModelText` and `withScenario` stay as pure helpers.

### 3. Routes fetch their module before rendering
- `module.$moduleId.tsx`, `practice.tsx`, `sprint.tsx`: add a route `loader` (with `loaderDeps` on the `module` search param for practice/sprint) that awaits `CourseContent.load(moduleId)`, and use the existing pulse skeleton as `pendingComponent` (short `pendingMs`) so there is no blank flash. Components read full days from the loaded module instead of the static `CourseService.getDay`.
- `DayCompleteScreen` and any other component that receives the day object keep receiving the same object — no prop or UI changes.
- Images stay as static imports inside each course file, so they move into that module's chunk and only download with it.

### 4. Route-level code splitting
- TanStack Start's automatic code splitting is already on by default; the fix is removing the static curriculum from the shared graph. After the change, each route's component is its own chunk and each curriculum module is its own chunk (`basic-zero-course-*.js`, `eagles-*.js`, ...). No `manualChunks` needed.

## Out of scope (unchanged)
UI, copy, practice logic, auth, sync, recordings, images, database, module ids, learner data.

## Verification
- Build and inspect output: the initial (`cloud-sync`/shared) chunk no longer contains curriculum text; per-module chunks exist.
- Browser check on mobile viewport: Home and Progress render immediately (no skeleton wait); network shows no course chunk loaded.
- Open Day 1 of Basic Zero, Eagles and Tigers: content and scene images render; skeleton shown while fetching; revisiting a module makes no new request.
- Switch level in Account to Tigers, then back to Basic Zero; both open correctly.
- Typecheck and the outline-consistency test pass.

## Technical notes
- Files touched: `src/services/course-service.ts`, new `src/services/course-index.ts`, `src/services/simple-present-course.ts` (receives Week 1 days), `src/routes/module.$moduleId.tsx`, `src/routes/practice.tsx`, `src/routes/sprint.tsx`, plus small read-site updates in `DayCompleteScreen.tsx` / `ContinueCard.tsx` if they need a full-day field not in the outline (currently they do not).
- SSR: dynamic imports also work server-side, so SSR of `/module/...` still renders the full page.
- `CourseService.getDay()` remains synchronous but returns outline days; any call site that needs `lines`/`prompts`/`rep5*` must go through `CourseContent` (typecheck will flag these because the outline type omits those fields).
