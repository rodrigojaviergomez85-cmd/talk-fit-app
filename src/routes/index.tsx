import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Flame, Mic, Timer } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { DailyPracticeCard, JourneyDayRow } from "@/components/fluency/DailyPracticeCard";
import { CourseService } from "@/services/course-service";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import type { JourneyState } from "@/lib/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fluency Reps — Speak English Every Day" },
      {
        name: "description",
        content: "A 5-day Simple Present speaking journey: 5 short reps a day to make your English automatic.",
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

  const days = CourseService.getDays();
  const currentDay = JourneyService.currentDay(state);
  const day = CourseService.getDay(currentDay);
  const completed = JourneyService.isDayCompleted(state, currentDay);

  return (
    <AppShell title="Today">
      <div className="space-y-5">
        <DailyPracticeCard day={day} completed={completed} totalDays={CourseService.totalDays} />

        <div className="grid grid-cols-3 gap-3">
          <Stat icon={<Flame className="size-4 text-primary" />} label="Streak" value={`${state.streakDays}`} />
          <Stat icon={<Mic className="size-4 text-primary" />} label="Reps" value={`${state.totalRepsCompleted}`} />
          <Stat icon={<Timer className="size-4 text-primary" />} label="Minutes" value={`${JourneyService.totalSpeakingMinutes(state)}`} />
        </div>

        <section className="space-y-3">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Your 5-day journey
          </h2>
          <div className="space-y-2">
            {days.map((item) => (
              <JourneyDayRow
                key={item.day}
                day={item}
                completed={JourneyService.isDayCompleted(state, item.day)}
                unlocked={JourneyService.isDayUnlocked(state, item.day)}
                current={item.day === currentDay}
              />
            ))}
          </div>
        </section>
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
