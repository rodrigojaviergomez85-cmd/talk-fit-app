import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Mic } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { ComparisonPlayerCard } from "@/components/fluency/ComparisonPlayerCard";
import { MomentSheet } from "@/components/fluency/MomentSheet";
import { RecordingPlayButton } from "@/components/fluency/RecordingPlayButton";
import { RecordingsGrouped } from "@/components/fluency/RecordingsGrouped";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import { stopPlayback } from "@/hooks/use-recording-playback";
import { firstVsLatest, milestones, type Comparison } from "@/lib/progress-moments";
import { formatDuration, recordHeading } from "@/lib/recordings";
import type { JourneyState } from "@/lib/types";
import { useAppLang, useT } from "@/lib/i18n";

export const Route = createFileRoute("/recordings")({
  head: () => ({
    meta: [
      { title: "My Recordings — Fluency Reps" },
      {
        name: "description",
        content:
          "Listen to your saved Final Rep from each practice and hear how your speaking changes.",
      },
      { property: "og:title", content: "My Recordings — Fluency Reps" },
      {
        property: "og:description",
        content: "Your saved Final Reps, organized by module and week.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RecordingsPage,
});

function RecordingsPage() {
  const [state, setState] = useState<JourneyState | null>(null);
  const [sheet, setSheet] = useState<Comparison | null>(null);
  const t = useT();
  const { lang } = useAppLang();
  const es = lang === "es";

  const load = useCallback(() => {
    setState(JourneyService.load());
    void JourneyService.pull()
      .then(setState)
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    load();
    return () => stopPlayback();
  }, [load]);

  const safe = state ?? emptyJourney;
  const next = JourneyService.nextPractice(safe);
  const pair = useMemo(() => firstVsLatest(safe), [safe]);
  const marks = useMemo(() => milestones(safe), [safe]);

  if (!state) {
    return (
      <AppShell title={t("rec.title")}>
        <div className="space-y-3" aria-busy="true">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-32 animate-pulse rounded-3xl bg-secondary" />
          ))}
        </div>
      </AppShell>
    );
  }

  const total = JourneyService.completedCount(safe);

  return (
    <AppShell title={t("rec.title")}>
      <div className="space-y-6">
        {total === 0 ? (
          <section className="rounded-3xl bg-card p-6 text-center shadow-[var(--shadow-card)]">
            <Mic className="mx-auto size-8 text-primary" />
            <h2 className="mt-3 text-[18px] font-extrabold uppercase tracking-tight">
              {t("rec.emptyTitle")}
            </h2>
            <p className="mt-2 text-[14px] text-muted-foreground">{t("rec.emptyBody")}</p>
            {next ? (
              <Link
                to="/practice"
                search={{ day: next.day, module: next.moduleId }}
                className="mt-5 flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-primary px-6 text-[14px] font-bold tracking-wide text-primary-foreground"
              >
                {next.day === 1 && total === 0
                  ? t("action.startDay1")
                  : t("action.continuePractice")}
              </Link>
            ) : null}
          </section>
        ) : (
          <>
            {/* ESCUCHA TU PROGRESO */}
            <section className="space-y-3">
              <div>
                <h2 className="text-[20px] font-extrabold tracking-tight">
                  {es ? "ESCUCHA TU PROGRESO" : "HEAR YOUR PROGRESS"}
                </h2>
                <p className="text-[13px] font-semibold text-muted-foreground">
                  {es
                    ? "Compara diferentes momentos de tu camino."
                    : "Compare different moments of your journey."}
                </p>
              </div>

              {pair ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <ComparisonPlayerCard
                    caption={es ? "PRIMERA GRABACIÓN" : "FIRST RECORDING"}
                    side={{ day: pair.first.day, record: pair.first, playable: true }}
                    subtitle={recordHeading(pair.first)}
                    missingText=""
                  />
                  <ComparisonPlayerCard
                    caption={es ? "MÁS RECIENTE" : "LATEST"}
                    side={{ day: pair.latest.day, record: pair.latest, playable: true }}
                    subtitle={recordHeading(pair.latest)}
                    missingText=""
                  />
                </div>
              ) : (
                <p className="rounded-3xl border border-primary/25 bg-accent p-4 text-[13px] font-semibold text-accent-foreground">
                  {es
                    ? "Tu comparación PRIMERA vs. MÁS RECIENTE aparecerá cuando guardes más Final Reps."
                    : "Your FIRST vs. LATEST comparison will appear once you save more Final Reps."}
                </p>
              )}

              {marks.length > 2 ? (
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                    {es ? "MOMENTOS CLAVE" : "MILESTONES"}
                  </p>
                  <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
                    {marks.map((m) => (
                      <div
                        key={m.key}
                        className="w-[220px] shrink-0 rounded-3xl bg-card p-3 shadow-[var(--shadow-card)]"
                      >
                        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                          {es ? m.label.es : m.label.en}
                        </p>
                        <p className="mt-0.5 truncate text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                          {recordHeading(m.record)}
                        </p>
                        <p className="text-[13px] font-extrabold tabular-nums">
                          {formatDuration(m.record.finalSeconds)}
                        </p>
                        <RecordingPlayButton record={m.record} className="mt-2 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>

            {/* Grouped library */}
            <section className="space-y-3">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {es ? "TUS FINAL REPS" : "YOUR FINAL REPS"}
              </h2>
              <RecordingsGrouped state={safe} onCompare={setSheet} />
            </section>
          </>
        )}
      </div>

      <MomentSheet comparison={sheet} state={safe} onClose={() => setSheet(null)} />
    </AppShell>
  );
}
