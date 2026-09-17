"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, RefreshCw } from "lucide-react";
import AppShell from "@/components/AppShell";
import { SAMPLE_WATER, WaterPoint } from "@/data/locations";
import { getDistance, formatWalkingTime, timeAgo } from "@/lib/utils";
import { UNN_CENTER } from "@/data/locations";

export default function WaterPage() {
  const [points, setPoints] = useState<WaterPoint[]>(SAMPLE_WATER);
  const pos = UNN_CENTER;

  const report = (id: string, status: "available" | "unavailable") => {
    setPoints((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              status,
              lastReportedAt: new Date().toISOString(),
              reportedBy: "you",
            }
          : p
      )
    );
  };

  return (
    <AppShell>
      <div className="px-4 pt-6">
        <h1 className="mb-1 text-2xl font-bold text-navy-900">Find Water 💧</h1>
        <p className="mb-4 text-sm text-slate-500">
          Student-reported availability · tap to update
        </p>

        <div className="space-y-3">
          {points.map((point) => {
            const dist = getDistance(pos.lat, pos.lng, point.lat, point.lng);
            const statusColor =
              point.status === "available"
                ? "bg-emerald-50 text-emerald-700"
                : point.status === "unavailable"
                  ? "bg-red-50 text-red-600"
                  : "bg-amber-50 text-amber-700";
            const statusLabel =
              point.status === "available"
                ? "Available ✓"
                : point.status === "unavailable"
                  ? "Unavailable ✕"
                  : "Unknown";

            return (
              <div
                key={point.id}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-navy-900">{point.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {formatWalkingTime(dist)} away
                    </p>
                  </div>
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor}`}>
                    {statusLabel}
                  </span>
                </div>
                {point.lastReportedAt && (
                  <p className="mt-2 text-xs text-slate-400">
                    Reported {timeAgo(point.lastReportedAt)}
                    {point.reportedBy === "you" ? " by you" : " by students"}
                  </p>
                )}
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/map?dest=${point.id}`}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-sky-500 py-2.5 text-xs font-semibold text-white"
                  >
                    <MapPin size={14} /> Directions
                  </Link>
                  <button
                    onClick={() => report(point.id, "available")}
                    className="rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2.5 text-xs font-medium text-emerald-700"
                  >
                    Available
                  </button>
                  <button
                    onClick={() => report(point.id, "unavailable")}
                    className="rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-xs font-medium text-red-600"
                  >
                    Unavailable
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Status is community-reported and may not be 100% accurate.
        </p>
      </div>
    </AppShell>
  );
}
