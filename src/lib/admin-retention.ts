/** Shapes returned by the admin_retention_cohorts database function. */
export type RetentionWindow = { eligible: number; returned: number | null };

export type RetentionCohort = {
  week_start: string; // Monday, YYYY-MM-DD (America/El_Salvador)
  signups: number;
  activated: number;
  d1: RetentionWindow;
  d2_3: RetentionWindow;
  d4_7: RetentionWindow;
  d8_14: RetentionWindow;
  d15_30: RetentionWindow;
};

export type RetentionData = {
  generated_at: string;
  today: string;
  north_star: {
    consistent_users: number;
    base_users: number;
    history: { week_start: string; consistent_users: number; base_users: number }[];
  };
  first_24h: {
    signups: number;
    activated: number;
    activated_same_day: number;
    returned_d1: number;
    same_day_returned_d1: number;
  };
  cohorts: RetentionCohort[];
};

export const RETENTION_WINDOW_KEYS = ["d1", "d2_3", "d4_7", "d8_14", "d15_30"] as const;
export type RetentionWindowKey = (typeof RETENTION_WINDOW_KEYS)[number];

export const RETENTION_WINDOW_LABELS: Record<RetentionWindowKey, string> = {
  d1: "D+1",
  d2_3: "D+2–3",
  d4_7: "D+4–7",
  d8_14: "D+8–14",
  d15_30: "D+15–30",
};

/** Share of a window, or null when the window has not closed for anyone. */
export function windowPct(w: RetentionWindow | undefined): number | null {
  if (!w || !w.eligible || w.returned === null || w.returned === undefined) return null;
  return Math.round((w.returned / w.eligible) * 1000) / 10;
}

/** North-star percentage: consistent users over recently active users. */
export function northStarPct(consistent: number, base: number): number | null {
  if (!base) return null;
  return Math.round((consistent / base) * 1000) / 10;
}

/**
 * Background opacity for a retention cell: darker means better.
 * Returns 0 when there is nothing to show.
 */
export function cellIntensity(value: number | null): number {
  if (value === null) return 0;
  const clamped = Math.max(0, Math.min(100, value));
  return Math.round((0.08 + (clamped / 100) * 0.62) * 100) / 100;
}

/** Short Monday label, e.g. "15 sep". */
export function weekLabel(key: string, lang: "en" | "es"): string {
  const [y, m, d] = key.split("-").map(Number);
  const dt = new Date(Date.UTC(y!, (m ?? 1) - 1, d ?? 1));
  return new Intl.DateTimeFormat(lang === "es" ? "es" : "en", {
    day: "numeric",
    month: "short",
    timeZone: "UTC",
  }).format(dt);
}
