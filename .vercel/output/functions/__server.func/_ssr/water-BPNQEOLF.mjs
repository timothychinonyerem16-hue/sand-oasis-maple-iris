import { i as UNN_CENTER, r as SAMPLE_WATER } from "./locations-DjrREut3.mjs";
import { i as getDistance, o as timeAgo, r as formatWalkingTime } from "./utils-Ciaktqvx.mjs";
import { v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as MapPin } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-Cykvw-yf.mjs";
import { t as useUserStore } from "./user-store-QV515Hs0.mjs";
import { t as Button } from "./button-B8sfoa3u.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/water-BPNQEOLF.js
var import_jsx_runtime = require_jsx_runtime();
function WaterPage() {
	const overrides = useUserStore((s) => s.waterOverrides);
	const reportWater = useUserStore((s) => s.reportWater);
	const points = SAMPLE_WATER.map((p) => {
		const o = overrides[p.id];
		if (!o) return p;
		return {
			...p,
			status: o.status,
			lastReportedAt: o.at,
			reportedBy: "you"
		};
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl font-semibold tracking-tight",
			children: "Find water"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted",
			children: "Student-reported availability — tap to update"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 space-y-3",
			children: points.map((point) => {
				const dist = getDistance(UNN_CENTER.lat, UNN_CENTER.lng, point.lat, point.lng);
				const badge = point.status === "available" ? "bg-ok-soft text-ok" : point.status === "unavailable" ? "bg-danger-soft text-danger" : "bg-warn-soft text-warn";
				const label = point.status === "available" ? "Available" : point.status === "unavailable" ? "Unavailable" : "Unknown";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-[var(--radius-xl)] border border-border bg-surface p-4 shadow-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-semibold",
								children: point.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-0.5 text-xs text-muted",
								children: [formatWalkingTime(dist), " away"]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `rounded-full px-2.5 py-1 text-xs font-semibold ${badge}`,
								children: label
							})]
						}),
						point.lastReportedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-xs text-subtle",
							children: [
								"Reported ",
								timeAgo(point.lastReportedAt),
								point.reportedBy === "you" ? " by you" : " by students"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/map",
									search: { dest: point.id },
									className: "flex h-11 flex-1 items-center justify-center gap-1 rounded-[var(--radius-md)] bg-ok text-xs font-semibold text-accent-fg",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 14 }), " Directions"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ok",
									size: "sm",
									className: "h-11",
									onClick: () => reportWater(point.id, "available"),
									children: "Available"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "danger",
									size: "sm",
									className: "h-11",
									onClick: () => reportWater(point.id, "unavailable"),
									children: "Unavailable"
								})
							]
						})
					]
				}, point.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-6 text-center text-xs text-subtle",
			children: "Status is community-reported and may not be guaranteed."
		})
	] });
}
//#endregion
export { WaterPage as component };
