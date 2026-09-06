import { Check, Loader2 } from "lucide-react";
import type { FinalAudioCoachFeedback, FinalCoachState } from "@/lib/final-audio-coach";

type Props = {
  state: FinalCoachState;
  showEs: boolean;
  /** Advances the UI only (the day was committed BEFORE this review rendered). */
  onContinue: () => void;
};

export type CoachReviewSections = {
  title: string;
  strength: string;
  /** Present only when the backend returned a transcript-grounded correction. */
  correction: { said: string; better: string; why: string; practice: string } | null;
  /** Shown instead of the correction block when nothing needs fixing. */
  nextStep: string | null;
};

/** Pure mapping feedback → learner-facing sections. Language switch is a local read: 0 AI calls. */
export function coachReviewSections(feedback: FinalAudioCoachFeedback, showEs: boolean): CoachReviewSections {
  const title = showEs ? "COACH DE IA ✨" : "AI COACH ✨";
  const strength = showEs ? feedback.strengthEs : feedback.strengthEn;
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
      nextStep: null,
    };
  }
  return { title, strength, correction: null, nextStep: showEs ? feedback.nextStepEs : feedback.nextStepEn };
}

/**
 * STEP 5 · AI Coach Review — shown INSIDE Step 5 right after the learner
 * confirms the Final Audio and before Day Complete. The day is already saved
 * when this renders; CONTINUE only advances the screen.
 */
export function FinalCoachReview({ state, showEs, onContinue }: Props) {
  const title = showEs ? "COACH DE IA ✨" : "AI COACH ✨";

  if (state.status === "idle" || state.status === "preparing" || state.status === "analyzing") {
    return (
      <Shell testId="final-coach-loading">
        <div className="flex min-h-[260px] flex-col items-center justify-center gap-4 text-center" aria-live="polite" aria-busy="true">
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

  if (state.status === "unclear") {
    return (
      <Shell testId="final-coach-unclear">
        <Title>{showEs ? "COACH DE IA" : "AI COACH"}</Title>
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
  return (
    <Shell testId="final-coach-ready">
      <Title>{s.title}</Title>

      <Section label={`💪 ${showEs ? "PUNTO FUERTE" : "STRONG POINT"}`}>
        <p className="text-[16px] font-semibold leading-snug">{s.strength}</p>
      </Section>

      {s.correction ? (
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
      ) : (
        <Section label={`🎯 ${showEs ? "SIGUIENTE RETO" : "NEXT CHALLENGE"}`} testId="final-coach-next-step">
          <p className="text-[16px] font-semibold leading-snug">{s.nextStep}</p>
        </Section>
      )}

      <ContinueButton showEs={showEs} onClick={onContinue} />
    </Shell>
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

function Quote({ label, text, tone }: { label: string; text: string; tone: "muted" | "primary" }) {
  return (
    <div>
      <SubLabel>{label}</SubLabel>
      <p
        className={
          tone === "primary"
            ? "mt-1 rounded-2xl bg-primary/10 px-3 py-2 text-[16px] font-extrabold leading-snug text-primary"
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
