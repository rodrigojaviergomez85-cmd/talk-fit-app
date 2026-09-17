/** Shape returned by the admin_daily_activity database function. */
export type ActivitySourceKey = "practice" | "story" | "interview" | "review" | "coach";

export type ActivitySource = { users: number; count: number };

export type DailyActivityDay = {
  day: string; // YYYY-MM-DD (America/El_Salvador)
  active_users: number;
  new_users: number;
  practice: ActivitySource;
  story: ActivitySource;
  interview: ActivitySource;
  review: ActivitySource;
  coach: ActivitySource;
};

export type DailyActivity = {
  generated_at: string;
  from: string;
  to: string;
  days: DailyActivityDay[];
};

export type RangeKey = "7" | "15" | "30" | "month";

/** Fixed timezone used for every learner-facing day boundary. */
export const ACTIVITY_TZ = "America/El_Salvador";

/** Today's date key in the app timezone (YYYY-MM-DD). */
export function todayKey(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: ACTIVITY_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

/** Adds (or subtracts) whole days to a YYYY-MM-DD key without timezone drift. */
export function addDays(key: string, delta: number): string {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y!, (m ?? 1) - 1, d ?? 1));
  dt.setUTCDate(dt.getUTCDate() + delta);
  return dt.toISOString().slice(0, 10);
}

/** First and last day keys of the month that contains `key`. */
export function monthBounds(key: string): { from: string; to: string } {
  const [y, m] = key.split("-").map(Number);
  const from = `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}-01`;
  const last = new Date(Date.UTC(y!, m!, 0)).getUTCDate();
  return { from, to: `${String(y).padStart(4, "0")}-${String(m).padStart(2, "0")}-${String(last).padStart(2, "0")}` };
}

/** Shifts a YYYY-MM month anchor by whole months. */
export function addMonths(monthAnchor: string, delta: number): string {
  const [y, m] = monthAnchor.split("-").map(Number);
  const dt = new Date(Date.UTC(y!, (m ?? 1) - 1 + delta, 1));
  return `${dt.getUTCFullYear()}-${String(dt.getUTCMonth() + 1).padStart(2, "0")}`;
}

/** Resolves the requested range into concrete from/to day keys. */
export function resolveRange(range: RangeKey, monthAnchor: string, today = todayKey()): { from: string; to: string } {
  if (range === "month") {
    const bounds = monthBounds(`${monthAnchor}-01`);
    return { from: bounds.from, to: bounds.to < today ? bounds.to : today };
  }
  const span = Number(range);
  return { from: addDays(today, -(span - 1)), to: today };
}

export type RangeSummary = {
  avgActive: number | null;
  bestDay: DailyActivityDay | null;
  daysWithActivity: number;
  totalPractices: number;
};

export function summarize(days: DailyActivityDay[]): RangeSummary {
  if (days.length === 0) return { avgActive: null, bestDay: null, daysWithActivity: 0, totalPractices: 0 };
  const total = days.reduce((acc, d) => acc + d.active_users, 0);
  let best: DailyActivityDay = days[0]!;
  for (const d of days) if (d.active_users > best.active_users) best = d;
  return {
    avgActive: Math.round((total / days.length) * 10) / 10,
    bestDay: best,
    daysWithActivity: days.filter((d) => d.active_users > 0).length,
    totalPractices: days.reduce((acc, d) => acc + d.practice.count + d.review.count, 0),
  };
}

/** Short label like "lun 15" for the compact day squares. */
export function shortDayLabel(key: string, lang: "en" | "es"): string {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y!, (m ?? 1) - 1, d ?? 1));
  const weekday = new Intl.DateTimeFormat(lang === "es" ? "es" : "en", { weekday: "short", timeZone: "UTC" }).format(dt);
  return `${weekday} ${d}`;
}

/** Full label like "15 sep 2026" for the day detail panel. */
export function longDayLabel(key: string, lang: "en" | "es"): string {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y!, (m ?? 1) - 1, d ?? 1));
  return new Intl.DateTimeFormat(lang === "es" ? "es" : "en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(dt);
}

export function monthLabel(monthAnchor: string, lang: "en" | "es"): string {
  const [y, m] = monthAnchor.split("-").map(Number);
  const dt = new Date(Date.UTC(y!, (m ?? 1) - 1, 1));
  return new Intl.DateTimeFormat(lang === "es" ? "es" : "en", { month: "long", year: "numeric", timeZone: "UTC" }).format(dt);
}

/** Maximum span the admin_daily_activity RPC accepts. */
export const MAX_RANGE_DAYS = 400;

/** Whole days between two day keys, inclusive of both ends. */
export function daysBetween(from: string, to: string): number {
  const [fy, fm, fd] = from.split("-").map(Number);
  const [ty, tm, td] = to.split("-").map(Number);
  const a = Date.UTC(fy!, (fm ?? 1) - 1, fd ?? 1);
  const b = Date.UTC(ty!, (tm ?? 1) - 1, td ?? 1);
  return Math.round((b - a) / 86_400_000) + 1;
}

/**
 * Normalizes a user-picked range: orders the ends and clamps the span to
 * MAX_RANGE_DAYS counting back from the later date.
 */
export function normalizeCustomRange(from: string, to: string): { from: string; to: string } {
  const start = from <= to ? from : to;
  const end = from <= to ? to : from;
  if (daysBetween(start, end) > MAX_RANGE_DAYS) {
    return { from: addDays(end, -(MAX_RANGE_DAYS - 1)), to: end };
  }
  return { from: start, to: end };
}

/** Human label for a picked period, e.g. "1 sep – 15 sep 2026". */
export function rangeLabel(from: string, to: string, lang: "en" | "es"): string {
  const short = (key: string) => {
    const [y, m, d] = key.split("-").map(Number);
    const dt = new Date(Date.UTC(y!, (m ?? 1) - 1, d ?? 1));
    return new Intl.DateTimeFormat(lang === "es" ? "es" : "en", { day: "numeric", month: "short", timeZone: "UTC" }).format(dt);
  };
  const year = to.slice(0, 4);
  return `${short(from)} – ${short(to)} ${year}`;
}

/** Converts a Date (already in local picker terms) to a YYYY-MM-DD key. */
export function dateToKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

/** Converts a YYYY-MM-DD key to a local Date for the calendar picker. */
export function keyToDate(key: string): Date {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y!, (m ?? 1) - 1, d ?? 1);
}

