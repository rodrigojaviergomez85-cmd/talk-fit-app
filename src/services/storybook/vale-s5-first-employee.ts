import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-first-employee/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-first-employee/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-first-employee/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-first-employee/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-first-employee/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-first-employee/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-first-employee/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-first-employee/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-first-employee/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-first-employee/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-first-employee/s10.jpg";

/**
 * Season 5 Episode 18 - "The first employee".
 * Matches Basic 4 / Mixed Tenses Week 4:
 *   en: "Real Conversation - past, present & future together",
 *   es: "Conversacion real - pasado, presente y futuro juntos"
 */
export const VALE_S5_FIRST_EMPLOYEE: StorybookEpisode = {
  id: "vale-s5-first-employee",
  moduleId: "mixed-tenses",
  week: 4,
  title: "The first employee",
  titleEs: "La primera empleada",
  episodeLabel: { en: "Season 5 · Episode 18", es: "Temporada 5 · Episodio 18" },
  reviewWords: [
    { word: "hire", es: "contratar" },
    { word: "grow", es: "crecer" },
    { word: "team", es: "equipo" }
  ],
  blurb: {
    en: "The school grows. Vale hires Camila as her first teacher.",
    es: "La escuela crece. Vale contrata a Camila como su primera maestra.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "La lista de estudiantes ya no cabe en una hoja.",
      text: "The student list did not fit on one page.",
      es: "La lista de estudiantes ya no cabía en una hoja.",
      words: [
        { word: "list", es: "lista" },
        { word: "fit", es: "caber" },
        { word: "page", es: "hoja" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale enseña cinco clases seguidas.",
      text: "Vale taught five classes in one day.",
      es: "Vale dio cinco clases en un día.",
      speaker: "vale",
      words: [
        { word: "taught", es: "dio" },
        { word: "classes", es: "clases" },
        { word: "day", es: "día" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale se sienta agotada al final del día.",
      text: "At night she was completely tired.",
      es: "En la noche estaba completamente cansada.",
      words: [
        { word: "night", es: "noche" },
        { word: "completely", es: "completamente" },
        { word: "tired", es: "cansada" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Camila le escribe un mensaje.",
      text: "Camila sent a message. Do you need help?",
      es: "Camila mandó un mensaje. «¿Necesitas ayuda?».",
      speaker: "camila",
      words: [
        { word: "sent", es: "mandó" },
        { word: "message", es: "mensaje" },
        { word: "help", es: "ayuda" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale la invita a la escuela al día siguiente.",
      text: "Vale invited her to the school the next day.",
      es: "Vale la invitó a la escuela al día siguiente.",
      speaker: "vale",
      words: [
        { word: "invited", es: "invitó" },
        { word: "next day", es: "al día siguiente" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila da una clase de prueba.",
      text: "Camila taught a practice class.",
      es: "Camila dio una clase de prueba.",
      speaker: "camila",
      words: [
        { word: "taught", es: "dio" },
        { word: "practice class", es: "clase de prueba" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Los estudiantes aplauden al final.",
      text: "The students clapped at the end.",
      es: "Los estudiantes aplaudieron al final.",
      words: [
        { word: "clapped", es: "aplaudieron" },
        { word: "end", es: "final" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale le ofrece el trabajo.",
      text: "Do you want to work with me? Vale asked.",
      es: "«¿Quieres trabajar conmigo?», preguntó Vale.",
      speaker: "vale",
      words: [
        { word: "work", es: "trabajar" },
        { word: "with me", es: "conmigo" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Camila acepta emocionada.",
      text: "Yes! I am going to be a teacher!",
      es: "«¡Sí! ¡Voy a ser maestra!».",
      speaker: "camila",
      words: [
        { word: "teacher", es: "maestra" },
        { word: "going to", es: "voy a" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale y Camila cuelgan dos horarios en la pared.",
      text: "One person builds. A team grows, Vale said.",
      es: "«Una persona construye. Un equipo crece», dijo Vale.",
      speaker: "vale",
      words: [
        { word: "person", es: "persona" },
        { word: "builds", es: "construye" },
        { word: "team", es: "equipo" },
        { word: "grows", es: "crece" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "How many classes did Vale teach in one day?",
      questionEs: "¿Cuántas clases dio Vale en un día?",
      options: [
        { label: "Five", emoji: "5️⃣" },
        { label: "One", emoji: "1️⃣" },
        { label: "Ten", emoji: "🔟" }
      ],
      answer: 0,
      sayIt: "She taught five classes in one day.",
      sayItEs: "Ejemplo: «She taught five classes in one day.»",
      sayItAskEn: "What did you do yesterday that was hard work?",
      sayItAskEs: "¿Qué hiciste ayer que fue trabajo duro?",
      sayItCheck: { target: "I *",
        altTargets: ["yesterday I *"] },
    }
,
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "What did Vale ask Camila?",
      questionEs: "¿Qué le preguntó Vale a Camila?",
      options: [
        { label: "Do you want to work with me?", emoji: "🤝" },
        { label: "Do you want coffee?", emoji: "☕" },
        { label: "Where do you live?", emoji: "🏠" }
      ],
      answer: 0,
      sayIt: "Do you want to work with me?",
      sayItEs: "Ejemplo: «Do you want to work with me?»",
      sayItAskEn: "Who do you want to work with in the future?",
      sayItAskEs: "¿Con quién quieres trabajar en el futuro?",
      sayItCheck: { target: "I want to work with *",
        altTargets: ["I want to work *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What did Vale say about a team?",
      questionEs: "¿Qué dijo Vale sobre un equipo?",
      options: [
        { label: "A team grows", emoji: "🌱" },
        { label: "A team sleeps", emoji: "😴" },
        { label: "A team stops", emoji: "🛑" }
      ],
      answer: 0,
      sayIt: "One person builds. A team grows.",
      sayItEs: "Ejemplo: «One person builds. A team grows.»",
      sayItAskEn: "What are you going to build with other people?",
      sayItAskEs: "¿Qué vas a construir con otras personas?",
      sayItCheck: { target: "I am going to build *",
        altTargets: ["I'm going to build *"] },
    }

  ],
  habitCard: {
    afterScene: "s10",
    phrase: "I do not carry everything alone. I build a team and I rest.",
    es: "No cargo todo sola. Construyo un equipo y descanso.",
    model: "vale",
    modelActionEs: "Vale reparte su horario con Camila y toma un día libre.",
  },
  continuePrompt: {
    en: "Tell us about teamwork. Who did you work with last year? Who do you work with every day? Who are you going to work with next?",
    es: "Cuéntanos del trabajo en equipo. ¿Con quién trabajaste el año pasado? ¿Con quién trabajas cada día? ¿Con quién vas a trabajar después?",
  },
  continueWith: [
    "Last year I worked with ...",
    "Every day I work with ...",
    "Next I am going to work with ..."
  ],
  cliffhanger: {
    en: "Episode 19: A company calls the school. What do they want?",
    es: "Episodio 19: Una empresa llama a la escuela. ¿Qué quieren?",
  },
};
