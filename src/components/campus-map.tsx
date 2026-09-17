import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import type { CampusLocation } from "@/lib/locations";
import { categoryLabel, UNN_CENTER } from "@/lib/locations";
import { formatWalkingTime, getDistance } from "@/lib/utils";
import "leaflet/dist/leaflet.css";

function pin(color: string) {
  return L.divIcon({
    className: "",
    html: `<div style="width:14px;height:14px;background:${color};border:2px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(16,42,67,.35)"></div>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

const ICONS: Record<string, L.DivIcon> = {
  food: pin("#1a5cf5"),
  water: pin("#0f766e"),
  lecture_theatre: pin("#102a43"),
  faculty: pin("#243b53"),
  default: pin("#337dff"),
  user: L.divIcon({
    className: "",
    html: `<div style="width:16px;height:16px;background:#1a5cf5;border:3px solid white;border-radius:50%;box-shadow:0 0 0 4px rgba(26,92,245,.28)"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  }),
};

function FlyTo({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo([lat, lng], 16, { duration: 0.7 });
  }, [lat, lng, map]);
  return null;
}

export function CampusMap({
  locations,
  selectedId,
  userPos,
  onSelect,
}: {
  locations: CampusLocation[];
  selectedId?: string | null;
  userPos?: { lat: number; lng: number } | null;
  onSelect?: (id: string) => void;
}) {
  const selected = locations.find((l) => l.id === selectedId);
  const center = selected
    ? { lat: selected.lat, lng: selected.lng }
    : userPos ?? UNN_CENTER;

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={15}
      className="h-full w-full"
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {selected && <FlyTo lat={selected.lat} lng={selected.lng} />}
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={ICONS[loc.category] ?? ICONS.default}
          eventHandlers={{ click: () => onSelect?.(loc.id) }}
        >
          <Popup>
            <p className="font-semibold text-fg">{loc.name}</p>
            <p className="text-xs capitalize text-muted">{categoryLabel(loc.category)}</p>
            {userPos && (
              <p className="mt-1 text-xs text-muted">
                {formatWalkingTime(getDistance(userPos.lat, userPos.lng, loc.lat, loc.lng))} walk
              </p>
            )}
          </Popup>
        </Marker>
      ))}
      {userPos && (
        <Marker position={[userPos.lat, userPos.lng]} icon={ICONS.user} />
      )}
    </MapContainer>
  );
}
