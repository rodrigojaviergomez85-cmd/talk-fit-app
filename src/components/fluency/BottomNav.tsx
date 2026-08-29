import { Link } from "@tanstack/react-router";
import { BarChart3, Dumbbell, Home, Mic, User } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/practice", label: "Practice", icon: Dumbbell },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/recordings", label: "Recordings", icon: Mic },
  { to: "/profile", label: "Account", icon: User },
] as const;


export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-md">
      <ul className="mx-auto flex w-full max-w-lg items-stretch justify-between px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {ITEMS.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="flex flex-col items-center gap-1 rounded-2xl py-2 text-[11px] font-semibold text-muted-foreground transition-colors"
              activeProps={{ className: "!text-primary" }}
            >
              <Icon className="size-[22px]" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
