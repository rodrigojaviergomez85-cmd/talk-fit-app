import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-knock-on-the-door/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-knock-on-the-door/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-knock-on-the-door/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-knock-on-the-door/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-knock-on-the-door/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-knock-on-the-door/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-knock-on-the-door/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-knock-on-the-door/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-knock-on-the-door/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-knock-on-the-door/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-knock-on-the-door/s10.jpg";

/**
 * Season 5 Episode 15 - "A knock on the door".
 * Matches Basic 4 / Mixed Tenses Week 3:
 *   en: "Ask Questions - yes/no + WH across time",
 *   es: "Haz preguntas - si/no + WH en todos los tiempos"
 */
export const VALE_S5_KNOCK_ON_THE_DOOR: StorybookEpisode = {
  id: "vale-s5-knock-on-the-door",
  moduleId: "mixed-tenses",
  week: 3,
  title: "A knock on the door",
  titleEs: "Un toque en la puerta",
  episodeLabel: { en: "Season 5 · Episode 15", es: "Temporada 5 · Episodio 15" },
  reviewWords: [
    { word: "knock", es: "tocar" },
    { word: "scholarship", es: "beca" },
    { word: "trust", es: "confiar" }
  ],
  blurb: {
    en: "A mother asks Vale for a scholarship for her son. Vale trusts and says yes.",
    es: "Una madre le pide a Vale una beca para su hijo. Vale confía y dice que sí.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Alguien toca la puerta de la escuela.",
      text: "Somebody knocked on the school door.",
      es: "Alguien tocó la puerta de la escuela.",
      words: [
        { word: "knocked", es: "tocó" },
        { word: "door", es: "puerta" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Una mujer y un niño esperan afuera.",
      text: "A woman and a boy were waiting outside.",
      es: "Una mujer y un niño esperaban afuera.",
      words: [
        { word: "woman", es: "mujer" },
        { word: "boy", es: "niño" },
        { word: "waiting", es: "esperando" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale los invita a pasar.",
      text: "Come in, please, Vale said.",
      es: "«Pasen, por favor», dijo Vale.",
      speaker: "vale",
      words: [
        { word: "come in", es: "pasen" },
        { word: "please", es: "por favor" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "La mujer explica su situación con nervios.",
      text: "Can my son study here? I cannot pay now.",
      es: "«¿Puede estudiar mi hijo aquí? No puedo pagar ahora».",
      words: [
        { word: "son", es: "hijo" },
        { word: "study", es: "estudiar" },
        { word: "pay", es: "pagar" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale mira al niño con calma.",
      text: "Vale looked at the boy. Do you want to learn?",
      es: "Vale miró al niño. «¿Quieres aprender?».",
      speaker: "vale",
      words: [
        { word: "want", es: "quieres" },
        { word: "learn", es: "aprender" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "El niño asiente con fuerza.",
      text: "Yes! the boy answered fast.",
      es: "«¡Sí!», respondió el niño rápido.",
      words: [
        { word: "answered", es: "respondió" },
        { word: "fast", es: "rápido" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale recuerda su primer día en el call center.",
      text: "Vale remembered her own first day years ago.",
      es: "Vale recordó su propio primer día hace años.",
      speaker: "vale",
      words: [
        { word: "remembered", es: "recordó" },
        { word: "own", es: "propio" },
        { word: "years ago", es: "hace años" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale escribe el nombre del niño en la lista.",
      text: "She wrote his name on the list.",
      es: "Escribió su nombre en la lista.",
      speaker: "vale",
      words: [
        { word: "name", es: "nombre" },
        { word: "list", es: "lista" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale le da un cuaderno nuevo al niño.",
      text: "Your first scholarship starts today.",
      es: "«Tu primera beca empieza hoy».",
      speaker: "vale",
      words: [
        { word: "scholarship", es: "beca" },
        { word: "starts", es: "empieza" },
        { word: "today", es: "hoy" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "La madre agradece con lágrimas en los ojos.",
      text: "Thank you. God bless your school, she said.",
      es: "«Gracias. Que su escuela sea bendecida», dijo ella.",
      words: [
        { word: "thank you", es: "gracias" },
        { word: "bless", es: "bendecir" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What did the woman ask?",
      questionEs: "¿Qué preguntó la mujer?",
      options: [
        { label: "Can my son study here?", emoji: "🙏" },
        { label: "Where is the bus?", emoji: "🚌" },
        { label: "Do you sell food?", emoji: "🍽️" }
      ],
      answer: 0,
      sayIt: "Can my son study here?",
      sayItEs: "Ejemplo: «Can my son study here?»",
      sayItAskEn: "Who helped you when you needed it?",
      sayItAskEs: "¿Quién te ayudó cuando lo necesitabas?",
      sayItCheck: { target: "* helped me",
        altTargets: ["my * helped me"] },
    }
,
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What did Vale remember?",
      questionEs: "¿Qué recordó Vale?",
      options: [
        { label: "Her own first day", emoji: "🕰️" },
        { label: "A movie", emoji: "🎬" },
        { label: "Her phone number", emoji: "📞" }
      ],
      answer: 0,
      sayIt: "She remembered her own first day.",
      sayItEs: "Ejemplo: «She remembered her own first day.»",
      sayItAskEn: "What do you remember about your first English class?",
      sayItAskEs: "¿Qué recuerdas de tu primera clase de inglés?",
      sayItCheck: { target: "I remember *",
        altTargets: ["I remember that *"] },
    }
,
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What did Vale give the boy?",
      questionEs: "¿Qué le dio Vale al niño?",
      options: [
        { label: "A scholarship", emoji: "🎓" },
        { label: "A phone", emoji: "📱" },
        { label: "A bicycle", emoji: "🚲" }
      ],
      answer: 0,
      sayIt: "She gave him a scholarship.",
      sayItEs: "Ejemplo: «She gave him a scholarship.»",
      sayItAskEn: "Who are you going to help this month?",
      sayItAskEs: "¿A quién vas a ayudar este mes?",
      sayItCheck: { target: "I am going to help *",
        altTargets: ["I'm going to help *"] },
    }

  ],
  habitCard: {
    afterScene: "s10",
    phrase: "I give what I received. Helping one person changes two lives.",
    es: "Doy lo que recibí. Ayudar a una persona cambia dos vidas.",
    model: "vale",
    modelActionEs: "Vale abre un cupo de beca aunque el mes está difícil.",
  },
  continuePrompt: {
    en: "Tell us about help. Who helped you before? Who do you help every week? Who are you going to help next?",
    es: "Cuéntanos de la ayuda. ¿Quién te ayudó antes? ¿A quién ayudas cada semana? ¿A quién vas a ayudar después?",
  },
  continueWith: [
    "Before, ... helped me",
    "Every week I help ...",
    "Next, I am going to help ..."
  ],
  cliffhanger: {
    en: "Episode 16: Vale's first student has a big interview. Is he ready?",
    es: "Episodio 16: El primer estudiante de Vale tiene una entrevista grande. ¿Está listo?",
  },
};
