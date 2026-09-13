import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep4/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep4/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep4/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep4/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep4/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep4/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep4/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep4/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep4/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep4/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep4/s10.jpg";

/**
 * Season 4 · Episode 4 — "How was your day?".
 * Matches Basic 3 / Past Stories Week 1 Day 4: simple past — asking and answering "How was your day?".
 */
export const VALE_S4_HOW_WAS_YOUR_DAY: StorybookEpisode = {
  id: "vale-s4-how-was-your-day",
  moduleId: "past-stories",
  week: 1,
  title: "How was your day?",
  titleEs: "¿Cómo estuvo tu día?",
  episodeLabel: { en: "Season 4 · Episode 4", es: "Temporada 4 · Episodio 4" },
  previously: [
    { en: "The demo-class school wants Vale every Saturday.", es: "La escuela de la clase demo quiere a Vale todos los sábados." },
    { en: "Vale's heart went fast.", es: "El corazón de Vale iba rápido." },
    { en: "She told her mom the news at dinner.", es: "Le contó la noticia a su mamá en la cena." },
  ],
  reviewWords: [
    { word: "bought", es: "compramos" },
    { word: "showed", es: "mostró" },
    { word: "hugged", es: "abracé" },
    { word: "told", es: "conté" },
  ],
  blurb: {
    en: "The whole team asks Vale: how was your day? Her answer changes the room.",
    es: "Todo el equipo le pregunta a Vale: ¿cómo estuvo tu día? Su respuesta cambia el ambiente.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale llega a la oficina sonriendo al día siguiente.",
      text: "The next morning, Vale walked into the office with a big smile.",
      es: "A la mañana siguiente, Vale entró a la oficina con una gran sonrisa.",
      words: [
        { word: "next", es: "siguiente" },
        { word: "smile", es: "sonrisa" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mateo le pregunta a Vale cómo estuvo su día.",
      text: '"How was your day yesterday?" asked Mateo.',
      es: "«¿Cómo estuvo tu día ayer?», preguntó Mateo.",
      speaker: "mateo",
      words: [
        { word: "how", es: "cómo" },
        { word: "was", es: "estuvo / fue (pasado de is)" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale responde con energía.",
      text: '"It was great! I finished forty calls and helped an angry man."',
      es: "«¡Estuvo genial! Terminé cuarenta llamadas y ayudé a un hombre enojado».",
      speaker: "vale",
      words: [
        { word: "great", es: "genial" },
        { word: "helped", es: "ayudé" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat levanta la mano y cuenta su día.",
      text: '"Mine was hard," said Kat. "I lost two sales, but I learned a lot."',
      es: "«El mío estuvo difícil», dijo Kat. «Perdí dos ventas, pero aprendí mucho».",
      speaker: "kat",
      words: [
        { word: "hard", es: "difícil" },
        { word: "lost", es: "perdí (lose en pasado)" },
        { word: "sales", es: "ventas" },
        { word: "learned", es: "aprendí" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Mateo cuenta su día con una sonrisa.",
      text: '"My day was funny," said Mateo. "A client sang to me on the phone!"',
      es: "«Mi día fue divertido», dijo Mateo. «¡Un cliente me cantó por teléfono!»",
      speaker: "mateo",
      words: [
        { word: "funny", es: "divertido / gracioso" },
        { word: "client", es: "cliente" },
        { word: "sang", es: "cantó (sing en pasado)" },
        { word: "phone", es: "teléfono" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Todos se ríen juntos en la oficina.",
      text: "Everybody laughed. The office felt warm and alive.",
      es: "Todos se rieron. La oficina se sintió cálida y viva.",
      words: [
        { word: "everybody", es: "todos" },
        { word: "felt", es: "se sintió (feel en pasado)" },
        { word: "alive", es: "viva" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale toma aire y comparte su noticia.",
      text: '"And I got some news," said Vale. "I am going to teach every Saturday."',
      es: "«Y recibí una noticia», dijo Vale. «Voy a enseñar todos los sábados».",
      speaker: "vale",
      words: [
        { word: "got", es: "recibí (get en pasado)" },
        { word: "teach", es: "enseñar" },
        { word: "every Saturday", es: "todos los sábados" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "El equipo aplaude emocionado.",
      text: "The team clapped. Kat's eyes went big. Mateo shouted, Yes!",
      es: "El equipo aplaudió. Los ojos de Kat se hicieron grandes. Mateo gritó: ¡Sí!",
      words: [
        { word: "clapped", es: "aplaudió" },
        { word: "eyes", es: "ojos" },
        { word: "shouted", es: "gritó" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El jefe escucha y sonríe desde su escritorio.",
      text: '"That is a big step," said the boss. "We are proud of you."',
      es: "«Es un gran paso», dijo el jefe. «Estamos orgullosos de ti».",
      speaker: "boss",
      words: [
        { word: "step", es: "paso" },
        { word: "proud", es: "orgullosos" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale piensa en su decisión mirando por la ventana.",
      text: "That night, Vale looked out the window and thought about her answer.",
      es: "Esa noche, Vale miró por la ventana y pensó en su respuesta.",
      words: [
        { word: "looked", es: "miró" },
        { word: "window", es: "ventana" },
        { word: "thought", es: "pensó (think en pasado)" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "How was Vale's day yesterday?",
      questionEs: "¿Cómo estuvo el día de Vale ayer?",
      options: [
        { label: "Great", emoji: "😄" },
        { label: "Terrible", emoji: "😖" },
        { label: "Boring", emoji: "🥱" },
      ],
      answer: 0,
      sayIt: "Her day was great.",
      sayItEs: "Ejemplo: «Her day was great.»",
      sayItAskEn: "How was your day yesterday?",
      sayItAskEs: "¿Cómo estuvo tu día ayer tú?",
      sayItCheck: {
        target: "it was *",
        altTargets: ["my day was *", "great", "good", "hard"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "What happened on Mateo's call?",
      questionEs: "¿Qué pasó en la llamada de Mateo?",
      options: [
        { label: "A client sang to him", emoji: "🎤" },
        { label: "A client cried", emoji: "😢" },
        { label: "The internet died", emoji: "📶" },
      ],
      answer: 0,
      sayIt: "A client sang to him on the phone.",
      sayItEs: "Ejemplo: «A client sang to him on the phone.»",
      sayItAskEn: "What funny thing happened to you recently?",
      sayItAskEs: "¿Qué cosa divertida te pasó recientemente?",
      sayItCheck: {
        target: "I *",
        altTargets: ["a *", "my *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "How did the team react to Vale's news?",
      questionEs: "¿Cómo reaccionó el equipo a la noticia de Vale?",
      options: [
        { label: "They clapped", emoji: "👏" },
        { label: "They got angry", emoji: "😠" },
        { label: "They left", emoji: "🚪" },
      ],
      answer: 0,
      sayIt: "The team clapped.",
      sayItEs: "Ejemplo: «The team clapped.»",
      sayItAskEn: "When did people clap or celebrate for you?",
      sayItAskEs: "¿Cuándo aplaudieron o celebraron por ti?",
      sayItCheck: {
        target: "at *",
        altTargets: ["when I *", "they clapped at my *", "never"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I am a champion.",
    es: "Yo soy un/a campeón/campeona.",
  },
  continuePrompt: {
    en: "Now answer the big question: How was YOUR day yesterday? Tell us 3 things.",
    es: "Ahora responde la gran pregunta: ¿Cómo estuvo TU día ayer? Cuéntanos 3 cosas.",
  },
  continueWith: [
    "My day was…",
    "I finished…",
    "I talked with…",
    "The best part was…",
  ],
  cliffhanger: {
    en: "Episode 5: Vale's answer — and the challenge of telling the whole day in English.",
    es: "Episodio 5: La respuesta de Vale — y el reto de contar todo su día en inglés.",
  },
};
