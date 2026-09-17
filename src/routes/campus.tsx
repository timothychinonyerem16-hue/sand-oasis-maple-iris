import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { SAMPLE_ANNOUNCEMENTS } from "@/lib/locations";
import { timeAgo } from "@/lib/utils";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/campus")({ component: CampusPage });

const TABS = ["All", "University", "Faculty", "Department", "Events"] as const;

function CampusPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");
  const items = SAMPLE_ANNOUNCEMENTS.filter(
    (a) => tab === "All" || a.category.toLowerCase() === tab.toLowerCase(),
  );

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold tracking-tight">Campus</h1>
      <p className="mt-1 text-sm text-muted">Announcements, events and opportunities</p>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "h-9 shrink-0 rounded-full px-4 text-xs font-semibold",
              t === tab ? "bg-navy text-accent-fg" : "border border-border bg-surface text-muted",
            )}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-4 space-y-3">
        {items.length === 0 ? (
          <div className="rounded-[var(--radius-xl)] border border-dashed border-border bg-surface p-8 text-center">
            <p className="text-sm text-muted">Nothing in this category yet.</p>
          </div>
        ) : (
          items.map((ann) => (
            <article key={ann.id} className="rounded-[var(--radius-xl)] border border-border bg-surface p-4 shadow-card">
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase text-accent">
                  {ann.category}
                </span>
                {ann.isVerified && (
                  <span className="rounded-full bg-ok-soft px-2 py-0.5 text-[10px] font-semibold text-ok">
                    Verified
                  </span>
                )}
                <span className="ml-auto text-xs text-subtle">{timeAgo(ann.postedAt)}</span>
              </div>
              <h3 className="font-semibold">{ann.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{ann.body}</p>
            </article>
          ))
        )}
      </div>
      <div className="mt-8 rounded-[var(--radius-xl)] border border-dashed border-border bg-surface p-6 text-center">
        <p className="text-sm font-medium">Events and opportunities</p>
        <p className="mt-1 text-xs text-muted">
          Scholarships, seminars and club activities land here in the next version.
        </p>
      </div>
    </AppShell>
  );
}
