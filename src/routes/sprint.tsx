import { useEffect, useMemo } from "react";
import { Link, createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { JourneyService } from "@/services/journey-service";
import { AppShell } from "@/components/fluency/AppShell";
import { AuthGate } from "@/components/fluency/AuthGate";
import { TestReadySprint } from "@/components/fluency/TestReadySprint";
import { ModuleLoadError } from "@/components/fluency/ModuleLoadState";
import { useModuleContent } from "@/hooks/use-module-content";
import { CourseService, DEFAULT_MODULE, isModuleId } from "@/services/course-service";
import { useAuth } from "@/lib/auth";
import { useT } from "@/lib/i18n";
import type { ModuleId } from "@/lib/types";

export const Route = createFileRoute("/sprint")({
  validateSearch: (search: Record<string, unknown>) => {
    const raw = search["module"];
    // Missing param → default module. A present-but-unknown id is a not-found (never a silent fallback).
    const module: ModuleId = isModuleId(raw) ? raw : DEFAULT_MODULE;
    return {
      module,
      day: Math.min(CourseService.totalDays(module), Math.max(1, Number(search["day"]) || 1)),
      ...(raw !== undefined && !isModuleId(raw) ? { unknownModule: true as const } : {}),
    };
  },
  beforeLoad: ({ search }) => {
    if (search.unknownModule) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Test Ready Sprint — Fluency Reps" },
      { name: "description", content: "A 3–5 minute listening and speaking sprint inspired by workplace English assessments." },
      { property: "og:title", content: "Test Ready Sprint — Fluency Reps" },
      { property: "og:description", content: "A 3–5 minute listening and speaking sprint inspired by workplace English assessments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SprintPage,
});

function SprintPage() {
  const t = useT();
  const { module: moduleId, day: dayNumber } = Route.useSearch();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const content = useModuleContent(moduleId);
  const outline = CourseService.getDay(moduleId, dayNumber);
  // Ladder guard: sprints of a locked module are not reachable.
  const locked = useMemo(() => !JourneyService.isModuleUnlocked(JourneyService.load(), moduleId), [moduleId]);
  useEffect(() => {
    if (locked) void navigate({ to: "/module/$moduleId", params: { moduleId }, replace: true });
  }, [locked, moduleId, navigate]);

  if (locked || loading || content.status === "loading") {
    return (
      <AppShell title={t("tr.card")}>
        <div className="h-40 animate-pulse rounded-3xl bg-secondary" aria-busy="true" />
      </AppShell>
    );
  }

  if (content.status === "error") {
    return (
      <AppShell title={`${t("tr.card")} · ${t("home.day")} ${outline.day}`}>
        <ModuleLoadError onRetry={content.retry} />
      </AppShell>
    );
  }

  const day = CourseService.dayOf(content.module, dayNumber);
  const sprint = day.testReady;

  if (!user) {
    return (
      <div className="min-h-screen bg-background px-4 py-8">
        <AuthGate blocking />
        <button
          type="button"
          onClick={() => void navigate({ to: "/" })}
          className="mx-auto mt-4 block min-h-[44px] rounded-2xl px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
        >
          {t("nav.home")}
        </button>
      </div>
    );
  }

  return (
    <AppShell title={`${t("tr.card")} · ${t("home.day")} ${day.day}`}>
      <div className="space-y-5">
        <Link
          to="/module/$moduleId"
          params={{ moduleId }}
          className="inline-flex min-h-[44px] items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
        >
          <ArrowLeft className="size-4" /> {t("tr.backToModule")}
        </Link>
        {sprint ? (
          <TestReadySprint key={`${moduleId}:${day.day}`} moduleId={moduleId} day={day.day} sprint={sprint} />
        ) : (
          <div className="rounded-3xl border border-border bg-card p-6 text-center">
            <p className="text-[14px] font-semibold text-muted-foreground">This day has no Test Ready Sprint.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
