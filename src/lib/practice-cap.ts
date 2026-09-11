import type { ModuleId } from "./types";

/**
 * DAILY PRACTICE CAP — maximum 5 practice sessions per LOCAL calendar day.
 *
 * A "practice session" is one real speaking session. It may be a new
 * curriculum day, a repeat of a completed day, or the SAME day repeated
 * several times — all of them consume exactly one of the 5 slots.
 *
 * WHY: deliberate repetition is encouraged, cramming is not. Spaced practice
 * teaches better, 180 days of curriculum should not be burned through in a
 * month, and a hard ceiling of 5 real sessions also caps the paid audio/AI
 * work a single learner can trigger per day.
 *
 * A slot is consumed when the learner makes the FIRST required recording of a
 * session — never by opening a lesson and leaving. Refreshing or resuming the
 * SAME session never consumes another slot (identity = practiceSessionId).
 *
 * This module is pure UX logic. `enforce_daily_practice_cap()` in Postgres is
 * the real boundary and is what makes the cap hold across devices.
 */

/** FREE tier default. The effective cap is free x4 for Pro subscribers. */
export const DAILY_PRACTICE_CAP = 5;

let effectiveCap = DAILY_PRACTICE_CAP;

/** Set from the server-decided limit (`useDailyUsage("practice")`). */
export function setEffectivePracticeCap(cap: number): void {
  if (Number.isFinite(cap) && cap > 0) effectiveCap = Math.floor(cap);
}

export function effectivePracticeCap(): number {
  return effectiveCap;
}

/** One real practice session (first completion OR repeat) of one curriculum day. */
export type PracticeAttempt = {
  /** Stable practiceSessionId (UUID). Never regenerated on refresh/resume. */
  id: string;
  userId: string | null;
  moduleId: ModuleId;
  day: number;
  /** Learner's LOCAL calendar date (YYYY-MM-DD), never UTC. */
  localDayKey: string;
  startedAt: string;
  /** Set once — the moment the slot is consumed. */
  firstRecordingAt: string | null;
  completedAt: string | null;
  /** True only for the very first ever completion of this curriculum day. */
  isFirstCompletion: boolean;
  speakingSeconds: number;
  sentenceCount: number | null;
  recordingPath: string | null;
};

/** Sessions that actually consumed a slot on the given local date. */
export function countedAttempts(attempts: PracticeAttempt[], localDayKey: string): PracticeAttempt[] {
  return attempts.filter((a) => a.localDayKey === localDayKey && Boolean(a.firstRecordingAt));
}

export function practicesToday(attempts: PracticeAttempt[], localDayKey: string): number {
  return countedAttempts(attempts, localDayKey).length;
}

export type PracticeCapResult = {
  allowed: boolean;
  used: number;
  remaining: number;
  cap: number;
};

/**
 * Can the learner start (or continue) a real speaking session right now?
 *
 * `activeAttemptId` is the session already in progress on this screen: it has
 * already paid for its slot, so a refresh or resume stays allowed even at 5/5.
 */
export function canStartPractice(
  attempts: PracticeAttempt[],
  localDayKey: string,
  activeAttemptId?: string | null,
): PracticeCapResult {
  const counted = countedAttempts(attempts, localDayKey);
  const used = counted.length;
  const resuming = Boolean(activeAttemptId && counted.some((a) => a.id === activeAttemptId));
  const cap = effectivePracticeCap();
  return {
    allowed: resuming || used < cap,
    used,
    remaining: Math.max(0, cap - used),
    cap,
  };
}

/** Coach view: today's practice in order, each labelled NEW or REPEAT. */
export function todaysPracticeLog(
  attempts: PracticeAttempt[],
  localDayKey: string,
): { moduleId: ModuleId; day: number; kind: "new" | "repeat"; at: string }[] {
  return countedAttempts(attempts, localDayKey)
    .slice()
    .sort((a, b) => new Date(a.firstRecordingAt!).getTime() - new Date(b.firstRecordingAt!).getTime())
    .map((a) => ({
      moduleId: a.moduleId,
      day: a.day,
      kind: a.isFirstCompletion ? ("new" as const) : ("repeat" as const),
      at: a.firstRecordingAt!,
    }));
}
