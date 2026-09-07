import { beforeEach, describe, expect, it } from "vitest";

// Minimal browser storage stub: JourneyService is local-first by design.
const store = new Map<string, string>();
(globalThis as unknown as { window: unknown }).window = {
  localStorage: {
    getItem: (k: string) => store.get(k) ?? null,
    setItem: (k: string, v: string) => void store.set(k, v),
    removeItem: (k: string) => void store.delete(k),
    clear: () => store.clear(),
    key: (i: number) => [...store.keys()][i] ?? null,
    get length() {
      return store.size;
    },
  },
};
import { JourneyService } from "@/services/journey-service";

/**
 * Repeating a completed day is PRACTICE, not PROGRESS:
 * the first completion is preserved, the latest repeat is kept beside it,
 * speaking time grows, curriculum position does not.
 */
const input = {
  moduleId: "simple-present" as const,
  day: 1,
  finalSeconds: 30,
  firstSeconds: 20,
  practiceSeconds: 200,
  recordingsCount: 3,
};

describe("repeat practice vs course progress", () => {
  beforeEach(() => {
    window.localStorage.clear();
    JourneyService.clearLocalCache?.();
    window.localStorage.clear();
  });

  it("first completion writes the day record and advances progress", () => {
    const state = JourneyService.completeDay(input);
    const record = state.days["simple-present:1"]!;
    expect(record.practiceCount).toBe(1);
    expect(record.latestPractice ?? null).toBeNull();
    expect(state.totalRepsCompleted).toBe(5);
    expect(state.totalSpeakingSeconds).toBe(200);
  });

  it("repeat preserves the first completion and stores only the latest repeat", () => {
    const first = JourneyService.completeDay(input);
    const firstCompletedAt = first.days["simple-present:1"]!.completedAt;

    JourneyService.completeDay({ ...input, finalSeconds: 44, practiceSeconds: 150 });
    const state = JourneyService.completeDay({ ...input, finalSeconds: 55, practiceSeconds: 100 });
    const record = state.days["simple-present:1"]!;

    // First completion untouched.
    expect(record.completedAt).toBe(firstCompletedAt);
    expect(record.finalSeconds).toBe(30);
    // Only the most recent repeat is kept.
    expect(record.latestPractice?.finalSeconds).toBe(55);
    expect(record.practiceCount).toBe(3);
  });

  it("repeats add speaking time but never another curriculum day", () => {
    JourneyService.completeDay(input);
    const state = JourneyService.completeDay({ ...input, practiceSeconds: 100 });
    expect(Object.keys(state.days)).toHaveLength(1);
    expect(state.totalRepsCompleted).toBe(5);
    expect(state.totalSpeakingSeconds).toBe(300);
  });
});
