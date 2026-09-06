import { Loader2 } from "lucide-react";
import type { FinalAudioCoachFeedback, FinalCoachState } from "@/lib/final-audio-coach";
import { cn } from "@/lib/utils";

type Props = { state: FinalCoachState; showEs: boolean };

/** Static bilingual labels for the three status rows — no scores, no red X. */
export function coachStatusLabels(feedback: FinalAudioCoachFeedback, showEs: boolean) {
  const rating = (value: "good" | "developing", feminine: boolean) =>
    value === "good"
      ? { text: showEs ? (feminine ? "Bien encaminada ✓" : "Bien encaminado ✓") : "On track ✓", good: true }
      : { text: showEs ? "En desarrollo" : "Developing", good: false };
  return {
    task: feedback.taskCompleted
      ? { text: showEs ? "Completada ✓" : "Completed ✓", good: true }
      : { text: showEs ? "Sigue desarrollándola" : "Keep developing", good: false },
    targetLanguage: rating(feedback.targetLanguage, false),
    organization: rating(feedback.organization, true),
  };
}

/** Compact AI Coach card for Day Complete. Silent: no sounds, nothing blocking. */
export function FinalCoachCard({ state, showEs }: Props) {
  if (state.status === "idle") return null;
  const title = showEs ? "COACH DE IA" : "AI COACH";

  if (state.status === "preparing" || state.status === "analyzing") {
    return (
      <Shell title={title} testId="final-coach-loading">
        <p className="flex items-center gap-2 text-[15px] font-semibold text-muted-foreground" aria-live="polite">
          <Loader2 className="size-4 animate-spin text-primary" aria-hidden />
          {showEs ? "Analizando tu Audio Final…" : "Analyzing your Final Audio…"}
        </p>
      </Shell>
    );
  }

  if (state.status === "unclear") {
    return (
      <Shell title={title} testId="final-coach-unclear">
        <p className="text-[15px] font-semibold text-foreground">
          {showEs
            ? "No pude escuchar con suficiente claridad para darte feedback útil hoy."
            : "I couldn't hear enough clearly to give useful feedback today."}
        </p>
      </Shell>
    );
  }

  if (state.status === "unavailable") {
    return (
      <Shell title={title} testId="final-coach-unavailable">
        <p className="text-[15px] font-semibold text-muted-foreground">
          {showEs
            ? "El feedback del coach no está disponible en este momento. Tu día ya quedó completado."
            : "Coach feedback isn't available right now. Your day is already complete."}
        </p>
      </Shell>
    );
  }

  const { feedback } = state;
  const labels = coachStatusLabels(feedback, showEs);
  return (
    <Shell title={title} testId="final-coach-ready">
      <div className="space-y-1.5">
        <StatusRow label={showEs ? "TAREA" : "TASK"} {...labels.task} />
        <StatusRow label={showEs ? "INGLÉS OBJETIVO" : "TARGET ENGLISH"} {...labels.targetLanguage} />
        <StatusRow label={showEs ? "ORGANIZACIÓN" : "ORGANIZATION"} {...labels.organization} />
      </div>
      <div className="space-y-3 border-t border-border pt-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            💪 {showEs ? "PUNTO FUERTE" : "STRONG POINT"}
          </p>
          <p className="mt-1 text-[15px] font-semibold leading-snug">{showEs ? feedback.strengthEs : feedback.strengthEn}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            🎯 {showEs ? "SIGUIENTE PASO" : "NEXT STEP"}
          </p>
          <p className="mt-1 text-[15px] font-semibold leading-snug">{showEs ? feedback.nextStepEs : feedback.nextStepEn}</p>
        </div>
      </div>
    </Shell>
  );
}

function Shell({ title, testId, children }: { title: string; testId: string; children: React.ReactNode }) {
  return (
    <div data-testid={testId} className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{title}</p>
      {children}
    </div>
  );
}

function StatusRow({ label, text, good }: { label: string; text: string; good: boolean }) {
  return (
    <div className="flex items-center justify-between gap-3 text-[13px] font-semibold">
      <span className="font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <span className={cn("rounded-full px-2.5 py-0.5", good ? "bg-primary/10 text-primary" : "bg-muted text-foreground")}>
        {text}
      </span>
    </div>
  );
}
