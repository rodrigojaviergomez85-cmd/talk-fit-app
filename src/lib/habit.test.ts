import { describe, expect, it } from "vitest";
import { habitDatesOf, streakFrom } from "@/services/journey-service";
import type { DayRecord, JourneyState } from "@/lib/types";

function key(offsetDays: number): string {
  const d = new Date();
  d.setDate(d.getDate() - offsetDays);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function record(day: number, dayKey: string): DayRecord {
  return {
    day,
    moduleId: "basic-zero",
    dayKey,
    completedAt: new Date().toISOString(),
    finalSeconds: 30,
    firstSeconds: 20,
    practiceSeconds: 300,
    recordingsCount: 3,
    sentenceCount: null,
    finalUrl: null,
    firstUrl: null,
  } as DayRecord;
}

function state(days: DayRecord[], extra: Partial<JourneyState> = {}): JourneyState {
  return {
    days: Object.fromEntries(days.map((r) => [`${r.moduleId}:${r.day}`, r])),
    streakDays: 0,
    totalRepsCompleted: 0,
    totalSpeakingSeconds: 0,
    weekSeconds: {},
    ...extra,
  };
}

describe("66-day habit = unique calendar dates", () => {
  it("A: 8 curriculum days on one date = 1 habit day", () => {
    const s = state(Array.from({ length: 8 }, (_, i) => record(i + 1, key(0))));
    expect(Object.keys(s.days).length).toBe(8);
    expect(habitDatesOf(s).length).toBe(1);
  });

  it("B: 8 yesterday + 8 today = 16 curriculum / 2 habit / streak 2", () => {
    const s = state([
      ...Array.from({ length: 8 }, (_, i) => record(i + 1, key(1))),
      ...Array.from({ length: 8 }, (_, i) => record(i + 9, key(0))),
    ]);
    expect(Object.keys(s.days).length).toBe(16);
    const dates = habitDatesOf(s);
    expect(dates.length).toBe(2);
    expect(streakFrom(dates)).toBe(2);
  });

  it("C/E: same date completions never add a second habit day", () => {
    const s = state([record(5, key(0)), record(6, key(0))], { habitDates: [key(0)], pendingHabitDates: [key(0)] });
    expect(habitDatesOf(s).length).toBe(1);
  });

  it("D: repeating an old day on a new date adds one habit day", () => {
    const s = state([record(5, key(7))], { habitDates: [key(7), key(0)] });
    expect(habitDatesOf(s)).toEqual([key(7), key(0)]);
  });

  it("G: pending offline date keeps its original date", () => {
    const s = state([], { pendingHabitDates: [key(1)] });
    expect(habitDatesOf(s)).toEqual([key(1)]);
  });

  it("streak resets after a gap while habit days stay", () => {
    const dates = [key(5), key(4), key(3)];
    expect(streakFrom(dates)).toBe(0);
    expect(habitDatesOf(state([], { habitDates: dates })).length).toBe(3);
  });
});
