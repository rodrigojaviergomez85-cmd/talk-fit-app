import { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2 } from "lucide-react";
import { AudioService } from "@/services/audio-service";
import { cn } from "@/lib/utils";

type AudioPlayerProps = {
  text: string;
  label?: string;
  rate?: number;
  /** Model voice: female or male character voice. */
  voice?: "female" | "male" | undefined;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "navy" | "ghost";
  onEnd?: () => void;
  className?: string;
};

/** ModelAudio — the single entry point for model-voice playback. */
export function AudioPlayer({
  text,
  label = "LISTEN",
  rate = 1,
  voice,
  size = "md",
  variant = "primary",
  onEnd,
  className,
}: AudioPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => () => stopRef.current?.(), []);

  const toggle = () => {
    if (playing) {
      stopRef.current?.();
      AudioService.stop();
      setPlaying(false);
      return;
    }
    stopRef.current = AudioService.speak(text, {
      rate,
      voice,
      onStart: () => setPlaying(true),
      onEnd: () => {
        setPlaying(false);
        onEnd?.();
      },
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(
        "inline-flex w-full items-center justify-center gap-2 rounded-2xl font-semibold tracking-wide transition-all active:scale-[0.98]",
        size === "sm" && "px-4 py-2.5 text-sm",
        size === "md" && "px-5 py-3.5 text-[15px]",
        size === "lg" && "px-6 py-5 text-base",
        variant === "primary" && "bg-primary text-primary-foreground shadow-[var(--shadow-lift)] hover:brightness-105",
        variant === "navy" && "bg-navy text-navy-foreground hover:bg-navy-soft",
        variant === "ghost" && "border border-border bg-card text-foreground hover:bg-secondary",
        className,
      )}
    >
      {playing ? <Pause className="size-5" /> : variant === "ghost" ? <Volume2 className="size-5" /> : <Play className="size-5 fill-current" />}
      {playing ? "PLAYING…" : label}
    </button>
  );
}
