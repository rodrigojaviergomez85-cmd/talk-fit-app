/**
 * Account view server functions: consumption, billing and the Stripe portal.
 *
 * Everything here takes the user id from the verified session (never from the
 * client) and runs server-side only.
 */
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type AccountSection = {
  sectionKey: string;
  label: string;
  freeLimit: number;
  proLimit: number;
  limit: number;
  used: number;
  isPro: boolean;
  unlimited: boolean;
  enabled: boolean;
};

export type PaymentRow = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  paidAt: string | null;
  periodStart: string | null;
  periodEnd: string | null;
  hostedInvoiceUrl: string | null;
  invoicePdf: string | null;
};

export type AccountOverview = {
  settings: { limitsEnabled: boolean; billingEnabled: boolean; proMultiplier: number };
  subscription: {
    exists: boolean;
    subscribed: boolean;
    status: string | null;
    currentPeriodEnd: string | null;
    cancelAtPeriodEnd: boolean;
    hasCustomer: boolean;
  };
  sections: AccountSection[];
  history: { dayKey: string; sectionKey: string; used: number }[];
  payments: PaymentRow[];
  isAdmin: boolean;
};

export const getAccountOverview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { localDayKey: string }) => {
    if (!input || typeof input.localDayKey !== "string") throw new Error("localDayKey es obligatorio");
    return { localDayKey: input.localDayKey };
  })
  .handler(async ({ data, context }): Promise<AccountOverview> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const userId = context.userId;

    const [settingsRes, limitsRes, subRes, paymentsRes, historyRes, adminRes] = await Promise.all([
      supabaseAdmin.from("app_settings").select("limits_enabled, billing_enabled, pro_multiplier").eq("id", "global").maybeSingle(),
      supabaseAdmin.from("section_limits").select("section_key, label, free_limit, sort_order, enabled").order("sort_order", { ascending: true }),
      supabaseAdmin
        .from("subscribers")
        .select("subscribed, status, current_period_end, cancel_at_period_end, stripe_customer_id")
        .eq("user_id", userId)
        .maybeSingle(),
      supabaseAdmin
        .from("subscription_payments")
        .select("id, amount, currency, status, paid_at, period_start, period_end, hosted_invoice_url, invoice_pdf")
        .eq("user_id", userId)
        .order("paid_at", { ascending: false })
        .limit(50),
      supabaseAdmin.rpc("get_usage_history", { _user_id: userId, _days: 7 }),
      supabaseAdmin.rpc("is_admin", { p_user_id: userId }),
    ]);

    const multiplier = settingsRes.data?.pro_multiplier ?? 4;

    // Per-section usage comes from the same authoritative RPC the caps use.
    const rows = limitsRes.data ?? [];
    const sections: AccountSection[] = [];
    for (const row of rows) {
      const { data: usage } = await supabaseAdmin.rpc("get_section_usage", {
        _user_id: userId,
        _section_key: row.section_key,
        _local_day_key: data.localDayKey,
      });
      const u = Array.isArray(usage) ? usage[0] : usage;
      sections.push({
        sectionKey: row.section_key,
        label: row.label,
        freeLimit: row.free_limit,
        proLimit: row.free_limit * multiplier,
        limit: u?.day_limit ?? row.free_limit,
        used: u?.day_used ?? 0,
        isPro: u?.is_pro ?? false,
        unlimited: u?.unlimited ?? false,
        enabled: row.enabled ?? true,
      });
    }

    return {
      settings: {
        limitsEnabled: settingsRes.data?.limits_enabled ?? true,
        billingEnabled: settingsRes.data?.billing_enabled ?? true,
        proMultiplier: multiplier,
      },
      subscription: {
        exists: Boolean(subRes.data),
        subscribed: subRes.data?.subscribed ?? false,
        status: subRes.data?.status ?? null,
        currentPeriodEnd: subRes.data?.current_period_end ?? null,
        cancelAtPeriodEnd: subRes.data?.cancel_at_period_end ?? false,
        hasCustomer: Boolean(subRes.data?.stripe_customer_id),
      },
      sections,
      history: (historyRes.data ?? []).map((h: { day_key: string; section_key: string; used: number }) => ({
        dayKey: h.day_key,
        sectionKey: h.section_key,
        used: h.used,
      })),
      payments: (paymentsRes.data ?? []).map((p) => ({
        id: p.id,
        amount: p.amount,
        currency: p.currency,
        status: p.status,
        paidAt: p.paid_at,
        periodStart: p.period_start,
        periodEnd: p.period_end,
        hostedInvoiceUrl: p.hosted_invoice_url,
        invoicePdf: p.invoice_pdf,
      })),
      isAdmin: adminRes.data === true,
    };
  });

/** Stripe Customer Portal: card, cancellation and reactivation live there. */
export const customerPortal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<{ url: string }> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("subscribers")
      .select("stripe_customer_id")
      .eq("user_id", context.userId)
      .maybeSingle();

    const customerId = row?.stripe_customer_id ?? null;
    if (!customerId) {
      throw new Error("Todavía no tienes una suscripción con nosotros. Suscríbete para administrar tu facturación.");
    }

    const request = getRequest();
    const origin =
      request?.headers.get("origin") ??
      (request?.url ? new URL(request.url).origin : null) ??
      "https://fluencye4cc.app";

    const { getStripe } = await import("./stripe.server");
    const session = await getStripe().billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/cuenta`,
    });
    return { url: session.url };
  });
