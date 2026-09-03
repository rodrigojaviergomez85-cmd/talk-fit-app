// TEMPORARY scratch route for visual verification — deleted after the check.
import { createFileRoute } from "@tanstack/react-router";
import { TakeBoard } from "@/components/fluency/TakeBoard";
import { ADVANCED_1_WEEK_1_DAYS } from "@/services/advanced-1-course";
import type { Recording } from "@/lib/types";

export const Route = createFileRoute("/zz-dev-recognition")({ component: Dev });

function Dev() {
  const day = ADVANCED_1_WEEK_1_DAYS[4]!;
  const turns = day.rep5Turns!;
  const fake = (i: number): Recording => ({ id: `f${i}`, url: null, durationSeconds: 30, createdAt: new Date().toISOString(), label: `Take ${i + 1}` });
  const takes = turns.map((_, i) => (i < 8 ? fake(i) : null));
  return (
    <div className="mx-auto max-w-md p-4">
      <TakeBoard takes={takes} finalIndex={null} goalSeconds={[240, 300]} turns={turns} onRecorded={() => {}} onDelete={() => {}} onSelectFinal={() => {}} />
    </div>
  );
}
