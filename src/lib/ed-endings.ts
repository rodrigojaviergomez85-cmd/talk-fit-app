/**
 * Regular past-tense "-ed" pronunciation classifier.
 *
 * Local, deterministic, no AI: decides whether a word ending in -ed sounds
 * /t/, /d/ or /ɪd/ so Step 2 can color-code it while the learner reads.
 * Returns null for words that are not regular past participles.
 */

export type EdSound = "t" | "d" | "id";

/** Ends in -ed but is NOT a regular past verb (or is an adjective). */
const NOT_PAST = new Set([
  "red", "bed", "fed", "led", "wed", "shed", "sped", "bred", "bled", "fled",
  "shred", "need", "seed", "weed", "breed", "steed", "creed", "deed", "greed",
  "heed", "freed", "speed", "proceed", "succeed", "exceed", "indeed", "agreed",
  "naked", "wicked", "rugged", "crooked", "beloved", "sacred", "hatred",
]);

/** -ed adjectives always pronounced /ɪd/. */
const ADJ_ID = new Set(["aged", "blessed", "learned", "dogged", "jagged"]);

/** "th" before -ed is usually unvoiced /t/; these are the voiced /d/ exceptions. */
const TH_VOICED = new Set([
  "breathed", "bathed", "clothed", "soothed", "mouthed", "smoothed",
]);

/** "s" before -ed is usually /t/; these are the voiced /d/ exceptions. */
const S_VOICED = new Set([
  "used", "caused", "closed", "raised", "refused", "pleased", "surprised",
  "accused", "amused", "excused", "composed", "supposed", "exposed", "advised",
  "promised", "phrased", "praised", "arose", "noised",
]);

/** "igh" keeps the vowel, so the -ed sounds /d/ (weighed, sighed). */
function endsWithIgh(stem: string): boolean {
  return stem.endsWith("igh");
}

/**
 * Classify a word. `word` may carry punctuation/casing; it is cleaned first.
 */
export function classifyEdEnding(word: string): EdSound | null {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  // Needs at least stem + ed ("played"), and "eed"/"ied" words are handled below.
  if (w.length < 5 || !w.endsWith("ed")) return null;
  if (NOT_PAST.has(w)) return null;
  if (ADJ_ID.has(w)) return "id";
  if (w.endsWith("ied")) return "d"; // studied, carried → stem vowel sound
  if (w.endsWith("eed")) return null; // need, speed… already in NOT_PAST, stay safe

  const stem = w.slice(0, -2);

  if (stem.endsWith("t") || stem.endsWith("d")) return "id";

  const last = stem[stem.length - 1]!;
  if (stem.endsWith("gh")) return endsWithIgh(stem) ? "d" : "t"; // laughed vs weighed
  if (stem.endsWith("th")) return TH_VOICED.has(w) ? "d" : "t";
  if (stem.endsWith("sh") || stem.endsWith("ch")) return "t";
  if (last === "s") return S_VOICED.has(w) ? "d" : "t";
  if ("pkfxc".includes(last)) return "t"; // worked, stopped, laughed, mixed, danced

  return "d";
}

/**
 * Display hint showing how the word actually sounds:
 * watched → "WATCHT", called → "CALLD", wanted → "WAN-TED".
 */
export function edPronunciationHint(word: string, sound: EdSound): string {
  const clean = word.replace(/[^A-Za-z]/g, "");
  const lower = clean.toLowerCase();
  let base: string;
  if (lower.endsWith("ied")) base = clean.slice(0, -3) + "y"; // studied → STUDY
  else if (lower.endsWith("ed")) base = clean.slice(0, -2);
  else base = clean;

  if (sound === "id") {
    // Keep a visible syllable break: wanted → WAN-TED (undouble the stem: hopped → HOP-ED)
    let stem = base;
    if (stem.length > 3 && stem[stem.length - 1] === stem[stem.length - 2] && /[^aeiou]/.test(stem[stem.length - 1]!)) {
      stem = stem.slice(0, -1);
    }
    return `${stem.toUpperCase()}-ED`;
  }
  const suffix = sound.toUpperCase(); // "T" or "D"
  return `${base.toUpperCase()}${suffix}`;
}
