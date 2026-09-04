import { useEffect, useRef, useState } from "react";
import { Loader2, Pause, Play, RotateCcw, Volume2 } from "lucide-react";
import { AudioService } from "@/services/audio-service";
import type { ModelTone } from "@/lib/model-tone";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type AudioPlayerProps = {
  text: string;
  label?: string;
  rate?: number;
  /** Model voice: female or male character voice. */
  voice?: "female" | "male" | undefined;
  /** Delivery tone: coach (default), neutral (recruiter), tense (frustrated customer). */
  tone?: ModelTone | undefined;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "navy" | "ghost";
  onEnd?: () => void;
  /** Fired when the learner presses play (not on resume). */
  onStart?: () => void;
  className?: string;
};

type Status = "idle" | "loading" | "playing" | "paused" | "ended" | "error";

function clock(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/** ModelAudio — the single entry point for model-voice playback. */
export function AudioPlayer({
  text,
  label = "LISTEN",
  rate = 1,
  voice,
  tone,
  size = "md",
  variant = "primary",
  onEnd,
  onStart,
  className,
}: AudioPlayerProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const stopRef = useRef<(() => void) | null>(null);
  const es = useAppLang().lang === "es";

  useEffect(() => () => stopRef.current?.(), []);

  // A new text/rate resets the player.
  useEffect(() => {
    stopRef.current?.();
    AudioService.stop();
    stopRef.current = null;
    setStatus("idle");
    setCurrent(0);
    setDuration(0);
  }, [text, rate, tone]);

  const start = () => {
    setStatus("loading");
    setCurrent(0);
    onStart?.();
    stopRef.current = AudioService.speak(text, {
      rate,
      voice,
      tone,
      onStart: () => setStatus("playing"),
      onProgress: (position, total) => {
        setCurrent(position);
        if (total > 0) setDuration(total);
      },
      onEnd: () => {
        setStatus("ended");
        onEnd?.();
      },
      onError: () => setStatus("error"),
    });
  };

  const toggle = () => {
    if (status === "playing") {
      if (AudioService.pause()) setStatus("paused");
      else {
        stopRef.current?.();
        AudioService.stop();
        setStatus("idle");
      }
      return;
    }
    if (status === "paused") {
      if (AudioService.resume()) setStatus("playing");
      else start();
      return;
    }
    start();
  };

  const busy = status === "loading";
  const showProgress = duration > 0 && (status === "playing" || status === "paused");
  const progress = duration > 0 ? Math.min(1, current / duration) : 0;

  const buttonLabel =
    status === "loading"
      ? es
        ? "CARGANDO AUDIO…"
        : "LOADING AUDIO…"
      : status === "playing"
        ? es
          ? "PAUSA"
          : "PAUSE"
        : status === "paused"
          ? es
            ? "CONTINUAR"
            : "RESUME"
          : status === "ended"
            ? es
              ? "ESCUCHAR OTRA VEZ"
              : "PLAY AGAIN"
            : label;

  if (status === "error") {
    return (
      <div className={cn("w-full space-y-2 rounded-2xl border border-border bg-card p-4 text-center", className)}>
        <p className="text-[13px] font-semibold text-muted-foreground">
          {es ? "No se pudo reproducir el audio." : "Audio couldn't play."}
        </p>
        <button
          type="button"
          onClick={start}
          className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 text-[13px] font-bold uppercase tracking-[0.12em]"
        >
          <RotateCcw className="size-4" /> {es ? "REINTENTAR" : "TRY AGAIN"}
        </button>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <button
        type="button"
        onClick={toggle}
        aria-label={
          status === "playing" ? (es ? "Pausar audio" : "Pause audio") : es ? "Reproducir audio" : "Play audio"
        }
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-2xl font-semibold tracking-wide transition-all active:scale-[0.98]",
          size === "sm" && "min-h-[44px] px-4 py-2.5 text-sm",
          size === "md" && "min-h-[48px] px-5 py-3.5 text-[15px]",
          size === "lg" && "min-h-[56px] px-6 py-5 text-base",
          variant === "primary" && "bg-primary text-primary-foreground shadow-[var(--shadow-lift)] hover:brightness-105",
          variant === "navy" && "bg-navy text-navy-foreground hover:bg-navy-soft",
          variant === "ghost" && "border border-border bg-card text-foreground hover:bg-secondary",
        )}
      >
        {busy ? (
          <Loader2 className="size-5 animate-spin" />
        ) : status === "playing" ? (
          <Pause className="size-5" />
        ) : variant === "ghost" && status === "idle" ? (
          <Volume2 className="size-5" />
        ) : (
          <Play className="size-5 fill-current" />
        )}
        {buttonLabel}
      </button>

      {showProgress ? (
        <div className="mt-2 flex items-center gap-2" role="group" aria-label={es ? "Progreso del audio" : "Audio progress"}>
          <span className="shrink-0 text-[11px] font-bold tabular-nums text-muted-foreground">
            {clock(current)} / {clock(duration)}
          </span>
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progress * 100)}
            aria-valuetext={`${clock(current)} / ${clock(duration)}`}
          >
            <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
