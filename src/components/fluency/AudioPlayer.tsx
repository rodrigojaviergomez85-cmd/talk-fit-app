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
  voice?: import("@/services/audio-service").ModelVoice | undefined;
  /** Delivery tone: coach (default), neutral (recruiter), tense (frustrated customer). */
  tone?: ModelTone | undefined;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "navy" | "ghost" | "listen";
  /**
   * Label shown while paused. Defaults to CONTINUAR / RESUME; the Week 1
   * listening screen passes "Reanudar audio" so it never reads like the
   * button that moves to the next exercise.
   */
  resumeLabel?: string;
  /** Accessible name used while paused; defaults to the play announcement. */
  resumeAriaLabel?: string;
  /** Accessible name for the idle button, so screen readers hear which clip it plays. */
  playAriaLabel?: string;
  onEnd?: () => void;
  /** Fired when the learner presses play (not on resume). */
  onStart?: () => void;
  /** Optional presentation hooks; playback still belongs exclusively to AudioPlayer/AudioService. */
  onProgress?: (position: number, duration: number) => void;
  onStatusChange?: (status: Status) => void;
  showProgress?: boolean;
  /** Changing this value starts playback, including when the selected rate did not change. */
  playRequest?: number;
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
  resumeLabel,
  resumeAriaLabel,
  playAriaLabel,
  onEnd,
  onStart,
  onProgress,
  onStatusChange,
  showProgress: showBuiltInProgress = true,
  playRequest,
  className,
}: AudioPlayerProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const stopRef = useRef<(() => void) | null>(null);
  const initialPlayRequestRef = useRef(playRequest);
  /** Only the newest playback attempt may update this player. */
  const attemptRef = useRef(0);
  /** True between a play request and its first real playback event. */
  const pendingRef = useRef(false);
  const es = useAppLang().lang === "es";

  useEffect(() => () => stopRef.current?.(), []);

  useEffect(() => {
    onStatusChange?.(status);
  }, [onStatusChange, status]);

  // A new text/rate resets the player.
  useEffect(() => {
    attemptRef.current += 1;
    pendingRef.current = false;
    stopRef.current?.();
    AudioService.stop();
    stopRef.current = null;
    setStatus("idle");
    setCurrent(0);
    setDuration(0);
  }, [text, rate, tone]);

  const start = () => {
    // A second tap while a clip is still loading must not request it twice.
    if (pendingRef.current) return;
    pendingRef.current = true;
    const attempt = attemptRef.current + 1;
    attemptRef.current = attempt;
    const isCurrent = () => attemptRef.current === attempt;
    setStatus("loading");
    setCurrent(0);
    onStart?.();
    stopRef.current = AudioService.speak(text, {
      rate,
      voice,
      tone,
      onStart: () => {
        if (!isCurrent()) return;
        pendingRef.current = false;
        setStatus("playing");
      },
      onProgress: (position, total) => {
        if (!isCurrent()) return;
        setCurrent(position);
        if (total > 0) setDuration(total);
        onProgress?.(position, total);
      },
      onEnd: () => {
        if (!isCurrent()) return;
        pendingRef.current = false;
        setStatus("ended");
        onEnd?.();
      },
      onError: () => {
        if (!isCurrent()) return;
        pendingRef.current = false;
        setStatus("error");
      },
      onInterrupt: () => {
        // Another clip took over: this player goes back to the start instead of
        // pretending it is still playing or can be resumed.
        if (!isCurrent()) return;
        attemptRef.current += 1;
        pendingRef.current = false;
        stopRef.current = null;
        setStatus("idle");
        setCurrent(0);
      },
    });
  };

  useEffect(() => {
    if (playRequest === undefined || playRequest === initialPlayRequestRef.current) return;
    start();
  }, [playRequest]);

  const toggle = () => {
    if (status === "playing") {
      if (AudioService.pause()) setStatus("paused");
      else {
        attemptRef.current += 1;
        pendingRef.current = false;
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
          ? (resumeLabel ?? (es ? "CONTINUAR" : "RESUME"))
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
          status === "playing"
            ? es
              ? "Pausar audio"
              : "Pause audio"
            : status === "paused"
              ? (resumeAriaLabel ?? playAriaLabel ?? (es ? "Reproducir audio" : "Play audio"))
              : (playAriaLabel ?? (es ? "Reproducir audio" : "Play audio"))
        }
        className={cn(
          "inline-flex w-full items-center justify-center gap-2 rounded-2xl font-semibold tracking-wide transition-all active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          size === "sm" && "min-h-[44px] px-4 py-2.5 text-sm",
          size === "md" && "min-h-[48px] px-5 py-3.5 text-[15px]",
          size === "lg" && "min-h-[56px] px-6 py-5 text-base",
          variant === "primary" && "bg-primary text-primary-foreground shadow-[var(--shadow-lift)] hover:brightness-105",
          variant === "navy" && "bg-navy text-navy-foreground hover:bg-navy-soft",
          variant === "ghost" && "border border-border bg-card text-foreground hover:bg-secondary",
          // Week 1 listening design: orange surface with navy text and icon.
          variant === "listen" && "bg-primary text-navy shadow-[var(--shadow-lift)] hover:brightness-105",
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

      {showBuiltInProgress && showProgress ? (
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
