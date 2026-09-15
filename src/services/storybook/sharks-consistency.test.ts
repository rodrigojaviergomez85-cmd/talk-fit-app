import { describe, it, expect } from "vitest";
import { SHARKS_EP1_TELL_THE_STORY } from "./sharks-ep1-tell-the-story";
import { SHARKS_EP2_GUATEMALA_SEVEN_AM } from "./sharks-ep2-guatemala-seven-am";
import { STORYBOOK_EPISODES } from "./index";

/**
 * Season 8 (Sharks) canon:
 * the cast is only Vale, Dani, Camila, Mr. Reed and Don Tito (plus narrator).
 * Mateo does not appear in Sharks — his lines belong to Dani.
 */
const ALLOWED_SPEAKERS = new Set([
  "narrator",
  "vale",
  "dani",
  "camila",
  "reed",
  "lucia",
  "renata",
  "tito",
  "student",
]);

describe("Sharks Episode 1 consistency", () => {
  it("only uses canonical speakers", () => {
    for (const scene of SHARKS_EP1_TELL_THE_STORY.scenes) {
      if (scene.speaker) expect(ALLOWED_SPEAKERS).toContain(scene.speaker);
      for (const line of scene.lines ?? []) {
        expect(ALLOWED_SPEAKERS).toContain(line.speaker);
      }
    }
  });

  it("never features Mateo", () => {
    const serialized = JSON.stringify(SHARKS_EP1_TELL_THE_STORY).toLowerCase();
    expect(serialized).not.toContain("mateo");
  });

  it("gives Dani the platform line in the numbers scene", () => {
    const scene = SHARKS_EP1_TELL_THE_STORY.scenes.find((s) => s.id === "s5");
    const line = scene?.lines?.find((l) => l.text.includes("platform version"));
    expect(line?.speaker).toBe("dani");
  });
});

describe("Sharks Episodes 3–10 B2 safeguards", () => {
  const episodes = STORYBOOK_EPISODES.filter((episode) => episode.moduleId === "sharks").slice(2, 10);

  it("publishes all eight curriculum episodes with 11 scenes and 3 speaking checks", () => {
    expect(episodes).toHaveLength(8);
    for (const episode of episodes) {
      expect(episode.scenes).toHaveLength(11);
      expect(episode.quizzes).toHaveLength(3);
      expect(episode.quizzes.every((quiz) => Boolean(quiz.sayItAskEn && quiz.sayItCheck))).toBe(true);
    }
  });

  it("teaches exactly two phrasal verbs and one complete idiom per episode", () => {
    for (const episode of episodes) {
      expect(episode.expressions).toHaveLength(3);
      expect(episode.expressions?.filter((entry) => entry.kind === "phrasal")).toHaveLength(2);
      expect(episode.expressions?.filter((entry) => entry.kind === "idiom")).toHaveLength(1);
      const dialogue = episode.scenes.map((scene) => scene.text.toLowerCase()).join(" ");
      for (const expression of episode.expressions ?? []) {
        expect(
          dialogue.includes(expression.phrase.toLowerCase()) ||
            (expression.variants ?? []).some((variant) => dialogue.includes(variant.toLowerCase())),
          `${episode.id}: ${expression.phrase} must be spoken`,
        ).toBe(true);
      }
    }
  });

  it("keeps Mateo out and uses 45-second checkpoints only on Days 5 and 10", () => {
    for (const episode of episodes) expect(JSON.stringify(episode).toLowerCase()).not.toContain("mateo");
    expect(episodes.map((episode) => episode.finaleSeconds)).toEqual([30, 30, 45, 30, 30, 30, 30, 45]);
  });
});

describe("Sharks B2 expressions", () => {
  it("declares complete expressions and every scripted variant", () => {
    const expressions = SHARKS_EP2_GUATEMALA_SEVEN_AM.expressions ?? [];
    expect(expressions.map((entry) => entry.phrase)).toEqual([
      "show up",
      "back out",
      "the bottom line",
    ]);
    expect(expressions.find((entry) => entry.phrase === "show up")?.variants).toContain("showed up");

    const dialogue = SHARKS_EP2_GUATEMALA_SEVEN_AM.scenes
      .flatMap((scene) => scene.lines ?? [])
      .map((line) => line.text.toLowerCase())
      .join(" ");
    expect(dialogue).toContain("back out");
    expect(dialogue).toContain("show up");
    expect(dialogue).toContain("showed up");
    expect(dialogue).toContain("the bottom line");
  });
});
