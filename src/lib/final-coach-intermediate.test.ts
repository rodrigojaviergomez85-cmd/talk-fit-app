/**
 * AI COACH — INTERMEDIATE ROLLOUT (eagles-week-1 / tigers / sharks).
 * Compact multi-correction coach, max 5 adaptive corrections, no retake change.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  buildCoachMessages,
  buildRubric,
  COACH_JSON_SCHEMA_MULTI,
  coachJsonSchemaFor,
  normalizeCorrections,
} from "./final-audio-coach.server";
import {
  INTERMEDIATE_MODULE_IDS,
  coachVersionFor,
  isMultiCorrectionPilot,
  isRetakePilot,
  maxCorrectionsFor,
  type FinalCoachState,
} from "./final-audio-coach";
import { correctionDisplayLabel } from "./correction-labels";
import { FinalCoachReview } from "@/components/fluency/FinalCoachReview";
import { CourseService } from "@/services/course-service";

const TRANSCRIPT =
  "She don't like her job because she work too much. She don't really enjoy it. " +
  "Yesterday we go to the beach. I have five years working here. I went home. I ate. I watched TV.";

describe("INTERMEDIATE rollout — gate, version and rubric", () => {
  it("all three intermediate modules are live with max 5 and their own cache version", () => {
    for (const m of INTERMEDIATE_MODULE_IDS) {
      for (const d of [1, 7, 20]) {
        expect(isMultiCorrectionPilot(m, d)).toBe(true);
        expect(maxCorrectionsFor(m, d)).toBe(5);
        expect(coachVersionFor(m, d)).toBe("v3.3-intermediate");
      }
    }
  });

  it("BASIC and ADVANCED are untouched", () => {
    for (const m of ["basic-zero", "simple-future", "simple-present", "past-stories", "mixed-tenses"]) {
      expect(maxCorrectionsFor(m, 1)).toBe(3);
      expect(coachVersionFor(m, 1)).toBe("v3.2-basic");
    }
    expect(maxCorrectionsFor("advanced-1", 1)).toBe(0);
    expect(coachVersionFor("advanced-1", 1)).toBe("v2");
  });

  it("retake eligibility is NOT rolled out to intermediate", () => {
    for (const m of INTERMEDIATE_MODULE_IDS) expect(isRetakePilot(m, 1)).toBe(false);
    expect(isRetakePilot("past-stories", 1)).toBe(true);
  });

  it("each intermediate module gets its own CourseDay rubric + the multi schema", async () => {
    for (const m of ["eagles-week-1", "tigers", "sharks"] as const) {
      const mod = await CourseService.loadModule(m);
      const rubric = buildRubric(mod.days[0]!, m, mod.label ?? m, null)!;
      expect(rubric.maxCorrections).toBe(5);
      expect(rubric.coachVersion).toBe("v3.3-intermediate");
      expect(coachJsonSchemaFor(rubric)).toBe(COACH_JSON_SCHEMA_MULTI);
      const [system, user] = buildCoachMessages(rubric, TRANSCRIPT, 5);
      expect(system!.content).toContain("5 HIGHEST-LEARNING-VALUE items at most");
      expect(system!.content).toContain("NEVER add an item just to reach 5");
      expect(system!.content).toContain("Never skip a real grammar error because the learner is intermediate");
      // CourseDay is the source of truth, not one generic intermediate rubric.
      expect(user!.content).toContain(mod.days[0]!.focus);
      expect(user!.content).toContain(mod.days[0]!.topic);
    }
  });
});

describe("INTERMEDIATE — corrections are adaptive, grounded and grouped", () => {
  const norm = (items: unknown[]) => normalizeCorrections(items, 5, TRANSCRIPT);

  it("2 real issues stay 2 — the coach never pads to 5", () => {
    const out = norm([
      { category: "grammar", said: "She don't like her job", betterVersion: "She doesn't like her job", whyEn: "he/she/it → doesn't.", whyEs: "Con she usa doesn't.", ruleKey: "third_person_doesnt", relatedOccurrences: [] },
      { category: "naturalness", said: "I have five years working here", betterVersion: "I've worked here for five years", whyEn: "", whyEs: "", ruleKey: "for_duration", relatedOccurrences: [] },
    ]);
    expect(out).toHaveLength(2);
  });

  it("4 different grammar/tense errors may use 4 slots", () => {
    const out = norm([
      { category: "grammar", said: "She don't like her job", betterVersion: "She doesn't like her job", whyEn: "", whyEs: "", ruleKey: "third_person_doesnt", relatedOccurrences: [] },
      { category: "verb_tense", said: "Yesterday we go to the beach", betterVersion: "Yesterday we went to the beach", whyEn: "", whyEs: "", ruleKey: "past_simple", relatedOccurrences: [] },
      { category: "grammar", said: "she work too much", betterVersion: "she works too much", whyEn: "", whyEs: "", ruleKey: "third_person_s", relatedOccurrences: [] },
      { category: "naturalness", said: "I have five years working here", betterVersion: "I've worked here for five years", whyEn: "", whyEs: "", ruleKey: "for_duration", relatedOccurrences: [] },
    ]);
    expect(out).toHaveLength(4);
  });

  it("same rule repeated = ONE slot + grounded relatedOccurrences", () => {
    const out = norm([
      { category: "grammar", said: "She don't like her job", betterVersion: "She doesn't like her job", whyEn: "", whyEs: "", ruleKey: "third_person_doesnt", relatedOccurrences: [] },
      { category: "grammar", said: "She don't really enjoy it", betterVersion: "She doesn't really enjoy it", whyEn: "", whyEs: "", ruleKey: "third_person_doesnt", relatedOccurrences: [] },
    ]);
    expect(out).toHaveLength(1);
    expect(out[0]!.relatedOccurrences).toEqual([
      { said: "She don't really enjoy it", betterVersion: "She doesn't really enjoy it" },
    ]);
  });

  it("invented quotes are discarded and the cap stays at 5", () => {
    const many = Array.from({ length: 8 }, (_, i) => ({
      category: "grammar",
      said: i === 0 ? "I never said this sentence" : ["She don't like her job", "she work too much", "Yesterday we go to the beach", "I have five years working here", "I went home", "I ate", "I watched TV"][i - 1],
      betterVersion: "better",
      whyEn: "",
      whyEs: "",
      ruleKey: `rule_${i}`,
      relatedOccurrences: [],
    }));
    const out = norm(many);
    expect(out.length).toBeLessThanOrEqual(5);
    expect(out.some((c) => c.said === "I never said this sentence")).toBe(false);
  });
});

describe("INTERMEDIATE — labels and compact UI", () => {
  it("uses the intermediate wording without changing BASIC labels", () => {
    expect(correctionDisplayLabel({ category: "naturalness", moduleId: "tigers", showEs: true })).toBe("INGLÉS NATURAL");
    expect(correctionDisplayLabel({ category: "connector", moduleId: "sharks", showEs: true })).toBe("CONECTA TUS IDEAS");
    expect(correctionDisplayLabel({ category: "development", moduleId: "eagles-week-1", showEs: false })).toBe("DEVELOP MORE");
    expect(correctionDisplayLabel({ category: "connector", moduleId: "past-stories", showEs: true })).toBe("CONEXIÓN");
    // Tense labels stay error-driven, never module-driven.
    expect(correctionDisplayLabel({ category: "verb_tense", moduleId: "tigers", said: "Yesterday we go", betterVersion: "Yesterday we went", showEs: true })).toBe("PASADO");
  });

  it("renders the compact coach with N corrections and a collapsed transcript", () => {
    const state: FinalCoachState = {
      status: "ready",
      transcript: TRANSCRIPT,
      feedback: {
        taskCompleted: true,
        targetLanguage: "developing",
        organization: "developing",
        strengthEn: "You gave a reason for your idea.",
        strengthEs: "Diste una razón para tu idea.",
        nextStepEn: "Compare two options using while.",
        nextStepEs: "Compara dos opciones usando while.",
        correctionNeeded: true,
        answeredTask: "yes",
        corrections: [
          { category: "grammar", said: "She don't like her job", betterVersion: "She doesn't like her job", whyEn: "he/she/it → doesn't.", whyEs: "Con she/he/it usa doesn't.", relatedOccurrences: [{ said: "She don't really enjoy it", betterVersion: "She doesn't really enjoy it" }] },
          { category: "naturalness", said: "I have five years working here", betterVersion: "I've worked here for five years", whyEn: "", whyEs: "" },
        ],
      },
    } as unknown as FinalCoachState;
    const html = renderToStaticMarkup(
      createElement(FinalCoachReview, { state, showEs: true, moduleId: "tigers", onContinue: () => {} }),
    );
    expect(html).toContain("· 2");
    expect(html).toContain("INGLÉS NATURAL");
    expect(html).toContain("TAMBIÉN APLICA A");
    expect(html).not.toContain("· 5");
  });
});
