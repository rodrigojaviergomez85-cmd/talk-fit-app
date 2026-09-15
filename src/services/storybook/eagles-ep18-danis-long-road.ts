import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep18-danis-long-road/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep18-danis-long-road/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep18-danis-long-road/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep18-danis-long-road/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep18-danis-long-road/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep18-danis-long-road/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep18-danis-long-road/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep18-danis-long-road/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep18-danis-long-road/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep18-danis-long-road/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep18-danis-long-road/s10.jpg";

/**
 * Season 6 (Eagles) Episode 18 — "Dani's long road".
 * Eagles day 18: present perfect progressive — long-term effort + next step.
 */
export const EAGLES_EP18_DANIS_LONG_ROAD: StorybookEpisode = {
  id: "eagles-ep18-danis-long-road",
  moduleId: "eagles-week-1",
  week: 4,
  title: "Dani's long road",
  titleEs: "El largo camino de Dani",
  episodeLabel: { en: "Season 6 · Episode 18", es: "Temporada 6 · Episodio 18" },
  previously: [
    { en: "The checklist is almost finished.", es: "La lista está casi terminada." },
    { en: "Every student recorded a video.", es: "Cada estudiante grabó un video." },
    { en: "Dani stayed alone with an old notebook.", es: "Dani se quedó solo con un cuaderno viejo." },
  ],
  reviewWords: [
    { word: "have been", es: "he estado" },
    { word: "effort", es: "esfuerzo" },
    { word: "step", es: "paso" },
  ],
  blurb: {
    en: "Two years of night study in one old notebook. Dani finally says out loud what he has been working toward.",
    es: "Dos años de estudio nocturno en un cuaderno viejo. Dani por fin dice en voz alta hacia qué ha estado trabajando.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale and Dani sit on the school steps in the morning with coffee.",
      text: "6:50 a.m. Before anybody arrives.",
      es: "6:50 a.m. Antes de que llegue nadie.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "The notebook. Two years. Talk.", es: "«El cuaderno. Dos años. Habla»." },
        { speaker: "dani", text: "I have been studying for a technical degree at night.", es: "«He estado estudiando una carrera técnica de noche»." },
        { speaker: "vale", text: "Two years and you never told me?", es: "«¿Dos años y nunca me dijiste?»" },
      ],
      words: [
        { word: "notebook", es: "cuaderno" },
        { word: "degree", es: "carrera" },
        { word: "night", es: "noche" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani opens the notebook full of small handwritten schedules.",
      text: "Every page is a week.",
      es: "Cada página es una semana.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "I have been waking up at four thirty since January of last year.", es: "«Me he estado levantando a las cuatro y media desde enero del año pasado»." },
        { speaker: "vale", text: "How long have you been sleeping five hours?", es: "«¿Cuánto tiempo llevas durmiendo cinco horas?»" },
        { speaker: "dani", text: "Long enough to finish in November.", es: "«Lo suficiente para terminar en noviembre»." },
      ],
      words: [
        { word: "waking", es: "levantándome" },
        { word: "january", es: "enero" },
        { word: "november", es: "noviembre" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani shows a photo of his old bedroom desk with books.",
      text: "The first page has a reason, not a schedule.",
      es: "La primera página tiene una razón, no un horario.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "My mother has been cleaning offices for twenty years.", es: "«Mi mamá ha estado limpiando oficinas por veinte años»." },
        { speaker: "vale", text: "And the date on the page?", es: "«¿Y la fecha de la página?»" },
        { speaker: "dani", text: "The day she came home with her hands hurting. I have been running since then.", es: "«El día que llegó a la casa con las manos doliéndole. Desde entonces he estado corriendo»." },
      ],
      words: [
        { word: "cleaning", es: "limpiando" },
        { word: "hands", es: "manos" },
        { word: "running", es: "corriendo" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Camila listens with her hand on her mouth in the office.",
      text: "Camila hears it from the door.",
      es: "Camila lo escucha desde la puerta.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "You have been doing two jobs and a degree at the same time.", es: "«Has estado haciendo dos trabajos y una carrera al mismo tiempo»." },
        { speaker: "dani", text: "I have been tired for two years. It is not heroic, it is just Tuesday.", es: "«Llevo dos años cansado. No es heroico, es solo martes»." },
        { speaker: "camila", text: "It is both.", es: "«Es las dos cosas»." },
      ],
      words: [
        { word: "jobs", es: "trabajos" },
        { word: "tired", es: "cansado" },
        { word: "tuesday", es: "martes" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Luis talks with Dani about studying with a full time job.",
      text: "Luis recognizes the face.",
      es: "Luis reconoce esa cara.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "How long have you been carrying this alone?", es: "«¿Cuánto tiempo llevas cargando esto solo?»" },
        { speaker: "dani", text: "Since the first class. I did not want a special schedule.", es: "«Desde la primera clase. No quería un horario especial»." },
        { speaker: "luis", text: "I have been hiding things too. It does not help.", es: "«Yo también he estado escondiendo cosas. No ayuda»." },
      ],
      words: [
        { word: "carrying", es: "cargando" },
        { word: "special", es: "especial" },
        { word: "hiding", es: "escondiendo" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale rewrites the team schedule to protect Dani's study nights.",
      text: "Vale changes the schedule in five minutes.",
      es: "Vale cambia el horario en cinco minutos.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Tuesdays and Thursdays you leave at six. That is not a favor.", es: "«Martes y jueves sales a las seis. Eso no es un favor»." },
        { speaker: "dani", text: "The trip is in four days. You need me.", es: "«El viaje es en cuatro días. Me necesitas»." },
        { speaker: "vale", text: "I need you in November too.", es: "«También te necesito en noviembre»." },
      ],
      words: [
        { word: "thursdays", es: "jueves" },
        { word: "favor", es: "favor" },
        { word: "trip", es: "viaje" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Dani records his own student video at last.",
      text: "Dani finally records his video.",
      es: "Dani por fin graba su video.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "I have been studying English and systems for two years.", es: "«He estado estudiando inglés y sistemas por dos años»." },
        { speaker: "vale", text: "And what is the next step?", es: "«¿Y cuál es el siguiente paso?»" },
        { speaker: "dani", text: "In November I graduate. Then I want to build our platform myself.", es: "«En noviembre me gradúo. Luego quiero construir nuestra plataforma yo mismo»." },
      ],
      words: [
        { word: "systems", es: "sistemas" },
        { word: "graduate", es: "graduarme" },
        { word: "build", es: "construir" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "The students clap for Dani in the classroom.",
      text: "Group A finds out by accident.",
      es: "El grupo A se entera por accidente.",
      speaker: "kat",
      lines: [
        { speaker: "kat", text: "We have been asking you for help all year and you never said a word.", es: "«Llevamos todo el año pidiéndote ayuda y nunca dijiste nada»." },
        { speaker: "beto", text: "If he can do it, I can do it.", es: "«Si él puede, yo puedo»." },
        { speaker: "dani", text: "Say that louder, Beto.", es: "«Dilo más fuerte, Beto»." },
      ],
      words: [
        { word: "asking", es: "pidiendo" },
        { word: "help", es: "ayuda" },
        { word: "word", es: "palabra" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Morgan watches Dani's video on a screen in her office.",
      text: "Morgan watches the videos that night.",
      es: "Morgan ve los videos esa noche.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "Your assistant has been building a career while running your school.", es: "«Tu asistente ha estado construyendo una carrera mientras lleva tu escuela»." },
        { speaker: "vale", text: "He is not an assistant. He is a partner who has not asked for the title yet.", es: "«No es un asistente. Es un socio que todavía no ha pedido el título»." },
        { speaker: "morgan", text: "Bring him to Miami.", es: "«Tráelo a Miami»." },
      ],
      words: [
        { word: "career", es: "carrera" },
        { word: "partner", es: "socio" },
        { word: "title", es: "título" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale gets an angry phone call late at night, her face changing.",
      text: "11:58 p.m. The phone rings with a Northline number.",
      es: "11:58 p.m. El teléfono suena con un número de Northline.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Northline never calls at midnight.", es: "«Northline nunca llama a medianoche»." },
        { speaker: "dani", text: "Answer it.", es: "«Contesta»." },
        { speaker: "narrator", text: "A director is on the line, and he is not happy.", es: "Un director está en la línea, y no está contento." },
      ],
      words: [
        { word: "phone", es: "teléfono" },
        { word: "midnight", es: "medianoche" },
        { word: "answer", es: "contestar" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "How long has Dani been waking up at four thirty?",
      questionEs: "¿Desde cuándo Dani se ha estado levantando a las cuatro y media?",
      options: [
        { label: "Since January of last year", emoji: "⏰" },
        { label: "Since last week", emoji: "📅" },
        { label: "Since he met Vale", emoji: "🤝" },
      ],
      answer: 0,
      sayIt: "He has been waking up early since January.",
      sayItEs: "Ejemplo: «He has been waking up early since January.»",
      sayItAskEn: "How long have you been studying English? Use: I have been studying… for/since…",
      sayItAskEs: "¿Cuánto tiempo llevas estudiando inglés? Usa: I have been studying… for/since…",
      sayItCheck: {
        target: "I have been studying * for *",
        altTargets: ["I have been studying *", "I've been studying *", "I have been studying * since *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Why did Dani never ask for a special schedule?",
      questionEs: "¿Por qué Dani nunca pidió un horario especial?",
      options: [
        { label: "He did not want special treatment", emoji: "🙇" },
        { label: "He forgot to ask", emoji: "🤔" },
        { label: "Vale said no before", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "He did not want special treatment.",
      sayItEs: "Ejemplo: «He did not want special treatment.»",
      sayItAskEn: "What have you been working toward for a long time? Use: I have been working…",
      sayItAskEs: "¿Hacia qué has estado trabajando por mucho tiempo? Usa: I have been working…",
      sayItCheck: {
        target: "I have been working *",
        altTargets: ["I've been working *", "I have been working toward *", "I have been *"],
      },
    },
    {
      id: "q3",
      afterScene: "s7",
      questionEn: "What is Dani's next step?",
      questionEs: "¿Cuál es el siguiente paso de Dani?",
      options: [
        { label: "Graduate in November and build the platform", emoji: "🎓" },
        { label: "Leave the school", emoji: "🚪" },
        { label: "Move to another country", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "He is going to graduate in November.",
      sayItEs: "Ejemplo: «He is going to graduate in November.»",
      sayItAskEn: "What have you been doing lately and what is your next step? Use: I have been… and next I…",
      sayItAskEs: "¿Qué has estado haciendo últimamente y cuál es tu siguiente paso? Usa: I have been… and next I…",
      sayItCheck: {
        target: "I have been * and next I *",
        altTargets: ["I have been *", "I've been * and next *", "I have been practicing *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "If he can do it, I can do it.",
    es: "Si él puede, yo puedo.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "I protect the hours of my long-term goal.",
    es: "Protejo las horas de mi meta de largo plazo.",
    model: "vale",
    modelActionEs: "Vale cambia el horario para que Dani salga a estudiar.",
  },
  continuePrompt: {
    en: "Tell me something you have been working on for months and why you have not stopped.",
    es: "Cuéntame algo en lo que has estado trabajando por meses y por qué no te has rendido.",
  },
  continueWith: ["I have been ...", "since ...", "and next I ..."],
  cliffhanger: {
    en: "Episode 19: A Northline director calls at midnight, and he is angry.",
    es: "Episodio 19: Un director de Northline llama a medianoche, y está molesto.",
  },
};
