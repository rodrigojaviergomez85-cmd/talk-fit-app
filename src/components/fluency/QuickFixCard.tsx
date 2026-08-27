import { useState } from "react";
import { Check } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";
import { VoiceRecorder } from "./VoiceRecorder";
import type { QuickFix } from "@/lib/types";
import { cn } from "@/lib/utils";

type QuickFixCardProps = {
  quickFix: QuickFix;
  onDone: () => void;
  className?: string;
};

/** AI personalized micro-rep: listen → say it → change the subject → repeat. */
export function QuickFixCard({ quickFix, onDone, className }: QuickFixCardProps) {
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState<boolean[]>(() => quickFix.variations.map(() => false));
  const sentence = quickFix.variations[index] ?? quickFix.variations[0] ?? "";

  const markDone = () => {
    setDone((prev) => prev.map((value, i) => (i === index ? true : value)));
    if (index < quickFix.variations.length - 1) setIndex(index + 1);
  };

  const allDone = done.every(Boolean);

  return (
    <div className={cn("rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]", className)}>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">Quick fix</p>
      <h3 className="mt-1 text-xl font-bold">{quickFix.focusLabel}</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Variation {index + 1} of {quickFix.variations.length}
      </p>

      <p className="mt-5 text-center text-2xl font-bold leading-snug text-balance-tight">{sentence}</p>

      <div className="mt-5 space-y-3">
        <AudioPlayer text={sentence} label="LISTEN" variant="navy" />
        <VoiceRecorder label="SAY IT" stopLabel="DONE" showTimer={false} onComplete={markDone} />
      </div>

      <div className="mt-5 flex justify-center gap-2">
        {quickFix.variations.map((variation, i) => (
          <button
            key={variation}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "flex size-8 items-center justify-center rounded-full text-xs font-bold transition-colors",
              done[i] ? "bg-success text-success-foreground" : i === index ? "bg-navy text-navy-foreground" : "bg-secondary text-muted-foreground",
            )}
          >
            {done[i] ? <Check className="size-4" /> : i + 1}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onDone}
        className={cn(
          "mt-6 w-full rounded-2xl px-5 py-4 text-[15px] font-bold tracking-wide transition-colors active:scale-[0.98]",
          allDone ? "bg-primary text-primary-foreground shadow-[var(--shadow-lift)]" : "bg-secondary text-secondary-foreground",
        )}
      >
        {allDone ? "GO TO FINAL REP" : "SKIP TO FINAL REP"}
      </button>
    </div>
  );
}
