import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PastVerbCard } from "@/components/fluency/PastVerbCard";
import { useVerbBank } from "@/hooks/use-verb-bank";
import { PAST_VERBS, VerbBank, setVerbBankScope } from "@/services/verb-bank";
import { supabase } from "@/integrations/supabase/client";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/verb-bank")({
  head: () => ({
    meta: [
      { title: "Past Verb Bank — Fluency Reps" },
      {
        name: "description",
        content: "Collect and practice 30 past-tense English verbs with images, audio and your own voice.",
      },
      { property: "og:title", content: "Past Verb Bank — Fluency Reps" },
      { property: "og:description", content: "Discover past-tense verbs as you speak through Module 3." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: VerbBankPage,
});

type Filter = "all" | "discovered" | "irregular" | "regular";

function VerbBankPage() {
  const es = useAppLang().lang === "es";
  const [filter, setFilter] = useState<Filter>("all");
  const state = useVerbBank();

  useEffect(() => {
    void supabase.auth
      .getUser()
      .then(({ data }) => setVerbBankScope(data.user?.id ?? null))
      .catch(() => setVerbBankScope(null));
  }, []);

  const discovered = VerbBank.discoveredCount(state);

  const filters: { id: Filter; label: string }[] = [
    { id: "all", label: es ? "TODOS" : "ALL" },
    { id: "discovered", label: es ? "DESCUBIERTOS" : "DISCOVERED" },
    { id: "irregular", label: es ? "IRREGULARES" : "IRREGULAR" },
    { id: "regular", label: es ? "REGULARES" : "REGULAR" },
  ];

  const verbs = useMemo(
    () =>
      PAST_VERBS.filter((verb) => {
        if (filter === "discovered") return Boolean(state[verb.id]?.discovered);
        if (filter === "irregular") return verb.kind === "irregular";
        if (filter === "regular") return verb.kind === "regular";
        return true;
      }),
    [filter, state],
  );

  return (
    <div className="min-h-screen bg-background pb-16">
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex w-full max-w-lg items-center gap-3 px-4 py-4">
          <Link
            to="/module/$moduleId"
            params={{ moduleId: "past-stories" }}
            aria-label={es ? "Volver" : "Back"}
            className="inline-flex size-10 items-center justify-center rounded-2xl border border-border"
          >
            <ArrowLeft className="size-4" aria-hidden />
          </Link>
          <div>
            <h1 className="text-[18px] font-extrabold uppercase tracking-tight">
              {es ? "BANCO DE VERBOS EN PASADO" : "PAST VERB BANK"}
            </h1>
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {discovered} / {PAST_VERBS.length} {es ? "DESCUBIERTOS" : "DISCOVERED"}
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-lg space-y-4 px-4 py-5">
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

        {verbs.length === 0 ? (
          <p className="rounded-3xl border border-dashed border-border p-6 text-center text-[13px] font-semibold text-muted-foreground">
            {es
              ? "Aún no descubres verbos. Practica el Módulo 3 para desbloquearlos."
              : "No verbs discovered yet. Practice Module 3 to unlock them."}
          </p>
        ) : (
          <ul className="space-y-4">
            {verbs.map((verb) => {
              const stat = VerbBank.stat(state, verb.id);
              return (
                <li key={verb.id}>
                  <PastVerbCard verb={verb} stat={stat} locked={!stat.discovered} />
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </div>
  );
}
