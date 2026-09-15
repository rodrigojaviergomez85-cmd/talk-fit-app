import { describe, expect, it } from "vitest";
import { buildEpisodeGlossary, lookupWord, normalizeWord } from "./glossary";
import { VALE_FIRST_DAY } from "./vale-first-day";
import { STORYBOOK_EPISODES } from "./index";
import { SHARKS_EP2_GUATEMALA_SEVEN_AM } from "./sharks-ep2-guatemala-seven-am";


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

  it("explains contractions, names, irregular pasts and derived forms", () => {
    expect(lookupWord("didn't").meaning).toBeTruthy();
    expect(lookupWord("I'm").meaning).toBeTruthy();
    expect(lookupWord("Vale").meaning).toContain("Vale");
    expect(lookupWord("said").meaning).toContain("dijo");
    expect(lookupWord("sounded").meaning).toBeTruthy();
    expect(lookupWord("terrified").meaning).toBeTruthy();
    expect(lookupWord("8:57").meaning).toBeTruthy();
    expect(lookupWord("B").meaning).toBeTruthy();
  });

  it("uses one contextual meaning for complete expressions and their variants", () => {
    const sharksGlossary = buildEpisodeGlossary(SHARKS_EP2_GUATEMALA_SEVEN_AM);

    expect(lookupWord("back out", { episodeGlossary: sharksGlossary })).toEqual({
      meaning: "echarse para atrás / retractarse",
      curated: true,
    });
    expect(lookupWord("showed up", { episodeGlossary: sharksGlossary })).toEqual({
      meaning: "presentarse / aparecer",
      curated: true,
    });
    expect(lookupWord("the bottom line", { episodeGlossary: sharksGlossary })).toEqual({
      meaning: "lo esencial / la conclusión final",
      curated: true,
    });
  });
});

describe("every word of every episode has a Spanish meaning", () => {
  it("covers all seasons", () => {
    const missing = new Map<string, string>();
    for (const episode of STORYBOOK_EPISODES) {
      const episodeGlossary = buildEpisodeGlossary(episode);
      for (const s of episode.scenes) {
        const texts = [s.text, ...(s.lines ?? []).map((l) => l.text)].filter(Boolean) as string[];
        for (const text of texts) {
          for (const raw of text.split(/\s+/)) {
            const key = normalizeWord(raw);
            if (!key) continue;
            if (!lookupWord(raw, { scene: s, episodeGlossary }).meaning) {
              missing.set(key, `${episode.id}/${s.id}`);
            }
          }
        }
      }
    }
    expect(
      [...missing.entries()].map(([w, where]) => `${w} (${where})`),
      "estas palabras necesitan traducción en glossary.ts",
    ).toEqual([]);
  });
});

