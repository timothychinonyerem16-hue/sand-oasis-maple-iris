"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Star } from "lucide-react";
import AppShell from "@/components/AppShell";
import { SAMPLE_FOOD } from "@/data/locations";
import { getDistance, formatWalkingTime } from "@/lib/utils";
import { UNN_CENTER } from "@/data/locations";

export default function FoodPage() {
  const [query, setQuery] = useState("");
  const pos = UNN_CENTER;

  const filtered = SAMPLE_FOOD.filter(
    (f) =>
      !query ||
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.menu?.some((m) => m.name.toLowerCase().includes(query.toLowerCase())) ||
      f.tags?.some((t) => t.includes(query.toLowerCase()))
  );

  return (
    <AppShell>
      <div className="px-4 pt-6">
        <h1 className="mb-1 text-2xl font-bold text-navy-900">Find Food 🍛</h1>
        <p className="mb-4 text-sm text-slate-500">Nearby vendors on campus</p>

        <div className="relative mb-5">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rice, beans, under ₦1000…"
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm shadow-sm outline-none focus:border-electric-400"
          />
        </div>

        <div className="space-y-3">
          {filtered.map((vendor) => {
            const dist = getDistance(pos.lat, pos.lng, vendor.lat, vendor.lng);
            return (
              <div
                key={vendor.id}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-navy-900">{vendor.name}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {vendor.priceRange} · {formatWalkingTime(dist)} away
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      vendor.isOpen
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-red-50 text-red-600"
                    }`}
                  >
                    {vendor.isOpen ? "Open" : "Closed"}
                  </span>
                </div>
                {vendor.menu && (
                  <div className="mt-3 space-y-1">
                    {vendor.menu.slice(0, 3).map((item) => (
                      <div key={item.name} className="flex justify-between text-sm">
                        <span className="text-slate-700">{item.name}</span>
                        <span className="font-medium text-navy-800">
                          ₦{item.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="mt-3 flex gap-2">
                  <Link
                    href={`/map?dest=${vendor.id}`}
                    className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-electric-600 py-2.5 text-xs font-semibold text-white"
                  >
                    <MapPin size={14} /> Directions
                  </Link>
                  {vendor.rating && (
                    <div className="flex items-center gap-1 rounded-xl border border-slate-200 px-3 text-xs text-slate-600">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      {vendor.rating}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center">
              <p className="text-sm text-slate-500">No food spots found nearby.</p>
              <p className="mt-1 text-xs text-slate-400">Try expanding your search.</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
