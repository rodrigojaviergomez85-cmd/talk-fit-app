import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s5-water-bottle/cover.jpg";
import s1 from "@/assets/storybook/vale-s5-water-bottle/s1.jpg";
import s2 from "@/assets/storybook/vale-s5-water-bottle/s2.jpg";
import s3 from "@/assets/storybook/vale-s5-water-bottle/s3.jpg";
import s4 from "@/assets/storybook/vale-s5-water-bottle/s4.jpg";
import s5 from "@/assets/storybook/vale-s5-water-bottle/s5.jpg";
import s6 from "@/assets/storybook/vale-s5-water-bottle/s6.jpg";
import s7 from "@/assets/storybook/vale-s5-water-bottle/s7.jpg";
import s8 from "@/assets/storybook/vale-s5-water-bottle/s8.jpg";
import s9 from "@/assets/storybook/vale-s5-water-bottle/s9.jpg";
import s10 from "@/assets/storybook/vale-s5-water-bottle/s10.jpg";

/**
 * Season 5 Episode 7 - "The water bottle".
 * Matches Basic 4 / Mixed Tenses Week 2:
 *   en: "Everyday Life - present + past",
 *   es: "La vida diaria - presente + pasado"
 */
export const VALE_S5_WATER_BOTTLE: StorybookEpisode = {
  id: "vale-s5-water-bottle",
  moduleId: "mixed-tenses",
  week: 2,
  title: "The water bottle",
  titleEs: "La botella de agua",
  episodeLabel: { en: "Season 5 · Episode 7", es: "Temporada 5 · Episodio 7" },
  reviewWords: [
    { word: "water", es: "agua" },
    { word: "drink", es: "tomar" },
    { word: "headache", es: "dolor de cabeza" }
  ],
  blurb: {
    en: "Vale teaches all day and forgets to drink water. Kat brings her a bottle.",
    es: "Vale enseña todo el día y olvida tomar agua. Kat le trae una botella.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale enseña frente a una clase llena.",
      text: "Vale taught four classes on Tuesday.",
      es: "Vale dio cuatro clases el martes.",
      speaker: "vale",
      words: [
        { word: "taught", es: "dio clases" },
        { word: "classes", es: "clases" },
        { word: "Tuesday", es: "martes" }
      ],
    }
,
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale se toca la cabeza con los ojos cerrados.",
      text: "In the afternoon, her head hurt.",
      es: "En la tarde, le dolía la cabeza.",
      speaker: "vale",
      words: [
        { word: "afternoon", es: "tarde" },
        { word: "head", es: "cabeza" },
        { word: "hurt", es: "dolía" }
      ],
    }
,
    {
      id: "s3",
      image: s3,
      imageAlt: "Kat entra con una botella de agua grande.",
      text: "Kat came in with a big water bottle.",
      es: "Kat entró con una botella de agua grande.",
      speaker: "kat",
      words: [
        { word: "came in", es: "entró" },
        { word: "big", es: "grande" },
        { word: "bottle", es: "botella" }
      ],
    }
,
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat le da la botella a Vale.",
      text: "Did you drink water today? Kat asked.",
      es: "«¿Tomaste agua hoy?», preguntó Kat.",
      speaker: "kat",
      words: [
        { word: "drink", es: "tomar" },
        { word: "water", es: "agua" },
        { word: "asked", es: "preguntó" }
      ],
    }
,
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale niega con la cabeza, apenada.",
      text: "No. I drank only coffee, Vale answered.",
      es: "«No. Solo tomé café», respondió Vale.",
      speaker: "vale",
      words: [
        { word: "drank", es: "tomé" },
        { word: "only", es: "solo" },
        { word: "answered", es: "respondió" }
      ],
    }
,
    {
      id: "s6",
      image: s6,
      imageAlt: "Kat pone la botella sobre el escritorio de Vale.",
      text: "Your brain needs water, Kat said.",
      es: "«Tu cerebro necesita agua», dijo Kat.",
      speaker: "kat",
      words: [
        { word: "brain", es: "cerebro" },
        { word: "needs", es: "necesita" }
      ],
    }
,
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale bebe agua despacio.",
      text: "Vale drank slowly and closed her eyes.",
      es: "Vale bebió despacio y cerró los ojos.",
      speaker: "vale",
      words: [
        { word: "drank", es: "bebió" },
        { word: "slowly", es: "despacio" },
        { word: "closed", es: "cerró" }
      ],
    }
,
    {
      id: "s8",
      image: s8,
      imageAlt: "El dolor de cabeza desaparece y Vale sonríe.",
      text: "Ten minutes later, the headache was gone.",
      es: "Diez minutos después, el dolor de cabeza se fue.",
      words: [
        { word: "later", es: "después" },
        { word: "headache", es: "dolor de cabeza" },
        { word: "gone", es: "se fue" }
      ],
    }
,
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale pone la botella junto al pizarrón.",
      text: "Now I keep water next to the board, she said.",
      es: "«Ahora tengo agua junto al pizarrón», dijo ella.",
      speaker: "vale",
      words: [
        { word: "keep", es: "tengo" },
        { word: "next to", es: "junto a" },
        { word: "board", es: "pizarrón" }
      ],
    }
,
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale y Kat brindan con sus botellas.",
      text: "Small habits protect big dreams, Kat said.",
      es: "«Los hábitos pequeños protegen los sueños grandes», dijo Kat.",
      speaker: "kat",
      words: [
        { word: "small", es: "pequeños" },
        { word: "habits", es: "hábitos" },
        { word: "protect", es: "protegen" },
        { word: "dreams", es: "sueños" }
      ],
    }

  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What did Vale drink that day?",
      questionEs: "¿Qué tomó Vale ese día?",
      options: [
        { label: "Only coffee", emoji: "☕" },
        { label: "Only water", emoji: "💧" },
        { label: "Orange juice", emoji: "🧃" }
      ],
      answer: 0,
      sayIt: "She drank only coffee.",
      sayItEs: "Ejemplo: «She drank only coffee.»",
      sayItAskEn: "What did you drink today?",
      sayItAskEs: "¿Qué tomaste tú hoy?",
      sayItCheck: { target: "I drank *",
        altTargets: ["today I drank *"] },
    }
,
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "What happened after Vale drank water?",
      questionEs: "¿Qué pasó después de que Vale tomó agua?",
      options: [
        { label: "The headache was gone", emoji: "😌" },
        { label: "She fell asleep", emoji: "😴" },
        { label: "She got angry", emoji: "😠" }
      ],
      answer: 0,
      sayIt: "The headache was gone.",
      sayItEs: "Ejemplo: «The headache was gone.»",
      sayItAskEn: "How do you feel when you drink enough water?",
      sayItAskEs: "¿Cómo te sientes cuando tomas suficiente agua?",
      sayItCheck: { target: "I feel *",
        altTargets: ["I feel more *"] },
    }
,
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What do small habits protect?",
      questionEs: "¿Qué protegen los hábitos pequeños?",
      options: [
        { label: "Big dreams", emoji: "🌟" },
        { label: "Old phones", emoji: "📱" },
        { label: "Empty rooms", emoji: "🚪" }
      ],
      answer: 0,
      sayIt: "Small habits protect big dreams.",
      sayItEs: "Ejemplo: «Small habits protect big dreams.»",
      sayItAskEn: "What small habit are you going to start tomorrow?",
      sayItAskEs: "¿Qué hábito pequeño vas a empezar mañana?",
      sayItCheck: { target: "I am going to *",
        altTargets: ["tomorrow I am going to *", "I'm going to *"] },
    }

  ],
  habitCard: {
    afterScene: "s9",
    phrase: "I drink water all day. My brain works better when I take care of it.",
    es: "Tomo agua todo el día. Mi cerebro funciona mejor cuando lo cuido.",
    model: "kat",
    modelActionEs: "Kat llena su botella cada mañana antes de empezar.",
  },
  continuePrompt: {
    en: "Tell us about your day. What did you drink yesterday? What do you drink every morning? What are you going to change tomorrow?",
    es: "Cuéntanos de tu día. ¿Qué tomaste ayer? ¿Qué tomas cada mañana? ¿Qué vas a cambiar mañana?",
  },
  continueWith: [
    "Yesterday I drank ...",
    "Every morning I drink ...",
    "Tomorrow I am going to ..."
  ],
  cliffhanger: {
    en: "Episode 8: A student falls asleep in class. What will Vale do?",
    es: "Episodio 8: Un estudiante se duerme en clase. ¿Qué hará Vale?",
  },
};
