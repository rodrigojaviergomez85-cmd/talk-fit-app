/**
 * AudioService — model-voice playback abstraction.
 *
 * Primary: a natural American English AI voice generated on the server
 * (`/api/tts`) and played with an <audio> element, so speed changes are just
 * `playbackRate`. Fallback: the browser SpeechSynthesis voice, so practice
 * never blocks if generation fails.
 */

import { registerAudioStopper, stopOtherAudio } from "@/lib/audio-bus";
import type { ModelTone } from "@/lib/model-tone";

export type ModelVoice = "neutral" | "female" | "femaleBright" | "femaleMature" | "male" | "girl" | "boss" | "youngMale" | "youngMaleCalm" | "shyBoy" | "teenBoy" | "elder";
type AudioVoice = ModelVoice;

export type SpeakOptions = {
  rate?: number;
  voice?: ModelVoice | undefined;
  /** Delivery tone: coach (default), neutral (recruiter), tense (frustrated customer). */
  tone?: ModelTone | undefined;
  onStart?: () => void;
  onEnd?: () => void;
  onBoundary?: (charIndex: number) => void;
  /** Playback position updates, in seconds. duration is 0 when unknown. */
  onProgress?: (current: number, duration: number) => void;
  /** Audio could not be produced or played at all. */
  onError?: () => void;
  /** Browser speech is noticeably robotic; story dialogue disables this fallback. */
  allowBrowserFallback?: boolean;
};

function pickVoice(voice: ModelVoice): SpeechSynthesisVoice | undefined {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return undefined;
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (voices.length === 0) return undefined;
  const preferredNames =
    voice === "female" || voice === "femaleBright" || voice === "femaleMature" || voice === "girl"
      ? ["Samantha", "Google US English", "Karen", "Jenny"]
      : voice === "male" || voice === "boss" || voice === "youngMale" || voice === "youngMaleCalm" || voice === "shyBoy" || voice === "teenBoy" || voice === "elder"
        ? ["Daniel", "Alex", "Google UK English Male"]
        : ["Samantha", "Google US English", "Alex", "Daniel"];
  for (const name of preferredNames) {
    const match = voices.find((v) => v.name.includes(name));
    if (match) return match;
  }
  return voices.find((v) => v.lang === "en-US") ?? voices[0];
}

/** Session cache of model audio, keyed by tone + voice + text. Persistent storage lives server-side. */
const audioCache = new Map<string, Promise<string>>();
let currentAudio: HTMLAudioElement | null = null;
/** Cancels the latest in-flight speak() (model clip still downloading or playing). */
let latestSpeakCancel: (() => void) | null = null;

/** Current learner access token, or null when signed out. Never throws. */
async function currentAccessToken(): Promise<string | null> {
  try {
    const { getFreshSession } = await import("@/lib/session-keeper");
    const { data } = await getFreshSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

/** Force one token renewal after the voice endpoint rejects an otherwise present session. */
async function refreshedAccessToken(): Promise<string | null> {
  try {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.auth.refreshSession();
    return data.session?.access_token ?? null;
  } catch {
    return null;
  }
}

/** When the learner has no session, skip /api/tts for a while instead of hammering it. */
let noSessionUntil = 0;
const NO_SESSION_BACKOFF_MS = 30_000;

/**
 * Browser Cache Storage bucket for generated clips. This is the temporary cache
 * the browser evicts on its own when it needs space — nothing is stored forever.
 */
const TTS_CACHE = "tts-v7";

function cacheRequestUrl(key: string): string {
  return `https://tts.cache.local/${encodeURIComponent(key)}`;
}

async function readCachedBlob(key: string): Promise<Blob | null> {
  try {
    if (typeof caches === "undefined") return null;
    const cache = await caches.open(TTS_CACHE);
    const hit = await cache.match(cacheRequestUrl(key));
    return hit ? await hit.blob() : null;
  } catch {
    return null;
  }
}

async function writeCachedBlob(key: string, blob: Blob): Promise<void> {
  try {
    if (typeof caches === "undefined") return;
    const cache = await caches.open(TTS_CACHE);
    await cache.put(cacheRequestUrl(key), new Response(blob, { headers: { "Content-Type": blob.type || "audio/mpeg" } }));
  } catch {
    // Quota or private-mode failures are harmless: playback still works from network.
  }
}

class TtsRequestError extends Error {
  constructor(readonly status: number) {
    super(`TTS ${status}`);
  }
}

async function fetchClip(text: string, voice: AudioVoice | undefined, tone: ModelTone, token: string): Promise<Blob> {
  const response = await fetch("/api/tts", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ text, voice: voice ?? "neutral", tone }),
  });
  if (!response.ok) throw new TtsRequestError(response.status);
  return response.blob();
}

async function loadModelAudio(text: string, voice?: AudioVoice, tone: ModelTone = "coach"): Promise<string> {
  // v7: Dani and Vale's mother have their own voices; never reuse older shared-voice clips.
  const key = `v7::${tone}::${voice ?? "neutral"}::${text}`;
  const cached = audioCache.get(key);
  if (cached) return cached;
  const promise = (async () => {
    const stored = await readCachedBlob(key);
    if (stored && stored.size > 0) return URL.createObjectURL(stored);
    if (Date.now() < noSessionUntil) throw new Error("TTS no session");
    const token = await currentAccessToken();
    if (!token) {
      noSessionUntil = Date.now() + NO_SESSION_BACKOFF_MS;
      throw new Error("TTS no session");
    }
    let blob: Blob;
    try {
      blob = await fetchClip(text, voice, tone, token);
    } catch (error) {
      if (error instanceof TtsRequestError && error.status === 401) {
        const renewedToken = await refreshedAccessToken();
        if (!renewedToken) {
          noSessionUntil = Date.now() + NO_SESSION_BACKOFF_MS;
          throw error;
        }
        blob = await fetchClip(text, voice, tone, renewedToken);
        void writeCachedBlob(key, blob);
        return URL.createObjectURL(blob);
      }
      // One silent retry: a single flaky mobile request should not break the voice.
      if (Date.now() < noSessionUntil) throw error;
      blob = await fetchClip(text, voice, tone, token);
    }
    void writeCachedBlob(key, blob);
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
  // Keep Vale's fallback delivery natural while giving it a gently youthful lift.
  utterance.rate = options.rate ?? 1;
  utterance.pitch = options.voice === "girl" ? 1.2 : options.voice === "femaleBright" ? 1.1 : options.voice === "femaleMature" ? 0.96 : options.voice === "shyBoy" ? 1.15 : options.voice === "teenBoy" ? 1.12 : options.voice === "elder" ? 0.92 : options.voice === "youngMaleCalm" ? 1.12 : options.voice === "youngMale" ? 1.08 : 1;
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

  /**
   * Downloads a clip ahead of time so it plays with no gap. Never throws and
   * never interrupts what is currently playing.
   */
  async prefetch(text: string, voice?: ModelVoice, tone: ModelTone = "coach"): Promise<void> {
    if (typeof window === "undefined" || !text.trim()) return;
    try {
      await loadModelAudio(text, voice, tone);
    } catch {
      // Prefetch is best-effort; playback will retry when the line is reached.
    }
  },

  speak(text: string, options: SpeakOptions = {}): () => void {
    if (typeof window === "undefined") return () => undefined;

    AudioService.stop();
    stopOtherAudio("model");

    let cancelled = false;
    let stopFallback: (() => void) | null = null;
    let element: HTMLAudioElement | null = null;

    void loadModelAudio(
      text,
      options.voice,
      // Vale's voice always carries her sweet youthful delivery, even when no tone is passed.
      options.tone ?? (options.voice === "girl" ? "playful" : "coach"),
    )
      .then((url) => {
        if (cancelled) return;
        const audio = new Audio(url);
        audio.playbackRate = options.rate ?? 1;
        audio.preservesPitch = true;
        element = audio;
        currentAudio = audio;
        audio.onplay = () => options.onStart?.();
        audio.ontimeupdate = () => {
          options.onProgress?.(audio.currentTime, Number.isFinite(audio.duration) ? audio.duration : 0);
        };
        audio.onloadedmetadata = () => {
          options.onProgress?.(0, Number.isFinite(audio.duration) ? audio.duration : 0);
        };
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
          if (options.allowBrowserFallback !== false && typeof window !== "undefined" && "speechSynthesis" in window) {
            stopFallback = speakWithBrowser(text, options);
          } else {
            options.onError?.();
            options.onEnd?.();
          }
        });
      })
      .catch(() => {
        if (cancelled) return;
        if (options.allowBrowserFallback !== false && typeof window !== "undefined" && "speechSynthesis" in window) {
          stopFallback = speakWithBrowser(text, options);
        } else {
          options.onError?.();
          options.onEnd?.();
        }
      });

    const cancel = () => {
      cancelled = true;
      if (latestSpeakCancel === cancel) latestSpeakCancel = null;
      stopFallback?.();
      if (element) {
        element.pause();
        element.currentTime = 0;
        if (currentAudio === element) currentAudio = null;
      }
    };
    latestSpeakCancel = cancel;
    return cancel;
  },

  /** True while model/TTS audio is actively playing (read-only, never interrupts). */
  isPlaying(): boolean {
    if (typeof window === "undefined") return false;
    if (currentAudio && !currentAudio.paused && !currentAudio.ended) return true;
    return "speechSynthesis" in window && window.speechSynthesis.speaking && !window.speechSynthesis.paused;
  },

  /** Pauses playback in place. Returns true when something was paused. */
  pause(): boolean {
    if (typeof window === "undefined") return false;
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      return true;
    }
    if ("speechSynthesis" in window && window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
      return true;
    }
    return false;
  },

  /** Resumes paused playback. Returns true when something resumed. */
  resume(): boolean {
    if (typeof window === "undefined") return false;
    if (currentAudio && currentAudio.paused) {
      stopOtherAudio("model");
      void currentAudio.play().catch(() => undefined);
      return true;
    }
    if ("speechSynthesis" in window && window.speechSynthesis.paused) {
      stopOtherAudio("model");
      window.speechSynthesis.resume();
      return true;
    }
    return false;
  },

  stop() {
    if (typeof window === "undefined") return;
    // Cancel an in-flight speak() so a still-downloading clip never starts later.
    latestSpeakCancel?.();
    latestSpeakCancel = null;
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  },
};

if (typeof window !== "undefined") {
  registerAudioStopper("model", () => AudioService.stop());
}

if (typeof document !== "undefined") {
  // Coming back from the background can leave a stuck speech-synthesis queue,
  // which is what made audio sound broken until the app was closed and reopened.
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") return;
    noSessionUntil = 0;
    if (typeof window !== "undefined" && "speechSynthesis" in window && !AudioService.isPlaying()) {
      window.speechSynthesis.cancel();
    }
  });
}
