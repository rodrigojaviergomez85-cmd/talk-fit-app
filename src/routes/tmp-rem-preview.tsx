import { createFileRoute } from "@tanstack/react-router";
import { ScheduleReminderCard } from "@/components/fluency/ScheduleReminderCard";

function Preview() {
  return (
    <div className="min-h-screen bg-background p-4">
      <p>PREVIEW MARKER</p>
      <ScheduleReminderCard variant="first" onDismiss={() => undefined} />
    </div>
  );
}

export const Route = createFileRoute("/tmp-rem-preview")({ component: Preview });
