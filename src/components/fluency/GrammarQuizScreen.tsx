import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, RotateCcw, Trophy, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { AppShell } from "@/components/fluency/AppShell";
import {
  GRAMMAR_PASS_SCORE,
  type GrammarItem,
  type GrammarQuiz,
} from "@/services/grammar-quiz";
import { isItemCorrect, submitGrammarQuiz } from "@/lib/grammar-quiz.functions";
import {
  playGoodFeedbackSound,
  playVictorySound,
  playWrongFeedbackSound,
  unlockFeedbackAudio,
} from "@/lib/feedback-sounds";
import { cn } from "@/lib/utils";

type Answers = Record<string, number | string[]>;

/**
 * PASO 3 · GRAMÁTICA — 20 ítems del día, con sonido y explicación inmediata.
 * La nota final y los puntos de la liga los decide el servidor.
 */
export function GrammarQuizScreen({
  quiz,
  moduleId,
  day,
  es,
}: {
  quiz: GrammarQuiz;
  moduleId: string;
  day: number;
  es: boolean;
}) {
  const submit = useServerFn(submitGrammarQuiz);
  const [answers, setAnswers] = useState<Answers>({});
  const [round, setRound] = useState<GrammarItem[]>(quiz.items);
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState<null | { correct: boolean; value: number | string[] }>(null);
  const [result, setResult] = useState<null | { correct: number; total: number; passed: boolean; awarded: boolean; wrong: string[]; canRetry: boolean }>(null);
  const [sending, setSending] = useState(false);
  const [failedToSend, setFailedToSend] = useState(false);

  const item = round[index];
  const isRetry = round.length !== quiz.items.length;
  const isPilot = moduleId === "past-stories" && day >= 1 && day <= 10;

  const send = useCallback(
    async (all: Answers) => {
      setSending(true);
      setFailedToSend(false);
      try {
        const res = await submit({
          data: {
            moduleId,
            day,
            answers: Object.entries(all).map(([id, value]) => ({ id, value })),
          },
        });
        setResult({ ...res });
      } catch {
        setFailedToSend(true);
      } finally {
        setSending(false);
      }
    },
    [submit, moduleId, day],
  );

  const answer = (value: number | string[]) => {
    if (!item || checked) return;
    unlockFeedbackAudio();
    const correct = isItemCorrect(item, value);
    if (correct) playGoodFeedbackSound();
    else playWrongFeedbackSound();
    setAnswers((prev) => ({ ...prev, [item.id]: value }));
    setChecked({ correct, value });
  };

  const next = () => {
    setChecked(null);
    if (index + 1 < round.length) {
      setIndex(index + 1);
      return;
    }
    void send(answers);
  };

  const retryWrong = () => {
    const wrongIds = new Set(result?.wrong ?? []);
    const again = quiz.items.filter((i) => wrongIds.has(i.id));
    if (!again.length) return;
    setRound(again);
    setIndex(0);
    setChecked(null);
    setResult(null);
  };

  if (result) {
    return (
      <AppShell>
        <div className="space-y-4 p-4 pb-8">
          <BackLink moduleId={moduleId} day={day} es={es} />
          <div className="space-y-3 rounded-3xl border border-border bg-card p-6 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {es ? "Gramática del día" : "Grammar of the day"}
            </p>
            <p className="text-4xl font-extrabold text-foreground">
              {result.correct}
              <span className="text-xl text-muted-foreground"> / {result.total}</span>
            </p>
            {result.passed ? (
              <>
                <p className="text-sm font-bold text-primary">
                  {es ? "¡Aprobaste! +150 puntos para tu liga." : "You passed! +150 league points."}
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[12px] font-extrabold text-primary">
                  <Trophy className="size-4" aria-hidden="true" />
                  150 pts
                </span>
              </>
            ) : (
              <p className="text-sm font-bold text-muted-foreground">
                {es
                  ? `Necesitas ${GRAMMAR_PASS_SCORE} de ${result.total} para ganar los 150 puntos. Repite los que fallaste.`
                  : `You need ${GRAMMAR_PASS_SCORE} of ${result.total} to earn the 150 points. Try the ones you missed.`}
              </p>
            )}
            {!result.passed && result.canRetry ? (
              <button
                type="button"
                onClick={retryWrong}
                className="mt-1 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-navy px-4 text-[13px] font-extrabold uppercase tracking-[0.12em] text-navy-foreground"
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                {es ? `Repetir los ${result.wrong.length} fallados` : `Retry the ${result.wrong.length} you missed`}
              </button>
            ) : null}
            {!result.passed && !result.canRetry ? (
              <div className="mt-2 space-y-2 text-left">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {es ? "Repasá los que fallaste" : "Review the ones you missed"}
                </p>
                {result.wrong.map((id) => {
                  const missed = quiz.items.find((i) => i.id === id);
                  if (!missed) return null;
                  return (
                    <div key={id} className="rounded-2xl border border-border bg-background p-3">
                      <p className="text-[13px] font-bold text-foreground">{correctAnswerText(missed)}</p>
                      <p className="mt-1 text-[12px] font-medium text-muted-foreground">
                        {es ? missed.explain.es : missed.explain.en}
                      </p>
                    </div>
                  );
                })}
                <p className="pt-1 text-center text-[12px] font-bold text-muted-foreground">
                  {es
                    ? "Hoy ya usaste tu reintento. Mañana podés intentarlo de nuevo."
                    : "You already used today's retry. You can try again tomorrow."}
                </p>
              </div>
            ) : null}
            <Link
              to="/day/$moduleId/$day"
              params={{ moduleId, day: String(day) }}
              className="flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-border px-4 text-[13px] font-extrabold uppercase tracking-[0.12em] text-foreground"
            >
              {es ? "Volver al día" : "Back to the day"}
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  if (!item) return null;

  return (
    <AppShell>
      <div className="space-y-3 p-4 pb-8">
        <BackLink moduleId={moduleId} day={day} es={es} />

        <header>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {es ? "PASO 3 · GRAMÁTICA" : "STEP 3 · GRAMMAR"}
            {isRetry ? (es ? " · REPASO" : " · RETRY") : null}
          </p>
          <h1 className="mt-0.5 text-lg font-extrabold leading-tight text-foreground">
            {es ? quiz.title.es : quiz.title.en}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${Math.round((index / round.length) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] font-extrabold text-muted-foreground">
              {index + 1}/{round.length}
            </span>
          </div>
        </header>

        <ItemView item={item} checked={checked} onAnswer={answer} es={es} isPilot={isPilot} />

        {checked ? (
          <div
            role="status"
            className={cn(
              "rounded-2xl border p-3.5",
              checked.correct
                ? isPilot
                  ? "border-success bg-success/10"
                  : "border-primary bg-primary/10"
                : "border-destructive/40 bg-destructive/10",
            )}
          >
            <p className={cn("flex items-center gap-1.5 text-[13px] font-extrabold", checked.correct && isPilot ? "text-success" : "text-foreground")}>
              {checked.correct ? (
                <>
                  <Check className={cn("size-4", isPilot ? "text-success" : "text-primary")} aria-hidden="true" />
                  {es ? "¡Correcto!" : "Correct!"}
                </>
              ) : (
                <>
                  <X className="size-4 text-destructive" aria-hidden="true" />
                  {es ? "No es así" : "Not quite"}
                </>
              )}
            </p>
            {!checked.correct ? (
              <>
                <p className="mt-1 text-[13px] font-bold text-foreground">
                  {correctAnswerText(item)}
                </p>
                <p className="mt-1 text-[12px] font-medium text-muted-foreground">
                  {es ? item.explain.es : item.explain.en}
                </p>
              </>
            ) : null}
          </div>
        ) : null}

        {failedToSend ? (
          <p className="text-[12px] font-bold text-destructive">
            {es ? "No pudimos guardar tu resultado. Intenta otra vez." : "We couldn't save your result. Try again."}
          </p>
        ) : null}

        <button
          type="button"
          disabled={!checked || sending}
          onClick={next}
          className="flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-navy px-4 text-[13px] font-extrabold uppercase tracking-[0.12em] text-navy-foreground disabled:opacity-40"
        >
          {index + 1 < round.length
            ? es
              ? "Siguiente"
              : "Next"
            : sending
              ? es
                ? "Calificando…"
                : "Scoring…"
              : es
                ? "Ver mi resultado"
                : "See my result"}
        </button>
      </div>
    </AppShell>
  );
}

function BackLink({ moduleId, day, es }: { moduleId: string; day: number; es: boolean }) {
  return (
    <Link
      to="/day/$moduleId/$day"
      params={{ moduleId, day: String(day) }}
      className="inline-flex h-9 items-center gap-1.5 rounded-2xl border border-border px-3 text-[11px] font-bold uppercase tracking-[0.12em]"
    >
      <ArrowLeft className="size-4" aria-hidden="true" />
      {es ? "Volver" : "Back"}
    </Link>
  );
}

function correctAnswerText(item: GrammarItem): string {
  if (item.kind === "mc") return item.options[item.answer] ?? "";
  if (item.kind === "mistake") {
    const words = [...item.words];
    words[item.answer] = item.correction;
    return words.join(" ");
  }
  return item.answer.join(" ");
}

function ItemView({
  item,
  checked,
  onAnswer,
  es,
  isPilot,
}: {
  item: GrammarItem;
  checked: null | { correct: boolean; value: number | string[] };
  onAnswer: (value: number | string[]) => void;
  es: boolean;
  isPilot: boolean;
}) {
  if (item.kind === "mc") {
    return (
      <div className="space-y-2.5 rounded-3xl border border-border bg-card p-4">
        <p className="text-[15px] font-extrabold leading-snug text-foreground">{item.prompt}</p>
        {es ? <p className="text-[12px] font-medium text-muted-foreground">{item.promptEs}</p> : null}
        <div className="space-y-2 pt-1">
          {item.options.map((option, i) => {
            const picked = typeof checked?.value === "number" && checked.value === i;
            const isAnswer = i === item.answer;
            return (
              <button
                key={option}
                type="button"
                disabled={Boolean(checked)}
                onClick={() => onAnswer(i)}
                className={cn(
                  "flex min-h-[48px] w-full items-center rounded-2xl border px-3.5 text-left text-[14px] font-bold transition-colors",
                  checked && isAnswer
                    ? isPilot
                      ? "border-success bg-success/10 text-success"
                      : "border-primary bg-primary/10 text-foreground"
                    : picked
                      ? "border-destructive bg-destructive/10 text-foreground"
                      : "border-border bg-background text-foreground",
                )}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (item.kind === "mistake") {
    return (
      <div className="space-y-2.5 rounded-3xl border border-border bg-card p-4">
        <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {es ? item.promptEs : "Tap the wrong word."}
        </p>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.words.map((word, i) => {
            const picked = typeof checked?.value === "number" && checked.value === i;
            const isAnswer = i === item.answer;
            return (
              <button
                key={`${word}-${i}`}
                type="button"
                disabled={Boolean(checked)}
                onClick={() => onAnswer(i)}
                className={cn(
                  "min-h-[44px] rounded-xl border px-3 text-[15px] font-bold",
                  checked && isAnswer
                    ? isPilot
                      ? "border-success bg-success/10 text-success"
                      : "border-primary bg-primary/10 text-foreground"
                    : picked
                      ? "border-destructive bg-destructive/10 text-foreground"
                      : "border-border bg-background text-foreground",
                )}
              >
                {word}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return <RearrangeView key={item.id} item={item} locked={Boolean(checked)} correct={checked?.correct ?? false} isPilot={isPilot} onAnswer={onAnswer} es={es} />;
}

function RearrangeView({
  item,
  locked,
  correct,
  isPilot,
  onAnswer,
  es,
}: {
  item: Extract<GrammarItem, { kind: "rearrange" }>;
  locked: boolean;
  correct: boolean;
  isPilot: boolean;
  onAnswer: (value: string[]) => void;
  es: boolean;
}) {
  const [picked, setPicked] = useState<string[]>([]);
  const remaining = useMemo(() => {
    const left = [...item.pieces];
    for (const p of picked) {
      const i = left.indexOf(p);
      if (i >= 0) left.splice(i, 1);
    }
    return left;
  }, [item.pieces, picked]);

  const complete = picked.length === item.pieces.length;

  return (
    <div className="space-y-3 rounded-3xl border border-border bg-card p-4">
      <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {es ? item.promptEs : "Put the sentence in order."}
      </p>

      <div className="min-h-[56px] rounded-2xl border border-dashed border-border bg-background p-2">
        <div className="flex flex-wrap gap-1.5">
          {picked.map((piece, i) => (
            <button
              key={`${piece}-${i}`}
              type="button"
              disabled={locked}
              onClick={() => setPicked(picked.filter((_, j) => j !== i))}
              className={cn(
                "min-h-[40px] rounded-xl border px-3 text-[14px] font-bold",
                locked && correct && isPilot
                  ? "border-success bg-success/10 text-success"
                  : "border-primary bg-primary/10 text-foreground",
              )}
            >
              {piece}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {remaining.map((piece, i) => (
          <button
            key={`${piece}-${i}`}
            type="button"
            disabled={locked}
            onClick={() => setPicked([...picked, piece])}
            className="min-h-[44px] rounded-xl border border-border bg-background px-3 text-[14px] font-bold text-foreground"
          >
            {piece}
          </button>
        ))}
      </div>

      <button
        type="button"
        disabled={!complete || locked}
        onClick={() => onAnswer(picked)}
        className="flex min-h-[44px] w-full items-center justify-center rounded-2xl border border-border px-4 text-[12px] font-extrabold uppercase tracking-[0.12em] text-foreground disabled:opacity-40"
      >
        {es ? "Revisar" : "Check"}
      </button>
    </div>
  );
}
