import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, BriefcaseBusiness } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";

export const Route = createFileRoute("/practicar")({
  head: () => ({
    meta: [
      { title: "Practicar — Fluency App" },
      { name: "description", content: "Accede al repaso y al simulador de entrevistas de Fluency App." },
      { property: "og:title", content: "Practicar — Fluency App" },
      { property: "og:description", content: "Repaso y simuladores para practicar tu inglés hablado." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PracticeHub,
});

function PracticeHub() {
  const { lang } = useAppLang();
  const es = lang !== "en";
  const options = [
    {
      to: "/review" as const,
      icon: BookOpen,
      title: es ? "Review / Repaso" : "Review",
      body: es ? "Refuerza gramática con práctica hablada." : "Reinforce grammar with speaking practice.",
    },
    {
      to: "/review/interview-simulators" as const,
      icon: BriefcaseBusiness,
      title: es ? "Simulador de entrevista" : "Interview simulator",
      body: es ? "Practica respuestas para entrevistas reales." : "Practice answers for real interviews.",
    },
  ];

  return (
    <AppShell title={es ? "Practicar" : "Practice"} subtitle={es ? "Elige cómo quieres reforzar tu inglés." : "Choose how to strengthen your English."}>
      <div className="space-y-3">
        {options.map(({ to, icon: Icon, title, body }) => (
          <Link key={to} to={to} className="flex min-h-28 items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)] transition-colors hover:border-primary">
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground"><Icon className="size-6" aria-hidden /></span>
            <span className="min-w-0 flex-1"><span className="block text-lg font-extrabold text-foreground">{title}</span><span className="mt-1 block text-sm text-muted-foreground">{body}</span></span>
            <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden />
          </Link>
        ))}
      </div>
    </AppShell>
  );
}