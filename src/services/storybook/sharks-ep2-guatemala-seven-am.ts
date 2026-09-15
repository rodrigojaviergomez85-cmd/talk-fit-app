import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep2-guatemala-seven-am/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep2-guatemala-seven-am/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep2-guatemala-seven-am/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep2-guatemala-seven-am/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep2-guatemala-seven-am/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep2-guatemala-seven-am/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep2-guatemala-seven-am/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep2-guatemala-seven-am/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep2-guatemala-seven-am/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep2-guatemala-seven-am/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep2-guatemala-seven-am/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep2-guatemala-seven-am/s11.jpg";

/**
 * Season 8 (Sharks) Episode 2 — "Guatemala, seven a.m.".
 * Matches Sharks Day 2 (modals: might · could · would — consider more than one
 * outcome). B2 layer: phrasal verbs "show up" / "back out" and the idiom
 * "the bottom line".
 */
export const SHARKS_EP2_GUATEMALA_SEVEN_AM: StorybookEpisode = {
  id: "sharks-ep2-guatemala-seven-am",
  moduleId: "sharks",
  week: 1,
  title: "Guatemala, seven a.m.",
  titleEs: "Guatemala, siete de la mañana",
  episodeLabel: { en: "Season 8 · Episode 2", es: "Temporada 8 · Episodio 2" },
  previously: [
    { en: "Mr. Reed called from Houston and attacked Vale's price.", es: "El señor Reed llamó desde Houston y atacó el precio de Vale." },
    { en: "Vale answered with results instead of a discount.", es: "Vale respondió con resultados en lugar de un descuento." },
    { en: "He asked for a second meeting — in Guatemala, Friday, seven in the morning.", es: "Él pidió una segunda reunión — en Guatemala, el viernes, a las siete de la mañana." },
  ],
  reviewWords: [
    { word: "proposal", es: "propuesta" },
    { word: "deadline", es: "fecha límite" },
    { word: "quality", es: "calidad" },
  ],
  blurb: {
    en: "A five-hour bus, a hotel lobby at dawn and a meeting that might not happen. Vale and Dani list everything that could go wrong — and go anyway.",
    es: "Un bus de cinco horas, un lobby de hotel al amanecer y una reunión que podría no pasar. Vale y Dani enumeran todo lo que podría salir mal — y van igual.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale y Dani en la terminal de buses de San Salvador de madrugada, con maletas y café.",
      text: "Thursday, four in the morning. Two suitcases, two coffees and one meeting in another country.",
      es: "Jueves, cuatro de la mañana. Dos maletas, dos cafés y una reunión en otro país.",
      speaker: "narrator",
      cast: ["vale", "dani"],
      lines: [
        { speaker: "dani", text: "If we take this bus, we might arrive in Guatemala City around three in the afternoon.", es: "«Si tomamos este bus, podríamos llegar a Ciudad de Guatemala como a las tres de la tarde»." },
        { speaker: "vale", text: "Might is not good enough for me. I want to be there a full day before he lands.", es: "«Podríamos no me alcanza. Quiero estar allá un día completo antes de que él aterrice»." },
        { speaker: "dani", text: "You do know that he could still cancel, right? Executives back out all the time.", es: "«Sabes que él todavía podría cancelar, ¿verdad? Los ejecutivos se echan para atrás todo el tiempo»." },
      ],
      words: [
        { word: "suitcases", es: "maletas" },
        { word: "arrive", es: "llegar" },
        { word: "cancel", es: "cancelar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Dentro del bus: Vale con la laptop en las rodillas y Dani revisando su teléfono.",
      text: "Five hours on the road, and the whole time they talked about what could happen.",
      es: "Cinco horas de camino, y todo el tiempo hablaron de lo que podría pasar.",
      speaker: "narrator",
      cast: ["vale", "dani"],
      lines: [
        { speaker: "vale", text: "He could ask for the price again. He could bring a lawyer. He could bring nobody at all.", es: "«Podría preguntar por el precio otra vez. Podría traer un abogado. Podría no traer a nadie»." },
        { speaker: "dani", text: "He might also show up with his own numbers and tell you that ours are wrong.", es: "«También podría aparecer con sus propios números y decirte que los nuestros están mal»." },
        { speaker: "vale", text: "Then I would open the spreadsheet and walk him through every single line. I know my numbers.", es: "«Entonces abriría la hoja de cálculo y le explicaría línea por línea. Yo conozco mis números»." },
      ],
      words: [
        { word: "lawyer", es: "abogado" },
        { word: "spreadsheet", es: "hoja de cálculo" },
        { word: "line", es: "línea" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Videollamada desde el bus: Camila aparece en la pantalla del teléfono con su libreta.",
      text: "Camila called from San Salvador with the number that mattered most.",
      es: "Camila llamó desde San Salvador con el número que más importaba.",
      speaker: "narrator",
      cast: ["vale", "dani", "camila"],
      lines: [
        { speaker: "camila", text: "The bottom line is simple: under eleven dollars per student per hour, we lose money.", es: "«Lo esencial es simple: bajo once dólares por estudiante por hora, perdemos dinero»." },
        { speaker: "vale", text: "Then eleven is my floor. Below that I would rather lose the contract than lose the school.", es: "«Entonces once es mi piso. Debajo de eso preferiría perder el contrato que perder la escuela»." },
        { speaker: "camila", text: "Write it on your hand if you have to. Sharks smell a number that moves too easily.", es: "«Escríbelo en tu mano si es necesario. Los tiburones huelen un número que se mueve muy fácil»." },
      ],
      words: [
        { word: "dollars", es: "dólares" },
        { word: "floor", es: "piso / mínimo" },
        { word: "contract", es: "contrato" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale y Dani llegan al hotel en Ciudad de Guatemala al atardecer.",
      text: "They arrived at six, and the city looked bigger than she remembered.",
      es: "Llegaron a las seis, y la ciudad se veía más grande de lo que ella recordaba.",
      speaker: "narrator",
      cast: ["vale", "dani"],
      lines: [
        { speaker: "dani", text: "Two years ago we could not pay this bus ticket. Now we are staying in a hotel downtown.", es: "«Hace dos años no podíamos pagar este boleto de bus. Ahora nos quedamos en un hotel en el centro»." },
        { speaker: "vale", text: "And tomorrow I might sign the biggest contract of my life. Or I might go home with nothing.", es: "«Y mañana podría firmar el contrato más grande de mi vida. O podría irme a casa sin nada»." },
        { speaker: "dani", text: "Either way, you showed up. Most people in our city never even get on the bus.", es: "«De cualquier forma, te presentaste. La mayoría de la gente en nuestra ciudad ni siquiera se sube al bus»." },
      ],
      words: [
        { word: "ticket", es: "boleto" },
        { word: "downtown", es: "centro de la ciudad" },
        { word: "sign", es: "firmar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale de noche en el cuarto del hotel, ensayando frente al espejo.",
      text: "At eleven at night she was still practicing, out loud, in front of a mirror.",
      es: "A las once de la noche seguía practicando, en voz alta, frente a un espejo.",
      speaker: "vale",
      cast: ["vale"],
      lines: [
        { speaker: "vale", text: "Good morning, Mr. Reed. Thank you for flying down. Let me show you what your teams would get.", es: "«Buenos días, señor Reed. Gracias por volar hasta acá. Déjeme mostrarle lo que sus equipos recibirían»." },
        { speaker: "vale", text: "If he says the price is high, I will not apologize. I will explain what the price protects.", es: "«Si él dice que el precio es alto, no me voy a disculpar. Voy a explicar qué protege ese precio»." },
        { speaker: "vale", text: "I am nervous. That is fine. Nervous people who practice still win meetings.", es: "«Estoy nerviosa. Está bien. La gente nerviosa que practica igual gana reuniones»." },
      ],
      words: [
        { word: "mirror", es: "espejo" },
        { word: "apologize", es: "disculparse" },
        { word: "practice", es: "practicar" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Lobby del hotel a las 6:40 de la mañana: Vale y Dani esperando con carpetas.",
      text: "Friday, six forty in the morning. The lobby was empty and the clock was loud.",
      es: "Viernes, seis cuarenta de la mañana. El lobby estaba vacío y el reloj sonaba fuerte.",
      speaker: "narrator",
      cast: ["vale", "dani"],
      lines: [
        { speaker: "dani", text: "Seven o'clock is in twenty minutes and nobody is here. He could be late, you know.", es: "«Las siete son en veinte minutos y no hay nadie. Podría llegar tarde, ¿sabes?»" },
        { speaker: "vale", text: "He hates late people, so he will not be one. If he does not come, I will still be ready.", es: "«Él odia a la gente impuntual, así que no será uno. Si no viene, igual estaré lista»." },
        { speaker: "dani", text: "Twenty minutes. Drink water, breathe, and stop reading the proposal you already memorized.", es: "«Veinte minutos. Toma agua, respira, y deja de leer la propuesta que ya te memorizaste»." },
      ],
      words: [
        { word: "lobby", es: "recepción / lobby" },
        { word: "late", es: "tarde" },
        { word: "breathe", es: "respirar" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Mr. Reed entra al lobby con su maletín; Vale se pone de pie para saludarlo.",
      text: "At six fifty-eight the door opened, and the shark walked in with one small suitcase.",
      es: "A las seis cincuenta y ocho la puerta se abrió, y el tiburón entró con una maleta pequeña.",
      speaker: "narrator",
      cast: ["vale", "dani", "reed"],
      lines: [
        { speaker: "reed", text: "Good morning. I fly back at noon, so we have three hours and I do not like long introductions.", es: "«Buenos días. Regreso en el vuelo del mediodía, así que tenemos tres horas y no me gustan las presentaciones largas»." },
        { speaker: "vale", text: "Perfect. Then I will start with what your three offices would get in the first month.", es: "«Perfecto. Entonces empezaré con lo que sus tres oficinas recibirían en el primer mes»." },
        { speaker: "reed", text: "Good. Everybody else started with their history. I do not buy history, I buy results.", es: "«Bien. Todos los demás empezaron con su historia. Yo no compro historia, compro resultados»." },
      ],
      words: [
        { word: "noon", es: "mediodía" },
        { word: "introductions", es: "presentaciones" },
        { word: "results", es: "resultados" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale presenta su plan en una mesa del hotel; Reed escucha con el maletín abierto.",
      text: "For forty minutes she talked about outcomes, not about classes.",
      es: "Durante cuarenta minutos ella habló de resultados, no de clases.",
      speaker: "narrator",
      cast: ["vale", "reed"],
      lines: [
        { speaker: "vale", text: "In month one your supervisors could handle a client call alone. Not perfectly — but alone.", es: "«En el primer mes sus supervisores podrían manejar una llamada de cliente solos. No perfectamente — pero solos»." },
        { speaker: "reed", text: "And if they cannot? What would happen to my money then, Miss Valeria?", es: "«¿Y si no pueden? ¿Qué pasaría con mi dinero entonces, señorita Valeria?»" },
        { speaker: "vale", text: "Then we would repeat that month at no cost. I put that in writing, on page four.", es: "«Entonces repetiríamos ese mes sin costo. Eso lo puse por escrito, en la página cuatro»." },
      ],
      words: [
        { word: "supervisors", es: "supervisores" },
        { word: "handle", es: "manejar" },
        { word: "writing", es: "escrito" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed anota algo y desliza el papel hacia Vale; ella lo mira sin cambiar de cara.",
      text: "Then he wrote a number on a napkin and pushed it across the table.",
      es: "Entonces él escribió un número en una servilleta y lo deslizó por la mesa.",
      speaker: "narrator",
      cast: ["vale", "reed"],
      lines: [
        { speaker: "reed", text: "Nine dollars per student per hour. Take it today, and all three offices start in March.", es: "«Nueve dólares por estudiante por hora. Acéptelo hoy, y las tres oficinas empiezan en marzo»." },
        { speaker: "vale", text: "I would love to say yes. But at nine dollars I would have to cut the coaching hours in half.", es: "«Me encantaría decir que sí. Pero a nueve dólares tendría que reducir a la mitad las horas de coaching»." },
        { speaker: "vale", text: "Eleven is my floor. Below eleven you would not get this program — you would get a cheaper one.", es: "«Once es mi piso. Debajo de once usted no recibiría este programa — recibiría uno más barato»." },
      ],
      words: [
        { word: "napkin", es: "servilleta" },
        { word: "coaching", es: "acompañamiento / coaching" },
        { word: "cheaper", es: "más barato" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Reed se pone de pie y da la mano a Vale en el lobby antes de salir.",
      text: "He closed his suitcase, stood up, and said the strangest thing of the morning.",
      es: "Él cerró su maleta, se puso de pie, y dijo lo más extraño de la mañana.",
      speaker: "narrator",
      cast: ["vale", "dani", "reed"],
      lines: [
        { speaker: "reed", text: "You did not move. I will tell Houston that the number is eleven and the answer is probably yes.", es: "«Usted no se movió. Le diré a Houston que el número es once y que la respuesta probablemente es sí»." },
        { speaker: "vale", text: "Probably is a beautiful word this early in the morning. Thank you for flying down, Mr. Reed.", es: "«Probablemente es una palabra hermosa tan temprano por la mañana. Gracias por volar hasta acá, señor Reed»." },
        { speaker: "dani", text: "He shook your hand for four seconds. That man does nothing by accident. Four seconds is good.", es: "«Te dio la mano por cuatro segundos. Ese hombre no hace nada por accidente. Cuatro segundos es bueno»." },
      ],
      words: [
        { word: "move", es: "moverse" },
        { word: "probably", es: "probablemente" },
        { word: "accident", es: "accidente" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale y Dani en la parada de bus revisan un correo que acaba de llegar al teléfono.",
      text: "They were still waiting for the bus home when the email arrived.",
      es: "Todavía esperaban el bus de regreso cuando llegó el correo.",
      speaker: "narrator",
      cast: ["vale", "dani"],
      lines: [
        { speaker: "vale", text: "It is from Houston. Subject line: contract for signature. Three offices, eleven dollars.", es: "«Es de Houston. Asunto: contrato para firma. Tres oficinas, once dólares»." },
        { speaker: "dani", text: "We did it. On a bus. With a napkin. Camila is going to scream when she reads this.", es: "«Lo logramos. En un bus. Con una servilleta. Camila va a gritar cuando lea esto»." },
        { speaker: "vale", text: "There is a second paragraph. They want the first class to start in eight days, in Guatemala.", es: "«Hay un segundo párrafo. Quieren que la primera clase empiece en ocho días, en Guatemala»." },
      ],
      words: [
        { word: "subject", es: "asunto" },
        { word: "signature", es: "firma" },
        { word: "paragraph", es: "párrafo" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What did Camila say was the bottom line?",
      questionEs: "¿Qué dijo Camila que era lo esencial?",
      options: [
        { label: "Under eleven dollars per student per hour, the school loses money", emoji: "💵" },
        { label: "They should accept any price to win the contract", emoji: "🤝" },
        { label: "The bus ticket was too expensive", emoji: "🚌" },
      ],
      answer: 0,
      sayIt: "The bottom line is simple: eleven dollars is my floor.",
      sayItEs: "Ejemplo: «The bottom line is simple: eleven dollars is my floor.»",
      sayItAskEn: "What might happen in your next week? Say one thing with might and one with could.",
      sayItAskEs: "¿Qué podría pasar en tu próxima semana? Di una cosa con might y otra con could.",
      sayItCheck: {
        target: "I might *",
        altTargets: ["I could *", "It might *", "Next week I might *", "Maybe I could *"],
      },
    },
    {
      id: "q2",
      afterScene: "s9",
      questionEn: "What did Vale answer when Reed offered nine dollars?",
      questionEs: "¿Qué respondió Vale cuando Reed ofreció nueve dólares?",
      options: [
        { label: "That eleven was her floor, and below it he would get a cheaper program", emoji: "📉" },
        { label: "That she accepted nine dollars immediately", emoji: "✍️" },
        { label: "That she would call him next year", emoji: "📆" },
      ],
      answer: 0,
      sayIt: "Below eleven you would not get this program — you would get a cheaper one.",
      sayItEs: "Ejemplo: «Below eleven you would not get this program — you would get a cheaper one.»",
      sayItAskEn: "Somebody asks you to work for half your price. What would you say and why?",
      sayItAskEs: "Alguien te pide trabajar por la mitad de tu precio. ¿Qué dirías y por qué?",
      sayItCheck: {
        target: "I would * because *",
        altTargets: ["I would say *", "I would not *", "If that happened, I would *"],
      },
    },
    {
      id: "q3",
      afterScene: "s11",
      questionEn: "What does the email from Houston ask for?",
      questionEs: "¿Qué pide el correo de Houston?",
      options: [
        { label: "The contract signed and the first class in eight days, in Guatemala", emoji: "📧" },
        { label: "A new proposal with lower prices", emoji: "📝" },
        { label: "A meeting in Houston next month", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "They want the first class to start in eight days, in Guatemala.",
      sayItEs: "Ejemplo: «They want the first class to start in eight days, in Guatemala.»",
      sayItAskEn: "You get great news but very little time. What could go wrong and what would you do first?",
      sayItAskEs: "Recibes una gran noticia pero con muy poco tiempo. ¿Qué podría salir mal y qué harías primero?",
      sayItCheck: {
        target: "* could go wrong, so I would *",
        altTargets: ["I would first *", "First I would *", "It could *, so I would *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I can do it. I show up early, and I speak even when my hands are cold.",
    es: "Puedo hacerlo. Llego temprano, y hablo aunque tenga las manos frías.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "English is easy. I practice out loud the night before, not in my head.",
    es: "El inglés es fácil. Practico en voz alta la noche anterior, no en mi cabeza.",
    model: "vale",
    modelActionEs: "Vale ensayó su reunión frente al espejo a las once de la noche.",
  },
  expressions: [
    {
      phrase: "show up",
      es: "presentarse / aparecer",
      kind: "phrasal",
      example: "Either way, you showed up. Most people never even get on the bus.",
      exampleEs: "De cualquier forma, te presentaste. La mayoría ni siquiera se sube al bus.",
    },
    {
      phrase: "back out",
      es: "echarse para atrás / retractarse",
      kind: "phrasal",
      example: "He could still cancel. Executives back out all the time.",
      exampleEs: "Él todavía podría cancelar. Los ejecutivos se echan para atrás todo el tiempo.",
    },
    {
      phrase: "the bottom line",
      es: "lo esencial / la conclusión final",
      kind: "idiom",
      example: "The bottom line is simple: under eleven dollars, we lose money.",
      exampleEs: "Lo esencial es simple: bajo once dólares, perdemos dinero.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Your turn, 30 seconds: something important is coming for you. Say what might happen, what could go wrong, and what you would do about it.",
    es: "Tu turno, 30 segundos: algo importante viene para ti. Di qué podría pasar, qué podría salir mal y qué harías al respecto.",
  },
  continueWith: ["It might ...", "It could also ...", "If that happens, I would ..."],
  cliffhanger: {
    en: "Episode 3 — eight days to open a classroom in another country. Who signs, who pays, who teaches?",
    es: "Episodio 3 — ocho días para abrir un salón en otro país. ¿Quién firma, quién paga, quién enseña?",
  },
};
