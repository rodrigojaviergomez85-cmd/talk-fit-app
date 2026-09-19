import { describe, expect, it } from "vitest";
import { buildActivationReminder, buildDayReminder, dayOfYear, dayUrl } from "@/lib/reminder-messages";
import { localNow, parseTimeLocal, streakFrom, windowFor } from "@/lib/reminder-window";

const ctx = { day: 7, moduleName: "BASIC ZERO", topic: "My routine", topicEs: "Mi rutina", streak: 4 };

describe("reminder copy", () => {
  it("splits title and body and fills the day", () => {
    const m = buildDayReminder("first", 0, "es", ctx, dayUrl("basic-zero", 7));
    expect(m.title).toBe("Hora de practicar");
    expect(m.body).toBe("Día 7 de BASIC ZERO: Mi rutina. 15 minutos y listo.");
    expect(m.url).toBe("/day/basic-zero/7");
  });

  it("rotates over five variants", () => {
    const titles = new Set([0, 1, 2, 3, 4].map((v) => buildDayReminder("first", v, "en", ctx, "/x").title));
    expect(titles.size).toBe(5);
  });

  it("never names a zero streak in the second reminder", () => {
    for (const v of [0, 1, 2, 3, 4]) {
      const m = buildDayReminder("second", v, "es", { ...ctx, streak: 0 }, "/x");
      expect(`${m.title} ${m.body}`).not.toContain("0 días");
      expect(`${m.title} ${m.body}`).not.toContain("racha de 0");
    }
  });

  it("keeps the streak line when there is a streak", () => {
    const m = buildDayReminder("second", 0, "es", ctx, "/x");
    expect(m.body).toContain("4 días");
  });

  it("builds the activation nudge in both languages", () => {
    expect(buildActivationReminder("es", "BASIC ZERO", "/day/basic-zero/1").title).toBe(
      "Tu primer audio toma 5 minutos",
    );
    expect(buildActivationReminder("en", "BASIC ZERO", "/day/basic-zero/1").title).toBe(
      "Your first audio takes 5 minutes",
    );
  });

  it("day of year is stable", () => {
    expect(dayOfYear(new Date("2026-01-01T00:00:00Z"))).toBe(1);
  });
});

describe("reminder windows", () => {
  it("reads local time in the learner's timezone", () => {
    const local = localNow("America/El_Salvador", new Date("2026-03-04T01:30:00Z"));
    expect(local.date).toBe("2026-03-03");
    expect(local.weekday).toBe(2);
    expect(local.minutes).toBe(19 * 60 + 30);
  });

  it("fires once inside the 5 minute margin", () => {
    const schedule = { timeLocal: "19:00", days: [1, 2, 3, 4, 5] };
    expect(windowFor(schedule, { date: "2026-03-03", weekday: 2, minutes: 19 * 60 })).toBe("first");
    expect(windowFor(schedule, { date: "2026-03-03", weekday: 2, minutes: 19 * 60 + 4 })).toBe("first");
    expect(windowFor(schedule, { date: "2026-03-03", weekday: 2, minutes: 19 * 60 + 5 })).toBeNull();
    expect(windowFor(schedule, { date: "2026-03-03", weekday: 2, minutes: 21 * 60 + 2 })).toBe("second");
  });

  it("never fires on a day the learner did not choose", () => {
    const schedule = { timeLocal: "19:00", days: [1, 2, 3, 4, 5] };
    expect(windowFor(schedule, { date: "2026-03-07", weekday: 6, minutes: 19 * 60 })).toBeNull();
  });

  it("rejects a malformed time", () => {
    expect(parseTimeLocal("25:00")).toBeNull();
    expect(parseTimeLocal("07:30")).toBe(450);
  });

  it("counts consecutive practice days", () => {
    expect(streakFrom(["2026-03-03", "2026-03-02", "2026-03-01"], "2026-03-03")).toBe(3);
    expect(streakFrom(["2026-03-02", "2026-03-01"], "2026-03-03")).toBe(2);
    expect(streakFrom(["2026-02-28"], "2026-03-03")).toBe(0);
    expect(streakFrom([], "2026-03-03")).toBe(0);
  });
});
