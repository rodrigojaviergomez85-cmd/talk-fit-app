import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, BookOpen, CheckCircle2, Clapperboard, Home, Mic, Tv } from "lucide-react";
import { CourseService } from "@/services/course-service";
import { useAppLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { AuthGate } from "@/components/fluency/AuthGate";
import { PlacementPicker } from "@/components/fluency/PlacementPicker";
import { getPendingPlacement, setPendingPlacement } from "@/services/preferences";
import type { ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Empieza aquí — Fluency App" },
      {
        name: "description",
        content: "El método E4CC: Natural Method, Teachable y Fluency App. 3–5 audios al día en 5–10 minutos.",
      },
      { property: "og:title", content: "Empieza aquí — Fluency App" },
      { property: "og:description", content: "El método E4CC en 3 pasos: vocabulario, refuerzo y speaking diario." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OnboardingPage,
});

const METHOD_SCREENS = 6;
const PLACEMENT_SCREEN = 6;
const AUTH_SCREEN = 7;
const TOTAL_DOTS = 8;

/* ---------- small presentational helpers ---------- */

function Title({ children }: { children: ReactNode }) {
  return <h1 className="text-center text-[26px] font-extrabold leading-tight tracking-tight">{children}</h1>;
}

function Mantra({ children, big }: { children: ReactNode; big?: boolean }) {
  return (
    <p
      className={cn(
        "text-center font-extrabold uppercase tracking-[0.12em] text-primary",
        big ? "text-[18px]" : "text-[13px]",
      )}
    >
      {children}
    </p>
  );
}

function TimePill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[14px] font-extrabold tracking-wide text-primary-foreground">
      ⏱️ {children}
    </span>
  );
}

function StatCard({ value, label }: { value: string; label?: string }) {
  return (
    <div className="rounded-2xl bg-card p-4 text-center shadow-[var(--shadow-card)]">
      <p className="text-[24px] font-extrabold leading-none tracking-tight text-primary">{value}</p>
      {label ? <p className="mt-1.5 text-[12px] font-semibold text-muted-foreground">{label}</p> : null}
    </div>
  );
}

function ArrowFlow({ items }: { items: string[] }) {
  return (
    <ol className="flex flex-col items-center gap-1">
      {items.map((item, i) => (
        <li key={item} className="flex flex-col items-center gap-1">
          {i > 0 ? <ArrowDown className="size-4 text-primary" aria-hidden /> : null}
          <span className="rounded-xl border border-border bg-card px-3 py-1.5 text-center text-[13px] font-extrabold uppercase tracking-tight">
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

function ChipFlow({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap items-center justify-center gap-1.5">
      {items.map((item, i) => (
        <li key={item} className="flex items-center gap-1.5">
          {i > 0 ? <ArrowRight className="size-3.5 text-primary" aria-hidden /> : null}
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[12px] font-extrabold uppercase tracking-tight text-primary">
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function IconRow({ icon: Icon, label }: { icon: typeof Tv; label: string }) {
  return (
    <li className="flex items-center gap-3 rounded-2xl border border-border bg-card px-3.5 py-2.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
        <Icon className="size-4.5" />
      </span>
      <span className="text-[14px] font-extrabold uppercase tracking-tight">{label}</span>
    </li>
  );
}

function RoutineStep({
  n,
  icon: Icon,
  title,
  action,
  time,
}: {
  n: number;
  icon: typeof Tv;
  title: string;
  action: string;
  time: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-[15px] font-extrabold text-primary-foreground">
        {n}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-extrabold uppercase tracking-tight">{title}</p>
        <p className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
          <Icon className="size-3.5 shrink-0 text-primary" aria-hidden />
          {action}
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-[12px] font-extrabold text-primary">
        ⏱️ {time}
      </span>
    </div>
  );
}

function TimelineRow({
  time,
  icon: Icon,
  title,
  lines,
}: {
  time: string;
  icon: typeof Tv;
  title: string;
  lines: string[];
}) {
  return (
    <li className="relative flex gap-3 pl-1">
      <div className="flex w-16 shrink-0 flex-col items-start">
        <span className="text-[13px] font-extrabold text-primary">{time}</span>
      </div>
      <div className="min-w-0 flex-1 rounded-2xl border border-border bg-card p-3">
        <p className="flex items-center gap-1.5 text-[14px] font-extrabold uppercase tracking-tight">
          <Icon className="size-4 text-primary" aria-hidden />
          {title}
        </p>
        {lines.map((l) => (
          <p key={l} className="mt-0.5 text-[13px] text-muted-foreground">
            {l}
          </p>
        ))}
      </div>
    </li>
  );
}

/* ---------- page ---------- */

function OnboardingPage() {
  const navigate = useNavigate();
  const { t, prefs, setPrefs } = useAppLang();
  const { user } = useAuth();
  const [screen, setScreen] = useState(0);
  const [placement, setPlacement] = useState<ModuleId | null>(null);

  // Restore a choice made before an OAuth redirect (client-only storage).
  useEffect(() => {
    setPlacement(getPendingPlacement()?.moduleId ?? null);
  }, []);

  const choosePlacement = (moduleId: ModuleId) => {
    setPlacement(moduleId);
    // Pre-auth: kept locally until the account exists and the backend confirms.
    setPendingPlacement(moduleId);
  };

  /** Already signed in (e.g. via Mi Cuenta) but never placed: persist, then start. */
  const confirmSignedInPlacement = async () => {
    const { CloudSync } = await import("@/services/cloud-sync");
    const result = await CloudSync.applyPendingPlacement();
    if (result === "failed") return;
    finish("day1");
  };

  const finish = (to: "day1" | "explore") => {
    setPrefs({ onboardingCompleted: true });
    if (to === "explore") {
      void navigate({ to: "/" });
      return;
    }
    // Existing learners (already placed) go back to Home, which points to their saved position.
    if (!placement && prefs.currentModuleId) {
      void navigate({ to: "/" });
      return;
    }
    const first = CourseService.modules()[0];
    void navigate({ to: "/practice", search: { day: 1, module: placement ?? first?.id ?? "basic-zero" } });
  };

  const primaryBtn =
    "min-h-[56px] w-full rounded-2xl bg-primary px-6 text-[16px] font-bold tracking-wide text-primary-foreground active:scale-[0.98] disabled:opacity-40";
  const secondaryBtn =
    "min-h-[48px] w-full rounded-2xl border border-border px-6 text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground";

  return (
    <div className="flex min-h-screen flex-col bg-background px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col">
        <div className="flex items-center gap-1.5" aria-hidden>
          {Array.from({ length: TOTAL_DOTS }, (_, i) => (
            <span
              key={i}
              className={cn("h-1.5 flex-1 rounded-full", i <= screen ? "bg-primary" : "bg-secondary")}
            />
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-center py-5">
          {screen === 0 ? (
            <section className="space-y-4 text-center">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.28em] text-primary">{t("onb.s1.kicker")}</p>
              <Title>{t("onb.s1.title")}</Title>
              <p className="text-[15px] font-semibold text-muted-foreground">{t("onb.s1.body")}</p>
              <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{t("onb.s1.work")}</p>
              <div className="flex items-center justify-center gap-2">
                {[t("onb.s1.p1"), t("onb.s1.p2"), t("onb.s1.p3")].map((p, i) => (
                  <div key={p} className="flex items-center gap-2">
                    {i > 0 ? <span className="text-[18px] font-extrabold text-primary">+</span> : null}
                    <span className="rounded-xl bg-card px-3 py-2 text-[13px] font-extrabold uppercase tracking-tight shadow-[var(--shadow-card)]">
                      {p}
                    </span>
                  </div>
                ))}
              </div>
              <Mantra big>{t("onb.m.canDo")} 💪</Mantra>
              <p className="text-[14px] font-semibold text-muted-foreground">
                {t("onb.s1.l1")}
                <br />
                {t("onb.s1.l2")}
              </p>
            </section>
          ) : null}

          {screen === 1 ? (
            <section className="space-y-3.5">
              <Title>{t("onb.s2.title")}</Title>
              <p className="text-center text-[15px] font-semibold text-muted-foreground">{t("onb.s2.body")}</p>
              <StatCard value={t("onb.s2.stat")} />
              <div className="flex flex-col items-center gap-1.5">
                <TimePill>{t("onb.s2.time")}</TimePill>
                <p className="text-[12px] font-semibold text-muted-foreground">{t("onb.s2.timeLabel")}</p>
              </div>
              <ul className="space-y-1.5">
                <IconRow icon={Clapperboard} label={t("onb.s2.c1")} />
                <IconRow icon={Tv} label={t("onb.s2.c2")} />
                <IconRow icon={Home} label={t("onb.s2.c3")} />
              </ul>
              <ArrowFlow items={[t("onb.s2.f1"), t("onb.s2.f2"), t("onb.s2.f3")]} />
              <p className="text-center text-[14px] font-bold">{t("onb.s2.line")}</p>
              <Mantra>{t("onb.m.mistakes")}</Mantra>
            </section>
          ) : null}

          {screen === 2 ? (
            <section className="space-y-5 text-center">
              <Title>{t("onb.s3.title")}</Title>
              <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="size-8" />
              </div>
              <p className="text-[15px] font-semibold text-muted-foreground">{t("onb.s3.body")}</p>
              <div>
                <TimePill>{t("onb.s3.time")}</TimePill>
              </div>
              <p className="rounded-2xl bg-card p-4 text-[14px] font-semibold text-muted-foreground shadow-[var(--shadow-card)]">
                {t("onb.s3.l1")}
                <br />
                {t("onb.s3.l2")}
              </p>
              <Mantra big>{t("onb.s3.close")}</Mantra>
            </section>
          ) : null}

          {screen === 3 ? (
            <section className="space-y-3.5">
              <Title>{t("onb.s4.title")}</Title>
              <p className="text-center text-[15px] font-semibold text-muted-foreground">{t("onb.s4.body")}</p>
              <p className="text-center text-[15px] font-semibold">
                {t("onb.s4.for")} <span className="font-extrabold text-primary">{t("onb.s4.forStrong")}</span>
              </p>
              <div className="grid grid-cols-2 gap-2">
                <StatCard value={`🎙️ ${t("onb.s4.audios")}`} />
                <StatCard value={`⏱️ ${t("onb.s4.time")}`} />
              </div>
              <p className="text-center text-[14px] font-semibold text-muted-foreground">{t("onb.s4.purpose")}</p>
              <ChipFlow items={[t("onb.s4.p1"), t("onb.s4.p2"), t("onb.s4.p3"), t("onb.s4.p4")]} />
              <div className="space-y-1 rounded-2xl bg-card p-3.5 text-center shadow-[var(--shadow-card)]">
                <p className="text-[13px] font-semibold text-muted-foreground">{t("onb.s4.fear")}</p>
                <Mantra>{t("onb.m.mistakes")}</Mantra>
                <p className="text-[15px] font-extrabold uppercase tracking-[0.08em]">{t("onb.m.speak")}</p>
              </div>
            </section>
          ) : null}

          {screen === 4 ? (
            <section className="space-y-3">
              <Title>{t("onb.s5.title")}</Title>
              <div className="space-y-1">
                <RoutineStep n={1} icon={Clapperboard} title={t("onb.s5.r1")} action={t("onb.s5.r1a")} time={t("onb.s5.r1t")} />
                <ArrowDown className="mx-auto size-4 text-primary" aria-hidden />
                <RoutineStep n={2} icon={CheckCircle2} title={t("onb.s5.r2")} action={t("onb.s5.r2a")} time={t("onb.s5.r2t")} />
                <ArrowDown className="mx-auto size-4 text-primary" aria-hidden />
                <RoutineStep n={3} icon={Mic} title={t("onb.s5.r3")} action={t("onb.s5.r3a")} time={t("onb.s5.r3t")} />
                <ArrowDown className="mx-auto size-4 text-primary" aria-hidden />
                <p className="text-center text-[15px] font-extrabold uppercase tracking-[0.1em] text-primary">
                  {t("onb.s5.repeat")}
                </p>
              </div>
              <p className="text-center text-[14px] font-semibold text-muted-foreground">{t("onb.s5.habit")}</p>
              <p className="text-center text-[14px] font-bold">{t("onb.s5.goal")}</p>
              <Mantra>{t("onb.s5.one")}</Mantra>
            </section>
          ) : null}

          {screen === 5 ? (
            <section className="space-y-3.5">
              <Title>{t("onb.s6.title")}</Title>
              <ol className="space-y-2">
                <TimelineRow icon={Clapperboard} time={t("onb.s6.t1")} title={t("onb.s5.r1")} lines={[t("onb.s6.t1a"), t("onb.s6.t1b")]} />
                <TimelineRow icon={CheckCircle2} time={t("onb.s6.t2")} title={t("onb.s5.r2")} lines={[t("onb.s6.t2a")]} />
                <TimelineRow icon={Mic} time={t("onb.s6.t3")} title={t("onb.s5.r3")} lines={[t("onb.s6.t3a")]} />
              </ol>
              <div className="space-y-0.5 rounded-2xl bg-card p-4 text-center shadow-[var(--shadow-card)]">
                <p className="text-[16px] font-extrabold uppercase tracking-[0.08em]">{t("onb.s6.done")}</p>
                <p className="text-[14px] font-semibold text-muted-foreground">{t("onb.s6.great")}</p>
                <p className="text-[14px] font-semibold text-muted-foreground">{t("onb.s6.see")}</p>
              </div>
              <Mantra big>{t("onb.m.canDo")} 🔥</Mantra>
            </section>
          ) : null}

          {screen === PLACEMENT_SCREEN ? <PlacementPicker value={placement} onSelect={choosePlacement} initialPlacement /> : null}
          {screen === AUTH_SCREEN ? (
            <section className="space-y-4">
              <AuthGate />
            </section>
          ) : null}
        </div>

        <div className="space-y-3">
          {screen === PLACEMENT_SCREEN ? (
            <>
              <button
                type="button"
                disabled={!placement}
                onClick={() => (user ? void confirmSignedInPlacement() : setScreen(AUTH_SCREEN))}
                className={primaryBtn}
              >
                {t("action.next")}
              </button>
              <button type="button" onClick={() => setScreen(METHOD_SCREENS - 1)} className={secondaryBtn}>
                {t("action.back")}
              </button>
            </>
          ) : screen === AUTH_SCREEN ? (
            user ? (
              <button type="button" onClick={() => finish("day1")} className={primaryBtn}>
                {t("action.startDay1")}
              </button>
            ) : (
              <button type="button" onClick={() => finish("explore")} className={secondaryBtn}>
                {t("onb.explore")}
              </button>
            )
          ) : screen < METHOD_SCREENS - 1 ? (
            <>
              <button type="button" onClick={() => setScreen((s) => s + 1)} className={primaryBtn}>
                {t("action.next")} →
              </button>
              <button type="button" onClick={() => finish("explore")} className={secondaryBtn}>
                {t("action.skip")}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => (user && prefs.currentModuleId ? finish("day1") : setScreen(PLACEMENT_SCREEN))}
                className={primaryBtn}
              >
                {user && prefs.currentModuleId ? t("action.startDay1") : t("action.startJourney")}
              </button>
              <button type="button" onClick={() => finish("explore")} className={secondaryBtn}>
                {t("onb.explore")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
