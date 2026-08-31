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

export type RepSummary = { total: number; attempted: number; skipped: number };

type Props = {
  moduleId: ModuleId;
  day: CourseDay;
  finalRecording: Recording | null;
  firstRecording: Recording | null;
  showEs: boolean;
  summary?: { rep2: RepSummary; rep4: RepSummary };
};

const ASSESSMENTS: { value: SelfAssessment; en: string; es: string }[] = [
  { value: "not-yet", en: "Not yet", es: "Todavía no" },
  { value: "a-little", en: "A little", es: "Un poco" },
  { value: "definitely", en: "Definitely", es: "Definitivamente" },
];

/** Celebration + objective numbers after the 5th rep of the day. */
export function DayCompleteScreen({ moduleId, day, finalRecording, firstRecording, showEs, summary }: Props) {
  const navigate = useNavigate();
  const [state, setState] = useState(() => JourneyService.load());
  const [answer, setAnswer] = useState<SelfAssessment | null>(state.selfAssessment ?? null);

  useEffect(() => setState(JourneyService.load()), []);

  const totalDays = CourseService.totalDays(moduleId);
  const isLastDay = day.day === totalDays;
  const seconds = finalRecording?.durationSeconds ?? 0;
  const firstSeconds = firstRecording?.durationSeconds ?? 0;

  const module = CourseService.getModule(moduleId);
  const week = day.week;
  const weekInfo = week ? module.weeks?.find((w) => w.week === week) : undefined;
  const weekJustDone = Boolean(week && JourneyService.weekComplete(state, moduleId, week));
  const weekRecords = week ? JourneyService.weekRecords(state, moduleId, week) : [];
  const weekSeconds = weekRecords.reduce((total, r) => total + r.practiceSeconds, 0);
  const moduleDone = JourneyService.moduleComplete(state, moduleId);

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
        </div>

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

        {finalRecording ? (
          <div className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {showEs ? "Tu grabación final" : "Your final recording"}
            </p>
            <RecordingPlayback url={finalRecording.url} label={showEs ? "ESCUCHAR MI REP" : "LISTEN TO MY REP"} />
            {firstRecording && firstRecording.id !== finalRecording.id ? (
              <RecordingPlayback url={firstRecording.url} label={showEs ? `PRIMERA TOMA (${firstSeconds}s)` : `FIRST TAKE (${firstSeconds}s)`} />
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

        {weekJustDone && week && weekInfo ? (
          <div className="space-y-3 rounded-3xl border border-success/30 bg-success/8 p-5">
            <p className="text-center text-[13px] font-extrabold uppercase tracking-[0.18em] text-success">
              WEEK {week} COMPLETE ✓
            </p>
            <p className="text-center text-[18px] font-extrabold leading-snug tracking-tight">
              {showEs ? weekInfo.subtitleEs : weekInfo.title}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Stat label={showEs ? "Días de la semana" : "Days completed"} value={`${weekRecords.length} / ${JourneyService.weekTotalDays(moduleId, week)}`} />
              <Stat label={showEs ? "Fluency Reps" : "Fluency Reps"} value={`${weekRecords.length * 5}`} />
              <Stat label={showEs ? "Minutos hablando" : "Speaking minutes"} value={`${Math.round(weekSeconds / 60)}`} />
              <Stat label={showEs ? "Rep final" : "Final recording"} value={`${seconds}s`} />
            </div>
            <p className="text-center text-[12px] font-semibold text-muted-foreground">
              {showEs ? "Oraciones estimadas en tu rep final" : "Estimated sentences in your final rep"}:{" "}
              <span className="font-extrabold text-foreground">{finalRecording?.sentenceCount ?? "—"}</span>
            </p>
          </div>
        ) : null}

        {moduleDone && module.weeks?.length ? (
          <div className="space-y-4 rounded-3xl bg-navy p-6 text-navy-foreground">
            <p className="text-center text-[13px] font-extrabold uppercase tracking-[0.2em] text-primary">
              {moduleId === "past-stories"
                ? "MONTH 3 COMPLETE ✓"
                : module.label.includes("MONTH 2")
                  ? "MONTH 2 COMPLETE ✓"
                  : `${module.title} COMPLETE ✓`}
            </p>
            <div className="space-y-1.5">
              {module.weeks.map((item) => (
                <p key={item.week} className="text-[14px] font-bold">
                  ✓ WEEK {item.week} — {showEs ? item.subtitleEs : item.title}
                </p>
              ))}
            </div>
            <div className="rounded-2xl bg-navy-foreground/10 p-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                {showEs ? "AHORA PUEDES:" : "YOU CAN NOW:"}
              </p>
              <ul className="mt-2 space-y-1 text-[14px] font-semibold">
                {moduleId === "past-stories" ? (
                  <>
                    <li>✓ {showEs ? "Contar lo que hiciste ayer" : "Talk about what you did yesterday"}</li>
                    <li>✓ {showEs ? "Hablar del pasado de otras personas" : "Talk about other people's past"}</li>
                    <li>✓ {showEs ? "Describir qué estaba pasando" : "Describe what was happening"}</li>
                    <li>✓ {showEs ? "Contar una historia completa" : "Tell a complete story"}</li>
                  </>
                ) : (
                  <>
                    <li>✓ {showEs ? "Hablar de rutinas" : "Talk about routines"}</li>
                    <li>✓ {showEs ? "Hablar de las rutinas de otras personas" : "Talk about other people's routines"}</li>
                    <li>✓ {showEs ? "Explicar un proceso simple" : "Explain a simple process"}</li>
                    <li>✓ {showEs ? "Describir lo que está pasando ahora" : "Describe what is happening right now"}</li>
                  </>
                )}
              </ul>
            </div>

            <div className="space-y-2">
              {module.weeks.map((item) => {
                const records = JourneyService.weekRecords(state, moduleId, item.week);
                const last = records[records.length - 1];
                if (!last?.finalUrl) return null;
                return (
                  <RecordingPlayback
                    key={item.week}
                    url={last.finalUrl}
                    label={`${showEs ? "SEMANA" : "WEEK"} ${item.week} · ${last.finalSeconds}s`}
                  />
                );
              })}
            </div>
          </div>
        ) : null}



        {isLastDay ? (
          <div className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-[17px] font-extrabold tracking-tight">
              {showEs ? "¿Sientes que hablar es más fácil que el Día 1?" : "Does speaking feel easier than Day 1?"}
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
                    answer === option.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground",
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
          {showEs ? "TERMINAR DÍA ✓" : "COMPLETE DAY ✓"}
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

function SummaryRow({ label, summary, showEs }: { label: string; summary: RepSummary; showEs: boolean }) {
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
