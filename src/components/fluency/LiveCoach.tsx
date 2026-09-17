import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Mic, Square } from "lucide-react";
import { useAppLang } from "@/lib/i18n";
import { getFreshSession } from "@/lib/session-keeper";

/**
 * Live speaking practice with the AI coach.
 *
 * The browser records microphone audio as raw PCM, streams it to the live
 * model, and plays the spoken answer back. No conversation is stored: only the
 * number of seconds used is reported to the server when the session ends.
 */

type Phase = "idle" | "connecting" | "live" | "ending";

type StartResponse = {
  token?: string;
  model?: string;
  usedSeconds?: number;
  dailyLimitSeconds?: number;
  sessionLimitSeconds?: number;
  error?: string;
};

type Line = { role: "you" | "coach"; text: string };

const SYSTEM_INSTRUCTION =
  "You are Vale, a warm, experienced English teacher talking live with a Spanish-speaking adult learner. " +
  "Speak English almost all the time, slowly and clearly, with short sentences. " +
  "Use a short Spanish phrase only when the learner is completely lost. " +
  "Keep the conversation going with simple real-life questions; never lecture. " +
  "Do not interrupt to correct small mistakes: keep a mental note and correct gently at the end. " +
  "Keep every turn under 3 sentences. " +
  "When the learner says the session is over, give a short, kind summary in Spanish with up to 3 corrections and one phrase to practice.";

function pcm16FromFloat32(input: Float32Array): ArrayBuffer {
  const out = new Int16Array(input.length);
  for (let i = 0; i < input.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, input[i] ?? 0));
    out[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  return out.buffer;
}

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i] ?? 0);
  return btoa(binary);
}

function fromBase64(value: string): Int16Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

function mmss(total: number): string {
  const m = Math.floor(Math.max(0, total) / 60);
  const s = Math.max(0, total) % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function LiveCoach() {
  const { lang } = useAppLang();
  const es = lang !== "en";

  const [phase, setPhase] = useState<Phase>("idle");
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [usedSeconds, setUsedSeconds] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(15 * 60);
  const [remaining, setRemaining] = useState(0);
  const [level, setLevel] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [error, setError] = useState<string | null>(null);

  const sessionRef = useRef<{ close: () => void; sendRealtimeInput: (v: unknown) => void } | null>(
    null,
  );
  const micCtxRef = useRef<AudioContext | null>(null);
  const outCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nodeRef = useRef<ScriptProcessorNode | null>(null);
  const playHeadRef = useRef(0);
  const sourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const startedAtRef = useRef(0);
  const endingRef = useRef(false);

  async function authHeaders(): Promise<Record<string, string> | null> {
    const { data } = await getFreshSession();
    const token = data.session?.access_token;
    if (!token) return null;
    return { "content-type": "application/json", Authorization: `Bearer ${token}` };
  }

  const loadStatus = useCallback(async () => {
    const headers = await authHeaders();
    if (!headers) {
      setAllowed(false);
      return;
    }
    const res = await fetch("/api/live-coach", { headers });
    const body = (await res.json().catch(() => null)) as {
      allowed?: boolean;
      usedSeconds?: number;
      dailyLimitSeconds?: number;
    } | null;
    setAllowed(Boolean(body?.allowed));
    setUsedSeconds(body?.usedSeconds ?? 0);
    if (body?.dailyLimitSeconds) setDailyLimit(body.dailyLimitSeconds);
  }, []);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  /** Stops microphone, playback and the socket, then reports the time used. */
  const stop = useCallback(async () => {
    if (endingRef.current) return;
    endingRef.current = true;
    setPhase("ending");

    const seconds = startedAtRef.current
      ? Math.round((Date.now() - startedAtRef.current) / 1000)
      : 0;

    try {
      nodeRef.current?.disconnect();
      streamRef.current?.getTracks().forEach((track) => track.stop());
      sourcesRef.current.forEach((source) => {
        try {
          source.stop();
        } catch {
          /* already finished */
        }
      });
      sourcesRef.current = [];
      await micCtxRef.current?.close().catch(() => undefined);
      await outCtxRef.current?.close().catch(() => undefined);
      sessionRef.current?.close();
    } catch {
      /* closing is best effort */
    }

    sessionRef.current = null;
    micCtxRef.current = null;
    outCtxRef.current = null;
    streamRef.current = null;
    nodeRef.current = null;
    startedAtRef.current = 0;
    setLevel(0);

    try {
      const headers = await authHeaders();
      if (headers) {
        const res = await fetch("/api/live-coach", {
          method: "POST",
          headers,
          body: JSON.stringify({ action: "end", seconds }),
        });
        const body = (await res.json().catch(() => null)) as { usedSeconds?: number } | null;
        if (typeof body?.usedSeconds === "number") setUsedSeconds(body.usedSeconds);
      }
    } catch {
      /* the counter refreshes on the next visit */
    }

    endingRef.current = false;
    setPhase("idle");
  }, []);

  useEffect(() => {
    if (phase !== "live") return;
    const timer = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          void stop();
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase, stop]);

  useEffect(() => () => void stop(), [stop]);

  async function start() {
    if (phase !== "idle") return;
    setError(null);
    setLines([]);

    const headers = await authHeaders();
    if (!headers) {
      setError(es ? "Inicia sesión para hablar en vivo." : "Sign in to talk live.");
      return;
    }

    setPhase("connecting");
    try {
      const res = await fetch("/api/live-coach", {
        method: "POST",
        headers,
        body: JSON.stringify({ action: "start" }),
      });
      const body = (await res.json().catch(() => null)) as StartResponse | null;

      if (res.status === 429 || body?.error === "daily_limit") {
        setUsedSeconds(body?.usedSeconds ?? usedSeconds);
        setError(
          es
            ? "Ya usaste tus minutos de hoy. Vuelve mañana."
            : "You used today's minutes. Come back tomorrow.",
        );
        setPhase("idle");
        return;
      }
      if (!res.ok || !body?.token) {
        setError(es ? "No se pudo conectar. Intenta otra vez." : "Could not connect. Try again.");
        setPhase("idle");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;

      const { GoogleGenAI, Modality } = await import("@google/genai");
      const ai = new GoogleGenAI({
        apiKey: body.token,
        httpOptions: { apiVersion: "v1alpha" },
      });

      const outCtx = new AudioContext({ sampleRate: 24000 });
      outCtxRef.current = outCtx;
      playHeadRef.current = outCtx.currentTime;

      const session = await ai.live.connect({
        model: body.model ?? "gemini-3.8-live",
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
          onmessage: (message: any) => {
            const content = message?.serverContent;
            if (content?.interrupted) {
              sourcesRef.current.forEach((source) => {
                try {
                  source.stop();
                } catch {
                  /* already stopped */
                }
              });
              sourcesRef.current = [];
              playHeadRef.current = outCtx.currentTime;
            }

            const userText = content?.inputTranscription?.text;
            if (userText) {
              setLines((prev) => appendLine(prev, "you", userText));
            }
            const coachText = content?.outputTranscription?.text;
            if (coachText) {
              setLines((prev) => appendLine(prev, "coach", coachText));
            }

            const parts = content?.modelTurn?.parts ?? [];
            for (const part of parts) {
              const data = part?.inlineData?.data;
              if (!data) continue;
              const pcm = fromBase64(data);
              const buffer = outCtx.createBuffer(1, pcm.length, 24000);
              const channel = buffer.getChannelData(0);
              for (let i = 0; i < pcm.length; i += 1) channel[i] = (pcm[i] ?? 0) / 32768;
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(outCtx.destination);
              const startAt = Math.max(outCtx.currentTime, playHeadRef.current);
              source.start(startAt);
              playHeadRef.current = startAt + buffer.duration;
              sourcesRef.current.push(source);
              source.onended = () => {
                sourcesRef.current = sourcesRef.current.filter((item) => item !== source);
              };
            }
          },
          onerror: () => {
            setError(es ? "Se perdió la conexión." : "The connection dropped.");
            void stop();
          },
          onclose: () => {
            void stop();
          },
        },
      });

      sessionRef.current = session as unknown as {
        close: () => void;
        sendRealtimeInput: (v: unknown) => void;
      };

      const micCtx = new AudioContext({ sampleRate: 16000 });
      micCtxRef.current = micCtx;
      const source = micCtx.createMediaStreamSource(stream);
      const processor = micCtx.createScriptProcessor(4096, 1, 1);
      nodeRef.current = processor;
      processor.onaudioprocess = (event) => {
        const input = event.inputBuffer.getChannelData(0);
        let peak = 0;
        for (let i = 0; i < input.length; i += 64) peak = Math.max(peak, Math.abs(input[i] ?? 0));
        setLevel(peak);
        try {
          sessionRef.current?.sendRealtimeInput({
            audio: { data: toBase64(pcm16FromFloat32(input)), mimeType: "audio/pcm;rate=16000" },
          });
        } catch {
          /* socket closing */
        }
      };
      source.connect(processor);
      processor.connect(micCtx.destination);

      startedAtRef.current = Date.now();
      setRemaining(body.sessionLimitSeconds ?? 300);
      setPhase("live");
    } catch (err) {
      console.error("[live-coach]", err);
      setError(
        es
          ? "Necesitamos permiso del micrófono para hablar en vivo."
          : "We need microphone access to talk live.",
      );
      setPhase("idle");
    }
  }

  if (allowed === false) {
    return (
      <div className="rounded-2xl border border-border bg-secondary p-4 text-[13px] text-muted-foreground">
        {es
          ? "La práctica de conversación en vivo está en prueba privada. Pronto para todos."
          : "Live conversation practice is in a private test. Coming soon for everyone."}
      </div>
    );
  }

  const scale = 1 + Math.min(0.35, level * 1.8);
  const leftToday = Math.max(0, dailyLimit - usedSeconds);

  return (
    <div className="space-y-4">
      <p className="text-center text-[12px] font-semibold text-muted-foreground">
        {es
          ? `Te quedan ${mmss(leftToday)} de conversación hoy`
          : `${mmss(leftToday)} of conversation left today`}
      </p>

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6">
        <div
          className="flex size-32 items-center justify-center rounded-full bg-primary/15 transition-transform duration-100"
          style={{ transform: `scale(${phase === "live" ? scale : 1})` }}
          aria-hidden
        >
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/80">
            {phase === "connecting" || phase === "ending" ? (
              <Loader2 className="size-7 animate-spin text-primary-foreground" />
            ) : (
              <Mic className="size-7 text-primary-foreground" />
            )}
          </div>
        </div>

        <p className="text-[13px] font-semibold text-foreground">
          {phase === "live"
            ? es
              ? `Habla con tu coach · ${mmss(remaining)}`
              : `Talk to your coach · ${mmss(remaining)}`
            : phase === "connecting"
              ? es
                ? "Conectando…"
                : "Connecting…"
              : phase === "ending"
                ? es
                  ? "Cerrando…"
                  : "Closing…"
                : es
                  ? "Toca para empezar a hablar"
                  : "Tap to start talking"}
        </p>

        {phase === "live" ? (
          <button
            type="button"
            onClick={() => void stop()}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-destructive px-4 text-[13px] font-extrabold uppercase tracking-[0.14em] text-destructive-foreground"
          >
            <Square className="size-4" aria-hidden />
            {es ? "Terminar" : "End"}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void start()}
            disabled={phase !== "idle" || leftToday <= 30}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary-foreground disabled:opacity-50"
          >
            <Mic className="size-4" aria-hidden />
            {es ? "Hablar en vivo" : "Talk live"}
          </button>
        )}
      </div>

      {error ? (
        <p className="text-center text-[13px] font-semibold text-destructive">{error}</p>
      ) : null}

      {lines.length > 0 ? (
        <div className="space-y-2 rounded-2xl border border-border bg-card p-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {es ? "Tu conversación" : "Your conversation"}
          </p>
          {lines.map((line, index) => (
            <p key={`${line.role}-${index}`} className="text-[13px] leading-relaxed">
              <span className="font-bold text-foreground">
                {line.role === "you" ? (es ? "Tú: " : "You: ") : "Coach: "}
              </span>
              <span className="text-muted-foreground">{line.text}</span>
            </p>
          ))}
        </div>
      ) : null}

      <p className="pb-2 text-center text-[12px] text-muted-foreground">
        {es
          ? "La conversación no se guarda. Solo contamos los minutos usados."
          : "The conversation is not saved. We only count the minutes used."}
      </p>
    </div>
  );
}

/** Live transcripts arrive in fragments; join them into one line per speaker. */
function appendLine(prev: Line[], role: Line["role"], text: string): Line[] {
  const last = prev[prev.length - 1];
  if (last && last.role === role) {
    const merged = [...prev];
    merged[merged.length - 1] = { role, text: `${last.text}${text}` };
    return merged;
  }
  return [...prev, { role, text }];
}
