"use client";

import BottomNav from "./BottomNav";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex min-h-screen max-w-lg flex-col bg-slate-50">
      <main className="flex-1 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
