import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep15/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep15/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep15/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep15/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep15/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep15/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep15/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep15/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep15/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep15/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep15/s10.jpg";

/**
 * Season 3 · Episode 15 — "The process challenge".
 * Basic 2 / Simple Present Week 3 Day 15: week review + weekly future-plans scene.
 */
export const VALE_S3_PROCESS_CHALLENGE: StorybookEpisode = {
  id: "vale-s3-process-challenge",
  moduleId: "simple-present",
  week: 3,
  title: "The process challenge",
  titleEs: "El reto de procesos",
  episodeLabel: { en: "Season 3 · Episode 15", es: "Temporada 3 · Episodio 15" },
  previously: [
    { en: "Mateo explained his famous sandwich.", es: "Mateo explicó su famoso sándwich." },
    { en: "Mr. Reyes announced the process challenge.", es: "Mr. Reyes anunció el reto de procesos." },
  ],
  reviewWords: [
    { word: "First", es: "primero" },
    { word: "Next", es: "después" },
    { word: "Finally", es: "finalmente" },
    { word: "share", es: "compartir" },
  ],
  blurb: {
    en: "Everybody explains a process. Vale goes last, and the room goes quiet.",
    es: "Todos explican un proceso. Vale va de última, y la sala se queda en silencio.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El equipo reunido frente a una pizarra.",
      text: "Friday. The team meets. Today each person explains a process.",
      es: "Viernes. El equipo se reúne. Hoy cada persona explica un proceso.",
      speaker: "narrator",
      words: [
        { word: "Friday", es: "viernes" },
        { word: "each", es: "cada" },
        { word: "process", es: "proceso" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Kat explica cómo empieza su turno.",
      text: "Kat starts: \"First, I open the queue. Then, I check the calls.\"",
      es: "Kat empieza: «Primero, abro la cola. Luego, reviso las llamadas.»",
      speaker: "kat",
      words: [
        { word: "queue", es: "cola" },
        { word: "calls", es: "llamadas" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Mateo explica cómo entrena con un balón.",
      text: "Mateo explains: \"Next, I run. After that, I practice with the ball.\"",
      es: "Mateo explica: «Después, corro. Después de eso, practico con el balón.»",
      speaker: "mateo",
      words: [
        { word: "run", es: "correr" },
        { word: "practice", es: "practicar" },
        { word: "ball", es: "balón" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale espera su turno, nerviosa.",
      text: "Vale waits. Her hands shake. She does not want to make mistakes.",
      es: "Vale espera. Sus manos tiemblan. No quiere cometer errores.",
      speaker: "narrator",
      words: [
        { word: "waits", es: "espera" },
        { word: "shake", es: "tiemblan" },
        { word: "mistakes", es: "errores" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale cierra los ojos y respira profundo.",
      text: "Vale closes her eyes and says: \"I believe in myself.\"",
      es: "Vale cierra los ojos y dice: «Creo en mí misma.»",
      speaker: "vale",
      words: [
        { word: "closes", es: "cierra" },
        { word: "believe", es: "creer" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale explica frente al equipo con seguridad.",
      text: "Vale speaks: \"First, I answer the call. Then, I listen to the customer.\"",
      es: "Vale habla: «Primero, contesto la llamada. Luego, escucho al cliente.»",
      speaker: "vale",
      words: [
        { word: "answer", es: "contestar" },
        { word: "listen", es: "escuchar" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale señala los pasos en la pizarra.",
      text: "\"Next, I find the order. Finally, I solve the problem.\"",
      es: "«Después, busco la orden. Finalmente, resuelvo el problema.»",
      speaker: "vale",
      words: [
        { word: "find", es: "encontrar" },
        { word: "solve", es: "resolver" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "El equipo aplaude de pie.",
      text: "The team claps. Mr. Reyes says: \"Vale explains like a teacher.\"",
      es: "El equipo aplaude. Mr. Reyes dice: «Vale explica como maestra.»",
      speaker: "boss",
      words: [
        { word: "claps", es: "aplaude" },
        { word: "teacher", es: "maestra" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El equipo habla de sus planes del próximo mes.",
      text: "Mr. Reyes asks: \"What are you going to do next month?\"",
      es: "Mr. Reyes pregunta: «¿Qué van a hacer el próximo mes?»",
      speaker: "boss",
      words: [
        { word: "going to", es: "van a" },
        { word: "next month", es: "el próximo mes" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale mira por la ventana con una sonrisa grande.",
      text: "Vale answers: \"I am going to teach my first class. I will be ready.\"",
      es: "Vale responde: «Voy a dar mi primera clase. Estaré lista.»",
      speaker: "vale",
      words: [
        { word: "teach", es: "enseñar" },
        { word: "class", es: "clase" },
        { word: "ready", es: "lista" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What does Mateo do after he runs?",
      questionEs: "¿Qué hace Mateo después de correr?",
      options: [
        { label: "He practices with the ball", emoji: "⚽" },
        { label: "He opens the queue", emoji: "💻" },
        { label: "He cooks a pizza", emoji: "🍕" },
      ],
      answer: 0,
      sayIt: "He practices with the ball.",
      sayItEs: "Repite: «He practices with the ball.»",
      sayItCheck: { target: "He practices with the ball" },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What process do you explain best?",
      questionEs: "¿Qué proceso explicas mejor?",
      options: [
        { label: "How I make coffee", emoji: "☕" },
        { label: "How I use my phone", emoji: "📱" },
        { label: "How I study English", emoji: "📘" },
      ],
      answer: 0,
      sayIt: "I explain how I make coffee.",
      sayItEs: "Ejemplo: «I explain how I make coffee.»",
      sayItAskEn: "What process do you explain best?",
      sayItAskEs: "¿Qué proceso explicas mejor?",
      sayItCheck: {
        target: "I explain how I *",
        altTargets: ["I explain *", "How I *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What are you going to do next month?",
      questionEs: "¿Qué vas a hacer el próximo mes?",
      options: [
        { label: "I am going to study more", emoji: "📚" },
        { label: "I am going to work", emoji: "💼" },
        { label: "I am going to travel", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "I am going to study more next month.",
      sayItEs: "Ejemplo: «I am going to study more next month.»",
      sayItAskEn: "What are you going to do next month?",
      sayItAskEs: "¿Qué vas a hacer el próximo mes?",
      sayItCheck: {
        target: "I am going to *",
        altTargets: ["I'm going to *", "I will *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I believe in myself.",
    es: "Creo en mí misma.",
  },
  continuePrompt: {
    en: "Explain one process you do at work or at home, step by step.",
    es: "Explica un proceso que haces en el trabajo o en casa, paso a paso.",
  },
  continueWith: ["First, I…", "Then, I…", "Next, I…", "Finally, I…"],
  cliffhanger: {
    en: "Episode 16: A free Saturday. What is everybody doing right now?",
    es: "Episodio 16: Un sábado libre. ¿Qué está haciendo todo el mundo ahora?",
  },
};
