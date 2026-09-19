import { createFileRoute } from "@tanstack/react-router";
import { ScheduleReminderCard } from "@/components/fluency/ScheduleReminderCard";

export const Route = createFileRoute("/tmp-rem-preview")({
  ssr: false,
  component: () => (
    <div className="min-h-screen bg-background p-4">
      <ScheduleReminderCard variant="first" onDismiss={() => undefined} />
    </div>
  ),
});
