/**
 * Stripe subscription server functions (step 1: checkout session creation).
 *
 * Runs server-side only: the Stripe secret key and price id are read from the
 * encrypted secret store inside the handler, never in client code.
 */
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type CreateCheckoutResult = { url: string };

export const createCheckoutSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<CreateCheckoutResult> => {
    const email = typeof context.claims["email"] === "string" ? (context.claims["email"] as string) : null;
    if (!email) throw new Error("No email found for this account");

    const request = getRequest();
    const origin =
      request?.headers.get("origin") ??
      (request?.url ? new URL(request.url).origin : null) ??
      "https://fluencye4cc.app";

    const { getStripe, getPriceId } = await import("./stripe.server");
    const stripe = getStripe();

    // Reuse an existing Stripe customer when the email already has one.
    let customerId: string | undefined;
    try {
      const existing = await stripe.customers.list({ email, limit: 1 });
      customerId = existing.data[0]?.id;
    } catch (error) {
      console.error("[stripe] customer lookup failed", error instanceof Error ? error.message : error);
    }

    try {
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: getPriceId(), quantity: 1 }],
        ...(customerId ? { customer: customerId } : { customer_email: email }),
        client_reference_id: context.userId,
        subscription_data: { metadata: { supabase_user_id: context.userId } },
        metadata: { supabase_user_id: context.userId },
        allow_promotion_codes: true,
        success_url: `${origin}/suscripcion/exito?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/suscripcion/cancelado`,
      });

      if (!session.url) throw new Error("Stripe did not return a checkout URL");
      return { url: session.url };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown Stripe error";
      console.error("[stripe] checkout session failed", message);
      throw new Error(`No se pudo iniciar el pago: ${message}`);
    }
  });

export type SubscriptionState = {
  subscribed: boolean;
  status: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
};

/**
 * Live safety net: reads the real state from Stripe for the SIGNED-IN user
 * (never a client-supplied id) and re-syncs `subscribers`, in case a webhook
 * delivery was missed.
 */
export const checkSubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<SubscriptionState> => {
    const userId = context.userId;
    const email = typeof context.claims["email"] === "string" ? (context.claims["email"] as string) : null;

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("subscribers")
      .select("stripe_customer_id, subscribed, status, current_period_end, cancel_at_period_end")
      .eq("user_id", userId)
      .maybeSingle();

    const fallback: SubscriptionState = {
      subscribed: row?.subscribed ?? false,
      status: row?.status ?? null,
      current_period_end: row?.current_period_end ?? null,
      cancel_at_period_end: row?.cancel_at_period_end ?? false,
    };

    try {
      const { getStripe } = await import("./stripe.server");
      const stripe = getStripe();

      let customerId = row?.stripe_customer_id ?? null;
      if (!customerId && email) {
        const found = await stripe.customers.list({ email, limit: 1 });
        customerId = found.data[0]?.id ?? null;
      }
      if (!customerId) return fallback;

      const subs = await stripe.subscriptions.list({ customer: customerId, status: "all", limit: 10 });
      const active =
        subs.data.find((s) => s.status === "active" || s.status === "trialing") ??
        subs.data.sort((a, b) => b.created - a.created)[0];
      if (!active) return fallback;

      const sync = await import("./stripe-sync.server");
      await sync.syncSubscription(stripe, active, { userId, email: email ?? "" });
      const period = sync.subscriptionPeriod(active);

      return {
        subscribed: active.status === "active" || active.status === "trialing",
        status: active.status,
        current_period_end: period.end,
        cancel_at_period_end: active.cancel_at_period_end ?? false,
      };
    } catch (error) {
      console.error("[stripe] checkSubscription failed", error instanceof Error ? error.message : error);
      return fallback;
    }
  });
