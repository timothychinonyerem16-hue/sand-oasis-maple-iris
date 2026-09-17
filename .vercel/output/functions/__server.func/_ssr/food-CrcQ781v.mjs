import { i as __toESM } from "../_runtime.mjs";
import { i as UNN_CENTER, n as SAMPLE_FOOD } from "./locations-DjrREut3.mjs";
import { i as getDistance, r as formatWalkingTime } from "./utils-Ciaktqvx.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as MapPin, o as Star, s as Search } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-Cykvw-yf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/food-CrcQ781v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FoodPage() {
	const [query, setQuery] = (0, import_react.useState)("");
	const filtered = SAMPLE_FOOD.filter((f) => !query || f.name.toLowerCase().includes(query.toLowerCase()) || f.menu?.some((m) => m.name.toLowerCase().includes(query.toLowerCase())) || f.tags?.some((t) => t.includes(query.toLowerCase())));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold tracking-tight",
			children: "Find food"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Nearby vendors on the UNN campus"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: "Rice, beans, under ₦1000…",
				className: "h-12 w-full rounded-[var(--radius-lg)] border border-border bg-surface pl-10 pr-4 text-sm shadow-card outline-none focus:border-accent"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 space-y-3",
			children: [filtered.map((vendor) => {
				const dist = getDistance(UNN_CENTER.lat, UNN_CENTER.lng, vendor.lat, vendor.lng);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: vendor.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs text-muted",
								children: [
									vendor.priceRange,
									" · ",
									formatWalkingTime(dist),
									" away"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-2 py-0.5 text-[10px] font-semibold ${vendor.isOpen ? "bg-ok-soft text-ok" : "bg-danger-soft text-danger"}`,
								children: vendor.isOpen ? "Open" : "Closed"
							})]
						}),
						vendor.menu && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-1",
							children: vendor.menu.slice(0, 3).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex justify-between text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: item.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-medium",
									children: ["₦", item.price.toLocaleString()]
								})]
							}, item.name))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/map",
								search: { dest: vendor.id },
								className: "flex h-11 flex-1 items-center justify-center gap-1 rounded-[var(--radius-md)] bg-accent text-xs font-semibold text-accent-fg",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 14 }), " Directions"]
							}), vendor.rating != null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-11 items-center gap-1 rounded-[var(--radius-md)] border border-border px-3 text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, {
									size: 12,
									className: "fill-warn text-warn"
								}), vendor.rating.toFixed(1)]
							})]
						})
					]
				}, vendor.id);
			}), filtered.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-xl)] border border-dashed border-border bg-surface p-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No food spots match that search."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-subtle",
					children: "Try a meal name or vendor."
				})]
			})]
		})
	] });
}
//#endregion
export { FoodPage as component };
