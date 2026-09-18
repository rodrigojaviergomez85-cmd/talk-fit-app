/**
 * LIGA SEMANAL — pure rules (no network, no React).
 *
 * Two activities per curriculum day are worth 150 points each:
 *   - story   (El mundo de Vale episode for that day)
 *   - practice(the 5-step daily audios)
 *
 * A curriculum week is five days, so the weekly goal is 1,500 points.
 * Catch-up is allowed: there is NO per-calendar-date ceiling. The server is
 * the only authority for points; everything here is display logic and the
 * shared constants both sides agree on.
 */

export const POINTS_PER_ACTIVITY = 150;
export const ACTIVITIES_PER_DAY = 2;
export const DAYS_PER_WEEK = 5;
export const DAY_GOAL = POINTS_PER_ACTIVITY * ACTIVITIES_PER_DAY; // 300
export const WEEKLY_GOAL = DAY_GOAL * DAYS_PER_WEEK; // 1500

/** Institutional timezone for competition weeks (same one practice caps use). */
export const LEAGUE_TIMEZONE = "America/El_Salvador";

export type LeagueActivityType = "story" | "practice" | "grammar";

export type LeagueReward = {
  activityType: LeagueActivityType;
  day: number;
  points: number;
};

export type LeagueSummary = {
  enrolled: boolean;
  /** Admin / unlimited accounts: they can look at the league but never score. */
  observer: boolean;
  competitionId?: string | undefined;
  moduleId?: string | undefined;
  curriculumWeek?: number | undefined;
  weekStart?: string | undefined;
  weekEnd?: string | undefined;
  closed?: boolean | undefined;
  points: number;
  hidden: boolean;
  rank: number | null;
  participants: number;
  rewards: LeagueReward[];
  /** Real maximum for this cohort when some episodes are not published yet. */
  attainableGoal: number;
  /** True when the 1,500 goal is actually reachable with published content. */
  goalAttainable: boolean;
};

/** One weekly competition the learner belongs to (for the week selector). */
export type LeagueWeekRef = {
  competitionId: string;
  moduleId: string;
  curriculumWeek: number;
  weekStart: string;
  weekEnd: string;
  closed: boolean;
  /** True when this competition belongs to the running calendar week. */
  isCurrent: boolean;
  points: number;
  rank: number | null;
  participants: number;
};

export type LeagueBoardRow = {
  rank: number;
  name: string;
  points: number;
  isMe: boolean;
  avatar?: string | null;
  /** Private storage path of an approved photo; signed separately. */
  photo?: string | null;
  /** Signed URL filled in by the client after signing `photo`. */
  photoUrl?: string | null;
};

/** Curriculum week (1-based) a curriculum day belongs to. */
export function curriculumWeekForDay(day: number): number {
  return Math.max(1, Math.ceil(day / DAYS_PER_WEEK));
}

/** The five curriculum days a week competes with. */
export function daysForWeek(week: number): number[] {
  const first = (Math.max(1, week) - 1) * DAYS_PER_WEEK + 1;
  return Array.from({ length: DAYS_PER_WEEK }, (_, i) => first + i);
}

export function isDayInWeek(day: number, week: number): boolean {
  return daysForWeek(week).includes(day);
}

/** Points already confirmed for one curriculum day (0, 150 or 300). */
export function pointsForDay(rewards: LeagueReward[], day: number): number {
  return rewards.filter((r) => r.day === day).reduce((sum, r) => sum + r.points, 0);
}

export function hasReward(rewards: LeagueReward[], day: number, type: LeagueActivityType): boolean {
  return rewards.some((r) => r.day === day && r.activityType === type);
}

/**
 * Weekly maximum when only some story episodes exist for the cohort.
 * `grammarDays` is the piloted third activity (Paso 3 · Gramática).
 */
export function attainableWeeklyGoal(publishedStoryDays: number, grammarDays = 0): number {
  const stories = Math.max(0, Math.min(DAYS_PER_WEEK, publishedStoryDays));
  const grammar = Math.max(0, Math.min(DAYS_PER_WEEK, grammarDays));
  return (DAYS_PER_WEEK + stories + grammar) * POINTS_PER_ACTIVITY;
}

/** Daily maximum: 150 per available activity that day (audios, story, grammar). */
export function dailyGoal(hasStory: boolean, hasGrammar = false): number {
  return (1 + (hasStory ? 1 : 0) + (hasGrammar ? 1 : 0)) * POINTS_PER_ACTIVITY;
}

/** 0–100, clamped, for the compact progress bars. */
export function progressPercent(points: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.max(0, Math.min(100, Math.round((points / goal) * 100)));
}

export function formatPoints(points: number): string {
  return points.toLocaleString("en-US");
}

/** Monday (YYYY-MM-DD) of the competition week for a date, institutional TZ. */
export function leagueWeekStart(date = new Date()): string {
  const key = new Intl.DateTimeFormat("en-CA", { timeZone: LEAGUE_TIMEZONE }).format(date);
  const ms = Date.parse(`${key}T12:00:00Z`);
  const dow = new Date(ms).getUTCDay(); // 0 Sun … 6 Sat
  const back = (dow + 6) % 7; // days since Monday
  return new Date(ms - back * 86400000).toISOString().slice(0, 10);
}

export function leagueWeekEnd(weekStart: string): string {
  const ms = Date.parse(`${weekStart}T12:00:00Z`);
  return new Date(ms + 6 * 86400000).toISOString().slice(0, 10);
}

/** "3 sep – 9 sep" style range for the board header. */
export function formatWeekRange(weekStart: string, weekEnd: string, es: boolean): string {
  const fmt = (key: string) =>
    new Intl.DateTimeFormat(es ? "es" : "en", { day: "numeric", month: "short", timeZone: "UTC" }).format(
      new Date(`${key}T12:00:00Z`),
    );
  return `${fmt(weekStart)} – ${fmt(weekEnd)}`;
}
