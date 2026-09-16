# Advanced 1, Episodes 11–15: production

Turn the five approved scripts (document `guion-advanced-1-episodios-11-15-v2.md`, with the corrections already applied) into five playable episodes of El Mundo de Vale, week 3 of Advanced 1, days 11 to 15.

## What the student will get

Five new episodes, one per day:

- Day 11 — why you leave a job
- Day 12 — failure, responsibility and evidence
- Day 13 — why Northline, and Elena/Crown
- Day 14 — negotiating salary and conditions
- Day 15 — the difficult panel, closing week 3

Each episode has 11 scenes with illustrations, dialogue in English with Spanish underneath, tappable words with meaning and pronunciation, two comprehension questions with shuffled options, a "say it" speaking turn, mindset and habit cards, a 30-second final recording, and the cliffhanger into the next episode.

## Language quality (same rules as episodes 6–10)

- B2 level: conditionals, passive and reporting structures, clefts, nuanced connectors, two long turns per episode.
- Vale, Dani and Camila stay experienced professionals; only the learner may sound unsure.
- Exactly two phrasal verbs and two idioms/collocations per episode, registered as whole expressions so tapping "back out" shows the expression meaning, not the single words.
- Contextual glossary: every tapped word gets the meaning it has in that line.

## Artwork

12 images per episode (cover + 11 scenes) in the same warm, semi-photorealistic Advanced 1 style used in episodes 1–10, 768×768 progressive JPG under 250 KB each, no readable text or logos, consistent faces and clothing for Vale, Dani, Camila, Reed and Elena.

## Technical work

- New files `src/services/storybook/advanced-1-ep11…ep15-*.ts` following the shape of `advanced-1-ep10-the-behavioural-round.ts` (scenes, lines, words, quizzes with `sayItCheck`, expressions, `finaleSeconds: 30`, cliffhanger).
- Assets under `src/assets/storybook/advanced1-ep11…ep15-*/`.
- Register each episode in `src/services/storybook/index.ts`, map days 11–15 in `src/services/storybook/seasons.ts`, add vocabulary entries in `vocabulary-targets.ts`, and add the league story slots for days 11–15 in `src/lib/league-manifest.ts` (plus the matching `league_story_slots` rows) so the weekly league credits these episodes.

## QA before delivery

- Expression audit: two phrasal verbs + two idioms per episode, all with variants.
- Glossary audit: every `words` entry actually appears in its scene text.
- Quiz audit: correct answer not always first, question answerable from the scene.
- Image audit: all 12 files per episode exist, are under 250 KB, and match the cast canon.
- Run the storybook test suite, the TypeScript check, and open days 11–15 in the app to confirm they load, unlock in order, and record audio.
