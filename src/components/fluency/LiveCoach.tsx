import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Clock3, Gauge, Languages, Lightbulb, Loader2, Mic, MicOff, PhoneOff, RotateCcw, X } from "lucide-react";
import { useAppLang } from "@/lib/i18n";
import { getFreshSession } from "@/lib/session-keeper";
import { CoachAvatar, type CoachState } from "@/components/fluency/CoachAvatar";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Conversation, ConversationContent, ConversationScrollButton } from "@/components/ai-elements/conversation";
import { Message, MessageContent } from "@/components/ai-elements/message";
import { CourseService } from "@/services/course-service";
import { loadPreferences } from "@/services/preferences";
import { cn } from "@/lib/utils";

/**
 * Live speaking practice with the AI coach.
 *
 * The browser records microphone audio as raw PCM (resampled to 16 kHz from the
 * device rate, because iOS Safari ignores a requested sample rate), streams it
 * to the live model, and plays the spoken answer back. No conversation is
 * stored: only the number of seconds used is reported when the session ends.
 */

type Phase = "idle" | "connecting" | "live" | "ending" | "done";
type HelpKind = "spanish" | "slow" | "idea";

type StartResponse = {
  token?: string;
  model?: string;
  usedSeconds?: number;
  dailyLimitSeconds?: number;
  sessionLimitSeconds?: number;
  error?: string;
};

type Line = { role: "you" | "coach"; text: string };

const SYSTEM_INSTRUCTION =
  "You are Vale, a warm, experienced English teacher talking live with a Spanish-speaking adult learner. " +
  "You are an ENGLISH teacher: the conversation always stays in English. Never switch into a Spanish conversation, " +
  "even if the learner speaks Spanish to you. " +
  "Speak slowly and clearly, with short sentences. " +
  "If the learner says they do not understand ('no entiendo', 'I don't understand') or asks you to explain in Spanish: " +
  "slow down, use simpler English words, and rephrase the question in a different way. " +
  "You may add ONE short Spanish hint (one sentence maximum, such as translating the key word) and then return to English immediately. " +
  "Never lecture. Keep every turn under 3 sentences. " +
  "Follow these phases in order. " +
  "PHASE 1 (level): your very first turn greets the learner in one short sentence and asks their level with the three options: " +
  "'basic, intermediate, or advanced?'. If they do not answer after two tries, say you will start at intermediate and move on. " +
  "PHASE 2 (tense): once you know the level, ask in one short sentence what they want to practice: present, past, or future. " +
  "If they do not choose after two tries, pick present and move on. " +
  "PHASE 3 (practice): ask real-life questions that naturally require ONLY the chosen tense, adapted to the level, " +
  "and react to their answers like a real conversation. " +
  "PHASE 4 (switch): after about 5 or 6 exchanges, ask if they want to keep the same tense or change to another one, then continue. " +
  "Level adaptation: basic = very short sentences, everyday words, slow speech, yes/no and one-sentence questions; " +
  "intermediate = open questions, two-part sentences, normal pace; " +
  "advanced = opinion questions, 'why' follow-ups, natural expressions, longer turns from the learner. " +
  "Never interrupt: always let the learner finish their whole idea before you speak. " +
  "When they finish and made a real mistake, do this in one short turn: say the corrected sentence clearly " +
  "(for example: 'Almost! We say: I went there yesterday.'), then ask them to repeat it ('Say it with me: I went there yesterday.'). " +
  "After they repeat, confirm briefly ('Perfect!') and continue with the next question. " +
  "Correct at most one mistake per turn, and if there was no real mistake just keep the conversation going. " +
  "Because you already correct the learner live, there is NO error list at the end. " +
  "When you are asked to close the session, say a brief, warm goodbye in Spanish (one or two short sentences) " +
  "and give one phrase to practice before the next session.";

const GREETING_PROMPT =
  "The learner just joined. Start Phase 1 now: greet them in one short English sentence and ask if their level is basic, intermediate, or advanced.";

const SUMMARY_PROMPT =
  "The session is over. Close now with a brief, warm goodbye in Spanish and one phrase to practice. No error list.";

function pcm16FromFloat32(input: Float32Array): ArrayBuffer {
  const out = new Int16Array(input.length);
  for (let i = 0; i < input.length; i += 1) {
    const sample = Math.max(-1, Math.min(1, input[i] ?? 0));
    out[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  return out.buffer;
}

/** iOS Safari ignores a requested AudioContext sample rate, so downsample here. */
function resampleTo16k(input: Float32Array, inputRate: number): Float32Array {
  if (inputRate === 16000) return input;
  const ratio = inputRate / 16000;
  const length = Math.floor(input.length / ratio);
  const out = new Float32Array(length);
  for (let i = 0; i < length; i += 1) {
    const position = i * ratio;
    const index = Math.floor(position);
    const next = Math.min(index + 1, input.length - 1);
    const weight = position - index;
    out[i] = (input[index] ?? 0) * (1 - weight) + (input[next] ?? 0) * weight;
  }
  return out;
}

function toBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) binary += String.fromCharCode(bytes[i] ?? 0);
  return btoa(binary);
}

function fromBase64(value: string): Int16Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return new Int16Array(bytes.buffer);
}

function mmss(total: number): string {
  const m = Math.floor(Math.max(0, total) / 60);
  const s = Math.max(0, total) % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

const HELP_PROMPTS: Record<HelpKind, string> = {
  spanish: "The learner tapped Help in Spanish. Briefly explain or translate your most recent question in one short Spanish sentence. Then invite a simple answer in English on the same topic. Do not change the topic.",
  slow: "Repeat your most recent question now, using the exact same meaning and topic. Speak noticeably more slowly and clearly. Do not add a new question.",
  idea: "Give the learner one very short English sentence starter or a few useful words for answering your most recent question. Do not complete the answer. Then wait.",
};

export function LiveCoach({ onActiveChange }: { onActiveChange?: (active: boolean) => void }) {
  const { lang } = useAppLang();
  const es = lang !== "en";

  const [phase, setPhase] = useState<Phase>("idle");
  const [allowed, setAllowed] = useState<boolean | null>(null);
  const [usedSeconds, setUsedSeconds] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(15 * 60);
  const [remaining, setRemaining] = useState(0);
  const [level, setLevel] = useState(0);
  const [coachLevel, setCoachLevel] = useState(0);
  const [lines, setLines] = useState<Line[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [coachState, setCoachState] = useState<CoachState>("idle");
  const [micPaused, setMicPaused] = useState(false);
  const [helpLoading, setHelpLoading] = useState<HelpKind | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const prefs = loadPreferences();
  const currentModule = prefs.currentModuleId ? CourseService.getModule(prefs.currentModuleId) : null;
  const levelLabel = currentModule?.label ?? (es ? "Tu nivel" : "Your level");
  const topicLabel = currentModule?.subtitle ?? (es ? "Conversación real" : "Real conversation");

  const sessionRef = useRef<{
    close: () => void;
    sendRealtimeInput: (v: unknown) => void;
    sendClientContent: (v: unknown) => void;
  } | null>(null);
  const micCtxRef = useRef<AudioContext | null>(null);
  const outCtxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const nodeRef = useRef<ScriptProcessorNode | null>(null);
  const playHeadRef = useRef(0);
  const sourcesRef = useRef<AudioBufferSourceNode[]>([]);
  const outAnalyserRef = useRef<AnalyserNode | null>(null);
  const mouthFrameRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  const endingRef = useRef(false);
  const heardVoiceRef = useRef(false);
  const collectingSummaryRef = useRef(false);
  const summaryTextRef = useRef("");
  const summaryDoneRef = useRef<(() => void) | null>(null);
  const finalizedRef = useRef(false);

  useEffect(() => {
    onActiveChange?.(phase === "connecting" || phase === "live" || phase === "ending");
  }, [onActiveChange, phase]);

  async function authHeaders(): Promise<Record<string, string> | null> {
    const { data } = await getFreshSession();
    const token = data.session?.access_token;
    if (!token) return null;
    return { "content-type": "application/json", Authorization: `Bearer ${token}` };
  }

  const loadStatus = useCallback(async () => {
    const headers = await authHeaders();
    if (!headers) {
      setAllowed(false);
      return;
    }
    const res = await fetch("/api/live-coach", { headers });
    const body = (await res.json().catch(() => null)) as {
      allowed?: boolean;
      usedSeconds?: number;
      dailyLimitSeconds?: number;
    } | null;
    setAllowed(Boolean(body?.allowed));
    setUsedSeconds(body?.usedSeconds ?? 0);
    if (body?.dailyLimitSeconds) setDailyLimit(body.dailyLimitSeconds);
  }, []);

  useEffect(() => {
    void loadStatus();
  }, [loadStatus]);

  /** Stops the mic, asks for the final corrections, then closes and reports time. */
  const stop = useCallback(
    async (options?: { skipSummary?: boolean }) => {
      if (endingRef.current || finalizedRef.current) return;
      endingRef.current = true;
      setPhase("ending");
      setNotice(null);

      const seconds = startedAtRef.current
        ? Math.round((Date.now() - startedAtRef.current) / 1000)
        : 0;

      // Stop sending audio first so the coach is not listening while it summarizes.
      try {
        nodeRef.current?.disconnect();
        streamRef.current?.getTracks().forEach((track) => track.stop());
        await micCtxRef.current?.close().catch(() => undefined);
      } catch {
        /* best effort */
      }
      micCtxRef.current = null;
      nodeRef.current = null;
      streamRef.current = null;
      setLevel(0);

      if (!options?.skipSummary && sessionRef.current && heardVoiceRef.current) {
        try {
          setCoachState("thinking");
          collectingSummaryRef.current = true;
          summaryTextRef.current = "";
          sessionRef.current.sendClientContent({
            turns: [{ role: "user", parts: [{ text: SUMMARY_PROMPT }] }],
            turnComplete: true,
          });
          await new Promise<void>((resolve) => {
            summaryDoneRef.current = resolve;
            window.setTimeout(resolve, 14000);
          });
          // let the spoken summary finish playing
          const out = outCtxRef.current;
          if (out) {
            const tail = Math.max(0, playHeadRef.current - out.currentTime);
            await new Promise((resolve) => window.setTimeout(resolve, Math.min(tail, 25) * 1000));
          }
          if (summaryTextRef.current.trim()) setFeedback(summaryTextRef.current.trim());
        } catch {
          /* summary is best effort */
        }
      }
      collectingSummaryRef.current = false;
      summaryDoneRef.current = null;

      try {
        if (mouthFrameRef.current !== null) window.cancelAnimationFrame(mouthFrameRef.current);
        mouthFrameRef.current = null;
        outAnalyserRef.current = null;
        setCoachLevel(0);
        sourcesRef.current.forEach((source) => {
          try {
            source.stop();
          } catch {
            /* already finished */
          }
        });
        sourcesRef.current = [];
        await outCtxRef.current?.close().catch(() => undefined);
        sessionRef.current?.close();
      } catch {
        /* closing is best effort */
      }

      sessionRef.current = null;
      outCtxRef.current = null;
      startedAtRef.current = 0;
      heardVoiceRef.current = false;
      setCoachState("idle");

      try {
        const headers = await authHeaders();
        if (headers) {
          const res = await fetch("/api/live-coach", {
            method: "POST",
            headers,
            body: JSON.stringify({ action: "end", seconds }),
          });
          const body = (await res.json().catch(() => null)) as { usedSeconds?: number } | null;
          if (typeof body?.usedSeconds === "number") setUsedSeconds(body.usedSeconds);
        }
      } catch {
        /* the counter refreshes on the next visit */
      }

       finalizedRef.current = true;
       endingRef.current = false;
       setPhase("done");
    },
    [],
  );

  useEffect(() => {
    if (phase !== "live") return;
    const timer = window.setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          void stop();
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase, stop]);

  // Tell the learner when we are not hearing anything at all.
  useEffect(() => {
    if (phase !== "live") return;
    const timer = window.setTimeout(() => {
      if (!heardVoiceRef.current) {
        setNotice(
          es
            ? "No te estamos escuchando. Revisa el permiso del micrófono y habla más cerca."
            : "We are not hearing you. Check microphone permission and speak closer.",
        );
      }
    }, 15000);
    return () => window.clearTimeout(timer);
  }, [phase, es]);

  useEffect(() => () => void stop({ skipSummary: true }), [stop]);

  async function toggleMicrophone() {
    const context = micCtxRef.current;
    if (!context || phase !== "live") return;
    try {
      if (micPaused) {
        await context.resume();
        setMicPaused(false);
        setCoachState("listening");
      } else {
        await context.suspend();
        setMicPaused(true);
        setCoachState("idle");
        setLevel(0);
      }
    } catch {
      setError(es ? "No se pudo cambiar el micrófono." : "Could not change the microphone.");
    }
  }

  function requestHelp(kind: HelpKind) {
    if (phase !== "live" || helpLoading || !sessionRef.current) return;
    setHelpLoading(kind);
    setCoachState("thinking");
    try {
      sessionRef.current.sendClientContent({
        turns: [{ role: "user", parts: [{ text: HELP_PROMPTS[kind] }] }],
        turnComplete: true,
      });
    } catch {
      setHelpLoading(null);
      setError(es ? "No pude pedir esa ayuda. Intenta otra vez." : "I couldn't request that help. Try again.");
    }
  }

  async function start() {
    if (phase !== "idle") return;
    setError(null);
    setNotice(null);
    setFeedback(null);
    setLines([]);
    setHistoryOpen(false);
    setMicPaused(false);
    setHelpLoading(null);
    finalizedRef.current = false;
    heardVoiceRef.current = false;

    const headers = await authHeaders();
    if (!headers) {
      setError(es ? "Inicia sesión para hablar en vivo." : "Sign in to talk live.");
      return;
    }

    setPhase("connecting");

    // Unlock audio inside the user gesture: iOS starts contexts suspended.
    let outCtx: AudioContext;
    try {
      outCtx = new AudioContext();
      await outCtx.resume().catch(() => undefined);
      outCtxRef.current = outCtx;
      playHeadRef.current = outCtx.currentTime;
      const outAnalyser = outCtx.createAnalyser();
      outAnalyser.fftSize = 512;
      outAnalyser.smoothingTimeConstant = 0.68;
      outAnalyser.connect(outCtx.destination);
      outAnalyserRef.current = outAnalyser;

      const waveform = new Uint8Array(outAnalyser.fftSize);
      let lastMouthUpdate = 0;
      let envelope = 0;
      let adaptivePeak = 0.08;
      const followCoachVoice = (timestamp: number) => {
        outAnalyser.getByteTimeDomainData(waveform);
        let sum = 0;
        for (let i = 0; i < waveform.length; i += 1) {
          const sample = ((waveform[i] ?? 128) - 128) / 128;
          sum += sample * sample;
        }
        const rms = Math.sqrt(sum / waveform.length);
        // Follow syllables quickly, then release gently through consonants and
        // tiny pauses. The adaptive peak keeps quiet iPhone audio expressive.
        envelope = rms > envelope ? envelope * 0.28 + rms * 0.72 : envelope * 0.78 + rms * 0.22;
        adaptivePeak = Math.max(rms, adaptivePeak * 0.997);
        // About 20 updates per second looks responsive without forcing the
        // whole live panel to render for every animation frame.
        if (timestamp - lastMouthUpdate >= 50) {
          lastMouthUpdate = timestamp;
          const noiseFloor = 0.006;
          const usablePeak = Math.max(0.035, adaptivePeak - noiseFloor);
          const normalized = Math.max(0, envelope - noiseFloor) / usablePeak;
          setCoachLevel(Math.min(1, normalized));
        }
        mouthFrameRef.current = window.requestAnimationFrame(followCoachVoice);
      };
      mouthFrameRef.current = window.requestAnimationFrame(followCoachVoice);
    } catch {
      setError(es ? "No se pudo abrir el audio." : "Could not open audio.");
      setPhase("idle");
      return;
    }

    try {
      const res = await fetch("/api/live-coach", {
        method: "POST",
        headers,
        body: JSON.stringify({ action: "start" }),
      });
      const body = (await res.json().catch(() => null)) as StartResponse | null;

      if (res.status === 429 || body?.error === "daily_limit") {
        setUsedSeconds(body?.usedSeconds ?? usedSeconds);
        setError(
          es
            ? "Ya usaste tus minutos de hoy. Vuelve mañana."
            : "You used today's minutes. Come back tomorrow.",
        );
        await outCtx.close().catch(() => undefined);
        if (mouthFrameRef.current !== null) window.cancelAnimationFrame(mouthFrameRef.current);
        mouthFrameRef.current = null;
        outAnalyserRef.current = null;
        outCtxRef.current = null;
        setPhase("idle");
        return;
      }
      if (!res.ok || !body?.token) {
        setError(es ? "No se pudo conectar. Intenta otra vez." : "Could not connect. Try again.");
        await outCtx.close().catch(() => undefined);
        if (mouthFrameRef.current !== null) window.cancelAnimationFrame(mouthFrameRef.current);
        mouthFrameRef.current = null;
        outAnalyserRef.current = null;
        outCtxRef.current = null;
        setPhase("idle");
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;

      const { GoogleGenAI, Modality } = await import("@google/genai");
      const ai = new GoogleGenAI({
        apiKey: body.token,
        httpOptions: { apiVersion: "v1alpha" },
      });

      const session = await ai.live.connect({
        model: body.model ?? "gemini-3.8-live",
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: SYSTEM_INSTRUCTION,
          inputAudioTranscription: {},
          outputAudioTranscription: {},
        },
        callbacks: {
           onmessage: (message: any) => {
            const content = message?.serverContent;
            if (content?.interrupted) {
              sourcesRef.current.forEach((source) => {
                try {
                  source.stop();
                } catch {
                  /* already stopped */
                }
              });
              sourcesRef.current = [];
              playHeadRef.current = outCtx.currentTime;
            }

            const userText = content?.inputTranscription?.text;
            if (userText) {
              heardVoiceRef.current = true;
              setNotice(null);
              setLines((prev) => appendLine(prev, "you", userText));
            }
            const coachText = content?.outputTranscription?.text;
            if (coachText) {
              if (collectingSummaryRef.current) summaryTextRef.current += coachText;
              else setLines((prev) => appendLine(prev, "coach", coachText));
            }

            const parts = content?.modelTurn?.parts ?? [];
             if (parts.length === 0 && !content?.turnComplete && !content?.inputTranscription) {
               setCoachState("thinking");
             }
            for (const part of parts) {
              const data = part?.inlineData?.data;
              if (!data) continue;
              const pcm = fromBase64(data);
              // Model audio is 24 kHz PCM; the buffer keeps that rate and the
              // browser resamples it to whatever the device context uses.
              const buffer = outCtx.createBuffer(1, pcm.length, 24000);
              const channel = buffer.getChannelData(0);
              for (let i = 0; i < pcm.length; i += 1) channel[i] = (pcm[i] ?? 0) / 32768;
              const source = outCtx.createBufferSource();
              source.buffer = buffer;
              const analyser = outAnalyserRef.current;
              if (analyser) source.connect(analyser);
              else source.connect(outCtx.destination);
              const startAt = Math.max(outCtx.currentTime, playHeadRef.current);
              source.start(startAt);
              playHeadRef.current = startAt + buffer.duration;
              sourcesRef.current.push(source);
              setCoachState("speaking");
              source.onended = () => {
                sourcesRef.current = sourcesRef.current.filter((item) => item !== source);
                if (sourcesRef.current.length === 0 && !endingRef.current) {
                  setCoachState("listening");
                }
              };
            }

            if (content?.turnComplete && collectingSummaryRef.current) {
              summaryDoneRef.current?.();
              summaryDoneRef.current = null;
            }
             if (content?.turnComplete && !collectingSummaryRef.current) {
               setHelpLoading(null);
               if (sourcesRef.current.length === 0 && !micPaused) setCoachState("listening");
             }
          },
          onerror: () => {
            setError(es ? "Se perdió la conexión." : "The connection dropped.");
            void stop({ skipSummary: true });
          },
          onclose: () => {
            void stop({ skipSummary: true });
          },
        },
      });

      sessionRef.current = session as unknown as {
        close: () => void;
        sendRealtimeInput: (v: unknown) => void;
        sendClientContent: (v: unknown) => void;
      };

      const micCtx = new AudioContext();
      await micCtx.resume().catch(() => undefined);
      micCtxRef.current = micCtx;
      const micRate = micCtx.sampleRate;
      const source = micCtx.createMediaStreamSource(stream);
      const processor = micCtx.createScriptProcessor(4096, 1, 1);
      nodeRef.current = processor;
      processor.onaudioprocess = (event) => {
        const input = event.inputBuffer.getChannelData(0);
        let peak = 0;
        for (let i = 0; i < input.length; i += 64) peak = Math.max(peak, Math.abs(input[i] ?? 0));
        setLevel(peak);
        if (peak > 0.03) heardVoiceRef.current = true;
        try {
          const resampled = resampleTo16k(input, micRate);
          sessionRef.current?.sendRealtimeInput({
            audio: {
              data: toBase64(pcm16FromFloat32(resampled)),
              mimeType: "audio/pcm;rate=16000",
            },
          });
        } catch {
          /* socket closing */
        }
      };
      source.connect(processor);
      // Keep the processor alive without echoing the mic back to the speaker.
      const mute = micCtx.createGain();
      mute.gain.value = 0;
      processor.connect(mute);
      mute.connect(micCtx.destination);

      startedAtRef.current = Date.now();
      setRemaining(body.sessionLimitSeconds ?? 300);
      setPhase("live");
      setCoachState("thinking");

      // The coach speaks first so the learner knows it is working.
      try {
        sessionRef.current.sendClientContent({
          turns: [{ role: "user", parts: [{ text: GREETING_PROMPT }] }],
          turnComplete: true,
        });
      } catch {
        /* the learner can still speak first */
      }
    } catch (err) {
      console.error("[live-coach]", err);
      await outCtxRef.current?.close().catch(() => undefined);
      if (mouthFrameRef.current !== null) window.cancelAnimationFrame(mouthFrameRef.current);
      mouthFrameRef.current = null;
      outAnalyserRef.current = null;
      setCoachLevel(0);
      outCtxRef.current = null;
      setError(
        es
          ? "Necesitamos permiso del micrófono para hablar en vivo."
          : "We need microphone access to talk live.",
      );
      setPhase("idle");
    }
  }

  if (allowed === false) {
    return (
      <div className="rounded-2xl border border-border bg-secondary p-4 text-[13px] text-muted-foreground">
        {es
          ? "La práctica de conversación en vivo está en prueba privada. Pronto para todos."
          : "Live conversation practice is in a private test. Coming soon for everyone."}
      </div>
    );
  }

  const leftToday = Math.max(0, dailyLimit - usedSeconds);
  const avatarState: CoachState =
    phase === "idle" || phase === "done" ? "idle" : phase === "connecting" ? "thinking" : coachState;
  const currentCoachText = [...lines].reverse().find((line) => line.role === "coach")?.text.trim() ?? "";
  const statusText = phase === "connecting"
    ? (es ? "Conectando…" : "Connecting…")
    : phase === "ending"
      ? (es ? "Cerrando conversación…" : "Ending conversation…")
      : micPaused
        ? (es ? "Micrófono en pausa" : "Microphone paused")
        : coachState === "speaking"
          ? (es ? "Tu coach está hablando" : "Your coach is talking")
          : coachState === "thinking"
            ? (es ? "Preparando respuesta…" : "Preparing response…")
            : (es ? "Tu turno. Te escucho." : "Your turn. I'm listening.");

  return (
    <div className="space-y-4">
      <p className="text-center text-[12px] font-semibold text-muted-foreground">
        {es
          ? `Te quedan ${mmss(leftToday)} de conversación hoy`
          : `${mmss(leftToday)} of conversation left today`}
      </p>

      <div className="flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6">
        <CoachAvatar
          state={avatarState}
          level={avatarState === "speaking" ? coachLevel : level}
        />

        <p className="text-[13px] font-semibold text-foreground">
          {phase === "live"
            ? coachState === "speaking"
              ? es
                ? "Tu coach está hablando"
                : "Your coach is talking"
              : es
                ? "Te escucha"
                : "Listening to you"
            : phase === "connecting"
              ? es
                ? "Conectando…"
                : "Connecting…"
              : phase === "ending"
                ? es
                  ? "Preparando tus correcciones…"
                  : "Preparing your corrections…"
                : es
                  ? "Toca para empezar a hablar"
                  : "Tap to start talking"}
        </p>

        {phase === "live" ? (
          <>
            <button
              type="button"
              onClick={() => void stop()}
              className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl border border-border bg-transparent px-4 text-[13px] font-semibold uppercase tracking-[0.12em] text-muted-foreground"
            >
              <Square className="size-3.5" aria-hidden />
              {es ? "Terminar" : "End"}
            </button>
            <p
              className={`text-[11px] font-medium ${
                remaining <= 60 ? "text-foreground" : "text-muted-foreground/70"
              }`}
            >
              {mmss(remaining)}
            </p>
          </>
        ) : (
          <button
            type="button"
            onClick={() => void start()}
            disabled={phase !== "idle" || leftToday <= 30}
            className="flex min-h-[48px] w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-[13px] font-extrabold uppercase tracking-[0.14em] text-primary-foreground disabled:opacity-50"
          >
            {phase === "ending" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Mic className="size-4" aria-hidden />
            )}
            {es ? "Hablar en vivo" : "Talk live"}
          </button>
        )}
      </div>

      {error ? (
        <p className="text-center text-[13px] font-semibold text-destructive">{error}</p>
      ) : null}

      {notice ? (
        <p className="rounded-2xl border border-border bg-secondary p-3 text-center text-[13px] font-semibold text-foreground">
          {notice}
        </p>
      ) : null}

      {feedback ? (
        <div className="space-y-2 rounded-2xl border border-primary/40 bg-primary/5 p-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-primary">
            {es ? "Tus correcciones" : "Your corrections"}
          </p>
          <p className="whitespace-pre-line text-[13px] leading-relaxed text-foreground">
            {feedback}
          </p>
        </div>
      ) : null}

      {lines.length > 0 ? (
        <div className="space-y-2 rounded-2xl border border-border bg-card p-4">
          <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
            {es ? "Tu conversación" : "Your conversation"}
          </p>
          {lines.map((line, index) => (
            <p key={`${line.role}-${index}`} className="text-[13px] leading-relaxed">
              <span className="font-bold text-foreground">
                {line.role === "you" ? (es ? "Tú: " : "You: ") : "Coach: "}
              </span>
              <span className="text-muted-foreground">{line.text}</span>
            </p>
          ))}
        </div>
      ) : null}

      <p className="pb-2 text-center text-[12px] text-muted-foreground">
        {es
          ? "La conversación no se guarda. Solo contamos los minutos usados."
          : "The conversation is not saved. We only count the minutes used."}
      </p>
    </div>
  );
}

/** Live transcripts arrive in fragments; join them into one line per speaker. */
function appendLine(prev: Line[], role: Line["role"], text: string): Line[] {
  const last = prev[prev.length - 1];
  if (last && last.role === role) {
    const merged = [...prev];
    merged[merged.length - 1] = { role, text: `${last.text}${text}` };
    return merged;
  }
  return [...prev, { role, text }];
}
