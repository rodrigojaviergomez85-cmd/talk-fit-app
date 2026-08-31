import type { DayRecord } from "@/lib/types";
import { RecordingPlayButton } from "./RecordingPlayButton";
import { formatDuration, ideasLabel, recordHeading } from "@/lib/recordings";

/** Earliest saved final rep next to the most recent one — no AI conclusions. */
export function ThenVsNow({ pair }: { pair: { then: DayRecord; now: DayRecord } | null }) {
  return (
    <section className="space-y-3">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">Then vs now</h2>

      {pair ? (
        <div className="grid grid-cols-2 gap-3">
          <Side caption="Then" record={pair.then} />
          <Side caption="Now" record={pair.now} />
        </div>
      ) : (
        <div className="rounded-3xl border border-primary/25 bg-accent p-5">
          <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-accent-foreground">Keep practicing</p>
          <p className="mt-1.5 text-[14px] font-semibold">
            Your Then vs Now comparison will appear after you save more recordings.
          </p>
        </div>
      )}
    </section>
  );
}

function Side({ caption, record }: { caption: string; record: DayRecord }) {
  const ideas = ideasLabel(record.sentenceCount);
  return (
    <div className="rounded-3xl bg-card p-4 shadow-[var(--shadow-card)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{caption}</p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {recordHeading(record)}
      </p>
      <RecordingPlayButton record={record} className="mt-3 w-full" />
      <p className="mt-2 text-[13px] font-extrabold tabular-nums">{formatDuration(record.finalSeconds)}</p>
      {ideas ? <p className="text-[12px] font-bold text-muted-foreground">{ideas}</p> : null}
    </div>
  );
}
