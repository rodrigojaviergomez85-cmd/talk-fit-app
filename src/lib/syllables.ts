/**
 * Lightweight English syllable splitter.
 *
 * Heuristic, not a dictionary: it is used only as a *pronunciation aid* so the
 * learner can hear a hard word piece by piece. Splits are conservative — when
 * unsure we keep the word whole rather than inventing a wrong break.
 */

const VOWELS = "aeiouy";

function isVowel(ch: string): boolean {
  return VOWELS.includes(ch);
}

/** Split a single alphabetic word (lowercase-insensitive) into syllable pieces. */
export function splitSyllables(word: string): string[] {
  const clean = word.replace(/[^A-Za-z']/g, "");
  if (clean.length <= 3) return [word];

  const lower = clean.toLowerCase();
  const chars = lower.split("");

  // Mark vowel groups.
  const groups: Array<{ start: number; end: number }> = [];
  let i = 0;
  while (i < chars.length) {
    if (isVowel(chars[i]!)) {
      const start = i;
      while (i < chars.length && isVowel(chars[i]!)) i += 1;
      groups.push({ start, end: i - 1 });
    } else {
      i += 1;
    }
  }

  // Silent final "e" (e.g. "make", "phone") is not its own syllable.
  if (groups.length > 1) {
    const last = groups[groups.length - 1]!;
    if (last.start === last.end && lower[last.start] === "e" && last.end === chars.length - 1) {
      groups.pop();
    }
  }

  if (groups.length <= 1) return [word];

  // Cut points sit inside the consonant run between two vowel groups.
  const cuts: number[] = [];
  for (let g = 0; g < groups.length - 1; g += 1) {
    const endVowel = groups[g]!.end;
    const nextVowel = groups[g + 1]!.start;
    const consonants = nextVowel - endVowel - 1;
    let cut: number;
    if (consonants <= 0) cut = nextVowel; // vowel-vowel: split between them
    else if (consonants === 1) cut = nextVowel; // V-CV
    else cut = endVowel + 1 + Math.floor(consonants / 2); // VC-CV
    if (cut > 0 && cut < chars.length) cuts.push(cut);
  }

  const pieces: string[] = [];
  let prev = 0;
  for (const cut of cuts) {
    if (cut <= prev) continue;
    pieces.push(clean.slice(prev, cut));
    prev = cut;
  }
  pieces.push(clean.slice(prev));

  // Never produce empty or single-consonant fragments.
  const merged: string[] = [];
  for (const piece of pieces) {
    const hasVowel = piece.split("").some((c) => isVowel(c.toLowerCase()));
    if (!hasVowel && merged.length > 0) merged[merged.length - 1] += piece;
    else if (!hasVowel) merged.push(piece);
    else merged.push(piece);
  }

  return merged.filter(Boolean).length > 1 ? merged.filter(Boolean) : [word];
}

/** Split a sentence into word / separator tokens, preserving punctuation. */
export function tokenizeWords(text: string): Array<{ value: string; isWord: boolean }> {
  return text
    .split(/(\s+|[.,!?;:"()¿¡]+)/)
    .filter((part) => part !== "")
    .map((part) => ({ value: part, isWord: /[A-Za-z]/.test(part) }));
}
