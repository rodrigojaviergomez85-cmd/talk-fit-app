import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ComparisonPair } from "./ComparisonPair";
import { ReflectionChips } from "./ReflectionChips";
import { WEEK_REFLECTIONS, type Comparison } from "@/lib/progress-moments";
import { CourseService } from "@/services/course-service";
import { useAppLang } from "@/lib/i18n";

type Props = {
  comparison: Comparison;
  /** Fresh completion: show the celebration + next-week teaser. Revisits hide it. */
  celebrate?: boolean;
};

/** ESCUCHA TU SEMANA — week day 1 vs week day 5 (by position, never by calendar). */
export function WeekMoment({ comparison, celebrate = false }: Props) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const module = CourseService.getModule(comparison.moduleId);
  const weekInfo = module.weeks?.find((w) => w.week === comparison.week);
  const nextWeek = module.weeks?.find((w) => w.week === comparison.week + 1);
  const nextWeekFirstDay = nextWeek
    ? CourseService.getDays(comparison.moduleId).find((d) => d.week === nextWeek.week)?.day
    : undefined;
  const hasAny = comparison.start.playable || comparison.end.playable;

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h2 className="text-[22px] font-extrabold tracking-tight">
          {es ? "ESCUCHA TU SEMANA" : "HEAR YOUR WEEK"}
        </h2>
        <p className="mt-1 text-[14px] font-semibold text-muted-foreground">
          {es
            ? "Compara cómo empezaste con cómo terminaste."
            : "Compare how you started with how you finished."}
        </p>
        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
          {module.label} · {es ? "SEMANA" : "WEEK"} {comparison.week}
          {weekInfo ? ` · ${es ? weekInfo.subtitleEs : weekInfo.subtitle}` : ""}
        </p>
      </div>

      <ComparisonPair
        comparison={comparison}
        startCaption={es ? "ASÍ EMPEZASTE" : "HOW YOU STARTED"}
        endCaption={es ? "ASÍ TERMINASTE" : "HOW YOU FINISHED"}
      />

      {hasAny ? (
        <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <ReflectionChips
            title={es ? "¿QUÉ NOTAS DIFERENTE?" : "WHAT DO YOU NOTICE?"}
            options={WEEK_REFLECTIONS}
            moduleId={comparison.moduleId}
            week={comparison.week}
            type="week"
          />
        </div>
      ) : null}

      {celebrate ? (
        <div className="motion-safe:animate-[var(--animate-rise)] space-y-4 rounded-3xl border border-success/30 bg-success/8 p-5">
          <p className="text-center text-[15px] font-extrabold uppercase tracking-[0.18em] text-success">
            🔥 {es ? "SEMANA COMPLETADA" : "WEEK COMPLETE"}
          </p>
          <p className="text-center text-[17px] font-extrabold leading-snug tracking-tight">
            {es ? "Mira todo lo que ya puedes decir." : "Look at everything you can already say."}
          </p>
          <p className="text-center text-[14px] font-semibold text-muted-foreground">
            {es
              ? "La próxima semana vas a seguir construyendo sobre esto."
              : "Next week you'll keep building on this."}
          </p>

          {nextWeek && nextWeekFirstDay ? (
            <div className="rounded-2xl bg-card p-4 shadow-[var(--shadow-card)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {es ? "PRÓXIMA SEMANA" : "NEXT WEEK"}
              </p>
              <p className="mt-1 text-[16px] font-extrabold tracking-tight">
                {es ? "SEMANA" : "WEEK"} {nextWeek.week} · {nextWeek.title}
              </p>
              <p className="text-[13px] font-semibold text-muted-foreground">
                {es ? nextWeek.subtitleEs : nextWeek.subtitle}
              </p>
              <Link
                to="/practice"
                search={{ day: nextWeekFirstDay, module: comparison.moduleId }}
                className="mt-3 flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-primary px-4 text-[13px] font-bold uppercase tracking-[0.12em] text-primary"
              >
                {es ? "VER LA PRÓXIMA SEMANA" : "SEE NEXT WEEK"} <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
