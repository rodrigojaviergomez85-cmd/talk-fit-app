import { registerAudioStopper, stopOtherAudio } from "@/lib/audio-bus";
import { useEffect, useRef, useState } from "react";
import { Check, Play, Square, Trash2 } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";
import { TranslatableText } from "./TranslatableText";
import { useT, type TKey } from "@/lib/i18n";
import type { Recording } from "@/lib/types";
import { cn } from "@/lib/utils";

export const TAKE_COUNT = 5;
export const REQUIRED_TAKES = 3;
/** Daily objective for every take. */
export const GOAL_SECONDS = 30;
export const GOAL_SENTENCES = 5;

type TakeBoardProps = {
  takes: (Recording | null)[];
  finalIndex: number | null;
  goalSeconds: [number, number];
  /** Minimum complete spoken ideas for this day (default 5). */
  goalSentences?: number;
  onRecorded: (index: number, recording: Recording) => void;
  onDelete: (index: number) => void;
  onSelectFinal: (index: number) => void;
};


/** Static bar pattern so each completed take shows a small waveform. */
function MiniWave({ seed, playing }: { seed: number; playing: boolean }) {
  return (
    <div className="flex h-7 flex-1 items-center gap-[2px]" aria-hidden>
      {Array.from({ length: 30 }).map((_, index) => (
        <span
          key={index}
          className={cn(
            "w-[3px] rounded-full",
            playing ? "bg-primary" : "bg-navy/25",
          )}
          style={{ height: `${8 + Math.round(Math.abs(Math.sin((index + seed) * 1.4)) * 18)}px` }}
        />
      ))}
    </div>
  );
}

export function TakeBoard({
  takes,
  finalIndex,
  goalSeconds,
  goalSentences = GOAL_SENTENCES,
  onRecorded,
  onDelete,
  onSelectFinal,
}: TakeBoardProps) {
  const t = useT();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.addEventListener("ended", () => setPlayingIndex(null));
    audio.addEventListener("error", () => setPlayingIndex(null));
    audioRef.current = audio;
    const unregister = registerAudioStopper("takeboard", () => {
      audio.pause();
      audio.currentTime = 0;
      setPlayingIndex(null);
    });
    return () => {
      unregister();
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const stop = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlayingIndex(null);
  };

  const play = (index: number, url: string) => {
    const audio = audioRef.current;
    if (!audio) return;
    stopOtherAudio("takeboard");
    audio.pause();
    audio.src = url;
    audio.currentTime = 0;
    void audio.play().catch(() => setPlayingIndex(null));
    setPlayingIndex(index);
  };

  const firstEmpty = takes.findIndex((take) => !take);
  const latest = [...takes].reverse().find((take): take is Recording => Boolean(take)) ?? null;

  return (
    <div className="space-y-4">
      <GoalPanel latest={latest} minSeconds={goalSeconds[0]} goalSentences={goalSentences} t={t} />

      <div className="grid gap-3 sm:grid-cols-2">
      {takes.map((take, index) => {
        const optional = index >= REQUIRED_TAKES;
        const isActive = index === firstEmpty;
        const isFinal = finalIndex === index;
        const playing = playingIndex === index;

        return (
          <div
            key={index}
            className={cn(
              "rounded-3xl border p-4 transition-colors",
              take
                ? isFinal
                  ? "border-primary bg-accent"
                  : "border-success/30 bg-success/5"
                : isActive
                  ? "border-primary/40 bg-card"
                  : "border-border bg-card/50 opacity-55",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-[0.16em]">
                {t("take.take")} {index + 1}
                {take ? <Check className="size-4 text-success" /> : null}
              </p>
              {optional && !take ? (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("take.optional")}
                </span>
              ) : null}
              {isFinal ? (
                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground">
                  {t("take.finalRep")}
                </span>
              ) : null}
            </div>

            {take ? (
              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-3">
                  <MiniWave seed={index * 3} playing={playing} />
                  <span className="text-[15px] font-extrabold tabular-nums">{take.durationSeconds} {t("take.seconds")}</span>
                </div>

                <SentenceLine take={take} goal={goalSentences} t={t} />


                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => (playing ? stop() : take.url ? play(index, take.url) : undefined)}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em]"
                  >
                    {playing ? <Square className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
                    {playing ? t("take.stop") : t("take.play")}
                  </button>
                  <button
                    type="button"
                    aria-label={`Delete take ${index + 1}`}
                    onClick={() => {
                      if (playing) stop();
                      onDelete(index);
                    }}
                    className="inline-flex items-center justify-center rounded-xl border border-border bg-card p-2.5 text-muted-foreground"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>

                {isFinal ? null : (
                  <button
                    type="button"
                    onClick={() => onSelectFinal(index)}
                    className="w-full rounded-xl border border-primary/40 bg-card px-3 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary"
                  >
                    {t("take.useAsFinal")}
                  </button>
                )}
              </div>
            ) : isActive ? (
              <div className="mt-3 space-y-2">
                <TranslatableText supportOnly es="Listo para grabar" align="center" className="text-center">
                  <p className="text-center text-[13px] text-muted-foreground">{t("take.ready")}</p>
                </TranslatableText>
                <VoiceRecorder
                  label={t("practice.record")}
                  size="md"
                  targetSeconds={goalSeconds}
                  maxSeconds={90}
                  onComplete={(rec) => onRecorded(index, rec)}
                />
              </div>
            ) : (
              <p className="mt-3 text-[13px] text-muted-foreground">{t("take.ready")}</p>
            )}
          </div>
        );
      })}
      </div>
    </div>
  );
}

/** Colored TIME / SENTENCES indicators for the most recent take. */
function GoalPanel({
  latest,
  minSeconds,
  goalSentences,
  t,
}: {
  latest: Recording | null;
  minSeconds: number;
  goalSentences: number;
  t: (key: TKey) => string;
}) {
  const seconds = latest?.durationSeconds ?? 0;
  const timeOk = seconds >= minSeconds;
  const count = latest?.countStatus === "done" ? (latest.sentenceCount ?? null) : null;
  const sentencesOk = count !== null && count >= goalSentences;

  return (
    <div className="rounded-3xl border border-border bg-card p-4">
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {t("take.goal")} · {minSeconds}+ {t("take.seconds")} · {goalSentences}+ {t("take.sentences").toLowerCase()}
      </p>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-secondary p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{t("take.time")}</p>
          <p className={cn("mt-1 text-[16px] font-extrabold tabular-nums", latest ? (timeOk ? "text-success" : "text-destructive") : "text-muted-foreground")}>
            {latest ? `${timeOk ? "🟢" : "🔴"} ${seconds} / ${minSeconds} ${t("take.seconds")}` : `— / ${minSeconds} ${t("take.seconds")}`}
          </p>
        </div>
        <div className="rounded-2xl bg-secondary p-3 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{t("take.sentences")}</p>
          <p className={cn("mt-1 text-[16px] font-extrabold tabular-nums", count === null ? "text-muted-foreground" : sentencesOk ? "text-success" : "text-destructive")}>
            {count === null ? `— / ${goalSentences}` : `${sentencesOk ? "🟢" : "🔴"} ${count} / ${goalSentences}`}
          </p>
        </div>
      </div>
    </div>

  );
}

/** Sentence estimate for one completed take — no transcript, no correction. */
function SentenceLine({ take, goal, t }: { take: Recording; goal: number; t: (key: TKey) => string }) {
  if (take.countStatus === "pending") {
    return <p className="text-[13px] font-semibold text-muted-foreground">{t("take.counting")}</p>;
  }

  if (take.countStatus !== "done" || typeof take.sentenceCount !== "number") {
    return <p className="text-[12px] text-muted-foreground">{t("take.countUnavailable")}</p>;
  }

  const count = take.sentenceCount;
  const ok = count >= goal;

  return (
    <div>
      <p className={cn("text-[15px] font-extrabold", ok ? "text-success" : "text-destructive")}>
        {ok ? "🟢" : "🔴"} {count} {t("take.sentences").toLowerCase()}
      </p>
      <p className="text-[12px] font-semibold text-muted-foreground">
        {ok ? t("take.goalReached") : `${t("take.sentences")}: ${goal}+`}
      </p>

    </div>
  );
}

