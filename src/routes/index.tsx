import { useCallback, useEffect, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, ChevronRight, Flame, Mic, Repeat, Timer } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { ContinueCard } from "@/components/fluency/ContinueCard";
import { CourseService, type LearningModule } from "@/services/course-service";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import type { JourneyState, ModuleId } from "@/lib/types";
import { StatusBadge, type ProgressStatus } from "@/components/fluency/StatusBadge";
import { cn } from "@/lib/utils";
import { useAppLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fluency Reps — Speak English Every Day" },
      {
        name: "description",
        content:
          "Your daily speaking practice: Basic Zero, Simple Present and Past Experiences. Five short speaking reps a day.",
      },
      { property: "og:title", content: "Fluency Reps — Speak English Every Day" },
      { property: "og:description", content: "Five short speaking reps a day. Listen, copy, shadow, personalize, record." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [state, setState] = useState<JourneyState | null>(null);
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();
  const { t, prefs } = useAppLang();

  const load = useCallback(() => {
    setFailed(false);
    const local = JourneyService.load();
    setState(local);
    void JourneyService.pull()
      .then(setState)
      .catch(() => setFailed(true));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // First-time learners see the 3-screen intro once; active learners never do.
  useEffect(() => {
    if (!state) return;
    if (prefs.onboardingCompleted) return;
    if (JourneyService.completedCount(state) > 0) return;
    void navigate({ to: "/onboarding" });
  }, [state, prefs.onboardingCompleted, navigate]);

  const modules = [...CourseService.modules()].sort((a, b) => a.order - b.order);

  if (!state) {
    return (
      <AppShell title={t("home.today")}>
        <HomeSkeleton />
      </AppShell>
    );
  }

  const next = JourneyService.nextPractice(state);
  const totalDays = CourseService.totalDaysAll();
  const completed = JourneyService.completedCount(state);

  return (
    <AppShell title={t("home.today")}>
      <div className="space-y-6">
        <ContinueCard state={state} />

        {failed ? (
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-[13px] font-semibold text-muted-foreground">{t("home.loadFailed")}</p>
            <button
              type="button"
              onClick={load}
              className="mt-3 min-h-[44px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
            >
              {t("action.tryAgain")}
            </button>
          </div>
        ) : null}

        <section className="grid grid-cols-2 gap-3">
          <Stat icon={<Flame className="size-4 text-primary" />} label={t("home.streak")} value={`${state.streakDays || 0} ${t("home.days")}`} />
          <Stat
            icon={<Timer className="size-4 text-primary" />}
            label={t("home.speakingTime")}
            value={`${JourneyService.totalSpeakingMinutes(state) || 0} min`}
          />
          <Stat icon={<Check className="size-4 text-primary" />} label={t("home.daysCompleted")} value={`${completed} / ${totalDays}`} />
          <Stat icon={<Repeat className="size-4 text-primary" />} label={t("home.reps")} value={`${state.totalRepsCompleted || 0}`} />
        </section>

        <section className="space-y-3">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{t("home.journey")}</h2>
          {modules.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              state={state}
              currentModule={next?.moduleId ?? null}
            />
          ))}
        </section>
      </div>
    </AppShell>
  );
}

function moduleStatus(
  module: LearningModule,
  state: JourneyState,
  currentModule: ModuleId | null,
  t: (key: "status.complete" | "status.current" | "status.upNext") => string,
): ProgressStatus {
  if (JourneyService.moduleComplete(state, module.id)) return { label: t("status.complete"), tone: "done" };
  if (currentModule === module.id) return { label: t("status.current"), tone: "current" };
  return { label: t("status.upNext"), tone: "next" };
}

function ModuleCard({
  module,
  state,
  currentModule,
}: {
  module: LearningModule;
  state: JourneyState;
  currentModule: ModuleId | null;
}) {
  const t = useT();
  const total = module.days.length;
  const completedCount = JourneyService.completedCount(state, module.id);
  const percent = total > 0 ? Math.round((completedCount / total) * 100) : 0;
  const status = moduleStatus(module, state, currentModule, t);

  return (
    <Link to="/module/$moduleId" params={{ moduleId: module.id }} className="block transition-transform active:scale-[0.99]">
      <div
        className={cn(
          "rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]",
          status.tone === "current" ? "border-primary" : "border-border",
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {module.label.split(" · ")[0]}
            </p>
            <h3 className="mt-1 text-[19px] font-extrabold leading-tight tracking-tight">{module.title}</h3>
            <p className="mt-1 text-[13px] font-semibold text-muted-foreground">{module.subtitle}</p>
          </div>
          <ChevronRight className="mt-1 size-5 shrink-0 text-muted-foreground" />
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {completedCount} / {total} {t("home.days")}
          </p>
          <StatusBadge status={status} />
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className={cn("h-full rounded-full transition-all", status.tone === "done" ? "bg-success" : "bg-primary")}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </Link>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-card p-4 text-center shadow-[var(--shadow-card)]">
      <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {icon} {label}
      </p>
      <p className="mt-1.5 text-[20px] font-extrabold tabular-nums tracking-tight">{value}</p>
    </div>
  );
}

function HomeSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="h-56 animate-pulse rounded-3xl bg-secondary" />
      <div className="grid grid-cols-2 gap-3">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-20 animate-pulse rounded-3xl bg-secondary" />
        ))}
      </div>
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-32 animate-pulse rounded-3xl bg-secondary" />
        ))}
      </div>
    </div>
  );
}
