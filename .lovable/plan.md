# English-first learning titles on Home

Make the current-practice titles on Home appear in English first, with a smaller Spanish translation directly below, regardless of the app's interface language. This keeps the topic and subtitle visible in English to motivate learners, while the Spanish translation stays available for clarity.

## Scope
- Only `CurrentModuleCard.tsx` on the Home route.
- Only the learning-content lines:
  - Day topic under "TU RETO DE HOY" / "TODAY'S CHALLENGE".
  - Module subtitle below the topic.
- App chrome (label, day counter, buttons, streak, calendar) keeps following the selected interface language.

## What changes

```text
Home
└── CurrentModuleCard
    ├── "TU RETO DE HOY" label      → unchanged, app-language
    ├── Day topic (English, large)
    │   └── day.topicEs (Spanish, small/muted)
    ├── Module subtitle (English, medium)
    │   └── module.subtitleEs (Spanish, small/muted)
    └── Day counter, CTA, etc.       → unchanged
```

1. In `CurrentModuleCard.tsx`, replace the language-conditional topic/subtitle rendering with an English-first bilingual stack.
   - Main text: `day.topic` and `module.subtitle` (always the English source).
   - Secondary text: `day.topicEs` and `module.subtitleEs` in smaller, muted text underneath.
2. Preserve current typography hierarchy: topic stays the largest headline, subtitle stays the supporting sentence, Spanish lines are clearly secondary.
3. Keep the existing `es` flag only for app chrome that should still toggle (labels, day "de/of", CTA copy).

## Verification
- TypeScript check.
- Vitest run.
- Fresh browser check of Home in Spanish mode, confirming the TIGERS (or whichever module is current) topic and subtitle show English first with Spanish below.

## Not in scope
- No changes to module names (e.g., "TIGERS"), course files, day data, i18n keys, or other Home cards (Habit, Coach, beta banner, locked next module).
- No new data fields; relies on existing `topic`/`topicEs` and `subtitle`/`subtitleEs` in course data.
