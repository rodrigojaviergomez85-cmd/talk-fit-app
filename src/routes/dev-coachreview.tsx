import { createFileRoute } from "@tanstack/react-router";
import { FinalCoachReview } from "@/components/fluency/FinalCoachReview";

export const Route = createFileRoute("/dev-coachreview")({ component: Page });

function Page() {
  const es = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search).get("es") === "1";
  const feedback = {
    taskCompleted: true,
    targetLanguage: "developing" as const,
    organization: "good" as const,
    strengthEn: "You shared your routine clearly and connected your ideas well.",
    strengthEs: "Compartiste claramente tu rutina y conectaste bien tus ideas.",
    nextStepEn: "Add one reason with because.",
    nextStepEs: "Agrega una razón usando because.",
    correctionNeeded: true,
    said: "I took a shower",
    betterVersion: "I take a shower",
    whyEn: "You're talking about a routine, so use the simple present.",
    whyEs: "Estás hablando de una rutina, por eso usamos presente simple.",
    practicePhrase: "I take a shower and then I have breakfast.",
  };
  return (
    <div className="mx-auto max-w-md space-y-6 bg-background p-4">
      <FinalCoachReview state={{ status: "analyzing" }} showEs={es} onContinue={() => {}} />
      <FinalCoachReview state={{ status: "ready", feedback }} showEs={es} onContinue={() => {}} />
      <FinalCoachReview state={{ status: "ready", feedback: { ...feedback, correctionNeeded: false, said: null } }} showEs={es} onContinue={() => {}} />
      <FinalCoachReview state={{ status: "unclear" }} showEs={es} onContinue={() => {}} />
      <FinalCoachReview state={{ status: "unavailable" }} showEs={es} onContinue={() => {}} />
    </div>
  );
}
