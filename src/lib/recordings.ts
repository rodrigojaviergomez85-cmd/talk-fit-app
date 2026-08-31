import type { DayRecord } from "@/lib/types";
import { CourseService } from "@/services/course-service";

/** Presentation helpers shared by Progress and My Recordings. */

export function formatDuration(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function ideasLabel(count?: number | null): string | null {
  if (typeof count !== "number" || count <= 0) return null;
  return `${count} ${count === 1 ? "idea" : "ideas"}`;
}

/** MODULE 3 · WEEK 1 · DAY 2 */
export function recordHeading(record: DayRecord): string {
  const module = CourseService.getModule(record.moduleId);
  const day = CourseService.getDay(record.moduleId, record.day);
  const moduleLabel = module.label.split(" · ")[0] ?? module.title;
  const week = day.week ? `WEEK ${day.week} · ` : "";
  return `${moduleLabel} · ${week}DAY ${record.day}`;
}

export function recordTitle(record: DayRecord): string {
  return CourseService.getDay(record.moduleId, record.day).topic;
}
