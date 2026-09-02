import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, Flame } from "lucide-react";
import { RecordingPlayback } from "./RecordingPlayback";
import { TranslatableText } from "./TranslatableText";
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
import { HABIT_GOAL, final6, habitDays, milestonesCrossed, wasOnBreak, type HabitMilestoneDef } from "@/lib/habit";
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

/** Celebration + objective numbers after the 5th rep of the day. */
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
  const seconds = finalRecording?.durationSeconds ?? 0;
  const firstSeconds = firstRecording?.durationSeconds ?? 0;

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
  const countdown = final6(habitNow);

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

  return (
    <div className="min-h-screen bg-background px-4 pb-16 pt-[max(2rem,env(safe-area-inset-top))]">
      <div className="mx-auto w-full max-w-lg space-y-5">
        <div className="rounded-3xl bg-navy p-7 text-center text-navy-foreground">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground animate-pop-check">
            <Check className="size-9" />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
            {showEs ? "¡MUY BIEN!" : "GREAT JOB!"}
          </h1>
          <p className="mt-2 text-[17px] font-semibold text-navy-foreground/85">
            {showEs
              ? `Terminaste el Día ${day.day}: 5 de 5 reps.`
              : `You finished Day ${day.day}: 5 of 5 reps.`}
          </p>
          {welcomeBack ? (
            <p className="mt-2 text-[14px] font-bold text-primary">
              {showEs ? "Bienvenido de vuelta. Tu progreso sigue aquí." : "Welcome back. Your progress is still here."}
            </p>
          ) : null}
          {habitGrew ? (
            <p className="mt-3 inline-block rounded-full bg-navy-foreground/10 px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.16em]">
              {habitNow >= HABIT_GOAL
                ? `66-DAY HABIT ✓ · ${habitNow} ${showEs ? "DÍAS" : "DAYS"}`
                : `${showEs ? "DÍA" : "DAY"} ${habitNow} / ${HABIT_GOAL} ${showEs ? "DEL HÁBITO" : "OF YOUR HABIT"}`}
            </p>
          ) : null}
          {countdown !== null && habitGrew ? (
            <p className="mt-2 text-[13px] font-extrabold text-primary">
              {showEs
                ? `FINAL 6 · ${countdown} ${countdown === 1 ? "DÍA MÁS" : "DÍAS MÁS"}`
                : `FINAL 6 · ${countdown} ${countdown === 1 ? "MORE DAY" : "MORE DAYS"}`}
            </p>
          ) : null}
        </div>

        {milestones.map((m) => (
          <HabitMilestone key={m.id} milestone={m} state={state} compact={Boolean(bigCelebration) && !m.major} />
        ))}

        {summary ? (
          <div className="space-y-2 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {showEs ? "PRÁCTICA DE HOY" : "TODAY'S PRACTICE"}
            </p>
            <SummaryRow label="REP 2" summary={summary.rep2} showEs={showEs} />
            <SummaryRow label="REP 4" summary={summary.rep4} showEs={showEs} />
            <div className="flex items-center justify-between text-[13px] font-semibold">
              <span className="font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {showEs ? "REP FINAL" : "FINAL REP"}
              </span>
              <span>{showEs ? "Completada ✓" : "Completed ✓"}</span>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-3">
          <Stat label={showEs ? "Reps hoy" : "Reps today"} value="5 / 5" />
          <Stat label={showEs ? "Rep final" : "Final rep"} value={`${seconds}s`} />
          <Stat
            label={showEs ? "Racha" : "Streak"}
            value={`${state.streakDays}`}
            icon={<Flame className="size-4 text-primary" />}
          />
          <Stat
            label={showEs ? "Días completados" : "Days completed"}
            value={`${JourneyService.completedCount(state, moduleId)} / ${totalDays}`}
          />
        </div>

        {saveState === "saving" || saveState === "saved" || saveState === "failed" ? (
          <div
            className={cn(
              "rounded-3xl p-5 text-[15px] font-semibold",
              saveState === "failed"
                ? "border border-destructive/40 bg-destructive/10 text-foreground"
                : "bg-card text-muted-foreground shadow-[var(--shadow-card)]",
            )}
            aria-live="polite"
          >
            {saveState === "saving" ? (
              <p>{showEs ? "GUARDANDO TU REP FINAL…" : "SAVING YOUR FINAL REP…"}</p>
            ) : saveState === "saved" ? (
              <p>{showEs ? "GUARDADA ✓" : "SAVED ✓"}</p>
            ) : (
              <div className="space-y-3">
                <p>
                  {showEs
                    ? "No pudimos guardar tu Rep Final todavía. Tu grabación no se ha borrado."
                    : "We couldn't save your Final Rep yet. Your recording has not been removed."}
                </p>
                <button
                  type="button"
                  onClick={onRetrySave}
                  className="min-h-[48px] w-full rounded-2xl bg-primary px-5 text-[13px] font-bold uppercase tracking-[0.12em] text-primary-foreground"
                >
                  {showEs ? "INTENTAR DE NUEVO" : "TRY AGAIN"}
                </button>
              </div>
            )}
          </div>
        ) : null}

        {finalRecording ? (
          <div className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {showEs ? "Tu grabación final" : "Your final recording"}
            </p>
            <RecordingPlayback
              url={finalRecording.url}
              label={showEs ? "ESCUCHAR MI REP" : "LISTEN TO MY REP"}
            />
            {firstRecording && firstRecording.id !== finalRecording.id ? (
              <RecordingPlayback
                url={firstRecording.url}
                label={showEs ? `PRIMERA TOMA (${firstSeconds}s)` : `FIRST TAKE (${firstSeconds}s)`}
              />
            ) : null}
          </div>
        ) : null}

        <div className="rounded-3xl border border-primary/25 bg-accent p-5 text-center">
          <TranslatableText es="Cada rep hace tu inglés más automático." align="center">
            <p className="text-[18px] font-extrabold leading-snug text-foreground">
              Every rep makes your English more automatic.
            </p>
          </TranslatableText>
        </div>

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
                    "rounded-2xl border px-4 py-3 text-[15px] font-bold transition-colors",
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

        <button
          type="button"
          onClick={() => void navigate({ to: "/" })}
          className="w-full rounded-2xl bg-primary px-6 py-4 text-[15px] font-bold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] active:scale-[0.98]"
        >
          {moduleDone
            ? showEs
              ? "CONTINUAR MI CAMINO"
              : "CONTINUE MY PATH"
            : showEs
              ? "CONTINUAR ✓"
              : "CONTINUE ✓"}
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-3xl bg-card p-4 text-center shadow-[var(--shadow-card)]">
      <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {icon} {label}
      </p>
      <p className="mt-1.5 text-2xl font-extrabold tabular-nums tracking-tight">{value}</p>
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
