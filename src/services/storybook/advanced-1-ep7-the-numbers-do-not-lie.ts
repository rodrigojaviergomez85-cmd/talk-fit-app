import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep7-the-numbers-do-not-lie/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep7-the-numbers-do-not-lie/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep7-the-numbers-do-not-lie/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep7-the-numbers-do-not-lie/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep7-the-numbers-do-not-lie/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep7-the-numbers-do-not-lie/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep7-the-numbers-do-not-lie/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep7-the-numbers-do-not-lie/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep7-the-numbers-do-not-lie/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep7-the-numbers-do-not-lie/s9.jpg";

export const ADVANCED1_EP7_NUMBERS_DO_NOT_LIE: StorybookEpisode = {
  id: "advanced1-ep7-the-numbers-do-not-lie",
  moduleId: "advanced-1",
  week: 2,
  title: "The numbers do not lie",
  titleEs: "Los números no mienten",
  episodeLabel: {
    en: "Advanced 1 · Episode 7",
    es: "Advanced 1 · Episodio 7",
  },
  previously: [
    {
      en: "Vale rewrote the proposal around a real challenge and it finally had a heartbeat.",
      es: "Vale reescribió la propuesta alrededor de un reto real y por fin tuvo un latido.",
    },
    {
      en: "The committee asked for the next section: a story about a real mistake.",
      es: "El comité pidió la siguiente sección: una historia sobre un error real.",
    },
    {
      en: "It is Wednesday morning, and the mistake arrives before the coffee does.",
      es: "Es miércoles por la mañana, y el error llega antes que el café.",
    },
  ],
  reviewWords: [
    { word: "mistake", es: "error" },
    { word: "lesson", es: "lección" },
    { word: "honesty", es: "honestidad" },
    { word: "evidence", es: "evidencia" },
    { word: "trust", es: "confianza" },
  ],
  blurb: {
    en: "The Mexico retention report says eighty-two percent and the truth says sixty-one. Vale decides who owns the mistake before anyone else does.",
    es: "El reporte de retención de México dice ochenta y dos por ciento y la verdad dice sesenta y uno. Vale decide quién asume el error antes que nadie.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Camila shows Vale the wrong retention numbers on a laptop early in the morning.",
      text: "Seven in the morning. Camila has been checking the same column for an hour.",
      es: "Siete de la mañana. Camila lleva una hora revisando la misma columna.",
      speaker: "camila",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "Vale, the Mexico retention report is wrong. It says eighty-two percent; the real number is sixty-one.",
          es: "Vale, el reporte de retención de México está mal. Dice ochenta y dos por ciento; el número real es sesenta y uno.",
        },
        {
          speaker: "vale",
          text: "That is not a rounding problem, that is a different country. Were the students entered twice?",
          es: "Eso no es un problema de redondeo, eso es otro país. ¿Se ingresaron los estudiantes dos veces?",
        },
        {
          speaker: "camila",
          text: "I have been checking since six. The formula counted active students from the old list and the new one, so everybody who moved was counted twice.",
          es: "Llevo revisando desde las seis. La fórmula contó estudiantes activos de la lista vieja y de la nueva, así que todo el que se cambió fue contado dos veces.",
        },
      ],
      words: [
        { word: "retention", es: "retención" },
        { word: "percent", es: "por ciento" },
        { word: "formula", es: "fórmula" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dani and Camila each try to take the blame while Vale stops them with a raised hand.",
      text: "The instinct in the room is to find someone to blame.",
      es: "El instinto en la sala es encontrar a quién culpar.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "The new list was my job. If I had copied it properly, none of this would be happening.",
          es: "La lista nueva era mi trabajo. Si la hubiera copiado bien, nada de esto estaría pasando.",
        },
        {
          speaker: "camila",
          text: "Or the formula was built too fast by me, the same afternoon you sent the file.",
          es: "O la fórmula fue construida demasiado rápido por mí, la misma tarde en que enviaste el archivo.",
        },
        {
          speaker: "vale",
          text: "Stop, both of you. The report has my name on it and it was reviewed by me. What that means is simple: I own the mistake, and the two of you own the repair.",
          es: "Paren, los dos. El reporte tiene mi nombre y fue revisado por mí. Lo que eso significa es simple: yo asumo el error, y ustedes dos asumen la reparación.",
        },
      ],
      words: [
        { word: "blame", es: "culpa; culpar" },
        { word: "reviewed", es: "revisado" },
        { word: "repair", es: "reparación" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Reed explains the order of an error story from the laptop while Vale takes notes.",
      text: "Reed gives her the order the committee remembers.",
      es: "Reed le da el orden que el comité recuerda.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "When you tell them, do not say the system failed or that someone made a mistake. Use this order: responsibility, action, lesson. Anything else is an excuse wearing a suit.",
          es: "Cuando se lo cuentes, no digas que el sistema falló o que alguien cometió un error. Usa este orden: responsabilidad, acción, lección. Cualquier otra cosa es una excusa con traje.",
        },
        {
          speaker: "vale",
          text: "Responsibility first, even when it costs us the contract?",
          es: "Responsabilidad primero, ¿aunque nos cueste el contrato?",
        },
        {
          speaker: "reed",
          text: "Especially then. A leader who has never reported her own error has simply never been audited.",
          es: "Especialmente entonces. Una líder que nunca ha reportado su propio error simplemente nunca ha sido auditada.",
        },
      ],
      words: [
        { word: "responsibility", es: "responsabilidad" },
        { word: "excuse", es: "excusa" },
        { word: "audited", es: "auditada" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani rebuilds the student list while Camila adds a warning colour to the spreadsheet.",
      text: "Four hours before the call, the fixing starts.",
      es: "Cuatro horas antes de la llamada, empieza la corrección.",
      speaker: "dani",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Action one: the student list has been rebuilt with unique codes, so nobody can be counted twice again.",
          es: "Acción uno: la lista de estudiantes fue reconstruida con códigos únicos, así que nadie puede volver a ser contado dos veces.",
        },
        {
          speaker: "camila",
          text: "Action two: a warning colour was added to the spreadsheet. If the formula ever reads two lists, the cell turns red before anyone signs it.",
          es: "Acción dos: se agregó un color de advertencia a la hoja de cálculo. Si la fórmula llega a leer dos listas, la celda se pone roja antes de que alguien la firme.",
        },
        {
          speaker: "vale",
          text: "Action three is mine: every report with my name on it gets a second reader. Had that rule existed last month, we would not be having this morning.",
          es: "La acción tres es mía: cada reporte con mi nombre tiene un segundo lector. Si esa regla hubiera existido el mes pasado, no estaríamos teniendo esta mañana.",
        },
      ],
      words: [
        { word: "rebuilt", es: "reconstruida" },
        { word: "warning", es: "advertencia" },
        { word: "spreadsheet", es: "hoja de cálculo" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale and Camila talk quietly by the window before the committee call.",
      text: "Ten minutes left. Camila asks the only question that is missing.",
      es: "Quedan diez minutos. Camila hace la única pregunta que falta.",
      speaker: "camila",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "Responsibility and actions are ready. What is the lesson?",
          es: "La responsabilidad y las acciones están listas. ¿Cuál es la lección?",
        },
        {
          speaker: "vale",
          text: "Fast numbers feel wonderful; clean numbers build trust. I had been enjoying that growth so much that checking it never felt urgent.",
          es: "Los números rápidos se sienten maravillosos; los números limpios construyen confianza. Había estado disfrutando tanto ese crecimiento que revisarlo nunca se sintió urgente.",
        },
        {
          speaker: "camila",
          text: "That is honest. Uncomfortable, but honest, and it is the sentence they will remember.",
          es: "Eso es honesto. Incómodo, pero honesto, y es la frase que recordarán.",
        },
      ],
      words: [
        { word: "growth", es: "crecimiento" },
        { word: "urgent", es: "urgente" },
        { word: "uncomfortable", es: "incómodo" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale reports the error to the committee on the call, sitting straight with the corrected report on screen.",
      text: "Vale reports the error herself, before anyone asks about it.",
      es: "Vale reporta el error ella misma, antes de que alguien pregunte.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "narrator",
          text: "A committee member opens the call: your proposal mentioned a mistake you fixed. Tell us what happened.",
          es: "Un miembro del comité abre la llamada: su propuesta mencionó un error que corrigieron. Cuéntennos qué pasó.",
        },
        {
          speaker: "vale",
          text: "Last month our Mexico retention was reported as eighty-two percent. The real figure was sixty-one, because the formula had been reading two lists at the same time.",
          es: "El mes pasado nuestra retención en México fue reportada como ochenta y dos por ciento. La cifra real era sesenta y uno, porque la fórmula había estado leyendo dos listas al mismo tiempo.",
        },
        {
          speaker: "vale",
          text: "I take responsibility: the report was reviewed by me and the error was missed. The list has been rebuilt, a warning system was added, and every report of mine is now read twice.",
          es: "Asumo la responsabilidad: el reporte fue revisado por mí y el error se me pasó. La lista fue reconstruida, se agregó un sistema de advertencia, y cada reporte mío ahora se lee dos veces.",
        },
      ],
      words: [
        { word: "figure", es: "cifra" },
        { word: "missed", es: "se me pasó" },
        { word: "system", es: "sistema" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Reed and the committee react on screen while Vale listens without moving.",
      text: "The silence lasts two seconds, and then the committee speaks.",
      es: "El silencio dura dos segundos, y luego el comité habla.",
      speaker: "narrator",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "narrator",
          text: "The committee answers: most academies hide a number like that; you brought it to us before we could find it.",
          es: "El comité responde: la mayoría de las academias esconde un número así; ustedes nos lo trajeron antes de que pudiéramos encontrarlo.",
        },
        {
          speaker: "reed",
          text: "That is because Vale understands something most founders learn too late: trust is built long before it is needed.",
          es: "Eso es porque Vale entiende algo que la mayoría de los fundadores aprende demasiado tarde: la confianza se construye mucho antes de que se necesite.",
        },
        {
          speaker: "vale",
          text: "The lesson is short: clean numbers build more trust than fast numbers, and that is the rule I teach my team.",
          es: "La lección es corta: los números limpios construyen más confianza que los números rápidos, y esa es la regla que le enseño a mi equipo.",
        },
      ],
      words: [
        { word: "hide", es: "esconder" },
        { word: "founders", es: "fundadores" },
        { word: "trust", es: "confianza" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "After the call, Dani still looks guilty while Vale and Camila close their laptops.",
      text: "After the call, Dani is still carrying something.",
      es: "Después de la llamada, Dani sigue cargando algo.",
      speaker: "dani",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "I still think the double count started with my file.",
          es: "Sigo pensando que el doble conteo empezó con mi archivo.",
        },
        {
          speaker: "vale",
          text: "Maybe it did. But it passed through me, and responsibility is not about who started it; it is about who repairs it and who tells the truth first.",
          es: "Quizá sí. Pero pasó por mí, y la responsabilidad no se trata de quién lo empezó; se trata de quién lo repara y quién dice la verdad primero.",
        },
        {
          speaker: "camila",
          text: "And it was repaired by the three of us before lunch. That is the real lesson.",
          es: "Y fue reparado por los tres antes del almuerzo. Esa es la lección real.",
        },
      ],
      words: [
        { word: "count", es: "conteo" },
        { word: "truth", es: "verdad" },
        { word: "repaired", es: "reparado" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed announces the next test from the laptop screen while Vale looks at Dani and Camila.",
      text: "Reed is not finished for the week.",
      es: "Reed no ha terminado con la semana.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "The committee was impressed by your honesty. Next they want to see how your team handles conflict, because not everyone in a company thinks the same way.",
          es: "Al comité le impresionó su honestidad. Ahora quieren ver cómo su equipo maneja el conflicto, porque no todos en una empresa piensan igual.",
        },
        {
          speaker: "reed",
          text: "Show them a real disagreement, not a rehearsed one. They can hear the difference.",
          es: "Muéstrenles un desacuerdo real, no uno ensayado. Pueden oír la diferencia.",
        },
        {
          speaker: "vale",
          text: "A real disagreement. Dani and Camila argue almost every day, so at least we have material.",
          es: "Un desacuerdo real. Dani y Camila discuten casi todos los días, así que al menos tenemos material.",
        },
      ],
      words: [
        { word: "conflict", es: "conflicto" },
        { word: "disagreement", es: "desacuerdo" },
        { word: "rehearsed", es: "ensayado" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "Who takes responsibility for the wrong retention report?",
      questionEs: "¿Quién asume la responsabilidad del reporte de retención equivocado?",
      options: [
        { label: "Dani, because he copied the new list", emoji: "📋" },
        { label: "Vale, because the report had her name on it and she reviewed it", emoji: "🙋‍♀️" },
        { label: "Nobody, because the formula failed alone", emoji: "🤖" },
      ],
      answer: 1,
      sayIt: "Vale takes responsibility, because the report had her name on it and she reviewed it.",
      sayItEs: "Vale asume la responsabilidad, porque el reporte tenía su nombre y ella lo revisó.",
      sayItCheck: {
        target: "Vale takes responsibility",
        altTargets: ["Vale, because the report had her name on it", "Vale takes responsibility because she reviewed it"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Your turn: tell me about a mistake you made. Take responsibility, say what you did about it, and give the lesson. Do not blame anyone.",
      questionEs: "Tu turno: cuéntame sobre un error que cometiste. Asume la responsabilidad, di qué hiciste al respecto y da la lección. No culpes a nadie.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I take responsibility for sending the wrong file to a client. I told my manager immediately, the correct file was sent the same hour, and since then every attachment has been checked twice. What I learned is that a fast apology costs less than a hidden error.",
      sayItEs: "Asumo la responsabilidad de haber enviado el archivo equivocado a un cliente. Le dije a mi jefe de inmediato, el archivo correcto fue enviado la misma hora, y desde entonces cada adjunto se revisa dos veces. Lo que aprendí es que una disculpa rápida cuesta menos que un error escondido.",
      sayItAskEn: "What was your mistake, what did you do about it, and what did you learn?",
      sayItAskEs: "¿Cuál fue tu error, qué hiciste al respecto y qué aprendiste?",
      sayItCheck: {
        target: "I take responsibility *",
        altTargets: ["I am responsible *", "My mistake was *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "Clean numbers build more trust than fast numbers.",
    es: "Los números limpios construyen más confianza que los números rápidos.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "When something goes wrong, I say what I will fix before I say who did it.",
    es: "Cuando algo sale mal, digo qué voy a arreglar antes de decir quién lo hizo.",
    model: "vale",
    modelActionEs: "Vale detuvo la búsqueda de culpables y asumió el error que llevaba su nombre.",
  },
  expressions: [
    {
      phrase: "double-check",
      variants: ["double-checked", "double-checking", "double-checks"],
      es: "revisar dos veces",
      kind: "phrasal",
      example: "Every attachment has been double-checked since then.",
      exampleEs: "Cada adjunto se ha revisado dos veces desde entonces.",
    },
    {
      phrase: "pass through",
      variants: ["passed through", "passes through", "passing through"],
      es: "pasar por (las manos de alguien)",
      kind: "phrasal",
      example: "Maybe it started with you, but it passed through me.",
      exampleEs: "Quizá empezó contigo, pero pasó por mí.",
    },
    {
      phrase: "own the mistake",
      variants: ["owns the mistake", "owned the mistake", "owning the mistake"],
      es: "asumir el error como propio",
      kind: "idiom",
      example: "I own the mistake, and the two of you own the repair.",
      exampleEs: "Yo asumo el error, y ustedes dos asumen la reparación.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: tell a mistake of your own with responsibility, action and lesson, and blame nobody.",
    es: "Treinta segundos: cuenta un error tuyo con responsabilidad, acción y lección, sin culpar a nadie.",
  },
  continueWith: [
    "I take responsibility for ...",
    "What I did was ...",
    "What I learned is ...",
  ],
  cliffhanger: {
    en: "The committee now wants to see a real disagreement inside the team, not a rehearsed one.",
    es: "El comité ahora quiere ver un desacuerdo real dentro del equipo, no uno ensayado.",
  },
};
