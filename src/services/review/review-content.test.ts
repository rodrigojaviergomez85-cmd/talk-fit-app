import { describe, expect, it } from "vitest";
import { getReviewModule, getReviewPractice, loadReviewDay, listReviewModules } from "./review-registry";
import { REVIEW_PRACTICE_COUNT, isReviewModuleId } from "@/lib/review-types";
import { rep2Chunks, rep4Items } from "@/lib/rep-structure";
import { reviewPracticeToCourseDay } from "./review-registry";

describe.each(listReviewModules())("Review · $title content", (mod) => {
  it("exposes exactly five complete practices", () => {
    expect(mod.practices).toHaveLength(REVIEW_PRACTICE_COUNT);
    for (const p of mod.practices) {
      expect(p.lines.length).toBeGreaterThanOrEqual(6);
      expect(p.lines.every((l) => l.chunks.length > 0)).toBe(true);
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

const WH = ["HOW OFTEN", "HOW LONG", "WHAT TIME", "WHAT", "WHERE", "WHEN", "WHY", "WHO", "HOW"];
const whOf = (q: string) => WH.find((w) => q.toUpperCase().includes(w)) ?? "";

describe.each(listReviewModules())("review step 4 questions · $title", (mod) => {
  it("shows exactly three prompts per practice, with a different WH word each", () => {
    for (const practice of mod.practices) {
      const items = rep4Items(reviewPracticeToCourseDay(practice));
      expect(items).toHaveLength(3);
      const cues = items.map((i) => whOf(i.question));
      expect(cues.every(Boolean)).toBe(true);
      expect(new Set(cues).size).toBe(3);
    }
  });

  it("covers HOW OFTEN and HOW LONG across the module", () => {
    const cues = mod.practices.flatMap((p) =>
      rep4Items(reviewPracticeToCourseDay(p)).map((i) => whOf(i.question)),
    );
    expect(cues).toContain("HOW OFTEN");
    expect(cues).toContain("HOW LONG");
  });
});

describe("Review · Comparatives Step 2 reference images", () => {
  it("provides one distinct image for every spoken chunk", () => {
    const mod = getReviewModule("review-comparatives");
    expect(mod).not.toBeNull();

    for (const practice of mod?.practices ?? []) {
      const images = practice.rep2ChunkImages ?? [];
      expect(images).toHaveLength(rep2Chunks(reviewPracticeToCourseDay(practice)).length);
      expect(new Set(images.map((image) => image.src)).size).toBe(images.length);
      expect(images.every((image) => image.alt.length > 0 && image.altEs.length > 0)).toBe(true);
    }
  });
});

describe("Review · Modal Verbs content", () => {
  it("covers every requested modal family and provides a scene for every practice", () => {
    const mod = getReviewModule("review-modals");
    expect(mod).not.toBeNull();
    const spoken = mod?.practices.flatMap((practice) => practice.lines.map((line) => line.text)).join(" ").toLowerCase() ?? "";
    for (const modal of ["can", "could", "may", "might", "should", "would", "must", "had better"]) {
      expect(spoken).toContain(modal);
    }
    expect(mod?.practices.every((practice) => Boolean(practice.sceneImage))).toBe(true);
  });
});
