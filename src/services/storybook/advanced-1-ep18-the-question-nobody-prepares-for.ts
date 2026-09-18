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
  titleEs: "La pregunta que nadie prepara",
  episodeLabel: {
    en: "Advanced 1 · Episode 18",
    es: "Advanced 1 · Episodio 18",
  },
  previously: [
    {
      en: "Three questions each. Dani told three true Tuesdays.",
      es: "Tres preguntas cada uno. Dani contó tres martes verdaderos.",
    },
    {
      en: "Barrett has a preference, and it isn't the one Vale expects.",
      es: "Barrett tiene una preferencia, y no es la que Vale espera.",
    },
    {
      en: "She wants to see the candidates when they don't know she's there.",
      es: "Quiere ver a los candidatos cuando no saben que está ahí.",
    },
  ],
  reviewWords: [
    { word: "candidate", es: "candidato" },
    { word: "follow-up", es: "repregunta" },
    { word: "preference", es: "preferencia" },
    { word: "scholarship", es: "beca" },
    { word: "parking lot", es: "estacionamiento" },
  ],
  blurb: {
    en: "No room, no committee, no warning. Barrett is in the parking lot at 6:50 a.m. with three questions that have no right answer, and a twenty-year-old with a headset who is about to be asked the hardest one.",
    es: "Sin sala, sin comité, sin aviso. Barrett está en el estacionamiento a las 6:50 a.m. con tres preguntas sin respuesta correcta, y una chica de veinte años con diadema a la que le van a hacer la más difícil.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "The academy parking lot at sunrise; Barrett leaning on a parked car with a paper coffee cup; Mía a few steps away filming the sky with her phone, a headset around her neck; Dani arriving on foot with his backpack.",
      text: "Thursday, 6:50 a.m.",
      es: "Jueves, 6:50 a.m.",
      speaker: "barrett",
      cast: ["barrett", "mia", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "You're early. Good. So is she.",
          es: "Llegaste temprano. Bien. Ella también.",
        },
        {
          speaker: "dani",
          text: "Who is she?",
          es: "¿Quién es ella?",
        },
        {
          speaker: "barrett",
          text: "Mía. Northline's first pilot agent. She starts in October; I sent her early to watch how this place works before anyone teaches her anything.",
          es: "Mía. La primera agente del piloto de Northline. Empieza en octubre; la mandé antes para que vea cómo funciona este lugar antes de que alguien le enseñe nada.",
        },
        {
          speaker: "mia",
          text: "Morning, jefe.",
          es: "Buenos días, jefe.",
        },
        {
          speaker: "dani",
          text: "I'm not your— okay. Morning.",
          es: "No soy tu… okay. Buenos días.",
        },
      ],
      words: [
        { word: "agent", es: "agente" },
        { word: "watch", es: "observar" },
        { word: "early", es: "temprano" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Barrett facing Dani between two parked cars, no folder, no table; Mía leaning on a car behind them with her phone half-raised.",
      text: "No table. No clock.",
      es: "Sin mesa. Sin reloj.",
      speaker: "barrett",
      cast: ["barrett", "dani", "mia"],
      lines: [
        {
          speaker: "barrett",
          text: "No room, no committee, no preparation. Three questions. Ten seconds to think, then you talk.",
          es: "Sin sala, sin comité, sin preparación. Tres preguntas. Diez segundos para pensar, y luego hablas.",
        },
        {
          speaker: "dani",
          text: "Is this the interview?",
          es: "¿Esta es la entrevista?",
        },
        {
          speaker: "barrett",
          text: "This is the part of the interview nobody prepares for. There's no right answer. I want to see how you build one when you don't have it.",
          es: "Esta es la parte de la entrevista que nadie prepara. No hay respuesta correcta. Quiero ver cómo construyes una cuando no la tienes.",
        },
        {
          speaker: "mia",
          text: "I can count the ten seconds, if that helps.",
          es: "Puedo contar los diez segundos, si eso ayuda.",
        },
        {
          speaker: "dani",
          text: "It does not help.",
          es: "No ayuda.",
        },
      ],
      words: [
        { word: "preparation", es: "preparación" },
        { word: "build", es: "construir" },
        { word: "count", es: "contar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Close on Dani's face thinking, eyes on the ground, one hand in his jacket pocket; Mía's fingers counting in the foreground.",
      text: "Question one.",
      es: "Pregunta uno.",
      speaker: "barrett",
      cast: ["barrett", "dani", "mia"],
      lines: [
        {
          speaker: "barrett",
          text: "If you could change one decision from your past, what would it be and why?",
          es: "Si pudieras cambiar una decisión de tu pasado, ¿cuál sería y por qué?",
        },
        {
          speaker: "mia",
          text: "Ten. Nine. Eight.",
          es: "Diez. Nueve. Ocho.",
        },
        {
          speaker: "dani",
          text: "I'd say the year I waited after my first no. The reason is I thought a no meant not ready, when it meant not prepared. The second time I prepared for three weeks and got the job. So overall, I'd change the waiting, not the no.",
          es: "Diría el año que esperé después de mi primer no. La razón es que pensé que un no significaba no estar listo, cuando significaba no estar preparado. La segunda vez me preparé tres semanas y conseguí el puesto. Así que en general, cambiaría la espera, no el no.",
        },
        {
          speaker: "barrett",
          text: "That was nine seconds of thinking and forty of talking. Next.",
          es: "Eso fueron nueve segundos pensando y cuarenta hablando. Siguiente.",
        },
      ],
      words: [
        { word: "decision", es: "decisión" },
        { word: "waited", es: "esperé" },
        { word: "overall", es: "en general" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani looking at the academy's front door across the parking lot; Barrett watching him; Mía has lowered her phone.",
      text: "Question two.",
      es: "Pregunta dos.",
      speaker: "barrett",
      cast: ["barrett", "dani", "mia"],
      lines: [
        {
          speaker: "barrett",
          text: "If you suddenly received ten thousand dollars, what would you do?",
          es: "Si de repente recibieras diez mil dólares, ¿qué harías?",
        },
        {
          speaker: "dani",
          text: "I'd pay the scholarship for two students for a year. The reason is that someone knocked on that door for me once, and I know exactly what a year costs.",
          es: "Pagaría la beca de dos estudiantes por un año. La razón es que alguien tocó esa puerta por mí una vez, y sé exactamente lo que cuesta un año.",
        },
        {
          speaker: "barrett",
          text: "Who knocked?",
          es: "¿Quién tocó?",
        },
        {
          speaker: "dani",
          text: "My mother. So overall, I'd spend it on the only thing I'm sure works, because I'm the example.",
          es: "Mi mamá. Así que en general, lo gastaría en lo único que estoy seguro que funciona, porque yo soy el ejemplo.",
        },
      ],
      words: [
        { word: "suddenly", es: "de repente" },
        { word: "scholarship", es: "beca" },
        { word: "knocked", es: "tocó (la puerta)" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Wide shot of the parking lot, the street and the neighborhood behind it in early light; Dani pointing at the ground; Barrett with her cup halfway up.",
      text: "Question three.",
      es: "Pregunta tres.",
      speaker: "barrett",
      cast: ["barrett", "dani", "mia"],
      lines: [
        {
          speaker: "barrett",
          text: "If you could live anywhere in the world, where would you live?",
          es: "Si pudieras vivir en cualquier parte del mundo, ¿dónde vivirías?",
        },
        {
          speaker: "dani",
          text: "Here.",
          es: "Aquí.",
        },
        {
          speaker: "barrett",
          text: "That's not an answer. That's a location.",
          es: "Eso no es una respuesta. Es una ubicación.",
        },
        {
          speaker: "dani",
          text: "I'd say here, two streets from where I'm standing. The reason is that the people who need this are here, not in a nicer city. For example, my first student in October lives on this street. So overall, anywhere in the world is a great answer for someone who hasn't found their street yet.",
          es: "Diría aquí, a dos calles de donde estoy parado. La razón es que la gente que necesita esto está aquí, no en una ciudad más bonita. Por ejemplo, mi primera alumna de octubre vive en esta calle. Así que en general, cualquier parte del mundo es una gran respuesta para alguien que todavía no ha encontrado su calle.",
        },
        {
          speaker: "mia",
          text: "Nobody says here.",
          es: "Nadie dice aquí.",
        },
      ],
      words: [
        { word: "anywhere", es: "en cualquier parte" },
        { word: "location", es: "ubicación" },
        { word: "street", es: "calle" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Barrett turned toward Mía, who has put her phone away; Dani a step behind looking at the ground; the parking lot quiet.",
      text: "The one nobody prepares for.",
      es: "La que nadie prepara.",
      speaker: "barrett",
      cast: ["barrett", "mia", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Mía. You've watched him for forty minutes. Why him and not Lidia?",
          es: "Mía. Lo has observado cuarenta minutos. ¿Por qué él y no Lidia?",
        },
        {
          speaker: "mia",
          text: "Can I say the honest thing?",
          es: "¿Puedo decir lo honesto?",
        },
        {
          speaker: "barrett",
          text: "It's the only thing that counts before seven.",
          es: "Es lo único que cuenta antes de las siete.",
        },
        {
          speaker: "mia",
          text: "Lidia's the better teacher. Everyone knows that. He's the one who'd notice if I stopped coming.",
          es: "Lidia es mejor maestra. Todos lo saben. Él es el que se daría cuenta si yo dejara de venir.",
        },
        {
          speaker: "dani",
          text: "You've known me for forty minutes.",
          es: "Me conoces desde hace cuarenta minutos.",
        },
        {
          speaker: "mia",
          text: "You asked my name twice to get it right. That's the whole test, jefe.",
          es: "Preguntaste mi nombre dos veces para decirlo bien. Esa es toda la prueba, jefe.",
        },
      ],
      words: [
        { word: "honest", es: "honesto" },
        { word: "notice", es: "darse cuenta" },
        { word: "whole", es: "entero, todo" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale arriving at the academy door with her keys, seeing Barrett, Dani and Mía in the parking lot; Barrett raising her cup in greeting.",
      text: "7:05 a.m.",
      es: "7:05 a.m.",
      speaker: "vale",
      cast: ["vale", "barrett"],
      lines: [
        {
          speaker: "vale",
          text: "You stopped by at seven to interview my staff in a parking lot.",
          es: "Pasaste a las siete a entrevistar a mi personal en un estacionamiento.",
        },
        {
          speaker: "barrett",
          text: "I came to see what he does when nobody's grading.",
          es: "Vine a ver qué hace cuando nadie está calificando.",
        },
        {
          speaker: "vale",
          text: "And?",
          es: "¿Y?",
        },
        {
          speaker: "barrett",
          text: "He answered a girl with a headset like she was the committee. I caught him off guard three times and he built an answer every time. Now I need Lidia.",
          es: "Le respondió a una chica con diadema como si fuera el comité. Lo tomé por sorpresa tres veces y construyó una respuesta cada vez. Ahora necesito a Lidia.",
        },
      ],
      words: [
        { word: "staff", es: "personal" },
        { word: "grading", es: "calificando" },
        { word: "caught", es: "atrapé, tomé" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Lidia in the academy hallway with her bag still on her shoulder, answering Barrett; Dani and Mía visible at the far end of the hall.",
      text: "Same three questions.",
      es: "Las mismas tres preguntas.",
      speaker: "barrett",
      cast: ["barrett", "lidia", "dani", "mia"],
      lines: [
        {
          speaker: "barrett",
          text: "Lidia. If you could live anywhere in the world, where would you live?",
          es: "Lidia. Si pudieras vivir en cualquier parte del mundo, ¿dónde vivirías?",
        },
        {
          speaker: "lidia",
          text: "Wherever my students are. Which, this year, is here.",
          es: "Donde estén mis estudiantes. Que, este año, es aquí.",
        },
        {
          speaker: "barrett",
          text: "You both said here.",
          es: "Los dos dijeron aquí.",
        },
        {
          speaker: "lidia",
          text: "It's a small country.",
          es: "Es un país pequeño.",
        },
        {
          speaker: "mia",
          text: "Okay, that was funny and nobody laughed. Noted.",
          es: "Okay, eso fue gracioso y nadie se rio. Anotado.",
        },
      ],
      words: [
        { word: "wherever", es: "donde sea que" },
        { word: "both", es: "ambos" },
        { word: "noted", es: "anotado" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Dani and Mía sitting on the academy's front steps in the morning sun, her headset in her lap, the parking lot now empty.",
      text: "The steps.",
      es: "Las gradas.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "Why'd you answer the money one with a knock on a door? Adults answer that with a car.",
          es: "¿Por qué contestaste la del dinero con alguien tocando una puerta? Los adultos contestan eso con un carro.",
        },
        {
          speaker: "dani",
          text: "Because it's true. And because she asked before seven. You can count on people to tell the truth before seven.",
          es: "Porque es verdad. Y porque preguntó antes de las siete. Puedes contar con que la gente diga la verdad antes de las siete.",
        },
        {
          speaker: "mia",
          text: "That's not how adults talk.",
          es: "Así no hablan los adultos.",
        },
        {
          speaker: "dani",
          text: "That's why she came at 6:50.",
          es: "Por eso vino a las 6:50.",
        },
      ],
      words: [
        { word: "steps", es: "gradas, escalones" },
        { word: "adults", es: "adultos" },
        { word: "true", es: "verdad" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What would Dani do with the ten thousand dollars?",
      questionEs: "¿Qué haría Dani con los diez mil dólares?",
      options: [
        { label: "Pay the scholarship for two students, because someone knocked on that door for him", emoji: "🚪" },
        { label: "Buy a car and move to a nicer city", emoji: "🚗" },
        { label: "Save it until he feels ready", emoji: "🏦" },
      ],
      answer: 0,
      sayIt: "He would pay the scholarship for two students, because someone knocked on that door for him.",
      sayItEs: "Pagaría la beca de dos estudiantes, porque alguien tocó esa puerta por él.",
      sayItCheck: {
        target: "He would pay the scholarship for two students",
        altTargets: ["Pay the scholarship for two students", "The scholarship for two students"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "If you could live anywhere in the world, where would you live? Ten seconds to think, then: answer, why, example, close.",
      questionEs: "Si pudieras vivir en cualquier parte del mundo, ¿dónde vivirías? Diez segundos para pensar, y luego: respuesta, por qué, ejemplo, cierre.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "I'd say a city by the sea. The reason is that I think better near water. For example, my best ideas this year came on a beach. So overall, I'd choose calm over famous.",
      sayItEs: "Diría una ciudad junto al mar. La razón es que pienso mejor cerca del agua. Por ejemplo, mis mejores ideas de este año llegaron en una playa. Así que en general, elegiría calma antes que fama.",
      sayItAskEn: "Start with \"I'd say ...\", then \"The reason is ...\", then \"For example ...\", and close with \"So overall ...\".",
      sayItAskEs: "Empieza con \"I'd say …\", luego \"The reason is …\", luego \"For example …\" y cierra con \"So overall …\".",
      sayItCheck: {
        target: "I'd say *",
        altTargets: ["I would say *", "The reason is *", "So overall *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s2",
    phrase: "I may not know the question, but I know how to build an answer.",
    es: "Puede que no sepa la pregunta, pero sé cómo construir una respuesta.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "When a question surprises me, I take ten seconds and build: answer, why, example, close.",
    es: "Cuando una pregunta me sorprende, tomo diez segundos y construyo: respuesta, por qué, ejemplo, cierre.",
    model: "dani",
    modelActionEs: "Dani usó los diez segundos en las tres preguntas y armó cada respuesta con el mismo orden, incluso cuando la respuesta era 'aquí'.",
  },
  expressions: [
    {
      phrase: "catch someone off guard",
      variants: ["caught him off guard", "caught me off guard", "catch you off guard", "off guard"],
      es: "tomar a alguien por sorpresa",
      kind: "idiom",
      example: "I caught him off guard three times and he built an answer every time.",
      exampleEs: "Lo tomé por sorpresa tres veces y construyó una respuesta cada vez.",
    },
    {
      phrase: "stop by",
      variants: ["stopped by", "stops by", "stopping by"],
      es: "pasar (por un lugar), darse una vuelta",
      kind: "phrasal",
      example: "You stopped by at seven to interview my staff in a parking lot.",
      exampleEs: "Pasaste a las siete a entrevistar a mi personal en un estacionamiento.",
    },
    {
      phrase: "count on",
      variants: ["counts on", "counted on", "counting on"],
      es: "contar con, confiar en",
      kind: "phrasal",
      example: "You can count on people to tell the truth before seven.",
      exampleEs: "Puedes contar con que la gente diga la verdad antes de las siete.",
    },
    {
      phrase: "the honest thing",
      variants: ["say the honest thing", "the honest answer"],
      es: "lo honesto, la respuesta honesta",
      kind: "idiom",
      example: "Can I say the honest thing?",
      exampleEs: "¿Puedo decir lo honesto?",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: answer one unexpected question with no right answer. If you suddenly received ten thousand dollars, what would you do? Answer, why, example, close.",
    es: "Treinta segundos: responde una pregunta inesperada sin respuesta correcta. Si de repente recibieras diez mil dólares, ¿qué harías? Respuesta, por qué, ejemplo, cierre.",
  },
  continueWith: [
    "I'd say ...",
    "The reason is ...",
    "For example, ...",
    "So overall, ...",
  ],
  cliffhanger: {
    en: "Friday: three chairs in one room. Candidate, angry client, salesperson. And the client's complaint is about Lidia.",
    es: "Viernes: tres sillas en una sala. Candidato, cliente enojado, vendedor. Y la queja del cliente es sobre Lidia.",
  },
};
