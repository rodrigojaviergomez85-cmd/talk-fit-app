import { JourneyService, habitDatesOf } from "@/services/journey-service";
import type { JourneyState } from "@/lib/types";

/**
 * Read-only selectors for the PROGRESS "Últimos 7 días" card.
 * Distinct local calendar dates (max one per day, weekends included) and real
 * speaking seconds in the last 7 days. Never relabels weekStats numbers.
 */

function last7Keys(): Set<string> {
  const keys = new Set<string>();
  const now = Date.now();
  for (let i = 0; i < 7; i += 1) {
    keys.add(JourneyService.dayKey(new Date(now - i * 86400000)));
  }
  return keys;
}

/** Unique practice dates inside the last 7 local days (weekends included). */
export function last7PracticeDays(state: JourneyState): number {
  const keys = last7Keys();
  return habitDatesOf(state).filter((d) => keys.has(d)).length;
}

/** Real speaking seconds in the last 7 days (0 when nothing recorded). */
export function last7SpeakingSeconds(state: JourneyState): number {
  const keys = last7Keys();
  let seconds = 0;
  for (const [key, value] of Object.entries(state.weekSeconds ?? {})) {
    if (keys.has(key)) seconds += value ?? 0;
  }
  return seconds;
}

/**
 * Honest speaking-time label:
 * - "none": learner has no completed practice at all → "Sin datos".
 * - "zero": real practice exists but no time recorded → "Aún sin tiempo registrado".
 * - "under1": 1–59 real seconds → "Menos de 1 min".
 * - otherwise whole minutes.
 */
export function speakingTimeLabel(
  state: JourneyState,
): { kind: "none" | "zero" | "under1" } | { kind: "minutes"; minutes: number } {
  const hasPractice = Object.keys(state.days).length > 0 || habitDatesOf(state).length > 0;
  if (!hasPractice) return { kind: "none" };
  const seconds = last7SpeakingSeconds(state);
  if (seconds <= 0) return { kind: "zero" };
  if (seconds < 60) return { kind: "under1" };
  return { kind: "minutes", minutes: Math.round(seconds / 60) };
}
