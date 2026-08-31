import { useCallback, useSyncExternalStore } from "react";
import { registerAudioStopper, stopOtherAudio } from "@/lib/audio-bus";

/**
 * One shared audio element for the whole app: only one recording ever plays.
 * Audio files are fetched lazily — the URL resolver runs on first play only.
 */

let audio: HTMLAudioElement | null = null;
let currentId: string | null = null;
let loadingId: string | null = null;
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

function snapshot() {
  return `${currentId ?? ""}|${loadingId ?? ""}`;
}

function ensureAudio(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio();
    audio.addEventListener("ended", () => {
      currentId = null;
      emit();
    });
    audio.addEventListener("error", () => {
      currentId = null;
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
  emit();
}

async function play(id: string, resolveUrl: () => Promise<string | null> | string | null) {
  if (currentId === id) {
    stopPlayback();
    return;
  }
  stopPlayback();
  stopOtherAudio("recording");

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
    emit();
    return;
  }

  const el = ensureAudio();
  el.src = url;
  currentId = id;
  emit();
  try {
    await el.play();
  } catch {
    currentId = null;
    emit();
  }
}

/** Play / stop state for one recording id, with lazy URL resolution. */
export function useRecordingPlayback(id: string) {
  const state = useSyncExternalStore(subscribe, snapshot, () => "|");
  const [playingId, pendingId] = state.split("|");

  const toggle = useCallback(
    (resolveUrl: () => Promise<string | null> | string | null) => {
      void play(id, resolveUrl);
    },
    [id],
  );

  return { playing: playingId === id, loading: pendingId === id, toggle, stop: stopPlayback };
}

if (typeof window !== "undefined") {
  registerAudioStopper("recording", () => stopPlayback());
}
