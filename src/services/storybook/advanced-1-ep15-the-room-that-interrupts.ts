import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep15-the-room-that-interrupts/s9.jpg";

export const ADVANCED1_EP15_THE_ROOM_THAT_INTERRUPTS: StorybookEpisode = {
  id: "advanced1-ep15-the-room-that-interrupts",
  moduleId: "advanced-1",
  week: 3,
  title: "The room that interrupts",
  titleEs: "La sala que interrumpe",
  episodeLabel: {
    en: "Advanced 1 · Episode 15",
    es: "Advanced 1 · Episodio 15",
  },
  previously: [
    {
      en: "Vale protected class size and closed the price at nine per cent.",
      es: "Vale protegió el tamaño del grupo y cerró el precio en nueve por ciento.",
    },
    {
      en: "Friday's panel includes two people she has not convinced.",
      es: "El panel del viernes incluye a dos personas que no ha convencido.",
    },
    {
      en: "And Crown presents in the same room, right after her.",
      es: "Y Crown presenta en la misma sala, justo después de ella.",
    },
  ],
  reviewWords: [
    { word: "panel", es: "panel" },
    { word: "evidence", es: "evidencia" },
    { word: "assumption", es: "suposición" },
    { word: "pilot", es: "plan piloto" },
    { word: "pressure", es: "presión" },
  ],
  blurb: {
    en: "Three people interrupt her on purpose. Vale doesn't win the argument — she finishes it.",
    es: "Tres personas la interrumpen a propósito. Vale no gana la discusión: la termina.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Camila, Vale and Dani prepare for the hostile panel early in the morning.",
      text: "The rule for a room that interrupts.",
      es: "La regla para una sala que interrumpe.",
      speaker: "camila",
      cast: ["camila", "vale", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "They'll interrupt in the first twenty seconds. Don't restart your sentence; finish the idea and then take their question.",
          es: "Interrumpirán en los primeros veinte segundos. No reinicies la frase; termina la idea y luego toma su pregunta.",
        },
        {
          speaker: "dani",
          text: "And if they ask something you can't answer?",
          es: "¿Y si preguntan algo que no puedes responder?",
        },
        {
          speaker: "vale",
          text: "Then I say what I do know, say what I'd need to check, and keep talking. Silence is the only answer that loses the room.",
          es: "Entonces digo lo que sí sé, digo qué necesitaría verificar, y sigo hablando. El silencio es la única respuesta que pierde la sala.",
        },
        {
          speaker: "camila",
          text: "Whatever they throw at you, the order is the same: stay calm, answer, support it with a number, and keep talking.",
          es: "Sea lo que sea que te lancen, el orden es el mismo: mantén la calma, responde, respáldalo con un número y sigue hablando.",
        },
      ],
      words: [
        { word: "interrupt", es: "interrumpir" },
        { word: "restart", es: "reiniciar" },
        { word: "lose the room", es: "perder a la audiencia" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Barrett opens the panel and warns Vale that she will be interrupted.",
      text: "Round one: why this contract.",
      es: "Ronda uno: por qué este contrato.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Why this contract, in thirty seconds, and I will interrupt you.",
          es: "¿Por qué este contrato, en treinta segundos? Y la voy a interrumpir.",
        },
        {
          speaker: "vale",
          text: "Because you lose six hundred agents a year to English on live calls, and my method is measured in the one thing that fixes it —",
          es: "Porque pierden seiscientos agentes al año por el inglés en llamadas en vivo, y mi método se mide en la única cosa que lo arregla…",
        },
        {
          speaker: "barrett",
          text: "Speaking minutes. We've heard it. What if the minutes go up and attrition doesn't?",
          es: "Minutos hablados. Ya lo oímos. ¿Y si los minutos suben y la deserción no baja?",
        },
        {
          speaker: "vale",
          text: "Then the problem isn't English, and I'd tell you that in month two rather than bill you for a year finding out.",
          es: "Entonces el problema no es el inglés, y se los diría en el mes dos en vez de cobrarles un año para descubrirlo.",
        },
        {
          speaker: "vale",
          text: "What I'm selling isn't optimism; it's a measurement you can cancel the moment it stops moving.",
          es: "Lo que vendo no es optimismo; es una medición que pueden cancelar en el momento en que deje de moverse.",
        },
      ],
      words: [
        { word: "attrition", es: "deserción" },
        { word: "measured", es: "medido" },
        { word: "bill", es: "cobrar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Barrett brings up the course Vale closed two years ago.",
      text: "Round two: the failure, again.",
      es: "Ronda dos: el fracaso, otra vez.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "You closed a course. Why should we believe this one survives?",
          es: "Cerró un curso. ¿Por qué deberíamos creer que este sobrevive?",
        },
        {
          speaker: "vale",
          text: "Because the course I closed is the reason this one is measured. Had I never closed it, I'd still be selling vocabulary lists, and you'd be right to worry.",
          es: "Porque el curso que cerré es la razón por la que este se mide. Si nunca lo hubiera cerrado, seguiría vendiendo listas de vocabulario, y tendrían razón en preocuparse.",
        },
        {
          speaker: "barrett",
          text: "That's been noted. It's also the first answer today that wasn't rehearsed.",
          es: "Eso queda registrado. También es la primera respuesta de hoy que no estaba ensayada.",
        },
      ],
      words: [
        { word: "survives", es: "sobrevive" },
        { word: "worry", es: "preocuparse" },
        { word: "rehearsed", es: "ensayada" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Reed asks Vale the personal question in front of the panel.",
      text: "Round three: the criticism.",
      es: "Ronda tres: la crítica.",
      speaker: "reed",
      cast: ["reed", "vale"],
      lines: [
        {
          speaker: "reed",
          text: "What would a former colleague criticise about you? And it has to be true.",
          es: "¿Qué criticaría de ti un excolega? Y tiene que ser cierto.",
        },
        {
          speaker: "vale",
          text: "That I move too fast when I'm certain. I once launched a level without piloting it, so now nothing launches unless two teachers have taught it first.",
          es: "Que me muevo demasiado rápido cuando estoy segura. Una vez lancé un nivel sin pilotearlo, así que ahora nada se lanza si dos maestros no lo han enseñado antes.",
        },
        {
          speaker: "reed",
          text: "Which is why the level your teachers run today was tested twice before a student ever saw it.",
          es: "Por eso el nivel que tus maestros dan hoy fue probado dos veces antes de que un estudiante lo viera.",
        },
      ],
      words: [
        { word: "criticise", es: "criticar" },
        { word: "certain", es: "segura" },
        { word: "piloting", es: "pilotear" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Barrett asks Vale for the honest reason not to hire her.",
      text: "Round four: why not hire her.",
      es: "Ronda cuatro: por qué no contratarla.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Give me the honest reason not to hire you.",
          es: "Deme la razón honesta para no contratarla.",
        },
        {
          speaker: "vale",
          text: "We're four classrooms. If you needed two thousand agents trained in a single month, Crown could do it and I couldn't.",
          es: "Somos cuatro aulas. Si necesitaran dos mil agentes formados en un solo mes, Crown podría y yo no.",
        },
        {
          speaker: "vale",
          text: "However, you don't hire two thousand in a month; you hire them in waves of ninety, which is exactly the size my teachers already handle. So the honest risk is speed, and the honest answer is that speed isn't what's failing you.",
          es: "Sin embargo, no contratan dos mil en un mes; los contratan en olas de noventa, que es exactamente el tamaño que mis maestros ya manejan. Así que el riesgo honesto es la velocidad, y la respuesta honesta es que la velocidad no es lo que les está fallando.",
        },
        {
          speaker: "barrett",
          text: "Noted. Nobody else in this process has told us what they can't do.",
          es: "Anotado. Nadie más en este proceso nos ha dicho qué no puede hacer.",
        },
      ],
      words: [
        { word: "honest", es: "honesta" },
        { word: "waves", es: "olas, tandas" },
        { word: "risk", es: "riesgo" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Reed and Barrett talk in the corridor after the round.",
      text: "The panel goes quiet.",
      es: "El panel se queda callado.",
      speaker: "barrett",
      cast: ["reed", "barrett"],
      lines: [
        {
          speaker: "barrett",
          text: "She just argued our side of the table better than we did.",
          es: "Acaba de argumentar nuestro lado de la mesa mejor que nosotros.",
        },
        {
          speaker: "reed",
          text: "That's what happens when somebody has thought it through instead of rehearsing it.",
          es: "Eso pasa cuando alguien lo ha pensado a fondo en lugar de ensayarlo.",
        },
        {
          speaker: "barrett",
          text: "Crown spent forty minutes on her and eight on us. That tells me who actually read our file.",
          es: "Crown pasó cuarenta minutos en ella y ocho en nosotros. Eso me dice quién leyó de verdad nuestro expediente.",
        },
      ],
      words: [
        { word: "argued our side of the table", es: "defendió la postura de la otra parte" },
        { word: "thought it through", es: "lo pensó a fondo" },
        { word: "file", es: "expediente" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Camila, Dani and Vale talk in the academy kitchen after Crown's turn.",
      text: "Crown presents next.",
      es: "Crown presenta después.",
      speaker: "camila",
      cast: ["camila", "dani", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "Crown went in with slides. Forty schools, eleven awards, and no student in the room.",
          es: "Crown entró con diapositivas. Cuarenta escuelas, once premios y ningún estudiante en la sala.",
        },
        {
          speaker: "dani",
          text: "We went in with Lucía.",
          es: "Nosotros entramos con Lucía.",
        },
        {
          speaker: "vale",
          text: "And Lucía spoke for ninety seconds without a note. Whatever happens now, that part is already paid off.",
          es: "Y Lucía habló noventa segundos sin una nota. Pase lo que pase ahora, esa parte ya rindió fruto.",
        },
        {
          speaker: "camila",
          text: "If the contract goes to Crown, Lucía still keeps those ninety seconds. That's the part nobody can take back.",
          es: "Si el contrato se va a Crown, Lucía se queda igual con esos noventa segundos. Esa es la parte que nadie puede quitar.",
        },
      ],
      words: [
        { word: "slides", es: "diapositivas" },
        { word: "awards", es: "premios" },
        { word: "paid off", es: "rindió fruto" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Lidia and Dani talk with Vale at the end of the third week.",
      text: "End of week three.",
      es: "Fin de la semana tres.",
      speaker: "lidia",
      cast: ["lidia", "vale", "dani"],
      lines: [
        {
          speaker: "lidia",
          text: "Three weeks ago you couldn't say why you left the call center without apologising for it.",
          es: "Hace tres semanas no podías decir por qué dejaste el call center sin disculparte por ello.",
        },
        {
          speaker: "vale",
          text: "Three weeks ago I was still answering as the person who left. Now I answer as the person who built what came after.",
          es: "Hace tres semanas todavía respondía como la persona que se fue. Ahora respondo como la persona que construyó lo que vino después.",
        },
        {
          speaker: "dani",
          text: "One week left. What's in it?",
          es: "Queda una semana. ¿Qué hay en ella?",
        },
        {
          speaker: "vale",
          text: "The whole story in ninety seconds: where we came from, what we run today, and what it becomes without me in the room.",
          es: "Toda la historia en noventa segundos: de dónde venimos, qué operamos hoy, y en qué se convierte sin mí en la sala.",
        },
      ],
      words: [
        { word: "apologising", es: "disculparse" },
        { word: "built", es: "construyó" },
        { word: "becomes", es: "se convierte" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed tells Vale what Monday's round will ask for.",
      text: "Ninety seconds for fifteen years.",
      es: "Noventa segundos para quince años.",
      speaker: "reed",
      cast: ["reed", "vale"],
      lines: [
        {
          speaker: "reed",
          text: "Monday you tell them your whole professional story — past, present and future — in ninety seconds, with no questions and no help.",
          es: "El lunes les cuentas toda tu historia profesional —pasado, presente y futuro— en noventa segundos, sin preguntas y sin ayuda.",
        },
        {
          speaker: "vale",
          text: "Ninety seconds for fifteen years.",
          es: "Noventa segundos para quince años.",
        },
        {
          speaker: "reed",
          text: "And the decision comes at the end of that week.",
          es: "Y la decisión llega al final de esa semana.",
        },
        {
          speaker: "vale",
          text: "Then I'll write the first ninety days tonight. On Monday I'd rather be waiting than working.",
          es: "Entonces escribo los primeros noventa días esta noche. El lunes prefiero estar esperando que trabajando.",
        },
      ],
      words: [
        { word: "professional", es: "profesional" },
        { word: "decision", es: "decisión" },
        { word: "waiting", es: "esperando" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does Vale say she will do if the speaking minutes go up but attrition doesn't fall?",
      questionEs: "¿Qué dice Vale que hará si los minutos hablados suben pero la deserción no baja?",
      options: [
        { label: "Tell Northline in month two instead of billing them for a year", emoji: "📉" },
        { label: "Add more classes at no cost", emoji: "➕" },
        { label: "Ask for a longer contract to prove the method", emoji: "📄" },
      ],
      answer: 0,
      sayIt: "She would tell them in month two instead of billing them for a year.",
      sayItEs: "Les diría en el mes dos en vez de cobrarles un año.",
      sayItCheck: {
        target: "She would tell them in month two instead of billing them for a year",
        altTargets: ["She tells them in month two", "She would tell them in month two"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "\"Give me an honest reason not to hire you.\" Name a real limit, then explain why it isn't a problem for this job.",
      questionEs: "\"Deme una razón honesta para no contratarlo.\" Nombra un límite real y luego explica por qué no es un problema para este trabajo.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I've never managed a team, so if you need a supervisor tomorrow I'm not that person. However, this role is about handling difficult calls, and that's what I've done every day for three years.",
      sayItEs: "Nunca he dirigido un equipo, así que si necesitan un supervisor mañana, no soy esa persona. Sin embargo, este puesto se trata de manejar llamadas difíciles, y eso es lo que he hecho todos los días durante tres años.",
      sayItAskEn: "Name your real limit, then say \"However, ...\" and explain why it isn't a problem here.",
      sayItAskEs: "Nombra tu límite real, luego di \"However, …\" y explica por qué aquí no es un problema.",
      sayItCheck: {
        target: "I've never *",
        altTargets: ["However *", "I have never *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "An interruption is not a stop sign.",
    es: "Una interrupción no es una señal de alto.",
  },
  habitCard: {
    afterScene: "s1",
    phrase: "When I don't know, I say what I do know and keep talking.",
    es: "Cuando no sé, digo lo que sí sé y sigo hablando.",
    model: "vale",
    modelActionEs: "Vale respondió cada interrupción sin reiniciar la frase ni quedarse en silencio.",
  },
  expressions: [
    {
      phrase: "think through",
      variants: ["thinking through", "thinks through", "thought it through"],
      es: "pensar algo a fondo",
      kind: "phrasal",
      example: "That's what happens when somebody has thought it through instead of rehearsing it.",
      exampleEs: "Eso pasa cuando alguien lo ha pensado a fondo en lugar de ensayarlo.",
    },
    {
      phrase: "pay off",
      variants: ["pays off", "paid off", "paying off"],
      es: "rendir fruto, valer la pena",
      kind: "phrasal",
      example: "Whatever happens now, that part is already paid off.",
      exampleEs: "Pase lo que pase ahora, esa parte ya rindió fruto.",
    },
    {
      phrase: "lose the room",
      variants: ["loses the room", "lost the room", "losing the room"],
      es: "perder a la audiencia",
      kind: "idiom",
      example: "Silence is the only answer that loses the room.",
      exampleEs: "El silencio es la única respuesta que pierde la sala.",
    },
    {
      phrase: "argue our side of the table",
      variants: ["argued our side of the table", "argue their side of the table"],
      es: "defender la postura de la otra parte",
      kind: "idiom",
      example: "She just argued our side of the table better than we did.",
      exampleEs: "Acaba de argumentar nuestro lado de la mesa mejor que nosotros.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: answer a hard question about your work, stay calm and keep talking to the end.",
    es: "Treinta segundos: responde una pregunta difícil sobre tu trabajo, mantén la calma y sigue hablando hasta el final.",
  },
  continueWith: [
    "The honest answer is ...",
    "However, ...",
    "What I'd need to check is ...",
  ],
  cliffhanger: {
    en: "Week four: the whole professional story in ninety seconds, and the decision at the end of it.",
    es: "Semana cuatro: toda la historia profesional en noventa segundos, y la decisión al final de ella.",
  },
};
