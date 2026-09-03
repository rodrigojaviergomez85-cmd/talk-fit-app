# ADVANCED 1 — One Deliberate Repair Moment Per Day (Days 1–20)

Content-only addition to the existing `advanced-1` module. Every day gets ONE new prewritten recruiter turn added to that day's existing `rep5Turns`. No turn is replaced, no day is created, no engine change beyond one optional display field. No scoring — the learner is never graded on using a repair phrase.

## Repair rotation (by position inside each week)

```text
Day 1 of each week (1, 6, 11, 16)   NEEDS TIME      big open question
                                     "That's a good question — let me think for a moment."
Day 2 of each week (2, 7, 12, 17)   DIDN'T CATCH IT one long compound question
                                     "Sorry, could you repeat that?" / "I didn't catch the last part."
Day 3 of each week (3, 8, 13, 18)   CONFIRM         ambiguous question, two readings
                                     "So you're asking about…, right?"
Day 4 of each week (4, 9, 14, 19)   RESTART         question that invites a false start
                                     "Sorry, let me start again." / "What I mean is…"
Day 5 of each week (5, 10, 15, 20)  MIXED           any of the four, inside the week's challenge round
```

Every repair turn carries the same Spanish-first tip: "No tienes que entender todo. Pide que te la repitan, confirma, o tómate un segundo — y responde." (with a short English gloss).

## What the learner experiences

- Inside Rep 5, after finishing the previous take, one extra recruiter turn is revealed exactly like existing hidden follow-ups.
- The turn shows a small repair cue (the target phrase) plus the Spanish-first tip under it.
- The learner answers with `targetSeconds: QUICK` (20–30 s). No scoring, no detection of the phrase, no extra UI.
- On Day 17 (scenario bank) the DIDN'T CATCH IT repair turn is added inside each of the 3 prewritten scenarios so every learner gets it regardless of the persisted scenario pick.
- On Days 5, 10, 15, 20 the repair turn lives inside the existing multi-round structure (new or existing Round header), mixed type per spec.
- Voice alternates with the day's existing recruiter voice. All questions are fixed text — no AI, no generation.

## Technical details

**Types (`src/lib/types.ts`, additive)**
- Add one optional field to `RolePlayTurn`: `repairTip?: { text: string; es: string } | undefined`. No existing field touched.

**Question bank (`src/services/advanced-question-bank.ts`)**
- Add 20 fixed entries `repair-time-1…4`, `repair-catch-1…4`, `repair-confirm-1…4`, `repair-restart-1…4`, `repair-mixed-1…4` (one per day, natural professional American English with Spanish support). Existing entries unchanged.

**Week 1 (`src/services/advanced-1-course.ts`) — content append only**
- Append one `turn("a1d1-repair", …)` entry to each day's `rep5Turns` (Days 1–5) with `targetSeconds: QUICK`, the repair cue in `cues`, and `repairTip`. Day text, ids, order of existing turns unchanged. Day 5's turn lands inside the final Round.

**Weeks 2–4 (`src/services/advanced-1-weeks-2-4-course.ts`)**
- Same append for Days 6–20 following the rotation table. Day 17: append the repair turn to all 3 `rep5Scenarios`. Day 19: the RESTART repair is a recruiter turn, kept separate from the customer/sales turns. Day 20: the MIXED repair turn is inserted into the 8-Round simulation as its own short beat.

**Rep 5 UI (`src/components/fluency/TakeBoard.tsx` or the rep5 turn renderer)**
- Render `repairTip` when present: small Spanish-primary line under the turn text (same visual treatment as the existing per-turn `toolbox`/`framework` blocks). Hidden with the turn until revealed; no new state, no scoring hook. If the tip can ride on an existing rendered field with zero UI change, prefer that — decide at implementation time by reading the current turn card.

**Outline**
- No change to `scripts/gen-course-outline.ts` input: outline counts lines/chunks/prompts, not rep5Turns. Regenerate only if the outline test counts turns (verify first).

**Not touched**: practice engine, hidden follow-up reveal logic, timers, recordings, sentence counting, auth, sync, progress, placement, habit, badges, Test Ready, other modules, Week 1 wording of existing turns, module metadata (day counts unchanged).

## Verification

- `bunx tsgo --noEmit` + vitest (outline/course-index tests).
- Content invariant check: each day 1–20 has exactly one turn whose id ends in `-repair`; existing turn ids deep-equal before/after; rotation types match the table.
- Browser pass at 393px: D1 (NEEDS TIME revealed after first take, tip visible), D7 (compound question), D13 (CONFIRM), D17 (repair present in all 3 persisted scenarios, survives reload), D19 (recruiter repair distinct from customer turns), D20 (repair inside the simulation, module completion still triggers). No console errors.
