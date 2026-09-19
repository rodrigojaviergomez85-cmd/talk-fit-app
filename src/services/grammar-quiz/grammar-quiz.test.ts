import { describe, expect, it } from "vitest";
import { GRAMMAR_QUIZZES, GRAMMAR_ITEMS_PER_QUIZ, GRAMMAR_PASS_SCORE, getGrammarQuiz } from "./index";
import { isItemCorrect } from "@/lib/grammar-quiz.functions";
import { grammarDaysInWeek, hasGrammarQuiz, LAB_DAY_META } from "@/lib/grammar-quiz-manifest";
import { attainableWeeklyGoal, dailyGoal } from "@/lib/league";

describe("paso 3 · gramática — banco de ítems", () => {
  it("cubre Basic 1–4 completos (días 1 a 20) y Basic Zero días 6 a 20", () => {
    expect(GRAMMAR_QUIZZES).toHaveLength(100);
    for (const moduleId of ["simple-future", "simple-present", "past-stories", "mixed-tenses"]) {
      for (const day of Array.from({ length: 20 }, (_, i) => i + 1)) {
        const quiz = getGrammarQuiz(moduleId, day);
        expect(quiz, `${moduleId} day ${day}`).toBeDefined();
        expect(quiz!.items).toHaveLength(GRAMMAR_ITEMS_PER_QUIZ);
        expect(quiz!.passScore).toBeUndefined();
      }
    }
    for (const day of Array.from({ length: 15 }, (_, i) => i + 6)) {
      const quiz = getGrammarQuiz("basic-zero", day);
      expect(quiz, `basic-zero day ${day}`).toBeDefined();
      expect(quiz!.items).toHaveLength(10);
      expect(quiz!.passScore).toBe(7);
    }
    for (const day of [1, 2, 3, 4, 5]) {
      expect(getGrammarQuiz("basic-zero", day)).toBeUndefined();
    }
    expect(getGrammarQuiz("past-stories", 21)).toBeUndefined();
    expect(getGrammarQuiz("mixed-tenses", 21)).toBeUndefined();
    expect(getGrammarQuiz("basic-zero", 21)).toBeUndefined();
    expect(getGrammarQuiz("simple-future", 21)).toBeUndefined();
    expect(getGrammarQuiz("simple-present", 21)).toBeUndefined();
  });

  it("mezcla los tres formatos en cada día de gramática", () => {
    for (const quiz of GRAMMAR_QUIZZES) {
      if (quiz.sections) continue; // B2 Lab: cada día tiene su propio formato.
      const kinds = new Set(quiz.items.map((i) => i.kind));
      expect(kinds).toEqual(new Set(["mc", "mistake", "rearrange"]));
    }
  });

  it("tiene ids únicos, respuesta válida y explicación en los dos idiomas", () => {
    const ids = new Set<string>();
    for (const quiz of GRAMMAR_QUIZZES) {
      for (const item of quiz.items) {
        expect(ids.has(item.id)).toBe(false);
        ids.add(item.id);
        expect(item.explain.en.length).toBeGreaterThan(3);
        expect(item.explain.es.length).toBeGreaterThan(3);
        if (item.kind === "mc") {
          expect(item.options.length).toBeGreaterThanOrEqual(3);
          expect(item.options[item.answer]).toBeTruthy();
          expect(new Set(item.options).size).toBe(item.options.length);
        } else if (item.kind === "mistake") {
          expect(item.answer).toBeGreaterThanOrEqual(0);
          expect(item.words[item.answer]).toBeTruthy();
          expect(item.correction).toBeTruthy();
        } else if (item.kind === "speak") {
          expect(item.minSeconds).toBeGreaterThan(0);
          expect(item.minSeconds).toBeLessThanOrEqual(item.speakSeconds);
          expect(item.template.length).toBeGreaterThan(0);
        } else {
          expect([...item.pieces].sort()).toEqual([...item.answer].sort());
          expect(item.pieces).not.toEqual(item.answer);
        }
      }
    }
    expect(ids.size).toBe(1807);
  });

  it("B2 Lab · Eagles semana 1: secciones que cubren todos los ítems, 4 opciones, hablar obligatorio", () => {
    const expected: Record<number, { items: number; pass: number; kinds: string[] }> = {
      1: { items: 10, pass: 7, kinds: ["reading"] },
      2: { items: 10, pass: 7, kinds: ["listening"] },
      3: { items: 16, pass: 12, kinds: [] },
      4: { items: 7, pass: 6, kinds: ["reading", "listening"] },
      5: { items: 14, pass: 10, kinds: ["reading", "listening"] },
    };
    for (const day of [1, 2, 3, 4, 5]) {
      const quiz = getGrammarQuiz("eagles-week-1", day);
      expect(quiz, `eagles-week-1 day ${day}`).toBeDefined();
      expect(quiz!.items).toHaveLength(expected[day]!.items);
      expect(quiz!.passScore).toBe(expected[day]!.pass);
      expect(quiz!.sections).toBeDefined();
      const covered = quiz!.sections!.flatMap((s) => s.itemIds);
      expect([...covered].sort()).toEqual(quiz!.items.map((i) => i.id).sort());
      expect(new Set(covered).size).toBe(covered.length);
      const contexts = quiz!.sections!.map((s) => s.context?.kind).filter(Boolean) as string[];
      expect(contexts).toEqual(expected[day]!.kinds);
      for (const item of quiz!.items) {
        if (item.kind === "mc") expect(item.options).toHaveLength(4);
        if (item.kind === "speak") expect(item.required).toBe(true);
      }
      for (const section of quiz!.sections!) {
        if (section.context?.kind === "listening") expect(section.context.plays).toBe(2);
      }
    }
    expect(getGrammarQuiz("eagles-week-1", 6)).toBeUndefined();
    expect(getGrammarQuiz("eagles-week-1", 4)!.items.filter((i) => i.kind === "speak")).toHaveLength(1);
    expect(getGrammarQuiz("eagles-week-1", 5)!.bands!.map((b) => b.min)).toEqual([13, 10, 0]);
  });

  it("LAB_DAY_META coincide con los quizzes", () => {
    for (const [moduleId, days] of Object.entries(LAB_DAY_META)) {
      for (const [dayStr, meta] of Object.entries(days)) {
        const day = Number(dayStr);
        const quiz = getGrammarQuiz(moduleId, day);
        expect(quiz, `${moduleId} day ${day} missing in GRAMMAR_QUIZZES`).toBeDefined();
        expect(quiz!.sections, `${moduleId} day ${day} must have sections`).toBeDefined();
        expect(quiz!.items.length, `${moduleId} day ${day} item count`).toBe(meta.items);
        expect(quiz!.title.en, `${moduleId} day ${day} title.en`).toBe(meta.en);
        expect(quiz!.title.es, `${moduleId} day ${day} title.es`).toBe(meta.es);
      }
    }
    for (const quiz of GRAMMAR_QUIZZES) {
      if (!quiz.sections) continue;
      const meta = LAB_DAY_META[quiz.moduleId]?.[quiz.day];
      expect(meta, `${quiz.moduleId} day ${quiz.day} missing in LAB_DAY_META`).toBeDefined();
    }
  });

  it("califica hablar por segundos grabados", () => {
    const item = getGrammarQuiz("eagles-week-1", 4)!.items.find((i) => i.kind === "speak")!;
    expect(item.kind).toBe("speak");
    expect(isItemCorrect(item, 40)).toBe(true);
    expect(isItemCorrect(item, 39)).toBe(false);
    expect(isItemCorrect(item, undefined)).toBe(false);
    expect(isItemCorrect(item, ["40"])).toBe(false);
  });

  it("califica cada formato contra la respuesta fija", () => {
    const quiz = getGrammarQuiz("past-stories", 1)!;
    for (const item of quiz.items) {
      if (item.kind === "mc") {
        expect(isItemCorrect(item, item.answer)).toBe(true);
        expect(isItemCorrect(item, (item.answer + 1) % item.options.length)).toBe(false);
      } else if (item.kind === "mistake") {
        expect(isItemCorrect(item, item.answer)).toBe(true);
        expect(isItemCorrect(item, item.answer === 0 ? 1 : 0)).toBe(false);
      } else if (item.kind === "rearrange") {
        expect(isItemCorrect(item, item.answer)).toBe(true);
        expect(isItemCorrect(item, item.pieces)).toBe(false);
        expect(isItemCorrect(item, item.answer.slice(0, 2))).toBe(false);
      }
    }
  });

  it("aprueba con 16 de 20 (7 de 10 en Basic Zero)", () => {
    expect(GRAMMAR_PASS_SCORE).toBe(16);
    expect(15 >= GRAMMAR_PASS_SCORE).toBe(false);
    expect(16 >= GRAMMAR_PASS_SCORE).toBe(true);
    const bz = getGrammarQuiz("basic-zero", 6)!;
    expect(bz.passScore).toBe(7);
    expect(6 >= (bz.passScore ?? GRAMMAR_PASS_SCORE)).toBe(false);
    expect(7 >= (bz.passScore ?? GRAMMAR_PASS_SCORE)).toBe(true);
  });
});

describe("paso 3 · gramática — liga", () => {
  it("Basic Zero, Basic 3 y Basic 4 tienen tercera actividad", () => {
    expect(hasGrammarQuiz("past-stories", 1)).toBe(true);
    expect(hasGrammarQuiz("past-stories", 5)).toBe(true);
    expect(hasGrammarQuiz("past-stories", 6)).toBe(true);
    expect(hasGrammarQuiz("past-stories", 20)).toBe(true);
    expect(hasGrammarQuiz("past-stories", 21)).toBe(false);
    expect(hasGrammarQuiz("mixed-tenses", 1)).toBe(true);
    expect(hasGrammarQuiz("mixed-tenses", 20)).toBe(true);
    expect(hasGrammarQuiz("mixed-tenses", 21)).toBe(false);
    expect(hasGrammarQuiz("basic-zero", 1)).toBe(false);
    expect(hasGrammarQuiz("basic-zero", 5)).toBe(false);
    expect(hasGrammarQuiz("basic-zero", 6)).toBe(true);
    expect(hasGrammarQuiz("eagles-week-1", 1)).toBe(true);
    expect(hasGrammarQuiz("eagles-week-1", 5)).toBe(true);
    expect(hasGrammarQuiz("eagles-week-1", 6)).toBe(false);
    expect(hasGrammarQuiz("basic-zero", 20)).toBe(true);
    expect(hasGrammarQuiz("basic-zero", 21)).toBe(false);
    expect(hasGrammarQuiz("simple-future", 1)).toBe(true);
    expect(hasGrammarQuiz("simple-future", 20)).toBe(true);
    expect(hasGrammarQuiz("simple-future", 21)).toBe(false);
    expect(hasGrammarQuiz("simple-present", 1)).toBe(true);
    expect(hasGrammarQuiz("simple-present", 20)).toBe(true);
    expect(hasGrammarQuiz("simple-present", 21)).toBe(false);
    expect(grammarDaysInWeek("past-stories", 1)).toBe(5);
    expect(grammarDaysInWeek("past-stories", 2)).toBe(5);
    expect(grammarDaysInWeek("past-stories", 3)).toBe(5);
    expect(grammarDaysInWeek("past-stories", 4)).toBe(5);
    expect(grammarDaysInWeek("past-stories", 5)).toBe(0);
    expect(grammarDaysInWeek("mixed-tenses", 1)).toBe(5);
    expect(grammarDaysInWeek("mixed-tenses", 4)).toBe(5);
    expect(grammarDaysInWeek("basic-zero", 1)).toBe(0);
    expect(grammarDaysInWeek("basic-zero", 2)).toBe(5);
    expect(grammarDaysInWeek("eagles-week-1", 1)).toBe(5);
    expect(grammarDaysInWeek("eagles-week-1", 2)).toBe(0);
    expect(grammarDaysInWeek("basic-zero", 4)).toBe(5);
    expect(grammarDaysInWeek("simple-future", 1)).toBe(5);
    expect(grammarDaysInWeek("simple-future", 4)).toBe(5);
    expect(grammarDaysInWeek("simple-present", 1)).toBe(5);
    expect(grammarDaysInWeek("simple-present", 4)).toBe(5);
  });

  it("sube la meta diaria a 450 y la semanal a 2250 solo en esa cohorte", () => {
    expect(dailyGoal(true, true)).toBe(450);
    expect(dailyGoal(true)).toBe(300);
    expect(dailyGoal(false)).toBe(150);
    expect(attainableWeeklyGoal(5, 5)).toBe(2250);
    expect(attainableWeeklyGoal(5, 0)).toBe(1500);
    expect(attainableWeeklyGoal(0, 0)).toBe(750);
  });
});
