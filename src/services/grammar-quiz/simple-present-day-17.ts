import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 17 — At the beach: is / are + -ing · swimming, building, taking.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Lucía escribió lo que ve en la playa. Toca la palabra equivocada.";
const CHISME = "Lucía dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_17: GrammarQuiz = {
  moduleId: "simple-present",
  day: 17,
  title: { en: "At the Beach", es: "En la playa" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg17-1", "Two people ___ swimming in the ocean.", "Dos personas están nadando en el mar.", ["are", "is", "am"], 0, {
      en: "two people: are.",
      es: "Two people → are + -ing.",
    }),
    mc("spg17-2", "A child is ___ a sandcastle.", "Un niño está construyendo un castillo de arena.", ["building", "build", "builds"], 0, {
      en: "is + building.",
      es: "is + building: está construyendo.",
    }),
    mc("spg17-3", "A man ___ drinking water.", "Un hombre está tomando agua.", ["is", "are", "am"], 0, {
      en: "a man = he: is.",
      es: "A man → is drinking.",
    }),
    mc("spg17-4", "A photographer is ___ pictures.", "Un fotógrafo está tomando fotos.", ["taking", "take", "takes"], 0, {
      en: "is + taking.",
      es: "take → taking: se quita la e.",
    }),
    mistake("spg17-5", "A woman is read a book on the sand.", "read", "reading", {
      en: "is reading.",
      es: "is + reading: falta el -ing.",
    }, DETECTIVE),
    mistake("spg17-6", "Two friends is playing volleyball.", "is", "are", {
      en: "two friends: are.",
      es: "Two friends → are playing.",
    }, DETECTIVE),
    rearrange(
      "spg17-7",
      ["near the water", "is walking", "A couple"],
      ["A couple", "is walking", "near the water"],
      { en: "Subject + is + verb-ing + place.", es: "Sujeto + is + verbo-ing + lugar." },
      CHISME,
    ),
    rearrange(
      "spg17-8",
      ["at the beach", "a great day", "Everyone is having"],
      ["Everyone is having", "a great day", "at the beach"],
      { en: "Everyone is having + object + place.", es: "Everyone is having + objeto + lugar." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg17-9", "I ___ swimming right now. I'm resting.", "No estoy nadando ahora. Estoy descansando.", ["am not", "don't", "not"], 0, {
      en: "I am not + -ing.",
      es: "I → am not swimming.",
    }),
    mc("spg17-10", "Lucia and her sister ___ building a sandcastle.", "Lucía y su hermana están construyendo un castillo de arena.", ["are", "is", "am"], 0, {
      en: "two people: are.",
      es: "Dos personas → are.",
    }),
    mistake("spg17-11", "My brother are taking pictures of the ocean.", "are", "is", {
      en: "my brother = he: is.",
      es: "my brother → is taking.",
    }, DETECTIVE),
    rearrange(
      "spg17-12",
      ["under an umbrella", "is drinking water", "My mom"],
      ["My mom", "is drinking water", "under an umbrella"],
      { en: "Subject + is + verb-ing + object + place.", es: "Sujeto + is + verbo-ing + objeto + lugar." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg17-13", "Look! A boy ___ running and a girl ___ riding her bike.", "¡Mira! Un niño está corriendo y una niña está andando en bici.", ["is / is", "are / is", "is / are"], 0, {
      en: "a boy is; a girl is.",
      es: "Uno cada uno → is. Repaso del día 16.",
    }),
    mc("spg17-14", "Lucia ___ to the beach every summer. She ___ swimming.", "Lucía va a la playa cada verano. Le encanta nadar.", ["goes / loves", "go / love", "goes / love"], 0, {
      en: "she goes; she loves.",
      es: "she → -s en los dos. Repaso de la semana 1.",
    }),
    mistake("spg17-15", "Next weekend Lucia are going to travel to the beach.", "are", "is", {
      en: "Lucia = she: is.",
      es: "Lucia → is going to. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg17-16", "Lucia have 27 years old.", "have", "is", {
      en: "She is 27.",
      es: "Lucia is 27 years old.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg17-17", "___ a lot of people at the beach today.", "Hay mucha gente en la playa hoy.", ["There are", "There is", "They are"], 0, {
      en: "a lot of people: there are.",
      es: "there are: people es plural.",
    }),
    mc("spg17-18", "How ___ water do you drink at the beach? · A lot.", "¿Cuánta agua tomas en la playa? · Mucha.", ["much", "many", "long"], 0, {
      en: "How much + water.",
      es: "How much: water no se cuenta.",
    }),
    mistake("spg17-19", "I want swim in the ocean.", "want", "want to", {
      en: "want to swim.",
      es: "want to + verbo.",
    }, DETECTIVE),
    mistake("spg17-20", "We are in the beach right now.", "in", "at", {
      en: "at the beach.",
      es: "at the beach: en la playa.",
    }, DETECTIVE),
  ],
};
