/** Shape returned by the admin_reminder_stats database function. */
export type ReminderStats = {
  generated_at: string;
  scheduled_users: number;
  push_users: number;
  email_users: number;
  sent_today_first: number;
  sent_today_second: number;
  sent_today_activation: number;
  followup: { reminded: number; practiced: number };
};

/** Share of reminded learners who practiced that same day (last 7 days). */
export function followupRate(stats: ReminderStats): number | null {
  const { reminded, practiced } = stats.followup;
  if (!reminded) return null;
  return Math.round((practiced / reminded) * 1000) / 10;
}
