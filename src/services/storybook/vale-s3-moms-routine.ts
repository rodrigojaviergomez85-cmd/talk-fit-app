import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep6/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep6/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep6/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep6/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep6/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep6/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep6/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep6/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep6/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep6/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep6/s10.jpg";

/**
 * Season 3 · Episode 6 — "My mom's routine".
 * Basic 2 / Simple Present Week 2 Day 6: other people's routines (he/she + -s).
 */
export const VALE_S3_MOMS_ROUTINE: StorybookEpisode = {
  id: "vale-s3-moms-routine",
  moduleId: "simple-present",
  week: 2,
  title: "My mom's routine",
  titleEs: "La rutina de mi mamá",
  episodeLabel: { en: "Season 3 · Episode 6", es: "Temporada 3 · Episodio 6" },
  previously: [
    { en: "Vale presented the team routine.", es: "Vale presentó la rutina del equipo." },
    { en: "An angry customer called the office.", es: "Un cliente enojado llamó a la oficina." },
  ],
  reviewWords: [
    { word: "routine", es: "rutina" },
    { word: "wakes up", es: "se despierta" },
    { word: "every day", es: "todos los días" },
    { word: "hard", es: "duro" },
  ],
  blurb: {
    en: "Vale calls her mom. Her mom works all day at home.",
    es: "Vale llama a su mamá. Su mamá trabaja todo el día en casa.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale hace una videollamada desde su cuarto.",
      text: "Every Sunday Vale calls her mom.",
      es: "Todos los domingos Vale llama a su mamá.",
      speaker: "narrator",
      words: [
        { word: "Every Sunday", es: "todos los domingos" },
        { word: "calls", es: "llama" },
        { word: "mom", es: "mamá" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "La mamá de Vale saluda con delantal.",
      text: "Her mom wakes up at five in the morning.",
      es: "Su mamá se despierta a las cinco de la mañana.",
      words: [
        { word: "wakes up", es: "se despierta" },
        { word: "five", es: "cinco" },
        { word: "morning", es: "mañana" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "La mamá prepara desayuno en la cocina.",
      text: "First, she makes breakfast for the family.",
      es: "Primero, prepara el desayuno para la familia.",
      words: [
        { word: "First", es: "primero" },
        { word: "breakfast", es: "desayuno" },
        { word: "family", es: "familia" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "La mamá vende pupusas en su pequeño negocio.",
      text: "Then she sells pupusas in front of the house.",
      es: "Luego vende pupusas frente a la casa.",
      words: [
        { word: "Then", es: "luego" },
        { word: "sells", es: "vende" },
        { word: "house", es: "casa" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "La mamá descansa un momento con café.",
      text: "She does not rest a lot, but she smiles a lot.",
      es: "Ella no descansa mucho, pero sonríe mucho.",
      words: [
        { word: "does not", es: "no" },
        { word: "rest", es: "descansar" },
        { word: "smiles", es: "sonríe" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale escucha con cariño en la pantalla.",
      text: "Vale asks: \"Why do you work so much, mom?\"",
      es: "Vale pregunta: «¿Por qué trabajas tanto, mamá?»",
      speaker: "vale",
      words: [
        { word: "Why", es: "por qué" },
        { word: "so much", es: "tanto" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "La mamá responde con orgullo.",
      text: "Her mom answers: \"Because I love my family.\"",
      es: "Su mamá responde: «Porque amo a mi familia.»",
      speaker: "mom",
      words: [
        { word: "answers", es: "responde" },
        { word: "Because", es: "porque" },
        { word: "love", es: "amar" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale toma notas en su cuaderno.",
      text: "Vale says: \"I am going to study English every night. I will help her.\"",
      es: "Vale dice: «Voy a estudiar inglés todas las noches. Yo la voy a ayudar.»",
      speaker: "vale",
      words: [
        { word: "going to", es: "voy a" },
        { word: "study", es: "estudiar" },
        { word: "night", es: "noche" },
        { word: "help", es: "ayudar" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale y su mamá se despiden en la videollamada.",
      text: "Her mom does not speak English, but she understands her daughter's dream.",
      es: "Su mamá no habla inglés, pero entiende el sueño de su hija.",
      words: [
        { word: "speak", es: "hablar" },
        { word: "understands", es: "entiende" },
        { word: "dream", es: "sueño" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Mateo escribe a Vale con ropa deportiva.",
      text: "Then Mateo sends a message: \"Tomorrow you come with me at six.\"",
      es: "Luego Mateo manda un mensaje: «Mañana vienes conmigo a las seis.»",
      speaker: "mateo",
      words: [
        { word: "sends", es: "manda" },
        { word: "message", es: "mensaje" },
        { word: "Tomorrow", es: "mañana" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What does her mom do first?",
      questionEs: "¿Qué hace su mamá primero?",
      options: [
        { label: "She makes breakfast", emoji: "🍳" },
        { label: "She sells shoes", emoji: "👟" },
        { label: "She sleeps", emoji: "😴" },
      ],
      answer: 0,
      sayIt: "She makes breakfast.",
      sayItEs: "Repite: «She makes breakfast.»",
      sayItCheck: { target: "She makes breakfast" },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Why does her mom work so much?",
      questionEs: "¿Por qué su mamá trabaja tanto?",
      options: [
        { label: "Because she loves her family", emoji: "❤️" },
        { label: "Because she likes coffee", emoji: "☕" },
        { label: "Because she is bored", emoji: "🥱" },
      ],
      answer: 0,
      sayIt: "Because I love my family.",
      sayItEs: "Ejemplo: «Because I love my family.»",
      sayItAskEn: "Why do you study English?",
      sayItAskEs: "¿Por qué estudias inglés tú?",
      sayItCheck: {
        target: "Because *",
        altTargets: ["I study English because *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Who wakes up early in your house?",
      questionEs: "¿Quién se despierta temprano en tu casa?",
      options: [
        { label: "My mom", emoji: "👩" },
        { label: "My dad", emoji: "👨" },
        { label: "Me", emoji: "🙋" },
      ],
      answer: 0,
      sayIt: "My mom wakes up early.",
      sayItEs: "Ejemplo: «My mom wakes up early.»",
      sayItAskEn: "Who wakes up early in your house?",
      sayItAskEs: "¿Quién se despierta temprano en tu casa?",
      sayItCheck: {
        target: "* wakes up early",
        altTargets: ["My * wakes up at *", "I wake up early"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I am persistent.",
    es: "Soy persistente.",
  },
  continuePrompt: {
    en: "Talk about your mom or a person you love. What does he or she do every day?",
    es: "Habla de tu mamá o de alguien que amas. ¿Qué hace todos los días?",
  },
  continueWith: [
    "My mom wakes up at…",
    "She works…",
    "She does not…",
    "I love her because…",
  ],
  cliffhanger: {
    en: "Episode 7: Mateo trains at six in the morning. Vale goes with him.",
    es: "Episodio 7: Mateo entrena a las seis de la mañana. Vale va con él.",
  },
};
