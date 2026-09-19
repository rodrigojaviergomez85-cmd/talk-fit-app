import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 6 — My Routine (every day vs yesterday · didn't).
 * Historia: la rutina de Luis y el día en que todo salió distinto.
 * 6 ancla · 6 transferencia · 4 repaso (futuro, progresivo) · 4 básicos.
 */
const DETECTIVE = "Luis escribió su rutina en el chat. Toca el error antes de que lo mande.";
const CHISME = "Kat lo contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_6: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 6,
  title: { en: "The Day the Routine Broke", es: "El día que se rompió la rutina" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g6-1", "Every day, I ___ for twenty minutes. Yesterday, I ___ because it rained.", "Todos los días corro veinte minutos. Ayer no corrí porque llovió.", ["run / didn't run", "ran / don't run", "run / didn't ran", "runs / didn't run"], 0, {
      en: "Every day: run. Yesterday, negative: didn't run.",
      es: "Every day: run, rutina. Yesterday en negativo: didn't run, con el verbo en base.",
    }),
    mc("m5g6-2", "Usually, I ___ at the gym, but yesterday I ___ at home.", "Normalmente hago ejercicio en el gimnasio, pero ayer lo hice en casa.", ["exercise / exercised", "exercised / exercise", "exercises / exercised", "exercise / exercise"], 0, {
      en: "Usually: exercise. Yesterday: exercised.",
      es: "Usually: exercise. Yesterday: exercised.",
    }),
    mc("m5g6-3", "I usually ___ to the office, but yesterday I ___.", "Normalmente manejo a la oficina, pero ayer caminé.", ["drive / walked", "drove / walk", "drives / walked", "drive / walk"], 0, {
      en: "usually: drive. yesterday: walked.",
      es: "usually: drive. yesterday: walked.",
    }),
    mistake("m5g6-4", "Yesterday I walked because my car were in the shop.", "were", "was", {
      en: "my car = it: was.",
      es: "my car = it: was. Singular.",
    }, DETECTIVE),
    mistake("m5g6-5", "Every night I practice English, and last night I study for a full hour.", "study", "studied", {
      en: "last night: studied. (Every night I practice is correct.)",
      es: "last night: studied. El primer verbo, practice, está bien porque va con every night.",
    }, DETECTIVE),
    rearrange(
      "m5g6-6",
      ["at home", "exercised", "instead", "Yesterday,", "I"],
      ["Yesterday,", "I", "exercised", "at home", "instead"],
      { en: "Time + subject + past verb + place + instead.", es: "Tiempo + sujeto + verbo en pasado + lugar + instead (en vez de eso)." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g6-7", "Kat: Every morning my sister ___ the bus, but yesterday she ___ a taxi.", "Kat: Todas las mañanas mi hermana toma el bus, pero ayer tomó un taxi.", ["takes / took", "take / took", "takes / takes", "took / takes"], 0, {
      en: "Every morning: takes (-s). Yesterday: took.",
      es: "Every morning: takes, con -s. Yesterday: took.",
    }),
    mc("m5g6-8", "Luis: I never ___ late, but yesterday I ___ at ten.", "Luis: Nunca me levanto tarde, pero ayer me levanté a las diez.", ["get up / got up", "got up / get up", "gets up / got up", "get up / get up"], 0, {
      en: "never (habit): get up. yesterday: got up.",
      es: "never es hábito: get up. yesterday: got up.",
    }),
    mc("m5g6-9", "Kat: ___ you exercise yesterday? · Luis: No, I ___.", "Kat: ¿Hiciste ejercicio ayer? · Luis: No.", ["Did / didn't", "Do / don't", "Did / don't", "Do / didn't"], 0, {
      en: "Did you exercise? No, I didn't.",
      es: "Did you exercise? No, I didn't. Pregunta y respuesta en el mismo tiempo.",
    }),
    mistake("m5g6-10", "My brother usually cook dinner, but yesterday I cooked.", "cook", "cooks", {
      en: "my brother = he: cooks.",
      es: "my brother = he: cooks, con -s. Rutina en tercera persona.",
    }, DETECTIVE),
    rearrange(
      "m5g6-11",
      ["didn't", "because it rained", "yesterday", "Luis", "run"],
      ["Luis", "didn't", "run", "yesterday", "because it rained"],
      { en: "Subject + didn't + base verb + time + reason.", es: "Sujeto + didn't + verbo base + tiempo + razón." },
      CHISME,
    ),
    rearrange(
      "m5g6-12",
      ["after work", "Kat", "exercises", "at the gym", "Usually,"],
      ["Usually,", "Kat", "exercises", "at the gym", "after work"],
      { en: "Usually, + subject + verb-s + place + time.", es: "Usually, + sujeto + verbo con -s + lugar + tiempo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g6-13", "Luis: Tomorrow I ___ to the office again. The car is ready.", "Luis: Mañana voy a manejar a la oficina otra vez. El carro ya está listo.", ["am going to drive", "drove", "drive", "was driving"], 0, {
      en: "Tomorrow: am going to drive.",
      es: "Tomorrow: am going to drive. Repaso de Basic 1.",
    }),
    mc("m5g6-14", "Kat: What ___ at seven yesterday? · Luis: I was walking to work.", "Kat: ¿Qué estabas haciendo ayer a las siete? · Luis: Iba caminando al trabajo.", ["were you doing", "did you doing", "you were doing", "do you do"], 0, {
      en: "were you doing: in progress at seven.",
      es: "were you doing: en progreso a las siete. Repaso de Basic 3.",
    }),
    mistake("m5g6-15", "Right now Luis is walk to the office.", "walk", "walking", {
      en: "is + walking.",
      es: "is + walking. Presente progresivo. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g6-16", "Tomorrow I will calling the mechanic.", "calling", "call", {
      en: "will + base verb: will call.",
      es: "will + verbo base: will call. Nunca will + -ing. Repaso de Basic 1.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g6-17", "I practice English ___ night, and I exercise ___ the morning.", "Practico inglés en la noche y hago ejercicio en la mañana.", ["at / in", "in / in", "at / at", "on / in"], 0, {
      en: "at night, in the morning.",
      es: "at night, pero in the morning. Excepción que hay que aprender de memoria.",
    }),
    mc("m5g6-18", "I ___ run when it rains.", "Nunca corro cuando llueve.", ["never", "not", "no", "don't never"], 0, {
      en: "never goes before the verb, alone: I never run.",
      es: "never va antes del verbo, solo: I never run. «Don't never» es doble negativo.",
    }),
    mistake("m5g6-19", "I go to the gym in Mondays and Wednesdays.", "in", "on", {
      en: "on + days: on Mondays.",
      es: "on con los días: on Mondays and Wednesdays. in es para meses y años.",
    }, DETECTIVE),
    mistake("m5g6-20", "I usually go to bed at eleven of the night.", "of", "at", {
      en: "eleven at night.",
      es: "eleven at night. «Eleven of the night» es calco de «once de la noche».",
    }, DETECTIVE),
  ],
};
