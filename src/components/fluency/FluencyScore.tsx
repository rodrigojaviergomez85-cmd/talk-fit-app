import type { ScoreBreakdown } from "@/lib/types";
import { cn } from "@/lib/utils";

type FluencyScoreProps = {
  score: number;
  breakdown?: ScoreBreakdown;
  caption?: string;
  className?: string;
};

const LABELS: { key: keyof ScoreBreakdown; label: string }[] = [
  { key: "fluency", label: "Fluency" },
  { key: "pronunciation", label: "Pronunciation" },
  { key: "grammarAutomaticity", label: "Grammar automaticity" },
  { key: "rhythm", label: "Rhythm" },
  { key: "targetStructure", label: "Target structure" },
];

export function FluencyScore({ score, breakdown, caption, className }: FluencyScoreProps) {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (Math.min(score, 100) / 100) * circumference;

  return (
    <div className={cn("rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]", className)}>
      <div className="flex flex-col items-center">
        <div className="relative size-32">
          <svg viewBox="0 0 120 120" className="size-32 -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--color-secondary)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="var(--color-primary)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold tabular-nums">{score}</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Fluency</span>
          </div>
        </div>
        {caption ? <p className="mt-3 text-center text-sm text-muted-foreground">{caption}</p> : null}
      </div>

      {breakdown ? (
        <div className="mt-6 space-y-3">
          {LABELS.map(({ key, label }) => (
            <div key={key}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{label}</span>
                <span className="font-semibold tabular-nums">{breakdown[key]}</span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${breakdown[key]}%` }} />
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
