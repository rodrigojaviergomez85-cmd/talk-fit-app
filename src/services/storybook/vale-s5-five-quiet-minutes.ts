import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-five-quiet-minutes/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-five-quiet-minutes/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-five-quiet-minutes/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-five-quiet-minutes/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-five-quiet-minutes/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-five-quiet-minutes/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-five-quiet-minutes/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-five-quiet-minutes/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-five-quiet-minutes/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-five-quiet-minutes/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-five-quiet-minutes/s10.jpg";

/**
 * Season 5 Episode 13 - "Five quiet minutes".
 * Matches Basic 4 / Mixed Tenses Week 3:
 *   en: "Ask Questions - yes/no + WH across time",
 *   es: "Haz preguntas - si/no + WH en todos los tiempos"
 */
export const VALE_S5_FIVE_QUIET_MINUTES: StorybookEpisode = {
  id: "vale-s5-five-quiet-minutes",
  moduleId: "mixed-tenses",
  week: 3,
  title: "Five quiet minutes",
  titleEs: "Cinco minutos de silencio",
  episodeLabel: { en: "Season 5 · Episode 13", es: "Temporada 5 · Episodio 13" },
  reviewWords: [
    { word: "quiet", es: "silencio" },
    { word: "calm", es: "calma" },
    { word: "breathe", es: "respirar" }
  ],
  blurb: {
    en: "Vale's week is loud. She learns to take five quiet minutes every morning.",
    es: "La semana de Vale es ruidosa. Aprende a tomar cinco minutos de silencio cada mañana.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Teléfonos, mensajes y ruido alrededor de Vale.",
      text: "Phones, messages, and noise all week.",
      es: "Teléfonos, mensajes y ruido toda la semana.",
      words: [
        { word: "phones", es: "teléfonos" },
        { word: "messages", es: "mensajes" },
        { word: "noise", es: "ruido" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale se cubre los oídos un momento.",
      text: "Vale felt her mind running too fast.",
      es: "Vale sintió que su mente iba muy rápido.",
      speaker: "vale",
      words: [
        { word: "mind", es: "mente" },
        { word: "running", es: "corriendo" },
        { word: "fast", es: "rápido" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Su mamá le sirve café en la cocina.",
      text: "Her mom gave her coffee in the kitchen.",
      es: "Su mamá le dio café en la cocina.",
      speaker: "mom",
      words: [
        { word: "mom", es: "mamá" },
        { word: "kitchen", es: "cocina" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Su mamá se sienta en silencio junto a la ventana.",
      text: "Every morning I sit quietly for five minutes.",
      es: "«Cada mañana me siento en silencio cinco minutos».",
      speaker: "mom",
      words: [
        { word: "sit", es: "me siento" },
        { word: "quietly", es: "en silencio" },
        { word: "minutes", es: "minutos" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale pregunta con curiosidad.",
      text: "What do you do in those five minutes?",
      es: "«¿Qué haces en esos cinco minutos?».",
      speaker: "vale",
      words: [
        { word: "what", es: "qué" },
        { word: "those", es: "esos" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "La mamá cierra los ojos y respira.",
      text: "I breathe. I think. I give thanks.",
      es: "«Respiro. Pienso. Doy gracias».",
      speaker: "mom",
      words: [
        { word: "breathe", es: "respiro" },
        { word: "think", es: "pienso" },
        { word: "thanks", es: "gracias" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale se sienta junto a ella en silencio.",
      text: "Vale sat next to her without a phone.",
      es: "Vale se sentó a su lado sin teléfono.",
      words: [
        { word: "sat", es: "se sentó" },
        { word: "without", es: "sin" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "El reloj marca cinco minutos.",
      text: "Five minutes passed very slowly.",
      es: "Cinco minutos pasaron muy despacio.",
      words: [
        { word: "passed", es: "pasaron" },
        { word: "slowly", es: "despacio" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale abre los ojos y sonríe con calma.",
      text: "Vale opened her eyes. My mind is quiet now.",
      es: "Vale abrió los ojos. «Mi mente está tranquila ahora».",
      speaker: "vale",
      words: [
        { word: "opened", es: "abrió" },
        { word: "quiet", es: "tranquila" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale pone una alarma suave a las seis.",
      text: "Tomorrow I am going to do it again, she said.",
      es: "«Mañana lo voy a hacer otra vez», dijo ella.",
      speaker: "vale",
      words: [
        { word: "tomorrow", es: "mañana" },
        { word: "again", es: "otra vez" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "How long does Vale's mom sit quietly?",
      questionEs: "¿Cuánto tiempo se sienta en silencio la mamá de Vale?",
      options: [
        { label: "Five minutes", emoji: "🧘" },
        { label: "Five hours", emoji: "🕐" },
        { label: "All night", emoji: "🌙" }
      ],
      answer: 0,
      sayIt: "She sits quietly for five minutes.",
      sayItEs: "Ejemplo: «She sits quietly for five minutes.»",
      sayItAskEn: "When do you have quiet time?",
      sayItAskEs: "¿Cuándo tienes tú un momento de silencio?",
      sayItCheck: { target: "I have quiet time *",
        altTargets: ["in the *", "at *", "every *"] },
    }
,
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What does she do in those minutes?",
      questionEs: "¿Qué hace ella en esos minutos?",
      options: [
        { label: "Breathe, think, give thanks", emoji: "🙏" },
        { label: "Watch videos", emoji: "📱" },
        { label: "Run fast", emoji: "🏃" }
      ],
      answer: 0,
      sayIt: "She breathes, thinks, and gives thanks.",
      sayItEs: "Ejemplo: «She breathes, thinks, and gives thanks.»",
      sayItAskEn: "What are you thankful for today?",
      sayItAskEs: "¿Por qué estás agradecido hoy?",
      sayItCheck: { target: "I am thankful for *",
        altTargets: ["I'm thankful for *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What is Vale going to do tomorrow?",
      questionEs: "¿Qué va a hacer Vale mañana?",
      options: [
        { label: "Sit quietly again", emoji: "🧘" },
        { label: "Sleep all day", emoji: "😴" },
        { label: "Turn on the TV", emoji: "📺" }
      ],
      answer: 0,
      sayIt: "She is going to sit quietly again.",
      sayItEs: "Ejemplo: «She is going to sit quietly again.»",
      sayItAskEn: "What are you going to do to calm your mind tomorrow?",
      sayItAskEs: "¿Qué vas a hacer para calmar tu mente mañana?",
      sayItCheck: { target: "I am going to *",
        altTargets: ["I'm going to *", "tomorrow I am going to *"] },
    }

  ],
  habitCard: {
    afterScene: "s9",
    phrase: "I take five quiet minutes every morning to breathe and give thanks.",
    es: "Tomo cinco minutos de silencio cada mañana para respirar y dar gracias.",
    model: "mom",
    modelActionEs: "La mamá de Vale se sienta junto a la ventana, sin teléfono, cinco minutos.",
  },
  continuePrompt: {
    en: "Tell us about calm. When did you feel calm last week? What do you do every morning? What are you going to try tomorrow?",
    es: "Cuéntanos de la calma. ¿Cuándo te sentiste en calma la semana pasada? ¿Qué haces cada mañana? ¿Qué vas a probar mañana?",
  },
  continueWith: [
    "Last week I felt calm when ...",
    "Every morning I ...",
    "Tomorrow I am going to ..."
  ],
  cliffhanger: {
    en: "Episode 14: The school has a hard month. Will Vale keep going?",
    es: "Episodio 14: La escuela tiene un mes difícil. ¿Seguirá adelante Vale?",
  },
};
