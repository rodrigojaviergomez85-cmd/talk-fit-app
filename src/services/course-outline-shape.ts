import type { CourseDay } from "@/lib/types";

/**
 * Per-day metadata that Home, Progress, Recordings, moments and the journey
 * math need. Deliberately excludes lines, prompts, chunks, role plays,
 * scenario banks and images — those live in the lazily loaded course files.
 */
export type DayOutline = {
  day: number;
  week?: 1 | 2 | 3 | 4;
  weekTitle?: string;
  weekTitleEs?: string;
  topic: string;
  topicEs: string;
  focus: string;
  focusEs: string;
  estimatedMinutes: string;
  goalSeconds: [number, number];
  goalSentences?: number;
  /** Present only when the day has a Test Ready Sprint (title only). */
  testReady?: { title: string; titleEs: string };
  testReadyOptional?: boolean;
};

export type WeekOutline = { week: 1 | 2 | 3 | 4; title: string; subtitle: string; subtitleEs: string };

export type ModuleOutline = { weeks: WeekOutline[]; days: DayOutline[] };

/** Projects a full CourseDay onto its outline. Used by the generator and the drift test. */
export function outlineOf(d: CourseDay): DayOutline {
  const o: DayOutline = {
    day: d.day,
    topic: d.topic,
    topicEs: d.topicEs,
    focus: d.focus,
    focusEs: d.focusEs,
    estimatedMinutes: d.estimatedMinutes,
    goalSeconds: [d.goalSeconds[0], d.goalSeconds[1]],
  };
  if (d.week !== undefined) o.week = d.week;
  if (d.weekTitle !== undefined) o.weekTitle = d.weekTitle;
  if (d.weekTitleEs !== undefined) o.weekTitleEs = d.weekTitleEs;
  if (d.goalSentences !== undefined) o.goalSentences = d.goalSentences;
  if (d.testReady) o.testReady = { title: d.testReady.title, titleEs: d.testReady.titleEs };
  if (d.testReadyOptional) o.testReadyOptional = true;
  return o;
}
