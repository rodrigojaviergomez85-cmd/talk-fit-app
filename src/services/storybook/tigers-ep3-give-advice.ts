import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep3-give-advice/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep3-give-advice/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep3-give-advice/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep3-give-advice/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep3-give-advice/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep3-give-advice/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep3-give-advice/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep3-give-advice/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep3-give-advice/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep3-give-advice/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep3-give-advice/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep3-give-advice/s11.jpg";

/**
 * Season 7 (Tigers) Episode 3 — "Give advice & defend it".
 * Matches Tigers Day 3 (should / would / if I were you: give advice and
 * defend it against an objection).
 */
export const TIGERS_EP3_GIVE_ADVICE: StorybookEpisode = {
  id: "tigers-ep3-give-advice",
  moduleId: "tigers",
  week: 1,
  title: "Give advice & defend it",
  titleEs: "Da un consejo y defiéndelo",
  episodeLabel: { en: "Season 7 · Episode 3", es: "Temporada 7 · Episodio 3" },
  previously: [
    { en: "Bryan, BigTalk's manager, visited the school with a smile and a threat.", es: "Bryan, el gerente de BigTalk, visitó la escuela con una sonrisa y una amenaza." },
    { en: "The team listed what could happen if they lose Northline.", es: "El equipo hizo una lista de lo que podría pasar si pierden a Northline." },
    { en: "Morgan asked for a results report.", es: "Morgan pidió un reporte de resultados." },
  ],
  reviewWords: [
    { word: "possibility", es: "posibilidad" },
    { word: "report", es: "reporte" },
    { word: "offer", es: "oferta" },
  ],
  blurb: {
    en: "Don Tito brings lunch and one piece of advice. Camila disagrees — and the debate teaches everyone how to defend an idea.",
    es: "Don Tito trae almuerzo y un consejo. Camila no está de acuerdo — y el debate les enseña a todos cómo defender una idea.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Don Tito llega con su motocicleta de reparto y una bolsa grande de comida.",
      text: "Friday, twelve thirty. Don Tito parked his old motorcycle and walked in with lunch and a serious face.",
      es: "Viernes, doce y media. Don Tito estacionó su motocicleta vieja y entró con almuerzo y cara seria.",
      speaker: "narrator",
      lines: [
        { speaker: "tito", text: "I brought chicken and rice. And I heard about the giant across the street.", es: "«Traje pollo con arroz. Y me enteré del gigante de enfrente»." },
        { speaker: "vale", text: "News travels fast in this neighborhood.", es: "«Las noticias viajan rápido en este barrio»." },
        { speaker: "tito", text: "Sit. Eat. An old man can give advice while you chew.", es: "«Siéntate. Come. Un viejo puede dar consejos mientras masticas»." },
      ],
      words: [
        { word: "heard", es: "me enteré / escuché" },
        { word: "giant", es: "gigante" },
        { word: "chew", es: "masticar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Don Tito señala el letrero de BigTalk por la ventana mientras habla con seriedad.",
      text: "If I were you, I would lower the prices before BigTalk does it.",
      es: "«Si yo fuera tú, bajaría los precios antes de que BigTalk lo haga».",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "Listen. If I were you, I would lower the prices.", es: "«Escucha. Si yo fuera tú, bajaría los precios»." },
        { speaker: "tito", text: "Do it before BigTalk does it. Cheap is hard to fight.", es: "«Hazlo antes de que BigTalk lo haga. Lo barato es difícil de combatir»." },
        { speaker: "vale", text: "That's an interesting idea, Don Tito.", es: "«Es una idea interesante, Don Tito»." },
        { speaker: "camila", text: "Interesting? Vale, it's a terrible idea!", es: "«¿Interesante? ¡Vale, es una idea terrible!»" },
      ],
      words: [
        { word: "lower", es: "bajar" },
        { word: "fight", es: "combatir / pelear" },
        { word: "terrible", es: "terrible" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Camila se pone de pie y defiende su postura con las manos sobre la mesa.",
      text: "If we lower the price, people will think the classes are worth less.",
      es: "«Si bajamos el precio, la gente pensará que las clases valen menos».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Don Tito, I respect you, but I don't agree.", es: "«Don Tito, lo respeto, pero no estoy de acuerdo»." },
        { speaker: "camila", text: "If we lower the price, people will think the classes are worth less.", es: "«Si bajamos el precio, la gente pensará que las clases valen menos»." },
        { speaker: "camila", text: "We should keep the price and show more value instead.", es: "«Deberíamos mantener el precio y mostrar más valor en vez de eso»." },
        { speaker: "tito", text: "Hmm. The girl has teeth. Defend that, Camila.", es: "«Mmm. La muchacha tiene dientes. Defiende eso, Camila»." },
      ],
      words: [
        { word: "worth", es: "valer (valor)" },
        { word: "instead", es: "en vez de eso" },
        { word: "defend", es: "defender" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Camila dibuja en una servilleta: un vaso con precio bajo y poca agua, otro lleno.",
      text: "In a market, the cheapest tomatoes sell first, but nobody trusts a cheap doctor.",
      es: "«En el mercado, los tomates más baratos se venden primero, pero nadie confía en un doctor barato».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Look. The cheapest tomatoes sell first, yes.", es: "«Mira. Los tomates más baratos se venden primero, sí»." },
        { speaker: "camila", text: "But nobody trusts a cheap doctor. Education is like a doctor.", es: "«Pero nadie confía en un doctor barato. La educación es como un doctor»." },
        { speaker: "camila", text: "If I were BigTalk, I would want us cheap. That's their game.", es: "«Si yo fuera BigTalk, querría vernos baratos. Ese es su juego»." },
        { speaker: "vale", text: "Strong argument, Camila.", es: "«Buen argumento, Camila»." },
      ],
      words: [
        { word: "cheapest", es: "más baratos" },
        { word: "trust", es: "confiar" },
        { word: "argument", es: "argumento" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Don Tito responde con una objeción, señalando su restaurante en la memoria.",
      text: "But when I opened my restaurant, low prices filled my tables in one month.",
      es: "«Pero cuando abrí mi restaurante, los precios bajos llenaron mis mesas en un mes».",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "When I opened my restaurant, low prices filled my tables in one month.", es: "«Cuando abrí mi restaurante, los precios bajos llenaron mis mesas en un mes»." },
        { speaker: "tito", text: "Empty chairs don't pay rent, young lady.", es: "«Las sillas vacías no pagan el alquiler, jovencita»." },
        { speaker: "camila", text: "True. But you raised the prices later, when people loved your food, right?", es: "«Cierto. Pero subiste los precios después, cuando la gente amó tu comida, ¿verdad?»" },
        { speaker: "tito", text: "…I did.", es: "«…Lo hice»." },
      ],
      words: [
        { word: "filled", es: "llenaron" },
        { word: "rent", es: "alquiler" },
        { word: "raised", es: "subiste" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale levanta la mano para proponer una solución intermedia.",
      text: "Okay, here's my decision. We keep our price — and we add one free workshop every month.",
      es: "«Bueno, esta es mi decisión. Mantenemos el precio — y agregamos un taller gratis cada mes».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Okay. You should both listen to each other, because you're both right.", es: "«Bueno. Los dos deberían escucharse, porque los dos tienen razón»." },
        { speaker: "vale", text: "We keep our price — and we add one free workshop every month.", es: "«Mantenemos el precio — y agregamos un taller gratis cada mes»." },
        { speaker: "vale", text: "People try the class, they see the value, and the price stays strong.", es: "«La gente prueba la clase, ve el valor, y el precio se mantiene fuerte»." },
        { speaker: "dani", text: "That's… actually smart.", es: "«Eso es… realmente inteligente»." },
      ],
      words: [
        { word: "workshop", es: "taller" },
        { word: "value", es: "valor" },
        { word: "smart", es: "inteligente" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Don Tito sonríe y levanta su vaso como brindis.",
      text: "You know what, kid? You should write that down. Free workshop, strong price.",
      es: "«¿Sabes qué, muchacha? Deberías escribir eso. Taller gratis, precio fuerte».",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "You should write that down. Free workshop, strong price.", es: "«Deberías escribir eso. Taller gratis, precio fuerte»." },
        { speaker: "tito", text: "If I were BigTalk, I would be worried right now.", es: "«Si yo fuera BigTalk, estaría preocupado ahora mismo»." },
        { speaker: "camila", text: "See? We fight better with ideas than with discounts.", es: "«¿Ves? Peleamos mejor con ideas que con descuentos»." },
      ],
      words: [
        { word: "worried", es: "preocupado" },
        { word: "discounts", es: "descuentos" },
        { word: "better", es: "mejor" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Dani diseña el volante del taller gratis en la laptop.",
      text: "Dani designed the flyer in twenty minutes: Free Speaking Workshop — first Saturday of every month.",
      es: "Dani diseñó el volante en veinte minutos: Taller de conversación gratis — primer sábado de cada mes.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Done! Free Speaking Workshop, first Saturday of every month.", es: "«¡Listo! Taller de conversación gratis, primer sábado de cada mes»." },
        { speaker: "vale", text: "Beautiful. Camila, you should lead it. You defended the value — now show it.", es: "«Hermoso. Camila, tú deberías dirigirlo. Defendiste el valor; ahora muéstralo»." },
        { speaker: "camila", text: "Me? …Okay. Yes. I'll lead it.", es: "«¿Yo? …Bueno. Sí. Yo lo dirijo»." },
      ],
      words: [
        { word: "lead", es: "dirigir" },
        { word: "defended", es: "defendiste" },
        { word: "show", es: "mostrar" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Don Tito se despide en la puerta con una sonrisa cómplice.",
      text: "One more thing, kids. Never take advice without asking: what does this person know?",
      es: "«Una cosa más, muchachos. Nunca tomen un consejo sin preguntar: ¿qué sabe esta persona?»",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "One more thing. Never take advice without asking questions.", es: "«Una cosa más. Nunca tomen un consejo sin hacer preguntas»." },
        { speaker: "tito", text: "Ask: what does this person know? What did they live?", es: "«Pregunten: ¿qué sabe esta persona? ¿Qué vivió?»" },
        { speaker: "vale", text: "Even from you, Don Tito?", es: "«¿Incluso de usted, Don Tito?»" },
        { speaker: "tito", text: "Especially from me. I'm old, not magic.", es: "«Especialmente de mí. Soy viejo, no mágico»." },
      ],
      words: [
        { word: "advice", es: "consejo" },
        { word: "questions", es: "preguntas" },
        { word: "especially", es: "especialmente" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "El equipo ríe junto mientras recogen los platos del almuerzo.",
      text: "They laughed, they cleaned the table, and the free workshop was officially born.",
      es: "Rieron, limpiaron la mesa, y el taller gratis nació oficialmente.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Today we learned something big.", es: "«Hoy aprendimos algo grande»." },
        { speaker: "vale", text: "A good team doesn't avoid arguments. It uses them.", es: "«Un buen equipo no evita los argumentos. Los usa»." },
        { speaker: "dani", text: "And lunch helps. Lunch always helps.", es: "«Y el almuerzo ayuda. El almuerzo siempre ayuda»." },
      ],
      words: [
        { word: "avoid", es: "evitar" },
        { word: "arguments", es: "argumentos / debates" },
        { word: "helps", es: "ayuda" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Camila practica dar su consejo en voz alta frente a Vale.",
      text: "Camila repeats her advice one more time, clear and strong.",
      es: "Camila repite su consejo una vez más, claro y fuerte.",
      speaker: "camila",
      lines: [
        { speaker: "vale", text: "One more time, Camila. Give me your advice like a boss.", es: "«Una vez más, Camila. Dame tu consejo como una jefa»." },
        { speaker: "camila", text: "You should keep the price and show more value.", es: "«Deberías mantener el precio y mostrar más valor»." },
        { speaker: "camila", text: "If I were you, I would never compete with discounts.", es: "«Si yo fuera tú, nunca competiría con descuentos»." },
        { speaker: "camila", text: "And if someone objects, I answer with a reason, not with fear.", es: "«Y si alguien objeta, respondo con una razón, no con miedo»." },
      ],
      words: [
        { word: "compete", es: "competir" },
        { word: "objects", es: "objeta" },
        { word: "reason", es: "razón" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s2",
      questionEn: "What was Don Tito's advice?",
      questionEs: "¿Cuál fue el consejo de Don Tito?",
      options: [
        { label: "Lower the prices before BigTalk does", emoji: "🏷️" },
        { label: "Close the school for a month", emoji: "🔒" },
        { label: "Sell the school to BigTalk", emoji: "🤝" },
      ],
      answer: 0,
      sayIt: "If I were you, I would lower the prices.",
      sayItEs: "Ejemplo: «If I were you, I would lower the prices.»",
      sayItAskEn: "Give me advice about something in my life. Use 'You should…' or 'If I were you…'.",
      sayItAskEs: "Dame un consejo sobre algo en mi vida. Usa «You should…» o «If I were you…».",
      sayItCheck: {
        target: "You should *",
        altTargets: ["If I were you, I would *", "You shouldn't *", "I think you should *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "How did Camila defend her opinion against Don Tito's objection?",
      questionEs: "¿Cómo defendió Camila su opinión contra la objeción de Don Tito?",
      options: [
        { label: "She answered with a reason and a question", emoji: "💬" },
        { label: "She cried and left the room", emoji: "😢" },
        { label: "She agreed with everything", emoji: "🙇" },
      ],
      answer: 0,
      sayIt: "True, but you raised the prices later, right?",
      sayItEs: "Ejemplo: «True, but you raised the prices later, right?»",
      sayItAskEn: "Defend your advice. I say: 'But that costs money!' What do you answer?",
      sayItAskEs: "Defiende tu consejo. Yo digo: «¡Pero eso cuesta dinero!» ¿Qué respondes?",
      sayItCheck: {
        target: "True, but *",
        altTargets: ["That's true, but *", "I understand, but *", "Yes, but *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What was the final decision about the price?",
      questionEs: "¿Cuál fue la decisión final sobre el precio?",
      options: [
        { label: "Keep the price and add a free monthly workshop", emoji: "🎁" },
        { label: "Lower all the prices by half", emoji: "✂️" },
        { label: "Close on Saturdays", emoji: "📅" },
      ],
      answer: 0,
      sayIt: "We should keep the price and add one free workshop every month.",
      sayItEs: "Ejemplo: «We should keep the price and add one free workshop every month.»",
      sayItAskEn: "What should we do about a problem you know? Give your final advice.",
      sayItAskEs: "¿Qué deberíamos hacer con un problema que conoces? Da tu consejo final.",
      sayItCheck: {
        target: "We should *",
        altTargets: ["I would *", "The best idea is to *", "We shouldn't *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I can do it. My ideas deserve a voice.",
    es: "Yo puedo hacerlo. Mis ideas merecen una voz.",
  },
  habitCard: {
    afterScene: "s3",
    phrase: "When I disagree, I say it with respect and a reason. I don't stay quiet.",
    es: "Cuando no estoy de acuerdo, lo digo con respeto y con una razón. No me quedo callada.",
    model: "camila",
    modelActionEs: "Camila defiende su idea frente a Don Tito con respeto y argumentos.",
  },
  continuePrompt: {
    en: "Give advice about a real problem: a friend, work, or money. What should they do? Why? Defend it against one objection.",
    es: "Da un consejo sobre un problema real: un amigo, el trabajo o el dinero. ¿Qué deberían hacer? ¿Por qué? Defiéndelo contra una objeción.",
  },
  continueWith: ["You should ...", "If I were you, I would ...", "That's true, but ..."],
  cliffhanger: {
    en: "Episode 4: The school does an internal audit — and the list of problems is longer than expected.",
    es: "Episodio 4: La escuela hace una auditoría interna — y la lista de problemas es más larga de lo esperado.",
  },
};
