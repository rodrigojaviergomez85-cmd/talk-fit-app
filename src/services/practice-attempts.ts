import { supabase } from "@/integrations/supabase/client";
import {
  canStartPractice,
  countedAttempts,
  practicesToday,
  DAILY_PRACTICE_CAP,
  type PracticeAttempt,
  type PracticeCapResult,
} from "@/lib/practice-cap";
import { isModuleId } from "./course-service";
import type { ModuleId } from "@/lib/types";

/**
 * PracticeAttempts — the PRACTICE ACTIVITY log, deliberately separate from
 * COURSE PROGRESS (JourneyService / day_progress).
 *
 * One row per real speaking session. Repeats of an already completed day are
 * recorded here and never touch curriculum progress. Local-first so the
 * counter is instant offline; the account rows are authoritative once synced,
 * which is what stops "5 on the phone, 5 more on the laptop".
 */

const PREFIX = "fluency-reps:practice-attempts:v1";
const ACTIVE_PREFIX = "fluency-reps:practice-attempt-active:v1";

let scope = "guest";

export function setPracticeAttemptScope(userId: string | null) {
  scope = userId ?? "guest";
}

function storeKey(): string {
  return `${PREFIX}:${scope}`;
}

function activeKey(moduleId: ModuleId, day: number): string {
  return `${ACTIVE_PREFIX}:${scope}:${moduleId}:${day}`;
}

/** Learner's LOCAL calendar date. Never UTC: El Salvador stays on Sep 7. */
export function localDayKey(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function readAll(): PracticeAttempt[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(storeKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw) as PracticeAttempt[];
    return Array.isArray(parsed) ? parsed.filter((a) => a && typeof a.id === "string") : [];
  } catch {
    return [];
  }
}

function writeAll(attempts: PracticeAttempt[]) {
  if (typeof window === "undefined") return;
  try {
    // Keep the log small: the cap only ever needs recent local dates.
    const cutoff = localDayKey(new Date(Date.now() - 30 * 86400000));
    window.localStorage.setItem(
      storeKey(),
      JSON.stringify(attempts.filter((a) => a.localDayKey >= cutoff)),
    );
  } catch {
    /* storage unavailable */
  }
}

function upsertLocal(attempt: PracticeAttempt) {
  const all = readAll();
  const index = all.findIndex((a) => a.id === attempt.id);
  if (index >= 0) all[index] = attempt;
  else all.push(attempt);
  writeAll(all);
}

function newId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return `pa-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;
}

export const PracticeAttempts = {
  localDayKey,

  all: readAll,

  /** Sessions that consumed a slot today (local date). */
  today(): PracticeAttempt[] {
    return countedAttempts(readAll(), localDayKey());
  },

  usedToday(): number {
    return practicesToday(readAll(), localDayKey());
  },

  /** Can a real speaking session run right now? `activeId` = session already paid for. */
  status(activeId?: string | null): PracticeCapResult {
    return canStartPractice(readAll(), localDayKey(), activeId ?? null);
  },

  /**
   * The practiceSessionId for this module/day. Stable across refresh and
   * resume: a new id is only minted once the previous session finished.
   */
  ensure(moduleId: ModuleId, day: number, userId: string | null): PracticeAttempt {
    const all = readAll();
    const savedId = typeof window === "undefined" ? null : window.localStorage.getItem(activeKey(moduleId, day));
    const existing = savedId ? all.find((a) => a.id === savedId) : undefined;
    if (existing && !existing.completedAt && existing.localDayKey === localDayKey()) return existing;

    const attempt: PracticeAttempt = {
      id: newId(),
      userId,
      moduleId,
      day,
      localDayKey: localDayKey(),
      startedAt: new Date().toISOString(),
      firstRecordingAt: null,
      completedAt: null,
      isFirstCompletion: false,
      speakingSeconds: 0,
      sentenceCount: null,
      recordingPath: null,
    };
    upsertLocal(attempt);
    try {
      window.localStorage.setItem(activeKey(moduleId, day), attempt.id);
    } catch {
      /* storage unavailable */
    }
    return attempt;
  },

  /**
   * Consumes ONE of today's 5 slots, on the learner's first real recording.
   * Idempotent: calling it again for the same session changes nothing.
   * Returns false when the session could not be counted (cap reached).
   */
  consumeSlot(attemptId: string): boolean {
    const all = readAll();
    const attempt = all.find((a) => a.id === attemptId);
    if (!attempt) return false;
    if (attempt.firstRecordingAt) return true; // refresh / resume — already counted

    const status = canStartPractice(all, localDayKey(), attemptId);
    if (!status.allowed) return false;

    const counted: PracticeAttempt = { ...attempt, firstRecordingAt: new Date().toISOString() };
    upsertLocal(counted);
    void PracticeAttempts.pushInsert(counted);
    return true;
  },

  /** Records the outcome of a finished session (progress lives elsewhere). */
  complete(
    attemptId: string,
    input: {
      isFirstCompletion: boolean;
      speakingSeconds: number;
      sentenceCount?: number | null;
      recordingPath?: string | null;
    },
  ) {
    const attempt = readAll().find((a) => a.id === attemptId);
    if (!attempt) return;
    const done: PracticeAttempt = {
      ...attempt,
      // A session can be completed without ever being counted only in odd
      // offline edge cases; treat completion as the fallback slot moment.
      firstRecordingAt: attempt.firstRecordingAt ?? new Date().toISOString(),
      completedAt: new Date().toISOString(),
      isFirstCompletion: input.isFirstCompletion,
      speakingSeconds: Math.round(input.speakingSeconds),
      sentenceCount: input.sentenceCount ?? null,
      recordingPath: input.recordingPath ?? null,
    };
    upsertLocal(done);
    try {
      window.localStorage.removeItem(activeKey(attempt.moduleId, attempt.day));
    } catch {
      /* storage unavailable */
    }
    void PracticeAttempts.pushUpdate(done);
  },

  /* -------------------------------- Cloud -------------------------------- */

  async pushInsert(attempt: PracticeAttempt): Promise<void> {
    const { data } = await supabase.auth.getUser();
    const uid = data.user?.id;
    if (!uid) return;
    const { error } = await supabase.from("practice_attempts").insert({
      id: attempt.id,
      user_id: uid,
      module_id: attempt.moduleId,
      day: attempt.day,
      local_day_key: attempt.localDayKey,
      started_at: attempt.startedAt,
      first_recording_at: attempt.firstRecordingAt,
    });
    if (error) console.error("[practice] attempt insert failed", error.message);
  },

  async pushUpdate(attempt: PracticeAttempt): Promise<void> {
    const { data } = await supabase.auth.getUser();
    const uid = data.user?.id;
    if (!uid) return;
    const { error } = await supabase.from("practice_attempts").upsert(
      {
        id: attempt.id,
        user_id: uid,
        module_id: attempt.moduleId,
        day: attempt.day,
        local_day_key: attempt.localDayKey,
        started_at: attempt.startedAt,
        first_recording_at: attempt.firstRecordingAt,
        completed_at: attempt.completedAt,
        is_first_completion: attempt.isFirstCompletion,
        speaking_seconds: attempt.speakingSeconds,
        sentence_count: attempt.sentenceCount,
        recording_path: attempt.recordingPath,
      },
      { onConflict: "id" },
    );
    if (error) console.error("[practice] attempt update failed", error.message);
  },

  /**
   * Authoritative count from the account, merged into the local cache, so the
   * cap holds when the learner switches device mid-day.
   */
  async pull(): Promise<PracticeAttempt[]> {
    const { data: auth } = await supabase.auth.getUser();
    const uid = auth.user?.id;
    if (!uid) return readAll();
    const since = localDayKey(new Date(Date.now() - 7 * 86400000));
    const { data, error } = await supabase
      .from("practice_attempts")
      .select(
        "id, module_id, day, local_day_key, started_at, first_recording_at, completed_at, is_first_completion, speaking_seconds, sentence_count, recording_path",
      )
      .eq("user_id", uid)
      .gte("local_day_key", since);
    if (error || !data) return readAll();

    const merged = new Map(readAll().map((a) => [a.id, a]));
    for (const row of data) {
      if (!isModuleId(row.module_id)) continue;
      merged.set(row.id, {
        id: row.id,
        userId: uid,
        moduleId: row.module_id,
        day: row.day,
        localDayKey: row.local_day_key,
        startedAt: row.started_at,
        firstRecordingAt: row.first_recording_at,
        completedAt: row.completed_at,
        isFirstCompletion: row.is_first_completion,
        speakingSeconds: row.speaking_seconds,
        sentenceCount: row.sentence_count,
        recordingPath: row.recording_path,
      });
    }
    const all = [...merged.values()];
    writeAll(all);
    return all;
  },

  /** Sign-out: nothing of this learner stays on the device. */
  clearLocalCache() {
    if (typeof window === "undefined") return;
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

export { DAILY_PRACTICE_CAP };
export type { PracticeAttempt, PracticeCapResult };
