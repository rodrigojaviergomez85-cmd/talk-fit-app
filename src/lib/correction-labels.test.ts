import { describe, expect, it } from "vitest";
import { correctionDisplayLabel, isStructuralTenseError } from "./correction-labels";

const label = (moduleId: string, said: string, betterVersion: string, showEs = true) =>
  correctionDisplayLabel({ category: "verb_tense", moduleId, said, betterVersion, showEs });

describe("correction labels are module-aware and error-aware", () => {
  it("BASIC 1 · Simple Future — future error is FUTURO / FUTURE, never PASADO", () => {
    expect(label("simple-future", "Tomorrow I go and eat pizza", "Tomorrow I'm going to eat pizza")).toBe("FUTURO");
    expect(label("simple-future", "Tomorrow I go and eat pizza", "Tomorrow I'm going to eat pizza", false)).toBe("FUTURE");
  });

  it("broken future structure is a GRAMMAR problem, not a tense choice", () => {
    expect(label("simple-future", "I'm going play soccer", "I'm going to play soccer")).toBe("GRAMÁTICA");
    expect(label("simple-future", "I'm going play soccer", "I'm going to play soccer", false)).toBe("GRAMMAR");
    expect(isStructuralTenseError("I'm going play", "I'm going to play")).toBe(true);
  });

  it("Simple Present — present error is PRESENTE / PRESENT", () => {
    expect(label("simple-present", "She work at home", "She works at home")).toBe("PRESENTE");
    expect(label("simple-present", "She work at home", "She works at home", false)).toBe("PRESENT");
  });

  it("Past Stories — real past error stays PASADO, broken past structure is GRAMÁTICA", () => {
    expect(label("past-stories", "Yesterday I wake up late", "Yesterday I woke up late")).toBe("PASADO");
    expect(label("past-stories", "I didn't went to work", "I didn't go to work")).toBe("GRAMÁTICA");
  });

  it("Mixed Tenses — the label follows the ACTUAL tense of the correction", () => {
    expect(label("mixed-tenses", "Yesterday I go to the park", "Yesterday I went to the park")).toBe("PASADO");
    expect(label("mixed-tenses", "Tomorrow I went to the party", "Tomorrow I'm going to the party")).toBe("FUTURO");
  });

  it("Basic Zero — no tense signal falls back to a simple GRAMÁTICA label", () => {
    expect(label("basic-zero", "I no like coffee", "I don't like coffee")).toBe("GRAMÁTICA");
  });

  it("non-tense categories keep their stable labels", () => {
    expect(correctionDisplayLabel({ category: "repetition", showEs: true })).toBe("VARÍA TU INGLÉS");
    expect(correctionDisplayLabel({ category: "repetition", showEs: false })).toBe("ADD VARIETY");
    expect(correctionDisplayLabel({ category: "task_relevance", showEs: true })).toContain("RESPONDE LA PREGUNTA");
  });
});
