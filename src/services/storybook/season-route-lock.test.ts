import { describe, it, expect } from "vitest";
import type { JourneyState, ModuleId } from "@/lib/types";
import { isDayUnlocked, isSeasonUnlocked, unlockedDayInModule } from "./seasons";

function makeState(completed: Partial<Record<ModuleId, number>>): JourneyState {
  const days: JourneyState["days"] = {};
  for (const [moduleId, count] of Object.entries(completed)) {
    for (let day = 1; day <= (count ?? 0); day += 1) {
      days[`${moduleId}:${day}`] = {
        moduleId: moduleId as ModuleId,
        day,
        completedAt: new Date().toISOString(),
        dayKey: "2026-01-01",
        practiceSeconds: 60,
        finalSeconds: 60,
        firstSeconds: 60,
        recordingsCount: 1,
      } as JourneyState["days"][string];
    }
  }
  return { days, streakDays: 0, totalRepsCompleted: 0, totalSpeakingSeconds: 0, weekSeconds: {} };
}

describe("story unlocking follows the official route", () => {
  it("keeps future seasons fully locked", () => {
    const state = makeState({ "basic-zero": 3 });
    expect(isSeasonUnlocked(state, "mixed-tenses")).toBe(false);
    expect(isDayUnlocked(state, "mixed-tenses", 1)).toBe(false);
    expect(unlockedDayInModule(state, "mixed-tenses")).toBe(0);
  });

  it("opens the current season only up to the day the learner reached", () => {
    const state = makeState({ "basic-zero": 3 });
    expect(isDayUnlocked(state, "basic-zero", 3)).toBe(true);
    expect(isDayUnlocked(state, "basic-zero", 4)).toBe(true);
    expect(isDayUnlocked(state, "basic-zero", 5)).toBe(false);
  });

  it("keeps only the last three episodes open for review", () => {
    const state = makeState({ "basic-zero": 10 });
    expect(isDayUnlocked(state, "basic-zero", 11)).toBe(true);
    expect(isDayUnlocked(state, "basic-zero", 10)).toBe(true);
    expect(isDayUnlocked(state, "basic-zero", 8)).toBe(true);
    expect(isDayUnlocked(state, "basic-zero", 7)).toBe(false);
    expect(isDayUnlocked(state, "basic-zero", 1)).toBe(false);
  });

  it("lets the review window cross back into the finished season", () => {
    const state = makeState({ "basic-zero": 20, "simple-future": 2 });
    expect(isDayUnlocked(state, "simple-future", 3)).toBe(true);
    expect(isDayUnlocked(state, "simple-future", 4)).toBe(false);
    expect(isSeasonUnlocked(state, "simple-future")).toBe(true);
    expect(isDayUnlocked(state, "basic-zero", 20)).toBe(true);
    expect(isDayUnlocked(state, "basic-zero", 16)).toBe(false);
  });

  it("opens only the first episode for a brand new learner", () => {
    const state = makeState({});
    expect(isDayUnlocked(state, "basic-zero", 1)).toBe(true);
    expect(isDayUnlocked(state, "basic-zero", 2)).toBe(false);
  });
});
