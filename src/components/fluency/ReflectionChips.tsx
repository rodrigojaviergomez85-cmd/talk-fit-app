import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import { ProgressMomentsService } from "@/services/progress-moments-service";
import type { ComparisonType, ReflectionOption } from "@/lib/progress-moments";
import type { ModuleId } from "@/lib/types";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  options: ReflectionOption[];
  moduleId: ModuleId;
  week: number;
  type: ComparisonType;
  tone?: "card" | "navy";
};

/**
 * Self-reflection multi-select. The learner decides what they notice — nothing
 * is claimed automatically. Saved idempotently (one row per moment).
 */
export function ReflectionChips({ title, options, moduleId, week, type, tone = "card" }: Props) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const [selected, setSelected] = useState<string[]>([]);
  const [saved, setSaved] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navy = tone === "navy";

  useEffect(() => {
    let cancelled = false;
    void ProgressMomentsService.load({ moduleId, week, type }).then((list) => {
      if (!cancelled && list.length) setSelected(list);
    });
    return () => {
      cancelled = true;
      if (timer.current) clearTimeout(timer.current);
    };
  }, [moduleId, week, type]);

  const toggle = (id: string) => {
    const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
    setSelected(next);
    setSaved(false);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      void ProgressMomentsService.save({ moduleId, week, type }, next).then(() => setSaved(true));
    }, 500);
  };

  return (
    <div className="space-y-3">
      <p
        className={cn(
          "text-[13px] font-extrabold uppercase tracking-[0.16em]",
          navy ? "text-navy-foreground" : "text-foreground",
        )}
      >
        {title}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const on = selected.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={on}
              onClick={() => toggle(option.id)}
              className={cn(
                "inline-flex min-h-[44px] items-center gap-1.5 rounded-full border px-4 text-[12px] font-bold uppercase tracking-[0.1em] transition-colors",
                on
                  ? "border-primary bg-primary text-primary-foreground"
                  : navy
                    ? "border-navy-foreground/30 text-navy-foreground"
                    : "border-border bg-card text-foreground",
              )}
            >
              {on ? <Check className="size-3.5" /> : null}
              {es ? option.es : option.en}
            </button>
          );
        })}
      </div>
      <p
        className={cn(
          "text-[11px] font-semibold",
          navy ? "text-navy-foreground/60" : "text-muted-foreground",
        )}
        aria-live="polite"
      >
        {saved
          ? es
            ? "Guardado ✓ · Tú decides qué cambió. Sin puntajes."
            : "Saved ✓ · You decide what changed. No scores."
          : es
            ? "Opcional · Tú decides qué cambió. Sin puntajes."
            : "Optional · You decide what changed. No scores."}
      </p>
    </div>
  );
}
