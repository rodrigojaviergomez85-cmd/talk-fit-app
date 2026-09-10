import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Headphones } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";

export const Route = createFileRoute("/natural-method/audiobooks")({
  head: () => ({
    meta: [
      { title: "Audiolibros · Natural Method" },
      {
        name: "description",
        content: "Escucha los audiolibros del método natural y repite en voz alta para ganar fluidez.",
      },
      { property: "og:title", content: "Audiolibros · Natural Method" },
      { property: "og:description", content: "Escucha y repite: audiolibros del método natural." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AudiobooksPage,
});

function AudiobooksPage() {
  const showEs = useAppLang().lang === "es";
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
            {showEs ? "Método natural: audiolibros" : "Natural method audiobooks"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {showEs
              ? "Escucha la historia completa, luego repite en voz alta frase por frase."
              : "Listen to the full story, then repeat out loud sentence by sentence."}
          </p>
        </header>

        <div className="rounded-2xl border border-dashed border-border bg-card p-6 text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Headphones className="size-6" aria-hidden="true" />
          </span>
          <p className="mt-3 text-[15px] font-extrabold text-foreground">
            {showEs ? "Audiolibros en camino" : "Audiobooks coming soon"}
          </p>
          <p className="mt-1 text-[14px] text-muted-foreground">
            {showEs
              ? "Aquí aparecerán los audiolibros en cuanto se agreguen."
              : "The audiobooks will appear here as soon as they are added."}
          </p>
        </div>
      </div>
    </AppShell>
  );
}
