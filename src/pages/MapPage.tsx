import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import CityMap from "../components/CityMap";
import CityImage from "../components/CityImage";
import { cities, getCityById } from "../data/morocco";
import { useTrip } from "../context/TripContext";
import { formatDuration, formatLeg, getLegs, sumLegs } from "../utils/route";
import { cn } from "../utils/cn";

export default function MapPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const panelRef = useRef<HTMLElement>(null);

  // Below the "lg" breakpoint the panel sits under the map: scroll to it after a tap on the map.
  function selectFromMap(cityId: string) {
    setSelectedId(cityId);
    if (window.matchMedia("(max-width: 1023px)").matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }
  const { stops, addStop, removeStop } = useTrip();

  const city = selectedId ? getCityById(selectedId) : undefined;
  const inTrip = city ? stops.some((s) => s.cityId === city.id) : false;
  const legs = getLegs(stops);
  const totals = sumLegs(legs);
  const nameOf = (id: string) => getCityById(id)?.name ?? id;

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-bold text-stone-900">Explorez le Maroc sur la carte</h1>
        <p className="mt-4 text-stone-500">
          Touchez une ville pour découvrir ses atouts, puis ajoutez-la à votre voyage.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <CityMap selectedId={selectedId} onSelect={selectFromMap} />
          <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-stone-500">
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-stone-500" /> Ville
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-600" /> Dans mon voyage
            </li>
            <li className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-600" /> Sélectionnée
            </li>
          </ul>

          {legs.length > 0 ? (
            <div className="mt-6 rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5">
              <h2 className="font-serif text-lg font-bold text-stone-900">Votre parcours</h2>
              <ol className="mt-4 space-y-2 text-sm">
                {legs.map((leg) => (
                  <li key={`${leg.fromId}-${leg.toId}`} className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-semibold text-stone-800">
                      {nameOf(leg.fromId)} → {nameOf(leg.toId)}
                    </span>
                    <span className="text-stone-500">{formatLeg(leg)}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-stone-100 pt-3 text-sm font-semibold text-stone-800">
                Total : ≈ {totals.km} km · {formatDuration(totals.minutes)} de route
              </p>
              <p className="mt-1 text-xs text-stone-400">
                Estimations indicatives, hors pauses et circulation.
              </p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-stone-400">
              Ajoutez au moins deux villes à votre voyage pour voir le trajet et les distances.
            </p>
          )}
        </div>

        <aside ref={panelRef} className="scroll-mt-20 rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5">
          <div className="flex flex-wrap gap-2">
            {cities.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedId(c.id)}
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-semibold transition",
                  c.id === selectedId
                    ? "bg-stone-900 text-white"
                    : "bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-amber-900"
                )}
              >
                {c.name}
              </button>
            ))}
          </div>

          {city ? (
            <div className="mt-6">
              <CityImage city={city} className="h-40 w-full rounded-xl object-cover" />
              <h2 className="mt-4 font-serif text-2xl font-bold text-stone-900">{city.name}</h2>
              <p className="text-sm text-stone-400">{city.region}</p>
              <p className="mt-3 text-sm leading-relaxed text-stone-600">{city.tagline}</p>
              <p className="mt-3 text-sm text-stone-600">
                <span className="font-semibold text-stone-800">Meilleure période : </span>
                {city.bestTime}
              </p>
              <ul className="mt-3 space-y-1 text-sm text-stone-600">
                {city.highlights.slice(0, 4).map((h) => (
                  <li key={h}>• {h}</li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => (inTrip ? removeStop(city.id) : addStop(city.id))}
                  className={cn(
                    "rounded-full py-2.5 text-sm font-bold transition",
                    inTrip
                      ? "bg-stone-100 text-stone-700 hover:bg-stone-200"
                      : "bg-gradient-to-r from-amber-500 to-red-600 text-white shadow-md hover:brightness-110"
                  )}
                >
                  {inTrip ? "Retirer de mon voyage" : "Ajouter à mon voyage"}
                </button>
                <Link
                  to={`/villes/${city.id}`}
                  className="rounded-full border border-stone-200 py-2.5 text-center text-sm font-semibold text-stone-700 transition hover:bg-stone-50"
                >
                  Découvrir {city.name}
                </Link>
              </div>
            </div>
          ) : (
            <p className="mt-6 rounded-xl bg-stone-50 p-4 text-center text-sm text-stone-500">
              Sélectionnez une ville sur la carte pour voir ses informations.
            </p>
          )}

          {stops.length > 0 && (
            <Link
              to="/planner"
              className="mt-6 block text-center text-sm font-semibold text-amber-700 hover:text-amber-800"
            >
              Voir mon itinéraire ({stops.length} ville{stops.length > 1 ? "s" : ""})
            </Link>
          )}
        </aside>
      </div>
    </div>
  );
}
