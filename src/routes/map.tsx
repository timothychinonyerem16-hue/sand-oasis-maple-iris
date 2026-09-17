import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Bookmark, Navigation, Search, X } from "lucide-react";
import { lazy, Suspense, useEffect, useState } from "react";
import { z } from "zod";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import {
  categoryLabel,
  getAllLocations,
  searchLocations,
  UNN_CENTER,
} from "@/lib/locations";
import { formatDistance, formatWalkingTime, getDistance } from "@/lib/utils";
import { useUserStore } from "@/store/user-store";

const CampusMap = lazy(() =>
  import("@/components/campus-map").then((m) => ({ default: m.CampusMap })),
);

const searchSchema = z.object({
  q: z.string().optional(),
  dest: z.string().optional(),
});

export const Route = createFileRoute("/map")({
  validateSearch: searchSchema,
  component: MapPage,
});

function MapPage() {
  const { q, dest } = Route.useSearch();
  const navigate = useNavigate();
  const [query, setQuery] = useState(q ?? "");
  const [selectedId, setSelectedId] = useState<string | null>(dest ?? null);
  const [userPos, setUserPos] = useState(UNN_CENTER);
  const [showResults, setShowResults] = useState(!!q);
  const [navigating, setNavigating] = useState(false);
  const [mapReady, setMapReady] = useState(false);
  const toggleSaved = useUserStore((s) => s.toggleSavedLocation);
  const saved = useUserStore((s) => s.savedLocationIds);

  const locations = query ? searchLocations(query) : getAllLocations();
  const selected = locations.find((l) => l.id === selectedId) ?? getAllLocations().find((l) => l.id === selectedId);

  useEffect(() => {
    setMapReady(true);
  }, []);

  useEffect(() => {
    if (dest) setSelectedId(dest);
  }, [dest]);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (p) => setUserPos({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => setUserPos(UNN_CENTER),
    );
  }, []);

  const dist = selected
    ? getDistance(userPos.lat, userPos.lng, selected.lat, selected.lng)
    : null;

  return (
    <AppShell flush>
      <div className="relative h-[calc(100svh-4rem)]">
        {mapReady ? (
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center bg-bg text-sm text-muted">
                Loading map…
              </div>
            }
          >
            <CampusMap
              locations={locations}
              selectedId={selectedId}
              userPos={userPos}
              onSelect={(id) => {
                setSelectedId(id);
                setNavigating(false);
              }}
            />
          </Suspense>
        ) : (
          <div className="flex h-full items-center justify-center bg-bg text-sm text-muted">
            Loading map…
          </div>
        )}

        <div className="absolute left-3 right-3 top-3 z-10">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              placeholder="Search campus…"
              className="h-12 w-full rounded-[var(--radius-lg)] border border-border bg-surface/95 pl-10 pr-10 text-sm shadow-card outline-none backdrop-blur"
            />
            {query && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-subtle"
                onClick={() => {
                  setQuery("");
                  setShowResults(false);
                  void navigate({ to: "/map", search: {} });
                }}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
          {showResults && query && (
            <div className="mt-2 max-h-56 overflow-y-auto rounded-[var(--radius-lg)] border border-border bg-surface shadow-card">
              {locations.length === 0 ? (
                <p className="p-4 text-center text-sm text-muted">No results for “{query}”</p>
              ) : (
                locations.slice(0, 8).map((loc) => (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setSelectedId(loc.id);
                      setQuery(loc.name);
                      setShowResults(false);
                    }}
                    className="flex w-full items-start border-b border-border px-4 py-3 text-left last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium">{loc.name}</p>
                      <p className="text-xs capitalize text-muted">{categoryLabel(loc.category)}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {selected && (
          <div className="absolute bottom-4 left-3 right-3 z-10 rounded-[var(--radius-xl)] border border-border bg-surface p-4 shadow-card">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold">{selected.name}</p>
                <p className="text-xs capitalize text-muted">
                  {categoryLabel(selected.category)}
                  {selected.isVerified && (
                    <span className="ml-2 rounded-full bg-ok-soft px-1.5 py-0.5 text-[10px] font-semibold text-ok">
                      Verified
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedId(null);
                  setNavigating(false);
                }}
                className="rounded-full p-1 text-subtle"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>
            {dist !== null && (
              <p className="mt-2 text-sm text-muted">
                {formatDistance(dist)} · {formatWalkingTime(dist)} walk
              </p>
            )}
            {selected.description && (
              <p className="mt-1 text-xs text-muted">{selected.description}</p>
            )}
            {navigating && dist !== null && (
              <p className="mt-2 rounded-[var(--radius-sm)] bg-accent-soft px-3 py-2 text-xs text-navy">
                Head toward {selected.name}. About {formatWalkingTime(dist)} on foot from your current position.
              </p>
            )}
            <div className="mt-3 flex gap-2">
              <Button
                className="flex-1"
                onClick={() => setNavigating(true)}
              >
                <Navigation size={16} /> {navigating ? "Navigating" : "Start navigation"}
              </Button>
              <Button
                variant={saved.includes(selected.id) ? "primary" : "outline"}
                size="icon"
                onClick={() => toggleSaved(selected.id)}
                aria-label="Save place"
              >
                <Bookmark size={18} fill={saved.includes(selected.id) ? "currentColor" : "none"} />
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
