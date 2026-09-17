import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { BookOpen, ChevronRight, Clock, Droplets, MapPin, Navigation, Search, Utensils } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { OqivioMark } from "@/components/logo";
import { AppShell } from "@/components/app-shell";
import { useHydrated } from "@/hooks/use-hydrated";
import {
  getAllLocations,
  SAMPLE_ANNOUNCEMENTS,
  UNN_CENTER,
} from "@/lib/locations";
import { formatWalkingTime, getDistance, greeting, timeAgo } from "@/lib/utils";
import { useUserStore } from "@/store/user-store";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const navigate = useNavigate();
  const hydrated = useHydrated();
  const profile = useUserStore((s) => s.profile);
  const timetable = useUserStore((s) => s.timetable);
  const [query, setQuery] = useState("");
  const [pos, setPos] = useState(UNN_CENTER);

  useEffect(() => {
    if (hydrated && !profile?.onboardingComplete) {
      void navigate({ to: "/onboarding" });
    }
  }, [hydrated, profile, navigate]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (p) => setPos({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => setPos(UNN_CENTER),
    );
  }, []);

  const nearby = useMemo(
    () =>
      getAllLocations()
        .map((loc) => ({ ...loc, dist: getDistance(pos.lat, pos.lng, loc.lat, loc.lng) }))
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 4),
    [pos],
  );

  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const nextLecture = timetable.find((t) => t.day === today);

  if (!hydrated || !profile?.onboardingComplete) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-2 bg-bg px-6 text-center">
        <OqivioMark className="size-12 text-accent" />
        <p className="text-lg font-semibold tracking-tight">OQIVIO</p>
        <p className="text-sm text-muted">Your campus. One place.</p>
      </div>
    );
  }

  return (
    <AppShell>
      <p className="text-sm text-muted">{greeting()},</p>
      <h1 className="mt-0.5 text-2xl font-semibold tracking-tight text-fg">
        {profile.name.split(" ")[0]}
      </h1>

      <form
        className="relative mt-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (query.trim()) {
            void navigate({ to: "/map", search: { q: query.trim() } });
          }
        }}
      >
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Where do you want to go?"
          className="h-12 w-full rounded-[var(--radius-lg)] border border-border bg-surface pl-10 pr-4 text-sm shadow-card outline-none focus:border-accent"
        />
      </form>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <QuickCard to="/map" title="Navigate" hint="Find a location" icon={Navigation} tone="navy" />
        <QuickCard to="/food" title="Food" hint="Nearby meals" icon={Utensils} tone="accent" />
        <QuickCard to="/water" title="Water" hint="Find water points" icon={Droplets} tone="ok" />
        <QuickCard to="/study" title="Study" hint="Timetable and tasks" icon={BookOpen} tone="navy" />
      </div>

      {nextLecture && (
        <section className="mt-6">
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wide text-subtle">
            Next lecture
          </h2>
          <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-4 shadow-card">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold">{nextLecture.course}</p>
                <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                  <Clock size={14} /> {nextLecture.startTime} – {nextLecture.endTime}
                </p>
                {nextLecture.locationName && (
                  <p className="mt-1 flex items-center gap-1 text-sm text-muted">
                    <MapPin size={14} /> {nextLecture.locationName}
                  </p>
                )}
              </div>
              <Link
                to="/map"
                search={{ q: nextLecture.locationName ?? nextLecture.course }}
                className="rounded-[var(--radius-sm)] bg-accent px-3 py-2 text-xs font-semibold text-accent-fg"
              >
                Navigate
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-subtle">Nearby</h2>
          <Link to="/map" className="text-xs font-semibold text-accent">
            See map
          </Link>
        </div>
        <div className="space-y-2">
          {nearby.map((loc) => (
            <Link
              key={loc.id}
              to="/map"
              search={{ dest: loc.id }}
              className="flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface px-3 py-3 shadow-card"
            >
              <div>
                <p className="text-sm font-medium">{loc.name}</p>
                <p className="text-xs capitalize text-muted">
                  {formatWalkingTime(loc.dist)} · {loc.category.replaceAll("_", " ")}
                </p>
              </div>
              <ChevronRight size={16} className="text-subtle" />
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-subtle">
            Campus updates
          </h2>
          <Link to="/campus" className="text-xs font-semibold text-accent">
            View all
          </Link>
        </div>
        <div className="space-y-2">
          {SAMPLE_ANNOUNCEMENTS.slice(0, 2).map((ann) => (
            <div key={ann.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-3 shadow-card">
              <div className="mb-1 flex items-center gap-2">
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase text-accent">
                  {ann.category}
                </span>
                <span className="text-xs text-subtle">{timeAgo(ann.postedAt)}</span>
              </div>
              <p className="text-sm font-medium">{ann.title}</p>
              <p className="mt-0.5 line-clamp-2 text-xs text-muted">{ann.body}</p>
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function QuickCard({
  to,
  title,
  hint,
  icon: Icon,
  tone,
}: {
  to: string;
  title: string;
  hint: string;
  icon: typeof Navigation;
  tone: "navy" | "accent" | "ok";
}) {
  const bg = tone === "navy" ? "bg-navy" : tone === "ok" ? "bg-ok" : "bg-accent";
  return (
    <Link
      to={to}
      className={`flex flex-col items-start gap-2 rounded-[var(--radius-lg)] p-4 text-accent-fg shadow-card ${bg}`}
    >
      <span className="rounded-[var(--radius-sm)] bg-accent-fg/15 p-2">
        <Icon size={20} />
      </span>
      <span className="font-semibold">{title}</span>
      <span className="text-xs text-accent-fg/80">{hint}</span>
    </Link>
  );
}
