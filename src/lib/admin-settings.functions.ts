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

    const { data: before } = await supabaseAdmin
      .from("app_settings")
      .select("limits_enabled, billing_enabled, pro_multiplier")
      .eq("id", "global")
      .maybeSingle();
    const { data: sectionsBefore } = await supabaseAdmin
      .from("section_limits")
      .select("section_key, free_limit, enabled");

    const audit: {
      changed_by: string;
      changed_by_email: string | null;
      scope: string;
      field: string;
      old_value: string | null;
      new_value: string | null;
    }[] = [];
    const track = (scope: string, field: string, oldV: unknown, newV: unknown) => {
      if (String(oldV) === String(newV)) return;
      audit.push({
        changed_by: context.userId,
        changed_by_email: email,
        scope,
        field,
        old_value: oldV === null || oldV === undefined ? null : String(oldV),
        new_value: newV === null || newV === undefined ? null : String(newV),
      });
    };

    track("app_settings", "limits_enabled", before?.limits_enabled, data.limitsEnabled);
    track("app_settings", "billing_enabled", before?.billing_enabled, data.billingEnabled);
    track("app_settings", "pro_multiplier", before?.pro_multiplier, data.proMultiplier);

    const { error: settingsError } = await supabaseAdmin
      .from("app_settings")
      .update({
        limits_enabled: data.limitsEnabled,
        billing_enabled: data.billingEnabled,
        pro_multiplier: data.proMultiplier,
        updated_by: context.userId,
        updated_at: new Date().toISOString(),
      })
      .eq("id", "global");
    if (settingsError) throw new Error("No se pudieron guardar los ajustes generales");

    for (const section of data.sections) {
      const prev = (sectionsBefore ?? []).find((s) => s.section_key === section.sectionKey);
      if (!prev) continue;
      track(section.sectionKey, "free_limit", prev.free_limit, section.freeLimit);
      track(section.sectionKey, "enabled", prev.enabled, section.enabled);
      const { error } = await supabaseAdmin
        .from("section_limits")
        .update({ free_limit: section.freeLimit, enabled: section.enabled, updated_at: new Date().toISOString() })
        .eq("section_key", section.sectionKey);
      if (error) throw new Error(`No se pudo guardar la sección ${section.sectionKey}`);
    }

    if (audit.length > 0) await supabaseAdmin.from("settings_audit_log").insert(audit);
    return { ok: true };
  });
