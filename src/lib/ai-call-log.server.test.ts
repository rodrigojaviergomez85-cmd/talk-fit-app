import { describe, expect, it, vi, beforeEach } from "vitest";
import { estimateCostUsd, logAiCall, TTS_USD_PER_CHAR, TTS_MODEL } from "./ai-call-log.server";

const insert = vi.fn(async () => ({ error: null }));
const rpc = vi.fn(async () => ({ error: null }));

vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: { from: () => ({ insert }), rpc },
}));

beforeEach(() => {
  insert.mockClear();
  rpc.mockClear();
  insert.mockImplementation(async () => ({ error: null }));
  rpc.mockImplementation(async () => ({ error: null }));
});

describe("estimateCostUsd", () => {
  it("prices whisper turbo per audio hour", () => {
    expect(
      estimateCostUsd({ ok: true, provider: "groq", model: "whisper-large-v3-turbo", audio_seconds: 90 }),
    ).toBeCloseTo(0.001, 10);
  });

  it("prices gemini flash tokens", () => {
    expect(
      estimateCostUsd({
        ok: true,
        provider: "lovable-gateway",
        model: "google/gemini-3.7-flash",
        input_tokens: 1000,
        output_tokens: 200,
      }),
    ).toBeCloseTo(0.0015, 10);
  });

  it("prices gemini flash lite tokens", () => {
    expect(
      estimateCostUsd({
        ok: true,
        provider: "lovable-gateway",
        model: "google/gemini-3.1-flash-lite",
        input_tokens: 1000,
        output_tokens: 200,
      }),
    ).toBeCloseTo(0.00055, 10);
  });

  it("prices tts per character", () => {
    expect(estimateCostUsd({ ok: true, provider: "lovable-gateway", model: TTS_MODEL, characters: 300 })).toBeCloseTo(
      300 * TTS_USD_PER_CHAR,
      12,
    );
  });

  it("returns 0 for failures, provider none and unknown models", () => {
    expect(estimateCostUsd({ ok: false, provider: "groq", model: "whisper-large-v3-turbo", audio_seconds: 90 })).toBe(0);
    expect(estimateCostUsd({ ok: true, provider: "none", characters: 300 })).toBe(0);
    expect(() => estimateCostUsd({ ok: true, provider: "groq", model: "mystery-9000", audio_seconds: 90 })).not.toThrow();
    expect(estimateCostUsd({ ok: true, provider: "groq", model: "mystery-9000", audio_seconds: 90 })).toBe(0);
  });
});

describe("logAiCall", () => {
  it("never throws when the insert or rpc rejects", async () => {
    insert.mockRejectedValueOnce(new Error("nope"));
    await expect(
      logAiCall({ user_id: "u", endpoint: "tts", provider: "lovable-gateway", model: TTS_MODEL, characters: 10, ok: true }),
    ).resolves.toBeUndefined();
    rpc.mockRejectedValueOnce(new Error("nope"));
    await expect(
      logAiCall({ user_id: "u", endpoint: "tts", provider: "lovable-gateway", model: TTS_MODEL, characters: 10, ok: true }),
    ).resolves.toBeUndefined();
  });

  it("cache hits bump the rollup only", async () => {
    await logAiCall({ user_id: "u", endpoint: "tts", provider: "none", characters: 40, ok: true, cacheHit: true });
    expect(insert).not.toHaveBeenCalled();
    expect(rpc).toHaveBeenCalledWith("bump_ai_rollup", expect.objectContaining({ _cache_hits: 1, _calls: 0 }));
  });

  it("quota denials count as denials", async () => {
    await logAiCall({ user_id: "u", endpoint: "rep2_correction-daily", provider: "none", ok: false, error_code: "quota" });
    expect(rpc).toHaveBeenCalledWith("bump_ai_rollup", expect.objectContaining({ _denials: 1, _calls: 0, _failures: 0 }));
  });

  it("real provider calls count as calls with their cost", async () => {
    await logAiCall({
      user_id: "u",
      endpoint: "rep2-correction",
      provider: "groq",
      model: "whisper-large-v3-turbo",
      audio_seconds: 90,
      ok: true,
    });
    expect(insert).toHaveBeenCalledTimes(1);
    expect(rpc).toHaveBeenCalledWith("bump_ai_rollup", expect.objectContaining({ _calls: 1, _est_cost_usd: 0.001 }));
  });
});
