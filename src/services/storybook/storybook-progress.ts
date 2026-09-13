/**
 * Local record of storybook episodes the learner already finished.
 * Local-only by design: the story step is optional and never blocks practice.
 */

const KEY = "storybook.seen.v1";

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

export function isEpisodeSeen(episodeId: string): boolean {
  if (typeof window === "undefined") return false;
  return read().includes(episodeId);
}

export function markEpisodeSeen(episodeId: string): void {
  if (typeof window === "undefined") return;
  try {
    const seen = read();
    if (seen.includes(episodeId)) return;
    seen.push(episodeId);
    localStorage.setItem(KEY, JSON.stringify(seen));
  } catch {
    /* storage full or blocked — non-critical */
  }
}
