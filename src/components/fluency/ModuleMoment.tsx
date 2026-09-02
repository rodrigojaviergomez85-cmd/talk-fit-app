import { ComparisonPair } from "./ComparisonPair";
import { ReflectionChips } from "./ReflectionChips";
import {
  MODULE_COMPLETION,
  MODULE_EMOJI,
  MODULE_REFLECTIONS,
  TRANSFORMATION,
  moduleMetrics,
  type Comparison,
} from "@/lib/progress-moments";
import { Check } from "lucide-react";
import { CourseService } from "@/services/course-service";
import type { JourneyState } from "@/lib/types";
import { useAppLang } from "@/lib/i18n";

type Props = {
  comparison: Comparison;
  state: JourneyState;
  /** Fresh completion: bigger celebration header. Revisits keep the compact one. */
  celebrate?: boolean;
};

/** ESCUCHA TU CAMBIO — first active day vs final active day of the module. */
export function ModuleMoment({ comparison, state, celebrate = false }: Props) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const module = CourseService.getModule(comparison.moduleId);
  const metrics = moduleMetrics(state, comparison.moduleId);
  const transformation = TRANSFORMATION[comparison.moduleId];
  const hasAny = comparison.start.playable || comparison.end.playable;
  // Intermediate modules celebrate by name (EAGLES, TIGERS); Basic levels by label (BASIC 2…).
  const name = module.label === "INTERMEDIO" ? module.title : module.label;
  const completion = MODULE_COMPLETION[comparison.moduleId];

  return (
    <section className="space-y-4 rounded-3xl bg-navy p-5 text-navy-foreground">
      <div className={celebrate ? "motion-safe:animate-pop-check text-center" : "text-center"}>
        <p className="text-4xl" aria-hidden>
          {MODULE_EMOJI[comparison.moduleId]}
        </p>
        <h2 className="mt-1 text-[24px] font-extrabold tracking-tight">
          {name} {es ? "COMPLETADO" : "COMPLETE"}
        </h2>
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-navy-foreground/70">
          {module.label} · {module.title}
        </p>
        <p className="mt-3 text-[16px] font-extrabold leading-snug">
          {es ? transformation.es : transformation.en}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center">
        <Metric value={`${metrics.days}`} label={es ? "DÍAS COMPLETADOS" : "DAYS COMPLETED"} />
        <Metric value={`${metrics.reps}`} label="FLUENCY REPS" />
        {metrics.minutes > 0 ? (
          <Metric
            value={`${metrics.minutes}`}
            label={es ? "MINUTOS HABLANDO" : "MINUTES SPEAKING"}
          />
        ) : null}
        {metrics.finalReps > 0 ? (
          <Metric
            value={`${metrics.finalReps}`}
            label={es ? "FINAL REPS GUARDADOS" : "FINAL REPS SAVED"}
          />
        ) : null}
      </div>

      <div className="space-y-3">
        <p className="text-center text-[13px] font-extrabold uppercase tracking-[0.2em] text-primary">
          {es ? "ESCUCHA TU CAMBIO" : "HEAR YOUR CHANGE"}
        </p>
        <ComparisonPair
          comparison={comparison}
          startCaption={es ? "ASÍ EMPEZASTE" : "HOW YOU STARTED"}
          endCaption={es ? "AHORA" : "NOW"}
          tone="navy"
        />
      </div>

      {hasAny ? (
        <div className="rounded-2xl bg-navy-foreground/10 p-4">
          <ReflectionChips
            title={es ? "¿QUÉ CAMBIO NOTAS MÁS?" : "WHAT CHANGE DO YOU NOTICE MOST?"}
            options={MODULE_REFLECTIONS}
            moduleId={comparison.moduleId}
            week={0}
            type="module"
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
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-navy-foreground/70">
        {label}
      </p>
    </div>
  );
}
