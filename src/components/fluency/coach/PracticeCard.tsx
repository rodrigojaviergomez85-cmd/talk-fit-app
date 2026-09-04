import { useEffect, useState } from "react";
import { ChevronDown, Loader2, Play, Square, Star } from "lucide-react";
import { RecordingPlayButton } from "@/components/fluency/RecordingPlayButton";
import { useRecordingPlayback } from "@/hooks/use-recording-playback";
import { formatTime } from "@/lib/coach-check";
import { useAppLang } from "@/lib/i18n";
import { formatDuration, recordHeading } from "@/lib/recordings";
import type { DayRecord } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CloudSync, type TakeRow } from "@/services/cloud-sync";
import { JourneyService } from "@/services/journey-service";

/**
 * One completed curriculum Day for Coach Check: module + Day, real completion
 * time, the Final Rep as the primary audio, and the Rep 5 takes collapsed.
 */
export function PracticeCard({ record, index }: { record: DayRecord; index?: number }) {
  const { t, lang } = useAppLang();
  const [open, setOpen] = useState(false);
  const [takes, setTakes] = useState<TakeRow[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open || takes !== null) return;
    let alive = true;
    CloudSync.listTakes(record.moduleId, record.day)
      .then((rows) => {
        if (!alive) return;
        setTakes([...rows].sort((a, b) => a.takeNumber - b.takeNumber));
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [open, takes, record.moduleId, record.day]);

  const count = takes ? takes.length : record.recordingsCount;
  const listenLabel = `${t("coach.listen")}${record.finalSeconds ? ` · ${formatDuration(record.finalSeconds)}` : ""}`;

  return (
    <article className="rounded-3xl bg-card p-4 shadow-[var(--shadow-card)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {typeof index === "number" ? `${index + 1}. ` : ""}
        {recordHeading(record)}
      </p>
      <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.08em]">
        {t("coach.completed")} · {formatTime(record.completedAt, lang)}
      </p>

      <div className="mt-3 rounded-2xl bg-secondary p-3">
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
          <Star className="size-3.5 fill-current" /> {t("coach.finalRep")}
        </p>
        <RecordingPlayButton record={record} label={listenLabel} variant="solid" className="mt-2 w-full min-h-[52px]" />
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="mt-3 flex min-h-[44px] w-full items-center justify-between rounded-2xl px-1 text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground"
      >
        <span>
          {count} {t("coach.takes")}
        </span>
        <span className="inline-flex items-center gap-1">
          {open ? t("coach.hideAll") : t("coach.viewAll")}
          <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
        </span>
      </button>

      {open ? (
        <ul className="space-y-2">
          {takes === null && !failed ? (
            <li className="flex justify-center py-3">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </li>
          ) : null}
          {failed || (takes && takes.length === 0) ? (
            <li className="py-2 text-center text-[12px] font-semibold text-muted-foreground">{t("coach.noTakes")}</li>
          ) : null}
          {takes?.map((take) => <TakeRowItem key={take.takeNumber} take={take} />)}
        </ul>
      ) : null}
    </article>
  );
}

function TakeRowItem({ take }: { take: TakeRow }) {
  const { t } = useAppLang();
  const id = `take:${take.moduleId}:${take.day}:${take.takeNumber}`;
  const { playing, loading, failed, toggle } = useRecordingPlayback(id);

  return (
    <li className="flex items-center justify-between gap-3 rounded-2xl border border-border px-3 py-2">
      <div>
        <p className="text-[12px] font-bold uppercase tracking-[0.12em]">
          {t("coach.take")} {take.takeNumber}
          {take.isFinalRep ? (
            <span className="ml-2 inline-flex items-center gap-1 text-primary">
              · {t("coach.finalRep")} <Star className="size-3 fill-current" />
            </span>
          ) : null}
        </p>
        {failed ? <p className="text-[11px] font-semibold text-destructive">{t("coach.noTakes")}</p> : null}
      </div>
      <button
        type="button"
        onClick={() => toggle(() => JourneyService.signedRecordingUrl(take.storagePath))}
        aria-label={playing ? "Stop take" : "Play take"}
        className="inline-flex min-h-[44px] items-center gap-2 rounded-2xl border border-border bg-card px-4 text-[13px] font-bold tabular-nums"
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : playing ? (
          <Square className="size-4 fill-current" />
        ) : (
          <Play className="size-4 fill-current" />
        )}
        {formatDuration(take.durationSeconds)}
      </button>
    </li>
  );
}
