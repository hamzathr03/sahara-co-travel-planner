import { Link } from "react-router-dom";
import type { City } from "../data/morocco";

export default function CityCard({ city }: { city: City }) {
  return (
    <Link
      to={`/villes/${city.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-stone-900/5 ring-1 ring-stone-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-900/15"
    >
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={city.image}
          alt={city.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-800">
          {city.region}
        </span>
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="font-serif text-2xl font-bold drop-shadow">{city.name}</h3>
          <p className="text-sm text-white/85">{city.tagline}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-wrap gap-1.5">
          {city.highlights.slice(0, 3).map((h) => (
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
            <p className="text-xs text-stone-400">Budget / jour dès</p>
            <p className="text-lg font-bold text-stone-900">
              {city.avgDailyBudget.economique} <span className="text-xs font-semibold text-stone-400">MAD</span>
            </p>
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-bold text-amber-700 transition group-hover:gap-2">
            Découvrir <span aria-hidden>→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
