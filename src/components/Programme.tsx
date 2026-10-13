import { getCityById } from "../data/morocco";
import { useTrip } from "../context/TripContext";

export default function Programme() {
  const { stops, addActivity, removeActivity, moveActivity, generateProgramme } = useTrip();

  // First day number of each city inside the whole trip.
  const offsets = stops.map((_, i) => stops.slice(0, i).reduce((n, s) => n + s.days, 0));

  return (
    <section className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-serif text-lg font-bold text-stone-900">Programme jour par jour</h2>
          <p className="mt-1 text-sm text-stone-400">
            Ajoutez, retirez ou déplacez les activités de chaque journée.
          </p>
        </div>
        <button
          type="button"
          onClick={generateProgramme}
          className="rounded-full bg-amber-100 px-4 py-2 text-sm font-bold text-amber-900 transition hover:bg-amber-200"
        >
          Générer automatiquement
        </button>
      </div>
      <p className="mt-2 text-xs text-stone-400">La génération remplace les activités déjà choisies.</p>

      <div className="mt-6 space-y-8">
        {stops.map((s, i) => {
          const city = getCityById(s.cityId);
          if (!city) return null;
          const remaining = city.activities.filter((a) => !s.activities.includes(a.name));

          return (
            <div key={s.cityId}>
              <h3 className="font-serif text-base font-bold text-stone-900">{city.name}</h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                {Array.from({ length: s.days }, (_, d) => {
                  const dayActivities = s.activities.filter((a) => s.dayOf[a] === d);
                  return (
                    <div key={d} className="rounded-xl border border-stone-100 bg-stone-50/60 p-4">
                      <p className="text-sm font-bold text-stone-800">Jour {offsets[i] + d + 1}</p>

                      {dayActivities.length === 0 ? (
                        <p className="mt-2 text-sm text-stone-400">Journée libre.</p>
                      ) : (
                        <ul className="mt-2 space-y-2">
                          {dayActivities.map((name) => {
                            const activity = city.activities.find((a) => a.name === name);
                            return (
                              <li key={name} className="rounded-lg bg-white p-3 text-sm shadow-sm shadow-stone-900/5">
                                <p className="font-semibold text-stone-800">{name}</p>
                                {activity && (
                                  <p className="text-xs text-stone-400">
                                    {activity.price > 0 ? `${activity.price} MAD/pers.` : "Gratuit"} · {activity.duration}
                                  </p>
                                )}
                                <div className="mt-2 flex items-center gap-3">
                                  {s.days > 1 && (
                                    <select
                                      value=""
                                      aria-label={`Déplacer ${name} vers un autre jour`}
                                      onChange={(e) => {
                                        if (e.target.value !== "") moveActivity(s.cityId, name, Number(e.target.value));
                                      }}
                                      className="rounded-md border border-stone-200 bg-white px-2 py-1 text-xs text-stone-600"
                                    >
                                      <option value="">Déplacer vers…</option>
                                      {Array.from({ length: s.days }, (_, k) => k)
                                        .filter((k) => k !== d)
                                        .map((k) => (
                                          <option key={k} value={k}>
                                            Jour {offsets[i] + k + 1}
                                          </option>
                                        ))}
                                    </select>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => removeActivity(s.cityId, name)}
                                    className="text-xs font-semibold text-red-500 hover:text-red-600"
                                  >
                                    Retirer
                                  </button>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}

                      {remaining.length > 0 && (
                        <select
                          value=""
                          aria-label={`Ajouter une activité au jour ${offsets[i] + d + 1}`}
                          onChange={(e) => {
                            if (e.target.value !== "") addActivity(s.cityId, e.target.value, d);
                          }}
                          className="mt-3 w-full rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm text-stone-600"
                        >
                          <option value="">+ Ajouter une activité</option>
                          {remaining.map((a) => (
                            <option key={a.name} value={a.name}>
                              {a.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
