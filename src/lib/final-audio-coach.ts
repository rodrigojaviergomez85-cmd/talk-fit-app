/**
 * Client-safe helpers for the STEP 5 Final Audio Coach metadata.
 * The coach itself runs server-side (see final-audio-coach.server.ts).
 */
import type { CourseDay } from "./types";

/**
 * Resolves which Rep 5 turn a take answered, ONE-BASED.
 *  - null                → classic STEP 5 (rep5Prompt)
 *  - n                   → rep5Turns[n - 1]
 * Retry slots carry the local label `turn:<zeroBasedIndex>`; that index is the
 * source of truth for which turn is being retried, whatever the take number is.
 */
export function sourceTurnNumberFor(
  day: Pick<CourseDay, "rep5Turns">,
  takeIndex: number,
  label?: string | null,
): number | null {
  const turns = day.rep5Turns;
  if (!turns || turns.length === 0) return null;
  const fromLabel = /^turn:(\d+)$/.exec(label ?? "");
  if (fromLabel) {
    const idx = Number(fromLabel[1]);
    if (Number.isInteger(idx) && idx >= 0 && idx < turns.length) return idx + 1;
  }
  if (takeIndex >= 0 && takeIndex < turns.length) return takeIndex + 1;
  return null;
}
