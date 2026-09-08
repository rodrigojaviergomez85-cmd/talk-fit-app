/**
 * Final Audio AI Coach — learner-side orchestration.
 *
 * Runs ONLY after COMPLETE DAY, in the background, once the day is already
 * completed locally. Sequence:
 *   ensure the selected Final Take is stored (idempotent upload)
 *   → mark it Final in the backend
 *   → POST { moduleId, day, takeNumber } to /api/final-audio-coach
 *   → bounded polling while the durable lease is pending
 * Failure here never touches day completion, streak, habit or progress.
 * Selecting / changing Final Audio must never reach this module.
 */
import { supabase } from "@/integrations/supabase/client";
import { CloudSync } from "./cloud-sync";
import {
  isFeedbackId,
  sourceTurnNumberFor,
  type FinalAudioCoachResponse,
  type FinalCoachRetakeResponse,
  type FinalCoachRetakeState,
  type FinalCoachState,
} from "@/lib/final-audio-coach";
import type { CourseDay, ModuleId, Recording } from "@/lib/types";

export type CoachRequest = { moduleId: ModuleId; day: number; takeNumber: number };

/** What one request to the coach endpoint produced (transport-level). */
export type CoachHttpResult =
  | { kind: "response"; http: number; body: FinalAudioCoachResponse | null }
  | { kind: "network_error" };

export type CoachPipelineDeps = {
  uploadFinalTake: (input: {
    moduleId: ModuleId;
    day: number;
    takeNumber: number;
    recording: Recording;
    isFinalRep: false;
    sourceTurnNumber: number | null;
    /** Same-audio guarantee re-upload: must preserve any already-saved idea count. */
    preserveExistingIdeaCount: true;
  }) => Promise<{ ok: boolean }>;
  markFinalTake: (moduleId: ModuleId, day: number, takeNumber: number) => Promise<boolean>;
  requestCoach: (input: CoachRequest, signal?: AbortSignal) => Promise<CoachHttpResult>;
  sleep: (ms: number, signal?: AbortSignal) => Promise<void>;
};

/** Bounded polling while another request owns the analysis lease (~20 s of waits + request time). */
export const PENDING_POLL_DELAYS_MS = [2000, 3000, 5000, 5000, 5000] as const;
/** One short retry when the Final flag is not yet visible to the API (occurs before any paid AI). */
export const NOT_READY_RETRY_DELAY_MS = 1000;

async function currentAccessToken(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

/** Sends ONLY moduleId / day / takeNumber. The server derives everything else. */
export async function requestFinalAudioCoach(input: CoachRequest, signal?: AbortSignal): Promise<CoachHttpResult> {
  const token = await currentAccessToken();
  if (!token) return { kind: "response", http: 401, body: null };
  try {
    const res = await fetch("/api/final-audio-coach", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ moduleId: input.moduleId, day: input.day, takeNumber: input.takeNumber }),
      ...(signal ? { signal } : {}),
    });
    const body = (await res.json().catch(() => null)) as FinalAudioCoachResponse | null;
    return { kind: "response", http: res.status, body };
  } catch {
    return { kind: "network_error" };
  }
}

function defaultSleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal?.aborted) return resolve();
    const id = setTimeout(done, ms);
    function done() {
      signal?.removeEventListener("abort", done);
      clearTimeout(id);
      resolve();
    }
    signal?.addEventListener("abort", done, { once: true });
  });
}

export const defaultCoachDeps: CoachPipelineDeps = {
  uploadFinalTake: (input) => CloudSync.uploadTake(input),
  markFinalTake: (moduleId, day, takeNumber) => CloudSync.markFinalTake(moduleId, day, takeNumber),
  requestCoach: requestFinalAudioCoach,
  sleep: defaultSleep,
};

function stateFrom(result: CoachHttpResult): FinalCoachState | "pending" | "not_ready" | "network" {
  if (result.kind === "network_error") return "network";
  const { http, body } = result;
  if (http === 200 && body?.status === "ready") {
    // Pilot only: transient transcript for THIS session's React state (never stored client-side).
    // `feedbackId` identifies the exact persisted review and must survive fresh
    // responses, cache replays and polling alike — the retake is bound to it.
    return {
      status: "ready",
      feedback: body.feedback,
      ...(body.transcript !== undefined ? { transcript: body.transcript } : {}),
      ...(isFeedbackId(body.feedbackId) ? { feedbackId: body.feedbackId.trim() } : {}),
    };
  }
  if (http === 200 && body?.status === "unclear") return { status: "unclear" };
  if (http === 202 || body?.status === "pending") return "pending";
  if (http === 409 || body?.status === "final_audio_not_ready") return "not_ready";
  if (http === 429 || body?.status === "rate_limited") return { status: "rate_limited" };
  // error / rate_limited / 401 / 404 / 413 / anything else: terminal, no technical detail to the learner.
  return { status: "unavailable" };
}

/**
 * Requests the analysis with the bounded retry rules:
 *  - 409 not ready  → one retry after ~1 s
 *  - network error  → one retry (backend SHA/lease dedupes if the first reached it)
 *  - 202 pending    → poll 2 s, 3 s, 5 s, then give up for this session
 */
export async function requestCoachWithRetries(
  input: CoachRequest,
  deps: Pick<CoachPipelineDeps, "requestCoach" | "sleep">,
  signal?: AbortSignal,
): Promise<FinalCoachState> {
  let notReadyRetried = false;
  let networkRetried = false;
  let pendingPolls = 0;
  for (;;) {
    if (signal?.aborted) return { status: "unavailable" };
    const outcome = stateFrom(await deps.requestCoach(input, signal));
    if (typeof outcome !== "string") return outcome;
    if (outcome === "not_ready") {
      if (notReadyRetried) return { status: "unavailable" };
      notReadyRetried = true;
      await deps.sleep(NOT_READY_RETRY_DELAY_MS, signal);
      continue;
    }
    if (outcome === "network") {
      if (networkRetried) return { status: "unavailable" };
      networkRetried = true;
      continue;
    }
    // pending
    const delay = PENDING_POLL_DELAYS_MS[pendingPolls];
    if (delay === undefined) return { status: "unavailable" };
    pendingPolls += 1;
    await deps.sleep(delay, signal);
  }
}

export type CoachPipelineInput = {
  moduleId: ModuleId;
  day: Pick<CourseDay, "day" | "rep5Turns">;
  finalRecording: Recording;
  /** ONE-BASED Take number of the selected Final Audio (classic 1–5, Pressure Round may exceed 5). */
  finalTakeNumber: number;
};

/**
 * Full background pipeline. `onState` is called with every transition; the
 * caller decides whether to still apply it (e.g. skip after unmount).
 */
export async function runFinalCoachPipeline(
  input: CoachPipelineInput,
  onState: (state: FinalCoachState) => void,
  deps: CoachPipelineDeps = defaultCoachDeps,
  signal?: AbortSignal,
): Promise<FinalCoachState> {
  const { moduleId, day, finalRecording, finalTakeNumber } = input;
  const emit = (state: FinalCoachState) => {
    if (!signal?.aborted) onState(state);
    return state;
  };
  if (!Number.isInteger(finalTakeNumber) || finalTakeNumber < 1) return emit({ status: "unavailable" });
  emit({ status: "preparing" });

  // 1. Guarantee the Final Take row + storage object exist (idempotent upsert).
  let uploaded = false;
  try {
    uploaded = (
      await deps.uploadFinalTake({
        moduleId,
        day: day.day,
        takeNumber: finalTakeNumber,
        recording: finalRecording,
        isFinalRep: false,
        sourceTurnNumber: sourceTurnNumberFor(day, finalTakeNumber - 1, finalRecording.label),
        // Same selected recording, not a new take: never erase its saved count.
        preserveExistingIdeaCount: true,
      })
    ).ok;
  } catch {
    uploaded = false;
  }
  if (!uploaded || signal?.aborted) return emit({ status: "unavailable" });

  // 2. Mark it Final — the API refuses anything that is not is_final_rep = true.
  let marked = false;
  try {
    marked = await deps.markFinalTake(moduleId, day.day, finalTakeNumber);
  } catch {
    marked = false;
  }
  if (!marked || signal?.aborted) return emit({ status: "unavailable" });

  // 3. Only now is a paid analysis requested.
  emit({ status: "analyzing" });
  const result = await requestCoachWithRetries({ moduleId, day: day.day, takeNumber: finalTakeNumber }, deps, signal);
  return emit(result);
}

/* ------------------------------------------------------------------------ */
/*  Optional retake (pilot) — same blob may be re-sent; never a new recording */
/* ------------------------------------------------------------------------ */

/** Bounded polling for the SAME retake audio while the server still owns its analysis (~15 s). No AI work happens on a poll. */
export const RETAKE_PENDING_POLL_DELAYS_MS = [2000, 3000, 5000, 5000] as const;

export type RetakeHttpResult = { kind: "response"; http: number; body: FinalCoachRetakeResponse | null } | { kind: "network_error" };

/** The retake always names the exact answer it repeats (role-play turn, or null on classic STEP 5). */
export type RetakeInput = { moduleId: ModuleId; day: number; blob: Blob; sourceTurnNumber?: number | null };

export type RetakeRequestDeps = {
  send: (input: RetakeInput, signal?: AbortSignal) => Promise<RetakeHttpResult>;
  sleep: (ms: number, signal?: AbortSignal) => Promise<void>;
};

async function postRetake(input: RetakeInput, signal?: AbortSignal): Promise<RetakeHttpResult> {
  const token = await currentAccessToken();
  if (!token) return { kind: "response", http: 401, body: null };
  try {
    const form = new FormData();
    form.append("moduleId", input.moduleId);
    form.append("day", String(input.day));
    if (input.sourceTurnNumber !== undefined) form.append("sourceTurnNumber", input.sourceTurnNumber === null ? "" : String(input.sourceTurnNumber));
    form.append("file", input.blob, "retake");
    const res = await fetch("/api/final-audio-coach-retake", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
      ...(signal ? { signal } : {}),
    });
    const body = (await res.json().catch(() => null)) as FinalCoachRetakeResponse | null;
    return { kind: "response", http: res.status, body };
  } catch {
    return { kind: "network_error" };
  }
}

/**
 * Maps one server answer to learner state.
 *  ready / unclear → terminal · technical `error` or a network failure → retryable
 *  (the caller still holds the same blob) · 429 / 409 / other → unavailable · 202 → null (keep waiting).
 */
export function mapRetakeResult(r: RetakeHttpResult): FinalCoachRetakeState | null {
  if (r.kind === "network_error") return { status: "retryable" };
  const { http, body } = r;
  // The idea count rides along with the comparison: it costs no extra transcription.
  if (http === 200 && body?.status === "ready") return { status: "ready", result: body.result, ideaCount: body.ideaCount ?? null };
  if (http === 200 && body?.status === "unclear") return { status: "unclear" };
  if (http === 202 || body?.status === "pending") return null;
  if (body?.status === "error") return { status: "retryable" };
  if (http >= 500) return { status: "retryable" };
  return { status: "unavailable" };
}


/**
 * Sends the retake audio (transient) for "did you apply the feedback?".
 * Never uploads to recordings, never touches day completion. The server keys
 * everything on the audio hash: re-sending the SAME blob is a cache replay or a
 * technical reprocess, never a second pedagogical retake. While the server
 * reports pending, the same blob is re-sent a bounded number of times.
 */
export async function requestFinalCoachRetake(
  input: RetakeInput,
  signal?: AbortSignal,
  deps: RetakeRequestDeps = { send: postRetake, sleep: defaultSleep },
): Promise<FinalCoachRetakeState> {
  let mapped = mapRetakeResult(await deps.send(input, signal));
  for (const delay of RETAKE_PENDING_POLL_DELAYS_MS) {
    if (mapped || signal?.aborted) break;
    await deps.sleep(delay, signal);
    if (signal?.aborted) break;
    mapped = mapRetakeResult(await deps.send(input, signal));
  }
  // Still pending after the bounded window: the blob is intact, the learner may retry later.
  return mapped ?? { status: "retryable" };
}
