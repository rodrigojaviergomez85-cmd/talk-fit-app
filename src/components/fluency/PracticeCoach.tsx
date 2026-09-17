import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Mic, Square } from "lucide-react";
import { useAppLang } from "@/lib/i18n";
import { getFreshSession } from "@/lib/session-keeper";
import { CoachAvatar, type CoachState } from "@/components/fluency/CoachAvatar";

/**
 * Turn-based speaking practice (private MVP).
 *
 * Push to talk, one short recording per turn. The server transcribes it and
 * returns the coach turn; the reply is spoken with the cached course voice and
 * the avatar mouth follows the audio level. Nothing is stored in the browser.
 */

type Level = "basic" | "intermediate" | "advanced";
type Tense = "present" | "past" | "future";
type Line = { role: "you" | "coach"; text: string };

const MAX_SECONDS = 30;

const OPENERS: Record<Tense, string> = {
  present: "Hi! I'm Vale. Let's practice. What do you usually do on Saturdays?",
  past: "Hi! I'm Vale. Let's practice. What did you do yesterday?",
  future: "Hi! I'm Vale. Let's practice. What are you going to do this weekend?",
};

export function PracticeCoach() {
  const { lang } = useAppLang();
  const es = lang !== "en";

  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [level, setLevel] = useState<Level>("intermediate");
  const [tense, setTense] = useState<Tense>("present");
  const [started, setStarted] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [sayIt, setSayIt] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const [busy, setBusy] = useState(false);
  const [turns, setTurns] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(40);
  const [error, setError] = useState<string | null>(null);
  const [coachState, setCoachState] = useState<CoachState>("idle");
  const [coachLevel, setCoachLevel] = useState(0);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const stopTimerRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const frameRef = useRef<number | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  async function authHeaders(): Promise<Record<string, string> | null> {
    const { data } = await getFreshSession();
    const token = data.session?.access_token;
    if (!token) return null;
    return { Authorization: `Bearer ${token}` };
  }

  useEffect(() => {
    void (async () => {
      const headers = await authHeaders();
      if (!headers) {
        setAllowed(false);
        return;
      }
      const res = await fetch("/api/coach-practice", { headers });
      const body = (await res.json().catch(() => null)) as {
        allowed?: boolean;
        dailyLimit?: number;
      } | null;
      setAllowed(Boolean(body?.allowed));
      if (body?.dailyLimit) setDailyLimit(body.dailyLimit);
    })();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lines, busy]);

  /** Speaks a coach line with the cached course voice and animates the mouth. */
  const speak = useCallback(async (text: string) => {
    try {
      const headers = await authHeaders();
      if (!headers) return;
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { ...headers, "content-type": "application/json" },
        body: JSON.stringify({ text, voice: "girl", tone: "warm" }),
      });
      if (!res.ok) return;
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      const audio = new Audio(url);
      audio.crossOrigin = "anonymous";
      audioElRef.current = audio;

      let ctx = audioCtxRef.current;
      if (!ctx) {
        ctx = new AudioContext();
        audioCtxRef.current = ctx;
      }
      await ctx.resume().catch(() => undefined);
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.68;
      source.connect(analyser);
      analyser.connect(ctx.destination);

      const waveform = new Uint8Array(analyser.fftSize);
      let envelope = 0;
      let adaptivePeak = 0.08;
      let lastUpdate = 0;
      const follow = (timestamp: number) => {
        analyser.getByteTimeDomainData(waveform);
        let sum = 0;
        for (let i = 0; i < waveform.length; i += 1) {
          const sample = ((waveform[i] ?? 128) - 128) / 128;
          sum += sample * sample;
        }
        const rms = Math.sqrt(sum / waveform.length);
        envelope = rms > envelope ? envelope * 0.28 + rms * 0.72 : envelope * 0.78 + rms * 0.22;
        adaptivePeak = Math.max(rms, adaptivePeak * 0.997);
        if (timestamp - lastUpdate >= 50) {
          lastUpdate = timestamp;
          const noiseFloor = 0.006;
          const usablePeak = Math.max(0.035, adaptivePeak - noiseFloor);
          setCoachLevel(Math.min(1, Math.max(0, envelope - noiseFloor) / usablePeak));
        }
        frameRef.current = window.requestAnimationFrame(follow);
      };

      setCoachState("speaking");
      frameRef.current = window.requestAnimationFrame(follow);
      await audio.play().catch(() => undefined);
      await new Promise<void>((resolve) => {
        audio.onended = () => resolve();
        audio.onerror = () => resolve();
      });
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      setCoachLevel(0);
      setCoachState("listening");
      URL.revokeObjectURL(url);
    } catch {
      setCoachState("listening");
    }
  }, []);

  const cleanup = useCallback(() => {
    if (stopTimerRef.current !== null) window.clearTimeout(stopTimerRef.current);
    stopTimerRef.current = null;
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    try {
      recorderRef.current?.stop();
    } catch {
      /* already stopped */
    }
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    recorderRef.current = null;
    audioElRef.current?.pause();
    void audioCtxRef.current?.close().catch(() => undefined);
    audioCtxRef.current = null;
  }, []);

  useEffect(() => cleanup, [cleanup]);

  async function begin() {
    setError(null);
    setStarted(true);
    const opener = OPENERS[tense];
    setLines([{ role: "coach", text: opener }]);
    await speak(opener);
  }

  async function startRecording() {
    if (busy || recording) return;
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream);
      recorderRef.current = recorder;
      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        streamRef.current?.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
        void sendTurn(blob);
      };
      recorder.start();
      setRecording(true);
      setCoachState("listening");
      stopTimerRef.current = window.setTimeout(() => stopRecording(), MAX_SECONDS * 1000);
    } catch {
      setError(es ? "No se pudo abrir el micrófono." : "Could not open the microphone.");
    }
  }

  function stopRecording() {
    if (stopTimerRef.current !== null) window.clearTimeout(stopTimerRef.current);
    stopTimerRef.current = null;
    setRecording(false);
    try {
      recorderRef.current?.stop();
    } catch {
      /* already stopped */
    }
  }

  async function sendTurn(blob: Blob) {
    if (blob.size < 2048) {
      setError(es ? "No escuchamos nada. Intenta otra vez." : "We heard nothing. Try again.");
      return;
    }
    setBusy(true);
    setCoachState("thinking");
    setSayIt(null);
    try {
      const headers = await authHeaders();
      if (!headers) {
        setError(es ? "Inicia sesión para practicar." : "Sign in to practice.");
        return;
      }
      const mime = (blob.type || "audio/webm").split(";")[0] ?? "audio/webm";
      const ext =
        ({ "audio/mp4": "mp4", "audio/mpeg": "mp3", "audio/wav": "wav", "audio/ogg": "ogg" } as Record<
          string,
          string
        >)[mime] ?? "webm";

      const form = new FormData();
      form.append("file", new File([blob], `turn.${ext}`, { type: mime }));
      form.append("level", level);
      form.append("tense", tense);
      form.append("history", JSON.stringify(lines.slice(-6)));

      const res = await fetch("/api/coach-practice", { method: "POST", headers, body: form });
      const body = (await res.json().catch(() => null)) as {
        transcript?: string;
        correction?: string | null;
        sayIt?: string | null;
        reply?: string;
        error?: string;
        dailyLimit?: number;
      } | null;

      if (body?.error === "daily_limit") {
        if (body.dailyLimit) setDailyLimit(body.dailyLimit);
        setError(
          es ? "Llegaste a tu límite de hoy. Vuelve mañana." : "You reached today's limit. Come back tomorrow.",
        );
        return;
      }
      if (!res.ok || !body?.reply) {
        setError(es ? "No se pudo procesar tu turno. Intenta otra vez." : "Could not process your turn. Try again.");
        return;
      }

      setTurns((value) => value + 1);
      const transcript = body.transcript?.trim();
      const spoken = body.correction ? `${body.correction} Say it with me: ${body.correction}` : "";
      setLines((prev) => [
        ...prev,
        ...(transcript ? ([{ role: "you", text: transcript }] as Line[]) : []),
        { role: "coach", text: body.correction ? `${body.correction}\n${body.reply}` : (body.reply as string) },
      ]);
      setSayIt(body.sayIt ?? null);
      await speak(spoken ? `${spoken}. ${body.reply}` : (body.reply as string));
    } catch {
      setError(es ? "No se pudo procesar tu turno." : "Could not process your turn.");
    } finally {
      setBusy(false);
    }
  }

  if (allowed === null) {
    return (
      <p className="flex items-center justify-center gap-2 py-8 text-[13px] font-semibold text-muted-foreground">
        <Loader2 className="size-4 animate-spin" aria-hidden />
        {es ? "Cargando…" : "Loading…"}
      </p>
    );
  }

  if (!allowed) {
    return (
      <p className="py-8 text-center text-[13px] font-semibold text-muted-foreground">
        {es ? "Esta práctica todavía no está disponible." : "This practice is not available yet."}
      </p>
    );
  }

  if (!started) {
    return (
      <div className="space-y-5">
        <Chooser
          label={es ? "Tu nivel" : "Your level"}
          options={[
            ["basic", es ? "Básico" : "Basic"],
            ["intermediate", es ? "Intermedio" : "Intermediate"],
            ["advanced", es ? "Avanzado" : "Advanced"],
          ]}
          value={level}
          onChange={(value) => setLevel(value as Level)}
        />
        <Chooser
          label={es ? "Qué quieres practicar" : "What to practice"}
          options={[
            ["present", es ? "Presente" : "Present"],
            ["past", es ? "Pasado" : "Past"],
            ["future", es ? "Futuro" : "Future"],
          ]}
          value={tense}
          onChange={(value) => setTense(value as Tense)}
        />
        <button
          type="button"
          onClick={() => void begin()}
          className="min-h-[48px] w-full rounded-2xl bg-primary px-4 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary-foreground"
        >
          {es ? "Empezar práctica" : "Start practice"}
        </button>
        {error ? <p className="text-center text-[13px] font-semibold text-destructive">{error}</p> : null}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center gap-2">
        <CoachAvatar state={coachState} level={coachLevel} />
        <p className="text-[12px] font-semibold text-muted-foreground">
          {busy
            ? es
              ? "Pensando…"
              : "Thinking…"
            : recording
              ? es
                ? "Te escucha"
                : "Listening"
              : es
                ? "Presiona para hablar"
                : "Tap to speak"}
        </p>
      </div>

      {sayIt ? (
        <div className="rounded-2xl border border-primary/40 bg-primary/5 p-3">
          <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-primary">
            {es ? "Repite conmigo" : "Say it with me"}
          </p>
          <p className="mt-1 text-[15px] font-semibold text-foreground">{sayIt}</p>
        </div>
      ) : null}

      <div className="space-y-2">
        {lines.map((line, index) => (
          <div key={`${line.role}-${index}`} className={line.role === "you" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                line.role === "you"
                  ? "max-w-[85%] rounded-2xl bg-secondary px-3 py-2 text-[13px] font-semibold text-foreground"
                  : "max-w-[92%] whitespace-pre-wrap text-[14px] leading-relaxed text-foreground"
              }
            >
              {line.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <button
        type="button"
        disabled={busy}
        onClick={() => (recording ? stopRecording() : void startRecording())}
        className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary-foreground disabled:opacity-50"
      >
        {recording ? <Square className="size-4" aria-hidden /> : <Mic className="size-4" aria-hidden />}
        {recording
          ? es
            ? "Terminar mi respuesta"
            : "Finish my answer"
          : es
            ? "Presiona para hablar"
            : "Tap to speak"}
      </button>

      <p className="text-center text-[12px] text-muted-foreground">
        {es
          ? `Turnos de hoy: ${turns} de ${dailyLimit} · máximo ${MAX_SECONDS} segundos por respuesta`
          : `Turns today: ${turns} of ${dailyLimit} · ${MAX_SECONDS} seconds max per answer`}
      </p>

      {error ? <p className="text-center text-[13px] font-semibold text-destructive">{error}</p> : null}
    </div>
  );
}

function Chooser({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Array<[string, string]>;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{label}</p>
      <div className="grid grid-cols-3 gap-2">
        {options.map(([key, text]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`min-h-[44px] rounded-xl border px-2 text-[12px] font-bold transition-colors ${
              value === key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card text-foreground"
            }`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}
