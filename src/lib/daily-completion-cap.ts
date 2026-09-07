import type { JourneyState, ModuleId } from "./types";

/**
 * Daily pacing cap — client-side mirror of enforce_daily_completion_cap() in Postgres.
 *
 * WHY 2: this is a PACING rule, not a cost-saving one. Repeating a day is free
 * (cache), and one day of AI already costs about $0.006. It exists because
 * spaced practice teaches better than cramming, and because burning through
 * 180 days of curriculum in 90 days leaves 10,000 students with nothing to do
 * in month 3.
 *
 * This module is UX only — the database trigger is the real security boundary.
 */

export const DAILY_NEW_DAY_CAP = 2;
const WINDOW_MS = 24 * 60 * 60 * 1000;

export type DailyCapResult =
  | { allowed: true }
  | { allowed: false; completedToday: number; nextAvailableAt: string };

/**
 * Mirrors enforce_daily_completion_cap() in Postgres: only a day with NO
 * existing record is a "new" day and can be capped. Repeating an
 * already-completed (moduleId, day) is always allowed, from this function's
 * point of view — the caller decides whether to even ask.
 */
export function canStartNewDay(
  state: JourneyState,
  moduleId: ModuleId,
  day: number,
  now: Date = new Date(),
): DailyCapResult {
  const key = `${moduleId}:${day}`;
  if (state.days[key]) return { allowed: true }; // repeat — never capped

  const cutoff = now.getTime() - WINDOW_MS;
  const recent = Object.values(state.days)
    .filter((record) => new Date(record.completedAt).getTime() > cutoff)
    .sort((a, b) => new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime());

  if (recent.length < DAILY_NEW_DAY_CAP) return { allowed: true };

  const oldest = recent[0]!;
  const nextAvailableAt = new Date(new Date(oldest.completedAt).getTime() + WINDOW_MS).toISOString();
  return { allowed: false, completedToday: recent.length, nextAvailableAt };
}
