import { describe, it, expect } from "vitest";
import { SHARKS_EP1_TELL_THE_STORY } from "./sharks-ep1-tell-the-story";

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
