import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/advanced1-ep5-pressure-round/cover.jpg";
import s1 from "@/assets/storybook/advanced1-ep5-pressure-round/s1.jpg";
import s2 from "@/assets/storybook/advanced1-ep5-pressure-round/s2.jpg";
import s3 from "@/assets/storybook/advanced1-ep5-pressure-round/s3.jpg";
import s4 from "@/assets/storybook/advanced1-ep5-pressure-round/s4.jpg";
import s5 from "@/assets/storybook/advanced1-ep5-pressure-round/s5.jpg";
import s6 from "@/assets/storybook/advanced1-ep5-pressure-round/s6.jpg";
import s7 from "@/assets/storybook/advanced1-ep5-pressure-round/s7.jpg";
import s8 from "@/assets/storybook/advanced1-ep5-pressure-round/s8.jpg";
import s9 from "@/assets/storybook/advanced1-ep5-pressure-round/s9.jpg";

export const ADVANCED1_EP5_PRESSURE_ROUND: StorybookEpisode = {
  id: "advanced1-ep5-pressure-round",
  moduleId: "advanced-1",
  week: 1,
  title: "Pressure round",
  titleEs: "Ronda de presión",
  episodeLabel: {
    en: "Advanced 1 · Episode 5",
    es: "Advanced 1 · Episodio 5",
  },
  previously: [
    {
      en: "Vale gave the only honest weakness the committee heard all day.",
      es: "Vale dio la única debilidad honesta que el comité escuchó en todo el día.",
    },
    {
      en: "Reed said week one ends with a pressure round on Friday.",
      es: "Reed dijo que la semana uno termina con una ronda de presión el viernes.",
    },
    {
      en: "Fast questions, interruptions, and no mercy, for the whole team.",
      es: "Preguntas rápidas, interrupciones y sin piedad, para todo el equipo.",
    },
  ],
  reviewWords: [
    { word: "weakness", es: "debilidad" },
    { word: "progress", es: "progreso" },
    { word: "proof", es: "prueba" },
    { word: "honest", es: "honesto" },
    { word: "committee", es: "comité" },
  ],
  blurb: {
    en: "Reed plays a brutal recruiter and interrupts every answer, and the team learns that calm is a skill, not a personality.",
    es: "Reed hace de reclutador brutal e interrumpe cada respuesta, y el equipo aprende que la calma es una habilidad, no una personalidad.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale, Dani and Camila stand together before the call, breathing and getting ready.",
      text: "Before the round, Vale repeats the three rules of pressure.",
      es: "Antes de la ronda, Vale repite las tres reglas de la presión.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Remember the rules of pressure: breathe, buy time politely, and answer the question you were asked, not the one you were afraid of.",
          es: "Recuerden las reglas de la presión: respiren, ganen tiempo con cortesía, y respondan la pregunta que les hicieron, no la que temían.",
        },
        {
          speaker: "dani",
          text: "How do you buy time in English without sounding lost?",
          es: "¿Cómo ganas tiempo en inglés sin sonar perdido?",
        },
        {
          speaker: "vale",
          text: "With three phrases I have been teaching for years: that is a good question; let me think for a second; if I understand correctly, what you are asking is... If you use them, nobody hears a pause; they hear a professional.",
          es: "Con tres frases que llevo años enseñando: esa es una buena pregunta; déjame pensar un segundo; si entiendo bien, lo que me preguntas es... Si las usas, nadie escucha una pausa; escuchan a un profesional.",
        },
      ],
      words: [
        { word: "pressure", es: "presión" },
        { word: "breathe", es: "respirar" },
        { word: "politely", es: "con cortesía" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Mr. Reed appears cold and impatient on the laptop screen while the three of them sit very straight.",
      text: "Reed becomes a recruiter with six minutes and no patience.",
      es: "Reed se convierte en un reclutador con seis minutos y sin paciencia.",
      speaker: "reed",
      cast: ["vale", "dani", "camila", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Good morning. I have six minutes and nine academies to review. Why is yours not a waste of my time?",
          es: "Buenos días. Tengo seis minutos y nueve academias que revisar. ¿Por qué la suya no es una pérdida de mi tiempo?",
        },
        {
          speaker: "camila",
          text: "That is a direct question. Because our students speak from day one, and our completion rate is double the regional average; that being said, the number is audited, not estimated.",
          es: "Esa es una pregunta directa. Porque nuestros estudiantes hablan desde el día uno, y nuestra tasa de finalización es el doble del promedio regional; dicho eso, ese número está auditado, no estimado.",
        },
        {
          speaker: "reed",
          text: "Numbers. Everyone has numbers. What makes yours real?",
          es: "Números. Todos tienen números. ¿Qué hace reales a los tuyos?",
        },
      ],
      words: [
        { word: "waste", es: "pérdida; desperdicio" },
        { word: "completion", es: "finalización" },
        { word: "average", es: "promedio" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Camila is interrupted mid-sentence and finds one short answer, hands steady on the table.",
      text: "The first interruption. Camila has to find one sentence.",
      es: "La primera interrupción. Camila tiene que encontrar una sola oración.",
      speaker: "camila",
      cast: ["camila", "reed"],
      lines: [
        {
          speaker: "camila",
          text: "We record every practice, so the data comes from...",
          es: "Grabamos cada práctica, así que los datos vienen de...",
        },
        {
          speaker: "reed",
          text: "Excuse me, answer in one sentence. What makes your numbers real?",
          es: "Disculpa, responde en una oración. ¿Qué hace reales a tus números?",
        },
        {
          speaker: "camila",
          text: "One sentence: every number is taken from a recorded student voice, not from a survey.",
          es: "Una oración: cada número se toma de una voz de estudiante grabada, no de una encuesta.",
        },
      ],
      words: [
        { word: "recorded", es: "grabada" },
        { word: "survey", es: "encuesta" },
        { word: "sentence", es: "oración" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani answers a hard question calmly while Reed watches from the screen with a fixed stare.",
      text: "Reed asks Dani for a failure, and Dani buys two seconds to think.",
      es: "Reed le pide a Dani un fracaso, y Dani gana dos segundos para pensar.",
      speaker: "dani",
      cast: ["dani", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Dani. You coordinate three countries. That sounds too big for one person. Tell me one time you failed at it.",
          es: "Dani. Coordinas tres países. Eso suena demasiado grande para una persona. Dime una vez que fallaste.",
        },
        {
          speaker: "dani",
          text: "Let me think for a second. Last year, a group was left without a teacher for a whole day because of a scheduling error I had approved. I owned the mistake, called every family, and built a double-check system; since then, no class has been missed.",
          es: "Déjame pensar un segundo. El año pasado, un grupo se quedó sin maestro un día entero por un error de horario que yo había aprobado. Asumí el error, llamé a cada familia y construí un sistema de doble verificación; desde entonces, no se ha perdido ninguna clase.",
        },
        {
          speaker: "reed",
          text: "You admitted a failure fast. Interesting.",
          es: "Admitiste un fracaso rápido. Interesante.",
        },
      ],
      words: [
        { word: "schedule", es: "horario" },
        { word: "failure", es: "fracaso" },
        { word: "admitted", es: "admitiste" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale faces the hardest attack of the day and answers with a steady, warm expression.",
      text: "Then Reed attacks Vale where it hurts: her accent.",
      es: "Luego Reed ataca a Vale donde duele: su acento.",
      speaker: "vale",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Vale. Your academy is small, your founder is an accountant, and your English has an accent. Why should an international program bet on you?",
          es: "Vale. Tu academia es pequeña, tu fundadora es contadora, y tu inglés tiene acento. ¿Por qué debería un programa internacional apostar por ti?",
        },
        {
          speaker: "vale",
          text: "That is a fair question. Small means decisions are made in a day, not a quarter. An accountant means every dollar is measured before it is spent. And what you call an accent is proof of the method: I learned this language as an adult and I have been teaching it for eight years, which is exactly the road your employees would walk.",
          es: "Esa es una pregunta justa. Pequeño significa que las decisiones se toman en un día, no en un trimestre. Una contadora significa que cada dólar se mide antes de gastarse. Y lo que usted llama acento es la prueba del método: aprendí este idioma de adulta y llevo ocho años enseñándolo, que es exactamente el camino que recorrerían sus empleados.",
        },
        {
          speaker: "reed",
          text: "That is the best answer of the day.",
          es: "Esa es la mejor respuesta del día.",
        },
      ],
      words: [
        { word: "accent", es: "acento" },
        { word: "fair", es: "justa" },
        { word: "measured", es: "medido" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "The pressure ends and the three of them exhale, shoulders finally relaxed.",
      text: "Pressure off. The interruption did something useful.",
      es: "Presión apagada. La interrupción hizo algo útil.",
      speaker: "camila",
      cast: ["vale", "dani", "camila", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Pressure off. How did that feel?",
          es: "Presión apagada. ¿Cómo se sintió?",
        },
        {
          speaker: "camila",
          text: "Horrible; however, it was useful. What the interruption did was force me to find the one sentence that actually matters.",
          es: "Horrible; sin embargo, fue útil. Lo que hizo la interrupción fue obligarme a encontrar la única oración que de verdad importa.",
        },
        {
          speaker: "dani",
          text: "Buying time worked. If I had answered immediately, I would have rambled; those two seconds gave me my whole answer.",
          es: "Ganar tiempo funcionó. Si hubiera respondido de inmediato, habría divagado; esos dos segundos me dieron toda mi respuesta.",
        },
      ],
      words: [
        { word: "interruption", es: "interrupción" },
        { word: "horrible", es: "horrible" },
        { word: "useful", es: "útil" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale talks with Reed on the screen about what pressure does to an answer.",
      text: "The lesson of the week: pressure removes decoration.",
      es: "La lección de la semana: la presión quita la decoración.",
      speaker: "vale",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "vale",
          text: "I noticed something I want my students to hear: the faster your questions came, the shorter our answers became. What pressure removes is decoration, and what is left is the argument.",
          es: "Noté algo que quiero que escuchen mis estudiantes: mientras más rápido llegaban tus preguntas, más cortas se volvían nuestras respuestas. Lo que la presión quita es la decoración, y lo que queda es el argumento.",
        },
        {
          speaker: "reed",
          text: "Exactly. Under pressure, nobody sounds perfect. The winners are the ones who stay calm and keep answering the real question.",
          es: "Exacto. Bajo presión, nadie suena perfecto. Los ganadores son los que mantienen la calma y siguen respondiendo la pregunta real.",
        },
        {
          speaker: "vale",
          text: "Calm is a skill, not a personality, and pressure can turn into practice. We can train it.",
          es: "La calma es una habilidad, no una personalidad, y la presión puede convertirse en práctica. Podemos entrenarla.",
        },
      ],
      words: [
        { word: "decoration", es: "decoración" },
        { word: "calm", es: "calma" },
        { word: "skill", es: "habilidad" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "The team writes the five things they survived this week on the office whiteboard.",
      text: "Week one closes with five things they can do now.",
      es: "La semana uno cierra con cinco cosas que ya pueden hacer.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Week one is done. We introduced ourselves, told a real story, defended our value, admitted a weakness, and survived the pressure round.",
          es: "La semana uno terminó. Nos presentamos, contamos una historia real, defendimos nuestro valor, admitimos una debilidad, y sobrevivimos la ronda de presión.",
        },
        {
          speaker: "dani",
          text: "And the committee still has three more weeks to test us.",
          es: "Y el comité todavía tiene tres semanas más para probarnos.",
        },
        {
          speaker: "camila",
          text: "Then we keep training. Pressure is just practice with a faster heartbeat.",
          es: "Entonces seguimos entrenando. La presión es solo práctica con el corazón más acelerado.",
        },
      ],
      words: [
        { word: "survived", es: "sobrevivimos" },
        { word: "defended", es: "defendimos" },
        { word: "heartbeat", es: "latido" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Reed delivers blunt feedback about the written proposal while Vale stares at the document on screen.",
      text: "One sentence from Reed ruins the weekend: the proposal is boring.",
      es: "Una frase de Reed arruina el fin de semana: la propuesta es aburrida.",
      speaker: "reed",
      cast: ["vale", "reed"],
      lines: [
        {
          speaker: "reed",
          text: "Vale, I read the first draft of your written proposal. I am going to be honest: it is boring. It sounds like a bank wrote it.",
          es: "Vale, leí el primer borrador de tu propuesta escrita. Voy a ser honesto: es aburrida. Suena como si la hubiera escrito un banco.",
        },
        {
          speaker: "reed",
          text: "Fix it before the committee reads it on Monday.",
          es: "Arréglala antes de que el comité la lea el lunes.",
        },
        {
          speaker: "vale",
          text: "Boring. He said boring. Emergency meeting. We have one weekend to give this proposal a heartbeat.",
          es: "Aburrida. Dijo aburrida. Reunión de emergencia. Tenemos un fin de semana para darle un latido a esta propuesta.",
        },
      ],
      words: [
        { word: "draft", es: "borrador" },
        { word: "proposal", es: "propuesta" },
        { word: "fix", es: "arreglar" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s5",
      questionEn: "How does Vale answer the attack about her accent?",
      questionEs: "¿Cómo responde Vale al ataque sobre su acento?",
      options: [
        { label: "She says her accent is proof of the method, because she learned English as an adult", emoji: "🗣️" },
        { label: "She apologizes and promises to remove it", emoji: "🙇" },
        { label: "She asks Dani to answer for her", emoji: "🙈" },
      ],
      answer: 0,
      sayIt: "My accent is proof of the method, because I learned English as an adult.",
      sayItEs: "Mi acento es prueba del método, porque aprendí inglés de adulta.",
      sayItCheck: {
        target: "My accent is proof of the method",
        altTargets: [
          "Her accent is proof of the method",
          "My accent is proof because I learned English as an adult",
        ],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Thirty seconds under pressure: a recruiter says your English has an accent. Buy time politely, accept the fact, and turn it into evidence of what you can do.",
      questionEs: "Treinta segundos bajo presión: un reclutador dice que tu inglés tiene acento. Gana tiempo con cortesía, acepta el hecho y conviértelo en evidencia de lo que puedes hacer.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "That is a fair question. Yes, I have an accent, and what it proves is that I learned English as an adult while I was working full time. If your team needed someone who understands that effort, I would be that person.",
      sayItEs: "Esa es una pregunta justa. Sí, tengo acento, y lo que eso prueba es que aprendí inglés de adulto mientras trabajaba tiempo completo. Si su equipo necesitara a alguien que entienda ese esfuerzo, yo sería esa persona.",
      sayItAskEn: "Your English has an accent. Why should we choose you?",
      sayItAskEs: "Tu inglés tiene acento. ¿Por qué deberíamos elegirte?",
      sayItCheck: {
        target: "Yes, I have an accent *",
        altTargets: ["I have an accent *", "My accent *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "Calm is a skill, not a personality.",
    es: "La calma es una habilidad, no una personalidad.",
  },
  habitCard: {
    afterScene: "s1",
    phrase: "When a question is hard, I buy time politely and then answer it.",
    es: "Cuando una pregunta es difícil, gano tiempo con cortesía y luego la respondo.",
    model: "vale",
    modelActionEs: "Vale le dio al equipo frases simples para ganar dos segundos sin sonar perdidos.",
  },
  expressions: [
    {
      phrase: "bet on",
      variants: ["bets on", "betting on"],
      es: "apostar por",
      kind: "phrasal",
      example: "Why should an international program bet on you?",
      exampleEs: "¿Por qué debería un programa internacional apostar por ti?",
    },
    {
      phrase: "turn into",
      variants: ["turns into", "turned into", "turning into"],
      es: "convertirse en",
      kind: "phrasal",
      example: "Pressure can turn into practice.",
      exampleEs: "La presión puede convertirse en práctica.",
    },
    {
      phrase: "buy time",
      variants: ["buys time", "bought time", "buying time"],
      es: "ganar tiempo",
      kind: "idiom",
      example: "Breathe, buy time politely, and answer the question they asked.",
      exampleEs: "Respira, gana tiempo con cortesía, y responde la pregunta que te hicieron.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds under pressure: answer a hard question calmly and turn it into a strength.",
    es: "Treinta segundos bajo presión: responde una pregunta difícil con calma y conviértela en fortaleza.",
  },
  continueWith: [
    "That is a fair question.",
    "Let me think for a second.",
    "Yes, and that is exactly why ...",
  ],
  cliffhanger: {
    en: "Reed says the written proposal is boring. The team has one weekend to give it a heartbeat.",
    es: "Reed dice que la propuesta escrita es aburrida. El equipo tiene un fin de semana para darle un latido.",
  },
};
