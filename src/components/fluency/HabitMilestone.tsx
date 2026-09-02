import { Check } from "lucide-react";
import type { JourneyState } from "@/lib/types";
import { journeyComparison, journeyMetrics, type HabitMilestoneDef } from "@/lib/habit";
import { ComparisonPair } from "./ComparisonPair";
import { useAppLang } from "@/lib/i18n";

type Props = {
  milestone: HabitMilestoneDef;
  state: JourneyState;
  /** Compact strip when it sits inside a bigger module/week celebration. */
  compact?: boolean;
};

/**
 * NUEVO LOGRO — one habit milestone. Major milestones (66 / 100) add objective
 * metrics and ESCUCHA TU CAMINO (first vs latest Final Rep, never required).
 */
export function HabitMilestone({ milestone, state, compact = false }: Props) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const major = milestone.major && !compact;
  const metrics = major ? journeyMetrics(state) : null;
  const comparison = major ? journeyComparison(state) : null;

  return (
    <section
      className="space-y-4 rounded-3xl bg-navy p-5 text-navy-foreground"
      aria-label={es ? "Nuevo logro" : "New achievement"}
    >
      <div className="motion-safe:animate-pop-check text-center">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          {es ? "NUEVO LOGRO" : "NEW ACHIEVEMENT"}
        </p>
        <p className="mt-2 text-4xl" aria-hidden>
          {milestone.emoji}
        </p>
        <h2 className="mt-1 text-[26px] font-extrabold tracking-tight">
          {es ? milestone.title.es : milestone.title.en}
        </h2>
        {major && milestone.days === 66 ? (
          <p className="mt-1 text-[12px] font-bold uppercase tracking-[0.16em] text-navy-foreground/80">
            {es ? "TU INGLÉS YA ES PARTE DE TU RUTINA." : "ENGLISH IS NOW PART OF YOUR ROUTINE."}
          </p>
        ) : null}
        <p className="mt-3 text-[15px] font-semibold leading-snug text-navy-foreground/85">
          {es ? milestone.message.es : milestone.message.en}
        </p>
      </div>

      <div className="mx-auto flex w-fit items-center gap-3 rounded-2xl border border-navy-foreground/20 bg-navy-foreground/10 px-4 py-2">
        <span className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="size-4" />
        </span>
        <div className="text-left">
          <p className="text-[14px] font-extrabold leading-tight">{milestone.badge[0]}</p>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-navy-foreground/70">
            {milestone.badge[1]}
          </p>
        </div>
      </div>

      {metrics ? (
        <div className="grid grid-cols-2 gap-2 text-center">
          <Metric value={`${metrics.days}`} label={es ? "DÍAS DE PRÁCTICA" : "PRACTICE DAYS"} />
          <Metric value={`${metrics.reps}`} label="FLUENCY REPS" />
          {metrics.minutes > 0 ? (
            <Metric value={`${metrics.minutes}`} label={es ? "MINUTOS HABLANDO" : "MINUTES SPEAKING"} />
          ) : null}
          {metrics.finalReps > 0 ? (
            <Metric value={`${metrics.finalReps}`} label="FINAL REPS" />
          ) : null}
          {metrics.modules > 0 ? (
            <Metric value={`${metrics.modules}`} label={es ? "MÓDULOS COMPLETADOS" : "MODULES COMPLETED"} />
          ) : null}
        </div>
      ) : null}

      {comparison ? (
        <div className="space-y-3">
          <p className="text-center text-[13px] font-extrabold uppercase tracking-[0.2em] text-primary">
            {es ? "ESCUCHA TU CAMINO" : "HEAR YOUR JOURNEY"}
          </p>
          <ComparisonPair
            comparison={comparison}
            startCaption={es ? "PRIMERA GRABACIÓN" : "FIRST RECORDING"}
            endCaption={es ? "MÁS RECIENTE" : "LATEST"}
            tone="navy"
          />
        </div>
      ) : null}
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl bg-navy-foreground/10 p-3">
      <p className="text-2xl font-extrabold tabular-nums">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-navy-foreground/70">{label}</p>
    </div>
  );
}
