import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface TimetableEntry {
  id: string;
  course: string;
  day: string;
  startTime: string;
  endTime: string;
  locationName?: string;
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
  university: string;
  faculty: string;
  department: string;
  level: string;
  onboardingComplete: boolean;
}

interface UserState {
  hydrated: boolean;
  profile: UserProfile | null;
  timetable: TimetableEntry[];
  assignments: Assignment[];
  savedLocationIds: string[];
  waterOverrides: Record<string, { status: "available" | "unavailable"; at: string }>;
  setHydrated: (v: boolean) => void;
  setProfile: (p: UserProfile) => void;
  addTimetableEntry: (entry: TimetableEntry) => void;
  removeTimetableEntry: (id: string) => void;
  addAssignment: (a: Assignment) => void;
  toggleAssignment: (id: string) => void;
  removeAssignment: (id: string) => void;
  toggleSavedLocation: (id: string) => void;
  reportWater: (id: string, status: "available" | "unavailable") => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      hydrated: false,
      profile: null,
      timetable: [],
      assignments: [],
      savedLocationIds: [],
      waterOverrides: {},
      setHydrated: (v) => set({ hydrated: v }),
      setProfile: (p) => set({ profile: p }),
      addTimetableEntry: (entry) =>
        set((s) => ({ timetable: [...s.timetable, entry] })),
      removeTimetableEntry: (id) =>
        set((s) => ({ timetable: s.timetable.filter((t) => t.id !== id) })),
      addAssignment: (a) => set((s) => ({ assignments: [...s.assignments, a] })),
      toggleAssignment: (id) =>
        set((s) => ({
          assignments: s.assignments.map((a) =>
            a.id === id ? { ...a, completed: !a.completed } : a,
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
      reportWater: (id, status) =>
        set((s) => ({
          waterOverrides: {
            ...s.waterOverrides,
            [id]: { status, at: new Date().toISOString() },
          },
        })),
      logout: () =>
        set({
          profile: null,
          timetable: [],
          assignments: [],
          savedLocationIds: [],
          waterOverrides: {},
        }),
    }),
    {
      name: "oqivio-user",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    },
  ),
);
