import { useCallback, useEffect, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Check, Flame, Repeat, Timer } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { CurrentModuleCard } from "@/components/fluency/CurrentModuleCard";
import { NextModuleLocked } from "@/components/fluency/NextModuleLocked";
import { HabitCard } from "@/components/fluency/HabitCard";
import { CourseService } from "@/services/course-service";
import { Progression } from "@/services/progression";
import { getPendingPlacement } from "@/services/preferences";
import { useAuth } from "@/lib/auth";
import { JourneyService } from "@/services/journey-service";
import type { JourneyState } from "@/lib/types";
import { useAppLang } from "@/lib/i18n";

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
  const { user, sync, loading: authLoading } = useAuth();

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

  // First-time learners see the intro + placement once; active learners never do.
  useEffect(() => {
    if (!state) return;
    if (prefs.onboardingCompleted) return;
    if (prefs.currentModuleId) return;
    if (JourneyService.completedCount(state) > 0) return;
    // Right after sign-in the backend restore may still be running, and a
    // pending placement means onboarding already happened on this device.
    if (authLoading) return;
    if (user && sync !== "ready" && sync !== "failed") return;
    if (getPendingPlacement()) return;
    void navigate({ to: "/onboarding" });
  }, [state, prefs.onboardingCompleted, prefs.currentModuleId, user, sync, authLoading, navigate]);

  if (!state) {
    return (
      <AppShell title={t("home.today")}>
        <HomeSkeleton />
      </AppShell>
    );
  }

  const active = Progression.activeModuleId(state);
  const upNext = active ? Progression.entryAfter(active) : null;
  const totalDays = CourseService.totalDaysAll();
  const completed = JourneyService.completedCount(state);

  return (
    <AppShell title={t("home.today")}>
      <div className="space-y-6">
        <CurrentModuleCard state={state} />
        <Link
          to="/coach-check"
          className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-foreground transition-colors hover:bg-secondary"
        >
          <span aria-hidden="true">👨‍🏫</span> {t("coach.showMyCoach")}
        </Link>
        <HabitCard state={state} />

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

        {active && upNext ? <NextModuleLocked entry={upNext} afterModuleId={active} /> : null}
      </div>
    </AppShell>
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
      <div className="h-32 animate-pulse rounded-3xl bg-secondary" />
    </div>
  );
}
