# Coach Check — show a coach what was practiced on any calendar date

## What the learner gets

A new screen, `/coach-check`, reached from two places:

- Home: a light outline button **MOSTRAR A MI COACH / SHOW MY COACH** placed right under the main module card (the orange CONTINUE card stays the only primary action).
- Recordings page: a small **COACH CHECK** link at the top of the page.

The screen, top to bottom:

1. Header: **COACH CHECK**, plus the learner's name/email when the account has one.
2. **¿QUÉ FECHA QUIERES MOSTRAR?** followed by a horizontal chip row: HOY · AYER · then the 5 previous dates (e.g. "2 SEP") · **📅 OTRA FECHA** (opens a calendar; future dates disabled). Default selection is yesterday. The chosen date is echoed in large text: "MARTES · 1 DE SEPTIEMBRE".
3. Result for that date:
   - **✅ PRÁCTICA REGISTRADA** (or "✅ 3 PRÁCTICAS REGISTRADAS") with one stacked card per completed curriculum Day: module + DAY N, "COMPLETADO · 7:42 PM", **⭐ FINAL REP [▶ ESCUCHAR · 0:51]**, and a collapsed "4 TOMAS · VER TODAS ↓" that expands to the per-take list (TOMA 1 ▶ 0:31 … TOMA 4 · FINAL ⭐).
   - **🔴 SIN PRÁCTICA REGISTRADA** — "No encontramos una práctica completada el 1 de septiembre." Nothing else is suggested.
4. **ÚLTIMOS 7 DÍAS**: 7 tappable rows (date · ✅ / ✅ 3 / —). Tapping a row selects that date and updates the section above.
5. A subtle status line: VERIFICANDO… → ✓ DATOS ACTUALIZADOS, or SIN CONEXIÓN · Mostrando el último progreso disponible if the refresh fails and cached data exists.

Fully bilingual via the existing ES/EN app language setting. No streaks, badges, Test Ready, charts, ON TIME/LATE labels, or any coach/class/assignment system.

## How it decides what was done on a date (the important part)

- Source of truth: the learner's own `day_progress` rows fetched fresh from the backend when the screen opens (the existing `JourneyService.fetchRemote()` already does this, bypassing the short cache).
- Calendar-day grouping uses the app's existing strategy: `local_day_key` (the device-local date written at completion time), falling back to the local-time date of `completed_at` — exactly what `fetchRemote()` already does when building `dayKey`. No UTC-date grouping, no new timezone system.
- Current curriculum position, streak, and local UI state are never consulted. Multiple rows on the same date all appear, sorted by completion time.
- Takes come from the existing `CloudSync.listTakes(moduleId, day)`, which already excludes purged audio, so no broken Play buttons. The Final Rep plays via the existing `RecordingPlayButton` (signed private URLs from `recording_path`); takes use the same shared player keyed per take.
- Nothing is written: no new tables, no new completion records, no RLS or storage-policy changes. Existing owner-only policies on `day_progress`, `recordings`, and the private `recordings` bucket already restrict everything to the signed-in learner.
- Screen requires sign-in (same `AuthGate blocking` pattern as Practice).

## Technical details

New files
- `src/routes/coach-check.tsx` — route with its own `head()` metadata; `AuthGate blocking`; loads `JourneyService.load()` for instant cache, then `JourneyService.fetchRemote()` for the authoritative refresh; tracks `status: "checking" | "fresh" | "offline"`.
- `src/lib/coach-check.ts` — pure helpers (unit-tested): `groupByDayKey(records)`, `recentDayKeys(n, now)`, `formatLongDate(key, lang)`, `formatTime(iso, lang)`. Uses the exported `JourneyService.dayKey`.
- `src/components/fluency/coach/DateChips.tsx` — HOY/AYER/date chips + OTRA FECHA popover using the shadcn Calendar (`disabled={{ after: today }}`, `pointer-events-auto`).
- `src/components/fluency/coach/PracticeCard.tsx` — one completed Day: heading via `recordHeading()`, completion time, `RecordingPlayButton` for the Final Rep, collapsible take list fetched lazily with `CloudSync.listTakes`; each take plays through `useRecordingPlayback(\`take:${moduleId}:${day}:${n}\`)` resolving `JourneyService.signedRecordingUrl(storagePath)`.
- `src/components/fluency/coach/SevenDayHistory.tsx` — tappable rows with counts.

Edits
- `src/routes/index.tsx` — add outline `Link to="/coach-check"` under `CurrentModuleCard`.
- `src/routes/recordings.tsx` — add small `Link to="/coach-check"` at the top of the content.
- `src/lib/i18n.tsx` — add `coach.*` keys (all Spanish/English strings listed in the spec).
- `src/lib/coach-check.test.ts` — grouping, 7-day key generation, multiple practices per date, empty date.

Not touched: curriculum content, Rep 1–5 logic, Final Rep selection, uploads, storage paths, purge behavior, progress calculations, habit/badges, Test Ready, auth, sync, module/day IDs, existing Recordings page behavior beyond the one link.

## Verification before finishing

Typecheck + tests; mobile browser run signed in as a test learner: default = yesterday, pick a date 3+ days back via chips, history rows and calendar; confirm future dates are disabled, results match `day_progress.completed_at` rows (query the table directly to compare), a no-practice date shows the honest empty state, multiple Days on one date all render, Final Rep plays, takes list expands with only non-purged takes, and status line reflects real refresh outcome.
