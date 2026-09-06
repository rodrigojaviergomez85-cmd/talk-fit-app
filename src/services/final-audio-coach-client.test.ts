import { describe, expect, it } from "vitest";
import {
  PENDING_POLL_DELAYS_MS,
  runFinalCoachPipeline,
  type CoachHttpResult,
  type CoachPipelineDeps,
} from "./final-audio-coach-client";
import { coachStatusLabels } from "@/components/fluency/FinalCoachCard";
import type { FinalAudioCoachFeedback, FinalCoachState } from "@/lib/final-audio-coach";
import type { Recording, RolePlayTurn } from "@/lib/types";

const FEEDBACK: FinalAudioCoachFeedback = {
  taskCompleted: true,
  targetLanguage: "good",
  organization: "developing",
  strengthEn: "You connected your ideas clearly.",
  strengthEs: "Conectaste tus ideas con claridad.",
  nextStepEn: "Add one reason using because.",
  nextStepEs: "Agrega una razón usando because.",
};

function rec(id: string, label?: string): Recording {
  return { id, url: `blob:${id}`, durationSeconds: 12, createdAt: new Date().toISOString(), ...(label ? { label } : {}) } as Recording;
}

type Harness = {
  deps: CoachPipelineDeps;
  calls: { upload: unknown[]; mark: unknown[]; coach: unknown[]; sleeps: number[] };
  states: FinalCoachState[];
};

function harness(opts: {
  uploadOk?: boolean;
  markOk?: boolean;
  responses?: CoachHttpResult[];
}): Harness {
  const calls = { upload: [] as unknown[], mark: [] as unknown[], coach: [] as unknown[], sleeps: [] as number[] };
  const queue = [...(opts.responses ?? [])];
  const deps: CoachPipelineDeps = {
    uploadFinalTake: async (input) => {
      calls.upload.push(input);
      return { ok: opts.uploadOk ?? true };
    },
    markFinalTake: async (m, d, t) => {
      calls.mark.push({ m, d, t });
      return opts.markOk ?? true;
    },
    requestCoach: async (input) => {
      calls.coach.push(input);
      return queue.shift() ?? { kind: "response", http: 500, body: null };
    },
    sleep: async (ms) => {
      calls.sleeps.push(ms);
    },
  };
  return { deps, calls, states: [] };
}

const ready: CoachHttpResult = { kind: "response", http: 200, body: { status: "ready", feedback: FEEDBACK } };
const pending: CoachHttpResult = { kind: "response", http: 202, body: { status: "pending" } };
const classicDay = { day: 3, rep5Turns: undefined };
const turns = (n: number): RolePlayTurn[] => Array.from({ length: n }, (_, i) => ({ en: `Q${i + 1}`, es: `P${i + 1}` })) as RolePlayTurn[];

/**
 * Cost invariant for CASES 1, 2 and 25: the coach module is only entered via
 * runFinalCoachPipeline at COMPLETE DAY. Recording / counting / playing /
 * selecting takes never import or call it — asserted by source inspection.
 */
describe("Final Audio selection costs 0 AI calls (CASE 1, 2)", () => {
  it("TakeBoard and the take handlers never reference the coach endpoint", async () => {
    const fs = await import("node:fs");
    const takeBoard = fs.readFileSync("src/components/fluency/TakeBoard.tsx", "utf8");
    expect(takeBoard).not.toMatch(/final-audio-coach/);
    const practice = fs.readFileSync("src/routes/practice.tsx", "utf8");
    // onSelectFinal stays a plain selection: only setFinalIndex + setFinalManual.
    const select = /onSelectFinal=\{\(index\) => \{([\s\S]*?)\}\}/.exec(practice)?.[1] ?? "";
    expect(select).toContain("setFinalIndex(index)");
    expect(select).not.toMatch(/Coach|fetch|api/);
    // No effect keyed on finalIndex triggers the coach.
    expect(practice).not.toMatch(/useEffect\([\s\S]{0,200}finalIndex\]/);
    // runFinalCoachPipeline appears exactly once: inside finish().
    expect(practice.match(/runFinalCoachPipeline\(/g)?.length).toBe(1);
    const finishBody = practice.slice(practice.indexOf("const finish = () =>"), practice.indexOf("const countFor"));
    expect(finishBody).toContain("runFinalCoachPipeline(");
    expect(finishBody.indexOf("setDone(true)")).toBeLessThan(finishBody.indexOf("runFinalCoachPipeline("));
  });
});

describe("runFinalCoachPipeline", () => {
  it("CASE 3: upload → mark final → one request with takeNumber 2", async () => {
    const h = harness({ responses: [ready] });
    const result = await runFinalCoachPipeline(
      { moduleId: "simple-present", day: classicDay, finalRecording: rec("b"), finalTakeNumber: 2 },
      (s) => h.states.push(s),
      h.deps,
    );
    expect(h.calls.upload).toHaveLength(1);
    expect(h.calls.upload[0]).toMatchObject({ moduleId: "simple-present", day: 3, takeNumber: 2, isFinalRep: false, sourceTurnNumber: null });
    expect(h.calls.mark).toEqual([{ m: "simple-present", d: 3, t: 2 }]);
    expect(h.calls.coach).toEqual([{ moduleId: "simple-present", day: 3, takeNumber: 2 }]);
    expect(h.states.map((s) => s.status)).toEqual(["preparing", "analyzing", "ready"]);
    expect(result).toEqual({ status: "ready", feedback: FEEDBACK });
  });

  it("CASE 4: upload failure → unavailable, no mark, no AI call", async () => {
    const h = harness({ uploadOk: false, responses: [ready] });
    const result = await runFinalCoachPipeline(
      { moduleId: "simple-present", day: classicDay, finalRecording: rec("a"), finalTakeNumber: 1 },
      (s) => h.states.push(s),
      h.deps,
    );
    expect(result.status).toBe("unavailable");
    expect(h.calls.mark).toHaveLength(0);
    expect(h.calls.coach).toHaveLength(0);
  });

  it("CASE 5: markFinalTake failure → unavailable, 0 AI calls", async () => {
    const h = harness({ markOk: false, responses: [ready] });
    const result = await runFinalCoachPipeline(
      { moduleId: "simple-present", day: classicDay, finalRecording: rec("a"), finalTakeNumber: 1 },
      (s) => h.states.push(s),
      h.deps,
    );
    expect(result.status).toBe("unavailable");
    expect(h.calls.coach).toHaveLength(0);
  });

  it("CASE 6 + 7: READY maps to static labels in EN and ES without another request", () => {
    const en = coachStatusLabels(FEEDBACK, false);
    expect(en.task.text).toBe("Completed ✓");
    expect(en.targetLanguage.text).toBe("On track ✓");
    expect(en.organization.text).toBe("Developing");
    const es = coachStatusLabels(FEEDBACK, true);
    expect(es.task.text).toBe("Completada ✓");
    expect(es.targetLanguage.text).toBe("Bien encaminado ✓");
    expect(es.organization.text).toBe("En desarrollo");
    const notDone = coachStatusLabels({ ...FEEDBACK, taskCompleted: false, organization: "good" }, true);
    expect(notDone.task.text).toBe("Sigue desarrollándola");
    expect(notDone.organization.text).toBe("Bien encaminada ✓");
    // Both languages live in the same feedback object: switching is a local read.
    expect(FEEDBACK.strengthEs).toBeTruthy();
    expect(FEEDBACK.nextStepEs).toBeTruthy();
  });

  it("CASE 8: UNCLEAR → neutral state, no retry", async () => {
    const h = harness({ responses: [{ kind: "response", http: 200, body: { status: "unclear" } }, ready] });
    const result = await runFinalCoachPipeline(
      { moduleId: "simple-present", day: classicDay, finalRecording: rec("a"), finalTakeNumber: 1 },
      () => undefined,
      h.deps,
    );
    expect(result.status).toBe("unclear");
    expect(h.calls.coach).toHaveLength(1);
  });

  it("CASE 9: PENDING once then READY, bounded poll", async () => {
    const h = harness({ responses: [pending, ready] });
    const result = await runFinalCoachPipeline(
      { moduleId: "simple-present", day: classicDay, finalRecording: rec("a"), finalTakeNumber: 1 },
      (s) => h.states.push(s),
      h.deps,
    );
    expect(result.status).toBe("ready");
    expect(h.calls.coach).toHaveLength(2);
    expect(h.calls.sleeps).toEqual([2000]);
  });

  it("CASE 9b: PENDING forever stops after the bounded window", async () => {
    const h = harness({ responses: [pending, pending, pending, pending, pending, pending] });
    const result = await runFinalCoachPipeline(
      { moduleId: "simple-present", day: classicDay, finalRecording: rec("a"), finalTakeNumber: 1 },
      () => undefined,
      h.deps,
    );
    expect(result.status).toBe("unavailable");
    expect(h.calls.coach).toHaveLength(PENDING_POLL_DELAYS_MS.length + 1);
    expect(h.calls.sleeps).toEqual([...PENDING_POLL_DELAYS_MS]);
  });

  it("CASE 10: network failure retries once then fails gracefully; terminal errors never retry", async () => {
    const net = harness({ responses: [{ kind: "network_error" }, { kind: "network_error" }, ready] });
    const r1 = await runFinalCoachPipeline(
      { moduleId: "simple-present", day: classicDay, finalRecording: rec("a"), finalTakeNumber: 1 },
      () => undefined,
      net.deps,
    );
    expect(r1.status).toBe("unavailable");
    expect(net.calls.coach).toHaveLength(2);

    for (const http of [429, 404, 413, 500, 401]) {
      const h = harness({ responses: [{ kind: "response", http, body: null }, ready] });
      const r = await runFinalCoachPipeline(
        { moduleId: "simple-present", day: classicDay, finalRecording: rec("a"), finalTakeNumber: 1 },
        () => undefined,
        h.deps,
      );
      expect(r.status).toBe("unavailable");
      expect(h.calls.coach).toHaveLength(1);
    }
    const err = harness({ responses: [{ kind: "response", http: 200, body: { status: "error", code: "coach_failed" } }] });
    const r2 = await runFinalCoachPipeline(
      { moduleId: "simple-present", day: classicDay, finalRecording: rec("a"), finalTakeNumber: 1 },
      () => undefined,
      err.deps,
    );
    expect(r2.status).toBe("unavailable");
    expect(err.calls.coach).toHaveLength(1);
  });

  it("CASE 14: 409 not ready → one retry after ~1 s, then stop", async () => {
    const notReady: CoachHttpResult = { kind: "response", http: 409, body: { status: "final_audio_not_ready" } };
    const ok = harness({ responses: [notReady, ready] });
    expect((await runFinalCoachPipeline({ moduleId: "simple-present", day: classicDay, finalRecording: rec("a"), finalTakeNumber: 1 }, () => undefined, ok.deps)).status).toBe("ready");
    expect(ok.calls.sleeps).toEqual([1000]);
    const bad = harness({ responses: [notReady, notReady, ready] });
    expect((await runFinalCoachPipeline({ moduleId: "simple-present", day: classicDay, finalRecording: rec("a"), finalTakeNumber: 1 }, () => undefined, bad.deps)).status).toBe("unavailable");
    expect(bad.calls.coach).toHaveLength(2);
  });

  it("CASE 11: Pressure Round Take 9 is sent as-is (no clamp to 5)", async () => {
    const h = harness({ responses: [ready] });
    await runFinalCoachPipeline(
      { moduleId: "advanced-1", day: { day: 4, rep5Turns: turns(9) }, finalRecording: rec("i"), finalTakeNumber: 9 },
      () => undefined,
      h.deps,
    );
    expect(h.calls.upload[0]).toMatchObject({ takeNumber: 9, sourceTurnNumber: 9 });
    expect(h.calls.mark).toEqual([{ m: "advanced-1", d: 4, t: 9 }]);
    expect(h.calls.coach).toEqual([{ moduleId: "advanced-1", day: 4, takeNumber: 9 }]);
  });

  it("CASE 12: classic role-play Take 4 retrying Turn 1 persists source_turn_number 1 before the request", async () => {
    const order: string[] = [];
    const h = harness({ responses: [ready] });
    const base = h.deps;
    const deps: CoachPipelineDeps = {
      ...base,
      uploadFinalTake: async (i) => {
        order.push("upload");
        return base.uploadFinalTake(i);
      },
      markFinalTake: async (m, d, t) => {
        order.push("mark");
        return base.markFinalTake(m, d, t);
      },
      requestCoach: async (i) => {
        order.push("coach");
        return base.requestCoach(i);
      },
    };
    await runFinalCoachPipeline(
      { moduleId: "eagles-week-1", day: { day: 2, rep5Turns: turns(3) }, finalRecording: rec("d", "turn:0"), finalTakeNumber: 4 },
      () => undefined,
      deps,
    );
    expect(h.calls.upload[0]).toMatchObject({ takeNumber: 4, sourceTurnNumber: 1 });
    expect(order).toEqual(["upload", "mark", "coach"]);
    expect(h.calls.coach[0]).toEqual({ moduleId: "eagles-week-1", day: 2, takeNumber: 4 });
  });

  it("CASE 13: sentence count still pending → proceeds without waiting", async () => {
    const h = harness({ responses: [ready] });
    const pendingCount = rec("a"); // sentenceCount undefined = still counting
    expect(pendingCount.sentenceCount).toBeUndefined();
    const result = await runFinalCoachPipeline(
      { moduleId: "simple-present", day: classicDay, finalRecording: pendingCount, finalTakeNumber: 1 },
      () => undefined,
      h.deps,
    );
    expect(result.status).toBe("ready");
    expect(h.calls.coach).toHaveLength(1);
  });

  it("CASE 30: aborted (learner left) → no further state emitted", async () => {
    const controller = new AbortController();
    const h = harness({ responses: [pending, ready] });
    const deps: CoachPipelineDeps = {
      ...h.deps,
      sleep: async () => {
        controller.abort();
      },
    };
    await runFinalCoachPipeline(
      { moduleId: "simple-present", day: classicDay, finalRecording: rec("a"), finalTakeNumber: 1 },
      (s) => h.states.push(s),
      deps,
      controller.signal,
    );
    expect(h.states.map((s) => s.status)).toEqual(["preparing", "analyzing"]);
  });
});
