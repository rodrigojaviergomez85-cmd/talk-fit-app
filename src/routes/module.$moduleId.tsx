import { useEffect, useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { DailyPracticeCard, JourneyDayRow } from "@/components/fluency/DailyPracticeCard";
import { CourseService } from "@/services/course-service";
import { JourneyService, emptyJourney } from "@/services/journey-service";
import type { JourneyState, ModuleId } from "@/lib/types";

export const Route = createFileRoute("/module/$moduleId")({
  beforeLoad: ({ params }) => {
    if (!CourseService.getModule(params.moduleId as ModuleId)) {
      throw notFound();
    }
  },
  head: ({ params }) => {
    const module = CourseService.getModule(params.moduleId as ModuleId);
    const title = module ? `${module.title} — Fluency Reps` : "Module — Fluency Reps";
    const description = module
      ? `${module.subtitle} ${module.meta.join(" · ")}.`
      : "Fluency Reps learning module.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
      ],
    };
  },
  component: ModulePage,
});

function ModulePage() {
  const { moduleId } = Route.useParams();
  const module = CourseService.getModule(moduleId as ModuleId)!;
  const [state, setState] = useState<JourneyState>(emptyJourney);

  useEffect(() => {
    setState(JourneyService.load());
    void JourneyService.pull().then(setState).catch(() => undefined);
  }, []);

  const total = module.days.length;
  const completedCount = JourneyService.completedCount(state, module.id);
  const currentDay = JourneyService.currentDay(state, module.id);
  const day = CourseService.getDay(module.id, currentDay);
  const completed = JourneyService.isDayCompleted(state, module.id, currentDay);
  const percent = Math.round((completedCount / total) * 100);

  return (
    <AppShell title={module.title}>
      <div className="space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> Modules
        </Link>

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

        <details open className="rounded-3xl border border-border bg-card p-4">
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
                  current={item.day === currentDay}
                />
              </div>
            ))}
          </div>
        </details>
      </div>
    </AppShell>
  );
}
