"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Search, X, Navigation, Bookmark, AlertTriangle } from "lucide-react";
import AppShell from "@/components/AppShell";
import {
  getAllLocations,
  searchLocations,
  UNN_CENTER,
} from "@/data/locations";
import { formatDistance, formatWalkingTime, getDistance } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";

const CampusMap = dynamic(() => import("@/components/CampusMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-slate-100 text-sm text-slate-500">
      Loading map…
    </div>
  ),
});

function MapContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  const destId = searchParams.get("dest");

  const [query, setQuery] = useState(q);
  const [selectedId, setSelectedId] = useState<string | null>(destId);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [showSearch, setShowSearch] = useState(!!q);
  const toggleSaved = useUserStore((s) => s.toggleSavedLocation);
  const saved = useUserStore((s) => s.savedLocationIds);

  const locations = query ? searchLocations(query) : getAllLocations();
  const selected = locations.find((l) => l.id === selectedId) || null;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserPos(UNN_CENTER)
      );
    } else {
      setUserPos(UNN_CENTER);
    }
  }, []);

  useEffect(() => {
    if (destId) setSelectedId(destId);
  }, [destId]);

  const dist =
    selected && userPos
      ? getDistance(userPos.lat, userPos.lng, selected.lat, selected.lng)
      : null;

  return (
    <div className="relative h-[calc(100vh-4rem)]">
      <div className="absolute inset-0">
        <CampusMap
          locations={locations}
          selectedId={selectedId}
          userPos={userPos}
          onSelect={setSelectedId}
        />
      </div>

      <div className="absolute left-0 right-0 top-0 z-10 p-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSearch(true);
            }}
            onFocus={() => setShowSearch(true)}
            placeholder="Search campus…"
            className="w-full rounded-2xl border border-slate-200 bg-white/95 py-3 pl-10 pr-10 text-sm shadow-lg outline-none backdrop-blur"
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                setShowSearch(false);
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {showSearch && query && (
          <div className="mt-2 max-h-60 overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-xl">
            {locations.length === 0 ? (
              <p className="p-4 text-center text-sm text-slate-500">No results for “{query}”</p>
            ) : (
              locations.slice(0, 8).map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    setSelectedId(loc.id);
                    setShowSearch(false);
                    setQuery(loc.name);
                  }}
                  className="flex w-full items-center gap-3 border-b border-slate-50 px-4 py-3 text-left last:border-0 hover:bg-slate-50"
                >
                  <span className="text-lg">
                    {loc.category === "food" ? "🍛" : loc.category === "water" ? "💧" : "📍"}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{loc.name}</p>
                    <p className="text-xs capitalize text-slate-500">
                      {loc.category.replace("_", " ")}
                    </p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {selected && (
        <div className="absolute bottom-4 left-3 right-3 z-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl">
          <div className="mb-1 flex items-start justify-between">
            <div>
              <p className="font-bold text-navy-900">{selected.name}</p>
              <p className="text-xs capitalize text-slate-500">
                {selected.category.replace("_", " ")}
                {selected.isVerified && (
                  <span className="ml-2 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                    Verified
                  </span>
                )}
              </p>
            </div>
            <button
              onClick={() => setSelectedId(null)}
              className="rounded-full p-1 text-slate-400 hover:bg-slate-100"
            >
              <X size={18} />
            </button>
          </div>
          {dist !== null && (
            <p className="mb-3 text-sm text-slate-600">
              🚶 {formatDistance(dist)} · {formatWalkingTime(dist)} walk
            </p>
          )}
          {selected.description && (
            <p className="mb-3 text-xs text-slate-500">{selected.description}</p>
          )}
          <div className="flex gap-2">
            <button
              onClick={() =>
                alert(
                  `Starting navigation to ${selected.name}\n\nDistance: ${dist ? formatDistance(dist) : "—"}\nEst. walking time: ${dist ? formatWalkingTime(dist) : "—"}`
                )
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-electric-600 py-3 text-sm font-semibold text-white"
            >
              <Navigation size={16} /> Start Navigation
            </button>
            <button
              onClick={() => toggleSaved(selected.id)}
              className={`rounded-xl border px-3 py-3 ${
                saved.includes(selected.id)
                  ? "border-electric-300 bg-electric-50 text-electric-700"
                  : "border-slate-200 text-slate-600"
              }`}
            >
              <Bookmark size={18} fill={saved.includes(selected.id) ? "currentColor" : "none"} />
            </button>
            <button className="rounded-xl border border-slate-200 px-3 py-3 text-slate-600">
              <AlertTriangle size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MapPage() {
  return (
    <AppShell>
      <Suspense fallback={<div className="flex h-64 items-center justify-center">Loading…</div>}>
        <MapContent />
      </Suspense>
    </AppShell>
  );
}
