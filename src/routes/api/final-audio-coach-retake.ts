import { createFileRoute } from "@tanstack/react-router";
import type { ModuleId } from "@/lib/types";
import type { ExistingRetake, RetakeDeps } from "@/lib/final-coach-retake.server";
import type { FinalCoachRetakeResult } from "@/lib/final-audio-coach";

/**
 * STEP 5 · Optional RETAKE (BASIC 3 · Day 1 pilot only).
 *
 * POST multipart { file, moduleId, day }. The retake audio is transient: it is
 * transcribed and compared with the learner's previous validated feedback, then
 * dropped. Nothing is written to recordings, day completion, streak or habit.
 * Max ONE retake per feedback row (unique constraint). Cost: 1 STT + 1 LLM,
 * only when the learner explicitly taps RETAKE.
 */
const AUDIO_EXT: Record<string, string> = {
  "audio/webm": "webm",
  "audio/mp4": "mp4",
  "audio/x-m4a": "m4a",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/ogg": "ogg",
};

export const Route = createFileRoute("/api/final-audio-coach-retake")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { verifyRequestUser, consumeQuota } = await import("@/lib/route-auth.server");
          const userId = await verifyRequestUser(request);
          if (!userId) return json({ error: "Sign in first." }, 401);

          const engine = await import("@/lib/final-coach-retake.server");
          const declared = Number(request.headers.get("content-length") ?? 0);
          if (declared > engine.MAX_FINAL_AUDIO_BYTES + 64 * 1024) return json({ status: "audio_too_large" }, 413);

          let file: File | null = null;
          let moduleId: string | null = null;
          let day = NaN;
          let sourceTurnNumber: number | null | undefined;
          let feedbackId = "";
          // A malformed turn value is NEVER silently dropped: it must fail, not fall
          // back to "whatever the feedback row says".
          let turnMalformed = false;
          try {
            const form = await request.formData();
            const formFile = form.get("file");
            file = formFile instanceof File ? formFile : null;
            moduleId = String(form.get("moduleId") ?? "");
            day = Number(form.get("day"));
            feedbackId = String(form.get("feedbackId") ?? "").trim();
            const rawTurn = form.get("sourceTurnNumber");
            if (rawTurn !== null) {
              // "" = classic STEP 5 (explicit null); a positive integer = role-play / Pressure Round turn.
              const parsed = String(rawTurn) === "" ? null : Number(rawTurn);
              if (parsed === null || (Number.isInteger(parsed) && parsed > 0)) sourceTurnNumber = parsed;
              else turnMalformed = true;
            }
          } catch {
            file = null;
          }
          const { isModuleId, CourseService } = await import("@/services/course-service");
          const { isReviewModuleId } = await import("@/lib/review-types");
          const validModule = !!moduleId && (isModuleId(moduleId) || isReviewModuleId(moduleId));
          if (!validModule || !Number.isInteger(day) || day < 1) return json({ error: "Invalid input." }, 400);
          if (turnMalformed) return json({ error: "Invalid input." }, 400);
          // Missing/malformed feedback identity fails before storage, quota, lease or AI work.
          const { isFeedbackId } = await import("@/lib/final-audio-coach");
          if (!isFeedbackId(feedbackId)) return json({ status: "no_feedback" }, 404);
          if (!engine.isRetakePilot(moduleId, day)) return json({ status: "not_available" }, 403);
          if (!file || file.size < engine.MIN_FINAL_AUDIO_BYTES) return json({ status: "unclear" }, 200);
          if (file.size > engine.MAX_FINAL_AUDIO_BYTES) return json({ status: "audio_too_large" }, 413);
          const mime = (file.type || "audio/webm").split(";")[0]?.trim().toLowerCase() ?? "audio/webm";
          if (!AUDIO_EXT[mime]) return json({ error: "Unsupported audio format." }, 415);
          const audio = new Uint8Array(await file.arrayBuffer());


          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const coach = await import("@/lib/final-audio-coach.server");
          const providers = await import("@/lib/final-coach-providers.server");

          const deps: RetakeDeps = {
          userId,
          now: () => Date.now(),
          loadDay: async (mid, d) => {
            try {
              const loaded = await CourseService.loadModule(mid as ModuleId);
              return loaded.days.find((x) => x.day === d) ?? null;
            } catch {
              return null;
            }
          },
          moduleLabel: (mid) => {
            try {
              const m = CourseService.getModule(mid as ModuleId);
              return `${m.label} ${m.title}`.trim();
            } catch {
              return mid;
            }
          },
          // EXACT review the learner is looking at: id + owner + module + day + ready.
          findPreviousFeedback: async (uid, mid, d, fid) => {
            const { data } = await supabaseAdmin
              .from("final_audio_coach_feedback")
              .select(
                "id, next_step_en, next_step_es, corrections, fluency_upgrade, coach_version, source_turn_number, correction_needed, said, better_version, why_en, why_es",
              )
              .eq("id", fid)
              .eq("user_id", uid)
              .eq("module_id", mid)
              .eq("day", d)
              .eq("status", "ready")
              .maybeSingle();
            if (!data || typeof data.next_step_en !== "string" || typeof data.next_step_es !== "string") return null;
            // Stored corrections were grounded at generation time; re-validate shape only.
            // v2 rows (ADVANCED) keep their single correction in the flat columns.
            const multi = coach.normalizeCorrections(data.corrections, Math.max(1, coach.maxCorrectionsFor(mid, d)));
            const flat =
              data.correction_needed && typeof data.said === "string" && typeof data.better_version === "string"
                ? [
                    {
                      category: "grammar" as const,
                      said: data.said,
                      betterVersion: data.better_version,
                      whyEn: data.why_en ?? "",
                      whyEs: data.why_es ?? "",
                    },
                  ]
                : [];
            return {
              id: data.id,
              corrections: multi.length > 0 ? multi : flat,
              nextStepEn: data.next_step_en,
              nextStepEs: data.next_step_es,
              fluencyUpgrade: coach.normalizeFluencyUpgrade(data.fluency_upgrade),
              sourceTurnNumber: data.source_turn_number ?? null,
            };
          },

          store: {
            findExisting: async (feedbackId) => {
              const { data, error } = await supabaseAdmin
                .from("final_audio_coach_retakes")
                .select("id, feedback_id, status, audio_sha256, result, idea_count, updated_at")
                .eq("feedback_id", feedbackId)
                .eq("user_id", userId)
                .maybeSingle();
              if (error) {
                console.error("[final-audio-coach-retake] findExisting failed", error.message);
                throw new Error("retake lookup failed");
              }
              if (!data) return null;
              const status = data.status as ExistingRetake["status"];
              return {
                id: data.id,
                feedbackId: data.feedback_id,
                status,
                audioSha256: data.audio_sha256 ?? "",
                result: data.result && typeof data.result === "object" && !Array.isArray(data.result) ? (data.result as unknown as FinalCoachRetakeResult) : null,
                // 0 stays 0; legacy rows without a stored count stay null.
                ideaCount: typeof data.idea_count === "number" && Number.isFinite(data.idea_count) && data.idea_count >= 0 ? data.idea_count : null,
                updatedAt: data.updated_at,
              };
            },
            tryInsertPending: async (row) => {
              const { data, error } = await supabaseAdmin
                .from("final_audio_coach_retakes")
                .insert({ user_id: row.userId, feedback_id: row.feedbackId, module_id: row.moduleId, day: row.day, audio_sha256: row.audioSha256, status: "pending" })
                .select("id")
                .maybeSingle();
              if (error) {
                if (error.code !== "23505") console.error("[final-audio-coach-retake] lease insert failed", error.message);
                return null;
              }
              return data?.id ?? null;
            },
            // Optimistic lock: only the caller that still sees the ERROR row exactly as read may reclaim it.
            tryReclaimError: async (id, updatedAt) => {
              const { data, error } = await supabaseAdmin
                .from("final_audio_coach_retakes")
                .update({ status: "pending", result: null, transcript_word_count: null, idea_count: null })
                .eq("id", id)
                .eq("status", "error")
                .eq("updated_at", updatedAt)
                .select("id");
              if (error) {
                console.error("[final-audio-coach-retake] reclaim failed", error.message);
                return false;
              }
              return (data?.length ?? 0) === 1;
            },
            finalize: async (id, patch) => {
              const { error } = await supabaseAdmin
                .from("final_audio_coach_retakes")
                .update({
                  status: patch.status,
                  transcript_word_count: patch.transcriptWordCount ?? null,
                  // Compact validated result only. Never the transcript. audio_sha256 is never touched.
                  result: patch.result ? (patch.result as never) : null,
                  idea_count: typeof patch.ideaCount === "number" && Number.isFinite(patch.ideaCount) && patch.ideaCount >= 0 ? patch.ideaCount : null,
                })
                .eq("id", id);
              if (error) console.error("[final-audio-coach-retake] finalize failed", error.message);
            },
            discard: async (id) => {
              const { error } = await supabaseAdmin.from("final_audio_coach_retakes").delete().eq("id", id);
              if (error) console.error("[final-audio-coach-retake] discard failed", error.message);
            },
          },
          consumeQuota: async (uid) =>
            (await consumeQuota(uid, engine.RETAKE_QUOTA_ENDPOINT, engine.RETAKE_QUOTA_LIMIT, engine.RETAKE_QUOTA_WINDOW_SECONDS)).allowed,
          stt: (bytes, m) => providers.transcribeFinalAudio(bytes, m, "final-audio-coach-retake"),
          llm: (ctx, transcript) => providers.coachChatJson(engine.buildRetakeMessages(ctx, transcript), engine.RETAKE_JSON_SCHEMA, "final-audio-coach-retake"),
          log: (entry) => console.info("[final-audio-coach-retake]", entry),
          };

          const result = await engine.runFinalCoachRetake(
            { moduleId, day, audio, mime, feedbackId, ...(sourceTurnNumber === undefined ? {} : { sourceTurnNumber }) },
            deps,
          );

          return json(result.body, result.http);
        } catch (error) {
          console.error(
            "[final-audio-coach-retake] unhandled route error",
            error instanceof Error ? error.message : "unknown error",
          );
          return json({ status: "error", code: "internal" }, 500);
        }
      },
    },
  },
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
