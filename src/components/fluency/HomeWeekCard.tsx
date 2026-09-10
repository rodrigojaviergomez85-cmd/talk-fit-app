import { Flame } from "lucide-react";
import type { JourneyState } from "@/lib/types";
import { HABIT_GOAL, habitDays, habitDisplay } from "@/lib/habit";
import { JourneyService, habitDatesOf } from "@/services/journey-service";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * "Mi constancia" — the current Monday–Sunday week as seven dated circles.
 * Practiced dates come from the same authoritative habit list used by the
 * 66-day habit; today gets a ring + "Hoy" label. Presentation only.
 */
export function HomeWeekCard({ state }: { state: JourneyState }) {
  const { t, lang } = useAppLang();
  const es = lang === "es";
  const streak = state.streakDays || 0;
  const count = habitDays(state);
  const { shown } = habitDisplay(count);
  const doneDates = new Set(habitDatesOf(state));

  const now = new Date();
  const monday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7));
  const todayKey = JourneyService.dayKey();
  const labels = es
    ? ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"]
    : ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const week = labels.map((label, i) => {
    const date = new Date(monday.getFullYear(), monday.getMonth(), monday.getDate() + i);
    const key = JourneyService.dayKey(date);
    return {
      label,
      num: date.getDate(),
      key,
      practiced: doneDates.has(key),
      isToday: key === todayKey,
      future: key > todayKey,
    };
  });

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

      <div className="mt-4 grid grid-cols-7 gap-1">
        {week.map((day) => (
          <div key={day.key} className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">{day.label}</span>
            <span
              aria-label={`${day.label} ${day.num}${day.practiced ? " ✓" : ""}${day.isToday ? ` (${t("home.todayWord")})` : ""}`}
              className={cn(
                "flex size-9 items-center justify-center rounded-full text-[13px] font-bold tabular-nums",
                day.practiced ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
                day.isToday ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : "",
              )}
            >
              {day.num}
            </span>
            <span
              className={cn(
                "h-3 text-[10px] font-extrabold",
                day.isToday ? "text-primary" : "text-transparent",
              )}
              aria-hidden={!day.isToday}
            >
              {day.isToday ? t("home.todayWord") : "·"}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-2 border-t border-border pt-3 text-[13px] font-semibold tabular-nums text-muted-foreground">
        {t("home.habitDaysOf").replace("{done}", String(Math.min(shown, HABIT_GOAL)))}
      </p>
    </section>
  );
}
