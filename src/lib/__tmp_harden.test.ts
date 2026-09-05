import { describe, it, expect, vi, beforeEach } from "vitest";

// In-memory storage + lock, mimicking Supabase admin client behaviour.
const store = new Map<string, Uint8Array>();
const locks = new Map<string, string>();
let downloads = 0;
let storageMode: "ok" | "error" = "ok";

vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    storage: {
      from: () => ({
        download: async (key: string) => {
          downloads += 1;
          if (storageMode === "error") return { data: null, error: { statusCode: "500", message: "boom" } };
          const hit = store.get(key);
          return hit ? { data: new Blob([hit]), error: null } : { data: null, error: { statusCode: "404", message: "Object not found" } };
        },
        upload: async (key: string, body: ArrayBuffer) => {
          store.set(key, new Uint8Array(body));
          return { error: null };
        },
      }),
    },
    rpc: async (fn: string, args: Record<string, string>) => {
      if (fn === "acquire_tts_lock") {
        console.log("ACQ", args._clip_key, locks.has(args._clip_key)); if (locks.has(args._clip_key)) return { data: false, error: null };
        locks.set(args._clip_key, args._owner);
        return { data: true, error: null };
      }
      if (fn === "release_tts_lock") {
        if (locks.get(args._clip_key) === args._owner) locks.delete(args._clip_key);
        return { data: true, error: null };
      }
      return { data: null, error: { message: "unknown" } };
    },
  },
}));

let aiCalls = 0;
let aiStatus = 200;
let aiDelay = 1200;
vi.stubGlobal("fetch", async () => {
  aiCalls += 1;
  await new Promise((r) => setTimeout(r, aiDelay));
  if (aiStatus !== 200) return new Response("denied", { status: aiStatus });
  return new Response(new Uint8Array([1, 2, 3]), { status: 200 });
});

const spec = { text: "Hello champion", voice: "nova", tone: "coach" as const };

beforeEach(() => {
  store.clear();
  locks.clear();
  downloads = 0;
  aiCalls = 0;
  aiStatus = 200;
  aiDelay = 1200;
  storageMode = "ok";
  process.env["LOVABLE_API_KEY"] = "test";
});

describe("hardening", () => {
  it("A/B: many waiters, one generator, bounded checks, clip appears while waiting", async () => {
    const audio = await import("./course-audio.server");
    const key = await audio.clipKey(spec);
    let quota = 0;
    const beforeGenerate = async () => { quota += 1; return true; };
    const results = await Promise.all(
      Array.from({ length: 8 }, () => audio.resolveClip(spec, key, { waitForOther: true, beforeGenerate })),
    );
    expect(aiCalls).toBe(1);
    expect(quota).toBe(1);
    expect(results.filter((r) => r.status === "generated")).toHaveLength(1);
    expect(results.filter((r) => r.status === "hit")).toHaveLength(7);
    // generator: 1 lookup + 1 recheck = 2; waiters: 1 lookup + ≤4 polls each
    expect(downloads).toBeLessThanOrEqual(2 + 7 * (1 + audio.WAIT_DELAYS_MS.length));
    expect(audio.WAIT_DELAYS_MS.length).toBeLessThanOrEqual(5);
    expect(audio.WAIT_DELAYS_MS.length).toBeGreaterThanOrEqual(3);
  }, 20_000);

  it("C: clip never appears → busy after exactly N checks, zero waiter AI", async () => {
    const audio = await import("./course-audio.server");
    const key = await audio.clipKey(spec);
    locks.set(key, "someone-else"); // held forever, never produces a clip
    const t0 = Date.now();
    const r = await audio.resolveClip(spec, key, { waitForOther: true });
    const elapsed = Date.now() - t0;
    expect(r.status).toBe("busy");
    expect(aiCalls).toBe(0);
    expect(downloads).toBe(1 + audio.WAIT_DELAYS_MS.length);
    expect(elapsed).toBeGreaterThan(4000);
    expect(elapsed).toBeLessThan(7500);
  }, 20_000);

  it("G: generateClip preserves 402/403/429, maps others to 502", async () => {
    const audio = await import("./course-audio.server");
    aiDelay = 0;
    for (const s of [402, 403, 429]) {
      aiStatus = s;
      expect(await audio.generateClip(spec, "k")).toEqual({ ok: false, status: s });
    }
    aiStatus = 500;
    expect(await audio.generateClip(spec, "k")).toEqual({ ok: false, status: 502 });
  });

  it("storage error while waiting → storage-error, no AI", async () => {
    const audio = await import("./course-audio.server");
    const key = await audio.clipKey(spec);
    locks.set(key, "x");
    storageMode = "error";
    const r = await audio.resolveClip(spec, key, { waitForOther: true });
    expect(r.status).toBe("storage-error");
    expect(aiCalls).toBe(0);
  });

  it("I: cache key unchanged", async () => {
    const audio = await import("./course-audio.server");
    const key = await audio.clipKey(spec);
    const data = new TextEncoder().encode(`nova\u0000coach\u0000Hello champion`);
    const hex = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", data))).map((b) => b.toString(16).padStart(2, "0")).join("");
    expect(key).toBe(`coach/nova/${hex}.mp3`);
  });
});
