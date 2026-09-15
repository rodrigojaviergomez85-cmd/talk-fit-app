import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep6-then-and-now/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep6-then-and-now/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep6-then-and-now/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep6-then-and-now/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep6-then-and-now/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep6-then-and-now/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep6-then-and-now/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep6-then-and-now/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep6-then-and-now/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep6-then-and-now/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep6-then-and-now/s10.jpg";

/**
 * Season 6 (Eagles) Episode 6 — "Then & now".
 * Eagles day 6: past progressive + present progressive (before and now).
 */
export const EAGLES_EP6_THEN_AND_NOW: StorybookEpisode = {
  id: "eagles-ep6-then-and-now",
  moduleId: "eagles-week-1",
  week: 2,
  title: "Then & now",
  titleEs: "Antes y ahora",
  episodeLabel: { en: "Season 6 · Episode 6", es: "Temporada 6 · Episodio 6" },
  previously: [
    { en: "The demo class went well.", es: "La clase de muestra salió bien." },
    { en: "Morgan said yes.", es: "Morgan dijo que sí." },
    { en: "The director was going to call.", es: "La directora iba a llamar." },
  ],
  reviewWords: [
    { word: "before", es: "antes" },
    { word: "now", es: "ahora" },
    { word: "signature", es: "firma" },
  ],
  blurb: {
    en: "The contract arrives. Vale compares the girl who was answering calls two years ago with the woman who is signing today.",
    es: "Llega el contrato. Vale compara a la muchacha que contestaba llamadas hace dos años con la mujer que firma hoy.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale abre un correo importante en la oficina, con Dani a su lado.",
      text: "Friday, 9:15. An email with a long name arrives.",
      es: "Viernes, 9:15. Llega un correo con un nombre largo.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "Friday, 9:15. An email with a long name arrives.", es: "Viernes, 9:15. Llega un correo con un nombre largo." },
        { speaker: "dani", text: "Vale. It says \"contract\" in the subject line.", es: "«Vale. Dice “contract” en el asunto»." },
        { speaker: "vale", text: "Open it. My hands are shaking.", es: "«Ábrelo. Me están temblando las manos»." },
      ],
      words: [
        { word: "email", es: "correo" },
        { word: "subject", es: "asunto" },
        { word: "shaking", es: "temblando" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "La pantalla muestra el contrato firmado por Northline.",
      text: "Six months. Thirty students. Signed.",
      es: "Seis meses. Treinta estudiantes. Firmado.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Six months. Thirty students. It's signed.", es: "«Seis meses. Treinta estudiantes. Está firmado»." },
        { speaker: "vale", text: "Two years ago I was answering calls for eight dollars an hour.", es: "«Hace dos años yo contestaba llamadas por ocho dólares la hora»." },
        { speaker: "dani", text: "And now you're signing a contract with a US company.", es: "«Y ahora estás firmando un contrato con una empresa de Estados Unidos»." },
      ],
      words: [
        { word: "signed", es: "firmado" },
        { word: "dollars", es: "dólares" },
        { word: "company", es: "empresa" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Recuerdo en tonos suaves: Vale con audífonos en su antiguo call center.",
      text: "Vale remembers a night at the call center.",
      es: "Vale recuerda una noche en el call center.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I was working nights and studying in the morning.", es: "«Yo trabajaba de noche y estudiaba en la mañana»." },
        { speaker: "vale", text: "I was repeating the same five sentences in the bus.", es: "«Repetía las mismas cinco frases en el bus»." },
        { speaker: "dani", text: "And today you're teaching those sentences to other people.", es: "«Y hoy les estás enseñando esas frases a otras personas»." },
      ],
      words: [
        { word: "nights", es: "noches" },
        { word: "repeating", es: "repitiendo" },
        { word: "bus", es: "bus" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Camila, ya recuperada, entra con una bolsa de pan dulce.",
      text: "Camila comes back to work with bread for everyone.",
      es: "Camila vuelve al trabajo con pan para todos.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "I'm feeling much better. What did I miss?", es: "«Me siento mucho mejor. ¿Qué me perdí?»" },
        { speaker: "dani", text: "On Thursday you were sleeping and we were winning a contract.", es: "«El jueves tú estabas durmiendo y nosotros estábamos ganando un contrato»." },
        { speaker: "camila", text: "You're joking.", es: "«Estás bromeando»." },
      ],
      words: [
        { word: "better", es: "mejor" },
        { word: "miss", es: "perderse" },
        { word: "joking", es: "bromeando" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale llama a su mamá desde la ventana de la oficina.",
      text: "Vale calls her mother.",
      es: "Vale llama a su mamá.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Mom, remember when I was crying after my first day?", es: "«Mamá, ¿te acuerdas cuando yo lloraba después de mi primer día?»" },
        { speaker: "mom", text: "You were crying, and you were going back the next morning.", es: "«Llorabas, y al día siguiente volvías»." },
        { speaker: "vale", text: "Well, now I'm hiring teachers.", es: "«Bueno, ahora estoy contratando maestros»." },
      ],
      words: [
        { word: "crying", es: "llorando" },
        { word: "morning", es: "mañana" },
        { word: "hiring", es: "contratando" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Mateo llega a la escuela con su uniforme de trabajo y una sonrisa.",
      text: "Mateo stops by after his shift.",
      es: "Mateo pasa después de su turno.",
      speaker: "mateo",
      lines: [
        { speaker: "mateo", text: "Last year I was hiding when the phone rang in English.", es: "«El año pasado me escondía cuando el teléfono sonaba en inglés»." },
        { speaker: "mateo", text: "Now I'm training the new people on my floor.", es: "«Ahora estoy entrenando a los nuevos en mi piso»." },
        { speaker: "vale", text: "Same person, different habits.", es: "«La misma persona, hábitos diferentes»." },
      ],
      words: [
        { word: "hiding", es: "escondiéndose" },
        { word: "training", es: "entrenando" },
        { word: "habits", es: "hábitos" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale escribe dos columnas en la pizarra: BEFORE y NOW.",
      text: "Vale writes two words on the board: before and now.",
      es: "Vale escribe dos palabras en la pizarra: antes y ahora.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Before, I was hoping. Now, I'm planning.", es: "«Antes, yo esperaba. Ahora, estoy planeando»." },
        { speaker: "camila", text: "That's a good line for the website.", es: "«Esa es una buena frase para el sitio web»." },
        { speaker: "dani", text: "That's a good line for my wall.", es: "«Esa es una buena frase para mi pared»." },
      ],
      words: [
        { word: "hoping", es: "esperando" },
        { word: "planning", es: "planeando" },
        { word: "line", es: "frase" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Los tres organizan horarios de clases en un calendario grande.",
      text: "The real work starts now.",
      es: "El trabajo de verdad empieza ahora.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Thirty students, three groups, six months.", es: "«Treinta estudiantes, tres grupos, seis meses»." },
        { speaker: "camila", text: "We're building a schedule for the first group right now.", es: "«Estamos armando el horario del primer grupo ahora mismo»." },
        { speaker: "vale", text: "And we're hiring one more teacher this month.", es: "«Y estamos contratando a un maestro más este mes»." },
      ],
      words: [
        { word: "groups", es: "grupos" },
        { word: "schedule", es: "horario" },
        { word: "month", es: "mes" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Morgan aparece en la pantalla con un mensaje corto de felicitación.",
      text: "Morgan sends one line from her office.",
      es: "Morgan envía una línea desde su oficina.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "My team was complaining about English classes last month.", es: "«Mi equipo se quejaba de las clases de inglés el mes pasado»." },
        { speaker: "morgan", text: "This week they're asking when yours start.", es: "«Esta semana están preguntando cuándo empiezan las tuyas»." },
        { speaker: "vale", text: "Monday at eight. Tell them to bring their voices.", es: "«El lunes a las ocho. Diles que traigan su voz»." },
      ],
      words: [
        { word: "complaining", es: "quejándose" },
        { word: "asking", es: "preguntando" },
        { word: "bring", es: "traer" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale, sola en la escuela al atardecer, mira la calle por la ventana.",
      text: "Seven in the evening. Vale turns off the last light.",
      es: "Siete de la noche. Vale apaga la última luz.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Two years ago I was walking home tired and scared.", es: "«Hace dos años caminaba a casa cansada y asustada»." },
        { speaker: "vale", text: "Tonight I'm walking home tired and proud.", es: "«Esta noche camino a casa cansada y orgullosa»." },
        { speaker: "narrator", text: "Same street. Different woman.", es: "La misma calle. Otra mujer." },
      ],
      words: [
        { word: "walking", es: "caminando" },
        { word: "scared", es: "asustada" },
        { word: "proud", es: "orgullosa" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What was Vale doing two years ago?",
      questionEs: "¿Qué hacía Vale hace dos años?",
      options: [
        { label: "She was working nights at a call center", emoji: "🌙" },
        { label: "She was travelling in the US", emoji: "✈️" },
        { label: "She was teaching thirty students", emoji: "🏫" },
      ],
      answer: 0,
      sayIt: "She was working nights and studying in the morning.",
      sayItEs: "Ejemplo: «She was working nights and studying in the morning.»",
      sayItAskEn: "What were you doing last year at this time? Use: Last year I was…",
      sayItAskEs: "¿Qué estabas haciendo el año pasado en esta época? Usa: Last year I was…",
      sayItCheck: {
        target: "Last year I was *",
        altTargets: ["Last year, I was *", "I was working *", "I was studying *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What is Mateo doing now?",
      questionEs: "¿Qué está haciendo Mateo ahora?",
      options: [
        { label: "He is training the new people on his floor", emoji: "🎧" },
        { label: "He is hiding from the phone", emoji: "🙈" },
        { label: "He is looking for a new job", emoji: "🔎" },
      ],
      answer: 0,
      sayIt: "Now he is training the new people on his floor.",
      sayItEs: "Ejemplo: «Now he is training the new people on his floor.»",
      sayItAskEn: "What are you doing right now to improve your English?",
      sayItAskEs: "¿Qué estás haciendo ahora mismo para mejorar tu inglés?",
      sayItCheck: {
        target: "Right now I am *",
        altTargets: ["Right now I'm *", "I am practicing *", "I'm studying *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What did Morgan say about her team?",
      questionEs: "¿Qué dijo Morgan sobre su equipo?",
      options: [
        { label: "Last month they were complaining, this week they're asking about the classes", emoji: "🔄" },
        { label: "They cancelled the contract", emoji: "❌" },
        { label: "They were on vacation", emoji: "🏖️" },
      ],
      answer: 0,
      sayIt: "Last month they were complaining. This week they're asking about the classes.",
      sayItEs: "Ejemplo: «Last month they were complaining. This week they're asking about the classes.»",
      sayItAskEn: "Tell me one thing that interrupted you yesterday. Use: I was… when…",
      sayItAskEs: "Cuéntame algo que te interrumpió ayer. Usa: I was… when…",
      sayItCheck: {
        target: "I was * when *",
        altTargets: ["Yesterday I was * when *", "I was working when *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "Everything is possible with effort.",
    es: "Todo es posible con esfuerzo.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "I look back on purpose. Seeing my progress keeps me going.",
    es: "Miro atrás a propósito. Ver mi progreso me mantiene avanzando.",
    model: "vale",
    modelActionEs: "Vale compara lo que hacía antes con lo que está haciendo ahora.",
  },
  continuePrompt: {
    en: "Compare your life then and now. What were you doing one year ago? What are you doing today? What is different?",
    es: "Compara tu vida antes y ahora. ¿Qué estabas haciendo hace un año? ¿Qué estás haciendo hoy? ¿Qué es diferente?",
  },
  continueWith: ["Last year I was ...", "Right now I am ...", "I was ... when ..."],
  cliffhanger: {
    en: "Episode 7: The first corporate class starts — and one student has never spoken English out loud.",
    es: "Episodio 7: Empieza la primera clase corporativa… y un estudiante nunca ha hablado inglés en voz alta.",
  },
};
