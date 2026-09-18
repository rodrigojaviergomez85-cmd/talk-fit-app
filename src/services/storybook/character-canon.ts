/**
 * Character bible for "El mundo de Vale".
 *
 * Single source of truth for who a character is, how they look, how they sound
 * and which seasons they can appear in. Scripts, artwork prompts and the
 * automatic consistency test all read from here, so a character can never drift
 * between episodes without this file changing first.
 */

import type { StorybookSpeaker } from "./types";

/** Season module ids, in story order. */
export const SEASON_MODULE_IDS = [
  "basic-zero", // S1
  "simple-future", // S2
  "simple-present", // S3
  "past-stories", // S4
  "mixed-tenses", // S5
  "eagles-week-1", // S6
  "tigers", // S7
  "sharks", // S8
  "advanced-1", // S9
  "advanced-2", // S10
  "advanced-3", // S11
] as const;

export type SeasonModuleId = (typeof SEASON_MODULE_IDS)[number];

export type CharacterCanon = {
  id: StorybookSpeaker;
  /** Name as it appears in the reader and in scene text. */
  name: string;
  /** Other spellings used inside scene text (for the "who is named here" check). */
  aka?: string[];
  /** Short age description used in artwork prompts. */
  age: string;
  /** Physical look — copied verbatim into every artwork prompt. */
  look: string;
  /** Default outfit that keeps the character recognizable across episodes. */
  outfit: string;
  /** Seasons this character may speak in or be drawn in. */
  seasons: SeasonModuleId[];
  /** Notes that have caused real mistakes before. */
  neverDo?: string[];
};

const ALL: SeasonModuleId[] = [...SEASON_MODULE_IDS];

export const CHARACTER_CANON: Record<Exclude<StorybookSpeaker, "narrator">, CharacterCanon> = {
  vale: {
    id: "vale",
    name: "Vale",
    aka: ["Valeria"],
    age: "young Salvadoran woman, 19 in Season 1 and approximately 24 from Season 8 onward",
    look: "approved youthful identity: warm light-medium tan skin, slim oval face with soft cheeks, long straight black hair with a center part, brown eyes, adult proportions",
    outfit: "plain mustard-yellow blouse; no blazer or suit unless the scene explicitly requires one",
    seasons: ALL,
    neverDo: ["never drawn as a teenager or a child", "never with curly or short hair", "never middle-aged or with visible age lines", "never add a blazer by default"],
  },
  dani: {
    id: "dani",
    name: "Dani",
    age: "young Salvadoran man, about 19-20 at first appearance",
    look: "medium-brown / light-medium tan skin, short curly black hair, clean-shaven, no glasses, adult proportions",
    outfit: "light blue shirt",
    seasons: ["past-stories", "mixed-tenses", "eagles-week-1", "tigers", "sharks", "advanced-1", "advanced-2", "advanced-3"],
    neverDo: [
      "Dani is male — never a woman",
      "always he/him — never she/her",
      "never drawn as a child",
      "never dark-brown skin",
    ],
  },
  camila: {
    id: "camila",
    name: "Camila",
    age: "young Afro-Latina woman, early 20s",
    look: "dark brown skin, shoulder-length curly black hair, adult proportions",
    outfit: "purple top",
    seasons: ["basic-zero", "simple-future", "past-stories", "mixed-tenses", "eagles-week-1", "tigers", "sharks", "advanced-1", "advanced-2", "advanced-3"],
  },
  kat: {
    id: "kat",
    name: "Kat",
    age: "Salvadoran woman in her late 20s, team trainer",
    look: "medium tan skin, dark brown hair in a high ponytail, friendly confident face",
    outfit: "teal blouse with a headset at the call center",
    seasons: ["basic-zero", "simple-future", "simple-present", "past-stories", "mixed-tenses", "eagles-week-1", "tigers"],
    neverDo: ["Kat is a woman — never drawn as a man"],
  },
  mateo: {
    id: "mateo",
    name: "Mateo",
    age: "young Salvadoran man, about 20",
    look: "light-medium tan skin, short straight black hair, cheerful face, adult proportions",
    outfit: "green polo shirt",
    seasons: ["basic-zero", "simple-future", "simple-present", "past-stories", "mixed-tenses", "eagles-week-1", "tigers"],
    neverDo: ["Mateo does not appear in Sharks (Season 8) — those lines belong to Dani"],
  },
  luis: {
    id: "luis",
    name: "Luis",
    age: "Salvadoran man in his 30s",
    look: "medium-brown skin, short black hair, short trimmed beard",
    outfit: "gray call-center polo",
    seasons: ["basic-zero", "simple-future", "simple-present", "past-stories", "eagles-week-1"],
  },
  dylan: {
    id: "dylan",
    name: "Dylan",
    age: "young Salvadoran man, about 19",
    look: "light tan skin, short wavy brown hair, shy smile",
    outfit: "navy t-shirt",
    seasons: ["basic-zero", "simple-future", "simple-present", "past-stories"],
  },
  ana: {
    id: "ana",
    name: "Ana",
    age: "Salvadoran woman in her 30s",
    look: "medium tan skin, dark brown hair tied back, calm mature face",
    outfit: "burgundy blouse",
    seasons: ["basic-zero", "simple-future", "simple-present", "past-stories", "eagles-week-1", "tigers"],
  },
  beto: {
    id: "beto",
    name: "Beto",
    age: "young Salvadoran man, about 20, a student",
    look: "medium-brown skin, short curly black hair, clean-shaven, adult proportions",
    outfit: "gray hoodie",
    seasons: ["simple-future", "eagles-week-1", "tigers"],
    neverDo: ["Beto is a student — never drawn with a call-center headset"],
  },
  boss: {
    id: "boss",
    name: "Boss",
    age: "Salvadoran man in his 40s, call-center supervisor",
    look: "medium tan skin, short black hair, clean-shaven, serious face",
    outfit: "white dress shirt with a badge",
    seasons: ["basic-zero", "simple-future", "simple-present", "past-stories", "eagles-week-1"],
  },
  mom: {
    id: "mom",
    name: "Mom",
    age: "Salvadoran woman in her 50s, Vale's mother",
    look: "light-medium tan skin, black hair with gray streaks pulled back, warm face",
    outfit: "floral apron over a simple blouse",
    seasons: ["basic-zero", "simple-present", "past-stories", "mixed-tenses", "eagles-week-1", "tigers"],
  },
  tito: {
    id: "tito",
    name: "Don Tito",
    age: "Salvadoran man in his 70s, neighborhood elder",
    look: "light tan weathered skin, white mustache, kind wrinkled face",
    outfit: "flat cap and a cream guayabera",
    seasons: ["simple-present", "eagles-week-1", "tigers", "sharks", "advanced-2", "advanced-3"],
  },
  morgan: {
    id: "morgan",
    name: "Morgan",
    age: "American woman in her 40s, corporate client",
    look: "fair skin, chin-length blonde hair, professional confident face",
    outfit: "navy blazer",
    seasons: ["eagles-week-1", "tigers", "advanced-1", "advanced-2", "advanced-3"],
    neverDo: ["Morgan is a woman — always she/her, never drawn as a man"],
  },
  bryan: {
    id: "bryan",
    name: "Bryan",
    age: "Salvadoran man in his 30s, BigTalk manager and rival",
    look: "medium tan skin, slicked-back black hair, thin smirk",
    outfit: "black suit with no tie",
    seasons: ["tigers"],
  },
  sofia: {
    id: "sofia",
    name: "Sofía",
    age: "young Salvadoran woman, mid-20s, academy teacher",
    look: "light-medium tan skin, long wavy brown hair, bright friendly face",
    outfit: "coral blouse",
    seasons: ["tigers"],
  },
  herrera: {
    id: "herrera",
    name: "Mr. Herrera",
    age: "older Latin man, about 60, school board director",
    look: "medium tan skin, gray beard and mustache, gray hair, authoritative face",
    outfit: "dark suit and tie",
    seasons: ["tigers"],
    neverDo: ["never drawn young or clean-shaven"],
  },
  reed: {
    id: "reed",
    name: "Mr. Reed",
    age: "American man, about 55, international executive",
    look: "fair skin, short silver-gray hair, clean-shaven, stern face",
    outfit: "dark navy suit with a tie",
    seasons: ["sharks", "advanced-1"],
  },
  lucia: {
    id: "lucia",
    name: "Lucía",
    age: "Guatemalan woman in her early 30s, experienced academic coordinator",
    look: "warm medium tan skin, straight dark brown shoulder-length hair, brown eyes, adult proportions",
    outfit: "forest green blouse and charcoal trousers",
    seasons: ["sharks"],
    neverDo: ["never drawn as Camila", "never drawn as a teenager or child"],
  },
  renata: {
    id: "renata",
    name: "Renata Cruz",
    age: "Mexican woman in her late 30s, polished education entrepreneur",
    look: "light-medium olive skin, long wavy dark brown hair, sharp brown eyes, adult proportions",
    outfit: "crimson blazer over a cream blouse",
    seasons: ["sharks"],
    neverDo: ["never drawn as Vale or Camila", "never drawn as a teenager or child"],
  },
  marta: {
    id: "marta",
    name: "Marta",
    age: "Salvadoran woman in her mid-30s, mother and academy student",
    look: "medium tan skin, dark brown hair in a loose ponytail, warm tired eyes, adult proportions",
    outfit: "simple teal cardigan over a white t-shirt",
    seasons: ["advanced-1"],
    neverDo: ["never drawn as Vale or Camila"],
  },
  nelson: {
    id: "nelson",
    name: "Nelson",
    age: "Salvadoran man, about 30, delivery company supervisor candidate and academy student",
    look: "medium-brown skin, short black hair, light stubble, friendly nervous face, adult proportions",
    outfit: "navy work polo with a company logo-free chest",
    seasons: ["advanced-1"],
    neverDo: ["never drawn as Dani"],
  },
  elena: {
    id: "elena",
    name: "Elena",
    age: "Salvadoran woman about 50, bakery owner and academy student",
    look: "light-medium tan skin, short wavy gray-streaked dark hair, calm confident face, adult proportions",
    outfit: "cream apron over a rust-coloured blouse",
    seasons: ["advanced-1", "advanced-2", "advanced-3"],
    neverDo: ["never drawn as a young woman"],
  },
  barrett: {
    id: "barrett",
    name: "Ms. Barrett",
    aka: ["Barrett"],
    age: "American woman in her mid-40s, Northline hiring committee member",
    look: "fair skin, dark brown hair in a sharp bob, rimless glasses, cool evaluating face, adult proportions",
    outfit: "charcoal grey suit jacket over a white shirt",
    seasons: ["advanced-1", "advanced-2", "advanced-3"],
    neverDo: ["never drawn as Camila or Vale", "never drawn as a warm, smiling host"],
  },
  lidia: {
    id: "lidia",
    name: "Lidia",
    age: "Salvadoran woman in her mid-40s, senior teacher at Vale's academy",
    look: "medium tan skin, dark brown hair pulled back in a low bun, calm experienced face, adult proportions",
    outfit: "deep teal blazer over a grey top",
    seasons: ["advanced-1", "advanced-2", "advanced-3"],
    neverDo: ["never drawn as Elena or Camila", "never drawn as a young student"],
  },
  keller: {
    id: "keller",
    name: "Ms. Keller",
    aka: ["Keller"],
    age: "American woman in her early 40s, senior recruiter at Crown",
    look: "fair skin with freckles, auburn hair in a straight shoulder-length cut, alert friendly-but-calculating face, adult proportions",
    outfit: "burgundy blazer over a black top",
    seasons: ["advanced-1", "advanced-2", "advanced-3"],
    neverDo: ["never drawn as Barrett or Vale", "never drawn as a young student"],
  },
  candidateM: {
    id: "candidateM",
    name: "Candidate",
    age: "young Salvadoran man, about 25, job candidate",
    look: "medium tan skin, short black hair, nervous polite face",
    outfit: "light blue dress shirt",
    seasons: ["eagles-week-1"],
  },
  candidateF: {
    id: "candidateF",
    name: "Candidate",
    age: "young Salvadoran woman, about 25, job candidate",
    look: "light-medium tan skin, dark hair in a low bun, polite face",
    outfit: "white blouse",
    seasons: ["eagles-week-1"],
  },
  candidateHotel: {
    id: "candidateHotel",
    name: "Candidate",
    age: "Salvadoran woman in her 30s, hotel-experienced candidate (later revealed as Ana)",
    look: "medium tan skin, dark brown hair tied back, calm mature face",
    outfit: "burgundy blouse",
    seasons: ["eagles-week-1"],
  },
  mia: {
    id: "mia",
    name: "Mía",
    aka: ["Mia"],
    age: "young Salvadoran woman, 20, Northline's first pilot agent",
    look: "light-medium tan skin, short dyed-red hair, small hoop earrings, quick alert face, adult proportions",
    outfit: "black Northline polo with a call-center headset around her neck",
    seasons: ["advanced-1", "advanced-2", "advanced-3"],
    neverDo: ["never drawn as a teenager", "never without the headset"],
  },
  nico: {
    id: "nico",
    name: "Nico",
    age: "young Salvadoran man, 22, Northline night-shift agent and gamer",
    look: "medium-brown skin, clearly Salvadoran features, straight black hair in a heavy fringe, calm unreadable face, no glasses, adult proportions",
    outfit: "black hoodie over the black Northline polo, headset around his neck",
    seasons: ["advanced-2", "advanced-3"],
    neverDo: ["never drawn as a teenager", "never smiling widely", "never without the hoodie", "never drawn with East Asian features"],
  },
  julieta: {
    id: "julieta",
    name: "Julieta",
    age: "Colombian woman, 24, Northline quality analyst in Bogota",
    look: "light-medium tan skin, long dark brown hair tied back, attentive focused face, adult proportions",
    outfit: "white shirt with a Northline lanyard, always seen on a video call screen",
    seasons: ["advanced-2", "advanced-3"],
    neverDo: ["never drawn in the San Salvador office until the final episode", "never drawn as a student"],
  },
  oscar: {
    id: "oscar",
    name: "Óscar",
    age: "young Salvadoran man, 19, new Northline pilot agent",
    look: "medium-brown skin, short black hair, round face, nervous open expression, adult proportions",
    outfit: "black Northline polo one size too big, headset in his hand",
    seasons: ["advanced-2"],
    neverDo: ["never drawn as a child", "never drawn confident"],
  },
  estela: {
    id: "estela",
    name: "Doña Estela",
    aka: ["Estela"],
    age: "Salvadoran woman in her 50s, Dani's mother",
    look: "medium-brown skin, black hair with gray streaks in a low bun, kind tired eyes, adult proportions",
    outfit: "simple green blouse with a cardigan",
    seasons: ["advanced-2", "advanced-3"],
    neverDo: ["never confused with Vale's mother", "never drawn in an office"],
  },
  caller: {
    id: "caller",
    name: "Customer",
    age: "adult customer on the phone, never seen",
    look: "never drawn; only a voice on the line",
    outfit: "never drawn; only a voice on the line",
    seasons: ["advanced-2", "advanced-3"],
    neverDo: ["never drawn in any scene", "never given a face or a name"],
  },
};


/** Canon entry for a speaker, or undefined for the narrator. */
export function characterCanon(speaker: StorybookSpeaker): CharacterCanon | undefined {
  if (speaker === "narrator") return undefined;
  return CHARACTER_CANON[speaker];
}

/** Whether a character may appear in a given season module. */
export function appearsInSeason(speaker: StorybookSpeaker, moduleId: string): boolean {
  if (speaker === "narrator") return true;
  const canon = characterCanon(speaker);
  if (!canon) return false;
  return canon.seasons.includes(moduleId as SeasonModuleId);
}

/**
 * Exact physical description to paste into an artwork generation or correction
 * prompt. Never describe a character from memory — always build it from here.
 */
export function buildCharacterPrompt(speaker: StorybookSpeaker): string {
  const canon = characterCanon(speaker);
  if (!canon) return "";
  const never = canon.neverDo?.length ? ` Rules: ${canon.neverDo.join("; ")}.` : "";
  return `${canon.name.toUpperCase()}: ${canon.age}; ${canon.look}; wearing ${canon.outfit}.${never}`;
}

/** Prompt block describing every character that appears in a scene. */
export function buildScenePrompt(cast: StorybookSpeaker[]): string {
  return cast
    .filter((speaker) => speaker !== "narrator")
    .map(buildCharacterPrompt)
    .filter(Boolean)
    .join("\n");
}
