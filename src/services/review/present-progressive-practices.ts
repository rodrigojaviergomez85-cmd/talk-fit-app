import type { ReviewPractice } from "@/lib/review-types";
import scenePp1 from "@/assets/review/scene-pp1-diego.jpg";
import scenePp3 from "@/assets/review/scene-pp3-camila.jpg";
import scenePp5 from "@/assets/review/scene-pp5-andres.jpg";

/**
 * REVIEW · PRESENT PROGRESSIVE — five static practices.
 *
 * Person of the learner's MAIN answers alternates: 3rd · 1st · 3rd · 1st · 3rd.
 * Diego, Camila and Andrés are fictional practice characters with different
 * situations — never the same scene with a new name.
 * All content is hand-written: nothing here is generated at page load.
 */
export const PRESENT_PROGRESSIVE_PRACTICES: ReviewPractice[] = [
  {
    number: 1,
    id: "pp-1-diego",
    title: "Right now at the office",
    titleEs: "Ahora mismo en la oficina",
    person: "third",
    character: "Diego",
    focus: "Third person affirmative: is + verb-ing for actions happening now.",
    focusEs: "Tercera persona afirmativa: is + verbo -ing para acciones de ahora.",
    reminder: {
      en: "With he or she you always need is + verb-ing. Never drop the is.",
      es: "Con he o she siempre necesitas is + verbo -ing. Nunca quites el is.",
    },
    showFullGuide: true,
    instructions: {
      en: "Diego is at work right now. Describe what is happening at this moment.",
      es: "Diego está en el trabajo ahora mismo. Describe lo que está pasando en este momento.",
    },
    sceneImage: { src: scenePp1, alt: "Diego's busy office right now", altEs: "La oficina de Diego ahora mismo" },
    vocabulary: ["right now", "at the moment", "answer emails", "wait for", "print", "meeting", "upstairs", "busy"],
    lines: [
      { id: "pp1-l1", text: "Diego is working in the office right now.", es: "Diego está trabajando en la oficina ahora mismo.", chunks: ["Diego is working", "in the office", "right now."] },
      { id: "pp1-l2", text: "He is answering emails at the moment.", es: "Él está contestando correos en este momento.", chunks: ["He is answering emails", "at the moment."] },
      { id: "pp1-l3", text: "His manager is waiting for a report.", es: "Su jefe está esperando un reporte.", chunks: ["His manager", "is waiting for a report."] },
      { id: "pp1-l4", text: "Two coworkers are printing the documents.", es: "Dos compañeros están imprimiendo los documentos.", chunks: ["Two coworkers", "are printing", "the documents."] },
      { id: "pp1-l5", text: "The team is having a meeting upstairs.", es: "El equipo está teniendo una reunión arriba.", chunks: ["The team is having", "a meeting", "upstairs."] },
      { id: "pp1-l6", text: "Diego is staying late because the office is busy today.", es: "Diego se está quedando tarde porque la oficina está ocupada hoy.", chunks: ["Diego is staying late", "because the office", "is busy today."] },
      { id: "pp1-l7", text: "He is drinking coffee while he writes.", es: "Él está tomando café mientras escribe.", chunks: ["He is drinking coffee", "while he writes."] },
      { id: "pp1-l8", text: "Everybody is finishing the work before six.", es: "Todos están terminando el trabajo antes de las seis.", chunks: ["Everybody is finishing", "the work", "before six."] },
    ],
    questions: [
      { id: "pp1-q1", question: "What is Diego doing right now?", questionEs: "¿Qué está haciendo Diego ahora mismo?", hint: "He is…", hintEs: "Usa is + verbo con -ing." },
      { id: "pp1-q2", question: "Where is he working today?", questionEs: "¿Dónde está trabajando hoy?", hint: "He is working…", hintEs: "Di el lugar." },
      { id: "pp1-q3", question: "Why is he staying late?", questionEs: "¿Por qué se está quedando tarde?", hint: "Because the office…", hintEs: "Da la razón con because." },
      { id: "pp1-q4", question: "What are his coworkers doing?", questionEs: "¿Qué están haciendo sus compañeros?", hint: "They are…", hintEs: "Con they usas are + -ing." },
      { id: "pp1-q5", question: "Who is waiting for a report?", questionEs: "¿Quién está esperando un reporte?", hint: "His manager is…", hintEs: "Sujeto + is + -ing." },
      { id: "pp1-q6", question: "What is the team doing upstairs?", questionEs: "¿Qué está haciendo el equipo arriba?", hint: "The team is having…", hintEs: "Usa is having." },
    ],
    finalPrompt: {
      question: "Describe Diego's office right now. What is he doing, and what are the other people doing?",
      questionEs: "Describe la oficina de Diego ahora mismo. ¿Qué está haciendo él y qué están haciendo los demás?",
      tips: {
        en: "Use is / are + verb-ing in every sentence, and add right now or at the moment.",
        es: "Usa is / are + verbo -ing en cada oración, y agrega right now o at the moment.",
      },
    },
    grammarGoals: [
      "affirmative present progressive with is / are + verb-ing",
      "the verb be is never omitted (he is working, not he working)",
      "time markers for now: right now, at the moment, today",
    ],
  },
  {
    number: 2,
    id: "pp-2-my-day",
    title: "What I'm doing today",
    titleEs: "Lo que estoy haciendo hoy",
    person: "first",
    character: null,
    focus: "First person, negatives with not, and -ing spelling changes.",
    focusEs: "Primera persona, negativas con not y cambios de ortografía en -ing.",
    reminder: {
      en: "Negatives use am not / isn't / aren't — never don't. Watch the spelling: make → making, run → running.",
      es: "Las negativas usan am not / isn't / aren't, nunca don't. Cuida la ortografía: make → making, run → running.",
    },
    showFullGuide: false,
    instructions: {
      en: "Talk about today: what you are doing and what you are not doing.",
      es: "Habla de hoy: qué estás haciendo y qué no estás haciendo.",
    },
    vocabulary: ["today", "this week", "I'm not", "making", "running", "studying", "getting ready", "taking a break"],
    lines: [
      { id: "pp2-l1", text: "I am studying English today.", es: "Hoy estoy estudiando inglés.", chunks: ["I am studying English", "today."] },
      { id: "pp2-l2", text: "I'm not working this morning.", es: "No estoy trabajando esta mañana.", chunks: ["I'm not working", "this morning."] },
      { id: "pp2-l3", text: "I am making coffee before my class.", es: "Estoy haciendo café antes de mi clase.", chunks: ["I am making coffee", "before my class."] },
      { id: "pp2-l4", text: "I'm not watching TV because I am practicing speaking.", es: "No estoy viendo tele porque estoy practicando hablar.", chunks: ["I'm not watching TV", "because I am", "practicing speaking."] },
      { id: "pp2-l5", text: "My sister is getting ready for work.", es: "Mi hermana se está alistando para el trabajo.", chunks: ["My sister", "is getting ready", "for work."] },
      { id: "pp2-l6", text: "We are running late, so we are taking a taxi.", es: "Vamos tarde, así que estamos tomando un taxi.", chunks: ["We are running late,", "so we are taking a taxi."] },
      { id: "pp2-l7", text: "I am taking a short break right now.", es: "Estoy tomando un descanso corto ahora mismo.", chunks: ["I am taking", "a short break", "right now."] },
      { id: "pp2-l8", text: "This week I am learning new vocabulary every day.", es: "Esta semana estoy aprendiendo vocabulario nuevo todos los días.", chunks: ["This week", "I am learning new vocabulary", "every day."] },
    ],
    questions: [
      { id: "pp2-q1", question: "What are you doing at this moment?", questionEs: "¿Qué estás haciendo en este momento?", hint: "I am…", hintEs: "Usa I am + verbo -ing." },
      { id: "pp2-q2", question: "How long are you studying today?", questionEs: "¿Cuánto tiempo estás estudiando hoy?", hint: "I am studying for…", hintEs: "Usa for + tiempo." },
      { id: "pp2-q3", question: "Who is helping you these days?", questionEs: "¿Quién te está ayudando estos días?", hint: "My… is helping me.", hintEs: "Sujeto + is + helping." },
      { id: "pp2-q4", question: "What are you not doing today?", questionEs: "¿Qué no estás haciendo hoy?", hint: "I'm not…", hintEs: "not + verbo -ing, nunca don't." },
      { id: "pp2-q5", question: "Where are you practicing English right now?", questionEs: "¿Dónde estás practicando inglés ahora mismo?", hint: "I am practicing…", hintEs: "Di el lugar." },
      { id: "pp2-q6", question: "What are you learning this week?", questionEs: "¿Qué estás aprendiendo esta semana?", hint: "This week I am…", hintEs: "Empieza con la expresión de tiempo." },
    ],
    finalPrompt: {
      question: "Tell me about your day today. What are you doing, and what are you not doing?",
      questionEs: "Cuéntame de tu día de hoy. ¿Qué estás haciendo y qué no estás haciendo?",
      tips: {
        en: "Use I am + verb-ing, at least one negative with not, and one sentence about someone else.",
        es: "Usa I am + verbo -ing, al menos una negativa con not y una oración sobre otra persona.",
      },
    },
    grammarGoals: [
      "first person progressive (I am + verb-ing)",
      "negatives with am not / isn't / aren't instead of don't",
      "-ing spelling: making, running, getting, studying",
    ],
  },
  {
    number: 3,
    id: "pp-3-camila",
    title: "On the call right now",
    titleEs: "En la llamada ahora mismo",
    person: "third",
    character: "Camila",
    focus: "Questions and short answers in the progressive.",
    focusEs: "Preguntas y respuestas cortas en progresivo.",
    reminder: {
      en: "To ask, move is or are to the front: Is she helping? Answer short: Yes, she is / No, she isn't.",
      es: "Para preguntar mueves is o are al inicio: Is she helping? Responde corto: Yes, she is / No, she isn't.",
    },
    showFullGuide: false,
    instructions: {
      en: "Camila is on a call with a customer. Ask and answer about what is happening.",
      es: "Camila está en una llamada con un cliente. Pregunta y responde sobre lo que está pasando.",
    },
    sceneImage: { src: scenePp3, alt: "Camila on a call with a customer", altEs: "Camila en una llamada con un cliente" },
    vocabulary: ["customer", "check the system", "hold", "explain", "solve", "transfer", "Is she…?", "Yes, she is"],
    lines: [
      { id: "pp3-l1", text: "Camila is talking to a customer right now.", es: "Camila está hablando con un cliente ahora mismo.", chunks: ["Camila is talking", "to a customer", "right now."] },
      { id: "pp3-l2", text: "Is she checking the system? — Yes, she is.", es: "¿Está revisando el sistema? — Sí.", chunks: ["Is she checking the system?", "Yes, she is."] },
      { id: "pp3-l3", text: "She is explaining the process step by step.", es: "Ella está explicando el proceso paso a paso.", chunks: ["She is explaining the process", "step by step."] },
      { id: "pp3-l4", text: "Is the customer waiting on hold? — No, he isn't.", es: "¿El cliente está esperando en línea? — No.", chunks: ["Is the customer", "waiting on hold?", "No, he isn't."] },
      { id: "pp3-l5", text: "She isn't transferring the call because she is solving the problem.", es: "Ella no está transfiriendo la llamada porque está resolviendo el problema.", chunks: ["She isn't transferring the call", "because she is solving", "the problem."] },
      { id: "pp3-l6", text: "What is she doing after the call?", es: "¿Qué está haciendo después de la llamada?", chunks: ["What is she doing", "after the call?"] },
      { id: "pp3-l7", text: "She is writing notes about the case.", es: "Ella está escribiendo notas sobre el caso.", chunks: ["She is writing notes", "about the case."] },
      { id: "pp3-l8", text: "Her supervisor is listening to the call today.", es: "Su supervisora está escuchando la llamada hoy.", chunks: ["Her supervisor", "is listening to the call", "today."] },
    ],
    questions: [
      { id: "pp3-q1", question: "Who is Camila talking to right now?", questionEs: "¿Con quién está hablando Camila ahora mismo?", hint: "She is talking to…", hintEs: "Usa is talking to." },
      { id: "pp3-q2", question: "How is she helping the customer?", questionEs: "¿Cómo está ayudando al cliente?", hint: "She is explaining…", hintEs: "Usa is + verbo -ing." },
      { id: "pp3-q3", question: "Why is she checking the system?", questionEs: "¿Por qué está revisando el sistema?", hint: "Because she is…", hintEs: "Da la razón con because." },
      { id: "pp3-q4", question: "Is the customer waiting on hold? Answer short, then add information.", questionEs: "¿El cliente está esperando en línea? Responde corto y luego agrega información.", hint: "No, he isn't. He is…", hintEs: "Respuesta corta + un detalle." },
      { id: "pp3-q5", question: "What is she doing after the call?", questionEs: "¿Qué está haciendo después de la llamada?", hint: "She is writing…", hintEs: "Usa is writing." },
      { id: "pp3-q6", question: "Now ask a question with Is she…?", questionEs: "Ahora haz una pregunta con Is she…?", hint: "Is she… ?", hintEs: "Is + sujeto + verbo -ing." },
    ],
    finalPrompt: {
      question: "Describe Camila's call as if you were watching it. What is she doing, and what is the customer doing?",
      questionEs: "Describe la llamada de Camila como si la estuvieras viendo. ¿Qué está haciendo ella y qué está haciendo el cliente?",
      tips: {
        en: "Include one question with Is / Are and one short answer (Yes, she is / No, he isn't).",
        es: "Incluye una pregunta con Is / Are y una respuesta corta (Yes, she is / No, he isn't).",
      },
    },
    grammarGoals: [
      "yes/no questions with Is / Are + subject + verb-ing",
      "short answers (Yes, she is / No, he isn't)",
      "negatives with isn't / aren't in a real work situation",
    ],
  },
  {
    number: 4,
    id: "pp-4-my-week",
    title: "My week in progress",
    titleEs: "Mi semana en curso",
    person: "first",
    character: null,
    focus: "Present progressive vs. simple present: now against routine.",
    focusEs: "Progresivo vs. presente simple: ahora frente a la rutina.",
    reminder: {
      en: "Usually, every day → simple present. Right now, today, this week → progressive.",
      es: "Usually, every day → presente simple. Right now, today, this week → progresivo.",
    },
    showFullGuide: false,
    instructions: {
      en: "Compare your normal routine with what is different this week.",
      es: "Compara tu rutina normal con lo que es diferente esta semana.",
    },
    vocabulary: ["usually", "but this week", "right now", "every day", "these days", "at the moment", "change", "practice"],
    lines: [
      { id: "pp4-l1", text: "I usually study at night, but this week I am studying in the morning.", es: "Normalmente estudio de noche, pero esta semana estoy estudiando en la mañana.", chunks: ["I usually study at night,", "but this week", "I am studying in the morning."] },
      { id: "pp4-l2", text: "I work from home every day, and today I am working from a café.", es: "Trabajo desde casa todos los días, y hoy estoy trabajando desde un café.", chunks: ["I work from home every day,", "and today", "I am working from a café."] },
      { id: "pp4-l3", text: "These days I am practicing speaking more than reading.", es: "Estos días estoy practicando hablar más que leer.", chunks: ["These days", "I am practicing speaking", "more than reading."] },
      { id: "pp4-l4", text: "Right now I am answering questions in English.", es: "Ahora mismo estoy respondiendo preguntas en inglés.", chunks: ["Right now", "I am answering questions", "in English."] },
      { id: "pp4-l5", text: "I don't usually take notes, but I am taking notes this month.", es: "Normalmente no tomo notas, pero este mes estoy tomando notas.", chunks: ["I don't usually take notes,", "but I am taking notes", "this month."] },
      { id: "pp4-l6", text: "My routine is changing because I want a better job.", es: "Mi rutina está cambiando porque quiero un mejor trabajo.", chunks: ["My routine is changing", "because I want", "a better job."] },
      { id: "pp4-l7", text: "I am not sleeping much this week.", es: "No estoy durmiendo mucho esta semana.", chunks: ["I am not sleeping", "much", "this week."] },
      { id: "pp4-l8", text: "I feel tired, but I am learning fast.", es: "Me siento cansado, pero estoy aprendiendo rápido.", chunks: ["I feel tired,", "but I am learning fast."] },
    ],
    questions: [
      { id: "pp4-q1", question: "How often do you practice English?", questionEs: "¿Con qué frecuencia practicas inglés?", hint: "I practice English…", hintEs: "Rutina: presente simple." },
      { id: "pp4-q2", question: "What are you doing differently this week?", questionEs: "¿Qué estás haciendo diferente esta semana?", hint: "This week I am…", hintEs: "Ahora: progresivo." },
      { id: "pp4-q3", question: "Where are you studying these days?", questionEs: "¿Dónde estás estudiando estos días?", hint: "These days I am studying…", hintEs: "Di el lugar." },
      { id: "pp4-q4", question: "What are you not doing this week?", questionEs: "¿Qué no estás haciendo esta semana?", hint: "I am not…", hintEs: "not + verbo -ing." },
      { id: "pp4-q5", question: "Why is your routine changing?", questionEs: "¿Por qué está cambiando tu rutina?", hint: "Because I…", hintEs: "Da una razón real." },
      { id: "pp4-q6", question: "What do you usually do, and what are you doing right now?", questionEs: "¿Qué haces normalmente y qué estás haciendo ahora mismo?", hint: "I usually… but right now I am…", hintEs: "Contrasta rutina y ahora." },
    ],
    finalPrompt: {
      question: "Compare your usual routine with this week. What do you normally do, and what are you doing now?",
      questionEs: "Compara tu rutina normal con esta semana. ¿Qué haces normalmente y qué estás haciendo ahora?",
      tips: {
        en: "Use usually / every day with the simple present, and this week / right now with the progressive.",
        es: "Usa usually / every day con presente simple, y this week / right now con progresivo.",
      },
    },
    grammarGoals: [
      "contrast between simple present (routine) and present progressive (now)",
      "time markers choosing the tense: usually, every day vs. right now, this week",
      "negatives with am not + verb-ing",
    ],
  },
  {
    number: 5,
    id: "pp-5-andres",
    title: "Live update",
    titleEs: "Reporte en vivo",
    person: "third",
    character: "Andrés",
    focus: "Applied progressive with little support: describe a scene in progress.",
    focusEs: "Progresivo aplicado con poca ayuda: describe una escena en curso.",
    reminder: {
      en: "Watch the four classic mistakes: she working, they don't working, I am makeing, right now I work.",
      es: "Cuidado con los cuatro errores clásicos: she working, they don't working, I am makeing, right now I work.",
    },
    showFullGuide: false,
    instructions: {
      en: "You get facts about the scene, not a full model answer. Build the live update yourself.",
      es: "Recibes datos de la escena, no un monólogo completo. Tú construyes el reporte en vivo.",
    },
    sceneImage: { src: scenePp5, alt: "Andrés and his team in the meeting room", altEs: "Andrés y su equipo en la sala de reuniones" },
    vocabulary: ["team", "deadline", "fix", "test", "report", "at the moment", "still", "almost done"],
    factSheet: [
      { en: "Andrés · team leader · in the meeting room", es: "Andrés · líder de equipo · en la sala de reuniones" },
      { en: "Now: explaining the new process", es: "Ahora: explicando el nuevo proceso" },
      { en: "Two people: testing the system", es: "Dos personas: probando el sistema" },
      { en: "One person: fixing an error", es: "Una persona: arreglando un error" },
      { en: "Not happening: nobody is taking a break", es: "No está pasando: nadie está tomando descanso" },
      { en: "Time: they are finishing the report before five", es: "Tiempo: están terminando el reporte antes de las cinco" },
      { en: "Reason: the deadline is today", es: "Razón: la fecha límite es hoy" },
    ],
    lines: [
      { id: "pp5-l1", text: "Andrés is explaining the new process to his team.", es: "Andrés está explicando el nuevo proceso a su equipo.", chunks: ["Andrés is explaining", "the new process", "to his team."] },
      { id: "pp5-l2", text: "Two people are testing the system at the moment.", es: "Dos personas están probando el sistema en este momento.", chunks: ["Two people are testing", "the system", "at the moment."] },
      { id: "pp5-l3", text: "Someone is fixing an error in the report.", es: "Alguien está arreglando un error en el reporte.", chunks: ["Someone is fixing", "an error", "in the report."] },
      { id: "pp5-l4", text: "Nobody is taking a break because the deadline is today.", es: "Nadie está tomando descanso porque la fecha límite es hoy.", chunks: ["Nobody is taking a break", "because the deadline", "is today."] },
      { id: "pp5-l5", text: "They are still working on the last part.", es: "Todavía están trabajando en la última parte.", chunks: ["They are still working", "on the last part."] },
      { id: "pp5-l6", text: "The team isn't waiting for tomorrow.", es: "El equipo no está esperando hasta mañana.", chunks: ["The team isn't waiting", "for tomorrow."] },
      { id: "pp5-l7", text: "Andrés is helping while the others are finishing.", es: "Andrés está ayudando mientras los demás están terminando.", chunks: ["Andrés is helping", "while the others", "are finishing."] },
      { id: "pp5-l8", text: "They are finishing the report before five.", es: "Están terminando el reporte antes de las cinco.", chunks: ["They are finishing the report", "before five."] },
    ],
    questions: [
      { id: "pp5-q1", question: "What is happening in the office right now?", questionEs: "¿Qué está pasando en la oficina ahora mismo?", hint: "Andrés is… and the team is…", hintEs: "Usa is / are + verbo -ing." },
      { id: "pp5-q2", question: "How long is the team working on this?", questionEs: "¿Cuánto tiempo lleva el equipo trabajando en esto?", hint: "They are working for…", hintEs: "Usa for + tiempo." },
      { id: "pp5-q3", question: "When are they finishing the report?", questionEs: "¿Cuándo están terminando el reporte?", hint: "They are finishing…", hintEs: "Di la hora." },
      { id: "pp5-q4", question: "Who is fixing the error?", questionEs: "¿Quién está arreglando el error?", hint: "Someone is…", hintEs: "Sujeto + is + -ing." },
      { id: "pp5-q5", question: "What is nobody doing?", questionEs: "¿Qué no está haciendo nadie?", hint: "Nobody is…", hintEs: "Nobody ya es negativo." },
      { id: "pp5-q6", question: "Why are they working so fast?", questionEs: "¿Por qué están trabajando tan rápido?", hint: "Because the deadline…", hintEs: "Da la razón con because." },
    ],
    finalPrompt: {
      question: "Give a live update of Andrés's team. What is everyone doing right now, and what isn't happening?",
      questionEs: "Da un reporte en vivo del equipo de Andrés. ¿Qué está haciendo cada quien ahora y qué no está pasando?",
      tips: {
        en: "Use is / are + verb-ing, one negative sentence and connectors like and, but, because, while.",
        es: "Usa is / are + verbo -ing, una oración negativa y conectores como and, but, because, while.",
      },
    },
    grammarGoals: [
      "applied present progressive with different subjects (he, they, nobody, someone)",
      "negatives with isn't / aren't and nobody",
      "connectors linking simultaneous actions (and, but, while, because)",
    ],
  },
];
