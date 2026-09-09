import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppShell } from "@/components/fluency/AppShell";
import { ReviewGuide } from "@/components/review/ReviewGuide";
import { useAppLang } from "@/lib/i18n";
import { getReviewModule } from "@/services/review/review-registry";
import { ReviewProgress, type ReviewPracticeProgress } from "@/services/review/review-progress";
import type { ReviewModuleId } from "@/lib/review-types";
import { getReviewAccessSnapshot, isReviewModuleAccessible } from "@/services/review/review-access";

export const Route = createFileRoute("/review/$moduleId/")({
  head: ({ params }) => {
    const mod = getReviewModule(params.moduleId);
    const title = mod ? `${mod.title} · Review · Fluency App` : "Review · Fluency App";
    const description = mod
      ? `${mod.subtitle} Five complete speaking practices with a bilingual grammar guide.`
      : "Independent speaking review for Fluency App.";
    return { meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ] };
  },
  component: ReviewModulePage,
});

function ReviewModulePage() {
  const { moduleId } = Route.useParams();
  const { lang } = useAppLang();
  const showEs = lang === "es";
  const mod = getReviewModule(moduleId);
  const [progress, setProgress] = useState<ReviewPracticeProgress[]>(ReviewProgress.emptyList());
  // Read after hydration only: localStorage is not available while rendering on the server.
  const [moduleAccess, setModuleAccess] = useState<"checking" | "allowed" | "locked">("checking");
  const [unlimited, setUnlimited] = useState(false);

  useEffect(() => {
    if (!mod) return;
    const snapshot = getReviewAccessSnapshot();
    setUnlimited(snapshot.unlimited);
    setModuleAccess(isReviewModuleAccessible(mod, snapshot.currentModuleId, snapshot.unlimited) ? "allowed" : "locked");
  }, [mod]);

  useEffect(() => {
    if (!mod) return;
    let alive = true;
    void ReviewProgress.load(mod.id).then((rows) => {
      if (alive) setProgress(rows);
    });
    return () => {
      alive = false;
    };
  }, [mod]);

  if (!mod) return <Navigate to="/review" replace />;
  if (moduleAccess === "locked") return <Navigate to={mod.category === "basic" ? "/review/basic" : "/review/intermediate-advanced"} replace />;
  if (moduleAccess === "checking") return <AppShell><div className="p-4 text-sm text-muted-foreground">…</div></AppShell>;

  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <header className="rounded-3xl bg-navy p-5 text-navy-foreground">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary">{mod.label}</p>
          <h1 className="mt-1 text-2xl font-extrabold">{mod.title}</h1>
          <p className="text-sm text-navy-foreground/80">{mod.titleEs}</p>
          <p className="mt-2 text-xs text-navy-foreground/70">{showEs ? mod.subtitleEs : mod.subtitle}</p>
        </header>

        <ReviewGuide cards={mod.guide} showEs={showEs} errors={mod.commonErrors} heading={mod.title} headingEs={mod.titleEs} />

        <div className="space-y-3">
          {mod.practices.map((p) => {
            const done = (progress.find((r) => r.practiceNumber === p.number)?.completedCount ?? 0) > 0;
            const prevDone = p.number === 1 || (progress.find((r) => r.practiceNumber === ((p.number - 1) as typeof p.number))?.completedCount ?? 0) > 0;
            const locked = !prevDone && !unlimited;

            const inner = (
              <>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-extrabold text-foreground">
                  {p.number}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-base font-bold text-foreground">{p.title}</span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {locked ? (showEs ? "Completa la práctica anterior" : "Complete the previous practice") : p.titleEs}
                  </span>
                </span>
                {locked ? (
                  <Lock className="size-5 text-muted-foreground" />
                ) : done ? (
                  <CheckCircle2 className="size-5 text-primary" />
                ) : (
                  <ArrowRight className="size-5 text-muted-foreground" />
                )}
              </>
            );

            if (locked) {
              return (
                <div
                  key={p.id}
                  aria-disabled="true"
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 opacity-60"
                >
                  {inner}
                </div>
              );
            }

            return (
              <Link
                key={p.id}
                to="/review/$moduleId/$practice"
                params={{ moduleId: mod.id as ReviewModuleId, practice: String(p.number) }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition hover:border-primary"
              >
                {inner}
              </Link>
            );
          })}
        </div>

        <div className="pt-2">
          <Button asChild variant="outline" className="w-full min-h-[48px] text-base font-bold">
            <Link to="/review">
              <ArrowLeft className="mr-2 size-4" /> {showEs ? "ATRÁS A REVIEW" : "BACK TO REVIEW"}
            </Link>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
