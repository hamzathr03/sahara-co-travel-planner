import { useState } from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { getCityById, cities, type HotelTier } from "../data/morocco";
import CityCard from "../components/CityCard";
import { useTrip } from "../context/TripContext";
import { useLang } from "../context/LanguageContext";
import { dailyBudgetPerPerson } from "../data/costs";
import CityImage from "../components/CityImage";

const tierColors: Record<HotelTier, string> = {
  economique: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  confort: "bg-amber-50 text-amber-700 ring-amber-100",
  luxe: "bg-fuchsia-50 text-fuchsia-700 ring-fuchsia-100",
};

export default function CityDetail() {
  const { id } = useParams();
  const rawCity = id ? getCityById(id) : undefined;
  const navigate = useNavigate();
  const { stops, addStop } = useTrip();
  const { t, localCity, arrow, formatNumber } = useLang();
  const [activeTier, setActiveTier] = useState<HotelTier | "all">("all");

  if (!rawCity) return <Navigate to="/villes" replace />;

  const city = localCity(rawCity);
  const backArrow = arrow === "→" ? "←" : "→";
  const hotels = activeTier === "all" ? city.hotels : city.hotels.filter((h) => h.tier === activeTier);
  const others = cities.filter((c) => c.id !== city.id).slice(0, 3);
  const money = (n: number) => `≈ ${formatNumber(n)} ${t.common.currency}`;

  return (
    <div>
      <section className="relative h-[420px] w-full overflow-hidden">
        <CityImage city={city} eager className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-stone-950/10" />
        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-12 sm:px-8">
          <div className="mx-auto w-full max-w-7xl">
            <Link to="/villes" className="mb-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-amber-300 hover:text-amber-200">
              {backArrow} {t.cityDetail.back}
            </Link>
            <span className="mb-2 block w-fit rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white ring-1 ring-white/30 backdrop-blur">
              {city.region}
            </span>
            <h1 className="mt-3 font-serif text-4xl font-extrabold text-white sm:text-5xl">{city.name}</h1>
            <p className="mt-2 max-w-xl text-lg text-stone-200">{city.tagline}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl font-bold text-stone-900">{t.cityDetail.about(city.name)}</h2>
            <p className="mt-3 leading-relaxed text-stone-600">{city.description}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {city.highlights.map((h) => (
                <span key={h} className="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-800 ring-1 ring-amber-100">
                  📍 {h}
                </span>
              ))}
            </div>
          </div>

          <aside className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5">
            <h3 className="font-serif text-lg font-bold text-stone-900">{t.cityDetail.practicalInfo}</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-3 border-b border-stone-100 pb-2">
                <dt className="text-stone-400">{t.cityDetail.bestTime}</dt>
                <dd className="font-semibold text-stone-800">{city.bestTime}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-stone-100 pb-2">
                <dt className="text-stone-400">{t.cityDetail.budgetEco}</dt>
                <dd className="font-semibold text-stone-800">{money(dailyBudgetPerPerson(rawCity, "economique"))}</dd>
              </div>
              <div className="flex justify-between gap-3 border-b border-stone-100 pb-2">
                <dt className="text-stone-400">{t.cityDetail.budgetComfort}</dt>
                <dd className="font-semibold text-stone-800">{money(dailyBudgetPerPerson(rawCity, "confort"))}</dd>
              </div>
              <div className="flex justify-between gap-3 pb-1">
                <dt className="text-stone-400">{t.cityDetail.budgetLuxe}</dt>
                <dd className="font-semibold text-stone-800">{money(dailyBudgetPerPerson(rawCity, "luxe"))}</dd>
              </div>
            </dl>
            <p className="mt-3 text-xs leading-relaxed text-stone-400">{t.cityDetail.budgetNote}</p>
            <button
              onClick={() => {
                addStop(city.id);
                navigate("/planner");
              }}
              className="mt-6 w-full rounded-full bg-gradient-to-r from-amber-500 to-red-600 py-3 text-sm font-bold text-white shadow-md transition hover:brightness-110"
            >
              {stops.some((s) => s.cityId === city.id) ? t.cityDetail.seeInTrip : t.cityDetail.addToTrip}
            </button>
          </aside>
        </div>

        {/* Hotels */}
        <div className="mt-16">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-serif text-2xl font-bold text-stone-900">{t.cityDetail.sleepTitle}</h2>
            <div className="flex flex-wrap gap-2">
              {(["all", "economique", "confort", "luxe"] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setActiveTier(tier)}
                  aria-pressed={activeTier === tier}
                  className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                    activeTier === tier ? "bg-stone-900 text-white" : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                  }`}
                >
                  {tier === "all" ? t.common.all : t.common.tiers[tier]}
                </button>
              ))}
            </div>
          </div>
          <p className="mt-3 text-sm text-stone-400">{t.cityDetail.hotelsNote}</p>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {hotels.map((h) => (
              <div key={h.tier} className="flex flex-col rounded-2xl border border-stone-100 bg-white p-6 shadow-sm shadow-stone-900/5 transition hover:shadow-md">
                <h3 className="font-serif text-lg font-bold text-stone-900">{h.name}</h3>
                <span className={`mt-2 w-fit rounded-full px-2.5 py-1 text-xs font-bold ring-1 ${tierColors[h.tier]}`}>
                  {t.common.tiers[h.tier]}
                </span>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-stone-500">{h.description}</p>
                <div className="mt-4 border-t border-stone-100 pt-3">
                  <div className="flex items-end justify-between gap-3">
                    <span className="text-xs text-stone-400">{t.cityDetail.doubleRoom}</span>
                    <span className="font-serif text-xl font-bold text-stone-900">{money(h.pricePerNight)}</span>
                  </div>
                  <p className="mt-1 text-end text-xs text-stone-400">
                    {t.cityDetail.range(formatNumber(h.priceRange[0]), formatNumber(h.priceRange[1]))}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activities */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-stone-900">{t.cityDetail.activitiesTitle}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {city.activities.map((a) => (
              <div key={a.name} className="flex items-start gap-4 rounded-2xl border border-stone-100 bg-white p-5 shadow-sm shadow-stone-900/5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-xl">🧳</div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-stone-900">{a.label}</h3>
                    <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-600">{a.categoryLabel}</span>
                  </div>
                  <p className="mt-1 text-sm text-stone-500">{a.description}</p>
                  <div className="mt-2 flex items-center gap-4 text-sm font-semibold">
                    <span className="text-stone-400">⏱ {a.durationLabel}</span>
                    <span className="text-amber-700">
                      {a.price > 0 ? `${formatNumber(a.price)} ${t.common.currency} ${t.common.perPerson}` : t.common.free}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other cities */}
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-stone-900">{t.cityDetail.others}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => (
              <CityCard key={c.id} city={c} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
