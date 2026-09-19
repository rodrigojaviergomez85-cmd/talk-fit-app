/**
 * Local-time window maths for practice reminders. Pure: no database, no clock
 * of its own — the caller passes "now". The job runs every 5 minutes, so each
 * local minute falls inside exactly one run (a 0–4 minute margin).
 */

export const WINDOW_MARGIN_MINUTES = 4;
export const SECOND_OFFSET_MINUTES = 120;

export type LocalNow = {
  /** YYYY-MM-DD in the learner's timezone. */
  date: string;
  /** ISO weekday, 1 = Monday … 7 = Sunday. */
  weekday: number;
  /** Minutes since local midnight. */
  minutes: number;
};

const WEEKDAYS: Record<string, number> = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 7 };

/** Converts an instant to the learner's local date, weekday and minute. */
export function localNow(timezone: string, now: Date): LocalNow {
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      weekday: "short",
    }).formatToParts(now);
  } catch {
    return localNow("UTC", now);
  }
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const hour = Number(get("hour")) % 24;
  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    weekday: WEEKDAYS[get("weekday")] ?? 1,
    minutes: hour * 60 + Number(get("minute")),
  };
}

export function parseTimeLocal(timeLocal: string): number | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(timeLocal.trim());
  if (!match) return null;
  const h = Number(match[1]);
  const m = Number(match[2]);
  if (h > 23 || m > 59) return null;
  return h * 60 + m;
}

function inMargin(nowMinutes: number, target: number): boolean {
  const diff = nowMinutes - target;
  return diff >= 0 && diff <= WINDOW_MARGIN_MINUTES;
}

/** Which reminder window (if any) this schedule is inside right now. */
export function windowFor(
  schedule: { timeLocal: string; days: number[] },
  local: LocalNow,
): "first" | "second" | null {
  if (!schedule.days.includes(local.weekday)) return null;
  const start = parseTimeLocal(schedule.timeLocal);
  if (start === null) return null;
  if (inMargin(local.minutes, start)) return "first";
  if (inMargin(local.minutes, (start + SECOND_OFFSET_MINUTES) % 1440)) return "second";
  return null;
}

/** Consecutive practice days ending today or yesterday. Dates are YYYY-MM-DD. */
export function streakFrom(dates: string[], today: string): number {
  const set = new Set(dates);
  const day = (iso: string, delta: number) => {
    const t = Date.parse(`${iso}T00:00:00Z`) + delta * 86_400_000;
    return new Date(t).toISOString().slice(0, 10);
  };
  let cursor = set.has(today) ? today : day(today, -1);
  if (!set.has(cursor)) return 0;
  let count = 0;
  while (set.has(cursor)) {
    count += 1;
    cursor = day(cursor, -1);
  }
  return count;
}
