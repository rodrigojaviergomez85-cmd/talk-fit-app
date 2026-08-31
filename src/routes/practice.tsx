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
import { TodaysPastVerbs } from "@/components/fluency/TodaysPastVerbs";
import { MicTest, isMicChecked } from "@/components/fluency/MicTest";

import { DayCompleteScreen } from "@/components/fluency/DayCompleteScreen";
import {
  SpanishProvider,
  SpanishToggle,
  TranslatableText,
  useEsSupportPref,
} from "@/components/fluency/TranslatableText";
import { CollapsibleHelp, TextToggle } from "@/components/fluency/CollapsibleHelp";
import { supportLevel, prefersChunks, showsFullTextByDefault } from "@/lib/support-level";
import { CourseService, DEFAULT_MODULE, isModuleId } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";
import { AudioService } from "@/services/audio-service";
import {
  PracticeSessionService,
  setSessionScope,
  itemKey,
  type PracticeSession,
} from "@/services/practice-session";
import { supabase } from "@/integrations/supabase/client";
import type { CourseDay, ModelLine, ModuleId, Recording } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAppLang } from "@/lib/i18n";
import { setPreferencesScope } from "@/services/preferences";
import { VerbBank, setVerbBankScope } from "@/services/verb-bank";

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
  { en: "INTRO", es: "INTRO" },
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

  const [showEs, setShowEs] = useEsSupportPref();
  const { lang } = useAppLang();
  // App chrome follows the interface language; showEs is learning support only.
  const esUi = lang === "es";
  const [stage, setStage] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [takes, setTakes] = useState<(Recording | null)[]>(() => Array(TAKE_COUNT).fill(null));
  const [finalIndex, setFinalIndex] = useState<number | null>(null);
  const [finalRecording, setFinalRecording] = useState<Recording | null>(null);
  const [saveState, setSaveState] = useState<FinalRepSaveState>("idle");
  const [journeyAfterFinish, setJourneyAfterFinish] = useState<JourneyState | null>(null);
  const saveRef = useRef(false);
  const practiceSeconds = useRef(0);

  const [attempted, setAttempted] = useState<string[]>([]);
  const [skipped, setSkipped] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [resume, setResume] = useState<PracticeSession | null>(null);
  const [confirmExit, setConfirmExit] = useState(false);
  const [micChecked, setMicChecked] = useState(true);
  const startedAt = useRef(new Date().toISOString());

  // Restore any saved position for this module + day (scoped to the learner).
  useEffect(() => {
    let cancelled = false;
    const start = (userId: string | null) => {
      if (cancelled) return;
      setSessionScope(userId);
      setPreferencesScope(userId);
      setVerbBankScope(userId);
      const saved = PracticeSessionService.load(moduleId, dayNumber);
      if (PracticeSessionService.isResumable(saved)) setResume(saved);
      else PracticeSessionService.clear(moduleId, dayNumber);
      setReady(true);
    };
    void supabase.auth
      .getUser()
      .then(({ data }) => start(data.user?.id ?? null))
      .catch(() => start(null));
    return () => {
      cancelled = true;
    };
  }, [moduleId, dayNumber]);

  // Persist the position on every meaningful change.
  useEffect(() => {
    if (!ready || resume || done) return;
    PracticeSessionService.save({
      moduleId,
      day: dayNumber,
      week: day.week ?? null,
      stage,
      subIndex,
      attempted,
      skipped,
      startedAt: startedAt.current,
    });
  }, [ready, resume, done, moduleId, dayNumber, day.week, stage, subIndex, attempted, skipped]);

  useEffect(() => setMicChecked(isMicChecked()), []);

  // Verbs used in today's lesson become "discovered" in the Past Verb Bank.
  const todaysVerbs = useMemo(() => (ready ? VerbBank.todaysVerbs(day) : []), [ready, day]);
  useEffect(() => {
    if (!ready || todaysVerbs.length === 0) return;
    VerbBank.discover(todaysVerbs.map((verb) => verb.id));
  }, [ready, todaysVerbs]);

  useEffect(() => () => AudioService.stop(), []);
  useEffect(() => {
    AudioService.stop();
    window.scrollTo({ top: 0 });
  }, [stage, subIndex]);

  const items4 = useMemo(() => rep4Items(day), [day]);
  const subTotal = stage === 2 ? day.lines.length : stage === 4 ? items4.length : 1;

  const currentItemKey =
    stage === 2
      ? itemKey(2, day.lines[subIndex]?.id ?? String(subIndex))
      : stage === 4
        ? itemKey(4, items4[subIndex]?.id ?? String(subIndex))
        : null;

  const markAttempted = (key: string) =>
    setAttempted((list) => (list.includes(key) ? list : [...list, key]));

  const goBack = () => {
    if (subIndex > 0) return setSubIndex(subIndex - 1);
    if (stage > 0) {
      setStage(stage - 1);
      setSubIndex(0);
      return;
    }
    setConfirmExit(true);
  };

  const goForward = () => {
    if (subIndex < subTotal - 1) return setSubIndex(subIndex + 1);
    if (stage < 5) {
      setStage(stage + 1);
      setSubIndex(0);
    }
  };

  const skipCurrent = () => {
    if (currentItemKey) setSkipped((list) => (list.includes(currentItemKey) ? list : [...list, currentItemKey]));
    goForward();
  };

  const trackSeconds = (recording: Recording) => {
    practiceSeconds.current += recording.durationSeconds;
  };

  const recorded = takes.filter((take): take is Recording => Boolean(take));


  /**
   * Saves the Final Rep to the cloud. The blob stays in memory until the
   * upload result is known, so a failure is always retryable in this session.
   */
  const cloudSave = (final: Recording, state: JourneyState) => {
    if (saveRef.current) return;
    saveRef.current = true;
    setSaveState("saving");
    JourneyService.syncDay(moduleId, day.day, state, final.blob ?? null)
      .then((result) => {
        setSaveState(result === "failed" ? "failed" : result === "skipped" ? "local" : "saved");
      })
      .catch((error: unknown) => {
        console.error("[practice] final rep sync failed", error);
        setSaveState("failed");
      })
      .finally(() => {
        saveRef.current = false;
      });
  };

  const finish = () => {
    if (done || saveRef.current) return;
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
    setJourneyAfterFinish(next);
    setDone(true);
    PracticeSessionService.clear(moduleId, day.day);
    cloudSave(final, next);
  };

  const countFor = (rep: 2 | 4, ids: string[]) => {
    const keys = ids.map((id) => itemKey(rep, id));
    return {
      total: keys.length,
      attempted: keys.filter((key) => attempted.includes(key)).length,
      skipped: keys.filter((key) => skipped.includes(key) && !attempted.includes(key)).length,
    };
  };

  if (done) {
    return (
      <SpanishProvider value={showEs}>
        <DayCompleteScreen
          moduleId={moduleId}
          day={day}
          finalRecording={finalRecording}
          firstRecording={recorded[0] ?? null}
          showEs={esUi}
          summary={{
            rep2: countFor(2, day.lines.map((line) => line.id)),
            rep4: countFor(4, items4.map((item) => item.id)),
          }}
        />
      </SpanishProvider>
    );
  }

  if (resume) {
    return (
      <SpanishProvider value={showEs}>
        <ResumeScreen
          session={resume}
          day={day}
          showEs={esUi}
          onContinue={() => {
            setStage(resume.stage);
            setSubIndex(resume.subIndex);
            setAttempted(resume.attempted);
            setSkipped(resume.skipped);
            startedAt.current = resume.startedAt;
            setResume(null);
          }}
          onRestart={() => {
            PracticeSessionService.clear(moduleId, dayNumber);
            startedAt.current = new Date().toISOString();
            setResume(null);
          }}
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
          title={`${esUi ? "DÍA" : "DAY"} ${day.day} · ${esUi ? title.es : title.en}`}
          onBack={goBack}
          {...(stage < 5 ? { onNext: goForward } : {})}
          onExit={() => setConfirmExit(true)}
        />

        {confirmExit ? (
          <ExitDialog
            showEs={esUi}
            onCancel={() => setConfirmExit(false)}
            onExit={() => {
              AudioService.stop();
              void navigate({ to: "/" });
            }}
          />
        ) : null}

        <main className="mx-auto w-full max-w-lg space-y-5 px-4 py-5">
          <div className="flex justify-end">
            <SpanishToggle value={showEs} onChange={setShowEs} />
          </div>

          {stage === 0 ? (
            <>
              <IntroStep moduleId={moduleId} day={day} onNext={goForward} />
              <TodaysPastVerbs verbs={todaysVerbs} />
            </>
          ) : null}
          {stage === 1 ? <Rep1Listen day={day} showEs={esUi} onNext={goForward} /> : null}
          {stage === 2 && !micChecked ? (
            <MicTest onPass={() => setMicChecked(true)} onSkip={() => setMicChecked(true)} />
          ) : null}
          {stage === 2 && micChecked ? (
            <Rep2Copy
              day={day}
              index={subIndex}
              showEs={esUi}
              attempted={Boolean(currentItemKey && attempted.includes(currentItemKey))}
              onRecorded={(rec) => {
                trackSeconds(rec);
                if (currentItemKey) markAttempted(currentItemKey);
              }}
              onSkip={skipCurrent}
              onNext={goForward}
            />
          ) : null}
          {stage === 3 ? <Rep3Shadow day={day} onRecorded={trackSeconds} onNext={goForward} /> : null}
          {stage === 4 ? (
            <Rep4MakeItYours
              day={day}
              index={subIndex}
              showEs={esUi}
              attempted={Boolean(currentItemKey && attempted.includes(currentItemKey))}
              onRecorded={(rec) => {
                trackSeconds(rec);
                if (currentItemKey) markAttempted(currentItemKey);
              }}
              onSkip={skipCurrent}
              onNext={goForward}
              hideVisuals={moduleId === "past-stories"}
            />

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
    <TranslatableText es={es} align="center" className="text-center" supportOnly>
      <p className="text-center text-[17px] font-bold leading-snug">{en}</p>
    </TranslatableText>
  );
}

/** Small goal chips: seconds + ideas. */
function GoalChips({ day }: { day: CourseDay }) {
  return (
    <div className="flex justify-center gap-2">
      <span className="rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {day.goalSeconds[0]}+ sec
      </span>
      <span className="rounded-full bg-secondary px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
        {day.goalSentences ?? 5}+ ideas
      </span>
    </div>
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
  const [first, ...rest] = intro.examples;

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-navy p-6 text-navy-foreground">
        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
          DAY {day.day} OF {CourseService.totalDays(moduleId)}
        </p>
        <TranslatableText es={intro.titleEs} esClassName="text-navy-foreground/70" supportOnly>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight">{intro.title}</h2>
        </TranslatableText>
        <TranslatableText es={intro.goalEs} className="mt-3" esClassName="text-navy-foreground/70" supportOnly>
          <p className="text-[16px] font-semibold leading-snug text-navy-foreground/85">{intro.goal}</p>
        </TranslatableText>
      </div>

      <SceneImage day={day} />

      {first ? (
        <div className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          <p className="text-[20px] font-extrabold leading-tight tracking-tight">{first}</p>
          <AudioPlayer text={first} label="LISTEN" voice={day.speakerVoice} />
        </div>
      ) : null}

      <GoalChips day={day} />

      <CollapsibleHelp>
        <TranslatableText es={intro.leadEs} supportOnly>
          <p className="text-[15px] leading-relaxed text-foreground">{intro.lead}</p>
        </TranslatableText>
        {rest.length ? (
          <div className="space-y-1.5">
            {rest.map((example) => (
              <p key={example} className="text-[16px] font-bold tracking-tight">
                {example}
              </p>
            ))}
          </div>
        ) : null}
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {day.focus} · {day.topic}
        </p>
      </CollapsibleHelp>

      <PrimaryButton onClick={onNext}>
        {intro.cta} <ArrowRight className="size-5" />
      </PrimaryButton>
    </div>
  );
}

/* --------------------------- Resume / exit UI ---------------------------- */

const RESUME_LABELS = [
  { en: "INTRO", es: "INTRO" },
  { en: "REP 1", es: "REP 1" },
  { en: "REP 2", es: "REP 2" },
  { en: "REP 3", es: "REP 3" },
  { en: "REP 4", es: "REP 4" },
  { en: "REP 5", es: "REP 5" },
];

function ResumeScreen({
  session,
  day,
  showEs,
  onContinue,
  onRestart,
}: {
  session: PracticeSession;
  day: CourseDay;
  showEs: boolean;
  onContinue: () => void;
  onRestart: () => void;
}) {
  const [confirming, setConfirming] = useState(false);
  const label = RESUME_LABELS[session.stage] ?? RESUME_LABELS[0]!;
  const total = session.stage === 2 ? day.lines.length : session.stage === 4 ? rep4Items(day).length : 1;
  const position =
    total > 1
      ? `${showEs ? label.es : label.en} · ${showEs ? "FRASE" : "PROMPT"} ${session.subIndex + 1} ${showEs ? "DE" : "OF"} ${total}`
      : showEs
        ? label.es
        : label.en;

  return (
    <div className="min-h-screen bg-background px-4 pb-16 pt-[max(2rem,env(safe-area-inset-top))]">
      <div className="mx-auto w-full max-w-lg space-y-5">
        <div className="rounded-3xl bg-navy p-7 text-center text-navy-foreground">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-primary">
            {showEs ? "QUÉ BUENO VERTE" : "WELCOME BACK"}
          </p>
          <h1 className="mt-2 text-2xl font-extrabold tracking-tight">
            {showEs ? `Día ${day.day}` : `Day ${day.day}`}
          </h1>
          <p className="mt-3 text-[14px] font-semibold text-navy-foreground/80">
            {showEs ? "Estabas practicando" : "You were practicing"}
          </p>
          <p className="mt-1 text-[17px] font-extrabold tracking-tight">{position}</p>
        </div>

        <PrimaryButton onClick={onContinue}>
          {showEs ? "CONTINUAR DONDE ME QUEDÉ" : "CONTINUE WHERE I LEFT OFF"} <ArrowRight className="size-5" />
        </PrimaryButton>

        {confirming ? (
          <div className="space-y-3 rounded-3xl border border-border bg-card p-5 text-center">
            <p className="text-[14px] font-semibold">
              {showEs
                ? "Tu avance dentro de esta práctica se borrará."
                : "Your progress inside this practice will be reset."}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="flex-1 rounded-2xl border border-border px-4 py-3 text-[13px] font-bold uppercase tracking-[0.12em]"
              >
                {showEs ? "CANCELAR" : "CANCEL"}
              </button>
              <button
                type="button"
                onClick={onRestart}
                className="flex-1 rounded-2xl bg-destructive px-4 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-destructive-foreground"
              >
                {showEs ? "EMPEZAR DE NUEVO" : "START OVER"}
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            className="w-full text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground underline underline-offset-4"
          >
            {showEs ? "Empezar este día de nuevo" : "Start this day over"}
          </button>
        )}
      </div>
    </div>
  );
}

function ExitDialog({ showEs, onCancel, onExit }: { showEs: boolean; onCancel: () => void; onExit: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-sm space-y-4 rounded-3xl bg-card p-6 text-center shadow-[var(--shadow-lift)]">
        <p className="text-[18px] font-extrabold tracking-tight">
          {showEs ? "¿SALIR DE LA PRÁCTICA?" : "EXIT PRACTICE?"}
        </p>
        <p className="text-[14px] text-muted-foreground">
          {showEs ? "Tu avance de hoy se guardará." : "Your progress today will be saved."}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onExit}
            className="flex-1 rounded-2xl border border-border px-4 py-3 text-[13px] font-bold uppercase tracking-[0.12em]"
          >
            {showEs ? "SALIR" : "EXIT"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-2xl bg-primary px-4 py-3 text-[13px] font-bold uppercase tracking-[0.12em] text-primary-foreground"
          >
            {showEs ? "SEGUIR PRACTICANDO" : "KEEP PRACTICING"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** Tiny hint under a disabled primary action. */
function HelperText({ text }: { text: string }) {
  return <p className="text-center text-[12px] font-semibold text-muted-foreground">{text}</p>;
}

/** Tertiary text link: move on without a recording. */
function SkipLink({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex min-h-[44px] w-full items-center justify-center text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      {label}
    </button>
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
      <StoryStrip day={day} showCaptions={false} />

      <AudioPlayer
        text={CourseService.getModelText(day)}
        label="LISTEN TO THE MODEL"
        voice={day.speakerVoice}
        size="lg"
        onEnd={() => setHeard(true)}
      />

      <TextToggle open={showText} onToggle={() => setShowText((v) => !v)} />

      {showText ? (
        <div className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          {day.lines.map((line) => (
            <LineCard key={line.id} line={line} />
          ))}
        </div>
      ) : null}


      {heard ? (
        <PrimaryButton onClick={onNext}>
          {showEs ? "SIGUIENTE REP" : "NEXT REP"} <ArrowRight className="size-5" />
        </PrimaryButton>
      ) : (
        <SkipLink
          label={showEs ? "saltar por ahora" : "skip for now"}
          onClick={() => {
            AudioService.stop();
            onNext();
          }}
        />
      )}
    </div>
  );
}

/* -------------------------------- Rep 2 ---------------------------------- */

function Rep2Copy({
  day,
  index,
  showEs,
  attempted,
  onRecorded,
  onSkip,
  onNext,
}: {
  day: CourseDay;
  index: number;
  showEs: boolean;
  attempted: boolean;
  onRecorded: (rec: Recording) => void;
  onSkip: () => void;
  onNext: () => void;
}) {
  const line = day.lines[index]!;
  const [mine, setMine] = useState<Recording | null>(null);

  useEffect(() => setMine(null), [index]);

  const level = supportLevel(day);

  return (
    <div className="space-y-5">
      <Instruction en="Listen, then copy." es="Escucha y copia." />

      <SceneImage day={day} />
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {index + 1} / {day.lines.length}
      </p>

      <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        <LineCard line={line} chunked={prefersChunks(level)} />
      </div>


      <AudioPlayer text={line.text} label="LISTEN" rate={0.9} voice={day.speakerVoice} />

      <VoiceRecorder label="RECORD" maxSeconds={20} showTimer onComplete={(rec) => { setMine(rec); onRecorded(rec); }} />

      {mine ? <RecordingPlayback url={mine.url} label="LISTEN TO ME" /> : null}

      <PrimaryButton onClick={onNext} disabled={!attempted}>
        {index < day.lines.length - 1
          ? showEs
            ? "SIGUIENTE FRASE"
            : "NEXT SENTENCE"
          : showEs
            ? "SIGUIENTE REP"
            : "NEXT REP"}{" "}
        <ArrowRight className="size-5" />
      </PrimaryButton>

      {attempted ? null : (
        <>
          <HelperText text={showEs ? "Graba una vez para continuar." : "Record once to continue."} />
          <SkipLink label={showEs ? "saltar esta frase" : "skip this sentence"} onClick={onSkip} />
        </>
      )}

    </div>
  );
}

/* -------------------------------- Rep 3 ---------------------------------- */

function Rep3Shadow({ day, onRecorded, onNext }: { day: CourseDay; onRecorded: (rec: Recording) => void; onNext: () => void }) {
  const [speed, setSpeed] = useState(0.75);
  const [mine, setMine] = useState<Recording | null>(null);
  const level = supportLevel(day);
  const [showText, setShowText] = useState(showsFullTextByDefault(level));

  return (
    <div className="space-y-5">
      <div className="rounded-3xl bg-navy p-5 text-center text-navy-foreground">
        <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Shadow</p>
        <TranslatableText es="Habla al mismo tiempo que el modelo." align="center" className="mt-1" esClassName="text-navy-foreground/70" supportOnly>
          <p className="text-[17px] font-bold leading-snug">Speak with the audio.</p>
        </TranslatableText>
      </div>

      <SceneImage day={day} />
      <StoryStrip day={day} showCaptions={false} />

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

      <TextToggle open={showText} onToggle={() => setShowText((v) => !v)} />

      {showText ? (
        <div className="space-y-3 rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
          {day.lines.map((line) => (
            <LineCard key={line.id} line={line} chunked={prefersChunks(level)} />
          ))}
        </div>
      ) : (
        <CueRow cues={day.cues} />
      )}


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
  showEs,
  attempted,
  onRecorded,
  onSkip,
  onNext,
  hideVisuals = false,
}: {
  day: CourseDay;
  index: number;
  showEs: boolean;
  attempted: boolean;
  onRecorded: (rec: Recording) => void;
  onSkip: () => void;
  onNext: () => void;
  hideVisuals?: boolean;
}) {
  const items = rep4Items(day);
  const item = items[index]!;
  const [mine, setMine] = useState<Recording | null>(null);

  useEffect(() => setMine(null), [index]);

  return (
    <div className="space-y-5">
      <Instruction
        en={!hideVisuals && day.sceneImage ? "What's happening? Answer about the picture." : "Answer about YOUR life."}
        es={!hideVisuals && day.sceneImage ? "¿Qué está pasando? Responde sobre la imagen." : "Responde sobre TU vida."}
      />

      {!hideVisuals ? (
        <>
          <SceneImage day={day} />
          <PastVerbCards day={day} />
          <StoryStrip day={day} showCaptions={false} />
          <VariantPicker day={day} />
        </>
      ) : null}
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
        {index + 1} / {items.length}
      </p>

      <CueRow cues={item.cues ?? day.cues} />

      <div className="rounded-3xl bg-card p-5 shadow-[var(--shadow-card)]">
        <TranslatableText es={item.questionEs}>
          <p className="text-[20px] font-extrabold leading-tight tracking-tight">{item.question}</p>
        </TranslatableText>
        <div className="mt-4 rounded-2xl bg-secondary p-4">
          <TranslatableText es={item.starterEs} supportOnly>
            <p className="text-[17px] font-bold text-foreground">{item.starter}</p>
          </TranslatableText>
        </div>
      </div>


      <AudioPlayer text={item.question} label="HEAR THE QUESTION" variant="ghost" size="sm" voice={day.speakerVoice} />

      <VoiceRecorder label="ANSWER" maxSeconds={30} onComplete={(rec) => { setMine(rec); onRecorded(rec); }} />
      {mine ? <RecordingPlayback url={mine.url} label="LISTEN TO ME" /> : null}

      <PrimaryButton onClick={onNext} disabled={!attempted}>
        {index < items.length - 1
          ? showEs
            ? "SIGUIENTE PREGUNTA"
            : "NEXT QUESTION"
          : showEs
            ? "SIGUIENTE REP"
            : "NEXT REP"}{" "}
        <ArrowRight className="size-5" />
      </PrimaryButton>

      {attempted ? null : (
        <>
          <HelperText text={showEs ? "Graba una vez para continuar." : "Record once to continue."} />
          <SkipLink label={showEs ? "saltar esta pregunta" : "skip this prompt"} onClick={onSkip} />
        </>
      )}

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
      <div className="space-y-3 rounded-3xl border border-primary/25 bg-accent p-5">
        <TranslatableText es="Responde la pregunta:" align="center" supportOnly>
          <p className="text-center text-[11px] font-bold uppercase tracking-[0.16em] text-accent-foreground">
            Answer the question
          </p>
        </TranslatableText>
        <TranslatableText es={day.rep5Prompt.questionEs}>
          <p className="text-[19px] font-extrabold leading-snug">{day.rep5Prompt.question}</p>
        </TranslatableText>
      </div>

      <GoalChips day={day} />

      <CueRow cues={day.cues} />

      <SceneImage day={day} />
      <StoryStrip day={day} showCaptions={false} />
      <VariantPicker day={day} />

      <CollapsibleHelp label="Need help?" labelEs="¿Necesitas ayuda?">
        {day.rep5Tips ? (
          <TranslatableText es={day.rep5Tips.es} supportOnly>
            <p className="text-[14px] leading-relaxed text-foreground">{day.rep5Tips.en}</p>
          </TranslatableText>
        ) : (
          <TranslatableText es="Usa conectores como after, later y then. Si puedes, agrega un because." supportOnly>
            <p className="text-[14px] leading-relaxed text-foreground">
              Use connectors like <strong>after</strong>, <strong>later</strong> and <strong>then</strong>. If you can, add a <strong>because</strong>.
            </p>
          </TranslatableText>
        )}
        {day.modelExample ? (
          <>
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
          </>
        ) : null}
      </CollapsibleHelp>


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
        <TranslatableText supportOnly es={`Faltan ${REQUIRED_TAKES - completed} tomas obligatorias.`} align="center">
          <p className="text-center text-[12px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            {REQUIRED_TAKES - completed} required take{REQUIRED_TAKES - completed === 1 ? "" : "s"} left
          </p>
        </TranslatableText>
      )}
    </div>
  );
}
