import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep20-the-last-room/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep20-the-last-room/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep20-the-last-room/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep20-the-last-room/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep20-the-last-room/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep20-the-last-room/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep20-the-last-room/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep20-the-last-room/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep20-the-last-room/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep20-the-last-room/s9.jpg";

export const ADVANCED1_EP20_THE_LAST_ROOM: StorybookEpisode = {
  id: "advanced1-ep20-the-last-room",
  moduleId: "advanced-1",
  week: 4,
  title: "The last room",
  titleEs: "La última sala",
  episodeLabel: {
    en: "Advanced 1 · Episode 20",
    es: "Advanced 1 · Episodio 20",
  },
  previously: [
    {
      en: "Three chairs. Lidia handled the client better; Dani sold better.",
      es: "Tres sillas. Lidia manejó mejor al cliente; Dani vendió mejor.",
    },
    {
      en: "Barrett will choose the one the pilot needs, not the better one.",
      es: "Barrett va a elegir al que el piloto necesita, no al mejor.",
    },
    {
      en: "Monday, the small room. Crown is still calling Lidia.",
      es: "Lunes, el salón pequeño. Crown sigue llamando a Lidia.",
    },
  ],
  reviewWords: [
    { word: "pilot", es: "plan piloto" },
    { word: "candidate", es: "candidato" },
    { word: "withdraw", es: "retirarse" },
    { word: "charged", es: "cobrado" },
    { word: "headset", es: "diadema" },
  ],
  blurb: {
    en: "One room, eight questions, both candidates, no notes. The room where Dani couldn't finish a sentence is where Barrett chooses, Lidia answers a call from Crown, and Vale gives away the one thing she never planned to give.",
    es: "Una sala, ocho preguntas, los dos candidatos, sin notas. El salón donde Dani no podía terminar una frase es donde Barrett elige, Lidia contesta una llamada de Crown, y Vale regala lo único que nunca pensó regalar.",
  },
  cover,
  voice: "male",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "The academy's original small classroom in early light; Vale placing chairs in a circle; Dani in the doorway with his backpack.",
      text: "Monday, 7:30 a.m. The small room.",
      es: "Lunes, 7:30 a.m. El salón pequeño.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "Why here?",
          es: "¿Por qué aquí?",
        },
        {
          speaker: "vale",
          text: "Because this is where you couldn't finish a sentence.",
          es: "Porque aquí es donde no podías terminar una frase.",
        },
        {
          speaker: "dani",
          text: "Three years ago.",
          es: "Hace tres años.",
        },
        {
          speaker: "vale",
          text: "Two years and eight months. You've come a long way from that chair, and I want the committee to sit in it.",
          es: "Dos años y ocho meses. Has recorrido mucho desde esa silla, y quiero que el comité se siente en ella.",
        },
      ],
      words: [
        { word: "sentence", es: "frase, oración" },
        { word: "committee", es: "comité" },
        { word: "chair", es: "silla" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "The circle of chairs full: Barrett, Camila, Lidia, Mía and Dani; Vale standing by the whiteboard; no papers on anyone's lap.",
      text: "Eight questions.",
      es: "Ocho preguntas.",
      speaker: "barrett",
      cast: ["barrett", "dani", "lidia", "camila", "mia", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "One room, eight questions, both of you, no notes. This isn't a grammar test. Round one. Dani, tell me about yourself.",
          es: "Una sala, ocho preguntas, los dos, sin notas. Esto no es un examen de gramática. Ronda uno. Dani, háblame de ti.",
        },
        {
          speaker: "dani",
          text: "Right now I run operations for an academy with three hundred students. My background is this chair: I was the student who couldn't finish a sentence. One of my strengths is that I notice who stops coming before they stop. My goal is a pilot where nobody freezes on a call.",
          es: "Ahora mismo dirijo operaciones en una academia con trescientos estudiantes. Mi historia es esta silla: fui el estudiante que no podía terminar una frase. Una de mis fortalezas es que noto quién deja de venir antes de que deje de venir. Mi meta es un piloto donde nadie se congele en una llamada.",
        },
        {
          speaker: "barrett",
          text: "Tell me something about you that isn't on your résumé.",
          es: "Cuéntame algo de ti que no esté en tu currículum.",
        },
        {
          speaker: "dani",
          text: "I still rehearse out loud on the bus. People stare. I've stopped noticing.",
          es: "Todavía ensayo en voz alta en el bus. La gente se me queda viendo. Ya dejé de notarlo.",
        },
      ],
      words: [
        { word: "operations", es: "operaciones" },
        { word: "background", es: "historia, trayectoria" },
        { word: "rehearse", es: "ensayar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Lidia speaking calmly in the circle, one hand open; Camila holding up her phone with an email on the screen; Barrett listening.",
      text: "Rounds two and three.",
      es: "Rondas dos y tres.",
      speaker: "barrett",
      cast: ["barrett", "lidia", "dani", "camila"],
      lines: [
        {
          speaker: "barrett",
          text: "Lidia. Tell me about a difficult situation you handled. What exactly did you do?",
          es: "Lidia. Cuéntame de una situación difícil que manejaste. ¿Qué hiciste tú exactamente?",
        },
        {
          speaker: "lidia",
          text: "Friday. I read a complaint asking to replace me because of my accent, and then I taught the class anyway. Eleven minutes of speaking per agent. I have the file, and the client has the file.",
          es: "El viernes. Leí una queja pidiendo que me reemplazaran por mi acento, y después di la clase igual. Once minutos hablados por agente. Tengo el archivo, y el cliente tiene el archivo.",
        },
        {
          speaker: "barrett",
          text: "Dani. Why should we hire you? Give me a real example.",
          es: "Dani. ¿Por qué deberíamos contratarte? Dame un ejemplo real.",
        },
        {
          speaker: "dani",
          text: "On Friday a client wanted a teacher changed. I sold him two weeks of numbers instead. He signed the two weeks this morning.",
          es: "El viernes un cliente quería cambiar de maestra. En vez de eso le vendí dos semanas de números. Firmó las dos semanas esta mañana.",
        },
        {
          speaker: "camila",
          text: "Seven forty. I have the email. I always have the email.",
          es: "Siete cuarenta. Tengo el correo. Siempre tengo el correo.",
        },
      ],
      words: [
        { word: "complaint", es: "queja" },
        { word: "replace", es: "reemplazar" },
        { word: "signed", es: "firmó" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani in the circle, ten seconds of silence on his face; Mía biting back a smile; Barrett with her eyebrows raised.",
      text: "Round five: the unexpected one.",
      es: "Ronda cinco: la inesperada.",
      speaker: "barrett",
      cast: ["barrett", "lidia", "dani", "mia"],
      lines: [
        {
          speaker: "barrett",
          text: "If you were an animal, which one would you be and why? Lidia first.",
          es: "Si fueras un animal, ¿cuál serías y por qué? Lidia primero.",
        },
        {
          speaker: "lidia",
          text: "A mule. Everyone laughs until it's the only thing still walking at four in the afternoon.",
          es: "Una mula. Todos se ríen hasta que es lo único que sigue caminando a las cuatro de la tarde.",
        },
        {
          speaker: "dani",
          text: "A bus.",
          es: "Un bus.",
        },
        {
          speaker: "barrett",
          text: "That's not an animal.",
          es: "Eso no es un animal.",
        },
        {
          speaker: "dani",
          text: "Number forty-two. It's where I learned English out loud with strangers staring at me. The reason is that it never waited for me to be ready, and I still got where I was going. So overall, I'd be the thing that keeps moving with everyone looking.",
          es: "El número cuarenta y dos. Es donde aprendí inglés en voz alta con desconocidos mirándome. La razón es que nunca esperó a que yo estuviera listo, y aun así llegué a donde iba. Así que en general, sería la cosa que sigue moviéndose con todos mirando.",
        },
        {
          speaker: "mia",
          text: "Okay. That one's good. I'm not filming it, but it's good.",
          es: "Okay. Esa es buena. No la estoy grabando, pero es buena.",
        },
      ],
      words: [
        { word: "mule", es: "mula" },
        { word: "strangers", es: "desconocidos" },
        { word: "staring", es: "mirando fijamente" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Barrett leaning forward playing an angry customer, hand flat on her knee; Lidia answering evenly; Dani waiting his turn.",
      text: "Round seven: the customer.",
      es: "Ronda siete: el cliente.",
      speaker: "barrett",
      cast: ["barrett", "lidia", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "You charged my card twice and now I can't pay my rent. This is your fault!",
          es: "¡Me cobraron dos veces en la tarjeta y ahora no puedo pagar mi renta! ¡Es su culpa!",
        },
        {
          speaker: "lidia",
          text: "I understand, and here's what I can do. The second charge is reversed today, and I'm sending you the confirmation number while we're on the line.",
          es: "Entiendo, y esto es lo que puedo hacer. El segundo cobro se revierte hoy, y le envío el número de confirmación mientras estamos en la línea.",
        },
        {
          speaker: "barrett",
          text: "How long is that going to take? I need this fixed today.",
          es: "¿Cuánto va a tardar eso? Necesito que se arregle hoy.",
        },
        {
          speaker: "lidia",
          text: "Forty-eight hours for the bank, and I'll confirm with you by Wednesday at noon myself.",
          es: "Cuarenta y ocho horas para el banco, y yo misma se lo confirmo el miércoles al mediodía.",
        },
        {
          speaker: "barrett",
          text: "Same to you, Dani. Twenty seconds.",
          es: "Lo mismo para ti, Dani. Veinte segundos.",
        },
        {
          speaker: "dani",
          text: "I understand, and here's what I can do: the extra charge goes back today, and I'll call you back myself before five with the confirmation.",
          es: "Entiendo, y esto es lo que puedo hacer: el cobro extra regresa hoy, y le llamo yo mismo antes de las cinco con la confirmación.",
        },
      ],
      words: [
        { word: "charged", es: "cobraron" },
        { word: "reversed", es: "revertido" },
        { word: "confirmation", es: "confirmación" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Lidia standing up in the circle, phone face down on her chair; everyone else still seated; Dani looking up at her.",
      text: "Round eight: the future.",
      es: "Ronda ocho: el futuro.",
      speaker: "barrett",
      cast: ["barrett", "lidia", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Where do you want to be professionally in three years? Lidia.",
          es: "¿Dónde quieres estar profesionalmente en tres años? Lidia.",
        },
        {
          speaker: "lidia",
          text: "Somewhere I'm not the only teacher who sounds like her students. Which is why I'm saying this here and not in an email: I signed with Crown yesterday. They asked me to run their teacher training program. I'm withdrawing.",
          es: "En un lugar donde no sea la única maestra que suena como sus estudiantes. Por eso lo digo aquí y no en un correo: firmé con Crown ayer. Me pidieron dirigir su programa de formación de maestros. Me retiro.",
        },
        {
          speaker: "dani",
          text: "You could have said that at seven thirty.",
          es: "Pudiste haberlo dicho a las siete y media.",
        },
        {
          speaker: "lidia",
          text: "Then you'd have had an easy morning. You don't get one of those in this job.",
          es: "Entonces habrías tenido una mañana fácil. En este trabajo no te toca ninguna de esas.",
        },
      ],
      words: [
        { word: "professionally", es: "profesionalmente" },
        { word: "training", es: "formación" },
        { word: "withdrawing", es: "me retiro" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Barrett opening her folder to a single page and turning it toward Vale; Dani sitting very still; Mía watching him, not the page.",
      text: "The name.",
      es: "El nombre.",
      speaker: "barrett",
      cast: ["barrett", "vale", "dani", "mia"],
      lines: [
        {
          speaker: "barrett",
          text: "For the record, I wrote a name on Saturday, before anyone signed anything.",
          es: "Que conste, escribí un nombre el sábado, antes de que nadie firmara nada.",
        },
        {
          speaker: "vale",
          text: "Say it in the room.",
          es: "Dilo en la sala.",
        },
        {
          speaker: "barrett",
          text: "Dani. Not because he's the better teacher. Because on Thursday at 6:50 a girl with a headset said he's the one who'd notice if she stopped coming, and a pilot with six hundred people a year lives or dies on exactly that.",
          es: "Dani. No porque sea mejor maestro. Porque el jueves a las 6:50 una chica con diadema dijo que él es el que se daría cuenta si ella dejara de venir, y un piloto con seiscientas personas al año vive o muere exactamente de eso.",
        },
        {
          speaker: "dani",
          text: "Okay.",
          es: "Okay.",
        },
        {
          speaker: "barrett",
          text: "That's it?",
          es: "¿Eso es todo?",
        },
        {
          speaker: "dani",
          text: "That's the least dramatic useful thing I can say. The dramatic version is for the bus.",
          es: "Es lo menos dramático y más útil que puedo decir. La versión dramática es para el bus.",
        },
      ],
      words: [
        { word: "record", es: "registro, constancia" },
        { word: "exactly", es: "exactamente" },
        { word: "dramatic", es: "dramático" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale at the whiteboard with the marker capped in her hand, facing the circle; Camila looking up from her laptop; Lidia by the door with her bag.",
      text: "Vale's turn.",
      es: "El turno de Vale.",
      speaker: "vale",
      cast: ["vale", "camila", "lidia", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Then here's mine. From today I'm not teaching. This room is his. The academy needs a CEO more than it needs me at this whiteboard. I hate that sentence, so I'm going to say it once and step aside.",
          es: "Entonces aquí va lo mío. Desde hoy no doy clases. Este salón es de él. La academia necesita una CEO más de lo que me necesita a mí en esta pizarra. Odio esa frase, así que la voy a decir una vez y me hago a un lado.",
        },
        {
          speaker: "camila",
          text: "For the record, it's the first budget cut you've ever proposed.",
          es: "Que conste, es el primer recorte de presupuesto que has propuesto en tu vida.",
        },
        {
          speaker: "lidia",
          text: "You built a teacher who can lose you. That's the whole job, Vale.",
          es: "Construiste a un maestro que puede perderte. Ese es todo el trabajo, Vale.",
        },
        {
          speaker: "dani",
          text: "You're not losing the room. You're just not in it.",
          es: "No estás perdiendo el salón. Solo no estás en él.",
        },
        {
          speaker: "vale",
          text: "That's the part I hate.",
          es: "Esa es la parte que odio.",
        },
      ],
      words: [
        { word: "whiteboard", es: "pizarra" },
        { word: "budget", es: "presupuesto" },
        { word: "cut", es: "recorte" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night. Vale alone in the small room with the chairs still in a circle, her hand on the light switch; through the window, Dani on the front steps holding a Northline headset, his phone lit up in his other hand.",
      text: "9:40 p.m.",
      es: "9:40 p.m.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "Unknown number. Hello, this is Dani.",
          es: "Número desconocido. Hola, habla Dani.",
        },
        {
          speaker: "dani",
          text: "Yes, this is the academy. No, I'm not the teacher. I'm the person. Tell me what happened.",
          es: "Sí, esta es la academia. No, no soy el maestro. Soy la persona. Cuénteme qué pasó.",
        },
        {
          speaker: "vale",
          text: "Two years and eight months.",
          es: "Dos años y ocho meses.",
        },
      ],
      words: [
        { word: "unknown", es: "desconocido" },
        { word: "happened", es: "pasó" },
        { word: "person", es: "persona" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What animal does Dani choose, and why?",
      questionEs: "¿Qué animal elige Dani, y por qué?",
      options: [
        { label: "A bus, because it never waited for him to be ready and he still got there", emoji: "🚌" },
        { label: "A mule, because it keeps walking at four in the afternoon", emoji: "🫏" },
        { label: "A dog, because everyone likes dogs", emoji: "🐕" },
      ],
      answer: 0,
      sayIt: "He chooses a bus, because it never waited for him to be ready and he still got where he was going.",
      sayItEs: "Elige un bus, porque nunca esperó a que estuviera listo y aun así llegó a donde iba.",
      sayItCheck: {
        target: "He chooses a bus",
        altTargets: ["A bus", "He chose a bus", "Number forty-two"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Where do you want to be professionally in three years? One continuous answer: where, why, and what you are doing now to get there.",
      questionEs: "¿Dónde quieres estar profesionalmente en tres años? Una respuesta continua: dónde, por qué, y qué estás haciendo ahora para llegar.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "In three years I want to be leading a small team in customer service, because I'm better at fixing problems than at avoiding them, and right now I'm taking every difficult call I can get so the promotion finds me ready.",
      sayItEs: "En tres años quiero estar dirigiendo un equipo pequeño de servicio al cliente, porque soy mejor resolviendo problemas que evitándolos, y ahora mismo tomo cada llamada difícil que puedo para que el ascenso me encuentre listo.",
      sayItAskEn: "Start with \"In three years I ...\", then \"because ...\", then \"and right now I ...\".",
      sayItAskEs: "Empieza con \"In three years I …\", luego \"because …\" y luego \"and right now I …\".",
      sayItCheck: {
        target: "In three years I *",
        altTargets: ["In three years, I *", "I want to be *", "Right now I *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s2",
    phrase: "I can lead before I feel completely ready.",
    es: "Puedo liderar antes de sentirme completamente listo.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "In a long interview, I take one question at a time and finish each answer before I worry about the next.",
    es: "En una entrevista larga, tomo una pregunta a la vez y termino cada respuesta antes de preocuparme por la siguiente.",
    model: "dani",
    modelActionEs: "Dani no intentó ganar las ocho rondas de una vez: contestó cada una completa, incluso la del animal, y dejó que el resultado llegara al final.",
  },
  expressions: [
    {
      phrase: "come a long way",
      variants: ["come a long way from", "has come a long way", "you've come a long way"],
      es: "haber avanzado mucho, recorrer un largo camino",
      kind: "idiom",
      example: "You've come a long way from that chair, and I want the committee to sit in it.",
      exampleEs: "Has recorrido mucho desde esa silla, y quiero que el comité se siente en ella.",
    },
    {
      phrase: "step aside",
      variants: ["stepped aside", "stepping aside", "steps aside"],
      es: "hacerse a un lado, ceder el lugar",
      kind: "phrasal",
      example: "I'm going to say it once and step aside.",
      exampleEs: "La voy a decir una vez y me hago a un lado.",
    },
    {
      phrase: "for the record",
      es: "que conste, para que quede claro",
      kind: "idiom",
      example: "For the record, I wrote a name on Saturday, before anyone signed anything.",
      exampleEs: "Que conste, escribí un nombre el sábado, antes de que nadie firmara nada.",
    },
    {
      phrase: "live or die on",
      variants: ["lives or dies on", "lived or died on"],
      es: "depender por completo de",
      kind: "idiom",
      example: "A pilot with six hundred people a year lives or dies on exactly that.",
      exampleEs: "Un piloto con seiscientas personas al año vive o muere exactamente de eso.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds, the season finale: tell me about yourself, then something that isn't on your résumé, then where you want to be in three years. One answer, no notes.",
    es: "Treinta segundos, el final de temporada: háblame de ti, luego algo que no esté en tu currículum, luego dónde quieres estar en tres años. Una sola respuesta, sin notas.",
  },
  continueWith: [
    "Right now I ...",
    "Something that isn't on my résumé is ...",
    "In three years I ...",
  ],
  cliffhanger: {
    en: "Advanced 2: the Northline floor, a headset, and a customer who won't explain what the problem is.",
    es: "Advanced 2: el piso de Northline, una diadema, y un cliente que no explica cuál es el problema.",
  },
};
