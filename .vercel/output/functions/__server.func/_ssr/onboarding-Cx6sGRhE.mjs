import { i as __toESM } from "../_runtime.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { x as require_jsx_runtime, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Bell, S as BookOpen, d as MapPin, v as ChevronRight, y as ChevronLeft } from "../_libs/lucide-react.mjs";
import { t as useUserStore } from "./user-store-QV515Hs0.mjs";
import { t as Button } from "./button-B8sfoa3u.mjs";
import { t as OqivioMark } from "./logo-C61CDmNw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-Cx6sGRhE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var slides = [
	{
		title: "Welcome to OQIVIO",
		subtitle: "Your campus, simplified.",
		body: "Navigation, food, water, academics and announcements — in one place.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OqivioMark, { className: "size-14 text-accent" })
	},
	{
		title: "Find your way",
		subtitle: "Navigate campus with ease",
		body: "Locate lecture theatres, hostels, faculties, food spots and water points.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-12 text-accent" })
	},
	{
		title: "Stay organized",
		subtitle: "Academics made simple",
		body: "Manage your timetable, assignments and courses without juggling apps.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-12 text-ok" })
	},
	{
		title: "Stay connected",
		subtitle: "Never miss what matters",
		body: "Get campus announcements, events and opportunities from your faculty.",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-12 text-warn" })
	}
];
function Onboarding() {
	const navigate = useNavigate();
	const setProfile = useUserStore((s) => s.setProfile);
	const [step, setStep] = (0, import_react.useState)(0);
	const [name, setName] = (0, import_react.useState)("");
	const [faculty, setFaculty] = (0, import_react.useState)("Medical Sciences");
	const [department, setDepartment] = (0, import_react.useState)("Medicine and Surgery");
	const [level, setLevel] = (0, import_react.useState)("200");
	const isProfile = step === slides.length;
	const finish = () => {
		setProfile({
			name: name.trim() || "Student",
			university: "University of Nigeria, Nsukka",
			faculty,
			department,
			level,
			onboardingComplete: true
		});
		navigate({ to: "/" });
	};
	if (isProfile) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-svh max-w-lg flex-col bg-bg px-6 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-2xl font-semibold tracking-tight",
				children: "Almost there"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "A few details so OQIVIO can personalize campus life for you."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Your name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "e.g. Timothy Okeke",
							className: "h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 text-sm outline-none focus:border-accent"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "University",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: "University of Nigeria, Nsukka",
							disabled: true,
							className: "h-11 w-full rounded-[var(--radius-md)] border border-border bg-bg px-3 text-sm text-muted"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Faculty",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: faculty,
							onChange: (e) => setFaculty(e.target.value),
							className: "h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 text-sm outline-none focus:border-accent",
							children: [
								"Medical Sciences",
								"Arts",
								"Biological Sciences",
								"Engineering",
								"Education",
								"Physical Sciences",
								"Social Sciences",
								"Pharmaceutical Sciences",
								"Agriculture",
								"Veterinary Medicine"
							].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: f }, f))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Department",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: department,
							onChange: (e) => setDepartment(e.target.value),
							className: "h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 text-sm outline-none focus:border-accent"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Level",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							value: level,
							onChange: (e) => setLevel(e.target.value),
							className: "h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface px-3 text-sm outline-none focus:border-accent",
							children: [
								"100",
								"200",
								"300",
								"400",
								"500",
								"600"
							].map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: l }, l))
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-10 w-full",
				size: "lg",
				onClick: finish,
				children: "Get started"
			})
		]
	});
	const slide = slides[step];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-svh max-w-lg flex-col bg-bg",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col items-center justify-center px-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-8 flex size-24 items-center justify-center rounded-[var(--radius-xl)] bg-surface shadow-card",
						children: slide.icon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold tracking-tight",
						children: slide.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-base font-medium text-accent",
						children: slide.subtitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 max-w-xs text-sm leading-relaxed text-muted",
						children: slide.body
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex justify-center gap-2 pb-4",
				children: slides.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: i === step ? "h-2 w-6 rounded-full bg-accent" : "size-2 rounded-full bg-border" }, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between px-6 pb-10",
				children: [step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					onClick: () => setStep((s) => s - 1),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { size: 16 }), " Back"]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => setStep((s) => s + 1),
					children: [step === slides.length - 1 ? "Continue" : "Next", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 16 })]
				})]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1 block text-sm font-medium",
			children: label
		}), children]
	});
}
//#endregion
export { Onboarding as component };
