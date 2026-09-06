import { useState } from "react";
import { Check, ChevronDown, Loader2, RotateCcw } from "lucide-react";
import type {
  CoachCorrectionCategory,
  FinalAudioCoachFeedback,
  FinalCoachRetakeState,
  FinalCoachState,
} from "@/lib/final-audio-coach";
import { objectiveResult, objectiveResultText, type ObjectiveResultInput } from "@/lib/final-coach-result";
import type { Recording } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { VoiceRecorder } from "./VoiceRecorder";

/** Optional ONE retake (pilot only). Absent → no retake UI at all. */
export type RetakePanelProps = {
  state: FinalCoachRetakeState;
  /** Before/after objective metrics (local data; ideas may be null while pending/failed). */
  before: { seconds: number; ideas: number | null };
  after: { seconds: number; ideas: number | null } | null;
  /** Hard recording cap for the full answer (same as the day's Step 5 cap). */
  maxSeconds: number;
  targetSeconds: [number, number];
  onStart: () => void;
  onRecorded: (recording: Recording) => void;
  /** Re-sends the SAME in-memory retake blob after a technical failure. Never records again. */
  onRetry?: (() => void) | undefined;
};

type Props = {
  state: FinalCoachState;
  showEs: boolean;
  /**
   * Objective speaking result (NOT AI-generated): computed locally from the
   * live Final Recording + authored goals. May update when the async idea count
   * resolves — that is a plain re-render, never another Coach call.
   */
  result?: ObjectiveResultInput | null;
  /** Advances the UI only (the day was committed BEFORE this review rendered). */
  onContinue: () => void;
  retake?: RetakePanelProps | null;
};

export type CoachReviewSections = {
  title: string;
  strength: string;
  /** Present only when the backend returned a transcript-grounded correction. */
  correction: { said: string; better: string; why: string; practice: string } | null;
  /** ALWAYS present: the learner gets one development step even when a correction exists. */
  nextStep: string;
};

/** Pure mapping feedback → learner-facing sections. Language switch is a local read: 0 AI calls. */
export function coachReviewSections(feedback: FinalAudioCoachFeedback, showEs: boolean): CoachReviewSections {
  const title = showEs ? "COACH DE IA ✨" : "AI COACH ✨";
  const strength = showEs ? feedback.strengthEs : feedback.strengthEn;
  const nextStep = showEs ? feedback.nextStepEs : feedback.nextStepEn;
  const hasCorrection =
    feedback.correctionNeeded &&
    Boolean(feedback.said && feedback.betterVersion && feedback.practicePhrase && (showEs ? feedback.whyEs : feedback.whyEn));
  if (hasCorrection) {
    return {
      title,
      strength,
      correction: {
        said: feedback.said!,
        better: feedback.betterVersion!,
        why: (showEs ? feedback.whyEs : feedback.whyEn)!,
        practice: feedback.practicePhrase!,
      },
      nextStep,
    };
  }
  return { title, strength, correction: null, nextStep };
}

/** Objective result block: how much the learner produced and whether the authored goal was met. */
function ObjectiveResultBlock({ input, showEs }: { input: ObjectiveResultInput; showEs: boolean }) {
  const t = objectiveResultText(objectiveResult(input), showEs);
  const ideas = (
    <div data-testid="final-coach-result-ideas">
      <p className="text-[17px] font-extrabold leading-snug">{t.ideasPrimary}</p>
      {t.ideasSecondary ? <p className="mt-0.5 text-[13px] font-bold text-muted-foreground">{t.ideasSecondary}</p> : null}
    </div>
  );
  const time = (
    <div data-testid="final-coach-result-time">
      <p className="text-[17px] font-extrabold leading-snug">{t.timePrimary}</p>
      {t.timeGoal || t.timeStatus ? (
        <p className="mt-0.5 text-[13px] font-bold text-muted-foreground">{[t.timeGoal, t.timeStatus].filter(Boolean).join(" · ")}</p>
      ) : null}
    </div>
  );
  return (
    <Section label={t.heading} testId="final-coach-result">
      <div className="space-y-3 rounded-2xl bg-muted/60 px-4 py-3" aria-live="polite">
        {t.timeFirst ? (
          <>
            {time}
            {ideas}
          </>
        ) : (
          <>
            {ideas}
            {time}
          </>
        )}
      </div>
    </Section>
  );
}

/** Basic 3 Day 1 only: same local calculations, condensed into two scan-friendly rows. */
function PilotObjectiveResultBlock({ input, showEs }: { input: ObjectiveResultInput; showEs: boolean }) {
  const result = objectiveResult(input);
  const { ideas, time } = result;
  const ideasLine =
    ideas.kind === "pending"
      ? showEs ? "CONTANDO TUS IDEAS…" : "COUNTING YOUR IDEAS…"
      : ideas.kind === "failed"
        ? showEs ? "IDEAS · NO DISPONIBLE" : "IDEAS · UNAVAILABLE"
        : [
            ideas.goal === null ? `${ideas.count} ${showEs ? "IDEAS" : "IDEAS"}` : `${ideas.count} / ${ideas.goal} ${showEs ? "IDEAS" : "IDEAS"}`,
            ideas.exceeded ? showEs ? "META SUPERADA ✓" : "GOAL EXCEEDED ✓" : ideas.met ? showEs ? "META LOGRADA ✓" : "GOAL REACHED ✓" : null,
          ].filter(Boolean).join(" · ");
  const range = time.goal ? (time.goal.max === null ? `${time.goal.min}s+` : `${time.goal.min}–${time.goal.max}s`) : null;
  const timeAction = time.goal
    ? time.met
      ? showEs ? "TIEMPO LOGRADO ✓" : "TIME REACHED ✓"
      : showEs ? `HABLA ${time.missing}s MÁS` : `SPEAK ${time.missing}s MORE`
    : null;

  return (
    <Section label={showEs ? "TU RESULTADO" : "YOUR RESULT"} testId="final-coach-result">
      <div className="space-y-1" aria-live="polite">
        <p data-testid="final-coach-result-ideas" className="text-[16px] font-extrabold leading-snug">{ideasLine}</p>
        <p data-testid="final-coach-result-time" className="text-[15px] font-bold leading-snug text-muted-foreground">
          {[`${time.seconds}s`, range, timeAction].filter(Boolean).join(" · ")}
        </p>
      </div>
    </Section>
  );
}

/**
 * STEP 5 · AI Coach Review — shown INSIDE Step 5 right after the learner
 * confirms the Final Audio and before Day Complete. The day is already saved
 * when this renders; CONTINUE only advances the screen.
 */
export function FinalCoachReview({ state, showEs, result, onContinue, retake }: Props) {
  const title = showEs ? "COACH DE IA ✨" : "AI COACH ✨";

  if (state.status === "idle" || state.status === "preparing" || state.status === "analyzing") {
    return (
      <Shell testId="final-coach-loading">
        {result ? <ObjectiveResultBlock input={result} showEs={showEs} /> : null}
        <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 text-center" aria-live="polite" aria-busy="true">
          <Loader2 className="size-9 animate-spin text-primary" aria-hidden />
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
          <p className="text-[17px] font-extrabold leading-snug">
            {showEs ? "Analizando tu Audio Final…" : "Analyzing your Final Audio…"}
          </p>
          <p className="text-[13px] font-semibold text-muted-foreground">
            {showEs ? "Tu práctica de hoy ya quedó guardada." : "Today's practice is already saved."}
          </p>
        </div>
      </Shell>
    );
  }

  // The objective result is LOCAL data (ideas + seconds): it must survive an AI failure.
  if (state.status === "unclear") {
    return (
      <Shell testId="final-coach-unclear">
        <Title>{showEs ? "COACH DE IA" : "AI COACH"}</Title>
        {result ? <ObjectiveResultBlock input={result} showEs={showEs} /> : null}
        <p className="text-[16px] font-semibold leading-snug text-foreground">
          {showEs
            ? "No pude escuchar con suficiente claridad para darte una corrección útil hoy."
            : "I couldn't hear clearly enough to give you a useful correction today."}
        </p>
        <p className="text-[14px] font-semibold text-muted-foreground">
          {showEs ? "Tu práctica sí quedó completada." : "Your practice is still complete."}
        </p>
        <ContinueButton showEs={showEs} onClick={onContinue} />
      </Shell>
    );
  }

  if (state.status === "unavailable") {
    return (
      <Shell testId="final-coach-unavailable">
        <Title>{showEs ? "COACH DE IA" : "AI COACH"}</Title>
        {result ? <ObjectiveResultBlock input={result} showEs={showEs} /> : null}
        <p className="text-[16px] font-semibold leading-snug text-foreground">
          {showEs
            ? "Tu práctica quedó guardada, pero el feedback no está disponible en este momento."
            : "Your practice is saved, but feedback isn't available right now."}
        </p>
        <ContinueButton showEs={showEs} onClick={onContinue} />
      </Shell>
    );
  }

  const s = coachReviewSections(state.feedback, showEs);
  const corrections = state.feedback.corrections ?? [];
  const pilot = corrections.length > 0 || state.transcript !== undefined || state.feedback.answeredTask !== undefined;
  const objective = result ? objectiveResult(result) : null;
  // Enough separate ideas but far below the time goal = ideas too short → DEVELOP MORE, never "goal achieved".
  const underdeveloped = pilot && objective !== null && underdevelopedResult(objective);
  const nextStepLabel = underdeveloped
    ? showEs ? "🎯 DESARROLLA MÁS" : "🎯 DEVELOP MORE"
    : objective
      ? objectiveResultText(objective, showEs).nextStepLabel
      : showEs ? "🚀 SIGUIENTE RETO" : "🚀 NEXT CHALLENGE";

  // Retake result replaces the review body: BEFORE vs NOW + grounded "applied" claims. No second retake.
  if (retake && retake.state.status === "ready") {
    return <RetakeResultScreen retake={retake} showEs={showEs} onContinue={onContinue} />;
  }
  if (retake && (retake.state.status === "recording" || retake.state.status === "analyzing" || retake.state.status === "unclear" || retake.state.status === "retryable" || retake.state.status === "unavailable")) {
    return <RetakeRoundScreen retake={retake} showEs={showEs} onContinue={onContinue} />;
  }

  return (
    <Shell testId="final-coach-ready">
      <Title>{s.title}</Title>

      {result ? pilot ? <PilotObjectiveResultBlock input={result} showEs={showEs} /> : <ObjectiveResultBlock input={result} showEs={showEs} /> : null}

      <Section label={`💪 ${showEs ? "PUNTO FUERTE" : "STRONG POINT"}`}>
        <p className="text-[16px] font-semibold leading-snug">{s.strength}</p>
      </Section>

      {pilot ? (
        <>
          {/* Pilot: up to 3 prioritized teaching points before the optional transient transcript. */}
          {corrections.length > 0 ? (
            <Section
              label={`🎯 ${showEs ? "CORRECCIONES CLAVE" : "KEY CORRECTIONS"} · ${corrections.length}`}
              testId="final-coach-corrections"
            >
              <ol className="space-y-3">
                {corrections.map((c, i) => <CompactCorrection key={`${i}-${c.said}`} correction={c} index={i} showEs={showEs} />)}
              </ol>
            </Section>
          ) : null}
          {state.transcript ? <TranscriptBlock transcript={state.transcript} showEs={showEs} /> : null}
          {state.feedback.fluencyUpgrade && !fluencyUpgradeDuplicatesCorrections(state.feedback.fluencyUpgrade, corrections) ? (
            <Section label={`🚀 ${showEs ? "MÁS FLUIDO" : "MORE FLUENT"}`} testId="final-coach-fluency-upgrade">
              <div className="space-y-1.5">
                <CompactPhrase icon="❌" text={state.feedback.fluencyUpgrade.original} />
                <CompactPhrase icon="✅" text={state.feedback.fluencyUpgrade.improved} emphasized />
              </div>
            </Section>
          ) : null}
        </>
      ) : s.correction ? (
        <>
          <Divider />
          <Section label={`🎯 ${showEs ? "CORRIGE ESTO" : "FIX THIS"}`} testId="final-coach-correction">
            <div className="space-y-3">
              <Quote label={showEs ? "DIJISTE" : "YOU SAID"} text={s.correction.said} tone="muted" />
              <Quote label={showEs ? "MEJOR" : "BETTER"} text={s.correction.better} tone="primary" />
              <div>
                <SubLabel>{showEs ? "¿POR QUÉ?" : "WHY?"}</SubLabel>
                <p className="mt-1 text-[15px] font-semibold leading-snug">{s.correction.why}</p>
              </div>
            </div>
          </Section>
          <Divider />
          <Section label={`🔁 ${showEs ? "PRACTICA" : "PRACTICE"}`}>
            <p className="text-[17px] font-extrabold leading-snug text-primary">“{s.correction.practice}”</p>
          </Section>
        </>
      ) : null}

      {pilot ? null : <Divider />}
      {/* Always shown: one development step, from the SAME response (no extra call). */}
      <Section label={nextStepLabel} testId="final-coach-next-step">
        <p className="text-[16px] font-semibold leading-snug">{s.nextStep}</p>
      </Section>

      {retake && retake.state.status === "idle" ? (
        <Button
          variant="outline"
          data-testid="final-coach-retake-start"
          onClick={retake.onStart}
          className="h-auto min-h-[52px] w-full flex-col rounded-2xl border-2 border-primary bg-card px-5 py-2 text-primary active:scale-[0.98]"
        >
          <span className="flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.16em]">
            <RotateCcw className="size-4" aria-hidden /> {showEs ? "INTÉNTALO OTRA VEZ" : "TRY AGAIN"}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {showEs ? "APLICA EL FEEDBACK · OPCIONAL" : "APPLY THE FEEDBACK · OPTIONAL"}
          </span>
        </Button>
      ) : null}
      <ContinueButton showEs={showEs} onClick={onContinue} />
    </Shell>
  );
}

/** Idea goal reached but speaking time clearly under the goal: the ideas were not developed. */
export function underdevelopedResult(r: ReturnType<typeof objectiveResult>): boolean {
  return r.mode === "goal" && r.ideas.kind === "count" && r.ideas.met && r.time.goal !== null && !r.time.met;
}

/** Local label map — the LLM never translates categories. */
export function correctionCategoryLabel(category: CoachCorrectionCategory, showEs: boolean): string {
  const es: Record<CoachCorrectionCategory, string> = {
    task_relevance: "⚠️ RESPONDE LA PREGUNTA",
    verb_tense: "PASADO",
    grammar: "GRAMÁTICA",
    word_choice: "VOCABULARIO",
    naturalness: "MÁS NATURAL",
    connector: "CONEXIÓN",
    repetition: "VARÍA TU INGLÉS",
    development: "DESARROLLO",
  };
  const en: Record<CoachCorrectionCategory, string> = {
    task_relevance: "⚠️ ANSWER THE QUESTION",
    verb_tense: "PAST TENSE",
    grammar: "GRAMMAR",
    word_choice: "WORD CHOICE",
    naturalness: "NATURAL ENGLISH",
    connector: "CONNECTION",
    repetition: "ADD VARIETY",
    development: "DEVELOPMENT",
  };
  return (showEs ? es : en)[category];
}

/** Quote labels per category: relevance → "START LIKE THIS", repetition → "YOU REPEATED / MORE FLUENT". */
export function correctionQuoteLabels(category: CoachCorrectionCategory, showEs: boolean): { said: string; better: string } {
  if (category === "task_relevance") {
    return showEs ? { said: "DIJISTE", better: "EMPIEZA ASÍ" } : { said: "YOU SAID", better: "START LIKE THIS" };
  }
  if (category === "repetition") {
    return showEs ? { said: "REPETISTE", better: "MÁS FLUIDO" } : { said: "YOU REPEATED", better: "MORE FLUENT" };
  }
  return showEs ? { said: "DIJISTE", better: "MEJOR" } : { said: "YOU SAID", better: "BETTER" };
}

/* ------------------------------------------------------------------------ */
/*  Optional retake (pilot)                                                  */
/* ------------------------------------------------------------------------ */

function metricLine(m: { seconds: number; ideas: number | null }, showEs: boolean): string {
  const ideas = m.ideas === null ? null : `${m.ideas} ${m.ideas === 1 ? "idea" : "ideas"}`;
  return [`${m.seconds}s`, ideas].filter(Boolean).join(" · ");
}

function RetakeRoundScreen({ retake, showEs, onContinue }: { retake: RetakePanelProps; showEs: boolean; onContinue: () => void }) {
  const st = retake.state.status;
  return (
    <Shell testId={`final-coach-retake-${st}`}>
      <Title>{showEs ? "RONDA EXTRA · APLICA EL FEEDBACK" : "BONUS ROUND · APPLY THE FEEDBACK"}</Title>
      {st === "recording" ? (
        <>
          <p className="text-center text-[17px] font-extrabold leading-snug">
            {showEs ? "Responde la pregunta completa otra vez." : "Answer the whole question again."}
          </p>
          <p className="text-center text-[14px] font-semibold text-muted-foreground">
            {showEs
              ? "Usa lo que acabas de aprender: pasado, variedad y más detalle. Solo una vez."
              : "Use what you just learned: past tense, variety and more detail. One time only."}
          </p>
          <VoiceRecorder
            label={showEs ? "GRABAR" : "RECORD"}
            size="lg"
            targetSeconds={retake.targetSeconds}
            maxSeconds={retake.maxSeconds}
            onComplete={retake.onRecorded}
          />
        </>
      ) : null}
      {st === "analyzing" ? (
        <div className="flex min-h-[160px] flex-col items-center justify-center gap-4 text-center" aria-live="polite" aria-busy="true">
          <Loader2 className="size-9 animate-spin text-primary" aria-hidden />
          <p className="text-[17px] font-extrabold leading-snug">
            {showEs ? "Comparando con tu primera respuesta…" : "Comparing with your first answer…"}
          </p>
        </div>
      ) : null}
      {st === "retryable" ? (
        <>
          <p className="text-[16px] font-extrabold leading-snug">{showEs ? "NO PUDIMOS ANALIZARLO TODAVÍA" : "WE COULDN'T ANALYZE IT YET"}</p>
          <p className="text-[14px] font-semibold text-muted-foreground">
            {showEs
              ? "Tu grabación está lista. Puedes intentar analizar la misma respuesta otra vez."
              : "Your recording is ready. You can try analyzing the same answer again."}
          </p>
          {retake.onRetry ? (
            <button
              type="button"
              data-testid="final-coach-retake-retry"
              onClick={retake.onRetry}
              className="flex min-h-[52px] w-full items-center justify-center rounded-2xl border-2 border-primary bg-background px-5 text-[13px] font-extrabold uppercase tracking-[0.16em] text-primary transition-transform active:scale-[0.98]"
            >
              {showEs ? "REINTENTAR COMPARACIÓN" : "RETRY COMPARISON"}
            </button>
          ) : null}
          <ContinueButton showEs={showEs} onClick={onContinue} />
        </>
      ) : null}
      {st === "unclear" || st === "unavailable" ? (
        <>
          <p className="text-[16px] font-semibold leading-snug">
            {st === "unclear"
              ? showEs
                ? "No pude escuchar tu segunda respuesta con claridad."
                : "I couldn't hear your second answer clearly."
              : showEs
                ? "La comparación no está disponible en este momento."
                : "The comparison isn't available right now."}
          </p>
          <p className="text-[14px] font-semibold text-muted-foreground">
            {showEs ? "Tu día ya está completo. ¡Buen trabajo por intentarlo otra vez!" : "Your day is already complete. Nice work trying again!"}
          </p>
          <ContinueButton showEs={showEs} onClick={onContinue} />
        </>
      ) : null}
    </Shell>
  );
}

function RetakeResultScreen({ retake, showEs, onContinue }: { retake: RetakePanelProps; showEs: boolean; onContinue: () => void }) {
  if (retake.state.status !== "ready") return null;
  const r = retake.state.result;
  const applied = r.applied.filter((a) => a.applied);
  const remaining = r.applied.filter((a) => !a.applied);
  const after = retake.after;
  const improved =
    after !== null &&
    (after.seconds > retake.before.seconds || (after.ideas !== null && retake.before.ideas !== null && after.ideas > retake.before.ideas) || applied.length > 0);
  return (
    <Shell testId="final-coach-retake-ready">
      <Title>{showEs ? "COACH DE IA ✨" : "AI COACH ✨"}</Title>
      <p className="text-center text-[22px] font-extrabold leading-tight">
        {improved ? (showEs ? "MEJORASTE 🎉" : "YOU IMPROVED 🎉") : showEs ? "SEGUNDA RONDA LISTA" : "SECOND ROUND DONE"}
      </p>
      <div className="grid grid-cols-2 gap-3 rounded-2xl bg-muted/60 px-4 py-3" data-testid="final-coach-retake-metrics">
        <div>
          <SubLabel>{showEs ? "ANTES" : "BEFORE"}</SubLabel>
          <p className="text-[17px] font-extrabold leading-snug">{metricLine(retake.before, showEs)}</p>
        </div>
        <div>
          <SubLabel>{showEs ? "AHORA" : "NOW"}</SubLabel>
          <p className="text-[17px] font-extrabold leading-snug text-primary">{after ? metricLine(after, showEs) : "—"}</p>
        </div>
      </div>

      {applied.length > 0 ? (
        <>
          <Divider />
          <Section label={`✅ ${showEs ? "APLICASTE ESTO" : "YOU APPLIED THIS"}`} testId="final-coach-retake-applied">
            <ul className="space-y-2">
              {applied.map((a) => (
                <li key={a.skill} className="text-[15px] font-semibold leading-snug">
                  {showEs ? a.messageEs : a.messageEn}
                </li>
              ))}
            </ul>
          </Section>
        </>
      ) : null}

      <Divider />
      <Section label={`✅ ${showEs ? "MEJORASTE TU FLUIDEZ" : "YOUR FLUENCY"}`} testId="final-coach-retake-improvement">
        <p className="text-[15px] font-semibold leading-snug">{showEs ? r.improvementEs : r.improvementEn}</p>
      </Section>

      <Divider />
      <Section label={`🎯 ${showEs ? "SIGUE PRACTICANDO" : "KEEP PRACTICING"}`} testId="final-coach-retake-next">
        <ul className="space-y-2">
          {remaining.map((a) => (
            <li key={a.skill} className="text-[15px] font-semibold leading-snug">
              {showEs ? a.messageEs : a.messageEn}
            </li>
          ))}
          <li className="text-[15px] font-semibold leading-snug">{showEs ? r.nextEs : r.nextEn}</li>
        </ul>
      </Section>

      <ContinueButton showEs={showEs} onClick={onContinue} />
    </Shell>
  );
}

/** Collapsed by default; opening it is a local toggle (0 AI calls). Plain readable text, nothing struck through. */
function TranscriptBlock({ transcript, showEs }: { transcript: string; showEs: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <Section label={`🎙️ ${showEs ? "TODO LO QUE DIJISTE" : "EVERYTHING YOU SAID"}`} testId="final-coach-transcript">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] w-full items-center justify-between rounded-2xl bg-muted px-4 text-left text-[12px] font-extrabold uppercase tracking-[0.14em] text-foreground"
      >
        <span>
          {open
            ? showEs ? "OCULTAR" : "HIDE"
            : showEs ? "VER TODO LO QUE DIJISTE" : "SHOW EVERYTHING YOU SAID"}
        </span>
        <ChevronDown className={`size-5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open ? (
        <div className="mt-2 space-y-2">
          <p data-testid="final-coach-transcript-text" className="whitespace-pre-wrap text-[15px] font-medium leading-relaxed text-foreground">
            {transcript}
          </p>
          <p className="text-[12px] font-semibold text-muted-foreground">
            {showEs ? "Transcripción automática de tu audio." : "Automatic transcript of your audio."}
          </p>
        </div>
      ) : null}
    </Section>
  );
}

function Shell({ testId, children }: { testId: string; children: React.ReactNode }) {
  return (
    <div data-testid={testId} className="space-y-4 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      {children}
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{children}</p>;
}

function SubLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{children}</p>;
}

function Section({ label, testId, children }: { label: string; testId?: string; children: React.ReactNode }) {
  return (
    <div data-testid={testId}>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}

/** "plain" = quoted without strike-through (a pattern or an off-topic phrase is not a wrong word). */
function Quote({ label, text, tone }: { label: string; text: string; tone: "muted" | "primary" | "plain" }) {
  return (
    <div>
      <SubLabel>{label}</SubLabel>
      <p
        className={
          tone === "primary"
            ? "mt-1 rounded-2xl bg-primary/10 px-3 py-2 text-[16px] font-extrabold leading-snug text-primary"
            : tone === "plain"
              ? "mt-1 rounded-2xl bg-muted px-3 py-2 text-[16px] font-semibold leading-snug text-foreground"
              : "mt-1 rounded-2xl bg-muted px-3 py-2 text-[16px] font-semibold leading-snug text-foreground line-through decoration-muted-foreground/60"
        }
      >
        “{text}”
      </p>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-border" />;
}

function ContinueButton({ showEs, onClick }: { showEs: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      data-testid="final-coach-continue"
      onClick={onClick}
      className="flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-[13px] font-extrabold uppercase tracking-[0.16em] text-primary-foreground shadow-[var(--shadow-card)] transition-transform active:scale-[0.98]"
    >
      {showEs ? "CONTINUAR" : "CONTINUE"} <Check className="size-5" />
    </button>
  );
}
