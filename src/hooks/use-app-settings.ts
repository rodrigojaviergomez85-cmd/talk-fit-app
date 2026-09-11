import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

/**
 * Global switches set by admins in /admin/limites. Readable by any signed-in
 * user; only admins can write (enforced by RLS).
 */
export type AppSettings = { limitsEnabled: boolean; billingEnabled: boolean; proMultiplier: number };

const DEFAULTS: AppSettings = { limitsEnabled: true, billingEnabled: true, proMultiplier: 4 };

export function useAppSettings(): AppSettings {
  const query = useQuery({
    queryKey: ["app-settings"],
    queryFn: async (): Promise<AppSettings> => {
      const { data, error } = await supabase
        .from("app_settings")
        .select("limits_enabled, billing_enabled, pro_multiplier")
        .eq("id", "global")
        .maybeSingle();
      if (error || !data) return DEFAULTS;
      return {
        limitsEnabled: data.limits_enabled,
        billingEnabled: data.billing_enabled,
        proMultiplier: data.pro_multiplier,
      };
    },
    staleTime: 60_000,
  });
  return query.data ?? DEFAULTS;
}
