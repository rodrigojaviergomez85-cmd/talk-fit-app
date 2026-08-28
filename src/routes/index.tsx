import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Mic, Target, TrendingUp } from "lucide-react";
import { DailyPracticeCard } from "@/components/fluency/DailyPracticeCard";
import { BottomNav } from "@/components/fluency/BottomNav";
import { LessonService } from "@/services/lesson-service";
import { ProfileService, defaultProfile } from "@/services/profile-service";
import type { LearnerProfile } from "@/lib/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Fluency Reps — Train Automatic English Speaking" },
      {
        name: "description",
        content:
          "Daily 10-rep speaking training for adult English learners: listen, shadow, record, and get AI feedback on grammar, rhythm and fluency.",
      },
      { property: "og:title", content: "Fluency Reps — Train Automatic English Speaking" },
      {
        property: "og:description",
        content: "Small reps. Big fluency. Ten daily speaking reps that make English automatic.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const lesson = LessonService.getTodayLesson();
  const [profile, setProfile] = useState<LearnerProfile>(defaultProfile);
  const [completedToday, setCompletedToday] = useState(false);

  useEffect(() => {
    const loaded = ProfileService.load();
    setProfile(loaded);
    setCompletedToday(ProfileService.isTodayCompleted(loaded));
  }, []);

  const weekPct = Math.min(100, Math.round((profile.speakingMinutesThisWeek / profile.weeklyGoalMinutes) * 100));

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-navy px-5 pb-8 pt-[max(1.25rem,env(safe-area-inset-top))] text-navy-foreground">
        <div className="mx-auto w-full max-w-lg">
          <p className="text-[13px] font-extrabold uppercase tracking-[0.28em] text-primary">Fluency Reps</p>
          <h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight">Ready to speak English?</h1>
          <p className="mt-2 text-sm text-navy-foreground/70">
            {profile.level} · Small reps. Big fluency.
          </p>
        </div>
      </header>

      <main className="mx-auto -mt-4 w-full max-w-lg space-y-4 px-4 pb-6">
        <DailyPracticeCard lesson={lesson} completed={completedToday} />

        <div className="grid grid-cols-2 gap-3">
          <StatTile icon={<Flame className="size-4" />} label="Current streak" value={`${profile.streakDays} days`} />
          <StatTile icon={<TrendingUp className="size-4" />} label="Fluency score" value={String(profile.fluencyScore)} />
        </div>

        <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-end justify-between">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Speaking this week</p>
            <p className="text-sm font-bold tabular-nums">
              {profile.speakingMinutesThisWeek} / {profile.weeklyGoalMinutes} min
            </p>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-secondary">
            <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${weekPct}%` }} />
          </div>
        </section>

        <section className="rounded-3xl bg-navy p-5 text-navy-foreground">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            <Target className="size-4" /> Today's focus
          </p>
          <p className="mt-2 text-lg font-bold">{lesson.focus}</p>
        </section>

        <Link
          to="/coach"
          className="flex items-center justify-between rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]"
        >
          <span className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Mic className="size-5" />
            </span>
            <span>
              <span className="block text-[15px] font-bold">Your AI Coach</span>
              <span className="block text-sm text-muted-foreground">See your current priorities</span>
            </span>
          </span>
          <span className="text-xl text-muted-foreground">›</span>
        </Link>
      </main>

      <BottomNav />
    </div>
  );
}

function StatTile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
      <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {icon}
        {label}
      </p>
      <p className="mt-2 text-2xl font-extrabold tabular-nums">{value}</p>
    </div>
  );
}
