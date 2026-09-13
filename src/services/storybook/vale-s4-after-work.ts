import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep3/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep3/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep3/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep3/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep3/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep3/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep3/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep3/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep3/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep3/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep3/s10.jpg";

/**
 * Season 4 · Episode 3 — "After work".
 * Matches Basic 3 / Past Stories Week 1 Day 3: simple past — after work yesterday.
 */
export const VALE_S4_AFTER_WORK: StorybookEpisode = {
  id: "vale-s4-after-work",
  moduleId: "past-stories",
  week: 1,
  title: "After work",
  titleEs: "Después del trabajo",
  episodeLabel: { en: "Season 4 · Episode 3", es: "Temporada 4 · Episodio 3" },
  previously: [
    { en: "Vale finished forty calls at work.", es: "Vale terminó cuarenta llamadas en el trabajo." },
    { en: "An angry client ended up thanking her.", es: "Un cliente enojado terminó agradeciéndole." },
    { en: "Camila asked: what happened after work?", es: "Camila preguntó: ¿qué pasó después del trabajo?" },
  ],
  reviewWords: [
    { word: "answered", es: "contesté" },
    { word: "fixed", es: "arreglé" },
    { word: "finished", es: "terminé" },
    { word: "thanked", es: "agradeció" },
  ],
  blurb: {
    en: "After work, Vale walked home with Luis — and he gave her big news.",
    es: "Después del trabajo, Vale caminó a casa con Luis — y él le dio una gran noticia.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale sale de la oficina a las cuatro.",
      text: '"I left the office at four. The sun was warm."',
      es: "«Salí de la oficina a las cuatro. El sol estaba cálido».",
      speaker: "vale",
      words: [
        { word: "left", es: "salí (leave en pasado)" },
        { word: "sun", es: "sol" },
        { word: "warm", es: "cálido" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Luis espera a Vale afuera con su mochila negra.",
      text: '"Luis waited for me outside with his black backpack."',
      es: "«Luis me esperó afuera con su mochila negra».",
      speaker: "vale",
      words: [
        { word: "waited", es: "esperó" },
        { word: "outside", es: "afuera" },
        { word: "backpack", es: "mochila" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale y Luis caminan por el mercado.",
      text: '"We walked through the market and bought mangoes."',
      es: "«Caminamos por el mercado y compramos mangos».",
      speaker: "vale",
      words: [
        { word: "through", es: "a través de / por" },
        { word: "market", es: "mercado" },
        { word: "bought", es: "compramos (buy en pasado)" },
        { word: "mangoes", es: "mangos" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Luis le muestra a Vale un papel con una sonrisa.",
      text: '"Then Luis showed me his phone. It was a message from the school."',
      es: "«Luego Luis me mostró su teléfono. Era un mensaje de la escuela».",
      speaker: "vale",
      words: [
        { word: "showed", es: "mostró" },
        { word: "phone", es: "teléfono" },
        { word: "message", es: "mensaje" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale lee el mensaje de la escuela sorprendida.",
      text: '"The school from my demo class wants me every Saturday. ME?"',
      es: "«La escuela de mi clase demo me quiere todos los sábados. ¿YO?»",
      speaker: "vale",
      words: [
        { word: "demo class", es: "clase de prueba" },
        { word: "wants", es: "quiere" },
        { word: "every Saturday", es: "todos los sábados" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Luis sonríe y señala a Vale con confianza.",
      text: '"You are ready, Vale," said Luis. "You help people every day."',
      es: "«Estás lista, Vale», dijo Luis. «Ayudas a la gente todos los días».",
      speaker: "luis",
      words: [
        { word: "ready", es: "lista / listo" },
        { word: "help", es: "ayudar" },
        { word: "people", es: "gente" },
        { word: "every day", es: "todos los días" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale camina pensativa bajo los árboles.",
      text: '"I walked home slowly. My heart went fast."',
      es: "«Caminé a casa despacio. Mi corazón iba rápido».",
      speaker: "vale",
      words: [
        { word: "slowly", es: "despacio" },
        { word: "heart", es: "corazón" },
        { word: "went", es: "iba (go en pasado)" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale llega a casa y abraza a su mamá.",
      text: '"At home I hugged my mom and told her the news."',
      es: "«En casa abracé a mi mamá y le conté la noticia».",
      speaker: "vale",
      words: [
        { word: "hugged", es: "abracé" },
        { word: "told", es: "conté (tell en pasado)" },
        { word: "news", es: "noticia" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale y su mamá cenan y hablan emocionadas.",
      text: '"We cooked dinner together and talked for hours."',
      es: "«Cocinamos la cena juntas y hablamos por horas».",
      speaker: "vale",
      words: [
        { word: "dinner", es: "cena" },
        { word: "together", es: "juntas" },
        { word: "hours", es: "horas" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Camila le pregunta a Vale si aceptó.",
      text: '"So... did you say yes?" asked Camila.',
      es: "«Entonces... ¿dijiste que sí?», preguntó Camila.",
      speaker: "camila",
      words: [
        { word: "say yes", es: "decir que sí" },
        { word: "asked", es: "preguntó" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What did Vale and Luis buy at the market?",
      questionEs: "¿Qué compraron Vale y Luis en el mercado?",
      options: [
        { label: "Mangoes", emoji: "🥭" },
        { label: "Pizza", emoji: "🍕" },
        { label: "Books", emoji: "📚" },
      ],
      answer: 0,
      sayIt: "They bought mangoes.",
      sayItEs: "Ejemplo: «They bought mangoes.»",
      sayItAskEn: "What did you buy this week?",
      sayItAskEs: "¿Qué compraste esta semana tú?",
      sayItCheck: {
        target: "I bought *",
        altTargets: ["nothing", "I didn't buy anything"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "What was the message from the school?",
      questionEs: "¿Qué era el mensaje de la escuela?",
      options: [
        { label: "They want her every Saturday", emoji: "👩‍🏫" },
        { label: "A birthday party", emoji: "🎂" },
        { label: "A soccer game", emoji: "⚽" },
      ],
      answer: 0,
      sayIt: "The school wants her every Saturday.",
      sayItEs: "Ejemplo: «The school wants her every Saturday.»",
      sayItAskEn: "What good news did you receive this year?",
      sayItAskEs: "¿Qué buena noticia recibiste este año?",
      sayItCheck: {
        target: "I *",
        altTargets: ["my *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Who did Vale cook dinner with?",
      questionEs: "¿Con quién cocinó la cena Vale?",
      options: [
        { label: "With her mom", emoji: "👩‍👧" },
        { label: "With Kat", emoji: "🧡" },
        { label: "Alone", emoji: "🍽️" },
      ],
      answer: 0,
      sayIt: "She cooked dinner with her mom.",
      sayItEs: "Ejemplo: «She cooked dinner with her mom.»",
      sayItAskEn: "Who did you spend time with yesterday?",
      sayItAskEs: "¿Con quién pasaste tiempo ayer tú?",
      sayItCheck: {
        target: "with *",
        altTargets: ["I spent time with *", "my *", "alone"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I believe in myself.",
    es: "Yo creo en mí.",
  },
  continuePrompt: {
    en: "Now tell us: what did you do after work or school yesterday?",
    es: "Ahora cuéntanos: ¿qué hiciste ayer después del trabajo o la escuela?",
  },
  continueWith: [
    "After work I…",
    "I walked with…",
    "I bought…",
    "At home I…",
  ],
  cliffhanger: {
    en: "Episode 4: 'How was your day?' — Vale's answer surprises everyone.",
    es: "Episodio 4: «¿Cómo estuvo tu día?» — la respuesta de Vale sorprende a todos.",
  },
};
