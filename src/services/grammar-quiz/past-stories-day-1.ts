import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 1 — My Morning Yesterday (pasado simple, verbos irregulares).
 *
 * Mezcla del día: 8 ítems ancla con las frases del curso, 8 de transferencia
 * (misma gramática, otros verbos y otras personas) y 4 trampas con los errores
 * reales de hispanohablantes. Los distractores son palabras que existen.
 */
export const PAST_STORIES_DAY_1: GrammarQuiz = {
  moduleId: "past-stories",
  day: 1,
  title: { en: "My Morning Yesterday", es: "Mi mañana de ayer" },
  items: [
    // ── Ancla: las frases del día ──────────────────────────────────────────
    mc("m3g1-1", "Yesterday, I ___ up at six thirty.", "Ayer me desperté a las seis y media.", ["wake", "woke", "woken", "wakes"], 1, {
      en: "wake → woke in the simple past. woken is the participle (have woken).",
      es: "wake → woke en pasado simple. woken es el participio (have woken).",
    }),
    mc("m3g1-2", "I ___ a shower before work.", "Me bañé antes del trabajo.", ["take", "takes", "took", "taken"], 2, {
      en: "take → took. taken needs have: I have taken.",
      es: "take → took. taken necesita have: I have taken.",
    }),
    mc("m3g1-3", "I ___ breakfast at home.", "Desayuné en casa.", ["eat", "ate", "eaten", "eats"], 1, {
      en: "eat → ate. eaten is the participle.",
      es: "eat → ate. eaten es el participio.",
    }),
    mc("m3g1-4", "I ___ home around seven thirty.", "Salí de casa como a las siete y media.", ["leave", "left", "leaves", "leaving"], 1, {
      en: "leave → left.",
      es: "leave → left. Es irregular.",
    }),
    mistake("m3g1-5", "Yesterday I drink some coffee before work.", "drink", "drank", {
      en: "Yesterday needs the past: drink → drank.",
      es: "Con yesterday el verbo va en pasado: drink → drank. Dejarlo en presente es el error más común.",
    }),
    mistake("m3g1-6", "I got dressed and I am a little tired.", "am", "was", {
      en: "The whole story is in the past: I was a little tired.",
      es: "Toda la historia va en pasado: I was a little tired. No se mezcla am con got.",
    }),
    rearrange(
      "m3g1-7",
      ["at six thirty", "I", "up", "Yesterday,", "woke"],
      ["Yesterday,", "I", "woke", "up", "at six thirty"],
      { en: "Time word, subject, verb, particle, time.", es: "Palabra de tiempo, sujeto, verbo, partícula, hora. Woke y up van juntos." },
    ),
    rearrange(
      "m3g1-8",
      ["a good morning", "had", "Overall,", "I"],
      ["Overall,", "I", "had", "a good morning"],
      { en: "Overall opens the sentence.", es: "Overall abre la oración." },
    ),

    // ── Transferencia: misma gramática, otras personas y otros verbos ──────
    mc("m3g1-9", "My sister ___ up late and missed the bus.", "Mi hermana se despertó tarde y perdió el bus.", ["wakes", "woke", "waked", "woken"], 1, {
      en: "Same verb, different subject: she woke up.",
      es: "Mismo verbo, otra persona: she woke up. En pasado no cambia con he/she.",
    }),
    mc("m3g1-10", "We ___ pupusas for breakfast on Sunday.", "Comimos pupusas de desayuno el domingo.", ["eat", "eats", "ate", "eaten"], 2, {
      en: "eat → ate, with we too.",
      es: "eat → ate, también con we. El pasado es igual para todas las personas.",
    }),
    mc("m3g1-11", "The bus ___ at seven and I was still at home.", "El bus salió a las siete y yo todavía estaba en casa.", ["leaves", "leave", "left", "leaving"], 2, {
      en: "leave → left. The bus left.",
      es: "leave → left. The bus left. Sin -s en pasado.",
    }),
    mistake("m3g1-12", "My mom maked coffee for everyone.", "maked", "made", {
      en: "make → made.",
      es: "make → made. Irregular, no lleva -ed.",
    }),
    mistake("m3g1-13", "Yesterday my brother get up at five.", "get", "got", {
      en: "Yesterday needs the past: got up.",
      es: "Con yesterday el verbo va en pasado: got up.",
    }),
    rearrange(
      "m3g1-14",
      ["her phone", "in the morning", "checked", "Ana"],
      ["Ana", "checked", "her phone", "in the morning"],
      { en: "Subject + verb + object + time.", es: "Sujeto + verbo + objeto + tiempo. El sujeto puede ser un nombre, no solo I." },
    ),
    rearrange(
      "m3g1-15",
      ["a shower", "took", "before school", "my cousin", "Then,"],
      ["Then,", "my cousin", "took", "a shower", "before school"],
      { en: "Then, + subject + verb + object + time.", es: "Then, + sujeto + verbo + objeto + tiempo." },
    ),
    rearrange(
      "m3g1-16",
      ["late", "were", "for class", "We"],
      ["We", "were", "late", "for class"],
      { en: "We were: were goes right after we.", es: "We were: were va justo después de we. Con we no es was." },
    ),

    // ── Trampas: los errores que sí cometen los hispanohablantes ───────────
    mc("m3g1-17", "___ you wake up early yesterday?", "¿Te despertaste temprano ayer?", ["Do", "Did", "Was", "Were"], 1, {
      en: "Questions about the past use Did + base verb.",
      es: "Las preguntas del pasado usan Did + verbo base: Did you wake up. No se dice Do you wake up yesterday.",
    }),
    mistake("m3g1-18", "Did you took a shower this morning?", "took", "take", {
      en: "After Did, the verb goes back to base form: take.",
      es: "Después de Did el verbo vuelve a la forma base: take. El pasado ya está en Did.",
    }),
    mistake("m3g1-19", "I no eat breakfast today.", "no", "didn't", {
      en: "Negative past: didn't + base verb. I didn't eat.",
      es: "Negativo en pasado: didn't + verbo base. I didn't eat. «I no ate» es traducción del español.",
    }),
    mistake("m3g1-20", "I arrived to work at eight.", "to", "at", {
      en: "arrive at a place: I arrived at work.",
      es: "Se llega «a», pero en inglés es arrive at: I arrived at work. «Arrive to» es calco del español.",
    }),
  ],
};
