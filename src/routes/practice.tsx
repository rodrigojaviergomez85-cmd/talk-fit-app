import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { AudioPlayer } from "@/components/fluency/AudioPlayer";
import { RecordingPlayback } from "@/components/fluency/RecordingPlayback";
import { RepProgress } from "@/components/fluency/RepProgress";
import { VoiceRecorder } from "@/components/fluency/VoiceRecorder";
import { TakeBoard, TAKE_COUNT, REQUIRED_TAKES } from "@/components/fluency/TakeBoard";
import { PastVerbCards } from "@/components/fluency/PastVerbCards";
import { StoryStrip } from "@/components/fluency/StoryStrip";

import { DayCompleteScreen } from "@/components/fluency/DayCompleteScreen";
import { SpanishProvider, SpanishToggle, TranslatableText } from "@/components/fluency/TranslatableText";
import { CourseService, DEFAULT_MODULE, isModuleId } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";
import { AudioService } from "@/services/audio-service";
import type { CourseDay, ModelLine, ModuleId, Recording } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/practice")({
  validateSearch: (search: Record<string, unknown>) => {
    const module: ModuleId = isModuleId(search["module"]) ? search["module"] : DEFAULT_MODULE;
    return {
      module,
      day: Math.min(CourseService.totalDays(module), Math.max(1, Number(search["day"]) || 1)),
    };
  },
  head: () => ({
    meta: [
      { title: "Daily Practice — Fluency Reps" },
      { name: "description", content: "Five speaking reps a day: listen, copy, shadow, personalize and record your final rep in English." },
      { property: "og:title", content: "Daily Practice — Fluency Reps" },
      { property: "og:description", content: "Five speaking reps a day to make your English automatic." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PracticePage,
});

const REP_TITLES = [
  { en: "STEP 0 · INTRO", es: "PASO 0 · INTRO" },
  { en: "REP 1 OF 5 · LISTEN", es: "REP 1 DE 5 · ESCUCHA" },
  { en: "REP 2 OF 5 · COPY", es: "REP 2 DE 5 · COPIA" },
  { en: "REP 3 OF 5 · SHADOW", es: "REP 3 DE 5 · SHADOWING" },
  { en: "REP 4 OF 5 · MAKE IT YOURS", es: "REP 4 DE 5 · HAZLO TUYO" },
  { en: "REP 5 OF 5 · YOUR TURN", es: "REP 5 DE 5 · TU TURNO" },
];

/** Estimated complete spoken ideas for one take. Returns null when unavailable. */
async function countSentences(blob: Blob | null): Promise<number | null> {
  if (!blob || blob.size < 2048) return null;
  try {
    const form = new FormData();
    form.append("file", blob, "take");
    const res = await fetch("/api/sentence-count", { method: "POST", body: form });
    if (!res.ok) return null;
    const body = (await res.json()) as { sentences?: unknown };
    return typeof body.sentences === "number" ? body.sentences : null;
  } catch {
    return null;
  }
}


function PracticePage() {
  const { day: dayNumber, module: moduleId } = Route.useSearch();
  const navigate = useNavigate();
  const day = useMemo(() => CourseService.getDay(moduleId, dayNumber), [moduleId, dayNumber]);

  const [showEs, setShowEs] = useState(false);
  const [stage, setStage] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [takes, setTakes] = useState<(Recording | null)[]>(() => Array(TAKE_COUNT).fill(null));
  const [finalIndex, setFinalIndex] = useState<number | null>(null);
  const [finalRecording, setFinalRecording] = useState<Recording | null>(null);
  const practiceSeconds = useRef(0);

  useEffect(() => () => AudioService.stop(), []);
  useEffect(() => {
    AudioService.stop();
    window.scrollTo({ top: 0 });
  }, [stage, subIndex]);

  const subTotal = stage === 2 ? day.lines.length : stage === 4 ? rep4Items(day).length : 1;

  const goBack = () => {
    if (subIndex > 0) return setSubIndex(subIndex - 1);
    if (stage > 0) {
      setStage(stage - 1);
      setSubIndex(0);
      return;
    }
    void navigate({ to: "/" });
  };

  const goForward = () => {
    if (subIndex < subTotal - 1) return setSubIndex(subIndex + 1);
    if (stage < 5) {
      setStage(stage + 1);
      setSubIndex(0);
    }
  };

  const trackSeconds = (recording: Recording) => {
    practiceSeconds.current += recording.durationSeconds;
  };

  const recorded = takes.filter((take): take is Recording => Boolean(take));

  const finish = () => {
    const final = (finalIndex !== null ? takes[finalIndex] : null) ?? recorded[recorded.length - 1];
    if (!final) return;
    const first = recorded[0] ?? final;
    const next = JourneyService.completeDay({
      moduleId,
      day: day.day,
      sentenceCount: final.sentenceCount ?? null,
      finalSeconds: final.durationSeconds,
      firstSeconds: first.durationSeconds,
      practiceSeconds: Math.round(practiceSeconds.current),
      recordingsCount: Math.max(1, recorded.length),
      finalUrl: final.url,
      firstUrl: first.url,
    });
    setFinalRecording(final);
    setDone(true);
    void JourneyService.syncDay(moduleId, day.day, next, final.blob ?? null).catch(() => undefined);
  };

  if (done) {
    return (
      <SpanishProvider value={showEs}>
        <DayCompleteScreen
          moduleId={moduleId}
          day={day}
          finalRecording={finalRecording}
          firstRecording={recorded[0] ?? null}
          showEs={showEs}
        />
      </SpanishProvider>
    );
  }

  const title = REP_TITLES[stage] ?? REP_TITLES[0]!;

  return (
    <SpanishProvider value={showEs}>
      <div className="min-h-screen bg-background pb-16">
        <RepProgress
          current={stage}
          total={6}
          title={`DAY ${day.day} · ${showEs ? title.es : title.en}`}
          onBack={goBack}
          {...(stage < 5 ? { onNext: goForward } : {})}
          onExit={() => void navigate({ to: "/" })}
        />

        <main className="mx-auto w-full max-w-lg space-y-5 px-4 py-6">
          <SpanishToggle value={showEs} onChange={setShowEs} />

          {stage === 0 ? <IntroStep moduleId={moduleId} day={day} onNext={goForward} /> : null}
          {stage === 1 ? <Rep1Listen day={day} showEs={showEs} onNext={goForward} /> : null}
          {stage === 2 ? (
            <Rep2Copy
              day={day}
              index={subIndex}
              onRecorded={trackSeconds}
              onNext={goForward}
            />
          ) : null}
          {stage === 3 ? <Rep3Shadow day={day} onRecorded={trackSeconds} onNext={goForward} /> : null}
          {stage === 4 ? (
            <Rep4MakeItYours day={day} index={subIndex} onRecorded={trackSeconds} onNext={goForward} hideVisuals={moduleId === "past-stories"} />
          ) : null}
          {stage === 5 ? (
            <Rep5FinalRep
              day={day}
              takes={takes}
              finalIndex={finalIndex}
              onRecorded={(index, rec) => {
                trackSeconds(rec);
                const pending: Recording = { ...rec, countStatus: "pending", sentenceCount: null };
                setTakes((list) => list.map((item, i) => (i === index ? pending : item)));
                setFinalIndex(index);
                void countSentences(rec.blob ?? null).then((count) => {
                  setTakes((list) =>
                    list.map((item, i) =>
                      i === index && item?.id === rec.id
                        ? count === null
                          ? { ...item, countStatus: "failed", sentenceCount: null }
                          : { ...item, countStatus: "done", sentenceCount: count }
                        : item,
                    ),
                  );
                });
              }}
              onDelete={(index) => {
                setTakes((list) => list.map((item, i) => (i === index ? null : item)));
                setFinalIndex((current) => (current === index ? null : current));
              }}
              onSelectFinal={setFinalIndex}
              onFinish={finish}
            />
          ) : null}
        </main>
      </div>
    </SpanishProvider>
  );
}

/* ------------------------------- Shared UI ------------------------------- */

function PrimaryButton({ children, onClick, disabled }: { children: React.ReactNode; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-[15px] font-bold tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98] disabled:opacity-40 disabled:shadow-none"
    >
      {children}
    </button>
  );
}

function Instruction({ en, es }: { en: string; es: string }) {
  return (
    <TranslatableText es={es} align="center" className="text-center">
      <p className="text-center text-[17px] font-bold leading-snug">{en}</p>
    </TranslatableText>
  );
}

function LineCard({ line, chunked = false }: { line: ModelLine; chunked?: boolean }) {
  return (
    <TranslatableText es={line.es}>
      <p className="text-[22px] font-extrabold leading-tight tracking-tight">
        {chunked
          ? line.chunks.map((chunk, index) => (
              <span key={index} className="mr-1.5 inline-block rounded-lg bg-secondary px-1.5">
                {chunk}
              </span>
            ))
          : line.text}
      </p>
    </TranslatableText>
  );
}

function CueRow({ cues }: { cues: string[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {cues.map((cue) => (
        <span key={cue} className="rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          {cue}
        </span>
      ))}
    </div>
  );
}

/** The day's instructional picture (Present Progressive days only). */
function SceneImage({ day }: { day: CourseDay }) {
  const scene = day.sceneImage;
  if (!scene) return null;
  return (
    <figure className="overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-card)]">
      <img src={scene.src} alt={scene.alt} width={1280} height={896} loading="lazy" className="w-full" />
    </figure>
  );
}

/** Choice cards: who or what the learner wants to talk about. */
function VariantPicker({ day }: { day: CourseDay }) {
  const variants = day.variants;
  const [picked, setPicked] = useState<string | null>(null);
  if (!variants?.length) return null;
  return (
    <div className="space-y-2 rounded-3xl border border-border bg-card p-4">
      <TranslatableText es="Elige de quién o de qué vas a hablar" align="center">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
          Choose what you want to talk about
        </p>
      </TranslatableText>
      <div className="flex flex-wrap justify-center gap-2">
        {variants.map((variant) => (
          <button
            key={variant.id}
            type="button"
            onClick={() => setPicked(variant.id)}
            className={cn(
              "rounded-2xl border px-3.5 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors",
              picked === variant.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground",
            )}
          >
            {variant.label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Step 0 intro ----------------------------- */

function IntroStep({ moduleId, day, onNext }: { moduleId: ModuleId; day: CourseDay; onNext: () => void }) {
  const intro = day.intro;
  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-navy p-6 text-navy-foreground">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">DAY {day.day} OF {CourseService.totalDays(moduleId)}</p>
        <TranslatableText es={intro.titleEs} esClassName="text-navy-foreground/70">
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight">{intro.title}</h2>
        </TranslatableText>
        <TranslatableText es={intro.leadEs} className="mt-3" esClassName="text-navy-foreground/70">
          <p className="text-[17px] font-semibold leading-snug">{intro.lead}</p>
        </TranslatableText>
      </div>

      <div className="space-y-2 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        {intro.examples.map((example) => (
          <p key={example} className="text-[20px] font-extrabold tracking-tight">
            {example}
          </p>
        ))}
      </div>

      <div className="rounded-3xl border border-primary/25 bg-accent p-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-accent-foreground">
          {day.focus} · {day.topic}
        </p>
        <TranslatableText es={intro.goalEs} className="mt-2">
          <p className="text-[17px] font-bold leading-snug text-foreground">{intro.goal}</p>
        </TranslatableText>
      </div>

      <PrimaryButton onClick={onNext}>
        {intro.cta} <ArrowRight className="size-5" />
      </PrimaryButton>
    </div>
  );
}

/* -------------------------------- Rep 1 ---------------------------------- */

function Rep1Listen({ day, showEs, onNext }: { day: CourseDay; showEs: boolean; onNext: () => void }) {
  const [heard, setHeard] = useState(false);
  const [showText, setShowText] = useState(false);

  return (
    <div className="space-y-5">
      <Instruction
        en={day.sceneImage ? "Look at the picture and just listen." : "Just listen. Don't speak yet."}
        es={day.sceneImage ? "Mira la imagen y solo escucha." : "Solo escucha. Todavía no hables."}
      />

      <SceneImage day={day} />
      <PastVerbCards day={day} />
      <StoryStrip day={day} showCaptions={!day.hideModelText} />


      <AudioPlayer
        text={CourseService.getModelText(day)}
        label="LISTEN TO THE MODEL"
        voice={day.speakerVoice}
        size="lg"
        onEnd={() => setHeard(true)}
      />

      <button
        type="button"
        onClick={() => setShowText((v) => !v)}
        className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground"
      >
        {showText ? "Hide text" : "Show text"}
      </button>

      {showText ? (
        <div className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          {day.lines.map((line) => (
            <LineCard key={line.id} line={line} />
          ))}
        </div>
      ) : null}

      <PrimaryButton
        onClick={() => {
          if (!heard) AudioService.stop();
          onNext();
        }}
      >
        {showEs ? (heard ? "SIGUIENTE REP" : "SALTAR") : heard ? "NEXT REP" : "SKIP"}{" "}
        <ArrowRight className="size-5" />
      </PrimaryButton>
    </div>
  );
}

/* -------------------------------- Rep 2 ---------------------------------- */

function Rep2Copy({
  day,
  index,
  onRecorded,
  onNext,
}: {
  day: CourseDay;
  index: number;
  onRecorded: (rec: Recording) => void;
  onNext: () => void;
}) {
  const line = day.lines[index]!;
  const [mine, setMine] = useState<Recording | null>(null);

  useEffect(() => setMine(null), [index]);

  return (
    <div className="space-y-5">
      <Instruction en="Listen. Then copy the sentence." es="Escucha. Después copia la oración." />

      <SceneImage day={day} />
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {index + 1} / {day.lines.length}
      </p>

      <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        <LineCard line={line} chunked />
      </div>

      <AudioPlayer text={line.text} label="LISTEN" rate={0.9} voice={day.speakerVoice} />

      <VoiceRecorder label="RECORD" maxSeconds={20} showTimer onComplete={(rec) => { setMine(rec); onRecorded(rec); }} />

      {mine ? <RecordingPlayback url={mine.url} label="LISTEN TO ME" /> : null}

      <PrimaryButton onClick={onNext}>
        {index < day.lines.length - 1 ? "NEXT SENTENCE" : "NEXT REP"} <ArrowRight className="size-5" />
      </PrimaryButton>
    </div>
  );
}

/* -------------------------------- Rep 3 ---------------------------------- */

function Rep3Shadow({ day, onRecorded, onNext }: { day: CourseDay; onRecorded: (rec: Recording) => void; onNext: () => void }) {
  const [speed, setSpeed] = useState(0.75);
  const [mine, setMine] = useState<Recording | null>(null);

  return (
    <div className="space-y-5">
      <Instruction en="Read along with the model." es="Lee a la par del modelo." />

      <SceneImage day={day} />
      <StoryStrip day={day} showCaptions={!day.hideModelText} />


      <div className="flex gap-2">
        {[0.5, 0.75, 1.0].map((rate) => (
          <button
            key={rate}
            type="button"
            onClick={() => setSpeed(rate)}
            className={cn(
              "flex-1 rounded-2xl border px-4 py-3 text-[13px] font-bold uppercase tracking-[0.12em] transition-colors",
              speed === rate ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-muted-foreground",
            )}
          >
            {rate}x
          </button>
        ))}
      </div>

      <p className="text-center text-[12px] font-semibold leading-snug text-muted-foreground">
        0.5× / 0.75× = slow · 1.0× = normal
      </p>


      <div className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        {day.lines.map((line) => (
          <LineCard key={line.id} line={line} chunked />
        ))}
      </div>

      <AudioPlayer text={CourseService.getModelText(day)} label="START SHADOWING" rate={speed} size="lg" voice={day.speakerVoice} />

      <VoiceRecorder label="RECORD ME" maxSeconds={60} onComplete={(rec) => { setMine(rec); onRecorded(rec); }} />
      {mine ? <RecordingPlayback url={mine.url} label="LISTEN TO ME" /> : null}

      <PrimaryButton onClick={onNext}>
        NEXT REP <ArrowRight className="size-5" />
      </PrimaryButton>
    </div>
  );
}

/* -------------------------------- Rep 4 ---------------------------------- */

type Rep4Item = { id: string; question: string; questionEs: string; starter: string; starterEs: string; cues?: string[] };

function rep4Items(day: CourseDay): Rep4Item[] {
  if (day.challenges?.length) {
    return day.challenges.map((challenge) => ({
      id: challenge.id,
      question: challenge.title,
      questionEs: challenge.titleEs,
      starter: challenge.detail,
      starterEs: challenge.detailEs,
      cues: challenge.cues,
    }));
  }
  return day.prompts;
}

function Rep4MakeItYours({
  day,
  index,
  onRecorded,
  onNext,
}: {
  day: CourseDay;
  index: number;
  onRecorded: (rec: Recording) => void;
  onNext: () => void;
}) {
  const items = rep4Items(day);
  const item = items[index]!;
  const [mine, setMine] = useState<Recording | null>(null);

  useEffect(() => setMine(null), [index]);

  return (
    <div className="space-y-5">
      <Instruction
        en={day.sceneImage ? "What's happening? Answer about the picture." : "Answer about YOUR life."}
        es={day.sceneImage ? "¿Qué está pasando? Responde sobre la imagen." : "Responde sobre TU vida."}
      />

      <SceneImage day={day} />
      <PastVerbCards day={day} />
      <StoryStrip day={day} showCaptions={!day.hideModelText} />

      <VariantPicker day={day} />
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {index + 1} / {items.length}
      </p>

      <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        <TranslatableText es={item.questionEs}>
          <p className="text-[20px] font-extrabold leading-tight tracking-tight">{item.question}</p>
        </TranslatableText>
        <div className="mt-4 rounded-2xl bg-secondary p-4">
          <TranslatableText es={item.starterEs}>
            <p className="text-[17px] font-bold text-foreground">{item.starter}</p>
          </TranslatableText>
        </div>
      </div>

      {item.cues ? <CueRow cues={item.cues} /> : null}

      <AudioPlayer text={item.question} label="HEAR THE QUESTION" variant="ghost" size="sm" voice={day.speakerVoice} />

      <VoiceRecorder label="ANSWER" maxSeconds={30} onComplete={(rec) => { setMine(rec); onRecorded(rec); }} />
      {mine ? <RecordingPlayback url={mine.url} label="LISTEN TO ME" /> : null}

      <PrimaryButton onClick={onNext}>
        {index < items.length - 1 ? "NEXT QUESTION" : "NEXT REP"} <ArrowRight className="size-5" />
      </PrimaryButton>
    </div>
  );
}

/* -------------------------------- Rep 5 ---------------------------------- */

function Rep5FinalRep({
  day,
  takes,
  finalIndex,
  onRecorded,
  onDelete,
  onSelectFinal,
  onFinish,
}: {
  day: CourseDay;
  takes: (Recording | null)[];
  finalIndex: number | null;
  onRecorded: (index: number, rec: Recording) => void;
  onDelete: (index: number) => void;
  onSelectFinal: (index: number) => void;
  onFinish: () => void;
}) {
  const completed = takes.filter(Boolean).length;
  const requiredDone = completed >= REQUIRED_TAKES;
  const slotsLeft = takes.some((take) => !take);
  const [showExampleText, setShowExampleText] = useState(false);

  return (
    <div className="space-y-5">
      <Instruction en="Record it. Listen. Try again." es="Grábalo. Escúchalo. Inténtalo otra vez." />

      <SceneImage day={day} />
      <StoryStrip day={day} showCaptions={!day.hideModelText} />
      <VariantPicker day={day} />


      <div className="rounded-3xl border border-primary/25 bg-accent p-4 space-y-3">
        <TranslatableText es="Responde la pregunta:" align="center">
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-accent-foreground">
            Answer the question:
          </p>
        </TranslatableText>
        <TranslatableText es={day.rep5Prompt.questionEs}>
          <p className="text-[17px] font-extrabold leading-snug">{day.rep5Prompt.question}</p>
        </TranslatableText>
        {day.rep5Tips ? (
          <TranslatableText es={day.rep5Tips.es}>
            <p className="text-[14px] leading-relaxed text-foreground">{day.rep5Tips.en}</p>
          </TranslatableText>
        ) : (
          <TranslatableText
            es="Usa conectores como after, later y then. Si puedes, agrega un because."
          >
            <p className="text-[14px] leading-relaxed text-foreground">
              Use connectors like <strong>after</strong>, <strong>later</strong> and <strong>then</strong>. If you can, add a <strong>because</strong>.
            </p>
          </TranslatableText>
        )}
        <TranslatableText es="Meta: al menos 5–10 oraciones en 30 segundos o más.">
          <p className="text-[14px] font-semibold text-foreground">
            Goal: at least 5–10 sentences in 30 seconds or more.
          </p>
        </TranslatableText>
      </div>

      {day.modelExample ? (
        <div className="space-y-3 rounded-3xl border border-border bg-card p-4">
          <TranslatableText es="¿Quieres escuchar cómo debería sonar?" align="center">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              Want to hear how it should sound?
            </p>
          </TranslatableText>
          <AudioPlayer text={day.modelExample.text} label="LISTEN TO EXAMPLE" rate={1} variant="navy" voice={day.speakerVoice} />
          <button
            type="button"
            onClick={() => setShowExampleText((v) => !v)}
            className="w-full text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-primary"
          >
            {showExampleText ? "Hide example text" : "Show example text"}
          </button>
          {showExampleText ? (
            <TranslatableText es={day.modelExample.es}>
              <p className="text-[14px] leading-relaxed text-foreground">{day.modelExample.text}</p>
            </TranslatableText>
          ) : null}
        </div>
      ) : null}

      <TranslatableText es={`Meta: ${day.goalSeconds[0]}–${day.goalSeconds[1]} segundos por toma.`} align="center">
        <p className="text-center text-[13px] text-muted-foreground">
          Goal: {day.goalSeconds[0]}–{day.goalSeconds[1]} seconds per take.
        </p>
      </TranslatableText>

      <TakeBoard
        takes={takes}
        finalIndex={finalIndex}
        goalSeconds={day.goalSeconds}
        goalSentences={day.goalSentences ?? 5}
        onRecorded={onRecorded}
        onDelete={onDelete}

        onSelectFinal={onSelectFinal}
      />

      {requiredDone ? (
        <div className="space-y-3">
          <div className="rounded-3xl border border-success/25 bg-success/8 p-4 text-center">
            <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-success">
              <Sparkles className="size-4" /> 3 required reps complete ✓
            </p>
            {finalIndex !== null ? (
              <p className="mt-1 text-[13px] font-semibold">Final rep selected ✓ — Take {finalIndex + 1}</p>
            ) : (
              <TranslatableText es="Elige una toma como tu rep final." align="center" className="mt-1">
                <p className="text-[13px] text-muted-foreground">Pick one take as your final rep.</p>
              </TranslatableText>
            )}
          </div>

          <PrimaryButton onClick={onFinish} disabled={finalIndex === null}>
            <Check className="size-5" /> COMPLETE TODAY'S PRACTICE
          </PrimaryButton>

          {slotsLeft ? (
            <TranslatableText es="O graba otra toma opcional arriba." align="center">
              <p className="text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Or record another take above
              </p>
            </TranslatableText>
          ) : null}
        </div>
      ) : (
        <TranslatableText es={`Faltan ${REQUIRED_TAKES - completed} tomas obligatorias.`} align="center">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {REQUIRED_TAKES - completed} required take{REQUIRED_TAKES - completed === 1 ? "" : "s"} left
          </p>
        </TranslatableText>
      )}
    </div>
  );
}
