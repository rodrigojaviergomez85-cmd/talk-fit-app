import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep12-the-course-i-closed/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep12-the-course-i-closed/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep12-the-course-i-closed/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep12-the-course-i-closed/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep12-the-course-i-closed/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep12-the-course-i-closed/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep12-the-course-i-closed/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep12-the-course-i-closed/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep12-the-course-i-closed/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep12-the-course-i-closed/s9.jpg";

export const ADVANCED1_EP12_THE_COURSE_I_CLOSED: StorybookEpisode = {
  id: "advanced1-ep12-the-course-i-closed",
  moduleId: "advanced-1",
  week: 3,
  title: "The course I closed",
  titleEs: "El curso que cerré",
  episodeLabel: {
    en: "Advanced 1 · Episode 12",
    es: "Advanced 1 · Episodio 12",
  },
  previously: [
    {
      en: "Vale answered the personal question without attacking anyone.",
      es: "Vale respondió la pregunta personal sin atacar a nadie.",
    },
    {
      en: "Crown offered Rosa double her salary.",
      es: "Crown le ofreció a Rosa el doble de su salario.",
    },
    {
      en: "And then the committee found a course Vale closed two years ago.",
      es: "Y entonces el comité encontró un curso que Vale cerró hace dos años.",
    },
  ],
  reviewWords: [
    { word: "failure", es: "fracaso" },
    { word: "responsibility", es: "responsabilidad" },
    { word: "retention", es: "retención" },
    { word: "evidence", es: "evidencia" },
    { word: "contract", es: "contrato" },
  ],
  blurb: {
    en: "A closed course comes back as an accusation. Vale owns it with numbers, not excuses.",
    es: "Un curso cerrado regresa como acusación. Vale lo asume con números, no con excusas.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Dani shows Vale an old screenshot of the academy website on his laptop.",
      text: "An old page comes back.",
      es: "Una página vieja regresa.",
      speaker: "dani",
      cast: ["dani", "vale"],
      lines: [
        {
          speaker: "dani",
          text: "Crown sent the committee a screenshot of our old site. \"Business English Intensive — closed after one term.\"",
          es: "Crown le mandó al comité una captura de nuestro sitio viejo. \"Business English Intensive — cerrado después de un trimestre.\"",
        },
        {
          speaker: "vale",
          text: "I closed it. Fourteen students, eleven of whom stopped speaking by week five, and I wasn't going to keep charging for a course that didn't work.",
          es: "Lo cerré yo. Catorce estudiantes, de los cuales once dejaron de hablar en la semana cinco, y no iba a seguir cobrando por un curso que no funcionaba.",
        },
        {
          speaker: "dani",
          text: "The committee will ask why it failed. Crown will say it proves you can't scale.",
          es: "El comité preguntará por qué fracasó. Crown dirá que eso prueba que no puedes escalar.",
        },
      ],
      words: [
        { word: "screenshot", es: "captura de pantalla" },
        { word: "charging", es: "cobrando" },
        { word: "scale", es: "escalar, crecer" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila writes four words on a whiteboard while Vale stands beside it.",
      text: "Four parts, and no villain.",
      es: "Cuatro partes, y sin villano.",
      speaker: "camila",
      cast: ["camila", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "Four parts, the same ones you teach: the failure, your responsibility, the change, the result. No villain.",
          es: "Cuatro partes, las mismas que enseñas: el fracaso, tu responsabilidad, el cambio, el resultado. Sin villano.",
        },
        {
          speaker: "vale",
          text: "The failure is simple. I designed a course around vocabulary lists because that's what the companies asked for.",
          es: "El fracaso es simple. Diseñé un curso alrededor de listas de vocabulario porque eso era lo que pedían las empresas.",
        },
        {
          speaker: "camila",
          text: "And whose decision was that?",
          es: "¿Y de quién fue esa decisión?",
        },
        {
          speaker: "vale",
          text: "Mine. Nobody forced me to sell a product I didn't believe in; I just wanted the contract more than I wanted to argue.",
          es: "Mía. Nadie me obligó a vender un producto en el que no creía; solo quería el contrato más de lo que quería discutir.",
        },
      ],
      words: [
        { word: "villain", es: "villano" },
        { word: "vocabulary", es: "vocabulario" },
        { word: "argue", es: "discutir" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani presses Vale for the change she made, notes open on the table.",
      text: "Honesty alone doesn't win a contract.",
      es: "La honestidad sola no gana un contrato.",
      speaker: "dani",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "dani",
          text: "That's honest, but honesty alone doesn't win a contract. What did you change?",
          es: "Eso es honesto, pero la honestidad sola no gana un contrato. ¿Qué cambiaste?",
        },
        {
          speaker: "vale",
          text: "I rebuilt the course around speaking minutes. Every class now measures how long each adult actually talks, and no lesson is approved unless that number goes up.",
          es: "Reconstruí el curso alrededor de minutos hablados. Cada clase mide cuánto habla realmente cada adulto, y ninguna lección se aprueba si ese número no sube.",
        },
        {
          speaker: "dani",
          text: "And the results, with numbers, or Crown will think we're just making it up.",
          es: "Y los resultados, con números, o Crown va a pensar que solo lo estamos inventando.",
        },
      ],
      words: [
        { word: "rebuilt", es: "reconstruí" },
        { word: "measures", es: "mide" },
        { word: "approved", es: "aprobada" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Elena speaks up next to Vale and Camila, a retention chart on the screen behind them.",
      text: "The evidence has a voice.",
      es: "La evidencia tiene voz.",
      speaker: "vale",
      cast: ["vale", "camila", "elena"],
      lines: [
        {
          speaker: "vale",
          text: "Retention went from forty-one per cent to eighty-eight. Elena was in the course that failed and she's still here.",
          es: "La retención pasó de cuarenta y uno por ciento a ochenta y ocho. Elena estuvo en el curso que fracasó y sigue aquí.",
        },
        {
          speaker: "elena",
          text: "In the old course I memorised ninety words and I couldn't use any of them on the phone. Now I speak for a minute without preparing.",
          es: "En el curso viejo memoricé noventa palabras y no podía usar ninguna al teléfono. Ahora hablo un minuto sin prepararme.",
        },
        {
          speaker: "camila",
          text: "That's the sentence the committee needs to hear, and it shouldn't come from you, Vale. It should come from her.",
          es: "Esa es la frase que el comité necesita oír, y no debería venir de ti, Vale. Debería venir de ella.",
        },
      ],
      words: [
        { word: "retention", es: "retención" },
        { word: "memorised", es: "memoricé" },
        { word: "preparing", es: "prepararme" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Barrett questions Vale across the committee table with the old page printed in front of her.",
      text: "The committee asks for the version without marketing.",
      es: "El comité pide la versión sin marketing.",
      speaker: "barrett",
      cast: ["barrett", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "You closed a paid course mid-contract. Explain that, please, without the marketing version.",
          es: "Cerró un curso pagado a mitad de contrato. Explíquelo, por favor, sin la versión de marketing.",
        },
        {
          speaker: "vale",
          text: "I built it wrong. I let the client define the method; the students stopped speaking by week five, and rather than keep charging them, I shut it down and refunded the final month.",
          es: "Lo construí mal. Dejé que el cliente definiera el método; los estudiantes dejaron de hablar en la semana cinco, y en vez de seguir cobrándoles, lo cerré y devolví el último mes.",
        },
        {
          speaker: "vale",
          text: "What came out of it is the rule we use today: every lesson is measured in speaking minutes. Retention doubled, and the eleven students who went silent were the reason it did.",
          es: "Lo que salió de eso es la regla que usamos hoy: cada lección se mide en minutos hablados. La retención se duplicó, y los once estudiantes que se quedaron callados fueron la razón.",
        },
      ],
      words: [
        { word: "mid-contract", es: "a mitad de contrato" },
        { word: "refunded", es: "devolví" },
        { word: "silent", es: "callados" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Reed answers Barrett while Vale stays calm at the end of the table.",
      text: "Crown has never closed a course.",
      es: "Crown nunca ha cerrado un curso.",
      speaker: "barrett",
      cast: ["barrett", "reed", "vale"],
      lines: [
        {
          speaker: "barrett",
          text: "Crown has never closed a course.",
          es: "Crown nunca ha cerrado un curso.",
        },
        {
          speaker: "reed",
          text: "Which could mean their courses all work, or it could mean nobody there is allowed to admit it when one doesn't.",
          es: "Lo cual podría significar que todos sus cursos funcionan, o que ahí nadie tiene permiso de admitir cuando uno no funciona.",
        },
        {
          speaker: "vale",
          text: "I'd rather own up to one closed course than defend fourteen that quietly do nothing.",
          es: "Prefiero asumir un curso cerrado que defender catorce que en silencio no hacen nada.",
        },
      ],
      words: [
        { word: "allowed", es: "permitido" },
        { word: "admit", es: "admitir" },
        { word: "defend", es: "defender" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Rosa finds Vale in the corridor to talk about Crown's offer.",
      text: "Rosa says it before anyone else can.",
      es: "Rosa lo dice antes que nadie.",
      speaker: "rosa",
      cast: ["rosa", "vale"],
      lines: [
        {
          speaker: "rosa",
          text: "Vale. You know about Crown's offer, don't you? I didn't want you to hear it from Camila.",
          es: "Vale. Sabes de la oferta de Crown, ¿verdad? No quería que lo supieras por Camila.",
        },
        {
          speaker: "vale",
          text: "I know the number too. It's a fair offer and you'd be worth it there.",
          es: "También sé el número. Es una oferta justa y ahí la valdrías.",
        },
        {
          speaker: "rosa",
          text: "That's not the answer I expected from my boss.",
          es: "Esa no es la respuesta que esperaba de mi jefa.",
        },
      ],
      words: [
        { word: "fair", es: "justa" },
        { word: "worth", es: "valer" },
        { word: "expected", es: "esperaba" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale asks Rosa one question while Dani listens from the doorway.",
      text: "One question, and then silence.",
      es: "Una pregunta, y luego silencio.",
      speaker: "vale",
      cast: ["vale", "rosa", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "I'm not going to talk you out of money, Rosa. I'm going to ask you one question and then leave you alone with it.",
          es: "No te voy a convencer de rechazar dinero, Rosa. Te voy a hacer una pregunta y luego te dejo sola con ella.",
        },
        {
          speaker: "rosa",
          text: "Ask it.",
          es: "Hazla.",
        },
        {
          speaker: "vale",
          text: "In five years, whose method do you want to be teaching — theirs, or one you helped build?",
          es: "En cinco años, ¿el método de quién quieres estar enseñando: el de ellos, o uno que tú ayudaste a construir?",
        },
        {
          speaker: "dani",
          text: "That's the same question the committee is asking us, only with a bigger budget attached.",
          es: "Esa es la misma pregunta que nos está haciendo el comité, solo que con un presupuesto más grande.",
        },
      ],
      words: [
        { word: "alone", es: "sola" },
        { word: "budget", es: "presupuesto" },
        { word: "attached", es: "adjunto, unido" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed tells Vale what Thursday's session will be, both standing by the stairs.",
      text: "Thursday's question is \"why Northline\".",
      es: "La pregunta del jueves es \"por qué Northline\".",
      speaker: "reed",
      cast: ["reed", "vale"],
      lines: [
        {
          speaker: "reed",
          text: "Thursday's session is \"why Northline\". Crown will answer it with numbers you can't match.",
          es: "La sesión del jueves es \"por qué Northline\". Crown la responderá con números que no puedes igualar.",
        },
        {
          speaker: "vale",
          text: "Then I won't answer it with numbers.",
          es: "Entonces no la responderé con números.",
        },
      ],
      words: [
        { word: "session", es: "sesión" },
        { word: "match", es: "igualar" },
        { word: "answer", es: "responder" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "Why did Vale's old Business English course fail?",
      questionEs: "¿Por qué fracasó el viejo curso de Business English de Vale?",
      options: [
        { label: "Her teachers refused to work extra hours", emoji: "⏱️" },
        { label: "The companies cancelled the contract without warning", emoji: "📄" },
        { label: "She built it around vocabulary lists instead of speaking time", emoji: "📋" },
      ],
      answer: 2,
      sayIt: "She built it around vocabulary lists instead of speaking time.",
      sayItEs: "Lo construyó alrededor de listas de vocabulario en vez de tiempo hablando.",
      sayItCheck: {
        target: "She built it around vocabulary lists instead of speaking time",
        altTargets: ["It was built around vocabulary lists", "Around vocabulary lists instead of speaking time"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Tell me about a failure. What happened, what was your part in it, what did you change, and what was the result?",
      questionEs: "Cuéntame sobre un fracaso. ¿Qué pasó, cuál fue tu parte, qué cambiaste y cuál fue el resultado?",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I organised a training day and only four people came. I hadn't asked anyone what they needed, so I sent a short survey first the next time, and thirty people signed up.",
      sayItEs: "Organicé un día de capacitación y solo llegaron cuatro personas. No le había preguntado a nadie qué necesitaba, así que la siguiente vez mandé una encuesta corta primero, y treinta personas se inscribieron.",
      sayItAskEn: "What failed, what was your part, what did you change, and what was the result?",
      sayItAskEs: "¿Qué falló, cuál fue tu parte, qué cambiaste y cuál fue el resultado?",
      sayItCheck: {
        target: "What happened was *",
        altTargets: ["My part was *", "What I changed was *", "The result was *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I can own a mistake and still be the right person for the job.",
    es: "Puedo asumir un error y aun así ser la persona correcta para el trabajo.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "When I talk about a failure, I give the failure, my part, the change and the result.",
    es: "Cuando hablo de un fracaso, doy el fracaso, mi parte, el cambio y el resultado.",
    model: "vale",
    modelActionEs: "Vale explicó el curso que cerró con su responsabilidad y con números.",
  },
  expressions: [
    {
      phrase: "shut down",
      variants: ["shut it down", "shuts down", "shutting down"],
      es: "cerrar algo definitivamente",
      kind: "phrasal",
      example: "Rather than keep charging them, I shut it down and refunded the final month.",
      exampleEs: "En vez de seguir cobrándoles, lo cerré y devolví el último mes.",
    },
    {
      phrase: "own up to",
      variants: ["owns up to", "owned up to", "owning up to"],
      es: "asumir la responsabilidad de",
      kind: "phrasal",
      example: "I'd rather own up to one closed course than defend fourteen that quietly do nothing.",
      exampleEs: "Prefiero asumir un curso cerrado que defender catorce que en silencio no hacen nada.",
    },
    {
      phrase: "talk someone out of",
      variants: ["talk you out of", "talked out of", "talking out of"],
      es: "convencer a alguien de no hacer algo",
      kind: "idiom",
      example: "I'm not going to talk you out of money, Rosa.",
      exampleEs: "No te voy a convencer de rechazar dinero, Rosa.",
    },
    {
      phrase: "come out of",
      variants: ["came out of", "comes out of", "coming out of"],
      es: "resultar de algo",
      kind: "idiom",
      example: "What came out of it is the rule we use today.",
      exampleEs: "Lo que salió de eso es la regla que usamos hoy.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: tell one failure, your part in it, what you changed and the result.",
    es: "Treinta segundos: cuenta un fracaso, tu parte en él, qué cambiaste y el resultado.",
  },
  continueWith: [
    "What failed was ...",
    "My part in it was ...",
    "What I changed was ...",
  ],
  cliffhanger: {
    en: "Rosa hasn't decided yet, and on Thursday the committee asks the hardest question: why Northline?",
    es: "Rosa aún no decide, y el jueves el comité hace la pregunta más difícil: ¿por qué Northline?",
  },
};
