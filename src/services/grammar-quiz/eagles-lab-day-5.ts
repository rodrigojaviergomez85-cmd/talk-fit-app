import { mc, mistake, speak, type GrammarQuiz } from "./types";

/**
 * EAGLES · Semana 1 · Día 5 — B2 LAB · MINI MOCK (viernes).
 * Tema del día: Handle hypotheticals (If I won… I would…).
 * Lectura corta (4) · Listening corto (4) · Estructura (5) · Speaking
 * independiente (1). 14 ítems · aprueba con 10 · hablar es obligatorio.
 * Bandas: 13–14 en ruta B2 · 10–12 B1+ · menos de 10 refuerzo.
 */
const PASSAGE = [
  "Last month, a job website asked two thousand workers in Latin America a simple question: \"What would you do if you won a million dollars?\" The answers were less surprising than the company expected. Almost half of the people said they would help their families first, usually by paying for a house or for a relative's education. Only eight percent said they would spend most of the money on travel.",
  "The second question was harder: \"If you got your dream job in another country, would you move?\" Here the group was divided. Fifty-two percent said they would seriously consider moving, but most of them added a condition: they would talk to their families before making a final decision. The rest said they wouldn't leave, mainly because of their parents or their children.",
  "The company's director said the results show that, for most workers in the region, family comes before money and before career. \"People dream big,\" she said, \"but they don't dream alone.\"",
];

const TALK: { voice: "female" | "male"; text: string }[] = [
  {
    voice: "male",
    text: "Two years ago, a company in Canada offered me my dream job: better salary, better schedule, everything. And I said no. My mother was sick at the time, and I couldn't imagine being three thousand miles away. If the offer came today, I think I would say yes, because things at home are different now. But I wouldn't decide in one day. I would talk to my family, I would compare the cost of living, and I would probably visit the city first. My advice? Don't make big decisions too quickly, but don't say no just because you're afraid.",
  },
];

const ERR = "Un compañero escribió estas hipótesis. Toca la palabra equivocada.";

export const EAGLES_LAB_DAY_5: GrammarQuiz = {
  moduleId: "eagles-week-1",
  day: 5,
  title: { en: "B2 Lab · Friday Mock", es: "B2 Lab · Mock del viernes" },
  passScore: 10,
  bands: [
    { min: 13, label: { en: "On track for B2", es: "En ruta a B2" } },
    { min: 10, label: { en: "B1+ · keep pushing", es: "B1+ · seguí empujando" } },
    { min: 0, label: { en: "Needs reinforcement", es: "Necesita refuerzo" } },
  ],
  sections: [
    {
      id: "egl5-reading",
      label: { en: "Reading", es: "Lectura" },
      instruction: { en: "Read the passage and answer 4 questions.", es: "Lee el texto y responde 4 preguntas." },
      context: { kind: "reading", title: "Dream Big, Not Alone", titleEs: "Soñar en grande, no solos", paragraphs: PASSAGE },
      timeLimitSec: 300,
      itemIds: ["egl5-1", "egl5-2", "egl5-3", "egl5-4"],
    },
    {
      id: "egl5-listening",
      label: { en: "Listening", es: "Listening" },
      instruction: { en: "Listen to the talk (two plays only) and answer 4 questions.", es: "Escucha la charla (solo dos veces) y responde 4 preguntas." },
      context: { kind: "listening", title: "The job I said no to", titleEs: "El trabajo al que dije que no", parts: TALK, plays: 2 },
      timeLimitSec: 240,
      itemIds: ["egl5-5", "egl5-6", "egl5-7", "egl5-8"],
    },
    {
      id: "egl5-structure",
      label: { en: "Structure", es: "Estructura" },
      instruction: { en: "Choose the correct form or find the mistake.", es: "Elige la forma correcta o encuentra el error." },
      timeLimitSec: 240,
      itemIds: ["egl5-9", "egl5-10", "egl5-11", "egl5-12", "egl5-13"],
    },
    {
      id: "egl5-speak",
      label: { en: "Speak", es: "Habla" },
      instruction: { en: "15 seconds to think, 45 seconds to speak.", es: "15 segundos para pensar, 45 para hablar." },
      itemIds: ["egl5-14"],
    },
  ],
  items: [
    // ── Lectura ────────────────────────────────────────────────────────────
    mc(
      "egl5-1",
      "What is the main idea of the passage?",
      "¿Cuál es la idea principal del texto?",
      [
        "For most workers surveyed, family matters more than money or career",
        "Most workers would spend a million dollars on travel",
        "Companies in Canada offer the best jobs in the region",
        "Workers in Latin America do not want to move abroad",
      ],
      0,
      {
        en: "Main idea: the director's conclusion, \"family comes before money and before career\".",
        es: "Idea principal: la conclusión de la directora, «family comes before money and before career».",
      },
    ),
    mc(
      "egl5-2",
      "According to paragraph 1, what would almost half of the people do with the money?",
      "Según el párrafo 1, ¿qué haría casi la mitad de la gente con el dinero?",
      ["Help their families", "Travel around the world", "Start a business", "Save all of it"],
      0,
      {
        en: "Detail: \"Almost half of the people said they would help their families first\".",
        es: "Detalle: «Almost half of the people said they would help their families first».",
      },
    ),
    mc(
      "egl5-3",
      "The word \"divided\" in paragraph 2 is closest in meaning to",
      "La palabra «divided» en el párrafo 2 significa casi lo mismo que",
      ["split into two opinions", "confused", "angry", "very small"],
      0,
      {
        en: "divided = split, with two different opinions (52% vs the rest).",
        es: "divided = dividido en dos opiniones (52% contra el resto).",
      },
    ),
    mc(
      "egl5-4",
      "What can be inferred from the director's last sentence, \"they don't dream alone\"?",
      "¿Qué se puede inferir de la última frase de la directora, «they don't dream alone»?",
      [
        "People include their families in their big decisions",
        "People are afraid of dreaming",
        "People prefer to work in groups",
        "People do not have big dreams",
      ],
      0,
      {
        en: "Inference: their families are part of every big decision.",
        es: "Inferencia: la familia entra en cada decisión grande.",
      },
    ),

    // ── Listening ──────────────────────────────────────────────────────────
    mc(
      "egl5-5",
      "Why did the speaker say no to the job in Canada?",
      "¿Por qué el hablante dijo que no al trabajo en Canadá?",
      ["His mother was sick", "The salary was low", "He didn't like the city", "He was afraid of flying"],
      0,
      {
        en: "\"My mother was sick at the time\".",
        es: "«My mother was sick at the time».",
      },
    ),
    mc(
      "egl5-6",
      "What would the speaker probably do if he received the offer today?",
      "¿Qué haría probablemente el hablante si recibiera la oferta hoy?",
      ["Accept it, but only after thinking carefully", "Say no again", "Move to Canada the same week", "Ask for a better salary"],
      0,
      {
        en: "\"I think I would say yes… But I wouldn't decide in one day\".",
        es: "«I think I would say yes… But I wouldn't decide in one day».",
      },
    ),
    mc(
      "egl5-7",
      "Which of these is NOT something the speaker would do before deciding?",
      "¿Cuál de estas cosas NO haría el hablante antes de decidir?",
      ["Ask his company for more vacation", "Talk to his family", "Compare the cost of living", "Visit the city"],
      0,
      {
        en: "He mentions family, cost of living and visiting the city. Not vacation.",
        es: "Menciona familia, costo de vida y visitar la ciudad. Las vacaciones no.",
      },
    ),
    mc(
      "egl5-8",
      "What is the speaker's main advice?",
      "¿Cuál es el consejo principal del hablante?",
      ["Think carefully, but don't refuse out of fear", "Always say yes to a better salary", "Never move away from your family", "Decide quickly before the offer disappears"],
      0,
      {
        en: "\"Don't make big decisions too quickly, but don't say no just because you're afraid\".",
        es: "«Don't make big decisions too quickly, but don't say no just because you're afraid».",
      },
    ),

    // ── Estructura ─────────────────────────────────────────────────────────
    mc(
      "egl5-9",
      "If I ___ a million dollars, I would help my family first.",
      "Si ganara un millón de dólares, ayudaría a mi familia primero.",
      ["won", "win", "would win", "will win"],
      0,
      {
        en: "Second conditional: if + past simple (won), would + verb.",
        es: "Segundo condicional: if + pasado simple (won), would + verbo.",
      },
    ),
    mc(
      "egl5-10",
      "If I got my dream job in another country, I ___ seriously consider moving.",
      "Si consiguiera el trabajo de mis sueños en otro país, consideraría seriamente mudarme.",
      ["would", "will", "did", "am going to"],
      0,
      {
        en: "Second conditional result: would + verb.",
        es: "Resultado del segundo condicional: would + verbo.",
      },
    ),
    mc(
      "egl5-11",
      "I would save some of the money instead of ___ everything.",
      "Ahorraría parte del dinero en vez de gastarlo todo.",
      ["spending", "spend", "to spend", "spent"],
      0,
      {
        en: "instead of + -ing.",
        es: "instead of + -ing: instead of spending.",
      },
    ),
    mistake("egl5-12", "If that happened, I will talk to them and compare my options.", "will", "would", {
      en: "If + past (happened) → would, not will.",
      es: "If + pasado (happened) → would, no will.",
    }, ERR),
    mistake("egl5-13", "I wouldn't made the decision too quickly.", "made", "make", {
      en: "wouldn't + base verb: wouldn't make.",
      es: "wouldn't + verbo base: wouldn't make.",
    }, ERR),

    // ── Hablar ─────────────────────────────────────────────────────────────
    speak(
      "egl5-14",
      "If you got your dream job in another country, would you move? Explain your decision with two reasons.",
      "Si consiguieras el trabajo de tus sueños en otro país, ¿te mudarías? Explica tu decisión con dos razones.",
      [
        "If I got my dream job in another country, I would / wouldn't…",
        "First, … because…",
        "Second, …",
        "However, before making a final decision, I would…",
        "Overall, I would try to choose…",
      ],
      { prepSeconds: 15, speakSeconds: 45, minSeconds: 30 },
      {
        en: "Talk for at least 30 seconds: your decision + two reasons + a condition + closing.",
        es: "Habla al menos 30 segundos: tu decisión + dos razones + una condición + cierre.",
      },
    ),
  ],
};
