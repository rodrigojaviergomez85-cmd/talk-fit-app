import { describe, it, expect } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CourseService } from "./course-service";
import { JourneyService, recordKey } from "./journey-service";
import { MODULE_INDEX, isModuleId, UPCOMING_LEVELS } from "./course-index";
import { ADVANCED_3_WEEK_1_DAYS } from "./advanced-3-course";
import { ADVANCED_3_WEEKS_2_4_DAYS } from "./advanced-3-weeks-2-4-course";
import { TakeBoard } from "@/components/fluency/TakeBoard";

const days = [...ADVANCED_3_WEEK_1_DAYS, ...ADVANCED_3_WEEKS_2_4_DAYS];

describe("ADVANCED 3 — BEYOND THE SCRIPT", () => {
  it("is registered as a real, routable module", () => {
    expect(isModuleId("advanced-3")).toBe(true);
    const card = MODULE_INDEX.find((m) => m.id === "advanced-3");
    expect(card?.title).toBe("BEYOND THE SCRIPT");
    expect(card?.family).toBe("advanced");
    expect(card?.builtWeeks).toBe(4);
    expect(card?.days).toHaveLength(20);
    expect(UPCOMING_LEVELS.some((l) => l.key === "advanced-3")).toBe(false);
  });

  it("loads 20 unique days with frozen a3d ids", async () => {
    const loaded = await CourseService.loadModule("advanced-3");
    expect(loaded.days).toHaveLength(20);
    expect(days.map((d) => d.day)).toEqual(Array.from({ length: 20 }, (_, i) => i + 1));
    const ids = new Set(days.flatMap((d) => d.lines.map((l) => l.id)));
    expect(ids.size).toBe(days.length * 8);
    for (const day of days) {
      expect(day.lines.every((l) => l.id.startsWith(`a3d${day.day}-`))).toBe(true);
    }
  });

  it("never collides with ADVANCED 1 or ADVANCED 2 ids", async () => {
    const [a1, a2] = await Promise.all([CourseService.loadModule("advanced-1"), CourseService.loadModule("advanced-2")]);
    const others = new Set([...a1.days, ...a2.days].flatMap((d) => d.lines.map((l) => l.id)));
    for (const day of days) for (const line of day.lines) expect(others.has(line.id)).toBe(false);
  });

  it("supports all 5 steps on every day, with exactly one repair moment", () => {
    for (const day of days) {
      expect(day.intro.title.length).toBeGreaterThan(0);
      expect(day.lines).toHaveLength(8);
      expect(day.rep2Chunks).toHaveLength(4);
      expect(day.prompts.length).toBeGreaterThanOrEqual(5);
      expect(day.rep5Prompt.question.length).toBeGreaterThan(0);
      expect(day.hideModelText).toBe(true);
      expect(day.modelExample).toBeUndefined();
      const turns = day.rep5Turns ?? [];
      expect(turns.length).toBeGreaterThanOrEqual(3);
      expect(turns.every((t) => t.text.length > 0 && t.es.length > 0)).toBe(true);
      expect(turns.filter((t) => t.repairTip)).toHaveLength(1);
    }
  });

  it("runs 'WHAT KIND OF ANSWER DO YOU NEED?' recognition on the checkpoint days", () => {
    const withRecognition = days.filter((d) => (d.rep5Turns ?? []).some((t) => t.recognition));
    expect(withRecognition.map((d) => d.day)).toEqual([5, 10, 15, 20]);
    for (const day of withRecognition) {
      for (const t of day.rep5Turns ?? []) {
        if (t.recognition) expect(t.recognition.prompt).toBe("WHAT KIND OF ANSWER DO YOU NEED?");
      }
    }
  });

  it("gives all 20 days a Test Ready Sprint, always optional", () => {
    expect(days.filter((d) => d.testReady)).toHaveLength(20);
    for (const day of days) {
      expect(day.testReady).toBeDefined();
      expect(day.testReadyOptional).toBe(true);
      expect(day.testReady?.items.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("reduces visible Rep 5 support from week 1 to week 4", () => {
    const cued = (week: number) =>
      days.filter((d) => d.week === week).flatMap((d) => d.rep5Turns ?? []).filter((t) => t.cues?.length).length;
    const toolboxed = (week: number) =>
      days.filter((d) => d.week === week).flatMap((d) => d.rep5Turns ?? []).filter((t) => t.toolbox?.length).length;
    expect(cued(1)).toBeGreaterThan(cued(3));
    expect(cued(3)).toBeGreaterThanOrEqual(cued(4));
    expect(toolboxed(1)).toBeGreaterThan(toolboxed(2));
    expect(toolboxed(2)).toBeGreaterThanOrEqual(toolboxed(3));
    expect(toolboxed(4)).toBe(0);
  });

  it("Day 20 is the final: five answer types, minimal support, one repair, mixed sprint", () => {
    const d20 = days.find((d) => d.day === 20)!;
    const turns = d20.rep5Turns ?? [];
    const expected = turns.map((t) => t.recognition?.expected).filter(Boolean);
    expect(new Set(expected)).toEqual(new Set(["story", "opinion", "explain", "hypothetical", "reflect"]));
    expect(turns.every((t) => !t.toolbox?.length)).toBe(true);
    expect(turns.filter((t) => t.repairTip)).toHaveLength(1);
    expect(d20.intro.titleEs).toBe("🔥 MÁS ALLÁ DEL GUION");
    expect(d20.testReady?.type).toBe("mixed");
    expect(d20.testReady?.items).toHaveLength(5);
  });

  it("shows the active questioner transcript and hides future turns", () => {
    const day = days[0]!;
    const turns = day.rep5Turns!;
    const html = renderToStaticMarkup(
      createElement(TakeBoard, {
        takes: Array(turns.length).fill(null),
        finalIndex: null,
        goalSeconds: day.goalSeconds,
        turns,
        onRecorded: () => undefined,
        onDelete: () => undefined,
        onSelectFinal: () => undefined,
      }),
    );
    expect(html).toContain(turns[0]!.text);
    expect(html).not.toContain(turns[1]!.text);
  });

  it("stays locked until the three INTERMEDIATE modules are complete, then opens the whole ADVANCED family", () => {
    const state = JourneyService.load();
    expect(JourneyService.isModuleUnlocked(state, "advanced-3")).toBe(false);

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
    expect(JourneyService.isModuleUnlocked(intermediateDone, "advanced-3")).toBe(true);
    expect(JourneyService.isModuleUnlocked(intermediateDone, "advanced-2")).toBe(true);
    expect(JourneyService.isModuleUnlocked(intermediateDone, "advanced-1")).toBe(true);
  });


  it("leaves ADVANCED 1 and ADVANCED 2 untouched", async () => {
    const [a1, a2] = await Promise.all([CourseService.loadModule("advanced-1"), CourseService.loadModule("advanced-2")]);
    expect(a1.days).toHaveLength(20);
    expect(a1.days[0]?.lines[0]?.id.startsWith("a1d")).toBe(true);
    expect(a2.days).toHaveLength(20);
    expect(a2.days[0]?.lines[0]?.id.startsWith("a2d")).toBe(true);
    expect(a2.days.filter((d) => d.testReady)).toHaveLength(20);
    expect(a2.days.every((d) => d.testReadyOptional === true)).toBe(true);
  });
});
