import { describe, expect, it } from "vitest";
import { isStoryAdvanceLocked } from "./storybook-advance";

describe("storybook next-button gate", () => {
  const state = (kind: "scene" | "mindset" | "quiz", answered: boolean, recorded: boolean) =>
    isStoryAdvanceLocked({
      kind,
      ...(kind === "quiz" ? { quizId: "q1" } : {}),
      quizDone: answered ? { q1: true } : {},
      saidIt: recorded ? { q1: true } : {},
    });

  it("locks a quick question until the answer and recording are complete", () => {
    expect(state("quiz", false, false)).toBe(true);
    expect(state("quiz", true, false)).toBe(true);
    expect(state("quiz", false, true)).toBe(true);
    expect(state("quiz", true, true)).toBe(false);
  });

  it("never locks reading scenes or optional affirmation cards", () => {
    expect(state("scene", false, false)).toBe(false);
    expect(state("mindset", false, false)).toBe(false);
  });
});
