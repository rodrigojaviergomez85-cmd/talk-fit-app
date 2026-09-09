import { describe, expect, it } from "vitest";
import { getReviewModule, getReviewPractice, loadReviewDay, listReviewModules } from "./review-registry";
import { REVIEW_PRACTICE_COUNT, isReviewModuleId } from "@/lib/review-types";

describe("Review · Simple Present content", () => {
  const mod = getReviewModule("review-simple-present")!;

  it("exposes exactly five complete practices", () => {
    expect(mod.practices).toHaveLength(REVIEW_PRACTICE_COUNT);
    for (const p of mod.practices) {
      expect(p.lines.length).toBeGreaterThanOrEqual(6);
      expect(p.questions.length).toBeGreaterThanOrEqual(5);
      expect(p.finalPrompt.question.length).toBeGreaterThan(0);
      expect(p.grammarGoals.length).toBeGreaterThan(0);
    }
  });

  it("alternates perspective 3rd · 1st · 3rd · 1st · 3rd", () => {
    expect(mod.practices.map((p) => p.person)).toEqual(["third", "first", "third", "first", "third"]);
  });

  it("ships a seven-card grammar guide", () => {
    expect(mod.guide).toHaveLength(7);
  });
});

describe("Review · identity isolation", () => {
  it("never accepts curriculum module ids", () => {
    expect(isReviewModuleId("simple-present")).toBe(false);
    expect(getReviewModule("simple-present")).toBeNull();
    expect(loadReviewDay("simple-present", 1)).toBeNull();
  });

  it("rejects practice numbers outside 1–5", () => {
    for (const bad of [0, 6, 20, -1, 1.5, "1"]) {
      expect(getReviewPractice("review-simple-present", bad)).toBeNull();
    }
  });

  it("adapts a practice to a trusted course day carrying the practice number", () => {
    const day = loadReviewDay("review-simple-present", 3);
    expect(day?.day).toBe(3);
    expect(day?.rep5Turns).toBeUndefined();
  });

  it("lists only review modules", () => {
    expect(listReviewModules().every((m) => isReviewModuleId(m.id))).toBe(true);
  });
});
