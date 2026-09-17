import { i as __toESM } from "../_runtime.mjs";
import { i as UNN_CENTER, o as getAllLocations, t as SAMPLE_ANNOUNCEMENTS } from "./locations-DjrREut3.mjs";
import { a as greeting, i as getDistance, o as timeAgo, r as formatWalkingTime } from "./utils-Ciaktqvx.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as BookOpen, d as MapPin, h as Clock, l as Navigation, m as Droplets, n as Utensils, s as Search, v as ChevronRight } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-Cykvw-yf.mjs";
import { t as useUserStore } from "./user-store-QV515Hs0.mjs";
import { t as OqivioMark } from "./logo-C61CDmNw.mjs";
import { t as useHydrated } from "./use-hydrated-BYTfwdl_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-0tujr_PK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const navigate = useNavigate();
	const hydrated = useHydrated();
	const profile = useUserStore((s) => s.profile);
	const timetable = useUserStore((s) => s.timetable);
	const [query, setQuery] = (0, import_react.useState)("");
	const [pos, setPos] = (0, import_react.useState)(UNN_CENTER);
	(0, import_react.useEffect)(() => {
		if (hydrated && !profile?.onboardingComplete) navigate({ to: "/onboarding" });
	}, [
		hydrated,
		profile,
		navigate
	]);
	(0, import_react.useEffect)(() => {
		if (!navigator.geolocation) return;
		navigator.geolocation.getCurrentPosition((p) => setPos({
			lat: p.coords.latitude,
			lng: p.coords.longitude
		}), () => setPos(UNN_CENTER));
	}, []);
	const nearby = (0, import_react.useMemo)(() => getAllLocations().map((loc) => ({
		...loc,
		dist: getDistance(pos.lat, pos.lng, loc.lat, loc.lng)
	})).sort((a, b) => a.dist - b.dist).slice(0, 4), [pos]);
	const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { weekday: "long" });
	const nextLecture = timetable.find((t) => t.day === today);
	if (!hydrated || !profile?.onboardingComplete) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-svh flex-col items-center justify-center gap-2 bg-bg px-6 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OqivioMark, { className: "size-12 text-accent" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg font-semibold tracking-tight",
				children: "OQIVIO"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Your campus. One place."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted",
			children: [greeting(), ","]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-0.5 text-2xl font-semibold tracking-tight text-fg",
			children: profile.name.split(" ")[0]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			className: "relative mt-5",
			onSubmit: (e) => {
				e.preventDefault();
				if (query.trim()) navigate({
					to: "/map",
					search: { q: query.trim() }
				});
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: "Where do you want to go?",
				className: "h-12 w-full rounded-[var(--radius-lg)] border border-border bg-surface pl-10 pr-4 text-sm shadow-card outline-none focus:border-accent"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-5 grid grid-cols-2 gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickCard, {
					to: "/map",
					title: "Navigate",
					hint: "Find a location",
					icon: Navigation,
					tone: "navy"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickCard, {
					to: "/food",
					title: "Food",
					hint: "Nearby meals",
					icon: Utensils,
					tone: "accent"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickCard, {
					to: "/water",
					title: "Water",
					hint: "Find water points",
					icon: Droplets,
					tone: "ok"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickCard, {
					to: "/study",
					title: "Study",
					hint: "Timetable and tasks",
					icon: BookOpen,
					tone: "navy"
				})
			]
		}),
		nextLecture && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-xs font-semibold uppercase tracking-wide text-subtle",
				children: "Next lecture"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4 shadow-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: nextLecture.course
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-1 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 14 }),
								" ",
								nextLecture.startTime,
								" – ",
								nextLecture.endTime
							]
						}),
						nextLecture.locationName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-1 text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 14 }),
								" ",
								nextLecture.locationName
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/map",
						search: { q: nextLecture.locationName ?? nextLecture.course },
						className: "rounded-[var(--radius-sm)] bg-accent px-3 py-2 text-xs font-semibold text-accent-fg",
						children: "Navigate"
					})]
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-semibold uppercase tracking-wide text-subtle",
					children: "Nearby"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/map",
					className: "text-xs font-semibold text-accent",
					children: "See map"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: nearby.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/map",
					search: { dest: loc.id },
					className: "flex items-center justify-between rounded-[var(--radius-md)] border border-border bg-surface px-3 py-3 shadow-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: loc.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs capitalize text-muted",
						children: [
							formatWalkingTime(loc.dist),
							" · ",
							loc.category.replaceAll("_", " ")
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						size: 16,
						className: "text-subtle"
					})]
				}, loc.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-2 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xs font-semibold uppercase tracking-wide text-subtle",
					children: "Campus updates"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/campus",
					className: "text-xs font-semibold text-accent",
					children: "View all"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: SAMPLE_ANNOUNCEMENTS.slice(0, 2).map((ann) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-md)] border border-border bg-surface p-3 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase text-accent",
								children: ann.category
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-subtle",
								children: timeAgo(ann.postedAt)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: ann.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 line-clamp-2 text-xs text-muted",
							children: ann.body
						})
					]
				}, ann.id))
			})]
		})
	] });
}
function QuickCard({ to, title, hint, icon: Icon, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: `flex flex-col items-start gap-2 rounded-[var(--radius-lg)] p-4 text-accent-fg shadow-card ${tone === "navy" ? "bg-navy" : tone === "ok" ? "bg-ok" : "bg-accent"}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "rounded-[var(--radius-sm)] bg-accent-fg/15 p-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 20 })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-semibold",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-xs text-accent-fg/80",
				children: hint
			})
		]
	});
}
//#endregion
export { Home as component };
