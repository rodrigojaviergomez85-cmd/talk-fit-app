import { useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Search } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { Pager, SpeakButton, usePagination } from "@/components/fluency/NaturalMethodPager";
import { IDIOMS } from "@/services/natural-method-idioms";
import { useAppLang } from "@/lib/i18n";

export const Route = createFileRoute("/natural-method/verbs/idioms")({
  head: () => ({
    meta: [
      { title: "50 idioms más comunes · Natural Method" },
      {
        name: "description",
        content: "50 idioms del inglés diario con su significado en español y una oración de ejemplo.",
      },
      { property: "og:title", content: "50 idioms más comunes · Natural Method" },
      {
        property: "og:description",
        content: "Expresiones idiomáticas comunes con significado y ejemplo para practicar en voz alta.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: IdiomsPage,
});

function IdiomsPage() {
  const showEs = useAppLang().lang === "es";
  const [query, setQuery] = useState("");
  const listTop = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return IDIOMS;
    return IDIOMS.filter((item) => `${item.phrase} ${item.es} ${item.example}`.toLowerCase().includes(q));
  }, [query]);

  const { page, setPage, pageCount, start, end } = usePagination(items.length, query);
  const visible = items.slice(start, end);

  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <Link
          to="/natural-method/verbs"
          className="inline-flex h-10 items-center gap-1.5 rounded-2xl border border-border px-3 text-[12px] font-bold uppercase tracking-[0.12em]"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          {showEs ? "Verbos" : "Verbs"}
        </Link>

        <header>
          <h1 className="text-2xl font-extrabold text-foreground">Idioms</h1>
          <p className="text-sm text-muted-foreground">
            {showEs
              ? "50 expresiones comunes con significado y ejemplo."
              : "50 common expressions with meaning and example."}
          </p>
        </header>

        <label className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={showEs ? "Buscar un idiom…" : "Search an idiom…"}
            aria-label={showEs ? "Buscar un idiom" : "Search an idiom"}
            className="h-11 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
        </label>

        <div ref={listTop} className="scroll-mt-4" />
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {items.length} idioms
        </p>

        <ul className="space-y-2">
          {visible.map((item, index) => (
            <li key={item.phrase} className="rounded-2xl border border-border bg-card p-4">
              <span className="text-[11px] font-bold text-muted-foreground">{start + index + 1}</span>
              <div className="mt-1 flex items-center gap-2">
                <SpeakButton text={item.phrase} showEs={showEs} />
                <span className="text-[17px] font-extrabold text-foreground">{item.phrase}</span>
              </div>
              <p className="mt-2 text-[14px] text-muted-foreground">{item.es}</p>
              <p className="mt-1 text-[15px] italic text-foreground">“{item.example}”</p>
            </li>
          ))}
        </ul>

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">{showEs ? "Sin resultados." : "No results."}</p>
        ) : (
          <Pager page={page} pageCount={pageCount} onChange={setPage} showEs={showEs} scrollTargetRef={listTop} />
        )}
      </div>
    </AppShell>
  );
}
