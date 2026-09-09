import { createFileRoute } from "@tanstack/react-router";
import type { ModuleId } from "@/lib/types";
import type { CoachDeps, CoachRubric, FeedbackRow, RecordingRow } from "@/lib/final-audio-coach.server";

/**
 * STEP 5 · YOUR TURN — Final Audio Coach (backend only, no UI trigger yet).
 *
 * POST { moduleId, day, takeNumber } — nothing else is accepted. The server
 * derives the learner, the maximum Take number (from the real CourseDay:
 * classic = 5, Pressure Round = rep5Turns.length), the trusted storage object,
 * the audio hash, the curriculum rubric and the evaluation context itself.
 * Flow: auth → shape check → real-day take validation → ownership/final check
 * → rubric → download → SHA-256 → cache → lease (10-min stale) → quota
 * → 1 STT (Groq turbo, verbose_json) → 1 small text model → durable row.
 */
export const Route = createFileRoute("/api/final-audio-coach")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { verifyRequestUser, consumeQuota } = await import("@/lib/route-auth.server");
        const userId = await verifyRequestUser(request);
        if (!userId) return json({ error: "Sign in first." }, 401);

        let body: { moduleId?: unknown; day?: unknown; takeNumber?: unknown } = {};
        try {
          body = (await request.json()) as typeof body;
        } catch {
          return json({ error: "Invalid body." }, 400);
        }
        const { isModuleId } = await import("@/services/course-service");
        const { isReviewModuleId } = await import("@/lib/review-types");
        // REVIEW is accepted explicitly — never by pretending it is a curriculum module.
        const raw = typeof body.moduleId === "string" ? body.moduleId : "";
        const moduleId = isModuleId(raw) || isReviewModuleId(raw) ? raw : null;
        const day = Number(body.day);
        const takeNumber = Number(body.takeNumber);
        // Lightweight only: the engine derives the real maximum Take number from the CourseDay.
        if (!moduleId || !Number.isInteger(day) || day < 1 || !Number.isInteger(takeNumber) || takeNumber < 1) {
          return json({ error: "Invalid input." }, 400);
        }

        const engine = await import("@/lib/final-audio-coach.server");
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { CourseService } = await import("@/services/course-service");

        const deps: CoachDeps = {
          userId,
          now: () => Date.now(),
          fetchRecording: async (uid, input) => {
            const { data } = await supabaseAdmin
              .from("recordings")
              .select("id, user_id, module_id, day, take_number, is_final_rep, storage_path, mime_type, audio_purged_at, estimated_idea_count, source_turn_number, duration_seconds")
              .eq("user_id", uid)
              .eq("module_id", input.moduleId)
              .eq("day", input.day)
              .eq("take_number", input.takeNumber)
              .maybeSingle();
            return (data as RecordingRow | null) ?? null;
          },
          downloadAudio: async (storagePath) => {
            const { data, error } = await supabaseAdmin.storage.from("recordings").download(storagePath);
            if (error || !data) return null;
            if (data.size > engine.MAX_FINAL_AUDIO_BYTES) return new Uint8Array(engine.MAX_FINAL_AUDIO_BYTES + 1);
            return new Uint8Array(await data.arrayBuffer());
          },
          loadDay: async (mid, d) => {
            const review = (await import("@/services/review/review-registry")).loadReviewDay(mid, d);
            if (review) return review;
            try {
              const loaded = await CourseService.loadModule(mid as ModuleId);
              return loaded.days.find((x) => x.day === d) ?? null;
            } catch {
              return null;
            }
          },
          moduleLabel: (mid) => {
            if (mid.startsWith("review-")) return "REVIEW Simple Present";
            const m = CourseService.getModule(mid as ModuleId);
            return `${m.label} ${m.title}`.trim();
          },
          store: {
            findExisting: async (key) => {
              const { data } = await supabaseAdmin
                .from("final_audio_coach_feedback")
                .select("id, status, updated_at, task_completed, target_language, organization, strength_en, strength_es, next_step_en, next_step_es, correction_needed, said, better_version, why_en, why_es, practice_phrase, transcript_word_count, estimated_idea_count, corrections, answered_task, fluency_upgrade")
                .eq("user_id", key.userId)
                .eq("audio_sha256", key.audioSha256)
                .eq("rubric_sha256", key.rubricSha256)
                .eq("coach_version", key.coachVersion)
                .maybeSingle();
              return (data as FeedbackRow | null) ?? null;
            },
            tryInsertPending: async (row) => {
              const { error } = await supabaseAdmin.from("final_audio_coach_feedback").insert({
                user_id: row.userId,
                module_id: row.moduleId,
                day: row.day,
                take_number: row.takeNumber,
                source_turn_number: row.sourceTurnNumber,
                audio_sha256: row.audioSha256,
                rubric_sha256: row.rubricSha256,
                coach_version: row.coachVersion,
                status: "pending",
                estimated_idea_count: row.estimatedIdeaCount,
              });
              if (!error) return true;
              if (error.code !== "23505") console.error("[final-audio-coach] lease insert failed", error.message);
              return false;
            },
            tryReclaim: async (id, seenUpdatedAt) => {
              // Optimistic lock: only the request that saw this exact updated_at wins.
              const { data, error } = await supabaseAdmin
                .from("final_audio_coach_feedback")
                .update({ status: "pending", task_completed: null, target_language: null, organization: null, strength_en: null, strength_es: null, next_step_en: null, next_step_es: null, correction_needed: null, said: null, better_version: null, why_en: null, why_es: null, practice_phrase: null, corrections: null, answered_task: null, fluency_upgrade: null })
                .eq("id", id)
                .eq("updated_at", seenUpdatedAt)
                .select("id");
              return !error && Array.isArray(data) && data.length > 0;
            },
            finalize: async (id, patch) => {
              const { error } = await supabaseAdmin
                .from("final_audio_coach_feedback")
                .update({
                  status: patch.status,
                  transcript_word_count: patch.transcriptWordCount ?? null,
                  task_completed: patch.feedback?.taskCompleted ?? null,
                  target_language: patch.feedback?.targetLanguage ?? null,
                  organization: patch.feedback?.organization ?? null,
                  strength_en: patch.feedback?.strengthEn ?? null,
                  strength_es: patch.feedback?.strengthEs ?? null,
                  next_step_en: patch.feedback?.nextStepEn ?? null,
                  next_step_es: patch.feedback?.nextStepEs ?? null,
                  correction_needed: patch.feedback?.correctionNeeded ?? null,
                  said: patch.feedback?.said ?? null,
                  better_version: patch.feedback?.betterVersion ?? null,
                  why_en: patch.feedback?.whyEn ?? null,
                  why_es: patch.feedback?.whyEs ?? null,
                  practice_phrase: patch.feedback?.practicePhrase ?? null,
                  // Pilot only: compact validated array. Never the transcript. v2 days store null.
                  corrections: patch.feedback?.corrections?.length ? (patch.feedback.corrections as never) : null,
                  answered_task: patch.feedback?.answeredTask ?? null,
                  fluency_upgrade: patch.feedback?.fluencyUpgrade ? (patch.feedback.fluencyUpgrade as never) : null,
                })
                .eq("id", id);
              if (error) console.error("[final-audio-coach] finalize failed", error.message);
            },
          },
          consumeQuota: async (uid) =>
            (await consumeQuota(uid, engine.COACH_QUOTA_ENDPOINT, engine.COACH_QUOTA_LIMIT, engine.COACH_QUOTA_WINDOW_SECONDS)).allowed,
          stt: async (audio, mime) => (await import("@/lib/final-coach-providers.server")).transcribeFinalAudio(audio, mime),
          llm: (rubric, transcript, ideas, seconds) => evaluate(rubric, transcript, ideas, seconds ?? null),
          log: (entry) => console.info("[final-audio-coach]", entry),
        };

        const result = await engine.runFinalAudioCoach({ moduleId, day, takeNumber }, deps);
        return json(result.body, result.http);
      },
    },
  },
});

async function evaluate(rubric: CoachRubric, transcript: string, ideas: number | null, seconds: number | null): Promise<unknown | null> {
  const { buildCoachMessages, coachJsonSchemaFor } = await import("@/lib/final-audio-coach.server");
  const { coachChatJson } = await import("@/lib/final-coach-providers.server");
  // Same single call; pilot days (multi-correction) just get the wider schema.
  return coachChatJson(buildCoachMessages(rubric, transcript, ideas, seconds), coachJsonSchemaFor(rubric));
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
