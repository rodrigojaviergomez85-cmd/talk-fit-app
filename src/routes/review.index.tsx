import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";
import { listReviewModules } from "@/services/review/review-registry";

export const Route = createFileRoute("/review/")({
  head: () => ({
    meta: [
      { title: "Review · Fluency App" },
      { name: "description", content: "Refuerza la gramática que ya practicaste con cinco prácticas habladas por módulo." },
      { property: "og:title", content: "Review · Fluency App" },
      { property: "og:description", content: "Refuerza la gramática que ya practicaste con cinco prácticas habladas por módulo." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReviewIndex,
});

function ReviewIndex() {
  const { lang } = useAppLang();
  const showEs = lang === "es";
  const modules = listReviewModules();

  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <header>
          <h1 className="text-2xl font-extrabold text-foreground">Review</h1>
          <p className="text-sm text-muted-foreground">
            {showEs
              ? "Refuerzo independiente. No cambia tu progreso del curso ni tu hábito de 66 días."
              : "Independent reinforcement. It does not change your course progress or your 66-day habit."}
          </p>
        </header>

        {modules.map((mod) => (
          <Link
            key={mod.id}
            to="/review/$moduleId"
            params={{ moduleId: mod.id }}
            className="block rounded-3xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary">{mod.label}</p>
            <h2 className="mt-1 text-xl font-extrabold text-foreground">{mod.title}</h2>
            <p className="text-sm text-muted-foreground">{mod.titleEs}</p>
            <p className="mt-2 text-xs text-muted-foreground">{showEs ? mod.subtitleEs : mod.subtitle}</p>
            <span className="mt-3 flex items-center gap-1 text-xs font-extrabold uppercase tracking-widest text-primary">
              {showEs ? "5 prácticas" : "5 practices"} <ArrowRight className="size-4" />
            </span>
          </Link>
        ))}
      </div>
    </AppShell>
  );
}
