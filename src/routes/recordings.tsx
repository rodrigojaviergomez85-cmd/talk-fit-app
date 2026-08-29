import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/fluency/AppShell";
import { RecordingPlayback } from "@/components/fluency/RecordingPlayback";
import { CourseService } from "@/services/course-service";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import type { JourneyState } from "@/lib/types";

export const Route = createFileRoute("/recordings")({
  head: () => ({
    meta: [
      { title: "My Recordings — Fluency Reps" },
      { name: "description", content: "Listen to your final speaking rep from each day and compare Day 1 with Day 5." },
      { property: "og:title", content: "My Recordings — Fluency Reps" },
      { property: "og:description", content: "Your saved final reps, day by day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RecordingsPage,
});

function RecordingsPage() {
  const [state, setState] = useState<JourneyState>(emptyJourney);
  const [urls, setUrls] = useState<Record<number, string>>({});

  useEffect(() => {
    setState(JourneyService.load());
    void JourneyService.pull()
      .then(async (next) => {
        setState(next);
        const resolved: Record<number, string> = {};
        for (const record of Object.values(next.days)) {
          if (record.finalUrl) resolved[record.day] = record.finalUrl;
          else if (record.recordingPath) {
            const signed = await JourneyService.signedRecordingUrl(record.recordingPath);
            if (signed) resolved[record.day] = signed;
          }
        }
        setUrls(resolved);
      })
      .catch(() => undefined);
  }, []);

  const records = Object.values(state.days).sort((a, b) => a.day - b.day);
  const first = records[0];
  const last = records.length > 1 ? records[records.length - 1] : undefined;

  return (
    <AppShell title="My Recordings">
      <div className="space-y-5">
        {records.length === 0 ? (
          <p className="rounded-3xl bg-card p-6 text-center text-[15px] text-muted-foreground shadow-[var(--shadow-card)]">
            Finish a day to save your first recording here.
          </p>
        ) : null}

        {first && last ? (
          <section className="rounded-3xl border border-primary/25 bg-accent p-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-foreground">Then vs now</p>
            <p className="mt-1.5 text-[15px] font-semibold">
              Day {first.day}: {first.finalSeconds}s → Day {last.day}: {last.finalSeconds}s
            </p>
          </section>
        ) : null}

        {records.map((record) => (
          <section key={record.day} className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <p className="text-[15px] font-extrabold tracking-tight">
                Day {record.day} · {CourseService.getDay(record.day).topic}
              </p>
              <span className="text-[12px] font-bold text-muted-foreground">{record.finalSeconds}s</span>
            </div>
            {urls[record.day] ? (
              <RecordingPlayback url={urls[record.day] ?? null} label="LISTEN TO MY FINAL REP" />
            ) : (
              <p className="text-[13px] text-muted-foreground">
                Sign in to keep your recordings across devices.
              </p>
            )}
          </section>
        ))}
      </div>
    </AppShell>
  );
}
