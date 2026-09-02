# Lazy-load course content: download only the module the learner opens

## Current state (verified)

- `src/services/course-service.ts` statically imports all 12 curriculum files (Basic Zero, Simple Present weeks 2-4, Past Stories, Simple Future, Mixed Tenses, Eagles W1 + W2-4, Tigers W1 + W2-4, Sharks W1 + W2-4, Advanced 1) and defines Simple Present days 1-5 inline. Each course file statically imports its scene images, so every image is reachable from the same graph.
- `course-service.ts` is reachable from the app root (`auth.tsx` -> `journey-service` -> `course-service`), so every screen ships the whole curriculum.
- All ~30 consumers call `CourseService` synchronously in render bodies. Only three need full day content: `/module/$moduleId` (day list + `testReady`, current `DailyPracticeCard` day), `/practice` (`lines`, `prompts`, `rep5*`, `verbCards`, `storyPanels`, images) and `/sprint` (`testReady` sprint). Everything else (Home, Progress, Recordings, Account, Level, Onboarding, ContinueCard, BadgeGrid, WeekMoment, ModuleMoment, DayCompleteScreen, PlacementPicker, `habit.ts`, `progress-moments.ts`, `recordings.ts`, `journey-service.ts`) reads only module metadata and light day fields: `day`, `week`, `weekTitle`, `topic`, `topicEs`, `focus`, `focusEs`, `estimatedMinutes`, `goalSeconds`, `goalSentences`, `testReady` presence, `testReadyOptional`.
- Silent fallbacks exist today: `getModule()` returns `MODULES[0]` for unknown ids; `getDay()` returns `days[0]` for unknown day numbers; `journey-service.ts:515` maps unrecognized `day_progress.module_id` to `"simple-present"`.
- No `manualChunks` or router config changes are involved; the "cloud-sync" chunk name is just Rollup naming a dynamically imported file.

## What will change

### Part 1 - Lightweight static index (always loaded)
New `src/services/course-index.ts`:
- `MODULE_INDEX`: every module's metadata exactly as today (id, order, label, title, subtitle/Es, statusLine, description/Es, meta, highlights, weeks, pilot, hiddenFromPlacement, extra, cta, family, cyclePosition, builtWeeks) plus a compact `days: DayOutline[]`.
- `DayOutline` = `{ day, week?, weekTitle?, topic, topicEs, focus, focusEs, estimatedMinutes, goalSeconds, goalSentences?, testReady?: { title, titleEs }, testReadyOptional? }`. No lines, prompts, chunks, role plays, scenario banks, images.
- `isModuleId`, `DEFAULT_MODULE` and the `LearningModule` type move here (course-service re-exports them, so existing imports keep working).
- `CourseService` keeps its synchronous API backed by the index: `modules()`, `displayIndex()`, `getModule()`, `totalDays()`, `totalDaysAll()`, `getDays()`, `getDay()` - all return metadata/outline. Home, Progress, JourneyService, placement, Account, Recordings, moments, habit and badges keep working unchanged.
- The index is derived once at build time by a script-free approach: it is a hand-maintained file, and a unit test (`course-index.test.ts`) loads every full module and asserts the outline matches (same day numbers, weeks, topics, sprint flags, totals) so the two cannot drift.

### Part 2 - Dynamic content loading
In `course-service.ts` (keeps the name; loses all static curriculum imports):
- `CourseService.loadModule(moduleId): Promise<LoadedModule>` with an explicit `switch` of dynamic imports: `import("./basic-zero-course")`, `import("./simple-present-course")`, `import("./past-stories-course")`, `import("./simple-future-course")`, `import("./mixed-tenses-course")`, Eagles = `Promise.all([import("./eagles-week-1-course"), import("./eagles-weeks-2-4-course")])`, same pairing for Tigers and Sharks, `import("./advanced-1-course")`. Unknown id -> throws `ModuleNotFound` (never falls back).
- Simple Present days 1-5 move byte-for-byte from `course-service.ts` into `simple-present-course.ts` (exported as `SIMPLE_PRESENT_DAYS`, week 1 + extra days combined there).
- `CourseService.peekModule(moduleId)` returns the loaded content synchronously if cached, else `null`.
- `getModelText` and `withScenario` stay as pure helpers.

### Part 3 - Session cache with dedupe and failure eviction
- `Map<ModuleId, Promise<LoadedModule>>`; the promise is stored before awaiting so concurrent callers share one import.
- On rejection the entry is deleted so Retry re-imports. No preloading of other modules.

### Part 4 - Module, Practice and Sprint routes
- New hook `useModuleContent(moduleId)` in `src/hooks/use-module-content.ts` returning `{ status: "loading" | "ready" | "error", module, retry }`, subscribing to the cache (instant when already loaded, no flash).
- `module.$moduleId.tsx`: `beforeLoad`/`head` keep using the sync index (`notFound()` for unknown ids, unchanged). Component reads full days via the hook; while loading it shows the existing pulse skeleton block (the same `aria-busy` 4-bar skeleton already in the file); on error it shows the existing bordered error card pattern with copy "NO PUDIMOS CARGAR ESTE MÓDULO" / "REINTENTAR" (i18n keys added, EN: "We couldn't load this module" / "Retry").
- `practice.tsx`: the route component becomes a thin `PracticeRoute` that resolves the module via the hook, then mounts the existing `PracticePage` with the full `CourseDay` passed in (state initializers like `takeSlots(day.rep5Turns)` still run with real data). Loading shows the same skeleton inside `AppShell`; error shows the same recoverable card. `validateSearch` keeps using sync `totalDays` from the index. Everything inside `PracticePage` (Reps 1-5, 4 chunks, 5 prompts, sessions, sync) is untouched.
- `sprint.tsx`: same wrapper approach around the existing `SprintPage`, reusing its existing `h-40` pulse skeleton.
- No router config, `vite.config.ts` or `src/routeTree.gen.ts` changes. Route files only.

### Part 5-6 - Home, Progress, placement, review
- No code changes needed beyond the index: they already only touch metadata. Placement/Account can pick any module; opening it triggers that module's import only. Reviewing an earlier module loads it on demand; returning uses the cache.

### Part 7 - Images
- Image imports stay inside each course file, so they move into that module's chunk automatically. Verified in the build output and in-browser.

### Part 10 - Unknown module safety
- `CourseService.getModule()` no longer falls back to `MODULES[0]`; it throws for unknown ids (callers already guard with `isModuleId` / `notFound`). `getDay()` keeps the clamp-to-first-day behavior only for out-of-range day numbers on a valid module (unchanged UX).
- `journey-service.ts:515`: rows with `module_id` null/empty keep the legacy Simple Present mapping (pre-module data); rows with an unrecognized non-empty id are skipped instead of being mislabelled. No data is written or transformed.
- `/practice` and `/sprint`: missing `module` param still defaults to `DEFAULT_MODULE`; an invalid value throws `notFound()`.

### Part 11 - Database
- No migrations, no schema, no data changes.

## Verification (before finishing)
- Production build succeeds; report the generated course chunks and sizes (`basic-zero-course-*.js`, `simple-present-course-*.js`, `past-stories-*.js`, `simple-future-*.js`, `mixed-tenses-*.js`, `eagles-*.js`, `tigers-*.js`, `sharks-*.js`, `advanced-1-*.js`) and confirm no curriculum text or course images remain in the shared/initial chunks.
- Browser (mobile viewport, signed in): Home renders immediately with correct Continue CTA; Progress renders the full map; network shows no course chunk on either.
- Basic Zero Day 1: Reps 1-5 work, Rep 2 shows 4 chunks, images render. Eagles Day 1 and Tigers Day 1 open with images. Sprint opens for a Test Ready day.
- Returning to an already-opened module shows no skeleton and no new request; switching level in Account to Tigers and back works.
- Simulated import failure shows the retry card; Retry succeeds; progress untouched.
- Typecheck and the index-consistency test pass.

## Files touched
`src/services/course-service.ts`, new `src/services/course-index.ts`, new `src/services/course-index.test.ts`, `src/services/simple-present-course.ts` (receives days 1-5), new `src/hooks/use-module-content.ts`, `src/routes/module.$moduleId.tsx`, `src/routes/practice.tsx`, `src/routes/sprint.tsx`, `src/services/journey-service.ts` (one line), `src/lib/i18n.tsx` (two keys). Nothing else.
