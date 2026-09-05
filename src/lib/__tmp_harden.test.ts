import { describe, it, expect, vi, beforeEach } from "vitest";

process.env["SUPABASE_URL"] = "http://sb.test";
process.env["SUPABASE_SERVICE_ROLE_KEY"] = "sb_secret_test";

const store = new Map<string, Uint8Array>();
const locks = new Map<string, string>();
let downloads = 0;
let storageMode: "ok" | "error" = "ok";
let aiCalls = 0;
let aiStatus = 200;
let aiDelay = 1200;

// Fetch-level fake of Supabase Storage/RPC (real supabase-js client on top) + the AI gateway.
vi.stubGlobal("fetch", async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = typeof input === "string" ? input : input instanceof URL ? input.href : input.url;
  const method = (init?.method ?? "GET").toUpperCase();
  const json = (b: unknown, status = 200) =>
    new Response(JSON.stringify(b), { status, headers: { "content-type": "application/json" } });
  if (url.startsWith("https://ai.gateway.lovable.dev/")) {
    aiCalls += 1;
    await new Promise((r) => setTimeout(r, aiDelay));
    if (aiStatus !== 200) return new Response("denied", { status: aiStatus });
    return new Response(new Uint8Array([1, 2, 3]), { status: 200 });
  }
  if (url.includes("/rest/v1/rpc/")) {
    const fn = url.split("/rest/v1/rpc/")[1]!.split("?")[0]!;
    const args = JSON.parse(String(init?.body ?? "{}")) as Record<string, string>;
    const k = args["_clip_key"] ?? "";
    const o = args["_owner"] ?? "";
    if (fn === "acquire_tts_lock") {
      if (locks.has(k)) return json(false);
      locks.set(k, o);
      return json(true);
    }
    if (fn === "release_tts_lock") {
      if (locks.get(k) === o) locks.delete(k);
      return json(true);
    }
    return json({ message: "unknown" }, 404);
  }
  if (url.includes("/storage/v1/object/")) {
    const key = decodeURIComponent(url.split("/storage/v1/object/")[1]!).replace(/^course-audio\//, "").split("?")[0]!;
    if (method === "GET") {
      downloads += 1;
      if (storageMode === "error") return json({ statusCode: "500", error: "boom", message: "boom" }, 500);
      const hit = store.get(key);
      if (!hit) return json({ statusCode: "404", error: "not_found", message: "Object not found" }, 404);
      return new Response(new Uint8Array(hit), { status: 200, headers: { "content-type": "audio/mpeg" } });
    }
    if (method === "POST") {
      const bytes = new Uint8Array(await new Response(init?.body as BodyInit).arrayBuffer());
      store.set(key, bytes);
      return json({ Key: `course-audio/${key}` });
    }
  }
  return json({ message: `unhandled ${method} ${url}` }, 500);
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
    const beforeGenerate = async () => {
      quota += 1;
      return true;
    };
    const results = await Promise.all(
      Array.from({ length: 8 }, () => audio.resolveClip(spec, key, { waitForOther: true, beforeGenerate })),
    );
    expect(aiCalls).toBe(1);
    expect(quota).toBe(1);
    expect(results.filter((r) => r.status === "generated")).toHaveLength(1);
    expect(results.filter((r) => r.status === "hit")).toHaveLength(7);
    // generator: lookup + recheck = 2; each waiter: 1 lookup + ≤4 polls.
    expect(downloads).toBeLessThanOrEqual(2 + 7 * (1 + audio.WAIT_DELAYS_MS.length));
    expect(audio.WAIT_DELAYS_MS.length).toBeGreaterThanOrEqual(3);
    expect(audio.WAIT_DELAYS_MS.length).toBeLessThanOrEqual(5);
    console.log(`A/B downloads=${downloads} aiCalls=${aiCalls} quota=${quota}`);
  }, 20_000);

  it("C: clip never appears → busy after exactly N checks, zero waiter AI", async () => {
    const audio = await import("./course-audio.server");
    const key = await audio.clipKey(spec);
    locks.set(key, "someone-else");
    const t0 = Date.now();
    const r = await audio.resolveClip(spec, key, { waitForOther: true });
    const elapsed = Date.now() - t0;
    expect(r.status).toBe("busy");
    expect(aiCalls).toBe(0);
    expect(downloads).toBe(1 + audio.WAIT_DELAYS_MS.length);
    expect(elapsed).toBeGreaterThan(4000);
    expect(elapsed).toBeLessThan(7500);
    console.log(`C downloads=${downloads} elapsed=${elapsed}ms`);
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

  it("H: 403 propagates through resolveClip as ai-error 403 and releases the lock", async () => {
    const audio = await import("./course-audio.server");
    const key = await audio.clipKey(spec);
    aiDelay = 0;
    aiStatus = 403;
    const r = await audio.resolveClip(spec, key, { waitForOther: false });
    expect(r).toEqual({ status: "ai-error", httpStatus: 403 });
    expect(locks.size).toBe(0);
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
    const hex = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256", data)))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    expect(key).toBe(`coach/nova/${hex}.mp3`);
  });
});
