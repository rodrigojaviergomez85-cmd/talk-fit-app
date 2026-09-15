import { supabase } from "@/integrations/supabase/client";
import { FINAL_RETENTION_DAYS } from "@/lib/storage-report";
import type { CoachCheckDayPayload } from "@/components/fluency/coach/DaySummary";

/**
 * Coach Check counts come from the server (`coach_check_day`), which runs
 * under the caller's own row level security and counts rows, not files, so
 * deleting expired audio never changes what a coach sees.
 */
export async function fetchCoachCheckDay(dayKey: string): Promise<CoachCheckDayPayload | null> {
  const rpc = supabase.rpc as unknown as (
    fn: string,
    args: Record<string, unknown>,
  ) => Promise<{ data: unknown; error: unknown }>;
  const { data, error } = await rpc("coach_check_day", {
    _day_key: dayKey,
    _retention_days: FINAL_RETENTION_DAYS,
  });
  if (error || !data || typeof data !== "object") return null;
  return data as CoachCheckDayPayload;
}
