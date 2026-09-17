import { i as __toESM } from "../_runtime.mjs";
import { t as SAMPLE_ANNOUNCEMENTS } from "./locations-DjrREut3.mjs";
import { o as timeAgo, t as cn } from "./utils-Ciaktqvx.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AppShell } from "./app-shell-Cykvw-yf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/campus-GNJZAgS1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"All",
	"University",
	"Faculty",
	"Department",
	"Events"
];
function CampusPage() {
	const [tab, setTab] = (0, import_react.useState)("All");
	const items = SAMPLE_ANNOUNCEMENTS.filter((a) => tab === "All" || a.category.toLowerCase() === tab.toLowerCase());
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold tracking-tight",
			children: "Campus"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Announcements, events and opportunities"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex gap-2 overflow-x-auto pb-1",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: () => setTab(t),
				className: cn("h-9 shrink-0 rounded-full px-4 text-xs font-semibold", t === tab ? "bg-navy text-accent-fg" : "border border-border bg-surface text-muted"),
				children: t
			}, t))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 space-y-3",
			children: items.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-[var(--radius-xl)] border border-dashed border-border bg-surface p-8 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nothing in this category yet."
				})
			}) : items.map((ann) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 shadow-card",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold uppercase text-accent",
								children: ann.category
							}),
							ann.isVerified && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-ok-soft px-2 py-0.5 text-[10px] font-semibold text-ok",
								children: "Verified"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto text-xs text-subtle",
								children: timeAgo(ann.postedAt)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-semibold",
						children: ann.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm leading-relaxed text-muted",
						children: ann.body
					})
				]
			}, ann.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 rounded-[var(--radius-xl)] border border-dashed border-border bg-surface p-6 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm font-medium",
				children: "Events and opportunities"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted",
				children: "Scholarships, seminars and club activities land here in the next version."
			})]
		})
	] });
}
//#endregion
export { CampusPage as component };
