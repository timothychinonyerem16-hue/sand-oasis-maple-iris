import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { SAMPLE_WATER, UNN_CENTER, type WaterPoint } from "@/lib/locations";
import { formatWalkingTime, getDistance, timeAgo } from "@/lib/utils";
import { useUserStore } from "@/store/user-store";

export const Route = createFileRoute("/water")({ component: WaterPage });

function WaterPage() {
  const overrides = useUserStore((s) => s.waterOverrides);
  const reportWater = useUserStore((s) => s.reportWater);

  const points: WaterPoint[] = SAMPLE_WATER.map((p) => {
    const o = overrides[p.id];
    if (!o) return p;
    return { ...p, status: o.status, lastReportedAt: o.at, reportedBy: "you" };
  });

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold tracking-tight">Find water</h1>
      <p className="mt-1 text-sm text-muted">Student-reported availability — tap to update</p>
      <div className="mt-4 space-y-3">
        {points.map((point) => {
          const dist = getDistance(UNN_CENTER.lat, UNN_CENTER.lng, point.lat, point.lng);
          const badge =
            point.status === "available"
              ? "bg-ok-soft text-ok"
              : point.status === "unavailable"
                ? "bg-danger-soft text-danger"
                : "bg-warn-soft text-warn";
          const label =
            point.status === "available"
              ? "Available"
              : point.status === "unavailable"
                ? "Unavailable"
                : "Unknown";
          return (
            <article key={point.id} className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 shadow-card">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold">{point.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{formatWalkingTime(dist)} away</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${badge}`}>{label}</span>
              </div>
              {point.lastReportedAt && (
                <p className="mt-2 text-xs text-subtle">
                  Reported {timeAgo(point.lastReportedAt)}
                  {point.reportedBy === "you" ? " by you" : " by students"}
                </p>
              )}
              <div className="mt-3 flex gap-2">
                <Link
                  to="/map"
                  search={{ dest: point.id }}
                  className="flex h-11 flex-1 items-center justify-center gap-1 rounded-[var(--radius-md)] bg-ok text-xs font-semibold text-accent-fg"
                >
                  <MapPin size={14} /> Directions
                </Link>
                <Button variant="ok" size="sm" className="h-11" onClick={() => reportWater(point.id, "available")}>
                  Available
                </Button>
                <Button variant="danger" size="sm" className="h-11" onClick={() => reportWater(point.id, "unavailable")}>
                  Unavailable
                </Button>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-6 text-center text-xs text-subtle">
        Status is community-reported and may not be guaranteed.
      </p>
    </AppShell>
  );
}
