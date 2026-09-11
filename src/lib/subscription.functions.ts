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
