# Rep 5: reach the first speaking action faster, at every level

Layout-only change to the Rep 5 screen. Curriculum, prompts, recording, required takes, turn order, Pressure Round, Final Rep, counting, storage, progress, auth, sync and IDs stay untouched.

## Current state (verified)

- Role-play days (`rep5Turns`) already open compactly: header → one goal line → takes → one collapsed help. Good; this becomes the ADVANCED / TIGERS / SHARKS baseline.
- Non-role-play days (all BASIC levels, many EAGLES days) still stack before the microphone: optional Rep 5 audio card, scenario card, prompt card, goal chips, cue chips, Power Chunks, toolbox, scene image, story strip, variant picker, help, and then the take board whose own "TODAY'S GOAL" card repeats the goal a second time.

## What changes

### 1. One support level per module

A tiny helper maps the module to a Rep 5 support tier (no data changes):

```text
basic     -> basic-zero, simple-future, simple-present, past-stories, mixed-tenses
eagles    -> eagles-week-1
sponta    -> tigers, sharks
advanced  -> advanced-1
```

### 2. BASIC (keeps scaffolding, less stacking)

```text
TU TURNO
Main question (prompt card, unchanged text)
30+ SEC · 5+ IDEAS            (one compact line)
ONE primary visual            (see rule 5)
[ RECORD AUDIO 1 ]  (take board)
¿NECESITAS AYUDA? v           (collapsed)
  cue chips · secondary visual/story strip · Power Chunks · toolbox · sentence starters/tips · model example
```

Days with the special Rep 5 audio card (`rep5Audio`) or a scenario card keep it above the prompt, since it is the task itself.

### 3. EAGLES

```text
SITUATION / QUESTION
45–60 SEC · goal line
2–3 cues MAX (Power Chunks core chunks, or the first 3 cues when no chunks)
[ RECORD / AUDIO 1 ]
¿NECESITAS AYUDA? v  -> toolbox, remaining cues, stretch chunk, tips, all visuals, model example
```

### 4. TIGERS / SHARKS / ADVANCED

```text
SITUATION / QUESTION (only when there are no turns; Turn 1 audio delivers it otherwise)
short goal line
[ LISTEN / RECORD RESPONSE ]
¿NECESITAS AYUDA? v  -> skeleton, cues, Power Chunks, toolbox, tips, visuals, model example
```

No image or chip row before the first action. Advanced keeps today's behaviour exactly.

### 5. Visual rule (one visual max before the mic, BASIC only)

- Day has a story strip (`storyPanels`): the strip is the primary visual (needed to tell the story); the scene image moves into Help.
- Day has only a scene image: it stays as the primary visual.
- Never delete either; the secondary one is always inside Help.

### 6. Goal shown once

- Rep 5 no longer renders `GoalChips`; a single compact goal line (`30+ SEC · 5+ IDEAS` / `75–90 SEC · 8+ IDEAS` / `N TURNS · … SEC TOTAL`) sits under the prompt.
- In the take board, the large "TODAY'S GOAL" card (non-role-play `GoalPanel`) is hidden until the first take exists; after that it keeps showing live time/ideas results as today. Role-play days already do this.

### 7. Help area

Single `CollapsibleHelp` ("¿Necesitas ayuda?") below the take board on every day. Each support item appears once: anything shown above the mic is not repeated inside Help (e.g. EAGLES' visible core chunks are omitted from the Help chunk list; the primary visual is not duplicated).

## Technical notes

- `src/routes/practice.tsx` (`Rep5Step`): restructure render into `prompt block → goal line → primary visual (tiered) → VariantPicker → TakeBoard → CollapsibleHelp`; build `supportContent` from whatever was not shown above. Remove `GoalChips` usage in Rep 5 only.
- New `src/lib/rep5-support.ts`: `rep5Tier(moduleId)` plus `primaryVisual(day, tier)` returning `"story" | "scene" | null`.
- `src/components/fluency/TakeBoard.tsx`: render non-role-play `GoalPanel` only when `latest` exists (compact goal line lives in `Rep5Step`).
- `PowerChunks` mini gets an optional `coreOnly` prop for the EAGLES 2–3 chip limit.
- No changes to curriculum files, `types.ts`, services, storage, or i18n keys beyond reusing `rep5.turnsGoal` and adding one compact goal string for non-role-play days.

## Verification

- Typecheck + vitest.
- Mobile browser pass (390×844): Basic Zero D1, Simple Future day with scene image + story strip, Past Stories storytelling day, EAGLES D2, TIGERS D3, SHARKS D3, Advanced D9. Check: one goal, one visual max (Basic), first mic/LISTEN position in px, help collapsed and containing the moved items, future turns still hidden, required takes/Final Rep unchanged.
