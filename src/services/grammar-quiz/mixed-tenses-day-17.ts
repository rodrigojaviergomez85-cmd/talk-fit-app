import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 17 — Someone Else's Story (Sofía: del camión a diseñar desde casa).
 * Historia: Ana cuenta la historia de Sofía, su prima.
 * 6 ancla · 6 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Ana escribió la historia de Sofía. Toca el error antes de que la publique.";
const CHISME = "Luis la contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_17: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 17,
  title: { en: "Sofia's Story", es: "La historia de Sofía" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g17-1", "Three years ago, Sofia ___ a delivery truck. She ___ up at four every morning.", "Hace tres años, Sofía manejaba un camión de reparto. Se levantaba a las cuatro todas las mañanas.", ["drove / woke", "drives / wakes", "drove / wakes", "drive / woke"], 0, {
      en: "Three years ago: drove, woke.",
      es: "Three years ago: drove, woke. Todo en pasado, aunque diga every morning: era su rutina de antes.",
    }),
    mc("m5g17-2", "She ___ money and ___ an online course.", "Ahorró dinero y tomó un curso en línea.", ["saved / took", "saves / takes", "saved / take", "save / took"], 0, {
      en: "saved, took: both past.",
      es: "saved, took: los dos en pasado. take → took.",
    }),
    mc("m5g17-3", "Now, she ___ websites from home. She ___ more and she ___ better.", "Ahora diseña sitios web desde casa. Gana más y duerme mejor.", ["designs / earns / sleeps", "designed / earned / slept", "design / earn / sleep", "designs / earned / sleeps"], 0, {
      en: "Now: designs, earns, sleeps (-s).",
      es: "Now: designs, earns, sleeps. Presente, tercera persona, tres -s.",
    }),
    mistake("m5g17-4", "Right now, she learning marketing.", "learning", "is learning", {
      en: "Right now: is learning.",
      es: "Right now: is learning. Falta el is.",
    }, DETECTIVE),
    mistake("m5g17-5", "Next year, she's going to starts her own business.", "starts", "start", {
      en: "going to + base form: start.",
      es: "going to + forma base: start, sin -s.",
    }, DETECTIVE),
    rearrange(
      "m5g17-6",
      ["very successful", "she'll be", "I think"],
      ["I think", "she'll be", "very successful"],
      { en: "I think + she'll be + adjective.", es: "I think + she'll be + adjetivo. Predicción con will." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g17-7", "Luis: Two years ago my brother ___ in a factory. Now he ___ a food truck, and next year he ___ a second one.", "Luis: Hace dos años mi hermano trabajaba en una fábrica. Ahora tiene un food truck, y el próximo año va a comprar otro.", ["worked / has / is going to buy", "works / had / buys", "worked / has / bought", "work / has / is going to buy"], 0, {
      en: "worked (past), has (now), is going to buy (next year).",
      es: "worked, pasado; has, ahora; is going to buy, plan. Tres tiempos, tercera persona.",
    }),
    mc("m5g17-8", "Ana: ___ Sofia ___ a truck now? · Luis: No, she ___. She designs websites.", "Ana: ¿Sofía maneja un camión ahora? · Luis: No. Diseña sitios web.", ["Does / drive / doesn't", "Did / drive / didn't", "Does / drives / doesn't", "Is / drive / isn't"], 0, {
      en: "now: Does she drive? No, she doesn't.",
      es: "now: Does she drive? No, she doesn't. Presente, tercera persona.",
    }),
    mc("m5g17-9", "Luis: When ___ Sofia ___ the online course? · Ana: Two years ago.", "Luis: ¿Cuándo tomó Sofía el curso en línea? · Ana: Hace dos años.", ["did / take", "does / take", "did / took", "was / take"], 0, {
      en: "Two years ago: When did she take?",
      es: "Two years ago: When did she take? did + base.",
    }),
    mistake("m5g17-10", "Sofia earn more money now than before.", "earn", "earns", {
      en: "Sofia = she: earns.",
      es: "Sofia = she: earns, con -s.",
    }, DETECTIVE),
    rearrange(
      "m5g17-11",
      ["a delivery truck", "drove", "Three years ago,", "Sofia"],
      ["Three years ago,", "Sofia", "drove", "a delivery truck"],
      { en: "Time + subject + drove + object.", es: "Tiempo + sujeto + drove + objeto." },
      CHISME,
    ),
    rearrange(
      "m5g17-12",
      ["from home", "designs", "websites", "Now,", "she"],
      ["Now,", "she", "designs", "websites", "from home"],
      { en: "Now, + she + designs + object + from where.", es: "Now, + she + designs + objeto + desde dónde." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g17-13", "Ana: When I called Sofia yesterday, she ___ a website for a hotel.", "Ana: Cuando llamé a Sofía ayer, estaba diseñando un sitio web para un hotel.", ["was designing", "designs", "designed", "is designing"], 0, {
      en: "In progress when I called: was designing.",
      es: "En progreso cuando llamé: was designing. Repaso de Basic 3.",
    }),
    mc("m5g17-14", "Luis: Sofia ___ well when she drove the truck. She was always tired.", "Luis: Sofía no dormía bien cuando manejaba el camión. Siempre estaba cansada.", ["didn't sleep", "doesn't sleep", "didn't slept", "wasn't sleep"], 0, {
      en: "when she drove the truck (past): didn't sleep.",
      es: "when she drove the truck, pasado: didn't sleep. Repaso de Basic 3.",
    }),
    mistake("m5g17-15", "I think Sofia will opens an office next year.", "opens", "open", {
      en: "will + base verb: will open.",
      es: "will + verbo base: will open, sin -s. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("m5g17-16", "Sofia don't drive trucks anymore.", "don't", "doesn't", {
      en: "Sofia = she: doesn't.",
      es: "Sofia = she: doesn't. Repaso de Basic 2.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g17-17", "She woke up ___ four ___ the morning and drove ___ the city.", "Se levantaba a las cuatro de la mañana y manejaba a la ciudad.", ["at / in / to", "in / at / at", "at / on / in", "on / in / to"], 0, {
      en: "at four, in the morning, drove to the city.",
      es: "at four: hora. in the morning: parte del día. to the city: dirección.",
    }),
    mc("m5g17-18", "She took ___ online course and now she has ___ own business.", "Tomó un curso en línea y ahora tiene su propio negocio.", ["an / her", "a / her", "an / his", "the / hers"], 0, {
      en: "an online course (vowel sound), her own business.",
      es: "an online course: sonido de vocal. her own business: de ella, her + own.",
    }),
    mistake("m5g17-19", "Sofia is Ana's cousin and she lives close of Ana's house.", "of", "to", {
      en: "close to a place.",
      es: "close to: cerca de. «Close of» es calco.",
    }, DETECTIVE),
    mistake("m5g17-20", "Sofia has 34 years old and she lives with her two kids.", "has", "is", {
      en: "Age: is 34 years old.",
      es: "La edad con be: is 34 years old. «Has 34 years» es calco.",
    }, DETECTIVE),
  ],
};
