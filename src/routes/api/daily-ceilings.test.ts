import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Daily ceilings for the two upload endpoints: the section-limits check must
 * run BEFORE the hourly one, and a daily denial must not consume the hourly
 * counter. Size guards keep running before any quota at all.
 */

const consumeQuota = vi.fn();
const sectionDailyLimit = vi.fn();
const verifyRequestUser = vi.fn();

vi.mock("@/lib/route-auth.server", () => ({
  verifyRequestUser: (...a: unknown[]) => verifyRequestUser(...a),
  consumeQuota: (...a: unknown[]) => consumeQuota(...a),
  sectionDailyLimit: (...a: unknown[]) => sectionDailyLimit(...a),
}));

// Never reached in these tests, but keep the modules cheap/inert.
vi.mock("@/lib/final-coach-providers.server", () => ({
  transcribeFinalAudio: vi.fn(async () => ({ ok: false })),
}));

type Handler = (ctx: { request: Request }) => Promise<Response>;

async function handlerOf(path: string): Promise<Handler> {
  const mod = (await import(path)) as { Route: unknown };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (mod.Route as any).options.server.handlers.POST as Handler;
}

function audioFile(bytes: number): File {
  return new File([new Uint8Array(bytes)], "take.webm", { type: "audio/webm" });
}

function formRequest(fields: Record<string, string | File>): Request {
  const form = new FormData();
  for (const [k, v] of Object.entries(fields)) form.append(k, v);
  return new Request("http://localhost/api/x", { method: "POST", body: form });
}

beforeEach(() => {
  vi.clearAllMocks();
  verifyRequestUser.mockResolvedValue("user-1");
  sectionDailyLimit.mockResolvedValue(60);
  consumeQuota.mockResolvedValue({ allowed: true, requestCount: 1 });
});

describe("sentence-count daily ceiling", () => {
  const body = () => formRequest({ file: audioFile(4096) });

  it("checks the daily limit before the hourly one", async () => {
    const post = await handlerOf("@/routes/api/sentence-count");
    await post({ request: body() });
    const endpoints = consumeQuota.mock.calls.map((c) => c[1]);
    expect(endpoints[0]).toBe("sentence_count-daily");
    expect(endpoints).toContain("sentence-count");
    expect(sectionDailyLimit).toHaveBeenCalledWith("user-1", "sentence_count", 30);
  });

  it("returns 429 on a daily denial without consuming the hourly counter", async () => {
    consumeQuota.mockResolvedValueOnce({ allowed: false, requestCount: 31 });
    const post = await handlerOf("@/routes/api/sentence-count");
    const res = await post({ request: body() });
    expect(res.status).toBe(429);
    expect(consumeQuota).toHaveBeenCalledTimes(1);
    expect(consumeQuota.mock.calls[0]?.[1]).toBe("sentence_count-daily");
  });

  it("still returns 429 when the daily passes and the hourly denies", async () => {
    consumeQuota
      .mockResolvedValueOnce({ allowed: true, requestCount: 1 })
      .mockResolvedValueOnce({ allowed: false, requestCount: 21 });
    const post = await handlerOf("@/routes/api/sentence-count");
    const res = await post({ request: body() });
    expect(res.status).toBe(429);
  });

  it("still accepts a 2 MB final take", async () => {
    const post = await handlerOf("@/routes/api/sentence-count");
    const res = await post({ request: formRequest({ file: audioFile(2 * 1024 * 1024) }) });
    expect(res.status).not.toBe(413);
  });
});

describe("rep2-correction daily ceiling and size limit", () => {
  const body = (size = 4096) =>
    formRequest({
      file: audioFile(size),
      moduleId: "review-simple-present",
      day: "1",
      chunkId: "c1",
    });

  it("checks the daily limit before the hourly one", async () => {
    const post = await handlerOf("@/routes/api/rep2-correction");
    await post({ request: body() });
    const endpoints = consumeQuota.mock.calls.map((c) => c[1]);
    expect(endpoints[0]).toBe("rep2_correction-daily");
    expect(endpoints).toContain("rep2-correction");
    expect(sectionDailyLimit).toHaveBeenCalledWith("user-1", "rep2_correction", 60);
  });

  it("returns 429 on a daily denial without consuming the hourly counter", async () => {
    consumeQuota.mockResolvedValueOnce({ allowed: false, requestCount: 61 });
    const post = await handlerOf("@/routes/api/rep2-correction");
    const res = await post({ request: body() });
    expect(res.status).toBe(429);
    expect(consumeQuota).toHaveBeenCalledTimes(1);
  });

  it("still returns 429 when the daily passes and the hourly denies", async () => {
    consumeQuota
      .mockResolvedValueOnce({ allowed: true, requestCount: 1 })
      .mockResolvedValueOnce({ allowed: false, requestCount: 31 });
    const post = await handlerOf("@/routes/api/rep2-correction");
    const res = await post({ request: body() });
    expect(res.status).toBe(429);
  });

  it("rejects audio over 1 MB with 413 before any quota is consumed", async () => {
    const post = await handlerOf("@/routes/api/rep2-correction");
    const res = await post({ request: body(1024 * 1024 + 4096) });
    expect(res.status).toBe(413);
    expect(consumeQuota).not.toHaveBeenCalled();
    expect(sectionDailyLimit).not.toHaveBeenCalled();
  });
});
