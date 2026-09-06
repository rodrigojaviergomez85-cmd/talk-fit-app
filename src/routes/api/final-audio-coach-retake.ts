import { createFileRoute } from "@tanstack/react-router";
import type { ModuleId } from "@/lib/types";
import type { RetakeDeps } from "@/lib/final-coach-retake.server";

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
        const { verifyRequestUser, consumeQuota } = await import("@/lib/route-auth.server");
        const userId = await verifyRequestUser(request);
        if (!userId) return json({ error: "Sign in first." }, 401);

        const engine = await import("@/lib/final-coach-retake.server");
        const declared = Number(request.headers.get("content-length") ?? 0);
        if (declared > engine.MAX_FINAL_AUDIO_BYTES + 64 * 1024) return json({ status: "audio_too_large" }, 413);

        let file: File | null = null;
        let moduleId: string | null = null;
        let day = NaN;
        try {
          const form = await request.formData();
          file = form.get("file") instanceof File ? (form.get("file") as File) : null;
          moduleId = String(form.get("moduleId") ?? "");
          day = Number(form.get("day"));
        } catch {
          file = null;
        }
        const { isModuleId, CourseService } = await import("@/services/course-service");
        if (!moduleId || !isModuleId(moduleId) || !Number.isInteger(day) || day < 1) return json({ error: "Invalid input." }, 400);
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
          findPreviousFeedback: async (uid, mid, d) => {
            const { data } = await supabaseAdmin
              .from("final_audio_coach_feedback")
              .select("id, next_step_en, next_step_es, corrections, fluency_upgrade, coach_version")
              .eq("user_id", uid)
              .eq("module_id", mid)
              .eq("day", d)
              .eq("status", "ready")
              .order("updated_at", { ascending: false })
              .limit(1)
              .maybeSingle();
            if (!data || typeof data.next_step_en !== "string" || typeof data.next_step_es !== "string") return null;
            return {
              id: data.id,
              // Stored corrections were grounded at generation time; re-validate shape only.
              corrections: coach.normalizeCorrections(data.corrections, coach.maxCorrectionsFor(mid, d)),
              nextStepEn: data.next_step_en,
              nextStepEs: data.next_step_es,
              fluencyUpgrade: coach.normalizeFluencyUpgrade(data.fluency_upgrade),
            };
          },
          store: {
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
            finalize: async (id, patch) => {
              const { error } = await supabaseAdmin
                .from("final_audio_coach_retakes")
                .update({
                  status: patch.status,
                  transcript_word_count: patch.transcriptWordCount ?? null,
                  // Compact validated result only. Never the transcript.
                  result: patch.result ? (patch.result as never) : null,
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
            (await consumeQuota(uid, engine.COACH_QUOTA_ENDPOINT, engine.COACH_QUOTA_LIMIT, engine.COACH_QUOTA_WINDOW_SECONDS)).allowed,
          stt: (bytes, m) => providers.transcribeFinalAudio(bytes, m, "final-audio-coach-retake"),
          llm: (ctx, transcript) => providers.coachChatJson(engine.buildRetakeMessages(ctx, transcript), engine.RETAKE_JSON_SCHEMA, "final-audio-coach-retake"),
          log: (entry) => console.info("[final-audio-coach-retake]", entry),
        };

        const result = await engine.runFinalCoachRetake({ moduleId, day, audio, mime }, deps);
        return json(result.body, result.http);
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
