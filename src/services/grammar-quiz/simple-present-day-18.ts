import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 2 · Día 18 — At the office: is / are + -ing · typing, talking, having.
 * 8 ancla · 4 transferencia · 4 repaso · 4 básicos.
 */
const DETECTIVE = "Paola escribió lo que pasa en la oficina. Toca la palabra equivocada.";
const CHISME = "Paola dijo la frase en desorden. Ordénala.";

export const SIMPLE_PRESENT_DAY_18: GrammarQuiz = {
  moduleId: "simple-present",
  day: 18,
  title: { en: "At the Office", es: "En la oficina" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("spg18-1", "A woman is ___ on the phone.", "Una mujer está hablando por teléfono.", ["talking", "talk", "talks"], 0, {
      en: "is + talking.",
      es: "is + talking: está hablando.",
    }),
    mc("spg18-2", "A man is ___ on his computer.", "Un hombre está escribiendo en su computadora.", ["typing", "type", "types"], 0, {
      en: "is + typing.",
      es: "type → typing: se quita la e.",
    }),
    mc("spg18-3", "Two people ___ having a meeting.", "Dos personas están en una reunión.", ["are", "is", "am"], 0, {
      en: "two people: are.",
      es: "Two people → are having.",
    }),
    mc("spg18-4", "Someone ___ drinking coffee.", "Alguien está tomando café.", ["is", "are", "am"], 0, {
      en: "someone: is.",
      es: "Someone → is drinking.",
    }),
    mistake("spg18-5", "A woman is write in her notebook.", "write", "writing", {
      en: "is writing.",
      es: "write → writing: se quita la e.",
    }, DETECTIVE),
    mistake("spg18-6", "A man are carrying some papers.", "are", "is", {
      en: "a man = he: is.",
      es: "A man → is carrying.",
    }, DETECTIVE),
    rearrange(
      "spg18-7",
      ["the printer", "is using", "A woman"],
      ["A woman", "is using", "the printer"],
      { en: "Subject + is + verb-ing + object.", es: "Sujeto + is + verbo-ing + objeto." },
      CHISME,
    ),
    rearrange(
      "spg18-8",
      ["right now", "is working", "Everyone"],
      ["Everyone", "is working", "right now"],
      { en: "Everyone + is + verb-ing + now.", es: "Everyone + is + verbo-ing + ahora." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("spg18-9", "I ___ typing an email right now.", "Estoy escribiendo un correo ahora mismo.", ["am", "is", "are"], 0, {
      en: "I am + -ing.",
      es: "I → am typing.",
    }),
    mc("spg18-10", "My coworkers ___ having a meeting.", "Mis compañeros están en una reunión.", ["are", "is", "am"], 0, {
      en: "they are.",
      es: "my coworkers = they → are.",
    }),
    mistake("spg18-11", "Paola is talk to a customer on the phone.", "talk", "talking", {
      en: "is talking.",
      es: "is + talking: falta el -ing.",
    }, DETECTIVE),
    rearrange(
      "spg18-12",
      ["coffee", "in the kitchen", "My boss is drinking"],
      ["My boss is drinking", "coffee", "in the kitchen"],
      { en: "Subject + is + verb-ing + object + place.", es: "Sujeto + is + verbo-ing + objeto + lugar." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("spg18-13", "Paola ___ emails every day. Right now she ___ an email to a client.", "Paola escribe correos todos los días. Ahora mismo está escribiendo un correo a un cliente.", ["writes / is writing", "is writing / writes", "write / writing"], 0, {
      en: "routine: writes; now: is writing.",
      es: "Rutina → writes; ahora → is writing.",
    }),
    mc("spg18-14", "Two people ___ swimming and a child ___ building a sandcastle.", "Dos personas están nadando y un niño está construyendo un castillo de arena.", ["are / is", "is / are", "are / are"], 0, {
      en: "two people are; a child is.",
      es: "Plural → are; uno → is. Repaso del día 17.",
    }),
    mistake("spg18-15", "The phone is ringing. I'll answering it.", "answering", "answer", {
      en: "I'll answer.",
      es: "will + verbo solo. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("spg18-16", "Paola have a meeting with her boss.", "have", "has", {
      en: "she has.",
      es: "Paola = she → has.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("spg18-17", "___ a printer in the office.", "Hay una impresora en la oficina.", ["There is", "There are", "It is"], 0, {
      en: "one printer: there is.",
      es: "there is: hay, una cosa.",
    }),
    mc("spg18-18", "What time is the meeting? · It's ___ ten.", "¿A qué hora es la reunión? · Es a las diez.", ["at", "in", "on"], 0, {
      en: "at ten.",
      es: "at con la hora.",
    }),
    mistake("spg18-19", "I need send this email before ten.", "need", "need to", {
      en: "need to send.",
      es: "need to + verbo.",
    }, DETECTIVE),
    mistake("spg18-20", "The papers are in the desk.", "in", "on", {
      en: "on the desk.",
      es: "on the desk: encima del escritorio.",
    }, DETECTIVE),
  ],
};
