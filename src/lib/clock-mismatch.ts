import { toast } from "sonner";
import { tPair } from "@/lib/i18n";
import { loadPreferences } from "@/services/preferences";

/**
 * The database rejects an attempt whose `local_day_key` is more than one day
 * away from server time — that can only happen on a device with a wrong clock.
 * This is the ONLY write error the learner is told about; everything else keeps
 * its current silent/log behaviour.
 *
 * Returns true when the error was the clock one (and a toast was shown).
 */
export function notifyIfClockMismatch(message: string | null | undefined): boolean {
  if (!message || !message.includes("INVALID_LOCAL_DAY_KEY")) return false;
  const es = loadPreferences().appLanguage === "es";
  const [titleEs, titleEn] = tPair("clock.mismatch.title");
  const [bodyEs, bodyEn] = tPair("clock.mismatch.body");
  toast.error(es ? titleEs : titleEn, { description: es ? bodyEs : bodyEn });
  return true;
}
