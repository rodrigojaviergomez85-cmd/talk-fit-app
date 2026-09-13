import { describe, expect, it } from "vitest";
import { STORYBOOK_EPISODES } from "./index";
import { compareStorySay } from "@/lib/story-say-match";

const season2 = STORYBOOK_EPISODES.filter((e) => e.id.startsWith("vale-s2-"));

describe("season 2 personal questions", () => {
  it("covers every season 2 episode", () => {
    expect(season2.length).toBe(20);
  });

  it("has at least two open personal questions per episode", () => {
    for (const episode of season2) {
      const personal = episode.quizzes.filter((q) => q.sayItAskEn);
      expect(`${episode.id}:${personal.length}`).toBe(`${episode.id}:2`);
      for (const quiz of personal) {
        expect(quiz.sayItAskEs, episode.id).toBeTruthy();
        // Personal answers must be graded with a learner-supplied slot.
        expect(quiz.sayItCheck?.target, `${episode.id}/${quiz.id}`).toContain("*");
        expect(quiz.sayItCheck?.allowShortAnswer).toBeFalsy();
      }
    }
  });

  it("accepts a personal answer and rejects the bare frame or the question", () => {
    const target = "I’m going to study *";
    expect(compareStorySay(target, "I'm going to study math with my sister").status).toBe("good");
    expect(compareStorySay(target, "I am going to study English").status).toBe("good");
    expect(compareStorySay(target, "I'm going to study").status).toBe("tryAgain");
    expect(compareStorySay(target, "What are you going to study tomorrow?").status).toBe("tryAgain");
    expect(compareStorySay(target, "").status).toBe("tryAgain");
  });
});
