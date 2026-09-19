import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 14 — Listen, Understand & Answer (Marcos: tres años en la ciudad).
 * Historia: Camila cuenta la historia de Marcos, el diseñador de menús.
 * 6 ancla · 6 transferencia · 4 repaso (preguntas, was doing, didn't) · 4 básicos.
 */
const DETECTIVE = "Camila escribió la historia de Marcos. Toca el error antes de que la publique.";
const CHISME = "Vale la contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_14: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 14,
  title: { en: "Marcos and the Menus", es: "Marcos y los menús" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g14-1", "Marcos ___ to this city three years ago. At first, he ___ dishes in a hotel.", "Marcos se mudó a esta ciudad hace tres años. Al principio lavaba platos en un hotel.", ["moved / washed", "moves / washes", "moved / washes", "is moving / washed"], 0, {
      en: "three years ago: moved. At first: washed.",
      es: "three years ago: moved. At first: washed. Los dos en pasado.",
    }),
    mc("m5g14-2", "Now, he ___ menus for restaurants. He ___ from a small studio downtown.", "Ahora diseña menús para restaurantes. Trabaja desde un estudio pequeño en el centro.", ["designs / works", "designed / worked", "design / work", "is design / works"], 0, {
      en: "Now: designs, works (-s).",
      es: "Now: designs, works, con -s. Presente, tercera persona.",
    }),
    mc("m5g14-3", "Right now, he ___ money for new equipment. Next year, he ___ his own studio.", "Ahora mismo está ahorrando para equipo nuevo. El próximo año va a abrir su propio estudio.", ["is saving / is going to open", "saves / opened", "saved / opens", "is saving / opened"], 0, {
      en: "Right now: is saving. Next year: is going to open.",
      es: "Right now: is saving, progresivo. Next year: is going to open, plan.",
    }),
    mistake("m5g14-4", "Last month, a famous restaurant choose his design.", "choose", "chose", {
      en: "choose → chose.",
      es: "choose → chose. Last month: pasado, irregular.",
    }, DETECTIVE),
    mistake("m5g14-5", "He believe his life will change completely.", "believe", "believes", {
      en: "he believes.",
      es: "he believes, con -s. Presente, tercera persona.",
    }, DETECTIVE),
    rearrange(
      "m5g14-6",
      ["from a small studio", "works", "downtown", "He"],
      ["He", "works", "from a small studio", "downtown"],
      { en: "He + works + from where + downtown.", es: "He + works + desde dónde + downtown." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g14-7", "Vale: My cousin ___ here two years ago. At first she ___ tables; now she ___ the restaurant.", "Vale: Mi prima llegó hace dos años. Al principio atendía mesas; ahora administra el restaurante.", ["arrived / waited / manages", "arrives / waits / manages", "arrived / waits / managed", "arrived / waited / manage"], 0, {
      en: "arrived, waited (past); manages (now, -s).",
      es: "arrived, waited, pasado; manages, ahora, con -s.",
    }),
    mc("m5g14-8", "Camila: Right now Marcos ___ a menu for a new café. Tomorrow he ___ it to the owner.", "Camila: Ahora mismo Marcos está diseñando un menú para un café nuevo. Mañana se lo va a mostrar al dueño.", ["is designing / is going to show", "designs / showed", "designed / shows", "is designing / showed"], 0, {
      en: "Right now: is designing. Tomorrow: is going to show.",
      es: "Right now: is designing. Tomorrow: is going to show.",
    }),
    mc("m5g14-9", "Vale: ___ Marcos ___ dishes now? · Camila: No, he doesn't. He designs.", "Vale: ¿Marcos lava platos ahora? · Camila: No. Diseña.", ["Does / wash", "Did / wash", "Does / washes", "Is / wash"], 0, {
      en: "now: Does Marcos wash?",
      es: "now: Does Marcos wash? Presente, tercera persona, verbo en base.",
    }),
    mistake("m5g14-10", "Two years ago, my cousin work at a hotel too.", "work", "worked", {
      en: "Two years ago: worked.",
      es: "Two years ago: worked, pasado.",
    }, DETECTIVE),
    rearrange(
      "m5g14-11",
      ["his design", "chose", "Last month,", "a famous restaurant"],
      ["Last month,", "a famous restaurant", "chose", "his design"],
      { en: "Time + subject + chose + object.", es: "Tiempo + sujeto + chose + objeto." },
      CHISME,
    ),
    rearrange(
      "m5g14-12",
      ["for new equipment", "money", "is saving", "Right now,", "he"],
      ["Right now,", "he", "is saving", "money", "for new equipment"],
      { en: "Right now, + he + is saving + object + purpose.", es: "Right now, + he + is saving + objeto + para qué." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g14-13", "Vale: What ___ Marcos ___ when the restaurant called? · Camila: He was washing dishes.", "Vale: ¿Qué estaba haciendo Marcos cuando llamó el restaurante? · Camila: Estaba lavando platos.", ["was / doing", "did / doing", "does / do", "was / did"], 0, {
      en: "What was he doing? In progress when the call came.",
      es: "What was he doing? En progreso cuando llegó la llamada. Repaso de Basic 3.",
    }),
    mc("m5g14-14", "Camila: Marcos ___ any money the first year. Everything went to rent.", "Camila: Marcos no ahorró nada el primer año. Todo se fue en alquiler.", ["didn't save", "doesn't save", "didn't saved", "not saved"], 0, {
      en: "the first year (past): didn't save.",
      es: "the first year, pasado: didn't save. Repaso de Basic 3.",
    }),
    mistake("m5g14-15", "I think Marcos will opens his studio next year.", "opens", "open", {
      en: "will + base verb: will open.",
      es: "will + verbo base: will open, sin -s. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("m5g14-16", "Marcos don't wash dishes anymore.", "don't", "doesn't", {
      en: "Marcos = he: doesn't.",
      es: "Marcos = he: doesn't. Repaso de Basic 2.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g14-17", "Marcos moved ___ this city ___ 2023 and works ___ a small studio.", "Marcos se mudó a esta ciudad en 2023 y trabaja en un estudio pequeño.", ["to / in / in", "at / on / at", "to / on / in", "in / in / at"], 0, {
      en: "moved to (direction), in 2023 (year), in a studio (place).",
      es: "moved to: dirección. in 2023: año. in a studio: dentro del lugar.",
    }),
    mc("m5g14-18", "He is designing a menu for ___ new café near ___ studio.", "Está diseñando un menú para un café nuevo cerca de su estudio.", ["a / his", "an / his", "the / his", "a / a"], 0, {
      en: "a new café (first mention, consonant sound), his studio (his own).",
      es: "a new café: primera mención, sonido de consonante. his studio: el suyo.",
    }),
    mistake("m5g14-19", "Marcos saves money for buy new equipment.", "for", "to", {
      en: "to + verb for purpose: to buy.",
      es: "to + verbo para el propósito: to buy. «For buy» es calco de «para comprar».",
    }, DETECTIVE),
    mistake("m5g14-20", "At first, he washed the dishes in a hotel of the city center.", "of", "in", {
      en: "a hotel in the city center.",
      es: "a hotel in the city center. «Of the city center» es calco de «del centro».",
    }, DETECTIVE),
  ],
};
