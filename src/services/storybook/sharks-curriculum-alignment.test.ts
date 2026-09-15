import { describe, expect, it } from "vitest";
import { STORYBOOK_EPISODES } from "./index";
import { STORYBOOK_SEASONS } from "./seasons";

const EXPECTED = [
  [3, "sharks-ep3-first-dollar-contract", ["should", "push back"]],
  [4, "sharks-ep4-three-offices-one-team", ["need to", "first things first"]],
  [5, "sharks-ep5-counter-offer", ["if we", "meet halfway"]],
  [6, "sharks-ep6-hiring-across-borders", ["used to", "settle in"]],
  [7, "sharks-ep7-quality-at-scale", ["have", "follow through"]],
  [8, "sharks-ep8-vale-kids", ["have been", "catch up"]],
  [9, "sharks-ep9-mexico-call", ["in other words", "clear up"]],
  [10, "sharks-ep10-partner-or-rival", ["what i mean", "on the same page"]],
] as const;

describe("Sharks Days 3–10 curriculum alignment", () => {
  it.each(EXPECTED)("maps Day %s to its official episode and language", (day, id, language) => {
    const season = STORYBOOK_SEASONS.find((entry) => entry.moduleId === "sharks");
    expect(season?.slots.find((slot) => slot.day === day)?.episodeId).toBe(id);
    const episode = STORYBOOK_EPISODES.find((entry) => entry.id === id);
    const dialogue = episode?.scenes.map((scene) => scene.text.toLowerCase()).join(" ") ?? "";
    for (const target of language) expect(dialogue).toContain(target);
  });
});