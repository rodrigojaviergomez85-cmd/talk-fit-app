import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep2-what-could-happen/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep2-what-could-happen/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep2-what-could-happen/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep2-what-could-happen/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep2-what-could-happen/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep2-what-could-happen/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep2-what-could-happen/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep2-what-could-happen/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep2-what-could-happen/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep2-what-could-happen/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep2-what-could-happen/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep2-what-could-happen/s11.jpg";

/**
 * Season 7 (Tigers) Episode 2 — "What could happen?"
 * Matches Tigers Day 2 (could / might / would: explore possibilities).
 */
export const TIGERS_EP2_WHAT_COULD_HAPPEN: StorybookEpisode = {
  id: "tigers-ep2-what-could-happen",
  moduleId: "tigers",
  week: 1,
  title: "What could happen?",
  titleEs: "¿Qué podría pasar?",
  episodeLabel: { en: "Season 7 · Episode 2", es: "Temporada 7 · Episodio 2" },
  previously: [
    { en: "BigTalk Academy opened across the street and copied everything.", es: "BigTalk Academy abrió enfrente y copió todo." },
    { en: "Vale told the story of her hardest decision.", es: "Vale contó la historia de su decisión más difícil." },
    { en: "The team decided to fight with results, not panic.", es: "El equipo decidió pelear con resultados, no con pánico." },
  ],
  reviewWords: [
    { word: "decision", es: "decisión" },
    { word: "competitor", es: "competidor" },
    { word: "results", es: "resultados" },
  ],
  blurb: {
    en: "The team sits down to answer one scary question: what could happen if we lose Northline?",
    es: "El equipo se sienta a responder una pregunta que da miedo: ¿qué podría pasar si perdemos a Northline?",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "La campana de la puerta suena y entra Bryan, gerente de BigTalk, con una carpeta azul.",
      text: "On Wednesday, the doorbell rang, and a tall man in a grey suit walked in with a blue folder.",
      es: "El miércoles sonó la campana de la puerta y entró un hombre alto de traje gris con una carpeta azul.",
      speaker: "narrator",
      lines: [
        { speaker: "bryan", text: "Good morning. I'm Bryan, the manager of BigTalk Academy.", es: "«Buenos días. Soy Bryan, gerente de BigTalk Academy»." },
        { speaker: "vale", text: "Welcome to my school. How can I help you?", es: "«Bienvenido a mi escuela. ¿En qué puedo ayudarte?»" },
        { speaker: "bryan", text: "I came to meet the famous Vale. Your little school is… cute.", es: "«Vine a conocer a la famosa Vale. Tu escuelita es… bonita»." },
      ],
      words: [
        { word: "doorbell", es: "campana de la puerta" },
        { word: "manager", es: "gerente" },
        { word: "famous", es: "famosa" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Bryan recorre el salón con una sonrisa forzada mientras Vale lo observa seria.",
      text: "We could buy this building, you know. Or we could simply take your clients.",
      es: "«Podríamos comprar este edificio, ¿sabes? O simplemente podríamos quedarnos con tus clientes».",
      speaker: "bryan",
      lines: [
        { speaker: "bryan", text: "Nice place. We could buy this building, you know.", es: "«Buen lugar. Podríamos comprar este edificio, ¿sabes?»" },
        { speaker: "bryan", text: "Or we could simply take your clients. Northline, for example.", es: "«O simplemente podríamos quedarnos con tus clientes. Northline, por ejemplo»." },
        { speaker: "vale", text: "Northline signed with us because they saw results.", es: "«Northline firmó con nosotros porque vio resultados»." },
        { speaker: "bryan", text: "Results change. We'll see. Have a nice day.", es: "«Los resultados cambian. Ya veremos. Que tengas un buen día»." },
      ],
      words: [
        { word: "building", es: "edificio" },
        { word: "simply", es: "simplemente" },
        { word: "signed", es: "firmó" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Dani cierra la puerta con fuerza después de que Bryan se va.",
      text: "That guy! Did you hear him? We could lose everything!",
      es: "«¡Ese tipo! ¿Lo escucharon? ¡Podríamos perder todo!»",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "That guy! Did you hear him?", es: "«¡Ese tipo! ¿Lo escucharon?»" },
        { speaker: "dani", text: "We could lose Northline. We could lose everything!", es: "«Podríamos perder a Northline. ¡Podríamos perder todo!»" },
        { speaker: "vale", text: "Maybe. Or maybe not. Sit down, Dani.", es: "«Tal vez. O tal vez no. Siéntate, Dani»." },
        { speaker: "vale", text: "Let's do this right. What could really happen? Let's list it.", es: "«Hagamos esto bien. ¿Qué podría pasar de verdad? Hagamos una lista»." },
      ],
      words: [
        { word: "lose", es: "perder" },
        { word: "maybe", es: "tal vez" },
        { word: "list", es: "lista" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale escribe en la pizarra tres columnas: podría, quizás, haría.",
      text: "Vale drew three columns on the board: could, might, would.",
      es: "Vale dibujó tres columnas en la pizarra: could, might, would.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Rule one: we say the scary things out loud. Fear hates daylight.", es: "«Regla uno: decimos las cosas que dan miedo en voz alta. El miedo odia la luz»." },
        { speaker: "camila", text: "Okay. Northline might cancel the contract when it ends.", es: "«Bueno. Northline podría cancelar el contrato cuando termine»." },
        { speaker: "vale", text: "True. That's possibility number one. What else?", es: "«Cierto. Esa es la posibilidad número uno. ¿Qué más?»" },
      ],
      words: [
        { word: "scary", es: "que da miedo" },
        { word: "out loud", es: "en voz alta" },
        { word: "cancel", es: "cancelar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani levanta la mano y propone una segunda posibilidad.",
      text: "Some students might leave for BigTalk, because it's new and shiny.",
      es: "«Algunos estudiantes podrían irse a BigTalk porque es nuevo y brillante».",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Some students might leave for BigTalk.", es: "«Algunos estudiantes podrían irse a BigTalk»." },
        { speaker: "dani", text: "It's new, it's shiny, and they might offer lower prices.", es: "«Es nuevo, es brillante, y podrían ofrecer precios más bajos»." },
        { speaker: "camila", text: "That's possible. Possibility number two.", es: "«Es posible. Posibilidad número dos»." },
      ],
      words: [
        { word: "leave", es: "irse" },
        { word: "shiny", es: "brillante" },
        { speaker: undefined, word: "lower", es: "más bajos" } as never,
      ].map(({ word, es }) => ({ word, es })),
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Camila propone la tercera posibilidad con el dedo levantado.",
      text: "Or… BigTalk might fail. Big schools forget the human part.",
      es: "«O… BigTalk podría fracasar. Las escuelas grandes olvidan la parte humana».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Here's possibility three: BigTalk might fail.", es: "«Aquí está la posibilidad tres: BigTalk podría fracasar»." },
        { speaker: "camila", text: "Big schools copy methods, but they forget the human part.", es: "«Las escuelas grandes copian métodos, pero olvidan la parte humana»." },
        { speaker: "vale", text: "Good. Three possibilities. Now, which one is the most likely?", es: "«Bien. Tres posibilidades. Ahora, ¿cuál es la más probable?»" },
      ],
      words: [
        { word: "fail", es: "fracasar" },
        { word: "methods", es: "métodos" },
        { word: "likely", es: "probable" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "El grupo debate alrededor de la pizarra con las tres columnas.",
      text: "In my opinion, some students might try BigTalk — and some might come back.",
      es: "«En mi opinión, algunos estudiantes podrían probar BigTalk… y algunos podrían regresar».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "In my opinion, some students might try BigTalk.", es: "«En mi opinión, algunos estudiantes podrían probar BigTalk»." },
        { speaker: "vale", text: "And a few might come back when they miss real practice.", es: "«Y algunos podrían regresar cuando extrañen la práctica real»." },
        { speaker: "dani", text: "And Northline? What would you do if they called Bryan?", es: "«¿Y Northline? ¿Qué harías si le llamaran a Bryan?»" },
        { speaker: "vale", text: "I would show them our students' numbers. Numbers don't get nervous.", es: "«Les mostraría los números de nuestros estudiantes. Los números no se ponen nerviosos»." },
      ],
      words: [
        { word: "try", es: "probar" },
        { word: "miss", es: "extrañar" },
        { word: "nervous", es: "nerviosos" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale escribe un plan de acción debajo de cada posibilidad.",
      text: "Under every 'might', Vale wrote one action. Fear became a plan.",
      es: "Debajo de cada «might», Vale escribió una acción. El miedo se convirtió en plan.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "If Northline might cancel, we prepare a results report now.", es: "«Si Northline podría cancelar, preparamos un reporte de resultados ahora»." },
        { speaker: "vale", text: "If students might leave, we call them before BigTalk does.", es: "«Si los estudiantes podrían irse, los llamamos antes de que BigTalk lo haga»." },
        { speaker: "camila", text: "And if BigTalk fails… we keep doing what we do.", es: "«Y si BigTalk fracasa… seguimos haciendo lo que hacemos»." },
      ],
      words: [
        { word: "report", es: "reporte" },
        { word: "prepare", es: "preparar" },
        { word: "keep", es: "seguir / mantener" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Morgan llama por videollamada y el equipo se reúne alrededor de la laptop.",
      text: "That night, Morgan called. Bryan had already called her.",
      es: "Esa noche Morgan llamó. Bryan ya le había llamado a ella.",
      speaker: "narrator",
      lines: [
        { speaker: "morgan", text: "Vale, I want to be honest. BigTalk called me today with an offer.", es: "«Vale, quiero ser honesta. BigTalk me llamó hoy con una oferta»." },
        { speaker: "vale", text: "Thank you for telling me, Morgan. What did they offer?", es: "«Gracias por decirme, Morgan. ¿Qué te ofrecieron?»" },
        { speaker: "morgan", text: "Half your price. But my team loves your classes. Send me your results report.", es: "«La mitad de tu precio. Pero a mi equipo le encantan tus clases. Envíame tu reporte de resultados»." },
      ],
      words: [
        { word: "honest", es: "honesta" },
        { word: "offer", es: "oferta" },
        { word: "half", es: "la mitad" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "El equipo respira aliviado después de la llamada con Morgan.",
      text: "She didn't say no. She asked for our numbers. That's a door, not a wall.",
      es: "«No dijo que no. Nos pidió nuestros números. Eso es una puerta, no una pared».",
      speaker: "vale",
      lines: [
        { speaker: "dani", text: "She talked to Bryan. That's bad, right?", es: "«Habló con Bryan. Eso es malo, ¿verdad?»" },
        { speaker: "vale", text: "She didn't say no. She asked for our numbers.", es: "«No dijo que no. Nos pidió nuestros números»." },
        { speaker: "vale", text: "That's a door, Dani, not a wall. Tomorrow we build that report.", es: "«Eso es una puerta, Dani, no una pared. Mañana construimos ese reporte»." },
      ],
      words: [
        { word: "asked", es: "pidió" },
        { word: "door", es: "puerta" },
        { word: "wall", es: "pared" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale repasa la lista de posibilidades frente a la pizarra, hablando en could, might y would.",
      text: "Vale reviews every possibility one more time, out loud.",
      es: "Vale repasa cada posibilidad una vez más, en voz alta.",
      speaker: "vale",
      lines: [
        { speaker: "camila", text: "One more time, boss. What could happen?", es: "«Una vez más, jefa. ¿Qué podría pasar?»" },
        { speaker: "vale", text: "Northline could cancel, but I would show them our results.", es: "«Northline podría cancelar, pero yo les mostraría nuestros resultados»." },
        { speaker: "vale", text: "Some students might try BigTalk, and some might come back.", es: "«Algunos estudiantes podrían probar BigTalk, y algunos podrían regresar»." },
        { speaker: "vale", text: "And BigTalk might discover that teaching humans is harder than copying flyers.", es: "«Y BigTalk podría descubrir que enseñar a humanos es más difícil que copiar folletos»." },
      ],
      words: [
        { word: "cancel", es: "cancelar" },
        { word: "discover", es: "descubrir" },
        { word: "harder", es: "más difícil" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What was possibility number one on the board?",
      questionEs: "¿Cuál fue la posibilidad número uno en la pizarra?",
      options: [
        { label: "Northline might cancel the contract", emoji: "📋" },
        { label: "The building might burn", emoji: "🔥" },
        { label: "Vale might close the school", emoji: "🔒" },
      ],
      answer: 0,
      sayIt: "Northline might cancel the contract.",
      sayItEs: "Ejemplo: «Northline might cancel the contract.»",
      sayItAskEn: "What could happen in your life next month? Tell me one possibility.",
      sayItAskEs: "¿Qué podría pasar en tu vida el próximo mes? Dime una posibilidad.",
      sayItCheck: {
        target: "I could *",
        altTargets: ["I might *", "It could *", "My * might *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "Why might BigTalk fail, according to Camila?",
      questionEs: "¿Por qué podría fracasar BigTalk, según Camila?",
      options: [
        { label: "Big schools forget the human part", emoji: "❤️" },
        { label: "They don't have money", emoji: "💸" },
        { label: "Their teachers are robots", emoji: "🤖" },
      ],
      answer: 0,
      sayIt: "BigTalk might fail because big schools forget the human part.",
      sayItEs: "Ejemplo: «BigTalk might fail because big schools forget the human part.»",
      sayItAskEn: "What is the most likely possibility for you, and why?",
      sayItAskEs: "¿Cuál es la posibilidad más probable para ti y por qué?",
      sayItCheck: {
        target: "I think * might * because *",
        altTargets: ["The most likely is * because *", "* could * because *"],
      },
    },
    {
      id: "q3",
      afterScene: "s9",
      questionEn: "What would Vale do if Northline talked to Bryan?",
      questionEs: "¿Qué haría Vale si Northline hablara con Bryan?",
      options: [
        { label: "She would show them the results report", emoji: "📊" },
        { label: "She would close the school", emoji: "🚪" },
        { label: "She would cry and give up", emoji: "😭" },
      ],
      answer: 0,
      sayIt: "I would show them our students' numbers.",
      sayItEs: "Ejemplo: «I would show them our students' numbers.»",
      sayItAskEn: "If that possibility happened, what would you do?",
      sayItAskEs: "Si esa posibilidad pasara, ¿qué harías tú?",
      sayItCheck: {
        target: "I would *",
        altTargets: ["I'd *", "If that happened, I would *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "English is easy. One possibility at a time.",
    es: "El inglés es fácil. Una posibilidad a la vez.",
  },
  habitCard: {
    afterScene: "s5",
    phrase: "I say my fears out loud and give each one an action. Fear hates daylight.",
    es: "Digo mis miedos en voz alta y le doy una acción a cada uno. El miedo odia la luz.",
    model: "vale",
    modelActionEs: "Vale convierte cada «podría pasar» en un plan concreto en la pizarra.",
  },
  continuePrompt: {
    en: "Think about next month. What could happen? What might happen? And if it happens, what would you do?",
    es: "Piensa en el próximo mes. ¿Qué podría pasar? ¿Qué quizás pasaría? Y si pasa, ¿qué harías?",
  },
  continueWith: ["I could ...", "It might ...", "If that happened, I would ..."],
  cliffhanger: {
    en: "Episode 3: Don Tito has advice for Vale — and Camila doesn't agree at all.",
    es: "Episodio 3: Don Tito tiene un consejo para Vale — y Camila no está de acuerdo para nada.",
  },
};
