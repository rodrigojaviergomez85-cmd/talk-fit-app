import { describe, expect, it } from "vitest";
import { compareRep2, toPublicStatus } from "./rep2-match";

describe("compareRep2", () => {
  const target = "Tonight, I'm going to go home early.";
  const qa = "I'm going to study tonight.";

  it("returns GOOD for an exact match", () => {
    const res = compareRep2(target, "Tonight I'm going to go home early");
    expect(res.status).toBe("good");
    expect(res.retryRecommended).toBe(false);
  });

  it("returns GOOD for an expanded contraction", () => {
    const res = compareRep2(target, "Tonight I am going to go home early");
    expect(res.status).toBe("good");
  });

  it("CASE 1: QA target said correctly → GOOD", () => {
    expect(compareRep2(qa, "I'm going to study tonight").status).toBe("good");
  });

  it("CASE 2: missing 'to' → CORRECT focus 'to'", () => {
    const res = compareRep2(qa, "I'm going study tonight");
    expect(res.status).toBe("correct");
    expect(res.focus).toMatch(/to/i);
  });

  it("CASE 3: missing 'am' → CORRECT focus 'am'", () => {
    const res = compareRep2(qa, "I going to study tonight");
    expect(res.status).toBe("correct");
    expect(res.focus).toMatch(/am/i);
  });

  it("CASE 4: clear but different content → CORRECT, never asr_uncertain", () => {
    const res = compareRep2(qa, "I'm going to watch TV tomorrow", { avgLogprob: -0.2, noSpeechProb: 0.01 });
    expect(res.status).toBe("correct");
  });

  it("CASE 5: completely different but clear sentence → CORRECT with one focus or none", () => {
    const res = compareRep2(target, "My name is Carlos and I live here");
    expect(res.status).toBe("correct");
    // Structure word dropped → single useful focus, no error list.
    expect(res.focus).toMatch(/am/i);
  });

  it("no structure word and multiple differences → CORRECT without a misleading focus", () => {
    const res = compareRep2("I will study at home tonight.", "I will cook at school tomorrow");
    expect(res.status).toBe("correct");
    expect(res.focus).toBeUndefined();
  });

  it("CASE 6/7: empty transcript → asr_uncertain (public: uncertain)", () => {
    const res = compareRep2(target, "");
    expect(res.status).toBe("asr_uncertain");
    expect(toPublicStatus(res.status)).toBe("uncertain");
  });

  it("low confidence → asr_uncertain even if text matches", () => {
    const res = compareRep2(target, "Tonight I'm going to go home early", { avgLogprob: -0.9, noSpeechProb: 0 });
    expect(res.status).toBe("asr_uncertain");
  });

  it("high no-speech probability → asr_uncertain", () => {
    const res = compareRep2(target, "Tonight", { avgLogprob: -0.1, noSpeechProb: 0.8 });
    expect(res.status).toBe("asr_uncertain");
  });

  it("CASE A: clear but very short answer → CORRECT, never asr_uncertain", () => {
    const res = compareRep2("I'm going to study English tonight.", "Study tonight", { avgLogprob: -0.2, noSpeechProb: 0.01 });
    expect(res.status).toBe("correct");
    expect(res.focus).toMatch(/am/i);
  });

  it("CASE B: 'I go home' against a long two-sentence target → CORRECT", () => {
    const res = compareRep2(
      "Tonight I'm going to go home early. I'm going to eat dinner with my family.",
      "I go home",
      { avgLogprob: -0.3, noSpeechProb: 0.02 },
    );
    expect(res.status).toBe("correct");
  });

  it("CASE C: silent / punctuation-only transcript → asr_uncertain", () => {
    expect(compareRep2(target, ".").status).toBe("asr_uncertain");
  });

  it("accepts a number word instead of digits", () => {
    const res = compareRep2("I will wake up at eleven tomorrow.", "I will wake up at 11 tomorrow");
    expect(res.status).toBe("good");
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

  it("prefers a structure word over content words when several differ", () => {
    const res = compareRep2(qa, "I going to watch tonight");
    expect(res.status).toBe("correct");
    expect(res.focus).toMatch(/am/i);
  });
});

describe("writing-only differences", () => {
  it("treats co-worker as coworker (screenshot case)", () => {
    const res = compareRep2(
      "In the morning, I'm going to work. I'm going to have lunch with a coworker.",
      "In the morning I'm going to work. I'm going to have lunch with a co-worker.",
    );
    expect(res.status).toBe("good");
  });

  it("treats e-mail as email", () => {
    expect(compareRep2("Email me tomorrow.", "E-mail me tomorrow.").status).toBe("good");
  });

  it("treats on-line as online", () => {
    expect(compareRep2("I study online.", "I study on-line.").status).toBe("good");
  });

  it("treats I am as I'm", () => {
    expect(compareRep2("I'm going to work.", "I am going to work.").status).toBe("good");
  });

  it("still detects a real missing grammar word", () => {
    expect(compareRep2("I'm going to work.", "I'm going work.").status).toBe("correct");
  });

  it("does not merge unrelated words", () => {
    expect(compareRep2("I'm going to go home.", "I'm going to gohome.").status).toBe("correct");
    expect(compareRep2("I'm going to work.", "I'm going to walk.").status).toBe("correct");
    expect(compareRep2("I talked to a coworker.", "I talked to a worker.").status).toBe("correct");
  });
});
