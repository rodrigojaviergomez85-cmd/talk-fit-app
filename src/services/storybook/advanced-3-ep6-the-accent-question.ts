import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep6-the-accent-question/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep6-the-accent-question/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep6-the-accent-question/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep6-the-accent-question/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep6-the-accent-question/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep6-the-accent-question/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep6-the-accent-question/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep6-the-accent-question/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep6-the-accent-question/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep6-the-accent-question/s9.jpg";

export const ADVANCED3_EP6_THE_ACCENT_QUESTION: StorybookEpisode = {
  id: "advanced3-ep6-the-accent-question",
  moduleId: "advanced-3",
  week: 2,
  title: "The accent question",
  titleEs: "La pregunta del acento",
  episodeLabel: {
    en: "Advanced 3 · Episode 6",
    es: "Advanced 3 · Episodio 6",
  },
  previously: [
    {
      en: "Dani put legal's statement down and answered the chat for forty minutes.",
      es: "Dani bajó la declaración de legal y contestó el chat cuarenta minutos.",
    },
    {
      en: "The pinned question: did a customer get a teacher removed because of her accent?",
      es: "La pregunta fijada: ¿un cliente logró que quitaran a una maestra por su acento?",
    },
    {
      en: "'Personally, I think—' Cut.",
      es: "'Personalmente, pienso que...' Corte.",
    },
  ],
  reviewWords: [
    { word: "accent", es: "acento" },
    { word: "opinion", es: "opinión" },
    { word: "position", es: "posición" },
    { word: "complaint", es: "queja" },
    { word: "proof", es: "prueba" },
  ],
  blurb: {
    en: "Friday, Dani finished the sentence in front of four hundred people without knowing the facts. Monday, Renata gives him forty seconds on her podcast to say it properly: position first, one reason, one example, close. The example is Lidia, and he tells her story before asking her. She calls at nine.",
    es: "El viernes, Dani terminó la frase frente a cuatrocientas personas sin saber los hechos. El lunes, Renata le da cuarenta segundos en su podcast para decirlo bien: posición primero, una razón, un ejemplo, cierre. El ejemplo es Lidia, y cuenta su historia antes de preguntarle. Ella llama a las nueve.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Friday, 4:42 p.m., the same stool and ring light as the livestream; Dani looking into the camera, the pinned question still on the laptop behind him; Mía with her hand over her headphones.",
      text: "Friday, 4:42 p.m. He finishes the sentence.",
      es: "Viernes, 4:42 p.m. Termina la frase.",
      speaker: "dani",
      cast: ["dani", "mia"],
      lines: [
        {
          speaker: "dani",
          text: "Personally, I think a company that removes a teacher for her accent is asking for a teacher who never learned anything. I don't know if Northline did it. I'll find out, and I'll say it here, on Monday, with a name if the name is mine to say.",
          es: "Personalmente, pienso que una empresa que quita a una maestra por su acento está pidiendo una maestra que nunca aprendió nada. No sé si Northline lo hizo. Lo voy a averiguar, y lo voy a decir aquí, el lunes, con nombre si el nombre me toca decirlo a mí.",
        },
        {
          speaker: "mia",
          text: "The chat stopped. Four hundred people and nobody is typing.",
          es: "El chat se detuvo. Cuatrocientas personas y nadie escribe.",
        },
      ],
      words: [
        { word: "removes", es: "quita" },
        { word: "learned", es: "aprendió" },
        { word: "typing", es: "escribiendo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Monday, 8:30 a.m.; Ms. Barrett's office; Barrett with an old printed complaint form on the desk, dated five years earlier; Dani reading it standing.",
      text: "Monday, 8:30 a.m. Barrett has the file. It's five years old.",
      es: "Lunes, 8:30 a.m. Barrett tiene el expediente. Tiene cinco años.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "It happened. Five years ago, a hotel client wrote to Northline asking us to take a trainer off their account because of her accent. Northline said no. In writing. I wrote it.",
          es: "Pasó. Hace cinco años, un cliente hotelero le escribió a Northline pidiendo que sacáramos a una entrenadora de su cuenta por su acento. Northline dijo que no. Por escrito. Lo escribí yo.",
        },
        {
          speaker: "dani",
          text: "Who was the trainer?",
          es: "¿Quién era la entrenadora?",
        },
        {
          speaker: "barrett",
          text: "Read the signature at the bottom of the reply. Not mine. The one who trained the trainer.",
          es: "Lea la firma al pie de la respuesta. No la mía. La de quien entrenó a la entrenadora.",
        },
        {
          speaker: "dani",
          text: "Lidia.",
          es: "Lidia.",
        },
      ],
      words: [
        { word: "client", es: "cliente" },
        { word: "trainer", es: "entrenadora" },
        { word: "signature", es: "firma" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani at his desk with the laptop; on the screen, Renata Cruz in her podcast studio with the crimson blazer and a countdown clock showing 0:40; Nico at the next desk with his own phone timer out.",
      text: "10:00 a.m. Renata gives him forty seconds. Nico times it.",
      es: "10:00 a.m. Renata le da cuarenta segundos. Nico lo cronometra.",
      speaker: "renata",
      cast: ["renata", "dani", "nico"],
      lines: [
        {
          speaker: "renata",
          text: "The accent question. Position in the first sentence, one reason, one example, close. Forty seconds. If you go over, I cut you, because that's what the internet does anyway.",
          es: "La pregunta del acento. Posición en la primera frase, una razón, un ejemplo, cierre. Cuarenta segundos. Si te pasas, te corto, porque eso es lo que hace el internet de todas formas.",
        },
        {
          speaker: "dani",
          text: "Personally, I think an accent is proof that you learned. The main reason is that nobody is born with two languages; the second one always carries the first, and the people who hire us know it.",
          es: "Personalmente, pienso que un acento es prueba de que aprendiste. La razón principal es que nadie nace con dos idiomas; el segundo siempre carga al primero, y la gente que nos contrata lo sabe.",
        },
      ],
      words: [
        { word: "position", es: "posición" },
        { word: "proof", es: "prueba" },
        { word: "carries", es: "carga" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Close on Dani, calm, one hand flat on the desk; Nico's phone timer at 0:29 in the corner of the frame.",
      text: "The example. He hasn't asked her.",
      es: "El ejemplo. No le ha preguntado a ella.",
      speaker: "dani",
      cast: ["dani", "nico"],
      lines: [
        {
          speaker: "dani",
          text: "For example, five years ago a client asked Northline to remove a trainer for her accent. Northline said no, and the person who signed the no was the woman who taught me English on bus 42 with her own accent. She audits my floor now. Nobody ever asked to remove her.",
          es: "Por ejemplo, hace cinco años un cliente le pidió a Northline quitar a una entrenadora por su acento. Northline dijo que no, y la persona que firmó el no fue la mujer que me enseñó inglés en el bus 42 con su propio acento. Ahora audita mi piso. Nadie pidió nunca que la quitaran.",
        },
        {
          speaker: "dani",
          text: "I could be wrong about many things. But overall, I'd say accents matter: they're the only part of your English that proves you did the work.",
          es: "Puedo estar equivocado en muchas cosas. Pero en general, diría que los acentos importan: son la única parte de tu inglés que prueba que hiciste el trabajo.",
        },
        {
          speaker: "nico",
          text: "Forty-one.",
          es: "Cuarenta y uno.",
        },
      ],
      words: [
        { word: "signed", es: "firmó" },
        { word: "audits", es: "audita" },
        { word: "matter", es: "importan" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Renata on the laptop screen leaning back, the countdown at 0:00 in red; Mía appearing over the divider with her phone.",
      text: "Renata doesn't cut him. The internet does something else.",
      es: "Renata no lo corta. El internet hace otra cosa.",
      speaker: "renata",
      cast: ["renata", "mia", "dani"],
      lines: [
        {
          speaker: "renata",
          text: "One second over, and I'm keeping it. That's the first time a guest answered that question without saying 'but the customer is always right'.",
          es: "Un segundo de más, y lo dejo. Es la primera vez que un invitado contesta esa pregunta sin decir 'pero el cliente siempre tiene la razón'.",
        },
        {
          speaker: "mia",
          text: "Jefe. It's already clipped. 'The only part of your English that proves you did the work.' Bogotá put it on the wall screen.",
          es: "Jefe. Ya lo recortaron. 'La única parte de tu inglés que prueba que hiciste el trabajo'. Bogotá lo puso en la pantalla de la pared.",
        },
        {
          speaker: "dani",
          text: "I said her bus. I didn't say her name.",
          es: "Dije su bus. No dije su nombre.",
        },
        {
          speaker: "mia",
          text: "Everybody on this floor knows whose bus that is.",
          es: "Todos en este piso saben de quién es ese bus.",
        },
      ],
      words: [
        { word: "guest", es: "invitado" },
        { word: "clipped", es: "recortado" },
        { word: "wall", es: "pared" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The floor at noon; Camila at the end of the row with her tablet showing academy applications; Óscar beside her with a club sign-up sheet, no badge; Dani between them.",
      text: "12:00 p.m. Numbers, again.",
      es: "12:00 p.m. Números, otra vez.",
      speaker: "camila",
      cast: ["camila", "oscar", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Ninety applications to the academy since ten. Forty of them say 'the accent one' in the reason field. That's a field I added this morning.",
          es: "Noventa solicitudes a la academia desde las diez. Cuarenta dicen 'el del acento' en el campo de motivo. Ese campo lo agregué esta mañana.",
        },
        {
          speaker: "oscar",
          text: "The club has a waiting list. There's never been a waiting list. My cousin is fourth.",
          es: "El club tiene lista de espera. Nunca ha habido lista de espera. Mi primo es el cuarto.",
        },
        {
          speaker: "dani",
          text: "Move him to first. He was here before the clip.",
          es: "Pásalo al primero. Él estaba aquí antes del clip.",
        },
      ],
      words: [
        { word: "applications", es: "solicitudes" },
        { word: "field", es: "campo" },
        { word: "waiting", es: "espera" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale in the doorway of the training room, arms folded, not coming in; Dani inside erasing the whiteboard; the three columns still faintly visible.",
      text: "3:00 p.m. Vale in the doorway. She doesn't come in.",
      es: "3:00 p.m. Vale en la puerta. No entra.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "You said the message of the whole academy in forty seconds, and I've been trying to say it for nine years. I'm not here to congratulate you.",
          es: "Dijiste el mensaje de toda la academia en cuarenta segundos, y yo llevo nueve años intentando decirlo. No vine a felicitarte.",
        },
        {
          speaker: "dani",
          text: "What are you here for?",
          es: "¿A qué viniste?",
        },
        {
          speaker: "vale",
          text: "To ask if you called her before you said it.",
          es: "A preguntar si la llamaste antes de decirlo.",
        },
        {
          speaker: "dani",
          text: "...No.",
          es: "...No.",
        },
        {
          speaker: "vale",
          text: "Then the forty seconds aren't finished.",
          es: "Entonces los cuarenta segundos no han terminado.",
        },
      ],
      words: [
        { word: "message", es: "mensaje" },
        { word: "congratulate", es: "felicitar" },
        { word: "finished", es: "terminado" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Break room; Nico by the vending machine with his hood down; Dani sitting at the table with his phone face up for once, Lidia's name on the screen, not yet dialed.",
      text: "6:30 p.m. He has her number. He hasn't pressed it.",
      es: "6:30 p.m. Tiene su número. No lo ha presionado.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "You described me on air without asking and then you asked. Same thing. Press it.",
          es: "Me describiste al aire sin preguntar y después preguntaste. Es lo mismo. Presiónalo.",
        },
        {
          speaker: "dani",
          text: "It's not the same thing. You're twenty-two and you sit next to me. She's the person who taught me the word 'accent'.",
          es: "No es lo mismo. Tú tienes veintidós y te sientas a mi lado. Ella es la persona que me enseñó la palabra 'acento'.",
        },
        {
          speaker: "nico",
          text: "Then it's more the same thing. Five seconds. Then press it.",
          es: "Entonces es más lo mismo. Cinco segundos. Después presiónalo.",
        },
      ],
      words: [
        { word: "same", es: "mismo" },
        { word: "taught", es: "enseñó" },
        { word: "press", es: "presionar" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Dani alone on the bench with his phone to his ear, the Northline sign behind him. Only Dani is drawn; Lidia is a voice on the phone.",
      text: "9:00 p.m. She calls first.",
      es: "9:00 p.m. Ella llama primero.",
      speaker: "dani",
      lines: [
        {
          speaker: "lidia",
          text: "You told two million people about my accent.",
          es: "Le contaste a dos millones de personas sobre mi acento.",
        },
        {
          speaker: "dani",
          text: "I told them about my teacher. I should have asked you first. That was wrong, and I knew it at second twenty-nine.",
          es: "Les conté sobre mi maestra. Debí preguntarte primero. Eso estuvo mal, y lo supe en el segundo veintinueve.",
        },
        {
          speaker: "lidia",
          text: "Yes. Ask next time. And Dani: the sentence about the work. That one you can keep.",
          es: "Sí. Pregunta la próxima vez. Y Dani: la frase sobre el trabajo. Esa te la puedes quedar.",
        },
      ],
      words: [
        { word: "teacher", es: "maestra" },
        { word: "knew", es: "supe" },
        { word: "keep", es: "quedarte" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What is Dani's position on accents, in one sentence?",
      questionEs: "¿Cuál es la posición de Dani sobre los acentos, en una frase?",
      options: [
        { label: "An accent is proof that you learned; it's the part of your English that shows you did the work", emoji: "🗣️" },
        { label: "Accents don't matter and nobody should notice them", emoji: "🙉" },
        { label: "Teachers with accents should only train agents, not customers", emoji: "📋" },
      ],
      answer: 0,
      sayIt: "An accent is proof that you learned; it's the part of your English that shows you did the work.",
      sayItEs: "Un acento es prueba de que aprendiste; es la parte de tu inglés que muestra que hiciste el trabajo.",
      sayItCheck: {
        target: "* proof that you learned *",
        altTargets: ["An accent is proof *", "* you did the work", "Accents matter *"],
      },
    },
    {
      id: "q2",
      afterScene: "s3",
      questionEn: "Give your opinion on something people disagree about: position in the first sentence, one reason, one example, and close.",
      questionEs: "Da tu opinión sobre algo en lo que la gente no está de acuerdo: posición en la primera frase, una razón, un ejemplo, y cierre.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "Personally, I think AI will replace some jobs, but not as many as people say. The main reason is that most jobs are a mix of tasks, not one task. For example, in my job the repetitive part could be automated tomorrow. But overall, I'd say jobs will change more than they disappear.",
      sayItEs: "Personalmente, pienso que la IA va a reemplazar algunos trabajos, pero no tantos como dice la gente. La razón principal es que la mayoría de los trabajos son una mezcla de tareas, no una sola. Por ejemplo, en mi trabajo la parte repetitiva se podría automatizar mañana. Pero en general, diría que los trabajos van a cambiar más de lo que van a desaparecer.",
      sayItAskEn: "Start with \"Personally, I think ...\", then \"The main reason is ...\", then \"For example, ...\", and close with \"But overall, I'd say ...\".",
      sayItAskEs: "Empieza con \"Personally, I think …\", luego \"The main reason is …\", después \"For example, …\" y cierra con \"But overall, I'd say …\".",
      sayItCheck: {
        target: "Personally, I think *",
        altTargets: ["The main reason is *", "For example, *", "I think *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "Position first. Then one reason. Then one example. If I can't do it in forty seconds, I don't have a position yet.",
    es: "Posición primero. Luego una razón. Luego un ejemplo. Si no puedo hacerlo en cuarenta segundos, todavía no tengo posición.",
  },
  habitCard: {
    afterScene: "s9",
    phrase: "Before I use someone as my example in public, I call them.",
    es: "Antes de usar a alguien como mi ejemplo en público, le llamo.",
    model: "vale",
    modelActionEs: "Vale no vino a felicitar a Dani por los cuarenta segundos; vino a preguntarle si había llamado a Lidia antes, y no había.",
  },
  expressions: [
    {
      phrase: "go over",
      variants: ["went over", "goes over", "going over"],
      es: "pasarse (del tiempo o del límite)",
      kind: "phrasal",
      example: "Forty seconds. If you go over, I cut you, because that's what the internet does anyway.",
      exampleEs: "Cuarenta segundos. Si te pasas, te corto, porque eso es lo que hace el internet de todas formas.",
    },
    {
      phrase: "find out",
      variants: ["found out", "finds out", "finding out"],
      es: "averiguar, enterarse",
      kind: "phrasal",
      example: "I don't know if Northline did it. I'll find out, and I'll say it here, on Monday, with a name if the name is mine to say.",
      exampleEs: "No sé si Northline lo hizo. Lo voy a averiguar, y lo voy a decir aquí, el lunes, con nombre si el nombre me toca decirlo a mí.",
    },
    {
      phrase: "the customer is always right",
      variants: ["the client is always right"],
      es: "el cliente siempre tiene la razón",
      kind: "idiom",
      example: "That's the first time a guest answered that question without saying 'but the customer is always right'.",
      exampleEs: "Es la primera vez que un invitado contesta esa pregunta sin decir 'pero el cliente siempre tiene la razón'.",
    },
    {
      phrase: "did the work",
      variants: ["do the work", "put in the work"],
      es: "hacer el trabajo, esforzarse de verdad",
      kind: "idiom",
      example: "But overall, I'd say accents matter: they're the only part of your English that proves you did the work.",
      exampleEs: "Pero en general, diría que los acentos importan: son la única parte de tu inglés que prueba que hiciste el trabajo.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: something people argue about at work. Your position in the first sentence, one reason, one real example, and a close that admits what you could be wrong about.",
    es: "Treinta segundos: algo que la gente discute en el trabajo. Tu posición en la primera frase, una razón, un ejemplo real, y un cierre que admita en qué podrías estar equivocado.",
  },
  continueWith: [
    "Personally, I think ...",
    "The main reason is that ...",
    "For example, ...",
    "I could be wrong about ... But overall, I'd say ...",
  ],
  cliffhanger: {
    en: "Tomorrow: Northline wants to replace half the classes with an AI tutor to reach Monterrey faster. Dani has to see both sides, and Vale is listening from the door.",
    es: "Mañana: Northline quiere reemplazar la mitad de las clases con un tutor de IA para llegar más rápido a Monterrey. Dani tiene que ver los dos lados, y Vale escucha desde la puerta.",
  },
};
