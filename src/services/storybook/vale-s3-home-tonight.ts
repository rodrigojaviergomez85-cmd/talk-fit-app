import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s3-ep19/cover.jpg";
import s1 from "@/assets/storybook/vale-s3-ep19/s1.jpg";
import s2 from "@/assets/storybook/vale-s3-ep19/s2.jpg";
import s3 from "@/assets/storybook/vale-s3-ep19/s3.jpg";
import s4 from "@/assets/storybook/vale-s3-ep19/s4.jpg";
import s5 from "@/assets/storybook/vale-s3-ep19/s5.jpg";
import s6 from "@/assets/storybook/vale-s3-ep19/s6.jpg";
import s7 from "@/assets/storybook/vale-s3-ep19/s7.jpg";
import s8 from "@/assets/storybook/vale-s3-ep19/s8.jpg";
import s9 from "@/assets/storybook/vale-s3-ep19/s9.jpg";
import s10 from "@/assets/storybook/vale-s3-ep19/s10.jpg";

/**
 * Season 3 · Episode 19 — "At home tonight".
 * Basic 2 / Simple Present Week 4 Day 19: present progressive at home + discipline.
 */
export const VALE_S3_HOME_TONIGHT: StorybookEpisode = {
  id: "vale-s3-home-tonight",
  moduleId: "simple-present",
  week: 4,
  title: "At home tonight",
  titleEs: "En casa esta noche",
  episodeLabel: { en: "Season 3 · Episode 19", es: "Temporada 3 · Episodio 19" },
  previously: [
    { en: "Vale stayed calm with a very difficult customer.", es: "Vale se mantuvo tranquila con un cliente muy difícil." },
    { en: "Mr. Reyes called her a leader.", es: "Mr. Reyes la llamó una líder." },
  ],
  reviewWords: [
    { word: "calm", es: "tranquila" },
    { word: "leader", es: "líder" },
    { word: "studying", es: "estudiando" },
  ],
  blurb: {
    en: "Everybody is doing something at home. Vale is studying — and there is a surprise.",
    es: "Todos están haciendo algo en casa. Vale está estudiando… y hay una sorpresa.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "La casa de Vale por la noche, luz cálida.",
      text: "Eight o'clock at night. The house is alive. Everybody is doing something.",
      es: "Ocho de la noche. La casa está viva. Todos están haciendo algo.",
      speaker: "narrator",
      words: [
        { word: "night", es: "noche" },
        { word: "house", es: "casa" },
        { word: "something", es: "algo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "La mamá de Vale cocina en la cocina.",
      text: "Her mom is cooking beans. The kitchen smells amazing.",
      es: "Su mamá está cocinando frijoles. La cocina huele increíble.",
      speaker: "narrator",
      words: [
        { word: "cooking", es: "cocinando" },
        { word: "kitchen", es: "cocina" },
        { word: "smells", es: "huele" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "El hermano pequeño ve la tele en la sala.",
      text: "Her little brother is watching TV. He is not doing homework.",
      es: "Su hermanito está viendo la tele. No está haciendo la tarea.",
      speaker: "narrator",
      words: [
        { word: "brother", es: "hermano" },
        { word: "watching", es: "viendo" },
        { word: "homework", es: "tarea" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale estudia en la mesa con su cuaderno.",
      text: "Vale is studying at the table. She is repeating her sentences out loud.",
      es: "Vale está estudiando en la mesa. Está repitiendo sus oraciones en voz alta.",
      speaker: "narrator",
      words: [
        { word: "table", es: "mesa" },
        { word: "repeating", es: "repitiendo" },
        { word: "out loud", es: "en voz alta" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale se ve cansada frente al cuaderno.",
      text: "She is tired. Her eyes are closing. She wants to stop.",
      es: "Está cansada. Sus ojos se están cerrando. Quiere parar.",
      speaker: "narrator",
      words: [
        { word: "tired", es: "cansada" },
        { word: "eyes", es: "ojos" },
        { word: "stop", es: "parar" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale se mira al espejo y sonríe.",
      text: "Vale looks in the mirror and says: \"English is easy. I am persistent.\"",
      es: "Vale se mira al espejo y dice: «El inglés es fácil. Soy persistente.»",
      speaker: "vale",
      words: [
        { word: "mirror", es: "espejo" },
        { word: "easy", es: "fácil" },
        { word: "persistent", es: "persistente" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale practica diez minutos más con el teléfono.",
      text: "Ten more minutes. She is practicing every day, not only on good days.",
      es: "Diez minutos más. Está practicando todos los días, no solo los días buenos.",
      speaker: "narrator",
      words: [
        { word: "minutes", es: "minutos" },
        { word: "practicing", es: "practicando" },
        { word: "only", es: "solo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "La mamá entra con un pequeño regalo envuelto.",
      text: "Her mom comes in with a small gift. \"This is for my teacher,\" she says.",
      es: "Su mamá entra con un regalito. «Esto es para mi maestra», dice.",
      speaker: "mom",
      words: [
        { word: "gift", es: "regalo" },
        { word: "small", es: "pequeño" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale abre el regalo: un cuaderno nuevo.",
      text: "It is a new notebook. On the first page: \"Teacher Vale\".",
      es: "Es un cuaderno nuevo. En la primera página: «Teacher Vale».",
      speaker: "narrator",
      words: [
        { word: "notebook", es: "cuaderno" },
        { word: "page", es: "página" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale abraza a su mamá emocionada.",
      text: "Vale hugs her mom. Tomorrow she is teaching her first demo class.",
      es: "Vale abraza a su mamá. Mañana está dando su primera clase demo.",
      speaker: "narrator",
      words: [
        { word: "hugs", es: "abraza" },
        { word: "Tomorrow", es: "mañana" },
        { word: "teaching", es: "enseñando" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What is her mom doing?",
      questionEs: "¿Qué está haciendo su mamá?",
      options: [
        { label: "She is cooking", emoji: "🍲" },
        { label: "She is watching TV", emoji: "📺" },
        { label: "She is studying", emoji: "📘" },
      ],
      answer: 0,
      sayIt: "She is cooking.",
      sayItEs: "Repite: «She is cooking.»",
      sayItCheck: { target: "She is cooking" },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What do you do at home every night?",
      questionEs: "¿Qué haces en casa cada noche?",
      options: [
        { label: "I study English", emoji: "📘" },
        { label: "I cook dinner", emoji: "🍳" },
        { label: "I rest with my family", emoji: "🛋️" },
      ],
      answer: 0,
      sayIt: "I study English every night.",
      sayItEs: "Ejemplo: «I study English every night.»",
      sayItAskEn: "What do you do at home every night?",
      sayItAskEs: "¿Qué haces en casa cada noche?",
      sayItCheck: {
        target: "I * every night",
        altTargets: ["I *", "Every night I *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "Who supports you when you are tired?",
      questionEs: "¿Quién te apoya cuando estás cansado?",
      options: [
        { label: "My mom supports me", emoji: "👩" },
        { label: "My friends support me", emoji: "🧑‍🤝‍🧑" },
        { label: "My family supports me", emoji: "👨‍👩‍👧" },
      ],
      answer: 0,
      sayIt: "My mom supports me.",
      sayItEs: "Ejemplo: «My mom supports me.»",
      sayItAskEn: "Who supports you when you are tired?",
      sayItAskEs: "¿Quién te apoya cuando estás cansado?",
      sayItCheck: {
        target: "* supports me",
        altTargets: ["My * supports me", "My * support me"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "English is easy. I am persistent.",
    es: "El inglés es fácil. Soy persistente.",
  },
  continuePrompt: {
    en: "Describe your home right now. Who is cooking, watching TV or studying?",
    es: "Describe tu casa ahora mismo. ¿Quién está cocinando, viendo tele o estudiando?",
  },
  continueWith: ["My mom is…", "My brother is…", "They are…", "I am…"],
  cliffhanger: {
    en: "Episode 20: The airport and Vale's first demo class. The season ends big.",
    es: "Episodio 20: El aeropuerto y la primera clase demo de Vale. La temporada cierra en grande.",
  },
};
