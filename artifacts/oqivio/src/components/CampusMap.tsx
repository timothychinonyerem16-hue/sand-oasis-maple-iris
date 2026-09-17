"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { CampusLocation, UNN_CENTER } from "@/data/locations";
import { formatDistance, formatWalkingTime, getDistance } from "@/lib/utils";
import Link from "next/link";

// Fix default marker icons in Next.js
const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const foodIcon = L.divIcon({
  className: "",
  html: `<div style="background:#337dff;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.25);font-size:14px">🍛</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

const waterIcon = L.divIcon({
  className: "",
  html: `<div style="background:#0ea5e9;width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,.25);font-size:14px">💧</div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

function getIcon(cat: string) {
  if (cat === "food") return foodIcon;
  if (cat === "water") return waterIcon;
  return defaultIcon;
}

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 16, { duration: 0.8 });
  }, [lat, lng, map]);
  return null;
}

interface Props {
  locations: CampusLocation[];
  selectedId?: string | null;
  userPos?: { lat: number; lng: number } | null;
  onSelect?: (id: string) => void;
}

export default function CampusMap({
  locations,
  selectedId,
  userPos,
  onSelect,
}: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="flex h-full items-center justify-center bg-slate-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-electric-500 border-t-transparent" />
      </div>
    );
  }

  const selected = locations.find((l) => l.id === selectedId);
  const center = selected
    ? { lat: selected.lat, lng: selected.lng }
    : userPos || UNN_CENTER;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={15}
      className="h-full w-full"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selected && <FlyTo lat={selected.lat} lng={selected.lng} />}
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={getIcon(loc.category)}
          eventHandlers={{
            click: () => onSelect?.(loc.id),
          }}
        >
          <Popup>
            <div className="min-w-[160px]">
              <p className="font-semibold text-navy-900">{loc.name}</p>
              <p className="text-xs capitalize text-slate-500">
                {loc.category.replace("_", " ")}
              </p>
              {userPos && (
                <p className="mt-1 text-xs text-slate-600">
                  {formatWalkingTime(
                    getDistance(userPos.lat, userPos.lng, loc.lat, loc.lng)
                  )}{" "}
                  walk
                </p>
              )}
              <button
                onClick={() => onSelect?.(loc.id)}
                className="mt-2 w-full rounded-lg bg-electric-600 py-1.5 text-xs font-semibold text-white"
              >
                Details
              </button>
            </div>
          </Popup>
        </Marker>
      ))}
      {userPos && (
        <Marker
          position={[userPos.lat, userPos.lng]}
          icon={L.divIcon({
            className: "",
            html: `<div style="width:16px;height:16px;background:#337dff;border:3px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(51,125,255,.3)"></div>`,
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          })}
        />
      )}
    </MapContainer>
  );
}
