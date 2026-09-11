import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { AdminMetrics } from "./admin-metrics";

/**
 * Admin-only, read-only engagement metrics.
 * The database function itself re-checks the admin role, so no cross-learner
 * data can leak even if this endpoint is called directly.
 */
export const getAdminMetrics = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminMetrics> => {
    const { data, error } = await context.supabase.rpc("admin_engagement_metrics");
    if (error) throw new Error("Forbidden");
    return data as unknown as AdminMetrics;
  });
