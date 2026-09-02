import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Ear, Mic, Repeat, Sparkles, User } from "lucide-react";
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
      { title: "Empieza aquí — Fluency Reps" },
      {
        name: "description",
        content: "Cómo funciona Fluency Reps: 5 reps de speaking al día, 6–9 minutos, tu voz en inglés cada día.",
      },
      { property: "og:title", content: "Empieza aquí — Fluency Reps" },
      { property: "og:description", content: "5 reps de speaking al día en 6–9 minutos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OnboardingPage,
});

const STEPS = [
  { en: "LISTEN", es: "Escucha.", icon: Ear },
  { en: "COPY", es: "Repite el modelo.", icon: Repeat },
  { en: "SHADOW", es: "Habla junto con el audio.", icon: Mic },
  { en: "MAKE IT YOURS", es: "Hazlo personal.", icon: User },
  { en: "YOUR TURN", es: "Habla por tu cuenta.", icon: Sparkles },
] as const;

const STEPS_EN = [
  "Listen.",
  "Copy the model.",
  "Speak along with the audio.",
  "Make it personal.",
  "Speak on your own.",
] as const;

function OnboardingPage() {
  const navigate = useNavigate();
  const { t, lang, prefs, setPrefs } = useAppLang();
  const { user } = useAuth();
  const [screen, setScreen] = useState(0);
  const [placement, setPlacement] = useState<ModuleId | null>(() => getPendingPlacement()?.moduleId ?? null);

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
    const first = CourseService.modules()[0];
    void navigate({ to: "/practice", search: { day: 1, module: placement ?? first?.id ?? "basic-zero" } });
  };

  return (
    <div className="flex min-h-screen flex-col bg-background px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1.5rem,env(safe-area-inset-top))]">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col">
        <div className="flex items-center gap-2" aria-hidden>
          {[0, 1, 2, 3, 4].map((i) => (
            <span
              key={i}
              className={cn("h-1.5 flex-1 rounded-full", i <= screen ? "bg-primary" : "bg-secondary")}
            />
          ))}
        </div>

        <div className="flex flex-1 flex-col justify-center py-6">
          {screen === 0 ? (
            <section className="space-y-5 text-center">
              <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Mic className="size-10" />
              </div>
              <h1 className="text-[30px] font-extrabold leading-tight tracking-tight">{t("onb.1.title")}</h1>
              <p className="text-[16px] font-semibold text-muted-foreground">{t("onb.1.body")}</p>
              <p className="text-[13px] font-bold uppercase tracking-[0.14em] text-primary">{t("onb.1.mic")}</p>
            </section>
          ) : null}

          {screen === 1 ? (
            <section className="space-y-4">
              <h1 className="text-center text-[28px] font-extrabold leading-tight tracking-tight">
                {t("onb.2.title")}
              </h1>
              <ul className="space-y-2.5">
                {STEPS.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <li
                      key={step.en}
                      className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5"
                    >
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Icon className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[15px] font-extrabold uppercase tracking-tight">{step.en}</span>
                        <span className="block text-[13px] text-muted-foreground">
                          {lang === "es" ? step.es : STEPS_EN[index]}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="text-center text-[14px] font-bold text-primary">{t("onb.2.time")}</p>
            </section>
          ) : null}

          {screen === 2 ? (
            <section className="space-y-5 text-center">
              <h1 className="text-[28px] font-extrabold leading-tight tracking-tight">{t("onb.3.title")}</h1>
              <ul className="space-y-2 text-[16px] font-semibold">
                <li>✓ {t("onb.3.b1")}</li>
                <li>✓ {t("onb.3.b2")}</li>
                <li>✓ {t("onb.3.b3")}</li>
              </ul>
              <p className="rounded-2xl bg-card p-4 text-[14px] text-muted-foreground shadow-[var(--shadow-card)]">
                {t("onb.3.streak")}
              </p>
            </section>
          ) : null}
          {screen === 3 ? <PlacementPicker value={placement} onSelect={choosePlacement} /> : null}
          {screen === 4 ? (
            <section className="space-y-4">
              <AuthGate />
            </section>
          ) : null}
        </div>

        <div className="space-y-3">
          {screen === 3 ? (
            <>
              <button
                type="button"
                disabled={!placement}
                onClick={() => (user ? void confirmSignedInPlacement() : setScreen(4))}
                className="min-h-[56px] w-full rounded-2xl bg-primary px-6 text-[16px] font-bold tracking-wide text-primary-foreground active:scale-[0.98] disabled:opacity-40"
              >
                {t("action.next")}
              </button>
              <button
                type="button"
                onClick={() => setScreen(2)}
                className="min-h-[48px] w-full rounded-2xl border border-border px-6 text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {t("action.back")}
              </button>
            </>
          ) : screen === 4 ? (
            user ? (
              <button
                type="button"
                onClick={() => finish("day1")}
                className="min-h-[56px] w-full rounded-2xl bg-primary px-6 text-[16px] font-bold tracking-wide text-primary-foreground active:scale-[0.98]"
              >
                {t("action.startDay1")}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => finish("explore")}
                className="min-h-[48px] w-full rounded-2xl border border-border px-6 text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {t("onb.explore")}
              </button>
            )
          ) : screen < 2 ? (
            <>
              <button
                type="button"
                onClick={() => setScreen((s) => s + 1)}
                className="min-h-[56px] w-full rounded-2xl bg-primary px-6 text-[16px] font-bold tracking-wide text-primary-foreground active:scale-[0.98]"
              >
                {t("action.next")}
              </button>
              <button
                type="button"
                onClick={() => finish("explore")}
                className="min-h-[48px] w-full rounded-2xl border border-border px-6 text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {t("action.skip")}
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => (user && prefs.currentModuleId ? finish("day1") : setScreen(3))}
                className="min-h-[56px] w-full rounded-2xl bg-primary px-6 text-[16px] font-bold tracking-wide text-primary-foreground active:scale-[0.98]"
              >
                {user ? t("action.startDay1") : t("action.next")}
              </button>
              <button
                type="button"
                onClick={() => finish("explore")}
                className="min-h-[48px] w-full rounded-2xl border border-border px-6 text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {t("onb.explore")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
