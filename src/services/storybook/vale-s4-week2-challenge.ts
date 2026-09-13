import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep10/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep10/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep10/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep10/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep10/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep10/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep10/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep10/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep10/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep10/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep10/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep10/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep10/s12.jpg";

/**
 * Season 4 · Episode 10 — "The Week 2 challenge".
 * Matches Basic 3 / Past Stories Week 2 Day 10: talk about another person's day.
 * Emotional beat of the block: Camila's article and the hidden reason behind it.
 */
export const VALE_S4_WEEK2_CHALLENGE: StorybookEpisode = {
  id: "vale-s4-week2-challenge",
  moduleId: "past-stories",
  week: 2,
  title: "The Week 2 challenge",
  titleEs: "El reto de la Semana 2",
  episodeLabel: { en: "Season 4 · Episode 10", es: "Temporada 4 · Episodio 10" },
  previously: [
    { en: "Luis told the team about his father.", es: "Luis le contó al equipo sobre su papá." },
    { en: "Kat offered a job for him.", es: "Kat ofreció un trabajo para él." },
    { en: "Now Camila returns with a camera.", es: "Ahora Camila regresa con una cámara." },
  ],
  reviewWords: [
    { word: "hope", es: "esperanza" },
    { word: "lost his job", es: "perdió su trabajo" },
    { word: "shoulder", es: "hombro" },
    { word: "market", es: "mercado" },
  ],
  blurb: {
    en: "Camila films Vale telling Dani's story. But why does Camila care so much? The answer is personal.",
    es: "Camila graba a Vale contando la historia de Dani. Pero, ¿por qué le importa tanto a Camila? La respuesta es personal.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Camila llega a la escuela con una cámara pequeña.",
      text: "Camila came back to the school with a small camera.",
      es: "Camila volvió a la escuela con una cámara pequeña.",
      speaker: "camila",
      words: [
        { word: "came back", es: "volvió" },
        { word: "small", es: "pequeña" },
        { word: "camera", es: "cámara" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila le pide a Vale contar la historia de un estudiante.",
      text: '"Tell me about one student. His whole day. In English," she said.',
      es: "«Cuéntame de un estudiante. Su día completo. En inglés», dijo.",
      speaker: "camila",
      words: [
        { word: "Tell me", es: "cuéntame" },
        { word: "student", es: "estudiante" },
        { word: "whole day", es: "día completo" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale respira hondo frente a la cámara.",
      text: "Vale breathed deeply. Her hands shook a little. Then she started.",
      es: "Vale respiró profundo. Sus manos temblaron un poco. Luego empezó.",
      speaker: "vale",
      words: [
        { word: "breathed deeply", es: "respiró profundo" },
        { word: "hands", es: "manos" },
        { word: "shook", es: "temblaron" },
        { word: "started", es: "empezó" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale narra mientras se ve a Dani caminando temprano.",
      text: '"His name is Dani. He woke up at five and walked forty minutes to class."',
      es: "«Se llama Dani. Se despertó a las cinco y caminó cuarenta minutos a clase».",
      speaker: "vale",
      words: [
        { word: "walked", es: "caminó" },
        { word: "minutes", es: "minutos" },
        { word: "class", es: "clase" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale sigue narrando; se ve a Dani sin desayunar.",
      text: '"He didn\'t eat breakfast. His grandma was sick that morning."',
      es: "«No desayunó. Su abuela estaba enferma esa mañana».",
      speaker: "vale",
      words: [
        { word: "didn't eat", es: "no comió" },
        { word: "was sick", es: "estaba enferma" },
        { word: "morning", es: "mañana" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale cuenta con orgullo lo que hizo Dani al final.",
      text: '"He didn\'t smile at first. But at the end he raised his hand and asked a question."',
      es: "«Al principio no sonrió. Pero al final levantó la mano e hizo una pregunta».",
      speaker: "vale",
      words: [
        { word: "at first", es: "al principio" },
        { word: "at the end", es: "al final" },
        { word: "raised", es: "levantó" },
        { word: "question", es: "pregunta" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Camila baja la cámara con los ojos húmedos.",
      text: "Camila lowered the camera. Her eyes were wet.",
      es: "Camila bajó la cámara. Sus ojos estaban húmedos.",
      speaker: "camila",
      words: [
        { word: "lowered", es: "bajó" },
        { word: "eyes", es: "ojos" },
        { word: "wet", es: "húmedos" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila se sienta y habla con Vale con seriedad.",
      text: '"Ten years ago, I was that student," Camila said quietly.',
      es: "«Hace diez años, yo era esa estudiante», dijo Camila bajito.",
      speaker: "camila",
      words: [
        { word: "Ten years ago", es: "hace diez años" },
        { word: "that student", es: "esa estudiante" },
        { word: "quietly", es: "bajito" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Camila recuerda su pasado con expresión triste.",
      text: '"Nobody told my story. I left school. I didn\'t finish."',
      es: "«Nadie contó mi historia. Dejé la escuela. No terminé».",
      speaker: "camila",
      words: [
        { word: "Nobody", es: "nadie" },
        { word: "left school", es: "dejé la escuela" },
        { word: "finish", es: "terminar" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale escucha con mucha atención y compasión.",
      text: '"So now I write. I want the students to read about themselves."',
      es: "«Por eso ahora escribo. Quiero que los estudiantes lean sobre ellos mismos».",
      speaker: "camila",
      words: [
        { word: "So now", es: "por eso ahora" },
        { word: "write", es: "escribo" },
        { word: "read", es: "leer" },
        { word: "themselves", es: "ellos mismos" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale y Camila se dan la mano con determinación.",
      text: "Vale took her hand. \"Then let's tell them all.\"",
      es: "Vale tomó su mano. «Entonces contémoslas todas».",
      speaker: "vale",
      words: [
        { word: "took", es: "tomó" },
        { word: "Then", es: "entonces" },
        { word: "tell", es: "contar" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Camila escribe el título del artículo en su libreta.",
      text: "That night, Camila wrote the title: \"The teacher who gave away her sandwich.\"",
      es: "Esa noche, Camila escribió el título: «La maestra que regaló su sándwich».",
      words: [
        { word: "wrote", es: "escribió" },
        { word: "title", es: "título" },
        { word: "gave away", es: "regaló" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "Why didn't Dani eat breakfast?",
      questionEs: "¿Por qué Dani no desayunó?",
      options: [
        { label: "His grandma was sick", emoji: "🤒" },
        { label: "He wasn't hungry", emoji: "😐" },
        { label: "He was late", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "He didn't eat because his grandma was sick.",
      sayItEs: "Ejemplo: «His grandma was sick.»",
      sayItAskEn: "Who did YOU take care of, or who took care of you?",
      sayItAskEs: "¿A quién cuidaste, o quién te cuidó a ti?",
      sayItCheck: {
        target: "my *",
        altTargets: ["I took care of *", "my mother", "my grandma", "nobody"],
      },
    },
    {
      id: "q2",
      afterScene: "s9",
      questionEn: "Why does Camila write these stories?",
      questionEs: "¿Por qué Camila escribe estas historias?",
      options: [
        { label: "She was that student before", emoji: "💔" },
        { label: "For money", emoji: "💵" },
        { label: "Her boss asked", emoji: "👔" },
      ],
      answer: 0,
      sayIt: "Because ten years ago she was that student.",
      sayItEs: "Ejemplo: «She was that student.»",
      sayItAskEn: "Did you ever stop studying something? Why?",
      sayItAskEs: "¿Alguna vez dejaste de estudiar algo? ¿Por qué?",
      sayItCheck: {
        target: "yes because *",
        altTargets: ["yes", "no", "because *", "I stopped *"],
      },
    },
    {
      id: "q3",
      afterScene: "s12",
      questionEn: "What did Camila call her article?",
      questionEs: "¿Cómo llamó Camila a su artículo?",
      options: [
        { label: "The teacher who gave away her sandwich", emoji: "🥪" },
        { label: "The call center", emoji: "☎️" },
        { label: "My free Saturday", emoji: "🌤️" },
      ],
      answer: 0,
      sayIt: "The teacher who gave away her sandwich.",
      sayItEs: "Ejemplo: «The teacher who gave away her sandwich.»",
      sayItAskEn: "What was the best thing you did last week?",
      sayItAskEs: "¿Qué fue lo mejor que hiciste la semana pasada?",
      sayItCheck: {
        target: "I *",
        altTargets: ["the best thing was *", "I did *", "I helped *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s3",
    phrase: "I can do it.",
    es: "Yo puedo hacerlo.",
  },
  continuePrompt: {
    en: "Your turn! Tell another person's whole day yesterday — morning, afternoon and night.",
    es: "¡Tu turno! Cuenta el día completo de ayer de otra persona: mañana, tarde y noche.",
  },
  continueWith: [
    "In the morning he/she…",
    "He/She didn't…",
    "In the afternoon he/she…",
    "At night he/she…",
  ],
  cliffhanger: {
    en: "Episode 11: Vale was teaching when the phone rang. It was the hospital.",
    es: "Episodio 11: Vale estaba enseñando cuando sonó el teléfono. Era el hospital.",
  },
};
