import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-early-morning/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-early-morning/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-early-morning/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-early-morning/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-early-morning/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-early-morning/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-early-morning/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-early-morning/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-early-morning/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-early-morning/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-early-morning/s10.jpg";

/**
 * Season 5 Episode 3 - "The early morning".
 * Matches Basic 4 / Mixed Tenses Week 1:
 *   en: "Yesterday & Tomorrow - past + future",
 *   es: "Ayer y manana - pasado + futuro"
 */
export const VALE_S5_EARLY_MORNING: StorybookEpisode = {
  id: "vale-s5-early-morning",
  moduleId: "mixed-tenses",
  week: 1,
  title: "The early morning",
  titleEs: "La mañana temprana",
  episodeLabel: { en: "Season 5 · Episode 3", es: "Temporada 5 · Episodio 3" },
  reviewWords: [
    { word: "feel", es: "siento" },
    { word: "energy", es: "energía" },
    { word: "fruit", es: "fruta" }
  ],
  blurb: {
    en: "Vale wakes up before her alarm. A good night of sleep changes everything.",
    es: "Vale despierta antes de la alarma. Una buena noche de sueño lo cambia todo.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "El sol sale y Vale despierta antes de la alarma.",
      text: "The sun came up. Vale woke up before the alarm.",
      words: [
        { word: "sun", es: "sol" },
        { word: "came up", es: "salió" },
        { word: "woke up", es: "se despertó" },
        { word: "before", es: "antes" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale se estira en la cama y sonríe.",
      text: "She stretched her arms and smiled.",
      speaker: "vale",
      words: [
        { word: "stretched", es: "estiró" },
        { word: "arms", es: "brazos" },
        { word: "smiled", es: "sonrió" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale se siente genial tras ocho horas de sueño.",
      text: "I slept eight hours. I feel great! Vale said.",
      speaker: "vale",
      words: [
        { word: "slept", es: "dormí" },
        { word: "feel", es: "siento" },
        { word: "great", es: "genial" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale come fruta y bebe agua.",
      text: "She ate fruit and drank water.",
      speaker: "vale",
      words: [
        { word: "fruit", es: "fruta" },
        { word: "water", es: "agua" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale camina a la escuela con energía.",
      text: "Vale walked to school with energy.",
      speaker: "vale",
      words: [
        { word: "walked", es: "caminó" },
        { word: "school", es: "escuela" },
        { word: "energy", es: "energía" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Los estudiantes esperan en la puerta.",
      text: "The students waited at the door.",
      words: [
        { word: "students", es: "estudiantes" },
        { word: "waited", es: "esperaron" },
        { word: "door", es: "puerta" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Los estudiantes gritan good morning con alegría.",
      text: "Good morning, teacher! they shouted.",
      words: [
        { word: "shouted", es: "gritaron" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale ríe y dice que ama las mañanas así.",
      text: "Vale laughed. I love mornings like this.",
      speaker: "vale",
      words: [
        { word: "laughed", es: "se rió" },
        { word: "love", es: "amo" },
        { word: "mornings", es: "mañanas" },
        { word: "like this", es: "como esta" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "La primera clase es increíble.",
      text: "The first class was amazing.",
      words: [
        { word: "first", es: "primera" },
        { word: "class", es: "clase" },
        { word: "amazing", es: "increíble" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale le dice a Dani que el sueño es su superpoder.",
      text: "After class, Vale told Dani: Sleep is my superpower.",
      speaker: "vale",
      words: [
        { word: "told", es: "le dijo a" },
        { word: "superpower", es: "superpoder" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "How does Vale feel?",
      questionEs: "¿Cómo se siente Vale?",
      options: [
        { label: "Great", emoji: "✨" },
        { label: "Tired", emoji: "😴" },
        { label: "Hungry", emoji: "🍽️" }
      ],
      answer: 0,
      sayIt: "I feel great!",
      sayItEs: "Ejemplo: «I feel great!»",
      sayItAskEn: "How do you feel today?",
      sayItAskEs: "¿Cómo te sientes hoy tú?",
      sayItCheck: { target: "I feel *" },
    }
,
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "What did Vale eat?",
      questionEs: "¿Qué comió Vale?",
      options: [
        { label: "Fruit", emoji: "🍎" },
        { label: "Pizza", emoji: "🍕" },
        { label: "Candy", emoji: "🍬" }
      ],
      answer: 0,
      sayIt: "She ate fruit and drank water.",
      sayItEs: "Ejemplo: «She ate fruit and drank water.»",
      sayItAskEn: "What did you eat this morning?",
      sayItAskEs: "¿Qué comiste tú esta mañana?",
      sayItCheck: { target: "I ate *",
        altTargets: ["I ate * and drank *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What is Vale's superpower?",
      questionEs: "¿Cuál es el superpoder de Vale?",
      options: [
        { label: "Sleep", emoji: "😴" },
        { label: "Coffee", emoji: "☕" },
        { label: "Running", emoji: "🏃" }
      ],
      answer: 0,
      sayIt: "Sleep is my superpower.",
      sayItEs: "Ejemplo: «Sleep is my superpower.»",
      sayItAskEn: "What is your superpower?",
      sayItAskEs: "¿Cuál es tu superpoder?",
      sayItCheck: { target: "My superpower is *" },
    }

  ],
  habitCard: {
    afterScene: "s10",
    phrase: "I wake up with energy when I rest well.",
    es: "Me despierto con energía cuando descanso bien.",
    model: "vale",
    modelActionEs: "Vale se estira en su cama y sonríe.",
  },
  continuePrompt: {
    en: "How did you wake up today? What did you eat? How do you feel?",
    es: "¿Cómo despertaste hoy? ¿Qué comiste? ¿Cómo te sientes?",
  },
  continueWith: [
    "I woke up ...",
    "I ate ...",
    "I feel ..."
  ],
  cliffhanger: {
    en: "Episode 4: Mateo invites Vale to a party. Will she choose rest?",
    es: "Episodio 4: Mateo invita a Vale a una fiesta. ¿Ella elegirá descansar?",
  },
};
