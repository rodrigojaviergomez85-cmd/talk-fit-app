import { useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, Languages, Search } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { Pager, SpeakButton, usePagination } from "@/components/fluency/NaturalMethodPager";
import { COMMON_VERBS } from "@/services/natural-method-verbs";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/natural-method/verbs/list")({
  head: () => ({
    meta: [
      { title: "100 verbos más comunes · Natural Method" },
      {
        name: "description",
        content: "Los 100 verbos más usados en inglés con presente, pasado, participio pasado y significado en español.",
      },
      { property: "og:title", content: "100 verbos más comunes · Natural Method" },
      {
        property: "og:description",
        content: "Presente, pasado, participio pasado y significado de los 100 verbos del día a día.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VerbsListPage,
});

type Filter = "all" | "irregular" | "regular";

function VerbsListPage() {
  const showEs = useAppLang().lang === "es";
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [translated, setTranslated] = useState<Set<string>>(new Set());
  const listTop = useRef<HTMLDivElement>(null);

  const toggleTranslation = (base: string) => {
    setTranslated((prev) => {
      const next = new Set(prev);
      if (next.has(base)) next.delete(base);
      else next.add(base);
      return next;
    });
  };

  const verbs = useMemo(() => {
    const q = query.trim().toLowerCase();
    return COMMON_VERBS.filter((verb) => {
      if (filter === "irregular" && !verb.irregular) return false;
      if (filter === "regular" && verb.irregular) return false;
      if (!q) return true;
      return `${verb.base} ${verb.past} ${verb.participle} ${verb.es} ${verb.example} ${verb.exampleEs}`
        .toLowerCase()
        .includes(q);
    });
  }, [query, filter]);

  const { page, setPage, pageCount, start, end } = usePagination(verbs.length, `${query}|${filter}`);
  const visible = verbs.slice(start, end);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: showEs ? "TODOS" : "ALL" },
    { id: "irregular", label: showEs ? "IRREGULARES" : "IRREGULAR" },
    { id: "regular", label: showEs ? "REGULARES" : "REGULAR" },
  ];

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
          <h1 className="text-2xl font-extrabold text-foreground">
            {showEs ? "100 verbos más comunes" : "100 most common verbs"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {showEs
              ? "Presente · Pasado · Participio pasado · Significado"
              : "Present · Past · Past participle · Meaning"}
          </p>
        </header>

        <label className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3">
          <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={showEs ? "Buscar un verbo…" : "Search a verb…"}
            aria-label={showEs ? "Buscar un verbo" : "Search a verb"}
            className="h-11 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground"
          />
        </label>

        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={cn(
                "min-h-10 shrink-0 rounded-full border px-4 text-[12px] font-bold uppercase tracking-[0.12em]",
                filter === item.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div ref={listTop} className="scroll-mt-4" />
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {verbs.length} {showEs ? "verbos" : "verbs"}
        </p>

        <ul className="space-y-2">
          {visible.map((verb, index) => (
            <li key={verb.base} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[11px] font-bold text-muted-foreground">{start + index + 1}</span>
                {verb.irregular ? (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                    Irregular
                  </span>
                ) : null}
              </div>
              <div className="mt-1 grid grid-cols-3 gap-2">
                <span className="flex items-start gap-1.5">
                  <SpeakButton text={verb.base} showEs={showEs} />
                  <span className="text-[15px] font-extrabold leading-8 text-foreground">{verb.base}</span>
                </span>
                <span className="flex items-start gap-1.5">
                  <SpeakButton text={verb.past} showEs={showEs} />
                  <span className="text-[15px] font-extrabold leading-8 text-foreground">{verb.past}</span>
                </span>
                <span className="flex items-start gap-1.5">
                  <SpeakButton text={verb.participle} showEs={showEs} />
                  <span className="text-[15px] font-extrabold leading-8 text-foreground">{verb.participle}</span>
                </span>
              </div>
              <div className="mt-1 grid grid-cols-3 gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                <span>{showEs ? "Presente" : "Present"}</span>
                <span>{showEs ? "Pasado" : "Past"}</span>
                <span>{showEs ? "Participio" : "Participle"}</span>
              </div>
              <p className="mt-2 text-[14px] text-muted-foreground">{verb.es}</p>
              <div className="mt-3 flex items-start gap-2 rounded-xl bg-muted/40 p-3">
                <SpeakButton text={verb.example} showEs={showEs} />
                <p className="text-[14px] italic leading-8 text-foreground">“{verb.example}”</p>
              </div>
              <button
                type="button"
                onClick={() => toggleTranslation(verb.base)}
                aria-expanded={translated.has(verb.base)}
                className="mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground"
              >
                <Languages className="size-3.5" aria-hidden="true" />
                {translated.has(verb.base)
                  ? showEs
                    ? "Ocultar traducción"
                    : "Hide translation"
                  : showEs
                    ? "Traducir"
                    : "Translate"}
              </button>
              {translated.has(verb.base) ? (
                <p className="mt-2 text-[14px] text-muted-foreground">“{verb.exampleEs}”</p>
              ) : null}
            </li>
          ))}
        </ul>

        {verbs.length === 0 ? (
          <p className="text-sm text-muted-foreground">{showEs ? "Sin resultados." : "No results."}</p>
        ) : (
          <Pager page={page} pageCount={pageCount} onChange={setPage} showEs={showEs} scrollTargetRef={listTop} />
        )}
      </div>
    </AppShell>
  );
}
