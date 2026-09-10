import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ListChecks, MessagesSquare, Sparkles } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";

export const Route = createFileRoute("/natural-method/verbs/")({
  head: () => ({
    meta: [
      { title: "Most Common Verbs · Natural Method" },
      {
        name: "description",
        content: "Verbos más comunes, phrasal verbs e idioms del día a día en inglés, con significado y ejemplos.",
      },
      { property: "og:title", content: "Most Common Verbs · Natural Method" },
      {
        property: "og:description",
        content: "Elige entre lista de verbos, phrasal verbs o idioms para practicar cada día.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VerbsMenu,
});

function VerbsMenu() {
  const showEs = useAppLang().lang === "es";

  const options = [
    {
      to: "/natural-method/verbs/list" as const,
      icon: ListChecks,
      title: showEs ? "Lista de verbos" : "List of Verbs",
      desc: showEs
        ? "100 verbos: presente, pasado, participio y significado."
        : "100 verbs: present, past, participle and meaning.",
    },
    {
      to: "/natural-method/verbs/phrasal" as const,
      icon: MessagesSquare,
      title: "Phrasal Verbs",
      desc: showEs
        ? "100 phrasal verbs en presente, con significado y ejemplo."
        : "100 phrasal verbs in present, with meaning and example.",
    },
    {
      to: "/natural-method/verbs/idioms" as const,
      icon: Sparkles,
      title: "Idioms",
      desc: showEs ? "50 expresiones con significado y ejemplo." : "50 expressions with meaning and example.",
    },
  ];

  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <Link
          to="/natural-method"
          className="inline-flex h-10 items-center gap-1.5 rounded-2xl border border-border px-3 text-[12px] font-bold uppercase tracking-[0.12em]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Natural Method
        </Link>

        <header>
          <h1 className="text-2xl font-extrabold text-foreground">
            {showEs ? "Verbos más comunes" : "Most Common Verbs"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {showEs ? "Elige una lista para practicar." : "Choose a list to practice."}
          </p>
        </header>

        <div className="space-y-3">
          {options.map((option) => (
            <Link
              key={option.to}
              to={option.to}
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                <option.icon className="size-6" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xl font-extrabold text-foreground">{option.title}</span>
                <span className="mt-1 block text-sm text-muted-foreground">{option.desc}</span>
              </span>
              <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
