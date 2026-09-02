import type { LearningModule } from "@/services/course-service";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * One consistent module identity everywhere:
 *   small orange caps (level) → large title → secondary → optional status line.
 * Presentation only; the module's internal id never appears here.
 */
export function ModuleHeading({
  module,
  size = "md",
  onDark = false,
  className,
}: {
  module: LearningModule;
  size?: "sm" | "md" | "lg";
  onDark?: boolean;
  className?: string;
}) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const secondary = es ? module.subtitleEs : module.subtitle;
  const status = module.statusLine ? (es ? module.statusLine.es : module.statusLine.en) : null;
  const muted = onDark ? "text-navy-foreground/75" : "text-muted-foreground";

  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{module.label}</p>
      <h3
        className={cn(
          "mt-0.5 font-extrabold leading-tight tracking-tight",
          size === "lg" ? "text-[26px]" : size === "md" ? "text-[19px]" : "text-[15px]",
        )}
      >
        {module.title}
      </h3>
      {size !== "sm" ? <p className={cn("mt-1 text-[13px] font-semibold", muted)}>{secondary}</p> : null}
      {status ? (
        <p className={cn("mt-0.5 text-[11px] font-bold uppercase tracking-[0.14em]", muted)}>{status}</p>
      ) : null}
    </div>
  );
}
