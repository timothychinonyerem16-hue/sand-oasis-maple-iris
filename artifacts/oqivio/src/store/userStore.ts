"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TimetableEntry {
  id: string;
  course: string;
  day: string; // Monday, Tuesday...
  startTime: string; // "10:00"
  endTime: string;
  locationId?: string;
  locationName?: string;
  lecturer?: string;
}

export interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  completed: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  university: string;
  faculty: string;
  department: string;
  level: string;
  onboardingComplete: boolean;
}

interface UserState {
  profile: UserProfile | null;
  timetable: TimetableEntry[];
  assignments: Assignment[];
  savedLocationIds: string[];
  setProfile: (p: UserProfile) => void;
  updateProfile: (partial: Partial<UserProfile>) => void;
  addTimetableEntry: (entry: TimetableEntry) => void;
  removeTimetableEntry: (id: string) => void;
  addAssignment: (a: Assignment) => void;
  toggleAssignment: (id: string) => void;
  removeAssignment: (id: string) => void;
  toggleSavedLocation: (id: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      profile: null,
      timetable: [],
      assignments: [],
      savedLocationIds: [],
      setProfile: (p) => set({ profile: p }),
      updateProfile: (partial) =>
        set((s) => ({
          profile: s.profile ? { ...s.profile, ...partial } : null,
        })),
      addTimetableEntry: (entry) =>
        set((s) => ({ timetable: [...s.timetable, entry] })),
      removeTimetableEntry: (id) =>
        set((s) => ({
          timetable: s.timetable.filter((t) => t.id !== id),
        })),
      addAssignment: (a) =>
        set((s) => ({ assignments: [...s.assignments, a] })),
      toggleAssignment: (id) =>
        set((s) => ({
          assignments: s.assignments.map((a) =>
            a.id === id ? { ...a, completed: !a.completed } : a
          ),
        })),
      removeAssignment: (id) =>
        set((s) => ({
          assignments: s.assignments.filter((a) => a.id !== id),
        })),
      toggleSavedLocation: (id) =>
        set((s) => ({
          savedLocationIds: s.savedLocationIds.includes(id)
            ? s.savedLocationIds.filter((x) => x !== id)
            : [...s.savedLocationIds, id],
        })),
      logout: () =>
        set({
          profile: null,
          timetable: [],
          assignments: [],
          savedLocationIds: [],
        }),
    }),
    { name: "oqivio-user" }
  )
);
