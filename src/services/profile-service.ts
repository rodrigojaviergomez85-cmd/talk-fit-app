import type { GrammarIssue, LearnerProfile, ScoreBreakdown, SessionResult } from "@/lib/types";

/**
 * ProfileService — learner profile persistence.
 * MVP: localStorage. Later: swap the read/write pair for Lovable Cloud.
 */

const STORAGE_KEY = "fluency-reps:profile:v1";

export const defaultProfile: LearnerProfile = {
  studentId: "learner-001",
  name: "Rodrigo",
  level: "A2 · Elementary",
  lessonsCompleted: 24,
  streakDays: 7,
  speakingMinutesThisWeek: 42,
  weeklyGoalMinutes: 60,
  totalSpeakingMinutes: 186,
  fluencyScore: 72,
  bestContinuousSeconds: 39,
  history: [
    { day: 1, score: 62, label: "Day 1" },
    { day: 7, score: 68, label: "Day 7" },
    { day: 14, score: 73, label: "Day 14" },
    { day: 21, score: 76, label: "Day 21" },
    { day: 30, score: 81, label: "Day 30" },
  ],
  sessions: [],
  mistakes: [
    {
      id: "m1",
      category: "third-person-s",
      categoryLabel: "Third person",
      wrong: "She work from home.",
      right: "She works from home.",
      occurrences: 4,
      lastSeen: "Yesterday",
    },
    {
      id: "m2",
      category: "because",
      categoryLabel: "Because",
      wrong: "Because is easy.",
      right: "Because it is easy.",
      occurrences: 2,
      lastSeen: "2 days ago",
    },
    {
      id: "m3",
      category: "future",
      categoryLabel: "Future",
      wrong: "Tomorrow I go to work early.",
      right: "Tomorrow I am going to work early.",
      occurrences: 2,
      lastSeen: "3 days ago",
    },
  ],
  strongestSkill: "Using BECAUSE",
  priorities: ["Third person -S", "Reduce long pauses", "Connect common phrases"],
};

function labelFor(category: GrammarIssue["category"]): string {
  switch (category) {
    case "third-person-s":
      return "Third person";
    case "because":
      return "Because";
    case "future":
      return "Future";
    case "frequency":
      return "Frequency";
    default:
      return "Simple Present";
  }
}

export const ProfileService = {
  load(): LearnerProfile {
    if (typeof window === "undefined") return defaultProfile;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultProfile;
      return { ...defaultProfile, ...(JSON.parse(raw) as Partial<LearnerProfile>) };
    } catch {
      return defaultProfile;
    }
  },

  save(profile: LearnerProfile) {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {
      /* storage unavailable */
    }
  },

  recordSession(
    profile: LearnerProfile,
    result: {
      lessonId: string;
      score: number;
      breakdown: ScoreBreakdown;
      finalSeconds: number;
      fixed: string[];
      transcript: string;
      remainingIssues: GrammarIssue[];
    },
  ): LearnerProfile {
    const session: SessionResult = {
      date: new Date().toISOString(),
      lessonId: result.lessonId,
      score: result.score,
      breakdown: result.breakdown,
      finalSeconds: result.finalSeconds,
      fixed: result.fixed,
      transcript: result.transcript,
    };

    const mistakes = [...profile.mistakes];
    for (const issue of result.remainingIssues) {
      const existing = mistakes.find((m) => m.category === issue.category);
      if (existing) {
        existing.occurrences += 1;
        existing.lastSeen = "Today";
        existing.wrong = issue.said;
        existing.right = issue.correct;
      } else {
        mistakes.push({
          id: issue.id,
          category: issue.category,
          categoryLabel: labelFor(issue.category),
          wrong: issue.said,
          right: issue.correct,
          occurrences: 1,
          lastSeen: "Today",
        });
      }
    }
    // Fixed patterns lose priority weight and eventually drop off the list.
    for (const fixedLabel of result.fixed) {
      const target = mistakes.find((m) => m.right === fixedLabel || m.wrong === fixedLabel);
      if (target) target.occurrences = Math.max(0, target.occurrences - 1);
    }

    const minutes = Math.round((result.finalSeconds / 60) * 10) / 10;
    const updated: LearnerProfile = {
      ...profile,
      lessonsCompleted: profile.lessonsCompleted + 1,
      streakDays: profile.streakDays + 1,
      speakingMinutesThisWeek: Math.round(profile.speakingMinutesThisWeek + minutes + 8),
      totalSpeakingMinutes: Math.round(profile.totalSpeakingMinutes + minutes + 8),
      fluencyScore: result.score,
      bestContinuousSeconds: Math.max(profile.bestContinuousSeconds, Math.round(result.finalSeconds)),
      sessions: [session, ...profile.sessions].slice(0, 30),
      mistakes: mistakes.filter((m) => m.occurrences > 0).sort((a, b) => b.occurrences - a.occurrences),
      history: [...profile.history, { day: profile.history.length * 7 + 1, score: result.score, label: "Today" }].slice(-6),
    };
    ProfileService.save(updated);
    return updated;
  },

  /** Recurring weakness detection for adaptive reps. */
  recurringWeakness(profile: LearnerProfile) {
    const top = [...profile.mistakes].sort((a, b) => b.occurrences - a.occurrences)[0];
    if (!top || top.occurrences < 3) return null;
    return top;
  },

  /** Local YYYY-MM-DD key for a date. */
  dayKey(date = new Date()): string {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  },

  /** True when today's 5 daily reps were already saved as complete. */
  isTodayCompleted(profile: LearnerProfile): boolean {
    return profile.lastCompletedDate === ProfileService.dayKey();
  },

  /**
   * Saves today as a completed day and updates the streak.
   * Idempotent: calling it twice on the same day changes nothing.
   */
  completeToday(profile: LearnerProfile): LearnerProfile {
    const today = ProfileService.dayKey();
    if (profile.lastCompletedDate === today) return profile;

    const yesterday = ProfileService.dayKey(new Date(Date.now() - 24 * 60 * 60 * 1000));
    const streakDays = profile.lastCompletedDate === yesterday ? profile.streakDays + 1 : 1;

    const updated: LearnerProfile = {
      ...profile,
      streakDays,
      lastCompletedDate: today,
      repsCompletedToday: 5,
      lessonsCompleted: profile.lessonsCompleted + 1,
    };
    ProfileService.save(updated);
    return updated;
  },
};

