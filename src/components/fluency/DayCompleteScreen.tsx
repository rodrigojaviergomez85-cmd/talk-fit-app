import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, ChevronDown, Flame } from "lucide-react";
import { RecordingPlayback } from "./RecordingPlayback";
import { JourneyService } from "@/services/journey-service";
import { CourseService } from "@/services/course-service";
import type { CourseDay, ModuleId, Recording, SelfAssessment } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SaveProgressPrompt } from "./SaveProgressPrompt";
import { WeekMoment } from "./WeekMoment";
import { ModuleMoment } from "./ModuleMoment";
import { NextUp } from "./NextUp";
import { HabitMilestone } from "./HabitMilestone";
import { moduleComparison, weekComparison } from "@/lib/progress-moments";
import { habitDays, milestonesCrossed, wasOnBreak, type HabitMilestoneDef } from "@/lib/habit";
import { AchievementsService } from "@/services/achievements-service";

export type RepSummary = { total: number; attempted: number; skipped: number };

/** "local" = guest/offline: saved on this device only, nothing to upload. */
export type FinalRepSaveState = "idle" | "saving" | "saved" | "failed" | "local";

type Props = {
  moduleId: ModuleId;
  day: CourseDay;
  finalRecording: Recording | null;
  firstRecording: Recording | null;
  showEs: boolean;
  summary?: { rep2: RepSummary; rep4: RepSummary };
  saveState?: FinalRepSaveState;
  /** Habit snapshot captured before this completion (for milestone + welcome-back detection). */
  habitBefore?: { days: number; lastCompletedDate?: string } | null;
  onRetrySave?: () => void;
};

const ASSESSMENTS: { value: SelfAssessment; en: string; es: string }[] = [
  { value: "not-yet", en: "Not yet", es: "Todavía no" },
  { value: "a-little", en: "A little", es: "Un poco" },
  { value: "definitely", en: "Definitely", es: "Definitivamente" },
];

/** Compact celebration + objective numbers after the final step of the day. */
export function DayCompleteScreen({
  moduleId,
  day,
  finalRecording,
  firstRecording,
  showEs,
  summary,
  saveState = "idle",
  habitBefore = null,
  onRetrySave,
}: Props) {
  const navigate = useNavigate();
  const [state, setState] = useState(() => JourneyService.load());
  const [answer, setAnswer] = useState<SelfAssessment | null>(state.selfAssessment ?? null);
  const [milestones, setMilestones] = useState<HabitMilestoneDef[]>([]);

  useEffect(() => setState(JourneyService.load()), []);

  const totalDays = CourseService.totalDays(moduleId);
  const module = CourseService.getModule(moduleId);
  // Partially built module (e.g. ADVANCED 1 with only Week 1): the last built day
  // is a week finish, never a module completion.
  const partialModule = (module.builtWeeks ?? 4) < 4;
  const isLastDay = day.day === totalDays && !partialModule;
  const seconds = Math.round(finalRecording?.durationSeconds ?? 0);
  const firstSeconds = Math.round(firstRecording?.durationSeconds ?? 0);

  const week = day.week;
  const weekJustDone = Boolean(week && JourneyService.weekComplete(state, moduleId, week));
  const moduleDone = !partialModule && JourneyService.moduleComplete(state, moduleId);
  const weekCmp = weekJustDone && week ? weekComparison(state, moduleId, week) : null;
  const moduleCmp = moduleDone ? moduleComparison(state, moduleId) : null;
  const partialWeekDone = partialModule && day.day === totalDays;

  const habitNow = habitDays(state);
  const habitWasBefore = habitBefore?.days ?? habitNow;
  const habitGrew = habitNow > habitWasBefore;
  const welcomeBack = habitGrew && wasOnBreak(habitBefore?.lastCompletedDate, habitWasBefore);

  // Progress of the module that was just summarized, even if it unlocked another one.
  const doneDays = JourneyService.completedCount(state, moduleId);
  const streak = state.streakDays;

  // Milestones crossed by THIS completion, claimed once in the backend so a
  // repeated day or a reload never re-celebrates them.
  useEffect(() => {
    if (!habitBefore || !habitGrew) return;
    const crossed = milestonesCrossed(habitBefore.days, habitNow);
    if (crossed.length === 0) return;
    let alive = true;
    void AchievementsService.claimCelebration(crossed.map((m) => m.id))
      .then((fresh) => {
        if (!alive) return;
        setMilestones(crossed.filter((m) => fresh.includes(m.id)));
      })
      .catch(() => undefined);
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [habitBefore?.days, habitNow]);

  // Silent backfill for everything else (skill badges, module badges).
  useEffect(() => {
    void AchievementsService.sync(state).catch(() => undefined);
  }, [state]);

  const bigCelebration = (weekJustDone && weekCmp) || (moduleDone && moduleCmp);
  const hasComparison = Boolean(finalRecording);

  return (
    <div className="min-h-screen bg-background px-4 pb-[calc(6.5rem+env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
      <div className="mx-auto w-full max-w-lg space-y-3.5">
        {/* A. Compact celebration */}
        <div className="text-center">
          <div className="mx-auto flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground animate-pop-check motion-reduce:animate-none">
            <Check className="size-5" />
          </div>
          <h1 className="mt-2.5 text-[26px] font-extrabold tracking-tight">
            {showEs ? "¡Buen trabajo, Champion!" : "Nice work, Champion!"}
          </h1>
          <p className="mt-1 text-[13px] font-semibold text-muted-foreground">
            {showEs ? `Día ${day.day} completado` : `Day ${day.day} completed`}
          </p>
          <SaveLine showEs={showEs} saveState={saveState} onRetrySave={onRetrySave} />
          {welcomeBack ? (
            <p className="mt-1.5 text-[13px] font-bold text-primary">
              {showEs ? "Bienvenido de vuelta. Tu progreso sigue aquí." : "Welcome back. Your progress is still here."}
            </p>
          ) : null}
        </div>

        {/* B. One compact progress row */}
        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-2xl bg-card px-4 py-3 text-[14px] font-semibold shadow-[var(--shadow-card)]">
          <span className="inline-flex items-center gap-1.5">
            <Flame className="size-4 text-primary" aria-hidden />
            <span className="tabular-nums">
              {streak} {showEs ? (streak === 1 ? "día de racha" : "días de racha") : streak === 1 ? "day streak" : "day streak"}
            </span>
          </span>
          <span aria-hidden className="text-muted-foreground">
            ·
          </span>
          <span className="tabular-nums text-muted-foreground">
            {doneDays}/{totalDays} {showEs ? "días del módulo" : "days of the module"}
          </span>
        </div>

        {milestones.map((m) => (
          <HabitMilestone key={m.id} milestone={m} state={state} compact={Boolean(bigCelebration) && !m.major} />
        ))}

        {/* C. Optional audio comparison */}
        {hasComparison ? (
          <Expandable title={showEs ? "Comparar mis audios" : "Compare my recordings"}>
            <div className="space-y-2.5">
              {firstRecording && finalRecording && firstRecording.id !== finalRecording.id ? (
                <PlayRow
                  url={firstRecording.url}
                  label={showEs ? "Primer audio" : "First recording"}
                  seconds={firstSeconds}
                  showEs={showEs}
                />
              ) : null}
              <PlayRow
                url={finalRecording?.url ?? null}
                label={showEs ? "Audio final" : "Final recording"}
                seconds={seconds}
                showEs={showEs}
              />
            </div>
          </Expandable>
        ) : null}

        {/* D. Optional practice details */}
        {summary ? (
          <Expandable title={showEs ? "Ver detalle de mi práctica" : "View practice details"}>
            <div className="space-y-2">
              <SummaryRow label={showEs ? "PASO 2" : "STEP 2"} summary={summary.rep2} showEs={showEs} />
              <SummaryRow label={showEs ? "PASO 4" : "STEP 4"} summary={summary.rep4} showEs={showEs} />
              <div className="flex items-center justify-between text-[13px] font-semibold">
                <span className="font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {showEs ? "PASO FINAL" : "FINAL STEP"}
                </span>
                <span>{showEs ? "Completada ✓" : "Completed ✓"}</span>
              </div>
            </div>
          </Expandable>
        ) : null}

        {/* AI coaching happens INSIDE STEP 5 before this screen — never repeated here. */}

        {weekJustDone && weekCmp ? <WeekMoment comparison={weekCmp} celebrate /> : null}

        {moduleDone && moduleCmp ? (
          <>
            <ModuleMoment comparison={moduleCmp} state={state} celebrate />
            <NextUp afterModuleId={moduleId} />
          </>
        ) : null}

        {partialWeekDone ? (
          <div className="space-y-2 rounded-3xl border border-primary/30 bg-accent p-5 text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-accent-foreground">
              {showEs ? "SEMANA 1 COMPLETADA" : "WEEK 1 COMPLETED"}
            </p>
            <p className="text-[17px] font-extrabold tracking-tight">
              {showEs
                ? "Ya puedes contar tu historia, responder preguntas difíciles y manejar un cliente molesto bajo presión."
                : "You can now tell your story, answer tough questions and handle an upset customer under pressure."}
            </p>
            <p className="text-[13px] font-semibold text-muted-foreground">
              {showEs
                ? "Semanas 2–4 de GET HIRED muy pronto. Repite cualquier día para seguir afinando."
                : "GET HIRED Weeks 2–4 are coming soon. Repeat any day to keep sharpening."}
            </p>
          </div>
        ) : null}

        {isLastDay ? (
          <div className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-[17px] font-extrabold tracking-tight">
              {showEs
                ? "¿Sientes que hablar es más fácil que el Día 1?"
                : "Does speaking feel easier than Day 1?"}
            </p>
            <div className="grid gap-2">
              {ASSESSMENTS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setAnswer(option.value);
                    setState(JourneyService.saveSelfAssessment(moduleId, option.value));
                  }}
                  className={cn(
                    "min-h-[44px] rounded-2xl border px-4 py-3 text-[15px] font-bold transition-colors",
                    answer === option.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-foreground",
                  )}
                >
                  {showEs ? option.es : option.en}
                </button>
              ))}
            </div>
          </div>
        ) : null}

        <SaveProgressPrompt moduleId={moduleId} />
      </div>

      {/* E. Primary action — sticky, above the safe area, never covering content. */}
      <div className="fixed inset-x-0 bottom-0 border-t border-border/60 bg-background/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur">
        <div className="mx-auto w-full max-w-lg">
          <button
            type="button"
            onClick={() => void navigate({ to: "/" })}
            className="min-h-[48px] w-full rounded-2xl bg-primary px-6 py-4 text-[15px] font-bold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98] motion-reduce:transition-none"
          >
            {showEs ? "Continuar" : "Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Small save/sync line under the celebration — accurate for every save state. */
function SaveLine({
  showEs,
  saveState,
  onRetrySave,
}: {
  showEs: boolean;
  saveState: FinalRepSaveState;
  onRetrySave?: (() => void) | undefined;
}) {
  if (saveState === "idle") return null;
  if (saveState === "failed") {
    return (
      <div className="mt-2 space-y-2 rounded-2xl border border-destructive/40 bg-destructive/10 p-3 text-left" aria-live="polite">
        <p className="text-[13px] font-semibold">
          {showEs
            ? "No pudimos guardar tu Paso Final todavía. Tu grabación no se ha borrado."
            : "We couldn't save your Final Step yet. Your recording has not been removed."}
        </p>
        <button
          type="button"
          onClick={onRetrySave}
          className="min-h-[44px] w-full rounded-2xl bg-primary px-5 text-[13px] font-bold uppercase tracking-[0.12em] text-primary-foreground"
        >
          {showEs ? "INTENTAR DE NUEVO" : "TRY AGAIN"}
        </button>
      </div>
    );
  }
  return (
    <p className="mt-1.5 text-[13px] font-semibold text-muted-foreground" aria-live="polite">
      {saveState === "saving"
        ? showEs
          ? "Guardando tu práctica…"
          : "Saving your practice…"
        : showEs
          ? "Tu práctica quedó guardada ✓"
          : "Your practice is saved ✓"}
    </p>
  );
}

/** Collapsed-by-default secondary section. */
function Expandable({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl bg-card shadow-[var(--shadow-card)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[48px] w-full items-center justify-between gap-3 rounded-2xl px-4 py-3 text-left text-[15px] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        {title}
        <ChevronDown className={cn("size-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none", open && "rotate-180")} aria-hidden />
      </button>
      {open ? <div className="px-4 pb-4">{children}</div> : null}
    </div>
  );
}

/** One recording control: a single play icon plus its duration. */
function PlayRow({
  url,
  label,
  seconds,
  showEs,
}: {
  url: string | null;
  label: string;
  seconds: number;
  showEs: boolean;
}) {
  return (
    <div className="space-y-1">
      <RecordingPlayback url={url} label={`${label} · ${seconds}s`} />
      {!url ? (
        <p className="text-[12px] font-semibold text-muted-foreground">
          {showEs ? "Este audio no está disponible." : "This recording is not available."}
        </p>
      ) : null}
    </div>
  );
}

function SummaryRow({
  label,
  summary,
  showEs,
}: {
  label: string;
  summary: RepSummary;
  showEs: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-[13px] font-semibold">
      <span className="font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <span className="tabular-nums">
        {summary.attempted} / {summary.total} {showEs ? "intentadas" : "attempted"}
        {summary.skipped ? ` · ${summary.skipped} ${showEs ? "saltadas" : "skipped"}` : ""}
      </span>
    </div>
  );
}
