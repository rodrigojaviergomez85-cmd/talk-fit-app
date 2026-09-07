import { describe, expect, it } from "vitest";
import { canStartNewDay } from "./daily-completion-cap";
import type { DayRecord, JourneyState, ModuleId } from "./types";

const NOW = new Date("2026-05-10T12:00:00.000Z");

function record(moduleId: ModuleId, day: number, completedAt: string): DayRecord {
  return {
    day,
    moduleId,
    dayKey: completedAt.slice(0, 10),
    completedAt,
    finalSeconds: 30,
    firstSeconds: 20,
    practiceSeconds: 120,
    recordingsCount: 1,
  };
}

function stateWith(records: DayRecord[]): JourneyState {
  const days: Record<string, DayRecord> = {};
  for (const r of records) days[`${r.moduleId}:${r.day}`] = r;
  return {
    days,
    streakDays: 0,
    totalRepsCompleted: 0,
    totalSpeakingSeconds: 0,
    weekSeconds: {},
  };
}

const hoursAgo = (h: number) => new Date(NOW.getTime() - h * 3600000).toISOString();

describe("daily completion cap", () => {
  it("empty state → allowed", () => {
    expect(canStartNewDay(stateWith([]), "simple-present", 1, NOW)).toEqual({ allowed: true });
  });

  it("1 recent new day → allowed", () => {
    const state = stateWith([record("simple-present", 1, hoursAgo(3))]);
    expect(canStartNewDay(state, "simple-present", 2, NOW)).toEqual({ allowed: true });
  });

  it("2 recent new days, asking for a 3rd NEW day → blocked with oldest + 24h", () => {
    const oldest = hoursAgo(5);
    const state = stateWith([
      record("simple-present", 1, oldest),
      record("simple-present", 2, hoursAgo(2)),
    ]);
    const result = canStartNewDay(state, "simple-present", 3, NOW);
    expect(result.allowed).toBe(false);
    if (result.allowed) return;
    expect(result.completedToday).toBe(2);
    expect(result.nextAvailableAt).toBe(new Date(new Date(oldest).getTime() + 24 * 3600000).toISOString());
  });

  it("2 recent new days, asking to REPEAT one of them → allowed", () => {
    const state = stateWith([
      record("simple-present", 1, hoursAgo(5)),
      record("simple-present", 2, hoursAgo(2)),
    ]);
    expect(canStartNewDay(state, "simple-present", 2, NOW)).toEqual({ allowed: true });
  });

  it("2 days completed 25 hours ago → allowed", () => {
    const state = stateWith([
      record("simple-present", 1, hoursAgo(25)),
      record("simple-present", 2, hoursAgo(25)),
    ]);
    expect(canStartNewDay(state, "simple-present", 3, NOW)).toEqual({ allowed: true });
  });

  it("exactly at the 24h boundary → allowed (strict > cutoff)", () => {
    const state = stateWith([
      record("simple-present", 1, hoursAgo(24)),
      record("simple-present", 2, hoursAgo(24)),
    ]);
    expect(canStartNewDay(state, "simple-present", 3, NOW)).toEqual({ allowed: true });
  });
});
