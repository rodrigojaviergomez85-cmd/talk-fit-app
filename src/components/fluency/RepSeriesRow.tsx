import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useSpanishAll } from "./TranslatableText";

export type SeriesRep = {
  number: number;
  duration: number;
  status: "done" | "pending";
  url?: string | undefined;
};

type RepSeriesRowProps = {
  total: number;
  reps: SeriesRep[];
  className?: string;
  onDelete?: (number: number) => void;
};

export function RepSeriesRow({ total, reps, className, onDelete }: RepSeriesRowProps) {
  const showEs = useSpanishAll();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const play = (url?: string) => {
    if (!url) return;
    audioRef.current?.pause();
    const audio = new Audio(url);
    audioRef.current = audio;
    void audio.play();
  };

  const rows = Array.from({ length: total }, (_, i) => {
    const found = reps.find((r) => r.number === i + 1);
    return {
      number: i + 1,
      duration: found?.duration ?? null,
      status: found?.status ?? "pending",
      url: found?.url,
    };
  });

  return (
    <div className={cn("overflow-x-auto", className)}>
      <div className="min-w-full rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]">
        <div
          className="grid gap-1 text-center"
          style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
        >
          {rows.map((rep) => (
            <div
              key={`head-${rep.number}`}
              className={cn(
                "rounded-t-lg py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em]",
                rep.status === "done" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
              )}
            >
              {`REP ${rep.number}`}
            </div>
          ))}

          {rows.map((rep) => (
            <div
              key={`time-${rep.number}`}
              className={cn(
                "border-t border-border py-2 text-[13px] font-semibold tabular-nums",
                rep.duration != null ? "text-foreground" : "text-muted-foreground/50",
              )}
            >
              {rep.duration != null ? `${Math.round(rep.duration)}s` : "—"}
            </div>
          ))}

          {rows.map((rep) => (
            <div
              key={`status-${rep.number}`}
              className={cn(
                "py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em]",
                rep.status === "done"
                  ? "bg-green-500/10 text-green-600"
                  : "bg-muted/50 text-muted-foreground/60",
              )}
            >
              {rep.status === "done" ? (showEs ? "HECHO" : "DONE") : "—"}
            </div>
          ))}

          {rows.map((rep) => (
            <div key={`actions-${rep.number}`} className="flex items-center justify-center gap-1 rounded-b-lg border-t border-border py-1.5">
              {rep.status === "done" && rep.url ? (
                <>
                  <button
                    type="button"
                    onClick={() => play(rep.url)}
                    aria-label={showEs ? `Escuchar rep ${rep.number}` : `Listen to rep ${rep.number}`}
                    className="rounded-md px-1.5 py-1 text-[12px] font-bold text-primary active:scale-95"
                  >
                    ▶
                  </button>
                  {onDelete ? (
                    <button
                      type="button"
                      onClick={() => onDelete(rep.number)}
                      aria-label={showEs ? `Borrar rep ${rep.number}` : `Delete rep ${rep.number}`}
                      className="rounded-md px-1.5 py-1 text-[12px] font-bold text-destructive active:scale-95"
                    >
                      🗑
                    </button>
                  ) : null}
                </>
              ) : (
                <span className="text-[11px] text-muted-foreground/40">—</span>
              )}
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-between border-t border-border pt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          <span>{showEs ? "Tiempo" : "Time"}</span>
          <span>{showEs ? "Escuchar / Borrar" : "Listen / Delete"}</span>
        </div>
      </div>
    </div>
  );
}
