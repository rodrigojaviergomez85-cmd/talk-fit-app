/**
 * Reminder copy. Pure and testable: no dates, no network, no database.
 * Each template is written as "title · body" and split on the middle dot.
 */

export type ReminderLang = "es" | "en";
export type ReminderKind = "first" | "second" | "activation_24h" | "activation_72h";

export type DayContext = {
  day: number;
  moduleName: string;
  topic: string;
  topicEs: string;
  streak: number;
};

export type ReminderMessage = { title: string; body: string; url: string };

const FIRST: Record<ReminderLang, string[]> = {
  es: [
    "Hora de practicar · Día {day} de {moduleName}: {topicEs}. 15 minutos y listo.",
    "{topicEs} te está esperando · Día {day}. Empezá con el paso 1.",
    "Tu inglés de hoy · Día {day} de {moduleName}. Hablá 5 minutos y ya.",
    "Práctica de hoy · {topicEs}. Un día más para la racha.",
    "Es tu hora · Día {day}: {topicEs}. Escuchá, repetí, grabá.",
  ],
  en: [
    "Time to practice · Day {day} of {moduleName}: {topic}. 15 minutes and done.",
    "{topic} is waiting for you · Day {day}. Start with step 1.",
    "Your English today · Day {day} of {moduleName}. Speak 5 minutes and that's it.",
    "Today's practice · {topic}. One more day for your streak.",
    "It's your time · Day {day}: {topic}. Listen, repeat, record.",
  ],
};

const SECOND: Record<ReminderLang, string[]> = {
  es: [
    "Todavía no practicaste hoy · Te quedan 15 minutos de práctica. La racha va en {streak} días.",
    "Última llamada · Día {day}: {topicEs}. No dejes que se corte la racha de {streak}.",
    "5 minutos alcanzan · Hacé el paso 1 y el 2 de hoy. Mañana seguís.",
    "Hoy no cuenta si no grabás · Día {day} sigue abierto.",
    "Tu turno · {topicEs}. La liga suma solo lo de hoy.",
  ],
  en: [
    "You haven't practiced today · You have 15 minutes of practice left. Your streak is at {streak} days.",
    "Last call · Day {day}: {topic}. Don't let your {streak}-day streak break.",
    "5 minutes are enough · Do step 1 and step 2 today. Tomorrow you continue.",
    "Today doesn't count if you don't record · Day {day} is still open.",
    "Your turn · {topic}. The league only counts today.",
  ],
};

/** Templates 1, 2 and 5 (indexes 0, 1, 4) name the streak — unusable at 0. */
const STREAK_TEMPLATES = new Set([0, 1]);

function fill(template: string, ctx: DayContext): string {
  return template
    .replace(/\{day\}/g, String(ctx.day))
    .replace(/\{moduleName\}/g, ctx.moduleName)
    .replace(/\{topicEs\}/g, ctx.topicEs)
    .replace(/\{topic\}/g, ctx.topic)
    .replace(/\{streak\}/g, String(ctx.streak));
}

function split(text: string, url: string): ReminderMessage {
  const index = text.indexOf(" · ");
  if (index < 0) return { title: text, body: "", url };
  return { title: text.slice(0, index), body: text.slice(index + 3), url };
}

/** Day-of-year rotation so the same learner does not read the same line daily. */
export function dayOfYear(date: Date): number {
  const start = Date.UTC(date.getUTCFullYear(), 0, 0);
  return Math.floor((Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) - start) / 86_400_000);
}

export function dayUrl(moduleId: string, day: number): string {
  return `/day/${moduleId}/${day}`;
}

/** First or second reminder for a learner who has a day pending. */
export function buildDayReminder(
  kind: "first" | "second",
  variant: number,
  lang: ReminderLang,
  ctx: DayContext,
  url: string,
): ReminderMessage {
  const bank = kind === "first" ? FIRST[lang] : SECOND[lang];
  let index = ((variant % 5) + 5) % 5;
  if (kind === "second" && ctx.streak <= 0 && STREAK_TEMPLATES.has(index)) index = index === 0 ? 2 : 3;
  return split(fill(bank[index]!, ctx), url);
}

/** 24h / 72h nudge for learners who never recorded anything. */
export function buildActivationReminder(lang: ReminderLang, moduleName: string, url: string): ReminderMessage {
  return lang === "es"
    ? {
        title: "Tu primer audio toma 5 minutos",
        body: `Escuchá, repetí y grabá. Día 1 de ${moduleName} te espera.`,
        url,
      }
    : {
        title: "Your first audio takes 5 minutes",
        body: `Listen, repeat and record. Day 1 of ${moduleName} is waiting.`,
        url,
      };
}
