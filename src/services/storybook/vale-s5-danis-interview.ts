import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-danis-interview/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-danis-interview/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-danis-interview/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-danis-interview/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-danis-interview/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-danis-interview/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-danis-interview/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-danis-interview/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-danis-interview/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-danis-interview/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-danis-interview/s10.jpg";

/**
 * Season 5 Episode 16 - "Dani's interview".
 * Matches Basic 4 / Mixed Tenses Week 4:
 *   en: "Real Conversation - past, present & future together",
 *   es: "Conversacion real - pasado, presente y futuro juntos"
 */
export const VALE_S5_DANIS_INTERVIEW: StorybookEpisode = {
  id: "vale-s5-danis-interview",
  moduleId: "mixed-tenses",
  week: 4,
  title: "Dani's interview",
  titleEs: "La entrevista de Dani",
  episodeLabel: { en: "Season 5 · Episode 16", es: "Temporada 5 · Episodio 16" },
  reviewWords: [
    { word: "interview", es: "entrevista" },
    { word: "ready", es: "listo" },
    { word: "believe", es: "creer" }
  ],
  blurb: {
    en: "Dani has his first English interview. Vale prepares him and he believes in himself.",
    es: "Dani tiene su primera entrevista en inglés. Vale lo prepara y él cree en sí mismo.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Dani llega temprano con camisa planchada.",
      text: "Dani arrived early with a clean shirt.",
      es: "Dani llegó temprano con una camisa limpia.",
      words: [
        { word: "arrived", es: "llegó" },
        { word: "early", es: "temprano" },
        { word: "shirt", es: "camisa" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani tiembla un poco con su currículum.",
      text: "His hands were shaking. I am nervous.",
      es: "Le temblaban las manos. «Estoy nervioso».",
      speaker: "dani",
      words: [
        { word: "hands", es: "manos" },
        { word: "shaking", es: "temblando" },
        { word: "nervous", es: "nervioso" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale se sienta frente a él como entrevistadora.",
      text: "Vale sat in front of him like an interviewer.",
      es: "Vale se sentó frente a él como entrevistadora.",
      speaker: "vale",
      words: [
        { word: "in front of", es: "frente a" },
        { word: "interviewer", es: "entrevistadora" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale hace la primera pregunta.",
      text: "Tell me about yourself, Vale said.",
      es: "«Háblame de ti», dijo Vale.",
      speaker: "vale",
      words: [
        { word: "tell", es: "habla" },
        { word: "yourself", es: "de ti" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani responde con voz temblorosa.",
      text: "My name is Dani. I study English every day.",
      es: "«Me llamo Dani. Estudio inglés todos los días».",
      speaker: "dani",
      words: [
        { word: "name", es: "nombre" },
        { word: "study", es: "estudio" },
        { word: "every day", es: "todos los días" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale asiente y hace otra pregunta.",
      text: "What did you do in your last job?",
      es: "«¿Qué hiciste en tu último trabajo?».",
      speaker: "vale",
      words: [
        { word: "did", es: "hiciste" },
        { word: "last job", es: "último trabajo" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani responde con más seguridad.",
      text: "I helped customers and I solved problems.",
      es: "«Ayudé a los clientes y resolví problemas».",
      speaker: "dani",
      words: [
        { word: "helped", es: "ayudé" },
        { word: "customers", es: "clientes" },
        { word: "solved", es: "resolví" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale sonríe y aplaude suave.",
      text: "Vale smiled. That was a strong answer.",
      es: "Vale sonrió. «Esa fue una respuesta fuerte».",
      speaker: "vale",
      words: [
        { word: "strong", es: "fuerte" },
        { word: "answer", es: "respuesta" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Dani respira hondo frente al espejo.",
      text: "Dani looked in the mirror and breathed.",
      es: "Dani se miró al espejo y respiró.",
      words: [
        { word: "mirror", es: "espejo" },
        { word: "breathed", es: "respiró" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Dani sale hacia la entrevista con la frente en alto.",
      text: "I am ready. I believe in myself, he said.",
      es: "«Estoy listo. Creo en mí», dijo él.",
      speaker: "dani",
      words: [
        { word: "ready", es: "listo" },
        { word: "believe", es: "creo" },
        { word: "myself", es: "mí mismo" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What did Dani say first?",
      questionEs: "¿Qué dijo Dani primero?",
      options: [
        { label: "My name is Dani", emoji: "🙋" },
        { label: "Goodbye", emoji: "👋" },
        { label: "I am hungry", emoji: "🍽️" }
      ],
      answer: 0,
      sayIt: "My name is Dani. I study English every day.",
      sayItEs: "Ejemplo: «My name is Dani. I study English every day.»",
      sayItAskEn: "Tell us about yourself in English.",
      sayItAskEs: "Háblanos de ti en inglés.",
      sayItCheck: { target: "My name is *",
        altTargets: ["I am *", "I'm *"] },
    }
,
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What did Dani do in his last job?",
      questionEs: "¿Qué hizo Dani en su último trabajo?",
      options: [
        { label: "He helped customers", emoji: "🎧" },
        { label: "He drove a bus", emoji: "🚌" },
        { label: "He painted houses", emoji: "🎨" }
      ],
      answer: 0,
      sayIt: "He helped customers and solved problems.",
      sayItEs: "Ejemplo: «He helped customers and solved problems.»",
      sayItAskEn: "What did you do in your last job or school?",
      sayItAskEs: "¿Qué hiciste en tu último trabajo o escuela?",
      sayItCheck: { target: "I *",
        altTargets: ["in my last job I *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What did Dani say before leaving?",
      questionEs: "¿Qué dijo Dani antes de salir?",
      options: [
        { label: "I believe in myself", emoji: "💪" },
        { label: "I am tired", emoji: "😴" },
        { label: "I will not go", emoji: "🚫" }
      ],
      answer: 0,
      sayIt: "I am ready. I believe in myself.",
      sayItEs: "Ejemplo: «I am ready. I believe in myself.»",
      sayItAskEn: "What are you going to say before your next challenge?",
      sayItAskEs: "¿Qué vas a decir antes de tu próximo reto?",
      sayItCheck: { target: "I am going to say *",
        altTargets: ["I'm going to say *", "I believe *"] },
    }

  ],
  habitCard: {
    afterScene: "s9",
    phrase: "Before something hard, I breathe and I say: I am ready. I believe in myself.",
    es: "Antes de algo difícil, respiro y digo: estoy listo. Creo en mí.",
    model: "dani",
    modelActionEs: "Dani respira hondo frente al espejo y repite su frase antes de entrar.",
  },
  continuePrompt: {
    en: "Tell us your story. What did you do last year? What do you do every day? What are you going to do next year?",
    es: "Cuéntanos tu historia. ¿Qué hiciste el año pasado? ¿Qué haces cada día? ¿Qué vas a hacer el próximo año?",
  },
  continueWith: [
    "Last year I ...",
    "Every day I ...",
    "Next year I am going to ..."
  ],
  cliffhanger: {
    en: "Episode 17: Dani did not get the job. What will Vale tell him?",
    es: "Episodio 17: Dani no consiguió el trabajo. ¿Qué le dirá Vale?",
  },
};
