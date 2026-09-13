import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep16/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep16/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep16/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep16/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep16/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep16/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep16/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep16/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep16/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep16/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep16/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep16/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep16/s12.jpg";

/**
 * Season 4 · Episode 16 — "Once upon a time".
 * Basic 3 / Past Stories Week 4 Day 16: storytelling connectors (first, then, after that, finally).
 * Vale brings an old book and teaches the class how to tell a story.
 */
export const VALE_S4_ONCE_UPON_A_TIME: StorybookEpisode = {
  id: "vale-s4-once-upon-a-time",
  moduleId: "past-stories",
  week: 4,
  title: "Once upon a time",
  titleEs: "Érase una vez",
  episodeLabel: { en: "Season 4 · Episode 16", es: "Temporada 4 · Episodio 16" },
  previously: [
    { en: "Fourteen students played the memory game.", es: "Catorce estudiantes jugaron el juego de memoria." },
    { en: "Dani was teaching his little sister.", es: "Dani le estaba enseñando a su hermanita." },
    { en: "Vale needed more chairs.", es: "Vale necesitaba más sillas." },
  ],
  reviewWords: [
    { word: "was teaching", es: "estaba enseñando" },
    { word: "clapped", es: "aplaudió" },
    { word: "weren't enough", es: "no eran suficientes" },
    { word: "little sister", es: "hermanita" },
  ],
  blurb: {
    en: "Vale brings her grandmother's old book. Today the class learns the magic words: first, then, finally.",
    es: "Vale trae el libro viejo de su abuela. Hoy la clase aprende las palabras mágicas: first, then, finally.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale entra al salón con un libro viejo en las manos.",
      text: "Vale arrived with an old book. It was her grandmother's book.",
      es: "Vale llegó con un libro viejo. Era el libro de su abuela.",
      speaker: "vale",
      words: [
        { word: "old book", es: "libro viejo" },
        { word: "grandmother", es: "abuela" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Los estudiantes miran el libro con curiosidad.",
      text: '"Today we are storytellers," she said. The class got quiet.',
      es: "«Hoy somos narradores», dijo. La clase se quedó en silencio.",
      speaker: "vale",
      words: [
        { word: "storytellers", es: "narradores" },
        { word: "got quiet", es: "se quedó en silencio" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale escribe cuatro conectores en la pizarra.",
      text: 'She wrote four magic words: "First. Then. After that. Finally."',
      es: "Escribió cuatro palabras mágicas: «First. Then. After that. Finally».",
      speaker: "vale",
      words: [
        { word: "First", es: "primero" },
        { word: "Then", es: "luego" },
        { word: "After that", es: "después de eso" },
        { word: "Finally", es: "finalmente" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale abre el libro y empieza a leer.",
      text: '"Every story starts the same way: Once upon a time…"',
      es: "«Toda historia empieza igual: Once upon a time…»",
      speaker: "vale",
      words: [
        { word: "Every story", es: "toda historia" },
        { word: "Once upon a time", es: "érase una vez" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Ilustración de un niño con una caja de zapatos en un pueblo.",
      text: "Once upon a time, a poor boy lived in a small town. First, he sold candy.",
      es: "Érase una vez, un niño pobre vivía en un pueblo pequeño. Primero, vendía dulces.",
      words: [
        { word: "poor boy", es: "niño pobre" },
        { word: "town", es: "pueblo" },
        { word: "sold", es: "vendía / vendió" },
        { word: "candy", es: "dulces" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Ilustración del niño estudiando bajo un poste de luz.",
      text: "Then, every night, he studied under a street light. He didn't have electricity.",
      es: "Luego, cada noche, estudiaba bajo un poste de luz. No tenía electricidad.",
      words: [
        { word: "every night", es: "cada noche" },
        { word: "street light", es: "poste de luz" },
        { word: "electricity", es: "electricidad" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Ilustración del niño ya joven, entrando a una escuela.",
      text: "After that, a teacher gave him a book. He read it ten times.",
      es: "Después de eso, un maestro le dio un libro. Lo leyó diez veces.",
      words: [
        { word: "gave", es: "dio" },
        { word: "read it", es: "lo leyó" },
        { word: "ten times", es: "diez veces" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Ilustración del joven ya adulto enseñando a otros niños.",
      text: "Finally, he became a teacher too. And the town changed.",
      es: "Finalmente, él también se hizo maestro. Y el pueblo cambió.",
      words: [
        { word: "became", es: "se hizo / se convirtió" },
        { word: "changed", es: "cambió" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Los estudiantes escuchan muy atentos.",
      text: 'Nobody moved. Then Kat asked: "Was that story real?"',
      es: "Nadie se movió. Luego Kat preguntó: «¿Esa historia era real?»",
      speaker: "kat",
      words: [
        { word: "Nobody moved", es: "nadie se movió" },
        { word: "real", es: "real" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale muestra una foto antigua dentro del libro.",
      text: '"Yes," Vale said. "He was my grandfather. He taught my grandmother to read."',
      es: "«Sí», dijo Vale. «Era mi abuelo. Le enseñó a leer a mi abuela».",
      speaker: "vale",
      words: [
        { word: "grandfather", es: "abuelo" },
        { word: "taught", es: "enseñó" },
        { word: "to read", es: "a leer" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Los estudiantes escriben en sus cuadernos.",
      text: '"Now write your story," Vale said. "First, then, after that, finally."',
      es: "«Ahora escriban su historia», dijo Vale. «First, then, after that, finally».",
      speaker: "vale",
      words: [
        { word: "write", es: "escriban" },
        { word: "your story", es: "su historia" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Vale cierra el libro viejo con cariño.",
      text: "Next week they read a famous story: a girl, a forest and a wolf.",
      es: "La próxima semana leerán una historia famosa: una niña, un bosque y un lobo.",
      words: [
        { word: "famous", es: "famosa" },
        { word: "forest", es: "bosque" },
        { word: "wolf", es: "lobo" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "Which word ends a story?",
      questionEs: "¿Qué palabra termina una historia?",
      options: [
        { label: "Finally", emoji: "🏁" },
        { label: "First", emoji: "1️⃣" },
        { label: "Then", emoji: "➡️" },
      ],
      answer: 0,
      sayIt: "Finally ends the story.",
      sayItEs: "Ejemplo: «Finally ends the story.»",
      sayItAskEn: "What did you do first this morning?",
      sayItAskEs: "¿Qué hiciste primero esta mañana?",
      sayItCheck: {
        target: "first I *",
        altTargets: ["I *", "first *"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "What did the boy do every night?",
      questionEs: "¿Qué hacía el niño cada noche?",
      options: [
        { label: "He studied under a street light", emoji: "💡" },
        { label: "He watched TV", emoji: "📺" },
        { label: "He sold books", emoji: "📚" },
      ],
      answer: 0,
      sayIt: "He studied under a street light.",
      sayItEs: "Ejemplo: «He studied under a street light.»",
      sayItAskEn: "What did you do after that yesterday?",
      sayItAskEs: "¿Qué hiciste después de eso ayer?",
      sayItCheck: {
        target: "after that I *",
        altTargets: ["then I *", "I *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "Who was the boy in the story?",
      questionEs: "¿Quién era el niño de la historia?",
      options: [
        { label: "Vale's grandfather", emoji: "👴" },
        { label: "Dani's father", emoji: "👨" },
        { label: "Luis", emoji: "🧔" },
      ],
      answer: 0,
      sayIt: "He was Vale's grandfather.",
      sayItEs: "Ejemplo: «He was Vale's grandfather.»",
      sayItAskEn: "Who taught you something important?",
      sayItAskEs: "¿Quién te enseñó algo importante?",
      sayItCheck: {
        target: "my * taught me",
        altTargets: ["my *", "* taught me", "my teacher"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "English is easy.",
    es: "El inglés es fácil.",
  },
  continuePrompt: {
    en: "Your turn! Tell a small story about yesterday using first, then, after that, finally.",
    es: "¡Tu turno! Cuenta una historia pequeña de ayer usando first, then, after that, finally.",
  },
  continueWith: [
    "First, I…",
    "Then, I…",
    "After that, I…",
    "Finally, I…",
  ],
  cliffhanger: {
    en: "Episode 17: A red jacket, a basket and a dark forest.",
    es: "Episodio 17: Una chaqueta roja, una canasta y un bosque oscuro.",
  },
};
