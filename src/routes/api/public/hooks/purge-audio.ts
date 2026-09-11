import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";
import { purgeExpiredTakes } from "@/lib/storage-purge.server";

/**
 * The scheduled job authenticates with a random token stored in the internal
 * `job_tokens` table (readable only with the service role, and by the cron job
 * itself inside the database). The platform cron secret is also accepted.
 */
async function jobTokenAccepted(request: Request): Promise<boolean> {
  const match = /^Bearer ([^\s,]+)$/.exec(request.headers.get("authorization") ?? "");
  const provided = match?.[1];
  if (!provided) return false;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("job_tokens").select("token").eq("name", "purge-audio").maybeSingle();
  const expected = data?.token;
  if (!expected || expected.length !== provided.length) return false;
  const { timingSafeEqual } = await import("node:crypto");
  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
}

/**
 * Daily audio retention job (called by pg_cron with the cron secret).
 * Deletes non-final practice takes older than 7 days on completed days.
 * Final Rep audio is never touched.
 */
export const Route = createFileRoute("/api/public/hooks/purge-audio")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!(await jobTokenAccepted(request))) {
          const unauthorized = await authenticateCronRequest(request);
          if (unauthorized) return unauthorized;
        }

        try {
          const result = await purgeExpiredTakes();
          return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "purge failed";
          return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
