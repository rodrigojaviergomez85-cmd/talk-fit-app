import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Flame, Mic, Timer } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { CourseService } from "@/services/course-service";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import type { JourneyState } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "My Progress — Fluency Reps" },
      { name: "description", content: "Objective speaking progress: days completed, reps, speaking minutes and streak." },
      { property: "og:title", content: "My Progress — Fluency Reps" },
      { property: "og:description", content: "See your days completed, total reps and speaking minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const [state, setState] = useState<JourneyState>(emptyJourney);

  useEffect(() => {
    setState(JourneyService.load());
    void JourneyService.pull().then(setState).catch(() => undefined);
  }, []);

  const modules = CourseService.modules();
  const completedCount = JourneyService.completedCount(state);
  const totalDays = modules.reduce((sum, m) => sum + m.days.length, 0);

  return (
    <AppShell title="My Progress">
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <Stat icon={<Check className="size-4 text-primary" />} label="Days completed" value={`${completedCount} / ${totalDays}`} />
          <Stat icon={<Mic className="size-4 text-primary" />} label="Total reps" value={`${state.totalRepsCompleted}`} />
          <Stat icon={<Timer className="size-4 text-primary" />} label="Minutes this week" value={`${JourneyService.speakingMinutesThisWeek(state)}`} />
          <Stat icon={<Flame className="size-4 text-primary" />} label="Streak" value={`${state.streakDays}`} />
        </div>

        {modules.map((module) => (
        <section key={module.id} className="space-y-2">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            {module.title} · {JourneyService.completedCount(state, module.id)} / {module.days.length} days
          </h2>
          {module.days.map((day) => {
            const record = JourneyService.getRecord(state, module.id, day.day);
            return (
              <div
                key={day.day}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-2xl border p-4",
                  record ? "border-success/30 bg-success/8" : "border-border bg-card",
                )}
              >
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-bold tracking-tight">
                    Day {day.day} · {day.topic}
                  </p>
                  <p className="truncate text-[12px] text-muted-foreground">{day.focus}</p>
                </div>
                <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {record ? `${record.finalSeconds}s` : "—"}
                </span>
              </div>
            );
          })}
        </section>
        ))}

        {state.selfAssessment ? (
          <div className="rounded-3xl border border-primary/25 bg-accent p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-foreground">Self check</p>
            <p className="mt-1.5 text-[15px] font-semibold">
              Speaking feels easier than Day 1:{" "}
              {state.selfAssessment === "definitely" ? "Definitely" : state.selfAssessment === "a-little" ? "A little" : "Not yet"}
            </p>
          </div>
        ) : null}
      </div>
    </AppShell>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-card p-4 text-center shadow-[var(--shadow-card)]">
      <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
        {icon} {label}
      </p>
      <p className="mt-1.5 text-2xl font-extrabold tabular-nums tracking-tight">{value}</p>
    </div>
  );
}
