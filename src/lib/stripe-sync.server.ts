/**
 * Server-only Stripe -> Supabase synchronisation.
 *
 * Every write here uses the service-role client: the `subscribers` and
 * `subscription_payments` tables are read-only for learners, so being "Pro"
 * can only ever be granted by verified Stripe data.
 */
import type Stripe from "stripe";

const ACTIVE_STATUSES = new Set(["active", "trialing"]);

function toIso(seconds: number | null | undefined): string | null {
  return typeof seconds === "number" && Number.isFinite(seconds)
    ? new Date(seconds * 1000).toISOString()
    : null;
}

/** Period lives on the subscription in older API versions and on the item in newer ones. */
export function subscriptionPeriod(sub: Stripe.Subscription): { start: string | null; end: string | null } {
  const raw = sub as unknown as { current_period_start?: number; current_period_end?: number };
  const item = sub.items?.data?.[0] as unknown as
    | { current_period_start?: number; current_period_end?: number }
    | undefined;
  return {
    start: toIso(raw.current_period_start ?? item?.current_period_start),
    end: toIso(raw.current_period_end ?? item?.current_period_end),
  };
}

type AdminClient = Awaited<typeof import("@/integrations/supabase/client.server")>["supabaseAdmin"];

async function admin(): Promise<AdminClient> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  return supabaseAdmin;
}

/** Resolve the app user for a Stripe subscription: metadata first, then email match. */
export async function resolveUserId(
  stripe: Stripe,
  opts: { metadataUserId?: string | null; customerId?: string | null; email?: string | null },
): Promise<{ userId: string; email: string } | null> {
  const db = await admin();

  if (opts.metadataUserId) {
    const { data } = await db.auth.admin.getUserById(opts.metadataUserId);
    if (data?.user) return { userId: data.user.id, email: data.user.email ?? opts.email ?? "" };
  }

  if (opts.customerId) {
    const { data } = await db
      .from("subscribers")
      .select("user_id, email")
      .eq("stripe_customer_id", opts.customerId)
      .maybeSingle();
    if (data?.user_id) return { userId: data.user_id, email: data.email };
  }

  let email = opts.email ?? null;
  if (!email && opts.customerId) {
    try {
      const customer = await stripe.customers.retrieve(opts.customerId);
      if (!("deleted" in customer && customer.deleted)) email = customer.email ?? null;
    } catch (error) {
      console.error("[stripe] customer retrieve failed", error instanceof Error ? error.message : error);
    }
  }
  if (!email) return null;

  const needle = email.toLowerCase();
  // auth.users is not exposed through the Data API; page the Admin API instead.
  for (let page = 1; page <= 20; page += 1) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: 200 });
    if (error) break;
    const match = data.users.find((u) => (u.email ?? "").toLowerCase() === needle);
    if (match) return { userId: match.id, email: match.email ?? email };
    if (data.users.length < 200) break;
  }
  return null;
}

/** Upsert the learner's subscription row from a live Stripe subscription object. */
export async function syncSubscription(
  stripe: Stripe,
  sub: Stripe.Subscription,
  known?: { userId?: string; email?: string },
): Promise<void> {
  const customerId = typeof sub.customer === "string" ? sub.customer : sub.customer.id;
  const resolved =
    known?.userId && known.email !== undefined
      ? { userId: known.userId, email: known.email }
      : await resolveUserId(stripe, {
          metadataUserId: sub.metadata?.["supabase_user_id"] ?? known?.userId ?? null,
          customerId,
        });

  if (!resolved) {
    console.error("[stripe] could not resolve user for subscription", sub.id);
    throw new Error(`Unresolved user for subscription ${sub.id}`);
  }

  const period = subscriptionPeriod(sub);
  const db = await admin();
  const { error } = await db.from("subscribers").upsert(
    {
      user_id: resolved.userId,
      email: resolved.email || "",
      stripe_customer_id: customerId,
      stripe_subscription_id: sub.id,
      subscribed: ACTIVE_STATUSES.has(sub.status),
      status: sub.status,
      price_id: sub.items.data[0]?.price?.id ?? null,
      current_period_start: period.start,
      current_period_end: period.end,
      cancel_at_period_end: sub.cancel_at_period_end ?? false,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" },
  );
  if (error) throw new Error(`subscribers upsert failed: ${error.message}`);
}

/** Mark a subscription as cancelled (no access). */
export async function markCanceled(subscriptionId: string): Promise<void> {
  const db = await admin();
  const { error } = await db
    .from("subscribers")
    .update({ subscribed: false, status: "canceled", updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", subscriptionId);
  if (error) throw new Error(`subscribers cancel failed: ${error.message}`);
}

/** Mark a failed renewal: access off, status past_due. */
export async function markPastDue(subscriptionId: string): Promise<void> {
  const db = await admin();
  const { error } = await db
    .from("subscribers")
    .update({ subscribed: false, status: "past_due", updated_at: new Date().toISOString() })
    .eq("stripe_subscription_id", subscriptionId);
  if (error) throw new Error(`subscribers past_due failed: ${error.message}`);
}

/** Record a paid invoice (idempotent by invoice id) and refresh the period end. */
export async function recordInvoice(stripe: Stripe, invoice: Stripe.Invoice): Promise<void> {
  const raw = invoice as unknown as {
    subscription?: string | { id: string } | null;
    parent?: { subscription_details?: { subscription?: string | { id: string } | null } | null } | null;
  };
  const subRef = raw.subscription ?? raw.parent?.subscription_details?.subscription ?? null;
  const subscriptionId = typeof subRef === "string" ? subRef : (subRef?.id ?? null);
  const customerId = typeof invoice.customer === "string" ? invoice.customer : (invoice.customer?.id ?? null);

  const resolved = await resolveUserId(stripe, {
    metadataUserId: invoice.metadata?.["supabase_user_id"] ?? null,
    customerId,
    email: invoice.customer_email ?? null,
  });
  if (!resolved) throw new Error(`Unresolved user for invoice ${invoice.id}`);

  const line = invoice.lines?.data?.[0] as unknown as { period?: { start?: number; end?: number } } | undefined;
  const db = await admin();
  const { error } = await db.from("subscription_payments").upsert(
    {
      user_id: resolved.userId,
      stripe_invoice_id: invoice.id!,
      stripe_subscription_id: subscriptionId,
      amount: invoice.amount_paid ?? 0,
      currency: invoice.currency ?? "usd",
      status: invoice.status ?? "paid",
      period_start: toIso(line?.period?.start),
      period_end: toIso(line?.period?.end),
      paid_at: toIso(invoice.status_transitions?.paid_at) ?? new Date().toISOString(),
      hosted_invoice_url: invoice.hosted_invoice_url ?? null,
      invoice_pdf: invoice.invoice_pdf ?? null,
    },
    { onConflict: "stripe_invoice_id" },
  );
  if (error) throw new Error(`subscription_payments upsert failed: ${error.message}`);

  // Renewal: pull the live subscription so the period end stays accurate.
  if (subscriptionId) {
    const sub = await stripe.subscriptions.retrieve(subscriptionId);
    await syncSubscription(stripe, sub, { userId: resolved.userId, email: resolved.email });
  }
}

/** True when the event id was already stored; otherwise records it. */
export async function claimEvent(eventId: string, type: string): Promise<boolean> {
  const db = await admin();
  const { error } = await db.from("stripe_events").insert({ id: eventId, type });
  if (!error) return false;
  if (error.code === "23505") return true; // duplicate delivery
  throw new Error(`stripe_events insert failed: ${error.message}`);
}
