import { supabase } from "@/integrations/supabase/client";

export type ReminderChannel = "push" | "email";

export type PracticeSchedule = {
  enabled: boolean;
  timeLocal: string; // "HH:MM" 24h
  days: number[]; // 1 = Monday … 7 = Sunday (ISO)
  timezone: string;
  channel: ReminderChannel;
};

export const DEFAULT_DAYS = [1, 2, 3, 4, 5];
export const TIME_CHIPS = ["06:00", "12:30", "19:00", "21:00"];

export function currentTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "America/El_Salvador";
  } catch {
    return "America/El_Salvador";
  }
}

async function uid(): Promise<string | null> {
  const { data } = await supabase.auth.getUser();
  return data.user?.id ?? null;
}

export async function loadSchedule(): Promise<PracticeSchedule | null> {
  const user = await uid();
  if (!user) return null;
  const { data } = await supabase
    .from("practice_schedules")
    .select("enabled, time_local, days, timezone, channel")
    .eq("user_id", user)
    .maybeSingle();
  if (!data) return null;
  return {
    enabled: data.enabled,
    timeLocal: data.time_local,
    days: (data.days ?? DEFAULT_DAYS) as number[],
    timezone: data.timezone,
    channel: data.channel === "email" ? "email" : "push",
  };
}

export async function saveSchedule(schedule: PracticeSchedule): Promise<boolean> {
  const user = await uid();
  if (!user) return false;
  const { error } = await supabase.from("practice_schedules").upsert(
    {
      user_id: user,
      enabled: schedule.enabled,
      time_local: schedule.timeLocal,
      days: schedule.days,
      timezone: schedule.timezone,
      channel: schedule.channel,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  return !error;
}

export async function markSchedulePrompted(): Promise<void> {
  const user = await uid();
  if (!user) return;
  await supabase
    .from("user_preferences")
    .upsert({ user_id: user, schedule_prompted_at: new Date().toISOString() }, { onConflict: "user_id" });
}

/** Which version of the day-complete card (if any) this learner should see. */
export type PromptDecision = "first" | "second-chance" | "new-device" | "none";

const NEW_DEVICE_KEY = "fluency.reminder.newDevicePrompt";

export function newDevicePromptAllowed(now = new Date()): boolean {
  if (typeof localStorage === "undefined") return false;
  const raw = localStorage.getItem(NEW_DEVICE_KEY);
  if (!raw) return true;
  const last = Number(raw);
  if (!Number.isFinite(last)) return true;
  return now.getTime() - last >= 7 * 24 * 60 * 60 * 1000;
}

export function markNewDevicePromptShown(now = new Date()): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(NEW_DEVICE_KEY, String(now.getTime()));
}

/** Calendar days between the last practice date and today (0 when same day). */
export function daysSince(lastDate: string | null, today: string): number {
  if (!lastDate) return Number.POSITIVE_INFINITY;
  const a = Date.parse(`${lastDate}T00:00:00Z`);
  const b = Date.parse(`${today}T00:00:00Z`);
  if (!Number.isFinite(a) || !Number.isFinite(b)) return 0;
  return Math.round((b - a) / 86_400_000);
}

export type PromptContext = {
  promptedAt: string | null;
  schedule: PracticeSchedule | null;
  gapDays: number;
  pushSupport: "push" | "ios-not-installed" | "unsupported";
  permission: NotificationPermission | "unsupported";
  newDeviceAllowed: boolean;
};

/** Pure decision so the rules can be tested without a browser or a session. */
export function decidePrompt(ctx: PromptContext): PromptDecision {
  if (!ctx.promptedAt) return "first";
  if (!ctx.schedule) return ctx.gapDays >= 3 ? "second-chance" : "none";
  if (
    ctx.schedule.channel === "push" &&
    ctx.pushSupport === "push" &&
    ctx.permission === "default" &&
    ctx.newDeviceAllowed
  ) {
    return "new-device";
  }
  return "none";
}

/** Reads everything the decision needs from the backend. */
export async function loadPromptContext(): Promise<{
  promptedAt: string | null;
  schedule: PracticeSchedule | null;
  gapDays: number;
} | null> {
  const user = await uid();
  if (!user) return null;
  const [prefs, schedule, lastDay] = await Promise.all([
    supabase.from("user_preferences").select("schedule_prompted_at").eq("user_id", user).maybeSingle(),
    loadSchedule(),
    supabase
      .from("habit_practice_days")
      .select("practice_date")
      .eq("user_id", user)
      .order("practice_date", { ascending: false })
      .limit(2),
  ]);
  const today = new Date().toISOString().slice(0, 10);
  // The row for today may already exist (this completion), so look one back.
  const dates = (lastDay.data ?? []).map((r) => r.practice_date as string);
  const previous = dates.find((d) => d !== today) ?? null;
  return {
    promptedAt: prefs.data?.schedule_prompted_at ?? null,
    schedule,
    gapDays: daysSince(previous, today),
  };
}

const DAY_RRULE = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

/** Repeating calendar event as a backup alarm. */
export function buildIcs(schedule: PracticeSchedule, appUrl: string, lang: "es" | "en"): string {
  const [hh, mm] = schedule.timeLocal.split(":");
  const byDay = [...schedule.days].sort((a, b) => a - b).map((d) => DAY_RRULE[d - 1]).join(",");
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(
    now.getUTCHours(),
  )}${pad(now.getUTCMinutes())}${pad(now.getUTCSeconds())}Z`;
  const start = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}T${hh}${mm}00`;
  const endMinutes = Number(hh) * 60 + Number(mm) + 15;
  const end = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}T${pad(
    Math.floor(endMinutes / 60) % 24,
  )}${pad(endMinutes % 60)}00`;
  const description =
    lang === "es" ? `Practicá tu inglés hoy: ${appUrl}` : `Practice your English today: ${appUrl}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fluency App//Practice Reminder//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:practice-${stamp}@fluency.app`,
    `DTSTAMP:${stamp}`,
    `DTSTART;TZID=${schedule.timezone}:${start}`,
    `DTEND;TZID=${schedule.timezone}:${end}`,
    `RRULE:FREQ=WEEKLY;BYDAY=${byDay}`,
    "SUMMARY:Fluency App · práctica de hoy",
    `DESCRIPTION:${description}`,
    "BEGIN:VALARM",
    "TRIGGER:-PT0M",
    "ACTION:DISPLAY",
    "DESCRIPTION:Fluency App · práctica de hoy",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(schedule: PracticeSchedule, lang: "es" | "en"): void {
  const appUrl = typeof window === "undefined" ? "https://talk-fit-app.lovable.app" : window.location.origin;
  const blob = new Blob([buildIcs(schedule, appUrl, lang)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fluency-practica.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
