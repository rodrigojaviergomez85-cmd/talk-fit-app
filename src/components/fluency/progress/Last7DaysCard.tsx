import { Check, Timer } from "lucide-react";
import { last7PracticeDays, speakingTimeLabel } from "@/lib/progress-last7";
import type { JourneyState } from "@/lib/types";
import { useAppLang, useT } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const GOAL = 5;

/**
 * "Últimos 7 días": five indicators toward a 5-day goal, counting distinct
 * dates (weekends included), plus an honest speaking-time line.
 */
export function Last7DaysCard({ state }: { state: JourneyState }) {
  const t = useT();
  const { lang } = useAppLang();
  const es = lang === "es";

  const days = last7PracticeDays(state);
  const met = days >= GOAL;
  const time = speakingTimeLabel(state);
  const timeText =
    time.kind === "none"
      ? t("prog.noData")
      : time.kind === "zero"
        ? t("prog.noTimeYet")
        : time.kind === "under1"
          ? t("prog.lessThanMin")
          : `${time.minutes} min`;

  return (
    <section className="rounded-3xl bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[16px] font-extrabold tracking-tight">{t("prog.last7")}</h2>
        <p className="text-[15px] font-extrabold tabular-nums tracking-tight">
          {Math.min(days, GOAL)} / {GOAL}{" "}
          <span className="text-[12px] font-bold text-muted-foreground">{t("prog.daysWord")}</span>
        </p>
      </div>

      <div className="mt-3 flex items-center gap-3">
        {Array.from({ length: GOAL }, (_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={cn(
              "flex size-11 items-center justify-center rounded-full",
              i < days ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
            )}
          >
            {i < days ? <Check className="size-5" /> : null}
          </span>
        ))}
      </div>
      {met ? (
        <p className="mt-2 text-[13px] font-bold text-success">{t("prog.goalMet")}</p>
      ) : null}

      <p className="mt-3 flex items-center gap-2 border-t border-border pt-3 text-[13px] font-semibold text-muted-foreground">
        <Timer className="size-4 shrink-0 text-primary" aria-hidden />
        {es ? "Tiempo hablado: " : "Speaking time: "}
        <span className="font-bold text-foreground">{timeText}</span>
      </p>
    </section>
  );
}
