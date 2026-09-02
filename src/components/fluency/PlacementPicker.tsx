import { useState } from "react";
import { Check, Lock } from "lucide-react";
import { CourseService, UPCOMING_LEVELS } from "@/services/course-service";
import type { ModuleId } from "@/lib/types";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type PlacementKey =
  | "place.basic-zero"
  | "place.simple-future"
  | "place.simple-present"
  | "place.past-stories"
  | "place.mixed-tenses"
  | "place.eagles-week-1"
  | "place.tigers"
  | "place.sharks";

/**
 * Self-placement: large cards in visual journey order plus a disabled
 * "AVANZADO — PRÓXIMAMENTE" preview. Never a formal test; picks an EXISTING
 * internal module id only.
 */
export function PlacementPicker({
  value,
  onSelect,
  title,
  subtitle,
  showAllLevels = false,
}: {
  value: ModuleId | null;
  onSelect: (moduleId: ModuleId) => void;
  title?: string;
  subtitle?: string;
  /** Account "change level" shows every module; first-time placement hides later levels. */
  showAllLevels?: boolean;
}) {
  const { t, lang } = useAppLang();
  const es = lang === "es";
  const [soonOpen, setSoonOpen] = useState(false);
  // TIGERS (and later levels) are reached by finishing the previous module in first-time placement.
  const modules = CourseService.modules().filter((m) => showAllLevels || !m.hiddenFromPlacement);
  const intermedio = modules.find((m) => m.id === "eagles-week-1")?.id ?? modules[modules.length - 1]!.id;

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h1 className="text-[28px] font-extrabold leading-tight tracking-tight">{title ?? t("place.title")}</h1>
        <p className="mt-2 text-[15px] font-semibold text-muted-foreground">{subtitle ?? t("place.subtitle")}</p>
      </div>

      <ul className="space-y-2.5">
        {modules.map((module) => {
          const selected = value === module.id;
          return (
            <li key={module.id}>
              <button
                type="button"
                onClick={() => onSelect(module.id)}
                aria-pressed={selected}
                className={cn(
                  "flex min-h-[72px] w-full items-center gap-3 rounded-2xl border bg-card p-4 text-left transition-colors active:scale-[0.99]",
                  selected ? "border-primary bg-primary/5" : "border-border",
                )}
              >
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                    {module.label}
                  </span>
                  <span className="block text-[17px] font-extrabold leading-tight tracking-tight">{module.title}</span>
                  <span className="mt-1 block text-[13px] text-muted-foreground">
                    {t(`place.${module.id}` as PlacementKey)}
                  </span>
                </span>
                <span
                  className={cn(
                    "flex size-7 shrink-0 items-center justify-center rounded-full border",
                    selected ? "border-primary bg-primary text-primary-foreground" : "border-border",
                  )}
                  aria-hidden
                >
                  {selected ? <Check className="size-4" /> : null}
                </span>
              </button>
            </li>
          );
        })}

        {UPCOMING_LEVELS.map((level) => (
          <li key={level.key}>
            <button
              type="button"
              onClick={() => setSoonOpen(true)}
              aria-disabled="true"
              className="flex min-h-[64px] w-full items-center gap-3 rounded-2xl border border-dashed border-border bg-secondary/50 p-4 text-left opacity-70"
            >
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {level.label}
                </span>
                <span className="block text-[17px] font-extrabold leading-tight tracking-tight text-muted-foreground">
                  {es ? level.title : t("status.soon")}
                </span>
              </span>
              <Lock className="size-5 shrink-0 text-muted-foreground" aria-hidden />
            </button>
          </li>
        ))}
      </ul>

      {soonOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="soon-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-4 sm:items-center"
          onClick={() => setSoonOpen(false)}
        >
          <div
            className="w-full max-w-md space-y-4 rounded-3xl bg-card p-6 text-center shadow-[var(--shadow-lift)]"
            onClick={(event) => event.stopPropagation()}
          >
            <p id="soon-title" className="text-[22px] font-extrabold tracking-tight">
              {t("place.soonTitle")}
            </p>
            <p className="text-[15px] font-semibold text-muted-foreground">{t("place.soonBody")}</p>
            <button
              type="button"
              onClick={() => {
                setSoonOpen(false);
                onSelect(intermedio);
              }}
              className="min-h-[52px] w-full rounded-2xl bg-primary px-5 text-[15px] font-bold tracking-wide text-primary-foreground active:scale-[0.98]"
            >
              {t("place.goIntermedio")}
            </button>
            <button
              type="button"
              onClick={() => setSoonOpen(false)}
              className="min-h-[44px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
            >
              {t("account.cancel")}
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
