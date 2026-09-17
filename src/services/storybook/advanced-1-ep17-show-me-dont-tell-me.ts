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
  titleEs: "Demuéstramelo, no me lo cuentes",
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
      en: "The committee interviews whoever will lead it with Vale.",
      es: "El comité entrevista a quien lo dirigirá junto a Vale.",
    },
    {
      en: "Two candidates, one chair: Lidia and Dani.",
      es: "Dos candidatos, una silla: Lidia y Dani.",
    },
  ],
  reviewWords: [
    { word: "attrition", es: "deserción" },
    { word: "committee", es: "comité" },
    { word: "evidence", es: "evidencia" },
    { word: "timetable", es: "horario" },
    { word: "cohorts", es: "grupos, cohortes" },
  ],
  blurb: {
    en: "No adjectives allowed. Every claim needs a situation, an action and a number.",
    es: "Sin adjetivos. Cada afirmación necesita una situación, una acción y un número.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale and Barrett stand outside the interview room on Wednesday morning.",
      text: "Wednesday, before the room.",
      es: "Miércoles, antes de la sala.",
      speaker: "vale",
      cast: ["vale", "barrett"],
      lines: [
        {
          speaker: "vale",
          text: "Two candidates, one chair. Lidia has taught the method for four years; Dani has run everything around it for three.",
          es: "Dos candidatos, una silla. Lidia ha enseñado el método cuatro años; Dani ha dirigido todo lo demás por tres.",
        },
        {
          speaker: "barrett",
          text: "And you don't get a vote, which I assume you hate.",
          es: "Y tú no votas, lo cual asumo que odias.",
        },
        {
          speaker: "vale",
          text: "I don't hate it. If I chose alone, the committee would call the choice loyalty rather than competence.",
          es: "No lo odio. Si eligiera sola, el comité llamaría lealtad a la elección en vez de competencia.",
        },
        {
          speaker: "barrett",
          text: "You wrote the ninety days on Monday. Whoever sits in that chair has to survive them with you.",
          es: "Escribiste los noventa días el lunes. Quien se siente en esa silla tiene que sobrevivirlos contigo.",
        },
        {
          speaker: "vale",
          text: "Which is exactly why I want them tested by you and not comforted by me.",
          es: "Que es justamente por qué quiero que tú los pruebes y que yo no los consienta.",
        },
      ],
      words: [
        { word: "loyalty", es: "lealtad" },
        { word: "competence", es: "competencia, capacidad" },
        { word: "candidates", es: "candidatos" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Barrett sets the rule of the competency round at the table.",
      text: "The rule of the round.",
      es: "La regla de la ronda.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Competency interview. No adjectives. Every claim gets a situation, an action and a number.",
          es: "Entrevista por competencias. Sin adjetivos. Cada afirmación lleva una situación, una acción y un número.",
        },
        {
          speaker: "vale",
          text: "In other words, show me, don't tell me.",
          es: "En otras palabras, demuéstramelo, no me lo cuentes.",
        },
        {
          speaker: "barrett",
          text: "Precisely. And if a number is missing, I'll ask who could verify the story.",
          es: "Exacto. Y si falta un número, preguntaré quién podría verificar la historia.",
        },
        {
          speaker: "vale",
          text: "Then I'll sit at the end of the table and say nothing until you're finished.",
          es: "Entonces me sentaré al final de la mesa y no diré nada hasta que termines.",
        },
        {
          speaker: "barrett",
          text: "I'll believe that when I see it. Send in the first one.",
          es: "Eso lo creeré cuando lo vea. Que pase la primera.",
        },
      ],
      words: [
        { word: "claim", es: "afirmación" },
        { word: "adjectives", es: "adjetivos" },
        { word: "competency", es: "por competencias" },
      ],
    },

    {
      id: "s3",
      image: s3,
      imageAlt: "Lidia answers first, calm and specific.",
      text: "Lidia, first.",
      es: "Lidia, primero.",
      speaker: "lidia",
      cast: ["lidia", "barrett"],
      lines: [
        {
          speaker: "lidia",
          text: "Last year two corporate groups were failing at week five. I rebuilt the second hour around speaking only, and I called every student who missed twice.",
          es: "El año pasado dos grupos corporativos fallaban en la semana cinco. Reconstruí la segunda hora solo para hablar, y llamé a cada estudiante que faltó dos veces.",
        },
        {
          speaker: "barrett",
          text: "And the result?",
          es: "¿Y el resultado?",
        },
        {
          speaker: "lidia",
          text: "Attrition went from twenty-two percent to seven, and it has stayed there for three cohorts.",
          es: "La deserción pasó de veintidós por ciento a siete, y se ha mantenido tres cohortes.",
        },
        {
          speaker: "barrett",
          text: "Seven. Measured by whom?",
          es: "Siete. ¿Medido por quién?",
        },
        {
          speaker: "lidia",
          text: "By the client's own attendance report, not by mine. If they had counted differently, the number would have been theirs to defend.",
          es: "Por el reporte de asistencia del propio cliente, no por el mío. Si hubieran contado distinto, el número habría sido de ellos defenderlo.",
        },
      ],
      words: [
        { word: "rebuilt", es: "reconstruí" },
        { word: "cohorts", es: "grupos, cohortes" },
        { word: "corporate", es: "corporativo" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Barrett pushes back on Lidia's example.",
      text: "Barrett pushes.",
      es: "Barrett presiona.",
      speaker: "barrett",
      cast: ["barrett", "lidia"],
      lines: [
        {
          speaker: "barrett",
          text: "Let me point out the obvious problem. You fixed a class. The pilot is three countries.",
          es: "Déjame señalar el problema obvio. Tú arreglaste una clase. El piloto son tres países.",
        },
        {
          speaker: "lidia",
          text: "Then judge the part that scales: I wrote what I did down, and four teachers repeated it without me in the room.",
          es: "Entonces juzga la parte que escala: escribí lo que hice, y cuatro maestros lo repitieron sin mí en el salón.",
        },
        {
          speaker: "barrett",
          text: "Four teachers in one building is not eleven teachers in three countries.",
          es: "Cuatro maestros en un edificio no son once maestros en tres países.",
        },
        {
          speaker: "lidia",
          text: "No, it isn't. But nothing travels across a border unless it has been written down first, and that part I've already done.",
          es: "No, no lo son. Pero nada cruza una frontera si no se ha escrito antes, y esa parte ya la hice.",
        },
      ],
      words: [
        { word: "point out", es: "señalar" },
        { word: "scales", es: "escala, crece" },
        { word: "judge", es: "juzgar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani gives his evidence about the week that nearly broke the academy.",
      text: "Dani's turn.",
      es: "El turno de Dani.",
      speaker: "dani",
      cast: ["dani", "barrett"],
      lines: [
        {
          speaker: "barrett",
          text: "Your turn, Dani. Same rule: a situation, an action, a number.",
          es: "Tu turno, Dani. La misma regla: una situación, una acción, un número.",
        },
        {
          speaker: "dani",
          text: "My evidence isn't a classroom, it's the week that nearly broke us. Northline moved two hundred people onto a new schedule with nine days' notice, and if we had said no, we would have lost the account that same month. I rebuilt the timetable in four days, negotiated three teachers onto evening hours instead of hiring strangers, and kept the cost increase at six percent. Nothing about that was heroic; it was planned badly by somebody else and rescued on paper by me. What it proves is that I can walk the talk when the week is ugly.",
          es: "Mi evidencia no es un salón, es la semana que casi nos quiebra. Northline movió a doscientas personas a un horario nuevo con nueve días de aviso, y si hubiéramos dicho que no, habríamos perdido la cuenta ese mismo mes. Reconstruí el horario en cuatro días, negocié tres maestros a horas de la noche en vez de contratar desconocidos, y mantuve el aumento de costo en seis por ciento. Nada de eso fue heroico; alguien más lo planeó mal y yo lo rescaté en papel. Lo que demuestra es que cumplo lo que digo cuando la semana es fea.",
        },
        {
          speaker: "barrett",
          text: "You said rescued on paper. What does that mean in practice?",
          es: "Dijiste rescatado en papel. ¿Qué significa eso en la práctica?",
        },
        {
          speaker: "dani",
          text: "It means the students never noticed. The only people who had a bad week were the three of us who fixed it.",
          es: "Significa que los estudiantes nunca lo notaron. Los únicos que tuvimos una mala semana fuimos los tres que lo arreglamos.",
        },
      ],
      words: [
        { word: "walk the talk", es: "cumplir lo que uno dice" },
        { word: "notice", es: "aviso" },
        { word: "heroic", es: "heroico" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Barrett follows up on the six percent with Dani.",
      text: "The follow-up.",
      es: "La repregunta.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "I'd like to follow up on the six percent. Who paid it?",
          es: "Quisiera profundizar en ese seis por ciento. ¿Quién lo pagó?",
        },
        {
          speaker: "dani",
          text: "We did, not the client. I'd rather explain a small loss than a broken promise.",
          es: "Nosotros, no el cliente. Prefiero explicar una pérdida pequeña que una promesa rota.",
        },
        {
          speaker: "barrett",
          text: "And if the same week happened in Guatemala, with nobody you know on the ground?",
          es: "¿Y si la misma semana pasara en Guatemala, sin nadie conocido en el terreno?",
        },
        {
          speaker: "dani",
          text: "Then I'd lose the four days I saved here, so I'd build the reserve hours into the contract before anyone signs it.",
          es: "Entonces perdería los cuatro días que gané aquí, así que metería las horas de reserva en el contrato antes de que alguien lo firme.",
        },
      ],
      words: [
        { word: "follow up on", es: "dar seguimiento a, profundizar en" },
        { word: "loss", es: "pérdida" },
        { word: "broken", es: "rota" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale watches from the side as Barrett tests Lidia with a second question.",
      text: "The second question.",
      es: "La segunda pregunta.",
      speaker: "vale",
      cast: ["vale", "barrett", "lidia"],
      lines: [
        {
          speaker: "vale",
          text: "This is the part candidates never rehearse. It isn't the story that's tested; it's the second question after it.",
          es: "Esta es la parte que los candidatos nunca ensayan. No se prueba la historia; se prueba la segunda pregunta después de ella.",
        },
        {
          speaker: "barrett",
          text: "Then let me test that. Lidia, if a teacher in another country ignored your instructions, what would you do in the first week?",
          es: "Entonces déjame probarlo. Lidia, si una maestra en otro país ignorara tus instrucciones, ¿qué harías la primera semana?",
        },
        {
          speaker: "lidia",
          text: "I'd sit in her class before I sent her a single message, because a teacher who is ignoring the method is usually solving a problem I haven't seen.",
          es: "Me sentaría en su clase antes de mandarle un solo mensaje, porque una maestra que ignora el método normalmente está resolviendo un problema que yo no he visto.",
        },
        {
          speaker: "barrett",
          text: "And if she's simply wrong?",
          es: "¿Y si simplemente está equivocada?",
        },
        {
          speaker: "lidia",
          text: "Then I'd teach the next session myself with her watching, and we'd compare what the students produced. Correction lands better when it's demonstrated rather than announced.",
          es: "Entonces daría yo la siguiente sesión con ella observando, y compararíamos lo que produjeron los estudiantes. La corrección cae mejor cuando se demuestra en vez de anunciarse.",
        },
        {
          speaker: "barrett",
          text: "Vale, you're allowed one sentence. Is that how you would handle it?",
          es: "Vale, tienes derecho a una frase. ¿Así lo manejarías tú?",
        },
        {
          speaker: "vale",
          text: "It's how I've handled it for six years, and she didn't learn that answer from me this morning.",
          es: "Así lo he manejado durante seis años, y esa respuesta no la aprendió de mí esta mañana.",
        },
      ],
      words: [
        { word: "rehearse", es: "ensayar" },
        { word: "instructions", es: "instrucciones" },
        { word: "demonstrated", es: "demostrada" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Elena says the thing nobody asked, in front of Vale and Barrett.",
      text: "Your turn, and Elena's sentence.",
      es: "Tu turno, y la frase de Elena.",
      speaker: "vale",
      cast: ["vale", "elena", "barrett"],
      lines: [
        {
          speaker: "vale",
          text: "Your turn. Give me a competency answer: situation, action, result, and one number. If you have no number, give me the evidence someone else could check.",
          es: "Tu turno. Dame una respuesta por competencias: situación, acción, resultado y un número. Si no tienes número, dame la evidencia que otro pueda verificar.",
        },
        {
          speaker: "elena",
          text: "Can I say the thing nobody asked? Lidia is the one who called me when I stopped coming.",
          es: "¿Puedo decir lo que nadie preguntó? Lidia es quien me llamó cuando dejé de venir.",
        },
        {
          speaker: "barrett",
          text: "That is not in either file.",
          es: "Eso no está en ninguno de los dos expedientes.",
        },
        {
          speaker: "elena",
          text: "It wouldn't be. Nobody writes down the call that keeps a student in the room.",
          es: "No lo estaría. Nadie escribe la llamada que mantiene a un estudiante en el salón.",
        },
        {
          speaker: "vale",
          text: "Which is why we're asking for numbers and for the people behind them.",
          es: "Por eso pedimos números y también a la gente detrás de ellos.",
        },
      ],
      words: [
        { word: "situation", es: "situación" },
        { word: "result", es: "resultado" },
        { word: "file", es: "expediente" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale gives her recommendation and Barrett agrees, then mentions Crown's call.",
      text: "The decision.",
      es: "La decisión.",
      speaker: "vale",
      cast: ["vale", "barrett"],
      lines: [
        {
          speaker: "vale",
          text: "I'll say what I think, and then I'll stay quiet. Dani is the stronger operator, and if the pilot were only a logistics problem, this would be over. But the risk in three countries isn't the timetable; it's teachers drifting away from the method because nobody is watching the classroom. Lidia has already proved she can put her work into words other people can repeat, which is the only thing that stops this becoming a paper promise. So my recommendation is Lidia in the room and Dani behind the operation, and I'd rather lose that argument today than lose the pilot in month four.",
          es: "Voy a decir lo que pienso y después me callo. Dani es el mejor operador, y si el piloto fuera solo un problema logístico, esto estaría cerrado. Pero el riesgo en tres países no es el horario; son maestros alejándose del método porque nadie mira el salón. Lidia ya demostró que puede poner su trabajo en palabras que otros repiten, que es lo único que evita que esto se vuelva una promesa de papel. Así que mi recomendación es Lidia en el salón y Dani detrás de la operación, y prefiero perder ese argumento hoy que perder el piloto en el mes cuatro.",
        },
        {
          speaker: "barrett",
          text: "Agreed. One more thing: Crown asked for a call tomorrow, and they didn't say what it's about.",
          es: "De acuerdo. Una cosa más: Crown pidió una llamada mañana, y no dijeron de qué se trata.",
        },
      ],
      words: [
        { word: "a paper promise", es: "una promesa de papel" },
        { word: "logistics", es: "logística" },
        { word: "drifting", es: "alejándose poco a poco" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "Who paid the six percent cost increase Dani describes?",
      questionEs: "¿Quién pagó el aumento de costo del seis por ciento que describe Dani?",
      options: [
        { label: "The academy, not the client", emoji: "🏫" },
        { label: "The client, in the next invoice", emoji: "🧾" },
        { label: "The teachers, out of their hours", emoji: "⏱️" },
      ],
      answer: 0,
      sayIt: "The academy paid it, not the client.",
      sayItEs: "La academia lo pagó, no el cliente.",
      sayItCheck: {
        target: "The academy paid it, not the client",
        altTargets: ["We did, not the client", "The academy paid it"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "Answer a competency question: situation, action, result and one number.",
      questionEs: "Responde una pregunta por competencias: situación, acción, resultado y un número.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Last year our team was losing calls at lunchtime, so I changed the shift order and trained two people on the system. Complaints went down by about thirty percent in two months.",
      sayItEs: "El año pasado nuestro equipo perdía llamadas a la hora del almuerzo, así que cambié el orden de turnos y capacité a dos personas en el sistema. Las quejas bajaron cerca de treinta por ciento en dos meses.",
      sayItAskEn: "Situation, action, result, number. Start with \"Last year ...\" and finish with a number.",
      sayItAskEs: "Situación, acción, resultado, número. Empieza con \"Last year …\" y termina con un número.",
      sayItCheck: {
        target: "Last year *",
        altTargets: ["In my last job *", "At work *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "I don't describe my work; I show the evidence.",
    es: "No describo mi trabajo; muestro la evidencia.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "Every claim I make comes with one number.",
    es: "Cada afirmación que hago viene con un número.",
    model: "lidia",
    modelActionEs: "Lidia respondió con una situación, una acción y un resultado medido.",
  },
  expressions: [
    {
      phrase: "point out",
      variants: ["points out", "pointed out", "pointing out"],
      es: "señalar",
      kind: "phrasal",
      example: "Let me point out the obvious problem.",
      exampleEs: "Déjame señalar el problema obvio.",
    },
    {
      phrase: "follow up on",
      variants: ["follows up on", "followed up on", "following up on"],
      es: "dar seguimiento a, profundizar en",
      kind: "phrasal",
      example: "I'd like to follow up on the six percent.",
      exampleEs: "Quisiera profundizar en ese seis por ciento.",
    },
    {
      phrase: "walk the talk",
      variants: ["walks the talk", "walked the talk"],
      es: "cumplir lo que uno dice",
      kind: "idiom",
      example: "What it proves is that I can walk the talk when the week is ugly.",
      exampleEs: "Lo que demuestra es que cumplo lo que digo cuando la semana es fea.",
    },
    {
      phrase: "a paper promise",
      variants: ["paper promise", "paper promises"],
      es: "una promesa de papel (que nadie cumple)",
      kind: "idiom",
      example: "The only thing that stops this becoming a paper promise.",
      exampleEs: "Lo único que evita que esto se vuelva una promesa de papel.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: a competency answer — situation, action, result and one number.",
    es: "Treinta segundos: una respuesta por competencias — situación, acción, resultado y un número.",
  },
  continueWith: [
    "The situation was ...",
    "What I did was ...",
    "The result was ...",
  ],
  cliffhanger: {
    en: "Lidia leads the room and Dani the operation — and Crown wants a call tomorrow, without saying why.",
    es: "Lidia dirige el salón y Dani la operación, y Crown quiere una llamada mañana sin decir por qué.",
  },
};
