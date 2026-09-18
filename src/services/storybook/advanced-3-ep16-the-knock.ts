import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep16-the-knock/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep16-the-knock/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep16-the-knock/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep16-the-knock/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep16-the-knock/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep16-the-knock/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep16-the-knock/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep16-the-knock/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep16-the-knock/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep16-the-knock/s9.jpg";

export const ADVANCED3_EP16_THE_KNOCK: StorybookEpisode = {
  id: "advanced3-ep16-the-knock",
  moduleId: "advanced-3",
  week: 4,
  title: "The knock",
  titleEs: "El toque en la puerta",
  episodeLabel: {
    en: "Advanced 3 · Episode 16",
    es: "Advanced 3 · Episodio 16",
  },
  previously: [
    {
      en: "Twelve parents in the circle. 'I wasn't missing words. I was missing five seconds.'",
      es: "Doce padres en el círculo. 'No me faltaban palabras. Me faltaban cinco segundos'.",
    },
    {
      en: "Vale left one chair in the middle of the floor. Óscar gets it Monday at seven.",
      es: "Vale dejó una silla en medio del piso. Óscar la tiene el lunes a las siete.",
    },
    {
      en: "Keller calls Monday. Reed reads his email on Sundays.",
      es: "Keller llama el lunes. Reed lee su correo los domingos.",
    },
  ],
  reviewWords: [
    { word: "knock", es: "toque en la puerta" },
    { word: "scholarship", es: "beca" },
    { word: "lesson", es: "lección" },
    { word: "invoice", es: "factura" },
    { word: "sign", es: "firmar" },
  ],
  blurb: {
    en: "Monday, 6:55 a.m. Before Óscar, before Keller, somebody knocks on the academy door. She's seventeen, she has Nico's face, and she can't pay. The academy has no Northline contract and a bank that reads the news. Dani doesn't tell the girl a lesson. He tells Vale one, about an invoice that got 'lost' three years ago, and then he signs the scholarship with his own name.",
    es: "Lunes, 6:55 a.m. Antes de Óscar, antes de Keller, alguien toca la puerta de la academia. Tiene diecisiete años, tiene la cara de Nico, y no puede pagar. La academia no tiene contrato con Northline y tiene un banco que lee las noticias. Dani no le dice una lección a la muchacha. Se la dice a Vale, sobre una factura que se 'perdió' hace tres años, y luego firma la beca con su propio nombre.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Monday, 6:55 a.m.; the front door of Vale's academy from inside, morning light; Vale opening it in her mustard blouse; on the step, a girl of seventeen with a school backpack, straight black hair in a heavy fringe like Nico's, plain white shirt, hands in her pockets; Dani behind Vale in the corridor with the brass key.",
      text: "Monday, 6:55 a.m. Before Óscar. Before Keller. A knock.",
      es: "Lunes, 6:55 a.m. Antes de Óscar. Antes de Keller. Un toque en la puerta.",
      speaker: "abril",
      cast: ["abril", "vale", "dani"],
      lines: [
        {
          speaker: "abril",
          text: "Is this where my brother learned? Nico. The one from the video. He doesn't know I'm here.",
          es: "¿Aquí es donde aprendió mi hermano? Nico. El del video. Él no sabe que estoy aquí.",
        },
        {
          speaker: "vale",
          text: "He learned at Northline, mostly. Some of it here. Come in. What's your name?",
          es: "Aprendió en Northline, mayormente. Algo aquí. Pasá. ¿Cómo te llamás?",
        },
        {
          speaker: "abril",
          text: "Abril. I want to learn. I can't pay. I'll clean, I'll do anything, but I can't pay.",
          es: "Abril. Quiero aprender. No puedo pagar. Limpio, hago lo que sea, pero no puedo pagar.",
        },
      ],
      words: [
        { word: "brother", es: "hermano" },
        { word: "mostly", es: "mayormente" },
        { word: "anything", es: "lo que sea" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "The small room; Abril sitting in the single chair in the middle of the floor, backpack on her knees; Dani standing in front of her; Vale in the doorway.",
      text: "Dani asks the question Vale asked a boy, years ago, in this same doorway.",
      es: "Dani hace la pregunta que Vale le hizo a un niño, hace años, en esta misma puerta.",
      speaker: "dani",
      cast: ["dani", "abril", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "Do you want to learn? Not for Nico. For you.",
          es: "¿Querés aprender? No por Nico. Por vos.",
        },
        {
          speaker: "abril",
          text: "...Yes.",
          es: "...Sí.",
        },
        {
          speaker: "dani",
          text: "You waited before you answered. Five seconds. Your brother does that.",
          es: "Esperaste antes de responder. Cinco segundos. Tu hermano hace eso.",
        },
        {
          speaker: "abril",
          text: "He does it at dinner. It's annoying.",
          es: "Lo hace en la cena. Es molesto.",
        },
      ],
      words: [
        { word: "waited", es: "esperaste" },
        { word: "dinner", es: "cena" },
        { word: "annoying", es: "molesto" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "The corridor outside the small room; Vale and Dani talking low, Vale with a folder of bank letters; through the door, Abril alone in the chair, looking at the empty whiteboard.",
      text: "The corridor. The part the girl doesn't hear.",
      es: "El pasillo. La parte que la muchacha no oye.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "The Northline contract is suspended. That was forty percent of this building. I have ninety-three applications, three teachers, and a bank that reads the news. I gave my first scholarship in this doorway and I can't give one this month.",
          es: "El contrato de Northline está suspendido. Eso era el cuarenta por ciento de este edificio. Tengo noventa y tres solicitudes, tres maestros, y un banco que lee las noticias. Di mi primera beca en esta puerta y este mes no puedo dar una.",
        },
        {
          speaker: "dani",
          text: "I'm not going to say it to her. I'm going to say it to you. It's about an invoice.",
          es: "No se lo voy a decir a ella. Te lo voy a decir a vos. Es sobre una factura.",
        },
      ],
      words: [
        { word: "contract", es: "contrato" },
        { word: "percent", es: "por ciento" },
        { word: "invoice", es: "factura" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Close on Dani in the corridor, holding out an old folded invoice from his wallet, the word PAID handwritten across it; Vale not taking it, looking at the handwriting.",
      text: "The lesson. Experience, lesson, why, now.",
      es: "La lección. Experiencia, lección, por qué, ahora.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "Something that taught me a lot was my second month here. I couldn't pay. I came in on a Monday to tell you I was leaving, and you said the invoice had been lost. I found it a year later in a drawer in the office, with 'paid' on it in your handwriting. I've had it in my wallet since. What I learned was that nobody asks the person they're helping to be worth it first. You didn't ask me. The reason it matters is that she knocked. Knocking is the audit. Now I sign it.",
          es: "Algo que me enseñó mucho fue mi segundo mes aquí. No podía pagar. Vine un lunes a decirte que me iba, y me dijiste que la factura se había perdido. La encontré un año después en un cajón de la oficina, con 'pagado' en tu letra. La tengo en la billetera desde entonces. Lo que aprendí fue que nadie le pide a la persona que está ayudando que primero valga la pena. Vos no me lo pediste. La razón por la que importa es que ella tocó la puerta. Tocar la puerta es la auditoría. Ahora la firmo yo.",
        },
        {
          speaker: "vale",
          text: "It wasn't lost.",
          es: "No se perdió.",
        },
        {
          speaker: "dani",
          text: "I know. That's the lesson.",
          es: "Ya sé. Esa es la lección.",
        },
      ],
      words: [
        { word: "wallet", es: "billetera" },
        { word: "handwriting", es: "letra" },
        { word: "worth", es: "valer la pena" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The office desk; a scholarship form; Dani writing his own name on the line marked PAID BY; Vale holding the pen cap; the old invoice beside the form.",
      text: "7:00 a.m. He fills out the form. He signs the wrong line on purpose.",
      es: "7:00 a.m. Llena el formulario. Firma la línea equivocada a propósito.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "Fill out the top, not the bottom. That's the 'paid by' line. That's your salary. Northline still pays you and the pilot's still suspended; you don't know what next month looks like.",
          es: "Llená la parte de arriba, no la de abajo. Esa es la línea de 'pagado por'. Ese es tu salario. Northline todavía te paga y el piloto sigue suspendido; no sabés cómo se ve el próximo mes.",
        },
        {
          speaker: "dani",
          text: "Neither did you. Pay it forward, once, on paper, and then never say the phrase again. Hand it over. She's waiting in the chair.",
          es: "Vos tampoco. Pasarlo adelante, una vez, en papel, y después no volver a decir la frase. Dámelo. Está esperando en la silla.",
        },
        {
          speaker: "vale",
          text: "You're going to tell her it got lost.",
          es: "Le vas a decir que se perdió.",
        },
        {
          speaker: "dani",
          text: "I'm going to tell her it's paid.",
          es: "Le voy a decir que está pagada.",
        },
      ],
      words: [
        { word: "salary", es: "salario" },
        { word: "forward", es: "adelante" },
        { word: "paper", es: "papel" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "7:05 a.m.; the small room; Óscar arriving in the doorway in his too-big polo, stopping because the middle chair is taken by Abril; Dani pulling a second chair out of the stack; Vale in the doorway behind Óscar.",
      text: "7:05 a.m. Óscar comes for his chair. It's taken. Dani gets another.",
      es: "7:05 a.m. Óscar viene por su silla. Está ocupada. Dani saca otra.",
      speaker: "oscar",
      cast: ["oscar", "abril", "dani", "vale"],
      lines: [
        {
          speaker: "oscar",
          text: "That's my chair.",
          es: "Esa es mi silla.",
        },
        {
          speaker: "dani",
          text: "That was your chair. This is your chair. Óscar, Abril. Abril, Óscar. He froze in an audit; you froze at the door for six seconds before you knocked, I watched you through the glass. Two students, no pilot, no slides. Class starts.",
          es: "Esa era tu silla. Esta es tu silla. Óscar, Abril. Abril, Óscar. Él se congeló en una auditoría; vos te congelaste en la puerta seis segundos antes de tocar, te vi por el vidrio. Dos estudiantes, sin piloto, sin diapositivas. Empieza la clase.",
        },
        {
          speaker: "abril",
          text: "It was four seconds.",
          es: "Fueron cuatro segundos.",
        },
        {
          speaker: "oscar",
          text: "She's definitely his sister.",
          es: "Definitivamente es su hermana.",
        },
      ],
      words: [
        { word: "taken", es: "ocupada" },
        { word: "glass", es: "vidrio" },
        { word: "sister", es: "hermana" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Northline, 9:00 a.m.; Dani at his desk with the phone to his ear and the headset around his neck; on his monitor, a Crown logo on an email; Mía at the next desk pretending not to listen. Only Dani is drawn; Keller is a voice on the phone.",
      text: "9:00 a.m. Keller. He has one question ready. He's rehearsed it on a bus.",
      es: "9:00 a.m. Keller. Tiene una pregunta lista. La ensayó en un bus.",
      speaker: "dani",
      lines: [
        {
          speaker: "keller",
          text: "Dani. Lidia gave you the weekend, so I'll skip the speech. Crown licenses the program, you run it from Bogotá, salary in the email. What do you need to hear?",
          es: "Dani. Lidia te dio el fin de semana, así que me salto el discurso. Crown licencia el programa, vos lo dirigís desde Bogotá, el salario está en el correo. ¿Qué necesitás oír?",
        },
        {
          speaker: "dani",
          text: "Where are the chairs?",
          es: "¿Dónde están las sillas?",
        },
        {
          speaker: "keller",
          text: "It's a platform. The best in the region. Forty countries by next year, and the sessions are recorded, so nobody needs a room.",
          es: "Es una plataforma. La mejor de la región. Cuarenta países el próximo año, y las sesiones se graban, así que nadie necesita un salón.",
        },
        {
          speaker: "dani",
          text: "Then it's what I told you in the parking lot. Not without the room. Thank you for calling me yourself. Lidia said you would.",
          es: "Entonces es lo que te dije en el estacionamiento. No sin el salón. Gracias por llamarme vos misma. Lidia dijo que lo harías.",
        },
      ],
      words: [
        { word: "speech", es: "discurso" },
        { word: "platform", es: "plataforma" },
        { word: "recorded", es: "grabadas" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Ms. Barrett's office, 11:00 a.m.; Barrett behind her desk with her tablet turned toward Dani, showing an email from Reed; the plant; Dani standing with his arms at his sides.",
      text: "11:00 a.m. Reed read the file on Sunday. Barrett reads Dani the reply.",
      es: "11:00 a.m. Reed leyó el expediente el domingo. Barrett le lee a Dani la respuesta.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Reed, Sunday, 4:12 p.m.: 'The file describes a method that works and a director who signed a schedule in Monterrey without asking Monterrey. Hearing Wednesday, nine a.m. Bring the finance person. Bring the stool.' He wrote 'bring the stool', Dani. I read it three times.",
          es: "Reed, domingo, 4:12 p.m.: 'El expediente describe un método que funciona y un director que firmó un horario en Monterrey sin preguntarle a Monterrey. Audiencia el miércoles, nueve a.m. Traigan a la persona de finanzas. Traigan el banco'. Escribió 'traigan el banco', Dani. Lo leí tres veces.",
        },
        {
          speaker: "dani",
          text: "Monterrey. I moved their Thursday to Friday six weeks ago, for the budget. Somebody failed on a Friday.",
          es: "Monterrey. Moví su jueves al viernes hace seis semanas, por el presupuesto. Alguien reprobó un viernes.",
        },
        {
          speaker: "barrett",
          text: "Somebody named Tomás. Wednesday you'll be asked what responsibility means. Don't bring a definition. Bring the schedule.",
          es: "Alguien llamado Tomás. El miércoles le van a preguntar qué significa responsabilidad. No traiga una definición. Traiga el horario.",
        },
      ],
      words: [
        { word: "hearing", es: "audiencia" },
        { word: "schedule", es: "horario" },
        { word: "failed", es: "reprobó" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Nico and Dani on the bench; Nico with his hood down and his phone dark, looking straight ahead, not at Dani; the Northline sign lit behind them.",
      text: "9:40 p.m. Nico found out at dinner. She waited five seconds before telling him.",
      es: "9:40 p.m. Nico se enteró en la cena. Ella esperó cinco segundos antes de contarle.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "She has my face.",
          es: "Tiene mi cara.",
        },
        {
          speaker: "dani",
          text: "She has your five seconds. And she said 'it was four', which is also yours.",
          es: "Tiene tus cinco segundos. Y dijo 'fueron cuatro', que también es tuyo.",
        },
        {
          speaker: "nico",
          text: "Who paid? Vale can't. I know what the contract was.",
          es: "¿Quién pagó? Vale no puede. Sé lo que era el contrato.",
        },
        {
          speaker: "dani",
          text: "It's paid. That's the whole answer you get.",
          es: "Está pagada. Esa es toda la respuesta que vas a recibir.",
        },
        {
          speaker: "nico",
          text: "That's not what a boss does.",
          es: "Eso no es lo que hace un jefe.",
        },
        {
          speaker: "dani",
          text: "I know.",
          es: "Ya sé.",
        },
      ],
      words: [
        { word: "found", es: "se enteró" },
        { word: "paid", es: "pagada" },
        { word: "answer", es: "respuesta" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What did Dani learn from the 'lost' invoice?",
      questionEs: "¿Qué aprendió Dani de la factura 'perdida'?",
      options: [
        { label: "Nobody asks the person they're helping to be worth it first", emoji: "🧾" },
        { label: "Always keep your receipts", emoji: "📁" },
        { label: "Scholarships are bad for business", emoji: "🏦" },
      ],
      answer: 0,
      sayIt: "Something that taught him a lot was his second month at the academy. What he learned was that nobody asks the person they're helping to be worth it first. Now he signs it.",
      sayItEs: "Algo que le enseñó mucho fue su segundo mes en la academia. Lo que aprendió fue que nadie le pide a la persona que está ayudando que primero valga la pena. Ahora la firma él.",
      sayItCheck: {
        target: "What he learned was *",
        altTargets: ["Something that taught him a lot was *", "* worth it first *", "Now he signs it"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "An experience that taught you something important. What happened, what you learned, why it matters, and what you do differently now.",
      questionEs: "Una experiencia que te enseñó algo importante. Qué pasó, qué aprendiste, por qué importa, y qué haces diferente ahora.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear Dani's version again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Something that taught me a lot was staying quiet in a meeting two years ago. What I learned was that silence looks the same as having nothing to say. The reason it matters is that people can't value an idea they never heard. Now I speak early, even if my sentence isn't perfect.",
      sayItEs: "Algo que me enseñó mucho fue quedarme callado en una reunión hace dos años. Lo que aprendí fue que el silencio se ve igual que no tener nada que decir. La razón por la que importa es que la gente no puede valorar una idea que nunca escuchó. Ahora hablo temprano, aunque mi oración no sea perfecta.",
      sayItAskEn: "Start with \"Something that taught me a lot was ...\", then \"What I learned was ...\", then \"The reason it matters is ...\", and close with \"Now I ...\".",
      sayItAskEs: "Empieza con \"Something that taught me a lot was …\", luego \"What I learned was …\", después \"The reason it matters is …\" y cierra con \"Now I …\".",
      sayItCheck: {
        target: "What I learned was *",
        altTargets: ["Something that taught me a lot was *", "The reason it matters is *", "Now I *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "Nobody asked me to be worth it first. So I don't ask the next person either. Knocking is the audit.",
    es: "Nadie me pidió que primero valiera la pena. Así que yo tampoco se lo pido a la siguiente persona. Tocar la puerta es la auditoría.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "When someone asks me for something big, I ask them one question and I let them take five seconds to answer it.",
    es: "Cuando alguien me pide algo grande, le hago una sola pregunta y le dejo cinco segundos para responderla.",
    model: "dani",
    modelActionEs: "Dani le preguntó a Abril '¿querés aprender? No por Nico, por vos', y esperó los cinco segundos que ella necesitó antes de decir que sí.",
  },
  expressions: [
    {
      phrase: "fill out",
      variants: ["fills out", "filled out", "filling out"],
      es: "llenar (un formulario)",
      kind: "phrasal",
      example: "Fill out the top, not the bottom.",
      exampleEs: "Llená la parte de arriba, no la de abajo.",
    },
    {
      phrase: "hand over",
      variants: ["hand it over", "handed over", "handing over"],
      es: "entregar, pasar",
      kind: "phrasal",
      example: "Hand it over. She's waiting in the chair.",
      exampleEs: "Dámelo. Está esperando en la silla.",
    },
    {
      phrase: "pay it forward",
      variants: ["paying it forward", "paid it forward"],
      es: "pasarlo adelante, devolver el favor a otra persona",
      kind: "idiom",
      example: "Pay it forward, once, on paper, and then never say the phrase again.",
      exampleEs: "Pasarlo adelante, una vez, en papel, y después no volver a decir la frase.",
    },
    {
      phrase: "worth it",
      variants: ["be worth it", "worth the trouble", "not worth it"],
      es: "valer la pena",
      kind: "idiom",
      example: "What I learned was that nobody asks the person they're helping to be worth it first.",
      exampleEs: "Lo que aprendí fue que nadie le pide a la persona que está ayudando que primero valga la pena.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: a lesson life taught you. The experience, what you learned, why it matters, and what you do differently now.",
    es: "Treinta segundos: una lección que te enseñó la vida. La experiencia, qué aprendiste, por qué importa, y qué haces diferente ahora.",
  },
  continueWith: [
    "Something that taught me a lot was ...",
    "What I learned was ...",
    "The reason it matters is ...",
    "Now I ... Looking back, ...",
  ],
  cliffhanger: {
    en: "Tuesday, 8:00 p.m.: a second livestream, organized by the agents, not Northline. Nico's channel, the small room, and two minutes Dani has never said out loud.",
    es: "Martes, 8:00 p.m.: un segundo en vivo, organizado por los agentes, no por Northline. El canal de Nico, el salón pequeño, y dos minutos que Dani nunca ha dicho en voz alta.",
  },
};
