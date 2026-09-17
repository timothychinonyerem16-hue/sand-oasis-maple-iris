import { i as __toESM } from "../_runtime.mjs";
import { a as categoryLabel, i as UNN_CENTER } from "./locations-DjrREut3.mjs";
import { i as getDistance, r as formatWalkingTime } from "./utils-Ciaktqvx.mjs";
import { f as require_react } from "../_libs/@react-leaflet/core+[...].mjs";
import { x as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_leaflet_src } from "../_libs/leaflet.mjs";
import { a as useMap, i as MapContainer, n as Popup, r as Marker, t as TileLayer } from "../_libs/react-leaflet.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/campus-map-DN-kDC7v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_leaflet_src = /* @__PURE__ */ __toESM(require_leaflet_src());
function pin(color) {
	return import_leaflet_src.default.divIcon({
		className: "",
		html: `<div style="width:14px;height:14px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(16,42,67,.35)"></div>`,
		iconSize: [14, 14],
		iconAnchor: [7, 7]
	});
}
var ICONS = {
	food: pin("#1a5cf5"),
	water: pin("#0f766e"),
	lecture_theatre: pin("#102a43"),
	faculty: pin("#243b53"),
	default: pin("#337dff"),
	user: import_leaflet_src.default.divIcon({
		className: "",
		html: `<div style="width:16px;height:16px;background:#1a5cf5;border:3px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(26,92,245,.28)"></div>`,
		iconSize: [16, 16],
		iconAnchor: [8, 8]
	})
};
function FlyTo({ lat, lng }) {
	const map = useMap();
	(0, import_react.useEffect)(() => {
		map.flyTo([lat, lng], 16, { duration: .7 });
	}, [
		lat,
		lng,
		map
	]);
	return null;
}
function CampusMap({ locations, selectedId, userPos, onSelect }) {
	const selected = locations.find((l) => l.id === selectedId);
	const center = selected ? {
		lat: selected.lat,
		lng: selected.lng
	} : userPos ?? UNN_CENTER;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MapContainer, {
		center: [center.lat, center.lng],
		zoom: 15,
		className: "h-full w-full",
		zoomControl: false,
		attributionControl: false,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" }),
			selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlyTo, {
				lat: selected.lat,
				lng: selected.lng
			}),
			locations.map((loc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marker, {
				position: [loc.lat, loc.lng],
				icon: ICONS[loc.category] ?? ICONS.default,
				eventHandlers: { click: () => onSelect?.(loc.id) },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Popup, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-semibold text-fg",
						children: loc.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs capitalize text-muted",
						children: categoryLabel(loc.category)
					}),
					userPos && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: [formatWalkingTime(getDistance(userPos.lat, userPos.lng, loc.lat, loc.lng)), " walk"]
					})
				] })
			}, loc.id)),
			userPos && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Marker, {
				position: [userPos.lat, userPos.lng],
				icon: ICONS.user
			})
		]
	});
}
//#endregion
export { CampusMap };
