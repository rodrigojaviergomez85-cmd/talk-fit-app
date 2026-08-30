import { ArrowRight } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";
import { TranslatableText } from "./TranslatableText";
import type { CourseDay, VerbCard } from "@/lib/types";

/** Image → PRESENT → PAST → model sentence. No scoring, no correction. */
function Card({ card, voice }: { card: VerbCard; voice?: "female" | "male" | undefined }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
      <img src={card.src} alt={card.alt} width={768} height={576} loading="lazy" className="w-full" />
      <div className="space-y-2 p-4">
        <div className="flex flex-wrap items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em]">
          <span className="rounded-full bg-secondary px-3 py-1 text-muted-foreground">{card.present}</span>
          <ArrowRight className="size-4 text-primary" />
          <span className="rounded-full bg-primary px-3 py-1 text-primary-foreground">{card.past}</span>
        </div>
        <p className="text-[17px] font-extrabold leading-snug tracking-tight">{card.sentence}</p>
        {card.es ? <p className="text-[13px] font-semibold text-muted-foreground">{card.es}</p> : null}
        {card.negative ? (
          <div className="rounded-2xl bg-secondary p-3">
            <p className="text-[15px] font-extrabold leading-snug">{card.negative.sentence}</p>
            {card.negative.es ? (
              <p className="text-[12px] font-semibold text-muted-foreground">{card.negative.es}</p>
            ) : null}
          </div>
        ) : null}
        <AudioPlayer text={card.sentence} label="LISTEN" {...(voice ? { voice } : {})} />
      </div>
    </div>
  );
}

/** Verb card strip for Module 3 days that teach past verb forms. */
export function PastVerbCards({ day }: { day: CourseDay }) {
  const cards = day.verbCards;
  if (!cards?.length) return null;
  return (
    <div className="space-y-3">
      <TranslatableText es="MIRA · ESCUCHA · DI LA ORACIÓN" align="center">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Look · Listen · Say the sentence
        </p>
      </TranslatableText>
      <div className="grid gap-3 sm:grid-cols-2">
        {cards.map((card) => (
          <Card key={card.id} card={card} voice={day.speakerVoice} />
        ))}
      </div>
    </div>
  );
}
