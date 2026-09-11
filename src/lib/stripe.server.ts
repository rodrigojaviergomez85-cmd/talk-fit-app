// Server-only Stripe client. The secret key is read from the encrypted secret
// store at call time and never reaches the browser bundle.
import Stripe from "stripe";

export function getStripe(): Stripe {
  const key = process.env["STRIPE_SECRET_KEY"];
  if (!key) throw new Error("Missing STRIPE_SECRET_KEY");

  return new Stripe(key, {
    apiVersion: "2026-08-26.dahlia",
    // Workers runtime: use the fetch-based HTTP client instead of Node http.
    httpClient: Stripe.createFetchHttpClient(),
  });
}

export function getPriceId(): string {
  const priceId = process.env["STRIPE_PRICE_ID"];
  if (!priceId) throw new Error("Missing STRIPE_PRICE_ID");
  return priceId;
}
