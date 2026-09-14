import { describe, expect, it } from "vitest";
import {
  ADVANCED_INTERVIEW_PROMPTS,
  BASIC_INTERVIEW_PROMPTS,
  INTERMEDIATE_INTERVIEW_PROMPTS,
} from "@/services/interview-prompts";

/** Ids that had a pre-produced Mike clip before the data/route split. */
const VIDEO_IDS = {
  basic: [
    "welcome", "tell-me", "tell-me-more", "routine", "present-progressive", "last-job", "explain-why",
    "favorite-movie", "opinion", "past-progressive", "two-years", "after-course", "goodbye",
  ],
  intermediate: [
    "welcome", "happy-moment", "why-happy", "improve-english", "third-person", "compare-parents", "best-worst",
    "last-weekend", "more-details-past", "past-progressive", "how-long", "ever-difficult", "modals", "free-week",
    "next-weekend", "read-ed", "work-home", "opinion-more", "goodbye",
  ],
  advanced: [
    "welcome", "tell-me-about-yourself", "why-english", "routine-compare", "achievement", "differently",
    "compare-apps", "six-months", "move-city", "read-ed", "aliens", "dinner", "tiktok", "time-travel",
    "angry-customer", "sell-pen", "objection", "hire", "availability", "work-home", "convince", "goodbye",
  ],
} as const;

async function load(level: "basic" | "intermediate" | "advanced") {
  if (level === "basic") return (await import("./review.interview")).PROMPTS;
  if (level === "intermediate") return (await import("./review.interview-intermediate")).PROMPTS;
  return (await import("./review.interview-advanced")).PROMPTS;
}

const BASE = {
  basic: BASIC_INTERVIEW_PROMPTS,
  intermediate: INTERMEDIATE_INTERVIEW_PROMPTS,
  advanced: ADVANCED_INTERVIEW_PROMPTS,
} as const;

describe("interview routes keep their prompts intact", () => {
  for (const level of ["basic", "intermediate", "advanced"] as const) {
    it(`${level}: same ids in the same order, and every clip is still attached`, async () => {
      const prompts = await load(level);
      expect(prompts.map((p) => p.id)).toEqual(BASE[level].map((p) => p.id));
      for (const id of VIDEO_IDS[level]) {
        expect(prompts.find((p) => p.id === id)?.video?.src, id).toBeTruthy();
      }
    });
  }
});
