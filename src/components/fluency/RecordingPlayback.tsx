import { useEffect, useId, useRef, useState } from "react";
import { registerAudioStopper, stopOtherAudio } from "@/lib/audio-bus";
import { Play, Square } from "lucide-react";
import { cn } from "@/lib/utils";

type RecordingPlaybackProps = {
  url: string | null;
  label: string;
  className?: string;
};

/** Plays back a learner recording (object URL from RecordingService). */
export function RecordingPlayback({ url, label, className }: RecordingPlaybackProps) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const busId = `playback:${useId()}`;

  useEffect(() => {
    const audio = audioRef.current;
    const unregister = registerAudioStopper(busId, () => {
      const el = audioRef.current;
      if (el) {
        el.pause();
        el.currentTime = 0;
      }
      setPlaying(false);
    });
    return () => {
      unregister();
      audio?.pause();
    };
  }, [busId]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      audio.currentTime = 0;
      setPlaying(false);
    } else {
      stopOtherAudio(busId);
      void audio.play();
      setPlaying(true);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <button
        type="button"
        onClick={toggle}
        disabled={!url}
        aria-label={playing ? "Stop my recording" : "Play my recording"}
        className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-border bg-card px-5 py-3.5 text-[15px] font-semibold tracking-wide text-foreground transition-colors hover:bg-secondary disabled:opacity-50"
      >
        {playing ? <Square className="size-4 fill-current" /> : <Play className="size-5 fill-current" />}
        {label}
      </button>
      {url ? <audio ref={audioRef} src={url} onEnded={() => setPlaying(false)} className="hidden" /> : null}
    </div>
  );
}
