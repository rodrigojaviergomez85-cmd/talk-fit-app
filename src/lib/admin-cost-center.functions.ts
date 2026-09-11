import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { AdminCostCenter } from "./admin-cost-center";

/**
 * Admin-only, read-only usage/cost aggregates.
 * The database function re-checks the admin role itself.
 */
export const getAdminCostCenter = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminCostCenter> => {
    const { data, error } = await context.supabase.rpc("admin_cost_center");
    if (error) throw new Error("Forbidden");
    return data as unknown as AdminCostCenter;
  });
