import type { DayRecord } from "@/lib/types";
import { RecordingPlayButton } from "./RecordingPlayButton";
import { formatDate, formatDuration, ideasLabel, recordHeading, recordTitle } from "@/lib/recordings";

/** One saved final rep in the learner's speaking history. */
export function RecordingCard({ record, compact }: { record: DayRecord; compact?: boolean }) {
  const ideas = ideasLabel(record.sentenceCount);

  return (
    <article className="rounded-3xl bg-card p-4 shadow-[var(--shadow-card)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {recordHeading(record)}
      </p>
      <p className="mt-1 text-[15px] font-extrabold uppercase tracking-tight">{recordTitle(record)}</p>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-bold text-muted-foreground">
        {compact ? null : <span>{formatDate(record.completedAt)}</span>}
        <span className="tabular-nums">{formatDuration(record.finalSeconds)}</span>
        {ideas ? <span>{ideas}</span> : null}
      </div>

      <RecordingPlayButton record={record} className="mt-3 w-full" />
    </article>
  );
}
