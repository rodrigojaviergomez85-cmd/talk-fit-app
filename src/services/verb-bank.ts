/**
 * PAST VERB BANK — a storytelling toolbox for Module 3.
 * 30 high-utility past verbs. One card per verb (never duplicated).
 * Verbs are DISCOVERED as the learner meets them in the existing lessons;
 * interaction is tracked objectively (listened / practiced) — never scored.
 */

import type { CourseDay } from "@/lib/types";

import wakeUp from "@/assets/module3/verb-wake-up.jpg";
import getUp from "@/assets/module3/verb-get-up.jpg";
import shower from "@/assets/module3/verb-shower.jpg";
import eat from "@/assets/module3/verb-eat.jpg";
import drink from "@/assets/module3/verb-drink.jpg";
import leave from "@/assets/module3/verb-leave.jpg";
import arrive from "@/assets/module3/verb-arrive.jpg";
import meeting from "@/assets/module3/verb-meeting.jpg";
import talk from "@/assets/module3/verb-talk.jpg";
import answerEmails from "@/assets/module3/verb-answer-emails.jpg";
import help from "@/assets/module3/verb-help.jpg";
import lunch from "@/assets/module3/verb-lunch.jpg";
import finish from "@/assets/module3/verb-finish.jpg";
import goHome from "@/assets/module3/verb-go-home.jpg";
import watchTv from "@/assets/module3/verb-watch-tv.jpg";
import phoneCall from "@/assets/module3/verb-phone-call.jpg";
import housework from "@/assets/module3/verb-housework.jpg";
import makeBreakfast from "@/assets/module3/verb-make-breakfast.jpg";
import buy from "@/assets/module3/verb-buy.jpg";
import movie from "@/assets/module3/verb-movie.jpg";
import meet from "@/assets/module3/verb-meet.jpg";
import comeHome from "@/assets/module3/verb-come-home.jpg";
import tired from "@/assets/module3/verb-tired.jpg";
import give from "@/assets/module3/verb-give.jpg";
import say from "@/assets/module3/verb-say.jpg";
import tell from "@/assets/module3/verb-tell.jpg";
import find from "@/assets/module3/verb-find.jpg";
import think from "@/assets/module3/verb-think.jpg";
import play from "@/assets/module3/verb-play.jpg";
import walk from "@/assets/module3/verb-walk.jpg";

export type VerbKind = "irregular" | "regular";

export type PastVerb = {
  id: string;
  present: string;
  past: string;
  kind: VerbKind;
  src: string;
  alt: string;
  /** Simple example in the past. */
  sentence: string;
  sentenceEs: string;
  /** Spanish gloss: "ir → fui". */
  gloss: string;
  /** Negative contrast used in Week 2 (didn't + base verb). */
  negative: { sentence: string; es: string };
  /** Sentence starter for USE IT. */
  useItPrompt: string;
  /** Extra past forms that also count as an encounter with this verb. */
  aliases?: string[];
  /** Useful for narration (Week 4 Story Verbs). */
  story?: boolean;
};

export const PAST_VERBS: PastVerb[] = [
  {
    id: "go", present: "GO", past: "WENT", kind: "irregular", src: goHome, alt: "A man going home",
    sentence: "Yesterday, I went home.", sentenceEs: "Ayer fui a casa.", gloss: "ir → fui",
    negative: { sentence: "I didn't go home.", es: "No fui a casa." }, useItPrompt: "Yesterday, I went…", story: true,
  },
  {
    id: "have", present: "HAVE", past: "HAD", kind: "irregular", src: lunch, alt: "People having lunch",
    sentence: "I had lunch with a friend.", sentenceEs: "Almorcé con un amigo.", gloss: "tener → tuve",
    negative: { sentence: "I didn't have lunch.", es: "No almorcé." }, useItPrompt: "Yesterday, I had…", story: true,
  },
  {
    id: "do", present: "DO", past: "DID", kind: "irregular", src: housework, alt: "A person doing housework",
    sentence: "I did the housework.", sentenceEs: "Hice los quehaceres.", gloss: "hacer → hice",
    negative: { sentence: "I didn't do the housework.", es: "No hice los quehaceres." }, useItPrompt: "Yesterday, I did…",
  },
  {
    id: "get", present: "GET", past: "GOT", kind: "irregular", src: getUp, alt: "A man getting out of bed",
    sentence: "I got out of bed at six.", sentenceEs: "Me levanté a las seis.", gloss: "obtener → obtuve",
    negative: { sentence: "I didn't get up early.", es: "No me levanté temprano." }, useItPrompt: "Yesterday, I got…",
    aliases: ["got up", "got out of bed", "got dressed"],
  },
  {
    id: "make", present: "MAKE", past: "MADE", kind: "irregular", src: makeBreakfast, alt: "A woman making breakfast",
    sentence: "I made breakfast at home.", sentenceEs: "Hice el desayuno en casa.", gloss: "hacer → hice",
    negative: { sentence: "I didn't make breakfast.", es: "No hice el desayuno." }, useItPrompt: "Yesterday, I made…",
  },
  {
    id: "take", present: "TAKE", past: "TOOK", kind: "irregular", src: shower, alt: "A person taking a shower",
    sentence: "I took a shower before work.", sentenceEs: "Me bañé antes del trabajo.", gloss: "tomar → tomé",
    negative: { sentence: "I didn't take a shower.", es: "No me bañé." }, useItPrompt: "Yesterday, I took…",
    aliases: ["took a shower", "took the bus"], story: true,
  },
  {
    id: "eat", present: "EAT", past: "ATE", kind: "irregular", src: eat, alt: "A man eating breakfast",
    sentence: "I ate breakfast at home.", sentenceEs: "Desayuné en casa.", gloss: "comer → comí",
    negative: { sentence: "I didn't eat breakfast.", es: "No desayuné." }, useItPrompt: "Yesterday, I ate…",
  },
  {
    id: "drink", present: "DRINK", past: "DRANK", kind: "irregular", src: drink, alt: "A man drinking coffee",
    sentence: "I drank some coffee.", sentenceEs: "Tomé café.", gloss: "beber → bebí",
    negative: { sentence: "I didn't drink coffee.", es: "No tomé café." }, useItPrompt: "Yesterday, I drank…",
  },
  {
    id: "see", present: "SEE", past: "SAW", kind: "irregular", src: movie, alt: "People watching a movie",
    sentence: "I saw a good movie.", sentenceEs: "Vi una buena película.", gloss: "ver → vi",
    negative: { sentence: "I didn't see the movie.", es: "No vi la película." }, useItPrompt: "Yesterday, I saw…", story: true,
  },
  {
    id: "come", present: "COME", past: "CAME", kind: "irregular", src: comeHome, alt: "A woman coming home",
    sentence: "I came home at six.", sentenceEs: "Llegué a casa a las seis.", gloss: "venir → vine",
    negative: { sentence: "I didn't come home early.", es: "No llegué temprano a casa." }, useItPrompt: "Yesterday, I came…", story: true,
  },
  {
    id: "leave", present: "LEAVE", past: "LEFT", kind: "irregular", src: leave, alt: "A person leaving home",
    sentence: "I left home at seven thirty.", sentenceEs: "Salí de casa a las siete y media.", gloss: "salir → salí",
    negative: { sentence: "I didn't leave early.", es: "No salí temprano." }, useItPrompt: "Yesterday, I left…", story: true,
  },
  {
    id: "meet", present: "MEET", past: "MET", kind: "irregular", src: meet, alt: "Two friends meeting",
    sentence: "I met a friend downtown.", sentenceEs: "Me encontré con un amigo en el centro.", gloss: "encontrarse → me encontré",
    negative: { sentence: "I didn't meet my friend.", es: "No me encontré con mi amigo." }, useItPrompt: "Yesterday, I met…", story: true,
  },
  {
    id: "buy", present: "BUY", past: "BOUGHT", kind: "irregular", src: buy, alt: "A woman buying something in a store",
    sentence: "I bought a new shirt.", sentenceEs: "Compré una camisa nueva.", gloss: "comprar → compré",
    negative: { sentence: "I didn't buy anything.", es: "No compré nada." }, useItPrompt: "Yesterday, I bought…",
  },
  {
    id: "wake-up", present: "WAKE UP", past: "WOKE UP", kind: "irregular", src: wakeUp, alt: "A woman waking up in bed",
    sentence: "Yesterday, I woke up early.", sentenceEs: "Ayer me desperté temprano.", gloss: "despertarse → me desperté",
    negative: { sentence: "I didn't wake up early.", es: "No me desperté temprano." }, useItPrompt: "Yesterday, I woke up…",
    aliases: ["woke"],
  },
  {
    id: "give", present: "GIVE", past: "GAVE", kind: "irregular", src: give, alt: "A woman giving a gift to a friend",
    sentence: "I gave her a gift.", sentenceEs: "Le di un regalo.", gloss: "dar → di",
    negative: { sentence: "I didn't give her a gift.", es: "No le di un regalo." }, useItPrompt: "Yesterday, I gave…", story: true,
  },
  {
    id: "say", present: "SAY", past: "SAID", kind: "irregular", src: say, alt: "A man saying something",
    sentence: "I said hello to my team.", sentenceEs: "Le dije hola a mi equipo.", gloss: "decir → dije",
    negative: { sentence: "I didn't say anything.", es: "No dije nada." }, useItPrompt: "Yesterday, I said…", story: true,
  },
  {
    id: "tell", present: "TELL", past: "TOLD", kind: "irregular", src: tell, alt: "A woman telling a story to a friend",
    sentence: "I told my friend a story.", sentenceEs: "Le conté una historia a mi amigo.", gloss: "contar → conté",
    negative: { sentence: "I didn't tell the story.", es: "No conté la historia." }, useItPrompt: "Yesterday, I told…", story: true,
  },
  {
    id: "find", present: "FIND", past: "FOUND", kind: "irregular", src: find, alt: "A man finding his keys",
    sentence: "I found my keys under the sofa.", sentenceEs: "Encontré mis llaves debajo del sofá.", gloss: "encontrar → encontré",
    negative: { sentence: "I didn't find my keys.", es: "No encontré mis llaves." }, useItPrompt: "Yesterday, I found…", story: true,
  },
  {
    id: "think", present: "THINK", past: "THOUGHT", kind: "irregular", src: think, alt: "A woman thinking",
    sentence: "I thought about my weekend.", sentenceEs: "Pensé en mi fin de semana.", gloss: "pensar → pensé",
    negative: { sentence: "I didn't think about it.", es: "No pensé en eso." }, useItPrompt: "Yesterday, I thought…",
  },
  {
    id: "feel", present: "FEEL", past: "FELT", kind: "irregular", src: tired, alt: "A tired man on the sofa",
    sentence: "I felt tired after work.", sentenceEs: "Me sentí cansado después del trabajo.", gloss: "sentirse → me sentí",
    negative: { sentence: "I didn't feel tired.", es: "No me sentí cansado." }, useItPrompt: "Yesterday, I felt…",
  },
  {
    id: "work", present: "WORK", past: "WORKED", kind: "regular", src: answerEmails, alt: "A woman working at a computer",
    sentence: "I worked from nine to five.", sentenceEs: "Trabajé de nueve a cinco.", gloss: "trabajar → trabajé",
    negative: { sentence: "I didn't work yesterday.", es: "No trabajé ayer." }, useItPrompt: "Yesterday, I worked…",
  },
  {
    id: "start", present: "START", past: "STARTED", kind: "regular", src: meeting, alt: "A team starting a meeting",
    sentence: "I started work at nine.", sentenceEs: "Empecé a trabajar a las nueve.", gloss: "empezar → empecé",
    negative: { sentence: "I didn't start early.", es: "No empecé temprano." }, useItPrompt: "Yesterday, I started…",
  },
  {
    id: "finish", present: "FINISH", past: "FINISHED", kind: "regular", src: finish, alt: "A man finishing work",
    sentence: "I finished work at five.", sentenceEs: "Terminé de trabajar a las cinco.", gloss: "terminar → terminé",
    negative: { sentence: "I didn't finish my work.", es: "No terminé mi trabajo." }, useItPrompt: "Yesterday, I finished…",
  },
  {
    id: "talk", present: "TALK", past: "TALKED", kind: "regular", src: talk, alt: "Two coworkers talking",
    sentence: "I talked to my manager.", sentenceEs: "Hablé con mi jefe.", gloss: "hablar → hablé",
    negative: { sentence: "I didn't talk to my manager.", es: "No hablé con mi jefe." }, useItPrompt: "Yesterday, I talked…",
  },
  {
    id: "call", present: "CALL", past: "CALLED", kind: "regular", src: phoneCall, alt: "A woman on a phone call",
    sentence: "I called my mom last night.", sentenceEs: "Llamé a mi mamá anoche.", gloss: "llamar → llamé",
    negative: { sentence: "I didn't call my mom.", es: "No llamé a mi mamá." }, useItPrompt: "Yesterday, I called…",
  },
  {
    id: "help", present: "HELP", past: "HELPED", kind: "regular", src: help, alt: "A man helping a customer",
    sentence: "I helped a customer.", sentenceEs: "Ayudé a un cliente.", gloss: "ayudar → ayudé",
    negative: { sentence: "I didn't help him.", es: "No lo ayudé." }, useItPrompt: "Yesterday, I helped…",
  },
  {
    id: "watch", present: "WATCH", past: "WATCHED", kind: "regular", src: watchTv, alt: "A couple watching TV",
    sentence: "I watched TV at night.", sentenceEs: "Vi tele en la noche.", gloss: "ver → vi",
    negative: { sentence: "I didn't watch TV.", es: "No vi tele." }, useItPrompt: "Yesterday, I watched…",
  },
  {
    id: "play", present: "PLAY", past: "PLAYED", kind: "regular", src: play, alt: "Adults playing soccer in a park",
    sentence: "I played soccer with friends.", sentenceEs: "Jugué fútbol con amigos.", gloss: "jugar → jugué",
    negative: { sentence: "I didn't play soccer.", es: "No jugué fútbol." }, useItPrompt: "Yesterday, I played…",
  },
  {
    id: "arrive", present: "ARRIVE", past: "ARRIVED", kind: "regular", src: arrive, alt: "A man arriving at the office",
    sentence: "I arrived at work at eight.", sentenceEs: "Llegué al trabajo a las ocho.", gloss: "llegar → llegué",
    negative: { sentence: "I didn't arrive late.", es: "No llegué tarde." }, useItPrompt: "Yesterday, I arrived…",
  },
  {
    id: "walk", present: "WALK", past: "WALKED", kind: "regular", src: walk, alt: "A man walking on a city street",
    sentence: "I walked to the office.", sentenceEs: "Caminé a la oficina.", gloss: "caminar → caminé",
    negative: { sentence: "I didn't walk to work.", es: "No caminé al trabajo." }, useItPrompt: "Yesterday, I walked…",
  },
];

export type VerbStat = {
  discovered: boolean;
  firstDiscoveredAt: string | null;
  listenCount: number;
  practiceCount: number;
};

export type VerbBankState = Record<string, VerbStat>;

const PREFIX = "fluency-reps:verb-bank:v1";
let scope = "guest";
const listeners = new Set<() => void>();

function keyFor(id: string): string {
  return `${PREFIX}:${id}`;
}

function notify() {
  listeners.forEach((fn) => fn());
}

export function subscribeVerbBank(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** Scope verb progress to the signed-in learner (or "guest"). */
export function setVerbBankScope(userId: string | null) {
  const next = userId ?? "guest";
  if (next === scope) return;
  scope = next;
  notify();
}

const emptyStat: VerbStat = { discovered: false, firstDiscoveredAt: null, listenCount: 0, practiceCount: 0 };

function read(): VerbBankState {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(keyFor(scope));
    return raw ? (JSON.parse(raw) as VerbBankState) : {};
  } catch {
    return {};
  }
}

function write(state: VerbBankState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(keyFor(scope), JSON.stringify(state));
  } catch {
    /* storage unavailable */
  }
  notify();
}

/** Past forms (lowercase) that count as an encounter with a verb. */
function formsOf(verb: PastVerb): string[] {
  return [verb.past.toLowerCase(), ...(verb.aliases ?? []).map((a) => a.toLowerCase())];
}

export const VerbBank = {
  all: () => PAST_VERBS,

  byId(id: string): PastVerb | undefined {
    return PAST_VERBS.find((verb) => verb.id === id);
  },

  load(): VerbBankState {
    return read();
  },

  stat(state: VerbBankState, id: string): VerbStat {
    return state[id] ?? emptyStat;
  },

  discoveredCount(state: VerbBankState): number {
    return PAST_VERBS.filter((verb) => state[verb.id]?.discovered).length;
  },

  total: () => PAST_VERBS.length,

  /** Marks verbs as discovered; returns the ids that were new. */
  discover(ids: string[]): string[] {
    const state = read();
    const fresh: string[] = [];
    for (const id of ids) {
      if (!PAST_VERBS.some((verb) => verb.id === id)) continue;
      if (state[id]?.discovered) continue;
      state[id] = {
        ...(state[id] ?? emptyStat),
        discovered: true,
        firstDiscoveredAt: state[id]?.firstDiscoveredAt ?? new Date().toISOString(),
      };
      fresh.push(id);
    }
    if (fresh.length) write(state);
    return fresh;
  },

  countListen(id: string) {
    const state = read();
    const current = state[id] ?? emptyStat;
    state[id] = { ...current, listenCount: current.listenCount + 1 };
    write(state);
  },

  countPractice(id: string) {
    const state = read();
    const current = state[id] ?? emptyStat;
    state[id] = { ...current, practiceCount: current.practiceCount + 1 };
    write(state);
  },

  /** Verbs the learner meets in this Module 3 day, derived from existing lesson text. */
  verbsForDay(day: CourseDay): string[] {
    const haystack = [
      ...day.lines.map((line) => line.text),
      ...(day.verbCards ?? []).map((card) => `${card.past} ${card.sentence}`),
      ...day.cues,
      day.rep5Tips?.en ?? "",
    ]
      .join(" ")
      .toLowerCase();

    const ids: string[] = [];
    for (const verb of PAST_VERBS) {
      const hit = formsOf(verb).some((form) =>
        new RegExp(`(^|[^a-z])${form.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}($|[^a-z])`).test(haystack),
      );
      if (hit) ids.push(verb.id);
    }
    return ids;
  },

  /** Up to 6 verbs previewed before Rep 1. */
  todaysVerbs(day: CourseDay): PastVerb[] {
    return this.verbsForDay(day)
      .map((id) => this.byId(id))
      .filter((verb): verb is PastVerb => Boolean(verb))
      .slice(0, 6);
  },

  /** Narration verbs already discovered (Week 4 Story Verbs). */
  storyVerbs(state: VerbBankState): PastVerb[] {
    return PAST_VERBS.filter((verb) => verb.story && state[verb.id]?.discovered);
  },
};
