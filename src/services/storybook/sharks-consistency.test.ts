import { describe, it, expect } from "vitest";
import { SHARKS_EP1_TELL_THE_STORY } from "./sharks-ep1-tell-the-story";
import { SHARKS_EP2_GUATEMALA_SEVEN_AM } from "./sharks-ep2-guatemala-seven-am";

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
