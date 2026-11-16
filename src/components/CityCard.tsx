import { Link } from "react-router-dom";
import type { City } from "../data/morocco";
import { dailyBudgetPerPerson } from "../data/costs";
import { useLang } from "../context/LanguageContext";
import CityImage from "./CityImage";

export default function CityCard({ city }: { city: City }) {
  const { t, localCity, arrow, formatNumber } = useLang();
  const c = localCity(city);

  return (
    <Link
      to={`/villes/${c.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-stone-900/5 ring-1 ring-stone-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-900/15"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <CityImage city={c} className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute start-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800">
          {c.region}
        </span>
        <div className="absolute bottom-3 start-4 end-4 text-white">
          <h3 className="font-serif text-2xl font-bold drop-shadow">{c.name}</h3>
          <p className="text-sm text-white/85">{c.tagline}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {c.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800 ring-1 ring-amber-100"
            >
              {h}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-2">
          <div>
            <p className="text-xs text-stone-400">{t.cityCard.budgetFrom}</p>
            <p className="text-lg font-bold text-stone-900">
              ≈ {formatNumber(dailyBudgetPerPerson(city, "economique"))}{" "}
              <span className="text-xs font-semibold text-stone-400">{t.cityCard.currency}</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-700 transition group-hover:gap-2">
            {t.cityCard.discover} <span aria-hidden>{arrow}</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
