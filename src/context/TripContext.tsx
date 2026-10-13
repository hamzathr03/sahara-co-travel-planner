import { createContext, useContext, useState, type ReactNode } from "react";
import { getCityById } from "../data/morocco";

export interface TripStop {
  cityId: string;
  days: number;
  activities: string[]; // selected activity names
  dayOf: Record<string, number>; // activity name -> day index (0-based) inside this city
}

interface TripContextValue {
  stops: TripStop[];
  addStop: (cityId: string) => void;
  removeStop: (cityId: string) => void;
  setDays: (cityId: string, days: number) => void;
  moveStop: (cityId: string, direction: -1 | 1) => void;
  toggleActivity: (cityId: string, activityName: string) => void;
  addActivity: (cityId: string, activityName: string, day: number) => void;
  removeActivity: (cityId: string, activityName: string) => void;
  moveActivity: (cityId: string, activityName: string, day: number) => void;
  generateProgramme: () => void;
}

const TripContext = createContext<TripContextValue | null>(null);

// Day with the fewest activities (earliest day wins a tie).
function lightestDay(stop: TripStop): number {
  const counts = Array.from({ length: stop.days }, () => 0);
  for (const a of stop.activities) {
    const d = stop.dayOf[a];
    if (d !== undefined && d < stop.days) counts[d] += 1;
  }
  return counts.indexOf(Math.min(...counts));
}

function withActivity(stop: TripStop, name: string, day?: number): TripStop {
  if (stop.activities.includes(name)) return stop;
  const target = day === undefined ? lightestDay(stop) : Math.min(Math.max(day, 0), stop.days - 1);
  return { ...stop, activities: [...stop.activities, name], dayOf: { ...stop.dayOf, [name]: target } };
}

function withoutActivity(stop: TripStop, name: string): TripStop {
  const dayOf = { ...stop.dayOf };
  delete dayOf[name];
  return { ...stop, activities: stop.activities.filter((a) => a !== name), dayOf };
}

export function TripProvider({ children }: { children: ReactNode }) {
  const [stops, setStops] = useState<TripStop[]>([]);

  function updateStop(cityId: string, fn: (stop: TripStop) => TripStop) {
    setStops((prev) => prev.map((s) => (s.cityId === cityId ? fn(s) : s)));
  }

  function addStop(cityId: string) {
    // A city can only appear once in the trip.
    setStops((prev) =>
      prev.some((s) => s.cityId === cityId)
        ? prev
        : [...prev, { cityId, days: 2, activities: [], dayOf: {} }]
    );
  }

  function removeStop(cityId: string) {
    setStops((prev) => prev.filter((s) => s.cityId !== cityId));
  }

  function setDays(cityId: string, days: number) {
    const n = Math.max(1, days);
    updateStop(cityId, (s) => {
      const dayOf: Record<string, number> = {};
      for (const a of s.activities) dayOf[a] = Math.min(s.dayOf[a] ?? 0, n - 1);
      return { ...s, days: n, dayOf };
    });
  }

  function moveStop(cityId: string, direction: -1 | 1) {
    setStops((prev) => {
      const from = prev.findIndex((s) => s.cityId === cityId);
      const to = from + direction;
      if (from < 0 || to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  }

  function toggleActivity(cityId: string, name: string) {
    updateStop(cityId, (s) => (s.activities.includes(name) ? withoutActivity(s, name) : withActivity(s, name)));
  }

  function addActivity(cityId: string, name: string, day: number) {
    updateStop(cityId, (s) => withActivity(s, name, day));
  }

  function removeActivity(cityId: string, name: string) {
    updateStop(cityId, (s) => withoutActivity(s, name));
  }

  function moveActivity(cityId: string, name: string, day: number) {
    updateStop(cityId, (s) =>
      s.activities.includes(name)
        ? { ...s, dayOf: { ...s.dayOf, [name]: Math.min(Math.max(day, 0), s.days - 1) } }
        : s
    );
  }

  // Fills every city with up to 2 activities per day, spread evenly over the days.
  function generateProgramme() {
    setStops((prev) =>
      prev.map((s) => {
        const city = getCityById(s.cityId);
        if (!city) return s;
        const picked = city.activities.slice(0, s.days * 2);
        const dayOf: Record<string, number> = {};
        picked.forEach((a, i) => {
          dayOf[a.name] = i % s.days;
        });
        return { ...s, activities: picked.map((a) => a.name), dayOf };
      })
    );
  }

  return (
    <TripContext.Provider
      value={{
        stops,
        addStop,
        removeStop,
        setDays,
        moveStop,
        toggleActivity,
        addActivity,
        removeActivity,
        moveActivity,
        generateProgramme,
      }}
    >
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used inside <TripProvider>");
  return ctx;
}
