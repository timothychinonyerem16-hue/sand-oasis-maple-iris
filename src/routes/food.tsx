import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Search, Star } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { SAMPLE_FOOD, UNN_CENTER } from "@/lib/locations";
import { formatWalkingTime, getDistance } from "@/lib/utils";

export const Route = createFileRoute("/food")({ component: FoodPage });

function FoodPage() {
  const [query, setQuery] = useState("");
  const filtered = SAMPLE_FOOD.filter(
    (f) =>
      !query ||
      f.name.toLowerCase().includes(query.toLowerCase()) ||
      f.menu?.some((m) => m.name.toLowerCase().includes(query.toLowerCase())) ||
      f.tags?.some((t) => t.includes(query.toLowerCase())),
  );

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold tracking-tight">Find food</h1>
      <p className="mt-1 text-sm text-muted">Nearby vendors on the UNN campus</p>
      <div className="relative mt-4">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rice, beans, under ₦1000…"
          className="h-12 w-full rounded-[var(--radius-lg)] border border-border bg-surface pl-10 pr-4 text-sm shadow-card outline-none focus:border-accent"
        />
      </div>
      <div className="mt-4 space-y-3">
        {filtered.map((vendor) => {
          const dist = getDistance(UNN_CENTER.lat, UNN_CENTER.lng, vendor.lat, vendor.lng);
          return (
            <article key={vendor.id} className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 shadow-card">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{vendor.name}</p>
                  <p className="mt-0.5 text-xs text-muted">
                    {vendor.priceRange} · {formatWalkingTime(dist)} away
                  </p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                    vendor.isOpen ? "bg-ok-soft text-ok" : "bg-danger-soft text-danger"
                  }`}
                >
                  {vendor.isOpen ? "Open" : "Closed"}
                </span>
              </div>
              {vendor.menu && (
                <ul className="mt-3 space-y-1">
                  {vendor.menu.slice(0, 3).map((item) => (
                    <li key={item.name} className="flex justify-between text-sm">
                      <span className="text-muted">{item.name}</span>
                      <span className="font-medium">₦{item.price.toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-3 flex gap-2">
                <Link
                  to="/map"
                  search={{ dest: vendor.id }}
                  className="flex h-11 flex-1 items-center justify-center gap-1 rounded-[var(--radius-md)] bg-accent text-xs font-semibold text-accent-fg"
                >
                  <MapPin size={14} /> Directions
                </Link>
                {vendor.rating != null && (
                  <div className="flex h-11 items-center gap-1 rounded-[var(--radius-md)] border border-border px-3 text-xs text-muted">
                    <Star size={12} className="fill-warn text-warn" />
                    {vendor.rating.toFixed(1)}
                  </div>
                )}
              </div>
            </article>
          );
        })}
        {filtered.length === 0 && (
          <div className="rounded-[var(--radius-xl)] border border-dashed border-border bg-surface p-8 text-center">
            <p className="text-sm text-muted">No food spots match that search.</p>
            <p className="mt-1 text-xs text-subtle">Try a meal name or vendor.</p>
          </div>
        )}
      </div>
    </AppShell>
  );
}
