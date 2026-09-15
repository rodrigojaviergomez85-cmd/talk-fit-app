import { describe, expect, it } from "vitest";
import { CATCH_UP_DAILY_GOAL, getCatchUpPlan, type CatchUpState } from "./catch-up";
import { getProducedEpisodeIds } from "./seasons";

const ORDER = ["ep1", "ep2", "ep3", "ep4"];
const active = (doneToday: string[] = []): CatchUpState => ({ active: true, day: "2026-09-15", doneToday });

describe("getCatchUpPlan", () => {
  it("starts at the first episode when nothing is finished", () => {
    const plan = getCatchUpPlan([], active(), ORDER);
    expect(plan.nextEpisodeId).toBe("ep1");
    expect(plan.completedCount).toBe(0);
    expect(plan.totalCount).toBe(4);
    expect(plan.todayRemaining).toBe(CATCH_UP_DAILY_GOAL);
  });

  it("resumes at the first unfinished episode", () => {
    const plan = getCatchUpPlan(["ep1", "ep2"], active(["ep1", "ep2"]), ORDER);
    expect(plan.nextEpisodeId).toBe("ep3");
    expect(plan.completedCount).toBe(2);
    expect(plan.doneTodayCount).toBe(2);
    expect(plan.todayRemaining).toBe(0);
  });

  it("never reports a negative remainder when the learner goes beyond the goal", () => {
    const plan = getCatchUpPlan(["ep1", "ep2", "ep3"], active(["ep1", "ep2", "ep3"]), ORDER);
    expect(plan.todayRemaining).toBe(0);
    expect(plan.doneTodayCount).toBe(3);
  });

  it("reports no next episode once everything published is finished", () => {
    const plan = getCatchUpPlan(ORDER, active(), ORDER);
    expect(plan.nextEpisodeId).toBeNull();
    expect(plan.completedCount).toBe(4);
  });

  it("resets the daily counter when the stored day is gone", () => {
    const plan = getCatchUpPlan(["ep1"], { active: true, day: "2026-09-15", doneToday: [] }, ORDER);
    expect(plan.todayRemaining).toBe(CATCH_UP_DAILY_GOAL);
    expect(plan.nextEpisodeId).toBe("ep2");
  });

  it("defaults to the real produced catalogue", () => {
    const produced = getProducedEpisodeIds();
    expect(produced.length).toBeGreaterThan(100);
    expect(new Set(produced).size).toBe(produced.length);
    const plan = getCatchUpPlan([], active());
    expect(plan.nextEpisodeId).toBe(produced[0]);
    expect(plan.totalCount).toBe(produced.length);
  });
});
