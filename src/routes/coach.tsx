import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AlertTriangle, Sparkles, Trophy } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { MistakeBank } from "@/components/fluency/MistakeBank";
import { AudioPlayer } from "@/components/fluency/AudioPlayer";
import { ProfileService, defaultProfile } from "@/services/profile-service";
import { LessonService } from "@/services/lesson-service";
import type { LearnerProfile } from "@/lib/types";

export const Route = createFileRoute("/coach")({
  head: () => ({
    meta: [
      { title: "AI Fluency Coach — Fluency Reps" },
      {
        name: "description",
        content: "Your personalized speaking priorities: recurring mistakes, strongest skill and the patterns to train this week.",
      },
      { property: "og:title", content: "AI Fluency Coach — Fluency Reps" },
      { property: "og:description", content: "Personalized speaking priorities based on your recordings." },
    ],
  }),
  component: CoachPage,
});

function CoachPage() {
  const [profile, setProfile] = useState<LearnerProfile>(defaultProfile);
  useEffect(() => setProfile(ProfileService.load()), []);
  const recurring = ProfileService.recurringWeakness(profile);
  const chunks = LessonService.getNaturalSpeechChunks();
  const ladder = LessonService.getExpansionLadder();

  return (
    <AppShell title="Coach">
      <div className="space-y-4">
        <section className="rounded-3xl bg-navy p-6 text-navy-foreground">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
            <Sparkles className="size-4" /> Your current focus
          </p>
          <ol className="mt-4 space-y-3">
            {profile.priorities.map((priority, index) => (
              <li key={priority} className="flex items-center gap-3">
                <span className="flex size-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {index + 1}
                </span>
                <span className="text-[15px] font-semibold">{priority}</span>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm text-navy-foreground/70">"This week we'll practice these automatically."</p>
        </section>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-success">
              <Trophy className="size-4" /> Strongest skill
            </p>
            <p className="mt-2 text-lg font-bold">{profile.strongestSkill}</p>
          </div>
          <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
              <AlertTriangle className="size-4" /> Biggest opportunity
            </p>
            <p className="mt-2 text-lg font-bold">He / She + S</p>
          </div>
        </div>

        {recurring ? (
          <section className="rounded-3xl border border-primary/30 bg-accent p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-foreground">Recurring weakness</p>
            <p className="mt-1 text-xl font-extrabold uppercase">{recurring.categoryLabel}</p>
            <p className="mt-2 text-sm text-foreground/80">
              Seen {recurring.occurrences} times. Extra micro-reps are added to your next sessions.
            </p>
            <div className="mt-4 space-y-2">
              {["He works from home.", "She lives near the office.", "My brother plays soccer on Sundays.", "My manager starts at seven."].map(
                (sentence) => (
                  <div key={sentence} className="flex items-center gap-2 rounded-2xl bg-card p-3">
                    <span className="flex-1 text-[15px] font-semibold">{sentence}</span>
                    <AudioPlayer text={sentence} label="" size="sm" variant="ghost" className="w-auto px-3" />
                  </div>
                ),
              )}
            </div>
          </section>
        ) : null}

        <section>
          <h2 className="mb-3 px-1 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">My top mistakes</h2>
          <MistakeBank mistakes={profile.mistakes} />
        </section>

        <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Natural speech chunks</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {chunks.map((chunk) => (
              <span key={chunk} className="rounded-full bg-secondary px-3 py-1.5 text-sm font-semibold">
                {chunk}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Idea expansion training</p>
          <p className="mt-1 text-sm text-muted-foreground">Add WHO · WHERE · WHEN · WHY · EXAMPLE · FEELING</p>
          <ol className="mt-4 space-y-3">
            {ladder.map((line, index) => (
              <li key={line} className="rounded-2xl bg-secondary/60 p-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">Level {index + 1}</p>
                <p className="mt-1 text-[15px] font-semibold leading-snug">{line}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </AppShell>
  );
}
