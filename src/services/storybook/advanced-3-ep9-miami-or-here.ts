import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced3-ep9-miami-or-here/cover.jpg";
import s1 from "@/assets/storybook/advanced3-ep9-miami-or-here/s1.jpg";
import s2 from "@/assets/storybook/advanced3-ep9-miami-or-here/s2.jpg";
import s3 from "@/assets/storybook/advanced3-ep9-miami-or-here/s3.jpg";
import s4 from "@/assets/storybook/advanced3-ep9-miami-or-here/s4.jpg";
import s5 from "@/assets/storybook/advanced3-ep9-miami-or-here/s5.jpg";
import s6 from "@/assets/storybook/advanced3-ep9-miami-or-here/s6.jpg";
import s7 from "@/assets/storybook/advanced3-ep9-miami-or-here/s7.jpg";
import s8 from "@/assets/storybook/advanced3-ep9-miami-or-here/s8.jpg";
import s9 from "@/assets/storybook/advanced3-ep9-miami-or-here/s9.jpg";

export const ADVANCED3_EP9_MIAMI_OR_HERE: StorybookEpisode = {
  id: "advanced3-ep9-miami-or-here",
  moduleId: "advanced-3",
  week: 2,
  title: "Miami or here",
  titleEs: "Miami o aquí",
  episodeLabel: {
    en: "Advanced 3 · Episode 9",
    es: "Advanced 3 · Episodio 9",
  },
  previously: [
    {
      en: "Nico signed: three nights a week, the shift kept, decide in March.",
      es: "Nico firmó: tres noches por semana, el turno se mantiene, decidir en marzo.",
    },
    {
      en: "The board meets Friday. The offer expires the same day.",
      es: "La junta se reúne el viernes. La oferta vence el mismo día.",
    },
    {
      en: "Julieta: 'Two columns. I do the rows. You do the honesty.'",
      es: "Julieta: 'Dos columnas. Yo hago las filas. Tú pones la honestidad'.",
    },
  ],
  reviewWords: [
    { word: "advantage", es: "ventaja" },
    { word: "downside", es: "desventaja" },
    { word: "trade-off", es: "intercambio, lo que se cede" },
    { word: "reach", es: "alcance" },
    { word: "contact", es: "contacto" },
  ],
  blurb: {
    en: "Seven a.m., Bogotá time. Julieta puts two columns on the screen, Miami and here, and makes Dani fill the rows out loud: what each gives, what each costs. He puts money in the first row and she stops him: he taught Mía to put the need first. Then she asks the question Barrett didn't. He doesn't answer.",
    es: "Siete a.m., hora de Bogotá. Julieta pone dos columnas en la pantalla, Miami y aquí, y hace que Dani llene las filas en voz alta: qué da cada una, qué cuesta cada una. Él pone el dinero en la primera fila y ella lo detiene: le enseñó a Mía a poner la necesidad primero. Después hace la pregunta que Barrett no hizo. Él no contesta.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Thursday, 6:00 a.m. San Salvador; the floor before opening; Dani at his desk with the laptop; on the screen, Julieta sharing a blank document with two columns: MIAMI and HERE.",
      text: "Thursday, 6:00 a.m. Seven in Bogotá. Two empty columns.",
      es: "Jueves, 6:00 a.m. Las siete en Bogotá. Dos columnas vacías.",
      speaker: "julieta",
      cast: ["julieta", "dani"],
      lines: [
        {
          speaker: "julieta",
          text: "Let's compare Miami and here. Row one: what each one gives you. Fill it in out loud, in order, and I type. If you skip a row, I stop typing.",
          es: "Comparemos Miami y aquí. Fila uno: qué te da cada una. Llénala en voz alta, en orden, y yo escribo. Si te saltas una fila, dejo de escribir.",
        },
        {
          speaker: "dani",
          text: "The advantage of Miami is the salary. Almost double. Then three floors, a title, and—",
          es: "La ventaja de Miami es el salario. Casi el doble. Luego tres pisos, un cargo, y...",
        },
        {
          speaker: "julieta",
          text: "Stop. You put money in row one.",
          es: "Para. Pusiste el dinero en la fila uno.",
        },
      ],
      words: [
        { word: "compare", es: "comparar" },
        { word: "salary", es: "salario" },
        { word: "row", es: "fila" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Close on the shared document: under MIAMI, the word SALARY typed and then struck through; Julieta's cursor blinking on an empty line above it.",
      text: "She strikes it through. She doesn't delete it.",
      es: "Lo tacha. No lo borra.",
      speaker: "julieta",
      cast: ["julieta", "dani"],
      lines: [
        {
          speaker: "julieta",
          text: "In week one you taught Mía to write what the customer said and, under it, what they need. You just did the opposite with yourself. Money is what the offer says. Row one is what you need. Start again.",
          es: "En la semana uno le enseñaste a Mía a escribir lo que el cliente dijo y, debajo, lo que necesita. Acabas de hacer lo contrario contigo mismo. El dinero es lo que dice la oferta. La fila uno es lo que necesitas. Empieza otra vez.",
        },
        {
          speaker: "dani",
          text: "...That was wrong. Once. The advantage of Miami is reach: three floors, three countries, twenty Mías in six months instead of one. The advantage of here is contact: one floor, Thursdays at ten, the club, the bus, and somebody who says jefe when I'm wrong.",
          es: "...Eso estuvo mal. Una vez. La ventaja de Miami es el alcance: tres pisos, tres países, veinte Mías en seis meses en vez de una. La ventaja de aquí es el contacto: un piso, los jueves a las diez, el club, el bus, y alguien que dice jefe cuando me equivoco.",
        },
      ],
      words: [
        { word: "opposite", es: "lo contrario" },
        { word: "reach", es: "alcance" },
        { word: "contact", es: "contacto" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "The document filling up: two columns with four rows each; Julieta typing fast; Dani's reflection in the laptop screen, eyes closed while he says the next row.",
      text: "Row two: what each one costs.",
      es: "Fila dos: qué cuesta cada una.",
      speaker: "dani",
      cast: ["dani", "julieta"],
      lines: [
        {
          speaker: "dani",
          text: "The downside of Miami is that it costs the calls. Six months of hotels, no headset, no Thursday. I'd be teaching people to do a thing I stopped doing. The downside of here is that it stays one floor. Barrett's offer expires tomorrow, and there won't be a second one.",
          es: "La desventaja de Miami es que cuesta las llamadas. Seis meses de hoteles, sin diadema, sin jueves. Estaría enseñando a la gente a hacer algo que dejé de hacer. La desventaja de aquí es que se queda en un piso. La oferta de Barrett vence mañana, y no va a haber una segunda.",
        },
        {
          speaker: "julieta",
          text: "Row three. The trade-off. One sentence.",
          es: "Fila tres. Lo que se cede. Una frase.",
        },
        {
          speaker: "dani",
          text: "So the real trade-off is reach now versus contact every day. Twenty floors I visit, or one floor I'm on.",
          es: "Entonces lo que realmente se cede es alcance ahora contra contacto todos los días. Veinte pisos que visito, o un piso en el que estoy.",
        },
      ],
      words: [
        { word: "costs", es: "cuesta" },
        { word: "expires", es: "vence" },
        { word: "versus", es: "contra" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Julieta on the screen, hands off the keyboard for the first time, leaning toward the camera; the document behind her with row four empty: CHOICE.",
      text: "Row four is empty. She asks the question Barrett didn't.",
      es: "La fila cuatro está vacía. Hace la pregunta que Barrett no hizo.",
      speaker: "julieta",
      cast: ["julieta", "dani"],
      lines: [
        {
          speaker: "julieta",
          text: "Which one lets you keep taking calls?",
          es: "¿Cuál te deja seguir tomando llamadas?",
        },
        {
          speaker: "julieta",
          text: "Nothing? That's five seconds turning into thirty. I'll leave row four empty. It's yours, not mine. The board is tomorrow.",
          es: "¿Nada? Son cinco segundos convirtiéndose en treinta. Dejo la fila cuatro vacía. Es tuya, no mía. La junta es mañana.",
        },
      ],
      words: [
        { word: "empty", es: "vacía" },
        { word: "calls", es: "llamadas" },
        { word: "tomorrow", es: "mañana" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "The floor at 8:00; Mía at her desk with her headset on but not on a call, looking at Dani's laptop still open with the two columns; Dani getting coffee two rows away.",
      text: "8:00 a.m. He left the laptop open. Mía reads the columns.",
      es: "8:00 a.m. Dejó la laptop abierta. Mía lee las columnas.",
      speaker: "mia",
      cast: ["mia", "dani"],
      lines: [
        {
          speaker: "mia",
          text: "'Somebody who says jefe when I'm wrong.' That's me. I'm a row in your comparison.",
          es: "'Alguien que dice jefe cuando me equivoco'. Esa soy yo. Soy una fila en tu comparación.",
        },
        {
          speaker: "dani",
          text: "You're half a row. The other half is Nico.",
          es: "Eres media fila. La otra mitad es Nico.",
        },
        {
          speaker: "mia",
          text: "Row four is empty, jefe.",
          es: "La fila cuatro está vacía, jefe.",
        },
        {
          speaker: "dani",
          text: "I know what day it is.",
          es: "Sé qué día es.",
        },
      ],
      words: [
        { word: "comparison", es: "comparación" },
        { word: "half", es: "mitad" },
        { word: "row", es: "fila" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila and Dani at the end of the row; Camila holding two folders, one labeled MIAMI and one labeled MONTERREY, weighing them in her hands like fruit.",
      text: "10:00 a.m. Camila has two folders and no opinion.",
      es: "10:00 a.m. Camila tiene dos carpetas y ninguna opinión.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        {
          speaker: "camila",
          text: "Miami: approved, if the board says yes tomorrow. Monterrey from here, six weeks, the app half and the room half: also approved, and it doesn't need you on a plane. I'm not going to tell you which one. I approve coffees.",
          es: "Miami: aprobado, si la junta dice que sí mañana. Monterrey desde aquí, seis semanas, la mitad app y la mitad salón: también aprobado, y no te necesita en un avión. No te voy a decir cuál. Yo apruebo cafés.",
        },
        {
          speaker: "dani",
          text: "Which one would you approve if I weren't in the room?",
          es: "¿Cuál aprobarías si yo no estuviera en la sala?",
        },
        {
          speaker: "camila",
          text: "The one where the number keeps going down. Escalations went down twenty-two percent because you were in a chair, not because you were in a plane.",
          es: "En la que el número sigue bajando. Las escalaciones bajaron veintidós por ciento porque estabas en una silla, no porque estuvieras en un avión.",
        },
      ],
      words: [
        { word: "folders", es: "carpetas" },
        { word: "plane", es: "avión" },
        { word: "chair", es: "silla" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Ms. Barrett at the end of the row with the Miami offer letter, one corner now folded; Dani standing; the wall clock at 10:40.",
      text: "10:40 a.m. Barrett has the letter with her. One corner is folded now.",
      es: "10:40 a.m. Barrett tiene la carta con ella. Ahora tiene una esquina doblada.",
      speaker: "barrett",
      cast: ["barrett", "dani"],
      lines: [
        {
          speaker: "barrett",
          text: "Tomorrow the board is going to ask me if you're a director. I'd like to know what to say before they ask.",
          es: "Mañana la junta me va a preguntar si usted es un director. Me gustaría saber qué decir antes de que pregunten.",
        },
        {
          speaker: "dani",
          text: "For me, the better choice would be the one that lets me keep taking calls. I don't know yet which one that is. I know it's not the salary.",
          es: "Para mí, la mejor elección sería la que me deja seguir tomando llamadas. Todavía no sé cuál es. Sé que no es el salario.",
        },
        {
          speaker: "barrett",
          text: "That's more than you had on Wednesday. It's less than I need at nine tomorrow. Bring the columns.",
          es: "Es más de lo que tenía el miércoles. Es menos de lo que necesito mañana a las nueve. Traiga las columnas.",
        },
      ],
      words: [
        { word: "director", es: "director" },
        { word: "choice", es: "elección" },
        { word: "columns", es: "columnas" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "The training room, 6:00 p.m.; Nico alone at the tall table with the laptop still showing Julieta's two columns; Dani in the doorway with his backpack.",
      text: "6:00 p.m. Nico found the columns.",
      es: "6:00 p.m. Nico encontró las columnas.",
      speaker: "nico",
      cast: ["nico", "dani"],
      lines: [
        {
          speaker: "nico",
          text: "'Which one lets you keep taking calls.' She wrote the question in the document. She left the answer blank.",
          es: "'Cuál te deja seguir tomando llamadas'. Escribió la pregunta en el documento. Dejó la respuesta en blanco.",
        },
        {
          speaker: "dani",
          text: "She left it for me.",
          es: "La dejó para mí.",
        },
        {
          speaker: "nico",
          text: "You gave me six months and a date. Give yourself one.",
          es: "Me diste seis meses y una fecha. Date una a ti.",
        },
        {
          speaker: "dani",
          text: "Friday. Tomorrow. That's the date whether I like it or not.",
          es: "Viernes. Mañana. Esa es la fecha, me guste o no.",
        },
      ],
      words: [
        { word: "blank", es: "en blanco" },
        { word: "date", es: "fecha" },
        { word: "whether", es: "si" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Night; the bus stop; Dani alone on the bench with the laptop closed on his knees; the Northline sign lit behind him; a bus arriving with the number 42 lit on the front.",
      text: "9:30 p.m. Bus 42. The one he learned on.",
      es: "9:30 p.m. El bus 42. En el que aprendió.",
      speaker: "dani",
      cast: ["dani"],
      lines: [
        {
          speaker: "dani",
          text: "Row four. Which one lets me keep taking calls. It's harder, but you don't have to choose only one. That's what I told Nico. That's what I told Mía about the degree. I've never once said it to myself.",
          es: "Fila cuatro. Cuál me deja seguir tomando llamadas. Es más difícil, pero no tienes que elegir solo una. Eso le dije a Nico. Eso le dije a Mía sobre el título. Nunca me lo he dicho a mí mismo.",
        },
      ],
      words: [
        { word: "harder", es: "más difícil" },
        { word: "choose", es: "elegir" },
        { word: "myself", es: "a mí mismo" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What is the real trade-off between Miami and here, in Dani's words?",
      questionEs: "¿Cuál es lo que realmente se cede entre Miami y aquí, en palabras de Dani?",
      options: [
        { label: "Reach now versus contact every day: twenty floors he visits, or one floor he's on", emoji: "⚖️" },
        { label: "Money now versus money later", emoji: "💵" },
        { label: "A title versus a headset", emoji: "🎧" },
      ],
      answer: 0,
      sayIt: "Reach now versus contact every day: twenty floors he visits, or one floor he's on.",
      sayItEs: "Alcance ahora contra contacto todos los días: veinte pisos que visita, o un piso en el que está.",
      sayItCheck: {
        target: "* reach * contact *",
        altTargets: ["Reach now versus contact *", "Twenty floors * one floor *", "The trade-off is *"],
      },
    },
    {
      id: "q2",
      afterScene: "s3",
      questionEn: "Compare two real options in your life: what each gives, what each costs, the trade-off in one sentence, and your choice.",
      questionEs: "Compara dos opciones reales de tu vida: qué da cada una, qué cuesta cada una, lo que se cede en una frase, y tu elección.",
      options: [
        { label: "I am ready to answer", emoji: "🎧" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "The advantage of university is that you get theory and a network. The downside is that it costs time and money before you earn anything. So the real trade-off is speed now versus options later. For me, the better choice would be working first and studying while I work.",
      sayItEs: "La ventaja de la universidad es que obtienes teoría y una red. La desventaja es que cuesta tiempo y dinero antes de ganar algo. Entonces lo que realmente se cede es velocidad ahora contra opciones después. Para mí, la mejor elección sería trabajar primero y estudiar mientras trabajo.",
      sayItAskEn: "Start with \"The advantage of ... is ...\", then \"The downside is ...\", then \"So the real trade-off is ...\", and close with \"For me, the better choice would be ...\".",
      sayItAskEs: "Empieza con \"The advantage of … is …\", luego \"The downside is …\", después \"So the real trade-off is …\" y cierra con \"For me, the better choice would be …\".",
      sayItCheck: {
        target: "The advantage of *",
        altTargets: ["The downside is *", "For me, the better choice *", "The real trade-off is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s2",
    phrase: "Row one is what I need, not what the offer says. Money goes lower down.",
    es: "La fila uno es lo que necesito, no lo que dice la oferta. El dinero va más abajo.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "When I compare two options, I say what each one costs before I say which one I want.",
    es: "Cuando comparo dos opciones, digo qué cuesta cada una antes de decir cuál quiero.",
    model: "julieta",
    modelActionEs: "Julieta hizo que Dani llenara las filas en orden, tachó el dinero de la fila uno, y dejó la fila cuatro vacía porque era de él.",
  },
  expressions: [
    {
      phrase: "fill in",
      variants: ["fill it in", "filled in", "filling in"],
      es: "llenar, completar",
      kind: "phrasal",
      example: "Row one: what each one gives you. Fill it in out loud, in order, and I type.",
      exampleEs: "Fila uno: qué te da cada una. Llénala en voz alta, en orden, y yo escribo.",
    },
    {
      phrase: "go down",
      variants: ["going down", "went down", "goes down"],
      es: "bajar (una cifra)",
      kind: "phrasal",
      example: "The one where the number keeps going down. Escalations went down twenty-two percent because you were in a chair, not because you were in a plane.",
      exampleEs: "En la que el número sigue bajando. Las escalaciones bajaron veintidós por ciento porque estabas en una silla, no porque estuvieras en un avión.",
    },
    {
      phrase: "trade-off",
      variants: ["the real trade-off", "a trade-off"],
      es: "lo que se cede a cambio, el intercambio",
      kind: "idiom",
      example: "So the real trade-off is reach now versus contact every day. Twenty floors I visit, or one floor I'm on.",
      exampleEs: "Entonces lo que realmente se cede es alcance ahora contra contacto todos los días. Veinte pisos que visito, o un piso en el que estoy.",
    },
    {
      phrase: "whether I like it or not",
      variants: ["whether you like it or not", "like it or not"],
      es: "me guste o no",
      kind: "idiom",
      example: "Friday. Tomorrow. That's the date whether I like it or not.",
      exampleEs: "Viernes. Mañana. Esa es la fecha, me guste o no.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: two options you're actually choosing between. What each gives, what each costs, the trade-off in one sentence, and the choice, or the honest 'not yet'.",
    es: "Treinta segundos: dos opciones entre las que de verdad estás eligiendo. Qué da cada una, qué cuesta cada una, lo que se cede en una frase, y la elección, o el 'todavía no' honesto.",
  },
  continueWith: [
    "The advantage of ... is ... The advantage of ... is ...",
    "The downside of ... is ... But the risk is ...",
    "So the real trade-off is ... versus ...",
    "For me, the better choice would be ... It's harder, but ...",
  ],
  cliffhanger: {
    en: "Tomorrow at nine the board votes, with Dani in the room, and one director already has his sentence ready: 'You're a meme, not a director.'",
    es: "Mañana a las nueve vota la junta, con Dani en la sala, y un director ya tiene su frase lista: 'Eres un meme, no un director'.",
  },
};
