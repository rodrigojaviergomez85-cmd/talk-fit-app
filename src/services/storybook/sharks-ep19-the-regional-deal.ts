import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/sharks-ep19-the-regional-deal/cover.jpg";
import s1 from "@/assets/storybook/sharks-ep19-the-regional-deal/s1.jpg";
import s2 from "@/assets/storybook/sharks-ep19-the-regional-deal/s2.jpg";
import s3 from "@/assets/storybook/sharks-ep19-the-regional-deal/s3.jpg";
import s4 from "@/assets/storybook/sharks-ep19-the-regional-deal/s4.jpg";
import s5 from "@/assets/storybook/sharks-ep19-the-regional-deal/s5.jpg";
import s6 from "@/assets/storybook/sharks-ep19-the-regional-deal/s6.jpg";
import s7 from "@/assets/storybook/sharks-ep19-the-regional-deal/s7.jpg";
import s8 from "@/assets/storybook/sharks-ep19-the-regional-deal/s8.jpg";
import s9 from "@/assets/storybook/sharks-ep19-the-regional-deal/s9.jpg";
import s10 from "@/assets/storybook/sharks-ep19-the-regional-deal/s10.jpg";
import s11 from "@/assets/storybook/sharks-ep19-the-regional-deal/s11.jpg";

export const SHARKS_EP19_THE_REGIONAL_DEAL: StorybookEpisode = {
  id: "sharks-ep19-the-regional-deal",
  moduleId: "sharks",
  week: 4,
  title: "The Mexico Deal",
  titleEs: "El acuerdo de México",
  episodeLabel: {
    en: "Season 8 · Episode 19",
    es: "Temporada 8 · Episodio 19",
  },
  previously: [
    {
      en: "Renata asked for fifty new groups, and Vale said no with respect, protecting quality first.",
      es: "Renata pidió cincuenta grupos nuevos, y Vale dijo que no con respeto, protegiendo primero la calidad.",
    },
  ],
  reviewWords: [
    { word: "quality", es: "calidad" },
    { word: "capacity", es: "capacidad" },
    { word: "agreement", es: "acuerdo" },
  ],
  blurb: {
    en: "Vale and Renata sit down to put the Mexico deal on paper: milestones, training, exclusivity. Then a press leak announces something that is not signed yet.",
    es: "Vale y Renata se sientan a poner el acuerdo de México en papel: hitos, capacitación, exclusividad. Entonces una filtración a la prensa anuncia algo que aún no está firmado.",
  },
  cover: cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Renata welcomes Vale and Camila into her Monterrey office to draft the Mexico agreement.",
      text: "Before signing, I need a clause review. Every point must be clear for both of us.",
      es: "Antes de firmar, necesito una revisión de cláusulas. Cada punto debe ser claro para ambas.",
      speaker: "vale",
      cast: ["vale", "renata", "camila"],
      lines: [
        {
          speaker: "renata",
          text: "Welcome. Today we put on paper exactly what Mexico needs from this regional partnership.",
          es: "Bienvenidas. Hoy ponemos en papel exactamente lo que México necesita de esta sociedad regional.",
        },
        {
          speaker: "vale",
          text: "Before signing, I need a clause review. Every point must be clear for both of us.",
          es: "Antes de firmar, necesito una revisión de cláusulas. Cada punto debe ser claro para ambas.",
        },
        {
          speaker: "camila",
          text: "Agreed. And the territory is only Renata's affiliated schools here in Mexico, not the whole country.",
          es: "De acuerdo. Y el territorio son solo las escuelas afiliadas de Renata aquí en México, no todo el país.",
        },
      ],
      words: [
        { word: "clause review", es: "revisión de cláusulas" },
        { word: "partnership", es: "sociedad / alianza" },
        { word: "territory", es: "territorio" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Camila writes two milestones on a whiteboard while Renata and Vale review the timeline.",
      text: "Milestone one: twenty groups in September. Milestone two: forty in January. Correct?",
      es: "Hito uno: veinte grupos en septiembre. Hito dos: cuarenta en enero. ¿Correcto?",
      speaker: "camila",
      cast: ["camila", "renata", "vale"],
      lines: [
        {
          speaker: "camila",
          text: "Milestone one: twenty groups in September. Milestone two: forty in January. Correct?",
          es: "Hito uno: veinte grupos en septiembre. Hito dos: cuarenta en enero. ¿Correcto?",
        },
        {
          speaker: "renata",
          text: "Correct. And if we miss the first milestone, the agreement pauses, it does not cancel. That point is not negotiable.",
          es: "Correcto. Y si fallamos el primer hito, el acuerdo se pausa, no se cancela. Ese punto no es negociable.",
        },
        {
          speaker: "vale",
          text: "I like that. It is honest. We should never promise a launch we cannot deliver.",
          es: "Eso me gusta. Es honesto. Nunca deberíamos prometer un lanzamiento que no podemos cumplir.",
        },
      ],
      words: [
        { word: "milestone", es: "hito / meta importante" },
        { word: "agreement", es: "acuerdo" },
        { word: "launch", es: "lanzamiento" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale explains the mandatory bilingual teacher training while Renata and Camila take notes.",
      text: "Teacher training is mandatory. Every teacher passes the Vale course before entering the classroom.",
      es: "La capacitación docente es obligatoria. Cada maestro pasa el curso de Vale antes de entrar al salón.",
      speaker: "vale",
      cast: ["vale", "renata", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "Teacher training is mandatory. Every teacher passes the Vale course before entering the classroom.",
          es: "La capacitación docente es obligatoria. Cada maestro pasa el curso de Vale antes de entrar al salón.",
        },
        {
          speaker: "renata",
          text: "I accept that. But the training must run in Spanish and in English, for every teacher.",
          es: "Acepto eso. Pero la capacitación debe darse en español y en inglés, para todos los maestros.",
        },
        {
          speaker: "camila",
          text: "And we run a quality check every two months, not only once at the very end.",
          es: "Y hacemos un control de calidad cada dos meses, no solo una vez al final.",
        },
      ],
      words: [
        { word: "mandatory", es: "obligatorio" },
        { word: "classroom", es: "salón de clases" },
        { word: "quality check", es: "control de calidad" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Renata, Vale and Camila divide responsibilities on a shared document at the meeting table.",
      text: "I take care of the schools, the classrooms, and parent registration.",
      es: "Yo me encargo de las escuelas, las aulas y la inscripción de padres.",
      speaker: "renata",
      cast: ["renata", "vale", "camila"],
      lines: [
        {
          speaker: "renata",
          text: "I take care of the schools, the classrooms, and parent registration.",
          es: "Yo me encargo de las escuelas, las aulas y la inscripción de padres.",
        },
        {
          speaker: "vale",
          text: "I take care of the method, the materials, and every teacher's training.",
          es: "Yo me encargo del método, los materiales y la capacitación de cada maestro.",
        },
        {
          speaker: "camila",
          text: "And I supervise the dashboard and send monthly reports to both of you.",
          es: "Y yo superviso el panel de control y envío informes mensuales a ambas.",
        },
      ],
      words: [
        { word: "registration", es: "inscripción" },
        { word: "materials", es: "materiales" },
        { word: "dashboard", es: "panel de control" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Renata points at a Mexico map on the wall while explaining that Guatemala stays out of the deal.",
      text: "Guatemala is not part of this agreement. That is another country, another conversation.",
      es: "Guatemala no forma parte de este acuerdo. Ese es otro país, otra conversación.",
      speaker: "renata",
      cast: ["renata", "vale", "camila"],
      lines: [
        {
          speaker: "renata",
          text: "Guatemala is not part of this agreement. That is another country, another conversation.",
          es: "Guatemala no forma parte de este acuerdo. Ese es otro país, otra conversación.",
        },
        {
          speaker: "vale",
          text: "Correct. Mexico first. If it works, we can talk about other territories later.",
          es: "Correcto. México primero. Si funciona, podemos hablar de otros territorios después.",
        },
        {
          speaker: "camila",
          text: "The dashboard will only track your Mexican schools, so nothing crosses into Guatemala by mistake.",
          es: "El panel solo dará seguimiento a tus escuelas mexicanas, para que nada cruce a Guatemala por error.",
        },
      ],
      words: [
        { word: "territories", es: "territorios" },
        { word: "cross", es: "cruzar" },
        { word: "mistake", es: "error" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Renata and Vale shake hands over the exclusivity clause while Camila circles Monterrey on the map.",
      text: "Granted. As long as you meet the milestones, no one else operates Vale Kids in Monterrey.",
      es: "Concedido. Mientras cumplas los hitos, nadie más opera Vale Kids en Monterrey.",
      speaker: "vale",
      cast: ["renata", "vale", "camila"],
      lines: [
        {
          speaker: "renata",
          text: "But I need exclusivity in Monterrey while this agreement stays active.",
          es: "Pero necesito exclusividad en Monterrey mientras este acuerdo esté activo.",
        },
        {
          speaker: "vale",
          text: "Granted. As long as you meet the milestones, no one else operates Vale Kids in Monterrey.",
          es: "Concedido. Mientras cumplas los hitos, nadie más opera Vale Kids en Monterrey.",
        },
        {
          speaker: "camila",
          text: "I will flag it on the dashboard immediately if any other group opens under our name there.",
          es: "Lo marcaré en el panel de inmediato si algún otro grupo abre con nuestro nombre allí.",
        },
      ],
      words: [
        { word: "exclusivity", es: "exclusividad" },
        { word: "operates", es: "opera" },
        { word: "flag", es: "marcar / señalar" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Renata reads the near-final framework aloud while Vale adds one more clause about press leaks.",
      text: "One thing is missing: if there is a press leak before signing, we both cancel the public signing until we clarify it.",
      es: "Falta una cosa: si hay una filtración a la prensa antes de firmar, ambas cancelamos la firma pública hasta aclararla.",
      speaker: "vale",
      cast: ["renata", "vale", "camila"],
      lines: [
        {
          speaker: "renata",
          text: "So we have a framework: twenty groups, mandatory training, exclusivity in Monterrey, review in November.",
          es: "Entonces tenemos un marco: veinte grupos, capacitación obligatoria, exclusividad en Monterrey, revisión en noviembre.",
        },
        {
          speaker: "vale",
          text: "One thing is missing: if there is a press leak before signing, we both cancel the public signing until we clarify it.",
          es: "Falta una cosa: si hay una filtración a la prensa antes de firmar, ambas cancelamos la firma pública hasta aclararla.",
        },
        {
          speaker: "renata",
          text: "That is very specific, Vale. Are you expecting a leak, or just being careful with the annex?",
          es: "Eso es muy específico, Vale. ¿Esperas una filtración, o solo estás siendo cuidadosa con el anexo?",
        },
      ],
      words: [
        { word: "framework", es: "marco / estructura" },
        { word: "leak", es: "filtración" },
        { word: "annex", es: "anexo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale explains negotiation caution to Renata while Camila closes her laptop for tomorrow's signing.",
      text: "No. But a good negotiator always thinks about what could go wrong before it happens.",
      es: "No. Pero una buena negociadora siempre piensa en lo que puede salir mal antes de que pase.",
      speaker: "vale",
      cast: ["vale", "renata", "camila"],
      lines: [
        {
          speaker: "vale",
          text: "No. But a good negotiator always thinks about what could go wrong before it happens.",
          es: "No. Pero una buena negociadora siempre piensa en lo que puede salir mal antes de que pase.",
        },
        {
          speaker: "renata",
          text: "Fair enough. Let my lawyer draw up that clause tonight, along with the compliance annex.",
          es: "Justo. Que mi abogado redacte esa cláusula esta noche, junto con el anexo de cumplimiento.",
        },
        {
          speaker: "camila",
          text: "Then we can seal the deal tomorrow morning, once the clause review is complete.",
          es: "Entonces podemos cerrar el trato mañana por la mañana, una vez que la revisión de cláusulas esté completa.",
        },
      ],
      words: [
        { word: "negotiator", es: "negociador / negociadora" },
        { word: "draw up", es: "redactar un documento formal" },
        { word: "seal the deal", es: "cerrar el trato definitivamente" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Camila shows her phone screen to a shocked Vale and Renata with a breaking news headline about Mexico.",
      text: "They just published online: Vale Academy signs massive expansion in Mexico with Reed investment.",
      es: "Acaban de publicar en línea: Vale Academy firma expansión masiva en México con inversión de Reed.",
      speaker: "camila",
      cast: ["camila", "vale", "renata"],
      lines: [
        {
          speaker: "camila",
          text: "Vale, look at this. They just published online: Vale Academy signs massive expansion in Mexico with Reed investment.",
          es: "Vale, mira esto. Acaban de publicar en línea: Vale Academy firma expansión masiva en México con inversión de Reed.",
        },
        {
          speaker: "vale",
          text: "What? That is not signed. We have not even discussed it with Reed as something closed.",
          es: "¿Qué? Eso no está firmado. Ni siquiera lo hemos discutido con Reed como algo cerrado.",
        },
        {
          speaker: "renata",
          text: "And it says the agreement includes Guatemala. That part is completely false.",
          es: "Y dice que el acuerdo incluye a Guatemala. Esa parte es completamente falsa.",
        },
      ],
      words: [
        { word: "published", es: "publicaron" },
        { word: "expansion", es: "expansión" },
        { word: "false", es: "falso" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale calls Mr. Reed on speaker while Renata listens, and the tomorrow signing is postponed.",
      text: "It is postponed. We sign when the information is clear. Our credibility is worth more than a date.",
      es: "Se pospone. Firmamos cuando la información esté clara. Nuestra credibilidad vale más que una fecha.",
      speaker: "vale",
      cast: ["vale", "renata"],
      lines: [
        {
          speaker: "vale",
          text: "We are not going to hide from this. I will call Reed and explain exactly what is true and what is not.",
          es: "No nos vamos a esconder de esto. Voy a llamar a Reed y explicar exactamente qué es cierto y qué no.",
        },
        {
          speaker: "renata",
          text: "But today's signing, Vale... the whole team is already waiting for the ceremony.",
          es: "Pero la firma de hoy, Vale... todo el equipo ya está esperando la ceremonia.",
        },
        {
          speaker: "vale",
          text: "It is postponed. We sign when the information is clear. Our credibility is worth more than a date.",
          es: "Se pospone. Firmamos cuando la información esté clara. Nuestra credibilidad vale más que una fecha.",
        },
      ],
      words: [
        { word: "hide", es: "esconderse" },
        { word: "postponed", es: "pospuesto" },
        { word: "credibility", es: "credibilidad" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Mr. Reed appears on a video call with a serious expression as Vale answers calmly from Renata's office.",
      text: "If you handle this well tomorrow, my investment goes up thirty percent.",
      es: "Si usted maneja esto bien mañana, mi inversión sube un treinta por ciento.",
      speaker: "reed",
      cast: ["reed", "vale"],
      lines: [
        {
          speaker: "reed",
          text: "Vale, I saw the news. It was not me, and it was not my team. But I do have one question.",
          es: "Vale, vi la noticia. No fui yo, y tampoco fue mi equipo. Pero sí tengo una pregunta.",
        },
        {
          speaker: "vale",
          text: "Ask it, Mr. Reed. Tomorrow morning we will send the press a clear, honest correction.",
          es: "Pregunte, señor Reed. Mañana por la mañana enviaremos a la prensa una corrección clara y honesta.",
        },
        {
          speaker: "reed",
          text: "Good. If you handle this well tomorrow, my investment goes up thirty percent.",
          es: "Bien. Si usted maneja esto bien mañana, mi inversión sube un treinta por ciento.",
        },
      ],
      words: [
        { word: "correction", es: "corrección" },
        { word: "handle", es: "manejar" },
        { word: "investment", es: "inversión" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What is Renata's responsibility in the Mexico deal?",
      questionEs: "¿Cuál es la responsabilidad de Renata en el acuerdo de México?",
      options: [
        { label: "She takes care of schools, classrooms, and parent registration.", emoji: "🏫" },
        { label: "She writes all the teaching materials herself.", emoji: "📚" },
        { label: "She supervises the dashboard and monthly reports.", emoji: "📊" },
      ],
      answer: 0,
      sayIt: "She takes care of schools, classrooms, and parent registration.",
      sayItEs: "Ejemplo: «She takes care of schools, classrooms, and parent registration.»",
      sayItAskEn: "If you split responsibilities with a partner, what would you take care of?",
      sayItAskEs: "Si dividieras responsabilidades con una socia, ¿de qué te encargarías tú?",
      sayItCheck: {
        target: "I would take care of *",
        altTargets: ["My responsibility would be *", "I would handle *"],
      },
    },
    {
      id: "q2",
      afterScene: "s8",
      questionEn: "What is one thing you would add to a business agreement to protect quality?",
      questionEs: "¿Qué añadirías a un acuerdo de negocios para proteger la calidad?",
      options: [
        { label: "Mandatory training and a quality check every two months.", emoji: "✅" },
        { label: "No rules at all, just trust.", emoji: "🤷" },
        { label: "A lower price with no conditions.", emoji: "💸" },
      ],
      answer: 0,
      sayIt: "I would add mandatory training and quality checks every two months.",
      sayItEs: "Ejemplo: «I would add mandatory training and quality checks every two months.»",
      sayItAskEn: "What is one thing you would add to a business agreement to protect quality?",
      sayItAskEs: "¿Qué añadirías a un acuerdo de negocios para proteger la calidad?",
      sayItCheck: {
        target: "I would add *",
        altTargets: ["My condition would be *", "I would require *"],
      },
    },
    {
      id: "q3",
      afterScene: "s11",
      questionEn: "What does Mr. Reed offer if Vale handles the leak well?",
      questionEs: "¿Qué ofrece el señor Reed si Vale maneja bien la filtración?",
      options: [
        { label: "His investment goes up thirty percent.", emoji: "📈" },
        { label: "He cancels his investment completely.", emoji: "🛑" },
        { label: "He asks Vale to include Guatemala.", emoji: "🗺️" },
      ],
      answer: 0,
      sayIt: "If you handle this well tomorrow, my investment goes up thirty percent.",
      sayItEs: "Ejemplo: «If you handle this well tomorrow, my investment goes up thirty percent.»",
      sayItAskEn: "Summarize the deal, the leak, and Reed's condition.",
      sayItAskEs: "Resume el acuerdo, la filtración y la condición de Reed.",
      sayItCheck: {
        target: "The deal is *, the leak was *, and Reed's condition is *",
        altTargets: ["In short, *", "The condition is *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I can stay honest even when the pressure is high.",
    es: "Puedo mantenerme honesta incluso cuando la presión es alta.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "English is easy when I plan for problems before they happen.",
    es: "El inglés es fácil cuando planeo para los problemas antes de que ocurran.",
    model: "vale",
    modelActionEs: "Vale añade una cláusula para filtraciones antes de que ocurra alguna.",
  },
  expressions: [
    {
      phrase: "draw up",
      variants: ["draw up"],
      es: "redactar un documento formal",
      kind: "phrasal",
      example: "Fair enough. Let my lawyer draw up that clause tonight, along with the compliance annex.",
      exampleEs: "Justo. Que mi abogado redacte esa cláusula esta noche, junto con el anexo de cumplimiento.",
    },
    {
      phrase: "seal the deal",
      variants: ["seal the deal"],
      es: "cerrar el trato definitivamente",
      kind: "idiom",
      example: "Then we can seal the deal tomorrow morning, once the clause review is complete.",
      exampleEs: "Entonces podemos cerrar el trato mañana por la mañana, una vez que la revisión de cláusulas esté completa.",
    },
    {
      phrase: "flag",
      variants: ["flag it"],
      es: "marcar / señalar una alerta",
      kind: "phrasal",
      example: "I will flag it on the dashboard immediately if any other group opens under our name there.",
      exampleEs: "Lo marcaré en el panel de inmediato si algún otro grupo abre con nuestro nombre allí.",
    },
  ],
  finaleSeconds: 30,
  continuePrompt: {
    en: "Your turn, 30 seconds: describe an agreement with one milestone, one boundary, and one risk you would plan for.",
    es: "Tu turno, 30 segundos: describe un acuerdo con un hito, un límite y un riesgo para el que te prepararías.",
  },
  continueWith: [
    "The milestone is ...",
    "The territory only includes ...",
    "If a leak happens, we ...",
  ],
  cliffhanger: {
    en: "If you handle this well tomorrow, my investment goes up thirty percent.",
    es: "Si usted maneja esto bien mañana, mi inversión sube un treinta por ciento.",
  },
};
