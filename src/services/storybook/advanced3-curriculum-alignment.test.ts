/**
 * Season 11 = the Advanced 3 module. The episode of day N must practice the same
 * frame the learner uses that day in the course (see advanced-3-course.ts and
 * advanced-3-weeks-2-4-course.ts). Slots still in production are skipped, so this
 * guard starts working the moment an episode ships.
 */
import { describe, expect, it } from "vitest";

import { STORYBOOK_EPISODES } from "./index";
import { STORYBOOK_SEASONS } from "./seasons";

const DAY_PATTERNS: Record<number, RegExp[]> = {
  1: [/it was a normal|what happened was/i, /in the end|then/i],
  2: [/it looks like|it seems/i, /might be|may be/i],
  3: [/what i want to do|the plan is/i, /the main reason|because/i],
  4: [/the better option|for me/i, /one reason|for example/i],
  5: [/let me think|interesting question/i, /the way i see it|looking back/i],
  6: [/personally|i think/i, /the main reason|for example/i],
  7: [/on one hand/i, /on the other hand|personally/i],
  8: [/you should|you could try/i, /that way/i],
  9: [/the advantage|the downside/i, /the better choice|for me/i],
  10: [/that'?s a fair point|fair point/i, /i still think|what i mean is/i],
  11: [/i used to/i, /what changed|now i/i],
  12: [/i was about to/i, /suddenly|so instead/i],
  13: [/basically|it'?s for/i, /first|after that|in the end/i],
  14: [/in that situation|if that happened/i, /i would|that way/i],
  15: [/it'?s a kind of|it'?s similar to/i, /does that make sense|for example/i],
  16: [/taught me|what i learned/i, /now i/i],
  17: [/a year ago|couldn'?t/i, /since then|now i can/i],
  18: [/to me it means|to me, it means|it means/i, /a clear example|the impact/i],
  19: [/i should have|i could have/i, /what i learned/i],
  20: [],
};

const season11 = STORYBOOK_SEASONS.find((s) => s.moduleId === "advanced-3");

describe("Season 11 follows the official Advanced 3 route", () => {
  it("has one slot per Advanced 3 day, 1 to 20", () => {
    expect(season11).toBeDefined();
    expect(season11!.slots.map((s) => s.day)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
  });

  it("each registered episode practices its own day's frame", () => {
    for (const slot of season11!.slots) {
      if (!slot.episodeId) continue;
      const episode = STORYBOOK_EPISODES.find((e) => e.id === slot.episodeId);
      expect(episode, `missing episode ${slot.episodeId}`).toBeDefined();
      expect(episode!.moduleId).toBe("advanced-3");

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
