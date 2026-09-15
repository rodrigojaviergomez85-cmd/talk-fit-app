import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep3-the-competitor/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep3-the-competitor/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep3-the-competitor/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep3-the-competitor/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep3-the-competitor/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep3-the-competitor/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep3-the-competitor/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep3-the-competitor/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep3-the-competitor/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep3-the-competitor/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep3-the-competitor/s10.jpg";

/**
 * Season 6 (Eagles) Episode 3 — "The competitor".
 * Eagles day 3: advice with should / shouldn't / must.
 */
export const EAGLES_EP3_THE_COMPETITOR: StorybookEpisode = {
  id: "eagles-ep3-the-competitor",
  moduleId: "eagles-week-1",
  week: 1,
  title: "The competitor",
  titleEs: "El competidor",
  episodeLabel: { en: "Season 6 · Episode 3", es: "Temporada 6 · Episodio 3" },
  previously: [
    { en: "Vale sent the proposal on Thursday night.", es: "Vale envió la propuesta el jueves por la noche." },
    { en: "Another school sent one too.", es: "Otra escuela también envió una." },
    { en: "Now they wait.", es: "Ahora esperan." },
  ],
  reviewWords: [
    { word: "advice", es: "consejo" },
    { word: "competitor", es: "competidor" },
    { word: "answer", es: "respuesta" },
  ],
  blurb: {
    en: "The other school is bigger and cheaper. Don Tito tells Vale what she should and shouldn't do.",
    es: "La otra escuela es más grande y más barata. Don Tito le dice a Vale qué debería y qué no debería hacer.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale mira el sitio web de la otra escuela en su laptop, seria.",
      text: "Friday. No answer from Morgan, and Vale is reading about the other school.",
      es: "Viernes. Sin respuesta de Morgan, y Vale está leyendo sobre la otra escuela.",
      speaker: "narrator",
      lines: [
        {
          speaker: "narrator",
          text: "Friday. No answer from Morgan, and Vale is reading about the other school.",
          es: "Viernes. Sin respuesta de Morgan, y Vale está leyendo sobre la otra escuela.",
        },
        { speaker: "dani", text: "Vale, you shouldn't read their website again.", es: "«Vale, no deberías leer su sitio web otra vez»." },
        { speaker: "vale", text: "They have twelve teachers, Dani. We have three.", es: "«Tienen doce maestros, Dani. Nosotros tenemos tres»." },
      ],
      words: [
        { word: "answer", es: "respuesta" },
        { word: "website", es: "sitio web" },
        { word: "teachers", es: "maestros" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila entra con dos cafés y ve la pantalla.",
      text: "Camila arrives with coffee and an opinion.",
      es: "Camila llega con café y una opinión.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "You should close that page and eat something.", es: "«Deberías cerrar esa página y comer algo»." },
        { speaker: "vale", text: "They're cheaper than us.", es: "«Son más baratos que nosotros»." },
        { speaker: "camila", text: "Cheaper is not the same as better. You must remember that.", es: "«Más barato no es lo mismo que mejor. Debes recordar eso»." },
      ],
      words: [
        { word: "coffee", es: "café" },
        { word: "page", es: "página" },
        { word: "cheaper", es: "más barato" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale camina por la calle de su barrio hacia la tienda de Don Tito.",
      text: "In the afternoon, Vale walks to Don Tito's little store.",
      es: "Por la tarde, Vale camina a la pequeña tienda de Don Tito.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "In the afternoon, Vale walks to Don Tito's little store.", es: "Por la tarde, Vale camina a la pequeña tienda de Don Tito." },
        { speaker: "tito", text: "Valentina! You have your worried face today.", es: "«¡Valentina! Hoy traes tu cara de preocupación»." },
        { speaker: "vale", text: "A big school wants my client, Don Tito.", es: "«Una escuela grande quiere a mi cliente, Don Tito»." },
      ],
      words: [
        { word: "store", es: "tienda" },
        { word: "worried", es: "preocupada" },
        { word: "client", es: "cliente" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Don Tito, detrás del mostrador, habla con calma mientras Vale escucha.",
      text: "Don Tito has been selling on this corner for forty years.",
      es: "Don Tito lleva cuarenta años vendiendo en esta esquina.",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "There's a supermarket two blocks away. Bigger, cheaper, newer.", es: "«Hay un supermercado a dos cuadras. Más grande, más barato, más nuevo»." },
        { speaker: "tito", text: "You shouldn't fight a big store with prices. You must fight with your name.", es: "«No deberías pelear con una tienda grande con precios. Debes pelear con tu nombre»." },
        { speaker: "vale", text: "My name?", es: "«¿Mi nombre?»" },
      ],
      words: [
        { word: "supermarket", es: "supermercado" },
        { word: "blocks", es: "cuadras" },
        { word: "fight", es: "pelear" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Don Tito señala una pared con fotos de clientes de muchos años.",
      text: "He points at a wall full of old photos.",
      es: "Él señala una pared llena de fotos viejas.",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "These people don't buy bread here. They buy trust.", es: "«Esta gente no compra pan aquí. Compra confianza»." },
        { speaker: "tito", text: "You should call your client. You shouldn't wait in silence.", es: "«Deberías llamar a tu cliente. No deberías esperar en silencio»." },
        { speaker: "vale", text: "And what should I say?", es: "«¿Y qué debería decir?»" },
      ],
      words: [
        { word: "bread", es: "pan" },
        { word: "trust", es: "confianza" },
        { word: "silence", es: "silencio" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Don Tito sonríe y levanta un dedo como dando una regla.",
      text: "Don Tito gives her one rule.",
      es: "Don Tito le da una regla.",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "You must never talk badly about the other school.", es: "«Nunca debes hablar mal de la otra escuela»." },
        { speaker: "tito", text: "You should talk about your students. Their names, their results.", es: "«Deberías hablar de tus estudiantes. Sus nombres, sus resultados»." },
        { speaker: "vale", text: "That I can do.", es: "«Eso sí puedo hacerlo»." },
      ],
      words: [
        { word: "rule", es: "regla" },
        { word: "never", es: "nunca" },
        { word: "results", es: "resultados" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale regresa a la oficina decidida, con el teléfono en la mano.",
      text: "Back at the office, Vale picks up the phone.",
      es: "De vuelta en la oficina, Vale levanta el teléfono.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Dani, find me two students who work in sales.", es: "«Dani, búscame dos estudiantes que trabajen en ventas»." },
        { speaker: "dani", text: "Mateo and Ana. Both speak on calls every day now.", es: "«Mateo y Ana. Los dos hablan en llamadas todos los días ahora»." },
        { speaker: "vale", text: "Perfect. I should send Morgan their voices, not my adjectives.", es: "«Perfecto. Debería enviarle a Morgan sus voces, no mis adjetivos»." },
      ],
      words: [
        { word: "phone", es: "teléfono" },
        { word: "find", es: "buscar" },
        { word: "voices", es: "voces" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Mateo y Ana graban un audio corto en la sala de clases.",
      text: "Mateo and Ana record thirty seconds each.",
      es: "Mateo y Ana graban treinta segundos cada uno.",
      speaker: "mateo",
      lines: [
        { speaker: "mateo", text: "A year ago I couldn't answer a call in English.", es: "«Hace un año no podía contestar una llamada en inglés»." },
        { speaker: "ana", text: "Now I take five calls a day, and I'm calm.", es: "«Ahora tomo cinco llamadas al día, y estoy tranquila»." },
        { speaker: "vale", text: "That's it. Send it.", es: "«Eso es. Envíalo»." },
      ],
      words: [
        { word: "seconds", es: "segundos" },
        { word: "calm", es: "tranquila" },
        { word: "call", es: "llamada" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El teléfono de Vale se ilumina con una llamada de Morgan.",
      text: "Twenty minutes later, the phone lights up.",
      es: "Veinte minutos después, el teléfono se ilumina.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "Twenty minutes later, the phone lights up.", es: "Veinte minutos después, el teléfono se ilumina." },
        { speaker: "morgan", text: "Vale, I listened to your students in the car.", es: "«Vale, escuché a tus estudiantes en el carro»." },
        { speaker: "morgan", text: "My director thinks we should meet again on Monday.", es: "«Mi directora cree que deberíamos reunirnos otra vez el lunes»." },
      ],
      words: [
        { word: "listened", es: "escuché" },
        { word: "director", es: "directora" },
        { word: "meet", es: "reunirse" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale cuelga y respira, entre feliz y nerviosa, con Dani y Camila atrás.",
      text: "Vale hangs up. The competitor is still there.",
      es: "Vale cuelga. El competidor sigue ahí.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "We're still in the race.", es: "«Seguimos en la carrera»." },
        { speaker: "camila", text: "What did the old man tell you?", es: "«¿Qué te dijo el señor?»" },
        { speaker: "vale", text: "That I shouldn't sell a price. I must sell people.", es: "«Que no debería vender un precio. Debo vender personas»." },
      ],
      words: [
        { word: "race", es: "carrera" },
        { word: "tell", es: "decir" },
        { word: "people", es: "personas" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What did Don Tito say about fighting a big store?",
      questionEs: "¿Qué dijo Don Tito sobre pelear con una tienda grande?",
      options: [
        { label: "You shouldn't fight with prices", emoji: "🏷️" },
        { label: "You should close early", emoji: "🔒" },
        { label: "You must sell bread only", emoji: "🥖" },
      ],
      answer: 0,
      sayIt: "You shouldn't fight a big store with prices.",
      sayItEs: "Ejemplo: «You shouldn't fight a big store with prices.»",
      sayItAskEn: "A friend wants to learn English fast. What should he do? Give one piece of advice.",
      sayItAskEs: "Un amigo quiere aprender inglés rápido. ¿Qué debería hacer? Dale un consejo.",
      sayItCheck: {
        target: "You should *",
        altTargets: ["He should *", "You should practice *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What must Vale never do?",
      questionEs: "¿Qué no debe hacer nunca Vale?",
      options: [
        { label: "Talk badly about the other school", emoji: "🙊" },
        { label: "Answer the phone", emoji: "📞" },
        { label: "Send an email", emoji: "✉️" },
      ],
      answer: 0,
      sayIt: "She must never talk badly about the other school.",
      sayItEs: "Ejemplo: «She must never talk badly about the other school.»",
      sayItAskEn: "What shouldn't a student do the night before an important exam?",
      sayItAskEs: "¿Qué no debería hacer un estudiante la noche antes de un examen importante?",
      sayItCheck: {
        target: "You shouldn't *",
        altTargets: ["He shouldn't *", "You shouldn't study *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "Why did Morgan call Vale?",
      questionEs: "¿Por qué Morgan llamó a Vale?",
      options: [
        { label: "Her director wants to meet again on Monday", emoji: "📅" },
        { label: "She wanted a cheaper price", emoji: "💰" },
        { label: "She chose the other school", emoji: "❌" },
      ],
      answer: 0,
      sayIt: "Her director wants to meet again on Monday.",
      sayItEs: "Ejemplo: «Her director wants to meet again on Monday.»",
      sayItAskEn: "Give yourself one strong rule for your English. Start with: I must…",
      sayItAskEs: "Date una regla fuerte para tu inglés. Empieza con: I must…",
      sayItCheck: {
        target: "I must *",
        altTargets: ["I must practice *", "I must speak *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "Mistakes are part of the process. I'll continue.",
    es: "Los errores son parte del proceso. Voy a continuar.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "I show results, not adjectives. Real voices speak louder than big words.",
    es: "Muestro resultados, no adjetivos. Las voces reales hablan más fuerte que las palabras grandes.",
    model: "vale",
    modelActionEs: "Vale envía audios de sus estudiantes en vez de promesas.",
  },
  continuePrompt: {
    en: "Someone asks you for advice about learning English. What should they do? What shouldn't they do? What must they never forget?",
    es: "Alguien te pide un consejo para aprender inglés. ¿Qué debería hacer? ¿Qué no debería hacer? ¿Qué nunca debe olvidar?",
  },
  continueWith: ["You should ...", "You shouldn't ...", "You must ..."],
  cliffhanger: {
    en: "Episode 4: Monday's meeting. The director has one hard question about the price.",
    es: "Episodio 4: La reunión del lunes. La directora tiene una pregunta difícil sobre el precio.",
  },
};
