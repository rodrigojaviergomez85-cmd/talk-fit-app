import { createFileRoute } from "@tanstack/react-router";
import { FinalCoachReview } from "@/components/fluency/FinalCoachReview";
export const Route = createFileRoute("/__coach-preview")({ component: P });
const fb = { taskCompleted: true, targetLanguage: "good" as const, organization: "good" as const,
  strengthEn: "You used several past verbs correctly.", strengthEs: "Usaste varios verbos en pasado correctamente.",
  nextStepEn: "Add when it happened: 'I visited my friends at seven.'", nextStepEs: "Agrega cuándo pasó: \"I visited my friends at seven.\"",
  correctionNeeded: true, said: "I go to my friend's house yesterday", betterVersion: "I went to my friend's house yesterday",
  whyEn: "For yesterday we use the past.", whyEs: "Para hablar de ayer usamos el verbo en pasado.", practicePhrase: "I went to my friend's house yesterday." };
function P() {
  const base = { sentenceCount: 4, countStatus: "done" as const, durationSeconds: 34, goalSentences: 5, goalSeconds: [30, 45] as [number, number], rolePlay: false };
  return <div className="mx-auto max-w-[394px] space-y-6 bg-background p-4">
    <FinalCoachReview state={{ status: "ready", feedback: fb }} showEs result={{ moduleId: "past-stories", ...base }} onContinue={() => {}} />
    <FinalCoachReview state={{ status: "analyzing" }} showEs result={{ moduleId: "past-stories", ...base, countStatus: "pending", sentenceCount: null }} onContinue={() => {}} />
    <FinalCoachReview state={{ status: "ready", feedback: fb }} showEs={false} result={{ moduleId: "advanced-1", ...base, rolePlay: true, durationSeconds: 42 }} onContinue={() => {}} />
  </div>;
}
