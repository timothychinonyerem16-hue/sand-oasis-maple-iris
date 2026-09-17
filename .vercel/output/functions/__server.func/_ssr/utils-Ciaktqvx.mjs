import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-Ciaktqvx.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatWalkingTime(meters) {
	return `${Math.max(1, Math.round(meters / 83))} min`;
}
function formatDistance(meters) {
	if (meters < 1e3) return `${Math.round(meters)} m`;
	return `${(meters / 1e3).toFixed(1)} km`;
}
function getDistance(lat1, lng1, lat2, lng2) {
	const R = 6371e3;
	const φ1 = lat1 * Math.PI / 180;
	const φ2 = lat2 * Math.PI / 180;
	const Δφ = (lat2 - lat1) * Math.PI / 180;
	const Δλ = (lng2 - lng1) * Math.PI / 180;
	const a = Math.sin(Δφ / 2) ** 2 + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
	return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
function timeAgo(iso) {
	const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 6e4);
	if (mins < 1) return "just now";
	if (mins < 60) return `${mins} min ago`;
	const hours = Math.floor(mins / 60);
	if (hours < 24) return `${hours}h ago`;
	return `${Math.floor(hours / 24)}d ago`;
}
function greeting() {
	const hour = (/* @__PURE__ */ new Date()).getHours();
	if (hour < 12) return "Good morning";
	if (hour < 17) return "Good afternoon";
	return "Good evening";
}
//#endregion
export { greeting as a, getDistance as i, formatDistance as n, timeAgo as o, formatWalkingTime as r, cn as t };
