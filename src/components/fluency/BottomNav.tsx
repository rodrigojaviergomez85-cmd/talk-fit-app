import { Link } from "@tanstack/react-router";
import { BookOpen, BriefcaseBusiness, Headphones, Home, MessageCircle, User } from "lucide-react";
import { useT, type TKey } from "@/lib/i18n";

// HOME = do · REVIEW = reinforce · INTERVIEW = practice · METHOD = support · AI COACH = ask · ACCOUNT = manage.
// Practice is reached from Home / module CTAs; Progress lives in the Home menu.
const ITEMS = [
  { to: "/", key: "nav.home", icon: Home },
  { to: "/review", key: "nav.review", icon: BookOpen },
  { to: "/review/interview-simulators", key: "nav.interview", icon: BriefcaseBusiness, line2: "nav.interviewLine2", aria: "nav.interviewAria" },
  { to: "/natural-method", key: "nav.natural", icon: Headphones },
  { to: "/ai-coach", key: "nav.aiCoach", icon: MessageCircle },
  { to: "/profile", key: "nav.account", icon: User },
] as const satisfies readonly { to: string; key: TKey; icon: typeof Home; line2?: TKey; aria?: TKey }[];




export function BottomNav() {
  const t = useT();
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-card/95 backdrop-blur-md">
      <ul className="mx-auto flex w-full max-w-lg items-stretch justify-between px-1 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1.5">
        {ITEMS.map(({ to, key, icon: Icon, line2, aria }) => {
          const label = t(key);
          const ariaLabel = aria ? t(aria) : label;
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                activeOptions={{ exact: to === "/" }}
                className="flex flex-col items-center gap-0.5 rounded-2xl py-1.5 font-semibold leading-none text-muted-foreground transition-colors"
                activeProps={{ className: "!text-primary" }}
                aria-label={ariaLabel}
              >
                <Icon className="size-5" />
                {line2 ? (
                  <span className="flex flex-col items-center">
                    <span className="text-[9px] font-bold uppercase tracking-[0.03em]">{label}</span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.03em]">{t(line2)}</span>
                  </span>
                ) : (
                  <span className="text-[9px] capitalize">{label.toLowerCase()}</span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

