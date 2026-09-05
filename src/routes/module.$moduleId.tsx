import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, ChevronDown, Lock, Sparkles, Zap } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { DailyPracticeCard, JourneyDayRow } from "@/components/fluency/DailyPracticeCard";
import { CourseService, isModuleId } from "@/services/course-service";
import { Progression } from "@/services/progression";
import { ModuleLoadError } from "@/components/fluency/ModuleLoadState";
import { useModuleContent } from "@/hooks/use-module-content";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import { PracticeSessionService } from "@/services/practice-session";
import { TestReadyService } from "@/services/test-ready-service";
import { StatusBadge } from "@/components/fluency/StatusBadge";
import type { CourseDay, JourneyState, ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAppLang, useT } from "@/lib/i18n";
import { useVerbBank } from "@/hooks/use-verb-bank";
import { PAST_VERBS, VerbBank } from "@/services/verb-bank";

export const Route = createFileRoute("/module/$moduleId")({
  beforeLoad: ({ params }) => {
    // The static index decides validity; unknown ids use the existing not-found handling.
    if (!isModuleId(params.moduleId)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const module = isModuleId(params.moduleId) ? CourseService.getModule(params.moduleId) : null;
    const title = module ? `${module.label} · ${module.title} — Fluency App` : "Module — Fluency App";
    const description = module
      ? `${module.subtitle} ${module.meta.join(" · ")}.`
      : "Fluency App learning module.";
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
  const { lang } = useAppLang();
  const { moduleId } = Route.useParams();
  // Header/progress come from the static index; the day list needs the full content chunk.
  const meta = CourseService.getModule(moduleId as ModuleId);
  const content = useModuleContent(meta.id);
  const [state, setState] = useState<JourneyState | null>(null);
  const [failed, setFailed] = useState(false);
  const hasSprints = meta.days.some((d) => d.testReady);

  const load = useCallback(() => {
    setFailed(false);
    setState(JourneyService.load());
    void JourneyService.pull()
      .then(setState)
      .catch(() => setFailed(true));
    if (hasSprints) void TestReadyService.pull(meta.id).catch(() => undefined);
  }, [hasSprints, meta.id]);

  useEffect(() => {
    load();
  }, [load]);

  const safeState = state ?? emptyJourney;
  const total = meta.days.length;
  const completedCount = JourneyService.completedCount(safeState, meta.id);
  const currentDay = JourneyService.currentDay(safeState, meta.id);
  const day = content.module ? CourseService.dayOf(content.module, currentDay) : null;
  const completed = JourneyService.isDayCompleted(safeState, meta.id, currentDay);
  const session = useMemo(
    () => (day ? PracticeSessionService.load(meta.id, day.day) : null),
    [meta.id, day?.day],
  );
  const inProgress = day ? !completed && PracticeSessionService.isResumable(session) : false;
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;

  const fullDays = content.module?.days;
  const weeks = useMemo(() => {
    const groups = new Map<number, CourseDay[]>();
    for (const item of fullDays ?? []) {
      const week = item.week ?? 1;
      const list = groups.get(week) ?? [];
      list.push(item);
      groups.set(week, list);
    }
    return [...groups.entries()].sort((a, b) => a[0] - b[0]);
  }, [fullDays]);

  // Ladder guard: a module ahead of the learner opens only once the previous one is complete.
  const locked = state ? !JourneyService.isModuleUnlocked(state, meta.id) : false;
  if (locked) {
    const prereq = Progression.prerequisiteOf(meta.id);
    const active = Progression.activeModuleId(safeState);
    return (
      <AppShell title={`${meta.label} · ${meta.title}`}>
        <div className="space-y-6">
          <Link
            to="/"
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
          >
            <ArrowLeft className="size-4" /> {t("nav.home")}
          </Link>
          <section className="rounded-3xl border border-dashed border-border bg-secondary/40 p-6 text-center">
            <Lock className="mx-auto size-8 text-muted-foreground" aria-hidden />
            <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">{t("home.lockedTitle")}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{meta.label}</p>
            <h2 className="text-[24px] font-extrabold tracking-tight">{meta.title}</h2>
            <p className="mt-1 text-[13px] font-semibold text-muted-foreground">
              {lang === "es" ? meta.subtitleEs : meta.subtitle}
            </p>
            {prereq ? (
              <p className="mt-4 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                🔒 {t("home.unlockAfter")} {CourseService.getModule(prereq).title}
              </p>
            ) : null}
            <p className="mt-2 text-[13px] font-semibold text-muted-foreground">{t("home.lockedBody")}</p>
            {active ? (
              <Link
                to="/module/$moduleId"
                params={{ moduleId: active }}
                className="mt-5 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[14px] font-bold tracking-wide text-primary-foreground active:scale-[0.98]"
              >
                {t("home.backToCurrent")} <ArrowRight className="size-4" />
              </Link>
            ) : null}
          </section>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={`${meta.label} · ${meta.title}`}>
      <div className="space-y-6">
        <Link
          to="/"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> {t("nav.home")}
        </Link>

        <div className="rounded-3xl bg-navy p-5 text-navy-foreground">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{meta.label}</p>
          <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{meta.title}</h2>
          <p className="mt-1 text-[14px] font-semibold text-navy-foreground/80">
            {lang === "es" ? meta.subtitleEs : meta.subtitle}
          </p>
          {meta.statusLine ? (
            <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-foreground/70">
              {lang === "es" ? meta.statusLine.es : meta.statusLine.en}
            </p>
          ) : null}
          {meta.highlights ? (
            <ul className="mt-3 space-y-1.5">
              {meta.highlights.map((item) => (
                <li key={item.en} className="flex items-start gap-2 text-[13px] font-semibold text-navy-foreground/90">
                  <span className="mt-0.5 text-primary">✓</span>
                  <span>{lang === "es" ? item.es : item.en}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {meta.extra ? (
            <p className="mt-3 rounded-2xl bg-navy-foreground/10 px-3 py-2 text-[13px] font-bold text-navy-foreground">
              {lang === "es" ? meta.extra.es : meta.extra.en}
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {meta.meta.map((item) => (
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

        {content.status === "error" ? <ModuleLoadError onRetry={content.retry} /> : null}

        {state && day ? (
          <>
            <DailyPracticeCard moduleId={meta.id} day={day} completed={completed} inProgress={inProgress} totalDays={total} />

            {meta.id === "past-stories" ? <VerbBankCard /> : null}

            <section className="space-y-3">
              {weeks.map(([week, days]) => (
                <WeekSection
                  key={week}
                  moduleId={meta.id}
                  week={week}
                  title={
                    meta.weeks?.find((w) => w.week === week)?.subtitle ??
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
        ) : content.status === "error" ? null : (
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
                {item.testReady ? <TestReadyCard moduleId={moduleId} day={item} dayCompleted={done} /> : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

/** Separate, optional 3–5 minute sprint — clearly distinct from Daily Practice. */
function TestReadyCard({
  moduleId,
  day,
  dayCompleted,
}: {
  moduleId: ModuleId;
  day: CourseDay;
  dayCompleted: boolean;
}) {
  const t = useT();
  const { lang } = useAppLang();
  const records = useSyncExternalStore(TestReadyService.subscribe, TestReadyService.snapshot, TestReadyService.snapshot);
  const record = records[`${moduleId}:${day.day}`];
  const sprint = day.testReady!;
  const optional = day.testReadyOptional
    ? lang === "es"
      ? "Práctica extra · opcional"
      : "Extra practice · optional"
    : t("tr.subtitle");

  if (!dayCompleted) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-dashed p-3.5 opacity-70",
          "border-border bg-card",
        )}
      >
        <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground">
          <Lock className="size-4" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-muted-foreground">
            <Zap className="size-3.5" aria-hidden /> {t("tr.card")} · {t("tr.minutes")}
          </span>
          <span className="mt-0.5 block truncate text-[13px] font-bold text-muted-foreground">
            {lang === "es" ? sprint.titleEs : sprint.title}
          </span>
          <span className="block text-[11px] text-muted-foreground">{optional}</span>
          <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {t("tr.availableAfter")}
          </span>
        </span>
      </div>
    );
  }

  return (
    <Link
      to="/sprint"
      search={{ day: day.day, module: moduleId }}
      className={cn(
        "flex items-center justify-between gap-3 rounded-2xl border border-dashed p-3.5",
        record ? "border-success/40 bg-success/8" : "border-border bg-card",
      )}
    >
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-primary">
          <Zap className="size-3.5" aria-hidden /> {t("tr.card")} · {t("tr.minutes")}
        </span>
        <span className="mt-0.5 block truncate text-[13px] font-bold">{lang === "es" ? sprint.titleEs : sprint.title}</span>
        <span className="block text-[11px] text-muted-foreground">{optional}</span>
      </span>
      {record ? (
        <span className="inline-flex min-h-[40px] shrink-0 items-center gap-1 rounded-xl border border-success/40 bg-success/12 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-success">
          <Check className="size-3.5" /> {t("tr.repeat")}
        </span>
      ) : (
        <span className="inline-flex min-h-[40px] shrink-0 items-center gap-1 rounded-xl border border-primary/40 bg-primary/8 px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
          {t("tr.doTestReady")} <ArrowRight className="size-3.5" />
        </span>
      )}
    </Link>
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
