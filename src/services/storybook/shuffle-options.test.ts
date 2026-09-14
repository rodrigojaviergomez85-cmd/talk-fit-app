import { describe, expect, it } from "vitest";
import { STORYBOOK_EPISODES } from "./index";
import { shuffleQuizOptions } from "./shuffle-options";
import { STORYBOOK_SEASONS } from "./seasons";
import type { StorybookQuiz } from "./types";

const quiz = (id: string): StorybookQuiz =>
  ({
    id,
    afterScene: "s1",
    questionEn: "q",
    questionEs: "q",
    options: [
      { label: "A", emoji: "1" },
      { label: "B", emoji: "2" },
      { label: "C", emoji: "3" },
    ],
    answer: 0,
    sayIt: "x",
    sayItEs: "x",
  }) as StorybookQuiz;

describe("shuffleQuizOptions", () => {
  it("is deterministic", () => {
    const a = shuffleQuizOptions("ep", quiz("q1"));
    const b = shuffleQuizOptions("ep", quiz("q1"));
    expect(a).toEqual(b);
  });

  it("keeps the same options and points at the correct one", () => {
    const q = quiz("q2");
    const s = shuffleQuizOptions("ep", q);
    expect([...s.options].map((o) => o.label).sort()).toEqual(["A", "B", "C"]);
    expect(s.options[s.answer]).toEqual(q.options[q.answer]);
  });

  it("does not leave every season 1 answer in first position", () => {
    const season1Ids = new Set((SEASONS[0]?.episodes ?? []).map((e) => e.episodeId));
    const episodes = STORYBOOK_EPISODES.filter((e) => season1Ids.has(e.id));
    expect(episodes.length).toBeGreaterThan(0);
    const positions = episodes.flatMap((e) =>
      e.quizzes.map((qz) => shuffleQuizOptions(e.id, qz).answer),
    );
    expect(new Set(positions).size).toBeGreaterThan(1);
    const firstRatio = positions.filter((p) => p === 0).length / positions.length;
    expect(firstRatio).toBeLessThan(0.6);
  });
});
