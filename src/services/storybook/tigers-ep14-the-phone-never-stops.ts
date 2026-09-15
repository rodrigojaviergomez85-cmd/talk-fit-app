import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep14-the-phone-never-stops/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep14-the-phone-never-stops/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep14-the-phone-never-stops/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep14-the-phone-never-stops/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep14-the-phone-never-stops/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep14-the-phone-never-stops/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep14-the-phone-never-stops/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep14-the-phone-never-stops/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep14-the-phone-never-stops/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep14-the-phone-never-stops/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep14-the-phone-never-stops/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep14-the-phone-never-stops/s11.jpg";

/**
 * Season 7 (Tigers) Episode 14 — "The phone never stops".
 * Matches Tigers Day 14 (present perfect for recent results + present
 * progressive for what's happening: evaluation/change language).
 */
export const TIGERS_EP14_THE_PHONE_NEVER_STOPS: StorybookEpisode = {
  id: "tigers-ep14-the-phone-never-stops",
  moduleId: "tigers",
  week: 3,
  title: "The phone never stops",
  titleEs: "El teléfono no para",
  episodeLabel: { en: "Season 7 · Episode 14", es: "Temporada 7 · Episodio 14" },
  previously: [
    { en: "A newspaper writer visited and loved the school.", es: "Un escritor de periódico visitó la escuela y le encantó." },
    { en: "Northline's board couldn't decide; they need one more week.", es: "La junta de Northline no pudo decidir; necesitan una semana más." },
    { en: "The guide will name Vale's school the best small school in the city.", es: "La guía nombrará la escuela de Vale como la mejor escuela pequeña de la ciudad." },
  ],
  reviewWords: [
    { word: "warmest", es: "la más cálida" },
    { word: "newspaper", es: "periódico" },
    { word: "fifty-fifty", es: "cincuenta-cincuenta" },
  ],
  blurb: {
    en: "The newspaper comes out. By nine in the morning, the school's phone is ringing nonstop — and the team is not ready for so much attention.",
    es: "Sale el periódico. A las nueve de la mañana, el teléfono de la escuela no para de sonar — y el equipo no está listo para tanta atención.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Don Tito compra todos los periódicos del puesto y corre a la escuela.",
      text: "Don Tito bought every newspaper at the stand and ran to the school.",
      es: "Don Tito compró todos los periódicos del puesto y corrió a la escuela.",
      speaker: "narrator",
      lines: [
        { speaker: "tito", text: "It's here! Page eight! 'The best small school in the city'!", es: "«¡Salió! ¡Página ocho! «La mejor escuela pequeña de la ciudad»!»" },
        { speaker: "vale", text: "Let me see… Don Tito, why did you buy twenty newspapers?", es: "«Déjame ver… Don Tito, ¿por qué compró veinte periódicos?»" },
        { speaker: "tito", text: "For the family, mija. I have a big family.", es: "«Para la familia, mija. Tengo una familia grande»." },
      ],
      words: [
        { word: "stand", es: "puesto" },
        { word: "page", es: "página" },
        { word: "family", es: "familia" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Todos leen el artículo: foto de la escuela y el titular.",
      text: "The article said: small building, enormous heart, the best results of the year.",
      es: "El artículo decía: edificio pequeño, corazón enorme, los mejores resultados del año.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "'Small building, enormous heart.' I'm going to cry.", es: "«'Edificio pequeño, corazón enorme.' Voy a llorar»." },
        { speaker: "dani", text: "'And the friendliest front desk in the city.' THAT'S ME! That's me! It says it!", es: "«'Y la recepción más amable de la ciudad'. ¡ESO SOY YO! ¡Soy yo! ¡Lo dice!»" },
        { speaker: "vale", text: "It says 'the front desk', Dani, not your name—", es: "«Dice 'la recepción', Dani, no tu nombre—»" },
        { speaker: "dani", text: "IT SAYS IT.", es: "«LO DICE»." },
      ],
      words: [
        { word: "heart", es: "corazón" },
        { word: "friendliest", es: "la más amable" },
        { word: "cry", es: "llorar" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "El teléfono empieza a sonar; Dani contesta la primera llamada.",
      text: "At eight forty-five, the phone started. It has been ringing all morning.",
      es: "A las ocho cuarenta y cinco, empezó el teléfono. Ha estado sonando toda la mañana.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Good morning, English school! …Yes, the one from the newspaper! …Yes, we have space! …Well, we had space…", es: "«¡Buenos días, escuela de inglés! …¡Sí, la del periódico! …¡Sí, tenemos espacio! …Bueno, teníamos espacio…»" },
        { speaker: "vale", text: "How many calls so far?", es: "«¿Cuántas llamadas hasta ahora?»" },
        { speaker: "dani", text: "I've lost count. I've written eleven names. Eleven!", es: "«Perdí la cuenta. He anotado once nombres. ¡Once!»" },
      ],
      words: [
        { word: "ringing", es: "sonando" },
        { word: "space", es: "espacio / cupo" },
        { word: "count", es: "cuenta" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Gente hace fila afuera de la escuela; Sofía mira por la ventana sorprendida.",
      text: "By ten, people were making a line outside the school.",
      es: "A las diez, la gente estaba haciendo fila afuera de la escuela.",
      speaker: "narrator",
      lines: [
        { speaker: "sofia", text: "Vale… there is a line. A real line. Outside.", es: "«Vale… hay una fila. Una fila de verdad. Afuera»." },
        { speaker: "vale", text: "How many people are waiting?", es: "«¿Cuántas personas están esperando?»" },
        { speaker: "sofia", text: "Fifteen. And three more are arriving right now.", es: "«Quince. Y tres más están llegando ahora mismo»." },
      ],
      words: [
        { word: "line", es: "fila" },
        { word: "waiting", es: "esperando" },
        { word: "arriving", es: "llegando" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Vale organiza: lista de espera, nuevo horario, y cursos por nivel.",
      text: "We have become the most popular school in the neighborhood. Now we organize the success.",
      es: "«Nos hemos convertido en la escuela más popular del barrio. Ahora organizamos el éxito».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Okay, team. We have become the most popular school in the neighborhood. That is a problem we can solve.", es: "«Bueno, equipo. Nos hemos convertido en la escuela más popular del barrio. Ese es un problema que podemos resolver»." },
        { speaker: "vale", text: "Dani: waiting list. Camila: levels. Sofía: a new Saturday group.", es: "«Dani: lista de espera. Camila: niveles. Sofía: un grupo nuevo los sábados»." },
        { speaker: "camila", text: "What about you?", es: "«¿Y tú?»" },
        { speaker: "vale", text: "I am going to do the hardest thing: say 'not yet' with a smile.", es: "«Voy a hacer lo más difícil: decir «todavía no» con una sonrisa»." },
      ],
      words: [
        { word: "popular", es: "popular" },
        { word: "waiting list", es: "lista de espera" },
        { word: "solve", es: "resolver" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani contesta tres llamadas seguidas con la misma frase perfecta.",
      text: "Dani answered call after call, and his phrase became perfect.",
      es: "Dani contestó llamada tras llamada, y su frase se volvió perfecta.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Thank you for calling! We have opened a waiting list, and I have added your name. You are number twelve!", es: "«¡Gracias por llamar! Hemos abierto una lista de espera y he agregado su nombre. ¡Es el número doce!»" },
        { speaker: "dani", text: "…Hello! Yes, the school from the newspaper! Yes, the one with the friendliest front desk… which is me…", es: "«…¡Hola! ¡Sí, la escuela del periódico! Sí, la de la recepción más amable… que soy yo…»" },
        { speaker: "camila", text: "He has said 'which is me' eight times today.", es: "«Ha dicho «que soy yo» ocho veces hoy»." },
      ],
      words: [
        { word: "added", es: "agregado" },
        { word: "number", es: "número" },
        { word: "times", es: "veces" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Bryan, de BigTalk, observa la fila desde enfrente con cara seria.",
      text: "Across the street, Bryan watched the line. He has never seen a line at BigTalk.",
      es: "Enfrente, Bryan observaba la fila. Nunca ha visto una fila en BigTalk.",
      speaker: "narrator",
      lines: [
        { speaker: "bryan", text: "A line. They have a line. We have a three-million-dollar system and THEY have a line.", es: "«Una fila. Ellos tienen una fila. Nosotros tenemos un sistema de tres millones de dólares y ELLOS tienen una fila»." },
        { speaker: "bryan", text: "How is this possible? What are they doing that we are not doing?", es: "«¿Cómo es posible? ¿Qué están haciendo ellos que nosotros no estamos haciendo?»" },
      ],
      words: [
        { word: "across", es: "enfrente" },
        { word: "possible", es: "posible" },
        { word: "doing", es: "haciendo" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Al mediodía: pizarrón con números; el equipo agotado pero feliz.",
      text: "By noon: twenty-five calls, eighteen names, and one exhausted, happy team.",
      es: "Al mediodía: veinticinco llamadas, dieciocho nombres y un equipo agotado y feliz.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Final count: twenty-five calls. Eighteen names on the waiting list. One lost voice — mine.", es: "«Cuenta final: veinticinco llamadas. Dieciocho nombres en la lista. Una voz perdida: la mía»." },
        { speaker: "vale", text: "We have never had a waiting list before. Never, in five years.", es: "«Nunca habíamos tenido lista de espera. Nunca, en cinco años»." },
        { speaker: "camila", text: "And Northline decides in six days. Interesting timing, universe.", es: "«Y Northline decide en seis días. Interesante momento, universo»." },
      ],
      words: [
        { word: "exhausted", es: "agotado" },
        { word: "before", es: "antes" },
        { word: "timing", es: "momento / sincronización" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale habla con la gente de la fila, con honestidad y calidez.",
      text: "Vale spoke to the line personally: honest, warm, and organized.",
      es: "Vale habló con la fila personalmente: honesta, cálida y organizada.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Thank you all for coming. We are a small school, and we teach with love.", es: "«Gracias a todos por venir. Somos una escuela pequeña y enseñamos con amor»." },
        { speaker: "vale", text: "We have opened new groups, and we have added every name to the list. Nobody is going to be forgotten.", es: "«Hemos abierto grupos nuevos y hemos agregado cada nombre a la lista. Nadie va a ser olvidado»." },
        { speaker: "dani", text: "The lady in the red shirt is crying. Good crying, I think.", es: "«La señora de la camisa roja está llorando. Llorando bien, creo»." },
      ],
      words: [
        { word: "personally", es: "personalmente" },
        { word: "forgotten", es: "olvidado" },
        { word: "crying", es: "llorando" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Morgan manda un mensaje: alguien de la junta leyó el artículo.",
      text: "At five, Morgan sent a message: Someone on the board read the article. Interesting.",
      es: "A las cinco, Morgan mandó un mensaje: «Alguien de la junta leyó el artículo. Interesante».",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Morgan wrote: 'Someone on the board read the article. Interesting.'", es: "«Morgan escribió: «Alguien de la junta leyó el artículo. Interesante.»" },
        { speaker: "dani", text: "INTERESTING! That's a good 'interesting', right? Tell me it's a good one!", es: "«¡INTERESANTE! Eso es un «interesante» bueno, ¿verdad? ¡Dime que es bueno!»" },
        { speaker: "vale", text: "In Morgan language, 'interesting' is the best word we have.", es: "«En idioma Morgan, «interesante» es la mejor palabra que tenemos»." },
      ],
      words: [
        { word: "message", es: "mensaje" },
        { word: "read", es: "leyó" },
        { word: "language", es: "idioma" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Dani cierra el día practicando la frase de las llamadas una vez más.",
      text: "Dani closes the day with his perfect phone phrase.",
      es: "Dani cierra el día con su frase telefónica perfecta.",
      speaker: "dani",
      lines: [
        { speaker: "vale", text: "One more time, coordinator. The phone phrase.", es: "«Una vez más, coordinador. La frase del teléfono»." },
        { speaker: "dani", text: "Thank you for calling! We have opened a waiting list, and I have added your name.", es: "«¡Gracias por llamar! Hemos abierto una lista de espera y he agregado su nombre»." },
        { speaker: "dani", text: "You are going to love it here. This is the best small school in the city — and the friendliest.", es: "«Le va a encantar aquí. Esta es la mejor escuela pequeña de la ciudad — y la más amable»." },
      ],
      words: [
        { word: "calling", es: "llamando" },
        { word: "love", es: "encantar" },
        { word: "friendliest", es: "la más amable" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What happened after the newspaper came out?",
      questionEs: "¿Qué pasó después de que salió el periódico?",
      options: [
        { label: "The phone has been ringing all morning", emoji: "📞" },
        { label: "Nobody called", emoji: "🦗" },
        { label: "The school closed", emoji: "🔒" },
      ],
      answer: 0,
      sayIt: "The phone has been ringing all morning. I have written eleven names.",
      sayItEs: "Ejemplo: «The phone has been ringing all morning. I have written eleven names.»",
      sayItAskEn: "What have you been doing all day today?",
      sayItAskEs: "¿Qué has estado haciendo todo el día hoy?",
      sayItCheck: {
        target: "I have been *ing",
        altTargets: ["I've been *ing", "Today I have been *ing", "All day, I have been *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "How did Vale organize the success?",
      questionEs: "¿Cómo organizó Vale el éxito?",
      options: [
        { label: "Waiting list, levels, and a new Saturday group", emoji: "🗂️" },
        { label: "She closed the school", emoji: "🚪" },
        { label: "She asked BigTalk for help", emoji: "🆘" },
      ],
      answer: 0,
      sayIt: "We have opened a waiting list, and we have added every name.",
      sayItEs: "Ejemplo: «We have opened a waiting list, and we have added every name.»",
      sayItAskEn: "Tell me about a problem you have solved recently. What did you do?",
      sayItAskEs: "Cuéntame de un problema que has resuelto recientemente. ¿Qué hiciste?",
      sayItCheck: {
        target: "I have *",
        altTargets: ["I solved *: I *", "Recently, I have *", "First I *, then I *"],
      },
    },
    {
      id: "q3",
      afterScene: "s10",
      questionEn: "Why was Morgan's message good news?",
      questionEs: "¿Por qué el mensaje de Morgan fue una buena noticia?",
      options: [
        { label: "Someone on the board read the article", emoji: "📰" },
        { label: "She cancelled the contract", emoji: "❌" },
        { label: "She chose BigTalk", emoji: "🏢" },
      ],
      answer: 0,
      sayIt: "Someone on the board has read the article. That is very good for us.",
      sayItEs: "Ejemplo: «Someone on the board has read the article. That is very good for us.»",
      sayItAskEn: "Tell me the best news you have received recently.",
      sayItAskEs: "Cuéntame la mejor noticia que has recibido recientemente.",
      sayItCheck: {
        target: "I have received *",
        altTargets: ["The best news is *", "I have heard that *", "Recently, *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s5",
    phrase: "English is easy. I can do it. Even a full line outside my door.",
    es: "El inglés es fácil. Yo puedo hacerlo. Aun con una fila completa afuera de mi puerta.",
  },
  habitCard: {
    afterScene: "s6",
    phrase: "I repeat my best phrase until it becomes automatic. Practice makes it perfect.",
    es: "Repito mi mejor frase hasta que se vuelve automática. La práctica la hace perfecta.",
    model: "dani",
    modelActionEs: "Dani repitió su frase del teléfono hasta que salió sola, sin guion.",
  },
  continuePrompt: {
    en: "Imagine your business or project appears in the newspaper tomorrow. What has changed? What are people saying?",
    es: "Imagina que tu negocio o proyecto sale en el periódico mañana. ¿Qué ha cambiado? ¿Qué está diciendo la gente?",
  },
  continueWith: ["Since the news, ...", "People have been ...", "We have received ..."],
  cliffhanger: {
    en: "Episode 15: Bryan makes his last move — he wants to buy Vale's school. Again.",
    es: "Episodio 15: Bryan hace su última jugada — quiere comprar la escuela de Vale. Otra vez.",
  },
};
