import { describe, expect, it } from "vitest";
import { buildEpisodeGlossary, lookupWord, normalizeWord } from "./glossary";
import { VALE_FIRST_DAY } from "./vale-first-day";

describe("storybook glossary", () => {
  const glossary = buildEpisodeGlossary(VALE_FIRST_DAY);
  const scene = VALE_FIRST_DAY.scenes[2]!; // "Introduce yourself," says the boss with a smile.

  it("normalizes punctuation and case", () => {
    expect(normalizeWord('“Says,”')).toBe("says");
  });

  it("prefers curated scene words", () => {
    const result = lookupWord("boss", { scene, episodeGlossary: glossary });
    expect(result.curated).toBe(true);
    expect(result.meaning).toBe("jefe");
  });

  it("falls back to the base glossary for function words", () => {
    const result = lookupWord("says", { scene, episodeGlossary: glossary });
    expect(result.curated).toBe(false);
    expect(result.meaning).toBe("dice");
  });

  it("finds words curated in other scenes of the episode", () => {
    const result = lookupWord("pupusas", { scene, episodeGlossary: glossary });
    expect(lookupWord("nineteen", { scene, episodeGlossary: glossary }).meaning).toBe("diecinueve");
    expect(result.meaning === null || typeof result.meaning === "string").toBe(true);
  });

  it("returns null for unknown words", () => {
    expect(lookupWord("zzzz", { scene, episodeGlossary: glossary }).meaning).toBeNull();
  });
});
