/**
 * Admin control panel for daily limits and billing.
 *
 * Admin status is always re-checked against `user_roles` with the id from the
 * verified server session — never with a flag sent by the client.
 */
import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AdminSectionRow = {
  sectionKey: string;
  label: string;
  freeLimit: number;
  enabled: boolean;
  sortOrder: number;
};

export type AdminSettings = {
  limitsEnabled: boolean;
  billingEnabled: boolean;
  proMultiplier: number;
  updatedAt: string | null;
  updatedByEmail: string | null;
  sections: AdminSectionRow[];
  audit: { field: string; scope: string; oldValue: string | null; newValue: string | null; email: string | null; at: string }[];
};

type Ctx = { userId: string; claims: Record<string, unknown> };

async function assertAdmin(context: Ctx) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.rpc("is_admin", { p_user_id: context.userId });
  if (data !== true) throw new Error("403: solo administradores");
  return supabaseAdmin;
}

export const getAdminSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminSettings> => {
    const supabaseAdmin = await assertAdmin(context);

    const [settings, sections, audit] = await Promise.all([
      supabaseAdmin.from("app_settings").select("*").eq("id", "global").maybeSingle(),
      supabaseAdmin.from("section_limits").select("section_key, label, free_limit, enabled, sort_order").order("sort_order", { ascending: true }),
      supabaseAdmin
        .from("settings_audit_log")
        .select("field, scope, old_value, new_value, changed_by_email, created_at")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);

    let updatedByEmail: string | null = null;
    if (settings.data?.updated_by) {
      const { data: userRes } = await supabaseAdmin.auth.admin.getUserById(settings.data.updated_by);
      updatedByEmail = userRes?.user?.email ?? null;
    }

    return {
      limitsEnabled: settings.data?.limits_enabled ?? true,
      billingEnabled: settings.data?.billing_enabled ?? true,
      proMultiplier: settings.data?.pro_multiplier ?? 4,
      updatedAt: settings.data?.updated_at ?? null,
      updatedByEmail,
      sections: (sections.data ?? []).map((s) => ({
        sectionKey: s.section_key,
        label: s.label,
        freeLimit: s.free_limit,
        enabled: s.enabled ?? true,
        sortOrder: s.sort_order ?? 0,
      })),
      audit: (audit.data ?? []).map((a) => ({
        field: a.field,
        scope: a.scope,
        oldValue: a.old_value,
        newValue: a.new_value,
        email: a.changed_by_email,
        at: a.created_at,
      })),
    };
  });

export type UpdateAdminSettingsInput = {
  limitsEnabled: boolean;
  billingEnabled: boolean;
  proMultiplier: number;
  sections: { sectionKey: string; freeLimit: number; enabled: boolean }[];
};

const isInt = (n: unknown, min: number, max: number) =>
  typeof n === "number" && Number.isInteger(n) && n >= min && n <= max;

export const updateAdminSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: UpdateAdminSettingsInput) => {
    if (!input || typeof input !== "object") throw new Error("Datos inválidos");
    if (typeof input.limitsEnabled !== "boolean" || typeof input.billingEnabled !== "boolean") {
      throw new Error("Los interruptores deben ser verdadero o falso");
    }
    if (!isInt(input.proMultiplier, 1, 100)) throw new Error("El multiplicador Pro debe ser un entero entre 1 y 100");
    if (!Array.isArray(input.sections)) throw new Error("Secciones inválidas");
    for (const s of input.sections) {
      if (!s || typeof s.sectionKey !== "string" || !s.sectionKey) throw new Error("Sección inválida");
      if (!isInt(s.freeLimit, 0, 10000)) throw new Error(`El límite gratuito de ${s.sectionKey} debe ser un entero entre 0 y 10000`);
      if (typeof s.enabled !== "boolean") throw new Error("Interruptor de sección inválido");
    }
    return input;
  })
  .handler(async ({ data, context }): Promise<{ ok: true }> => {
    const supabaseAdmin = await assertAdmin(context);
    const email = typeof context.claims["email"] === "string" ? (context.claims["email"] as string) : null;

    // One transaction in Postgres: switches, multiplier, every section and the
    // audit trail are saved together or not at all. It re-checks the admin role
    // with the id from the verified session.
    const { error } = await supabaseAdmin.rpc("apply_admin_settings", {
      _admin_id: context.userId,
      _admin_email: email,
      _limits_enabled: data.limitsEnabled,
      _billing_enabled: data.billingEnabled,
      _pro_multiplier: data.proMultiplier,
      _sections: data.sections as never,
    });
    if (error) {
      console.error("[admin-settings] apply failed", error.message);
      throw new Error("No se pudieron guardar los ajustes. No se cambió nada.");
    }
    return { ok: true };
  });
