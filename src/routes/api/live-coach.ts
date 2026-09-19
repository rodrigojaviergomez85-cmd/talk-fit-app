import { createFileRoute } from "@tanstack/react-router";

/**
 * Live speaking coach (pilot).
 *
 * The browser never sees the Gemini key: this route mints a short-lived
 * ephemeral token (single use, valid a few minutes) only for allow-listed
 * accounts that still have daily speaking time left. Time used is reported
 * back when the session ends and stored in `public.live_coach_sessions`.
 */

/** Gemini native-audio live model. */
export const LIVE_MODEL = "gemini-3.8-live";
/** Minutes a single live session may last. */
export const SESSION_LIMIT_SECONDS = 5 * 60;
/** Minutes one learner may speak per local day. */
export const DAILY_LIMIT_SECONDS = 15 * 60;
/**
 * Internal unlimited accounts (src/lib/unlimited-access.ts) get no daily cap
 * and a generous per-session ceiling (a forgotten session still ends itself).
 */
export const UNLIMITED_SESSION_LIMIT_SECONDS = 60 * 60;

const ALLOWED_EMAILS = ["english4callcenters@gmail.com"];

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

/** Today's date in El Salvador time (the app's operating day). */
function localDay(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/El_Salvador",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

async function usedSecondsToday(
  admin: { from: (table: string) => any },
  userId: string,
): Promise<number> {
  const { data } = await admin
    .from("live_coach_sessions")
    .select("seconds")
    .eq("user_id", userId)
    .eq("local_day", localDay());
  const rows = (data ?? []) as Array<{ seconds: number | null }>;
  return rows.reduce((total, row) => total + (row.seconds ?? 0), 0);
}

export const Route = createFileRoute("/api/live-coach")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { verifyRequestUser } = await import("@/lib/route-auth.server");
        const userId = await verifyRequestUser(request);
        if (!userId) return json({ error: "auth" }, 401);

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: userData } = await supabaseAdmin.auth.admin.getUserById(userId);
        const email = (userData?.user?.email ?? "").toLowerCase().trim();
        const allowed = ALLOWED_EMAILS.includes(email);
        const { isUnlimitedEmail } = await import("@/lib/unlimited-access");
        const unlimited = allowed && isUnlimitedEmail(email);
        const used = allowed ? await usedSecondsToday(supabaseAdmin as never, userId) : 0;

        return json({
          allowed,
          unlimited,
          usedSeconds: used,
          dailyLimitSeconds: DAILY_LIMIT_SECONDS,
          sessionLimitSeconds: unlimited ? UNLIMITED_SESSION_LIMIT_SECONDS : SESSION_LIMIT_SECONDS,
        });
      },

      POST: async ({ request }) => {
        const { verifyRequestUser } = await import("@/lib/route-auth.server");
        const userId = await verifyRequestUser(request);
        if (!userId) return json({ error: "auth" }, 401);

        let body: { action?: unknown; seconds?: unknown } = {};
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return json({ error: "bad_request" }, 400);
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: userData } = await supabaseAdmin.auth.admin.getUserById(userId);
        const email = (userData?.user?.email ?? "").toLowerCase().trim();
        if (!ALLOWED_EMAILS.includes(email)) return json({ error: "not_allowed" }, 403);

        if (body.action === "end") {
          const raw = typeof body.seconds === "number" ? Math.round(body.seconds) : 0;
          const seconds = Math.max(0, Math.min(SESSION_LIMIT_SECONDS, raw));
          if (seconds > 0) {
            await supabaseAdmin
              .from("live_coach_sessions")
              .insert({ user_id: userId, local_day: localDay(), seconds } as never);
          }
          const used = await usedSecondsToday(supabaseAdmin as never, userId);
          return json({ usedSeconds: used, dailyLimitSeconds: DAILY_LIMIT_SECONDS });
        }

        if (body.action !== "start") return json({ error: "bad_request" }, 400);

        const used = await usedSecondsToday(supabaseAdmin as never, userId);
        const remaining = DAILY_LIMIT_SECONDS - used;
        if (remaining <= 30) {
          return json(
            { error: "daily_limit", usedSeconds: used, dailyLimitSeconds: DAILY_LIMIT_SECONDS },
            429,
          );
        }

        const apiKey = process.env["GEMINI_LIVE_API_KEY"];
        if (!apiKey) return json({ error: "config" }, 500);

        const now = Date.now();
        const tokenRes = await fetch(
          `https://generativelanguage.googleapis.com/v1alpha/auth_tokens?key=${apiKey}`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              uses: 1,
              expireTime: new Date(now + 15 * 60_000).toISOString(),
              newSessionExpireTime: new Date(now + 90_000).toISOString(),
            }),
          },
        );

        if (!tokenRes.ok) {
          console.error("[live-coach] token mint failed", tokenRes.status, await tokenRes.text());
          return json({ error: "provider" }, 503);
        }

        const minted = (await tokenRes.json()) as { name?: string };
        if (!minted.name) return json({ error: "provider" }, 503);

        return json({
          token: minted.name,
          model: LIVE_MODEL,
          usedSeconds: used,
          dailyLimitSeconds: DAILY_LIMIT_SECONDS,
          sessionLimitSeconds: Math.min(SESSION_LIMIT_SECONDS, remaining),
        });
      },
    },
  },
});
