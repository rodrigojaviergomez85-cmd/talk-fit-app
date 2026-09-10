import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ChevronDown, PlayCircle } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { useAppLang } from "@/lib/i18n";
import { NATURAL_METHOD_AUDIOBOOKS, type NaturalMethodAudiobook } from "@/services/natural-method-audiobooks";

export const Route = createFileRoute("/natural-method/audiobooks")({
  head: () => ({
    meta: [
      { title: "Audiolibros · Natural Method" },
      {
        name: "description",
        content: "Audiolibros del método natural por nivel: escucha la historia y repite en voz alta para ganar fluidez.",
      },
      { property: "og:title", content: "Audiolibros · Natural Method" },
      { property: "og:description", content: "Escucha y repite: audiolibros del método natural por nivel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AudiobooksPage,
});

function AudiobooksPage() {
  const showEs = useAppLang().lang === "es";
  const basicBooks = NATURAL_METHOD_AUDIOBOOKS.filter((book) => book.level === "basic");
  const intermediateBooks = NATURAL_METHOD_AUDIOBOOKS.filter((book) => book.level === "intermediate");
  const advancedBooks = NATURAL_METHOD_AUDIOBOOKS.filter((book) => book.level === "advanced");

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

        <LevelSection
          title={showEs ? "Nivel básico" : "Basic level"}
          books={basicBooks}
          showEs={showEs}
          defaultOpen
        />
        <LevelSection
          title={showEs ? "Nivel intermedio" : "Intermediate level"}
          books={intermediateBooks}
          showEs={showEs}
        />
        <LevelSection
          title={showEs ? "Nivel avanzado" : "Advanced level"}
          books={advancedBooks}
          showEs={showEs}
        />
      </div>
    </AppShell>
  );
}

function LevelSection({
  title,
  books,
  showEs,
  defaultOpen = false,
}: {
  title: string;
  books: NaturalMethodAudiobook[];
  showEs: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card" aria-label={title}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 p-4 text-left"
      >
        <span>
          <span className="block text-[15px] font-extrabold text-foreground">{title}</span>
          <span className="block text-[12px] text-muted-foreground">
            {books.length} {showEs ? "historias" : "stories"}
          </span>
        </span>
        <ChevronDown
          className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <ul className="space-y-3 border-t border-border p-3">
          {books.map((book) => (
            <li key={book.id}>
              <a
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-border bg-background p-3 transition hover:border-primary"
              >
                <img
                  src={book.image}
                  alt={book.imageAlt}
                  width={512}
                  height={512}
                  loading="lazy"
                  decoding="async"
                  className="size-16 shrink-0 rounded-xl border border-border object-cover"
                />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[16px] font-extrabold text-foreground">{book.title}</span>
                  <span className="mt-0.5 block text-[12px] text-muted-foreground">
                    {showEs ? "Toca para ver y escuchar la historia" : "Tap to watch and listen to the story"}
                  </span>
                </span>
                <PlayCircle className="size-7 shrink-0 text-primary" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}
