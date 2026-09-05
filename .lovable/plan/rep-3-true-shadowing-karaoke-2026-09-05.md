# Rep 3 → true Shadowing / Karaoke

## What changes for the learner

Rep 3 becomes a focused "speak WITH the audio" screen, clearly different from Rep 2:

1. **Header**: `REP 3 · SHADOWING 🎧` + short instruction (ES: "Hablá al mismo tiempo que el audio. Dale PLAY, seguí el texto y tratá de copiar el ritmo, la pronunciación y la entonación.") + a one-line visual cue `PLAY → SPEAK WITH IT → FOLLOW THE RHYTHM` (same in EN).
2. **Speed chips** 0.5x · 0.75x · 1x (kept, default 0.75x, pitch preserved — already supported by the audio engine).
3. **Playback bar**: ▶ PLAY / ⏸ PAUSE / ↻ RESTART, with the existing time + progress line.
4. **Karaoke text**: the day's model text shown as a list of readable chunks (one sentence per chunk). The active chunk is large, bold, high-contrast; the rest stay visible but muted so the learner can anticipate what comes next. Highlight advances as the audio plays; audio is continuous — no auto-pause between chunks.
5. **After one full playback**: `NICE JOB, CHAMPION 🔥` + optional `¿OTRA VEZ? / REPEAT SHADOWING` (with a light hint: Round 1 · 0.75x follow the rhythm → Round 2 · 1x keep up) and the primary `CONTINUE TO REP 4 →`, which is disabled until the first complete playback finishes.

## Removed from Rep 3 only

- Learner recording button, "listen to me" playback, and any microphone use.
- Scene image, story strip, Power Chunks block, question banner, cue-only mode and text toggle (text is the point of this rep, so it is always visible).
- Continuous motivational copy while audio plays — encouragement appears only at the end.

Images, curriculum text, model audio text, voices, IDs, and all other reps stay untouched. The audio clip itself is the same one Rep 3 already plays (full model text at the chosen speed).

## Technical details

**Files**
- `src/routes/practice.tsx` — rewrite `Rep3Shadow` (lines ~1173–1234); drop the `onRecorded` prop and the `VoiceRecorder`/`RecordingPlayback`/`SceneImage`/`StoryStrip`/`PowerChunks`/`QuestionBanner`/`TextToggle` usage inside it. Call site at line 499 becomes `<Rep3Shadow day={day} onNext={goForward} />`. `repDurations.rep3` will simply be 0 (no recording), nothing else in the completion path depends on it.
- New `src/components/fluency/ShadowKaraoke.tsx` — the karaoke player: speed chips, play/pause/restart, chunk list with active highlight, completion state and repeat. Uses `AudioService.speak` with `onProgress`, `AudioService.pause()/resume()/stop()`, `preservesPitch` already set in `audio-service.ts`.
- `src/lib/i18n.tsx` — update `rep3.instr`/`rep3.cue` and add keys: `rep3.flow` (PLAY → SPEAK WITH IT → FOLLOW THE RHYTHM), `rep3.play`, `rep3.pause`, `rep3.restart`, `rep3.done` (NICE JOB, CHAMPION 🔥), `rep3.again`, `rep3.round1`, `rep3.round2`, `rep3.continue` (CONTINUE TO REP 4 →).

**Chunking**: chunks = `day.lines` (one sentence each, already used to build the model text via `CourseService.getModelText`, so the text matches the audio exactly). No word-level karaoke.

**Synchronisation**: the TTS clip has no segment timestamps, so the active chunk is derived from the real playback position: each line gets a share of the total duration proportional to its character count (with a small fixed allowance per sentence boundary for pauses). `onProgress(current, duration)` → compute cumulative boundaries → active index. Restart sets index to 0; speed changes reset the player (existing behaviour) and re-scale automatically because boundaries are computed from the real `duration`. If the browser-voice fallback is used (no duration), fall back to the existing `estimateSeconds` timing with the same proportional split. No new audio, no changes to `/api/tts` or caching.

**Completion gating**: local `roundsCompleted` state incremented in `onEnd`; Continue enabled when `roundsCompleted >= 1`. Repeat resets position but keeps the counter, so the Continue button stays enabled across rounds. No progress, recording, or sync data is written by Rep 3.

**Mobile layout** (top to bottom, no large cards): compact navy header → speed chips → play/pause/restart row → chunk list (active chunk `text-[24px]` bold on `bg-primary/10`, others `text-muted-foreground`; the list auto-scrolls the active chunk into view) → end-state block + Continue.

## Verification

- Rep 3 shows no recorder, no `getUserMedia` call, no images/story strip.
- Audio plays continuously at 0.5/0.75/1x; pause/resume/restart work; highlight advances chunk by chunk and resets on restart.
- Continue is disabled before the first full playback and enabled after; repeat is optional.
- Reps 1, 2, 4, 5, Test Ready, recordings, completion stats and sync unchanged; typecheck + existing tests pass; browser check on a Basic day and an Advanced day at 394px width.
