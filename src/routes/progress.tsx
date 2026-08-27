import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Award, Flame, Mic, Timer } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { ProgressChart } from "@/components/fluency/ProgressChart";
import { RecordingComparison } from "@/components/fluency/RecordingComparison";
import { ProfileService, defaultProfile } from "@/services/profile-service";
import { LessonService } from "@/services/lesson-service";
import type { LearnerProfile } from "@/lib/types";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Your Speaking Progress — Fluency Reps" },
      {
        name: "description",
        content: "Track streaks, speaking minutes, fluency score trend and hear the difference between your first and latest recording.",
      },
      { property: "og:title", content: "Your Speaking Progress — Fluency Reps" },
      { property: "og:description", content: "Streaks, speaking minutes and your fluency score trend over time." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const [profile, setProfile] = useState<LearnerProfile>(defaultProfile);
  useEffect(() => setProfile(ProfileService.load()), []);
  const lesson = LessonService.getTodayLesson();
  const modelText = LessonService.getModelText(lesson);

  return (
    <AppShell title="Progress">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Tile icon={<Flame className="size-4" />} label="Current streak" value={`${profile.streakDays} days`} />
          <Tile icon={<Timer className="size-4" />} label="Speaking this week" value={`${profile.speakingMinutesThisWeek} min`} />
          <Tile icon={<Award className="size-4" />} label="Fluency score" value={String(profile.fluencyScore)} />
          <Tile icon={<Mic className="size-4" />} label="Practices completed" value={String(profile.lessonsCompleted)} />
        </div>

        <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Score trend</p>
          <ProgressChart data={profile.history} className="mt-3" />
          <p className="mt-2 text-center text-sm font-semibold text-primary">"You're becoming more automatic."</p>
        </section>

        <section className="rounded-3xl bg-navy p-5 text-navy-foreground">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-primary">New personal best</p>
          <p className="mt-2 text-2xl font-extrabold">{profile.bestContinuousSeconds} seconds</p>
          <p className="mt-1 text-sm text-navy-foreground/70">speaking continuously · {profile.totalSpeakingMinutes} minutes of English spoken</p>
        </section>

        <section>
          <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Then vs now</h2>
          <RecordingComparison leftLabel="▶ DAY 1" rightLabel="▶ TODAY" modelText={modelText} rightUrl={null} caption="Hear your improvement" />
          <p className="mt-2 px-1 text-xs text-muted-foreground">
            Your Day 1 and latest recordings appear here after you finish today's session.
          </p>
        </section>

        <section>
          <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Current priorities</h2>
          <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <ol className="space-y-3">
              {profile.priorities.map((priority, index) => (
                <li key={priority} className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full bg-secondary text-sm font-bold">{index + 1}</span>
                  <span className="text-[15px] font-semibold">{priority}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function Tile({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
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
