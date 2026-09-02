/**
 * SHARKS — WEEKS 2–4 (Days 6–20)
 *
 * WEEK 2 · CLARIFY, PARAPHRASE & RECOVER      — SUPPORT (Customer Service)
 * WEEK 3 · ARGUE, PERSUADE & CHANGE YOUR MIND — PERSUADE (Sales / Debate)
 * WEEK 4 · LEAD, ADAPT & IMPROVISE            — IMPROVISE (SHARKS FINAL)
 *
 * Same module id ("sharks") and 5-Rep engine as Week 1. Ids use `s6-*`…
 * `s20-*`. Every interlocutor turn is FIXED and prewritten — no generative
 * AI. Day 20 picks ONE scenario from a small prewritten bank.
 */
import type { CourseDay } from "@/lib/types";
import { l } from "./eagles-week-1-course";
import { chunks4, q, sharksDay } from "./sharks-week-1-course";

import sceneD6 from "@/assets/sharks/scene-d06.jpg";
import sceneD7 from "@/assets/sharks/scene-d07.jpg";
import sceneD8 from "@/assets/sharks/scene-d08.jpg";
import sceneD9 from "@/assets/sharks/scene-d09.jpg";
import sceneD10 from "@/assets/sharks/scene-d10.jpg";
import sceneD11 from "@/assets/sharks/scene-d11.jpg";
import sceneD12 from "@/assets/sharks/scene-d12.jpg";
import sceneD13 from "@/assets/sharks/scene-d13.jpg";
import sceneD14 from "@/assets/sharks/scene-d14.jpg";
import sceneD15 from "@/assets/sharks/scene-d15.jpg";
import sceneD16 from "@/assets/sharks/scene-d16.jpg";
import sceneD17 from "@/assets/sharks/scene-d17.jpg";
import sceneD18 from "@/assets/sharks/scene-d18.jpg";
import sceneD19 from "@/assets/sharks/scene-d19.jpg";
import sceneD20 from "@/assets/sharks/scene-d20.jpg";

const START = "START REP 1";

/* ====================================================================== */
/* WEEK 2 — CLARIFY, PARAPHRASE & RECOVER                                    */
/* ====================================================================== */

/* ---------------------------- DAY 6 — LIFE IN THE BIG CITY ---------------------------- */

const d6 = sharksDay({
  day: 6,
  topic: "Life in the Big City",
  topicEs: "La vida en la gran ciudad",
  focus: "Past progressive + present progressive — compare life then and now, and respond to another opinion",
  focusEs: "Pasado progresivo + presente progresivo — compara tu vida antes y ahora, y responde a otra opinión",
  intro: {
    title: "LIFE IN THE BIG CITY",
    titleEs: "LA VIDA EN LA GRAN CIUDAD",
    lead: "Before moving to the city vs life now. Don't just describe both — say what's been hard, what you enjoy more, and which lifestyle is better for you.",
    leadEs: "Antes de mudarte a la ciudad vs la vida ahora. No solo describas las dos: di qué ha sido difícil, qué disfrutas más y qué estilo de vida es mejor para ti.",
    examples: ["When I first moved here, I was living alone and feeling lost.", "Right now, I'm adapting to a faster pace.", "One thing that's different is how much I move around."],
    goal: "Speak for 75–90 seconds. Compare then and now, then respond to a different opinion.",
    goalEs: "Habla 75–90 segundos. Compara antes y ahora, luego responde a una opinión diferente.",
    cta: START,
  },
  lines: [
    l("s6-1", "When I first moved to the city, | I was living with a roommate | and I was missing my hometown a lot.", "Cuando me mudé por primera vez a la ciudad, vivía con un compañero de cuarto y extrañaba mucho mi pueblo."),
    l("s6-2", "I was working long hours, | and I wasn't really enjoying it.", "Trabajaba muchas horas y en realidad no lo disfrutaba."),
    l("s6-3", "Right now, | I'm living on my own | and I'm managing my time much better.", "Ahora mismo vivo sola y manejo mi tiempo mucho mejor."),
    l("s6-4", "I'm also meeting more people | because I'm going out more often.", "También conozco a más gente porque salgo con más frecuencia."),
    l("s6-5", "One thing that's different is | the pace: | everything here moves faster.", "Una cosa que es diferente es el ritmo: aquí todo se mueve más rápido."),
    l("s6-6", "What has been difficult is | the traffic and the noise.", "Lo que ha sido difícil es el tráfico y el ruido."),
    l("s6-7", "What I enjoy more is | having so many options nearby.", "Lo que disfruto más es tener tantas opciones cerca."),
    l("s6-8", "Overall, | this lifestyle fits me better | than the one I had before.", "En general, este estilo de vida me queda mejor que el que tenía antes."),
  ],
  rep2Chunks: chunks4("s6"),
  prompts: [
    q("s6-p1", "What was your life like before?", "¿Cómo era tu vida antes?", "When I first…, I was…", "Cuando yo… por primera vez, estaba…", "BEFORE"),
    q("s6-p2", "What are you doing differently now?", "¿Qué haces diferente ahora?", "Right now, I'm…", "Ahora mismo estoy…", "NOW"),
    q("s6-p3", "What has been difficult?", "¿Qué ha sido difícil?", "What has been difficult is…", "Lo que ha sido difícil es…", "DIFFICULT", "explain"),
    q("s6-p4", "What do you enjoy more?", "¿Qué disfrutas más?", "What I enjoy more is…", "Lo que disfruto más es…", "ENJOY", "explain"),
    q("s6-p5", "Which lifestyle is better for you?", "¿Qué estilo de vida es mejor para ti?", "One thing that's different is… Overall, …", "Una cosa que es diferente es… En general, …", "COMPARE", "justify"),
  ],
  cues: ["BEFORE", "NOW", "DIFFICULT", "ENJOY", "BETTER?"],
  powerChunks: { core: ["when I first…", "right now…"], stretch: "one thing that's different is…" },
  sceneImage: { src: sceneD6, alt: "Split scene: a person alone in a quiet small town on the left, the same person confidently navigating a busy big city on the right", altEs: "Escena dividida: una persona sola en un pueblo tranquilo a la izquierda, la misma persona navegando con confianza una ciudad ocupada a la derecha" },
  goalSeconds: [75, 90],
  goalSentences: 9,
  rep5Prompt: { question: "Describe your life before and now.", questionEs: "Describe tu vida antes y ahora." },
  rep5Tips: {
    en: "when I first… (2 ideas) → right now… (2 ideas) → what has been difficult → what I enjoy more → which is better. Take 5–10 seconds to think before you start.",
    es: "when I first… (2 ideas) → right now… (2 ideas) → qué ha sido difícil → qué disfrutas más → cuál es mejor. Tómate 5–10 segundos para pensar antes de empezar.",
  },
  rep5Label: "explain",
  rep5Turns: [
    { id: "s6-turn1", label: "FRIEND", labelEs: "AMIGO", text: "Your friend says city life is much worse than country life. What do you say?", es: "Tu amigo dice que la vida en la ciudad es mucho peor que en el campo. ¿Qué le dices?", voice: "male" },
  ],
  rep5Toolbox: ["When I first…", "Right now…", "One thing that's different is…", "What has been difficult is…", "Overall…"],
  speakerVoice: "female",
});

/* ---------------------------- DAY 7 — TELL ME MORE ---------------------------- */

const d7 = sharksDay({
  day: 7,
  topic: "Tell Me More",
  topicEs: "Cuéntame más",
  focus: "Present perfect — tell an experience and clarify details when asked",
  focusEs: "Presente perfecto — cuenta una experiencia y aclara detalles cuando te pregunten",
  intro: {
    title: "TELL ME MORE",
    titleEs: "CUÉNTAME MÁS",
    lead: "Pick an experience: scary, funny, travel, difficult or unexpected. Tell it, then be ready to clarify exactly what made it memorable and paraphrase a detail.",
    leadEs: "Elige una experiencia: aterradora, graciosa, de viaje, difícil o inesperada. Cuéntala y prepárate para aclarar exactamente qué la hizo memorable y parafrasear un detalle.",
    examples: ["One experience I've had is getting lost in a new city.", "What I mean is that I had no signal and no map.", "To explain that better, I had to ask five different strangers."],
    goal: "Speak for 75–90 seconds. Tell it, then clarify when asked.",
    goalEs: "Habla 75–90 segundos. Cuéntalo y luego aclara cuando te pregunten.",
    cta: START,
  },
  lines: [
    l("s7-1", "One experience I've had is | getting completely lost in a city I didn't know.", "Una experiencia que he tenido es perderme por completo en una ciudad que no conocía."),
    l("s7-2", "It happened on my first solo trip, | and my phone died right after I left the station.", "Pasó en mi primer viaje solo, y mi teléfono se apagó justo después de salir de la estación."),
    l("s7-3", "I've never felt that nervous | in a new place before.", "Nunca me había sentido tan nervioso en un lugar nuevo."),
    l("s7-4", "What I mean is that | I had no map, no signal, and I couldn't read the signs.", "Lo que quiero decir es que no tenía mapa, ni señal, y no podía leer los letreros."),
    l("s7-5", "To explain that better, | I had to ask five different strangers for directions.", "Para explicarlo mejor, tuve que pedirle direcciones a cinco desconocidos distintos."),
    l("s7-6", "It was important because | it taught me to stay calm under pressure.", "Fue importante porque me enseñó a mantener la calma bajo presión."),
    l("s7-7", "What made it so difficult was | not being able to communicate clearly.", "Lo que lo hizo tan difícil fue no poder comunicarme con claridad."),
    l("s7-8", "What I learned was that | asking for help isn't a weakness.", "Lo que aprendí fue que pedir ayuda no es una debilidad."),
  ],
  rep2Chunks: chunks4("s7"),
  prompts: [
    q("s7-p1", "What experience have you had?", "¿Qué experiencia has tenido?", "One experience I've had is…", "Una experiencia que he tenido es…", "EXPERIENCE"),
    q("s7-p2", "What happened?", "¿Qué pasó?", "It happened when… First, … Then, …", "Pasó cuando… Primero, … Luego, …", "STORY", "explain"),
    q("s7-p3", "Why was it important?", "¿Por qué fue importante?", "It was important because…", "Fue importante porque…", "WHY", "justify"),
    q("s7-p4", "What exactly made it difficult, funny or scary?", "¿Qué exactamente lo hizo difícil, gracioso o aterrador?", "What made it so… was…", "Lo que lo hizo tan… fue…", "CLARIFY", "clarify"),
    q("s7-p5", "What did you learn?", "¿Qué aprendiste?", "What I learned was that…", "Lo que aprendí fue que…", "LESSON", "justify"),
  ],
  cues: ["EXPERIENCE", "WHAT HAPPENED", "WHY", "CLARIFY", "LESSON"],
  powerChunks: { core: ["one experience I've had is…", "what I mean is…"], stretch: "to explain that better…" },
  sceneImage: { src: sceneD7, alt: "A traveler standing confused at a busy foreign train station, phone screen dark, asking a stranger for directions", altEs: "Un viajero confundido en una estación de tren extranjera y ocupada, la pantalla del teléfono apagada, pidiendo direcciones a un desconocido" },
  goalSeconds: [75, 90],
  goalSentences: 9,
  rep5Prompt: { question: "Tell me about an experience you'll never forget.", questionEs: "Cuéntame sobre una experiencia que nunca olvidarás." },
  rep5Tips: {
    en: "Tell the story, then be ready to clarify (what exactly…) and paraphrase (what I mean is…) when asked. Take 5–10 seconds to think first.",
    es: "Cuenta la historia y prepárate para aclarar (what exactly…) y parafrasear (what I mean is…) cuando te pregunten. Tómate 5–10 segundos para pensar primero.",
  },
  rep5Label: "clarify",
  rep5Turns: [
    { id: "s7-turn1", label: "PARTNER", labelEs: "COMPAÑERO", text: "Tell me about an experience you'll never forget.", es: "Cuéntame sobre una experiencia que nunca olvidarás.", voice: "male" },
    { id: "s7-turn2", label: "PARTNER", labelEs: "COMPAÑERO", text: "What exactly made it memorable?", es: "¿Qué exactamente la hizo memorable?", voice: "male" },
    { id: "s7-turn3", label: "PARTNER", labelEs: "COMPAÑERO", text: "What do you mean when you say it was difficult?", es: "¿Qué quieres decir con que fue difícil?", voice: "male" },
  ],
  rep5Toolbox: ["One experience I've had is…", "What I mean is…", "To explain that better…", "What made it so… was…", "Let me rephrase that…"],
  speakerVoice: "male",
  testReady: {
    type: "listen-respond",
    title: "LISTEN + PARAPHRASE",
    titleEs: "ESCUCHA Y PARAFRASEA",
    instruction: "Listen to each short idea once. Then say the same idea in your own words.",
    instructionEs: "Escucha cada idea corta una vez. Luego di la misma idea con tus propias palabras.",
    passage:
      "Idea 1: I moved to a new city and I didn't know anyone, so the first month was really lonely. Idea 2: My flight got cancelled and I had to sleep at the airport for one night. Idea 3: I started a new job and I made a big mistake on my first day, but my manager was very understanding. Idea 4: I've been saving money for two years to travel to a place I've always wanted to visit.",
    items: [
      { id: "s7-tr1", audio: "Say idea 1 in your own words.", text: "Idea 1: moving to a new city and feeling lonely.", textEs: "Idea 1: mudarse a una nueva ciudad y sentirse solo.", maxSeconds: 20 },
      { id: "s7-tr2", audio: "Say idea 2 in your own words.", text: "Idea 2: a cancelled flight and a night at the airport.", textEs: "Idea 2: un vuelo cancelado y una noche en el aeropuerto.", maxSeconds: 20 },
      { id: "s7-tr3", audio: "Say idea 3 in your own words.", text: "Idea 3: a mistake on the first day at a new job.", textEs: "Idea 3: un error el primer día en un nuevo trabajo.", maxSeconds: 20 },
      { id: "s7-tr4", audio: "Say idea 4 in your own words.", text: "Idea 4: saving money for two years to travel.", textEs: "Idea 4: ahorrar dinero por dos años para viajar.", maxSeconds: 20 },
    ],
  },
});

/* ---------------------------- DAY 8 — CATCHING UP ---------------------------- */

const d8 = sharksDay({
  day: 8,
  topic: "Catching Up",
  topicEs: "Poniéndose al día",
  focus: "Present perfect progressive — sustain a friendly conversation and ask back",
  focusEs: "Presente perfecto progresivo — sostén una conversación amistosa y pregunta también",
  intro: {
    title: "CATCHING UP",
    titleEs: "PONIÉNDOSE AL DÍA",
    lead: "Your best friend has been studying abroad for a year. You meet again. Answer, add detail, and don't forget to ask about their life too.",
    leadEs: "Tu mejor amigo ha estado estudiando en el extranjero por un año. Se vuelven a ver. Responde, agrega detalles y no olvides preguntar también por su vida.",
    examples: ["I've been working a lot, and I've been studying English at night.", "Tell me more about your year abroad.", "How about you? What have you been doing?"],
    goal: "Fixed conversation: 3 turns. Speak 75–90 seconds in total, and ask a question back.",
    goalEs: "Conversación fija: 3 turnos. Habla 75–90 segundos en total y haz una pregunta.",
    cta: START,
  },
  lines: [
    l("s8-1", "I've been working a lot | since you left, | and I've been studying English at night.", "He estado trabajando mucho desde que te fuiste, y he estado estudiando inglés por las noches."),
    l("s8-2", "I've also been saving money | to visit you next year.", "También he estado ahorrando dinero para visitarte el próximo año."),
    l("s8-3", "What has changed the most is | my confidence at work.", "Lo que más ha cambiado es mi confianza en el trabajo."),
    l("s8-4", "I've been working on | speaking up more in meetings.", "He estado trabajando en hablar más en las reuniones."),
    l("s8-5", "Tell me more about | your year abroad.", "Cuéntame más sobre tu año en el extranjero."),
    l("s8-6", "That sounds amazing, | and I want to hear everything.", "Eso suena increíble y quiero escucharlo todo."),
    l("s8-7", "How about you — | what have you missed the most?", "¿Y tú? ¿Qué es lo que más has extrañado?"),
    l("s8-8", "It's so good to catch up, | and I've missed these conversations.", "Qué bueno ponernos al día, he extrañado estas conversaciones."),
  ],
  rep2Chunks: chunks4("s8"),
  prompts: [
    q("s8-p1", "What have you been doing lately?", "¿Qué has estado haciendo últimamente?", "I've been…", "He estado…", "LATELY"),
    q("s8-p2", "What has changed?", "¿Qué ha cambiado?", "What has changed the most is…", "Lo que más ha cambiado es…", "CHANGED", "explain"),
    q("s8-p3", "What have you been working on?", "¿En qué has estado trabajando?", "I've been working on…", "He estado trabajando en…", "WORKING ON", "explain"),
    q("s8-p4", "What would you like to ask your friend?", "¿Qué te gustaría preguntarle a tu amigo?", "Tell me more about… / How about you?", "Cuéntame más sobre… / ¿Y tú?", "ASK BACK"),
    q("s8-p5", "How would you keep the conversation going?", "¿Cómo mantendrías la conversación?", "That reminds me of… How about you?", "Eso me recuerda a… ¿Y tú?", "KEEP GOING"),
  ],
  cues: ["LATELY", "CHANGED", "WORKING ON", "ASK BACK", "KEEP GOING"],
  powerChunks: { core: ["I've been…", "tell me more about…"], stretch: "how about you?" },
  sceneImage: { src: sceneD8, alt: "Two old friends hugging happily at an airport arrivals gate, suitcases nearby", altEs: "Dos viejos amigos abrazándose felices en la sala de llegadas de un aeropuerto, con maletas cerca" },
  goalSeconds: [75, 90],
  goalSentences: 9,
  rep5Prompt: { question: "Catch up with your best friend, who has been studying abroad for a year.", questionEs: "Ponte al día con tu mejor amigo, que ha estado estudiando en el extranjero por un año." },
  rep5Tips: {
    en: "Answer, add a detail, and when it's your turn — ask a real question back. Take 5–10 seconds to think before you start.",
    es: "Responde, agrega un detalle y cuando sea tu turno, haz una pregunta real. Tómate 5–10 segundos para pensar antes de empezar.",
  },
  rep5Label: "adapt",
  rep5Turns: [
    { id: "s8-turn1", label: "FRIEND", labelEs: "AMIGO", text: "It's so good to see you! What have you been doing since I left?", es: "¡Qué bueno verte! ¿Qué has estado haciendo desde que me fui?", voice: "male" },
    { id: "s8-turn2", label: "FRIEND", labelEs: "AMIGO", text: "Really? Tell me more about that.", es: "¿En serio? Cuéntame más sobre eso.", voice: "male" },
    { id: "s8-turn3", label: "FRIEND", labelEs: "AMIGO", text: "I've changed a lot too. What would you like to know? …Now it's your turn — ask me something.", es: "Yo también he cambiado mucho. ¿Qué te gustaría saber? …Ahora te toca a ti: pregúntame algo.", voice: "male" },
    { id: "s8-turn4", label: "FRIEND", labelEs: "AMIGO", text: "Good question! Honestly, I missed home-cooked food and my family the most.", es: "¡Buena pregunta! Honestamente, extrañé más la comida casera y a mi familia.", voice: "male" },
  ],
  rep5Toolbox: ["I've been…", "Tell me more about…", "How about you?", "What about…?", "That reminds me of…"],
  speakerVoice: "male",
});

/* ---------------------------- DAY 9 — SAY IT ANOTHER WAY ---------------------------- */

const d9 = sharksDay({
  day: 9,
  topic: "Say It Another Way",
  topicEs: "Dilo de otra manera",
  focus: "Mixed / present perfect in context — paraphrase and repair",
  focusEs: "Mixto / presente perfecto en contexto — parafrasea y repara",
  intro: {
    title: "SAY IT ANOTHER WAY",
    titleEs: "DILO DE OTRA MANERA",
    lead: "A difficult moment: problem, reaction, solution, lesson. Then say one important idea again, in a different way.",
    leadEs: "Un momento difícil: problema, reacción, solución, lección. Luego di una idea importante otra vez, de forma diferente.",
    examples: ["The way I handled it was staying calm and asking for help.", "What I mean is that I didn't panic.", "Let me rephrase that: I focused on solving it, not on blaming anyone."],
    goal: "Speak for 75–90 seconds, then rephrase one main idea.",
    goalEs: "Habla 75–90 segundos y luego reformula una idea principal.",
    cta: START,
  },
  lines: [
    l("s9-1", "A difficult moment I've experienced was | losing an important document | right before a deadline.", "Un momento difícil que he vivido fue perder un documento importante justo antes de una fecha límite."),
    l("s9-2", "At first, | I reacted badly | and I felt like everything was falling apart.", "Al principio reaccioné mal y sentí que todo se estaba derrumbando."),
    l("s9-3", "The way I handled it was | staying calm | and asking my team for help.", "La forma en que lo manejé fue mantener la calma y pedirle ayuda a mi equipo."),
    l("s9-4", "What I mean is that | I stopped panicking | and started solving it.", "Lo que quiero decir es que dejé de entrar en pánico y empecé a resolverlo."),
    l("s9-5", "In the end, | we rebuilt the document together | and we still met the deadline.", "Al final, reconstruimos el documento juntos y aun así cumplimos con la fecha límite."),
    l("s9-6", "What I learned was that | panic never solves anything.", "Lo que aprendí fue que el pánico nunca resuelve nada."),
    l("s9-7", "If I could do it again, | I would back up my files | from the beginning.", "Si pudiera hacerlo de nuevo, respaldaría mis archivos desde el principio."),
    l("s9-8", "Let me rephrase that: | staying calm mattered more than the mistake itself.", "Déjame reformularlo: mantener la calma importó más que el error en sí."),
  ],
  rep2Chunks: chunks4("s9"),
  prompts: [
    q("s9-p1", "What difficult moment have you experienced?", "¿Qué momento difícil has vivido?", "A difficult moment I've experienced was…", "Un momento difícil que he vivido fue…", "MOMENT"),
    q("s9-p2", "What happened?", "¿Qué pasó?", "At first, … Then, … In the end, …", "Al principio, … Luego, … Al final, …", "STORY", "explain"),
    q("s9-p3", "How did you handle it?", "¿Cómo lo manejaste?", "The way I handled it was…", "La forma en que lo manejé fue…", "HANDLED", "explain"),
    q("s9-p4", "What did you learn?", "¿Qué aprendiste?", "What I learned was that…", "Lo que aprendí fue que…", "LESSON", "justify"),
    q("s9-p5", "Say the same idea another way.", "Di la misma idea de otra manera.", "Let me rephrase that… / What I mean is…", "Déjame reformularlo… / Lo que quiero decir es…", "REPHRASE", "clarify"),
  ],
  cues: ["MOMENT", "STORY", "HANDLED", "LESSON", "REPHRASE"],
  powerChunks: { core: ["what I mean is…", "the way I handled it was…"], stretch: "if I could do it again…" },
  sceneImage: { src: sceneD9, alt: "A stressed professional at a desk with a scattered document, then calmly rebuilding it with a colleague", altEs: "Un profesional estresado en un escritorio con un documento desordenado, luego reconstruyéndolo con calma junto a un colega" },
  goalSeconds: [75, 90],
  goalSentences: 9,
  rep5Prompt: { question: "Tell me about a difficult moment: what happened, how you handled it, and what you learned.", questionEs: "Cuéntame sobre un momento difícil: qué pasó, cómo lo manejaste y qué aprendiste." },
  rep5Tips: {
    en: "Tell the full story, then rephrase one important idea in different words. Take 5–10 seconds to think before you start.",
    es: "Cuenta la historia completa y luego reformula una idea importante con otras palabras. Tómate 5–10 segundos para pensar antes de empezar.",
  },
  rep5Label: "clarify",
  rep5Turns: [
    { id: "s9-turn1", label: "PARTNER", labelEs: "COMPAÑERO", text: "Tell me about a difficult moment: what happened, how you handled it, and what you learned.", es: "Cuéntame sobre un momento difícil: qué pasó, cómo lo manejaste y qué aprendiste.", voice: "female" },
    { id: "s9-turn2", label: "PARTNER", labelEs: "COMPAÑERO", text: "Say the same idea again, another way.", es: "Di la misma idea otra vez, de otra manera.", voice: "female" },
  ],
  rep5Toolbox: ["What I mean is…", "The way I handled it was…", "If I could do it again…", "Let me rephrase that…", "In the end…"],
  speakerVoice: "female",
  testReady: {
    type: "speak-now",
    title: "SPEAK NOW + REPHRASE",
    titleEs: "HABLA AHORA + REFORMULA",
    instruction: "8 seconds to think. Speak for about 45 seconds, then restate your main idea in different words.",
    instructionEs: "8 segundos para pensar. Habla unos 45 segundos y luego repite tu idea principal con otras palabras.",
    thinkSeconds: 8,
    speakSeconds: 45,
    items: [
      { id: "s9-tr1", text: "Describe a problem you solved.", textEs: "Describe un problema que resolviste.", chunks: ["PROBLEM?", "SOLUTION?", "RESULT?"], maxSeconds: 45 },
      { id: "s9-tr2", text: "Now say your main idea again using different words.", textEs: "Ahora di tu idea principal otra vez con palabras diferentes.", chunks: ["REPHRASE"], maxSeconds: 30 },
    ],
  },
});

/* ---------------------------- DAY 10 — GET THE FACTS RIGHT ---------------------------- */

const d10 = sharksDay({
  day: 10,
  topic: "Get the Facts Right",
  topicEs: "Aclara los hechos",
  focus: "Job Ready: customer service — clarify misunderstanding and recover",
  focusEs: "Job Ready: servicio al cliente — aclara un malentendido y recupera la situación",
  intro: {
    title: "GET THE FACTS RIGHT",
    titleEs: "ACLARA LOS HECHOS",
    lead: "A customer corrects your understanding of the problem. Confirm what they actually mean, then solve it.",
    leadEs: "Un cliente corrige tu entendimiento del problema. Confirma qué quiere decir realmente y luego resuélvelo.",
    examples: ["If I understand correctly, you were charged twice.", "So what you're saying is that both charges already went through.", "Sorry, let me rephrase that so we're both clear."],
    goal: "Customer service role play: 4 fixed turns. Speak 75–90 seconds in total.",
    goalEs: "Role play de servicio al cliente: 4 turnos fijos. Habla 75–90 segundos en total.",
    cta: START,
  },
  lines: [
    l("s10-1", "Thank you for calling, | I understand there's an issue with your payment.", "Gracias por llamar, entiendo que hay un problema con su pago."),
    l("s10-2", "If I understand correctly, | you were charged twice | for the same order.", "Si entiendo correctamente, le cobraron dos veces por el mismo pedido."),
    l("s10-3", "So what you're saying is that | the last agent told you one payment was only pending.", "Entonces lo que usted dice es que el último agente le dijo que un pago solo estaba pendiente."),
    l("s10-4", "Sorry, let me rephrase that: | you're telling me both charges already went through.", "Perdón, déjeme reformularlo: usted me dice que ambos cargos ya se procesaron."),
    l("s10-5", "I understand now, | and I apologize for the confusion.", "Ahora entiendo, y me disculpo por la confusión."),
    l("s10-6", "To summarize, | you were charged twice | and you need a refund for one payment.", "Para resumir, le cobraron dos veces y necesita un reembolso por un pago."),
    l("s10-7", "I'm going to open a priority ticket | and request the refund today.", "Voy a abrir un ticket prioritario y solicitar el reembolso hoy mismo."),
    l("s10-8", "You'll get a confirmation email | within 24 hours | once it's processed.", "Recibirá un correo de confirmación dentro de 24 horas una vez que se procese."),
  ],
  rep2Chunks: chunks4("s10"),
  prompts: [
    q("s10-p1", "What happened?", "¿Qué pasó?", "The customer says that…", "El cliente dice que…", "PROBLEM"),
    q("s10-p2", "What is unclear?", "¿Qué no está claro?", "What's unclear is whether…", "Lo que no está claro es si…", "UNCLEAR", "clarify"),
    q("s10-p3", "What should you confirm?", "¿Qué deberías confirmar?", "If I understand correctly, …", "Si entiendo correctamente, …", "CONFIRM", "clarify"),
    q("s10-p4", "How would you summarize the problem?", "¿Cómo resumirías el problema?", "So what you're saying is…", "Entonces lo que usted dice es…", "SUMMARIZE", "explain"),
    q("s10-p5", "What solution would you suggest?", "¿Qué solución sugerirías?", "I'm going to… and you'll…", "Voy a… y usted…", "SOLVE", "adapt"),
  ],
  cues: ["PROBLEM", "UNCLEAR", "CONFIRM", "SUMMARIZE", "SOLVE"],
  powerChunks: { core: ["if I understand correctly…", "so what you're saying is…"], stretch: "sorry, let me rephrase that." },
  sceneImage: { src: sceneD10, alt: "A customer service agent with a headset carefully taking notes while listening to a frustrated caller on screen", altEs: "Una agente de servicio al cliente con audífonos tomando notas con cuidado mientras escucha a un cliente frustrado en pantalla" },
  goalSeconds: [75, 90],
  goalSentences: 9,
  rep5Prompt: { question: "A customer corrects your understanding of a billing problem. Clarify and solve it.", questionEs: "Un cliente corrige tu entendimiento de un problema de facturación. Aclara y resuélvelo." },
  rep5Tips: {
    en: "If I understand correctly… → listen for the correction → so what you're saying is… → summarize → offer a clear next step. Take 5–10 seconds to think first.",
    es: "If I understand correctly… → escucha la corrección → so what you're saying is… → resume → ofrece un siguiente paso claro. Tómate 5–10 segundos para pensar primero.",
  },
  rep5Label: "clarify",
  rep5Turns: [
    { id: "s10-turn1", label: "CUSTOMER", labelEs: "CLIENTE", text: "I was charged twice, but the last agent told me the payment was only pending.", es: "Me cobraron dos veces, pero el último agente me dijo que el pago solo estaba pendiente.", voice: "female" },
    { id: "s10-turn2", label: "CUSTOMER", labelEs: "CLIENTE", text: "No, that's not what I mean. Both charges already went through.", es: "No, eso no es lo que quiero decir. Ambos cargos ya se procesaron.", voice: "female" },
    { id: "s10-turn3", label: "CUSTOMER", labelEs: "CLIENTE", text: "Exactly. So what can you do?", es: "Exacto. ¿Entonces qué puede hacer?", voice: "female" },
    { id: "s10-turn4", label: "CUSTOMER", labelEs: "CLIENTE", text: "How will I know when this is fixed?", es: "¿Cómo sabré cuándo esto esté resuelto?", voice: "female" },
  ],
  rep5Toolbox: ["If I understand correctly…", "So what you're saying is…", "Sorry, let me rephrase that.", "To summarize…", "You'll receive…"],
  speakerVoice: "male",
  testReady: {
    type: "listen-respond",
    title: "LISTEN + PARAPHRASE",
    titleEs: "ESCUCHA Y PARAFRASEA",
    instruction: "Listen to the customer call once. Then answer 4 questions out loud.",
    instructionEs: "Escucha la llamada del cliente una vez. Luego responde 4 preguntas en voz alta.",
    passage:
      "Customer: I was told my order shipped yesterday, but the tracking still shows nothing. Agent: If I understand correctly, you haven't received any tracking update. Customer: No, that's not quite it — I did get a tracking number, but it shows the package hasn't moved in three days. Agent: I see, so it's not that it never shipped, it's that it's stuck. Customer: Exactly. I need it by Friday for a gift. Agent: Understood. I'll escalate this today and send you an update by tomorrow morning.",
    items: [
      { id: "s10-tr1", audio: "What did the customer first say the problem was?", text: "What did the customer first say the problem was?", textEs: "¿Qué dijo el cliente al principio que era el problema?", maxSeconds: 15 },
      { id: "s10-tr2", audio: "How did the customer correct the agent's understanding?", text: "How did the customer correct the agent's understanding?", textEs: "¿Cómo corrigió el cliente el entendimiento del agente?", maxSeconds: 15 },
      { id: "s10-tr3", audio: "Why does the deadline matter to the customer?", text: "Why does the deadline matter to the customer?", textEs: "¿Por qué importa la fecha límite para el cliente?", maxSeconds: 15 },
      { id: "s10-tr4", audio: "What did the agent promise to do?", text: "What did the agent promise to do?", textEs: "¿Qué prometió hacer el agente?", maxSeconds: 15 },
    ],
  },
});

/* ====================================================================== */
/* WEEK 3 — ARGUE, PERSUADE & CHANGE YOUR MIND                              */
/* ====================================================================== */

/* ---------------------------- DAY 11 — THEN VS NOW ---------------------------- */

const d11 = sharksDay({
  day: 11,
  topic: "Then vs Now",
  topicEs: "Antes y ahora",
  focus: "Used to — compare change and evaluate whether change is always positive (AI & technology)",
  focusEs: "Used to — compara el cambio y evalúa si el cambio siempre es positivo (IA y tecnología)",
  intro: {
    title: "THEN VS NOW",
    titleEs: "ANTES Y AHORA",
    lead: "AI and technology have changed daily life fast. Say what people used to do, what's better now, what's worse, and whether every change is really positive.",
    leadEs: "La IA y la tecnología han cambiado la vida diaria rápido. Di qué solía hacer la gente, qué es mejor ahora, qué es peor y si todo cambio es realmente positivo.",
    examples: ["People used to search for information manually.", "Today, however, AI gives you an answer instantly.", "One downside is that we're losing patience for anything slow."],
    goal: "Speak for 75–90 seconds. Then vs now, plus a real evaluation.",
    goalEs: "Habla 75–90 segundos. Antes vs ahora, más una evaluación real.",
    cta: START,
  },
  lines: [
    l("s11-1", "People used to search for information | by reading books or asking experts.", "La gente solía buscar información leyendo libros o preguntando a expertos."),
    l("s11-2", "They used to spend hours | finding one good answer.", "Solían pasar horas encontrando una buena respuesta."),
    l("s11-3", "Today, however, | AI gives you an answer | in a few seconds.", "Hoy, sin embargo, la IA te da una respuesta en unos segundos."),
    l("s11-4", "This is better because | it saves an enormous amount of time.", "Esto es mejor porque ahorra una cantidad enorme de tiempo."),
    l("s11-5", "One downside is that | we're losing patience for anything slow.", "Una desventaja es que estamos perdiendo la paciencia para todo lo lento."),
    l("s11-6", "Another downside is that | people trust the first answer | without checking it.", "Otra desventaja es que la gente confía en la primera respuesta sin comprobarla."),
    l("s11-7", "Not every technological change is positive; | some of them create new problems.", "No todo cambio tecnológico es positivo; algunos crean nuevos problemas."),
    l("s11-8", "Overall, | I think the benefits are bigger, | but we need to stay critical.", "En general, creo que los beneficios son mayores, pero debemos seguir siendo críticos."),
  ],
  rep2Chunks: chunks4("s11"),
  prompts: [
    q("s11-p1", "What did people use to do?", "¿Qué solía hacer la gente?", "People used to…", "La gente solía…", "BEFORE"),
    q("s11-p2", "What happens now?", "¿Qué pasa ahora?", "Today, however, …", "Hoy, sin embargo, …", "NOW"),
    q("s11-p3", "What is better now?", "¿Qué es mejor ahora?", "This is better because…", "Esto es mejor porque…", "BETTER", "explain"),
    q("s11-p4", "What is worse?", "¿Qué es peor?", "One downside is that…", "Una desventaja es que…", "WORSE", "explain"),
    q("s11-p5", "Is every technological change positive?", "¿Todo cambio tecnológico es positivo?", "Not every change is positive because… Overall, …", "No todo cambio es positivo porque… En general, …", "EVALUATE", "justify"),
  ],
  cues: ["BEFORE", "NOW", "BETTER", "WORSE", "EVALUATE"],
  powerChunks: { core: ["people used to…", "today, however…"], stretch: "one downside is…" },
  sceneImage: { src: sceneD11, alt: "Before: a person surrounded by books in a library. Now: the same person getting an instant answer from an AI assistant on a phone", altEs: "Antes: una persona rodeada de libros en una biblioteca. Ahora: la misma persona recibiendo una respuesta instantánea de un asistente de IA en el teléfono" },
  goalSeconds: [75, 90],
  goalSentences: 10,
  rep5Prompt: { question: "Explain how technology has changed life and whether all the changes are positive.", questionEs: "Explica cómo la tecnología ha cambiado la vida y si todos los cambios son positivos." },
  rep5Tips: {
    en: "people used to… → today, however… → what's better → what's worse → is it always positive + overall. Take 5–10 seconds to think first.",
    es: "people used to… → today, however… → qué es mejor → qué es peor → ¿siempre es positivo? + overall. Tómate 5–10 segundos para pensar primero.",
  },
  rep5Label: "justify",
  speakerVoice: "male",
  testReady: {
    type: "story-retell",
    title: "INFORMATION RETELL + OPINION",
    titleEs: "VUELVE A CONTAR + OPINIÓN",
    instruction: "Listen once. Retell the key idea, then give your own opinion.",
    instructionEs: "Escucha una vez. Cuenta la idea clave y luego da tu opinión.",
    passage:
      "A new study found that people who use AI assistants every day make decisions faster, but they also report feeling more anxious when the technology isn't available. Researchers say people are becoming used to instant answers, and waiting even a few minutes now feels frustrating. At the same time, the same people say they trust AI more than they trust their own memory.",
    speakSeconds: 40,
    items: [
      { id: "s11-tr1", text: "Retell the key idea of the study.", textEs: "Cuenta la idea clave del estudio.", chunks: ["KEY IDEA"], maxSeconds: 25 },
      { id: "s11-tr2", text: "Do you agree with the findings? Why?", textEs: "¿Estás de acuerdo con los hallazgos? ¿Por qué?", chunks: ["MY OPINION", "WHY"], maxSeconds: 30 },
    ],
  },
});

/* ---------------------------- DAY 12 — MAKE A FAST CHOICE ---------------------------- */

const d12 = sharksDay({
  day: 12,
  topic: "Make a Fast Choice",
  topicEs: "Toma una decisión rápida",
  focus: "Short comparatives — make a decision and reconsider after new facts",
  focusEs: "Comparativos cortos — toma una decisión y reconsidérala con datos nuevos",
  intro: {
    title: "MAKE A FAST CHOICE",
    titleEs: "TOMA UNA DECISIÓN RÁPIDA",
    lead: "Apartment A: cheaper, larger, farther. Apartment B: smaller, more expensive, closer. Choose fast — then react as new facts come in.",
    leadEs: "Apartamento A: más barato, más grande, más lejos. Apartamento B: más pequeño, más caro, más cerca. Elige rápido y luego reacciona a los datos nuevos.",
    examples: ["If I had to choose, I would choose Apartment A.", "The main difference is the distance to work.", "Considering that, I might change my mind."],
    goal: "Fast-choice role play: 2 new-info turns. Speak 75–90 seconds in total.",
    goalEs: "Role play de decisión rápida: 2 turnos con información nueva. Habla 75–90 segundos en total.",
    cta: START,
  },
  lines: [
    l("s12-1", "If I had to choose right now, | I would choose Apartment A | because it's cheaper and larger.", "Si tuviera que elegir ahora mismo, elegiría el Apartamento A porque es más barato y más grande."),
    l("s12-2", "The main difference is | the distance to work.", "La diferencia principal es la distancia al trabajo."),
    l("s12-3", "Apartment B is smaller and pricier, | but it's much closer.", "El Apartamento B es más pequeño y más caro, pero está mucho más cerca."),
    l("s12-4", "Considering that, | the extra space in A still matters more to me.", "Considerando eso, el espacio extra en A todavía me importa más."),
    l("s12-5", "However, | if transportation is expensive, | that could change things.", "Sin embargo, si el transporte es caro, eso podría cambiar las cosas."),
    l("s12-6", "New information can shift | what matters most in a decision.", "La información nueva puede cambiar lo que más importa en una decisión."),
    l("s12-7", "Light and comfort | also matter more than people think.", "La luz y la comodidad también importan más de lo que la gente cree."),
    l("s12-8", "Taking everything into account, | my final choice might not be my first one.", "Tomando todo en cuenta, mi elección final podría no ser la primera."),
  ],
  rep2Chunks: chunks4("s12"),
  prompts: [
    q("s12-p1", "Which apartment would you choose?", "¿Qué apartamento elegirías?", "If I had to choose, I would…", "Si tuviera que elegir, yo…", "CHOICE"),
    q("s12-p2", "Why?", "¿Por qué?", "The main difference is…", "La diferencia principal es…", "WHY", "explain"),
    q("s12-p3", "What is the main disadvantage?", "¿Cuál es la principal desventaja?", "The main disadvantage is…", "La principal desventaja es…", "DISADVANTAGE", "explain"),
    q("s12-p4", "What information matters most?", "¿Qué información importa más?", "What matters most to me is…", "Lo que más me importa es…", "MATTERS", "justify"),
    q("s12-p5", "What could change your decision?", "¿Qué podría cambiar tu decisión?", "Considering that, I might…", "Considerando eso, podría…", "ADAPT", "adapt"),
  ],
  cues: ["CHOICE", "WHY", "DISADVANTAGE", "MATTERS", "ADAPT"],
  powerChunks: { core: ["if I had to choose…", "the main difference is…"], stretch: "considering that…" },
  sceneImage: { src: sceneD12, alt: "Two apartment listing cards side by side: Apartment A larger and cheaper but far, Apartment B smaller and pricier but close to downtown", altEs: "Dos tarjetas de apartamentos en renta lado a lado: Apartamento A más grande y barato pero lejos, Apartamento B más pequeño y caro pero cerca del centro" },
  goalSeconds: [75, 90],
  goalSentences: 9,
  rep5Prompt: { question: "Choose an apartment fast, then adapt as new facts arrive.", questionEs: "Elige un apartamento rápido y luego adapta tu decisión con datos nuevos." },
  rep5Tips: {
    en: "Choose fast → the main difference is… → react to each new fact honestly → give a final answer. Take 5–10 seconds to think first.",
    es: "Elige rápido → the main difference is… → reacciona con honestidad a cada dato nuevo → da una respuesta final. Tómate 5–10 segundos para pensar primero.",
  },
  rep5Label: "adapt",
  rep5Turns: [
    { id: "s12-turn1", label: "AGENT", labelEs: "AGENTE", text: "Apartment A or Apartment B — which one would you choose right now?", es: "Apartamento A o Apartamento B: ¿cuál elegirías ahora mismo?", voice: "female" },
    { id: "s12-turn2", label: "AGENT", labelEs: "AGENTE", text: "Transportation from Apartment A will cost about $150 per month.", es: "El transporte desde el Apartamento A costará unos $150 al mes.", voice: "female" },
    { id: "s12-turn3", label: "AGENT", labelEs: "AGENTE", text: "Apartment B has almost no natural light.", es: "El Apartamento B casi no tiene luz natural.", voice: "female" },
    { id: "s12-turn4", label: "AGENT", labelEs: "AGENTE", text: "Which apartment do you choose now?", es: "¿Qué apartamento eliges ahora?", voice: "female" },
  ],
  rep5Toolbox: ["If I had to choose…", "The main difference is…", "Considering that…", "That changes things because…", "My final choice is…"],
  speakerVoice: "female",
});

/* ---------------------------- DAY 13 — TAKE A SIDE ---------------------------- */

const d13 = sharksDay({
  day: 13,
  topic: "Take a Side",
  topicEs: "Toma una postura",
  focus: "Long comparatives — defend an opinion while acknowledging another side",
  focusEs: "Comparativos largos — defiende una opinión reconociendo el otro lado",
  intro: {
    title: "TAKE A SIDE",
    titleEs: "TOMA UNA POSTURA",
    lead: "Cats vs dogs, work from home vs office, city vs country. Take a side, accept a good point from the other side, and hold your position.",
    leadEs: "Gatos vs perros, trabajo remoto vs oficina, ciudad vs campo. Toma una postura, acepta un buen punto del otro lado y sostén tu posición.",
    examples: ["I agree with that point, but I still prefer working from home.", "On the other hand, offices make collaboration easier.", "Another way to look at it is that it depends on the job."],
    goal: "Debate role play: 3 fixed opponent turns. Speak about 90 seconds in total.",
    goalEs: "Role play de debate: 3 turnos fijos del oponente. Habla unos 90 segundos en total.",
    cta: START,
  },
  lines: [
    l("s13-1", "If I had to choose, | I would say working from home | is more practical for me.", "Si tuviera que elegir, diría que trabajar desde casa es más práctico para mí."),
    l("s13-2", "It's more flexible | and it saves me two hours of commuting every day.", "Es más flexible y me ahorra dos horas de traslado todos los días."),
    l("s13-3", "I agree with that point, | but collaboration is harder online.", "Estoy de acuerdo con ese punto, pero la colaboración es más difícil en línea."),
    l("s13-4", "On the other hand, | the office is more social | and communication feels more natural.", "Por otro lado, la oficina es más social y la comunicación se siente más natural."),
    l("s13-5", "Another way to look at it is that | it depends on the type of job.", "Otra forma de verlo es que depende del tipo de trabajo."),
    l("s13-6", "For creative teams, | being in person can be more effective.", "Para equipos creativos, estar presencialmente puede ser más efectivo."),
    l("s13-7", "Still, | for individual, focused work, | home is clearly better for me.", "Aun así, para trabajo individual y enfocado, la casa es claramente mejor para mí."),
    l("s13-8", "Overall, | my opinion hasn't changed much, | but I understand the other side better now.", "En general, mi opinión no ha cambiado mucho, pero ahora entiendo mejor el otro lado."),
  ],
  rep2Chunks: chunks4("s13"),
  prompts: [
    q("s13-p1", "Which do you prefer?", "¿Cuál prefieres?", "I would say… is more…", "Yo diría que… es más…", "PREFERENCE"),
    q("s13-p2", "Why?", "¿Por qué?", "It's more… because…", "Es más… porque…", "WHY", "explain"),
    q("s13-p3", "What is one strong point for the other side?", "¿Cuál es un punto fuerte del otro lado?", "I agree with that point, but…", "Estoy de acuerdo con ese punto, pero…", "OTHER SIDE", "justify"),
    q("s13-p4", "What do you disagree with?", "¿Con qué no estás de acuerdo?", "I disagree because…", "No estoy de acuerdo porque…", "DISAGREE", "defend"),
    q("s13-p5", "Has anything changed your opinion?", "¿Algo ha cambiado tu opinión?", "My opinion hasn't changed much, but…", "Mi opinión no ha cambiado mucho, pero…", "FINAL", "adapt"),
  ],
  cues: ["PREFERENCE", "WHY", "OTHER SIDE", "DISAGREE", "FINAL"],
  powerChunks: { core: ["I agree with that point, but…", "on the other hand…"], stretch: "another way to look at it is…" },
  sceneImage: { src: sceneD13, alt: "A split scene: someone working comfortably from a home desk on the left, a busy collaborative office on the right", altEs: "Una escena dividida: alguien trabajando cómodamente desde un escritorio en casa a la izquierda, una oficina colaborativa y ocupada a la derecha" },
  variants: [
    { id: "pets", label: "CATS vs DOGS", labelEs: "GATOS vs PERROS" },
    { id: "work", label: "WORK FROM HOME vs OFFICE", labelEs: "TRABAJO REMOTO vs OFICINA" },
    { id: "place", label: "CITY vs COUNTRY", labelEs: "CIUDAD vs CAMPO" },
  ],
  goalSeconds: [90, 100],
  goalSentences: 10,
  rep5Prompt: { question: "Take a side and defend it while an opponent pushes back.", questionEs: "Toma una postura y defiéndela mientras un oponente te contradice." },
  rep5Tips: {
    en: "State your position → I agree with that point, but… → on the other hand… → final answer: maintain, modify, or partly concede. Take 5–10 seconds to think first.",
    es: "Da tu postura → I agree with that point, but… → on the other hand… → respuesta final: mantén, modifica o cede parcialmente. Tómate 5–10 segundos para pensar primero.",
  },
  rep5Label: "defend",
  rep5Turns: [
    { id: "s13-turn1", label: "OPPONENT", labelEs: "OPONENTE", text: "I disagree because the other option is more practical.", es: "No estoy de acuerdo porque la otra opción es más práctica.", voice: "male" },
    { id: "s13-turn2", label: "OPPONENT", labelEs: "OPONENTE", text: "But what about the times when your option clearly fails?", es: "Pero ¿qué hay de las veces que tu opción claramente falla?", voice: "male" },
    { id: "s13-turn3", label: "OPPONENT", labelEs: "OPONENTE", text: "Has your opinion changed at all?", es: "¿Ha cambiado en algo tu opinión?", voice: "male" },
  ],
  rep5Toolbox: ["I agree with that point, but…", "On the other hand…", "Another way to look at it is…", "Still…", "Overall…"],
  speakerVoice: "female",
  testReady: {
    type: "listen-respond",
    title: "TWO-SPEAKER LISTEN & RESPOND",
    titleEs: "ESCUCHA Y RESPONDE — DOS VOCES",
    instruction: "Two speakers disagree. Listen once. Identify each position, then give your own opinion.",
    instructionEs: "Dos personas no están de acuerdo. Escucha una vez. Identifica cada postura y luego da tu opinión.",
    passage:
      "Elena: I think living in the city is much better because you have more opportunities and everything is close. Marcos: I disagree. The country is quieter, and I think quality of life matters more than convenience. Elena: That's true, but you can't ignore how much time you save in the city. Marcos: Maybe, but I'd rather have less stress than more options.",
    passageParts: [
      { voice: "female", text: "Elena: I think living in the city is much better because you have more opportunities and everything is close." },
      { voice: "male", text: "Marcos: I disagree. The country is quieter, and I think quality of life matters more than convenience." },
      { voice: "female", text: "Elena: That's true, but you can't ignore how much time you save in the city." },
      { voice: "male", text: "Marcos: Maybe, but I'd rather have less stress than more options." },
    ],
    items: [
      { id: "s13-tr1", audio: "What is Elena's position?", text: "What is Elena's position?", textEs: "¿Cuál es la postura de Elena?", maxSeconds: 15 },
      { id: "s13-tr2", audio: "What is Marcos's position?", text: "What is Marcos's position?", textEs: "¿Cuál es la postura de Marcos?", maxSeconds: 15 },
      { id: "s13-tr3", audio: "What point does Elena concede or acknowledge?", text: "What point does Elena concede or acknowledge?", textEs: "¿Qué punto reconoce o cede Elena?", maxSeconds: 15 },
      { id: "s13-tr4", audio: "Who do you agree with, and why?", text: "Who do you agree with, and why?", textEs: "¿Con quién estás de acuerdo y por qué?", maxSeconds: 20 },
    ],
  },
});

/* ---------------------------- DAY 14 — CHANGING PRIORITIES ---------------------------- */

const d14 = sharksDay({
  day: 14,
  topic: "Changing Priorities",
  topicEs: "Prioridades cambiantes",
  focus: "Job Ready: sales — change your recommendation when the customer's priorities change",
  focusEs: "Job Ready: ventas — cambia tu recomendación cuando cambian las prioridades del cliente",
  intro: {
    title: "CHANGING PRIORITIES",
    titleEs: "PRIORIDADES CAMBIANTES",
    lead: "Three plans, one customer, and two changing priorities. Recommend, adapt, adapt again, and explain the change clearly.",
    leadEs: "Tres planes, un cliente y dos prioridades que cambian. Recomienda, adapta, adapta de nuevo y explica el cambio con claridad.",
    examples: ["Based on that new information, I'd recommend Plan B instead.", "In that case, reliability matters more than price.", "I'd change my recommendation because your needs have changed."],
    goal: "Sales role play: 4 fixed customer turns. Speak about 90 seconds in total.",
    goalEs: "Role play de ventas: 4 turnos fijos del cliente. Habla unos 90 segundos en total.",
    cta: START,
  },
  lines: [
    l("s14-1", "We have three plans, | each built for a different priority.", "Tenemos tres planes, cada uno pensado para una prioridad distinta."),
    l("s14-2", "Plan A is the cheapest, | with basic reliability and standard support.", "El Plan A es el más barato, con confiabilidad básica y soporte estándar."),
    l("s14-3", "Since price is your priority, | I'd recommend Plan A.", "Como el precio es su prioridad, le recomendaría el Plan A."),
    l("s14-4", "Based on that new information, | reliability matters more now, | so Plan B makes more sense.", "Según esa nueva información, la confiabilidad importa más ahora, así que el Plan B tiene más sentido."),
    l("s14-5", "In that case, | Plan B offers high reliability | and faster support.", "En ese caso, el Plan B ofrece alta confiabilidad y soporte más rápido."),
    l("s14-6", "Since you also need fast technical support, | I'd change my recommendation to Plan C.", "Ya que también necesita soporte técnico rápido, cambiaría mi recomendación al Plan C."),
    l("s14-7", "Plan C costs more, | but it includes premium features and priority support.", "El Plan C cuesta más, pero incluye funciones premium y soporte prioritario."),
    l("s14-8", "Overall, | your priorities have changed, | and so has my recommendation.", "En general, sus prioridades cambiaron y también cambió mi recomendación."),
  ],
  rep2Chunks: chunks4("s14"),
  prompts: [
    q("s14-p1", "What does the customer care about?", "¿Qué le importa al cliente?", "The customer cares most about…", "Al cliente le importa más…", "PRIORITY"),
    q("s14-p2", "Which plan would you recommend?", "¿Qué plan recomendarías?", "I'd recommend…", "Recomendaría…", "RECOMMEND"),
    q("s14-p3", "Why?", "¿Por qué?", "Since… matters most, …", "Como… importa más, …", "WHY", "explain"),
    q("s14-p4", "What new fact could change your recommendation?", "¿Qué dato nuevo podría cambiar tu recomendación?", "Based on that new information, …", "Según esa nueva información, …", "NEW INFO", "adapt"),
    q("s14-p5", "How would you explain the change?", "¿Cómo explicarías el cambio?", "I'd change my recommendation because…", "Cambiaría mi recomendación porque…", "EXPLAIN CHANGE", "justify"),
  ],
  cues: ["PRIORITY", "RECOMMEND", "WHY", "NEW INFO", "EXPLAIN CHANGE"],
  powerChunks: { core: ["based on that new information…", "in that case…"], stretch: "I'd change my recommendation because…" },
  sceneImage: { src: sceneD14, alt: "Three plan cards on a sales screen: Plan A cheapest basic, Plan B moderate reliable, Plan C premium fastest, with a sales agent presenting to a customer on video", altEs: "Tres tarjetas de planes en una pantalla de ventas: Plan A el más barato y básico, Plan B moderado y confiable, Plan C premium y más rápido, con una agente de ventas presentando a un cliente por video" },
  goalSeconds: [90, 100],
  goalSentences: 10,
  rep5Prompt: { question: "A customer's priorities keep changing. Adapt your recommendation twice and explain why.", questionEs: "Las prioridades de un cliente cambian. Adapta tu recomendación dos veces y explica por qué." },
  rep5Tips: {
    en: "Recommend → based on that new information… (adapt) → in that case… (adapt again) → explain the change clearly at the end. Take 5–10 seconds to think first.",
    es: "Recomienda → based on that new information… (adapta) → in that case… (adapta de nuevo) → explica el cambio con claridad al final. Tómate 5–10 segundos para pensar primero.",
  },
  rep5Label: "adapt",
  rep5Turns: [
    { id: "s14-turn1", label: "CUSTOMER", labelEs: "CLIENTE", text: "Price is the most important thing to me. What would you recommend?", es: "El precio es lo más importante para mí. ¿Qué me recomienda?", voice: "male" },
    { id: "s14-turn2", label: "CUSTOMER", labelEs: "CLIENTE", text: "Actually, I work from home, so reliability is more important than I thought.", es: "En realidad, trabajo desde casa, así que la confiabilidad me importa más de lo que pensaba.", voice: "male" },
    { id: "s14-turn3", label: "CUSTOMER", labelEs: "CLIENTE", text: "I also need fast technical support.", es: "También necesito soporte técnico rápido.", voice: "male" },
    { id: "s14-turn4", label: "CUSTOMER", labelEs: "CLIENTE", text: "So what do you recommend now, and why?", es: "¿Entonces qué me recomienda ahora, y por qué?", voice: "male" },
  ],
  rep5Toolbox: ["Based on that new information…", "In that case…", "I'd change my recommendation because…", "Since… matters most…", "Overall…"],
  speakerVoice: "female",
});

/* ---------------------------- DAY 15 — MINI DEBATE ---------------------------- */

const d15 = sharksDay({
  day: 15,
  topic: "Mini Debate",
  topicEs: "Mini debate",
  focus: "Simple present review — state, support, respond, concede, conclude",
  focusEs: "Repaso del presente simple — plantea, sostén, responde, cede, concluye",
  intro: {
    title: "MINI DEBATE",
    titleEs: "MINI DEBATE",
    lead: "One topic from the bank. State your opinion, support it, respond to an opponent twice, then give your final position.",
    leadEs: "Un tema del banco. Plantea tu opinión, sostenla, responde a un oponente dos veces y da tu postura final.",
    examples: ["From my point of view, social media does more harm than good.", "I see your point, but the evidence still worries me.", "I agree with part of that because moderation could help."],
    goal: "Debate: 3 fixed opponent turns. Speak about 90 seconds in total.",
    goalEs: "Debate: 3 turnos fijos del oponente. Habla unos 90 segundos en total.",
    cta: START,
  },
  lines: [
    l("s15-1", "From my point of view, | this topic has a clear answer.", "Desde mi punto de vista, este tema tiene una respuesta clara."),
    l("s15-2", "The main reason is that | the evidence keeps pointing in one direction.", "La razón principal es que la evidencia sigue apuntando en una dirección."),
    l("s15-3", "For example, | I've seen this happen in my own life.", "Por ejemplo, he visto que esto pasa en mi propia vida."),
    l("s15-4", "I see your point, | but I don't think it changes the bigger picture.", "Entiendo tu punto, pero no creo que cambie el panorama general."),
    l("s15-5", "I agree with part of that | because context does matter.", "Estoy de acuerdo con parte de eso porque el contexto sí importa."),
    l("s15-6", "However, | the strongest argument against my view | doesn't outweigh the benefits.", "Sin embargo, el argumento más fuerte en contra de mi postura no supera los beneficios."),
    l("s15-7", "After hearing the other side, | I understand it better, | but I hold my position.", "Después de escuchar el otro lado, lo entiendo mejor, pero sostengo mi postura."),
    l("s15-8", "Overall, | this is where I stand, | and here's why.", "En general, esta es mi postura, y esta es la razón."),
  ],
  rep2Chunks: chunks4("s15"),
  prompts: [
    q("s15-p1", "What is your opinion?", "¿Cuál es tu opinión?", "From my point of view, …", "Desde mi punto de vista, …", "OPINION"),
    q("s15-p2", "Why?", "¿Por qué?", "The main reason is that…", "La razón principal es que…", "WHY", "explain"),
    q("s15-p3", "What example supports it?", "¿Qué ejemplo lo apoya?", "For example, …", "Por ejemplo, …", "EXAMPLE", "explain"),
    q("s15-p4", "What is the strongest argument against your opinion?", "¿Cuál es el argumento más fuerte en contra?", "The strongest argument against it is…", "El argumento más fuerte en contra es…", "AGAINST", "justify"),
    q("s15-p5", "Has your opinion changed?", "¿Ha cambiado tu opinión?", "After hearing the other side, …", "Después de escuchar el otro lado, …", "FINAL", "defend"),
  ],
  cues: ["OPINION", "WHY", "EXAMPLE", "AGAINST", "FINAL"],
  powerChunks: { core: ["from my point of view…", "I see your point, but…"], stretch: "I agree with part of that because…" },
  sceneImage: { src: sceneD15, alt: "Two people at a small debate table with a moderator's timer between them, each with note cards", altEs: "Dos personas en una pequeña mesa de debate con un cronómetro entre ellas, cada una con tarjetas de notas" },
  goalSeconds: [90, 100],
  goalSentences: 10,
  rep5Prompt: { question: "Debate one topic: state your opinion, respond to an opponent, and give your final position.", questionEs: "Debate un tema: plantea tu opinión, responde a un oponente y da tu postura final." },
  rep5Tips: {
    en: "State it → I see your point, but… → I agree with part of that because… → final: maintain, modify, or partly concede. Take 5–10 seconds to think first.",
    es: "Plantéalo → I see your point, but… → I agree with part of that because… → final: mantén, modifica o cede parcialmente. Tómate 5–10 segundos para pensar primero.",
  },
  rep5Label: "defend",
  rep5Toolbox: ["From my point of view…", "I see your point, but…", "I agree with part of that because…", "The strongest argument against it is…", "Overall…"],
  speakerVoice: "male",
  rep5Scenarios: [
    {
      id: "s15-t1",
      label: "TOPIC",
      labelEs: "TEMA",
      situation: "SOCIAL MEDIA DOES MORE HARM THAN GOOD.",
      situationEs: "LAS REDES SOCIALES HACEN MÁS DAÑO QUE BIEN.",
      rep5Prompt: { question: "Do you agree that social media does more harm than good?", questionEs: "¿Estás de acuerdo en que las redes sociales hacen más daño que bien?" },
      rep5Turns: [
        { id: "s15-t1-turn1", label: "OPPONENT", labelEs: "OPONENTE", text: "I disagree because social media connects people who would never meet otherwise.", es: "No estoy de acuerdo porque las redes sociales conectan a personas que de otra forma nunca se conocerían.", voice: "female" },
        { id: "s15-t1-turn2", label: "OPPONENT", labelEs: "OPONENTE", text: "But what about small businesses that grow because of social media?", es: "Pero ¿qué hay de los pequeños negocios que crecen gracias a las redes sociales?", voice: "female" },
        { id: "s15-t1-turn3", label: "OPPONENT", labelEs: "OPONENTE", text: "After hearing the other side, what's your final opinion?", es: "Después de escuchar el otro lado, ¿cuál es tu opinión final?", voice: "female" },
      ],
    },
    {
      id: "s15-t2",
      label: "TOPIC",
      labelEs: "TEMA",
      situation: "WORKING FROM HOME IS BETTER THAN WORKING IN AN OFFICE.",
      situationEs: "TRABAJAR DESDE CASA ES MEJOR QUE TRABAJAR EN UNA OFICINA.",
      rep5Prompt: { question: "Is working from home better than working in an office?", questionEs: "¿Trabajar desde casa es mejor que trabajar en una oficina?" },
      rep5Turns: [
        { id: "s15-t2-turn1", label: "OPPONENT", labelEs: "OPONENTE", text: "I disagree because offices make teamwork and mentorship much easier.", es: "No estoy de acuerdo porque las oficinas facilitan mucho el trabajo en equipo y la mentoría.", voice: "male" },
        { id: "s15-t2-turn2", label: "OPPONENT", labelEs: "OPONENTE", text: "What about new employees who need guidance in person?", es: "¿Qué hay de los nuevos empleados que necesitan guía en persona?", voice: "male" },
        { id: "s15-t2-turn3", label: "OPPONENT", labelEs: "OPONENTE", text: "After hearing the other side, what's your final opinion?", es: "Después de escuchar el otro lado, ¿cuál es tu opinión final?", voice: "male" },
      ],
    },
    {
      id: "s15-t3",
      label: "TOPIC",
      labelEs: "TEMA",
      situation: "AI WILL IMPROVE EDUCATION.",
      situationEs: "LA IA MEJORARÁ LA EDUCACIÓN.",
      rep5Prompt: { question: "Will AI improve education?", questionEs: "¿La IA mejorará la educación?" },
      rep5Turns: [
        { id: "s15-t3-turn1", label: "OPPONENT", labelEs: "OPONENTE", text: "I disagree because students might stop thinking for themselves.", es: "No estoy de acuerdo porque los estudiantes podrían dejar de pensar por sí mismos.", voice: "female" },
        { id: "s15-t3-turn2", label: "OPPONENT", labelEs: "OPONENTE", text: "What about students who don't have access to good teachers today?", es: "¿Qué hay de los estudiantes que hoy no tienen acceso a buenos maestros?", voice: "female" },
        { id: "s15-t3-turn3", label: "OPPONENT", labelEs: "OPONENTE", text: "After hearing the other side, what's your final opinion?", es: "Después de escuchar el otro lado, ¿cuál es tu opinión final?", voice: "female" },
      ],
    },
    {
      id: "s15-t4",
      label: "TOPIC",
      labelEs: "TEMA",
      situation: "MONEY IS MORE IMPORTANT THAN FREE TIME.",
      situationEs: "EL DINERO ES MÁS IMPORTANTE QUE EL TIEMPO LIBRE.",
      rep5Prompt: { question: "Is money more important than free time?", questionEs: "¿El dinero es más importante que el tiempo libre?" },
      rep5Turns: [
        { id: "s15-t4-turn1", label: "OPPONENT", labelEs: "OPONENTE", text: "I disagree because time is the one thing you can't get back once it's gone.", es: "No estoy de acuerdo porque el tiempo es lo único que no puedes recuperar una vez que se fue.", voice: "male" },
        { id: "s15-t4-turn2", label: "OPPONENT", labelEs: "OPONENTE", text: "What about people who need money just to survive?", es: "¿Qué hay de la gente que necesita dinero solo para sobrevivir?", voice: "male" },
        { id: "s15-t4-turn3", label: "OPPONENT", labelEs: "OPONENTE", text: "After hearing the other side, what's your final opinion?", es: "Después de escuchar el otro lado, ¿cuál es tu opinión final?", voice: "male" },
      ],
    },
    {
      id: "s15-t5",
      label: "TOPIC",
      labelEs: "TEMA",
      situation: "LIVING IN A CITY IS BETTER THAN LIVING IN THE COUNTRY.",
      situationEs: "VIVIR EN LA CIUDAD ES MEJOR QUE VIVIR EN EL CAMPO.",
      rep5Prompt: { question: "Is living in a city better than living in the country?", questionEs: "¿Vivir en la ciudad es mejor que vivir en el campo?" },
      rep5Turns: [
        { id: "s15-t5-turn1", label: "OPPONENT", labelEs: "OPONENTE", text: "I disagree because the country offers a calmer, healthier lifestyle.", es: "No estoy de acuerdo porque el campo ofrece un estilo de vida más tranquilo y saludable.", voice: "female" },
        { id: "s15-t5-turn2", label: "OPPONENT", labelEs: "OPONENTE", text: "What about people who need better healthcare or job options?", es: "¿Qué hay de la gente que necesita mejor atención médica u opciones de trabajo?", voice: "female" },
        { id: "s15-t5-turn3", label: "OPPONENT", labelEs: "OPONENTE", text: "After hearing the other side, what's your final opinion?", es: "Después de escuchar el otro lado, ¿cuál es tu opinión final?", voice: "female" },
      ],
    },
  ],
  testReady: {
    type: "speak-now",
    title: "SPEAK NOW — OPINION",
    titleEs: "HABLA AHORA — OPINIÓN",
    instruction: "8 seconds to think. Then speak for about 60 seconds.",
    instructionEs: "8 segundos para pensar. Luego habla unos 60 segundos.",
    thinkSeconds: 8,
    speakSeconds: 60,
    items: [
      {
        id: "s15-tr1",
        text: "Is it better to make decisions quickly or take a long time to decide?",
        textEs: "¿Es mejor tomar decisiones rápido o tardarse mucho en decidir?",
        chunks: ["OPINION?", "WHY?", "EXAMPLE?", "OTHER SIDE?"],
        maxSeconds: 60,
      },
    ],
  },
});

/* ====================================================================== */
/* WEEK 4 — LEAD, ADAPT & IMPROVISE                                          */
/* ====================================================================== */

/* ---------------------------- DAY 16 — THE FUTURE IS UNCERTAIN ---------------------------- */

const d16 = sharksDay({
  day: 16,
  topic: "The Future Is Uncertain",
  topicEs: "El futuro es incierto",
  focus: "Future — predict and adapt your prediction after new information (AI and the future of work)",
  focusEs: "Futuro — predice y adapta tu predicción con información nueva (la IA y el futuro del trabajo)",
  intro: {
    title: "THE FUTURE IS UNCERTAIN",
    titleEs: "EL FUTURO ES INCIERTO",
    lead: "Predict how AI will change work. Then two pieces of new information arrive — update your prediction each time.",
    leadEs: "Predice cómo la IA cambiará el trabajo. Luego llegan dos datos nuevos: actualiza tu predicción cada vez.",
    examples: ["I think that AI will handle most repetitive tasks.", "If that happens, people will need different skills.", "That would probably mean more focus on communication."],
    goal: "Prediction role play: 2 new-info turns. Speak about 90 seconds in total.",
    goalEs: "Role play de predicción: 2 turnos con información nueva. Habla unos 90 segundos en total.",
    cta: START,
  },
  lines: [
    l("s16-1", "I think that | AI will change most jobs | in the next ten years.", "Creo que la IA cambiará la mayoría de los trabajos en los próximos diez años."),
    l("s16-2", "The main reason is that | it's already handling repetitive tasks.", "La razón principal es que ya está manejando tareas repetitivas."),
    l("s16-3", "If that happens, | people will need to focus on skills AI can't easily copy.", "Si eso pasa, la gente necesitará enfocarse en habilidades que la IA no pueda copiar fácilmente."),
    l("s16-4", "That would probably mean | more value on communication and judgment.", "Eso probablemente signifique más valor en la comunicación y el juicio."),
    l("s16-5", "Imagine that AI can already do half of your job; | that would change how you spend your time.", "Imagina que la IA ya puede hacer la mitad de tu trabajo; eso cambiaría cómo usas tu tiempo."),
    l("s16-6", "In that case, | I would focus on the parts that need a human touch.", "En ese caso, me enfocaría en las partes que necesitan un toque humano."),
    l("s16-7", "If companies start valuing problem-solving more than speed, | that changes my whole plan.", "Si las empresas empiezan a valorar más la resolución de problemas que la velocidad, eso cambia todo mi plan."),
    l("s16-8", "Overall, | the skill I'd focus on now | is adapting quickly.", "En general, la habilidad en la que me enfocaría ahora es adaptarme rápido."),
  ],
  rep2Chunks: chunks4("s16"),
  prompts: [
    q("s16-p1", "How will AI change work?", "¿Cómo cambiará la IA el trabajo?", "I think that…", "Creo que…", "PREDICT"),
    q("s16-p2", "Why?", "¿Por qué?", "The main reason is that…", "La razón principal es que…", "WHY", "explain"),
    q("s16-p3", "Which jobs may change most?", "¿Qué trabajos cambiarán más?", "The jobs that may change most are…", "Los trabajos que más cambiarán son…", "WHICH JOBS", "explain"),
    q("s16-p4", "What skills may become more valuable?", "¿Qué habilidades serán más valiosas?", "That would probably mean…", "Eso probablemente signifique…", "SKILLS", "justify"),
    q("s16-p5", "What would you do to prepare?", "¿Qué harías para prepararte?", "If that happens, I would…", "Si eso pasa, yo…", "PREPARE", "adapt"),
  ],
  cues: ["PREDICT", "WHY", "WHICH JOBS", "SKILLS", "PREPARE"],
  powerChunks: { core: ["I think that…", "if that happens…"], stretch: "that would probably mean…" },
  sceneImage: { src: sceneD16, alt: "A professional looking at a screen split between routine tasks handled by a robot and human-led tasks like meetings and negotiation", altEs: "Un profesional mirando una pantalla dividida entre tareas rutinarias manejadas por un robot y tareas humanas como reuniones y negociación" },
  goalSeconds: [75, 90],
  goalSentences: 10,
  rep5Prompt: { question: "How do you think AI will change your work?", questionEs: "¿Cómo crees que la IA cambiará tu trabajo?" },
  rep5Tips: {
    en: "I think that… → the main reason is… → react to each new piece of information → end with the skill you'd focus on. Take 5–10 seconds to think first.",
    es: "I think that… → the main reason is… → reacciona a cada dato nuevo → termina con la habilidad en la que te enfocarías. Tómate 5–10 segundos para pensar primero.",
  },
  rep5Label: "adapt",
  rep5Turns: [
    { id: "s16-turn1", label: "PARTNER", labelEs: "COMPAÑERO", text: "How do you think AI will change your work?", es: "¿Cómo crees que la IA cambiará tu trabajo?", voice: "female" },
    { id: "s16-turn2", label: "PARTNER", labelEs: "COMPAÑERO", text: "Imagine AI can now do 50% of the tasks in your current job.", es: "Imagina que la IA ya puede hacer el 50% de las tareas de tu trabajo actual.", voice: "female" },
    { id: "s16-turn3", label: "PARTNER", labelEs: "COMPAÑERO", text: "Your company now values communication and problem-solving more than technical speed.", es: "Tu empresa ahora valora más la comunicación y la resolución de problemas que la velocidad técnica.", voice: "female" },
    { id: "s16-turn4", label: "PARTNER", labelEs: "COMPAÑERO", text: "What skill would you focus on now?", es: "¿En qué habilidad te enfocarías ahora?", voice: "female" },
  ],
  rep5Toolbox: ["I think that…", "If that happens…", "That would probably mean…", "In that case…", "Overall…"],
  speakerVoice: "male",
  testReady: {
    type: "listen-respond",
    title: "LISTEN + INFERENCE",
    titleEs: "ESCUCHA + INFERENCIA",
    instruction: "Two speakers about the future of work. Listen once, then answer 4 questions out loud.",
    instructionEs: "Dos personas hablan del futuro del trabajo. Escucha una vez y responde 4 preguntas en voz alta.",
    passage:
      "Diego: I believe most customer service jobs will be automated within ten years. Companies want to cut costs, and AI is already good enough for simple questions. Valeria: I'm not so sure. I think AI will handle the easy cases, but people will still be needed for anything emotional or complicated. Diego: Maybe, but that means far fewer jobs than we have today. Valeria: True, but it could also mean the jobs that remain pay better, because they'll require more skill.",
    passageParts: [
      { voice: "male", text: "Diego: I believe most customer service jobs will be automated within ten years. Companies want to cut costs, and AI is already good enough for simple questions." },
      { voice: "female", text: "Valeria: I'm not so sure. I think AI will handle the easy cases, but people will still be needed for anything emotional or complicated." },
      { voice: "male", text: "Diego: Maybe, but that means far fewer jobs than we have today." },
      { voice: "female", text: "Valeria: True, but it could also mean the jobs that remain pay better, because they'll require more skill." },
    ],
    items: [
      { id: "s16-tr1", audio: "What does Diego believe?", text: "What does Diego believe?", textEs: "¿Qué cree Diego?", maxSeconds: 15 },
      { id: "s16-tr2", audio: "What does Valeria believe?", text: "What does Valeria believe?", textEs: "¿Qué cree Valeria?", maxSeconds: 15 },
      { id: "s16-tr3", audio: "What might happen to the jobs that remain?", text: "What might happen to the jobs that remain?", textEs: "¿Qué podría pasar con los trabajos que queden?", maxSeconds: 15 },
      { id: "s16-tr4", audio: "What do you think will happen?", text: "What do you think will happen?", textEs: "¿Qué crees que pasará?", maxSeconds: 20 },
    ],
  },
});

/* ---------------------------- DAY 17 — SOMETHING I'VE ALWAYS WANTED TO DO ---------------------------- */

const d17 = sharksDay({
  day: 17,
  topic: "Something I've Always Wanted to Do",
  topicEs: "Algo que siempre he querido hacer",
  focus: "Present perfect — explain a dream, obstacles and trade-offs",
  focusEs: "Presente perfecto — explica un sueño, obstáculos y sacrificios",
  intro: {
    title: "SOMETHING I'VE ALWAYS WANTED TO DO",
    titleEs: "ALGO QUE SIEMPRE HE QUERIDO HACER",
    lead: "A dream you haven't done yet. Explain why, what's stopped you, and whether you'd still want it if it got harder or more expensive.",
    leadEs: "Un sueño que no has cumplido todavía. Explica por qué, qué te ha detenido y si aún lo querrías si se pusiera más difícil o costoso.",
    examples: ["I've always wanted to learn to play an instrument.", "One thing that has stopped me is time.", "For it to happen, I would need to make it a real priority."],
    goal: "Speak for about 90 seconds, reacting to two follow-ups.",
    goalEs: "Habla unos 90 segundos, reaccionando a dos preguntas de seguimiento.",
    cta: START,
  },
  lines: [
    l("s17-1", "I've always wanted to | learn to play the guitar.", "Siempre he querido aprender a tocar la guitarra."),
    l("s17-2", "I've loved music | since I was a kid, | but I've never had the time to really commit.", "He amado la música desde niño, pero nunca he tenido el tiempo para comprometerme de verdad."),
    l("s17-3", "One thing that has stopped me is | work; | I'm usually too tired at night.", "Una cosa que me ha detenido es el trabajo; normalmente estoy muy cansado por la noche."),
    l("s17-4", "Another thing has been | the cost of a good instrument and classes.", "Otra cosa ha sido el costo de un buen instrumento y de las clases."),
    l("s17-5", "For it to happen, | I would need to set aside time every week, | no matter what.", "Para que suceda, necesitaría reservar tiempo cada semana, pase lo que pase."),
    l("s17-6", "If it cost twice as much as I expected, | I would probably start with a cheaper instrument first.", "Si costara el doble de lo que esperaba, probablemente empezaría con un instrumento más barato primero."),
    l("s17-7", "Even so, | I would still want to do it, | because it's about joy, not perfection.", "Aun así, todavía querría hacerlo, porque se trata de disfrutarlo, no de la perfección."),
    l("s17-8", "This year, | I've decided to finally start, | even if it's just fifteen minutes a day.", "Este año decidí finalmente empezar, aunque sean solo quince minutos al día."),
  ],
  rep2Chunks: chunks4("s17"),
  prompts: [
    q("s17-p1", "What have you always wanted to do?", "¿Qué siempre has querido hacer?", "I've always wanted to…", "Siempre he querido…", "DREAM"),
    q("s17-p2", "Why?", "¿Por qué?", "The main reason is that…", "La razón principal es que…", "WHY", "explain"),
    q("s17-p3", "Why haven't you done it yet?", "¿Por qué no lo has hecho todavía?", "One thing that has stopped me is…", "Una cosa que me ha detenido es…", "OBSTACLE", "justify"),
    q("s17-p4", "What would need to change?", "¿Qué necesitaría cambiar?", "For it to happen, I would need to…", "Para que suceda, necesitaría…", "NEEDED", "justify"),
    q("s17-p5", "Would you still want it if it became harder or more expensive?", "¿Aún lo querrías si se volviera más difícil o costoso?", "Even so, I would still…", "Aun así, todavía…", "STILL WANT?", "defend"),
  ],
  cues: ["DREAM", "WHY", "OBSTACLE", "NEEDED", "STILL WANT?"],
  powerChunks: { core: ["I've always wanted to…", "one thing that has stopped me is…"], stretch: "for it to happen…" },
  sceneImage: { src: sceneD17, alt: "A person looking wistfully at a guitar in a shop window, then later playing it happily at home", altEs: "Una persona mirando con nostalgia una guitarra en el escaparate de una tienda, y luego tocándola felizmente en casa" },
  goalSeconds: [75, 90],
  goalSentences: 10,
  rep5Prompt: { question: "Tell me about something you've always wanted to do.", questionEs: "Cuéntame sobre algo que siempre has querido hacer." },
  rep5Tips: {
    en: "I've always wanted to… → why → what's stopped you → react to the cost twist → would you still want it. Take 5–10 seconds to think first.",
    es: "I've always wanted to… → por qué → qué te ha detenido → reacciona al giro del costo → ¿aún lo querrías? Tómate 5–10 segundos para pensar primero.",
  },
  rep5Label: "justify",
  rep5Turns: [
    { id: "s17-turn1", label: "FRIEND", labelEs: "AMIGO", text: "Tell me about something you've always wanted to do.", es: "Cuéntame sobre algo que siempre has querido hacer.", voice: "male" },
    { id: "s17-turn2", label: "FRIEND", labelEs: "AMIGO", text: "Why haven't you done it yet?", es: "¿Por qué no lo has hecho todavía?", voice: "male" },
    { id: "s17-turn3", label: "FRIEND", labelEs: "AMIGO", text: "What if it cost twice as much as you expected?", es: "¿Y si costara el doble de lo que esperabas?", voice: "male" },
    { id: "s17-turn4", label: "FRIEND", labelEs: "AMIGO", text: "Would you still do it?", es: "¿Aún lo harías?", voice: "male" },
  ],
  rep5Toolbox: ["I've always wanted to…", "One thing that has stopped me is…", "For it to happen…", "Even so…", "This year…"],
  speakerVoice: "female",
});

/* ---------------------------- DAY 18 — MY ENGLISH JOURNEY ---------------------------- */

const d18 = sharksDay({
  day: 18,
  topic: "My English Journey",
  topicEs: "Mi camino con el inglés",
  focus: "Present perfect progressive — reflect on your learning journey honestly",
  focusEs: "Presente perfecto progresivo — reflexiona con honestidad sobre tu proceso de aprendizaje",
  intro: {
    title: "MY ENGLISH JOURNEY",
    titleEs: "MI CAMINO CON EL INGLÉS",
    lead: "How long, what you've worked on, what's easier, what's still hard, what's next. Be honest — this is a reflection, not a performance.",
    leadEs: "Cuánto tiempo, en qué has trabajado, qué es más fácil, qué sigue siendo difícil, qué sigue. Sé honesto: es una reflexión, no una actuación.",
    examples: ["I've been working on my speaking for a few months.", "One thing I've noticed is that I hesitate less.", "What I still need to improve is my vocabulary."],
    goal: "Speak for about 90 seconds. A personal, honest reflection.",
    goalEs: "Habla unos 90 segundos. Una reflexión personal y honesta.",
    cta: START,
  },
  lines: [
    l("s18-1", "I've been studying English | for a while now, | on and off.", "He estado estudiando inglés desde hace un tiempo, con altibajos."),
    l("s18-2", "I've been working on | speaking without stopping to translate.", "He estado trabajando en hablar sin detenerme a traducir."),
    l("s18-3", "One thing I've noticed is that | I hesitate less than before.", "Una cosa que he notado es que dudo menos que antes."),
    l("s18-4", "Listening has become easier, | especially with natural speed.", "El listening se ha vuelto más fácil, especialmente a velocidad natural."),
    l("s18-5", "What is still difficult is | finding the right word quickly | under pressure.", "Lo que todavía es difícil es encontrar la palabra correcta rápido bajo presión."),
    l("s18-6", "What I still need to improve is | my vocabulary in professional contexts.", "Lo que todavía necesito mejorar es mi vocabulario en contextos profesionales."),
    l("s18-7", "I've been recording myself along the way, | and I can really hear the difference.", "Me he estado grabando en el camino, y de verdad puedo escuchar la diferencia."),
    l("s18-8", "Going forward, | I want to focus on speaking naturally under pressure.", "De aquí en adelante, quiero enfocarme en hablar de forma natural bajo presión."),
  ],
  rep2Chunks: chunks4("s18"),
  prompts: [
    q("s18-p1", "How long have you been studying English?", "¿Cuánto tiempo llevas estudiando inglés?", "I've been studying English for…", "He estado estudiando inglés por…", "HOW LONG"),
    q("s18-p2", "What have you been working on most?", "¿En qué has trabajado más?", "I've been working on…", "He estado trabajando en…", "WORKING ON", "explain"),
    q("s18-p3", "What has become easier?", "¿Qué se ha vuelto más fácil?", "One thing I've noticed is…", "Una cosa que he notado es…", "EASIER", "explain"),
    q("s18-p4", "What is still difficult?", "¿Qué sigue siendo difícil?", "What is still difficult is…", "Lo que todavía es difícil es…", "DIFFICULT", "justify"),
    q("s18-p5", "What will you focus on next?", "¿En qué te enfocarás después?", "What I still need to improve is…", "Lo que todavía necesito mejorar es…", "NEXT", "justify"),
  ],
  cues: ["HOW LONG", "WORKING ON", "EASIER", "DIFFICULT", "NEXT"],
  powerChunks: { core: ["I've been working on…", "one thing I've noticed is…"], stretch: "what I still need to improve is…" },
  sceneImage: { src: sceneD18, alt: "A person reviewing their own recorded speaking practice on a phone timeline, with a calendar showing months of consistent effort", altEs: "Una persona revisando su propia práctica de speaking grabada en la línea de tiempo del teléfono, con un calendario que muestra meses de esfuerzo constante" },
  goalSeconds: [75, 90],
  goalSentences: 10,
  rep5Prompt: { question: "Tell me about your English journey.", questionEs: "Cuéntame sobre tu camino con el inglés." },
  rep5Tips: {
    en: "How long → what you've been working on → what's easier → what's still difficult → what's next. Take 5–10 seconds to think first.",
    es: "Cuánto tiempo → en qué has trabajado → qué es más fácil → qué sigue difícil → qué sigue. Tómate 5–10 segundos para pensar primero.",
  },
  rep5Label: "explain",
  speakerVoice: "male",
  testReady: {
    type: "speak-now",
    title: "SPEAK NOW — REFLECTION",
    titleEs: "HABLA AHORA — REFLEXIÓN",
    instruction: "5 seconds to think. Then speak for about 60 seconds.",
    instructionEs: "5 segundos para pensar. Luego habla unos 60 segundos.",
    thinkSeconds: 5,
    speakSeconds: 60,
    items: [
      {
        id: "s18-tr1",
        text: "What has been the biggest challenge in learning English, and how have you dealt with it?",
        textEs: "¿Cuál ha sido el mayor reto al aprender inglés y cómo lo has manejado?",
        chunks: ["CHALLENGE?", "HOW?", "RESULT?"],
        maxSeconds: 60,
      },
    ],
  },
});

/* ---------------------------- DAY 19 — KEEP THE CONVERSATION GOING ---------------------------- */

const d19 = sharksDay({
  day: 19,
  topic: "Keep the Conversation Going",
  topicEs: "Mantén viva la conversación",
  focus: "Mixed tenses — maintain a human conversation instead of only answering",
  focusEs: "Tiempos mixtos — mantén una conversación humana en lugar de solo responder",
  intro: {
    title: "KEEP THE CONVERSATION GOING",
    titleEs: "MANTÉN VIVA LA CONVERSACIÓN",
    lead: "ANSWER + ADD + ASK. Talk about someone important in your life, add detail, then ask a natural question back.",
    leadEs: "RESPONDE + AGREGA + PREGUNTA. Habla de alguien importante en tu vida, agrega un detalle y luego haz una pregunta natural.",
    examples: ["I've known my best friend for ten years, and we've been through a lot together.", "He's helped me during difficult moments.", "How long have you known your best friend?"],
    goal: "Fixed conversation: answer, add, and ask a question back. Speak 90–105 seconds in total.",
    goalEs: "Conversación fija: responde, agrega y haz una pregunta. Habla 90–105 segundos en total.",
    cta: START,
  },
  lines: [
    l("s19-1", "I've known my best friend | for about ten years, | and we've been through a lot together.", "Conozco a mi mejor amigo desde hace unos diez años, y hemos pasado por mucho juntos."),
    l("s19-2", "He's helped me | during some of my most difficult moments.", "Él me ha ayudado durante algunos de mis momentos más difíciles."),
    l("s19-3", "We met in college, | and we've stayed close | even though we live in different cities now.", "Nos conocimos en la universidad, y hemos seguido siendo cercanos aunque ahora vivimos en ciudades distintas."),
    l("s19-4", "What I've learned from him is | that real friendship survives distance.", "Lo que he aprendido de él es que la verdadera amistad sobrevive a la distancia."),
    l("s19-5", "How long have you known | your best friend?", "¿Cuánto tiempo llevas conociendo a tu mejor amigo?"),
    l("s19-6", "That reminds me of | a trip we took together last year.", "Eso me recuerda un viaje que hicimos juntos el año pasado."),
    l("s19-7", "How about you — | do you keep in touch with old friends?", "¿Y tú? ¿Mantienes el contacto con amigos de antes?"),
    l("s19-8", "It's nice to talk about the people | who really matter to us.", "Es lindo hablar de las personas que realmente nos importan."),
  ],
  rep2Chunks: chunks4("s19"),
  prompts: [
    q("s19-p1", "Tell me about someone important in your life.", "Cuéntame sobre alguien importante en tu vida.", "I've known… for…", "Conozco a… desde hace…", "ANSWER"),
    q("s19-p2", "Why are they important?", "¿Por qué es importante?", "He's/She's helped me…", "Él/Ella me ha ayudado…", "ADD", "explain"),
    q("s19-p3", "What have you learned from them?", "¿Qué has aprendido de esa persona?", "What I've learned from them is…", "Lo que he aprendido de esa persona es…", "ADD", "explain"),
    q("s19-p4", "What question could you ask the other person?", "¿Qué pregunta podrías hacerle a la otra persona?", "How about you? / What about…?", "¿Y tú? / ¿Qué hay de…?", "ASK"),
    q("s19-p5", "How would you keep the conversation going?", "¿Cómo mantendrías la conversación?", "That reminds me of…", "Eso me recuerda a…", "KEEP GOING"),
  ],
  cues: ["ANSWER", "ADD", "ASK", "REACT", "KEEP GOING"],
  powerChunks: { core: ["how about you?", "what about…?"], stretch: "that reminds me of…" },
  sceneImage: { src: sceneD19, alt: "Two friends talking warmly over coffee, one leaning in and asking a question", altEs: "Dos amigos hablando con calidez tomando café, uno inclinándose para hacer una pregunta" },
  goalSeconds: [75, 90],
  goalSentences: 10,
  rep5Prompt: { question: "Tell your partner about someone important in your life, and keep the conversation going.", questionEs: "Cuéntale a tu compañero sobre alguien importante en tu vida y mantén viva la conversación." },
  rep5Tips: {
    en: "ANSWER + ADD, then when prompted, ASK a natural question back and react to the answer. Take 5–10 seconds to think first.",
    es: "RESPONDE + AGREGA, y cuando te lo pidan, PREGUNTA algo natural y reacciona a la respuesta. Tómate 5–10 segundos para pensar primero.",
  },
  rep5Label: "adapt",
  rep5Turns: [
    { id: "s19-turn1", label: "PARTNER", labelEs: "COMPAÑERO", text: "Tell me about someone important in your life.", es: "Cuéntame sobre alguien importante en tu vida.", voice: "female" },
    { id: "s19-turn2", label: "PARTNER", labelEs: "COMPAÑERO", text: "What have you learned from that person?", es: "¿Qué has aprendido de esa persona?", voice: "female" },
    { id: "s19-turn3", label: "PARTNER", labelEs: "COMPAÑERO", text: "NOW ASK A NATURAL QUESTION BACK.", es: "AHORA HAZ UNA PREGUNTA NATURAL.", voice: "female" },
    { id: "s19-turn4", label: "PARTNER", labelEs: "COMPAÑERO", text: "Good question! I've known my best friend since childhood, and we still talk every week.", es: "¡Buena pregunta! Conozco a mi mejor amigo desde la infancia, y todavía hablamos cada semana.", voice: "female" },
  ],
  rep5Toolbox: ["I've known… for…", "What I've learned from them is…", "How about you?", "What about…?", "That reminds me of…"],
  speakerVoice: "male",
});

/* ---------------------------- DAY 20 — SHARKS FINAL ---------------------------- */

const FINAL_TOOLBOX = ["The main reason is…", "For example…", "Based on that new information…", "I see your point, but…", "In that case…", "Overall…"];

const finalTurns = (
  prefix: string,
  opening: string,
  openingEs: string,
  labels: [string, string],
  info1: [string, string],
  info2: [string, string],
  closing: [string, string],
  voice: "female" | "male",
) => [
  { id: `${prefix}-turn1`, label: labels[0], labelEs: labels[1], text: opening, es: openingEs, voice },
  { id: `${prefix}-turn2`, label: labels[0], labelEs: labels[1], text: info1[0], es: info1[1], voice },
  { id: `${prefix}-turn3`, label: labels[0], labelEs: labels[1], text: info2[0], es: info2[1], voice },
  { id: `${prefix}-turn4`, label: labels[0], labelEs: labels[1], text: closing[0], es: closing[1], voice },
  { id: `${prefix}-turn5`, label: labels[0], labelEs: labels[1], text: "Summarize your final position.", es: "Resume tu posición final.", voice },
];

const d20 = sharksDay({
  day: 20,
  topic: "SHARKS Final — Adapt Under Pressure",
  topicEs: "Final SHARKS — Adáptate bajo presión",
  focus: "Transfer — understand · decide · justify · adapt to new information · summarize",
  focusEs: "Transferencia — entender · decidir · justificar · adaptarse a información nueva · resumir",
  intro: {
    title: "SHARKS FINAL",
    titleEs: "FINAL SHARKS",
    lead: "Adapt under pressure. You'll get ONE scenario — customer service, sales, workplace or a life decision. No full model today: only the skeleton. Understand, decide, explain why, adapt twice, then summarize.",
    leadEs: "Adáptate bajo presión. Recibirás UN escenario: servicio al cliente, ventas, trabajo o una decisión de vida. Hoy no hay modelo completo: solo el esqueleto. Entiende, decide, explica por qué, adáptate dos veces y luego resume.",
    examples: ["UNDERSTAND → DECIDE → WHY", "NEW INFO → ADAPT → SUMMARIZE", "Not perfect grammar. Clear reasoning under pressure."],
    goal: "Final challenge: 4–5 fixed turns. Speak 90–120 seconds in total. 10–12 connected ideas.",
    goalEs: "Reto final: 4–5 turnos fijos. Habla 90–120 segundos en total. 10–12 ideas conectadas.",
    cta: START,
  },
  lines: [
    l("s20-1", "I understand the situation, | and here's what I'd do.", "Entiendo la situación, y esto es lo que haría."),
    l("s20-2", "My decision is | based on what matters most right now.", "Mi decisión se basa en lo que más importa ahora mismo."),
    l("s20-3", "The main reason is | the priority I see in this case.", "La razón principal es la prioridad que veo en este caso."),
    l("s20-4", "Based on that new information, | I need to adjust my plan.", "Según esa nueva información, necesito ajustar mi plan."),
    l("s20-5", "In that case, | a different approach makes more sense.", "En ese caso, un enfoque diferente tiene más sentido."),
    l("s20-6", "One more change, | and I would adapt again.", "Un cambio más, y me adaptaría otra vez."),
    l("s20-7", "Even with the pressure, | I can still explain my choice clearly.", "Incluso bajo presión, todavía puedo explicar mi elección con claridad."),
    l("s20-8", "To summarize, | this is my final position | and why I hold it.", "Para resumir, esta es mi postura final y por qué la sostengo."),
  ],
  rep2Chunks: chunks4("s20"),
  prompts: [
    q("s20-p1", "What is happening in this situation?", "¿Qué está pasando en esta situación?", "If I understand correctly, …", "Si entiendo correctamente, …", "UNDERSTAND", "clarify"),
    q("s20-p2", "What is your decision?", "¿Cuál es tu decisión?", "My decision is…", "Mi decisión es…", "DECIDE"),
    q("s20-p3", "Why?", "¿Por qué?", "The main reason is that…", "La razón principal es que…", "WHY", "explain"),
    q("s20-p4", "New information just changed things. How do you respond?", "Información nueva acaba de cambiar las cosas. ¿Cómo respondes?", "Based on that new information, …", "Según esa nueva información, …", "ADAPT", "adapt"),
    q("s20-p5", "Summarize your final position.", "Resume tu postura final.", "To summarize, my final position is…", "Para resumir, mi postura final es…", "SUMMARIZE", "defend"),
  ],
  cues: ["UNDERSTAND", "DECIDE", "WHY", "NEW INFO", "ADAPT", "SUMMARIZE"],
  rep5Skeleton: ["UNDERSTAND", "DECIDE", "WHY", "NEW INFO", "ADAPT", "SUMMARIZE"],
  powerChunks: { core: ["based on that new information…", "in that case…"], stretch: "to summarize…" },
  sceneImage: { src: sceneD20, alt: "A confident professional under pressure, juggling four scenario tiles: customer service, sales, workplace and a life decision", altEs: "Un profesional seguro bajo presión, manejando cuatro escenarios: servicio al cliente, ventas, trabajo y una decisión de vida" },
  goalSeconds: [90, 120],
  goalSentences: 12,
  hideModelText: true,
  rep5Prompt: { question: "Adapt under pressure.", questionEs: "Adáptate bajo presión." },
  rep5Tips: {
    en: "5 seconds to think. UNDERSTAND → DECIDE → WHY → NEW INFO → ADAPT → SUMMARIZE. Speak 90–120 seconds in total.",
    es: "5 segundos para pensar. UNDERSTAND → DECIDE → WHY → NEW INFO → ADAPT → SUMMARIZE. Habla 90–120 segundos en total.",
  },
  rep5Label: "adapt",
  rep5Toolbox: FINAL_TOOLBOX,
  rep5Scenarios: [
    {
      id: "s20-customer",
      label: "CUSTOMER SERVICE",
      labelEs: "SERVICIO AL CLIENTE",
      situation: "A customer has contacted your company three times and nobody has solved the problem. The last agent promised a refund that turns out not to apply, and then the customer changes what they actually want.",
      situationEs: "Un cliente ha contactado a tu empresa tres veces y nadie ha resuelto el problema. El último agente prometió un reembolso que resulta que no aplica, y luego el cliente cambia lo que realmente quiere.",
      rep5Prompt: { question: "Handle the customer's problem as new information changes what they need.", questionEs: "Maneja el problema del cliente mientras la información nueva cambia lo que necesita." },
      rep5Turns: finalTurns(
        "s20-customer",
        "I've contacted your company three times and nobody has solved my problem.",
        "He contactado a su empresa tres veces y nadie ha resuelto mi problema.",
        ["CUSTOMER", "CLIENTE"],
        ["The last agent promised me a refund, but now I was told I'm not eligible.", "El último agente me prometió un reembolso, pero ahora me dijeron que no califico."],
        ["Actually, I don't need the refund if you can solve the original problem today.", "En realidad, no necesito el reembolso si pueden resolver el problema original hoy."],
        ["What will you do for me now?", "¿Qué va a hacer por mí ahora?"],
        "female",
      ),
    },
    {
      id: "s20-sales",
      label: "SALES",
      labelEs: "VENTAS",
      situation: "A customer wants the cheapest plan possible, then reveals that reliability actually matters a lot, and finally reveals that their company will cover part of the cost.",
      situationEs: "Un cliente quiere el plan más barato posible, luego revela que la confiabilidad en realidad le importa mucho, y finalmente revela que su empresa cubrirá parte del costo.",
      rep5Prompt: { question: "Recommend a plan and adapt it twice as the customer's situation changes.", questionEs: "Recomienda un plan y adáptalo dos veces mientras cambia la situación del cliente." },
      rep5Turns: finalTurns(
        "s20-sales",
        "I need the cheapest plan possible.",
        "Necesito el plan más barato posible.",
        ["CUSTOMER", "CLIENTE"],
        ["I work from home and reliability is actually very important.", "Trabajo desde casa y la confiabilidad en realidad es muy importante."],
        ["My company will pay part of the cost.", "Mi empresa pagará parte del costo."],
        ["What's your final recommendation?", "¿Cuál es tu recomendación final?"],
        "male",
      ),
    },
    {
      id: "s20-work",
      label: "WORKPLACE",
      labelEs: "TRABAJO",
      situation: "Your manager needs a project finished by Friday, then two team members call in sick, and then the client suddenly needs the most important part a day earlier.",
      situationEs: "Tu gerente necesita un proyecto terminado para el viernes, luego dos miembros del equipo se reportan enfermos, y después el cliente de repente necesita la parte más importante un día antes.",
      rep5Prompt: { question: "Plan the project and adapt as the situation gets harder.", questionEs: "Planea el proyecto y adáptate mientras la situación se complica." },
      rep5Turns: finalTurns(
        "s20-work",
        "We need this project finished by Friday. What would you do?",
        "Necesitamos terminar este proyecto para el viernes. ¿Qué harías?",
        ["MANAGER", "GERENTE"],
        ["Two members of your team just called in sick.", "Dos miembros de tu equipo acaban de reportarse enfermos."],
        ["The client now needs the most important part tomorrow.", "El cliente ahora necesita la parte más importante mañana."],
        ["What would you prioritize now, and why?", "¿Qué priorizarías ahora, y por qué?"],
        "female",
      ),
    },
    {
      id: "s20-life",
      label: "LIFE DECISION",
      labelEs: "DECISIÓN DE VIDA",
      situation: "You receive a great job opportunity in another country, then learn the timeline is much tighter than expected, and then your family asks you to wait.",
      situationEs: "Recibes una gran oportunidad de trabajo en otro país, luego te enteras de que el plazo es mucho más ajustado de lo esperado, y luego tu familia te pide que esperes.",
      rep5Prompt: { question: "Decide what to do as new information changes the decision.", questionEs: "Decide qué hacer mientras la información nueva cambia la decisión." },
      rep5Turns: finalTurns(
        "s20-life",
        "You receive a great opportunity in another country. What do you do?",
        "Recibes una gran oportunidad en otro país. ¿Qué haces?",
        ["FRIEND", "AMIGO"],
        ["The salary is excellent, but you would need to move in two weeks.", "El salario es excelente, pero tendrías que mudarte en dos semanas."],
        ["Your family asks you to wait six months.", "Tu familia te pide que esperes seis meses."],
        ["What would you do now?", "¿Qué harías ahora?"],
        "male",
      ),
    },
  ],
  speakerVoice: "female",
  testReady: {
    type: "speak-now",
    title: "SPEAK NOW — UNEXPECTED SCENARIO",
    titleEs: "HABLA AHORA — ESCENARIO INESPERADO",
    instruction: "5 seconds to think. Then speak for about 70 seconds.",
    instructionEs: "5 segundos para pensar. Luego habla unos 70 segundos.",
    thinkSeconds: 5,
    speakSeconds: 70,
    items: [
      {
        id: "s20-tr1",
        text: "A plan you made suddenly fails. What do you do?",
        textEs: "Un plan que hiciste falla de repente. ¿Qué haces?",
        chunks: ["WHAT HAPPENED?", "DECISION?", "WHY?", "ADAPT?", "SUMMARIZE?"],
        maxSeconds: 70,
      },
    ],
  },
});

export const SHARKS_WEEKS_2_4_DAYS: CourseDay[] = [d6, d7, d8, d9, d10, d11, d12, d13, d14, d15, d16, d17, d18, d19, d20];
