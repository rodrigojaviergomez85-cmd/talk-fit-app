import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep17-show-me-dont-tell-me/s9.jpg";

export const ADVANCED1_EP17_SHOW_ME_DONT_TELL_ME: StorybookEpisode = {
  id: "advanced1-ep17-show-me-dont-tell-me",
  moduleId: "advanced-1",
  week: 4,
  title: "Show me, don't tell me",
  titleEs: "Muéstramelo, no me lo cuentes",
  episodeLabel: {
    en: "Advanced 1 · Episode 17",
    es: "Advanced 1 · Episodio 17",
  },
  previously: [
    {
      en: "The pilot is approved in principle.",
      es: "El piloto está aprobado en principio.",
    },
    {
      en: "The committee chooses who leads it, and it won't be Vale.",
      es: "El comité elige quién lo dirige, y no va a ser Vale.",
    },
    {
      en: "Two candidates. Interviews on Wednesday.",
      es: "Dos candidatos. Entrevistas el miércoles.",
    },
  ],
  reviewWords: [
    { word: "committee", es: "comité" },
    { word: "pilot", es: "plan piloto" },
    { word: "evidence", es: "evidencia" },
    { word: "candidate", es: "candidato" },
    { word: "result", es: "resultado" },
  ],
  blurb: {
    en: "Two candidates, the same three questions, and one hidden follow-up each. Barrett doesn't want to hear that Dani solves problems. She wants a Tuesday.",
    es: "Dos candidatos, las mismas tres preguntas y una repregunta escondida. Barrett no quiere oír que Dani resuelve problemas. Quiere un martes.",
  },
  cover,
  voice: "male",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale and Dani in the academy office at night, the whiteboard behind them, two mugs on the desk.",
      text: "Tuesday, 8:15 p.m.",
      es: "Martes, 8:15 p.m.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "The committee won't put me in front of the pilot. I'm the CEO now, and a CEO in the classroom is a bottleneck with a nice title.",
          es: "El comité no me va a poner al frente del piloto. Ahora soy la CEO, y una CEO en el salón es un cuello de botella con un título bonito.",
        },
        {
          speaker: "dani",
          text: "So who leads it?",
          es: "¿Entonces quién lo dirige?",
        },
        {
          speaker: "vale",
          text: "Two candidates. You and Lidia. Same three questions tomorrow, and neither of you knows which three.",
          es: "Dos candidatos. Tú y Lidia. Las mismas tres preguntas mañana, y ninguno sabe cuáles tres.",
        },
        {
          speaker: "dani",
          text: "Lidia's the better teacher.",
          es: "Lidia es mejor maestra.",
        },
        {
          speaker: "vale",
          text: "Then don't tell them what she isn't. Show them what you are.",
          es: "Entonces no les digas lo que ella no es. Muéstrales lo que tú eres.",
        },
      ],
      words: [
        { word: "bottleneck", es: "cuello de botella" },
        { word: "candidates", es: "candidatos" },
        { word: "neither", es: "ninguno de los dos" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Barrett at the head of a small Northline meeting table, a folder closed in front of her, Dani sitting across from her.",
      text: "Wednesday, 8:00 a.m. Northline.",
      es: "Miércoles, 8:00 a.m. Northline.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Three questions. Seventy-five seconds each. After each one I'll ask something you didn't prepare for.",
          es: "Tres preguntas. Setenta y cinco segundos cada una. Después de cada una te voy a preguntar algo que no preparaste.",
        },
        {
          speaker: "dani",
          text: "Understood.",
          es: "Entendido.",
        },
        {
          speaker: "barrett",
          text: "And one rule. Don't tell me you're good under pressure. Show me a Tuesday. Situation, what you did, result.",
          es: "Y una regla. No me digas que eres bueno bajo presión. Muéstrame un martes. Situación, qué hiciste, resultado.",
        },
        {
          speaker: "dani",
          text: "Show you, don't tell you.",
          es: "Mostrarle, no contarle.",
        },
        {
          speaker: "barrett",
          text: "Exactly. Adjectives are free. Tuesdays cost something.",
          es: "Exacto. Los adjetivos son gratis. Los martes cuestan algo.",
        },
      ],
      words: [
        { word: "pressure", es: "presión" },
        { word: "adjectives", es: "adjetivos" },
        { word: "rule", es: "regla" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Lidia sitting straight in the interview chair, hands folded, Barrett writing; Dani visible through the glass door in the hallway.",
      text: "Lidia goes first.",
      es: "Lidia va primero.",
      speaker: "barrett",
      cast: ["barrett", "lidia", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Tell me about a time you learned something quickly.",
          es: "Cuéntame de una vez que aprendiste algo rápido.",
        },
        {
          speaker: "lidia",
          text: "The night the platform died two hours before class. Thirty students, no system. What I did was move the whole lesson to voice notes on their phones, one question each. The result was that twenty-eight of the thirty answered, and we kept that format for the rest of the month.",
          es: "La noche que la plataforma murió dos horas antes de clase. Treinta estudiantes, sin sistema. Lo que hice fue pasar toda la lección a notas de voz en sus teléfonos, una pregunta cada uno. El resultado fue que veintiocho de los treinta respondieron, y mantuvimos ese formato el resto del mes.",
        },
        {
          speaker: "barrett",
          text: "What helped you learn it so fast?",
          es: "¿Qué te ayudó a aprenderlo tan rápido?",
        },
        {
          speaker: "lidia",
          text: "Thirty people staring at me. Fear is a very efficient teacher.",
          es: "Treinta personas mirándome. El miedo es un maestro muy eficiente.",
        },
      ],
      words: [
        { word: "platform", es: "plataforma" },
        { word: "format", es: "formato" },
        { word: "efficient", es: "eficiente" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani in the interview chair, leaning slightly forward, Barrett across the table with her pen stopped.",
      text: "Dani's turn.",
      es: "El turno de Dani.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Tell me about a time you solved a problem.",
          es: "Cuéntame de una vez que resolviste un problema.",
        },
        {
          speaker: "dani",
          text: "The week the newspaper article came out. The phone rang from nine in the morning and nobody had a system. What I did was build a call-back list and a forty-second script in one hour, and give it to everyone who could hold a phone. The result was thirty-one new students in one week.",
          es: "La semana que salió el artículo del periódico. El teléfono sonó desde las nueve de la mañana y nadie tenía un sistema. Lo que hice fue armar una lista de llamadas de vuelta y un guion de cuarenta segundos en una hora, y dárselo a todo el que pudiera sostener un teléfono. El resultado fueron treinta y un estudiantes nuevos en una semana.",
        },
        {
          speaker: "barrett",
          text: "How did you know your solution worked?",
          es: "¿Cómo supiste que tu solución funcionó?",
        },
        {
          speaker: "dani",
          text: "Because people stopped shouting? No. Let me give you the real one. Sixty people called. Thirty-one enrolled, and the other twenty-nine got a call back within a day. I checked the list myself.",
          es: "¿Porque la gente dejó de gritar? No. Le doy la de verdad. Llamaron sesenta personas. Treinta y una se inscribieron, y las otras veintinueve recibieron una llamada de vuelta en menos de un día. Yo revisé la lista.",
        },
      ],
      words: [
        { word: "script", es: "guion" },
        { word: "enrolled", es: "se inscribieron" },
        { word: "within", es: "en menos de" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Close on Dani's hands on the table and Barrett's folder, the clock on the wall reading 8:40.",
      text: "The third question.",
      es: "La tercera pregunta.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Tell me about a time you worked under pressure.",
          es: "Cuéntame de una vez que trabajaste bajo presión.",
        },
        {
          speaker: "dani",
          text: "My interview for coordinator, last year. Vale made me do it in English with no script and the whole team in the room. What I did was say each question back before I answered it, so my brain had two seconds it didn't think it had. The result was the job, and the habit.",
          es: "Mi entrevista para coordinador, el año pasado. Vale me la hizo en inglés sin guion y con todo el equipo en la sala. Lo que hice fue repetir cada pregunta antes de contestarla, para que mi cerebro tuviera dos segundos que no creía tener. El resultado fue el puesto, y el hábito.",
        },
        {
          speaker: "barrett",
          text: "What did you do to stay focused?",
          es: "¿Qué hiciste para mantenerte enfocado?",
        },
        {
          speaker: "dani",
          text: "I fell back on the list. Question, my answer, one example. When I ran out of examples, I said so instead of inventing one.",
          es: "Me apoyé en la lista. Pregunta, mi respuesta, un ejemplo. Cuando se me acabaron los ejemplos, lo dije en vez de inventar uno.",
        },
      ],
      words: [
        { word: "coordinator", es: "coordinador" },
        { word: "habit", es: "hábito" },
        { word: "focused", es: "enfocado" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani and Lidia crossing in the narrow Northline hallway, each holding a paper cup, not quite stopping.",
      text: "The hallway.",
      es: "El pasillo.",
      speaker: "lidia",
      cast: ["lidia", "dani"],
      lines: [
        {
          speaker: "lidia",
          text: "You told her the newspaper week.",
          es: "Le contaste la semana del periódico.",
        },
        {
          speaker: "dani",
          text: "You told her the platform night.",
          es: "Le contaste la noche de la plataforma.",
        },
        {
          speaker: "lidia",
          text: "We both told the truth. That's their problem now, not ours.",
          es: "Los dos dijimos la verdad. Ahora el problema es de ellos, no nuestro.",
        },
        {
          speaker: "dani",
          text: "Lidia. If it's you, I'll be fine.",
          es: "Lidia. Si eres tú, voy a estar bien.",
        },
        {
          speaker: "lidia",
          text: "I know. That's why it might be you.",
          es: "Lo sé. Por eso puede que seas tú.",
        },
      ],
      words: [
        { word: "hallway", es: "pasillo" },
        { word: "truth", es: "verdad" },
        { word: "might", es: "puede que" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Barrett and Vale standing by the window of the Northline office, the city behind them, Barrett holding the closed folder.",
      text: "After lunch.",
      es: "Después del almuerzo.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "I have a preference. It isn't the one you're expecting.",
          es: "Tengo una preferencia. No es la que estás esperando.",
        },
        {
          speaker: "vale",
          text: "Don't tell me. Tell them on Monday.",
          es: "No me lo digas. Díselo a ellos el lunes.",
        },
        {
          speaker: "barrett",
          text: "Before Monday I want to see both of them when they don't know I'm there. Anyone can think on their feet in a room with a clock.",
          es: "Antes del lunes quiero verlos a los dos cuando no saben que estoy ahí. Cualquiera piensa rápido en una sala con un reloj.",
        },
        {
          speaker: "vale",
          text: "Then you'll need to come early. This place starts at seven.",
          es: "Entonces vas a tener que venir temprano. Este lugar empieza a las siete.",
        },
      ],
      words: [
        { word: "preference", es: "preferencia" },
        { word: "expecting", es: "esperando" },
        { word: "clock", es: "reloj" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani alone in the empty academy classroom at night, recording himself on his phone propped against a stack of books; Camila in the doorway with a coffee.",
      text: "9:50 p.m. The empty classroom.",
      es: "9:50 p.m. El salón vacío.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "You know they already left.",
          es: "Sabes que ya se fueron.",
        },
        {
          speaker: "dani",
          text: "I know. I'm redoing the follow-up I fumbled. Not for them.",
          es: "Lo sé. Estoy repitiendo la repregunta que arruiné. No es para ellos.",
        },
        {
          speaker: "camila",
          text: "Which one?",
          es: "¿Cuál?",
        },
        {
          speaker: "dani",
          text: "How did you know it worked. I said 'people stopped shouting'. Out loud. To a hiring committee.",
          es: "Cómo supiste que funcionó. Dije 'la gente dejó de gritar'. En voz alta. A un comité de contratación.",
        },
        {
          speaker: "camila",
          text: "Coffee's approved. Tears are not in the budget.",
          es: "El café está aprobado. Las lágrimas no están en el presupuesto.",
        },
      ],
      words: [
        { word: "fumbled", es: "arruiné, me equivoqué" },
        { word: "follow-up", es: "repregunta" },
        { word: "hiring", es: "contratación" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Dani walking home along a quiet street at night, phone in hand, a bus passing behind him with its lights on.",
      text: "Walking home.",
      es: "De camino a casa.",
      speaker: "dani",
      cast: ["dani"],
      lines: [
        {
          speaker: "dani",
          text: "My mother texted: how did it go. I told her the truth. It was shorter than I expected.",
          es: "Mi mamá escribió: cómo te fue. Le dije la verdad. Fue más corto de lo que esperaba.",
        },
        {
          speaker: "dani",
          text: "Three Tuesdays. No adjectives. If that's not enough, then the job needs somebody else, and I'd rather find out now.",
          es: "Tres martes. Sin adjetivos. Si eso no alcanza, entonces el puesto necesita a alguien más, y prefiero saberlo ahora.",
        },
      ],
      words: [
        { word: "texted", es: "escribió (un mensaje)" },
        { word: "rather", es: "prefiero" },
        { word: "enough", es: "suficiente" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "How did Dani prove his solution worked?",
      questionEs: "¿Cómo demostró Dani que su solución funcionó?",
      options: [
        { label: "Thirty-one of the sixty callers enrolled, and he checked the list himself", emoji: "📋" },
        { label: "People stopped shouting at the office", emoji: "📣" },
        { label: "Vale told him it worked", emoji: "👩‍🏫" },
      ],
      answer: 0,
      sayIt: "Thirty-one of the sixty callers enrolled, and he checked the list himself.",
      sayItEs: "Treinta y uno de los sesenta que llamaron se inscribieron, y él mismo revisó la lista.",
      sayItCheck: {
        target: "Thirty-one of the sixty callers enrolled",
        altTargets: ["Thirty-one of the sixty", "He checked the list himself"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Tell me about a time you worked under pressure. Situation, what you did, result.",
      questionEs: "Cuéntame de una vez que trabajaste bajo presión. Situación, qué hiciste, resultado.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "The situation was a new system and forty calls in one morning. What I did was write a one-page guide and answer every call with it open. The result was zero complaints that week.",
      sayItEs: "La situación fue un sistema nuevo y cuarenta llamadas en una mañana. Lo que hice fue escribir una guía de una página y contestar cada llamada con la guía abierta. El resultado fue cero quejas esa semana.",
      sayItAskEn: "Start with \"The situation was ...\", then \"What I did was ...\", then \"The result was ...\".",
      sayItAskEs: "Empieza con \"The situation was …\", luego \"What I did was …\" y luego \"The result was …\".",
      sayItCheck: {
        target: "The situation was *",
        altTargets: ["What I did was *", "The result was *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s2",
    phrase: "My proof is a Tuesday, not an adjective.",
    es: "Mi prueba es un martes, no un adjetivo.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "When they ask how I know it worked, I name the number I checked myself.",
    es: "Cuando me preguntan cómo sé que funcionó, digo el número que yo mismo revisé.",
    model: "dani",
    modelActionEs: "Dani corrigió su respuesta a mitad de camino y dio el número real: treinta y uno de sesenta, con la lista revisada por él.",
  },
  expressions: [
    {
      phrase: "show me, don't tell me",
      variants: ["show you, don't tell you", "show them, don't tell them"],
      es: "demuéstralo, no lo digas",
      kind: "idiom",
      example: "Show you, don't tell you.",
      exampleEs: "Mostrarle, no contarle.",
    },
    {
      phrase: "fall back on",
      variants: ["fell back on", "falls back on", "falling back on"],
      es: "apoyarse en, recurrir a",
      kind: "phrasal",
      example: "I fell back on the list. Question, my answer, one example.",
      exampleEs: "Me apoyé en la lista. Pregunta, mi respuesta, un ejemplo.",
    },
    {
      phrase: "run out of",
      variants: ["ran out of", "runs out of", "running out of"],
      es: "quedarse sin",
      kind: "phrasal",
      example: "When I ran out of examples, I said so instead of inventing one.",
      exampleEs: "Cuando se me acabaron los ejemplos, lo dije en vez de inventar uno.",
    },
    {
      phrase: "think on your feet",
      variants: ["think on their feet", "think on my feet", "thinking on your feet"],
      es: "pensar rápido, improvisar bien",
      kind: "idiom",
      example: "Anyone can think on their feet in a room with a clock.",
      exampleEs: "Cualquiera piensa rápido en una sala con un reloj.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: one competency story of your own. Situation, what you did, result — and then answer the follow-up: how did you know it worked?",
    es: "Treinta segundos: una historia de competencia tuya. Situación, qué hiciste, resultado, y luego responde la repregunta: ¿cómo supiste que funcionó?",
  },
  continueWith: [
    "The situation was ...",
    "What I did was ...",
    "The result was ...",
    "I knew it worked because ...",
  ],
  cliffhanger: {
    en: "Barrett wants to see the candidates when they don't know she's there. Thursday, 6:50 a.m., there is someone in the parking lot.",
    es: "Barrett quiere ver a los candidatos cuando no saben que está ahí. Jueves, 6:50 a.m., hay alguien en el estacionamiento.",
  },
};
