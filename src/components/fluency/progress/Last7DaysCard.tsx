import { Check, Timer } from "lucide-react";
import { last7Calendar, last7PracticeDays, speakingTimeLabel } from "@/lib/progress-last7";
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
  const calendar = last7Calendar(state);
  const weekdays = es ? ["D", "L", "M", "M", "J", "V", "S"] : ["S", "M", "T", "W", "T", "F", "S"];
  const met = days >= GOAL;
  const time = speakingTimeLabel(state);
  let timeText: string;
  switch (time.kind) {
    case "none":
      timeText = t("prog.noData");
      break;
    case "zero":
      timeText = t("prog.noTimeYet");
      break;
    case "under1":
      timeText = t("prog.lessThanMin");
      break;
    default:
      timeText = `${time.minutes} min`;
  }

  return (
    <section className="rounded-3xl bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="text-[16px] font-extrabold tracking-tight">{t("prog.last7")}</h2>
        <p className="text-[15px] font-extrabold tabular-nums tracking-tight">
          {days} / 7{" "}
          <span className="text-[12px] font-bold text-muted-foreground">{t("prog.daysWord")}</span>
        </p>
      </div>

      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {calendar.map((cell, i) => (
          <div key={cell.key} className="flex flex-col items-center gap-1">
            <span className="text-[10px] font-bold uppercase text-muted-foreground">
              {weekdays[cell.date.getDay()]}
            </span>
            <span
              aria-label={`${cell.key}${cell.practiced ? " ✓" : ""}`}
              className={cn(
                "flex size-9 items-center justify-center rounded-full text-[11px] font-bold",
                cell.practiced
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground",
                i === calendar.length - 1 && !cell.practiced ? "ring-2 ring-primary/40" : "",
              )}
            >
              {cell.practiced ? <Check className="size-4" /> : cell.date.getDate()}
            </span>
          </div>
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
