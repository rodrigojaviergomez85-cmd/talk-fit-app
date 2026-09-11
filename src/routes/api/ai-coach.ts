import { createFileRoute } from "@tanstack/react-router";

const DAILY_LIMIT = 10;
const DAY_SECONDS = 24 * 60 * 60;
const MAX_QUESTION_CHARS = 600;

const SYSTEM_PROMPT =
  "You are the Fluency App English coach for Spanish-speaking adults learning English for call-center work. " +
  "Answer ONLY questions about the English language: grammar, vocabulary, phrasal verbs, idioms, written " +
  "pronunciation tips, sentence building, and how to say something in English. " +
  "If the question is not about English, reply in one short line that you can only help with English questions. " +
  "Keep every answer under 120 words. Be concrete: a one-line rule plus 2-3 short examples. " +
  "If the learner writes in Spanish, answer in Spanish but keep the English examples in English. " +
  "Never invent app features, never grade recordings, never ask follow-up questions. " +
  "Write in plain text only: no markdown, no asterisks, no bold, no headings, no numbered lists. " +
  "Use short lines and, when listing examples, start the line with a simple dash.";

/**
 * Short, stateless English Q&A. No conversation memory is sent or stored:
 * every request is a single question. Max 10 questions per learner per day
 * (unlimited test accounts excluded).
 */
export const Route = createFileRoute("/api/ai-coach")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { verifyRequestUser, consumeQuota } = await import("@/lib/route-auth.server");
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

        // Unlimited internal accounts skip the daily counter entirely.
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: unlimited } = await supabaseAdmin.rpc("is_unlimited_test_user", {
          _user_id: userId,
        });

        let used = 0;
        if (!unlimited) {
          const quota = await consumeQuota(userId, "ai-coach", DAILY_LIMIT, DAY_SECONDS);
          used = quota.requestCount;
          if (!quota.allowed) {
            return json({ error: "limit", used: DAILY_LIMIT, limit: DAILY_LIMIT }, 429);
          }
        }

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return json({ error: "config" }, 500);

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
              messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: question },
              ],
            }),
          });
        } catch (error) {
          console.error("[ai-coach] gateway request failed", error);
          return json({ error: "gateway" }, 502);
        }

        if (!res.ok) {
          const detail = await res.text().catch(() => "");
          console.error(`[ai-coach] gateway error [${res.status}]: ${detail}`);
          return json({ error: "gateway" }, gatewayStatus(res.status));
        }

        const payload = (await res.json().catch(() => null)) as {
          choices?: Array<{ message?: { content?: unknown } }>;
        } | null;
        const raw = payload?.choices?.[0]?.message?.content;
        const answer = stripMarkdown(typeof raw === "string" ? raw : "");
        if (!answer) return json({ error: "gateway" }, 502);

        return json({
          answer,
          used: unlimited ? 0 : used,
          limit: unlimited ? null : DAILY_LIMIT,
        });
      },
    },
  },
});

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
  return status === 429 || status === 402 || status === 403 ? status : 502;
}
