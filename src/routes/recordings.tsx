import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Mic } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { RecordingCard } from "@/components/fluency/RecordingCard";
import { CourseService } from "@/services/course-service";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import { stopPlayback } from "@/hooks/use-recording-playback";
import type { JourneyState, ModuleId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/recordings")({
  head: () => ({
    meta: [
      { title: "My Recordings — Fluency Reps" },
      { name: "description", content: "Listen to your saved Final Rep from each practice and hear how your speaking changes." },
      { property: "og:title", content: "My Recordings — Fluency Reps" },
      { property: "og:description", content: "Your saved Final Reps, organized by module and day." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: RecordingsPage,
});

const PAGE_SIZE = 20;

function RecordingsPage() {
  const [state, setState] = useState<JourneyState | null>(null);
  const t = useT();
  const [filter, setFilter] = useState<ModuleId | "all">("all");
  const [sort, setSort] = useState<"recent" | "oldest">("recent");
  const [visible, setVisible] = useState(PAGE_SIZE);

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
  const modules = CourseService.modules();
  const next = JourneyService.nextPractice(safe);

  const records = useMemo(() => {
    const list = JourneyService.recordsByDate(safe).filter(
      (record) => filter === "all" || record.moduleId === filter,
    );
    return sort === "recent" ? [...list].reverse() : list;
  }, [safe, filter, sort]);

  useEffect(() => {
    setVisible(PAGE_SIZE);
    stopPlayback();
  }, [filter, sort]);

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
      <div className="space-y-5">
        {total === 0 ? (
          <section className="rounded-3xl bg-card p-6 text-center shadow-[var(--shadow-card)]">
            <Mic className="mx-auto size-8 text-primary" />
            <h2 className="mt-3 text-[18px] font-extrabold uppercase tracking-tight">{t("rec.emptyTitle")}</h2>
            <p className="mt-2 text-[14px] text-muted-foreground">{t("rec.emptyBody")}</p>
            {next ? (
              <Link
                to="/practice"
                search={{ day: next.day, module: next.moduleId }}
                className="mt-5 flex min-h-[52px] w-full items-center justify-center rounded-2xl bg-primary px-6 text-[14px] font-bold tracking-wide text-primary-foreground"
              >
                {next.day === 1 && total === 0 ? t("action.startDay1") : t("action.continuePractice")}
              </Link>
            ) : null}
          </section>
        ) : (
          <>
            <p className="text-[13px] text-muted-foreground">
              {t("rec.intro")}
            </p>

            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              <Chip active={filter === "all"} onClick={() => setFilter("all")} label={t("rec.all")} />
              {modules.map((module) => (
                <Chip
                  key={module.id}
                  active={filter === module.id}
                  onClick={() => setFilter(module.id)}
                  label={module.label.split(" · ")[0] ?? module.title}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <Chip active={sort === "recent"} onClick={() => setSort("recent")} label={t("rec.recent")} />
              <Chip active={sort === "oldest"} onClick={() => setSort("oldest")} label={t("rec.oldest")} />
            </div>

            {records.length === 0 ? (
              <p className="rounded-3xl bg-card p-6 text-center text-[14px] text-muted-foreground shadow-[var(--shadow-card)]">
                {t("rec.noneInModule")}
              </p>
            ) : null}

            <div className="space-y-3">
              {records.slice(0, visible).map((record) => (
                <RecordingCard key={`${record.moduleId}:${record.day}`} record={record} />
              ))}
            </div>

            {records.length > visible ? (
              <button
                type="button"
                onClick={() => setVisible((v) => v + PAGE_SIZE)}
                className="min-h-[48px] w-full rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]"
              >
                {t("action.loadMore")}
              </button>
            ) : null}
          </>
        )}
      </div>
    </AppShell>
  );
}

function Chip({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "min-h-[40px] shrink-0 rounded-full px-4 text-[11px] font-bold uppercase tracking-[0.14em] transition-colors",
        active ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground",
      )}
    >
      {label}
    </button>
  );
}
