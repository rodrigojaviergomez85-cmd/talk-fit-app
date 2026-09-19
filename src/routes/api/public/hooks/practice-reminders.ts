/**
 * Scheduled practice reminders. Runs every 5 minutes from pg_cron.
 *
 * Protected by the `x-cron-secret` header, checked against the CRON_SECRET
 * secret or the `practice-reminders` row of job_tokens (used by pg_cron, which
 * cannot read backend secrets).
 *
 * Test bodies:
 *   { "dryRun": true, "userId": "..." } — decide only, send nothing
 *   { "force": true, "userId": "..." }  — ignore the clock, respect the rules
 */
import { createFileRoute } from "@tanstack/react-router";
import { runPracticeReminders } from "@/lib/practice-reminders.server";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function authorize(request: Request): Promise<boolean> {
  const provided = request.headers.get("x-cron-secret");
  if (!provided) return false;
  const secret = process.env["CRON_SECRET"];
  if (secret && provided === secret) return true;

  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin
    .from("job_tokens")
    .select("token")
    .eq("name", "practice-reminders")
    .maybeSingle();
  return Boolean(data?.token) && provided === data!.token;
}

export const Route = createFileRoute("/api/public/hooks/practice-reminders")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!(await authorize(request))) return new Response("Unauthorized", { status: 401 });

        let body: { dryRun?: unknown; force?: unknown; userId?: unknown } = {};
        try {
          body = (await request.json()) as typeof body;
        } catch {
          body = {};
        }
        const userId = typeof body.userId === "string" ? body.userId : undefined;

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const result = await runPracticeReminders(supabaseAdmin, {
          dryRun: body.dryRun === true,
          force: body.force === true,
          ...(userId ? { userId } : {}),
        });
        return json(result, result.ok ? 200 : 500);
      },
    },
  },
});
