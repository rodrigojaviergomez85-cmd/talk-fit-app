import { Link } from "@tanstack/react-router";
import { Check, Clock, Mic } from "lucide-react";
import { TranslatableText } from "./TranslatableText";
import type { CourseDay, ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  moduleId: ModuleId;
  day: CourseDay;
  completed: boolean;
  totalDays: number;
};

/** The one clear action on Home: start (or replay) today's day. */
export function DailyPracticeCard({ moduleId, day, completed, totalDays }: Props) {
  return (
    <section className="rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          DAY {day.day} OF {totalDays}
        </p>
        {completed ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-success/12 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-success">
            <Check className="size-3.5" /> 5 / 5 reps
          </span>
        ) : null}
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
        {completed ? `PRACTICE DAY ${day.day} AGAIN` : `START DAY ${day.day}`}
      </Link>
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
