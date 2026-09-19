import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC ZERO · Día 20 — Final challenge: tell me about yourself and about
 * someone else. Todo el nivel en un examen fácil.
 * (Semana 4, día 5: BASIC ZERO — FINAL CHALLENGE)
 * 8 ancla · 6 transferencia · 4 repaso · 2 trampas.
 */
const DETECTIVE = "Carlos escribió su presentación final. Toca la palabra equivocada.";
const CHISME = "Carlos dijo la frase en desorden. Ordénala.";

export const BASIC_ZERO_DAY_20: GrammarQuiz = {
  moduleId: "basic-zero",
  day: 20,
  title: { en: "Me and Someone Important", es: "Yo y alguien importante" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("bzg20-1", "My name ___ Carlos. I ___ 22 years old.", "Me llamo Carlos. Tengo 22 años.", ["is / am", "am / have", "is / have"], 0, {
      en: "My name is; I am 22.",
      es: "My name is, I am 22. Nombre con is, edad con am.",
    }),
    mc("bzg20-2", "I ___ from El Salvador and I ___ in San Salvador.", "Soy de El Salvador y vivo en San Salvador.", ["am / live", "am / lives", "is / live"], 0, {
      en: "I am; I live.",
      es: "I am from, I live in. Sin -s.",
    }),
    mc("bzg20-3", "My favorite color ___ blue and my favorite food ___ pizza.", "Mi color favorito es el azul y mi comida favorita es la pizza.", ["is / is", "are / is", "is / are"], 0, {
      en: "is, is.",
      es: "color → is, food → is.",
    }),
    mc("bzg20-4", "This is my sister Ana. ___ is 25 and ___ favorite fruit is mango.", "Esta es mi hermana Ana. Tiene 25 y su fruta favorita es el mango.", ["She / her", "Her / she", "He / his"], 0, {
      en: "She is; her favorite.",
      es: "she antes del verbo, her antes del sustantivo.",
    }),
    mistake("bzg20-5", "I have 22 years old and I am a student.", "have", "am", {
      en: "I am 22.",
      es: "I am 22 years old. La edad con am.",
    }, DETECTIVE),
    mistake("bzg20-6", "This is my brother Luis. Her name is Luis.", "Her", "His", {
      en: "brother → his.",
      es: "brother → His name.",
    }, DETECTIVE),
    rearrange(
      "bzg20-7",
      ["a student", "I am", "and I live in San Salvador"],
      ["I am", "a student", "and I live in San Salvador"],
      { en: "I am + a student + and I live in.", es: "I am + a student + and I live in." },
      CHISME,
    ),
    rearrange(
      "bzg20-8",
      ["is", "my sister", "This", "Ana"],
      ["This", "is", "my sister", "Ana"],
      { en: "This + is + my sister + name.", es: "This + is + my sister + nombre." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("bzg20-9", "Sofia ___ 28. She ___ an engineer and she ___ in Guadalajara.", "Sofía tiene 28. Es ingeniera y vive en Guadalajara.", ["is / is / lives", "has / is / live", "is / has / lives"], 0, {
      en: "is 28, is an engineer, lives.",
      es: "is 28 (edad), is an engineer (profesión), lives (con -s).",
    }),
    mc("bzg20-10", "My parents ___ from Peru. ___ names are Pedro and Rosa, and I love ___.", "Mis papás son de Perú. Sus nombres son Pedro y Rosa, y los quiero.", ["are / Their / them", "is / His / they", "are / Their / they"], 0, {
      en: "are, their, them.",
      es: "parents → are; their names; I love them.",
    }),
    mc("bzg20-11", "Where ___ you from and where ___ you live?", "¿De dónde eres y dónde vives?", ["are / do", "is / do", "are / are"], 0, {
      en: "Where are you from? Where do you live?",
      es: "from va con are; live va con do.",
    }),
    mistake("bzg20-12", "My best friend is a artist and he is very funny.", "a", "an", {
      en: "an artist.",
      es: "an artist: vocal.",
    }, DETECTIVE),
    rearrange(
      "bzg20-13",
      ["is", "from Mexico", "My best friend"],
      ["My best friend", "is", "from Mexico"],
      { en: "My best friend + is + from.", es: "My best friend + is + from." },
      CHISME,
    ),
    rearrange(
      "bzg20-14",
      ["hardworking", "He is", "and honest"],
      ["He is", "hardworking", "and honest"],
      { en: "He is + adjective + and + adjective.", es: "He is + adjetivo + and + adjetivo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("bzg20-15", "___ is my dog and ___ are my cats.", "Este es mi perro y estos son mis gatos.", ["This / these", "These / this", "This / this"], 0, {
      en: "this (one), these (many).",
      es: "this para uno, these para varios.",
    }),
    mc("bzg20-16", "The dog is mine and the cats are ___. (my sister)", "El perro es mío y los gatos son de ella (mi hermana).", ["hers", "her", "his"], 0, {
      en: "my sister → hers.",
      es: "my sister → hers, al final.",
    }),
    mistake("bzg20-17", "My birthday is on March and my favorite fruit is mango.", "on", "in", {
      en: "in March.",
      es: "in March: solo el mes → in.",
    }, DETECTIVE),
    mistake("bzg20-18", "My sister's eyes am brown and her hair is long.", "am", "are", {
      en: "eyes → are.",
      es: "eyes es plural → are. am es solo para I.",
    }, DETECTIVE),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("bzg20-19", "Overall, I am ___ friendly and positive person.", "En general, soy una persona amable y positiva.", ["a", "an", "the"], 0, {
      en: "a friendly person.",
      es: "a friendly and positive person: person pide a, y friendly empieza con consonante.",
    }),
    mistake("bzg20-20", "I am a friendly person and my sister is friendly too. I love she.", "she.", "her.", {
      en: "I love her.",
      es: "I love her. Después del verbo va her, no she.",
    }, DETECTIVE),
  ],
};
