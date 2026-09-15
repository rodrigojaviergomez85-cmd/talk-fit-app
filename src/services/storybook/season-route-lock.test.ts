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

describe("the story catalogue is open to every learner", () => {
  it("opens future seasons too", () => {
    const state = makeState({ "basic-zero": 3 });
    expect(isSeasonUnlocked(state, "mixed-tenses")).toBe(true);
    expect(isDayUnlocked(state, "mixed-tenses", 1)).toBe(true);
    expect(unlockedDayInModule(state, "mixed-tenses")).toBeGreaterThan(0);
  });

  it("keeps every episode of the current season open", () => {
    const state = makeState({ "basic-zero": 3 });
    expect(isDayUnlocked(state, "basic-zero", 1)).toBe(true);
    expect(isDayUnlocked(state, "basic-zero", 5)).toBe(true);
    expect(isDayUnlocked(state, "basic-zero", 20)).toBe(true);
  });

  it("never closes old episodes behind the learner", () => {
    const state = makeState({ "basic-zero": 20, "simple-future": 2 });
    expect(isDayUnlocked(state, "basic-zero", 1)).toBe(true);
    expect(isDayUnlocked(state, "simple-future", 20)).toBe(true);
  });

  it("opens everything for a brand new learner", () => {
    const state = makeState({});
    expect(isDayUnlocked(state, "basic-zero", 1)).toBe(true);
    expect(isDayUnlocked(state, "basic-zero", 2)).toBe(true);
  });

  it("rejects days that do not exist in a season", () => {
    const state = makeState({});
    expect(isDayUnlocked(state, "basic-zero", 99)).toBe(false);
  });

  it("chains to the next produced episode across seasons", () => {
    const last = STORYBOOK_SEASONS[0]!.slots.filter((s) => s.episodeId).at(-1)!;
    const next = getNextProducedEpisodeId(last.episodeId!);
    expect(next).toBeTruthy();
    expect(next).not.toBe(last.episodeId);
  });
});
