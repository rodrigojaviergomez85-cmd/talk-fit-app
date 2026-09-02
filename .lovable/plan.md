# EAGLES — WEEK 1 · Recommend, Advise & Sell (standalone 5-day pilot)

A new, separate module card with 5 days of the existing Rep 1–5 practice plus a separate 3–5 minute **Test Ready Sprint** per day. Nothing in the existing modules, auth, sync, Rep architecture, recording board or sentence counter changes.

## What the learner sees

**Home** — a new card below the current five modules:
`EAGLES · WEEK 1` / `RECOMMEND, ADVISE & SELL` / `5 DÍAS · 25 FLUENCY REPS · 5 TEST READY SPRINTS` / subtitle "Usa tu inglés para resolver problemas, dar recomendaciones y vender." / CTA `EMPEZAR WEEK 1`. Marked as a pilot so the Home "Continue your journey" card never points existing learners into it — they only enter by tapping the card.

**Module page** (`/module/eagles-week-1`) — same layout as other modules, with the intro checklist (contar lo que pasó, ofrecer opciones, dar recomendaciones, entender lo que necesita un cliente, recomendar un producto, responder situaciones inesperadas) plus the line "⚡ 5 TEST READY SPRINTS — para practicar listening y speaking bajo presión." One week section, Days 1–5. Under each day row a small separate card:
`⚡ TEST READY · 3–5 MIN` — "Practica para evaluaciones de inglés laboral." — CTA `EMPEZAR SPRINT` (shows a check when done).

**Daily practice** (`/practice?module=eagles-week-1&day=N`) — unchanged engine: Rep 1 Listen, Rep 2 in 4 chunks (2 sentences each), Rep 3 Shadowing, Rep 4 with 3–5 WH prompts + cue chips, Rep 5 TakeBoard with the day's prompt and only small cues (no full model text shown by default). Existing Spanish-first headers are reused; Rep 5 instruction stays as configured today.

**Test Ready Sprint** (`/sprint?module=eagles-week-1&day=N`) — a new, short, single-purpose screen with one item at a time, a big mic button, and a progress dots row. No scores, no grammar feedback, no pronunciation percentages. Ends with "SPRINT COMPLETO" and a button back to the module.

## Day-by-day content

| Day | Title | Grammar | Rep 5 prompt (goal) | Test Ready |
|---|---|---|---|---|
| 1 | TELL ME WHAT HAPPENED | Simple past | Tell me about an interesting day (45s+, 6 ideas) | REPEAT IT — 5 sentences, hear once, repeat; increasing length |
| 2 | WHAT COULD YOU DO? | could / should / might / shouldn't | Give Aria your recommendation (45s+, 6 ideas) | QUICK ANSWERS — 6 short audio questions, fast spoken reply |
| 3 | GIVE GOOD ADVICE | modals for advice (Carlos / Maria / David) | Give this person advice (45–60s, 6–8 ideas); learner picks one person | BUILD THE SENTENCE — 5 chunk sets shown as chips + audio, say the full sentence |
| 4 | HELP ME CHOOSE (SALES #1) | need to / don't have to / could / should | Customer audio plays, then record a recommendation (45–60s, 6 ideas); cues BUDGET · CAMERA · RECOMMEND · BECAUSE | LISTEN & RESPOND — one customer message, 3 spoken comprehension questions |
| 5 | WHAT WOULD YOU DO? | second conditional | Choose Scenario A (dream job) or B (customer with limited budget) (45–60s+, 8 ideas) | SPEAK NOW — 10-second think timer, then speak ~45s on "Describe a difficult decision you made" with cues WHAT? WHY? WHAT DID YOU DO? RESULT? |

Model lines use exactly the 8 sentences given per day (Day 1 chunks as specified; Days 2–5 grouped 2 per chunk in order). Rep 4 uses the listed questions (max 5) with starters and WH cue chips. Day 4 shows the two product cards (Phone A $350 / Phone B $550) as a scene image and keyword chips; Day 2 shows the Peru/budget scene; Day 3 the three people; Day 5 scenario cards.

## Images

Approximately 12 new professional, adult-looking images in `src/assets/eagles/`: busy workday scene (D1), Aria + Peru/budget scene (D2), Carlos / Maria / David portraits (D3), Phone A and Phone B product cards + customer-in-store scene (D4), and 4–5 hypothetical scenario cards (D5). Photographic / editorial style, no cartoons.

## Test Ready metrics (objective only)

Per sprint we store: completed or not, attempts, total response seconds, completion time. Displayed to the learner only as "completed" and a small "Nth attempt" label — never as a score.

## Technical details

- **Types**: add `"eagles-week-1"` to `ModuleId`. Add optional fields on `CourseDay`: `rep5Audio?: { text; es; voice }` (customer message played above the Rep 5 prompt, Day 4) and `testReady?: TestReadySprint`. New types `TestReadySprint = { type: "repeat" | "quick-answers" | "build-sentence" | "listen-respond" | "speak-now"; title; titleEs; items: TestReadyItem[] ; passage?: string; thinkSeconds?; speakSeconds? }`.
- **Course file**: `src/services/eagles-week-1-course.ts` (5 `CourseDay`s, one week, `rep2Chunks` explicit for Day 1, `variants` for Day 3 people and Day 5 scenarios, `hideModelText: true` on all days so Rep 5 never shows a full speech).
- **Registration**: append to `MODULES` in `course-service.ts` with `order: 6`, `label: "EAGLES · PILOT"`, `meta: ["5 Days", "25 Fluency Reps", "5 Test Ready Sprints"]`, `highlights`, and a new optional `pilot: true` flag. `JourneyService.nextPractice` skips `pilot` modules so the Home Continue card never auto-places learners; existing modules keep their current order and logic.
- **Practice**: one additive render in Rep 5 — if `day.rep5Audio` exists, show an `AudioPlayer` labeled "ESCUCHA AL CLIENTE" above the prompt. No changes to Rep 1–4, chunking, TakeBoard or the sentence counter.
- **Sprint route**: `src/routes/sprint.tsx` (search params `module`, `day`) rendering a `TestReadySprint` component under `AppShell` inside the existing `AuthGate`. Reuses `AudioPlayer`/`AudioService.speak` for prompts (played once for Repeat It), `VoiceRecorder` with `maxSeconds` per item, and `useRecordingPlayback` for optional replay. Item flow: prompt → record → next; Speak Now adds a 10s countdown before the mic enables.
- **Persistence**: new table `test_ready_progress` (`id`, `user_id`, `module_id`, `day`, `sprint_type`, `completed_at`, `attempts`, `response_seconds`, `completion_seconds`, `updated_at`, unique on `user_id, module_id, day`) with GRANTs for `authenticated` and `service_role`, RLS scoped to `auth.uid()`. A small `TestReadyService` (upsert on completion, read for module page checks). Sprint audio is not uploaded to storage.
- **i18n**: add keys for the Test Ready card, sprint headers, "ESCUCHA AL CLIENTE", "SPRINT COMPLETO", and the module card CTA; Spanish primary, English secondary as today.
- **Module page**: add the `TestReadyCard` under each day row when `day.testReady` exists; SEO `head()` already derives from module data.

## Out of scope

Weeks 2–4, any changes to Basic Zero / Present / Past / Future / Basic 4, auth, sync, placement, recordings library, resume logic, mic test, sentence counter, official test scoring.
