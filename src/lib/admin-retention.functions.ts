import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { RetentionData } from "./admin-retention";

/**
 * Admin-only, read-only weekly cohort retention and north-star number.
 * The database function re-checks the admin role, so a learner gets nothing.
 */
export const getRetentionCohorts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<RetentionData> => {
    const { data, error } = await context.supabase.rpc("admin_retention_cohorts");
    if (error) throw new Error("Forbidden");
    return data as unknown as RetentionData;
  });
