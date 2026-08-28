import { createFileRoute } from "@tanstack/react-router";

/**
 * Natural American English model voice.
 * Proxies Lovable AI text-to-speech and returns a plain MP3 the browser can
 * play (and cache) with an <audio> element.
 */
export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "Voice service is not configured." }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        let text = "";
        try {
          const body = (await request.json()) as { text?: unknown };
          text = typeof body.text === "string" ? body.text.trim() : "";
        } catch {
          text = "";
        }
        if (!text) {
          return new Response(JSON.stringify({ error: "Missing text." }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }
        if (text.length > 3000) text = text.slice(0, 3000);

        const upstream = await fetch("https://ai.gateway.lovable.dev/v1/audio/speech", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-4o-mini-tts",
            input: text,
            voice: "alloy",
            response_format: "mp3",
            instructions:
              "Speak in a natural, friendly, everyday American English accent. Clear and conversational, like a normal North American speaker — not robotic, not over-enunciated.",
          }),
        });

        if (!upstream.ok) {
          const detail = await upstream.text().catch(() => "");
          console.error(`TTS failed [${upstream.status}]: ${detail}`);
          const status = upstream.status === 429 || upstream.status === 402 ? upstream.status : 502;
          return new Response(JSON.stringify({ error: detail || "Voice generation failed." }), {
            status,
            headers: { "content-type": "application/json" },
          });
        }

        const audio = await upstream.arrayBuffer();
        return new Response(audio, {
          headers: {
            "content-type": "audio/mpeg",
            "cache-control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
