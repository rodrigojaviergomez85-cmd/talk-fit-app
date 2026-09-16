import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep10-the-behavioural-round/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep10-the-behavioural-round/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep10-the-behavioural-round/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep10-the-behavioural-round/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep10-the-behavioural-round/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep10-the-behavioural-round/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep10-the-behavioural-round/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep10-the-behavioural-round/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep10-the-behavioural-round/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep10-the-behavioural-round/s9.jpg";

export const ADVANCED1_EP10_BEHAVIOURAL_ROUND: StorybookEpisode = {
  id: "advanced1-ep10-the-behavioural-round",
  moduleId: "advanced-1",
  week: 2,
  title: "The behavioural round",
  titleEs: "La ronda conductual",
  episodeLabel: {
    en: "Advanced 1 · Episode 10",
    es: "Advanced 1 · Episodio 10",
  },
  previously: [
    {
      en: "Three students told the team why they really study English.",
      es: "Tres estudiantes le dijeron al equipo por qué estudian inglés de verdad.",
    },
    {
      en: "Their words changed the course and the whole sales story.",
      es: "Sus palabras cambiaron el curso y toda la historia de venta.",
    },
    {
      en: "Today the committee stops being polite and starts interrupting.",
      es: "Hoy el comité deja de ser amable y empieza a interrumpir.",
    },
  ],
  reviewWords: [
    { word: "challenge", es: "reto" },
    { word: "mistake", es: "error" },
    { word: "disagreement", es: "desacuerdo" },
    { word: "customer", es: "cliente" },
    { word: "lesson", es: "lección" },
  ],
  blurb: {
    en: "Four stories, hidden follow-up questions, and no time to prepare. The half-way checkpoint of Advanced 1.",
    es: "Cuatro historias, preguntas de seguimiento ocultas y sin tiempo para prepararse. El punto de control de la mitad de Advanced 1.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "The team waits in the meeting room minutes before the behavioural round starts.",
      text: "Friday, 8:55. Nobody is holding a script.",
      es: "Viernes, 8:55. Nadie sostiene un guion.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "Five minutes. Should I read my story one more time?",
          es: "Cinco minutos. ¿Debería leer mi historia una vez más?",
        },
        {
          speaker: "vale",
          text: "No. If it has been memorised, they will hear it, and memorised answers are the first thing a committee stops believing.",
          es: "No. Si está memorizada, lo van a oír, y las respuestas memorizadas son lo primero que un comité deja de creer.",
        },
        {
          speaker: "dani",
          text: "So we just tell the truth and hope our English keeps up.",
          es: "Así que simplemente decimos la verdad y esperamos que nuestro inglés aguante.",
        },
      ],
      words: [
        { word: "script", es: "guion" },
        { word: "memorised", es: "memorizada" },
        { word: "believing", es: "creer" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mr. Reed opens the round from the screen with a list of names in front of him.",
      text: "Reed explains the rule of the round.",
      es: "Reed explica la regla de la ronda.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Each of you tells one story. After every story there is a follow-up question you have not seen, and you answer it immediately.",
          es: "Cada uno cuenta una historia. Después de cada historia hay una pregunta de seguimiento que no han visto, y la responden de inmediato.",
        },
        {
          speaker: "vale",
          text: "Understood. Structure first, and then whatever you throw at us.",
          es: "Entendido. Primero la estructura, y luego lo que sea que nos lancen.",
        },
        {
          speaker: "reed",
          text: "Exactly. Anyone can prepare a story. Very few can survive the second question.",
          es: "Exacto. Cualquiera puede preparar una historia. Muy pocos sobreviven a la segunda pregunta.",
        },
      ],
      words: [
        { word: "follow-up", es: "seguimiento" },
        { word: "immediately", es: "de inmediato" },
        { word: "survive", es: "sobrevivir" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani tells his story sitting straight, hands still, speaking to the camera.",
      text: "Dani goes first, and the follow-up finds him.",
      es: "Dani va primero, y el seguimiento lo encuentra.",
      speaker: "dani",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Last November two teachers resigned in the same week. I rebuilt the timetable in two days, called every family myself, and no class was cancelled. What I learned is that families forgive problems, but they do not forgive silence.",
          es: "En noviembre pasado dos maestros renunciaron la misma semana. Reconstruí el horario en dos días, llamé yo mismo a cada familia, y ninguna clase fue cancelada. Lo que aprendí es que las familias perdonan los problemas, pero no perdonan el silencio.",
        },
        {
          speaker: "narrator",
          text: "The committee interrupts: and what would you do differently if it happened again tomorrow?",
          es: "El comité interrumpe: ¿y qué harías diferente si pasara otra vez mañana?",
        },
        {
          speaker: "dani",
          text: "I would call the families before rebuilding anything. Back then the timetable was fixed first, and the silence lasted almost a day.",
          es: "Llamaría a las familias antes de reconstruir nada. En ese momento el horario se arregló primero, y el silencio duró casi un día.",
        },
      ],
      words: [
        { word: "resigned", es: "renunciaron" },
        { word: "timetable", es: "horario" },
        { word: "forgive", es: "perdonan" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Camila tells her story with her notebook closed in front of her.",
      text: "Camila tells the one she did not want to tell.",
      es: "Camila cuenta la que no quería contar.",
      speaker: "camila",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "camila",
          text: "I once designed a course that was beautiful and useless. Seventy percent of the students left it before week four, so I interviewed twelve of them and rebuilt it around their calls and their emails. Retention went from thirty to eighty-four.",
          es: "Una vez diseñé un curso que era hermoso e inútil. El setenta por ciento de los estudiantes lo dejó antes de la semana cuatro, así que entrevisté a doce y lo reconstruí alrededor de sus llamadas y sus correos. La retención pasó de treinta a ochenta y cuatro.",
        },
        {
          speaker: "narrator",
          text: "The committee interrupts: who told you the course was failing?",
          es: "El comité interrumpe: ¿quién le dijo que el curso estaba fallando?",
        },
        {
          speaker: "camila",
          text: "Nobody told me. The empty chairs did, and I would argue that empty chairs are the most honest feedback a teacher ever gets.",
          es: "Nadie me lo dijo. Las sillas vacías lo hicieron, y yo diría que las sillas vacías son la retroalimentación más honesta que un maestro recibe.",
        },
      ],
      words: [
        { word: "useless", es: "inútil" },
        { word: "chairs", es: "sillas" },
        { word: "feedback", es: "retroalimentación" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale answers the committee calmly, leaning slightly forward.",
      text: "Vale's turn, and her follow-up is the hardest of the morning.",
      es: "El turno de Vale, y su seguimiento es el más difícil de la mañana.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Two years ago our biggest client was leaving. Instead of lowering the price, I asked for one week and rebuilt their programme around the calls their staff were failing. They stayed, and they are still with us.",
          es: "Hace dos años nuestro cliente más grande se iba. En lugar de bajar el precio, pedí una semana y reconstruí su programa alrededor de las llamadas que su personal estaba fallando. Se quedaron, y siguen con nosotros.",
        },
        {
          speaker: "narrator",
          text: "The committee interrupts: and if they had left anyway, what would that have said about your method?",
          es: "El comité interrumpe: y si se hubieran ido de todos modos, ¿qué habría dicho eso de su método?",
        },
        {
          speaker: "vale",
          text: "That the method was right and the timing was wrong. If a client leaves, I look at what we measured too late; I do not throw away eight years of results because of one week.",
          es: "Que el método era correcto y el momento equivocado. Si un cliente se va, miro qué medimos demasiado tarde; no tiro ocho años de resultados por una semana.",
        },
      ],
      words: [
        { word: "lowering", es: "bajar" },
        { word: "programme", es: "programa" },
        { word: "timing", es: "momento; sincronización" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Reed keeps pressing Vale with a second unexpected question while the team listens.",
      text: "Reed adds a question that was not on the list.",
      es: "Reed agrega una pregunta que no estaba en la lista.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "One more. Your two managers disagree openly. Is that a strength or a discipline problem?",
          es: "Una más. Sus dos gerentes discrepan abiertamente. ¿Eso es una fortaleza o un problema de disciplina?",
        },
        {
          speaker: "vale",
          text: "It is a strength that has been trained. They disagree about plans in front of me and never about each other in front of students. That line is the discipline.",
          es: "Es una fortaleza que ha sido entrenada. Discrepan sobre planes frente a mí y nunca entre ellos frente a los estudiantes. Esa línea es la disciplina.",
        },
        {
          speaker: "reed",
          text: "Good answer, and better than the one nine other academies gave me this week.",
          es: "Buena respuesta, y mejor que la que me dieron otras nueve academias esta semana.",
        },
      ],
      words: [
        { word: "strength", es: "fortaleza" },
        { word: "discipline", es: "disciplina" },
        { word: "openly", es: "abiertamente" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "The team sits in silence after the call ends, the screen dark.",
      text: "The call ends. Nobody moves for a moment.",
      es: "La llamada termina. Nadie se mueve por un momento.",
      speaker: "camila",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "I have never been interrupted that many times in my life.",
          es: "Nunca me habían interrumpido tantas veces en mi vida.",
        },
        {
          speaker: "camila",
          text: "Neither had I, and yet none of us froze. Four weeks ago that question about the empty chairs would have finished me.",
          es: "A mí tampoco, y aun así ninguno se congeló. Hace cuatro semanas esa pregunta de las sillas vacías me habría acabado.",
        },
        {
          speaker: "vale",
          text: "That is what improvement sounds like. Not perfect English, but English that keeps working while someone is pushing you.",
          es: "Así suena la mejora. No inglés perfecto, sino inglés que sigue funcionando mientras alguien te está presionando.",
        },
      ],
      words: [
        { word: "froze", es: "se congeló" },
        { word: "improvement", es: "mejora" },
        { word: "pushing", es: "presionando" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale writes the four story structures on the board as a checklist for the learner.",
      text: "Vale writes the four structures on the board, in order.",
      es: "Vale escribe las cuatro estructuras en la pizarra, en orden.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Ten days, four structures. A challenge: situation, action, result, lesson. A mistake: responsibility, action, lesson.",
          es: "Diez días, cuatro estructuras. Un reto: situación, acción, resultado, lección. Un error: responsabilidad, acción, lección.",
        },
        {
          speaker: "vale",
          text: "A disagreement: what I agree with, what worries me, what I propose. And a customer answer: what they need, why, and what I would do.",
          es: "Un desacuerdo: en qué estoy de acuerdo, qué me preocupa, qué propongo. Y una respuesta de cliente: qué necesitan, por qué y qué haría yo.",
        },
        {
          speaker: "camila",
          text: "Four shapes, and any hidden question fits inside one of them.",
          es: "Cuatro formas, y cualquier pregunta oculta cabe dentro de una de ellas.",
        },
      ],
      words: [
        { word: "structures", es: "estructuras" },
        { word: "shapes", es: "formas" },
        { word: "hidden", es: "oculta" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed delivers news from the screen and the team leans forward at the same time.",
      text: "Reed calls back forty minutes later.",
      es: "Reed vuelve a llamar cuarenta minutos después.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "You are on the short list. Three academies remain, and next month the committee is flying here.",
          es: "Están en la lista corta. Quedan tres academias, y el próximo mes el comité viene en avión.",
        },
        {
          speaker: "vale",
          text: "Flying here. So they will see the real classrooms, the real teachers and the real noise.",
          es: "Vienen en avión. Así que verán los salones reales, los maestros reales y el ruido real.",
        },
        {
          speaker: "reed",
          text: "Everything. And they will talk to your students without you in the room.",
          es: "Todo. Y hablarán con sus estudiantes sin usted en la sala.",
        },
      ],
      words: [
        { word: "list", es: "lista" },
        { word: "flying", es: "volando; viniendo en avión" },
        { word: "noise", es: "ruido" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What does Camila say told her that her course was failing?",
      questionEs: "¿Qué dice Camila que le avisó que su curso estaba fallando?",
      options: [
        { label: "Her manager told her in a meeting", emoji: "🗣️" },
        { label: "Nobody told her; the empty chairs did", emoji: "🪑" },
        { label: "A student wrote a complaint email", emoji: "✉️" },
      ],
      answer: 1,
      sayIt: "Nobody told her; the empty chairs did.",
      sayItEs: "Nadie se lo dijo; las sillas vacías lo hicieron.",
      sayItCheck: {
        target: "Nobody told her",
        altTargets: ["The empty chairs did", "Nobody told her, the empty chairs did"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Checkpoint: tell one story about yourself with a clear structure, and then answer this follow-up: what would you do differently today?",
      questionEs: "Punto de control: cuenta una historia sobre ti con estructura clara, y luego responde este seguimiento: ¿qué harías diferente hoy?",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Last year my team lost a client because our report was sent late. I rebuilt our weekly calendar and nothing has been missed since then. Today I would warn the client before the deadline instead of apologising after it.",
      sayItEs: "El año pasado mi equipo perdió un cliente porque nuestro reporte se envió tarde. Reconstruí nuestro calendario semanal y desde entonces no se ha pasado nada. Hoy avisaría al cliente antes de la fecha límite en lugar de disculparme después.",
      sayItAskEn: "What happened, what did you do, and what would you do differently today?",
      sayItAskEs: "¿Qué pasó, qué hiciste y qué harías diferente hoy?",
      sayItCheck: {
        target: "Last year *",
        altTargets: ["Today I would *", "What I would do differently is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "Anyone can prepare a story. I can survive the second question.",
    es: "Cualquiera puede preparar una historia. Yo puedo sobrevivir la segunda pregunta.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "When I am interrupted, I answer the new question first and then return to my story.",
    es: "Cuando me interrumpen, respondo primero la pregunta nueva y luego regreso a mi historia.",
    model: "vale",
    modelActionEs: "Vale contestó el seguimiento difícil de frente y luego cerró su historia con datos.",
  },
  expressions: [
    {
      phrase: "keep up",
      variants: ["kept up", "keeps up", "keeping up"],
      es: "seguir el ritmo",
      kind: "phrasal",
      example: "We tell the truth and hope our English keeps up.",
      exampleEs: "Decimos la verdad y esperamos que nuestro inglés siga el ritmo.",
    },
    {
      phrase: "throw at",
      variants: ["throws at", "threw at", "throwing at"],
      es: "lanzar (preguntas o problemas) a alguien",
      kind: "phrasal",
      example: "Structure first, and then whatever you throw at us.",
      exampleEs: "Primero la estructura, y luego lo que sea que nos lancen.",
    },
    {
      phrase: "on the short list",
      variants: ["short list", "shortlist"],
      es: "entre los finalistas",
      kind: "idiom",
      example: "You are on the short list. Three academies remain.",
      exampleEs: "Están entre los finalistas. Quedan tres academias.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: tell your story and answer the follow-up without stopping.",
    es: "Treinta segundos: cuenta tu historia y responde el seguimiento sin detenerte.",
  },
  continueWith: [
    "The situation was ...",
    "What I did was ...",
    "Today I would ...",
  ],
  cliffhanger: {
    en: "Next month the committee is flying in, and they will talk to Vale's students without her in the room.",
    es: "El próximo mes el comité viene en avión, y hablará con los estudiantes de Vale sin ella en la sala.",
  },
};
