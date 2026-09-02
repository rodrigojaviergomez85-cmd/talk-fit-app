import { registerAudioStopper, stopOtherAudio } from "@/lib/audio-bus";
import { useEffect, useRef, useState } from "react";
import { Check, Play, Square, Trash2 } from "lucide-react";
import { VoiceRecorder } from "./VoiceRecorder";
import { AudioPlayer } from "./AudioPlayer";
import { TranslatableText } from "./TranslatableText";
import { useT, type TKey } from "@/lib/i18n";
import type { Recording, RolePlayTurn } from "@/lib/types";
import { useAppLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const TAKE_COUNT = 5;
export const REQUIRED_TAKES = 3;
/** Daily objective for every take. */
export const GOAL_SECONDS = 30;
export const GOAL_SENTENCES = 5;

/**
 * PRESSURE ROUND (ADVANCED): when a role play has more turns than the classic
 * required takes, every turn is one required response and there are no retry
 * slots. Classic role plays (2–3 turns + retries) are unchanged.
 */
export function isPressureRound(turns: RolePlayTurn[] | undefined): boolean {
  return Boolean(turns && turns.length > REQUIRED_TAKES);
}
export function takeSlots(turns: RolePlayTurn[] | undefined): number {
  return isPressureRound(turns) ? turns!.length : TAKE_COUNT;
}
export function requiredTakes(turns: RolePlayTurn[] | undefined): number {
  return isPressureRound(turns) ? turns!.length : REQUIRED_TAKES;
}

type TakeBoardProps = {
  takes: (Recording | null)[];
  finalIndex: number | null;
  goalSeconds: [number, number];
  /** Minimum complete spoken ideas for this day (default 5). */
  goalSentences?: number;
  /** Controlled role play: fixed interlocutor line before take N (N < turns.length). Takes beyond are retries. */
  turns?: RolePlayTurn[] | undefined;
  onRecorded: (index: number, recording: Recording) => void;
  onDelete: (index: number) => void;
  onSelectFinal: (index: number) => void;
};

/** Optional think-time countdown before the mic opens (ADVANCED crazy question). */
function PrepCountdown({ seconds, onDone, t }: { seconds: number; onDone: () => void; t: (key: TKey) => string }) {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    if (left === null || left <= 0) return;
    const id = setTimeout(() => setLeft((c) => (c === null ? null : c - 1)), 1000);
    return () => clearTimeout(id);
  }, [left]);
  useEffect(() => {
    if (left === 0) onDone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [left]);

  if (left === null) {
    return (
      <button
        type="button"
        onClick={() => setLeft(seconds)}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-navy px-4 text-[13px] font-extrabold uppercase tracking-[0.16em] text-navy-foreground"
      >
        {t("take.think")} {seconds}s
      </button>
    );
  }
  return (
    <div className="rounded-2xl bg-navy p-4 text-center text-navy-foreground">
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{t("take.think")}</p>
      <p className="mt-1 text-5xl font-extrabold tabular-nums">{left}</p>
    </div>
  );
}


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
  turns,
  onRecorded,
  onDelete,
  onSelectFinal,
}: TakeBoardProps) {
  const t = useT();
  const { lang } = useAppLang();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [prepDone, setPrepDone] = useState<number[]>([]);
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
  const rolePlay = Boolean(turns?.length);
  const pressure = isPressureRound(turns);
  const required = requiredTakes(turns);
  const combinedSeconds = rolePlay
    ? takes.slice(0, required).reduce((sum, take) => sum + (take?.durationSeconds ?? 0), 0)
    : 0;
  const roundsTotal = pressure ? turns!.filter((x) => x.round).length : 0;
  const roundsDone = pressure
    ? turns!.reduce((count, x, i) => {
        if (!x.round) return count;
        const end = turns!.findIndex((y, j) => j > i && y.round);
        const last = end === -1 ? turns!.length - 1 : end - 1;
        return takes[last] ? count + 1 : count;
      }, 0)
    : 0;
  const es = lang === "es";

  return (
    <div className="space-y-4">
      {rolePlay ? (
        <CombinedGoalPanel seconds={combinedSeconds} minSeconds={goalSeconds[0]} maxSeconds={goalSeconds[1]} started={Boolean(latest)} t={t} />
      ) : (
        <GoalPanel latest={latest} minSeconds={goalSeconds[0]} goalSentences={goalSentences} t={t} />
      )}
      {rolePlay && !pressure ? (
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {t("take.turn")} 1–{turns!.length} · {t("take.retryHint").toUpperCase()}: {t("take.take")} {turns!.length + 1}–{TAKE_COUNT}
        </p>
      ) : null}
      {pressure ? (
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
          {roundsTotal > 0 ? `${roundsDone} / ${roundsTotal} ${t("take.roundsDone")} · ` : ""}
          {takes.filter(Boolean).length} / {turns!.length} {es ? "RESPUESTAS" : "RESPONSES"}
        </p>
      ) : null}

      <div className={cn("grid gap-3", pressure ? "" : "sm:grid-cols-2")}>
      {takes.map((take, index) => {
        const optional = index >= required;
        const isActive = index === firstEmpty;
        const isFinal = finalIndex === index;
        const playing = playingIndex === index;
        const turn = turns?.[index];
        // Pressure Round: future rounds stay fully hidden until the learner gets there.
        if (pressure && !take && !isActive) return null;
        const turnTarget = turn?.targetSeconds ?? goalSeconds;
        const turnMax = Math.max(90, turnTarget[1] + 15);
        const showTurn = Boolean(turn) && (isActive || Boolean(take));

        const needsPrep = Boolean(turn?.prepSeconds) && isActive && !prepDone.includes(index);

        return (
          <div key={index} className="space-y-3">
          {pressure && turn?.round && (isActive || take) ? (
            <div className="rounded-2xl bg-navy px-4 py-3 text-navy-foreground">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-primary">
                {t("take.round")} {turn.round.n}
              </p>
              <p className="text-[16px] font-extrabold tracking-tight">{es ? turn.round.titleEs : turn.round.title}</p>
              {turn.round.situation ? (
                <p className="mt-1 text-[12px] font-semibold text-navy-foreground/80">
                  <span className="font-extrabold uppercase tracking-[0.14em] text-primary">{t("take.situation")}: </span>
                  {es && turn.round.situationEs ? turn.round.situationEs : turn.round.situation}
                </p>
              ) : null}
            </div>
          ) : null}
          <div
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
                {turn ? `${t("take.turn")} ${index + 1}` : `${t("take.take")} ${index + 1}`}
                {take ? <Check className="size-4 text-success" /> : null}
              </p>
              {optional && !take ? (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {rolePlay ? t("take.retry") : t("take.optional")}
                </span>
              ) : null}
              {turn?.targetSeconds && !take ? (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                  {t("take.target")} {turn.targetSeconds[0]}–{turn.targetSeconds[1]}s
                </span>
              ) : null}
              {isFinal ? (
                <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.14em] text-primary-foreground">
                  {t("take.finalRep")}
                </span>
              ) : null}
            </div>

            {showTurn && turn?.framework && isActive ? (
              <div className="mt-3 rounded-2xl border border-primary/25 bg-accent p-3">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-accent-foreground">
                  {es ? turn.framework.titleEs : turn.framework.title}
                </p>
                <p className="mt-1 text-[13px] font-extrabold tracking-wide">{turn.framework.steps.join(" → ")}</p>
              </div>
            ) : null}

            {showTurn && turn ? (
              <div className="mt-3 space-y-2 rounded-2xl bg-navy p-3 text-navy-foreground">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary">
                  {lang === "es" ? turn.labelEs : turn.label}
                </p>
                <AudioPlayer
                  text={turn.text}
                  label={recruiter ? (es ? "ESCUCHA AL RECLUTADOR" : "LISTEN TO THE RECRUITER") : t("take.listenCustomer")}
                  rate={1}
                  variant="navy"
                  size="sm"
                  voice={turn.voice}
                />
                <TranslatableText es={turn.es} esClassName="text-navy-foreground/70" supportOnly>
                  <p className="text-[13px] font-semibold italic leading-relaxed text-navy-foreground/90">"{turn.text}"</p>
                </TranslatableText>
                {turn.cues?.length && !take ? (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {turn.cues.map((cue) => (
                      <span key={cue} className="rounded-full border border-navy-foreground/25 px-2.5 py-1 text-[10px] font-extrabold tracking-[0.12em]">
                        {cue}
                      </span>
                    ))}
                  </div>
                ) : null}
                {turn.toolbox?.length && !take ? (
                  <div className="pt-1">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-navy-foreground/60">{t("take.toolbox")}</p>
                    <ul className="mt-1 space-y-0.5">
                      {turn.toolbox.map((phrase) => (
                        <li key={phrase} className="text-[12px] font-semibold text-navy-foreground/85">· {phrase}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}

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
                {needsPrep ? (
                  <PrepCountdown
                    seconds={turn!.prepSeconds!}
                    onDone={() => setPrepDone((list) => [...list, index])}
                    t={t}
                  />
                ) : (
                  <>
                    <TranslatableText supportOnly es={turn ? "Responde al cliente" : "Listo para grabar"} align="center" className="text-center">
                      <p className="text-center text-[13px] text-muted-foreground">
                        {turn?.prepSeconds ? t("take.speakNow") : turn ? t("take.respond") : t("take.ready")}
                      </p>
                    </TranslatableText>
                    <VoiceRecorder
                      label={t("practice.record")}
                      size="md"
                      targetSeconds={turnTarget}
                      maxSeconds={turnMax}
                      onComplete={(rec) => onRecorded(index, rec)}
                    />
                  </>
                )}
              </div>
            ) : (
              <p className="mt-3 text-[13px] text-muted-foreground">{t("take.ready")}</p>
            )}
          </div>
          </div>
        );
      })}
      </div>
    </div>
  );
}

/** Role play: combined speaking time across the required turns. */
function CombinedGoalPanel({
  seconds,
  minSeconds,
  maxSeconds,
  started,
  t,
}: {
  seconds: number;
  minSeconds: number;
  maxSeconds: number;
  started: boolean;
  t: (key: TKey) => string;
}) {
  const ok = seconds >= minSeconds;
  return (
    <div className="rounded-3xl border border-border bg-card p-4">
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {t("take.goal")} · {minSeconds}–{maxSeconds} {t("take.seconds")} · {t("take.totalSpeaking")}
      </p>
      <div className="mt-3 rounded-2xl bg-secondary p-3 text-center">
        <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{t("take.totalSpeaking")}</p>
        <p className={cn("mt-1 text-[16px] font-extrabold tabular-nums", started ? (ok ? "text-success" : "text-destructive") : "text-muted-foreground")}>
          {started ? `${ok ? "🟢" : "🔴"} ${seconds} / ${minSeconds} ${t("take.seconds")}` : `— / ${minSeconds} ${t("take.seconds")}`}
        </p>
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

