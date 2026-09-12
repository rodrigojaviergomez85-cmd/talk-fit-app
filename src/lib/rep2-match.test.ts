import { describe, expect, it } from "vitest";
import { compareRep2 as compareGeneric, normalizeForCompare, toPublicStatus, type Rep2Confidence } from "./rep2-match";
import {
  GENERIC_PROFILE,
  SIMPLE_FUTURE_PROFILE,
  BASIC_ZERO_PROFILE,
  SIMPLE_PRESENT_PROFILE,
  PAST_STORIES_PROFILE,
  MIXED_TENSES_PROFILE,
  EAGLES_PROFILE,
  TIGERS_PROFILE,
  SHARKS_PROFILE,
  ADVANCED_1_PROFILE,
  getRep2CorrectionProfile,
  hasRep2CorrectionRollout,
  type Rep2CorrectionProfile,
} from "./rep2-correction-profiles";
import { isRep2CorrectionEnabled, rep2Chunks, rep2ChunkText } from "./rep-structure";
import { CourseService } from "@/services/course-service";
import type { ModuleId } from "@/lib/types";

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

  it("accepts compound ages as digits or words (Basic Zero: 22, 41)", () => {
    expect(compareRep2("I am 41 years old.", "I am forty-one years old").status).toBe("good");
    expect(compareRep2("I am twenty-two years old.", "I am 22 years old").status).toBe("good");
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

const withProfile = (profile: Rep2CorrectionProfile) => (target: string, transcript: string) =>
  compareGeneric(target, transcript, { avgLogprob: -0.2, noSpeechProb: 0.01 }, profile);

describe("BASIC ZERO profile", () => {
  const c = withProfile(BASIC_ZERO_PROFILE);
  it("correct target → GOOD", () => {
    expect(c("My name is Carlos. I am 22 years old.", "My name is Carlos, I am twenty-two years old.").status).toBe("good");
  });
  it("missing 'am' → CORRECT focus AM", () => {
    const r = c("I am from El Salvador.", "I from El Salvador");
    expect(r.status).toBe("correct");
    expect(r.focus).toBe("AM");
  });
  it("is → are slip → CORRECT focus IS", () => {
    expect(c("My favorite color is blue.", "My favorite color are blue").focus).toBe("IS");
  });
  it("many differences → CORRECT, no focus", () => {
    const r = c("My hobbies are playing soccer and watching movies.", "I like pizza and tacos a lot");
    expect(r.status).toBe("correct");
    expect(r.focus).toBeUndefined();
  });
});

describe("FUTURE profile", () => {
  const c = withProfile(SIMPLE_FUTURE_PROFILE);
  it("missing am", () => {
    const r = c("I am going to work tomorrow.", "I going to work tomorrow");
    expect(r.status).toBe("correct");
    expect(r.focus).toBe("AM");
  });
  it("missing to in going-to", () => {
    expect(c("I'm going to study tonight.", "I'm going study tonight").focus).toBe("going TO");
  });
  it("missing will", () => {
    const r = c("I will call her tomorrow.", "I call her tomorrow");
    expect(r.status).toBe("correct");
    expect(r.focus).toBe("WILL");
  });
});

describe("PRESENT profile", () => {
  const c = withProfile(SIMPLE_PRESENT_PROFILE);
  it("work / works → CORRECT focus WORKS", () => {
    const r = c("She works from home.", "She work from home");
    expect(r.status).toBe("correct");
    expect(r.focus).toBe("WORKS");
  });
  it("study / studies → focus STUDIES", () => {
    expect(c("He studies English every day.", "He study English every day").focus).toBe("STUDIES");
  });
  it("third-person -s still found next to a small content slip", () => {
    expect(c("She works from home twice a week.", "She work from home two a week").focus).toBe("WORKS");
  });
  it("missing does → focus DOES", () => {
    const r = c("Does she work here?", "She work here?");
    expect(r.status).toBe("correct");
    expect(r.focus).toBe("DOES");
  });
  it("don't vs doesn't → prioritises does not", () => {
    expect(c("He doesn't work on Sunday.", "He don't work on Sunday").focus).toBe("DOES NOT");
  });
  it("don't ≡ do not → GOOD", () => {
    expect(c("We don't have the same schedule every day.", "We do not have the same schedule every day.").status).toBe("good");
  });
  it("many differences → no focus", () => {
    expect(c("I usually wake up around six thirty.", "I like coffee in the office").focus).toBeUndefined();
  });
});

describe("PAST profile", () => {
  const c = withProfile(PAST_STORIES_PROFILE);
  it("missing did → DID", () => {
    const r = c("Did you work yesterday?", "You work yesterday?");
    expect(r.status).toBe("correct");
    expect(r.focus).toBe("DID");
  });
  it("was / am → WAS", () => {
    expect(c("I was tired yesterday.", "I am tired yesterday").focus).toBe("WAS");
  });
  it("were / was → WERE", () => {
    expect(c("They were at home.", "They was at home").focus).toBe("WERE");
  });
  it("didn't ≡ did not → GOOD", () => {
    expect(c("I didn't go to work.", "I did not go to work").status).toBe("good");
  });
  it("go / went single mismatch → WENT", () => {
    const r = c("I went home early.", "I go home early");
    expect(r.status).toBe("correct");
    expect(r.focus).toBe("WENT");
  });
  it("many differences → no focus", () => {
    expect(c("I ate breakfast at home. I drank some coffee before work.", "I eat breakfast and drink tea").focus).toBeUndefined();
  });
});

describe("MIXED profile (conservative)", () => {
  const c = withProfile(MIXED_TENSES_PROFILE);
  it("exact → GOOD", () => {
    expect(c("Yesterday, I cleaned my whole apartment.", "yesterday I cleaned my whole apartment").status).toBe("good");
  });
  it("one obvious difference → CORRECT with one focus", () => {
    const r = c("Yesterday, I cleaned my whole apartment.", "Yesterday I clean my whole apartment");
    expect(r.status).toBe("correct");
    expect(r.focus).toBe("CLEANED");
  });
  it("several differences (even grammar words) → no focus", () => {
    const r = c("Tomorrow, I'm going to clean the kitchen.", "Tomorrow I going clean kitchen");
    expect(r.status).toBe("correct");
    expect(r.focus).toBeUndefined();
  });
});

describe("cross-module regression", () => {
  const profiles = [BASIC_ZERO_PROFILE, SIMPLE_FUTURE_PROFILE, SIMPLE_PRESENT_PROFILE, PAST_STORIES_PROFILE, MIXED_TENSES_PROFILE];
  it.each(profiles.map((p) => [p.moduleId, p] as const))("%s: writing-only differences → GOOD, clear speech never uncertain", (_id, p) => {
    const c = withProfile(p);
    expect(c("In the morning, I'm going to work.", "in the morning I am going to work").status).toBe("good");
    expect(c("I talk to a coworker.", "I talk to a co-worker").status).toBe("good");
    expect(c("I'm going to study tonight.", "Study").status).toBe("correct");
    expect(c("I'm going to study tonight.", "My cat likes fish").status).toBe("correct");
    expect(compareGeneric("I'm going to study tonight.", "", undefined, p).status).toBe("asr_uncertain");
    expect(compareGeneric("I'm going to study tonight.", "I'm going to study tonight", { avgLogprob: -0.95, noSpeechProb: 0 }, p).status).toBe("asr_uncertain");
  });
});

/* ------------------------- higher-level tolerance ------------------------- */

const hl = (profile: Rep2CorrectionProfile) => (target: string, transcript: string) =>
  compareGeneric(target, transcript, { avgLogprob: -0.2, noSpeechProb: 0.01 }, profile);

describe("higher-level profiles (Eagles / Tigers / Sharks / Advanced)", () => {
  // REAL STEP 2 targets pulled from the curriculum (Day 1 chunks / longest chunks).
  const EAGLES_D1 =
    "Yesterday, I had a busy day because I had several things to do. I arrived early, and I started working right away."; // 22 words → 1 allowed
  const TIGERS_D1 =
    "The main reason I wanted to change was that I felt I wasn't growing. However, the new job was risky because I didn't know the company well."; // 29 tokens → 2 allowed
  const SHARKS_LONG =
    "For it to happen, I would need to set aside time every week, no matter what. If it cost twice as much as I expected, I would probably start with a cheaper instrument first."; // 34 words
  const ADVANCED_D1 =
    "I'm currently improving my English because I want to work in an international environment. I've had experience working with different types of people."; // 25 tokens → 2 allowed
  const ADVANCED_LONG =
    "If I were an animal, I'd be a dog, because I'm loyal, I learn fast, and I actually enjoy working with people. If a customer is waiting and my supervisor needs a report, I take care of the customer first and tell my supervisor exactly when the report will be ready."; // ~54 tokens → still capped at 2

  it("profiles are registered and share the conservative shape", () => {
    for (const [id, p] of [
      ["eagles-week-1", EAGLES_PROFILE],
      ["tigers", TIGERS_PROFILE],
      ["sharks", SHARKS_PROFILE],
      ["advanced-1", ADVANCED_1_PROFILE],
    ] as const) {
      expect(getRep2CorrectionProfile(id)).toBe(p);
      expect(p.focusRules).toEqual([]);
      expect(p.maxMismatchesForFocus).toBe(2);
      expect(p.maxWordErrorRateForGood).toBe(0.08);
    }
  });

  describe("EAGLES real target", () => {
    const c = hl(EAGLES_PROFILE);
    it("exact → GOOD (not nearMatch)", () => {
      const r = c(EAGLES_D1, EAGLES_D1);
      expect(r.status).toBe("good");
      expect(r.nearMatch).toBeUndefined();
    });
    it("punctuation / casing → GOOD", () => {
      expect(c(EAGLES_D1, "yesterday i had a busy day because i had several things to do i arrived early and i started working right away").status).toBe("good");
    });
    it("one harmless dropped word on a 22-word target → GOOD nearMatch", () => {
      const r = c(EAGLES_D1, "Yesterday, I had a busy day because I had several things to do. I arrived early, and I started working away.");
      expect(r.status).toBe("good");
      expect(r.nearMatch).toBe(true);
      expect(r.retryRecommended).toBe(false);
    });
    it("one dropped protected word (HAD) → CORRECT", () => {
      const r = c(EAGLES_D1, "Yesterday, I a busy day because I had several things to do. I arrived early, and I started working right away.");
      expect(r.status).toBe("correct");
    });
    it("clearly shortened answer → CORRECT, never asr_uncertain", () => {
      expect(c(EAGLES_D1, "Yesterday I had a busy day").status).toBe("correct");
    });
    it("completely different clear sentence → CORRECT", () => {
      expect(c(EAGLES_D1, "My name is Carlos and I live in San Salvador").status).toBe("correct");
    });
  });

  describe("TIGERS real target", () => {
    const c = hl(TIGERS_PROFILE);
    it("supported contraction equivalents → GOOD", () => {
      expect(c(TIGERS_D1, "The main reason I wanted to change was that I felt I was not growing. However, the new job was risky because I did not know the company well.").status).toBe("good");
    });
    it("missing 'that' → GOOD nearMatch", () => {
      const r = c(TIGERS_D1, "The main reason I wanted to change was I felt I wasn't growing. However, the new job was risky because I didn't know the company well.");
      expect(r.status).toBe("good");
      expect(r.nearMatch).toBe(true);
    });
    it("missing WAS (protected) → CORRECT", () => {
      expect(c(TIGERS_D1, "The main reason I wanted to change that I felt I wasn't growing. However, the new job was risky because I didn't know the company well.").status).toBe("correct");
    });
    it("three differences on a ~29-word target → CORRECT, no focus", () => {
      const r = c(TIGERS_D1, "The main reason I wanted change was I felt I wasn't growing. However, the new job risky because I didn't know the company well.");
      expect(r.status).toBe("correct");
      expect(r.focus).toBeUndefined();
    });
    it("empty / low confidence → asr_uncertain", () => {
      expect(compareGeneric(TIGERS_D1, "", undefined, TIGERS_PROFILE).status).toBe("asr_uncertain");
      expect(compareGeneric(TIGERS_D1, TIGERS_D1, { avgLogprob: -0.9, noSpeechProb: 0 }, TIGERS_PROFILE).status).toBe("asr_uncertain");
    });
  });

  describe("SHARKS real target", () => {
    const c = hl(SHARKS_PROFILE);
    it("exact → GOOD", () => {
      expect(c(SHARKS_LONG, SHARKS_LONG).status).toBe("good");
    });
    it("missing WOULD (protected) → CORRECT", () => {
      const r = c(SHARKS_LONG, "For it to happen, I would need to set aside time every week, no matter what. If it cost twice as much as I expected, I probably start with a cheaper instrument first.");
      expect(r.status).toBe("correct");
      expect(r.focus).toBe("WOULD");
    });
    it("one harmless difference → GOOD nearMatch", () => {
      const r = c(SHARKS_LONG, "For it to happen, I would need to set aside time every week, no matter what. If it cost twice as much as I expected, I would start with a cheaper instrument first.");
      expect(r.status).toBe("good");
      expect(r.nearMatch).toBe(true);
    });
  });

  describe("ADVANCED real target", () => {
    const c = hl(ADVANCED_1_PROFILE);
    it("exact + contraction → GOOD", () => {
      expect(c(ADVANCED_D1, "I am currently improving my English because I want to work in an international environment. I have had experience working with different types of people.").status).toBe("good");
    });
    it("missing HAVE (protected) → CORRECT", () => {
      expect(c(ADVANCED_D1, "I'm currently improving my English because I want to work in an international environment. I had experience working with different types of people.").status).toBe("correct");
    });
    it("one harmless replacement → GOOD nearMatch", () => {
      const r = c(ADVANCED_D1, "I'm currently improving my English because I want to work in a international environment. I've had experience working with different types of people.");
      expect(r.status).toBe("good");
      expect(r.nearMatch).toBe(true);
    });
    it("absolute cap on a ~50-word target: 2 harmless → GOOD, 3 harmless → CORRECT", () => {
      const two = "If I were an animal, I'd be a dog, because I'm loyal, I learn fast, and I enjoy working with people. If a customer is waiting and my supervisor needs a report, I take care of the customer first and tell my supervisor when the report will be ready.";
      const three = "If I were an animal, I'd be a dog, because I'm loyal, I learn fast, and I enjoy working with people. If a customer is waiting and my supervisor needs a report, I take care of the customer and tell my supervisor when the report will be ready.";
      const r2 = c(ADVANCED_LONG, two);
      expect(r2.status).toBe("good");
      expect(r2.nearMatch).toBe(true);
      const r3 = c(ADVANCED_LONG, three);
      expect(r3.status).toBe("correct");
      expect(r3.nearMatch).toBeUndefined();
    });
    it("five clear differences → CORRECT, no focus, full target", () => {
      const r = c(ADVANCED_LONG, "If I were an animal, I be a cat, because I loyal, I learn slow, and I enjoy working with people. If a customer is waiting and my boss needs a report, I take care of the customer first and tell my supervisor exactly when the report will be ready.");
      expect(r.status).toBe("correct");
      expect(r.focus).toBeUndefined();
      expect(r.correction).toBe(ADVANCED_LONG);
    });
  });

  describe("protected words are never forgiven", () => {
    const c = hl(ADVANCED_1_PROFILE);
    // All targets below are ≥13 normalized words so tolerance can actually apply.
    const PROTECTED_TARGETS = [
      "I would not recommend that option because it could be risky and expensive.",
      "I have worked in customer service for three years and I enjoy helping people.",
      "If I had to choose, I would probably accept the second job because it gives me more flexibility.",
      "The main reason was that I wanted more stability and a better opportunity to grow.",
    ];
    it("guard: every protected-word target is long enough for tolerance to apply", () => {
      for (const target of PROTECTED_TARGETS) {
        const words = normalizeForCompare(target).split(/\s+/).filter(Boolean).length;
        expect(Math.min(2, Math.floor(words * 0.08))).toBeGreaterThanOrEqual(1);
      }
    });
    it("missing protected NOT on a long target → CORRECT", () => {
      const r = c(
        "I would not recommend that option because it could be risky and expensive.",
        "I would recommend that option because it could be risky and expensive.",
      );
      expect(r.status).toBe("correct");
    });
    it("INSERTED protected NEVER (meaning reversed) → CORRECT — regression: protection covers the learner side too", () => {
      const r = c(
        "I have worked in customer service for three years and I enjoy helping people.",
        "I have never worked in customer service for three years and I enjoy helping people.",
      );
      expect(r.status).toBe("correct");
      expect(r.nearMatch).toBeUndefined();
    });
    it("missing protected WOULD on a long target → CORRECT", () => {
      expect(
        c(
          "If I had to choose, I would probably accept the second job because it gives me more flexibility.",
          "If I had to choose, I probably accept the second job because it gives me more flexibility.",
        ).status,
      ).toBe("correct");
    });
    it("missing harmless 'that' on a 15-word target → GOOD nearMatch", () => {
      const r = c(
        "The main reason was that I wanted more stability and a better opportunity to grow.",
        "The main reason was I wanted more stability and a better opportunity to grow.",
      );
      expect(r.status).toBe("good");
      expect(r.nearMatch).toBe(true);
    });
    it("short targets (<13 words) get no tolerance: floor(9 × 0.08) = 0 → CORRECT", () => {
      const r = c("The main reason was that I wanted more stability.", "The main reason was I wanted more stability.");
      expect(r.status).toBe("correct");
      expect(r.focus).toBe("THAT");
    });
  });

  it("tolerance never rescues a configured focus structure", () => {
    const p: Rep2CorrectionProfile = { ...EAGLES_PROFILE, focusRules: [{ phrase: ["because"], label: "BECAUSE" }] };
    const r = compareGeneric(EAGLES_D1, "Yesterday, I had a busy day I had several things to do. I arrived early, and I started working right away.", undefined, p);
    expect(r.status).toBe("correct");
    expect(r.focus).toBe("BECAUSE");
  });
});

describe("BASIC regression: no tolerance without maxWordErrorRateForGood", () => {
  const basics = [BASIC_ZERO_PROFILE, SIMPLE_FUTURE_PROFILE, SIMPLE_PRESENT_PROFILE, PAST_STORIES_PROFILE, MIXED_TENSES_PROFILE];
  it("no BASIC profile defines maxWordErrorRateForGood", () => {
    for (const p of basics) expect(p.maxWordErrorRateForGood).toBeUndefined();
  });
  it("Future: 'I'm going study tonight' → CORRECT focus going TO, never GOOD", () => {
    const r = compareGeneric("I'm going to study tonight.", "I'm going study tonight", undefined, SIMPLE_FUTURE_PROFILE);
    expect(r.status).toBe("correct");
    expect(r.focus).toBe("going TO");
    expect(r.nearMatch).toBeUndefined();
  });
  it.each(basics.map((p) => [p.moduleId, p] as const))("%s: one harmless dropped word on a long target is still CORRECT", (_id, p) => {
    const long = "In the morning, I'm going to work. I'm going to have lunch with a coworker and then I'm going to go home early.";
    const r = compareGeneric(long, "In the morning, I'm going to work. I'm going to have lunch with a coworker and then I'm going to go home.", undefined, p);
    expect(r.status).toBe("correct");
    expect(r.nearMatch).toBeUndefined();
  });
});

describe("rollout", () => {
  const ALL: ModuleId[] = [
    "basic-zero",
    "simple-future",
    "simple-present",
    "past-stories",
    "mixed-tenses",
    "eagles-week-1",
    "tigers",
    "sharks",
    "advanced-1",
  ];

  it("all nine implemented modules are rolled out", () => {
    for (const m of ALL) expect(hasRep2CorrectionRollout(m)).toBe(true);
    expect(hasRep2CorrectionRollout("unknown-module")).toBe(false);
  });

  it("every rolled-out module has its own profile; unknown ids fall back to generic", () => {
    for (const m of ALL) expect(getRep2CorrectionProfile(m).moduleId).toBe(m);
    expect(getRep2CorrectionProfile("unknown-module")).toBe(GENERIC_PROFILE);
  });

  it("integration audit: every real day with Rep 2 chunks is enabled and yields non-empty targets", async () => {
    for (const m of ALL) {
      const loaded = await CourseService.loadModule(m);
      expect(loaded.days.length).toBeGreaterThan(0);
      for (const day of loaded.days) {
        const chunks = rep2Chunks(day);
        expect(chunks.length, `${m} day ${day.day} has no Rep 2 chunks`).toBeGreaterThan(0);
        const ids = new Set<string>();
        for (const c of chunks) {
          expect(c.id, `${m} d${day.day} chunk without id`).toBeTruthy();
          expect(ids.has(c.id), `${m} d${day.day} duplicate chunk id ${c.id}`).toBe(false);
          ids.add(c.id);
          expect(chunks.find((x) => x.id === c.id)).toBe(c);
          expect(rep2ChunkText(c).trim(), `${m} d${day.day} ${c.id}`).not.toBe("");
        }
        expect(isRep2CorrectionEnabled(m, day), `${m} day ${day.day} should be enabled`).toBe(true);
      }
    }
  }, 60_000);
});

describe("transcription spelling variants are not speaking errors", () => {
  const compare = (target: string, transcript: string) =>
    compareGeneric(target, transcript, undefined, BASIC_ZERO_PROFILE);

  it("accepts Sophia for Sofia", () => {
    expect(compare("Sofia works every day.", "Sophia works every day").status).toBe("good");
  });

  it("accepts an accented name", () => {
    expect(compare("Sofía works every day.", "Sofia works every day").status).toBe("good");
  });

  it("accepts hard-working spelled as two words", () => {
    expect(compare("She is hardworking.", "She is hard working").status).toBe("good");
  });

  it("accepts hardworking when the target is two words", () => {
    expect(compare("She is hard working.", "She is hardworking").status).toBe("good");
  });

  it("accepts one-letter transcription drift on a long word", () => {
    expect(compare("I work on Saturday.", "I work on Saterday").status).toBe("good");
  });

  it("accepts British spelling", () => {
    expect(compare("It is my favorite center.", "It is my favourite centre").status).toBe("good");
  });

  it("still flags a real word difference", () => {
    expect(compare("Sofia works every day.", "Sofia work every day").status).toBe("correct");
  });

  it("still flags a dropped negative", () => {
    expect(compare("She does not work here.", "She does work here").status).toBe("correct");
  });
});

describe("computeRep2DisplayDiff (display-only highlights)", () => {
  it("highlights only the differing words, keeping original casing", async () => {
    const { computeRep2DisplayDiff } = await import("./rep2-match");
    const diff = computeRep2DisplayDiff(
      "If I received five thousand dollars, I could travel.",
      "If I received $2000 I could travel.",
    );
    expect(diff).toBeDefined();
    const saidChanged = diff!.said.filter((t) => t.changed).map((t) => t.text);
    const targetChanged = diff!.target.filter((t) => t.changed).map((t) => t.text);
    expect(saidChanged).toEqual(["$2000"]);
    expect(targetChanged).toEqual(["five", "thousand", "dollars,"]);
    // Matching words stay unchanged and keep original text.
    expect(diff!.target[0]).toEqual({ text: "If", changed: false });
  });

  it("returns undefined when nothing differs", async () => {
    const { computeRep2DisplayDiff } = await import("./rep2-match");
    expect(computeRep2DisplayDiff("I like coffee.", "I like coffee.")).toBeUndefined();
  });

  it("returns undefined when there are too many differences", async () => {
    const { computeRep2DisplayDiff, REP2_DISPLAY_DIFF_MAX_CHANGED_WORDS } = await import("./rep2-match");
    const target = "one two three four five six seven eight nine ten";
    const said = "uno dos tres cuatro cinco seis siete ocho nueve diez";
    const diff = computeRep2DisplayDiff(target, said);
    expect(diff).toBeUndefined();
    expect(REP2_DISPLAY_DIFF_MAX_CHANGED_WORDS).toBeLessThan(20);
  });

  it("returns undefined for empty input", async () => {
    const { computeRep2DisplayDiff } = await import("./rep2-match");
    expect(computeRep2DisplayDiff("", "hello")).toBeUndefined();
    expect(computeRep2DisplayDiff("hello", "")).toBeUndefined();
  });
});
