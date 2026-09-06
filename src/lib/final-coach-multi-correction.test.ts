import { describe, expect, it } from "vitest";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import {
  buildCoachMessages,
  buildRubric,
  COACH_JSON_SCHEMA,
  COACH_JSON_SCHEMA_MULTI,
  coachJsonSchemaFor,
  coachVersionFor,
  feedbackFromRow,
  isMultiCorrectionPilot,
  maxCorrectionsFor,
  normalizeCorrections,
  normalizeFeedback,
  runFinalAudioCoach,
  type CoachDeps,
  type CoachFeedback,
  type FeedbackRow,
  type PendingInsert,
  type RecordingRow,
} from "./final-audio-coach.server";
import { MULTI_CORRECTION_MAX, type FinalCoachState } from "./final-audio-coach";
import { FinalCoachReview } from "@/components/fluency/FinalCoachReview";
import { CourseService } from "@/services/course-service";

const USER = "aaaaaaaa-0000-0000-0000-000000000001";
const TRANSCRIPT = "Yesterday I wake up at six and then I went to work. I didn't went to the gym because I was tired.";

const BASE_LLM = {
  taskCompleted: true,
  targetLanguage: "developing",
  organization: "developing",
  strengthEn: "You told the events in a clear order.",
  strengthEs: "Contaste los eventos en un orden claro.",
  nextStepEn: "Add what happened next: 'Then I went home.'",
  nextStepEs: "Agrega qué pasó después: 'Then I went home.'",
  correctionNeeded: true,
  said: "Yesterday I wake up",
  betterVersion: "Yesterday I woke up",
  whyEn: "Use the past form because this happened yesterday.",
  whyEs: "Usa la forma en pasado porque esto ocurrió ayer.",
  practicePhrase: "Yesterday I woke up at six.",
};
const C1 = { category: "verb_tense", said: "Yesterday I wake up", betterVersion: "Yesterday I woke up", whyEn: "Past form.", whyEs: "Forma en pasado." };
const C2 = { category: "grammar", said: "I didn't went", betterVersion: "I didn't go", whyEn: "Base form after didn't.", whyEs: "Forma base después de didn't." };
const C3 = { category: "connector", said: "and then I went to work", betterVersion: "and after that I went to work", whyEn: "Variety.", whyEs: "Variedad." };
const C4 = { category: "word_choice", said: "because I was tired", betterVersion: "since I was exhausted", whyEn: "w", whyEs: "w" };
const C5 = { category: "naturalness", said: "to the gym", betterVersion: "to the gym today", whyEn: "n", whyEs: "n" };

/* ---------------- 25. FEATURE GATE ---------------- */

describe("Multi-correction pilot — gate", () => {
  it("CASE A — past-stories Day 1 is the ONLY pilot day (v3-pilot, max 3)", () => {
    expect(isMultiCorrectionPilot("past-stories", 1)).toBe(true);
    expect(coachVersionFor("past-stories", 1)).toBe("v3.1-pilot");
    expect(maxCorrectionsFor("past-stories", 1)).toBe(3);
  });
  it("CASE B/C/D/E — every other day keeps v2", () => {
    for (const [m, d] of [["past-stories", 2], ["past-stories", 20], ["simple-present", 1], ["tigers", 1], ["advanced-1", 1], ["eagles-week-1", 3]] as const) {
      expect(isMultiCorrectionPilot(m, d)).toBe(false);
      expect(coachVersionFor(m, d)).toBe("v2");
      expect(maxCorrectionsFor(m, d)).toBe(0);
    }
  });
  it("future 3 / 5 / 5 ceilings exist but only basic=3 is used by the pilot", () => {
    expect(MULTI_CORRECTION_MAX).toEqual({ basic: 3, intermediate: 5, advanced: 5 });
  });
  it("rubric: pilot day carries maxCorrections + v3-pilot; v2 days omit the field (hash unchanged)", async () => {
    const past = await CourseService.loadModule("past-stories");
    const d1 = buildRubric(past.days[0]!, "past-stories", "BASIC 3", null)!;
    const d2 = buildRubric(past.days[1]!, "past-stories", "BASIC 3", null)!;
    expect(d1.coachVersion).toBe("v3.1-pilot");
    expect(d1.maxCorrections).toBe(3);
    expect(d2.coachVersion).toBe("v2");
    expect("maxCorrections" in d2 && d2.maxCorrections !== undefined).toBe(false);
    expect(coachJsonSchemaFor(d1)).toBe(COACH_JSON_SCHEMA_MULTI);
    expect(coachJsonSchemaFor(d2)).toBe(COACH_JSON_SCHEMA);
    const sys = buildCoachMessages(d1, TRANSCRIPT, 5)[0]!.content;
    expect(sys).toContain("3 HIGHEST-LEARNING-VALUE items at most");
    expect(sys).toContain("I didn't went' → 'I didn't go'");
    expect(buildCoachMessages(d2, TRANSCRIPT, 5)[0]!.content).toContain("AT MOST ONE specific correction");
  });
});

/* ---------------- 26–29. VALIDATION ---------------- */

describe("Multi-correction pilot — validation", () => {
  it("CASE 26 — five candidates → at most 3, in priority order", () => {
    const out = normalizeCorrections([C1, C2, C3, C4, C5], 3, TRANSCRIPT);
    expect(out).toHaveLength(3);
    expect(out.map((c) => c.said)).toEqual([C1.said, C2.said, C3.said]);
  });
  it("CASE 27 — fewer is fine: 1 → 1, none → []; never padded", () => {
    expect(normalizeCorrections([C2], 3, TRANSCRIPT)).toHaveLength(1);
    expect(normalizeCorrections([], 3, TRANSCRIPT)).toEqual([]);
    const fb = normalizeFeedback({ ...BASE_LLM, corrections: [] }, TRANSCRIPT, 3)!;
    expect(fb.corrections).toEqual([]);
    expect(fb.correctionNeeded).toBe(false);
    expect(fb.said).toBeNull();
  });
  it("CASE 28 — grounding: invented quote dropped, others survive, result kept", () => {
    const fake = { ...C1, said: "Yesterday I go to school" };
    const out = normalizeCorrections([fake, C2], 3, "Yesterday I wake up and then I went to work. I didn't went there.");
    expect(out.map((c) => c.said)).toEqual([C2.said]);
    const fb = normalizeFeedback({ ...BASE_LLM, corrections: [fake, C2] }, TRANSCRIPT, 3)!;
    expect(fb.corrections.map((c) => c.said)).toEqual([C2.said]);
    // Primary mirrors the first VALID correction.
    expect(fb.said).toBe(C2.said);
    expect(fb.betterVersion).toBe(C2.betterVersion);
    expect(fb.correctionNeeded).toBe(true);
    expect(fb.practicePhrase).toBe(BASE_LLM.practicePhrase);
  });
  it("CASE 29 — overlapping quotes for the same mistake → one survives (the more complete one)", () => {
    const short = { ...C1, said: "I wake up" };
    expect(normalizeCorrections([C1, short], 3, TRANSCRIPT).map((c) => c.said)).toEqual([C1.said]);
    expect(normalizeCorrections([short, C1], 3, TRANSCRIPT).map((c) => c.said)).toEqual([C1.said]);
  });
  it("per-item rules: bad category, empty/identical better, missing why, >15 words → dropped", () => {
    const long = { ...C3, said: "one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen" };
    const out = normalizeCorrections(
      [{ ...C1, category: "spelling" }, { ...C2, betterVersion: "I didn't went" }, { ...C3, whyEs: "" }, long],
      3,
      `${TRANSCRIPT} ${long.said}`,
    );
    expect(out).toEqual([]);
  });
  it("v2 days ignore any corrections array and keep single-correction behavior", () => {
    const fb = normalizeFeedback({ ...BASE_LLM, corrections: [C1, C2] }, TRANSCRIPT)!;
    expect(fb.corrections).toEqual([]);
    expect(fb.correctionNeeded).toBe(true);
    expect(fb.said).toBe(BASE_LLM.said);
  });
  it("durable replay: feedbackFromRow restores corrections only for pilot rows", () => {
    const row: FeedbackRow = {
      id: "x", status: "ready", updated_at: "", task_completed: true, target_language: "good", organization: "good",
      strength_en: "s", strength_es: "s", next_step_en: "n", next_step_es: "n", correction_needed: true,
      said: C1.said, better_version: C1.betterVersion, why_en: "w", why_es: "w", practice_phrase: "p",
      transcript_word_count: 20, estimated_idea_count: 5, corrections: [C1, C2],
    };
    expect(feedbackFromRow(row, 3)!.corrections).toHaveLength(2);
    expect(feedbackFromRow(row)!.corrections).toEqual([]);
  });
});

/* ---------------- 30–31. ENGINE: transcript + cache ---------------- */

function makeStore(now: () => number) {
  const rows = new Map<string, FeedbackRow & { insert: PendingInsert; patches: unknown[] }>();
  const keyOf = (k: { userId: string; audioSha256: string; rubricSha256: string; coachVersion: string }) =>
    `${k.userId}|${k.audioSha256}|${k.rubricSha256}|${k.coachVersion}`;
  let seq = 0;
  const store: CoachDeps["store"] & { rows: typeof rows } = {
    rows,
    findExisting: async (k) => {
      const r = rows.get(keyOf(k));
      return r ? { ...r } : null;
    },
    tryInsertPending: async (row) => {
      if (rows.has(keyOf(row))) return false;
      rows.set(keyOf(row), {
        insert: row, patches: [], id: `fb-${++seq}`, status: "pending", updated_at: new Date(now()).toISOString(),
        task_completed: null, target_language: null, organization: null, strength_en: null, strength_es: null,
        next_step_en: null, next_step_es: null, correction_needed: null, said: null, better_version: null,
        why_en: null, why_es: null, practice_phrase: null, transcript_word_count: null,
        estimated_idea_count: row.estimatedIdeaCount, corrections: null,
      });
      return true;
    },
    tryReclaim: async () => false,
    finalize: async (id, patch) => {
      const r = [...rows.values()].find((x) => x.id === id)!;
      r.patches.push(patch);
      r.status = patch.status;
      r.updated_at = new Date(now() + 2).toISOString();
      const f = patch.feedback;
      r.task_completed = f?.taskCompleted ?? null; r.target_language = f?.targetLanguage ?? null; r.organization = f?.organization ?? null;
      r.strength_en = f?.strengthEn ?? null; r.strength_es = f?.strengthEs ?? null; r.next_step_en = f?.nextStepEn ?? null; r.next_step_es = f?.nextStepEs ?? null;
      r.correction_needed = f?.correctionNeeded ?? null; r.said = f?.said ?? null; r.better_version = f?.betterVersion ?? null;
      r.why_en = f?.whyEn ?? null; r.why_es = f?.whyEs ?? null; r.practice_phrase = f?.practicePhrase ?? null;
      r.corrections = f?.corrections?.length ? f.corrections : null;
      r.transcript_word_count = patch.transcriptWordCount ?? null;
    },
  };
  return store;
}

function harness(moduleId: string, day: number, llmReply: unknown) {
  const now = () => 1_700_000_000_000;
  const store = makeStore(now);
  const counters = { stt: 0, llm: 0 };
  const logs: Record<string, unknown>[] = [];
  const rec: RecordingRow = {
    id: "rec", user_id: USER, module_id: moduleId, day, take_number: 2, is_final_rep: true,
    storage_path: `${USER}/${moduleId}/${day}/take-2.webm`, mime_type: "audio/webm", audio_purged_at: null,
    estimated_idea_count: 5, source_turn_number: null,
  };
  const deps: CoachDeps = {
    userId: USER, now,
    fetchRecording: async () => rec,
    downloadAudio: async () => new Uint8Array(4096).fill(7),
    loadDay: async (m, d) => (await CourseService.loadModule(m)).days.find((x) => x.day === d) ?? null,
    moduleLabel: (m) => CourseService.getModule(m).title,
    store,
    consumeQuota: async () => true,
    stt: async () => { counters.stt++; return { ok: true, text: TRANSCRIPT }; },
    llm: async () => { counters.llm++; return llmReply; },
    log: (e) => logs.push(e),
  };
  return { deps, store, counters, logs, input: { moduleId, day, takeNumber: 2 } };
}

describe("Multi-correction pilot — engine", () => {
  it("CASE 30 — fresh pilot analysis returns corrections + transient transcript; DB and logs never contain it", async () => {
    const h = harness("past-stories", 1, { ...BASE_LLM, corrections: [C1, C2, C3, C4, C5] });
    const res = await runFinalAudioCoach(h.input, h.deps);
    expect(res.http).toBe(200);
    if (res.body.status !== "ready") throw new Error(res.body.status);
    expect(res.body.transcript).toBe(TRANSCRIPT);
    expect(res.body.feedback.corrections).toHaveLength(3);
    expect(h.counters).toEqual({ stt: 1, llm: 1 });
    const row = [...h.store.rows.values()][0]!;
    expect(row.insert.coachVersion).toBe("v3.1-pilot");
    expect(JSON.stringify({ ...row, patches: undefined })).not.toContain("at six and then");
    expect(JSON.stringify(row.patches)).not.toContain("at six and then");
    expect(JSON.stringify(h.logs)).not.toContain("at six and then");
    expect(h.logs.at(-1)).toMatchObject({ coachVersion: "v3.1-pilot", maxCorrections: 3, transcriptWordCount: 22 });
    expect(Array.isArray(row.corrections) && (row.corrections as unknown[]).length).toBe(3);
  });

  it("CASE 31 — cache replay: 0 STT, 0 LLM, corrections restored, transcript null (never re-transcribed)", async () => {
    const h = harness("past-stories", 1, { ...BASE_LLM, corrections: [C1, C2] });
    await runFinalAudioCoach(h.input, h.deps);
    const again = await runFinalAudioCoach(h.input, h.deps);
    expect(h.counters).toEqual({ stt: 1, llm: 1 });
    if (again.body.status !== "ready") throw new Error(again.body.status);
    expect(again.body.transcript).toBeNull();
    expect(again.body.feedback.corrections.map((c) => c.said)).toEqual([C1.said, C2.said]);
  });

  it("v2 day (past-stories Day 2): no transcript field, no corrections, version v2 — unchanged behavior", async () => {
    const h = harness("past-stories", 2, { ...BASE_LLM, corrections: [C1, C2] });
    const res = await runFinalAudioCoach(h.input, h.deps);
    if (res.body.status !== "ready") throw new Error(res.body.status);
    expect("transcript" in res.body).toBe(false);
    expect(res.body.feedback.corrections).toEqual([]);
    expect(res.body.feedback.said).toBe(BASE_LLM.said);
    expect([...h.store.rows.values()][0]!.insert.coachVersion).toBe("v2");
    expect([...h.store.rows.values()][0]!.corrections).toBeNull();
  });
});

/* ---------------- UI ---------------- */

const html = (state: FinalCoachState, showEs = true) =>
  renderToStaticMarkup(createElement(FinalCoachReview, { state, showEs, result: null, onContinue: () => undefined }));

const feedback = (corrections: CoachFeedback["corrections"]): CoachFeedback => ({
  ...(BASE_LLM as Omit<CoachFeedback, "corrections">),
  targetLanguage: "developing",
  organization: "developing",
  corrections,
});

describe("Multi-correction pilot — UI", () => {
  it("pilot READY: transcript collapsed by default, N numbered corrections with local labels, no practice block", () => {
    const es = html({ status: "ready", feedback: feedback([C1 as never, C2 as never]), transcript: TRANSCRIPT });
    expect(es).toContain("VER TODO LO QUE DIJISTE");
    expect(es).not.toContain("at six and then"); // collapsed by default
    expect(es).toContain("CORRECCIONES CLAVE · 2");
    expect(es).toContain("1 · PASADO");
    expect(es).toContain("2 · GRAMÁTICA");
    expect(es).toContain("❌");
    expect(es).toContain("✅");
    expect(es).toContain("Yesterday I woke up");
    expect(es.indexOf("CORRECCIONES CLAVE")).toBeLessThan(es.indexOf("VER TODO LO QUE DIJISTE"));
    // The pilot layout has no PRACTICE block: the fluency upgrade + retake replace it.
    expect(es.split("PRACTICA").length - 1).toBe(0);
    expect(es).toContain("CONTINUAR");
    const en = html({ status: "ready", feedback: feedback([C1 as never, C2 as never]), transcript: TRANSCRIPT }, false);
    expect(en).toContain("SHOW EVERYTHING YOU SAID");
    expect(en).toContain("1 · PAST TENSE");
    expect(en).toContain("2 · GRAMMAR");
  });
  it("cache replay (transcript null): corrections still shown, transcript section omitted", () => {
    const out = html({ status: "ready", feedback: feedback([C1 as never]), transcript: null });
    expect(out).toContain("CORRECCIONES CLAVE · 1");
    expect(out).not.toContain("SHOW EVERYTHING YOU SAID");
  });
  it("v2 READY (no corrections field) keeps the existing single CORRIGE ESTO layout", () => {
    const out = html({ status: "ready", feedback: feedback([]) });
    expect(out).toContain("CORRIGE ESTO");
    expect(out).not.toContain("CORRECCIONES CLAVE");
    expect(out).not.toContain("TODO LO QUE DIJISTE");
  });

  it("simple tense corrections omit WHY, while reusable grammar and task rules keep one compact hint", () => {
    const simple = html({ status: "ready", feedback: feedback([C1 as never, C3 as never]), transcript: null });
    expect(simple).not.toContain("Past form.");
    expect(simple).not.toContain("Variedad.");
    expect(simple).not.toContain("¿POR QUÉ?");
    expect(simple).not.toContain("line-through");

    const reusable = html({ status: "ready", feedback: feedback([C2 as never]), transcript: null });
    expect(reusable).toContain("Forma base después de didn&#x27;t.");
    expect(reusable).not.toContain("¿POR QUÉ?");
  });
});
