import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep16-the-ninety-days/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep16-the-ninety-days/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep16-the-ninety-days/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep16-the-ninety-days/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep16-the-ninety-days/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep16-the-ninety-days/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep16-the-ninety-days/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep16-the-ninety-days/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep16-the-ninety-days/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep16-the-ninety-days/s9.jpg";

export const ADVANCED1_EP16_THE_NINETY_DAYS: StorybookEpisode = {
  id: "advanced1-ep16-the-ninety-days",
  moduleId: "advanced-1",
  week: 4,
  title: "The ninety days",
  titleEs: "Los noventa días",
  episodeLabel: {
    en: "Advanced 1 · Episode 16",
    es: "Advanced 1 · Episodio 16",
  },
  previously: [
    {
      en: "The committee decides on Monday.",
      es: "El comité decide el lunes.",
    },
    {
      en: "They asked for Vale's first ninety days in writing.",
      es: "Pidieron los primeros noventa días de Vale por escrito.",
    },
    {
      en: "She isn't defending herself any more; she's designing.",
      es: "Ya no se está defendiendo: está diseñando.",
    },
  ],
  reviewWords: [
    { word: "committee", es: "comité" },
    { word: "attrition", es: "deserción" },
    { word: "evidence", es: "evidencia" },
    { word: "measured", es: "medido" },
    { word: "pilot", es: "plan piloto" },
  ],
  blurb: {
    en: "Ninety seconds for fifteen years: past, present and future, with dates attached.",
    es: "Noventa segundos para quince años: pasado, presente y futuro, con fechas al lado.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Dani shows Vale the committee's early-morning email in the academy office.",
      text: "Monday, 7:40 a.m.",
      es: "Lunes, 7:40 a.m.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "The email came in at six. They didn't say yes, and they didn't say no; they asked for the ninety days in writing by noon.",
          es: "El correo llegó a las seis. No dijeron que sí ni que no; pidieron los noventa días por escrito antes del mediodía.",
        },
        {
          speaker: "vale",
          text: "Then they're already treating me like the person who runs it. A committee that had decided against me wouldn't ask for a plan.",
          es: "Entonces ya me tratan como la persona que lo dirige. Un comité que hubiera decidido en mi contra no pediría un plan.",
        },
        {
          speaker: "dani",
          text: "Do you want me to write the first draft?",
          es: "¿Quieres que escriba el primer borrador?",
        },
        {
          speaker: "vale",
          text: "No. This one has my name on it, so it gets my hands on it.",
          es: "No. Este lleva mi nombre, así que lleva mis manos.",
        },
      ],
      words: [
        { word: "draft", es: "borrador" },
        { word: "committee", es: "comité" },
        { word: "noon", es: "mediodía" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale lays the ninety-day plan on the table while Dani reads it.",
      text: "The plan on the table.",
      es: "El plan sobre la mesa.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Thirty days to measure, thirty to train, thirty to prove. If we can't show attrition falling by day ninety, the plan was wrong, not the teachers.",
          es: "Treinta días para medir, treinta para entrenar, treinta para demostrar. Si no baja la deserción para el día noventa, el plan estaba mal, no los maestros.",
        },
        {
          speaker: "dani",
          text: "That's a hard thing to put in front of a committee.",
          es: "Eso es duro para ponerlo frente a un comité.",
        },
        {
          speaker: "vale",
          text: "It's the only thing they'll believe. Anyone can promise improvement; almost nobody names the date it should be visible.",
          es: "Es lo único que van a creer. Cualquiera promete mejoras; casi nadie pone la fecha en que deben verse.",
        },
      ],
      words: [
        { word: "attrition", es: "deserción" },
        { word: "improvement", es: "mejora" },
        { word: "visible", es: "visible" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Barrett calls Vale from the Northline meeting room.",
      text: "Barrett calls.",
      es: "Barrett llama.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Before the vote, the committee wants something the paperwork doesn't give us. Tell us your professional story — where you started, where you are, where this goes.",
          es: "Antes del voto, el comité quiere algo que el papeleo no nos da. Cuéntanos tu historia profesional: dónde empezaste, dónde estás y hacia dónde va esto.",
        },
        {
          speaker: "vale",
          text: "Seventy-five seconds or ten minutes?",
          es: "¿Setenta y cinco segundos o diez minutos?",
        },
        {
          speaker: "barrett",
          text: "Ninety seconds. If it takes ten minutes, it isn't a story; it's a defence.",
          es: "Noventa segundos. Si toma diez minutos, no es una historia; es una defensa.",
        },
      ],
      words: [
        { word: "paperwork", es: "papeleo" },
        { word: "vote", es: "voto" },
        { word: "defence", es: "defensa" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale tells her professional story on the call, calm and direct.",
      text: "Vale's story, in ninety seconds.",
      es: "La historia de Vale, en noventa segundos.",
      speaker: "vale",
      cast: ["vale", "barrett"],
      lines: [
        {
          speaker: "vale",
          text: "I started with eleven adult students in a rented room, and I built the method from the ground up because nothing I could buy actually made people speak.",
          es: "Empecé con once estudiantes adultos en un cuarto alquilado, y construí el método desde cero porque nada de lo que podía comprar hacía hablar a la gente.",
        },
        {
          speaker: "barrett",
          text: "Six years ago. What did you keep from that room?",
          es: "Hace seis años. ¿Qué te quedaste de ese cuarto?",
        },
        {
          speaker: "vale",
          text: "The habit of throwing away whatever didn't work. Today that room is an academy with a real track record: fourteen teachers, three corporate clients and attrition under nine percent.",
          es: "La costumbre de tirar lo que no funcionaba. Hoy ese cuarto es una academia con un historial real: catorce maestros, tres clientes corporativos y una deserción por debajo del nueve por ciento.",
        },
        {
          speaker: "barrett",
          text: "And where does that take you next?",
          es: "¿Y hacia dónde te lleva eso ahora?",
        },
        {
          speaker: "vale",
          text: "Not to a bigger classroom. To the method running in three countries, taught by teachers I trained.",
          es: "No a un salón más grande. A que el método opere en tres países, enseñado por maestros que yo formé.",
        },
        {
          speaker: "barrett",
          text: "Measured by whom?",
          es: "¿Medido por quién?",
        },
        {
          speaker: "vale",
          text: "By people who don't work for me. That's the only way the numbers mean anything.",
          es: "Por gente que no trabaja para mí. Es la única forma de que los números signifiquen algo.",
        },
      ],
      words: [
        { word: "from the ground up", es: "desde cero" },
        { word: "track record", es: "historial, trayectoria" },
        { word: "rented", es: "alquilado" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Elena stands in the doorway of Vale's office with a quiet smile.",
      text: "Elena in the doorway.",
      es: "Elena en la puerta.",
      speaker: "elena",
      cast: ["elena", "vale"],
      lines: [
        {
          speaker: "elena",
          text: "They asked me to say two sentences about you. I said I stopped translating in my head in week four.",
          es: "Me pidieron decir dos frases sobre ti. Dije que dejé de traducir en mi cabeza en la semana cuatro.",
        },
        {
          speaker: "vale",
          text: "That's worth more than my slides, and it's the one thing I can't write myself.",
          es: "Eso vale más que mis diapositivas, y es lo único que yo no puedo escribir.",
        },
        {
          speaker: "elena",
          text: "When I look back on it, the strange part is how ordinary it felt.",
          es: "Cuando lo veo en retrospectiva, lo raro es lo normal que se sintió.",
        },
      ],
      words: [
        { word: "look back on", es: "ver en retrospectiva" },
        { word: "translating", es: "traduciendo" },
        { word: "ordinary", es: "normal, común" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila raises her concern about the service team's workload.",
      text: "Camila's worry.",
      es: "La preocupación de Camila.",
      speaker: "camila",
      cast: ["camila", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "If the pilot is approved, the first ninety days land on my team too. We'd be building up to double the calls.",
          es: "Si aprueban el piloto, los primeros noventa días también caen sobre mi equipo. Estaríamos llegando al doble de llamadas.",
        },
        {
          speaker: "vale",
          text: "Which is why your numbers are in the plan, not in a footnote. A pilot that wins the contract and loses the service is a pilot that failed.",
          es: "Por eso tus números están en el plan, no en una nota al pie. Un piloto que gana el contrato y pierde el servicio es un piloto fracasado.",
        },
      ],
      words: [
        { word: "building up to", es: "llegando poco a poco a" },
        { word: "footnote", es: "nota al pie" },
        { word: "approved", es: "aprobado" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale speaks straight to you while Reed's message appears on her screen.",
      text: "Vale coaches you, and Reed writes.",
      es: "Vale te entrena a ti, y Reed escribe.",
      speaker: "vale",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "vale",
          text: "Now it's just you and me, so your turn. Past, present, future, in ninety seconds. Don't apologise for what you haven't done yet; your studies, your projects and your English are experience.",
          es: "Ahora somos solo tú y yo, así que es tu turno. Pasado, presente, futuro, en noventa segundos. No te disculpes por lo que aún no has hecho; tus estudios, tus proyectos y tu inglés son experiencia.",
        },
        {
          speaker: "reed",
          text: "Northline's board is watching this vote. I told them what I've told you: I'm not paying for English, I'm paying for people who can be understood on a call.",
          es: "La junta de Northline está mirando este voto. Les dije lo que te he dicho: no pago por inglés, pago por gente que se entienda en una llamada.",
        },
        {
          speaker: "vale",
          text: "Then the plan is written in your language, not mine.",
          es: "Entonces el plan está escrito en tu idioma, no en el mío.",
        },
      ],
      words: [
        { word: "apologise", es: "disculparse" },
        { word: "board", es: "junta directiva" },
        { word: "understood", es: "entendido" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani says the uncomfortable thing while Vale listens.",
      text: "Dani, honestly.",
      es: "Dani, con honestidad.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "Can I say something you won't like? If this goes through, you'll be managing more than teaching, and that's the part you've never enjoyed.",
          es: "¿Puedo decir algo que no te va a gustar? Si esto sale, vas a dirigir más de lo que enseñas, y esa es la parte que nunca has disfrutado.",
        },
        {
          speaker: "vale",
          text: "You're right, so the plan protects six teaching hours a week. A method nobody teaches becomes a document, and documents don't make anyone speak.",
          es: "Tienes razón, por eso el plan protege seis horas de clase a la semana. Un método que nadie enseña se vuelve un documento, y los documentos no hacen hablar a nadie.",
        },
      ],
      words: [
        { word: "managing", es: "dirigiendo" },
        { word: "document", es: "documento" },
        { word: "protects", es: "protege" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale sends the plan as Barrett calls back with the committee's answer.",
      text: "Sent.",
      es: "Enviado.",
      speaker: "vale",
      cast: ["vale", "dani", "barrett"],
      lines: [
        {
          speaker: "vale",
          text: "It's in. What I've sent them is not a promise; it's a set of dates with my name next to each one.",
          es: "Está enviado. Lo que les mandé no es una promesa; es un conjunto de fechas con mi nombre al lado de cada una.",
        },
        {
          speaker: "dani",
          text: "And if the numbers don't move by day ninety?",
          es: "¿Y si los números no se mueven para el día noventa?",
        },
        {
          speaker: "vale",
          text: "Then they don't need to fire me. I'll bring the evidence to that meeting myself and tell them exactly what I got wrong.",
          es: "Entonces no tienen que despedirme. Yo misma llevaré la evidencia a esa reunión y les diré exactamente en qué me equivoqué.",
        },
        {
          speaker: "dani",
          text: "Most people would have left that line out of the plan.",
          es: "La mayoría habría dejado esa línea fuera del plan.",
        },
        {
          speaker: "vale",
          text: "That's the difference between wanting a contract and wanting the work to survive.",
          es: "Esa es la diferencia entre querer un contrato y querer que el trabajo sobreviva.",
        },
        {
          speaker: "barrett",
          text: "The committee approves the pilot in principle. One condition: we choose who leads it with you, and we interview them on Wednesday.",
          es: "El comité aprueba el piloto en principio. Una condición: elegimos quién lo dirige contigo, y los entrevistamos el miércoles.",
        },
      ],
      words: [
        { word: "promise", es: "promesa" },
        { word: "survive", es: "sobrevivir" },
        { word: "condition", es: "condición" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What does Vale want next for her method?",
      questionEs: "¿Qué quiere Vale a continuación para su método?",
      options: [
        { label: "The method running in three countries, taught by teachers she trained", emoji: "🌎" },
        { label: "A bigger classroom in the same building", emoji: "🏫" },
        { label: "To stop teaching and only write materials", emoji: "📝" },
      ],
      answer: 0,
      sayIt: "She wants the method running in three countries, taught by teachers she trained.",
      sayItEs: "Quiere el método operando en tres países, enseñado por maestros que ella formó.",
      sayItCheck: {
        target: "She wants the method running in three countries",
        altTargets: ["The method running in three countries", "In three countries"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Tell your professional story in ninety seconds: past, present and future.",
      questionEs: "Cuenta tu historia profesional en noventa segundos: pasado, presente y futuro.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I started in a call center three years ago, today I train new agents, and what I want next is to run a team where English isn't the thing that stops us.",
      sayItEs: "Empecé en un call center hace tres años, hoy formo agentes nuevos, y lo que quiero después es dirigir un equipo donde el inglés no sea lo que nos detiene.",
      sayItAskEn: "Past, present, future. Start with \"I started ...\", then \"Today I ...\", then \"What I want next is ...\".",
      sayItAskEs: "Pasado, presente, futuro. Empieza con \"I started …\", luego \"Today I …\", y luego \"What I want next is …\".",
      sayItCheck: {
        target: "I started *",
        altTargets: ["Today I *", "What I want next is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "My past is not an apology; it's evidence.",
    es: "Mi pasado no es una disculpa; es evidencia.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "I put a date next to every promise I make.",
    es: "Pongo una fecha al lado de cada promesa que hago.",
    model: "vale",
    modelActionEs: "Vale escribió su plan con fechas exactas en vez de promesas generales.",
  },
  expressions: [
    {
      phrase: "look back on",
      variants: ["looks back on", "looked back on", "looking back on"],
      es: "ver en retrospectiva",
      kind: "phrasal",
      example: "When I look back on it, the strange part is how ordinary it felt.",
      exampleEs: "Cuando lo veo en retrospectiva, lo raro es lo normal que se sintió.",
    },
    {
      phrase: "build up to",
      variants: ["building up to", "builds up to", "built up to"],
      es: "llegar poco a poco a, ir acumulando hasta",
      kind: "phrasal",
      example: "We'd be building up to double the calls.",
      exampleEs: "Estaríamos llegando al doble de llamadas.",
    },
    {
      phrase: "from the ground up",
      es: "desde cero",
      kind: "idiom",
      example: "I built the method from the ground up.",
      exampleEs: "Construí el método desde cero.",
    },
    {
      phrase: "track record",
      variants: ["a track record", "the track record"],
      es: "historial comprobado, trayectoria",
      kind: "idiom",
      example: "Today I run an academy with a real track record.",
      exampleEs: "Hoy dirijo una academia con un historial real.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: your professional story — where you started, where you are, where you're going.",
    es: "Treinta segundos: tu historia profesional — dónde empezaste, dónde estás y hacia dónde vas.",
  },
  continueWith: [
    "I started ...",
    "Today I ...",
    "What I want next is ...",
  ],
  cliffhanger: {
    en: "The pilot is approved in principle — but the committee chooses who leads it, and they interview on Wednesday.",
    es: "El piloto está aprobado en principio, pero el comité elige quién lo dirige y entrevista el miércoles.",
  },
};
