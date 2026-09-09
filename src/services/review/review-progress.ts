import { supabase } from "@/integrations/supabase/client";
import { REVIEW_PRACTICE_COUNT, type ReviewModuleId, type ReviewPracticeNumber } from "@/lib/review-types";

/**
 * REVIEW progress — completely separate from the journey.
 * Completing a Review practice never completes a curriculum day, never moves
 * the streak and never counts for the 66-day habit.
 */
export type ReviewPracticeProgress = {
  practiceNumber: ReviewPracticeNumber;
  completedCount: number;
  lastCompletedAt: string | null;
  lastSpeakingSeconds: number;
  lastIdeaCount: number | null;
};

const LOCAL_KEY = "fluency.review.progress.v1";

type LocalShape = Record<string, ReviewPracticeProgress[]>;

function readLocal(): LocalShape {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as LocalShape) : {};
  } catch {
    return {};
  }
}

function writeLocal(next: LocalShape) {
  try {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(next));
  } catch {
    /* offline cache only */
  }
}

function emptyList(): ReviewPracticeProgress[] {
  return Array.from({ length: REVIEW_PRACTICE_COUNT }, (_, i) => ({
    practiceNumber: (i + 1) as ReviewPracticeNumber,
    completedCount: 0,
    lastCompletedAt: null,
    lastSpeakingSeconds: 0,
    lastIdeaCount: null,
  }));
}

export const ReviewProgress = {
  emptyList,

  /** Cloud is the source of truth; local storage is only an offline cache. */
  async load(moduleId: ReviewModuleId): Promise<ReviewPracticeProgress[]> {
    const list = emptyList();
    const cached = readLocal()[moduleId];
    if (cached) for (const row of cached) applyRow(list, row);

    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) return list;

    const { data, error } = await supabase
      .from("review_progress")
      .select("practice_number, completed_count, last_completed_at, last_speaking_seconds, last_idea_count")
      .eq("user_id", uid)
      .eq("review_module_id", moduleId);
    if (error || !data) return list;

    const fresh = emptyList();
    for (const row of data) {
      applyRow(fresh, {
        practiceNumber: row.practice_number as ReviewPracticeNumber,
        completedCount: row.completed_count,
        lastCompletedAt: row.last_completed_at,
        lastSpeakingSeconds: row.last_speaking_seconds,
        lastIdeaCount: row.last_idea_count,
      });
    }
    writeLocal({ ...readLocal(), [moduleId]: fresh });
    return fresh;
  },

  /** Records one finished practice (repeats are allowed and just add up). */
  async complete(input: {
    moduleId: ReviewModuleId;
    practiceNumber: ReviewPracticeNumber;
    speakingSeconds: number;
    ideaCount: number | null;
  }): Promise<void> {
    const local = readLocal();
    const list = local[input.moduleId] ?? emptyList();
    const current = list.find((p) => p.practiceNumber === input.practiceNumber);
    const nextCount = (current?.completedCount ?? 0) + 1;
    const now = new Date().toISOString();
    applyRow(list, {
      practiceNumber: input.practiceNumber,
      completedCount: nextCount,
      lastCompletedAt: now,
      lastSpeakingSeconds: Math.max(0, Math.round(input.speakingSeconds)),
      lastIdeaCount: input.ideaCount,
    });
    writeLocal({ ...local, [input.moduleId]: list });

    const { data: userData } = await supabase.auth.getUser();
    const uid = userData.user?.id;
    if (!uid) return;
    const { error } = await supabase.from("review_progress").upsert(
      {
        user_id: uid,
        review_module_id: input.moduleId,
        practice_number: input.practiceNumber,
        completed_count: nextCount,
        last_completed_at: now,
        last_speaking_seconds: Math.max(0, Math.round(input.speakingSeconds)),
        last_idea_count: input.ideaCount,
      },
      { onConflict: "user_id,review_module_id,practice_number" },
    );
    if (error) console.error("[review] progress save failed", error.message);
  },
};

function applyRow(list: ReviewPracticeProgress[], row: ReviewPracticeProgress) {
  const index = list.findIndex((p) => p.practiceNumber === row.practiceNumber);
  if (index >= 0) list[index] = row;
}
