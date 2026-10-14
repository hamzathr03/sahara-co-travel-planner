import { Link } from "react-router-dom";
import { getCityById, tierLabels, type HotelTier } from "../data/morocco";
import { useTrip, type TransportMode } from "../context/TripContext";
import SaveTrip from "../components/SaveTrip";
import { getLegs, sumLegs } from "../utils/route";

const transportOptions: Record<TransportMode, { label: string; icon: string; note: string }> = {
  bus: { label: "Bus (CTM, Supratours)", icon: "🚌", note: "≈ 0,40 MAD/km par personne" },
  train: { label: "Train (ONCF)", icon: "🚆", note: "≈ 0,55 MAD/km par personne, lignes principales uniquement" },
  voiture: { label: "Location de voiture", icon: "🚗", note: "≈ 350 MAD/jour + carburant ≈ 0,90 MAD/km, coût partagé" },
  avion: { label: "Vol intérieur", icon: "✈️", note: "≈ 850 MAD par vol et par personne" },
};

// Estimated rates (not live prices).
const RATE_PER_KM = { bus: 0.4, train: 0.55 };
const CAR_RENTAL_PER_DAY = 350;
const CAR_FUEL_PER_KM = 0.9;
const FLIGHT_PER_LEG = 850;

const tierInfo: Record<HotelTier, string> = {
  economique: "Hôtels simples et riads abordables, repas locaux, taxis collectifs.",
  confort: "Hôtels et riads confortables, restaurants variés, petits taxis en ville.",
  luxe: "Palaces et riads de charme, tables gastronomiques, chauffeur privé en ville.",
};

const foodPerDay: Record<HotelTier, number> = { economique: 120, confort: 250, luxe: 500 };
const localTransportPerDay: Record<HotelTier, number> = { economique: 40, confort: 90, luxe: 200 };
const MAD_TO_EUR = 0.092;
const MAD_TO_USD = 0.1;

function currency(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(Math.round(n));
}

interface Segment {
  label: string;
  value: number;
  color: string;
  icon: string;
  hint: string;
}

export default function BudgetPlanner() {
  const { stops: trip, settings, updateSettings } = useTrip();
  const { travelers, tier, transport } = settings;

  const rows = trip.flatMap((stop) => {
    const city = getCityById(stop.cityId);
    if (!city) return [];
    const hotel = city.hotels.find((h) => h.tier === tier) ?? city.hotels[0];
    return [{ stop, city, hotel }];
  });

  const rooms = Math.max(1, Math.ceil(travelers / 2));
  let accommodation = 0;
  let food = 0;
  let localTransport = 0;
  let activities = 0;
  let totalDays = 0;

  for (const { stop, city, hotel } of rows) {
    accommodation += hotel.pricePerNight * stop.days * rooms;
    food += foodPerDay[tier] * stop.days * travelers;
    localTransport += localTransportPerDay[tier] * stop.days * travelers;
    totalDays += stop.days;
    for (const name of stop.activities) {
      const activity = city.activities.find((a) => a.name === name);
      if (activity) activities += activity.price * travelers;
    }
  }

  const legs = getLegs(trip);
  const { km: totalKm } = sumLegs(legs);

  let intercityTransport = 0;
  if (transport === "voiture") {
    intercityTransport = CAR_RENTAL_PER_DAY * totalDays + CAR_FUEL_PER_KM * totalKm;
  } else if (transport === "avion") {
    intercityTransport = FLIGHT_PER_LEG * legs.length * travelers;
  } else {
    intercityTransport = RATE_PER_KM[transport] * totalKm * travelers;
  }

  const total = accommodation + food + localTransport + activities + intercityTransport;

  const segments: Segment[] = [
    { label: "Hébergement", value: accommodation, color: "bg-amber-600", icon: "🏨", hint: `${rooms} chambre${rooms > 1 ? "s" : ""}` },
    { label: "Nourriture", value: food, color: "bg-emerald-600", icon: "🍲", hint: "" },
    { label: "Transport local", value: localTransport, color: "bg-sky-600", icon: "🚕", hint: "" },
    { label: "Activités", value: activities, color: "bg-fuchsia-600", icon: "🎒", hint: "" },
    { label: "Transport inter-villes", value: intercityTransport, color: "bg-red-600", icon: "🚆", hint: totalKm > 0 ? `≈ ${totalKm} km` : "" },
  ];
  const maxSegment = Math.max(...segments.map((s) => s.value), 1);

  return (
    <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-serif text-4xl font-bold text-stone-900">Planificateur de budget</h1>
        <p className="mt-4 text-stone-500">
          Le budget se calcule à partir du voyage que vous avez construit : villes, durée, activités et
          distances entre les étapes.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          {/* Trip (read-only) */}
          <section className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-serif text-lg font-bold text-stone-900">Votre voyage</h2>
              <Link to="/planner" className="text-sm font-semibold text-amber-700 hover:text-amber-800">
                Modifier mon voyage
              </Link>
            </div>

            {rows.length === 0 ? (
              <p className="mt-4 rounded-xl bg-stone-50 p-4 text-center text-sm text-stone-500">
                Votre voyage est vide.{" "}
                <Link to="/planner" className="font-semibold text-amber-700 hover:text-amber-800">
                  Construisez votre itinéraire
                </Link>{" "}
                pour obtenir une estimation.
              </p>
            ) : (
              <ol className="mt-4 space-y-2">
                {rows.map(({ stop, city, hotel }, i) => (
                  <li
                    key={stop.cityId}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-stone-100 p-3 text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 text-xs font-bold text-white">
                        {i + 1}
                      </span>
                      <div>
                        <p className="font-bold text-stone-900">{city.name}</p>
                        <p className="text-xs text-stone-400">
                          {stop.days} jour{stop.days > 1 ? "s" : ""} · {stop.activities.length} activité
                          {stop.activities.length > 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-stone-500">
                      {hotel.name} · {hotel.pricePerNight} MAD/nuit
                    </p>
                  </li>
                ))}
              </ol>
            )}
          </section>

          {/* Settings */}
          <section className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5">
            <h2 className="font-serif text-lg font-bold text-stone-900">Paramètres</h2>

            <div className="mt-5">
              <p className="text-sm font-semibold text-stone-600">Nombre de voyageurs</p>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateSettings({ travelers: Math.max(1, travelers - 1) })}
                  aria-label="Retirer un voyageur"
                  className="h-9 w-9 rounded-full bg-stone-100 text-lg font-bold text-stone-700 hover:bg-stone-200"
                >
                  −
                </button>
                <span className="w-8 text-center text-lg font-bold text-stone-900">{travelers}</span>
                <button
                  type="button"
                  onClick={() => updateSettings({ travelers: Math.min(12, travelers + 1) })}
                  aria-label="Ajouter un voyageur"
                  className="h-9 w-9 rounded-full bg-stone-100 text-lg font-bold text-stone-700 hover:bg-stone-200"
                >
                  +
                </button>
                <span className="text-sm text-stone-400">personne{travelers > 1 ? "s" : ""}</span>
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-stone-600">Niveau de confort</p>
              <div className="mt-2 flex gap-2">
                {(Object.keys(tierLabels) as HotelTier[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => updateSettings({ tier: t })}
                    className={`flex-1 rounded-xl px-3 py-2 text-sm font-bold transition ${
                      tier === t ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                    }`}
                  >
                    {tierLabels[t]}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-stone-500">{tierInfo[tier]}</p>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-stone-600">Transport entre les villes</p>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {(Object.keys(transportOptions) as TransportMode[]).map((key) => {
                  const opt = transportOptions[key];
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => updateSettings({ transport: key })}
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

            <details className="mt-6 rounded-xl bg-stone-50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-stone-700">Hypothèses de calcul</summary>
              <ul className="mt-3 space-y-1.5 text-xs leading-relaxed text-stone-500">
                <li>Hébergement : prix d'une chambre double par nuit, une chambre pour 2 voyageurs.</li>
                <li>Nourriture : {foodPerDay[tier]} MAD par personne et par jour.</li>
                <li>Transport local : {localTransportPerDay[tier]} MAD par personne et par jour.</li>
                <li>Activités : prix par personne des activités ajoutées à votre programme.</li>
                <li>Transport inter-villes : distances estimées entre les villes (voir la carte).</li>
              </ul>
            </details>
          </section>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-2xl border border-stone-100 bg-white p-6 shadow-md shadow-stone-900/10">
            <h2 className="font-serif text-lg font-bold text-stone-900">Estimation du budget</h2>

            {rows.length === 0 ? (
              <p className="mt-4 rounded-xl bg-stone-50 p-4 text-center text-sm text-stone-500">
                Ajoutez des villes à votre voyage pour voir l'estimation.
              </p>
            ) : (
              <>
                <p className="text-xs text-stone-400">
                  {totalDays} jour{totalDays > 1 ? "s" : ""} · {travelers} voyageur{travelers > 1 ? "s" : ""} ·{" "}
                  {rows.length} ville{rows.length > 1 ? "s" : ""}
                </p>

                <div className="mt-5 space-y-3">
                  {segments.map((s) => (
                    <div key={s.label}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-stone-600">
                          {s.icon} {s.label}
                          {s.hint && <span className="ml-1.5 text-xs font-normal text-stone-400">{s.hint}</span>}
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
                  <p className="text-xs text-amber-300">Budget total estimé</p>
                  <p className="mt-1 font-serif text-3xl font-extrabold">{currency(total)} MAD</p>
                  <p className="mt-1 text-sm text-stone-300">
                    ≈ {currency(total * MAD_TO_EUR)} € · {currency(total * MAD_TO_USD)} $
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-sm">
                    <div>
                      <p className="text-stone-400">Par personne</p>
                      <p className="font-bold">{currency(total / travelers)} MAD</p>
                    </div>
                    <div>
                      <p className="text-stone-400">Par jour</p>
                      <p className="font-bold">{currency(total / Math.max(1, totalDays))} MAD</p>
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-center text-[11px] leading-relaxed text-stone-400">
                  Estimation indicative : ces montants reposent sur des tarifs moyens supposés, pas sur des prix
                  réels ou à jour. Les prix effectifs varient selon la saison, la disponibilité et la négociation
                  sur place. Les conversions en € et $ sont approximatives.
                </p>
              </>
            )}

            <SaveTrip />
          </div>
        </div>
      </div>
    </div>
  );
}
