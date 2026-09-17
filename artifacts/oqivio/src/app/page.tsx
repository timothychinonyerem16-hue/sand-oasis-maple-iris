"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Navigation,
  Utensils,
  Droplets,
  BookOpen,
  Search,
  MapPin,
  ChevronRight,
  Clock,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { useUserStore } from "@/store/userStore";
import {
  SAMPLE_ANNOUNCEMENTS,
  SAMPLE_FOOD,
  SAMPLE_WATER,
  getAllLocations,
} from "@/data/locations";
import { timeAgo, getDistance, formatWalkingTime } from "@/lib/utils";
import { UNN_CENTER } from "@/data/locations";

export default function HomePage() {
  const router = useRouter();
  const profile = useUserStore((s) => s.profile);
  const timetable = useUserStore((s) => s.timetable);
  const [search, setSearch] = useState("");
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    if (!profile?.onboardingComplete) {
      router.replace("/onboarding");
    }
  }, [profile, router]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setUserPos({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          }),
        () => setUserPos(UNN_CENTER) // fallback to campus center
      );
    } else {
      setUserPos(UNN_CENTER);
    }
  }, []);

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  // Next lecture (simple demo)
  const today = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const nextLecture = timetable.find((t) => t.day === today);

  // Nearby (demo using campus center if no real pos)
  const pos = userPos || UNN_CENTER;
  const nearby = getAllLocations()
    .map((loc) => ({
      ...loc,
      dist: getDistance(pos.lat, pos.lng, loc.lat, loc.lng),
    }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, 4);

  if (!profile?.onboardingComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-electric-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <AppShell>
      <div className="px-4 pt-6">
        {/* Header */}
        <div className="mb-5">
          <p className="text-sm text-slate-500">{greeting},</p>
          <h1 className="text-2xl font-bold text-navy-900">
            {profile.name.split(" ")[0]} 👋
          </h1>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="search"
            placeholder="Where do you want to go?"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim()) {
                router.push(`/map?q=${encodeURIComponent(search.trim())}`);
              }
            }}
            className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm shadow-sm outline-none focus:border-electric-400 focus:ring-2 focus:ring-electric-100"
          />
        </div>

        {/* Quick Actions */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <Link
            href="/map"
            className="flex flex-col items-start gap-2 rounded-2xl bg-navy-900 p-4 text-white shadow-md transition active:scale-[0.98]"
          >
            <div className="rounded-xl bg-white/15 p-2">
              <Navigation size={22} />
            </div>
            <span className="font-semibold">Navigate</span>
            <span className="text-xs text-navy-200">Find a location</span>
          </Link>
          <Link
            href="/food"
            className="flex flex-col items-start gap-2 rounded-2xl bg-electric-600 p-4 text-white shadow-md transition active:scale-[0.98]"
          >
            <div className="rounded-xl bg-white/15 p-2">
              <Utensils size={22} />
            </div>
            <span className="font-semibold">Food</span>
            <span className="text-xs text-electric-100">Nearby meals</span>
          </Link>
          <Link
            href="/water"
            className="flex flex-col items-start gap-2 rounded-2xl bg-sky-500 p-4 text-white shadow-md transition active:scale-[0.98]"
          >
            <div className="rounded-xl bg-white/15 p-2">
              <Droplets size={22} />
            </div>
            <span className="font-semibold">Water</span>
            <span className="text-xs text-sky-100">Find water points</span>
          </Link>
          <Link
            href="/study"
            className="flex flex-col items-start gap-2 rounded-2xl bg-emerald-600 p-4 text-white shadow-md transition active:scale-[0.98]"
          >
            <div className="rounded-xl bg-white/15 p-2">
              <BookOpen size={22} />
            </div>
            <span className="font-semibold">Study</span>
            <span className="text-xs text-emerald-100">Timetable & more</span>
          </Link>
        </div>

        {/* Next Lecture */}
        {nextLecture && (
          <section className="mb-6">
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
              Next Lecture
            </h2>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-bold text-navy-900">
                    {nextLecture.course}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-sm text-slate-600">
                    <Clock size={14} />
                    {nextLecture.startTime} – {nextLecture.endTime}
                  </p>
                  {nextLecture.locationName && (
                    <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                      <MapPin size={14} />
                      {nextLecture.locationName}
                    </p>
                  )}
                </div>
                <Link
                  href={`/map?dest=${nextLecture.locationId || ""}`}
                  className="rounded-xl bg-electric-600 px-3 py-2 text-xs font-semibold text-white"
                >
                  Navigate
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* Nearby */}
        <section className="mb-6">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Nearby
            </h2>
            <Link href="/map" className="text-xs font-medium text-electric-600">
              See map
            </Link>
          </div>
          <div className="space-y-2">
            {nearby.map((loc) => (
              <Link
                key={loc.id}
                href={`/map?dest=${loc.id}`}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-3 shadow-sm transition active:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-lg">
                    {loc.category === "food"
                      ? "🍛"
                      : loc.category === "water"
                        ? "💧"
                        : loc.category === "atm"
                          ? "🏧"
                          : loc.category === "clinic"
                            ? "🏥"
                            : "📍"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-navy-900">
                      {loc.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatWalkingTime(loc.dist)} ·{" "}
                      {loc.category.replace("_", " ")}
                    </p>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-400" />
              </Link>
            ))}
          </div>
        </section>

        {/* Campus Updates */}
        <section className="mb-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Campus Updates
            </h2>
            <Link
              href="/campus"
              className="text-xs font-medium text-electric-600"
            >
              View all
            </Link>
          </div>
          <div className="space-y-2">
            {SAMPLE_ANNOUNCEMENTS.slice(0, 2).map((ann) => (
              <div
                key={ann.id}
                className="rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
              >
                <div className="mb-1 flex items-center gap-2">
                  <span className="rounded-full bg-electric-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-electric-700">
                    {ann.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    {timeAgo(ann.postedAt)}
                  </span>
                </div>
                <p className="text-sm font-medium text-navy-900">{ann.title}</p>
                <p className="mt-0.5 line-clamp-2 text-xs text-slate-500">
                  {ann.body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
