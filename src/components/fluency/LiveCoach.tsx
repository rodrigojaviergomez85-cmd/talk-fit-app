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
import { appendFragment, emptyTranscript, type CoachKind, type LiveTranscript } from "@/lib/live-turns";
import { HELP_PROMPTS, SUMMARY_PROMPT, buildOpeningPrompt, buildSystemInstruction } from "@/lib/live-coach-prompts";



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
  const [transcript, setTranscript] = useState<LiveTranscript>(emptyTranscript);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [coachState, setCoachState] = useState<CoachState>("idle");
  const [micPaused, setMicPaused] = useState(false);
  const [talking, setTalking] = useState(false);
  const [helpLoading, setHelpLoading] = useState<HelpKind | null>(null);
  const [historyOpen, setHistoryOpen] = useState(false);
  const prefs = loadPreferences();
  const currentModule = prefs.currentModuleId ? CourseService.getModule(prefs.currentModuleId) : null;
  const levelLabel = currentModule?.label ?? (es ? "Tu nivel" : "Your level");
  const topicLabel = currentModule?.subtitle ?? (es ? "Conversación real" : "Real conversation");
  const coachContext = { level: currentModule?.label, focus: currentModule?.subtitle };

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
  const coachTurnRef = useRef(0);
  const userTurnRef = useRef(0);
  const helpKindRef = useRef<CoachKind | null>(null);
  // Push-to-talk: audio only leaves the device while the learner holds the
  // button, so silence is never billed by the live model.
  const talkingRef = useRef(false);
  const talkTimeoutRef = useRef<number | null>(null);

  /** Longest single spoken turn before the app ends it for the learner. */
  const MAX_TALK_SECONDS = 60;



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
    talkingRef.current = false;
    if (talkTimeoutRef.current !== null) {
      window.clearTimeout(talkTimeoutRef.current);
      talkTimeoutRef.current = null;
    }
    setTalking(false);
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
            ? "No te estamos escuchando. Mantén apretado el botón del micrófono mientras hablas."
            : "We are not hearing you. Hold the microphone button while you speak.",
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
        setCoachState(talkingRef.current ? "listening" : "idle");
      } else {
        // Pausing mid-turn ends the spoken turn so nothing hangs.
        if (talkingRef.current) stopTalking();
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

  /** Push-to-talk: start streaming mic audio while the button is held. */
  function startTalking() {
    if (phase !== "live" || micPausedRef.current || talkingRef.current || !sessionRef.current) return;
    // Interrupt whatever the coach is saying so the learner can answer now.
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
    playHeadRef.current = outCtxRef.current?.currentTime ?? 0;
    talkingRef.current = true;
    setTalking(true);
    setCoachState("listening");
    // Safety cap: a stuck finger never turns into an open-ended bill.
    talkTimeoutRef.current = window.setTimeout(() => stopTalking(), MAX_TALK_SECONDS * 1000);
  }

  /** Releasing the button ends the turn so the coach answers right away. */
  function stopTalking() {
    if (!talkingRef.current) return;
    talkingRef.current = false;
    if (talkTimeoutRef.current !== null) {
      window.clearTimeout(talkTimeoutRef.current);
      talkTimeoutRef.current = null;
    }
    setTalking(false);
    setLevel(0);
    try {
      sessionRef.current?.sendRealtimeInput({ audioStreamEnd: true });
    } catch {
      /* socket closing */
    }
    if (!endingRef.current && !collectingSummaryRef.current) setCoachState("thinking");
  }

  function requestHelp(kind: HelpKind) {
    if (phase !== "live" || helpLoading || !sessionRef.current) return;
    setHelpLoading(kind);
    setCoachState("thinking");
    // The coach answer that follows is a side help, not a new practice question.
    coachTurnRef.current += 1;
    helpKindRef.current = kind === "spanish" ? "spanish" : kind === "idea" ? "idea" : "slow";
    try {
      sessionRef.current.sendClientContent({
        turns: [{ role: "user", parts: [{ text: HELP_PROMPTS[kind] }] }],
        turnComplete: true,
      });
    } catch {
      setHelpLoading(null);
      helpKindRef.current = null;
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
    setTranscript(emptyTranscript);
    coachTurnRef.current = 0;
    userTurnRef.current = 0;
    helpKindRef.current = null;

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
      await abandon();
      if (!cancelled()) setError(es ? "No se pudo abrir el audio." : "Could not open audio.");
      return;
    }

    try {
      const res = await fetch("/api/live-coach", {
        method: "POST",
        headers,
        body: JSON.stringify({ action: "start" }),
      });
      const body = (await res.json().catch(() => null)) as StartResponse | null;
      if (cancelled()) return;

      if (res.status === 429 || body?.error === "daily_limit") {
        setUsedSeconds(body?.usedSeconds ?? usedSeconds);
        setError(
          es
            ? "Ya usaste tus minutos de hoy. Vuelve mañana."
            : "You used today's minutes. Come back tomorrow.",
        );
        await abandon();
        return;
      }
      if (!res.ok || !body?.token) {
        setError(es ? "No se pudo conectar. Intenta otra vez." : "Could not connect. Try again.");
        await abandon();
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
      streamRef.current = stream;
      // If the learner left while the permission dialog was open, the stream
      // is released right away instead of staying on.
      if (!life.register(attempt, releaseMic)) {
        streamRef.current = null;
        return;
      }


      const { GoogleGenAI, Modality } = await import("@google/genai");
      const ai = new GoogleGenAI({
        apiKey: body.token,
        httpOptions: { apiVersion: "v1alpha" },
      });

      const session = await ai.live.connect({
        model: body.model ?? "gemini-3.8-live",
        config: {
          responseModalities: [Modality.AUDIO],
          systemInstruction: buildSystemInstruction(coachContext),
          inputAudioTranscription: {},
          outputAudioTranscription: {},
          // Push-to-talk: the app marks turns itself (hold to talk, release to
          // end), so server-side voice activity detection stays off and no
          // silence is billed.
          realtimeInputConfig: { automaticActivityDetection: { disabled: true } },
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
              setTranscript((prev) =>
                appendFragment(prev, { id: `you-${userTurnRef.current}`, role: "you", text: userText }),
              );
            }
            const coachText = content?.outputTranscription?.text;
            if (coachText) {
              if (collectingSummaryRef.current) summaryTextRef.current += coachText;
              else
                setTranscript((prev) =>
                  appendFragment(prev, {
                    id: `coach-${coachTurnRef.current}`,
                    role: "coach",
                    kind: helpKindRef.current ?? "question",
                    text: coachText,
                  }),
                );
            }


            const parts = content?.modelTurn?.parts ?? [];
             if (parts.length === 0 && !content?.turnComplete && !content?.inputTranscription) {
               setCoachState("thinking");
             }
            for (const part of parts) {
              // While the learner holds the talk button they interrupted the
              // coach: drop any of its audio still arriving.
              if (talkingRef.current) continue;
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
                   setCoachState(talkingRef.current ? "listening" : "idle");
                 }
              };
            }

            if (content?.turnComplete && collectingSummaryRef.current) {
              summaryDoneRef.current?.();
              summaryDoneRef.current = null;
            }
             if (content?.turnComplete && !collectingSummaryRef.current) {
               // A completed model turn closes both sides: the next fragments
               // belong to new messages, even from the same speaker.
               coachTurnRef.current += 1;
               userTurnRef.current += 1;
               helpKindRef.current = null;
               setHelpLoading(null);
               if (sourcesRef.current.length === 0 && !micPausedRef.current)
                 setCoachState(talkingRef.current ? "listening" : "idle");
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
      // A connection that opens after the learner cancelled closes right away.
      if (!life.register(attempt, releaseSession)) return;

      const micCtx = new AudioContext();
      micCtxRef.current = micCtx;
      await micCtx.resume().catch(() => undefined);
      if (cancelled()) {
        await abandon();
        return;
      }

      const micRate = micCtx.sampleRate;
      const source = micCtx.createMediaStreamSource(stream);
      const processor = micCtx.createScriptProcessor(4096, 1, 1);
      nodeRef.current = processor;
      processor.onaudioprocess = (event) => {
        // Push-to-talk: nothing (not even silence) is sent unless the learner
        // is holding the talk button.
        if (micPausedRef.current || !talkingRef.current) {
          setLevel(0);
          return;
        }
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
        const knownLevelPrompt = buildOpeningPrompt(coachContext);
        sessionRef.current.sendClientContent({
          turns: [{ role: "user", parts: [{ text: knownLevelPrompt }] }],
          turnComplete: true,
        });
      } catch {
        /* the learner can still speak first */
      }
    } catch (err) {
      console.error("[live-coach]", err);
      const wasCancelled = cancelled();
      await abandon();
      if (!wasCancelled) {
        setError(
          es
            ? "Necesitamos permiso del micrófono para hablar en vivo."
            : "We need microphone access to talk live.",
        );
      }
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
  const currentCoachText = transcript.question.trim();
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
            : talking
              ? (es ? "Te escucho… suelta para enviar" : "Listening… release to send")
              : (es ? "Tu turno. Mantén apretado para hablar." : "Your turn. Hold to talk.");

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
        {transcript.spanish ? (
          <p className="mt-3 rounded-xl bg-secondary px-3 py-2 text-[13px] leading-snug text-foreground">
            <span className="font-bold text-primary">{es ? "En español: " : "In Spanish: "}</span>
            {transcript.spanish}
          </p>
        ) : null}
        {transcript.idea ? (
          <p lang="en" className="mt-2 rounded-xl bg-secondary px-3 py-2 text-[13px] leading-snug text-foreground">
            <span className="font-bold text-primary">{es ? "Pista: " : "Hint: "}</span>
            {transcript.idea}
          </p>
        ) : null}
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

      <p className="mt-5 text-center text-[13px] font-medium text-muted-foreground">
        {micPaused
          ? (es ? "Micrófono en pausa. Actívalo para seguir." : "Microphone paused. Turn it on to continue.")
          : talking
            ? (es ? "Suelta para que Vale responda" : "Release and Vale will answer")
            : (es ? "Mantén apretado el micrófono mientras hablas" : "Hold the microphone while you speak")}
      </p>
      <div className="mt-2 flex items-center justify-center gap-5">
        <Button
          variant="outline"
          size="icon"
          onClick={() => void toggleMicrophone()}
          disabled={phase !== "live"}
          className="size-12 rounded-full bg-card"
          aria-label={micPaused ? (es ? "Activar micrófono" : "Turn on microphone") : (es ? "Pausar micrófono" : "Pause microphone")}
        >
          {micPaused ? <Mic aria-hidden /> : <MicOff aria-hidden />}
        </Button>
        <button
          type="button"
          disabled={phase !== "live" || micPaused}
          onPointerDown={(event) => {
            event.preventDefault();
            startTalking();
          }}
          onPointerUp={stopTalking}
          onPointerCancel={stopTalking}
          onPointerLeave={stopTalking}
          onContextMenu={(event) => event.preventDefault()}
          onKeyDown={(event) => {
            if (event.code === "Space" && !event.repeat) {
              event.preventDefault();
              startTalking();
            }
          }}
          onKeyUp={(event) => {
            if (event.code === "Space") {
              event.preventDefault();
              stopTalking();
            }
          }}
          className={cn(
            "flex size-20 touch-none items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[var(--shadow-card)] transition-transform select-none",
            talking && "scale-110 ring-4 ring-primary/30",
            (phase !== "live" || micPaused) && "opacity-50",
          )}
          aria-label={es ? "Mantén apretado para hablar" : "Hold to talk"}
          aria-pressed={talking}
        >
          <Mic className="size-8" aria-hidden />
        </button>
        <Button
          size="icon"
          onClick={() => void stop()}
          disabled={phase === "ending"}
          className="size-12 rounded-full bg-coach-end text-coach-end-foreground hover:bg-coach-end"
          aria-label={es ? "Terminar conversación" : "End conversation"}
        >
          {phase === "ending" ? <Loader2 className="animate-spin" aria-hidden /> : <PhoneOff aria-hidden />}
        </Button>
      </div>

      <Collapsible open={historyOpen} onOpenChange={setHistoryOpen} className="mt-3 border-t border-border pt-1">
        <CollapsibleTrigger asChild><Button variant="ghost" className="h-11 w-full justify-between px-1 text-[12px] text-muted-foreground"><span>{es ? "Ver conversación" : "View conversation"}</span><ChevronDown className={cn("transition-transform", historyOpen && "rotate-180")} aria-hidden /></Button></CollapsibleTrigger>
        <CollapsibleContent>
          <Conversation className="max-h-56 rounded-xl bg-secondary/60">
            <ConversationContent className="gap-3 p-3">
              {transcript.turns.map((line, index) => <Message key={`${line.id}-${index}`} from={line.role === "you" ? "user" : "assistant"}><span className="text-[11px] font-bold text-muted-foreground">{line.role === "you" ? (es ? "Tú" : "You") : "Vale"}</span><MessageContent className="text-[13px] leading-relaxed">{line.text}</MessageContent></Message>)}
            </ConversationContent>
            <ConversationScrollButton />
          </Conversation>
        </CollapsibleContent>
      </Collapsible>
      <p className="mt-2 text-center text-[11px] text-muted-foreground">{es ? "La conversación no se guarda. Solo contamos los minutos usados." : "The conversation is not saved. We only count the minutes used."}</p>
    </section>
  );
}
