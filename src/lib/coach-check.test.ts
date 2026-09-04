import { describe, expect, it } from "vitest";
import { groupByDayKey, practicesOn, recentDayKeys, toDayKey } from "./coach-check";
import type { DayRecord } from "./types";

function rec(moduleId: DayRecord["moduleId"], day: number, dayKey: string, completedAt: string): DayRecord {
  return {
    day,
    moduleId,
    dayKey,
    completedAt,
    finalSeconds: 40,
    firstSeconds: 0,
    practiceSeconds: 100,
    recordingsCount: 4,
  };
}

describe("coach check", () => {
  it("builds recent keys newest first from local dates", () => {
    const now = new Date(2026, 8, 4, 15, 0);
    expect(recentDayKeys(3, now)).toEqual(["2026-09-04", "2026-09-03", "2026-09-02"]);
    expect(toDayKey(now)).toBe("2026-09-04");
  });

  it("groups multiple curriculum days completed on one calendar date, sorted by time", () => {
    const records = [
      rec("simple-present", 7, "2026-09-01", "2026-09-02T00:14:00.000Z"),
      rec("simple-present", 5, "2026-09-01", "2026-09-01T22:20:00.000Z"),
      rec("simple-present", 6, "2026-09-01", "2026-09-01T23:05:00.000Z"),
      rec("simple-present", 8, "2026-09-02", "2026-09-02T20:00:00.000Z"),
    ];
    const groups = groupByDayKey(records);
    expect(groups.get("2026-09-01")?.map((r) => r.day)).toEqual([5, 6, 7]);
    expect(groups.get("2026-09-02")?.map((r) => r.day)).toEqual([8]);
  });

  it("returns nothing for a date with no completion instead of the nearest one", () => {
    const records = [rec("simple-present", 5, "2026-09-01", "2026-09-01T22:20:00.000Z")];
    expect(practicesOn(records, "2026-09-02")).toEqual([]);
    expect(practicesOn(records, "2026-08-31")).toEqual([]);
  });

  it("falls back to the local date of completedAt when dayKey is missing", () => {
    const local = new Date(2026, 8, 1, 21, 30);
    const records = [rec("simple-present", 5, "", local.toISOString())];
    expect(practicesOn(records, "2026-09-01")).toHaveLength(1);
  });
});
