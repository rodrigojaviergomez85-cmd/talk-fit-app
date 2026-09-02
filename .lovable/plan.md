# INTERMEDIO — SHARKS (Adapt, Improvise & Keep the Conversation Going) — 20-day module

Additive curriculum expansion, built exactly the way TIGERS was: a new module ID, 20 new days on the existing 5-Rep flow, 12 optional Test Ready Sprints, fixed prewritten role plays, and the same completion / progress-moment / habit / recordings integrations. Nothing in EAGLES, TIGERS, BASIC, auth, sync, placement, habit, streak or badges is rebuilt.

## What the learner gets

- New module card **INTERMEDIO · SHARKS — ADAPT, IMPROVISE & KEEP THE CONVERSATION GOING**, ordered right after TIGERS. Hidden from self-placement (reached by finishing TIGERS). Existing TIGERS learners keep their exact position.
- 4 weeks / 20 days, 5 Fluency Reps per day (Rep 2 = 4 chunks, Rep 4 <= 5 prompts):
  - Week 1 THINK FAST, REACT & ADAPT (Days 1-5)
  - Week 2 CLARIFY, REPHRASE & RECOVER (Days 6-10)
  - Week 3 ARGUE, PERSUADE & CHANGE YOUR MIND (Days 11-15)
  - Week 4 LEAD, ADAPT & IMPROVISE (Days 16-20)
- Rep 5 speaking goals rise from 75-90 s (Weeks 1-2) to 90 s (Week 3) to 90-120 s / 12-14 ideas on Day 20.
- Fixed multi-turn Rep 5 conversations where **new information appears only after the learner has answered** (Days 3, 4, 5, 8, 10, 12, 13, 14, 16, 17, 19, 20). The existing TakeBoard already reveals turns one at a time, so the "new info" turn stays hidden until reached. Days 8 and 19 include an explicit "NOW ASK A NATURAL QUESTION BACK" turn.
- Day 15 picks one debate topic and Day 20 one scenario (Customer Service / Sales / Workplace / Life Decision) from small fixed banks at random, persisted across resume — reusing the scenario mechanism built for TIGERS Day 20. Day 20 shows only the cue skeleton UNDERSTAND / DECIDE / WHY / NEW INFO / ADAPT / SUMMARIZE (no full model).
- Power Chunks: shared pool (If I understand correctly..., So what you're saying is..., If that's the case..., Based on that new information..., What I mean is..., Let me rephrase that., Another way to look at it is..., At the same time..., It depends on..., To sum up..., That's a good question., Let me think for a second., Let me explain that another way., Sorry, that's not exactly what I meant.), each day 2 core + 1 stretch.
- Rep labels on Rep 4 / Rep 5 reuse the TIGERS chip system, extended with REACCIONA / ACLARA / ADAPTA where the day calls for it.
- 12 optional Test Ready Sprints on Days 1, 3, 5, 7, 9, 10, 11, 13, 15, 16, 18, 20 (story retell, listen & respond with new info, speak now 5-10 s prep, listen + paraphrase, speak now + rephrase, information retell + opinion, two-speaker listen & respond, listen + inference, reflection, unexpected scenario). 3-5 minutes each, never scored.
- Completion moment: "🦈 SHARKS COMPLETE", "INTERMEDIO · MES 3 ✓", "COMPLETASTE TU VIAJE: 🦅 EAGLES · 🐯 TIGERS · 🦈 SHARKS", "AHORA PUEDES PRACTICAR CÓMO:" (7 items from the spec), "ESCUCHA TU CAMBIO" Day 1 vs Day 20 comparison. Never says "you are B2".
- New **60-day moment** on SHARKS completion: "🔥 60 DÍAS HABLANDO INGLÉS — Escucha cómo empezó este camino y cómo hablas hoy." Compares the learner's earliest saved Intermediate Final Rep (EAGLES Day 1 if available, otherwise their real first) with SHARKS Day 20. Metrics shown only when derivable from saved data (days, Final Reps, minutes, Test Ready count; "300 FLUENCY REPS" only if all 60 days are complete). No scores or CEFR claims.
- NEXT UP after SHARKS: **AVANZADO — CONSOLIDATE & MASTER** as a PRÓXIMAMENTE preview with the spec's promise and 6 teaser items; no CTA. TIGERS completion now routes to real SHARKS automatically (the router already picks the next published module).
- Recordings page groups INTERMEDIO > SHARKS > Week 1-4 with the week names above; weekly "ESCUCHA TU SEMANA" moments work unchanged.
- Habit journey / streak continue as-is; skill badges gain SHARKS days: conversation (role-play days), customer service (Day 10), sales (Day 14). Existing badge IDs untouched.
- ~20 scene images in the existing navy/orange brand style (mature, professional; no cartoon sharks).

## Technical details

New files
- `src/services/sharks-week-1-course.ts` (Days 1-5, `SHARKS_WEEKS`) and `src/services/sharks-weeks-2-4-course.ts` (Days 6-20, Day 15 topic bank and Day 20 scenario bank via `rep5Scenarios`), built with the existing flexible `makeDay` factory. Stable IDs `sharks-d01…d20`, `sharks-w1…w4`, `s20-customer`, `s20-sales`, `s20-work`, `s20-life`, `s15-t1…t5`.
- `src/assets/sharks/scene-d01…d20.jpg` (generated).
- `src/components/fluency/JourneyMoment.tsx` — the 60-day comparison block, rendered by `ModuleMoment` only for `sharks` when a reliable start recording exists.

Edits
- `src/lib/types.ts`: `ModuleId` += `"sharks"`; `RepLabel` += `"react" | "clarify" | "adapt"`; `TestReadySprint.passageParts?: { voice: "female" | "male"; text: string }[]` for two-speaker audio (Days 13, 16) — sequential playback in `TestReadySprint.tsx`, falling back to `passage` elsewhere.
- `src/services/course-service.ts`: register `sharks` (order 8, `hiddenFromPlacement: true`, level "INTERMEDIO", 20 days, highlights, "12 TEST READY SPRINTS"); `isModuleId` += `sharks`; `UPCOMING_LEVELS` drops `sharks`, keeps `advanced`.
- `src/services/preferences.ts`: `MODULE_IDS` += `"sharks"`.
- `src/lib/progress-moments.ts`: `TRANSFORMATION`, `MODULE_EMOJI` (🦈), `MODULE_COMPLETION` (MES 3 line, journey line, 7 capabilities), `NEXT_UP.sharks` (used when TIGERS completes); `UPCOMING_NEXT_UP.advanced` with the spec copy; `nextModuleAfter` falls back to `advanced` instead of `sharks`; new `journeyComparison(state)` helper (earliest Intermediate Final Rep vs SHARKS Day 20) and `journeyMetrics`.
- `src/lib/i18n.tsx`: `place.sharks`, `rep.label.react|clarify|adapt`, 60-day moment strings.
- `src/lib/habit.ts`: `SKILL_DAYS.sharks = { rolePlay: [3,4,5,8,10,12,13,14,16,17,19,20], customerService: [10], sales: [14] }`.
- `src/routes/practice.tsx`: no structural change; Day 15/20 selection already flows through `CourseService.withScenario` + `PracticeSessionService.scenarioFor`. Rep 5 skeleton chips become data-driven (`rep5Skeleton?: string[]` on `CourseDay`, defaulting to the TIGERS list) so SHARKS Day 20 shows UNDERSTAND / DECIDE / WHY / NEW INFO / ADAPT / SUMMARIZE.
- `src/components/fluency/ModuleMoment.tsx`: render `JourneyMoment` for `sharks`.

Not touched: EAGLES/TIGERS/BASIC content, auth, cloud sync, PlacementPicker (filter already hides `hiddenFromPlacement`), Test Ready persistence (generic `moduleId:day`), TakeBoard, DayCompleteScreen flow, recordings storage, habit/streak counters, badge IDs. Peer Motivation does not exist in the codebase and is not added. No AI grading or generative turns anywhere.

Verification: typecheck, open `/module/sharks`, run Day 3 (new-info turn hidden until reached), Day 20 (scenario persists across reload), Test Ready Day 13 (two voices), and confirm TIGERS completion previews SHARKS while SHARKS completion previews AVANZADO.
