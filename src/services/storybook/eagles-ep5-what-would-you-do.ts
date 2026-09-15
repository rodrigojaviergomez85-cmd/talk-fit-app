import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/eagles-ep5-what-would-you-do/cover.jpg";
import s1 from "@/assets/storybook/eagles-ep5-what-would-you-do/s1.jpg";
import s2 from "@/assets/storybook/eagles-ep5-what-would-you-do/s2.jpg";
import s3 from "@/assets/storybook/eagles-ep5-what-would-you-do/s3.jpg";
import s4 from "@/assets/storybook/eagles-ep5-what-would-you-do/s4.jpg";
import s5 from "@/assets/storybook/eagles-ep5-what-would-you-do/s5.jpg";
import s6 from "@/assets/storybook/eagles-ep5-what-would-you-do/s6.jpg";
import s7 from "@/assets/storybook/eagles-ep5-what-would-you-do/s7.jpg";
import s8 from "@/assets/storybook/eagles-ep5-what-would-you-do/s8.jpg";
import s9 from "@/assets/storybook/eagles-ep5-what-would-you-do/s9.jpg";
import s10 from "@/assets/storybook/eagles-ep5-what-would-you-do/s10.jpg";

/**
 * Season 6 (Eagles) Episode 5 — "What would you do?".
 * Eagles day 5: second conditional (If I…, I would…).
 */
export const EAGLES_EP5_WHAT_WOULD_YOU_DO: StorybookEpisode = {
  id: "eagles-ep5-what-would-you-do",
  moduleId: "eagles-week-1",
  week: 1,
  title: "What would you do?",
  titleEs: "¿Qué harías tú?",
  episodeLabel: { en: "Season 6 · Episode 5", es: "Temporada 6 · Episodio 5" },
  previously: [
    { en: "The director wants to see one real class.", es: "La directora quiere ver una clase real." },
    { en: "Thursday at ten, five people from Northline.", es: "Jueves a las diez, cinco personas de Northline." },
    { en: "Camila is sick.", es: "Camila está enferma." },
  ],
  reviewWords: [
    { word: "would", es: "haría / harías" },
    { word: "demo", es: "clase de muestra" },
    { word: "chance", es: "oportunidad" },
  ],
  blurb: {
    en: "One hour before the demo class, everything goes wrong. If you were Vale, what would you do?",
    es: "Una hora antes de la clase de muestra, todo sale mal. Si fueras Vale, ¿qué harías?",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale lee un mensaje en su teléfono con cara de susto, temprano en la mañana.",
      text: "Thursday, 8:52. Eight minutes after Vale opens the school, her phone rings.",
      es: "Jueves, 8:52. Ocho minutos después de que Vale abre la escuela, suena su teléfono.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "Thursday, 8:52. Eight minutes after Vale opens the school, her phone rings.", es: "Jueves, 8:52. Ocho minutos después de que Vale abre la escuela, suena su teléfono." },
        { speaker: "camila", text: "Vale, I'm so sorry. I have a fever. I can't teach today.", es: "«Vale, lo siento mucho. Tengo fiebre. Hoy no puedo dar clase»." },
        { speaker: "vale", text: "Rest, Camila. We'll be fine.", es: "«Descansa, Camila. Vamos a estar bien»." },
      ],
      words: [
        { word: "sorry", es: "lo siento" },
        { word: "fever", es: "fiebre" },
        { word: "rest", es: "descansar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale mira el salón vacío con dos sillas de más.",
      text: "Vale looks at the empty classroom and breathes.",
      es: "Vale mira el salón vacío y respira.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "If I panicked now, I would lose the contract.", es: "«Si entrara en pánico ahora, perdería el contrato»." },
        { speaker: "dani", text: "So we're not panicking?", es: "«¿Entonces no entramos en pánico?»" },
        { speaker: "vale", text: "We're not panicking. We're moving chairs.", es: "«No entramos en pánico. Movemos sillas»." },
      ],
      words: [
        { word: "empty", es: "vacío" },
        { word: "chairs", es: "sillas" },
        { word: "lose", es: "perder" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani propone una idea señalando el plan en la pared.",
      text: "Dani proposes something risky.",
      es: "Dani propone algo arriesgado.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "If I taught the warm-up, you would have time for the call practice.", es: "«Si yo diera el calentamiento, tú tendrías tiempo para la práctica de llamadas»." },
        { speaker: "vale", text: "You've never taught a corporate group.", es: "«Nunca has dado clase a un grupo corporativo»." },
        { speaker: "dani", text: "If I never started, I would never learn.", es: "«Si nunca empezara, nunca aprendería»." },
      ],
      words: [
        { word: "taught", es: "diera clase / enseñó" },
        { word: "warm-up", es: "calentamiento" },
        { word: "learn", es: "aprender" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale le da a Dani una hoja con los primeros diez minutos de clase.",
      text: "Vale gives him the first ten minutes.",
      es: "Vale le da los primeros diez minutos.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Ten minutes. Names, one question each, energy.", es: "«Diez minutos. Nombres, una pregunta cada uno, energía»." },
        { speaker: "dani", text: "And if someone didn't answer?", es: "«¿Y si alguien no respondiera?»" },
        { speaker: "vale", text: "If someone didn't answer, I would ask an easier question.", es: "«Si alguien no respondiera, yo haría una pregunta más fácil»." },
      ],
      words: [
        { word: "names", es: "nombres" },
        { word: "energy", es: "energía" },
        { word: "easier", es: "más fácil" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Cinco personas de Northline entran al salón, curiosas y serias.",
      text: "Ten o'clock. Five people from Northline walk in.",
      es: "Diez en punto. Cinco personas de Northline entran.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "Ten o'clock. Five people from Northline walk in.", es: "Diez en punto. Cinco personas de Northline entran." },
        { speaker: "morgan", text: "Good morning! My director is watching online.", es: "«¡Buenos días! Mi directora está viendo en línea»." },
        { speaker: "vale", text: "Perfect. Please sit anywhere. This is not a show, it's a class.", es: "«Perfecto. Siéntense donde quieran. Esto no es un show, es una clase»." },
      ],
      words: [
        { word: "morning", es: "mañana" },
        { word: "watching", es: "viendo" },
        { word: "class", es: "clase" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani, nervioso pero sonriente, dirige el calentamiento frente al grupo.",
      text: "Dani starts. His voice shakes for ten seconds, then it doesn't.",
      es: "Dani empieza. Su voz tiembla diez segundos, después ya no.",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Quick question. If you had one extra hour every day, what would you do with it?", es: "«Pregunta rápida. Si tuvieran una hora extra cada día, ¿qué harían con ella?»" },
        { speaker: "morgan", text: "If I had an extra hour, I would sleep.", es: "«Si tuviera una hora extra, dormiría»." },
        { speaker: "dani", text: "Honest answer. In English. That's already a win.", es: "«Respuesta honesta. En inglés. Eso ya es una victoria»." },
      ],
      words: [
        { word: "extra", es: "extra" },
        { word: "sleep", es: "dormir" },
        { word: "honest", es: "honesta" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale pone una llamada difícil en el altavoz para el grupo.",
      text: "Vale plays a real angry client on the speaker.",
      es: "Vale pone un cliente molesto real en el altavoz.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "This client is angry and speaks fast. What would you say?", es: "«Este cliente está molesto y habla rápido. ¿Qué dirían ustedes?»" },
        { speaker: "morgan", text: "If I heard that in a real call, I would freeze.", es: "«Si escuchara eso en una llamada real, me congelaría»." },
        { speaker: "vale", text: "Then today you learn the sentence you would say instead.", es: "«Entonces hoy aprenden la frase que dirían en su lugar»." },
      ],
      words: [
        { word: "angry", es: "molesto" },
        { word: "heard", es: "escuchara / escuchó" },
        { word: "instead", es: "en su lugar" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Los cinco participantes practican en parejas, hablando en voz alta.",
      text: "For twenty minutes nobody looks at a phone.",
      es: "Durante veinte minutos nadie mira el teléfono.",
      speaker: "narrator",
      lines: [
        { speaker: "narrator", text: "For twenty minutes nobody looks at a phone.", es: "Durante veinte minutos nadie mira el teléfono." },
        { speaker: "morgan", text: "They're all talking. All five.", es: "«Están todos hablando. Los cinco»." },
        { speaker: "vale", text: "That's the whole method. People speak when they feel safe.", es: "«Ese es todo el método. La gente habla cuando se siente segura»." },
      ],
      words: [
        { word: "nobody", es: "nadie" },
        { word: "method", es: "método" },
        { word: "safe", es: "segura" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Morgan se acerca a Vale al final de la clase, seria y contenta a la vez.",
      text: "At 11:02 the class ends. Morgan stays behind.",
      es: "A las 11:02 termina la clase. Morgan se queda.",
      speaker: "morgan",
      lines: [
        { speaker: "morgan", text: "If my director said no after that, I would look for another director.", es: "«Si mi directora dijera que no después de eso, buscaría otra directora»." },
        { speaker: "vale", text: "So… is that a yes?", es: "«Entonces… ¿eso es un sí?»" },
        { speaker: "morgan", text: "It's a yes from me. She calls you tomorrow.", es: "«Es un sí de mi parte. Ella te llama mañana»." },
      ],
      words: [
        { word: "said", es: "dijera / dijo" },
        { word: "another", es: "otra" },
        { word: "tomorrow", es: "mañana" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale y Dani chocan las manos en el salón vacío después de la clase.",
      text: "The room is empty again. This time it feels different.",
      es: "El salón está vacío otra vez. Esta vez se siente diferente.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Dani, you taught your first corporate group today.", es: "«Dani, hoy diste tu primera clase a un grupo corporativo»." },
        { speaker: "dani", text: "If you didn't trust me, I would still be watching from a chair.", es: "«Si no confiaras en mí, todavía estaría mirando desde una silla»." },
        { speaker: "vale", text: "If we win this contract, everything changes.", es: "«Si ganamos este contrato, todo cambia»." },
      ],
      words: [
        { word: "trust", es: "confiar" },
        { word: "still", es: "todavía" },
        { word: "changes", es: "cambia" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What did Dani say about never starting?",
      questionEs: "¿Qué dijo Dani sobre nunca empezar?",
      options: [
        { label: "If he never started, he would never learn", emoji: "🚀" },
        { label: "He would teach next year", emoji: "📆" },
        { label: "He would call Camila", emoji: "📱" },
      ],
      answer: 0,
      sayIt: "If I never started, I would never learn.",
      sayItEs: "Ejemplo: «If I never started, I would never learn.»",
      sayItAskEn: "If you had one free day tomorrow, what would you do?",
      sayItAskEs: "Si tuvieras un día libre mañana, ¿qué harías?",
      sayItCheck: {
        target: "If I had *, I would *",
        altTargets: ["If I had a free day, I would *", "I would *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What did Morgan answer in the warm-up?",
      questionEs: "¿Qué respondió Morgan en el calentamiento?",
      options: [
        { label: "If she had an extra hour, she would sleep", emoji: "😴" },
        { label: "She would study grammar", emoji: "📗" },
        { label: "She would call her team", emoji: "☎️" },
      ],
      answer: 0,
      sayIt: "If I had an extra hour, I would sleep.",
      sayItEs: "Ejemplo: «If I had an extra hour, I would sleep.»",
      sayItAskEn: "If you spoke perfect English today, what would you do first?",
      sayItAskEs: "Si hablaras inglés perfecto hoy, ¿qué harías primero?",
      sayItCheck: {
        target: "If I spoke *, I would *",
        altTargets: ["If I spoke perfect English, I would *", "I would *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What did Morgan say at the end of the class?",
      questionEs: "¿Qué dijo Morgan al final de la clase?",
      options: [
        { label: "It's a yes from her, and the director calls tomorrow", emoji: "✅" },
        { label: "The class was too short", emoji: "⏳" },
        { label: "She chose the other school", emoji: "❌" },
      ],
      answer: 0,
      sayIt: "It's a yes from her. The director calls tomorrow.",
      sayItEs: "Ejemplo: «It's a yes from her. The director calls tomorrow.»",
      sayItAskEn: "A friend is afraid to speak English in public. What would you do in that situation?",
      sayItAskEs: "Un amigo tiene miedo de hablar inglés en público. ¿Qué harías tú en esa situación?",
      sayItCheck: {
        target: "I would *",
        altTargets: ["In that situation I would *", "If I were *, I would *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s2",
    phrase: "I am nervous, but I can try.",
    es: "Estoy nerviosa, pero puedo intentarlo.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "I give people a real chance. People grow when someone trusts them first.",
    es: "Le doy a la gente una oportunidad real. La gente crece cuando alguien confía primero.",
    model: "vale",
    modelActionEs: "Vale le entrega a Dani los primeros diez minutos de la clase.",
  },
  continuePrompt: {
    en: "Imagine a different life for one minute. If you had more time, what would you do? If you lived in another country, what would change?",
    es: "Imagina otra vida por un minuto. Si tuvieras más tiempo, ¿qué harías? Si vivieras en otro país, ¿qué cambiaría?",
  },
  continueWith: ["If I had ..., I would ...", "I would ...", "If I lived ..., I would ..."],
  cliffhanger: {
    en: "Episode 6: The contract is signed. And Vale looks back at the girl who was answering calls two years ago.",
    es: "Episodio 6: El contrato está firmado. Y Vale mira atrás, a la muchacha que contestaba llamadas hace dos años.",
  },
};
