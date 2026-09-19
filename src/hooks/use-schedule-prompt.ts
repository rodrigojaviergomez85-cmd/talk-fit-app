import { useEffect, useState } from "react";
import { getPushSupport, notificationPermission } from "@/lib/push";
import {
  decidePrompt,
  loadPromptContext,
  markNewDevicePromptShown,
  markSchedulePrompted,
  newDevicePromptAllowed,
  type PracticeSchedule,
  type PromptDecision,
} from "@/services/practice-reminders";

/**
 * Decides which reminder card (if any) to show after finishing a day, and
 * records that it was shown so it never repeats.
 */
export function useSchedulePrompt(active: boolean): {
  decision: PromptDecision;
  schedule: PracticeSchedule | null;
  dismiss: () => void;
} {
  const [decision, setDecision] = useState<PromptDecision>("none");
  const [schedule, setSchedule] = useState<PracticeSchedule | null>(null);

  useEffect(() => {
    if (!active) return;
    let alive = true;
    void (async () => {
      const ctx = await loadPromptContext().catch(() => null);
      if (!ctx || !alive) return;
      const next = decidePrompt({
        ...ctx,
        pushSupport: getPushSupport(),
        permission: notificationPermission(),
        newDeviceAllowed: newDevicePromptAllowed(),
      });
      if (!alive || next === "none") return;
      setSchedule(ctx.schedule);
      setDecision(next);
      if (next === "new-device") markNewDevicePromptShown();
      else void markSchedulePrompted().catch(() => undefined);
    })();
    return () => {
      alive = false;
    };
  }, [active]);

  return { decision, schedule, dismiss: () => setDecision("none") };
}
