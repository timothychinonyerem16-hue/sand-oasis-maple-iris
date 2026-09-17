import { Link, useRouterState } from "@tanstack/react-router";
import { BookOpen, Building2, Home, Map, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

const tabs = [
  { to: "/", label: "Home", icon: Home },
  { to: "/map", label: "Map", icon: Map },
  { to: "/campus", label: "Campus", icon: Building2 },
  { to: "/study", label: "Study", icon: BookOpen },
  { to: "/profile", label: "Profile", icon: User },
] as const;

export function AppShell({
  children,
  flush,
}: {
  children: ReactNode;
  flush?: boolean;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideNav = pathname.startsWith("/onboarding");

  return (
    <div className="mx-auto flex min-h-svh max-w-lg flex-col bg-bg">
      <main className={cn("flex-1", flush ? "pb-16" : "px-4 pb-24 pt-6")}>
        {children}
      </main>
      {!hideNav && (
        <nav className="safe-bottom fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 backdrop-blur-md">
          <div className="mx-auto flex max-w-lg items-stretch justify-around px-1 py-1">
            {tabs.map(({ to, label, icon: Icon }) => {
              const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
              return (
                <Link
                  key={to}
                  to={to}
                  className={cn(
                    "flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-sm)] text-[11px] font-medium",
                    active ? "text-accent" : "text-muted",
                  )}
                >
                  <Icon size={20} strokeWidth={active ? 2.4 : 2} />
                  {label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
}
