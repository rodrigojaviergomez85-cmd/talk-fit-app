import { describe, expect, it } from "vitest";
import {
  HELP_PROMPTS,
  SUMMARY_PROMPT,
  buildOpeningPrompt,
  buildSystemInstruction,
  hasKnownLevel,
} from "./live-coach-prompts";

const known = { level: "Basic Zero", focus: "Introduce yourself" };
const unknown = {};

describe("live coach prompts", () => {
  it("never asks the level when the curriculum level is known", () => {
    const system = buildSystemInstruction(known);
    expect(system).toContain("Basic Zero");
    expect(system).toContain("Introduce yourself");
    expect(system).toContain("Never ask the learner what their level is");
    expect(system).not.toContain("basic, intermediate, or advanced?");
    expect(buildOpeningPrompt(known)).toContain("Do not ask their level");
  });

  it("asks the level once, simply, when it is missing", () => {
    const system = buildSystemInstruction(unknown);
    expect(hasKnownLevel(unknown)).toBe(false);
    expect(system).toContain("basic, intermediate, or advanced?");
    expect(system).toContain("Ask this only once");
    expect(buildOpeningPrompt(unknown)).toContain("basic, intermediate, or advanced?");
  });

  it("keeps one coherent Spanish policy in every message", () => {
    for (const system of [buildSystemInstruction(known), buildSystemInstruction(unknown)]) {
      // Practice is in English, Spanish is allowed only as help.
      expect(system).toContain("Practice happens mainly in English");
      expect(system).toContain("explain briefly in Spanish");
      // No blanket Spanish ban that would contradict the help rules.
      expect(system).not.toContain("the conversation always stays in English");
      expect(system).not.toContain("Never switch into a Spanish conversation");
      expect(system).not.toMatch(/ONE short Spanish hint/);
    }
    expect(HELP_PROMPTS.spanish).toContain("in Spanish");
    expect(HELP_PROMPTS.spanish).toContain("answer in English");
  });

  it("defines slow and idea help without contradicting the system rules", () => {
    expect(HELP_PROMPTS.slow).toContain("slower");
    expect(HELP_PROMPTS.slow).toContain("Do not add a new question");
    expect(HELP_PROMPTS.idea).toContain("sentence starter");
    expect(HELP_PROMPTS.idea).toContain("Do not complete the answer");
    for (const system of [buildSystemInstruction(known), buildSystemInstruction(unknown)]) {
      expect(system).toContain("genuinely slower pace");
      expect(system).toContain("never the full answer");
    }
  });

  it("keeps short turns, level adaptation and one correction per intervention", () => {
    const system = buildSystemInstruction(known);
    expect(system).toContain("three sentences maximum");
    expect(system).toContain("Adapt to the learner's level");
    expect(system).toContain("at most ONE relevant mistake per intervention");
    expect(SUMMARY_PROMPT).toContain("goodbye in Spanish");
  });

  it("has no leftover phase script that would re-ask the level", () => {
    for (const system of [buildSystemInstruction(known), buildSystemInstruction(unknown)]) {
      expect(system).not.toContain("PHASE 1");
      expect(system).not.toContain("PHASE 2");
    }
  });
});
