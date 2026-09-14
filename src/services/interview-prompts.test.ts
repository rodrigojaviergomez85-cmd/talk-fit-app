import { describe, expect, it } from "vitest";
import {
  ADVANCED_INTERVIEW_PROMPTS,
  BASIC_INTERVIEW_PROMPTS,
  INTERMEDIATE_INTERVIEW_PROMPTS,
} from "./interview-prompts";

const ARRAYS = {
  basic: BASIC_INTERVIEW_PROMPTS,
  intermediate: INTERMEDIATE_INTERVIEW_PROMPTS,
  advanced: ADVANCED_INTERVIEW_PROMPTS,
} as const;

describe("interview prompt data", () => {
  for (const [name, prompts] of Object.entries(ARRAYS)) {
    it(`${name}: non-empty, unique ids, every entry speaks`, () => {
      expect(prompts.length).toBeGreaterThan(0);
      expect(new Set(prompts.map((p) => p.id)).size).toBe(prompts.length);
      for (const p of prompts) expect(p.en.trim().length).toBeGreaterThan(0);
    });
  }
});
