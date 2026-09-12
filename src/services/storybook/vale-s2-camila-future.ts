import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep18/cover.jpg";
import s1 from "@/assets/storybook/vale-ep18/s1.jpg";
import s2 from "@/assets/storybook/vale-ep18/s2.jpg";
import s3 from "@/assets/storybook/vale-ep18/s3.jpg";
import s4 from "@/assets/storybook/vale-ep18/s4.jpg";
import s5 from "@/assets/storybook/vale-ep18/s5.jpg";
import s6 from "@/assets/storybook/vale-ep18/s6.jpg";
import s7 from "@/assets/storybook/vale-ep18/s7.jpg";
import s8 from "@/assets/storybook/vale-ep18/s8.jpg";
import s9 from "@/assets/storybook/vale-ep18/s9.jpg";
import s10 from "@/assets/storybook/vale-ep18/s10.jpg";

/**
 * Season 2 · Episode 18 — "Camila's future".
 * Basic 1 / Simple Future Week 4 Day 3: talking about another person's future.
 */
export const VALE_S2_CAMILA_FUTURE: StorybookEpisode = {
  id: "vale-s2-camila-future",
  moduleId: "simple-future",
  week: 4,
  title: "Camila's future",
  titleEs: "El futuro de Camila",
  episodeLabel: { en: "Season 2 · Episode 18", es: "Temporada 2 · Episodio 18" },
  previously: [
    { en: "The event moved to Sunday.", es: "El evento se movió al domingo." },
    { en: "Three companies will send recruiters.", es: "Tres empresas enviarán reclutadores." },
    { en: "Camila called from Honduras.", es: "Camila llamó desde Honduras." },
  ],
  reviewWords: [
    { word: "recruiters", es: "reclutadores" },
    { word: "companies", es: "empresas" },
    { word: "board", es: "pizarra" },
    { word: "free", es: "libre" },
  ],
  blurb: {
    en: "Camila has an offer in another city. Vale helps her decide.",
    es: "Camila tiene una oferta en otra ciudad. Vale la ayuda a decidir.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Camila en videollamada desde Honduras.",
      text: "Camila is on the screen. She looks serious.",
      es: "Camila está en la pantalla. Se ve seria.",
      words: [
        { word: "screen", es: "pantalla" },
        { word: "serious", es: "seria" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila explica su oferta.",
      text: "\"A company is going to offer me a bilingual job,\" she says.",
      es: "«Una empresa va a ofrecerme un trabajo bilingüe», dice ella.",
      speaker: "camila",
      words: [
        { word: "offer", es: "ofrecer / oferta" },
        { word: "bilingual", es: "bilingüe" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Camila mira una maleta.",
      text: "\"But I will move to another city. Alone.\"",
      es: "«Pero me mudaré a otra ciudad. Sola.»",
      speaker: "camila",
      words: [
        { word: "move", es: "mudarse" },
        { word: "city", es: "ciudad" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale escucha con atención.",
      text: "Vale asks: \"Will you be happy there?\"",
      es: "Vale pregunta: «¿Serás feliz allá?»",
      speaker: "vale",
      words: [
        { word: "happy", es: "feliz" },
        { word: "there", es: "allá" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Camila piensa y sonríe.",
      text: "\"I think I will. I'm going to grow a lot,\" says Camila.",
      es: "«Creo que sí. Voy a crecer mucho», dice Camila.",
      speaker: "camila",
      words: [
        { word: "grow", es: "crecer" },
        { word: "lot", es: "mucho" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale la anima.",
      text: "\"Then say yes. You won't be alone. We'll call you every week.\"",
      es: "«Entonces di que sí. No estarás sola. Te llamaremos cada semana.»",
      speaker: "vale",
      words: [
        { word: "alone", es: "sola" },
        { word: "call", es: "llamar" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Camila con lágrimas de alegría.",
      text: "Camila cries a little. \"I am not scared now.\"",
      es: "Camila llora un poco. «Ya no tengo miedo.»",
      speaker: "camila",
      words: [
        { word: "cries", es: "llora" },
        { word: "scared", es: "asustada" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila levanta el pulgar.",
      text: "\"I'll take the job. I am a champion,\" she says loud.",
      es: "«Tomaré el trabajo. Soy una campeona», dice fuerte.",
      speaker: "camila",
      words: [
        { word: "take", es: "tomar" },
        { word: "champion", es: "campeona" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale escribe una nota nueva.",
      text: "Vale writes: \"One friend, one job, one country changed.\"",
      es: "Vale escribe: «Una amiga, un trabajo, un país cambiado.»",
      words: [{ word: "country", es: "país" }],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Nubes negras sobre la escuela el sábado.",
      text: "On Saturday night the sky is black. Everybody looks up.",
      es: "El sábado en la noche el cielo está negro. Todos miran arriba.",
      words: [
        { word: "black", es: "negro" },
        { word: "up", es: "arriba" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What is a company going to offer Camila?",
      questionEs: "¿Qué va a ofrecerle una empresa a Camila?",
      options: [
        { label: "A bilingual job", emoji: "💼" },
        { label: "A free house", emoji: "🏠" },
        { label: "A car", emoji: "🚗" },
      ],
      answer: 0,
      sayIt: "A company is going to offer her a bilingual job.",
      sayItEs: "Repite: «Una empresa va a ofrecerle un trabajo bilingüe.»",
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Will Camila be alone?",
      questionEs: "¿Camila estará sola?",
      options: [
        { label: "No, she won't", emoji: "💚" },
        { label: "Yes, she will", emoji: "😢" },
        { label: "Only in January", emoji: "📅" },
      ],
      answer: 0,
      sayIt: "She won't be alone. We'll call her every week.",
      sayItEs: "Repite: «Ella no estará sola. La llamaremos cada semana.»",
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What is Camila going to do?",
      questionEs: "¿Qué va a hacer Camila?",
      options: [
        { label: "Take the job and move", emoji: "🧳" },
        { label: "Stay and say no", emoji: "🚫" },
        { label: "Study art", emoji: "🎨" },
      ],
      answer: 0,
      sayIt: "She is going to take the job and move to another city.",
      sayItEs: "Repite: «Ella va a tomar el trabajo y mudarse a otra ciudad.»",
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "I am a champion.",
    es: "Soy un campeón / una campeona.",
  },
  continuePrompt: {
    en: "Talk about a friend's future. What will he or she do?",
    es: "Habla del futuro de un amigo o amiga. ¿Qué hará?",
  },
  continueWith: [
    "She will…",
    "He won't…",
    "She is going to…",
    "I think he will…",
  ],
  cliffhanger: {
    en: "Episode 19: Visible predictions — the rain arrives and the event begins.",
    es: "Episodio 19: Predicciones visibles — llega la lluvia y empieza el evento.",
  },
};
