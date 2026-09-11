import { supabase } from "@/integrations/supabase/client";
import { localDayKey } from "./practice-attempts";
import { isUnlimitedEmail } from "@/lib/unlimited-access";

/**
 * InterviewAttempts — DAILY INTERVIEW CAP: max 2 interview simulations per
 * LOCAL calendar day, counted across B4 / Intermediate / Advanced together.
 *
 * A slot is consumed by the FIRST recorded answer of a run, never by opening
 * the screen. Refreshing or continuing the same run never spends a second
 * slot (identity = attempt id). `enforce_daily_interview_cap()` in Postgres is
 * the real boundary, which is what makes the cap hold across devices.
 */

export const DAILY_INTERVIEW_CAP = 2;

export type InterviewSimulator = "b4" | "intermediate" | "advanced";

export type InterviewAttempt = {
  id: string;
  simulator: InterviewSimulator;
  localDayKey: string;
  startedAt: string;
  firstRecordingAt: string | null;
  completedAt: string | null;
};

const PREFIX = "fluency-reps:interview-attempts:v1";
const ACTIVE_PREFIX = "fluency-reps:interview-attempt-active:v1";

let scope = "guest";

export function setInterviewAttemptScope(userId: string | null) {
  scope = userId ?? "guest";
}

function storeKey(): string {
  return `${PREFIX}:${scope}`;
}

function activeKey(simulator: InterviewSimulator): string {
  return `${ACTIVE_PREFIX}:${scope}:${simulator}`;
}

function readAll(): InterviewAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storeKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw) as InterviewAttempt[];
    return Array.isArray(parsed) ? parsed.filter((a) => a && typeof a.id === "string") : [];
  } catch {
    return [];
  }
}

function writeAll(attempts: InterviewAttempt[]) {
  if (typeof window === "undefined") return;
  try {
    const cutoff = localDayKey(new Date(Date.now() - 30 * 86400000));
    window.localStorage.setItem(storeKey(), JSON.stringify(attempts.filter((a) => a.localDayKey >= cutoff)));
  } catch {
    /* storage unavailable */
  }
}

function upsertLocal(attempt: InterviewAttempt) {
  const all = readAll();
  const index = all.findIndex((a) => a.id === attempt.id);
  if (index >= 0) all[index] = attempt;
  else all.push(attempt);
  writeAll(all);
}

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `ia-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

function countedToday(all: InterviewAttempt[]): InterviewAttempt[] {
  const today = localDayKey();
  return all.filter((a) => a.localDayKey === today && Boolean(a.firstRecordingAt));
}

export type InterviewCapStatus = {
  allowed: boolean;
  used: number;
  remaining: number;
  cap: number;
  /** Unlimited internal accounts never see the cap. */
  unlimited: boolean;
};

let unlimited = false;

export const InterviewAttempts = {
  cap: DAILY_INTERVIEW_CAP,

  /** Can a new interview run start (or the active one continue) right now? */
  status(activeId?: string | null): InterviewCapStatus {
    const all = readAll();
    const counted = countedToday(all);
    const resuming = Boolean(activeId && counted.some((a) => a.id === activeId));
    const used = counted.length;
    return {
      allowed: unlimited || resuming || used < DAILY_INTERVIEW_CAP,
      used,
      remaining: Math.max(0, DAILY_INTERVIEW_CAP - used),
      cap: DAILY_INTERVIEW_CAP,
      unlimited,
    };
  },

  /** Stable run id for this simulator; a new one is minted once the last run finished. */
  ensure(simulator: InterviewSimulator): InterviewAttempt {
    const all = readAll();
    const savedId = typeof window === "undefined" ? null : window.localStorage.getItem(activeKey(simulator));
    const existing = savedId ? all.find((a) => a.id === savedId) : undefined;
    if (existing && !existing.completedAt && existing.localDayKey === localDayKey()) return existing;

    const attempt: InterviewAttempt = {
      id: newId(),
      simulator,
      localDayKey: localDayKey(),
      startedAt: new Date().toISOString(),
      firstRecordingAt: null,
      completedAt: null,
    };
    upsertLocal(attempt);
    try {
      window.localStorage.setItem(activeKey(simulator), attempt.id);
    } catch {
      /* storage unavailable */
    }
    return attempt;
  },

  /**
   * Consumes ONE of today's 2 slots on the first recorded answer.
   * Idempotent per run. Returns false when the cap blocks the run — the
   * database is authoritative, so a rejected insert also returns false.
   */
  async consumeSlot(attemptId: string): Promise<boolean> {
    const all = readAll();
    const attempt = all.find((a) => a.id === attemptId);
    if (!attempt) return false;
    if (attempt.firstRecordingAt) return true; // refresh / resume — already counted
    if (!InterviewAttempts.status(attemptId).allowed) return false;

    const counted: InterviewAttempt = { ...attempt, firstRecordingAt: new Date().toISOString() };
    const { data } = await supabase.auth.getUser();
    const uid = data.user?.id;
    if (!uid) return false; // interviews require an account (sentence counting does too)

    const { error } = await supabase.from("interview_attempts").insert({
      id: counted.id,
      user_id: uid,
      simulator: counted.simulator,
      local_day_key: counted.localDayKey,
      started_at: counted.startedAt,
      first_recording_at: counted.firstRecordingAt,
    });
    if (error) {
      // Cap trigger (or any write failure) — do not let the run proceed.
      await InterviewAttempts.refresh();
      return false;
    }
    upsertLocal(counted);
    return true;
  },

  /** Marks the run finished so the next one mints a fresh id. */
  complete(attemptId: string) {
    const attempt = readAll().find((a) => a.id === attemptId);
    if (!attempt) return;
    const done: InterviewAttempt = { ...attempt, completedAt: new Date().toISOString() };
    upsertLocal(done);
    try {
      window.localStorage.removeItem(activeKey(attempt.simulator));
    } catch {
      /* storage unavailable */
    }
    if (!attempt.firstRecordingAt) return;
    void supabase.from("interview_attempts").update({ completed_at: done.completedAt }).eq("id", attemptId);
  },

  /** Authoritative today's count from the account (stops "2 on the phone, 2 on the laptop"). */
  async refresh(): Promise<InterviewCapStatus> {
    const { data: auth } = await supabase.auth.getUser();
    const uid = auth.user?.id;
    if (!uid) return InterviewAttempts.status();

    // UI-only hint. The database trigger is what actually exempts internal
    // accounts, so a spoofed local value cannot buy extra interviews.
    unlimited = isUnlimitedEmail(auth.user?.email ?? null);

    const since = localDayKey(new Date(Date.now() - 2 * 86400000));
    const { data, error } = await supabase
      .from("interview_attempts")
      .select("id, simulator, local_day_key, started_at, first_recording_at, completed_at")
      .eq("user_id", uid)
      .gte("local_day_key", since);
    if (error || !data) return InterviewAttempts.status();

    const merged = new Map(readAll().map((a) => [a.id, a]));
    for (const row of data) {
      merged.set(row.id, {
        id: row.id,
        simulator: row.simulator as InterviewSimulator,
        localDayKey: row.local_day_key,
        startedAt: row.started_at,
        firstRecordingAt: row.first_recording_at,
        completedAt: row.completed_at,
      });
    }
    writeAll([...merged.values()]);
    return InterviewAttempts.status();
  },

  /** Sign-out: nothing of this learner stays on the device. */
  clearLocalCache() {
    if (typeof window === "undefined") return;
    unlimited = false;
    try {
      const keys: string[] = [];
      for (let i = 0; i < window.localStorage.length; i += 1) {
        const key = window.localStorage.key(i);
        if (key?.startsWith(PREFIX) || key?.startsWith(ACTIVE_PREFIX)) keys.push(key);
      }
      keys.forEach((key) => window.localStorage.removeItem(key));
    } catch {
      /* storage unavailable */
    }
  },
};
