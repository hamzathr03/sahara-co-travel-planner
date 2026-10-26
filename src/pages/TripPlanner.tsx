import { Fragment } from "react";
import { Link } from "react-router-dom";
import { cities, getCityById } from "../data/morocco";
import { useTrip } from "../context/TripContext";
import SaveTrip from "../components/SaveTrip";
import { formatDuration, formatLeg, getLegs, sumLegs } from "../utils/route";
import Programme from "../components/Programme";
import CityImage from "../components/CityImage";
import { cn } from "../utils/cn";

export default function TripPlanner() {
  const { stops, addStop, removeStop, setDays, moveStop } = useTrip();

  const totalDays = stops.reduce((sum, s) => sum + s.days, 0);
  const route = stops.map((s) => getCityById(s.cityId)?.name ?? s.cityId);
  const legs = getLegs(stops);
  const totals = sumLegs(legs);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-bold text-stone-900">Planifiez votre itinéraire</h1>
        <p className="mt-4 text-stone-500">
          Choisissez vos villes, indiquez combien de jours vous passez dans chacune et placez-les dans
          l'ordre de votre parcours.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Choose cities */}
          <section className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5">
            <h2 className="font-serif text-lg font-bold text-stone-900">Choisissez vos villes</h2>
            <p className="mt-1 text-sm text-stone-400">Un clic ajoute la ville à la fin de votre itinéraire.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {cities.map((c) => {
                const selected = stops.some((s) => s.cityId === c.id);
                return (
                  <button
                    key={c.id}
                    type="button"
                    disabled={selected}
                    onClick={() => addStop(c.id)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-semibold transition",
                      selected
                        ? "cursor-default bg-amber-50 text-amber-800 ring-1 ring-amber-200"
                        : "bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-amber-900"
                    )}
                  >
                    {selected ? "✓" : "+"} {c.name}
                  </button>
                );
              })}
            </div>
          </section>

          {/* Route */}
          <section className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5">
            <h2 className="font-serif text-lg font-bold text-stone-900">Votre itinéraire</h2>

            {stops.length === 0 ? (
              <p className="mt-4 rounded-xl bg-stone-50 p-4 text-center text-sm text-stone-500">
                Votre itinéraire est vide. Choisissez une première ville ci-dessus pour commencer.
              </p>
            ) : (
              <ol className="mt-5 space-y-3">
                {stops.map((s, i) => {
                  const city = getCityById(s.cityId);
                  if (!city) return null;
                  const leg = legs.find((l) => l.fromId === s.cityId);
                  return (
                    <Fragment key={s.cityId}>
                    <li className="rounded-xl border border-stone-100 p-4">
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-sm font-bold text-white">
                            {i + 1}
                          </span>
                          <CityImage city={city} className="h-12 w-16 rounded-lg object-cover" />
                          <div>
                            <p className="font-bold text-stone-900">{city.name}</p>
                            <p className="text-xs text-stone-400">{city.region}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-stone-500">Jours</span>
                            <button
                              type="button"
                              onClick={() => setDays(s.cityId, s.days - 1)}
                              disabled={s.days <= 1}
                              aria-label={`Retirer un jour à ${city.name}`}
                              className="h-10 w-10 rounded-full bg-stone-100 sm:h-8 sm:w-8 text-sm font-bold text-stone-700 hover:bg-stone-200 disabled:opacity-40"
                            >
                              −
                            </button>
                            <span className="w-5 text-center font-bold text-stone-800">{s.days}</span>
                            <button
                              type="button"
                              onClick={() => setDays(s.cityId, s.days + 1)}
                              aria-label={`Ajouter un jour à ${city.name}`}
                              className="h-10 w-10 rounded-full bg-stone-100 sm:h-8 sm:w-8 text-sm font-bold text-stone-700 hover:bg-stone-200"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => moveStop(s.cityId, -1)}
                              disabled={i === 0}
                              aria-label={`Placer ${city.name} plus tôt`}
                              className="h-10 w-10 rounded-full bg-stone-100 sm:h-8 sm:w-8 text-sm font-bold text-stone-700 hover:bg-stone-200 disabled:opacity-30"
                            >
                              ↑
                            </button>
                            <button
                              type="button"
                              onClick={() => moveStop(s.cityId, 1)}
                              disabled={i === stops.length - 1}
                              aria-label={`Placer ${city.name} plus tard`}
                              className="h-10 w-10 rounded-full bg-stone-100 sm:h-8 sm:w-8 text-sm font-bold text-stone-700 hover:bg-stone-200 disabled:opacity-30"
                            >
                              ↓
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeStop(s.cityId)}
                            className="text-sm font-semibold text-red-500 hover:text-red-600"
                          >
                            Retirer
                          </button>
                        </div>
                      </div>
                    </li>
                    {leg && (
                      <li aria-hidden="true" className="text-center text-xs font-medium text-stone-400">
                        ↓ {formatLeg(leg)}
                      </li>
                    )}
                    </Fragment>
                  );
                })}
              </ol>
            )}
          </section>

          {stops.length > 0 && <Programme />}
        </div>

        {/* Summary */}
        <aside className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-stone-100 bg-white p-6 shadow-md shadow-stone-900/10">
            <h2 className="font-serif text-lg font-bold text-stone-900">Résumé du voyage</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-stone-100 pb-2">
                <dt className="text-stone-400">Villes</dt>
                <dd className="font-semibold text-stone-800">{stops.length}</dd>
              </div>
              <div className="flex justify-between pb-1">
                <dt className="text-stone-400">Durée totale</dt>
                <dd className="font-semibold text-stone-800">
                  {totalDays} jour{totalDays > 1 ? "s" : ""}
                </dd>
              </div>
              {legs.length > 0 && (
                <>
                  <div className="flex justify-between border-t border-stone-100 pt-3">
                    <dt className="text-stone-400">Distance estimée</dt>
                    <dd className="font-semibold text-stone-800">≈ {totals.km} km</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-stone-400">Temps de route</dt>
                    <dd className="font-semibold text-stone-800">≈ {formatDuration(totals.minutes)}</dd>
                  </div>
                </>
              )}
            </dl>

            {route.length > 0 && (
              <p className="mt-4 text-sm leading-relaxed text-stone-600">
                <span className="font-semibold text-stone-800">Parcours : </span>
                {route.join(" → ")}
              </p>
            )}

            <Link
              to="/budget"
              className="mt-6 block w-full rounded-full bg-gradient-to-r from-amber-500 to-red-600 py-3 text-center text-sm font-bold text-white shadow-md transition hover:brightness-110"
            >
              Estimer le budget
            </Link>
            <Link
              to="/carte"
              className="mt-3 block text-center text-sm font-semibold text-amber-700 hover:text-amber-800"
            >
              Voir le parcours sur la carte
            </Link>

            <SaveTrip />
          </div>
        </aside>
      </div>
    </div>
  );
}
