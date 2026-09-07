import { describe, it, expect } from "vitest";
import { tPair } from "./i18n";

describe("rep2.aiDisclaimer copy", () => {
  it("returns the Spanish and English STEP 2 AI feedback disclaimer", () => {
    const [es, en] = tPair("rep2.aiDisclaimer");
    expect(es).toBe(
      "La IA comparará tu respuesta y puede cometer errores. Úsala como guía para mejorar.",
    );
    expect(en).toBe(
      "AI will compare your response and may make mistakes. Use the feedback as a guide to improve.",
    );
  });
});
