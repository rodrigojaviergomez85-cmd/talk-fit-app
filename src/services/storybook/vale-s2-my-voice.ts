import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-ep5/cover.jpg";
import s1 from "@/assets/storybook/vale-ep5/s1.jpg";
import s2 from "@/assets/storybook/vale-ep5/s2.jpg";
import s3 from "@/assets/storybook/vale-ep5/s3.jpg";
import s4 from "@/assets/storybook/vale-ep5/s4.jpg";
import s5 from "@/assets/storybook/vale-ep5/s5.jpg";
import s6 from "@/assets/storybook/vale-ep6/s6.jpg";
import s7 from "@/assets/storybook/vale-ep6/s7.jpg";
import s8 from "@/assets/storybook/vale-ep6/s8.jpg";
import s9 from "@/assets/storybook/vale-ep6/s9.jpg";
import s10 from "@/assets/storybook/vale-ep6/s10.jpg";

/**
 * Season 2 · Episode 5 — "My plan, my voice".
 * Matches Basic 1 / Simple Future Week 1 Day 5: my plans challenge.
 */
export const VALE_S2_MY_VOICE: StorybookEpisode = {
  id: "vale-s2-my-voice",
  moduleId: "simple-future",
  week: 1,
  title: "My plan, my voice",
  titleEs: "Mi plan, mi voz",
  episodeLabel: { en: "Season 2 · Episode 5", es: "Temporada 2 · Episodio 5" },
  previously: [
    { en: "The team is going to travel to Santa Ana.", es: "El equipo va a viajar a Santa Ana." },
    { en: "They are going to visit a job fair.", es: "Van a visitar una feria de empleo." },
    { en: "Vale is going to present to the director.", es: "Vale va a presentarle al director." },
  ],
  reviewWords: [
    { word: "travel", es: "viajar" },
    { word: "fair", es: "feria" },
    { word: "present", es: "presentar" },
    { word: "director", es: "director / directora" },
  ],
  blurb: {
    en: "Vale practices her plan out loud. It is time to use her own voice.",
    es: "Vale practica su plan en voz alta. Es hora de usar su propia voz.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Escena 1 del episodio.",
      imageAlt: "Vale frente a un espejo, practicando su plan.",
      text: "Vale practices her plan out loud.",
      es: "Vale practica su plan en voz alta.",
      words: [
        { word: "practices", es: "practica" },
        { word: "out", es: "en voz" },
        { word: "loud", es: "alta" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Escena 2 del episodio.",
      text: "\"Tonight, I’m going to review my notes,\" she says.",
      es: "«Esta noche voy a repasar mis apuntes», dice ella.",
      speaker: "vale",
      words: [
        { word: "tonight", es: "esta noche" },
        { word: "review", es: "repasar" },
        { word: "notes", es: "apuntes" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Escena 3 del episodio.",
      text: "\"Tomorrow, I’m going to wake up early.\"",
      es: "«Mañana me voy a despertar temprano.»",
      speaker: "vale",
      words: [
        { word: "tomorrow", es: "mañana" },
        { word: "wake", es: "despertar" },
        { word: "early", es: "temprano" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Escena 4 del episodio.",
      text: "\"This weekend, I’m going to travel with the team.\"",
      es: "«Este fin de semana voy a viajar con el equipo.»",
      speaker: "vale",
      words: [
        { word: "weekend", es: "fin de semana" },
        { word: "travel", es: "viajar" },
        { word: "team", es: "equipo" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Escena 5 del episodio.",
      text: "\"We’re going to present at the job fair.\"",
      es: "«Vamos a presentar en la feria de empleo.»",
      speaker: "vale",
      words: [
        { word: "present", es: "presentar" },
        { word: "fair", es: "feria" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Escena 6 del episodio.",
      text: "\"Next month, I’m going to lead a workshop for young people.\"",
      es: "«El próximo mes voy a liderar un taller para jóvenes.»",
      speaker: "vale",
      words: [
        { word: "month", es: "mes" },
        { word: "lead", es: "liderar" },
        { word: "workshop", es: "taller" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Escena 7 del episodio.",
      text: "\"I’m not going to give up.\"",
      es: "«No me voy a rendir.»",
      speaker: "vale",
      words: [
        { word: "give", es: "dar" },
        { word: "up", es: "arriba / (phrasal) rendirse" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Escena 8 del episodio.",
      text: "Ana says: \"Now tell the team your plan.\"",
      es: "Ana dice: «Ahora cuéntale el plan al equipo.»",
      speaker: "ana",
      words: [
        { word: "tell", es: "contar" },
        { word: "plan", es: "plan" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Escena 9 del episodio.",
      text: "Vale speaks to the team: \"I’m going to work hard because young people need opportunities.\"",
      es: "Vale le habla al equipo: «Voy a trabajar duro porque los jóvenes necesitan oportunidades.»",
      speaker: "vale",
      words: [
        { word: "hard", es: "duro" },
        { word: "because", es: "porque" },
        { word: "need", es: "necesitan" },
        { word: "opportunities", es: "oportunidades" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Escena 10 del episodio.",
      text: "Ana looks worried. \"There is another team. They want the same grant.\"",
      es: "Ana se ve preocupada. «Hay otro equipo. Quieren el mismo apoyo financiero.»",
      speaker: "ana",
      words: [
        { word: "worried", es: "preocupada" },
        { word: "another", es: "otro / otra" },
        { word: "same", es: "mismo / misma" },
        { word: "grant", es: "apoyo financiero / beca" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "When is Vale going to review her notes?",
      questionEs: "¿Cuándo va a repasar Vale sus apuntes?",
      options: [
        { label: "Tonight", emoji: "🌙" },
        { label: "Next year", emoji: "📅" },
        { label: "Never", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "Tonight, I’m going to review my notes.",
      sayItEs: "Repite: «Esta noche voy a repasar mis apuntes.»",
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What is Vale going to lead next month?",
      questionEs: "¿Qué va a liderar Vale el próximo mes?",
      options: [
        { label: "A workshop", emoji: "🎤" },
        { label: "A soccer game", emoji: "⚽" },
        { label: "A restaurant", emoji: "🍽️" },
      ],
      answer: 0,
      sayIt: "Next month, I’m going to lead a workshop.",
      sayItEs: "Repite: «El próximo mes voy a liderar un taller.»",
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What does the other team want?",
      questionEs: "¿Qué quiere el otro equipo?",
      options: [
        { label: "The same grant", emoji: "🏆" },
        { label: "A pizza", emoji: "🍕" },
        { label: "A new phone", emoji: "📱" },
      ],
      answer: 0,
      sayIt: "They want the same grant.",
      sayItEs: "Repite: «Quieren el mismo apoyo.»",
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I am a champion.",
    es: "Soy una campeona.",
  },
  continuePrompt: {
    en: "Tell us your plan: tonight, tomorrow, this weekend and next month.",
    es: "Cuéntanos tu plan: esta noche, mañana, este fin de semana y el próximo mes.",
  },
  continueWith: [
    "Tonight, I’m going to…",
    "Tomorrow, I’m going to…",
    "This weekend, I’m going to…",
    "Next month, I’m going to…",
    "I’m not going to…",
  ],
  cliffhanger: {
    en: "Episode 6: Mateo has a big weekend — and Vale’s team needs his help.",
    es: "Episodio 6: Mateo tiene un gran fin de semana — y el equipo de Vale necesita su ayuda.",
  },
};
