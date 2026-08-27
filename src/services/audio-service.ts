/**
 * AudioService — model-voice playback abstraction.
 *
 * MVP: browser SpeechSynthesis with one clear, neutral English voice.
 * Later: swap `speak()` for a TTS API (male/female/accent variants) without
 * touching the components — they only use this interface.
 */

export type ModelVoice = "neutral" | "female" | "male";

export type SpeakOptions = {
  rate?: number;
  voice?: ModelVoice;
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

export const AudioService = {
  isSupported(): boolean {
    return typeof window !== "undefined" && "speechSynthesis" in window;
  },

  /** Estimated duration in seconds for a piece of model text at a given rate. */
  estimateSeconds(text: string, rate = 1): number {
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    return Math.round((words / (150 * rate)) * 10) / 10;
  },

  speak(text: string, options: SpeakOptions = {}): () => void {
    if (!AudioService.isSupported()) {
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
  },

  stop() {
    if (AudioService.isSupported()) window.speechSynthesis.cancel();
  },
};
