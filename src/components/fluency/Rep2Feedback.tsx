import { Volume2 } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export type Rep2CorrectionResult = {
  status: "good" | "correct" | "uncertain";
  transcript: string;
  target: string;
  focus?: string;
  retryRecommended: boolean;
};

type Rep2FeedbackProps = {
  result: Rep2CorrectionResult;
  voice?: "female" | "male" | undefined;
  onTryAgain: () => void;
  onSkip: () => void;
  onNext?: (() => void) | undefined;
  canRetry: boolean;
};

function highlightFocus(sentence: string, focus?: string): React.ReactNode {
  if (!focus) return sentence;
  const parts = sentence.split(new RegExp(`(\\b${focus.replace(/\s+/g, "\\s+")}\\b)`, "i"));
  return parts.map((part, i) =>
    focus.toLowerCase() === part.toLowerCase() ? (
      <strong key={i} className="text-primary">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function Rep2Feedback({ result, voice, onTryAgain, onSkip, onNext, canRetry }: Rep2FeedbackProps) {
  const t = useT();
  const es = t("rep2.youSaid") === "Tú dijiste";

  if (result.status === "good") {
    return (
      <div className="space-y-4 rounded-3xl border border-success/30 bg-success/10 p-5 text-center">
        <p className="text-[18px] font-extrabold uppercase tracking-wide text-success">
          {t("rep2.good")}
        </p>
        {onNext ? (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[15px] font-bold text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
          >
            {t("action.next")} →
          </button>
        ) : null}
      </div>
    );
  }

  if (result.status === "uncertain") {
    return (
      <div className="space-y-4 rounded-3xl border border-muted bg-card p-5 text-center">
        <p className="text-[15px] font-bold uppercase tracking-wide text-muted-foreground">
          {t("rep2.uncertain")}
        </p>
        <div className="flex flex-col gap-3">
          {canRetry ? (
            <button
              type="button"
              onClick={onTryAgain}
              className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-primary/10 px-4 text-[14px] font-bold uppercase tracking-wide text-primary active:scale-[0.98]"
            >
              {t("rep2.tryAgain")}
            </button>
          ) : null}
          <button
            type="button"
            onClick={onSkip}
            className="inline-flex min-h-[44px] w-full items-center justify-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground underline underline-offset-4"
          >
            {t("action.skip")}
          </button>
        </div>
      </div>
    );
  }

  // CORRECT
  return (
    <div className="space-y-4 rounded-3xl border border-amber-500/30 bg-amber-500/10 p-5">
      <p className="text-center text-[16px] font-extrabold uppercase tracking-wide text-amber-600">
        {t("rep2.almost")}
      </p>

      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {t("rep2.youSaid")}
        </p>
        <p className="rounded-2xl bg-background/60 p-3 text-[15px] font-medium text-foreground">
          “{result.transcript || (es ? "(no se escuchó)" : "(not heard)")}”
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          {t("rep2.try")}
        </p>
        <p className="rounded-2xl bg-background p-3 text-[17px] font-semibold leading-relaxed text-foreground">
          “{highlightFocus(result.target, result.focus)}”
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <AudioPlayer
          text={result.target}
          label={t("rep2.listenAgain")}
          rate={1}
          voice={voice}
          variant="ghost"
          size="sm"
        />
        {canRetry ? (
          <button
            type="button"
            onClick={onTryAgain}
            className={cn(
              "inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[14px] font-bold uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]",
            )}
          >
            <Volume2 className="size-5" /> {t("rep2.tryAgain")}
          </button>
        ) : null}
        <button
          type="button"
          onClick={onSkip}
          className="inline-flex min-h-[44px] w-full items-center justify-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground underline underline-offset-4"
        >
          {t("action.skip")}
        </button>
      </div>
    </div>
  );
}
