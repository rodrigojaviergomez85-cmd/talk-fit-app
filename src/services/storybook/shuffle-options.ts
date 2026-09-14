import type { StorybookQuiz } from "./types";

export type ShuffledQuizOptions = {
  options: { label: string; emoji: string }[];
  answer: number;
};

/** Small deterministic string hash (FNV-1a style). */
function hash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Deterministic PRNG from a numeric seed (mulberry32). */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Reorders quiz options deterministically per episode + quiz so the correct
 * answer is not always first, while staying stable across replays.
 */
export function shuffleQuizOptions(episodeId: string, quiz: StorybookQuiz): ShuffledQuizOptions {
  const original = quiz.options;
  if (original.length < 2) return { options: [...original], answer: quiz.answer };

  const next = rng(hash(`${episodeId}::${quiz.id}::${original.length}`));
  const indices = original.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i -= 1) {
    const j = Math.floor(next() * (i + 1));
    const tmp = indices[i]!;
    indices[i] = indices[j]!;
    indices[j] = tmp;
  }

  return {
    options: indices.map((i) => original[i]!),
    answer: indices.indexOf(quiz.answer),
  };
}
