import { useCallback, useEffect, useRef, useState } from "react";
import {
  InterviewAttempts,
  setEffectiveInterviewCap,
  type InterviewCapStatus,
  type InterviewSimulator,
} from "@/services/interview-attempts";
import { useDailyUsage } from "@/hooks/use-daily-usage";
import { SECTION_KEYS } from "@/config/limits";

/**
 * DAILY INTERVIEW CAP — 2 interview runs per local calendar day, shared by the
 * B4, Intermediate and Advanced simulators.
 *
 * The slot is spent on the FIRST recorded answer of a run, never by opening the
 * screen; refreshing or continuing the same run costs nothing extra. The
 * database trigger is authoritative, so a rejected write blocks the run too.
 */
export function useInterviewCap(simulator: InterviewSimulator) {
  const [status, setStatus] = useState<InterviewCapStatus | null>(null);
  const [blocked, setBlocked] = useState(false);
  const attemptId = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void InterviewAttempts.refresh().then((next) => {
      if (!cancelled) setStatus(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  /** Call on the learner's first recorded answer. Returns false when blocked. */
  const consume = useCallback(async () => {
    if (!attemptId.current) attemptId.current = InterviewAttempts.ensure(simulator).id;
    const ok = await InterviewAttempts.consumeSlot(attemptId.current);
    setStatus(InterviewAttempts.status(attemptId.current));
    if (!ok) setBlocked(true);
    return ok;
  }, [simulator]);

  /** Call when the run ends so the next interview mints a fresh id. */
  const finish = useCallback(() => {
    if (attemptId.current) InterviewAttempts.complete(attemptId.current);
    attemptId.current = null;
  }, []);

  /** Attempt id for the server-side check (null until the slot is spent). */
  const currentAttemptId = () => attemptId.current;

  const capReached = blocked || (status !== null && !status.allowed && attemptId.current === null);

  return { status, capReached, consume, finish, currentAttemptId };
}
