import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Clock, Mic } from "lucide-react";
import { CourseService } from "@/services/course-service";
import type { JourneyState } from "@/lib/types";
import { JourneyService } from "@/services/journey-service";

/**
 * The one dominant action on Home: what the learner should practice next.
 * Everything is derived from persisted progress — nothing is hard-coded.
 */
export function ContinueCard({ state }: { state: JourneyState }) {
  const next = JourneyService.nextPractice(state);

  if (!next) {
    return (
      <section className="rounded-3xl bg-navy p-6 text-navy-foreground">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Your journey</p>
        <h2 className="mt-2 text-[26px] font-extrabold leading-tight tracking-tight">
          CURRENT JOURNEY COMPLETE <Check className="inline size-6 align-[-2px]" />
        </h2>
        <p className="mt-2 text-[14px] font-semibold text-navy-foreground/80">
          You finished every module available today. Keep your voice warm by repeating any day.
        </p>
        <Link
          to="/progress"
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl border border-navy-foreground/25 px-6 py-4 text-[15px] font-bold tracking-wide"
        >
          REVIEW MY PROGRESS
        </Link>
      </section>
    );
  }

  const module = CourseService.getModule(next.moduleId);
  const day = CourseService.getDay(next.moduleId, next.day);
  const fresh = JourneyService.completedCount(state) === 0;
  const goalSentences = day.goalSentences ?? 5;

  return (
    <section className="rounded-3xl bg-navy p-6 text-navy-foreground shadow-[var(--shadow-lift)]">
      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-primary">
        {fresh ? "START YOUR JOURNEY" : "CONTINUE YOUR JOURNEY"}
      </p>

      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-navy-foreground/70">
        {module.label.split(" · ")[0]} · {day.week ? `WEEK ${day.week} · ` : ""}DAY {day.day}
      </p>

      <h2 className="mt-1 text-[26px] font-extrabold leading-tight tracking-tight">{day.topic}</h2>
      <p className="mt-1.5 text-[14px] font-semibold text-navy-foreground/80">{module.title}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Chip icon={<Mic className="size-3.5" />} text={`${day.goalSeconds[0]}+ sec`} />
        <Chip icon={<Check className="size-3.5" />} text={`${goalSentences}+ ideas`} />
        <Chip icon={<Clock className="size-3.5" />} text={day.estimatedMinutes} />
      </div>

      <Link
        to="/practice"
        search={{ day: day.day, module: module.id }}
        className="mt-5 flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-[15px] font-bold tracking-wide text-primary-foreground transition-transform active:scale-[0.98]"
      >
        {fresh ? `START DAY ${day.day}` : "CONTINUE PRACTICE"} <ArrowRight className="size-4" />
      </Link>
    </section>
  );
}

function Chip({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-foreground/10 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em]">
      {icon} {text}
    </span>
  );
}
