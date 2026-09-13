import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-tired-teacher/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-tired-teacher/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-tired-teacher/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-tired-teacher/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-tired-teacher/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-tired-teacher/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-tired-teacher/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-tired-teacher/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-tired-teacher/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-tired-teacher/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-tired-teacher/s10.jpg";

/**
 * Season 5 Episode 2 - "A tired teacher".
 * Matches Basic 4 / Mixed Tenses Week 1:
 *   en: "Yesterday & Tomorrow - past + future",
 *   es: "Ayer y manana - pasado + futuro"
 */
export const VALE_S5_TIRED_TEACHER: StorybookEpisode = {
  id: "vale-s5-tired-teacher",
  moduleId: "mixed-tenses",
  week: 1,
  title: "A tired teacher",
  titleEs: "Una maestra cansada",
  episodeLabel: { en: "Season 5 · Episode 2", es: "Temporada 5 · Episodio 2" },
  reviewWords: [
    { word: "slept", es: "dormí" },
    { word: "tired", es: "cansada" },
    { word: "need", es: "necesito" }
  ],
  blurb: {
    en: "Vale did not sleep enough. Dani shows her the power of eight hours.",
    es: "Vale no durmió lo suficiente. Dani le muestra el poder de ocho horas.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "La alarma suena a las seis de la mañana.",
      text: "The alarm rang at six in the morning.",
      words: [
        { word: "alarm", es: "alarma" },
        { word: "rang", es: "sonó" },
        { word: "morning", es: "mañana" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale abre los ojos y se siente cansada.",
      text: "Vale opened her eyes. I am so tired.",
      speaker: "vale",
      words: [
        { word: "eyes", es: "ojos" },
        { word: "tired", es: "cansada" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale bebe café y se lava la cara.",
      text: "She drank coffee and washed her face.",
      speaker: "vale",
      words: [
        { word: "coffee", es: "café" },
        { word: "washed", es: "lavó" },
        { word: "face", es: "cara" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani llega temprano y ve a Vale.",
      text: "Dani arrived early. Teacher, are you okay?",
      speaker: "dani",
      words: [
        { word: "arrived", es: "llegó" },
        { word: "early", es: "temprano" },
        { word: "okay", es: "bien" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale sonríe y admite que no durmió ocho horas.",
      text: "Vale smiled. I didn't sleep eight hours last night.",
      speaker: "vale",
      words: [
        { word: "smiled", es: "sonrió" },
        { word: "didn't sleep", es: "no dormí" },
        { word: "last night", es: "anoche" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani abre su cuaderno y comparte su hábito.",
      text: "Dani opened his notebook. I slept eight hours.",
      speaker: "dani",
      words: [
        { word: "notebook", es: "cuaderno" },
        { word: "slept", es: "dormí" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani explica que el sueño es combustible.",
      text: "That's my habit, Dani said. Sleep is fuel.",
      speaker: "dani",
      words: [
        { word: "habit", es: "hábito" },
        { word: "fuel", es: "combustible" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale asiente y decide acostarse temprano.",
      text: "Vale nodded. Tonight I am going to bed early.",
      speaker: "vale",
      words: [
        { word: "nodded", es: "asintió" },
        { word: "tonight", es: "esta noche" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "La clase empieza y todos escuchan.",
      text: "The class started. Everyone listened.",
      words: [
        { word: "started", es: "empezó" },
        { word: "listened", es: "escucharon" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "En el receso, Vale bebe agua y respira profundo.",
      text: "At break time, Vale drank water and breathed.",
      speaker: "vale",
      words: [
        { word: "break", es: "receso" },
        { word: "breathed", es: "respiró" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "How many hours did Vale sleep last night?",
      questionEs: "¿Cuántas horas durmió Vale anoche?",
      options: [
        { label: "Eight hours", emoji: "🕗" },
        { label: "Four hours", emoji: "🕓" },
        { label: "She didn't sleep", emoji: "🌑" }
      ],
      answer: 1,
      sayIt: "She didn't sleep eight hours last night.",
      sayItEs: "Ejemplo: «She didn't sleep eight hours last night.»",
      sayItAskEn: "How many hours did you sleep last night?",
      sayItAskEs: "¿Cuántas horas dormiste tú anoche?",
      sayItCheck: { target: "I slept *",
        altTargets: ["I didn't sleep *"] },
    }
,
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What is Dani's habit?",
      questionEs: "¿Cuál es el hábito de Dani?",
      options: [
        { label: "Sleep eight hours", emoji: "😴" },
        { label: "Run every day", emoji: "🏃" },
        { label: "Eat candy", emoji: "🍬" }
      ],
      answer: 0,
      sayIt: "My habit is sleeping eight hours every night.",
      sayItEs: "Ejemplo: «My habit is sleeping eight hours every night.»",
      sayItAskEn: "What is your habit?",
      sayItAskEs: "¿Cuál es tu hábito?",
      sayItCheck: { target: "My habit is *" },
    }
,
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What is Vale going to do tonight?",
      questionEs: "¿Qué va a hacer Vale esta noche?",
      options: [
        { label: "Sleep early", emoji: "🌙" },
        { label: "Watch TV", emoji: "📺" },
        { label: "Run", emoji: "🏃" }
      ],
      answer: 0,
      sayIt: "Tonight I am going to bed early.",
      sayItEs: "Ejemplo: «Tonight I am going to bed early.»",
      sayItAskEn: "What are you going to do tonight?",
      sayItAskEs: "¿Qué vas a hacer tú esta noche?",
      sayItCheck: { target: "I am going to *",
        altTargets: ["tonight I am going to *"] },
    }

  ],
  habitCard: {
    afterScene: "s10",
    phrase: "I sleep eight hours every night.",
    es: "Duermo ocho horas cada noche.",
    model: "dani",
    modelActionEs: "Dani guarda su teléfono y apaga la luz a las 10:00 p.m.",
  },
  continuePrompt: {
    en: "Tell us about your sleep. How many hours did you sleep last night? What time do you usually go to bed? What are you going to do tonight?",
    es: "Cuéntanos sobre tu sueño. ¿Cuántas horas dormiste anoche? ¿A qué hora te acuestas normalmente? ¿Qué vas a hacer esta noche?",
  },
  continueWith: [
    "I slept ... hours last night.",
    "I usually go to bed at ...",
    "Tonight I am going to ..."
  ],
  cliffhanger: {
    en: "Episode 3: Vale wakes up full of energy. How did she do it?",
    es: "Episodio 3: Vale despierta llena de energía. ¿Cómo lo hizo?",
  },
};
