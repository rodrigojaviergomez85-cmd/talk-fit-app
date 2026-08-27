import { RecordingPlayback } from "./RecordingPlayback";
import { AudioPlayer } from "./AudioPlayer";
import { cn } from "@/lib/utils";

type RecordingComparisonProps = {
  leftLabel: string;
  rightLabel: string;
  modelText?: string;
  leftUrl?: string | null;
  rightUrl?: string | null;
  caption?: string;
  className?: string;
};

/** A/B comparison: model vs my voice, or Day 1 vs today. */
export function RecordingComparison({
  leftLabel,
  rightLabel,
  modelText,
  leftUrl,
  rightUrl,
  caption,
  className,
}: RecordingComparisonProps) {
  return (
    <div className={cn("rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]", className)}>
      {caption ? <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{caption}</p> : null}
      <div className="grid grid-cols-2 gap-3">
        {modelText ? (
          <AudioPlayer text={modelText} label={leftLabel} variant="navy" size="sm" />
        ) : (
          <RecordingPlayback url={leftUrl ?? null} label={leftLabel} />
        )}
        <RecordingPlayback url={rightUrl ?? null} label={rightLabel} />
      </div>
    </div>
  );
}
