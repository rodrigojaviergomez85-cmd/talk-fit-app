import { createFileRoute } from "@tanstack/react-router";

const MAX_QUESTION_CHARS = 600;
/** Hard generation cap sent to the gateway (verified: enforced, finish_reason "length"). */
const MAX_OUTPUT_TOKENS = 300;

const SYSTEM_PROMPT =
  "You are the Fluency App English coach for Spanish-speaking adults learning English for call-center work. " +
  "Answer ONLY questions about the English language: grammar, vocabulary, phrasal verbs, idioms, written " +
  "pronunciation tips, sentence building, and how to say something in English. " +
  "If the question is not about English, reply in one short line that you can only help with English questions. " +
  "Keep every answer under 120 words: one short explanation plus one or two useful examples. " +
  "If the learner writes in Spanish, answer in Spanish but keep the English examples in English. " +
  "Never invent app features, never grade recordings, never ask follow-up questions. " +
  "Write in plain text only: no markdown, no asterisks, no bold, no headings, no numbered lists. " +
  "Use short lines and, when listing examples, start the line with a simple dash.";

type QuotaRow = {
  allowed: boolean;
  unlimited: boolean;
  daily_used: number;
  monthly_used: number;
  daily_limit: number;
  monthly_limit: number;
  day_reset_at: string;
  month_reset_at: string;
  blocked: string;
};

type QuotaSnapshot = {
  unlimited: boolean;
  dailyUsed: number;
  monthlyUsed: number;
  dailyLimit: number;
  monthlyLimit: number;
  dayResetAt: string;
  monthResetAt: string;
  blocked: "none" | "daily" | "monthly";
};

/**
 * Short, stateless English Q&A. No conversation memory is sent or stored.
 * Per learner: 5 questions per UTC day and 60 per UTC month, reserved
 * atomically in the database BEFORE the provider is called. Unlimited internal
 * accounts skip the counters but keep the technical output cap.
 */
export const Route = createFileRoute("/api/ai-coach")({
  server: {
    handlers: {
      // Counters for the UI. Never calls the model and never consumes a question.
      GET: async ({ request }) => {
        const { verifyRequestUser } = await import("@/lib/route-auth.server");
        const userId = await verifyRequestUser(request);
        if (!userId) return json({ error: "auth" }, 401);

        const quota = await readQuota(userId);
        if (!quota) return json({ error: "quota" }, 503);
        return json({ quota });
      },

      POST: async ({ request }) => {
        const { verifyRequestUser } = await import("@/lib/route-auth.server");
        const userId = await verifyRequestUser(request);
        if (!userId) return json({ error: "auth" }, 401);

        let question = "";
        try {
          const body = (await request.json()) as { question?: unknown };
          if (typeof body.question === "string") question = body.question.trim();
        } catch {
          question = "";
        }
        if (!question) return json({ error: "empty" }, 400);
        if (question.length > MAX_QUESTION_CHARS) question = question.slice(0, MAX_QUESTION_CHARS);

        // Config is validated before reserving the slot so a misconfigured
        // server never burns a learner's question.
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return json({ error: "config" }, 500);

        // Atomic reservation: month and day are checked and incremented
        // together; neither is consumed when either one is exhausted.
        const quota = await consumeQuota(userId);
        if (!quota) return json({ error: "quota" }, 503);
        if (quota.blocked !== "none") {
          return json({ error: quota.blocked === "monthly" ? "monthly_limit" : "daily_limit", quota }, 429);
        }

        let res: Response;
        try {
          res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": apiKey,
              "X-Lovable-AIG-SDK": "fetch",
            },
            body: JSON.stringify({
              // Cheapest model that handles short grammar answers well.
              model: "google/gemini-3.1-flash-lite",
              // Technical generation cap. A truncated answer is returned as is:
              // we never make a second call to continue it.
              max_tokens: MAX_OUTPUT_TOKENS,
              // Minimum reasoning setting for these simple questions, so no
              // reasoning tokens are billed.
              reasoning: { enabled: false },
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: question },
              ],
            }),
          });
        } catch (error) {
          // Conservative: the slot stays consumed, we cannot know whether the
          // provider processed the call.
          console.error("[ai-coach] gateway request failed", error);
          return json({ error: "provider_busy", quota }, 502);
        }

        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          console.error(`[ai-coach] gateway error [${res.status}]: ${detail}`);
          // A provider 429/5xx is NOT a personal quota problem.
          const transient = res.status === 429 || res.status >= 500;
          return json(
            { error: transient ? "provider_busy" : "gateway", quota },
            transient ? 503 : gatewayStatus(res.status),
          );
        }

        const payload = (await res.json().catch(() => null)) as {
          choices?: Array<{ message?: { content?: unknown } }>;
        } | null;
        const raw = payload?.choices?.[0]?.message?.content;
        const answer = stripMarkdown(typeof raw === "string" ? raw : "");
        if (!answer) return json({ error: "gateway", quota }, 502);

        return json({ answer, quota });
      },
    },
  },
});

function mapQuota(row: QuotaRow | undefined | null): QuotaSnapshot | null {
  if (!row) return null;
  const blocked = row.blocked === "monthly" || row.blocked === "daily" ? row.blocked : "none";
  return {
    unlimited: Boolean(row.unlimited),
    dailyUsed: Number(row.daily_used ?? 0),
    monthlyUsed: Number(row.monthly_used ?? 0),
    dailyLimit: Number(row.daily_limit ?? 0),
    monthlyLimit: Number(row.monthly_limit ?? 0),
    dayResetAt: row.day_reset_at,
    monthResetAt: row.month_reset_at,
    blocked,
  };
}

async function readQuota(userId: string): Promise<QuotaSnapshot | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("get_ai_coach_quota", { _user_id: userId });
  if (error) {
    console.error(`[ai-coach] get_ai_coach_quota failed: ${error.message}`);
    return null;
  }
  return mapQuota((Array.isArray(data) ? data[0] : data) as QuotaRow | null);
}

/** Fails closed: a database error means no provider call. */
async function consumeQuota(userId: string): Promise<QuotaSnapshot | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("consume_ai_coach_quota", { _user_id: userId });
  if (error) {
    console.error(`[ai-coach] consume_ai_coach_quota failed: ${error.message}`);
    return null;
  }
  return mapQuota((Array.isArray(data) ? data[0] : data) as QuotaRow | null);
}

/** Removes markdown decoration so the chat shows clean plain text. */
function stripMarkdown(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, (block) => block.replace(/```/g, "").trim())
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/(^|[\s(])\*([^*\n]+)\*/g, "$1$2")
    .replace(/(^|[\s(])_([^_\n]+)_/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s{0,3}#{1,6}\s*/gm, "")
    .replace(/^\s*[*+]\s+/gm, "- ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}

function gatewayStatus(status: number) {
  return status === 402 || status === 403 ? status : 502;
}
