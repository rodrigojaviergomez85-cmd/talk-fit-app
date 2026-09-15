import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep15-last-offer/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep15-last-offer/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep15-last-offer/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep15-last-offer/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep15-last-offer/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep15-last-offer/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep15-last-offer/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep15-last-offer/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep15-last-offer/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep15-last-offer/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep15-last-offer/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep15-last-offer/s11.jpg";

/**
 * Season 7 (Tigers) Episode 15 — "The last offer".
 * Matches Tigers Day 15 (will / going to for instant decisions and plans —
 * negotiation and promises).
 */
export const TIGERS_EP15_LAST_OFFER: StorybookEpisode = {
  id: "tigers-ep15-last-offer",
  moduleId: "tigers",
  week: 3,
  title: "The last offer",
  titleEs: "La última oferta",
  episodeLabel: { en: "Season 7 · Episode 15", es: "Temporada 7 · Episodio 15" },
  previously: [
    { en: "The newspaper named the school the best small school in the city.", es: "El periódico nombró a la escuela la mejor escuela pequeña de la ciudad." },
    { en: "A waiting list opened after twenty-five calls in one morning.", es: "Se abrió lista de espera tras veinticinco llamadas en una mañana." },
    { en: "Northline's board decides in a few days.", es: "La junta de Northline decide en unos días." },
  ],
  reviewWords: [
    { word: "waiting list", es: "lista de espera" },
    { word: "article", es: "artículo" },
    { word: "board", es: "junta directiva" },
  ],
  blurb: {
    en: "Bryan crosses the street one more time with a final offer: BigTalk wants to buy the school. Vale must decide — and promise.",
    es: "Bryan cruza la calle una vez más con una oferta final: BigTalk quiere comprar la escuela. Vale debe decidir — y prometer.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Bryan cruza la calle con un portafolio; Dani lo ve entrar.",
      text: "The same Bryan who offered to buy the school months ago walked in with a briefcase.",
      es: "El mismo Bryan que ofreció comprar la escuela hace meses entró con un portafolio.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "Vale. The BigTalk guy is here. The 'we want to buy you' guy.", es: "«Vale. El de BigTalk está aquí. El de «queremos comprarles»»." },
        { speaker: "vale", text: "Let him in. We'll listen. Listening is free.", es: "«Déjalo pasar. Escucharemos. Escuchar es gratis»." },
        { speaker: "bryan", text: "Miss Vale. Always a pleasure. May I sit?", es: "«Señorita Vale. Siempre un placer. ¿Puedo sentarme?»" },
      ],
      words: [
        { word: "briefcase", es: "portafolio" },
        { word: "pleasure", es: "placer" },
        { word: "listen", es: "escuchar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Bryan abre el portafolio y pone un papel con una cifra grande sobre la mesa.",
      text: "My bosses read the newspaper. They are… impressed. And they are going to make you a final offer.",
      es: "«Mis jefes leyeron el periódico. Están… impresionados. Y van a hacerte una oferta final».",
      speaker: "bryan",
      lines: [
        { speaker: "bryan", text: "My bosses read the article. They are impressed. Honestly, so am I.", es: "«Mis jefes leyeron el artículo. Están impresionados. Honestamente, yo también»." },
        { speaker: "bryan", text: "They are going to make you a final offer. Double the last one.", es: "«Van a hacerte una oferta final. El doble de la anterior»." },
        { speaker: "dani", text: "Double?! I mean— hm. Interesting. Not that interesting.", es: "«¡¿El doble?! O sea— hm. Interesante. No tan interesante»." },
      ],
      words: [
        { word: "impressed", es: "impresionados" },
        { word: "offer", es: "oferta" },
        { word: "double", es: "el doble" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Bryan explica el plan: la escuela sería una sucursal de BigTalk.",
      text: "The plan: your school becomes a BigTalk branch. You keep your job, we change the name.",
      es: "«El plan: tu escuela se convierte en una sucursal de BigTalk. Conservas tu empleo, cambiamos el nombre».",
      speaker: "bryan",
      lines: [
        { speaker: "bryan", text: "The plan is simple. Your school becomes a BigTalk branch.", es: "«El plan es simple. Tu escuela se convierte en una sucursal de BigTalk»." },
        { speaker: "bryan", text: "You will keep your job, of course. We will just change the name. And the method. And the colors.", es: "«Conservarás tu empleo, claro. Solo cambiaremos el nombre. Y el método. Y los colores»." },
        { speaker: "vale", text: "So… you will keep the building and change everything else.", es: "«O sea… conservarán el edificio y cambiarán todo lo demás»." },
      ],
      words: [
        { word: "branch", es: "sucursal" },
        { word: "keep", es: "conservar" },
        { word: "method", es: "método" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale mira la oferta sin tocarla; piensa en silencio.",
      text: "Vale looked at the number. It was a lot of money. A house. A car. Ten quiet years.",
      es: "Vale miró la cifra. Era mucho dinero. Una casa. Un carro. Diez años tranquilos.",
      speaker: "narrator",
      lines: [
        { speaker: "bryan", text: "Take your time. But not too much time. The offer ends on Friday.", es: "«Tómate tu tiempo. Pero no demasiado. La oferta termina el viernes»." },
        { speaker: "vale", text: "Friday. The same day Northline decides. What a coincidence.", es: "«Viernes. El mismo día que decide Northline. Qué coincidencia»." },
        { speaker: "bryan", text: "In business, Miss Vale, there are no coincidences.", es: "«En los negocios, señorita Vale, no hay coincidencias»." },
      ],
      words: [
        { word: "quiet", es: "tranquilos" },
        { word: "coincidence", es: "coincidencia" },
        { word: "business", es: "negocios" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "El equipo se reúne después de que Bryan se va; todos hablan al mismo tiempo.",
      text: "When Bryan left, the whole team exploded at the same time.",
      es: "Cuando Bryan se fue, todo el equipo explotó al mismo tiempo.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "It's a lot of money. It's a LOT of money. But they would change the name! And the method! And ME, probably!", es: "«Es mucho dinero. Es MUCHO dinero. ¡Pero cambiarían el nombre! ¡Y el método! ¡Y a MÍ, probablemente!»" },
        { speaker: "camila", text: "If we sell, the waiting list becomes BigTalk's list. The forty students become numbers.", es: "«Si vendemos, la lista de espera se vuelve lista de BigTalk. Los cuarenta estudiantes se vuelven números»." },
        { speaker: "sofia", text: "And 'mistakes are welcome' becomes… what? 'Mistakes will be processed'?", es: "«Y «los errores son bienvenidos» se vuelve… ¿qué? ¿«Los errores serán procesados»?»" },
      ],
      words: [
        { word: "exploded", es: "explotó" },
        { word: "sell", es: "vender" },
        { word: "numbers", es: "números" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Vale se queda sola en la noche, mirando la foto vieja del barrio.",
      text: "That night, Vale stayed alone, looking at Don Tito's old photo.",
      es: "Esa noche, Vale se quedó sola, mirando la foto vieja de Don Tito.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "This street used to be empty. And now there is a line outside my school.", es: "«Esta calle antes estaba vacía. Y ahora hay una fila afuera de mi escuela»." },
        { speaker: "vale", text: "If I sell, I will be rich and comfortable. If I don't sell, I will be… me.", es: "«Si vendo, seré rica y estaré cómoda. Si no vendo, seré… yo»." },
        { speaker: "vale", text: "I am not going to sell the dream, mom. I am going to grow it.", es: "«No voy a vender el sueño, mamá. Voy a hacerlo crecer»." },
      ],
      words: [
        { word: "rich", es: "rica" },
        { word: "comfortable", es: "cómoda" },
        { word: "grow", es: "hacer crecer" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Por la mañana, Vale llama a Bryan con su decisión.",
      text: "In the morning, Vale called Bryan with her decision.",
      es: "Por la mañana, Vale llamó a Bryan con su decisión.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Mr. Bryan. Thank you for the offer. The answer is no.", es: "«Señor Bryan. Gracias por la oferta. La respuesta es no»." },
        { speaker: "bryan", text: "…May I ask why? It is double. It is a very serious number.", es: "«…¿Puedo preguntar por qué? Es el doble. Es una cifra muy seria»." },
        { speaker: "vale", text: "Because we are not going to sell the school. We are going to grow it. And we are going to win the Northline contract.", es: "«Porque no vamos a vender la escuela. Vamos a hacerla crecer. Y vamos a ganar el contrato de Northline»." },
      ],
      words: [
        { word: "decision", es: "decisión" },
        { word: "serious", es: "seria" },
        { word: "contract", es: "contrato" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Bryan sonríe por primera vez, con respeto, y estrecha la mano de Vale.",
      text: "You know what, Miss Vale? I believe you. And that is the worst news for my bosses.",
      es: "«¿Sabe qué, señorita Vale? Le creo. Y esa es la peor noticia para mis jefes».",
      speaker: "bryan",
      lines: [
        { speaker: "bryan", text: "You know what? I believe you. And that is the worst news for my bosses.", es: "«¿Sabe qué? Le creo. Y esa es la peor noticia para mis jefes»." },
        { speaker: "bryan", text: "I will tell them the school is not for sale. But they will not stop competing. They never stop.", es: "«Les diré que la escuela no está en venta. Pero no dejarán de competir. Nunca paran»." },
        { speaker: "vale", text: "Good. Competition has made us better. We'll see you on the street, Bryan.", es: "«Bien. La competencia nos ha hecho mejores. Nos vemos en la calle, Bryan»." },
      ],
      words: [
        { word: "believe", es: "creer" },
        { word: "sale", es: "venta / en venta" },
        { word: "competing", es: "compitiendo" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El equipo celebra la decisión; Dani abraza el letrero de la escuela.",
      text: "The team celebrated. Dani hugged the school sign like an old friend.",
      es: "El equipo celebró. Dani abrazó el letrero de la escuela como a un viejo amigo.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "I will NEVER leave you, sign! Never!", es: "«¡NUNCA te dejaré, letrero! ¡Nunca!»" },
        { speaker: "camila", text: "He's hugging the sign again. That is my coordinator.", es: "«Está abrazando el letrero otra vez. Ese es mi coordinador»." },
        { speaker: "vale", text: "Team: new goal. We are going to open the Saturday groups, and we are going to win Northline.", es: "«Equipo: nueva meta. Vamos a abrir los grupos de sábado y vamos a ganar Northline»." },
      ],
      words: [
        { word: "hugged", es: "abrazó" },
        { word: "goal", es: "meta" },
        { word: "win", es: "ganar" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Don Tito escucha la noticia y levanta su pupusa como brindis.",
      text: "Don Tito raised a pupusa like a toast.",
      es: "Don Tito levantó una pupusa como brindis.",
      speaker: "tito",
      lines: [
        { speaker: "tito", text: "You said no to the money, mija. Your mom is going to cry when I tell her.", es: "«Le dijiste no al dinero, mija. Tu mamá va a llorar cuando le cuente»." },
        { speaker: "vale", text: "Good crying?", es: "«¿Llorar bien?»" },
        { speaker: "tito", text: "The best crying. The 'my daughter kept her dream' crying.", es: "«El mejor llanto. El llanto de «mi hija conservó su sueño»»." },
      ],
      words: [
        { word: "toast", es: "brindis" },
        { word: "kept", es: "conservó" },
        { word: "dream", es: "sueño" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Vale practica la frase de la decisión frente al espejo, sonriendo.",
      text: "Vale practices the decision sentence one more time.",
      es: "Vale practica la oración de la decisión una vez más.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "I am not going to sell. I am going to grow the school.", es: "«No voy a vender. Voy a hacer crecer la escuela»." },
        { speaker: "vale", text: "And when Northline calls, I will say yes to the contract — our contract.", es: "«Y cuando llame Northline, diré sí al contrato — nuestro contrato»." },
        { speaker: "vale", text: "Some things are not for sale. Dreams are not for sale.", es: "«Algunas cosas no están en venta. Los sueños no están en venta»." },
      ],
      words: [
        { word: "sell", es: "vender" },
        { word: "grow", es: "crecer" },
        { word: "dreams", es: "sueños" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "What was BigTalk's plan for the school?",
      questionEs: "¿Cuál era el plan de BigTalk para la escuela?",
      options: [
        { label: "Turn it into a branch and change the name and method", emoji: "🔄" },
        { label: "Close it forever", emoji: "🔒" },
        { label: "Move it to another city", emoji: "🚚" },
      ],
      answer: 0,
      sayIt: "The school will become a branch, and they will change the name.",
      sayItEs: "Ejemplo: «The school will become a branch, and they will change the name.»",
      sayItAskEn: "What are you going to do this weekend? Tell me one plan.",
      sayItAskEs: "¿Qué vas a hacer este fin de semana? Dime un plan.",
      sayItCheck: {
        target: "I am going to *",
        altTargets: ["I'm going to *", "This weekend, I am going to *", "We are going to *"],
      },
    },
    {
      id: "q2",
      afterScene: "s7",
      questionEn: "What was Vale's answer to the final offer?",
      questionEs: "¿Cuál fue la respuesta de Vale a la oferta final?",
      options: [
        { label: "No — she is going to grow the school and win Northline", emoji: "🌱" },
        { label: "Yes — she took the money", emoji: "💰" },
        { label: "She asked for triple", emoji: "✖️" },
      ],
      answer: 0,
      sayIt: "We are not going to sell the school. We are going to grow it, and we are going to win the contract.",
      sayItEs: "Ejemplo: «We are not going to sell the school. We are going to grow it, and we are going to win the contract.»",
      sayItAskEn: "Tell me one thing you are NOT going to do, and one thing you ARE going to do.",
      sayItAskEs: "Dime una cosa que NO vas a hacer y una cosa que SÍ vas a hacer.",
      sayItCheck: {
        target: "I am not going to *. I am going to *",
        altTargets: ["I'm not going to *, I'm going to *", "I will not *. I will *", "No, I am going to * instead"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What did Bryan say at the end?",
      questionEs: "¿Qué dijo Bryan al final?",
      options: [
        { label: "I believe you — and his bosses will not stop competing", emoji: "🤝" },
        { label: "He will never return", emoji: "👋" },
        { label: "He will buy the newspaper", emoji: "📰" },
      ],
      answer: 0,
      sayIt: "I will tell them the school is not for sale, but they will not stop competing.",
      sayItEs: "Ejemplo: «I will tell them the school is not for sale, but they will not stop competing.»",
      sayItAskEn: "Imagine a big change in your life. What will happen? What will you do?",
      sayItAskEs: "Imagina un cambio grande en tu vida. ¿Qué pasará? ¿Qué harás?",
      sayItCheck: {
        target: "I will *",
        altTargets: ["If that happens, I will *", "It will *, and I will *", "I'll *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s6",
    phrase: "I can do it, and I don't need to sell my dream to do it.",
    es: "Puedo hacerlo, y no necesito vender mi sueño para lograrlo.",
  },
  habitCard: {
    afterScene: "s7",
    phrase: "I decide fast with 'will' and I plan with 'going to'. My decisions have a voice.",
    es: "Decido rápido con 'will' y planifico con 'going to'. Mis decisiones tienen voz.",
    model: "vale",
    modelActionEs: "Vale decidió en una noche y lo anunció con dos oraciones claras.",
  },
  continuePrompt: {
    en: "Someone offers you an easy way out of your dream. What will you say? What are you going to do?",
    es: "Alguien te ofrece una salida fácil de tu sueño. ¿Qué dirás? ¿Qué vas a hacer?",
  },
  continueWith: ["I will say ...", "I am not going to ...", "Instead, I am going to ..."],
  cliffhanger: {
    en: "Episode 16: Friday — Northline calls with the final decision.",
    es: "Episodio 16: Viernes — Northline llama con la decisión final.",
  },
};
