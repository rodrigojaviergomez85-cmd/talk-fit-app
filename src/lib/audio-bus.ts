/**
 * Audio bus — guarantees a single sound at a time across the app.
 * Every player registers a stop function; starting one stops the others.
 */

const stoppers = new Map<string, () => void>();

export function registerAudioStopper(id: string, stop: () => void): () => void {
  stoppers.set(id, stop);
  return () => {
    if (stoppers.get(id) === stop) stoppers.delete(id);
  };
}

/** Stops every registered audio source except the one starting playback. */
export function stopOtherAudio(id: string) {
  for (const [key, stop] of stoppers) {
    if (key !== id) stop();
  }
}
