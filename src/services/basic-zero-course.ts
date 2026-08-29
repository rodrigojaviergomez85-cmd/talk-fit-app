import type { CourseDay, ModelLine, PersonalPrompt } from "@/lib/types";

/**
 * BASIC ZERO — Month 1 (4 weeks · 20 days · 5 fluency reps per day).
 * Functional speaking chunks only: introduce yourself and someone else.
 * No formal grammar teaching (no do/does, don't/doesn't, third-person rules).
 */

const GOAL: [number, number] = [30, 45];

type Person = {
  name: string;
  age: number;
  country: string;
  countryEs: string;
  city: string;
  color: string;
  colorEs: string;
  colorWhy: string;
  colorWhyEs: string;
  food: string;
  foodEs: string;
  foodWhy: string;
  foodWhyEs: string;
  hobby1: string;
  hobby1Es: string;
  hobby2: string;
  hobby2Es: string;
  free: string;
  freeEs: string;
  also: string;
  alsoEs: string;
  trait1: string;
  trait1Es: string;
  trait2: string;
  trait2Es: string;
  /** Week 3–4 only. */
  relation?: string;
  relationEs?: string;
  gender?: "m" | "f";
};

function line(id: string, text: string, es: string, chunks: string[]): ModelLine {
  return { id, text, es, chunks };
}

/* ------------------------------- Week 1–2 -------------------------------- */

function selfLinesFoundation(id: string, p: Person): ModelLine[] {
  return [
    line(`${id}-1`, `My name is ${p.name}.`, `Me llamo ${p.name}.`, ["My name is", `${p.name}.`]),
    line(`${id}-2`, `I am ${p.age} years old.`, `Tengo ${p.age} años.`, ["I am", `${p.age} years old.`]),
    line(`${id}-3`, `I am from ${p.country}.`, `Soy de ${p.countryEs}.`, ["I am from", `${p.country}.`]),
    line(`${id}-4`, `I live in ${p.city}.`, `Vivo en ${p.city}.`, ["I live in", `${p.city}.`]),
    line(`${id}-5`, `My favorite color is ${p.color}.`, `Mi color favorito es el ${p.colorEs}.`, ["My favorite color is", `${p.color}.`]),
    line(`${id}-6`, `My favorite food is ${p.food}.`, `Mi comida favorita es ${p.foodEs}.`, ["My favorite food is", `${p.food}.`]),
    line(`${id}-7`, `My hobbies are ${p.hobby1} and ${p.hobby2}.`, `Mis pasatiempos son ${p.hobby1Es} y ${p.hobby2Es}.`, ["My hobbies are", `${p.hobby1}`, `and ${p.hobby2}.`]),
    line(`${id}-8`, `Overall, I am a ${p.trait1} and ${p.trait2} person.`, `En general, soy una persona ${p.trait1Es} y ${p.trait2Es}.`, ["Overall,", `I am a ${p.trait1}`, `and ${p.trait2} person.`]),
  ];
}

function selfLinesFluency(id: string, p: Person): ModelLine[] {
  return [
    line(`${id}-1`, `My name is ${p.name}, and I am ${p.age} years old.`, `Me llamo ${p.name} y tengo ${p.age} años.`, [`My name is ${p.name},`, `and I am ${p.age} years old.`]),
    line(`${id}-2`, `I am from ${p.country}, and I live in ${p.city}.`, `Soy de ${p.countryEs} y vivo en ${p.city}.`, [`I am from ${p.country},`, `and I live in ${p.city}.`]),
    line(`${id}-3`, `My favorite color is ${p.color} because ${p.colorWhy}.`, `Mi color favorito es el ${p.colorEs} porque ${p.colorWhyEs}.`, [`My favorite color is ${p.color}`, `because ${p.colorWhy}.`]),
    line(`${id}-4`, `My favorite food is ${p.food} because ${p.foodWhy}.`, `Mi comida favorita es ${p.foodEs} porque ${p.foodWhyEs}.`, [`My favorite food is ${p.food}`, `because ${p.foodWhy}.`]),
    line(`${id}-5`, `My hobbies are ${p.hobby1} and ${p.hobby2}.`, `Mis pasatiempos son ${p.hobby1Es} y ${p.hobby2Es}.`, ["My hobbies are", `${p.hobby1}`, `and ${p.hobby2}.`]),
    line(`${id}-6`, `In my free time, I like to ${p.free}.`, `En mi tiempo libre me gusta ${p.freeEs}.`, ["In my free time,", `I like to ${p.free}.`]),
    line(`${id}-7`, `I also like to ${p.also}.`, `También me gusta ${p.alsoEs}.`, ["I also like to", `${p.also}.`]),
    line(`${id}-8`, `Overall, I am a ${p.trait1} and ${p.trait2} person.`, `En general, soy una persona ${p.trait1Es} y ${p.trait2Es}.`, ["Overall,", `I am a ${p.trait1}`, `and ${p.trait2} person.`]),
  ];
}

/* ------------------------------- Week 3–4 -------------------------------- */

function he(p: Person) {
  return p.gender === "f" ? "She" : "He";
}
function his(p: Person) {
  return p.gender === "f" ? "Her" : "His";
}
function hisLower(p: Person) {
  return p.gender === "f" ? "her" : "his";
}
function heLower(p: Person) {
  return p.gender === "f" ? "she" : "he";
}
function esSu() {
  return "Su";
}
function esEl(p: Person) {
  return p.gender === "f" ? "Ella" : "Él";
}

function otherLinesFoundation(id: string, p: Person): ModelLine[] {
  return [
    line(`${id}-1`, `This is my ${p.relation}.`, `Esta es mi ${p.relationEs}.`, ["This is", `my ${p.relation}.`]),
    line(`${id}-2`, `${his(p)} name is ${p.name}.`, `${esSu()} nombre es ${p.name}.`, [`${his(p)} name is`, `${p.name}.`]),
    line(`${id}-3`, `${he(p)} is ${p.age} years old.`, `${esEl(p)} tiene ${p.age} años.`, [`${he(p)} is`, `${p.age} years old.`]),
    line(`${id}-4`, `${he(p)} is from ${p.country}.`, `${esEl(p)} es de ${p.countryEs}.`, [`${he(p)} is from`, `${p.country}.`]),
    line(`${id}-5`, `${he(p)} lives in ${p.city}.`, `${esEl(p)} vive en ${p.city}.`, [`${he(p)} lives in`, `${p.city}.`]),
    line(`${id}-6`, `${his(p)} favorite color is ${p.color}.`, `${esSu()} color favorito es el ${p.colorEs}.`, [`${his(p)} favorite color is`, `${p.color}.`]),
    line(`${id}-7`, `${his(p)} favorite food is ${p.food}.`, `${esSu()} comida favorita es ${p.foodEs}.`, [`${his(p)} favorite food is`, `${p.food}.`]),
    line(`${id}-8`, `${his(p)} hobbies are ${p.hobby1} and ${p.hobby2}.`, `${esSu()}s pasatiempos son ${p.hobby1Es} y ${p.hobby2Es}.`, [`${his(p)} hobbies are`, `${p.hobby1}`, `and ${p.hobby2}.`]),
  ];
}

function otherLinesFluency(id: string, p: Person): ModelLine[] {
  return [
    line(`${id}-1`, `This is my ${p.relation}, and ${hisLower(p)} name is ${p.name}.`, `Esta es mi ${p.relationEs} y su nombre es ${p.name}.`, [`This is my ${p.relation},`, `and ${hisLower(p)} name is ${p.name}.`]),
    line(`${id}-2`, `${he(p)} is ${p.age} years old and is from ${p.country}.`, `${esEl(p)} tiene ${p.age} años y es de ${p.countryEs}.`, [`${he(p)} is ${p.age} years old`, `and is from ${p.country}.`]),
    line(`${id}-3`, `${he(p)} lives in ${p.city}.`, `${esEl(p)} vive en ${p.city}.`, [`${he(p)} lives in`, `${p.city}.`]),
    line(`${id}-4`, `${his(p)} favorite color is ${p.color} because ${p.colorWhy}.`, `${esSu()} color favorito es el ${p.colorEs} porque ${p.colorWhyEs}.`, [`${his(p)} favorite color is ${p.color}`, `because ${p.colorWhy}.`]),
    line(`${id}-5`, `${his(p)} favorite food is ${p.food} because ${p.foodWhy}.`, `${esSu()} comida favorita es ${p.foodEs} porque ${p.foodWhyEs}.`, [`${his(p)} favorite food is ${p.food}`, `because ${p.foodWhy}.`]),
    line(`${id}-6`, `${his(p)} hobbies are ${p.hobby1} and ${p.hobby2}.`, `${esSu()}s pasatiempos son ${p.hobby1Es} y ${p.hobby2Es}.`, [`${his(p)} hobbies are`, `${p.hobby1}`, `and ${p.hobby2}.`]),
    line(`${id}-7`, `In ${hisLower(p)} free time, ${heLower(p)} likes to ${p.free}.`, `En su tiempo libre le gusta ${p.freeEs}.`, [`In ${hisLower(p)} free time,`, `${heLower(p)} likes to ${p.free}.`]),
    line(`${id}-8`, `Overall, ${heLower(p)} is a ${p.trait1} and ${p.trait2} person.`, `En general, es una persona ${p.trait1Es} y ${p.trait2Es}.`, ["Overall,", `${heLower(p)} is a ${p.trait1}`, `and ${p.trait2} person.`]),
  ];
}

/* -------------------------------- Prompts -------------------------------- */

function prompt(
  id: string,
  cue: string,
  question: string,
  questionEs: string,
  starter: string,
  starterEs: string,
): PersonalPrompt {
  return { id, cue, question, questionEs, starter, starterEs };
}

function selfPromptsFoundation(id: string): PersonalPrompt[] {
  return [
    prompt(`${id}-p1`, "NAME", "What is your name?", "¿Cómo te llamas?", "My name is…", "Me llamo…"),
    prompt(`${id}-p2`, "AGE", "How old are you?", "¿Cuántos años tienes?", "I am ______ years old.", "Tengo ______ años."),
    prompt(`${id}-p3`, "COUNTRY", "Where are you from?", "¿De dónde eres?", "I am from…", "Soy de…"),
    prompt(`${id}-p4`, "CITY", "Where do you live?", "¿Dónde vives?", "I live in…", "Vivo en…"),
    prompt(`${id}-p5`, "COLOR", "What is your favorite color?", "¿Cuál es tu color favorito?", "My favorite color is…", "Mi color favorito es…"),
    prompt(`${id}-p6`, "FOOD", "What is your favorite food?", "¿Cuál es tu comida favorita?", "My favorite food is…", "Mi comida favorita es…"),
    prompt(`${id}-p7`, "HOBBIES", "What are your hobbies?", "¿Cuáles son tus pasatiempos?", "My hobbies are ______ and ______.", "Mis pasatiempos son ______ y ______."),
    prompt(`${id}-p8`, "PERSONALITY", "How would you describe yourself?", "¿Cómo te describirías?", "Overall, I am a ______ and ______ person.", "En general, soy una persona ______ y ______."),
  ];
}

function selfPromptsFluency(id: string): PersonalPrompt[] {
  return [
    prompt(`${id}-p1`, "NAME + AGE", "Your name and your age?", "¿Tu nombre y tu edad?", "My name is ______, and I am ______ years old.", "Me llamo ______ y tengo ______ años."),
    prompt(`${id}-p2`, "FROM + LIVE", "Where are you from and where do you live?", "¿De dónde eres y dónde vives?", "I am from ______, and I live in ______.", "Soy de ______ y vivo en ______."),
    prompt(`${id}-p3`, "COLOR + WHY", "Your favorite color? Why?", "¿Tu color favorito? ¿Por qué?", "My favorite color is ______ because…", "Mi color favorito es ______ porque…"),
    prompt(`${id}-p4`, "FOOD + WHY", "Your favorite food? Why?", "¿Tu comida favorita? ¿Por qué?", "My favorite food is ______ because…", "Mi comida favorita es ______ porque…"),
    prompt(`${id}-p5`, "HOBBIES", "What are your hobbies?", "¿Cuáles son tus pasatiempos?", "My hobbies are ______ and ______.", "Mis pasatiempos son ______ y ______."),
    prompt(`${id}-p6`, "FREE TIME", "What do you like to do in your free time?", "¿Qué te gusta hacer en tu tiempo libre?", "In my free time, I like to…", "En mi tiempo libre me gusta…"),
    prompt(`${id}-p7`, "ALSO", "What else do you like to do?", "¿Qué más te gusta hacer?", "I also like to…", "También me gusta…"),
    prompt(`${id}-p8`, "PERSONALITY", "How would you describe yourself?", "¿Cómo te describirías?", "Overall, I am a ______ and ______ person.", "En general, soy una persona ______ y ______."),
  ];
}

function otherPromptsFoundation(id: string): PersonalPrompt[] {
  return [
    prompt(`${id}-p1`, "WHO?", "Who do you want to talk about?", "¿De quién quieres hablar?", "This is my…", "Esta es mi… / Este es mi…"),
    prompt(`${id}-p2`, "NAME", "What is his / her name?", "¿Cómo se llama?", "His name is… / Her name is…", "Su nombre es…"),
    prompt(`${id}-p3`, "AGE", "How old is he / she?", "¿Cuántos años tiene?", "He is ______ years old. / She is ______ years old.", "Tiene ______ años."),
    prompt(`${id}-p4`, "COUNTRY", "Where is he / she from?", "¿De dónde es?", "He is from… / She is from…", "Es de…"),
    prompt(`${id}-p5`, "CITY", "Where does he / she live?", "¿Dónde vive?", "He lives in… / She lives in…", "Vive en…"),
    prompt(`${id}-p6`, "COLOR", "His / her favorite color?", "¿Su color favorito?", "His favorite color is… / Her favorite color is…", "Su color favorito es…"),
    prompt(`${id}-p7`, "FOOD", "His / her favorite food?", "¿Su comida favorita?", "His favorite food is… / Her favorite food is…", "Su comida favorita es…"),
    prompt(`${id}-p8`, "HOBBIES", "What are his / her hobbies?", "¿Cuáles son sus pasatiempos?", "His hobbies are ______ and ______.", "Sus pasatiempos son ______ y ______."),
  ];
}

function otherPromptsFluency(id: string): PersonalPrompt[] {
  return [
    prompt(`${id}-p1`, "WHO + NAME", "Who is this person and what is his / her name?", "¿Quién es y cómo se llama?", "This is my ______, and his/her name is ______.", "Esta es mi ______ y su nombre es ______."),
    prompt(`${id}-p2`, "AGE + FROM", "How old is he / she and where is he / she from?", "¿Cuántos años tiene y de dónde es?", "He/She is ______ years old and is from ______.", "Tiene ______ años y es de ______."),
    prompt(`${id}-p3`, "CITY", "Where does he / she live?", "¿Dónde vive?", "He/She lives in…", "Vive en…"),
    prompt(`${id}-p4`, "COLOR + WHY", "His / her favorite color? Why?", "¿Su color favorito? ¿Por qué?", "His/Her favorite color is ______ because…", "Su color favorito es ______ porque…"),
    prompt(`${id}-p5`, "FOOD + WHY", "His / her favorite food? Why?", "¿Su comida favorita? ¿Por qué?", "His/Her favorite food is ______ because…", "Su comida favorita es ______ porque…"),
    prompt(`${id}-p6`, "HOBBIES", "What are his / her hobbies?", "¿Cuáles son sus pasatiempos?", "His/Her hobbies are ______ and ______.", "Sus pasatiempos son ______ y ______."),
    prompt(`${id}-p7`, "FREE TIME", "What does he / she like to do in his / her free time?", "¿Qué le gusta hacer en su tiempo libre?", "In his/her free time, he/she likes to…", "En su tiempo libre le gusta…"),
    prompt(`${id}-p8`, "PERSONALITY", "How would you describe him / her?", "¿Cómo lo / la describirías?", "Overall, he/she is a ______ and ______ person.", "En general, es una persona ______ y ______."),
  ];
}

/* --------------------------------- People -------------------------------- */

const carlos: Person = {
  gender: "m",
  name: "Carlos", age: 22, country: "El Salvador", countryEs: "El Salvador", city: "San Salvador",
  color: "blue", colorEs: "azul", colorWhy: "it is calm", colorWhyEs: "es tranquilo",
  food: "pizza", foodEs: "la pizza", foodWhy: "I love cheese", foodWhyEs: "me encanta el queso",
  hobby1: "playing soccer", hobby1Es: "jugar fútbol", hobby2: "watching movies", hobby2Es: "ver películas",
  free: "play soccer with my friends", freeEs: "jugar fútbol con mis amigos",
  also: "listen to music", alsoEs: "escuchar música",
  trait1: "friendly", trait1Es: "amable", trait2: "positive", trait2Es: "positiva",
};

const sofia: Person = {
  gender: "f",
  name: "Sofia", age: 28, country: "Mexico", countryEs: "México", city: "Guadalajara",
  color: "green", colorEs: "verde", colorWhy: "it makes me happy", colorWhyEs: "me hace feliz",
  food: "tacos", foodEs: "los tacos", foodWhy: "they remind me of my family", foodWhyEs: "me recuerdan a mi familia",
  hobby1: "dancing", hobby1Es: "bailar", hobby2: "cooking", hobby2Es: "cocinar",
  free: "cook new recipes", freeEs: "cocinar recetas nuevas",
  also: "walk in the park", alsoEs: "caminar en el parque",
  trait1: "happy", trait1Es: "alegre", trait2: "hardworking", trait2Es: "trabajadora",
};

const daniel: Person = {
  gender: "m",
  name: "Daniel", age: 35, country: "Colombia", countryEs: "Colombia", city: "Medellín",
  color: "red", colorEs: "rojo", colorWhy: "it gives me energy", colorWhyEs: "me da energía",
  food: "chicken and rice", foodEs: "el pollo con arroz", foodWhy: "it is simple and delicious", foodWhyEs: "es simple y delicioso",
  hobby1: "running", hobby1Es: "correr", hobby2: "reading", hobby2Es: "leer",
  free: "run in the morning", freeEs: "correr en la mañana",
  also: "read books", alsoEs: "leer libros",
  trait1: "calm", trait1Es: "calmada", trait2: "patient", trait2Es: "paciente",
};

const valeria: Person = {
  gender: "f",
  name: "Valeria", age: 19, country: "Peru", countryEs: "Perú", city: "Lima",
  color: "yellow", colorEs: "amarillo", colorWhy: "it is bright", colorWhyEs: "es brillante",
  food: "ceviche", foodEs: "el ceviche", foodWhy: "it is fresh", foodWhyEs: "es fresco",
  hobby1: "singing", hobby1Es: "cantar", hobby2: "swimming", hobby2Es: "nadar",
  free: "sing with my friends", freeEs: "cantar con mis amigos",
  also: "watch series", alsoEs: "ver series",
  trait1: "creative", trait1Es: "creativa", trait2: "kind", trait2Es: "amable",
};

const miguel: Person = {
  gender: "m",
  name: "Miguel", age: 41, country: "Guatemala", countryEs: "Guatemala", city: "Antigua",
  color: "black", colorEs: "negro", colorWhy: "it is elegant", colorWhyEs: "es elegante",
  food: "soup", foodEs: "la sopa", foodWhy: "my mother makes it", foodWhyEs: "mi mamá la prepara",
  hobby1: "playing guitar", hobby1Es: "tocar guitarra", hobby2: "traveling", hobby2Es: "viajar",
  free: "play the guitar", freeEs: "tocar la guitarra",
  also: "travel with my family", alsoEs: "viajar con mi familia",
  trait1: "quiet", trait1Es: "tranquila", trait2: "friendly", trait2Es: "amable",
};

const lucia: Person = {
  gender: "f",
  name: "Lucia", age: 31, country: "Spain", countryEs: "España", city: "Valencia",
  color: "white", colorEs: "blanco", colorWhy: "it is clean and simple", colorWhyEs: "es limpio y simple",
  food: "paella", foodEs: "la paella", foodWhy: "it is a family tradition", foodWhyEs: "es una tradición familiar",
  hobby1: "painting", hobby1Es: "pintar", hobby2: "riding my bike", hobby2Es: "andar en bicicleta",
  free: "paint at home", freeEs: "pintar en casa",
  also: "meet my friends", alsoEs: "ver a mis amigos",
  trait1: "curious", trait1Es: "curiosa", trait2: "relaxed", trait2Es: "relajada",
};

const andres: Person = {
  gender: "m",
  name: "Andres", age: 26, country: "Ecuador", countryEs: "Ecuador", city: "Quito",
  color: "orange", colorEs: "naranja", colorWhy: "it is warm", colorWhyEs: "es cálido",
  food: "hamburgers", foodEs: "las hamburguesas", foodWhy: "they are my weekend food", foodWhyEs: "son mi comida del fin de semana",
  hobby1: "playing video games", hobby1Es: "jugar videojuegos", hobby2: "going to the gym", hobby2Es: "ir al gimnasio",
  free: "go to the gym", freeEs: "ir al gimnasio",
  also: "play video games", alsoEs: "jugar videojuegos",
  trait1: "funny", trait1Es: "divertida", trait2: "loyal", trait2Es: "leal",
};

const paola: Person = {
  gender: "f",
  name: "Paola", age: 24, country: "Honduras", countryEs: "Honduras", city: "San Pedro Sula",
  color: "purple", colorEs: "morado", colorWhy: "it is different", colorWhyEs: "es diferente",
  food: "baleadas", foodEs: "las baleadas", foodWhy: "they are cheap and delicious", foodWhyEs: "son baratas y deliciosas",
  hobby1: "taking photos", hobby1Es: "tomar fotos", hobby2: "dancing", hobby2Es: "bailar",
  free: "take photos in the city", freeEs: "tomar fotos en la ciudad",
  also: "study English", alsoEs: "estudiar inglés",
  trait1: "social", trait1Es: "sociable", trait2: "positive", trait2Es: "positiva",
};

/* People for weeks 3–4 */

const sisterAna: Person = {
  ...sofia, name: "Ana", age: 25, relation: "sister", relationEs: "hermana", gender: "f",
  city: "San Miguel", country: "El Salvador", countryEs: "El Salvador",
};
const brotherLuis: Person = {
  ...andres, name: "Luis", age: 30, relation: "brother", relationEs: "hermano", gender: "m",
  city: "San Salvador", country: "El Salvador", countryEs: "El Salvador",
};
const motherRosa: Person = {
  ...lucia, name: "Rosa", age: 54, relation: "mother", relationEs: "mamá", gender: "f",
  city: "Santa Ana", country: "El Salvador", countryEs: "El Salvador",
};
const friendJorge: Person = {
  ...daniel, name: "Jorge", age: 27, relation: "friend", relationEs: "amigo", gender: "m",
  city: "Bogotá", country: "Colombia", countryEs: "Colombia",
};
const cousinMaria: Person = {
  ...valeria, name: "Maria", age: 33, relation: "cousin", relationEs: "prima", gender: "f",
  city: "Lima", country: "Peru", countryEs: "Perú",
};
const fatherPedro: Person = {
  ...miguel, name: "Pedro", age: 58, relation: "father", relationEs: "papá", gender: "m",
  city: "Antigua", country: "Guatemala", countryEs: "Guatemala",
};
const friendCamila: Person = {
  ...paola, name: "Camila", age: 29, relation: "friend", relationEs: "amiga", gender: "f",
  city: "Tegucigalpa", country: "Honduras", countryEs: "Honduras",
};
const coworkerTomas: Person = {
  ...carlos, name: "Tomas", age: 38, relation: "coworker", relationEs: "compañero de trabajo", gender: "m",
  city: "San Salvador", country: "El Salvador", countryEs: "El Salvador",
};
const auntCarmen: Person = {
  ...sofia, name: "Carmen", age: 47, relation: "aunt", relationEs: "tía", gender: "f",
  city: "Guadalajara", country: "Mexico", countryEs: "México",
};

/* --------------------------------- Days ---------------------------------- */

type DayInput = {
  day: number;
  week: 1 | 2 | 3 | 4;
  topic: string;
  topicEs: string;
  lines: ModelLine[];
  prompts: PersonalPrompt[];
  cues: string[];
  introTitle: string;
  introTitleEs: string;
  introLead: string;
  introLeadEs: string;
  examples: string[];
  rep5: { question: string; questionEs: string };
  rep5Tips: { en: string; es: string };
  challenges?: CourseDay["challenges"];
};

const WEEK_TITLES: Record<1 | 2 | 3 | 4, { en: string; es: string }> = {
  1: { en: "WEEK 1 · TELL ME ABOUT YOURSELF — FOUNDATION", es: "SEMANA 1 · HÁBLAME DE TI — BASE" },
  2: { en: "WEEK 2 · TELL ME ABOUT YOURSELF — FLUENCY", es: "SEMANA 2 · HÁBLAME DE TI — FLUIDEZ" },
  3: { en: "WEEK 3 · TELL ME ABOUT SOMEONE ELSE — FOUNDATION", es: "SEMANA 3 · HÁBLAME DE OTRA PERSONA — BASE" },
  4: { en: "WEEK 4 · TELL ME ABOUT SOMEONE ELSE — FLUENCY", es: "SEMANA 4 · HÁBLAME DE OTRA PERSONA — FLUIDEZ" },
};

function makeDay(input: DayInput): CourseDay {
  const week = WEEK_TITLES[input.week];
  return {
    day: input.day,
    week: input.week,
    weekTitle: week.en,
    weekTitleEs: week.es,
    focus: week.en.split("· ")[1] ?? week.en,
    focusEs: week.es.split("· ")[1] ?? week.es,
    topic: input.topic,
    topicEs: input.topicEs,
    goalSeconds: GOAL,
    estimatedMinutes: "6–9 min",
    intro: {
      title: input.introTitle,
      titleEs: input.introTitleEs,
      lead: input.introLead,
      leadEs: input.introLeadEs,
      examples: input.examples,
      goal: "8 sentences. Speak for 30–45 seconds.",
      goalEs: "8 oraciones. Habla de 30 a 45 segundos.",
      cta: "START REP 1",
    },
    lines: input.lines,
    prompts: input.prompts,
    cues: input.cues,
    ...(input.challenges ? { challenges: input.challenges } : {}),
    rep5Prompt: input.rep5,
    rep5Tips: input.rep5Tips,
    modelExample: {
      text: input.lines.map((l) => l.text).join(" "),
      es: input.lines.map((l) => l.es).join(" "),
    },
  };
}

const SELF_CUES = ["NAME", "AGE", "COUNTRY", "CITY", "COLOR", "FOOD", "HOBBIES", "PERSONALITY"];
const OTHER_CUES = ["WHO?", "NAME", "AGE", "COUNTRY", "CITY", "COLOR", "FOOD", "HOBBIES"];

const SELF_TIPS = {
  en: "Say 8 ideas: name, age, country, city, color, food, hobbies, personality. 5 sentences is your minimum.",
  es: "Di 8 ideas: nombre, edad, país, ciudad, color, comida, pasatiempos, personalidad. 5 oraciones es tu mínimo.",
};
const SELF_TIPS_FLUENCY = {
  en: "Connect your ideas with and, because, also, in my free time and overall. 5 sentences is your minimum.",
  es: "Conecta tus ideas con and, because, also, in my free time y overall. 5 oraciones es tu mínimo.",
};
const OTHER_TIPS = {
  en: "Talk about one real person: who, name, age, country, city, color, food, hobbies. 5 sentences is your minimum.",
  es: "Habla de una persona real: quién, nombre, edad, país, ciudad, color, comida, pasatiempos. 5 oraciones es tu mínimo.",
};
const OTHER_TIPS_FLUENCY = {
  en: "Connect your ideas with and, because, in his/her free time and overall. 5 sentences is your minimum.",
  es: "Conecta tus ideas con and, because, in his/her free time y overall. 5 oraciones es tu mínimo.",
};

const SELF_Q = {
  question: "Tell me about yourself.",
  questionEs: "Háblame de ti.",
};
const OTHER_Q = {
  question: "Tell me about someone else.",
  questionEs: "Háblame de otra persona.",
};

function week1Day(day: number, p: Person, topic: string, topicEs: string): CourseDay {
  const id = `bz${day}`;
  return makeDay({
    day,
    week: 1,
    topic,
    topicEs,
    lines: selfLinesFoundation(id, p),
    prompts: selfPromptsFoundation(id),
    cues: SELF_CUES,
    introTitle: "TELL ME ABOUT YOURSELF",
    introTitleEs: "HÁBLAME DE TI",
    introLead: "Today you learn 8 easy sentences about you.",
    introLeadEs: "Hoy aprendes 8 oraciones fáciles sobre ti.",
    examples: ["My name is…", "I am from…", "My favorite food is…"],
    rep5: SELF_Q,
    rep5Tips: SELF_TIPS,
  });
}

function week2Day(day: number, p: Person, topic: string, topicEs: string): CourseDay {
  const id = `bz${day}`;
  return makeDay({
    day,
    week: 2,
    topic,
    topicEs,
    lines: selfLinesFluency(id, p),
    prompts: selfPromptsFluency(id),
    cues: SELF_CUES,
    introTitle: "SAY IT WITH CONNECTORS",
    introTitleEs: "DILO CON CONECTORES",
    introLead: "Same ideas about you — now connected and more natural.",
    introLeadEs: "Las mismas ideas sobre ti — ahora conectadas y más naturales.",
    examples: ["…, and I am…", "… because …", "In my free time, I like to…"],
    rep5: SELF_Q,
    rep5Tips: SELF_TIPS_FLUENCY,
  });
}

function week3Day(day: number, p: Person, topic: string, topicEs: string): CourseDay {
  const id = `bz${day}`;
  return makeDay({
    day,
    week: 3,
    topic,
    topicEs,
    lines: otherLinesFoundation(id, p),
    prompts: otherPromptsFoundation(id),
    cues: OTHER_CUES,
    introTitle: "TELL ME ABOUT SOMEONE ELSE",
    introTitleEs: "HÁBLAME DE OTRA PERSONA",
    introLead: "Today you talk about one important person in your life.",
    introLeadEs: "Hoy hablas de una persona importante en tu vida.",
    examples: ["This is my…", "His name is… / Her name is…", "He lives in… / She lives in…"],
    rep5: OTHER_Q,
    rep5Tips: OTHER_TIPS,
  });
}

function week4Day(day: number, p: Person, topic: string, topicEs: string): CourseDay {
  const id = `bz${day}`;
  return makeDay({
    day,
    week: 4,
    topic,
    topicEs,
    lines: otherLinesFluency(id, p),
    prompts: otherPromptsFluency(id),
    cues: [...OTHER_CUES, "PERSONALITY"],
    introTitle: "SAY IT WITH CONNECTORS",
    introTitleEs: "DILO CON CONECTORES",
    introLead: "Same person — now with and, because and overall.",
    introLeadEs: "La misma persona — ahora con and, because y overall.",
    examples: ["…, and his name is…", "… because …", "Overall, she is a…"],
    rep5: OTHER_Q,
    rep5Tips: OTHER_TIPS_FLUENCY,
  });
}

const BASIC_ZERO_DAYS: CourseDay[] = [
  week1Day(1, carlos, "Carlos — My Introduction", "Carlos — Mi presentación"),
  week1Day(2, sofia, "Sofia — My Introduction", "Sofía — Mi presentación"),
  week1Day(3, daniel, "Daniel — My Introduction", "Daniel — Mi presentación"),
  week1Day(4, valeria, "Valeria — Less Support", "Valeria — Menos apoyo"),
  {
    ...week1Day(5, miguel, "My Introduction Challenge", "Mi reto de presentación"),
    intro: {
      title: "MY INTRODUCTION CHALLENGE",
      titleEs: "MI RETO DE PRESENTACIÓN",
      lead: "Today you speak about YOU — not about the model person.",
      leadEs: "Hoy hablas de TI — no de la persona del modelo.",
      examples: ["My name is…", "I am from…", "Overall, I am a…"],
      goal: "8 sentences about you. 30–45 seconds.",
      goalEs: "8 oraciones sobre ti. 30–45 segundos.",
      cta: "START REP 1",
    },
  },
  week2Day(6, sofia, "Sofia — Connected Speaking", "Sofía — Habla conectada"),
  week2Day(7, andres, "Andres — Connected Speaking", "Andrés — Habla conectada"),
  week2Day(8, lucia, "Lucia — Connected Speaking", "Lucía — Habla conectada"),
  week2Day(9, paola, "Paola — Less Support", "Paola — Menos apoyo"),
  {
    ...week2Day(10, carlos, "Tell Me About Yourself — Final Challenge", "Háblame de ti — Reto final"),
    intro: {
      title: "FINAL CHALLENGE",
      titleEs: "RETO FINAL",
      lead: "Speak about yourself: 8 sentences, 30–45 seconds.",
      leadEs: "Habla de ti: 8 oraciones, 30–45 segundos.",
      examples: ["My name is…, and I am…", "… because …", "Overall, I am a…"],
      goal: "8 sentences about you. 30–45 seconds.",
      goalEs: "8 oraciones sobre ti. 30–45 segundos.",
      cta: "START REP 1",
    },
  },
  week3Day(11, sisterAna, "My Sister", "Mi hermana"),
  week3Day(12, brotherLuis, "My Brother", "Mi hermano"),
  week3Day(13, motherRosa, "My Mother", "Mi mamá"),
  week3Day(14, friendJorge, "My Friend", "Mi amigo"),
  week3Day(15, cousinMaria, "Someone Important To Me", "Alguien importante para mí"),
  week4Day(16, fatherPedro, "My Father — Connected Speaking", "Mi papá — Habla conectada"),
  week4Day(17, friendCamila, "My Friend — Connected Speaking", "Mi amiga — Habla conectada"),
  week4Day(18, coworkerTomas, "My Coworker — Connected Speaking", "Mi compañero — Habla conectada"),
  week4Day(19, auntCarmen, "Someone Important — Less Support", "Alguien importante — Menos apoyo"),
  {
    ...week4Day(20, sisterAna, "Basic Zero — Final Challenge", "Basic Zero — Reto final"),
    intro: {
      title: "BASIC ZERO FINAL CHALLENGE",
      titleEs: "RETO FINAL DE BASIC ZERO",
      lead: "Two challenges: tell me about yourself, then about someone else.",
      leadEs: "Dos retos: háblame de ti y luego de otra persona.",
      examples: ["Tell me about yourself.", "Tell me about someone else."],
      goal: "8 sentences each. 30–45 seconds.",
      goalEs: "8 oraciones cada uno. 30–45 segundos.",
      cta: "START REP 1",
    },
    challenges: [
      {
        id: "bz20-c1",
        title: "CHALLENGE 1 — TELL ME ABOUT YOURSELF",
        titleEs: "RETO 1 — HÁBLAME DE TI",
        detail: "8 sentences about you. 30–45 seconds.",
        detailEs: "8 oraciones sobre ti. 30–45 segundos.",
        cues: SELF_CUES,
      },
      {
        id: "bz20-c2",
        title: "CHALLENGE 2 — TELL ME ABOUT SOMEONE ELSE",
        titleEs: "RETO 2 — HÁBLAME DE OTRA PERSONA",
        detail: "8 sentences about one real person. 30–45 seconds.",
        detailEs: "8 oraciones sobre una persona real. 30–45 segundos.",
        cues: [...OTHER_CUES, "PERSONALITY"],
      },
    ],
    rep5Prompt: {
      question: "Tell me about yourself. Then tell me about someone else.",
      questionEs: "Háblame de ti. Luego háblame de otra persona.",
    },
    rep5Tips: {
      en: "Two parts in one take: first you, then the other person. 5 sentences is your minimum.",
      es: "Dos partes en una toma: primero tú, luego la otra persona. 5 oraciones es tu mínimo.",
    },
  },
];

export const BASIC_ZERO_WEEKS = [
  { week: 1 as const, title: "WEEK 1", subtitle: "Tell Me About Yourself — Foundation", subtitleEs: "Háblame de ti — Base" },
  { week: 2 as const, title: "WEEK 2", subtitle: "Tell Me About Yourself — Fluency", subtitleEs: "Háblame de ti — Fluidez" },
  { week: 3 as const, title: "WEEK 3", subtitle: "Tell Me About Someone Else — Foundation", subtitleEs: "Háblame de otra persona — Base" },
  { week: 4 as const, title: "WEEK 4", subtitle: "Tell Me About Someone Else — Fluency", subtitleEs: "Háblame de otra persona — Fluidez" },
];

export { BASIC_ZERO_DAYS };
