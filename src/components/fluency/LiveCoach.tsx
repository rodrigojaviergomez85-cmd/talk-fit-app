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
import { nextLiveAudioWindow } from "@/lib/live-audio";
import { LiveSessionLifecycle } from "@/lib/live-session-lifecycle";


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
  const sourceGainsRef = useRef<GainNode[]>([]);
  const outAnalyserRef = useRef<AnalyserNode | null>(null);
  const mouthFrameRef = useRef<number | null>(null);
  const startedAtRef = useRef(0);
  const endingRef = useRef(false);
  const heardVoiceRef = useRef(false);
  const collectingSummaryRef = useRef(false);
  const summaryTextRef = useRef("");
  const summaryDoneRef = useRef<(() => void) | null>(null);
  const finalizedRef = useRef(false);
  const micPausedRef = useRef(false);
  const lifeRef = useRef<LiveSessionLifecycle>(new LiveSessionLifecycle());


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

  /** Frees the microphone: processor node, tracks and its audio context. */
  const releaseMic = useCallback(async () => {
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
    micPausedRef.current = false;
    setLevel(0);
    setMicPaused(false);
  }, []);

  /** Frees playback: mouth animation, queued sources, gains and output context. */
  const releasePlayback = useCallback(async () => {
    try {
      if (mouthFrameRef.current !== null) window.cancelAnimationFrame(mouthFrameRef.current);
      mouthFrameRef.current = null;
      outAnalyserRef.current = null;
      sourcesRef.current.forEach((source) => {
        try {
          source.stop();
        } catch {
          /* already finished */
        }
      });
      sourcesRef.current = [];
      sourceGainsRef.current.forEach((gain) => gain.disconnect());
      sourceGainsRef.current = [];
      await outCtxRef.current?.close().catch(() => undefined);
    } catch {
      /* best effort */
    }
    outCtxRef.current = null;
    setCoachLevel(0);
  }, []);

  /** Closes the live connection. */
  const releaseSession = useCallback(() => {
    try {
      sessionRef.current?.close();
    } catch {
      /* already closed */
    }
    sessionRef.current = null;
  }, []);

  /** Stops the mic, asks for the final corrections, then closes and reports time. */
  const stop = useCallback(
    async (options?: { skipSummary?: boolean }) => {
      const life = lifeRef.current;
      if (!life.busy && !startedAtRef.current && !sessionRef.current) return;
      if (endingRef.current) return;
      endingRef.current = true;

      const seconds = startedAtRef.current
        ? Math.round((Date.now() - startedAtRef.current) / 1000)
        : 0;

      // Cancelling a start that never went live: drop everything and reset.
      if (!startedAtRef.current) {
        await life.releaseAll();
        collectingSummaryRef.current = false;
        summaryDoneRef.current = null;
        heardVoiceRef.current = false;
        endingRef.current = false;
        setNotice(null);
        setCoachState("idle");
        setPhase("idle");
        return;
      }

      if (finalizedRef.current) {
        endingRef.current = false;
        return;
      }

      setPhase("ending");
      setNotice(null);

      // Stop sending audio first so the coach is not listening while it summarizes.
      await releaseMic();

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

      await life.releaseAll();

      startedAtRef.current = 0;
      heardVoiceRef.current = false;
      setCoachState("idle");

      // Usage is reported exactly once per live session.
      finalizedRef.current = true;
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

       endingRef.current = false;
       setPhase("done");
    },
    [releaseMic, releasePlayback, releaseSession],
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
        streamRef.current?.getAudioTracks().forEach((track) => { track.enabled = true; });
        micPausedRef.current = false;
        setMicPaused(false);
        setCoachState("listening");
      } else {
        micPausedRef.current = true;
        streamRef.current?.getAudioTracks().forEach((track) => { track.enabled = false; });
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
    const life = lifeRef.current;
    if (phase !== "idle" && phase !== "done") return;
    // Block duplicate starts before the first await.
    const attempt = life.begin();
    if (attempt === null) return;

    /** True once "X"/"Terminar" cancelled this attempt. */
    const cancelled = () => !life.isCurrent(attempt);
    const abandon = async () => {
      await life.releaseAll();
      if (!endingRef.current) setPhase("idle");
    };

    setError(null);
    setNotice(null);
    setFeedback(null);
    setLines([]);
    setHistoryOpen(false);
    setMicPaused(false);
    micPausedRef.current = false;
    setHelpLoading(null);
    finalizedRef.current = false;
    heardVoiceRef.current = false;
    setPhase("connecting");

    const headers = await authHeaders();
    if (cancelled()) return;
    if (!headers) {
      await life.releaseAll();
      setError(es ? "Inicia sesión para hablar en vivo." : "Sign in to talk live.");
      setPhase("idle");
      return;
    }

    // Unlock audio inside the user gesture: iOS starts contexts suspended.
    let outCtx: AudioContext;
    try {
      outCtx = new AudioContext();
      outCtxRef.current = outCtx;
      life.register(attempt, releasePlayback);
      await outCtx.resume().catch(() => undefined);
      if (cancelled()) {
        await abandon();
        return;
      }
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
              sourceGainsRef.current.forEach((gain) => gain.disconnect());
              sourceGainsRef.current = [];
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
               const gain = outCtx.createGain();
              const analyser = outAnalyserRef.current;
               source.connect(gain);
               if (analyser) gain.connect(analyser);
               else gain.connect(outCtx.destination);
               const window = nextLiveAudioWindow(outCtx.currentTime, playHeadRef.current, buffer.duration);
               const { startAt, endAt, fadeSeconds } = window;
               gain.gain.setValueAtTime(0, startAt);
               gain.gain.linearRampToValueAtTime(1, startAt + fadeSeconds);
               gain.gain.setValueAtTime(1, Math.max(startAt + fadeSeconds, endAt - fadeSeconds));
               gain.gain.linearRampToValueAtTime(0, endAt);
              source.start(startAt);
               playHeadRef.current = endAt;
              sourcesRef.current.push(source);
               sourceGainsRef.current.push(gain);
              setCoachState("speaking");
              source.onended = () => {
                sourcesRef.current = sourcesRef.current.filter((item) => item !== source);
                 sourceGainsRef.current = sourceGainsRef.current.filter((item) => item !== gain);
                 gain.disconnect();
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
               if (sourcesRef.current.length === 0 && !micPausedRef.current) setCoachState("listening");
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
         if (micPausedRef.current) return;
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
        const knownLevelPrompt = currentModule
          ? `The learner's known curriculum level is ${currentModule.label}. Their current course focus is ${currentModule.subtitle}. Do not ask their level. Greet them briefly, mention today's focus naturally, and ask the first suitable English question.`
          : GREETING_PROMPT;
        sessionRef.current.sendClientContent({
          turns: [{ role: "user", parts: [{ text: knownLevelPrompt }] }],
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

  if (phase === "idle" || phase === "done") {
    return (
      <section className="mx-auto max-w-[460px] px-1 pb-4 text-center">
        <CoachAvatar state="idle" />
        <h2 className="mt-1 text-[28px] font-extrabold leading-tight text-foreground">
          {phase === "done"
            ? (es ? "Conversación finalizada" : "Conversation finished")
            : (es ? "Tu inglés empieza con una conversación." : "Your English starts with a conversation.")}
        </h2>
        <p className="mx-auto mt-3 max-w-xs text-[15px] leading-relaxed text-muted-foreground">
          {phase === "done"
            ? (es ? "Cuando quieras, seguimos practicando." : "We can keep practicing whenever you're ready.")
            : (es ? "Habla a tu ritmo. Tu coach te ayuda cuando lo necesites." : "Speak at your pace. Your coach helps whenever you need it.")}
        </p>
        <div className="mt-5 rounded-[20px] border border-border bg-card p-4 text-left shadow-[var(--shadow-card)]">
          <p className="text-[12px] font-bold text-primary">{es ? `Para tu nivel · ${levelLabel}` : `For your level · ${levelLabel}`}</p>
          <h3 className="mt-1 text-lg font-extrabold text-foreground">{topicLabel}</h3>
          <p className="mt-1 text-[13px] text-muted-foreground">{es ? `${mmss(leftToday)} disponibles hoy` : `${mmss(leftToday)} available today`}</p>
        </div>
        {feedback ? <div className="mt-4 rounded-2xl border border-border bg-card p-4 text-left"><p className="text-xs font-bold text-primary">{es ? "Cierre de Vale" : "Vale's closing"}</p><p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground">{feedback}</p></div> : null}
        {error ? <p className="mt-4 text-[13px] font-semibold text-destructive">{error}</p> : null}
        <Button onClick={() => void start()} disabled={leftToday <= 30} className="mt-5 h-[54px] w-full rounded-2xl bg-primary text-[15px] font-bold text-primary-foreground">
          {phase === "done" ? <RotateCcw aria-hidden /> : <Mic aria-hidden />}
          {phase === "done" ? (es ? "Volver a hablar" : "Talk again") : (es ? "Empezar a hablar" : "Start talking")}
        </Button>
        <p className="mt-4 text-[12px] text-muted-foreground">{es ? "Puedes pedir ayuda en español en cualquier momento." : "You can ask for Spanish help at any time."}</p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[460px] pb-[max(1rem,env(safe-area-inset-bottom))]">
      <header className="flex items-center justify-between gap-3 pb-3 pt-[max(.25rem,env(safe-area-inset-top))]">
        <div><p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary">Fluency</p><h2 className="text-[23px] font-extrabold text-foreground">AI Coach</h2></div>
        <Button variant="outline" size="icon" className="size-11 rounded-full bg-card" onClick={() => void stop()} aria-label={es ? "Salir de la conversación" : "Leave conversation"}><X aria-hidden /></Button>
      </header>
      <div className="flex items-center justify-between gap-2 border-t border-border py-3 text-[12px] text-muted-foreground">
        <span className="min-w-0 truncate"><strong className="text-foreground">{levelLabel}</strong> · {topicLabel}</span>
        <span className={cn("flex shrink-0 items-center gap-1 tabular-nums", remaining <= 60 && "font-bold text-destructive")}><Clock3 className="size-3.5" aria-hidden />{mmss(remaining)}</span>
      </div>

      <div className="flex flex-col items-center pb-3 text-center">
        <CoachAvatar state={avatarState} level={avatarState === "speaking" ? coachLevel : level} compact />
        <p className={cn("mt-1 flex min-h-6 items-center gap-2 text-[14px] font-bold", micPaused ? "text-muted-foreground" : coachState === "listening" ? "text-success" : "text-foreground")} aria-live="polite">
          {(phase === "connecting" || phase === "ending" || coachState === "thinking") ? <Loader2 className="size-4 animate-spin" aria-hidden /> : null}{statusText}
        </p>
      </div>

      <div className="rounded-[22px] bg-card px-5 py-5 shadow-[var(--shadow-card)]">
        <p className="text-[12px] font-semibold text-muted-foreground">{es ? "Tu coach dice" : "Your coach says"}</p>
        <p lang="en" className="mt-2 min-h-[3.2em] text-[clamp(1.35rem,6vw,1.75rem)] font-extrabold leading-[1.27] text-foreground" aria-live="polite">
          {currentCoachText || (phase === "connecting" ? (es ? "Preparando tu conversación…" : "Preparing your conversation…") : (es ? "Vale te saludará en un momento." : "Vale will greet you in a moment."))}
        </p>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2" aria-label={es ? "Ayuda para responder" : "Help answering"}>
        {([
          ["spanish", Languages, es ? "En español" : "In Spanish"],
          ["slow", Gauge, es ? "Más lento" : "Slower"],
          ["idea", Lightbulb, es ? "Dame una idea" : "Give me an idea"],
        ] as const).map(([kind, Icon, label]) => (
          <Button key={kind} variant="outline" disabled={phase !== "live" || helpLoading !== null} onClick={() => requestHelp(kind)} className="h-[58px] min-w-0 flex-col gap-1 rounded-[14px] bg-card px-1 text-[12px] font-semibold">
            {helpLoading === kind ? <Loader2 className="animate-spin" aria-hidden /> : <Icon aria-hidden />}{label}
          </Button>
        ))}
      </div>

      {notice ? <p className="mt-3 rounded-xl bg-secondary p-3 text-center text-[13px] font-semibold text-foreground">{notice}</p> : null}
      {error ? <div className="mt-3 rounded-xl bg-coach-end p-3 text-center text-[13px] font-semibold text-coach-end-foreground"><p>{error}</p><Button variant="ghost" className="mt-1 h-9" onClick={() => { setError(null); void stop({ skipSummary: true }); }}>{es ? "Volver" : "Back"}</Button></div> : null}

      <p className="mt-5 text-center text-[13px] font-medium text-muted-foreground">{micPaused ? (es ? "Retoma cuando estés listo" : "Resume when you're ready") : (es ? "El micrófono está abierto" : "The microphone is open")}</p>
      <div className="mt-2 grid grid-cols-[minmax(0,1fr)_70px] gap-3">
        <Button onClick={() => void toggleMicrophone()} disabled={phase !== "live"} className="h-[54px] rounded-[17px] bg-coach-action font-bold text-coach-action-foreground">
          {micPaused ? <Mic aria-hidden /> : <MicOff aria-hidden />}{micPaused ? (es ? "Activar micrófono" : "Turn on microphone") : (es ? "Pausar micrófono" : "Pause microphone")}
        </Button>
        <Button onClick={() => void stop()} disabled={phase === "ending"} className="h-[54px] rounded-[17px] bg-coach-end text-coach-end-foreground hover:bg-coach-end" aria-label={es ? "Terminar conversación" : "End conversation"}>{phase === "ending" ? <Loader2 className="animate-spin" aria-hidden /> : <PhoneOff aria-hidden />}</Button>
      </div>
      <p className="mt-1 text-right text-[11px] text-muted-foreground">{es ? "Terminar" : "End"}</p>

      <Collapsible open={historyOpen} onOpenChange={setHistoryOpen} className="mt-3 border-t border-border pt-1">
        <CollapsibleTrigger asChild><Button variant="ghost" className="h-11 w-full justify-between px-1 text-[12px] text-muted-foreground"><span>{es ? "Ver conversación" : "View conversation"}</span><ChevronDown className={cn("transition-transform", historyOpen && "rotate-180")} aria-hidden /></Button></CollapsibleTrigger>
        <CollapsibleContent>
          <Conversation className="max-h-56 rounded-xl bg-secondary/60">
            <ConversationContent className="gap-3 p-3">
              {lines.map((line, index) => <Message key={`${line.role}-${index}`} from={line.role === "you" ? "user" : "assistant"}><span className="text-[11px] font-bold text-muted-foreground">{line.role === "you" ? (es ? "Tú" : "You") : "Vale"}</span><MessageContent className="text-[13px] leading-relaxed">{line.text}</MessageContent></Message>)}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </CollapsibleContent>
      </Collapsible>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">{es ? "La conversación no se guarda. Solo contamos los minutos usados." : "The conversation is not saved. We only count the minutes used."}</p>
    </section>
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
