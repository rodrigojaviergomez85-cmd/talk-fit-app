import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Flame, Gauge, Mic, Timer } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { MistakeBank } from "@/components/fluency/MistakeBank";
import { ProfileService, defaultProfile } from "@/services/profile-service";
import type { LearnerProfile } from "@/lib/types";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Your Learner Profile — Fluency Reps" },
      {
        name: "description",
        content: "Your English level, speaking minutes, streak and saved mistake bank inside Fluency Reps.",
      },
      { property: "og:title", content: "Your Learner Profile — Fluency Reps" },
      { property: "og:description", content: "Level, streak, speaking minutes and your personal error bank." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [profile, setProfile] = useState<LearnerProfile>(defaultProfile);
  useEffect(() => setProfile(ProfileService.load()), []);

  return (
    <AppShell title="Profile">
      <div className="space-y-4">
        <section className="rounded-3xl bg-card p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-4">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-navy text-2xl font-extrabold text-navy-foreground">
              {profile.name.charAt(0)}
            </span>
            <div>
              <p className="text-xl font-extrabold">{profile.name}</p>
              <p className="text-sm text-muted-foreground">{profile.level}</p>
            </div>
          </div>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            <Row icon={<Flame className="size-4" />} label="Streak" value={`${profile.streakDays} days`} />
            <Row icon={<Gauge className="size-4" />} label="Fluency score" value={String(profile.fluencyScore)} />
            <Row icon={<Timer className="size-4" />} label="Total speaking" value={`${profile.totalSpeakingMinutes} min`} />
            <Row icon={<Mic className="size-4" />} label="Practices" value={String(profile.lessonsCompleted)} />
          </dl>
        </section>

        <section>
          <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">My top mistakes</h2>
          <MistakeBank mistakes={profile.mistakes} />
        </section>

        <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Weekly goal</p>
          <p className="mt-2 text-lg font-bold">{profile.weeklyGoalMinutes} minutes of speaking</p>
          <p className="mt-1 text-sm text-muted-foreground">{profile.speakingMinutesThisWeek} minutes completed this week.</p>
        </section>

        <button
          type="button"
          onClick={() => {
            if (typeof window !== "undefined") window.localStorage.removeItem("fluency-reps:profile:v1");
            setProfile(defaultProfile);
          }}
          className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-sm font-semibold text-muted-foreground"
        >
          Reset training data
        </button>
      </div>
    </AppShell>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-secondary/60 p-4">
      <dt className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {icon}
        {label}
      </dt>
      <dd className="mt-1.5 text-xl font-extrabold tabular-nums">{value}</dd>
    </div>
  );
}
