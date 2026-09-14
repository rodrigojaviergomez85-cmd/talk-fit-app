/**
 * INTENDED SCHEDULE: ONCE A DAY (configured in the Cloud panel, not in this repo).
 *
 * Deletes `ai_call_log` rows older than 90 days. The permanent daily cost
 * rollup (`ai_daily_rollup`) is never touched, so cost history survives.
 * Overlapping invocations are rejected by the guard below.
 */
import { createFileRoute } from "@tanstack/react-router";
import { authenticateCronRequest } from "@/integrations/supabase/cron-auth";

const JOB_NAME = "prune-ai-log";
const KEEP_DAYS = 90;

/**
 * The scheduled job authenticates with a random token stored in the internal
 * `job_tokens` table (readable only with the service role). The platform cron
 * secret is also accepted.
 */
async function jobTokenAccepted(request: Request): Promise<boolean> {
  const match = /^Bearer ([^\s,]+)$/.exec(request.headers.get("authorization") ?? "");
  const provided = match?.[1];
  if (!provided) return false;
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.from("job_tokens").select("token").eq("name", JOB_NAME).maybeSingle();
  const expected = data?.token;
  if (!expected || expected.length !== provided.length) return false;
  const { timingSafeEqual } = await import("node:crypto");
  return timingSafeEqual(Buffer.from(provided), Buffer.from(expected));
}

/** A run that crashed without stamping `finished_at` stops blocking after this. */
export const ACTIVE_RUN_WINDOW_MS = 30 * 60_000;

type RunLookup = {
  from: (table: string) => {
    select: (cols: string) => {
      eq: (col: string, value: unknown) => {
        is: (col: string, value: unknown) => {
          gte: (col: string, value: unknown) => {
            limit: (n: number) => Promise<{ data: { id: string }[] | null }>;
          };
        };
      };
    };
  };
};

/** Exported for tests: is another prune run still in flight? */
export async function hasActiveRun(admin: RunLookup, nowMs = Date.now()): Promise<boolean> {
  const cutoff = new Date(nowMs - ACTIVE_RUN_WINDOW_MS).toISOString();
  const { data } = await admin
    .from("job_runs")
    .select("id")
    .eq("job_name", JOB_NAME)
    .is("finished_at", null)
    .gte("started_at", cutoff)
    .limit(1);
  return (data?.length ?? 0) > 0;
}

export const Route = createFileRoute("/api/public/hooks/prune-ai-log")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!(await jobTokenAccepted(request))) {
          const unauthorized = await authenticateCronRequest(request);
          if (unauthorized) return unauthorized;
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

        if (await hasActiveRun(supabaseAdmin as unknown as RunLookup)) {
          return new Response(JSON.stringify({ skipped: true, reason: "already running" }), {
            status: 409,
            headers: { "content-type": "application/json" },
          });
        }

        const { data: run } = await supabaseAdmin
          .from("job_runs")
          .insert({ job_name: JOB_NAME })
          .select("id")
          .maybeSingle();
        const runId = run?.id;

        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const { data, error } = await (supabaseAdmin as any).rpc("prune_ai_call_log", {
            _keep_days: KEEP_DAYS,
          });
          if (error) throw new Error(error.message);
          const deleted = typeof data === "number" ? data : 0;

          if (runId) {
            await supabaseAdmin
              .from("job_runs")
              .update({
                finished_at: new Date().toISOString(),
                ok: true,
                marked_rows: deleted,
              })
              .eq("id", runId);
          }
          return new Response(JSON.stringify({ deleted, keep_days: KEEP_DAYS }), {
            headers: { "content-type": "application/json" },
          });
        } catch (err) {
          const message = err instanceof Error ? err.message : "prune failed";
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
