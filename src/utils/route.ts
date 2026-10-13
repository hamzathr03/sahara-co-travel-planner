import { cityCoords } from "../data/coordinates";
import type { TripStop } from "../context/TripContext";

export interface Leg {
  fromId: string;
  toId: string;
  km: number;
  minutes: number;
}

// Rough estimates: straight-line distance + a margin for winding roads, at an average speed.
const ROAD_FACTOR = 1.25;
const AVG_SPEED_KMH = 75;

function haversineKm(a: [number, number], b: [number, number]): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLon = toRad(b[1] - a[1]);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLon / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

export function estimateLeg(fromId: string, toId: string): Leg | null {
  const a = cityCoords[fromId];
  const b = cityCoords[toId];
  if (!a || !b) return null;
  const km = Math.round((haversineKm(a, b) * ROAD_FACTOR) / 5) * 5;
  const minutes = Math.round(((km / AVG_SPEED_KMH) * 60) / 5) * 5;
  return { fromId, toId, km, minutes };
}

// One leg per pair of consecutive cities in the trip.
export function getLegs(stops: TripStop[]): Leg[] {
  const legs: Leg[] = [];
  for (let i = 0; i < stops.length - 1; i++) {
    const leg = estimateLeg(stops[i].cityId, stops[i + 1].cityId);
    if (leg) legs.push(leg);
  }
  return legs;
}

export function sumLegs(legs: Leg[]): { km: number; minutes: number } {
  return legs.reduce((t, l) => ({ km: t.km + l.km, minutes: t.minutes + l.minutes }), { km: 0, minutes: 0 });
}

export function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}

export function formatLeg(leg: Leg): string {
  return `≈ ${leg.km} km · ${formatDuration(leg.minutes)}`;
}
