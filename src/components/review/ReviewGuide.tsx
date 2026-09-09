import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AudioPlayer } from "@/components/fluency/AudioPlayer";
import type { ReviewGuideCard } from "@/lib/review-types";

/** ENTIÉNDELO FÁCIL — the static grammar guide. Never AI-generated. */
export function ReviewGuide({
  cards,
  showEs,
  defaultOpen = false,
  errors = [],
  heading,
  headingEs,
}: {
  cards: ReviewGuideCard[];
  showEs: boolean;
  defaultOpen?: boolean;
  errors?: { wrong: string; right: string; es: string }[];
  heading?: string | undefined;
  headingEs?: string | undefined;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <section className="rounded-3xl border border-border bg-card p-4">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex min-h-[44px] w-full items-center justify-between gap-3 text-left"
        aria-expanded={open}
      >
        <span>
          <span className="block text-[11px] font-extrabold uppercase tracking-[0.22em] text-primary">
            {showEs ? "Entiéndelo fácil" : "Understand it easily"}
          </span>
          <span className="block text-sm font-semibold text-foreground">
            {showEs
              ? `${cards.length} tarjetas de ${headingEs ?? "gramática"}`
              : `${cards.length} ${heading ?? "grammar"} cards`}
          </span>
        </span>
        <ChevronDown className={`size-5 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open ? (
        <div className="mt-4 space-y-3">
          {cards.map((card, index) => (
            <article key={card.id} className="rounded-2xl bg-muted/50 p-4">
              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground">
                {index + 1} / {cards.length}
              </p>
              <h3 className="mt-1 text-base font-extrabold text-foreground">{card.title}</h3>
              <p className="text-xs font-semibold text-muted-foreground">{card.titleEs}</p>
              <p className="mt-2 text-sm leading-relaxed text-foreground">{card.explanationEs}</p>
              {card.image ? (
                <img
                  src={card.image.src}
                  alt={showEs ? card.image.altEs : card.image.alt}
                  loading="lazy"
                  className="mt-3 aspect-[4/3] w-full rounded-xl object-cover"
                />
              ) : null}
              <ul className="mt-3 space-y-2">
                {card.examples.map((ex) => (
                  <li key={ex.en} className="rounded-xl bg-card p-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-foreground">{ex.en}</p>
                      <AudioPlayer text={ex.en} size="sm" variant="ghost" label="" />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{ex.es}</p>
                  </li>
                ))}
              </ul>
              {card.check ? (
                <p className="mt-3 rounded-xl border border-dashed border-border p-3 text-xs text-foreground">
                  <span className="font-extrabold uppercase tracking-[0.18em] text-primary">
                    {showEs ? "Dilo en voz alta" : "Say it out loud"}
                  </span>
                  <br />
                  {showEs ? card.check.promptEs : card.check.prompt}
                  <span className="mt-1 block text-muted-foreground">e.g. {card.check.answer}</span>
                </p>
              ) : null}
            </article>
          ))}

          {errors.length ? (
          <article className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4">
            <h3 className="text-sm font-extrabold uppercase tracking-[0.18em] text-destructive">
              {showEs ? "Errores típicos" : "Typical mistakes"}
            </h3>
            <ul className="mt-2 space-y-2">
              {errors.map((e) => (
                <li key={e.wrong} className="text-sm">
                  <span className="font-bold text-destructive line-through">{e.wrong}</span>
                  <span className="mx-2 text-muted-foreground">→</span>
                  <span className="font-bold text-foreground">{e.right}</span>
                  <span className="block text-xs text-muted-foreground">{e.es}</span>
                </li>
              ))}
            </ul>
          </article>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
