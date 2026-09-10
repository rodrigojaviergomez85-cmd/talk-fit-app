import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { AppShell } from "@/components/fluency/AppShell";
import { SpeakButton } from "@/components/fluency/NaturalMethodPager";
import { useAppLang } from "@/lib/i18n";
import { PICTIONARY_CATEGORIES } from "@/services/review/pictionary";

export const Route = createFileRoute("/review/pictionary")({
  head: () => ({
    meta: [
      { title: "Pictionary · Fluency App" },
      {
        name: "description",
        content: "Learn 100 essential English words with pictures, Spanish meaning and pronunciation.",
      },
      { property: "og:title", content: "Pictionary · Fluency App" },
      {
        property: "og:description",
        content: "Learn 100 essential English words with pictures, Spanish meaning and pronunciation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PictionaryPage,
});

function PictionaryPage() {
  const { lang } = useAppLang();
  const showEs = lang === "es";
  const [openId, setOpenId] = useState<string | null>(PICTIONARY_CATEGORIES[0]?.id ?? null);

  return (
    <AppShell>
      <div className="space-y-4 p-4">
        <Link
          to="/review/basic"
          className="inline-flex items-center gap-1 text-xs font-extrabold uppercase text-primary"
        >
          <ChevronLeft className="size-4" />
          {showEs ? "Básico" : "Basic"}
        </Link>

        <header>
          <p className="text-[11px] font-extrabold uppercase text-primary">Review</p>
          <h1 className="text-2xl font-extrabold text-foreground">Pictionary</h1>
          <p className="text-sm text-muted-foreground">
            {showEs
              ? "100 palabras esenciales con imagen, traducción y pronunciación."
              : "100 essential words with a picture, translation and pronunciation."}
          </p>
        </header>

        <div className="space-y-3">
          {PICTIONARY_CATEGORIES.map((cat) => {
            const open = openId === cat.id;
            return (
              <section key={cat.id} className="overflow-hidden rounded-2xl border border-border bg-card">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenId(open ? null : cat.id)}
                  className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
                >
                  <span className="text-base font-extrabold text-foreground">{showEs ? cat.es : cat.en}</span>
                  <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                    {cat.words.length}
                    <ChevronDown className={`size-4 transition-transform ${open ? "rotate-180" : ""}`} />
                  </span>
                </button>

                {open ? (
                  <ul className="grid grid-cols-2 gap-3 border-t border-border p-3">
                    {cat.words.map((word) => (
                      <li key={word.id} className="rounded-xl border border-border bg-background p-2">
                        <img
                          src={word.image}
                          alt={word.en}
                          loading="lazy"
                          width={512}
                          height={512}
                          className="mb-2 aspect-square w-full rounded-lg object-contain"
                        />
                        <div className="flex items-center justify-between gap-1">
                          <div className="min-w-0">
                            <p className="break-words text-sm font-extrabold leading-tight text-foreground">{word.en}</p>
                            <p className="break-words text-xs leading-tight text-muted-foreground">{word.es}</p>
                          </div>
                          <SpeakButton text={word.en} showEs={showEs} />
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
