import { supabase } from "@/integrations/supabase/client";

/**
 * Session durability helpers.
 *
 * A learner should stay signed in until they sign out or the backend says the
 * session is really gone. Spotty mobile networks, a phone that suspends the
 * app for hours, and slow responses must never look like a sign-out.
 */

const SESSION_INVALID_PATTERNS = [
  "invalid refresh token",
  "refresh token not found",
  "refresh_token_not_found",
  "already used",
  "session not found",
  "session_not_found",
  "user not found",
  "user_not_found",
  "jwt expired and refresh failed",
];

/** True only when the backend explicitly rejected the session. */
export function isSessionInvalidError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const e = error as { name?: string; status?: number; message?: string; code?: string };
  if (e.name === "AuthRetryableFetchError") return false;
  const message = (e.message ?? "").toLowerCase();
  const code = (e.code ?? "").toLowerCase();
  if (!message && !code) return false;
  // Plain network failures ("failed to fetch", "network", timeouts) are transient.
  if (/failed to fetch|network|timeout|load failed|aborted/.test(message)) return false;
  if (SESSION_INVALID_PATTERNS.some((p) => message.includes(p) || code.includes(p))) return true;
  return e.status === 401 || e.status === 403;
}

const REFRESH_MARGIN_SECONDS = 120;

let inFlight: Promise<boolean> | null = null;

async function refreshWithRetry(attempts = 3): Promise<boolean> {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const { data, error } = await supabase.auth.refreshSession();
      if (data?.session) return true;
      if (error && isSessionInvalidError(error)) return false;
    } catch {
      // transient — retry below
    }
    if (attempt < attempts - 1) {
      await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
    }
  }
  return false;
}

/**
 * Refresh the access token when it is expired or about to expire.
 * Returns true when a usable session exists afterwards.
 */
export async function ensureFreshSession(): Promise<boolean> {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    try {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;
      if (!session) return false;
      const expiresAt = session.expires_at ?? 0;
      const now = Math.floor(Date.now() / 1000);
      if (expiresAt && expiresAt - now > REFRESH_MARGIN_SECONDS) return true;
      return await refreshWithRetry();
    } catch {
      return false;
    } finally {
      inFlight = null;
    }
  })();
  return inFlight;
}

/** Access token for authenticated calls, refreshing first when needed. */
export async function getFreshAccessToken(): Promise<string | null> {
  await ensureFreshSession();
  const { data } = await supabase.auth.getSession();
  return data?.session?.access_token ?? null;
}

/** Current session, refreshed first when the access token is stale. */
export async function getFreshSession() {
  await ensureFreshSession();
  return supabase.auth.getSession();
}
