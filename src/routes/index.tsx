import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Flame, Mic, Timer } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { DailyPracticeCard, JourneyDayRow } from "@/components/fluency/DailyPracticeCard";
import { CourseService, type LearningModule } from "@/services/course-service";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import type { JourneyState } from "@/lib/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fluency Reps — Speak English Every Day" },
      {
        name: "description",
        content:
          "Basic Zero: 4 weeks to introduce yourself and someone else in English, then a 5-day Simple Present journey. Five short speaking reps a day.",
      },
      { property: "og:title", content: "Fluency Reps — Speak English Every Day" },
      { property: "og:description", content: "Five short speaking reps a day. Listen, copy, shadow, personalize, record." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [state, setState] = useState<JourneyState>(emptyJourney);

  useEffect(() => {
    setState(JourneyService.load());
    void JourneyService.pull().then(setState).catch(() => undefined);
  }, []);

  const modules = CourseService.modules();

  return (
    <AppShell title="Today">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          <Stat icon={<Flame className="size-4 text-primary" />} label="Streak" value={`${state.streakDays}`} />
          <Stat icon={<Mic className="size-4 text-primary" />} label="Reps" value={`${state.totalRepsCompleted}`} />
          <Stat icon={<Timer className="size-4 text-primary" />} label="Minutes" value={`${JourneyService.totalSpeakingMinutes(state)}`} />
        </div>

        {modules.map((module) => (
          <ModuleSection key={module.id} module={module} state={state} />
        ))}
      </div>
    </AppShell>
  );
}

function ModuleSection({ module, state }: { module: LearningModule; state: JourneyState }) {
  const total = module.days.length;
  const completedCount = JourneyService.completedCount(state, module.id);
  const currentDay = JourneyService.currentDay(state, module.id);
  const day = CourseService.getDay(module.id, currentDay);
  const completed = JourneyService.isDayCompleted(state, module.id, currentDay);
  const percent = Math.round((completedCount / total) * 100);

  return (
    <section className="space-y-3">
      <div className="rounded-3xl bg-navy p-5 text-navy-foreground">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{module.label}</p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{module.title}</h2>
        <p className="mt-1 text-[14px] font-semibold text-navy-foreground/80">{module.subtitle}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {module.meta.map((item) => (
            <span
              key={item}
              className="rounded-full bg-navy-foreground/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-navy-foreground/15">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${percent}%` }} />
          </div>
          <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-navy-foreground/70">
            {completedCount} / {total} days
          </p>
        </div>
      </div>

      <DailyPracticeCard moduleId={module.id} day={day} completed={completed} totalDays={total} />

      <details className="rounded-3xl border border-border bg-card p-4">
        <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          All {total} days
        </summary>
        <div className="mt-3 space-y-2">
          {module.days.map((item) => (
            <div key={item.day}>
              {module.weeks && item.week && module.days.find((d) => d.week === item.week)?.day === item.day ? (
                <p className="pb-1.5 pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">
                  Week {item.week} · {module.weeks.find((w) => w.week === item.week)?.title}
                </p>
              ) : null}
              <JourneyDayRow
                moduleId={module.id}
                day={item}
                completed={JourneyService.isDayCompleted(state, module.id, item.day)}
                unlocked={JourneyService.isDayUnlocked(state, module.id, item.day)}
                current={item.day === currentDay}
              />
            </div>
          ))}
        </div>
      </details>
    </section>
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
