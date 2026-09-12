import { describe, expect, it } from "vitest";
import { classifyEdEnding, edPronunciationHint } from "./ed-endings";

describe("classifyEdEnding", () => {
  it("classifies /ɪd/ after t and d", () => {
    expect(classifyEdEnding("wanted")).toBe("id");
    expect(classifyEdEnding("needed")).toBe("id");
    expect(classifyEdEnding("decided")).toBe("id");
    expect(classifyEdEnding("started")).toBe("id");
  });

  it("classifies /t/ after unvoiced sounds", () => {
    for (const w of ["watched", "worked", "stopped", "laughed", "kissed", "washed", "mixed", "danced", "faxed"]) {
      expect(classifyEdEnding(w), w).toBe("t");
    }
  });

  it("classifies /d/ after voiced sounds and vowels", () => {
    for (const w of ["called", "played", "learned", "cleaned", "tried", "showed", "lived", "opened", "answered"]) {
      expect(classifyEdEnding(w), w).toBe("d");
    }
  });

  it("handles -ied verbs as /d/", () => {
    expect(classifyEdEnding("studied")).toBe("d");
    expect(classifyEdEnding("carried")).toBe("d");
  });

  it("handles gh and igh", () => {
    expect(classifyEdEnding("laughed")).toBe("t");
    expect(classifyEdEnding("coughed")).toBe("t");
    expect(classifyEdEnding("weighed")).toBe("d");
    expect(classifyEdEnding("sighed")).toBe("d");
  });

  it("handles th exceptions", () => {
    expect(classifyEdEnding("mouthed")).toBe("d");
    expect(classifyEdEnding("breathed")).toBe("d");
  });

  it("handles voiced-s exceptions", () => {
    expect(classifyEdEnding("used")).toBe("d");
    expect(classifyEdEnding("caused")).toBe("d");
    expect(classifyEdEnding("kissed")).toBe("t");
  });

  it("returns null for non-verbs ending in -ed", () => {
    for (const w of ["red", "bed", "need", "speed", "indeed", "naked", "wicked"]) {
      expect(classifyEdEnding(w), w).toBeNull();
    }
    expect(classifyEdEnding("play")).toBeNull();
    expect(classifyEdEnding("the")).toBeNull();
  });

  it("returns /ɪd/ for -ed adjectives", () => {
    expect(classifyEdEnding("aged")).toBe("id");
    expect(classifyEdEnding("blessed")).toBe("id");
  });

  it("ignores casing and punctuation", () => {
    expect(classifyEdEnding("Watched,")).toBe("t");
    expect(classifyEdEnding("wanted.")).toBe("id");
  });
});

describe("edPronunciationHint", () => {
  it("builds /t/ hints", () => {
    expect(edPronunciationHint("watched", "t")).toBe("WATCHT");
    expect(edPronunciationHint("worked", "t")).toBe("WORKT");
  });

  it("builds /d/ hints", () => {
    expect(edPronunciationHint("called", "d")).toBe("CALLD");
    expect(edPronunciationHint("studied", "d")).toBe("STUDYD");
  });

  it("builds /ɪd/ hints with a syllable break", () => {
    expect(edPronunciationHint("wanted", "id")).toBe("WAN-TED");
    expect(edPronunciationHint("needed", "id")).toBe("NEE-DED");
    expect(edPronunciationHint("hopped", "id")).toBe("HOP-PED");
  });
});
