import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import { HABIT_GOAL } from "@/lib/habit";
import { cn } from "@/lib/utils";

/**
 * 66-DAY HABIT CALENDAR — numbered habit days (1…66) instead of weekday
 * letters. Purely presentational: `done` is the number of unique completed
 * habit dates already computed by the habit helpers, so nothing here can
 * inflate or change how the habit is counted.
 */
export function HabitCalendar({ done, es }: { done: number; es: boolean }) {
  const [open, setOpen] = useState(false);
  const total = Math.min(done, HABIT_GOAL);
  // Current 7-day block: the block that holds the next day to complete.
  const blockStart = Math.min(Math.floor(total / 7) * 7, HABIT_GOAL - 1);
  const week = Array.from({ length: 7 }, (_, i) => blockStart + i + 1).filter((d) => d <= HABIT_GOAL);
  const allDays = Array.from({ length: HABIT_GOAL }, (_, i) => i + 1);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex min-h-[44px] w-full items-center justify-between gap-2 rounded-2xl px-1 py-2 text-left transition-colors hover:bg-secondary/60"
        aria-label={es ? "Ver el calendario de 66 días" : "View the 66-day calendar"}
      >
        <div className="flex flex-1 items-start justify-between gap-1">
          {week.map((day) => (
            <DayDot key={day} day={day} done={day <= total} current={day === total + 1} />
          ))}
        </div>
        <ChevronDown
          className={cn("size-4 shrink-0 text-muted-foreground transition-transform", open && "rotate-180")}
          aria-hidden
        />
      </button>

      {open ? (
        <div className="mt-2 rounded-2xl bg-secondary/50 p-3">
          <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {es ? "TUS 66 DÍAS" : "YOUR 66 DAYS"}
          </p>
          <div className="grid grid-cols-7 gap-y-2">
            {allDays.map((day) => (
              <div key={day} className="flex justify-center">
                <DayDot day={day} done={day <= total} current={day === total + 1} small />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DayDot({
  day,
  done,
  current,
  small,
}: {
  day: number;
  done: boolean;
  current: boolean;
  small?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={cn(
          "flex items-center justify-center rounded-full border-2 tabular-nums",
          small ? "size-8 text-[11px]" : "size-10 text-[12px]",
          done
            ? "border-primary bg-primary font-bold text-primary-foreground"
            : current
              ? "border-primary bg-background font-bold text-primary"
              : "border-transparent bg-secondary font-semibold text-muted-foreground",
        )}
      >
        {done ? <Check className={small ? "size-4" : "size-5"} aria-hidden /> : day}
      </div>
    </div>
  );
}
