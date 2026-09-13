import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep9/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep9/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep9/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep9/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep9/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep9/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep9/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep9/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep9/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep9/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep9/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep9/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep9/s12.jpg";

/**
 * Season 4 · Episode 9 — "Twenty questions for Luis".
 * Matches Basic 3 / Past Stories Week 2 Day 9: past questions (Did you…? / What did you…?).
 * Vale turns the break room into a question game with Luis.
 */
export const VALE_S4_LUIS_QUESTIONS: StorybookEpisode = {
  id: "vale-s4-luis-questions",
  moduleId: "past-stories",
  week: 2,
  title: "Twenty questions for Luis",
  titleEs: "Veinte preguntas para Luis",
  episodeLabel: { en: "Season 4 · Episode 9", es: "Temporada 4 · Episodio 9" },
  previously: [
    { en: "Mateo forgot to call Ana.", es: "Mateo olvidó llamar a Ana." },
    { en: "He said sorry in English. It worked.", es: "Pidió perdón en inglés. Funcionó." },
    { en: "Now the team plays a question game.", es: "Ahora el equipo juega un juego de preguntas." },
  ],
  reviewWords: [
    { word: "forgot", es: "olvidó" },
    { word: "reminder", es: "recordatorio" },
    { word: "flowers", es: "flores" },
    { word: "truth", es: "verdad" },
  ],
  blurb: {
    en: "Vale invents a game: ask Luis about his Saturday. Every question in the past. His last answer is not a joke.",
    es: "Vale inventa un juego: pregúntale a Luis sobre su sábado. Cada pregunta en pasado. Su última respuesta no es broma.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El equipo en la sala de descanso; Vale explica el juego.",
      text: "In the break room, Vale explained the game. \"We only ask questions in the past.\"",
      es: "En la sala de descanso, Vale explicó el juego. «Solo hacemos preguntas en pasado».",
      speaker: "vale",
      words: [
        { word: "break room", es: "sala de descanso" },
        { word: "explained", es: "explicó" },
        { word: "game", es: "juego" },
        { word: "questions", es: "preguntas" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Luis se sienta en el centro, sonriendo, listo para el juego.",
      text: "Luis sat in the middle. \"Okay. Ask me anything about Saturday.\"",
      es: "Luis se sentó en el centro. «Okay. Pregúntenme lo que sea sobre el sábado».",
      speaker: "luis",
      words: [
        { word: "sat", es: "se sentó" },
        { word: "middle", es: "centro / medio" },
        { word: "anything", es: "lo que sea" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Kat hace la primera pregunta con el dedo arriba.",
      text: '"What time did you wake up?" Kat asked first.',
      es: "«¿A qué hora te despertaste?», preguntó Kat primero.",
      speaker: "kat",
      words: [
        { word: "What time", es: "a qué hora" },
        { word: "wake up", es: "despertarse" },
        { word: "first", es: "primero" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Luis levanta cinco dedos.",
      text: '"I woke up at five. I went running near the river."',
      es: "«Me desperté a las cinco. Fui a correr cerca del río».",
      speaker: "luis",
      words: [
        { word: "woke up", es: "me desperté" },
        { word: "went running", es: "fui a correr" },
        { word: "near", es: "cerca de" },
        { word: "river", es: "río" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mateo pregunta con cara de curiosidad.",
      text: '"Where did you eat lunch?" Mateo asked.',
      es: "«¿Dónde almorzaste?», preguntó Mateo.",
      speaker: "mateo",
      words: [
        { word: "Where", es: "dónde" },
        { word: "eat lunch", es: "almorzar" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Luis recuerda el mercado con comida.",
      text: '"At the market. I ate soup with my mother. It cost two dollars."',
      es: "«En el mercado. Comí sopa con mi mamá. Costó dos dólares».",
      speaker: "luis",
      words: [
        { word: "market", es: "mercado" },
        { word: "ate", es: "comí" },
        { word: "soup", es: "sopa" },
        { word: "cost", es: "costó" },
        { word: "dollars", es: "dólares" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale hace una pregunta más seria.",
      text: '"Why did you go running so early?" Vale asked.',
      es: "«¿Por qué fuiste a correr tan temprano?», preguntó Vale.",
      speaker: "vale",
      words: [
        { word: "Why", es: "por qué" },
        { word: "so early", es: "tan temprano" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Luis se pone serio y mira su taza.",
      text: "Luis stopped smiling. \"Because I think better when I run.\"",
      es: "Luis dejó de sonreír. «Porque pienso mejor cuando corro».",
      speaker: "luis",
      words: [
        { word: "stopped", es: "dejó de / paró" },
        { word: "Because", es: "porque" },
        { word: "think", es: "pensar" },
        { word: "run", es: "correr" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Todos escuchan a Luis en silencio.",
      text: '"Last month my father lost his job. I wanted to be strong for him."',
      es: "«El mes pasado mi papá perdió su trabajo. Quería ser fuerte por él».",
      speaker: "luis",
      words: [
        { word: "Last month", es: "el mes pasado" },
        { word: "father", es: "papá" },
        { word: "lost his job", es: "perdió su trabajo" },
        { word: "strong", es: "fuerte" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale pone su mano en el hombro de Luis.",
      text: "The room went quiet. Vale put her hand on his shoulder.",
      es: "El cuarto quedó en silencio. Vale puso su mano en su hombro.",
      words: [
        { word: "went quiet", es: "quedó en silencio" },
        { word: "put", es: "puso" },
        { word: "hand", es: "mano" },
        { word: "shoulder", es: "hombro" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Kat propone algo al grupo con energía.",
      text: '"Did your father work with computers?" Kat asked. "My uncle needs a technician."',
      es: "«¿Tu papá trabajaba con computadoras?», preguntó Kat. «Mi tío necesita un técnico».",
      speaker: "kat",
      words: [
        { word: "computers", es: "computadoras" },
        { word: "uncle", es: "tío" },
        { word: "needs", es: "necesita" },
        { word: "technician", es: "técnico" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Luis sonríe con esperanza; todos lo rodean.",
      text: "A silly game gave Luis real hope. Questions open doors.",
      es: "Un juego tonto le dio a Luis esperanza de verdad. Las preguntas abren puertas.",
      words: [
        { word: "silly", es: "tonto" },
        { word: "hope", es: "esperanza" },
        { word: "open", es: "abren" },
        { word: "doors", es: "puertas" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What time did Luis wake up on Saturday?",
      questionEs: "¿A qué hora se despertó Luis el sábado?",
      options: [
        { label: "At five", emoji: "🕔" },
        { label: "At noon", emoji: "🕛" },
        { label: "At nine", emoji: "🕘" },
      ],
      answer: 0,
      sayIt: "He woke up at five and went running.",
      sayItEs: "Ejemplo: «He woke up at five.»",
      sayItAskEn: "What time did YOU wake up today?",
      sayItAskEs: "¿A qué hora te despertaste hoy?",
      sayItCheck: {
        target: "I woke up at *",
        allowShortAnswer: true,
        altTargets: ["at *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Where did Luis eat lunch?",
      questionEs: "¿Dónde almorzó Luis?",
      options: [
        { label: "At the market", emoji: "🍲" },
        { label: "At the office", emoji: "🏢" },
        { label: "At a hotel", emoji: "🏨" },
      ],
      answer: 0,
      sayIt: "He ate soup at the market with his mother.",
      sayItEs: "Ejemplo: «He ate at the market.»",
      sayItAskEn: "Where did YOU eat lunch yesterday?",
      sayItAskEs: "¿Dónde almorzaste ayer?",
      sayItCheck: {
        target: "I ate at *",
        altTargets: ["at *", "I ate *", "at home", "I had lunch at *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Why did Luis run so early?",
      questionEs: "¿Por qué corrió Luis tan temprano?",
      options: [
        { label: "He thinks better when he runs", emoji: "🏃" },
        { label: "He loves the cold", emoji: "🥶" },
        { label: "He lost his bus", emoji: "🚌" },
      ],
      answer: 0,
      sayIt: "Because he thinks better when he runs.",
      sayItEs: "Ejemplo: «Because he thinks better when he runs.»",
      sayItAskEn: "Why did you start learning English?",
      sayItAskEs: "¿Por qué empezaste a aprender inglés?",
      sayItCheck: {
        target: "because *",
        altTargets: ["I want *", "I wanted *", "for *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s10",
    phrase: "I am a champion.",
    es: "Soy un campeón / una campeona.",
  },
  continuePrompt: {
    en: "Your turn! Answer three past questions about your last weekend.",
    es: "¡Tu turno! Contesta tres preguntas en pasado sobre tu último fin de semana.",
  },
  continueWith: [
    "What time did I wake up? I woke up at…",
    "Where did I eat? I ate…",
    "Why? Because…",
    "Who did I see? I saw…",
  ],
  cliffhanger: {
    en: "Episode 10: Week 2 challenge. Vale must tell someone else's whole day — in front of everyone.",
    es: "Episodio 10: El reto de la Semana 2. Vale debe contar el día completo de otra persona — frente a todos.",
  },
};
