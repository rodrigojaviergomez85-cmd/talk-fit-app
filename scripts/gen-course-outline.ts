import { BASIC_ZERO_DAYS, BASIC_ZERO_WEEKS } from "@/services/basic-zero-course";
import { SIMPLE_PRESENT_DAYS, SIMPLE_PRESENT_WEEKS } from "@/services/simple-present-course";
import { PAST_STORIES_DAYS, PAST_STORIES_WEEKS } from "@/services/past-stories-course";
import { SIMPLE_FUTURE_DAYS, SIMPLE_FUTURE_WEEKS } from "@/services/simple-future-course";
import { MIXED_TENSES_DAYS, MIXED_TENSES_WEEKS } from "@/services/mixed-tenses-course";
import { EAGLES_WEEK_1_DAYS, EAGLES_WEEK_1_WEEKS } from "@/services/eagles-week-1-course";
import { EAGLES_WEEKS_2_4_DAYS } from "@/services/eagles-weeks-2-4-course";
import { TIGERS_WEEK_1_DAYS, TIGERS_WEEKS } from "@/services/tigers-week-1-course";
import { TIGERS_WEEKS_2_4_DAYS } from "@/services/tigers-weeks-2-4-course";
import { SHARKS_WEEK_1_DAYS, SHARKS_WEEKS } from "@/services/sharks-week-1-course";
import { SHARKS_WEEKS_2_4_DAYS } from "@/services/sharks-weeks-2-4-course";
import { ADVANCED_1_WEEK_1_DAYS, ADVANCED_1_WEEKS } from "@/services/advanced-1-course";
import { ADVANCED_1_WEEKS_2_4_DAYS } from "@/services/advanced-1-weeks-2-4-course";
import { outlineOf } from "@/services/course-outline-shape";

const mods = {
  "basic-zero": { days: BASIC_ZERO_DAYS, weeks: BASIC_ZERO_WEEKS },
  "simple-future": { days: SIMPLE_FUTURE_DAYS, weeks: SIMPLE_FUTURE_WEEKS },
  "simple-present": { days: SIMPLE_PRESENT_DAYS, weeks: SIMPLE_PRESENT_WEEKS },
  "past-stories": { days: PAST_STORIES_DAYS, weeks: PAST_STORIES_WEEKS },
  "mixed-tenses": { days: MIXED_TENSES_DAYS, weeks: MIXED_TENSES_WEEKS },
  "eagles-week-1": { days: [...EAGLES_WEEK_1_DAYS, ...EAGLES_WEEKS_2_4_DAYS], weeks: EAGLES_WEEK_1_WEEKS },
  tigers: { days: [...TIGERS_WEEK_1_DAYS, ...TIGERS_WEEKS_2_4_DAYS], weeks: TIGERS_WEEKS },
  sharks: { days: [...SHARKS_WEEK_1_DAYS, ...SHARKS_WEEKS_2_4_DAYS], weeks: SHARKS_WEEKS },
  "advanced-1": { days: [...ADVANCED_1_WEEK_1_DAYS, ...ADVANCED_1_WEEKS_2_4_DAYS], weeks: ADVANCED_1_WEEKS },
};
const out: Record<string, unknown> = {};
for (const [id, m] of Object.entries(mods)) {
  out[id] = {
    weeks: m.weeks.map((w: any) => ({ week: w.week, title: w.title, subtitle: w.subtitle, subtitleEs: w.subtitleEs })),
    days: m.days.map(outlineOf),
  };
}
const body =
  "{\n" +
  Object.entries(out)
    .map(([id, v]: any) =>
      `  ${JSON.stringify(id)}: {\n    weeks: ${JSON.stringify(v.weeks)},\n    days: [\n${v.days.map((d: any) => `      ${JSON.stringify(d)},`).join("\n")}\n    ],\n  },`,
    )
    .join("\n") +
  "\n}";
const file = `/* GENERATED FILE — do not edit by hand.
 * Lightweight outline of every module (weeks + per-day metadata only).
 * Regenerate with: bun scripts/gen-course-outline.ts  (see course-index.test.ts, which
 * fails if this file drifts from the full course content). */
import type { ModuleId } from "@/lib/types";
import type { ModuleOutline } from "./course-outline-shape";

export const COURSE_OUTLINE: Record<ModuleId, ModuleOutline> = ${body};
`;
await Bun.write("src/services/course-outline.ts", file);
console.log(Object.entries(out).map(([k, v]: any) => `${k}:${v.days.length}`).join(" "));
