// Server-only helpers for raw file-route handlers (src/routes/api/*).
// Mirrors the token verification used by `requireSupabaseAuth`, but works with a
// plain `Request` instead of server-function middleware.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

function isNewSupabaseApiKey(value: string): boolean {
  return value.startsWith("sb_publishable_") || value.startsWith("sb_secret_");
}

function createSupabaseFetch(supabaseKey: string): typeof fetch {
  return (input, init) => {
    const headers = new Headers(
      typeof Request !== "undefined" && input instanceof Request ? input.headers : undefined,
    );
    if (init?.headers) new Headers(init.headers).forEach((value, key) => headers.set(key, value));
    if (isNewSupabaseApiKey(supabaseKey) && headers.get("Authorization") === `Bearer ${supabaseKey}`) {
      headers.delete("Authorization");
    }
    headers.set("apikey", supabaseKey);
    return fetch(input, { ...init, headers });
  };
}

/** Verifies the `Authorization: Bearer <access_token>` header. Returns the learner's user id or null. */
export async function verifyRequestUser(request: Request): Promise<string | null> {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) {
    console.error("[route-auth] Missing SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY");
    return null;
  }

  const match = /^Bearer (\S+)$/.exec(request.headers.get("authorization") ?? "");
  const token = match?.[1];
  if (!token || token.split(".").length !== 3) return null;

  const supabase = createClient<Database>(url, key, {
    global: { fetch: createSupabaseFetch(key), headers: { Authorization: `Bearer ${token}` } },
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });

  try {
    const { data, error } = await supabase.auth.getClaims(token);
    const sub = data?.claims?.sub;
    if (error || typeof sub !== "string" || !sub) return null;
    return sub;
  } catch (error) {
    // Auth can throw a non-AuthError for transient fetch/JWKS failures. Raw
    // server routes must never leak that rejection as an opaque framework 500.
    console.error("[route-auth] Token verification failed", error instanceof Error ? error.message : "unknown error");
    return null;
  }
}

export type QuotaResult = { allowed: boolean; requestCount: number };

/**
 * Durable per-user rate limit backed by `public.ai_usage_limits` via the
 * service-role-only `consume_ai_quota` RPC. Works across server instances.
 * Fails closed (not allowed) if the counter cannot be updated.
 */
export async function consumeQuota(
  userId: string,
  endpoint: string,
  limit: number,
  windowSeconds: number,
): Promise<QuotaResult> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("consume_ai_quota", {
    _user_id: userId,
    _endpoint: endpoint,
    _limit: limit,
    _window_seconds: windowSeconds,
  });
  if (error) {
    console.error(`[route-auth] consume_ai_quota failed: ${error.message}`);
    return { allowed: false, requestCount: 0 };
  }
  const row = Array.isArray(data) ? data[0] : data;
  return { allowed: Boolean(row?.allowed), requestCount: Number(row?.used_count ?? 0) };
}

/**
 * Effective daily cap for a section, decided in Postgres from `section_limits`
 * (free limit x the plan multiplier, and "no practical cap" when the admin
 * turned limits or the section off). Falls back to the free default only when
 * the RPC itself fails, so a Pro learner never gets silently downgraded to the
 * free number by a hardcoded constant.
 */
export async function sectionDailyLimit(
  userId: string,
  sectionKey: string,
  fallback: number,
): Promise<number> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("get_daily_limit", {
    p_user_id: userId,
    p_section_key: sectionKey,
  });
  if (error) {
    console.error(`[route-auth] get_daily_limit(${sectionKey}) failed: ${error.message}`);
    return fallback;
  }
  const limit = Number(data);
  return Number.isFinite(limit) && limit > 0 ? limit : fallback;
}
