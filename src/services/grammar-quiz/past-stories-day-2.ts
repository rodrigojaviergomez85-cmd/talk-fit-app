import { mc, mistake, rearrange, type GrammarQuiz } from "./types";

/**
 * BASIC 3 · Día 2 — At Work Yesterday (verbos regulares -ed).
 * 8 ancla · 8 transferencia · 4 trampas.
 */
export const PAST_STORIES_DAY_2: GrammarQuiz = {
  moduleId: "past-stories",
  day: 2,
  title: { en: "At Work Yesterday", es: "En el trabajo ayer" },
  items: [
    // ── Ancla ──────────────────────────────────────────────────────────────
    mc("m3g2-1", "I ___ at work around eight.", "Llegué al trabajo como a las ocho.", ["arrive", "arrives", "arrived", "arriving"], 2, {
      en: "Regular verb: arrive + d = arrived.",
      es: "Verbo regular: arrive + d = arrived.",
    }),
    mc("m3g2-2", "I ___ to several customers.", "Hablé con varios clientes.", ["talk", "talked", "talks", "talking"], 1, {
      en: "talk + ed = talked.",
      es: "talk + ed = talked.",
    }),
    mc("m3g2-3", "I ___ a customer with a problem.", "Ayudé a un cliente con un problema.", ["helps", "help", "helping", "helped"], 3, {
      en: "help + ed = helped.",
      es: "help + ed = helped. Una sola p.",
    }),
    mc("m3g2-4", "Overall, it ___ a busy day.", "En general, fue un día ocupado.", ["is", "was", "were", "did"], 1, {
      en: "it was: the past of is.",
      es: "it was: el pasado de is. did no va con adjetivos.",
    }),
    mistake("m3g2-5", "I answer emails all morning yesterday.", "answer", "answered", {
      en: "Yesterday needs the past: answered.",
      es: "Con yesterday el verbo va en pasado: answered. Dejarlo sin -ed es el error más común.",
    }),
    mistake("m3g2-6", "I finish work around five and went home.", "finish", "finished", {
      en: "Both verbs go in the past: finished ... and went.",
      es: "Los dos verbos van en pasado: finished ... and went. No se mezcla.",
    }),
    rearrange(
      "m3g2-7",
      ["my day", "with a meeting", "started", "I", "Yesterday,"],
      ["Yesterday,", "I", "started", "my day", "with a meeting"],
      { en: "Time word, subject, verb, object, detail.", es: "Palabra de tiempo, sujeto, verbo, objeto, detalle." },
    ),
    rearrange(
      "m3g2-8",
      ["with my coworkers", "had", "lunch", "I"],
      ["I", "had", "lunch", "with my coworkers"],
      { en: "Subject + verb + object + who with.", es: "Sujeto + verbo + objeto + con quién." },
    ),

    // ── Transferencia ──────────────────────────────────────────────────────
    mc("m3g2-9", "My supervisor ___ the meeting at nine.", "Mi supervisor empezó la reunión a las nueve.", ["starts", "started", "start", "starting"], 1, {
      en: "Regular past: started. Same form for he, she, I, they.",
      es: "Pasado regular: started. Es igual para he, she, I, they; no lleva -s.",
    }),
    mc("m3g2-10", "The customers ___ for twenty minutes.", "Los clientes esperaron veinte minutos.", ["wait", "waits", "waited", "waiting"], 2, {
      en: "wait + ed = waited.",
      es: "wait + ed = waited.",
    }),
    mc("m3g2-11", "She ___ the call at five thirty.", "Ella terminó la llamada a las cinco y media.", ["finish", "finished", "finishes", "finishing"], 1, {
      en: "finish + ed = finished.",
      es: "finish + ed = finished.",
    }),
    mistake("m3g2-12", "My coworker helpped me with the system.", "helpped", "helped", {
      en: "help + ed = helped, one p.",
      es: "help + ed = helped, una sola p. Solo se dobla la consonante en verbos como stop → stopped.",
    }),
    mistake("m3g2-13", "The team work until nine last night.", "work", "worked", {
      en: "last night needs the past: worked.",
      es: "Con last night el verbo va en pasado: worked. The team es singular pero eso no cambia el pasado.",
    }),
    rearrange(
      "m3g2-14",
      ["the phone", "answered", "Carlos", "on the first ring"],
      ["Carlos", "answered", "the phone", "on the first ring"],
      { en: "Subject + verb + object + detail.", es: "Sujeto + verbo + objeto + detalle." },
    ),
    rearrange(
      "m3g2-15",
      ["late", "arrived", "The bus", "so", "I", "walked"],
      ["The bus", "arrived", "late", "so", "I", "walked"],
      { en: "Two past actions joined by so.", es: "Dos acciones en pasado unidas por so: el bus llegó tarde, así que caminé." },
    ),
    rearrange(
      "m3g2-16",
      ["a busy day", "it", "was", "for everyone", "Overall,"],
      ["Overall,", "it", "was", "a busy day", "for everyone"],
      { en: "Overall, it was ... for everyone.", es: "Overall, it was ... for everyone. was va después de it." },
    ),

    // ── Trampas ────────────────────────────────────────────────────────────
    mc("m3g2-17", "___ you talk to the manager yesterday?", "¿Hablaste con el gerente ayer?", ["Did", "Do", "Were", "Was"], 0, {
      en: "Past question: Did + you + talk.",
      es: "Pregunta en pasado: Did + you + talk. Nunca Did you talked.",
    }),
    mistake("m3g2-18", "Yesterday I have a meeting with my boss.", "have", "had", {
      en: "Yesterday needs the past: had.",
      es: "Con yesterday: had. Dejar have en presente es el error número uno en llamadas.",
    }),
    mistake("m3g2-19", "He didn't finished the report.", "finished", "finish", {
      en: "After didn't, the verb goes to base form: didn't finish.",
      es: "Después de didn't el verbo va en forma base: didn't finish. El pasado ya está en did.",
    }),
    mistake("m3g2-20", "I stayed in home because I was sick.", "in", "at", {
      en: "stay at home, not in home.",
      es: "En inglés es stay at home. «In home» es calco de «en casa».",
    }),
  ],
};
