import { useState } from "react";
import { AudioService } from "@/services/audio-service";
import { tokenizeWords } from "@/lib/syllables";
import { classifyEdEnding, edPronunciationHint, type EdSound } from "@/lib/ed-endings";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SlowWordPanel } from "./SlowWordPanel";

type Props = {
  text: string;
  voice?: "female" | "male" | undefined;
  className?: string;
  /** Pilot (day 2 of Simple Past only): color-code regular -ed verbs by final sound. */
  highlightEd?: boolean;
};

const ED_CLASSES: Record<EdSound, string> = {
  t: "text-ed-t underline decoration-ed-t/60 decoration-2 underline-offset-4",
  d: "text-ed-d underline decoration-ed-d/60 decoration-2 underline-offset-4",
  id: "text-ed-id underline decoration-ed-id/60 decoration-2 underline-offset-4",
};

/**
 * Sentence where every word can be tapped to hear it at slower speeds.
 * Pronunciation aid only — it never changes practice state.
 */
export function TappableSentence({ text, voice, className, highlightEd = false }: Props) {
  const es = useAppLang().lang === "es";
  const [open, setOpen] = useState<string | null>(null);
  const tokens = tokenizeWords(text);

  const say = (value: string, rate: number) => {
    AudioService.stop();
    AudioService.speak(value, { rate, voice });
  };

  const openWord = highlightEd ? classifyEdEnding(open ?? "") : null;

  return (
    <div className={className}>
      <p className="text-[22px] font-extrabold leading-tight tracking-tight">
        {tokens.map((token, index) => {
          if (!token.isWord) {
            return (
              <span key={`sep-${index}`} style={{ whiteSpace: "pre-wrap" }}>
                {token.value}
              </span>
            );
          }
          const edSound = highlightEd ? classifyEdEnding(token.value) : null;
          return (
            <button
              key={`${token.value}-${index}`}
              type="button"
              onClick={() => {
                setOpen(token.value);
                say(token.value, 0.75);
              }}
              className={cn(
                "rounded-md px-0.5 transition-colors hover:bg-primary/10 active:bg-primary/20",
                open === token.value && "bg-primary/15",
                open === token.value && !edSound && "text-primary",
                edSound && ED_CLASSES[edSound],
              )}
              aria-label={es ? `Pronunciar ${token.value}` : `Pronounce ${token.value}`}
            >
              {token.value}
            </button>
          );
        })}
      </p>

      {open ? (
        <SlowWordPanel
          word={open}
          voice={voice}
          onClose={() => setOpen(null)}
          edHint={openWord ? { sound: openWord, hint: edPronunciationHint(open, openWord) } : undefined}
        />
      ) : null}
    </div>
  );
}
