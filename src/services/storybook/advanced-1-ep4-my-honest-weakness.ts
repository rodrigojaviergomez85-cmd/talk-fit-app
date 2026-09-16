import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep4-my-honest-weakness/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep4-my-honest-weakness/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep4-my-honest-weakness/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep4-my-honest-weakness/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep4-my-honest-weakness/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep4-my-honest-weakness/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep4-my-honest-weakness/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep4-my-honest-weakness/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep4-my-honest-weakness/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep4-my-honest-weakness/s9.jpg";

export const ADVANCED1_EP4_MY_HONEST_WEAKNESS: StorybookEpisode = {
  id: "advanced1-ep4-my-honest-weakness",
  moduleId: "advanced-1",
  week: 1,
  title: "My honest weakness",
  titleEs: "Mi debilidad honesta",
  episodeLabel: {
    en: "Advanced 1 · Episode 4",
    es: "Advanced 1 · Episodio 4",
  },
  previously: [
    {
      en: "Each member of the team defended their value with a strength and a fact.",
      es: "Cada miembro del equipo defendió su valor con una fortaleza y un hecho.",
    },
    {
      en: "The committee said the team speaks like owners.",
      es: "El comité dijo que el equipo habla como dueños.",
    },
    {
      en: "Now one member wants the uncomfortable question: a real weakness.",
      es: "Ahora un miembro quiere la pregunta incómoda: una debilidad real.",
    },
  ],
  reviewWords: [
    { word: "value", es: "valor" },
    { word: "proof", es: "prueba" },
    { word: "strength", es: "fortaleza" },
    { word: "hire", es: "contratar" },
    { word: "role", es: "rol; papel" },
  ],
  blurb: {
    en: "Vale must name a real weakness in front of nine competing academies, without destroying herself and without lying.",
    es: "Vale debe nombrar una debilidad real frente a nueve academias competidoras, sin destruirse y sin mentir.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale, Dani and Camila talk late at night in the academy office with one warm lamp on.",
      text: "The night before. Vale wants to give the easy answer.",
      es: "La noche anterior. Vale quiere dar la respuesta fácil.",
      speaker: "dani",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "What weakness are you going to say? And do not say I work too hard, everyone says that.",
          es: "¿Qué debilidad vas a decir? Y no digas trabajo demasiado, todos dicen eso.",
        },
        {
          speaker: "vale",
          text: "If I wanted the easy route, I would say I am a perfectionist. But that answer has been used by every candidate since the nineties.",
          es: "Si quisiera el camino fácil, diría que soy perfeccionista. Pero esa respuesta ha sido usada por todos los candidatos desde los noventa.",
        },
        {
          speaker: "camila",
          text: "Exactly; that is a strength wearing a costume, and that costume has been seen a thousand times by this committee.",
          es: "Exacto; esa es una fortaleza disfrazada, y ese disfraz ha sido visto mil veces por este comité.",
        },
      ],
      words: [
        { word: "weakness", es: "debilidad" },
        { word: "perfectionist", es: "perfeccionista" },
        { word: "costume", es: "disfraz" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mr. Reed explains the three parts of a weakness answer from the laptop screen while Vale writes them down.",
      text: "Reed gives the formula: real weakness, action, progress.",
      es: "Reed da la fórmula: debilidad real, acción, progreso.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Vale, a weakness answer has three parts. A real weakness, what you are doing about it, and the progress you already made.",
          es: "Vale, una respuesta de debilidad tiene tres partes. Una debilidad real, lo que estás haciendo al respecto, y el progreso que ya lograste.",
        },
        {
          speaker: "vale",
          text: "No costumes, then. That is the same rule I give my students: what convinces a listener is not the weakness itself but the plan attached to it.",
          es: "Sin disfraces, entonces. Esa es la misma regla que les doy a mis estudiantes: lo que convence a quien escucha no es la debilidad en sí, sino el plan que va con ella.",
        },
        {
          speaker: "reed",
          text: "Choose one that is true but not fatal. Nobody trusts a person with no weakness; however, nobody hires a disaster either.",
          es: "Elige una que sea verdadera pero no fatal. Nadie confía en una persona sin debilidades; sin embargo, nadie contrata un desastre tampoco.",
        },
      ],
      words: [
        { word: "progress", es: "progreso" },
        { word: "fatal", es: "fatal; mortal" },
        { word: "disaster", es: "desastre" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale looks at a spreadsheet on her screen with tired eyes while Camila and Dani stand beside her.",
      text: "The honest answer appears, and it is not pretty.",
      es: "La respuesta honesta aparece, y no es bonita.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Fine. Honest answer: cold numbers. What slows me down are spreadsheets with no faces in them; when a report is only numbers, my brain falls asleep.",
          es: "Bien. Respuesta honesta: los números fríos. Lo que me frena son las hojas de cálculo sin caras; cuando un reporte solo tiene números, mi cerebro se duerme.",
        },
        {
          speaker: "camila",
          text: "That is true. You once read the same budget line five times and then asked me what it meant.",
          es: "Eso es verdad. Una vez leíste la misma línea del presupuesto cinco veces y luego me preguntaste qué significaba.",
        },
        {
          speaker: "dani",
          text: "It is real, although it is not fatal, because a system was built to back it up. That is the second part of the answer.",
          es: "Es real, aunque no es fatal, porque se construyó un sistema para respaldarlo. Esa es la segunda parte de la respuesta.",
        },
      ],
      words: [
        { word: "spreadsheets", es: "hojas de cálculo" },
        { word: "brain", es: "cerebro" },
        { word: "budget", es: "presupuesto" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani and Vale review a financial report together at the desk in the morning light.",
      text: "The system and the progress: a small victory that is completely hers.",
      es: "El sistema y el progreso: una pequeña victoria que es completamente suya.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "dani",
          text: "Tell them what you do about it.",
          es: "Diles qué haces al respecto.",
        },
        {
          speaker: "vale",
          text: "Every financial report is reviewed with Camila, who translates the numbers into stories about students, and I have been taking a course on reading data since January.",
          es: "Cada reporte financiero se revisa con Camila, que traduce los números en historias sobre estudiantes, y he estado tomando un curso de lectura de datos desde enero.",
        },
        {
          speaker: "vale",
          text: "Last month I caught an error in the Mexico budget before anyone else did. If I had not been training myself, that error would have reached the board. Small victory, but mine.",
          es: "El mes pasado detecté un error en el presupuesto de México antes que nadie. Si no me hubiera estado entrenando, ese error habría llegado al consejo. Pequeña victoria, pero mía.",
        },
      ],
      words: [
        { word: "financial", es: "financiero" },
        { word: "course", es: "curso" },
        { word: "error", es: "error" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Camila plays the committee with a serious face while Vale answers standing up in rehearsal.",
      text: "Rehearsal under pressure. The three parts fit in one answer.",
      es: "Ensayo bajo presión. Las tres partes caben en una sola respuesta.",
      speaker: "camila",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "Committee mode. Vale, what is your greatest weakness?",
          es: "Modo comité. Vale, ¿cuál es tu mayor debilidad?",
        },
        {
          speaker: "vale",
          text: "Cold numbers. What I have done about it is build a routine: every financial report is reviewed with a teammate who turns data into student stories, and I have been studying data analysis for six months.",
          es: "Los números fríos. Lo que he hecho al respecto es construir una rutina: cada reporte financiero se revisa con una compañera que convierte los datos en historias de estudiantes, y llevo seis meses estudiando análisis de datos.",
        },
        {
          speaker: "camila",
          text: "Real weakness, action, progress. Even I would hire you.",
          es: "Debilidad real, acción, progreso. Hasta yo te contrataría.",
        },
      ],
      words: [
        { word: "teammate", es: "compañera de equipo" },
        { word: "data", es: "datos" },
        { word: "hire", es: "contratar" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale answers the committee on Wednesday's video call, calm in front of her laptop.",
      text: "Wednesday. The question arrives, and Vale does not hide.",
      es: "Miércoles. Llega la pregunta, y Vale no se esconde.",
      speaker: "vale",
      cast: ["vale"],
      lines: [
        {
          speaker: "narrator",
          text: "A committee member says: Vale, every academy told us their strengths. Tell us a weakness.",
          es: "Un miembro del comité dice: Vale, todas las academias nos dijeron sus fortalezas. Dinos una debilidad.",
        },
        {
          speaker: "vale",
          text: "Cold numbers. Reports without faces make my brain fall asleep.",
          es: "Los números fríos. Los reportes sin caras hacen que mi cerebro se duerma.",
        },
        {
          speaker: "vale",
          text: "So every report is now reviewed with a teammate, I have been taking a data course since January, and last month a budget error was caught by me before anyone else saw it. Had I ignored this weakness, it would have cost us the Mexico launch.",
          es: "Así que ahora cada reporte se revisa con una compañera, he estado tomando un curso de datos desde enero, y el mes pasado un error de presupuesto fue detectado por mí antes de que nadie lo viera. Si hubiera ignorado esta debilidad, nos habría costado el lanzamiento de México.",
        },
      ],
      words: [
        { word: "reports", es: "reportes; informes" },
        { word: "faces", es: "caras" },
        { word: "budget", es: "presupuesto" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mr. Reed smiles with approval on the laptop screen while Vale breathes out after her answer.",
      text: "The committee heard nine answers today. Only one was honest.",
      es: "El comité escuchó nueve respuestas hoy. Solo una fue honesta.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "narrator",
          text: "A committee member says: that is the first honest answer we heard today. Two academies said perfectionism.",
          es: "Un miembro del comité dice: esa es la primera respuesta honesta que escuchamos hoy. Dos academias dijeron perfeccionismo.",
        },
        {
          speaker: "vale",
          text: "Perfectionism is not a weakness; it is a costume. We are all imperfect, and what we do here is measure the gap and close it, which is exactly what I ask of every student.",
          es: "El perfeccionismo no es una debilidad; es un disfraz. Todos somos imperfectos, y lo que hacemos aquí es medir la brecha y cerrarla, que es exactamente lo que le pido a cada estudiante.",
        },
        {
          speaker: "reed",
          text: "Well done, Vale. Honesty with a system behind it.",
          es: "Bien hecho, Vale. Honestidad con un sistema detrás.",
        },
      ],
      words: [
        { word: "honesty", es: "honestidad" },
        { word: "imperfect", es: "imperfectos" },
        { word: "system", es: "sistema" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani looks at his full calendar on the screen while Camila teases him and Vale laughs.",
      text: "Now Dani has to find his own honest weakness.",
      es: "Ahora Dani tiene que encontrar su propia debilidad honesta.",
      speaker: "dani",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "I need to find my own real weakness before they ask me. Yours was annoyingly good.",
          es: "Necesito encontrar mi propia debilidad real antes de que me pregunten. La tuya fue irritantemente buena.",
        },
        {
          speaker: "camila",
          text: "Yours is easy, Dani. You say yes to every task until your calendar cries.",
          es: "La tuya es fácil, Dani. Dices sí a cada tarea hasta que tu calendario llora.",
        },
        {
          speaker: "vale",
          text: "See? Honest, not fatal, and fixable. This formula works for everyone.",
          es: "¿Ves? Honesta, no fatal, y arreglable. Esta fórmula funciona para todos.",
        },
      ],
      words: [
        { word: "task", es: "tarea" },
        { word: "calendar", es: "calendario" },
        { word: "fixable", es: "arreglable" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed announces the Friday pressure round from the laptop screen while the team listens, nervous.",
      text: "Friday will not be a conversation. It will be a pressure round.",
      es: "El viernes no será una conversación. Será una ronda de presión.",
      speaker: "reed",
      cast: ["vale", "camila", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Vale, week one ends with a pressure round on Friday. I will play a difficult recruiter. Fast questions, interruptions, no mercy.",
          es: "Vale, la semana uno termina con una ronda de presión el viernes. Yo haré de reclutador difícil. Preguntas rápidas, interrupciones, sin piedad.",
        },
        {
          speaker: "reed",
          text: "Bring your whole team. I want to hear how you sound when there is no time to think.",
          es: "Trae a todo tu equipo. Quiero escuchar cómo suenan cuando no hay tiempo para pensar.",
        },
        {
          speaker: "camila",
          text: "No mercy. He said it with a smile, Vale. He smiled.",
          es: "Sin piedad. Lo dijo sonriendo, Vale. Sonrió.",
        },
      ],
      words: [
        { word: "pressure", es: "presión" },
        { word: "recruiter", es: "reclutador" },
        { word: "mercy", es: "piedad" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What are the three parts of a good weakness answer?",
      questionEs: "¿Cuáles son las tres partes de una buena respuesta de debilidad?",
      options: [
        { label: "A joke, an excuse, and a promise", emoji: "😅" },
        { label: "A real weakness, what you do about it, and your progress", emoji: "📈" },
        { label: "A strength that sounds like a weakness", emoji: "🎭" },
      ],
      answer: 1,
      sayIt: "A real weakness, what you do about it, and your progress.",
      sayItEs: "Una debilidad real, lo que haces al respecto y tu progreso.",
      sayItCheck: {
        target: "A real weakness, what you do about it, and your progress",
        altTargets: [
          "A real weakness what I do about it and my progress",
          "Real weakness, action, and progress",
        ],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Your turn: name a real weakness, what you have been doing about it, and the progress you can prove.",
      questionEs: "Tu turno: nombra una debilidad real, qué has estado haciendo al respecto y el progreso que puedes demostrar.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "My weakness is speaking too fast when I am nervous. I have been recording myself every morning, and although I am not perfect yet, my last presentation was understood by everyone in the room.",
      sayItEs: "Mi debilidad es hablar demasiado rápido cuando estoy nervioso. He estado grabándome cada mañana y, aunque todavía no soy perfecto, mi última presentación fue entendida por todos en la sala.",
      sayItAskEn: "What is your weakness, what have you been doing about it, and what progress can you prove?",
      sayItAskEs: "¿Cuál es tu debilidad, qué has estado haciendo al respecto y qué progreso puedes demostrar?",
      sayItCheck: {
        target: "My weakness is *",
        altTargets: ["One of my weaknesses is *", "I am working on *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "Honesty with a system behind it is not a risk; it is credibility.",
    es: "La honestidad con un sistema detrás no es un riesgo; es credibilidad.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "I say my weakness with the action and the progress next to it.",
    es: "Digo mi debilidad con la acción y el progreso al lado.",
    model: "reed",
    modelActionEs: "Reed le pidió a Vale una debilidad verdadera pero no fatal, con un plan detrás.",
  },
  expressions: [
    {
      phrase: "fall asleep",
      variants: ["falls asleep", "fell asleep", "falling asleep"],
      es: "quedarse dormido",
      kind: "phrasal",
      example: "When a report is only numbers, my brain falls asleep.",
      exampleEs: "Cuando un reporte solo tiene números, mi cerebro se duerme.",
    },
    {
      phrase: "back up",
      variants: ["backs up", "backed up", "backing up"],
      es: "respaldar; apoyar",
      kind: "phrasal",
      example: "You built a system to back it up.",
      exampleEs: "Construiste un sistema para respaldarlo.",
    },
    {
      phrase: "wear a costume",
      variants: ["wearing a costume", "wears a costume"],
      es: "disfrazarse; presentar algo disfrazado",
      kind: "idiom",
      example: "That is a strength wearing a costume.",
      exampleEs: "Esa es una fortaleza disfrazada.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Answer honestly: what is your weakness, what are you doing about it, and what progress do you have?",
    es: "Responde con honestidad: ¿cuál es tu debilidad, qué estás haciendo al respecto y qué progreso tienes?",
  },
  continueWith: [
    "My weakness is ...",
    "What I do about it is ...",
    "Last month I ...",
  ],
  cliffhanger: {
    en: "On Friday, Reed becomes a difficult recruiter: fast questions, interruptions, and no mercy.",
    es: "El viernes, Reed se convierte en un reclutador difícil: preguntas rápidas, interrupciones y sin piedad.",
  },
};
