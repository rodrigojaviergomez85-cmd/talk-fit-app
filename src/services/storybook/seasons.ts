/**
 * Season map for "El mundo de Vale".
 * A season = a curriculum module. An episode = one day inside that module.
 * Unlocking is derived from the existing journey progress: no new tables.
 */
import type { JourneyState } from "@/lib/types";
import { hasUnlimitedAccess } from "@/lib/unlimited-access";
import { JourneyService } from "@/services/journey-service";
import { isModuleId } from "@/services/course-service";

import season1Cover from "@/assets/storybook/vale-ep1/cover.jpg";
import season2Cover from "@/assets/storybook/vale-s2-ep1/cover.jpg";
import season3Cover from "@/assets/storybook/vale-s3-ep1/cover.jpg";
import season4Cover from "@/assets/storybook/vale-s4-ep1/cover.jpg";
import season5Cover from "@/assets/storybook/vale-s5-first-students/cover.jpg";
import season6Cover from "@/assets/storybook/eagles-ep1-the-offer/cover.jpg";
import season7Cover from "@/assets/storybook/tigers-ep1-a-decision-i-made/cover.jpg";
import season8Cover from "@/assets/storybook/sharks-ep1-tell-the-story/cover.jpg";
import season9Cover from "@/assets/storybook/advanced1-ep1-rules-of-the-game/cover.jpg";

export type SeasonWeek = 1 | 2 | 3 | 4;

export type SeasonEpisodeSlot = {
  /** Day of the module this episode belongs to (1-based). */
  day: number;
  /** Episode id once produced; null while the episode is still in production. */
  episodeId: string | null;
  /** Shown while the slot has no episode yet. */
  teaser: { en: string; es: string };
};

export type NextEpisodeInfo = {
  /** Next produced episode id, or null when the slot is still in production. */
  episodeId: string | null;
  /** Day of the module that unlocks the next slot. */
  day: number;
  /** Preview text for the coming episode. */
  teaser: { en: string; es: string };
  /** Whether the learner can open it now. */
  unlocked: boolean;
};

export type Season = {
  moduleId: string;
  seasonNumber: number;
  title: { en: string; es: string };
  /** One-line pitch shown on the collapsed season card. */
  blurb: { en: string; es: string };
  /** Representative cover image (episode 1 art). */
  image: string;
  imageAlt: { en: string; es: string };
  slots: SeasonEpisodeSlot[];
};

export const STORYBOOK_SEASONS: Season[] = [
  {
    moduleId: "basic-zero",
    seasonNumber: 1,
    title: { en: "Season 1 · Vale's world", es: "Temporada 1 · El mundo de Vale" },
    blurb: {
      en: "Vale's first job: names, favorite things and new friends.",
      es: "El primer empleo de Vale: nombres, cosas favoritas y nuevos amigos.",
    },
    image: season1Cover,
    imageAlt: { en: "Vale on her first day at work", es: "Vale en su primer día de trabajo" },
    slots: [
      { day: 1, episodeId: "vale-first-day", teaser: { en: "Vale's first day", es: "El primer día de Vale" } },
      { day: 2, episodeId: "vale-first-call", teaser: { en: "The first call", es: "La primera llamada" } },
      { day: 3, episodeId: "vale-who-is-he", teaser: { en: "Who is he?", es: "¿Quién es él?" } },
      { day: 4, episodeId: "vale-who-is-d", teaser: { en: "Who is D?", es: "¿Quién es D?" } },
      { day: 5, episodeId: "vale-support-team", teaser: { en: "The support team", es: "El equipo de soporte" } },
      { day: 6, episodeId: "vale-where-are-you-from", teaser: { en: "Where are you from?", es: "¿De dónde eres?" } },
      { day: 7, episodeId: "vale-favorite-color", teaser: { en: "My favorite color", es: "Mi color favorito" } },
      { day: 8, episodeId: "vale-favorite-food", teaser: { en: "My favorite food", es: "Mi comida favorita" } },
      { day: 9, episodeId: "vale-hobbies", teaser: { en: "My hobbies", es: "Mis pasatiempos" } },
      { day: 10, episodeId: "vale-complete-introduction", teaser: { en: "Tell me about yourself", es: "Háblame de ti" } },
      { day: 11, episodeId: "vale-meet-luis", teaser: { en: "Meet my brother", es: "Conoce a mi hermano" } },
      { day: 12, episodeId: "vale-best-friend", teaser: { en: "My best friend", es: "Mi mejor amiga" } },
      { day: 13, episodeId: "vale-new-supervisor", teaser: { en: "Who is the new supervisor?", es: "¿Quién es la nueva supervisora?" } },
      { day: 14, episodeId: "vale-dylan-needs-help", teaser: { en: "Dylan needs help", es: "Dylan necesita ayuda" } },
      { day: 15, episodeId: "vale-we-are-a-team", teaser: { en: "We are a team", es: "Somos un equipo" } },
      { day: 16, episodeId: "vale-luis-big-day", teaser: { en: "Luis's big day", es: "El gran día de Luis" } },
      { day: 17, episodeId: "vale-good-news", teaser: { en: "Good news!", es: "¡Buenas noticias!" } },
      { day: 18, episodeId: "vale-first-month", teaser: { en: "My first month", es: "Mi primer mes" } },
      { day: 19, episodeId: "vale-celebration", teaser: { en: "The celebration", es: "La celebración" } },
      { day: 20, episodeId: "vale-graduation", teaser: { en: "Graduation day", es: "El día de graduación" } },
    ],
  },
  {
    moduleId: "simple-future",
    seasonNumber: 2,
    title: { en: "Season 2 · Vale's new challenge", es: "Temporada 2 · El nuevo reto de Vale" },
    blurb: {
      en: "New dreams and plans: Vale talks about the future.",
      es: "Nuevos sueños y planes: Vale habla del futuro.",
    },
    image: season2Cover,
    imageAlt: { en: "Vale ready for her new challenge", es: "Vale lista para su nuevo reto" },
    slots: [
      { day: 1, episodeId: "vale-s2-ready", teaser: { en: "She is ready", es: "Ella está lista" } },
      { day: 2, episodeId: "vale-s2-tomorrow", teaser: { en: "Tomorrow starts now", es: "Mañana empieza ahora" } },
      { day: 3, episodeId: "vale-s2-weekend", teaser: { en: "The weekend plan", es: "El plan del fin de semana" } },
      { day: 4, episodeId: "vale-s2-bigger-dream", teaser: { en: "A bigger dream", es: "Un sueño más grande" } },
      { day: 5, episodeId: "vale-s2-my-voice", teaser: { en: "My plan, my voice", es: "Mi plan, mi voz" } },
      { day: 6, episodeId: "vale-s2-mateo-weekend", teaser: { en: "Mateo's big weekend", es: "El gran fin de semana de Mateo" } },
      { day: 7, episodeId: "vale-s2-his-mom", teaser: { en: "What is his mom going to do?", es: "¿Qué va a hacer su mamá?" } },
      { day: 8, episodeId: "vale-s2-busiest", teaser: { en: "The busiest person", es: "La persona más ocupada" } },
      { day: 9, episodeId: "vale-s2-two-plans", teaser: { en: "Two different plans", es: "Dos planes diferentes" } },
      { day: 10, episodeId: "vale-s2-their-plans", teaser: { en: "Their plans challenge", es: "El reto de sus planes" } },
      { day: 11, episodeId: "vale-s2-instant-decision", teaser: { en: "An instant decision", es: "Una decisión instantánea" } },
      { day: 12, episodeId: "vale-s2-promise", teaser: { en: "A promise", es: "Una promesa" } },
      { day: 13, episodeId: "vale-s2-prediction", teaser: { en: "A prediction", es: "Una predicción" } },
      { day: 14, episodeId: "vale-s2-their-future", teaser: { en: "Their future", es: "Su futuro" } },
      { day: 15, episodeId: "vale-s2-will-challenge", teaser: { en: "Will challenge", es: "El reto del will" } },
      { day: 16, episodeId: "vale-s2-plan-vs-decision", teaser: { en: "Plan vs decision", es: "Plan vs decisión" } },
      { day: 17, episodeId: "vale-s2-weekend-changes", teaser: { en: "Weekend changes", es: "Cambios de fin de semana" } },
      { day: 18, episodeId: "vale-s2-camila-future", teaser: { en: "Camila's future", es: "El futuro de Camila" } },
      { day: 19, episodeId: "vale-s2-visible-predictions", teaser: { en: "Visible predictions", es: "Predicciones visibles" } },
      { day: 20, episodeId: "vale-s2-final-fluency", teaser: { en: "Final future fluency", es: "Fluidez futura final" } },
    ],
  },
  {
    moduleId: "simple-present",
    seasonNumber: 3,
    title: { en: "Season 3 · Vale's new routine", es: "Temporada 3 · La nueva rutina de Vale" },
    blurb: {
      en: "Daily routines, teamwork and simple-present questions.",
      es: "Rutinas diarias, trabajo en equipo y preguntas en presente simple.",
    },
    image: season3Cover,
    imageAlt: { en: "Vale starts her new daily routine", es: "Vale empieza su nueva rutina diaria" },
    slots: [
      { day: 1, episodeId: "vale-s3-new-schedule", teaser: { en: "Vale's new schedule", es: "El nuevo horario de Vale" } },
      { day: 2, episodeId: "vale-s3-kats-routine", teaser: { en: "Kat's routine", es: "La rutina de Kat" } },
      { day: 3, episodeId: "vale-s3-team-rules", teaser: { en: "Team rules", es: "Reglas del equipo" } },
      { day: 4, episodeId: "vale-s3-angry-customer", teaser: { en: "The angry customer", es: "El cliente enojado" } },
      { day: 5, episodeId: "vale-s3-team-challenge", teaser: { en: "The team routine challenge", es: "El reto de la rutina del equipo" } },
      { day: 6, episodeId: "vale-s3-moms-routine", teaser: { en: "My mom's routine", es: "La rutina de mi mamá" } },
      { day: 7, episodeId: "vale-s3-mateo-trains", teaser: { en: "Mateo trains", es: "Mateo entrena" } },
      { day: 8, episodeId: "vale-s3-neighborhood-hero", teaser: { en: "The neighborhood hero", es: "El héroe del barrio" } },
      { day: 9, episodeId: "vale-s3-ana-rehearses", teaser: { en: "Ana rehearses", es: "Ana ensaya" } },
      { day: 10, episodeId: "vale-s3-routine-challenge", teaser: { en: "The routine challenge", es: "El reto de rutinas" } },
      { day: 11, episodeId: "vale-s3-new-app", teaser: { en: "The new app", es: "La app nueva" } },
      { day: 12, episodeId: "vale-s3-pizza-day", teaser: { en: "Pizza day", es: "El día de la pizza" } },
      { day: 13, episodeId: "vale-s3-order-food", teaser: { en: "The delivery problem", es: "El problema del delivery" } },
      { day: 14, episodeId: "vale-s3-mateos-sandwich", teaser: { en: "Mateo's sandwich", es: "El sándwich de Mateo" } },
      { day: 15, episodeId: "vale-s3-process-challenge", teaser: { en: "The process challenge", es: "El reto de procesos" } },
      { day: 16, episodeId: "vale-s3-free-saturday", teaser: { en: "A free Saturday", es: "Un sábado libre" } },
      { day: 17, episodeId: "vale-s3-beach-day", teaser: { en: "The beach day", es: "El día de playa" } },
      { day: 18, episodeId: "vale-s3-office-now", teaser: { en: "Right now at the office", es: "Ahora mismo en la oficina" } },
      { day: 19, episodeId: "vale-s3-home-tonight", teaser: { en: "At home tonight", es: "En casa esta noche" } },
      { day: 20, episodeId: "vale-s3-first-class", teaser: { en: "Vale's first class", es: "La primera clase de Vale" } },
    ],
  },
  {
    moduleId: "past-stories",
    seasonNumber: 4,
    title: { en: "Season 4 · How it all started", es: "Temporada 4 · Cómo empezó todo" },
    blurb: {
      en: "Vale, now a Saturday teacher, tells her story in the simple past.",
      es: "Vale, ya maestra de sábados, cuenta su historia en pasado simple.",
    },
    image: season4Cover,
    imageAlt: { en: "Vale tells Camila how everything started", es: "Vale le cuenta a Camila cómo empezó todo" },
    slots: [
      { day: 1, episodeId: "vale-s4-yesterday-morning", teaser: { en: "Yesterday morning", es: "La mañana de ayer" } },
      { day: 2, episodeId: "vale-s4-work-yesterday", teaser: { en: "At work yesterday", es: "En el trabajo ayer" } },
      { day: 3, episodeId: "vale-s4-after-work", teaser: { en: "After work", es: "Después del trabajo" } },
      { day: 4, episodeId: "vale-s4-how-was-your-day", teaser: { en: "How was your day?", es: "¿Cómo estuvo tu día?" } },
      { day: 5, episodeId: "vale-s4-yesterday-challenge", teaser: { en: "The yesterday challenge", es: "El reto de ayer" } },
      { day: 6, episodeId: "vale-s4-first-saturday", teaser: { en: "First Saturday class", es: "La primera clase de sábado" } },
      { day: 7, episodeId: "vale-s4-kats-day-off", teaser: { en: "Kat's day off", es: "El día libre de Kat" } },
      { day: 8, episodeId: "vale-s4-mateo-forgot", teaser: { en: "Mateo didn't call", es: "Mateo no llamó" } },
      { day: 9, episodeId: "vale-s4-luis-questions", teaser: { en: "Twenty questions for Luis", es: "Veinte preguntas para Luis" } },
      { day: 10, episodeId: "vale-s4-week2-challenge", teaser: { en: "The Week 2 challenge", es: "El reto de la Semana 2" } },
      { day: 11, episodeId: "vale-s4-what-was-happening", teaser: { en: "What was happening?", es: "¿Qué estaba pasando?" } },
      { day: 12, episodeId: "vale-s4-eight-last-night", teaser: { en: "At eight last night", es: "A las ocho anoche" } },
      { day: 13, episodeId: "vale-s4-while-teaching", teaser: { en: "While Vale was teaching", es: "Mientras Vale enseñaba" } },
      { day: 14, episodeId: "vale-s4-interrupted-plan", teaser: { en: "The interrupted plan", es: "El plan interrumpido" } },
      { day: 15, episodeId: "vale-s4-progressive-challenge", teaser: { en: "Past progressive challenge", es: "El reto del pasado progresivo" } },
      { day: 16, episodeId: "vale-s4-once-upon-a-time", teaser: { en: "Once upon a time", es: "Érase una vez" } },
      { day: 17, episodeId: "vale-s4-forest-wolf", teaser: { en: "The forest and the wolf", es: "El bosque y el lobo" } },
      { day: 18, episodeId: "vale-s4-red-riding-hood", teaser: { en: "Little Red Riding Hood", es: "Caperucita Roja" } },
      { day: 19, episodeId: "vale-s4-vale-story", teaser: { en: "Vale tells her story", es: "Vale cuenta su historia" } },
      { day: 20, episodeId: "vale-s4-storyteller", teaser: { en: "The storyteller", es: "La narradora" } },
    ],
  },
  {
    moduleId: "mixed-tenses",
    seasonNumber: 5,
    title: { en: "Season 5 · Vale's school", es: "Temporada 5 · La escuela de Vale" },
    blurb: {
      en: "Vale runs her English school and builds the habits that keep her strong.",
      es: "Vale dirige su escuela de inglés y construye los hábitos que la mantienen fuerte.",
    },
    image: season5Cover,
    imageAlt: { en: "Vale runs her English school", es: "Vale dirige su escuela de inglés" },
    slots: [
      { day: 1, episodeId: "vale-s5-first-students", teaser: { en: "The first students", es: "Los primeros estudiantes" } },
      { day: 2, episodeId: "vale-s5-tired-teacher", teaser: { en: "A tired teacher", es: "Una maestra cansada" } },
      { day: 3, episodeId: "vale-s5-early-morning", teaser: { en: "The early morning", es: "La mañana temprana" } },
      { day: 4, episodeId: "vale-s5-win-tomorrow", teaser: { en: "Win tomorrow", es: "Ganar mañana" } },
      { day: 5, episodeId: "vale-s5-healthy-snacks", teaser: { en: "Healthy snacks", es: "Snacks saludables" } },
      { day: 6, episodeId: "vale-s5-mateo-runs", teaser: { en: "Mateo runs every morning", es: "Mateo corre cada mañana" } },
      { day: 7, episodeId: "vale-s5-water-bottle", teaser: { en: "The water bottle", es: "La botella de agua" } },
      { day: 8, episodeId: "vale-s5-sleepy-student", teaser: { en: "The sleepy student", es: "El estudiante dormido" } },
      { day: 9, episodeId: "vale-s5-real-lunch", teaser: { en: "A real lunch", es: "Un almuerzo de verdad" } },
      { day: 10, episodeId: "vale-s5-mentor-book", teaser: { en: "The mentor's book", es: "El libro del mentor" } },
      { day: 11, episodeId: "vale-s5-ai-helper", teaser: { en: "The AI helper", es: "La ayuda de la IA" } },
      { day: 12, episodeId: "vale-s5-missing-student", teaser: { en: "The missing student", es: "La estudiante que faltó" } },
      { day: 13, episodeId: "vale-s5-five-quiet-minutes", teaser: { en: "Five quiet minutes", es: "Cinco minutos de silencio" } },
      { day: 14, episodeId: "vale-s5-hard-month", teaser: { en: "The hard month", es: "El mes difícil" } },
      { day: 15, episodeId: "vale-s5-knock-on-the-door", teaser: { en: "A knock on the door", es: "Un toque en la puerta" } },
      { day: 16, episodeId: "vale-s5-danis-interview", teaser: { en: "Dani's interview", es: "La entrevista de Dani" } },
      { day: 17, episodeId: "vale-s5-try-again", teaser: { en: "Try again", es: "Intenta otra vez" } },
      { day: 18, episodeId: "vale-s5-first-employee", teaser: { en: "The first employee", es: "La primera empleada" } },
      { day: 19, episodeId: "vale-s5-the-company-call", teaser: { en: "The company call", es: "La llamada de la empresa" } },
      { day: 20, episodeId: "vale-s5-the-promise", teaser: { en: "The promise", es: "La promesa" } },
    ],

  },
  {
    moduleId: "eagles-week-1",
    seasonNumber: 6,
    title: { en: "Season 6 · Eagles", es: "Temporada 6 · Eagles" },
    blurb: {
      en: "Real conversations: Vale's school goes after its first international contract.",
      es: "Conversaciones reales: la escuela de Vale va por su primer contrato internacional.",
    },
    image: season6Cover,
    imageAlt: { en: "Vale takes a call from a US company", es: "Vale atiende la llamada de una empresa de Estados Unidos" },
    slots: [
      { day: 1, episodeId: "eagles-ep1-the-offer", teaser: { en: "The offer", es: "La oferta" } },
      { day: 2, episodeId: "eagles-ep2-the-proposal", teaser: { en: "The proposal", es: "La propuesta" } },
      { day: 3, episodeId: "eagles-ep3-the-competitor", teaser: { en: "The competitor", es: "El competidor" } },
      { day: 4, episodeId: "eagles-ep4-the-objection", teaser: { en: "The objection", es: "La objeción" } },
      { day: 5, episodeId: "eagles-ep5-what-would-you-do", teaser: { en: "What would you do?", es: "¿Qué harías tú?" } },
      { day: 6, episodeId: "eagles-ep6-then-and-now", teaser: { en: "Then & now", es: "Antes y ahora" } },
      { day: 7, episodeId: "eagles-ep7-have-you-ever", teaser: { en: "Have you ever?", es: "¿Alguna vez?" } },
      { day: 8, episodeId: "eagles-ep8-how-long", teaser: { en: "Weeks of effort", es: "Semanas de esfuerzo" } },
      { day: 9, episodeId: "eagles-ep9-the-complaint", teaser: { en: "The complaint", es: "El reclamo" } },
      { day: 10, episodeId: "eagles-ep10-two-hours", teaser: { en: "A new problem", es: "Un problema nuevo" } },
      { day: 11, episodeId: "eagles-ep11-i-used-to", teaser: { en: "I used to work there", es: "Yo trabajaba ahí" } },
      { day: 12, episodeId: "eagles-ep12-which-is-better", teaser: { en: "Which schedule is better?", es: "¿Cuál horario es mejor?" } },
      { day: 13, episodeId: "eagles-ep13-online-or-in-person", teaser: { en: "Online or in person", es: "En línea o presencial" } },
      { day: 14, episodeId: "eagles-ep14-the-best-plan", teaser: { en: "The best plan", es: "El mejor plan" } },
      { day: 15, episodeId: "eagles-ep15-a-great-teacher", teaser: { en: "A great teacher", es: "Una gran maestra" } },
      { day: 16, episodeId: "eagles-ep16-another-country", teaser: { en: "Another country", es: "Otro país" } },
      { day: 17, episodeId: "eagles-ep17-so-far-so-good", teaser: { en: "So far, so good", es: "Hasta ahora, bien" } },
      { day: 18, episodeId: "eagles-ep18-danis-long-road", teaser: { en: "Dani's long road", es: "El largo camino de Dani" } },
      { day: 19, episodeId: "eagles-ep19-the-angry-director", teaser: { en: "The angry director", es: "El director molesto" } },
      { day: 20, episodeId: "eagles-ep20-the-contract", teaser: { en: "The contract", es: "El contrato" } },
    ],
  },
  {
    moduleId: "tigers",
    seasonNumber: 7,
    title: { en: "Season 7 · Tigers", es: "Temporada 7 · Tigers" },
    blurb: {
      en: "The competitor: BigTalk tries to buy Vale's school — and loses more than a contract.",
      es: "El competidor: BigTalk intenta comprar la escuela de Vale — y pierde más que un contrato.",
    },
    image: season7Cover,
    imageAlt: { en: "Vale's school faces the BigTalk chain across the street", es: "La escuela de Vale enfrenta a la cadena BigTalk al otro lado de la calle" },
    slots: [
      { day: 1, episodeId: "tigers-ep1-a-decision-i-made", teaser: { en: "A decision I made", es: "Una decisión que tomé" } },
      { day: 2, episodeId: "tigers-ep2-what-could-happen", teaser: { en: "What could happen?", es: "¿Qué podría pasar?" } },
      { day: 3, episodeId: "tigers-ep3-give-advice", teaser: { en: "Give advice", es: "Da un consejo" } },
      { day: 4, episodeId: "tigers-ep4-what-needs-to-change", teaser: { en: "What needs to change", es: "Lo que tiene que cambiar" } },
      { day: 5, episodeId: "tigers-ep5-what-would-you-do", teaser: { en: "What would you do?", es: "¿Qué harías tú?" } },
      { day: 6, episodeId: "tigers-ep6-then-vs-now", teaser: { en: "Then vs. now", es: "Antes vs. ahora" } },
      { day: 7, episodeId: "tigers-ep7-your-experience", teaser: { en: "Your experience", es: "Tu experiencia" } },
      { day: 8, episodeId: "tigers-ep8-working-on", teaser: { en: "What we've been working on", es: "En qué hemos estado trabajando" } },
      { day: 9, episodeId: "tigers-ep9-why-are-you-ready", teaser: { en: "Why are you ready?", es: "¿Por qué estás lista?" } },
      { day: 10, episodeId: "tigers-ep10-interview-challenge", teaser: { en: "Job interview challenge", es: "El reto de la entrevista" } },
      { day: 11, episodeId: "tigers-ep11-the-old-days", teaser: { en: "The old days", es: "Los viejos tiempos" } },
      { day: 12, episodeId: "tigers-ep12-smaller-but-better", teaser: { en: "Smaller, but better", es: "Más pequeña, pero mejor" } },
      { day: 13, episodeId: "tigers-ep13-the-best-of-the-city", teaser: { en: "The best in the city", es: "La mejor de la ciudad" } },
      { day: 14, episodeId: "tigers-ep14-the-phone-never-stops", teaser: { en: "The phone never stops", es: "El teléfono no para" } },
      { day: 15, episodeId: "tigers-ep15-last-offer", teaser: { en: "The last offer", es: "La última oferta" } },
      { day: 16, episodeId: "tigers-ep16-what-we-have-achieved", teaser: { en: "What we have achieved", es: "Lo que hemos logrado" } },
      { day: 17, episodeId: "tigers-ep17-the-visit", teaser: { en: "The visit", es: "La visita" } },
      { day: 18, episodeId: "tigers-ep18-the-vote", teaser: { en: "The vote", es: "El voto" } },
      { day: 19, episodeId: "tigers-ep19-new-leaders", teaser: { en: "New leaders", es: "Nuevos líderes" } },
      { day: 20, episodeId: "tigers-ep20-defend-your-decision", teaser: { en: "Defend your decision", es: "Defiende tu decisión" } },
    ],
  },
  {
    moduleId: "sharks",
    seasonNumber: 8,
    title: { en: "Season 8 · Sharks", es: "Temporada 8 · Sharks" },
    blurb: {
      en: "International waters: dollar contracts, hard negotiators and a school that crosses borders.",
      es: "Aguas internacionales: contratos en dólares, negociadores duros y una escuela que cruza fronteras.",
    },
    image: season8Cover,
    imageAlt: { en: "Vale on a video call with an American executive", es: "Vale en una videollamada con un ejecutivo estadounidense" },
    slots: [
      { day: 1, episodeId: "sharks-ep1-tell-the-story", teaser: { en: "Tell the story", es: "Cuenta la historia" } },
      { day: 2, episodeId: "sharks-ep2-guatemala-seven-am", teaser: { en: "Guatemala, seven a.m.", es: "Guatemala, siete de la mañana" } },
      { day: 3, episodeId: "sharks-ep3-first-dollar-contract", teaser: { en: "The first dollar contract", es: "El primer contrato en dólares" } },
      { day: 4, episodeId: "sharks-ep4-three-offices-one-team", teaser: { en: "Three offices, one team", es: "Tres oficinas, un equipo" } },
      { day: 5, episodeId: "sharks-ep5-counter-offer", teaser: { en: "The counter-offer", es: "La contraoferta" } },
      { day: 6, episodeId: "sharks-ep6-hiring-across-borders", teaser: { en: "Hiring across borders", es: "Contratar en otro país" } },
      { day: 7, episodeId: "sharks-ep7-quality-at-scale", teaser: { en: "Quality at scale", es: "Calidad a gran escala" } },
      { day: 8, episodeId: "sharks-ep8-vale-kids", teaser: { en: "Vale Kids", es: "Vale Kids" } },
      { day: 9, episodeId: "sharks-ep9-mexico-call", teaser: { en: "The Mexico call", es: "La llamada de México" } },
      { day: 10, episodeId: "sharks-ep10-partner-or-rival", teaser: { en: "A partner or a rival", es: "Socio o rival" } },
      { day: 11, episodeId: "sharks-ep11-what-went-wrong", teaser: { en: "What went wrong", es: "Qué salió mal" } },
      { day: 12, episodeId: "sharks-ep12-say-it-in-numbers", teaser: { en: "Say it in numbers", es: "Dilo en números" } },
      { day: 13, episodeId: "sharks-ep13-the-hard-negotiation", teaser: { en: "The hard negotiation", es: "La negociación dura" } },
      { day: 14, episodeId: "sharks-ep14-losing-a-client", teaser: { en: "Losing a client", es: "Perder un cliente" } },
      { day: 15, episodeId: "sharks-ep15-winning-it-back", teaser: { en: "Winning it back", es: "Recuperarlo" } },
      { day: 16, episodeId: "sharks-ep16-a-team-in-three-countries", teaser: { en: "A team in three countries", es: "Un equipo en tres países" } },
      { day: 17, episodeId: "sharks-ep17-the-investor", teaser: { en: "The investor", es: "El inversionista" } },
      { day: 18, episodeId: "sharks-ep18-say-no-with-respect", teaser: { en: "Say no with respect", es: "Decir no con respeto" } },
      { day: 19, episodeId: "sharks-ep19-the-regional-deal", teaser: { en: "The regional deal", es: "El acuerdo regional" } },
      { day: 20, episodeId: "sharks-ep20-sharks-close-deals", teaser: { en: "Sharks close deals", es: "Los tiburones cierran tratos" } },
    ],
  },
  {
    moduleId: "advanced-1",
    seasonNumber: 9,
    title: { en: "Season 9 · Advanced 1", es: "Temporada 9 · Advanced 1" },
    blurb: {
      en: "Get hired: real conversations, professional introductions and the biggest decision of the academy.",
      es: "Get hired: conversaciones reales, presentaciones profesionales y la decisión más grande de la academia.",
    },
    image: season9Cover,
    imageAlt: { en: "Vale in her warm academy office in the morning", es: "Vale en su cálida oficina de la academia por la mañana" },
    slots: [
      { day: 1, episodeId: "advanced1-ep1-rules-of-the-game", teaser: { en: "The rules of the game", es: "Las reglas del juego" } },
      { day: 2, episodeId: "advanced1-ep2-the-night-northline-almost-left", teaser: { en: "The night Northline almost left", es: "La noche que Northline casi se va" } },
      { day: 3, episodeId: "advanced1-ep3-why-us", teaser: { en: "Why us?", es: "¿Por qué nosotros?" } },
      { day: 4, episodeId: "advanced1-ep4-my-honest-weakness", teaser: { en: "My honest weakness", es: "Mi debilidad honesta" } },
      { day: 5, episodeId: "advanced1-ep5-pressure-round", teaser: { en: "Pressure round", es: "Ronda de presión" } },
      { day: 6, episodeId: "advanced1-ep6-a-heartbeat-for-the-proposal", teaser: { en: "A heartbeat for the proposal", es: "Un latido para la propuesta" } },
      { day: 7, episodeId: "advanced1-ep7-the-numbers-do-not-lie", teaser: { en: "The numbers do not lie", es: "Los números no mienten" } },
      { day: 8, episodeId: "advanced1-ep8-two-right-answers", teaser: { en: "Two right answers", es: "Dos respuestas correctas" } },
      { day: 9, episodeId: "advanced1-ep9-in-their-own-words", teaser: { en: "In their own words", es: "En sus propias palabras" } },
      { day: 10, episodeId: "advanced1-ep10-the-behavioural-round", teaser: { en: "The behavioural round", es: "La ronda conductual" } },
      { day: 11, episodeId: "advanced1-ep11-why-i-left", teaser: { en: "Why I left", es: "Por qué me fui" } },
      { day: 12, episodeId: "advanced1-ep12-the-course-i-closed", teaser: { en: "The course I closed", es: "El curso que cerré" } },
      { day: 13, episodeId: "advanced1-ep13-why-here", teaser: { en: "Why here", es: "Por qué aquí" } },
      { day: 14, episodeId: "advanced1-ep14-the-hour-about-money", teaser: { en: "The hour about money", es: "La hora del dinero" } },
      { day: 15, episodeId: "advanced1-ep15-the-room-that-interrupts", teaser: { en: "The room that interrupts", es: "La sala que interrumpe" } },
      { day: 16, episodeId: "advanced1-ep16-the-ninety-days", teaser: { en: "The ninety days", es: "Los noventa días" } },
      { day: 17, episodeId: "advanced1-ep17-show-me-dont-tell-me", teaser: { en: "The ten-million yes", es: "El sí de diez millones" } },
      { day: 18, episodeId: "advanced1-ep18-the-question-nobody-prepares-for", teaser: { en: "First day as director", es: "Primer día como director" } },
      { day: 19, episodeId: "advanced1-ep19-now-you-ask", teaser: { en: "The room chooses Dani", es: "El salón elige a Dani" } },
      { day: 20, episodeId: "advanced1-ep20-the-last-room", teaser: { en: "CEO of two worlds", es: "CEO de dos mundos" } },
    ],
  },
];

export function getSeason(moduleId: string): Season | undefined {
  return STORYBOOK_SEASONS.find((season) => season.moduleId === moduleId);
}

/** Find the module/day an episode belongs to (for "back to the day" navigation). */
export function getEpisodeSlot(episodeId: string): { moduleId: string; day: number } | null {
  for (const season of STORYBOOK_SEASONS) {
    const slot = season.slots.find((s) => s.episodeId === episodeId);
    if (slot) return { moduleId: season.moduleId, day: slot.day };
  }
  return null;
}

/** Days of a module the learner already completed. */
export function completedDaysInModule(state: JourneyState, moduleId: string): number {
  const prefix = `${moduleId}:`;
  return Object.keys(state.days).filter((key) => key.startsWith(prefix)).length;
}

/**
 * Highest story day the learner can open.
 * Day 1 is always open; each completed module day opens the next episode.
 */
export function unlockedDay(completedDays: number): number {
  return Math.max(0, completedDays) + 1;
}

/**
 * How many already-seen episodes stay open for review behind the current one.
 * The learner sees today's episode plus this many older ones; anything older
 * closes again so the story stays tied to the official route.
 */
export const EPISODE_LOOKBACK = 3;

/** Episodes in every season before this one (global episode numbering). */
function seasonOffset(moduleId: string): number | null {
  let offset = 0;
  for (const season of STORYBOOK_SEASONS) {
    if (season.moduleId === moduleId) return offset;
    offset += season.slots.length;
  }
  return null;
}

/** Position of one episode in the whole route, 1-based. */
function globalEpisodeIndex(moduleId: string, day: number): number | null {
  const offset = seasonOffset(moduleId);
  return offset === null ? null : offset + day;
}

/** Highest episode position the learner has reached across every season. */
export function currentEpisodeIndex(state: JourneyState): number {
  let top = 1;
  const active = JourneyService.currentModule(state);
  for (const season of STORYBOOK_SEASONS) {
    if (!isModuleId(season.moduleId)) continue;
    if (!JourneyService.isModuleUnlocked(state, season.moduleId)) continue;
    const started = completedDaysInModule(state, season.moduleId) > 0 || season.moduleId === active;
    if (!started && !JourneyService.moduleComplete(state, season.moduleId)) continue;
    const offset = seasonOffset(season.moduleId) ?? 0;
    const reached = JourneyService.moduleComplete(state, season.moduleId)
      ? season.slots.length
      : Math.min(
          season.slots.length,
          Math.max(
            JourneyService.currentDay(state, season.moduleId),
            unlockedDay(completedDaysInModule(state, season.moduleId)),
          ),
        );
    top = Math.max(top, offset + reached);
  }
  return top;
}

/**
 * Open-catalogue policy: every published season of "El mundo de Vale" is
 * available to every learner, whatever their level or route progress.
 */
export function isSeasonUnlocked(_state: JourneyState, moduleId: string): boolean {
  return isModuleId(moduleId);
}

/** Every episode day of the season is open. */
export function unlockedDayInModule(_state: JourneyState, moduleId: string): number {
  if (!isModuleId(moduleId)) return 0;
  const season = getSeason(moduleId);
  return season?.slots.length ?? 0;
}

/** Nothing closes behind the learner: review always starts at day 1. */
export function earliestUnlockedDayInModule(_state: JourneyState, _moduleId: string): number {
  return 1;
}

export function isDayUnlocked(_state: JourneyState, moduleId: string, day: number): boolean {
  if (!isModuleId(moduleId)) return false;
  const season = getSeason(moduleId);
  if (!season) return false;
  return season.slots.some((slot) => slot.day === day);
}


/** Week the learner has reached (kept for language-scope checks). */
export function unlockedWeek(completedDays: number): SeasonWeek {
  const week = Math.floor(Math.max(0, completedDays) / 5) + 1;
  return (week > 4 ? 4 : week) as SeasonWeek;
}

/** The slot that follows the current episode, including unlock status. */
export function getNextEpisodeSlot(currentEpisodeId: string, state: JourneyState): NextEpisodeInfo | null {
  const seasonIdx = STORYBOOK_SEASONS.findIndex((s) => s.slots.some((slot) => slot.episodeId === currentEpisodeId));
  if (seasonIdx < 0) return null;
  const season = STORYBOOK_SEASONS[seasonIdx]!;
  const idx = season.slots.findIndex((slot) => slot.episodeId === currentEpisodeId);
  if (idx < 0) return null;

  if (idx < season.slots.length - 1) {
    const next = season.slots[idx + 1]!;
    return {
      episodeId: next.episodeId,
      day: next.day,
      teaser: next.teaser,
      unlocked: isDayUnlocked(state, season.moduleId, next.day),
    };
  }

  const nextSeason = STORYBOOK_SEASONS[seasonIdx + 1];
  if (!nextSeason) return null;
  const first = nextSeason.slots[0]!;
  return {
    episodeId: first.episodeId,
    day: first.day,
    teaser: first.teaser,
    unlocked: isDayUnlocked(state, nextSeason.moduleId, first.day),
  };
}

/**
 * Every produced episode id, in story order (season 1 → last season).
 * Slots still in production are skipped, so newly published episodes join
 * the list automatically.
 */
export function getProducedEpisodeIds(): string[] {
  const flat: string[] = [];
  for (const season of STORYBOOK_SEASONS) {
    for (const slot of season.slots) {
      if (slot.episodeId) flat.push(slot.episodeId);
    }
  }
  return flat;
}

/**
 * Next produced episode after this one, crossing into the following season
 * when needed. Slots still in production are skipped. Open catalogue: no
 * journey state is needed.
 */
export function getNextProducedEpisodeId(currentEpisodeId: string): string | null {
  const flat = getProducedEpisodeIds();
  const idx = flat.indexOf(currentEpisodeId);
  if (idx < 0) return null;
  return flat[idx + 1] ?? null;
}
