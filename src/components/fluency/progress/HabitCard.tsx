import { Trophy } from "lucide-react";
import { HABIT_GOAL, habitDays, habitDisplay, nextMilestone } from "@/lib/habit";
import type { JourneyState } from "@/lib/types";
import { useAppLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/** "Mi constancia": real accumulated habit days, 66-day goal, next real milestone. */
export function HabitCard({ state }: { state: JourneyState }) {
  const t = useT();
  const { lang } = useAppLang();
  const es = lang === "es";

  const count = habitDays(state);
  const habit = habitDisplay(count);
  const percent = Math.round((habit.shown / HABIT_GOAL) * 100);
  const next = nextMilestone(count);

  return (
    <section className="rounded-3xl bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[16px] font-extrabold tracking-tight">{t("prog.constancy")}</h2>
        <p className="text-[15px] font-extrabold tabular-nums tracking-tight">
          {habit.complete ? (
            <>
              66 / {HABIT_GOAL} <span className="text-success">✓</span>
            </>
          ) : (
            <>
              {habit.shown} / {HABIT_GOAL}{" "}
              <span className="text-[12px] font-bold text-muted-foreground">
                {t("prog.daysWord")}
              </span>
            </>
          )}
        </p>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-all", habit.complete ? "bg-success" : "bg-primary")}
          style={{ width: `${percent}%` }}
        />
      </div>
      {next && !habit.complete ? (
        <p className="mt-2 flex items-center gap-1.5 text-[13px] font-semibold text-muted-foreground">
          <Trophy className="size-4 shrink-0 text-primary" aria-hidden />
          {es ? `Próximo logro: ${next.days} días` : `Next milestone: ${next.days} days`}
        </p>
      ) : (
        <p className="mt-2 text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
          {count} {t("prog.practiceDays")}
        </p>
      )}
    </section>
  );
}
