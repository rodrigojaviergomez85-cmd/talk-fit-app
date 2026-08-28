import { createFileRoute } from "@tanstack/react-router";

/**
 * Speech-to-text for browsers without live recognition (iPhone: Safari and
 * Chrome both use WebKit). Receives the recorded audio and returns the text.
 */

const MAX_BYTES = 20 * 1024 * 1024;

const EXTENSIONS: Record<string, string> = {
  "audio/webm": "webm",
  "audio/ogg": "ogg",
  "audio/mp4": "mp4",
  "audio/x-m4a": "m4a",
  "audio/mpeg": "mp3",
  "audio/wav": "wav",
  "audio/wave": "wav",
  "audio/x-wav": "wav",
};

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

export const Route = createFileRoute("/api/transcribe")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) return json({ error: "Transcription is not configured." }, 500);

        let file: File | null = null;
        try {
          const form = await request.formData();
          const value = form.get("file");
          if (value instanceof File) file = value;
        } catch {
          file = null;
        }

        if (!file || file.size === 0) return json({ error: "Missing audio." }, 400);
        if (file.size > MAX_BYTES) return json({ error: "Audio is too large." }, 400);

        const mime = (file.type || "audio/webm").split(";")[0]!.trim();
        const ext = EXTENSIONS[mime] ?? "webm";

        const upstream = new FormData();
        upstream.append("model", "openai/gpt-4o-mini-transcribe");
        upstream.append("file", file, `recording.${ext}`);
        upstream.append("language", "en");

        const response = await fetch("https://ai.gateway.lovable.dev/v1/audio/transcriptions", {
          method: "POST",
          headers: { Authorization: `Bearer ${apiKey}` },
          body: upstream,
        });

        if (!response.ok) {
          const detail = await response.text().catch(() => "");
          console.error(`Transcription failed [${response.status}]: ${detail}`);
          const status =
            response.status === 402 || response.status === 429 || response.status === 400
              ? response.status
              : 502;
          return json({ error: detail || "Transcription failed." }, status);
        }

        const data = (await response.json().catch(() => null)) as { text?: unknown } | null;
        const text = typeof data?.text === "string" ? data.text.trim() : "";
        return json({ text }, 200);
      },
    },
  },
});
