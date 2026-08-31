import { cn } from "@/lib/utils";

export type ProgressStatus = { label: string; tone: "done" | "current" | "next" };

/** Shared COMPLETE / CURRENT / UP NEXT pill used by modules, weeks and days. */
export function StatusBadge({ status }: { status: ProgressStatus }) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]",
        status.tone === "done" && "bg-success/12 text-success",
        status.tone === "current" && "bg-primary text-primary-foreground",
        status.tone === "next" && "bg-secondary text-muted-foreground",
      )}
    >
      {status.label}
    </span>
  );
}
