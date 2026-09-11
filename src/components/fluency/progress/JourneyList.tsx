import { Link } from "@tanstack/react-router";
import { Bookmark, ChevronRight, Lock } from "lucide-react";
import { ModuleBadge } from "@/components/fluency/ModuleBadge";
import { CourseService } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";
import { Progression } from "@/services/progression";
import { MODULE_TEASERS } from "@/lib/module-teasers";
import type { JourneyState, ModuleId } from "@/lib/types";
import { useAppLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type AccessStatus = { label: string; tone: "done" | "current" | "next"; locked: boolean };

/** Presentation-only short names for the route list (internal ids never change). */
const ROUTE_NAMES: Record<string, string> = {
  "basic-zero": "Basic Zero",
  "simple-future": "Simple Future",
  "simple-present": "Simple Present",
  "past-stories": "Simple Past",
  "mixed-tenses": "Mixed Tenses & Questions",
  "eagles-week-1": "Eagles",
  tigers: "Tigers",
  sharks: "Sharks",
  "advanced-1": "Get Hired",
  "advanced-2": "Do the Job",
  "advanced-3": "Beyond the Script",
};

/** Short level caps, matching the approved route design. */
const ROUTE_LEVELS: Record<string, { es: string; en: string }> = {
  "advanced-1": { es: "ADVANCED 1", en: "ADVANCED 1" },
  "advanced-2": { es: "ADVANCED 2", en: "ADVANCED 2" },
  "advanced-3": { es: "ADVANCED 3", en: "ADVANCED 3" },
  "eagles-week-1": { es: "INTERMEDIO", en: "INTERMEDIATE" },
  tigers: { es: "INTERMEDIO", en: "INTERMEDIATE" },
  sharks: { es: "INTERMEDIO", en: "INTERMEDIATE" },
};

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

/** "Mi ruta": the full module journey — badge, short name, teaser, real status. */
export function JourneyList({ state }: { state: JourneyState }) {
  const t = useT();
  const modules = CourseService.modules();
  const currentId =
    JourneyService.nextPractice(state)?.moduleId ?? JourneyService.currentModule(state);
  const currentIndex = modules.findIndex((m) => m.id === currentId);
  const nextId = currentIndex >= 0 ? modules[currentIndex + 1]?.id : undefined;

  return (
    <section className="space-y-3">
      <div>
        <h2 className="text-[20px] font-extrabold tracking-tight">{t("prog.myRoute")}</h2>
        <p className="text-[13px] text-muted-foreground">{t("prog.myRouteSub")}</p>
      </div>

      <div className="relative space-y-2.5">
        {/* Connector line behind the cards */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-6 left-[44px] top-6 w-px bg-border"
        />
        {modules.map((module) => (
          <ModuleRow
            key={module.id}
            module={module}
            state={state}
            isCurrent={module.id === currentId}
            isNext={module.id === nextId}
          />
        ))}
      </div>
    </section>
  );
}

function ModuleRow({
  module,
  state,
  isCurrent,
  isNext,
}: {
  module: ReturnType<typeof CourseService.modules>[number];
  state: JourneyState;
  isCurrent: boolean;
  isNext: boolean;
}) {
  const t = useT();
  const { lang } = useAppLang();
  const es = lang === "es";
  const done = JourneyService.completedCount(state, module.id);
  const total = module.days.length;
  const status = moduleAccessStatus(state, module.id, t);
  const isReview = JourneyService.moduleStatus(state, module.id) === "review";
  const prerequisite = status.locked ? Progression.prerequisiteOf(module.id) : null;
  const teaser = MODULE_TEASERS[module.id];
  const name = ROUTE_NAMES[module.id] ?? module.title;
  const level = ROUTE_LEVELS[module.id];
  const kicker = level ? (es ? level.es : level.en) : module.label;
  const currentPractice = Math.min(total, done + 1);

  const body = (
    <>
      <div className="flex items-center gap-3">
        <ModuleBadge moduleId={module.id} size="xl" es={es} className="shrink-0" />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{kicker}</p>
          <h3 className="flex items-center gap-1.5 text-[16px] font-extrabold leading-tight tracking-tight">
            {status.locked ? <Lock className="size-3.5 shrink-0 text-muted-foreground" aria-hidden /> : null}
            <span className="min-w-0 truncate">{name}</span>
          </h3>
          <p className="mt-0.5 text-[13px] leading-snug text-muted-foreground">
            {es ? teaser.es : teaser.en}
          </p>
          {status.locked && prerequisite ? (
            <p className="mt-1 text-[11px] font-semibold text-muted-foreground">
              {t("home.unlockAfter")} {CourseService.getModule(prerequisite).title}
            </p>
          ) : null}
        </div>
        {status.locked ? (
          <span className="flex shrink-0 items-center gap-1 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-muted-foreground">
            <Lock className="size-3" aria-hidden />
            {t("prog.pillLocked")}
          </span>
        ) : isCurrent || isNext ? (
          <span
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-[11px] font-bold",
              isCurrent
                ? "bg-primary text-primary-foreground"
                : "bg-primary/15 text-primary",
            )}
          >
            {isCurrent ? t("prog.pillCurrent") : t("prog.pillNext")}
          </span>
        ) : isReview ? (
          <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold text-foreground/70">
            {t("prog.pillReview")}
          </span>
        ) : null}
        {status.locked ? null : (
          <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        )}
      </div>

      {isCurrent ? (
        <>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${total > 0 ? Math.round((done / total) * 100) : 0}%` }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between gap-2">
            <p className="text-[12px] font-semibold text-foreground">
              {t("prog.practicesOf")
                .replace("{done}", `${currentPractice}`)
                .replace("{total}", `${total}`)}
            </p>
            <p className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Bookmark className="size-3.5" aria-hidden /> {t("prog.badgeToEarn")}
            </p>
          </div>
        </>
      ) : null}
    </>
  );

  const shell = cn(
    "block rounded-2xl border p-4",
    isCurrent
      ? "border-primary bg-card shadow-[var(--shadow-card)]"
      : isNext
        ? "border-primary/30 bg-primary/8"
        : "border-border bg-card",
    status.locked && !isNext && "text-foreground/80",
  );

  if (status.locked) {
    return (
      <div aria-disabled="true" className={cn(shell, "relative")}>
        {body}
      </div>
    );
  }

  return (
    <Link to="/module/$moduleId" params={{ moduleId: module.id }} className={cn(shell, "relative")}>
      {body}
    </Link>
  );
}
