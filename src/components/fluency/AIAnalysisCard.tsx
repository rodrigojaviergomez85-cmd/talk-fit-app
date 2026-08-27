import { Check, Sparkles, Target, X } from "lucide-react";
import type { SpeechAnalysis } from "@/lib/types";
import { cn } from "@/lib/utils";

type AIAnalysisCardProps = {
  analysis: SpeechAnalysis;
  onPracticeThis?: () => void;
  className?: string;
};

/** WHAT YOU DID WELL + ONE THING TO IMPROVE. Never overwhelm the learner. */
export function AIAnalysisCard({ analysis, onPracticeThis, className }: AIAnalysisCardProps) {
  const issue = analysis.grammarIssues[0];
  return (
    <div className={cn("space-y-4", className)}>
      <div className="rounded-3xl border border-success/25 bg-success/8 p-5">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-success">
          <Sparkles className="size-4" /> What you did well
        </p>
        <p className="mt-2 text-[17px] font-semibold leading-snug">{analysis.didWell}</p>
      </div>

      <div className="rounded-3xl border border-primary/25 bg-accent p-5">
        <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-accent-foreground">
          <Target className="size-4" /> One thing to improve
        </p>
        <p className="mt-2 text-[17px] font-semibold leading-snug text-foreground">{analysis.oneThingToImprove}</p>

        {issue ? (
          <div className="mt-4 space-y-2 rounded-2xl bg-card p-4">
            <p className="flex items-start gap-2 text-[15px]">
              <X className="mt-0.5 size-4 shrink-0 text-destructive" />
              <span className="text-muted-foreground line-through">{issue.said}</span>
            </p>
            <p className="flex items-start gap-2 text-[15px]">
              <Check className="mt-0.5 size-4 shrink-0 text-success" />
              <span className="font-semibold">{issue.correct}</span>
            </p>
          </div>
        ) : null}

        {onPracticeThis ? (
          <button
            type="button"
            onClick={onPracticeThis}
            className="mt-4 w-full rounded-2xl bg-primary px-5 py-3.5 text-[15px] font-bold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
          >
            PRACTICE THIS
          </button>
        ) : null}
      </div>
    </div>
  );
}
