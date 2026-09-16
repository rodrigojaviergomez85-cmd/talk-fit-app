import { afterEach, describe, expect, it, vi } from "vitest";
import type { JourneyState, ModuleId } from "@/lib/types";
import { JourneyService } from "./journey-service";
import { defaultPreferences } from "./preferences";

function makeState(daysByModule: Partial<Record<ModuleId, number[]>>): JourneyState {
  const days: JourneyState["days"] = {};
  for (const [moduleId, days_] of Object.entries(daysByModule)) {
    for (const day of days_ ?? []) {
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

const range = (from: number, to: number) => Array.from({ length: to - from + 1 }, (_, i) => from + i);

/** Simulate saved preferences (placement) for the guest scope. */
function stubPreferences(partial: Partial<typeof defaultPreferences>) {
  const store: Record<string, string> = {
    "fluency-reps:prefs:v1:guest": JSON.stringify({ ...defaultPreferences, ...partial }),
  };
  vi.stubGlobal("window", {
    localStorage: {
      getItem: (k: string) => store[k] ?? null,
      setItem: (k: string, v: string) => {
        store[k] = v;
      },
      removeItem: (k: string) => {
        delete store[k];
      },
    },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("moduleComplete respects the learner's starting point", () => {
  it("still requires all 20 days for a learner who started on day 1", () => {
    expect(JourneyService.moduleComplete(makeState({ sharks: range(1, 19) }), "sharks")).toBe(false);
    expect(JourneyService.moduleComplete(makeState({ sharks: range(1, 20) }), "sharks")).toBe(true);
  });

  it("treats days before the self-placed start week as satisfied", () => {
    stubPreferences({ initialPlacementModuleId: "sharks", currentModuleId: "sharks", startWeek: 4 });
    // Placed in week 4: only days 16–20 were ever assigned.
    expect(JourneyService.moduleComplete(makeState({ sharks: range(16, 19) }), "sharks")).toBe(false);
    expect(JourneyService.moduleComplete(makeState({ sharks: range(16, 20) }), "sharks")).toBe(true);
  });

  it("uses the first recorded day as the start when there is no direct placement", () => {
    // Learner placed in EAGLES week 1, progressed naturally into SHARKS but a
    // legacy gap left days 1–3 without records; they started at day 4.
    const state = makeState({ sharks: [...range(4, 20)] });
    expect(JourneyService.moduleComplete(state, "sharks")).toBe(true);
  });

  it("still counts mid-module gaps as pending", () => {
    const days = range(1, 20).filter((d) => d !== 10);
    expect(JourneyService.moduleComplete(makeState({ sharks: days }), "sharks")).toBe(false);
  });

  it("unlocks Advanced once the three intermediates are complete from their start points", () => {
    stubPreferences({ initialPlacementModuleId: "sharks", currentModuleId: "sharks", startWeek: 4 });
    const state = makeState({
      "eagles-week-1": range(1, 20),
      tigers: range(1, 20),
      sharks: range(16, 20),
    });
    expect(JourneyService.isModuleUnlocked(state, "advanced-1")).toBe(true);
    expect(JourneyService.isModuleUnlocked(state, "advanced-2")).toBe(true);
    expect(JourneyService.isModuleUnlocked(state, "advanced-3")).toBe(true);
  });

  it("keeps Advanced locked while any intermediate is incomplete", () => {
    stubPreferences({ initialPlacementModuleId: "sharks", currentModuleId: "sharks", startWeek: 4 });
    const state = makeState({
      "eagles-week-1": range(1, 20),
      tigers: range(1, 20),
      sharks: range(16, 19),
    });
    expect(JourneyService.isModuleUnlocked(state, "advanced-1")).toBe(false);
  });

  it("opens the three Advanced modules when the saved level is any of them", () => {
    // Placed straight into GET HIRED: HANDLE & SELL and THINK FAST are parallel
    // entry points, not a ladder, so all three must be reachable.
    stubPreferences({ initialPlacementModuleId: "advanced-1", currentModuleId: "advanced-1", startWeek: 1 });
    const state = makeState({});
    expect(JourneyService.isModuleUnlocked(state, "advanced-1")).toBe(true);
    expect(JourneyService.isModuleUnlocked(state, "advanced-2")).toBe(true);
    expect(JourneyService.isModuleUnlocked(state, "advanced-3")).toBe(true);
  });

  it("keeps Advanced locked for a learner saved in a lower level", () => {
    stubPreferences({ initialPlacementModuleId: "basic-zero", currentModuleId: "basic-zero", startWeek: 1 });
    const state = makeState({});
    expect(JourneyService.isModuleUnlocked(state, "advanced-1")).toBe(false);
    expect(JourneyService.isModuleUnlocked(state, "advanced-3")).toBe(false);
  });
});
