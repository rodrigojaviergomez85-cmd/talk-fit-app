import { useEffect, useRef, useState } from "react";
import { Loader2, Pause, Play, RotateCcw } from "lucide-react";
import { AudioService } from "@/services/audio-service";
import { cn } from "@/lib/utils";
import { useAppLang } from "@/lib/i18n";
import type { StoryLine } from "@/services/stories/types";

type Status = "idle" | "loading" | "playing" | "paused" | "ended" | "error";

const SPEEDS = [0.5, 0.75, 1] as const;
/** Extra "characters" standing in for the pause the voice takes between sentences. */
const BOUNDARY_WEIGHT = 12;

function boundariesFor(lines: StoryLine[]): number[] {
  const weights = lines.map((line) => Math.max(1, line.text.trim().length) + BOUNDARY_WEIGHT);
  const total = weights.reduce((sum, w) => sum + w, 0);
  let acc = 0;
  return weights.map((w) => {
    acc += w;
    return acc / total;
  });
}

function activeAt(boundaries: number[], fraction: number): number {
  const index = boundaries.findIndex((end) => fraction < end);
  return index === -1 ? Math.max(0, boundaries.length - 1) : index;
}

type Props = {
  lines: StoryLine[];
  text: string;
  voice?: "female" | "male" | undefined;
  /** Fired the first time the whole story finishes playing. */
  onFinished?: () => void;
};

/** Story karaoke — continuous audio with the spoken sentence highlighted. */
export function StoryKaraoke({ lines, text, voice, onFinished }: Props) {
  const es = useAppLang().lang === "es";
  const [speed, setSpeed] = useState<number>(1);
  const [status, setStatus] = useState<Status>("idle");
  const [active, setActive] = useState(0);
  const stopRef = useRef<(() => void) | null>(null);
  const fallbackTimer = useRef<number | null>(null);
  const activeRef = useRef<HTMLLIElement | null>(null);
  const boundaries = boundariesFor(lines);

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
    let sawProgress = false;
    const startedAt = Date.now();
    stopRef.current = AudioService.speak(text, {
      rate,
      voice,
      onStart: () => {
        setStatus("playing");
        window.setTimeout(() => {
          if (sawProgress || fallbackTimer.current !== null) return;
          const estimate = AudioService.estimateSeconds(text, rate);
          fallbackTimer.current = window.setInterval(() => {
            const elapsed = (Date.now() - startedAt) / 1000;
            setActive(activeAt(boundaries, elapsed / estimate));
          }, 250);
        }, 600);
      },
      onProgress: (position, total) => {
        if (total <= 0) return;
        sawProgress = true;
        clearFallback();
        setActive(activeAt(boundaries, position / total));
      },
      onEnd: () => {
        clearFallback();
        setStatus("ended");
        setActive(lines.length - 1);
        onFinished?.();
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
  };

  const following = status === "playing" || status === "paused" || status === "loading";

  return (
    <div className="space-y-4">
      <div className="flex gap-2" role="group" aria-label={es ? "Velocidad" : "Speed"}>
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

      {status === "error" ? (
        <div className="space-y-2 rounded-2xl border border-border bg-card p-4 text-center">
          <p className="text-[13px] font-semibold text-muted-foreground">
            {es ? "No pudimos reproducir el audio." : "We couldn't play the audio."}
          </p>
          <button
            type="button"
            onClick={() => start()}
            className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 text-[13px] font-bold uppercase tracking-[0.12em]"
          >
            <RotateCcw className="size-4" /> {es ? "Reintentar" : "Try again"}
          </button>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={toggle}
            className="inline-flex min-h-[56px] flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-base font-semibold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] transition-all active:scale-[0.98]"
          >
            {status === "loading" ? (
              <Loader2 className="size-5 animate-spin" />
            ) : status === "playing" ? (
              <Pause className="size-5" />
            ) : (
              <Play className="size-5 fill-current" />
            )}
            {status === "playing"
              ? es
                ? "PAUSA"
                : "PAUSE"
              : status === "paused"
                ? es
                  ? "SEGUIR"
                  : "RESUME"
                : es
                  ? "ESCUCHAR"
                  : "LISTEN"}
          </button>
          <button
            type="button"
            onClick={() => start()}
            aria-label={es ? "Reiniciar" : "Restart"}
            className="inline-flex min-h-[56px] min-w-[56px] items-center justify-center rounded-2xl border border-border bg-card text-foreground transition-colors hover:bg-secondary"
          >
            <RotateCcw className="size-5" />
          </button>
        </div>
      )}

      <ol className="space-y-2">
        {lines.map((line, index) => {
          const isActive = following && index === active;
          return (
            <li
              key={line.id}
              ref={isActive ? activeRef : null}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "rounded-2xl px-4 py-3 transition-colors duration-200",
                isActive
                  ? "bg-primary/10 text-[22px] font-extrabold leading-tight text-foreground ring-2 ring-primary/40"
                  : following
                    ? "text-[17px] font-semibold leading-snug text-muted-foreground"
                    : "text-[18px] font-bold leading-snug text-foreground",
              )}
            >
              {line.text}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
