import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Headphones, ListChecks } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";

export const Route = createFileRoute("/natural-method/")({
  head: () => ({
    meta: [
      { title: "Natural Method · Fluency App" },
      {
        name: "description",
        content: "Los 100 verbos más usados en inglés y los audiolibros del método natural, en un solo lugar.",
      },
      { property: "og:title", content: "Natural Method · Fluency App" },
      {
        property: "og:description",
        content: "Los 100 verbos más usados en inglés y los audiolibros del método natural.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: NaturalMethodIndex,
});

function NaturalMethodIndex() {
  const { t, lang } = useAppLang();
  const showEs = lang === "es";
  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <header>
          <h1 className="text-2xl font-extrabold text-foreground">Natural Method</h1>
          <div className="mt-2 space-y-2">
            <p className="text-base font-bold text-foreground">
              {t("natural.supportTitle")}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t("natural.supportBody")}
            </p>
          </div>
        </header>


        <div className="space-y-3">
          <Link
            to="/natural-method/verbs"
            className="flex min-h-[132px] items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <ListChecks className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xl font-extrabold text-foreground">
                {showEs ? "Verbos más comunes" : "Most Common Verbs"}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {showEs
                  ? "Lista de verbos, phrasal verbs e idioms con significado y ejemplos."
                  : "List of Verbs, Phrasal Verbs and Idioms with meanings and examples."}
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
          </Link>

          <Link
            to="/natural-method/audiobooks"
            className="flex min-h-[132px] items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary"
          >
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Headphones className="size-6" aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-xl font-extrabold text-foreground">
                {showEs ? "Método natural: audiolibros" : "Natural method audiobooks"}
              </span>
              <span className="mt-1 block text-sm text-muted-foreground">
                {showEs ? "Escucha historias completas y repite en voz alta." : "Listen to full stories and repeat out loud."}
              </span>
            </span>
            <ArrowRight className="size-5 shrink-0 text-primary" aria-hidden="true" />
          </Link>
        </div>

      </div>
    </AppShell>
  );
}

