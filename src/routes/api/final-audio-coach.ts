import { createFileRoute } from "@tanstack/react-router";
import type { ModuleId } from "@/lib/types";
import type { CoachDeps, CoachRubric, FeedbackRow, RecordingRow, SttConfidence, SttResult } from "@/lib/final-audio-coach.server";

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
const GROQ_URL = "https://api.groq.com/openai/v1/audio/transcriptions";
const GROQ_MODEL = "whisper-large-v3-turbo";
const GATEWAY_CHAT = "https://ai.gateway.lovable.dev/v1/chat/completions";
const TEXT_MODEL = "google/gemini-3.7-flash";

const AUDIO_EXT: Record<string, string> = {
  "audio/webm": "webm",
  "audio/mp4": "mp4",
  "audio/x-m4a": "m4a",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/ogg": "ogg",
};

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
        const moduleId = typeof body.moduleId === "string" && isModuleId(body.moduleId) ? body.moduleId : null;
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
              .select("id, user_id, module_id, day, take_number, is_final_rep, storage_path, mime_type, audio_purged_at, estimated_idea_count, source_turn_number")
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
            try {
              const loaded = await CourseService.loadModule(mid as ModuleId);
              return loaded.days.find((x) => x.day === d) ?? null;
            } catch {
              return null;
            }
          },
          moduleLabel: (mid) => {
            const m = CourseService.getModule(mid as ModuleId);
            return `${m.label} ${m.title}`.trim();
          },
          store: {
            findExisting: async (key) => {
              const { data } = await supabaseAdmin
                .from("final_audio_coach_feedback")
                .select("id, status, updated_at, task_completed, target_language, organization, strength_en, strength_es, next_step_en, next_step_es, correction_needed, said, better_version, why_en, why_es, practice_phrase, transcript_word_count, estimated_idea_count, corrections")
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
                .update({ status: "pending", task_completed: null, target_language: null, organization: null, strength_en: null, strength_es: null, next_step_en: null, next_step_es: null, correction_needed: null, said: null, better_version: null, why_en: null, why_es: null, practice_phrase: null, corrections: null })
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
                })
                .eq("id", id);
              if (error) console.error("[final-audio-coach] finalize failed", error.message);
            },
          },
          consumeQuota: async (uid) =>
            (await consumeQuota(uid, engine.COACH_QUOTA_ENDPOINT, engine.COACH_QUOTA_LIMIT, engine.COACH_QUOTA_WINDOW_SECONDS)).allowed,
          stt: (audio, mime) => transcribe(audio, mime),
          llm: (rubric, transcript, ideas) => evaluate(rubric, transcript, ideas),
          log: (entry) => console.info("[final-audio-coach]", entry),
        };

        const result = await engine.runFinalAudioCoach({ moduleId, day, takeNumber }, deps);
        return json(result.body, result.http);
      },
    },
  },
});

/**
 * One Groq Whisper Turbo call with verbose_json so segment confidence
 * (avg_logprob / no_speech_prob) can flag unreliable audio — same approach as
 * STEP 2. No large-v3 fallback here by design (cost). Confidence stays server-side.
 */
async function transcribe(audio: Uint8Array, mime: string | null): Promise<SttResult> {
  const apiKey = process.env["GROQ_API_KEY"];
  if (!apiKey) {
    console.error("[final-audio-coach] GROQ_API_KEY missing");
    return { ok: false };
  }
  const base = (mime ?? "audio/webm").split(";")[0]?.trim().toLowerCase() ?? "audio/webm";
  const ext = AUDIO_EXT[base] ?? "webm";
  const form = new FormData();
  form.append("model", GROQ_MODEL);
  form.append("file", new Blob([audio as BlobPart], { type: base }), `final.${ext}`);
  form.append("language", "en");
  form.append("response_format", "verbose_json");
  try {
    const res = await fetch(GROQ_URL, { method: "POST", headers: { Authorization: `Bearer ${apiKey}` }, body: form });
    if (!res.ok) {
      console.error(`[final-audio-coach] STT failed [${res.status}]`);
      return { ok: false };
    }
    const data = (await res.json().catch(() => null)) as {
      text?: unknown;
      segments?: Array<{ avg_logprob?: unknown; no_speech_prob?: unknown }>;
    } | null;
    const text = typeof data?.text === "string" ? data.text : "";
    return { ok: true, text, confidence: segmentConfidence(data?.segments) };
  } catch (err) {
    console.error("[final-audio-coach] STT error", err instanceof Error ? err.message : err);
    return { ok: false };
  }
}

/** Conservative aggregate: min avg_logprob, max no_speech_prob. Null when metadata is absent — never throws. */
function segmentConfidence(segments: unknown): SttConfidence | null {
  if (!Array.isArray(segments) || segments.length === 0) return null;
  let avgLogprob = Number.POSITIVE_INFINITY;
  let noSpeechProb = Number.NEGATIVE_INFINITY;
  let seen = false;
  for (const s of segments as Array<{ avg_logprob?: unknown; no_speech_prob?: unknown }>) {
    const lp = typeof s?.avg_logprob === "number" && Number.isFinite(s.avg_logprob) ? s.avg_logprob : null;
    const ns = typeof s?.no_speech_prob === "number" && Number.isFinite(s.no_speech_prob) ? s.no_speech_prob : null;
    if (lp !== null) {
      avgLogprob = Math.min(avgLogprob, lp);
      seen = true;
    }
    if (ns !== null) {
      noSpeechProb = Math.max(noSpeechProb, ns);
      seen = true;
    }
  }
  if (!seen) return null;
  return {
    avgLogprob: Number.isFinite(avgLogprob) ? avgLogprob : 0,
    noSpeechProb: Number.isFinite(noSpeechProb) ? noSpeechProb : 0,
  };
}

async function evaluate(rubric: CoachRubric, transcript: string, ideas: number | null): Promise<unknown | null> {
  const apiKey = process.env["LOVABLE_API_KEY"];
  if (!apiKey) {
    console.error("[final-audio-coach] LOVABLE_API_KEY missing");
    return null;
  }
  const { buildCoachMessages, coachJsonSchemaFor } = await import("@/lib/final-audio-coach.server");
  const res = await fetch(GATEWAY_CHAT, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: TEXT_MODEL,
      messages: buildCoachMessages(rubric, transcript, ideas),
      // Same single call; pilot days (multi-correction) just get the wider schema.
      response_format: { type: "json_schema", json_schema: coachJsonSchemaFor(rubric) },
    }),
  });
  if (!res.ok) {
    console.error(`[final-audio-coach] coach model failed [${res.status}]`);
    return null;
  }
  const body = (await res.json().catch(() => null)) as { choices?: Array<{ message?: { content?: unknown } }> } | null;
  const content = body?.choices?.[0]?.message?.content;
  if (typeof content !== "string") return null;
  try {
    return JSON.parse(content) as unknown;
  } catch {
    return null;
  }
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
