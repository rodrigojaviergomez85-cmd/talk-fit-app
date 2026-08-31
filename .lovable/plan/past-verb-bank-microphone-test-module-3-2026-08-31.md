# Past Verb Bank + Microphone Test (Module 3)

Incremental update. No curriculum rewrite, no changes to Home, Progress, Recordings, onboarding, auth, Rep 1–5 methodology, Rep 5 board, or Sentence Counter.

## 1. Past Verb Bank (30 verbs, one card each)

A single canonical list of the 30 verbs you listed (20 irregular + 10 regular), each with: id, present, past, example sentence, Spanish gloss, type (irregular/regular), image.

- Images: reuse the existing Module 3 verb images already in the project (wake up, get up, eat, drink, leave, arrive, meet, buy, watch TV, phone call, talk, help, finish, go home, make…). Only the verbs with no existing image get one new reusable illustration each, in the current Module 3 photo style. Images are static assets — never regenerated at runtime.
- No duplicates: a verb that appears in many lessons is still one card; repeated encounters only update counters.

## 2. Discovery

- A verb becomes `discovered` when the learner actually reaches it in a Module 3 lesson — specifically when the day's Today's Past Verbs preview / verb cards are shown, and when the learner reaches Rep 2 sentences containing that verb.
- Mapping is derived from the existing lesson text (verb past-forms matched against the day's model sentences and verb cards), so no lesson content is rewritten.
- After a Module 3 day is completed, one lightweight summary appears on the day-complete screen: "NEW PAST VERBS DISCOVERED ✓" with the new verbs and buttons VIEW VERB BANK / CONTINUE. No mid-sentence popups.

## 3. Module 3 screen

A secondary card under the module progress area, above the Weeks:

```text
PAST VERB BANK
12 / 30 VERBS DISCOVERED
[ OPEN VERB BANK ]
```

Weeks stay exactly where they are; the card is visually quieter than the daily practice CTA.

## 4. Verb Bank screen (new route)

- Filters: ALL · DISCOVERED · IRREGULAR · REGULAR, plus a simple search field.
- Discovered card: image, PRESENT small → PAST large, ▶ Listen, example sentence, ES · TRADUCIR chip (follows Spanish Support), 🎤 SAY IT, and USE IT ("Yesterday, I ______." + record).
- Recording is record / stop / play myself / try again only. No scoring, no transcription, no correction.
- Locked card: neutral "NEW VERB — Discover this verb during Module 3", past form hidden.
- Status text is objective only: DISCOVERED ✓ · LISTENED nx · PRACTICED nx.
- Audio loads only on Listen; images lazy-load. Uses the existing single-audio-at-a-time player.

## 5. Today's Past Verbs

For Module 3 days that have verb cards, a short audio-first strip (3–6 verbs max) shown at the start of the day, before REP 1 — LISTEN, ending with START REP 1. It reuses the verb-card visuals; it is not a new lesson step with reps.

## 6. Week-specific behavior

- Week 1: strongest discovery week (already covers woke up, got, took, ate, drank, left, went, had, did, arrived, started, finished).
- Week 2: verb cards show the contrast pair visually — `WENT` vs `DIDN'T GO`, `ATE` vs `DIDN'T EAT` (never "didn't went"). Uses the negative field the verb cards already support.
- Week 3: unchanged focus (was/were + -ing); Verb Bank only reachable from the module screen.
- Week 4: an optional STORY VERBS button in the storytelling reps opens a compact panel of already-discovered narration verbs (went, saw, said, told, took, gave, came, left). Not shown automatically in the final story recording.

## 7. Persistence

Per learner: verbId, discovered, firstDiscoveredAt, listenCount, practiceCount.
Stored locally scoped per learner, the same way preferences are today (guest and signed-in learners both work offline). Signed-in mirroring to the cloud can be added later; auth is untouched in this update.

## 8. Microphone Test

- Shown before the learner's very first real recording, when mic permission fails, and on demand from Account.
- Screen follows App Language: "PRUEBA TU MICRÓFONO 🎤 / Di: 'Hello, this is my voice.'" → START TEST (2–5 s) → ▶ PLAY MY TEST → "¿PUEDES ESCUCHARTE?" → [SÍ, CONTINUAR] / [NO, NECESITO AYUDA].
- On success, `microphoneTestCompleted` is stored and the learner continues straight into the activity. The test recording is discarded — it never counts toward reps, streak, speaking minutes, sentence counter, or the Recordings library.
- Account gets a small "PROBAR MICRÓFONO / TEST MICROPHONE" action.

## 9. Microphone failure

Human-readable states only for: permission denied, no microphone, recording failed, playback failed — each with a short 4-step fix (open site permissions → allow microphone → return → try again) and a TRY AGAIN button. No DOMException, stack traces, or error codes anywhere.

## Technical notes

- New: `src/services/verb-bank.ts` (catalog + discovery + counters + local persistence), `src/routes/verb-bank.tsx`, `src/components/fluency/PastVerbCard.tsx`, `TodaysPastVerbs.tsx`, `StoryVerbsPanel.tsx`, `MicTest.tsx`.
- Touched lightly: `module.$moduleId.tsx` (bank card), `practice.tsx` (Today's Past Verbs before Rep 1, discovery hooks, Story Verbs button, mic-test gate), `profile.tsx` (test mic action), `VoiceRecorder.tsx` / `recording-service.ts` (friendly error surface reuse), `i18n.tsx` (new strings).
- QA on a 390px viewport plus desktop: no horizontal overflow, 44px+ tap targets, discovery persists across refresh, no duplicate verbs, mic test excluded from Recordings.
