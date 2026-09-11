/** Shape returned by the admin_engagement_metrics database function. */
export type AdminMetrics = {
  generated_at: string;
  activation: {
    total_users: number;
    activated_users: number;
    day1_completed_users: number;
    median_minutes_to_first: number | null;
    signups_7d: number;
    signups_30d: number;
  };
  curriculum_funnel: { day: number; users: number }[];
  calendar_retention: { day: number; eligible: number; returned: number }[];
  consistency: {
    avg_days_per_user: number | null;
    buckets: { d1: number; d2_3: number; d4_7: number; d8_plus: number };
    weekly_goal_users: number;
    active_7d_users: number;
    active_30d_users: number;
  };
  intensity: {
    avg_sessions_per_active_day: number | null;
    session_distribution: { s1: number; s2: number; s3: number; s4: number; s5_plus: number };
    cap_hit_user_days: number;
    total_user_days: number;
    avg_minutes_per_session: number | null;
    avg_minutes_per_user: number | null;
  };
  signals: {
    retake_users: number;
    coach_users: number;
    review_users: number;
    bug_reports_7d: number;
    bug_reports_open: number;
  };
};

/** Safe percentage helper: returns null when the denominator is zero. */
export function pct(part: number, total: number): number | null {
  if (!total) return null;
  return Math.round((part / total) * 1000) / 10;
}

export function fmtPct(value: number | null): string {
  return value === null ? "—" : `${value}%`;
}

export function fmtNum(value: number | null | undefined): string {
  return value === null || value === undefined ? "—" : String(value);
}
