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
  title: "First day as director",
  titleEs: "Primer día como director",
  episodeLabel: {
    en: "Advanced 1 · Episode 18",
    es: "Advanced 1 · Episodio 18",
  },
  previously: [
    {
      en: "Northline signed a ten-million-dollar international expansion.",
      es: "Northline firmó una expansión internacional de diez millones de dólares.",
    },
    {
      en: "Vale became CEO of Vale Kids and Vale Adults.",
      es: "Vale se convirtió en CEO de Vale Kids y Vale Adults.",
    },
    {
      en: "Dani became Director of Operations, and Camila became Financial Manager.",
      es: "Dani se convirtió en Director de Operaciones, y Camila en gerente financiera.",
    },
  ],
  reviewWords: [
    { word: "contract", es: "contrato" },
    { word: "expansion", es: "expansión" },
    { word: "responsibility", es: "responsabilidad" },
    { word: "cash flow", es: "flujo de caja" },
    { word: "worldwide", es: "a nivel mundial" },
  ],
  blurb: {
    en: "Dani wanted a title. By lunch, the title wants him back.",
    es: "Dani quería un título. Para el almuerzo, el título ya lo quiere de regreso.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Dani arrives early on his first morning as Director of Operations.",
      text: "Thursday, director mode.",
      es: "Jueves, modo director.",
      speaker: "dani",
      cast: ["dani", "camila"],
      lines: [
        { speaker: "dani", text: "I arrived thirty minutes early to look responsible, and the printer immediately attacked me.", es: "Llegué treinta minutos temprano para verme responsable, y la impresora me atacó de inmediato." },
        { speaker: "camila", text: "Congratulations. Management is mostly being disrespected by machines with confidence.", es: "Felicidades. La gerencia es principalmente ser irrespetado por máquinas con confianza." },
        { speaker: "dani", text: "I thought the first crisis would be strategic.", es: "Pensé que la primera crisis sería estratégica." },
        { speaker: "camila", text: "It is. If you cannot handle paper, wait until you handle people.", es: "Lo es. Si no puedes manejar papel, espera a manejar personas." },
      ],
      words: [
        { word: "responsible", es: "responsable" },
        { word: "management", es: "gerencia" },
        { word: "strategic", es: "estratégico" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale gives Dani the first operations dashboard for the expansion.",
      text: "Vale hands over the dashboard.",
      es: "Vale entrega el tablero.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        { speaker: "vale", text: "This dashboard is yours now: teachers, rooms, attendance, delays and every tiny problem that pretends to be harmless.", es: "Este tablero ahora es tuyo: maestros, salones, asistencia, retrasos y cada problemita que finge ser inofensivo." },
        { speaker: "dani", text: "So basically a video game where every button emails me.", es: "Básicamente un videojuego donde cada botón me manda un correo." },
        { speaker: "vale", text: "Exactly. Your job is not to panic faster; it is to slow the room down enough to choose well.", es: "Exacto. Tu trabajo no es entrar en pánico más rápido; es desacelerar la sala lo suficiente para elegir bien." },
        { speaker: "dani", text: "I can do that, unless the dashboard starts blinking in red, in which case I will become furniture.", es: "Puedo hacerlo, a menos que el tablero empiece a parpadear en rojo; en ese caso me convierto en mueble." },
      ],
      words: [
        { word: "dashboard", es: "tablero" },
        { word: "harmless", es: "inofensivo" },
        { word: "blinking", es: "parpadeando" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "A teacher asks Dani for help with a full classroom schedule.",
      text: "The first real ask.",
      es: "La primera petición real.",
      speaker: "lidia",
      cast: ["lidia", "dani", "vale"],
      lines: [
        { speaker: "lidia", text: "Director Dani, before your title gets too shiny: the adults class is full, Vale Kids needs the same room, and the new teacher is nervous.", es: "Director Dani, antes de que tu título brille demasiado: la clase de adultos está llena, Vale Kids necesita el mismo salón y la maestra nueva está nerviosa." },
        { speaker: "dani", text: "Please never say Director Dani again while holding bad news.", es: "Por favor nunca digas Director Dani otra vez mientras traes malas noticias." },
        { speaker: "vale", text: "Answer the problem, not the nickname.", es: "Responde al problema, no al apodo." },
        { speaker: "dani", text: "We split the first ten minutes. Adults start with conversation in reception; Kids uses the room for warm-up, then we swap.", es: "Dividimos los primeros diez minutos. Adultos empieza con conversación en recepción; Kids usa el salón para calentamiento, luego cambiamos." },
      ],
      words: [
        { word: "nickname", es: "apodo" },
        { word: "warm-up", es: "calentamiento" },
        { word: "swap", es: "intercambiar" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Camila checks the budget while Dani defends his schedule change.",
      text: "Camila checks the math.",
      es: "Camila revisa los números.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        { speaker: "camila", text: "That fixes the room, but it adds overtime. The contract is huge, not infinite.", es: "Eso arregla el salón, pero agrega horas extra. El contrato es enorme, no infinito." },
        { speaker: "dani", text: "Then we work out a cleaner option before Friday. For today, the cost of confusion is higher than the cost of ten minutes.", es: "Entonces buscamos una opción más limpia antes del viernes. Por hoy, el costo de la confusión es mayor que el costo de diez minutos." },
        { speaker: "camila", text: "That sounded like management. I'm uncomfortable and proud.", es: "Eso sonó a gerencia. Estoy incómoda y orgullosa." },
        { speaker: "dani", text: "Please write that on my performance review, but with fewer feelings.", es: "Por favor escribe eso en mi evaluación, pero con menos sentimientos." },
      ],
      words: [
        { word: "overtime", es: "horas extra" },
        { word: "infinite", es: "infinito" },
        { word: "performance review", es: "evaluación de desempeño" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale teaches Dani how to prioritize without sounding defensive.",
      text: "Vale coaches the priority.",
      es: "Vale entrena la prioridad.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        { speaker: "vale", text: "Now say it as a manager: not funny, not apologetic, clear.", es: "Ahora dilo como gerente: no gracioso, no disculpándote, claro." },
        { speaker: "dani", text: "We will keep the speaking minutes, absorb ten minutes of overtime today and come back with a cheaper schedule by Friday.", es: "Mantendremos los minutos de habla, absorberemos diez minutos de horas extra hoy y volveremos con un horario más barato para el viernes." },
        { speaker: "vale", text: "Better. When pressure goes up, language must get simpler, not louder.", es: "Mejor. Cuando sube la presión, el lenguaje debe volverse más simple, no más ruidoso." },
        { speaker: "dani", text: "So my personality is not the strategy? Devastating, but noted.", es: "Entonces mi personalidad no es la estrategia. Devastador, pero anotado." },
      ],
      words: [
        { word: "apologetic", es: "que se disculpa demasiado" },
        { word: "absorb", es: "absorber" },
        { word: "devastating", es: "devastador" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Keller calls with a first client-service warning for Dani.",
      text: "Keller tests the new director.",
      es: "Keller prueba al nuevo director.",
      speaker: "keller",
      cast: ["keller", "dani", "vale"],
      lines: [
        { speaker: "keller", text: "I heard the room changed twice this morning. Should I be worried or impressed?", es: "Escuché que cambiaron el salón dos veces esta mañana. ¿Debería preocuparme o impresionarme?" },
        { speaker: "dani", text: "Worried would be fair if students lost speaking time. They did not. We adjusted the route, not the promise.", es: "Preocuparse sería justo si los estudiantes hubieran perdido tiempo de habla. No lo perdieron. Ajustamos la ruta, no la promesa." },
        { speaker: "keller", text: "And if that happens in three countries at once?", es: "¿Y si eso pasa en tres países a la vez?" },
        { speaker: "dani", text: "Then I do not improvise heroically. I escalate early, name the trade-off and protect the class objective.", es: "Entonces no improviso heroicamente. Escalo temprano, nombro el intercambio y protejo el objetivo de la clase." },
      ],
      words: [
        { word: "adjusted", es: "ajustamos" },
        { word: "escalate", es: "elevar, escalar" },
        { word: "trade-off", es: "intercambio, sacrificio" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale asks the learner to respond like a new manager under pressure.",
      text: "Your turn: pressure answer.",
      es: "Tu turno: respuesta bajo presión.",
      speaker: "vale",
      cast: ["vale", "dani"],
      lines: [
        { speaker: "vale", text: "Your turn. A client hears there was a schedule problem. Explain it without hiding it and without making it sound worse.", es: "Tu turno. Un cliente escucha que hubo un problema de horario. Explícalo sin esconderlo y sin hacerlo sonar peor." },
        { speaker: "dani", text: "Do not say, 'Everything is on fire, but with leadership.' I tried it in my head. Bad brand.", es: "No digas: 'Todo está en llamas, pero con liderazgo'. Lo intenté en mi mente. Mala marca." },
        { speaker: "vale", text: "Say what changed, what did not change and what you will do next.", es: "Di qué cambió, qué no cambió y qué harás después." },
      ],
      words: [
        { word: "client", es: "cliente" },
        { word: "changed", es: "cambió" },
        { word: "brand", es: "marca" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Camila and Dani debrief after the first difficult morning.",
      text: "The debrief.",
      es: "El resumen después.",
      speaker: "camila",
      cast: ["camila", "dani"],
      lines: [
        { speaker: "camila", text: "You got through day one without losing a room, a teacher or your soul. That is statistically promising.", es: "Pasaste el día uno sin perder un salón, una maestra ni tu alma. Eso es estadísticamente prometedor." },
        { speaker: "dani", text: "I did have to give up the idea that being manager means looking calm.", es: "Sí tuve que renunciar a la idea de que ser gerente significa verse calmado." },
        { speaker: "camila", text: "Correct. It means making the least dramatic useful decision while your stomach produces a telenovela.", es: "Correcto. Significa tomar la decisión útil menos dramática mientras tu estómago produce una telenovela." },
        { speaker: "dani", text: "I feel attacked, educated and seen.", es: "Me siento atacado, educado y entendido." },
      ],
      words: [
        { word: "got through", es: "superó, salió adelante" },
        { word: "give up", es: "renunciar a" },
        { word: "telenovela", es: "telenovela" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale closes the day by warning Dani about his next leadership test.",
      text: "Vale names the next test.",
      es: "Vale nombra la próxima prueba.",
      speaker: "vale",
      cast: ["vale", "dani", "camila"],
      lines: [
        { speaker: "vale", text: "Today was logistics. Tomorrow is people. Advanced 2 will not ask whether you can plan; it will ask whether you can stay human when someone is upset.", es: "Hoy fue logística. Mañana serán personas. Advanced 2 no preguntará si puedes planear; preguntará si puedes mantenerte humano cuando alguien está molesto." },
        { speaker: "dani", text: "So the sequel is emotional damage with better vocabulary.", es: "Entonces la secuela es daño emocional con mejor vocabulario." },
        { speaker: "camila", text: "Finally, marketing copy I believe.", es: "Por fin, texto de marketing que sí creo." },
      ],
      words: [
        { word: "logistics", es: "logística" },
        { word: "sequel", es: "secuela" },
        { word: "upset", es: "molesto" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s6",
      questionEn: "How does Dani explain the room problem to Keller?",
      questionEs: "¿Cómo le explica Dani el problema del salón a Keller?",
      options: [
        { label: "They adjusted the route, not the promise", emoji: "🧭" },
        { label: "They cancelled the class immediately", emoji: "🚫" },
        { label: "They blamed the new teacher", emoji: "👉" },
      ],
      answer: 0,
      sayIt: "They adjusted the route, not the promise.",
      sayItEs: "Ajustaron la ruta, no la promesa.",
      sayItCheck: {
        target: "They adjusted the route, not the promise",
        altTargets: ["We adjusted the route, not the promise", "The route changed, not the promise"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "Explain a schedule problem: what changed, what did not change, and what happens next.",
      questionEs: "Explica un problema de horario: qué cambió, qué no cambió y qué pasa después.",
      options: [
        { label: "I am ready to answer", emoji: "🎤" },
        { label: "I want to hear the example again", emoji: "👂" },
        { label: "I will practice later", emoji: "⏰" },
      ],
      answer: 0,
      sayIt: "The room changed this morning, but the speaking time did not change. We solved it today, and by Friday we will send the cleaner schedule.",
      sayItEs: "El salón cambió esta mañana, pero el tiempo de habla no cambió. Lo resolvimos hoy, y para el viernes enviaremos el horario más claro.",
      sayItAskEn: "Three moves: what changed, what stayed the same, what happens next.",
      sayItAskEs: "Tres movimientos: qué cambió, qué siguió igual, qué pasa después.",
      sayItCheck: {
        target: "The * changed",
        altTargets: ["What changed was *", "The room changed *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "When pressure goes up, my language gets clearer.",
    es: "Cuando sube la presión, mi lenguaje se vuelve más claro.",
  },
  habitCard: {
    afterScene: "s2",
    phrase: "I slow the room down before I decide.",
    es: "Bajo la velocidad de la sala antes de decidir.",
    model: "dani",
    modelActionEs: "Dani aprendió a explicar cambios sin esconder el problema ni exagerarlo.",
  },
  expressions: [
    {
      phrase: "work out",
      variants: ["works out", "worked out", "working out"],
      es: "resolver, encontrar una solución",
      kind: "phrasal",
      example: "Then we work out a cleaner option before Friday.",
      exampleEs: "Entonces buscamos una opción más limpia antes del viernes.",
    },
    {
      phrase: "get through",
      variants: ["gets through", "got through", "getting through"],
      es: "superar, salir adelante",
      kind: "phrasal",
      example: "You got through day one without losing a room.",
      exampleEs: "Pasaste el día uno sin perder un salón.",
    },
    {
      phrase: "on fire",
      variants: ["everything is on fire"],
      es: "en caos, en crisis",
      kind: "idiom",
      example: "Everything is on fire, but with leadership.",
      exampleEs: "Todo está en caos, pero con liderazgo.",
    },
    {
      phrase: "the least dramatic useful decision",
      es: "la decisión útil menos dramática",
      kind: "idiom",
      example: "It means making the least dramatic useful decision.",
      exampleEs: "Significa tomar la decisión útil menos dramática.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Thirty seconds: explain a small crisis without hiding it or making it dramatic.",
    es: "Treinta segundos: explica una crisis pequeña sin esconderla ni hacerla dramática.",
  },
  continueWith: [
    "What changed was ...",
    "What stayed the same was ...",
    "By Friday, we will ...",
  ],
  cliffhanger: {
    en: "Dani survives day one as director. Next comes the part no spreadsheet can protect him from: people.",
    es: "Dani sobrevive el día uno como director. Luego viene la parte de la que ninguna hoja de cálculo lo protege: la gente.",
  },
};
