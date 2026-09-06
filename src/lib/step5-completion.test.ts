import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createStep5CompletionController } from "./step5-completion";

const read = (p: string) => readFileSync(join(process.cwd(), p), "utf8");

function harness() {
  const log: string[] = [];
  let completeDayCalls = 0;
  let coachStarts = 0;
  let dayCompleteShown = false;
  let reviewActive = false;
  const controller = createStep5CompletionController<{ id: number }>({
    commitDay: () => {
      completeDayCalls += 1;
      log.push("completeDay");
      return { id: completeDayCalls };
    },
    clearSession: () => log.push("clearSession"),
    completeSession: () => log.push("completeSession"),
    cloudSave: (c) => log.push(`cloudSave:${c.id}`),
    onReviewActive: () => {
      reviewActive = true;
      log.push("coachReviewActive");
    },
    startCoach: (c) => {
      coachStarts += 1;
      log.push(`coach:${c.id}`);
    },
    onDayComplete: () => {
      dayCompleteShown = true;
      log.push("dayComplete");
    },
  });
  return {
    controller,
    log,
    get completeDayCalls() {
      return completeDayCalls;
    },
    get coachStarts() {
      return coachStarts;
    },
    get dayCompleteShown() {
      return dayCompleteShown;
    },
    get reviewActive() {
      return reviewActive;
    },
  };
}

describe("STEP 5 completion — commit once, review inside Step 5, then Day Complete", () => {
  it("CASE A/B: recording takes and switching Final never touch the controller → 0 commits, 0 coach calls", () => {
    const h = harness();
    // Recording Take 1–3 and switching 1 → 2 → 3 → 1 are TakeBoard state only.
    expect(h.completeDayCalls).toBe(0);
    expect(h.coachStarts).toBe(0);
    expect(h.controller.committed).toBe(false);
    // Source guard: no effect on finalIndex / takes may start the coach.
    const practice = read("src/routes/practice.tsx");
    expect(practice).not.toMatch(/useEffect\([^)]*runFinalCoachPipeline/s);
    const board = read("src/components/fluency/TakeBoard.tsx");
    expect(board).not.toContain("final-audio-coach");
    expect(board).not.toContain("runFinalCoachPipeline");
  });

  it("CASE C: confirming commits the day, clears the session, enters the review, then starts ONE pipeline — Day Complete not shown", () => {
    const h = harness();
    expect(h.controller.confirm()).toBe(true);
    expect(h.log).toEqual(["completeDay", "clearSession", "completeSession", "cloudSave:1", "coachReviewActive", "coach:1"]);
    expect(h.reviewActive).toBe(true);
    expect(h.dayCompleteShown).toBe(false);
    expect(h.coachStarts).toBe(1);
  });

  it("idempotency: a second confirm (double tap / re-render) is a no-op — no 2nd completeDay, habit event, session clear or pipeline", () => {
    const h = harness();
    h.controller.confirm();
    expect(h.controller.confirm()).toBe(false);
    expect(h.controller.confirm()).toBe(false);
    expect(h.completeDayCalls).toBe(1);
    expect(h.coachStarts).toBe(1);
    expect(h.log.filter((l) => l === "clearSession")).toHaveLength(1);
    expect(h.log.filter((l) => l === "completeSession")).toHaveLength(1);
  });

  it("CASE E: CONTINUE after the review shows Day Complete and does NOT call completeDay again", () => {
    const h = harness();
    h.controller.confirm();
    expect(h.controller.continueToDayComplete()).toBe(true);
    expect(h.dayCompleteShown).toBe(true);
    expect(h.completeDayCalls).toBe(1);
    expect(h.coachStarts).toBe(1);
    // A second CONTINUE is harmless.
    expect(h.controller.continueToDayComplete()).toBe(false);
    expect(h.completeDayCalls).toBe(1);
  });

  it("CONTINUE before any commit does nothing (Day Complete is only reachable through a committed review)", () => {
    const h = harness();
    expect(h.controller.continueToDayComplete()).toBe(false);
    expect(h.dayCompleteShown).toBe(false);
  });

  it("CASE F/G/22: AI outcome never affects the commit — closing during analysis loses nothing", () => {
    const h = harness();
    h.controller.confirm();
    // Whatever the pipeline resolves to (unclear / unavailable / aborted on unmount), the day stays committed.
    expect(h.controller.committed).toBe(true);
    expect(h.log[0]).toBe("completeDay");
    expect(h.log.indexOf("completeDay")).toBeLessThan(h.log.indexOf("coach:1"));
  });
});

describe("STEP 5 completion — wiring in practice.tsx and Day Complete", () => {
  const practice = read("src/routes/practice.tsx");
  const dayComplete = read("src/components/fluency/DayCompleteScreen.tsx");
  const review = read("src/components/fluency/FinalCoachReview.tsx");

  it("practice.tsx commits through the controller ref and renders the review INSIDE stage 5 while the TakeBoard is hidden", () => {
    expect(practice).toContain("completionCommittedRef");
    expect(practice).toContain("createStep5CompletionController");
    expect(practice).toMatch(/stage === 5 && coachReviewActive \?/);
    expect(practice).toMatch(/stage === 5 && !coachReviewActive \?/);
    expect(practice).toContain("<FinalCoachReview state={coachState}");
    // CONTINUE advances the UI only.
    expect(practice).toContain("onDayComplete: () => setDone(true)");
    expect(practice).toContain("onContinue={continueToDayComplete}");
    // The commit itself is the single JourneyService.completeDay call site in the flow.
    expect(practice.match(/JourneyService\.completeDay\(/g)).toHaveLength(1);
    // The guarantee re-upload semantics from Prompt 2.1.1 are untouched.
    expect(read("src/services/final-audio-coach-client.ts")).toContain("preserveExistingIdeaCount: true");
  });

  it("CASE 23: DayCompleteScreen no longer renders the AI Coach (no duplicate feedback)", () => {
    expect(dayComplete).not.toContain("FinalCoachCard");
    expect(dayComplete).not.toContain("FinalCoachReview");
    expect(dayComplete).not.toContain("coachState");
    // Celebration + audio comparison + progress remain.
    expect(dayComplete).toContain("GREAT JOB!");
    expect(dayComplete).toContain("Compare today's practice");
    expect(dayComplete).toContain("Listen to my final audio");
    expect(dayComplete).toContain("Listen to my first audio");
  });

  it("CASE 20/21: the review has no abstract status chips, no scores, and hides CONTINUE while analyzing", () => {
    expect(review).not.toContain("TARGET ENGLISH");
    expect(review).not.toContain("ORGANIZATION");
    expect(review).not.toContain("%");
    expect(review).not.toMatch(/\b(A1|A2|B1|B2|C1|C2)\b/);
    // Loading branch returns before any ContinueButton is rendered.
    const loading = review.slice(review.indexOf('testId="final-coach-loading"'), review.indexOf('testId="final-coach-unclear"'));
    expect(loading).not.toContain("ContinueButton");
    expect(review).toContain("Analizando tu Audio Final…");
    expect(review).toContain("No pude escuchar con suficiente claridad para darte una corrección útil hoy.");
    expect(review).toContain("Tu práctica quedó guardada, pero el feedback no está disponible en este momento.");
  });
});
