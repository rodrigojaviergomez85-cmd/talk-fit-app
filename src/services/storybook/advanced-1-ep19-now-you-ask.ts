import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep19-now-you-ask/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep19-now-you-ask/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep19-now-you-ask/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep19-now-you-ask/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep19-now-you-ask/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep19-now-you-ask/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep19-now-you-ask/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep19-now-you-ask/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep19-now-you-ask/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep19-now-you-ask/s9.jpg";

export const ADVANCED1_EP19_NOW_YOU_ASK: StorybookEpisode = {
  id: "advanced1-ep19-now-you-ask",
  moduleId: "advanced-1",
  week: 4,
  title: "Now you ask",
  titleEs: "Ahora preguntas tú",
  episodeLabel: {
    en: "Advanced 1 · Episode 19",
    es: "Advanced 1 · Episodio 19",
  },
  previously: [
    {
      en: "Vale turned down Crown's offer, with conditions.",
      es: "Vale rechazó la oferta de Crown, con condiciones.",
    },
    {
      en: "Barrett asked her to sit on the other side of the table.",
      es: "Barrett le pidió sentarse del otro lado de la mesa.",
    },
    {
      en: "Today Vale is the interviewer.",
      es: "Hoy Vale es quien entrevista.",
    },
  ],
  reviewWords: [
    { word: "follow-up", es: "repregunta, seguimiento" },
    { word: "discount", es: "descuento" },
    { word: "evidence", es: "evidencia" },
    { word: "attendance", es: "asistencia" },
    { word: "supplier", es: "proveedor" },
  ],
  blurb: {
    en: "Answering well gets you hired. Asking well gets you respected.",
    es: "Responder bien te consigue el trabajo. Preguntar bien te consigue respeto.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Barrett hands the interview over to Vale on Friday morning.",
      text: "Friday, the chairs turned around.",
      es: "Viernes, las sillas dadas vuelta.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Today you interview. Lidia and Dani apply for the pilot's client role, and I only watch.",
          es: "Hoy tú entrevistas. Lidia y Dani aplican al puesto de cliente del piloto, y yo solo observo.",
        },
        {
          speaker: "vale",
          text: "Then I'll say the rule first: I'm not looking for confident answers. I'm looking for answers that survive a follow-up.",
          es: "Entonces digo la regla primero: no busco respuestas seguras. Busco respuestas que sobrevivan una repregunta.",
        },
        {
          speaker: "barrett",
          text: "One of them works for you every day. Will that make this harder or easier?",
          es: "Uno de ellos trabaja contigo todos los días. ¿Eso lo hace más difícil o más fácil?",
        },
        {
          speaker: "vale",
          text: "Harder. I already know what Dani can do, so he has to prove it in front of you, not to me.",
          es: "Más difícil. Ya sé lo que Dani puede hacer, así que tiene que probarlo frente a ti, no a mí.",
        },
        {
          speaker: "barrett",
          text: "Then don't protect him.",
          es: "Entonces no lo protejas.",
        },
        {
          speaker: "vale",
          text: "He's outside pretending to read his notes. He's been holding the same page since seven.",
          es: "Está afuera fingiendo que lee sus notas. Lleva con la misma página desde las siete.",
        },
        {
          speaker: "barrett",
          text: "Nervous or unprepared?",
          es: "¿Nervioso o sin preparar?",
        },
        {
          speaker: "vale",
          text: "Nervous. Unprepared people sleep fine.",
          es: "Nervioso. Los que no se preparan duermen bien.",
        },
      ],
      words: [
        { word: "interview", es: "entrevistar" },
        { word: "confident", es: "seguro" },
        { word: "survive", es: "sobrevivir" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Lidia answers Vale's first client question.",
      text: "Lidia's first answer.",
      es: "La primera respuesta de Lidia.",
      speaker: "vale",
      cast: ["vale", "lidia"],
      lines: [
        {
          speaker: "vale",
          text: "A client writes that the pilot isn't working, three weeks in. What do you do before you reply?",
          es: "Un cliente escribe que el piloto no funciona, a las tres semanas. ¿Qué haces antes de responder?",
        },
        {
          speaker: "lidia",
          text: "I check attendance and speaking minutes, because \"not working\" usually means one manager heard one complaint.",
          es: "Reviso asistencia y minutos de habla, porque \"no funciona\" suele significar que un jefe escuchó una queja.",
        },
        {
          speaker: "vale",
          text: "How long does that check take you?",
          es: "¿Cuánto te toma esa revisión?",
        },
        {
          speaker: "lidia",
          text: "Twenty minutes, and I'd still answer the same day so the silence doesn't grow.",
          es: "Veinte minutos, y aun así respondería el mismo día para que el silencio no crezca.",
        },
      ],
      words: [
        { word: "attendance", es: "asistencia" },
        { word: "complaint", es: "queja" },
        { word: "reply", es: "responder" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale digs deeper into Lidia's answer.",
      text: "Digging.",
      es: "Profundizando.",
      speaker: "vale",
      cast: ["vale", "lidia"],
      lines: [
        {
          speaker: "vale",
          text: "Good, but I want to dig into it. What if the data is fine and the manager is still angry?",
          es: "Bien, pero quiero profundizar. ¿Y si los datos están bien y el jefe sigue molesto?",
        },
        {
          speaker: "lidia",
          text: "Then the data isn't the problem, and I'd stop defending it. I'd ask what he promised his own boss.",
          es: "Entonces los datos no son el problema y dejaría de defenderlos. Preguntaría qué le prometió él a su propio jefe.",
        },
        {
          speaker: "vale",
          text: "That's the question behind the question, and it's the one that saves accounts.",
          es: "Esa es la pregunta detrás de la pregunta, y es la que salva cuentas.",
        },
        {
          speaker: "lidia",
          text: "May I add one thing? I'd put his answer in writing the same afternoon.",
          es: "¿Puedo agregar algo? Pondría su respuesta por escrito esa misma tarde.",
        },
        {
          speaker: "vale",
          text: "Why in writing?",
          es: "¿Por qué por escrito?",
        },
        {
          speaker: "lidia",
          text: "Because angry people change what they asked for, and I'd rather be kind than right in month two.",
          es: "Porque la gente molesta cambia lo que pidió, y prefiero ser amable que tener razón en el mes dos.",
        },
      ],
      words: [
        { word: "dig into", es: "profundizar en" },
        { word: "the question behind the question", es: "la pregunta detrás de la pregunta" },
        { word: "accounts", es: "cuentas, clientes" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani answers the discount question in the interview chair.",
      text: "Dani's turn.",
      es: "El turno de Dani.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Sit down. Coffee's cold, the chair squeaks, and none of that is going to be my problem today.",
          es: "Siéntate. El café está frío, la silla rechina, y nada de eso va a ser mi problema hoy.",
        },
        {
          speaker: "dani",
          text: "You're enjoying this.",
          es: "Estás disfrutando esto.",
        },
        {
          speaker: "vale",
          text: "A little. Same situation, different chair: the client asks for a discount instead of a fix.",
          es: "Un poco. Misma situación, otra silla: el cliente pide un descuento en vez de una solución.",
        },
        {
          speaker: "dani",
          text: "I'd say no to the discount and yes to a review meeting with numbers. A discount buys one quiet month and sells the idea that we failed.",
          es: "Diría que no al descuento y que sí a una reunión de revisión con números. Un descuento compra un mes tranquilo y vende la idea de que fallamos.",
        },
        {
          speaker: "vale",
          text: "You answered fast. Is that what you'd do, or what you think I'd do?",
          es: "Respondiste rápido. ¿Eso harías tú, o lo que crees que yo haría?",
        },
        {
          speaker: "dani",
          text: "It's what I did in March, and I didn't tell you until the meeting was already booked.",
          es: "Es lo que hice en marzo, y no te lo dije hasta que la reunión ya estaba agendada.",
        },
        {
          speaker: "vale",
          text: "Then say that part next time first. A real week beats a clean opinion.",
          es: "Entonces di esa parte primero la próxima vez. Una semana real vale más que una opinión limpia.",
        },
      ],
      words: [
        { word: "discount", es: "descuento" },
        { word: "review", es: "revisión" },
        { word: "failed", es: "fallamos" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale argues the opposite position to test Dani.",
      text: "Vale pushes.",
      es: "Vale presiona.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "I'm going to argue against you for a minute. Hold your position or change it honestly.",
          es: "Voy a argumentar en tu contra un minuto. Sostén tu posición o cámbiala con honestidad.",
        },
        {
          speaker: "dani",
          text: "Go ahead.",
          es: "Adelante.",
        },
        {
          speaker: "vale",
          text: "If we refuse every discount, we'll be the supplier that's technically right and commercially gone, because the person asking has a budget problem we didn't create and can't see. What I'd want from you is a third option: keep the price, change what's inside it. Two fewer teaching hours, one more measurement report, so the invoice stays the same and the value moves to where they're feeling pain.",
          es: "Si rechazamos todo descuento, seremos el proveedor que tiene razón técnicamente y desaparece comercialmente, porque quien pide tiene un problema de presupuesto que no creamos y no vemos. Lo que querría de ti es una tercera opción: mantener el precio y cambiar lo que hay dentro. Dos horas de clase menos, un reporte de medición más, para que la factura siga igual y el valor se mueva a donde les duele.",
        },
        {
          speaker: "dani",
          text: "You want me to agree with that.",
          es: "Quieres que esté de acuerdo con eso.",
        },
        {
          speaker: "vale",
          text: "I want you to tell me why it's wrong.",
          es: "Quiero que me digas por qué está mal.",
        },
      ],
      words: [
        { word: "supplier", es: "proveedor" },
        { word: "invoice", es: "factura" },
        { word: "budget", es: "presupuesto" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani answers back and holds his position.",
      text: "Dani answers back.",
      es: "Dani responde.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "It isn't wrong, it's risky. Fewer hours in month one is exactly when students hold back from speaking, so we'd be cutting the thing that produces the result we're being judged on.",
          es: "No está mal, es arriesgado. Menos horas en el mes uno es justo cuando los estudiantes se contienen de hablar, así que estaríamos cortando lo que produce el resultado por el que nos juzgan.",
        },
        {
          speaker: "vale",
          text: "Correct. And that's the answer I was waiting for.",
          es: "Correcto. Y esa es la respuesta que esperaba.",
        },
        {
          speaker: "dani",
          text: "Can I say the part that isn't in the answer?",
          es: "¿Puedo decir la parte que no está en la respuesta?",
        },
        {
          speaker: "vale",
          text: "Say it.",
          es: "Dila.",
        },
        {
          speaker: "dani",
          text: "I want this role. Not because it pays more; because I'm tired of being the person who fixes things nobody sees.",
          es: "Quiero este puesto. No porque pague más; porque estoy cansado de ser el que arregla cosas que nadie ve.",
        },
        {
          speaker: "vale",
          text: "Noted. And that is exactly the sentence you should have started with.",
          es: "Anotado. Y esa es exactamente la frase con la que debiste empezar.",
        },
      ],
      words: [
        { word: "hold back", es: "contenerse, no atreverse" },
        { word: "risky", es: "arriesgado" },
        { word: "judged", es: "juzgados" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Barrett interrupts once while Vale finishes with Lidia.",
      text: "Barrett interrupts once.",
      es: "Barrett interrumpe una vez.",
      speaker: "barrett",
      cast: ["barrett", "vale", "lidia"],
      lines: [
        {
          speaker: "barrett",
          text: "You're interviewing them better than we interviewed you.",
          es: "Los estás entrevistando mejor de lo que nosotros te entrevistamos a ti.",
        },
        {
          speaker: "vale",
          text: "I've been on your side of the table for six years; I just wasn't being paid for it.",
          es: "He estado de tu lado de la mesa seis años; solo que no me pagaban por eso.",
        },
        {
          speaker: "vale",
          text: "Lidia, last one. What would you say to the manager who's angry, in the first ten seconds of the call?",
          es: "Lidia, la última. ¿Qué le dirías al jefe molesto, en los primeros diez segundos de la llamada?",
        },
        {
          speaker: "lidia",
          text: "That I've read his email twice and I'm not going to defend anything until he's told me what he needs by Friday.",
          es: "Que leí su correo dos veces y no voy a defender nada hasta que me diga qué necesita para el viernes.",
        },
        {
          speaker: "barrett",
          text: "And if he needs something you can't give him?",
          es: "¿Y si necesita algo que no le puedes dar?",
        },
        {
          speaker: "lidia",
          text: "Then I say so on the call, not in an email three days later.",
          es: "Entonces lo digo en la llamada, no en un correo tres días después.",
        },
        {
          speaker: "vale",
          text: "Thank you both. Barrett, you can stop pretending you're only watching.",
          es: "Gracias a los dos. Barrett, ya puedes dejar de fingir que solo observas.",
        },
      ],
      words: [
        { word: "angry", es: "molesto, enojado" },
        { word: "defend", es: "defender" },
        { word: "email", es: "correo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila brings news about the first pilot group while Vale turns to the class.",
      text: "Your turn, and Camila at the door.",
      es: "Tu turno, y Camila en la puerta.",
      speaker: "vale",
      cast: ["vale", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Your turn, and today you ask. Interview me about this pilot: three questions, and the third one has to be a follow-up on my answer.",
          es: "Tu turno, y hoy preguntas tú. Entrevístame sobre este piloto: tres preguntas, y la tercera tiene que ser una repregunta a mi respuesta.",
        },
        {
          speaker: "camila",
          text: "The first pilot group is confirmed for Monday: nineteen adults, two countries, one of them on a bad connection.",
          es: "El primer grupo del piloto está confirmado para el lunes: diecinueve adultos, dos países, uno con mala conexión.",
        },
        {
          speaker: "vale",
          text: "Then plan for the bad connection first. Everything else is easier than that.",
          es: "Entonces planea primero para la mala conexión. Todo lo demás es más fácil que eso.",
        },
        {
          speaker: "camila",
          text: "Dani asked me not to tell you something, so I'm telling you anyway.",
          es: "Dani me pidió que no te contara algo, así que te lo cuento igual.",
        },
        {
          speaker: "vale",
          text: "Go on.",
          es: "Sigue.",
        },
        {
          speaker: "camila",
          text: "He rewrote his answers four times last night. He's never wanted anything this publicly before.",
          es: "Reescribió sus respuestas cuatro veces anoche. Nunca había querido algo así de abiertamente.",
        },
      ],
      words: [
        { word: "follow-up", es: "repregunta, seguimiento" },
        { word: "confirmed", es: "confirmado" },
        { word: "connection", es: "conexión" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale explains what the day was really about as Barrett announces Monday.",
      text: "What Vale learned.",
      es: "Lo que Vale aprendió.",
      speaker: "vale",
      cast: ["vale", "barrett"],
      lines: [
        {
          speaker: "barrett",
          text: "Before you tell me your decision, tell me what you were actually testing.",
          es: "Antes de darme tu decisión, dime qué estabas probando en realidad.",
        },
        {
          speaker: "vale",
          text: "Answering well gets you hired; asking well gets you respected, and the two skills are not the same. When you ask, you read the room before you read your list — who stopped talking, who looked at the manager first, who gave you an adjective instead of an example.",
          es: "Responder bien te consigue el trabajo; preguntar bien te consigue respeto, y no son la misma habilidad. Cuando preguntas, lees el ambiente antes que tu lista: quién dejó de hablar, quién miró al jefe primero, quién te dio un adjetivo en vez de un ejemplo.",
        },
        {
          speaker: "barrett",
          text: "So who sounded best?",
          es: "¿Y quién sonó mejor?",
        },
        {
          speaker: "vale",
          text: "Lidia. But I wasn't listening for that. I was listening for who would tell me bad news on a Tuesday instead of a Friday.",
          es: "Lidia. Pero no escuchaba eso. Escuchaba quién me daría malas noticias un martes en vez de un viernes.",
        },
        {
          speaker: "barrett",
          text: "And you already know which one that is.",
          es: "Y ya sabes cuál de los dos es.",
        },
        {
          speaker: "vale",
          text: "I do.",
          es: "Sí.",
        },
        {
          speaker: "barrett",
          text: "You're not going to say it.",
          es: "No lo vas a decir.",
        },
        {
          speaker: "vale",
          text: "Not until I've said it to them first. One of them rewrote his answers four times last night, and he deserves to hear it from my mouth, not from a rumour in the corridor.",
          es: "No hasta habérselo dicho a ellos primero. Uno de los dos reescribió sus respuestas cuatro veces anoche, y merece oírlo de mi boca, no de un rumor en el pasillo.",
        },
        {
          speaker: "barrett",
          text: "Monday, then. The board will sit in on the first session, and they've asked to question you at the end of it.",
          es: "El lunes, entonces. La junta estará en la primera sesión, y pidieron interrogarte al final.",
        },
      ],
      words: [
        { word: "read the room", es: "leer el ambiente" },
        { word: "respected", es: "respetado" },
        { word: "skills", es: "habilidades" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "Why does Dani say fewer teaching hours in month one is risky?",
      questionEs: "¿Por qué dice Dani que menos horas de clase en el mes uno es arriesgado?",
      options: [
        { label: "Because that's when students hold back from speaking", emoji: "🤐" },
        { label: "Because teachers earn less money", emoji: "💵" },
        { label: "Because the invoice would change", emoji: "🧾" },
      ],
      answer: 0,
      sayIt: "Because month one is exactly when students hold back from speaking.",
      sayItEs: "Porque el mes uno es justo cuando los estudiantes se contienen de hablar.",
      sayItCheck: {
        target: "Because month one is exactly when students hold back from speaking",
        altTargets: ["Students hold back from speaking", "Because students hold back"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "Interview someone: ask three questions, and make the third a follow-up.",
      questionEs: "Entrevista a alguien: haz tres preguntas y que la tercera sea una repregunta.",
      options: [
        { label: "I am ready to ask", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "What does a good week look like in this job? Who decides when something isn't working? And when that happened last time, what did you change?",
      sayItEs: "¿Cómo se ve una buena semana en este trabajo? ¿Quién decide cuándo algo no funciona? Y cuando pasó la última vez, ¿qué cambiaron?",
      sayItAskEn: "Ask three questions. Start the third with \"And when that happened ...\".",
      sayItAskEs: "Haz tres preguntas. Empieza la tercera con \"And when that happened …\".",
      sayItCheck: {
        target: "What *",
        altTargets: ["Who *", "And when that happened *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s9",
    phrase: "A good question opens a door an answer can't.",
    es: "Una buena pregunta abre una puerta que una respuesta no puede.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "When an answer sounds good, I ask one more question.",
    es: "Cuando una respuesta suena bien, hago una pregunta más.",
    model: "vale",
    modelActionEs: "Vale repreguntó hasta llegar a la pregunta detrás de la pregunta.",
  },
  expressions: [
    {
      phrase: "dig into",
      variants: ["digs into", "dug into", "digging into"],
      es: "profundizar en, investigar a fondo",
      kind: "phrasal",
      example: "Good, but I want to dig into it.",
      exampleEs: "Bien, pero quiero profundizar.",
    },
    {
      phrase: "hold back",
      variants: ["holds back", "held back", "holding back"],
      es: "contenerse, no atreverse",
      kind: "phrasal",
      example: "That is exactly when students hold back from speaking.",
      exampleEs: "Es justo cuando los estudiantes se contienen de hablar.",
    },
    {
      phrase: "read the room",
      variants: ["reads the room", "reading the room"],
      es: "leer el ambiente",
      kind: "idiom",
      example: "You have to read the room before you read your list.",
      exampleEs: "Tienes que leer el ambiente antes que tu lista.",
    },
    {
      phrase: "the question behind the question",
      es: "la verdadera razón detrás de una pregunta",
      kind: "idiom",
      example: "That's the question behind the question, and it's the one that saves accounts.",
      exampleEs: "Esa es la pregunta detrás de la pregunta, y es la que salva cuentas.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: interview someone — three questions, and the third is a follow-up.",
    es: "Treinta segundos: entrevista a alguien — tres preguntas, y la tercera es una repregunta.",
  },
  continueWith: [
    "What does ... look like?",
    "Who decides ...?",
    "And when that happened, ...?",
  ],
  cliffhanger: {
    en: "Monday: the first pilot session, with the board watching and questions at the end.",
    es: "El lunes: la primera sesión del piloto, con la junta mirando y preguntas al final.",
  },
};
