import { cn } from "@/lib/utils";
import { useSpanishAll } from "./TranslatableText";

export type SeriesRep = {
  number: number;
  duration: number;
  status: "done" | "pending";
};

type RepSeriesRowProps = {
  total: number;
  reps: SeriesRep[];
  className?: string;
};

export function RepSeriesRow({ total, reps, className }: RepSeriesRowProps) {
  const showEs = useSpanishAll();

  const rows = Array.from({ length: total }, (_, i) => {
    const found = reps.find((r) => r.number === i + 1);
    return {
      number: i + 1,
      duration: found?.duration ?? null,
      status: found?.status ?? "pending",
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
              {showEs ? `REP ${rep.number}` : `REP ${rep.number}`}
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
                "rounded-b-lg py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em]",
                rep.status === "done"
                  ? "bg-green-500/10 text-green-600"
                  : "bg-muted/50 text-muted-foreground/60",
              )}
            >
              {rep.status === "done" ? (showEs ? "HECHO" : "DONE") : "—"}
            </div>
          ))}
        </div>

        <div className="mt-2 flex justify-between border-t border-border pt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          <span>{showEs ? "Tiempo" : "Time"}</span>
          <span>{showEs ? "Estado" : "Status"}</span>
        </div>
      </div>
    </div>
  );
}
