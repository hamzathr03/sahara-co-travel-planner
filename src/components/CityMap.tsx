import "leaflet/dist/leaflet.css";
import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip } from "react-leaflet";
import { cities } from "../data/morocco";
import { cityCoords } from "../data/coordinates";
import { useTrip } from "../context/TripContext";
import { formatLeg, getLegs } from "../utils/route";

interface CityMapProps {
  selectedId: string | null;
  onSelect: (cityId: string) => void;
}

export default function CityMap({ selectedId, onSelect }: CityMapProps) {
  const { stops } = useTrip();
  const legs = getLegs(stops);

  return (
    <div className="isolate h-[60vh] min-h-[380px] overflow-hidden rounded-2xl border border-stone-100 shadow-sm shadow-stone-900/5">
      <MapContainer
        className="h-full w-full"
        bounds={[
          [30.0, -10.5],
          [35.6, -3.5],
        ]}
        boundsOptions={{ padding: [20, 20] }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {legs.map((leg) => (
          <Polyline
            key={`${leg.fromId}-${leg.toId}`}
            positions={[cityCoords[leg.fromId], cityCoords[leg.toId]]}
            pathOptions={{ color: "#d97706", weight: 3, dashArray: "8 8" }}
          >
            <Tooltip sticky>{formatLeg(leg)}</Tooltip>
          </Polyline>
        ))}

        {cities.map((c) => {
          const position = cityCoords[c.id];
          if (!position) return null;
          const order = stops.findIndex((s) => s.cityId === c.id);
          const inTrip = order >= 0;
          const selected = c.id === selectedId;

          return (
            <CircleMarker
              key={c.id}
              center={position}
              radius={selected ? 11 : 9}
              pathOptions={{
                color: "#ffffff",
                weight: 2,
                fillColor: selected ? "#dc2626" : inTrip ? "#d97706" : "#78716c",
                fillOpacity: 1,
              }}
              eventHandlers={{ click: () => onSelect(c.id) }}
            >
              <Tooltip permanent direction="top" offset={[0, -8]}>
                {inTrip ? `${order + 1}. ${c.name}` : c.name}
              </Tooltip>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}
