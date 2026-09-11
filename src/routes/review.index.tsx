import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Layers3 } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";

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

        <div className="space-y-3">
          <Link
            to="/review/basic"
            className="flex min-h-[132px] items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <GraduationCap className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xl font-extrabold text-foreground">Basic</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {showEs ? "Refuerza las estructuras esenciales." : "Reinforce essential structures."}
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
          </Link>

          <Link
            to="/review/intermediate-advanced"
            className="flex min-h-[132px] items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Layers3 className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xl font-extrabold text-foreground">Intermediate + Advanced</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {showEs ? "Perfecciona estructuras más avanzadas." : "Strengthen more advanced structures."}
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
          </Link>

          <Link
            to="/review/interview"
            className="flex min-h-[132px] items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BriefcaseBusiness className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xl font-extrabold text-foreground">Interview Simulator</span>
              <span className="block text-sm text-muted-foreground">Simulador de entrevistas</span>
              <span className="mt-2 block text-xs font-extrabold uppercase text-primary">
                {showEs ? "Prueba beta · 2 preguntas" : "Beta test · 2 questions"}
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
