import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Scheduled cleanup of the detailed AI call log: job-token auth, overlap guard
 * and a durable `job_runs` record.
 */

const rpc = vi.fn();
const updates: Record<string, unknown>[] = [];
let activeRuns: { id: string }[] = [];
let jobToken: string | null = "secret-token";

function admin() {
  return {
    from(table: string) {
      if (table === "job_tokens") {
        return {
          select: () => ({
            eq: () => ({ maybeSingle: async () => ({ data: jobToken ? { token: jobToken } : null }) }),
          }),
        };
      }
      // job_runs
      return {
        select: () => ({
          eq: () => ({
            is: () => ({ gte: () => ({ limit: async () => ({ data: activeRuns }) }) }),
          }),
        }),
        insert: () => ({ select: () => ({ maybeSingle: async () => ({ data: { id: "run-1" } }) }) }),
        update: (patch: Record<string, unknown>) => {
          updates.push(patch);
          return { eq: async () => ({ data: null }) };
        },
      };
    },
    rpc: (...a: unknown[]) => rpc(...a),
  };
}

vi.mock("@/integrations/supabase/client.server", () => ({
  get supabaseAdmin() {
    return admin();
  },
}));

vi.mock("@/integrations/supabase/cron-auth", () => ({
  authenticateCronRequest: async () => new Response("Unauthorized", { status: 401 }),
}));

type Handler = (ctx: { request: Request }) => Promise<Response>;

async function handler(): Promise<Handler> {
  const mod = (await import("@/routes/api/public/hooks/prune-ai-log")) as { Route: unknown };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (mod.Route as any).options.server.handlers.POST as Handler;
}

function req(token?: string): Request {
  return new Request("http://localhost/api/public/hooks/prune-ai-log", {
    method: "POST",
    headers: token ? { authorization: `Bearer ${token}` } : {},
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  updates.length = 0;
  activeRuns = [];
  jobToken = "secret-token";
  rpc.mockResolvedValue({ data: 42, error: null });
});

describe("prune-ai-log hook", () => {
  it("rejects a request with no token and no cron secret", async () => {
    const post = await handler();
    const res = await post({ request: req() });
    expect(res.status).toBe(401);
  });

  it("accepts the job token and prunes with a 90 day window", async () => {
    const post = await handler();
    const res = await post({ request: req("secret-token") });
    expect(res.status).toBe(200);
    expect(rpc).toHaveBeenCalledWith("prune_ai_call_log", { _keep_days: 90 });
    expect(await res.json()).toEqual({ deleted: 42, keep_days: 90 });
  });

  it("returns 409 while an unfinished run is in flight", async () => {
    activeRuns = [{ id: "run-0" }];
    const post = await handler();
    const res = await post({ request: req("secret-token") });
    expect(res.status).toBe(409);
    expect(await res.json()).toEqual({ skipped: true, reason: "already running" });
    expect(rpc).not.toHaveBeenCalled();
  });

  it("stamps finished_at and marked_rows on success", async () => {
    const post = await handler();
    await post({ request: req("secret-token") });
    const patch = updates[0] as { finished_at?: string; ok?: boolean; marked_rows?: number };
    expect(patch.ok).toBe(true);
    expect(patch.marked_rows).toBe(42);
    expect(typeof patch.finished_at).toBe("string");
  });

  it("records the error when the prune fails", async () => {
    rpc.mockResolvedValue({ data: null, error: { message: "boom" } });
    const post = await handler();
    const res = await post({ request: req("secret-token") });
    expect(res.status).toBe(500);
    const patch = updates[0] as { ok?: boolean; error?: string };
    expect(patch.ok).toBe(false);
    expect(patch.error).toBe("boom");
  });
});
