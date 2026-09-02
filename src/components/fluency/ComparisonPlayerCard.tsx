import { Loader2, Pause, Play, RotateCcw } from "lucide-react";
import { useRecordingPlayback } from "@/hooks/use-recording-playback";
import { JourneyService } from "@/services/journey-service";
import { formatDuration, ideasLabel } from "@/lib/recordings";
import type { ComparisonSide } from "@/lib/progress-moments";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  caption: string;
  side: ComparisonSide;
  /** Message shown when the side has no playable Final Rep. */
  missingText: string;
  /** Optional context line (e.g. MODULE · WEEK · DAY) when the module isn't implied by the section. */
  subtitle?: string;
  tone?: "card" | "navy";
  className?: string;
};

/**
 * One side of a comparison: caption, DÍA n, duration, play / pause / restart.
 * References the existing saved Final Rep; the audio is fetched on first play.
 */
export function ComparisonPlayerCard({ caption, side, missingText, subtitle, tone = "card", className }: Props) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const record = side.record;
  const id = JourneyService.recordKey(side.record?.moduleId ?? "basic-zero", side.day) + ":cmp";
  const { active, playing, paused, loading, failed, currentTime, duration, toggle, pause, restart } =
    useRecordingPlayback(id);

  const resolve = async () => {
    if (!record) return null;
    if (record.finalUrl) return record.finalUrl;
    if (record.recordingPath) return JourneyService.signedRecordingUrl(record.recordingPath);
    return null;
  };

  const ideas = record ? ideasLabel(record.sentenceCount) : null;
  const total = duration || record?.finalSeconds || 0;
  const progress = active && total > 0 ? Math.min(1, currentTime / total) : 0;
  const navy = tone === "navy";

  return (
    <div
      className={cn(
        "rounded-3xl p-4",
        navy ? "bg-navy-foreground/10 text-navy-foreground" : "bg-card text-foreground shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <p className={cn("text-[11px] font-bold uppercase tracking-[0.2em]", "text-primary")}>{caption}</p>
      <div className="mt-1 flex items-baseline justify-between gap-2">
        <p className="text-[20px] font-extrabold tracking-tight">
          {es ? "DÍA" : "DAY"} {side.day}
        </p>
        {record ? (
          <p className={cn("text-[13px] font-extrabold tabular-nums", navy ? "text-navy-foreground/80" : "text-muted-foreground")}>
            {formatDuration(record.finalSeconds)}
            {ideas ? ` · ${ideas}` : ""}
          </p>
        ) : null}
      </div>
      {subtitle ? (
        <p className={cn("truncate text-[10px] font-bold uppercase tracking-[0.14em]", navy ? "text-navy-foreground/70" : "text-muted-foreground")}>
          {subtitle}
        </p>
      ) : null}

      {side.playable ? (
        <>
          <div className={cn("mt-3 h-1.5 overflow-hidden rounded-full", navy ? "bg-navy-foreground/15" : "bg-secondary")}>
            <div className="h-full rounded-full bg-primary transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
          </div>
          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => (playing ? pause() : toggle(resolve))}
              aria-label={playing ? (es ? "Pausar" : "Pause") : es ? "Reproducir" : "Play"}
              className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[13px] font-bold uppercase tracking-[0.12em] text-primary-foreground active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : playing ? (
                <Pause className="size-4 fill-current" />
              ) : (
                <Play className="size-4 fill-current" />
              )}
              {playing ? (es ? "PAUSAR" : "PAUSE") : paused ? (es ? "SEGUIR" : "RESUME") : es ? "ESCUCHAR" : "PLAY"}
            </button>
            <button
              type="button"
              onClick={restart}
              disabled={!active}
              aria-label={es ? "Reiniciar" : "Restart"}
              className={cn(
                "inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border transition-opacity disabled:opacity-35",
                navy ? "border-navy-foreground/30" : "border-border bg-card",
              )}
            >
              <RotateCcw className="size-4" />
            </button>
          </div>
          {failed ? (
            <p className={cn("mt-2 text-[12px] font-semibold", navy ? "text-navy-foreground/70" : "text-muted-foreground")}>
              {es ? "No se pudo cargar esta grabación. Puedes continuar." : "This recording couldn't load. You can continue."}
            </p>
          ) : null}
        </>
      ) : (
        <p className={cn("mt-3 text-[13px] font-semibold leading-snug", navy ? "text-navy-foreground/75" : "text-muted-foreground")}>
          {missingText}
        </p>
      )}
    </div>
  );
}
