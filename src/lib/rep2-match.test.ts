import { describe, expect, it } from "vitest";
import { compareRep2 as compareGeneric, toPublicStatus, type Rep2Confidence } from "./rep2-match";
import {
  GENERIC_PROFILE,
  SIMPLE_FUTURE_PROFILE,
  BASIC_ZERO_PROFILE,
  SIMPLE_PRESENT_PROFILE,
  PAST_STORIES_PROFILE,
  MIXED_TENSES_PROFILE,
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

describe("rollout", () => {
  const BASIC: ModuleId[] = ["basic-zero", "simple-future", "simple-present", "past-stories", "mixed-tenses"];
  const OTHER: ModuleId[] = ["eagles-week-1", "tigers", "sharks", "advanced-1"];

  it("only the five Basic modules are rolled out", () => {
    for (const m of BASIC) expect(hasRep2CorrectionRollout(m)).toBe(true);
    for (const m of OTHER) expect(hasRep2CorrectionRollout(m)).toBe(false);
    expect(hasRep2CorrectionRollout("unknown-module")).toBe(false);
  });

  it("every Basic module has its own profile; others fall back to generic", () => {
    for (const m of BASIC) expect(getRep2CorrectionProfile(m).moduleId).toBe(m);
    for (const m of OTHER) expect(getRep2CorrectionProfile(m)).toBe(GENERIC_PROFILE);
  });

  it("integration audit: every Basic day exists, yields non-empty Rep 2 targets and is enabled", async () => {
    for (const m of BASIC) {
      const loaded = await CourseService.loadModule(m);
      expect(loaded.days.length).toBeGreaterThan(0);
      for (const day of loaded.days) {
        const chunks = rep2Chunks(day);
        expect(chunks.length, `${m} day ${day.day} has no Rep 2 chunks`).toBeGreaterThan(0);
        for (const c of chunks) expect(rep2ChunkText(c).trim(), `${m} d${day.day} ${c.id}`).not.toBe("");
        expect(isRep2CorrectionEnabled(m, day), `${m} day ${day.day} should be enabled`).toBe(true);
      }
    }
  }, 30_000);

  it("non-Basic modules stay disabled on every day", async () => {
    for (const m of OTHER) {
      const loaded = await CourseService.loadModule(m);
      for (const day of loaded.days) expect(isRep2CorrectionEnabled(m, day)).toBe(false);
    }
  }, 30_000);
});
