import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 12 — At the Office Yesterday (pasado progresivo en la oficina).
 * Historia del día: el piso del call center a las tres de la tarde, contado por Kat.
 * Mezcla: 10 pasado progresivo · 6 repaso Basic 1 y 2 (presente progresivo
 * ahora mismo en primera y tercera persona, presente simple con -s, will en
 * tercera persona) · 4 básicos (at his desk / on the phone / in the meeting
 * room, a / an).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
const DETECTIVE = "Kat le escribió el reporte al Boss. Toca el error antes de que lo mande.";
const CHISME = "Luis lo contó en desorden. Ordena la frase.";

export const PAST_STORIES_DAY_12: GrammarQuiz = {
  moduleId: "past-stories",
  day: 12,
  title: { en: "The Floor at Three O'Clock", es: "El piso a las tres de la tarde" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g12-1", "At three o'clock, Ana ___ on her laptop.", "A las tres, Ana estaba escribiendo en su laptop.", ["was typing", "typed", "is typing", "were typing"], 0, {
      en: "In progress at three: was typing.",
      es: "En progreso a las tres: was typing. typed sería una acción terminada, sin hora exacta.",
    }),
    mc("m3g12-2", "Luis ___ on the phone with a customer.", "Luis estaba hablando por teléfono con un cliente.", ["was talking", "were talking", "was talk", "talking"], 0, {
      en: "he was + talking.",
      es: "he was + talking. Nunca was + verbo sin -ing.",
    }),
    mc("m3g12-3", "Two people ___ a meeting in the small room.", "Dos personas estaban teniendo una reunión en la sala pequeña.", ["was having", "were having", "having", "had having"], 1, {
      en: "two people = they: were having.",
      es: "two people = they: were having. Plural lleva were.",
    }),
    mc("m3g12-4", "Someone ___ coffee near the window.", "Alguien estaba tomando café cerca de la ventana.", ["was drinking", "were drinking", "drinking", "is drinking"], 0, {
      en: "someone is singular: was drinking.",
      es: "someone es singular: was drinking. Ayer, no ahora: was, no is.",
    }),
    mistake("m3g12-5", "A coworker were writing in a notebook.", "were", "was", {
      en: "a coworker = he or she: was writing.",
      es: "a coworker = he o she: was writing. were es para plural.",
    }, DETECTIVE),
    mistake("m3g12-6", "A man was walk to another desk.", "walk", "walking", {
      en: "was + walking.",
      es: "was + walking. El -ing no es opcional.",
    }, DETECTIVE),
    rearrange(
      "m3g12-7",
      ["a document", "was reading", "at her desk", "Kat"],
      ["Kat", "was reading", "a document", "at her desk"],
      { en: "Subject + was reading + object + place.", es: "Sujeto + was reading + objeto + lugar." },
      CHISME,
    ),
    rearrange(
      "m3g12-8",
      ["on something", "Everyone", "was working"],
      ["Everyone", "was working", "on something"],
      { en: "Everyone + was working (singular).", es: "Everyone + was working: singular, aunque sean todos." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g12-9", "Kat: Yesterday at three I was typing a report. Right now I ___ to you.", "Kat: Ayer a las tres estaba escribiendo un reporte. Ahora mismo estoy hablando contigo.", ["am talking", "was talking", "talk", "talking"], 0, {
      en: "Right now = present progressive: I am talking.",
      es: "Right now es presente progresivo: I am talking. Ayer fue was; ahora es am. Repaso de Basic 2 semana 4.",
    }),
    mc("m3g12-10", "Luis ___ customers every day. Yesterday at three he ___ to a customer from Miami.", "Luis atiende clientes todos los días. Ayer a las tres estaba hablando con un cliente de Miami.", ["helps / was talking", "help / was talking", "helps / were talking", "helped / talks"], 0, {
      en: "Every day: helps (routine, -s). Yesterday at three: was talking.",
      es: "Every day: helps, con -s (Basic 2). Yesterday at three: was talking, en progreso.",
    }),
    mc("m3g12-11", "Boss: Kat ___ the report tomorrow. She always finishes on time.", "Boss: Kat va a terminar el reporte mañana. Siempre termina a tiempo.", ["will finish", "finished", "was finishing", "finish"], 0, {
      en: "A prediction about her: will finish.",
      es: "Una predicción sobre ella: will finish. Repaso de Basic 1: I think she'll find a good job.",
    }),
    mistake("m3g12-12", "Right now Luis is talk to a customer.", "talk", "talking", {
      en: "is + talking.",
      es: "is + talking. Presente progresivo, ahora mismo. Misma regla que was talking, pero en presente.",
    }, DETECTIVE),
    mistake("m3g12-13", "Ana always arrive at eight.", "arrive", "arrives", {
      en: "Ana = she: arrives.",
      es: "Ana = she: arrives, con -s. Rutina en presente, tercera persona.",
    }, DETECTIVE),
    rearrange(
      "m3g12-14",
      ["at his desk", "was eating", "lunch", "Mateo"],
      ["Mateo", "was eating", "lunch", "at his desk"],
      { en: "Subject + was eating + object + place.", es: "Sujeto + was eating + objeto + lugar." },
      CHISME,
    ),
    rearrange(
      "m3g12-15",
      ["at my desk", "I", "usually eat", "lunch"],
      ["I", "usually eat", "lunch", "at my desk"],
      { en: "Routine with I: I usually eat (no -s).", es: "Rutina con I: I usually eat, sin -s. Primera persona, repaso de Basic 2. Ayer fue was eating; todos los días es eat." },
      CHISME,
    ),
    mc("m3g12-16", "Luis was ___ his desk and the Boss was ___ the meeting room.", "Luis estaba en su escritorio y el Boss estaba en la sala de reuniones.", ["at / in", "in / at", "on / in", "at / on"], 0, {
      en: "at his desk, in the meeting room.",
      es: "at his desk (en su escritorio, el punto donde trabaja) e in the meeting room (dentro de la sala).",
    }),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g12-17", "Boss: What ___ at three yesterday? · Kat: I was typing the report.", "Boss: ¿Qué estabas haciendo ayer a las tres? · Kat: Estaba escribiendo el reporte.", ["were you doing", "you were doing", "did you doing", "were you do"], 0, {
      en: "Question: were + you + doing.",
      es: "Pregunta: were + you + doing. El were va antes del sujeto. «What you were doing» es calco.",
    }),
    mistake("m3g12-18", "Mateo was talking in the phone with a client.", "in", "on", {
      en: "on the phone.",
      es: "on the phone. «In the phone» es calco de «en el teléfono».",
    }, DETECTIVE),
    mistake("m3g12-19", "Ana was drinking a coffee and eating an sandwich.", "an", "a", {
      en: "a sandwich: s is a consonant sound.",
      es: "a sandwich: la s suena a consonante. an solo va antes de sonido de vocal (an apple, an hour).",
    }, DETECTIVE),
    mistake("m3g12-20", "Yesterday at three I were typing the report.", "were", "was", {
      en: "I was typing. were is for you, we, they.",
      es: "I was typing. were es para you, we, they; con I siempre es was.",
    }, DETECTIVE),
  ],
};
