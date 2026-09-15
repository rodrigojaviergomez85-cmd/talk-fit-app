import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep16-what-we-have-achieved/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep16-what-we-have-achieved/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep16-what-we-have-achieved/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep16-what-we-have-achieved/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep16-what-we-have-achieved/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep16-what-we-have-achieved/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep16-what-we-have-achieved/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep16-what-we-have-achieved/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep16-what-we-have-achieved/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep16-what-we-have-achieved/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep16-what-we-have-achieved/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep16-what-we-have-achieved/s11.jpg";

/**
 * Season 7 (Tigers) Episode 16 — "What we have achieved".
 * Matches Tigers Day 16 (present perfect for achievements: what we have done).
 */
export const TIGERS_EP16_WHAT_WE_HAVE_ACHIEVED: StorybookEpisode = {
  id: "tigers-ep16-what-we-have-achieved",
  moduleId: "tigers",
  week: 4,
  title: "What we have achieved",
  titleEs: "Lo que hemos logrado",
  episodeLabel: { en: "Season 7 · Episode 16", es: "Temporada 7 · Episodio 16" },
  previously: [
    { en: "Vale said no to BigTalk's final offer.", es: "Vale le dijo no a la oferta final de BigTalk." },
    { en: "The school has a waiting list for the first time.", es: "La escuela tiene lista de espera por primera vez." },
    { en: "Northline's final decision arrives this Friday.", es: "La decisión final de Northline llega este viernes." },
  ],
  reviewWords: [
    { word: "offer", es: "oferta" },
    { word: "grow", es: "crecer" },
    { word: "branch", es: "sucursal" },
  ],
  blurb: {
    en: "While they wait for Friday, Vale asks the team a question nobody expected: what have we achieved this year? The answers fill a wall.",
    es: "Mientras esperan el viernes, Vale hace una pregunta que nadie esperaba: ¿qué hemos logrado este año? Las respuestas llenan una pared.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale pone una hoja gigante en la pared: lo que hemos logrado este año.",
      text: "Vale taped a giant paper to the wall: What have we achieved this year?",
      es: "Vale pegó una hoja gigante en la pared: «¿Qué hemos logrado este año?»",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Friday is in four days. Until then, we don't wait nervously. We remember.", es: "«El viernes es en cuatro días. Hasta entonces, no esperamos nerviosos. Recordamos»." },
        { speaker: "dani", text: "Remember what?", es: "«¿Recordar qué?»" },
        { speaker: "vale", text: "Everything we have achieved this year. One by one. On the wall.", es: "«Todo lo que hemos logrado este año. Uno por uno. En la pared»." },
      ],
      words: [
        { word: "taped", es: "pegó" },
        { word: "achieved", es: "logrado" },
        { word: "wall", es: "pared" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale escribe el primer logro: hemos enseñado a más de cien estudiantes.",
      text: "Number one: we have taught more than a hundred students this year.",
      es: "«Número uno: hemos enseñado a más de cien estudiantes este año».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Number one: we have taught more than a hundred students this year.", es: "«Número uno: hemos enseñado a más de cien estudiantes este año»." },
        { speaker: "camila", text: "A hundred! When did we become a hundred-student school?", es: "«¡Cien! ¿Cuándo nos convertimos en una escuela de cien estudiantes?»" },
        { speaker: "vale", text: "Slowly. Then suddenly. That's how it works.", es: "«Despacio. Luego de repente. Así funciona»." },
      ],
      words: [
        { word: "taught", es: "enseñado" },
        { word: "hundred", es: "cien" },
        { word: "suddenly", es: "de repente" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani escribe el segundo logro: he contestado mil llamadas.",
      text: "Number two: I have answered a thousand calls, and I have lost my voice only twice.",
      es: "«Número dos: he contestado mil llamadas y solo he perdido la voz dos veces».",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Number two: I have answered about a thousand calls this year.", es: "«Número dos: he contestado como mil llamadas este año»." },
        { speaker: "dani", text: "I have lost my voice only twice. That is a personal record.", es: "«Solo he perdido la voz dos veces. Es un récord personal»." },
        { speaker: "sofia", text: "And you have learned to write while you talk. That is a superpower.", es: "«Y has aprendido a escribir mientras hablas. Eso es un superpoder»." },
      ],
      words: [
        { word: "answered", es: "contestado" },
        { word: "voice", es: "voz" },
        { word: "superpower", es: "superpoder" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Sofía escribe: he enseñado mis primeras clases oficiales.",
      text: "Number three: I have taught my first official classes, and nobody has escaped.",
      es: "«Número tres: he enseñado mis primeras clases oficiales y nadie se ha escapado».",
      speaker: "sofia",
      lines: [
        { speaker: "sofia", text: "Number three: I have taught my first official classes. In English. To real students.", es: "«Número tres: he enseñado mis primeras clases oficiales. En inglés. A estudiantes de verdad»." },
        { speaker: "sofia", text: "And nobody has escaped. Yet.", es: "«Y nadie se ha escapado. Todavía»." },
        { speaker: "vale", text: "You have also made Beto speak. Beto! The quietest student in history!", es: "«También has hecho hablar a Beto. ¡Beto! ¡El estudiante más callado de la historia!»" },
      ],
      words: [
        { word: "escaped", es: "escapado" },
        { word: "yet", es: "todavía" },
        { word: "history", es: "historia" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Camila escribe: hemos construido el segundo salón y el taller gratis.",
      text: "Number four: we have built a second classroom and a free workshop for the neighborhood.",
      es: "«Número cuatro: hemos construido un segundo salón y un taller gratis para el barrio».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Number four: we have built a second classroom — I carried half the chairs, for the record.", es: "«Número cuatro: hemos construido un segundo salón — yo cargué la mitad de las sillas, que conste»." },
        { speaker: "camila", text: "And we have started a free workshop. Neighbors who have never studied English now say 'good morning'.", es: "«Y hemos empezado un taller gratis. Vecinos que nunca han estudiado inglés ahora dicen «good morning»»." },
        { speaker: "dani", text: "Mrs. Rosa said 'good morning' to a tourist yesterday. He almost cried.", es: "«Doña Rosa le dijo «good morning» a un turista ayer. Casi llora»." },
      ],
      words: [
        { word: "carried", es: "cargué" },
        { word: "neighbors", es: "vecinos" },
        { word: "almost", es: "casi" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "El equipo recuerda: hemos sobrevivido a BigTalk.",
      text: "Number five: we have survived a giant competitor. That is not a small thing.",
      es: "«Número cinco: hemos sobrevivido a un competidor gigante. Eso no es poca cosa».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Number five, and listen carefully: we have survived a giant competitor.", es: "«Número cinco, y escuchen bien: hemos sobrevivido a un competidor gigante»." },
        { speaker: "vale", text: "They have tried discounts, copies, and a purchase offer. We are still here.", es: "«Han intentado descuentos, copias y una oferta de compra. Aquí seguimos»." },
        { speaker: "camila", text: "And they have made us better. Annoying, but true.", es: "«Y nos han hecho mejores. Molesto, pero cierto»." },
      ],
      words: [
        { word: "survived", es: "sobrevivido" },
        { word: "discounts", es: "descuentos" },
        { word: "still", es: "aún / seguimos" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Don Tito llega y escribe su logro con letra temblorosa: he aprendido cincuenta palabras.",
      text: "Don Tito wrote his own achievement with shaky letters: I have learned fifty words in English.",
      es: "Don Tito escribió su propio logro con letra temblorosa: «He aprendido cincuenta palabras en inglés».",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "My turn. This year, I have learned fifty English words. Fifty!", es: "«Mi turno. Este año, he aprendido cincuenta palabras en inglés. ¡Cincuenta!»" },
        { speaker: "tito", text: "I am sixty-eight years old, and my brain has learned fifty new words. Imagine yours.", es: "«Tengo sesenta y ocho años, y mi cerebro ha aprendido cincuenta palabras nuevas. Imaginen el de ustedes»." },
        { speaker: "vale", text: "Don Tito… that is the best achievement on the wall.", es: "«Don Tito… ese es el mejor logro de la pared»." },
      ],
      words: [
        { word: "shaky", es: "temblorosa" },
        { word: "learned", es: "aprendido" },
        { word: "brain", es: "cerebro" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "La pared llena de logros; todos la miran en silencio, orgullosos.",
      text: "The wall was full. Nobody spoke for a minute.",
      es: "La pared estaba llena. Nadie habló por un minuto.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "We have done all of this… and I almost forgot all of this.", es: "«Hemos hecho todo esto… y casi lo olvido todo»." },
        { speaker: "vale", text: "That's why we write it down. Achievements are easy to forget and dangerous to ignore.", es: "«Por eso lo escribimos. Los logros son fáciles de olvidar y peligrosos de ignorar»." },
        { speaker: "camila", text: "If Northline says no on Friday…", es: "«Si Northline dice que no el viernes…»" },
        { speaker: "vale", text: "Then this wall is still true on Saturday.", es: "«Entonces esta pared seguirá siendo cierta el sábado»." },
      ],
      words: [
        { word: "forget", es: "olvidar" },
        { word: "ignore", es: "ignorar" },
        { word: "true", es: "cierta" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Morgan llama inesperadamente: pregunta si pueden recibir una visita de la junta.",
      text: "Then the phone rang. Morgan. The board wants to visit the school before deciding.",
      es: "Entonces sonó el teléfono. Morgan. La junta quiere visitar la escuela antes de decidir.",
      speaker: "narrator",
      lines: [
        { speaker: "morgan", text: "Vale, the board has a request. They want to visit your school before the final decision.", es: "«Vale, la junta tiene una petición. Quieren visitar tu escuela antes de la decisión final»." },
        { speaker: "vale", text: "When?", es: "«¿Cuándo?»" },
        { speaker: "morgan", text: "Thursday. One day before the vote. They want to see the classes, not a presentation.", es: "«Jueves. Un día antes del voto. Quieren ver las clases, no una presentación»." },
      ],
      words: [
        { word: "request", es: "petición" },
        { word: "visit", es: "visitar" },
        { word: "vote", es: "voto" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "El equipo se mira: una visita real, sin presentación; todos sonríen.",
      text: "A real visit. No slides, no folders. Just the school being the school.",
      es: "Una visita real. Sin láminas, sin carpetas. Solo la escuela siendo la escuela.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "They want to see normal classes?! Our normal classes are chaos! Beautiful chaos, but chaos!", es: "«¡¿Quieren ver clases normales?! ¡Nuestras clases normales son caos! ¡Caos hermoso, pero caos!»" },
        { speaker: "vale", text: "Then they will see beautiful chaos. We have nothing to hide.", es: "«Entonces verán caos hermoso. No tenemos nada que esconder»." },
        { speaker: "sofia", text: "Should we prepare anything special?", es: "«¿Deberíamos preparar algo especial?»" },
        { speaker: "vale", text: "Yes. We have prepared for five years. We just keep going.", es: "«Sí. Hemos preparado durante cinco años. Solo seguimos»." },
      ],
      words: [
        { word: "slides", es: "láminas" },
        { word: "chaos", es: "caos" },
        { word: "hide", es: "esconder" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Cierre: cada uno dice un logro en voz alta frente a la pared.",
      text: "Closing circle: everyone says one achievement out loud.",
      es: "Círculo de cierre: cada uno dice un logro en voz alta.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "We have taught a hundred students. We have survived a giant.", es: "«Hemos enseñado a cien estudiantes. Hemos sobrevivido a un gigante»." },
        { speaker: "dani", text: "I have answered a thousand calls, and I have learned English while working.", es: "«He contestado mil llamadas y he aprendido inglés mientras trabajo»." },
        { speaker: "camila", text: "We have built a second classroom and a free workshop.", es: "«Hemos construido un segundo salón y un taller gratis»." },
        { speaker: "sofia", text: "And I have found the best job of my life.", es: "«Y yo he encontrado el mejor trabajo de mi vida»." },
      ],
      words: [
        { word: "out loud", es: "en voz alta" },
        { word: "found", es: "encontrado" },
        { word: "job", es: "trabajo" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What was the first achievement on the wall?",
      questionEs: "¿Cuál fue el primer logro en la pared?",
      options: [
        { label: "They have taught more than a hundred students", emoji: "🎓" },
        { label: "They have bought a bus", emoji: "🚌" },
        { label: "They have opened ten schools", emoji: "🏫" },
      ],
      answer: 0,
      sayIt: "We have taught more than a hundred students this year.",
      sayItEs: "Ejemplo: «We have taught more than a hundred students this year.»",
      sayItAskEn: "What have you achieved this year? Tell me one thing.",
      sayItAskEs: "¿Qué has logrado este año? Dime una cosa.",
      sayItCheck: {
        target: "I have *",
        altTargets: ["This year, I have *", "I've *", "I have achieved *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What was Don Tito's achievement?",
      questionEs: "¿Cuál fue el logro de Don Tito?",
      options: [
        { label: "He has learned fifty English words at sixty-eight", emoji: "🧠" },
        { label: "He has bought a new motorcycle", emoji: "🏍️" },
        { label: "He has traveled to Miami", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "I am sixty-eight years old, and I have learned fifty new words.",
      sayItEs: "Ejemplo: «I am sixty-eight years old, and I have learned fifty new words.»",
      sayItAskEn: "What have you learned recently? How does it feel?",
      sayItAskEs: "¿Qué has aprendido recientemente? ¿Cómo se siente?",
      sayItCheck: {
        target: "I have learned *",
        altTargets: ["I have learned to *", "Recently, I have learned *", "It feels *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What does Northline's board want to do on Thursday?",
      questionEs: "¿Qué quiere hacer la junta de Northline el jueves?",
      options: [
        { label: "Visit the school and see real classes", emoji: "👀" },
        { label: "Cancel everything", emoji: "❌" },
        { label: "Have pupusas with Don Tito", emoji: "🫓" },
      ],
      answer: 0,
      sayIt: "The board has asked to visit our school before the final decision.",
      sayItEs: "Ejemplo: «The board has asked to visit our school before the final decision.»",
      sayItAskEn: "What have you done to prepare for something important? Tell me two things.",
      sayItAskEs: "¿Qué has hecho para prepararte para algo importante? Dime dos cosas.",
      sayItCheck: {
        target: "I have * and I have *",
        altTargets: ["I have prepared *", "To prepare, I have *", "First I have *, then I have *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s8",
    phrase: "I look at my own wall of achievements. I have done difficult things before.",
    es: "Miro mi propia pared de logros. He hecho cosas difíciles antes.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "English is easy. I have already learned hundreds of words — this is just the next one.",
    es: "El inglés es fácil. Ya he aprendido cientos de palabras — esta solo es la siguiente.",
    model: "tito",
    modelActionEs: "Don Tito, a los sesenta y ocho, sumó su palabra cincuenta sin rendirse.",
  },
  continuePrompt: {
    en: "Write your own wall: three things you have achieved this year — in English, in your work, or in your life.",
    es: "Escribe tu propia pared: tres cosas que has logrado este año — en inglés, en tu trabajo o en tu vida.",
  },
  continueWith: ["This year, I have ...", "I have also ...", "And the best one: I have ..."],
  cliffhanger: {
    en: "Episode 17: Thursday — the board walks through the school… and Beto speaks.",
    es: "Episodio 17: Jueves — la junta recorre la escuela… y Beto habla.",
  },
};
