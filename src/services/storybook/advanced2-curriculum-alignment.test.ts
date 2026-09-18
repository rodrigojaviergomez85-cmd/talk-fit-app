/**
 * Season 10 = the Advanced 2 module. The episode of day N must practice the same
 * frame the learner uses that day in the course (see advanced-2-course.ts and
 * advanced-2-weeks-2-4-course.ts). Slots still in production are skipped, so this
 * guard starts working the moment an episode ships.
 */
import { describe, expect, it } from "vitest";

import { STORYBOOK_EPISODES } from "./index";
import { STORYBOOK_SEASONS } from "./seasons";

const DAY_PATTERNS: Record<number, RegExp[]> = {
  1: [/let me check|just to make sure/i, /so you'?re saying|understood|confirm/i],
  2: [/the best option|let me see what/i, /would that work|confirm/i],
  3: [/right now/i, /the next step|what happened/i],
  4: [/charge/i, /what happened was|what i can do is/i],
  5: [/let me verify|verify/i, /here'?s exactly what happens next|next step/i],
  6: [/can i ask|what do you use/i, /based on what you told me|in that case/i],
  7: [/dollars more|that means you get/i, /up to you|would you like/i],
  8: [/the difference between|the difference is/i, /if i were you|i'?d recommend|i would recommend/i],
  9: [/i understand/i, /another option|what you'?re really paying for/i],
  10: [/to summarize|so, to summarize/i, /just to confirm|what happens next/i],
  11: [/i'?m sorry|i am sorry/i, /here'?s what i'?m going to do|here'?s what i can see/i],
  12: [/first|could you/i, /let me know when|does that work/i],
  13: [/unfortunately|we can'?t/i, /the reason is|instead/i],
  14: [/you'?re right|i understand/i, /let me fix this|right now/i],
  15: [/conflict/i, /just to confirm|i'?ll move|move the meeting/i],
  16: [/what happened was/i, /so i decided|in the end/i],
  17: [/this month i/i, /the hardest part|my goal/i],
  18: [/the first thing|first/i, /after that|does that make sense/i],
  19: [/i lost control|i take responsibility|what i should have done/i, /from now on/i],
  20: [],
};

const season10 = STORYBOOK_SEASONS.find((s) => s.moduleId === "advanced-2");

describe("Season 10 follows the official Advanced 2 route", () => {
  it("has one slot per Advanced 2 day, 1 to 20", () => {
    expect(season10).toBeDefined();
    expect(season10!.slots.map((s) => s.day)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
  });

  it("each registered episode practices its own day's frame", () => {
    for (const slot of season10!.slots) {
      if (!slot.episodeId) continue;
      const episode = STORYBOOK_EPISODES.find((e) => e.id === slot.episodeId);
      expect(episode, `missing episode ${slot.episodeId}`).toBeDefined();
      expect(episode!.moduleId).toBe("advanced-2");

      const graded = (episode!.quizzes ?? []).filter((q) => q.sayItCheck);
      expect(graded.length, `${slot.episodeId} needs graded prompts`).toBeGreaterThanOrEqual(2);

      const text = [
        ...graded.map((q) => [q.sayItCheck?.target, ...(q.sayItCheck?.altTargets ?? []), q.sayItAskEn].join(" ")),
        ...(episode!.continueWith ?? []),
        episode!.continuePrompt?.en ?? "",
      ].join(" | ");

      for (const pattern of DAY_PATTERNS[slot.day] ?? []) {
        expect(pattern.test(text), `${slot.episodeId} misses ${pattern} (day ${slot.day})`).toBe(true);
      }
    }
  });
});
