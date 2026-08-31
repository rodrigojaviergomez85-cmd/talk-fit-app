import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Sparkles } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { DailyPracticeCard, JourneyDayRow } from "@/components/fluency/DailyPracticeCard";
import { CourseService } from "@/services/course-service";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import { StatusBadge } from "@/components/fluency/StatusBadge";
import type { CourseDay, JourneyState, ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { useVerbBank } from "@/hooks/use-verb-bank";
import { PAST_VERBS, VerbBank } from "@/services/verb-bank";

export const Route = createFileRoute("/module/$moduleId")({
  beforeLoad: ({ params }) => {
    if (!CourseService.getModule(params.moduleId as ModuleId)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const module = CourseService.getModule(params.moduleId as ModuleId);
    const title = module ? `${module.title} — Fluency Reps` : "Module — Fluency Reps";
    const description = module
      ? `${module.subtitle} ${module.meta.join(" · ")}.`
      : "Fluency Reps learning module.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ModulePage,
});

function ModulePage() {
  const t = useT();
  const { moduleId } = Route.useParams();
  const module = CourseService.getModule(moduleId as ModuleId)!;
  const [state, setState] = useState<JourneyState | null>(null);
  const [failed, setFailed] = useState(false);

  const load = useCallback(() => {
    setFailed(false);
    setState(JourneyService.load());
    void JourneyService.pull()
      .then(setState)
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const safeState = state ?? emptyJourney;
  const total = module.days.length;
  const completedCount = JourneyService.completedCount(safeState, module.id);
  const currentDay = JourneyService.currentDay(safeState, module.id);
  const day = CourseService.getDay(module.id, currentDay);
  const completed = JourneyService.isDayCompleted(safeState, module.id, currentDay);
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const weeks = useMemo(() => {
    const groups = new Map<number, CourseDay[]>();
    for (const item of module.days) {
      const week = item.week ?? 1;
      const list = groups.get(week) ?? [];
      list.push(item);
      groups.set(week, list);
    }
    return [...groups.entries()].sort((a, b) => a[0] - b[0]);
  }, [module.days]);

  return (
    <AppShell title={module.title}>
      <div className="space-y-6">
        <Link
          to="/"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> {t("nav.home")}
        </Link>

        <div className="rounded-3xl bg-navy p-5 text-navy-foreground">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{module.label}</p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{module.title}</h2>
          <p className="mt-1 text-[14px] font-semibold text-navy-foreground/80">{module.subtitle}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {module.meta.map((item) => (
              <span
                key={item}
                className="rounded-full bg-navy-foreground/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
              >
                {item}
              </span>
            ))}
          </div>
          <div className="mt-4">
            <div className="h-2 overflow-hidden rounded-full bg-navy-foreground/15">
              <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
            </div>
            <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-foreground/70">
              {completedCount} / {total} {t("home.days")}
            </p>
          </div>
        </div>

        {failed ? (
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-[13px] font-semibold text-muted-foreground">We couldn't load your progress.</p>
            <button
              type="button"
              onClick={load}
              className="mt-3 min-h-[44px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
            >
              Try again
            </button>
          </div>
        ) : null}

        {state ? (
          <>
            <DailyPracticeCard moduleId={module.id} day={day} completed={completed} totalDays={total} />

            {module.id === "past-stories" ? <VerbBankCard /> : null}

            <section className="space-y-3">
              {weeks.map(([week, days]) => (
                <WeekSection
                  key={week}
                  moduleId={module.id}
                  week={week}
                  title={
                    module.weeks?.find((w) => w.week === week)?.subtitle ??
                    days[0]?.weekTitle ??
                    `Week ${week}`
                  }
                  days={days}
                  state={state}
                  currentDay={currentDay}
                />
              ))}
            </section>
          </>
        ) : (
          <div className="space-y-3" aria-busy="true">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-20 animate-pulse rounded-3xl bg-secondary" />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

/** Avoids "WEEK 1 · Week 1 — ..." in the same compact header. */
function stripWeekPrefix(title: string): string {
  return title.replace(/^\s*(week|semana)\s*\d+\s*[—–\-:·]?\s*/i, "").trim() || title;
}

function WeekSection({
  moduleId,
  week,
  title,
  days,
  state,
  currentDay,
}: {
  moduleId: ModuleId;
  week: number;
  title: string;
  days: CourseDay[];
  state: JourneyState;
  currentDay: number;
}) {
  const t = useT();
  const doneCount = days.filter((d) => JourneyService.isDayCompleted(state, moduleId, d.day)).length;
  const isCurrent = days.some((d) => d.day === currentDay) && doneCount < days.length;
  const status =
    doneCount >= days.length
      ? ({ label: t("status.complete"), tone: "done" } as const)
      : isCurrent
        ? ({ label: t("status.current"), tone: "current" } as const)
        : ({ label: t("status.upNext"), tone: "next" } as const);

  const [open, setOpen] = useState(isCurrent);
  useEffect(() => {
    setOpen(isCurrent);
  }, [isCurrent]);

  return (
    <div className={cn("rounded-3xl border bg-card", status.tone === "current" ? "border-primary" : "border-border")}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{t("home.week")} {week}</span>
          <span className="block truncate text-[15px] font-extrabold tracking-tight">{stripWeekPrefix(title)}</span>
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {doneCount} / {days.length}
          </span>
        </span>
        <StatusBadge status={status} />
        <ChevronDown className={cn("size-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="space-y-2 px-4 pb-4">
          {days.map((item) => {
            const done = JourneyService.isDayCompleted(state, moduleId, item.day);
            const current = !done && item.day === currentDay;
            return (
              <div key={item.day} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                    Day {item.day}
                  </span>
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em]",
                      done ? "text-success" : current ? "text-primary" : "text-muted-foreground",
                    )}
                  >
                    {done ? (
                      <>
                        <Check className="size-3.5" /> Complete
                      </>
                    ) : current ? (
                      "Current"
                    ) : (
                      "Up next"
                    )}
                  </span>
                </div>
                <JourneyDayRow moduleId={moduleId} day={item} completed={done} current={current} />
                {current ? (
                  <Link
                    to="/practice"
                    search={{ day: item.day, module: moduleId }}
                    className="flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-primary px-5 text-[14px] font-bold tracking-wide text-primary-foreground"
                  >
                    {JourneyService.completedCount(state, moduleId) > 0 ? "CONTINUE" : "START"}
                  </Link>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

/** Entry point to the Past Verb Bank (Module 3 only). */
function VerbBankCard() {
  const state = useVerbBank();
  const discovered = VerbBank.discoveredCount(state);
  return (
    <Link
      to="/verb-bank"
      className="flex items-center justify-between gap-3 rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]"
    >
      <span>
        <span className="flex items-center gap-2 text-[14px] font-extrabold uppercase tracking-tight">
          <Sparkles className="size-4 text-primary" aria-hidden />
          PAST VERB BANK
        </span>
        <span className="mt-1 block text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {discovered} / {PAST_VERBS.length} DISCOVERED
        </span>
      </span>
      <ArrowRight className="size-4 text-muted-foreground" aria-hidden />
    </Link>
  );
}
