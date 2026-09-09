import { beforeEach, describe, expect, it } from "vitest";
import {
  last7PracticeDays,
  last7SpeakingSeconds,
  speakingTimeLabel,
} from "@/lib/progress-last7";
import { emptyJourney, JourneyService } from "@/services/journey-service";

function dayKeyAt(daysAgo: number): string {
  return JourneyService.dayKey(new Date(Date.now() - daysAgo * 86400000));
}

beforeEach(() => {
  localStorage.clear();
});

describe("last7PracticeDays", () => {
  it("counts distinct dates inside the last 7 days, weekends included", () => {
    const state = {
      ...emptyJourney,
      habitDates: [dayKeyAt(0), dayKeyAt(6), dayKeyAt(8)],
      pendingHabitDates: [],
    };
    expect(last7PracticeDays(state)).toBe(2);
  });

  it("never counts the same date twice", () => {
    const today = dayKeyAt(0);
    const state = {
      ...emptyJourney,
      habitDates: [today],
      pendingHabitDates: [],
    };
    expect(last7PracticeDays(state)).toBe(1);
  });

  it("returns 0 with no activity", () => {
    expect(last7PracticeDays(emptyJourney)).toBe(0);
  });
});

describe("last7SpeakingSeconds", () => {
  it("sums only the last 7 days of weekSeconds", () => {
    const state = {
      ...emptyJourney,
      weekSeconds: { [dayKeyAt(1)]: 90, [dayKeyAt(10)]: 600 },
    };
    expect(last7SpeakingSeconds(state)).toBe(90);
  });
});

describe("speakingTimeLabel", () => {
  it("is 'none' without any practice", () => {
    expect(speakingTimeLabel(emptyJourney).kind).toBe("none");
  });

  it("is 'zero' when practice exists but no time recorded", () => {
    const state = {
      ...emptyJourney,
      habitDates: [dayKeyAt(0)],
      pendingHabitDates: [],
      weekSeconds: {},
    };
    expect(speakingTimeLabel(state).kind).toBe("zero");
  });

  it("is 'under1' for 1–59 real seconds", () => {
    const state = {
      ...emptyJourney,
      habitDates: [dayKeyAt(0)],
      pendingHabitDates: [],
      weekSeconds: { [dayKeyAt(0)]: 45 },
    };
    expect(speakingTimeLabel(state).kind).toBe("under1");
  });

  it("returns whole minutes for 60+ seconds", () => {
    const state = {
      ...emptyJourney,
      habitDates: [dayKeyAt(0)],
      pendingHabitDates: [],
      weekSeconds: { [dayKeyAt(0)]: 150 },
    };
    expect(speakingTimeLabel(state)).toEqual({ kind: "minutes", minutes: 3 });
  });
});
