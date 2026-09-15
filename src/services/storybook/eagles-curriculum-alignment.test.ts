import { describe, expect, it } from "vitest";
import { STORYBOOK_SEASONS } from "./seasons";
import { STORYBOOK_EPISODES } from "./index";

/**
 * Season 6 = the Eagles module. Episode of day N must practice the same
 * grammar as Eagles day N (see eagles-week-1-course.ts / eagles-weeks-2-4-course.ts).
 * Each graded prompt (sayItCheck) has to use that day's structure.
 */
const DAY_PATTERNS: Record<number, RegExp[]> = {
  // Day 1 — simple past: tell what happened (yesterday · because · after that)
  1: [/yesterday/i, /it was .* because/i, /after that/i],
  // Day 2 — could / might / another option
  2: [/could/i, /might/i, /option/i],
  // Day 3 — advice: should / shouldn't / must
  3: [/should/i, /shouldn't|must/i],
  // Day 4 — need to / don't have to
  4: [/need to/i, /don't have to/i],
  // Day 5 — second conditional
  5: [/if i .*, i would|i would/i],
  // Day 6 — past progressive + present progressive (before vs. now)
  6: [/was \*|was \w+ing/i, /right now i am|right now i'm|i am \w+ing|i'm \w+ing/i],
  // Day 7 — present perfect: experiences (have you ever / I have ...)
  7: [/i have |i've /i],
  // Day 8 — present perfect progressive: how long (I have been ...)
  8: [/i have been|i've been/i],
  // Day 9 — customer service: past + present perfect + perfect progressive
  9: [/it was .* because|it was \*/i, /i have /i, /i have been/i],
  // Day 10 — transfer: a new problem with the same three forms
  10: [/it happened|it was \*/i, /i have been/i, /i have /i],
  // Day 11 — used to: past habits vs current habits
  11: [/used to/i, /now i/i],
  // Day 12 — short comparatives
  12: [/better than/i, /cheaper than|faster than/i],
  // Day 13 — long comparatives
  13: [/more convenient/i, /more comfortable|more flexible/i],
  // Day 14 — superlatives with several criteria
  14: [/the best/i, /the most/i],
  // Day 15 — simple present: qualities + justification
  15: [/a great (teacher|employee)/i, /because/i],
  // Day 16 — simple future: going to / will
  16: [/going to/i, /i will|i'll/i],
  // Day 17 — present perfect: already / yet / so far
  17: [/already/i, /yet|so far/i],
  // Day 18 — present perfect progressive: long effort + next step
  18: [/i have been/i, /for |since /i],
  // Day 19 — customer service #2: acknowledge, own, solve, confirm
  19: [/i understand|i'm sorry/i, /i will/i],
  // Day 20 — consultative sales: recommend + reason + close
  20: [/i recommend/i, /because|if we start/i],
};

const season6 = STORYBOOK_SEASONS.find((s) => s.moduleId === "eagles-week-1");

describe("Season 6 follows the official Eagles route", () => {
  it("has one slot per Eagles day, 1 to 20", () => {
    expect(season6).toBeDefined();
    expect(season6!.slots.map((s) => s.day)).toEqual(
      Array.from({ length: 20 }, (_, i) => i + 1),
    );
  });

  it("each registered episode practices its own day's grammar", () => {
    for (const slot of season6!.slots) {
      if (!slot.episodeId) continue;
      const episode = STORYBOOK_EPISODES.find((e) => e.id === slot.episodeId);
      expect(episode, `missing episode ${slot.episodeId}`).toBeDefined();
      expect(episode!.moduleId).toBe("eagles-week-1");

      const patterns = DAY_PATTERNS[slot.day];
      if (!patterns) continue;

      const graded = (episode!.quizzes ?? []).filter((q) => q.sayItCheck);
      expect(graded.length, `${slot.episodeId} needs graded prompts`).toBeGreaterThanOrEqual(3);

      const text = graded
        .map((q) => [q.sayItCheck?.target, ...(q.sayItCheck?.altTargets ?? []), q.sayItAskEn].join(" "))
        .join(" | ");

      for (const pattern of patterns) {
        expect(pattern.test(text), `${slot.episodeId} misses ${pattern} (day ${slot.day})`).toBe(true);
      }
    }
  });

  it("Morgan is always she/her — never he/his", () => {
    const ep1 = STORYBOOK_EPISODES.find((e) => e.id === "eagles-ep1-the-offer");
    expect(ep1).toBeDefined();
    const allText = [
      ...(ep1!.scenes ?? []).flatMap((s) => [
        s.text,
        ...(s.lines ?? []).map((l) => l.text),
      ]),
      ...(ep1!.quizzes ?? []).flatMap((q) => [
        q.questionEn,
        q.sayIt,
        q.sayItAskEn,
        ...(q.options ?? []).map((o) => o.label),
      ]),
    ].join(" ");
    expect(allText).not.toMatch(/\b(he|his|him)\b/i);
  });
});
