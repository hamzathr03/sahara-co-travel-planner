import { getCityById, type HotelTier } from "../data/morocco";
import { DEFAULT_SETTINGS, type TransportMode, type TripSettings, type TripStop } from "../context/TripContext";
import { supabase } from "./supabase";

export interface TripData {
  stops: TripStop[];
  settings: TripSettings;
}

export interface SavedTrip {
  id: string;
  name: string;
  updatedAt: string;
  data: TripData;
}

interface TripRow {
  id: string;
  name: string;
  updated_at: string;
  data: unknown;
}

const COLUMNS = "id, name, updated_at, data";
const TIERS: HotelTier[] = ["economique", "confort", "luxe"];
const MODES: TransportMode[] = ["bus", "train", "voiture", "avion"];

// Saved data is read defensively: unknown cities or activities are dropped, bad values get defaults.
export function parseTripData(raw: unknown): TripData {
  const obj = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const stops: TripStop[] = [];

  for (const item of Array.isArray(obj.stops) ? obj.stops : []) {
    if (!item || typeof item !== "object") continue;
    const s = item as Record<string, unknown>;
    const city = typeof s.cityId === "string" ? getCityById(s.cityId) : undefined;
    if (!city || stops.some((x) => x.cityId === city.id)) continue;

    const days = typeof s.days === "number" && s.days >= 1 ? Math.floor(s.days) : 2;
    const dayOfRaw = (s.dayOf && typeof s.dayOf === "object" ? s.dayOf : {}) as Record<string, unknown>;
    const activities: string[] = [];
    const dayOf: Record<string, number> = {};

    if (Array.isArray(s.activities)) {
      for (const a of s.activities) {
        if (typeof a !== "string" || activities.includes(a) || !city.activities.some((x) => x.name === a)) continue;
        activities.push(a);
        const d = dayOfRaw[a];
        dayOf[a] = typeof d === "number" ? Math.min(Math.max(Math.floor(d), 0), days - 1) : 0;
      }
    }
    stops.push({ cityId: city.id, days, activities, dayOf });
  }

  const raw2 = (obj.settings && typeof obj.settings === "object" ? obj.settings : {}) as Record<string, unknown>;
  const settings: TripSettings = {
    travelers:
      typeof raw2.travelers === "number"
        ? Math.min(12, Math.max(1, Math.floor(raw2.travelers)))
        : DEFAULT_SETTINGS.travelers,
    tier: TIERS.includes(raw2.tier as HotelTier) ? (raw2.tier as HotelTier) : DEFAULT_SETTINGS.tier,
    transport: MODES.includes(raw2.transport as TransportMode)
      ? (raw2.transport as TransportMode)
      : DEFAULT_SETTINGS.transport,
  };

  return { stops, settings };
}

function toSavedTrip(row: TripRow): SavedTrip {
  return { id: row.id, name: row.name, updatedAt: row.updated_at, data: parseTripData(row.data) };
}

// Makes sure there is a (possibly anonymous) session before writing.
async function getClient() {
  const client = supabase;
  if (!client) throw new Error("L'enregistrement n'est pas configuré (Supabase).");
  const { data } = await client.auth.getSession();
  if (!data.session) {
    const { error } = await client.auth.signInAnonymously();
    if (error) throw new Error(error.message);
  }
  return client;
}

export async function listTrips(): Promise<SavedTrip[]> {
  const client = supabase;
  if (!client) return [];
  const { data: session } = await client.auth.getSession();
  if (!session.session) return []; // nothing saved yet: no need to create an anonymous user
  const { data, error } = await client.from("trips").select(COLUMNS).order("updated_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data as TripRow[]).map(toSavedTrip);
}

export async function saveTrip(input: { id: string | null; name: string; data: TripData }): Promise<SavedTrip> {
  const client = await getClient();

  if (input.id) {
    const { data, error } = await client
      .from("trips")
      .update({ name: input.name, data: input.data })
      .eq("id", input.id)
      .select(COLUMNS)
      .single();
    if (error) throw new Error(error.message);
    return toSavedTrip(data as TripRow);
  }

  const { data, error } = await client
    .from("trips")
    .insert({ name: input.name, data: input.data })
    .select(COLUMNS)
    .single();
  if (error) throw new Error(error.message);
  return toSavedTrip(data as TripRow);
}

export async function renameTrip(id: string, name: string): Promise<void> {
  const client = await getClient();
  const { error } = await client.from("trips").update({ name }).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteTrip(id: string): Promise<void> {
  const client = await getClient();
  const { error } = await client.from("trips").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
