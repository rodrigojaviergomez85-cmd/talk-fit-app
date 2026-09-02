/**
 * Shared course builders for the INTERMEDIO / ADVANCED families.
 * Pure helpers and week metadata only — no day content and no images — so
 * TIGERS, SHARKS and ADVANCED can import them without pulling EAGLES content
 * into their chunk.
 */
import type { CourseDay, ModelLine, PersonalPrompt, RepLabel, StoryPanel, TestReadySprint } from "@/lib/types";

/** The four EAGLES weeks. Week 1 title is frozen (learners already see it). */
export const EAGLES_WEEK_1_WEEKS: {
  week: 1 | 2 | 3 | 4;
  title: string;
  subtitle: string;
  subtitleEs: string;
  /** Primary behavior trained that week. */
  behavior: string;
}[] = [
  {
    week: 1,
    title: "Recommend, Advise & Sell",
    subtitle: "Tell · Offer options · Advise · Recommend · Respond",
    subtitleEs: "Contar · Ofrecer opciones · Aconsejar · Recomendar · Responder",
    behavior: "CONNECT",
  },
  {
    week: 2,
    title: "Understand, Clarify & Solve",
    subtitle: "Describe · Explain · Develop · Clarify · Solve",
    subtitleEs: "Describir · Explicar · Desarrollar · Aclarar · Resolver",
    behavior: "SOLVE",
  },
  {
    week: 3,
    title: "Compare, Explain & Choose",
    subtitle: "Describe difference · Compare · Explain · Choose · Defend",
    subtitleEs: "Describir diferencias · Comparar · Explicar · Elegir · Defender",
    behavior: "JUSTIFY",
  },
  {
    week: 4,
    title: "Handle, Persuade & Close",
    subtitle: "Plan · Reflect · Develop · Handle pressure · Persuade",
    subtitleEs: "Planear · Reflexionar · Desarrollar · Manejar presión · Persuadir",
    behavior: "ADAPT",
  },
];

export function l(id: string, marked: string, es: string): ModelLine {
  const chunks = marked.split("|").map((c) => c.trim()).filter(Boolean);
  return { id, text: chunks.join(" "), es, chunks };
}

export function p(id: string, question: string, questionEs: string, starter: string, starterEs: string, cue?: string): PersonalPrompt {
  return { id, question, questionEs, starter, starterEs, cue };
}

export function card(id: string, src: string, alt: string, cue: string): StoryPanel {
  return { id, src, alt, cue };
}

export type EaglesDayInput = {
  day: number;
  topic: string;
  topicEs: string;
  focus: string;
  focusEs: string;
  intro: CourseDay["intro"];
  lines: ModelLine[];
  prompts: PersonalPrompt[];
  cues: string[];
  rep5Prompt: CourseDay["rep5Prompt"];
  rep5Tips?: { en: string; es: string };
  rep5Audio?: CourseDay["rep5Audio"];
  storyPanels?: StoryPanel[];
  sceneImage?: { src: string; alt: string; altEs: string };
  variants?: CourseDay["variants"];
  goalSeconds?: [number, number];
  goalSentences?: number;
  rep2Chunks?: string[][];
  speakerVoice?: "female" | "male";
  powerChunks: CourseDay["powerChunks"];
  rep5Turns?: CourseDay["rep5Turns"];
  rep5Toolbox?: string[];
  /** EAGLES: every day has a sprint. TIGERS: only ~3 per week (optional). */
  testReady?: TestReadySprint;
  rep5Label?: CourseDay["rep5Label"];
  rep5Scenarios?: CourseDay["rep5Scenarios"];
  hideModelText?: boolean;
  rep5Skeleton?: CourseDay["rep5Skeleton"];
  estimatedMinutes?: string;
};

/** Week metadata used to stamp each day (EAGLES by default; TIGERS passes its own). */
export type WeekMeta = { week: 1 | 2 | 3 | 4; title: string; subtitleEs: string };

/** Week is derived from the day number (5 days per week). */
export function makeDay(input: EaglesDayInput, weeks: WeekMeta[] = EAGLES_WEEK_1_WEEKS): CourseDay {
  const weekNumber = Math.min(4, Math.max(1, Math.ceil(input.day / 5))) as 1 | 2 | 3 | 4;
  const week = weeks.find((w) => w.week === weekNumber) ?? weeks[0]!;
  return {
    day: input.day,
    week: weekNumber,
    weekTitle: week.title,
    weekTitleEs: week.subtitleEs,
    focus: input.focus,
    focusEs: input.focusEs,
    topic: input.topic,
    topicEs: input.topicEs,
    goalSeconds: input.goalSeconds ?? [45, 60],
    estimatedMinutes: input.estimatedMinutes ?? "6–9 min",
    intro: input.intro,
    lines: input.lines,
    prompts: input.prompts,
    cues: input.cues,
    rep5Prompt: input.rep5Prompt,
    ...(input.rep5Tips ? { rep5Tips: input.rep5Tips } : {}),
    ...(input.rep5Audio ? { rep5Audio: input.rep5Audio } : {}),
    ...(input.storyPanels ? { storyPanels: input.storyPanels } : {}),
    ...(input.sceneImage ? { sceneImage: input.sceneImage } : {}),
    ...(input.variants ? { variants: input.variants } : {}),
    ...(input.goalSentences ? { goalSentences: input.goalSentences } : {}),
    ...(input.rep2Chunks ? { rep2Chunks: input.rep2Chunks } : {}),
    ...(input.speakerVoice ? { speakerVoice: input.speakerVoice } : {}),
    ...(input.testReady ? { testReady: input.testReady } : {}),
    powerChunks: input.powerChunks,
    ...(input.rep5Turns ? { rep5Turns: input.rep5Turns } : {}),
    ...(input.rep5Toolbox ? { rep5Toolbox: input.rep5Toolbox } : {}),
    ...(input.rep5Label ? { rep5Label: input.rep5Label } : {}),
    ...(input.rep5Scenarios ? { rep5Scenarios: input.rep5Scenarios } : {}),
    ...(input.hideModelText ? { hideModelText: true } : {}),
    ...(input.rep5Skeleton ? { rep5Skeleton: input.rep5Skeleton } : {}),
    // No modelExample on purpose: Rep 5 never shows a complete final speech.
  };
}

/** Rep 4 prompt with a TIGERS behavior label (EXPLICA · JUSTIFICA · DEFIENDE). */
export function q(
  id: string,
  question: string,
  questionEs: string,
  starter: string,
  starterEs: string,
  cue: string,
  label?: RepLabel,
): PersonalPrompt {
  return label ? { id, question, questionEs, starter, starterEs, cue, label } : { id, question, questionEs, starter, starterEs, cue };
}

export const chunks4 = (prefix: string): string[][] => [
  [`${prefix}-1`, `${prefix}-2`],
  [`${prefix}-3`, `${prefix}-4`],
  [`${prefix}-5`, `${prefix}-6`],
  [`${prefix}-7`, `${prefix}-8`],
];
