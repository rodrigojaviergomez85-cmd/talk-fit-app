import { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CourseService } from "@/services/course-service";
import { useAppLang } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { useIsInstalledPwa } from "@/lib/pwa";
import { AuthGate } from "@/components/fluency/AuthGate";
import { PlacementPicker } from "@/components/fluency/PlacementPicker";
import { getPendingPlacement, setPendingPlacement, weekStartDay } from "@/services/preferences";
import type { ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";
import slide1Asset from "@/assets/onboarding/slide-40.png.asset.json";
import slide2Asset from "@/assets/onboarding/slide-41.png.asset.json";
import slide3Asset from "@/assets/onboarding/slide-42.png.asset.json";
import slide4Asset from "@/assets/onboarding/slide-43.png.asset.json";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Empieza aquí — Fluency App" },
      {
        name: "description",
        content:
          "Graba tus audios, prepárate para entrevistas y practica la tarea del día de E4CC.",
      },
      { property: "og:title", content: "Empieza aquí — Fluency App" },
      {
        property: "og:description",
        content: "Graba tus audios, prepárate para entrevistas y practica la tarea del día.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OnboardingPage,
});

const SLIDE_COUNT = 4;
const PLACEMENT_SCREEN = 4;
const WEEK_SCREEN = 5;
const AUTH_SCREEN = 6;

const SLIDES = [
  { img: slide1Asset.url, title: "onb.slide1.title", body: "onb.slide1.body", cta: "onb.slide1.cta" },
  { img: slide2Asset.url, title: "onb.slide2.title", body: "onb.slide2.body", cta: "action.next" },
  { img: slide3Asset.url, title: "onb.slide3.title", body: "onb.slide3.body", sub: "onb.slide3.sub", cta: "action.next" },
  { img: slide4Asset.url, title: "onb.slide4.title", body: "onb.slide4.body", cta: "onb.slide4.cta" },
] as const;

function OnboardingPage() {
  const navigate = useNavigate();
  const { t, prefs, setPrefs } = useAppLang();
  const { user } = useAuth();
  const installedPwa = useIsInstalledPwa();
  const [screen, setScreen] = useState(0);
  const [placement, setPlacement] = useState<ModuleId | null>(null);
  const [week, setWeek] = useState<number>(1);
  const [pendingChoice, setPendingChoice] = useState<ModuleId | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(false);

  // Restore a choice made before an OAuth redirect (client-only storage).
  useEffect(() => {
    const pending = getPendingPlacement();
    setPlacement(pending?.moduleId ?? null);
    setWeek(pending?.week ?? 1);
  }, []);

  const choosePlacement = (moduleId: ModuleId) => {
    setSaveError(false);
    setPendingChoice(moduleId);
  };

  /** Level confirmed in the modal: now ask which week they are on. */
  const confirmChoice = (moduleId: ModuleId) => {
    setPlacement(moduleId);
    setPendingChoice(null);
    setSaveError(false);
    setScreen(WEEK_SCREEN);
  };

  /** Week chosen: persist level + week, then go to auth or straight to practice. */
  const confirmWeek = async (chosenWeek: number) => {
    if (!placement) return;
    setWeek(chosenWeek);
    setSaveError(false);
    // Pre-auth: kept locally until the account exists and the backend confirms.
    setPendingPlacement(placement, chosenWeek);
    if (!user) {
      setScreen(AUTH_SCREEN);
      return;
    }
    setSaving(true);
    const { CloudSync } = await import("@/services/cloud-sync");
    const result = await CloudSync.applyPendingPlacement();
    setSaving(false);
    if (result === "failed") {
      setSaveError(true);
      return;
    }
    finish("practice", placement, chosenWeek);
  };

  /** Retry after a failed save (used by the banner on the week/auth screens). */
  const retrySave = async () => {
    if (!placement) return;
    setSaving(true);
    setSaveError(false);
    const { CloudSync } = await import("@/services/cloud-sync");
    const result = await CloudSync.applyPendingPlacement();
    setSaving(false);
    if (result === "failed") {
      setSaveError(true);
      return;
    }
    finish("practice", placement, week);
  };

  // Account just created after choosing level + week: enroll and start practice.
  const enrolled = useRef(false);
  useEffect(() => {
    if (screen !== AUTH_SCREEN || !user || !placement || enrolled.current) return;
    enrolled.current = true;
    void (async () => {
      const { CloudSync } = await import("@/services/cloud-sync");
      const result = await CloudSync.applyPendingPlacement();
      if (result === "failed") {
        enrolled.current = false;
        setSaveError(true);
        return;
      }
      finish("practice", placement, week);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, user, placement, week]);

  const finish = (to: "practice" | "home", moduleId?: ModuleId, chosenWeek?: number) => {
    setPrefs({ onboardingCompleted: true });
    if (to === "home") {
      void navigate({ to: "/" });
      return;
    }
    const target = moduleId ?? placement;
    // Existing learners (already placed) go back to Home, which points to their saved position.
    if (!target && prefs.currentModuleId) {
      void navigate({ to: "/" });
      return;
    }
    const first = CourseService.modules()[0];
    void navigate({
      to: "/practice",
      search: { day: weekStartDay(chosenWeek ?? week), module: target ?? first?.id ?? "basic-zero" },
    });
  };

  const primaryBtn =
    "min-h-[56px] w-full rounded-2xl bg-primary px-6 text-[16px] font-bold tracking-wide text-primary-foreground active:scale-[0.98] disabled:opacity-40";
  const secondaryBtn =
    "min-h-[48px] w-full rounded-2xl border border-border px-6 text-[13px] font-bold uppercase tracking-[0.14em] text-muted-foreground";

  const isSlide = screen < SLIDE_COUNT;
  const slide = isSlide ? SLIDES[screen] : null;

  return (
    <div className="flex min-h-screen flex-col bg-background pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col">
        {/* Header: brand + skip (slides only) */}
        <div className="flex items-center justify-between px-5">
          <span className="text-[13px] font-extrabold uppercase tracking-[0.28em] text-foreground">
            Fluency App
          </span>
          {isSlide ? (
            <button
              type="button"
              onClick={() => setScreen(PLACEMENT_SCREEN)}
              className="px-2 py-1 text-[14px] font-semibold text-muted-foreground"
            >
              {t("action.skip")}
            </button>
          ) : null}
        </div>

        <div className="flex flex-1 flex-col">
          {slide ? (
            <section className="flex flex-1 flex-col">
              <img
                src={slide.img}
                alt=""
                className="mt-1 w-full object-contain"
                loading={screen === 0 ? "eager" : "lazy"}
              />
              <div className="space-y-3 px-6 pt-2 text-center">
                <h1 className="text-[28px] font-extrabold leading-tight tracking-tight">
                  {t(slide.title)}
                </h1>
                <p className="text-[15px] font-semibold text-muted-foreground">{t(slide.body)}</p>
                {"sub" in slide ? (
                  <p className="text-[13px] font-semibold text-muted-foreground">{t(slide.sub)}</p>
                ) : null}
                <div className="flex items-center justify-center gap-2 pt-1" aria-hidden>
                  {Array.from({ length: SLIDE_COUNT }, (_, i) => (
                    <span
                      key={i}
                      className={cn(
                        "size-2 rounded-full",
                        i === screen ? "bg-primary" : "bg-secondary",
                      )}
                    />
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          {screen === PLACEMENT_SCREEN ? (
            <div className="px-5">
              <PlacementPicker value={placement} onSelect={choosePlacement} initialPlacement />
            </div>
          ) : null}

          {screen === WEEK_SCREEN && placement ? (
            <section className="flex flex-1 flex-col justify-center space-y-5 px-5">
              <div className="text-center">
                <h1 className="text-[26px] font-extrabold leading-tight tracking-tight">
                  {t("place.weekTitle")}
                </h1>
                <p className="mt-2 text-[14px] font-semibold text-muted-foreground">
                  {CourseService.getModule(placement).label} · {CourseService.getModule(placement).title}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {[1, 2, 3, 4].map((w) => (
                  <button
                    key={w}
                    type="button"
                    disabled={saving}
                    onClick={() => void confirmWeek(w)}
                    className={cn(
                      "min-h-[64px] rounded-2xl border bg-card text-[16px] font-extrabold tracking-tight transition-colors active:scale-[0.98] disabled:opacity-40",
                      week === w ? "border-primary bg-primary/5 text-primary" : "border-border",
                    )}
                  >
                    {t("place.week").replace("{n}", String(w))}
                  </button>
                ))}
              </div>
              <p className="text-center text-[13px] font-semibold text-muted-foreground">
                {t("place.weekBody")}
              </p>
              {saveError ? (
                <p className="text-center text-[13px] font-semibold text-destructive">
                  {t("place.saveFailed")}
                </p>
              ) : null}
            </section>
          ) : null}

          {screen === AUTH_SCREEN ? (
            <section className="space-y-4 px-5">
              <AuthGate />
            </section>
          ) : null}

          {/* Save failed outside the week buttons (e.g. right after sign-up). */}
          {saveError && screen === AUTH_SCREEN && placement ? (
            <div className="mx-5 mt-4 space-y-3 rounded-2xl border border-destructive/40 bg-card p-4">
              <p className="text-[13px] font-semibold text-destructive">{t("place.saveFailed")}</p>
              <button type="button" disabled={saving} onClick={() => void retrySave()} className={primaryBtn}>
                {t("action.tryAgain")}
              </button>
            </div>
          ) : null}
        </div>

        {/* Bottom actions */}
        <div className="space-y-3 px-5 pt-4">
          {slide ? (
            <button
              type="button"
              onClick={() => {
                if (screen === SLIDE_COUNT - 1) {
                  if (user && prefs.currentModuleId) finish("home");
                  else setScreen(PLACEMENT_SCREEN);
                } else {
                  setScreen((s) => s + 1);
                }
              }}
              className={primaryBtn}
            >
              {t(slide.cta)}
            </button>
          ) : null}
          {screen === PLACEMENT_SCREEN ? (
            <button type="button" onClick={() => setScreen(0)} className={secondaryBtn}>
              {t("action.back")}
            </button>
          ) : null}
          {screen === WEEK_SCREEN ? (
            <button type="button" onClick={() => setScreen(PLACEMENT_SCREEN)} className={secondaryBtn}>
              {t("action.back")}
            </button>
          ) : null}
          {screen === AUTH_SCREEN && user ? (
            <button type="button" onClick={() => finish("home")} className={primaryBtn}>
              {t("action.startPractice")}
            </button>
          ) : null}
          {(screen === 0 || screen === AUTH_SCREEN) && !installedPwa ? (
            <Link
              to="/install"
              className="block text-center text-[13px] font-bold text-primary underline underline-offset-4"
            >
              {t("onb.installCta")}
            </Link>
          ) : null}
        </div>
      </div>

      {/* "Are you sure?" confirmation modal after picking a level */}
      {pendingChoice ? (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <div className="w-full max-w-lg space-y-4 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="text-[18px] font-extrabold tracking-tight">{t("place.sureTitle")}</p>
            <p className="text-[15px] text-muted-foreground">
              {t("place.sureBody")}{" "}
              <span className="font-extrabold text-foreground">
                {CourseService.getModule(pendingChoice).label} · {CourseService.getModule(pendingChoice).title}
              </span>
              ?
            </p>
            <button type="button" onClick={() => confirmChoice(pendingChoice)} className={primaryBtn}>
              {t("place.sureYes")}
            </button>
            <button type="button" onClick={() => setPendingChoice(null)} className={secondaryBtn}>
              {t("place.sureNo")}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
