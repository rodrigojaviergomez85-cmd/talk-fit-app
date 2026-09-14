import { useEffect } from "react";

/**
 * Tracks whether the learner is in the middle of something that must not be
 * interrupted (a story, a recording, a graded question). The auto-update
 * watcher waits for this to be free before reloading the page.
 */
let locks = 0;
const listeners = new Set<(busy: boolean) => void>();

function emit() {
  const busy = locks > 0;
  for (const listener of listeners) listener(busy);
}

export function isActivityBusy(): boolean {
  return locks > 0;
}

export function acquireActivityLock(): () => void {
  locks += 1;
  emit();
  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks = Math.max(0, locks - 1);
    emit();
  };
}

export function subscribeActivity(listener: (busy: boolean) => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Holds the lock while `active` is true (and always releases on unmount). */
export function useActivityLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    const release = acquireActivityLock();
    return release;
  }, [active]);
}

/** Test helper: forget every lock. */
export function resetActivityLocks() {
  locks = 0;
  emit();
}
