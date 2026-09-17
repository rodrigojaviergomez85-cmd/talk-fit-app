import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep18-the-question-nobody-prepares-for/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep18-the-question-nobody-prepares-for/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep18-the-question-nobody-prepares-for/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep18-the-question-nobody-prepares-for/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep18-the-question-nobody-prepares-for/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep18-the-question-nobody-prepares-for/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep18-the-question-nobody-prepares-for/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep18-the-question-nobody-prepares-for/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep18-the-question-nobody-prepares-for/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep18-the-question-nobody-prepares-for/s9.jpg";

export const ADVANCED1_EP18_THE_QUESTION_NOBODY_PREPARES_FOR: StorybookEpisode = {
  id: "advanced1-ep18-the-question-nobody-prepares-for",
  moduleId: "advanced-1",
  week: 4,
  title: "The question nobody prepares for",
  titleEs: "La pregunta para la que nadie se prepara",
  episodeLabel: {
    en: "Advanced 1 · Episode 18",
    es: "Advanced 1 · Episodio 18",
  },
  previously: [
    {
      en: "Lidia will lead the pilot classroom and Dani the operation.",
      es: "Lidia dirigirá el salón del piloto y Dani la operación.",
    },
    {
      en: "Crown asked for a call without saying why.",
      es: "Crown pidió una llamada sin decir el motivo.",
    },
    {
      en: "Nobody in the office knows what it's about.",
      es: "Nadie en la oficina sabe de qué se trata.",
    },
  ],
  reviewWords: [
    { word: "pilot", es: "plan piloto" },
    { word: "committee", es: "comité" },
    { word: "condition", es: "condición" },
    { word: "offer", es: "oferta" },
    { word: "method", es: "método" },
  ],
  blurb: {
    en: "Ten seconds of honest silence beats five seconds of pretending.",
    es: "Diez segundos de silencio honesto valen más que cinco fingiendo.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Dani warns Vale that Crown is calling in four minutes.",
      text: "Thursday, 9:00.",
      es: "Jueves, 9:00.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "Crown is on the line in four minutes, and we still don't know the subject.",
          es: "Crown entra en cuatro minutos, y seguimos sin saber el tema.",
        },
        {
          speaker: "vale",
          text: "Then we prepare the only thing we can: how we sound when we don't know.",
          es: "Entonces preparamos lo único que podemos: cómo sonamos cuando no sabemos.",
        },
      ],
      words: [
        { word: "subject", es: "tema" },
        { word: "prepare", es: "preparar" },
        { word: "sound", es: "sonar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Ms. Keller from Crown speaks to Vale on the video call.",
      text: "On the call.",
      es: "En la llamada.",
      speaker: "keller",
      cast: ["keller", "vale"],
      lines: [
        {
          speaker: "keller",
          text: "Thank you for making time. I'm not calling about the pilot. I'm calling about you.",
          es: "Gracias por hacer espacio. No llamo por el piloto. Llamo por ti.",
        },
        {
          speaker: "vale",
          text: "Go ahead.",
          es: "Adelante.",
        },
        {
          speaker: "keller",
          text: "We're building a regional training role, and your name came up twice. Would you consider leaving what you built?",
          es: "Estamos creando un puesto regional de formación, y tu nombre salió dos veces. ¿Considerarías dejar lo que construiste?",
        },
      ],
      words: [
        { word: "regional", es: "regional" },
        { word: "role", es: "puesto, rol" },
        { word: "consider", es: "considerar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale asks for ten seconds and thinks before answering.",
      text: "Ten seconds.",
      es: "Diez segundos.",
      speaker: "vale",
      cast: ["vale", "keller"],
      lines: [
        {
          speaker: "vale",
          text: "Give me ten seconds; that question deserves an answer rather than a reflex.",
          es: "Dame diez segundos; esa pregunta merece una respuesta y no un reflejo.",
        },
        {
          speaker: "keller",
          text: "Most people freeze up or fill the silence. Take the ten.",
          es: "La mayoría se bloquea o llena el silencio. Tómate los diez.",
        },
      ],
      words: [
        { word: "freeze up", es: "bloquearse, paralizarse" },
        { word: "reflex", es: "reflejo" },
        { word: "silence", es: "silencio" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale gives her honest answer to Crown.",
      text: "The answer.",
      es: "La respuesta.",
      speaker: "vale",
      cast: ["vale", "keller"],
      lines: [
        {
          speaker: "vale",
          text: "Here's my honest answer. I'd consider any role that puts the method in front of more people, so I'm not going to pretend the question offends me. What I wouldn't do is hand over a method I still teach to a company that would treat it as content, because the moment nobody corrects a student in week five, the whole thing stops working. So the question I'd ask you is the reverse of yours: would Crown buy the classroom, or only the slides? If it's the classroom, we should talk properly. If it's the slides, you'd be paying a lot for a file you could write yourselves.",
          es: "Esta es mi respuesta honesta. Consideraría cualquier puesto que ponga el método frente a más gente, así que no voy a fingir que la pregunta me ofende. Lo que no haría es entregar un método que todavía enseño a una empresa que lo trataría como contenido, porque en el momento en que nadie corrige a un estudiante en la semana cinco, todo deja de funcionar. Así que mi pregunta es la inversa de la tuya: ¿Crown compraría el salón o solo las diapositivas? Si es el salón, deberíamos hablar en serio. Si son las diapositivas, estarían pagando mucho por un archivo que ustedes mismos podrían escribir.",
        },
      ],
      words: [
        { word: "pretend", es: "fingir" },
        { word: "content", es: "contenido" },
        { word: "reverse", es: "inversa, al revés" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Ms. Keller throws an unexpected teaching question at Vale.",
      text: "The curveball.",
      es: "La pregunta inesperada.",
      speaker: "keller",
      cast: ["keller", "vale"],
      lines: [
        {
          speaker: "keller",
          text: "Fair. Now let me throw a curveball: if you had to teach English to a room that didn't want to be there, what's the first thing you'd remove?",
          es: "Justo. Ahora déjame lanzar una pregunta inesperada: si tuvieras que enseñar inglés a un salón que no quiere estar ahí, ¿qué es lo primero que quitarías?",
        },
        {
          speaker: "vale",
          text: "Off the top of my head, the grammar explanation. People who don't want to be there will tolerate speaking; they won't tolerate a lecture.",
          es: "Así de pronto, la explicación gramatical. La gente que no quiere estar ahí tolera hablar; no tolera una conferencia.",
        },
      ],
      words: [
        { word: "throw a curveball", es: "lanzar una pregunta inesperada" },
        { word: "off the top of my head", es: "así de pronto, sin pensarlo mucho" },
        { word: "tolerate", es: "tolerar" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani questions Vale in the office after the call ends.",
      text: "Dani, after.",
      es: "Dani, después.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "You didn't say no.",
          es: "No dijiste que no.",
        },
        {
          speaker: "vale",
          text: "I said what's true. Saying no to a conversation is cheap; saying what my condition is makes them decide.",
          es: "Dije lo que es cierto. Decir que no a una conversación es barato; decir cuál es mi condición los obliga a decidir.",
        },
        {
          speaker: "dani",
          text: "And if they come back with more money?",
          es: "¿Y si vuelven con más dinero?",
        },
        {
          speaker: "vale",
          text: "Then the price was never the question, and they'll have proved my point for me. What I'd be selling is six years of corrections, and that isn't a file they can copy.",
          es: "Entonces el precio nunca fue la pregunta, y me habrán dado la razón. Lo que estaría vendiendo son seis años de correcciones, y eso no es un archivo que puedan copiar.",
        },
      ],
      words: [
        { word: "cheap", es: "barato" },
        { word: "corrections", es: "correcciones" },
        { word: "copy", es: "copiar" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale explains the four-move rule straight to you, with Dani listening.",
      text: "The rule, and your turn.",
      es: "La regla, y tu turno.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "When a question surprises you, don't talk around it. Answer, say why, give one example, and close. Four moves, thirty seconds.",
          es: "Cuando una pregunta te sorprenda, no le des vueltas. Responde, di por qué, da un ejemplo y cierra. Cuatro movimientos, treinta segundos.",
        },
        {
          speaker: "vale",
          text: "Your turn, and you get ten seconds: if you could remove one thing from your current job or your studies, what would it be and why?",
          es: "Tu turno, y tienes diez segundos: si pudieras quitar una cosa de tu trabajo o tus estudios, ¿cuál sería y por qué?",
        },
      ],
      words: [
        { word: "talk around", es: "dar vueltas a algo, evitar el tema" },
        { word: "surprises", es: "sorprende" },
        { word: "moves", es: "movimientos, pasos" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani and Camila talk with Vale about the rumour in the office.",
      text: "The office talks.",
      es: "La oficina habla.",
      speaker: "dani",
      cast: ["dani", "vale", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Most people would have said \"that's a great question\" and bought themselves five seconds.",
          es: "La mayoría habría dicho \"qué buena pregunta\" y se habría comprado cinco segundos.",
        },
        {
          speaker: "vale",
          text: "Which everyone recognises. Asking for ten seconds honestly sounds far stronger than pretending you're already thinking.",
          es: "Que todo el mundo reconoce. Pedir diez segundos con honestidad suena mucho más fuerte que fingir que ya estabas pensando.",
        },
        {
          speaker: "camila",
          text: "The office heard that Crown wants you, and by lunchtime it had turned into \"Vale is leaving\".",
          es: "La oficina escuchó que Crown te quiere, y para el almuerzo se había convertido en \"Vale se va\".",
        },
        {
          speaker: "vale",
          text: "Then I'll say it in the meeting, in one sentence, before it becomes three.",
          es: "Entonces lo diré en la reunión, en una frase, antes de que se vuelva tres.",
        },
      ],
      words: [
        { word: "recognises", es: "reconoce" },
        { word: "lunchtime", es: "hora del almuerzo" },
        { word: "sentence", es: "frase, oración" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale speaks to the whole team in the meeting room.",
      text: "One sentence.",
      es: "Una frase.",
      speaker: "vale",
      cast: ["vale", "camila", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "I was offered a conversation, not a job, and I'm staying. What I want you to take from it isn't loyalty; it's that the offer only exists because our numbers are public and our students speak. If you're ever the person on that call, don't answer out of fear and don't answer out of flattery. Ask what they'd actually be buying, say your condition out loud, and let them decide whether they still want you.",
          es: "Me ofrecieron una conversación, no un trabajo, y me quedo. Lo que quiero que se lleven no es lealtad; es que la oferta solo existe porque nuestros números son públicos y nuestros estudiantes hablan. Si algún día tú eres quien recibe esa llamada, no respondas por miedo ni por halago. Pregunta qué estarían comprando en realidad, di tu condición en voz alta y deja que decidan si todavía te quieren.",
        },
        {
          speaker: "vale",
          text: "One more thing, and it matters more than the offer. Nobody in this office should hear news about this company from Crown before they hear it from me, so if you're ever asked something you can't answer, say that you don't decide it and that I'll call them today. That protects you and it protects us, and it costs nothing except a phone call I'd have had to make anyway.",
          es: "Una cosa más, y importa más que la oferta. Nadie en esta oficina debería enterarse de algo de esta empresa por Crown antes que por mí, así que si alguna vez te preguntan algo que no puedes responder, di que tú no lo decides y que yo llamaré hoy. Eso te protege a ti y nos protege a nosotros, y no cuesta nada salvo una llamada que yo habría tenido que hacer igual.",
        },
        {
          speaker: "dani",
          text: "Friday's session changed. Barrett wants you on the other side of the table, interviewing us.",
          es: "La sesión del viernes cambió. Barrett te quiere del otro lado de la mesa, entrevistándonos a nosotros.",
        },
      ],
      words: [
        { word: "flattery", es: "halago" },
        { word: "offer", es: "oferta" },
        { word: "protects", es: "protege" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "What would Vale remove first from a class that doesn't want to be there?",
      questionEs: "¿Qué quitaría Vale primero de una clase que no quiere estar ahí?",
      options: [
        { label: "The grammar explanation", emoji: "📘" },
        { label: "The speaking practice", emoji: "🗣️" },
        { label: "The final test", emoji: "📝" },
      ],
      answer: 0,
      sayIt: "She would remove the grammar explanation first.",
      sayItEs: "Quitaría primero la explicación gramatical.",
      sayItCheck: {
        target: "She would remove the grammar explanation",
        altTargets: ["The grammar explanation", "She removes the grammar explanation"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Answer an unexpected question in four moves: answer, why, example, close.",
      questionEs: "Responde una pregunta inesperada en cuatro movimientos: respuesta, por qué, ejemplo y cierre.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I'd remove the morning report, because it repeats what the system already shows. Last month it took us four hours a week, and nobody read it. That's the one thing I'd cut first.",
      sayItEs: "Quitaría el reporte de la mañana, porque repite lo que el sistema ya muestra. El mes pasado nos tomó cuatro horas por semana y nadie lo leyó. Eso es lo primero que cortaría.",
      sayItAskEn: "Four moves: answer, why, one example, close. Start with \"I'd remove ...\".",
      sayItAskEs: "Cuatro movimientos: respuesta, por qué, un ejemplo y cierre. Empieza con \"I'd remove …\".",
      sayItCheck: {
        target: "I'd remove *",
        altTargets: ["I would remove *", "The first thing I'd remove is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s3",
    phrase: "Ten honest seconds are stronger than a fast answer.",
    es: "Diez segundos honestos son más fuertes que una respuesta rápida.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "Answer, say why, give one example, close.",
    es: "Responde, di por qué, da un ejemplo y cierra.",
    model: "vale",
    modelActionEs: "Vale respondió la pregunta sorpresa en cuatro movimientos, sin dar vueltas.",
  },
  expressions: [
    {
      phrase: "freeze up",
      variants: ["freezes up", "froze up", "freezing up"],
      es: "bloquearse, quedarse paralizado",
      kind: "phrasal",
      example: "Most people freeze up or fill the silence.",
      exampleEs: "La mayoría se bloquea o llena el silencio.",
    },
    {
      phrase: "talk around",
      variants: ["talks around", "talked around", "talking around"],
      es: "dar vueltas a algo, evitar el tema",
      kind: "phrasal",
      example: "When a question surprises you, don't talk around it.",
      exampleEs: "Cuando una pregunta te sorprenda, no le des vueltas.",
    },
    {
      phrase: "off the top of my head",
      variants: ["off the top of her head", "off the top of your head"],
      es: "así de pronto, sin pensarlo mucho",
      kind: "idiom",
      example: "Off the top of my head, the grammar explanation.",
      exampleEs: "Así de pronto, la explicación gramatical.",
    },
    {
      phrase: "throw a curveball",
      variants: ["throws a curveball", "threw a curveball", "throwing a curveball"],
      es: "lanzar una pregunta inesperada",
      kind: "idiom",
      example: "Now let me throw a curveball.",
      exampleEs: "Ahora déjame lanzar una pregunta inesperada.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: answer an unexpected question — answer, why, one example, close.",
    es: "Treinta segundos: responde una pregunta inesperada — respuesta, por qué, un ejemplo y cierre.",
  },
  continueWith: [
    "Give me ten seconds ...",
    "The honest answer is ...",
    "For example, ...",
  ],
  cliffhanger: {
    en: "On Friday the chairs turn around: Vale is the one asking the questions.",
    es: "El viernes las sillas se dan vuelta: Vale es quien hace las preguntas.",
  },
};
