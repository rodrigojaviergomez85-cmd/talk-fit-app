import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Clock, Mic } from "lucide-react";
import { TranslatableText } from "./TranslatableText";
import type { CourseDay, ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";
import { DAILY_PRACTICE_CAP, PracticeAttempts } from "@/services/practice-attempts";


type Props = {
  moduleId: ModuleId;
  day: CourseDay;
  completed: boolean;
  inProgress?: boolean;
  totalDays: number;
};

/** Today's practice counter. Client-only: the local calendar date is the learner's. */
export function usePracticesToday(): number | null {
  const [used, setUsed] = useState<number | null>(null);
  useEffect(() => {
    setUsed(PracticeAttempts.usedToday());
    void PracticeAttempts.pull().then(() => setUsed(PracticeAttempts.usedToday()));
  }, []);
  return used;
}

/** "PRACTICES TODAY 2 / 5" — always visible, never scolding. */
export function PracticesTodayChip({ used, className }: { used: number; className?: string }) {
  const t = useT();
  const full = used >= DAILY_PRACTICE_CAP;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]",
        full ? "bg-success/12 text-success" : "bg-secondary text-muted-foreground",
        className,
      )}
    >
      {t("dailyCap.indicator")}{" "}
      <span className="tabular-nums">
        {used} / {DAILY_PRACTICE_CAP}
      </span>
    </span>
  );
}

/** The one clear action on the module page: start or continue today's day. */
export function DailyPracticeCard({ moduleId, day, completed, inProgress, totalDays }: Props) {
  const t = useT();
  const used = usePracticesToday();
  const capReached = used !== null && used >= DAILY_PRACTICE_CAP;
  const remaining = used === null ? null : Math.max(0, DAILY_PRACTICE_CAP - used);
  const ctaText = completed
    ? t("repeatDay.cta")
    : inProgress
      ? `${t("home.continueDay")} ${day.day}`
      : `${t("home.startDay")} ${day.day}`;
  return (
    <section className="rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          {t("home.dayOfTotal").replace("{day}", String(day.day)).replace("{total}", String(totalDays))}
        </p>
        {used !== null ? <PracticesTodayChip used={used} /> : null}
      </div>

      <TranslatableText es={day.topicEs} className="mt-2">
        <h2 className="text-[26px] font-extrabold leading-tight tracking-tight">{day.topic}</h2>
      </TranslatableText>

      <TranslatableText es={day.focusEs} className="mt-2">
        <p className="text-[15px] font-semibold text-muted-foreground">{day.focus}</p>
      </TranslatableText>

      <div className="mt-4 flex flex-wrap gap-2">
        <Meta icon={<Mic className="size-3.5" />} text={`${day.goalSeconds[0]}–${day.goalSeconds[1]}s goal`} />
        <Meta icon={<Check className="size-3.5" />} text="5 reps" />
        <Meta icon={<Clock className="size-3.5" />} text={day.estimatedMinutes} />
      </div>

      {completed ? (
        <div className="mt-4 rounded-2xl border border-border bg-secondary/40 p-4">
          <p className="text-[11px] font-black uppercase tracking-[0.14em] text-success">{t("repeatDay.done")}</p>
          <p className="mt-1 text-[13px] font-bold uppercase tracking-[0.12em]">{t("repeatDay.question")}</p>
          <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
            {t("repeatDay.body").replace("{cap}", String(DAILY_PRACTICE_CAP))}
          </p>
        </div>
      ) : null}

      {capReached ? (
        <p className="mt-4 rounded-2xl bg-success/10 p-4 text-[13px] leading-relaxed text-success">
          {t("dailyCap.body").replace("{cap}", String(DAILY_PRACTICE_CAP))}
        </p>
      ) : (
        <Link
          to="/practice"
          search={{ day: day.day, module: moduleId }}
          className={cn(
            "mt-5 flex w-full items-center justify-center rounded-2xl px-6 py-4 text-[15px] font-bold tracking-wide transition-transform active:scale-[0.98]",
            completed
              ? "border border-border bg-card text-foreground"
              : "bg-primary text-primary-foreground shadow-[var(--shadow-lift)]",
          )}
        >
          {ctaText}
        </Link>
      )}

      {remaining !== null && remaining > 0 ? (
        <p className="mt-3 text-center text-[12px] font-semibold text-muted-foreground">
          {remaining === 1
            ? t("dailyCap.remainingOne")
            : t("dailyCap.remaining").replace("{n}", String(remaining))}
        </p>
      ) : null}
    </section>
  );
}

function Meta({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
      {icon} {text}
    </span>
  );
}

/** Compact row used by the journey map. All days are always open. */
export function JourneyDayRow({
  moduleId,
  day,
  completed,
  current,
}: {
  moduleId: ModuleId;
  day: CourseDay;
  completed: boolean;
  unlocked?: boolean;
  current: boolean;
}) {
  return (
    <Link to="/practice" search={{ day: day.day, module: moduleId }} className="block">
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border p-4 transition-colors",
          completed && "border-success/30 bg-success/8",
          !completed && current && "border-primary bg-primary/8",
          !completed && !current && "border-border bg-card",
        )}
      >
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full text-[13px] font-extrabold",
            completed ? "bg-success text-success-foreground" : current ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground",
          )}
        >
          {completed ? <Check className="size-4" /> : day.day}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-[15px] font-bold tracking-tight">{day.topic}</span>
          <span className="block truncate text-[12px] text-muted-foreground">{day.focus}</span>
        </span>
      </div>
    </Link>
  );
}
