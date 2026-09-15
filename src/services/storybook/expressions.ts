/**
 * Global dictionary of phrasal verbs and idioms used across El Mundo de Vale.
 *
 * These are tapped and translated as ONE complete expression ("sort it out" =
 * "resolverlo"), never word by word. Every episode of every season inherits
 * this list automatically; an episode's own `expressions` still win.
 *
 * A "*" inside a phrase is a pronoun slot: "pick * up" also matches
 * "pick her up", "picked them up", etc.
 */

/** Verb forms for the verbs used at the start of the expressions below. */
const VERB_FORMS: Record<string, string[]> = {
  back: ["backs", "backed", "backing"],
  break: ["breaks", "broke", "broken", "breaking"],
  bring: ["brings", "brought", "bringing"],
  calm: ["calms", "calmed", "calming"],
  carry: ["carries", "carried", "carrying"],
  catch: ["catches", "caught", "catching"],
  check: ["checks", "checked", "checking"],
  cheer: ["cheers", "cheered", "cheering"],
  come: ["comes", "came", "coming"],
  cut: ["cuts", "cutting"],
  fill: ["fills", "filled", "filling"],
  find: ["finds", "found", "finding"],
  figure: ["figures", "figured", "figuring"],
  follow: ["follows", "followed", "following"],
  get: ["gets", "got", "gotten", "getting"],
  give: ["gives", "gave", "given", "giving"],
  go: ["goes", "went", "gone", "going"],
  grow: ["grows", "grew", "grown", "growing"],
  hang: ["hangs", "hung", "hanging"],
  hold: ["holds", "held", "holding"],
  keep: ["keeps", "kept", "keeping"],
  light: ["lights", "lit", "lighting"],
  log: ["logs", "logged", "logging"],
  look: ["looks", "looked", "looking"],
  make: ["makes", "made", "making"],
  pick: ["picks", "picked", "picking"],
  point: ["points", "pointed", "pointing"],
  push: ["pushes", "pushed", "pushing"],
  put: ["puts", "putting"],
  reach: ["reaches", "reached", "reaching"],
  run: ["runs", "ran", "running"],
  set: ["sets", "setting"],
  show: ["shows", "showed", "shown", "showing"],
  shut: ["shuts", "shutting"],
  sign: ["signs", "signed", "signing"],
  sit: ["sits", "sat", "sitting"],
  slow: ["slows", "slowed", "slowing"],
  sort: ["sorts", "sorted", "sorting"],
  speak: ["speaks", "spoke", "spoken", "speaking"],
  stand: ["stands", "stood", "standing"],
  start: ["starts", "started", "starting"],
  step: ["steps", "stepped", "stepping"],
  take: ["takes", "took", "taken", "taking"],
  turn: ["turns", "turned", "turning"],
  wake: ["wakes", "woke", "woken", "waking"],
  work: ["works", "worked", "working"],
  write: ["writes", "wrote", "written", "writing"],
};

const PRONOUNS = ["it", "this", "that", "him", "her", "them", "me", "us", "you", "everything"];

/** Base expression → meaning in Spanish (the whole expression, not its words). */
export const PHRASE_GLOSSARY: Record<string, string> = {
  // Phrasal verbs
  "wake up": "despertarse",
  "get up": "levantarse",
  "stand up": "ponerse de pie / levantarse",
  "sit down": "sentarse",
  "show up": "presentarse / aparecer",
  "give up": "rendirse / darse por vencido",
  "back out": "echarse para atrás / retractarse",
  "sort out": "resolver / arreglar",
  "sort * out": "resolverlo / arreglarlo",
  "figure out": "descifrar / entender",
  "figure * out": "descifrarlo / entenderlo",
  "work out": "resolverse / salir bien",
  "work * out": "resolverlo",
  "pick up": "recoger / levantar",
  "pick * up": "recogerlo / recogerla",
  "hang up": "colgar (el teléfono)",
  "look for": "buscar",
  "take care of": "encargarse de / cuidar de",
  "come back": "regresar / volver",
  "go back": "regresar / volver",
  "find out": "averiguar / enterarse",
  "call back": "devolver la llamada",
  "call * back": "devolverle la llamada",
  "turn down": "rechazar / bajar (el volumen)",
  "turn * down": "rechazarlo",
  "turn up": "subir (el volumen) / aparecer",
  "set up": "montar / organizar",
  "set * up": "montarlo / organizarlo",
  "carry on": "seguir adelante / continuar",
  "keep up": "mantener el ritmo",
  "catch up": "ponerse al día",
  "push back": "poner resistencia / posponer",
  "write down": "anotar / apuntar",
  "write * down": "anotarlo / apuntarlo",
  "slow down": "ir más despacio",
  "speak up": "hablar más fuerte / alzar la voz",
  "shut down": "cerrar / apagar",
  "shut * down": "cerrarlo / apagarlo",
  "check in": "registrarse / reportarse",
  "fill out": "llenar (un formulario)",
  "fill * out": "llenarlo",
  "hold on": "esperar un momento",
  "hang on": "esperar un momento",
  "run out": "acabarse / quedarse sin",
  "run out of": "quedarse sin",
  "take over": "tomar el control / hacerse cargo",
  "bring up": "mencionar / sacar el tema",
  "bring * up": "mencionarlo",
  "point out": "señalar / hacer notar",
  "point * out": "señalarlo",
  "grow up": "crecer",
  "give in": "ceder",
  "put off": "posponer",
  "put * off": "posponerlo",
  "cut back": "recortar / reducir",
  "reach out": "contactar / buscar ayuda",
  "follow up": "dar seguimiento",
  "step up": "dar un paso al frente / asumir el reto",
  "log in": "iniciar sesión",
  "sign up": "inscribirse / registrarse",
  "start over": "empezar de nuevo",
  "calm down": "calmarse",
  "cheer up": "animarse",
  "light up": "iluminarse / encenderse",
  "break down": "descomponerse / desglosar",
  "come on": "vamos / anímate",
  "come in": "entrar / pasar",
  "walk in": "entrar caminando",
  "walk out": "salirse / irse",
  "look up": "levantar la vista / buscar (una palabra)",
  "think about": "pensar en",
  "talk about": "hablar de",
  "wait for": "esperar a",
  "pay for": "pagar por",
  "ask for": "pedir",
  "care about": "importarle / preocuparse por",
  "deal with": "lidiar con / manejar",
  "count on": "contar con",
  "show off": "presumir / lucirse",

  // Idioms and fixed expressions
  "the bottom line": "lo esencial / la conclusión final",
  "make sense": "tener sentido",
  "on time": "a tiempo / puntual",
  "right away": "de inmediato",
  "a big deal": "algo importante",
  "no big deal": "no es gran cosa",
  "so far": "hasta ahora",
  "at least": "por lo menos",
  "by heart": "de memoria",
  "keep going": "seguir adelante",
  "little by little": "poco a poco",
  "step by step": "paso a paso",
  "from scratch": "desde cero",
  "in charge of": "a cargo de",
  "in charge": "a cargo",
  "on my own": "por mi cuenta / solo",
  "on her own": "por su cuenta / sola",
  "on his own": "por su cuenta / solo",
  "on their own": "por su cuenta / solos",
  "on your own": "por tu cuenta / solo",
  "up to you": "depende de ti / tú decides",
  "hang in there": "aguanta / no te rindas",
  "a piece of cake": "pan comido / muy fácil",
  "break the ice": "romper el hielo",
  "on the same page": "de acuerdo / en sintonía",
  "win-win": "beneficio para ambos",
  "go the extra mile": "hacer un esfuerzo extra",
  "call it a day": "dar por terminado el día",
  "out of the blue": "de la nada / de repente",
  "a game changer": "algo que cambia todo",
  "touch base": "ponerse en contacto brevemente",
  "in the long run": "a la larga",
  "under pressure": "bajo presión",
  "good luck": "buena suerte",
  "of course": "por supuesto / claro",
  "no worries": "no hay problema",
  "thank you": "gracias",
};

/** Expand one base phrase into every written form learners may see. */
export function expandPhrase(phrase: string): string[] {
  const words = phrase.split(" ");
  const first = words[0] ?? "";
  const firstForms = [first, ...(VERB_FORMS[first] ?? [])];
  const slotIndex = words.indexOf("*");

  const out: string[] = [];
  for (const form of firstForms) {
    const rest = words.slice(1);
    if (slotIndex === -1) {
      out.push([form, ...rest].join(" "));
      continue;
    }
    for (const pronoun of PRONOUNS) {
      const filled = words.map((w, i) => (i === 0 ? form : i === slotIndex ? pronoun : w));
      out.push(filled.join(" "));
    }
  }
  return [...new Set(out)];
}

/** Every written form of every global expression → its Spanish meaning. */
export function buildGlobalExpressionMap(): Map<string, string> {
  const map = new Map<string, string>();
  for (const [phrase, es] of Object.entries(PHRASE_GLOSSARY)) {
    for (const variant of expandPhrase(phrase)) map.set(variant, es);
  }
  return map;
}

let cached: Map<string, string> | null = null;

/** Cached singleton of {@link buildGlobalExpressionMap}. */
export function globalExpressionMap(): Map<string, string> {
  if (!cached) cached = buildGlobalExpressionMap();
  return cached;
}
