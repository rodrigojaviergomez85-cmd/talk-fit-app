import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { readFileSync } from "node:fs";
import {
  COACH_JSON_SCHEMA,
  COACH_JSON_SCHEMA_MULTI,
  buildCoachMessages,
  buildRubric,
  normalizeCorrections,
  normalizeFeedback,
  normalizeFluencyUpgrade,
  quoteGroundedInTranscript,
  type CoachCorrection,
  type CoachFeedback,
} from "./final-audio-coach.server";
import {
  RETAKE_JSON_SCHEMA,
  buildRetakeMessages,
  normalizeRetakeResult,
  previousErrorStillPresent,
  runFinalCoachRetake,
  type PreviousFeedback,
  type RetakeDeps,
} from "./final-coach-retake.server";
import { CORRECTION_CATEGORIES, coachVersionFor, isRetakePilot, type FinalCoachRetakeState, type FinalCoachState } from "./final-audio-coach";
import { FinalCoachReview, correctionCategoryLabel, underdevelopedResult } from "@/components/fluency/FinalCoachReview";
import { objectiveResult } from "./final-coach-result";
import { CourseService } from "@/services/course-service";

const USER = "aaaaaaaa-0000-0000-0000-000000000001";
const BASE = {
  taskCompleted: true,
  targetLanguage: "developing",
  organization: "developing",
  strengthEn: "Clear order.",
  strengthEs: "Orden claro.",
  nextStepEn: "Add when it happened.",
  nextStepEs: "Agrega cuándo pasó.",
  correctionNeeded: false,
  said: null,
  betterVersion: null,
  whyEn: null,
  whyEs: null,
  practicePhrase: null,
};

/* ---------------- 18. RELEVANCE ---------------- */

describe("Pilot v3.1 — task relevance is the first priority", () => {
  const OFF_TOPIC = "My favorite food is pizza and my brother plays soccer every weekend with his friends.";
  it("answeredTask=no with a grounded task_relevance item is shown FIRST even when listed after a grammar slip", () => {
    const raw = {
      ...BASE,
      answeredTask: "no",
      fluencyUpgrade: null,
      corrections: [
        { category: "grammar", said: "my brother plays soccer", betterVersion: "my brother played soccer", whyEn: "w", whyEs: "w" },
        { category: "task_relevance", said: "My favorite food is pizza", betterVersion: "Yesterday, I woke up at seven and then...", whyEn: "You were asked what you did yesterday.", whyEs: "Te preguntaron qué hiciste ayer." },
      ],
    };
    const fb = normalizeFeedback(raw, OFF_TOPIC, 3)!;
    expect(fb.answeredTask).toBe("no");
    expect(fb.corrections[0]!.category).toBe("task_relevance");
    expect(fb.said).toBe("My favorite food is pizza");
    expect(fb.betterVersion).toContain("Yesterday, I woke up");
  });
  it("answeredTask falls back from taskCompleted when the model omits it; never fabricated corrections", () => {
    const fb = normalizeFeedback({ ...BASE, taskCompleted: false, corrections: [] }, OFF_TOPIC, 3)!;
    expect(fb.answeredTask).toBe("partly");
    expect(fb.corrections).toEqual([]);
  });
  it("a task_relevance quote that is NOT in the transcript is dropped (no invented off-topic quote)", () => {
    const fb = normalizeFeedback(
      { ...BASE, answeredTask: "no", corrections: [{ category: "task_relevance", said: "I like cats", betterVersion: "Yesterday I...", whyEn: "w", whyEs: "w" }] },
      OFF_TOPIC,
      3,
    )!;
    expect(fb.corrections).toEqual([]);
    expect(fb.answeredTask).toBe("no");
  });
  it("the pilot prompt names task relevance first and the real question; v2 days keep the old guidance", () => {
    const day = { day: 1, topic: "t", focus: "f", goalSeconds: [30, 45] as [number, number], goalSentences: 6, rep5Prompt: { question: "What did you do yesterday?" } } as never;
    const rubric = buildRubric(day, "past-stories", "BASIC 3", null)!;
    const sys = buildCoachMessages(rubric, "x", 7, 13)[0]!.content;
    const usr = buildCoachMessages(rubric, "x", 7, 13)[1]!.content;
    expect(sys.indexOf("task_relevance")).toBeLessThan(sys.indexOf("verb_tense"));
    expect(sys).toContain("repetition");
    expect(sys).toContain("fluencyUpgrade");
    expect(usr).toContain('Question: "What did you do yesterday?"');
    expect(usr).toContain("Speaking time: 13 seconds (target 30–45 seconds)");
    const v2 = buildRubric({ ...(day as object), day: 2 } as never, "past-stories", "BASIC 3", null)!;
    const v2sys = buildCoachMessages(v2, "x", 7, 13)[0]!.content;
    expect(v2sys).not.toContain("repetition");
    expect(buildCoachMessages(v2, "x", 7, 13)[1]!.content).not.toContain("Speaking time");
  });
});

/* ---------------- 19. REPETITION ---------------- */

describe("Pilot v3.1 — repetition / variety", () => {
  const REPETITIVE = "We went to the movies, we went to the beach, we went to the cinema, we went to eat pizza and it was fun.";
  it("a repetition quote with '...' fragments is grounded fragment by fragment", () => {
    expect(quoteGroundedInTranscript("we went... we went... we went...", REPETITIVE)).toBe(true);
    expect(quoteGroundedInTranscript("we ran... we went...", REPETITIVE)).toBe(false);
  });
  it("repetition is kept as its own category (never grammar) with a more varied alternative", () => {
    const fb = normalizeFeedback(
      {
        ...BASE,
        answeredTask: "yes",
        fluencyUpgrade: null,
        corrections: [
          {
            category: "repetition",
            said: "we went... we went... we went...",
            betterVersion: "We watched a movie first. After that, we spent some time at the beach. Later, we had pizza together.",
            whyEn: "Same verb again and again sounds basic.",
            whyEs: "Repetir el mismo verbo suena básico.",
          },
        ],
      },
      REPETITIVE,
      3,
    )!;
    expect(fb.corrections).toHaveLength(1);
    expect(fb.corrections[0]!.category).toBe("repetition");
    expect(correctionCategoryLabel("repetition", true)).toBe("VARÍA TU INGLÉS");
    expect(correctionCategoryLabel("repetition", false)).toBe("ADD VARIETY");
    expect(correctionCategoryLabel("task_relevance", true)).toContain("RESPONDE LA PREGUNTA");
  });
  it("a repetition item never absorbs a grammar quote in dedupe, and only one repetition item survives", () => {
    const out = normalizeCorrections(
      [
        { category: "repetition", said: "we went... we went...", betterVersion: "We watched a movie, then we swam.", whyEn: "w", whyEs: "w" },
        { category: "grammar", said: "we went to eat pizza", betterVersion: "we went out for pizza", whyEn: "w", whyEs: "w" },
        { category: "repetition", said: "we went... we went... we went...", betterVersion: "x y z", whyEn: "w", whyEs: "w" },
      ],
      3,
      REPETITIVE,
    );
    expect(out.map((c) => c.category)).toEqual(["repetition", "grammar"]);
  });
});

/* ---------------- 20. MAX 3 + FLUENCY UPGRADE ---------------- */

describe("Pilot v3.1 — max 3 total + one grounded fluency upgrade", () => {
  const T = "Yesterday I wake up at six and then I went to work and then I eat lunch and then I go home and then I watch TV and I didn't went out because they was tired.";
  const seven = [
    { category: "task_relevance", said: "I watch TV", betterVersion: "Yesterday I...", whyEn: "w", whyEs: "w" },
    { category: "verb_tense", said: "Yesterday I wake up", betterVersion: "Yesterday I woke up", whyEn: "w", whyEs: "w" },
    { category: "verb_tense", said: "then I eat lunch", betterVersion: "then I ate lunch", whyEn: "w", whyEs: "w" },
    { category: "grammar", said: "I didn't went out", betterVersion: "I didn't go out", whyEn: "w", whyEs: "w" },
    { category: "grammar", said: "they was tired", betterVersion: "they were tired", whyEn: "w", whyEs: "w" },
    { category: "repetition", said: "and then... and then... and then...", betterVersion: "After that… Later…", whyEn: "w", whyEs: "w" },
    { category: "development", said: "I go home", betterVersion: "I went home at seven with my sister", whyEn: "w", whyEs: "w" },
  ];
  it("seven candidates → the learner sees exactly 3, relevance first, then model order", () => {
    const fb = normalizeFeedback({ ...BASE, answeredTask: "partly", fluencyUpgrade: null, corrections: seven }, T, 3)!;
    expect(fb.corrections).toHaveLength(3);
    expect(fb.corrections.map((c) => c.category)).toEqual(["task_relevance", "verb_tense", "verb_tense"]);
  });
  it("fluencyUpgrade: original must be a real short section of the transcript, improved must differ", () => {
    expect(normalizeFluencyUpgrade({ original: "then I go home and then I watch TV", improved: "After that, I went home and watched TV with my family." }, T)).toEqual({
      original: "then I go home and then I watch TV",
      improved: "After that, I went home and watched TV with my family.",
    });
    expect(normalizeFluencyUpgrade({ original: "I went to the beach", improved: "x" }, T)).toBeNull();
    expect(normalizeFluencyUpgrade({ original: "I go home", improved: "I go home" }, T)).toBeNull();
    expect(normalizeFluencyUpgrade({ original: T, improved: "short" }, T)).toBeNull(); // whole answer rejected
    expect(normalizeFluencyUpgrade(null, T)).toBeNull();
  });
  it("feedback carries answeredTask + fluencyUpgrade only on the pilot path; v2 path leaves them undefined", () => {
    const upgrade = { original: "I go home", improved: "Later, I went home." };
    const pilot = normalizeFeedback({ ...BASE, answeredTask: "yes", fluencyUpgrade: upgrade, corrections: [] }, T, 3)!;
    expect(pilot.fluencyUpgrade).toEqual(upgrade);
    expect(pilot.answeredTask).toBe("yes");
    const v2 = normalizeFeedback({ ...BASE, answeredTask: "yes", fluencyUpgrade: upgrade }, T)!;
    expect(v2.answeredTask).toBeUndefined();
    expect(v2.fluencyUpgrade).toBeUndefined();
  });
  it("schema: the pilot schema adds answeredTask + nullable fluencyUpgrade + all 8 categories; v2 schema unchanged", () => {
    const req = COACH_JSON_SCHEMA_MULTI.schema.required as readonly string[];
    expect(req).toContain("answeredTask");
    expect(req).toContain("fluencyUpgrade");
    expect(COACH_JSON_SCHEMA_MULTI.schema.properties.corrections.items.properties.category.enum).toEqual([...CORRECTION_CATEGORIES]);
    expect(CORRECTION_CATEGORIES).toContain("repetition");
    expect(CORRECTION_CATEGORIES).toContain("task_relevance");
    expect((COACH_JSON_SCHEMA.schema.required as readonly string[])).not.toContain("answeredTask");
    expect(coachVersionFor("past-stories", 1)).toBe("v3.1-pilot");
    expect(coachVersionFor("past-stories", 2)).toBe("v2");
  });
});

/* ---------------- 7. RESULT STILL MATTERS ---------------- */

describe("Pilot v3.1 — enough ideas but too short is DEVELOP MORE, not success", () => {
  const input = (seconds: number, ideas: number) => ({
    moduleId: "past-stories",
    sentenceCount: ideas,
    countStatus: "done" as const,
    durationSeconds: seconds,
    goalSentences: 6,
    goalSeconds: [45, 60] as [number, number],
    rolePlay: false,
  });
  it("7/6 ideas in 13s → underdeveloped; 7/6 in 50s → not", () => {
    expect(underdevelopedResult(objectiveResult(input(13, 7)))).toBe(true);
    expect(underdevelopedResult(objectiveResult(input(50, 7)))).toBe(false);
    expect(underdevelopedResult(objectiveResult(input(13, 3)))).toBe(false);
  });
  it("the pilot review labels the next step 🎯 DESARROLLA MÁS in that case", () => {
    const feedback: CoachFeedback = { ...(BASE as unknown as CoachFeedback), corrections: [], answeredTask: "yes", fluencyUpgrade: null };
    const html = renderToStaticMarkup(
      createElement(FinalCoachReview, { state: { status: "ready", feedback, transcript: "x" } as FinalCoachState, showEs: true, result: input(13, 7), onContinue: () => undefined }),
    );
    expect(html).toContain("7 / 6 IDEAS COMPLETAS");
    expect(html).toContain("TE FALTARON 32s");
    expect(html).toContain("🎯 DESARROLLA MÁS");
    expect(html).not.toContain("SIGUIENTE RETO");
  });
});

/* ---------------- 21. RETAKE — grounding ---------------- */

const PREV: PreviousFeedback = {
  id: "fb-1",
  corrections: [
    { category: "verb_tense", said: "Yesterday I wake up", betterVersion: "Yesterday I woke up", whyEn: "Past form.", whyEs: "Forma en pasado." },
    { category: "repetition", said: "and then... and then...", betterVersion: "After that… Later…", whyEn: "Variety.", whyEs: "Variedad." },
  ],
  nextStepEn: "Add when it happened.",
  nextStepEs: "Agrega cuándo pasó.",
  fluencyUpgrade: { original: "I go home", improved: "Later, I went home." },
};
const CLAIM = (skill: string, evidence: string) => ({ skill, applied: true, evidence, messageEn: `You used '${evidence}' correctly.`, messageEs: `Usaste '${evidence}' bien.` });
const TAIL = { improvementEn: "More connected.", improvementEs: "Más conectado.", nextEn: "Vary verbs.", nextEs: "Varía los verbos." };

describe("Retake — every applied claim is grounded in the new transcript", () => {
  it("retake 'Yesterday I woke up at seven' → verb_tense applied = true", () => {
    const t = "Yesterday I woke up at seven and after that I had breakfast with my mom, later I went to work.";
    const r = normalizeRetakeResult({ applied: [CLAIM("verb_tense", "Yesterday I woke up")], ...TAIL }, PREV, t)!;
    expect(r.applied).toEqual([{ skill: "verb_tense", applied: true, messageEn: "You used 'Yesterday I woke up' correctly.", messageEs: "Usaste 'Yesterday I woke up' bien." }]);
  });
  it("retake still says 'Yesterday I wake up' → the claim is downgraded, never presented as applied", () => {
    const t = "Yesterday I wake up at seven and after that I had breakfast with my mom and later I went to work.";
    const r = normalizeRetakeResult({ applied: [CLAIM("verb_tense", "at seven")], ...TAIL }, PREV, t)!;
    expect(r.applied[0]!.applied).toBe(false);
    expect(previousErrorStillPresent(PREV.corrections[0]!, t)).toBe(true);
  });
  it("evidence that is not in the retake transcript → not applied; unknown skills dropped; one entry per skill", () => {
    const t = "Yesterday I woke up at seven and after that I had breakfast with my mom and later I went to work.";
    const r = normalizeRetakeResult(
      {
        applied: [
          CLAIM("repetition", "first of all"),
          CLAIM("grammar", "I woke up"),
          CLAIM("next_step", "at seven"),
          CLAIM("next_step", "with my mom"),
          CLAIM("fluency_upgrade", "later I went"),
        ],
        ...TAIL,
      },
      PREV,
      t,
    )!;
    expect(r.applied.map((a) => [a.skill, a.applied])).toEqual([
      ["repetition", false],
      ["next_step", true],
      ["fluency_upgrade", true],
    ]);
  });
  it("repetition counts as applied only when the repeated fragments are gone", () => {
    const still = "Yesterday I woke up and then I ate and then I went to work and then I came home and then I slept.";
    const r = normalizeRetakeResult({ applied: [CLAIM("repetition", "I woke up")], ...TAIL }, PREV, still)!;
    expect(r.applied[0]!.applied).toBe(false);
  });
  it("unusable model output → null (no fabricated result); schema is strict with the retake skills", () => {
    expect(normalizeRetakeResult({ applied: [] }, PREV, "x")).toBeNull();
    expect(RETAKE_JSON_SCHEMA.strict).toBe(true);
    expect(RETAKE_JSON_SCHEMA.schema.properties.applied.items.properties.skill.enum).toContain("fluency_upgrade");
    const msgs = buildRetakeMessages({ question: "What did you do yesterday?", topic: "t", focus: "f", previous: PREV }, "new text");
    expect(msgs[0]!.content).toContain("Never invent improvement");
    expect(msgs[1]!.content).toContain('said: "Yesterday I wake up"');
    expect(msgs[1]!.content).toContain("NEW TRANSCRIPT");
    expect(msgs[0]!.content).toContain("Never mention CEFR levels");
  });
});

/* ---------------- 21/22. RETAKE — engine, cost, one only, pilot only ---------------- */

function retakeHarness(opts: { previous?: PreviousFeedback | null; llm?: unknown; transcript?: string | null; quota?: boolean } = {}) {
  const calls = { stt: 0, llm: 0, quota: 0 };
  const rows = new Map<string, { status: string; result: unknown; feedbackId: string }>();
  const logs: Record<string, unknown>[] = [];
  const deps: RetakeDeps = {
    userId: USER,
    now: () => 1_000,
    loadDay: async (mid, d) => (await CourseService.loadModule(mid)).days.find((x) => x.day === d) ?? null,
    findPreviousFeedback: async () => (opts.previous === undefined ? PREV : opts.previous),
    store: {
      tryInsertPending: async (row) => {
        if ([...rows.values()].some((r) => r.feedbackId === row.feedbackId)) return null;
        const id = `rt-${rows.size + 1}`;
        rows.set(id, { status: "pending", result: null, feedbackId: row.feedbackId });
        return id;
      },
      finalize: async (id, patch) => {
        rows.set(id, { ...rows.get(id)!, status: patch.status, result: patch.result ?? null });
      },
    },
    consumeQuota: async () => {
      calls.quota++;
      return opts.quota ?? true;
    },
    stt: async () => {
      calls.stt++;
      if (opts.transcript === null) return { ok: false };
      return { ok: true, text: opts.transcript ?? "Yesterday I woke up at seven and after that I had breakfast with my mom and later I went to work." };
    },
    llm: async () => {
      calls.llm++;
      return opts.llm ?? { applied: [CLAIM("verb_tense", "Yesterday I woke up")], ...TAIL };
    },
    log: (e) => logs.push(e),
  };
  return { deps, calls, rows, logs };
}
const AUDIO = new Uint8Array(4096);

describe("Retake — engine", () => {
  it("pilot day, READY feedback: exactly 1 STT + 1 LLM, compact result persisted, transcript never stored or logged", async () => {
    const h = retakeHarness();
    const res = await runFinalCoachRetake({ moduleId: "past-stories", day: 1, audio: AUDIO, mime: "audio/webm" }, h.deps);
    expect(res.http).toBe(200);
    expect(res.body.status).toBe("ready");
    expect(h.calls).toEqual({ stt: 1, llm: 1, quota: 1 });
    const row = [...h.rows.values()][0]!;
    expect(row.status).toBe("ready");
    expect(JSON.stringify(row)).not.toContain("breakfast");
    expect(JSON.stringify(h.logs)).not.toContain("breakfast");
  });
  it("second retake for the same feedback → 409 already_used, 0 extra AI calls", async () => {
    const h = retakeHarness();
    await runFinalCoachRetake({ moduleId: "past-stories", day: 1, audio: AUDIO, mime: "audio/webm" }, h.deps);
    const again = await runFinalCoachRetake({ moduleId: "past-stories", day: 1, audio: new Uint8Array(5000), mime: "audio/webm" }, h.deps);
    expect(again.http).toBe(409);
    expect(h.calls).toEqual({ stt: 1, llm: 1, quota: 1 });
  });
  it("non-pilot days → 403 before any provider or quota work", async () => {
    for (const [m, d] of [["past-stories", 2], ["simple-present", 1], ["advanced-1", 1]] as const) {
      const h = retakeHarness();
      const res = await runFinalCoachRetake({ moduleId: m, day: d, audio: AUDIO, mime: "audio/webm" }, h.deps);
      expect(res.http).toBe(403);
      expect(h.calls).toEqual({ stt: 0, llm: 0, quota: 0 });
      expect(isRetakePilot(m, d)).toBe(false);
    }
  });
  it("no READY coach review yet → 404 no_feedback, no lease, no AI", async () => {
    const h = retakeHarness({ previous: null });
    const res = await runFinalCoachRetake({ moduleId: "past-stories", day: 1, audio: AUDIO, mime: "audio/webm" }, h.deps);
    expect(res.http).toBe(404);
    expect(h.rows.size).toBe(0);
    expect(h.calls.stt).toBe(0);
  });
  it("quota exhausted → 429, lease closed as error, 0 STT", async () => {
    const h = retakeHarness({ quota: false });
    const res = await runFinalCoachRetake({ moduleId: "past-stories", day: 1, audio: AUDIO, mime: "audio/webm" }, h.deps);
    expect(res.http).toBe(429);
    expect(h.calls.stt).toBe(0);
    expect([...h.rows.values()][0]!.status).toBe("error");
  });
  it("too few words → unclear (1 STT, 0 LLM); STT failure → error; oversized → 413", async () => {
    const few = retakeHarness({ transcript: "uh yes" });
    expect((await runFinalCoachRetake({ moduleId: "past-stories", day: 1, audio: AUDIO, mime: null }, few.deps)).body.status).toBe("unclear");
    expect(few.calls.llm).toBe(0);
    const bad = retakeHarness({ transcript: null });
    expect((await runFinalCoachRetake({ moduleId: "past-stories", day: 1, audio: AUDIO, mime: null }, bad.deps)).body.status).toBe("error");
    const big = retakeHarness();
    expect((await runFinalCoachRetake({ moduleId: "past-stories", day: 1, audio: new Uint8Array(9 * 1024 * 1024), mime: null }, big.deps)).http).toBe(413);
    expect(big.calls.quota).toBe(0);
  });
});

/* ---------------- 22. DAY INVARIANTS (static wiring) ---------------- */

describe("Retake — day invariants + UI", () => {
  const practice = readFileSync("src/routes/practice.tsx", "utf8");
  const retakeEngine = readFileSync("src/lib/final-coach-retake.server.ts", "utf8");
  const client = readFileSync("src/services/final-audio-coach-client.ts", "utf8");
  it("the retake path never commits, uploads, marks final, or touches streak/habit/progression", () => {
    const block = practice.slice(practice.indexOf("const startRetake"), practice.indexOf("* Objective result for the Coach Review"));
    expect(block).not.toMatch(/completeDay|JourneyService|uploadTake|markFinalTake|setTakes|setFinalIndex|setDone|habit|streak|controller\.confirm/);
    expect(block).toContain("retakeStartedRef.current = true");
    expect(practice.match(/requestFinalCoachRetake\(/g)).toHaveLength(1);
    expect(practice.match(/controller\.confirm\(\)/g)).toHaveLength(1);
    const engineCode = retakeEngine.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "");
    expect(engineCode).not.toMatch(/is_final_rep|completeDay|JourneyService|uploadTake|markFinalTake|habit|streak/);
    expect(client.slice(client.indexOf("requestFinalCoachRetake"))).not.toMatch(/uploadTake|markFinalTake|retry/i);
  });
  it("retake UI: idle shows ONE optional button on the pilot ready screen; ready shows BEFORE/NOW + applied + keep practicing, and no second retake", () => {
    const feedback: CoachFeedback = { ...(BASE as unknown as CoachFeedback), corrections: [], answeredTask: "yes", fluencyUpgrade: { original: "I go home", improved: "Later, I went home." } };
    const state = { status: "ready", feedback, transcript: "x" } as FinalCoachState;
    const base = { seconds: 18, ideas: 7 };
    const render = (retakeState: FinalCoachRetakeState, after: { seconds: number; ideas: number | null } | null = null) =>
      renderToStaticMarkup(
        createElement(FinalCoachReview, {
          state,
          showEs: true,
          result: null,
          onContinue: () => undefined,
          retake: { state: retakeState, before: base, after, maxSeconds: 60, targetSeconds: [30, 45], onStart: () => undefined, onRecorded: () => undefined },
        }),
      );
    const idle = render({ status: "idle" });
    expect(idle).toContain("INTÉNTALO OTRA VEZ");
    expect(idle).toContain("APLICA EL FEEDBACK");
    expect(idle).toContain("SUENA MÁS FLUIDO");
    expect(idle).toContain("TÚ DIJISTE");
    expect(idle).toContain("PRUEBA");
    expect(idle).toContain("CONTINUAR");
    const ready = render(
      { status: "ready", result: { applied: [{ skill: "verb_tense", applied: true, messageEn: "e", messageEs: "Esta vez usaste woke up correctamente." }, { skill: "repetition", applied: false, messageEn: "e2", messageEs: "Varía más los verbos." }], improvementEn: "i", improvementEs: "Usaste 'after that' para conectar.", nextEn: "n", nextEs: "Sigue así." } },
      { seconds: 36, ideas: 8 },
    );
    expect(ready).toContain("MEJORASTE 🎉");
    expect(ready).toContain("18s · 7 ideas");
    expect(ready).toContain("36s · 8 ideas");
    expect(ready).toContain("APLICASTE ESTO");
    expect(ready).toContain("Esta vez usaste woke up correctamente.");
    expect(ready).toContain("SIGUE PRACTICANDO");
    expect(ready).toContain("Varía más los verbos.");
    expect(ready).not.toContain("INTÉNTALO OTRA VEZ");
    expect(ready).toContain("CONTINUAR");
    // Idea count failed for the retake → time only, still no second retake.
    const timeOnly = render({ status: "ready", result: { applied: [], improvementEn: "i", improvementEs: "i", nextEn: "n", nextEs: "n" } }, { seconds: 20, ideas: null });
    expect(timeOnly).toContain("20s");
    expect(timeOnly).not.toContain("INTÉNTALO OTRA VEZ");
  });
  it("v2 days: no retake prop → no retake UI at all; pilot gate exactly past-stories Day 1", () => {
    const feedback: CoachFeedback = { ...(BASE as unknown as CoachFeedback), corrections: [] };
    const out = renderToStaticMarkup(createElement(FinalCoachReview, { state: { status: "ready", feedback } as FinalCoachState, showEs: true, result: null, onContinue: () => undefined }));
    expect(out).not.toContain("INTÉNTALO OTRA VEZ");
    expect(isRetakePilot("past-stories", 1)).toBe(true);
    expect(practice).toContain("isRetakePilot(moduleId, day.day)");
  });
  it("learner-facing labels never show CEFR levels or scores", () => {
    const review = readFileSync("src/components/fluency/FinalCoachReview.tsx", "utf8");
    const strings = review.match(/"[^"\n]*"/g) ?? [];
    expect(strings.join(" ")).not.toMatch(/\bB[12]\b|CEFR|score|puntaje|%/);
  });
  it("the correction shape is unchanged for consumers", () => {
    const c: CoachCorrection = { category: "repetition", said: "a... a...", betterVersion: "b", whyEn: "w", whyEs: "w" };
    expect(Object.keys(c)).toEqual(["category", "said", "betterVersion", "whyEn", "whyEs"]);
  });
});
