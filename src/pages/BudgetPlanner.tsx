import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { cities, tierLabels, type HotelTier } from "../data/morocco";
import { useTrip } from "../context/TripContext";

type TransportMode = "bus" | "train" | "voiture" | "avion";

const transportOptions: Record<TransportMode, { label: string; icon: string; perHopPerPerson: number; flatPerDay?: number; note: string }> = {
  bus: { label: "Bus / CTM Supratours", icon: "🚌", perHopPerPerson: 120, note: "Économique, trajets confortables entre villes" },
  train: { label: "Train (ONCF)", icon: "🚆", perHopPerPerson: 190, note: "Rapide et confortable (lignes principales uniquement)" },
  voiture: { label: "Location de voiture", icon: "🚗", perHopPerPerson: 0, flatPerDay: 350, note: "Liberté totale, coût partagé entre voyageurs" },
  avion: { label: "Vol intérieur", icon: "✈️", perHopPerPerson: 850, note: "Idéal pour les longues distances (ex: Sahara)" },
};

const foodPerDay: Record<HotelTier, number> = { economique: 120, confort: 250, luxe: 500 };
const localTransportPerDay: Record<HotelTier, number> = { economique: 40, confort: 90, luxe: 200 };
const MAD_TO_EUR = 0.092;
const MAD_TO_USD = 0.1;

function currency(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n));
}

export default function BudgetPlanner() {
  const { stops: trip, addStop, removeStop, setDays, toggleActivity } = useTrip();
  const [travelers, setTravelers] = useState(2);
  const [tier, setTier] = useState<HotelTier>("confort");
  const [transport, setTransport] = useState<TransportMode>("train");
  const [cityToAdd, setCityToAdd] = useState("");

  const availableToAdd = cities.filter((c) => !trip.some((t) => t.cityId === c.id));
  // Keep the dropdown value valid even right after the selected city was added.
  const selectedToAdd = availableToAdd.some((c) => c.id === cityToAdd) ? cityToAdd : (availableToAdd[0]?.id ?? "");

  function addCity() {
    if (selectedToAdd) addStop(selectedToAdd);
  }

  const breakdown = useMemo(() => {
    let accommodation = 0;
    let food = 0;
    let localTransport = 0;
    let activities = 0;
    let totalDays = 0;
    const rooms = Math.max(1, Math.ceil(travelers / 2));

    trip.forEach((t) => {
      const city = cities.find((c) => c.id === t.cityId);
      if (!city) return;
      const hotel = city.hotels.find((h) => h.tier === tier) ?? city.hotels[0];
      accommodation += hotel.pricePerNight * t.days * rooms;
      food += foodPerDay[tier] * t.days * travelers;
      localTransport += localTransportPerDay[tier] * t.days * travelers;
      totalDays += t.days;
      t.activities.forEach((actName) => {
        const act = city.activities.find((a) => a.name === actName);
        if (act) activities += act.price * travelers;
      });
    });

    const hops = Math.max(0, trip.length - 1);
    const opt = transportOptions[transport];
    const intercityTransport =
      transport === "voiture" ? (opt.flatPerDay ?? 0) * totalDays : opt.perHopPerPerson * hops * travelers;

    const total = accommodation + food + localTransport + activities + intercityTransport;

    return { accommodation, food, localTransport, activities, intercityTransport, total, totalDays, hops };
  }, [trip, travelers, tier, transport]);

  const maxSegment = Math.max(
    breakdown.accommodation,
    breakdown.food,
    breakdown.localTransport,
    breakdown.activities,
    breakdown.intercityTransport,
    1
  );

  const segments = [
    { label: "Hébergement", value: breakdown.accommodation, color: "bg-amber-600", icon: "🏨" },
    { label: "Nourriture", value: breakdown.food, color: "bg-emerald-600", icon: "🍲" },
    { label: "Transport local", value: breakdown.localTransport, color: "bg-sky-600", icon: "🚕" },
    { label: "Activités", value: breakdown.activities, color: "bg-fuchsia-600", icon: "🎒" },
    { label: "Transport inter-villes", value: breakdown.intercityTransport, color: "bg-red-600", icon: "🚆" },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-amber-700">Simulateur</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-stone-900">Planificateur de budget</h1>
        <p className="mt-4 text-stone-500">
          Construisez votre itinéraire et obtenez une estimation détaillée du budget nécessaire pour votre
          voyage au Maroc.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        {/* Controls */}
        <div className="space-y-6 lg:col-span-2">
          {/* General settings */}
          <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5">
            <h2 className="font-serif text-lg font-bold text-stone-900">1. Paramètres généraux</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-stone-600">Nombre de voyageurs</label>
                <div className="mt-2 flex items-center gap-3">
                  <button
                    onClick={() => setTravelers((n) => Math.max(1, n - 1))}
                    className="h-9 w-9 rounded-full bg-stone-100 text-lg font-bold text-stone-700 hover:bg-stone-200"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-lg font-bold text-stone-900">{travelers}</span>
                  <button
                    onClick={() => setTravelers((n) => Math.min(12, n + 1))}
                    className="h-9 w-9 rounded-full bg-stone-100 text-lg font-bold text-stone-700 hover:bg-stone-200"
                  >
                    +
                  </button>
                  <span className="text-sm text-stone-400">personne{travelers > 1 ? "s" : ""}</span>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-stone-600">Niveau de confort</label>
                <div className="mt-2 flex gap-2">
                  {(Object.keys(tierLabels) as HotelTier[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTier(t)}
                      className={`flex-1 rounded-xl px-3 py-2 text-sm font-bold transition ${
                        tier === t ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                      }`}
                    >
                      {tierLabels[t]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-semibold text-stone-600">Mode de transport entre les villes</label>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {(Object.keys(transportOptions) as TransportMode[]).map((key) => {
                  const opt = transportOptions[key];
                  return (
                    <button
                      key={key}
                      onClick={() => setTransport(key)}
                      className={`flex items-start gap-3 rounded-xl border p-3 text-left transition ${
                        transport === key
                          ? "border-amber-600 bg-amber-50 ring-1 ring-amber-200"
                          : "border-stone-200 hover:border-amber-300"
                      }`}
                    >
                      <span className="text-xl">{opt.icon}</span>
                      <span>
                        <span className="block text-sm font-bold text-stone-800">{opt.label}</span>
                        <span className="block text-xs text-stone-400">{opt.note}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cities in trip */}
          <div className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5">
            <h2 className="font-serif text-lg font-bold text-stone-900">2. Votre itinéraire</h2>

            <div className="mt-4 flex flex-wrap gap-2">
              <select
                value={selectedToAdd}
                onChange={(e) => setCityToAdd(e.target.value)}
                className="flex-1 min-w-[160px] rounded-full border border-stone-200 px-4 py-2 text-sm font-semibold text-stone-700 outline-none focus:ring-2 focus:ring-amber-600/30"
              >
                {availableToAdd.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <button
                onClick={addCity}
                disabled={availableToAdd.length === 0}
                className="rounded-full bg-stone-900 px-5 py-2 text-sm font-bold text-white transition hover:bg-stone-700 disabled:opacity-40"
              >
                + Ajouter la ville
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {trip.length === 0 && (
                <p className="rounded-xl bg-stone-50 p-4 text-center text-sm text-stone-400">
                  Ajoutez au moins une ville pour commencer votre simulation, ou{" "}
                  <Link to="/planner" className="font-semibold text-amber-700 hover:text-amber-800">
                    construisez votre itinéraire
                  </Link>
                  .
                </p>
              )}
              {trip.map((t) => {
                const city = cities.find((c) => c.id === t.cityId)!;
                return (
                  <div key={t.cityId} className="rounded-xl border border-stone-100 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img src={city.image} alt={city.name} className="h-12 w-16 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-stone-900">{city.name}</p>
                          <p className="text-xs text-stone-400">{city.region}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-stone-500">Jours</span>
                          <button
                            onClick={() => setDays(t.cityId, t.days - 1)}
                            className="h-7 w-7 rounded-full bg-stone-100 text-sm font-bold text-stone-700 hover:bg-stone-200"
                          >
                            −
                          </button>
                          <span className="w-5 text-center font-bold text-stone-800">{t.days}</span>
                          <button
                            onClick={() => setDays(t.cityId, t.days + 1)}
                            className="h-7 w-7 rounded-full bg-stone-100 text-sm font-bold text-stone-700 hover:bg-stone-200"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeStop(t.cityId)}
                          className="text-sm font-semibold text-red-500 hover:text-red-600"
                        >
                          Retirer
                        </button>
                      </div>
                    </div>

                    <details className="mt-3 group">
                      <summary className="cursor-pointer text-sm font-semibold text-amber-700 hover:text-amber-800">
                        Choisir des activités ({t.activities.length} sélectionnée{t.activities.length > 1 ? "s" : ""})
                      </summary>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {city.activities.map((a) => (
                          <label
                            key={a.name}
                            className="flex cursor-pointer items-start gap-2 rounded-lg border border-stone-100 p-2.5 text-sm hover:bg-stone-50"
                          >
                            <input
                              type="checkbox"
                              checked={t.activities.includes(a.name)}
                              onChange={() => toggleActivity(t.cityId, a.name)}
                              className="mt-0.5 h-4 w-4 accent-amber-600"
                            />
                            <span>
                              <span className="block font-semibold text-stone-700">{a.name}</span>
                              <span className="block text-xs text-stone-400">
                                {a.price > 0 ? `${a.price} MAD/pers.` : "Gratuit"} · {a.duration}
                              </span>
                            </span>
                          </label>
                        ))}
                      </div>
                    </details>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-stone-100 bg-white p-6 shadow-md shadow-stone-900/10">
            <h2 className="font-serif text-lg font-bold text-stone-900">Estimation du budget</h2>
            <p className="text-xs text-stone-400">
              {breakdown.totalDays} jour{breakdown.totalDays > 1 ? "s" : ""} · {travelers} voyageur
              {travelers > 1 ? "s" : ""} · {trip.length} ville{trip.length > 1 ? "s" : ""}
            </p>

            <div className="mt-5 space-y-3">
              {segments.map((s) => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-stone-600">
                      {s.icon} {s.label}
                    </span>
                    <span className="font-bold text-stone-800">{currency(s.value)} MAD</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-stone-100">
                    <div
                      className={`h-full rounded-full ${s.color}`}
                      style={{ width: `${(s.value / maxSegment) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-gradient-to-br from-stone-900 to-amber-950 p-5 text-white">
              <p className="text-xs uppercase tracking-wide text-amber-300">Budget total estimé</p>
              <p className="mt-1 font-serif text-3xl font-extrabold">{currency(breakdown.total)} MAD</p>
              <p className="mt-1 text-sm text-stone-300">
                ≈ {currency(breakdown.total * MAD_TO_EUR)} € · {currency(breakdown.total * MAD_TO_USD)} $
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
                <div>
                  <p className="text-stone-400">Par personne</p>
                  <p className="font-bold">{currency(breakdown.total / travelers)} MAD</p>
                </div>
                <div>
                  <p className="text-stone-400">Par jour</p>
                  <p className="font-bold">
                    {currency(breakdown.total / Math.max(1, breakdown.totalDays))} MAD
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4 text-center text-[11px] leading-relaxed text-stone-400">
              Estimation indicative basée sur des tarifs moyens 2026. Les prix réels peuvent varier selon la
              saison, la disponibilité et vos négociations sur place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
