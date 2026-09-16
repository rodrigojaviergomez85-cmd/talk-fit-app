import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { DailyActivity } from "./admin-daily-activity";

const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Admin-only, read-only daily activity report.
 * The database function re-checks the admin role, so no learner data can leak
 * even if this endpoint is called directly.
 */
export const getAdminDailyActivity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { from: string; to: string }) => {
    if (!DAY_RE.test(input.from) || !DAY_RE.test(input.to)) throw new Error("Invalid range");
    if (input.to < input.from) throw new Error("Invalid range");
    return input;
  })
  .handler(async ({ data, context }): Promise<DailyActivity> => {
    const { data: rows, error } = await context.supabase.rpc("admin_daily_activity", {
      _from: data.from,
      _to: data.to,
    });
    if (error) throw new Error("Forbidden");
    return rows as unknown as DailyActivity;
  });
