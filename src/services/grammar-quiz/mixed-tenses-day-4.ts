import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 4 — An Interesting Day (irregulares: drove, slept, swam, read,
 * wrote, spent, forgot, lost, found).
 * Historia: el sábado de Mateo en la piscina pública.
 * 6 ancla · 6 transferencia · 4 repaso (presente, futuro, progresivo) · 4 básicos.
 */
const DETECTIVE = "Mateo escribió su sábado en el chat. Toca el error antes de que lo mande.";
const CHISME = "Dylan lo contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_4: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 4,
  title: { en: "Mateo's Saturday", es: "El sábado de Mateo" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g4-1", "Last Saturday, I ___ downtown early in the morning.", "El sábado pasado manejé al centro temprano en la mañana.", ["drove", "drive", "drives", "driven"], 0, {
      en: "drive → drove.",
      es: "drive → drove. Irregular.",
    }),
    mc("m5g4-2", "I ___ badly the night before, but I ___ excited.", "Dormí mal la noche anterior, pero me sentía emocionado.", ["slept / felt", "sleep / feel", "slept / feel", "sleeps / felt"], 0, {
      en: "sleep → slept, feel → felt.",
      es: "sleep → slept, feel → felt. Los dos irregulares.",
    }),
    mc("m5g4-3", "I ___ at the public pool for an hour.", "Nadé en la piscina pública una hora.", ["swam", "swim", "swims", "swum"], 0, {
      en: "swim → swam.",
      es: "swim → swam. swum es el participio.",
    }),
    mistake("m5g4-4", "Then I readed my favorite book in the park.", "readed", "read", {
      en: "read → read (same spelling, different sound).",
      es: "read → read: se escribe igual, se pronuncia «red». Nunca readed.",
    }, DETECTIVE),
    mistake("m5g4-5", "I forgot my sunglasses at the pool and almost lose my phone.", "lose", "lost", {
      en: "lose → lost.",
      es: "lose → lost. Las dos acciones en pasado: forgot ... lost.",
    }, DETECTIVE),
    rearrange(
      "m5g4-6",
      ["to an old friend", "I", "a long message", "wrote"],
      ["I", "wrote", "a long message", "to an old friend"],
      { en: "Subject + wrote + object + to whom.", es: "Sujeto + wrote + objeto + a quién. write → wrote." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g4-7", "Dylan: My cousin ___ his keys at the pool, but a girl ___ them.", "Dylan: Mi primo perdió sus llaves en la piscina, pero una chica las encontró.", ["lost / found", "lose / find", "lost / find", "loses / found"], 0, {
      en: "lose → lost, find → found.",
      es: "lose → lost, find → found. Tercera persona, mismas formas.",
    }),
    mc("m5g4-8", "Mateo: We ___ the whole afternoon outside and ___ home at six.", "Mateo: Pasamos toda la tarde afuera y manejamos a casa a las seis.", ["spent / drove", "spend / drive", "spent / drive", "spends / drove"], 0, {
      en: "spend → spent, drive → drove.",
      es: "spend → spent, drive → drove.",
    }),
    mc("m5g4-9", "Kat: ___ you ___ well last night? · Mateo: No, I slept badly.", "Kat: ¿Dormiste bien anoche? · Mateo: No, dormí mal.", ["Did / sleep", "Did / slept", "Do / sleep", "Were / sleep"], 0, {
      en: "Did you sleep? Base form after Did.",
      es: "Did you sleep? Forma base después de Did, aunque la respuesta sea slept.",
    }),
    mistake("m5g4-10", "Dylan swimmed for two hours on Sunday.", "swimmed", "swam", {
      en: "swim → swam.",
      es: "swim → swam. Irregular; swimmed no existe.",
    }, DETECTIVE),
    rearrange(
      "m5g4-11",
      ["her phone", "at the pool", "Kat", "forgot", "Last Saturday,"],
      ["Last Saturday,", "Kat", "forgot", "her phone", "at the pool"],
      { en: "Time + subject + forgot + object + place.", es: "Tiempo + sujeto + forgot + objeto + lugar. forget → forgot." },
      CHISME,
    ),
    rearrange(
      "m5g4-12",
      ["in the park", "for an hour", "read", "My dad"],
      ["My dad", "read", "for an hour", "in the park"],
      { en: "Subject + read + how long + place.", es: "Sujeto + read + cuánto tiempo + lugar." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g4-13", "Mateo: I usually ___ at the pool on Saturdays. Next Saturday I ___ at the beach.", "Mateo: Normalmente nado en la piscina los sábados. El próximo sábado voy a nadar en la playa.", ["swim / am going to swim", "swam / swim", "swim / swam", "swims / am going to swim"], 0, {
      en: "usually: swim. next Saturday: am going to swim.",
      es: "usually: swim, rutina. next Saturday: am going to swim, plan.",
    }),
    mc("m5g4-14", "Dylan: At three yesterday, I ___ my book by the pool.", "Dylan: Ayer a las tres estaba leyendo mi libro junto a la piscina.", ["was reading", "read", "am reading", "reads"], 0, {
      en: "At three yesterday = in progress: was reading.",
      es: "At three yesterday es un momento en progreso: was reading. Repaso de Basic 3.",
    }),
    mistake("m5g4-15", "Mateo drive downtown every Saturday.", "drive", "drives", {
      en: "Mateo = he: drives.",
      es: "Mateo = he: drives, con -s. Rutina en presente. Repaso de Basic 2.",
    }, DETECTIVE),
    mistake("m5g4-16", "Next weekend I will writing a message to my friend.", "writing", "write", {
      en: "will + base verb: will write.",
      es: "will + verbo base: will write. Nunca will + -ing. Repaso de Basic 1.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g4-17", "I swam ___ the pool and read ___ a bench ___ the park.", "Nadé en la piscina y leí en una banca en el parque.", ["in / on / in", "on / in / at", "at / at / at", "in / in / on"], 0, {
      en: "in the pool, on a bench, in the park.",
      es: "in the pool: dentro del agua. on a bench: sobre la banca. in the park: dentro del parque.",
    }),
    mc("m5g4-18", "I lost my phone, but ___ man found ___ phone and gave it back.", "Perdí mi teléfono, pero un hombre lo encontró y me lo devolvió.", ["a / the", "the / a", "a / a", "an / the"], 0, {
      en: "a man (first mention), the phone (we know which one).",
      es: "a man: alguien, primera vez. the phone: ya sabemos cuál, el mío.",
    }),
    mistake("m5g4-19", "I forgot my sunglass at the pool.", "sunglass", "sunglasses", {
      en: "sunglasses is always plural.",
      es: "sunglasses siempre va en plural, como glasses y pants.",
    }, DETECTIVE),
    mistake("m5g4-20", "I drove downtown with my car.", "with", "in", {
      en: "in my car, not with my car.",
      es: "in my car: en mi carro. «With my car» es calco de «con mi carro».",
    }, DETECTIVE),
  ],
};
