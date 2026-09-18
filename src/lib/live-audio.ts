/** Scheduling constants for streamed 24 kHz PCM voice playback. */
export const LIVE_AUDIO_SAMPLE_RATE = 24_000;
export const LIVE_AUDIO_START_LEAD_SECONDS = 0.04;
export const LIVE_AUDIO_EDGE_FADE_SECONDS = 0.003;

/**
 * Keeps streamed chunks contiguous while leaving enough lead time for the
 * phone's audio output to start. The small overlap is hidden by edge fades.
 */
export function nextLiveAudioWindow(
  currentTime: number,
  playHead: number,
  duration: number,
): { startAt: number; endAt: number; fadeSeconds: number } {
  const safeDuration = Math.max(0, duration);
  const fadeSeconds = Math.min(LIVE_AUDIO_EDGE_FADE_SECONDS, safeDuration / 4);
  const firstStart = currentTime + LIVE_AUDIO_START_LEAD_SECONDS;
  const startAt = playHead > currentTime
    ? Math.max(currentTime, playHead - fadeSeconds)
    : firstStart;

  return {
    startAt,
    endAt: startAt + safeDuration,
    fadeSeconds,
  };
}