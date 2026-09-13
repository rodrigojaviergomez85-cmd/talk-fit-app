import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep17/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep17/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep17/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep17/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep17/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep17/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep17/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep17/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep17/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep17/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep17/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep17/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep17/s12.jpg";

/**
 * Season 4 · Episode 17 — "The forest and the wolf".
 * Basic 3 / Past Stories Week 4 Day 17: classic tale in simple past + past progressive.
 * Part 1 of Little Red Riding Hood, told by Vale.
 */
export const VALE_S4_FOREST_WOLF: StorybookEpisode = {
  id: "vale-s4-forest-wolf",
  moduleId: "past-stories",
  week: 4,
  title: "The forest and the wolf",
  titleEs: "El bosque y el lobo",
  episodeLabel: { en: "Season 4 · Episode 17", es: "Temporada 4 · Episodio 17" },
  previously: [
    { en: "Vale told her grandfather's story.", es: "Vale contó la historia de su abuelo." },
    { en: "The class learned first, then, finally.", es: "La clase aprendió first, then, finally." },
    { en: "A famous story was coming.", es: "Venía una historia famosa." },
  ],
  reviewWords: [
    { word: "Once upon a time", es: "érase una vez" },
    { word: "Finally", es: "finalmente" },
    { word: "became", es: "se convirtió" },
    { word: "storytellers", es: "narradores" },
  ],
  blurb: {
    en: "A girl in a red jacket. A basket of bread. A forest. And someone who was watching her.",
    es: "Una niña con chaqueta roja. Una canasta con pan. Un bosque. Y alguien que la estaba observando.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale lee el libro frente a la clase.",
      text: 'Vale opened the book. "Once upon a time, there was a girl."',
      es: "Vale abrió el libro. «Érase una vez, había una niña».",
      speaker: "vale",
      words: [
        { word: "opened", es: "abrió" },
        { word: "there was", es: "había" },
        { word: "girl", es: "niña" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Ilustración de una niña con chaqueta roja en un pueblo.",
      text: "She always wore a red jacket. Everybody called her Little Red.",
      es: "Siempre usaba una chaqueta roja. Todos la llamaban Little Red.",
      words: [
        { word: "wore", es: "usaba" },
        { word: "red jacket", es: "chaqueta roja" },
        { word: "called her", es: "la llamaban" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "La mamá le entrega una canasta con pan.",
      text: 'First, her mother gave her a basket. "Take this bread to your grandma."',
      es: "Primero, su mamá le dio una canasta. «Llévale este pan a tu abuela».",
      words: [
        { word: "mother", es: "mamá" },
        { word: "basket", es: "canasta" },
        { word: "bread", es: "pan" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "La mamá le advierte con el dedo levantado.",
      text: '"Don\'t stop in the forest," her mother said. Little Red promised.',
      es: "«No te detengas en el bosque», dijo su mamá. Little Red prometió.",
      words: [
        { word: "Don't stop", es: "no te detengas" },
        { word: "forest", es: "bosque" },
        { word: "promised", es: "prometió" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "La niña camina por un sendero del bosque.",
      text: "Then she walked into the forest. The birds were singing.",
      es: "Luego caminó hacia el bosque. Los pájaros estaban cantando.",
      words: [
        { word: "walked into", es: "caminó hacia dentro" },
        { word: "birds", es: "pájaros" },
        { word: "were singing", es: "estaban cantando" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "La niña recoge flores amarillas.",
      text: "While she was picking flowers, a wolf was watching her.",
      es: "Mientras estaba recogiendo flores, un lobo la estaba observando.",
      words: [
        { word: "was picking", es: "estaba recogiendo" },
        { word: "flowers", es: "flores" },
        { word: "wolf", es: "lobo" },
        { word: "was watching", es: "estaba observando" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Un lobo gris aparece detrás de un árbol, amistoso pero astuto.",
      text: '"Good morning," the wolf said politely. "Where are you going?"',
      es: "«Buenos días», dijo el lobo con educación. «¿Adónde vas?»",
      words: [
        { word: "politely", es: "con educación" },
        { word: "Where are you going?", es: "¿adónde vas?" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "La niña le señala el camino al lobo.",
      text: '"To my grandma\'s house," she answered. That was her mistake.',
      es: "«A la casa de mi abuela», contestó. Ese fue su error.",
      words: [
        { word: "grandma's house", es: "la casa de mi abuela" },
        { word: "mistake", es: "error" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El lobo corre rápido entre los árboles.",
      text: "After that, the wolf ran fast. He knew a shorter road.",
      es: "Después de eso, el lobo corrió rápido. Conocía un camino más corto.",
      words: [
        { word: "ran fast", es: "corrió rápido" },
        { word: "knew", es: "conocía" },
        { word: "shorter road", es: "camino más corto" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "La casita de la abuela en el bosque.",
      text: "The grandma was reading in her bed when somebody knocked.",
      es: "La abuela estaba leyendo en su cama cuando alguien tocó la puerta.",
      words: [
        { word: "was reading", es: "estaba leyendo" },
        { word: "bed", es: "cama" },
        { word: "knocked", es: "tocó la puerta" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "La clase escucha con los ojos bien abiertos.",
      text: "Vale closed the book. The class shouted: \"No! Continue!\"",
      es: "Vale cerró el libro. La clase gritó: «¡No! ¡Continúa!»",
      speaker: "vale",
      words: [
        { word: "closed", es: "cerró" },
        { word: "shouted", es: "gritó" },
        { word: "Continue", es: "continúa" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Vale sonríe con el libro cerrado en las manos.",
      text: '"Next class," she smiled. "Good stories always wait."',
      es: "«La próxima clase», sonrió. «Las buenas historias siempre esperan».",
      words: [
        { word: "Next class", es: "la próxima clase" },
        { word: "always wait", es: "siempre esperan" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What did her mother give her?",
      questionEs: "¿Qué le dio su mamá?",
      options: [
        { label: "A basket with bread", emoji: "🧺" },
        { label: "A red car", emoji: "🚗" },
        { label: "A phone", emoji: "📱" },
      ],
      answer: 0,
      sayIt: "Her mother gave her a basket.",
      sayItEs: "Ejemplo: «Her mother gave her a basket.»",
      sayItAskEn: "What did somebody give you last week?",
      sayItAskEs: "¿Qué te dio alguien la semana pasada?",
      sayItCheck: {
        target: "* gave me *",
        altTargets: ["my * gave me *", "a *", "nothing"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "What was the wolf doing while she was picking flowers?",
      questionEs: "¿Qué estaba haciendo el lobo mientras ella recogía flores?",
      options: [
        { label: "He was watching her", emoji: "👀" },
        { label: "He was sleeping", emoji: "😴" },
        { label: "He was cooking", emoji: "🍳" },
      ],
      answer: 0,
      sayIt: "He was watching her.",
      sayItEs: "Ejemplo: «He was watching her.»",
      sayItAskEn: "Where were you walking last weekend?",
      sayItAskEs: "¿Por dónde estabas caminando el fin de semana pasado?",
      sayItCheck: {
        target: "I was walking *",
        altTargets: ["in *", "I was at *", "I wasn't walking"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What was the grandma doing when somebody knocked?",
      questionEs: "¿Qué estaba haciendo la abuela cuando alguien tocó?",
      options: [
        { label: "She was reading in bed", emoji: "📖" },
        { label: "She was cooking bread", emoji: "🍞" },
        { label: "She was running", emoji: "🏃" },
      ],
      answer: 0,
      sayIt: "She was reading in bed.",
      sayItEs: "Ejemplo: «She was reading in bed.»",
      sayItAskEn: "What were you reading last night?",
      sayItAskEs: "¿Qué estabas leyendo anoche?",
      sayItCheck: {
        target: "I was reading *",
        altTargets: ["I wasn't reading", "a *", "my *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "I believe in myself.",
    es: "Creo en mí.",
  },
  continuePrompt: {
    en: "Your turn! Retell the beginning: first, then, after that. What happened in the forest?",
    es: "¡Tu turno! Vuelve a contar el inicio: first, then, after that. ¿Qué pasó en el bosque?",
  },
  continueWith: [
    "First, her mother…",
    "Then, she…",
    "While she was…",
    "After that, the wolf…",
  ],
  cliffhanger: {
    en: "Episode 18: Somebody was in grandma's bed. And it wasn't grandma.",
    es: "Episodio 18: Alguien estaba en la cama de la abuela. Y no era la abuela.",
  },
};
