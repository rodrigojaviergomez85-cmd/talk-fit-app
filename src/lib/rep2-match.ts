/**
 * GENERIC deterministic comparison engine for spoken correction.
 * No LLM, no module grammar knowledge — pedagogy comes from a
 * `Rep2CorrectionProfile` (see rep2-correction-profiles.ts). Compares the learner's transcript to the curriculum target and
 * returns one of three internal outcomes:
 *  - good           → matches the target
 *  - correct        → speech was clear but differs from the target
 *  - asr_uncertain  → the TRANSCRIPTION itself is unusable (low confidence,
 *                     no speech, empty / truncated) — the only case that
 *                     justifies a second, more expensive STT pass.
 */

import {
  GENERIC_PROFILE,
  type CorrectionFocusRule,
  type Rep2CorrectionProfile,
} from "@/lib/rep2-correction-profiles";

export type Rep2Outcome = "good" | "correct" | "asr_uncertain";
/** Outcome shape exposed to the browser. */
export type Rep2PublicStatus = "good" | "correct" | "uncertain";

export type Rep2MatchResult = {
  status: Rep2Outcome;
  /** Word or short phrase to highlight as the correction focus. */
  focus?: string | undefined;
  /** The corrected target line (same as target, focus can be highlighted inside it). */
  correction: string;
  /** Should the learner be offered another recording attempt? */
  retryRecommended: boolean;
  /**
   * QA / monitoring only: GOOD granted through the long-sentence tolerance
   * (1–2 harmless differences) rather than an exact match. Never exposed to
   * the learner and never returned in the public browser response.
   */
  nearMatch?: boolean;
};

export type Rep2Confidence = {
  /** Average log-probability from Whisper segments. */
  avgLogprob: number;
  /** Probability that the segment contains no speech. */
  noSpeechProb: number;
};

export function toPublicStatus(status: Rep2Outcome): Rep2PublicStatus {
  return status === "asr_uncertain" ? "uncertain" : status;
}

type DiffOp =
  | { type: "match"; word: string }
  | { type: "missing"; word: string; index: number }
  | { type: "extra"; word: string; index: number }
  | { type: "replace"; target: string; got: string; index: number };

/** Confidence thresholds (tunable by QA). Below these the ASR is unusable. */
const AVG_LOGPROB_THRESHOLD = -0.7;
const NO_SPEECH_THRESHOLD = 0.5;

/** Absolute cap: near-match GOOD never forgives more than this many differences. */
const NEAR_MATCH_MAX_MISMATCHES = 2;

/**
 * Safety rule for the near-match tolerance — NOT a grammar engine. Dropping or
 * replacing one of these target words can reverse meaning or break the
 * structure ("would not" → "would"), so such attempts stay CORRECT.
 * Intentionally tiny.
 */
const PROTECTED_NEAR_MATCH_WORDS = new Set([
  "not",
  "never",
  "no",
  "am",
  "is",
  "are",
  "was",
  "were",
  "do",
  "does",
  "did",
  "have",
  "has",
  "had",
  "will",
  "would",
  "could",
  "should",
  "must",
  "can",
]);

const NUMBER_WORDS: Record<string, string> = {
  "0": "zero",
  "1": "one",
  "2": "two",
  "3": "three",
  "4": "four",
  "5": "five",
  "6": "six",
  "7": "seven",
  "8": "eight",
  "9": "nine",
  "10": "ten",
  "11": "eleven",
  "12": "twelve",
  "13": "thirteen",
  "14": "fourteen",
  "15": "fifteen",
  "16": "sixteen",
  "17": "seventeen",
  "18": "eighteen",
  "19": "nineteen",
  "20": "twenty",
  "30": "thirty",
  "40": "forty",
  "50": "fifty",
  "60": "sixty",
  "70": "seventy",
  "80": "eighty",
  "90": "ninety",
};

/**
 * Speaking-first principle: writing-only differences (punctuation, casing,
 * hyphenation of known compounds) must never count as a speaking error.
 * Conservative alias map — we only join hyphens for known compounds, never
 * merge arbitrary word pairs.
 */
const HYPHEN_ALIASES: Record<string, string> = {
  "co-worker": "coworker",
  "e-mail": "email",
  "on-line": "online",
  "week-end": "weekend",
  "week-ends": "weekends",
  "home-work": "homework",
  "some-one": "someone",
  "any-one": "anyone",
  "every-one": "everyone",
  "some-thing": "something",
  "any-thing": "anything",
  "every-thing": "everything",
  "day-care": "daycare",
  "check-list": "checklist",
  "voice-mail": "voicemail",
  "note-book": "notebook",
  "co-workers": "coworkers",
  "e-mails": "emails",
};

function applyHyphenAliases(text: string): string {
  let out = text;
  for (const [variant, canonical] of Object.entries(HYPHEN_ALIASES)) {
    out = out.split(variant).join(canonical);
    // also accept the spaced spelling of the same known compound
    out = out.split(variant.replace("-", " ")).join(canonical);
  }
  return out;
}

function normalize(text: string): string {
  return applyHyphenAliases(
    text
      .toLowerCase()
      .replace(/[\u2018\u2019\u02bc\u2032]/g, "'")
      .replace(/[\u201c\u201d]/g, '"'),
  )
    .replace(/[^\w\s'-]/g, " ")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}


function expandContractions(text: string): string {
  return text
    .replace(/\bi'm\b/g, "i am")
    .replace(/\bi'll\b/g, "i will")
    .replace(/\bi've\b/g, "i have")
    .replace(/\bi'd\b/g, "i would")
    .replace(/\byou're\b/g, "you are")
    .replace(/\byou'll\b/g, "you will")
    .replace(/\byou've\b/g, "you have")
    .replace(/\byou'd\b/g, "you would")
    .replace(/\bhe's\b/g, "he is")
    .replace(/\bhe'll\b/g, "he will")
    .replace(/\bshe's\b/g, "she is")
    .replace(/\bshe'll\b/g, "she will")
    .replace(/\bit's\b/g, "it is")
    .replace(/\bit'll\b/g, "it will")
    .replace(/\bwe're\b/g, "we are")
    .replace(/\bwe'll\b/g, "we will")
    .replace(/\bwe've\b/g, "we have")
    .replace(/\bthey're\b/g, "they are")
    .replace(/\bthey'll\b/g, "they will")
    .replace(/\bthey've\b/g, "they have")
    .replace(/\bdon't\b/g, "do not")
    .replace(/\bdoesn't\b/g, "does not")
    .replace(/\bdidn't\b/g, "did not")
    .replace(/\bwon't\b/g, "will not")
    .replace(/\bwouldn't\b/g, "would not")
    .replace(/\bcouldn't\b/g, "could not")
    .replace(/\bshouldn't\b/g, "should not")
    .replace(/\bcan't\b/g, "can not")
    .replace(/\bisn't\b/g, "is not")
    .replace(/\baren't\b/g, "are not")
    .replace(/\bwasn't\b/g, "was not")
    .replace(/\bweren't\b/g, "were not")
    .replace(/\bhaven't\b/g, "have not")
    .replace(/\bhasn't\b/g, "has not")
    .replace(/\bhadn't\b/g, "had not");
}

/** Spoken form of 0–99: "22" → "twenty two" (hyphens are already spaces after normalize). */
function numberToWords(word: string): string | undefined {
  if (NUMBER_WORDS[word]) return NUMBER_WORDS[word];
  if (!/^\d{2}$/.test(word)) return undefined;
  const tens = NUMBER_WORDS[`${word[0]}0`];
  const ones = NUMBER_WORDS[word[1]!];
  if (!tens || !ones || word[1] === "0") return undefined;
  return `${tens} ${ones}`;
}

function expandNumbers(text: string): string {
  return text
    .split(/\s+/)
    .map((word) => numberToWords(word) ?? word)
    .join(" ");
}

export function normalizeForCompare(text: string): string {
  return expandNumbers(expandContractions(normalize(text)));
}

function tokenize(text: string): string[] {
  return normalizeForCompare(text).split(/\s+/).filter(Boolean);
}

function wordDiff(targetWords: string[], transcriptWords: string[]): DiffOp[] {
  const m = targetWords.length;
  const n = transcriptWords.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const match = targetWords[i] === transcriptWords[j];
      dp[i]![j]! = match
        ? (dp[i + 1]?.[j + 1] ?? 0) + 1
        : Math.max(dp[i + 1]?.[j] ?? 0, dp[i]?.[j + 1] ?? 0);
    }
  }

  const raw: Array<{ type: "delete" | "insert" | "match"; word: string }> = [];
  let i = 0;
  let j = 0;
  while (i < m || j < n) {
    if (i < m && j < n && targetWords[i] === transcriptWords[j]) {
      raw.push({ type: "match", word: targetWords[i]! });
      i++;
      j++;
    } else if (j < n && (i >= m || (dp[i]?.[j + 1] ?? 0) >= (dp[i + 1]?.[j] ?? 0))) {
      raw.push({ type: "insert", word: transcriptWords[j]! });
      j++;
    } else if (i < m) {
      raw.push({ type: "delete", word: targetWords[i]! });
      i++;
    }
  }

  // Compress consecutive deletes/inserts into replacements where possible.
  const ops: DiffOp[] = [];
  let deletes: string[] = [];
  let inserts: string[] = [];
  const flush = () => {
    while (deletes.length || inserts.length) {
      const d = deletes.shift();
      const ins = inserts.shift();
      if (d && ins) {
        ops.push({ type: "replace", target: d, got: ins, index: 0 });
      } else if (d) {
        ops.push({ type: "missing", word: d, index: 0 });
      } else if (ins) {
        ops.push({ type: "extra", word: ins, index: 0 });
      }
    }
  };
  for (const op of raw) {
    if (op.type === "delete") {
      deletes.push(op.word);
    } else if (op.type === "insert") {
      inserts.push(op.word);
    } else {
      flush();
      ops.push({ type: "match", word: op.word });
    }
  }
  flush();
  return ops;
}

function opTargetWord(op: DiffOp): string | undefined {
  if (op.type === "missing") return op.word;
  if (op.type === "replace") return op.target;
  return undefined;
}

/** Does `phrase` occur as a contiguous token sequence in `words`? */
function containsPhrase(words: string[], phrase: string[]): boolean {
  if (phrase.length === 0) return false;
  outer: for (let i = 0; i + phrase.length <= words.length; i++) {
    for (let k = 0; k < phrase.length; k++) {
      if (words[i + k] !== phrase[k]) continue outer;
    }
    return true;
  }
  return false;
}

function ruleMatches(rule: CorrectionFocusRule, missed: Set<string>, targetWords: string[]): boolean {
  if (!containsPhrase(targetWords, rule.phrase)) return false;
  const trigger = rule.trigger ?? rule.phrase;
  return trigger.some((t) => missed.has(t));
}

function ruleLabel(rule: CorrectionFocusRule): string {
  return rule.label ?? rule.phrase.join(" ").toUpperCase();
}

/**
 * Pick at most ONE correction focus. Generic priority:
 *  1. the first configured high-value structure (from the profile) the learner dropped/changed,
 *  1b. one obvious word-form replacement allowed by the profile (e.g. work → works),
 *  2. otherwise, if there is exactly one isolated difference, that word,
 *  3. otherwise no focus — the UI shows the whole target line instead.
 */
function pickFocus(
  mismatches: DiffOp[],
  targetWords: string[],
  profile: Rep2CorrectionProfile,
): string | undefined {
  if (!profile.allowSpecificFocus) return undefined;
  if (profile.maxMismatchesForFocus !== undefined && mismatches.length > profile.maxMismatchesForFocus) {
    return undefined;
  }
  const missed = new Set(mismatches.map(opTargetWord).filter((w): w is string => Boolean(w)));
  for (const rule of profile.focusRules) {
    if (ruleMatches(rule, missed, targetWords)) return ruleLabel(rule);
  }
  if (profile.formChecks?.length) {
    const hits = mismatches.filter(
      (m): m is Extract<DiffOp, { type: "replace" }> =>
        m.type === "replace" && profile.formChecks!.some((check) => check(m.target, m.got)),
    );
    if (hits.length === 1) return hits[0]!.target.toUpperCase();
  }
  if (mismatches.length === 1) {
    const word = opTargetWord(mismatches[0]!);
    return word ? word.toUpperCase() : undefined;
  }
  return undefined;
}

export function compareRep2(
  target: string,
  transcript: string,
  confidence?: Rep2Confidence,
  profile: Rep2CorrectionProfile = GENERIC_PROFILE,
): Rep2MatchResult {
  const targetWords = tokenize(target);
  const transcriptWords = tokenize(transcript);

  // --- A. ASR uncertainty: the transcription itself is unusable. ---
  if (confidence && (confidence.avgLogprob < AVG_LOGPROB_THRESHOLD || confidence.noSpeechProb > NO_SPEECH_THRESHOLD)) {
    return { status: "asr_uncertain", correction: target, retryRecommended: true };
  }
  if (transcriptWords.length === 0) {
    return { status: "asr_uncertain", correction: target, retryRecommended: true };
  }
  // NOTE: a short transcript is NOT ASR uncertainty. If confidence is good and the
  // learner simply said too little, that is a learner-output problem → "correct".

  // --- B. Speech is clear: compare against the target. ---
  const ops = wordDiff(targetWords, transcriptWords);
  const mismatches = ops.filter((o) => o.type !== "match");

  if (mismatches.length === 0) {
    return { status: "good", correction: target, retryRecommended: false };
  }

  // --- C. Long-sentence tolerance (higher-level profiles only). ---
  // Forgives at most 1–2 harmless differences on long targets; never a
  // protected word or a configured focus structure. BASIC profiles leave
  // `maxWordErrorRateForGood` unset and skip this tier entirely.
  if (isNearMatchGood(mismatches, targetWords, profile)) {
    return { status: "good", correction: target, retryRecommended: false, nearMatch: true };
  }

  // Clear but different (slightly or completely): one correction, never a second STT pass.
  return {
    status: "correct",
    correction: target,
    focus: pickFocus(mismatches, targetWords, profile),
    retryRecommended: true,
  };
}

function isNearMatchGood(mismatches: DiffOp[], targetWords: string[], profile: Rep2CorrectionProfile): boolean {
  const tolerance = profile.maxWordErrorRateForGood ?? 0;
  if (tolerance <= 0) return false;
  const allowed = Math.min(NEAR_MATCH_MAX_MISMATCHES, Math.floor(targetWords.length * tolerance));
  if (allowed <= 0 || mismatches.length > allowed) return false;

  const missed = new Set(mismatches.map(opTargetWord).filter((w): w is string => Boolean(w)));
  const missedCriticalRule = profile.focusRules.some((rule) => ruleMatches(rule, missed, targetWords));
  if (missedCriticalRule) return false;

  const missedProtected = mismatches.some((op) => {
    const word = opTargetWord(op);
    return word ? PROTECTED_NEAR_MATCH_WORDS.has(word) : false;
  });
  return !missedProtected;
}
