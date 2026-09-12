import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { AudioService } from "@/services/audio-service";
import { classifyEdEnding, edPronunciationHint } from "@/lib/ed-endings";
import { tokenizeWords } from "@/lib/syllables";
import { useT } from "@/lib/i18n";

/** Unique regular -ed verbs found in a text, in reading order. */
export function extractEdWords(text: string): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const token of tokenizeWords(text)) {
    if (!token.isWord) continue;
    const clean = token.value.replace(/[^A-Za-z]/g, "");
    const sound = classifyEdEnding(clean);
    if (!sound) continue;
    const key = clean.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(clean);
  }
  return out;
}

type Props = {
  /** Text to scan for -ed verbs. When empty, only the color reminder shows. */
  text?: string;
  voice?: "female" | "male" | undefined;
  /** Step 5 wording ("before you record") instead of the generic reminder. */
  variant?: "step4" | "step5";
};

/**
 * Compact -ed reminder used in Steps 4 and 5 of the Simple Past day-2 pilot.
 * Pronunciation aid only: it never touches practice state, quotas or AI.
 */
export function EdReminder({ text, voice, variant = "step4" }: Props) {
  const t = useT();
  const words = text ? extractEdWords(text) : [];
  const [playing, setPlaying] = useState(false);
  const cancelled = useRef(false);

  useEffect(
    () => () => {
      cancelled.current = true;
      AudioService.stop();
    },
    [],
  );

  const playAll = () => {
    if (playing || !words.length) return;
    cancelled.current = false;
    setPlaying(true);
    let index = 0;
    const next = () => {
      if (cancelled.current || index >= words.length) {
        setPlaying(false);
        return;
      }
      const word = words[index]!;
      index += 1;
      AudioService.speak(word, {
        rate: 0.5,
        voice,
        onEnd: () => window.setTimeout(next, 250),
        onError: () => setPlaying(false),
      });
    };
    next();
  };

  return (
    <div className="rounded-2xl border border-border bg-secondary/40 px-3 py-2">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {variant === "step5" ? t("ed.remindStep5") : t("ed.remindTitle")}
      </p>
      <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1 text-[11px] font-bold leading-snug">
        <span className="text-ed-t">/t/ · watchT</span>
        <span className="text-ed-d">/d/ · callD</span>
        <span className="text-ed-id">/-ed/ · wan-TED</span>
      </div>

      {words.length ? (
        <>
          <button
            type="button"
            onClick={playAll}
            disabled={playing}
            className="mt-2 inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-xl border border-border bg-card px-3 text-[11px] font-bold uppercase tracking-[0.12em] text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
          >
            <Volume2 className="size-4" /> {t("ed.listenVerbs")}
          </button>
          <div className="mt-1.5 flex flex-wrap gap-x-2 gap-y-0.5 text-[10px] font-semibold text-muted-foreground">
            {words.slice(0, 8).map((word) => {
              const sound = classifyEdEnding(word)!;
              return (
                <span key={word}>
                  {word} · {edPronunciationHint(word, sound)}
                </span>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
