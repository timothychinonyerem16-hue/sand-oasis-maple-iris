import { t as cn } from "./utils-Ciaktqvx.mjs";
import { d as useRouterState, v as Link, x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as BookOpen, b as Building2, p as House, r as User, u as Map } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-Cykvw-yf.js
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/map",
		label: "Map",
		icon: Map
	},
	{
		to: "/campus",
		label: "Campus",
		icon: Building2
	},
	{
		to: "/study",
		label: "Study",
		icon: BookOpen
	},
	{
		to: "/profile",
		label: "Profile",
		icon: User
	}
];
function AppShell({ children, flush }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const hideNav = pathname.startsWith("/onboarding");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-svh max-w-lg flex-col bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
			className: cn("flex-1", flush ? "pb-16" : "px-4 pb-24 pt-6"),
			children
		}), !hideNav && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "safe-bottom fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-surface/95 backdrop-blur-md",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto flex max-w-lg items-stretch justify-around px-1 py-1",
				children: tabs.map(({ to, label, icon: Icon }) => {
					const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to,
						className: cn("flex min-h-11 flex-1 flex-col items-center justify-center gap-0.5 rounded-[var(--radius-sm)] text-[11px] font-medium", active ? "text-accent" : "text-muted"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							size: 20,
							strokeWidth: active ? 2.4 : 2
						}), label]
					}, to);
				})
			})
		})]
	});
}
//#endregion
export { AppShell as t };
