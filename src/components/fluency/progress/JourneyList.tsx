import { Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { ModuleBadge } from "@/components/fluency/ModuleBadge";
import { ModuleHeading } from "@/components/fluency/ModuleHeading";
import { StatusBadge } from "@/components/fluency/StatusBadge";
import { CourseService } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";
import { Progression } from "@/services/progression";
import { MODULE_TEASERS } from "@/lib/module-teasers";
import type { JourneyState, ModuleId } from "@/lib/types";
import { useAppLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type AccessStatus = { label: string; tone: "done" | "current" | "next"; locked: boolean };

/**
 * One source of truth for module access: JourneyService.moduleStatus
 * (done / current / review) plus Progression.isUnlocked for anything ahead.
 * Never inferred from display order or a "next" label.
 */
export function moduleAccessStatus(
  state: JourneyState,
  moduleId: ModuleId,
  t: ReturnType<typeof useT>,
): AccessStatus {
  const kind = JourneyService.moduleStatus(state, moduleId);
  if (kind === "done") return { label: t("status.complete"), tone: "done", locked: false };
  if (kind === "current") return { label: t("status.current"), tone: "current", locked: false };
  if (kind === "review") return { label: t("status.review"), tone: "next", locked: false };
  if (!Progression.isUnlocked(state, moduleId))
    return { label: t("status.locked"), tone: "next", locked: true };
  return { label: t("status.upNext"), tone: "next", locked: false };
}

/** "Mi ruta": the full module journey, always expanded — badge, teaser, real status. */
export function JourneyList({ state }: { state: JourneyState }) {
  const t = useT();
  const modules = CourseService.modules();
  return (
    <section className="space-y-3">
      <h2 className="text-[16px] font-extrabold tracking-tight">{t("prog.myRoute")}</h2>
      {modules.map((module) => (
        <ModuleRow key={module.id} module={module} state={state} />
      ))}
    </section>
  );
}

function ModuleRow({
  module,
  state,
}: {
  module: ReturnType<typeof CourseService.modules>[number];
  state: JourneyState;
}) {
  const t = useT();
  const { lang } = useAppLang();
  const es = lang === "es";
  const done = JourneyService.completedCount(state, module.id);
  const total = module.days.length;
  const status = moduleAccessStatus(state, module.id, t);
  const prerequisite = Progression.prerequisiteOf(module.id);
  const teaser = MODULE_TEASERS[module.id];

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <ModuleBadge moduleId={module.id} size="sm" es={es} />
          <ModuleHeading module={module} size="sm" />
        </div>
        <StatusBadge status={status} />
      </div>
      <p
        className={cn(
          "mt-1.5 text-[13px] leading-snug",
          status.locked ? "text-muted-foreground/80" : "text-muted-foreground",
        )}
      >
        {es ? teaser.es : teaser.en}
      </p>
      <ProgressBar value={total > 0 ? done / total : 0} />
      <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {done} / {total} {t("home.days")}
      </p>
    </>
  );

  if (status.locked) {
    return (
      <div
        aria-disabled="true"
        className="block rounded-3xl border border-dashed border-border bg-secondary/40 p-4 text-muted-foreground"
      >
        {body}
        {prerequisite ? (
          <p className="mt-3 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em]">
            <Lock className="size-3.5" aria-hidden /> {t("home.unlockAfter")}{" "}
            {CourseService.getModule(prerequisite).title}
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <Link
      to="/module/$moduleId"
      params={{ moduleId: module.id }}
      className={cn(
        "block rounded-3xl border bg-card p-4",
        status.tone === "current" ? "border-primary" : "border-border",
      )}
    >
      {body}
    </Link>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${Math.round(value * 100)}%` }}
      />
    </div>
  );
}
