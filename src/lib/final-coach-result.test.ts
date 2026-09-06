import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { coachLevelFor, objectiveResult, objectiveResultInputFor, objectiveResultText, type ObjectiveResultInput } from "./final-coach-result";
import { buildCoachMessages, type CoachRubric } from "./final-audio-coach.server";

const basic = (over: Partial<ObjectiveResultInput> = {}): ObjectiveResultInput => ({
  moduleId: "past-stories",
  sentenceCount: 4,
  countStatus: "done",
  durationSeconds: 34,
  goalSentences: 5,
  goalSeconds: [30, 45],
  rolePlay: false,
  ...over,
});

const text = (input: ObjectiveResultInput, es = true) => objectiveResultText(objectiveResult(input), es);

describe("Objective result — level mapping", () => {
  it("groups the nine modules into basic / intermediate / advanced", () => {
    for (const m of ["basic-zero", "simple-future", "simple-present", "past-stories", "mixed-tenses"]) expect(coachLevelFor(m)).toBe("basic");
    for (const m of ["eagles-week-1", "tigers", "sharks"]) expect(coachLevelFor(m)).toBe("intermediate");
    expect(coachLevelFor("advanced-1")).toBe("advanced");
  });
});

describe("TESTS 24 — BASIC ideas", () => {
  it("4 / 5 → TE FALTÓ 1 IDEA (singular)", () => {
    const t = text(basic({ sentenceCount: 4 }));
    expect(t.heading).toBe("TU RESULTADO");
    expect(t.ideasPrimary).toBe("4 / 5 IDEAS COMPLETAS");
    expect(t.ideasSecondary).toBe("TE FALTÓ 1 IDEA");
    expect(t.nextStepLabel).toBe("➕ PARA COMPLETAR TU META");
    const en = text(basic({ sentenceCount: 4 }), false);
    expect(en.ideasPrimary).toBe("4 / 5 COMPLETE IDEAS");
    expect(en.ideasSecondary).toBe("YOU NEEDED 1 MORE IDEA");
    expect(en.nextStepLabel).toBe("➕ TO COMPLETE YOUR GOAL");
  });
  it("3 / 5 → TE FALTARON 2 IDEAS (plural)", () => {
    const t = text(basic({ sentenceCount: 3 }));
    expect(t.ideasPrimary).toBe("3 / 5 IDEAS COMPLETAS");
    expect(t.ideasSecondary).toBe("TE FALTARON 2 IDEAS");
    expect(text(basic({ sentenceCount: 3 }), false).ideasSecondary).toBe("YOU NEEDED 2 MORE IDEAS");
  });
  it("7 / 5 → META SUPERADA ✓ and the label becomes SIGUIENTE RETO", () => {
    const t = text(basic({ sentenceCount: 7 }));
    expect(t.ideasPrimary).toBe("7 / 5 IDEAS COMPLETAS");
    expect(t.ideasSecondary).toBe("META SUPERADA ✓");
    expect(t.nextStepLabel).toBe("🚀 SIGUIENTE RETO");
    expect(text(basic({ sentenceCount: 7 }), false).ideasSecondary).toBe("GOAL EXCEEDED ✓");
  });
  it("5 / 5 → META LOGRADA ✓", () => {
    expect(text(basic({ sentenceCount: 5 })).ideasSecondary).toBe("META LOGRADA ✓");
  });
  it("never calls them sentences and shows no scores", () => {
    const t = text(basic());
    const all = Object.values(t).join(" ");
    expect(all.toLowerCase()).not.toContain("oracion");
    expect(all.toLowerCase()).not.toContain("sentence");
    expect(all).not.toContain("%");
  });
});

describe("TESTS 25 — time", () => {
  it("24s with a 30s minimum → TE FALTARON 6s", () => {
    const t = text(basic({ durationSeconds: 24, goalSeconds: [30, 30] }));
    expect(t.timePrimary).toBe("24s HABLANDO");
    expect(t.timeGoal).toBe("META: 30s+");
    expect(t.timeStatus).toBe("TE FALTARON 6s");
    expect(text(basic({ durationSeconds: 24, goalSeconds: [30, 30] }), false).timeStatus).toBe("6s MORE NEEDED");
  });
  it("35s → TIEMPO LOGRADO ✓; above the range is not punished", () => {
    expect(text(basic({ durationSeconds: 35, goalSeconds: [30, 45] })).timeStatus).toBe("TIEMPO LOGRADO ✓");
    expect(text(basic({ durationSeconds: 35, goalSeconds: [30, 45] })).timeGoal).toBe("META: 30–45s");
    expect(text(basic({ durationSeconds: 52, goalSeconds: [30, 45] })).timeStatus).toBe("TIEMPO LOGRADO ✓");
    expect(text(basic({ durationSeconds: 29, goalSeconds: [30, 45] })).timeStatus).toBe("TE FALTÓ 1s");
  });
});

describe("TESTS 26 — pending / failed count", () => {
  it("pending → CONTANDO TUS IDEAS…, then the SAME input with the resolved count → 5 / 5 META LOGRADA ✓", () => {
    const pending = text(basic({ countStatus: "pending", sentenceCount: null }));
    expect(pending.ideasPrimary).toBe("CONTANDO TUS IDEAS…");
    expect(pending.ideasSecondary).toBeNull();
    expect(pending.timeStatus).toBe("TIEMPO LOGRADO ✓");
    expect(text(basic({ countStatus: "pending", sentenceCount: null }), false).ideasPrimary).toBe("COUNTING YOUR IDEAS…");
    const done = text(basic({ countStatus: "done", sentenceCount: 5 }));
    expect(done.ideasPrimary).toBe("5 / 5 IDEAS COMPLETAS");
    expect(done.ideasSecondary).toBe("META LOGRADA ✓");
  });
  it("failed → IDEAS / No pudimos calcularlas esta vez. (no invented number)", () => {
    const t = text(basic({ countStatus: "failed", sentenceCount: null }));
    expect(t.ideasPrimary).toBe("IDEAS");
    expect(t.ideasSecondary).toBe("No pudimos calcularlas esta vez.");
    expect(t.ideasPrimary).not.toMatch(/\d/);
    expect(text(basic({ countStatus: "failed", sentenceCount: null }), false).ideasSecondary).toBe("We couldn't calculate them this time.");
  });
});

describe("TESTS 27 — INTERMEDIATE", () => {
  it("renders the objective result and uses DESARROLLA MÁS below target, SIGUIENTE RETO when met", () => {
    for (const moduleId of ["eagles-week-1", "tigers", "sharks"]) {
      const below = text(basic({ moduleId, sentenceCount: 5, goalSentences: 7, durationSeconds: 58 }));
      expect(below.ideasPrimary).toBe("5 / 7 IDEAS COMPLETAS");
      expect(below.ideasSecondary).toBe("TE FALTARON 2 IDEAS");
      expect(below.timePrimary).toBe("58s HABLANDO");
      expect(below.nextStepLabel).toBe("➕ DESARROLLA MÁS");
      expect(text(basic({ moduleId, sentenceCount: 5, goalSentences: 7 }), false).nextStepLabel).toBe("➕ DEVELOP MORE");
      expect(text(basic({ moduleId, sentenceCount: 7, goalSentences: 7 })).nextStepLabel).toBe("🚀 SIGUIENTE RETO");
    }
  });
  it("intermediate role-play turn keeps DESARROLLA MÁS (qualitative development, no day-goal comparison)", () => {
    const t = text(basic({ moduleId: "tigers", rolePlay: true, sentenceCount: 3, goalSentences: 7 }));
    expect(t.heading).toBe("TU RESPUESTA FINAL");
    expect(t.ideasPrimary).toBe("3 IDEAS COMPLETAS");
    expect(t.ideasSecondary).toBeNull();
    expect(t.nextStepLabel).toBe("➕ DESARROLLA MÁS");
  });
  it("the LLM prompt asks intermediate levels to develop (reason/example/comparison/reaction), not add a random sentence", () => {
    const rubric = (level: CoachRubric["level"], moduleId: string): CoachRubric => ({
      moduleId,
      day: 3,
      level,
      moduleLabel: "X",
      topic: "t",
      focus: "f",
      sourceTurnNumber: null,
      goalSeconds: [45, 60],
      goalSentences: 7,
      coachVersion: "v2",
      prompt: { question: "Q?" },
    });
    const sys = (level: CoachRubric["level"], m: string) => buildCoachMessages(rubric(level, m), "hello", 5)[0]!.content;
    expect(sys("eagles", "eagles-week-1")).toMatch(/because \/ so \/ for example/);
    expect(sys("tigers", "tigers")).toMatch(/compare, justify/);
    expect(sys("sharks", "sharks")).toMatch(/react, adapt/);
    for (const [l, m] of [["eagles", "eagles-week-1"], ["tigers", "tigers"], ["sharks", "sharks"]] as const)
      expect(sys(l, m)).toContain("Never 'add another sentence'");
  });
});

describe("TESTS 28 — ADVANCED / role play", () => {
  it("Pressure Round Final Take: TU RESPUESTA FINAL · 4 IDEAS COMPLETAS · 42s HABLANDO, never 4 / goal", () => {
    const t = text(basic({ moduleId: "advanced-1", rolePlay: true, sentenceCount: 4, durationSeconds: 42, goalSentences: 8, goalSeconds: [75, 100] }));
    expect(t.heading).toBe("TU RESPUESTA FINAL");
    expect(t.ideasPrimary).toBe("4 IDEAS COMPLETAS");
    expect(t.ideasSecondary).toBeNull();
    expect(t.timePrimary).toBe("42s HABLANDO");
    expect(t.timeFirst).toBe(true);
    // No whole-day goal applied to a single turn.
    expect(t.timeGoal).toBeNull();
    expect(t.timeStatus).toBeNull();
    expect(Object.values(t).join(" ")).not.toContain("4 / 8");
    expect(Object.values(t).join(" ")).not.toContain("FALTARON");
    expect(t.nextStepLabel).toBe("🚀 LLEVA TU RESPUESTA MÁS LEJOS");
    expect(text(basic({ moduleId: "advanced-1", rolePlay: true }), false).heading).toBe("YOUR FINAL RESPONSE");
  });
  it("an explicit per-turn speaking range IS applied to that turn", () => {
    const t = text(basic({ moduleId: "advanced-1", rolePlay: true, durationSeconds: 42, turnTargetSeconds: [45, 60] }));
    expect(t.timeGoal).toBe("META: 45–60s");
    expect(t.timeStatus).toBe("TE FALTARON 3s");
  });
  it("advanced independent day: TU PRODUCCIÓN de-emphasises the denominator", () => {
    const t = text(basic({ moduleId: "advanced-1", sentenceCount: 7, durationSeconds: 68, goalSentences: 8 }));
    expect(t.heading).toBe("TU PRODUCCIÓN");
    expect(t.ideasPrimary).toBe("7 IDEAS COMPLETAS");
    expect(t.ideasSecondary).toBeNull();
    expect(t.timePrimary).toBe("68s HABLANDO");
    expect(text(basic({ moduleId: "advanced-1" }), false).heading).toBe("YOUR OUTPUT");
  });
  it("objectiveResultInputFor derives role-play context from the day + source turn", () => {
    const day = { goalSentences: 8, goalSeconds: [75, 100] as [number, number], rep5Turns: [
      { id: "a", label: "R", labelEs: "R", text: "x", es: "x", targetSeconds: [20, 40] as [number, number] },
      { id: "b", label: "R", labelEs: "R", text: "y", es: "y" },
    ] };
    const rec = { sentenceCount: 4, countStatus: "done" as const, durationSeconds: 42 };
    expect(objectiveResultInputFor("advanced-1", day, rec, 1)).toMatchObject({ rolePlay: true, turnTargetSeconds: [20, 40] });
    expect(objectiveResultInputFor("advanced-1", day, rec, 2)).toMatchObject({ rolePlay: true, turnTargetSeconds: null });
    expect(objectiveResultInputFor("past-stories", { ...day, rep5Turns: undefined }, rec, null)).toMatchObject({ rolePlay: false, goalSentences: 8 });
  });
});

describe("Level-aware LLM next step (single existing prompt, no extra call)", () => {
  const rubric: CoachRubric = {
    moduleId: "past-stories",
    day: 3,
    level: "basic",
    moduleLabel: "BASIC 3",
    topic: "t",
    focus: "past",
    sourceTurnNumber: null,
    goalSeconds: [30, 45],
    goalSentences: 5,
    coachVersion: "v2",
    prompt: { question: "Q?" },
  };
  it("BASIC asks for one concrete idea/chunk with an example and forbids vague steps", () => {
    const sys = buildCoachMessages(rubric, "hi", 4)[0]!.content;
    expect(sys).toContain("NEXT STEP (BASIC)");
    expect(sys).toContain("Never vague");
    expect(sys).toContain("I visited my friends at seven.");
  });
  it("below the idea target: nudges ADD ONE useful idea without stating how many are missing", () => {
    const user = buildCoachMessages(rubric, "hi", 4)[1]!.content;
    expect(user).toContain("ADD ONE useful idea");
    expect(user).not.toMatch(/\b1 (idea|more)/);
    expect(buildCoachMessages(rubric, "hi", 5)[1]!.content).not.toContain("ADD ONE useful idea");
    expect(buildCoachMessages(rubric, "hi", null)[1]!.content).not.toContain("ADD ONE useful idea");
  });
  it("role-play turns are never nudged against the whole-day idea goal", () => {
    const turnRubric: CoachRubric = {
      ...rubric,
      moduleId: "advanced-1",
      level: "advanced",
      sourceTurnNumber: 1,
      turn: { label: "Recruiter", text: "Tell me about yourself." },
    };
    expect(buildCoachMessages(turnRubric, "hi", 2)[1]!.content).not.toContain("ADD ONE useful idea");
    expect(buildCoachMessages(turnRubric, "hi", 2)[0]!.content).toContain("NEXT STEP (ADVANCED)");
  });
});

describe("Wiring — practice.tsx / FinalCoachReview (0 extra AI calls)", () => {
  const practice = readFileSync("src/routes/practice.tsx", "utf8");
  const review = readFileSync("src/components/fluency/FinalCoachReview.tsx", "utf8");
  const resultModule = readFileSync("src/lib/final-coach-result.ts", "utf8");
  it("the review reads the LIVE take (pending → done updates locally) and passes result to FinalCoachReview", () => {
    expect(practice).toContain("result={coachResultInput}");
    expect(practice).toMatch(/takes\.findIndex\(\(take\) => take\?\.id === finalRecording\.id\)/);
    expect(practice.match(/runFinalCoachPipeline\(/g)).toHaveLength(1);
    // Two call sites: the normal take + the pilot retake (explicit learner action only). No counting on review render.
    expect(practice.match(/void countSentences\(/g)).toHaveLength(2);
  });
  it("the result module never imports fetch/AI/server code", () => {
    expect(resultModule).not.toMatch(/fetch\(|final-audio-coach\.server|countSentences|sentence-count/);
  });
  it("the review always renders the next-step section, before CONTINUE, and result before STRONG POINT", () => {
    const ready = review.slice(review.indexOf('testId="final-coach-ready"'));
    expect(ready.indexOf("ObjectiveResultBlock")).toBeLessThan(ready.indexOf("PUNTO FUERTE"));
    expect(ready.indexOf('testId="final-coach-next-step"')).toBeGreaterThan(ready.indexOf('testId="final-coach-correction"'));
    expect(ready.indexOf('testId="final-coach-next-step"')).toBeLessThan(ready.indexOf("<ContinueButton"));
    expect(review).not.toMatch(/\b(A1|A2|B1|B2|C1|C2)\b/);
  });
});
