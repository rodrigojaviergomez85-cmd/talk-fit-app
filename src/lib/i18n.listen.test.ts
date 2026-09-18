import { describe, expect, it } from "vitest";
import { tPair } from "./i18n";

/** Every string on the Week 1 listening screen exists in both app languages. */
describe("Week 1 listening screen copy", () => {
  it("translates the key labels", () => {
    expect(tPair("listen.title")).toEqual(["Tu día, en inglés.", "Your day, in English."]);
    expect(tPair("listen.lead")).toEqual(["Primero escucha. Después, tú.", "Listen first. Then it’s your turn."]);
    expect(tPair("listen.challenge")).toEqual(["Tu reto", "Your challenge"]);
    expect(tPair("listen.hearQuestion")).toEqual(["OÍR PREGUNTA", "LISTEN TO THE QUESTION"]);
    expect(tPair("listen.hearExample")).toEqual(["ESCUCHAR EJEMPLO", "LISTEN TO THE EXAMPLE"]);
    expect(tPair("listen.continue")).toEqual(["Continuar", "Continue"]);
    expect(tPair("listen.skip")).toEqual(["Saltar por ahora", "Skip for now"]);
  });

  it("keeps resuming audio distinct from continuing to the next exercise", () => {
    const [resumeEs, resumeEn] = tPair("listen.resumeAudio");
    const [continueEs, continueEn] = tPair("listen.continue");
    expect(resumeEs.toLowerCase()).toBe("reanudar audio");
    expect(resumeEn.toLowerCase()).toBe("resume audio");
    expect(resumeEs.toLowerCase()).not.toBe(continueEs.toLowerCase());
    expect(resumeEn.toLowerCase()).not.toBe(continueEn.toLowerCase());
  });

  it("names the speaker through a placeholder, never a hardcoded name", () => {
    const [es, en] = tPair("listen.speakerName");
    expect(es).toContain("{name}");
    expect(en).toContain("{name}");
    expect(es.replace("{name}", "Sofia")).toBe("Escucha a Sofia");
    expect(en.replace("{name}", "Sofia")).toBe("Listen to Sofia");
  });
});
