import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { RecordingService, MicError, type ActiveRecording, type MicErrorKind } from "@/services/recording-service";
import { SpeechToTextService } from "@/services/speech-to-text-service";
import { WaveformPlayer } from "./WaveformPlayer";
import { useSpanishAll } from "./TranslatableText";
import type { Recording } from "@/lib/types";
import { cn } from "@/lib/utils";

type VoiceRecorderProps = {
  label?: string;
  stopLabel?: string;
  targetSeconds?: [number, number];
  /** Hard limit: the recording stops by itself when reached. */
  maxSeconds?: number;
  showTimer?: boolean;
  captureTranscript?: boolean;
  /** Short reps: use only what the browser really heard, never a mock transcript. */
  liveTranscriptOnly?: boolean;
  onComplete: (recording: Recording, transcript: string) => void;
  className?: string;
};

const MIC_ERRORS: Record<MicErrorKind, { en: string; es: string }> = {
  permission: {
    en: "Microphone access is blocked. Allow it in your browser settings and try again.",
    es: "El micrófono está bloqueado. Permítelo en los ajustes del navegador e inténtalo otra vez.",
  },
  unsupported: {
    en: "This browser can't record audio. Try Safari or Chrome.",
    es: "Este navegador no puede grabar audio. Prueba con Safari o Chrome.",
  },
  insecure: {
    en: "Recording needs a secure (https) page. Open the published app link.",
    es: "Para grabar necesitas una página segura (https). Abre el enlace de la app publicada.",
  },
  unknown: {
    en: "We couldn't start the microphone. Try again.",
    es: "No pudimos iniciar el micrófono. Inténtalo otra vez.",
  },
};

/** Large, unmistakable microphone control — the primary action of the app. */
export function VoiceRecorder({
  label = "RECORD",
  stopLabel = "STOP",
  targetSeconds,
  maxSeconds,
  showTimer = true,
  captureTranscript = false,
  liveTranscriptOnly = false,
  onComplete,
  className,
}: VoiceRecorderProps) {
  const showEs = useSpanishAll();
  const [recording, setRecording] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const activeRef = useRef<ActiveRecording | null>(null);
  const stopListeningRef = useRef<(() => string) | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopRef = useRef<() => void>(() => undefined);

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
      activeRef.current?.cancel();
      stopListeningRef.current?.();
    },
    [],
  );

  const start = async () => {
    setError(null);
    try {
      const active = await RecordingService.start(label);
      activeRef.current = active;
      if (captureTranscript && SpeechToTextService.isLiveSupported()) {
        stopListeningRef.current = SpeechToTextService.listen(() => undefined);
      }
      setSeconds(0);
      setRecording(true);
      timerRef.current = setInterval(
        () =>
          setSeconds((value) => {
            const next = value + 1;
            if (maxSeconds && next >= maxSeconds) stopRef.current();
            return next;
          }),
        1000,
      );
    } catch (err) {
      const kind: MicErrorKind = err instanceof MicError ? err.kind : "unknown";
      const message = MIC_ERRORS[kind];
      setError(showEs ? message.es : message.en);
    }
  };

  const stop = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    if (!activeRef.current && !recording) return;
    setRecording(false);
    const live = stopListeningRef.current?.() ?? "";
    const hadLive = stopListeningRef.current !== null;
    stopListeningRef.current = null;
    const active = activeRef.current;
    activeRef.current = null;
    let result: Recording = {
      id: `rec-${Date.now()}`,
      url: null,
      durationSeconds: seconds,
      createdAt: new Date().toISOString(),
      label,
    };
    if (active) result = await active.stop();
    let transcript = live.trim();

    // iPhone (Safari and Chrome) has no live recognition: transcribe on the server.
    if (captureTranscript && !hadLive && !transcript && result.blob) {
      setAnalyzing(true);
      const served = await SpeechToTextService.transcribeBlob(result.blob);
      setAnalyzing(false);
      transcript = served.transcript;
      if (!transcript) {
        setError(
          showEs
            ? "No pudimos escuchar bien tu audio. Tu grabación se guardó; inténtalo otra vez."
            : "We couldn't hear your audio clearly. Your recording is saved — try again.",
        );
      }
    }

    if (captureTranscript && !liveTranscriptOnly && transcript.split(/\s+/).filter(Boolean).length < 12) {
      transcript = (await SpeechToTextService.transcribe(0)).transcript;
    }

    const capped = maxSeconds ? Math.min(maxSeconds, Math.max(result.durationSeconds, seconds)) : Math.max(result.durationSeconds, seconds);
    onComplete({ ...result, durationSeconds: capped }, transcript);
  };

  stopRef.current = () => void stop();

  const nearLimit = !!maxSeconds && recording && seconds >= maxSeconds - 5;
  const inTarget = targetSeconds && seconds >= targetSeconds[0] && seconds <= targetSeconds[1];

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {recording ? <WaveformPlayer active /> : null}

      <button
        type="button"
        onClick={recording ? stop : start}
        disabled={analyzing}
        className={cn(
          "flex size-28 flex-col items-center justify-center gap-1 rounded-full text-xs font-bold tracking-widest transition-transform active:scale-95",
          recording
            ? "bg-navy text-navy-foreground"
            : analyzing
              ? "bg-secondary text-muted-foreground"
              : "bg-primary text-primary-foreground shadow-[var(--shadow-lift)] animate-[var(--animate-pulse-ring)]",
        )}
        aria-label={recording ? stopLabel : label}
      >
        {recording ? <Square className="size-8 fill-current" /> : <Mic className="size-10" />}
        <span>{recording ? stopLabel : analyzing ? (showEs ? "ANALIZANDO…" : "ANALYZING…") : label}</span>
      </button>

      {analyzing ? (
        <p className="text-center text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {showEs ? "Analizando tu audio…" : "Analyzing your audio…"}
        </p>
      ) : null}

      {showTimer ? (
        <div className="text-center">
          <p
            className={cn(
              "font-mono text-3xl font-bold tabular-nums",
              nearLimit ? "text-destructive" : inTarget ? "text-success" : recording ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
          </p>
          {maxSeconds ? (
            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              MÁX {maxSeconds} s
            </p>
          ) : null}
          {targetSeconds ? (
            <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Target {targetSeconds[0]}–{targetSeconds[1]} seconds
            </p>
          ) : null}
        </div>
      ) : null}

      {error ? <p className="text-center text-sm text-destructive">{error}</p> : null}
    </div>
  );
}
