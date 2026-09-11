import { useCallback, useEffect, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { RecordingsPanel } from "@/components/fluency/RecordingsPanel";
import { BarChart3, Check, ChevronDown, Lock, Mic, Timer, Trophy } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { StatusBadge } from "@/components/fluency/StatusBadge";
import { CurrentModuleCard } from "@/components/fluency/progress/CurrentModuleCard";
import { Last7DaysCard } from "@/components/fluency/progress/Last7DaysCard";
import { JourneyList, moduleAccessStatus } from "@/components/fluency/progress/JourneyList";

import { BadgeGrid } from "@/components/fluency/BadgeGrid";
import { ModuleBadgeGrid } from "@/components/fluency/ModuleBadgeGrid";
import { CourseService, type DayOutline } from "@/services/course-service";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import { Progression } from "@/services/progression";
import type { JourneyState, ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

type ProgressTab = "progress" | "audio";

export const Route = createFileRoute("/progress")({
  validateSearch: (search: Record<string, unknown>): { tab?: ProgressTab } =>
    search['tab'] === "audio" ? { tab: "audio" } : {},
  head: () => ({
    meta: [
      { title: "My Progress — Fluency App" },
      {
        name: "description",
        content: "Am I improving? Weekly practice, speaking minutes, personal bests, module journey and badges.",
      },
      { property: "og:title", content: "My Progress — Fluency App" },
      {
        property: "og:description",
        content: "See your weekly practice, speaking minutes, personal bests and badges.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProgressPage,
});

/**
 * PROGRESS = "am I improving?" — analytics + achievements only.
 * The next action lives on HOME; audio playback lives in RECORDINGS.
 */
function ProgressPage() {
  const t = useT();
  const navigate = useNavigate({ from: "/progress" });
  const { tab: tabParam } = Route.useSearch();
  const tab: ProgressTab = tabParam ?? "progress";
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
  const totalDays = CourseService.totalDaysAll();
  const completedCount = JourneyService.completedCount(safe);
  const bests = JourneyService.personalBests(safe);

  if (!state) {
    return (
      <AppShell title={t("prog.title")} subtitle={t("prog.subtitle")}>
        <div className="space-y-3" aria-busy="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-3xl bg-secondary" />
          ))}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell hideHeader hideSync>
      {/* Navy header with the two views inside it */}
      <header className="-mx-4 bg-navy px-5 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))] text-navy-foreground">
        <div className="mx-auto w-full max-w-lg">
          <h1 className="text-2xl font-extrabold tracking-tight">{t("prog.title")}</h1>
          <p className="mt-1 text-[14px] text-navy-foreground/75">{t("prog.subtitle")}</p>

          <div
            role="tablist"
            aria-label={t("prog.title")}
            className="mt-4 flex gap-1 rounded-2xl bg-navy-foreground/12 p-1"
          >
            {(["progress", "audio"] as const).map((key) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={tab === key}
                onClick={() =>
                  void navigate({
                    search: key === "audio" ? { tab: "audio" } : {},
                    replace: true,
                  })
                }
                className={cn(
                  "min-h-[44px] flex-1 rounded-xl px-3 text-[13px] font-bold transition-colors",
                  tab === key
                    ? "bg-card text-foreground shadow-[var(--shadow-card)]"
                    : "text-navy-foreground/80",
                )}
              >
                {key === "audio" ? t("prog.tabAudio") : t("prog.tabProgress")}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="space-y-6 pt-5">
        {failed ? (
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-[13px] font-semibold text-muted-foreground">
              {t("home.loadFailed")}
            </p>
            <button
              type="button"
              onClick={load}
              className="mt-3 min-h-[44px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
            >
              {t("action.tryAgain")}
            </button>
          </div>
        ) : null}

        {tab === "audio" ? <RecordingsPanel state={safe} /> : (
        <>
        {/* 1. Current module */}
        <CurrentModuleCard state={safe} />

        {/* 2. Recent activity */}
        <Last7DaysCard state={safe} />

        {/* 3. Mi ruta — full path, right after recent activity */}
        <JourneyList state={safe} />

        {/* Secondary: stats and achievements, collapsed rows */}
        <Collapsible icon={<BarChart3 className="size-5 text-primary" />} label={t("prog.myStats")}>
          <div className="space-y-6 pt-4">
            <section className="space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {t("prog.totals")}
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <Stat icon={<Mic className="size-4 text-primary" />} label={t("home.reps")} value={`${safe.totalRepsCompleted}`} />
                <Stat
                  icon={<Timer className="size-4 text-primary" />}
                  label={t("prog.minutes")}
                  value={`${JourneyService.totalSpeakingMinutes(safe)}`}
                />
                <Stat
                  icon={<Check className="size-4 text-primary" />}
                  label={t("prog.fullCurriculum")}
                  value={`${completedCount} / ${totalDays}`}
                />
              </div>
            </section>

            {bests.longestSeconds || bests.mostIdeas ? (
              <section className="space-y-3">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {t("prog.bests")}
                </h3>
                <div className="grid grid-cols-2 gap-3">
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

            <AllDays state={safe} />
          </div>
        </Collapsible>

        <Collapsible icon={<Trophy className="size-5 text-primary" />} label={t("prog.myBadges")}>
          <div className="space-y-6 pt-4">
            <BadgeGrid state={safe} />
            <ModuleBadgeGrid state={safe} />
          </div>
        </Collapsible>
        </>
        )}
      </div>
    </AppShell>
  );
}

function Collapsible({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <section className="rounded-3xl border border-border bg-card px-4 py-1 shadow-[var(--shadow-card)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[56px] w-full items-center gap-3 text-left"
      >
        {icon}
        <span className="min-w-0 flex-1 text-[15px] font-extrabold tracking-tight">{label}</span>
        <ChevronDown
          className={cn("size-5 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>
      {open ? <div className="pb-4">{children}</div> : null}
    </section>
  );
}

function AllDays({ state }: { state: JourneyState }) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const modules = CourseService.modules();
  const currentModuleId =
    JourneyService.nextPractice(state)?.moduleId ?? JourneyService.currentModule(state);

  return (
    <section className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[52px] w-full items-center justify-between gap-2 rounded-2xl border border-border bg-card px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
      >
        {t("prog.viewAll")}
        <ChevronDown
          className={cn("size-5 text-muted-foreground transition-transform", open && "rotate-180")}
        />
      </button>

      {open
        ? modules.map((module) => (
            <ModuleBlock
              key={module.id}
              module={module}
              state={state}
              isCurrent={module.id === currentModuleId}
            />
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

  const weeks = new Map<number, DayOutline[]>();
  for (const item of module.days) {
    const week = item.week ?? 1;
    weeks.set(week, [...(weeks.get(week) ?? []), item]);
  }

  // Same authoritative rule as Home / module route (Progression.isUnlocked).
  const status = moduleAccessStatus(state, module.id, t);
  const locked = status.locked;
  const prerequisite = Progression.prerequisiteOf(module.id);

  return (
    <div
      className={cn(
        "rounded-3xl border bg-card",
        isCurrent ? "border-primary" : "border-border",
        locked && "border-dashed bg-secondary/40 text-muted-foreground",
      )}
    >
      <button
        type="button"
        onClick={() => (locked ? undefined : setOpen((v) => !v))}
        aria-expanded={locked ? undefined : open}
        aria-disabled={locked || undefined}
        className={cn("flex min-h-[60px] w-full items-center gap-3 px-4 py-3 text-left", locked && "cursor-default")}
      >
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[14px] font-extrabold tracking-tight">
            <span className="text-primary">{module.label}</span> · {module.title}
          </span>
          <span className="block text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {done} / {total} {t("home.days")}
          </span>
          {locked && prerequisite ? (
            <span className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
              <Lock className="size-3" aria-hidden />
              {t("home.unlockAfter")} {CourseService.getModule(prerequisite).title}
            </span>
          ) : null}
        </span>
        <StatusBadge status={status} />
        {locked ? null : (
          <ChevronDown
            className={cn(
              "size-5 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180",
            )}
          />
        )}
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
  days: DayOutline[];
  state: JourneyState;
  currentDay: number;
}) {
  const t = useT();
  const doneCount = days.filter((d) =>
    JourneyService.isDayCompleted(state, moduleId, d.day),
  ).length;
  const isCurrent = days.some((d) => d.day === currentDay) && doneCount < days.length;
  const [open, setOpen] = useState(isCurrent);
  const status =
    doneCount >= days.length
      ? ({ label: t("status.complete"), tone: "done" } as const)
      : isCurrent
        ? ({ label: t("status.current"), tone: "current" } as const)
        : ({ label: t("status.upNext"), tone: "next" } as const);

  return (
    <div
      className={cn("rounded-3xl border bg-card", isCurrent ? "border-primary" : "border-border")}
    >
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
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted-foreground transition-transform",
            open && "rotate-180",
          )}
        />
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

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-card p-3 text-center shadow-[var(--shadow-card)]">
      <p className="flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {icon} {label}
      </p>
      <p className="mt-1.5 text-xl font-extrabold tabular-nums tracking-tight">{value}</p>
    </div>
  );
}
