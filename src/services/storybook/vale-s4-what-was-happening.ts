import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep11/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep11/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep11/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep11/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep11/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep11/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep11/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep11/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep11/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep11/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep11/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep11/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep11/s12.jpg";

/**
 * Season 4 · Episode 11 — "What was happening?".
 * Basic 3 / Past Stories Week 3 Day 11: past progressive (was/were + -ing).
 * Vale was studying when Kat called with big news.
 */
export const VALE_S4_WHAT_WAS_HAPPENING: StorybookEpisode = {
  id: "vale-s4-what-was-happening",
  moduleId: "past-stories",
  week: 3,
  title: "What was happening?",
  titleEs: "¿Qué estaba pasando?",
  episodeLabel: { en: "Season 4 · Episode 11", es: "Temporada 4 · Episodio 11" },
  previously: [
    { en: "Camila wrote about Vale's Saturday class.", es: "Camila escribió sobre la clase de sábado de Vale." },
    { en: "Dani raised his hand for the first time.", es: "Dani levantó la mano por primera vez." },
    { en: "Vale went home with a full heart.", es: "Vale se fue a casa con el corazón lleno." },
  ],
  reviewWords: [
    { word: "raised his hand", es: "levantó la mano" },
    { word: "article", es: "artículo" },
    { word: "surprised", es: "sorprendida" },
    { word: "notebook", es: "cuaderno" },
  ],
  blurb: {
    en: "Monday night. Vale was studying alone. Then the phone rang, and everything changed.",
    es: "Lunes por la noche. Vale estaba estudiando sola. Luego sonó el teléfono y todo cambió.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale estudia inglés en su mesa de noche con una lámpara.",
      text: "It was nine o'clock. Vale was studying English at her small table.",
      es: "Eran las nueve. Vale estaba estudiando inglés en su mesita.",
      speaker: "vale",
      words: [
        { word: "nine o'clock", es: "las nueve" },
        { word: "was studying", es: "estaba estudiando" },
        { word: "small table", es: "mesita" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "La mamá de Vale cocina en la cocina pequeña.",
      text: "Her mom was cooking beans. The kitchen smelled like home.",
      es: "Su mamá estaba cocinando frijoles. La cocina olía a hogar.",
      words: [
        { word: "was cooking", es: "estaba cocinando" },
        { word: "beans", es: "frijoles" },
        { word: "smelled", es: "olía" },
        { word: "home", es: "hogar / casa" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "El teléfono de Vale suena sobre el cuaderno.",
      text: "Vale was writing new words when her phone rang loudly.",
      es: "Vale estaba escribiendo palabras nuevas cuando su teléfono sonó fuerte.",
      speaker: "vale",
      words: [
        { word: "was writing", es: "estaba escribiendo" },
        { word: "when", es: "cuando" },
        { word: "rang", es: "sonó" },
        { word: "loudly", es: "fuerte" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Kat habla emocionada por teléfono en la calle.",
      text: '"Vale! Were you sleeping?" Kat asked. "No, I was studying," Vale said.',
      es: "«¡Vale! ¿Estabas durmiendo?», preguntó Kat. «No, estaba estudiando», dijo Vale.",
      speaker: "kat",
      words: [
        { word: "Were you sleeping?", es: "¿Estabas durmiendo?" },
        { word: "I was studying", es: "estaba estudiando" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Kat muestra su teléfono con una publicación.",
      text: '"People were sharing your article all afternoon!" Kat shouted.',
      es: "«¡La gente estuvo compartiendo tu artículo toda la tarde!», gritó Kat.",
      speaker: "kat",
      words: [
        { word: "were sharing", es: "estaban compartiendo" },
        { word: "all afternoon", es: "toda la tarde" },
        { word: "shouted", es: "gritó" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale mira su teléfono con la boca abierta.",
      text: "Vale opened the link. Two hundred people were talking about her class.",
      es: "Vale abrió el enlace. Doscientas personas estaban hablando de su clase.",
      speaker: "vale",
      words: [
        { word: "opened", es: "abrió" },
        { word: "link", es: "enlace" },
        { word: "were talking", es: "estaban hablando" },
        { word: "class", es: "clase" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "La mamá de Vale se acerca preocupada con una cuchara.",
      text: '"Why were you shouting?" her mom asked from the kitchen door.',
      es: "«¿Por qué estabas gritando?», preguntó su mamá desde la puerta de la cocina.",
      words: [
        { word: "Why were you shouting?", es: "¿Por qué estabas gritando?" },
        { word: "kitchen door", es: "puerta de la cocina" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale le muestra el teléfono a su mamá, emocionada.",
      text: '"Mom, they were reading about me. About my students!"',
      es: "«Mamá, estaban leyendo sobre mí. ¡Sobre mis estudiantes!»",
      speaker: "vale",
      words: [
        { word: "were reading", es: "estaban leyendo" },
        { word: "about me", es: "sobre mí" },
        { word: "students", es: "estudiantes" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale escribe un mensaje mientras su mamá sonríe.",
      text: "While her mom was smiling, Vale was answering messages. Her hands were shaking.",
      es: "Mientras su mamá sonreía, Vale estaba contestando mensajes. Le temblaban las manos.",
      speaker: "vale",
      words: [
        { word: "While", es: "mientras" },
        { word: "was smiling", es: "estaba sonriendo" },
        { word: "was answering", es: "estaba contestando" },
        { word: "were shaking", es: "temblaban" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale mira un mensaje serio en su pantalla.",
      text: "One message was different. A woman was asking for English classes for her son.",
      es: "Un mensaje era diferente. Una señora estaba pidiendo clases de inglés para su hijo.",
      speaker: "vale",
      words: [
        { word: "different", es: "diferente" },
        { word: "was asking for", es: "estaba pidiendo" },
        { word: "her son", es: "su hijo" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale respira profundo y se dice a sí misma que puede.",
      text: "Vale was scared. But she said it out loud: \"I can do it.\"",
      es: "Vale tenía miedo. Pero lo dijo en voz alta: «I can do it».",
      speaker: "vale",
      words: [
        { word: "scared", es: "con miedo" },
        { word: "out loud", es: "en voz alta" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Vale escribe una respuesta con calma en la noche.",
      text: "At eleven she was still writing. One class was becoming something bigger.",
      es: "A las once todavía estaba escribiendo. Una clase se estaba volviendo algo más grande.",
      words: [
        { word: "still", es: "todavía" },
        { word: "was becoming", es: "se estaba volviendo" },
        { word: "bigger", es: "más grande" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What was Vale doing when the phone rang?",
      questionEs: "¿Qué estaba haciendo Vale cuando sonó el teléfono?",
      options: [
        { label: "She was studying English", emoji: "📚" },
        { label: "She was sleeping", emoji: "😴" },
        { label: "She was cooking", emoji: "🍳" },
      ],
      answer: 0,
      sayIt: "She was studying English.",
      sayItEs: "Ejemplo: «She was studying English.»",
      sayItAskEn: "What were you doing at nine last night?",
      sayItAskEs: "¿Qué estabas haciendo anoche a las nueve?",
      sayItCheck: {
        target: "I was *",
        altTargets: ["I was studying *", "I was working *", "I was sleeping"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Why was Kat so excited?",
      questionEs: "¿Por qué estaba tan emocionada Kat?",
      options: [
        { label: "People were sharing the article", emoji: "📱" },
        { label: "She was cooking beans", emoji: "🫘" },
        { label: "She was sleeping late", emoji: "🛌" },
      ],
      answer: 0,
      sayIt: "People were sharing the article.",
      sayItEs: "Ejemplo: «People were sharing the article.»",
      sayItAskEn: "Who were you talking to yesterday?",
      sayItAskEs: "¿Con quién estabas hablando ayer?",
      sayItCheck: {
        target: "I was talking to *",
        altTargets: ["I was talking with *", "my *", "nobody"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What was the woman asking for?",
      questionEs: "¿Qué estaba pidiendo la señora?",
      options: [
        { label: "English classes for her son", emoji: "🧒" },
        { label: "A job at the call center", emoji: "🎧" },
        { label: "Vale's notebook", emoji: "📓" },
      ],
      answer: 0,
      sayIt: "She was asking for English classes.",
      sayItEs: "Ejemplo: «She was asking for English classes.»",
      sayItAskEn: "Where were you living last year?",
      sayItAskEs: "¿Dónde estabas viviendo el año pasado?",
      sayItCheck: {
        target: "I was living in *",
        altTargets: ["I was living *", "in *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s11",
    phrase: "I can do it.",
    es: "Yo puedo hacerlo.",
  },
  continuePrompt: {
    en: "Your turn! Tell me about last night: what were you doing at nine?",
    es: "¡Tu turno! Cuéntame de anoche: ¿qué estabas haciendo a las nueve?",
  },
  continueWith: [
    "Last night at nine I was…",
    "My family was…",
    "Then my phone…",
    "I felt…",
  ],
  cliffhanger: {
    en: "Episode 12: At eight last night the lights went out. Mateo was cooking…",
    es: "Episodio 12: A las ocho de anoche se fue la luz. Mateo estaba cocinando…",
  },
};
