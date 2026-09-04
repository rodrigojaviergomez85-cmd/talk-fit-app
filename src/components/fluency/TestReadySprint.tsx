import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Play, RotateCcw, Sparkles, Square, Zap } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";
import { VoiceRecorder } from "./VoiceRecorder";
import { useRecordingPlayback } from "@/hooks/use-recording-playback";
import { AudioService } from "@/services/audio-service";
import { TestReadyService } from "@/services/test-ready-service";
import { useAppLang, useT } from "@/lib/i18n";
import type { ModuleId, Recording, TestReadySprint as Sprint, TestReadyType } from "@/lib/types";
import { cn } from "@/lib/utils";

type Props = { moduleId: ModuleId; day: number; sprint: Sprint };

type Phase = "intro" | "passage" | "items" | "done";

/**
 * Test Ready Sprint — a 3–5 minute listen/speak drill, separate from the 5 Reps.
 * One item at a time: prompt → record → next. No scores, ever.
 */
export function TestReadySprint({ moduleId, day, sprint }: Props) {
  const t = useT();
  const { lang } = useAppLang();
  const es = lang === "es";
  const navigate = useNavigate();

  const [phase, setPhase] = useState<Phase>("intro");
  const [index, setIndex] = useState(0);
  const [recordings, setRecordings] = useState<Record<string, Recording>>({});
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "failed">("idle");
  const [attempt, setAttempt] = useState<number | null>(null);
  const startedAt = useRef<number>(0);

  const items = sprint.items;
  const item = items[index]!;
  const isLast = index === items.length - 1;
  const done = Boolean(recordings[item.id]);

  useEffect(() => () => AudioService.stop(), []);

  const responseSeconds = useMemo(
    () => Object.values(recordings).reduce((sum, r) => sum + r.durationSeconds, 0),
    [recordings],
  );

  const begin = () => {
    startedAt.current = Date.now();
    setPhase(sprint.passage ? "passage" : "items");
  };

  const next = () => {
    AudioService.stop();
    if (isLast) {
      void finish();
      return;
    }
    setIndex((i) => i + 1);
  };

  const finish = async () => {
    setPhase("done");
    setSaveState("saving");
    try {
      const record = await TestReadyService.complete({
        moduleId,
        day,
        sprintType: sprint.type,
        responseSeconds,
        completionSeconds: (Date.now() - startedAt.current) / 1000,
      });
      setAttempt(record.attempts);
      setSaveState("saved");
    } catch {
      setSaveState("failed");
    }
  };

  const restart = () => {
    setRecordings({});
    setIndex(0);
    setAttempt(null);
    setSaveState("idle");
    setPhase("intro");
  };

  /* --------------------------------- intro -------------------------------- */

  if (phase === "intro") {
    return (
      <div className="space-y-5">
        <div className="rounded-3xl bg-navy p-6 text-navy-foreground">
          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            <Zap className="size-3.5" /> {t("tr.card")} · {t("tr.minutes")}
          </p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight">{es ? sprint.titleEs : sprint.title}</h2>
          <p className="mt-3 text-[16px] font-semibold leading-snug text-navy-foreground/85">
            {es ? sprint.instructionEs : sprint.instruction}
          </p>
          {!es ? null : <p className="mt-1 text-[13px] text-navy-foreground/60">{sprint.instruction}</p>}
          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.16em] text-navy-foreground/60">
            {items.length} {items.length === 1 ? (es ? "ejercicio" : "exercise") : es ? "ejercicios" : "exercises"}
          </p>
        </div>
        <button type="button" onClick={begin} className={primaryBtn}>
          {t("tr.start")} <ArrowRight className="size-5" />
        </button>
      </div>
    );
  }

  /* -------------------------------- passage ------------------------------- */

  if (phase === "passage" && sprint.passage) {
    const retell = sprint.type === "story-retell";
    return (
      <div className="space-y-5">
        <Header sprint={sprint} es={es} step={`1 / 2`} />
        <div className="space-y-3 rounded-3xl bg-navy p-5 text-navy-foreground">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
            {retell ? t("tr.story") : t("tr.passage")}
          </p>
          {sprint.passageParts?.length ? (
            // Two-speaker passage: each turn plays with its own voice, in order.
            <div className="space-y-2">
              {sprint.passageParts.map((part, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-8 shrink-0 text-center text-[10px] font-extrabold tracking-[0.12em] text-navy-foreground/70">
                    {part.voice === "female" ? "A" : "B"}
                  </span>
                  <div className="min-w-0 flex-1">
                    <AudioPlayer text={part.text} label={`${t("tr.play")} ${i + 1}`} rate={1} variant="navy" voice={part.voice} tone="neutral" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AudioPlayer text={sprint.passage} label={t("tr.play")} rate={1} variant="navy" voice="male" tone="neutral" />
          )}
          <p className="text-center text-[12px] text-navy-foreground/70">
            {retell ? t("tr.listenOnce") : t("tr.listenFirst")}
          </p>
        </div>
        <button type="button" onClick={() => setPhase("items")} className={primaryBtn}>
          {retell ? t("tr.retellNow") : t("tr.next")} <ArrowRight className="size-5" />
        </button>
      </div>
    );
  }

  /* --------------------------------- done --------------------------------- */

  if (phase === "done") {
    return (
      <div className="space-y-5">
        <div className="rounded-3xl border border-success/25 bg-success/8 p-6 text-center">
          <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-success">
            <Sparkles className="size-4" /> {t("tr.done")}
          </p>
          <h2 className="mt-2 text-2xl font-extrabold tracking-tight">{es ? sprint.titleEs : sprint.title}</h2>
          <p className="mt-2 text-[14px] font-semibold text-muted-foreground">{t("tr.doneBody")}</p>
          <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {saveState === "saving"
              ? t("tr.saving")
              : saveState === "failed"
                ? t("tr.saveFailed")
                : attempt
                  ? `${t("tr.attempt")} ${attempt} · ${Math.round(responseSeconds)}s`
                  : null}
          </p>
          {saveState === "failed" ? (
            <button type="button" onClick={() => void finish()} className="mt-3 min-h-[44px] rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em]">
              {es ? "REINTENTAR" : "RETRY"}
            </button>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => void navigate({ to: "/module/$moduleId", params: { moduleId } })}
          className={primaryBtn}
        >
          <Check className="size-5" /> {t("tr.backToModule")}
        </button>
        <button type="button" onClick={restart} className={ghostBtn}>
          <RotateCcw className="size-4" /> {t("tr.again")}
        </button>
      </div>
    );
  }

  /* --------------------------------- items -------------------------------- */

  return (
    <div className="space-y-5">
      <Header sprint={sprint} es={es} step={`${index + 1} / ${items.length}`} />

      <div className="flex justify-center gap-1.5" aria-hidden>
        {items.map((it, i) => (
          <span
            key={it.id}
            className={cn(
              "h-1.5 w-6 rounded-full",
              recordings[it.id] ? "bg-success" : i === index ? "bg-primary" : "bg-secondary",
            )}
          />
        ))}
      </div>

      <ItemCard
        key={item.id}
        sprint={sprint}
        item={item}
        es={es}
        recording={recordings[item.id] ?? null}
        onRecorded={(rec) => setRecordings((prev) => ({ ...prev, [item.id]: rec }))}
        onClear={() =>
          setRecordings((prev) => {
            const copy = { ...prev };
            delete copy[item.id];
            return copy;
          })
        }
      />

      <button type="button" onClick={next} disabled={!done} className={primaryBtn}>
        {isLast ? t("tr.finish") : t("tr.next")} <ArrowRight className="size-5" />
      </button>
    </div>
  );
}

const primaryBtn =
  "inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-[15px] font-bold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98] disabled:opacity-40 disabled:shadow-none";
const ghostBtn =
  "inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground";

/** Per-item drill label for Mixed Sprints: [es, en]. */
const KIND_LABELS: Record<Exclude<TestReadyType, "mixed">, [string, string]> = {
  repeat: ["REPITE", "REPEAT"],
  "quick-answers": ["RESPUESTA RÁPIDA", "QUICK ANSWER"],
  "build-sentence": ["ARMA LA ORACIÓN", "BUILD THE SENTENCE"],
  "listen-respond": ["ESCUCHA Y RESPONDE", "LISTEN & RESPOND"],
  "speak-now": ["HABLA AHORA", "SPEAK NOW"],
  "story-retell": ["CUENTA LA HISTORIA", "RETELL THE STORY"],
  "describe-scene": ["DESCRIBE LA ESCENA", "DESCRIBE THE SCENE"],
};

function Header({ sprint, es, step }: { sprint: Sprint; es: boolean; step: string }) {
  const t = useT();
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-primary">
          <Zap className="size-3.5" /> {t("tr.card")}
        </p>
        <h2 className="mt-1 text-2xl font-extrabold tracking-tight">{es ? sprint.titleEs : sprint.title}</h2>
        <p className="text-[13px] font-semibold text-muted-foreground">{es ? sprint.instructionEs : sprint.instruction}</p>
      </div>
      <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {step}
      </span>
    </div>
  );
}

function ItemCard({
  sprint,
  item,
  es,
  recording,
  onRecorded,
  onClear,
}: {
  sprint: Sprint;
  item: Sprint["items"][number];
  es: boolean;
  recording: Recording | null;
  onRecorded: (rec: Recording) => void;
  onClear: () => void;
}) {
  const t = useT();
  const [played, setPlayed] = useState(false);
  const [ended, setEnded] = useState(false);
  // Mixed Sprint (ADVANCED): each item carries its own drill type.
  const kind = sprint.type === "mixed" ? (item.kind ?? "quick-answers") : sprint.type;
  // Speak Now and Describe the Scene both open with a think-time countdown.
  const speakNow = kind === "speak-now" || kind === "describe-scene";
  const thinkSeconds = item.thinkSeconds ?? sprint.thinkSeconds ?? 10;
  const [countdown, setCountdown] = useState<number | null>(speakNow ? thinkSeconds : null);

  // Speak Now: 10 seconds to think, then the mic opens.
  useEffect(() => {
    if (!speakNow || countdown === null || countdown <= 0) return;
    const id = setTimeout(() => setCountdown((c) => (c === null ? null : c - 1)), 1000);
    return () => clearTimeout(id);
  }, [speakNow, countdown]);

  const needsAudio = Boolean(item.audio) && kind !== "build-sentence";
  const lockAudio = sprint.playOnce && ended;
  const canRecord = speakNow ? countdown !== null && countdown <= 0 : !needsAudio || played;
  const maxSeconds = item.maxSeconds ?? (speakNow ? 60 : 12);
  const longForm = speakNow || kind === "story-retell";
  const kindLabel = sprint.type === "mixed" ? KIND_LABELS[kind] : null;

  return (
    <div className="space-y-4 rounded-3xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
      {kindLabel ? (
        <p className="text-center text-[10px] font-extrabold uppercase tracking-[0.22em] text-primary">
          {es ? kindLabel[0] : kindLabel[1]}
        </p>
      ) : null}

      {/* Describe the Scene: realistic visual first */}
      {kind === "describe-scene" && sprint.image ? (
        <img
          src={sprint.image.src}
          alt={es ? sprint.image.altEs : sprint.image.alt}
          width={1024}
          height={768}
          loading="eager"
          className="aspect-[4/3] w-full rounded-2xl object-cover"
        />
      ) : null}

      {/* Visible prompt (Listen & Respond questions, Speak Now topic, sentence chunks) */}
      {item.text ? (
        <div className="text-center">
          <p className="text-[19px] font-extrabold leading-snug">{item.text}</p>
          {es && item.textEs ? <p className="mt-1 text-[13px] text-muted-foreground">{item.textEs}</p> : null}
        </div>
      ) : null}

      {item.chunks?.length ? (
        <div className="flex flex-wrap justify-center gap-2">
          {item.chunks.map((chunk) => (
            <span
              key={chunk}
              className="rounded-2xl border border-primary/30 bg-primary/8 px-3.5 py-2 text-[14px] font-extrabold uppercase tracking-wide text-foreground"
            >
              {chunk}
            </span>
          ))}
        </div>
      ) : null}

      {/* Audio prompt */}
      {needsAudio && item.audio ? (
        lockAudio ? (
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">{t("tr.played")}</p>
        ) : (
          <AudioPlayer
            text={item.audio}
            label={t("tr.play")}
            rate={1}
            voice="female"
            tone="neutral"
            onStart={() => setPlayed(true)}
            onEnd={() => setEnded(true)}
          />
        )
      ) : null}

      {/* Speak Now countdown */}
      {speakNow && countdown !== null && countdown > 0 ? (
        <div className="rounded-2xl bg-navy p-4 text-center text-navy-foreground">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">{t("tr.think")}</p>
          <p className="mt-1 text-5xl font-extrabold tabular-nums">{countdown}</p>
        </div>
      ) : null}
      {speakNow && countdown === 0 && !recording ? (
        <p className="text-center text-[13px] font-extrabold uppercase tracking-[0.16em] text-primary">{t("tr.speakNow")}</p>
      ) : null}

      {/* Mic */}
      {recording ? (
        <div className="space-y-3">
          <AnswerPlayback recording={recording} />
          <button type="button" onClick={onClear} className={ghostBtn}>
            <RotateCcw className="size-4" /> {t("tr.retry")}
          </button>
        </div>
      ) : canRecord ? (
        <>
          {!speakNow && needsAudio ? (
            <p className="text-center text-[12px] font-semibold text-muted-foreground">{t("tr.sayIt")}</p>
          ) : null}
          <VoiceRecorder
            label={t("tr.record")}
            stopLabel={t("tr.stop")}
            maxSeconds={maxSeconds}
            {...(longForm && sprint.speakSeconds
              ? { targetSeconds: [sprint.speakSeconds, maxSeconds] as [number, number] }
              : {})}
            onComplete={onRecorded}
          />
        </>
      ) : !speakNow ? (
        <p className="text-center text-[12px] font-semibold text-muted-foreground">{t("tr.listenFirst")}</p>
      ) : null}
    </div>
  );
}

/** Play / stop the learner's own answer for this item. */
function AnswerPlayback({ recording }: { recording: Recording }) {
  const { playing, loading, toggle } = useRecordingPlayback(`tr:${recording.id}`);
  return (
    <button
      type="button"
      onClick={() => toggle(() => recording.url)}
      disabled={!recording.url}
      className="inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-success/30 bg-success/8 px-5 text-[13px] font-bold uppercase tracking-[0.12em] text-success disabled:opacity-40"
    >
      {playing ? <Square className="size-4" /> : <Play className="size-4" />}
      {loading ? "…" : `${Math.round(recording.durationSeconds)}s`}
    </button>
  );
}
