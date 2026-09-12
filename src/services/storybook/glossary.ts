import type { StorybookEpisode, StorybookScene } from "./types";

/**
 * Base glossary of common/function words used across the storybook episodes.
 * Lets a learner tap ANY word (not just the curated ones) and still get a
 * Spanish meaning. Hand-written: no runtime translation API.
 */
export const BASE_GLOSSARY: Record<string, string> = {
  a: "un / una",
  am: "soy / estoy",
  an: "un / una",
  and: "y",
  are: "eres / están / son",
  at: "en (un lugar)",
  back: "de regreso / atrás",
  be: "ser / estar",
  because: "porque",
  but: "pero",
  can: "poder",
  come: "ven / venir",
  day: "día",
  do: "hacer",
  everyone: "todos",
  for: "para / por",
  friend: "amiga / amigo",
  from: "de (origen)",
  get: "obtener / conseguir",
  girl: "chica",
  go: "ir",
  goes: "va",
  good: "bueno / buena",
  guy: "chavo / tipo",
  has: "tiene",
  have: "tener",
  he: "él",
  hello: "hola",
  her: "su / de ella",
  here: "aquí",
  hi: "hola",
  his: "su / de él",
  how: "cómo",
  i: "yo",
  in: "en / dentro de",
  is: "es / está",
  it: "eso / lo",
  like: "gustar / como",
  look: "mirar",
  looks: "se ve / mira",
  make: "hacer",
  making: "haciendo",
  man: "hombre",
  me: "me / mí",
  my: "mi",
  new: "nuevo / nueva",
  nice: "agradable / qué gusto",
  no: "no",
  not: "no",
  now: "ahora",
  of: "de",
  ok: "está bien",
  on: "en / encima de / puesto",
  one: "uno / una",
  or: "o",
  out: "afuera",
  people: "gente / personas",
  please: "por favor",
  say: "decir",
  says: "dice",
  she: "ella",
  so: "así que / tan",
  speak: "hablar",
  speaks: "habla",
  take: "tomar",
  takes: "toma",
  thank: "agradecer",
  thanks: "gracias",
  that: "eso / que",
  the: "el / la / los / las",
  their: "su / de ellos",
  them: "ellos / les",
  then: "entonces / después",
  there: "ahí / allá",
  they: "ellos / ellas",
  this: "este / esta / esto",
  time: "tiempo / vez",
  to: "a / para",
  today: "hoy",
  too: "también / demasiado",
  up: "arriba",
  us: "nosotros / nos",
  very: "muy",
  was: "era / estaba / fue",
  we: "nosotros",
  well: "bien / pues",
  what: "qué",
  when: "cuándo",
  where: "dónde",
  who: "quién",
  why: "por qué",
  with: "con",
  woman: "mujer",
  work: "trabajo / trabajar",
  yes: "sí",
  you: "tú / usted",
  your: "tu / tuyo",
  yourself: "a ti misma / a ti mismo",
};

/** Lowercase and strip quotes/punctuation so "Says," matches "says". */
export function normalizeWord(word: string): string {
  return word
    .toLowerCase()
    .replace(/[“”"'‘’.,!?;:()¿¡…]/g, "")
    .trim();
}

/** All curated words of an episode (every scene + review words), lowercased. */
export function buildEpisodeGlossary(episode: StorybookEpisode): Map<string, string> {
  const map = new Map<string, string>();
  for (const w of episode.reviewWords ?? []) map.set(normalizeWord(w.word), w.es);
  for (const scene of episode.scenes) {
    for (const w of scene.words) map.set(normalizeWord(w.word), w.es);
  }
  return map;
}

export type WordLookup = {
  /** Spanish meaning, or null when we have no hand-written meaning. */
  meaning: string | null;
  /** True when the word is a curated key word of the current scene. */
  curated: boolean;
};

/**
 * Resolve a tapped word: current scene → rest of the episode → base glossary.
 */
export function lookupWord(
  word: string,
  options: { scene?: StorybookScene; episodeGlossary?: Map<string, string> } = {},
): WordLookup {
  const key = normalizeWord(word);
  if (!key) return { meaning: null, curated: false };

  const sceneWord = options.scene?.words.find((w) => normalizeWord(w.word) === key);
  if (sceneWord) return { meaning: sceneWord.es, curated: true };

  const fromEpisode = options.episodeGlossary?.get(key);
  if (fromEpisode) return { meaning: fromEpisode, curated: false };

  return { meaning: BASE_GLOSSARY[key] ?? null, curated: false };
}
