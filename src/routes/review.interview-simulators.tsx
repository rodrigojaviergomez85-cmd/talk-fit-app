import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";
import { useInterviewCap } from "@/hooks/use-interview-cap";

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
  // DAILY INTERVIEW CAP shared by the three simulators. The number comes from
  // the server (free limit x plan multiplier), so Pro sees its real cap.
  const cap = useInterviewCap("b4");
  const dailyCap = cap.limit > 0 ? cap.limit : (cap.status?.cap ?? 0);
  const used = Math.min(cap.status?.used ?? 0, dailyCap);
  const capFull = Boolean(cap.status && !cap.status.unlimited && dailyCap > 0 && cap.status.used >= dailyCap);

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

        {cap.status && !cap.status.unlimited && dailyCap > 0 ? (
          <p
            className={`rounded-xl border px-3 py-2 text-xs font-semibold ${
              capFull
                ? "border-primary/40 bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            {capFull
              ? showEs
                ? `Has usado ${dailyCap} / ${dailyCap} entrevistas hoy. Vuelve mañana.`
                : `You've used ${dailyCap} / ${dailyCap} interviews today. Come back tomorrow.`
              : showEs
                ? `Entrevistas hoy: ${used} / ${dailyCap}`
                : `Interviews today: ${used} / ${dailyCap}`}
          </p>
        ) : null}

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

          <Link
            to="/review/interview-intermediate"
            className="flex min-h-[112px] items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BriefcaseBusiness className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-extrabold text-foreground">
                Intermediate Interview Simulator
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {showEs
                  ? "Comparativos, superlativos, modales, present perfect y -ed · 19 turnos"
                  : "Comparatives, superlatives, modals, present perfect and -ed · 19 turns"}
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
          </Link>

          <Link
            to="/review/interview-advanced"
            className="flex min-h-[112px] items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <BriefcaseBusiness className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-lg font-extrabold text-foreground">
                Advanced Interview Simulator
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {showEs
                  ? "Hipotéticos, customer service, ventas y persuasión · 22 turnos"
                  : "Hypotheticals, customer service, sales and persuasion · 22 turns"}
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
