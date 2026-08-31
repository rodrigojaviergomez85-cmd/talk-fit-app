import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AudioPlayer } from "./AudioPlayer";
import { useAppLang } from "@/lib/i18n";
import { VerbBank, type PastVerb } from "@/services/verb-bank";

/** Horizontal preview of the past verbs the learner will meet today. */
export function TodaysPastVerbs({ verbs }: { verbs: PastVerb[] }) {
  const es = useAppLang().lang === "es";
  if (verbs.length === 0) return null;

  return (
    <section className="space-y-3 rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          <Sparkles className="size-4 text-primary" aria-hidden />
          {es ? "VERBOS EN PASADO DE HOY" : "TODAY'S PAST VERBS"}
        </p>
        <Link
          to="/verb-bank"
          className="inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.12em] text-primary"
        >
          {es ? "BANCO" : "BANK"}
          <ArrowRight className="size-3.5" aria-hidden />
        </Link>
      </div>

      <ul className="-mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-1">
        {verbs.map((verb) => (
          <li key={verb.id} className="w-40 shrink-0 snap-start space-y-2 rounded-2xl border border-border p-2">
            <img
              src={verb.src}
              alt={verb.alt}
              width={320}
              height={240}
              loading="lazy"
              className="h-24 w-full rounded-xl object-cover"
            />
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{verb.present}</p>
            <p className="text-[18px] font-extrabold uppercase tracking-tight text-primary">{verb.past}</p>
            <AudioPlayer
              text={verb.past}
              label={verb.past}
              variant="navy"
              size="sm"
              onStart={() => VerbBank.countListen(verb.id)}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
