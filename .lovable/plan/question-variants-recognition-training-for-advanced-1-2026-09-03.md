# Question variants — recognition training for ADVANCED 1

## What the learner experiences

**Every normal day (1–4, 6–9, 11–13, 16, 17)**
- Intro banner, Rep 1, Rep 2, Rep 3 and the Rep 5 "ANSWER" card keep the **canonical** question. Nothing changes there.
- **Rep 5, turn 1** now asks the *same* question in **different recruiter words** (one fixed variant per day, never random, never AI). Above it, a Spanish-first tip:
  "Es la misma pregunta con otras palabras. Usa la misma estructura." / "Same question, different words. Use the same structure."
- Follow-up turns and the daily repair turn stay exactly as they are (still unannounced).

**Round days (5, 10, 15, 20) — new RECONOCE block**
- After the existing rounds and before the closing REPAIR round, a new round "RECONOCE LA PREGUNTA" fires **4 questions (5 on Day 20)** from *different* types taught that week, each in a non-canonical phrasing.
- Before recording each one the learner sees:

```text
 ¿QUÉ TE ESTÁN PIDIENDO?
 [ UNA HISTORIA ]  [ EVIDENCIA ]  [ UNA OPINIÓN ]  [ SERVICIO ]
```
- Tap → that framework's cues appear. If it differs from the expected type, both are shown side by side ("Esperábamos: EVIDENCIA · Tu estructura también sirve") — no score, no red, no penalty.
- The RECORD button is always available, tap or no tap. Recognition never blocks.
- Per-week option sets (only frameworks already taught that week):
  - Week 1: HISTORIA · EVIDENCIA · OPINIÓN · SERVICIO AL CLIENTE
  - Week 2: HISTORIA · EVIDENCIA · UNA DEBILIDAD · SERVICIO AL CLIENTE
  - Week 3: HISTORIA · EVIDENCIA · UNA DEBILIDAD · TU FUTURO
  - Week 4: HISTORIA · EVIDENCIA · PREGUNTA INESPERADA · SERVICIO / VENTA · TU FUTURO

Days 14, 18, 19 (multi-round but not the week's round day) are left unchanged; their turn 1 is not the day's canonical banner question, so a variant there would train nothing.

## Technical details

**Part 1 — bank (`src/services/advanced-question-bank.ts`)**
- Add `variants?: { text: string; es: string }[]` to `AdvancedQuestion`. Canonical `text/es` stays primary.
- Populate 3–4 natural recruiter/customer phrasings for the 34 non-repair entries (all categories except `repair`). Repair entries intentionally get no variants.
- Add helper `bankVariant(id, index)` → returns the variant (falls back to canonical if missing, so nothing can throw).

**Part 2 — turn 1 variants**
- `src/lib/types.ts`: add `variantTip?: { text: string; es: string }` to `RolePlayTurn` (parallel to `repairTip`).
- `advanced-1-course.ts`: export `VARIANT_TIP` and helper `variantTurn(id, who, bankId, variantIndex, voice, extra)` that builds turn 1 from the chosen variant and attaches the tip. Rep 5 turn 1 on Days 1–4, 6–9, 11–13, 16 and all three Day 17 scenarios switches to it (fixed index per day, e.g. 0). Turn ids, `rep5Prompt`, follow-ups, repair turns, cues, targetSeconds unchanged.
- `TakeBoard.tsx`: render `variantTip` the same way `repairTip` is rendered (only while `isActive && !take`).

**Part 3 — recognition block**
- `types.ts`: add to `RolePlayTurn`
  `recognition?: { prompt: string; promptEs: string; options: { id: string; label: string; labelEs: string; cues: string[] }[]; expected: string }`.
- `advanced-1-course.ts` (Day 5) and `advanced-1-weeks-2-4-course.ts` (Days 10, 15, 20): insert new turns `a1d5-rec1…rec4`, `a1d10-rec1…rec4`, `a1d15-rec1…rec4`, `a1d20-rec1…rec5` in a new round ("RECONOCE LA PREGUNTA" / "RECOGNIZE THE QUESTION") placed before the repair round; the repair round's `n` shifts by one so numbering stays sequential. Each uses a non-canonical variant of a bank id from a different category, `targetSeconds` QUICK-ish ([25, 40]), and a `recognition` payload from the week's option set. Existing turn ids/text untouched.
- `TakeBoard.tsx`: when `turn.recognition && isActive && !take`, show the chip row above the audio/recorder; ephemeral `picked: Record<number, string>` state (same pattern as `prepDone`); after a tap show picked cues and, if `picked !== expected`, the expected framework alongside. `VoiceRecorder` rendering is not gated on the pick. Recording, `onRecorded`, Final Rep, sync: untouched.
- Days 5/10/15/20 already are pressure rounds (>3 turns), so adding turns only lengthens the day (user-approved); `isPressureRound`/`requiredTakes` logic is not modified.

**Not changed:** module/day/turn ids, day numbers, 5-rep structure, Rep 2 = 4 chunks, Rep 4 ≤ 5 prompts, Reps 1–3 canonical question, recordings, auth, sync, other modules.

## Verification
- Script check: every Advanced 1 day still has 4 Rep 2 chunks / ≤5 Rep 4 prompts, no duplicate turn ids, turn 1 text ≠ `rep5Prompt.question` but same bank id on variant days, Days 5/10/15/20 contain exactly 4/4/4/5 recognition turns with options from the week set.
- Typecheck, Vitest, outline regeneration (day counts unchanged).
- Browser (phone viewport): ADVANCED 1 Day 1 — Intro/Reps 1–3 show the canonical "Tell me about yourself", Rep 5 turn 1 shows a variant with the tip; Day 5 — recognition chips appear, tapping a "wrong" option shows the expected one alongside, RECORD is available before and after tapping.
