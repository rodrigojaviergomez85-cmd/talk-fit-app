/**
 * ADVANCED 2 — DO THE JOB · WEEKS 2–4 (Days 6–20)
 *
 * SUPPORT PROGRESSION (deliberate — do not "fix" it):
 *   Week 2 — cue chips on every turn + small toolboxes.
 *   Week 3 — cues only on the FIRST turn of the round; toolboxes shrink.
 *   Week 4 — cues only on switch / unexpected turns; tiny or no toolbox.
 *
 * All customer / guest / manager turns are FIXED and prewritten.
 * All `a2d*` ids are frozen — progress and recordings are keyed to them.
 */
import type { CourseDay, TestReadySprint } from "@/lib/types";
import { l, q, chunks4 } from "./course-builders";
import {
  advanced2Day,
  turn,
  repairTurn,
  situationTurn,
  ALL_NEEDS,
  SITUATION_ROUND,
  START,
  CUSTOMER,
  GUEST,
  MANAGER,
  QUICK,
  DEVELOP,
  SUSTAIN,
} from "./advanced-2-course";

/* ================================ WEEK 2 — RECOMMEND & SELL ================================ */

const d6Sprint: TestReadySprint = {
  type: "quick-answers",
  title: "QUICK ANSWERS",
  titleEs: "RESPUESTAS RÁPIDAS",
  instruction: "Answer each question in 10–15 seconds.",
  instructionEs: "Responde cada pregunta en 10–15 segundos.",
  items: [
    { id: "a2d6-qa1", audio: "What do you recommend for a family of four?", maxSeconds: 15 },
    { id: "a2d6-qa2", audio: "Why is that better than the basic option?", maxSeconds: 15 },
    { id: "a2d6-qa3", audio: "How much more is it?", maxSeconds: 15 },
    { id: "a2d6-qa4", audio: "Can I change it later?", maxSeconds: 15 },
  ],
};

const d6 = advanced2Day({
  day: 6,
  topic: "Discover the Need",
  topicEs: "Descubre la necesidad",
  focus: "Ask before you sell — ASK → LISTEN → MATCH",
  focusEs: "Pregunta antes de vender — PREGUNTA → ESCUCHA → CONECTA",
  intro: {
    title: "DISCOVER THE NEED",
    titleEs: "DESCUBRE LA NECESIDAD",
    lead: "Selling starts with questions. Find the real need first: ASK → LISTEN → MATCH.",
    leadEs: "Vender empieza con preguntas. Encuentra la necesidad real primero: PREGUNTA → ESCUCHA → CONECTA.",
    examples: ["Can I ask what you use it for?", "In that case…", "Based on what you told me…"],
    goal: "Ask two useful questions, then recommend one option.",
    goalEs: "Haz dos preguntas útiles y luego recomienda una opción.",
    cta: START,
  },
  lines: [
    l("a2d6-1", "Before I recommend anything, | can I ask you a couple of questions?", "Antes de recomendarle algo, ¿puedo hacerle un par de preguntas?"),
    l("a2d6-2", "How many people | will be using the service?", "¿Cuántas personas van a usar el servicio?"),
    l("a2d6-3", "And do you use it mostly | for work or for family?", "¿Y lo usa principalmente para el trabajo o para la familia?"),
    l("a2d6-4", "That's helpful. | Based on what you told me, I have an idea.", "Eso ayuda. Con lo que me dice, tengo una idea."),
    l("a2d6-5", "In that case, | the family plan fits you better.", "En ese caso, el plan familiar le queda mejor."),
    l("a2d6-6", "It covers four people | for a little more than you pay now.", "Cubre a cuatro personas por un poco más de lo que paga ahora."),
    l("a2d6-7", "The main benefit is | you stop paying for two separate accounts.", "El beneficio principal es que deja de pagar dos cuentas separadas."),
    l("a2d6-8", "Would you like me | to check the exact price for you?", "¿Quiere que le revise el precio exacto?"),
  ],
  rep2Chunks: chunks4("a2d6"),
  prompts: [
    q("a2d6-p1", "Before recommending, what do you ask?", "Antes de recomendar, ¿qué preguntas?", "Can I ask you a couple of questions?", "¿Puedo hacerle un par de preguntas?", "ASK"),
    q("a2d6-p2", "The customer says it's for the whole family. React.", "El cliente dice que es para toda la familia. Reacciona.", "In that case…", "En ese caso…", "MATCH", "react"),
    q("a2d6-p3", "Explain the main benefit in one sentence.", "Explica el beneficio principal en una oración.", "The main benefit is…", "El beneficio principal es…", "BENEFIT", "explain"),
    q("a2d6-p4", "Why is this better than the basic plan?", "¿Por qué es mejor que el plan básico?", "Compared to the basic plan…", "Comparado con el plan básico…", "COMPARE", "justify"),
    q("a2d6-p5", "Invite the customer to the next step.", "Invita al cliente al siguiente paso.", "Would you like me to…", "¿Quiere que…?", "CLOSE"),
  ],
  cues: ["ASK", "LISTEN", "MATCH", "CLOSE"],
  powerChunks: { core: ["Can I ask you a couple of questions?", "Based on what you told me…"], stretch: "The main benefit is…" },
  goalSeconds: [55, 75],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "A customer asks 'what do you recommend?' — find the need first.", questionEs: "Un cliente pregunta '¿qué me recomienda?' — encuentra la necesidad primero." },
  rep5Tips: { en: "ASK → LISTEN → MATCH → CLOSE.", es: "PREGUNTA → ESCUCHA → CONECTA → CIERRA." },
  rep5Turns: [
    turn("a2d6-turn1", CUSTOMER, "I'm not sure what plan I need. What do you recommend?", "No sé qué plan necesito. ¿Qué me recomienda?", "male", {
      targetSeconds: DEVELOP,
      cues: ["ASK", "LISTEN"],
      toolbox: ["Can I ask you a couple of questions?", "How many people will be using it?"],
    }),
    turn("a2d6-turn2", CUSTOMER, "It's for me, my wife and our two teenagers. We're all on separate accounts now.", "Es para mí, mi esposa y nuestros dos adolescentes. Ahora todos tenemos cuentas separadas.", "male", {
      targetSeconds: DEVELOP,
      cues: ["MATCH", "BENEFIT"],
      toolbox: ["In that case…", "The main benefit is…"],
    }),
    repairTurn("a2d6-repair", "confirm", CUSTOMER, "So you're saying we'd pay one bill instead of four?", "¿Entonces dice que pagaríamos una factura en vez de cuatro?", "male"),
  ],
  speakerVoice: "female",
  testReady: d6Sprint,
});

const d7Sprint: TestReadySprint = {
  type: "listen-respond",
  title: "LISTEN & RESPOND",
  titleEs: "ESCUCHA Y RESPONDE",
  instruction: "Listen to the guest, then answer professionally in one or two sentences.",
  instructionEs: "Escucha al huésped y responde profesionalmente en una o dos oraciones.",
  items: [
    { id: "a2d7-lr1", audio: "That sounds nice, but it's more than I wanted to spend.", maxSeconds: 20 },
    { id: "a2d7-lr2", audio: "Does the standard room include breakfast?", maxSeconds: 15 },
    { id: "a2d7-lr3", audio: "Can I decide when I arrive?", maxSeconds: 15 },
  ],
};

const d7 = advanced2Day({
  day: 7,
  topic: "Offer the Upgrade",
  topicEs: "Ofrece la mejora",
  focus: "Upsell with respect — VALUE → PRICE → CHOICE",
  focusEs: "Vende más con respeto — VALOR → PRECIO → ELECCIÓN",
  intro: {
    title: "OFFER THE UPGRADE",
    titleEs: "OFRECE LA MEJORA",
    lead: "An upgrade is a service, not a trick. Say the value first, then the price, then let the customer choose.",
    leadEs: "Una mejora es un servicio, no un truco. Di el valor primero, luego el precio, y deja elegir al cliente.",
    examples: ["For a few dollars more…", "That means you get…", "It's completely up to you."],
    goal: "Offer the upgrade clearly and accept a 'no' professionally.",
    goalEs: "Ofrece la mejora con claridad y acepta un 'no' profesionalmente.",
    cta: START,
  },
  lines: [
    l("a2d7-1", "There's one more option | I'd like to mention.", "Hay una opción más que quisiera mencionarle."),
    l("a2d7-2", "For a few dollars more, | you can get the room with the balcony.", "Por unos dólares más, puede llevar la habitación con balcón."),
    l("a2d7-3", "That means you get | late checkout and free breakfast.", "Eso significa que obtiene salida tardía y desayuno gratis."),
    l("a2d7-4", "Most guests tell me | the late checkout is the best part.", "La mayoría de los huéspedes me dicen que la salida tardía es lo mejor."),
    l("a2d7-5", "The difference is | about fifteen dollars per night.", "La diferencia es de unos quince dólares por noche."),
    l("a2d7-6", "It's completely up to you — | both rooms are ready today.", "Es completamente su decisión — las dos habitaciones están listas hoy."),
    l("a2d7-7", "No problem at all. | I'll keep the standard room for you.", "No hay ningún problema. Le dejo la habitación estándar."),
    l("a2d7-8", "And if you change your mind, | just tell me when you arrive.", "Y si cambia de opinión, solo dígamelo cuando llegue."),
  ],
  rep2Chunks: chunks4("a2d7"),
  prompts: [
    q("a2d7-p1", "Introduce the upgrade without pressure.", "Presenta la mejora sin presionar.", "There's one more option…", "Hay una opción más…", "OPEN"),
    q("a2d7-p2", "Say the value before the price.", "Di el valor antes del precio.", "That means you get…", "Eso significa que obtiene…", "VALUE", "explain"),
    q("a2d7-p3", "Say the price simply.", "Di el precio de forma simple.", "The difference is…", "La diferencia es…", "PRICE"),
    q("a2d7-p4", "The guest says no. Respond well.", "El huésped dice que no. Responde bien.", "No problem at all…", "No hay ningún problema…", "ACCEPT", "react"),
    q("a2d7-p5", "Leave the door open.", "Deja la puerta abierta.", "If you change your mind…", "Si cambia de opinión…", "CLOSE"),
  ],
  cues: ["OPEN", "VALUE", "PRICE", "CHOICE"],
  powerChunks: { core: ["For a few dollars more…", "That means you get…"], stretch: "It's completely up to you." },
  goalSeconds: [55, 75],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "Offer a room upgrade to a guest who is not sure.", questionEs: "Ofrece una mejora de habitación a un huésped que no está seguro." },
  rep5Tips: { en: "VALUE → PRICE → CHOICE. A 'no' is a good outcome too.", es: "VALOR → PRECIO → ELECCIÓN. Un 'no' también es un buen resultado." },
  rep5Turns: [
    turn("a2d7-turn1", GUEST, "The standard room is fine, I think. Is there anything else?", "La habitación estándar está bien, creo. ¿Hay algo más?", "female", {
      targetSeconds: DEVELOP,
      cues: ["OPEN", "VALUE"],
      toolbox: ["There's one more option…", "That means you get…"],
    }),
    turn("a2d7-turn2", GUEST, "Hmm, that sounds nice, but how much more are we talking about?", "Mmm, suena bien, pero ¿de cuánto más estamos hablando?", "female", {
      targetSeconds: QUICK,
      cues: ["PRICE", "CHOICE"],
      toolbox: ["The difference is…", "It's completely up to you."],
    }),
    turn("a2d7-turn3", GUEST, "I'll stay with the standard one, thanks.", "Me quedo con la estándar, gracias.", "female", {
      targetSeconds: QUICK,
      cues: ["ACCEPT", "CLOSE"],
      toolbox: ["No problem at all.", "If you change your mind…"],
    }),
    repairTurn("a2d7-repair", "catch", GUEST, "And does the standard rate include the resort fee and the city tax?", "¿Y la tarifa estándar incluye la cuota del hotel y el impuesto de la ciudad?", "female"),
  ],
  speakerVoice: "female",
  testReady: d7Sprint,
});

const d8Sprint: TestReadySprint = {
  type: "build-sentence",
  title: "BUILD THE SENTENCE",
  titleEs: "ARMA LA ORACIÓN",
  instruction: "Use the words to build one complete comparison out loud.",
  instructionEs: "Usa las palabras para armar una comparación completa en voz alta.",
  items: [
    { id: "a2d8-bs1", chunks: ["the basic plan", "cheaper", "but", "fewer features"], maxSeconds: 20 },
    { id: "a2d8-bs2", chunks: ["this option", "costs more", "however", "it saves time"], maxSeconds: 20 },
    { id: "a2d8-bs3", chunks: ["if you travel often", "the second one", "is a better fit"], maxSeconds: 20 },
  ],
};

const d8 = advanced2Day({
  day: 8,
  topic: "Compare Two Options",
  topicEs: "Compara dos opciones",
  focus: "Help them choose — OPTION A → OPTION B → RECOMMEND",
  focusEs: "Ayúdalos a elegir — OPCIÓN A → OPCIÓN B → RECOMIENDA",
  intro: {
    title: "COMPARE TWO OPTIONS",
    titleEs: "COMPARA DOS OPCIONES",
    lead: "The customer can't decide. Compare clearly and then recommend one — with a reason.",
    leadEs: "El cliente no se decide. Compara claro y luego recomienda una — con una razón.",
    examples: ["The difference between them is…", "If I were you…", "Because you told me…"],
    goal: "Compare two options and defend your recommendation.",
    goalEs: "Compara dos opciones y defiende tu recomendación.",
    cta: START,
  },
  lines: [
    l("a2d8-1", "Let me compare them for you | in simple terms.", "Déjeme compararlas de forma simple."),
    l("a2d8-2", "The first option is cheaper, | but it has fewer features.", "La primera opción es más barata, pero tiene menos funciones."),
    l("a2d8-3", "The second one costs more; | however, it includes support at night.", "La segunda cuesta más; sin embargo, incluye soporte de noche."),
    l("a2d8-4", "The main difference between them | is the response time.", "La diferencia principal entre ellas es el tiempo de respuesta."),
    l("a2d8-5", "Because you told me | you work on weekends, that matters.", "Como me dijo que trabaja los fines de semana, eso importa."),
    l("a2d8-6", "If I were you, | I would take the second one.", "Si yo fuera usted, tomaría la segunda."),
    l("a2d8-7", "That said, | the first one is still a good choice.", "Dicho eso, la primera sigue siendo una buena opción."),
    l("a2d8-8", "Which one | would you like me to set up?", "¿Cuál quiere que le configure?"),
  ],
  rep2Chunks: chunks4("a2d8"),
  prompts: [
    q("a2d8-p1", "Describe option A in one sentence.", "Describe la opción A en una oración.", "The first option is…", "La primera opción es…", "OPTION A"),
    q("a2d8-p2", "Describe option B and the difference.", "Describe la opción B y la diferencia.", "The second one…; however…", "La segunda…; sin embargo…", "OPTION B", "explain"),
    q("a2d8-p3", "Recommend one and say why.", "Recomienda una y di por qué.", "If I were you, I would…", "Si yo fuera usted, tomaría…", "RECOMMEND", "justify"),
    q("a2d8-p4", "The customer disagrees. Defend your recommendation kindly.", "El cliente no está de acuerdo. Defiende tu recomendación con amabilidad.", "That's fair. In your case…", "Es justo. En su caso…", "DEFEND", "defend"),
    q("a2d8-p5", "Move to the decision.", "Avanza a la decisión.", "Which one would you like…", "¿Cuál quiere…?", "CLOSE"),
  ],
  cues: ["OPTION A", "OPTION B", "RECOMMEND", "CLOSE"],
  powerChunks: { core: ["The main difference is…", "If I were you…"], stretch: "That said…" },
  goalSeconds: [55, 75],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "A customer can't choose between two plans. Help them decide.", questionEs: "Un cliente no puede elegir entre dos planes. Ayúdalo a decidir." },
  rep5Tips: { en: "Compare, then commit to a recommendation with a reason.", es: "Compara y luego comprométete con una recomendación y una razón." },
  rep5Turns: [
    turn("a2d8-turn1", CUSTOMER, "I've been looking at two plans and honestly they look the same to me.", "He estado viendo dos planes y honestamente me parecen iguales.", "female", {
      targetSeconds: DEVELOP,
      cues: ["OPTION A", "OPTION B"],
      toolbox: ["Let me compare them for you.", "The main difference is…"],
    }),
    turn("a2d8-turn2", CUSTOMER, "My friend told me the cheap one is enough. What do you think?", "Mi amigo me dijo que el barato es suficiente. ¿Usted qué piensa?", "female", {
      targetSeconds: DEVELOP,
      cues: ["RECOMMEND", "DEFEND"],
      toolbox: ["Because you told me…", "If I were you…"],
    }),
    repairTurn("a2d8-repair", "time", CUSTOMER, "And which one would you personally pay for, with your own money?", "¿Y cuál pagaría usted, con su propio dinero?", "female"),
  ],
  speakerVoice: "female",
  testReady: d8Sprint,
});

const d9Sprint: TestReadySprint = {
  type: "quick-answers",
  title: "QUICK ANSWERS",
  titleEs: "RESPUESTAS RÁPIDAS",
  instruction: "One short objection at a time. Answer in 10–15 seconds.",
  instructionEs: "Una objeción corta a la vez. Responde en 10–15 segundos.",
  items: [
    { id: "a2d9-qa1", audio: "It's too expensive.", maxSeconds: 15 },
    { id: "a2d9-qa2", audio: "Your competitor is cheaper.", maxSeconds: 15 },
    { id: "a2d9-qa3", audio: "I don't really need it.", maxSeconds: 15 },
    { id: "a2d9-qa4", audio: "I need to think about it.", maxSeconds: 15 },
  ],
};

const d9 = advanced2Day({
  day: 9,
  topic: "Handle an Objection",
  topicEs: "Maneja una objeción",
  focus: "It's too expensive — ACKNOWLEDGE → REFRAME → OPTION",
  focusEs: "Es muy caro — RECONOCE → REPLANTEA → OPCIÓN",
  intro: {
    title: "HANDLE AN OBJECTION",
    titleEs: "MANEJA UNA OBJECIÓN",
    lead: "'It's too expensive' is not a no. Acknowledge it, reframe the value, offer an option.",
    leadEs: "'Es muy caro' no es un no. Reconócelo, replantea el valor, ofrece una opción.",
    examples: ["I understand — it's an investment.", "What you're really paying for is…", "Another option would be…"],
    goal: "Handle the price objection without arguing.",
    goalEs: "Maneja la objeción de precio sin discutir.",
    cta: START,
  },
  lines: [
    l("a2d9-1", "I understand — | price is important.", "Le entiendo — el precio es importante."),
    l("a2d9-2", "You're right that | it's more than the basic service.", "Tiene razón en que es más que el servicio básico."),
    l("a2d9-3", "What you're really paying for | is the time you save every week.", "Por lo que realmente está pagando es por el tiempo que ahorra cada semana."),
    l("a2d9-4", "Most of our customers | tell me it pays for itself.", "La mayoría de nuestros clientes me dicen que se paga solo."),
    l("a2d9-5", "That said, | I don't want you to pay for something you won't use.", "Dicho eso, no quiero que pague por algo que no va a usar."),
    l("a2d9-6", "Another option would be | to start with the smaller package.", "Otra opción sería empezar con el paquete más pequeño."),
    l("a2d9-7", "You can move up later | without any extra cost.", "Puede subir de nivel después sin ningún costo extra."),
    l("a2d9-8", "Does that sound | more comfortable for you?", "¿Le suena más cómodo así?"),
  ],
  rep2Chunks: chunks4("a2d9"),
  prompts: [
    q("a2d9-p1", "The customer says it's too expensive. First sentence?", "El cliente dice que es muy caro. ¿Primera oración?", "I understand — price is important.", "Le entiendo — el precio es importante.", "ACKNOWLEDGE"),
    q("a2d9-p2", "Reframe the value.", "Replantea el valor.", "What you're really paying for is…", "Por lo que realmente paga es…", "REFRAME", "justify"),
    q("a2d9-p3", "Offer a smaller option.", "Ofrece una opción más pequeña.", "Another option would be…", "Otra opción sería…", "OPTION"),
    q("a2d9-p4", "The customer still hesitates. Respond without pressure.", "El cliente sigue dudando. Responde sin presionar.", "Take your time — what I can do is…", "Tómese su tiempo — lo que puedo hacer es…", "RESPECT", "react"),
    q("a2d9-p5", "Check how they feel.", "Verifica cómo se siente.", "Does that sound…?", "¿Le suena…?", "CHECK"),
  ],
  cues: ["ACKNOWLEDGE", "REFRAME", "OPTION", "CHECK"],
  powerChunks: { core: ["I understand — price is important.", "What you're really paying for is…"], stretch: "Another option would be…" },
  goalSeconds: [55, 75],
  goalSentences: 8,
  hideModelText: true,
  rep5Prompt: { question: "A customer says your service is too expensive.", questionEs: "Un cliente dice que tu servicio es muy caro." },
  rep5Tips: { en: "Never argue with the price. Reframe and offer a path.", es: "Nunca discutas el precio. Replantea y ofrece un camino." },
  rep5Turns: [
    turn("a2d9-turn1", CUSTOMER, "Honestly, that's too expensive for me. Other companies charge less.", "Honestamente, eso es muy caro para mí. Otras empresas cobran menos.", "male", {
      targetSeconds: DEVELOP,
      cues: ["ACKNOWLEDGE", "REFRAME"],
      toolbox: ["I understand — price is important.", "What you're really paying for is…"],
    }),
    turn("a2d9-turn2", CUSTOMER, "Maybe. But right now money is tight for us.", "Tal vez. Pero ahora mismo el dinero está apretado para nosotros.", "male", {
      targetSeconds: DEVELOP,
      cues: ["OPTION", "CHECK"],
      toolbox: ["Another option would be…", "Does that sound more comfortable?"],
    }),
    repairTurn("a2d9-repair", "restart", CUSTOMER, "Wait — I didn't follow that. What exactly would I pay this month?", "Espere — no le seguí. ¿Qué pagaría exactamente este mes?", "male"),
  ],
  speakerVoice: "female",
  testReady: d9Sprint,
});

const d10Sprint: TestReadySprint = {
  type: "mixed",
  title: "MIXED SPRINT",
  titleEs: "SPRINT MIXTO",
  instruction: "Five drills from this week. Optional practice.",
  instructionEs: "Cinco ejercicios de esta semana. Práctica opcional.",
  items: [
    { id: "a2d10-m1", kind: "quick-answers", audio: "Why should I choose you and not another company?", maxSeconds: 15 },
    { id: "a2d10-m2", kind: "repeat", audio: "Based on everything you told me, this is what I recommend.", maxSeconds: 12 },
    { id: "a2d10-m3", kind: "listen-respond", audio: "I need to talk to my wife before deciding.", maxSeconds: 20 },
    { id: "a2d10-m4", kind: "speak-now", text: "Close a sale politely with a clear next step.", textEs: "Cierra una venta con amabilidad y un siguiente paso claro.", thinkSeconds: 10, maxSeconds: 40 },
    { id: "a2d10-m5", kind: "quick-answers", audio: "Can you send me all of that in writing?", maxSeconds: 15 },
  ],
};

const d10 = advanced2Day({
  day: 10,
  topic: "Close the Sale",
  topicEs: "Cierra la venta",
  focus: "Week checkpoint — SUMMARIZE → CONFIRM → NEXT STEP",
  focusEs: "Punto de control — RESUME → CONFIRMA → SIGUIENTE PASO",
  intro: {
    title: "CLOSE THE SALE",
    titleEs: "CIERRA LA VENTA",
    lead: "Closing is just being clear: summarize what they chose, confirm it, and say exactly what happens next.",
    leadEs: "Cerrar es solo ser claro: resume lo que eligieron, confírmalo y di exactamente qué sigue.",
    examples: ["So, to summarize…", "Just to confirm…", "What happens next is…"],
    goal: "Close a sale and handle a last-second doubt.",
    goalEs: "Cierra una venta y maneja una duda de último segundo.",
    cta: START,
  },
  lines: [
    l("a2d10-1", "So, to summarize, | you're taking the family plan.", "Entonces, en resumen, se lleva el plan familiar."),
    l("a2d10-2", "That includes | four lines and night support.", "Eso incluye cuatro líneas y soporte nocturno."),
    l("a2d10-3", "Just to confirm, | the first payment is on the fifth.", "Solo para confirmar, el primer pago es el día cinco."),
    l("a2d10-4", "What happens next is | I send everything to your email today.", "Lo que sigue es que le envío todo a su correo hoy."),
    l("a2d10-5", "Take your time to read it | before you sign anything.", "Tómese su tiempo para leerlo antes de firmar nada."),
    l("a2d10-6", "Of course, | you can talk to your wife first.", "Por supuesto, puede hablar primero con su esposa."),
    l("a2d10-7", "I'll keep this price | for you until Friday.", "Le guardo este precio hasta el viernes."),
    l("a2d10-8", "Thank you for your time today. | It was a pleasure helping you.", "Gracias por su tiempo hoy. Fue un placer ayudarle."),
  ],
  rep2Chunks: chunks4("a2d10"),
  prompts: [
    q("a2d10-p1", "Summarize what the customer chose.", "Resume lo que eligió el cliente.", "So, to summarize…", "Entonces, en resumen…", "SUMMARIZE"),
    q("a2d10-p2", "Confirm the key details.", "Confirma los datos clave.", "Just to confirm…", "Solo para confirmar…", "CONFIRM"),
    q("a2d10-p3", "Say what happens next.", "Di qué pasa después.", "What happens next is…", "Lo que sigue es…", "NEXT STEP"),
    q("a2d10-p4", "The customer needs to think. Respond.", "El cliente necesita pensarlo. Responde.", "Of course — take your time.", "Por supuesto — tómese su tiempo.", "RESPECT", "react"),
    q("a2d10-p5", "Close the call warmly.", "Cierra la llamada con calidez.", "Thank you for your time today.", "Gracias por su tiempo hoy.", "CLOSE"),
  ],
  cues: ["SUMMARIZE", "CONFIRM", "NEXT STEP", "CLOSE"],
  powerChunks: { core: ["So, to summarize…", "What happens next is…"], stretch: "I'll keep this price for you until…" },
  goalSeconds: [60, 80],
  goalSentences: 9,
  hideModelText: true,
  rep5Prompt: { question: "Close the sale with a customer who is almost ready.", questionEs: "Cierra la venta con un cliente que casi está listo." },
  rep5Tips: { en: "SUMMARIZE → CONFIRM → NEXT STEP. Clear beats clever.", es: "RESUME → CONFIRMA → SIGUIENTE PASO. Claro es mejor que ingenioso." },
  rep5Turns: [
    situationTurn("a2d10-rec1", CUSTOMER, "Okay… I think I want the family plan. What now?", "Bueno… creo que quiero el plan familiar. ¿Y ahora?", "male", ALL_NEEDS, "explain", {
      round: { n: 1, ...SITUATION_ROUND },
      cues: ["SUMMARIZE", "CONFIRM"],
      toolbox: ["So, to summarize…", "Just to confirm…"],
    }),
    turn("a2d10-turn2", CUSTOMER, "Actually, I should talk to my wife before I sign anything.", "De hecho, debería hablar con mi esposa antes de firmar nada.", "male", {
      targetSeconds: DEVELOP,
      cues: ["RESPECT", "NEXT STEP"],
      toolbox: ["Of course — take your time.", "I'll keep this price for you until…"],
    }),
    turn("a2d10-turn3", CUSTOMER, "Can you send me all of that in writing today?", "¿Me puede enviar todo eso por escrito hoy?", "male", {
      targetSeconds: QUICK,
      cues: ["CONFIRM", "CLOSE"],
      toolbox: ["What happens next is…"],
    }),
    repairTurn("a2d10-repair", "mixed", CUSTOMER, "One more thing — is the promotional rate for twelve or twenty-four months?", "Una cosa más — ¿la tarifa promocional es por doce o veinticuatro meses?", "male"),
  ],
  speakerVoice: "female",
  testReady: d10Sprint,
});

/* ================================ WEEK 3 — FIX THE PROBLEM ================================ */
/* Support drops: cues only on the FIRST turn of the round; smaller toolboxes. */

const d11Sprint: TestReadySprint = {
  type: "listen-respond",
  title: "LISTEN & RESPOND",
  titleEs: "ESCUCHA Y RESPONDE",
  instruction: "ACKNOWLEDGE → FACTS → ACTION. Answer each customer in one or two sentences.",
  instructionEs: "RECONOCE → HECHOS → ACCIÓN. Responde a cada cliente en una o dos oraciones.",
  items: [
    { id: "a2d11-lr1", audio: "My order was supposed to arrive Monday.", maxSeconds: 20 },
    { id: "a2d11-lr2", audio: "I've already called twice.", maxSeconds: 20 },
    { id: "a2d11-lr3", audio: "I want my money back.", maxSeconds: 20 },
  ],
};

const d11 = advanced2Day({
  day: 11,
  topic: "A Late Delivery",
  topicEs: "Una entrega tarde",
  focus: "Angry customer — APOLOGIZE → FACTS → ACTION",
  focusEs: "Cliente molesto — DISCÚLPATE → HECHOS → ACCIÓN",
  intro: {
    title: "A LATE DELIVERY",
    titleEs: "UNA ENTREGA TARDE",
    lead: "The customer is angry and they are right. Apologize once, give facts, and take action.",
    leadEs: "El cliente está molesto y tiene razón. Discúlpate una vez, da hechos y toma acción.",
    examples: ["I'm sorry about this.", "Here's what I can see…", "Here's what I'm going to do."],
    goal: "Stay calm and take control of the solution.",
    goalEs: "Mantén la calma y toma el control de la solución.",
    cta: START,
  },
  lines: [
    l("a2d11-1", "I'm sorry about this — | you should have received it on Monday.", "Lamento esto — debió haberlo recibido el lunes."),
    l("a2d11-2", "Here's what I can see | in the system right now.", "Esto es lo que veo en el sistema ahora mismo."),
    l("a2d11-3", "The package left our warehouse, | but it was never scanned at the city center.", "El paquete salió de nuestro almacén, pero nunca se escaneó en el centro de la ciudad."),
    l("a2d11-4", "I'm not going to promise you something | I can't control.", "No le voy a prometer algo que no puedo controlar."),
    l("a2d11-5", "Here's what I'm going to do: | I'm opening an urgent case today.", "Esto es lo que voy a hacer: abro un caso urgente hoy."),
    l("a2d11-6", "You'll get an answer | within twenty-four hours.", "Recibirá una respuesta en veinticuatro horas."),
    l("a2d11-7", "If the package doesn't appear, | we send a replacement at no cost.", "Si el paquete no aparece, enviamos un reemplazo sin costo."),
    l("a2d11-8", "I'll follow this personally | until it's finished.", "Voy a dar seguimiento personalmente hasta que se resuelva."),
  ],
  rep2Chunks: chunks4("a2d11"),
  prompts: [
    q("a2d11-p1", "Apologize once, professionally.", "Discúlpate una vez, profesionalmente.", "I'm sorry about this —", "Lamento esto —", "APOLOGIZE"),
    q("a2d11-p2", "Give the facts you can see.", "Da los hechos que puedes ver.", "Here's what I can see…", "Esto es lo que veo…", "FACTS", "explain"),
    q("a2d11-p3", "Say what you will do.", "Di qué vas a hacer.", "Here's what I'm going to do:", "Esto es lo que voy a hacer:", "ACTION"),
    q("a2d11-p4", "The customer demands a refund now. Respond.", "El cliente exige un reembolso ahora. Responde.", "I understand. What I can do today is…", "Le entiendo. Lo que puedo hacer hoy es…", "BOUNDARY", "defend"),
    q("a2d11-p5", "Commit to follow-up.", "Comprométete al seguimiento.", "I'll follow this personally…", "Voy a dar seguimiento personalmente…", "COMMIT"),
  ],
  cues: ["APOLOGIZE", "FACTS", "ACTION", "COMMIT"],
  powerChunks: { core: ["Here's what I can see…", "Here's what I'm going to do:"], stretch: "I'm not going to promise you something I can't control." },
  goalSeconds: [60, 80],
  goalSentences: 9,
  hideModelText: true,
  rep5Prompt: { question: "An angry customer's delivery is three days late.", questionEs: "La entrega de un cliente molesto lleva tres días de retraso." },
  rep5Tips: { en: "One apology. Then facts and action.", es: "Una disculpa. Luego hechos y acción." },
  rep5Turns: [
    turn("a2d11-turn1", CUSTOMER, "This is the third day I'm waiting. Nobody tells me anything!", "Es el tercer día que espero. ¡Nadie me dice nada!", "female", {
      targetSeconds: DEVELOP,
      cues: ["APOLOGIZE", "FACTS", "ACTION"],
      toolbox: ["I'm sorry about this.", "Here's what I can see…"],
    }),
    turn("a2d11-turn2", CUSTOMER, "I don't want explanations. I want my money back today.", "No quiero explicaciones. Quiero mi dinero de vuelta hoy.", "female", { targetSeconds: DEVELOP }),
    turn("a2d11-turn3", CUSTOMER, "And how do I know you'll actually do something this time?", "¿Y cómo sé que esta vez sí van a hacer algo?", "female", { targetSeconds: DEVELOP }),
    repairTurn("a2d11-repair", "confirm", CUSTOMER, "So you're saying I get a replacement if it doesn't show up tomorrow?", "¿Entonces dice que recibo un reemplazo si no aparece mañana?", "female"),
  ],
  speakerVoice: "female",
  testReady: d11Sprint,
});

const d12Sprint: TestReadySprint = {
  type: "listen-respond",
  title: "LISTEN & RESPOND",
  titleEs: "ESCUCHA Y RESPONDE",
  instruction: "Troubleshooting questions. Answer with one instruction at a time.",
  instructionEs: "Preguntas de diagnóstico. Responde con una instrucción a la vez.",
  items: [
    { id: "a2d12-lr1", audio: "The screen is completely black. What do I do?", maxSeconds: 20 },
    { id: "a2d12-lr2", audio: "I already restarted it and nothing changed.", maxSeconds: 20 },
    { id: "a2d12-lr3", audio: "Where exactly is that button?", maxSeconds: 20 },
    { id: "a2d12-lr4", audio: "Okay, it's working now. Why did that happen?", maxSeconds: 20 },
  ],
};

const d12 = advanced2Day({
  day: 12,
  topic: "Troubleshoot Step by Step",
  topicEs: "Diagnostica paso a paso",
  focus: "Guide by phone — ONE STEP → CHECK → NEXT STEP",
  focusEs: "Guía por teléfono — UN PASO → VERIFICA → SIGUIENTE PASO",
  intro: {
    title: "TROUBLESHOOT STEP BY STEP",
    titleEs: "DIAGNOSTICA PASO A PASO",
    lead: "Give one instruction at a time and confirm before continuing.",
    leadEs: "Da una instrucción a la vez y confirma antes de continuar.",
    examples: ["First, could you…?", "Let me know when you see it.", "Perfect — now…"],
    goal: "Guide a non-technical customer to a fix.",
    goalEs: "Guía a un cliente sin conocimientos técnicos hasta la solución.",
    cta: START,
  },
  lines: [
    l("a2d12-1", "Don't worry — | we're going to check this together.", "No se preocupe — vamos a revisar esto juntos."),
    l("a2d12-2", "First, could you tell me | what you see on the screen?", "Primero, ¿me puede decir qué ve en la pantalla?"),
    l("a2d12-3", "Perfect. | Now press the button on the right side.", "Perfecto. Ahora presione el botón del lado derecho."),
    l("a2d12-4", "Let me know | when you see the blue light.", "Avíseme cuando vea la luz azul."),
    l("a2d12-5", "If nothing happens, | that tells me something useful.", "Si no pasa nada, eso me dice algo útil."),
    l("a2d12-6", "Great — | that means the device is connected.", "Muy bien — eso significa que el aparato está conectado."),
    l("a2d12-7", "The last step is | to open the app one more time.", "El último paso es abrir la aplicación una vez más."),
    l("a2d12-8", "It happened because | the last update didn't finish correctly.", "Pasó porque la última actualización no terminó correctamente."),
  ],
  rep2Chunks: chunks4("a2d12"),
  prompts: [
    q("a2d12-p1", "Calm the customer and start.", "Calma al cliente y empieza.", "Don't worry — we're going to…", "No se preocupe — vamos a…", "OPEN"),
    q("a2d12-p2", "Give the first instruction only.", "Da solo la primera instrucción.", "First, could you…?", "Primero, ¿podría…?", "ONE STEP"),
    q("a2d12-p3", "Check before continuing.", "Verifica antes de continuar.", "Let me know when…", "Avíseme cuando…", "CHECK"),
    q("a2d12-p4", "The customer says it didn't work. React.", "El cliente dice que no funcionó. Reacciona.", "That's useful. In that case…", "Eso es útil. En ese caso…", "ADAPT", "react"),
    q("a2d12-p5", "Explain why it happened.", "Explica por qué pasó.", "It happened because…", "Pasó porque…", "EXPLAIN", "explain"),
  ],
  cues: ["ONE STEP", "CHECK", "NEXT STEP", "EXPLAIN"],
  powerChunks: { core: ["First, could you…?", "Let me know when…"], stretch: "It happened because…" },
  goalSeconds: [60, 80],
  goalSentences: 9,
  hideModelText: true,
  rep5Prompt: { question: "Guide a customer through fixing their device by phone.", questionEs: "Guía por teléfono a un cliente para arreglar su aparato." },
  rep5Tips: { en: "One step at a time. Always confirm.", es: "Un paso a la vez. Siempre confirma." },
  rep5Turns: [
    turn("a2d12-turn1", CUSTOMER, "Nothing works. The screen is black and I'm not a technical person.", "Nada funciona. La pantalla está negra y yo no soy una persona técnica.", "male", {
      targetSeconds: DEVELOP,
      cues: ["OPEN", "ONE STEP", "CHECK"],
      toolbox: ["Don't worry — we'll check this together.", "First, could you…?"],
    }),
    turn("a2d12-turn2", CUSTOMER, "Okay, I pressed it… nothing happened.", "Bueno, lo presioné… no pasó nada.", "male", { targetSeconds: DEVELOP }),
    turn("a2d12-turn3", CUSTOMER, "Oh wait, now there's a blue light. What now?", "Ah, espere, ahora hay una luz azul. ¿Y ahora?", "male", { targetSeconds: DEVELOP }),
    repairTurn("a2d12-repair", "catch", CUSTOMER, "Sorry, which button — the one under the cable or next to the screen?", "Perdón, ¿cuál botón — el que está debajo del cable o al lado de la pantalla?", "male"),
  ],
  speakerVoice: "female",
  testReady: d12Sprint,
});

const d13Sprint: TestReadySprint = {
  type: "speak-now",
  title: "SPEAK NOW",
  titleEs: "HABLA AHORA",
  instruction: "Ten seconds to think, then answer: RULE → REASON → ALTERNATIVE.",
  instructionEs: "Diez segundos para pensar y responde: REGLA → RAZÓN → ALTERNATIVA.",
  items: [
    { id: "a2d13-sn1", text: "The customer wants a refund after the refund period.", textEs: "El cliente quiere un reembolso después del plazo permitido.", thinkSeconds: 10, maxSeconds: 45 },
    { id: "a2d13-sn2", text: "The guest wants something the hotel policy does not allow.", textEs: "El huésped quiere algo que la política del hotel no permite.", thinkSeconds: 10, maxSeconds: 45 },
    { id: "a2d13-sn3", text: "The customer asks for a discount you cannot approve.", textEs: "El cliente pide un descuento que no puedes aprobar.", thinkSeconds: 10, maxSeconds: 45 },
  ],
};

const d13 = advanced2Day({
  day: 13,
  topic: "Explain a Policy",
  topicEs: "Explica una política",
  focus: "Say no professionally — RULE → REASON → ALTERNATIVE",
  focusEs: "Di que no profesionalmente — REGLA → RAZÓN → ALTERNATIVA",
  intro: {
    title: "EXPLAIN A POLICY",
    titleEs: "EXPLICA UNA POLÍTICA",
    lead: "Sometimes the answer is no. Say it clearly, explain why, and always offer an alternative.",
    leadEs: "A veces la respuesta es no. Dilo claro, explica por qué y siempre ofrece una alternativa.",
    examples: ["Unfortunately, we can't…", "The reason is…", "What we can do instead is…"],
    goal: "Say no without losing the customer.",
    goalEs: "Di que no sin perder al cliente.",
    cta: START,
  },
  lines: [
    l("a2d13-1", "I wish I could say yes, | but let me be honest with you.", "Ojalá pudiera decir que sí, pero permítame ser honesto/a con usted."),
    l("a2d13-2", "Unfortunately, we can't refund | after thirty days.", "Lamentablemente, no podemos reembolsar después de treinta días."),
    l("a2d13-3", "The reason is | the account closes automatically at that point.", "La razón es que la cuenta se cierra automáticamente en ese momento."),
    l("a2d13-4", "I know that's not | the answer you wanted.", "Sé que no es la respuesta que quería."),
    l("a2d13-5", "What we can do instead | is give you a credit for next month.", "Lo que sí podemos hacer es darle un crédito para el próximo mes."),
    l("a2d13-6", "Another possibility is | to pause the service for sixty days.", "Otra posibilidad es pausar el servicio por sesenta días."),
    l("a2d13-7", "If you want, | I can send this to my supervisor for review.", "Si quiere, puedo enviar esto a mi supervisor/a para revisión."),
    l("a2d13-8", "Either way, | you'll get an answer this week.", "De cualquier forma, tendrá una respuesta esta semana."),
  ],
  rep2Chunks: chunks4("a2d13"),
  prompts: [
    q("a2d13-p1", "Say the rule clearly.", "Di la regla con claridad.", "Unfortunately, we can't…", "Lamentablemente, no podemos…", "RULE"),
    q("a2d13-p2", "Explain the reason.", "Explica la razón.", "The reason is…", "La razón es…", "REASON", "explain"),
    q("a2d13-p3", "Offer an alternative.", "Ofrece una alternativa.", "What we can do instead is…", "Lo que sí podemos hacer es…", "ALTERNATIVE"),
    q("a2d13-p4", "The customer insists. Hold the policy kindly.", "El cliente insiste. Sostén la política con amabilidad.", "I understand, and the policy is…", "Le entiendo, y la política es…", "HOLD", "defend"),
    q("a2d13-p5", "Give a next step.", "Da un siguiente paso.", "Either way, you'll get…", "De cualquier forma, tendrá…", "NEXT"),
  ],
  cues: ["RULE", "REASON", "ALTERNATIVE", "NEXT"],
  powerChunks: { core: ["Unfortunately, we can't…", "What we can do instead is…"], stretch: "I know that's not the answer you wanted." },
  goalSeconds: [60, 80],
  goalSentences: 9,
  hideModelText: true,
  rep5Prompt: { question: "A customer asks for something the policy doesn't allow.", questionEs: "Un cliente pide algo que la política no permite." },
  rep5Tips: { en: "RULE → REASON → ALTERNATIVE. Never hide behind 'the system'.", es: "REGLA → RAZÓN → ALTERNATIVA. Nunca te escondas detrás del 'sistema'." },
  rep5Turns: [
    turn("a2d13-turn1", CUSTOMER, "I want a full refund. I stopped using it two months ago.", "Quiero un reembolso completo. Dejé de usarlo hace dos meses.", "female", {
      targetSeconds: DEVELOP,
      cues: ["RULE", "REASON", "ALTERNATIVE"],
      toolbox: ["Unfortunately, we can't…", "What we can do instead is…"],
    }),
    turn("a2d13-turn2", CUSTOMER, "That's not fair. I never used the service in those months.", "Eso no es justo. Nunca usé el servicio en esos meses.", "female", { targetSeconds: DEVELOP }),
    turn("a2d13-turn3", CUSTOMER, "Then let me speak to your manager.", "Entonces déjeme hablar con su supervisor.", "female", { targetSeconds: QUICK }),
    repairTurn("a2d13-repair", "time", CUSTOMER, "Why does the company have that rule in the first place?", "¿Por qué la empresa tiene esa regla, para empezar?", "female"),
  ],
  speakerVoice: "female",
  testReady: d13Sprint,
});

const d14Sprint: TestReadySprint = {
  type: "listen-respond",
  title: "LISTEN & RESPOND",
  titleEs: "ESCUCHA Y RESPONDE",
  instruction: "LISTEN → VALIDATE → FIX. Acknowledge the guest, then offer a solution.",
  instructionEs: "ESCUCHA → VALIDA → RESUELVE. Reconoce al huésped y ofrece una solución.",
  items: [
    { id: "a2d14-lr1", audio: "There was noise all night and I couldn't sleep.", maxSeconds: 20 },
    { id: "a2d14-lr2", audio: "Nobody answered the phone when I called reception.", maxSeconds: 20 },
    { id: "a2d14-lr3", audio: "The room is not what I paid for.", maxSeconds: 20 },
  ],
};

const d14 = advanced2Day({
  day: 14,
  topic: "Calm an Upset Guest",
  topicEs: "Calma a un huésped molesto",
  focus: "Face to face — LISTEN → VALIDATE → FIX",
  focusEs: "Cara a cara — ESCUCHA → VALIDA → RESUELVE",
  intro: {
    title: "CALM AN UPSET GUEST",
    titleEs: "CALMA A UN HUÉSPED MOLESTO",
    lead: "In person, tone matters more than words. Let them finish, validate, then fix.",
    leadEs: "En persona, el tono importa más que las palabras. Déjalos terminar, valida y luego resuelve.",
    examples: ["You're right to be upset.", "Let me fix this right now.", "Give me two minutes."],
    goal: "Turn a complaint into a solved problem.",
    goalEs: "Convierte una queja en un problema resuelto.",
    cta: START,
  },
  lines: [
    l("a2d14-1", "I'm listening. | Please tell me everything that happened.", "Le escucho. Por favor cuénteme todo lo que pasó."),
    l("a2d14-2", "You're right to be upset — | that shouldn't have happened.", "Tiene razón en estar molesto/a — eso no debió pasar."),
    l("a2d14-3", "Thank you for telling me | instead of just leaving.", "Gracias por decírmelo en lugar de simplemente irse."),
    l("a2d14-4", "Let me fix this right now, | before anything else.", "Déjeme resolver esto ahora mismo, antes que nada."),
    l("a2d14-5", "I'm moving you | to a quieter room on the fifth floor.", "Le voy a cambiar a una habitación más tranquila en el quinto piso."),
    l("a2d14-6", "Give me two minutes | and I'll have the new key ready.", "Deme dos minutos y tendré la nueva llave lista."),
    l("a2d14-7", "I've also added breakfast | for both of you tomorrow.", "También agregué el desayuno para los dos mañana."),
    l("a2d14-8", "Again, I'm sorry — | and thank you for your patience.", "De nuevo, lo lamento — y gracias por su paciencia."),
  ],
  rep2Chunks: chunks4("a2d14"),
  prompts: [
    q("a2d14-p1", "The guest is shouting. First words?", "El huésped está gritando. ¿Primeras palabras?", "I'm listening.", "Le escucho.", "LISTEN"),
    q("a2d14-p2", "Validate the feeling.", "Valida el sentimiento.", "You're right to be upset…", "Tiene razón en estar molesto/a…", "VALIDATE", "react"),
    q("a2d14-p3", "Offer the fix.", "Ofrece la solución.", "Let me fix this right now.", "Déjeme resolver esto ahora mismo.", "FIX"),
    q("a2d14-p4", "Add something extra.", "Agrega algo extra.", "I've also added…", "También agregué…", "RECOVER"),
    q("a2d14-p5", "Close the moment.", "Cierra el momento.", "Again, I'm sorry — and thank you…", "De nuevo, lo lamento — y gracias…", "CLOSE"),
  ],
  cues: ["LISTEN", "VALIDATE", "FIX", "RECOVER"],
  powerChunks: { core: ["You're right to be upset.", "Let me fix this right now."], stretch: "Thank you for telling me." },
  goalSeconds: [60, 80],
  goalSentences: 9,
  hideModelText: true,
  rep5Prompt: { question: "An upset guest complains loudly at the front desk.", questionEs: "Un huésped molesto se queja en voz alta en recepción." },
  rep5Tips: { en: "Let them finish. Validate before solving.", es: "Déjalos terminar. Valida antes de resolver." },
  rep5Turns: [
    turn("a2d14-turn1", GUEST, "This is unacceptable! There was noise all night and nobody answered the phone.", "¡Esto es inaceptable! Hubo ruido toda la noche y nadie contestó el teléfono.", "male", {
      targetSeconds: DEVELOP,
      cues: ["LISTEN", "VALIDATE", "FIX"],
      toolbox: ["I'm listening.", "You're right to be upset."],
    }),
    turn("a2d14-turn2", GUEST, "I paid a lot for this room. I want to speak to the manager.", "Pagué mucho por esta habitación. Quiero hablar con el gerente.", "male", { targetSeconds: DEVELOP }),
    turn("a2d14-turn3", GUEST, "Fine. But what are you going to do about last night?", "Está bien. ¿Pero qué van a hacer por lo de anoche?", "male", { targetSeconds: DEVELOP }),
    repairTurn("a2d14-repair", "restart", GUEST, "Sorry, say that again — which floor are you moving us to?", "Perdón, repítalo — ¿a qué piso nos va a cambiar?", "male"),
  ],
  speakerVoice: "female",
  testReady: d14Sprint,
});

const d15Sprint: TestReadySprint = {
  type: "mixed",
  title: "MIXED SPRINT",
  titleEs: "SPRINT MIXTO",
  instruction: "Virtual Assistant scheduling, mixed. Optional practice — never scored.",
  instructionEs: "Agenda de asistente virtual, mezclado. Práctica opcional — nunca se califica.",
  items: [
    { id: "a2d15-m1", kind: "quick-answers", audio: "Can you move my 3 PM meeting?", maxSeconds: 15 },
    { id: "a2d15-m2", kind: "listen-respond", audio: "David isn't available tomorrow.", maxSeconds: 20 },
    { id: "a2d15-m3", kind: "quick-answers", audio: "What other times are open?", maxSeconds: 15 },
    { id: "a2d15-m4", kind: "speak-now", text: "Explain a schedule conflict and propose two options.", textEs: "Explica un conflicto de agenda y propón dos opciones.", thinkSeconds: 10, maxSeconds: 45 },
    { id: "a2d15-m5", kind: "listen-respond", audio: "Okay, book Friday morning.", maxSeconds: 20 },
  ],
};

const d15 = advanced2Day({
  day: 15,
  topic: "Manage a Schedule Conflict",
  topicEs: "Maneja un conflicto de agenda",
  focus: "Virtual Assistant — NEED → CONFLICT → OPTIONS → CONFIRM",
  focusEs: "Asistente virtual — NECESIDAD → CONFLICTO → OPCIONES → CONFIRMA",
  intro: {
    title: "MANAGE A SCHEDULE CONFLICT",
    titleEs: "MANEJA UN CONFLICTO DE AGENDA",
    lead: "You work as a Virtual Assistant. Your manager wants a meeting moved — but there's a conflict. Say it early, bring options, confirm the final plan.",
    leadEs: "Trabajas como asistente virtual. Tu jefe/a quiere mover una reunión — pero hay un conflicto. Dilo desde el principio, trae opciones y confirma el plan final.",
    examples: ["Let me check both calendars first.", "There is one conflict I need to mention.", "Just to confirm, I'll move the meeting…"],
    goal: "Explain the conflict, propose options and confirm the final arrangement.",
    goalEs: "Explica el conflicto, propón opciones y confirma el arreglo final.",
    cta: START,
  },
  lines: [
    l("a2d15-1", "I can take care of that. | Let me check both calendars first.", "Yo me encargo de eso. Déjame revisar las dos agendas primero."),
    l("a2d15-2", "There is one conflict | I need to mention.", "Hay un conflicto que necesito mencionar."),
    l("a2d15-3", "David already has | another meeting at that time.", "David ya tiene otra reunión a esa hora."),
    l("a2d15-4", "I have two other options | available this week.", "Tengo otras dos opciones disponibles esta semana."),
    l("a2d15-5", "We could move it | to Thursday at two.", "Podríamos moverla al jueves a las dos."),
    l("a2d15-6", "Another possibility | is Friday morning.", "Otra posibilidad es el viernes por la mañana."),
    l("a2d15-7", "Whichever you prefer, | I'll update the calendar today.", "La que prefieras, actualizo el calendario hoy."),
    l("a2d15-8", "Just to confirm, | I'll move the meeting and send the updated invitation.", "Solo para confirmar, muevo la reunión y envío la invitación actualizada."),
  ],
  rep2Chunks: chunks4("a2d15"),
  prompts: [
    q("a2d15-p1", "Your manager asks you to move a meeting. Answer.", "Tu jefe/a te pide mover una reunión. Responde.", "I can take care of that…", "Yo me encargo de eso…", "NEED"),
    q("a2d15-p2", "Say the conflict clearly.", "Di el conflicto con claridad.", "There is one conflict I need to mention…", "Hay un conflicto que necesito mencionar…", "CONFLICT", "explain"),
    q("a2d15-p3", "Propose two options.", "Propón dos opciones.", "We could move it to… Another possibility is…", "Podríamos moverla a… Otra posibilidad es…", "OPTIONS"),
    q("a2d15-p4", "One option stops working. Adapt.", "Una opción deja de servir. Adáptate.", "In that case, what I can do is…", "En ese caso, lo que puedo hacer es…", "ADAPT", "react"),
    q("a2d15-p5", "Confirm the final arrangement.", "Confirma el arreglo final.", "Just to confirm, I'll…", "Solo para confirmar, voy a…", "CONFIRM"),
  ],
  cues: ["NEED", "CONFLICT", "OPTIONS", "CONFIRM"],
  powerChunks: { core: ["Let me check both calendars first.", "There is one conflict I need to mention."], stretch: "Just to confirm, I'll…" },
  goalSeconds: [60, 85],
  goalSentences: 9,
  hideModelText: true,
  rep5Prompt: {
    question: "You are a Virtual Assistant. Your manager wants a meeting moved, but there is a conflict.",
    questionEs: "Eres asistente virtual. Tu jefe/a quiere mover una reunión, pero hay un conflicto.",
  },
  rep5Tips: {
    en: "NEED → CONFLICT → OPTIONS → CONFIRM. Say the conflict early, then bring options.",
    es: "NECESIDAD → CONFLICTO → OPCIONES → CONFIRMA. Di el conflicto pronto y trae opciones.",
  },
  rep5Turns: [
    situationTurn("a2d15-rec1", MANAGER, "Move my meeting with David to tomorrow afternoon.", "Mueve mi reunión con David para mañana por la tarde.", "male", ALL_NEEDS, "solve", {
      round: { n: 1, ...SITUATION_ROUND },
      cues: ["NEED", "CONFLICT"],
      toolbox: ["I can take care of that.", "Let me check both calendars first."],
    }),
    turn("a2d15-turn2", MANAGER, "Actually, David isn't available tomorrow.", "De hecho, David no está disponible mañana.", "male", { targetSeconds: DEVELOP }),
    turn("a2d15-turn3", MANAGER, "Thursday doesn't work for me either. What else do we have?", "El jueves tampoco me sirve. ¿Qué más tenemos?", "male", { targetSeconds: DEVELOP }),
    turn("a2d15-turn4", MANAGER, "Okay, book Friday morning and send everyone the new invitation.", "Bien, agenda el viernes por la mañana y envía a todos la nueva invitación.", "male", { targetSeconds: QUICK }),
    repairTurn("a2d15-repair", "confirm", MANAGER, "Sorry, did you say Friday at nine fifteen or nine fifty?", "Perdón, ¿dijiste el viernes a las nueve y cuarto o a las diez menos diez?", "male"),
  ],
  speakerVoice: "female",
  testReady: d15Sprint,
});

/* ================================ WEEK 4 — PERFORM ON THE JOB ================================ */
/* Support is minimal: cues only on switch / unexpected turns, tiny toolboxes. */

const d16Sprint: TestReadySprint = {
  type: "story-retell",
  title: "RETELL THE INCIDENT",
  titleEs: "VUELVE A CONTAR EL INCIDENTE",
  instruction: "Retell the incident in order: WHAT HAPPENED → ACTION → RESULT.",
  instructionEs: "Vuelve a contarlo en orden: QUÉ PASÓ → ACCIÓN → RESULTADO.",
  items: [
    { id: "a2d16-sr1", text: "A customer was charged twice. You checked the system, cancelled the second charge and refunded it the same day.", textEs: "A un cliente le cobraron dos veces. Revisaste el sistema, cancelaste el segundo cargo y lo reembolsaste el mismo día.", maxSeconds: 60 },
    { id: "a2d16-sr2", text: "The system was down for two hours. You took notes by hand, called the customers back and closed every case.", textEs: "El sistema se cayó dos horas. Tomaste notas a mano, devolviste las llamadas y cerraste todos los casos.", maxSeconds: 60 },
  ],
};

const d16 = advanced2Day({
  day: 16,
  topic: "Report a Past Incident",
  topicEs: "Reporta un incidente pasado",
  focus: "Past narration — WHAT HAPPENED → WHAT I DID → RESULT",
  focusEs: "Narración en pasado — QUÉ PASÓ → QUÉ HICE → RESULTADO",
  intro: {
    title: "REPORT A PAST INCIDENT",
    titleEs: "REPORTA UN INCIDENTE PASADO",
    lead: "Your supervisor asks what happened yesterday. Tell it in order, with facts.",
    leadEs: "Tu supervisor/a pregunta qué pasó ayer. Cuéntalo en orden, con hechos.",
    examples: ["What happened was…", "So I decided to…", "In the end…"],
    goal: "Report clearly in the past and take responsibility.",
    goalEs: "Reporta con claridad en pasado y asume responsabilidad.",
    cta: START,
  },
  lines: [
    l("a2d16-1", "Yesterday afternoon | a customer called about a double charge.", "Ayer por la tarde un cliente llamó por un cobro doble."),
    l("a2d16-2", "What happened was | the system processed the payment twice.", "Lo que pasó fue que el sistema procesó el pago dos veces."),
    l("a2d16-3", "I checked the account | and confirmed both transactions.", "Revisé la cuenta y confirmé las dos transacciones."),
    l("a2d16-4", "At first | I couldn't find the second one.", "Al principio no pude encontrar la segunda."),
    l("a2d16-5", "So I decided to | escalate it to the billing team.", "Entonces decidí escalarlo al equipo de facturación."),
    l("a2d16-6", "They confirmed the error | in about ten minutes.", "Ellos confirmaron el error en unos diez minutos."),
    l("a2d16-7", "In the end, | we refunded the customer the same day.", "Al final, le reembolsamos al cliente el mismo día."),
    l("a2d16-8", "Next time | I'll check the transaction log first.", "La próxima vez revisaré primero el registro de transacciones."),
  ],
  rep2Chunks: chunks4("a2d16"),
  prompts: [
    q("a2d16-p1", "Say what happened, in the past.", "Di qué pasó, en pasado.", "What happened was…", "Lo que pasó fue…", "WHAT"),
    q("a2d16-p2", "Say what you did.", "Di qué hiciste.", "So I decided to…", "Entonces decidí…", "ACTION"),
    q("a2d16-p3", "Say the result.", "Di el resultado.", "In the end…", "Al final…", "RESULT"),
    q("a2d16-p4", "Your supervisor asks why it took so long. Explain.", "Tu supervisor/a pregunta por qué tardó tanto. Explica.", "It took time because…", "Tardó porque…", "EXPLAIN", "justify"),
    q("a2d16-p5", "What will you do differently?", "¿Qué harás diferente?", "Next time I'll…", "La próxima vez…", "LEARN"),
  ],
  cues: ["WHAT", "ACTION", "RESULT", "LEARN"],
  powerChunks: { core: ["What happened was…", "So I decided to…"], stretch: "Next time I'll…" },
  goalSeconds: [65, 85],
  goalSentences: 10,
  hideModelText: true,
  rep5Prompt: { question: "Report yesterday's incident to your supervisor.", questionEs: "Reporta el incidente de ayer a tu supervisor/a." },
  rep5Tips: { en: "Order matters: what happened, what you did, the result.", es: "El orden importa: qué pasó, qué hiciste, el resultado." },
  rep5Turns: [
    turn("a2d16-turn1", MANAGER, "Tell me exactly what happened with that customer yesterday.", "Dime exactamente qué pasó con ese cliente ayer.", "male", { targetSeconds: SUSTAIN }),
    turn("a2d16-turn2", MANAGER, "Why did it take almost an hour to solve?", "¿Por qué tardó casi una hora en resolverse?", "male", { targetSeconds: DEVELOP }),
    turn("a2d16-turn3", MANAGER, "And what would you do differently next time?", "¿Y qué harías diferente la próxima vez?", "male", {
      targetSeconds: DEVELOP,
      cues: ["LEARN"],
    }),
    repairTurn("a2d16-repair", "confirm", MANAGER, "So the refund went out the same day, correct?", "¿Entonces el reembolso salió el mismo día, correcto?", "male"),
  ],
  speakerVoice: "female",
  testReady: d16Sprint,
});

const d17Sprint: TestReadySprint = {
  type: "speak-now",
  title: "SPEAK NOW",
  titleEs: "HABLA AHORA",
  instruction: "Ten seconds to think, then speak: BEFORE → PROGRESS → NOW → NEXT.",
  instructionEs: "Diez segundos para pensar y habla: ANTES → PROGRESO → AHORA → SIGUIENTE.",
  items: [
    { id: "a2d17-sn1", text: "Tell your supervisor how you have improved since you started.", textEs: "Cuéntale a tu supervisor/a cómo has mejorado desde que empezaste.", chunks: ["BEFORE", "PROGRESS", "NOW", "NEXT"], thinkSeconds: 10, maxSeconds: 60 },
    { id: "a2d17-sn2", text: "Say one thing that is still difficult and what you are doing about it.", textEs: "Di algo que todavía es difícil y qué estás haciendo al respecto.", thinkSeconds: 10, maxSeconds: 45 },
    { id: "a2d17-sn3", text: "Say your goal for next month.", textEs: "Di tu meta para el próximo mes.", thinkSeconds: 10, maxSeconds: 45 },
  ],
};

const d17 = advanced2Day({
  day: 17,
  topic: "Talk About Your Progress",
  topicEs: "Habla de tu progreso",
  focus: "One-to-one — RESULTS → CHALLENGE → GOAL",
  focusEs: "Uno a uno — RESULTADOS → RETO → META",
  intro: {
    title: "TALK ABOUT YOUR PROGRESS",
    titleEs: "HABLA DE TU PROGRESO",
    lead: "In a one-to-one, talk about results, one real challenge, and your next goal.",
    leadEs: "En un uno a uno, habla de resultados, un reto real y tu próxima meta.",
    examples: ["This month I've been working on…", "The hardest part is…", "My goal for next month is…"],
    goal: "Speak about yourself professionally for over a minute.",
    goalEs: "Habla de ti profesionalmente por más de un minuto.",
    cta: START,
  },
  lines: [
    l("a2d17-1", "This month I've been working on | my call handling time.", "Este mes he estado trabajando en mi tiempo de llamada."),
    l("a2d17-2", "My average went down | from nine minutes to seven.", "Mi promedio bajó de nueve minutos a siete."),
    l("a2d17-3", "I've also received | good feedback from two customers.", "También recibí buenos comentarios de dos clientes."),
    l("a2d17-4", "The hardest part for me | is handling angry customers in English.", "La parte más difícil para mí es manejar clientes molestos en inglés."),
    l("a2d17-5", "When that happens, | I sometimes speak too fast.", "Cuando eso pasa, a veces hablo demasiado rápido."),
    l("a2d17-6", "What's helping me | is practicing every day before my shift.", "Lo que me está ayudando es practicar todos los días antes de mi turno."),
    l("a2d17-7", "My goal for next month | is to handle escalations alone.", "Mi meta para el próximo mes es manejar escalaciones yo solo/a."),
    l("a2d17-8", "I'd also like | more feedback on my calls.", "También me gustaría más retroalimentación sobre mis llamadas."),
  ],
  rep2Chunks: chunks4("a2d17"),
  prompts: [
    q("a2d17-p1", "Give one concrete result.", "Da un resultado concreto.", "This month I've been working on…", "Este mes he estado trabajando en…", "RESULTS"),
    q("a2d17-p2", "Name one real challenge.", "Nombra un reto real.", "The hardest part for me is…", "La parte más difícil para mí es…", "CHALLENGE", "explain"),
    q("a2d17-p3", "Say what is helping you.", "Di qué te está ayudando.", "What's helping me is…", "Lo que me está ayudando es…", "ACTION"),
    q("a2d17-p4", "Your manager questions your numbers. Respond.", "Tu jefe/a cuestiona tus números. Responde.", "That's fair. The data I have shows…", "Es justo. Los datos que tengo muestran…", "DEFEND", "defend"),
    q("a2d17-p5", "State your goal.", "Di tu meta.", "My goal for next month is…", "Mi meta para el próximo mes es…", "GOAL"),
  ],
  cues: ["RESULTS", "CHALLENGE", "ACTION", "GOAL"],
  powerChunks: { core: ["This month I've been working on…", "The hardest part is…"], stretch: "My goal for next month is…" },
  goalSeconds: [65, 90],
  goalSentences: 10,
  hideModelText: true,
  rep5Prompt: { question: "Your manager asks how your month has been. Answer.", questionEs: "Tu jefe/a pregunta cómo ha estado tu mes. Responde." },
  rep5Tips: { en: "Results, one honest challenge, one clear goal.", es: "Resultados, un reto honesto, una meta clara." },
  rep5Turns: [
    turn("a2d17-turn1", MANAGER, "So, how has this month been for you?", "Entonces, ¿cómo ha estado este mes para ti?", "female", { targetSeconds: SUSTAIN }),
    turn("a2d17-turn2", MANAGER, "Your numbers look good, but two customers escalated. What happened there?", "Tus números se ven bien, pero dos clientes escalaron. ¿Qué pasó ahí?", "female", {
      targetSeconds: DEVELOP,
      cues: ["OWN IT", "ACTION"],
    }),
    turn("a2d17-turn3", MANAGER, "What do you want to be doing here in six months?", "¿Qué quieres estar haciendo aquí en seis meses?", "female", { targetSeconds: DEVELOP }),
    repairTurn("a2d17-repair", "time", MANAGER, "And what support do you need from me to get there?", "¿Y qué apoyo necesitas de mí para lograrlo?", "female"),
  ],
  speakerVoice: "female",
  testReady: d17Sprint,
});

const d18Sprint: TestReadySprint = {
  type: "story-retell",
  title: "RETELL THE PROCESS",
  titleEs: "VUELVE A CONTAR EL PROCESO",
  instruction: "Retell the process in order, in your own words.",
  instructionEs: "Vuelve a contar el proceso en orden, con tus palabras.",
  items: [
    { id: "a2d18-sr1", text: "Opening a customer case: verify, document, escalate, follow up.", textEs: "Abrir un caso: verificar, documentar, escalar, dar seguimiento.", maxSeconds: 60 },
    { id: "a2d18-sr2", text: "Onboarding a new client: welcome, collect data, set up, confirm.", textEs: "Dar de alta a un cliente: bienvenida, datos, configuración, confirmación.", maxSeconds: 60 },
  ],
};

const d18 = advanced2Day({
  day: 18,
  topic: "Give Clear Instructions",
  topicEs: "Da instrucciones claras",
  focus: "Train a teammate — STEP 1 → STEP 2 → CHECK",
  focusEs: "Entrena a un compañero — PASO 1 → PASO 2 → VERIFICA",
  intro: {
    title: "GIVE CLEAR INSTRUCTIONS",
    titleEs: "DA INSTRUCCIONES CLARAS",
    lead: "A new teammate needs your help. Explain the process in order and check understanding.",
    leadEs: "Un compañero nuevo necesita tu ayuda. Explica el proceso en orden y verifica que entendió.",
    examples: ["The first thing you do is…", "After that…", "Does that make sense so far?"],
    goal: "Teach a process out loud, clearly.",
    goalEs: "Enseña un proceso en voz alta, con claridad.",
    cta: START,
  },
  lines: [
    l("a2d18-1", "I'll walk you through it | one step at a time.", "Te lo explico paso a paso."),
    l("a2d18-2", "The first thing you do | is verify the customer's identity.", "Lo primero que haces es verificar la identidad del cliente."),
    l("a2d18-3", "After that, | you open a case in the system.", "Después de eso, abres un caso en el sistema."),
    l("a2d18-4", "Make sure you write | what the customer actually said.", "Asegúrate de escribir lo que el cliente realmente dijo."),
    l("a2d18-5", "The most common mistake | is closing the case too early.", "El error más común es cerrar el caso demasiado pronto."),
    l("a2d18-6", "If you're not sure, | ask before you escalate.", "Si no estás seguro, pregunta antes de escalar."),
    l("a2d18-7", "Finally, | you send the confirmation email.", "Finalmente, envías el correo de confirmación."),
    l("a2d18-8", "Does that make sense so far? | Tell me the steps back to me.", "¿Tiene sentido hasta aquí? Dime los pasos de regreso."),
  ],
  rep2Chunks: chunks4("a2d18"),
  prompts: [
    q("a2d18-p1", "Start the explanation.", "Empieza la explicación.", "I'll walk you through it…", "Te lo explico…", "OPEN"),
    q("a2d18-p2", "Give steps one and two.", "Da los pasos uno y dos.", "The first thing you do is… After that…", "Lo primero que haces es… Después…", "STEPS"),
    q("a2d18-p3", "Warn about the common mistake.", "Advierte sobre el error común.", "The most common mistake is…", "El error más común es…", "WARN", "explain"),
    q("a2d18-p4", "Your teammate asks a question you didn't expect. React.", "Tu compañero hace una pregunta inesperada. Reacciona.", "Good question — in that case…", "Buena pregunta — en ese caso…", "ADAPT", "react"),
    q("a2d18-p5", "Check understanding.", "Verifica que entendió.", "Does that make sense so far?", "¿Tiene sentido hasta aquí?", "CHECK"),
  ],
  cues: ["OPEN", "STEPS", "WARN", "CHECK"],
  powerChunks: { core: ["The first thing you do is…", "After that…"], stretch: "Does that make sense so far?" },
  goalSeconds: [65, 90],
  goalSentences: 10,
  hideModelText: true,
  rep5Prompt: { question: "Teach a new teammate how to open and handle a case.", questionEs: "Enseña a un compañero nuevo a abrir y manejar un caso." },
  rep5Tips: { en: "Order, warning, check. Don't say everything at once.", es: "Orden, advertencia, verificación. No digas todo de golpe." },
  rep5Turns: [
    turn("a2d18-turn1", MANAGER, "Can you explain the case process to me? I started yesterday.", "¿Me puedes explicar el proceso de casos? Empecé ayer.", "male", { targetSeconds: SUSTAIN }),
    turn("a2d18-turn2", MANAGER, "And what if the customer refuses to give their ID number?", "¿Y si el cliente se niega a dar su número de identificación?", "male", {
      targetSeconds: DEVELOP,
      cues: ["ADAPT"],
    }),
    turn("a2d18-turn3", MANAGER, "Okay… so do I close the case or leave it open?", "Bueno… ¿entonces cierro el caso o lo dejo abierto?", "male", { targetSeconds: DEVELOP }),
    repairTurn("a2d18-repair", "catch", MANAGER, "Sorry, what was the step right after verifying the identity?", "Perdón, ¿cuál era el paso justo después de verificar la identidad?", "male"),
  ],
  speakerVoice: "female",
  testReady: d18Sprint,
});

const d19Sprint: TestReadySprint = {
  type: "speak-now",
  title: "SPEAK NOW",
  titleEs: "HABLA AHORA",
  instruction: "Ten seconds to think: WHAT WENT WRONG → WHY → WHAT I WOULD DO NEXT.",
  instructionEs: "Diez segundos para pensar: QUÉ SALIÓ MAL → POR QUÉ → QUÉ HARÍA DESPUÉS.",
  items: [
    { id: "a2d19-sn1", text: "You interrupted an angry customer and the call ended badly. Explain it to your supervisor.", textEs: "Interrumpiste a un cliente molesto y la llamada terminó mal. Explícaselo a tu supervisor/a.", thinkSeconds: 10, maxSeconds: 60 },
    { id: "a2d19-sn2", text: "You gave a customer information you were not sure about. Explain what you would do next time.", textEs: "Le diste a un cliente información de la que no estabas seguro/a. Explica qué harías la próxima vez.", thinkSeconds: 10, maxSeconds: 60 },
    { id: "a2d19-sn3", text: "You promised a call back and forgot. Explain and commit to a change.", textEs: "Prometiste devolver una llamada y lo olvidaste. Explica y comprométete a un cambio.", thinkSeconds: 10, maxSeconds: 45 },
  ],
};

const d19 = advanced2Day({
  day: 19,
  topic: "After a Bad Call",
  topicEs: "Después de una mala llamada",
  focus: "Own it — WHAT WENT WRONG → WHY → FIX",
  focusEs: "Hazte cargo — QUÉ SALIÓ MAL → POR QUÉ → SOLUCIÓN",
  intro: {
    title: "AFTER A BAD CALL",
    titleEs: "DESPUÉS DE UNA MALA LLAMADA",
    lead: "The call went badly and your supervisor listened to it. Own it, explain, and fix it.",
    leadEs: "La llamada salió mal y tu supervisor/a la escuchó. Hazte cargo, explica y arregla.",
    examples: ["You're right, I lost control of that call.", "What I should have done is…", "From now on…"],
    goal: "Handle feedback without excuses and without panic.",
    goalEs: "Maneja la retroalimentación sin excusas y sin pánico.",
    cta: START,
  },
  lines: [
    l("a2d19-1", "You're right — | I lost control of that call.", "Tiene razón — perdí el control de esa llamada."),
    l("a2d19-2", "The customer was shouting | and I started defending myself.", "El cliente estaba gritando y yo empecé a defenderme."),
    l("a2d19-3", "I didn't listen enough | before I answered.", "No escuché lo suficiente antes de responder."),
    l("a2d19-4", "What I should have done | is let him finish first.", "Lo que debí hacer fue dejarlo terminar primero."),
    l("a2d19-5", "I also gave him information | I wasn't sure about.", "También le di información de la que no estaba seguro/a."),
    l("a2d19-6", "I called him back | this morning and apologized.", "Le devolví la llamada esta mañana y me disculpé."),
    l("a2d19-7", "From now on, | I'll take five seconds before I respond.", "De ahora en adelante, tomaré cinco segundos antes de responder."),
    l("a2d19-8", "If it happens again, | I'll ask for support in the chat.", "Si vuelve a pasar, pediré apoyo en el chat."),
  ],
  rep2Chunks: chunks4("a2d19"),
  prompts: [
    q("a2d19-p1", "Own the mistake in one sentence.", "Asume el error en una oración.", "You're right — I…", "Tiene razón — yo…", "OWN IT"),
    q("a2d19-p2", "Explain what happened without excuses.", "Explica qué pasó sin excusas.", "What happened was…", "Lo que pasó fue…", "EXPLAIN", "explain"),
    q("a2d19-p3", "Say what you should have done.", "Di qué debiste hacer.", "What I should have done is…", "Lo que debí hacer fue…", "REFLECT"),
    q("a2d19-p4", "Your supervisor pushes harder. Stay professional.", "Tu supervisor/a insiste más fuerte. Mantente profesional.", "I understand. Here's my plan:…", "Le entiendo. Este es mi plan:…", "STAY CALM", "defend"),
    q("a2d19-p5", "Commit to a change.", "Comprométete a un cambio.", "From now on…", "De ahora en adelante…", "COMMIT"),
  ],
  cues: ["OWN IT", "EXPLAIN", "REFLECT", "COMMIT"],
  powerChunks: { core: ["You're right — I…", "What I should have done is…"], stretch: "From now on…" },
  goalSeconds: [65, 90],
  goalSentences: 10,
  hideModelText: true,
  rep5Prompt: { question: "Your supervisor reviews a call that went badly.", questionEs: "Tu supervisor/a revisa una llamada que salió mal." },
  rep5Tips: { en: "Own it fast, explain once, commit to a change.", es: "Hazte cargo rápido, explica una vez, comprométete a un cambio." },
  rep5Turns: [
    turn("a2d19-turn1", MANAGER, "I listened to your call from Tuesday. What happened there?", "Escuché tu llamada del martes. ¿Qué pasó ahí?", "female", { targetSeconds: SUSTAIN }),
    turn("a2d19-turn2", MANAGER, "You also gave the customer wrong information. That's serious.", "También le diste información equivocada al cliente. Eso es serio.", "female", {
      targetSeconds: DEVELOP,
      cues: ["OWN IT", "FIX"],
    }),
    turn("a2d19-turn3", MANAGER, "How do I know this won't happen again next week?", "¿Cómo sé que esto no volverá a pasar la próxima semana?", "female", { targetSeconds: DEVELOP }),
    repairTurn("a2d19-repair", "restart", MANAGER, "Say your plan again — clearly, in two steps.", "Dime tu plan otra vez — claro, en dos pasos.", "female"),
  ],
  speakerVoice: "female",
  testReady: d19Sprint,
});

const d20Sprint: TestReadySprint = {
  type: "mixed",
  title: "REAL SHIFT SPRINT",
  titleEs: "SPRINT DE TURNO REAL",
  instruction: "All four work situations, mixed. Optional practice — never scored.",
  instructionEs: "Las cuatro situaciones de trabajo, mezcladas. Práctica opcional — nunca se califica.",
  items: [
    { id: "a2d20-m1", kind: "repeat", audio: "Let me check what happened and explain the next step.", maxSeconds: 12 },
    { id: "a2d20-m2", kind: "listen-respond", audio: "I already restarted the router and it still doesn't work.", maxSeconds: 20 },
    { id: "a2d20-m3", kind: "quick-answers", audio: "Your competitor is cheaper.", maxSeconds: 15 },
    { id: "a2d20-m4", kind: "speak-now", text: "Your manager has two meetings at the same time. Explain the conflict and propose another time.", textEs: "Tu jefe/a tiene dos reuniones a la misma hora. Explica el conflicto y propón otro horario.", thinkSeconds: 10, maxSeconds: 60 },
    { id: "a2d20-m5", kind: "listen-respond", audio: "I've already called twice and nobody solved this.", maxSeconds: 20 },
  ],
};

const d20 = advanced2Day({
  day: 20,
  topic: "The Real Shift",
  topicEs: "El turno real",
  focus: "Final challenge — read the situation and handle it",
  focusEs: "Reto final — lee la situación y resuélvela",
  intro: {
    title: "THE REAL SHIFT",
    titleEs: "EL TURNO REAL",
    lead: "Today there is no single framework. Read each situation, choose the right move, and do the job.",
    leadEs: "Hoy no hay una sola estructura. Lee cada situación, elige el movimiento correcto y haz el trabajo.",
    examples: ["Let me check that for you.", "Here's what I'm going to do.", "Just to confirm…"],
    goal: "Handle four different situations in one shift.",
    goalEs: "Maneja cuatro situaciones diferentes en un turno.",
    cta: START,
  },
  lines: [
    l("a2d20-1", "Thanks for calling — | I'll take care of this with you.", "Gracias por llamar — voy a encargarme de esto con usted."),
    l("a2d20-2", "Let me check that for you | before I say anything else.", "Déjeme revisarlo antes de decir cualquier otra cosa."),
    l("a2d20-3", "Just to confirm, | the problem started on Monday.", "Solo para confirmar, el problema empezó el lunes."),
    l("a2d20-4", "I'm sorry this took so long — | that's on us.", "Lamento que esto haya tardado tanto — eso es responsabilidad nuestra."),
    l("a2d20-5", "Here's what I'm going to do | in the next ten minutes.", "Esto es lo que voy a hacer en los próximos diez minutos."),
    l("a2d20-6", "Another option, if you prefer, | is to keep the service and pause the billing.", "Otra opción, si prefiere, es mantener el servicio y pausar el cobro."),
    l("a2d20-7", "Whatever you decide, | I'll send you the confirmation today.", "Decida lo que decida, le envío la confirmación hoy."),
    l("a2d20-8", "Thank you for your patience — | you'll hear from me before five.", "Gracias por su paciencia — sabrá de mí antes de las cinco."),
  ],
  rep2Chunks: chunks4("a2d20"),
  prompts: [
    q("a2d20-p1", "A confused customer calls. Open the call.", "Un cliente confundido llama. Abre la llamada.", "Thanks for calling — I'll take care of this…", "Gracias por llamar — voy a encargarme…", "OPEN"),
    q("a2d20-p2", "A customer wants to cancel. React.", "Un cliente quiere cancelar. Reacciona.", "Before you decide, can I ask…?", "Antes de decidir, ¿puedo preguntarle…?", "RECOVER", "react"),
    q("a2d20-p3", "A customer is angry about a delay. Respond.", "Un cliente está molesto por un retraso. Responde.", "I'm sorry this took so long — that's on us.", "Lamento que haya tardado tanto — es responsabilidad nuestra.", "OWN IT"),
    q("a2d20-p4", "A customer asks for something you can't give. Answer.", "Un cliente pide algo que no puedes dar. Responde.", "Unfortunately… What we can do instead is…", "Lamentablemente… Lo que sí podemos hacer es…", "BOUNDARY", "defend"),
    q("a2d20-p5", "Close any call professionally.", "Cierra cualquier llamada profesionalmente.", "Whatever you decide, I'll…", "Decida lo que decida, yo…", "CLOSE"),
  ],
  cues: ["READ IT", "ACT", "CONFIRM", "CLOSE"],
  powerChunks: { core: ["Here's what I'm going to do.", "Just to confirm…"], stretch: "Whatever you decide, I'll…" },
  goalSeconds: [70, 95],
  goalSentences: 11,
  hideModelText: true,
  rep5Prompt: { question: "One shift. Four situations. Handle them all.", questionEs: "Un turno. Cuatro situaciones. Maneja todas." },
  rep5Tips: { en: "No framework is given. Choose the one the situation needs.", es: "No se te da estructura. Elige la que la situación necesita." },
  rep5Turns: [
    /* ROUND 1 — CUSTOMER SERVICE. Recognition before the scenario, then speak. */
    situationTurn("a2d20-rec1", CUSTOMER, "I've been charged twice for the same service.", "Me cobraron dos veces por el mismo servicio.", "male", ALL_NEEDS, "solve", {
      round: { n: 1, ...SITUATION_ROUND },
      targetSeconds: DEVELOP,
      cues: ["ACKNOWLEDGE", "CHECK", "SOLUTION", "CONFIRM"],
    }),
    turn("a2d20-turn2", CUSTOMER, "I already called yesterday and nobody helped me.", "Ya llamé ayer y nadie me ayudó.", "male", { targetSeconds: DEVELOP }),
    /* ROUND 2 — TECH SUPPORT. No recognition: the switch itself is the challenge. */
    turn("a2d20-turn3", CUSTOMER, "Hi, my internet stopped working this morning.", "Hola, mi internet dejó de funcionar esta mañana.", "female", {
      round: { n: 2, ...SITUATION_ROUND },
      targetSeconds: DEVELOP,
    }),
    turn("a2d20-turn4", CUSTOMER, "I already restarted the router. It still doesn't work.", "Ya reinicié el router. Sigue sin funcionar.", "female", { targetSeconds: DEVELOP }),
    /* ROUND 3 — SALES. */
    situationTurn("a2d20-rec2", CUSTOMER, "Your package sounds good, but your competitor is cheaper.", "Su paquete suena bien, pero su competencia es más barata.", "female", ALL_NEEDS, "recommend", {
      round: { n: 3, ...SITUATION_ROUND },
      targetSeconds: DEVELOP,
    }),
    turn("a2d20-turn6", CUSTOMER, "So why should I pay more for yours?", "¿Entonces por qué debería pagar más por el suyo?", "female", { targetSeconds: DEVELOP }),
    /* ROUND 4 — VIRTUAL ASSISTANT. */
    situationTurn("a2d20-rec3", MANAGER, "Move my meeting with David to tomorrow afternoon.", "Mueve mi reunión con David para mañana por la tarde.", "male", ALL_NEEDS, "solve", {
      round: { n: 4, ...SITUATION_ROUND },
      targetSeconds: DEVELOP,
    }),
    turn("a2d20-turn8", MANAGER, "Actually, David isn't available tomorrow.", "De hecho, David no está disponible mañana.", "male", { targetSeconds: QUICK }),
    turn("a2d20-turn9", MANAGER, "Thursday doesn't work for me either.", "El jueves tampoco me sirve.", "male", { targetSeconds: DEVELOP }),
    /* Exactly ONE deliberate repair moment for the whole day. */
    repairTurn("a2d20-repair", "confirm", MANAGER, "Sorry, did you say the meeting is at nine fifteen or nine fifty?", "Perdón, ¿dijiste que la reunión es a las nueve y cuarto o a las diez menos diez?", "male"),
  ],
  speakerVoice: "female",
  testReady: d20Sprint,
});

export const ADVANCED_2_WEEKS_2_4_DAYS: CourseDay[] = [d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20];
