import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-first-students/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-first-students/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-first-students/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-first-students/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-first-students/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-first-students/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-first-students/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-first-students/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-first-students/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-first-students/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-first-students/s10.jpg";

/**
 * Season 5 Episode 1 - "The first students".
 * Matches Basic 4 / Mixed Tenses Week 1:
 *   en: "Yesterday & Tomorrow - past + future",
 *   es: "Ayer y manana - pasado + futuro"
 */
export const VALE_S5_FIRST_STUDENTS: StorybookEpisode = {
  id: "vale-s5-first-students",
  moduleId: "mixed-tenses",
  week: 1,
  title: "The first students",
  titleEs: "Los primeros estudiantes",
  episodeLabel: { en: "Season 5 · Episode 1", es: "Temporada 5 · Episodio 1" },
  reviewWords: [
    { word: "opened", es: "abrió" },
    { word: "school", es: "escuela" },
    { word: "students", es: "estudiantes" }
  ],
  blurb: {
    en: "Vale opens her English school. Her first students arrive, and she needs to rest for tomorrow.",
    es: "Vale abre su escuela de inglés. Llegan sus primeros estudiantes, y necesita descansar para mañana.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale frente a un pequeño edificio blanco.",
      text: "Vale stood in front of a small white building.",
      speaker: "vale",
      words: [
        { word: "stood", es: "estuvo" },
        { word: "building", es: "edificio" },
        { word: "small", es: "pequeño" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale mira un letrero con el nombre de la escuela.",
      text: "She looked at a sign that said Vale's English School.",
      speaker: "vale",
      words: [
        { word: "looked", es: "miró" },
        { word: "sign", es: "letrero" },
        { word: "said", es: "decía" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Dos adolescentes caminan hacia la puerta.",
      text: "Two teenagers walked toward the door.",
      words: [
        { word: "teenagers", es: "adolescentes" },
        { word: "door", es: "puerta" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale saluda a los estudiantes con una sonrisa.",
      text: "Good morning! Welcome to my school, Vale said.",
      speaker: "vale",
      words: [
        { word: "welcome", es: "bienvenidos" },
        { word: "school", es: "escuela" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Los estudiantes sonríen y saludan a Vale.",
      text: "The students smiled. Good morning, teacher!",
      words: [
        { word: "students", es: "estudiantes" },
        { word: "smiled", es: "sonrieron" },
        { word: "teacher", es: "maestra" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale reparte cuadernos y lápices.",
      text: "Vale gave them notebooks and pencils.",
      speaker: "vale",
      words: [
        { word: "gave", es: "les dio" },
        { word: "notebooks", es: "cuadernos" },
        { word: "pencils", es: "lápices" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale escribe la primera lección en el pizarrón.",
      text: "She wrote the first lesson on the board.",
      speaker: "vale",
      words: [
        { word: "wrote", es: "escribió" },
        { word: "first", es: "primera" },
        { word: "lesson", es: "lección" },
        { word: "board", es: "pizarrón" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Los estudiantes copian cada palabra.",
      text: "The students copied every word.",
      words: [
        { word: "copied", es: "copiaron" },
        { word: "every", es: "cada" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale se siente feliz pero cansada al final de la clase.",
      text: "At the end of class, Vale felt happy but tired.",
      speaker: "vale",
      words: [
        { word: "end", es: "final" },
        { word: "felt", es: "se sintió" },
        { word: "tired", es: "cansada" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale mira el reloj y decide dormir temprano.",
      text: "She looked at the clock. I need to sleep early tonight.",
      speaker: "vale",
      words: [
        { word: "clock", es: "reloj" },
        { word: "need", es: "necesito" },
        { word: "sleep", es: "dormir" },
        { word: "early", es: "temprano" },
        { word: "tonight", es: "esta noche" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What did Vale say to the students?",
      questionEs: "¿Qué les dijo Vale a los estudiantes?",
      options: [
        { label: "Good morning! Welcome to my school", emoji: "☀️" },
        { label: "Good night", emoji: "🌙" },
        { label: "Goodbye", emoji: "👋" }
      ],
      answer: 0,
      sayIt: "Good morning! Welcome to my school.",
      sayItEs: "Ejemplo: «Good morning! Welcome to my school.»",
      sayItAskEn: "What do you say in the morning?",
      sayItAskEs: "¿Qué dices tú en la mañana?",
      sayItCheck: { target: "good morning*",
        altTargets: ["welcome to my*"] },
    }
,
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What did Vale write on the board?",
      questionEs: "¿Qué escribió Vale en el pizarrón?",
      options: [
        { label: "The first lesson", emoji: "📚" },
        { label: "Her name", emoji: "✍️" },
        { label: "A letter", emoji: "✉️" }
      ],
      answer: 0,
      sayIt: "She wrote the first lesson on the board.",
      sayItEs: "Ejemplo: «She wrote the first lesson on the board.»",
      sayItAskEn: "What did you write yesterday?",
      sayItAskEs: "¿Qué escribiste ayer tú?",
      sayItCheck: { target: "I wrote *",
        altTargets: ["I wrote a *", "yesterday I wrote *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What does Vale need to do tonight?",
      questionEs: "¿Qué necesita hacer Vale esta noche?",
      options: [
        { label: "Sleep early", emoji: "😴" },
        { label: "Run fast", emoji: "🏃" },
        { label: "Eat pizza", emoji: "🍕" }
      ],
      answer: 0,
      sayIt: "She needs to sleep early tonight.",
      sayItEs: "Ejemplo: «She needs to sleep early tonight.»",
      sayItAskEn: "What do you need to do tonight?",
      sayItAskEs: "¿Qué necesitas hacer tú esta noche?",
      sayItCheck: { target: "I need to *",
        altTargets: ["tonight I need to *"] },
    }

  ],
  habitCard: {
    afterScene: "s10",
    phrase: "I go to bed early so I can win tomorrow.",
    es: "Me acuesto temprano para ganar mañana.",
    model: "vale",
    modelActionEs: "Vale guarda su teléfono y decide dormir a las 10:00 p.m.",
  },
  continuePrompt: {
    en: "Now tell us about YOUR day. What did you do yesterday? What do you do every day? What are you going to do tomorrow?",
    es: "Ahora cuéntanos tu día. ¿Qué hiciste ayer? ¿Qué haces todos los días? ¿Qué vas a hacer mañana?",
  },
  continueWith: [
    "Yesterday I ...",
    "Every day I ...",
    "Tomorrow I am going to ..."
  ],
  cliffhanger: {
    en: "Episode 2: Vale is very tired. Will she wake up on time?",
    es: "Episodio 2: Vale está muy cansada. ¿Despertará a tiempo?",
  },
};
