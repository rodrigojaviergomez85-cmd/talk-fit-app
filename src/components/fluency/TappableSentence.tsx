import { useState } from "react";
import { Volume2, X } from "lucide-react";
import { AudioService } from "@/services/audio-service";
import { tokenizeWords } from "@/lib/syllables";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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
        <div className="mt-3 rounded-2xl border border-border bg-secondary/50 p-3">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
              {es ? "Pronunciación lenta" : "Slow pronunciation"}
            </p>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={es ? "Cerrar" : "Close"}
              className="rounded-full p-1 text-muted-foreground hover:bg-card"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => say(open, 0.25)}
              className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-2 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground active:scale-[0.97]"
            >
              <Volume2 className="size-4" /> 0.25x
            </button>
            <button
              type="button"
              onClick={() => say(open, 0.5)}
              className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-2 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground active:scale-[0.97]"
            >
              <Volume2 className="size-4" /> 0.5x
            </button>
            <button
              type="button"
              onClick={() => say(open, 0.75)}
              className="inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-2 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground active:scale-[0.97]"
            >
              <Volume2 className="size-4" /> 0.75x
            </button>
          </div>
        </div>
      ) : null}

    </div>
  );
}
