# Complete the voice allowlist coverage

The app keeps a list of every phrase it is allowed to turn into audio. Today that list is missing the review modules and the three interview simulators, so those screens would lose their voice if the check were ever enforced. This task completes the list. Nothing changes for learners: the check stays in report-only mode.

## What gets added

1. **Review modules** — all 20 review modules and their practices are run through the same audio-inventory builder the course uses, so their model lines, chunks, Power Chunks and questions land in the list with identical rules.
2. **Interview simulators** — the spoken prompt texts of the basic, intermediate and advanced simulators move into one shared data file, and the list reads them from there. The simulators keep the exact same prompts, order, timings, videos and behaviour.
3. **Two small mismatches** — idiom phrases containing " / " are also stored as the ", " variant the player actually speaks, and single words are also stored using the simpler cleanup rule the feedback screen uses.
4. **Visibility** — the file header is updated to state what is covered and what (if anything) is not, and a failure while building the list is now logged on the server instead of passing silently.

## Technical detail

- `src/lib/tts-allowlist.server.ts`, `collectTexts()`:
  - import `listReviewModules` and `reviewPracticeToCourseDay` from `@/services/review/review-registry`; for each module, for each practice, convert to a `CourseDay` and feed it to `daySpecs` from `@/lib/course-audio-inventory`, pushing each spec text. The review module id is passed with a cast plus a one-line comment: `daySpecs` uses the id only for the source tag and prompt tone, and matching here is text-only.
  - import `BASIC_INTERVIEW_PROMPTS`, `INTERMEDIATE_INTERVIEW_PROMPTS`, `ADVANCED_INTERVIEW_PROMPTS` and push every `en`. On-screen clarification hints are not spoken and are not added.
  - `" / "` variant: apply to every occurrence, for idiom phrases and examples.
  - word expansion: keep today's `tokenizeWords` tokens and additionally add every whitespace-separated token trimmed of leading/trailing characters outside letters, digits, apostrophes and hyphens. Both go through `normalize`.
  - rewrite the SOURCES INCLUDED / NOT COVERED YET header blocks to match the new reality.
- New `src/services/interview-prompts.ts`: three readonly arrays with `id`, `en`, `es`, `seconds`, `followUp` and the level's tense/skill field. No asset imports.
- `src/routes/review.interview.tsx`, `review.interview-intermediate.tsx`, `review.interview-advanced.tsx`: keep a local `VIDEO_BY_ID` record built from the existing `.mp4.asset.json` imports and rebuild `PROMPTS` as the base array mapped to attach `video` when present. Ids, order, texts, seconds, followUp and video assignments stay byte-identical.
- `src/routes/api/tts.ts`: the existing `.catch(() => true)` around `isAllowedTtsText` keeps failing open but also emits one `console.error` line tagged `[tts-allowlist] builder failed` with the error message. No other change to that route, and the order of checks in `beforeGenerate` stays as is.

## Not touched

`app_settings.tts_allowlist_enforce` and its default, the `tts_generation_log` schema, quotas, other routes, interview UI/scoring/timings, and any component.

## Tests

- `src/lib/tts-allowlist.test.ts`: a review-practice line and a review Power Chunk are allowed; one prompt from each interview array is allowed; an idiom with " / " is allowed raw and with ", "; a word cleaned the feedback way from a punctuated course sentence is allowed.
- New `src/services/interview-prompts.test.ts`: each array non-empty, ids unique, every entry has a non-empty `en`.
- Per interview route: assert `PROMPTS` has the same ids in the same order as its base array and that every id that had a video still has one.
- Run `npx vitest run`; everything must pass, plus a TypeScript check.
