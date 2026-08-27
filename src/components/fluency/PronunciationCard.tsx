import { AudioPlayer } from "./AudioPlayer";
import { VoiceRecorder } from "./VoiceRecorder";
import type { PronunciationTarget } from "@/lib/types";
import { cn } from "@/lib/utils";

type PronunciationCardProps = {
  targets: PronunciationTarget[];
  className?: string;
};

/** Max 1–3 words. Never a wall of pronunciation mistakes. */
export function PronunciationCard({ targets, className }: PronunciationCardProps) {
  return (
    <div className={cn("rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]", className)}>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">Today's pronunciation</p>
      <div className="mt-4 space-y-4">
        {targets.map((target) => (
          <div key={target.word} className="rounded-2xl bg-secondary/60 p-4">
            <p className="text-xl font-bold">{target.word}</p>
            <p className="mt-1 text-sm text-muted-foreground">{target.tip}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <AudioPlayer text={target.word} label="HEAR MODEL" size="sm" variant="ghost" />
              <VoiceRecorder label="TRY WORD" stopLabel="DONE" showTimer={false} onComplete={() => undefined} className="[&>button]:size-11 [&>button]:text-[9px]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
