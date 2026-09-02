import { useState } from "react";
import { ChevronDown, Headphones } from "lucide-react";
import { RecordingCard } from "./RecordingCard";
import { StatusBadge } from "./StatusBadge";
import { CourseService, type LearningModule } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";
import { moduleComparison, weekComparison, type Comparison } from "@/lib/progress-moments";
import type { JourneyState, ModuleId } from "@/lib/types";
import { useAppLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  state: JourneyState;
  onCompare: (comparison: Comparison) => void;
};

/**
 * Saved Final Reps grouped Module → Week. Only modules with recordings render;
 * the current/most recent module opens by default; day cards mount only when
 * a week is open (metadata only — audio loads on play).
 */
export function RecordingsGrouped({ state, onCompare }: Props) {
  const currentModuleId =
    JourneyService.nextPractice(state)?.moduleId ?? JourneyService.currentModule(state);
  const latest = JourneyService.recordsByDate(state).at(-1);
  const openId: ModuleId = latest?.moduleId ?? currentModuleId;
  const modules = CourseService.modules().filter(
    (m) => JourneyService.completedCount(state, m.id) > 0,
  );

  return (
    <div className="space-y-3">
      {modules.map((module) => (
        <ModuleGroup
          key={module.id}
          module={module}
          state={state}
          defaultOpen={module.id === openId}
          onCompare={onCompare}
        />
      ))}
    </div>
  );
}

function ModuleGroup({
  module,
  state,
  defaultOpen,
  onCompare,
}: {
  module: LearningModule;
  state: JourneyState;
  defaultOpen: boolean;
  onCompare: (comparison: Comparison) => void;
}) {
  const t = useT();
  const { lang } = useAppLang();
  const es = lang === "es";
  const [open, setOpen] = useState(defaultOpen);
  const done = JourneyService.completedCount(state, module.id);
  const total = module.days.length;
  const complete = done >= total;

  const weeks = new Map<number, number[]>();
  for (const d of module.days) {
    const w = d.week ?? 1;
    weeks.set(w, [...(weeks.get(w) ?? []), d.day]);
  }
  const currentWeek =
    CourseService.getDay(module.id, JourneyService.currentDay(state, module.id)).week ?? 1;

  return (
    <section className="rounded-3xl border border-border bg-card">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-extrabold tracking-tight">
            <span className="text-primary">{module.label}</span> · {module.title}
          </span>
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {done} / {total} {t("home.days")}
          </span>
        </span>
        {complete ? <StatusBadge status={{ label: t("status.complete"), tone: "done" }} /> : null}
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="space-y-2 border-t border-border px-3 py-3">
          {complete ? (
            <CompareButton
              label={es ? "ESCUCHA TU CAMBIO" : "HEAR YOUR CHANGE"}
              detail={`${es ? "DÍA" : "DAY"} ${module.days[0]?.day ?? 1} vs. ${es ? "DÍA" : "DAY"} ${module.days[module.days.length - 1]?.day ?? total}`}
              onClick={() => {
                const cmp = moduleComparison(state, module.id);
                if (cmp) onCompare(cmp);
              }}
            />
          ) : null}
          {[...weeks.entries()]
            .sort((a, b) => a[0] - b[0])
            .map(([week, days]) => (
              <WeekGroup
                key={week}
                module={module}
                week={week}
                days={days}
                state={state}
                defaultOpen={complete ? week === weeks.size : week === currentWeek}
                onCompare={onCompare}
              />
            ))}
        </div>
      ) : null}
    </section>
  );
}

function WeekGroup({
  module,
  week,
  days,
  state,
  defaultOpen,
  onCompare,
}: {
  module: LearningModule;
  week: number;
  days: number[];
  state: JourneyState;
  defaultOpen: boolean;
  onCompare: (comparison: Comparison) => void;
}) {
  const t = useT();
  const { lang } = useAppLang();
  const es = lang === "es";
  const [open, setOpen] = useState(defaultOpen);
  const records = days
    .map((d) => JourneyService.getRecord(state, module.id, d))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));
  const weekInfo = module.weeks?.find((w) => w.week === week);
  const complete = records.length >= days.length;
  if (records.length === 0) return null;

  return (
    <div className="rounded-3xl border border-border">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            {t("home.week")} {week}
            {weekInfo ? ` · ${es ? weekInfo.subtitleEs : weekInfo.subtitle}` : ""}
          </span>
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {records.length} {es ? "final reps" : "final reps"}
          </span>
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="space-y-2 px-3 pb-3">
          {complete ? (
            <CompareButton
              label={es ? "ESCUCHA TU SEMANA" : "HEAR YOUR WEEK"}
              detail={`${es ? "DÍA" : "DAY"} ${days[0]} vs. ${es ? "DÍA" : "DAY"} ${days[days.length - 1]}`}
              onClick={() => {
                const cmp = weekComparison(state, module.id, week);
                if (cmp) onCompare(cmp);
              }}
            />
          ) : null}
          {[...records].reverse().map((record) => (
            <RecordingCard key={`${record.moduleId}:${record.day}`} record={record} compact />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function CompareButton({
  label,
  detail,
  onClick,
}: {
  label: string;
  detail: string;
  onClick: () => void;
}) {
  const { lang } = useAppLang();
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-[52px] w-full items-center gap-3 rounded-2xl border border-primary/40 bg-accent px-4 text-left"
    >
      <Headphones className="size-5 shrink-0 text-primary" />
      <span className="min-w-0 flex-1">
        <span className="block text-[12px] font-extrabold uppercase tracking-[0.16em] text-accent-foreground">
          {label}
        </span>
        <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {detail}
        </span>
      </span>
      <span className="shrink-0 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
        {lang === "es" ? "COMPARAR" : "COMPARE"}
      </span>
    </button>
  );
}
