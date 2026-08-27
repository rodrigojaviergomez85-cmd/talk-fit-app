import { AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";
import { VERDICT_COPY, type RepCheck } from "@/lib/pronunciation-check";
import { cn } from "@/lib/utils";

type RepFeedbackProps = {
  check: RepCheck;
  onRetry?: () => void;
  className?: string;
};

/** Immediate "¿lo dije bien?" verdict after every repetition. */
export function RepFeedback({ check, onRetry, className }: RepFeedbackProps) {
  const copy = VERDICT_COPY[check.verdict];
  const good = check.verdict === "great";

  if (!check.hasTranscript) {
    return (
      <div className={cn("rounded-3xl border border-border bg-card p-5 text-sm text-muted-foreground", className)}>
        No pudimos escuchar tus palabras en este navegador. Compara tu voz con el modelo y vuelve a intentarlo.
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-3xl border p-5",
        good ? "border-success/30 bg-success/10" : check.verdict === "close" ? "border-primary/30 bg-accent" : "border-destructive/30 bg-destructive/10",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.16em]">
          {good ? <CheckCircle2 className="size-5 text-success" /> : <AlertCircle className="size-5 text-primary" />}
          {copy.title}
        </p>
        <span className="rounded-full bg-card px-3 py-1 text-[12px] font-bold tabular-nums">{check.accuracy}%</span>
      </div>
      <p className="mt-1.5 text-sm text-muted-foreground">{copy.sub}</p>

      <p className="mt-4 text-[17px] font-semibold leading-relaxed">
        {check.words.map((word, index) => (
          <span
            key={`${word.word}-${index}`}
            className={cn(
              "mr-1 rounded-md px-1",
              word.status === "correct" ? "text-success" : "bg-destructive/15 text-destructive line-through",
            )}
          >
            {word.word}
          </span>
        ))}
      </p>

      {check.extra.length > 0 ? (
        <p className="mt-3 text-[13px] text-muted-foreground">
          Palabras de más: <span className="font-semibold">{check.extra.slice(0, 6).join(", ")}</span>
        </p>
      ) : null}

      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 py-3.5 text-[15px] font-bold active:scale-[0.98]"
        >
          <RotateCcw className="size-4" /> INTENTAR OTRA VEZ
        </button>
      ) : null}
    </div>
  );
}
