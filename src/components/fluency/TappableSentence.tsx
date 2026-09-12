import { useState } from "react";
import { AudioService } from "@/services/audio-service";
import { tokenizeWords } from "@/lib/syllables";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { SlowWordPanel } from "./SlowWordPanel";

type Props = {
  text: string;
  voice?: "female" | "male" | undefined;
  className?: string;
};

/**
 * Sentence where every word can be tapped to hear it at slower speeds.
 * Pronunciation aid only — it never changes practice state.
 */
export function TappableSentence({ text, voice, className }: Props) {
  const es = useAppLang().lang === "es";
  const [open, setOpen] = useState<string | null>(null);
  const tokens = tokenizeWords(text);

  const say = (value: string, rate: number) => {
    AudioService.stop();
    AudioService.speak(value, { rate, voice });
  };

  return (
    <div className={className}>
      <p className="text-[22px] font-extrabold leading-tight tracking-tight">
        {tokens.map((token, index) =>
          token.isWord ? (
            <button
              key={`${token.value}-${index}`}
              type="button"
              onClick={() => {
                setOpen(token.value);
                say(token.value, 0.75);
              }}
              className={cn(
                "rounded-md px-0.5 transition-colors hover:bg-primary/10 active:bg-primary/20",
                open === token.value && "bg-primary/15 text-primary",
              )}
              aria-label={es ? `Pronunciar ${token.value}` : `Pronounce ${token.value}`}
            >
              {token.value}
            </button>
          ) : (
            <span key={`sep-${index}`} style={{ whiteSpace: "pre-wrap" }}>
              {token.value}
            </span>
          ),
        )}
      </p>

      {open ? (
        <SlowWordPanel word={open} voice={voice} onClose={() => setOpen(null)} />
      ) : null}

    </div>
  );
}
