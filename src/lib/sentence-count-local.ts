/**
 * Deterministic, pure, offline "complete spoken idea" counter.
 *
 * Used by /api/sentence-count BEFORE any LLM call: when this counter is
 * confident, no Gemini call is made at all. When it is uncertain, the route
 * falls back to the existing Gemini counting call.
 *
 * Philosophy: false confidence is worse than a fallback. This never grades
 * grammar — beginner errors ("My sister work at home") are valid ideas.
 * No I/O, no persistence, no logging of transcript content.
 */

export type LocalIdeaCount =
  | { status: "confident"; count: number; reason: string }
  | { status: "uncertain"; reason: string };

/** Explicit subject pronouns that make a clause boundary safe. */
const SUBJECT_PRONOUNS = new Set([
  "i",
  "you",
  "he",
  "she",
  "it",
  "we",
  "they",
  "there",
]);

/** Possessives / determiners that can start an explicit noun subject. */
const SUBJECT_DETERMINERS = new Set([
  "my",
  "your",
  "his",
  "her",
  "our",
  "their",
  "its",
  "the",
  "this",
  "that",
  "these",
  "those",
  "a",
  "an",
]);

const FILLERS = new Set(["uh", "uhh", "um", "umm", "erm", "hmm", "mmm", "eh", "ah", "well", "like-uh"]);
const FILLER_PHRASES = [/\byou know\b/g, /\bi mean\b/g, /\bsort of\b/g, /\bkind of\b/g];

/** Subordinators that make the pedagogical idea count ambiguous. */
const SUBORDINATORS = new Set([
  "because",
  "although",
  "though",
  "while",
  "when",
  "whenever",
  "if",
  "unless",
  "since",
  "until",
  "which",
  "who",
  "whose",
  "whom",
  "before",
  "after",
]);

const CONNECTORS = new Set(["and", "but", "so", "then", "or", "plus"]);
/** Tokens that may sit between a connector and the next explicit subject. */
const CONNECTOR_BRIDGE = new Set(["then", "after", "that", "later", "also", "now", "again", "finally", "next"]);

const AUX_VERBS = new Set([
  "am","is","are","was","were","be","been","being",
  "do","does","did","don't","doesn't","didn't",
  "have","has","had","haven't","hasn't","hadn't",
  "can","can't","cannot","could","couldn't",
  "will","won't","would","wouldn't",
  "should","shouldn't","must","may","might",
  "'m","'s","'re","'ve","'ll","'d",
]);

/** Common beginner verbs (base forms). Inflections are derived at match time. */
const BASE_VERBS = [
  "go","come","get","make","take","see","look","watch","listen","hear","speak","talk","say","tell","ask","answer",
  "eat","drink","cook","buy","sell","pay","work","study","learn","teach","read","write","play","run","walk","drive",
  "travel","visit","live","stay","move","start","begin","finish","end","stop","open","close","call","text","help",
  "like","love","hate","want","need","think","know","feel","believe","hope","try","use","clean","wash","wear","sleep",
  "wake","rest","meet","find","lose","give","send","bring","put","keep","leave","arrive","return","practice","practise",
  "exercise","train","enjoy","relax","prepare","plan","organize","organise","fix","build","learn","remember","forget",
  "understand","explain","show","share","spend","save","cost","drop","pick","turn","stand","sit","dance","sing","laugh",
  "smile","cry","dream","grow","change","choose","decide","happen","stay","shop","drive","ride","fly","swim","cut",
];

const IRREGULAR_PAST = new Set([
  "went","came","got","made","took","saw","heard","spoke","said","told","ate","drank","bought","sold","paid",
  "read","wrote","ran","drove","slept","woke","met","found","lost","gave","sent","brought","put","kept","left",
  "thought","knew","felt","understood","spent","chose","grew","flew","swam","sang","sat","stood","cut","began",
  "began","did","had","was","were","became","brought","taught","caught","bought",
]);

const VERB_SET = new Set<string>();
for (const v of BASE_VERBS) {
  VERB_SET.add(v);
  VERB_SET.add(`${v}s`);
  VERB_SET.add(`${v}es`);
  VERB_SET.add(`${v}ed`);
  VERB_SET.add(`${v}d`);
  VERB_SET.add(`${v}ing`);
  if (/[^aeiou]$/.test(v)) {
    const doubled = `${v}${v.slice(-1)}`;
    VERB_SET.add(`${doubled}ing`);
    VERB_SET.add(`${doubled}ed`);
  }
  if (v.endsWith("e")) {
    VERB_SET.add(`${v.slice(0, -1)}ing`);
  }
  if (v.endsWith("y")) {
    VERB_SET.add(`${v.slice(0, -1)}ies`);
    VERB_SET.add(`${v.slice(0, -1)}ied`);
  }
}
for (const v of IRREGULAR_PAST) VERB_SET.add(v);

const MAX_CLAUSE_WORDS = 25;
const MAX_LOCAL_IDEAS = 15;

function uncertain(reason: string): LocalIdeaCount {
  return { status: "uncertain", reason };
}

/** Normalizes and strips fillers. Returns null-ish signals via counters. */
function normalize(raw: string) {
  let text = raw.toLowerCase().replace(/[""]/g, '"').replace(/[’]/g, "'");
  // Expand subject contractions so the subject stays an explicit token.
  text = text
    .replace(/\b(i|you|he|she|it|we|they)'m\b/g, "$1 am")
    .replace(/\b(i|you|he|she|it|we|they)'s\b/g, "$1 is")
    .replace(/\b(i|you|he|she|it|we|they)'re\b/g, "$1 are")
    .replace(/\b(i|you|he|she|it|we|they)'ve\b/g, "$1 have")
    .replace(/\b(i|you|he|she|it|we|they)'ll\b/g, "$1 will")
    .replace(/\b(i|you|he|she|it|we|they)'d\b/g, "$1 would");
  const ellipses = (text.match(/\.\.\.|…/g) ?? []).length;
  text = text.replace(/\.\.\.|…/g, " ");
  let fillerCount = 0;
  for (const re of FILLER_PHRASES) {
    const matches = text.match(re);
    if (matches) fillerCount += matches.length;
    text = text.replace(re, " ");
  }
  return { text, ellipses, fillerCount };
}

function tokenize(clause: string): string[] {
  return clause
    .split(/[^a-z0-9']+/)
    .map((t) => t.replace(/^'+|'+$/g, ""))
    .filter(Boolean);
}

function isVerbLike(token: string): boolean {
  return AUX_VERBS.has(token) || VERB_SET.has(token);
}

type ClauseCheck = { ok: boolean; reason?: string };

/** Verifies an explicit subject at the start plus at least one verb-like token. */
function classifyClause(tokens: string[]): ClauseCheck {
  if (tokens.length === 0) return { ok: false, reason: "empty_clause" };
  if (tokens.length > MAX_CLAUSE_WORDS) return { ok: false, reason: "long_clause" };

  // Skip leading time/place adverbials until an explicit subject appears.
  let i = 0;
  let subjectIndex = -1;
  while (i < tokens.length && i < 8) {
    const t = tokens[i]!;
    if (SUBJECT_PRONOUNS.has(t)) {
      subjectIndex = i;
      break;
    }
    if (SUBJECT_DETERMINERS.has(t) && i + 1 < tokens.length) {
      // determiner + noun subject, e.g. "my sister"
      const next = tokens[i + 1]!;
      if (!isVerbLike(next)) {
        subjectIndex = i;
        i += 1;
        break;
      }
    }
    i += 1;
  }
  if (subjectIndex < 0) return { ok: false, reason: "no_explicit_subject" };

  const rest = tokens.slice(subjectIndex + 1);
  if (rest.length === 0) return { ok: false, reason: "no_predicate" };
  const hasVerb = rest.some((t) => isVerbLike(t));
  if (!hasVerb) return { ok: false, reason: "no_known_verb" };

  for (const t of rest) {
    if (SUBORDINATORS.has(t)) return { ok: false, reason: "subordinate_clause" };
  }
  return { ok: true };
}

/**
 * Splits a sentence on safe connector boundaries (connector + explicit subject).
 * A connector NOT followed by an explicit subject makes the sentence ambiguous.
 */
function splitOnConnectors(tokens: string[]): { parts: string[][]; ambiguous: boolean } {
  const parts: string[][] = [];
  let current: string[] = [];
  let ambiguous = false;

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]!;
    if (CONNECTORS.has(t) && current.length > 0) {
      let j = i + 1;
      while (j < tokens.length && CONNECTOR_BRIDGE.has(tokens[j]!)) j += 1;
      const next = tokens[j];
      if (next && SUBJECT_PRONOUNS.has(next)) {
        parts.push(current);
        current = [];
        i = j - 1; // continue from the subject
        continue;
      }
      if (next && SUBJECT_DETERMINERS.has(next)) {
        // "and my sister works..." — explicit noun subject only when a verb follows later
        parts.push(current);
        current = [];
        i = j - 1;
        continue;
      }
      ambiguous = true;
      current.push(t);
      continue;
    }
    current.push(t);
  }
  if (current.length > 0) parts.push(current);
  return { parts, ambiguous };
}

/**
 * Speech-to-text often returns several spoken ideas with NO punctuation and NO
 * connector ("I work at a call center I like my job"). Without this split the
 * counter reported 1 idea instead of 2 — a systematic UNDERCOUNT.
 *
 * Rule (conservative): once the current segment already has an explicit subject
 * and a verb, a following subject pronoun starts a new idea — but only when the
 * remainder also has a verb, and only when the preceding token cannot make that
 * pronoun an object or a complement clause ("I told you I will go"). Those
 * genuinely ambiguous cases return uncertain so the LLM fallback decides.
 */
const NO_SPLIT_BEFORE_PRONOUN = new Set([
  "to","that","what","how","why","where","who","which","because","if","when","while","and","but","so","or","then",
  "with","for","about","from","of","at","on","in","by","like","than","as","before","after","until","since",
]);

function splitOnImplicitBoundaries(tokens: string[]): { parts: string[][]; ambiguous: boolean } {
  const parts: string[][] = [];
  let current: string[] = [];
  let hasSubject = false;
  let hasVerb = false;
  let ambiguous = false;

  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]!;
    const prev = i > 0 ? tokens[i - 1]! : null;

    if (
      prev &&
      hasSubject &&
      hasVerb &&
      SUBJECT_PRONOUNS.has(t) &&
      tokens.slice(i + 1).some((w) => isVerbLike(w))
    ) {
      if (isVerbLike(prev) || SUBJECT_PRONOUNS.has(prev)) {
        // "I told you I will go" / "I see you" — object or complement clause.
        ambiguous = true;
        current.push(t);
        continue;
      }
      if (NO_SPLIT_BEFORE_PRONOUN.has(prev)) {
        current.push(t);
        continue;
      }
      parts.push(current);
      current = [t];
      hasSubject = true;
      hasVerb = false;
      continue;
    }

    current.push(t);
    if (!hasSubject && (SUBJECT_PRONOUNS.has(t) || SUBJECT_DETERMINERS.has(t))) hasSubject = true;
    else if (hasSubject && isVerbLike(t)) hasVerb = true;
  }

  if (current.length > 0) parts.push(current);
  return { parts, ambiguous };
}

export function countCompleteIdeasLocal(transcript: string): LocalIdeaCount {
  const raw = (transcript ?? "").trim();
  if (!raw) return { status: "confident", count: 0, reason: "empty" };

  const { text, ellipses, fillerCount } = normalize(raw);
  const allTokens = tokenize(text);
  const totalWords = allTokens.length;
  if (totalWords === 0) return { status: "confident", count: 0, reason: "empty" };

  const fillerTokens = allTokens.filter((t) => FILLERS.has(t)).length;
  const fillers = fillerTokens + fillerCount;
  if (ellipses >= 3) return uncertain("false_starts");
  if (fillers >= 3) return uncertain("many_fillers");
  if (totalWords >= 12 && fillers / totalWords > 0.15) return uncertain("many_fillers");

  const sentences = text
    .split(/[.!?;]+/)
    .map((s) => s.trim())
    .filter(Boolean);
  if (sentences.length === 0) return uncertain("no_sentences");

  const clauses: string[] = [];
  for (const sentence of sentences) {
    const tokens = tokenize(sentence).filter((t) => !FILLERS.has(t));
    if (tokens.length === 0) continue;
    const { parts, ambiguous } = splitOnConnectors(tokens);
    if (ambiguous) return uncertain("implicit_subject_connector");
    for (const part of parts) {
      const check = classifyClause(part);
      if (!check.ok) return uncertain(check.reason ?? "unclassified_clause");
      clauses.push(part.join(" "));
    }
  }

  if (clauses.length === 0) return uncertain("no_clauses");

  // Drop exact / near-exact immediate repetitions.
  const deduped: string[] = [];
  for (const c of clauses) {
    if (deduped.length > 0 && deduped[deduped.length - 1] === c) continue;
    deduped.push(c);
  }

  const count = deduped.length;
  if (count > MAX_LOCAL_IDEAS) return uncertain("suspicious_count");
  if (count >= 5 && totalWords / count < 3) return uncertain("suspicious_density");

  return { status: "confident", count, reason: "clauses_classified" };
}
