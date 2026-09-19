import { hasGrammarQuiz } from "@/lib/grammar-quiz-manifest";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Check, Headphones, RotateCcw, Timer, Trophy, X } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { AppShell } from "@/components/fluency/AppShell";
import { VoiceRecorder } from "@/components/fluency/VoiceRecorder";
import { AudioService } from "@/services/audio-service";
import {
  GRAMMAR_PASS_SCORE,
  type GrammarItem,
  type GrammarQuiz,
  type LabSection,
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
type Step = { section: LabSection; item?: GrammarItem };

/**
 * PASO 3 — ítems del día, con sonido y explicación inmediata.
 * Los quizzes de gramática recorren ítems planos; los del B2 Lab traen
 * `sections` y se recorren sección por sección (lectura, listening,
 * estructura, speaking) con su reloj. La nota final y los puntos de la liga
 * los decide el servidor.
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
  const [roundIds, setRoundIds] = useState<string[] | null>(null);
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState<null | { correct: boolean; value: number | string[] }>(null);
  const [result, setResult] = useState<null | { correct: number; total: number; passed: boolean; awarded: boolean; wrong: string[]; canRetry: boolean }>(null);
  const [sending, setSending] = useState(false);
  const [failedToSend, setFailedToSend] = useState(false);
  const [listenDone, setListenDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (result?.passed) {
      unlockFeedbackAudio();
      playVictorySound();
    }
  }, [result?.passed]);

  const isRetry = roundIds !== null;
  const isPilot = hasGrammarQuiz(moduleId, day);
  const passScore = quiz.passScore ?? GRAMMAR_PASS_SCORE;
  const isLab = Boolean(quiz.sections?.length);

  const steps = useMemo<Step[]>(() => {
    const keep = roundIds ? new Set(roundIds) : null;
    const byId = new Map(quiz.items.map((i) => [i.id, i] as const));
    const list: Step[] = [];
    if (quiz.sections?.length) {
      for (const section of quiz.sections) {
        const items = section.itemIds
          .map((id) => byId.get(id))
          .filter((i): i is GrammarItem => Boolean(i) && (!keep || keep.has(i!.id)));
        if (items.length) for (const item of items) list.push({ section, item });
        else if (!keep && section.itemIds.length === 0) list.push({ section });
      }
      return list;
    }
    const flat: LabSection = {
      id: "all",
      label: { en: "Grammar", es: "Gramática" },
      instruction: { en: "", es: "" },
      itemIds: quiz.items.map((i) => i.id),
    };
    for (const item of quiz.items) {
      if (keep && !keep.has(item.id)) continue;
      list.push({ section: flat, item });
    }
    return list;
  }, [quiz, roundIds]);

  const sectionOrder = useMemo(() => {
    const ids: string[] = [];
    for (const step of steps) if (!ids.includes(step.section.id)) ids.push(step.section.id);
    return ids;
  }, [steps]);

  const step = steps[index];
  const section = step?.section;
  const item = step?.item;

  /* ---- reloj por sección (no por ítem) ---- */
  const [remaining, setRemaining] = useState<number | null>(null);
  const sectionId = section?.id ?? "";
  const limit = section?.timeLimitSec;
  useEffect(() => {
    setRemaining(limit ?? null);
  }, [sectionId, limit]);

  const skipSection = useCallback(() => {
    const next = steps.findIndex((s, i) => i > index && s.section.id !== sectionId);
    setChecked(null);
    if (next >= 0) setIndex(next);
  }, [steps, index, sectionId]);

  const skipRef = useRef(skipSection);
  skipRef.current = skipSection;
  const finishRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    if (remaining === null || result) return;
    if (remaining <= 0) {
      const more = steps.some((s, i) => i > index && s.section.id !== sectionId);
      if (more) skipRef.current();
      else finishRef.current();
      return;
    }
    const id = setTimeout(() => setRemaining((r) => (r === null ? null : r - 1)), 1000);
    return () => clearTimeout(id);
  }, [remaining, result, steps, index, sectionId]);

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

  const answersRef = useRef(answers);
  answersRef.current = answers;
  finishRef.current = () => {
    void send(answersRef.current);
  };

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
    if (index + 1 < steps.length) {
      setIndex(index + 1);
      return;
    }
    void send(answers);
  };

  const retryWrong = () => {
    const wrongIds = (result?.wrong ?? []).filter((id) => quiz.items.some((i) => i.id === id));
    if (!wrongIds.length) return;
    setRoundIds(wrongIds);
    setIndex(0);
    setChecked(null);
    setListenDone({});
    setResult(null);
  };

  if (result) {
    const band = quiz.bands?.find((b) => result.correct >= b.min);
    const breakdown = (quiz.sections ?? [])
      .filter((s) => s.itemIds.length > 0)
      .map((s) => {
        const missed = s.itemIds.filter((id) => result.wrong.includes(id)).length;
        return `${es ? s.label.es : s.label.en} ${s.itemIds.length - missed}/${s.itemIds.length}`;
      });

    return (
      <AppShell>
        <div className="space-y-4 p-4 pb-8">
          <BackLink moduleId={moduleId} day={day} es={es} />
          <div className="space-y-3 rounded-3xl border border-border bg-card p-6 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {isLab ? "B2 Lab" : es ? "Gramática del día" : "Grammar of the day"}
            </p>
            {band ? (
              <p className="text-xl font-extrabold text-primary">{es ? band.label.es : band.label.en}</p>
            ) : null}
            <p className="text-4xl font-extrabold text-foreground">
              {result.correct}
              <span className="text-xl text-muted-foreground"> / {result.total}</span>
            </p>
            {breakdown.length ? (
              <p className="text-[12px] font-bold text-muted-foreground">{breakdown.join(" · ")}</p>
            ) : null}
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
                  ? `Necesitas ${passScore} de ${result.total} para ganar los 150 puntos. Repite los que fallaste.`
                  : `You need ${passScore} of ${result.total} to earn the 150 points. Try the ones you missed.`}
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
                  const solution = correctAnswerText(missed);
                  return (
                    <div key={id} className="rounded-2xl border border-border bg-background p-3">
                      {solution ? <p className="text-[13px] font-bold text-foreground">{solution}</p> : null}
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

  if (!step || !section) return null;

  const listening = section.context?.kind === "listening" ? section.context : null;
  const reading = section.context?.kind === "reading" ? section.context : null;
  const waitingForAudio = Boolean(listening) && !listenDone[section.id];
  const sectionNumber = sectionOrder.indexOf(section.id) + 1;

  return (
    <AppShell>
      <div className="space-y-3 p-4 pb-8">
        <BackLink moduleId={moduleId} day={day} es={es} />

        <header>
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {isLab ? (es ? "PASO 3 · B2 LAB" : "STEP 3 · B2 LAB") : es ? "PASO 3 · GRAMÁTICA" : "STEP 3 · GRAMMAR"}
            {isRetry ? (es ? " · REPASO" : " · RETRY") : null}
          </p>
          <h1 className="mt-0.5 text-lg font-extrabold leading-tight text-foreground">
            {es ? quiz.title.es : quiz.title.en}
          </h1>
          <div className="mt-2 flex items-center gap-2">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${Math.round((index / steps.length) * 100)}%` }}
              />
            </div>
            <span className="text-[11px] font-extrabold text-muted-foreground">
              {index + 1}/{steps.length}
            </span>
          </div>
        </header>

        {isLab ? (
          <div className="space-y-1 rounded-2xl border border-border bg-muted/40 p-3">
            <div className="flex items-center justify-between gap-2">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-foreground">
                {es ? section.label.es : section.label.en}
                <span className="ml-1.5 font-bold text-muted-foreground">
                  {es
                    ? `sección ${sectionNumber} de ${sectionOrder.length}`
                    : `section ${sectionNumber} of ${sectionOrder.length}`}
                </span>
              </p>
              {remaining !== null ? (
                <span
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[12px] font-extrabold tabular-nums",
                    remaining <= 30 ? "bg-destructive/15 text-destructive" : "bg-background text-foreground",
                  )}
                >
                  <Timer className="size-3.5" aria-hidden="true" />
                  {clock(remaining)}
                </span>
              ) : null}
            </div>
            <p className="text-[12px] font-medium text-muted-foreground">
              {es ? section.instruction.es : section.instruction.en}
            </p>
          </div>
        ) : null}

        {reading ? <ReadingPanel key={section.id} context={reading} es={es} /> : null}
        {listening ? (
          <ListeningPanel
            key={`${section.id}-${isRetry ? "retry" : "first"}`}
            context={listening}
            es={es}
            onFirstEnd={() => setListenDone((prev) => ({ ...prev, [section.id]: true }))}
          />
        ) : null}

        {item ? (
          <div className={cn(waitingForAudio && "pointer-events-none opacity-40")}>
            <ItemView item={item} checked={checked} onAnswer={answer} es={es} isPilot={isPilot} />
          </div>
        ) : null}

        {waitingForAudio ? (
          <p className="text-center text-[12px] font-semibold text-muted-foreground">
            {es ? "Escucha el audio para responder." : "Listen to the audio to answer."}
          </p>
        ) : null}

        {checked && item ? (
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
                {correctAnswerText(item) ? (
                  <p className="mt-1 text-[13px] font-bold text-foreground">{correctAnswerText(item)}</p>
                ) : null}
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
          disabled={(item ? !checked : false) || sending}
          onClick={next}
          className="flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-navy px-4 text-[13px] font-extrabold uppercase tracking-[0.12em] text-navy-foreground disabled:opacity-40"
        >
          {index + 1 < steps.length
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

function clock(seconds: number): string {
  const total = Math.max(0, seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
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
  if (item.kind === "speak") return "";
  return item.answer.join(" ");
}

/** B2 LAB · Texto de lectura, numerado y colapsable para que quepa en móvil. */
function ReadingPanel({
  context,
  es,
}: {
  context: Extract<NonNullable<LabSection["context"]>, { kind: "reading" }>;
  es: boolean;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="space-y-2 rounded-3xl border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[13px] font-extrabold text-foreground">{es ? context.titleEs : context.title}</p>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="rounded-full border border-border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.1em] text-foreground"
        >
          {open ? (es ? "Ocultar texto" : "Hide text") : es ? "Ver texto" : "Show text"}
        </button>
      </div>
      {open ? (
        <div className="space-y-2">
          {context.paragraphs.map((paragraph, i) => (
            <div key={i} className="flex gap-2">
              <span className="w-4 shrink-0 pt-0.5 text-[11px] font-extrabold text-muted-foreground">{i + 1}</span>
              <p className="text-[14px] leading-relaxed text-foreground">{markers(paragraph)}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}

/** Muestra [A]…[D] como cuadritos resaltados, sin quitarlos del texto. */
function markers(text: string) {
  return text.split(/(\[[A-D]\])/g).map((chunk, i) =>
    /^\[[A-D]\]$/.test(chunk) ? (
      <span
        key={i}
        className="mx-0.5 inline-flex items-center rounded-md border border-primary/40 bg-primary/10 px-1 text-[12px] font-extrabold text-primary"
      >
        {chunk}
      </span>
    ) : (
      <span key={i}>{chunk}</span>
    ),
  );
}

/** B2 LAB · Audio de dos voces, en orden, con reproducciones limitadas. */
function ListeningPanel({
  context,
  es,
  onFirstEnd,
}: {
  context: Extract<NonNullable<LabSection["context"]>, { kind: "listening" }>;
  es: boolean;
  onFirstEnd: () => void;
}) {
  const [plays, setPlays] = useState(0);
  const [playing, setPlaying] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);

  const play = () => {
    if (playing || plays >= context.plays) return;
    setPlaying(true);
    setPlays((p) => p + 1);
    let i = 0;
    const speakNext = () => {
      const part = context.parts[i];
      if (!part) {
        setPlaying(false);
        stopRef.current = null;
        onFirstEnd();
        return;
      }
      i += 1;
      stopRef.current = AudioService.speak(part.text, {
        voice: part.voice,
        tone: "neutral",
        onEnd: speakNext,
      });
    };
    speakNext();
  };

  const left = context.plays - plays;
  return (
    <div className="space-y-2 rounded-3xl border border-border bg-card p-4">
      <p className="text-[13px] font-extrabold text-foreground">{es ? context.titleEs : context.title}</p>
      <button
        type="button"
        onClick={play}
        disabled={playing || left <= 0}
        className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-navy px-4 text-[13px] font-extrabold uppercase tracking-[0.12em] text-navy-foreground disabled:opacity-40"
      >
        <Headphones className="size-4" aria-hidden="true" />
        {playing ? (es ? "Reproduciendo…" : "Playing…") : es ? "Reproducir" : "Play"}
      </button>
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {es
          ? `${Math.min(plays, context.plays)} de ${context.plays} reproducciones`
          : `${Math.min(plays, context.plays)} of ${context.plays} plays`}
      </p>
    </div>
  );
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

  if (item.kind === "speak") {
    return <SpeakView key={item.id} item={item} locked={Boolean(checked)} onAnswer={onAnswer} es={es} />;
  }

  return <RearrangeView key={item.id} item={item} locked={Boolean(checked)} correct={checked?.correct ?? false} isPilot={isPilot} onAnswer={onAnswer} es={es} />;
}

/** B2 LAB · Piensa (cuenta regresiva) y luego habla contra el reloj. */
function SpeakView({
  item,
  locked,
  onAnswer,
  es,
}: {
  item: Extract<GrammarItem, { kind: "speak" }>;
  locked: boolean;
  onAnswer: (value: number) => void;
  es: boolean;
}) {
  const [countdown, setCountdown] = useState(item.prepSeconds);

  useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  return (
    <div className="space-y-3 rounded-3xl border border-border bg-card p-4">
      <p className="text-[15px] font-extrabold leading-snug text-foreground">{item.prompt}</p>
      {es ? <p className="text-[12px] font-medium text-muted-foreground">{item.promptEs}</p> : null}
      <ul className="space-y-1 rounded-2xl border border-dashed border-border bg-background p-3">
        {item.template.map((line) => (
          <li key={line} className="text-[13px] font-semibold text-muted-foreground">
            · {line}
          </li>
        ))}
      </ul>
      {countdown > 0 ? (
        <div className="rounded-2xl bg-navy p-4 text-center text-navy-foreground">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
            {es ? "Piensa" : "Think"}
          </p>
          <p className="mt-1 text-5xl font-extrabold tabular-nums">{countdown}</p>
        </div>
      ) : locked ? (
        <p className="text-center text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {es ? "Grabación lista" : "Recording saved"}
        </p>
      ) : (
        <VoiceRecorder
          label={es ? "GRABAR MI RESPUESTA" : "RECORD MY ANSWER"}
          stopLabel={es ? "LISTO" : "DONE"}
          maxSeconds={item.speakSeconds}
          targetSeconds={[item.minSeconds, item.speakSeconds]}
          onComplete={(recording) => onAnswer(Math.round(recording.durationSeconds))}
        />
      )}
    </div>
  );
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
