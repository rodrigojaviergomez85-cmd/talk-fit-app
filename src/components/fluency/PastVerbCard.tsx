import { useState } from "react";
import { ArrowRight, Lock, Mic } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";
import { VoiceRecorder } from "./VoiceRecorder";
import { RecordingPlayback } from "./RecordingPlayback";
import { useSpanishSupport } from "./TranslatableText";
import { useAppLang } from "@/lib/i18n";
import { VerbBank, type PastVerb, type VerbStat } from "@/services/verb-bank";
import type { Recording } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  verb: PastVerb;
  stat: VerbStat;
  /** Compact = preview strip (image, verb pair, listen). */
  compact?: boolean;
  /** Week 2: show PAST vs DIDN'T + base verb. */
  showNegative?: boolean;
  locked?: boolean;
};

/** IMAGE → PRESENT → PAST → AUDIO → EXAMPLE → SPEAK. Never scored. */
export function PastVerbCard({ verb, stat, compact = false, showNegative = false, locked = false }: Props) {
  const es = useAppLang().lang === "es";
  const support = useSpanishSupport();
  const [mode, setMode] = useState<"none" | "say" | "use">("none");
  const [mine, setMine] = useState<Recording | null>(null);

  if (locked) {
    return (
      <div className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-3xl border border-dashed border-border bg-secondary/60 p-5 text-center">
        <Lock className="size-5 text-muted-foreground" aria-hidden />
        <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {es ? "VERBO NUEVO" : "NEW VERB"}
        </p>
        <p className="text-[12px] text-muted-foreground">
          {es ? "Descubre este verbo durante el Módulo 3." : "Discover this verb during Module 3."}
        </p>
      </div>
    );
  }

  const onRecorded = (rec: Recording) => {
    setMine(rec);
    VerbBank.countPractice(verb.id);
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
      <img src={verb.src} alt={verb.alt} width={768} height={576} loading="lazy" className="w-full" />

      <div className="space-y-3 p-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {verb.present}
          </span>
          <ArrowRight className="size-4 text-primary" aria-hidden />
          <span className="rounded-full bg-primary px-4 py-1.5 text-[18px] font-extrabold uppercase tracking-tight text-primary-foreground">
            {verb.past}
          </span>
        </div>

        <AudioPlayer
          text={verb.past}
          label={verb.past}
          variant="navy"
          size="sm"
          onStart={() => VerbBank.countListen(verb.id)}
        />

        {!compact ? (
          <>
            <p className="text-[16px] font-extrabold leading-snug tracking-tight">{verb.sentence}</p>
            {support ? (
              <p className="text-[13px] font-semibold text-muted-foreground">
                {verb.gloss} · {verb.sentenceEs}
              </p>
            ) : null}

            {showNegative ? (
              <div className="grid gap-2 sm:grid-cols-2">
                <div className="rounded-2xl bg-primary/10 p-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">{verb.past}</p>
                  <p className="text-[14px] font-bold leading-snug">{verb.sentence}</p>
                </div>
                <div className="rounded-2xl bg-secondary p-3">
                  <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                    DIDN'T {verb.present}
                  </p>
                  <p className="text-[14px] font-bold leading-snug">{verb.negative.sentence}</p>
                  {support ? (
                    <p className="text-[12px] font-semibold text-muted-foreground">{verb.negative.es}</p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div className="grid grid-cols-2 gap-2">
              <ActionButton
                active={mode === "say"}
                onClick={() => {
                  setMine(null);
                  setMode(mode === "say" ? "none" : "say");
                }}
                label={es ? "DILO" : "SAY IT"}
              />
              <ActionButton
                active={mode === "use"}
                onClick={() => {
                  setMine(null);
                  setMode(mode === "use" ? "none" : "use");
                }}
                label={es ? "ÚSALO" : "USE IT"}
              />
            </div>

            {mode !== "none" ? (
              <div className="space-y-3 rounded-2xl bg-secondary p-4">
                <p className="text-center text-[14px] font-bold leading-snug">
                  {mode === "say" ? `${verb.past} — ${verb.sentence}` : `${verb.useItPrompt} ______`}
                </p>
                <VoiceRecorder
                  label={es ? "GRABAR" : "RECORD"}
                  maxSeconds={20}
                  size="md"
                  onComplete={onRecorded}
                />
                {mine ? <RecordingPlayback url={mine.url} label={es ? "ESCUCHARME" : "PLAY MYSELF"} /> : null}
              </div>
            ) : null}

            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {es ? "DESCUBIERTO ✓" : "DISCOVERED ✓"} · {es ? "ESCUCHADO" : "LISTENED"} {stat.listenCount}x ·{" "}
              {es ? "PRACTICADO" : "PRACTICED"} {stat.practiceCount}x
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}

function ActionButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border px-3 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors",
        active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-foreground",
      )}
    >
      <Mic className="size-4" aria-hidden />
      {label}
    </button>
  );
}
