import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { ReminderStats } from "./admin-reminders";

/** Admin-only, read-only reminder reach and follow-through. */
export const getReminderStats = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ReminderStats> => {
    const { data, error } = await context.supabase.rpc("admin_reminder_stats");
    if (error) throw new Error("Forbidden");
    return data as unknown as ReminderStats;
  });
