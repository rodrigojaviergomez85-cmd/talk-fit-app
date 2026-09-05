import { describe, it, expect, vi, beforeEach } from "vitest";

const storage = { download: vi.fn(), upload: vi.fn(), list: vi.fn() };
const rpc = vi.fn();
vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: { storage: { from: () => storage }, rpc },
}));

const fetchMock = vi.fn();
vi.stubGlobal("fetch", fetchMock);
process.env["LOVABLE_API_KEY"] = "test-key";

import { resolveClip, listStoredKeys, clipKey } from "./course-audio.server";

const spec = { text: "Hello", voice: "nova", tone: "coach" as const };
const ok = () => Promise.resolve({ ok: true, arrayBuffer: () => Promise.resolve(new Uint8Array([1, 2, 3]).buffer) });

beforeEach(() => {
  vi.clearAllMocks();
  rpc.mockImplementation((name: string) => Promise.resolve({ data: name === "acquire_tts_lock" ? true : true, error: null }));
});

describe("resolveClip storage safety", () => {
  it("storage error before lock → no AI, no lock", async () => {
    storage.download.mockResolvedValue({ data: null, error: { statusCode: "500", message: "boom" } });
    const r = await resolveClip(spec, await clipKey(spec), { waitForOther: true });
    expect(r.status).toBe("storage-error");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(rpc).not.toHaveBeenCalled();
  });
  it("storage throws → no AI", async () => {
    storage.download.mockRejectedValue(new Error("network"));
    const r = await resolveClip(spec, await clipKey(spec), {});
    expect(r.status).toBe("storage-error");
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("storage error on post-lock re-check → no AI, lock released", async () => {
    storage.download
      .mockResolvedValueOnce({ data: null, error: { statusCode: "404", message: "Object not found" } })
      .mockResolvedValueOnce({ data: null, error: { statusCode: "503", message: "unavailable" } });
    const r = await resolveClip(spec, await clipKey(spec), {});
    expect(r.status).toBe("storage-error");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(rpc).toHaveBeenCalledWith("release_tts_lock", expect.anything());
  });
  it("true miss → one AI call, persisted with upsert:false, lock released", async () => {
    storage.download.mockResolvedValue({ data: null, error: { statusCode: "404", message: "Object not found" } });
    storage.upload.mockResolvedValue({ error: null });
    fetchMock.mockImplementation(ok);
    const before = vi.fn().mockResolvedValue(true);
    const r = await resolveClip(spec, await clipKey(spec), { beforeGenerate: before });
    expect(r.status).toBe("generated");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(before).toHaveBeenCalledTimes(1);
    expect(storage.upload.mock.calls[0][2]).toMatchObject({ upsert: false });
    expect(rpc).toHaveBeenCalledWith("release_tts_lock", expect.anything());
  });
  it("beforeGenerate false (quota) → no AI", async () => {
    storage.download.mockResolvedValue({ data: null, error: { statusCode: "404", message: "Object not found" } });
    const r = await resolveClip(spec, await clipKey(spec), { beforeGenerate: async () => false });
    expect(r.status).toBe("not-eligible");
    expect(fetchMock).not.toHaveBeenCalled();
  });
  it("AI fails → ai-error, nothing uploaded, lock released", async () => {
    storage.download.mockResolvedValue({ data: null, error: { statusCode: "404", message: "Object not found" } });
    fetchMock.mockResolvedValue({ ok: false, status: 500, text: () => Promise.resolve("bad") });
    const r = await resolveClip(spec, await clipKey(spec), {});
    expect(r.status).toBe("ai-error");
    expect(storage.upload).not.toHaveBeenCalled();
    expect(rpc).toHaveBeenCalledWith("release_tts_lock", expect.anything());
  });
  it("lock held elsewhere, no wait → busy, no AI, no beforeGenerate", async () => {
    storage.download.mockResolvedValue({ data: null, error: { statusCode: "404", message: "Object not found" } });
    rpc.mockImplementation((name: string) => Promise.resolve({ data: name === "acquire_tts_lock" ? false : true, error: null }));
    const before = vi.fn();
    const r = await resolveClip(spec, await clipKey(spec), { beforeGenerate: before });
    expect(r.status).toBe("busy");
    expect(fetchMock).not.toHaveBeenCalled();
    expect(before).not.toHaveBeenCalled();
  });
  it("list error → null (inventory refuses to classify)", async () => {
    storage.list.mockResolvedValue({ data: null, error: { message: "down" } });
    expect(await listStoredKeys()).toBeNull();
  });
  it("cache key unchanged from the original route", async () => {
    expect(await clipKey({ text: "Hi", voice: "alloy", tone: "coach" })).toMatch(/^coach\/alloy\/[0-9a-f]{64}\.mp3$/);
  });
});
