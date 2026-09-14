import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { HealthSnapshot } from "./admin-alerts";

/**
 * Admin-only, read-only cost/health snapshot. The database function re-checks
 * the admin role itself, so a signed-in learner gets nothing.
 */
export const getHealthSnapshot = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<HealthSnapshot> => {
    const { data, error } = await context.supabase.rpc("admin_health_snapshot");
    if (error) throw new Error("Forbidden");
    return data as unknown as HealthSnapshot;
  });

/** Admin-only threshold change. RLS on `alert_thresholds` enforces the role. */
export const saveThreshold = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { key: string; warn: number; critical: number }) => {
    if (!input.key) throw new Error("Missing key");
    if (!Number.isFinite(input.warn) || !Number.isFinite(input.critical)) throw new Error("Invalid numbers");
    if (input.warn < 0 || input.critical < 0) throw new Error("Invalid numbers");
    return input;
  })
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("alert_thresholds")
      .update({ warn: data.warn, critical: data.critical })
      .eq("key", data.key);
    if (error) throw new Error("Could not save threshold");
    return { ok: true };
  });
