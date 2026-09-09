import type { ReviewPractice } from "@/lib/review-types";
import scenePg1 from "@/assets/review/scene-ppast1-bruno.jpg";
import scenePg3 from "@/assets/review/scene-ppast3-renata.jpg";
import scenePg5 from "@/assets/review/scene-ppast5-tomas.jpg";

/**
 * REVIEW · PAST PROGRESSIVE — five static practices.
 *
 * Person of the learner's MAIN answers alternates: 3rd · 1st · 3rd · 1st · 3rd.
 * Bruno, Renata and Tomás are fictional practice characters with different
 * situations, each with a reference illustration of the scene.
 * All content is hand-written: nothing here is generated at page load.
 */
export const PAST_PROGRESSIVE_PRACTICES: ReviewPractice[] = [
  {
    number: 1,
    id: "pg-1-bruno",
    title: "The night of the blackout",
    titleEs: "La noche del apagón",
    person: "third",
    character: "Bruno",
    focus: "Third person affirmative: was / were + verb-ing for actions in progress in the past.",
    focusEs: "Tercera persona afirmativa: was / were + verbo -ing para acciones en progreso en el pasado.",
    reminder: {
      en: "With he or she you always need was + verb-ing. Never drop the was.",
      es: "Con he o she siempre necesitas was + verbo -ing. Nunca quites el was.",
    },
    showFullGuide: true,
    instructions: {
      en: "Last night the power went out at Bruno's house. Describe what was happening at that moment.",
      es: "Anoche se fue la luz en la casa de Bruno. Describe lo que estaba pasando en ese momento.",
    },
    sceneImage: { src: scenePg1, alt: "Bruno at home during the blackout last night", altEs: "Bruno en casa durante el apagón de anoche" },
    vocabulary: ["last night", "at that moment", "the power went out", "flashlight", "candles", "rain", "laptop", "outside"],
    lines: [
      { id: "pg1-l1", text: "Last night Bruno was working on his laptop.", es: "Anoche Bruno estaba trabajando en su laptop.", chunks: ["Last night", "Bruno was working", "on his laptop."] },
      { id: "pg1-l2", text: "It was raining hard outside.", es: "Estaba lloviendo fuerte afuera.", chunks: ["It was raining hard", "outside."] },
      { id: "pg1-l3", text: "His sister was studying in the next room.", es: "Su hermana estaba estudiando en el cuarto de al lado.", chunks: ["His sister was studying", "in the next room."] },
      { id: "pg1-l4", text: "They were listening to music when the power went out.", es: "Estaban escuchando música cuando se fue la luz.", chunks: ["They were listening to music", "when the power", "went out."] },
      { id: "pg1-l5", text: "Bruno was looking for a flashlight in the kitchen.", es: "Bruno estaba buscando una linterna en la cocina.", chunks: ["Bruno was looking", "for a flashlight", "in the kitchen."] },
      { id: "pg1-l6", text: "His parents were lighting candles in the living room.", es: "Sus papás estaban encendiendo velas en la sala.", chunks: ["His parents were lighting candles", "in the living room."] },
      { id: "pg1-l7", text: "He wasn't watching TV because the electricity was off.", es: "Él no estaba viendo tele porque no había electricidad.", chunks: ["He wasn't watching TV", "because the electricity", "was off."] },
      { id: "pg1-l8", text: "Everybody was waiting for the lights to come back.", es: "Todos estaban esperando a que volviera la luz.", chunks: ["Everybody was waiting", "for the lights", "to come back."] },
    ],
    questions: [
      { id: "pg1-q1", question: "What was Bruno doing when the power went out?", questionEs: "¿Qué estaba haciendo Bruno cuando se fue la luz?", hint: "He was…", hintEs: "Usa was + verbo con -ing." },
      { id: "pg1-q2", question: "Where was his sister studying?", questionEs: "¿Dónde estaba estudiando su hermana?", hint: "She was studying…", hintEs: "Di el lugar." },
      { id: "pg1-q3", question: "Why wasn't he watching TV?", questionEs: "¿Por qué no estaba viendo tele?", hint: "Because the electricity…", hintEs: "Da la razón con because." },
      { id: "pg1-q4", question: "Who was lighting the candles?", questionEs: "¿Quién estaba encendiendo las velas?", hint: "His parents were…", hintEs: "Con parents usas were." },
      { id: "pg1-q5", question: "How was the weather that night?", questionEs: "¿Cómo estaba el clima esa noche?", hint: "It was…", hintEs: "It was raining…" },
      { id: "pg1-q6", question: "When did the power go out?", questionEs: "¿Cuándo se fue la luz?", hint: "The power went out while…", hintEs: "Usa while + acción larga." },
    ],
    finalPrompt: {
      question: "Describe Bruno's house during the blackout. What was he doing, and what were the other people doing?",
      questionEs: "Describe la casa de Bruno durante el apagón. ¿Qué estaba haciendo él y qué estaban haciendo los demás?",
      tips: {
        en: "Use was / were + verb-ing in every sentence, and add last night or at that moment.",
        es: "Usa was / were + verbo -ing en cada oración, y agrega last night o at that moment.",
      },
    },
    grammarGoals: [
      "affirmative past progressive with was / were + verb-ing",
      "the verb be is never omitted (he was working, not he working)",
      "past time markers: last night, at that moment, when the power went out",
    ],
  },
  {
    number: 2,
    id: "pg-2-my-night",
    title: "What I was doing last night",
    titleEs: "Lo que estaba haciendo anoche",
    person: "first",
    character: null,
    focus: "First person, negatives with wasn't, and -ing spelling changes.",
    focusEs: "Primera persona, negativas con wasn't y cambios de ortografía en -ing.",
    reminder: {
      en: "Negatives use wasn't / weren't — never didn't. Watch the spelling: make → making, run → running.",
      es: "Las negativas usan wasn't / weren't, nunca didn't. Cuida la ortografía: make → making, run → running.",
    },
    showFullGuide: false,
    instructions: {
      en: "Talk about last night: what you were doing and what you were not doing.",
      es: "Habla de anoche: qué estabas haciendo y qué no estabas haciendo.",
    },
    vocabulary: ["last night", "at eight", "I wasn't", "making dinner", "resting", "studying", "my family", "before bed"],
    lines: [
      { id: "pg2-l1", text: "Last night I was studying English at eight.", es: "Anoche estaba estudiando inglés a las ocho.", chunks: ["Last night", "I was studying English", "at eight."] },
      { id: "pg2-l2", text: "I wasn't working because it was my day off.", es: "No estaba trabajando porque era mi día libre.", chunks: ["I wasn't working", "because it was", "my day off."] },
      { id: "pg2-l3", text: "I was making dinner while my phone was charging.", es: "Estaba haciendo la cena mientras mi teléfono se cargaba.", chunks: ["I was making dinner", "while my phone", "was charging."] },
      { id: "pg2-l4", text: "My brother was watching a movie in the living room.", es: "Mi hermano estaba viendo una película en la sala.", chunks: ["My brother was watching a movie", "in the living room."] },
      { id: "pg2-l5", text: "We weren't talking much because we were tired.", es: "No estábamos hablando mucho porque estábamos cansados.", chunks: ["We weren't talking much", "because we were tired."] },
      { id: "pg2-l6", text: "I was practicing pronunciation before bed.", es: "Estaba practicando pronunciación antes de dormir.", chunks: ["I was practicing pronunciation", "before bed."] },
      { id: "pg2-l7", text: "At eleven I was already sleeping.", es: "A las once ya estaba durmiendo.", chunks: ["At eleven", "I was already sleeping."] },
      { id: "pg2-l8", text: "I wasn't running late, so I was taking my time.", es: "No iba tarde, así que me estaba tomando mi tiempo.", chunks: ["I wasn't running late,", "so I was taking my time."] },
    ],
    questions: [
      { id: "pg2-q1", question: "What were you doing last night at eight?", questionEs: "¿Qué estabas haciendo anoche a las ocho?", hint: "I was…", hintEs: "Usa I was + verbo -ing." },
      { id: "pg2-q2", question: "How long were you studying yesterday?", questionEs: "¿Cuánto tiempo estuviste estudiando ayer?", hint: "I was studying for…", hintEs: "Usa for + tiempo." },
      { id: "pg2-q3", question: "Who was with you at home last night?", questionEs: "¿Quién estaba contigo en casa anoche?", hint: "My… was…", hintEs: "Sujeto + was + -ing." },
      { id: "pg2-q4", question: "What were you not doing last night?", questionEs: "¿Qué no estabas haciendo anoche?", hint: "I wasn't…", hintEs: "wasn't + verbo -ing, nunca didn't." },
      { id: "pg2-q5", question: "Where were you sitting while you studied?", questionEs: "¿Dónde estabas sentado mientras estudiabas?", hint: "I was sitting…", hintEs: "Di el lugar." },
      { id: "pg2-q6", question: "Why were you tired last night?", questionEs: "¿Por qué estabas cansado anoche?", hint: "Because I was…", hintEs: "Da la razón con because." },
    ],
    finalPrompt: {
      question: "Tell me about last night. What were you doing, and what were you not doing?",
      questionEs: "Cuéntame de anoche. ¿Qué estabas haciendo y qué no estabas haciendo?",
      tips: {
        en: "Use I was + verb-ing, at least one negative with wasn't, and one sentence about someone else.",
        es: "Usa I was + verbo -ing, al menos una negativa con wasn't y una oración sobre otra persona.",
      },
    },
    grammarGoals: [
      "first person past progressive (I was + verb-ing)",
      "negatives with wasn't / weren't instead of didn't",
      "-ing spelling: making, running, sitting, studying",
    ],
  },
  {
    number: 3,
    id: "pg-3-renata",
    title: "Yesterday at the call center",
    titleEs: "Ayer en el call center",
    person: "third",
    character: "Renata",
    focus: "Questions and short answers in the past progressive.",
    focusEs: "Preguntas y respuestas cortas en pasado progresivo.",
    reminder: {
      en: "To ask, move was or were to the front: Was she helping? Answer short: Yes, she was / No, she wasn't.",
      es: "Para preguntar mueves was o were al inicio: Was she helping? Responde corto: Yes, she was / No, she wasn't.",
    },
    showFullGuide: false,
    instructions: {
      en: "Renata had a busy shift yesterday. Ask and answer about what was happening.",
      es: "Renata tuvo un turno ocupado ayer. Pregunta y responde sobre lo que estaba pasando.",
    },
    sceneImage: { src: scenePg3, alt: "Renata at the call center yesterday", altEs: "Renata en el call center ayer" },
    vocabulary: ["shift", "customer", "headset", "spill coffee", "take notes", "supervisor", "Was she…?", "Yes, she was"],
    lines: [
      { id: "pg3-l1", text: "Renata was taking calls all morning yesterday.", es: "Renata estuvo tomando llamadas toda la mañana de ayer.", chunks: ["Renata was taking calls", "all morning", "yesterday."] },
      { id: "pg3-l2", text: "Was she helping an angry customer? — Yes, she was.", es: "¿Estaba ayudando a un cliente molesto? — Sí.", chunks: ["Was she helping", "an angry customer?", "Yes, she was."] },
      { id: "pg3-l3", text: "Her coworkers were working next to her.", es: "Sus compañeros estaban trabajando junto a ella.", chunks: ["Her coworkers were working", "next to her."] },
      { id: "pg3-l4", text: "Was the supervisor listening to the calls? — No, he wasn't.", es: "¿El supervisor estaba escuchando las llamadas? — No.", chunks: ["Was the supervisor", "listening to the calls?", "No, he wasn't."] },
      { id: "pg3-l5", text: "She spilled her coffee while she was typing.", es: "Derramó su café mientras estaba escribiendo.", chunks: ["She spilled her coffee", "while she was typing."] },
      { id: "pg3-l6", text: "What was she doing after the call?", es: "¿Qué estaba haciendo después de la llamada?", chunks: ["What was she doing", "after the call?"] },
      { id: "pg3-l7", text: "She was writing notes about every case.", es: "Estaba escribiendo notas sobre cada caso.", chunks: ["She was writing notes", "about every case."] },
      { id: "pg3-l8", text: "They weren't taking a break because the line was full.", es: "No estaban tomando descanso porque la línea estaba llena.", chunks: ["They weren't taking a break", "because the line", "was full."] },
    ],
    questions: [
      { id: "pg3-q1", question: "Who was Renata talking to yesterday morning?", questionEs: "¿Con quién estaba hablando Renata ayer en la mañana?", hint: "She was talking to…", hintEs: "Usa was talking to." },
      { id: "pg3-q2", question: "How was she helping the customer?", questionEs: "¿Cómo estaba ayudando al cliente?", hint: "She was explaining…", hintEs: "Usa was + verbo -ing." },
      { id: "pg3-q3", question: "When did she spill her coffee?", questionEs: "¿Cuándo derramó su café?", hint: "She spilled it while she was…", hintEs: "Usa while + was + -ing." },
      { id: "pg3-q4", question: "Was the supervisor listening? Answer short, then add information.", questionEs: "¿El supervisor estaba escuchando? Responde corto y luego agrega información.", hint: "No, he wasn't. He was…", hintEs: "Respuesta corta + un detalle." },
      { id: "pg3-q5", question: "Why weren't they taking a break?", questionEs: "¿Por qué no estaban tomando descanso?", hint: "Because the line…", hintEs: "Da la razón con because." },
      { id: "pg3-q6", question: "Now ask a question with Was she…?", questionEs: "Ahora haz una pregunta con Was she…?", hint: "Was she… ?", hintEs: "Was + sujeto + verbo -ing." },
    ],
    finalPrompt: {
      question: "Describe Renata's shift as if you were watching it. What was she doing, and what were her coworkers doing?",
      questionEs: "Describe el turno de Renata como si lo estuvieras viendo. ¿Qué estaba haciendo ella y qué estaban haciendo sus compañeros?",
      tips: {
        en: "Include one question with Was / Were and one short answer (Yes, she was / No, he wasn't).",
        es: "Incluye una pregunta con Was / Were y una respuesta corta (Yes, she was / No, he wasn't).",
      },
    },
    grammarGoals: [
      "yes/no questions with Was / Were + subject + verb-ing",
      "short answers (Yes, she was / No, he wasn't)",
      "negatives with wasn't / weren't in a real work situation",
    ],
  },
  {
    number: 4,
    id: "pg-4-interrupted",
    title: "When it happened",
    titleEs: "Cuando pasó",
    person: "first",
    character: null,
    focus: "Past progressive with simple past: long action interrupted by a short one.",
    focusEs: "Pasado progresivo con pasado simple: acción larga interrumpida por una corta.",
    reminder: {
      en: "Long action → was / were + -ing. Short action that interrupts → simple past (called, started, rang).",
      es: "Acción larga → was / were + -ing. Acción corta que interrumpe → pasado simple (called, started, rang).",
    },
    showFullGuide: false,
    instructions: {
      en: "Tell moments when something interrupted what you were doing.",
      es: "Cuenta momentos en los que algo interrumpió lo que estabas haciendo.",
    },
    vocabulary: ["when", "while", "suddenly", "it started to rain", "my phone rang", "someone knocked", "I was driving", "at that moment"],
    lines: [
      { id: "pg4-l1", text: "I was walking home when it started to rain.", es: "Estaba caminando a casa cuando empezó a llover.", chunks: ["I was walking home", "when it started", "to rain."] },
      { id: "pg4-l2", text: "While I was cooking, my phone rang.", es: "Mientras estaba cocinando, sonó mi teléfono.", chunks: ["While I was cooking,", "my phone rang."] },
      { id: "pg4-l3", text: "I was studying when someone knocked on the door.", es: "Estaba estudiando cuando alguien tocó la puerta.", chunks: ["I was studying", "when someone knocked", "on the door."] },
      { id: "pg4-l4", text: "My friend called me while I was driving.", es: "Mi amigo me llamó mientras estaba manejando.", chunks: ["My friend called me", "while I was driving."] },
      { id: "pg4-l5", text: "We were waiting for the bus when it suddenly arrived.", es: "Estábamos esperando el bus cuando de repente llegó.", chunks: ["We were waiting for the bus", "when it suddenly arrived."] },
      { id: "pg4-l6", text: "I wasn't paying attention, so I missed the message.", es: "No estaba poniendo atención, así que perdí el mensaje.", chunks: ["I wasn't paying attention,", "so I missed the message."] },
      { id: "pg4-l7", text: "While my sister was sleeping, I finished my homework.", es: "Mientras mi hermana dormía, terminé mi tarea.", chunks: ["While my sister was sleeping,", "I finished my homework."] },
      { id: "pg4-l8", text: "I was thinking about the answer when the teacher asked me.", es: "Estaba pensando en la respuesta cuando el maestro me preguntó.", chunks: ["I was thinking about the answer", "when the teacher asked me."] },
    ],
    questions: [
      { id: "pg4-q1", question: "How often were you using English last month?", questionEs: "¿Con qué frecuencia estabas usando inglés el mes pasado?", hint: "Last month I was using English…", hintEs: "Di la frecuencia." },
      { id: "pg4-q2", question: "What time were you coming home yesterday?", questionEs: "¿A qué hora venías a casa ayer?", hint: "I was coming home at…", hintEs: "Di la hora." },
      { id: "pg4-q3", question: "Why were you in a hurry that day?", questionEs: "¿Por qué andabas apurado ese día?", hint: "Because I was…", hintEs: "Da la razón con because." },
      { id: "pg4-q4", question: "Who called you while you were busy?", questionEs: "¿Quién te llamó mientras estabas ocupado?", hint: "My… called me while I was…", hintEs: "while + was + -ing." },
      { id: "pg4-q5", question: "Where were you going when it started to rain?", questionEs: "¿A dónde ibas cuando empezó a llover?", hint: "I was going to…", hintEs: "Di el lugar." },
      { id: "pg4-q6", question: "When did someone interrupt you last week?", questionEs: "¿Cuándo te interrumpió alguien la semana pasada?", hint: "I was… when…", hintEs: "Acción larga + when + pasado simple." },
    ],
    finalPrompt: {
      question: "Tell me about a moment when something interrupted you. What were you doing, and what happened?",
      questionEs: "Cuéntame un momento en el que algo te interrumpió. ¿Qué estabas haciendo y qué pasó?",
      tips: {
        en: "Use was / were + verb-ing for the long action and the simple past for the interruption.",
        es: "Usa was / were + verbo -ing para la acción larga y pasado simple para la interrupción.",
      },
    },
    grammarGoals: [
      "past progressive with when + simple past (interruption)",
      "while + past progressive for the longer action",
      "negatives with wasn't + verb-ing",
    ],
  },
  {
    number: 5,
    id: "pg-5-tomas",
    title: "The night bus",
    titleEs: "El bus de la noche",
    person: "third",
    character: "Tomás",
    focus: "Applied past progressive with little support: describe a past scene in progress.",
    focusEs: "Pasado progresivo aplicado con poca ayuda: describe una escena pasada en curso.",
    reminder: {
      en: "Watch the four classic mistakes: she working, they didn't working, you was waiting, when it was starting.",
      es: "Cuidado con los cuatro errores clásicos: she working, they didn't working, you was waiting, when it was starting.",
    },
    showFullGuide: false,
    instructions: {
      en: "You get facts about the scene, not a full model answer. Build the story yourself.",
      es: "Recibes datos de la escena, no un monólogo completo. Tú construyes la historia.",
    },
    sceneImage: { src: scenePg5, alt: "Tomás waiting at the bus stop in the rain last night", altEs: "Tomás esperando el bus bajo la lluvia anoche" },
    vocabulary: ["bus stop", "last night", "umbrella", "check his phone", "wait", "arrive", "get wet", "at that moment"],
    factSheet: [
      { en: "Tomás · last night · at the bus stop", es: "Tomás · anoche · en la parada del bus" },
      { en: "Then: waiting for the last bus", es: "Entonces: esperando el último bus" },
      { en: "Weather: it was raining", es: "Clima: estaba lloviendo" },
      { en: "Two people: standing under umbrellas", es: "Dos personas: paradas bajo paraguas" },
      { en: "He: checking his phone", es: "Él: revisando su teléfono" },
      { en: "Interruption: the bus arrived late", es: "Interrupción: el bus llegó tarde" },
      { en: "Not happening: nobody was talking", es: "No estaba pasando: nadie estaba hablando" },
    ],
    lines: [
      { id: "pg5-l1", text: "Tomás was waiting for the last bus last night.", es: "Tomás estaba esperando el último bus anoche.", chunks: ["Tomás was waiting", "for the last bus", "last night."] },
      { id: "pg5-l2", text: "It was raining and the street was empty.", es: "Estaba lloviendo y la calle estaba vacía.", chunks: ["It was raining", "and the street", "was empty."] },
      { id: "pg5-l3", text: "Two people were standing under umbrellas.", es: "Dos personas estaban paradas bajo paraguas.", chunks: ["Two people were standing", "under umbrellas."] },
      { id: "pg5-l4", text: "He was checking his phone while he waited.", es: "Él estaba revisando su teléfono mientras esperaba.", chunks: ["He was checking his phone", "while he waited."] },
      { id: "pg5-l5", text: "Nobody was talking because everyone was tired.", es: "Nadie estaba hablando porque todos estaban cansados.", chunks: ["Nobody was talking", "because everyone", "was tired."] },
      { id: "pg5-l6", text: "The bus arrived while he was reading a message.", es: "El bus llegó mientras él estaba leyendo un mensaje.", chunks: ["The bus arrived", "while he was reading", "a message."] },
      { id: "pg5-l7", text: "He wasn't getting wet because he had an umbrella.", es: "No se estaba mojando porque tenía paraguas.", chunks: ["He wasn't getting wet", "because he had", "an umbrella."] },
      { id: "pg5-l8", text: "They were all getting on the bus at the same time.", es: "Todos se estaban subiendo al bus al mismo tiempo.", chunks: ["They were all getting on the bus", "at the same time."] },
    ],
    questions: [
      { id: "pg5-q1", question: "What was happening at the bus stop last night?", questionEs: "¿Qué estaba pasando en la parada anoche?", hint: "Tomás was… and the people were…", hintEs: "Usa was / were + verbo -ing." },
      { id: "pg5-q2", question: "Where was Tomás standing while it was raining?", questionEs: "¿Dónde estaba parado Tomás mientras llovía?", hint: "He was standing…", hintEs: "Di el lugar." },
      { id: "pg5-q3", question: "Who was standing under the umbrellas?", questionEs: "¿Quién estaba bajo los paraguas?", hint: "Two people were…", hintEs: "Sujeto + were + -ing." },
      { id: "pg5-q4", question: "Why wasn't he getting wet?", questionEs: "¿Por qué no se estaba mojando?", hint: "Because he had…", hintEs: "Da la razón con because." },
      { id: "pg5-q5", question: "When did the bus arrive?", questionEs: "¿Cuándo llegó el bus?", hint: "The bus arrived while he was…", hintEs: "while + was + -ing." },
      { id: "pg5-q6", question: "What was nobody doing?", questionEs: "¿Qué no estaba haciendo nadie?", hint: "Nobody was…", hintEs: "Nobody ya es negativo." },
    ],
    finalPrompt: {
      question: "Tell the story of Tomás at the bus stop. What was everyone doing, and what happened at the end?",
      questionEs: "Cuenta la historia de Tomás en la parada del bus. ¿Qué estaba haciendo cada quien y qué pasó al final?",
      tips: {
        en: "Use was / were + verb-ing, one negative sentence and connectors like and, but, because, while, when.",
        es: "Usa was / were + verbo -ing, una oración negativa y conectores como and, but, because, while, when.",
      },
    },
    grammarGoals: [
      "applied past progressive with different subjects (he, they, nobody, two people)",
      "negatives with wasn't / weren't and nobody",
      "when / while linking the progressive with the simple past",
    ],
  },
];
