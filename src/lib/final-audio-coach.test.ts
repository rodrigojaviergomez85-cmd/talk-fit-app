import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import {
  buildRubric,
  COACH_QUOTA_ENDPOINT,
  FINAL_AUDIO_COACH_VERSION,
  MAX_FINAL_AUDIO_BYTES,
  MAX_FINAL_AUDIO_SECONDS,
  PENDING_STALE_MS,
  RECORDER_BITS_PER_SECOND,
  normalizeFeedback,
  rubricSha256,
  runFinalAudioCoach,
  sha256Hex,
  type CoachDeps,
  type CoachFeedback,
  type FeedbackRow,
  type PendingInsert,
  type RecordingRow,
} from "./final-audio-coach.server";
import { sourceTurnNumberFor } from "./final-audio-coach";
import { CourseService } from "@/services/course-service";
import type { CourseDay } from "./types";

const USER_A = "aaaaaaaa-0000-0000-0000-000000000001";
const USER_B = "bbbbbbbb-0000-0000-0000-000000000002";

const GOOD_LLM: CoachFeedback = {
  taskCompleted: true,
  targetLanguage: "good",
  organization: "developing",
  strengthEn: "You answered the question with clear ideas.",
  strengthEs: "Respondiste la pregunta con ideas claras.",
  nextStepEn: "Add one reason with because.",
  nextStepEs: "Agrega una razón usando because.",
};

const LONG_TRANSCRIPT = "My name is Carlos and I live in San Salvador because I like the city and my family is here.";

function audioOf(seed: string, bytes = 4096): Uint8Array {
  const out = new Uint8Array(bytes);
  for (let i = 0; i < bytes; i++) out[i] = (seed.charCodeAt(i % seed.length) + i) & 0xff;
  return out;
}

function recording(over: Partial<RecordingRow> = {}): RecordingRow {
  return {
    id: "rec-1",
    user_id: USER_A,
    module_id: "simple-present",
    day: 1,
    take_number: 2,
    is_final_rep: true,
    storage_path: `${USER_A}/simple-present/1/take-2.webm`,
    mime_type: "audio/webm",
    audio_purged_at: null,
    estimated_idea_count: 4,
    source_turn_number: null,
    ...over,
  };
}

/** In-memory durable store honouring the unique key + optimistic reclaim. */
function makeStore(now: () => number) {
  const rows = new Map<string, FeedbackRow & { key: string; insert: PendingInsert }>();
  const keyOf = (k: { userId: string; audioSha256: string; rubricSha256: string; coachVersion: string }) =>
    `${k.userId}|${k.audioSha256}|${k.rubricSha256}|${k.coachVersion}`;
  let seq = 0;
  const store = {
    rows,
    findExisting: async (k: Parameters<typeof keyOf>[0]) => {
      const r = rows.get(keyOf(k));
      return r ? { ...r } : null;
    },
    tryInsertPending: async (row: PendingInsert) => {
      const k = keyOf(row);
      if (rows.has(k)) return false;
      rows.set(k, {
        key: k,
        insert: row,
        id: `fb-${++seq}`,
        status: "pending",
        updated_at: new Date(now()).toISOString(),
        task_completed: null,
        target_language: null,
        organization: null,
        strength_en: null,
        strength_es: null,
        next_step_en: null,
        next_step_es: null,
        transcript_word_count: null,
        estimated_idea_count: row.estimatedIdeaCount,
      });
      return true;
    },
    tryReclaim: async (id: string, seen: string) => {
      const r = [...rows.values()].find((x) => x.id === id);
      if (!r || r.updated_at !== seen) return false;
      r.status = "pending";
      r.updated_at = new Date(now() + 1).toISOString();
      return true;
    },
    finalize: async (id: string, patch: Parameters<CoachDeps["store"]["finalize"]>[1]) => {
      const r = [...rows.values()].find((x) => x.id === id);
      if (!r) return;
      r.status = patch.status;
      r.updated_at = new Date(now() + 2).toISOString();
      r.transcript_word_count = patch.transcriptWordCount ?? null;
      r.task_completed = patch.feedback?.taskCompleted ?? null;
      r.target_language = patch.feedback?.targetLanguage ?? null;
      r.organization = patch.feedback?.organization ?? null;
      r.strength_en = patch.feedback?.strengthEn ?? null;
      r.strength_es = patch.feedback?.strengthEs ?? null;
      r.next_step_en = patch.feedback?.nextStepEn ?? null;
      r.next_step_es = patch.feedback?.nextStepEs ?? null;
    },
  };
  return store;
}

type Harness = ReturnType<typeof harness>;
function harness(opts: {
  recordings?: RecordingRow[];
  audio?: Record<string, Uint8Array>;
  transcript?: string | null;
  llm?: unknown;
  quotaAllowed?: boolean;
  userId?: string;
  clock?: { t: number };
  store?: ReturnType<typeof makeStore>;
  delayStt?: () => Promise<void>;
  llmReply?: unknown;
  confidence?: SttConfidence | null;
} = {}) {
  const clock = opts.clock ?? { t: 1_700_000_000_000 };
  const now = () => clock.t;
  const store = opts.store ?? makeStore(now);
  const counters = { fetch: 0, download: 0, stt: 0, llm: 0, quota: 0 };
  const logs: Record<string, unknown>[] = [];
  const recs = opts.recordings ?? [recording()];
  const audio = opts.audio ?? { [recording().storage_path]: audioOf("take-2-v1") };
  const deps: CoachDeps = {
    userId: opts.userId ?? USER_A,
    now,
    fetchRecording: async (uid, input) => {
      counters.fetch++;
      return (
        recs.find(
          (r) => r.user_id === uid && r.module_id === input.moduleId && r.day === input.day && r.take_number === input.takeNumber,
        ) ?? null
      );
    },
    downloadAudio: async (path) => {
      counters.download++;
      return audio[path] ?? null;
    },
    loadDay: async (moduleId, day) => {
      const loaded = await CourseService.loadModule(moduleId);
      return loaded.days.find((d) => d.day === day) ?? null;
    },
    moduleLabel: (moduleId) => CourseService.getModule(moduleId).title,
    store,
    consumeQuota: async () => {
      counters.quota++;
      return opts.quotaAllowed ?? true;
    },
    stt: async () => {
      counters.stt++;
      if (opts.delayStt) await opts.delayStt();
      if (opts.transcript === null) return { ok: false };
      return { ok: true, text: opts.transcript ?? LONG_TRANSCRIPT, confidence: opts.confidence };
    },
    llm: async () => {
      counters.llm++;
      return "llmReply" in opts ? opts.llmReply : GOOD_LLM;
    },
    log: (e) => logs.push(e),
  };
  return { deps, counters, store, clock, logs };
}

const INPUT = { moduleId: "simple-present", day: 1, takeNumber: 2 };

describe("Final Audio Coach — ownership & readiness", () => {
  it("CASE 1: User B cannot analyse User A's take — blocked before Storage/AI", async () => {
    const h = harness({ userId: USER_B });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.http).toBe(404);
    expect(h.counters.download).toBe(0);
    expect(h.counters.stt).toBe(0);
    expect(h.counters.llm).toBe(0);
  });

  it("CASE 1b: a row whose storage_path is outside the learner's folder is rejected", async () => {
    const h = harness({ recordings: [recording({ storage_path: `${USER_B}/simple-present/1/take-2.webm` })] });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.http).toBe(404);
    expect(h.counters.download).toBe(0);
  });

  it("CASE 2: valid take that is not Final → 409, 0 AI calls, no download", async () => {
    const h = harness({ recordings: [recording({ is_final_rep: false })] });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.http).toBe(409);
    expect(res.body.status).toBe("final_audio_not_ready");
    expect(h.counters.download + h.counters.stt + h.counters.llm + h.counters.quota).toBe(0);
  });

  it("purged audio is never analysed", async () => {
    const h = harness({ recordings: [recording({ audio_purged_at: "2026-01-01T00:00:00Z" })] });
    expect((await runFinalAudioCoach(INPUT, h.deps)).http).toBe(404);
    expect(h.counters.download).toBe(0);
  });
});

describe("Final Audio Coach — happy path & cache", () => {
  it("new Final Audio costs exactly 1 STT + 1 LLM and stores a compact bilingual row", async () => {
    const h = harness();
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.http).toBe(200);
    expect(res.body.status).toBe("ready");
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(1);
    expect(h.counters.quota).toBe(1);
    const row = [...h.store.rows.values()][0]!;
    expect(row.status).toBe("ready");
    expect(row.strength_es).toBe(GOOD_LLM.strengthEs);
    expect(row.insert.coachVersion).toBe(FINAL_AUDIO_COACH_VERSION);
    expect(row.insert.sourceTurnNumber).toBeNull();
  });

  it("CASE 3: same audio + same rubric already READY → cached feedback, 0 STT, 0 LLM, 0 quota", async () => {
    const h = harness();
    await runFinalAudioCoach(INPUT, h.deps);
    const before = { ...h.counters };
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("ready");
    if (res.body.status === "ready") expect(res.body.feedback.strengthEn).toBe(GOOD_LLM.strengthEn);
    expect(h.counters.stt).toBe(before.stt);
    expect(h.counters.llm).toBe(before.llm);
    expect(h.counters.quota).toBe(before.quota);
    expect(h.logs.at(-1)?.["cacheHit"]).toBe(true);
  });

  it("CASE 4: same Take re-recorded (different bytes) → different SHA-256, new evaluation allowed", async () => {
    const path = recording().storage_path;
    const audio = { [path]: audioOf("version-1") };
    const h = harness({ audio });
    await runFinalAudioCoach(INPUT, h.deps);
    audio[path] = audioOf("version-2");
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("ready");
    expect(h.counters.stt).toBe(2);
    expect(h.counters.llm).toBe(2);
    const hashes = [...h.store.rows.values()].map((r) => r.insert.audioSha256);
    expect(new Set(hashes).size).toBe(2);
    expect(await sha256Hex(audioOf("version-1"))).not.toBe(await sha256Hex(audioOf("version-2")));
  });

  it("CASE 20: repeating a day with new audio may evaluate again; refresh of the same audio is a cache hit", async () => {
    const path = recording().storage_path;
    const audio = { [path]: audioOf("monday") };
    const h = harness({ audio });
    await runFinalAudioCoach(INPUT, h.deps); // Monday
    audio[path] = audioOf("friday");
    await runFinalAudioCoach(INPUT, h.deps); // Friday repeat
    await runFinalAudioCoach(INPUT, h.deps); // Friday refresh
    expect(h.counters.stt).toBe(2);
    expect(h.counters.llm).toBe(2);
  });
});

describe("Final Audio Coach — concurrency & leases", () => {
  it("CASE 5: two simultaneous requests for the same audio → max 1 STT + 1 LLM", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const h = harness({ delayStt: () => gate });
    const a = runFinalAudioCoach(INPUT, h.deps);
    const b = runFinalAudioCoach(INPUT, h.deps);
    // Let both reach the lease step, then release the STT.
    await new Promise((r) => setTimeout(r, 10));
    release();
    const [ra, rb] = await Promise.all([a, b]);
    // The loser either sees the active lease (202) or, if the owner already
    // finished, the cached result — never a second paid evaluation.
    expect([ra.body.status, rb.body.status]).toContain("ready");
    expect([ra.body.status, rb.body.status].every((s) => s === "ready" || s === "pending")).toBe(true);
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(1);
  });

  it("CASE 6: an active pending row → 202 pending, 0 additional AI calls", async () => {
    const h = harness();
    const audioHash = await sha256Hex(audioOf("take-2-v1"));
    const day = (await CourseService.loadModule("simple-present")).days[0]!;
    const rubric = buildRubric(day, "simple-present", CourseService.getModule("simple-present").title, null)!;
    await h.store.tryInsertPending({
      userId: USER_A,
      audioSha256: audioHash,
      rubricSha256: await rubricSha256(rubric),
      coachVersion: FINAL_AUDIO_COACH_VERSION,
      moduleId: "simple-present",
      day: 1,
      takeNumber: 2,
      sourceTurnNumber: null,
      estimatedIdeaCount: null,
    });
    h.clock.t += 30_000; // 30s later: still fresh
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.http).toBe(202);
    expect(h.counters.stt + h.counters.llm + h.counters.quota).toBe(0);
  });

  it("CASE 7: a stale pending row (> 2 min) can be reclaimed by exactly one request", async () => {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    const h = harness({ delayStt: () => gate });
    const audioHash = await sha256Hex(audioOf("take-2-v1"));
    const day = (await CourseService.loadModule("simple-present")).days[0]!;
    const rubric = buildRubric(day, "simple-present", CourseService.getModule("simple-present").title, null)!;
    await h.store.tryInsertPending({
      userId: USER_A,
      audioSha256: audioHash,
      rubricSha256: await rubricSha256(rubric),
      coachVersion: FINAL_AUDIO_COACH_VERSION,
      moduleId: "simple-present",
      day: 1,
      takeNumber: 2,
      sourceTurnNumber: null,
      estimatedIdeaCount: null,
    });
    h.clock.t += PENDING_STALE_MS + 1000;
    const pa = runFinalAudioCoach(INPUT, h.deps);
    const pb = runFinalAudioCoach(INPUT, h.deps);
    await new Promise((r) => setTimeout(r, 10));
    release();
    const [ra, rb] = await Promise.all([pa, pb]);
    expect([ra.body.status, rb.body.status]).toContain("ready");
    expect([ra.body.status, rb.body.status].every((s) => s === "ready" || s === "pending")).toBe(true);
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(1);
  });
});

describe("Final Audio Coach — unclear, quota, errors", () => {
  it("CASE 8: unclear transcription → status unclear, 1 STT, 0 LLM; later request is a free cache hit", async () => {
    const h = harness({ transcript: "uh" });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("unclear");
    expect(h.counters.stt).toBe(1);
    expect(h.counters.llm).toBe(0);
    const again = await runFinalAudioCoach(INPUT, h.deps);
    expect(again.body.status).toBe("unclear");
    expect(h.counters.stt).toBe(1);
    const row = [...h.store.rows.values()][0]!;
    expect(row.strength_en).toBeNull();
  });

  it("CASE 9: quota exhausted → 429 with no paid call, but a cache hit still works", async () => {
    const path = recording().storage_path;
    const store = makeStore(() => 1_700_000_000_000);
    const audio = { [path]: audioOf("first") };
    const ok = harness({ store, audio });
    await runFinalAudioCoach(INPUT, ok.deps); // READY cached
    const limited = harness({ store, audio, quotaAllowed: false });
    const hit = await runFinalAudioCoach(INPUT, limited.deps);
    expect(hit.body.status).toBe("ready");
    expect(limited.counters.quota).toBe(0);
    audio[path] = audioOf("second");
    const blocked = await runFinalAudioCoach(INPUT, limited.deps);
    expect(blocked.http).toBe(429);
    expect(limited.counters.stt + limited.counters.llm).toBe(0);
    expect(COACH_QUOTA_ENDPOINT).toBe("final-audio-coach");
  });

  it("STT provider failure → status error (not learner failure), no LLM call", async () => {
    const h = harness({ transcript: null });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("error");
    expect(h.counters.llm).toBe(0);
    expect([...h.store.rows.values()][0]!.status).toBe("error");
  });

  it("invalid model output → status error, nothing invented", async () => {
    const h = harness({ llmReply: { taskCompleted: "yes", targetLanguage: "excellent" } });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.body.status).toBe("error");
    expect([...h.store.rows.values()][0]!.strength_en).toBeNull();
  });
});

describe("Final Audio Coach — rubric resolution", () => {
  it("CASE 10: ordinary STEP 5 (source_turn_number=null) → rubric from the real rep5Prompt", async () => {
    const day = (await CourseService.loadModule("simple-present")).days.find((d) => d.day === 1)!;
    const rubric = buildRubric(day, "simple-present", "SIMPLE PRESENT", null)!;
    expect(rubric.prompt?.question).toBe(day.rep5Prompt.question);
    expect(rubric.turn).toBeUndefined();
    expect(rubric.topic).toBe(day.topic);
  });

  it("CASE 11: Pressure Round (source_turn_number=2) → rubric from the real rep5Turns[1]", async () => {
    const days = (await CourseService.loadModule("advanced-1")).days;
    const day = days.find((d) => (d.rep5Turns?.length ?? 0) >= 2)!;
    const rubric = buildRubric(day, "advanced-1", "ADVANCED", 2)!;
    expect(rubric.turn?.text).toBe(day.rep5Turns![1]!.text);
    expect(rubric.prompt).toBeUndefined();
    expect(rubric.level).toBe("advanced");
    // Different turns → different rubric hashes.
    const other = buildRubric(day, "advanced-1", "ADVANCED", 1)!;
    expect(await rubricSha256(rubric)).not.toBe(await rubricSha256(other));
    // A turn that does not exist is refused.
    expect(buildRubric(day, "advanced-1", "ADVANCED", day.rep5Turns!.length + 1)).toBeNull();
  });

  it("CASE 11b: the engine uses source_turn_number from the trusted row", async () => {
    const days = (await CourseService.loadModule("advanced-1")).days;
    const day = days.find((d) => (d.rep5Turns?.length ?? 0) >= 2)!;
    const rec = recording({
      module_id: "advanced-1",
      day: day.day,
      take_number: 2,
      source_turn_number: 2,
      storage_path: `${USER_A}/advanced-1/${day.day}/take-2.webm`,
    });
    let seenRubricTurn: string | undefined;
    const h = harness({ recordings: [rec], audio: { [rec.storage_path]: audioOf("adv") } });
    const llm = h.deps.llm;
    h.deps.llm = async (rubric, transcript, ideas) => {
      seenRubricTurn = rubric.turn?.text;
      return llm(rubric, transcript, ideas);
    };
    const res = await runFinalAudioCoach({ moduleId: "advanced-1", day: day.day, takeNumber: 2 }, h.deps);
    expect(res.body.status).toBe("ready");
    expect(seenRubricTurn).toBe(day.rep5Turns![1]!.text);
    expect([...h.store.rows.values()][0]!.insert.sourceTurnNumber).toBe(2);
  });

  it("CASE 12: a retry slot (Take 4/5) answering Turn 1 keeps source_turn_number=1", () => {
    const day = { rep5Turns: [{ id: "a" }, { id: "b" }, { id: "c" }] } as unknown as CourseDay;
    expect(sourceTurnNumberFor(day, 3, "turn:0")).toBe(1);
    expect(sourceTurnNumberFor(day, 4, "turn:0")).toBe(1);
    expect(sourceTurnNumberFor(day, 4, "turn:2")).toBe(3);
    // Scripted slots map Take N → Turn N.
    expect(sourceTurnNumberFor(day, 0)).toBe(1);
    expect(sourceTurnNumberFor(day, 1)).toBe(2);
    // Classic STEP 5 has no turns.
    expect(sourceTurnNumberFor({ rep5Turns: undefined }, 0)).toBeNull();
    expect(sourceTurnNumberFor({ rep5Turns: undefined }, 4, "turn:0")).toBeNull();
    // Out-of-range retry slot without a label is not guessed.
    expect(sourceTurnNumberFor(day, 4)).toBeNull();
  });

  it("rubric hash is deterministic and changes with the coach version", async () => {
    const day = (await CourseService.loadModule("simple-present")).days[0]!;
    const a = buildRubric(day, "simple-present", "X", null)!;
    const b = buildRubric(day, "simple-present", "X", null)!;
    expect(await rubricSha256(a)).toBe(await rubricSha256(b));
    expect(await rubricSha256({ ...a, coachVersion: "v2" })).not.toBe(await rubricSha256(a));
  });
});

describe("Final Audio Coach — data hygiene & limits", () => {
  it("CASE 14: the stored row keeps transcript word count + compact feedback, never the transcript", async () => {
    const h = harness();
    await runFinalAudioCoach(INPUT, h.deps);
    const row = [...h.store.rows.values()][0]!;
    expect(row.transcript_word_count).toBeGreaterThan(5);
    const serialized = JSON.stringify(row);
    expect(serialized).not.toContain("San Salvador");
    expect(serialized).not.toContain(LONG_TRANSCRIPT);
    expect(Object.keys(row)).not.toContain("transcript");
    // Logs carry the count, not the words.
    const last = h.logs.at(-1)!;
    expect(last["transcriptWordCount"]).toBe(row.transcript_word_count);
    expect(JSON.stringify(last)).not.toContain("San Salvador");
  });

  it("CASE 13: RLS — learners can only read their own feedback; no browser write policy", () => {
    const dir = join(process.cwd(), "supabase", "migrations");
    const sql = readdirSync(dir)
      .map((f) => readFileSync(join(dir, f), "utf8"))
      .find((s) => s.includes("CREATE TABLE public.final_audio_coach_feedback"));
    expect(sql).toBeDefined();
    expect(sql).toMatch(/ENABLE ROW LEVEL SECURITY/);
    expect(sql).toMatch(/FOR SELECT TO authenticated USING \(auth\.uid\(\) = user_id\)/);
    expect(sql).not.toMatch(/FOR (INSERT|UPDATE|ALL)/);
    expect(sql).toMatch(/GRANT SELECT ON public\.final_audio_coach_feedback TO authenticated/);
    expect(sql).toMatch(/UNIQUE \(user_id, audio_sha256, rubric_sha256, coach_version\)/);
  });

  it("CASE 21: the byte ceiling covers the longest valid STEP 5 recording with headroom, and is bounded", async () => {
    // Longest authored classic goal is 420s → recorder cap goalSeconds[1] + 15.
    let longestGoal = 0;
    let longestTurn = 0;
    for (const id of ["basic-zero", "simple-present", "past-stories", "simple-future", "mixed-tenses", "eagles-week-1", "tigers", "sharks", "advanced-1"] as const) {
      for (const d of (await CourseService.loadModule(id)).days) {
        longestGoal = Math.max(longestGoal, d.goalSeconds[1]);
        for (const t of d.rep5Turns ?? []) longestTurn = Math.max(longestTurn, t.targetSeconds?.[1] ?? 0);
      }
    }
    const classicMax = longestGoal + 15;
    const pressureMax = Math.max(90, longestTurn + 15);
    expect(Math.max(classicMax, pressureMax)).toBeLessThanOrEqual(MAX_FINAL_AUDIO_SECONDS);
    const worstCaseBytes = (MAX_FINAL_AUDIO_SECONDS * RECORDER_BITS_PER_SECOND) / 8;
    expect(MAX_FINAL_AUDIO_BYTES).toBeGreaterThanOrEqual(worstCaseBytes * 2);
    expect(MAX_FINAL_AUDIO_BYTES).toBeLessThanOrEqual(16 * 1024 * 1024);
  });

  it("oversized stored audio is refused before hashing or AI", async () => {
    const path = recording().storage_path;
    const h = harness({ audio: { [path]: new Uint8Array(MAX_FINAL_AUDIO_BYTES + 1) } });
    const res = await runFinalAudioCoach(INPUT, h.deps);
    expect(res.http).toBe(413);
    expect(h.counters.stt + h.counters.llm + h.counters.quota).toBe(0);
  });

  it("output is validated and truncated to the hard length limits", () => {
    const long = "x".repeat(400);
    const fb = normalizeFeedback({ ...GOOD_LLM, strengthEn: long, nextStepEs: `${long} ${long}` })!;
    expect(fb.strengthEn.length).toBeLessThanOrEqual(120);
    expect(fb.nextStepEs.length).toBeLessThanOrEqual(160);
    expect(normalizeFeedback({ ...GOOD_LLM, targetLanguage: "excellent" })).toBeNull();
    expect(normalizeFeedback({ ...GOOD_LLM, strengthEs: "" })).toBeNull();
  });
});
