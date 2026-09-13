/**
 * Deterministic spoken matching for storybook "Ahora dilo tú" prompts.
 * No LLM, no curriculum profile — just flexible frame matching with a wildcard.
 * The `*` token in a target stands for "any word(s) the learner supplies in
 * that slot" (e.g. "My name is *" accepts "My name is Rodrigo" but rejects
 * only "Rodrigo").
 */

import { normalizeForCompare } from "./rep2-match";

export type StorySayStatus = "good" | "tryAgain";

export type StorySayResult = {
  status: StorySayStatus;
  /** Whether the fixed frame was found in the transcript. */
  matched: boolean;
};

const WILDCARD = "*";

/**
 * Check whether `targetWords` occurs as a contiguous token sequence inside
 * `transcriptWords`. Used for prompts without a wildcard slot.
 */
function containsContiguous(transcriptWords: string[], targetWords: string[]): boolean {
  if (targetWords.length === 0) return false;
  outer: for (let i = 0; i + targetWords.length <= transcriptWords.length; i++) {
    for (let k = 0; k < targetWords.length; k++) {
      if (transcriptWords[i + k]! !== targetWords[k]!) continue outer;
    }
    return true;
  }
  return false;
}

/**
 * Backtracking matcher for a target that may contain `*` wildcards.
 * Each `*` must consume at least one word. Leading/trailing filler is allowed.
 */
function matchFrame(transcriptWords: string[], targetWords: string[]): boolean {
  if (targetWords.length === 0) return transcriptWords.length > 0;

  function helper(t: number, w: number): boolean {
    if (t === targetWords.length) return true;
    if (w >= transcriptWords.length) return false;

    const tok = targetWords[t]!;
    if (tok === WILDCARD) {
      const remainingFixed = targetWords.slice(t + 1).filter((x) => x !== WILDCARD).length;
      const maxConsume = transcriptWords.length - w - remainingFixed;
      // Wildcard must consume at least one word and leave enough tokens for the
      // remaining fixed words.
      for (let consume = 1; consume <= maxConsume; consume++) {
        if (helper(t + 1, w + consume)) return true;
      }
      return false;
    }

    const idx = transcriptWords.indexOf(tok, w);
    if (idx === -1) return false;
    return helper(t + 1, idx + 1);
  }

  return helper(0, 0);
}

/**
 * Compare a storybook `sayItCheck.target` against the learner's transcript.
 *
 * Target rules:
 * - No `*` → exact contiguous phrase match (a couple of surrounding filler words
 *   are ignored at the start/end).
 * - One or more `*` → the fixed frame must appear in order; each `*` covers at
 *   least one spoken word in that slot.
 * - Empty or unrecognizable transcripts always return "tryAgain".
 */
export function compareStorySay(target: string, transcript: string): StorySayResult {
  const targetWords = normalizeForCompare(target).split(/\s+/).filter(Boolean);
  const transcriptWords = normalizeForCompare(transcript).split(/\s+/).filter(Boolean);

  if (targetWords.length === 0 || transcriptWords.length === 0) {
    return { status: "tryAgain", matched: false };
  }

  const hasWildcard = targetWords.includes(WILDCARD);
  const matched = hasWildcard
    ? matchFrame(transcriptWords, targetWords)
    : containsContiguous(transcriptWords, targetWords);

  return { status: matched ? "good" : "tryAgain", matched };
}

/** Export for tests / endpoint validation. */
export const STORY_SAY_WILDCARD = WILDCARD;
