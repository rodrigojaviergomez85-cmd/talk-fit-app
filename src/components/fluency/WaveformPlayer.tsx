import { cn } from "@/lib/utils";

type WaveformProps = {
  active: boolean;
  bars?: number;
  className?: string;
  tone?: "primary" | "navy";
};

/** Animated speaking waveform used during shadowing and recording. */
export function WaveformPlayer({ active, bars = 28, className, tone = "primary" }: WaveformProps) {
  return (
    <div className={cn("flex h-14 items-center justify-center gap-[3px]", className)} aria-hidden>
      {Array.from({ length: bars }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "w-[4px] origin-center rounded-full transition-all duration-300",
            tone === "primary" ? "bg-primary" : "bg-navy",
            active ? "animate-[var(--animate-bar)]" : "opacity-25",
          )}
          style={{
            height: `${18 + Math.round(Math.abs(Math.sin(index * 1.7)) * 34)}px`,
            animationDelay: `${(index % 7) * 90}ms`,
          }}
        />
      ))}
    </div>
  );
}
