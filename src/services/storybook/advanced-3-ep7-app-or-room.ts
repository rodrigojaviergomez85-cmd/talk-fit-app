import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep7-app-or-room/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep7-app-or-room/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep7-app-or-room/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep7-app-or-room/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep7-app-or-room/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep7-app-or-room/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep7-app-or-room/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep7-app-or-room/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep7-app-or-room/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep7-app-or-room/s9.jpg";

export const ADVANCED3_EP7_APP_OR_ROOM: StorybookEpisode = {
  id: "advanced3-ep7-app-or-room",
  moduleId: "advanced-3",
  week: 2,
  title: "App or room",
  titleEs: "La app o el salón",
  episodeLabel: {
    en: "Advanced 3 · Episode 7",
    es: "Advanced 3 · Episodio 7",
  },
  previously: [
    {
      en: "Forty-one seconds on accents. Ninety applications by noon.",
      es: "Cuarenta y un segundos sobre acentos. Noventa solicitudes al mediodía.",
    },
    {
      en: "Lidia: 'Ask next time. The sentence about the work you can keep.'",
      es: "Lidia: 'Pregunta la próxima vez. La frase sobre el trabajo te la puedes quedar'.",
    },
    {
      en: "Northline wants Monterrey faster. Reed has an idea.",
      es: "Northline quiere Monterrey más rápido. Reed tiene una idea.",
    },
  ],
  reviewWords: [
    { word: "tutor", es: "tutor" },
    { word: "repetition", es: "repetición" },
    { word: "fear", es: "miedo" },
    { word: "middle", es: "medio" },
    { word: "disadvantage", es: "desventaja" },
  ],
  blurb: {
    en: "Reed proposes replacing half the classes with an AI tutor to open Monterrey in a month. Dani's first answer is 'no', and Camila reminds him he uses the app every morning at the bus stop. So he does it properly: one side, the other side, and his view, which is in the middle: the app for the repetitions, the room for the fear. Vale listens from the door, the way she did in another building.",
    es: "Reed propone reemplazar la mitad de las clases con un tutor de IA para abrir Monterrey en un mes. La primera respuesta de Dani es 'no', y Camila le recuerda que usa la app todas las mañanas en la parada. Entonces lo hace bien: un lado, el otro lado, y su opinión, que está en el medio: la app para las repeticiones, el salón para el miedo. Vale escucha desde la puerta, como lo hizo en otro edificio.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Tuesday, 9:00 a.m.; the glass meeting room; Mr. Reed in person at the head of the table in his navy suit, a tablet showing an AI tutor app; Barrett beside him; Dani and Camila across.",
      text: "Tuesday, 9:00 a.m. Reed in person. He brought an app.",
      es: "Martes, 9:00 a.m. Reed en persona. Trajo una app.",
      speaker: "reed",
      cast: ["reed", "barrett", "dani", "camila"],
      lines: [
        {
          speaker: "reed",
          text: "Monterrey wants to open in a month, not three. An AI tutor can run half the classes tonight: repetition, pronunciation, scoring. Half the trainers, twice the floors. Your view, Mr. Dani, as a number.",
          es: "Monterrey quiere abrir en un mes, no en tres. Un tutor de IA puede dar la mitad de las clases esta noche: repetición, pronunciación, puntaje. La mitad de entrenadores, el doble de pisos. Su opinión, señor Dani, como un número.",
        },
        {
          speaker: "dani",
          text: "No.",
          es: "No.",
        },
        {
          speaker: "camila",
          text: "Dani. You used that app at the bus stop this morning. I saw the notification. Sixty-one days in a row.",
          es: "Dani. Usaste esa app en la parada esta mañana. Vi la notificación. Sesenta y un días seguidos.",
        },
      ],
      words: [
        { word: "pronunciation", es: "pronunciación" },
        { word: "twice", es: "el doble" },
        { word: "notification", es: "notificación" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on Dani, taking five seconds, his own phone face down on the table beside the tablet with the tutor app; Reed's pen waiting.",
      text: "Five seconds. Then he does it the right way. One side first.",
      es: "Cinco segundos. Luego lo hace bien. Un lado primero.",
      speaker: "dani",
      cast: ["dani", "reed"],
      lines: [
        {
          speaker: "dani",
          text: "Sixty-one days. So let me start again. On one hand, the app does the repetitions better than any of us. Two hundred times the same phrase, at three in the morning, with nobody getting tired and nobody judging. It costs almost nothing and it never has a bad day.",
          es: "Sesenta y un días. Entonces empiezo otra vez. Por un lado, la app hace las repeticiones mejor que cualquiera de nosotros. Doscientas veces la misma frase, a las tres de la mañana, sin que nadie se canse ni juzgue. Cuesta casi nada y nunca tiene un mal día.",
        },
        {
          speaker: "reed",
          text: "That's my argument. Continue.",
          es: "Ese es mi argumento. Continúe.",
        },
      ],
      words: [
        { word: "repetitions", es: "repeticiones" },
        { word: "judging", es: "juzgando" },
        { word: "argument", es: "argumento" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Through the glass wall of the meeting room, seen from inside: Vale standing in the corridor doorway with her arms folded, mustard blouse, not coming in; Dani's back to her, talking.",
      text: "The other side. Vale is in the doorway. He doesn't know.",
      es: "El otro lado. Vale está en la puerta. Él no lo sabe.",
      speaker: "dani",
      cast: ["dani", "vale", "reed"],
      lines: [
        {
          speaker: "dani",
          text: "On the other hand, nobody freezes in front of an app. You freeze in front of a person. The app can't see your hands shake, it can't hold your arm, and it can't tell you you're wrong in a voice you'll remember on Thursday. There's also the question of who you're afraid of: agents don't fail with the app. They fail with a person.",
          es: "Por otro lado, nadie se congela frente a una app. Te congelas frente a una persona. La app no puede ver que te tiemblan las manos, no puede sostenerte el brazo, y no puede decirte que estás mal con una voz que vas a recordar el jueves. También está la cuestión de a quién le tienes miedo: los agentes no fallan con la app. Fallan con una persona.",
        },
        {
          speaker: "reed",
          text: "And your view.",
          es: "Y su opinión.",
        },
      ],
      words: [
        { word: "freezes", es: "se congela" },
        { word: "shake", es: "tiemblan" },
        { word: "afraid", es: "miedo" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani writing two words on the meeting room's small whiteboard: REPETITIONS on the left, FEAR on the right, an arrow from each to a different word below: APP and ROOM.",
      text: "His view. In the middle, with a number.",
      es: "Su opinión. En el medio, con un número.",
      speaker: "dani",
      cast: ["dani", "reed", "barrett", "camila"],
      lines: [
        {
          speaker: "dani",
          text: "Personally, I think the best answer is somewhere in the middle. The app for the repetitions, the room for the fear. Not half the classes: the half of every class that's repetition goes to the app, and the half that's a person goes to a person. Same trainers, twice the floors.",
          es: "Personalmente, pienso que la mejor respuesta está en algún punto del medio. La app para las repeticiones, el salón para el miedo. No la mitad de las clases: la mitad de cada clase que es repetición va a la app, y la mitad que es una persona va a una persona. Los mismos entrenadores, el doble de pisos.",
        },
        {
          speaker: "reed",
          text: "The number.",
          es: "El número.",
        },
        {
          speaker: "dani",
          text: "Monterrey in six weeks, not four. The biggest disadvantage of my position is that it's harder to organize. Camila has the budget by Thursday.",
          es: "Monterrey en seis semanas, no cuatro. La mayor desventaja de mi posición es que es más difícil de organizar. Camila tiene el presupuesto el jueves.",
        },
        {
          speaker: "camila",
          text: "Wednesday.",
          es: "El miércoles.",
        },
      ],
      words: [
        { word: "middle", es: "medio" },
        { word: "organize", es: "organizar" },
        { word: "budget", es: "presupuesto" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The training room, 11:00 a.m.; Mía at the tall table with a laptop running the AI tutor, headset on, testing it; Nico beside her with his arms crossed, watching the screen say 'Great job!'",
      text: "11:00 a.m. Mía tests the tutor. Nico supervises the tutor.",
      es: "11:00 a.m. Mía prueba al tutor. Nico supervisa al tutor.",
      speaker: "mia",
      cast: ["mia", "nico"],
      lines: [
        {
          speaker: "mia",
          text: "'I'm sorry this took so long, that's on us.' Again. 'I'm sorry this took so long, that's on us.' It says 'great job' every time. Even when I said 'that's on you'.",
          es: "'Lamento que esto tomara tanto, es culpa nuestra'. Otra vez. 'Lamento que esto tomara tanto, es culpa nuestra'. Dice 'gran trabajo' cada vez. Incluso cuando dije 'es culpa suya'.",
        },
        {
          speaker: "nico",
          text: "It doesn't say jefe. It doesn't hold your arm. It doesn't know it's Thursday.",
          es: "No dice jefe. No te sostiene el brazo. No sabe que es jueves.",
        },
        {
          speaker: "mia",
          text: "It also doesn't get tired at the two hundredth one. I'm on one ninety.",
          es: "Tampoco se cansa en la doscientas. Voy en la ciento noventa.",
        },
        {
          speaker: "nico",
          text: "I say four sentences a day. Not on a robot.",
          es: "Yo digo cuatro frases al día. No con un robot.",
        },
      ],
      words: [
        { word: "tutor", es: "tutor" },
        { word: "tired", es: "cansa" },
        { word: "robot", es: "robot" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila and Dani at the end of the row; Camila's tablet with a budget split into two colored halves labeled APP and ROOM; her coffee beside it, unapproved.",
      text: "2:00 p.m. Camila already split the budget.",
      es: "2:00 p.m. Camila ya partió el presupuesto.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Half the hours to the app, half to people. It costs less than Reed's version, because the app half is almost free and the people half is the same people. Reed didn't expect it to be cheaper.",
          es: "La mitad de las horas a la app, la mitad a personas. Cuesta menos que la versión de Reed, porque la mitad de la app es casi gratis y la mitad de personas son las mismas personas. Reed no esperaba que fuera más barato.",
        },
        {
          speaker: "dani",
          text: "You said Wednesday in the room. It's Tuesday.",
          es: "Dijiste miércoles en la sala. Es martes.",
        },
        {
          speaker: "camila",
          text: "I said Wednesday so you wouldn't say Thursday. Coffee not approved. I need it myself.",
          es: "Dije miércoles para que no dijeras jueves. Café no aprobado. Lo necesito yo.",
        },
      ],
      words: [
        { word: "split", es: "partió" },
        { word: "cheaper", es: "más barato" },
        { word: "approved", es: "aprobado" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Ms. Barrett's office; Reed standing by the window with his tablet, Barrett behind her desk; Dani not present; the plant on the desk.",
      text: "4:00 p.m. Reed and Barrett, without him.",
      es: "4:00 p.m. Reed y Barrett, sin él.",
      speaker: "reed",
      cast: ["reed", "barrett"],
      lines: [
        {
          speaker: "reed",
          text: "He said no to my face and then agreed with half of me. Which one is real?",
          es: "Me dijo que no en la cara y después estuvo de acuerdo con la mitad de mí. ¿Cuál es real?",
        },
        {
          speaker: "barrett",
          text: "The second one. The first one was a reflex. He has one per meeting; he fixes it in five seconds. I've counted.",
          es: "La segunda. La primera fue un reflejo. Tiene uno por reunión; lo arregla en cinco segundos. Los he contado.",
        },
        {
          speaker: "reed",
          text: "The board meets Friday about the global role. A man who says no by reflex to a director is not going to be easy to defend.",
          es: "La junta se reúne el viernes por el puesto global. Un hombre que le dice que no por reflejo a un director no va a ser fácil de defender.",
        },
        {
          speaker: "barrett",
          text: "Then don't defend him. Let him respond.",
          es: "Entonces no lo defienda. Déjelo responder.",
        },
      ],
      words: [
        { word: "reflex", es: "reflejo" },
        { word: "board", es: "junta" },
        { word: "defend", es: "defender" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "The corridor outside the meeting room, empty now; Vale and Dani standing where she stood in the morning; Vale with her arms still folded, softer.",
      text: "6:00 p.m. The doorway, again.",
      es: "6:00 p.m. La puerta, otra vez.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        {
          speaker: "vale",
          text: "I stood here for all of it. You defended my classroom to a lawyer.",
          es: "Estuve parada aquí todo el tiempo. Defendiste mi salón frente a un abogado.",
        },
        {
          speaker: "dani",
          text: "I defended the fear. The classroom is where the fear is. The app can have everything else.",
          es: "Defendí el miedo. El salón es donde está el miedo. La app se puede quedar con todo lo demás.",
        },
        {
          speaker: "vale",
          text: "Nine years ago I stood in a doorway like this one while you froze in front of a man with a badge. You said one sentence. It was wrong. It was the best one I'd heard all year.",
          es: "Hace nueve años estuve parada en una puerta como esta mientras te congelabas frente a un hombre con gafete. Dijiste una frase. Estaba mal. Fue la mejor frase que había oído en todo el año.",
        },
        {
          speaker: "dani",
          text: "You never told me that.",
          es: "Nunca me lo dijiste.",
        },
        {
          speaker: "vale",
          text: "I'm telling you now. That's the part of the room the app can't do either.",
          es: "Te lo digo ahora. Esa es la parte del salón que la app tampoco puede hacer.",
        },
      ],
      words: [
        { word: "classroom", es: "salón" },
        { word: "froze", es: "te congelabas" },
        { word: "badge", es: "gafete" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Nico and Dani on the bench; Nico with his phone showing a streaming app with 40,000 followers, not gaming, just looking at the number.",
      text: "9:30 p.m. Nico has a number too. He hasn't said it.",
      es: "9:30 p.m. Nico también tiene un número. No lo ha dicho.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "Forty thousand people follow me since the clip. They don't know I take calls.",
          es: "Cuarenta mil personas me siguen desde el clip. No saben que tomo llamadas.",
        },
        {
          speaker: "dani",
          text: "Do you play games?",
          es: "¿Juegas videojuegos?",
        },
        {
          speaker: "nico",
          text: "Every night. Two to ten I'm here. Ten to two I'm somewhere I don't say jefe. Tomorrow I want to tell you something, and I want you to not say no by reflex.",
          es: "Todas las noches. De dos a diez estoy aquí. De diez a dos estoy en un lugar donde no digo jefe. Mañana quiero decirte algo y quiero que no digas que no por reflejo.",
        },
      ],
      words: [
        { word: "follow", es: "siguen" },
        { word: "games", es: "videojuegos" },
        { word: "somewhere", es: "en algún lugar" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What is Dani's view on the AI tutor?",
      questionEs: "¿Cuál es la opinión de Dani sobre el tutor de IA?",
      options: [
        { label: "In the middle: the app for the repetitions, the room for the fear", emoji: "⚖️" },
        { label: "No: people should do all the classes", emoji: "🙅" },
        { label: "Yes: the app should replace half the trainers", emoji: "🤖" },
      ],
      answer: 0,
      sayIt: "In the middle: the app for the repetitions, the room for the fear.",
      sayItEs: "En el medio: la app para las repeticiones, el salón para el miedo.",
      sayItCheck: {
        target: "* the app for the repetitions *",
        altTargets: ["* the room for the fear", "Somewhere in the middle *", "In the middle *"],
      },
    },
    {
      id: "q2",
      afterScene: "s3",
      questionEn: "Something at work has two real sides. Say one side, then the other, then where you stand and its biggest disadvantage.",
      questionEs: "Algo en el trabajo tiene dos lados reales. Di un lado, luego el otro, luego dónde te paras y su mayor desventaja.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "On one hand, working completely from home saves time and money. On the other hand, new employees learn much slower alone. Personally, I think the best answer is somewhere in the middle. The biggest disadvantage of my position is that it's harder to organize.",
      sayItEs: "Por un lado, trabajar completamente desde casa ahorra tiempo y dinero. Por otro lado, los empleados nuevos aprenden mucho más lento solos. Personalmente, pienso que la mejor respuesta está en algún punto del medio. La mayor desventaja de mi posición es que es más difícil de organizar.",
      sayItAskEn: "Start with \"On one hand, ...\", then \"On the other hand, ...\", then \"Personally, I think ...\", and close with \"The biggest disadvantage of my position is ...\".",
      sayItAskEs: "Empieza con \"On one hand, …\", luego \"On the other hand, …\", después \"Personally, I think …\" y cierra con \"The biggest disadvantage of my position is …\".",
      sayItCheck: {
        target: "On one hand, *",
        altTargets: ["On the other hand, *", "Personally, I think *", "The biggest disadvantage *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s2",
    phrase: "When my first answer is 'no', I take five seconds and say the side I just skipped.",
    es: "Cuando mi primera respuesta es 'no', tomo cinco segundos y digo el lado que acabo de saltarme.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "Before I give my view, I say the other side well enough that its owner nods.",
    es: "Antes de dar mi opinión, digo el otro lado tan bien que su dueño asiente.",
    model: "dani",
    modelActionEs: "Dani dijo el lado de Reed tan completo que Reed respondió 'ese es mi argumento', y solo después dio el suyo.",
  },
  expressions: [
    {
      phrase: "start again",
      variants: ["start over", "started again", "let me start again"],
      es: "empezar de nuevo",
      kind: "phrasal",
      example: "Sixty-one days. So let me start again.",
      exampleEs: "Sesenta y un días. Entonces empiezo otra vez.",
    },
    {
      phrase: "hold your arm",
      variants: ["hold my arm", "held his arm", "holds your arm"],
      es: "sostenerte el brazo (frenarte a tiempo)",
      kind: "phrasal",
      example: "It doesn't say jefe. It doesn't hold your arm. It doesn't know it's Thursday.",
      exampleEs: "No dice jefe. No te sostiene el brazo. No sabe que es jueves.",
    },
    {
      phrase: "somewhere in the middle",
      variants: ["in the middle", "the middle ground"],
      es: "en algún punto del medio, un punto intermedio",
      kind: "idiom",
      example: "Personally, I think the best answer is somewhere in the middle. The app for the repetitions, the room for the fear.",
      exampleEs: "Personalmente, pienso que la mejor respuesta está en algún punto del medio. La app para las repeticiones, el salón para el miedo.",
    },
    {
      phrase: "by reflex",
      variants: ["a reflex", "out of reflex"],
      es: "por reflejo, sin pensar",
      kind: "idiom",
      example: "Tomorrow I want to tell you something and I want you to not say no by reflex.",
      exampleEs: "Mañana quiero decirte algo y quiero que no digas que no por reflejo.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: a decision at work with two real sides. Say the side you like less first, well, then the other, then your view in the middle and what it costs.",
    es: "Treinta segundos: una decisión en el trabajo con dos lados reales. Di primero el lado que menos te gusta, bien, luego el otro, luego tu opinión en el medio y qué cuesta.",
  },
  continueWith: [
    "On one hand, ...",
    "On the other hand, ... There's also the question of ...",
    "Personally, I think the best answer is somewhere in the middle: ...",
    "The biggest disadvantage of my position is ...",
  ],
  cliffhanger: {
    en: "Tomorrow Nico says the thing: he wants to leave Northline to stream games for forty thousand strangers. Dani has to give advice without saying no by reflex, and without saying what a boss says.",
    es: "Mañana Nico dice la cosa: quiere dejar Northline para transmitir videojuegos a cuarenta mil desconocidos. Dani tiene que aconsejar sin decir que no por reflejo, y sin decir lo que dice un jefe.",
  },
};
