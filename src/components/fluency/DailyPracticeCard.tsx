import { Link } from "@tanstack/react-router";
import { Check, Clock, Repeat2 } from "lucide-react";
import type { Lesson } from "@/lib/types";

export function DailyPracticeCard({ lesson, completed = false }: { lesson: Lesson; completed?: boolean }) {
  return (
    <section className="rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Today's practice</p>
      <h2 className="mt-2 text-2xl font-extrabold leading-tight">{lesson.grammar}</h2>
      <p className="mt-1 text-lg font-semibold text-muted-foreground">{lesson.topic}</p>

      {completed ? (
        <p className="mt-4 flex items-center gap-2 rounded-2xl bg-success/10 p-4 text-[16px] font-extrabold text-success">
          <Check className="size-5" strokeWidth={3} /> 5/5 Reps Completed
        </p>
      ) : (
        <p className="mt-4 rounded-2xl bg-secondary/70 p-4 text-[15px] leading-relaxed">
          <span className="font-bold">Goal:</span> speak naturally for {lesson.goalSeconds[0]}–{lesson.goalSeconds[1]} seconds.
        </p>
      )}

      <div className="mt-4 flex items-center gap-4 text-sm font-semibold text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Repeat2 className="size-4" /> 5 Fluency Reps
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="size-4" /> {lesson.estimatedMinutes}
        </span>
      </div>

      {completed ? (
        <>
          <p className="mt-4 text-[15px] text-muted-foreground">
            You already finished today's practice. See you tomorrow 🚀
          </p>
          <Link
            to="/practice"
            className="mt-4 flex w-full items-center justify-center rounded-2xl border border-border bg-card px-6 py-4 text-[15px] font-bold text-foreground transition-transform active:scale-[0.98]"
          >
            PRACTICE AGAIN
          </Link>
        </>
      ) : (
        <Link
          to="/practice"
          className="mt-6 flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-5 text-base font-extrabold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]"
        >
          START TODAY'S PRACTICE
        </Link>
      )}
    </section>
  );
}
