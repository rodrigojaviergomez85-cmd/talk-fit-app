/**
 * Server side of practice reminders: decides who is due right now and sends
 * the notification. Rules that never bend:
 *   1. never send to someone who already practiced today;
 *   2. at most two reminders per learner per local day;
 *   3. never on a weekday the learner did not choose.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { CourseService } from "@/services/course-service";
import type { ModuleId } from "@/lib/types";
import { sendWebPush, type PushSubscriptionRecord } from "@/lib/web-push.server";
import {
  buildActivationReminder,
  buildDayReminder,
  dayOfYear,
  dayUrl,
  type ReminderKind,
  type ReminderLang,
  type ReminderMessage,
} from "@/lib/reminder-messages";
import { localNow, streakFrom, windowFor } from "@/lib/reminder-window";

type Admin = SupabaseClient<Database>;

export type ReminderDecision = {
  userId: string;
  localDate: string;
  window: ReminderKind | null;
  practicedToday: boolean;
  alreadyLogged: boolean;
  channel: "push" | "email" | "none";
  message: ReminderMessage | null;
  skipped: string | null;
};

export type ReminderRunResult = {
  ok: boolean;
  checked: number;
  sent: { push: number; email: number };
  skippedNoChannel: number;
  errors: string[];
  decisions?: ReminderDecision[];
};

const APP_URL = "https://talk-fit-app.lovable.app";

/** Published ladder in learner order, pilots excluded. */
function ladder() {
  return CourseService.modules().filter((m) => !m.pilot);
}

function moduleName(moduleId: ModuleId): string {
  try {
    const m = CourseService.getModule(moduleId);
    return m.label;
  } catch {
    return "Fluency";
  }
}

export type NextDay = { moduleId: ModuleId; day: number; topic: string; topicEs: string; moduleName: string };

/** The day the learner should do next, from saved completions only. */
export async function resolveNextDay(admin: Admin, userId: string): Promise<NextDay | null> {
  const [{ data: prefs }, { data: done }] = await Promise.all([
    admin
      .from("user_preferences")
      .select("current_module_id, initial_placement_module_id, app_language")
      .eq("user_id", userId)
      .maybeSingle(),
    admin.from("day_progress").select("module_id, day").eq("user_id", userId),
  ]);

  const list = ladder();
  const startId = (prefs?.current_module_id ?? prefs?.initial_placement_module_id ?? list[0]?.id) as ModuleId;
  const startIndex = Math.max(0, list.findIndex((m) => m.id === startId));

  const completed = new Map<string, Set<number>>();
  for (const row of done ?? []) {
    const set = completed.get(row.module_id) ?? new Set<number>();
    set.add(row.day);
    completed.set(row.module_id, set);
  }

  for (let i = startIndex; i < list.length; i += 1) {
    const module = list[i]!;
    const finished = completed.get(module.id) ?? new Set<number>();
    const next = module.days.find((d) => !finished.has(d.day));
    if (next) {
      return {
        moduleId: module.id,
        day: next.day,
        topic: next.topic,
        topicEs: next.topicEs,
        moduleName: module.label,
      };
    }
  }
  return null;
}

async function languageOf(admin: Admin, userId: string): Promise<ReminderLang> {
  const { data } = await admin
    .from("user_preferences")
    .select("app_language")
    .eq("user_id", userId)
    .maybeSingle();
  return data?.app_language === "en" ? "en" : "es";
}

async function practicedOn(admin: Admin, userId: string, localDate: string): Promise<boolean> {
  const { data } = await admin
    .from("habit_practice_days")
    .select("practice_date")
    .eq("user_id", userId)
    .eq("practice_date", localDate)
    .maybeSingle();
  return Boolean(data);
}

async function alreadyLogged(admin: Admin, userId: string, localDate: string, kind: ReminderKind): Promise<boolean> {
  const { data } = await admin
    .from("reminder_log")
    .select("id")
    .eq("user_id", userId)
    .eq("local_date", localDate)
    .eq("kind", kind)
    .maybeSingle();
  return Boolean(data);
}

async function streakOf(admin: Admin, userId: string, localDate: string): Promise<number> {
  const { data } = await admin
    .from("habit_practice_days")
    .select("practice_date")
    .eq("user_id", userId)
    .order("practice_date", { ascending: false })
    .limit(120);
  return streakFrom((data ?? []).map((r) => r.practice_date as string), localDate);
}

function vapidConfig() {
  const publicKey = process.env["VAPID_PUBLIC_KEY"];
  const privateKey = process.env["VAPID_PRIVATE_KEY"];
  const subject = process.env["VAPID_SUBJECT"] ?? "mailto:english4callcenters@gmail.com";
  if (!publicKey || !privateKey) return null;
  return { publicKey, privateKey, subject };
}

/** Push to every live subscription. Returns true when at least one arrived. */
async function pushToUser(admin: Admin, userId: string, message: ReminderMessage, errors: string[]): Promise<boolean> {
  const vapid = vapidConfig();
  if (!vapid) {
    errors.push("missing VAPID keys");
    return false;
  }
  const { data: subs } = await admin
    .from("push_subscriptions")
    .select("id, endpoint, p256dh, auth")
    .eq("user_id", userId)
    .is("failed_at", null);
  if (!subs?.length) return false;

  const payload = JSON.stringify({
    title: message.title,
    body: message.body,
    url: message.url,
  });

  let delivered = false;
  for (const sub of subs) {
    const record: PushSubscriptionRecord = { endpoint: sub.endpoint, p256dh: sub.p256dh, auth: sub.auth };
    const result = await sendWebPush(record, payload, vapid);
    if (result.ok) {
      delivered = true;
      continue;
    }
    if (result.gone) {
      await admin.from("push_subscriptions").delete().eq("id", sub.id);
    } else {
      await admin.from("push_subscriptions").update({ failed_at: new Date().toISOString() }).eq("id", sub.id);
      errors.push(`push ${result.status}`);
    }
  }
  return delivered;
}

async function emailToUser(
  admin: Admin,
  userId: string,
  message: ReminderMessage,
  lang: ReminderLang,
  errors: string[],
): Promise<boolean> {
  const resendKey = process.env["RESEND_API_KEY"];
  const lovableKey = process.env["LOVABLE_API_KEY"];
  if (!resendKey || !lovableKey) {
    errors.push("email skipped: RESEND_API_KEY not configured");
    return false;
  }
  const { data: profile } = await admin.from("profiles").select("email").eq("id", userId).maybeSingle();
  const to = profile?.email;
  if (!to) {
    errors.push("email skipped: no address");
    return false;
  }

  const cta = lang === "es" ? "Practicar ahora" : "Practice now";
  const footer =
    lang === "es"
      ? "Cambiá tu horario en Perfil → Mi horario."
      : "Change your schedule in Profile → My schedule.";
  const html = `<div style="font-family:system-ui,sans-serif;font-size:16px;line-height:1.5">
<p><strong>${message.title}</strong></p>
<p>${message.body}</p>
<p><a href="${APP_URL}${message.url}" style="display:inline-block;background:#111;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:700">${cta}</a></p>
<p style="color:#666;font-size:13px">${footer}</p>
</div>`;

  try {
    const response = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": resendKey,
      },
      body: JSON.stringify({
        from: "Fluency App <onboarding@resend.dev>",
        to: [to],
        subject: message.title,
        html,
      }),
    });
    if (!response.ok) {
      errors.push(`email ${response.status}: ${await response.text()}`);
      return false;
    }
    return true;
  } catch (error) {
    errors.push(error instanceof Error ? error.message : "email failed");
    return false;
  }
}

async function logSend(
  admin: Admin,
  userId: string,
  localDate: string,
  kind: ReminderKind,
  channel: "push" | "email",
): Promise<void> {
  await admin.from("reminder_log").insert({ user_id: userId, local_date: localDate, kind, channel });
}

type ScheduleRow = {
  user_id: string;
  time_local: string;
  days: number[] | null;
  timezone: string;
  channel: string;
};

/** Decides (and optionally sends) for one scheduled learner. */
async function handleSchedule(
  admin: Admin,
  row: ScheduleRow,
  now: Date,
  opts: { dryRun: boolean; force: boolean },
  result: ReminderRunResult,
): Promise<ReminderDecision> {
  const local = localNow(row.timezone, now);
  const days = row.days ?? [1, 2, 3, 4, 5];
  const detected = windowFor({ timeLocal: row.time_local, days }, local);
  const kind: ReminderKind | null = detected ?? (opts.force ? "first" : null);

  const decision: ReminderDecision = {
    userId: row.user_id,
    localDate: local.date,
    window: kind,
    practicedToday: false,
    alreadyLogged: false,
    channel: "none",
    message: null,
    skipped: null,
  };
  if (!kind) {
    decision.skipped = "out of window";
    return decision;
  }

  decision.practicedToday = await practicedOn(admin, row.user_id, local.date);
  if (decision.practicedToday) {
    decision.skipped = "already practiced today";
    return decision;
  }
  decision.alreadyLogged = await alreadyLogged(admin, row.user_id, local.date, kind);
  if (decision.alreadyLogged) {
    decision.skipped = "already reminded";
    return decision;
  }

  const next = await resolveNextDay(admin, row.user_id);
  if (!next) {
    decision.skipped = "no day left";
    return decision;
  }

  const lang = await languageOf(admin, row.user_id);
  const streak = await streakOf(admin, row.user_id, local.date);
  decision.message = buildDayReminder(
    kind === "second" ? "second" : "first",
    dayOfYear(now),
    lang,
    { day: next.day, moduleName: next.moduleName, topic: next.topic, topicEs: next.topicEs, streak },
    dayUrl(next.moduleId, next.day),
  );
  decision.channel = row.channel === "email" ? "email" : "push";

  if (opts.dryRun) return decision;

  let sent = false;
  if (decision.channel === "push") {
    sent = await pushToUser(admin, row.user_id, decision.message, result.errors);
    if (!sent) {
      sent = await emailToUser(admin, row.user_id, decision.message, lang, result.errors);
      if (sent) decision.channel = "email";
    }
  } else {
    sent = await emailToUser(admin, row.user_id, decision.message, lang, result.errors);
  }

  if (!sent) {
    decision.skipped = "no channel available";
    result.skippedNoChannel += 1;
    return decision;
  }
  await logSend(admin, row.user_id, local.date, kind, decision.channel);
  result.sent[decision.channel] += 1;
  return decision;
}

/** 24h / 72h nudges for learners who never recorded anything. */
async function runActivation(admin: Admin, now: Date, dryRun: boolean, result: ReminderRunResult): Promise<void> {
  for (const hours of [24, 72] as const) {
    const kind: ReminderKind = hours === 24 ? "activation_24h" : "activation_72h";
    const { data, error } = await admin.rpc("reminder_activation_candidates", { _hours: hours, _kind: kind });
    if (error) {
      result.errors.push(`activation ${hours}h: ${error.message}`);
      continue;
    }
    for (const row of (data ?? []) as { user_id: string; local_date: string; module_id: string | null }[]) {
      result.checked += 1;
      const moduleId = (row.module_id ?? ladder()[0]!.id) as ModuleId;
      const lang = await languageOf(admin, row.user_id);
      const message = buildActivationReminder(lang, moduleName(moduleId), dayUrl(moduleId, 1));
      if (dryRun) continue;
      let sent = await pushToUser(admin, row.user_id, message, result.errors);
      let channel: "push" | "email" = "push";
      if (!sent) {
        sent = await emailToUser(admin, row.user_id, message, lang, result.errors);
        channel = "email";
      }
      if (!sent) {
        result.skippedNoChannel += 1;
        continue;
      }
      await logSend(admin, row.user_id, row.local_date, kind, channel);
      result.sent[channel] += 1;
    }
  }
}

/** One full pass. Called by the 5-minute cron and by the manual test modes. */
export async function runPracticeReminders(
  admin: Admin,
  opts: { now?: Date; dryRun?: boolean; force?: boolean; userId?: string } = {},
): Promise<ReminderRunResult> {
  const now = opts.now ?? new Date();
  const dryRun = Boolean(opts.dryRun);
  const force = Boolean(opts.force);
  const result: ReminderRunResult = {
    ok: true,
    checked: 0,
    sent: { push: 0, email: 0 },
    skippedNoChannel: 0,
    errors: [],
    decisions: [],
  };
  const startedAt = new Date().toISOString();

  let query = admin
    .from("practice_schedules")
    .select("user_id, time_local, days, timezone, channel")
    .eq("enabled", true);
  if (opts.userId) query = query.eq("user_id", opts.userId);
  const { data: schedules, error } = await query;
  if (error) {
    result.ok = false;
    result.errors.push(error.message);
    return result;
  }

  for (const row of (schedules ?? []) as ScheduleRow[]) {
    result.checked += 1;
    try {
      const decision = await handleSchedule(admin, row, now, { dryRun, force }, result);
      if (opts.userId || dryRun) result.decisions!.push(decision);
    } catch (e) {
      result.errors.push(e instanceof Error ? e.message : "schedule failed");
    }
  }

  if (!opts.userId) await runActivation(admin, now, dryRun, result);

  if (!dryRun) {
    await admin.from("job_runs").insert({
      job_name: "practice-reminders",
      started_at: startedAt,
      finished_at: new Date().toISOString(),
      ok: result.errors.length === 0,
      deleted_files: 0,
      marked_rows: result.sent.push + result.sent.email,
      error: result.errors.length ? result.errors.slice(0, 5).join(" | ") : null,
      detail: {
        checked: result.checked,
        push: result.sent.push,
        email: result.sent.email,
        skipped_no_channel: result.skippedNoChannel,
      },
    });
  }

  if (!opts.userId && !dryRun) delete result.decisions;
  return result;
}
