import type { CourseDay } from "@/lib/types";

/** How much written support a day shows. Derived from the day's slot in its week. */
export type SupportLevel = "high" | "medium" | "low" | "minimal";

/** 1..5 position of the day inside its week. */
export function dayInWeek(day: CourseDay): number {
  const n = ((day.day - 1) % 5) + 1;
  return n;
}

export function supportLevel(day: CourseDay): SupportLevel {
  if (day.hideModelText) return "minimal";
  switch (dayInWeek(day)) {
    case 1:
    case 2:
      return "high";
    case 3:
      return "medium";
    case 4:
      return "low";
    default:
      return "minimal";
  }
}

/** Model sentences visible without tapping "show text"? */
export function showsFullTextByDefault(level: SupportLevel): boolean {
  return level === "high" || level === "medium";
}

/** Render sentences split into speaking chunks instead of full lines. */
export function prefersChunks(level: SupportLevel): boolean {
  return level !== "high";
}
