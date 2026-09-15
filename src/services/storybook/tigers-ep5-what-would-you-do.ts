import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep5-what-would-you-do/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep5-what-would-you-do/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep5-what-would-you-do/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep5-what-would-you-do/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep5-what-would-you-do/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep5-what-would-you-do/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep5-what-would-you-do/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep5-what-would-you-do/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep5-what-would-you-do/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep5-what-would-you-do/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep5-what-would-you-do/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep5-what-would-you-do/s11.jpg";

/**
 * Season 7 (Tigers) Episode 5 — "What would you do?"
 * Matches Tigers Day 5 (second conditional: if + past, would + verb).
 */
export const TIGERS_EP5_WHAT_WOULD_YOU_DO: StorybookEpisode = {
  id: "tigers-ep5-what-would-you-do",
  moduleId: "tigers",
  week: 1,
  title: "What would you do?",
  titleEs: "¿Qué harías tú?",
  episodeLabel: { en: "Season 7 · Episode 5", es: "Temporada 7 · Episodio 5" },
  previously: [
    { en: "The team did an honest audit of the school.", es: "El equipo hizo una auditoría honesta de la escuela." },
    { en: "They chose three priorities: air, emails and reception.", es: "Eligieron tres prioridades: aire, correos y recepción." },
    { en: "Mateo fixed the door schedule the same day.", es: "Mateo arregló el horario de la puerta el mismo día." },
  ],
  reviewWords: [
    { word: "priority", es: "prioridad" },
    { word: "change", es: "cambiar" },
    { word: "owner", es: "responsable" },
  ],
  blurb: {
    en: "Bryan returns with papers and a smile: BigTalk wants to buy the school. Everyone answers the same question — what would you do?",
    es: "Bryan regresa con papeles y una sonrisa: BigTalk quiere comprar la escuela. Todos responden la misma pregunta: ¿qué harías tú?",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Bryan entra con un sobre elegante y lo deja sobre el escritorio de Vale.",
      text: "Monday, four in the afternoon. Bryan walked in with an elegant envelope and left it on Vale's desk.",
      es: "Lunes, cuatro de la tarde. Bryan entró con un sobre elegante y lo dejó sobre el escritorio de Vale.",
      speaker: "narrator",
      lines: [
        { speaker: "bryan", text: "A gift from my directors. Read it when you have time.", es: "«Un regalo de mis directores. Léelo cuando tengas tiempo»." },
        { speaker: "vale", text: "What is it?", es: "«¿Qué es?»" },
        { speaker: "bryan", text: "An offer to buy your school. A very generous offer.", es: "«Una oferta para comprar tu escuela. Una oferta muy generosa»." },
      ],
      words: [
        { word: "envelope", es: "sobre" },
        { word: "generous", es: "generosa" },
        { word: "buy", es: "comprar" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale, Camila y Dani leen la oferta juntos con los ojos abiertos.",
      text: "They would pay two years of profits, today, in one check.",
      es: "«Pagarían dos años de ganancias, hoy, en un solo cheque».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "Two years of profits… today… in one check.", es: "«Dos años de ganancias… hoy… en un solo cheque»." },
        { speaker: "dani", text: "That's a lot of money, Vale. A lot.", es: "«Es mucho dinero, Vale. Mucho»." },
        { speaker: "vale", text: "It is. And there's a second page. Read it, Camila.", es: "«Lo es. Y hay una segunda página. Léela, Camila»." },
      ],
      words: [
        { word: "profits", es: "ganancias" },
        { word: "check", es: "cheque" },
        { word: "page", es: "página" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Camila lee la segunda página en voz alta con cara de sorpresa.",
      text: "The school would keep its name, but BigTalk would choose the teachers and the method.",
      es: "«La escuela mantendría su nombre, pero BigTalk elegiría a los maestros y el método».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "The school would keep its name…", es: "«La escuela mantendría su nombre…»" },
        { speaker: "camila", text: "…but BigTalk would choose the teachers and the method.", es: "«…pero BigTalk elegiría a los maestros y el método»." },
        { speaker: "dani", text: "So we would work for them. With their rules.", es: "«O sea que trabajaríamos para ellos. Con sus reglas»." },
        { speaker: "vale", text: "Exactly. Now the real question: what would you do?", es: "«Exacto. Ahora la verdadera pregunta: ¿qué harían ustedes?»" },
      ],
      words: [
        { word: "keep", es: "mantener" },
        { word: "method", es: "método" },
        { word: "rules", es: "reglas" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Dani habla primero, soñando con el cheque pero dudando.",
      text: "If I had that money, I would pay my mom's house. But… would I be happy?",
      es: "«Si tuviera ese dinero, le pagaría la casa a mi mamá. Pero… ¿sería feliz?»",
      speaker: "dani",
      lines: [
        { speaker: "dani", text: "Honestly? If I had that money, I would pay my mom's house.", es: "«¿Honestamente? Si tuviera ese dinero, le pagaría la casa a mi mamá»." },
        { speaker: "dani", text: "But then I would work for Bryan. And would I be happy? I don't think so.", es: "«Pero luego trabajaría para Bryan. ¿Y sería feliz? No lo creo»." },
        { speaker: "vale", text: "Good answer. Honest and complete.", es: "«Buena respuesta. Honesta y completa»." },
      ],
      words: [
        { word: "honestly", es: "honestamente" },
        { word: "happy", es: "feliz" },
        { word: "think", es: "creer / pensar" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Camila cruza los brazos y responde con firmeza.",
      text: "If I were you, I wouldn't sell. If you sold, BigTalk would kill everything we built.",
      es: "«Si yo fuera tú, no vendería. Si vendieras, BigTalk mataría todo lo que construimos».",
      speaker: "camila",
      lines: [
        { speaker: "camila", text: "If I were you, I wouldn't sell. Not one dollar of it.", es: "«Si yo fuera tú, no vendería. Ni un dólar»." },
        { speaker: "camila", text: "If you sold, BigTalk would kill everything we built.", es: "«Si vendieras, BigTalk mataría todo lo que construimos»." },
        { speaker: "camila", text: "They would fire half of us in six months. I know how chains work.", es: "«Despedirían a la mitad de nosotros en seis meses. Sé cómo trabajan las cadenas»." },
      ],
      words: [
        { word: "sell", es: "vender" },
        { word: "built", es: "construimos" },
        { word: "fire", es: "despedir" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Don Tito llega con limonada y escucha la pregunta del millón.",
      text: "Don Tito arrived with lemonade, heard the question and sat down slowly.",
      es: "Don Tito llegó con limonada, escuchó la pregunta y se sentó despacio.",
      speaker: "narrator",
      lines: [
        { speaker: "tito", text: "If I were forty years younger, I would say no without thinking.", es: "«Si tuviera cuarenta años menos, diría que no sin pensar»." },
        { speaker: "tito", text: "But at my age… if they offered me that check, I would think about it for a week.", es: "«Pero a mi edad… si me ofrecieran ese cheque, lo pensaría una semana»." },
        { speaker: "vale", text: "And after the week, Don Tito?", es: "«¿Y después de la semana, Don Tito?»" },
        { speaker: "tito", text: "I would still say no. But I would cry a little first.", es: "«Igual diría que no. Pero lloraría un poquito primero»." },
      ],
      words: [
        { word: "younger", es: "más joven" },
        { word: "week", es: "semana" },
        { word: "still", es: "aun así / todavía" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "Vale camina por la oficina pensando, con el sobre en la mano.",
      text: "If I sold the school, I would lose the reason I started.",
      es: "«Si vendiera la escuela, perdería la razón por la que empecé».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "My turn. If I sold the school, I would lose the reason I started.", es: "«Mi turno. Si vendiera la escuela, perdería la razón por la que empecé»." },
        { speaker: "vale", text: "The money would last two years. The purpose has to last my whole life.", es: "«El dinero duraría dos años. El propósito tiene que durar toda la vida»." },
        { speaker: "dani", text: "But Vale… what if BigTalk destroys us anyway?", es: "«Pero Vale… ¿y si BigTalk nos destruye de todos modos?»" },
      ],
      words: [
        { word: "lose", es: "perder" },
        { word: "purpose", es: "propósito" },
        { word: "destroy", es: "destruir" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Vale responde con calma, mirando las fotos de los estudiantes en la pared.",
      text: "If they beat us with better teaching, I would accept it. But they won't.",
      es: "«Si nos ganaran enseñando mejor, lo aceptaría. Pero no lo harán».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "If they beat us with better teaching, I would accept it.", es: "«Si nos ganaran enseñando mejor, lo aceptaría»." },
        { speaker: "vale", text: "But they won't. Because teaching isn't a machine. It's a relationship.", es: "«Pero no lo harán. Porque enseñar no es una máquina. Es una relación»." },
        { speaker: "camila", text: "So the answer is no?", es: "«¿Entonces la respuesta es no?»" },
        { speaker: "vale", text: "The answer is: no, thank you. In English and in Spanish.", es: "«La respuesta es: no, gracias. En inglés y en español»." },
      ],
      words: [
        { word: "beat", es: "ganar / vencer" },
        { word: "relationship", es: "relación" },
        { word: "answer", es: "respuesta" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "Vale llama a Bryan por teléfono mientras el equipo escucha en silencio.",
      text: "Bryan, thank you for the offer. If we sold, our students would lose their school. The answer is no.",
      es: "«Bryan, gracias por la oferta. Si vendiéramos, nuestros estudiantes perderían su escuela. La respuesta es no».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Bryan, thank you for the offer. The answer is no.", es: "«Bryan, gracias por la oferta. La respuesta es no»." },
        { speaker: "vale", text: "If we sold, our students would lose their school. We won't do that to them.", es: "«Si vendiéramos, nuestros estudiantes perderían su escuela. No les haremos eso»." },
        { speaker: "bryan", text: "You're making a mistake, Vale. We'll be neighbors for a long time.", es: "«Estás cometiendo un error, Vale. Seremos vecinos por mucho tiempo»." },
      ],
      words: [
        { word: "mistake", es: "error" },
        { word: "neighbors", es: "vecinos" },
        { word: "long", es: "largo" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "El equipo celebra en silencio y Don Tito levanta su vaso de limonada.",
      text: "The office exploded in a quiet celebration. The school stayed theirs.",
      es: "La oficina explotó en una celebración silenciosa. La escuela seguía siendo de ellos.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "We just said no to a mountain of money.", es: "«Acabamos de decirle no a una montaña de dinero»." },
        { speaker: "camila", text: "And we said yes to ourselves.", es: "«Y nos dijimos sí a nosotros mismos»." },
        { speaker: "vale", text: "Now the hard part: we have to prove we were right.", es: "«Ahora la parte difícil: tenemos que demostrar que teníamos razón»." },
      ],
      words: [
        { word: "mountain", es: "montaña" },
        { word: "ourselves", es: "nosotros mismos" },
        { word: "prove", es: "demostrar" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Cada personaje repite su respuesta a la pregunta qué harías tú.",
      text: "One by one, everyone repeats their answer to the big question.",
      es: "Uno por uno, todos repiten su respuesta a la gran pregunta.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Dani, what would you do with the money?", es: "«Dani, ¿qué harías con el dinero?»" },
        { speaker: "dani", text: "I would pay my mom's house. But I wouldn't sell the school.", es: "«Le pagaría la casa a mi mamá. Pero no vendería la escuela»." },
        { speaker: "camila", text: "If I were the boss, I wouldn't sell either. We built this with our hands.", es: "«Si yo fuera la jefa, tampoco vendería. Esto lo construimos con nuestras manos»." },
        { speaker: "vale", text: "And that's the answer. The school is not for sale.", es: "«Y esa es la respuesta. La escuela no está en venta»." },
      ],
      words: [
        { word: "either", es: "tampoco" },
        { word: "hands", es: "manos" },
        { word: "sale", es: "venta" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s4",
      questionEn: "What would Dani do with the money?",
      questionEs: "¿Qué haría Dani con el dinero?",
      options: [
        { label: "He would pay his mom's house", emoji: "🏠" },
        { label: "He would buy a motorcycle", emoji: "🏍️" },
        { label: "He would travel to Europe", emoji: "✈️" },
      ],
      answer: 0,
      sayIt: "If I had that money, I would pay my mom's house.",
      sayItEs: "Ejemplo: «If I had that money, I would pay my mom's house.»",
      sayItAskEn: "If you had a lot of money, what would you do first?",
      sayItAskEs: "Si tuvieras mucho dinero, ¿qué harías primero?",
      sayItCheck: {
        target: "If I had a lot of money, I would *",
        altTargets: ["I would *", "If I had money, I'd *", "First, I would *"],
      },
    },
    {
      id: "q2",
      afterScene: "s5",
      questionEn: "Why wouldn't Camila sell the school?",
      questionEs: "¿Por qué Camila no vendería la escuela?",
      options: [
        { label: "Because BigTalk would kill everything they built", emoji: "🧱" },
        { label: "Because she doesn't like money", emoji: "💰" },
        { label: "Because the check was small", emoji: "🧾" },
      ],
      answer: 0,
      sayIt: "If I were the boss, I wouldn't sell. BigTalk would kill everything we built.",
      sayItEs: "Ejemplo: «If I were the boss, I wouldn't sell. BigTalk would kill everything we built.»",
      sayItAskEn: "Would you sell something you love for a lot of money? Why or why not?",
      sayItAskEs: "¿Venderías algo que amas por mucho dinero? ¿Por qué sí o por qué no?",
      sayItCheck: {
        target: "I would * because *",
        altTargets: ["I wouldn't * because *", "If I were *, I would * because *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "What was Vale's final answer to BigTalk?",
      questionEs: "¿Cuál fue la respuesta final de Vale a BigTalk?",
      options: [
        { label: "No — the school is not for sale", emoji: "🚫" },
        { label: "Yes — she took the check", emoji: "💵" },
        { label: "Maybe — she asked for a month", emoji: "🤔" },
      ],
      answer: 0,
      sayIt: "If we sold, our students would lose their school. The answer is no.",
      sayItEs: "Ejemplo: «If we sold, our students would lose their school. The answer is no.»",
      sayItAskEn: "Imagine a hard choice. What would you do, and what is the other side?",
      sayItAskEs: "Imagina una decisión difícil. ¿Qué harías y cuál es la otra cara?",
      sayItCheck: {
        target: "I would *, but *",
        altTargets: ["If I *, I would *, but *", "On one side *, on the other side *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s7",
    phrase: "I can do it. Money comes and goes; my purpose stays.",
    es: "Yo puedo hacerlo. El dinero va y viene; mi propósito se queda.",
  },
  habitCard: {
    afterScene: "s4",
    phrase: "Before a big decision, I ask everyone the same question and I listen to every answer.",
    es: "Antes de una gran decisión, les hago a todos la misma pregunta y escucho cada respuesta.",
    model: "vale",
    modelActionEs: "Vale pregunta «¿qué harías tú?» a cada persona antes de decidir.",
  },
  continuePrompt: {
    en: "Answer the big question: if someone offered you a lot of money for your dream, what would you do? Why? What is the other side?",
    es: "Responde la gran pregunta: si alguien te ofreciera mucho dinero por tu sueño, ¿qué harías? ¿Por qué? ¿Cuál es la otra cara?",
  },
  continueWith: ["If they offered me ..., I would ...", "I would ... because ...", "The other side is ..."],
  cliffhanger: {
    en: "Episode 6: Vale finds an old photo — the call center, then and now.",
    es: "Episodio 6: Vale encuentra una foto vieja — el call center, antes y ahora.",
  },
};
