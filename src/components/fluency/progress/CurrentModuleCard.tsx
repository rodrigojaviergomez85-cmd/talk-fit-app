import { Link } from "@tanstack/react-router";
import { ModuleBadge } from "@/components/fluency/ModuleBadge";
import { CourseService } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";
import { MODULE_TEASERS } from "@/lib/module-teasers";
import type { JourneyState } from "@/lib/types";
import { useAppLang, useT } from "@/lib/i18n";

/**
 * Navy card with the learner's real current module + teaser.
 * When the whole journey is complete it shows a completion state
 * instead of inventing a module.
 */
export function CurrentModuleCard({ state }: { state: JourneyState }) {
  const t = useT();
  const { lang } = useAppLang();
  const es = lang === "es";

  const next = JourneyService.nextPractice(state);
  const totalDays = CourseService.totalDaysAll();
  const done = JourneyService.completedCount(state);
  const finished = !next && done >= totalDays && totalDays > 0;

  if (finished) {
    return (
      <section className="rounded-3xl bg-navy p-5 text-navy-foreground shadow-[var(--shadow-card)]">
        <p className="text-[12px] font-bold tracking-wide text-primary">
          {es ? "MÓDULO ACTUAL" : "CURRENT MODULE"}
        </p>
        <p className="mt-2 text-[22px] font-extrabold tracking-tight">
          {es ? "¡Camino completado!" : "Journey complete!"}
        </p>
        <p className="mt-1 text-[14px] text-navy-foreground/80">{t("prog.doneJourney")}</p>
      </section>
    );
  }

  const moduleId = next?.moduleId ?? JourneyService.currentModule(state);
  const module = CourseService.getModule(moduleId);
  const teaser = MODULE_TEASERS[moduleId];

  return (
    <Link
      to="/module/$moduleId"
      params={{ moduleId }}
      className="block rounded-3xl bg-navy p-5 text-navy-foreground shadow-[var(--shadow-card)]"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[12px] font-bold tracking-wide text-primary">
            {es ? "MÓDULO ACTUAL" : "CURRENT MODULE"}
          </p>
          <p className="mt-1 truncate text-[24px] font-extrabold tracking-tight">
            {module.label}
          </p>
          <p className="mt-1 text-[14px] leading-snug text-navy-foreground/85">
            {es ? teaser.es : teaser.en}
          </p>
        </div>
        <ModuleBadge moduleId={moduleId} size="lg" es={es} className="shrink-0" />
      </div>
    </Link>
  );
}
