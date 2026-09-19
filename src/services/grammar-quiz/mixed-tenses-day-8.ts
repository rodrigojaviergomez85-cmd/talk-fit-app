import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 8 — What Was Happening? (rutina vs at that moment: was/were + -ing).
 * Historia: la oficina de diseño donde trabaja la prima de Camila, ayer a las tres.
 * 6 ancla · 6 transferencia · 4 repaso (futuro, didn't, Did) · 4 básicos.
 */
const DETECTIVE = "Camila describió la oficina en el chat. Toca el error antes de que lo mande.";
const CHISME = "Vale lo contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_8: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 8,
  title: { en: "Every Day vs. That Moment", es: "Todos los días contra ese momento" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g8-1", "Maria ___ reports every morning. Yesterday at three, she ___ a very long email.", "María escribe reportes todas las mañanas. Ayer a las tres estaba escribiendo un correo larguísimo.", ["types / was typing", "typed / types", "types / typed", "is typing / was typing"], 0, {
      en: "every morning: types. yesterday at three: was typing.",
      es: "every morning: types, rutina. yesterday at three: was typing, en progreso.",
    }),
    mc("m5g8-2", "Carlos usually ___ to clients on the phone. At that moment, he ___ to an angry customer.", "Carlos normalmente habla con clientes por teléfono. En ese momento estaba hablando con un cliente enojado.", ["talks / was talking", "talked / talks", "talks / talked", "talk / was talking"], 0, {
      en: "usually: talks. at that moment: was talking.",
      es: "usually: talks. at that moment: was talking.",
    }),
    mc("m5g8-3", "The two designers ___ together at lunch every day. Yesterday, they ___ about a funny video.", "Los dos diseñadores se ríen juntos en el almuerzo todos los días. Ayer se estaban riendo de un video gracioso.", ["laugh / were laughing", "laughs / was laughing", "laughed / laugh", "laugh / was laughing"], 0, {
      en: "they laugh (no -s); yesterday: were laughing.",
      es: "they laugh, sin -s; yesterday: were laughing, plural.",
    }),
    mistake("m5g8-4", "The manager carry papers from desk to desk.", "carry", "carries", {
      en: "the manager = he: carries (y → ies).",
      es: "the manager = he: carries. carry cambia la y por ies.",
    }, DETECTIVE),
    mistake("m5g8-5", "At three, he were carrying a heavy box of files.", "were", "was", {
      en: "he was carrying.",
      es: "he was carrying. Singular, was.",
    }, DETECTIVE),
    rearrange(
      "m5g8-6",
      ["a very long email", "was typing", "at three", "she", "Yesterday"],
      ["Yesterday", "at three", "she", "was typing", "a very long email"],
      { en: "Time + subject + was typing + object.", es: "Tiempo + sujeto + was typing + objeto." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g8-7", "Camila: My cousin ___ menus every day. When I called, she ___ a new one.", "Camila: Mi prima diseña menús todos los días. Cuando llamé, estaba diseñando uno nuevo.", ["designs / was designing", "designed / designs", "designs / designed", "design / was designing"], 0, {
      en: "every day: designs. when I called: was designing.",
      es: "every day: designs. when I called: was designing, en progreso en ese momento.",
    }),
    mc("m5g8-8", "Vale: The interns usually ___ coffee at ten. At ten yesterday, they ___ a client instead.", "Vale: Los practicantes normalmente toman café a las diez. Ayer a las diez estaban ayudando a un cliente.", ["drink / were helping", "drinks / was helping", "drank / help", "drink / was helping"], 0, {
      en: "they drink; at ten yesterday: were helping.",
      es: "they drink, sin -s; at ten yesterday: were helping, plural.",
    }),
    mc("m5g8-9", "Camila: What ___ your cousin ___ when you called? · Vale: She was eating lunch.", "Camila: ¿Qué estaba haciendo tu prima cuando llamaste? · Vale: Estaba almorzando.", ["was / doing", "did / doing", "was / did", "does / doing"], 0, {
      en: "What was she doing?",
      es: "What was she doing? was antes del sujeto, verbo con -ing.",
    }),
    mistake("m5g8-10", "The designers was laughing at a video at lunch.", "was", "were", {
      en: "the designers = they: were laughing.",
      es: "the designers = they: were laughing. Plural.",
    }, DETECTIVE),
    rearrange(
      "m5g8-11",
      ["when the boss arrived", "was drinking", "Carlos", "coffee"],
      ["Carlos", "was drinking", "coffee", "when the boss arrived"],
      { en: "was doing + when + simple past.", es: "was doing + when + pasado simple." },
      CHISME,
    ),
    rearrange(
      "m5g8-12",
      ["talks", "every day", "to clients", "Carlos", "on the phone"],
      ["Carlos", "talks", "to clients", "on the phone", "every day"],
      { en: "Subject + verb-s + who + how + when.", es: "Sujeto + verbo con -s + con quién + por dónde + cuándo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g8-13", "Vale: Tomorrow at three, my cousin ___ a client in person.", "Vale: Mañana a las tres mi prima va a ver a un cliente en persona.", ["is going to meet", "was meeting", "met", "meets"], 0, {
      en: "Tomorrow: is going to meet.",
      es: "Tomorrow: is going to meet. Repaso de Basic 1.",
    }),
    mc("m5g8-14", "Camila: ___ the manager carry the box himself yesterday? · Vale: Yes, he did.", "Camila: ¿El gerente cargó la caja él mismo ayer? · Vale: Sí.", ["Did", "Does", "Was", "Do"], 0, {
      en: "Past question: Did the manager carry?",
      es: "Pregunta en pasado: Did the manager carry? Repaso de Basic 3.",
    }),
    mistake("m5g8-15", "Maria didn't typed any reports yesterday.", "typed", "type", {
      en: "didn't + base form: didn't type.",
      es: "didn't + forma base: didn't type. Repaso de Basic 3.",
    }, DETECTIVE),
    mistake("m5g8-16", "Right now Carlos talking to a customer from Miami.", "talking", "is talking", {
      en: "Right now: is talking.",
      es: "Right now: is talking. Falta el is. Repaso de Basic 2.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g8-17", "Maria was ___ her desk, and Carlos was ___ the phone ___ the meeting room.", "María estaba en su escritorio, y Carlos estaba en el teléfono en la sala de reuniones.", ["at / on / in", "in / in / at", "on / at / in", "at / in / on"], 0, {
      en: "at her desk, on the phone, in the meeting room.",
      es: "at her desk, on the phone, in the meeting room. Tres preposiciones distintas para tres lugares.",
    }),
    mc("m5g8-18", "He was carrying ___ heavy box to ___ meeting room.", "Estaba cargando una caja pesada a la sala de reuniones.", ["a / the", "an / the", "the / a", "a / a"], 0, {
      en: "a heavy box (one), the meeting room (the one in the office).",
      es: "a heavy box: una caja. the meeting room: la sala de la oficina, ya se sabe cuál.",
    }),
    mistake("m5g8-19", "The two designer were laughing together.", "designer", "designers", {
      en: "two designers: plural.",
      es: "two designers: con two, plural.",
    }, DETECTIVE),
    mistake("m5g8-20", "Carlos was talking with an angry customer in the phone.", "in", "on", {
      en: "on the phone.",
      es: "on the phone. «In the phone» es calco.",
    }, DETECTIVE),
  ],
};
