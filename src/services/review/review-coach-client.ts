import type { ModuleId, Recording } from "@/lib/types";
import type { ReviewModuleId, ReviewPracticeNumber } from "@/lib/review-types";
import { REVIEW_EVALUATED_TAKE } from "@/lib/review-types";
import { CloudSync } from "@/services/cloud-sync";
import {
  requestFinalCoachRetake,
  runFinalCoachPipeline,
  type CoachPipelineDeps,
} from "@/services/final-audio-coach-client";
import type { FinalCoachRetakeState, FinalCoachState } from "@/lib/final-audio-coach";

/**
 * REVIEW · AI coach transport.
 *
 * Reuses the EXACT existing pipeline (upload → mark final → 1 analysis, bounded
 * polling, one optional retake bound to the feedback id). The Review module id
 * travels as a plain string; the server validates it explicitly against the
 * Review registry — it is never treated as the curriculum module "simple-present".
 * The transport types are curriculum-typed, so the id is cast at this single
 * boundary and nowhere else.
 */
function asTransportModuleId(moduleId: ReviewModuleId): ModuleId {
  return moduleId as unknown as ModuleId;
}

const reviewDeps: CoachPipelineDeps | undefined = undefined;

/** Runs the coach on the evaluated audio (position 4) of one Review practice. */
export function runReviewCoach(
  input: { moduleId: ReviewModuleId; practiceNumber: ReviewPracticeNumber; recording: Recording },
  onState: (state: FinalCoachState) => void,
  signal?: AbortSignal,
): Promise<FinalCoachState> {
  return runFinalCoachPipeline(
    {
      moduleId: asTransportModuleId(input.moduleId),
      // Review has no role play: `day` is the practice number, no rep5Turns.
      day: { day: input.practiceNumber },
      finalRecording: input.recording,
      finalTakeNumber: REVIEW_EVALUATED_TAKE,
    },
    onState,
    reviewDeps ?? undefined,
    signal,
  );
}

/** The single optional retake (audio position 5), bound to the feedback just shown. */
export function runReviewRetake(
  input: { moduleId: ReviewModuleId; practiceNumber: ReviewPracticeNumber; blob: Blob; feedbackId: string },
  signal?: AbortSignal,
): Promise<FinalCoachRetakeState> {
  return requestFinalCoachRetake(
    {
      moduleId: asTransportModuleId(input.moduleId),
      day: input.practiceNumber,
      blob: input.blob,
      feedbackId: input.feedbackId,
      sourceTurnNumber: null,
    },
    signal,
  );
}

/** Stores one Review rehearsal / final audio (private bucket, same retention rules). */
export async function uploadReviewTake(input: {
  moduleId: ReviewModuleId;
  practiceNumber: ReviewPracticeNumber;
  takeNumber: number;
  recording: Recording;
}): Promise<boolean> {
  const { ok } = await CloudSync.uploadTake({
    moduleId: asTransportModuleId(input.moduleId),
    day: input.practiceNumber,
    takeNumber: input.takeNumber,
    recording: input.recording,
  });
  return ok;
}
