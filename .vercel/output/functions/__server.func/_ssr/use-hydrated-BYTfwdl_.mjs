import { i as __toESM } from "../_runtime.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { t as useUserStore } from "./user-store-QV515Hs0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-hydrated-BYTfwdl_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function useHydrated() {
	const hydrated = useUserStore((s) => s.hydrated);
	const setHydrated = useUserStore((s) => s.setHydrated);
	(0, import_react.useEffect)(() => {
		const finish = () => setHydrated(true);
		if (useUserStore.persist.hasHydrated()) finish();
		const unsub = useUserStore.persist.onFinishHydration(finish);
		const t = window.setTimeout(finish, 400);
		return () => {
			unsub();
			window.clearTimeout(t);
		};
	}, [setHydrated]);
	return hydrated;
}
//#endregion
export { useHydrated as t };
