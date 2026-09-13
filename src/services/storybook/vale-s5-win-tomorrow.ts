import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-win-tomorrow/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-win-tomorrow/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-win-tomorrow/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-win-tomorrow/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-win-tomorrow/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-win-tomorrow/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-win-tomorrow/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-win-tomorrow/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-win-tomorrow/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-win-tomorrow/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-win-tomorrow/s10.jpg";

/**
 * Season 5 Episode 4 - "Win tomorrow".
 * Matches Basic 4 / Mixed Tenses Week 1:
 *   en: "Yesterday & Tomorrow - past + future",
 *   es: "Ayer y manana - pasado + futuro"
 */
export const VALE_S5_WIN_TOMORROW: StorybookEpisode = {
  id: "vale-s5-win-tomorrow",
  moduleId: "mixed-tenses",
  week: 1,
  title: "Win tomorrow",
  titleEs: "Ganar mañana",
  episodeLabel: { en: "Season 5 · Episode 4", es: "Temporada 5 · Episodio 4" },
  reviewWords: [
    { word: "party", es: "fiesta" },
    { word: "schedule", es: "horario" },
    { word: "tomorrow", es: "mañana" }
  ],
  blurb: {
    en: "Mateo wants Vale to party, but she has to win tomorrow. She chooses rest.",
    es: "Mateo quiere que Vale vaya a la fiesta, pero ella tiene que ganar mañana. Ella elige descansar.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El teléfono de Vale suena a las 9:45 p.m.",
      text: "Vale's phone beeped at 9:45 p.m.",
      words: [
        { word: "phone", es: "teléfono" },
        { word: "beeped", es: "pitó" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Mateo envía un mensaje sobre una fiesta.",
      text: "A message from Mateo said: Are you coming to the party?",
      speaker: "mateo",
      words: [
        { word: "message", es: "mensaje" },
        { word: "party", es: "fiesta" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale revisa su horario antes de responder.",
      text: "Vale looked at her schedule. Tomorrow I teach early.",
      speaker: "vale",
      words: [
        { word: "schedule", es: "horario" },
        { word: "teach", es: "doy clases" },
        { word: "tomorrow", es: "mañana" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale escribe que necesita ganar mañana.",
      text: "She typed: Not tonight. I need to win tomorrow.",
      speaker: "vale",
      words: [
        { word: "typed", es: "escribió" },
        { word: "tonight", es: "esta noche" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Mateo envía un emoji de pulgar arriba.",
      text: "Mateo sent a thumbs up emoji.",
      speaker: "mateo",
      words: [
        { word: "sent", es: "envió" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale prepara su mochila y ropa.",
      text: "Vale prepared her backpack and clothes.",
      speaker: "vale",
      words: [
        { word: "prepared", es: "preparó" },
        { word: "backpack", es: "mochila" },
        { word: "clothes", es: "ropa" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale escribe el plan de mañana en su libreta.",
      text: "She wrote tomorrow's plan in a notebook.",
      speaker: "vale",
      words: [
        { word: "plan", es: "plan" },
        { word: "notebook", es: "libreta" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "A las 10:00 p.m., Vale cierra los ojos.",
      text: "At 10:00, she closed her eyes.",
      speaker: "vale",
      words: [
        { word: "closed", es: "cerró" },
        { word: "eyes", es: "ojos" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Al día siguiente, Vale llega llena de energía.",
      text: "The next day, Vale arrived full of energy.",
      speaker: "vale",
      words: [
        { word: "next day", es: "al día siguiente" },
        { word: "arrived", es: "llegó" },
        { word: "full of energy", es: "llena de energía" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale le dice a sus estudiantes que el descanso es su estrategia.",
      text: "Rest is my strategy, she told her students.",
      speaker: "vale",
      words: [
        { word: "rest", es: "descanso" },
        { word: "strategy", es: "estrategia" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What time does Vale teach tomorrow?",
      questionEs: "¿A qué hora da clases Vale mañana?",
      options: [
        { label: "Early", emoji: "🌅" },
        { label: "Late", emoji: "🌙" },
        { label: "At night", emoji: "🌃" }
      ],
      answer: 0,
      sayIt: "Tomorrow I teach early.",
      sayItEs: "Ejemplo: «Tomorrow I teach early.»",
      sayItAskEn: "What time do you work tomorrow?",
      sayItAskEs: "¿A qué hora trabajas tú mañana?",
      sayItCheck: { target: "I work *",
        altTargets: ["I work tomorrow *"] },
    }
,
    {
      id: "q2",
      afterScene: "s4",
      questionEn: "Why does Vale say no to the party?",
      questionEs: "¿Por qué Vale dice no a la fiesta?",
      options: [
        { label: "She needs sleep", emoji: "😴" },
        { label: "She doesn't like parties", emoji: "🎉" },
        { label: "She is sick", emoji: "🤒" }
      ],
      answer: 0,
      sayIt: "I need to win tomorrow.",
      sayItEs: "Ejemplo: «I need to win tomorrow.»",
      sayItAskEn: "What do you say no to sometimes?",
      sayItAskEs: "¿A qué dices que no a veces tú?",
      sayItCheck: { target: "I say no to *" },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What is Vale's strategy?",
      questionEs: "¿Cuál es la estrategia de Vale?",
      options: [
        { label: "Rest", emoji: "🛌" },
        { label: "Coffee", emoji: "☕" },
        { label: "Luck", emoji: "🍀" }
      ],
      answer: 0,
      sayIt: "Rest is my strategy.",
      sayItEs: "Ejemplo: «Rest is my strategy.»",
      sayItAskEn: "What is your strategy to win?",
      sayItAskEs: "¿Cuál es tu estrategia para ganar?",
      sayItCheck: { target: "My strategy is *" },
    }

  ],
  habitCard: {
    afterScene: "s10",
    phrase: "I rest well today so I win tomorrow.",
    es: "Descanso bien hoy para ganar mañana.",
    model: "vale",
    modelActionEs: "Vale apaga las notificaciones y guarda su teléfono.",
  },
  continuePrompt: {
    en: "What did you do last night? What do you do to prepare for tomorrow? What are you going to do tonight?",
    es: "¿Qué hiciste anoche? ¿Qué haces para prepararte para mañana? ¿Qué vas a hacer esta noche?",
  },
  continueWith: [
    "Last night I ...",
    "To prepare, I ...",
    "Tonight I am going to ..."
  ],
  cliffhanger: {
    en: "Episode 5: Kat brings healthy snacks. What will Vale learn?",
    es: "Episodio 5: Kat trae snacks saludables. ¿Qué aprenderá Vale?",
  },
};
