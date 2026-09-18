import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronUp, Library, Loader2, Pause, Play, RotateCcw, Sparkles, Star, Volume2, X } from "lucide-react";
import { AudioPlayer } from "@/components/fluency/AudioPlayer";
import { SlowWordPanel } from "@/components/fluency/SlowWordPanel";
import { RecordingPlayback } from "@/components/fluency/RecordingPlayback";
import { VoiceRecorder } from "@/components/fluency/VoiceRecorder";
import { playGoodFeedbackSound } from "@/lib/feedback-sounds";
import { useAppLang } from "@/lib/i18n";
import { tokenizeWordsForDisplay } from "@/lib/syllables";
import { buildSayItHint, buildSayItStartHint } from "@/lib/story-say-match";
import { isStoryAdvanceLocked } from "@/lib/storybook-advance";
import { AudioService } from "@/services/audio-service";
import { supabase } from "@/integrations/supabase/client";
import { getSeason, getNextProducedEpisodeId, getProducedEpisodeIds } from "@/services/storybook";
import { speakerGain, speakerVoice, speakerTone, speakerName } from "@/services/storybook/voices";
import { speakDialogue, startDialogue, type DialogueController } from "@/services/storybook/dialogue-audio";
import { markEpisodeSeen, getSeenEpisodes } from "@/services/storybook/storybook-progress";
import { STORYBOOK_SEASONS } from "@/services/storybook/seasons";
import { recordStoryEpisodeView, backfillStoryProgress } from "@/lib/story-analytics.functions";
import { parseEpisodeNumber } from "@/lib/story-analytics";
import { readCatchUpPlan, recordCatchUpEpisode, type CatchUpPlan } from "@/services/storybook/catch-up";
import { buildEpisodeGlossary, lookupWord } from "@/services/storybook/glossary";
import { shuffleQuizOptions } from "@/services/storybook/shuffle-options";
import type { StorybookEpisode, StorybookQuiz, StorybookScene, StorybookSpeaker } from "@/services/storybook/types";
import type { ModuleId, Recording } from "@/lib/types";
import { cn } from "@/lib/utils";
import { getFreshSession } from "@/lib/session-keeper";

type Slide =
  | { kind: "cover" }
  | { kind: "scene"; scene: StorybookScene }
  | { kind: "mindset" }
  | { kind: "habit" }
  | { kind: "quiz"; quiz: StorybookQuiz }
  | { kind: "natives" }
  | { kind: "finale" };

function buildSlides(episode: StorybookEpisode): Slide[] {
  const slides: Slide[] = [{ kind: "cover" }];
  for (const scene of episode.scenes) {
    slides.push({ kind: "scene", scene });
    if (episode.mindsetCard?.afterScene === scene.id) {
      slides.push({ kind: "mindset" });
    }
    if (episode.habitCard?.afterScene === scene.id) {
      slides.push({ kind: "habit" });
    }
    for (const quiz of episode.quizzes.filter((q) => q.afterScene === scene.id)) {
      slides.push({ kind: "quiz", quiz });
    }
  }
  if (episode.expressions?.length) slides.push({ kind: "natives" });
  slides.push({ kind: "finale" });
  return slides;
}

/** Keyframes local to the storybook (ken-burns, sparkle, shake). */
const STORYBOOK_CSS = `
@keyframes sb-kenburns-a { from { transform: scale(1) translate(0,0); } to { transform: scale(1.12) translate(-2%,-2%); } }
@keyframes sb-kenburns-b { from { transform: scale(1.12) translate(2%,1%); } to { transform: scale(1) translate(0,0); } }
@keyframes sb-sparkle { 0%,100% { opacity: .15; transform: translateY(0) scale(.8); } 50% { opacity: .9; transform: translateY(-8px) scale(1.15); } }
@keyframes sb-shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
@keyframes sb-pop { 0% { transform: scale(.4); opacity: 0; } 70% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }
@keyframes sb-slide-in { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
`;

export function StorybookPlayer({
  episode,
  onCoverBack,
}: {
  episode: StorybookEpisode;
  /** Where the cover's back button exits to (day hub when opened from Home). */
  onCoverBack?: (() => void) | undefined;
}) {
  const es = useAppLang().lang === "es";
  const navigate = useNavigate();
  const recordEpisodeView = useServerFn(recordStoryEpisodeView);
  const backfillProgress = useServerFn(backfillStoryProgress);
  const slides = useMemo(() => buildSlides(episode), [episode]);
  const coverBack = onCoverBack ?? (() => navigate({ to: "/natural-method/audiobooks" }));
  const nextEpisodeId = useMemo(() => getNextProducedEpisodeId(episode.id), [episode.id]);
  // Only offer catch-up when published episodes exist before this one.
  const hasEarlierEpisodes = useMemo(
    () => getProducedEpisodeIds().indexOf(episode.id) > 0,
    [episode.id],
  );
  const [catchUpPlan, setCatchUpPlan] = useState<CatchUpPlan | null>(null);
  const episodeGlossary = useMemo(() => buildEpisodeGlossary(episode), [episode]);
  // Leaving the episode keeps the scene the learner was on.
  const posKey = `sb-pos-${episode.id}`;
  // Start at 0 during SSR and first client render so hydration matches;
  // restore the saved position right after mount.
  const [idx, setIdx] = useState(0);
  const posRestoredRef = useRef(false);
  useEffect(() => {
    if (posRestoredRef.current) return;
    posRestoredRef.current = true;
    const saved = Number(window.localStorage.getItem(posKey) ?? "0");
    if (Number.isFinite(saved) && saved > 0) {
      setIdx(Math.min(saved, buildSlides(episode).length - 1));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [posKey, episode]);
  useEffect(() => {
    if (typeof window === "undefined" || !posRestoredRef.current) return;
    try {
      window.localStorage.setItem(posKey, String(idx));
    } catch {
      /* storage full or blocked — position is a convenience only */
    }
  }, [idx, posKey]);
  const [stars, setStars] = useState(0);
  const [notebook, setNotebook] = useState<Record<string, string>>({});
  const [saidIt, setSaidIt] = useState<Record<string, boolean>>({});
  const [quizDone, setQuizDone] = useState<Record<string, boolean>>({});
  const [showExit, setShowExit] = useState(false);
  /** Listening speed chosen by the learner; resets to normal on every new slide. */
  const [sceneRate, setSceneRate] = useState(1);
  const sceneRateRef = useRef(1);
  const setRate = (rate: number) => {
    sceneRateRef.current = rate;
    setSceneRate(rate);
  };
  

  /** Module day this episode matches — used for the "record your audios" shortcut. */
  const practiceDay = useMemo(
    () => getSeason(episode.moduleId)?.slots.find((s) => s.episodeId === episode.id)?.day ?? null,
    [episode.id, episode.moduleId],
  );

  const slide = slides[idx]!;
  const total = slides.length;
  const advanceLocked = isStoryAdvanceLocked({
    kind: slide.kind,
    ...(slide.kind === "quiz" ? { quizId: slide.quiz.id } : {}),
    quizDone,
    saidIt,
  });

  // Reaching the finale counts as completing the story (local, optional step).
  useEffect(() => {
    if (slide.kind === "finale") {
      markEpisodeSeen(episode.id);
      recordCatchUpEpisode(episode.id);
      setCatchUpPlan(readCatchUpPlan());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slide.kind, episode.id]);

  /** Season/episode numbers for reading analytics (never blocks the reader). */
  const seasonNumber = useMemo(
    () => STORYBOOK_SEASONS.findIndex((s) => s.moduleId === episode.moduleId) + 1,
    [episode.moduleId],
  );
  const episodeNumber = useMemo(() => parseEpisodeNumber(episode.id) ?? 0, [episode.id]);

  // One-time upload of episodes already finished on this device.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const KEY = "storybook.synced.v1";
    if (window.localStorage.getItem(KEY)) return;
    const seen = getSeenEpisodes();
    if (!seen.length) return;
    void (async () => {
      try {
        const { data } = await getFreshSession();
        if (!data?.session) return; // signed-out: retry on a later visit
        window.localStorage.setItem(KEY, "1");
        await backfillProgress({ data: { episodeIds: seen } });
      } catch {
        window.localStorage.removeItem(KEY);
      }
    })();
  }, [backfillProgress]);

  // Record opening the episode and the furthest slide reached (debounced).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = window.setTimeout(() => {
      void (async () => {
        try {
          // Analytics is signed-in only; skip silently for signed-out readers.
          const { data } = await getFreshSession();
          if (!data?.session) return;
          await recordEpisodeView({
            data: {
              episodeId: episode.id,
              season: seasonNumber,
              episodeNumber,
              sceneIndex: idx,
              completed: slide.kind === "finale",
            },
          });
        } catch {
          /* analytics only — never interrupt the story */
        }
      })();
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [episode.id, seasonNumber, episodeNumber, idx, slide.kind, recordEpisodeView]);

  const go = (next: number) => {
    setIdx(Math.min(total - 1, Math.max(0, next)));
  };

  // Auto-play the slide's audio when it becomes visible.
  useEffect(() => {
    AudioService.stop();
    let alive = true;
    // Each new slide starts at normal speed; a slow rate only applies where it was chosen.
    sceneRateRef.current = 1;
    setSceneRate(1);
    if (slide.kind === "scene") {
      const lines = slide.scene.lines;
      // Dialogue scenes own their playback (play/pause bar, resume after a word card).
      if (lines?.length) {
        return () => {
          alive = false;
        };
      }
      AudioService.speak(slide.scene.text, {
        rate: 1,
        voice: speakerVoice(slide.scene.speaker),
        tone: speakerTone(slide.scene.speaker),
        gain: speakerGain(slide.scene.speaker),
        allowBrowserFallback: false,
      });
    }
    if (slide.kind === "quiz") {
      // Guaranteed listening: the question always plays on its own, even if the
      // learner arrives fast. A short delay lets the previous audio fully stop.
      const timer = setTimeout(() => {
        if (alive) AudioService.speak(slide.quiz.questionEn, { voice: episode.voice, tone: speakerTone("vale"), allowBrowserFallback: false });
      }, 120);
      return () => {
        alive = false;
        clearTimeout(timer);
        AudioService.stop();
      };
    }
    if (slide.kind === "mindset" && episode.mindsetCard) AudioService.speak(episode.mindsetCard.phrase, { voice: episode.voice, tone: speakerTone("vale"), allowBrowserFallback: false });
    if (slide.kind === "habit" && episode.habitCard)
      AudioService.speak(episode.habitCard.phrase, {
        voice: speakerVoice(episode.habitCard.model),
        tone: speakerTone(episode.habitCard.model),
        allowBrowserFallback: false,
      });
    return () => {
      alive = false;
      AudioService.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  // While the learner reads, quietly download the next slide's audio.
  useEffect(() => {
    const next = slides[idx + 1];
    if (!next) return;
    if (next.kind === "scene") {
      const lines = next.scene.lines;
      if (lines?.length) {
        for (const line of lines) void AudioService.prefetch(line.text, speakerVoice(line.speaker), speakerTone(line.speaker));
        return;
      }
      void AudioService.prefetch(next.scene.text, speakerVoice(next.scene.speaker), speakerTone(next.scene.speaker));
      return;
    }
    if (next.kind === "quiz") void AudioService.prefetch(next.quiz.questionEn, episode.voice, speakerTone("vale"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const learnWord = (word: string, meaning: string) => {
    setNotebook((prev) => (prev[word] ? prev : { ...prev, [word]: meaning }));
  };

  /** Dialogue scenes get a dedicated full-screen reading view. */
  const immersive = slide.kind === "scene" && Boolean(slide.scene.lines?.length);

  return (
    <div className={cn("select-none", immersive && "fixed inset-0 z-40 flex flex-col bg-background")}>
      <style>{STORYBOOK_CSS}</style>

      {/* Progress bar */}
      <div
        className={cn(
          "flex items-center gap-3",
          immersive && "shrink-0 px-3 pb-2 pt-[max(0.5rem,env(safe-area-inset-top))]",
        )}
      >
        <button
          type="button"
          aria-label={es ? "Atrás (escena anterior)" : "Back (previous scene)"}
          onClick={() => {
            if (idx > 0) go(idx - 1);
            else coverBack();
          }}
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-2xl border border-border"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-300"
            style={{ width: `${((idx + 1) / total) * 100}%` }}
          />
        </div>
        <span className="flex shrink-0 items-center gap-1 text-[13px] font-extrabold text-amber-500">
          <Star className="size-4 fill-amber-500" /> {stars}
        </span>
        <button
          type="button"
          onClick={() => {
            AudioService.stop();
            setShowExit(true);
          }}
          className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-2xl border border-border px-3 text-[13px] font-extrabold uppercase tracking-[0.06em] text-muted-foreground"
        >
          {es ? "Salir" : "Exit"}
        </button>
      </div>

      {showExit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-lg">
            <h3 className="text-lg font-semibold">{es ? "¿Salir del cuento?" : "Exit story?"}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {es
                ? "Si sales ahora perderás el progreso de esta escena. ¿Quieres continuar?"
                : "If you leave now you will lose progress on this scene. Do you want to continue?"}
            </p>
            <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setShowExit(false)}
                className="inline-flex min-h-[40px] items-center justify-center rounded-xl border border-border px-4 text-sm font-semibold"
              >
                {es ? "No, seguir leyendo" : "No, keep reading"}
              </button>
              <button
                type="button"
                onClick={() => {
                  AudioService.stop();
                  coverBack();
                }}
                className="inline-flex min-h-[40px] items-center justify-center rounded-xl bg-primary px-4 text-sm font-bold text-primary-foreground"
              >
                {es ? "Sí, salir" : "Yes, exit"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className={cn("mt-3", immersive && "mt-0 flex min-h-0 flex-1 flex-col")}
      >
        <div
          key={idx}
          className={cn(immersive && "flex min-h-0 flex-1 flex-col")}
          style={immersive ? undefined : { animation: "sb-slide-in .35s ease-out" }}
        >
          {slide.kind === "cover" ? <CoverSlide episode={episode} es={es} onStart={() => go(1)} /> : null}
          {slide.kind === "scene" && immersive ? (
            <DialogueScene
              scene={slide.scene}
              episodeGlossary={episodeGlossary}
              voice={episode.voice}
              es={es}
              rate={sceneRate}
              onRateChange={setRate}
              onLearnWord={learnWord}
            />
          ) : null}
          {slide.kind === "scene" && !immersive ? (
            <SceneSlide
              scene={slide.scene}
              episodeGlossary={episodeGlossary}
              voice={episode.voice}
              es={es}
              flip={idx % 2 === 0}
              rate={sceneRate}
              onRateChange={setRate}
              onLearnWord={learnWord}
            />
          ) : null}
          {slide.kind === "mindset" && episode.mindsetCard ? (
            <MindsetSlide
              mindset={episode.mindsetCard}
              voice={episode.voice}
              es={es}
              onSaid={() => setStars((s) => s + 1)}
            />
          ) : null}
          {slide.kind === "habit" && episode.habitCard ? (
            <HabitSlide
              habit={episode.habitCard}
              es={es}
              onSaid={() => setStars((s) => s + 1)}
            />
          ) : null}
          {slide.kind === "natives" && episode.expressions?.length ? (
            <NativesSlide
              expressions={episode.expressions}
              es={es}
              onSaid={() => setStars((s) => s + 1)}
            />
          ) : null}
          {slide.kind === "quiz" ? (
            <QuizSlide
              quiz={slide.quiz}
              episodeId={episode.id}
              episodeGlossary={episodeGlossary}
              voice={episode.voice}
              es={es}
              done={Boolean(quizDone[slide.quiz.id])}
              said={Boolean(saidIt[slide.quiz.id])}
              onCorrect={() => {
                setQuizDone((p) => ({ ...p, [slide.kind === "quiz" ? slide.quiz.id : ""]: true }));
                setStars((s) => s + 1);
              }}
              onSaid={() => {
                setSaidIt((p) => ({ ...p, [slide.kind === "quiz" ? slide.quiz.id : ""]: true }));
                setStars((s) => s + 1);
              }}
              onSkip={() => {
                // Skip unlocks Next without a star or celebration sound.
                setSaidIt((p) => ({ ...p, [slide.kind === "quiz" ? slide.quiz.id : ""]: true }));
                go(idx + 1);
              }}
            />
          ) : null}
          {slide.kind === "finale" ? (
            <FinaleSlide
              episode={episode}
              es={es}
              stars={stars}
              notebook={notebook}
              practiceDay={practiceDay}
            />
          ) : null}
        </div>

        {/* Prev / next */}
        {slide.kind !== "cover" ? (
          <div
            className={cn(
              "mt-4 flex gap-2",
              immersive &&
                "mt-0 shrink-0 border-t border-border px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] pt-2",
            )}
          >
            <button
              type="button"
              onClick={() => go(idx - 1)}
              className="inline-flex min-h-[48px] items-center justify-center gap-1 rounded-2xl border border-border px-4 text-[13px] font-bold uppercase tracking-[0.1em] text-muted-foreground"
            >
              <ChevronLeft className="size-4" /> {es ? "Atrás" : "Back"}
            </button>
            {slide.kind !== "finale" ? (
              <button
                type="button"
                disabled={advanceLocked}
                onClick={() => go(idx + 1)}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[14px] font-bold uppercase tracking-[0.1em] text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none disabled:active:scale-100"
              >
                {es ? "Siguiente" : "Next"} <ArrowRight className="size-4" />
              </button>
            ) : nextEpisodeId ? (
              <button
                type="button"
                onClick={() =>
                  navigate({
                    to: "/natural-method/cuento/$storyId",
                    params: { storyId: nextEpisodeId },
                  })
                }
                className="inline-flex min-h-[48px] flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[13px] font-bold uppercase tracking-[0.1em] text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]"
              >
                {es ? "Siguiente episodio" : "Next episode"} <ArrowRight className="size-4" />
              </button>
            ) : null}
          </div>
        ) : null}
        {slide.kind === "finale" && hasEarlierEpisodes ? (
          <button
            type="button"
            onClick={() => navigate({ to: "/natural-method/audiobooks" })}
            className="mt-3 inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl border border-border px-4 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground"
          >
            <Library className="size-4" />
            {es ? "Ponerme al día con episodios anteriores" : "Catch up on earlier episodes"}
          </button>
        ) : null}
        {slide.kind === "finale" && catchUpPlan?.active && catchUpPlan.todayRemaining === 0 ? (
          <p className="mt-3 text-center text-[12px] font-semibold text-primary">
            {es
              ? "¡Meta de hoy cumplida! Puedes seguir si quieres."
              : "Today's goal is done! Keep going if you want."}
          </p>
        ) : null}
        {slide.kind === "quiz" && advanceLocked ? (
          <p className="mt-3 text-center text-[12px] font-semibold text-muted-foreground">
            {!quizDone[slide.quiz.id]
              ? es
                ? "Responde correctamente para continuar."
                : "Answer correctly to continue."
              : es
                ? "Graba tu respuesta para continuar."
                : "Record your answer to continue."}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/* ------------------------------- Slides ------------------------------- */

function CoverSlide({ episode, es, onStart }: { episode: StorybookEpisode; es: boolean; onStart: () => void }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={episode.cover}
          alt={es ? `Portada de ${episode.titleEs}` : `${episode.title} cover`}
          width={1024}
          height={1024}
          className="h-full w-full object-cover"
          style={{ animation: "sb-kenburns-a 14s ease-in-out infinite alternate" }}
        />
        <span className="absolute right-3 top-3" style={{ animation: "sb-sparkle 2.4s ease-in-out infinite" }}>
          <Sparkles className="size-6 text-amber-300" />
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-14">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">
            {es ? episode.episodeLabel.es : episode.episodeLabel.en}
          </p>
          <h1 className="text-2xl font-extrabold text-white">{es ? episode.titleEs : episode.title}</h1>
        </div>
      </div>
      <div className="space-y-3 p-4">
        {episode.previously && episode.previously.length > 0 ? (
          <div className="rounded-2xl border border-border bg-muted/40 p-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted-foreground">
              {es ? "Anteriormente…" : "Previously…"}
            </p>
            <ul className="mt-1.5 space-y-1">
              {episode.previously.map((line) => (
                <li key={line.en} className="text-[13px] leading-snug text-foreground">
                  • {es ? line.es : line.en}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <p className="text-[14px] text-muted-foreground">{es ? episode.blurb.es : episode.blurb.en}</p>
        <button
          type="button"
          onClick={onStart}
          className="inline-flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[16px] font-extrabold uppercase tracking-[0.1em] text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]"
        >
          <Play className="size-5 fill-current" /> {es ? "Empezar" : "Start"}
        </button>
        <p className="text-center text-[12px] text-muted-foreground">
          {es ? "Toca para pasar la página · toca cualquier palabra para ver su significado" : "Tap to turn the page · tap any word to see its meaning"}
        </p>
        <p className="text-center text-[12px] font-bold text-muted-foreground">
          {es
            ? "Copia el vocabulario que no te sepas en tu cuaderno con la estructura frase-palabras de E4CC y luego practica repetir en voz alta imitando al audio hasta que te salga similar."
            : "Copy the vocabulary you don’t know into your notebook using the E4CC sentence-words structure, then practice repeating out loud imitating the audio until it sounds similar."}
        </p>
      </div>
    </div>
  );
}

/** Every English word is tappable: curated words are highlighted, the rest are subtle. */
function TappableText({
  text,
  scene,
  episodeGlossary,
  voice,
  es,
  className,
  onLearnWord,
  onOpenWord,
  onCloseWord,
}: {
  text: string;
  scene?: StorybookScene;
  episodeGlossary: Map<string, string>;
  voice: "female" | "male" | "girl" | undefined;
  es: boolean;
  className?: string;
  onLearnWord?: (word: string, meaning: string) => void;
  /** Dialogue scenes pause the conversation while a word card is open. */
  onOpenWord?: () => void;
  onCloseWord?: () => void;
}) {
  const [open, setOpen] = useState<string | null>(null);
  const expressionPhrases = useMemo(
    () => [...episodeGlossary.keys()].filter((entry) => entry.includes(" ")),
    [episodeGlossary],
  );
  const tokens = tokenizeWordsForDisplay(text, expressionPhrases);
  const result = open ? lookupWord(open, { scene, episodeGlossary }) : null;
  const close = () => {
    setOpen(null);
    onCloseWord?.();
  };

  return (
    <div className="space-y-3">
      <p className={className}>
        {tokens.map((token, i) => {
          if (!token.isWord) {
            return (
              <span key={`sep-${i}`} style={{ whiteSpace: "pre-wrap" }}>
                {token.value}
              </span>
            );
          }
          const info = lookupWord(token.value, { scene, episodeGlossary });
          return (
            <span key={`w-${i}`} className="whitespace-nowrap">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (open === token.value) {
                    close();
                    AudioService.stop();
                    return;
                  }
                  if (info.curated && info.meaning) onLearnWord?.(token.value, info.meaning);
                  setOpen(token.value);
                  onOpenWord?.();
                  AudioService.stop();
                  AudioService.speak(token.value, { rate: 0.75, voice });
                }}
                aria-label={es ? `Significado de ${token.value}` : `Meaning of ${token.value}`}
                className={cn(
                  "rounded-md px-0.5 underline decoration-2 underline-offset-4 transition-colors",
                  info.curated ? "decoration-primary/60" : "decoration-border/70 decoration-dotted",
                  open === token.value ? "bg-primary/15 text-primary" : "hover:bg-primary/10",
                )}
              >
                {token.value}
              </button>
              {token.suffix}
            </span>
          );
        })}
      </p>

      {open ? (
        <div
          className="rounded-2xl border border-primary/30 bg-primary/5 p-3"
          style={{ animation: "sb-pop .25s ease-out" }}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[18px] font-extrabold text-foreground">{open}</p>
              {result?.meaning ? (
                <p className="text-[14px] font-semibold text-primary">{result.meaning}</p>
              ) : (
                <p className="text-[13px] font-semibold text-muted-foreground">
                  {es ? "Escúchala despacio para practicarla." : "Listen to it slowly to practice it."}
                </p>
              )}
              {result?.curated ? (
                <p className="mt-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  {es ? "Guardada en tu cuaderno ⭐" : "Saved to your notebook ⭐"}
                </p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={close}
              aria-label={es ? "Cerrar" : "Close"}
              className="rounded-full p-1 text-muted-foreground hover:bg-card"
            >
              <X className="size-4" />
            </button>
          </div>
          <SlowWordPanel word={open} voice={voice} compact onClose={close} />
        </div>
      ) : null}
    </div>
  );
}

/**
 * Immersive dialogue scene (sitcom seasons): the illustration stays pinned at the
 * top, only the conversation scrolls, and every audio control lives in one fixed
 * bar so "Next" is never covered.
 */
function DialogueScene({
  scene,
  episodeGlossary,
  voice,
  es,
  rate,
  onRateChange,
  onLearnWord,
}: {
  scene: StorybookScene;
  episodeGlossary: Map<string, string>;
  voice: "female" | "male" | "girl" | undefined;
  es: boolean;
  rate: number;
  onRateChange: (rate: number) => void;
  onLearnWord: (word: string, meaning: string) => void;
}) {
  const lines = useMemo(() => scene.lines ?? [], [scene]);
  const [activeLine, setActiveLine] = useState<number>(0);
  const [playing, setPlaying] = useState(false);
  const [follow, setFollow] = useState(true);
  const [showEs, setShowEs] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [zoom, setZoom] = useState(false);
  const controller = useRef<DialogueController | null>(null);
  const activeRef = useRef(0);
  const lineEls = useRef<Array<HTMLDivElement | null>>([]);

  const play = (from?: number, speed?: number) => {
    controller.current?.cancel();
    // Past the last line means "the learner finished": start the scene over.
    const startAt = Math.min(from ?? activeRef.current, Math.max(0, lines.length - 1));
    activeRef.current = startAt;
    setActiveLine(startAt);
    setFollow(true);
    setPlaying(true);
    controller.current = startDialogue(lines, {
      rate: speed ?? rate,
      startAt,
      onLine: (i) => {
        if (i === null) return;
        activeRef.current = i;
        setActiveLine(i);
      },
      onDone: () => setPlaying(false),
    });
  };

  const stop = () => {
    controller.current?.cancel();
    controller.current = null;
    AudioService.stop();
    setPlaying(false);
  };

  /** Tap a line to hear just that line; "Escena" then continues from the next one. */
  const playSingle = (i: number, speed?: number) => {
    const line = lines[i];
    if (!line) return;
    controller.current?.cancel();
    activeRef.current = i;
    setActiveLine(i);
    setFollow(true);
    setPlaying(true);
    controller.current = startDialogue([line], {
      rate: speed ?? rate,
      startAt: 0,
      onLine: (idx) => {
        if (idx === null) return;
        activeRef.current = i;
        setActiveLine(i);
      },
      onDone: () => {
        activeRef.current = i + 1;
        setPlaying(false);
      },
    });
  };

  // Auto-start the conversation whenever the scene appears.
  useEffect(() => {
    activeRef.current = 0;
    setActiveLine(0);
    play(0, 1);
    return () => {
      controller.current?.cancel();
      controller.current = null;
      AudioService.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene.id]);

  // The text follows the audio until the learner scrolls back to re-read.
  useEffect(() => {
    if (!follow) return;
    lineEls.current[activeLine]?.scrollIntoView({ block: "center", behavior: "smooth" });
  }, [activeLine, follow]);

  const imageHeight = collapsed ? 0 : "clamp(104px, 30dvh, 260px)";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* Pinned illustration — about a third of the screen, tap to enlarge. */}
      <div className="shrink-0 px-3">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-card" style={{ height: imageHeight }}>
          {!collapsed ? (
            <button
              type="button"
              onClick={() => setZoom(true)}
              aria-label={es ? "Ampliar la imagen" : "Enlarge the image"}
              className="block h-full w-full"
            >
              <img
                src={scene.image}
                alt={scene.imageAlt}
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[50%_28%]"
              />
            </button>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setCollapsed((v) => !v)}
          aria-label={es ? (collapsed ? "Mostrar la imagen" : "Ocultar la imagen") : collapsed ? "Show image" : "Hide image"}
          className="mx-auto mt-1 flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground"
        >
          {collapsed ? <ChevronDown className="size-3.5" /> : <ChevronUp className="size-3.5" />}
          {collapsed ? (es ? "Ver imagen" : "Show image") : es ? "Más espacio para leer" : "More reading space"}
        </button>
      </div>

      {/* Conversation */}
      <div
        className="min-h-0 flex-1 space-y-1.5 overflow-y-auto px-3 pb-2"
        onWheel={() => setFollow(false)}
        onTouchMove={() => setFollow(false)}
      >
        {lines.map((line, i) => (
          <div
            key={`${scene.id}-l${i}`}
            ref={(el) => {
              lineEls.current[i] = el;
            }}
            role="button"
            tabIndex={0}
            aria-label={es ? `Repetir la frase de ${speakerName(line.speaker)}` : `Replay ${speakerName(line.speaker)}'s line`}
            onClick={() => playSingle(i)}
            onKeyDown={(e) => {
              if (e.target === e.currentTarget && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                playSingle(i);
              }
            }}
            className={cn(
              "cursor-pointer rounded-2xl border px-3 py-2 transition-colors",
              activeLine === i && playing ? "border-primary bg-primary/10" : "border-transparent bg-muted/40",
            )}
          >
            <div className="mb-0.5 flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
                {speakerName(line.speaker)}
              </span>
              {activeLine === i && playing ? (
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                  · {es ? "Hablando" : "Speaking"}
                </span>
              ) : null}
              <button
                type="button"
                aria-label={es ? `Escuchar a ${speakerName(line.speaker)}` : `Listen to ${speakerName(line.speaker)}`}
                onClick={(e) => {
                  e.stopPropagation();
                  playSingle(i);
                }}
                className="inline-flex size-6 items-center justify-center rounded-full border border-border text-muted-foreground"
              >
                <Volume2 className="size-3" />
              </button>
            </div>
            <TappableText
              text={line.text}
              scene={scene}
              episodeGlossary={episodeGlossary}
              voice={voice}
              es={es}
              onLearnWord={onLearnWord}
              onOpenWord={stop}
              onCloseWord={() => play(i)}
              className="text-[17px] font-normal leading-relaxed text-foreground"
            />
            {showEs ? <p className="mt-1 text-[13px] text-muted-foreground">{line.es}</p> : null}
          </div>
        ))}
      </div>

      {!follow ? (
        <button
          type="button"
          onClick={() => setFollow(true)}
          className="mx-auto mb-1 shrink-0 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[12px] font-bold text-primary"
        >
          {es ? "Seguir audio" : "Follow audio"}
        </button>
      ) : null}

      {/* Fixed audio bar */}
      <div className="shrink-0 border-t border-border bg-background px-3 py-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => (playing ? stop() : play())}
            aria-label={playing ? (es ? "Pausar escena" : "Pause scene") : es ? "Reproducir escena" : "Play scene"}
            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-2xl bg-primary px-3 text-[13px] font-bold uppercase tracking-[0.08em] text-primary-foreground"
          >
            {playing ? <Pause className="size-4 fill-current" /> : <Play className="size-4 fill-current" />}
            {playing ? (es ? "Pausa" : "Pause") : es ? "Escena" : "Scene"}
          </button>
          <button
            type="button"
            onClick={() => play(0)}
            aria-label={es ? "Repetir la escena completa" : "Replay the full scene"}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-2xl border border-border text-muted-foreground"
          >
            <RotateCcw className="size-4" />
          </button>
          {[0.75, 1].map((speed) => (
            <button
              key={speed}
              type="button"
              onClick={() => {
                onRateChange(speed);
                play(activeRef.current, speed);
              }}
              className={cn(
                "inline-flex h-11 shrink-0 items-center justify-center rounded-2xl border px-2.5 text-[12px] font-bold tabular-nums",
                rate === speed ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground",
              )}
            >
              {speed}x
            </button>
          ))}
          <button
            type="button"
            onClick={() => setShowEs((v) => !v)}
            className={cn(
              "inline-flex h-11 shrink-0 items-center justify-center rounded-2xl border px-2.5 text-[11px] font-bold uppercase tracking-[0.06em]",
              showEs ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground",
            )}
          >
            {showEs ? "EN" : "ES"}
          </button>
        </div>
      </div>

      {zoom ? (
        <button
          type="button"
          onClick={() => setZoom(false)}
          aria-label={es ? "Cerrar imagen" : "Close image"}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-3"
        >
          <img src={scene.image} alt={scene.imageAlt} className="max-h-full w-full rounded-2xl object-contain" />
        </button>
      ) : null}
    </div>
  );
}



export function SceneSlide({
  scene,
  episodeGlossary,
  voice,
  es,
  flip,
  rate,
  onRateChange,
  onLearnWord,
}: {
  scene: StorybookScene;
  episodeGlossary: Map<string, string>;
  voice: "female" | "male" | "girl" | undefined;
  es: boolean;
  flip: boolean;
  rate: number;
  onRateChange: (rate: number) => void;
  onLearnWord: (word: string, meaning: string) => void;
}) {
  const [showEs, setShowEs] = useState(false);
  const [showSpeeds, setShowSpeeds] = useState(false);
  const [activeLine, setActiveLine] = useState<number | null>(null);
  const dialogue = scene.lines?.length ? scene.lines : null;

  const play = (speed: number) => {
    AudioService.stop();
    if (dialogue) {
      speakDialogue(dialogue, { rate: speed, onLine: setActiveLine });
      return;
    }
    AudioService.speak(scene.text, { rate: speed, voice: speakerVoice(scene.speaker), tone: speakerTone(scene.speaker), allowBrowserFallback: false });
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card">
      <div className="relative aspect-square overflow-hidden">
        <img
          src={scene.image}
          alt={scene.imageAlt}
          width={1024}
          height={1024}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={{ animation: `${flip ? "sb-kenburns-a" : "sb-kenburns-b"} 16s ease-in-out infinite alternate` }}
        />
        <span
          className="absolute left-3 top-3"
          style={{ animation: "sb-sparkle 2.8s ease-in-out infinite" }}
        >
          <Sparkles className="size-5 text-amber-300/90" />
        </span>
      </div>

      <div className="space-y-3 p-4">
        {dialogue ? (
          <div className="space-y-2.5">
            {dialogue.map((line, i) => (
              <div
                key={`${scene.id}-l${i}`}
                className={cn(
                  "rounded-2xl border p-3 transition-colors",
                  activeLine === i ? "border-primary bg-primary/10" : "border-border bg-background",
                )}
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-primary">
                    {speakerName(line.speaker)}
                  </span>
                  <button
                    type="button"
                    aria-label={es ? `Escuchar a ${speakerName(line.speaker)}` : `Listen to ${speakerName(line.speaker)}`}
                    onClick={() => {
                      AudioService.stop();
                      setActiveLine(i);
                      AudioService.speak(line.text, {
                        rate,
                        voice: speakerVoice(line.speaker),
                        tone: speakerTone(line.speaker),
                        allowBrowserFallback: false,
                        onEnd: () => setActiveLine(null),
                      });
                    }}
                    className="inline-flex size-7 items-center justify-center rounded-full border border-border text-muted-foreground"
                  >
                    <Volume2 className="size-3.5" />
                  </button>
                </div>
                <TappableText
                  text={line.text}
                  scene={scene}
                  episodeGlossary={episodeGlossary}
                  voice={voice}
                  es={es}
                  onLearnWord={onLearnWord}
                  className="text-[18px] font-extrabold leading-snug tracking-tight text-foreground"
                />
                {showEs ? (
                  <p className="mt-1 text-[13px] font-semibold text-muted-foreground">{line.es}</p>
                ) : null}
              </div>
            ))}
          </div>
        ) : (
          <TappableText
            text={scene.text}
            scene={scene}
            episodeGlossary={episodeGlossary}
            voice={voice}
            es={es}
            onLearnWord={onLearnWord}
            className="text-[21px] font-extrabold leading-snug tracking-tight text-foreground"
          />
        )}


        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => play(rate)}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-border px-3 text-[12px] font-bold uppercase tracking-[0.1em] text-foreground"
          >
            <Volume2 className="size-4" /> {es ? "Escuchar" : "Listen"}
          </button>
          <button
            type="button"
            onClick={() => {
              onRateChange(1);
              play(1);
              setShowSpeeds(true);
            }}
            aria-label={es ? "Repetir en velocidad normal" : "Repeat at normal speed"}
            aria-expanded={showSpeeds}
            className={cn(
              "inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground",
              showSpeeds && "border-primary text-primary",
            )}
          >
            <RotateCcw className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => setShowEs((v) => !v)}
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-xl border border-border px-3 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground"
          >
            {showEs ? "English" : "Español"}
          </button>
        </div>

        {showSpeeds ? (
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
              {es ? "Velocidad" : "Speed"}
            </span>
            {[0.5, 0.75, 1].map((speed) => (
              <button
                key={speed}
                type="button"
                onClick={() => {
                  onRateChange(speed);
                  play(speed);
                }}
                className={cn(
                  "inline-flex min-h-[36px] items-center justify-center rounded-xl border px-3 text-[12px] font-bold tabular-nums",
                  rate === speed
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground",
                )}
              >
                {speed}x
              </button>
            ))}
          </div>
        ) : null}

        {showEs && !dialogue ? <p className="text-[14px] font-semibold text-muted-foreground">{scene.es}</p> : null}
      </div>
    </div>
  );
}

function QuizSlide({
  quiz,
  episodeId,
  episodeGlossary,
  voice,
  es,
  done,
  said,
  onCorrect,
  onSaid,
  onSkip,
}: {
  quiz: StorybookQuiz;
  episodeId: string;
  episodeGlossary: Map<string, string>;
  voice: "female" | "male" | "girl" | undefined;
  es: boolean;
  done: boolean;
  said: boolean;
  onCorrect: () => void;
  onSaid: () => void;
  onSkip: () => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [wrong, setWrong] = useState<number | null>(null);
  const [checkStatus, setCheckStatus] = useState<"idle" | "checking" | "good" | "tryAgain">("idle");
  const [attempts, setAttempts] = useState(0);
  const [lastTranscript, setLastTranscript] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const hasCheck = Boolean(quiz.sayItCheck);
  const shuffled = useMemo(() => shuffleQuizOptions(episodeId, quiz), [episodeId, quiz]);

  const pick = (i: number) => {
    setPicked(i);
    // Stop any question audio the moment an answer is selected — right or wrong.
    AudioService.stop();
    if (i === shuffled.answer) {
      if (!done) onCorrect();
      // Reset per-question speaking state when the question is answered.
      setCheckStatus("idle");
      setAttempts(0);
      setLastTranscript("");
      setErrorMsg("");
      AudioService.speak(quiz.sayItAskEn ?? quiz.sayIt, { voice });
    } else {
      setWrong(i);
      setTimeout(() => setWrong(null), 500);
    }
  };

  const handleRecording = async (recording: Recording) => {
    if (said) return;
    // If the episode has no server-side check, accept any recording as before.
    if (!hasCheck) {
      setCheckStatus("good");
      onSaid();
      playGoodFeedbackSound();
      return;
    }
    if (attempts >= 2) {
      onSaid();
      return;
    }
    setCheckStatus("checking");
    setErrorMsg("");
    try {
      const blob = recording.blob ?? (recording.url ? await fetch(recording.url).then((r) => r.blob()) : null);
      if (!blob) {
        setErrorMsg(es ? "No se encontró el audio." : "Audio not found.");
        setCheckStatus("tryAgain");
        setAttempts((a) => a + 1);
        return;
      }
      const form = new FormData();
      const ext = blob.type.includes("mp4") ? "m4a" : "webm";
      form.append("file", blob, `say-it.${ext}`);
      form.append("storyId", episodeId);
      form.append("quizId", quiz.id);
      const {
        data: { session },
      } = await getFreshSession();
      const headers: Record<string, string> = {};
      if (session?.access_token) headers["Authorization"] = `Bearer ${session.access_token}`;
      const res = await fetch("/api/story-say-check", { method: "POST", body: form, headers });
      const data = (await res.json().catch(() => ({ error: "network" }))) as {
        status?: string;
        transcript?: string;
        error?: string;
      };
      if (!res.ok) {
        setErrorMsg(data.error || (es ? "No pudimos revisar tu audio." : "We couldn't check your audio."));
        setCheckStatus("tryAgain");
        setAttempts((a) => a + 1);
        return;
      }
      if (data.status === "good") {
        setCheckStatus("good");
        onSaid();
        playGoodFeedbackSound();
      } else {
        setCheckStatus("tryAgain");
        setLastTranscript(data.transcript || "");
        setAttempts((a) => a + 1);
      }
    } catch {
      setErrorMsg(es ? "Error de conexión. Intenta de nuevo." : "Connection error. Try again.");
      setCheckStatus("tryAgain");
      setAttempts((a) => a + 1);
    }
  };

  const recorder = (
    <VoiceRecorder
      onStart={() => AudioService.stop()}
      label={es ? "DECIRLO" : "SAY IT"}
      stopLabel={es ? "PARAR" : "STOP"}
      maxSeconds={15}
      countdown
      size="md"
      onComplete={handleRecording}
    />
  );

  const successBlock = (
    <p className="flex flex-col items-center justify-center gap-1 text-[14px] font-extrabold text-primary" style={{ animation: "sb-pop .25s ease-out" }}>
      <span className="flex items-center gap-2">
        <Star className="size-4 fill-amber-500 text-amber-500" />
        {es ? "¡Great job, champion! +1 ⭐" : "Great job, champion! +1 ⭐"}
      </span>
    </p>
  );

  return (
    <div className="space-y-4 rounded-3xl border-2 border-primary/40 bg-card p-4">
      <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-primary">
        {es ? "Pregunta rápida" : "Quick question"}
      </p>
      <TappableText
        text={quiz.questionEn}
        episodeGlossary={episodeGlossary}
        voice={voice}
        es={es}
        className="text-[20px] font-extrabold leading-snug text-foreground"
      />
      <p className="text-[13px] font-semibold text-muted-foreground">{quiz.questionEs}</p>
      <AudioPlayer text={quiz.questionEn} label={es ? "ESCUCHAR" : "LISTEN"} size="sm" variant="ghost" voice={voice} />

      <div className="grid gap-2">
        {shuffled.options.map((option, i) => {
          const isRight = done && i === shuffled.answer;
          const isWrong = wrong === i;
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => pick(i)}
              style={isWrong ? { animation: "sb-shake .4s ease" } : undefined}
              className={cn(
                "flex min-h-[52px] items-center gap-3 rounded-2xl border-2 px-4 text-left text-[16px] font-bold transition-colors",
                isRight
                  ? "border-primary bg-primary/10 text-primary"
                  : isWrong
                    ? "border-destructive bg-destructive/10 text-destructive"
                    : "border-border bg-background text-foreground",
              )}
            >
              <span className="text-xl" aria-hidden="true">{option.emoji}</span>
              {option.label}
              {isRight ? <Check className="ml-auto size-5" /> : null}
            </button>
          );
        })}
      </div>

      {done ? (
        <div className="space-y-3 rounded-2xl bg-secondary/60 p-3" style={{ animation: "sb-pop .3s ease-out" }}>
          <p className="flex items-center gap-2 text-[14px] font-extrabold text-primary">
            <Star className="size-4 fill-amber-500 text-amber-500" />
            {quiz.sayItAskEn
              ? es
                ? "¡Correcto! Ahora contesta tú:"
                : "Correct! Now you answer:"
              : es
                ? "¡Correcto! Ahora dilo tú:"
                : "Correct! Now you say it:"}
          </p>
          <TappableText
            text={quiz.sayItAskEn ?? quiz.sayIt}
            episodeGlossary={episodeGlossary}
            voice={voice}
            es={es}
            className="text-[16px] font-extrabold text-foreground"
          />
          <p className="text-[12px] font-semibold text-muted-foreground">
            {quiz.sayItAskEn ? quiz.sayItAskEs : quiz.sayItEs}
          </p>
          {quiz.sayItAskEn ? (
            <>
              <AudioPlayer
                text={quiz.sayItAskEn}
                label={es ? "ESCUCHAR" : "LISTEN"}
                size="sm"
                variant="ghost"
                voice={voice}
              />
              {(() => {
                const { label, hint } = buildSayItStartHint(
                  quiz.sayItCheck?.target ?? "",
                  es,
                  quiz.sayItAskEn,
                );
                if (!hint) return null;
                return (
                  <p className="text-[12px] text-muted-foreground">
                    {label} <span className="font-semibold text-foreground">“{hint}”</span>
                  </p>
                );
              })()}
            </>
          ) : null}

          {said || checkStatus === "good" ? successBlock : null}

          {checkStatus === "checking" ? (
            <div className="flex items-center justify-center gap-2 py-2 text-[13px] font-bold text-primary">
              <Loader2 className="size-4 animate-spin" /> {es ? "Revisando tu audio…" : "Checking your audio…"}
            </div>
          ) : null}

          {!said && checkStatus !== "good" && attempts < 2 ? (
            <>
              {checkStatus === "tryAgain" ? (
                <div className="space-y-2 rounded-2xl border border-destructive/30 bg-destructive/10 p-3" style={{ animation: "sb-shake .4s ease" }}>
                  <p className="flex items-center gap-2 text-[14px] font-extrabold text-destructive">
                    <X className="size-4" />
                    {es ? "Inténtalo de nuevo" : "Try again"}
                  </p>
                  {lastTranscript ? (
                    <p className="text-[12px] text-muted-foreground">
                      {es ? "Escuchamos:" : "We heard:"} <span className="font-semibold text-foreground">“{lastTranscript}”</span>
                    </p>
                  ) : null}
                  {quiz.sayItCheck?.target ? (
                    <p className="text-[12px] font-semibold text-primary">
                      {(() => {
                        const { label, hint } = buildSayItHint(quiz.sayItCheck.target, es);
                        return (
                          <>
                            {label} <span className="font-bold text-foreground">“{hint}”</span>
                          </>
                        );
                      })()}
                    </p>
                  ) : null}
                  {errorMsg ? <p className="text-[12px] text-destructive">{errorMsg}</p> : null}
                  {recorder}
                </div>
              ) : (
                recorder
              )}
            </>
          ) : null}

          {!said && attempts < 2 ? (
            <button
              type="button"
              onClick={onSkip}
              className="mx-auto block text-[12px] font-semibold text-muted-foreground underline underline-offset-2"
            >
              {es ? "Saltar por ahora" : "Skip for now"}
            </button>
          ) : null}

          {hasCheck && !said && checkStatus !== "good" ? (
            <p className="text-[11px] leading-snug text-muted-foreground">
              {es
                ? "La IA comparará tu respuesta y puede cometer errores. Úsala como guía para mejorar."
                : "AI will compare your response and may make mistakes. Use the feedback as a guide to improve."}
            </p>
          ) : null}

          {!said && attempts >= 2 ? (
            <div className="space-y-2 rounded-2xl border border-border bg-muted/40 p-3">
              <p className="text-[13px] font-semibold text-muted-foreground">
                {es ? "No te preocupes, sigue practicando:" : "Don't worry, keep practicing:"}
              </p>
              <button
                type="button"
                onClick={onSaid}
                className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[14px] font-bold uppercase tracking-[0.08em] text-primary-foreground"
              >
                {es ? "Continuar" : "Continue"} <ArrowRight className="size-4" />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function MindsetSlide({
  mindset,
  voice,
  es,
  onSaid,
}: {
  mindset: NonNullable<StorybookEpisode["mindsetCard"]>;
  voice?: "female" | "male" | "girl" | undefined;
  es: boolean;
  onSaid: () => void;
}) {
  const [recorded, setRecorded] = useState(false);
  return (
    <div className="space-y-4 text-center">
      <div className="rounded-3xl border border-border bg-card p-5">
        <p className="text-4xl" aria-hidden="true">
          🔥
        </p>
        <p className="mt-2 text-[13px] font-extrabold uppercase tracking-[0.12em] text-primary">
          {es ? "Nunca te rindas" : "Never give up"}
        </p>
        <h2 className="mt-2 text-2xl font-extrabold leading-tight text-foreground">{mindset.phrase}</h2>
        <p className="mt-1 text-base font-medium text-muted-foreground">{mindset.es}</p>
      </div>

      <button
        type="button"
        onClick={() => AudioService.speak(mindset.phrase, { voice })}
        className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-foreground"
      >
        <Volume2 className="size-4 text-primary" /> {es ? "Escuchar" : "Listen"}
      </button>

      <div className="rounded-3xl border border-border bg-card p-5">
        <p className="mb-3 text-[14px] font-bold text-foreground">
          {es ? "Repítelo en voz alta:" : "Say it out loud:"}
        </p>
        {recorded ? (
          <p className="flex items-center justify-center gap-2 text-[13px] font-bold text-primary">
            <Check className="size-4" /> {es ? "¡Lo dijiste! +1 ⭐" : "You said it! +1 ⭐"}
          </p>
        ) : (
          <VoiceRecorder
            onStart={() => AudioService.stop()}
            label={es ? "REPETIR" : "REPEAT"}
            stopLabel={es ? "PARAR" : "STOP"}
            maxSeconds={15}
            countdown
            size="md"
            onComplete={() => {
              setRecorded(true);
              onSaid();
            }}
          />
        )}
      </div>
    </div>
  );
}

function HabitSlide({
  habit,
  es,
  onSaid,
}: {
  habit: NonNullable<StorybookEpisode["habitCard"]>;
  es: boolean;
  onSaid: () => void;
}) {
  const [recorded, setRecorded] = useState(false);
  const displayName =
    habit.model === "vale"
      ? "Vale"
      : habit.model === "mateo"
        ? "Mateo"
        : habit.model === "kat"
          ? "Kat"
          : habit.model === "dylan"
            ? "Dylan"
            : habit.model === "luis"
              ? "Luis"
              : habit.model === "camila"
                ? "Camila"
                : habit.model === "ana"
                  ? "Ana"
                  : habit.model === "beto"
                    ? "Beto"
                    : habit.model === "dani"
                      ? "Dani"
                      : habit.model === "mom"
                        ? es
                          ? "Mamá de Vale"
                          : "Vale's mom"
                        : habit.model === "boss"
                          ? "Mr. Reyes"
                          : habit.model === "tito"
                            ? "Tito"
                            : habit.model;

  return (
    <div className="space-y-4 text-center">
      <div className="rounded-3xl border border-border bg-card p-5">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary">
          {es ? "Hábito del día" : "Habit of the day"}
        </p>
        <p className="mt-2 text-[13px] font-semibold text-muted-foreground">{habit.modelActionEs}</p>
        <h2 className="mt-3 text-2xl font-extrabold leading-tight text-foreground">{habit.phrase}</h2>
        <p className="mt-1 text-base font-medium text-muted-foreground">{habit.es}</p>
        <p className="mt-3 text-[12px] font-bold uppercase tracking-[0.1em] text-muted-foreground">
          {es ? "Modelado por" : "Modeled by"}: {displayName}
        </p>
      </div>

      <button
        type="button"
        onClick={() =>
          AudioService.speak(habit.phrase, {
            voice: speakerVoice(habit.model),
            tone: speakerTone(habit.model),
            allowBrowserFallback: false,
          })
        }
        className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-bold text-foreground"
      >
        <Volume2 className="size-4 text-primary" /> {es ? "Escuchar" : "Listen"}
      </button>

      <div className="rounded-3xl border border-border bg-card p-5">
        <p className="mb-3 text-[14px] font-bold text-foreground">
          {es ? "Repítelo en voz alta:" : "Say it out loud:"}
        </p>
        {recorded ? (
          <p className="flex items-center justify-center gap-2 text-[13px] font-bold text-primary">
            <Check className="size-4" /> {es ? "¡Lo dijiste! +1 ⭐" : "You said it! +1 ⭐"}
          </p>
        ) : (
          <VoiceRecorder
            onStart={() => AudioService.stop()}
            label={es ? "REPETIR" : "REPEAT"}
            stopLabel={es ? "PARAR" : "STOP"}
            maxSeconds={15}
            countdown
            size="md"
            onComplete={() => {
              setRecorded(true);
              onSaid();
            }}
          />
        )}
      </div>
    </div>
  );
}

/** B2 layer: the phrasal verbs and idioms the characters used in this episode. */
function NativesSlide({
  expressions,
  es,
  onSaid,
}: {
  expressions: NonNullable<StorybookEpisode["expressions"]>;
  es: boolean;
  onSaid: () => void;
}) {
  const [recorded, setRecorded] = useState(false);

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border bg-card p-5 text-center">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary">
          {es ? "Dilo como nativo" : "Say it like a native"}
        </p>
        <p className="mt-2 text-[13px] font-semibold text-muted-foreground">
          {es
            ? "Tres expresiones que tus personajes usaron hoy. Escúchalas y quédatelas."
            : "Three expressions your characters used today. Listen and keep them."}
        </p>
      </div>

      <div className="space-y-3">
        {expressions.map((expression) => (
          <div key={expression.phrase} className="rounded-3xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-muted-foreground">
                  {expression.kind === "idiom" ? "Idiom" : "Phrasal verb"}
                </p>
                <h3 className="text-xl font-extrabold leading-tight text-foreground">{expression.phrase}</h3>
                <p className="text-sm font-semibold text-muted-foreground">{expression.es}</p>
              </div>
              <button
                type="button"
                onClick={() => AudioService.speak(expression.example, { voice: "female", tone: "story", allowBrowserFallback: false })}
                className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-3 py-2 text-xs font-bold text-foreground"
              >
                <Volume2 className="size-4 text-primary" /> {es ? "Oír" : "Listen"}
              </button>
            </div>
            <p className="mt-3 text-[14px] font-semibold text-foreground">“{expression.example}”</p>
            <p className="text-[13px] text-muted-foreground">{expression.exampleEs}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-border bg-card p-5 text-center">
        <p className="mb-3 text-[14px] font-bold text-foreground">
          {es
            ? "Usa UNA de las tres en tu propia oración, en voz alta:"
            : "Use ONE of the three in your own sentence, out loud:"}
        </p>
        {recorded ? (
          <p className="flex items-center justify-center gap-2 text-[13px] font-bold text-primary">
            <Check className="size-4" /> {es ? "¡Lo dijiste! +1 ⭐" : "You said it! +1 ⭐"}
          </p>
        ) : (
          <VoiceRecorder
            onStart={() => AudioService.stop()}
            label={es ? "HABLAR" : "SPEAK"}
            stopLabel={es ? "PARAR" : "STOP"}
            maxSeconds={20}
            countdown
            size="md"
            onComplete={() => {
              setRecorded(true);
              onSaid();
            }}
          />
        )}
      </div>
    </div>
  );
}

function FinaleSlide({
  episode,
  es,
  stars,
  notebook,
  practiceDay,
}: {
  episode: StorybookEpisode;
  es: boolean;
  stars: number;
  notebook: Record<string, string>;
  practiceDay: number | null;
}) {
  const [recorded, setRecorded] = useState(false);
  const [take, setTake] = useState<Recording | null>(null);
  const finaleMaxSeconds = Math.min(episode.finaleSeconds ?? 15, 30);
  const words = Object.entries(notebook);

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-border bg-card p-5 text-center">
        <p className="text-4xl" style={{ animation: "sb-pop .4s ease-out" }} aria-hidden="true">
          🎉
        </p>
        <h2 className="mt-1 text-xl font-extrabold text-foreground">
          {es ? `¡Terminaste ${episode.episodeLabel.es}!` : `You finished ${episode.episodeLabel.en}!`}
        </h2>
        <p className="mt-2 flex items-center justify-center gap-1.5 text-[15px] font-extrabold text-amber-500">
          <Star className="size-5 fill-amber-500" /> {stars} {es ? "estrellas" : "stars"}
        </p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-4">
        <h3 className="text-[13px] font-extrabold uppercase tracking-[0.12em] text-foreground">
          {es ? "Mi cuaderno de vocabulario" : "My vocabulary notebook"}
        </h3>
        {words.length === 0 ? (
          <p className="mt-2 text-[13px] text-muted-foreground">
            {es
              ? "No tocaste palabras esta vez. Vuelve y toca las palabras subrayadas para guardarlas aquí."
              : "You didn't tap any words. Go back and tap the underlined words to save them here."}
          </p>
        ) : (
          <ul className="mt-2 flex flex-wrap gap-2">
            {words.map(([word, meaning]) => (
              <li key={word}>
                <button
                  type="button"
                  onClick={() => {
                    AudioService.stop();
                    AudioService.speak(word, { rate: 0.75, voice: episode.voice });
                  }}
                  className="inline-flex min-h-[40px] items-center gap-1.5 rounded-full border border-border bg-secondary/60 px-3 text-[13px] font-bold text-foreground"
                >
                  <Volume2 className="size-3.5 text-primary" /> {word} <span className="font-semibold text-muted-foreground">· {meaning}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-3 rounded-3xl bg-navy p-4 text-navy-foreground">
        <h3 className="text-[13px] font-extrabold uppercase tracking-[0.12em]">
          {es ? "Ahora te toca a ti" : "Now it's your turn"}
        </h3>
        <p className="text-[14px] opacity-90">{es ? episode.continuePrompt.es : episode.continuePrompt.en}</p>
        <ul className="flex flex-wrap gap-2">
          {episode.continueWith.map((chunk) => (
            <li
              key={chunk}
              className="rounded-full border border-navy-foreground/30 px-3 py-1 text-[12px] font-bold tracking-wide"
            >
              {chunk}
            </li>
          ))}
        </ul>
        <p className="text-[12px] font-bold uppercase tracking-[0.1em] opacity-80">
          {es
            ? `Máximo ${finaleMaxSeconds} segundos`
            : `Max ${finaleMaxSeconds} seconds`}
        </p>
        <VoiceRecorder
          onStart={() => AudioService.stop()}
          label={take ? (es ? "GRABAR OTRA VEZ" : "RECORD AGAIN") : es ? "GRABAR MI RESPUESTA" : "RECORD MY ANSWER"}
          stopLabel={es ? "PARAR" : "STOP"}
          maxSeconds={finaleMaxSeconds}
          countdown
          onComplete={(rec) => {
            setTake(rec);
            setRecorded(true);
          }}
        />
        {take?.url ? (
          <div style={{ animation: "sb-pop .3s ease-out" }}>
            <RecordingPlayback url={take.url} label={es ? "ESCUCHARME" : "LISTEN TO ME"} />
          </div>
        ) : null}
        {recorded ? (
          <p className="flex items-center justify-center gap-2 text-[13px] font-bold">
            <Check className="size-4" /> {es ? "¡Excelente! Sonaste como Vale." : "Great job! You sounded like Vale."}
          </p>
        ) : null}
      </div>

      {practiceDay !== null ? (
        <Link
          to="/practice"
          search={{ day: practiceDay, module: episode.moduleId as ModuleId }}
          className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-[15px] font-extrabold uppercase tracking-[0.1em] text-primary-foreground shadow-[var(--shadow-lift)] transition-transform active:scale-[0.98]"
        >
          {es ? "AHORA GRABA TUS AUDIOS" : "NOW RECORD YOUR AUDIOS"} <ArrowRight className="size-5" />
        </Link>
      ) : null}

      <p className="rounded-2xl border border-dashed border-primary/50 bg-primary/5 p-3 text-center text-[13px] font-bold text-primary">
        {es ? episode.cliffhanger.es : episode.cliffhanger.en}{" "}
        {es ? "Lo ves en el siguiente día." : "See you the next day."}
      </p>
    </div>
  );
}
