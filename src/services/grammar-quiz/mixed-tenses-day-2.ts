import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 2 — My Future Plans (going to · will · I'll · won't).
 * Historia: Dani planea el viaje a la playa y la mudanza.
 * 6 ancla · 6 transferencia · 4 repaso (pasado, presente) · 4 básicos.
 */
const DETECTIVE = "Dani escribió sus planes en el chat. Toca el error antes de que lo mande.";
const CHISME = "Vale lo contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_2: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 2,
  title: { en: "Dani's Big Plans", es: "Los grandes planes de Dani" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g2-1", "Next month, I ___ to the beach.", "El próximo mes voy a viajar a la playa.", ["am going to travel", "traveled", "travel", "was traveling"], 0, {
      en: "A plan: am going to travel.",
      es: "Un plan decidido: am going to travel.",
    }),
    mc("m5g2-2", "I ___ my bag the night before.", "Voy a empacar mi maleta la noche anterior.", ["'ll pack", "packed", "pack", "was packing"], 0, {
      en: "I'll pack: a promise or decision.",
      es: "I'll pack: decisión o promesa sobre el futuro.",
    }),
    mc("m5g2-3", "My sister ___ me up on Saturday morning.", "Mi hermana me va a recoger el sábado en la mañana.", ["is going to pick", "picks", "picked", "am going to pick"], 0, {
      en: "my sister = she: is going to pick.",
      es: "my sister = she: is going to pick. Tercera persona, is.",
    }),
    mistake("m5g2-4", "We going to drive for three hours.", "going", "are going", {
      en: "We are going to drive.",
      es: "We are going to drive. Falta el are: going to siempre lleva am/is/are.",
    }, DETECTIVE),
    mistake("m5g2-5", "I'm not going to buy new furnitures for the apartment.", "furnitures", "furniture", {
      en: "furniture is uncountable: no -s.",
      es: "furniture no se cuenta: nunca lleva -s. «Furnitures» es calco de «muebles».",
    }, DETECTIVE),
    rearrange(
      "m5g2-6",
      ["will be", "I think", "easy and fun", "the move"],
      ["I think", "the move", "will be", "easy and fun"],
      { en: "I think + subject + will be + adjectives.", es: "I think + sujeto + will be + adjetivos. Predicción con will." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g2-7", "Vale: Next year my parents ___ to a smaller house.", "Vale: El próximo año mis papás se van a mudar a una casa más pequeña.", ["are going to move", "is going to move", "moved", "move"], 0, {
      en: "my parents = they: are going to move.",
      es: "my parents = they: are going to move. Plural, are.",
    }),
    mc("m5g2-8", "Dani: The bags are heavy. I ___ you.", "Dani: Las maletas pesan. Te ayudo.", ["'ll help", "am going to help", "helped", "help"], 0, {
      en: "A decision right now: I'll help.",
      es: "Decisión en el momento: I'll help. going to es para planes hechos antes; will para lo que decidís ahora.",
    }),
    mc("m5g2-9", "Camila: ___ you ___ to paint the walls yourself?", "Camila: ¿Vas a pintar las paredes vos mismo?", ["Are / going", "Do / going", "Are / go", "Will / going"], 0, {
      en: "Question with going to: Are you going to ...?",
      es: "Pregunta con going to: Are you going to ...? Se invierte are y you.",
    }),
    mistake("m5g2-10", "My sister isn't going to helps me on Saturday.", "helps", "help", {
      en: "After going to, base form: help.",
      es: "Después de going to el verbo va en base: help, sin -s.",
    }, DETECTIVE),
    rearrange(
      "m5g2-11",
      ["the walls", "myself", "I'll", "paint"],
      ["I'll", "paint", "the walls", "myself"],
      { en: "I'll + verb + object + myself.", es: "I'll + verbo + objeto + myself (yo mismo)." },
      CHISME,
    ),
    rearrange(
      "m5g2-12",
      ["won't", "late", "Dani", "be", "on Saturday"],
      ["Dani", "won't", "be", "late", "on Saturday"],
      { en: "Subject + won't + be + adjective + time.", es: "Sujeto + won't + be + adjetivo + tiempo. won't = will not." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g2-13", "Dani: Last year I ___ to the mountains, not the beach.", "Dani: El año pasado viajé a las montañas, no a la playa.", ["traveled", "travel", "am going to travel", "was travel"], 0, {
      en: "Last year: traveled.",
      es: "Last year: traveled, pasado. Repaso de Basic 3.",
    }),
    mc("m5g2-14", "Vale: My sister ___ a bigger car now. She drives it every day.", "Vale: Mi hermana tiene un carro más grande ahora. Lo maneja todos los días.", ["has", "have", "had", "is having"], 0, {
      en: "now + she: has.",
      es: "now + she: has. Presente, tercera persona. Repaso de Basic 2.",
    }),
    mistake("m5g2-15", "Dani don't like long drives.", "don't", "doesn't", {
      en: "Dani = he: doesn't.",
      es: "Dani = he: doesn't. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g2-16", "Two years ago Dani move to this apartment.", "move", "moved", {
      en: "Two years ago: moved.",
      es: "Two years ago: moved, pasado. Repaso de Basic 3.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g2-17", "We're going to drive ___ the beach ___ Saturday.", "Vamos a manejar a la playa el sábado.", ["to / on", "at / in", "to / in", "in / on"], 0, {
      en: "drive to a place, on Saturday.",
      es: "to para dirección (drive to the beach), on para el día.",
    }),
    mc("m5g2-18", "I'm going to move to ___ bigger apartment with ___ big kitchen.", "Me voy a mudar a un apartamento más grande con una cocina grande.", ["a / a", "an / a", "a / an", "the / the"], 0, {
      en: "a bigger apartment, a big kitchen: consonant sounds.",
      es: "a bigger, a big: sonido de consonante. an solo va con sonido de vocal.",
    }),
    mistake("m5g2-19", "Those apartment is bigger than mine.", "Those", "That", {
      en: "apartment is singular: that apartment.",
      es: "apartment es singular: that apartment. those es plural.",
    }, DETECTIVE),
    mistake("m5g2-20", "My sister is going to pick me up in seven.", "in", "at", {
      en: "at + clock time: at seven.",
      es: "at con la hora: at seven. in es para meses, años y partes del día.",
    }, DETECTIVE),
  ],
};
