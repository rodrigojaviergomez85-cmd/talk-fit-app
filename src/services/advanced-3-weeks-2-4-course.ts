/**
 * ADVANCED 3 — BEYOND THE SCRIPT · Days 6–20.
 *
 * WEEK 2 — TAKE A POSITION (DECIDE)
 * WEEK 3 — HANDLE THE UNFAMILIAR (ADAPT)
 * WEEK 4 — REFLECT & CONNECT (REFLECT)
 *
 * Support decreases every week: Week 2 keeps the framework but fewer sentence
 * starters, Week 3 keeps only key cues, Week 4 gives mostly the question alone.
 * Day 20 has no model answer and no toolbox at all.
 *
 * DATA SAFETY: `a3d*` ids are persisted in progress and recordings. Never rename.
 * Every questioner turn is FIXED and prewritten — no generative AI.
 */
import type { CourseDay, TestReadySprint } from "@/lib/types";
import { l, q, chunks4 } from "./course-builders";
import {
  advanced3Day,
  answerTypeTurn,
  repairTurn,
  turn,
  ALL_ANSWER_TYPES,
  DEVELOP,
  QUESTIONER,
  START,
  SUSTAIN,
} from "./advanced-3-course";

/* ============================ DAY 6 — GIVE A CLEAR OPINION ============================ */

const d6Sprint: TestReadySprint = {
  type: "quick-answers",
  title: "QUICK ANSWERS",
  titleEs: "RESPUESTAS RÁPIDAS",
  instruction: "Give your position and one reason. Two sentences maximum.",
  instructionEs: "Da tu posición y una razón. Máximo dos oraciones.",
  items: [
    { id: "a3d6-qa1", audio: "Do you think AI will replace some jobs?", maxSeconds: 20 },
    { id: "a3d6-qa2", audio: "Should children learn a second language before the age of six?", maxSeconds: 20 },
    { id: "a3d6-qa3", audio: "Is it better to be fast or to be careful at work?", maxSeconds: 20 },
    { id: "a3d6-qa4", audio: "Do people trust online information too much?", maxSeconds: 20 },
    { id: "a3d6-qa5", audio: "Should companies pay for their employees' training?", maxSeconds: 20 },
  ],
};

const d6 = advanced3Day({
  day: 6,
  topic: "Give a Clear Opinion",
  topicEs: "Da una opinión clara",
  focus: "Opinion without rambling — POSITION → WHY → EXAMPLE → CLOSE",
  focusEs: "Opinión sin divagar — POSICIÓN → POR QUÉ → EJEMPLO → CIERRE",
  intro: {
    title: "GIVE A CLEAR OPINION",
    titleEs: "DA UNA OPINIÓN CLARA",
    lead: "Say your position in the first sentence. Then one reason, one example, and close. You can agree, disagree, or be uncertain — but be clear.",
    leadEs: "Di tu posición en la primera oración. Luego una razón, un ejemplo y cierra. Puedes estar de acuerdo, en desacuerdo o dudar — pero sé claro/a.",
    examples: ["Personally, I think…", "The main reason is…", "For example…"],
    goal: "Give a clear opinion for 40–55 seconds and defend it once.",
    goalEs: "Da una opinión clara 40–55 segundos y defiéndela una vez.",
    cta: START,
  },
  lines: [
    l("a3d6-1", "Personally, I think | AI will replace some jobs, but not as many as people say.", "Personalmente, creo que la IA reemplazará algunos trabajos, pero no tantos como dice la gente."),
    l("a3d6-2", "The main reason is | that most jobs are a mix of tasks, not one task.", "La razón principal es que la mayoría de los trabajos son una mezcla de tareas, no una sola tarea."),
    l("a3d6-3", "For example, | in my job the repetitive part could be automated tomorrow.", "Por ejemplo, en mi trabajo la parte repetitiva se podría automatizar mañana."),
    l("a3d6-4", "But the part where I talk to people | is much harder to replace.", "Pero la parte donde hablo con personas es mucho más difícil de reemplazar."),
    l("a3d6-5", "What will change | is what companies expect from us.", "Lo que va a cambiar es lo que las empresas esperan de nosotros."),
    l("a3d6-6", "We'll need to use the tools well | instead of competing against them.", "Vamos a necesitar usar bien las herramientas en vez de competir contra ellas."),
    l("a3d6-7", "I could be wrong about the speed, | and honestly nobody knows exactly.", "Podría equivocarme con la velocidad, y honestamente nadie sabe exactamente."),
    l("a3d6-8", "But overall, | I'd say jobs will change more than they disappear.", "Pero en general, diría que los trabajos van a cambiar más que a desaparecer."),
  ],
  rep2Chunks: chunks4("a3d6"),
  prompts: [
    q("a3d6-p1", "Do you think technology makes work easier?", "¿Crees que la tecnología hace el trabajo más fácil?", "Personally, I think…", "Personalmente, creo que…", "POSITION"),
    q("a3d6-p2", "Why do you think that?", "¿Por qué piensas eso?", "The main reason is…", "La razón principal es…", "WHY"),
    q("a3d6-p3", "Give one concrete example.", "Da un ejemplo concreto.", "For example…", "Por ejemplo…", "EXAMPLE"),
    q("a3d6-p4", "Should schools teach students how to use AI?", "¿Las escuelas deberían enseñar a usar la IA?", "The way I see it…", "Como yo lo veo…", "POSITION", "justify"),
    q("a3d6-p5", "Close your opinion in one sentence.", "Cierra tu opinión en una oración.", "Overall…", "En general…", "CLOSE"),
  ],
  cues: ["POSITION", "WHY", "EXAMPLE", "CLOSE"],
  powerChunks: { core: ["Personally, I think…", "The main reason is…"], stretch: "Overall…" },
  goalSeconds: [40, 55],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "Do you think AI will replace some jobs?", questionEs: "¿Crees que la IA va a reemplazar algunos trabajos?" },
  rep5Tips: { en: "POSITION → WHY → EXAMPLE → CLOSE.", es: "POSICIÓN → POR QUÉ → EJEMPLO → CIERRE." },
  rep5Turns: [
    turn("a3d6-turn1", QUESTIONER, "Do you think AI will replace some jobs?", "¿Crees que la IA va a reemplazar algunos trabajos?", "male", {
      targetSeconds: DEVELOP,
      cues: ["POSITION", "WHY", "EXAMPLE", "CLOSE"],
      toolbox: ["Personally, I think…", "The main reason is…"],
    }),
    turn("a3d6-turn2", QUESTIONER, "What makes you think that?", "¿Qué te hace pensar eso?", "male", { targetSeconds: DEVELOP }),
    repairTurn("a3d6-repair", "time", QUESTIONER, "And which job do you think will change the most in ten years?", "¿Y qué trabajo crees que cambiará más en diez años?", "male"),
  ],
  speakerVoice: "male",
  testReady: d6Sprint,
});

/* ============================ DAY 7 — SEE BOTH SIDES ============================ */

const d7Sprint: TestReadySprint = {
  type: "listen-respond",
  title: "LISTEN & RESPOND",
  titleEs: "ESCUCHA Y RESPONDE",
  instruction: "Listen, then answer with both sides before your own view.",
  instructionEs: "Escucha y responde con los dos lados antes de tu propia opinión.",
  items: [
    { id: "a3d7-lr1", audio: "Should employees be allowed to work completely from home?", maxSeconds: 35 },
    { id: "a3d7-lr2", audio: "Is social media good or bad for young people?", maxSeconds: 35 },
    { id: "a3d7-lr3", audio: "Should university be free for everyone?", maxSeconds: 35 },
    { id: "a3d7-lr4", audio: "Is it better to have one skill or many skills?", maxSeconds: 35 },
  ],
};

const d7 = advanced3Day({
  day: 7,
  topic: "See Both Sides",
  topicEs: "Mira los dos lados",
  focus: "Balanced answer — SIDE A → SIDE B → MY VIEW",
  focusEs: "Respuesta equilibrada — LADO A → LADO B → MI OPINIÓN",
  intro: {
    title: "SEE BOTH SIDES",
    titleEs: "MIRA LOS DOS LADOS",
    lead: "A mature answer shows both sides first. Then you choose. Framework: SIDE A → SIDE B → MY VIEW.",
    leadEs: "Una respuesta madura muestra primero los dos lados. Luego eliges. Estructura: LADO A → LADO B → MI OPINIÓN.",
    examples: ["On one hand…", "On the other hand…", "Personally…"],
    goal: "Give both sides and your view in 45–60 seconds.",
    goalEs: "Da los dos lados y tu opinión en 45–60 segundos.",
    cta: START,
  },
  lines: [
    l("a3d7-1", "On one hand, | working completely from home saves time and money.", "Por un lado, trabajar totalmente desde casa ahorra tiempo y dinero."),
    l("a3d7-2", "People sleep better | and they can organize their own day.", "La gente duerme mejor y puede organizar su propio día."),
    l("a3d7-3", "On the other hand, | new employees learn much slower alone.", "Por otro lado, los empleados nuevos aprenden mucho más lento solos."),
    l("a3d7-4", "You lose the small conversations | where problems get solved in two minutes.", "Pierdes las conversaciones pequeñas donde los problemas se resuelven en dos minutos."),
    l("a3d7-5", "There's also the question of communication: | messages are easy to misunderstand.", "También está el tema de la comunicación: los mensajes se malinterpretan fácil."),
    l("a3d7-6", "Personally, | I think the best answer is somewhere in the middle.", "Personalmente, creo que la mejor respuesta está en el medio."),
    l("a3d7-7", "Full freedom for experienced people, | and more contact for people who are starting.", "Libertad total para la gente con experiencia y más contacto para quienes empiezan."),
    l("a3d7-8", "The biggest disadvantage of my position | is that it's harder to organize.", "La mayor desventaja de mi posición es que es más difícil de organizar."),
  ],
  rep2Chunks: chunks4("a3d7"),
  prompts: [
    q("a3d7-p1", "Give the strongest argument for working from home.", "Da el argumento más fuerte a favor de trabajar desde casa.", "On one hand…", "Por un lado…", "SIDE A"),
    q("a3d7-p2", "Now give the strongest argument against it.", "Ahora da el argumento más fuerte en contra.", "On the other hand…", "Por otro lado…", "SIDE B"),
    q("a3d7-p3", "What's your own view?", "¿Cuál es tu propia opinión?", "Personally…", "Personalmente…", "MY VIEW"),
    q("a3d7-p4", "What's the weakest part of your position?", "¿Cuál es la parte más débil de tu posición?", "The biggest disadvantage is…", "La mayor desventaja es…", "HONESTY", "defend"),
    q("a3d7-p5", "Are phones helping or hurting how we talk to each other?", "¿Los teléfonos ayudan o dañan cómo nos hablamos?", "It depends on…", "Depende de…", "BOTH SIDES", "justify"),
  ],
  cues: ["SIDE A", "SIDE B", "MY VIEW"],
  powerChunks: { core: ["On one hand…", "On the other hand…"], stretch: "It depends on…" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "Should employees be allowed to work completely from home?", questionEs: "¿Se debería permitir a los empleados trabajar totalmente desde casa?" },
  rep5Tips: { en: "SIDE A → SIDE B → MY VIEW. Both sides before your choice.", es: "LADO A → LADO B → MI OPINIÓN. Los dos lados antes de tu decisión." },
  rep5Turns: [
    turn("a3d7-turn1", QUESTIONER, "Should employees be allowed to work completely from home?", "¿Se debería permitir a los empleados trabajar totalmente desde casa?", "female", {
      targetSeconds: DEVELOP,
      cues: ["SIDE A", "SIDE B", "MY VIEW"],
      toolbox: ["On one hand…", "On the other hand…"],
    }),
    turn("a3d7-turn2", QUESTIONER, "What is the biggest disadvantage of your position?", "¿Cuál es la mayor desventaja de tu posición?", "female", { targetSeconds: DEVELOP }),
    repairTurn("a3d7-repair", "catch", QUESTIONER, "So would you apply the same rule to a team that works with customers all day?", "¿Aplicarías la misma regla a un equipo que atiende clientes todo el día?", "female"),
  ],
  speakerVoice: "female",
  testReady: d7Sprint,
});

/* ============================ DAY 8 — GIVE ADVICE ============================ */

const d8Sprint: TestReadySprint = {
  type: "speak-now",
  title: "SPEAK NOW",
  titleEs: "HABLA AHORA",
  instruction: "10 seconds to think. Give advice and say why.",
  instructionEs: "10 segundos para pensar. Da un consejo y di por qué.",
  thinkSeconds: 10,
  speakSeconds: 30,
  items: [
    { id: "a3d8-sn1", text: "A friend is nervous about their first day at an English-speaking job.", textEs: "Un amigo está nervioso por su primer día en un trabajo en inglés.", maxSeconds: 35 },
    { id: "a3d8-sn2", text: "A coworker keeps arriving late to meetings.", textEs: "Un compañero llega tarde a las reuniones.", maxSeconds: 35 },
    { id: "a3d8-sn3", text: "Someone wants to learn English but has only 20 minutes a day.", textEs: "Alguien quiere aprender inglés pero solo tiene 20 minutos al día.", maxSeconds: 35 },
  ],
};

const d8 = advanced3Day({
  day: 8,
  topic: "Give Advice",
  topicEs: "Da un consejo",
  focus: "Real advice — SITUATION → ADVICE → REASON → CONSEQUENCE",
  focusEs: "Consejo real — SITUACIÓN → CONSEJO → RAZÓN → CONSECUENCIA",
  intro: {
    title: "GIVE ADVICE",
    titleEs: "DA UN CONSEJO",
    lead: "Advice is not one word. Say what you understand about the situation, what they should do, why, and what happens if they do it.",
    leadEs: "Un consejo no es una palabra. Di qué entiendes de la situación, qué deberían hacer, por qué y qué pasa si lo hacen.",
    examples: ["I'd say you should…", "You could try…", "That way, you…"],
    goal: "Give useful advice for 45–60 seconds and adapt it once.",
    goalEs: "Da un consejo útil 45–60 segundos y adáptalo una vez.",
    cta: START,
  },
  lines: [
    l("a3d8-1", "First of all, | being nervous before a new job is completely normal.", "Antes que nada, estar nervioso/a antes de un trabajo nuevo es completamente normal."),
    l("a3d8-2", "I'd say you should | prepare three or four sentences you know you'll need.", "Yo diría que deberías preparar tres o cuatro oraciones que sabes que vas a necesitar."),
    l("a3d8-3", "You could try | writing them down and saying them out loud tonight.", "Podrías intentar escribirlas y decirlas en voz alta esta noche."),
    l("a3d8-4", "The reason is simple: | your first minutes are the hardest.", "La razón es simple: tus primeros minutos son los más difíciles."),
    l("a3d8-5", "Once you speak twice, | the fear goes down a lot.", "Una vez que hablas dos veces, el miedo baja muchísimo."),
    l("a3d8-6", "You shouldn't try to sound perfect | on the first day.", "No deberías intentar sonar perfecto/a el primer día."),
    l("a3d8-7", "If you don't understand something, | just ask them to repeat it — that's professional.", "Si no entiendes algo, solo pide que lo repitan — eso es profesional."),
    l("a3d8-8", "If you do that, | people will remember that you communicate, not that you're perfect.", "Si haces eso, la gente recordará que te comunicas, no que eres perfecto/a."),
  ],
  rep2Chunks: chunks4("a3d8"),
  prompts: [
    q("a3d8-p1", "Your friend is nervous about tomorrow. What do you say first?", "Tu amigo está nervioso por mañana. ¿Qué dices primero?", "First of all…", "Antes que nada…", "SITUATION"),
    q("a3d8-p2", "What's your main advice?", "¿Cuál es tu consejo principal?", "I'd say you should…", "Yo diría que deberías…", "ADVICE"),
    q("a3d8-p3", "Why is that advice useful?", "¿Por qué ese consejo es útil?", "The reason is…", "La razón es…", "REASON"),
    q("a3d8-p4", "What should they avoid doing?", "¿Qué deberían evitar hacer?", "You shouldn't…", "No deberías…", "AVOID", "explain"),
    q("a3d8-p5", "What happens if they follow your advice?", "¿Qué pasa si siguen tu consejo?", "If you do that…", "Si haces eso…", "CONSEQUENCE"),
  ],
  cues: ["SITUATION", "ADVICE", "REASON", "CONSEQUENCE"],
  powerChunks: { core: ["I'd say you should…", "You could try…"], stretch: "If you do that…" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: {
    question: "Your friend starts their first English-speaking job tomorrow and is very nervous. What do you tell them?",
    questionEs: "Tu amigo empieza mañana su primer trabajo en inglés y está muy nervioso. ¿Qué le dices?",
  },
  rep5Tips: { en: "SITUATION → ADVICE → REASON → CONSEQUENCE.", es: "SITUACIÓN → CONSEJO → RAZÓN → CONSECUENCIA." },
  rep5Turns: [
    turn("a3d8-turn1", QUESTIONER, "My first day at an English-speaking job is tomorrow and I'm really nervous. What should I do?", "Mañana es mi primer día en un trabajo en inglés y estoy muy nervioso. ¿Qué debería hacer?", "female", {
      targetSeconds: DEVELOP,
      cues: ["SITUATION", "ADVICE", "REASON", "CONSEQUENCE"],
      toolbox: ["I'd say you should…", "You could try…"],
    }),
    turn("a3d8-turn2", QUESTIONER, "And what should I avoid doing?", "¿Y qué debería evitar hacer?", "female", { targetSeconds: DEVELOP }),
    repairTurn("a3d8-repair", "restart", QUESTIONER, "Sorry, I didn't follow that last part — could you say it another way?", "Perdón, no entendí esa última parte, ¿podrías decirla de otra forma?", "female"),
  ],
  speakerVoice: "female",
  testReady: d8Sprint,
});

/* ============================ DAY 9 — COMPARE & CHOOSE ============================ */

const d9Sprint: TestReadySprint = {
  type: "build-sentence",
  title: "BUILD & SPEAK",
  titleEs: "CONSTRUYE Y HABLA",
  instruction: "Use the words to build a trade-off sentence, then say your choice.",
  instructionEs: "Usa las palabras para construir una oración de ventaja/desventaja y di tu elección.",
  items: [
    { id: "a3d9-bs1", chunks: ["the advantage of", "public transport", "is", "the cost"], maxSeconds: 20 },
    { id: "a3d9-bs2", chunks: ["the downside is", "you", "lose", "flexibility"], maxSeconds: 20 },
    { id: "a3d9-bs3", chunks: ["for me", "the better choice", "would be"], maxSeconds: 20 },
    { id: "a3d9-bs4", chunks: ["university", "gives you", "theory", "but", "work gives you", "practice"], maxSeconds: 25 },
    { id: "a3d9-bs5", chunks: ["it depends on", "what you need", "right now"], maxSeconds: 20 },
  ],
};

const d9 = advanced3Day({
  day: 9,
  topic: "Compare & Choose",
  topicEs: "Compara y elige",
  focus: "Trade-offs, not winners — OPTION A → OPTION B → TRADE-OFF → CHOICE",
  focusEs: "Ventajas y costos, no ganadores — OPCIÓN A → OPCIÓN B → COSTO → ELECCIÓN",
  intro: {
    title: "COMPARE & CHOOSE",
    titleEs: "COMPARA Y ELIGE",
    lead: "Don't just say 'A is better'. Say what each option gives you, what it costs, and then choose. Framework: OPTION A → OPTION B → TRADE-OFF → CHOICE.",
    leadEs: "No digas solo 'A es mejor'. Di qué te da cada opción, qué te cuesta y luego elige. Estructura: OPCIÓN A → OPCIÓN B → COSTO → ELECCIÓN.",
    examples: ["The advantage of A is…", "The downside is…", "For me, the better choice would be…"],
    goal: "Compare two options honestly and choose in 45–60 seconds.",
    goalEs: "Compara dos opciones con honestidad y elige en 45–60 segundos.",
    cta: START,
  },
  lines: [
    l("a3d9-1", "Let's compare university | and starting to work directly.", "Comparemos la universidad y empezar a trabajar directamente."),
    l("a3d9-2", "The advantage of university | is that you get theory and a network.", "La ventaja de la universidad es que obtienes teoría y una red de contactos."),
    l("a3d9-3", "The downside is | that it costs time and money before you earn anything.", "La desventaja es que cuesta tiempo y dinero antes de ganar algo."),
    l("a3d9-4", "Work experience gives you money earlier | and you learn what companies really need.", "La experiencia laboral te da dinero antes y aprendes lo que las empresas realmente necesitan."),
    l("a3d9-5", "But the risk is | that you can stay in the same position for years.", "Pero el riesgo es que puedes quedarte en la misma posición por años."),
    l("a3d9-6", "So the real trade-off | is speed now versus options later.", "Entonces el verdadero costo es rapidez ahora contra opciones después."),
    l("a3d9-7", "For me, the better choice would be | working first and studying while I work.", "Para mí, la mejor opción sería trabajar primero y estudiar mientras trabajo."),
    l("a3d9-8", "It's harder, | but you don't have to choose only one.", "Es más difícil, pero no tienes que elegir solo una."),
  ],
  rep2Chunks: chunks4("a3d9"),
  prompts: [
    q("a3d9-p1", "Public transport or a car — what does each one give you?", "¿Transporte público o carro? ¿Qué te da cada uno?", "The advantage of…", "La ventaja de…", "OPTION A"),
    q("a3d9-p2", "What does the other option cost you?", "¿Qué te cuesta la otra opción?", "The downside is…", "La desventaja es…", "OPTION B"),
    q("a3d9-p3", "What is the real trade-off?", "¿Cuál es el verdadero costo-beneficio?", "So the trade-off is…", "Entonces el costo-beneficio es…", "TRADE-OFF"),
    q("a3d9-p4", "A human teacher or an AI tool — which do you choose?", "¿Un profesor humano o una herramienta de IA? ¿Cuál eliges?", "For me, the better choice would be…", "Para mí, la mejor opción sería…", "CHOICE", "justify"),
    q("a3d9-p5", "When would you change your choice?", "¿Cuándo cambiarías tu elección?", "It depends on…", "Depende de…", "CONDITION", "adapt"),
  ],
  cues: ["OPTION A", "OPTION B", "TRADE-OFF", "CHOICE"],
  powerChunks: { core: ["The advantage of… is…", "The downside is…"], stretch: "For me, the better choice would be…" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "A human teacher or an AI tool for learning English — compare them and choose.", questionEs: "¿Un profesor humano o una herramienta de IA para aprender inglés? Compáralos y elige." },
  rep5Tips: { en: "OPTION A → OPTION B → TRADE-OFF → CHOICE.", es: "OPCIÓN A → OPCIÓN B → COSTO → ELECCIÓN." },
  rep5Turns: [
    turn("a3d9-turn1", QUESTIONER, "A human teacher or an AI tool for learning English — which one is better?", "¿Un profesor humano o una herramienta de IA para aprender inglés? ¿Cuál es mejor?", "male", {
      targetSeconds: DEVELOP,
      cues: ["OPTION A", "OPTION B", "TRADE-OFF", "CHOICE"],
      toolbox: ["The advantage of… is…", "The downside is…"],
    }),
    turn("a3d9-turn2", QUESTIONER, "And if the AI tool were free but the teacher were expensive, would your answer change?", "¿Y si la IA fuera gratis y el profesor caro, cambiaría tu respuesta?", "male", { targetSeconds: DEVELOP }),
    repairTurn("a3d9-repair", "confirm", QUESTIONER, "So you're saying the cost matters more than the method, right?", "¿Entonces dices que el costo importa más que el método, verdad?", "male"),
  ],
  speakerVoice: "male",
  testReady: d9Sprint,
});

/* ============================ DAY 10 — DEFEND YOUR POSITION (CHECKPOINT) ============================ */

const d10Sprint: TestReadySprint = {
  type: "mixed",
  title: "WEEK 2 MIXED SPRINT",
  titleEs: "SPRINT MIXTO SEMANA 2",
  instruction: "Take a position, defend it, and answer back.",
  instructionEs: "Toma una posición, defiéndela y responde de vuelta.",
  items: [
    { id: "a3d10-m1", kind: "quick-answers", audio: "Does social media do more harm than good?", maxSeconds: 20 },
    { id: "a3d10-m2", kind: "listen-respond", audio: "But millions of people use it to learn and build businesses. What do you say to that?", maxSeconds: 35 },
    { id: "a3d10-m3", kind: "speak-now", text: "A rule at work you disagree with.", textEs: "Una regla del trabajo con la que no estás de acuerdo.", thinkSeconds: 10, maxSeconds: 35 },
    { id: "a3d10-m4", kind: "quick-answers", audio: "Should phones be banned in schools?", maxSeconds: 20 },
    { id: "a3d10-m5", kind: "listen-respond", audio: "Someone tells you your opinion is unrealistic. How do you respond?", maxSeconds: 35 },
  ],
};

const d10 = advanced3Day({
  day: 10,
  topic: "Defend Your Position",
  topicEs: "Defiende tu posición",
  focus: "Checkpoint — CLAIM → REASON → EXAMPLE → RESPOND",
  focusEs: "Checkpoint — AFIRMACIÓN → RAZÓN → EJEMPLO → RESPONDE",
  intro: {
    title: "DEFEND YOUR POSITION",
    titleEs: "DEFIENDE TU POSICIÓN",
    lead: "Today someone will push back. You don't have to win — you have to respond. Framework: CLAIM → REASON → EXAMPLE → RESPOND.",
    leadEs: "Hoy alguien te va a contradecir. No tienes que ganar — tienes que responder. Estructura: AFIRMACIÓN → RAZÓN → EJEMPLO → RESPONDE.",
    examples: ["That's a fair point, but…", "I still think…", "What I mean is…"],
    goal: "Hold your position for two rounds without freezing.",
    goalEs: "Sostén tu posición dos rondas sin trabarte.",
    cta: START,
  },
  lines: [
    l("a3d10-1", "I'd say social media does more harm than good | for most young people.", "Yo diría que las redes sociales hacen más daño que bien para la mayoría de los jóvenes."),
    l("a3d10-2", "My main reason is | that it's designed to keep your attention, not to help you.", "Mi razón principal es que está diseñada para retener tu atención, no para ayudarte."),
    l("a3d10-3", "For example, | I've seen people check their phone thirty times in one hour.", "Por ejemplo, he visto gente revisar el teléfono treinta veces en una hora."),
    l("a3d10-4", "That's a fair point about businesses, | and I'm not saying it's useless.", "Es un punto justo lo de los negocios, y no digo que sea inútil."),
    l("a3d10-5", "But the people who build businesses there | are a small percentage.", "Pero la gente que construye negocios ahí es un porcentaje pequeño."),
    l("a3d10-6", "For most users, | it's an hour a day they don't get back.", "Para la mayoría, es una hora al día que no recuperan."),
    l("a3d10-7", "So I'd say the problem isn't the tool — | it's how much control it has.", "Así que diría que el problema no es la herramienta, es cuánto control tiene."),
    l("a3d10-8", "I still think | we need clearer limits, especially for teenagers.", "Sigo pensando que necesitamos límites más claros, sobre todo para adolescentes."),
  ],
  rep2Chunks: chunks4("a3d10"),
  prompts: [
    q("a3d10-p1", "State your position on social media.", "Di tu posición sobre las redes sociales.", "I'd say…", "Yo diría que…", "CLAIM"),
    q("a3d10-p2", "Give your strongest reason.", "Da tu razón más fuerte.", "My main reason is…", "Mi razón principal es…", "REASON"),
    q("a3d10-p3", "Support it with something you have seen.", "Sostenla con algo que hayas visto.", "For example…", "Por ejemplo…", "EXAMPLE"),
    q("a3d10-p4", "Someone disagrees with you. Respond.", "Alguien no está de acuerdo. Responde.", "That's a fair point, but…", "Es un punto justo, pero…", "RESPOND", "defend"),
    q("a3d10-p5", "Has your position changed while talking?", "¿Cambió tu posición mientras hablabas?", "Actually, I'd change one thing…", "De hecho, cambiaría una cosa…", "ADJUST", "adapt"),
  ],
  cues: ["CLAIM", "REASON", "EXAMPLE", "RESPOND"],
  powerChunks: { core: ["That's a fair point, but…", "I still think…"], stretch: "What I mean is…" },
  goalSeconds: DEVELOP,
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "Social media does more harm than good. Do you agree?", questionEs: "Las redes sociales hacen más daño que bien. ¿Estás de acuerdo?" },
  rep5Tips: { en: "CLAIM → REASON → EXAMPLE → RESPOND. Any position is valid.", es: "AFIRMACIÓN → RAZÓN → EJEMPLO → RESPONDE. Cualquier posición vale." },
  rep5Turns: [
    answerTypeTurn("a3d10-turn1", QUESTIONER, "Social media does more harm than good. Do you agree?", "Las redes sociales hacen más daño que bien. ¿Estás de acuerdo?", "female", ALL_ANSWER_TYPES, "opinion", {
      cues: ["POSITION", "WHY", "EXAMPLE", "CLOSE"],
      toolbox: ["Personally, I think…", "The main reason is…"],
    }),
    turn("a3d10-turn2", QUESTIONER, "But millions of people use it to learn and build businesses.", "Pero millones de personas la usan para aprender y crear negocios.", "female", { targetSeconds: DEVELOP }),
    repairTurn("a3d10-repair", "time", QUESTIONER, "So what would you change about it, exactly?", "Entonces, ¿qué cambiarías exactamente?", "female"),
  ],
  speakerVoice: "female",
  testReady: d10Sprint,
});

/* ============================ DAY 11 — EXPLAIN HOW SOMETHING CHANGED ============================ */

const d11Sprint: TestReadySprint = {
  type: "speak-now",
  title: "SPEAK NOW",
  titleEs: "HABLA AHORA",
  instruction: "10 seconds to think. Before → change → now → result.",
  instructionEs: "10 segundos para pensar. Antes → cambio → ahora → resultado.",
  thinkSeconds: 10,
  speakSeconds: 30,
  items: [
    { id: "a3d11-sn1", text: "How the way you work has changed.", textEs: "Cómo ha cambiado tu forma de trabajar.", maxSeconds: 35 },
    { id: "a3d11-sn2", text: "How your city has changed in five years.", textEs: "Cómo ha cambiado tu ciudad en cinco años.", maxSeconds: 35 },
    { id: "a3d11-sn3", text: "A habit you used to have and don't have now.", textEs: "Un hábito que tenías y ya no tienes.", maxSeconds: 35 },
  ],
};

const d11 = advanced3Day({
  day: 11,
  topic: "Explain How Something Changed",
  topicEs: "Explica cómo cambió algo",
  focus: "BEFORE → CHANGE → NOW → RESULT",
  focusEs: "ANTES → CAMBIO → AHORA → RESULTADO",
  intro: {
    title: "EXPLAIN HOW SOMETHING CHANGED",
    titleEs: "EXPLICA CÓMO CAMBIÓ ALGO",
    lead: "Change questions have a clear shape: how it was, what changed it, how it is now, and the result.",
    leadEs: "Las preguntas sobre cambios tienen una forma clara: cómo era, qué lo cambió, cómo es ahora y el resultado.",
    examples: ["I used to…", "What changed was…", "Now I…"],
    goal: "Explain a real change in 45–60 seconds.",
    goalEs: "Explica un cambio real en 45–60 segundos.",
    cta: START,
  },
  lines: [
    l("a3d11-1", "I used to study English | only by reading and doing exercises.", "Antes estudiaba inglés solo leyendo y haciendo ejercicios."),
    l("a3d11-2", "I didn't use to speak out loud, | so I understood a lot but I couldn't answer.", "No solía hablar en voz alta, así que entendía mucho pero no podía responder."),
    l("a3d11-3", "What changed was | a call at work where I froze completely.", "Lo que cambió fue una llamada en el trabajo donde me quedé totalmente en blanco."),
    l("a3d11-4", "After that, | I decided to practice speaking every single day.", "Después de eso, decidí practicar hablar todos los días."),
    l("a3d11-5", "Now I record myself | and I listen to what I actually sound like.", "Ahora me grabo y escucho cómo sueno realmente."),
    l("a3d11-6", "It's uncomfortable at the beginning, | but it works faster than anything else.", "Es incómodo al principio, pero funciona más rápido que cualquier otra cosa."),
    l("a3d11-7", "The result is | that I answer without translating in my head.", "El resultado es que respondo sin traducir en mi cabeza."),
    l("a3d11-8", "I still make mistakes, | but now they don't stop me.", "Todavía cometo errores, pero ahora no me detienen."),
  ],
  rep2Chunks: chunks4("a3d11"),
  prompts: [
    q("a3d11-p1", "How did you learn English before?", "¿Cómo aprendías inglés antes?", "I used to…", "Antes yo…", "BEFORE"),
    q("a3d11-p2", "What caused the change?", "¿Qué causó el cambio?", "What changed was…", "Lo que cambió fue…", "CHANGE"),
    q("a3d11-p3", "What do you do now?", "¿Qué haces ahora?", "Now I…", "Ahora yo…", "NOW"),
    q("a3d11-p4", "What's the result?", "¿Cuál es el resultado?", "The result is…", "El resultado es…", "RESULT", "explain"),
    q("a3d11-p5", "What hasn't changed yet?", "¿Qué no ha cambiado todavía?", "I still…", "Todavía…", "HONESTY", "react"),
  ],
  cues: ["BEFORE", "CHANGE", "NOW", "RESULT"],
  powerChunks: { core: ["I used to…", "What changed was…"], stretch: "The result is…" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "How has the way you learn English changed?", questionEs: "¿Cómo ha cambiado tu forma de aprender inglés?" },
  rep5Tips: { en: "BEFORE → CHANGE → NOW → RESULT.", es: "ANTES → CAMBIO → AHORA → RESULTADO." },
  rep5Turns: [
    turn("a3d11-turn1", QUESTIONER, "How has the way you learn English changed?", "¿Cómo ha cambiado tu forma de aprender inglés?", "male", {
      targetSeconds: DEVELOP,
      cues: ["BEFORE", "CHANGE", "NOW", "RESULT"],
    }),
    turn("a3d11-turn2", QUESTIONER, "What caused that change?", "¿Qué causó ese cambio?", "male", { targetSeconds: DEVELOP }),
    repairTurn("a3d11-repair", "restart", QUESTIONER, "And how would you explain that change to someone who is starting today?", "¿Y cómo explicarías ese cambio a alguien que empieza hoy?", "male"),
  ],
  speakerVoice: "male",
  testReady: d11Sprint,
});

/* ============================ DAY 12 — EXPLAIN AN INTERRUPTED PLAN ============================ */

const d12Sprint: TestReadySprint = {
  type: "story-retell",
  title: "STORY RETELL",
  titleEs: "CUENTA LA HISTORIA",
  instruction: "Listen, then retell the story with your own words.",
  instructionEs: "Escucha y vuelve a contar la historia con tus palabras.",
  items: [
    { id: "a3d12-sr1", audio: "I was about to start my presentation when the power went out. I finished it with my phone light and no slides.", maxSeconds: 40 },
    { id: "a3d12-sr2", audio: "We were going to travel on Saturday, but my son got sick on Friday night, so we stayed home and cooked together.", maxSeconds: 40 },
    { id: "a3d12-sr3", audio: "I was walking to the interview when they called to say it was online. I answered it from a coffee shop.", maxSeconds: 40 },
  ],
};

const d12 = advanced3Day({
  day: 12,
  topic: "Explain an Interrupted Plan",
  topicEs: "Explica un plan interrumpido",
  focus: "PLAN → INTERRUPTION → RESPONSE → RESULT",
  focusEs: "PLAN → INTERRUPCIÓN → RESPUESTA → RESULTADO",
  intro: {
    title: "EXPLAIN AN INTERRUPTED PLAN",
    titleEs: "EXPLICA UN PLAN INTERRUMPIDO",
    lead: "Something was about to happen — and then it didn't. Say the plan, what interrupted it, what you did and how it ended.",
    leadEs: "Algo estaba por pasar — y no pasó. Di el plan, qué lo interrumpió, qué hiciste y cómo terminó.",
    examples: ["I was about to…", "When suddenly…", "So instead, I…"],
    goal: "Tell the interrupted plan in 45–60 seconds.",
    goalEs: "Cuenta el plan interrumpido en 45–60 segundos.",
    cta: START,
  },
  lines: [
    l("a3d12-1", "I was about to leave the house | for an interview downtown.", "Estaba por salir de casa para una entrevista en el centro."),
    l("a3d12-2", "I was going to take the bus | because parking there is impossible.", "Iba a tomar el bus porque estacionarse ahí es imposible."),
    l("a3d12-3", "When suddenly | my phone rang and it was the company.", "Cuando de repente sonó mi teléfono y era la empresa."),
    l("a3d12-4", "They told me the interview | had moved to a video call in twenty minutes.", "Me dijeron que la entrevista se había movido a videollamada en veinte minutos."),
    l("a3d12-5", "So instead of leaving, | I set up my laptop in the quietest room.", "Así que en vez de salir, instalé mi laptop en el cuarto más silencioso."),
    l("a3d12-6", "I asked my family for ten minutes of silence | and checked the connection twice.", "Le pedí a mi familia diez minutos de silencio y revisé la conexión dos veces."),
    l("a3d12-7", "In the end | the call went better than the office would have.", "Al final la llamada salió mejor de lo que habría salido en la oficina."),
    l("a3d12-8", "What I learned is | that changing the plan fast is a skill, not a problem.", "Lo que aprendí es que cambiar el plan rápido es una habilidad, no un problema."),
  ],
  rep2Chunks: chunks4("a3d12"),
  prompts: [
    q("a3d12-p1", "What was the plan?", "¿Cuál era el plan?", "I was going to…", "Iba a…", "PLAN"),
    q("a3d12-p2", "What interrupted it?", "¿Qué lo interrumpió?", "When suddenly…", "Cuando de repente…", "INTERRUPTION"),
    q("a3d12-p3", "What did you do instead?", "¿Qué hiciste en su lugar?", "So instead, I…", "Así que en su lugar…", "RESPONSE"),
    q("a3d12-p4", "How did it end?", "¿Cómo terminó?", "In the end…", "Al final…", "RESULT", "explain"),
    q("a3d12-p5", "Would you do the same again?", "¿Harías lo mismo otra vez?", "Next time I'd…", "La próxima vez yo…", "REFLECT", "react"),
  ],
  cues: ["PLAN", "INTERRUPTION", "RESPONSE", "RESULT"],
  powerChunks: { core: ["I was about to…", "When suddenly…"], stretch: "So instead, I…" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "Tell me about something you were about to do when the plan changed.", questionEs: "Cuéntame de algo que estabas por hacer cuando el plan cambió." },
  rep5Tips: { en: "PLAN → INTERRUPTION → RESPONSE → RESULT.", es: "PLAN → INTERRUPCIÓN → RESPUESTA → RESULTADO." },
  rep5Turns: [
    turn("a3d12-turn1", QUESTIONER, "Tell me about something you were about to do when the plan changed.", "Cuéntame de algo que estabas por hacer cuando el plan cambió.", "female", {
      targetSeconds: SUSTAIN,
      cues: ["PLAN", "INTERRUPTION", "RESPONSE", "RESULT"],
    }),
    turn("a3d12-turn2", QUESTIONER, "What did you do instead?", "¿Qué hiciste en su lugar?", "female", { targetSeconds: DEVELOP }),
    repairTurn("a3d12-repair", "catch", QUESTIONER, "And how did the other people react to that change?", "¿Y cómo reaccionaron las otras personas a ese cambio?", "female"),
  ],
  speakerVoice: "female",
  testReady: d12Sprint,
});

/* ============================ DAY 13 — EXPLAIN HOW SOMETHING WORKS ============================ */

const d13Sprint: TestReadySprint = {
  type: "story-retell",
  title: "RETELL THE PROCESS",
  titleEs: "EXPLICA EL PROCESO",
  instruction: "Listen to the process, then explain it in your own words.",
  instructionEs: "Escucha el proceso y explícalo con tus palabras.",
  items: [
    { id: "a3d13-pr1", audio: "You open the app, choose forgot password, type your email, and a code is sent to you. Then you enter the code and create a new password.", maxSeconds: 40 },
    { id: "a3d13-pr2", audio: "You call the airline, give your booking number, ask for the next available flight, and they send a new confirmation by email.", maxSeconds: 40 },
    { id: "a3d13-pr3", audio: "You fill out the return form, print the label, put it on the box, and leave it at the post office. The refund is processed in five days.", maxSeconds: 40 },
  ],
};

const d13 = advanced3Day({
  day: 13,
  topic: "Explain How Something Works",
  topicEs: "Explica cómo funciona algo",
  focus: "PURPOSE → STEPS → RESULT",
  focusEs: "PROPÓSITO → PASOS → RESULTADO",
  intro: {
    title: "EXPLAIN HOW SOMETHING WORKS",
    titleEs: "EXPLICA CÓMO FUNCIONA ALGO",
    lead: "Explain a real process to someone who has never done it: what it's for, the steps in order, and what happens at the end.",
    leadEs: "Explica un proceso real a alguien que nunca lo ha hecho: para qué sirve, los pasos en orden y qué pasa al final.",
    examples: ["Basically, it's for…", "First… then… after that…", "In the end, you get…"],
    goal: "Explain the process clearly in 45–60 seconds.",
    goalEs: "Explica el proceso con claridad en 45–60 segundos.",
    cta: START,
  },
  lines: [
    l("a3d13-1", "Basically, | an insurance claim is how you ask the company to pay for a problem.", "Básicamente, un reclamo de seguro es cómo le pides a la compañía que pague por un problema."),
    l("a3d13-2", "First, | you report what happened, usually online or by phone.", "Primero, reportas lo que pasó, normalmente en línea o por teléfono."),
    l("a3d13-3", "Then you send photos and documents | that show the damage.", "Luego envías fotos y documentos que muestran el daño."),
    l("a3d13-4", "After that, | the request is reviewed by someone at the company.", "Después de eso, la solicitud es revisada por alguien de la compañía."),
    l("a3d13-5", "The documents are checked, | and sometimes they ask you for one more thing.", "Los documentos son revisados y a veces te piden una cosa más."),
    l("a3d13-6", "If everything is correct, | a confirmation is sent with the amount they will pay.", "Si todo está correcto, se envía una confirmación con el monto que van a pagar."),
    l("a3d13-7", "In the end, | you get the money in your account, usually in a few weeks.", "Al final, recibes el dinero en tu cuenta, normalmente en unas semanas."),
    l("a3d13-8", "If something goes wrong, | you can call and ask them to review it again.", "Si algo sale mal, puedes llamar y pedir que lo revisen otra vez."),
  ],
  rep2Chunks: chunks4("a3d13"),
  prompts: [
    q("a3d13-p1", "What is this process for?", "¿Para qué sirve este proceso?", "Basically, it's for…", "Básicamente, sirve para…", "PURPOSE"),
    q("a3d13-p2", "What are the first two steps?", "¿Cuáles son los primeros dos pasos?", "First… then…", "Primero… luego…", "STEPS"),
    q("a3d13-p3", "What happens after that?", "¿Qué pasa después?", "After that…", "Después de eso…", "STEPS"),
    q("a3d13-p4", "What is the result?", "¿Cuál es el resultado?", "In the end…", "Al final…", "RESULT", "explain"),
    q("a3d13-p5", "What happens if something goes wrong?", "¿Qué pasa si algo sale mal?", "If that happens…", "Si eso pasa…", "PROBLEM", "adapt"),
  ],
  cues: ["PURPOSE", "STEPS", "RESULT"],
  powerChunks: { core: ["Basically, it's for…", "First… then… after that…"], stretch: "In the end, you get…" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "Explain how to return something you bought online to someone who has never done it.", questionEs: "Explica cómo devolver algo que compraste en línea a alguien que nunca lo ha hecho." },
  rep5Tips: { en: "PURPOSE → STEPS → RESULT. Order matters more than vocabulary.", es: "PROPÓSITO → PASOS → RESULTADO. El orden importa más que el vocabulario." },
  rep5Turns: [
    turn("a3d13-turn1", QUESTIONER, "Explain this process to someone who has never done it: returning something you bought online.", "Explica este proceso a alguien que nunca lo ha hecho: devolver algo que compraste en línea.", "male", {
      targetSeconds: DEVELOP,
      cues: ["PURPOSE", "STEPS", "RESULT"],
    }),
    turn("a3d13-turn2", QUESTIONER, "What happens if something goes wrong?", "¿Qué pasa si algo sale mal?", "male", { targetSeconds: DEVELOP }),
    repairTurn("a3d13-repair", "confirm", QUESTIONER, "So the money comes back automatically, or do you have to ask for it?", "¿Entonces el dinero regresa automáticamente o hay que pedirlo?", "male"),
  ],
  speakerVoice: "male",
  testReady: d13Sprint,
});

/* ============================ DAY 14 — ANSWER A WHAT-IF ============================ */

const d14Sprint: TestReadySprint = {
  type: "quick-answers",
  title: "QUICK ANSWERS",
  titleEs: "RESPUESTAS RÁPIDAS",
  instruction: "Answer each what-if in one or two sentences. Choice and why.",
  instructionEs: "Responde cada 'qué harías si' en una o dos oraciones. Decisión y por qué.",
  items: [
    { id: "a3d14-qa1", audio: "What would you do if your manager asked you to do something you didn't know how to do?", maxSeconds: 25 },
    { id: "a3d14-qa2", audio: "What would you do if your flight was cancelled while you were traveling alone?", maxSeconds: 25 },
    { id: "a3d14-qa3", audio: "What would you do if you had to start a new career next month?", maxSeconds: 25 },
    { id: "a3d14-qa4", audio: "What would you do if a customer asked you a question you couldn't answer?", maxSeconds: 25 },
    { id: "a3d14-qa5", audio: "What would you do if you had one free year and enough money?", maxSeconds: 25 },
  ],
};

const d14 = advanced3Day({
  day: 14,
  topic: "Answer a What-If",
  topicEs: "Responde un 'qué harías si'",
  focus: "SITUATION → CHOICE → WHY → CONSEQUENCE",
  focusEs: "SITUACIÓN → DECISIÓN → POR QUÉ → CONSECUENCIA",
  intro: {
    title: "ANSWER A WHAT-IF",
    titleEs: "RESPONDE UN 'QUÉ HARÍAS SI'",
    lead: "A hypothetical question is not a trick. Repeat the situation, choose, explain why, and say what would happen.",
    leadEs: "Una pregunta hipotética no es una trampa. Repite la situación, elige, explica por qué y di qué pasaría.",
    examples: ["In that situation, I would…", "If that happened…", "That way…"],
    goal: "Answer a what-if in 40–55 seconds without freezing.",
    goalEs: "Responde un hipotético en 40–55 segundos sin trabarte.",
    cta: START,
  },
  lines: [
    l("a3d14-1", "If my manager asked me to do something I didn't know, | I wouldn't say no immediately.", "Si mi jefe me pidiera algo que no sé hacer, no diría que no de inmediato."),
    l("a3d14-2", "In that situation, | I would ask two questions to understand the goal.", "En esa situación, haría dos preguntas para entender el objetivo."),
    l("a3d14-3", "Then I would say honestly | that I haven't done it before.", "Luego diría honestamente que no lo he hecho antes."),
    l("a3d14-4", "But I would also offer a plan: | give me a day to learn the basics.", "Pero también ofrecería un plan: dame un día para aprender lo básico."),
    l("a3d14-5", "The reason is | that saying yes without preparing creates a bigger problem later.", "La razón es que decir que sí sin prepararme crea un problema más grande después."),
    l("a3d14-6", "If I had a colleague with experience, | I'd ask them for fifteen minutes.", "Si tuviera un colega con experiencia, le pediría quince minutos."),
    l("a3d14-7", "That way, | the work gets done and I learn something new.", "De esa forma, el trabajo se hace y yo aprendo algo nuevo."),
    l("a3d14-8", "The risk, of course, | is that it takes more time at the beginning.", "El riesgo, claro, es que toma más tiempo al principio."),
  ],
  rep2Chunks: chunks4("a3d14"),
  prompts: [
    q("a3d14-p1", "What would you do if you had to speak in English in front of 50 people tomorrow?", "¿Qué harías si tuvieras que hablar en inglés frente a 50 personas mañana?", "In that situation, I would…", "En esa situación, yo…", "CHOICE"),
    q("a3d14-p2", "Why would you do that?", "¿Por qué harías eso?", "The reason is…", "La razón es…", "WHY"),
    q("a3d14-p3", "What would happen after that?", "¿Qué pasaría después?", "That way…", "De esa forma…", "CONSEQUENCE"),
    q("a3d14-p4", "What would you do if a customer asked something you couldn't answer?", "¿Qué harías si un cliente te preguntara algo que no puedes responder?", "If that happened, I'd…", "Si eso pasara, yo…", "CHOICE", "adapt"),
    q("a3d14-p5", "What's the risk of your decision?", "¿Cuál es el riesgo de tu decisión?", "The risk is…", "El riesgo es…", "RISK", "justify"),
  ],
  cues: ["SITUATION", "CHOICE", "WHY", "CONSEQUENCE"],
  powerChunks: { core: ["In that situation, I would…", "If that happened…"], stretch: "That way…" },
  goalSeconds: [40, 55],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "What would you do if your manager asked you to do something you didn't know how to do?", questionEs: "¿Qué harías si tu jefe te pidiera hacer algo que no sabes hacer?" },
  rep5Tips: { en: "SITUATION → CHOICE → WHY → CONSEQUENCE.", es: "SITUACIÓN → DECISIÓN → POR QUÉ → CONSECUENCIA." },
  rep5Turns: [
    turn("a3d14-turn1", QUESTIONER, "What would you do if your manager asked you to do something you didn't know how to do?", "¿Qué harías si tu jefe te pidiera hacer algo que no sabes hacer?", "female", {
      targetSeconds: DEVELOP,
      cues: ["CHOICE", "WHY", "CONSEQUENCE"],
    }),
    turn("a3d14-turn2", QUESTIONER, "And what would you do if there was no time to learn it?", "¿Y qué harías si no hubiera tiempo para aprenderlo?", "female", { targetSeconds: DEVELOP }),
    repairTurn("a3d14-repair", "time", QUESTIONER, "What would you do if you had to start a completely new career next month?", "¿Qué harías si tuvieras que empezar una carrera totalmente nueva el próximo mes?", "female"),
  ],
  speakerVoice: "female",
  testReady: d14Sprint,
});

/* ============================ DAY 15 — EXPLAIN SOMETHING DIFFICULT (CHECKPOINT) ============================ */

const d15Sprint: TestReadySprint = {
  type: "mixed",
  title: "WEEK 3 MIXED SPRINT",
  titleEs: "SPRINT MIXTO SEMANA 3",
  instruction: "Explain unfamiliar things. Define, compare, give an example, check.",
  instructionEs: "Explica cosas poco comunes. Define, compara, da un ejemplo, confirma.",
  items: [
    { id: "a3d15-m1", kind: "speak-now", text: "Explain Wi-Fi to a seven-year-old.", textEs: "Explica el Wi-Fi a un niño de siete años.", thinkSeconds: 10, maxSeconds: 40 },
    { id: "a3d15-m2", kind: "speak-now", text: "Explain stress without using the word stress.", textEs: "Explica el estrés sin usar la palabra estrés.", thinkSeconds: 10, maxSeconds: 40 },
    { id: "a3d15-m3", kind: "listen-respond", audio: "How would you explain your job to someone who has never used a computer?", maxSeconds: 40 },
    { id: "a3d15-m4", kind: "quick-answers", audio: "What is the hardest thing to explain in another language?", maxSeconds: 25 },
    { id: "a3d15-m5", kind: "speak-now", text: "Explain money to someone who has never used it.", textEs: "Explica el dinero a alguien que nunca lo ha usado.", thinkSeconds: 10, maxSeconds: 40 },
  ],
};

const d15 = advanced3Day({
  day: 15,
  topic: "Explain Something Difficult",
  topicEs: "Explica algo difícil",
  focus: "Checkpoint — DEFINE → COMPARE → EXAMPLE → CHECK",
  focusEs: "Checkpoint — DEFINE → COMPARA → EJEMPLO → CONFIRMA",
  intro: {
    title: "EXPLAIN SOMETHING DIFFICULT",
    titleEs: "EXPLICA ALGO DIFÍCIL",
    lead: "There is no correct answer today. The point is THINK → ORGANIZE → EXPLAIN. Define it, compare it to something known, give an example, and check if the other person understood.",
    leadEs: "Hoy no hay respuesta correcta. El punto es PENSAR → ORGANIZAR → EXPLICAR. Defínelo, compáralo con algo conocido, da un ejemplo y confirma si la otra persona entendió.",
    examples: ["It's a kind of…", "It's similar to…", "Does that make sense?"],
    goal: "Explain an unfamiliar idea for 45–60 seconds.",
    goalEs: "Explica una idea poco común 45–60 segundos.",
    cta: START,
  },
  lines: [
    l("a3d15-1", "Explaining color to a blind person | is not about the eyes.", "Explicar los colores a una persona ciega no se trata de los ojos."),
    l("a3d15-2", "So I'd start with feeling: | red is the color of something hot.", "Así que empezaría con la sensación: el rojo es el color de algo caliente."),
    l("a3d15-3", "It's similar to | standing close to a fire in winter.", "Es parecido a estar cerca del fuego en invierno."),
    l("a3d15-4", "Blue is the opposite: | it's cold water on your hands in the morning.", "El azul es lo contrario: es agua fría en tus manos en la mañana."),
    l("a3d15-5", "Green is calm — | it's the smell of grass after the rain.", "El verde es calma: es el olor del pasto después de la lluvia."),
    l("a3d15-6", "For example, | when people say 'a warm color', they mean a feeling, not heat.", "Por ejemplo, cuando dicen 'un color cálido', hablan de una sensación, no de temperatura."),
    l("a3d15-7", "The important part is | that colors are differences you can feel.", "La parte importante es que los colores son diferencias que puedes sentir."),
    l("a3d15-8", "Does that make sense, | or should I explain it another way?", "¿Tiene sentido o lo explico de otra forma?"),
  ],
  rep2Chunks: chunks4("a3d15"),
  prompts: [
    q("a3d15-p1", "Define color without using the word 'see'.", "Define el color sin usar la palabra 'ver'.", "It's a kind of…", "Es un tipo de…", "DEFINE"),
    q("a3d15-p2", "Compare it to something the person already knows.", "Compáralo con algo que la persona ya conoce.", "It's similar to…", "Es parecido a…", "COMPARE"),
    q("a3d15-p3", "Give one clear example.", "Da un ejemplo claro.", "For example…", "Por ejemplo…", "EXAMPLE"),
    q("a3d15-p4", "Explain Wi-Fi to a seven-year-old.", "Explica el Wi-Fi a un niño de siete años.", "Imagine that…", "Imagina que…", "EXPLAIN", "explain"),
    q("a3d15-p5", "How do you check if they understood?", "¿Cómo confirmas si entendieron?", "Does that make sense?", "¿Tiene sentido?", "CHECK"),
  ],
  cues: ["DEFINE", "COMPARE", "EXAMPLE", "CHECK"],
  powerChunks: { core: ["It's similar to…", "Imagine that…"], stretch: "Let me explain that differently." },
  goalSeconds: [45, 60],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "How would you explain colors to a blind person?", questionEs: "¿Cómo explicarías los colores a una persona ciega?" },
  rep5Tips: { en: "DEFINE → COMPARE → EXAMPLE → CHECK. No correct answer — just structure.", es: "DEFINE → COMPARA → EJEMPLO → CONFIRMA. No hay respuesta correcta — solo estructura." },
  rep5Turns: [
    answerTypeTurn("a3d15-turn1", QUESTIONER, "How would you explain colors to a blind person?", "¿Cómo explicarías los colores a una persona ciega?", "female", ALL_ANSWER_TYPES, "explain", {
      cues: ["DEFINE", "COMPARE", "EXAMPLE", "CHECK"],
    }),
    turn("a3d15-turn2", QUESTIONER, "Now explain stress to a child, without using the word stress.", "Ahora explica el estrés a un niño, sin usar la palabra estrés.", "female", { targetSeconds: DEVELOP }),
    repairTurn("a3d15-repair", "restart", QUESTIONER, "I'm not sure I follow — could you explain that in a different way?", "No estoy seguro de entender, ¿podrías explicarlo de otra forma?", "female"),
  ],
  speakerVoice: "female",
  testReady: d15Sprint,
});

/* ============================ DAY 16 — EXPLAIN A LIFE LESSON ============================ */

const d16Sprint: TestReadySprint = {
  type: "story-retell",
  title: "STORY RETELL",
  titleEs: "CUENTA LA HISTORIA",
  instruction: "Listen, then retell it and add the lesson.",
  instructionEs: "Escucha, vuelve a contarlo y agrega la lección.",
  items: [
    { id: "a3d16-sr1", audio: "I once accepted a project without asking questions. It took three weeks longer because I misunderstood what the client wanted.", maxSeconds: 40 },
    { id: "a3d16-sr2", audio: "I stayed quiet in a meeting because I was afraid of my accent. Later someone else said exactly my idea and everyone liked it.", maxSeconds: 40 },
    { id: "a3d16-sr3", audio: "I helped a coworker for two weeks without being asked, and a year later she recommended me for a better job.", maxSeconds: 40 },
  ],
};

const d16 = advanced3Day({
  day: 16,
  topic: "Explain a Life Lesson",
  topicEs: "Explica una lección de vida",
  focus: "EXPERIENCE → LESSON → WHY → NOW",
  focusEs: "EXPERIENCIA → LECCIÓN → POR QUÉ → AHORA",
  intro: {
    title: "EXPLAIN A LIFE LESSON",
    titleEs: "EXPLICA UNA LECCIÓN DE VIDA",
    lead: "A mature answer connects an experience to what you do today. Framework: EXPERIENCE → LESSON → WHY → NOW.",
    leadEs: "Una respuesta madura conecta una experiencia con lo que haces hoy. Estructura: EXPERIENCIA → LECCIÓN → POR QUÉ → AHORA.",
    examples: ["Something that taught me a lot was…", "What I learned was…", "Now I…"],
    goal: "Connect an experience to today in 45–60 seconds.",
    goalEs: "Conecta una experiencia con hoy en 45–60 segundos.",
    cta: START,
  },
  lines: [
    l("a3d16-1", "Something that taught me a lot | was staying quiet in a meeting two years ago.", "Algo que me enseñó mucho fue quedarme callado/a en una reunión hace dos años."),
    l("a3d16-2", "I had an idea, | but I was afraid of saying it badly in English.", "Tenía una idea, pero tenía miedo de decirla mal en inglés."),
    l("a3d16-3", "Ten minutes later | another person said almost the same thing.", "Diez minutos después otra persona dijo casi lo mismo."),
    l("a3d16-4", "What I learned was | that silence looks the same as having nothing to say.", "Lo que aprendí fue que el silencio se ve igual que no tener nada que decir."),
    l("a3d16-5", "The reason it matters | is that people can't value an idea they never heard.", "La razón por la que importa es que la gente no puede valorar una idea que nunca escuchó."),
    l("a3d16-6", "Now I speak early in a meeting, | even if my sentence isn't perfect.", "Ahora hablo temprano en una reunión, aunque mi oración no sea perfecta."),
    l("a3d16-7", "I also prepare one question | before I walk in.", "También preparo una pregunta antes de entrar."),
    l("a3d16-8", "Looking back, | that uncomfortable day changed how I work.", "Mirando atrás, ese día incómodo cambió cómo trabajo."),
  ],
  rep2Chunks: chunks4("a3d16"),
  prompts: [
    q("a3d16-p1", "What experience taught you something important?", "¿Qué experiencia te enseñó algo importante?", "Something that taught me a lot was…", "Algo que me enseñó mucho fue…", "EXPERIENCE"),
    q("a3d16-p2", "What exactly did you learn?", "¿Qué aprendiste exactamente?", "What I learned was…", "Lo que aprendí fue…", "LESSON"),
    q("a3d16-p3", "Why does that lesson matter?", "¿Por qué importa esa lección?", "The reason it matters is…", "La razón por la que importa es…", "WHY"),
    q("a3d16-p4", "What do you do differently now?", "¿Qué haces diferente ahora?", "Now I…", "Ahora yo…", "NOW", "explain"),
    q("a3d16-p5", "What would you tell someone in that same situation?", "¿Qué le dirías a alguien en esa misma situación?", "I'd tell them…", "Le diría…", "ADVICE", "react"),
  ],
  cues: ["EXPERIENCE", "LESSON", "WHY", "NOW"],
  powerChunks: { core: ["What I learned was…", "Looking back…"], stretch: "The reason it matters is…" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "What is an important lesson you learned from experience?", questionEs: "¿Cuál es una lección importante que aprendiste de la experiencia?" },
  rep5Tips: { en: "EXPERIENCE → LESSON → WHY → NOW.", es: "EXPERIENCIA → LECCIÓN → POR QUÉ → AHORA." },
  rep5Turns: [
    turn("a3d16-turn1", QUESTIONER, "What is an important lesson you learned from experience?", "¿Cuál es una lección importante que aprendiste de la experiencia?", "male", { targetSeconds: SUSTAIN }),
    turn("a3d16-turn2", QUESTIONER, "How has that changed what you do now?", "¿Cómo ha cambiado eso lo que haces ahora?", "male", { targetSeconds: DEVELOP }),
    repairTurn("a3d16-repair", "time", QUESTIONER, "And is there a lesson you know but still don't apply?", "¿Y hay una lección que conoces pero todavía no aplicas?", "male"),
  ],
  speakerVoice: "male",
  testReady: d16Sprint,
});

/* ============================ DAY 17 — EXPLAIN YOUR PROGRESS ============================ */

const d17Sprint: TestReadySprint = {
  type: "speak-now",
  title: "SPEAK NOW",
  titleEs: "HABLA AHORA",
  instruction: "10 seconds to think. Before → progress → now → next.",
  instructionEs: "10 segundos para pensar. Antes → progreso → ahora → siguiente.",
  thinkSeconds: 10,
  speakSeconds: 35,
  items: [
    { id: "a3d17-sn1", text: "How you are different from one year ago.", textEs: "En qué eres diferente a hace un año.", maxSeconds: 40 },
    { id: "a3d17-sn2", text: "A skill you are still building.", textEs: "Una habilidad que sigues construyendo.", maxSeconds: 40 },
    { id: "a3d17-sn3", text: "What you want to be able to do in six months.", textEs: "Qué quieres poder hacer en seis meses.", maxSeconds: 40 },
  ],
};

const d17 = advanced3Day({
  day: 17,
  topic: "Explain Your Progress",
  topicEs: "Explica tu progreso",
  focus: "BEFORE → PROGRESS → NOW → NEXT",
  focusEs: "ANTES → PROGRESO → AHORA → SIGUIENTE",
  intro: {
    title: "EXPLAIN YOUR PROGRESS",
    titleEs: "EXPLICA TU PROGRESO",
    lead: "Talking about progress is not bragging. Say where you started, what you did, where you are, and what's next.",
    leadEs: "Hablar de tu progreso no es presumir. Di dónde empezaste, qué hiciste, dónde estás y qué sigue.",
    examples: ["A year ago I couldn't…", "Since then, I've…", "Now I can…"],
    goal: "Explain real progress in 45–60 seconds.",
    goalEs: "Explica un progreso real en 45–60 segundos.",
    cta: START,
  },
  lines: [
    l("a3d17-1", "A year ago | I couldn't answer a question in English without preparing it first.", "Hace un año no podía responder una pregunta en inglés sin prepararla antes."),
    l("a3d17-2", "I understood almost everything, | but speaking was a different world.", "Entendía casi todo, pero hablar era otro mundo."),
    l("a3d17-3", "Since then, | I've practiced out loud almost every day.", "Desde entonces, he practicado en voz alta casi todos los días."),
    l("a3d17-4", "I've also started recording myself, | which was uncomfortable at first.", "También empecé a grabarme, lo cual fue incómodo al principio."),
    l("a3d17-5", "Now I can explain a problem at work | without translating in my head.", "Ahora puedo explicar un problema en el trabajo sin traducir en mi cabeza."),
    l("a3d17-6", "I still need to improve | when the other person speaks very fast.", "Todavía necesito mejorar cuando la otra persona habla muy rápido."),
    l("a3d17-7", "Next, | I want to handle a full meeting without preparing anything.", "Lo siguiente es manejar una reunión completa sin preparar nada."),
    l("a3d17-8", "The real change | is that I don't avoid speaking anymore.", "El cambio real es que ya no evito hablar."),
  ],
  rep2Chunks: chunks4("a3d17"),
  prompts: [
    q("a3d17-p1", "What couldn't you do one year ago?", "¿Qué no podías hacer hace un año?", "A year ago I couldn't…", "Hace un año no podía…", "BEFORE"),
    q("a3d17-p2", "What have you done since then?", "¿Qué has hecho desde entonces?", "Since then, I've…", "Desde entonces, he…", "PROGRESS"),
    q("a3d17-p3", "What can you do now?", "¿Qué puedes hacer ahora?", "Now I can…", "Ahora puedo…", "NOW"),
    q("a3d17-p4", "What do you still need to improve?", "¿Qué necesitas mejorar todavía?", "I still need to…", "Todavía necesito…", "NEXT", "explain"),
    q("a3d17-p5", "What is the real change in you?", "¿Cuál es el cambio real en ti?", "The real change is…", "El cambio real es…", "REFLECT", "react"),
  ],
  cues: ["BEFORE", "PROGRESS", "NOW", "NEXT"],
  powerChunks: { core: ["Since then, I've…", "Now I can…"], stretch: "The real change is…" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "How are you different from one year ago?", questionEs: "¿En qué eres diferente a hace un año?" },
  rep5Tips: { en: "BEFORE → PROGRESS → NOW → NEXT.", es: "ANTES → PROGRESO → AHORA → SIGUIENTE." },
  rep5Turns: [
    turn("a3d17-turn1", QUESTIONER, "How are you different from one year ago?", "¿En qué eres diferente a hace un año?", "female", { targetSeconds: SUSTAIN }),
    turn("a3d17-turn2", QUESTIONER, "What do you still need to improve?", "¿Qué necesitas mejorar todavía?", "female", { targetSeconds: DEVELOP }),
    repairTurn("a3d17-repair", "catch", QUESTIONER, "And how will you know when you've reached that level?", "¿Y cómo sabrás cuándo llegaste a ese nivel?", "female"),
  ],
  speakerVoice: "female",
  testReady: d17Sprint,
});

/* ============================ DAY 18 — EXPLAIN RESPONSIBILITY ============================ */

const d18Sprint: TestReadySprint = {
  type: "listen-respond",
  title: "LISTEN & RESPOND",
  titleEs: "ESCUCHA Y RESPONDE",
  instruction: "Listen and answer with a clear idea and an example.",
  instructionEs: "Escucha y responde con una idea clara y un ejemplo.",
  items: [
    { id: "a3d18-lr1", audio: "What does being responsible at work mean to you?", maxSeconds: 35 },
    { id: "a3d18-lr2", audio: "Is being on time part of being responsible, or is it something else?", maxSeconds: 35 },
    { id: "a3d18-lr3", audio: "What should someone do when they make a mistake nobody noticed?", maxSeconds: 35 },
    { id: "a3d18-lr4", audio: "Can a person be responsible and still say no to extra work?", maxSeconds: 35 },
  ],
};

const d18 = advanced3Day({
  day: 18,
  topic: "Explain Responsibility",
  topicEs: "Explica la responsabilidad",
  focus: "ROLE → RESPONSIBILITY → EXAMPLE → IMPACT",
  focusEs: "ROL → RESPONSABILIDAD → EJEMPLO → IMPACTO",
  intro: {
    title: "EXPLAIN RESPONSIBILITY",
    titleEs: "EXPLICA LA RESPONSABILIDAD",
    lead: "Today you explain an idea, not your CV. What does responsibility actually mean, and what does it look like in real life?",
    leadEs: "Hoy explicas una idea, no tu currículum. ¿Qué significa realmente la responsabilidad y cómo se ve en la vida real?",
    examples: ["To me, it means…", "A clear example is…", "The impact is…"],
    goal: "Explain the concept with a real example in 45–60 seconds.",
    goalEs: "Explica el concepto con un ejemplo real en 45–60 segundos.",
    cta: START,
  },
  lines: [
    l("a3d18-1", "To me, | being responsible is not the same as never making mistakes.", "Para mí, ser responsable no es lo mismo que nunca cometer errores."),
    l("a3d18-2", "It means | doing what you said you would do, even when it's inconvenient.", "Significa hacer lo que dijiste que harías, incluso cuando es incómodo."),
    l("a3d18-3", "In my role, | that starts with being clear about what I can and can't finish.", "En mi rol, eso empieza por ser claro/a sobre lo que puedo y no puedo terminar."),
    l("a3d18-4", "A clear example is | when I break something in a system by accident.", "Un ejemplo claro es cuando rompo algo en un sistema por accidente."),
    l("a3d18-5", "The responsible move | is to report it immediately, not to wait and hope.", "Lo responsable es reportarlo de inmediato, no esperar y confiar en la suerte."),
    l("a3d18-6", "It matters even when nobody is watching, | because the problem doesn't disappear.", "Importa incluso cuando nadie está mirando, porque el problema no desaparece."),
    l("a3d18-7", "The impact is | that people can plan around you.", "El impacto es que la gente puede planear contando contigo."),
    l("a3d18-8", "And that trust | is worth more than looking perfect.", "Y esa confianza vale más que parecer perfecto/a."),
  ],
  rep2Chunks: chunks4("a3d18"),
  prompts: [
    q("a3d18-p1", "Define responsibility in your own words.", "Define la responsabilidad con tus palabras.", "To me, it means…", "Para mí, significa…", "ROLE"),
    q("a3d18-p2", "What does it look like day to day?", "¿Cómo se ve en el día a día?", "In practice, it's…", "En la práctica, es…", "RESPONSIBILITY"),
    q("a3d18-p3", "Give a real example.", "Da un ejemplo real.", "A clear example is…", "Un ejemplo claro es…", "EXAMPLE"),
    q("a3d18-p4", "Why does it matter when nobody is watching?", "¿Por qué importa cuando nadie está mirando?", "It matters because…", "Importa porque…", "IMPACT", "explain"),
    q("a3d18-p5", "Can someone be responsible and still say no?", "¿Se puede ser responsable y aun así decir que no?", "I'd say…", "Yo diría que…", "OPINION", "justify"),
  ],
  cues: ["ROLE", "RESPONSIBILITY", "EXAMPLE", "IMPACT"],
  powerChunks: { core: ["To me, it means…", "A clear example is…"], stretch: "The impact is…" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "What does being responsible at work mean to you?", questionEs: "¿Qué significa para ti ser responsable en el trabajo?" },
  rep5Tips: { en: "ROLE → RESPONSIBILITY → EXAMPLE → IMPACT.", es: "ROL → RESPONSABILIDAD → EJEMPLO → IMPACTO." },
  rep5Turns: [
    turn("a3d18-turn1", QUESTIONER, "What does being responsible at work mean to you?", "¿Qué significa para ti ser responsable en el trabajo?", "male", { targetSeconds: SUSTAIN }),
    turn("a3d18-turn2", QUESTIONER, "Give me an example where responsibility matters even when nobody is watching.", "Dame un ejemplo donde la responsabilidad importa aunque nadie esté mirando.", "male", { targetSeconds: DEVELOP }),
    repairTurn("a3d18-repair", "confirm", QUESTIONER, "So you're saying responsibility is mostly about trust, right?", "¿Entonces dices que la responsabilidad se trata sobre todo de confianza, verdad?", "male"),
  ],
  speakerVoice: "male",
  testReady: d18Sprint,
});

/* ============================ DAY 19 — TALK ABOUT A REGRET ============================ */

const d19Sprint: TestReadySprint = {
  type: "speak-now",
  title: "SPEAK NOW",
  titleEs: "HABLA AHORA",
  instruction: "10 seconds to think. Decision → consequence → what you'd change → lesson.",
  instructionEs: "10 segundos para pensar. Decisión → consecuencia → qué cambiarías → lección.",
  thinkSeconds: 10,
  speakSeconds: 35,
  items: [
    { id: "a3d19-sn1", text: "A decision you would make differently today.", textEs: "Una decisión que hoy tomarías diferente.", maxSeconds: 40 },
    { id: "a3d19-sn2", text: "Something you should have started earlier.", textEs: "Algo que deberías haber empezado antes.", maxSeconds: 40 },
    { id: "a3d19-sn3", text: "An opportunity you didn't take.", textEs: "Una oportunidad que no tomaste.", maxSeconds: 40 },
  ],
};

const d19 = advanced3Day({
  day: 19,
  topic: "Talk About a Regret",
  topicEs: "Habla de un arrepentimiento",
  focus: "DECISION → CONSEQUENCE → WHAT YOU'D CHANGE → LESSON",
  focusEs: "DECISIÓN → CONSECUENCIA → QUÉ CAMBIARÍAS → LECCIÓN",
  intro: {
    title: "TALK ABOUT A REGRET",
    titleEs: "HABLA DE UN ARREPENTIMIENTO",
    lead: "Talking about a regret is not complaining. Say the decision, what happened, what you would do differently, and what it taught you.",
    leadEs: "Hablar de un arrepentimiento no es quejarse. Di la decisión, qué pasó, qué harías diferente y qué te enseñó.",
    examples: ["I should have…", "I could have…", "What I learned was…"],
    goal: "Talk about a real decision honestly in 45–60 seconds.",
    goalEs: "Habla de una decisión real con honestidad en 45–60 segundos.",
    cta: START,
  },
  lines: [
    l("a3d19-1", "A few years ago | I said no to a job because it scared me.", "Hace unos años dije que no a un trabajo porque me daba miedo."),
    l("a3d19-2", "The position needed English every day, | and I didn't feel ready.", "El puesto requería inglés todos los días y no me sentía listo/a."),
    l("a3d19-3", "The consequence was | that I stayed two more years in the same place.", "La consecuencia fue que me quedé dos años más en el mismo lugar."),
    l("a3d19-4", "Looking back, | I should have said yes and learned inside the job.", "Mirando atrás, debí haber dicho que sí y aprender dentro del trabajo."),
    l("a3d19-5", "I could have asked for | three months to improve instead of refusing.", "Pude haber pedido tres meses para mejorar en vez de rechazarlo."),
    l("a3d19-6", "I shouldn't have decided | in one day, honestly.", "No debí haber decidido en un día, honestamente."),
    l("a3d19-7", "What I learned was | that waiting to feel ready is a slow way to grow.", "Lo que aprendí fue que esperar a sentirse listo es una forma lenta de crecer."),
    l("a3d19-8", "Now, | when something scares me a little, I take it as information, not as a stop sign.", "Ahora, cuando algo me da un poco de miedo, lo tomo como información, no como una señal de alto."),
  ],
  rep2Chunks: chunks4("a3d19"),
  prompts: [
    q("a3d19-p1", "What decision would you make differently?", "¿Qué decisión tomarías diferente?", "A few years ago I…", "Hace unos años yo…", "DECISION"),
    q("a3d19-p2", "What happened because of it?", "¿Qué pasó por eso?", "The consequence was…", "La consecuencia fue…", "CONSEQUENCE"),
    q("a3d19-p3", "What should you have done instead?", "¿Qué deberías haber hecho en su lugar?", "I should have…", "Debí haber…", "CHANGE"),
    q("a3d19-p4", "What did you learn?", "¿Qué aprendiste?", "What I learned was…", "Lo que aprendí fue…", "LESSON", "explain"),
    q("a3d19-p5", "How do you decide now?", "¿Cómo decides ahora?", "Now, when…", "Ahora, cuando…", "NOW", "react"),
  ],
  cues: ["DECISION", "CONSEQUENCE", "COULD/SHOULD HAVE", "LESSON"],
  powerChunks: { core: ["I should have…", "I could have…"], stretch: "What I learned was…" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: { question: "Tell me about a decision you would make differently today.", questionEs: "Cuéntame de una decisión que hoy tomarías diferente." },
  rep5Tips: { en: "DECISION → CONSEQUENCE → COULD/SHOULD HAVE → LESSON.", es: "DECISIÓN → CONSECUENCIA → PUDE/DEBÍ HABER → LECCIÓN." },
  rep5Turns: [
    turn("a3d19-turn1", QUESTIONER, "Tell me about a decision you would make differently today.", "Cuéntame de una decisión que hoy tomarías diferente.", "female", { targetSeconds: SUSTAIN }),
    turn("a3d19-turn2", QUESTIONER, "What should you have done instead?", "¿Qué deberías haber hecho en su lugar?", "female", { targetSeconds: DEVELOP }),
    repairTurn("a3d19-repair", "mixed", QUESTIONER, "And what did you learn that you still use today?", "¿Y qué aprendiste que todavía usas hoy?", "female"),
  ],
  speakerVoice: "female",
  testReady: d19Sprint,
});

/* ============================ DAY 20 — BEYOND THE SCRIPT FINAL ============================ */
/* FIVE rounds, five answer architectures. No model answer, no toolbox, tiny cues only. */

const d20Sprint: TestReadySprint = {
  type: "mixed",
  title: "BEYOND THE SCRIPT SPRINT",
  titleEs: "SPRINT MÁS ALLÁ DEL GUION",
  instruction: "Five final activities. No preparation — recognize, organize, speak.",
  instructionEs: "Cinco actividades finales. Sin preparación: reconoce, organiza, habla.",
  items: [
    { id: "a3d20-m1", kind: "quick-answers", audio: "Do people learn more from success or from failure?", maxSeconds: 25 },
    { id: "a3d20-m2", kind: "story-retell", audio: "The train stopped between two stations for forty minutes. Nobody explained anything, and I had an interview at ten.", maxSeconds: 40 },
    { id: "a3d20-m3", kind: "speak-now", text: "Explain electricity to someone who has never seen a light.", textEs: "Explica la electricidad a alguien que nunca ha visto una luz.", thinkSeconds: 10, maxSeconds: 40 },
    { id: "a3d20-m4", kind: "listen-respond", audio: "What would you do if you had to lead a team that speaks better English than you?", maxSeconds: 40 },
    { id: "a3d20-m5", kind: "speak-now", text: "Something you believe today that you didn't believe before.", textEs: "Algo que crees hoy y que antes no creías.", thinkSeconds: 10, maxSeconds: 40 },
  ],
};

const d20 = advanced3Day({
  day: 20,
  topic: "Beyond the Script Final",
  topicEs: "Final Más allá del guion",
  focus: "Five rounds · STORY · OPINION · EXPLAIN · HYPOTHETICAL · REFLECT",
  focusEs: "Cinco rondas · HISTORIA · OPINIÓN · EXPLICAR · HIPOTÉTICO · REFLEXIONAR",
  intro: {
    title: "🔥 BEYOND THE SCRIPT",
    titleEs: "🔥 MÁS ALLÁ DEL GUION",
    lead: "No model. No prepared answer. Just think and speak.",
    leadEs: "Sin modelo. Sin respuesta preparada. Piensa y habla.",
    examples: ["RECOGNIZE", "ORGANIZE", "SPEAK"],
    goal: "Five rounds, five kinds of answer. Recognize the type, then build it yourself.",
    goalEs: "Cinco rondas, cinco tipos de respuesta. Reconoce el tipo y construye tú.",
    cta: START,
  },
  lines: [
    l("a3d20-1", "This is the last day, | and there is no script today.", "Este es el último día y hoy no hay guion."),
    l("a3d20-2", "You already know the five shapes: | story, explain, opinion, hypothetical, reflect.", "Ya conoces las cinco formas: historia, explicar, opinión, hipotético, reflexionar."),
    l("a3d20-3", "When a question arrives, | you take one second and choose the shape.", "Cuando llega una pregunta, te tomas un segundo y eliges la forma."),
    l("a3d20-4", "Then you start talking | before the answer is perfect.", "Luego empiezas a hablar antes de que la respuesta sea perfecta."),
    l("a3d20-5", "If you get lost, | you say what you mean in a different way.", "Si te pierdes, dices lo que quieres decir de otra forma."),
    l("a3d20-6", "If you need a second, | you say so, and you keep going.", "Si necesitas un segundo, lo dices y sigues."),
    l("a3d20-7", "That's the whole skill: | recognize, organize, speak, adapt.", "Esa es toda la habilidad: reconoce, organiza, habla, adáptate."),
    l("a3d20-8", "Today you don't repeat a model. | Today you build the answer yourself.", "Hoy no repites un modelo. Hoy construyes la respuesta tú."),
  ],
  rep2Chunks: chunks4("a3d20"),
  prompts: [
    q("a3d20-p1", "Tell me about a moment when something didn't go according to plan.", "Cuéntame de un momento en que algo no salió según el plan.", "", "", "STORY"),
    q("a3d20-p2", "Is technology making people more connected or more isolated?", "¿La tecnología conecta más a la gente o la aísla más?", "", "", "OPINION"),
    q("a3d20-p3", "Explain the internet to someone from 1900.", "Explica el internet a alguien de 1900.", "", "", "EXPLAIN"),
    q("a3d20-p4", "If you became the manager of your team tomorrow, what would you change first?", "Si mañana fueras el jefe de tu equipo, ¿qué cambiarías primero?", "", "", "HYPOTHETICAL"),
    q("a3d20-p5", "What is one belief or habit you have changed in the last few years?", "¿Qué creencia o hábito has cambiado en los últimos años?", "", "", "REFLECT"),
  ],
  cues: ["RECOGNIZE", "ORGANIZE", "SPEAK", "ADAPT"],
  powerChunks: { core: ["What I mean is…", "Let me explain that differently."], stretch: "I haven't thought about that before, but…" },
  goalSeconds: DEVELOP,
  goalSentences: 6,
  hideModelText: true,
  rep5Prompt: {
    question: "Five rounds. No model, no prepared answer — recognize the answer type and speak.",
    questionEs: "Cinco rondas. Sin modelo ni respuesta preparada — reconoce el tipo de respuesta y habla.",
  },
  rep5Tips: {
    en: "RECOGNIZE → ORGANIZE → SPEAK → ADAPT. You build the language.",
    es: "RECONOCE → ORGANIZA → HABLA → ADÁPTATE. Tú construyes el lenguaje.",
  },
  rep5Turns: [
    /* ROUND 1 — STORY */
    answerTypeTurn("a3d20-turn1", QUESTIONER, "Tell me about a moment when something didn't go according to plan.", "Cuéntame de un momento en que algo no salió según el plan.", "female", ALL_ANSWER_TYPES, "story", {
      targetSeconds: SUSTAIN,
      cues: ["SETTING", "ACTION", "RESULT", "LESSON"],
    }),
    turn("a3d20-turn2", QUESTIONER, "What did you do when you realized the plan wasn't working?", "¿Qué hiciste cuando te diste cuenta de que el plan no funcionaba?", "female", { targetSeconds: DEVELOP }),
    /* ROUND 2 — OPINION */
    answerTypeTurn("a3d20-turn3", QUESTIONER, "Is technology making people more connected or more isolated?", "¿La tecnología está conectando más a la gente o aislándola más?", "male", ALL_ANSWER_TYPES, "opinion", {
      targetSeconds: DEVELOP,
    }),
    turn("a3d20-turn4", QUESTIONER, "What would someone who disagrees with you say?", "¿Qué diría alguien que no está de acuerdo contigo?", "male", { targetSeconds: DEVELOP }),
    /* ROUND 3 — EXPLAIN */
    answerTypeTurn("a3d20-turn5", QUESTIONER, "Explain the internet to someone from 1900.", "Explica el internet a alguien de 1900.", "female", ALL_ANSWER_TYPES, "explain", {
      targetSeconds: DEVELOP,
    }),
    turn("a3d20-turn6", QUESTIONER, "Now explain it without using the words computer or phone.", "Ahora explícalo sin usar las palabras computadora ni teléfono.", "female", { targetSeconds: DEVELOP }),
    /* ROUND 4 — HYPOTHETICAL */
    answerTypeTurn("a3d20-turn7", QUESTIONER, "If you suddenly became the manager of your team tomorrow, what would you change first?", "Si de repente mañana fueras el jefe de tu equipo, ¿qué cambiarías primero?", "male", ALL_ANSWER_TYPES, "hypothetical", {
      targetSeconds: DEVELOP,
      cues: ["CHOICE", "WHY", "CONSEQUENCE"],
    }),
    turn("a3d20-turn8", QUESTIONER, "What could go wrong with that decision?", "¿Qué podría salir mal con esa decisión?", "male", { targetSeconds: DEVELOP }),
    /* ROUND 5 — REFLECT */
    answerTypeTurn("a3d20-turn9", QUESTIONER, "What is one belief or habit you have changed in the last few years?", "¿Qué creencia o hábito has cambiado en los últimos años?", "female", ALL_ANSWER_TYPES, "reflect", {
      targetSeconds: DEVELOP,
    }),
    /* ONE repair moment for the whole final. */
    repairTurn("a3d20-repair", "restart", QUESTIONER, "Could you explain what you mean by that in a different way?", "¿Podrías explicar lo que quieres decir de otra forma?", "female"),
  ],
  speakerVoice: "female",
  testReady: d20Sprint,
});

export const ADVANCED_3_WEEKS_2_4_DAYS: CourseDay[] = [d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20];
