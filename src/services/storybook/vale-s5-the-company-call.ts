import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-the-company-call/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-the-company-call/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-the-company-call/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-the-company-call/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-the-company-call/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-the-company-call/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-the-company-call/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-the-company-call/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-the-company-call/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-the-company-call/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-the-company-call/s10.jpg";

/**
 * Season 5 Episode 19 - "The company call".
 * Matches Basic 4 / Mixed Tenses Week 4:
 *   en: "Real Conversation - past, present & future together",
 *   es: "Conversacion real - pasado, presente y futuro juntos"
 */
export const VALE_S5_THE_COMPANY_CALL: StorybookEpisode = {
  id: "vale-s5-the-company-call",
  moduleId: "mixed-tenses",
  week: 4,
  title: "The company call",
  titleEs: "La llamada de la empresa",
  episodeLabel: { en: "Season 5 · Episode 19", es: "Temporada 5 · Episodio 19" },
  reviewWords: [
    { word: "company", es: "empresa" },
    { word: "meeting", es: "reunión" },
    { word: "contract", es: "contrato" }
  ],
  blurb: {
    en: "A company asks Vale for English classes for their team. Her school is ready to grow.",
    es: "Una empresa le pide a Vale clases de inglés para su equipo. Su escuela está lista para crecer.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El teléfono de la escuela suena a las nueve.",
      text: "The school phone rang at nine.",
      es: "El teléfono de la escuela sonó a las nueve.",
      words: [
        { word: "phone", es: "teléfono" },
        { word: "rang", es: "sonó" },
        { word: "nine", es: "nueve" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale contesta con voz profesional.",
      text: "Vale's English School, good morning.",
      es: "«Escuela de inglés de Vale, buenos días».",
      speaker: "vale",
      words: [
        { word: "good morning", es: "buenos días" },
        { word: "school", es: "escuela" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Una gerente llama desde una empresa grande.",
      text: "A manager called from a big company.",
      es: "Una gerente llamó desde una empresa grande.",
      words: [
        { word: "manager", es: "gerente" },
        { word: "company", es: "empresa" },
        { word: "big", es: "grande" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "La gerente explica lo que necesita.",
      text: "We need English classes for thirty people.",
      es: "«Necesitamos clases de inglés para treinta personas».",
      words: [
        { word: "need", es: "necesitamos" },
        { word: "classes", es: "clases" },
        { word: "people", es: "personas" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale escribe rápido en su cuaderno.",
      text: "Vale wrote fast in her notebook.",
      es: "Vale escribió rápido en su cuaderno.",
      speaker: "vale",
      words: [
        { word: "wrote", es: "escribió" },
        { word: "fast", es: "rápido" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale hace preguntas antes de dar un precio.",
      text: "When do you want to start? Vale asked.",
      es: "«¿Cuándo quieren empezar?», preguntó Vale.",
      speaker: "vale",
      words: [
        { word: "when", es: "cuándo" },
        { word: "start", es: "empezar" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale y Camila revisan los horarios juntas.",
      text: "Vale and Camila checked the schedules together.",
      es: "Vale y Camila revisaron los horarios juntas.",
      speaker: "camila",
      words: [
        { word: "checked", es: "revisaron" },
        { word: "schedules", es: "horarios" },
        { word: "together", es: "juntas" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale prepara una propuesta simple y clara.",
      text: "She prepared a clear, simple proposal.",
      es: "Ella preparó una propuesta clara y simple.",
      speaker: "vale",
      words: [
        { word: "prepared", es: "preparó" },
        { word: "clear", es: "clara" },
        { word: "proposal", es: "propuesta" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale se prepara para la reunión del lunes.",
      text: "The meeting is going to be on Monday.",
      es: "«La reunión va a ser el lunes».",
      speaker: "vale",
      words: [
        { word: "meeting", es: "reunión" },
        { word: "Monday", es: "lunes" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale mira su escuela llena de estudiantes.",
      text: "Two years ago I had zero students. Now I have forty.",
      es: "«Hace dos años tenía cero estudiantes. Ahora tengo cuarenta».",
      speaker: "vale",
      words: [
        { word: "years ago", es: "hace años" },
        { word: "zero", es: "cero" },
        { word: "now", es: "ahora" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "How many people need classes?",
      questionEs: "¿Cuántas personas necesitan clases?",
      options: [
        { label: "Thirty", emoji: "3️⃣0️⃣" },
        { label: "Three", emoji: "3️⃣" },
        { label: "Three hundred", emoji: "💯" }
      ],
      answer: 0,
      sayIt: "Thirty people need classes.",
      sayItEs: "Ejemplo: «Thirty people need classes.»",
      sayItAskEn: "How many people do you speak English with?",
      sayItAskEs: "¿Con cuántas personas hablas inglés?",
      sayItCheck: { target: "I speak English with *",
        altTargets: ["with *", "about *"] },
    }
,
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What did Vale ask the manager?",
      questionEs: "¿Qué le preguntó Vale a la gerente?",
      options: [
        { label: "When do you want to start?", emoji: "📅" },
        { label: "Where do you live?", emoji: "🏠" },
        { label: "Do you like coffee?", emoji: "☕" }
      ],
      answer: 0,
      sayIt: "When do you want to start?",
      sayItEs: "Ejemplo: «When do you want to start?»",
      sayItAskEn: "When are you going to start your next goal?",
      sayItAskEs: "¿Cuándo vas a empezar tu próxima meta?",
      sayItCheck: { target: "I am going to start *",
        altTargets: ["I'm going to start *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "How many students does Vale have now?",
      questionEs: "¿Cuántos estudiantes tiene Vale ahora?",
      options: [
        { label: "Forty", emoji: "4️⃣0️⃣" },
        { label: "Zero", emoji: "0️⃣" },
        { label: "Four", emoji: "4️⃣" }
      ],
      answer: 0,
      sayIt: "Now she has forty students.",
      sayItEs: "Ejemplo: «Now she has forty students.»",
      sayItAskEn: "What did you have two years ago, and what do you have now?",
      sayItAskEs: "¿Qué tenías hace dos años y qué tienes ahora?",
      sayItCheck: { target: "Two years ago I *",
        altTargets: ["before I *", "now I have *"] },
    }

  ],
  habitCard: {
    afterScene: "s9",
    phrase: "I prepare before I speak. Preparation turns a chance into a contract.",
    es: "Me preparo antes de hablar. La preparación convierte una oportunidad en un contrato.",
    model: "vale",
    modelActionEs: "Vale escribe su propuesta y practica la reunión en voz alta el día anterior.",
  },
  continuePrompt: {
    en: "Tell us about opportunities. What opportunity did you get before? What do you prepare every week? What are you going to prepare next?",
    es: "Cuéntanos de oportunidades. ¿Qué oportunidad tuviste antes? ¿Qué preparas cada semana? ¿Qué vas a preparar después?",
  },
  continueWith: [
    "Before I got ...",
    "Every week I prepare ...",
    "Next I am going to prepare ..."
  ],
  cliffhanger: {
    en: "Episode 20: The last class of the season. What is Vale's promise?",
    es: "Episodio 20: La última clase de la temporada. ¿Cuál es la promesa de Vale?",
  },
};
