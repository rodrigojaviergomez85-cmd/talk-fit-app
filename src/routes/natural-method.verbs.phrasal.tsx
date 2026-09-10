import { useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Search } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { Pager, SpeakButton, usePagination } from "@/components/fluency/NaturalMethodPager";
import { PHRASAL_VERBS } from "@/services/natural-method-phrasal-verbs";
import { useAppLang } from "@/lib/i18n";

export const Route = createFileRoute("/natural-method/verbs/phrasal")({
  head: () => ({
    meta: [
      { title: "100 phrasal verbs más comunes · Natural Method" },
      {
        name: "description",
        content: "Los 100 phrasal verbs más usados en inglés, en presente, con significado en español y un ejemplo.",
      },
      { property: "og:title", content: "100 phrasal verbs más comunes · Natural Method" },
      {
        property: "og:description",
        content: "Phrasal verbs del día a día con significado y una oración de ejemplo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PhrasalVerbsPage,
});

function PhrasalVerbsPage() {
  const showEs = useAppLang().lang === "es";
  const [query, setQuery] = useState("");
  const listTop = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return PHRASAL_VERBS;
    return PHRASAL_VERBS.filter((item) => `${item.phrase} ${item.es} ${item.example}`.toLowerCase().includes(q));
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
          <h1 className="text-2xl font-extrabold text-foreground">Phrasal Verbs</h1>
          <p className="text-sm text-muted-foreground">
            {showEs
              ? "100 phrasal verbs en presente, con significado y ejemplo."
              : "100 phrasal verbs in present, with meaning and example."}
          </p>
        </header>

        <label className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={showEs ? "Buscar un phrasal verb…" : "Search a phrasal verb…"}
            aria-label={showEs ? "Buscar un phrasal verb" : "Search a phrasal verb"}
            className="h-11 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
        </label>

        <div ref={listTop} className="scroll-mt-4" />
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {items.length} phrasal verbs
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
