import { Link } from "@tanstack/react-router";
import { ArrowLeft, CalendarClock } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { DAILY_INTERVIEW_CAP } from "@/services/interview-attempts";

/** Shown instead of the interview when today's 2 runs are already used. */
export function InterviewCapReached({ es }: { es: boolean }) {
  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <Link
          to="/review/interview-simulators"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-1.5 text-sm font-semibold text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Interview Simulator
        </Link>

        <div className="space-y-3 rounded-2xl border border-border bg-card p-5 text-center">
          <CalendarClock className="mx-auto size-8 text-primary" aria-hidden="true" />
          <h1 className="text-lg font-extrabold text-foreground">
            {es ? "Ya usaste tus entrevistas de hoy" : "You've used today's interviews"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {es
              ? `Puedes hacer ${DAILY_INTERVIEW_CAP} entrevistas por día en total. Vuelve mañana y practica mientras tanto en Review o Método Natural.`
              : `You can do ${DAILY_INTERVIEW_CAP} interviews per day in total. Come back tomorrow, and practice meanwhile in Review or Natural Method.`}
          </p>
          <div className="flex flex-col gap-2 pt-1">
            <Link
              to="/review"
              className="rounded-xl bg-primary px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-primary-foreground"
            >
              Review
            </Link>
            <Link
              to="/natural-method"
              className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground"
            >
              {es ? "Método Natural" : "Natural Method"}
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

/** Small counter shown inside a running interview. */
export function InterviewCapCounter({
  es,
  used,
  unlimited,
}: {
  es: boolean;
  used: number;
  unlimited: boolean;
}) {
  if (unlimited) return null;
  return (
    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-secondary-foreground">
      {es ? "Entrevistas hoy" : "Interviews today"} {Math.min(used, DAILY_INTERVIEW_CAP)} / {DAILY_INTERVIEW_CAP}
    </span>
  );
}
