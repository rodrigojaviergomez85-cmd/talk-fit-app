import type { DayRecord } from "@/lib/types";
import type { AppLang } from "@/services/preferences";

/**
 * Coach Check helpers — pure functions that answer one question only:
 * "what did this learner actually complete on this calendar date?"
 *
 * Calendar days use the app's existing local YYYY-MM-DD key strategy
 * (`DayRecord.dayKey`, written from the device's local date at completion
 * time). Nothing here looks at curriculum position or streaks.
 */

export function toDayKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/** Local-midnight Date for a YYYY-MM-DD key. */
export function fromDayKey(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y ?? 1970, (m ?? 1) - 1, d ?? 1);
}

export function shiftDays(date: Date, delta: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + delta);
  return next;
}

/** Today, yesterday, ... n keys back, newest first. */
export function recentDayKeys(n: number, now = new Date()): string[] {
  const keys: string[] = [];
  for (let i = 0; i < n; i += 1) keys.push(toDayKey(shiftDays(now, -i)));
  return keys;
}

/** All completed days grouped by local calendar day, each sorted by completion time. */
export function groupByDayKey(records: DayRecord[]): Map<string, DayRecord[]> {
  const groups = new Map<string, DayRecord[]>();
  for (const record of records) {
    const key = record.dayKey || toDayKey(new Date(record.completedAt));
    const list = groups.get(key) ?? [];
    list.push(record);
    groups.set(key, list);
  }
  for (const list of groups.values()) {
    list.sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());
  }
  return groups;
}

export function practicesOn(records: DayRecord[], key: string): DayRecord[] {
  return groupByDayKey(records).get(key) ?? [];
}

const locale = (lang: AppLang) => (lang === "es" ? "es-ES" : "en-US");

/** "MARTES · 1 DE SEPTIEMBRE" / "TUESDAY · SEPTEMBER 1" */
export function formatLongDate(key: string, lang: AppLang): string {
  const date = fromDayKey(key);
  const weekday = date.toLocaleDateString(locale(lang), { weekday: "long" });
  const rest = date.toLocaleDateString(locale(lang), { day: "numeric", month: "long" });
  return `${weekday} · ${rest}`.toUpperCase();
}

/** "1 SEP" / "SEP 1" */
export function formatShortDate(key: string, lang: AppLang): string {
  return fromDayKey(key)
    .toLocaleDateString(locale(lang), { day: "numeric", month: "short" })
    .replace(".", "")
    .toUpperCase();
}

/** "1 de septiembre" / "September 1" for sentences. */
export function formatSentenceDate(key: string, lang: AppLang): string {
  return fromDayKey(key).toLocaleDateString(locale(lang), { day: "numeric", month: "long" });
}

/** "7:42 PM" */
export function formatTime(iso: string, lang: AppLang): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleTimeString(locale(lang), { hour: "numeric", minute: "2-digit" });
}
