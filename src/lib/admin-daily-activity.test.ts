import { describe, expect, it } from "vitest";
import {
  addDays,
  addMonths,
  dateToKey,
  daysBetween,
  keyToDate,
  MAX_RANGE_DAYS,
  monthBounds,
  normalizeCustomRange,
  rangeLabel,
  resolveRange,
  summarize,
  type DailyActivityDay,
} from "./admin-daily-activity";

const zero = { users: 0, count: 0 };
function day(key: string, active: number, practice = 0, review = 0): DailyActivityDay {
  return {
    day: key,
    active_users: active,
    new_users: 0,
    practice: { users: practice ? 1 : 0, count: practice },
    story: zero,
    interview: zero,
    review: { users: review ? 1 : 0, count: review },
    coach: zero,
  };
}

describe("admin daily activity helpers", () => {
  it("adds days across month boundaries", () => {
    expect(addDays("2026-09-01", -1)).toBe("2026-08-31");
    expect(addDays("2026-02-28", 1)).toBe("2026-03-01");
  });

  it("computes month bounds", () => {
    expect(monthBounds("2026-09-10")).toEqual({ from: "2026-09-01", to: "2026-09-30" });
    expect(monthBounds("2026-02-01")).toEqual({ from: "2026-02-01", to: "2026-02-28" });
  });

  it("shifts month anchors", () => {
    expect(addMonths("2026-01", -1)).toBe("2025-12");
    expect(addMonths("2026-12", 1)).toBe("2027-01");
  });

  it("resolves fixed-day ranges ending today", () => {
    expect(resolveRange("7", "2026-09-01", "2026-09-16")).toEqual({ from: "2026-09-10", to: "2026-09-16" });
    expect(resolveRange("30", "2026-09-01", "2026-09-16")).toEqual({ from: "2026-08-18", to: "2026-09-16" });
  });

  it("clamps the current month to today", () => {
    expect(resolveRange("month", "2026-09", "2026-09-16")).toEqual({ from: "2026-09-01", to: "2026-09-16" });
    expect(resolveRange("month", "2026-08", "2026-09-16")).toEqual({ from: "2026-08-01", to: "2026-08-31" });
  });

  it("summarizes a range", () => {
    const s = summarize([day("2026-09-14", 10, 20, 2), day("2026-09-15", 30, 40), day("2026-09-16", 0)]);
    expect(s.avgActive).toBe(13.3);
    expect(s.bestDay?.day).toBe("2026-09-15");
    expect(s.daysWithActivity).toBe(2);
    expect(s.totalPractices).toBe(62);
  });

  it("handles an empty range", () => {
    expect(summarize([])).toEqual({ avgActive: null, bestDay: null, daysWithActivity: 0, totalPractices: 0 });
  });
});

describe("custom range helpers", () => {
  it("counts inclusive days", () => {
    expect(daysBetween("2026-09-01", "2026-09-15")).toBe(15);
    expect(daysBetween("2026-09-01", "2026-09-01")).toBe(1);
  });

  it("orders reversed picks and clamps long spans", () => {
    expect(normalizeCustomRange("2026-09-15", "2026-09-01")).toEqual({ from: "2026-09-01", to: "2026-09-15" });
    const clamped = normalizeCustomRange("2020-01-01", "2026-09-15");
    expect(daysBetween(clamped.from, clamped.to)).toBe(MAX_RANGE_DAYS);
    expect(clamped.to).toBe("2026-09-15");
  });

  it("formats the picked period and converts keys", () => {
    expect(rangeLabel("2026-09-01", "2026-09-15", "es")).toContain("2026");
    expect(dateToKey(keyToDate("2026-09-05"))).toBe("2026-09-05");
  });
});
