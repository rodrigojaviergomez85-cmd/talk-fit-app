/**
 * COURSE AUDIO — shared server-only TTS service.
 *
 * Used by the learner endpoint (/api/tts) and the admin pre-generation tool so
 * both share ONE deterministic cache identity, one storage-safety rule and one
 * durable single-flight lock. Never imported by client code.
 *
 * Cache identity: sha256(voice \0 tone \0 text) → `${tone}/${voice}/${hex}.mp3`
 * in the private "course-audio" bucket. Unchanged from the original /api/tts,
 * so every previously generated clip stays valid.
 */

export type Tone = "coach" | "neutral" | "tense";
export type RequestedVoice = "neutral" | "female" | "male";

/** Normalised request: `voice` is the provider voice (alloy/nova/onyx). */
export type ClipSpec = { text: string; voice: string; tone: Tone };

export const BUCKET = "course-audio";
export const MAX_TEXT = 1500;
export const VOICE_MAP: Record<RequestedVoice, string> = { neutral: "alloy", female: "nova", male: "onyx" };
export const TONES: readonly Tone[] = ["coach", "neutral", "tense"];

const TONE_INSTRUCTIONS: Record<Tone, string> = {
  coach:
    "Speak with a very energetic, cheerful and excited tone — like an enthusiastic bilingual call-center coach hyping up their team. Warm, upbeat, smiling while speaking, dynamic rhythm and lively intonation. Natural everyday American English accent, clear and conversational — not robotic, not flat, not over-enunciated.",
  neutral:
    "Speak in a calm, professional, conversational tone — like an experienced recruiter or interviewer in a real job interview. Neutral and composed, moderate pace, natural everyday American English accent, clear but not exaggerated. No excitement, no cheerfulness, no smiling delivery; steady and matter-of-fact, with natural connected speech.",
  tense:
    "Speak as a frustrated but controlled customer on a support call. Firm, clipped, impatient and a little tired of repeating yourself — tense and direct, but never shouting or theatrical. Slightly faster pace, short pauses, flat falling intonation. Natural everyday American English accent, realistic and conversational.",
};

/** Lease long enough for one TTS generation; a crashed generator frees the clip on expiry. */
export const LOCK_LEASE_SECONDS = 45;
/**
 * Waiters (requests that lost the lock) make exactly this many storage checks,
 * with progressive delays before each one (~5.2 s total), then give up with
 * "busy" so the browser falls back to SpeechSynthesis. Never a tight loop.
 */
export const WAIT_DELAYS_MS: readonly number[] = [400, 800, 1500, 2500];
/** ±20 % jitter so many waiters don't hit storage in lock-step. */
const WAIT_JITTER = 0.2;

/* ------------------------------------------------------------------ */
/* Spec normalisation                                                  */
/* ------------------------------------------------------------------ */

export type NormalizeResult = { ok: true; spec: ClipSpec } | { ok: false; status: number; error: string };

/** Same validation as the original /api/tts. Defaults: voice neutral, tone coach. */
export function normalizeSpec(input: { text?: unknown; voice?: unknown; tone?: unknown }): NormalizeResult {
  const text = typeof input.text === "string" ? input.text.trim() : "";
  if (!text) return { ok: false, status: 400, error: "Missing text." };
  if (text.length > MAX_TEXT) return { ok: false, status: 413, error: `Text is too long (max ${MAX_TEXT} characters).` };

  const voiceIn = input.voice === undefined || input.voice === null ? "neutral" : input.voice;
  const voice = typeof voiceIn === "string" ? (VOICE_MAP as Record<string, string | undefined>)[voiceIn] : undefined;
  if (!voice) return { ok: false, status: 400, error: "Unsupported voice." };

  const toneIn = input.tone === undefined || input.tone === null ? "coach" : input.tone;
  if (typeof toneIn !== "string" || !(TONES as readonly string[]).includes(toneIn)) {
    return { ok: false, status: 400, error: "Unsupported tone." };
  }
  return { ok: true, spec: { text, voice, tone: toneIn as Tone } };
}

/* ------------------------------------------------------------------ */
/* Cache identity                                                      */
/* ------------------------------------------------------------------ */

export async function clipKey(spec: ClipSpec): Promise<string> {
  const data = new TextEncoder().encode(`${spec.voice}\u0000${spec.tone}\u0000${spec.text}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const hex = Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${spec.tone}/${spec.voice}/${hex}.mp3`;
}

/* ------------------------------------------------------------------ */
/* Storage (three-way: hit / confirmed miss / error)                   */
/* ------------------------------------------------------------------ */

/**
 * True only when storage clearly reports the object does not exist.
 * Anything else (5xx, timeout, permission, config, unknown) is a STORAGE
 * ERROR so we never pay to regenerate a clip that may already exist.
 */
export function isObjectNotFound(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const e = error as { statusCode?: unknown; status?: unknown; message?: unknown; error?: unknown };
  const code = String(e.statusCode ?? e.status ?? "");
  if (code === "404" || (code === "400" && /not.?found/i.test(String(e.message ?? "")))) return true;
  const msg = `${String(e.message ?? "")} ${String(e.error ?? "")}`;
  return /not.?found/i.test(msg) || /object not found/i.test(msg) || /the resource was not found/i.test(msg);
}

function describeError(error: unknown): string {
  if (!error || typeof error !== "object") return "unknown";
  const e = error as { statusCode?: unknown; status?: unknown; message?: unknown };
  return `status=${String(e.statusCode ?? e.status ?? "?")} message=${String(e.message ?? "?").slice(0, 120)}`;
}

export type Lookup = { status: "hit"; audio: ArrayBuffer } | { status: "miss" } | { status: "error" };

async function admin() {
  return (await import("@/integrations/supabase/client.server")).supabaseAdmin;
}

/** Downloads the clip when it exists. Never throws. */
export async function lookupClip(key: string): Promise<Lookup> {
  try {
    const sb = await admin();
    const { data, error } = await sb.storage.from(BUCKET).download(key);
    if (data && !error) return { status: "hit", audio: await data.arrayBuffer() };
    if (isObjectNotFound(error)) return { status: "miss" };
    console.warn(`[course-audio] STORAGE FAILURE key=${key} ${describeError(error)}`);
    return { status: "error" };
  } catch (error) {
    console.warn(`[course-audio] STORAGE FAILURE (thrown) key=${key} ${error instanceof Error ? error.message : "unknown"}`);
    return { status: "error" };
  }
}

/**
 * Lists every stored clip key (for the admin inventory). Returns null on ANY
 * storage error so the caller treats the cache state as unknown.
 */
export async function listStoredKeys(): Promise<Set<string> | null> {
  const keys = new Set<string>();
  try {
    const sb = await admin();
    const PAGE = 1000;
    for (const tone of TONES) {
      for (const voice of Object.values(VOICE_MAP)) {
        const folder = `${tone}/${voice}`;
        for (let offset = 0; ; offset += PAGE) {
          const { data, error } = await sb.storage.from(BUCKET).list(folder, { limit: PAGE, offset });
          if (error) {
            console.warn(`[course-audio] STORAGE FAILURE list ${folder} ${describeError(error)}`);
            return null;
          }
          for (const item of data ?? []) if (item.name.endsWith(".mp3")) keys.add(`${folder}/${item.name}`);
          if (!data || data.length < PAGE) break;
        }
      }
    }
    return keys;
  } catch (error) {
    console.warn(`[course-audio] STORAGE FAILURE list (thrown) ${error instanceof Error ? error.message : "unknown"}`);
    return null;
  }
}

/** Persists a generated clip. Never overwrites; a concurrent duplicate counts as stored. */
export async function persistClip(key: string, audio: ArrayBuffer): Promise<boolean> {
  if (audio.byteLength === 0) return false;
  try {
    const sb = await admin();
    const { error } = await sb.storage
      .from(BUCKET)
      .upload(key, audio, { contentType: "audio/mpeg", cacheControl: "31536000", upsert: false });
    if (error && !/already exists|duplicate/i.test(error.message)) {
      console.error(`[course-audio] STORAGE FAILURE upload key=${key} ${error.message}`);
      return false;
    }
    return true;
  } catch (error) {
    console.error(`[course-audio] STORAGE FAILURE upload (thrown) key=${key} ${error instanceof Error ? error.message : "unknown"}`);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Durable single-flight lock (Postgres lease)                         */
/* ------------------------------------------------------------------ */

export async function acquireLock(key: string, owner: string): Promise<boolean> {
  try {
    const sb = await admin();
    const { data, error } = await sb.rpc("acquire_tts_lock", { _clip_key: key, _owner: owner, _lease_seconds: LOCK_LEASE_SECONDS });
    if (error) {
      console.error(`[course-audio] lock acquire failed key=${key} ${error.message}`);
      return false;
    }
    return data === true;
  } catch (error) {
    console.error(`[course-audio] lock acquire threw key=${key} ${error instanceof Error ? error.message : "unknown"}`);
    return false;
  }
}

export async function releaseLock(key: string, owner: string): Promise<void> {
  try {
    const sb = await admin();
    const { error } = await sb.rpc("release_tts_lock", { _clip_key: key, _owner: owner });
    if (error) console.warn(`[course-audio] lock release failed key=${key} ${error.message} (lease will expire)`);
  } catch {
    // Lease expiry recovers it.
  }
}

/* ------------------------------------------------------------------ */
/* Generation                                                          */
/* ------------------------------------------------------------------ */

export type GenerateResult = { ok: true; audio: ArrayBuffer } | { ok: false; status: number };

/** Upstream statuses preserved as-is (terminal or throttled — do not keep hammering). */
export const PASSTHROUGH_STATUSES: ReadonlySet<number> = new Set([402, 403, 429]);

/** One paid TTS call. Model / instructions / format are fixed server-side. */
export async function generateClip(spec: ClipSpec, apiKey: string): Promise<GenerateResult> {
  try {
    const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini-tts",
        input: spec.text,
        voice: spec.voice,
        response_format: "mp3",
        instructions: TONE_INSTRUCTIONS[spec.tone],
      }),
    });
    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => "");
      console.error(`[course-audio] AI FAILURE [${upstream.status}]: ${detail.slice(0, 200)}`);
      // Billing (402), policy (403) and rate limit (429) pass through unchanged so
      // callers can stop instead of retrying; anything else is an opaque 502.
      return { ok: false, status: PASSTHROUGH_STATUSES.has(upstream.status) ? upstream.status : 502 };
    }
    const audio = await upstream.arrayBuffer();
    if (audio.byteLength === 0) {
      console.error("[course-audio] AI FAILURE: empty audio");
      return { ok: false, status: 502 };
    }
    return { ok: true, audio };
  } catch (error) {
    console.error(`[course-audio] AI FAILURE (thrown): ${error instanceof Error ? error.message : "unknown"}`);
    return { ok: false, status: 502 };
  }
}

/* ------------------------------------------------------------------ */
/* Single-flight resolve                                               */
/* ------------------------------------------------------------------ */

export type ResolveResult =
  | { status: "hit"; audio: ArrayBuffer; source: "store" }
  | { status: "generated"; audio: ArrayBuffer; stored: boolean }
  | { status: "storage-error" }
  | { status: "not-configured" }
  | { status: "not-eligible" }
  | { status: "ai-error"; httpStatus: number }
  | { status: "busy" };

export type ResolveOptions = {
  /**
   * Runs ONLY in the generator, after the post-lock re-check confirmed a miss
   * and right before the paid call (e.g. learner `tts-generate` quota).
   * Return false to stop without generating.
   */
  beforeGenerate?: (() => Promise<boolean>) | undefined;
  /** Non-generators poll storage for a few seconds (learners). Off for batch tools. */
  waitForOther?: boolean | undefined;
  /** Skip the first lookup when the caller has just confirmed a miss (warm-up). */
  assumeMiss?: boolean | undefined;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Returns the clip for a spec, generating it at most once across all server
 * instances:
 *   lookup → hit? serve : miss? acquire lock → re-check → generate → persist
 *   lock held elsewhere → bounded wait for the object → serve or "busy"
 * Any uncertain storage state stops before AI ("storage-error").
 */
export async function resolveClip(spec: ClipSpec, key: string, options: ResolveOptions = {}): Promise<ResolveResult> {
  if (!options.assumeMiss) {
    const first = await lookupClip(key);
    if (first.status === "hit") {
      console.info(`[course-audio] CACHE HIT key=${key}`);
      return { status: "hit", audio: first.audio, source: "store" };
    }
    if (first.status === "error") return { status: "storage-error" };
    console.info(`[course-audio] CACHE MISS key=${key}`);
  }

  const owner = crypto.randomUUID();
  const locked = await acquireLock(key, owner);

  if (!locked) {
    // WAITER: never generates, never touches the generation quota. A few
    // progressively spaced storage checks, then "busy" (→ 503 / browser fallback).
    if (!options.waitForOther) return { status: "busy" };
    console.info(`[course-audio] WAITING FOR EXISTING GENERATION key=${key} checks=${WAIT_DELAYS_MS.length}`);
    for (let i = 0; i < WAIT_DELAYS_MS.length; i += 1) {
      const base = WAIT_DELAYS_MS[i]!;
      await sleep(Math.round(base * (1 + (Math.random() * 2 - 1) * WAIT_JITTER)));
      const again = await lookupClip(key);
      if (again.status === "hit") {
        console.info(`[course-audio] CACHE HIT (after wait, check ${i + 1}) key=${key}`);
        return { status: "hit", audio: again.audio, source: "store" };
      }
      if (again.status === "error") return { status: "storage-error" };
    }
    console.info(`[course-audio] WAIT GAVE UP after ${WAIT_DELAYS_MS.length} checks key=${key}`);
    return { status: "busy" };
  }

  console.info(`[course-audio] GENERATION LOCK ACQUIRED key=${key}`);
  try {
    // Re-check: another instance may have finished between our lookup and the lock.
    const recheck = await lookupClip(key);
    if (recheck.status === "hit") {
      console.info(`[course-audio] CACHE HIT (post-lock) key=${key}`);
      return { status: "hit", audio: recheck.audio, source: "store" };
    }
    if (recheck.status === "error") return { status: "storage-error" };

    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) return { status: "not-configured" };

    if (options.beforeGenerate && !(await options.beforeGenerate())) return { status: "not-eligible" };

    const generated = await generateClip(spec, apiKey);
    if (!generated.ok) return { status: "ai-error", httpStatus: generated.status };

    const stored = await persistClip(key, generated.audio);
    console.info(`[course-audio] GENERATED key=${key} stored=${stored ? "yes" : "no"}`);
    return { status: "generated", audio: generated.audio, stored };
  } finally {
    await releaseLock(key, owner);
  }
}
