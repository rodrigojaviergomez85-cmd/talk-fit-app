import { useEffect, useState } from "react";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { PlacementPicker } from "@/components/fluency/PlacementPicker";
import { ModuleHeading } from "@/components/fluency/ModuleHeading";
import { CourseService } from "@/services/course-service";
import { CloudSync } from "@/services/cloud-sync";
import { JourneyService } from "@/services/journey-service";
import type { ModuleId } from "@/lib/types";
import { useAppLang } from "@/lib/i18n";

export const Route = createFileRoute("/level")({
  head: () => ({
    meta: [
      { title: "Cambiar mi nivel — Fluency Reps" },
      { name: "description", content: "Elige el nivel donde quieres seguir practicando. Tu progreso y grabaciones se conservan." },
      { property: "og:title", content: "Cambiar mi nivel — Fluency Reps" },
      { property: "og:description", content: "Cambia tu nivel actual sin perder progreso ni grabaciones." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LevelPage,
});

/**
 * "Cambiar mi nivel": moves only the learner's current module.
 * Progress, recordings and the original placement are preserved.
 */
function LevelPage() {
  const { t, prefs } = useAppLang();
  const navigate = useNavigate();
  const [current, setCurrent] = useState<ModuleId | null>(null);
  const [choice, setChoice] = useState<ModuleId | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setCurrent(prefs.currentModuleId ?? JourneyService.currentModule(JourneyService.load()));
  }, [prefs.currentModuleId]);

  const confirm = async () => {
    if (!choice) return;
    setBusy(true);
    setError(false);
    const ok = await CloudSync.changeLevel(choice);
    setBusy(false);
    if (!ok) {
      setError(true);
      return;
    }
    void navigate({ to: "/module/$moduleId", params: { moduleId: choice } });
  };

  const currentModule = current ? CourseService.getModule(current) : null;

  return (
    <AppShell title={t("place.changeTitle")}>
      <div className="space-y-6">
        <Link
          to="/profile"
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> {t("nav.account")}
        </Link>

        {currentModule ? (
          <section className="rounded-3xl bg-navy p-5 text-navy-foreground">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-navy-foreground/70">{t("place.currentLevel")}</p>
            <ModuleHeading module={currentModule} onDark className="mt-1" />
          </section>
        ) : null}

        <PlacementPicker
          value={choice ?? current}
          onSelect={(id) => setChoice(id === current ? null : id)}
          title={t("place.changeTitle")}
          subtitle={t("place.changeHelp")}
          showAllLevels
        />

        {choice && choice !== current ? (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-4 sm:items-center"
          >
            <div className="w-full max-w-md space-y-4 rounded-3xl bg-card p-6 text-center shadow-[var(--shadow-lift)]">
              <p className="text-[22px] font-extrabold tracking-tight">{t("place.confirmTitle")}</p>
              <ModuleHeading module={CourseService.getModule(choice)} className="text-left" />
              <p className="text-[14px] font-semibold text-muted-foreground">{t("place.confirmBody")}</p>
              {error ? <p className="text-[13px] font-semibold text-destructive">{t("place.saveFailed")}</p> : null}
              <button
                type="button"
                disabled={busy}
                onClick={() => void confirm()}
                className="min-h-[52px] w-full rounded-2xl bg-primary px-5 text-[15px] font-bold tracking-wide text-primary-foreground active:scale-[0.98] disabled:opacity-50"
              >
                {t("place.confirmCta")}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => setChoice(null)}
                className="min-h-[44px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
              >
                {t("account.cancel")}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}
