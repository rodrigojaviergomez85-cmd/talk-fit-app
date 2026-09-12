import { useState } from "react";
import { Mic } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";
import { SlowWordPanel } from "./SlowWordPanel";
import { AudioService } from "@/services/audio-service";
import { useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Rep2DisplayDiff, Rep2DisplayToken } from "@/lib/rep2-match";

export type Rep2CorrectionResult = {
  status: "good" | "correct" | "uncertain";
  transcript: string;
  target: string;
  focus?: string;
  retryRecommended: boolean;
  /** Word-level highlights computed server-side; null when there are too many differences. */
  diff?: Rep2DisplayDiff | null;
};

function DiffTokens({ tokens, variant }: { tokens: Rep2DisplayToken[]; variant: "said" | "target" }) {
  return (
    <>
      {tokens.map((token, i) =>
        token.changed ? (
          <mark
            key={i}
            className={
              variant === "said"
                ? "rounded bg-amber-500/25 px-0.5 font-bold text-amber-700 dark:text-amber-400"
                : "rounded bg-primary/15 px-0.5 font-bold text-primary"
            }
          >
            {token.text}{" "}
          </mark>
        ) : (
          <span key={i}>{token.text} </span>
        ),
      )}
    </>
  );
}

type Rep2FeedbackProps = {
  result: Rep2CorrectionResult;
  voice?: "female" | "male" | undefined;
  onTryAgain: () => void;
  onSkip: () => void;
  onNext: () => void;
  /** "NEXT CHUNK" / "NEXT REP" — supplied by the caller so the card owns navigation. */
  nextLabel: string;
  canRetry: boolean;
};

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightFocus(sentence: string, focus?: string): React.ReactNode {
  if (!focus) return sentence;
  const pattern = escapeRegExp(focus).replace(/\s+/g, "\\s+");
  const parts = sentence.split(new RegExp(`(\\b${pattern}\\b)`, "i"));
  return parts.map((part, i) =>
    part.toLowerCase().replace(/\s+/g, " ") === focus.toLowerCase().replace(/\s+/g, " ") ? (
      <strong key={i} className="text-primary">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function NextButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[15px] font-bold text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
    >
      {label} →
    </button>
  );
}

function TryAgainButton({ label, onClick, solid }: { label: string; onClick: () => void; solid?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        solid
          ? "inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[14px] font-bold uppercase tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
          : "inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary bg-primary/10 px-4 text-[14px] font-bold uppercase tracking-wide text-primary active:scale-[0.98]"
      }
    >
      <Mic className="size-5" /> {label}
    </button>
  );
}

function SkipButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-[44px] w-full items-center justify-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground underline underline-offset-4"
    >
      {label}
    </button>
  );
}

/**
 * Feedback card for Rep 2 spoken correction. When visible it is the ONLY
 * navigation surface: NEXT (good / retries exhausted), TRY AGAIN, SKIP.
 * SKIP is always available so the learner is never trapped.
 */
export function Rep2Feedback({ result, voice, onTryAgain, onSkip, onNext, nextLabel, canRetry }: Rep2FeedbackProps) {
  const t = useT();
  const es = t("rep2.youSaid") === "Tú dijiste";

  if (result.status === "good") {
    return (
      <div className="space-y-4 rounded-3xl border border-success/30 bg-success/10 p-5 text-center">
        <p className="text-[18px] font-extrabold uppercase tracking-wide text-success">{t("rep2.good")}</p>
        <NextButton label={nextLabel} onClick={onNext} />
      </div>
    );
  }

  if (result.status === "uncertain") {
    return (
      <div className="space-y-4 rounded-3xl border border-muted bg-card p-5 text-center">
        <p className="text-[15px] font-bold uppercase tracking-wide text-muted-foreground">{t("rep2.uncertain")}</p>
        <div className="flex flex-col gap-3">
          {canRetry ? (
            <TryAgainButton label={t("rep2.tryAgain")} onClick={onTryAgain} />
          ) : (
            <NextButton label={nextLabel} onClick={onNext} />
          )}
          <SkipButton label={t("action.skip")} onClick={onSkip} />
        </div>
      </div>
    );
  }

  // CORRECT
  return (
    <div className="space-y-4 rounded-3xl border border-amber-500/30 bg-amber-500/10 p-5">
      <p className="text-center text-[16px] font-extrabold uppercase tracking-wide text-amber-600">{t("rep2.almost")}</p>

      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{t("rep2.youSaid")}</p>
        <p className="rounded-2xl bg-background/60 p-3 text-[15px] font-medium text-foreground">
          “{result.diff ? <DiffTokens tokens={result.diff.said} variant="said" /> : result.transcript || (es ? "(no se escuchó)" : "(not heard)")}”
        </p>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{t("rep2.try")}</p>
        <p className="rounded-2xl bg-background p-3 text-[17px] font-semibold leading-relaxed text-foreground">
          “{result.diff ? <DiffTokens tokens={result.diff.target} variant="target" /> : highlightFocus(result.target, result.focus)}”
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <AudioPlayer text={result.target} label={t("rep2.listenAgain")} rate={1} voice={voice} variant="ghost" size="sm" />
        {canRetry ? (
          <TryAgainButton label={t("rep2.tryAgain")} onClick={onTryAgain} solid />
        ) : (
          <NextButton label={nextLabel} onClick={onNext} />
        )}
        <SkipButton label={t("action.skip")} onClick={onSkip} />
      </div>
    </div>
  );
}
