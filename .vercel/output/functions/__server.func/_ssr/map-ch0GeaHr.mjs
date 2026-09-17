import { i as __toESM } from "../_runtime.mjs";
import { a as categoryLabel, i as UNN_CENTER, o as getAllLocations, s as searchLocations } from "./locations-DjrREut3.mjs";
import { i as getDistance, n as formatDistance, r as formatWalkingTime } from "./utils-Ciaktqvx.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as Navigation, s as Search, t as X, x as Bookmark } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-Cykvw-yf.mjs";
import { n as Route$4 } from "./router-DOFSmQDi.mjs";
import { t as useUserStore } from "./user-store-QV515Hs0.mjs";
import { t as Button } from "./button-B8sfoa3u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/map-ch0GeaHr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CampusMap = (0, import_react.lazy)(() => import("./campus-map-DN-kDC7v.mjs").then((m) => ({ default: m.CampusMap })));
function MapPage() {
	const { q, dest } = Route$4.useSearch();
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)(q ?? "");
	const [selectedId, setSelectedId] = (0, import_react.useState)(dest ?? null);
	const [userPos, setUserPos] = (0, import_react.useState)(UNN_CENTER);
	const [showResults, setShowResults] = (0, import_react.useState)(!!q);
	const [navigating, setNavigating] = (0, import_react.useState)(false);
	const [mapReady, setMapReady] = (0, import_react.useState)(false);
	const toggleSaved = useUserStore((s) => s.toggleSavedLocation);
	const saved = useUserStore((s) => s.savedLocationIds);
	const locations = query ? searchLocations(query) : getAllLocations();
	const selected = locations.find((l) => l.id === selectedId) ?? getAllLocations().find((l) => l.id === selectedId);
	(0, import_react.useEffect)(() => {
		setMapReady(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (dest) setSelectedId(dest);
	}, [dest]);
	(0, import_react.useEffect)(() => {
		if (!navigator.geolocation) return;
		navigator.geolocation.getCurrentPosition((p) => setUserPos({
			lat: p.coords.latitude,
			lng: p.coords.longitude
		}), () => setUserPos(UNN_CENTER));
	}, []);
	const dist = selected ? getDistance(userPos.lat, userPos.lng, selected.lat, selected.lng) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		flush: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative h-[calc(100svh-4rem)]",
			children: [
				mapReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
					fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-full items-center justify-center bg-bg text-sm text-muted",
						children: "Loading map…"
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CampusMap, {
						locations,
						selectedId,
						userPos,
						onSelect: (id) => {
							setSelectedId(id);
							setNavigating(false);
						}
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex h-full items-center justify-center bg-bg text-sm text-muted",
					children: "Loading map…"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute left-3 right-3 top-3 z-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (e) => {
									setQuery(e.target.value);
									setShowResults(true);
								},
								onFocus: () => setShowResults(true),
								placeholder: "Search campus…",
								className: "h-12 w-full rounded-[var(--radius-lg)] border border-border bg-surface/95 pl-10 pr-10 text-sm shadow-card outline-none backdrop-blur"
							}),
							query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "absolute right-3 top-1/2 -translate-y-1/2 text-subtle",
								onClick: () => {
									setQuery("");
									setShowResults(false);
									navigate({
										to: "/map",
										search: {}
									});
								},
								"aria-label": "Clear search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
							})
						]
					}), showResults && query && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 max-h-56 overflow-y-auto rounded-[var(--radius-lg)] border border-border bg-surface shadow-card",
						children: locations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "p-4 text-center text-sm text-muted",
							children: [
								"No results for “",
								query,
								"”"
							]
						}) : locations.slice(0, 8).map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: () => {
								setSelectedId(loc.id);
								setQuery(loc.name);
								setShowResults(false);
							},
							className: "flex w-full items-start border-b border-border px-4 py-3 text-left last:border-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: loc.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs capitalize text-muted",
								children: categoryLabel(loc.category)
							})] })
						}, loc.id))
					})]
				}),
				selected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute bottom-4 left-3 right-3 z-10 rounded-[var(--radius-xl)] border border-border bg-surface p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: selected.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs capitalize text-muted",
								children: [categoryLabel(selected.category), selected.isVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-2 rounded-full bg-ok-soft px-1.5 py-0.5 text-[10px] font-semibold text-ok",
									children: "Verified"
								})]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => {
									setSelectedId(null);
									setNavigating(false);
								},
								className: "rounded-full p-1 text-subtle",
								"aria-label": "Close",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 16 })
							})]
						}),
						dist !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								formatDistance(dist),
								" · ",
								formatWalkingTime(dist),
								" walk"
							]
						}),
						selected.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: selected.description
						}),
						navigating && dist !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 rounded-[var(--radius-sm)] bg-accent-soft px-3 py-2 text-xs text-navy",
							children: [
								"Head toward ",
								selected.name,
								". About ",
								formatWalkingTime(dist),
								" on foot from your current position."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								className: "flex-1",
								onClick: () => setNavigating(true),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { size: 16 }),
									" ",
									navigating ? "Navigating" : "Start navigation"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: saved.includes(selected.id) ? "primary" : "outline",
								size: "icon",
								onClick: () => toggleSaved(selected.id),
								"aria-label": "Save place",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {
									size: 18,
									fill: saved.includes(selected.id) ? "currentColor" : "none"
								})
							})]
						})
					]
				})
			]
		})
	});
}
//#endregion
export { MapPage as component };
