/**
 * Profile photo moderation (server only).
 *
 * One AI call per upload. Never stores or returns the image; only a verdict.
 * Model: Lovable AI Gateway, `openai/gpt-6-astra` on the Responses API,
 * streamed (reasoning models must stream — buffered calls die on timeouts).
 */

export type ModerationVerdict = {
  allowed: boolean;
  reason: string;
  /** Usage for the cost log. */
  inputTokens: number;
  outputTokens: number;
  /** Set when the call itself failed (gateway/network); photo stays pending. */
  failed?: boolean;
  errorCode?: string;
};

const RULES = `You review profile photos for a family-friendly English learning app used by adults in Latin America.

REJECT if the image contains any of:
- nudity, sexual or suggestive content, underwear or swimwear focus
- violence, blood, weapons, drugs
- hate symbols, extremist content, offensive gestures
- offensive or vulgar text/signs inside the image
- visible personal documents, ID cards, credit cards

ACCEPT normal photos of people, and decent photos that are not a face (a pet, a landscape, an object).
When in doubt, reject.`;

const SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    allowed: { type: "boolean" },
    reason: { type: "string" },
  },
  required: ["allowed", "reason"],
} as const;

export async function moderatePhoto(dataUrl: string): Promise<ModerationVerdict> {
  const key = process.env['LOVABLE_API_KEY'];
  if (!key) return { allowed: false, reason: "not-configured", inputTokens: 0, outputTokens: 0, failed: true, errorCode: "no_key" };

  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": key,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        reasoning: { effort: "low" },
        instructions: RULES,
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: "Review this profile photo. Answer with allowed and a short reason." },
              { type: "input_image", image_url: dataUrl },
            ],
          },
        ],
        text: {
          format: { type: "json_schema", name: "verdict", strict: true, schema: SCHEMA },
        },
      }),
    });

    if (!res.ok || !res.body) {
      const body = await res.text().catch(() => "");
      console.error(`[avatar-moderation] gateway ${res.status}: ${body.slice(0, 300)}`);
      return { allowed: false, reason: "gateway", inputTokens: 0, outputTokens: 0, failed: true, errorCode: String(res.status) };
    }

    let text = "";
    let inputTokens = 0;
    let outputTokens = 0;
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const parts = buffer.split("\n\n");
      buffer = parts.pop() ?? "";
      for (const part of parts) {
        const line = part.split("\n").find((l) => l.startsWith("data:"));
        if (!line) continue;
        const payload = line.slice(5).trim();
        if (!payload || payload === "[DONE]") continue;
        try {
          const evt = JSON.parse(payload) as {
            type?: string;
            delta?: string;
            response?: { output_text?: string; usage?: { input_tokens?: number; output_tokens?: number } };
          };
          if (evt.type === "response.output_text.delta" && typeof evt.delta === "string") text += evt.delta;
          if (evt.type === "response.completed" && evt.response) {
            if (!text && typeof evt.response.output_text === "string") text = evt.response.output_text;
            inputTokens = evt.response.usage?.input_tokens ?? 0;
            outputTokens = evt.response.usage?.output_tokens ?? 0;
          }
        } catch {
          /* ignore partial frames */
        }
      }
    }

    const parsed = safeParse(text);
    if (!parsed) {
      return { allowed: false, reason: "unreadable", inputTokens, outputTokens, failed: true, errorCode: "parse" };
    }
    return { allowed: parsed.allowed === true, reason: String(parsed.reason ?? ""), inputTokens, outputTokens };
  } catch (err) {
    console.error("[avatar-moderation] call failed", err);
    return { allowed: false, reason: "network", inputTokens: 0, outputTokens: 0, failed: true, errorCode: "network" };
  }
}

function safeParse(text: string): { allowed?: boolean; reason?: string } | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  try {
    return JSON.parse(trimmed) as { allowed?: boolean; reason?: string };
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (!match) return null;
    try {
      return JSON.parse(match[0]) as { allowed?: boolean; reason?: string };
    } catch {
      return null;
    }
  }
}
