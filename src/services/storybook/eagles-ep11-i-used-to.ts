import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep11-i-used-to/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep11-i-used-to/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep11-i-used-to/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep11-i-used-to/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep11-i-used-to/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep11-i-used-to/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep11-i-used-to/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep11-i-used-to/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep11-i-used-to/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep11-i-used-to/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep11-i-used-to/s10.jpg";

/**
 * Season 6 (Eagles) Episode 11 — "I used to work there".
 * Eagles day 11: used to — past habits vs current habits.
 */
export const EAGLES_EP11_I_USED_TO: StorybookEpisode = {
  id: "eagles-ep11-i-used-to",
  moduleId: "eagles-week-1",
  week: 3,
  title: "I used to work there",
  titleEs: "Yo trabajaba ahí",
  episodeLabel: { en: "Season 6 · Episode 11", es: "Temporada 6 · Episodio 11" },
  previously: [
    { en: "The platform went down.", es: "La plataforma se cayó." },
    { en: "The team moved the class in two hours.", es: "El equipo movió la clase en dos horas." },
    { en: "Somebody left a note on the door.", es: "Alguien dejó una nota en la puerta." },
  ],
  reviewWords: [
    { word: "used to", es: "solía / antes" },
    { word: "habit", es: "hábito" },
    { word: "change", es: "cambio" },
  ],
  blurb: {
    en: "The stranger with the note is not a stranger. Luis used to sit two desks away from Vale at the call center.",
    es: "El desconocido de la nota no es un desconocido. Luis se sentaba a dos escritorios de Vale en el call center.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale reads a small paper note at the school door in the morning.",
      text: "8:00 a.m. Vale reads the note again.",
      es: "8:00 a.m. Vale lee la nota otra vez.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "\"Are you the school from Northline?\" No name, no number.", es: "«¿Ustedes son la escuela de Northline?» Sin nombre, sin número." },
        { speaker: "dani", text: "Somebody knows about the contract before we signed it.", es: "«Alguien sabe del contrato antes de que lo firmemos»." },
        { speaker: "vale", text: "Then somebody is coming back today.", es: "«Entonces alguien va a volver hoy»." },
      ],
      words: [
        { word: "note", es: "nota" },
        { word: "name", es: "nombre" },
        { word: "today", es: "hoy" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "A man in a simple shirt waits at the school entrance holding a folder.",
      text: "11:20 a.m. He comes back.",
      es: "11:20 a.m. Él regresa.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "Hi. I used to work with you. Row four, night shift.", es: "«Hola. Yo trabajaba contigo. Fila cuatro, turno de noche»." },
        { speaker: "vale", text: "Luis? You used to bring coffee for the whole row.", es: "«¿Luis? Tú traías café para toda la fila»." },
        { speaker: "luis", text: "I don't bring coffee now. Now I bring problems.", es: "«Ya no traigo café. Ahora traigo problemas»." },
      ],
      words: [
        { word: "shift", es: "turno" },
        { word: "coffee", es: "café" },
        { word: "row", es: "fila" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale and Luis sit at a small table with two cups of coffee.",
      text: "They sit down like two people from the same old floor.",
      es: "Se sientan como dos personas del mismo piso de antes.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "I used to answer calls in Spanish only. Now Northline wants English.", es: "«Antes yo contestaba llamadas solo en español. Ahora Northline quiere inglés»." },
        { speaker: "vale", text: "You work for Northline?", es: "«¿Trabajas para Northline?»" },
        { speaker: "luis", text: "I work in their local office. And I am scared.", es: "«Trabajo en su oficina local. Y tengo miedo»." },
      ],
      words: [
        { word: "calls", es: "llamadas" },
        { word: "office", es: "oficina" },
        { word: "scared", es: "asustado" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Luis shows Vale a paper with a list of employee names.",
      text: "The folder has twelve names.",
      es: "La carpeta tiene doce nombres.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "Twelve of us used to feel safe. Now we need English in six months.", es: "«Doce de nosotros nos sentíamos seguros. Ahora necesitamos inglés en seis meses»." },
        { speaker: "vale", text: "That is why Morgan called me.", es: "«Por eso me llamó Morgan»." },
        { speaker: "luis", text: "I used to think it was too late for me. I am thirty-eight.", es: "«Yo pensaba que era muy tarde para mí. Tengo treinta y ocho»." },
      ],
      words: [
        { word: "safe", es: "seguro" },
        { word: "months", es: "meses" },
        { word: "late", es: "tarde" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale stands next to a whiteboard with two columns, past and present.",
      text: "Vale draws her favorite two columns.",
      es: "Vale dibuja sus dos columnas favoritas.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I used to hide in the bathroom before English calls. Now I teach them.", es: "«Antes me escondía en el baño antes de las llamadas en inglés. Ahora las enseño»." },
        { speaker: "luis", text: "You used to be the quiet one.", es: "«Tú eras la callada»." },
        { speaker: "vale", text: "I was. Then I practiced every day for one year.", es: "«Lo era. Luego practiqué todos los días durante un año»." },
      ],
      words: [
        { word: "hide", es: "esconderse" },
        { word: "quiet", es: "callada" },
        { word: "year", es: "año" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila joins the table with a notebook and a friendly face.",
      text: "Camila arrives with numbers, as always.",
      es: "Camila llega con números, como siempre.",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Twelve people, six months. We used to teach six students a night.", es: "«Doce personas, seis meses. Antes enseñábamos a seis estudiantes por noche»." },
        { speaker: "vale", text: "Now we teach thirty. Twelve more is possible.", es: "«Ahora enseñamos a treinta. Doce más es posible»." },
        { speaker: "camila", text: "Possible, yes. Easy, no.", es: "«Posible, sí. Fácil, no»." },
      ],
      words: [
        { word: "people", es: "personas" },
        { word: "night", es: "noche" },
        { word: "possible", es: "posible" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Luis stands up and speaks his first full English sentence, nervous.",
      text: "Luis tries one sentence out loud.",
      es: "Luis intenta una frase en voz alta.",
      speaker: "luis",
      lines: [
        { speaker: "luis", text: "I... used to... study English at school.", es: "«Yo… estudiaba… inglés en la escuela»." },
        { speaker: "vale", text: "That was perfect. Say it again, louder.", es: "«Eso estuvo perfecto. Dilo otra vez, más fuerte»." },
        { speaker: "luis", text: "I used to study English at school. English is easy!", es: "«Yo estudiaba inglés en la escuela. ¡El inglés es fácil!»" },
      ],
      words: [
        { word: "study", es: "estudiar" },
        { word: "perfect", es: "perfecto" },
        { word: "again", es: "otra vez" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani shakes hands with Luis in the school hallway.",
      text: "Dani recognizes the face from an old photo.",
      es: "Dani reconoce la cara de una foto vieja.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "You used to be in Vale's team photo. The one with the bad cake.", es: "«Tú salías en la foto del equipo de Vale. La del pastel feo»." },
        { speaker: "luis", text: "That cake was mine. I used to cook badly too.", es: "«Ese pastel era mío. Yo también cocinaba mal»." },
        { speaker: "dani", text: "People change. That is the whole business here.", es: "«La gente cambia. De eso se trata este negocio»." },
      ],
      words: [
        { word: "photo", es: "foto" },
        { word: "cake", es: "pastel" },
        { word: "business", es: "negocio" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Morgan appears on a laptop screen during a short video call.",
      text: "Morgan calls at four.",
      es: "Morgan llama a las cuatro.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "I hear you met Luis. He used to be my best agent in the city.", es: "«Supe que conociste a Luis. Él era mi mejor agente en la ciudad»." },
        { speaker: "vale", text: "He still is. He just needs the words.", es: "«Todavía lo es. Solo necesita las palabras»." },
        { speaker: "morgan", text: "Then give me a schedule by Friday.", es: "«Entonces dame un horario para el viernes»." },
      ],
      words: [
        { word: "agent", es: "agente" },
        { word: "words", es: "palabras" },
        { word: "friday", es: "viernes" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale looks at an empty weekly calendar on the wall at night.",
      text: "7:40 p.m. The calendar is empty and Friday is close.",
      es: "7:40 p.m. El calendario está vacío y el viernes está cerca.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Twelve workers, two shifts, one teacher. Which hour is better?", es: "«Doce trabajadores, dos turnos, una maestra. ¿Cuál hora es mejor?»" },
        { speaker: "dani", text: "Morning or night. We have to choose tomorrow.", es: "«Mañana o noche. Tenemos que elegir mañana»." },
        { speaker: "narrator", text: "Two options. One calendar. Nobody agrees yet.", es: "Dos opciones. Un calendario. Nadie está de acuerdo todavía." },
      ],
      words: [
        { word: "workers", es: "trabajadores" },
        { word: "choose", es: "elegir" },
        { word: "calendar", es: "calendario" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "Who is the man with the note?",
      questionEs: "¿Quién es el hombre de la nota?",
      options: [
        { label: "Luis, a coworker from the call center", emoji: "☎️" },
        { label: "A new student from the school", emoji: "🎒" },
        { label: "Morgan's assistant from Miami", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "He used to work with Vale.",
      sayItEs: "Ejemplo: «He used to work with Vale.»",
      sayItAskEn: "What did you use to do two years ago? Use: I used to…",
      sayItAskEs: "¿Qué hacías hace dos años? Usa: I used to…",
      sayItCheck: {
        target: "I used to *",
        altTargets: ["I used to work *", "I used to study *", "I used to live *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "What did Vale use to do before English calls?",
      questionEs: "¿Qué hacía Vale antes de las llamadas en inglés?",
      options: [
        { label: "She used to hide in the bathroom", emoji: "🚪" },
        { label: "She used to cancel the calls", emoji: "❌" },
        { label: "She used to ask Dani to talk", emoji: "🙋" },
      ],
      answer: 0,
      sayIt: "She used to hide in the bathroom.",
      sayItEs: "Ejemplo: «She used to hide in the bathroom.»",
      sayItAskEn: "What is different in your life now? Use: Now I…",
      sayItAskEs: "¿Qué es diferente en tu vida ahora? Usa: Now I…",
      sayItCheck: {
        target: "Now I *",
        altTargets: ["Now I am *", "Now I study *", "Now I work *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What does Dani say about people?",
      questionEs: "¿Qué dice Dani sobre la gente?",
      options: [
        { label: "People change", emoji: "🔁" },
        { label: "People never learn", emoji: "🚫" },
        { label: "People need money first", emoji: "💵" },
      ],
      answer: 0,
      sayIt: "People change.",
      sayItEs: "Ejemplo: «People change.»",
      sayItAskEn: "Tell me one habit you had before and lost. Use: I used to… but now I…",
      sayItAskEs: "Dime un hábito que tenías antes y ya no. Usa: I used to… but now I…",
      sayItCheck: {
        target: "I used to * but now I *",
        altTargets: ["I used to *", "Now I *", "I used to * now I *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "It is not too late. I can do it.",
    es: "No es demasiado tarde. Yo puedo hacerlo.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "I compare who I was with who I am today.",
    es: "Comparo quién era con quién soy hoy.",
    model: "vale",
    modelActionEs: "Vale dibuja dos columnas: antes y ahora.",
  },
  continuePrompt: {
    en: "Tell me about your life two years ago and your life today.",
    es: "Cuéntame de tu vida hace dos años y tu vida hoy.",
  },
  continueWith: ["I used to ...", "Now I ...", "I practice ..."],
  cliffhanger: {
    en: "Episode 12: Morning or night? The team argues about which schedule is better.",
    es: "Episodio 12: ¿Mañana o noche? El equipo discute cuál horario es mejor.",
  },
};
