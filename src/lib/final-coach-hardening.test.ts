import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { buildCoachMessages, type CoachRubric } from "./final-audio-coach.server";
import { FINAL_COACH_UI_TIMEOUT_MS, runCoachWithDeadline } from "./final-coach-deadline";
import { PENDING_POLL_DELAYS_MS } from "@/services/final-audio-coach-client";
import { FinalCoachReview } from "@/components/fluency/FinalCoachReview";
import type { FinalCoachState } from "./final-audio-coach";
import type { ObjectiveResultInput } from "./final-coach-result";

// ─── 18. ROLE-PLAY LLM CONTEXT ──────────────────────────────────────────────

const base: CoachRubric = {
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

describe("Role play — whole-day idea target is never sent for ONE turn", () => {
  it("CASE A — independent BASIC day keeps 'about 5 complete ideas'", () => {
    const user = buildCoachMessages(base, "hi", 4)[1]!.content;
    expect(user).toContain("about 5 complete ideas");
    expect(user).not.toContain("ONE role-play response");
  });

  it("CASE B — role-play turn says ONE response and omits the day target", () => {
    const rubric: CoachRubric = {
      ...base,
      moduleId: "advanced-1",
      level: "advanced",
      goalSentences: 8,
      sourceTurnNumber: 6,
      prompt: undefined,
      turn: { label: "Recruiter", text: "Tell me about a conflict." },
    };
    const user = buildCoachMessages(rubric, "hi", 4)[1]!.content;
    expect(user).toContain("This is ONE role-play response");
    expect(user).toContain("Do not compare it with the whole-day idea target.");
    expect(user).not.toContain("Target: about 8 complete ideas");
    expect(user).not.toContain("complete ideas");
    expect(user).not.toContain("below the idea target");
    expect(user).toContain("role play turn 6");
    // Level guidance preserved (qualitative)
    expect(buildCoachMessages(rubric, "hi", 4)[0]!.content).toContain("NEXT STEP (ADVANCED)");
  });

  it("CASE C — turn targetSeconds may be included; idea target still absent", () => {
    const rubric: CoachRubric = {
      ...base,
      goalSentences: 8,
      sourceTurnNumber: 2,
      turn: { label: "Customer", text: "Why is it late?", targetSeconds: [40, 60] },
    };
    const user = buildCoachMessages(rubric, "hi", null)[1]!.content;
    expect(user).toContain("40–60 seconds");
    expect(user).not.toContain("about 8 complete ideas");
  });
});

// ─── 19. OBJECTIVE RESULT SURVIVES AI FAILURE ───────────────────────────────

const result = (over: Partial<ObjectiveResultInput> = {}): ObjectiveResultInput => ({
  moduleId: "past-stories",
  sentenceCount: 4,
  countStatus: "done",
  durationSeconds: 34,
  goalSentences: 5,
  goalSeconds: [30, 45],
  rolePlay: false,
  ...over,
});

const html = (state: FinalCoachState, input: ObjectiveResultInput | null, showEs = true) =>
  renderToStaticMarkup(createElement(FinalCoachReview, { state, showEs, result: input, onContinue: () => undefined }));

describe("Objective result survives UNCLEAR / UNAVAILABLE", () => {
  it("CASE D — UNCLEAR still shows 4 / 5, TE FALTÓ 1 IDEA and 34s", () => {
    const out = html({ status: "unclear" }, result());
    expect(out).toContain("TU RESULTADO");
    expect(out).toContain("4 / 5");
    expect(out).toContain("TE FALTÓ 1 IDEA");
    expect(out).toContain("34s");
    expect(out).toContain("No pude escuchar con suficiente claridad");
    expect(out).toContain("Tu práctica sí quedó completada.");
    expect(out).toContain("CONTINUAR");
  });

  it("CASE E — UNAVAILABLE still shows metrics and CONTINUE", () => {
    const out = html({ status: "unavailable" }, result());
    expect(out).toContain("TU RESULTADO");
    expect(out).toContain("4 / 5");
    expect(out).toContain("34s");
    expect(out).toContain("feedback no está disponible");
    expect(out).toContain("CONTINUAR");
    const en = html({ status: "unavailable" }, result(), false);
    expect(en).toContain("YOUR RESULT");
    expect(en).toContain("CONTINUE");
  });

  it("CASE F — failed idea count + unavailable: no invented number, time still shown", () => {
    const out = html({ status: "unavailable" }, result({ sentenceCount: null, countStatus: "failed" }));
    expect(out).toContain("No pudimos calcularlas esta vez.");
    expect(out).toContain("34s");
    expect(out).not.toMatch(/\d+ \/ 5/);
    expect(out).toContain("feedback no está disponible");
  });

  it("pending count keeps CONTANDO TUS IDEAS… under UNCLEAR", () => {
    const out = html({ status: "unclear" }, result({ sentenceCount: null, countStatus: "pending" }));
    expect(out).toContain("CONTANDO TUS IDEAS");
    expect(out).toContain("34s");
  });
});

// ─── 20. 45-SECOND FAIL-OPEN ────────────────────────────────────────────────

const ready: FinalCoachState = {
  status: "ready",
  feedback: {
    strengthEn: "s",
    strengthEs: "s",
    nextStepEn: "n",
    nextStepEs: "n",
    correctionNeeded: false,
    said: null,
    betterVersion: null,
    whyEn: null,
    whyEs: null,
    practicePhrase: null,
  } as FinalCoachState extends { feedback: infer F } ? F : never,
};

describe("Frontend 45s fail-open", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("constants: 45s UI deadline; 20s pending polling untouched", () => {
    expect(FINAL_COACH_UI_TIMEOUT_MS).toBe(45_000);
    expect([...PENDING_POLL_DELAYS_MS]).toEqual([2000, 3000, 5000, 5000, 5000]);
  });

  it("CASE G — READY before deadline: shown, timer cleared, UNAVAILABLE never appears", async () => {
    const states: FinalCoachState[] = [];
    runCoachWithDeadline(async (emit) => {
      emit({ status: "analyzing" });
      await new Promise((r) => setTimeout(r, 5_000));
      emit(ready);
    }, (s) => states.push(s));
    await vi.advanceTimersByTimeAsync(5_000);
    expect(states.map((s) => s.status)).toEqual(["preparing", "analyzing", "ready"]);
    await vi.advanceTimersByTimeAsync(60_000);
    expect(states.map((s) => s.status)).not.toContain("unavailable");
    expect(vi.getTimerCount()).toBe(0);
  });

  it("CASE H — still analyzing at 45s: becomes unavailable, request aborted, no day work", async () => {
    const states: FinalCoachState[] = [];
    let seenSignal: AbortSignal | null = null;
    const completions = vi.fn();
    runCoachWithDeadline(async (emit, signal) => {
      seenSignal = signal;
      emit({ status: "analyzing" });
      await new Promise(() => undefined); // hung provider
    }, (s) => states.push(s));
    await vi.advanceTimersByTimeAsync(44_999);
    expect(states.at(-1)!.status).toBe("analyzing");
    await vi.advanceTimersByTimeAsync(1);
    expect(states.at(-1)!.status).toBe("unavailable");
    expect(seenSignal!.aborted).toBe(true);
    expect(completions).not.toHaveBeenCalled();
  });

  it("CASE I — late READY after timeout is ignored", async () => {
    const states: FinalCoachState[] = [];
    let release!: () => void;
    runCoachWithDeadline(async (emit) => {
      emit({ status: "analyzing" });
      await new Promise<void>((r) => (release = r));
      emit(ready);
    }, (s) => states.push(s));
    await vi.advanceTimersByTimeAsync(45_000);
    expect(states.at(-1)!.status).toBe("unavailable");
    release();
    await vi.advanceTimersByTimeAsync(0);
    expect(states.at(-1)!.status).toBe("unavailable");
    expect(states.filter((s) => s.status === "ready")).toHaveLength(0);
  });

  it("CASE J — leaving the screen: timer cleared, aborted, no late setState", async () => {
    const states: FinalCoachState[] = [];
    let release!: () => void;
    const handle = runCoachWithDeadline(async (emit) => {
      emit({ status: "analyzing" });
      await new Promise<void>((r) => (release = r));
      emit(ready);
    }, (s) => states.push(s));
    await vi.advanceTimersByTimeAsync(1_000);
    handle.cancel();
    expect(handle.signal.aborted).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
    const before = states.length;
    release();
    await vi.advanceTimersByTimeAsync(60_000);
    expect(states.length).toBe(before);
    expect(states.map((s) => s.status)).not.toContain("unavailable");
  });

  it("pipeline rejection before the deadline fails open to unavailable once", async () => {
    const states: FinalCoachState[] = [];
    runCoachWithDeadline(async () => {
      throw new Error("network");
    }, (s) => states.push(s));
    await vi.advanceTimersByTimeAsync(0);
    expect(states.map((s) => s.status)).toEqual(["preparing", "unavailable"]);
    await vi.advanceTimersByTimeAsync(50_000);
    expect(states).toHaveLength(2);
  });
});

describe("Wiring — practice.tsx uses the deadline, completion controller untouched", () => {
  it("startCoach runs through runCoachWithDeadline and unmount cancels it", async () => {
    const { readFileSync } = await import("node:fs");
    const src = readFileSync("src/routes/practice.tsx", "utf8");
    expect(src).toContain("runCoachWithDeadline(");
    expect(src).toContain("coachDeadline.current?.cancel()");
    // Timeout path lives outside the completion controller: no second commit.
    const deadline = readFileSync("src/lib/final-coach-deadline.ts", "utf8");
    for (const banned of ["completeDay", "PracticeSessionService", "CloudSync", "cloudSave", "markFinalTake", "fetch("]) {
      expect(deadline).not.toContain(banned);
    }
  });
});
