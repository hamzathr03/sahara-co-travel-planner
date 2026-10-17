import type { City, HotelTier } from "./morocco";

// Estimated daily spending per person, in MAD (not live prices).
export const foodPerDay: Record<HotelTier, number> = { economique: 120, confort: 250, luxe: 500 };
export const localTransportPerDay: Record<HotelTier, number> = { economique: 40, confort: 90, luxe: 200 };

// Estimated daily budget per person, for two travellers sharing one double room.
export function dailyBudgetPerPerson(city: City, tier: HotelTier): number {
  const hotel = city.hotels.find((h) => h.tier === tier) ?? city.hotels[0];
  return Math.round(hotel.pricePerNight / 2 + foodPerDay[tier] + localTransportPerDay[tier]);
}
