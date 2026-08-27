import { analyzeSpeech } from "@/lib/speech-analysis.functions";
import type {
  GrammarIssue,
  FluencyMetrics,
  PronunciationTarget,
  RhythmTarget,
  ScoreBreakdown,
  SpeechAnalysis,
  StructureCheck,
} from "@/lib/types";


/**
 * SpeechAnalysisService — five-dimension analysis of a learner recording.
 *
 * MVP: deterministic heuristics over the transcript (mock AI) so the whole
 * Version 2 experience works without any API key. The interface is designed so
 * a real analysis API (pronunciation scoring, word timing, pause detection)
 * can be dropped in behind `analyze()`.
 */

export type AnalysisInput = {
  transcript: string;
  durationSeconds: number;
  /** Rep 10 gets a small "you focused on your fix" boost in the mock. */
  isFinalRep?: boolean;
  previousIssues?: GrammarIssue[];
};

const THIRD_PERSON_SUBJECTS = ["he", "she", "my sister", "my brother", "my manager", "my mother", "my father", "my friend", "my wife", "my husband"];
const BASE_VERBS = ["work", "live", "start", "finish", "like", "wake", "have", "go", "study", "play", "take", "make", "get", "do", "come", "leave", "need", "want"];
const FILLERS = ["um", "uh", "eh", "mmm", "este", "like like"];

function detectGrammarIssues(transcript: string): GrammarIssue[] {
  const issues: GrammarIssue[] = [];
  const lower = ` ${transcript.toLowerCase().replace(/[.,!?]/g, "")} `;

  // 1) Missing third person -S
  for (const subject of THIRD_PERSON_SUBJECTS) {
    for (const verb of BASE_VERBS) {
      const pattern = new RegExp(`\\b${subject}\\s+(usually\\s+|sometimes\\s+|always\\s+|never\\s+)?${verb}\\b`, "g");
      const match = pattern.exec(lower);
      if (match) {
        const adverb = match[1] ?? "";
        const said = `${subject} ${adverb}${verb}`.replace(/\s+/g, " ").trim();
        const corrected = `${subject} ${adverb}${verb === "have" ? "has" : verb === "go" || verb === "do" ? `${verb}es` : `${verb}s`}`
          .replace(/\s+/g, " ")
          .trim();
        issues.push({
          id: `g-third-${subject}-${verb}`,
          category: "third-person-s",
          said: capitalize(said),
          correct: capitalize(corrected),
          note: "After HE / SHE and singular people, add -S to the verb.",
        });
      }
    }
  }

  // 2) don't with he/she
  if (/\b(he|she)\s+(don't|dont|do not)\b/.test(lower)) {
    issues.push({
      id: "g-doesnt",
      category: "third-person-s",
      said: "He don't like coffee.",
      correct: "He doesn't like coffee.",
      note: "With HE / SHE use DOESN'T, not DON'T.",
    });
  }

  // 3) I + verb-s
  const iVerbS = /\bi\s+(usually\s+|sometimes\s+|always\s+)?(works|goes|likes|lives|starts|has)\b/.exec(lower);
  if (iVerbS) {
    issues.push({
      id: "g-i-verbs",
      category: "other",
      said: `I ${iVerbS[1] ?? ""}${iVerbS[2]}`.trim(),
      correct: `I ${iVerbS[1] ?? ""}${(iVerbS[2] ?? "").replace(/es$|s$/, "")}`.trim(),
      note: "Only HE / SHE / IT take the -S. Keep the base verb after I.",
    });
  }

  // 4) Future: "Tomorrow I go..."
  if (/\btomorrow i (go|start|work|study|wake)\b/.test(lower)) {
    issues.push({
      id: "g-future",
      category: "future",
      said: "Tomorrow I go to start earlier.",
      correct: "Tomorrow I am going to start earlier.",
      note: "Use AM GOING TO for tomorrow's plan.",
    });
  }

  // 5) Because without subject
  if (/\bbecause (is|are|was)\b/.test(lower)) {
    issues.push({
      id: "g-because",
      category: "because",
      said: "Because is easy.",
      correct: "Because it is easy.",
      note: "After BECAUSE you need a subject + verb.",
    });
  }

  // Keep it focused: never overwhelm the learner.
  return dedupe(issues).slice(0, 3);
}

function dedupe(issues: GrammarIssue[]): GrammarIssue[] {
  const seen = new Set<string>();
  return issues.filter((issue) => {
    const key = `${issue.category}-${issue.said.toLowerCase()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function analyzeFluency(transcript: string, seconds: number): FluencyMetrics {
  const words = transcript.trim().split(/\s+/).filter(Boolean).length;
  const sentences = transcript.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean).length;
  const wpm = seconds > 0 ? Math.round((words / seconds) * 60) : 0;
  const fillerWords = FILLERS.reduce(
    (total, filler) => total + (transcript.toLowerCase().match(new RegExp(`\\b${filler}\\b`, "g")) ?? []).length,
    0,
  );
  const longPauses = Math.max(0, Math.round((seconds * 60) / Math.max(wpm, 40) / 8) + (wpm < 90 ? 2 : 0) - (wpm > 120 ? 1 : 0));
  const continuityNote =
    seconds >= 35 && longPauses <= 2
      ? `You spoke for ${Math.round(seconds)} seconds without major pauses.`
      : longPauses > 2
        ? "You paused several times before finishing your ideas."
        : "Try connecting your sentences more smoothly.";
  return { seconds: Math.round(seconds), words, wordsPerMinute: wpm, longPauses, fillerWords, sentences, continuityNote };
}

function analyzePronunciation(transcript: string): PronunciationTarget[] {
  const candidates: PronunciationTarget[] = [
    { word: "usually", tip: "Three beats: YOO-zhoo-lee. Don't say 'oo-sual-ly'." },
    { word: "works", tip: "Finish the /ks/ sound clearly: work-s." },
    { word: "because", tip: "Weak first syllable: b'CAUSE, stress on CAUSE." },
    { word: "breakfast", tip: "BREK-fast — short first vowel." },
    { word: "tomorrow", tip: "t'MOR-row — stress the middle." },
  ];
  const lower = transcript.toLowerCase();
  const present = candidates.filter((c) => lower.includes(c.word.slice(0, 5)));
  return (present.length > 0 ? present : candidates).slice(0, 3);
}

function analyzeRhythm(transcript: string): RhythmTarget[] {
  const lower = transcript.toLowerCase();
  const targets: RhythmTarget[] = [];
  if (lower.includes("wake up")) {
    targets.push({ wordByWord: "I / usually / wake / up / at / six.", chunked: "I usually wake up / at six." });
  }
  if (lower.includes("work")) {
    targets.push({ wordByWord: "I / start / work / at / eight.", chunked: "I start work / at eight." });
  }
  if (targets.length === 0) {
    targets.push({ wordByWord: "I / like / my / job / because / it / is / fun.", chunked: "I like my job / because it's fun." });
  }
  return targets.slice(0, 2);
}

function analyzeStructure(transcript: string, sentences: number): StructureCheck[] {
  const lower = transcript.toLowerCase();
  const becauseCount = (lower.match(/\bbecause\b/g) ?? []).length;
  return [
    { label: `${sentences} sentences`, passed: sentences >= 7 && sentences <= 12, detail: "Target 7–10" },
    { label: "Simple Present", passed: /\b(i|he|she|my)\b/.test(lower) },
    { label: "He / She", passed: /\b(he|she|my (sister|brother|manager|friend|mother|father))\b/.test(lower) },
    { label: "Because", passed: becauseCount >= 1, detail: becauseCount >= 2 ? "Used twice ✓" : "Try using it twice" },
    { label: "Conclusion", passed: /\b(overall|in general|all in all)\b/.test(lower) },
    { label: "Tomorrow", passed: /\btomorrow\b/.test(lower) },
  ];
}

function clamp(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

export const SpeechAnalysisService = {
  /** Local heuristics only — used as fallback when the AI coach is unavailable. */
  async analyzeLocal(input: AnalysisInput): Promise<SpeechAnalysis> {
    const { transcript, durationSeconds } = input;
    const grammarIssues = input.isFinalRep ? detectGrammarIssues(transcript).slice(0, 1) : detectGrammarIssues(transcript);
    const fluency = analyzeFluency(transcript, durationSeconds);

    const pronunciation = analyzePronunciation(transcript);
    const rhythm = analyzeRhythm(transcript);
    const structure = analyzeStructure(transcript, fluency.sentences);

    const structureScore = clamp((structure.filter((s) => s.passed).length / structure.length) * 100);
    const timeScore = clamp(60 + Math.min(durationSeconds, 45) - 15);
    const grammarScore = clamp(92 - grammarIssues.length * 8 + (input.isFinalRep ? 6 : 0));
    const breakdown: ScoreBreakdown = {
      fluency: clamp((timeScore + Math.min(fluency.wordsPerMinute, 130)) / 2 - fluency.longPauses * 2),
      pronunciation: clamp(78 - pronunciation.length * 2 + (input.isFinalRep ? 4 : 0)),
      grammarAutomaticity: grammarScore,
      rhythm: clamp(84 - fluency.longPauses * 3 + (input.isFinalRep ? 3 : 0)),
      targetStructure: structureScore,
    };
    const score = clamp(
      (breakdown.fluency + breakdown.pronunciation + breakdown.grammarAutomaticity + breakdown.rhythm + breakdown.targetStructure) / 5,
    );

    const primary = grammarIssues[0];
    const focusLabel = primary
      ? primary.category === "third-person-s"
        ? "HE / SHE + S"
        : primary.category === "future"
          ? "TOMORROW I AM GOING TO"
          : primary.category === "because"
            ? "BECAUSE + SUBJECT"
            : "SIMPLE PRESENT"
      : fluency.longPauses > 2
        ? "NATURAL PAUSES"
        : "IDEA EXPANSION";

    const didWell =
      durationSeconds >= 35
        ? `You spoke continuously for ${Math.round(durationSeconds)} seconds.`
        : structure.find((s) => s.label === "Because")?.passed
          ? "You explained your reasons with BECAUSE."
          : "You kept going and finished your ideas.";

    const oneThingToImprove = primary
      ? primary.category === "third-person-s"
        ? "Remember to add -S after HE and SHE."
        : primary.note
      : fluency.longPauses > 2
        ? "Group words together so you pause less inside a sentence."
        : "Add one more detail to each idea: WHO, WHERE, WHEN or WHY.";

    return {
      id: `analysis-${Date.now()}`,
      createdAt: new Date().toISOString(),
      transcript,
      grammarIssues,
      fluency,
      pronunciation,
      rhythm,
      structure,
      score,
      breakdown,
      didWell,
      oneThingToImprove,
      focusLabel,
    };
  },

  /** Real AI correction with local analysis as fallback. */
  async analyze(input: AnalysisInput): Promise<SpeechAnalysis> {
    const local = await this.analyzeLocal(input);
    try {
      const response = await analyzeSpeech({
        data: {
          transcript: input.transcript,
          durationSeconds: input.durationSeconds,
          targetStructure: input.targetStructure ?? "Simple Present",
          isFinalRep: input.isFinalRep ?? false,
        },
      });

      if (!response.ok) return { ...local, aiError: response.error };

      const ai = response.result;
      const grammarIssues: GrammarIssue[] = ai.corrections.slice(0, 3).map((correction, index) => ({
        id: `ai-${index}-${correction.category}`,
        category: correction.category,
        said: correction.said,
        correct: correction.correct,
        note: correction.note,
      }));

      const breakdown: ScoreBreakdown = {
        fluency: clamp(ai.scores.fluency),
        pronunciation: clamp(ai.scores.pronunciation),
        grammarAutomaticity: clamp(ai.scores.grammarAutomaticity),
        rhythm: clamp(ai.scores.rhythm),
        targetStructure: clamp(ai.scores.targetStructure),
      };

      return {
        ...local,
        grammarIssues,
        breakdown,
        score: clamp(
          (breakdown.fluency + breakdown.pronunciation + breakdown.grammarAutomaticity + breakdown.rhythm + breakdown.targetStructure) / 5,
        ),
        didWell: ai.didWell,
        oneThingToImprove: ai.oneThingToImprove,
        focusLabel: ai.focusLabel,
        aiPowered: true,
      };
    } catch (error) {
      return { ...local, aiError: error instanceof Error ? error.message : "AI unavailable" };
    }
  },

};
