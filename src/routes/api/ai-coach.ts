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
  "Never invent app features, never grade recordings, never ask follow-up questions.";

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
          res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Lovable-API-Key": apiKey,
              "X-Lovable-AIG-SDK": "fetch",
            },
            body: JSON.stringify({
              model: "openai/gpt-6-astra",
              stream: true,
              reasoning: { effort: "low" },
              input: [
                { role: "system", content: [{ type: "input_text", text: SYSTEM_PROMPT }] },
                { role: "user", content: [{ type: "input_text", text: question }] },
              ],
            }),
          });
        } catch (error) {
          console.error("[ai-coach] gateway request failed", error);
          return json({ error: "gateway" }, 502);
        }

        if (!res.ok || !res.body) {
          const detail = await res.text().catch(() => "");
          console.error(`[ai-coach] gateway error [${res.status}]: ${detail}`);
          return json({ error: "gateway" }, gatewayStatus(res.status));
        }

        const answer = await readAnswer(res.body);
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

/** Consumes the SSE stream server-side and joins the text deltas. */
async function readAnswer(body: ReadableStream<Uint8Array>): Promise<string> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";
  let text = "";

  while (true) {
    const chunk = await reader.read();
    if (chunk.done) break;
    buffer += decoder.decode(chunk.value, { stream: true });

    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    for (const line of lines) {
      if (!line.startsWith("data:")) continue;
      const payload = line.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;
      try {
        const event = JSON.parse(payload) as {
          type?: string;
          delta?: string;
          response?: { output_text?: unknown };
        };
        if (event.type === "response.output_text.delta" && typeof event.delta === "string") {
          text += event.delta;
        } else if (event.type === "response.completed" && !text) {
          const out = event.response?.output_text;
          if (typeof out === "string") text = out;
          else if (Array.isArray(out)) text = out.filter((v) => typeof v === "string").join("");
        }
      } catch {
        /* ignore malformed keep-alive lines */
      }
    }
  }

  return text.trim();
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
