/**
 * STEP 5 · YOUR TURN — Final Audio Coach (server-only engine).
 *
 * Analyses ONLY an authenticated learner's stored, confirmed Final Audio.
 * Cost protection is server-side and durable:
 *   take-number validation against the real CourseDay → ownership
 *   → audio SHA-256 → rubric SHA-256 → cache lookup → lease claim → quota
 *   → 1 STT (Groq whisper-large-v3-turbo, verbose_json confidence)
 *   → 1 small text model.
 * Same audio + same rubric + same coach version is evaluated exactly once.
 * There is intentionally NO second STT (large-v3) fallback: unreliable audio
 * ends as UNCLEAR after a single Turbo call.
 *
 * All I/O is injected (`CoachDeps`) so the whole flow is unit-testable without
 * Storage, the database or any AI provider.
 */
import type { CourseDay, ModuleId } from "./types";
import { takeSlots } from "./take-slots";
import {
  CORRECTION_CATEGORIES,
  FINAL_AUDIO_COACH_VERSION_V2,
  MULTI_CORRECTION_MAX,
  coachVersionFor,
  isIntermediateCoachModule,
  isMultiCorrectionPilot,
  maxCorrectionsFor,
  type AnsweredTask,
  type CoachCorrectionCategory,
  type FinalAudioCoachCorrection,
  type FinalAudioCoachRelatedOccurrence,
  MAX_RELATED_OCCURRENCES,
  type FinalAudioCoachFluencyUpgrade,
} from "./final-audio-coach";

export { coachVersionFor, isMultiCorrectionPilot, maxCorrectionsFor };

/**
 * v2: the single LLM call also returns ONE transcript-grounded specific
 * correction (said / betterVersion / why / practicePhrase). Bumped so cached v1
 * rows (which never had correction fields) are not replayed as v2 feedback.
 * The multi-correction pilot (past-stories Day 1 only) resolves its own
 * version through coachVersionFor() so no other cache is invalidated.
 */
export const FINAL_AUDIO_COACH_VERSION = FINAL_AUDIO_COACH_VERSION_V2;

export type CoachCorrection = FinalAudioCoachCorrection;

/** Quota: NEW analyses per learner per rolling window. Cache hits never consume it. */
export const COACH_QUOTA_ENDPOINT = "final-audio-coach";
export const COACH_QUOTA_LIMIT = 10;
export const COACH_QUOTA_WINDOW_SECONDS = 24 * 60 * 60;

/**
 * A pending lease older than this is considered crashed and may be reclaimed
 * once (atomically). 10 minutes: a legitimate request (Storage download,
 * hashing, Groq STT, LLM, DB finalize) can occasionally exceed 2 minutes, and a
 * premature reclaim would duplicate paid AI work.
 */
export const PENDING_STALE_MS = 10 * 60 * 1000;

/**
 * Audio size ceiling. The recorder captures speech at 32 kbps (Opus/AAC).
 * Longest legitimate STEP 5 take: classic cap = goalSeconds[1] + 15s, where the
 * largest authored goal is 420s → 435s ≈ 1.7 MB at 32 kbps. Pressure Round
 * turns cap at max(90, targetSeconds[1] + 15) = 105s. 8 MiB leaves ~4× headroom
 * for containers/browsers that ignore the bitrate hint while staying bounded.
 */
export const MAX_FINAL_AUDIO_SECONDS = 435;
export const RECORDER_BITS_PER_SECOND = 32_000;
export const MAX_FINAL_AUDIO_BYTES = 8 * 1024 * 1024;
export const MIN_FINAL_AUDIO_BYTES = 2048;

/**
 * UNCLEAR detection (unreliable audio/transcription — never "bad English"):
 *  - empty transcript or fewer than MIN_TRANSCRIPT_WORDS words
 *  - Whisper segment confidence below the STEP 2 thresholds
 *    (min avg_logprob < -0.7 OR max no_speech_prob > 0.5)
 * UNCLEAR costs 1 STT and 0 LLM.
 */
export const MIN_TRANSCRIPT_WORDS = 6;
export const AVG_LOGPROB_THRESHOLD = -0.7;
export const NO_SPEECH_THRESHOLD = 0.5;

export type SttConfidence = { avgLogprob: number; noSpeechProb: number };
/** Internal only — confidence is never sent to the browser. */
export type SttResult = { ok: true; text: string; confidence?: SttConfidence | null | undefined } | { ok: false };

/** True when the STT metadata says the speech itself was not reliably recognised. Missing metadata never rejects. */
export function isLowConfidence(confidence: SttConfidence | null | undefined): boolean {
  if (!confidence) return false;
  const { avgLogprob, noSpeechProb } = confidence;
  return (
    (Number.isFinite(avgLogprob) && avgLogprob < AVG_LOGPROB_THRESHOLD) ||
    (Number.isFinite(noSpeechProb) && noSpeechProb > NO_SPEECH_THRESHOLD)
  );
}

/**
 * Maximum valid Take number for a real CourseDay — the same rule TakeBoard
 * renders: classic STEP 5 / classic role play = 5 slots; Pressure Round =
 * one slot per authored turn (may be > 5 or < 5).
 */
export function maxTakeNumberFor(day: Pick<CourseDay, "rep5Turns">): number {
  return takeSlots(day.rep5Turns);
}

export const LIMITS = {
  strengthEn: 120,
  strengthEs: 140,
  nextStepEn: 140,
  nextStepEs: 160,
  said: 120,
  betterVersion: 140,
  whyEn: 160,
  whyEs: 180,
  practicePhrase: 160,
} as const;
/** `said` must be a SHORT quote — a real fragment of the transcript, never a paraphrase. */
export const MAX_SAID_WORDS = 15;

export type CoachStatus = "pending" | "ready" | "unclear" | "error";
export type Rating = "good" | "developing";

export type CoachFeedback = {
  taskCompleted: boolean;
  targetLanguage: Rating;
  organization: Rating;
  strengthEn: string;
  strengthEs: string;
  nextStepEn: string;
  nextStepEs: string;
  /** v2: at most ONE specific correction, grounded in the transcript. All null when false. */
  correctionNeeded: boolean;
  said: string | null;
  betterVersion: string | null;
  whyEn: string | null;
  whyEs: string | null;
  practicePhrase: string | null;
  /** Multi-correction pilot: 0–maxCorrections validated corrections (priority order). Empty on v2 days. */
  corrections: CoachCorrection[];
  /** Pilot only: relevance to TODAY'S exact question. Undefined on v2 days. */
  answeredTask?: AnsweredTask | undefined;
  /** Pilot only: one grounded "more fluent" upgrade. Undefined on v2 days, null when none. */
  fluencyUpgrade?: FinalAudioCoachFluencyUpgrade | null | undefined;
};

export type RecordingRow = {
  id: string;
  user_id: string;
  module_id: string;
  day: number;
  take_number: number;
  is_final_rep: boolean;
  storage_path: string;
  mime_type: string | null;
  audio_purged_at: string | null;
  estimated_idea_count: number | null;
  source_turn_number: number | null;
  /** Optional: lets the pilot prompt compare speaking time with the day's goal (never a grade). */
  duration_seconds?: number | null | undefined;
};

export type FeedbackRow = {
  id: string;
  status: CoachStatus;
  updated_at: string;
  task_completed: boolean | null;
  target_language: string | null;
  organization: string | null;
  strength_en: string | null;
  strength_es: string | null;
  next_step_en: string | null;
  next_step_es: string | null;
  correction_needed: boolean | null;
  said: string | null;
  better_version: string | null;
  why_en: string | null;
  why_es: string | null;
  practice_phrase: string | null;
  transcript_word_count: number | null;
  estimated_idea_count: number | null;
  /** jsonb: compact validated correction array (pilot). Never a transcript. */
  corrections?: unknown;
  /** Pilot: 'yes' | 'partly' | 'no'. */
  answered_task?: unknown;
  /** Pilot jsonb: { original, improved } (grounded at generation time). */
  fluency_upgrade?: unknown;
};

export type CacheKey = { userId: string; audioSha256: string; rubricSha256: string; coachVersion: string };

export type PendingInsert = CacheKey & {
  moduleId: string;
  day: number;
  takeNumber: number;
  sourceTurnNumber: number | null;
  estimatedIdeaCount: number | null;
};

export type FinalizePatch = {
  status: Exclude<CoachStatus, "pending">;
  feedback?: CoachFeedback | undefined;
  transcriptWordCount?: number | null | undefined;
};

export type CoachInput = { moduleId: string; day: number; takeNumber: number };

export type CoachDeps = {
  userId: string;
  now: () => number;
  /** Trusted row lookup: MUST already be scoped to `userId`. */
  fetchRecording: (userId: string, input: CoachInput) => Promise<RecordingRow | null>;
  /** Private bucket download by the server-trusted storage_path. */
  downloadAudio: (storagePath: string) => Promise<Uint8Array | null>;
  loadDay: (moduleId: ModuleId, day: number) => Promise<CourseDay | null>;
  moduleLabel: (moduleId: ModuleId) => string;
  store: {
    findExisting: (key: CacheKey) => Promise<FeedbackRow | null>;
    /** INSERT … ON CONFLICT DO NOTHING. True = this request owns the lease. */
    tryInsertPending: (row: PendingInsert) => Promise<boolean>;
    /** Atomic reclaim of a stale/errored row: UPDATE … WHERE id AND updated_at = seen. True = reclaimed. */
    tryReclaim: (id: string, seenUpdatedAt: string) => Promise<boolean>;
    finalize: (id: string, patch: FinalizePatch) => Promise<void>;
  };
  consumeQuota: (userId: string) => Promise<boolean>;
  /** Exactly one Groq Turbo transcription; `confidence` comes from verbose_json segments (optional, internal). */
  stt: (audio: Uint8Array, mime: string | null) => Promise<SttResult>;
  llm: (rubric: CoachRubric, transcript: string, estimatedIdeaCount: number | null, speakingSeconds?: number | null) => Promise<unknown | null>;
  log?: ((entry: Record<string, unknown>) => void) | undefined;
};

export type CoachResponse =
  | { http: 200; body: { status: "ready"; feedback: CoachFeedback; transcript?: string | null } }
  | { http: 200; body: { status: "unclear" } }
  | { http: 200; body: { status: "error"; code: string } }
  | { http: 202; body: { status: "pending" } }
  | { http: 404; body: { status: "not_found" } }
  | { http: 409; body: { status: "final_audio_not_ready" } }
  | { http: 413; body: { status: "audio_too_large" } }
  | { http: 429; body: { status: "rate_limited" } };

/* ------------------------------------------------------------------------ */
/*  Rubric                                                                   */
/* ------------------------------------------------------------------------ */

export type CoachRubric = {
  moduleId: string;
  moduleLabel: string;
  level: "basic" | "eagles" | "tigers" | "sharks" | "advanced";
  day: number;
  sourceTurnNumber: number | null;
  topic: string;
  focus: string;
  /** Classic STEP 5. */
  prompt?: { question: string; tips?: string | undefined } | undefined;
  /** Role play / Pressure Round: the exact turn being answered. */
  turn?:
    | {
        label: string;
        text: string;
        cues?: string[] | undefined;
        framework?: { title: string; steps: string[] } | undefined;
        situation?: string | undefined;
        targetSeconds?: [number, number] | undefined;
      }
    | undefined;
  goalSeconds: [number, number];
  goalSentences: number;
  coachVersion: string;
  /** Pilot only (omitted on v2 days so their rubric hash is unchanged). */
  maxCorrections?: number | undefined;
};

export function levelFor(moduleId: string): CoachRubric["level"] {
  if (moduleId.startsWith("eagles")) return "eagles";
  if (moduleId.startsWith("tigers")) return "tigers";
  if (moduleId.startsWith("sharks")) return "sharks";
  if (moduleId.startsWith("advanced")) return "advanced";
  return "basic";
}

/**
 * Minimal, deterministic evaluation context. Never the whole CourseDay.
 * Returns null when a source turn is referenced but does not exist.
 */
export function buildRubric(
  day: CourseDay,
  moduleId: string,
  moduleLabel: string,
  sourceTurnNumber: number | null,
): CoachRubric | null {
  const base: CoachRubric = {
    moduleId,
    moduleLabel,
    level: levelFor(moduleId),
    day: day.day,
    sourceTurnNumber,
    topic: day.topic,
    focus: day.focus,
    goalSeconds: day.goalSeconds,
    goalSentences: day.goalSentences ?? 5,
    coachVersion: coachVersionFor(moduleId, day.day),
    maxCorrections: isMultiCorrectionPilot(moduleId, day.day) ? maxCorrectionsFor(moduleId, day.day) : undefined,
  };
  if (sourceTurnNumber !== null) {
    const turn = day.rep5Turns?.[sourceTurnNumber - 1];
    if (!turn) return null;
    // A Pressure Round's situation lives on the first turn of its round.
    const turns = day.rep5Turns ?? [];
    let situation: string | undefined;
    for (let i = sourceTurnNumber - 1; i >= 0; i--) {
      const r = turns[i]?.round;
      if (r) {
        situation = r.situation ?? r.title;
        break;
      }
    }
    return {
      ...base,
      turn: {
        label: turn.label,
        text: turn.text,
        cues: turn.cues,
        framework: turn.framework ? { title: turn.framework.title, steps: turn.framework.steps } : undefined,
        situation,
        targetSeconds: turn.targetSeconds,
      },
    };
  }
  return { ...base, prompt: { question: day.rep5Prompt.question, tips: day.rep5Tips?.en } };
}

/* ------------------------------------------------------------------------ */
/*  Hashing                                                                  */
/* ------------------------------------------------------------------------ */

export async function sha256Hex(bytes: Uint8Array): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", bytes as BufferSource);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

/** Stable JSON: keys sorted recursively, undefined dropped. */
export function stableStringify(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, v]) => v !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
    return `{${entries.map(([k, v]) => `${JSON.stringify(k)}:${stableStringify(v)}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

export async function rubricSha256(rubric: CoachRubric): Promise<string> {
  return sha256Hex(new TextEncoder().encode(stableStringify(rubric)));
}

/* ------------------------------------------------------------------------ */
/*  Output validation                                                        */
/* ------------------------------------------------------------------------ */

export function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function clip(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,;:]+$/, "")}…`;
}

function rating(value: unknown): Rating | null {
  return value === "good" || value === "developing" ? value : null;
}

/** Lowercase, punctuation stripped, whitespace collapsed — used ONLY to ground `said` in the transcript. */
export function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[^\p{L}\p{N}' ]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** True when the short `said` quote actually occurs (word-bounded) in the transcript. */
export function saidOccursInTranscript(said: string, transcript: string): boolean {
  const s = normalizeForMatch(said);
  const t = normalizeForMatch(transcript);
  if (!s || !t) return false;
  if (countWords(s) > MAX_SAID_WORDS) return false;
  return ` ${t} `.includes(` ${s} `);
}

/**
 * Repetition quotes are written as fragments joined by "..." ("we went... we went...").
 * Every fragment must be a real (short) piece of the transcript. A plain quote is one fragment.
 */
export function quoteFragments(said: string): string[] {
  return said
    .split(/\.{3}|…/)
    .map((f) => f.trim())
    .filter(Boolean);
}

export function quoteGroundedInTranscript(said: string, transcript: string): boolean {
  const fragments = quoteFragments(said);
  if (fragments.length === 0) return false;
  return fragments.every((f) => saidOccursInTranscript(f, transcript));
}

/** Max words for a fluencyUpgrade `original` (one short section, never the whole answer). */
export const MAX_UPGRADE_ORIGINAL_WORDS = 30;
export const LIMITS_UPGRADE = { original: 200, improved: 240 } as const;

function answeredTaskOf(value: unknown): AnsweredTask | null {
  return value === "yes" || value === "partly" || value === "no" ? value : null;
}

/** Grounded upgrade or null — never fabricated, never the whole answer, never identical. */
export function normalizeFluencyUpgrade(raw: unknown, transcript?: string): FinalAudioCoachFluencyUpgrade | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const original = typeof r["original"] === "string" ? r["original"].replace(/\s+/g, " ").trim() : "";
  const improved = typeof r["improved"] === "string" ? clip(r["improved"], LIMITS_UPGRADE.improved) : "";
  if (!original || !improved) return null;
  if (original.length > LIMITS_UPGRADE.original || countWords(original) > MAX_UPGRADE_ORIGINAL_WORDS) return null;
  const o = normalizeForMatch(original);
  const t = transcript !== undefined ? normalizeForMatch(transcript) : null;
  if (t !== null && !` ${t} `.includes(` ${o} `)) return null;
  if (o === normalizeForMatch(improved)) return null;
  return { original, improved };
}

const NO_CORRECTION = {
  correctionNeeded: false as const,
  said: null,
  betterVersion: null,
  whyEn: null,
  whyEs: null,
  practicePhrase: null,
  corrections: [] as CoachCorrection[],
};

function isCategory(value: unknown): value is CoachCorrectionCategory {
  return typeof value === "string" && (CORRECTION_CATEGORIES as readonly string[]).includes(value);
}

/**
 * Pilot: validate, ground, deduplicate and cap the candidate corrections from
 * the SAME LLM response. Every rule is per item — a bad item is dropped, never
 * the whole result, and no second AI call is made.
 *  - allowed category; `said` non-empty, ≤ MAX_SAID_WORDS, really in the transcript
 *  - betterVersion non-empty and meaningfully different; whyEn + whyEs present
 *  - overlapping `said` quotes (one contains the other) = same mistake → keep one
 *  - at most `max`, in the model's priority order
 */
/** Server-only grouping key: the LLM's reusable rule id, normalized. Never shown to the learner. */
function ruleKeyOf(c: Record<string, unknown>): string {
  const v = c["ruleKey"];
  return typeof v === "string" ? v.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") : "";
}

/** Validate + ground the "also applies to" examples of one correction (max MAX_RELATED_OCCURRENCES). */
export function normalizeRelatedOccurrences(
  raw: unknown,
  transcript: string | undefined,
  primarySaid: string,
): FinalAudioCoachRelatedOccurrence[] {
  if (!Array.isArray(raw)) return [];
  const out: FinalAudioCoachRelatedOccurrence[] = [];
  const seen = new Set<string>([normalizeForMatch(primarySaid)]);
  for (const item of raw) {
    if (out.length >= MAX_RELATED_OCCURRENCES) break;
    if (!item || typeof item !== "object") continue;
    const r = item as Record<string, unknown>;
    const said = typeof r["said"] === "string" ? r["said"].replace(/\s+/g, " ").trim() : "";
    const betterRaw = typeof r["betterVersion"] === "string" ? r["betterVersion"].trim() : "";
    if (!said || !betterRaw) continue;
    if (said.length > LIMITS.said || countWords(said) > MAX_SAID_WORDS) continue;
    // Same grounding standard as the primary quote: an invented quote is discarded, never the correction.
    if (transcript !== undefined && !saidOccursInTranscript(said, transcript)) continue;
    const betterVersion = clip(betterRaw, LIMITS.betterVersion);
    const saidNorm = normalizeForMatch(said);
    if (!saidNorm || saidNorm === normalizeForMatch(betterVersion)) continue;
    if (seen.has(saidNorm)) continue;
    seen.add(saidNorm);
    out.push({ said, betterVersion });
  }
  return out;
}

function mergeOccurrence(target: CoachCorrection, said: string, betterVersion: string): void {
  const existing = target.relatedOccurrences ?? [];
  if (existing.length >= MAX_RELATED_OCCURRENCES) return;
  const seen = new Set([normalizeForMatch(target.said), ...existing.map((o) => normalizeForMatch(o.said))]);
  const norm = normalizeForMatch(said);
  if (!norm || seen.has(norm)) return;
  target.relatedOccurrences = [...existing, { said, betterVersion }];
}

/**
 * Pilot: validate, ground, GROUP and cap the candidate corrections from the
 * SAME LLM response. Every rule is per item — a bad item is dropped, never the
 * whole result, and no second AI call is made.
 *  - allowed category; `said` non-empty, ≤ MAX_SAID_WORDS, really in the transcript
 *  - betterVersion non-empty and meaningfully different; whyEn + whyEs present
 *  - overlapping quotes OR the same `ruleKey` = the SAME reusable rule → merged into
 *    the earlier correction as an "also applies to" occurrence (max 2), NOT a new slot
 *  - at most `max` corrections, in the model's priority order
 */
export function normalizeCorrections(raw: unknown, max: number, transcript?: string): CoachCorrection[] {
  if (max <= 0 || !Array.isArray(raw)) return [];
  const out: CoachCorrection[] = [];
  const ruleKeys: string[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const c = item as Record<string, unknown>;
    if (!isCategory(c["category"])) continue;
    const category = c["category"];
    const said = typeof c["said"] === "string" ? c["said"].replace(/\s+/g, " ").trim() : "";
    const str = (key: "betterVersion" | "whyEn" | "whyEs"): string | null => {
      const v = c[key];
      return typeof v === "string" && v.trim() ? clip(v, LIMITS[key]) : null;
    };
    const betterVersion = str("betterVersion");
    const whyEn = str("whyEn");
    const whyEs = str("whyEs");
    if (!said || !betterVersion || !whyEn || !whyEs) continue;
    // Repetition quotes are "fragment... fragment... fragment" — each fragment is grounded on its own.
    const multiFragment = category === "repetition";
    if (said.length > LIMITS.said) continue;
    if (!multiFragment && countWords(said) > MAX_SAID_WORDS) continue;
    if (transcript !== undefined) {
      const grounded = multiFragment ? quoteGroundedInTranscript(said, transcript) : saidOccursInTranscript(said, transcript);
      if (!grounded) continue;
    }
    const saidNorm = normalizeForMatch(said);
    if (!saidNorm || saidNorm === normalizeForMatch(betterVersion)) continue;
    // Same underlying rule quoted twice → keep ONE correction and show the repeat as evidence.
    // Repetition / relevance items describe a pattern, not one mistake: they never absorb (or get absorbed by) a grammar quote.
    const patternLike = multiFragment || category === "task_relevance";
    const ruleKey = ruleKeyOf(c);
    const dupIndex = patternLike
      ? -1
      : out.findIndex((prev, i) => {
          if (prev.category === "repetition" || prev.category === "task_relevance") return false;
          if (ruleKey && ruleKeys[i] === ruleKey) return true;
          const p = normalizeForMatch(prev.said);
          return ` ${p} `.includes(` ${saidNorm} `) || ` ${saidNorm} `.includes(` ${p} `);
        });
    const related = normalizeRelatedOccurrences(c["relatedOccurrences"], transcript, said);
    const next: CoachCorrection = { category, said, betterVersion, whyEn, whyEs, ...(related.length ? { relatedOccurrences: related } : {}) };
    if (dupIndex >= 0) {
      const prev = out[dupIndex]!;
      const prevNorm = normalizeForMatch(prev.said);
      // The same quote, only more complete → it becomes the primary and the shorter one is dropped.
      if (` ${saidNorm} `.includes(` ${prevNorm} `) && saidNorm.length > prevNorm.length) {
        out[dupIndex] = { ...next, ...(prev.relatedOccurrences ? { relatedOccurrences: prev.relatedOccurrences } : {}) };
        for (const o of related) mergeOccurrence(out[dupIndex]!, o.said, o.betterVersion);
        continue;
      }
      if (` ${prevNorm} `.includes(` ${saidNorm} `)) {
        for (const o of related) mergeOccurrence(prev, o.said, o.betterVersion);
        continue;
      }
      // A DIFFERENT sentence breaking the same rule: keep it as evidence, not a new slot.
      mergeOccurrence(out[dupIndex]!, said, betterVersion);
      for (const o of related) mergeOccurrence(out[dupIndex]!, o.said, o.betterVersion);
      continue;
    }
    // One pattern item of each kind is enough.
    if (patternLike && out.some((prev) => prev.category === category)) continue;
    out.push(next);
    ruleKeys.push(ruleKey);
  }
  // Task relevance is the FIRST priority: an off-topic answer is never buried under a grammar slip.
  const relevance = out.filter((c) => c.category === "task_relevance");
  const rest = out.filter((c) => c.category !== "task_relevance");
  return [...relevance, ...rest].slice(0, max);
}

/**
 * Strict validation + safe truncation of the model output. Null = unusable.
 *
 * `transcript` (fresh model output, still in memory) grounds the correction:
 * if `correctionNeeded` is true but `said` is not a real fragment of the
 * transcript — or any correction field is missing — the correction is
 * SUPPRESSED (never fabricated) and the general next step stands. No second
 * AI call. When `transcript` is omitted (cache replay) the stored correction
 * was already grounded at generation time and is kept as-is.
 *
 * `maxCorrections` > 0 (pilot): `corrections` is validated the same way and the
 * primary v2 fields are made to mirror corrections[0] (highest priority).
 */
export function normalizeFeedback(raw: unknown, transcript?: string, maxCorrections = 0): CoachFeedback | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const targetLanguage = rating(r["targetLanguage"]);
  const organization = rating(r["organization"]);
  if (typeof r["taskCompleted"] !== "boolean" || !targetLanguage || !organization) return null;
  const text = (key: keyof typeof LIMITS): string | null => {
    const v = r[key];
    return typeof v === "string" && v.trim() ? clip(v, LIMITS[key]) : null;
  };
  const strengthEn = text("strengthEn");
  const strengthEs = text("strengthEs");
  const nextStepEn = text("nextStepEn");
  const nextStepEs = text("nextStepEs");
  if (!strengthEn || !strengthEs || !nextStepEn || !nextStepEs) return null;
  const base = { taskCompleted: r["taskCompleted"], targetLanguage, organization, strengthEn, strengthEs, nextStepEn, nextStepEs };

  if (maxCorrections > 0) {
    const corrections = normalizeCorrections(r["corrections"], maxCorrections, transcript);
    // Relevance: model value, else derived from taskCompleted. An off-topic verdict without a
    // grounded task_relevance item stays informational (never fabricated into a quote).
    const answeredTask = answeredTaskOf(r["answeredTask"]) ?? (r["taskCompleted"] ? "yes" : "partly");
    const fluencyUpgrade = normalizeFluencyUpgrade(r["fluencyUpgrade"], transcript);
    const pilotExtras = { answeredTask, fluencyUpgrade };
    if (corrections.length === 0) return { ...base, ...NO_CORRECTION, ...pilotExtras };
    const primary = corrections[0]!;
    return {
      ...base,
      correctionNeeded: true,
      said: primary.said,
      betterVersion: primary.betterVersion,
      whyEn: primary.whyEn,
      whyEs: primary.whyEs,
      practicePhrase: text("practicePhrase"),
      corrections,
      ...pilotExtras,
    };
  }

  if (r["correctionNeeded"] !== true) return { ...base, ...NO_CORRECTION };
  const saidRaw = typeof r["said"] === "string" ? r["said"].replace(/\s+/g, " ").trim() : "";
  const betterVersion = text("betterVersion");
  const whyEn = text("whyEn");
  const whyEs = text("whyEs");
  const practicePhrase = text("practicePhrase");
  if (!saidRaw || !betterVersion || !whyEn || !whyEs || !practicePhrase) return { ...base, ...NO_CORRECTION };
  if (saidRaw.length > LIMITS.said || countWords(saidRaw) > MAX_SAID_WORDS) return { ...base, ...NO_CORRECTION };
  if (transcript !== undefined && !saidOccursInTranscript(saidRaw, transcript)) return { ...base, ...NO_CORRECTION };
  // A "correction" identical to what was said is not a correction.
  if (normalizeForMatch(saidRaw) === normalizeForMatch(betterVersion)) return { ...base, ...NO_CORRECTION };
  return { ...base, correctionNeeded: true, said: saidRaw, betterVersion, whyEn, whyEs, practicePhrase, corrections: [] };
}

export function feedbackFromRow(row: FeedbackRow, maxCorrections = 0): CoachFeedback | null {
  return normalizeFeedback(
    {
      taskCompleted: row.task_completed,
      targetLanguage: row.target_language,
      organization: row.organization,
      strengthEn: row.strength_en,
      strengthEs: row.strength_es,
      nextStepEn: row.next_step_en,
      nextStepEs: row.next_step_es,
      correctionNeeded: row.correction_needed === true,
      said: row.said,
      betterVersion: row.better_version,
      whyEn: row.why_en,
      whyEs: row.why_es,
      practicePhrase: row.practice_phrase,
      corrections: row.corrections ?? [],
      answeredTask: row.answered_task ?? undefined,
      fluencyUpgrade: row.fluency_upgrade ?? null,
    },
    undefined,
    maxCorrections,
  );
}

/* ------------------------------------------------------------------------ */
/*  Prompt (used by the route's LLM adapter)                                 */
/* ------------------------------------------------------------------------ */

const LEVEL_GUIDANCE: Record<CoachRubric["level"], string> = {
  basic:
    "Level: BASIC. Be highly forgiving. Prioritise communication and any attempt at the day's structure. Short simple sentences are a success. " +
    "NEXT STEP (BASIC): ONE very concrete idea or chunk the learner can ADD, with a short example sentence in English they can say. " +
    "Never vague ('Add more details', 'Practice the past tense'). Good: \"Add when it happened: 'I visited my friends at seven.'\" / \"Add one reason: 'I like my job because I learn new things.'\" / \"Add what happened next: 'Then I went back home.'\"",
  eagles:
    "Level: EAGLES (functional English). Look for connected ideas, reasons (because / so), and whether the message would work with a real customer or colleague. " +
    "NEXT STEP (INTERMEDIATE): ONE way to DEVELOP the answer — connect ideas, give a reason, explain a recommendation, use because / so / for example, or functional customer/colleague language — with a short example. Never 'add another sentence'.",
  tigers:
    "Level: TIGERS. Look for explanation, comparison, justification and development of ideas when the task asks for it. " +
    "NEXT STEP (INTERMEDIATE): ONE way to DEVELOP the answer — explain, compare, justify, defend the opinion, or give a reason + example — with a short example. Never 'add another sentence'.",
  sharks:
    "Level: SHARKS. Look for reaction, adaptation to the interlocutor and sustained communication when the task asks for it. " +
    "NEXT STEP (INTERMEDIATE): ONE way to DEVELOP the answer — react, adapt, respond to the new information, develop the answer, or explain why — with a short example. Never 'add another sentence'.",
  advanced:
    "Level: ADVANCED (interview preparation). Evaluate whether the learner followed the day's communication framework and developed the answer with a concrete example. Idea count is NOT a grade here; quality and framework execution matter more. " +
    "NEXT STEP (ADVANCED): ONE high-value improvement to structure, evidence, specificity, impact, adaptation or framework execution (direct answer first, concrete example, result/impact, evidence, STAR when appropriate, why it mattered, answer the actual follow-up, clearer conclusion, no vague claims), with a short example. " +
    "Never generic ('Add more detail'). Good: \"Add the result: 'As a result, the customer stayed with the company.'\" / \"Give one concrete example instead of saying 'I work well under pressure.'\"",
};

export function buildCoachMessages(
  rubric: CoachRubric,
  transcript: string,
  estimatedIdeaCount: number | null,
  speakingSeconds: number | null = null,
) {
  const task = rubric.turn
    ? [
        `Task type: role play turn ${rubric.sourceTurnNumber}.`,
        rubric.turn.situation ? `Situation: ${rubric.turn.situation}` : null,
        `Interlocutor (${rubric.turn.label}) said: "${rubric.turn.text}"`,
        rubric.turn.cues?.length ? `Answer cues: ${rubric.turn.cues.join(" → ")}` : null,
        rubric.turn.framework ? `Framework "${rubric.turn.framework.title}": ${rubric.turn.framework.steps.join(" → ")}` : null,
      ]
    : [
        "Task type: independent speaking.",
        `Question: "${rubric.prompt?.question ?? ""}"`,
        rubric.prompt?.tips ? `Guidance given to the learner: ${rubric.prompt.tips}` : null,
      ];
  const system = [
    "You are a warm, concise English speaking coach for Spanish-speaking adult learners.",
    "You evaluate ONE spoken answer transcript. Speech-to-text punctuation is unreliable; ignore it.",
    "Never grade accent or pronunciation. Never compare word-for-word with a model answer.",
    "Never make employment decisions, level certifications (A2/B2/C1) or claims like 'you would fail'. This is coaching, not certification.",
    "Evaluate only: (1) task completion — did they answer the actual question/turn; (2) target language — a reasonable attempt at the day's focus; (3) organization — several understandable connected ideas for the level.",
    "Return ONE genuine strength and ONE highest-value next step, each as ONE short sentence, in English AND natural Latin American Spanish. No lists of mistakes.",
    ...(rubric.maxCorrections && rubric.maxCorrections > 0
      ? multiCorrectionGuidance(rubric.maxCorrections, rubric.moduleId)
      : [
          "Then decide on AT MOST ONE specific correction (language / grammar / vocabulary / task usage ONLY — never pronunciation, accent or phonemes, because you only see a transcript). Prioritise the day's language focus: tense, missing auxiliary, third-person -s, negative/question structure, an important word choice, a connector, the target structure, or organization when clearly useful.",
          "If there is a clear, high-value error: set correctionNeeded=true; `said` = a SHORT phrase (max 12 words) copied EXACTLY, word for word, from the transcript (never paraphrase, never invent); `betterVersion` = the corrected phrase; `whyEn`/`whyEs` = ONE very simple reason; `practicePhrase` = one short natural English sentence to repeat that uses the correct form.",
          "If the target skill was successful and there is no clear high-value error, do NOT invent one: set correctionNeeded=false and set said, betterVersion, whyEn, whyEs and practicePhrase to null. Never hunt for tiny mistakes.",
        ]),
    `Hard limits: strengthEn ≤ ${LIMITS.strengthEn} chars, strengthEs ≤ ${LIMITS.strengthEs}, nextStepEn ≤ ${LIMITS.nextStepEn}, nextStepEs ≤ ${LIMITS.nextStepEs}, said ≤ ${LIMITS.said}, betterVersion ≤ ${LIMITS.betterVersion}, whyEn ≤ ${LIMITS.whyEn}, whyEs ≤ ${LIMITS.whyEs}, practicePhrase ≤ ${LIMITS.practicePhrase}. No paragraphs.`,
    LEVEL_GUIDANCE[rubric.level],
  ].join(" ");
  // A role-play / Pressure Round Final Audio is ONE turn. goalSentences is a
  // whole-day target, so it must never be presented as the target for that turn.
  const goal = rubric.turn
    ? [
        rubric.turn.targetSeconds
          ? `Target speaking time: ${rubric.turn.targetSeconds[0]}–${rubric.turn.targetSeconds[1]} seconds.`
          : null,
        "This is ONE role-play response. Evaluate this response only. Do not compare it with the whole-day idea target.",
      ]
    : [
        `Target: about ${rubric.goalSentences} complete ideas.`,
        estimatedIdeaCount !== null ? `Estimated complete ideas already counted: ${estimatedIdeaCount}.` : null,
        // The UI computes exactly how many ideas are missing; the model only suggests WHAT to add.
        estimatedIdeaCount !== null && estimatedIdeaCount < rubric.goalSentences
          ? "The learner is still below the idea target: the next step should preferably help them ADD ONE useful idea toward the goal (say what idea, with an example). Do not mention numbers of ideas."
          : null,
        // Pilot only: speaking time lets the model see "enough ideas, but far too short" (development, not success).
        rubric.maxCorrections && rubric.maxCorrections > 0 && speakingSeconds !== null && Number.isFinite(speakingSeconds)
          ? `Speaking time: ${Math.round(speakingSeconds)} seconds (target ${rubric.goalSeconds[0]}–${rubric.goalSeconds[1]} seconds).`
          : null,
      ];
  const user = [
    `Module: ${rubric.moduleLabel} · Day ${rubric.day}`,
    `Topic: ${rubric.topic}`,
    `Language focus: ${rubric.focus}`,
    ...task.filter(Boolean),
    ...goal,
    "",
    "TRANSCRIPT:",
    transcript,
  ]
    .filter((line) => line !== null)
    .join("\n");
  return [
    { role: "system" as const, content: system },
    { role: "user" as const, content: user },
  ];
}

/**
 * BASIC multi-correction guidance (same single LLM call). Priority: task
 * relevance → the day's target grammar/tense → repetition/variety → connection
 * → development. The module hint only ILLUSTRATES the target language; the
 * CourseDay "Language focus" in the user message stays the source of truth.
 * Grammar correctness alone is never treated as fluency. Never padded.
 */
const MODULE_TENSE_HINT: Record<string, string> = {
  "basic-zero": "foundational sentence construction and basic personal information: 'I am from...', 'She is my sister', 'I have two brothers', missing verb 'to be' ('I 25 years old' → 'I am 25 years old')",
  "simple-present": "Simple Present routines and habits, especially third-person -s: 'My sister work' → 'My sister works', 'She don't work' → \"She doesn't work\", 'He like it' → 'He likes it'",
  "simple-future": "future forms (will / going to): 'Tomorrow I go to work' → \"Tomorrow I'm going to work\", 'I will to travel' → 'I will travel', 'She going to study' → \"She's going to study\"",
  "past-stories": "Simple Past: 'I go yesterday' → 'I went yesterday', 'I buyed' → 'I bought', 'They was' → 'They were', \"I didn't went\" → \"I didn't go\", 'Yesterday I wake up' → 'Yesterday I woke up'",
  "mixed-tenses": "choosing the RIGHT tense for the meaning (past / present / future) instead of one tense everywhere: 'Yesterday I go' → 'Yesterday I went', 'Every day she work' → 'Every day she works', 'Tomorrow I went' → \"Tomorrow I'm going to...\". Never convert every verb to one tense",
};

function multiCorrectionGuidance(max: number, moduleId: string): string[] {
  const intermediate = isIntermediateCoachModule(moduleId);
  const levelWord = intermediate ? "INTERMEDIATE" : "BASIC";
  const tenseHint =
    MODULE_TENSE_HINT[moduleId] ??
    "the grammar/tense the day's Language focus targets (missing auxiliary, third-person -s, wrong tense, negative/question structure)";
  const basicPriority =
    "Priority order: (1) task_relevance — if answeredTask is 'no' or 'partly', the FIRST item MUST be category task_relevance: `said` = a short phrase they actually said that is off the question, `betterVersion` = how to START answering the real question (e.g. \"Yesterday, I woke up at seven and then...\"), why = they were asked X. Never spend the first slot on a minor grammar slip when the question was not answered. " +
    `(2) verb_tense / target grammar — this module's target language is ${tenseHint}. Follow the day's Language focus above all; never impose a tense the day does not target. ` +
    "Never ignore an important grammar error that blocks correct communication. " +
    "(3) repetition — the SAME verb, sentence opening, connector or structure repeated so much the speech sounds basic even when it is correct (e.g. 'we went… we went… we went…', 'then… then… then…', every sentence starting with 'I'). Category repetition, NEVER grammar: `said` = the repeated fragments joined by '...' (each fragment copied exactly, e.g. \"we went... we went... we went...\"), `betterVersion` = ONE short more varied version for BASIC level (e.g. \"We watched a movie first. After that, we spent some time at the beach.\"). " +
    "(4) connector — then / after that / later / because / so. (5) development — add when, where, who, what happened next, how they felt. Also grammar / word_choice / naturalness when clearly important. Do not force every category.";
  const intermediatePriority =
    "Priority order (ADAPTIVE — pick only what this answer really needs, in this order of value): (1) task_relevance — if answeredTask is 'no' or 'partly', the FIRST item MUST be category task_relevance: `said` = a short phrase they actually said that is off the question, `betterVersion` = how to START answering the real question, why = they were asked X. Fluent English on the wrong answer is still the top problem. " +
    "(2) the day's target language / CourseDay objective (the Language focus above is the source of truth — Eagles, Tigers and Sharks days differ; never apply one generic intermediate rubric). " +
    "(3) important grammar — INTERMEDIATE learners still need grammar corrected: \"She don't really enjoy it\" → \"She doesn't really enjoy it\", \"I've been working here since three years\" → \"...for three years\", missing auxiliaries, wrong question/negative structure. Never skip a real grammar error because the learner is intermediate. " +
    "(4) verb_tense — meaningful tense errors (\"Yesterday we go to the beach\" → \"Yesterday we went to the beach\"). Classify by the ACTUAL error, not by the module. " +
    "(5) word_choice. (6) naturalness — a genuinely more natural way to say it (\"I have five years working here\" → \"I've worked here for five years\"); NEVER replace correct, natural English just because another phrasing exists. " +
    "(7) connector — disconnected sentences (\"I went home. I ate. I watched TV.\" → \"I went home, ate dinner, and then watched TV.\") using because / so / but / then / after that / however / although / for example as the level and day allow. " +
    "(8) repetition — the SAME verb, opening or structure repeated so much it limits range; category repetition, NEVER grammar: `said` = the repeated fragments joined by '...' copied exactly, `betterVersion` = ONE short more varied version. " +
    "(9) development — an answer that is correct but underdeveloped: add a reason, example, comparison, consequence, feeling or detail that the task calls for. (10) clarity. " +
    "Adaptive means: if the learner made 4 different important grammar mistakes, use 4 slots on grammar; never reserve slots for connectors or development.";
  const noFakeErrors = intermediate
    ? "NEVER use a correction (❌/✅) for language that is already correct and only COULD be stronger. `corrections` items are only for: wrong grammar, wrong tense, problematic word choice, clearly unnatural English, task mismatch, or genuinely limiting repetition. Correct-but-simple language belongs in the next step (development / connect your ideas), never in a correction."
    : "";
  return [
    "FIRST decide `answeredTask`: did the learner answer THIS exact question? 'yes' = clearly on topic; 'partly' = touches it but drifts or answers something adjacent; 'no' = talks about something else.",
    `Then choose the ${max} HIGHEST-LEARNING-VALUE items at most (0 to ${max}) as the \`corrections\` array, in priority order. TOTAL maximum ${max} across every category — never ${max} grammar + ${max} fluency. Fewer is fine; an empty array is fine. NEVER add an item just to reach ${max}: a strong answer with 2 real issues gets exactly 2 items, and an excellent answer may get 0.`,
    intermediate ? intermediatePriority : basicPriority,
    ...(noFakeErrors ? [noFakeErrors] : []),
    `Repeated SAME rule: when the learner breaks the SAME reusable rule more than once, do NOT spend two items on it. Keep ONE item and put the other occurrences in \`relatedOccurrences\` (max ${MAX_RELATED_OCCURRENCES}); each one: \`said\` copied EXACTLY from the transcript, \`betterVersion\` correcting THAT exact phrase (e.g. "I'm going visit my family" → "I'm going to visit my family"). Empty array when the error happened once. Group ONLY the same rule (going to + verb; third-person -s; didn't + base verb; doesn't with he/she/it) — never group two different rules just because both are grammar. Use the freed slots for OTHER important errors.`,
    '`ruleKey`: a short stable snake_case id of the rule taught by the item (e.g. "going_to_missing_to", "third_person_s", "did_base_verb"). Same rule = same ruleKey. Internal only, never shown to the learner.',
    `If the same pattern appears many times, still show only the primary + max ${MAX_RELATED_OCCURRENCES} occurrences; the why may mention it happened several times in ONE short line.`,
    "Skip entirely: punctuation, capitalization, tiny stylistic preferences, accent, phonemes, and Spanish-influenced English that is still clear. One item per underlying issue — never quote the same error twice.",
    `Each item: category ∈ ${JSON.stringify(CORRECTION_CATEGORIES)}; \`said\` = a SHORT phrase (max 12 words; repetition: fragments joined by '...') copied EXACTLY, word for word, from the transcript (never paraphrase, never invent — an invented quote is discarded); \`betterVersion\` = the better phrase; \`whyEn\` / \`whyEs\` = ONE very simple reason (natural Latin American Spanish). Give a why ONLY when it teaches a reusable rule; keep it to one short line, never a paragraph.`,
    `\`fluencyUpgrade\`: ONE optional short upgrade showing how to sound more natural and connected: \`original\` = ONE short section (max 25 words) copied EXACTLY from the transcript (never the whole answer), \`improved\` = the same content said more fluently for ${levelWord} level (connectors, variety, one detail). null when nothing useful.`,
    "Time vs ideas: if the learner produced enough separate ideas but spoke far below the target time, do NOT treat the speaking goal as achieved — the ideas were too short. Then the next step must be DEVELOPMENT: their ideas are clear but very short; add when it happened, who they were with or how they felt (with an example). Grammar correctness alone is never enough to call the answer fluent.",
    `Do NOT repeat the same teaching point twice: if a correction (or the fluencyUpgrade) already teaches it, the next step must teach the NEXT most useful improvement. For ${levelWord}, the next step should give one concrete phrase or chunk to reuse, never a generic motivational sentence.`,
    "ONE strength only: one short grounded sentence about what they really did well — never a praise paragraph.",
    "Also fill the primary fields to mirror corrections[0]: correctionNeeded=true, said, betterVersion, whyEn, whyEs and ONE `practicePhrase` (a short natural English sentence using the better form). If corrections is empty: correctionNeeded=false and all of those null.",
  ];
}

const CORRECTION_ITEM_SCHEMA = {
  type: "object",
  additionalProperties: false,
  required: ["category", "said", "betterVersion", "whyEn", "whyEs", "ruleKey", "relatedOccurrences"],
  properties: {
    category: { type: "string", enum: [...CORRECTION_CATEGORIES] },
    said: { type: "string" },
    betterVersion: { type: "string" },
    whyEn: { type: "string" },
    whyEs: { type: "string" },
    /** Internal grouping id only (e.g. "going_to_missing_to"); never shown to the learner. */
    ruleKey: { type: "string" },
    relatedOccurrences: {
      type: "array",
      maxItems: MAX_RELATED_OCCURRENCES,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["said", "betterVersion"],
        properties: { said: { type: "string" }, betterVersion: { type: "string" } },
      },
    },
  },
} as const;

export const COACH_JSON_SCHEMA = {
  name: "final_audio_coach",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: [
      "taskCompleted",
      "targetLanguage",
      "organization",
      "strengthEn",
      "strengthEs",
      "nextStepEn",
      "nextStepEs",
      "correctionNeeded",
      "said",
      "betterVersion",
      "whyEn",
      "whyEs",
      "practicePhrase",
    ],
    properties: {
      taskCompleted: { type: "boolean" },
      targetLanguage: { type: "string", enum: ["good", "developing"] },
      organization: { type: "string", enum: ["good", "developing"] },
      strengthEn: { type: "string" },
      strengthEs: { type: "string" },
      nextStepEn: { type: "string" },
      nextStepEs: { type: "string" },
      correctionNeeded: { type: "boolean" },
      said: { type: ["string", "null"] },
      betterVersion: { type: ["string", "null"] },
      whyEn: { type: ["string", "null"] },
      whyEs: { type: ["string", "null"] },
      practicePhrase: { type: ["string", "null"] },
    },
  },
} as const;

/** Pilot schema = v2 schema + `corrections` array + answeredTask + fluencyUpgrade (same call, same model). */
export const COACH_JSON_SCHEMA_MULTI = {
  name: "final_audio_coach_multi",
  strict: true,
  schema: {
    ...COACH_JSON_SCHEMA.schema,
    required: [...COACH_JSON_SCHEMA.schema.required, "corrections", "answeredTask", "fluencyUpgrade"],
    properties: {
      ...COACH_JSON_SCHEMA.schema.properties,
      corrections: { type: "array", maxItems: MULTI_CORRECTION_MAX.intermediate, items: CORRECTION_ITEM_SCHEMA },
      answeredTask: { type: "string", enum: ["yes", "partly", "no"] },
      fluencyUpgrade: {
        type: ["object", "null"],
        additionalProperties: false,
        required: ["original", "improved"],
        properties: { original: { type: "string" }, improved: { type: "string" } },
      },
    },
  },
} as const;

/** Response schema for a rubric: pilot days get the multi-correction shape. */
export function coachJsonSchemaFor(rubric: Pick<CoachRubric, "maxCorrections">) {
  return rubric.maxCorrections && rubric.maxCorrections > 0 ? COACH_JSON_SCHEMA_MULTI : COACH_JSON_SCHEMA;
}

/* ------------------------------------------------------------------------ */
/*  Engine                                                                   */
/* ------------------------------------------------------------------------ */

function isModule(value: string): value is ModuleId {
  return typeof value === "string" && value.length > 0;
}

export async function runFinalAudioCoach(input: CoachInput, deps: CoachDeps): Promise<CoachResponse> {
  const startedAt = deps.now();
  let sttCalled = false;
  let llmCalled = false;
  let cacheHit = false;
  let transcriptWordCount: number | null = null;
  let sourceTurnNumber: number | null = null;
  // Resolved per request: "v3.2-basic" on BASIC modules, "v2" everywhere else.
  const coachVersion = coachVersionFor(input.moduleId, input.day);
  const maxCorrections = maxCorrectionsFor(input.moduleId, input.day);
  const pilot = maxCorrections > 0;
  // Logs never include the transcript (only its word count).
  const finish = (res: CoachResponse, extra: Record<string, unknown> = {}): CoachResponse => {
    deps.log?.({
      moduleId: input.moduleId,
      day: input.day,
      takeNumber: input.takeNumber,
      sourceTurnNumber,
      cacheHit,
      status: res.body.status,
      http: res.http,
      sttCalled,
      llmCalled,
      transcriptWordCount,
      coachVersion,
      maxCorrections,
      durationMs: deps.now() - startedAt,
      ...extra,
    });
    return res;
  };

  // 1) Lightweight shape check, then the REAL CourseDay decides the maximum
  //    Take number (classic = 5, Pressure Round = rep5Turns.length). Nothing
  //    client-declared is trusted. Runs before Storage, quota or any paid call.
  if (
    !isModule(input.moduleId) ||
    !Number.isInteger(input.day) ||
    input.day < 1 ||
    !Number.isInteger(input.takeNumber) ||
    input.takeNumber < 1
  ) {
    return finish({ http: 404, body: { status: "not_found" } });
  }
  const day = await deps.loadDay(input.moduleId, input.day);
  if (!day) return finish({ http: 404, body: { status: "not_found" } });
  const maxTakeNumber = maxTakeNumberFor(day);
  if (input.takeNumber > maxTakeNumber) {
    return finish({ http: 404, body: { status: "not_found" } }, { reason: "invalid_take_number", maxTakeNumber });
  }

  // 2) Ownership + readiness.
  const rec = await deps.fetchRecording(deps.userId, input);
  if (
    !rec ||
    rec.user_id !== deps.userId ||
    rec.module_id !== input.moduleId ||
    rec.day !== input.day ||
    rec.take_number !== input.takeNumber ||
    rec.audio_purged_at !== null ||
    !rec.storage_path ||
    !rec.storage_path.startsWith(`${deps.userId}/`)
  ) {
    return finish({ http: 404, body: { status: "not_found" } });
  }
  if (!rec.is_final_rep) return finish({ http: 409, body: { status: "final_audio_not_ready" } });
  sourceTurnNumber = rec.source_turn_number;

  // 3) Minimal rubric from the same loaded day (server-derived, never from the client).
  const rubric = buildRubric(day, input.moduleId, deps.moduleLabel(input.moduleId), sourceTurnNumber);
  if (!rubric) return finish({ http: 404, body: { status: "not_found" } });

  // 3) Trusted audio → server-side SHA-256.
  const audio = await deps.downloadAudio(rec.storage_path);
  if (!audio || audio.byteLength < MIN_FINAL_AUDIO_BYTES) return finish({ http: 404, body: { status: "not_found" } });
  if (audio.byteLength > MAX_FINAL_AUDIO_BYTES) return finish({ http: 413, body: { status: "audio_too_large" } });
  const [audioSha256, rubricHash] = await Promise.all([sha256Hex(audio), rubricSha256(rubric)]);
  const key: CacheKey = { userId: deps.userId, audioSha256, rubricSha256: rubricHash, coachVersion };

  // 4) Cache lookup — 0 AI calls on a hit, regardless of quota.
  const cached = await deps.store.findExisting(key);
  let leaseId: string | null = null;
  if (cached) {
    if (cached.status === "ready") {
      const feedback = feedbackFromRow(cached, maxCorrections);
      if (feedback) {
        cacheHit = true;
        transcriptWordCount = cached.transcript_word_count;
        // Pilot replay: durable corrections, but the transcript is never stored → null, no STT to rebuild it.
        return finish({ http: 200, body: pilot ? { status: "ready", feedback, transcript: null } : { status: "ready", feedback } });
      }
    } else if (cached.status === "unclear") {
      cacheHit = true;
      return finish({ http: 200, body: { status: "unclear" } });
    } else if (cached.status === "pending") {
      const age = deps.now() - new Date(cached.updated_at).getTime();
      if (age < PENDING_STALE_MS) return finish({ http: 202, body: { status: "pending" } });
    }
    // stale pending, error, or a ready row with unusable content → one atomic reclaim.
    const reclaimed = await deps.store.tryReclaim(cached.id, cached.updated_at);
    if (!reclaimed) return finish({ http: 202, body: { status: "pending" } });
    leaseId = cached.id;
  } else {
    // 5) Lease claim through the unique constraint: only one inserter wins.
    const inserted = await deps.store.tryInsertPending({
      ...key,
      moduleId: input.moduleId,
      day: input.day,
      takeNumber: input.takeNumber,
      sourceTurnNumber,
      estimatedIdeaCount: rec.estimated_idea_count,
    });
    if (!inserted) {
      // Lost the race: the winner (or a finished row) now exists.
      const winner = await deps.store.findExisting(key);
      if (winner?.status === "ready") {
        const feedback = feedbackFromRow(winner, maxCorrections);
        if (feedback) {
          cacheHit = true;
          return finish({ http: 200, body: pilot ? { status: "ready", feedback, transcript: null } : { status: "ready", feedback } });
        }
      }
      if (winner?.status === "unclear") {
        cacheHit = true;
        return finish({ http: 200, body: { status: "unclear" } });
      }
      return finish({ http: 202, body: { status: "pending" } });
    }
    const mine = await deps.store.findExisting(key);
    if (!mine) return finish({ http: 202, body: { status: "pending" } });
    leaseId = mine.id;
  }

  // 6) Quota — only for NEW analyses, after the lease is ours.
  const allowed = await deps.consumeQuota(deps.userId);
  if (!allowed) {
    await deps.store.finalize(leaseId, { status: "error" });
    return finish({ http: 429, body: { status: "rate_limited" } });
  }

  // 7) One STT call (Turbo only — no large-v3 fallback). Provider failure → error;
  //    successful STT with too few words or unreliable confidence → unclear.
  sttCalled = true;
  const stt = await deps.stt(audio, rec.mime_type);
  if (!stt.ok) {
    await deps.store.finalize(leaseId, { status: "error" });
    return finish({ http: 200, body: { status: "error", code: "stt_failed" } });
  }
  const transcript = stt.text.trim();
  transcriptWordCount = countWords(transcript);
  const lowConfidence = isLowConfidence(stt.confidence);
  if (transcriptWordCount < MIN_TRANSCRIPT_WORDS || lowConfidence) {
    await deps.store.finalize(leaseId, { status: "unclear", transcriptWordCount });
    return finish(
      { http: 200, body: { status: "unclear" } },
      { unclearReason: lowConfidence ? "low_confidence" : "too_few_words" },
    );
  }

  // 8) One small text-model call, both languages at once.
  llmCalled = true;
  let feedback: CoachFeedback | null = null;
  try {
    // Transcript still in memory: `said` is grounded here, then the transcript is dropped (never stored).
    feedback = normalizeFeedback(
      await deps.llm(rubric, transcript, rec.estimated_idea_count, rec.duration_seconds ?? null),
      transcript,
      maxCorrections,
    );
  } catch {
    feedback = null;
  }
  if (!feedback) {
    await deps.store.finalize(leaseId, { status: "error", transcriptWordCount });
    return finish({ http: 200, body: { status: "error", code: "coach_failed" } });
  }
  await deps.store.finalize(leaseId, { status: "ready", feedback, transcriptWordCount });
  // Pilot only: the transcript travels to THIS response (React state) and is then discarded — never persisted or logged.
  return finish({ http: 200, body: pilot ? { status: "ready", feedback, transcript } : { status: "ready", feedback } });
}
