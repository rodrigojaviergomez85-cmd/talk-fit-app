/**
 * Deterministic comparison for Rep 2 spoken-correction MVP.
 * No LLM. Compares the learner's transcript to the curriculum target and
 * returns one of three outcomes: good, correct, uncertain.
 */

export type Rep2Outcome = "good" | "correct" | "uncertain";

export type Rep2MatchResult = {
  status: Rep2Outcome;
  /** Word or short phrase to highlight as the correction focus. */
  focus?: string | undefined;
  /** The corrected target line (same as target, focus can be highlighted inside it). */
  correction: string;
  /** Should the learner be offered another recording attempt? */
  retryRecommended: boolean;
};

export type Rep2Confidence = {
  /** Average log-probability from Whisper segments. */
  avgLogprob: number;
  /** Probability that the segment contains no speech. */
  noSpeechProb: number;
};

type DiffOp =
  | { type: "match"; word: string }
  | { type: "missing"; word: string; index: number }
  | { type: "extra"; word: string; index: number }
  | { type: "replace"; target: string; got: string; index: number };

const AVG_LOGPROB_THRESHOLD = -0.7;
const NO_SPEECH_THRESHOLD = 0.5;
const MIN_MATCH_RATIO = 0.4;
const MAX_ERROR_RATIO = 0.6;

/** Grammar words we are actively teaching in BASIC 1 · FUTURE. */
const STRUCTURE_WORDS = new Set([
  "am",
  "is",
  "are",
  "be",
  "going",
  "to",
  "not",
  "will",
  "do",
  "does",
  "did",
  "can",
  "could",
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
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[^\w\s']/g, " ")
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

function expandNumbers(text: string): string {
  return text
    .split(/\s+/)
    .map((word) => NUMBER_WORDS[word] ?? word)
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
      dp[i][j] =
        targetWords[i] === transcriptWords[j]
          ? dp[i + 1][j + 1] + 1
          : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  const raw: Array<{ type: "delete" | "insert" | "match"; word: string }> = [];
  let i = 0;
  let j = 0;
  while (i < m || j < n) {
    if (i < m && j < n && targetWords[i] === transcriptWords[j]) {
      raw.push({ type: "match", word: targetWords[i] });
      i++;
      j++;
    } else if (j < n && (i >= m || dp[i][j + 1] >= dp[i + 1][j])) {
      raw.push({ type: "insert", word: transcriptWords[j] });
      j++;
    } else if (i < m) {
      raw.push({ type: "delete", word: targetWords[i] });
      i++;
    }
  }

  // Compress consecutive deletes/inserts into replacements where possible.
  const ops: DiffOp[] = [];
  const deletes: string[] = [];
  const inserts: string[] = [];
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

function isStructureOp(op: DiffOp): boolean {
  if (op.type === "missing" || op.type === "replace") {
    return STRUCTURE_WORDS.has(op.type === "missing" ? op.word : op.target);
  }
  return false;
}

function focusFromOp(op: DiffOp, targetWords: string[]): string | undefined {
  if (op.type === "match" || op.type === "extra") return undefined;
  const word = op.type === "missing" ? op.word : op.target;
  const idx = targetWords.indexOf(word);
  if (word === "to" && idx > 0 && targetWords[idx - 1] === "going") {
    return "going TO";
  }
  if (word === "am" && idx >= 0) {
    return idx === 0 ? "I AM" : "AM";
  }
  if (word === "not") return "NOT";
  return word.toUpperCase();
}

export function compareRep2(
  target: string,
  transcript: string,
  confidence?: Rep2Confidence,
): Rep2MatchResult {
  const targetWords = tokenize(target);
  const transcriptWords = tokenize(transcript);

  // Low confidence / no speech -> uncertain rather than false correction.
  if (confidence && (confidence.avgLogprob < AVG_LOGPROB_THRESHOLD || confidence.noSpeechProb > NO_SPEECH_THRESHOLD)) {
    return { status: "uncertain", correction: target, retryRecommended: true };
  }

  if (transcriptWords.length === 0) {
    return { status: "uncertain", correction: target, retryRecommended: true };
  }

  const ops = wordDiff(targetWords, transcriptWords);
  const matches = ops.filter((o) => o.type === "match").length;

  if (matches / targetWords.length < MIN_MATCH_RATIO) {
    return { status: "uncertain", correction: target, retryRecommended: true };
  }

  const mismatches = ops.filter((o) => o.type !== "match");

  if (mismatches.length === 0) {
    return { status: "good", correction: target, retryRecommended: false };
  }

  // Too many scattered errors to safely pick one correction.
  if (mismatches.length / targetWords.length >= MAX_ERROR_RATIO) {
    return { status: "uncertain", correction: target, retryRecommended: true };
  }

  // Prioritize the grammar structure being practiced.
  const structureMismatches = mismatches.filter(isStructureOp);
  if (structureMismatches.length > 0 && mismatches.length <= 3) {
    return {
      status: "correct",
      correction: target,
      focus: focusFromOp(structureMismatches[0], targetWords),
      retryRecommended: true,
    };
  }

  if (mismatches.length === 1) {
    return {
      status: "correct",
      correction: target,
      focus: focusFromOp(mismatches[0], targetWords),
      retryRecommended: true,
    };
  }

  return { status: "uncertain", correction: target, retryRecommended: true };
}
