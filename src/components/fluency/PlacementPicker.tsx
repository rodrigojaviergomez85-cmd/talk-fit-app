import { Check, Lock } from "lucide-react";
import { CourseService, UPCOMING_LEVELS } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";
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
  | "place.sharks"
  | "place.advanced-1";

/**
 * Self-placement: large cards in visual journey order. Never a formal test;
 * picks an EXISTING internal module id only.
 *
 * Change-level mode (`showAllLevels`) lists every module for correction/review,
 * but the ADVANCED ladder cannot be bypassed: GET HIRED opens only when the
 * learner is eligible (SHARKS complete, already placed there, or has progress
 * there); HANDLE & SELL and THINK FAST stay locked previews.
 */
export function PlacementPicker({
  value,
  onSelect,
  title,
  subtitle,
  showAllLevels = false,
  initialPlacement = false,
}: {
  value: ModuleId | null;
  onSelect: (moduleId: ModuleId) => void;
  title?: string;
  subtitle?: string;
  /** Account "change level" shows every module, keeping Advanced ladder locks. */
  showAllLevels?: boolean;
  /**
   * First-time onboarding only: free choice among ALL implemented modules.
   * Bypasses `hiddenFromPlacement` and all unlock rules; normal progression
   * resumes after the initial pick is saved.
   */
  initialPlacement?: boolean;
}) {
  const { t, lang } = useAppLang();
  const es = lang === "es";
  // TIGERS (and later levels) are reached by finishing the previous module in
  // normal progression — but initial placement is a free starting choice.
  const modules = CourseService.modules().filter((m) => initialPlacement || showAllLevels || !m.hiddenFromPlacement);
  const state = showAllLevels && !initialPlacement ? JourneyService.load() : null;

  const lockedReason = (moduleId: ModuleId): string | null => {
    const module = CourseService.getModule(moduleId);
    if (!state || module.family !== "advanced") return null;
    if (JourneyService.isModuleUnlocked(state, moduleId)) return null;
    const modulesAll = CourseService.modules();
    const prev = modulesAll[modulesAll.findIndex((m) => m.id === moduleId) - 1];
    return prev ? `${t("home.unlockAfter")} ${prev.title}` : null;
  };

  return (
    <section className="space-y-4">
      <div className="text-center">
        <h1 className="text-[28px] font-extrabold leading-tight tracking-tight">{title ?? t("place.title")}</h1>
        <p className="mt-2 text-[15px] font-semibold text-muted-foreground">{subtitle ?? t("place.subtitle")}</p>
      </div>

      <ul className="space-y-2.5">
        {modules.map((module) => {
          const selected = value === module.id;
          const reason = lockedReason(module.id);
          if (reason) {
            return (
              <li key={module.id}>
                <LockedRow label={module.label} title={module.title} note={reason} lockedLabel={t("place.locked")} />
              </li>
            );
          }
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

        {showAllLevels || initialPlacement
          ? UPCOMING_LEVELS.map((level) => (
              <li key={level.key}>
                <LockedRow
                  label={level.label}
                  title={level.title}
                  note={es ? level.note.es : level.note.en}
                  lockedLabel={t("status.soon")}
                />
              </li>
            ))
          : null}
      </ul>
    </section>
  );
}

function LockedRow({ label, title, note, lockedLabel }: { label: string; title: string; note: string; lockedLabel: string }) {
  return (
    <div
      aria-disabled="true"
      className="flex min-h-[72px] w-full items-center gap-3 rounded-2xl border border-dashed border-border bg-secondary/50 p-4 text-left opacity-80"
    >
      <span className="min-w-0 flex-1">
        <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
        <span className="block text-[17px] font-extrabold leading-tight tracking-tight text-muted-foreground">{title}</span>
        <span className="mt-1 block text-[12px] font-semibold text-muted-foreground">
          🔒 {note} · {lockedLabel}
        </span>
      </span>
      <Lock className="size-5 shrink-0 text-muted-foreground" aria-hidden />
    </div>
  );
}
