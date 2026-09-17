import { i as __toESM } from "../_runtime.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as CircleCheck, a as Trash2, c as Plus, g as Circle } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-Cykvw-yf.mjs";
import { t as useUserStore } from "./user-store-QV515Hs0.mjs";
import { t as Button } from "./button-B8sfoa3u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/study-CRoBxaJf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DAYS = [
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday"
];
function StudyPage() {
	const { timetable, assignments, addTimetableEntry, removeTimetableEntry, addAssignment, toggleAssignment, removeAssignment } = useUserStore();
	const [showLecture, setShowLecture] = (0, import_react.useState)(false);
	const [showAssign, setShowAssign] = (0, import_react.useState)(false);
	const [course, setCourse] = (0, import_react.useState)("");
	const [day, setDay] = (0, import_react.useState)("Monday");
	const [start, setStart] = (0, import_react.useState)("09:00");
	const [end, setEnd] = (0, import_react.useState)("11:00");
	const [loc, setLoc] = (0, import_react.useState)("");
	const [aTitle, setATitle] = (0, import_react.useState)("");
	const [aCourse, setACourse] = (0, import_react.useState)("");
	const [aDue, setADue] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold tracking-tight",
			children: "Study"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Your academic command center"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Timetable"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setShowLecture(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), " Add"]
					})]
				}),
				showLecture && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 space-y-2 rounded-[var(--radius-lg)] border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Course code (e.g. ANA201)",
							value: course,
							onChange: (e) => setCourse(e.target.value),
							className: "h-11 w-full rounded-[var(--radius-md)] border border-border px-3 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: day,
							onChange: (e) => setDay(e.target.value),
							className: "h-11 w-full rounded-[var(--radius-md)] border border-border px-3 text-sm",
							children: DAYS.map((d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: d }, d))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "time",
								value: start,
								onChange: (e) => setStart(e.target.value),
								className: "h-11 flex-1 rounded-[var(--radius-md)] border border-border px-3 text-sm"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "time",
								value: end,
								onChange: (e) => setEnd(e.target.value),
								className: "h-11 flex-1 rounded-[var(--radius-md)] border border-border px-3 text-sm"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Location (optional)",
							value: loc,
							onChange: (e) => setLoc(e.target.value),
							className: "h-11 w-full rounded-[var(--radius-md)] border border-border px-3 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1",
								onClick: () => {
									if (!course.trim()) return;
									addTimetableEntry({
										id: `t-${Date.now()}`,
										course: course.trim(),
										day,
										startTime: start,
										endTime: end,
										locationName: loc || void 0
									});
									setCourse("");
									setLoc("");
									setShowLecture(false);
								},
								children: "Save"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setShowLecture(false),
								children: "Cancel"
							})]
						})
					]
				}),
				timetable.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					text: "No lectures yet",
					hint: "Add your timetable for reminders and quick navigation."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: timetable.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: t.course
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted",
							children: [
								t.day,
								" · ",
								t.startTime,
								"–",
								t.endTime,
								t.locationName ? ` · ${t.locationName}` : ""
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => removeTimetableEntry(t.id),
							className: "p-2 text-subtle",
							"aria-label": "Remove lecture",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 })
						})]
					}, t.id))
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-semibold",
						children: "Assignments"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setShowAssign(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), " Add"]
					})]
				}),
				showAssign && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3 space-y-2 rounded-[var(--radius-lg)] border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Assignment title",
							value: aTitle,
							onChange: (e) => setATitle(e.target.value),
							className: "h-11 w-full rounded-[var(--radius-md)] border border-border px-3 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							placeholder: "Course",
							value: aCourse,
							onChange: (e) => setACourse(e.target.value),
							className: "h-11 w-full rounded-[var(--radius-md)] border border-border px-3 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "date",
							value: aDue,
							onChange: (e) => setADue(e.target.value),
							className: "h-11 w-full rounded-[var(--radius-md)] border border-border px-3 text-sm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								className: "flex-1",
								onClick: () => {
									if (!aTitle || !aDue) return;
									addAssignment({
										id: `a-${Date.now()}`,
										title: aTitle,
										course: aCourse,
										dueDate: aDue,
										completed: false
									});
									setATitle("");
									setACourse("");
									setADue("");
									setShowAssign(false);
								},
								children: "Save"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => setShowAssign(false),
								children: "Cancel"
							})]
						})
					]
				}),
				assignments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					text: "No assignments yet",
					hint: "Add your first assignment to keep track of deadlines."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: assignments.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3 rounded-[var(--radius-md)] border border-border bg-surface px-3 py-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => toggleAssignment(a.id),
								"aria-label": "Toggle complete",
								children: a.completed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
									size: 20,
									className: "text-ok"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, {
									size: 20,
									className: "text-subtle"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: a.completed ? "font-medium text-subtle line-through" : "font-medium",
									children: a.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										a.course,
										" · Due ",
										a.dueDate
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => removeAssignment(a.id),
								className: "p-2 text-subtle",
								"aria-label": "Delete assignment",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 })
							})
						]
					}, a.id))
				})
			]
		})
	] });
}
function Empty({ text, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-xl)] border border-dashed border-border bg-surface p-6 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: text
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-xs text-subtle",
			children: hint
		})]
	});
}
//#endregion
export { StudyPage as component };
