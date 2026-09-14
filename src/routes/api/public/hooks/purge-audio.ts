/**
 * INTENDED SCHEDULE: HOURLY (configured in the Cloud panel, not in this repo).
 *
 * At 17,000 learners roughly 30,000 take files expire every day, which is more
 * than a single daily run's ceiling (4,000 takes + 1,000 finals). Running once
 * an hour gives ~120,000 files of capacity per day, so the backlog shrinks
 * instead of growing. Overlapping invocations are rejected by the guard below.
 */
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
 * Daily audio retention job (called by pg_cron).
 *
 * Every run is bounded (see `storage-purge.server.ts`) and recorded in
 * `job_runs`, so a failure is visible on the admin Alerts screen instead of
 * disappearing with the HTTP response.
 */
export const Route = createFileRoute("/api/public/hooks/purge-audio")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!(await jobTokenAccepted(request))) {
          const unauthorized = await authenticateCronRequest(request);
          if (unauthorized) return unauthorized;
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: run } = await supabaseAdmin
          .from("job_runs")
          .insert({ job_name: "purge-audio" })
          .select("id")
          .maybeSingle();
        const runId = run?.id;

        try {
          const result = await purgeExpiredTakes();
          if (runId) {
            await supabaseAdmin
              .from("job_runs")
              .update({
                finished_at: new Date().toISOString(),
                ok: result.errors.length === 0,
                deleted_files: result.deletedFiles + result.dayFinalDeletedFiles,
                marked_rows: result.markedRows + result.dayFinalMarkedRows,
                error: result.errors.length ? result.errors.join(" | ").slice(0, 2000) : null,
                detail: JSON.parse(JSON.stringify(result)),
              })
              .eq("id", runId);
          }
          return new Response(JSON.stringify(result), {
            headers: { "content-type": "application/json" },
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "purge failed";
          if (runId) {
            await supabaseAdmin
              .from("job_runs")
              .update({ finished_at: new Date().toISOString(), ok: false, error: message.slice(0, 2000) })
              .eq("id", runId);
          }
          return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
