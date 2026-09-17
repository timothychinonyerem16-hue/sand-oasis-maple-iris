import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as cn } from "./utils-Ciaktqvx.mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/button-B8sfoa3u.js
var import_jsx_runtime = require_jsx_runtime();
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-semibold transition-transform duration-150 ease-out active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none", {
	variants: {
		variant: {
			primary: "bg-accent text-accent-fg shadow-card",
			navy: "bg-navy text-accent-fg",
			outline: "border border-border bg-surface text-fg",
			ghost: "text-muted hover:bg-accent-soft hover:text-fg",
			danger: "bg-danger-soft text-danger",
			ok: "bg-ok-soft text-ok"
		},
		size: {
			sm: "h-9 rounded-[var(--radius-sm)] px-3 text-xs",
			md: "h-11 rounded-[var(--radius-md)] px-4 text-sm",
			lg: "h-12 rounded-[var(--radius-lg)] px-5 text-sm",
			icon: "size-11 rounded-[var(--radius-md)]"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
//#endregion
export { Button as t };
