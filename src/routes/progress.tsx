import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronDown, Flame, Mic, Timer } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { StatusBadge } from "@/components/fluency/StatusBadge";
import { ThenVsNow } from "@/components/fluency/ThenVsNow";
import { SpeakingChart } from "@/components/fluency/SpeakingChart";
import { RecordingCard } from "@/components/fluency/RecordingCard";
import { CourseService } from "@/services/course-service";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import { formatDuration, ideasLabel } from "@/lib/recordings";
import type { CourseDay, DayRecord, JourneyState, ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "My Progress — Fluency Reps" },
      { name: "description", content: "Objective speaking progress: days completed, reps, speaking minutes and streak." },
      { property: "og:title", content: "My Progress — Fluency Reps" },
      { property: "og:description", content: "See your days completed, total reps and speaking minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const t = useT();
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

  const safe = state ?? emptyJourney;
  const modules = CourseService.modules();
  const totalDays = CourseService.totalDaysAll();
  const completedCount = JourneyService.completedCount(safe);
  const week = JourneyService.weekStats(safe);
  const next = JourneyService.nextPractice(safe);
  const bests = JourneyService.personalBests(safe);
  const recent = useMemo(() => JourneyService.recordsByDate(safe).slice(-4).reverse(), [safe]);
  const series = useMemo(() => JourneyService.speakingSeries(safe), [safe]);
  const dated = useMemo(() => JourneyService.recordsByDate(safe), [safe]);
  const first = dated[0];
  const latest = dated.length > 1 ? dated[dated.length - 1] : undefined;

  if (!state) {
    return (
      <AppShell title={t("nav.progress")}>
        <div className="space-y-3" aria-busy="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-3xl bg-secondary" />
          ))}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={t("nav.progress")}>
      <div className="space-y-6">
        {failed ? (
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-[13px] font-semibold text-muted-foreground">{t("home.loadFailed")}</p>
            <button
              type="button"
              onClick={load}
              className="mt-3 min-h-[44px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
            >
              Try again
            </button>
          </div>
        ) : null}

        {/* Objective metrics */}
        <section className="grid grid-cols-2 gap-3">
          <Stat icon={<Check className="size-4 text-primary" />} label={t("home.daysCompleted")} value={`${completedCount} / ${totalDays}`} />
          <Stat icon={<Mic className="size-4 text-primary" />} label={t("home.reps")} value={`${safe.totalRepsCompleted}`} />
          <Stat icon={<Timer className="size-4 text-primary" />} label={t("home.speakingTime")} value={`${JourneyService.totalSpeakingMinutes(safe)} min`} />
          <Stat icon={<Flame className="size-4 text-primary" />} label={t("home.streak")} value={`${safe.streakDays} ${t("home.days")}`} />
        </section>

        {/* This week */}
        <section className="rounded-3xl bg-card p-4 shadow-[var(--shadow-card)]">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t("prog.thisWeek")}</h2>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <WeekStat value={`${week.days} / 5`} label={t("prog.days")} />
            <WeekStat value={`${week.reps}`} label={t("home.reps")} />
            <WeekStat value={`${week.minutes}`} label={t("prog.minutes")} />
          </div>
        </section>

        {/* Current module */}
        {next ? <CurrentModule state={safe} moduleId={next.moduleId} day={next.day} /> : null}

        {/* Modules */}
        <section className="space-y-3">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t("prog.modules")}</h2>
          {modules.map((module) => {
            const done = JourneyService.completedCount(safe, module.id);
            const total = module.days.length;
            const status =
              done >= total
                ? ({ label: "COMPLETE ✓", tone: "done" } as const)
                : next?.moduleId === module.id
                  ? ({ label: "CURRENT", tone: "current" } as const)
                  : ({ label: "UP NEXT", tone: "next" } as const);
            return (
              <Link
                key={module.id}
                to="/module/$moduleId"
                params={{ moduleId: module.id }}
                className={cn(
                  "block rounded-3xl border bg-card p-4",
                  status.tone === "current" ? "border-primary" : "border-border",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                      {module.label.split(" · ")[0]}
                    </p>
                    <p className="truncate text-[15px] font-extrabold tracking-tight">{module.title}</p>
                  </div>
                  <StatusBadge status={status} />
                </div>
                <ProgressBar value={total > 0 ? done / total : 0} />
                <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {done} / {total} days
                </p>
              </Link>
            );
          })}
        </section>

        {/* Speaking output */}
        {first ? (
          <section className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t("prog.speaking")}</h2>
            <div className="grid grid-cols-2 gap-3">
              <OutputStat label={t("prog.firstRec")} record={first} />
              {latest ? <OutputStat label={t("prog.latestRec")} record={latest} /> : null}
              {bests.longestSeconds ? (
                <Stat
                  icon={<Timer className="size-4 text-primary" />}
                  label={t("prog.longest")}
                  value={`${bests.longestSeconds} sec`}
                />
              ) : null}
              {bests.mostIdeas ? (
                <Stat
                  icon={<Mic className="size-4 text-primary" />}
                  label={t("prog.mostIdeas")}
                  value={`${bests.mostIdeas} ideas`}
                />
              ) : null}
            </div>
          </section>
        ) : null}

        <ThenVsNow pair={JourneyService.thenVsNow(safe)} />

        <SpeakingChart data={series} />

        {/* Speaking history */}
        {recent.length ? (
          <section className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t("prog.history")}</h2>
            {recent.map((record) => (
              <RecordingCard key={`${record.moduleId}:${record.day}`} record={record} />
            ))}
            <Link
              to="/recordings"
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
            >
              View all recordings <ArrowRight className="size-4" />
            </Link>
          </section>
        ) : null}

        <AllDays state={safe} />
      </div>
    </AppShell>
  );
}

function CurrentModule({ state, moduleId, day }: { state: JourneyState; moduleId: ModuleId; day: number }) {
  const t = useT();
  const module = CourseService.getModule(moduleId);
  const done = JourneyService.completedCount(state, moduleId);
  const total = module.days.length;
  const week = CourseService.getDay(moduleId, day).week ?? 1;
  const weekDone = JourneyService.weekRecords(state, moduleId, week).length;
  const weekTotal = JourneyService.weekTotalDays(moduleId, week);

  return (
    <section className="rounded-3xl bg-navy p-5 text-navy-foreground">
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{t("prog.currentModule")}</p>
      <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-navy-foreground/70">
        {module.label.split(" · ")[0]}
      </p>
      <h2 className="text-[22px] font-extrabold tracking-tight">{module.title}</h2>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-navy-foreground/15">
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${total > 0 ? Math.round((done / total) * 100) : 0}%` }}
        />
      </div>
      <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-foreground/70">
        {done} / {total} days · Week {week} · {weekDone} / {weekTotal} days
      </p>
      <Link
        to="/practice"
        search={{ day, module: moduleId }}
        className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[14px] font-bold tracking-wide text-primary-foreground"
      >
        CONTINUE PRACTICE <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}

function AllDays({ state }: { state: JourneyState }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const modules = CourseService.modules();
  const currentModuleId =
    modules.find((m) => JourneyService.completedCount(state, m.id) < m.days.length)?.id ?? modules[0]?.id;

  return (
    <section className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[52px] w-full items-center justify-between gap-2 rounded-2xl border border-border bg-card px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
      >
        {t("prog.viewAll")}
        <ChevronDown className={cn("size-5 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open
        ? modules.map((module) => (
            <ModuleBlock key={module.id} module={module} state={state} isCurrent={module.id === currentModuleId} />
          ))
        : null}
    </section>
  );
}

function ModuleBlock({
  module,
  state,
  isCurrent,
}: {
  module: ReturnType<typeof CourseService.modules>[number];
  state: JourneyState;
  isCurrent: boolean;
}) {
  const t = useT();
  const done = JourneyService.completedCount(state, module.id);
  const total = module.days.length;
  const currentDay = JourneyService.currentDay(state, module.id);
  const [open, setOpen] = useState(isCurrent);

  const weeks = new Map<number, CourseDay[]>();
  for (const item of module.days) {
    const week = item.week ?? 1;
    weeks.set(week, [...(weeks.get(week) ?? []), item]);
  }

  const status =
    done >= total
      ? ({ label: t("status.complete"), tone: "done" } as const)
      : isCurrent
        ? ({ label: t("status.current"), tone: "current" } as const)
        : ({ label: t("status.upNext"), tone: "next" } as const);

  return (
    <div className={cn("rounded-3xl border bg-card", isCurrent ? "border-primary" : "border-border")}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-extrabold tracking-tight">{module.title}</span>
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {done} / {total} {t("home.days")}
          </span>
        </span>
        <StatusBadge status={status} />
        <ChevronDown className={cn("size-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="space-y-2 border-t border-border px-3 py-3">
          {[...weeks.entries()]
            .sort((a, b) => a[0] - b[0])
            .map(([week, days]) => (
              <WeekBlock
                key={week}
                moduleId={module.id}
                week={week}
                days={days}
                state={state}
                currentDay={isCurrent ? currentDay : -1}
              />
            ))}
        </div>
      ) : null}
    </div>
  );
}

function WeekBlock({
  moduleId,
  week,
  days,
  state,
  currentDay,
}: {
  moduleId: ModuleId;
  week: number;
  days: CourseDay[];
  state: JourneyState;
  currentDay: number;
}) {
  const t = useT();
  const doneCount = days.filter((d) => JourneyService.isDayCompleted(state, moduleId, d.day)).length;
  const isCurrent = days.some((d) => d.day === currentDay) && doneCount < days.length;
  const [open, setOpen] = useState(isCurrent);
  const status =
    doneCount >= days.length
      ? ({ label: t("status.complete"), tone: "done" } as const)
      : isCurrent
        ? ({ label: t("status.current"), tone: "current" } as const)
        : ({ label: t("status.upNext"), tone: "next" } as const);

  return (
    <div className={cn("rounded-3xl border bg-card", isCurrent ? "border-primary" : "border-border")}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[56px] w-full items-center gap-3 px-4 py-3 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            {t("home.week")} {week}
          </span>
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {doneCount} / {days.length} {t("home.days")}
          </span>
        </span>
        <StatusBadge status={status} />
        <ChevronDown className={cn("size-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")} />
      </button>

      {open ? (
        <div className="space-y-2 px-4 pb-4">
          {days.map((item) => {
            const record = JourneyService.getRecord(state, moduleId, item.day);
            const isToday = item.day === currentDay && !record;
            return (
              <div
                key={item.day}
                aria-current={isToday ? "step" : undefined}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-2xl border p-3",
                  isToday
                    ? "border-primary bg-primary/8"
                    : record
                      ? "border-success/30 bg-success/8"
                      : "border-border",
                )}
              >
                <div className="min-w-0">
                  <p className="truncate text-[14px] font-bold tracking-tight">
                    {t("home.day")} {item.day} · {item.topic}
                  </p>
                  <p className="truncate text-[12px] text-muted-foreground">{item.focus}</p>
                </div>
                {isToday ? (
                  <span className="shrink-0 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary-foreground">
                    {t("status.current")}
                  </span>
                ) : (
                  <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                    {record ? `${Math.round(record.finalSeconds)}s` : "—"}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function OutputStat({ label, record }: { label: string; record: DayRecord }) {
  const ideas = ideasLabel(record.sentenceCount);
  return (
    <div className="rounded-3xl bg-card p-4 shadow-[var(--shadow-card)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className="mt-1.5 text-xl font-extrabold tabular-nums tracking-tight">{formatDuration(record.finalSeconds)}</p>
      {ideas ? <p className="text-[12px] font-bold text-muted-foreground">{ideas}</p> : null}
    </div>
  );
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
      <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${Math.round(value * 100)}%` }} />
    </div>
  );
}

function WeekStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-xl font-extrabold tabular-nums tracking-tight">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-card p-4 text-center shadow-[var(--shadow-card)]">
      <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {icon} {label}
      </p>
      <p className="mt-1.5 text-2xl font-extrabold tabular-nums tracking-tight">{value}</p>
    </div>
  );
}
