import { describe, expect, it, vi, beforeEach } from "vitest";
import {
  billableAudioSeconds,
  estimateCostUsd,
  logAiCall,
  GROQ_MIN_BILLED_SECONDS,
  TTS_USD_PER_CHAR,
  TTS_MODEL,
} from "./ai-call-log.server";

const insert = vi.fn(async () => ({ error: null }));
const rpc = vi.fn(async (_fn?: string, _args?: unknown) => ({ error: null as { message: string } | null }));

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

  it("prices short groq clips at the 10 second billed minimum", () => {
    expect(
      estimateCostUsd({ ok: true, provider: "groq", model: "whisper-large-v3-turbo", audio_seconds: 3 }),
    ).toBeCloseTo((10 / 3600) * 0.04, 12);
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

describe("billableAudioSeconds", () => {
  it("floors groq audio at the documented 10 second minimum", () => {
    expect(GROQ_MIN_BILLED_SECONDS).toBe(10);
    expect(billableAudioSeconds("whisper-large-v3-turbo", 3)).toBe(10);
    expect(billableAudioSeconds("whisper-large-v3-turbo", 20)).toBe(20);
    expect(billableAudioSeconds("whisper-large-v3-turbo", 0)).toBe(0);
    expect(billableAudioSeconds("whisper-large-v3-turbo", null)).toBe(0);
  });

  it("leaves non-audio models untouched", () => {
    expect(billableAudioSeconds("google/gemini-3.7-flash", 3)).toBe(3);
    expect(billableAudioSeconds(TTS_MODEL, 3)).toBe(3);
  });
});

describe("logAiCall", () => {
  const groqEntry = {
    user_id: "u",
    endpoint: "rep2-correction",
    provider: "groq" as const,
    model: "whisper-large-v3-turbo",
    audio_seconds: 3,
    ok: true,
  };

  it("never throws when the rpc rejects twice", async () => {
    rpc.mockRejectedValue(new Error("nope"));
    await expect(logAiCall(groqEntry)).resolves.toBeUndefined();
  });

  it("writes one atomic call with a uuid and the billable value", async () => {
    await logAiCall(groqEntry);
    expect(rpc).toHaveBeenCalledTimes(1);
    const [fn, args] = rpc.mock.calls[0] as [string, Record<string, unknown>];
    expect(fn).toBe("log_ai_call");
    expect(String(args['_id'])).toMatch(/^[0-9a-f-]{36}$/i);
    expect(args['_audio_seconds']).toBe(3);
    expect(args['_billed_audio_seconds']).toBe(10);
    expect(args['_est_cost_usd']).toBeCloseTo((10 / 3600) * 0.04, 12);
    expect(args['_cache_hit']).toBe(false);
  });

  it("retries exactly once with the same uuid and then drops the line", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    rpc.mockResolvedValue({ error: { message: "boom" } });
    await logAiCall(groqEntry);
    expect(rpc).toHaveBeenCalledTimes(2);
    const first = (rpc.mock.calls[0] as [string, Record<string, unknown>])[1];
    const second = (rpc.mock.calls[1] as [string, Record<string, unknown>])[1];
    expect(second['_id']).toBe(first['_id']);
    expect(errorSpy.mock.calls.flat().join(" ")).toContain("[ai-call-log] dropped");
    errorSpy.mockRestore();
  });

  it("never retries a cache hit", async () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    rpc.mockResolvedValue({ error: { message: "boom" } });
    await logAiCall({ user_id: "u", endpoint: "tts", provider: "none", characters: 40, ok: true, cacheHit: true });
    expect(rpc).toHaveBeenCalledTimes(1);
    expect((rpc.mock.calls[0] as [string, Record<string, unknown>])[1]['_cache_hit']).toBe(true);
    errorSpy.mockRestore();
  });

  it("quota denials are recorded", async () => {
    await logAiCall({ user_id: "u", endpoint: "rep2_correction-daily", provider: "none", ok: false, error_code: "quota" });
    expect(rpc).toHaveBeenCalledWith("log_ai_call", expect.objectContaining({ _error_code: "quota" }));
  });
});
