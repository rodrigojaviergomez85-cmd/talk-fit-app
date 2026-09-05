import { describe, expect, it } from "vitest";
import { compareRep2 as compareGeneric, toPublicStatus, type Rep2Confidence } from "./rep2-match";
import {
  GENERIC_PROFILE,
  SIMPLE_FUTURE_PROFILE,
  getRep2CorrectionProfile,
  hasRep2CorrectionRollout,
  isRep2CorrectionEnabledFor,
} from "./rep2-correction-profiles";

/** Existing QA suite runs with the active Future profile (behaviour must be unchanged). */
const compareRep2 = (target: string, transcript: string, confidence?: Rep2Confidence) =>
  compareGeneric(target, transcript, confidence, SIMPLE_FUTURE_PROFILE);

describe("compareRep2 (Future profile)", () => {
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

describe("generic engine (no profile pedagogy)", () => {
  const qa = "I'm going to study tonight.";

  it("exact equivalent → GOOD", () => {
    expect(compareGeneric(qa, "I'm going to study tonight!", undefined, GENERIC_PROFILE).status).toBe("good");
  });

  it("contraction equivalence → GOOD", () => {
    expect(compareGeneric(qa, "I am going to study tonight").status).toBe("good");
  });

  it("clear different speech → CORRECT, not ASR_UNCERTAIN", () => {
    const res = compareGeneric(qa, "My name is Carlos and I live here", { avgLogprob: -0.2, noSpeechProb: 0.01 });
    expect(res.status).toBe("correct");
  });

  it("short clear speech → CORRECT, not ASR_UNCERTAIN", () => {
    expect(compareGeneric(qa, "Study", { avgLogprob: -0.2, noSpeechProb: 0.01 }).status).toBe("correct");
  });

  it("empty transcript → ASR_UNCERTAIN", () => {
    expect(compareGeneric(qa, "").status).toBe("asr_uncertain");
  });

  it("low confidence → ASR_UNCERTAIN", () => {
    expect(compareGeneric(qa, "I'm going to study tonight", { avgLogprob: -0.9, noSpeechProb: 0 }).status).toBe("asr_uncertain");
  });

  it("without a profile it does not know Future grammar: several differences → no focus", () => {
    const res = compareGeneric(qa, "I going to watch tonight");
    expect(res.status).toBe("correct");
    expect(res.focus).toBeUndefined();
  });

  it("still names one obvious isolated difference", () => {
    const res = compareGeneric(qa, "I'm going study tonight");
    expect(res.focus).toMatch(/^to$/i);
  });

  it("allowSpecificFocus=false → never names a word", () => {
    const res = compareGeneric(qa, "I'm going study tonight", undefined, { ...SIMPLE_FUTURE_PROFILE, allowSpecificFocus: false });
    expect(res.status).toBe("correct");
    expect(res.focus).toBeUndefined();
  });

  it("supports short phrase structures from a profile", () => {
    const res = compareGeneric("I do not like coffee.", "I not like coffee", undefined, {
      moduleId: "generic",
      allowSpecificFocus: true,
      focusRules: [{ phrase: ["do", "not"], label: "DO NOT" }],
    });
    expect(res.focus).toBe("DO NOT");
  });
});

describe("Future profile focus", () => {
  it("missing 'to' after going → 'going TO'", () => {
    expect(compareRep2("I'm going to study tonight.", "I'm going study tonight").focus).toBe("going TO");
  });
  it("missing 'am' → 'AM'", () => {
    expect(compareRep2("I'm going to study tonight.", "I going to study tonight").focus).toBe("AM");
  });
  it("several differences, no configured structure → focus undefined", () => {
    const res = compareRep2("I will study at home tonight.", "I will cook at school tomorrow");
    expect(res.status).toBe("correct");
    expect(res.focus).toBeUndefined();
  });
});

describe("rollout", () => {
  it("simple-future Day 1 and 2 enabled, Day 3 disabled", () => {
    expect(isRep2CorrectionEnabledFor("simple-future", 1)).toBe(true);
    expect(isRep2CorrectionEnabledFor("simple-future", 2)).toBe(true);
    expect(isRep2CorrectionEnabledFor("simple-future", 3)).toBe(false);
    expect(hasRep2CorrectionRollout("simple-future")).toBe(true);
  });
  it("other modules disabled even if a profile exists", () => {
    for (const m of ["basic-zero", "simple-present", "simple-past", "basic-4", "eagles", "tigers", "sharks", "advanced-1"]) {
      expect(isRep2CorrectionEnabledFor(m, 1)).toBe(false);
      expect(hasRep2CorrectionRollout(m)).toBe(false);
    }
  });
  it("unknown module falls back to the generic profile (profile ≠ rollout)", () => {
    expect(getRep2CorrectionProfile("simple-present")).toBe(GENERIC_PROFILE);
    expect(getRep2CorrectionProfile("simple-future")).toBe(SIMPLE_FUTURE_PROFILE);
  });
});
