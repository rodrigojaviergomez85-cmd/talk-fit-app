import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BottomNav } from "./BottomNav";
import { SyncBanner } from "./SyncBanner";

export function AppShell({
  children,
  title,
  subtitle,
  hideHeader,
  hideSync,
}: {
  children: ReactNode;
  title?: string;
  /** Optional line under the title (used by Progress only). */
  subtitle?: string;
  /** Home uses its own top section, so the global header is hidden. */
  hideHeader?: boolean;
  /** Hide the sync status banner (used by Home to keep the top clean). */
  hideSync?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background pb-24">
      {!hideHeader ? (
        <header className="bg-navy px-5 pb-6 pt-[max(1.25rem,env(safe-area-inset-top))] text-navy-foreground">
          <div className="mx-auto w-full max-w-lg">
            <p className="text-[13px] font-extrabold uppercase tracking-[0.28em] text-primary">Fluency App</p>
            {title ? <h1 className="mt-2 text-2xl font-extrabold tracking-tight">{title}</h1> : null}
            {subtitle ? <p className="mt-1 text-[14px] text-navy-foreground/75">{subtitle}</p> : null}
          </div>
        </header>
      ) : null}
      <main
        className={cn(
          "mx-auto w-full max-w-lg px-4",
          hideHeader ? "pb-5 pt-[max(1.25rem,env(safe-area-inset-top))]" : "py-5",
        )}
      >
        {!hideSync ? <SyncBanner /> : null}
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
