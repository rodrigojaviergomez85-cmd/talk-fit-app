import { Loader2, Play, Square } from "lucide-react";
import { useRecordingPlayback } from "@/hooks/use-recording-playback";
import { JourneyService } from "@/services/journey-service";
import type { DayRecord } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Play / stop for one saved final rep. The audio file is only fetched when the
 * learner presses play, and starting one recording stops any other.
 */
export function RecordingPlayButton({
  record,
  label,
  className,
  variant = "outline",
}: {
  record: DayRecord;
  label?: string;
  className?: string;
  variant?: "outline" | "solid";
}) {
  const id = JourneyService.recordKey(record.moduleId, record.day);
  const { playing, loading, toggle } = useRecordingPlayback(id);
  const available = Boolean(record.finalUrl || record.recordingPath);

  const resolve = async () => {
    if (record.finalUrl) return record.finalUrl;
    if (record.recordingPath) return JourneyService.signedRecordingUrl(record.recordingPath);
    return null;
  };

  return (
    <button
      type="button"
      onClick={() => toggle(resolve)}
      disabled={!available}
      aria-label={playing ? "Stop recording" : "Play recording"}
      className={cn(
        "inline-flex min-h-[48px] items-center justify-center gap-2 rounded-2xl px-5 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors disabled:opacity-40",
        variant === "solid"
          ? "bg-primary text-primary-foreground"
          : "border border-border bg-card text-foreground hover:bg-secondary",
        className,
      )}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : playing ? (
        <Square className="size-4 fill-current" />
      ) : (
        <Play className="size-4 fill-current" />
      )}
      {label ?? (playing ? "Stop" : "Play")}
    </button>
  );
}
