"use client";

import { useState } from "react";
import { Plus, Trash2, CheckCircle2, Circle } from "lucide-react";
import AppShell from "@/components/AppShell";
import { useUserStore, TimetableEntry, Assignment } from "@/store/userStore";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function StudyPage() {
  const {
    timetable,
    assignments,
    addTimetableEntry,
    removeTimetableEntry,
    addAssignment,
    toggleAssignment,
    removeAssignment,
  } = useUserStore();

  const [showAddLecture, setShowAddLecture] = useState(false);
  const [showAddAssign, setShowAddAssign] = useState(false);
  const [course, setCourse] = useState("");
  const [day, setDay] = useState("Monday");
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("11:00");
  const [loc, setLoc] = useState("");
  const [aTitle, setATitle] = useState("");
  const [aCourse, setACourse] = useState("");
  const [aDue, setADue] = useState("");

  const addLecture = () => {
    if (!course) return;
    addTimetableEntry({
      id: `t-${Date.now()}`,
      course,
      day,
      startTime: start,
      endTime: end,
      locationName: loc || undefined,
    });
    setCourse("");
    setLoc("");
    setShowAddLecture(false);
  };

  const addAssign = () => {
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
    setShowAddAssign(false);
  };

  return (
    <AppShell>
      <div className="px-4 pt-6">
        <h1 className="mb-1 text-2xl font-bold text-navy-900">Study</h1>
        <p className="mb-5 text-sm text-slate-500">Your academic command center</p>

        {/* Timetable */}
        <section className="mb-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-navy-800">Timetable</h2>
            <button
              onClick={() => setShowAddLecture(true)}
              className="flex items-center gap-1 rounded-lg bg-electric-50 px-2.5 py-1.5 text-xs font-semibold text-electric-700"
            >
              <Plus size={14} /> Add
            </button>
          </div>

          {showAddLecture && (
            <div className="mb-3 space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
              <input
                placeholder="Course code (e.g. ANA201)"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                {DAYS.map((d) => (
                  <option key={d}>{d}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <input
                  type="time"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
                <input
                  type="time"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-sm"
                />
              </div>
              <input
                placeholder="Location (optional)"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={addLecture}
                  className="flex-1 rounded-xl bg-electric-600 py-2 text-sm font-semibold text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAddLecture(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {timetable.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center">
              <p className="text-sm text-slate-500">No lectures yet 📚</p>
              <p className="mt-1 text-xs text-slate-400">
                Add your timetable to get reminders and quick navigation.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {timetable.map((t) => (
                <div
                  key={t.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 bg-white px-3 py-3"
                >
                  <div>
                    <p className="font-medium text-navy-900">{t.course}</p>
                    <p className="text-xs text-slate-500">
                      {t.day} · {t.startTime}–{t.endTime}
                      {t.locationName ? ` · ${t.locationName}` : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => removeTimetableEntry(t.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Assignments */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-navy-800">Assignments</h2>
            <button
              onClick={() => setShowAddAssign(true)}
              className="flex items-center gap-1 rounded-lg bg-electric-50 px-2.5 py-1.5 text-xs font-semibold text-electric-700"
            >
              <Plus size={14} /> Add
            </button>
          </div>

          {showAddAssign && (
            <div className="mb-3 space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
              <input
                placeholder="Assignment title"
                value={aTitle}
                onChange={(e) => setATitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                placeholder="Course"
                value={aCourse}
                onChange={(e) => setACourse(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <input
                type="date"
                value={aDue}
                onChange={(e) => setADue(e.target.value)}
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm"
              />
              <div className="flex gap-2">
                <button
                  onClick={addAssign}
                  className="flex-1 rounded-xl bg-electric-600 py-2 text-sm font-semibold text-white"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowAddAssign(false)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {assignments.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center">
              <p className="text-sm text-slate-500">No assignments yet 📚</p>
              <p className="mt-1 text-xs text-slate-400">
                Add your first assignment to keep track of deadlines.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {assignments.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white px-3 py-3"
                >
                  <button onClick={() => toggleAssignment(a.id)}>
                    {a.completed ? (
                      <CheckCircle2 size={20} className="text-emerald-500" />
                    ) : (
                      <Circle size={20} className="text-slate-300" />
                    )}
                  </button>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        a.completed ? "text-slate-400 line-through" : "text-navy-900"
                      }`}
                    >
                      {a.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {a.course} · Due {a.dueDate}
                    </p>
                  </div>
                  <button
                    onClick={() => removeAssignment(a.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}
