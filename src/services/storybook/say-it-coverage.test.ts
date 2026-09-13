import { describe, expect, it } from "vitest";
import { STORYBOOK_EPISODES } from "./index";

/**
 * Motivational affirmations are practiced out loud but never graded by AI —
 * they cost nothing and always succeed. Everything else (story language) must
 * carry a `sayItCheck` target.
 */
const UNGRADED_AFFIRMATIONS = new Set([
  "My answers are long and clear.",
  "My answers are long and fluent.",
  "I am awesome.",
  "We are amazing.",
  "English is easy for me.",
  "Mistakes are part of the process. I'll continue.",
  "We won the challenge. We are champions.",
  "A problem is not the end. I love challenges.",
  "You are amazing.",
  "Everything is possible with effort.",
  "I am nervous, but I can try.",
  "I am calm. I can do it.",
  // Fully open prompt with no fixed frame to grade against.
  "I am… and…",
]);

describe("storybook say-it validation coverage", () => {
  it("every story prompt has a check target, affirmations have none", () => {
    const missing: string[] = [];
    const unexpected: string[] = [];
    for (const episode of STORYBOOK_EPISODES) {
      for (const quiz of episode.quizzes ?? []) {
        if (!quiz.sayIt) continue;
        const affirmation = UNGRADED_AFFIRMATIONS.has(quiz.sayIt);
        if (!affirmation && !quiz.sayItCheck) missing.push(`${episode.id}:${quiz.id} — ${quiz.sayIt}`);
        if (affirmation && quiz.sayItCheck) unexpected.push(`${episode.id}:${quiz.id}`);
      }
    }
    expect(missing).toEqual([]);
    expect(unexpected).toEqual([]);
  });

  it("wildcard targets keep at least one fixed word", () => {
    for (const episode of STORYBOOK_EPISODES) {
      for (const quiz of episode.quizzes ?? []) {
        const target = quiz.sayItCheck?.target;
        if (!target || !target.includes("*")) continue;
        expect(target.replace(/\*/g, "").trim().length).toBeGreaterThan(0);
      }
    }
  });
});
