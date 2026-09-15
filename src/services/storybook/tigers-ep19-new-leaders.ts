import type { StorybookEpisode } from "./types";
import cover from "@/assets/storybook/tigers-ep19-new-leaders/cover.jpg";
import s1 from "@/assets/storybook/tigers-ep19-new-leaders/s1.jpg";
import s2 from "@/assets/storybook/tigers-ep19-new-leaders/s2.jpg";
import s3 from "@/assets/storybook/tigers-ep19-new-leaders/s3.jpg";
import s4 from "@/assets/storybook/tigers-ep19-new-leaders/s4.jpg";
import s5 from "@/assets/storybook/tigers-ep19-new-leaders/s5.jpg";
import s6 from "@/assets/storybook/tigers-ep19-new-leaders/s6.jpg";
import s7 from "@/assets/storybook/tigers-ep19-new-leaders/s7.jpg";
import s8 from "@/assets/storybook/tigers-ep19-new-leaders/s8.jpg";
import s9 from "@/assets/storybook/tigers-ep19-new-leaders/s9.jpg";
import s10 from "@/assets/storybook/tigers-ep19-new-leaders/s10.jpg";
import s11 from "@/assets/storybook/tigers-ep19-new-leaders/s11.jpg";

/**
 * Season 7 (Tigers) Episode 19 — "New leaders".
 * Matches Tigers Day 19 (mixed tenses + reported decisions: choosing,
 * delegating, explaining choices).
 */
export const TIGERS_EP19_NEW_LEADERS: StorybookEpisode = {
  id: "tigers-ep19-new-leaders",
  moduleId: "tigers",
  week: 4,
  title: "New leaders",
  titleEs: "Nuevos líderes",
  episodeLabel: { en: "Season 7 · Episode 19", es: "Temporada 7 · Episodio 19" },
  previously: [
    { en: "The school won the Northline contract for two more years.", es: "La escuela ganó el contrato de Northline por dos años más." },
    { en: "Northline wants to expand the program to four offices.", es: "Northline quiere expandir el programa a cuatro oficinas." },
    { en: "The team needs more teachers and new leaders.", es: "El equipo necesita más maestros y nuevos líderes." },
  ],
  reviewWords: [
    { word: "won", es: "ganamos" },
    { word: "expand", es: "expandir" },
    { word: "hire", es: "contratar" },
  ],
  blurb: {
    en: "Four offices need four leaders. Vale has one week to decide — and the hardest part isn't choosing; it's telling everyone.",
    es: "Cuatro oficinas necesitan cuatro líderes. Vale tiene una semana para decidir — y lo más difícil no es elegir; es decírselo a todos.",
  },
  cover,
  voice: "girl",
  scenes: [
    {
      id: "s1",
      image: s1,
      imageAlt: "Vale dibuja un organigrama: cuatro oficinas, cuatro espacios de líder vacíos.",
      text: "Vale drew the new map: four offices, four empty leader boxes.",
      es: "Vale dibujó el nuevo mapa: cuatro oficinas, cuatro casillas de líder vacías.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Four offices. Four leaders. And one week to decide.", es: "«Cuatro oficinas. Cuatro líderes. Y una semana para decidir»." },
        { speaker: "dani", text: "Four leaders… Vale, we ARE four people. Including the plants.", es: "«Cuatro líderes… Vale, SOMOS cuatro personas. Incluyendo las plantas»." },
        { speaker: "vale", text: "Five, including the plants. And we start with who we have.", es: "«Cinco, incluyendo las plantas. Y empezamos con quienes tenemos»." },
      ],
      words: [
        { word: "leader", es: "líder" },
        { word: "decide", es: "decidir" },
        { word: "including", es: "incluyendo" },
      ],
    },
    {
      id: "s2",
      image: s2,
      imageAlt: "Vale escribe nombres con fortalezas: Camila, Dani, Sofía, y un signo de pregunta.",
      text: "Every name on the board had strengths — and one big question mark.",
      es: "Cada nombre en la pizarra tenía fortalezas — y un gran signo de interrogación.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "Camila: the strongest teacher. Dani: the heart of the operation. Sofía: the fastest learner I have ever met.", es: "«Camila: la maestra más fuerte. Dani: el corazón de la operación. Sofía: la aprendiz más rápida que he conocido»." },
        { speaker: "camila", text: "And the fourth leader?", es: "«¿Y el cuarto líder?»" },
        { speaker: "vale", text: "That is the question mark. We don't have a fourth. Yet.", es: "«Ese es el signo de interrogación. No tenemos un cuarto. Todavía»." },
      ],
      words: [
        { word: "strengths", es: "fortalezas" },
        { word: "heart", es: "corazón" },
        { word: "yet", es: "todavía" },
      ],
    },
    {
      id: "s3",
      image: s3,
      imageAlt: "Vale habla con Camila primero: liderarás la oficina dos.",
      text: "Camila, you are going to lead office two. You have earned it a hundred times.",
      es: "«Camila, vas a liderar la oficina dos. Te lo has ganado cien veces».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Camila, you are going to lead office two. You have earned it a hundred times.", es: "«Camila, vas a liderar la oficina dos. Te lo has ganado cien veces»." },
        { speaker: "camila", text: "Me? A leader? Vale, I just teach.", es: "«¿Yo? ¿Líder? Vale, yo solo enseño»." },
        { speaker: "vale", text: "You have been leading since your first week. You just didn't have the title.", es: "«Has estado liderando desde tu primera semana. Solo no tenías el título»." },
      ],
      words: [
        { word: "earned", es: "ganado" },
        { word: "title", es: "título / puesto" },
        { word: "lead", es: "liderar" },
      ],
    },
    {
      id: "s4",
      image: s4,
      imageAlt: "Vale habla con Sofía: liderarás el taller de sábados y la oficina tres.",
      text: "Sofía, you will lead the Saturday workshop and office three.",
      es: "«Sofía, liderarás el taller de sábados y la oficina tres».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Sofía, you will lead the Saturday workshop — and office three.", es: "«Sofía, liderarás el taller de sábados — y la oficina tres»." },
        { speaker: "sofia", text: "Office three?! Vale, I have been here for three weeks!", es: "«¡¿Oficina tres?! ¡Vale, llevo aquí tres semanas!»" },
        { speaker: "vale", text: "And in three weeks, you have done what takes others a year. I trust evidence, not calendars.", es: "«Y en tres semanas, has hecho lo que a otros les toma un año. Confío en evidencia, no en calendarios»." },
      ],
      words: [
        { word: "trust", es: "confiar" },
        { word: "evidence", es: "evidencia" },
        { word: "calendars", es: "calendarios" },
      ],
    },
    {
      id: "s5",
      image: s5,
      imageAlt: "Dani espera nervioso su turno; Vale lo mira con una sonrisa.",
      text: "And Dani… you have been the coordinator for two weeks. Now you are the director of operations.",
      es: "«Y Dani… has sido coordinador por dos semanas. Ahora eres el director de operaciones».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "And Dani. You have been coordinator for exactly two weeks.", es: "«Y Dani. Has sido coordinador por exactamente dos semanas»." },
        { speaker: "dani", text: "It's okay. I understand. I am too new. The plants can lead—", es: "«Está bien. Entiendo. Soy muy nuevo. Las plantas pueden liderar—»" },
        { speaker: "vale", text: "You are the new director of operations. All four offices answer to you.", es: "«Eres el nuevo director de operaciones. Las cuatro oficinas te reportan a ti»." },
      ],
      words: [
        { word: "operations", es: "operaciones" },
        { word: "exactly", es: "exactamente" },
        { word: "report", es: "reportar" },
      ],
    },
    {
      id: "s6",
      image: s6,
      imageAlt: "Dani se congela procesando la noticia; luego grita de alegría.",
      text: "Dani froze, processed, and then screamed so loudly that BigTalk heard him. Again.",
      es: "Dani se congeló, procesó, y luego gritó tan fuerte que BigTalk lo escuchó. Otra vez.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "DIRECTOR?! OF OPERATIONS?! ME?!", es: "«¡¿DIRECTOR?! ¡¿DE OPERACIONES?! ¡¿YO?!»" },
        { speaker: "vale", text: "You have answered every call, solved every crisis, and learned English while doing it. That's operations.", es: "«Has contestado cada llamada, resuelto cada crisis y aprendido inglés mientras tanto. Eso es operaciones»." },
        { speaker: "dani", text: "I have been doing the job without the title this whole time!", es: "«¡He estado haciendo el trabajo sin el título todo este tiempo!»" },
      ],
      words: [
        { word: "froze", es: "se congeló" },
        { word: "crisis", es: "crisis" },
        { word: "whole", es: "todo" },
      ],
    },
    {
      id: "s7",
      image: s7,
      imageAlt: "El signo de pregunta: la oficina cuatro; Vale piensa en alguien inesperado.",
      text: "And office four? The question mark. Vale looked at the window, across the street.",
      es: "«¿Y la oficina cuatro? El signo de interrogación». Vale miró por la ventana, hacia enfrente.",
      speaker: "narrator",
      lines: [
        { speaker: "camila", text: "Why are you looking at BigTalk?", es: "«¿Por qué miras hacia BigTalk?»" },
        { speaker: "vale", text: "Because the best salespeople are the ones who almost beat you.", es: "«Porque los mejores vendedores son los que casi te ganan»." },
        { speaker: "dani", text: "No. NO. Vale. You are not thinking what I think you're thinking.", es: "«No. NO. Vale. No estás pensando lo que creo que estás pensando»." },
      ],
      words: [
        { word: "almost", es: "casi" },
        { word: "beat", es: "ganar a" },
        { word: "thinking", es: "pensando" },
      ],
    },
    {
      id: "s8",
      image: s8,
      imageAlt: "Flashback: Bryan estrechando la mano de Vale después de la oferta.",
      text: "Bryan had said it himself: he believed in the school. Maybe he believed more than he knew.",
      es: "El mismo Bryan lo había dicho: creía en la escuela. Quizás creía más de lo que sabía.",
      speaker: "narrator",
      lines: [
        { speaker: "vale", text: "He has been in business for fifteen years. He knows the city, the companies, the mistakes.", es: "«Ha estado en los negocios por quince años. Conoce la ciudad, las empresas, los errores»." },
        { speaker: "vale", text: "And he told me the truth when it was bad for him. Twice.", es: "«Y me dijo la verdad cuando era mala para él. Dos veces»." },
        { speaker: "sofia", text: "But he works for BigTalk. He is… the enemy.", es: "«Pero trabaja para BigTalk. Es… el enemigo»." },
        { speaker: "vale", text: "He was the competition. The enemy is a strong word for a man who likes our method.", es: "«Era la competencia. Enemigo es una palabra muy fuerte para un hombre al que le gusta nuestro método»." },
      ],
      words: [
        { word: "truth", es: "verdad" },
        { word: "competition", es: "competencia" },
        { word: "enemy", es: "enemigo" },
      ],
    },
    {
      id: "s9",
      image: s9,
      imageAlt: "El equipo debate: ¿invitar a Bryan? Votos divididos, risas nerviosas.",
      text: "The team debated. Two votes yes, one vote no, and one vote from a plant.",
      es: "El equipo debatió. Dos votos sí, un voto no, y un voto de una planta.",
      speaker: "narrator",
      lines: [
        { speaker: "dani", text: "I vote… yes. But if he tries to change my desk, I resign.", es: "«Voto… sí. Pero si intenta cambiar mi escritorio, renuncio»." },
        { speaker: "camila", text: "I vote yes. He plays fair. I have watched him all year.", es: "«Voto sí. Juega limpio. Lo he observado todo el año»." },
        { speaker: "sofia", text: "Then it's decided. You are going to invite the competition to join the family.", es: "«Entonces está decidido. Vas a invitar a la competencia a unirse a la familia»." },
      ],
      words: [
        { word: "debated", es: "debatió" },
        { word: "resign", es: "renuncio" },
        { word: "fair", es: "limpio / justo" },
      ],
    },
    {
      id: "s10",
      image: s10,
      imageAlt: "Vale ensaya la llamada a Bryan frente al equipo.",
      text: "Vale rehearsed the call: I am not going to offer you money. I am going to offer you a purpose.",
      es: "Vale ensayó la llamada: «No voy a ofrecerte dinero. Voy a ofrecerte un propósito».",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "Bryan, I am not going to offer you more money. BigTalk will always pay more.", es: "«Bryan, no voy a ofrecerte más dinero. BigTalk siempre pagará más»." },
        { speaker: "vale", text: "I am going to offer you a purpose: lead office four, and build something you believe in.", es: "«Voy a ofrecerte un propósito: lidera la oficina cuatro y construye algo en lo que crees»." },
        { speaker: "dani", text: "If he says no, we never speak of this again.", es: "«Si dice que no, nunca volvemos a hablar de esto»." },
      ],
      words: [
        { word: "purpose", es: "propósito" },
        { word: "believe in", es: "creer en" },
        { word: "build", es: "construir" },
      ],
    },
    {
      id: "s11",
      image: s11,
      imageAlt: "Cierre: el equipo nuevo posa junto al organigrama con tres nombres y una sorpresa.",
      text: "The new team, closing the week with the leadership sentence.",
      es: "El nuevo equipo, cerrando la semana con la oración de liderazgo.",
      speaker: "vale",
      lines: [
        { speaker: "vale", text: "We have chosen our leaders. Camila will lead office two.", es: "«Hemos elegido a nuestros líderes. Camila liderará la oficina dos»." },
        { speaker: "vale", text: "Sofía will lead office three. Dani will direct operations.", es: "«Sofía liderará la oficina tres. Dani dirigirá operaciones»." },
        { speaker: "vale", text: "And tomorrow, I will make the strangest phone call of my career.", es: "«Y mañana, haré la llamada más extraña de mi carrera»." },
      ],
      words: [
        { word: "chosen", es: "elegido" },
        { word: "direct", es: "dirigir" },
        { word: "strangest", es: "más extraña" },
      ],
    },
  ],
  quizzes: [
    {
      id: "q1",
      afterScene: "s3",
      questionEn: "Why did Vale choose Camila to lead office two?",
      questionEs: "¿Por qué Vale eligió a Camila para liderar la oficina dos?",
      options: [
        { label: "She has been leading since her first week", emoji: "🌟" },
        { label: "She is the tallest", emoji: "📏" },
        { label: "She asked for more money", emoji: "💵" },
      ],
      answer: 0,
      sayIt: "You have been leading since your first week. You just didn't have the title.",
      sayItEs: "Ejemplo: «You have been leading since your first week. You just didn't have the title.»",
      sayItAskEn: "Tell me about someone you trust. Why do you trust them?",
      sayItAskEs: "Cuéntame de alguien en quien confías. ¿Por qué confías en esa persona?",
      sayItCheck: {
        target: "I trust * because *",
        altTargets: ["* has always *", "Because they have *", "I trust them because they *"],
      },
    },
    {
      id: "q2",
      afterScene: "s6",
      questionEn: "What was Dani's new position?",
      questionEs: "¿Cuál fue el nuevo puesto de Dani?",
      options: [
        { label: "Director of operations — four offices report to him", emoji: "🗂️" },
        { label: "Plant manager", emoji: "🪴" },
        { label: "Security guard", emoji: "💂" },
      ],
      answer: 0,
      sayIt: "You are the new director of operations. All four offices answer to you.",
      sayItEs: "Ejemplo: «You are the new director of operations. All four offices answer to you.»",
      sayItAskEn: "What job would you love to have? What would you do every day?",
      sayItAskEs: "¿Qué trabajo te encantaría tener? ¿Qué harías todos los días?",
      sayItCheck: {
        target: "I would love to be *",
        altTargets: ["I would like to work as *", "Every day, I would *", "My dream job is *"],
      },
    },
    {
      id: "q3",
      afterScene: "s8",
      questionEn: "Who is Vale thinking about for office four?",
      questionEs: "¿En quién está pensando Vale para la oficina cuatro?",
      options: [
        { label: "Bryan — the competition, because he plays fair", emoji: "🤝" },
        { label: "Don Tito", emoji: "🫓" },
        { label: "The plant", emoji: "🪴" },
      ],
      answer: 0,
      sayIt: "He told me the truth when it was bad for him. I am going to offer him office four.",
      sayItEs: "Ejemplo: «He told me the truth when it was bad for him. I am going to offer him office four.»",
      sayItAskEn: "Would you work with a former competitor? Why or why not?",
      sayItAskEs: "¿Trabajarías con un ex competidor? ¿Por qué sí o por qué no?",
      sayItCheck: {
        target: "I would * because *",
        altTargets: ["Yes, because *", "No, because I would *", "I wouldn't * because *"],
      },
    },
  ],
  mindsetCard: {
    afterScene: "s4",
    phrase: "I trust evidence, not calendars. I can do it, even if I am new.",
    es: "Confío en la evidencia, no en los calendarios. Puedo hacerlo, aunque sea nuevo.",
  },
  habitCard: {
    afterScene: "s9",
    phrase: "English is easy. I say my opinion, my vote, and my reason — in one sentence.",
    es: "El inglés es fácil. Digo mi opinión, mi voto y mi razón — en una oración.",
    model: "camila",
    modelActionEs: "Camila votó con una razón clara: «He plays fair. I have watched him all year.»",
  },
  continuePrompt: {
    en: "You are the director of your own dream. Who would you hire first, and why?",
    es: "Eres el director de tu propio sueño. ¿A quién contratarías primero y por qué?",
  },
  continueWith: ["I would hire ...", "because they have ...", "Together, we would ..."],
  cliffhanger: {
    en: "Episode 20: The strangest call of Vale's career — and the season finale.",
    es: "Episodio 20: La llamada más extraña de la carrera de Vale — y el final de temporada.",
  },
};
