import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, ChevronRight, LogOut, MapPin } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { useUserStore } from "@/store/user-store";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

function ProfilePage() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const profile = useUserStore((s) => s.profile);
  const logout = useUserStore((s) => s.logout);
  const savedCount = useUserStore((s) => s.savedLocationIds.length);
  const timetableCount = useUserStore((s) => s.timetable.length);

  if (!hydrated) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-bg">
        <div className="size-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (!profile) {
    return (
      <AppShell>
        <div className="flex min-h-[50vh] items-center justify-center">
          <Button onClick={() => void navigate({ to: "/onboarding" })}>Complete setup</Button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="flex items-center gap-4">
        <div className="flex size-16 items-center justify-center rounded-[var(--radius-lg)] bg-navy text-xl font-semibold text-accent-fg">
          {profile.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{profile.name}</h1>
          <p className="text-sm text-muted">
            {profile.level} Level · {profile.department}
          </p>
          <p className="text-xs text-subtle">{profile.university}</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-4 text-center shadow-card">
          <p className="text-2xl font-semibold tabular-nums">{savedCount}</p>
          <p className="text-xs text-muted">Saved places</p>
        </div>
        <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-4 text-center shadow-card">
          <p className="text-2xl font-semibold tabular-nums">{timetableCount}</p>
          <p className="text-xs text-muted">Lectures</p>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface shadow-card">
        <Link to="/map" className="flex items-center gap-3 border-b border-border px-4 py-3.5">
          <MapPin size={18} className="text-muted" />
          <span className="flex-1 text-sm font-medium">Saved places</span>
          <ChevronRight size={16} className="text-subtle" />
        </Link>
        <Link to="/study" className="flex items-center gap-3 px-4 py-3.5">
          <BookOpen size={18} className="text-muted" />
          <span className="flex-1 text-sm font-medium">My timetable</span>
          <ChevronRight size={16} className="text-subtle" />
        </Link>
      </div>

      <Button
        variant="danger"
        className="mt-6 w-full"
        onClick={() => {
          logout();
          void navigate({ to: "/onboarding" });
        }}
      >
        <LogOut size={16} /> Log out
      </Button>
      <p className="mt-8 text-center text-xs text-subtle">OQIVIO · Your Campus. One Place.</p>
    </AppShell>
  );
}
