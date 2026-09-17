import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/store/user-store";

export const Route = createFileRoute("/study")({ component: StudyPage });

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function StudyPage() {
  const {
    timetable,
    assignments,
    addTimetableEntry,
    removeTimetableEntry,
    addAssignment,
    toggleAssignment,
    removeAssignment,
  } = useUserStore();

  const [showLecture, setShowLecture] = useState(false);
  const [showAssign, setShowAssign] = useState(false);
  const [course, setCourse] = useState("");
  const [day, setDay] = useState("Monday");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("11:00");
  const [loc, setLoc] = useState("");
  const [aTitle, setATitle] = useState("");
  const [aCourse, setACourse] = useState("");
  const [aDue, setADue] = useState("");

  return (
    <AppShell>
      <h1 className="text-2xl font-semibold tracking-tight">Study</h1>
      <p className="mt-1 text-sm text-muted">Your academic command center</p>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Timetable</h2>
          <Button variant="ghost" size="sm" onClick={() => setShowLecture(true)}>
            <Plus size={14} /> Add
          </Button>
        </div>
        {showLecture && (
          <div className="mb-3 space-y-2 rounded-[var(--radius-lg)] border border-border bg-surface p-4">
            <input
              placeholder="Course code (e.g. ANA201)"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="h-11 w-full rounded-[var(--radius-md)] border border-border px-3 text-sm"
            />
            <select
              value={day}
              onChange={(e) => setDay(e.target.value)}
              className="h-11 w-full rounded-[var(--radius-md)] border border-border px-3 text-sm"
            >
              {DAYS.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
            <div className="flex gap-2">
              <input type="time" value={start} onChange={(e) => setStart(e.target.value)} className="h-11 flex-1 rounded-[var(--radius-md)] border border-border px-3 text-sm" />
              <input type="time" value={end} onChange={(e) => setEnd(e.target.value)} className="h-11 flex-1 rounded-[var(--radius-md)] border border-border px-3 text-sm" />
            </div>
            <input
              placeholder="Location (optional)"
              value={loc}
              onChange={(e) => setLoc(e.target.value)}
              className="h-11 w-full rounded-[var(--radius-md)] border border-border px-3 text-sm"
            />
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => {
                  if (!course.trim()) return;
                  addTimetableEntry({
                    id: `t-${Date.now()}`,
                    course: course.trim(),
                    day,
                    startTime: start,
                    endTime: end,
                    locationName: loc || undefined,
                  });
                  setCourse("");
                  setLoc("");
                  setShowLecture(false);
                }}
              >
                Save
              </Button>
              <Button variant="outline" onClick={() => setShowLecture(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        {timetable.length === 0 ? (
          <Empty text="No lectures yet" hint="Add your timetable for reminders and quick navigation." />
        ) : (
          <ul className="space-y-2">
            {timetable.map((t) => (
              <li key={t.id} className="flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface px-3 py-3">
                <div>
                  <p className="font-medium">{t.course}</p>
                  <p className="text-xs text-muted">
                    {t.day} · {t.startTime}–{t.endTime}
                    {t.locationName ? ` · ${t.locationName}` : ""}
                  </p>
                </div>
                <button onClick={() => removeTimetableEntry(t.id)} className="p-2 text-subtle" aria-label="Remove lecture">
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold">Assignments</h2>
          <Button variant="ghost" size="sm" onClick={() => setShowAssign(true)}>
            <Plus size={14} /> Add
          </Button>
        </div>
        {showAssign && (
          <div className="mb-3 space-y-2 rounded-[var(--radius-lg)] border border-border bg-surface p-4">
            <input placeholder="Assignment title" value={aTitle} onChange={(e) => setATitle(e.target.value)} className="h-11 w-full rounded-[var(--radius-md)] border border-border px-3 text-sm" />
            <input placeholder="Course" value={aCourse} onChange={(e) => setACourse(e.target.value)} className="h-11 w-full rounded-[var(--radius-md)] border border-border px-3 text-sm" />
            <input type="date" value={aDue} onChange={(e) => setADue(e.target.value)} className="h-11 w-full rounded-[var(--radius-md)] border border-border px-3 text-sm" />
            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => {
                  if (!aTitle || !aDue) return;
                  addAssignment({
                    id: `a-${Date.now()}`,
                    title: aTitle,
                    course: aCourse,
                    dueDate: aDue,
                    completed: false,
                  });
                  setATitle("");
                  setACourse("");
                  setADue("");
                  setShowAssign(false);
                }}
              >
                Save
              </Button>
              <Button variant="outline" onClick={() => setShowAssign(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
        {assignments.length === 0 ? (
          <Empty text="No assignments yet" hint="Add your first assignment to keep track of deadlines." />
        ) : (
          <ul className="space-y-2">
            {assignments.map((a) => (
              <li key={a.id} className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-surface px-3 py-3">
                <button onClick={() => toggleAssignment(a.id)} aria-label="Toggle complete">
                  {a.completed ? (
                    <CheckCircle2 size={20} className="text-ok" />
                  ) : (
                    <Circle size={20} className="text-subtle" />
                  )}
                </button>
                <div className="flex-1">
                  <p className={a.completed ? "font-medium text-subtle line-through" : "font-medium"}>
                    {a.title}
                  </p>
                  <p className="text-xs text-muted">
                    {a.course} · Due {a.dueDate}
                  </p>
                </div>
                <button onClick={() => removeAssignment(a.id)} className="p-2 text-subtle" aria-label="Delete assignment">
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </AppShell>
  );
}

function Empty({ text, hint }: { text: string; hint: string }) {
  return (
    <div className="rounded-[var(--radius-xl)] border border-dashed border-border bg-surface p-6 text-center">
      <p className="text-sm text-muted">{text}</p>
      <p className="mt-1 text-xs text-subtle">{hint}</p>
    </div>
  );
}
