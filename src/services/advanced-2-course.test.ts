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

  it("gives all 20 days a Test Ready Sprint, always optional", () => {
    expect(days.filter((d) => d.testReady)).toHaveLength(20);
    for (const day of days) {
      expect(day.testReady).toBeDefined();
      expect(day.testReadyOptional).toBe(true);
      expect(day.testReady?.items.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("Day 15 is Virtual Assistant schedule-conflict training", () => {
    const d15 = days.find((d) => d.day === 15)!;
    expect(d15.intro.title).toBe("MANAGE A SCHEDULE CONFLICT");
    expect(d15.intro.titleEs).toBe("MANEJA UN CONFLICTO DE AGENDA");
    expect(d15.cues).toEqual(["NEED", "CONFLICT", "OPTIONS", "CONFIRM"]);
    expect(d15.lines).toHaveLength(8);
    const script = (d15.rep5Turns ?? []).map((t) => t.text).join(" ");
    expect(script).toContain("Move my meeting with David to tomorrow afternoon.");
    expect(script).toContain("David isn't available tomorrow.");
    expect(script).toContain("Friday morning");
    expect((d15.rep5Turns ?? []).filter((t) => t.recognition).length).toBeGreaterThanOrEqual(1);
    expect(d15.testReady?.type).toBe("mixed");
  });

  it("Day 20 mixes customer service, tech support, sales and virtual assistant", () => {
    const d20 = days.find((d) => d.day === 20)!;
    const turns = d20.rep5Turns ?? [];
    const script = turns.map((t) => t.text).join(" ");
    expect(script).toContain("charged twice");
    expect(script).toContain("internet stopped working");
    expect(script).toContain("competitor is cheaper");
    expect(script).toContain("meeting with David");
    // Recognition before selected scenario switches only — never before every turn.
    const recognitions = turns.filter((t) => t.recognition).length;
    expect(recognitions).toBeGreaterThanOrEqual(3);
    expect(recognitions).toBeLessThan(turns.length);
    // Week 4 stays low support: no full toolboxes on the final day.
    expect(turns.every((t) => !t.toolbox?.length)).toBe(true);
    expect(turns.filter((t) => t.repairTip)).toHaveLength(1);
    expect(d20.testReady?.items).toHaveLength(5);
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

  it("stays locked until the three INTERMEDIATE modules are complete, then never requires ADVANCED 1", () => {
    const state = JourneyService.load();
    expect(JourneyService.isModuleUnlocked(state, "advanced-2")).toBe(false);

    const days: Record<string, unknown> = {};
    for (const moduleId of ["eagles-week-1", "tigers", "sharks"] as const) {
      for (let day = 1; day <= CourseService.totalDays(moduleId); day += 1) {
        days[recordKey(moduleId, day)] = {
          moduleId,
          day,
          completedAt: new Date().toISOString(),
          dayKey: "2026-01-01",
          practiceSeconds: 60,
          finalSeconds: 60,
          firstSeconds: 60,
          recordingsCount: 1,
        };
      }
    }
    const intermediateDone = { ...state, days } as typeof state;
    expect(JourneyService.isModuleUnlocked(intermediateDone, "advanced-2")).toBe(true);
    expect(JourneyService.isModuleUnlocked(intermediateDone, "advanced-1")).toBe(true);
  });


  it("leaves ADVANCED 1 untouched", async () => {
    const a1 = await CourseService.loadModule("advanced-1");
    expect(a1.days).toHaveLength(20);
    expect(a1.days[0]?.lines[0]?.id.startsWith("a1d")).toBe(true);
  });
});
