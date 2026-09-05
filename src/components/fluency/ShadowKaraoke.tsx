import { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2, Pause, Play, RotateCcw } from "lucide-react";
import { AudioService, type ModelVoice } from "@/services/audio-service";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { ModelLine } from "@/lib/types";

type Status = "idle" | "loading" | "playing" | "paused" | "ended" | "error";

const SPEEDS = [0.5, 0.75, 1] as const;
/** Fixed allowance (in "characters") for the pause the voice takes between sentences. */
const BOUNDARY_WEIGHT = 12;

/** Cumulative end boundary (0..1) for each chunk, proportional to its length. */
export function chunkBoundaries(lines: ModelLine[]): number[] {
  const weights = lines.map((line) => Math.max(1, line.text.trim().length) + BOUNDARY_WEIGHT);
  const total = weights.reduce((sum, w) => sum + w, 0);
  let acc = 0;
  return weights.map((w) => {
    acc += w;
    return acc / total;
  });
}

/** Index of the chunk that is active at a given playback fraction (0..1). */
export function activeChunkAt(boundaries: number[], fraction: number): number {
  const index = boundaries.findIndex((end) => fraction < end);
  return index === -1 ? Math.max(0, boundaries.length - 1) : index;
}

function clock(seconds: number): string {
  const total = Math.max(0, Math.round(seconds));
  return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

type Props = {
  lines: ModelLine[];
  text: string;
  voice?: ModelVoice | undefined;
  onNext: () => void;
  onSkip: () => void;
};

/** ShadowKaraoke — continuous model audio + chunk-level highlight; the learner speaks WITH it. */
export function ShadowKaraoke({ lines, text, voice, onNext, onSkip }: Props) {
  const t = useT();
  const [speed, setSpeed] = useState<number>(0.75);
  const [status, setStatus] = useState<Status>("idle");
  const [active, setActive] = useState(0);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rounds, setRounds] = useState(0);
  const stopRef = useRef<(() => void) | null>(null);
  const fallbackTimer = useRef<number | null>(null);
  const activeRef = useRef<HTMLLIElement | null>(null);
  const boundaries = chunkBoundaries(lines);

  const clearFallback = () => {
    if (fallbackTimer.current !== null) {
      window.clearInterval(fallbackTimer.current);
      fallbackTimer.current = null;
    }
  };

  const stop = () => {
    clearFallback();
    stopRef.current?.();
    stopRef.current = null;
    AudioService.stop();
  };

  useEffect(() => () => stop(), []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [active]);

  const start = (rate = speed) => {
    stop();
    setStatus("loading");
    setActive(0);
    setCurrent(0);
    setDuration(0);
    let sawProgress = false;
    const startedAt = Date.now();
    stopRef.current = AudioService.speak(text, {
      rate,
      voice,
      onStart: () => {
        setStatus("playing");
        // Browser-voice fallback reports no position: estimate from elapsed time.
        window.setTimeout(() => {
          if (sawProgress || fallbackTimer.current !== null) return;
          const estimate = AudioService.estimateSeconds(text, rate);
          fallbackTimer.current = window.setInterval(() => {
            const elapsed = (Date.now() - startedAt) / 1000;
            setCurrent(elapsed);
            setDuration(estimate);
            setActive(activeChunkAt(boundaries, elapsed / estimate));
          }, 250);
        }, 600);
      },
      onProgress: (position, total) => {
        if (total <= 0) return;
        sawProgress = true;
        clearFallback();
        setCurrent(position);
        setDuration(total);
        setActive(activeChunkAt(boundaries, position / total));
      },
      onEnd: () => {
        clearFallback();
        setStatus("ended");
        setActive(lines.length - 1);
        setRounds((r) => r + 1);
      },
      onError: () => {
        clearFallback();
        setStatus("error");
      },
    });
  };

  const toggle = () => {
    if (status === "playing") {
      if (AudioService.pause()) setStatus("paused");
      else {
        stop();
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

  const changeSpeed = (rate: number) => {
    setSpeed(rate);
    stop();
    setStatus("idle");
    setActive(0);
    setCurrent(0);
    setDuration(0);
  };

  const showChunks = status !== "idle" && status !== "ended";
  const progress = duration > 0 ? Math.min(1, current / duration) : 0;
  const done = rounds >= 1;

  return (
    <div className="space-y-4">
      {/* Speed */}
      <div className="flex gap-2" role="group" aria-label="Speed">
        {SPEEDS.map((rate) => (
          <button
            key={rate}
            type="button"
            onClick={() => changeSpeed(rate)}
            className={cn(
              "min-h-[44px] flex-1 rounded-2xl border px-3 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors",
              speed === rate ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground",
            )}
          >
            {rate}x
          </button>
        ))}
      </div>

      {/* Controls */}
      {status === "error" ? (
        <div className="space-y-2 rounded-2xl border border-border bg-card p-4 text-center">
          <p className="text-[13px] font-semibold text-muted-foreground">{t("rep3.audioError")}</p>
          <button
            type="button"
            onClick={() => start()}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 text-[13px] font-bold uppercase tracking-[0.12em]"
          >
            <RotateCcw className="size-4" /> {t("rep3.restart")}
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggle}
            aria-label={status === "playing" ? t("rep3.pause") : t("rep3.play")}
            className="inline-flex min-h-[56px] flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-base font-semibold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] transition-all active:scale-[0.98]"
          >
            {status === "loading" ? (
              <Loader2 className="size-5 animate-spin" />
            ) : status === "playing" ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5 fill-current" />
            )}
            {status === "loading"
              ? t("rep3.loading")
              : status === "playing"
                ? t("rep3.pause")
                : status === "paused"
                  ? t("rep3.resume")
                  : status === "ended"
                    ? t("rep3.again")
                    : t("rep3.play")}
          </button>
          <button
            type="button"
            onClick={() => start()}
            disabled={status === "idle" || status === "loading"}
            aria-label={t("rep3.restart")}
            className="inline-flex min-h-[56px] min-w-[56px] items-center justify-center rounded-2xl border border-border bg-card text-foreground transition-colors hover:bg-secondary disabled:opacity-40"
          >
            <RotateCcw className="size-5" />
          </button>
        </div>
      )}

      {duration > 0 && (status === "playing" || status === "paused") ? (
        <div className="flex items-center gap-2">
          <span className="shrink-0 text-[11px] font-bold tabular-nums text-muted-foreground">
            {clock(current)} / {clock(duration)}
          </span>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)}>
            <div className="h-full rounded-full bg-primary transition-[width]" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      ) : null}

      {/* Karaoke text */}
      <ol className="space-y-2" aria-label="Shadowing text">
        {lines.map((line, index) => {
          const isActive = showChunks && index === active;
          return (
            <li
              key={line.id}
              ref={isActive ? activeRef : null}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "rounded-2xl px-4 py-3 transition-colors duration-200",
                isActive
                  ? "bg-primary/10 text-[24px] font-extrabold leading-tight tracking-tight text-foreground ring-2 ring-primary/40"
                  : showChunks
                    ? "text-[18px] font-semibold leading-snug text-muted-foreground"
                    : "text-[20px] font-bold leading-snug text-foreground",
              )}
            >
              {line.text}
            </li>
          );
        })}
      </ol>

      {/* End state */}
      {done && status === "ended" ? (
        <div className="space-y-3 rounded-3xl bg-navy p-5 text-center text-navy-foreground">
          <p className="text-[20px] font-extrabold tracking-tight">{t("rep3.done")}</p>
          <p className="text-[12px] font-semibold uppercase tracking-[0.14em] opacity-80">
            {t("rep3.round1")} → {t("rep3.round2")}
          </p>
          <button
            type="button"
            onClick={() => start()}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-navy-foreground/30 px-4 text-[13px] font-bold uppercase tracking-[0.12em]"
          >
            <RotateCcw className="size-4" /> {t("rep3.repeat")}
          </button>
        </div>
      ) : null}

      <button
        type="button"
        onClick={onNext}
        disabled={!done}
        className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-[15px] font-bold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98] disabled:opacity-40 disabled:shadow-none"
      >
        {t("rep3.continue")} <ArrowRight className="size-5" />
      </button>
      {!done ? <p className="text-center text-[12px] font-semibold text-muted-foreground">{t("rep3.listenOnce")}</p> : null}
      <button
        type="button"
        onClick={onSkip}
        aria-label={t("action.skip")}
        className="inline-flex min-h-[44px] w-full items-center justify-center text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        {t("action.skip")}
      </button>
    </div>
  );
}
