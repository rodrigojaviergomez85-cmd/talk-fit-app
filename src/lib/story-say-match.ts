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
/** Placeholder word that survives normalizeForCompare's punctuation stripping. */
const WILDCARD_TOKEN = "storywildcard";



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
 * - With `options.allowShortAnswer` and a wildcard target, a bare 1–2 word
 *   answer also passes (e.g. "Rodrigo" for "My name is *").
 * - Empty or unrecognizable transcripts always return "tryAgain".
 */
export function compareStorySay(
  target: string,
  transcript: string,
  options?: { allowShortAnswer?: boolean; altTargets?: string[] },
): StorySayResult {
  const matched =
    matchesTarget(target, transcript, options?.allowShortAnswer === true) ||
    (options?.altTargets ?? []).some((alt) => matchesTarget(alt, transcript, false));

  return { status: matched ? "good" : "tryAgain", matched };
}

function matchesTarget(target: string, transcript: string, allowShortAnswer: boolean): boolean {
  // Protect the wildcard marker because normalizeForCompare strips punctuation
  // and lowercases everything.
  const normalizedTarget = normalizeForCompare(target.replace(/\*/g, ` ${WILDCARD_TOKEN} `)).replace(
    new RegExp(WILDCARD_TOKEN, "g"),
    WILDCARD,
  );
  const targetWords = normalizedTarget.split(/\s+/).filter(Boolean);
  const transcriptWords = normalizeForCompare(transcript).split(/\s+/).filter(Boolean);

  if (targetWords.length === 0 || transcriptWords.length === 0) {
    return false;
  }

  const hasWildcard = targetWords.includes(WILDCARD);
  return hasWildcard
    ? matchFrame(transcriptWords, targetWords) ||
        (allowShortAnswer && transcriptWords.length <= 2 && !transcriptWords.includes(WILDCARD))
    : containsContiguous(transcriptWords, targetWords) ||
      // Long story lines (two clauses / sentences) are graded in-order rather
      // than strictly contiguous, so a small filler slip does not fail a
      // learner who said the whole line.
      (targetWords.length >= 6 && matchFrame(transcriptWords, targetWords));
}


/** Export for tests / endpoint validation. */
export const STORY_SAY_WILDCARD = WILDCARD;

/** Build a learner-facing hint for the expected spoken phrase.
 * Wildcards become an ellipsis so the learner knows where their own word goes.
 */
export function buildSayItHint(target: string, es: boolean): { label: string; hint: string } {
  const cleaned = target.trim().replace(/\s+/g, " ");
  // Collapse consecutive wildcards into a single ellipsis.
  const hint = cleaned.replace(/\*(\s*\*)*/g, "...");
  const label = es ? "Dilo así:" : "Try say:";
  return { label, hint };
}

const IRREGULAR_PAST: Record<string, string> = {
  go: "went", buy: "bought", do: "did", eat: "ate", see: "saw", give: "gave",
  get: "got", spend: "spent", meet: "met", feel: "felt", tell: "told",
  say: "said", make: "made", take: "took", come: "came", have: "had",
  write: "wrote", drive: "drove", find: "found", win: "won", sleep: "slept",
  teach: "taught", speak: "spoke", leave: "left", begin: "began", read: "read",
  run: "ran", sing: "sang", sit: "sat", stand: "stood", think: "thought",
  wake: "woke", wear: "wore", hear: "heard", keep: "kept", send: "sent",
  pay: "paid", bring: "brought", build: "built", choose: "chose", lose: "lost",
  put: "put", cut: "cut", let: "let", hold: "held", learn: "learned",
  fight: "fought", catch: "caught", grow: "grew", know: "knew", ride: "rode",
  swim: "swam", fly: "flew", forget: "forgot", break: "broke", draw: "drew",
};

function toPast(verb: string): string {
  const v = verb.toLowerCase();
  if (IRREGULAR_PAST[v]) return IRREGULAR_PAST[v]!;
  if (/e$/.test(v)) return `${v}d`;
  if (/[^aeiou]y$/.test(v)) return `${v.slice(0, -1)}ied`;
  if (/^[a-z]{2,4}$/.test(v) && /[aeiou][bdgklmnprt]$/.test(v) && !/[aeiou]{2}[bdgklmnprt]$/.test(v)) {
    return `${v}${v.slice(-1)}ed`;
  }
  return `${v}ed`;
}

/** Time / context tails that belong to the question, not to the answer start. */
const TIME_TAILS = [
  "yesterday", "today", "tonight", "this year", "this week", "this month",
  "this morning", "this weekend", "last night", "last week", "last weekend",
  "last year", "last month", "at work or school", "at work", "at school",
  "in your life", "recently", "first", "today?",
];

function stripTails(rest: string): string {
  let out = rest.trim();
  let changed = true;
  while (changed) {
    changed = false;
    for (const tail of TIME_TAILS) {
      const re = new RegExp(`\\s+${tail}$`, "i");
      if (re.test(out)) {
        out = out.replace(re, "").trim();
        changed = true;
      }
    }
  }
  return out;
}

function normalizeQuestion(questionEn: string): string {
  return questionEn
    .split("?")[0]!
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[.,!]+$/, "")
    .toLowerCase();
}

const WH = "(?:what|who|whom|where|when|why|how)";

/**
 * Turn a personal question into the start of the learner's own answer.
 * "What good news did you receive this year?" → "I received…"
 * "Who did you spend time with yesterday?" → "I spent time with…"
 */
function answerStartFromQuestion(questionEn: string): string | null {
  const q = normalizeQuestion(questionEn);
  if (!q) return null;

  let m: RegExpMatchArray | null;

  // How/What was your X …? → My X was …
  m = q.match(new RegExp(`^${WH}(?:'s)?\\s+(?:was|were)\\s+your\\s+(.+)$`));
  if (m) {
    const subject = stripTails(m[1]!);
    return subject ? `My ${subject} was` : null;
  }
  m = q.match(new RegExp(`^${WH}(?:'s| is| are)\\s+your\\s+(.+)$`));
  if (m) {
    const subject = stripTails(m[1]!);
    return subject ? `My ${subject} is` : null;
  }

  // (WH …) did you <verb> …
  m = q.match(new RegExp(`^(?:${WH}\\b.*?\\s+)?did\\s+you\\s+(.+)$`));
  if (m) {
    const rest = stripTails(m[1]!);
    const words = rest.split(" ").filter(Boolean);
    if (words.length === 0) return null;
    const verb = toPast(words[0]!);
    const tail = words.slice(1).join(" ");
    let hint = `I ${verb}${tail ? ` ${tail}` : ""}`;
    if (verb === "went" && !tail) hint = "I went to";
    return hint;
  }

  // (WH …) are/were you …
  m = q.match(new RegExp(`^(?:${WH}\\b.*?\\s+)?are\\s+you\\s+going\\s+to\\s+(.+)$`));
  if (m) {
    const rest = stripTails(m[1]!);
    return rest ? `I am going to ${rest}` : "I am going to";
  }
  m = q.match(new RegExp(`^(?:${WH}\\b.*?\\s+)?will\\s+you\\s+(.+)$`));
  if (m) {
    const rest = stripTails(m[1]!);
    return rest ? `I will ${rest}` : "I will";
  }
  m = q.match(new RegExp(`^(?:${WH}\\b.*?\\s+)?were\\s+you\\s+(.+)$`));
  if (m) {
    const rest = stripTails(m[1]!);
    return rest ? `I was ${rest}` : "I was";
  }
  m = q.match(new RegExp(`^(?:${WH}\\b.*?\\s+)?are\\s+you\\s+(.+)$`));
  if (m) {
    const rest = stripTails(m[1]!);
    return rest ? `I am ${rest}` : "I am";
  }

  // (WH …) do/does you …
  m = q.match(new RegExp(`^(?:${WH}\\b.*?\\s+)?do\\s+you\\s+(.+)$`));
  if (m) {
    const rest = stripTails(m[1]!);
    return rest ? `I ${rest}` : null;
  }

  return null;
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Fixed (non-wildcard) words of a grading target, in order. */
function fixedTargetWords(target: string): string[] {
  return target
    .toLowerCase()
    .replace(/[^a-z' *]/g, " ")
    .split(/\s+/)
    .filter((w) => w && w !== WILDCARD);
}

/** Whether `hint` contains every fixed target word, in order. */
function hintHonorsTarget(hint: string, target: string): boolean {
  const fixed = fixedTargetWords(target);
  if (fixed.length === 0) return true;
  const words = hint.toLowerCase().replace(/[^a-z' ]/g, " ").split(/\s+/).filter(Boolean);
  let i = 0;
  for (const w of words) {
    if (w === fixed[i]) i++;
    if (i === fixed.length) return true;
  }
  return false;
}

/**
 * Opening sentence the learner can start their own answer with. Built from the
 * personal question so it always matches it, and cross-checked against the
 * grading frame. Falls back to the grading frame when the question can't be
 * transformed.
 */
export function buildSayItStartHint(
  target: string,
  es: boolean,
  questionEn?: string,
): { label: string; hint: string } {
  const label = es ? "Empieza así:" : "Start like this:";
  const cleanTarget = (target ?? "").trim().replace(/\s+/g, " ");

  if (questionEn) {
    const fromQuestion = answerStartFromQuestion(questionEn);
    if (fromQuestion && (!cleanTarget || hintHonorsTarget(fromQuestion, cleanTarget))) {
      return { label, hint: `${capitalize(fromQuestion)}…` };
    }
  }

  const hint = cleanTarget
    .replace(/\s*\*(\s*\*)*\s*$/, "…")
    .replace(/\*(\s*\*)*/g, "…")
    .trim();
  return { label, hint };
}
