import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, Lock } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";

export const Route = createFileRoute("/review/interview-simulators")({
  head: () => ({
    meta: [
      { title: "Interview Simulator · Fluency App" },
      {
        name: "description",
        content: "Elige tu simulador de entrevistas: B4, Intermediate o Advanced.",
      },
      { property: "og:title", content: "Interview Simulator · Fluency App" },
      {
        property: "og:description",
        content: "Elige tu simulador de entrevistas: B4, Intermediate o Advanced.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: InterviewSimulators,
});

function InterviewSimulators() {
  const { lang } = useAppLang();
  const showEs = lang === "es";

  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <Link
          to="/review"
          className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground transition hover:border-primary hover:text-primary"
        >
          ← Review
        </Link>

        <header>
          <h1 className="text-2xl font-extrabold text-foreground">Interview Simulator</h1>
          <p className="text-sm text-muted-foreground">
            {showEs
              ? "Practica entrevistas reales en inglés. Elige tu nivel."
              : "Practice real job interviews in English. Pick your level."}
          </p>
        </header>

        <div className="space-y-3">
          <Link
            to="/review/interview"
            className="flex min-h-[112px] items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BriefcaseBusiness className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-extrabold text-foreground">B4 Interview Simulator</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {showEs ? "Pasado, presente y futuro · 13 turnos" : "Past, present and future · 13 turns"}
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
          </Link>

          <div className="flex min-h-[112px] items-center gap-4 rounded-2xl border border-dashed border-border bg-muted/40 p-5 opacity-80">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Lock className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-extrabold text-muted-foreground">
                Intermediate Interview Simulator
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {showEs
                  ? "Presente perfecto, condicionales y opinión."
                  : "Present perfect, conditionals and opinion."}
              </span>
              <span className="mt-2 block text-xs font-extrabold uppercase text-muted-foreground">
                {showEs ? "Próximamente" : "Coming soon"}
              </span>
            </span>
          </div>

          <div className="flex min-h-[112px] items-center gap-4 rounded-2xl border border-dashed border-border bg-muted/40 p-5 opacity-80">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <Lock className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-extrabold text-muted-foreground">Advanced Simulator</span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {showEs
                  ? "Entrevistas exigentes con repreguntas profundas."
                  : "Demanding interviews with deep follow-ups."}
              </span>
              <span className="mt-2 block text-xs font-extrabold uppercase text-muted-foreground">
                {showEs ? "Próximamente" : "Coming soon"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
