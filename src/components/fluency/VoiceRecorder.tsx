import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { RecordingService, type ActiveRecording } from "@/services/recording-service";
import { SpeechToTextService } from "@/services/speech-to-text-service";
import { WaveformPlayer } from "./WaveformPlayer";
import type { Recording } from "@/lib/types";
import { cn } from "@/lib/utils";

type VoiceRecorderProps = {
  label?: string;
  stopLabel?: string;
  targetSeconds?: [number, number];
  showTimer?: boolean;
  captureTranscript?: boolean;
  /** Short reps: use only what the browser really heard, never a mock transcript. */
  liveTranscriptOnly?: boolean;
  onComplete: (recording: Recording, transcript: string) => void;
  className?: string;
};

/** Large, unmistakable microphone control — the primary action of the app. */
export function VoiceRecorder({
  label = "RECORD",
  stopLabel = "STOP",
  targetSeconds,
  showTimer = true,
  captureTranscript = false,
  liveTranscriptOnly = false,
  onComplete,
  className,
}: VoiceRecorderProps) {

  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const activeRef = useRef<ActiveRecording | null>(null);
  const stopListeningRef = useRef<(() => string) | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
      timerRef.current = setInterval(() => setSeconds((value) => value + 1), 1000);
    } catch {
      setError("We need microphone access to record your voice.");
    }
  };

  const stop = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setRecording(false);
    const live = stopListeningRef.current?.() ?? "";
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
    if (captureTranscript && transcript.split(/\s+/).filter(Boolean).length < 12) {
      transcript = (await SpeechToTextService.transcribe(0)).transcript;
    }
    onComplete({ ...result, durationSeconds: Math.max(result.durationSeconds, seconds) }, transcript);
  };

  const inTarget = targetSeconds && seconds >= targetSeconds[0] && seconds <= targetSeconds[1];

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {recording ? <WaveformPlayer active /> : null}

      <button
        type="button"
        onClick={recording ? stop : start}
        className={cn(
          "flex size-28 flex-col items-center justify-center gap-1 rounded-full text-xs font-bold tracking-widest transition-transform active:scale-95",
          recording
            ? "bg-navy text-navy-foreground"
            : "bg-primary text-primary-foreground shadow-[var(--shadow-lift)] animate-[var(--animate-pulse-ring)]",
        )}
        aria-label={recording ? stopLabel : label}
      >
        {recording ? <Square className="size-8 fill-current" /> : <Mic className="size-10" />}
        <span>{recording ? stopLabel : label}</span>
      </button>

      {showTimer ? (
        <div className="text-center">
          <p
            className={cn(
              "font-mono text-3xl font-bold tabular-nums",
              inTarget ? "text-success" : recording ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:{String(seconds % 60).padStart(2, "0")}
          </p>
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
