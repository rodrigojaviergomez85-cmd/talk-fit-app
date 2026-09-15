import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep8-how-long/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep8-how-long/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep8-how-long/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep8-how-long/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep8-how-long/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep8-how-long/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep8-how-long/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep8-how-long/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep8-how-long/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep8-how-long/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep8-how-long/s10.jpg";

/**
 * Season 6 (Eagles) Episode 8 — "How long have you been…?".
 * Eagles day 8: present perfect progressive (effort, challenge, progress).
 */
export const EAGLES_EP8_HOW_LONG: StorybookEpisode = {
  id: "eagles-ep8-how-long",
  moduleId: "eagles-week-1",
  week: 2,
  title: "How long have you been…?",
  titleEs: "¿Cuánto tiempo llevas…?",
  episodeLabel: { en: "Season 6 · Episode 8", es: "Temporada 6 · Episodio 8" },
  previously: [
    { en: "The first corporate class went well.", es: "La primera clase corporativa salió bien." },
    { en: "Beto said his first sentence.", es: "Beto dijo su primera oración." },
    { en: "His shift moved to the morning.", es: "Su turno cambió a la mañana." },
  ],
  reviewWords: [
    { word: "long", es: "largo / cuánto tiempo" },
    { word: "since", es: "desde" },
    { word: "effort", es: "esfuerzo" },
  ],
  blurb: {
    en: "Vale has been sleeping four hours a night. The team asks how long she can keep going like this.",
    es: "Vale ha estado durmiendo cuatro horas por noche. El equipo pregunta cuánto puede seguir así.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale sleeps with her head on the office desk at sunrise.",
      text: "Tuesday, 6:40. Dani finds Vale asleep on the desk.",
      es: "Martes, 6:40. Dani encuentra a Vale dormida en el escritorio.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "Tuesday, 6:40. Dani finds Vale asleep on the desk.", es: "Martes, 6:40. Dani encuentra a Vale dormida en el escritorio." },
        { speaker: "dani", text: "How long have you been working here?", es: "«¿Cuánto tiempo llevas trabajando aquí?»" },
        { speaker: "vale", text: "Since eleven. I have been fixing the schedule all night.", es: "«Desde las once. He estado arreglando el horario toda la noche»." },
      ],
      words: [
        { word: "asleep", es: "dormida" },
        { word: "since", es: "desde" },
        { word: "night", es: "noche" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "A messy schedule with many colored notes covers the office wall.",
      text: "Six schedules. None of them work.",
      es: "Seis horarios. Ninguno funciona.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I have been trying six versions since Sunday.", es: "«He estado probando seis versiones desde el domingo»." },
        { speaker: "dani", text: "And you have been carrying this alone. That's the real problem.", es: "«Y has estado cargando esto sola. Ese es el problema de verdad»." },
        { speaker: "vale", text: "You're right. I have been forgetting that I have a team.", es: "«Tienes razón. He estado olvidando que tengo un equipo»." },
      ],
      words: [
        { word: "trying", es: "probando" },
        { word: "carrying", es: "cargando" },
        { word: "team", es: "equipo" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Camila arrives with two coffees and takes half of the notes.",
      text: "Camila takes half of the wall.",
      es: "Camila se lleva la mitad de la pared.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "How long have you been doing this without me?", es: "«¿Cuánto tiempo llevas haciendo esto sin mí?»" },
        { speaker: "vale", text: "Three days. I have been protecting you since you were sick.", es: "«Tres días. Te he estado protegiendo desde que te enfermaste»." },
        { speaker: "camila", text: "I have been feeling fine since Friday. Give me the morning group.", es: "«Me he estado sintiendo bien desde el viernes. Dame el grupo de la mañana»." },
      ],
      words: [
        { word: "without", es: "sin" },
        { word: "protecting", es: "protegiendo" },
        { word: "sick", es: "enferma" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Beto talks to Vale at the school entrance before work.",
      text: "Beto comes early to explain.",
      es: "Beto llega temprano a explicar.",
      speaker: "beto",
      lines: [
        { speaker: "beto", text: "I have been asking my manager for two days.", es: "«Llevo dos días pidiéndoselo a mi jefe»." },
        { speaker: "beto", text: "He says no. I have been thinking about leaving the class.", es: "«Dice que no. He estado pensando en dejar la clase»." },
        { speaker: "vale", text: "Wait. Don't quit a class because of a schedule.", es: "«Espera. No dejes una clase por un horario»." },
      ],
      words: [
        { word: "asking", es: "pidiendo" },
        { word: "leaving", es: "dejar" },
        { word: "quit", es: "renunciar / dejar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale writes a new group time on the whiteboard: seven p.m.",
      text: "Vale opens a second time slot.",
      es: "Vale abre un segundo horario.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Seven in the evening. Camila has been teaching that hour for a year.", es: "«Siete de la noche. Camila lleva un año enseñando a esa hora»." },
        { speaker: "camila", text: "I have been waiting for a group like this.", es: "«He estado esperando un grupo así»." },
        { speaker: "beto", text: "Then I have been worrying for nothing.", es: "«Entonces he estado preocupándome por nada»." },
      ],
      words: [
        { word: "evening", es: "la noche (temprano)" },
        { word: "waiting", es: "esperando" },
        { word: "worrying", es: "preocupándose" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Morgan on a video call listens while Vale explains the new plan.",
      text: "Vale calls Morgan before lunch.",
      es: "Vale llama a Morgan antes del almuerzo.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "How long have you been fixing this?", es: "«¿Cuánto tiempo llevas arreglando esto?»" },
        { speaker: "vale", text: "Two nights. But we have been solving it as a team today.", es: "«Dos noches. Pero hoy lo hemos estado resolviendo en equipo»." },
        { speaker: "morgan", text: "That answer is why I signed with you.", es: "«Esa respuesta es la razón por la que firmé contigo»." },
      ],
      words: [
        { word: "fixing", es: "arreglando" },
        { word: "solving", es: "resolviendo" },
        { word: "answer", es: "respuesta" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mateo eats lunch with Vale at a small table in the school.",
      text: "Mateo brings lunch and an opinion.",
      es: "Mateo trae almuerzo y una opinión.",
      speaker: "mateo",
      lines: [
        { speaker: "mateo", text: "You have been sleeping four hours. I have been counting.", es: "«Has estado durmiendo cuatro horas. He estado contando»." },
        { speaker: "vale", text: "I have been building something. It's normal.", es: "«He estado construyendo algo. Es normal»." },
        { speaker: "mateo", text: "Tired teachers make tired classes. Sleep tonight.", es: "«Maestras cansadas hacen clases cansadas. Duerme esta noche»." },
      ],
      words: [
        { word: "sleeping", es: "durmiendo" },
        { word: "counting", es: "contando" },
        { word: "tired", es: "cansada" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani shows Vale a simple color-coded schedule on a tablet.",
      text: "Dani has been building something too.",
      es: "Dani también ha estado construyendo algo.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "I have been learning a scheduling app since Saturday.", es: "«He estado aprendiendo una app de horarios desde el sábado»." },
        { speaker: "dani", text: "It took me eleven hours. Now it takes us two minutes.", es: "«Me tomó once horas. Ahora nos toma dos minutos»." },
        { speaker: "vale", text: "You have been doing homework nobody asked for.", es: "«Has estado haciendo tarea que nadie te pidió»." },
      ],
      words: [
        { word: "learning", es: "aprendiendo" },
        { word: "hours", es: "horas" },
        { word: "homework", es: "tarea" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "The evening group arrives at the school with backpacks.",
      text: "Seven p.m. The new group arrives.",
      es: "Siete de la noche. Llega el grupo nuevo.",
      speaker: "kat",
      lines: [
        { speaker: "kat", text: "I have been waiting for a class after work for years.", es: "«Llevo años esperando una clase después del trabajo»." },
        { speaker: "beto", text: "I have been practicing my sentence all day.", es: "«He estado practicando mi oración todo el día»." },
        { speaker: "vale", text: "Then say it loud. Mistakes are part of the process.", es: "«Entonces dila fuerte. Los errores son parte del proceso»." },
      ],
      words: [
        { word: "years", es: "años" },
        { word: "practicing", es: "practicando" },
        { word: "loud", es: "fuerte" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale turns off the lights and looks at a message on her phone.",
      text: "Nine p.m. Vale is finally going home.",
      es: "Nueve de la noche. Vale por fin se va a casa.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I have been working for fourteen hours and I am not tired.", es: "«He estado trabajando catorce horas y no estoy cansada»." },
        { speaker: "dani", text: "Read your messages. The director of Northline wrote.", es: "«Lee tus mensajes. Escribió el director de Northline»." },
        { speaker: "narrator", text: "The message has only four words: \"We need to talk.\"", es: "El mensaje tiene solo cuatro palabras: «We need to talk»." },
      ],
      words: [
        { word: "hours", es: "horas" },
        { word: "messages", es: "mensajes" },
        { word: "director", es: "director" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "How long has Vale been fixing the schedule?",
      questionEs: "¿Cuánto tiempo lleva Vale arreglando el horario?",
      options: [
        { label: "She has been trying six versions since Sunday", emoji: "🗓️" },
        { label: "She has been resting since Sunday", emoji: "😴" },
        { label: "She has not started yet", emoji: "🚫" },
      ],
      answer: 0,
      sayIt: "She has been trying six versions since Sunday.",
      sayItEs: "Ejemplo: «She has been trying six versions since Sunday.»",
      sayItAskEn: "How long have you been studying English? Use: I have been studying English for…",
      sayItAskEs: "¿Cuánto tiempo llevas estudiando inglés? Usa: I have been studying English for…",
      sayItCheck: {
        target: "I have been studying English *",
        altTargets: ["I've been studying English *", "I have been studying *", "I have been learning English *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Why does Beto stop worrying?",
      questionEs: "¿Por qué Beto deja de preocuparse?",
      options: [
        { label: "There is an evening group at seven", emoji: "🌆" },
        { label: "His manager changed his mind", emoji: "🔁" },
        { label: "The class was cancelled", emoji: "❌" },
      ],
      answer: 0,
      sayIt: "He has been worrying for nothing. There is an evening group.",
      sayItEs: "Ejemplo: «He has been worrying for nothing. There is an evening group.»",
      sayItAskEn: "What have you been working on lately? Use: I have been working on…",
      sayItAskEs: "¿En qué has estado trabajando últimamente? Usa: I have been working on…",
      sayItCheck: {
        target: "I have been working on *",
        altTargets: ["I've been working on *", "I have been working *", "I have been practicing *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What has Dani been learning since Saturday?",
      questionEs: "¿Qué ha estado aprendiendo Dani desde el sábado?",
      options: [
        { label: "A scheduling app that saves them time", emoji: "📱" },
        { label: "A new language", emoji: "🗣️" },
        { label: "How to drive", emoji: "🚗" },
      ],
      answer: 0,
      sayIt: "He has been learning a scheduling app since Saturday.",
      sayItEs: "Ejemplo: «He has been learning a scheduling app since Saturday.»",
      sayItAskEn: "What have you been practicing this week? Use: This week I have been…",
      sayItAskEs: "¿Qué has estado practicando esta semana? Usa: This week I have been…",
      sayItCheck: {
        target: "This week I have been *",
        altTargets: ["I have been *", "I've been *", "This week I've been *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "Mistakes are part of the process.",
    es: "Los errores son parte del proceso.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "I ask for help early. Carrying everything alone is not strength.",
    es: "Pido ayuda temprano. Cargar todo sola no es fortaleza.",
    model: "camila",
    modelActionEs: "Camila toma la mitad del trabajo de Vale sin pedir permiso.",
  },
  continuePrompt: {
    en: "Talk about your effort. What have you been doing for a long time? What has been difficult? What progress have you seen?",
    es: "Habla de tu esfuerzo. ¿Qué has estado haciendo por mucho tiempo? ¿Qué ha sido difícil? ¿Qué avance has visto?",
  },
  continueWith: ["I have been ... for ...", "It has been difficult because ...", "I have seen progress in ..."],
  cliffhanger: {
    en: "Episode 9: \"We need to talk.\" A corporate student complains — and the director wants an answer today.",
    es: "Episodio 9: «We need to talk». Un estudiante corporativo se queja… y el director quiere una respuesta hoy.",
  },
};
