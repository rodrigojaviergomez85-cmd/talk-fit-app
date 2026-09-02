/**
 * EAGLES — WEEKS 2–4 (Days 6–20)
 *
 * WEEK 2 · UNDERSTAND, CLARIFY & SOLVE — SOLVE (Customer Service #1)
 * WEEK 3 · COMPARE, EXPLAIN & CHOOSE  — JUSTIFY
 * WEEK 4 · HANDLE, PERSUADE & CLOSE   — ADAPT (Customer Service #2 + Sales #2)
 *
 * Same module id ("eagles-week-1") and same 5-Rep methodology as Week 1.
 * All ids use the `e6-*`…`e20-*` prefix and never collide with Week 1.
 * Customer turns in role plays are FIXED and prewritten — no generative AI.
 */
import type { CourseDay } from "@/lib/types";
import { card, l, makeDay, p } from "./course-builders";

import sceneFilmSet from "@/assets/eagles/scene-d6-film-set.jpg";
import cueLatePackage from "@/assets/eagles/cue-d7-late-package.jpg";
import cueTravelProblem from "@/assets/eagles/cue-d7-travel-problem.jpg";
import cueLostPhone from "@/assets/eagles/cue-d7-lost-phone.jpg";
import sceneJobPrep from "@/assets/eagles/scene-d8-job-prep.jpg";
import sceneInternet from "@/assets/eagles/scene-d9-internet-problem.jpg";
import sceneDelayedPackage from "@/assets/eagles/scene-d10-delayed-package.jpg";
import sceneBeforeNow from "@/assets/eagles/scene-d11-before-now.jpg";
import sceneBikeCar from "@/assets/eagles/scene-d12-bike-vs-car.jpg";
import sceneHomeOffice from "@/assets/eagles/scene-d13-home-vs-office.jpg";
import sceneJobOffers from "@/assets/eagles/scene-d14-job-offers.jpg";
import sceneGreatEmployee from "@/assets/eagles/scene-d15-great-employee.jpg";
import sceneFutureCareer from "@/assets/eagles/scene-d16-future-career.jpg";
import sceneAchievements from "@/assets/eagles/scene-d17-achievements.jpg";
import sceneProgress from "@/assets/eagles/scene-d18-progress.jpg";
import sceneUpsetCustomer from "@/assets/eagles/scene-d19-upset-customer.jpg";
import scenePlans from "@/assets/eagles/scene-d20-plans.jpg";
import sceneSalesConsult from "@/assets/eagles/scene-d20-sales-consult.jpg";

const START = "START REP 1";
const chunks4 = (prefix: string): string[][] => [
  [`${prefix}-1`, `${prefix}-2`],
  [`${prefix}-3`, `${prefix}-4`],
  [`${prefix}-5`, `${prefix}-6`],
  [`${prefix}-7`, `${prefix}-8`],
];

/* ====================================================================== */
/* WEEK 2 — UNDERSTAND, CLARIFY & SOLVE                                     */
/* ====================================================================== */

/* ---------------------------- DAY 6 — THEN & NOW ---------------------------- */

const d6 = makeDay({
  day: 6,
  topic: "Then & Now",
  topicEs: "Antes y ahora",
  focus: "Past progressive + present progressive",
  focusEs: "Pasado progresivo + presente progresivo",
  intro: {
    title: "THEN & NOW",
    titleEs: "ANTES Y AHORA",
    lead: "Compare what was happening yesterday at 10:00 with what is happening right now.",
    leadEs: "Compara lo que estaba pasando ayer a las 10:00 con lo que está pasando ahora mismo.",
    examples: ["Yesterday morning, he was studying a new script.", "Right now, Daniel is recording an important scene.", "Overall, everyone is working hard to finish the project."],
    goal: "Speak for 45–60 seconds. Connect 6–8 ideas.",
    goalEs: "Habla 45–60 segundos. Conecta 6–8 ideas.",
    cta: START,
  },
  lines: [
    l("e6-1", "Daniel works as an actor, | so his schedule changes frequently.", "Daniel trabaja como actor, así que su horario cambia con frecuencia."),
    l("e6-2", "Yesterday morning, | he was studying a new script.", "Ayer por la mañana, estaba estudiando un guion nuevo."),
    l("e6-3", "While he was studying, | his director was preparing the scene.", "Mientras él estudiaba, su director estaba preparando la escena."),
    l("e6-4", "The other actors | were practicing in another room.", "Los otros actores estaban practicando en otra sala."),
    l("e6-5", "Right now, | Daniel is recording an important scene.", "Ahora mismo, Daniel está grabando una escena importante."),
    l("e6-6", "His director | is watching him carefully.", "Su director lo está observando con atención."),
    l("e6-7", "The production team | is working behind the cameras.", "El equipo de producción está trabajando detrás de las cámaras."),
    l("e6-8", "Overall, everyone is working hard | to finish the project.", "En general, todos están trabajando duro para terminar el proyecto."),
  ],
  rep2Chunks: chunks4("e6"),
  prompts: [
    p("e6-p1", "What was Daniel doing yesterday?", "¿Qué estaba haciendo Daniel ayer?", "Yesterday, Daniel was…", "Ayer, Daniel estaba…", "ANSWER"),
    p("e6-p2", "What were the other people doing?", "¿Qué estaban haciendo las otras personas?", "At that moment, the director was… and the actors were…", "En ese momento, el director estaba… y los actores estaban…", "EXPLAIN"),
    p("e6-p3", "What is Daniel doing right now?", "¿Qué está haciendo Daniel ahora mismo?", "Right now, he is…", "Ahora mismo, él está…", "ANSWER"),
    p("e6-p4", "What has changed?", "¿Qué ha cambiado?", "Yesterday he was…, but now he is…", "Ayer él estaba…, pero ahora está…", "COMPARE"),
    p("e6-p5", "How is the situation different now?", "¿En qué es diferente la situación ahora?", "The situation is different because… Overall, …", "La situación es diferente porque… En general, …", "EXPLAIN"),
  ],
  cues: ["YESTERDAY 10:00", "WHO?", "RIGHT NOW", "WHAT CHANGED?", "OVERALL"],
  powerChunks: { core: ["at that moment…", "right now…"], stretch: "while this was happening…" },
  sceneImage: { src: sceneFilmSet, alt: "Left: yesterday at 10:00, Daniel studying a script while the director prepared the scene. Right: right now, Daniel recording a scene while the crew works", altEs: "Izquierda: ayer a las 10:00, Daniel estudiando un guion mientras el director preparaba la escena. Derecha: ahora mismo, Daniel grabando mientras el equipo trabaja" },
  goalSeconds: [45, 60],
  goalSentences: 6,
  rep5Prompt: { question: "Compare yesterday with right now.", questionEs: "Compara ayer con ahora mismo." },
  rep5Tips: {
    en: "Start with yesterday: at that moment… + while… Then switch: right now… Close with what changed.",
    es: "Empieza con ayer: at that moment… + while… Luego cambia: right now… Cierra con lo que cambió.",
  },
  speakerVoice: "male",
  testReady: {
    type: "repeat",
    title: "REPEAT IT",
    titleEs: "REPÍTELO",
    instruction: "Listen once. Remember. Repeat.",
    instructionEs: "Escucha una vez. Recuerda. Repite.",
    playOnce: true,
    items: [
      { id: "e6-tr1", audio: "Daniel was studying his script.", maxSeconds: 10 },
      { id: "e6-tr2", audio: "Daniel was studying his script while the director was preparing the scene.", maxSeconds: 12 },
      { id: "e6-tr3", audio: "The other actors were practicing in another room at that moment.", maxSeconds: 12 },
      { id: "e6-tr4", audio: "Right now, Daniel is recording an important scene and his director is watching him.", maxSeconds: 14 },
      { id: "e6-tr5", audio: "Yesterday everyone was preparing, but right now the whole team is working hard to finish the project.", maxSeconds: 16 },
    ],
  },
});

/* ------------------------- DAY 7 — HAVE YOU EVER…? ------------------------- */

const d7 = makeDay({
  day: 7,
  topic: "Have You Ever…?",
  topicEs: "¿Alguna vez…?",
  focus: "Present perfect — experiences with details",
  focusEs: "Presente perfecto — experiencias con detalles",
  intro: {
    title: "HAVE YOU EVER…?",
    titleEs: "¿ALGUNA VEZ…?",
    lead: "Talk about a difficult experience — and develop it with details.",
    leadEs: "Habla de una experiencia difícil — y desarróllala con detalles.",
    examples: ["I have had problems with online orders before.", "One time, my package arrived several days late.", "Since then, I have checked delivery information more carefully."],
    goal: "Speak for 45–60 seconds. Connect 6–8 ideas.",
    goalEs: "Habla 45–60 segundos. Conecta 6–8 ideas.",
    cta: START,
  },
  lines: [
    l("e7-1", "I have had problems | with online orders before.", "He tenido problemas con pedidos en línea antes."),
    l("e7-2", "One time, | my package arrived several days late.", "Una vez, mi paquete llegó varios días tarde."),
    l("e7-3", "I have contacted customer service | about similar problems.", "He contactado a servicio al cliente por problemas parecidos."),
    l("e7-4", "They have usually answered | my questions quickly.", "Normalmente han respondido mis preguntas rápido."),
    l("e7-5", "However, that time, | nobody gave me a clear solution.", "Sin embargo, esa vez nadie me dio una solución clara."),
    l("e7-6", "I called again | because I needed the package urgently.", "Volví a llamar porque necesitaba el paquete con urgencia."),
    l("e7-7", "In the end, | the company solved the problem.", "Al final, la empresa resolvió el problema."),
    l("e7-8", "Since then, I have checked | delivery information more carefully.", "Desde entonces, reviso la información de entrega con más cuidado."),
  ],
  rep2Chunks: chunks4("e7"),
  prompts: [
    p("e7-p1", "Have you ever had a similar problem?", "¿Alguna vez has tenido un problema parecido?", "Yes, I have. I have experienced…", "Sí. He tenido…", "ANSWER"),
    p("e7-p2", "What happened?", "¿Qué pasó?", "One time, …", "Una vez, …", "EXPLAIN"),
    p("e7-p3", "How did you react?", "¿Cómo reaccionaste?", "At first, I… because…", "Al principio, yo… porque…", "EXPLAIN"),
    p("e7-p4", "How did you solve it?", "¿Cómo lo resolviste?", "In the end, I…", "Al final, yo…", "EXPLAIN"),
    p("e7-p5", "What have you learned from the experience?", "¿Qué has aprendido de la experiencia?", "Since then, I have… Overall, …", "Desde entonces, yo… En general, …", "DEFEND"),
  ],
  cues: ["EXPERIENCE", "ONE TIME…", "REACTION", "SOLUTION", "SINCE THEN"],
  powerChunks: { core: ["I have experienced…", "one time…"], stretch: "since then…" },
  storyPanels: [
    card("e7-package", cueLatePackage, "A woman checking a late delivery on her phone at an empty doorstep", "LATE PACKAGE"),
    card("e7-travel", cueTravelProblem, "A traveler looking at a delayed flights board", "TRAVEL PROBLEM"),
    card("e7-phone", cueLostPhone, "A person searching for a lost phone in a café", "LOST PHONE"),
  ],
  goalSeconds: [45, 60],
  goalSentences: 6,
  rep5Prompt: { question: "Tell me about a difficult experience you have had.", questionEs: "Cuéntame sobre una experiencia difícil que has tenido." },
  rep5Tips: {
    en: "I have experienced… → one time… → what happened → however… → in the end… → since then…",
    es: "I have experienced… → one time… → qué pasó → however… → in the end… → since then…",
  },
  speakerVoice: "female",
  testReady: {
    type: "quick-answers",
    title: "QUICK ANSWERS",
    titleEs: "RESPUESTAS RÁPIDAS",
    instruction: "Listen. Answer fast: Yes, I have… / No, I haven't… + one detail.",
    instructionEs: "Escucha. Responde rápido: Yes, I have… / No, I haven't… + un detalle.",
    items: [
      { id: "e7-tr1", audio: "Have you ever traveled by plane?", maxSeconds: 8 },
      { id: "e7-tr2", audio: "Have you ever lost something important?", maxSeconds: 8 },
      { id: "e7-tr3", audio: "Have you ever helped a customer?", maxSeconds: 8 },
      { id: "e7-tr4", audio: "Have you ever received a package late?", maxSeconds: 8 },
      { id: "e7-tr5", audio: "Have you ever taken a difficult exam?", maxSeconds: 8 },
      { id: "e7-tr6", audio: "Have you ever called customer service?", maxSeconds: 8 },
    ],
  },
});

/* ------------------ DAY 8 — WHAT HAVE YOU BEEN DOING LATELY? ------------------ */

const d8 = makeDay({
  day: 8,
  topic: "What Have You Been Doing Lately?",
  topicEs: "¿Qué has estado haciendo últimamente?",
  focus: "Present perfect progressive — ongoing effort",
  focusEs: "Presente perfecto progresivo — esfuerzo continuo",
  intro: {
    title: "ONGOING EFFORT",
    titleEs: "ESFUERZO CONTINUO",
    lead: "Explain what you have been doing to prepare for a better job — and the results.",
    leadEs: "Explica qué has estado haciendo para prepararte para un mejor trabajo — y los resultados.",
    examples: ["I have been preparing for a better job recently.", "For the past few weeks, I have been working on my speaking.", "As a result, I can express my ideas more clearly."],
    goal: "Speak for 50–60 seconds. Connect 7–8 ideas.",
    goalEs: "Habla 50–60 segundos. Conecta 7–8 ideas.",
    cta: START,
  },
  lines: [
    l("e8-1", "I have been preparing | for a better job recently.", "He estado preparándome para un mejor trabajo últimamente."),
    l("e8-2", "I have been practicing English | almost every day.", "He estado practicando inglés casi todos los días."),
    l("e8-3", "For the past few weeks, | I have been working on my speaking.", "Durante las últimas semanas, he estado trabajando en mi speaking."),
    l("e8-4", "I have also been listening | to English conversations.", "También he estado escuchando conversaciones en inglés."),
    l("e8-5", "Since I started this course, | I have been learning useful expressions.", "Desde que empecé este curso, he estado aprendiendo expresiones útiles."),
    l("e8-6", "I have been practicing | because I want to feel more confident.", "He estado practicando porque quiero sentirme más seguro."),
    l("e8-7", "As a result, | I can express my ideas more clearly.", "Como resultado, puedo expresar mis ideas con más claridad."),
    l("e8-8", "Overall, I have been working hard | to reach my goal.", "En general, he estado trabajando duro para alcanzar mi meta."),
  ],
  rep2Chunks: chunks4("e8"),
  prompts: [
    p("e8-p1", "What have you been doing to improve your English?", "¿Qué has estado haciendo para mejorar tu inglés?", "I have been…", "He estado…", "ANSWER"),
    p("e8-p2", "How long have you been doing it?", "¿Cuánto tiempo llevas haciéndolo?", "For the past… / Since I started…", "Durante los últimos… / Desde que empecé…", "EXPLAIN"),
    p("e8-p3", "How often have you been practicing?", "¿Con qué frecuencia has estado practicando?", "I have been practicing… every…", "He estado practicando… cada…", "EXPLAIN"),
    p("e8-p4", "Why have you been working on this goal?", "¿Por qué has estado trabajando en esta meta?", "I have been working on it because…", "He estado trabajando en esto porque…", "EXPLAIN"),
    p("e8-p5", "What results have you noticed?", "¿Qué resultados has notado?", "As a result, … Overall, …", "Como resultado, … En general, …", "DEFEND"),
  ],
  cues: ["WHAT?", "HOW LONG?", "HOW OFTEN?", "WHY?", "RESULT"],
  powerChunks: { core: ["for the past…", "since I started…"], stretch: "as a result…" },
  sceneImage: { src: sceneJobPrep, alt: "A young professional practicing English at night with headphones, a laptop and job notes", altEs: "Una joven profesional practicando inglés de noche con audífonos, laptop y notas de trabajo" },
  goalSeconds: [50, 60],
  goalSentences: 7,
  rep5Prompt: { question: "Tell me what you have been doing to prepare for a better job.", questionEs: "Cuéntame qué has estado haciendo para prepararte para un mejor trabajo." },
  rep5Tips: {
    en: "What → for the past… → how often → because… → as a result… → overall…",
    es: "Qué → for the past… → con qué frecuencia → because… → as a result… → overall…",
  },
  speakerVoice: "male",
  testReady: {
    type: "build-sentence",
    title: "BUILD THE SENTENCE",
    titleEs: "ARMA LA FRASE",
    instruction: "Look at the pieces. Say the complete sentence.",
    instructionEs: "Mira las piezas. Di la frase completa.",
    items: [
      { id: "e8-tr1", chunks: ["I", "have been", "practicing English", "every day"], audio: "I — have been — practicing English — every day", maxSeconds: 10 },
      { id: "e8-tr2", chunks: ["she", "has been preparing", "for a job interview"], audio: "she — has been preparing — for a job interview", maxSeconds: 10 },
      { id: "e8-tr3", chunks: ["we", "have been working", "on our speaking", "for weeks"], audio: "we — have been working — on our speaking — for weeks", maxSeconds: 12 },
      { id: "e8-tr4", chunks: ["he", "has been listening", "to English podcasts", "since January"], audio: "he — has been listening — to English podcasts — since January", maxSeconds: 12 },
      { id: "e8-tr5", chunks: ["they", "have been looking", "for a better job", "recently"], audio: "they — have been looking — for a better job — recently", maxSeconds: 12 },
    ],
  },
});

/* ------------------- DAY 9 — SOLVE THE PROBLEM (CS #1) ------------------- */

const d9 = makeDay({
  day: 9,
  topic: "Solve the Problem — Customer Service #1",
  topicEs: "Resuelve el problema — Servicio al cliente #1",
  focus: "Past · present perfect · present perfect progressive in a real call",
  focusEs: "Pasado · presente perfecto · presente perfecto progresivo en una llamada real",
  intro: {
    title: "SOLVE THE PROBLEM",
    titleEs: "RESUELVE EL PROBLEMA",
    lead: "A customer's internet has been failing since yesterday. Acknowledge → clarify → solve → confirm.",
    leadEs: "El internet de un cliente ha estado fallando desde ayer. Reconoce → aclara → resuelve → confirma.",
    examples: ["I'm sorry you've been having this problem.", "If I understand correctly, the connection started failing yesterday.", "Let me see what I can do to help you solve this."],
    goal: "Customer service role play: 3 customer turns. Speak 60–75 seconds in total.",
    goalEs: "Role play de servicio al cliente: 3 turnos del cliente. Habla 60–75 segundos en total.",
    cta: START,
  },
  lines: [
    l("e9-1", "I'm sorry | you've been having this problem.", "Lamento que haya estado teniendo este problema."),
    l("e9-2", "If I understand correctly, | the connection started failing yesterday.", "Si entiendo bien, la conexión empezó a fallar ayer."),
    l("e9-3", "You have also been trying | to fix it this morning.", "También ha estado intentando arreglarlo esta mañana."),
    l("e9-4", "Let me ask you a few questions | so I can understand the problem.", "Permítame hacerle algunas preguntas para entender el problema."),
    l("e9-5", "Have you restarted the router?", "¿Ha reiniciado el router?"),
    l("e9-6", "Have you checked the cables?", "¿Ha revisado los cables?"),
    l("e9-7", "Based on what you've told me, | we may need to run another test.", "Según lo que me ha dicho, puede que necesitemos hacer otra prueba."),
    l("e9-8", "Let me see what I can do | to help you solve this.", "Déjeme ver qué puedo hacer para ayudarle a resolver esto."),
  ],
  rep2Chunks: chunks4("e9"),
  prompts: [
    p("e9-p1", "What problem has the customer been having?", "¿Qué problema ha estado teniendo el cliente?", "The customer has been having… since…", "El cliente ha estado teniendo… desde…", "ANSWER"),
    p("e9-p2", "How long has it been happening?", "¿Desde cuándo está pasando?", "It has been happening since… / for…", "Está pasando desde… / hace…", "EXPLAIN"),
    p("e9-p3", "What has the customer already tried?", "¿Qué ha intentado ya el cliente?", "If I understand correctly, you have already…", "Si entiendo bien, usted ya ha…", "EXPLAIN"),
    p("e9-p4", "What would you ask next?", "¿Qué preguntarías después?", "Let me ask you… Have you…?", "Permítame preguntarle… ¿Ha…?", "CHALLENGE"),
    p("e9-p5", "What solution would you offer?", "¿Qué solución ofrecerías?", "In that case, here's what I can do…", "En ese caso, esto es lo que puedo hacer…", "DEFEND"),
  ],
  cues: ["ACKNOWLEDGE", "CLARIFY", "SOLVE", "CONFIRM"],
  powerChunks: { core: ["if I understand correctly…", "let me see what I can do…"], stretch: "in that case…" },
  sceneImage: { src: sceneInternet, alt: "A frustrated customer with a failing router next to a friendly call center agent listening with a headset", altEs: "Un cliente frustrado con un router que falla junto a una agente de call center escuchando con audífonos" },
  rep5Audio: {
    label: "CUSTOMER",
    labelEs: "CLIENTE",
    text: "My internet hasn't been working properly since yesterday. It stopped several times last night, and I've been trying to fix it this morning. I need it for work.",
    es: "Mi internet no ha funcionado bien desde ayer. Se cortó varias veces anoche y he estado tratando de arreglarlo esta mañana. Lo necesito para trabajar.",
    voice: "male",
  },
  goalSeconds: [60, 75],
  goalSentences: 7,
  rep5Turns: [
    {
      id: "e9-turn1",
      label: "CUSTOMER",
      labelEs: "CLIENTE",
      text: "My internet hasn't been working properly since yesterday. Can you help me?",
      es: "Mi internet no ha funcionado bien desde ayer. ¿Me puede ayudar?",
      voice: "male",
    },
    {
      id: "e9-turn2",
      label: "CUSTOMER · FOLLOW-UP",
      labelEs: "CLIENTE · SEGUIMIENTO",
      text: "I already restarted the router twice, but the problem keeps coming back.",
      es: "Ya reinicié el router dos veces, pero el problema sigue volviendo.",
      voice: "male",
    },
    {
      id: "e9-turn3",
      label: "CUSTOMER · PRESSURE",
      labelEs: "CLIENTE · PRESIÓN",
      text: "I need the internet for work today. How long will this take?",
      es: "Necesito el internet para trabajar hoy. ¿Cuánto va a tardar esto?",
      voice: "male",
    },
  ],
  rep5Toolbox: ["I'm sorry you've been having this problem.", "If I understand correctly…", "In that case…", "Let me see what I can do…"],
  rep5Prompt: { question: "Customer service role play: listen to each customer turn and respond.", questionEs: "Role play de servicio al cliente: escucha cada turno del cliente y responde." },
  rep5Tips: {
    en: "ACKNOWLEDGE → CLARIFY → SOLVE → CONFIRM. Short, calm answers. You don't need a perfect technical fix.",
    es: "RECONOCE → ACLARA → RESUELVE → CONFIRMA. Respuestas cortas y calmadas. No necesitas una solución técnica perfecta.",
  },
  speakerVoice: "female",
  testReady: {
    type: "listen-respond",
    title: "LISTEN & RESPOND",
    titleEs: "ESCUCHA Y RESPONDE",
    instruction: "Listen to the customer. Then answer 4 questions out loud.",
    instructionEs: "Escucha al cliente. Luego responde 4 preguntas en voz alta.",
    passage:
      "Hi, I'm calling because my internet has been very slow since Monday. I work from home, and I've been having problems with my video calls. I restarted the router yesterday, but it didn't help.",
    items: [
      { id: "e9-tr1", audio: "What problem has the customer been having?", text: "What problem has the customer been having?", textEs: "¿Qué problema ha estado teniendo el cliente?", maxSeconds: 12 },
      { id: "e9-tr2", audio: "Since when?", text: "Since when?", textEs: "¿Desde cuándo?", maxSeconds: 10 },
      { id: "e9-tr3", audio: "What has the customer already tried?", text: "What has the customer already tried?", textEs: "¿Qué ha intentado ya el cliente?", maxSeconds: 12 },
      { id: "e9-tr4", audio: "What would you say first?", text: "What would you say first?", textEs: "¿Qué dirías primero?", maxSeconds: 15 },
    ],
  },
});

/* ---------------------- DAY 10 — SOLVE A NEW PROBLEM ---------------------- */

const d10 = makeDay({
  day: 10,
  topic: "Solve a New Problem",
  topicEs: "Resuelve un problema nuevo",
  focus: "Transfer: past · present perfect · present perfect progressive",
  focusEs: "Transferencia: pasado · presente perfecto · presente perfecto progresivo",
  intro: {
    title: "SOLVE A NEW PROBLEM",
    titleEs: "RESUELVE UN PROBLEMA NUEVO",
    lead: "New situation, same pattern. A package hasn't arrived in five days. Acknowledge → clarify → solve → confirm.",
    leadEs: "Nueva situación, mismo patrón. Un paquete no ha llegado en cinco días. Reconoce → aclara → resuelve → confirma.",
    examples: ["From what I understand, you ordered the package five days ago.", "Here's what I can do: I'll contact the delivery company right now.", "To make sure, I'll send you a confirmation by email."],
    goal: "Role play: 3 customer turns. Speak 60–90 seconds in total. Connect 8–10 ideas.",
    goalEs: "Role play: 3 turnos del cliente. Habla 60–90 segundos en total. Conecta 8–10 ideas.",
    cta: START,
  },
  lines: [
    l("e10-1", "I understand, | and I'm sorry for the delay.", "Entiendo, y lamento la demora."),
    l("e10-2", "From what I understand, | you ordered the package five days ago.", "Por lo que entiendo, usted pidió el paquete hace cinco días."),
    l("e10-3", "You have been checking the app every day, | but the status hasn't changed.", "Ha estado revisando la app todos los días, pero el estado no ha cambiado."),
    l("e10-4", "Let me check the order | so I can see what happened.", "Permítame revisar el pedido para ver qué pasó."),
    l("e10-5", "Here's what I can do: | I'll contact the delivery company right now.", "Esto es lo que puedo hacer: voy a contactar a la empresa de envíos ahora mismo."),
    l("e10-6", "If the package is lost, | we can send a new one or give you a refund.", "Si el paquete se perdió, podemos enviarle uno nuevo o devolverle el dinero."),
    l("e10-7", "To make sure, | I'll send you a confirmation by email.", "Para asegurarme, le enviaré una confirmación por correo."),
    l("e10-8", "Overall, we'll solve this today | so you don't have to keep waiting.", "En general, lo resolveremos hoy para que no tenga que seguir esperando."),
  ],
  rep2Chunks: chunks4("e10"),
  prompts: [
    p("e10-p1", "What happened?", "¿Qué pasó?", "The customer ordered… but it hasn't…", "El cliente pidió… pero no ha…", "ANSWER"),
    p("e10-p2", "How long has the customer been waiting?", "¿Cuánto tiempo ha estado esperando el cliente?", "The customer has been waiting for…", "El cliente ha estado esperando…", "EXPLAIN"),
    p("e10-p3", "What has the customer already done?", "¿Qué ha hecho ya el cliente?", "From what I understand, you have been…", "Por lo que entiendo, usted ha estado…", "EXPLAIN"),
    p("e10-p4", "What can you do to help?", "¿Qué puedes hacer para ayudar?", "Here's what I can do…", "Esto es lo que puedo hacer…", "CHALLENGE"),
    p("e10-p5", "How would you confirm the next step?", "¿Cómo confirmarías el siguiente paso?", "To make sure, I'll…", "Para asegurarme, voy a…", "DEFEND"),
  ],
  cues: ["ACKNOWLEDGE", "CLARIFY", "SOLVE", "CONFIRM"],
  powerChunks: { core: ["from what I understand…", "here's what I can do…"], stretch: "to make sure…" },
  sceneImage: { src: sceneDelayedPackage, alt: "A customer checking a stuck delivery on her phone next to an agent checking the shipment on a computer", altEs: "Una clienta revisando un envío detenido en su teléfono junto a una agente revisando el pedido en la computadora" },
  rep5Audio: {
    label: "CUSTOMER",
    labelEs: "CLIENTE",
    text: "I ordered a package five days ago, but it hasn't arrived. I've been checking the delivery app every day, and the status hasn't changed.",
    es: "Pedí un paquete hace cinco días, pero no ha llegado. He estado revisando la app de entregas todos los días y el estado no ha cambiado.",
    voice: "female",
  },
  goalSeconds: [60, 90],
  goalSentences: 8,
  rep5Turns: [
    {
      id: "e10-turn1",
      label: "CUSTOMER",
      labelEs: "CLIENTE",
      text: "My package hasn't arrived, and I've been waiting for five days.",
      es: "Mi paquete no ha llegado y he estado esperando cinco días.",
      voice: "female",
    },
    {
      id: "e10-turn2",
      label: "CUSTOMER · FOLLOW-UP",
      labelEs: "CLIENTE · SEGUIMIENTO",
      text: "The app says it's still in transit, but the status hasn't changed.",
      es: "La app dice que sigue en tránsito, pero el estado no ha cambiado.",
      voice: "female",
    },
    {
      id: "e10-turn3",
      label: "CUSTOMER · PRESSURE",
      labelEs: "CLIENTE · PRESIÓN",
      text: "I need the package tomorrow. What can you do?",
      es: "Necesito el paquete mañana. ¿Qué puede hacer?",
      voice: "female",
    },
  ],
  rep5Toolbox: ["From what I understand…", "Here's what I can do…", "In that case…", "To make sure…"],
  rep5Prompt: { question: "Customer service role play: listen to each customer turn and respond.", questionEs: "Role play de servicio al cliente: escucha cada turno del cliente y responde." },
  rep5Tips: {
    en: "Same pattern, new problem: ACKNOWLEDGE → CLARIFY → SOLVE → CONFIRM.",
    es: "Mismo patrón, problema nuevo: RECONOCE → ACLARA → RESUELVE → CONFIRMA.",
  },
  speakerVoice: "male",
  testReady: {
    type: "story-retell",
    title: "STORY RETELL",
    titleEs: "VUELVE A CONTARLO",
    instruction: "Listen to the situation once. Then retell it in your own words.",
    instructionEs: "Escucha la situación una vez. Luego cuéntala con tus propias palabras.",
    passage:
      "A customer ordered a new laptop for her job. The company promised delivery in three days, but after a week, the laptop still hasn't arrived. She has called twice, and she has also sent an email. The company has apologized and has opened an investigation, but nobody has given her a delivery date yet. She needs the laptop for a new project next Monday.",
    speakSeconds: 30,
    items: [
      {
        id: "e10-tr1",
        text: "Retell the situation in your own words.",
        textEs: "Cuenta la situación con tus propias palabras.",
        chunks: ["WHAT HAPPENED?", "WHAT HAS THE CUSTOMER DONE?", "WHAT HAS THE COMPANY DONE?", "WHAT SHOULD HAPPEN NEXT?"],
        maxSeconds: 45,
      },
    ],
  },
});

/* ====================================================================== */
/* WEEK 3 — COMPARE, EXPLAIN & CHOOSE                                       */
/* ====================================================================== */

/* --------------------------- DAY 11 — BEFORE & NOW --------------------------- */

const d11 = makeDay({
  day: 11,
  topic: "Before & Now",
  topicEs: "Antes y ahora",
  focus: "Used to — past habits vs current habits",
  focusEs: "Used to — hábitos pasados vs hábitos actuales",
  intro: {
    title: "BEFORE & NOW",
    titleEs: "ANTES Y AHORA",
    lead: "Compare what you used to do with what you do now — and explain why you changed.",
    leadEs: "Compara lo que solías hacer con lo que haces ahora — y explica por qué cambiaste.",
    examples: ["I used to stay up late during the week.", "Now, I usually go to bed earlier because I need more energy.", "The biggest change is that I feel more confident."],
    goal: "Speak for 60 seconds. Connect 8 ideas.",
    goalEs: "Habla 60 segundos. Conecta 8 ideas.",
    cta: START,
  },
  lines: [
    l("e11-1", "I used to spend a lot of time watching TV, | but now I use that time to exercise.", "Solía pasar mucho tiempo viendo TV, pero ahora uso ese tiempo para hacer ejercicio."),
    l("e11-2", "I used to stay up late | during the week.", "Solía acostarme tarde entre semana."),
    l("e11-3", "Now, I usually go to bed earlier | because I need more energy.", "Ahora, normalmente me acuesto más temprano porque necesito más energía."),
    l("e11-4", "I also used to be afraid | of speaking English.", "También solía tener miedo de hablar inglés."),
    l("e11-5", "However, | now I practice more often.", "Sin embargo, ahora practico más seguido."),
    l("e11-6", "The biggest change is | that I feel more confident.", "El cambio más grande es que me siento más seguro."),
    l("e11-7", "Compared with before, | I use my time more carefully.", "Comparado con antes, uso mi tiempo con más cuidado."),
    l("e11-8", "Overall, | my habits are better now.", "En general, mis hábitos son mejores ahora."),
  ],
  rep2Chunks: chunks4("e11"),
  prompts: [
    p("e11-p1", "What did you use to do?", "¿Qué solías hacer?", "I used to…", "Yo solía…", "ANSWER"),
    p("e11-p2", "What do you do now?", "¿Qué haces ahora?", "But now, I…", "Pero ahora, yo…", "COMPARE"),
    p("e11-p3", "Why did you change?", "¿Por qué cambiaste?", "I changed because…", "Cambié porque…", "EXPLAIN"),
    p("e11-p4", "Which habit is better?", "¿Qué hábito es mejor?", "Compared with before, … is better because…", "Comparado con antes, … es mejor porque…", "COMPARE"),
    p("e11-p5", "How has that change helped you?", "¿Cómo te ha ayudado ese cambio?", "The biggest change is… Overall, …", "El cambio más grande es… En general, …", "DEFEND"),
  ],
  cues: ["BEFORE", "NOW", "WHY?", "BIGGEST CHANGE", "OVERALL"],
  powerChunks: { core: ["I used to… but now…", "the biggest change is…"], stretch: "compared with before…" },
  sceneImage: { src: sceneBeforeNow, alt: "Before: a man watching TV late at night on the couch. Now: the same man jogging in a park early in the morning", altEs: "Antes: un hombre viendo TV tarde en el sofá. Ahora: el mismo hombre corriendo en un parque por la mañana" },
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "My life: before vs now.", questionEs: "Mi vida: antes vs ahora." },
  rep5Tips: {
    en: "Pick 2–3 habits. I used to… but now… + because… Close with the biggest change is… and overall…",
    es: "Elige 2–3 hábitos. I used to… but now… + because… Cierra con the biggest change is… y overall…",
  },
  speakerVoice: "female",
  testReady: {
    type: "repeat",
    title: "REPEAT IT",
    titleEs: "REPÍTELO",
    instruction: "Listen once. Remember. Repeat.",
    instructionEs: "Escucha una vez. Recuerda. Repite.",
    playOnce: true,
    items: [
      { id: "e11-tr1", audio: "I used to watch a lot of TV.", maxSeconds: 10 },
      { id: "e11-tr2", audio: "I used to watch a lot of TV, but now I exercise instead.", maxSeconds: 12 },
      { id: "e11-tr3", audio: "She used to be afraid of speaking English, but now she practices every day.", maxSeconds: 14 },
      { id: "e11-tr4", audio: "Compared with before, we use our time more carefully at work.", maxSeconds: 14 },
      { id: "e11-tr5", audio: "The biggest change is that I feel more confident when I talk to customers.", maxSeconds: 16 },
    ],
  },
});

/* ------------------------ DAY 12 — WHICH ONE IS BETTER? ------------------------ */

const d12 = makeDay({
  day: 12,
  topic: "Which One Is Better?",
  topicEs: "¿Cuál es mejor?",
  focus: "Short comparatives inside real comparisons",
  focusEs: "Comparativos cortos dentro de comparaciones reales",
  intro: {
    title: "WHICH ONE IS BETTER?",
    titleEs: "¿CUÁL ES MEJOR?",
    lead: "Bike or car? Compare two options — and say who each one is better for.",
    leadEs: "¿Bicicleta o carro? Compara dos opciones — y di para quién es mejor cada una.",
    examples: ["A bicycle is cheaper than a car, but a car is faster.", "For someone who travels long distances, a car may be more practical.", "The main difference is the cost."],
    goal: "Speak for 60 seconds. Connect 8 ideas.",
    goalEs: "Habla 60 segundos. Conecta 8 ideas.",
    cta: START,
  },
  lines: [
    l("e12-1", "A bicycle is cheaper than a car, | but a car is faster.", "Una bicicleta es más barata que un carro, pero un carro es más rápido."),
    l("e12-2", "The main difference is | the cost.", "La diferencia principal es el costo."),
    l("e12-3", "A bike is easier to park, | so it can be better in a crowded city.", "Una bici es más fácil de estacionar, así que puede ser mejor en una ciudad congestionada."),
    l("e12-4", "It is also healthier | because you exercise every day.", "También es más saludable porque haces ejercicio todos los días."),
    l("e12-5", "However, a car is safer | when the weather is bad.", "Sin embargo, un carro es más seguro cuando el clima está mal."),
    l("e12-6", "For someone who travels long distances, | a car may be more practical.", "Para alguien que viaja distancias largas, un carro puede ser más práctico."),
    l("e12-7", "For me, a bike is better | because I live close to my job.", "Para mí, una bici es mejor porque vivo cerca de mi trabajo."),
    l("e12-8", "Overall, I would choose the bike, | but I understand why other people prefer a car.", "En general, elegiría la bici, pero entiendo por qué otras personas prefieren un carro."),
  ],
  rep2Chunks: chunks4("e12"),
  prompts: [
    p("e12-p1", "Which option is cheaper?", "¿Qué opción es más barata?", "X is cheaper than Y…", "X es más barato que Y…", "ANSWER"),
    p("e12-p2", "Which is more useful for you?", "¿Cuál es más útil para ti?", "For me, … is more useful…", "Para mí, … es más útil…", "COMPARE"),
    p("e12-p3", "Why?", "¿Por qué?", "The main difference is… because…", "La diferencia principal es… porque…", "EXPLAIN"),
    p("e12-p4", "What is one disadvantage?", "¿Cuál es una desventaja?", "However, one disadvantage is…", "Sin embargo, una desventaja es…", "CHALLENGE"),
    p("e12-p5", "Which would you choose overall?", "¿Cuál elegirías en general?", "Overall, I would choose… because…", "En general, elegiría… porque…", "DEFEND"),
  ],
  cues: ["OPTION A", "OPTION B", "MAIN DIFFERENCE", "FOR SOMEONE WHO…", "MY CHOICE"],
  powerChunks: { core: ["X is ___ than Y…", "the main difference is…"], stretch: "for someone who…" },
  sceneImage: { src: sceneBikeCar, alt: "A woman riding a bike through a crowded city street next to a man driving a car on a highway", altEs: "Una mujer en bicicleta en una calle congestionada junto a un hombre manejando un carro en la autopista" },
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Compare two options and choose one.", questionEs: "Compara dos opciones y elige una." },
  rep5Tips: {
    en: "Bike vs car, small city vs big city, morning vs evening shift… X is ___ than Y → however… → for someone who… → overall…",
    es: "Bici vs carro, ciudad pequeña vs grande, turno de mañana vs tarde… X is ___ than Y → however… → for someone who… → overall…",
  },
  speakerVoice: "male",
  testReady: {
    type: "quick-answers",
    title: "QUICK ANSWERS",
    titleEs: "RESPUESTAS RÁPIDAS",
    instruction: "Listen to the question. Compare fast: X is ___ than Y.",
    instructionEs: "Escucha la pregunta. Compara rápido: X is ___ than Y.",
    items: [
      { id: "e12-tr1", audio: "Which is faster, a bike or a car?", maxSeconds: 8 },
      { id: "e12-tr2", audio: "Which is cheaper, a small city or a big city?", maxSeconds: 8 },
      { id: "e12-tr3", audio: "Which is easier for you, working in the morning or in the evening?", maxSeconds: 8 },
      { id: "e12-tr4", audio: "Which is healthier, walking or driving?", maxSeconds: 8 },
      { id: "e12-tr5", audio: "Which is safer when it rains, a bike or a car?", maxSeconds: 8 },
      { id: "e12-tr6", audio: "Which is better for a long trip, and why?", maxSeconds: 10 },
    ],
  },
});

/* ----------------------- DAY 13 — COMPARE YOUR OPTIONS ----------------------- */

const d13 = makeDay({
  day: 13,
  topic: "Compare Your Options",
  topicEs: "Compara tus opciones",
  focus: "Long comparatives — more comfortable · more convenient · more flexible",
  focusEs: "Comparativos largos — more comfortable · more convenient · more flexible",
  intro: {
    title: "COMPARE YOUR OPTIONS",
    titleEs: "COMPARA TUS OPCIONES",
    lead: "Working from home vs working in an office. One advantage, one disadvantage — then decide.",
    leadEs: "Trabajar desde casa vs en una oficina. Una ventaja, una desventaja — luego decide.",
    examples: ["Working from home can be more comfortable than working in an office.", "On the other hand, working in an office can be more social.", "When it comes to my lifestyle, flexibility is very important."],
    goal: "Speak for 60–75 seconds. Connect 8 ideas.",
    goalEs: "Habla 60–75 segundos. Conecta 8 ideas.",
    cta: START,
  },
  lines: [
    l("e13-1", "Working from home can be more comfortable | than working in an office.", "Trabajar desde casa puede ser más cómodo que trabajar en una oficina."),
    l("e13-2", "It can also be more convenient | because you don't have to commute.", "También puede ser más conveniente porque no tienes que desplazarte."),
    l("e13-3", "On the other hand, | working in an office can be more social.", "Por otro lado, trabajar en una oficina puede ser más social."),
    l("e13-4", "Some people also find | the office more productive.", "Algunas personas también encuentran la oficina más productiva."),
    l("e13-5", "Working from home | may be more flexible.", "Trabajar desde casa puede ser más flexible."),
    l("e13-6", "However, the office may be more useful | for teamwork.", "Sin embargo, la oficina puede ser más útil para el trabajo en equipo."),
    l("e13-7", "When it comes to my lifestyle, | flexibility is very important.", "En cuanto a mi estilo de vida, la flexibilidad es muy importante."),
    l("e13-8", "Overall, I would choose working from home | because it fits me better.", "En general, elegiría trabajar desde casa porque se ajusta mejor a mí."),
  ],
  rep2Chunks: chunks4("e13"),
  prompts: [
    p("e13-p1", "Which option is more convenient?", "¿Qué opción es más conveniente?", "… is more convenient because…", "… es más conveniente porque…", "ANSWER"),
    p("e13-p2", "What is one advantage?", "¿Cuál es una ventaja?", "One advantage is…", "Una ventaja es…", "EXPLAIN"),
    p("e13-p3", "What is one disadvantage?", "¿Cuál es una desventaja?", "On the other hand, …", "Por otro lado, …", "COMPARE"),
    p("e13-p4", "Which fits your lifestyle better?", "¿Cuál se ajusta mejor a tu estilo de vida?", "When it comes to my lifestyle, …", "En cuanto a mi estilo de vida, …", "CHALLENGE"),
    p("e13-p5", "Why would you choose it?", "¿Por qué la elegirías?", "Overall, I would choose… because…", "En general, elegiría… porque…", "DEFEND"),
  ],
  cues: ["OPTION A", "ADVANTAGE", "ON THE OTHER HAND", "MY LIFESTYLE", "DECISION"],
  powerChunks: { core: ["one advantage is…", "on the other hand…"], stretch: "when it comes to…" },
  sceneImage: { src: sceneHomeOffice, alt: "A woman working comfortably from home next to a team collaborating at a whiteboard in a modern office", altEs: "Una mujer trabajando cómoda desde casa junto a un equipo colaborando en una pizarra en una oficina moderna" },
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Compare two options and explain your decision.", questionEs: "Compara dos opciones y explica tu decisión." },
  rep5Tips: {
    en: "Home vs office, online vs in-person classes, Job A vs Job B… one advantage is… → on the other hand… → when it comes to… → overall…",
    es: "Casa vs oficina, clases en línea vs presenciales, Trabajo A vs B… one advantage is… → on the other hand… → when it comes to… → overall…",
  },
  speakerVoice: "female",
  testReady: {
    type: "build-sentence",
    title: "BUILD THE SENTENCE",
    titleEs: "ARMA LA FRASE",
    instruction: "Look at the pieces. Say the complete sentence.",
    instructionEs: "Mira las piezas. Di la frase completa.",
    items: [
      { id: "e13-tr1", chunks: ["working from home", "is more comfortable", "than the office"], audio: "working from home — is more comfortable — than the office", maxSeconds: 10 },
      { id: "e13-tr2", chunks: ["online classes", "are more convenient", "for busy people"], audio: "online classes — are more convenient — for busy people", maxSeconds: 10 },
      { id: "e13-tr3", chunks: ["this plan", "is more expensive,", "but it is more reliable"], audio: "this plan — is more expensive — but it is more reliable", maxSeconds: 12 },
      { id: "e13-tr4", chunks: ["on the other hand,", "the office", "is more social"], audio: "on the other hand — the office — is more social", maxSeconds: 10 },
      { id: "e13-tr5", chunks: ["one advantage is", "that the schedule", "is more flexible"], audio: "one advantage is — that the schedule — is more flexible", maxSeconds: 12 },
    ],
  },
});

/* ---------------------- DAY 14 — WHAT'S THE BEST OPTION? ---------------------- */

const d14 = makeDay({
  day: 14,
  topic: "What's the Best Option?",
  topicEs: "¿Cuál es la mejor opción?",
  focus: "Superlatives — choose with several criteria",
  focusEs: "Superlativos — elige con varios criterios",
  intro: {
    title: "WHAT'S THE BEST OPTION?",
    titleEs: "¿CUÁL ES LA MEJOR OPCIÓN?",
    lead: "Three job offers. Compare salary, commute, schedule and growth — then choose and defend your choice.",
    leadEs: "Tres ofertas de trabajo. Compara salario, distancia, horario y crecimiento — luego elige y defiende tu elección.",
    examples: ["Job A has the highest salary, but it also has the longest commute.", "Job B has the most flexible schedule.", "The best option for me is Job C. The main reason is the growth opportunity."],
    goal: "Speak for 60–75 seconds. Connect 8 ideas.",
    goalEs: "Habla 60–75 segundos. Conecta 8 ideas.",
    cta: START,
  },
  lines: [
    l("e14-1", "Job A has the highest salary, | but it also has the longest commute.", "El Trabajo A tiene el salario más alto, pero también el trayecto más largo."),
    l("e14-2", "Its schedule is fixed, | so it is the least flexible option.", "Su horario es fijo, así que es la opción menos flexible."),
    l("e14-3", "Job B has the most flexible schedule | because you can work from home.", "El Trabajo B tiene el horario más flexible porque puedes trabajar desde casa."),
    l("e14-4", "However, | it has the lowest salary.", "Sin embargo, tiene el salario más bajo."),
    l("e14-5", "Job C is the closest to home, | and it has the best growth opportunity.", "El Trabajo C es el más cercano a casa y tiene la mejor oportunidad de crecimiento."),
    l("e14-6", "The salary is in the middle, | which is not a problem for me.", "El salario está en el medio, lo cual no es un problema para mí."),
    l("e14-7", "Out of these options, | the best option for me is Job C.", "De estas opciones, la mejor para mí es el Trabajo C."),
    l("e14-8", "The main reason is | that I want to grow in my career.", "La razón principal es que quiero crecer en mi carrera."),
  ],
  rep2Chunks: chunks4("e14"),
  prompts: [
    p("e14-p1", "Which option is the best?", "¿Qué opción es la mejor?", "Out of these options, the best one is…", "De estas opciones, la mejor es…", "ANSWER"),
    p("e14-p2", "Why?", "¿Por qué?", "The main reason is…", "La razón principal es…", "EXPLAIN"),
    p("e14-p3", "Which has the biggest disadvantage?", "¿Cuál tiene la mayor desventaja?", "… has the biggest disadvantage because…", "… tiene la mayor desventaja porque…", "COMPARE"),
    p("e14-p4", "Who might choose a different option?", "¿Quién podría elegir una opción diferente?", "Someone who… might choose… because…", "Alguien que… podría elegir… porque…", "CHALLENGE"),
    p("e14-p5", "How would you defend your choice?", "¿Cómo defenderías tu elección?", "I understand that…, however… Overall, …", "Entiendo que…, sin embargo… En general, …", "DEFEND"),
  ],
  cues: ["A · SALARY", "B · FLEXIBLE", "C · GROWTH", "BEST OPTION", "MAIN REASON"],
  powerChunks: { core: ["the best option is…", "the main reason is…"], stretch: "out of these options…" },
  sceneImage: { src: sceneJobOffers, alt: "Three job offers: a downtown tower with heavy traffic, a flexible home desk, and a friendly office close to home with a mentor", altEs: "Tres ofertas: una torre en el centro con mucho tráfico, un escritorio flexible en casa y una oficina amigable cerca de casa con un mentor" },
  storyPanels: [
    card("e14-a", sceneJobOffers, "Job A: highest salary, long commute, fixed schedule", "JOB A · $$$ · LONG COMMUTE · FIXED"),
    card("e14-b", sceneHomeOffice, "Job B: lower salary, work from home, flexible schedule", "JOB B · $ · HOME · FLEXIBLE"),
    card("e14-c", sceneGreatEmployee, "Job C: medium salary, close to home, good growth", "JOB C · $$ · CLOSE · GROWTH"),
  ],
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Make a decision and defend it.", questionEs: "Toma una decisión y defiéndela." },
  rep5Tips: {
    en: "Three options in one sentence each (the highest… the most… the closest…). Then: the best option is… + the main reason is… + however…",
    es: "Tres opciones en una frase cada una (the highest… the most… the closest…). Luego: the best option is… + the main reason is… + however…",
  },
  speakerVoice: "male",
  testReady: {
    type: "listen-respond",
    title: "LISTEN & RESPOND",
    titleEs: "ESCUCHA Y RESPONDE",
    instruction: "Listen to the situation. Then answer 4 questions out loud.",
    instructionEs: "Escucha la situación. Luego responde 4 preguntas en voz alta.",
    passage:
      "I have two job offers. The first one pays more, but the office is two hours from my house. The second one pays a little less, but it's fifteen minutes away and the team is really friendly. I don't know which one to accept.",
    items: [
      { id: "e14-tr1", audio: "Which job pays more?", text: "Which job pays more?", textEs: "¿Qué trabajo paga más?", maxSeconds: 10 },
      { id: "e14-tr2", audio: "What is the biggest disadvantage of the first job?", text: "What is the biggest disadvantage of the first job?", textEs: "¿Cuál es la mayor desventaja del primer trabajo?", maxSeconds: 12 },
      { id: "e14-tr3", audio: "What is one advantage of the second job?", text: "What is one advantage of the second job?", textEs: "¿Cuál es una ventaja del segundo trabajo?", maxSeconds: 12 },
      { id: "e14-tr4", audio: "Which job would you recommend, and why?", text: "Which job would you recommend, and why?", textEs: "¿Qué trabajo recomendarías y por qué?", maxSeconds: 15 },
    ],
  },
});

/* -------------------- DAY 15 — WHAT MAKES A GREAT EMPLOYEE? -------------------- */

const d15 = makeDay({
  day: 15,
  topic: "What Makes a Great Employee?",
  topicEs: "¿Qué hace a un gran empleado?",
  focus: "Simple present review — qualities + justification",
  focusEs: "Repaso del presente simple — cualidades + justificación",
  intro: {
    title: "A GREAT EMPLOYEE",
    titleEs: "UN GRAN EMPLEADO",
    lead: "Describe the qualities of a great employee — and justify why each one matters.",
    leadEs: "Describe las cualidades de un gran empleado — y justifica por qué importa cada una.",
    examples: ["A great employee arrives on time and takes responsibility.", "One important quality is being reliable.", "In my opinion, attitude is just as important as experience."],
    goal: "Speak for 60–90 seconds. Connect 8–10 ideas.",
    goalEs: "Habla 60–90 segundos. Conecta 8–10 ideas.",
    cta: START,
  },
  lines: [
    l("e15-1", "A great employee arrives on time | and takes responsibility.", "Un gran empleado llega a tiempo y asume responsabilidad."),
    l("e15-2", "They communicate clearly | because teamwork depends on good communication.", "Se comunica con claridad porque el trabajo en equipo depende de una buena comunicación."),
    l("e15-3", "They also listen carefully | when other people are speaking.", "También escucha con atención cuando otras personas hablan."),
    l("e15-4", "One important quality | is being reliable.", "Una cualidad importante es ser confiable."),
    l("e15-5", "A strong employee tries to solve problems | instead of ignoring them.", "Un empleado fuerte trata de resolver problemas en vez de ignorarlos."),
    l("e15-6", "In addition, | they learn from their mistakes.", "Además, aprende de sus errores."),
    l("e15-7", "In my opinion, | attitude is just as important as experience.", "En mi opinión, la actitud es tan importante como la experiencia."),
    l("e15-8", "Overall, I would hire someone | who is responsible, positive and willing to learn.", "En general, contrataría a alguien responsable, positivo y con ganas de aprender."),
  ],
  rep2Chunks: chunks4("e15"),
  prompts: [
    p("e15-p1", "What does a great employee do?", "¿Qué hace un gran empleado?", "A great employee…", "Un gran empleado…", "ANSWER"),
    p("e15-p2", "Why is that important?", "¿Por qué es importante eso?", "That is important because…", "Eso es importante porque…", "EXPLAIN"),
    p("e15-p3", "Which quality matters most?", "¿Qué cualidad importa más?", "In my opinion, the most important quality is…", "En mi opinión, la cualidad más importante es…", "COMPARE"),
    p("e15-p4", "What happens when an employee doesn't have that quality?", "¿Qué pasa cuando un empleado no tiene esa cualidad?", "When an employee doesn't…, …", "Cuando un empleado no…, …", "CHALLENGE"),
    p("e15-p5", "What kind of employee would you hire?", "¿Qué tipo de empleado contratarías?", "Overall, I would hire someone who… because…", "En general, contrataría a alguien que… porque…", "DEFEND"),
  ],
  cues: ["QUALITY 1", "WHY?", "QUALITY 2", "MOST IMPORTANT", "I WOULD HIRE…"],
  powerChunks: { core: ["in my opinion…", "one important quality is…"], stretch: "overall…" },
  sceneImage: { src: sceneGreatEmployee, alt: "A confident young employee in a modern office with a positive team behind her", altEs: "Una empleada joven y segura en una oficina moderna con un equipo positivo detrás" },
  goalSeconds: [60, 90],
  goalSentences: 8,
  rep5Prompt: { question: "Describe the ideal employee and explain why.", questionEs: "Describe al empleado ideal y explica por qué." },
  rep5Tips: {
    en: "2–3 qualities. For each: one important quality is… + because… Then in my opinion… and overall…",
    es: "2–3 cualidades. Para cada una: one important quality is… + because… Luego in my opinion… y overall…",
  },
  speakerVoice: "female",
  testReady: {
    type: "speak-now",
    title: "SPEAK NOW",
    titleEs: "HABLA AHORA",
    instruction: "10 seconds to think. Then speak for about 45 seconds.",
    instructionEs: "10 segundos para pensar. Luego habla unos 45 segundos.",
    thinkSeconds: 10,
    speakSeconds: 45,
    items: [
      {
        id: "e15-tr1",
        text: "Describe the most important quality in a good employee.",
        textEs: "Describe la cualidad más importante de un buen empleado.",
        chunks: ["QUALITY?", "WHY?", "EXAMPLE?", "RESULT?"],
        maxSeconds: 60,
      },
    ],
  },
});

/* ====================================================================== */
/* WEEK 4 — HANDLE, PERSUADE & CLOSE                                        */
/* ====================================================================== */

/* -------------------------- DAY 16 — MY FUTURE CAREER -------------------------- */

const d16 = makeDay({
  day: 16,
  topic: "My Future Career",
  topicEs: "Mi carrera futura",
  focus: "Simple future review — going to · will",
  focusEs: "Repaso del futuro simple — going to · will",
  intro: {
    title: "MY FUTURE CAREER",
    titleEs: "MI CARRERA FUTURA",
    lead: "Talk about your career plans — what you're going to do, and what you'll do if things change.",
    leadEs: "Habla de tus planes de carrera — qué vas a hacer y qué harás si las cosas cambian.",
    examples: ["In the future, I want to find a job where I can grow.", "My plan is to practice speaking every day.", "If everything goes well, I'll work for an international company."],
    goal: "Speak for 60–75 seconds. Connect 8 ideas.",
    goalEs: "Habla 60–75 segundos. Conecta 8 ideas.",
    cta: START,
  },
  lines: [
    l("e16-1", "In the future, | I want to find a job where I can grow.", "En el futuro, quiero encontrar un trabajo donde pueda crecer."),
    l("e16-2", "I'm going to keep improving my English | because it will give me more opportunities.", "Voy a seguir mejorando mi inglés porque me dará más oportunidades."),
    l("e16-3", "My plan is | to practice speaking every day.", "Mi plan es practicar hablar todos los días."),
    l("e16-4", "I'm also going to learn | more professional vocabulary.", "También voy a aprender más vocabulario profesional."),
    l("e16-5", "If everything goes well, | I'll work for an international company.", "Si todo sale bien, trabajaré para una empresa internacional."),
    l("e16-6", "I know there may be challenges | along the way.", "Sé que puede haber desafíos en el camino."),
    l("e16-7", "However, | I'll keep working toward my goal.", "Sin embargo, seguiré trabajando hacia mi meta."),
    l("e16-8", "Overall, I want to build a career | that gives me new opportunities.", "En general, quiero construir una carrera que me dé nuevas oportunidades."),
  ],
  rep2Chunks: chunks4("e16"),
  prompts: [
    p("e16-p1", "What will you do in the future?", "¿Qué harás en el futuro?", "In the future, I'll…", "En el futuro, yo…", "ANSWER"),
    p("e16-p2", "Why?", "¿Por qué?", "Because…", "Porque…", "EXPLAIN"),
    p("e16-p3", "What are you going to do first?", "¿Qué vas a hacer primero?", "My plan is to… First, I'm going to…", "Mi plan es… Primero, voy a…", "EXPLAIN"),
    p("e16-p4", "What challenge might you have?", "¿Qué desafío podrías tener?", "One challenge might be… However, …", "Un desafío podría ser… Sin embargo, …", "CHALLENGE"),
    p("e16-p5", "What will you do if your plan changes?", "¿Qué harás si tu plan cambia?", "If my plan changes, I'll… Overall, …", "Si mi plan cambia, yo… En general, …", "DEFEND"),
  ],
  cues: ["GOAL", "WHY?", "FIRST STEP", "CHALLENGE", "IF IT CHANGES"],
  powerChunks: { core: ["in the future…", "my plan is…"], stretch: "if everything goes well…" },
  sceneImage: { src: sceneFutureCareer, alt: "A young professional looking up at an international company building at sunrise", altEs: "Un joven profesional mirando el edificio de una empresa internacional al amanecer" },
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Tell me about your future career.", questionEs: "Cuéntame sobre tu carrera futura." },
  rep5Tips: {
    en: "in the future… → my plan is… → because… → if everything goes well… → however… → overall…",
    es: "in the future… → my plan is… → because… → if everything goes well… → however… → overall…",
  },
  speakerVoice: "male",
  testReady: {
    type: "repeat",
    title: "REPEAT IT",
    titleEs: "REPÍTELO",
    instruction: "Listen once. Remember. Repeat.",
    instructionEs: "Escucha una vez. Recuerda. Repite.",
    playOnce: true,
    items: [
      { id: "e16-tr1", audio: "I'm going to keep improving my English.", maxSeconds: 10 },
      { id: "e16-tr2", audio: "I'm going to keep improving my English because it will give me more opportunities.", maxSeconds: 12 },
      { id: "e16-tr3", audio: "My plan is to practice speaking every day and learn professional vocabulary.", maxSeconds: 14 },
      { id: "e16-tr4", audio: "If everything goes well, I'll work for an international company next year.", maxSeconds: 14 },
      { id: "e16-tr5", audio: "There may be challenges along the way, but I'll keep working toward my goal.", maxSeconds: 16 },
    ],
  },
});

/* ------------------------ DAY 17 — WHAT HAVE YOU ACHIEVED? ------------------------ */

const d17 = makeDay({
  day: 17,
  topic: "What Have You Achieved?",
  topicEs: "¿Qué has logrado?",
  focus: "Present perfect — already · yet · so far",
  focusEs: "Presente perfecto — already · yet · so far",
  intro: {
    title: "WHAT HAVE YOU ACHIEVED?",
    titleEs: "¿QUÉ HAS LOGRADO?",
    lead: "Talk about what you have already achieved — and what you haven't achieved yet.",
    leadEs: "Habla de lo que ya has logrado — y de lo que todavía no has logrado.",
    examples: ["I have already completed several important goals.", "I have made progress, but I haven't reached all my goals yet.", "So far, I have learned how to communicate more confidently."],
    goal: "Speak for 60–75 seconds. Connect 8 ideas.",
    goalEs: "Habla 60–75 segundos. Conecta 8 ideas.",
    cta: START,
  },
  lines: [
    l("e17-1", "I have already completed | several important goals.", "Ya he completado varias metas importantes."),
    l("e17-2", "I have improved different skills | over the past few years.", "He mejorado diferentes habilidades en los últimos años."),
    l("e17-3", "Learning English has been | one of my biggest challenges.", "Aprender inglés ha sido uno de mis mayores desafíos."),
    l("e17-4", "I have already made progress, | but I haven't reached all my goals yet.", "Ya he avanzado, pero todavía no he alcanzado todas mis metas."),
    l("e17-5", "So far, I have learned | how to communicate more confidently.", "Hasta ahora, he aprendido a comunicarme con más seguridad."),
    l("e17-6", "I have also learned | how important consistent practice is.", "También he aprendido lo importante que es practicar con constancia."),
    l("e17-7", "However, | there are still areas I want to improve.", "Sin embargo, todavía hay áreas que quiero mejorar."),
    l("e17-8", "Overall, I am proud | of what I have achieved so far.", "En general, estoy orgulloso de lo que he logrado hasta ahora."),
  ],
  rep2Chunks: chunks4("e17"),
  prompts: [
    p("e17-p1", "What have you achieved?", "¿Qué has logrado?", "I have already…", "Ya he…", "ANSWER"),
    p("e17-p2", "Which achievement is most important?", "¿Qué logro es el más importante?", "The most important one is…", "El más importante es…", "COMPARE"),
    p("e17-p3", "Why?", "¿Por qué?", "Because…", "Porque…", "EXPLAIN"),
    p("e17-p4", "What haven't you achieved yet?", "¿Qué no has logrado todavía?", "I haven't… yet. However, …", "Todavía no he… Sin embargo, …", "CHALLENGE"),
    p("e17-p5", "What will you do next?", "¿Qué harás después?", "So far, I have… Next, I'm going to…", "Hasta ahora, he… Después, voy a…", "DEFEND"),
  ],
  cues: ["ALREADY", "MOST IMPORTANT", "WHY?", "NOT YET", "NEXT"],
  powerChunks: { core: ["I have already…", "I haven't… yet."], stretch: "so far…" },
  sceneImage: { src: sceneAchievements, alt: "A young woman at her desk looking at her certificates, a goals checklist and a small trophy", altEs: "Una joven en su escritorio mirando sus certificados, una lista de metas y un pequeño trofeo" },
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Tell me what you have achieved and what you still want to achieve.", questionEs: "Cuéntame qué has logrado y qué quieres lograr todavía." },
  rep5Tips: {
    en: "I have already… (2–3 things) → the most important is… because… → I haven't… yet → so far… → overall…",
    es: "I have already… (2–3 cosas) → the most important is… because… → I haven't… yet → so far… → overall…",
  },
  speakerVoice: "female",
  testReady: {
    type: "quick-answers",
    title: "QUICK ANSWERS",
    titleEs: "RESPUESTAS RÁPIDAS",
    instruction: "Listen. Answer fast with already / yet / so far.",
    instructionEs: "Escucha. Responde rápido con already / yet / so far.",
    items: [
      { id: "e17-tr1", audio: "Have you finished your English course yet?", maxSeconds: 8 },
      { id: "e17-tr2", audio: "What have you already learned this month?", maxSeconds: 8 },
      { id: "e17-tr3", audio: "What haven't you done yet this week?", maxSeconds: 8 },
      { id: "e17-tr4", audio: "How many days have you practiced so far?", maxSeconds: 8 },
      { id: "e17-tr5", audio: "Have you already talked to a customer in English?", maxSeconds: 8 },
      { id: "e17-tr6", audio: "What is one goal you haven't reached yet?", maxSeconds: 10 },
    ],
  },
});

/* ------------------ DAY 18 — WHAT HAVE YOU BEEN WORKING TOWARD? ------------------ */

const d18 = makeDay({
  day: 18,
  topic: "What Have You Been Working Toward?",
  topicEs: "¿Hacia qué has estado trabajando?",
  focus: "Present perfect progressive — long-term effort + next step",
  focusEs: "Presente perfecto progresivo — esfuerzo a largo plazo + siguiente paso",
  intro: {
    title: "YOUR PROGRESS",
    titleEs: "TU PROGRESO",
    lead: "Explain your long-term effort, what has been difficult, and your next step.",
    leadEs: "Explica tu esfuerzo a largo plazo, qué ha sido difícil y tu siguiente paso.",
    examples: ["I have been working on my English for several months.", "Little by little, I have been becoming more confident.", "Some parts have been difficult, especially speaking without preparation."],
    goal: "Speak for 60–75 seconds. Connect 8 ideas.",
    goalEs: "Habla 60–75 segundos. Conecta 8 ideas.",
    cta: START,
  },
  lines: [
    l("e18-1", "I have been working on my English | for several months.", "He estado trabajando en mi inglés durante varios meses."),
    l("e18-2", "For the past few weeks, | I have been focusing more on speaking.", "Durante las últimas semanas, me he estado enfocando más en hablar."),
    l("e18-3", "I have been practicing | because I want to communicate more naturally.", "He estado practicando porque quiero comunicarme con más naturalidad."),
    l("e18-4", "Little by little, | I have been becoming more confident.", "Poco a poco, he ido ganando más confianza."),
    l("e18-5", "I have also been learning | useful expressions for work.", "También he estado aprendiendo expresiones útiles para el trabajo."),
    l("e18-6", "Some parts have been difficult, | especially speaking without preparation.", "Algunas partes han sido difíciles, sobre todo hablar sin preparación."),
    l("e18-7", "However, | I have been trying to practice consistently.", "Sin embargo, he estado tratando de practicar con constancia."),
    l("e18-8", "Overall, I want to keep improving | and take the next step.", "En general, quiero seguir mejorando y dar el siguiente paso."),
  ],
  rep2Chunks: chunks4("e18"),
  prompts: [
    p("e18-p1", "What have you been working on?", "¿En qué has estado trabajando?", "I have been working on…", "He estado trabajando en…", "ANSWER"),
    p("e18-p2", "How long?", "¿Cuánto tiempo?", "For the past… / Since…", "Durante los últimos… / Desde…", "EXPLAIN"),
    p("e18-p3", "Why?", "¿Por qué?", "I have been doing it because…", "Lo he estado haciendo porque…", "EXPLAIN"),
    p("e18-p4", "What has been difficult?", "¿Qué ha sido difícil?", "… has been difficult, especially… However, …", "… ha sido difícil, sobre todo… Sin embargo, …", "CHALLENGE"),
    p("e18-p5", "What will you do next?", "¿Qué harás después?", "Little by little, … Next, I'm going to…", "Poco a poco, … Después, voy a…", "DEFEND"),
  ],
  cues: ["WORKING ON", "HOW LONG?", "WHY?", "DIFFICULT", "NEXT STEP"],
  powerChunks: { core: ["I have been working on…", "for the past…"], stretch: "little by little…" },
  sceneImage: { src: sceneProgress, alt: "A young man climbing a staircase step by step toward a bright open door", altEs: "Un joven subiendo una escalera paso a paso hacia una puerta abierta y luminosa" },
  goalSeconds: [60, 75],
  goalSentences: 8,
  rep5Prompt: { question: "Tell me about your progress and your next step.", questionEs: "Cuéntame sobre tu progreso y tu siguiente paso." },
  rep5Tips: {
    en: "I have been working on… → for the past… → because… → difficult: however… → little by little… → next step",
    es: "I have been working on… → for the past… → because… → difícil: however… → little by little… → siguiente paso",
  },
  speakerVoice: "male",
  testReady: {
    type: "build-sentence",
    title: "BUILD THE SENTENCE",
    titleEs: "ARMA LA FRASE",
    instruction: "Look at the pieces. Say the complete sentence.",
    instructionEs: "Mira las piezas. Di la frase completa.",
    items: [
      { id: "e18-tr1", chunks: ["I", "have been working", "on my English", "for months"], audio: "I — have been working — on my English — for months", maxSeconds: 10 },
      { id: "e18-tr2", chunks: ["for the past few weeks,", "she", "has been focusing", "on speaking"], audio: "for the past few weeks — she — has been focusing — on speaking", maxSeconds: 12 },
      { id: "e18-tr3", chunks: ["little by little,", "we", "have been becoming", "more confident"], audio: "little by little — we — have been becoming — more confident", maxSeconds: 12 },
      { id: "e18-tr4", chunks: ["he", "has been learning", "useful expressions", "for work"], audio: "he — has been learning — useful expressions — for work", maxSeconds: 12 },
      { id: "e18-tr5", chunks: ["they", "have been trying", "to practice", "consistently"], audio: "they — have been trying — to practice — consistently", maxSeconds: 12 },
    ],
  },
});

/* ---------------------- DAY 19 — HANDLE AN UPSET CUSTOMER (CS #2) ---------------------- */

const d19 = makeDay({
  day: 19,
  topic: "Handle an Upset Customer — Customer Service #2",
  topicEs: "Maneja a un cliente molesto — Servicio al cliente #2",
  focus: "Acknowledge → summarize → own → solve → confirm",
  focusEs: "Reconoce → resume → asume → resuelve → confirma",
  intro: {
    title: "HANDLE AN UPSET CUSTOMER",
    titleEs: "MANEJA A UN CLIENTE MOLESTO",
    lead: "The customer has called three times and nobody has fixed the problem. Stay calm. Own it. Solve it.",
    leadEs: "El cliente ha llamado tres veces y nadie ha resuelto el problema. Mantén la calma. Asume. Resuelve.",
    examples: ["I understand why you're frustrated.", "You have been waiting for almost a week, and that is not acceptable.", "Here's what I can do to make this right."],
    goal: "Role play: 3 escalating customer turns. Speak 60–90 seconds in total.",
    goalEs: "Role play: 3 turnos del cliente que escalan. Habla 60–90 segundos en total.",
    cta: START,
  },
  lines: [
    l("e19-1", "I understand why you're frustrated, | and I'm sorry about this experience.", "Entiendo por qué está frustrado, y lamento esta experiencia."),
    l("e19-2", "If I understand correctly, | you have called three times about the same problem.", "Si entiendo bien, ha llamado tres veces por el mismo problema."),
    l("e19-3", "You have been waiting for almost a week, | and that is not acceptable.", "Ha estado esperando casi una semana, y eso no es aceptable."),
    l("e19-4", "I'm going to take responsibility for this | and stay with you until it's solved.", "Voy a hacerme responsable de esto y quedarme con usted hasta que se resuelva."),
    l("e19-5", "Here's what I can do: | I'll escalate your case right now.", "Esto es lo que puedo hacer: voy a escalar su caso ahora mismo."),
    l("e19-6", "To make this right, | I'll also apply a credit to your account.", "Para compensar esto, también aplicaré un crédito a su cuenta."),
    l("e19-7", "I'll call you back today | with an update, | even if the problem isn't solved yet.", "Le llamaré hoy con una actualización, aunque el problema todavía no esté resuelto."),
    l("e19-8", "Overall, my goal is to make sure | this doesn't happen again.", "En general, mi objetivo es asegurarme de que esto no vuelva a pasar."),
  ],
  rep2Chunks: chunks4("e19"),
  prompts: [
    p("e19-p1", "Why is the customer upset?", "¿Por qué está molesto el cliente?", "The customer is upset because… has been…", "El cliente está molesto porque… ha estado…", "ANSWER"),
    p("e19-p2", "How would you acknowledge the problem?", "¿Cómo reconocerías el problema?", "I understand why you're frustrated…", "Entiendo por qué está frustrado…", "EXPLAIN"),
    p("e19-p3", "What would you ask?", "¿Qué preguntarías?", "If I understand correctly… Could you tell me…?", "Si entiendo bien… ¿Podría decirme…?", "CHALLENGE"),
    p("e19-p4", "What solution could you offer?", "¿Qué solución podrías ofrecer?", "Here's what I can do… To make this right…", "Esto es lo que puedo hacer… Para compensar…", "CHALLENGE"),
    p("e19-p5", "What would you say if the customer threatened to cancel?", "¿Qué dirías si el cliente amenazara con cancelar?", "I understand. In that case, … Overall, …", "Entiendo. En ese caso, … En general, …", "DEFEND"),
  ],
  cues: ["ACKNOWLEDGE", "SUMMARIZE", "OWN", "SOLVE", "CONFIRM"],
  powerChunks: { core: ["I understand why you're frustrated.", "here's what I can do…"], stretch: "to make this right…" },
  sceneImage: { src: sceneUpsetCustomer, alt: "A frustrated customer on the phone after a week of waiting next to a calm, empathetic agent listening carefully", altEs: "Un cliente frustrado al teléfono tras una semana de espera junto a una agente calmada y empática escuchando con atención" },
  rep5Audio: {
    label: "CUSTOMER",
    labelEs: "CLIENTE",
    text: "I've called three times about this problem, and nobody has fixed it. I've been waiting for almost a week, and I'm really frustrated.",
    es: "He llamado tres veces por este problema y nadie lo ha arreglado. He estado esperando casi una semana y estoy muy frustrado.",
    voice: "male",
  },
  goalSeconds: [60, 90],
  goalSentences: 8,
  rep5Turns: [
    {
      id: "e19-turn1",
      label: "CUSTOMER · UPSET",
      labelEs: "CLIENTE · MOLESTO",
      text: "I've already contacted your company three times.",
      es: "Ya me he comunicado con su empresa tres veces.",
      voice: "male",
    },
    {
      id: "e19-turn2",
      label: "CUSTOMER · ESCALATION",
      labelEs: "CLIENTE · ESCALA",
      text: "The last agent told me someone would call me back, but nobody did.",
      es: "El último agente me dijo que alguien me llamaría, pero nadie lo hizo.",
      voice: "male",
    },
    {
      id: "e19-turn3",
      label: "CUSTOMER · CANCEL THREAT",
      labelEs: "CLIENTE · AMENAZA DE CANCELAR",
      text: "If this isn't solved today, I'm going to cancel the service.",
      es: "Si esto no se resuelve hoy, voy a cancelar el servicio.",
      voice: "male",
    },
  ],
  rep5Toolbox: ["I understand why you're frustrated.", "If I understand correctly…", "Here's what I can do…", "To make this right…"],
  rep5Prompt: { question: "Upset customer role play: listen to each turn and respond.", questionEs: "Role play de cliente molesto: escucha cada turno y responde." },
  rep5Tips: {
    en: "ACKNOWLEDGE → SUMMARIZE → OWN → SOLVE → CONFIRM. Stay calm. Never argue. Offer one concrete next step.",
    es: "RECONOCE → RESUME → ASUME → RESUELVE → CONFIRMA. Mantén la calma. Nunca discutas. Ofrece un paso concreto.",
  },
  speakerVoice: "female",
  testReady: {
    type: "listen-respond",
    title: "LISTEN & RESPOND",
    titleEs: "ESCUCHA Y RESPONDE",
    instruction: "Listen to the upset customer. Then answer 4 questions out loud.",
    instructionEs: "Escucha al cliente molesto. Luego responde 4 preguntas en voz alta.",
    passage:
      "This is the fourth time I'm calling. My bill has been wrong for two months, and every agent tells me it's fixed, but the next bill is wrong again. I've been a customer for five years, and honestly, I'm thinking about leaving.",
    items: [
      { id: "e19-tr1", audio: "Why is the customer upset?", text: "Why is the customer upset?", textEs: "¿Por qué está molesto el cliente?", maxSeconds: 12 },
      { id: "e19-tr2", audio: "How long has the problem been happening?", text: "How long has the problem been happening?", textEs: "¿Desde cuándo pasa el problema?", maxSeconds: 10 },
      { id: "e19-tr3", audio: "What would you say first?", text: "What would you say first?", textEs: "¿Qué dirías primero?", maxSeconds: 15 },
      { id: "e19-tr4", audio: "What concrete action would you take?", text: "What concrete action would you take?", textEs: "¿Qué acción concreta tomarías?", maxSeconds: 15 },
    ],
  },
});

/* ------------------ DAY 20 — CONSULTATIVE SALES CHALLENGE (SALES #2) ------------------ */

const d20 = makeDay({
  day: 20,
  topic: "Consultative Sales Challenge — Sales #2",
  topicEs: "Reto de ventas consultivas — Ventas #2",
  focus: "Discover → compare → recommend → handle objection → close",
  focusEs: "Descubre → compara → recomienda → maneja la objeción → cierra",
  intro: {
    title: "EAGLES FINAL CHALLENGE",
    titleEs: "RETO FINAL DE EAGLES",
    lead: "A customer's plan is cheap but too slow for work. Three plans. Discover → compare → recommend → handle the objection → close.",
    leadEs: "El plan del cliente es barato pero muy lento para trabajar. Tres planes. Descubre → compara → recomienda → maneja la objeción → cierra.",
    examples: ["Based on what you've told me, speed is your main problem.", "That's why I'd recommend Plan B.", "On the other hand, Plan C is faster, but it's more than you need."],
    goal: "Final role play: 4 customer turns. Speak 75–90 seconds in total. Connect 10+ ideas.",
    goalEs: "Role play final: 4 turnos del cliente. Habla 75–90 segundos en total. Conecta 10+ ideas.",
    cta: START,
  },
  lines: [
    l("e20-1", "Based on what you've told me, | speed is your main problem right now.", "Según lo que me ha dicho, la velocidad es su problema principal ahora."),
    l("e20-2", "You have been using the same plan for two years, | so your work has changed more than your plan.", "Ha usado el mismo plan por dos años, así que su trabajo ha cambiado más que su plan."),
    l("e20-3", "Plan A is the cheapest, | but it's similar to what you have now.", "El Plan A es el más barato, pero es parecido a lo que tiene ahora."),
    l("e20-4", "Plan C is the fastest; | on the other hand, it's more than you need.", "El Plan C es el más rápido; por otro lado, es más de lo que necesita."),
    l("e20-5", "That's why I'd recommend Plan B: | it's three times faster and includes priority support.", "Por eso le recomendaría el Plan B: es tres veces más rápido e incluye soporte prioritario."),
    l("e20-6", "I understand your concern about the price, | but the main reason is that you need it for work.", "Entiendo su preocupación por el precio, pero la razón principal es que lo necesita para trabajar."),
    l("e20-7", "The biggest benefit is | that your calls and files will stop failing.", "El mayor beneficio es que sus llamadas y archivos dejarán de fallar."),
    l("e20-8", "Overall, Plan B gives you what you need | without paying for more than that.", "En general, el Plan B le da lo que necesita sin pagar por más."),
  ],
  rep2Chunks: chunks4("e20"),
  prompts: [
    p("e20-p1", "What does the customer need?", "¿Qué necesita el cliente?", "Based on what you've told me, you need…", "Según lo que me ha dicho, usted necesita…", "ANSWER"),
    p("e20-p2", "Which plan would you recommend? Why?", "¿Qué plan recomendarías? ¿Por qué?", "That's why I'd recommend… The main reason is…", "Por eso le recomendaría… La razón principal es…", "EXPLAIN"),
    p("e20-p3", "What is one disadvantage of your recommendation?", "¿Cuál es una desventaja de tu recomendación?", "On the other hand, …", "Por otro lado, …", "COMPARE"),
    p("e20-p4", "How would you respond if the customer said it is too expensive?", "¿Cómo responderías si el cliente dijera que es muy caro?", "I understand your concern. However, …", "Entiendo su preocupación. Sin embargo, …", "CHALLENGE"),
    p("e20-p5", "How would you close?", "¿Cómo cerrarías?", "Overall, … So, I'd suggest…", "En general, … Así que le sugiero…", "DEFEND"),
  ],
  cues: ["DISCOVER", "COMPARE", "RECOMMEND", "OBJECTION", "CLOSE"],
  powerChunks: { core: ["based on what you've told me…", "that's why I'd recommend…"], stretch: "on the other hand…" },
  sceneImage: { src: scenePlans, alt: "A customer working from home with a slow connection, with three plan cards on the wall: Plan A $35 50 Mbps basic support, Plan B $50 150 Mbps priority support, Plan C $70 300 Mbps premium support", altEs: "Una clienta trabajando desde casa con conexión lenta y tres tarjetas de planes: Plan A $35 50 Mbps soporte básico, Plan B $50 150 Mbps soporte prioritario, Plan C $70 300 Mbps soporte premium" },
  storyPanels: [
    card("e20-consult", sceneSalesConsult, "A consultant comparing plans with a customer", "DISCOVER → RECOMMEND"),
    card("e20-plan-a", scenePlans, "Plan A: $35 per month, 50 Mbps, basic support", "PLAN A · $35 · 50 MBPS · BASIC"),
    card("e20-plan-b", scenePlans, "Plan B: $50 per month, 150 Mbps, priority support", "PLAN B · $50 · 150 MBPS · PRIORITY"),
    card("e20-plan-c", scenePlans, "Plan C: $70 per month, 300 Mbps, premium support", "PLAN C · $70 · 300 MBPS · PREMIUM"),
  ],
  rep5Audio: {
    label: "CUSTOMER",
    labelEs: "CLIENTE",
    text: "I've been using my current internet plan for two years. It's cheap, but lately it has been too slow for my work. I'm looking for something better, but I don't want my bill to become too expensive.",
    es: "He usado mi plan de internet actual por dos años. Es barato, pero últimamente ha sido muy lento para mi trabajo. Busco algo mejor, pero no quiero que mi factura se vuelva muy cara.",
    voice: "female",
  },
  goalSeconds: [75, 90],
  goalSentences: 10,
  rep5Turns: [
    {
      id: "e20-turn1",
      label: "CUSTOMER",
      labelEs: "CLIENTE",
      text: "What would you recommend for me?",
      es: "¿Qué me recomendaría?",
      voice: "female",
    },
    {
      id: "e20-turn2",
      label: "CUSTOMER · OBJECTION",
      labelEs: "CLIENTE · OBJECIÓN",
      text: "Your recommended plan costs more than what I'm paying now. Why should I change?",
      es: "El plan que me recomienda cuesta más de lo que pago ahora. ¿Por qué debería cambiar?",
      voice: "female",
    },
    {
      id: "e20-turn3",
      label: "CUSTOMER · DOUBT",
      labelEs: "CLIENTE · DUDA",
      text: "I'm still not sure. What is the biggest benefit for me?",
      es: "Todavía no estoy segura. ¿Cuál es el mayor beneficio para mí?",
      voice: "female",
    },
    {
      id: "e20-turn4",
      label: "CUSTOMER · CLOSE",
      labelEs: "CLIENTE · CIERRE",
      text: "So, what do you think I should do?",
      es: "Entonces, ¿qué cree que debería hacer?",
      voice: "female",
    },
  ],
  rep5Toolbox: ["Based on what you've told me…", "That's why I'd recommend…", "I understand your concern.", "On the other hand…", "The main reason is…"],
  rep5Prompt: { question: "Final sales role play: listen to each customer turn and respond.", questionEs: "Role play final de ventas: escucha cada turno del cliente y responde." },
  rep5Tips: {
    en: "DISCOVER → COMPARE → RECOMMEND → HANDLE OBJECTION → CLOSE. Understand, compare, reason, react, defend, recommend. Perfect grammar is not required.",
    es: "DESCUBRE → COMPARA → RECOMIENDA → MANEJA LA OBJECIÓN → CIERRA. Entiende, compara, razona, reacciona, defiende, recomienda. No se requiere gramática perfecta.",
  },
  speakerVoice: "male",
  testReady: {
    type: "speak-now",
    title: "SPEAK NOW",
    titleEs: "HABLA AHORA",
    instruction: "10 seconds to think. Then speak for about 60 seconds.",
    instructionEs: "10 segundos para pensar. Luego habla unos 60 segundos.",
    thinkSeconds: 10,
    speakSeconds: 60,
    items: [
      {
        id: "e20-tr1",
        text: "Describe a difficult situation at work and explain how you would solve it.",
        textEs: "Describe una situación difícil en el trabajo y explica cómo la resolverías.",
        chunks: ["SITUATION?", "WHY DIFFICULT?", "WHAT WOULD YOU DO?", "RESULT?"],
        maxSeconds: 75,
      },
    ],
  },
});

export const EAGLES_WEEKS_2_4_DAYS: CourseDay[] = [d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20];
