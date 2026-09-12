import { Volume2, X } from "lucide-react";
import { AudioService } from "@/services/audio-service";
import { useAppLang } from "@/lib/i18n";

const SPEEDS = [0.25, 0.5, 0.75] as const;

type Props = {
  word: string;
  voice?: "female" | "male" | undefined;
  onClose: () => void;
  /** Compact layout for tight spaces (e.g. correction card). */
  compact?: boolean;
};

/**
 * Slow-pronunciation panel for a single word: 0.25x / 0.5x / 0.75x.
 * Pronunciation aid only — it never changes practice state.
 */
export function SlowWordPanel({ word, voice, onClose, compact = false }: Props) {
  const es = useAppLang().lang === "es";

  const say = (rate: number) => {
    AudioService.stop();
    AudioService.speak(word, { rate, voice });
  };

  return (
    <div className={compact ? "mt-2 rounded-xl border border-border bg-secondary/50 p-2" : "mt-3 rounded-2xl border border-border bg-secondary/50 p-3"}>
      <div className="flex items-center justify-between gap-2">
        <p className={compact ? "text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground" : "text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground"}>
          {es ? "Pronunciación lenta" : "Slow pronunciation"}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label={es ? "Cerrar" : "Close"}
          className="rounded-full p-1 text-muted-foreground hover:bg-card"
        >
          <X className={compact ? "size-3.5" : "size-4"} />
        </button>
      </div>

      <div className={compact ? "mt-1.5 flex flex-wrap gap-1.5" : "mt-2 flex flex-wrap gap-2"}>
        {SPEEDS.map((rate) => (
          <button
            key={rate}
            type="button"
            onClick={() => say(rate)}
            className={
              compact
                ? "inline-flex min-h-[36px] flex-1 items-center justify-center gap-1 rounded-lg border border-border bg-card px-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-muted-foreground active:scale-[0.97]"
                : "inline-flex min-h-[40px] flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-2 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground active:scale-[0.97]"
            }
          >
            <Volume2 className={compact ? "size-3.5" : "size-4"} /> {rate}x
          </button>
        ))}
      </div>
    </div>
  );
}
