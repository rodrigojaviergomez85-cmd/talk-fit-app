/**
 * "Ponerme al día desde Básico 1" — optional catch-up mode.
 *
 * Suggests a daily dose of Vale episodes in story order, starting from the
 * very first one. It never blocks anything: the catalogue stays open and the
 * official curriculum route is untouched.
 *
 * Local-only state, same spirit as storybook-progress.
 */
import { getProducedEpisodeIds } from "./seasons";
import { getSeenEpisodes } from "./storybook-progress";
import { serverDayKey } from "@/services/server-day";

const KEY = "storybook.catchup.v1";

/** Episodes suggested per day while catching up. */
export const CATCH_UP_DAILY_GOAL = 2;

export type CatchUpState = {
  active: boolean;
  /** Local practice day (America/El_Salvador) the counters belong to. */
  day: string;
  /** Episode ids finished during that day. */
  doneToday: string[];
};

export type CatchUpPlan = {
  active: boolean;
  /** Next episode of the route the learner has not finished yet. */
  nextEpisodeId: string | null;
  /** Episodes finished today (capped list length, never negative). */
  doneTodayCount: number;
  /** How many are still suggested today. */
  todayRemaining: number;
  /** Episodes finished overall, out of the produced catalogue. */
  completedCount: number;
  totalCount: number;
};

const EMPTY_STATE: CatchUpState = { active: false, day: "", doneToday: [] };

function parse(raw: string | null, today: string): CatchUpState {
  if (!raw) return EMPTY_STATE;
  try {
    const parsed = JSON.parse(raw) as Partial<CatchUpState> | null;
    if (!parsed || typeof parsed !== "object") return EMPTY_STATE;
    const day = typeof parsed.day === "string" ? parsed.day : "";
    const sameDay = day === today;
    return {
      active: parsed.active === true,
      day: sameDay ? day : today,
      doneToday:
        sameDay && Array.isArray(parsed.doneToday)
          ? parsed.doneToday.filter((x): x is string => typeof x === "string")
          : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

export function readCatchUpState(today = serverDayKey()): CatchUpState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    return parse(localStorage.getItem(KEY), today);
  } catch {
    return EMPTY_STATE;
  }
}

function write(state: CatchUpState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked — non-critical */
  }
}

export function setCatchUpActive(active: boolean): CatchUpState {
  const today = serverDayKey();
  const current = readCatchUpState(today);
  const next: CatchUpState = { ...current, active, day: today };
  write(next);
  return next;
}

/** Called when an episode reaches its finale, so today's dose can count it. */
export function recordCatchUpEpisode(episodeId: string): void {
  const today = serverDayKey();
  const current = readCatchUpState(today);
  if (!current.active) return;
  if (current.doneToday.includes(episodeId)) return;
  write({ ...current, day: today, doneToday: [...current.doneToday, episodeId] });
}

/**
 * Pure planner: given the finished episodes and the mode state, work out what
 * to suggest. Order defaults to the produced catalogue.
 */
export function getCatchUpPlan(
  seenIds: string[],
  state: CatchUpState,
  order: string[] = getProducedEpisodeIds(),
): CatchUpPlan {
  const seen = new Set(seenIds);
  const nextEpisodeId = order.find((id) => !seen.has(id)) ?? null;
  const completedCount = order.reduce((total, id) => (seen.has(id) ? total + 1 : total), 0);
  const doneTodayCount = state.doneToday.filter((id) => order.includes(id)).length;

  return {
    active: state.active,
    nextEpisodeId,
    doneTodayCount,
    todayRemaining: Math.max(0, CATCH_UP_DAILY_GOAL - doneTodayCount),
    completedCount,
    totalCount: order.length,
  };
}

/** Convenience wrapper that reads both local stores. */
export function readCatchUpPlan(): CatchUpPlan {
  return getCatchUpPlan(getSeenEpisodes(), readCatchUpState());
}
