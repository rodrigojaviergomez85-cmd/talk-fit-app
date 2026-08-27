import { Check, X } from "lucide-react";
import type { MistakeEntry } from "@/lib/types";
import { cn } from "@/lib/utils";

type MistakeBankProps = {
  mistakes: MistakeEntry[];
  limit?: number;
  className?: string;
};

/** MY TOP MISTAKES — only the current top priorities, never hundreds. */
export function MistakeBank({ mistakes, limit = 3, className }: MistakeBankProps) {
  const top = [...mistakes].sort((a, b) => b.occurrences - a.occurrences).slice(0, limit);

  if (top.length === 0) {
    return (
      <div className={cn("rounded-3xl bg-card p-5 text-sm text-muted-foreground shadow-[var(--shadow-card)]", className)}>
        No recurring mistakes right now. Keep training.
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      {top.map((mistake) => (
        <div key={mistake.id} className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{mistake.categoryLabel}</p>
            <span className="rounded-full bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
              {mistake.occurrences}× · {mistake.lastSeen}
            </span>
          </div>
          <p className="mt-3 flex items-start gap-2 text-[15px]">
            <X className="mt-0.5 size-4 shrink-0 text-destructive" />
            <span className="text-muted-foreground line-through">{mistake.wrong}</span>
          </p>
          <p className="mt-1.5 flex items-start gap-2 text-[15px]">
            <Check className="mt-0.5 size-4 shrink-0 text-success" />
            <span className="font-semibold">{mistake.right}</span>
          </p>
        </div>
      ))}
    </div>
  );
}
