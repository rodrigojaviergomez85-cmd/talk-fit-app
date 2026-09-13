import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/vale-s4-ep19/cover.jpg";
import s1 from "@/assets/storybook/vale-s4-ep19/s1.jpg";
import s2 from "@/assets/storybook/vale-s4-ep19/s2.jpg";
import s3 from "@/assets/storybook/vale-s4-ep19/s3.jpg";
import s4 from "@/assets/storybook/vale-s4-ep19/s4.jpg";
import s5 from "@/assets/storybook/vale-s4-ep19/s5.jpg";
import s6 from "@/assets/storybook/vale-s4-ep19/s6.jpg";
import s7 from "@/assets/storybook/vale-s4-ep19/s7.jpg";
import s8 from "@/assets/storybook/vale-s4-ep19/s8.jpg";
import s9 from "@/assets/storybook/vale-s4-ep19/s9.jpg";
import s10 from "@/assets/storybook/vale-s4-ep19/s10.jpg";
import s11 from "@/assets/storybook/vale-s4-ep19/s11.jpg";
import s12 from "@/assets/storybook/vale-s4-ep19/s12.jpg";

/**
 * Season 4 · Episode 19 — "Vale tells her story".
 * Basic 3 / Past Stories Week 4 Day 19: personal narrative with connectors.
 * Vale narrates her own journey from the first interview to today.
 */
export const VALE_S4_VALE_STORY: StorybookEpisode = {
  id: "vale-s4-vale-story",
  moduleId: "past-stories",
  week: 4,
  title: "Vale tells her story",
  titleEs: "Vale cuenta su historia",
  episodeLabel: { en: "Season 4 · Episode 19", es: "Temporada 4 · Episodio 19" },
  previously: [
    { en: "Little Red saved herself with her voice.", es: "Little Red se salvó con su voz." },
    { en: "The class loved the ending.", es: "A la clase le encantó el final." },
    { en: "Vale promised one more story.", es: "Vale prometió una historia más." },
  ],
  reviewWords: [
    { word: "saved herself", es: "se salvó" },
    { word: "woodcutter", es: "leñador" },
    { word: "was hiding", es: "estaba escondida" },
    { word: "together", es: "juntos" },
  ],
  blurb: {
    en: "Camila is recording. Vale tells the story she never told: her first day, her fear, her voice.",
    es: "Camila está grabando. Vale cuenta la historia que nunca contó: su primer día, su miedo, su voz.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Camila prepara su cámara en el salón.",
      text: "Camila was recording. \"Vale, tell us your story. From the beginning.\"",
      es: "Camila estaba grabando. «Vale, cuéntanos tu historia. Desde el inicio».",
      speaker: "camila",
      words: [
        { word: "was recording", es: "estaba grabando" },
        { word: "from the beginning", es: "desde el inicio" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale respira hondo frente a la clase.",
      text: "Vale breathed deeply. \"First, I was a girl with a broken phone.\"",
      es: "Vale respiró hondo. «Primero, era una muchacha con un teléfono quebrado».",
      speaker: "vale",
      words: [
        { word: "breathed deeply", es: "respiró hondo" },
        { word: "broken", es: "quebrado" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Recuerdo: Vale nerviosa en una entrevista de trabajo.",
      text: '"Two years ago I went to an interview. My hands were shaking."',
      es: "«Hace dos años fui a una entrevista. Me temblaban las manos».",
      speaker: "vale",
      words: [
        { word: "Two years ago", es: "hace dos años" },
        { word: "interview", es: "entrevista" },
        { word: "were shaking", es: "temblaban" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Recuerdo: Vale sale del edificio con la cabeza baja.",
      text: '"They didn\'t choose me. My English wasn\'t good. I cried on the bus."',
      es: "«No me escogieron. Mi inglés no era bueno. Lloré en el bus».",
      speaker: "vale",
      words: [
        { word: "didn't choose me", es: "no me escogieron" },
        { word: "wasn't good", es: "no era bueno" },
        { word: "cried", es: "lloré" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Recuerdo: Vale estudia de noche con audífonos.",
      text: '"Then, every night I studied. Twenty minutes. Only twenty."',
      es: "«Luego, cada noche estudiaba. Veinte minutos. Solo veinte».",
      speaker: "vale",
      words: [
        { word: "every night", es: "cada noche" },
        { word: "studied", es: "estudiaba" },
        { word: "Only twenty", es: "solo veinte" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Recuerdo: Vale repite frases frente al espejo.",
      text: '"I was talking to the mirror. My neighbors thought I was crazy."',
      es: "«Estaba hablando con el espejo. Mis vecinos pensaban que estaba loca».",
      speaker: "vale",
      words: [
        { word: "mirror", es: "espejo" },
        { word: "neighbors", es: "vecinos" },
        { word: "crazy", es: "loca" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Recuerdo: Vale contesta su primera llamada en el call center.",
      text: '"After that, I got the job. My first call lasted four minutes."',
      es: "«Después de eso, conseguí el trabajo. Mi primera llamada duró cuatro minutos».",
      speaker: "vale",
      words: [
        { word: "got the job", es: "conseguí el trabajo" },
        { word: "first call", es: "primera llamada" },
        { word: "lasted", es: "duró" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale mira a sus estudiantes con emoción.",
      text: '"I wasn\'t special. I was constant. That is the secret."',
      es: "«No era especial. Era constante. Ese es el secreto».",
      speaker: "vale",
      words: [
        { word: "special", es: "especial" },
        { word: "constant", es: "constante" },
        { word: "secret", es: "secreto" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Dani escucha con los ojos brillosos.",
      text: "Dani was listening with wet eyes. He didn't say anything.",
      es: "Dani estaba escuchando con los ojos húmedos. No dijo nada.",
      words: [
        { word: "wet eyes", es: "ojos húmedos" },
        { word: "didn't say anything", es: "no dijo nada" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Camila baja la cámara, conmovida.",
      text: 'Camila stopped the camera. "Finally," she said, "this is the real story."',
      es: "Camila detuvo la cámara. «Finalmente», dijo, «esta es la historia real».",
      speaker: "camila",
      words: [
        { word: "stopped", es: "detuvo" },
        { word: "camera", es: "cámara" },
        { word: "real story", es: "historia real" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "La clase repite una frase en voz alta con Vale.",
      text: 'The class repeated together: "Mistakes are part of the process."',
      es: "La clase repitió junta: «Mistakes are part of the process».",
      words: [
        { word: "repeated", es: "repitió" },
        { word: "part of the process", es: "parte del proceso" },
      ],
    },
    {
      id: "s12",
      image: s12,
      imageAlt: "Vale mira un local vacío a través de una ventana.",
      text: "That afternoon Vale stopped in front of an empty place. She was imagining desks.",
      es: "Esa tarde Vale se detuvo frente a un local vacío. Estaba imaginando pupitres.",
      words: [
        { word: "empty place", es: "local vacío" },
        { word: "was imagining", es: "estaba imaginando" },
        { word: "desks", es: "pupitres" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What happened in Vale's first interview?",
      questionEs: "¿Qué pasó en la primera entrevista de Vale?",
      options: [
        { label: "They didn't choose her", emoji: "😔" },
        { label: "She got the job", emoji: "🎉" },
        { label: "She didn't go", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "They didn't choose her.",
      sayItEs: "Ejemplo: «They didn't choose her.»",
      sayItAskEn: "What was difficult for you last year?",
      sayItAskEs: "¿Qué fue difícil para ti el año pasado?",
      sayItCheck: {
        target: "* was difficult",
        altTargets: ["it was *", "my *", "I was *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "How long did Vale study every night?",
      questionEs: "¿Cuánto estudiaba Vale cada noche?",
      options: [
        { label: "Twenty minutes", emoji: "⏱️" },
        { label: "Five hours", emoji: "🕐" },
        { label: "She didn't study", emoji: "❌" },
      ],
      answer: 0,
      sayIt: "She studied twenty minutes every night.",
      sayItEs: "Ejemplo: «She studied twenty minutes.»",
      sayItAskEn: "How long did you study yesterday?",
      sayItAskEs: "¿Cuánto tiempo estudiaste ayer?",
      sayItCheck: {
        target: "I studied * minutes",
        altTargets: ["* minutes", "one hour", "I didn't study", "I studied *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "What was Vale's secret?",
      questionEs: "¿Cuál era el secreto de Vale?",
      options: [
        { label: "She was constant", emoji: "🔁" },
        { label: "She was special", emoji: "⭐" },
        { label: "She was lucky", emoji: "🍀" },
      ],
      answer: 0,
      sayIt: "She was constant.",
      sayItEs: "Ejemplo: «She was constant.»",
      sayItAskEn: "Why are you studying English?",
      sayItAskEs: "¿Por qué estás estudiando inglés?",
      sayItCheck: {
        target: "because I want *",
        altTargets: ["because *", "I want *", "for my *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  continuePrompt: {
    en: "Your turn! Tell your story: first, then, after that, finally.",
    es: "¡Tu turno! Cuenta tu historia: first, then, after that, finally.",
  },
  continueWith: [
    "First, I was…",
    "Then, I started…",
    "After that, I…",
    "Finally, today I…",
  ],
  cliffhanger: {
    en: "Episode 20: The season finale. Vale makes the biggest decision of her life.",
    es: "Episodio 20: El final de temporada. Vale toma la decisión más grande de su vida.",
  },
};
