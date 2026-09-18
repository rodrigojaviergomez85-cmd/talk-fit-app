import { describe, expect, it } from "vitest";
import type { CourseDay, ModuleId } from "@/lib/types";
import { BASIC_ZERO_DAYS } from "@/services/basic-zero-course";
import { isWeek1ListenPilot } from "./Week1ListenScreen";

describe("Basic Zero Week 1 listening pilot", () => {
  it("activates only for Basic Zero Week 1 Step 1", () => {
    const week1 = BASIC_ZERO_DAYS[0] as CourseDay;
    const week2 = BASIC_ZERO_DAYS[5] as CourseDay;
    expect(isWeek1ListenPilot("basic-zero", week1, 1)).toBe(true);
    expect(isWeek1ListenPilot("basic-zero", week1, 2)).toBe(false);
    expect(isWeek1ListenPilot("basic-zero", week2, 1)).toBe(false);
    expect(isWeek1ListenPilot("simple-present" as ModuleId, week1, 1)).toBe(false);
  });

  it("uses the authored speaker and voice for Days 1–5", () => {
    expect(BASIC_ZERO_DAYS.slice(0, 5).map((day) => [day.speaker?.name, day.speakerVoice])).toEqual([
      ["Carlos", "male"],
      ["Sofia", "female"],
      ["Daniel", "male"],
      ["Valeria", "female"],
      ["Miguel", "male"],
    ]);
  });
});