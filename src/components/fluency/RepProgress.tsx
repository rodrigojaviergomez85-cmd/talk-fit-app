import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

type RepProgressProps = {
  current: number;
  total: number;
  title: string;
  onBack?: () => void;
  onNext?: () => void;
  onExit?: () => void;
};

/** Sticky practice header — always answers "where am I?". */
export function RepProgress({ current, total, title, onBack, onNext, onExit }: RepProgressProps) {
  const t = useT();
  return (
    <header className="sticky top-0 z-20 bg-navy px-4 pb-4 pt-[max(0.75rem,env(safe-area-inset-top))] text-navy-foreground">
      <div className="mx-auto flex w-full max-w-lg items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={!onBack}
          className="-ml-2 inline-flex size-11 min-h-11 min-w-11 items-center justify-center rounded-full text-navy-foreground/80 transition-colors hover:bg-white/10 disabled:opacity-30"
          aria-label="Previous rep"
        >
          <ChevronLeft className="size-5" />
        </button>
        <p className="text-xs font-bold uppercase tracking-[0.2em]">{title}</p>
        <div className="flex items-center">
          <button
            type="button"
            onClick={onNext}
            disabled={!onNext}
            className="inline-flex size-11 min-h-11 min-w-11 items-center justify-center rounded-full text-navy-foreground/80 transition-colors hover:bg-white/10 disabled:opacity-30"
            aria-label="Next rep"
          >
            <ChevronRight className="size-5" />
          </button>
          <button
          type="button"
          onClick={onExit}
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-xs font-semibold uppercase tracking-wider text-navy-foreground/70 transition-colors hover:bg-white/10"
        >
            {t("action.exit")}
          </button>
        </div>
      </div>
      <div className="mx-auto mt-3 flex w-full max-w-lg gap-1">
        {Array.from({ length: total }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "h-1.5 flex-1 rounded-full transition-colors",
              index < current ? "bg-primary" : index === current ? "bg-primary/50" : "bg-white/15",
            )}
          />
        ))}
      </div>
    </header>
  );
}
