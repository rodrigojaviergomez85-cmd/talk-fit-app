import { Flame, Trophy } from "lucide-react";
import type { JourneyState } from "@/lib/types";
import { HABIT_GOAL, habitDays, habitDisplay, nextMilestone } from "@/lib/habit";
import { useAppLang } from "@/lib/i18n";
import { HabitExplainer } from "./HabitExplainer";
import { Progress } from "@/components/ui/progress";

/**
 * "Mi constancia" — a non-interactive summary of the current streak and
 * 66-day challenge. Counting still comes from the habit helpers.
 */
export function HomeWeekCard({ state }: { state: JourneyState }) {
  const { t, lang } = useAppLang();
  const es = lang === "es";
  const streak = state.streakDays || 0;
  const count = habitDays(state);
  const { shown, complete } = habitDisplay(count);
  const next = nextMilestone(count);
  const remaining = next ? next.days - count : 0;
  const percent = Math.round((shown / HABIT_GOAL) * 100);

  return (
    <section
      className="rounded-2xl border border-border bg-card p-3 shadow-[var(--shadow-card)]"
      aria-label={es ? "Mi constancia" : "My consistency"}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-extrabold tracking-tight">{t("home.myConsistency")}</h2>
        <HabitExplainer iconOnly />
      </div>

      <div className="mt-1 flex items-center gap-2">
        <Flame className="size-6 shrink-0 text-primary" strokeWidth={2} aria-hidden />
        <p className="flex-1 text-sm font-semibold text-muted-foreground">{t("home.currentStreak")}</p>
        <p className="shrink-0 text-base font-extrabold tabular-nums text-foreground">
          {streak} {es ? (streak === 1 ? "día" : "días") : streak === 1 ? "day" : "days"}
        </p>
      </div>

      <div className="mt-2 border-t border-border pt-2">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-sm font-semibold text-muted-foreground">{t("home.challenge66")}</p>
          <p className="text-sm font-extrabold tabular-nums text-foreground">{shown}/{HABIT_GOAL}</p>
        </div>
        <Progress
          value={percent}
          aria-label={t("home.challengeProgress").replace("{done}", String(shown))}
          className="mt-2 h-2 bg-secondary [&>div]:bg-primary"
        />

        <div className="mt-2 flex items-start gap-2">
          <Trophy className="mt-0.5 size-5 shrink-0 text-muted-foreground" aria-hidden />
          <div className="min-w-0">
            <p className="text-xs font-semibold leading-snug text-muted-foreground">
              {complete
                ? t("home.challengeComplete")
                : t("home.nextMilestoneIn").replace("{n}", String(remaining))}
            </p>
            <p className="mt-0.5 text-[11px] font-medium leading-snug text-muted-foreground">
              {complete ? t("home.keepPracticing") : t("home.practiceToday")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
