import { Flame } from "lucide-react";
import type { JourneyState } from "@/lib/types";
import { HABIT_GOAL, habitDays, habitDisplay } from "@/lib/habit";
import { HabitCalendar } from "./HabitCalendar";
import { useAppLang } from "@/lib/i18n";

/**
 * "Mi constancia" — the 66-day habit on Home: streak in the header, the
 * collapsible numbered calendar (1…66), and the "9 / 66 días" counter.
 * Purely presentational; counting still comes from the habit helpers.
 */
export function HomeWeekCard({ state }: { state: JourneyState }) {
  const { t, lang } = useAppLang();
  const es = lang === "es";
  const streak = state.streakDays || 0;
  const count = habitDays(state);
  const { shown } = habitDisplay(count);

  return (
    <section
      className="rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
      aria-label={es ? "Mi constancia" : "My consistency"}
    >
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[18px] font-extrabold tracking-tight">{t("home.myConsistency")}</h2>
        <div className="flex items-center gap-1.5 text-right">
          <Flame className="size-5 shrink-0 text-primary" aria-hidden />
          <p className="text-[12px] font-bold leading-tight text-muted-foreground">
            {t("home.currentStreak")}
            <span className="block text-[14px] font-extrabold tabular-nums text-foreground">
              {t("home.streakDays").replace("{n}", String(streak))}
            </span>
          </p>
        </div>
      </div>

      <div className="mt-3">
        <HabitCalendar done={shown} es={es} />
      </div>

      <p className="mt-2 border-t border-border pt-3 text-[13px] font-semibold tabular-nums text-muted-foreground">
        {t("home.habitDaysOf").replace("{done}", String(Math.min(shown, HABIT_GOAL)))}
      </p>
    </section>
  );
}
