import { Check, Lock } from "lucide-react";
import type { JourneyState } from "@/lib/types";
import { CourseService } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";
import { ModuleBadge } from "@/components/fluency/ModuleBadge";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * MIS EMBLEMAS — one animal emblem per module. Grey until the learner
 * completes every day of that module; full colour after that.
 * Derived from saved progress only; no new data is stored.
 */
export function ModuleBadgeGrid({ state }: { state: JourneyState }) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const modules = CourseService.modules();

  return (
    <section className="space-y-3">
      <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        {es ? "MIS EMBLEMAS" : "MY EMBLEMS"}
      </h2>
      <div className="grid grid-cols-3 gap-2">
        {modules.map((module) => {
          const earned = JourneyService.moduleComplete(state, module.id);
          const done = JourneyService.completedCount(state, module.id);
          return (
            <div
              key={module.id}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-3xl p-3 text-center",
                earned ? "bg-card shadow-[var(--shadow-card)]" : "border border-dashed border-border bg-secondary/40",
              )}
            >
              <ModuleBadge moduleId={module.id} size="md" locked={!earned} es={es} />
              <p
                className={cn(
                  "text-[11px] font-extrabold leading-tight tracking-tight",
                  !earned && "text-muted-foreground",
                )}
              >
                {module.label === "INTERMEDIO" ? module.title : module.label}
              </p>
              <p className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {earned ? (
                  <>
                    <Check className="size-3 text-success" aria-hidden />
                    {es ? "COMPLETO" : "COMPLETE"}
                  </>
                ) : (
                  <>
                    <Lock className="size-3" aria-hidden />
                    {done} / {module.days.length}
                  </>
                )}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
