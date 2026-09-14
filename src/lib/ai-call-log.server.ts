/**
 * Durable AI call log and daily cost rollup.
 *
 * Why this module exists: the admin cost screens used to estimate spend by
 * multiplying request counts from `ai_usage_limits` by guessed unit prices.
 * That table is deleted by `consume_ai_quota` after two days and stores no
 * provider, model, units or cost, so real spend could never be known after the
 * fact. Here every paid provider call leaves a permanent record with the units
 * that drive its cost and an estimated cost in USD computed at write time,
 * every quota denial is counted, and the permanent history lives in the
 * per-day rollup (the per-call log is drill-down only and prunable).
 *
 * Privacy: units and metadata only. Never transcripts, prompts, message
 * contents, audio or learner speech — exactly like `tts_generation_log`.
 *
 * Server-only: uses the service-role client, read inside the function.
 */

export type AiProvider = "groq" | "lovable-gateway" | "none";

export type AiCallEntry = {
  user_id: string;
  endpoint: string;
  provider: AiProvider;
  model?: string | null;
  module_id?: string | null;
  day?: number | null;
  audio_seconds?: number | null;
  input_tokens?: number | null;
  output_tokens?: number | null;
  characters?: number | null;
  ok: boolean;
  error_code?: string | null;
  latency_ms?: number | null;
  /** Served from the clip cache: rollup increment only, no per-call row. */
  cacheHit?: boolean;
};

/** Metadata a route hands to a shared provider helper so it can log. */
export type AiLogMeta = { userId: string; moduleId?: string; day?: number };

/**
 * Unit prices in USD. One place, verified 2026-09-14.
 */
export const PRICES = {
  /** Groq, per hour of audio. Verified 2026-09-14. */
  audioPerHour: {
    "whisper-large-v3-turbo": 0.04, // verified 2026-09-14
    "whisper-large-v3": 0.111, // verified 2026-09-14
  } as Record<string, number>,
  /** Text models, USD per 1M tokens. Verified 2026-09-14. */
  tokensPerMillion: {
    // Verified 2026-09-14. Google announced 1.50 input / 7.50 output effective
    // 2027-01-01 — these two numbers MUST be updated on that date.
    "google/gemini-3.7-flash": { input: 0.75, output: 3.75 },
    // Verified 2026-09-14.
    "google/gemini-3.1-flash-lite": { input: 0.25, output: 1.5 },
    // Verified 2026-09-14: 0.60 per 1M text input tokens plus 12.00 per 1M
    // output audio tokens. The speech endpoint returns no usage, so cost is
    // estimated per character instead (see TTS_USD_PER_CHAR).
    "openai/gpt-4o-mini-tts": { input: 0.6, output: 12.0 },
  } as Record<string, { input: number; output: number }>,
} as const;

/**
 * ESTIMATE, to be tuned: derived from OpenAI's published ~0.015 USD per minute
 * of generated speech at roughly 900 characters per minute. Verified 2026-09-14.
 */
export const TTS_USD_PER_CHAR = 0.0000167;

export const TTS_MODEL = "openai/gpt-4o-mini-tts";

const warnedModels = new Set<string>();

/** Pure: estimated USD for one call. Never throws; unknown model returns 0. */
export function estimateCostUsd(entry: Pick<AiCallEntry, "ok" | "provider" | "model" | "audio_seconds" | "input_tokens" | "output_tokens" | "characters">): number {
  if (!entry.ok || entry.provider === "none") return 0;
  const model = entry.model ?? "";
  if (model === TTS_MODEL) {
    const chars = num(entry.characters);
    return chars * TTS_USD_PER_CHAR;
  }
  const hourly = PRICES.audioPerHour[model];
  if (typeof hourly === "number") {
    return (num(entry.audio_seconds) / 3600) * hourly;
  }
  const tokens = PRICES.tokensPerMillion[model];
  if (tokens) {
    return (num(entry.input_tokens) * tokens.input + num(entry.output_tokens) * tokens.output) / 1_000_000;
  }
  if (model && !warnedModels.has(model)) {
    warnedModels.add(model);
    console.warn(`[ai-call-log] unknown model for pricing: ${model}`);
  }
  return 0;
}

function num(value: number | null | undefined): number {
  return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function int(value: number | null | undefined): number | null {
  return typeof value === "number" && Number.isFinite(value) ? Math.round(value) : null;
}

/**
 * Fire-and-forget. Never throws, never delays the learner's response, swallows
 * and logs its own failures. Cache hits only bump the rollup.
 */
export async function logAiCall(entry: AiCallEntry): Promise<void> {
  try {
    const cost = estimateCostUsd(entry);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const cacheHit = entry.cacheHit === true;

    if (!cacheHit) {
      const { error } = await supabaseAdmin.from("ai_call_log").insert({
        user_id: entry.user_id,
        endpoint: entry.endpoint,
        provider: entry.provider,
        model: entry.model ?? null,
        module_id: entry.module_id ?? null,
        day: int(entry.day),
        audio_seconds: entry.audio_seconds ?? null,
        input_tokens: int(entry.input_tokens),
        output_tokens: int(entry.output_tokens),
        characters: int(entry.characters),
        ok: entry.ok,
        error_code: entry.error_code ?? null,
        latency_ms: int(entry.latency_ms),
        est_cost_usd: cost,
      });
      if (error) console.error(`[ai-call-log] insert failed: ${error.message}`);
    }

    const isProviderCall = !cacheHit && entry.provider !== "none";
    const { error: rpcError } = await supabaseAdmin.rpc("bump_ai_rollup", {
      _endpoint: entry.endpoint,
      _model: entry.model ?? "",
      _calls: isProviderCall ? 1 : 0,
      _failures: !entry.ok && entry.provider !== "none" ? 1 : 0,
      _denials: entry.error_code === "quota" ? 1 : 0,
      _cache_hits: cacheHit ? 1 : 0,
      _audio_seconds: num(entry.audio_seconds),
      _input_tokens: num(entry.input_tokens),
      _output_tokens: num(entry.output_tokens),
      _characters: num(entry.characters),
      _est_cost_usd: cost,
    });
    if (rpcError) console.error(`[ai-call-log] rollup failed: ${rpcError.message}`);
  } catch (error) {
    console.error(`[ai-call-log] logging failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
