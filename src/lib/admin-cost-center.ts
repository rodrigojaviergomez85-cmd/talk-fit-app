/**
 * Admin cost center: types + client-side cost estimation.
 * Raw usage numbers come from the admin_cost_center() database function;
 * unit prices live here so they are easy to adjust when provider pricing changes.
 */

export interface CostEndpoint {
  endpoint: string;
  requests_30d: number;
  requests_total: number;
  users_30d: number;
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
  requests: number;
  unitLabel: string;
  usd: number;
  provider: "groq" | "lovable-ai" | "cloud";
}

/** Groq Whisper turbo: $0.04 per audio hour. */
const WHISPER_USD_PER_MINUTE = 0.04 / 60;
/** Average STT audio length per request type (seconds), estimated from product behavior. */
const STT_SECONDS_PER_REQUEST: Record<string, number> = {
  "rep2-correction": 8,
  "sentence-count": 30,
  "final-audio-coach": 45,
  "final-audio-coach-retake": 45,
};
/** Lovable AI text model per Final Coach analysis (small prompt + JSON out). */
const COACH_USD_PER_ANALYSIS = 0.0015;
/** Lovable AI TTS per generation (~short phrase). Requests are cached/shared. */
const TTS_USD_PER_GENERATION = 0.01;

export function estimateCosts(data: AdminCostCenter): { lines: CostLine[]; totalUsd: number; groqUsd: number; lovableUsd: number } {
  const lines: CostLine[] = [];
  const byEndpoint = new Map(data.endpoints.map((e) => [e.endpoint, e.requests_30d]));

  let sttMinutes = 0;
  let sttRequests = 0;
  for (const [endpoint, seconds] of Object.entries(STT_SECONDS_PER_REQUEST)) {
    const req = byEndpoint.get(endpoint) ?? 0;
    sttRequests += req;
    sttMinutes += (req * seconds) / 60;
  }
  lines.push({
    key: "stt",
    requests: sttRequests,
    unitLabel: `${Math.round(sttMinutes)} min`,
    usd: sttMinutes * WHISPER_USD_PER_MINUTE,
    provider: "groq",
  });

  const coachRequests = (byEndpoint.get("final-audio-coach") ?? 0) + (byEndpoint.get("final-audio-coach-retake") ?? 0);
  lines.push({
    key: "coach",
    requests: coachRequests,
    unitLabel: `$${COACH_USD_PER_ANALYSIS}/analysis`,
    usd: coachRequests * COACH_USD_PER_ANALYSIS,
    provider: "lovable-ai",
  });

  const ttsGen = byEndpoint.get("tts-generate") ?? 0;
  lines.push({
    key: "tts",
    requests: ttsGen,
    unitLabel: `$${TTS_USD_PER_GENERATION}/voz`,
    usd: ttsGen * TTS_USD_PER_GENERATION,
    provider: "lovable-ai",
  });

  // Lovable Cloud runtime (DB + storage + bandwidth): small flat estimate per GB-month of audio.
  const cloudUsd = Math.max(0.1, (data.recordings.minutes_30d * 0.0005)); // ~$0.50 per 1000 min stored/served
  lines.push({ key: "cloud", requests: data.attempts.sessions_30d, unitLabel: "estimado", usd: cloudUsd, provider: "cloud" });

  const totalUsd = lines.reduce((s, l) => s + l.usd, 0);
  const groqUsd = lines.filter((l) => l.provider === "groq").reduce((s, l) => s + l.usd, 0);
  const lovableUsd = totalUsd - groqUsd;
  return { lines, totalUsd, groqUsd, lovableUsd };
}

export function fmtUsd(n: number): string {
  if (n > 0 && n < 0.01) return "<$0.01";
  return `$${n.toFixed(2)}`;
}
