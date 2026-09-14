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
  amazing: "increíble / asombroso",
  celebrate: "celebrar",
  diploma: "diploma",
  envelope: "sobre",
  graduation: "graduación",
  proud: "orgulloso / orgullosa",
  confetti: "confeti",
  hugs: "abraza",
  tears: "lágrimas",
  wall: "pared",
  antigua: "Antigua",
  challenges: "retos / desafíos",
  color: "color",
  did: "hizo (pasado de hacer)",
  forgets: "olvida",
  great: "genial / excelente",
  guatemala: "Guatemala",
  live: "vivir",
  love: "amar / encantar",
  mouth: "boca",
  opens: "abre",
  orange: "naranja",
  partners: "compañeros / parejas",
  part: "parte",
  practice: "practicar",
  process: "proceso",
  sees: "ve",
  twenty: "veinte",
  two: "dos",
  words: "palabras",
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
  // Episodes 4-7
  again: "otra vez / de nuevo",
  always: "siempre",
  answer: "respuesta",
  answers: "contesta / respuestas",
  ask: "preguntar",
  asks: "pregunta",
  awesome: "genial / increíble",
  balloons: "globos",
  believe: "creer",
  big: "grande",
  blue: "azul",
  box: "caja",
  breathes: "respira",
  canada: "Canadá",
  challenge: "reto",
  city: "ciudad",
  claps: "aplaude",
  clear: "clara / claro",
  client: "cliente",
  closes: "cierra",
  cold: "frío / frías",
  colors: "colores",
  curious: "curiosa / curioso",
  dancing: "bailar",
  disciplined: "disciplinada / disciplinado",
  dylan: "Dylan",
  dani: "Dani",
  everybody: "todos",
  everywhere: "por todas partes",
  every: "cada / todos los",
  excited: "emocionada / emocionado",
  eyes: "ojos",
  family: "familia",
  fast: "rápido",
  fluent: "fluida / fluido",
  food: "comida",
  forget: "olvidar",
  friendly: "amable / amigable",
  full: "llena / lleno",
  green: "verde",
  happy: "feliz / alegre",
  heart: "corazón",
  hungry: "con hambre",
  introductions: "presentaciones",
  jacket: "chaqueta",
  know: "saber / conocer",
  laughs: "se ríe",
  long: "larga / largo",
  loud: "llamativo / ruidoso",
  meet: "conocer",
  meeting: "reunión",
  message: "mensaje",
  mistakes: "errores",
  more: "más",
  morning: "mañana (parte del día)",
  music: "música",
  nature: "naturaleza",
  nervous: "nerviosa / nervioso",
  news: "noticias",
  nineteen: "diecinueve",
  note: "nota",
  notebook: "cuaderno",
  opportunity: "oportunidad",
  perfect: "perfecto / perfecta",
  phone: "teléfono",
  pizza: "pizza",
  practices: "practica",
  project: "proyecto",
  reason: "razón",
  rings: "suena",
  room: "sala / cuarto",
  screen: "pantalla",
  short: "corta / corto",
  shows: "muestra",
  silence: "silencio",
  soccer: "fútbol",
  sound: "sonar / sonido",
  still: "todavía",
  sun: "sol",
  surprise: "sorpresa",
  team: "equipo",
  thinks: "piensa",
  tomorrow: "mañana",
  toronto: "Toronto",
  try: "intento / intentar",
  turn: "turno",
  voice: "voz",
  warm: "cálida / cálido",
  whole: "todo / entero",
  word: "palabra",
  writes: "escribe",
  yellow: "amarillo",
  // Episodes 8-12
  age: "edad",
  angry: "enojada / enojado",
  another: "otro / otra",
  best: "mejor",
  brave: "valiente",
  brother: "hermano",
  build: "construir",
  business: "negocio",
  cheese: "queso",
  cooking: "cocinar",
  creative: "creativa / creativo",
  dance: "bailar / baile",
  designs: "diseños",
  difficult: "difícil",
  dreams: "sueña / sueños",
  empty: "vacía / vacío",
  embarrassed: "avergonzada / avergonzado",
  excellent: "excelente",
  favorite: "favorito / favorita",
  feels: "siente",
  future: "futuro",
  grow: "crecer",
  hard: "difícil / duro",
  help: "ayuda / ayudar",
  hobbies: "pasatiempos",
  honduras: "Honduras",
  important: "importante",
  interview: "entrevista",
  invitation: "invitación",
  lunch: "almuerzo",
  lives: "vive",
  move: "movimiento / mover",
  own: "propio / propia",
  photos: "fotos",
  presentation: "presentación",
  pupusas: "pupusas",
  purple: "morado",
  ready: "lista / listo",
  records: "graba",
  refrigerator: "refrigerador",
  remind: "recordar",
  reminds: "recuerda",
  san: "San",
  smells: "huele",
  small: "pequeño / poco a poco",
  special: "especial",
  starts: "comienza",
  supervisor: "supervisor / supervisora",
  talent: "talento",
  tamales: "tamales",
  thirty: "treinta",
  videos: "videos",
  watching: "mirando",
  years: "años",
  // Season 2 words
  activities: "actividades",
  bilingual: "bilingüe",
  bring: "traer / llevar",
  busy: "ocupado / ocupada",
  cafe: "café",
  champion: "campeón / campeona",
  clock: "reloj",
  college: "universidad / colegio",
  company: "empresa",
  director: "director / directora",
  dream: "sueño",
  early: "temprano",
  event: "evento",
  exercise: "ejercicio / hacer ejercicio",
  grant: "apoyo financiero / beca",
  idea: "idea",
  invite: "invitar",
  join: "unirse",
  lead: "liderar",
  markers: "marcadores",
  media: "medios / redes",
  month: "mes",
  notes: "apuntes",
  opportunities: "oportunidades",
  organizers: "organizadores / organizadoras",
  persistent: "persistente",
  plan: "plan",
  posters: "carteles",
  relax: "descansar / relajarse",

  review: "repasar",
  saturday: "sábado",
  serious: "serio / seria",
  sleep: "dormir",
  social: "social",
  step: "paso",
  study: "estudiar",
  travel: "viajar",
  wake: "despertar",
  workshop: "taller",
  worried: "preocupado / preocupada",
  write: "escribir",
  young: "joven / jóvenes",
  // Season 3 routines
  three: "tres",
  four: "cuatro",
  five: "cinco",
  six: "seis",
  seven: "siete",
  eight: "ocho",
  nine: "nueve",
  ten: "diez",
  mom: "mamá",
  dad: "papá",
  sunday: "domingo",
  office: "oficina",
  "o'clock": "en punto",
  ball: "pelota / balón",
  flashlight: "linterna",
  block: "cuadra",
  heavy: "pesado / pesada",
  neighbors: "vecinos / vecinas",
  tourists: "turistas",
  often: "a menudo / seguido",
  song: "canción",
  casting: "audición",
  queue: "cola / fila",
  shouts: "grita / gritan",
};

/** Character, place and language names used across the seasons. */
export const PROPER_NOUNS: Record<string, string> = {
  vale: "Vale (nombre de persona)",
  "vale's": "de Vale",
  dani: "Dani (nombre de persona)",
  "dani's": "de Dani",
  kat: "Kat (nombre de persona)",
  ana: "Ana (nombre de persona)",
  luis: "Luis (nombre de persona)",
  mateo: "Mateo (nombre de persona)",
  camila: "Camila (nombre de persona)",
  beto: "Beto (nombre de persona)",
  tito: "Tito (nombre de persona)",
  dylan: "Dylan (nombre de persona)",
  morgan: "Morgan (nombre de persona)",
  reyes: "Reyes (apellido)",
  mr: "Sr. (señor)",
  mrs: "Sra. (señora)",
  ms: "Srta. / Sra.",
  miss: "señorita",
  salvador: "Salvador (parte de «El Salvador»)",
  guatemala: "Guatemala (país)",
  antigua: "Antigua (ciudad de Guatemala)",
  london: "Londres",
  northline: "Northline (nombre de la empresa)",
  english: "inglés (el idioma)",
  spanish: "español (el idioma)",
};

/** Contractions keep their apostrophe after normalizeWord. */
export const CONTRACTIONS: Record<string, string> = {
  "i'm": "yo soy / yo estoy",
  "i'll": "yo voy a / yo (futuro)",
  "i'd": "yo (condicional: yo would)",
  "i've": "yo he (ya hice)",
  "you're": "tú eres / tú estás",
  "you'll": "tú vas a",
  "you've": "tú has (ya hiciste)",
  "he's": "él es / él está",
  "she's": "ella es / ella está",
  "it's": "es / está",
  "that's": "eso es",
  "there's": "hay",
  "here's": "aquí está",
  "we're": "nosotros somos / estamos",
  "we'll": "nosotros vamos a",
  "we've": "nosotros hemos",
  "they're": "ellos son / están",
  "they'll": "ellos van a",
  "they've": "ellos han",
  "let's": "vamos a (hagamos)",
  "don't": "no (negación con do)",
  "doesn't": "no (negación con does)",
  "didn't": "no (negación en pasado)",
  "isn't": "no es / no está",
  "aren't": "no son / no están",
  "wasn't": "no era / no estaba",
  "weren't": "no eran / no estaban",
  "won't": "no va a (futuro negativo)",
  "can't": "no puede / no puedo",
  "couldn't": "no pudo / no podía",
  "shouldn't": "no debería",
  "wouldn't": "no lo haría",
  "haven't": "no he / no han",
  "hasn't": "no ha",
  "doesnt": "no (negación con does)",
};

/** Frequent irregular past forms: [Spanish meaning, base form]. */
export const IRREGULAR_PAST: Record<string, [string, string]> = {
  said: ["dijo / dije", "say"],
  went: ["fue / fui", "go"],
  came: ["vino / vine", "come"],
  took: ["tomó / tomé", "take"],
  got: ["consiguió / recibió", "get"],
  saw: ["vio / vi", "see"],
  made: ["hizo / hice", "make"],
  gave: ["dio / di", "give"],
  knew: ["sabía / conocía", "know"],
  felt: ["sintió / sentí", "feel"],
  told: ["le dijo / le dije", "tell"],
  found: ["encontró / encontré", "find"],
  thought: ["pensó / pensé", "think"],
  heard: ["escuchó / escuché", "hear"],
  left: ["se fue / dejó", "leave"],
  kept: ["mantuvo / guardó", "keep"],
  sent: ["envió / envié", "send"],
  spoke: ["habló / hablé", "speak"],
  wrote: ["escribió / escribí", "write"],
  read: ["leer / leyó", "read"],
  ran: ["corrió / corrí", "run"],
  won: ["ganó / gané", "win"],
  lost: ["perdió / perdí", "lose"],
  brought: ["trajo / traje", "bring"],
  bought: ["compró / compré", "buy"],
  paid: ["pagó / pagué", "pay"],
  put: ["puso / puse", "put"],
  met: ["conoció / se reunió con", "meet"],
  held: ["sostuvo / tuvo", "hold"],
  stood: ["se paró / estaba de pie", "stand"],
  sat: ["se sentó", "sit"],
  ate: ["comió / comí", "eat"],
  drank: ["bebió / bebí", "drink"],
  slept: ["durmió / dormí", "sleep"],
  woke: ["despertó / desperté", "wake"],
  began: ["empezó / empecé", "begin"],
  became: ["se convirtió en", "become"],
  chose: ["eligió / elegí", "choose"],
  taught: ["enseñó / enseñé", "teach"],
  understood: ["entendió / entendí", "understand"],
  grew: ["creció / crecí", "grow"],
  built: ["construyó / construí", "build"],
  broke: ["rompió / rompí", "break"],
  drove: ["manejó / manejé", "drive"],
  flew: ["voló / volé", "fly"],
  sold: ["vendió / vendí", "sell"],
  did: ["hizo / hice", "do"],
  had: ["tenía / tuvo", "have"],
  was: ["era / estaba / fue", "be"],
  were: ["eran / estaban / fueron", "be"],
  been: ["sido / estado", "be"],
  gone: ["ido", "go"],
  done: ["hecho", "do"],
  seen: ["visto", "see"],
  spent: ["gastó / pasó (tiempo)", "spend"],
};

/** Lowercase and strip quotes/punctuation so "Says," matches "says". */
export function normalizeWord(word: string): string {
  return word
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[“”".,!?;:()¿¡…—–]/g, "")
    .trim()
    .replace(/^'+|'+$/g, "");
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

/** Candidate base forms for a possibly inflected word. */
function baseForms(key: string): string[] {
  const out: string[] = [];
  const push = (w: string) => {
    if (w.length >= 2 && !out.includes(w)) out.push(w);
  };
  const doubled = /(.)\1$/.test(key.slice(0, -2));

  if (key.endsWith("ies")) push(key.slice(0, -3) + "y");
  if (key.endsWith("es")) push(key.slice(0, -2));
  if (key.endsWith("s") && !key.endsWith("ss")) push(key.slice(0, -1));
  if (key.endsWith("ied")) push(key.slice(0, -3) + "y");
  if (key.endsWith("ed")) {
    push(key.slice(0, -1)); // liked -> like
    push(key.slice(0, -2)); // asked -> ask
    if (doubled) push(key.slice(0, -3)); // stopped -> stop
  }
  if (key.endsWith("ing")) {
    push(key.slice(0, -3)); // asking -> ask
    push(key.slice(0, -3) + "e"); // making -> make
    if (/(.)\1$/.test(key.slice(0, -3))) push(key.slice(0, -4)); // running -> run
  }
  if (key.endsWith("ly")) push(key.slice(0, -2));
  if (key.endsWith("'s")) push(key.slice(0, -2));
  return out;
}

/** Label a derived form so the learner sees the base word too. */
function describeForm(key: string, base: string, baseMeaning: string): string {
  if (key.endsWith("ing")) return `${baseMeaning} — forma -ing de "${base}"`;
  if (key.endsWith("ed") || key.endsWith("ied")) return `${baseMeaning} — pasado de "${base}"`;
  if (key.endsWith("ly")) return `${baseMeaning} — de forma "${base}"`;
  if (key.endsWith("'s")) return `de ${base} (posesivo)`;
  if (key.endsWith("s")) return `${baseMeaning} — forma de "${base}"`;
  return baseMeaning;
}

/**
 * Resolve a tapped word: current scene → rest of the episode → base glossary →
 * proper nouns / contractions / irregular past → derived form of a known word.
 */
export function lookupWord(
  word: string,
  options: { scene?: StorybookScene | undefined; episodeGlossary?: Map<string, string> | undefined } = {},
): WordLookup {
  const key = normalizeWord(word);
  if (!key) return { meaning: null, curated: false };

  const sceneWord = options.scene?.words.find((w) => normalizeWord(w.word) === key);
  if (sceneWord) return { meaning: sceneWord.es, curated: true };

  const fromEpisode = options.episodeGlossary?.get(key);
  if (fromEpisode) return { meaning: fromEpisode, curated: false };

  const direct =
    BASE_GLOSSARY[key] ??
    PROPER_NOUNS[key] ??
    CONTRACTIONS[key] ??
    (IRREGULAR_PAST[key] ? `${IRREGULAR_PAST[key]![0]} (pasado de "${IRREGULAR_PAST[key]![1]}")` : undefined);
  if (direct) return { meaning: direct, curated: false };

  for (const base of baseForms(key)) {
    const baseMeaning =
      options.episodeGlossary?.get(base) ??
      BASE_GLOSSARY[base] ??
      PROPER_NOUNS[base] ??
      (IRREGULAR_PAST[base] ? IRREGULAR_PAST[base]![0] : undefined);
    if (baseMeaning) return { meaning: describeForm(key, base, baseMeaning), curated: false };
  }

  return { meaning: null, curated: false };
}

