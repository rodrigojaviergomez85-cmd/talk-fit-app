import { describe, expect, it } from "vitest";
import { GRAMMAR_QUIZZES, GRAMMAR_ITEMS_PER_QUIZ, GRAMMAR_PASS_SCORE, getGrammarQuiz } from "./index";
import { isItemCorrect } from "@/lib/grammar-quiz.functions";
import { grammarDaysInWeek, hasGrammarQuiz } from "@/lib/grammar-quiz-manifest";
import { attainableWeeklyGoal, dailyGoal } from "@/lib/league";

describe("paso 3 · gramática — banco de ítems", () => {
  it("cubre Basic 3 y Basic 4 completos, días 1 a 20, con 20 ítems cada uno", () => {
    expect(GRAMMAR_QUIZZES).toHaveLength(40);
    for (const moduleId of ["past-stories", "mixed-tenses"]) {
      for (const day of Array.from({ length: 20 }, (_, i) => i + 1)) {
        const quiz = getGrammarQuiz(moduleId, day);
        expect(quiz, `${moduleId} day ${day}`).toBeDefined();
        expect(quiz!.items).toHaveLength(GRAMMAR_ITEMS_PER_QUIZ);
      }
    }
    expect(getGrammarQuiz("past-stories", 21)).toBeUndefined();
    expect(getGrammarQuiz("mixed-tenses", 21)).toBeUndefined();
    expect(getGrammarQuiz("basic-zero", 1)).toBeUndefined();
  });

  it("mezcla los tres formatos en cada día", () => {
    for (const quiz of GRAMMAR_QUIZZES) {
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
        } else {
          expect([...item.pieces].sort()).toEqual([...item.answer].sort());
          expect(item.pieces).not.toEqual(item.answer);
        }
      }
    }
    expect(ids.size).toBe(400);
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
      } else {
        expect(isItemCorrect(item, item.answer)).toBe(true);
        expect(isItemCorrect(item, item.pieces)).toBe(false);
        expect(isItemCorrect(item, item.answer.slice(0, 2))).toBe(false);
      }
    }
  });

  it("aprueba con 16 de 20", () => {
    expect(GRAMMAR_PASS_SCORE).toBe(16);
    expect(15 >= GRAMMAR_PASS_SCORE).toBe(false);
    expect(16 >= GRAMMAR_PASS_SCORE).toBe(true);
  });
});

describe("paso 3 · gramática — liga", () => {
  it("solo el piloto Basic 3 tiene tercera actividad", () => {
    expect(hasGrammarQuiz("past-stories", 1)).toBe(true);
    expect(hasGrammarQuiz("past-stories", 5)).toBe(true);
    expect(hasGrammarQuiz("past-stories", 6)).toBe(true);
    expect(hasGrammarQuiz("past-stories", 20)).toBe(true);
    expect(hasGrammarQuiz("past-stories", 21)).toBe(false);
    expect(hasGrammarQuiz("basic-zero", 1)).toBe(false);
    expect(grammarDaysInWeek("past-stories", 1)).toBe(5);
    expect(grammarDaysInWeek("past-stories", 2)).toBe(5);
    expect(grammarDaysInWeek("past-stories", 3)).toBe(5);
    expect(grammarDaysInWeek("past-stories", 4)).toBe(5);
    expect(grammarDaysInWeek("past-stories", 5)).toBe(0);
    expect(grammarDaysInWeek("basic-zero", 1)).toBe(0);
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
