import { describe, expect, it } from "vitest";
import { CourseService } from "./course-service";
import { MODULE_INDEX } from "./course-index";
import { REP4_MAX, rep4Items } from "@/lib/rep-structure";
import type { CourseDay } from "@/lib/types";

/**
 * Curriculum QA for Rep 4: inspects the ACTUAL prompts learners see
 * (`rep4Items`, capped at REP4_MAX), not the raw prompt arrays.
 */

const normalize = (q: string) =>
  q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, "")
    .replace(/\s+/g, " ")
    .trim();

const setKey = (day: CourseDay) =>
  rep4Items(day)
    .map((item) => normalize(item.question))
    .sort()
    .join(" || ");

const PAST_TENSE = /\b(did|was|were|yesterday|ago|last (week|year|night|month))\b/i;

describe("Rep 4 variety", () => {
  it("never exposes the same 3-question set on two consecutive days (any module)", async () => {
    const offenders: string[] = [];
    for (const meta of MODULE_INDEX) {
      const full = await CourseService.loadModule(meta.id);
      const days = [...full.days].sort((a, b) => a.day - b.day);
      for (let i = 1; i < days.length; i++) {
        const prev = days[i - 1]!;
        const cur = days[i]!;
        if (setKey(prev) === setKey(cur)) offenders.push(`${meta.id}: day ${prev.day} → day ${cur.day}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("BASIC ZERO: every day shows exactly 3 prompts and no two days in a week repeat a set", async () => {
    const full = await CourseService.loadModule("basic-zero");
    for (let week = 1; week <= 4; week++) {
      const days = full.days.filter((d) => d.week === week);
      expect(days.length, `week ${week}`).toBe(5);
      const sets = new Set(days.map(setKey));
      expect(sets.size, `week ${week} unique Rep 4 sets`).toBe(5);
      for (const d of days) expect(rep4Items(d).length, `day ${d.day}`).toBe(REP4_MAX);
    }
  });

  it("BASIC ZERO: Day 5 and Day 20 spot checks", async () => {
    const full = await CourseService.loadModule("basic-zero");
    const day5 = full.days.find((d) => d.day === 5)!;
    expect(rep4Items(day5).map((i) => i.question)).toEqual([
      "What is your name and how old are you?",
      "Where are you from and where do you live?",
      "What are your hobbies and how would you describe yourself?",
    ]);
    const day20 = full.days.find((d) => d.day === 20)!;
    // Day 20 keeps its two-part challenge; Rep 4 reads from `challenges` there.
    expect(day20.challenges?.length).toBe(2);
    expect(day20.rep5Prompt.question).toMatch(/someone else/i);
    expect(day20.prompts.map((p) => p.question)).toEqual([
      "Who is this person, and what is his / her name?",
      "What is his / her favorite food, and why?",
      "How would you describe him / her?",
    ]);
  });
});

describe("Rep 4 level alignment", () => {
  it("BASIC ZERO: simple supported WH prompts, no past tense", async () => {
    const full = await CourseService.loadModule("basic-zero");
    for (const d of full.days) {
      for (const item of rep4Items(d)) {
        expect(item.question, `day ${d.day}: ${item.question}`).not.toMatch(PAST_TENSE);
        expect(item.starter.length, `day ${d.day}: starter`).toBeGreaterThan(0);
        expect(item.starterEs.length, `day ${d.day}: starterEs`).toBeGreaterThan(0);
      }
      // Foundation weeks never ask "do you ... ?" beyond the modeled "Where do you live?".
      if (d.week === 1) {
        for (const item of rep4Items(d)) expect(item.question).not.toMatch(/\bdoes\b/i);
      }
    }
  });

  it("BASIC 2 (Simple Present): no Simple Past required before Basic 3; Week 4 stays Present Progressive", async () => {
    const full = await CourseService.loadModule("simple-present");
    for (const d of full.days) {
      for (const p of d.prompts) expect(p.question, `day ${d.day}: ${p.question}`).not.toMatch(PAST_TENSE);
    }
    const week4 = full.days.filter((d) => d.week === 4);
    expect(week4.length).toBe(5);
    for (const d of week4) {
      const items = rep4Items(d);
      for (const item of items) expect(item.question, `day ${d.day}`).toMatch(/\b(is|are)\b.*\w+ing\b/i);
      // Not every prompt uses the identical "What is ___ doing?" frame.
      const frames = new Set(items.map((i) => normalize(i.question).replace(/^(what|who|where)\b/, "").replace(/\b(is|are)\b.*/, "").trim()));
      const whWords = new Set(items.map((i) => normalize(i.question).split(" ")[0]));
      expect(whWords.size, `day ${d.day} WH variety`).toBeGreaterThan(1);
      expect(frames.size).toBeGreaterThan(0);
    }
  });
});
