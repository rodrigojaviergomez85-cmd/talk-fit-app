import { useRef, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";
import { TranslatableText } from "./TranslatableText";
import type { CourseDay, VerbCard } from "@/lib/types";

/**
 * Image → PRESENT → PAST (→ NEGATIVE when present) → LISTEN.
 * The card teaches the FORM; the model delivers the story — the full model
 * sentence is no longer shown here (it lives in the model audio / text only).
 * No scoring, no correction.
 */
function Card({ card, voice }: { card: VerbCard; voice?: "female" | "male" | undefined }) {
  return (
    <div className="w-[78vw] max-w-[320px] shrink-0 snap-center overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)] sm:w-auto sm:max-w-none">
      <img src={card.src} alt={card.alt} width={768} height={576} loading="lazy" className="w-full" />
      <div className="space-y-2 p-4">
        <TranslatableText supportOnly es={card.es ?? ""}>
          <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em]">
            <span className="rounded-full bg-secondary px-3 py-1 text-muted-foreground">{card.present}</span>
            <ArrowRight className="size-4 text-primary" />
            <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">{card.past}</span>
            {card.negative ? (
              <>
                <ArrowRight className="size-4 text-primary" />
                <span className="rounded-full bg-secondary px-3 py-1 text-muted-foreground">
                  didn&apos;t {card.present.toLowerCase()}
                </span>
              </>
            ) : null}
          </div>
        </TranslatableText>
        <AudioPlayer text={card.past} label="LISTEN" {...(voice ? { voice } : {})} />
      </div>
    </div>
  );
}

/** Verb card deck for Module 3 days that teach past verb forms. */
export function PastVerbCards({ day, collapsed = false }: { day: CourseDay; collapsed?: boolean }) {
  const cards = day.verbCards;
  const [expanded, setExpanded] = useState(false);
  const [current, setCurrent] = useState(1);
  const deckRef = useRef<HTMLDivElement>(null);

  if (!cards?.length) return null;

  if (collapsed && !expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <TranslatableText supportOnly es={`${cards.length} verbos nuevos`}>
          <span>{cards.length} new verbs</span>
        </TranslatableText>
        <ChevronDown className="size-4" />
      </button>
    );
  }

  const onScroll = () => {
    const el = deckRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const pitch = first.offsetWidth + 12; // card width + gap-3
    if (pitch > 12) setCurrent(Math.min(cards.length, Math.round(el.scrollLeft / pitch) + 1));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const el = deckRef.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return;
    const pitch = first.offsetWidth + 12;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      el.scrollBy({ left: pitch, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      el.scrollBy({ left: -pitch, behavior: "smooth" });
    }
  };

  return (
    <div className="space-y-3">
      <TranslatableText es="MIRA · ESCUCHA · DI EL VERBO" align="center">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Look · Listen · Say the verb
        </p>
      </TranslatableText>
      <div
        ref={deckRef}
        tabIndex={0}
        role="region"
        aria-label="Verb cards"
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0"
      >
        {cards.map((card) => (
          <Card key={card.id} card={card} voice={day.speakerVoice} />
        ))}
      </div>
      <p
        aria-hidden="true"
        className="text-center text-[11px] font-bold tracking-[0.14em] text-muted-foreground sm:hidden"
      >
        {current} / {cards.length}
      </p>
    </div>
  );
}
