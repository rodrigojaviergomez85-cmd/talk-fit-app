import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep7/cover.jpg";
import s1 from "@/assets/storybook/vale-ep7/s1.jpg";
import s2 from "@/assets/storybook/vale-ep7/s2.jpg";
import s3 from "@/assets/storybook/vale-ep7/s3.jpg";
import s4 from "@/assets/storybook/vale-ep7/s4.jpg";
import s5 from "@/assets/storybook/vale-ep7/s5.jpg";
import s6 from "@/assets/storybook/vale-ep7/s6.jpg";
import s7 from "@/assets/storybook/vale-ep7/s7.jpg";
import s8 from "@/assets/storybook/vale-ep7/s8.jpg";
import s9 from "@/assets/storybook/vale-ep7/s9.jpg";
import s10 from "@/assets/storybook/vale-ep7/s10.jpg";

/**
 * Episode 7 — "My favorite color" / "Mi color favorito"
 *
 * Basic Zero Week 2: colors + reasons with "because", inside a team challenge.
 * Mindset card: "I am disciplined with my practice."
 *
 * Cast: Vale, Mateo, Kat, Dylan, Mr. Reyes (no new characters).
 */
export const VALE_FAVORITE_COLOR: StorybookEpisode = {
  id: "vale-favorite-color",
  moduleId: "basic-zero",
  week: 2,
  title: "My favorite color",
  titleEs: "Mi color favorito",
  episodeLabel: { en: "Episode 7", es: "Episodio 7" },
  previously: [
    { en: "Vale learned to give long answers with because.", es: "Vale aprendió a dar respuestas largas con because." },
    { en: "Dylan said Vale sounds fluent.", es: "Dylan dijo que Vale suena fluida." },
    { en: 'Vale wrote a note: "Always because."', es: "Vale escribió una nota: «Siempre because.»" },
  ],
  reviewWords: [
    { word: "because", es: "porque" },
    { word: "city", es: "ciudad" },
    { word: "people", es: "gente" },
    { word: "fluent", es: "fluido / fluida" },
    { word: "answer", es: "respuesta" },
    { word: "project", es: "proyecto" },
  ],
  blurb: {
    en: "A color challenge in the office. Every answer needs a reason.",
    es: "Un reto de colores en la oficina. Cada respuesta necesita una razón.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "La oficina decorada con globos de colores.",
      text: "The office is full of colors today. Balloons are everywhere.",
      es: "La oficina está llena de colores hoy. Hay globos por todas partes.",
      words: [
        { word: "colors", es: "colores" },
        { word: "balloons", es: "globos" },
        { word: "everywhere", es: "por todas partes" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mr. Reyes explica el reto del día.",
      text: '"Today we have a color challenge," says Mr. Reyes. "Say your color and say why."',
      es: "«Hoy tenemos un reto de colores», dice el señor Reyes. «Di tu color y di por qué.»",
      speaker: "boss",
      words: [
        { word: "challenge", es: "reto" },
        { word: "why", es: "por qué" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Kat levanta la mano con energía.",
      text: '"My favorite color is orange because it is happy and loud," says Kat.',
      es: "«Mi color favorito es el naranja porque es alegre y llamativo», dice Kat.",
      speaker: "kat",
      words: [
        { word: "orange", es: "naranja" },
        { word: "happy", es: "alegre / feliz" },
        { word: "loud", es: "llamativo / ruidoso" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Mateo responde con su chaqueta de mezclilla.",
      text: '"My favorite color is blue because my jacket is blue," says Mateo.',
      es: "«Mi color favorito es el azul porque mi chaqueta es azul», dice Mateo.",
      speaker: "mateo",
      words: [
        { word: "blue", es: "azul" },
        { word: "jacket", es: "chaqueta" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dylan responde desde la pantalla.",
      text: '"My favorite color is green because I love nature," says Dylan.',
      es: "«Mi color favorito es el verde porque amo la naturaleza», dice Dylan.",
      speaker: "dylan",
      words: [
        { word: "green", es: "verde" },
        { word: "nature", es: "naturaleza" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale duda: se le olvida la palabra para amarillo.",
      text: "Vale opens her mouth. She forgets the word for amarillo.",
      es: "Vale abre la boca. Se le olvida la palabra para amarillo.",
      words: [
        { word: "forgets", es: "olvida" },
        { word: "word", es: "palabra" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale mira su cuaderno de vocabulario.",
      text: 'Vale looks at her notebook. She practices every day. "I am disciplined," she says.',
      es: "Vale mira su cuaderno. Ella practica todos los días. «Soy disciplinada», dice.",
      speaker: "vale",
      words: [
        { word: "notebook", es: "cuaderno" },
        { word: "every", es: "cada / todos" },
        { word: "disciplined", es: "disciplinada / disciplinado" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale responde con seguridad frente al equipo.",
      text: '"My favorite color is yellow because yellow is the color of the sun."',
      es: "«Mi color favorito es el amarillo porque el amarillo es el color del sol.»",
      speaker: "vale",
      words: [
        { word: "yellow", es: "amarillo" },
        { word: "sun", es: "sol" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El equipo celebra la respuesta de Vale.",
      text: '"Perfect answer!" says Mr. Reyes. "Long, clear and with a reason."',
      es: "«¡Respuesta perfecta!», dice el señor Reyes. «Larga, clara y con una razón.»",
      speaker: "boss",
      words: [
        { word: "clear", es: "clara" },
        { word: "reason", es: "razón" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale y Mateo salen sonriendo con una caja de comida.",
      text: 'Kat brings a box. "Tomorrow: food day!" Vale is hungry already.',
      es: "Kat trae una caja. «¡Mañana: día de la comida!» Vale ya tiene hambre.",
      speaker: "kat",
      words: [
        { word: "box", es: "caja" },
        { word: "food", es: "comida" },
        { word: "hungry", es: "con hambre" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What is Kat's favorite color?",
      questionEs: "¿Cuál es el color favorito de Kat?",
      options: [
        { label: "Orange", emoji: "🧡" },
        { label: "Blue", emoji: "💙" },
        { label: "Green", emoji: "💚" },
      ],
      answer: 0,
      sayIt: "Her favorite color is orange.",
      sayItEs: "Ahora repite: «Su color favorito es el naranja.»",
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "Why is yellow Vale's favorite color?",
      questionEs: "¿Por qué el amarillo es el color favorito de Vale?",
      options: [
        { label: "It is the color of the sun", emoji: "☀️" },
        { label: "It is her jacket", emoji: "🧥" },
        { label: "It is nature", emoji: "🌳" },
      ],
      answer: 0,
      sayIt: "My favorite color is … because…",
      sayItEs: "Ahora di el tuyo: «Mi color favorito es… porque…»",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "How is a good answer?",
      questionEs: "¿Cómo es una buena respuesta?",
      options: [
        { label: "Long and with a reason", emoji: "🗣️" },
        { label: "One word", emoji: "🤐" },
        { label: "In Spanish", emoji: "🇪🇸" },
      ],
      answer: 0,
      sayIt: "My answers are long and clear.",
      sayItEs: "Ahora repite: «Mis respuestas son largas y claras.»",
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I am disciplined with my practice. I can learn anything.",
    es: "Soy disciplinado con mi práctica. Puedo aprender lo que sea.",
  },
  continuePrompt: {
    en: "Now say your favorite color and your reason. Then say one more color you like.",
    es: "Ahora di tu color favorito y tu razón. Luego di otro color que te guste.",
  },
  continueWith: [
    "My favorite color is…",
    "…because…",
    "I like … too",
    "My jacket is…",
    "I am disciplined.",
  ],
  cliffhanger: {
    en: "To be continued… Episode 8: My favorite food.",
    es: "Continuará… Episodio 8: Mi comida favorita.",
  },
};
