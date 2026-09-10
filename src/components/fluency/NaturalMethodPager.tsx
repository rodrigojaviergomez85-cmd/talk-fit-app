import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Play, Volume2 } from "lucide-react";
import { AudioService } from "@/services/audio-service";
import { cn } from "@/lib/utils";

export const PAGE_SIZE = 10;

/** Keeps a 10-per-page window and resets when the filtered list changes. */
export function usePagination(total: number, resetKey: string) {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [resetKey]);

  useEffect(() => {
    if (page > pageCount) setPage(1);
  }, [page, pageCount]);

  const start = (page - 1) * PAGE_SIZE;
  return { page, setPage, pageCount, start, end: start + PAGE_SIZE };
}

/** Previous / next controls with a page indicator; scrolls back to the list top. */
export function Pager({
  page,
  pageCount,
  onChange,
  showEs,
  scrollTargetRef,
}: {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
  showEs: boolean;
  scrollTargetRef?: React.RefObject<HTMLElement | null>;
}) {
  const go = (next: number) => {
    onChange(next);
    const target = scrollTargetRef?.current;
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex items-center justify-between gap-3 pt-1">
      <button
        type="button"
        onClick={() => go(page - 1)}
        disabled={page <= 1}
        className="inline-flex min-h-11 items-center gap-1 rounded-2xl border border-border bg-card px-4 text-[12px] font-bold uppercase tracking-[0.12em] disabled:opacity-40"
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        {showEs ? "Anterior" : "Previous"}
      </button>
      <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {showEs ? `Página ${page} de ${pageCount}` : `Page ${page} of ${pageCount}`}
      </span>
      <button
        type="button"
        onClick={() => go(page + 1)}
        disabled={page >= pageCount}
        className="inline-flex min-h-11 items-center gap-1 rounded-2xl border border-border bg-card px-4 text-[12px] font-bold uppercase tracking-[0.12em] disabled:opacity-40"
      >
        {showEs ? "Siguiente" : "Next"}
        <ChevronRight className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}

/** Play button that speaks a phrase with the existing model voice. */
export function SpeakButton({ text, showEs }: { text: string; showEs: boolean }) {
  const [playing, setPlaying] = useState(false);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  const play = () => {
    setPlaying(true);
    AudioService.speak(text.replace(" / ", ", "), {
      onEnd: () => alive.current && setPlaying(false),
      onError: () => alive.current && setPlaying(false),
    });
  };

  return (
    <button
      type="button"
      onClick={play}
      aria-label={showEs ? `Escuchar ${text}` : `Listen to ${text}`}
      className={cn(
        "flex size-9 shrink-0 items-center justify-center rounded-full border transition",
        playing ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background text-primary",
      )}
    >
      {playing ? <Volume2 className="size-4" aria-hidden="true" /> : <Play className="size-4" aria-hidden="true" />}
    </button>
  );
}
