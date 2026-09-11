/**
 * Per-section limits and usage — server authoritative.
 *
 * The caps come from `section_limits` and are multiplied by 4 for active
 * subscribers inside Postgres (`get_daily_limit` / `get_section_usage`).
 * The user id always comes from the verified session, never from the client.
 */
import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type SectionUsage = {
  sectionKey: string;
  label: string;
  freeLimit: number;
  limit: number;
  used: number;
  monthlyLimit: number | null;
  monthlyUsed: number;
  isPro: boolean;
  unlimited: boolean;
};

export type SectionLimitRow = {
  sectionKey: string;
  label: string;
  freeLimit: number;
  proLimit: number;
  sortOrder: number;
};

/** All sections with their free / Pro caps — used by the limit dialog table. */
export const listSectionLimits = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async (): Promise<SectionLimitRow[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ data, error }, settings] = await Promise.all([
      supabaseAdmin
        .from("section_limits")
        .select("section_key, label, free_limit, sort_order")
        .order("sort_order", { ascending: true }),
      supabaseAdmin.from("app_settings").select("pro_multiplier").eq("id", "global").maybeSingle(),
    ]);
    if (error || !data) return [];
    // The multiplier is the admin-editable one, never a constant in the code.
    const multiplier = settings.data?.pro_multiplier ?? 4;
    return data.map((row) => ({
      sectionKey: row.section_key,
      label: row.label,
      freeLimit: row.free_limit,
      proLimit: row.free_limit * multiplier,
      sortOrder: row.sort_order ?? 0,
    }));
  });

/** Usage + effective cap for one section, for the signed-in learner. */
export const getSectionUsage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { sectionKey: string; localDayKey: string }) => {
    if (!input || typeof input.sectionKey !== "string" || typeof input.localDayKey !== "string") {
      throw new Error("sectionKey y localDayKey son obligatorios");
    }
    return { sectionKey: input.sectionKey, localDayKey: input.localDayKey };
  })
  .handler(async ({ data, context }): Promise<SectionUsage | null> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows, error } = await supabaseAdmin.rpc("get_section_usage", {
      _user_id: context.userId,
      _section_key: data.sectionKey,
      _local_day_key: data.localDayKey,
    });
    if (error) {
      console.error("[limits] get_section_usage failed", error.message);
      return null;
    }
    const row = Array.isArray(rows) ? rows[0] : rows;
    if (!row) return null;
    return {
      sectionKey: row.section_key,
      label: row.label,
      freeLimit: row.free_limit,
      limit: row.day_limit,
      used: row.day_used,
      monthlyLimit: row.month_limit ?? null,
      monthlyUsed: row.month_used ?? 0,
      isPro: row.is_pro,
      unlimited: row.unlimited,
    };
  });
