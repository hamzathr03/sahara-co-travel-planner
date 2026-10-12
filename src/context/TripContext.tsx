import { createContext, useContext, useState, type ReactNode } from "react";

export interface TripStop {
  cityId: string;
  days: number;
  activities: string[];
}

interface TripContextValue {
  stops: TripStop[];
  addStop: (cityId: string) => void;
  removeStop: (cityId: string) => void;
  setDays: (cityId: string, days: number) => void;
  moveStop: (cityId: string, direction: -1 | 1) => void;
  toggleActivity: (cityId: string, activityName: string) => void;
}

const TripContext = createContext<TripContextValue | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [stops, setStops] = useState<TripStop[]>([]);

  function addStop(cityId: string) {
    // A city can only appear once in the trip.
    setStops((prev) =>
      prev.some((s) => s.cityId === cityId) ? prev : [...prev, { cityId, days: 2, activities: [] }]
    );
  }

  function removeStop(cityId: string) {
    setStops((prev) => prev.filter((s) => s.cityId !== cityId));
  }

  function setDays(cityId: string, days: number) {
    setStops((prev) => prev.map((s) => (s.cityId === cityId ? { ...s, days: Math.max(1, days) } : s)));
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

  function toggleActivity(cityId: string, activityName: string) {
    setStops((prev) =>
      prev.map((s) =>
        s.cityId !== cityId
          ? s
          : {
              ...s,
              activities: s.activities.includes(activityName)
                ? s.activities.filter((a) => a !== activityName)
                : [...s.activities, activityName],
            }
      )
    );
  }

  return (
    <TripContext.Provider value={{ stops, addStop, removeStop, setDays, moveStop, toggleActivity }}>
      {children}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used inside <TripProvider>");
  return ctx;
}
