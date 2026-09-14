/**
 * Admin cost center: types + presentation of REAL measured AI cost.
 *
 * AI dollars are no longer guessed from request counts: every paid call writes
 * its units and an estimated cost at write time into `ai_daily_rollup`, and
 * admin_cost_center() returns those rows. Only the Cloud storage line remains
 * an estimate, because it is not an AI cost.
 */

export interface CostEndpoint {
  endpoint: string;
  model: string;
  requests_30d: number;
  requests_total: number;
  users_30d: number;
  failures_30d: number;
  denials_30d: number;
  cache_hits_30d: number;
  audio_seconds_30d: number;
  input_tokens_30d: number;
  output_tokens_30d: number;
  characters_30d: number;
  est_cost_usd_30d: number;
  est_cost_usd_total: number;
  cache_hits_total: number;
  denials_total: number;
  failures_total: number;
}

export interface AdminCostCenter {
  generated_at: string;
  endpoints: CostEndpoint[];
  recordings: {
    count_30d: number;
    count_total: number;
    minutes_30d: number;
    minutes_total: number;
    avg_seconds: number | null;
  };
  coach: { analyses_30d: number; analyses_total: number };
  attempts: { sessions_30d: number; sessions_total: number };
  users: { total: number; active_30d: number };
}

export interface CostLine {
  key: string;
  label: string;
  requests: number;
  denials: number;
  unitLabel: string;
  usd: number;
  provider: "groq" | "lovable-ai" | "cloud";
}

/** Whisper models are billed by Groq; everything else goes through Lovable AI. */
function providerFor(model: string): "groq" | "lovable-ai" {
  return model.startsWith("whisper") ? "groq" : "lovable-ai";
}

function num(value: unknown): number {
  const n = typeof value === "number" ? value : Number(value ?? 0);
  return Number.isFinite(n) ? n : 0;
}

export function estimateCosts(data: AdminCostCenter): {
  lines: CostLine[];
  totalUsd: number;
  groqUsd: number;
  lovableUsd: number;
  ttsCacheHitRate: number | null;
} {
  const lines: CostLine[] = [];

  for (const e of data.endpoints ?? []) {
    const model = e.model ?? "";
    const provider = providerFor(model);
    const usd = num(e.est_cost_usd_30d);
    const units =
      num(e.audio_seconds_30d) > 0
        ? `${Math.round(num(e.audio_seconds_30d) / 60)} min`
        : num(e.characters_30d) > 0
          ? `${Math.round(num(e.characters_30d) / 1000)}k chars`
          : num(e.input_tokens_30d) + num(e.output_tokens_30d) > 0
            ? `${Math.round((num(e.input_tokens_30d) + num(e.output_tokens_30d)) / 1000)}k tokens`
            : "—";
    lines.push({
      key: `${e.endpoint}|${model}`,
      label: model ? `${e.endpoint} · ${model}` : e.endpoint,
      requests: num(e.requests_30d),
      denials: num(e.denials_30d),
      unitLabel: units,
      usd,
      provider,
    });
  }
  lines.sort((a, b) => b.usd - a.usd);

  // Lovable Cloud runtime (DB + storage + bandwidth): still an estimate, not an AI cost.
  const cloudUsd = Math.max(0.1, data.recordings.minutes_30d * 0.0005); // ~$0.50 per 1000 min stored/served
  lines.push({
    key: "cloud",
    label: "cloud",
    requests: data.attempts.sessions_30d,
    denials: 0,
    unitLabel: "estimado",
    usd: cloudUsd,
    provider: "cloud",
  });

  let ttsHits = 0;
  let ttsCalls = 0;
  for (const e of data.endpoints ?? []) {
    if (e.endpoint !== "tts") continue;
    ttsHits += num(e.cache_hits_30d);
    ttsCalls += num(e.requests_30d);
  }
  const ttsCacheHitRate = ttsHits + ttsCalls > 0 ? ttsHits / (ttsHits + ttsCalls) : null;

  const totalUsd = lines.reduce((s, l) => s + l.usd, 0);
  const groqUsd = lines.filter((l) => l.provider === "groq").reduce((s, l) => s + l.usd, 0);
  const lovableUsd = totalUsd - groqUsd;
  return { lines, totalUsd, groqUsd, lovableUsd, ttsCacheHitRate };
}

export function fmtUsd(n: number): string {
  if (n > 0 && n < 0.01) return "<$0.01";
  return `$${n.toFixed(2)}`;
}
