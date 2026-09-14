import type { DayRecord } from "@/lib/types";
import { CourseService } from "@/services/course-service";

/** Presentation helpers shared by Progress and My Recordings. */

/**
 * A saved day has playable audio only while the file still exists. When the
 * retention policy removed it (`recordingPurgedAt`), the day, its progress and
 * its evaluation remain — but no player may be offered for a file that is gone.
 */
export function hasPlayableAudio(record?: DayRecord | null): boolean {
  if (!record) return false;
  if (record.finalUrl) return true;
  return Boolean(record.recordingPath) && !record.recordingPurgedAt;
}

/** Bilingual notice for a day whose audio was removed by the retention policy. */
export function audioUnavailableText(es: boolean): string {
  return es ? "Audio ya no disponible" : "Audio no longer available";
}

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
