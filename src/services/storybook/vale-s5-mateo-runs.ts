import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-mateo-runs/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-mateo-runs/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-mateo-runs/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-mateo-runs/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-mateo-runs/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-mateo-runs/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-mateo-runs/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-mateo-runs/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-mateo-runs/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-mateo-runs/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-mateo-runs/s10.jpg";

/**
 * Season 5 Episode 6 - "Mateo runs every morning".
 * Matches Basic 4 / Mixed Tenses Week 2:
 *   en: "Everyday Life - present + past",
 *   es: "La vida diaria - presente + pasado"
 */
export const VALE_S5_MATEO_RUNS: StorybookEpisode = {
  id: "vale-s5-mateo-runs",
  moduleId: "mixed-tenses",
  week: 2,
  title: "Mateo runs every morning",
  titleEs: "Mateo corre cada mañana",
  episodeLabel: { en: "Season 5 · Episode 6", es: "Temporada 5 · Episodio 6" },
  reviewWords: [
    { word: "runs", es: "corre" },
    { word: "every", es: "cada" },
    { word: "morning", es: "mañana" }
  ],
  blurb: {
    en: "Mateo runs before work. Vale decides to move her body too.",
    es: "Mateo corre antes del trabajo. Vale decide mover su cuerpo también.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Mateo corre por una calle tranquila al amanecer.",
      text: "Mateo runs every morning before work.",
      es: "Mateo corre cada mañana antes del trabajo.",
      words: [
        { word: "runs", es: "corre" },
        { word: "before", es: "antes de" },
        { word: "work", es: "trabajo" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Mateo saluda a Vale desde la acera.",
      text: "Good morning, teacher! Mateo shouted.",
      es: "«¡Good morning, teacher!», gritó Mateo.",
      speaker: "mateo",
      words: [
        { word: "shouted", es: "gritó" },
        { word: "teacher", es: "maestra" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale abre la puerta de su escuela con una taza de café.",
      text: "Vale opened her school with a cup of coffee.",
      es: "Vale abrió su escuela con una taza de café.",
      speaker: "vale",
      words: [
        { word: "opened", es: "abrió" },
        { word: "cup", es: "taza" },
        { word: "coffee", es: "café" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Mateo se detiene y respira profundo.",
      text: "I ran three kilometers today, he said.",
      es: "«Corrí tres kilómetros hoy», dijo él.",
      speaker: "mateo",
      words: [
        { word: "ran", es: "corrí" },
        { word: "kilometers", es: "kilómetros" },
        { word: "today", es: "hoy" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale se ríe y toca su hombro.",
      text: "Vale laughed. My body needs that too.",
      es: "Vale se rió. «Mi cuerpo también necesita eso».",
      speaker: "vale",
      words: [
        { word: "laughed", es: "se rió" },
        { word: "body", es: "cuerpo" },
        { word: "needs", es: "necesita" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Mateo señala el parque cercano.",
      text: "You can walk in the park every day, he said.",
      es: "«Puedes caminar en el parque cada día», dijo él.",
      speaker: "mateo",
      words: [
        { word: "walk", es: "caminar" },
        { word: "park", es: "parque" },
        { word: "every day", es: "cada día" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale escribe en su cuaderno un plan simple.",
      text: "Vale wrote a simple plan in her notebook.",
      es: "Vale escribió un plan simple en su cuaderno.",
      speaker: "vale",
      words: [
        { word: "wrote", es: "escribió" },
        { word: "simple", es: "simple" },
        { word: "plan", es: "plan" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale camina veinte minutos después de clase.",
      text: "After class, she walked for twenty minutes.",
      es: "Después de clase, ella caminó veinte minutos.",
      words: [
        { word: "after", es: "después de" },
        { word: "walked", es: "caminó" },
        { word: "minutes", es: "minutos" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale sonríe con energía en la puerta de la escuela.",
      text: "She felt stronger and happier.",
      es: "Ella se sintió más fuerte y más feliz.",
      speaker: "vale",
      words: [
        { word: "felt", es: "se sintió" },
        { word: "stronger", es: "más fuerte" },
        { word: "happier", es: "más feliz" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale y Mateo chocan los puños frente a la escuela.",
      text: "A strong body helps a strong mind, Vale said.",
      es: "«Un cuerpo fuerte ayuda a una mente fuerte», dijo Vale.",
      speaker: "vale",
      words: [
        { word: "strong", es: "fuerte" },
        { word: "body", es: "cuerpo" },
        { word: "mind", es: "mente" },
        { word: "helps", es: "ayuda" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "How far did Mateo run today?",
      questionEs: "¿Cuánto corrió Mateo hoy?",
      options: [
        { label: "Three kilometers", emoji: "🏃" },
        { label: "Ten hours", emoji: "🕙" },
        { label: "One page", emoji: "📄" }
      ],
      answer: 0,
      sayIt: "He ran three kilometers today.",
      sayItEs: "Ejemplo: «He ran three kilometers today.»",
      sayItAskEn: "What exercise did you do this week?",
      sayItAskEs: "¿Qué ejercicio hiciste esta semana?",
      sayItCheck: { target: "I *",
        altTargets: ["this week I *"] },
    }
,
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "What does Vale do after class?",
      questionEs: "¿Qué hace Vale después de clase?",
      options: [
        { label: "She walks", emoji: "🚶" },
        { label: "She sleeps", emoji: "😴" },
        { label: "She drives", emoji: "🚗" }
      ],
      answer: 0,
      sayIt: "She walks for twenty minutes.",
      sayItEs: "Ejemplo: «She walks for twenty minutes.»",
      sayItAskEn: "What do you do after work or school?",
      sayItAskEs: "¿Qué haces tú después del trabajo o la escuela?",
      sayItCheck: { target: "I *",
        altTargets: ["after work I *", "after school I *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What helps a strong mind?",
      questionEs: "¿Qué ayuda a una mente fuerte?",
      options: [
        { label: "A strong body", emoji: "💪" },
        { label: "A long movie", emoji: "🎬" },
        { label: "A cold room", emoji: "❄️" }
      ],
      answer: 0,
      sayIt: "A strong body helps a strong mind.",
      sayItEs: "Ejemplo: «A strong body helps a strong mind.»",
      sayItAskEn: "How are you going to move your body tomorrow?",
      sayItAskEs: "¿Cómo vas a mover tu cuerpo mañana?",
      sayItCheck: { target: "I am going to *",
        altTargets: ["tomorrow I am going to *", "I'm going to *"] },
    }

  ],
  habitCard: {
    afterScene: "s10",
    phrase: "I move my body every day. A strong body builds a strong mind.",
    es: "Muevo mi cuerpo cada día. Un cuerpo fuerte construye una mente fuerte.",
    model: "mateo",
    modelActionEs: "Mateo sale a correr veinte minutos antes de su turno.",
  },
  continuePrompt: {
    en: "Tell us about movement. What exercise did you do yesterday? What do you do every week? What are you going to do tomorrow?",
    es: "Cuéntanos sobre el movimiento. ¿Qué ejercicio hiciste ayer? ¿Qué haces cada semana? ¿Qué vas a hacer mañana?",
  },
  continueWith: [
    "Yesterday I ...",
    "Every week I ...",
    "Tomorrow I am going to ..."
  ],
  cliffhanger: {
    en: "Episode 7: Vale forgets to drink water all day. What happens?",
    es: "Episodio 7: Vale olvida tomar agua todo el día. ¿Qué pasa?",
  },
};
