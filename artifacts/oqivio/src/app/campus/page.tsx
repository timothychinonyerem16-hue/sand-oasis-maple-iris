"use client";

import { timeAgo } from "@/lib/utils";
import AppShell from "@/components/AppShell";
import { SAMPLE_ANNOUNCEMENTS } from "@/data/locations";

export default function CampusPage() {
  return (
    <AppShell>
      <div className="px-4 pt-6">
        <h1 className="mb-1 text-2xl font-bold text-navy-900">Campus</h1>
        <p className="mb-5 text-sm text-slate-500">
          Announcements, events & opportunities
        </p>

        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {["All", "University", "Faculty", "Department", "Events"].map(
            (tab) => (
              <button
                key={tab}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold ${
                  tab === "All"
                    ? "bg-navy-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className="space-y-3">
          {SAMPLE_ANNOUNCEMENTS.map((ann) => (
            <article
              key={ann.id}
              className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2">
                <span className="rounded-full bg-electric-50 px-2 py-0.5 text-[10px] font-semibold uppercase text-electric-700">
                  {ann.category}
                </span>
                {ann.isVerified && (
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                    Verified
                  </span>
                )}
                <span className="ml-auto text-xs text-slate-400">
                  {timeAgo(ann.postedAt)}
                </span>
              </div>
              <h3 className="font-semibold text-navy-900">{ann.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                {ann.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center">
          <p className="text-sm font-medium text-navy-800">Events & Opportunities</p>
          <p className="mt-1 text-xs text-slate-500">
            Coming in the next update — scholarships, seminars, club activities and more.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
