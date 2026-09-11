import { useCallback, useEffect, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { AlertTriangle, BarChart3, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { CurrentModuleCard } from "@/components/fluency/CurrentModuleCard";
import { NextModuleLocked } from "@/components/fluency/NextModuleLocked";
import { HomeWeekCard } from "@/components/fluency/HomeWeekCard";
import { HomeGreeting } from "@/components/fluency/HomeGreeting";
import { Progression } from "@/services/progression";
import { getPendingPlacement } from "@/services/preferences";
import { isAppTourDone } from "@/routes/tutorial";

import { useAuth } from "@/lib/auth";
import { JourneyService } from "@/services/journey-service";
import type { JourneyState } from "@/lib/types";
import { useAppLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fluency App — Speak English Every Day" },
      {
        name: "description",
        content:
          "Your daily speaking practice: Basic Zero, Simple Present and Past Experiences. Five short speaking reps a day.",
      },
      { property: "og:title", content: "Fluency App — Speak English Every Day" },
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

  // App tour ("how to use the app") — shown once, after the intro is done.
  useEffect(() => {
    if (!prefs.onboardingCompleted) return;
    if (isAppTourDone()) return;
    void navigate({ to: "/tutorial" });
  }, [prefs.onboardingCompleted, navigate]);


  if (!state) {
    return (
      <AppShell hideHeader hideSync>
        <HomeSkeleton />
      </AppShell>
    );
  }

  const active = Progression.activeModuleId(state);
  const upNext = active ? Progression.entryAfter(active) : null;

  // HOME = "what do I do today?" — greeting, today's practice, weekly
  // consistency, locked next module, coach summary, beta footer.
  return (
    <AppShell hideHeader hideSync>
      <div className="space-y-5">
        <HomeGreeting />
        <CurrentModuleCard state={state} />

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

        <HomeWeekCard state={state} />

        {active && upNext ? <NextModuleLocked entry={upNext} afterModuleId={active} /> : null}

        <Link
          to="/coach-check"
          className="flex min-h-[56px] w-full items-center justify-between gap-3 rounded-2xl border border-border bg-card px-4 shadow-[var(--shadow-card)] transition-colors hover:bg-secondary"
        >
          <span className="flex items-center gap-3 text-[14px] font-bold text-foreground">
            <BarChart3 className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            {t("coach.showMyCoach")}
          </span>
          <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        </Link>

        <div className="rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            className="flex min-h-[52px] w-full items-center justify-between gap-3 px-4 text-[13px] font-bold text-foreground"
          >
            {t("home.moreMenu")}
            <ChevronDown
              className={`size-4 shrink-0 text-muted-foreground transition-transform ${menuOpen ? "rotate-180" : ""}`}
              aria-hidden
            />
          </button>
          {menuOpen ? (
            <div className="border-t border-border p-2">
              <Link
                to="/progress"
                className="flex min-h-[48px] items-center justify-between gap-3 rounded-xl px-3 text-[14px] font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <span className="flex items-center gap-3">
                  <BarChart3 className="size-5 shrink-0 text-muted-foreground" aria-hidden />
                  {t("home.myProgress")}
                </span>
                <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              </Link>
            </div>
          ) : null}
        </div>

        <p className="flex items-center justify-center gap-1.5 pb-2 text-[12px] font-semibold text-muted-foreground">
          <AlertTriangle className="size-3.5 shrink-0" aria-hidden />
          {t("report.betaShort")} ·{" "}
          <Link to="/report" className="font-bold text-primary underline underline-offset-2">
            {t("report.reportLink")}
          </Link>
        </p>
      </div>
    </AppShell>
  );
}

function HomeSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="h-56 animate-pulse rounded-3xl bg-secondary" />
      <div className="h-12 animate-pulse rounded-2xl bg-secondary" />
      <div className="h-40 animate-pulse rounded-3xl bg-secondary" />
    </div>
  );
}
