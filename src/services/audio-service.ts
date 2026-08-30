/**
 * AudioService — model-voice playback abstraction.
 *
 * Primary: a natural American English AI voice generated on the server
 * (`/api/tts`) and played with an <audio> element, so speed changes are just
 * `playbackRate`. Fallback: the browser SpeechSynthesis voice, so practice
 * never blocks if generation fails.
 */

export type ModelVoice = "neutral" | "female" | "male";
type AudioVoice = "female" | "male";

export type SpeakOptions = {
  rate?: number;
  voice?: ModelVoice | undefined;
  onStart?: () => void;
  onEnd?: () => void;
  onBoundary?: (charIndex: number) => void;
};

function pickVoice(voice: ModelVoice): SpeechSynthesisVoice | undefined {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return undefined;
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (voices.length === 0) return undefined;
  const preferredNames =
    voice === "female"
      ? ["Samantha", "Google US English", "Karen", "Jenny"]
      : voice === "male"
        ? ["Daniel", "Alex", "Google UK English Male"]
        : ["Samantha", "Google US English", "Alex", "Daniel"];
  for (const name of preferredNames) {
    const match = voices.find((v) => v.name.includes(name));
    if (match) return match;
  }
  return voices.find((v) => v.lang === "en-US") ?? voices[0];
}

/** Cache of generated model audio, keyed by voice + text. */
const audioCache = new Map<string, Promise<string>>();
let currentAudio: HTMLAudioElement | null = null;

async function loadModelAudio(text: string, voice?: AudioVoice): Promise<string> {
  // v2: energetic voice instructions on the server — don't reuse v1 audio.
  const key = `v2::${voice ?? "neutral"}::${text}`;
  const cached = audioCache.get(key);
  if (cached) return cached;
  const promise = (async () => {
    const response = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice }),
    });
    if (!response.ok) throw new Error(`TTS ${response.status}`);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  })();
  audioCache.set(key, promise);
  promise.catch(() => audioCache.delete(key));
  return promise;
}

function speakWithBrowser(text: string, options: SpeakOptions): () => void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    options.onStart?.();
    const estimate = AudioService.estimateSeconds(text, options.rate ?? 1) * 1000;
    const timer = setTimeout(() => options.onEnd?.(), estimate);
    return () => clearTimeout(timer);
  }
  const synth = window.speechSynthesis;
  synth.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate ?? 1;
  utterance.pitch = 1;
  utterance.lang = "en-US";
  const selected = pickVoice(options.voice ?? "neutral");
  if (selected) utterance.voice = selected;
  utterance.onstart = () => options.onStart?.();
  utterance.onend = () => options.onEnd?.();
  utterance.onerror = () => options.onEnd?.();
  utterance.onboundary = (event) => options.onBoundary?.(event.charIndex);
  synth.speak(utterance);
  return () => synth.cancel();
}

export const AudioService = {
  isSupported(): boolean {
    return typeof window !== "undefined";
  },

  /** Estimated duration in seconds for a piece of model text at a given rate. */
  estimateSeconds(text: string, rate = 1): number {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.round((words / (150 * rate)) * 10) / 10;
  },

  speak(text: string, options: SpeakOptions = {}): () => void {
    if (typeof window === "undefined") return () => undefined;

    AudioService.stop();

    let cancelled = false;
    let stopFallback: (() => void) | null = null;
    let element: HTMLAudioElement | null = null;

    void loadModelAudio(text, options.voice === "female" || options.voice === "male" ? options.voice : undefined)
      .then((url) => {
        if (cancelled) return;
        const audio = new Audio(url);
        audio.playbackRate = options.rate ?? 1;
        audio.preservesPitch = true;
        element = audio;
        currentAudio = audio;
        audio.onplay = () => options.onStart?.();
        audio.onended = () => {
          if (currentAudio === audio) currentAudio = null;
          options.onEnd?.();
        };
        audio.onerror = () => {
          if (currentAudio === audio) currentAudio = null;
          options.onEnd?.();
        };
        void audio.play().catch(() => {
          if (cancelled) return;
          stopFallback = speakWithBrowser(text, options);
        });
      })
      .catch(() => {
        if (cancelled) return;
        stopFallback = speakWithBrowser(text, options);
      });

    return () => {
      cancelled = true;
      stopFallback?.();
      if (element) {
        element.pause();
        element.currentTime = 0;
        if (currentAudio === element) currentAudio = null;
      }
    };
  },

  stop() {
    if (typeof window === "undefined") return;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  },
};
