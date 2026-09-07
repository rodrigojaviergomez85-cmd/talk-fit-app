import { describe, it, expect } from "vitest";
import { tPair } from "./i18n";

describe("rep3.noAi copy", () => {
  it("returns the Spanish and English STEP 3 no-AI status line", () => {
    const [es, en] = tPair("rep3.noAi");
    expect(es).toBe("🎧 Práctica sin IA · No hay evaluación automática.");
    expect(en).toBe("🎧 Practice without AI · No automatic evaluation.");
  });
});

describe("rep4.noAi copy", () => {
  it("returns the Spanish and English STEP 4 no-AI status line", () => {
    const [es, en] = tPair("rep4.noAi");
    expect(es).toBe("🎙️ Práctica sin IA · No hay evaluación automática.");
    expect(en).toBe("🎙️ Practice without AI · No automatic evaluation.");
  });
});
