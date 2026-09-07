import { describe, expect, it } from "vitest";
import {
  DAILY_PRACTICE_CAP,
  canStartPractice,
  practicesToday,
  todaysPracticeLog,
  type PracticeAttempt,
} from "./practice-cap";
import type { ModuleId } from "./types";

const TODAY = "2026-05-10";
const YESTERDAY = "2026-05-09";

let n = 0;
function attempt(over: Partial<PracticeAttempt> = {}): PracticeAttempt {
  n += 1;
  return {
    id: `a${n}`,
    userId: "u1",
    moduleId: "simple-present" as ModuleId,
    day: 1,
    localDayKey: TODAY,
    startedAt: `2026-05-10T0${n}:00:00.000Z`,
    firstRecordingAt: `2026-05-10T0${n}:01:00.000Z`,
    completedAt: `2026-05-10T0${n}:20:00.000Z`,
    isFirstCompletion: true,
    speakingSeconds: 120,
    sentenceCount: 6,
    recordingPath: null,
    ...over,
  };
}

describe("daily practice cap — 5 sessions per local calendar day", () => {
  it("cap is 5", () => {
    expect(DAILY_PRACTICE_CAP).toBe(5);
  });

  it("no practice yet → allowed, 0 used", () => {
    expect(canStartPractice([], TODAY)).toEqual({ allowed: true, used: 0, remaining: 5, cap: 5 });
  });

  it("4 practices → 5th allowed", () => {
    const list = Array.from({ length: 4 }, () => attempt());
    expect(canStartPractice(list, TODAY).allowed).toBe(true);
    expect(canStartPractice(list, TODAY).remaining).toBe(1);
  });

  it("5 practices → 6th blocked", () => {
    const list = Array.from({ length: 5 }, () => attempt());
    const result = canStartPractice(list, TODAY);
    expect(result.allowed).toBe(false);
    expect(result.used).toBe(5);
    expect(result.remaining).toBe(0);
  });

  it("repeats of the same day each consume a slot", () => {
    const list = Array.from({ length: 5 }, (_, i) =>
      attempt({ day: 3, isFirstCompletion: i === 0 }),
    );
    expect(practicesToday(list, TODAY)).toBe(5);
    expect(canStartPractice(list, TODAY).allowed).toBe(false);
  });

  it("mixed new days and repeats all count", () => {
    const list = [
      attempt({ day: 1, isFirstCompletion: true }),
      attempt({ day: 2, isFirstCompletion: true }),
      attempt({ day: 1, isFirstCompletion: false }),
      attempt({ day: 2, isFirstCompletion: false }),
      attempt({ day: 1, isFirstCompletion: false }),
    ];
    expect(canStartPractice(list, TODAY).allowed).toBe(false);
    expect(todaysPracticeLog(list, TODAY).map((e) => e.kind)).toEqual([
      "new",
      "new",
      "repeat",
      "repeat",
      "repeat",
    ]);
  });

  it("yesterday's 5 practices do not block today", () => {
    const list = Array.from({ length: 5 }, () => attempt({ localDayKey: YESTERDAY }));
    expect(canStartPractice(list, TODAY)).toEqual({ allowed: true, used: 0, remaining: 5, cap: 5 });
  });

  it("opened-but-never-recorded sessions never consume a slot", () => {
    const list = [
      ...Array.from({ length: 4 }, () => attempt()),
      attempt({ firstRecordingAt: null, completedAt: null }),
      attempt({ firstRecordingAt: null, completedAt: null }),
    ];
    expect(practicesToday(list, TODAY)).toBe(4);
    expect(canStartPractice(list, TODAY).allowed).toBe(true);
  });

  it("refresh/resume of the counted session stays allowed at 5 / 5", () => {
    const list = Array.from({ length: 5 }, () => attempt());
    const active = list[4]!.id;
    expect(canStartPractice(list, TODAY, active).allowed).toBe(true);
    expect(canStartPractice(list, TODAY, "other-session").allowed).toBe(false);
  });

  it("counts only the learner's own local date, not UTC drift", () => {
    const list = [attempt({ localDayKey: TODAY }), attempt({ localDayKey: YESTERDAY })];
    expect(practicesToday(list, TODAY)).toBe(1);
  });
});
