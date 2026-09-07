import { describe, it, expect } from "vitest";
import { tPair } from "./i18n";

describe("rep5.aiDisclaimer copy", () => {
  it("returns the Spanish and English STEP 5 AI Coach disclaimer", () => {
    const [es, en] = tPair("rep5.aiDisclaimer");
    expect(es).toBe(
      "La IA analizará tu Audio Final y puede cometer errores. Úsala como guía para mejorar.",
    );
    expect(en).toBe(
      "AI will analyze your Final Audio and may make mistakes. Use it as a guide to improve.",
    );
  });
});
