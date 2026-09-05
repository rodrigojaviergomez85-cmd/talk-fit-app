import { describe, expect, it } from "vitest";
import { compareRep2 } from "./rep2-match";

describe("compareRep2", () => {
  const target = "Tonight, I'm going to go home early.";

  it("returns GOOD for an exact match", () => {
    const res = compareRep2(target, "Tonight I'm going to go home early");
    expect(res.status).toBe("good");
    expect(res.retryRecommended).toBe(false);
  });

  it("returns GOOD for a contraction", () => {
    const res = compareRep2(target, "Tonight I'm going to go home early");
    expect(res.status).toBe("good");
  });

  it("CORRECTS missing 'am' in I'm going to", () => {
    const res = compareRep2(target, "Tonight I going to go home early");
    expect(res.status).toBe("correct");
    expect(res.focus).toMatch(/am/i);
  });

  it("CORRECTS missing 'to'", () => {
    const res = compareRep2(target, "Tonight I'm going study early");
    expect(res.status).toBe("correct");
    expect(res.focus).toMatch(/to/i);
  });

  it("accepts a number word instead of digits", () => {
    const res = compareRep2("I will wake up at eleven tomorrow.", "I will wake up at 11 tomorrow");
    expect(res.status).toBe("good");
  });

  it("is UNCERTAIN for an unrelated sentence", () => {
    const res = compareRep2(target, "My name is Carlos and I live here");
    expect(res.status).toBe("uncertain");
    expect(res.retryRecommended).toBe(true);
  });

  it("is UNCERTAIN for empty transcript", () => {
    const res = compareRep2(target, "");
    expect(res.status).toBe("uncertain");
  });

  it("is UNCERTAIN when confidence is too low", () => {
    const res = compareRep2(target, "Tonight I'm going to go home early", { avgLogprob: -0.9, noSpeechProb: 0 });
    expect(res.status).toBe("uncertain");
  });

  it("handles a Future two-sentence chunk", () => {
    const twoSentence = "Tonight, I'm going to go home early. I'm going to eat dinner with my family.";
    const res = compareRep2(twoSentence, "Tonight I'm going to go home early I am going to eat dinner with my family");
    expect(res.status).toBe("good");
  });

  it("CORRECTS a content-word swap", () => {
    const res = compareRep2(target, "Tonight I'm going to go home late");
    expect(res.status).toBe("correct");
    expect(res.focus).toMatch(/early/i);
  });

  it("is UNCERTAIN when there are too many scattered errors", () => {
    const res = compareRep2(target, "Tomorrow she will stay outside late");
    expect(res.status).toBe("uncertain");
  });
});
