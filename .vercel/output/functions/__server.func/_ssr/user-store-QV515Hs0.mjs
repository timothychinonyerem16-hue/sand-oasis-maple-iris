import { n as create, t as persist } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-store-QV515Hs0.js
var useUserStore = create()(persist((set) => ({
	hydrated: false,
	profile: null,
	timetable: [],
	assignments: [],
	savedLocationIds: [],
	waterOverrides: {},
	setHydrated: (v) => set({ hydrated: v }),
	setProfile: (p) => set({ profile: p }),
	addTimetableEntry: (entry) => set((s) => ({ timetable: [...s.timetable, entry] })),
	removeTimetableEntry: (id) => set((s) => ({ timetable: s.timetable.filter((t) => t.id !== id) })),
	addAssignment: (a) => set((s) => ({ assignments: [...s.assignments, a] })),
	toggleAssignment: (id) => set((s) => ({ assignments: s.assignments.map((a) => a.id === id ? {
		...a,
		completed: !a.completed
	} : a) })),
	removeAssignment: (id) => set((s) => ({ assignments: s.assignments.filter((a) => a.id !== id) })),
	toggleSavedLocation: (id) => set((s) => ({ savedLocationIds: s.savedLocationIds.includes(id) ? s.savedLocationIds.filter((x) => x !== id) : [...s.savedLocationIds, id] })),
	reportWater: (id, status) => set((s) => ({ waterOverrides: {
		...s.waterOverrides,
		[id]: {
			status,
			at: (/* @__PURE__ */ new Date()).toISOString()
		}
	} })),
	logout: () => set({
		profile: null,
		timetable: [],
		assignments: [],
		savedLocationIds: [],
		waterOverrides: {}
	})
}), {
	name: "oqivio-user",
	onRehydrateStorage: () => (state) => {
		state?.setHydrated(true);
	}
}));
//#endregion
export { useUserStore as t };
