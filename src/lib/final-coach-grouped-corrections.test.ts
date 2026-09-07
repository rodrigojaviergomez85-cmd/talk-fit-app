/**
 * Repeated occurrences of ONE reusable rule are grouped under a single
 * correction ("also applies to") instead of consuming extra correction slots.
 */
import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { normalizeCorrections, normalizeRelatedOccurrences } from "./final-audio-coach.server";
import { MAX_RELATED_OCCURRENCES, MULTI_CORRECTION_MAX, type FinalCoachState } from "./final-audio-coach";
import { FinalCoachReview } from "@/components/fluency/FinalCoachReview";

const why = { whyEn: "Use going to + verb.", whyEs: "Usa going to + verbo." };

const FUTURE_TRANSCRIPT =
  "Tomorrow I go and eat pizza and after I'm going play soccer and then I'm going visit my family.";

describe("grouped corrections — server", () => {
  it("groups the repeated 'going to' rule into ONE correction with related occurrences", () => {
    const out = normalizeCorrections(
      [
        { category: "verb_tense", said: "Tomorrow I go and eat pizza", betterVersion: "Tomorrow I'm going to eat pizza", ruleKey: "future_going_to", ...why },
        {
          category: "grammar",
          said: "I'm going play soccer",
          betterVersion: "I'm going to play soccer",
          ruleKey: "going_to_missing_to",
          relatedOccurrences: [{ said: "I'm going visit my family", betterVersion: "I'm going to visit my family" }],
          ...why,
        },
      ],
      MULTI_CORRECTION_MAX.basic,
      FUTURE_TRANSCRIPT,
    );
    expect(out).toHaveLength(2);
    expect(out[1]!.relatedOccurrences).toEqual([{ said: "I'm going visit my family", betterVersion: "I'm going to visit my family" }]);
  });

  it("merges a second item with the same ruleKey instead of spending a slot", () => {
    const transcript = "My mom work at home. She like coffee. She start at eight.";
    const out = normalizeCorrections(
      [
        { category: "verb_tense", said: "My mom work at home", betterVersion: "My mom works at home", ruleKey: "third_person_s", ...why },
        { category: "verb_tense", said: "She like coffee", betterVersion: "She likes coffee", ruleKey: "third_person_s", ...why },
        { category: "verb_tense", said: "She start at eight", betterVersion: "She starts at eight", ruleKey: "third_person_s", ...why },
      ],
      MULTI_CORRECTION_MAX.basic,
      transcript,
    );
    expect(out).toHaveLength(1);
    expect(out[0]!.relatedOccurrences).toHaveLength(2);
  });

  it("caps related occurrences at 2 even when the pattern repeats 4+ times", () => {
    const transcript = "I didn't went to work and I didn't ate lunch and I didn't saw him and I didn't took it.";
    const out = normalizeCorrections(
      [
        {
          category: "grammar",
          said: "I didn't went to work",
          betterVersion: "I didn't go to work",
          ruleKey: "did_base_verb",
          relatedOccurrences: [
            { said: "I didn't ate lunch", betterVersion: "I didn't eat lunch" },
            { said: "I didn't saw him", betterVersion: "I didn't see him" },
            { said: "I didn't took it", betterVersion: "I didn't take it" },
          ],
          ...why,
        },
      ],
      MULTI_CORRECTION_MAX.basic,
      transcript,
    );
    expect(out[0]!.relatedOccurrences).toHaveLength(MAX_RELATED_OCCURRENCES);
  });

  it("never groups two DIFFERENT rules", () => {
    const transcript = "She work at home. Yesterday I go shopping.";
    const out = normalizeCorrections(
      [
        { category: "verb_tense", said: "She work at home", betterVersion: "She works at home", ruleKey: "third_person_s", ...why },
        { category: "verb_tense", said: "Yesterday I go shopping", betterVersion: "Yesterday I went shopping", ruleKey: "past_simple", ...why },
      ],
      MULTI_CORRECTION_MAX.basic,
      transcript,
    );
    expect(out).toHaveLength(2);
    expect(out[0]!.relatedOccurrences).toBeUndefined();
  });

  it("discards an ungrounded related occurrence but keeps the main correction", () => {
    const out = normalizeCorrections(
      [
        {
          category: "grammar",
          said: "I'm going play soccer",
          betterVersion: "I'm going to play soccer",
          ruleKey: "going_to_missing_to",
          relatedOccurrences: [{ said: "I'm going swim in the ocean", betterVersion: "I'm going to swim in the ocean" }],
          ...why,
        },
      ],
      MULTI_CORRECTION_MAX.basic,
      FUTURE_TRANSCRIPT,
    );
    expect(out).toHaveLength(1);
    expect(out[0]!.relatedOccurrences).toBeUndefined();
  });

  it("never exceeds the BASIC maximum of 3 corrections", () => {
    const transcript = "She work at home. Yesterday I go shopping. Tomorrow I go to the party. I no like coffee.";
    const items = [
      { category: "verb_tense", said: "She work at home", betterVersion: "She works at home", ruleKey: "third_person_s", ...why },
      { category: "verb_tense", said: "Yesterday I go shopping", betterVersion: "Yesterday I went shopping", ruleKey: "past_simple", ...why },
      { category: "verb_tense", said: "Tomorrow I go to the party", betterVersion: "Tomorrow I'm going to the party", ruleKey: "future_going_to", ...why },
      { category: "grammar", said: "I no like coffee", betterVersion: "I don't like coffee", ruleKey: "negative_dont", ...why },
    ];
    expect(normalizeCorrections(items, MULTI_CORRECTION_MAX.basic, transcript)).toHaveLength(3);
  });

  it("grounds related occurrences the same way as the primary quote", () => {
    expect(normalizeRelatedOccurrences([{ said: "I'm going visit my family", betterVersion: "I'm going to visit my family" }], FUTURE_TRANSCRIPT, "I'm going play soccer")).toHaveLength(1);
    expect(normalizeRelatedOccurrences([{ said: "I invented this quote", betterVersion: "fixed" }], FUTURE_TRANSCRIPT, "x")).toHaveLength(0);
  });
});

describe("grouped corrections — UI", () => {
  const state = {
    status: "ready",
    feedback: {
      taskCompleted: true,
      targetLanguage: "developing",
      organization: "good",
      strengthEn: "Good ideas",
      strengthEs: "Buenas ideas",
      nextStepEn: "Add detail",
      nextStepEs: "Agrega detalle",
      correctionNeeded: true,
      said: "I'm going play soccer",
      betterVersion: "I'm going to play soccer",
      whyEn: "Use going to + verb.",
      whyEs: "Recuerda: going to + verbo.",
      practicePhrase: "I'm going to play soccer.",
      answeredTask: "yes",
      fluencyUpgrade: null,
      corrections: [
        {
          category: "grammar",
          said: "I'm going play soccer",
          betterVersion: "I'm going to play soccer",
          whyEn: "Use going to + verb.",
          whyEs: "Recuerda: going to + verbo.",
          relatedOccurrences: [{ said: "I'm going visit my family", betterVersion: "I'm going to visit my family" }],
        },
      ],
    },
  } as unknown as FinalCoachState;

  const render = (showEs: boolean) =>
    renderToStaticMarkup(createElement(FinalCoachReview, { state, showEs, result: null, moduleId: "simple-future", onContinue: () => undefined }));

  it("shows one correction card with the bilingual 'also applies to' block", () => {
    const es = render(true);
    expect(es).toContain("TAMBIÉN APLICA A");
    expect(es).toContain("I&#x27;m going visit my family");
    expect(es.match(/data-testid="final-coach-correction-item"/g)).toHaveLength(1);
    // The shared WHY appears once, not under every occurrence.
    expect(es.match(/Recuerda: going to \+ verbo\./g)).toHaveLength(1);
    expect(render(false)).toContain("ALSO APPLIES TO");
  });
});
