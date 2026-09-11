import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";
import { purgeExpiredTakes } from "@/lib/storage-purge.server";

/**
 * Daily audio retention job (called by pg_cron with the cron secret).
 * Deletes non-final practice takes older than 7 days on completed days.
 * Final Rep audio is never touched.
 */
export const Route = createFileRoute("/api/public/hooks/purge-audio")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const unauthorized = await authenticateCronRequest(request);
        if (unauthorized) return unauthorized;

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
