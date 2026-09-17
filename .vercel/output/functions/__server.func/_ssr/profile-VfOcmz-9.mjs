import { v as Link, x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as BookOpen, d as MapPin, f as LogOut, v as ChevronRight } from "../_libs/lucide-react.mjs";
import { t as AppShell } from "./app-shell-Cykvw-yf.mjs";
import { t as useUserStore } from "./user-store-QV515Hs0.mjs";
import { t as Button } from "./button-B8sfoa3u.mjs";
import { t as useHydrated } from "./use-hydrated-BYTfwdl_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-VfOcmz-9.js
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const navigate = useNavigate();
	const hydrated = useHydrated();
	const profile = useUserStore((s) => s.profile);
	const logout = useUserStore((s) => s.logout);
	const savedCount = useUserStore((s) => s.savedLocationIds.length);
	const timetableCount = useUserStore((s) => s.timetable.length);
	if (!hydrated) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-svh items-center justify-center bg-bg",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-8 animate-spin rounded-full border-2 border-accent border-t-transparent" })
	});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-[50vh] items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: () => void navigate({ to: "/onboarding" }),
			children: "Complete setup"
		})
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex size-16 items-center justify-center rounded-[var(--radius-lg)] bg-navy text-xl font-semibold text-accent-fg",
				children: profile.name.charAt(0).toUpperCase()
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight",
					children: profile.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted",
					children: [
						profile.level,
						" Level · ",
						profile.department
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-subtle",
					children: profile.university
				})
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4 text-center shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl font-semibold tabular-nums",
					children: savedCount
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Saved places"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4 text-center shadow-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-2xl font-semibold tabular-nums",
					children: timetableCount
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Lectures"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 overflow-hidden rounded-[var(--radius-xl)] border border-border bg-surface shadow-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/map",
				className: "flex items-center gap-3 border-b border-border px-4 py-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
						size: 18,
						className: "text-muted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 text-sm font-medium",
						children: "Saved places"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						size: 16,
						className: "text-subtle"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/study",
				className: "flex items-center gap-3 px-4 py-3.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
						size: 18,
						className: "text-muted"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex-1 text-sm font-medium",
						children: "My timetable"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {
						size: 16,
						className: "text-subtle"
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			variant: "danger",
			className: "mt-6 w-full",
			onClick: () => {
				logout();
				navigate({ to: "/onboarding" });
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 16 }), " Log out"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-center text-xs text-subtle",
			children: "OQIVIO · Your Campus. One Place."
		})
	] });
}
//#endregion
export { ProfilePage as component };
