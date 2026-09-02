# EAGLES Week 1 — Connected Speech upgrade (content + Power Chunks + Sales Role Play)

Incremental content/pedagogical update to the existing standalone EAGLES module. No changes to auth, backend, progress, recordings, mic, Resume, Sentence Counter, Test Ready Sprints, or other modules. No AI feedback.

## What changes for the learner

**Power Chunks (all 5 days)** — a compact card, `POWER CHUNKS`, with 2 core chunks (check icon) and 1 stretch chunk labeled `CHALLENGE`, each with a small tap-to-listen button (reuses the existing model voice). Shown in Rep 1, Rep 2 and Rep 3 under the header; shown smaller (chips-style, no audio) in Rep 4 and Rep 5 as speaking support. No extra recordings, no separate lesson.

| Day | Core | Stretch |
|---|---|---|
| 1 | because… · after that… | while I was… |
| 2 | another option is… · that's why… | however… |
| 3 | if I were you… · because… | in addition… |
| 4 | based on what you've told me… · that's why I'd recommend… | on the other hand… |
| 5 | if that happened… · overall… | however… |

**Rep 1–3 models** — all 5 days rewritten as 8 connected ideas using the exact sentences in the brief (reason, sequence, contrast, result). Spanish translations rewritten to match. Rep 2 keeps exactly 4 chunks of 2 ideas (explicit `rep2Chunks` on every day). Speaking chunk splits (`|`) placed at the connector so shadowing highlights them.

**Rep 4** — still max 5 prompts, but rewritten to the ANSWER → EXPLAIN → COMPARE → CHALLENGE → DEFEND progression per day (Day 1 simpler; Day 4 strongest: "What if the customer says 64 GB is not enough?", "How would you defend your recommendation?"). Starters and cue labels updated (e.g. WHY, WHICH, WHAT IF, DEFEND). Power Chunk support row under the question. Recording behavior unchanged.

**Rep 5 Day 4 — controlled Sales Role Play** inside the existing 5-take board:
- Take 1 is preceded by customer Turn 1 audio (already exists), Take 2 by Objection 1 ("I'm not sure. Phone A only has 64 GB. Isn't that too little?"), Take 3 by Objection 2 ("Phone B looks much better. Why shouldn't I spend the extra money?").
- Each objection card appears only after the previous take is recorded (the learner does not see what is coming). Lines are fixed text spoken by the existing TTS male voice; nothing generated.
- Takes 4–5 stay optional free retries (labeled "Retry any turn").
- Goal panel shows the **combined** speaking time of the 3 turns against 60–75 s instead of a per-take timer. Sentence counter per take runs as today.
- A small toolbox above the board: Based on what you've told me… · I understand your concern. · On the other hand… · That's why I'd recommend…
- Completion rule unchanged (3 takes + pick a final).

**Rep 5 all days** — targets updated: D1 45–60 s / 6–8 ideas, D2 45–60 s / 6–8, D3 50–60 s / 7–8, D4 60–75 s total, D5 60–90 s / 8–10. Cues reduced to minimal planning words (Day 5: DECISION · REASON · OPTION · WHAT IF? · RESULT) plus Power Chunks. Day 5 keeps the two scenarios (A dream job / B customer & budget). No full model speech is ever shown (already the case). Intro goal lines and rep5Tips updated to match the new targets.

## Technical details

- `src/lib/types.ts`: add `powerChunks?: { core: [string, string]; stretch: string }` and `rep5Turns?: { id; label; labelEs; text; es; voice? }[]` to `CourseDay` (both optional; other modules untouched).
- `src/services/eagles-week-1-course.ts`: rewrite lines, `rep2Chunks`, prompts, cues, `goalSeconds`, `goalSentences`, intro goal/examples, `rep5Tips`, add `powerChunks` for each day and `rep5Turns` for Day 4 (Turn 1 reuses the current `rep5Audio` text). Test Ready blocks left byte-identical.
- `src/components/fluency/PowerChunks.tsx` (new): compact card, `size="full" | "mini"`, uses `AudioService.speak` / `AudioPlayer` for chunk playback in full mode only.
- `src/routes/practice.tsx`: render `<PowerChunks>` when `day.powerChunks` exists — full in Rep 1/2/3, mini in Rep 4/5. In Rep 5, when `day.rep5Turns` exists, pass `turns` to `TakeBoard` and render the small toolbox card. Rep 4 support row uses the mini component (no complete answers).
- `src/components/fluency/TakeBoard.tsx`: optional `turns` prop. When present: show turn N's customer audio card inside take card N (only when that take is active or done), label optional takes as retries, and switch `GoalPanel` to a combined-seconds mode (sum of takes 0–2 vs `goalSeconds`). Default behavior for all other modules unchanged.
- `src/lib/i18n.tsx`: keys for POWER CHUNKS, CHALLENGE, TOOLBOX, "Customer turn N", "Total speaking", "Retry". Spanish primary.
- No DB changes. `hideModelText: true` stays on all EAGLES days.

## QA checklist

- Each day: 2 core + 1 stretch chunk visible in Rep 1–3, mini in Rep 4–5.
- Rep 2 = 4 chunks on all 5 days; Rep 4 = 5 prompts on all 5 days.
- Day 4 flow: Turn 1 → take → Objection 1 → take → Objection 2 → take; objections hidden until reached.
- Day 5 goal panel shows 60+ s / 8+ ideas.
- Sprints (`/sprint?module=eagles-week-1&day=N`) unchanged; other modules' practice screens unchanged; typecheck passes.
