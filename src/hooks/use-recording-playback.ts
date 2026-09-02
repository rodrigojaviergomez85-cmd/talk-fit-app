import { useCallback, useSyncExternalStore } from "react";
import { registerAudioStopper, stopOtherAudio } from "@/lib/audio-bus";

/**
 * One shared audio element for the whole app: only one recording ever plays.
 * Audio files are fetched lazily — the URL resolver runs on first play only.
 * Supports play / pause / restart plus a light progress snapshot for
 * comparison players. Existing play/stop callers keep working unchanged.
 */

let audio: HTMLAudioElement | null = null;
let currentId: string | null = null;
let loadingId: string | null = null;
let failedId: string | null = null;
let paused = false;
let currentTime = 0;
let duration = 0;
const listeners = new Set<() => void>();
const urlCache = new Map<string, string>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

type Snapshot = {
  currentId: string | null;
  loadingId: string | null;
  failedId: string | null;
  paused: boolean;
  currentTime: number;
  duration: number;
};

let cached: Snapshot = { currentId: null, loadingId: null, failedId: null, paused: false, currentTime: 0, duration: 0 };
const SERVER: Snapshot = cached;

function snapshot(): Snapshot {
  if (
    cached.currentId !== currentId ||
    cached.loadingId !== loadingId ||
    cached.failedId !== failedId ||
    cached.paused !== paused ||
    cached.currentTime !== currentTime ||
    cached.duration !== duration
  ) {
    cached = { currentId, loadingId, failedId, paused, currentTime, duration };
  }
  return cached;
}

function ensureAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio();
    audio.preload = "none";
    audio.addEventListener("ended", () => {
      currentId = null;
      paused = false;
      currentTime = 0;
      emit();
    });
    audio.addEventListener("error", () => {
      failedId = currentId;
      currentId = null;
      paused = false;
      emit();
    });
    audio.addEventListener("timeupdate", () => {
      currentTime = Math.floor((audio?.currentTime ?? 0) * 4) / 4;
      emit();
    });
    audio.addEventListener("loadedmetadata", () => {
      const d = audio?.duration ?? 0;
      duration = Number.isFinite(d) ? d : 0;
      emit();
    });
  }
  return audio;
}

export function stopPlayback() {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  currentId = null;
  loadingId = null;
  paused = false;
  currentTime = 0;
  duration = 0;
  emit();
}

export function pausePlayback() {
  if (!audio || !currentId) return;
  audio.pause();
  paused = true;
  emit();
}

export function restartPlayback() {
  if (!audio || !currentId) return;
  audio.currentTime = 0;
  currentTime = 0;
  paused = false;
  void audio.play().catch(() => undefined);
  emit();
}

type Resolver = () => Promise<string | null> | string | null;

async function play(id: string, resolveUrl: Resolver) {
  // Resume when paused on the same recording.
  if (currentId === id && paused && audio) {
    paused = false;
    emit();
    try {
      await audio.play();
    } catch {
      currentId = null;
      emit();
    }
    return;
  }
  if (currentId === id) {
    stopPlayback();
    return;
  }
  stopPlayback();
  stopOtherAudio("recording");
  failedId = null;

  let url = urlCache.get(id) ?? null;
  if (!url) {
    loadingId = id;
    emit();
    try {
      url = (await resolveUrl()) ?? null;
    } catch {
      url = null;
    }
    loadingId = null;
    if (url) urlCache.set(id, url);
  }

  if (!url) {
    failedId = id;
    emit();
    return;
  }

  const el = ensureAudio();
  el.src = url;
  currentId = id;
  paused = false;
  emit();
  try {
    await el.play();
  } catch {
    currentId = null;
    failedId = id;
    emit();
  }
}

/** Play / stop state for one recording id, with lazy URL resolution. */
export function useRecordingPlayback(id: string) {
  const state = useSyncExternalStore(subscribe, snapshot, () => SERVER);
  const active = state.currentId === id;

  const toggle = useCallback((resolveUrl: Resolver) => void play(id, resolveUrl), [id]);
  const pause = useCallback(() => {
    if (currentId === id) pausePlayback();
  }, [id]);
  const restart = useCallback(() => {
    if (currentId === id) restartPlayback();
  }, [id]);

  return {
    /** Recording is loaded in the player (playing or paused). */
    active,
    /** Actively producing sound. */
    playing: active && !state.paused,
    paused: active && state.paused,
    loading: state.loadingId === id,
    failed: state.failedId === id,
    currentTime: active ? state.currentTime : 0,
    duration: active ? state.duration : 0,
    toggle,
    pause,
    restart,
    stop: stopPlayback,
  };
}

if (typeof window !== "undefined") {
  registerAudioStopper("recording", () => stopPlayback());
}
