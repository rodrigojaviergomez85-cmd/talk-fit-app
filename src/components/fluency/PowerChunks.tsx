import { useEffect, useRef, useState } from "react";
import { Check, Volume2, Square } from "lucide-react";
import { AudioService } from "@/services/audio-service";
import { useT } from "@/lib/i18n";
import type { PowerChunks as PowerChunksData } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = {
  chunks: PowerChunksData | undefined;
  /** full: card with audio (Rep 1–3). mini: compact support chips (Rep 4–5). */
  size?: "full" | "mini";
  voice?: "female" | "male" | undefined;
  /** false: text-only rows, no per-chunk audio buttons (Rep 1). */
  audio?: boolean;
  /** mini only: show just the 2 core chunks (stretch lives elsewhere). */
  coreOnly?: boolean;
  className?: string;
};

/**
 * POWER CHUNKS — 2 core connectors + 1 stretch connector for the day.
 * Support only: no recording, no lesson. Automate through repeated use.
 */
export function PowerChunks({ chunks, size = "full", voice, audio = true, coreOnly = false, className }: Props) {
  const t = useT();
  const [playing, setPlaying] = useState<string | null>(null);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);

  if (!chunks) return null;

  const speak = (text: string) => {
    if (playing === text) {
      stopRef.current?.();
      setPlaying(null);
      return;
    }
    stopRef.current?.();
    setPlaying(text);
    stopRef.current = AudioService.speak(text, {
      rate: 0.95,
      voice,
      onEnd: () => setPlaying(null),
    });
  };

  if (size === "mini") {
    return (
      <div className={cn("flex flex-wrap items-center justify-center gap-1.5", className)}>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{t("power.title")}</span>
        {chunks.core.map((c) => (
          <span key={c} className="rounded-full bg-primary/10 px-2.5 py-1 text-[12px] font-semibold text-primary">
            {c}
          </span>
        ))}
        <span className="rounded-full border border-dashed border-primary/40 px-2.5 py-1 text-[12px] font-semibold text-muted-foreground">
          {chunks.stretch}
        </span>
      </div>
    );
  }

  const Row = ({ text, stretch }: { text: string; stretch?: boolean }) => {
    const body = (
      <>
        {stretch ? (
          <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
            {t("power.challenge")}
          </span>
        ) : (
          <Check className="size-4 shrink-0 text-primary" />
        )}
        <span className={cn("flex-1 text-[15px] font-bold", stretch ? "text-foreground" : "text-primary")}>{text}</span>
        {audio ? (
          playing === text ? <Square className="size-4 shrink-0 fill-current text-primary" /> : <Volume2 className="size-4 shrink-0 text-muted-foreground" />
        ) : null}
      </>
    );
    const rowClass = cn(
      "flex min-h-[44px] w-full items-center gap-3 rounded-2xl px-3 py-2 text-left transition-colors",
      stretch ? "border border-dashed border-primary/40 bg-card" : "bg-primary/10",
    );
    return audio ? (
      <button type="button" onClick={() => speak(text)} className={rowClass}>
        {body}
      </button>
    ) : (
      <div className={rowClass}>{body}</div>
    );
  };

  return (
    <div className={cn("space-y-1.5 rounded-3xl border border-primary/25 bg-card p-3", className)}>
      <p className="px-1 text-[10px] font-bold uppercase tracking-[0.18em] text-primary">{t("power.title")}</p>
      <Row text={chunks.core[0]} />
      <Row text={chunks.core[1]} />
      <Row text={chunks.stretch} stretch />
    </div>
  );
}
