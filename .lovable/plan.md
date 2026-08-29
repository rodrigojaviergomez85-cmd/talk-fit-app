# Rep 5 — Sentence count per take

## Goal

After each Take in Rep 5, the app estimates how many complete spoken sentences/ideas the learner said, and shows it in red (under 5) or green (5+), together with the duration. No grammar or pronunciation correction, no transcript shown.

## What the learner sees

**Top of Rep 5 — TODAY'S GOAL**

```text
TODAY'S GOAL      30+ sec   ·   5+ sentences

TIME              SENTENCES
🔴 22 / 30 sec    🔴 3 / 5
```
Both indicators update after each recording and reflect the most recent take (best take is also highlighted in green once reached).

**Each of the 5 take cards (all stay visible)**

```text
TAKE 2 ✓
33 sec
🟢 6 sentences
Goal reached!
[▶ PLAY] [■ STOP] [🗑 DELETE]   [Use as final]
```
- Less than 5 sentences: red count + "Keep going — aim for 5." / "Sigue — busca 5."
- 5 or more: green count + "Goal reached!" / "¡Meta alcanzada!"
- While the estimate runs: "Counting sentences…" / "Contando oraciones…" (playback and delete work immediately).
- If the estimate can't be produced (offline / service busy): the card shows the duration and "Sentence count unavailable" instead of a red 0 — it never punishes the learner for a technical failure.

Deleting a take clears its count too. Completion rules stay as they are today (3 required takes + one selected final rep); the sentence count is informational and does not block finishing the day.

## Technical notes

1. **New server route `src/routes/api/sentence-count.ts`** (same pattern as `/api/tts`, reads `LOVABLE_API_KEY` inside the handler):
   - Accepts the audio blob as multipart form data.
   - Step 1: transcription via the Lovable AI gateway (`openai/gpt-4o-mini-transcribe`).
   - Step 2: a small chat call (`google/gemini-3.7-flash`) with a strict JSON schema returning only `{ "sentences": number }`, prompted to count complete spoken ideas rather than punctuation, tolerating beginner pauses and filler.
   - Response body is `{ sentences: number }` only — the transcript is never returned to the browser.
   - Gateway errors are mapped per the standard contract (402/403 terminal, 429/5xx surfaced as retryable); no retry loops.

2. **`Recording` type** gains optional `sentenceCount?: number | null` and `countStatus?: "pending" | "done" | "failed"`.

3. **`TakeBoard.tsx`**: after `onRecorded`, post the blob to the new route, keep per-take state, render duration + colored count + message, and add the goal indicators block above the cards. Existing shared play/stop, delete, and final-selection behavior is unchanged.

4. **`practice.tsx`**: stores the count with each take (so counts persist while navigating within Rep 5) and passes the day time goal (30 sec threshold) to the board.

5. Reps 0–4, day completion, streak, and cloud sync logic are untouched.

## Verification

- Typecheck passes; `/practice?day=1` loads.
- A generated test audio clip sent to `/api/sentence-count` returns a plausible number and no transcript.
- Browser check of Rep 5: goal indicators render, cards show pending → count, red/green thresholds correct at 4 vs 5.
