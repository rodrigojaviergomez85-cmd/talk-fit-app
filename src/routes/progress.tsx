import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, ChevronDown, Mic, Timer } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { StatusBadge } from "@/components/fluency/StatusBadge";
import { ModuleHeading } from "@/components/fluency/ModuleHeading";
import { SpeakingChart } from "@/components/fluency/SpeakingChart";
import { BadgeGrid } from "@/components/fluency/BadgeGrid";
import { HABIT_GOAL, habitDays, habitDisplay } from "@/lib/habit";
import { CourseService, type DayOutline } from "@/services/course-service";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import type { JourneyState, ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/progress")({
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
  const currentModuleId = next?.moduleId ?? JourneyService.currentModule(safe);
  const currentIndex = CourseService.displayIndex(currentModuleId);
  const forward = modules.filter((m) => CourseService.displayIndex(m.id) >= currentIndex);
  const review = modules.filter((m) => CourseService.displayIndex(m.id) < currentIndex);
  const bests = JourneyService.personalBests(safe);
  const series = useMemo(() => JourneyService.speakingSeries(safe), [safe]);
  const habitCount = habitDays(safe);
  const habit = habitDisplay(habitCount);
  const habitPercent = Math.round((habit.shown / HABIT_GOAL) * 100);

  if (!state) {
    return (
      <AppShell title={t("prog.title")}>
        <div className="space-y-3" aria-busy="true">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-3xl bg-secondary" />
          ))}
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title={t("prog.title")}>
      <div className="space-y-6">
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

        {/* This week */}
        <section className="rounded-3xl bg-card p-4 shadow-[var(--shadow-card)]">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {t("prog.thisWeek")}
          </h2>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <WeekStat value={`${week.days} / 5`} label={t("prog.days")} />
            <WeekStat value={`${week.reps}`} label={t("home.reps")} />
            <WeekStat value={`${week.minutes}`} label={t("prog.minutes")} />
          </div>
        </section>

        {/* 66-day journey — compact accumulated view (the motivational card is on Home) */}
        <section className="rounded-3xl bg-card p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-baseline justify-between gap-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {t("prog.journey66")}
            </h2>
            <p className="text-[15px] font-extrabold tabular-nums tracking-tight">
              {habit.complete ? (
                <>
                  66 / {HABIT_GOAL} <span className="text-success">✓</span>
                </>
              ) : (
                `${habit.shown} / ${HABIT_GOAL}`
              )}
            </p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
            <div
              className={cn("h-full rounded-full transition-all", habit.complete ? "bg-success" : "bg-primary")}
              style={{ width: `${habitPercent}%` }}
            />
          </div>
          <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {habitCount} {t("prog.practiceDays")}
          </p>
        </section>

        {/* Totals */}
        <section className="space-y-3">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {t("prog.totals")}
          </h2>
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

        {/* Speaking output over time (numbers only — playback lives in Recordings) */}
        <SpeakingChart data={series} />

        {/* Personal bests */}
        {bests.longestSeconds || bests.mostIdeas ? (
          <section className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {t("prog.bests")}
            </h2>
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

        {/* Forward journey, then earlier modules as optional review */}
        <section className="space-y-3">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {t("prog.myJourney")}
          </h2>
          {forward.map((module) => (
            <ModuleRow key={module.id} module={module} state={safe} />
          ))}
        </section>
        {review.length ? (
          <section className="space-y-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {t("prog.review")}
            </h2>
            {review.map((module) => (
              <ModuleRow key={module.id} module={module} state={safe} />
            ))}
          </section>
        ) : null}

        <BadgeGrid state={safe} />

        <AllDays state={safe} />
      </div>
    </AppShell>
  );
}

type AccessStatus = { label: string; tone: "done" | "current" | "next"; locked: boolean };

/**
 * One source of truth for module access on this page: JourneyService.moduleStatus
 * (done / current / review) plus Progression.isUnlocked for anything ahead.
 * Never inferred from display order or a "next" label.
 */
function moduleAccessStatus(state: JourneyState, moduleId: ModuleId, t: ReturnType<typeof useT>): AccessStatus {
  const kind = JourneyService.moduleStatus(state, moduleId);
  if (kind === "done") return { label: t("status.complete"), tone: "done", locked: false };
  if (kind === "current") return { label: t("status.current"), tone: "current", locked: false };
  if (kind === "review") return { label: t("status.review"), tone: "next", locked: false };
  if (!Progression.isUnlocked(state, moduleId)) return { label: t("status.locked"), tone: "next", locked: true };
  return { label: t("status.upNext"), tone: "next", locked: false };
}

function ModuleRow({
  module,
  state,
}: {
  module: ReturnType<typeof CourseService.modules>[number];
  state: JourneyState;
}) {
  const t = useT();
  const done = JourneyService.completedCount(state, module.id);
  const total = module.days.length;
  const status = moduleAccessStatus(state, module.id, t);
  const prerequisite = Progression.prerequisiteOf(module.id);

  const body = (
    <>
      <div className="flex items-start justify-between gap-3">
        <ModuleHeading module={module} size="sm" />
        <StatusBadge status={status} />
      </div>
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
            <Lock className="size-3.5" aria-hidden /> {t("home.unlockAfter")} {CourseService.getModule(prerequisite).title}
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

function WeekStat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-xl font-extrabold tabular-nums tracking-tight">{value}</p>
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
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
