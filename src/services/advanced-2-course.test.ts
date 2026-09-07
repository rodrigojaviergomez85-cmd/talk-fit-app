import { describe, it, expect } from "vitest";
import { CourseService } from "./course-service";
import { JourneyService } from "./journey-service";
import { MODULE_INDEX, isModuleId, UPCOMING_LEVELS } from "./course-index";
import { ADVANCED_2_WEEK_1_DAYS } from "./advanced-2-course";
import { ADVANCED_2_WEEKS_2_4_DAYS } from "./advanced-2-weeks-2-4-course";

const days = [...ADVANCED_2_WEEK_1_DAYS, ...ADVANCED_2_WEEKS_2_4_DAYS];

describe("ADVANCED 2 — DO THE JOB", () => {
  it("is registered as a real, routable module", () => {
    expect(isModuleId("advanced-2")).toBe(true);
    const card = MODULE_INDEX.find((m) => m.id === "advanced-2");
    expect(card?.title).toBe("DO THE JOB");
    expect(card?.family).toBe("advanced");
    expect(card?.days).toHaveLength(20);
    expect(UPCOMING_LEVELS.some((l) => l.key === "advanced-2")).toBe(false);
  });

  it("loads 20 unique days with frozen a2d ids", async () => {
    const loaded = await CourseService.loadModule("advanced-2");
    expect(loaded.days).toHaveLength(20);
    expect(days.map((d) => d.day)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
    const ids = new Set(days.flatMap((d) => d.lines.map((l) => l.id)));
    expect(ids.size).toBe(days.length * 8);
    for (const day of days) {
      expect(day.lines.every((l) => l.id.startsWith(`a2d${day.day}-`))).toBe(true);
    }
  });

  it("supports all 5 steps on every day", () => {
    for (const day of days) {
      expect(day.intro.title.length).toBeGreaterThan(0);
      expect(day.lines).toHaveLength(8);
      expect(day.rep2Chunks).toHaveLength(4);
      expect(day.prompts.length).toBeGreaterThanOrEqual(5);
      expect(day.rep5Prompt.question.length).toBeGreaterThan(0);
      expect(day.hideModelText).toBe(true);
      expect(day.modelExample).toBeUndefined();
    }
  });

  it("uses fixed prewritten Pressure Round turns with exactly one repair moment", () => {
    for (const day of days) {
      const turns = day.rep5Turns ?? [];
      expect(turns.length).toBeGreaterThanOrEqual(3);
      expect(turns.every((t) => t.text.length > 0 && t.es.length > 0)).toBe(true);
      expect(turns.filter((t) => t.repairTip).length).toBe(1);
    }
  });

  it("runs recognition training on the checkpoint days only", () => {
    const withRecognition = days.filter((d) => (d.rep5Turns ?? []).some((t) => t.recognition));
    expect(withRecognition.map((d) => d.day)).toEqual([5, 10, 15, 20]);
  });

  it("keeps every Test Ready Sprint optional", () => {
    for (const day of days.filter((d) => d.testReady)) {
      expect(day.testReadyOptional).toBe(true);
    }
    expect(days.filter((d) => d.testReady).length).toBeGreaterThanOrEqual(8);
  });

  it("reduces visible support from week 1 to week 4", () => {
    const cued = (week: number) =>
      days
        .filter((d) => d.week === week)
        .flatMap((d) => d.rep5Turns ?? [])
        .filter((t) => t.cues?.length).length;
    expect(cued(1)).toBeGreaterThan(cued(3));
    expect(cued(3)).toBeGreaterThanOrEqual(cued(4));
  });

  it("never requires ADVANCED 1 (cyclical advanced family)", () => {
    const state = JourneyService.load();
    const sharksDone = {
      ...state,
      days: Object.fromEntries(
        CourseService.getDays("sharks").map((d) => [
          `sharks-${d.day}`,
          { moduleId: "sharks" as const, day: d.day, completedAt: new Date().toISOString(), practiceSeconds: 60 },
        ]),
      ),
    };
    expect(JourneyService.isModuleUnlocked(sharksDone, "advanced-2")).toBe(true);
    expect(JourneyService.isModuleUnlocked(sharksDone, "advanced-1")).toBe(true);
  });

  it("leaves ADVANCED 1 untouched", async () => {
    const a1 = await CourseService.loadModule("advanced-1");
    expect(a1.days).toHaveLength(20);
    expect(a1.days[0]?.lines[0]?.id.startsWith("a1d")).toBe(true);
  });
});
