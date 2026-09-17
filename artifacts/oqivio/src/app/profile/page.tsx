"use client";

import { useRouter } from "next/navigation";
import {
  User,
  BookOpen,
  MapPin,
  Settings,
  LogOut,
  ChevronRight,
  Moon,
} from "lucide-react";
import AppShell from "@/components/AppShell";
import { useUserStore } from "@/store/userStore";

export default function ProfilePage() {
  const router = useRouter();
  const profile = useUserStore((s) => s.profile);
  const logout = useUserStore((s) => s.logout);
  const savedCount = useUserStore((s) => s.savedLocationIds.length);
  const timetableCount = useUserStore((s) => s.timetable.length);

  if (!profile) {
    return (
      <AppShell>
        <div className="flex min-h-[50vh] items-center justify-center">
          <button
            onClick={() => router.push("/onboarding")}
            className="rounded-2xl bg-electric-600 px-6 py-3 font-semibold text-white"
          >
            Complete setup
          </button>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="px-4 pt-6">
        {/* Profile header */}
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-navy-900 text-2xl font-bold text-white">
            {profile.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-navy-900">{profile.name}</h1>
            <p className="text-sm text-slate-500">
              {profile.level} Level · {profile.department}
            </p>
            <p className="text-xs text-slate-400">{profile.university}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-navy-900">{savedCount}</p>
            <p className="text-xs text-slate-500">Saved places</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm">
            <p className="text-2xl font-bold text-navy-900">{timetableCount}</p>
            <p className="text-xs text-slate-500">Lectures</p>
          </div>
        </div>

        {/* Menu */}
        <div className="space-y-1 rounded-2xl border border-slate-100 bg-white shadow-sm">
          {[
            { icon: MapPin, label: "My Saved Places", href: "/map" },
            { icon: BookOpen, label: "My Timetable", href: "/study" },
            { icon: Settings, label: "Settings", href: "#" },
            { icon: Moon, label: "Appearance", href: "#" },
          ].map(({ icon: Icon, label, href }) => (
            <button
              key={label}
              onClick={() => href !== "#" && router.push(href)}
              className="flex w-full items-center gap-3 border-b border-slate-50 px-4 py-3.5 last:border-0"
            >
              <Icon size={18} className="text-slate-500" />
              <span className="flex-1 text-left text-sm font-medium text-navy-800">
                {label}
              </span>
              <ChevronRight size={16} className="text-slate-300" />
            </button>
          ))}
        </div>

        <button
          onClick={() => {
            logout();
            router.replace("/onboarding");
          }}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 py-3.5 text-sm font-semibold text-red-600"
        >
          <LogOut size={16} /> Log out
        </button>

        <p className="mt-8 text-center text-xs text-slate-400">
          OQIVIO · Your Campus. One Place.
        </p>
      </div>
    </AppShell>
  );
}
