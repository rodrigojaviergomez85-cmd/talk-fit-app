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

/**
 * v2: the single LLM call also returns ONE transcript-grounded specific
 * correction (said / betterVersion / why / practicePhrase). Bumped so cached v1
 * rows (which never had correction fields) are not replayed as v2 feedback.
 */
export const FINAL_AUDIO_COACH_VERSION = "v2";

/** Quota: NEW analyses per learner per rolling window. Cache hits never consume it. */
export const COACH_QUOTA_ENDPOINT = "final-audio-coach";
export const COACH_QUOTA_LIMIT = 5;
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
  transcript_word_count: number | null;
  estimated_idea_count: number | null;
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
  llm: (rubric: CoachRubric, transcript: string, estimatedIdeaCount: number | null) => Promise<unknown | null>;
  log?: ((entry: Record<string, unknown>) => void) | undefined;
};

export type CoachResponse =
  | { http: 200; body: { status: "ready"; feedback: CoachFeedback } }
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
    coachVersion: FINAL_AUDIO_COACH_VERSION,
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

/** Strict validation + safe truncation of the model output. Null = unusable. */
export function normalizeFeedback(raw: unknown): CoachFeedback | null {
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
  return { taskCompleted: r["taskCompleted"], targetLanguage, organization, strengthEn, strengthEs, nextStepEn, nextStepEs };
}

export function feedbackFromRow(row: FeedbackRow): CoachFeedback | null {
  return normalizeFeedback({
    taskCompleted: row.task_completed,
    targetLanguage: row.target_language,
    organization: row.organization,
    strengthEn: row.strength_en,
    strengthEs: row.strength_es,
    nextStepEn: row.next_step_en,
    nextStepEs: row.next_step_es,
  });
}

/* ------------------------------------------------------------------------ */
/*  Prompt (used by the route's LLM adapter)                                 */
/* ------------------------------------------------------------------------ */

const LEVEL_GUIDANCE: Record<CoachRubric["level"], string> = {
  basic:
    "Level: BASIC. Be highly forgiving. Prioritise communication and any attempt at the day's structure. Short simple sentences are a success.",
  eagles:
    "Level: EAGLES (functional English). Look for connected ideas, reasons (because / so), and whether the message would work with a real customer or colleague.",
  tigers:
    "Level: TIGERS. Look for explanation, comparison, justification and development of ideas when the task asks for it.",
  sharks:
    "Level: SHARKS. Look for reaction, adaptation to the interlocutor and sustained communication when the task asks for it.",
  advanced:
    "Level: ADVANCED (interview preparation). Evaluate whether the learner followed the day's communication framework and developed the answer with a concrete example.",
};

export function buildCoachMessages(rubric: CoachRubric, transcript: string, estimatedIdeaCount: number | null) {
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
    "Return ONE strength and ONE highest-value next step, each as ONE short sentence, in English AND natural Latin American Spanish. No lists of mistakes.",
    `Hard limits: strengthEn ≤ ${LIMITS.strengthEn} chars, strengthEs ≤ ${LIMITS.strengthEs}, nextStepEn ≤ ${LIMITS.nextStepEn}, nextStepEs ≤ ${LIMITS.nextStepEs}.`,
    LEVEL_GUIDANCE[rubric.level],
  ].join(" ");
  const user = [
    `Module: ${rubric.moduleLabel} · Day ${rubric.day}`,
    `Topic: ${rubric.topic}`,
    `Language focus: ${rubric.focus}`,
    ...task.filter(Boolean),
    `Target: about ${rubric.goalSentences} complete ideas${rubric.turn?.targetSeconds ? `, ${rubric.turn.targetSeconds[0]}–${rubric.turn.targetSeconds[1]} seconds` : ""}.`,
    estimatedIdeaCount !== null ? `Estimated complete ideas already counted: ${estimatedIdeaCount}.` : null,
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

export const COACH_JSON_SCHEMA = {
  name: "final_audio_coach",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["taskCompleted", "targetLanguage", "organization", "strengthEn", "strengthEs", "nextStepEn", "nextStepEs"],
    properties: {
      taskCompleted: { type: "boolean" },
      targetLanguage: { type: "string", enum: ["good", "developing"] },
      organization: { type: "string", enum: ["good", "developing"] },
      strengthEn: { type: "string" },
      strengthEs: { type: "string" },
      nextStepEn: { type: "string" },
      nextStepEs: { type: "string" },
    },
  },
} as const;

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
      coachVersion: FINAL_AUDIO_COACH_VERSION,
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
  const key: CacheKey = { userId: deps.userId, audioSha256, rubricSha256: rubricHash, coachVersion: FINAL_AUDIO_COACH_VERSION };

  // 4) Cache lookup — 0 AI calls on a hit, regardless of quota.
  const cached = await deps.store.findExisting(key);
  let leaseId: string | null = null;
  if (cached) {
    if (cached.status === "ready") {
      const feedback = feedbackFromRow(cached);
      if (feedback) {
        cacheHit = true;
        transcriptWordCount = cached.transcript_word_count;
        return finish({ http: 200, body: { status: "ready", feedback } });
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
        const feedback = feedbackFromRow(winner);
        if (feedback) {
          cacheHit = true;
          return finish({ http: 200, body: { status: "ready", feedback } });
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
    feedback = normalizeFeedback(await deps.llm(rubric, transcript, rec.estimated_idea_count));
  } catch {
    feedback = null;
  }
  if (!feedback) {
    await deps.store.finalize(leaseId, { status: "error", transcriptWordCount });
    return finish({ http: 200, body: { status: "error", code: "coach_failed" } });
  }
  await deps.store.finalize(leaseId, { status: "ready", feedback, transcriptWordCount });
  return finish({ http: 200, body: { status: "ready", feedback } });
}
