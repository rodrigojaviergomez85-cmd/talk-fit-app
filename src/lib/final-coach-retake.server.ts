/**
 * STEP 5 · Optional RETAKE — "did the learner apply the previous feedback?"
 * (BASIC 3 · Simple Past · Day 1 pilot only).
 *
 * BONUS IMPROVEMENT ROUND: the day is already committed. This engine never
 * touches recordings, day completion, streak, habit or progression. It costs
 * exactly 1 STT + 1 small LLM, ONLY when the learner explicitly taps RETAKE,
 * at most ONCE per feedback row (unique constraint = durable lease).
 *
 * All I/O is injected so the flow is unit-testable without providers.
 */
import type { CourseDay, ModuleId } from "./types";
import {
  RETAKE_SKILLS,
  isRetakePilot,
  type FinalAudioCoachFluencyUpgrade,
  type FinalCoachRetakeResult,
  type RetakeApplied,
  type RetakeSkill,
} from "./final-audio-coach";
import {
  MAX_FINAL_AUDIO_BYTES,
  MIN_FINAL_AUDIO_BYTES,
  MIN_TRANSCRIPT_WORDS,
  countWords,
  isLowConfidence,
  normalizeForMatch,
  quoteFragments,
  saidOccursInTranscript,
  sha256Hex,
  type CoachCorrection,
  type SttResult,
} from "./final-audio-coach.server";

export { MAX_FINAL_AUDIO_BYTES, MIN_FINAL_AUDIO_BYTES, isRetakePilot };

/** Dedicated durable quota: normal Final Coach usage never blocks the optional retake (and vice versa). */
export const RETAKE_QUOTA_ENDPOINT = "final-audio-coach-retake";
export const RETAKE_QUOTA_LIMIT = 5;
export const RETAKE_QUOTA_WINDOW_SECONDS = 24 * 60 * 60;

export const RETAKE_LIMITS = { message: 160, improvement: 180, next: 180 } as const;
export const MAX_RETAKE_EVIDENCE_WORDS = 15;

/** The validated previous feedback the retake is compared against (server-loaded, never from the client). */
export type PreviousFeedback = {
  id: string;
  corrections: CoachCorrection[];
  nextStepEn: string;
  nextStepEs: string;
  fluencyUpgrade: FinalAudioCoachFluencyUpgrade | null;
};

export type RetakeInput = { moduleId: string; day: number; audio: Uint8Array; mime: string | null };

export type RetakeStatus = "pending" | "ready" | "unclear" | "error";
export type RetakeFinalizePatch = { status: Exclude<RetakeStatus, "pending">; result?: FinalCoachRetakeResult | undefined; transcriptWordCount?: number | null | undefined };

/** The one durable retake row for a feedback (server-computed audio identity). */
export type ExistingRetake = {
  id: string;
  feedbackId: string;
  status: RetakeStatus;
  audioSha256: string;
  result: FinalCoachRetakeResult | null;
  /** Opaque optimistic-lock token (updated_at as read). */
  updatedAt: string;
};

export type RetakeDeps = {
  userId: string;
  now: () => number;
  loadDay: (moduleId: ModuleId, day: number) => Promise<CourseDay | null>;
  /** Latest READY pilot feedback for this learner/module/day (validated corrections). Null = no coach review yet. */
  findPreviousFeedback: (userId: string, moduleId: string, day: number) => Promise<PreviousFeedback | null>;
  store: {
    /** The existing retake row for this feedback (UNIQUE feedback_id), or null on first retake. */
    findExisting: (feedbackId: string) => Promise<ExistingRetake | null>;
    /** INSERT (unique feedback_id) → the id, or null when a retake already exists for that feedback. */
    tryInsertPending: (row: { userId: string; feedbackId: string; moduleId: string; day: number; audioSha256: string }) => Promise<string | null>;
    /**
     * Atomic technical reclaim of an ERROR row for the SAME audio:
     * UPDATE … SET status='pending' WHERE id=? AND status='error' AND updated_at=? → true when this caller won.
     */
    tryReclaimError: (id: string, updatedAt: string) => Promise<boolean>;
    finalize: (id: string, patch: RetakeFinalizePatch) => Promise<void>;
    /** Remove a brand-new lease that never consumed AI work (e.g. rate-limited) so the learner keeps their ONE retake. */
    discard?: ((id: string) => Promise<void>) | undefined;
  };
  consumeQuota: (userId: string) => Promise<boolean>;
  stt: (audio: Uint8Array, mime: string | null) => Promise<SttResult>;
  llm: (context: RetakeLlmContext, transcript: string) => Promise<unknown | null>;
  log?: ((entry: Record<string, unknown>) => void) | undefined;
};

export type RetakeResponse =
  | { http: 200; body: { status: "ready"; result: FinalCoachRetakeResult } }
  | { http: 200; body: { status: "unclear" } }
  | { http: 200; body: { status: "error"; code: string } }
  | { http: 202; body: { status: "pending" } }
  | { http: 403; body: { status: "not_available" } }
  | { http: 404; body: { status: "no_feedback" } }
  | { http: 409; body: { status: "already_used" } }
  | { http: 413; body: { status: "audio_too_large" } }
  | { http: 429; body: { status: "rate_limited" } };

/* ------------------------------------------------------------------------ */
/*  Prompt                                                                   */
/* ------------------------------------------------------------------------ */

export type RetakeLlmContext = {
  question: string;
  topic: string;
  focus: string;
  previous: PreviousFeedback;
};

export function buildRetakeMessages(ctx: RetakeLlmContext, transcript: string) {
  const prev = ctx.previous;
  const system = [
    "You are a warm, concise English speaking coach for Spanish-speaking adult BASIC learners.",
    "The learner already received feedback on a first answer and has now recorded the WHOLE answer again to APPLY that feedback.",
    "Your ONLY job: compare the NEW transcript with the PREVIOUS feedback and say what was applied. Do NOT re-evaluate the answer from scratch. Do NOT list new mistakes except ONE remaining thing to keep practicing.",
    "Speech-to-text punctuation is unreliable; ignore it. Never grade accent or pronunciation. Never mention CEFR levels, scores or percentages.",
    "For EVERY previous item return one `applied` entry: `skill` = the item's category (or 'next_step' / 'fluency_upgrade'); `applied` = true ONLY if the new transcript clearly shows it (the corrected form appears / the old error is gone / the connector or detail was added); `evidence` = a SHORT phrase (max 12 words) copied EXACTLY from the NEW transcript that proves it (required when applied=true, empty string otherwise). Never invent improvement.",
    "`messageEn` / `messageEs` = ONE short encouraging sentence naming exactly what they did (e.g. \"You used 'woke up' correctly this time.\" / \"Esta vez usaste 'woke up' correctamente.\"), or when not applied, what still slipped.",
    "`improvementEn` / `improvementEs` = ONE sentence on the biggest overall improvement in fluency (variety, connection, development, relevance) — or an honest neutral sentence if there is none. `nextEn` / `nextEs` = ONE concrete thing to keep practicing.",
    `Hard limits: message ≤ ${RETAKE_LIMITS.message} chars, improvement ≤ ${RETAKE_LIMITS.improvement}, next ≤ ${RETAKE_LIMITS.next}. Natural Latin American Spanish. No paragraphs.`,
  ].join(" ");
  const prevLines = prev.corrections.map(
    (c, i) => `${i + 1}. [${c.category}] said: "${c.said}" → better: "${c.betterVersion}" (${c.whyEn})`,
  );
  const user = [
    `Topic: ${ctx.topic}`,
    `Language focus: ${ctx.focus}`,
    `Question: "${ctx.question}"`,
    "",
    "PREVIOUS FEEDBACK:",
    ...(prevLines.length ? prevLines : ["(no specific corrections)"]),
    `Next step given: ${prev.nextStepEn}`,
    prev.fluencyUpgrade ? `Fluency upgrade suggested: "${prev.fluencyUpgrade.original}" → "${prev.fluencyUpgrade.improved}"` : null,
    "",
    "NEW TRANSCRIPT (retake):",
    transcript,
  ]
    .filter((l) => l !== null)
    .join("\n");
  return [
    { role: "system" as const, content: system },
    { role: "user" as const, content: user },
  ];
}

export const RETAKE_JSON_SCHEMA = {
  name: "final_audio_coach_retake",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["applied", "improvementEn", "improvementEs", "nextEn", "nextEs"],
    properties: {
      applied: {
        type: "array",
        maxItems: 6,
        items: {
          type: "object",
          additionalProperties: false,
          required: ["skill", "applied", "evidence", "messageEn", "messageEs"],
          properties: {
            skill: { type: "string", enum: [...RETAKE_SKILLS] },
            applied: { type: "boolean" },
            evidence: { type: "string" },
            messageEn: { type: "string" },
            messageEs: { type: "string" },
          },
        },
      },
      improvementEn: { type: "string" },
      improvementEs: { type: "string" },
      nextEn: { type: "string" },
      nextEs: { type: "string" },
    },
  },
} as const;

/* ------------------------------------------------------------------------ */
/*  Output validation — every "applied" claim is grounded deterministically  */
/* ------------------------------------------------------------------------ */

function clip(text: string, max: number): string {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : `${t.slice(0, max - 1).replace(/[\s,;:]+$/, "")}…`;
}

function isSkill(value: unknown): value is RetakeSkill {
  return typeof value === "string" && (RETAKE_SKILLS as readonly string[]).includes(value);
}

/** True when the OLD mistake is still present in the retake transcript (any repeated fragment counts). */
export function previousErrorStillPresent(correction: CoachCorrection, transcript: string): boolean {
  return quoteFragments(correction.said).some((f) => saidOccursInTranscript(f, transcript));
}

/**
 * Rules (per item — a bad item is dropped or downgraded, never the whole result):
 *  - skill must refer to something that was actually in the previous feedback
 *  - applied=true requires: grounded `evidence` in the retake transcript AND, for a
 *    correction, that the old `said` error no longer appears (or a repetition/relevance
 *    pattern is not simply repeated verbatim) — otherwise it is downgraded to false
 *  - one entry per skill; messages clipped
 */
export function normalizeRetakeResult(raw: unknown, previous: PreviousFeedback, transcript: string): FinalCoachRetakeResult | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const text = (key: "improvementEn" | "improvementEs" | "nextEn" | "nextEs"): string | null => {
    const v = r[key];
    const max = key.startsWith("next") ? RETAKE_LIMITS.next : RETAKE_LIMITS.improvement;
    return typeof v === "string" && v.trim() ? clip(v, max) : null;
  };
  const improvementEn = text("improvementEn");
  const improvementEs = text("improvementEs");
  const nextEn = text("nextEn");
  const nextEs = text("nextEs");
  if (!improvementEn || !improvementEs || !nextEn || !nextEs) return null;

  const allowed = new Set<RetakeSkill>(previous.corrections.map((c) => c.category));
  allowed.add("next_step");
  if (previous.fluencyUpgrade) allowed.add("fluency_upgrade");

  const applied: RetakeApplied[] = [];
  const seen = new Set<RetakeSkill>();
  for (const item of Array.isArray(r["applied"]) ? r["applied"] : []) {
    if (!item || typeof item !== "object") continue;
    const a = item as Record<string, unknown>;
    if (!isSkill(a["skill"]) || !allowed.has(a["skill"]) || seen.has(a["skill"])) continue;
    const skill = a["skill"];
    const messageEn = typeof a["messageEn"] === "string" && a["messageEn"].trim() ? clip(a["messageEn"], RETAKE_LIMITS.message) : null;
    const messageEs = typeof a["messageEs"] === "string" && a["messageEs"].trim() ? clip(a["messageEs"], RETAKE_LIMITS.message) : null;
    if (!messageEn || !messageEs) continue;
    let ok = a["applied"] === true;
    if (ok) {
      const evidence = typeof a["evidence"] === "string" ? a["evidence"].replace(/\s+/g, " ").trim() : "";
      if (!evidence || countWords(evidence) > MAX_RETAKE_EVIDENCE_WORDS || !saidOccursInTranscript(evidence, transcript)) ok = false;
      const related = previous.corrections.filter((c) => c.category === skill);
      // "You fixed it" is only true when the old wording really is gone from the retake.
      if (ok && related.length > 0 && related.every((c) => previousErrorStillPresent(c, transcript))) ok = false;
      // The evidence must not itself be the old mistake.
      if (ok && related.some((c) => normalizeForMatch(c.said) === normalizeForMatch(evidence))) ok = false;
    }
    seen.add(skill);
    applied.push({ skill, applied: ok, messageEn, messageEs });
  }
  return { applied, improvementEn, improvementEs, nextEn, nextEs };
}

/* ------------------------------------------------------------------------ */
/*  Engine                                                                   */
/* ------------------------------------------------------------------------ */

export async function runFinalCoachRetake(input: RetakeInput, deps: RetakeDeps): Promise<RetakeResponse> {
  const startedAt = deps.now();
  let sttCalled = false;
  let llmCalled = false;
  let transcriptWordCount: number | null = null;
  const finish = (res: RetakeResponse, extra: Record<string, unknown> = {}): RetakeResponse => {
    deps.log?.({
      moduleId: input.moduleId,
      day: input.day,
      status: res.body.status,
      http: res.http,
      sttCalled,
      llmCalled,
      transcriptWordCount,
      durationMs: deps.now() - startedAt,
      ...extra,
    });
    return res;
  };

  // 1) Pilot gate + real day, before any storage/quota/AI work.
  if (!isRetakePilot(input.moduleId, input.day)) return finish({ http: 403, body: { status: "not_available" } });
  const day = await deps.loadDay(input.moduleId as ModuleId, input.day);
  if (!day) return finish({ http: 403, body: { status: "not_available" } });
  if (input.audio.byteLength < MIN_FINAL_AUDIO_BYTES) return finish({ http: 200, body: { status: "unclear" } });
  if (input.audio.byteLength > MAX_FINAL_AUDIO_BYTES) return finish({ http: 413, body: { status: "audio_too_large" } });

  // 2) The retake only exists relative to a READY coach review of the same day.
  const previous = await deps.findPreviousFeedback(deps.userId, input.moduleId, input.day);
  if (!previous) return finish({ http: 404, body: { status: "no_feedback" } });

  // 3) ONE pedagogical retake per feedback (UNIQUE feedback_id). The server-computed
  //    audio hash decides between "same recording" (cache / technical retry) and
  //    "another recording" (forbidden).
  const audioSha256 = await sha256Hex(input.audio);
  const existing = await deps.store.findExisting(previous.id);
  let leaseId: string | null = null;
  let reclaimed = false;
  if (existing) {
    if (existing.audioSha256 !== audioSha256) return finish({ http: 409, body: { status: "already_used" } }, { cache: "different_audio" });
    // Same audio: replay whatever already happened — 0 STT, 0 LLM, 0 quota.
    if (existing.status === "ready" && existing.result) return finish({ http: 200, body: { status: "ready", result: existing.result } }, { cache: "hit" });
    if (existing.status === "ready") return finish({ http: 200, body: { status: "error", code: "cache_invalid" } }, { cache: "invalid" });
    if (existing.status === "pending") return finish({ http: 202, body: { status: "pending" } }, { cache: "pending" });
    if (existing.status === "unclear") return finish({ http: 200, body: { status: "unclear" } }, { cache: "unclear" });
    // ERROR + same audio → technical reprocessing of that exact recording; only one caller wins.
    if (!(await deps.store.tryReclaimError(existing.id, existing.updatedAt))) return finish({ http: 202, body: { status: "pending" } }, { cache: "reclaim_lost" });
    leaseId = existing.id;
    reclaimed = true;
  } else {
    leaseId = await deps.store.tryInsertPending({ userId: deps.userId, feedbackId: previous.id, moduleId: input.moduleId, day: input.day, audioSha256 });
    // Lost an insert race: the other request owns the same feedback → treat as pending (no AI here).
    if (!leaseId) return finish({ http: 202, body: { status: "pending" } }, { cache: "insert_race" });
  }

  // 4) DEDICATED retake quota (new analyses only; never the main Final Coach quota).
  if (!(await deps.consumeQuota(deps.userId))) {
    // No AI work happened — the learner keeps their one retake.
    if (reclaimed) await deps.store.finalize(leaseId, { status: "error" });
    else await deps.store.discard?.(leaseId);
    return finish({ http: 429, body: { status: "rate_limited" } });
  }

  // 5) One STT.
  sttCalled = true;
  const stt = await deps.stt(input.audio, input.mime);
  if (!stt.ok) {
    await deps.store.finalize(leaseId, { status: "error" });
    return finish({ http: 200, body: { status: "error", code: "stt_failed" } });
  }
  const transcript = stt.text.trim();
  transcriptWordCount = countWords(transcript);
  if (transcriptWordCount < MIN_TRANSCRIPT_WORDS || isLowConfidence(stt.confidence)) {
    await deps.store.finalize(leaseId, { status: "unclear", transcriptWordCount });
    return finish({ http: 200, body: { status: "unclear" } });
  }

  // 6) One small LLM comparison, grounded afterwards. Transcript never leaves memory.
  llmCalled = true;
  let result: FinalCoachRetakeResult | null = null;
  try {
    const ctx: RetakeLlmContext = { question: day.rep5Prompt.question, topic: day.topic, focus: day.focus, previous };
    result = normalizeRetakeResult(await deps.llm(ctx, transcript), previous, transcript);
  } catch {
    result = null;
  }
  if (!result) {
    await deps.store.finalize(leaseId, { status: "error", transcriptWordCount });
    return finish({ http: 200, body: { status: "error", code: "coach_failed" } });
  }
  await deps.store.finalize(leaseId, { status: "ready", result, transcriptWordCount });
  return finish({ http: 200, body: { status: "ready", result } });
}
