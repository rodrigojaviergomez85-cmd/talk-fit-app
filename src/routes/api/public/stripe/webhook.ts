/**
 * Stripe webhook — the one endpoint that cannot be a session-protected server
 * function, because Stripe calls it with no user session. Authentication is the
 * signature over the RAW body, verified with STRIPE_WEBHOOK_SECRET.
 *
 * Lives under /api/public/* so the published site's auth layer never
 * intercepts it (a 302/401 would make Stripe mark the endpoint as down).
 */
import { createFileRoute } from "@tanstack/react-router";
import type Stripe from "stripe";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });
}

export const Route = createFileRoute("/api/public/stripe/webhook")({
  server: {
    handlers: {
      GET: async () => new Response("Method Not Allowed", { status: 405 }),
      PUT: async () => new Response("Method Not Allowed", { status: 405 }),
      DELETE: async () => new Response("Method Not Allowed", { status: 405 }),
      POST: async ({ request }) => {
        const secret = process.env["STRIPE_WEBHOOK_SECRET"];
        if (!secret) {
          console.error("[stripe-webhook] missing STRIPE_WEBHOOK_SECRET");
          return json({ error: "Webhook not configured" }, 500);
        }

        const signature = request.headers.get("stripe-signature");
        if (!signature) return json({ error: "Missing stripe-signature" }, 400);

        // RAW body: never parse before verifying, or the signature always fails.
        const payload = await request.text();

        const { getStripe } = await import("@/lib/stripe.server");
        const stripe = getStripe();

        let event: Stripe.Event;
        try {
          // Web Crypto runtime -> async verification.
          event = await stripe.webhooks.constructEventAsync(payload, signature, secret);
        } catch (error) {
          const message = error instanceof Error ? error.message : "invalid signature";
          console.error("[stripe-webhook] signature verification failed:", message);
          return json({ error: "Invalid signature" }, 400);
        }

        console.log(`[stripe-webhook] received ${event.type} (${event.id})`);

        const sync = await import("@/lib/stripe-sync.server");

        try {
          if (await sync.claimEvent(event.id, event.type)) {
            console.log(`[stripe-webhook] duplicate ${event.id}, skipping`);
            return json({ received: true, duplicate: true });
          }

          switch (event.type) {
            case "checkout.session.completed": {
              const session = event.data.object;
              const subRef = session.subscription;
              const subscriptionId = typeof subRef === "string" ? subRef : (subRef?.id ?? null);
              if (!subscriptionId) break;
              const subscription = await stripe.subscriptions.retrieve(subscriptionId);
              const userId =
                session.client_reference_id ?? session.metadata?.["supabase_user_id"] ?? null;
              const resolved = await sync.resolveUserId(stripe, {
                metadataUserId: userId,
                customerId:
                  typeof session.customer === "string" ? session.customer : (session.customer?.id ?? null),
                email: session.customer_details?.email ?? session.customer_email ?? null,
              });
              if (!resolved) throw new Error(`Unresolved user for session ${session.id}`);
              await sync.syncSubscription(stripe, subscription, resolved);
              break;
            }

            case "customer.subscription.created":
            case "customer.subscription.updated": {
              await sync.syncSubscription(stripe, event.data.object);
              break;
            }

            case "customer.subscription.deleted": {
              await sync.markCanceled(event.data.object.id);
              break;
            }

            case "invoice.paid": {
              await sync.recordInvoice(stripe, event.data.object);
              break;
            }

            case "invoice.payment_failed": {
              const invoice = event.data.object as unknown as {
                subscription?: string | { id: string } | null;
                parent?: { subscription_details?: { subscription?: string | { id: string } | null } | null } | null;
              };
              const subRef = invoice.subscription ?? invoice.parent?.subscription_details?.subscription ?? null;
              const subscriptionId = typeof subRef === "string" ? subRef : (subRef?.id ?? null);
              if (subscriptionId) await sync.markPastDue(subscriptionId);
              break;
            }

            default:
              break;
          }

          return json({ received: true });
        } catch (error) {
          const message = error instanceof Error ? error.message : "processing failed";
          console.error(`[stripe-webhook] ${event.type} (${event.id}) failed:`, message);
          // 500 so Stripe retries — never swallow the failure with a 200.
          return json({ error: message }, 500);
        }
      },
    },
  },
});
