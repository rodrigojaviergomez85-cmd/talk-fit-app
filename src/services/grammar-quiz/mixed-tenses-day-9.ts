import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 4 · Día 9 — Listen & Respond (Ana en el call center: rutina, ayer, mañana).
 * Historia: el día de Ana con diadema, contado por Kat.
 * 6 ancla · 6 transferencia · 4 repaso (progresivo, Did, will) · 4 básicos.
 */
const DETECTIVE = "Kat escribió el día de Ana en el reporte. Toca el error antes de que lo mande.";
const CHISME = "Luis lo contó en desorden. Ordena la frase.";

export const MIXED_TENSES_DAY_9: GrammarQuiz = {
  moduleId: "mixed-tenses",
  day: 9,
  title: { en: "Ana with Her Headset On", es: "Ana con la diadema puesta" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m5g9-1", "Ana ___ at a bilingual call center. Every morning, she ___ coffee and ___ her headset.", "Ana trabaja en un call center bilingüe. Todas las mañanas toma café y revisa su diadema.", ["works / drinks / checks", "work / drink / check", "worked / drinks / checks", "works / drank / checked"], 0, {
      en: "Routine, third person: works, drinks, checks.",
      es: "Rutina, tercera persona: works, drinks, checks. Tres verbos, tres -s.",
    }),
    mc("m5g9-2", "She usually ___ forty calls a day. Yesterday, she ___ fifty-five.", "Normalmente contesta cuarenta llamadas al día. Ayer contestó cincuenta y cinco.", ["answers / answered", "answered / answers", "answer / answered", "answers / answer"], 0, {
      en: "usually: answers. yesterday: answered.",
      es: "usually: answers. yesterday: answered.",
    }),
    mc("m5g9-3", "Tomorrow, she ___ with a new app.", "Mañana va a practicar con una app nueva.", ["is going to practice", "practiced", "practices", "was practicing"], 0, {
      en: "Tomorrow: is going to practice.",
      es: "Tomorrow: is going to practice.",
    }),
    mistake("m5g9-4", "She always smile when she talks.", "smile", "smiles", {
      en: "she smiles.",
      es: "she smiles, con -s. always es rutina.",
    }, DETECTIVE),
    mistake("m5g9-5", "Yesterday, one customer thank her twice.", "thank", "thanked", {
      en: "Yesterday: thanked.",
      es: "Yesterday: thanked, pasado.",
    }, DETECTIVE),
    rearrange(
      "m5g9-6",
      ["for twenty minutes", "English", "she", "After her shift,", "practices"],
      ["After her shift,", "she", "practices", "English", "for twenty minutes"],
      { en: "Time + she + practices + object + how long.", es: "Tiempo + she + practices + objeto + cuánto tiempo." },
      CHISME,
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m5g9-7", "Kat: Luis usually ___ thirty calls, but yesterday he ___ only ten. The system was down.", "Kat: Luis normalmente toma treinta llamadas, pero ayer tomó solo diez. El sistema estaba caído.", ["takes / took", "took / takes", "take / took", "takes / take"], 0, {
      en: "usually: takes. yesterday: took.",
      es: "usually: takes. yesterday: took.",
    }),
    mc("m5g9-8", "Luis: Tomorrow Ana and I ___ the new agents. We ___ them the headset first.", "Luis: Mañana Ana y yo vamos a entrenar a los agentes nuevos. Les vamos a mostrar la diadema primero.", ["are going to train / 'll show", "trained / showed", "train / show", "are training / showed"], 0, {
      en: "Plan: are going to train. Then: we'll show.",
      es: "Plan: are going to train. Luego, decisión: we'll show.",
    }),
    mc("m5g9-9", "Kat: ___ Ana ___ English every day? · Luis: Yes, she does, after her shift.", "Kat: ¿Ana practica inglés todos los días? · Luis: Sí, después de su turno.", ["Does / practice", "Does / practices", "Did / practice", "Do / practice"], 0, {
      en: "Does Ana practice? Base form after Does.",
      es: "Does Ana practice? Forma base después de Does; la -s ya está en Does.",
    }),
    mistake("m5g9-10", "Yesterday Ana didn't took a break at all.", "took", "take", {
      en: "didn't + base form: didn't take.",
      es: "didn't + forma base: didn't take.",
    }, DETECTIVE),
    rearrange(
      "m5g9-11",
      ["twice", "thanked", "a customer", "Ana", "Yesterday,"],
      ["Yesterday,", "a customer", "thanked", "Ana", "twice"],
      { en: "Time + subject + thanked + object + twice.", es: "Tiempo + sujeto + thanked + objeto + twice (dos veces)." },
      CHISME,
    ),
    rearrange(
      "m5g9-12",
      ["is going to", "Ana", "the new app", "try", "tomorrow"],
      ["Ana", "is going to", "try", "the new app", "tomorrow"],
      { en: "Subject + is going to + verb + object + time.", es: "Sujeto + is going to + verbo + objeto + tiempo." },
      CHISME,
    ),

    // ── Repaso ─────────────────────────────────────────────────────────────
    mc("m5g9-13", "Luis: Right now Ana ___ to a customer from Texas.", "Luis: Ahora mismo Ana está hablando con un cliente de Texas.", ["is talking", "talks", "was talking", "talked"], 0, {
      en: "Right now: is talking.",
      es: "Right now: is talking. Repaso de Basic 2.",
    }),
    mc("m5g9-14", "Kat: At four yesterday, Ana ___ her fiftieth call.", "Kat: Ayer a las cuatro Ana estaba contestando su llamada número cincuenta.", ["was answering", "answers", "is answering", "answer"], 0, {
      en: "At four yesterday: was answering.",
      es: "At four yesterday, en progreso: was answering. Repaso de Basic 3.",
    }),
    mistake("m5g9-15", "I think Ana will passes the audit next month.", "passes", "pass", {
      en: "will + base verb: will pass.",
      es: "will + verbo base: will pass, sin -s. Repaso de Basic 1.",
    }, DETECTIVE),
    mistake("m5g9-16", "Did Ana answered fifty calls yesterday?", "answered", "answer", {
      en: "Did + base form: Did Ana answer?",
      es: "Did + forma base: Did Ana answer? Repaso de Basic 3.",
    }, DETECTIVE),

    // ── Básicos ────────────────────────────────────────────────────────────
    mc("m5g9-17", "Ana works ___ a call center ___ the city center.", "Ana trabaja en un call center en el centro de la ciudad.", ["at / in", "in / at", "on / in", "at / on"], 0, {
      en: "works at a call center, in the city center.",
      es: "at a call center: el lugar de trabajo. in the city center: dentro de la zona.",
    }),
    mc("m5g9-18", "She answered fifty-five calls ___ one customer thanked ___ twice.", "Contestó cincuenta y cinco llamadas y un cliente le dio las gracias dos veces.", ["and / her", "and / she", "but / her", "and / hers"], 0, {
      en: "and (adding), her (object pronoun).",
      es: "and para sumar; her, no she, después del verbo (thanked her).",
    }),
    mistake("m5g9-19", "Ana drinks a coffee and checks his headset every morning.", "his", "her", {
      en: "Ana = she: her headset.",
      es: "Ana = she: her headset. his es de él.",
    }, DETECTIVE),
    mistake("m5g9-20", "Ana is very good in English.", "in", "at", {
      en: "good at something.",
      es: "good at: ser bueno en algo. «Good in English» es calco de «buena en inglés».",
    }, DETECTIVE),
  ],
};
