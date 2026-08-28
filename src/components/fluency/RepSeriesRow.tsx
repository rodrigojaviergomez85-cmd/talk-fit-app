import { useEffect, useRef, useState } from "react";
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
  current?: number;
  onSelect?: (number: number) => void;
};

export function RepSeriesRow({ total, reps, className, onDelete, current, onSelect }: RepSeriesRowProps) {
  const showEs = useSpanishAll();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingRep, setPlayingRep] = useState<number | null>(null);

  const stop = () => {
    audioRef.current?.pause();
    audioRef.current = null;
    setPlayingRep(null);
  };

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const toggle = (number: number, url?: string) => {
    if (playingRep === number) {
      stop();
      return;
    }
    if (!url) return;
    audioRef.current?.pause();
    const audio = new Audio(url);
    audioRef.current = audio;
    setPlayingRep(number);
    audio.onended = () => setPlayingRep((p) => (p === number ? null : p));
    audio.onerror = () => setPlayingRep((p) => (p === number ? null : p));
    void audio.play().catch(() => setPlayingRep((p) => (p === number ? null : p)));
  };

  const maxDone = reps.filter((r) => r.status === "done").reduce((m, r) => Math.max(m, r.number), 0);

  const rows = Array.from({ length: total }, (_, i) => {
    const found = reps.find((r) => r.number === i + 1);
    return {
      number: i + 1,
      duration: found?.duration ?? null,
      status: found?.status ?? "pending",
      url: found?.url,
      selectable: i + 1 <= maxDone + 1,
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
                current === rep.number
                  ? "bg-primary text-primary-foreground"
                  : rep.status === "done"
                    ? "bg-primary/10 text-primary"
                    : "bg-muted text-muted-foreground",
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
            <div key={`actions-${rep.number}`} className="flex items-center justify-center gap-1 border-t border-border py-1.5">
              {rep.status === "done" && rep.url ? (
                <>
                  <button
                    type="button"
                    onClick={() => toggle(rep.number, rep.url)}
                    aria-label={
                      playingRep === rep.number
                        ? showEs
                          ? `Detener rep ${rep.number}`
                          : `Stop rep ${rep.number}`
                        : showEs
                          ? `Escuchar rep ${rep.number}`
                          : `Listen to rep ${rep.number}`
                    }
                    className="rounded-md px-1.5 py-1 text-[12px] font-bold text-primary active:scale-95"
                  >
                    {playingRep === rep.number ? "■" : "▶"}
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

          {onSelect
            ? rows.map((rep) => (
                <div key={`go-${rep.number}`} className="rounded-b-lg border-t border-border p-1">
                  <button
                    type="button"
                    disabled={!rep.selectable || current === rep.number}
                    onClick={() => {
                      stop();
                      onSelect(rep.number);
                    }}
                    aria-label={showEs ? `Ir a la rep ${rep.number}` : `Go to rep ${rep.number}`}
                    className={cn(
                      "w-full rounded-md py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] transition-colors active:scale-95",
                      current === rep.number
                        ? "bg-primary/15 text-primary"
                        : rep.selectable
                          ? "bg-secondary text-foreground hover:bg-muted"
                          : "text-muted-foreground/40",
                    )}
                  >
                    {current === rep.number ? (showEs ? "AQUÍ" : "HERE") : showEs ? "IR" : "GO"}
                  </button>
                </div>
              ))
            : null}
        </div>

        <div className="mt-2 flex justify-between border-t border-border pt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          <span>{showEs ? "Tiempo" : "Time"}</span>
          <span>{showEs ? "Escuchar / Detener / Borrar / Ir" : "Listen / Stop / Delete / Go"}</span>
        </div>

      </div>
    </div>
  );
}
