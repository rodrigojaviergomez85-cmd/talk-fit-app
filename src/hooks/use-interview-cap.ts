import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
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
  // Server-decided cap for this section (free, or free x4 with Pro).
  const usage = useDailyUsage(SECTION_KEYS.interview);
  const serverLimit = usage.limit;
  const refreshUsage = usage.refresh;

  useEffect(() => {
    if (serverLimit > 0) setEffectiveInterviewCap(serverLimit);
    let cancelled = false;
    void InterviewAttempts.refresh().then((next) => {
      if (!cancelled) setStatus(next);
    });
    return () => {
      cancelled = true;
    };
  }, [serverLimit]);

  /**
   * Call on the learner's first recorded answer. Returns false when the answer
   * cannot be counted. Only a REAL cap hit locks the simulator; sign-in or
   * network failures show a message and let the learner try again.
   */
  const consume = useCallback(async () => {
    if (!attemptId.current) attemptId.current = InterviewAttempts.ensure(simulator).id;
    const result = await InterviewAttempts.consumeSlot(attemptId.current);
    setStatus(InterviewAttempts.status(attemptId.current));
    void refreshUsage();
    if (result === "capped") {
      setBlocked(true);
    } else if (result === "auth") {
      toast.error("Inicia sesión para practicar la entrevista. Tu intento no se descontó.");
    } else if (result === "error") {
      toast.error("No pudimos guardar tu respuesta. Revisa tu conexión e inténtalo de nuevo.");
    }
    return result === "ok";
  }, [simulator, refreshUsage]);

  /** Call when the run ends so the next interview mints a fresh id. */
  const finish = useCallback(() => {
    if (attemptId.current) InterviewAttempts.complete(attemptId.current);
    attemptId.current = null;
  }, []);

  /** Attempt id for the server-side check (null until the slot is spent). */
  const currentAttemptId = () => attemptId.current;

  const capReached = blocked || (status !== null && !status.allowed && attemptId.current === null);

  return {
    status,
    capReached,
    consume,
    finish,
    currentAttemptId,
    limit: serverLimit > 0 ? serverLimit : (status?.cap ?? 0),
    isPro: usage.isPro,
  };
}
