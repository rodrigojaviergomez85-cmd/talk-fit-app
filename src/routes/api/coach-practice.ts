import { createFileRoute } from "@tanstack/react-router";
import { logGroqCall } from "@/lib/groq-call-log.server";

/**
 * Turn-based speaking practice with the AI coach (private MVP).
 *
 * One learner turn = one short Whisper transcription + one small text-model
 * call. No realtime session, no conversation stored: only the counters and the
 * cost logs. Restricted to the allow-listed pilot accounts.
 */

const ALLOWED_EMAILS = ["english4callcenters@gmail.com"];

const AUDIO_EXT: Record<string, string> = {
  "audio/webm": "webm",
  "audio/mp4": "mp4",
  "audio/x-m4a": "m4a",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/wave": "wav",
  "audio/ogg": "ogg",
};

const MIN_BYTES = 2048;
const MAX_BYTES = 1_500_000; // ~30 s of compressed voice
const DAILY_SECTION_KEY = "coach_practice";
const DAILY_FALLBACK = 40;
const HOURLY_LIMIT = 40;
const HOUR_SECONDS = 60 * 60;
const DAY_SECONDS = 24 * 60 * 60;

const GROQ_URL = "https://api.groq.com/openai/v1/audio/transcriptions";
const STT_MODEL = "whisper-large-v3-turbo";
const TEXT_MODEL = "google/gemini-3.1-flash-lite";
const NEUTRAL_PROMPT = "English learner speaking in English.";

const LEVELS = ["basic", "intermediate", "advanced"] as const;
const TENSES = ["present", "past", "future"] as const;
type Level = (typeof LEVELS)[number];
type Tense = (typeof TENSES)[number];

const LEVEL_STYLE: Record<Level, string> = {
  basic: "very short sentences, everyday words, yes/no and one-sentence questions",
  intermediate: "open questions, two-part sentences, normal everyday vocabulary",
  advanced: "opinion questions with 'why' follow-ups and natural expressions",
};

function systemPrompt(level: Level, tense: Tense): string {
  return (
    "You are Vale, a warm, experienced English teacher practicing speaking with a Spanish-speaking adult learner. " +
    "The conversation is always in English. " +
    `Learner level: ${level} (${LEVEL_STYLE[level]}). Target tense: ${tense} — your questions must naturally require the ${tense} tense. ` +
    "You receive the transcript of what the learner just said. " +
    "Reply with JSON only, no markdown, with exactly these keys: " +
    '{"correction": string|null, "sayIt": string|null, "reply": string}. ' +
    "correction: if the learner made a real grammar or word mistake, the ONE corrected sentence written naturally (for example 'I went there yesterday.'); otherwise null. " +
    "sayIt: the same corrected sentence for the learner to repeat, or null when there is no correction. " +
    "reply: what you say out loud — one short reaction plus the next question, maximum 2 short sentences, and never repeat the same question twice. " +
    "If the transcript is empty or unclear, ask them kindly to say it again in simpler English. " +
    "Never write Spanish except at most one short hint inside reply when the learner says they do not understand."
  );
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function localDay(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/El_Salvador",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

async function emailOf(userId: string): Promise<string> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data } = await supabaseAdmin.auth.admin.getUserById(userId);
  return (data?.user?.email ?? "").toLowerCase().trim();
}

export const Route = createFileRoute("/api/coach-practice")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const { verifyRequestUser, sectionDailyLimit } = await import("@/lib/route-auth.server");
        const userId = await verifyRequestUser(request);
        if (!userId) return json({ allowed: false, error: "auth" }, 401);

        const allowed = ALLOWED_EMAILS.includes(await emailOf(userId));
        if (!allowed) return json({ allowed: false });

        const dailyLimit = await sectionDailyLimit(userId, DAILY_SECTION_KEY, DAILY_FALLBACK);
        return json({ allowed: true, dailyLimit, localDay: localDay() });
      },

      POST: async ({ request }) => {
        const startedAt = Date.now();
        const { verifyRequestUser, consumeQuota, sectionDailyLimit } = await import(
          "@/lib/route-auth.server"
        );
        const userId = await verifyRequestUser(request);
        if (!userId) return json({ error: "auth" }, 401);
        if (!ALLOWED_EMAILS.includes(await emailOf(userId))) {
          return json({ error: "not_allowed" }, 403);
        }

        const declared = Number(request.headers.get("content-length") ?? 0);
        if (declared > MAX_BYTES + 64 * 1024) return json({ error: "too_large" }, 413);

        let file: File | null = null;
        let level: Level = "intermediate";
        let tense: Tense = "present";
        let history: Array<{ role: string; text: string }> = [];
        try {
          const form = await request.formData();
          const raw = form.get("file");
          file = raw instanceof File ? raw : null;
          const levelIn = String(form.get("level") ?? "");
          const tenseIn = String(form.get("tense") ?? "");
          if ((LEVELS as readonly string[]).includes(levelIn)) level = levelIn as Level;
          if ((TENSES as readonly string[]).includes(tenseIn)) tense = tenseIn as Tense;
          const historyIn = String(form.get("history") ?? "[]");
          const parsed = JSON.parse(historyIn) as unknown;
          if (Array.isArray(parsed)) {
            history = parsed
              .filter(
                (item): item is { role: string; text: string } =>
                  typeof item === "object" &&
                  item !== null &&
                  typeof (item as { text?: unknown }).text === "string",
              )
              .slice(-6)
              .map((item) => ({
                role: item.role === "coach" ? "coach" : "learner",
                text: String(item.text).slice(0, 300),
              }));
          }
        } catch {
          file = null;
        }

        if (!file || file.size < MIN_BYTES) return json({ error: "empty" }, 400);
        if (file.size > MAX_BYTES) return json({ error: "too_large" }, 413);
        const mime = (file.type || "audio/webm").split(";")[0]?.trim().toLowerCase() ?? "audio/webm";
        const ext = AUDIO_EXT[mime];
        if (!ext) return json({ error: "unsupported_format" }, 415);

        const dailyLimit = await sectionDailyLimit(userId, DAILY_SECTION_KEY, DAILY_FALLBACK);
        const daily = await consumeQuota(userId, `${DAILY_SECTION_KEY}-daily`, dailyLimit, DAY_SECONDS);
        if (!daily.allowed) return json({ error: "daily_limit", dailyLimit }, 429);
        const hourly = await consumeQuota(userId, DAILY_SECTION_KEY, HOURLY_LIMIT, HOUR_SECONDS);
        if (!hourly.allowed) return json({ error: "hourly_limit" }, 429);

        const groqKey = process.env["GROQ_API_KEY"];
        const aiKey = process.env["LOVABLE_API_KEY"];
        if (!groqKey || !aiKey) return json({ error: "config" }, 500);

        // 1) One short transcription.
        const form = new FormData();
        form.append("model", STT_MODEL);
        form.append("file", file, `turn.${ext}`);
        form.append("language", "en");
        form.append("prompt", NEUTRAL_PROMPT);
        form.append("response_format", "verbose_json");

        const sttStarted = Date.now();
        let sttRes: Response;
        try {
          sttRes = await fetch(GROQ_URL, {
            method: "POST",
            headers: { Authorization: `Bearer ${groqKey}` },
            body: form,
          });
        } catch {
          logGroqCall({ userId }, "coach-practice", STT_MODEL, null, false, "network", Date.now() - sttStarted);
          return json({ error: "stt_failed" }, 502);
        }
        if (!sttRes.ok) {
          logGroqCall(
            { userId },
            "coach-practice",
            STT_MODEL,
            null,
            false,
            String(sttRes.status),
            Date.now() - sttStarted,
          );
          return json({ error: "stt_failed" }, sttRes.status === 429 ? 429 : 502);
        }
        const sttBody = (await sttRes.json().catch(() => null)) as {
          text?: unknown;
          duration?: unknown;
        } | null;
        logGroqCall(
          { userId },
          "coach-practice",
          STT_MODEL,
          typeof sttBody?.duration === "number" ? sttBody.duration : null,
          true,
          null,
          Date.now() - sttStarted,
        );
        const transcript = typeof sttBody?.text === "string" ? sttBody.text.trim() : "";

        // 2) One small text call that returns the coach turn as JSON.
        const contextLines = history
          .map((line) => `${line.role === "coach" ? "Vale" : "Learner"}: ${line.text}`)
          .join("\n");
        const aiStarted = Date.now();
        let aiRes: Response;
        try {
          aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": aiKey,
              "X-Lovable-AIG-SDK": "fetch",
            },
            body: JSON.stringify({
              model: TEXT_MODEL,
              max_tokens: 220,
              reasoning: { enabled: false },
              response_format: { type: "json_object" },
              messages: [
                { role: "system", content: systemPrompt(level, tense) },
                {
                  role: "user",
                  content:
                    (contextLines ? `Recent conversation:\n${contextLines}\n\n` : "") +
                    `Learner just said (transcript): "${transcript}"\n` +
                    "Respond with the JSON object only.",
                },
              ],
            }),
          });
        } catch {
          logCoach(userId, null, null, false, "network", Date.now() - aiStarted);
          return json({ error: "coach_failed", transcript }, 502);
        }
        if (!aiRes.ok) {
          const detail = await aiRes.text().catch(() => "");
          console.error(`[coach-practice] gateway error [${aiRes.status}]: ${detail}`);
          logCoach(userId, null, null, false, String(aiRes.status), Date.now() - aiStarted);
          return json(
            { error: "coach_failed", transcript },
            aiRes.status === 429 || aiRes.status >= 500 ? 503 : 502,
          );
        }
        const aiBody = (await aiRes.json().catch(() => null)) as {
          choices?: Array<{ message?: { content?: unknown } }>;
          usage?: { prompt_tokens?: unknown; completion_tokens?: unknown };
        } | null;
        logCoach(
          userId,
          typeof aiBody?.usage?.prompt_tokens === "number" ? aiBody.usage.prompt_tokens : null,
          typeof aiBody?.usage?.completion_tokens === "number" ? aiBody.usage.completion_tokens : null,
          true,
          null,
          Date.now() - aiStarted,
        );

        const raw = typeof aiBody?.choices?.[0]?.message?.content === "string"
          ? (aiBody.choices[0].message.content as string)
          : "";
        const parsed = parseTurn(raw);
        if (!parsed) return json({ error: "coach_failed", transcript }, 502);

        console.info("[coach-practice]", {
          level,
          tense,
          words: transcript.split(/\s+/).filter(Boolean).length,
          corrected: Boolean(parsed.correction),
          duration: Date.now() - startedAt,
        });

        return json({
          transcript,
          correction: parsed.correction,
          sayIt: parsed.sayIt,
          reply: parsed.reply,
        });
      },
    },
  },
});

function parseTurn(
  raw: string,
): { correction: string | null; sayIt: string | null; reply: string } | null {
  const cleaned = raw.replace(/```json|```/g, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start < 0 || end <= start) return null;
  try {
    const value = JSON.parse(cleaned.slice(start, end + 1)) as {
      correction?: unknown;
      sayIt?: unknown;
      reply?: unknown;
    };
    const reply = typeof value.reply === "string" ? value.reply.trim() : "";
    if (!reply) return null;
    const correction =
      typeof value.correction === "string" && value.correction.trim() ? value.correction.trim() : null;
    const sayIt = typeof value.sayIt === "string" && value.sayIt.trim() ? value.sayIt.trim() : correction;
    return { correction, sayIt, reply: reply.slice(0, 400) };
  } catch {
    return null;
  }
}

/** Fire-and-forget cost log; never changes the learner response. */
function logCoach(
  userId: string,
  inputTokens: number | null,
  outputTokens: number | null,
  ok: boolean,
  errorCode: string | null,
  latencyMs: number,
): void {
  void import("@/lib/ai-call-log.server")
    .then(({ logAiCall }) =>
      logAiCall({
        user_id: userId,
        endpoint: "coach-practice",
        provider: "lovable-gateway",
        model: TEXT_MODEL,
        input_tokens: inputTokens,
        output_tokens: outputTokens,
        ok,
        error_code: errorCode,
        latency_ms: latencyMs,
      }),
    )
    .catch(() => {});
}
