import type { JourneyState, ModuleId } from "@/lib/types";
import { CourseService } from "@/services/course-service";
import { JourneyService } from "@/services/journey-service";
import type { Comparison } from "@/lib/progress-moments";

/**
 * 66-Day Habit Journey — pure helpers over the existing JourneyState.
 *
 * Habit days = number of UNIQUE completed curriculum days (any module). It is
 * always derived from real completion records, never incremented by hand, so
 * replaying a day or refreshing can't inflate it. The current streak is a
 * separate metric and may drop to 0 while habit days stay put.
 */

export const HABIT_GOAL = 66;

export type Copy = { es: string; en: string };

export type HabitMilestoneDef = {
  id: string;
  days: number;
  emoji: string;
  title: Copy;
  message: Copy;
  /** Two-line badge label (English by design, like a product badge). */
  badge: [string, string];
  /** Larger celebration variant with metrics + first-vs-latest comparison. */
  major?: boolean;
};

export const HABIT_MILESTONES: HabitMilestoneDef[] = [
  {
    id: "habit-7",
    days: 7,
    emoji: "🔥",
    title: { es: "PRIMERA SEMANA", en: "FIRST WEEK" },
    message: {
      es: "7 días practicando inglés. Ya comenzaste a construir tu rutina.",
      en: "7 days practicing English. You've started building your routine.",
    },
    badge: ["7 DAYS", "STARTED STRONG"],
  },
  {
    id: "habit-20",
    days: 20,
    emoji: "🏆",
    title: { es: "20 DÍAS", en: "20 DAYS" },
    message: {
      es: "Ya completaste 20 días de práctica. Mira cuánto has construido.",
      en: "You've completed 20 days of practice. Look how much you've built.",
    },
    badge: ["20 DAYS", "KEEP BUILDING"],
  },
  {
    id: "habit-30",
    days: 30,
    emoji: "🎙️",
    title: { es: "UN MES HABLANDO", en: "ONE MONTH SPEAKING" },
    message: {
      es: "30 días practicando speaking. Tu voz ya tiene historia.",
      en: "30 days of speaking practice. Your voice already has a history.",
    },
    badge: ["30 DAYS", "ONE MONTH SPEAKING"],
  },
  {
    id: "habit-40",
    days: 40,
    emoji: "⚡",
    title: { es: "40 DÍAS", en: "40 DAYS" },
    message: {
      es: "Ya pasaste más de la mitad del camino hacia 66. Sigue construyendo.",
      en: "You're past the halfway point to 66. Keep building.",
    },
    badge: ["40 DAYS", "KEEP GOING"],
  },
  {
    id: "habit-60",
    days: 60,
    emoji: "🔥",
    title: { es: "60 DÍAS HABLANDO", en: "60 DAYS SPEAKING" },
    message: {
      es: "Dos meses de práctica acumulada. Faltan solo 6 días para tu gran meta.",
      en: "Two months of practice built up. Only 6 days to your big goal.",
    },
    badge: ["60 DAYS", "TWO MONTHS SPEAKING"],
  },
  {
    id: "habit-66",
    days: 66,
    emoji: "🏆",
    title: { es: "66 DAYS", en: "66 DAYS" },
    message: {
      es: "66 días atrás comenzaste a construir esta rutina. Hoy ya tienes decenas de momentos hablando inglés. Sigue: ahora no empiezas desde cero, continúas desde todo lo que ya construiste.",
      en: "66 days ago you started building this routine. Today you have dozens of moments speaking English. Keep going: you're not starting from zero, you're continuing from everything you've built.",
    },
    badge: ["66-DAY", "HABIT"],
    major: true,
  },
  {
    id: "habit-100",
    days: 100,
    emoji: "🚀",
    title: { es: "100 DAYS OF SPEAKING", en: "100 DAYS OF SPEAKING" },
    message: {
      es: "100 días practicando tu inglés. Mira todo el camino que has recorrido.",
      en: "100 days practicing your English. Look at the whole road you've travelled.",
    },
    badge: ["100 DAYS", "FLUENCY JOURNEY"],
    major: true,
  },
];

/** Unique completed curriculum days across every module. */
export function habitDays(state: JourneyState): number {
  return Object.keys(state.days).length;
}

/** Shown in the main milestone: clamps at 66 / 66. */
export function habitDisplay(count: number): { shown: number; complete: boolean } {
  return { shown: Math.min(count, HABIT_GOAL), complete: count >= HABIT_GOAL };
}

/** Next milestone still ahead (null after day 100). */
export function nextMilestone(count: number): HabitMilestoneDef | null {
  return HABIT_MILESTONES.find((m) => m.days > count) ?? null;
}

/** Milestones crossed by one completion (before → after). Idempotent by construction. */
export function milestonesCrossed(before: number, after: number): HabitMilestoneDef[] {
  return HABIT_MILESTONES.filter((m) => before < m.days && after >= m.days);
}

/** Final-6 countdown: active from day 60 until 65. */
export function final6(count: number): number | null {
  if (count < 60 || count >= HABIT_GOAL) return null;
  return HABIT_GOAL - count;
}

/** True when the learner's streak lapsed before this completion (for the welcome-back line). */
export function wasOnBreak(lastCompletedDate: string | undefined, habitBefore: number): boolean {
  if (!lastCompletedDate || habitBefore === 0) return false;
  const today = JourneyService.dayKey();
  const yesterday = JourneyService.dayKey(new Date(Date.now() - 86400000));
  return lastCompletedDate !== today && lastCompletedDate !== yesterday;
}

/** First playable Final Rep vs the most recent — the "ESCUCHA TU CAMINO" pair. */
export function journeyComparison(state: JourneyState): Comparison | null {
  const playable = JourneyService.playableRecords(state);
  if (playable.length < 2) return null;
  const first = playable[0]!;
  const latest = playable[playable.length - 1]!;
  return {
    type: "journey",
    moduleId: first.moduleId,
    week: 0,
    start: { day: first.day, record: first, playable: true },
    end: { day: latest.day, record: latest, playable: true },
  };
}

/** Objective numbers for the 66 / 100 celebration. Zero values are hidden by the caller. */
export function journeyMetrics(state: JourneyState) {
  const records = Object.values(state.days);
  const days = records.length;
  return {
    days,
    reps: days * 5,
    minutes: JourneyService.totalSpeakingMinutes(state),
    finalReps: records.filter((r) => Boolean(r.recordingPath || r.finalUrl)).length,
    modules: CourseService.modules().filter((m) => JourneyService.moduleComplete(state, m.id)).length,
  };
}

/* ------------------------------- Badges -------------------------------- */

export type BadgeDef = {
  id: string;
  emoji: string;
  name: string;
  detail: Copy;
  kind: "habit" | "skill" | "module";
};

const EAGLES: ModuleId = "eagles-week-1";
const ROLE_PLAY_DAYS = [4, 9, 10, 19, 20];
const CUSTOMER_SERVICE_DAYS = [9, 10, 19];
const SALES_DAYS = [4, 20];
export const TEST_READY_THRESHOLD = 5;

export const HABIT_BADGES: BadgeDef[] = HABIT_MILESTONES.map((m) => ({
  id: m.id,
  emoji: m.emoji,
  name: m.badge[1] === "HABIT" ? "66-DAY HABIT" : m.badge[1],
  detail: { es: `${m.days} días de práctica`, en: `${m.days} practice days` },
  kind: "habit",
}));

export const SKILL_BADGES: BadgeDef[] = [
  {
    id: "skill-conversation",
    emoji: "💬",
    name: "CONVERSATION READY",
    detail: { es: "Primer role play de varios turnos", en: "First multi-turn role play" },
    kind: "skill",
  },
  {
    id: "skill-customer-service",
    emoji: "🤝",
    name: "CUSTOMER SERVICE READY",
    detail: { es: "Retos de servicio al cliente completados", en: "Customer service challenges completed" },
    kind: "skill",
  },
  {
    id: "skill-sales",
    emoji: "💼",
    name: "SALES CHALLENGE",
    detail: { es: "Retos de ventas completados", en: "Sales challenges completed" },
    kind: "skill",
  },
  {
    id: "skill-test-ready",
    emoji: "🎧",
    name: "TEST READY",
    detail: { es: `${TEST_READY_THRESHOLD} Test Ready Sprints completados`, en: `${TEST_READY_THRESHOLD} Test Ready Sprints completed` },
    kind: "skill",
  },
];

export const ALL_BADGES: BadgeDef[] = [...HABIT_BADGES, ...SKILL_BADGES];

/** Achievement ids currently earned, derived only from authoritative completion data. */
export function earnedBadgeIds(state: JourneyState, testReadyCount = 0): string[] {
  const count = habitDays(state);
  const ids: string[] = HABIT_MILESTONES.filter((m) => count >= m.days).map((m) => m.id);
  const done = (day: number) => JourneyService.isDayCompleted(state, EAGLES, day);
  if (ROLE_PLAY_DAYS.some(done)) ids.push("skill-conversation");
  if (CUSTOMER_SERVICE_DAYS.every(done)) ids.push("skill-customer-service");
  if (SALES_DAYS.every(done)) ids.push("skill-sales");
  if (testReadyCount >= TEST_READY_THRESHOLD) ids.push("skill-test-ready");
  return ids;
}

/** Locked habit milestones to preview (only the next one or two). */
export function upcomingBadges(count: number, limit = 2): { badge: BadgeDef; days: number }[] {
  return HABIT_MILESTONES.filter((m) => m.days > count)
    .slice(0, limit)
    .map((m) => ({ badge: HABIT_BADGES.find((b) => b.id === m.id)!, days: m.days }));
}
