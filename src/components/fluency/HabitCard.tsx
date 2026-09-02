import { Flame } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { JourneyState } from "@/lib/types";
import { HABIT_GOAL, final6, habitDays, habitDisplay, nextMilestone } from "@/lib/habit";
import { JourneyService } from "@/services/journey-service";
import { HabitExplainer } from "./HabitExplainer";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Props = {
  state: JourneyState;
  /** Home = compact card with CTA in recovery mode; progress = section with header. */
  variant?: "home" | "progress";
};

/**
 * 66-DAY ENGLISH HABIT — habit days (unique completed days) and the current
 * streak, shown as two separate numbers. Never says "you lost" anything.
 */
export function HabitCard({ state, variant = "home" }: Props) {
  const { lang } = useAppLang();
  const es = lang === "es";
  const count = habitDays(state);
  const { shown, complete } = habitDisplay(count);
  const streak = state.streakDays || 0;
  const next = nextMilestone(count);
  const countdown = final6(count);
  const recovery = streak === 0 && count > 0;
  const percent = Math.round((shown / HABIT_GOAL) * 100);
  const nextPractice = variant === "home" && recovery ? JourneyService.nextPractice(state) : null;

  return (
    <section
      className={cn(
        "rounded-3xl border bg-card p-5 shadow-[var(--shadow-card)]",
        recovery ? "border-primary/40" : "border-border",
      )}
      aria-label={es ? "Hábito de inglés de 66 días" : "66-day English habit"}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {variant === "progress"
              ? es
                ? "TU HÁBITO DE INGLÉS"
                : "YOUR ENGLISH HABIT"
              : "66-DAY ENGLISH HABIT"}
          </p>
          <p className="mt-1 text-[22px] font-extrabold tabular-nums tracking-tight">
            {complete ? (
              <>
                66-DAY HABIT <span className="text-success">✓</span>
              </>
            ) : recovery ? (
              es ? "VUELVE HOY" : "COME BACK TODAY"
            ) : (
              `${es ? "DÍA" : "DAY"} ${shown} / ${HABIT_GOAL}`
            )}
          </p>
          {recovery && !complete ? (
            <p className="text-[13px] font-bold tabular-nums text-muted-foreground">
              {es ? "DÍA" : "DAY"} {shown} / {HABIT_GOAL} · {es ? "Tu progreso sigue aquí." : "Your progress is still here."}
            </p>
          ) : null}
        </div>
        <div className="shrink-0 rounded-2xl bg-secondary px-3 py-2 text-center">
          <p className="flex items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            <Flame className="size-3 text-primary" /> {es ? "Racha actual" : "Current streak"}
          </p>
          <p className="text-[17px] font-extrabold tabular-nums">
            {streak} {es ? (streak === 1 ? "día" : "días") : streak === 1 ? "day" : "days"}
          </p>
        </div>
      </div>

      <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
        <div
          className={cn("h-full rounded-full transition-all", complete ? "bg-success" : "bg-primary")}
          style={{ width: `${percent}%` }}
        />
      </div>

      {complete ? (
        <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {es ? "TOTAL" : "TOTAL"}: {count} {es ? "DÍAS DE PRÁCTICA" : "PRACTICE DAYS"}
        </p>
      ) : null}

      <div className="mt-1">
        <HabitExplainer />
      </div>

      {countdown !== null ? (
        <p className="mt-2 text-[13px] font-extrabold text-primary">
          {es ? "FINAL 6" : "FINAL 6"} · {countdown} {es ? (countdown === 1 ? "DÍA MÁS" : "DÍAS MÁS") : countdown === 1 ? "MORE DAY" : "MORE DAYS"}
        </p>
      ) : null}

      {next ? (
        <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-secondary/60 px-3 py-2">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {es ? "Próximo logro" : "Next milestone"}
          </p>
          <p className="text-right text-[12px] font-extrabold">
            {next.emoji} {next.badge[0]}
            <span className="ml-2 font-bold tabular-nums text-muted-foreground">
              {next.days - count} {es ? (next.days - count === 1 ? "día más" : "días más") : next.days - count === 1 ? "more day" : "more days"}
            </span>
          </p>
        </div>
      ) : null}

      {variant === "home" ? (
        recovery && nextPractice ? (
          <Link
            to="/practice"
            search={{ day: nextPractice.day, module: nextPractice.moduleId }}
            className="mt-3 flex min-h-[44px] w-full items-center justify-center rounded-2xl bg-primary px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-primary-foreground"
          >
            {es ? "CONTINUAR MI PRÁCTICA" : "CONTINUE MY PRACTICE"}
          </Link>
        ) : (
          <p className="mt-3 text-[12px] font-semibold text-muted-foreground">
            {count === 0
              ? es
                ? "Tu primer día completado será el Día 1 de tu hábito."
                : "Your first completed day will be Day 1 of your habit."
              : es
                ? "Sigue construyendo tu rutina de inglés."
                : "Keep building your English routine."}
          </p>
        )
      ) : null}
    </section>
  );
}
